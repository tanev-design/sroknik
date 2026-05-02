import { db, newId, nowISO } from '$lib/db/local-db';
import type { Person } from '$lib/types';

export type NewPersonInput = Omit<Person, 'id' | 'createdAt' | 'updatedAt'>;

export const peopleRepo = {
  async getAll(): Promise<Person[]> {
    return db.people.toArray();
  },

  async getById(id: string): Promise<Person | undefined> {
    return db.people.get(id);
  },

  async create(input: NewPersonInput): Promise<string> {
    const now = nowISO();
    const id = newId();
    await db.people.add({ id, createdAt: now, updatedAt: now, ...input });
    return id;
  },

  async update(id: string, patch: Partial<Person>): Promise<void> {
    await db.people.update(id, { ...patch, updatedAt: nowISO() });
  },

  async remove(id: string): Promise<void> {
    await db.people.delete(id);
  },

  async count(): Promise<number> {
    return db.people.count();
  },

  async clear(): Promise<void> {
    await db.people.clear();
  }
};
