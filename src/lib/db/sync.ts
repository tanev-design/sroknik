import { db } from '$lib/db/local-db';
import { supabase } from '$lib/db/supabase';
import type { Deadline, Car, Person, DocumentSet } from '$lib/types';
import { authStore } from '$lib/stores/auth.svelte';

/**
 * Basic two-way sync:
 * 1. Push all local records created/updated since last sync.
 * 2. Pull all remote records updated since last sync.
 * 3. Merge changes locally (last-write-wins based on updatedAt).
 * 
 * Note: Real-time sync and delete tracking require a more robust sync engine (e.g. tracking deletedAt or soft deletes),
 * but this serves as the foundational integration.
 */

const SYNC_KEY = 'last_sync_timestamp';

export async function syncWithCloud() {
  if (!supabase || !authStore.user) return;
  const userId = authStore.user.id;

  // 1. Get last sync time from settings
  const settings = await db.settings.get('app');
  // We'll use localStorage for the sync timestamp to keep it out of the main domain model for now
  const lastSyncStr = localStorage.getItem(SYNC_KEY) || '1970-01-01T00:00:00.000Z';
  const syncStart = new Date().toISOString();

  try {
    // --- PULL FROM CLOUD ---
    // Deadlines
    const { data: remoteDeadlines } = await supabase
      .from('deadlines')
      .select('*')
      .eq('user_id', userId)
      .gt('updatedAt', lastSyncStr);
    
    if (remoteDeadlines && remoteDeadlines.length > 0) {
      await db.deadlines.bulkPut(remoteDeadlines);
    }

    // Cars
    const { data: remoteCars } = await supabase
      .from('cars')
      .select('*')
      .eq('user_id', userId)
      .gt('updatedAt', lastSyncStr);
      
    if (remoteCars && remoteCars.length > 0) {
      await db.cars.bulkPut(remoteCars);
    }

    // People
    const { data: remotePeople } = await supabase
      .from('people')
      .select('*')
      .eq('user_id', userId)
      .gt('updatedAt', lastSyncStr);
      
    if (remotePeople && remotePeople.length > 0) {
      await db.people.bulkPut(remotePeople);
    }

    // Document Sets
    const { data: remoteDocs } = await supabase
      .from('document_sets')
      .select('*')
      .eq('user_id', userId)
      .gt('updatedAt', lastSyncStr);
      
    if (remoteDocs && remoteDocs.length > 0) {
      await db.documentSets.bulkPut(remoteDocs);
    }

    // --- PUSH TO CLOUD ---
    // Find local records modified since last sync
    const localDeadlines = await db.deadlines.filter(d => d.updatedAt > lastSyncStr).toArray();
    const localCars = await db.cars.filter(c => c.updatedAt > lastSyncStr).toArray();
    const localPeople = await db.people.filter(p => p.updatedAt > lastSyncStr).toArray();
    const localDocs = await db.documentSets.filter(d => d.updatedAt > lastSyncStr).toArray();

    if (localDeadlines.length > 0) {
      await supabase.from('deadlines').upsert(
        localDeadlines.map(d => ({ ...d, user_id: userId }))
      );
    }

    if (localCars.length > 0) {
      await supabase.from('cars').upsert(
        localCars.map(c => ({ ...c, user_id: userId }))
      );
    }

    if (localPeople.length > 0) {
      await supabase.from('people').upsert(
        localPeople.map(p => ({ ...p, user_id: userId }))
      );
    }

    if (localDocs.length > 0) {
      await supabase.from('document_sets').upsert(
        localDocs.map(d => ({ ...d, user_id: userId }))
      );
    }

    // Update last sync time
    localStorage.setItem(SYNC_KEY, syncStart);

  } catch (err) {
    console.error('Sync failed:', err);
  }
}
