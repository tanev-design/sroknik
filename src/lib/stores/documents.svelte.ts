import { liveQuery, type Subscription } from 'dexie';
import { browser } from '$app/environment';
import { documentsRepo } from '$lib/db/repositories/documents';
import type { DocumentSet } from '$lib/types';

let _all = $state<DocumentSet[]>([]);
let _loaded = $state(false);
let _sub: Subscription | null = null;

function ensureSubscribed(): void {
  if (!browser || _sub) return;
  const q = liveQuery(() => documentsRepo.getAll());
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

export const documentsStore = {
  get all(): DocumentSet[] {
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
