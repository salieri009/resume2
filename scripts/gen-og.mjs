// Renders the 1200×630 share card (public/og.png) in the site's orthographic
// language. Run: node scripts/gen-og.mjs   (needs the playwright chromium).
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public/og.png');

// --- Exploded axono motif (echoes the L1 timeline), computed in iso space ---
const S = 27;
const iso = (x, y, z) => [(x - z) * S, (x + z) * S * 0.5 - y * S];
function box(ox, oy, oz, w, h, d) {
  const p = (x, y, zz) => { const [a, b] = iso(ox + x, oy + y, oz + zz); return `${a.toFixed(1)},${b.toFixed(1)}`; };
  const top = `${p(0, h, 0)} ${p(w, h, 0)} ${p(w, h, d)} ${p(0, h, d)}`;
  const xf = `${p(w, 0, 0)} ${p(w, h, 0)} ${p(w, h, d)} ${p(w, 0, d)}`;
  const zf = `${p(0, 0, d)} ${p(0, h, d)} ${p(w, h, d)} ${p(w, 0, d)}`;
  return `<polygon points="${zf}" fill="#CFCBC3" stroke="#2A2C2E" stroke-width="1.3"/>
          <polygon points="${xf}" fill="#C4C0B8" stroke="#2A2C2E" stroke-width="1.3"/>
          <polygon points="${top}" fill="#E8E6E1" stroke="#2A2C2E" stroke-width="1.3"/>`;
}
function leader(ox, oy, oz) { const [a, b] = iso(ox, oy, oz); const [c, e] = iso(ox, oy - 1, oz); return `<line x1="${a.toFixed(1)}" y1="${b.toFixed(1)}" x2="${c.toFixed(1)}" y2="${e.toFixed(1)}" stroke="#2A2C2E" stroke-width="0.8" stroke-dasharray="3 3"/>`; }
const motif = `
  ${box(0, 0, 0, 4, 1.4, 4)}
  ${leader(2, 2.2, 2)}
  ${box(0.4, 2.2, 0.4, 3.2, 1.2, 3.2)}
  ${leader(2, 4.4, 2)}
  ${box(0.8, 4.4, 0.8, 2.4, 1.0, 2.4)}
`;

const html = `<!doctype html><html><head><meta charset="utf-8"/>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body { background: #F2F1ED; color: #2A2C2E; position: relative; overflow: hidden;
    font-family: "Source Serif 4", Georgia, serif; }
  .grid { position: absolute; inset: 0;
    background-image: linear-gradient(#D0CEC8 1px, transparent 1px), linear-gradient(90deg, #D0CEC8 1px, transparent 1px);
    background-size: 40px 40px; opacity: 0.5; }
  .frame { position: absolute; inset: 36px; border: 1.5px solid #2A2C2E; }
  .mono { font-family: "IBM Plex Mono", ui-monospace, monospace; }
  .stampTL { position: absolute; top: 54px; left: 60px; font-size: 15px; letter-spacing: 0.12em; color: #5A5D61; }
  .stampTR { position: absolute; top: 54px; right: 60px; font-size: 15px; letter-spacing: 0.12em; color: #5A5D61; }
  .title { position: absolute; left: 64px; top: 190px; font-size: 74px; font-weight: 600; line-height: 1.02; color: #0E0F10; letter-spacing: -0.01em; }
  .doctrine { position: absolute; left: 66px; top: 360px; font-style: italic; font-size: 27px; color: #2A2C2E; }
  .rule { position: absolute; left: 66px; top: 415px; width: 470px; border-top: 1px solid #C4C2BC; }
  .who { position: absolute; left: 66px; bottom: 66px; font-size: 15.5px; letter-spacing: 0.1em; color: #2A2C2E; }
  .facts { position: absolute; right: 60px; bottom: 66px; font-size: 15.5px; letter-spacing: 0.08em; color: #5A5D61; text-align: right; }
  .motif { position: absolute; right: 96px; top: 150px; }
</style></head>
<body>
  <div class="grid"></div>
  <div class="frame"></div>
  <div class="mono stampTL">SITE 009 · SALIERI · REVISION A</div>
  <div class="mono stampTR">ORTHOGRAPHIC MODE</div>
  <div class="title">The Architecture<br/>of Software</div>
  <div class="doctrine">Software is not written. It is constructed.</div>
  <div class="rule"></div>
  <div class="mono who">JUNGWOOK VAN · SOFTWARE ENGINEER — CLOUD &amp; DEVOPS</div>
  <div class="mono facts">UTS BIT · GPA 6.00/7.0 · WAM 80.31 · 144 CP</div>
  <svg class="motif" width="360" height="360" viewBox="-150 -170 360 360">${motif}</svg>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(250);
await page.screenshot({ path: OUT, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log('wrote', OUT);
