// Dexie IndexedDB instance for Срокник.
// Fix vs. masterprompt: schema uses `id` (string PK) not `++id` (auto-increment int),
// because all domain types assign crypto.randomUUID() strings as primary keys.

import Dexie, { type Table } from 'dexie';
import type {
  AppSettings,
  Car,
  Deadline,
  DocumentSet,
  Person
} from '$lib/types';

export interface SettingsEntry {
  key: 'app';
  value: AppSettings;
}

export class SroknikDB extends Dexie {
  deadlines!: Table<Deadline, string>;
  people!: Table<Person, string>;
  cars!: Table<Car, string>;
  documentSets!: Table<DocumentSet, string>;
  settings!: Table<SettingsEntry, string>;

  constructor() {
    super('sroknik_db');
    this.version(1).stores({
      // String PK → leading `id` (no `++`). Secondary indexes follow.
      deadlines: 'id, category, status, dueDate, linkedPersonId, linkedCarId',
      people: 'id',
      cars: 'id, ownerPersonId',
      documentSets: 'id, personId',
      settings: 'key'
    });
  }
}

// Singleton. Only instantiate in browser — SSR has no IndexedDB.
// This module is imported only from client-only code paths.
export const db = new SroknikDB();

/** Convenience: always returns a new ISO timestamp. */
export function nowISO(): string {
  return new Date().toISOString();
}

/** Convenience: generates a new UUID string primary key. */
export function newId(): string {
  return crypto.randomUUID();
}
