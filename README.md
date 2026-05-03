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

## Payment Setup (Срокник Plus)

Plus is delivered via a license key issued by a Cloudflare Worker that
listens to Stripe's `checkout.session.completed` webhook. Full end-to-end:

```
User clicks "Купи Срокник Plus"
  → Stripe Payment Link (hosted checkout)
  → Stripe fires checkout.session.completed
  → Cloudflare Worker /webhook verifies signature
  → Worker generates SRKN-XXXX-XXXX-XXXX-XXXX key
  → Worker stores { email_hash, created, activations: 0 } in KV
  → Worker emails the key via Resend
  → User pastes key into Настройки → /activate
  → Worker validates + increments device count (max 3)
  → Browser flips settings.plan to 'plus' in IndexedDB
```

### 1. Create the KV namespace

```bash
cd workers/license
npm install
npx wrangler kv namespace create LICENSES
# paste the id into wrangler.toml
```

### 2. Set secrets

```bash
npx wrangler secret put STRIPE_WEBHOOK_SECRET
npx wrangler secret put HMAC_SECRET        # openssl rand -base64 32
npx wrangler secret put RESEND_API_KEY
```

### 3. Deploy the Worker

```bash
npx wrangler deploy
# note the workers.dev URL → .env VITE_LICENSE_WORKER_URL
```

### 4. Create the Stripe product + Payment Link

- Dashboard → Products → **Срокник Plus**, price `4.99 EUR` / `9.99 BGN`, one-time.
- Create a Payment Link from that product.
- Save the link URL into `.env` as `VITE_STRIPE_PAYMENT_LINK`.

### 5. Configure the Stripe webhook

- Dashboard → Developers → Webhooks → Add endpoint.
- URL: `https://sroknik-license.<YOUR_SUBDOMAIN>.workers.dev/webhook`
- Events: `checkout.session.completed`.
- Copy the signing secret → `wrangler secret put STRIPE_WEBHOOK_SECRET`.

## License

All rights reserved. Adjust as needed before releasing.
