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
  browserNotificationsEnabled: false
};

/** Accepted license key format: SRKN-XXXX-XXXX-XXXX-XXXX (hex). */
export const LICENSE_KEY_REGEX = /^SRKN-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/;

export type ActivateErrorCode =
  | 'invalid_format'
  | 'invalid_key'
  | 'not_found'
  | 'revoked'
  | 'too_many_activations'
  | 'rate_limited'
  | 'network_error'
  | 'server_error'
  | 'misconfigured';

export interface ActivateResult {
  ok: boolean;
  error?: ActivateErrorCode;
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
   * Writes the Plus state into IndexedDB only on a successful response.
   */
  async activatePlus(rawKey: string): Promise<ActivateResult> {
    const key = rawKey.trim().toUpperCase();
    if (!LICENSE_KEY_REGEX.test(key)) {
      return { ok: false, error: 'invalid_format' };
    }

    const workerUrl = import.meta.env.VITE_LICENSE_WORKER_URL as string | undefined;
    if (!workerUrl) {
      return { ok: false, error: 'misconfigured' };
    }

    let res: Response;
    try {
      res = await fetch(`${workerUrl.replace(/\/$/, '')}/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key })
      });
    } catch {
      return { ok: false, error: 'network_error' };
    }

    let data: { ok?: boolean; error?: string } = {};
    try {
      data = (await res.json()) as { ok?: boolean; error?: string };
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
        plusLicenseKeyHint: key.slice(-4)
      });
      return { ok: true };
    }

    const known: ActivateErrorCode[] = [
      'invalid_key',
      'not_found',
      'revoked',
      'too_many_activations',
      'rate_limited',
      'server_error'
    ];
    const code = known.includes(data.error as ActivateErrorCode)
      ? (data.error as ActivateErrorCode)
      : 'server_error';
    return { ok: false, error: code };
  }
};
