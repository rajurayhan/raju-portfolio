/**
 * Builds public/og-card.png (1200×630) — composite headshot + gradient card layout for Open Graph.
 * Copy for title/description must stay aligned with src/constants/siteMeta.ts.
 */
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_TITLE =
  'Raju Rayhan — Head of Development @ Sulus.ai';
const DEFAULT_DESCRIPTION =
  'Head of Development @ Sulus.ai. I architect production software: AI voice, SaaS, RAG, automation. 10+ years. Engineering lead, remote, Dhaka, Bangladesh.';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const W = 1200;
const H = 630;

function escXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapWords(text, maxLen) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > maxLen && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function headlineLines(title) {
  const parts = title.split(/\s+—\s+/);
  if (parts.length === 2) {
    return [parts[0].trim(), `— ${parts[1].trim()}`];
  }
  return wrapWords(title, 28);
}

async function main() {
  const title = DEFAULT_TITLE;
  const description = DEFAULT_DESCRIPTION;
  const hLines = headlineLines(title);
  const bodyLines = wrapWords(description, 48);

  const headlineBlock = hLines
    .map((line, i) => {
      const y = 148 + i * 48;
      return `<text x="532" y="${y}" font-size="36" font-weight="700" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" fill="#f8f6f2">${escXml(line)}</text>`;
    })
    .join('\n');

  const bodyStartY = 148 + hLines.length * 48 + 36;
  const bodyBlock = bodyLines
    .map((line, i) => {
      const y = bodyStartY + i * 30;
      return `<text x="532" y="${y}" font-size="21" font-weight="400" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" fill="rgba(248,246,242,0.88)">${escXml(line)}</text>`;
    })
    .join('\n');

  const backgroundSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3a4234"/>
      <stop offset="45%" stop-color="#2c3228"/>
      <stop offset="100%" stop-color="#161914"/>
    </linearGradient>
    <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="28"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="-40" y="80" width="120" height="480" rx="24" fill="#e8e4dc" opacity="0.07" filter="url(#softBlur)"/>
  <rect x="920" y="-60" width="380" height="200" rx="32" fill="#e8e4dc" opacity="0.06" filter="url(#softBlur)"/>
  <rect x="44" y="54" width="432" height="522" rx="32" fill="rgba(255,255,255,0.06)"/>
</svg>`;

  const textSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${headlineBlock}
  ${bodyBlock}
</svg>`;

  const headshotPath = join(root, 'public/me-headshot.png');
  const headshotBuf = readFileSync(headshotPath);

  const maskSvg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="408" height="510"><rect width="408" height="510" rx="28" ry="28" fill="#fff"/></svg>`
  );

  const photo = await sharp(headshotBuf)
    .resize(408, 510, { fit: 'cover', position: 'centre' })
    .ensureAlpha()
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const base = await sharp(Buffer.from(backgroundSvg)).png().toBuffer();

  const withPhoto = await sharp(base)
    .composite([{ input: photo, left: 56, top: 60 }])
    .png()
    .toBuffer();

  const textLayer = await sharp(Buffer.from(textSvg))
    .ensureAlpha()
    .png()
    .toBuffer();

  const outPath = join(root, 'public/og-card.png');
  await sharp(withPhoto)
    .composite([{ input: textLayer, left: 0, top: 0 }])
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  const meta = await sharp(outPath).metadata();
  console.log(`Wrote ${outPath} (${meta.width}×${meta.height})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
