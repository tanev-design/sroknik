# Срокник (Sroknik)

> Срокник пази важните ти срокове.

A premium, local-first, Bulgarian-only browser app for managing personal deadlines — cars, documents, bills. No accounts, no EGN, no bank data. Everything lives in IndexedDB on the user's device.

## Stack

- **SvelteKit 2** + **Svelte 5 Runes** (`$state`, `$derived`, `$effect`)
- **TypeScript** (strict, `noUncheckedIndexedAccess`)
- **Tailwind CSS v4** via `@tailwindcss/vite` (CSS-first config, `@theme` tokens)
- **Bits UI v2** for accessible headless primitives (Dialog, etc.)
- **Dexie 4** for IndexedDB + `liveQuery` reactive bindings
- **date-fns v3** + **date-fns-tz** (`Europe/Sofia`)
- **Lucide Svelte** icons, tree-shaken
- **@vite-pwa/sveltekit** for offline / installable PWA
- **Vitest** for unit tests
- Deployed via **`@sveltejs/adapter-static`** to Cloudflare Pages (no Workers)

## Setup

```bash
npm install
npm run dev       # start dev server
npm run build     # build static site to ./build
npm run preview   # preview the production build locally
npm test          # run vitest
npm run check     # svelte-kit sync + svelte-check
npm run lint      # eslint + prettier --check
npm run format    # prettier --write
```

No environment variables are required — see `.env.example`.

## Deploying to Cloudflare Pages

The output of `npm run build` is a pure static site in `./build`.

1. Create a Cloudflare Pages project.
2. Build command: `npm run build`.
3. Output directory: `build`.
4. Framework preset: **None** (we ship static files).
5. No environment variables needed.

For local/self-hosted deployments, upload `./build` to any static host (Netlify, Vercel static, GitHub Pages, S3+CloudFront).

## Project structure

```
src/
├── lib/
│   ├── copy/bg.ts                # All Bulgarian UI strings
│   ├── constants/
│   │   ├── categories.ts         # 11 deadline categories
│   │   └── plan.ts               # FREE_PLAN / PLUS_PLAN
│   ├── db/
│   │   ├── local-db.ts           # Dexie instance + schema
│   │   ├── backup.ts             # export/import helpers
│   │   └── repositories/         # deadlines, cars, people, documents, settings
│   ├── logic/
│   │   ├── urgency.ts            # pure urgency + date helpers
│   │   ├── reminder.ts           # offsets + RFC-5545 .ics export
│   │   ├── plan-limits.ts        # free/plus limit checks
│   │   └── import-schema.ts      # validates JSON backups
│   ├── stores/                   # Svelte 5 rune + liveQuery stores
│   ├── types/index.ts
│   ├── utils/download.ts
│   └── components/               # UI by feature
├── routes/                       # / · /deadlines · /cars · /documents · /settings · /plus · /offline
├── app.html
└── app.css                       # Tailwind v4 @theme tokens
static/
├── favicon.svg
├── icons/icon-192.svg · icon-512.svg
└── robots.txt
```

### Architectural rules

- **Never** touch `db.*` directly from a `.svelte` component — always go through a repository.
- Stores use `liveQuery` wrapped around repositories and expose read-only getters.
- All data writes are async functions on repositories or `$lib/db/backup.ts`.
- Components read Bulgarian strings from `$lib/copy/bg.ts` — no hard-coded Bulgarian anywhere else.
- SSR is disabled globally (`ssr = false`) because IndexedDB does not exist on the server.

## Icons

The SVG app icons in `static/icons/` work on modern browsers. For the widest install-to-home-screen compatibility (older iOS, some Android launchers) generate PNG variants:

```bash
# example — any rasterizer works
npx @squoosh/cli --resize '{"width":192,"height":192}' -d static/icons static/icons/icon-192.svg
npx @squoosh/cli --resize '{"width":512,"height":512}' -d static/icons static/icons/icon-512.svg
```

Then update the `icons` array in `vite.config.ts` to point at the PNGs.

## Testing

```bash
npm test
```

Covers:

- `urgency.ts`: day math across DST, threshold boundaries, Bulgarian plural forms, grouping & sorting.
- `plan-limits.ts`: free/plus caps for each key.
- `import-schema.ts`: schema validation and negative cases.
- `reminder.ts`: ICS structure, escaping, filename slugs, offset normalization.

## What this app intentionally does NOT do

- No user accounts, no login, no cloud sync.
- No payment UI — Срокник Plus is marked "Скоро" and has no purchase flow.
- No server-side storage of any user data.
- No EGN, no banking data, no document uploads.
- No telemetry, no analytics.

See `PRIVACY_MODEL.md` for the full privacy stance.

## License

All rights reserved. Adjust as needed before releasing.
