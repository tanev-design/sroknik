import { db, newId, nowISO } from '$lib/db/local-db';
import type { Deadline, DeadlineStatus } from '$lib/types';

export type NewDeadlineInput = Omit<Deadline, 'id' | 'createdAt' | 'updatedAt' | 'status'> & {
  status?: DeadlineStatus;
};

function withoutUndefined<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined)) as T;
}

export const deadlinesRepo = {
  async getAll(): Promise<Deadline[]> {
    return db.deadlines.orderBy('dueDate').toArray();
  },

  async getActive(): Promise<Deadline[]> {
    const all = await db.deadlines.where('status').equals('active').toArray();
    return all.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  },

  async getById(id: string): Promise<Deadline | undefined> {
    return db.deadlines.get(id);
  },

  async getByCarId(carId: string): Promise<Deadline[]> {
    return db.deadlines.where('linkedCarId').equals(carId).toArray();
  },

  async getByPersonId(personId: string): Promise<Deadline[]> {
    return db.deadlines.where('linkedPersonId').equals(personId).toArray();
  },

  async getByDocumentSetId(setId: string): Promise<Deadline[]> {
    return db.deadlines.filter((d) => d.linkedDocumentSetId === setId).toArray();
  },

  async create(input: NewDeadlineInput): Promise<string> {
    const now = nowISO();
    const id = newId();
    const base = withoutUndefined({
      status: input.status ?? 'active',
      createdAt: now,
      updatedAt: now,
      ...input
    });
    const row = { id, ...base } as Deadline;

    try {
      await db.deadlines.add(row);
      return id;
    } catch (error) {
      try {
        const legacyId = await db.deadlines.add(base as Deadline);
        return String(legacyId);
      } catch {
        throw error;
      }
    }
  },

  async update(id: string, patch: Partial<Deadline>): Promise<void> {
    await db.deadlines.update(id, withoutUndefined({ ...patch, updatedAt: nowISO() }));
  },

  async setStatus(id: string, status: DeadlineStatus): Promise<void> {
    await db.deadlines.update(id, { status, updatedAt: nowISO() });
  },

  async remove(id: string): Promise<void> {
    await db.deadlines.delete(id);
  },

  async countActive(): Promise<number> {
    return db.deadlines.where('status').equals('active').count();
  },

  async countCustomActive(): Promise<number> {
    return db.deadlines
      .where('status')
      .equals('active')
      .filter((d) => d.category === 'custom')
      .count();
  },

  async clear(): Promise<void> {
    await db.deadlines.clear();
  }
};
