// Reactive language gateway. Components import { t } and reads automatically
// re-evaluate when the user changes language in Settings.

import { copy as bg } from './bg';
import { copy as en } from './en';
import type { Copy } from './bg';
import type { Language } from '$lib/types';
import { settingsStore } from '$lib/stores/settings.svelte';

const dictionaries: Record<Language, Copy> = { bg, en };

export const t = {
  get current(): Copy {
    return dictionaries[settingsStore.current.language];
  },
  get language(): Language {
    return settingsStore.current.language;
  }
};

/** Direct access for cases where reactive tracking is undesired (tests, ICS export). */
export function getCopy(language: Language): Copy {
  return dictionaries[language];
}
