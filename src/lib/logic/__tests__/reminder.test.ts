import { describe, it, expect } from 'vitest';
import { buildICS, normalizeOffsets, icsFilename } from '../reminder';
import type { Deadline } from '$lib/types';

const base: Deadline = {
  id: 'abc-123',
  title: 'Винетка',
  category: 'vignette',
  dueDate: '2025-08-15',
  reminderOffsets: [30, 7, 1],
  status: 'active',
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z'
};

describe('normalizeOffsets', () => {
  it('dedupes and sorts desc', () => {
    expect(normalizeOffsets([7, 30, 7, 1, 14])).toEqual([30, 14, 7, 1]);
  });
  it('drops non-positive or non-finite', () => {
    expect(normalizeOffsets([0, -1, 7])).toEqual([7]);
  });
});

describe('buildICS', () => {
  it('produces a VCALENDAR with VEVENT and VALARMs', () => {
    const ics = buildICS([base]);
    expect(ics.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true);
    expect(ics.includes('BEGIN:VEVENT')).toBe(true);
    expect(ics.includes('SUMMARY:Винетка')).toBe(true);
    // All-day event: DTSTART/DTEND as DATE
    expect(ics.includes('DTSTART;VALUE=DATE:20250815')).toBe(true);
    expect(ics.includes('DTEND;VALUE=DATE:20250816')).toBe(true);
    // 3 VALARM blocks from 3 offsets
    expect(ics.match(/BEGIN:VALARM/g)?.length).toBe(3);
    expect(ics.endsWith('END:VCALENDAR\r\n')).toBe(true);
  });

  it('escapes commas and semicolons in SUMMARY/DESCRIPTION', () => {
    const d: Deadline = { ...base, title: 'A, B; C', notes: 'line1\nline2' };
    const ics = buildICS([d]);
    expect(ics.includes('SUMMARY:A\\, B\\; C')).toBe(true);
    expect(ics.includes('\\n')).toBe(true);
  });
});

describe('icsFilename', () => {
  it('slugifies Bulgarian titles', () => {
    expect(icsFilename('Винетка 2025', '2025-08-15')).toBe('sroknik-винетка-2025-2025-08-15.ics');
  });
});
