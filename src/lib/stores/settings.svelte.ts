import { liveQuery, type Subscription } from 'dexie';
import { browser } from '$app/environment';
import { db } from '$lib/db/local-db';
import { DEFAULT_SETTINGS, settingsRepo } from '$lib/db/repositories/settings';
import type { AppSettings } from '$lib/types';

let _settings = $state<AppSettings>(DEFAULT_SETTINGS);
let _loaded = $state(false);
let _sub: Subscription | null = null;

function ensureSubscribed(): void {
  if (!browser || _sub) return;
  const q = liveQuery(async () => {
    const row = await db.settings.get('app');
    return row?.value ?? DEFAULT_SETTINGS;
  });
  _sub = q.subscribe({
    next: (result) => {
      _settings = result ?? DEFAULT_SETTINGS;
      _loaded = true;
    },
    error: () => {
      _loaded = true;
    }
  });

  // Revalidate any active Plus license against the worker once per session.
  // Throttled internally to once per 24h. Runs after the browser is idle so
  // it never blocks first paint, and is silent on network errors.
  if (typeof window !== 'undefined') {
    const kick = (): void => {
      void settingsRepo.revalidatePlus().catch(() => {});
    };
    if ('requestIdleCallback' in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(
        kick
      );
    } else {
      setTimeout(kick, 2000);
    }
  }
}

export const settingsStore = {
  get current(): AppSettings {
    ensureSubscribed();
    return _settings;
  },
  get loaded(): boolean {
    return _loaded;
  },
  async update(patch: Partial<AppSettings>): Promise<void> {
    await settingsRepo.set(patch);
  }
};
