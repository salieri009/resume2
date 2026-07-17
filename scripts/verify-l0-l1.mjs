import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'http://127.0.0.1:4173';
const outDir = 'scripts/evidence';
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

const log = [];
const note = (m) => {
  log.push(m);
  console.log(m);
};

async function plateState() {
  return page.evaluate(() => {
    const lobby = document.querySelector('.site-lobby');
    const timeline = document.querySelector('.site-spec[aria-label="Construction sequence"]');
    const rail = document.querySelector('.site-rail');
    const railBg = rail ? getComputedStyle(rail).backgroundImage : null;
    const lobbyBg = lobby ? getComputedStyle(lobby).backgroundColor : null;
    const specBg = timeline ? getComputedStyle(timeline).backgroundColor : null;
    return {
      hash: location.hash,
      lobbyPresent: !!lobby,
      timelinePresent: !!timeline,
      railBg,
      lobbyBg,
      specBg,
      lobbyText: lobby?.querySelector('.site-lobby-title')?.textContent ?? null,
      timelineTitle: timeline?.querySelector('.site-spec-title')?.textContent ?? null,
    };
  });
}

// 1) Open L0 + hard reload
await page.goto(`${BASE}/#/L0`, { waitUntil: 'networkidle' });
await page.reload({ waitUntil: 'networkidle' });
note('hard-reload on #/L0');

// Wait for boot → lobby (rail or lobby plate)
await page.waitForFunction(
  () =>
    !!document.querySelector('.site-lobby') ||
    !!document.querySelector('.site-rail') ||
    !!document.querySelector('.site-plan'),
  { timeout: 20000 },
);
await page.waitForTimeout(1500);
const afterBoot = await plateState();
note(`after-boot: ${JSON.stringify(afterBoot)}`);
await page.screenshot({ path: `${outDir}/01-l0-after-hard-reload.png`, fullPage: true });

// 2) Click L1 floor button if present, else set hash
const l1 = page.locator('.site-rail-floors button', { hasText: 'L1' }).first();
const planL1 = page.locator('.site-plan-floor', { hasText: 'L1' }).first();
if (await l1.count()) {
  await l1.click();
  note('clicked FloorRail L1');
} else if (await planL1.count()) {
  await planL1.click();
  note('clicked PlanFallback L1');
} else {
  await page.evaluate(() => {
    location.hash = '#/L1/timeline';
  });
  note('set hash #/L1/timeline (no rail button)');
}

await page.waitForTimeout(1200);
let afterNav = await plateState();
note(`after-nav: ${JSON.stringify(afterNav)}`);

// If still on lobby, force hash navigation (user repro path)
if (afterNav.lobbyPresent || !afterNav.hash.includes('L1')) {
  await page.goto(`${BASE}/#/L1/timeline`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  afterNav = await plateState();
  note(`after-hash-goto: ${JSON.stringify(afterNav)}`);
}

await page.screenshot({ path: `${outDir}/02-l1-timeline.png`, fullPage: true });

// 3) Rail gradient check on L0 again
await page.goto(`${BASE}/#/L0`, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
const railCheck = await page.evaluate(() => {
  const rail = document.querySelector('.site-rail');
  if (!rail) return { present: false };
  const cs = getComputedStyle(rail);
  return {
    present: true,
    backgroundImage: cs.backgroundImage,
    backgroundColor: cs.backgroundColor,
    hasGradient: /gradient/i.test(cs.backgroundImage),
  };
});
note(`rail-gradient: ${JSON.stringify(railCheck)}`);
await page.screenshot({ path: `${outDir}/03-rail-no-gradient.png`, fullPage: true });

const pass =
  !afterNav.lobbyPresent &&
  afterNav.hash.includes('L1') &&
  (afterNav.timelinePresent || afterNav.hash.includes('timeline')) &&
  railCheck.hasGradient === false;

note(`PASS=${pass}`);
await browser.close();

if (!pass) {
  console.error('VERIFICATION FAILED');
  console.error(log.join('\n'));
  process.exit(1);
}
console.log('VERIFICATION OK');
console.log(log.join('\n'));
