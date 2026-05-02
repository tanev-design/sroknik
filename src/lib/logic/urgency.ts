// Urgency & relative-date helpers.
// Pure functions only — no side effects, no DB, no I/O.
// All calculations use Europe/Sofia local date; UTC midnight is NOT used.

import { toZonedTime } from 'date-fns-tz';
import type { Deadline, Urgency } from '$lib/types';
import { t } from '$lib/copy/i18n.svelte';

export const SOFIA_TZ = 'Europe/Sofia';

/** Returns "YYYY-MM-DD" for a Date as interpreted in Europe/Sofia. */
export function toSofiaDateString(d: Date): string {
  const zoned = toZonedTime(d, SOFIA_TZ);
  const y = zoned.getFullYear();
  const m = String(zoned.getMonth() + 1).padStart(2, '0');
  const day = String(zoned.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Today as "YYYY-MM-DD" in Europe/Sofia (can be overridden for tests). */
export function getSofiaToday(now: Date = new Date()): string {
  return toSofiaDateString(now);
}

/**
 * Days between dueDateISO (YYYY-MM-DD) and today, both interpreted as Sofia dates.
 * Positive = in the future, 0 = today, negative = overdue.
 */
export function getDaysRemaining(dueDateISO: string, now: Date = new Date()): number {
  const today = getSofiaToday(now);
  return diffDaysYMD(today, dueDateISO);
}

/** Integer day difference (toYMD - fromYMD) — assumes YYYY-MM-DD strings. */
export function diffDaysYMD(fromYMD: string, toYMD: string): number {
  const from = Date.parse(`${fromYMD}T00:00:00Z`);
  const to = Date.parse(`${toYMD}T00:00:00Z`);
  return Math.round((to - from) / 86_400_000);
}

/** Classify urgency band from daysRemaining. */
export function getUrgency(daysRemaining: number): Urgency {
  if (daysRemaining < 0) return 'overdue';
  if (daysRemaining === 0) return 'today';
  if (daysRemaining <= 14) return 'soon';
  return 'later';
}

/**
 * Human-readable phrase for a deadline's offset, in the active UI language.
 * Handles plural agreement and switches to months when > 60 days out.
 */
export function formatRelativeDate(daysRemaining: number): string {
  const u = t.current.urgency;
  if (daysRemaining < 0) return u.overdue;
  if (daysRemaining === 0) return u.today;
  if (daysRemaining === 1) return u.tomorrow;
  if (daysRemaining <= 60) return u.inDays(daysRemaining);
  const months = Math.round(daysRemaining / 30);
  return u.inMonths(months);
}

/** Absolute date in the active UI locale. */
export function formatAbsoluteDate(dueDateISO: string): string {
  const parts = dueDateISO.split('-').map((v) => parseInt(v, 10));
  const y = parts[0];
  const m = parts[1];
  const d = parts[2];
  if (!y || !m || !d) return dueDateISO;
  const date = new Date(Date.UTC(y, m - 1, d));
  const localeTag = t.language === 'en' ? 'en-GB' : 'bg-BG';
  return new Intl.DateTimeFormat(localeTag, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(date);
}

/** Today, formatted for the TopBar subtitle ("петък, 2 май"). */
export function formatTodayHeader(now: Date = new Date()): string {
  const localeTag = t.language === 'en' ? 'en-GB' : 'bg-BG';
  return new Intl.DateTimeFormat(localeTag, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: SOFIA_TZ
  }).format(now);
}

// Urgency-first ordering for the Днес screen.
const URGENCY_RANK: Record<Urgency, number> = {
  overdue: 0,
  today: 1,
  soon: 2,
  later: 3
};

/** Sort: overdue → today → soon → later, then by ascending dueDate. */
export function sortDeadlinesByUrgency(list: Deadline[], now: Date = new Date()): Deadline[] {
  return [...list].sort((a, b) => {
    const uA = getUrgency(getDaysRemaining(a.dueDate, now));
    const uB = getUrgency(getDaysRemaining(b.dueDate, now));
    if (URGENCY_RANK[uA] !== URGENCY_RANK[uB]) return URGENCY_RANK[uA] - URGENCY_RANK[uB];
    return a.dueDate.localeCompare(b.dueDate);
  });
}

/** Group deadlines into the four sections rendered on the Today screen. */
export function groupForToday(
  list: Deadline[],
  now: Date = new Date()
): {
  overdue: Deadline[];
  today: Deadline[];
  soon: Deadline[];
  later: Deadline[];
} {
  const overdue: Deadline[] = [];
  const today: Deadline[] = [];
  const soon: Deadline[] = [];
  const later: Deadline[] = [];
  for (const d of list) {
    const u = getUrgency(getDaysRemaining(d.dueDate, now));
    if (u === 'overdue') overdue.push(d);
    else if (u === 'today') today.push(d);
    else if (u === 'soon') soon.push(d);
    else later.push(d);
  }
  const byDate = (a: Deadline, b: Deadline) => a.dueDate.localeCompare(b.dueDate);
  return {
    overdue: overdue.sort(byDate),
    today: today.sort(byDate),
    soon: soon.sort(byDate),
    later: later.sort(byDate)
  };
}

/** The single deadline that should appear in the Today "Up next" hero card. */
export function nextDeadline(list: Deadline[], now: Date = new Date()): Deadline | null {
  const sorted = sortDeadlinesByUrgency(list, now);
  return sorted[0] ?? null;
}
