import { liveQuery, type Subscription } from 'dexie';
import { browser } from '$app/environment';
import { carsRepo } from '$lib/db/repositories/cars';
import type { Car } from '$lib/types';

let _all = $state<Car[]>([]);
let _loaded = $state(false);
let _sub: Subscription | null = null;

function ensureSubscribed(): void {
  if (!browser || _sub) return;
  const q = liveQuery(() => carsRepo.getAll());
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

export const carsStore = {
  get all(): Car[] {
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
