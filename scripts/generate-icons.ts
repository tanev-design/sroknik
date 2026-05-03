// Rasterises the existing SVG PWA icons into PNG variants.
// Run: npx tsx scripts/generate-icons.ts
//
// Why: older iOS and Android launchers silently ignore SVG icons in the
// web-app manifest. PNG variants are still required for wide PWA install
// compatibility, including iOS Add to Home Screen.

import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticDir = resolve(__dirname, '..', 'static', 'icons');

const sizes = [192, 512] as const;

async function main(): Promise<void> {
  for (const size of sizes) {
    const svgPath = resolve(staticDir, `icon-${size}.svg`);
    const pngPath = resolve(staticDir, `icon-${size}.png`);
    const svg = readFileSync(svgPath);
    await sharp(svg).resize(size, size).png({ compressionLevel: 9 }).toFile(pngPath);
    // eslint-disable-next-line no-console
    console.log(`\u2713 icon-${size}.png`);
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
