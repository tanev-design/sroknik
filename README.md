# Срокник

> Срокник пази важните ти срокове.

A premium, **local-first**, Bulgarian-only web app for managing personal deadlines — cars, documents, bills. Works fully offline via IndexedDB, optionally syncs across devices via Supabase, and ships as an installable PWA.

Built by [tanev.design](https://tanev.design).

---

## Highlights

- **Local-first, privacy-first** — all data lives in your browser (IndexedDB). No account required to use the app.
- **Optional cloud sync** — sign in with Google (Supabase Auth) to mirror data across devices with strict Row-Level Security.
- **Installable PWA** — offline page, service worker, PNG icons, Add-to-Home-Screen on iOS / Android / desktop.
- **Browser notifications** — opt-in, local-only reminders triggered from the service worker.
- **Calendar exports** — `.ics` export per deadline or for all deadlines.
- **JSON backup & restore** — replace-or-merge import, schema-validated.
- **Срокник Plus** — subscription tier (€3/mo or €25/yr) via Stripe, gated by a signed license key + 3-device cap, issued and validated by a Cloudflare Worker.
- **Bulgarian only** — every string, plural form, date format, and category default is localised for `Europe/Sofia`.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | **SvelteKit 2** + **Svelte 5 Runes** (`$state`, `$derived`, `$effect`) |
| Language | **TypeScript** strict (`noUncheckedIndexedAccess`) |
| Styling | **Tailwind CSS v4** (`@tailwindcss/vite`, CSS-first `@theme`) |
| UI primitives | **Bits UI v2** (accessible headless Dialog, etc.) |
| Animation | **GSAP 3** |
| Icons | **Lucide Svelte** (tree-shaken) |
| Local DB | **Dexie 4** + `liveQuery` over IndexedDB |
| Auth + Sync | **Supabase** (Postgres + Google OAuth + RLS) |
| Dates | **date-fns v3** + **date-fns-tz** (`Europe/Sofia`) |
| PWA | **@vite-pwa/sveltekit** |
| Unit tests | **Vitest** |
| E2E tests | **Playwright** |
| Deploy (app) | **Cloudflare Pages** (static via `@sveltejs/adapter-static`) |
| Deploy (billing) | **Cloudflare Workers** + **KV** + **Stripe** + **Resend** |

## Routes

```
/             Днес — urgency buckets (spешно / скоро / по-късно)
/welcome      Onboarding (3 steps, dismissible)
/deadlines    List + filters (all / active / done / archived)
/deadlines/new  Add a deadline
/cars         Cars (name + reg. plate + owner)
/documents    Document sets tied to a person
/settings     Plan status, notifications, backup, restore, wipe
/plus         Срокник Plus — pricing table + activation
/how-it-works How the app works (public page)
/support      Support
/login        Supabase Google OAuth
/offline      Offline fallback
/privacy  /cookies  /terms  /legal
```

## Getting started

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # static site → ./build
npm run preview    # preview the production build
npm test           # vitest
npm run test:e2e   # playwright
npm run check      # svelte-check
npm run lint       # eslint + prettier --check
npm run format     # prettier --write
npm run icons      # regenerate PWA PNG icons from the SVG source
```

### Environment variables

Copy `.env.example` to `.env` and fill in whichever sections you need. **All variables are optional** — the app runs offline-only if none are set.

```bash
# Cloud Sync (Supabase)
PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
PUBLIC_SUPABASE_ANON_KEY="[anon-key]"

# Срокник Plus — license worker (Cloudflare Worker URL)
VITE_LICENSE_WORKER_URL="https://sroknik-license.[subdomain].workers.dev"

# Stripe — subscription (€3/mo + €25/yr) via embedded Pricing Table
VITE_STRIPE_PRICING_TABLE_ID="prctbl_..."
VITE_STRIPE_PUBLISHABLE_KEY="pk_live_..."
VITE_STRIPE_PORTAL_URL="https://billing.stripe.com/p/login/..."
VITE_STRIPE_PRICE_MONTHLY="price_..."
VITE_STRIPE_PRICE_YEARLY="price_..."
```

> **Heads-up:** on Cloudflare Pages, these variables must be added under *Project → Settings → Environment variables* **before** the first build; Vite inlines `PUBLIC_*` / `VITE_*` at build time, not at runtime.

## Architecture

### Local-first data flow

```
 UI (Svelte 5 Runes)
   ↓ reads
 Stores  ←── liveQuery wrappers  ←── Repositories (src/lib/db/repositories)
                                        ↓
                                    Dexie 4 (IndexedDB)
```

Writes always go to IndexedDB first; the UI reacts immediately. The app is fully usable with zero network.

### Optional cloud sync

`src/lib/db/sync.ts` is a two-way merge engine between IndexedDB and Supabase Postgres. RLS policies pin every row to `auth.uid()`, so users can only ever read or write their own rows. Sync is idempotent, last-write-wins, and resumes cleanly after offline edits.

### Срокник Plus billing

Plus is a subscription, delivered via a **license key** so no Supabase account is required to pay.

```
User clicks "Купи Срокник Plus" on /plus
  → Stripe Pricing Table (embedded, hosted checkout)
  → Stripe fires checkout.session.completed
  → Cloudflare Worker /webhook verifies the signature
  → Worker generates SRKN-XXXX-XXXX-XXXX-XXXX
  → Worker stores { email_hash, created, activations: 0 } in KV
  → Worker emails the key via Resend
  → User pastes key into Настройки → POST /activate
  → Worker validates + increments device count (max 3)
  → Browser flips settings.plan to 'plus' in IndexedDB
```

Customer portal (manage / cancel subscription) is exposed via `VITE_STRIPE_PORTAL_URL` in Настройки.

See [`workers/license/README.md`](workers/license/README.md) for worker setup, KV, secrets, and Stripe webhook configuration.

## Testing

```bash
npm test              # unit (Vitest)
npm run test:e2e      # end-to-end (Playwright, see playwright.config.ts)
npm run test:e2e:ui   # Playwright UI mode
```

Unit coverage includes:

- `urgency.ts` — day math across DST, threshold boundaries, Bulgarian plural forms, grouping & sorting.
- `plan-limits.ts` — free / plus caps per key.
- `import-schema.ts` — backup schema validation and negative cases.
- `reminder.ts` — `.ics` structure, escaping, filename slugs, offset normalisation.

E2E smoke covers today view, wiring, and the Plus activation flow.

## Deploying

### App (static, Cloudflare Pages)

1. Create a Cloudflare Pages project connected to this repo.
2. Build command: `npm run build`
3. Build output directory: `build`
4. Framework preset: **None** (plain static).
5. Add the environment variables from `.env.example` that you use.

The output in `./build` is a pure static bundle and can also be dropped on Netlify, Vercel (static), GitHub Pages, S3 + CloudFront, etc.

### License worker (Cloudflare Workers)

See [`workers/license/README.md`](workers/license/README.md).

## Project structure

```
src/
  app.css              # Tailwind v4 @theme tokens + global styles
  app.html
  lib/
    components/        # Svelte 5 components
    actions/           # Svelte use:action helpers
    constants/         # Categories, defaults, plan limits
    copy/              # Bulgarian strings + plural forms
    db/                # Dexie schema, repositories, Supabase client, sync
    logic/             # urgency, reminders, import/export, plan-limits
    stores/            # Runes-based reactive stores (via liveQuery)
    types/
    utils/
  routes/              # SvelteKit file-based routes (see table above)
workers/
  license/             # Cloudflare Worker: Stripe webhook + /activate + KV
e2e/                   # Playwright specs
scripts/               # generate-icons.ts (PNG PWA icons from SVG)
static/                # favicons, OG image, manifest icons
```

## License

All rights reserved. © tanev.design
