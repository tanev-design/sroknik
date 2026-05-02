import { liveQuery, type Subscription } from 'dexie';
import { browser } from '$app/environment';
import { peopleRepo } from '$lib/db/repositories/people';
import type { Person } from '$lib/types';

let _all = $state<Person[]>([]);
let _loaded = $state(false);
let _sub: Subscription | null = null;

function ensureSubscribed(): void {
  if (!browser || _sub) return;
  const q = liveQuery(() => peopleRepo.getAll());
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

export const peopleStore = {
  get all(): Person[] {
    ensureSubscribed();
    return _all;
  },
  get count(): number {
    ensureSubscribed();
    return _all.length;
  },
  get loaded(): boolean {
    return _loaded;
  }
};
