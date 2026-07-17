import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
const fails = [];

for (let i = 0; i < 8; i++) {
  await page.goto(`${BASE}/#/L0`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const l1 = page.locator('.site-rail-floors > li > button', { hasText: 'L1' }).first();
  if (await l1.count()) await l1.click();
  else await page.goto(`${BASE}/#/L1/timeline`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  const s = await page.evaluate(() => {
    const lobby = document.querySelector('.site-lobby');
    const spec = document.querySelector('.site-spec');
    const bg = spec ? getComputedStyle(spec).backgroundColor : '';
    const op = spec ? getComputedStyle(spec).opacity : '';
    return { lobby: !!lobby, spec: !!spec, bg, op, hash: location.hash };
  });
  const opaque =
    s.spec && s.op === '1' && /rgb\(242,\s*241,\s*237\)/.test(s.bg) && !s.lobby && s.hash.includes('L1');
  console.log(i, JSON.stringify(s), 'opaquePass=' + opaque);
  if (!opaque) fails.push(s);
}

await browser.close();
if (fails.length) {
  console.error('FAILS', fails.length);
  process.exit(1);
}
console.log('FLAKE_OK');
