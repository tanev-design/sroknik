// Backup orchestration: build/apply ExportSchema payloads.
// Keeps DB-specific logic in one place so UI can call async helpers.

import { db } from '$lib/db/local-db';
import { deadlinesRepo } from '$lib/db/repositories/deadlines';
import { carsRepo } from '$lib/db/repositories/cars';
import { peopleRepo } from '$lib/db/repositories/people';
import { documentsRepo } from '$lib/db/repositories/documents';
import type { ExportSchema } from '$lib/types';

export async function buildExport(): Promise<ExportSchema> {
  const [people, cars, documentSets, deadlines] = await Promise.all([
    peopleRepo.getAll(),
    carsRepo.getAll(),
    documentsRepo.getAll(),
    deadlinesRepo.getAll()
  ]);
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    people,
    cars,
    documentSets,
    deadlines
  };
}

/** Replace all user data with the contents of `data` (destructive). */
export async function applyReplace(data: ExportSchema): Promise<void> {
  await db.transaction(
    'rw',
    [db.people, db.cars, db.documentSets, db.deadlines],
    async () => {
      await Promise.all([
        db.people.clear(),
        db.cars.clear(),
        db.documentSets.clear(),
        db.deadlines.clear()
      ]);
      if (data.people.length) await db.people.bulkAdd(data.people);
      if (data.cars.length) await db.cars.bulkAdd(data.cars);
      if (data.documentSets.length) await db.documentSets.bulkAdd(data.documentSets);
      if (data.deadlines.length) await db.deadlines.bulkAdd(data.deadlines);
    }
  );
}

/** Merge incoming rows by primary key: bulkPut keeps existing rows unless overwritten. */
export async function applyMerge(data: ExportSchema): Promise<void> {
  await db.transaction(
    'rw',
    [db.people, db.cars, db.documentSets, db.deadlines],
    async () => {
      if (data.people.length) await db.people.bulkPut(data.people);
      if (data.cars.length) await db.cars.bulkPut(data.cars);
      if (data.documentSets.length) await db.documentSets.bulkPut(data.documentSets);
      if (data.deadlines.length) await db.deadlines.bulkPut(data.deadlines);
    }
  );
}

export async function clearAllUserData(): Promise<void> {
  await db.transaction(
    'rw',
    [db.people, db.cars, db.documentSets, db.deadlines, db.settings],
    async () => {
      await Promise.all([
        db.people.clear(),
        db.cars.clear(),
        db.documentSets.clear(),
        db.deadlines.clear(),
        db.settings.clear()
      ]);
    }
  );
}
