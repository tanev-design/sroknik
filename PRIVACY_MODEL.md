# PRIVACY_MODEL.md — Срокник

> Срокник е местно приложение за брутално прости цели: да ти припомня срокове. За да свърши тази работа не му трябват твоите данни на сървър.

## What is stored, where

All user-generated data lives **exclusively in the browser's IndexedDB** on the device where the app is installed or visited. The database is named `sroknik_db`. It contains:

| Table | Content |
|-------|---------|
| `deadlines` | title, category, due date, reminder offsets, optional notes/URL/links |
| `people` | name + relation role |
| `cars` | nickname, optional plate number, owner person ID |
| `documentSets` | title + owner person ID |
| `settings` | theme, plan flag (`free` \| `plus`), onboarding flag |

No data leaves the device through the app. There is no network request that transmits user data to any origin under our control.

## What is NOT collected

- **No accounts.** There is no sign-in, no email capture, no OAuth.
- **No EGN** (Bulgarian personal ID) fields exist anywhere in the data model or UI.
- **No banking or payment data.** Срокник Plus is marked "Скоро" and has no purchase flow.
- **No document uploads.** We do not read, store, or transmit files.
- **No telemetry.** No analytics scripts, no heatmaps, no session recording.
- **No advertising SDKs.** No third-party ad networks or trackers.
- **No server-side persistence of user data.** The deploy is a static bundle.

## Third-party network traffic

The only outbound network requests the app issues are:

1. **Static asset loads** from the origin where the app is hosted (Cloudflare Pages or equivalent).
2. **Google Fonts** (`fonts.googleapis.com`, `fonts.gstatic.com`) to fetch the IBM Plex Sans Cyrillic subset. This is a typical font-CDN fetch with no app data in the request body. If you prefer, self-host the font and remove the `<link>` tags in `src/app.html`.
3. **User-initiated clicks** to the official links in `src/lib/constants/categories.ts` (e.g. `https://bgtoll.bg`, `https://mvr.bg`). Those are plain `target="_blank"` links opened only when the user taps them.

Notifications, calendar export (`.ics`), and JSON backup all happen entirely client-side.

## Reminders & notifications

The MVP uses three strategies, in order:

1. **In-app reminder list.** Always works. Sorted by urgency on the Днес screen.
2. **Browser `Notification` permission.** Requested only in Settings, never on first load. Notifications only fire while a browser tab/PWA is open — they are a convenience, not the reliability layer.
3. **Calendar export (`.ics`)** — the reliable layer. Each deadline can be downloaded as an RFC 5545 iCalendar file with embedded `VALARM` triggers for each reminder offset. The user imports this once into Google/Apple/Outlook.

A hint appears on the add-deadline form encouraging the calendar path:
> *"За сигурно напомняне добави срока и в календара."*

## Data portability

- **Export** — Settings → "Свали архив (JSON)" produces a versioned `ExportSchema` file (`sroknik-backup-YYYY-MM-DD.json`).
- **Import** — same page, accepts the same schema. The user chooses **Замени всичко** (destructive replace) or **Добави към съществуващите** (merge by primary key).
- **Calendar export** — per-deadline or whole-library `.ics` export.
- **Delete everything** — Settings → "Изтрий всички данни", with a typed `ИЗТРИЙ` confirmation.

## What happens when the user clears browser data

If the user clears site data (or uninstalls the PWA), **all Срокник data is lost** unless an export was saved first. This is the intended trade-off of local-first design. The export/import flow is the migration path.

## Device-to-device sync

**Not in the MVP.** Sync requires either a sync server (breaks the privacy promise) or an end-to-end-encrypted sync layer (out of scope for the MVP). If the user wants their data on a second device today, they export + import.

## Promises we make (and what they actually mean)

| Claim shown to user | Technical meaning |
|---|---|
| "Без профил." | No identity system, no account table, no auth cookies. |
| "Без ЕГН." | EGN is never asked for and cannot be entered — no field accepts the format. |
| "Без банкови данни." | No payment fields anywhere. Plus is a teaser only. |
| "Данните са само на това устройство." | All persistence is `indexedDB`. No user data is sent to any origin. |
