import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';

const BASE = 'http://127.0.0.1:4173';
const outDir = 'scripts/evidence/polish';
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const report = [];
const note = (m) => {
  report.push(m);
  console.log(m);
};

async function snap(name) {
  const path = `${outDir}/${name}.png`;
  await page.screenshot({ path, fullPage: false });
  note(`shot:${name}`);
  return path;
}

async function hudProbe() {
  return page.evaluate(() => {
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const lobby = document.querySelector('.site-lobby');
    const spec = document.querySelector('.site-spec');
    const rail = document.querySelector('.site-rail');
    const plan = document.querySelector('.site-plan');
    const more = document.querySelector('.site-lobby-more, .site-plan-more');
    const kicker = document.querySelector('.site-lobby-kicker, .site-plan-kicker, .site-spec-sheet');
    return {
      hash: location.hash,
      lobby: !!lobby,
      lobbyTitle: lobby?.querySelector('.site-lobby-title')?.textContent ?? null,
      lobbyMore: !!more,
      lobbyBg: lobby ? cs(lobby).backgroundColor : null,
      lobbyKickerColor: lobby?.querySelector('.site-lobby-kicker')
        ? cs(lobby.querySelector('.site-lobby-kicker')).color
        : null,
      spec: !!spec,
      specSheet: spec?.querySelector('.site-spec-sheet')?.textContent ?? null,
      specTitle: spec?.querySelector('.site-spec-title')?.textContent ?? null,
      specBg: spec ? cs(spec).backgroundColor : null,
      rail: !!rail,
      railGradient: rail ? /gradient/i.test(cs(rail).backgroundImage) : null,
      plan: !!plan,
      planSheet: !!document.querySelector('.site-plan-sheet'),
    };
  });
}

async function waitHud() {
  await page.waitForFunction(
    () =>
      !!document.querySelector('.site-lobby') ||
      !!document.querySelector('.site-rail') ||
      !!document.querySelector('.site-plan') ||
      !!document.querySelector('.site-spec'),
    { timeout: 25000 },
  );
  await page.waitForTimeout(1600);
}

async function clickFloor(id) {
  const rail = page.locator('.site-rail-floors > li > button', { hasText: new RegExp(`^${id}$|^${id}\\b`) }).first();
  const plan = page.locator('.site-plan-floor', { hasText: id }).first();
  if (await rail.count()) {
    await rail.click();
    note(`click:rail:${id}`);
    return;
  }
  if (await plan.count()) {
    await plan.click();
    note(`click:plan:${id}`);
    return;
  }
  await page.goto(`${BASE}/#/${id === 'L0' ? 'L0' : id === 'B1' ? 'B1/core' : id === 'R' ? 'R/roof' : `${id}/timeline`}`, {
    waitUntil: 'networkidle',
  });
  note(`goto:hash:${id}`);
}

// --- L0 hard reload ---
await page.goto(`${BASE}/#/L0`, { waitUntil: 'networkidle' });
await page.reload({ waitUntil: 'networkidle' });
await waitHud();
let s = await hudProbe();
note(`L0: ${JSON.stringify(s)}`);
await snap('01-l0-lobby');

// Expand read-more if present
const summary = page.locator('.site-lobby-more > summary').first();
if (await summary.count()) {
  await summary.click();
  await page.waitForTimeout(400);
  note('clicked:lobby-read-more');
  await snap('01b-l0-read-more');
}

// --- L1 timeline ---
await clickFloor('L1');
await page.waitForTimeout(1400);
s = await hudProbe();
note(`L1: ${JSON.stringify(s)}`);
if (s.lobby) {
  await page.goto(`${BASE}/#/L1/timeline`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  s = await hudProbe();
  note(`L1-force: ${JSON.stringify(s)}`);
}
await snap('02-l1-timeline');

// --- B1 core ---
await page.goto(`${BASE}/#/B1/core`, { waitUntil: 'networkidle' });
await waitHud();
s = await hudProbe();
note(`B1: ${JSON.stringify(s)}`);
await snap('03-b1-core');

// hover a canvas-ish area to try caption (best-effort)
await page.mouse.move(720, 480);
await page.waitForTimeout(600);
await snap('03b-b1-hover');

// --- Roof ---
await page.goto(`${BASE}/#/R/roof`, { waitUntil: 'networkidle' });
await waitHud();
s = await hudProbe();
note(`R: ${JSON.stringify(s)}`);
await snap('04-roof');

// --- Mobile plan ---
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${BASE}/#/L0`, { waitUntil: 'networkidle' });
await page.reload({ waitUntil: 'networkidle' });
await waitHud();
s = await hudProbe();
note(`mobile-L0: ${JSON.stringify(s)}`);
await snap('05-mobile-l0');

await page.goto(`${BASE}/#/L1/timeline`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
s = await hudProbe();
note(`mobile-L1: ${JSON.stringify(s)}`);
await snap('06-mobile-l1');

writeFileSync(`${outDir}/report.json`, JSON.stringify(report, null, 2));
await browser.close();
note('DONE');
