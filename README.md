# Срокник (Sroknik)

> Срокник пази важните ти срокове.

A premium, local-first, Bulgarian-only browser app for managing personal deadlines — cars, documents, bills. Features offline support via IndexedDB with robust two-way Cloud Sync via Supabase.

## Stack

- **SvelteKit 2** + **Svelte 5 Runes** (`$state`, `$derived`, `$effect`)
- **TypeScript** (strict, `noUncheckedIndexedAccess`)
- **Tailwind CSS v4** via `@tailwindcss/vite` (CSS-first config, `@theme` tokens)
- **Bits UI v2** for accessible headless primitives (Dialog, etc.)
- **Dexie 4** for IndexedDB + `liveQuery` reactive bindings
- **Supabase** (Postgres + Auth) for Google OAuth and Cloud Sync
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
```

### Environment Variables

To run the application locally with full functionality (Login & Sync), you must create a `.env` file in the root directory:

```bash
PUBLIC_SUPABASE_URL="https://[YOUR_PROJECT_REF].supabase.co"
PUBLIC_SUPABASE_ANON_KEY="[YOUR_ANON_KEY]"
```

## Deploying to Cloudflare Pages

The output of `npm run build` is a pure static site in `./build`.

1. Create a Cloudflare Pages project.
2. Build command: `npm run build`.
3. Output directory: `build`.
4. Framework preset: **None** (we ship static files).
5. **CRITICAL:** Add `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` to the Cloudflare Pages Environment Variables before deploying!

For local/self-hosted deployments, upload `./build` to any static host (Netlify, Vercel static, GitHub Pages, S3+CloudFront).

## Architecture & Sync

- **Local-First:** Data is always written to IndexedDB (via Dexie) first. The app remains fully functional offline.
- **Sync Engine:** The `src/lib/db/sync.ts` engine merges local state with the Supabase Postgres database.
- **Row Level Security (RLS):** Ensures strict data isolation per user when synced to the cloud.
- **Stores:** Svelte 5 stores use `liveQuery` wrapped around local repositories, exposing reactive, read-only state.

## Testing

```bash
npm test
```

Covers:
- `urgency.ts`: day math across DST, threshold boundaries, Bulgarian plural forms, grouping & sorting.
- `plan-limits.ts`: free/plus caps for each key.
- `import-schema.ts`: schema validation and negative cases.
- `reminder.ts`: ICS structure, escaping, filename slugs, offset normalization.

## License

All rights reserved. Adjust as needed before releasing.
