import { describe, it, expect } from 'vitest';
import { validateImportSchema } from '../import-schema';

const validPayload = {
  version: 1,
  exportedAt: '2025-05-14T00:00:00.000Z',
  people: [],
  cars: [],
  documentSets: [],
  deadlines: []
};

describe('validateImportSchema', () => {
  it('accepts a minimal valid schema', () => {
    const r = validateImportSchema(validPayload);
    expect(r.ok).toBe(true);
  });

  it('rejects non-objects', () => {
    expect(validateImportSchema(null).ok).toBe(false);
    expect(validateImportSchema('bad').ok).toBe(false);
    expect(validateImportSchema(42).ok).toBe(false);
  });

  it('rejects wrong version', () => {
    const r = validateImportSchema({ ...validPayload, version: 2 });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toBe('wrong-version');
  });

  it('rejects missing arrays', () => {
    const { people, ...rest } = validPayload;
    void people;
    const r = validateImportSchema(rest);
    expect(r.ok).toBe(false);
  });

  it('rejects missing exportedAt', () => {
    const { exportedAt, ...rest } = validPayload;
    void exportedAt;
    const r = validateImportSchema(rest);
    expect(r.ok).toBe(false);
  });
});
