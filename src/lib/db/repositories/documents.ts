import { db, newId, nowISO } from '$lib/db/local-db';
import type { DocumentSet } from '$lib/types';

export type NewDocumentSetInput = Omit<DocumentSet, 'id' | 'createdAt' | 'updatedAt'>;

export const documentsRepo = {
  async getAll(): Promise<DocumentSet[]> {
    return db.documentSets.toArray();
  },

  async getById(id: string): Promise<DocumentSet | undefined> {
    return db.documentSets.get(id);
  },

  async getByPerson(personId: string): Promise<DocumentSet[]> {
    return db.documentSets.where('personId').equals(personId).toArray();
  },

  async create(input: NewDocumentSetInput): Promise<string> {
    const now = nowISO();
    const id = newId();
    await db.documentSets.add({ id, createdAt: now, updatedAt: now, ...input });
    return id;
  },

  async update(id: string, patch: Partial<DocumentSet>): Promise<void> {
    await db.documentSets.update(id, { ...patch, updatedAt: nowISO() });
  },

  async remove(id: string): Promise<void> {
    await db.documentSets.delete(id);
  },

  async count(): Promise<number> {
    return db.documentSets.count();
  },

  async clear(): Promise<void> {
    await db.documentSets.clear();
  }
};
