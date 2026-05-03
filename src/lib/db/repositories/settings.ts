import { db } from '$lib/db/local-db';
import type { AppSettings } from '$lib/types';

export const DEFAULT_SETTINGS: AppSettings = {
  locale: 'bg-BG',
  language: 'bg',
  theme: 'system',
  plan: 'free',
  privacyMode: true,
  onboardingDone: false,
  plusActivated: false,
  plusActivatedAt: null,
  plusLicenseKeyHint: null,
  plusLicenseKey: null,
  plusSubscriptionStatus: null,
  plusPriceId: null,
  plusCurrentPeriodEnd: null,
  plusLastValidatedAt: null,
  browserNotificationsEnabled: false
};

/** Accepted license key format: SRKN-XXXX-XXXX-XXXX-XXXX (hex). */
export const LICENSE_KEY_REGEX = /^SRKN-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/;

export type ActivateErrorCode =
  | 'invalid_format'
  | 'invalid_key'
  | 'not_found'
  | 'revoked'
  | 'inactive'
  | 'too_many_activations'
  | 'rate_limited'
  | 'network_error'
  | 'server_error'
  | 'misconfigured';

export interface ActivateResult {
  ok: boolean;
  error?: ActivateErrorCode;
}

interface ActivateResponse {
  ok?: boolean;
  error?: string;
  status?: string;
  current_period_end?: number | null;
  price_id?: string | null;
}

interface StatusResponse {
  ok?: boolean;
  active?: boolean;
  status?: string;
  current_period_end?: number | null;
  price_id?: string | null;
  error?: string;
}

/** Revalidate at most once every 24h to keep the worker cheap. */
const REVALIDATE_INTERVAL_MS = 24 * 60 * 60 * 1000;

function getWorkerUrl(): string | null {
  const raw = import.meta.env.VITE_LICENSE_WORKER_URL as string | undefined;
  return raw ? raw.replace(/\/$/, '') : null;
}

export const settingsRepo = {
  async get(): Promise<AppSettings> {
    const row = await db.settings.get('app');
    const stored = row?.value as Partial<AppSettings> | undefined;
    if (stored) {
      return {
        ...DEFAULT_SETTINGS,
        ...stored,
        language: stored.language ?? 'bg'
      };
    }
    return DEFAULT_SETTINGS;
  },

  async set(patch: Partial<AppSettings>): Promise<AppSettings> {
    const current = await this.get();
    const next: AppSettings = { ...current, ...patch };
    await db.settings.put({ key: 'app', value: next });
    return next;
  },

  async reset(): Promise<void> {
    await db.settings.put({ key: 'app', value: DEFAULT_SETTINGS });
  },

  async isPlusActive(): Promise<boolean> {
    const s = await this.get();
    return !!s.plusActivated;
  },

  /**
   * Activate a Срокник Plus license key against the edge Worker.
   * Stores the full key locally so we can revalidate later.
   */
  async activatePlus(rawKey: string): Promise<ActivateResult> {
    const key = rawKey.trim().toUpperCase();
    if (!LICENSE_KEY_REGEX.test(key)) {
      return { ok: false, error: 'invalid_format' };
    }

    const workerUrl = getWorkerUrl();
    if (!workerUrl) return { ok: false, error: 'misconfigured' };

    let res: Response;
    try {
      res = await fetch(`${workerUrl}/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key })
      });
    } catch {
      return { ok: false, error: 'network_error' };
    }

    let data: ActivateResponse = {};
    try {
      data = (await res.json()) as ActivateResponse;
    } catch {
      return { ok: false, error: 'server_error' };
    }

    if (res.status === 429 || data.error === 'rate_limited') {
      return { ok: false, error: 'rate_limited' };
    }

    if (data.ok) {
      await this.set({
        plan: 'plus',
        plusActivated: true,
        plusActivatedAt: Date.now(),
        plusLicenseKey: key,
        plusLicenseKeyHint: key.slice(-4),
        plusSubscriptionStatus: (data.status as AppSettings['plusSubscriptionStatus']) ?? 'active',
        plusPriceId: data.price_id ?? null,
        plusCurrentPeriodEnd:
          typeof data.current_period_end === 'number' ? data.current_period_end * 1000 : null,
        plusLastValidatedAt: Date.now()
      });
      return { ok: true };
    }

    const known: ActivateErrorCode[] = [
      'invalid_key',
      'not_found',
      'revoked',
      'inactive',
      'too_many_activations',
      'rate_limited',
      'server_error'
    ];
    const code = known.includes(data.error as ActivateErrorCode)
      ? (data.error as ActivateErrorCode)
      : 'server_error';
    return { ok: false, error: code };
  },

  /**
   * Resolve a Stripe Checkout session id to its issued license key.
   * Polls briefly to absorb webhook latency. Returns null if not found.
   */
  async lookupBySession(sessionId: string): Promise<string | null> {
    const workerUrl = getWorkerUrl();
    if (!workerUrl) return null;

    // Retry schedule: total ~13s. Webhooks usually land within 1-3s.
    const delays = [0, 1500, 3000, 4000, 5000];
    for (const delay of delays) {
      if (delay) await new Promise((r) => setTimeout(r, delay));
      let res: Response;
      try {
        res = await fetch(`${workerUrl}/lookup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId })
        });
      } catch {
        continue;
      }
      if (res.status === 429) return null;
      let data: { ok?: boolean; key?: string; error?: string } = {};
      try {
        data = (await res.json()) as { ok?: boolean; key?: string; error?: string };
      } catch {
        continue;
      }
      if (data.ok && data.key) return data.key;
      if (data.error && data.error !== 'pending') return null;
    }
    return null;
  },

  /**
   * Re-check the license against the worker. Downgrades the local plan if the
   * subscription was canceled, expired, or revoked. Throttled to once per day.
   * Safe to call on app launch — silent on network errors.
   */
  async revalidatePlus(force = false): Promise<void> {
    const s = await this.get();
    if (!s.plusActivated || !s.plusLicenseKey) return;

    const workerUrl = getWorkerUrl();
    if (!workerUrl) return;

    if (!force && s.plusLastValidatedAt) {
      if (Date.now() - s.plusLastValidatedAt < REVALIDATE_INTERVAL_MS) return;
    }

    let res: Response;
    try {
      res = await fetch(`${workerUrl}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: s.plusLicenseKey })
      });
    } catch {
      return; // Offline — keep current state.
    }

    let data: StatusResponse = {};
    try {
      data = (await res.json()) as StatusResponse;
    } catch {
      return;
    }

    // Treat 404/inactive/revoked as authoritative downgrades. Anything else
    // (5xx, network errors handled above) leaves the local state untouched.
    if (res.status === 404 || data.error === 'not_found') {
      await this.set({
        plan: 'free',
        plusActivated: false,
        plusSubscriptionStatus: 'not_found' as never,
        plusLastValidatedAt: Date.now()
      });
      return;
    }

    if (!data.ok) {
      await this.set({ plusLastValidatedAt: Date.now() });
      return;
    }

    const status = (data.status as AppSettings['plusSubscriptionStatus']) ?? 'unknown';
    const periodEndMs =
      typeof data.current_period_end === 'number' ? data.current_period_end * 1000 : null;

    await this.set({
      plan: data.active ? 'plus' : 'free',
      plusActivated: !!data.active,
      plusSubscriptionStatus: status,
      plusPriceId: data.price_id ?? s.plusPriceId ?? null,
      plusCurrentPeriodEnd: periodEndMs,
      plusLastValidatedAt: Date.now()
    });
  }
};
