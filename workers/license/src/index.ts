/**
 * Срокник Plus license worker.
 *
 * Responsibilities:
 *  1. POST /webhook    — Stripe `checkout.session.completed` webhook
 *                        verifies signature, generates a license key,
 *                        stores it in KV and emails it via Resend.
 *  2. POST /activate   — Client-side activation endpoint. Validates the
 *                        key, enforces a per-key 3-device cap and a
 *                        per-IP 10/hour rate limit.
 *
 * Privacy stance:
 *  - We store only: a hash of the email, creation time, activation count.
 *  - We never store the plaintext email.
 *  - The license key format is SRKN-XXXX-XXXX-XXXX-XXXX (16 hex chars).
 */

interface Env {
  LICENSES: KVNamespace;
  STRIPE_WEBHOOK_SECRET: string;
  HMAC_SECRET: string;
  RESEND_API_KEY: string;
  CORS_ORIGIN: string;
}

interface LicenseRecord {
  email_hash: string;
  created: number;
  activations: number;
  revoked?: boolean;
  last_activated?: number;
}

const LICENSE_KEY_REGEX = /^SRKN-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/;
const DEVICE_LIMIT = 3;
const RATE_LIMIT_PER_HOUR = 10;

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    const corsHeaders: Record<string, string> = {
      'Access-Control-Allow-Origin': env.CORS_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'Origin'
    };

    // Enforce origin on any non-webhook request. The Stripe webhook is
    // server-to-server and is guarded by signature verification instead.
    if (url.pathname !== '/webhook') {
      const origin = req.headers.get('Origin');
      if (origin && origin !== env.CORS_ORIGIN) {
        return new Response('Forbidden', { status: 403 });
      }
    }

    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === '/activate' && req.method === 'POST') {
      return handleActivate(req, env, corsHeaders);
    }

    if (url.pathname === '/webhook' && req.method === 'POST') {
      return handleWebhook(req, env, corsHeaders);
    }

    if (url.pathname === '/health' && req.method === 'GET') {
      return json({ ok: true }, corsHeaders);
    }

    return new Response('Not found', { status: 404 });
  }
} satisfies ExportedHandler<Env>;

// ── /activate ───────────────────────────────────────────────────────────────

async function handleActivate(
  req: Request,
  env: Env,
  cors: Record<string, string>
): Promise<Response> {
  const ip = req.headers.get('CF-Connecting-IP') ?? 'unknown';

  // Basic IP-based rate limit: 10 attempts / hour / IP.
  const rateKey = `rate:${ip}`;
  const raw = await env.LICENSES.get(rateKey);
  const count = raw ? parseInt(raw, 10) || 0 : 0;
  if (count >= RATE_LIMIT_PER_HOUR) {
    return json({ ok: false, error: 'rate_limited' }, cors, 429);
  }
  await env.LICENSES.put(rateKey, String(count + 1), { expirationTtl: 3600 });

  let key: string;
  try {
    const body = (await req.json()) as { key?: unknown };
    if (typeof body.key !== 'string') {
      return json({ ok: false, error: 'invalid_key' }, cors, 400);
    }
    key = body.key.trim().toUpperCase();
  } catch {
    return json({ ok: false, error: 'invalid_body' }, cors, 400);
  }

  if (!LICENSE_KEY_REGEX.test(key)) {
    return json({ ok: false, error: 'invalid_key' }, cors, 400);
  }

  const record = await env.LICENSES.get<LicenseRecord>(key, 'json');
  if (!record) return json({ ok: false, error: 'not_found' }, cors, 404);
  if (record.revoked) return json({ ok: false, error: 'revoked' }, cors, 403);
  if (record.activations >= DEVICE_LIMIT) {
    return json({ ok: false, error: 'too_many_activations' }, cors, 403);
  }

  const updated: LicenseRecord = {
    ...record,
    activations: record.activations + 1,
    last_activated: Date.now()
  };
  await env.LICENSES.put(key, JSON.stringify(updated));

  return json(
    { ok: true, plan: 'plus' as const, activations: updated.activations },
    cors
  );
}

// ── /webhook (Stripe) ───────────────────────────────────────────────────────

