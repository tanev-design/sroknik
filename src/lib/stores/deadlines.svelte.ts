// Svelte 5 rune store backed by Dexie liveQuery.
// We create module-level singleton state and subscribe once on first import
// (client-only — SSR never runs this file because of static adapter's SPA fallback).

import { liveQuery, type Subscription } from 'dexie';
import { browser } from '$app/environment';
import { deadlinesRepo } from '$lib/db/repositories/deadlines';
import type { Deadline } from '$lib/types';

let _all = $state<Deadline[]>([]);
let _loaded = $state(false);
let _sub: Subscription | null = null;

function ensureSubscribed(): void {
  if (!browser || _sub) return;
  const q = liveQuery(() => deadlinesRepo.getAll());
  _sub = q.subscribe({
    next: (result) => {
      _all = result ?? [];
      _loaded = true;
    },
    error: () => {
      _loaded = true;
    }
  });
}

export const deadlinesStore = {
  get all(): Deadline[] {
    ensureSubscribed();
    return _all;
  },
  get active(): Deadline[] {
    ensureSubscribed();
    return _all.filter((d) => d.status === 'active');
  },
  get done(): Deadline[] {
    ensureSubscribed();
    return _all.filter((d) => d.status === 'done');
  },
  get archived(): Deadline[] {
    ensureSubscribed();
    return _all.filter((d) => d.status === 'archived');
  },
  get loaded(): boolean {
    return _loaded;
  }
};
