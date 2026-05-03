# sroknik-license (Cloudflare Worker)

License issuance + activation for **Срокник Plus**.

- `POST /webhook` — Stripe `checkout.session.completed` handler. Verifies
  the signature, generates a license key, stores it in KV, emails it.
- `POST /activate` — Client-side activation. Validates format, enforces a
  3-device cap per key and a 10 attempts/hour per-IP rate limit.
- `GET  /health`   — Liveness probe.

Privacy: we store only `email_hash`, `created`, `activations`, `revoked`.
We never persist the plaintext email.

## Setup

```bash
cd workers/license
npm install

# 1. KV namespace
npx wrangler kv namespace create LICENSES
# copy the returned id into wrangler.toml

# 2. Secrets
npx wrangler secret put STRIPE_WEBHOOK_SECRET
npx wrangler secret put HMAC_SECRET      # openssl rand -base64 32
npx wrangler secret put RESEND_API_KEY

# 3. Deploy
npx wrangler deploy
```

After deploy, note the `workers.dev` URL and add it to the root
`.env.example` as `VITE_LICENSE_WORKER_URL`.

## Stripe configuration

1. Dashboard → Products → **Срокник Plus**, price €4.99 / 9.99 лв., one-time.
2. Create a **Payment Link** and add it to the root `.env` as
   `VITE_STRIPE_PAYMENT_LINK`.
3. Dashboard → Developers → Webhooks → Add endpoint:
   - URL: `https://sroknik-license.<YOUR_SUBDOMAIN>.workers.dev/webhook`
   - Events: `checkout.session.completed`
   - Copy the signing secret → `wrangler secret put STRIPE_WEBHOOK_SECRET`.

## Local dev

```bash
npx wrangler dev
# POST http://127.0.0.1:8787/activate with { "key": "SRKN-..." }
```

For local Stripe replay: `stripe listen --forward-to localhost:8787/webhook`.
