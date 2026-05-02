import { db } from '$lib/db/local-db';
import type { AppSettings } from '$lib/types';

export const DEFAULT_SETTINGS: AppSettings = {
  locale: 'bg-BG',
  language: 'bg',
  theme: 'system',
  plan: 'free',
  privacyMode: true,
  onboardingDone: false
};

export const settingsRepo = {
  async get(): Promise<AppSettings> {
    const row = await db.settings.get('app');
    // Migrate older saved settings that pre-date the language field.
    const stored = row?.value as Partial<AppSettings> | undefined;
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...stored, language: stored.language ?? 'bg' };
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
  }
};
