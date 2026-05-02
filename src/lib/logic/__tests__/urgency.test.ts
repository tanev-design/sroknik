import { describe, it, expect } from 'vitest';
import {
  getDaysRemaining,
  getUrgency,
  formatRelativeDate,
  sortDeadlinesByUrgency,
  groupForToday
} from '../urgency';
import type { Deadline } from '$lib/types';

// Fixed reference instant for deterministic tests.
// 2025-05-14 12:00:00Z ≈ 2025-05-14 15:00 Europe/Sofia (DST active).
const NOW = new Date('2025-05-14T12:00:00.000Z');

function mkDeadline(id: string, dueDate: string): Deadline {
  return {
    id,
    title: 'T',
    category: 'custom',
    dueDate,
    reminderOffsets: [],
    status: 'active',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z'
  };
}

describe('getDaysRemaining', () => {
  it('returns 0 for today', () => {
    expect(getDaysRemaining('2025-05-14', NOW)).toBe(0);
  });
  it('returns positive for future', () => {
    expect(getDaysRemaining('2025-05-20', NOW)).toBe(6);
  });
  it('returns negative for past (overdue)', () => {
    expect(getDaysRemaining('2025-05-10', NOW)).toBe(-4);
  });
  it('crosses a month boundary correctly', () => {
    expect(getDaysRemaining('2025-06-14', NOW)).toBe(31);
  });
  it('is DST-safe (Europe/Sofia switched 30 Mar 2025)', () => {
    // From 2025-03-29 to 2025-03-31 — Sofia crosses DST, day count stays 2.
    const earlyNow = new Date('2025-03-29T12:00:00.000Z');
    expect(getDaysRemaining('2025-03-31', earlyNow)).toBe(2);
  });
});

describe('getUrgency thresholds', () => {
  it('overdue when days < 0', () => {
    expect(getUrgency(-1)).toBe('overdue');
    expect(getUrgency(-100)).toBe('overdue');
  });
  it('today when days === 0', () => {
    expect(getUrgency(0)).toBe('today');
  });
  it('soon between 1 and 14 inclusive', () => {
    expect(getUrgency(1)).toBe('soon');
    expect(getUrgency(14)).toBe('soon');
  });
  it('later when days > 14', () => {
    expect(getUrgency(15)).toBe('later');
    expect(getUrgency(365)).toBe('later');
  });
});

describe('formatRelativeDate Bulgarian plural forms', () => {
  it('handles negative (overdue)', () => {
    expect(formatRelativeDate(-3)).toBe('Просрочено');
  });
  it('handles today', () => {
    expect(formatRelativeDate(0)).toBe('Днес');
  });
  it('handles tomorrow', () => {
    expect(formatRelativeDate(1)).toBe('Утре');
  });
  it('uses singular ден for 1 — N/A (tomorrow wins) — but for "2 дни"', () => {
    expect(formatRelativeDate(2)).toBe('След 2 дни');
  });
  it('uses plural дни for 5', () => {
    expect(formatRelativeDate(5)).toBe('След 5 дни');
  });
  it('switches to months near 60+ days', () => {
    // 90 days → ~3 месеца; plural "месеца" applies.
    expect(formatRelativeDate(90)).toBe('След 3 месеца');
  });
  it('handles 1 month edge (~30 days stays in days branch; 31 is still days)', () => {
    expect(formatRelativeDate(31)).toBe('След 31 дни');
  });
});

describe('sortDeadlinesByUrgency', () => {
  it('orders overdue → today → soon → later and ascending by date inside group', () => {
    const list: Deadline[] = [
      mkDeadline('later-1', '2025-07-01'),
      mkDeadline('today', '2025-05-14'),
      mkDeadline('soon-late', '2025-05-25'),
      mkDeadline('overdue-1', '2025-05-01'),
      mkDeadline('soon-early', '2025-05-15'),
      mkDeadline('overdue-0', '2025-04-20')
    ];
    const sorted = sortDeadlinesByUrgency(list, NOW);
    expect(sorted.map((d) => d.id)).toEqual([
      'overdue-0',
      'overdue-1',
      'today',
      'soon-early',
      'soon-late',
      'later-1'
    ]);
  });
});

describe('groupForToday', () => {
  it('splits into overdue / today / soon / later', () => {
    const list: Deadline[] = [
      mkDeadline('a', '2025-05-10'), // overdue
      mkDeadline('b', '2025-05-14'), // today
      mkDeadline('c', '2025-05-20'), // 6 days → soon
      mkDeadline('d', '2025-07-14') // 61 days → later
    ];
    const g = groupForToday(list, NOW);
    expect(g.overdue.map((x) => x.id)).toEqual(['a']);
    expect(g.today.map((x) => x.id)).toEqual(['b']);
    expect(g.soon.map((x) => x.id)).toEqual(['c']);
    expect(g.later.map((x) => x.id)).toEqual(['d']);
  });
});
