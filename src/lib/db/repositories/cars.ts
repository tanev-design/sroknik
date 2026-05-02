import { db, newId, nowISO } from '$lib/db/local-db';
import type { Car } from '$lib/types';

export type NewCarInput = Omit<Car, 'id' | 'createdAt' | 'updatedAt'>;

export const carsRepo = {
  async getAll(): Promise<Car[]> {
    return db.cars.toArray();
  },

  async getById(id: string): Promise<Car | undefined> {
    return db.cars.get(id);
  },

  async create(input: NewCarInput): Promise<string> {
    const now = nowISO();
    const id = newId();
    await db.cars.add({ id, createdAt: now, updatedAt: now, ...input });
    return id;
  },

  async update(id: string, patch: Partial<Car>): Promise<void> {
    await db.cars.update(id, { ...patch, updatedAt: nowISO() });
  },

  async remove(id: string): Promise<void> {
    await db.cars.delete(id);
  },

  async count(): Promise<number> {
    return db.cars.count();
  },

  async clear(): Promise<void> {
    await db.cars.clear();
  }
};
