import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const out = (p) => resolve(process.cwd(), 'static', p);

// ---------- OG image (1200x630) ----------
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1F7A4A"/>
      <stop offset="1" stop-color="#1E5C3A"/>
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/>
      <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.04 0"/>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" filter="url(#grain)"/>
  <!-- safe zone 60px inset -->
  <g transform="translate(96 165)">
    <!-- icon block -->
    <g fill="none" stroke="#FFFFFF" stroke-width="14" stroke-linecap="round" stroke-linejoin="round">
      <rect x="0" y="40" width="240" height="210" rx="30"/>
      <line x1="0" y1="106" x2="240" y2="106"/>
      <line x1="66" y1="0" x2="66" y2="48"/>
      <line x1="174" y1="0" x2="174" y2="48"/>
      <polyline points="66,180 102,216 180,138"/>
    </g>
  </g>
  <g transform="translate(400 220)" fill="#FFFFFF">
    <text x="0" y="0" font-family="Segoe UI, Arial, sans-serif" font-size="120" font-weight="700" letter-spacing="-2">Срокник</text>
    <text x="0" y="80" font-family="Segoe UI, Arial, sans-serif" font-size="36" font-weight="500" fill="#D6E8DD">Личен календар за важни срокове</text>
    <text x="0" y="138" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="400" fill="#A8C9B6">Коли · Документи · Плащания</text>
  </g>
  <text x="96" y="570" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="500" fill="#A8C9B6">sroknik.com</text>
  <text x="1104" y="570" text-anchor="end" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="500" fill="#A8C9B6">Работи офлайн</text>
</svg>`;

await sharp(Buffer.from(ogSvg))
  .png({ compressionLevel: 9, quality: 90 })
  .toFile(out('og.png'));
console.log('og.png ok');

// ---------- Square brand SVG (re-used) ----------
const squareSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="112" fill="#1F7A4A"/>
  <g fill="none" stroke="#FFFFFF" stroke-width="28" stroke-linecap="round" stroke-linejoin="round">
    <rect x="96" y="136" width="320" height="280" rx="40"/>
    <line x1="96" y1="224" x2="416" y2="224"/>
    <line x1="184" y1="96" x2="184" y2="160"/>
    <line x1="328" y1="96" x2="328" y2="160"/>
    <polyline points="184,312 232,360 336,256"/>
  </g>
</svg>`;

// ---------- apple-touch-icon (180x180) ----------
await sharp(Buffer.from(squareSvg)).resize(180, 180).png().toFile(out('apple-touch-icon.png'));
console.log('apple-touch-icon.png ok');

// ---------- favicon PNG fallbacks ----------
await sharp(Buffer.from(squareSvg)).resize(32, 32).png().toFile(out('favicon-32.png'));
await sharp(Buffer.from(squareSvg)).resize(16, 16).png().toFile(out('favicon-16.png'));
console.log('favicon-16/32 ok');

// ---------- maskable icon 512 (transparent safe zone) ----------
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#1F7A4A"/>
  <g fill="none" stroke="#FFFFFF" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" transform="translate(0 0)">
    <rect x="136" y="166" width="240" height="210" rx="32"/>
    <line x1="136" y1="232" x2="376" y2="232"/>
    <line x1="200" y1="136" x2="200" y2="180"/>
    <line x1="312" y1="136" x2="312" y2="180"/>
    <polyline points="200,304 240,344 320,256"/>
  </g>
</svg>`;
await sharp(Buffer.from(maskable)).resize(512, 512).png().toFile(out('icons/icon-512-maskable.png'));
console.log('maskable 512 ok');