async function handleWebhook(
  req: Request,
  env: Env,
  cors: Record<string, string>
): Promise<Response> {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') ?? '';

  const valid = await verifyStripeSignature(body, sig, env.STRIPE_WEBHOOK_SECRET);
  if (!valid) return new Response('Invalid signature', { status: 401 });

  interface StripeEvent {
    type: string;
    data?: { object?: Record<string, unknown> };
  }
  let event: StripeEvent;
  try {
    event = JSON.parse(body) as StripeEvent;
  } catch {
    return new Response('Invalid payload', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data?.object ?? {};
    const customerDetails = session.customer_details as
      | { email?: string }
      | undefined;
    const email =
      customerDetails?.email ??
      (typeof session.customer_email === 'string' ? session.customer_email : '');

    if (!email) {
      // Still ack the webhook; we just cannot issue a key without an email.
      return json({ received: true, issued: false }, cors);
    }

    const key = await generateLicenseKey(email, env.HMAC_SECRET);
    const emailHash = await sha256(email.toLowerCase().trim());

    const record: LicenseRecord = {
      email_hash: emailHash,
      created: Date.now(),
      activations: 0
    };
    await env.LICENSES.put(key, JSON.stringify(record));

    try {
      await sendLicenseEmail(email, key, env.RESEND_API_KEY);
    } catch (err) {
      // Do not fail the webhook if email delivery fails — Stripe will retry
      // and we do not want a duplicate key issued on retry. Record-keeping
      // of the key is the source of truth.
      console.error('resend failed', err);
    }
  }

  return json({ received: true }, cors);
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function json(
  data: unknown,
  cors: Record<string, string>,
  status = 200
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors }
  });
}

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function hmacSha256(secret: string, message: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return new Uint8Array(sig);
}

async function generateLicenseKey(email: string, secret: string): Promise<string> {
  const seed = `${email.toLowerCase().trim()}:${Date.now()}:${crypto.randomUUID()}`;
  const sig = await hmacSha256(secret, seed);
  const hex = Array.from(sig)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
    .slice(0, 16);
  return `SRKN-${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}`;
}

/** Stripe-spec constant-time signature verification. */
async function verifyStripeSignature(
  payload: string,
  signatureHeader: string,
  secret: string
): Promise<boolean> {
  try {
    const parts = Object.fromEntries(
      signatureHeader.split(',').map((p) => {
        const idx = p.indexOf('=');
        return idx === -1 ? [p, ''] : [p.slice(0, idx), p.slice(idx + 1)];
      })
    ) as Record<string, string>;

    const timestamp = parts.t;
    const expected = parts.v1;
    if (!timestamp || !expected) return false;

    // Reject signatures older than 5 minutes to mitigate replay.
    const ts = parseInt(timestamp, 10);
    if (!Number.isFinite(ts)) return false;
    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - ts) > 300) return false;

    const computed = await hmacSha256(secret, `${timestamp}.${payload}`);
    const expectedBytes = hexToBytes(expected);
    if (!expectedBytes) return false;

    return timingSafeEqual(computed, expectedBytes);
  } catch {
    return false;
  }
}

function hexToBytes(hex: string): Uint8Array | null {
  if (hex.length % 2 !== 0) return null;
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    const byte = parseInt(hex.substr(i * 2, 2), 16);
    if (!Number.isFinite(byte)) return null;
    out[i] = byte;
  }
  return out;
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  }
  return diff === 0;
}

async function sendLicenseEmail(to: string, key: string, apiKey: string): Promise<void> {
  const html = `
  <div style="font-family: system-ui, -apple-system, Segoe UI, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #171614;">
    <p style="font-size: 20px; font-weight: 600; margin: 0 0 8px;">Срокник Plus е активиран.</p>
    <p style="color: #776f66; margin: 0 0 24px;">Благодарим ти за доверието. Твоят лицензен ключ:</p>
    <div style="background: #f9f7f4; border: 1px solid #ded7ce; border-radius: 10px; padding: 20px; text-align: center; margin-bottom: 24px;">
      <code style="font-size: 20px; font-weight: 700; letter-spacing: 2px; color: #1f7a4a;">${key}</code>
    </div>
    <p style="color: #776f66; font-size: 14px; margin: 0 0 8px;">Как да го активираш:</p>
    <ol style="color: #776f66; font-size: 14px; margin: 0 0 24px; padding-left: 20px; line-height: 1.8;">
      <li>Отвори Срокник на устройството си</li>
      <li>Отиди в Настройки → Срокник Plus</li>
      <li>Въведи ключа и натисни „Активирай“</li>
    </ol>
    <p style="color: #776f66; font-size: 13px; margin: 0; border-top: 1px solid #ded7ce; padding-top: 16px;">
      Ключът може да се използва на до 3 устройства. Запази го на сигурно място — не го изпращаме повторно.
    </p>
    <p style="color: #b0a9a2; font-size: 12px; margin: 16px 0 0;">
      Данните ти остават на устройството ти. Ние не пазим нищо освен хеш на имейла ти.
    </p>
  </div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Срокник <no-reply@sroknik.com>',
      to: [to],
      subject: 'Твоят лицензен ключ за Срокник Plus',
      html
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend returned ${res.status}: ${text}`);
  }
}
