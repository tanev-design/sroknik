// Import schema validator. Pure — returns a tagged result.

import type { ExportSchema } from '$lib/types';

export type ValidationResult =
  | { ok: true; data: ExportSchema }
  | { ok: false; reason: string };

function isStringArray(v: unknown): v is unknown[] {
  return Array.isArray(v);
}

/**
 * Validates a parsed JSON value against the ExportSchema shape.
 * Strict on top-level keys and version; lenient on unknown optional fields
 * so future versions downgrade gracefully.
 */
export function validateImportSchema(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== 'object') {
    return { ok: false, reason: 'not-an-object' };
  }
  const v = raw as Record<string, unknown>;
  if (v.version !== 1) {
    return { ok: false, reason: 'wrong-version' };
  }
  if (typeof v.exportedAt !== 'string') {
    return { ok: false, reason: 'missing-exported-at' };
  }
  for (const key of ['people', 'cars', 'documentSets', 'deadlines']) {
    if (!isStringArray(v[key])) {
      return { ok: false, reason: `missing-${key}` };
    }
  }
  return { ok: true, data: v as unknown as ExportSchema };
}
