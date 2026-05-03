// Reminder offset helpers and .ics (iCalendar) generation.
// Pure functions — no DB, no DOM.

import type { Deadline } from '$lib/types';
import { getCategory } from '$lib/constants/categories';
import { formatAbsoluteDate } from '$lib/logic/urgency';

/** Default reminder offsets for a given category (in days before due). */
export function getDefaultOffsets(category: Deadline['category']): number[] {
  return [...getCategory(category).defaultReminderOffsets];
}

/** Sanitize a user-picked list of offsets: positive integers, sorted desc, unique. */
export function normalizeOffsets(offsets: number[]): number[] {
  const set = new Set(
    offsets.filter((n) => Number.isInteger(n) && n > 0 && n < 365).map((n) => Math.floor(n))
  );
  return [...set].sort((a, b) => b - a);
}

// ---------------------------------------------------------------------------
// ICS generation — RFC 5545 minimal subset. Consumed by Google/Apple/Outlook.
// ---------------------------------------------------------------------------

const CRLF = '\r\n';

function pad2(n: number): string {
  return n.toString().padStart(2, '0');
}

/** Escape a TEXT field per RFC 5545 §3.3.11. */
function escapeText(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

/** Format a Date as UTC stamp: 20250514T093000Z */
function formatDateTimeUTC(d: Date): string {
  return (
    d.getUTCFullYear().toString() +
    pad2(d.getUTCMonth() + 1) +
    pad2(d.getUTCDate()) +
    'T' +
    pad2(d.getUTCHours()) +
    pad2(d.getUTCMinutes()) +
    pad2(d.getUTCSeconds()) +
    'Z'
  );
}

/** Format "YYYY-MM-DD" → "YYYYMMDD" for DATE values. */
function toICSDate(ymd: string): string {
  return ymd.replace(/-/g, '');
}

/** Add N days to a YYYY-MM-DD string, returning YYYY-MM-DD. */
function addDays(ymd: string, days: number): string {
  const t = Date.parse(`${ymd}T00:00:00Z`) + days * 86_400_000;
  const d = new Date(t);
  return (
    d.getUTCFullYear().toString() +
    '-' +
    pad2(d.getUTCMonth() + 1) +
    '-' +
    pad2(d.getUTCDate())
  );
}

/** Fold lines longer than 75 octets per RFC 5545 §3.1. */
function foldLine(line: string): string {
  if (line.length <= 75) return line;
  const chunks: string[] = [];
  let i = 0;
  while (i < line.length) {
    const end = Math.min(i + (i === 0 ? 75 : 74), line.length);
    chunks.push((i === 0 ? '' : ' ') + line.slice(i, end));
    i = end;
  }
  return chunks.join(CRLF);
}

export interface ICSOptions {
  /** App identifier shown in VEVENT PRODID. */
  prodId?: string;
  /** Include VALARM triggers for each reminder offset. Default true. */
  includeReminders?: boolean;
}

/** Build a full VCALENDAR string from one or more deadlines. */
export function buildICS(deadlines: Deadline[], options: ICSOptions = {}): string {
  const prodId = options.prodId ?? '-//Sroknik//BG//EN';
  const includeReminders = options.includeReminders ?? true;
  const stamp = formatDateTimeUTC(new Date());

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${prodId}`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ];

  for (const d of deadlines) {
    const start = toICSDate(d.dueDate);
    // All-day events per RFC: DTEND is exclusive, so + 1 day.
    const end = toICSDate(addDays(d.dueDate, 1));
    const uid = `${d.id}@sroknik.local`;
    const summary = escapeText(d.title);
    const description = escapeText(
      [
        `Категория: ${getCategory(d.category).labelBg}`,
        `Дата: ${formatAbsoluteDate(d.dueDate)}`,
        d.notes ?? ''
      ]
        .filter(Boolean)
        .join('\n')
    );

    lines.push(
      'BEGIN:VEVENT',
      foldLine(`UID:${uid}`),
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${start}`,
      `DTEND;VALUE=DATE:${end}`,
      foldLine(`SUMMARY:${summary}`),
      foldLine(`DESCRIPTION:${description}`),
      'TRANSP:TRANSPARENT'
    );

    if (d.officialUrl) {
      lines.push(foldLine(`URL:${d.officialUrl}`));
    }

    if (includeReminders && d.reminderOffsets.length > 0) {
      for (const offset of normalizeOffsets(d.reminderOffsets)) {
        lines.push(
          'BEGIN:VALARM',
          'ACTION:DISPLAY',
          foldLine(`DESCRIPTION:${summary}`),
          `TRIGGER:-P${offset}D`,
          'END:VALARM'
        );
      }
    }

    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');
  return lines.join(CRLF) + CRLF;
}

/** Build a safe filename for a single deadline's .ics export. */
export function icsFilename(title: string, ymd: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
  return `sroknik-${slug || 'srok'}-${ymd}.ics`;
}

/** Build a Google Calendar web intent URL for a deadline. */
export function buildGoogleCalendarUrl(d: Deadline): string {
  const start = toICSDate(d.dueDate);
  // All-day events in Google Calendar need end date to be exclusive (+1 day)
  const end = toICSDate(addDays(d.dueDate, 1));
  
  const description = [
    `Категория: ${getCategory(d.category).labelBg}`,
    `Дата: ${formatAbsoluteDate(d.dueDate)}`,
    d.notes ?? ''
  ]
    .filter(Boolean)
    .join('\n');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: d.title,
    dates: `${start}/${end}`,
    details: description
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
