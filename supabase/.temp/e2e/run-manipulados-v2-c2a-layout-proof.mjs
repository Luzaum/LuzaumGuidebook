import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const seed = JSON.parse(fs.readFileSync('C:/PROJETOS VET/Vetius/supabase/.temp/e2e/seed.json', 'utf8'));
const outDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e';
const shotsDir = path.join(outDir, 'shots');
const resultFile = path.join(outDir, 'manipulados-v2-c2a-layout-proof.json');
fs.mkdirSync(shotsDir, { recursive: true });

const result = { ok: false, baseUrl: 'http://127.0.0.1:4177', shots: {}, log: [] };
const push = (step, data = {}) => result.log.push({ step, time: new Date().toISOString(), ...data });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1680, height: 1200 } });
const page = await context.newPage();

try {
  await page.goto('http://127.0.0.1:4177/login?next=%2Freceituario-vet%2Fmanipulados', { waitUntil: 'networkidle' });
  await page.getByLabel(/Email/i).fill(seed.email);
  await page.locator('#login-password').fill(seed.password);
  await page.getByRole('button', { name: /^Entrar$/ }).click();
  await page.waitForURL(/receituario-vet\/manipulados/, { timeout: 30000 });
  push('login_ok');

  await page.getByText(/Bloco 2/i).first().waitFor({ timeout: 30000 });
  const blockCard = page.locator('.rxv-card').filter({ has: page.getByText(/Bloco 2/i).first() }).first();
  await blockCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const blockFile = path.join(shotsDir, '68-v2-c2a-bloco2-layout-dev.png');
  await blockCard.screenshot({ path: blockFile });
  result.shots.block2 = blockFile;
  push('block2_shot', { file: blockFile });

  await page.evaluate(() => window.scrollTo({ top: 1800, behavior: 'instant' }));
  await page.waitForTimeout(600);
  const stickyFile = path.join(shotsDir, '69-v2-c2a-sidebar-sticky-dev.png');
  await page.screenshot({ path: stickyFile });
  result.shots.sticky = stickyFile;
  push('sticky_shot', { file: stickyFile });

  const stickyCheck = await page.evaluate(() => {
    const nav = document.querySelector('.rxv-desktop-sidebar');
    const navRect = nav?.getBoundingClientRect();
    const catalogCard = Array.from(document.querySelectorAll('.rxv-card')).find((entry) => entry.textContent?.includes('Catálogo magistral'));
    const catalogRect = catalogCard?.getBoundingClientRect();
    return {
      navTop: navRect?.top ?? null,
      navBottom: navRect?.bottom ?? null,
      catalogTop: catalogRect?.top ?? null,
      catalogBottom: catalogRect?.bottom ?? null,
      viewportHeight: window.innerHeight,
    };
  });
  result.stickyCheck = stickyCheck;
  push('sticky_metrics', stickyCheck);

  result.ok = true;
  fs.writeFileSync(resultFile, JSON.stringify(result, null, 2));
} catch (error) {
  result.error = error instanceof Error ? error.message : String(error);
  fs.writeFileSync(resultFile, JSON.stringify(result, null, 2));
  throw error;
} finally {
  await context.close();
  await browser.close();
}
