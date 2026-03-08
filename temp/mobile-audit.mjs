import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const base = 'http://127.0.0.1:4173';
const routes = ['/', '/hub', '/calculadora-energetica', '/crivet', '/veteletrolitico', '/fluidoterapia', '/transfusao-sanguinea', '/hemogasometria', '/dor', '/consulta-vet', '/neurologia', '/receituario-vet'];
const viewports = [
  { name: 'w375', width: 375, height: 812 },
  { name: 'w390', width: 390, height: 844 },
  { name: 'w430', width: 430, height: 932 }
];

const outDir = path.resolve('output/mobile-audit');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();

  for (const route of routes) {
    const url = `${base}${route}`;
    let navOk = true;
    let navError = '';
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(1000);
    } catch (e) {
      navOk = false;
      navError = String(e);
    }

    const safeRoute = route === '/' ? 'root' : route.replaceAll('/', '_').replace(/^_+/, '');
    const screenshotPath = path.join(outDir, `${safeRoute}_${vp.name}.png`);

    let metrics = null;
    let screenshotOk = true;
    let screenshotError = '';
    if (navOk) {
      metrics = await page.evaluate(() => {
        const doc = document.documentElement;
        const body = document.body;
        const maxWidth = Math.max(doc.scrollWidth, doc.offsetWidth, body ? body.scrollWidth : 0, body ? body.offsetWidth : 0);
        const viewportWidth = window.innerWidth;
        const horizontalOverflowPx = Math.max(0, maxWidth - viewportWidth);

        const interactive = Array.from(document.querySelectorAll('button, a, input, select, textarea, [role="button"]'))
          .filter((el) => {
            const r = el.getBoundingClientRect();
            const style = window.getComputedStyle(el);
            return r.width > 0 && r.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
          })
          .map((el) => {
            const r = el.getBoundingClientRect();
            return { w: r.width, h: r.height, tag: el.tagName.toLowerCase() };
          });

        const tinyTargets = interactive.filter((i) => i.w < 40 || i.h < 40).length;
        return { viewportWidth, maxWidth, horizontalOverflowPx, interactiveCount: interactive.length, tinyTargets, title: document.title, path: window.location.pathname };
      });

      try {
        await page.screenshot({ path: screenshotPath, fullPage: false, timeout: 120000 });
      } catch (e) {
        screenshotOk = false;
        screenshotError = String(e);
      }
    }

    results.push({ viewport: vp, route, url, navOk, navError, screenshotPath, screenshotOk, screenshotError, metrics });
  }

  await context.close();
}

await browser.close();

const reportPath = path.join(outDir, 'mobile-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));

console.log('REPORT', reportPath);
for (const route of routes) {
  const rows = results.filter(r => r.route === route);
  const overflowCount = rows.filter(r => r.metrics && r.metrics.horizontalOverflowPx > 0).length;
  const navFail = rows.filter(r => !r.navOk).length;
  const screenshotFail = rows.filter(r => !r.screenshotOk).length;
  const tinyAvg = rows.filter(r => r.metrics).reduce((acc, r) => acc + r.metrics.tinyTargets, 0) / Math.max(1, rows.filter(r => r.metrics).length);
  console.log(`${route} | overflow=${overflowCount}/${rows.length} | navFail=${navFail} | shotFail=${screenshotFail} | tinyAvg=${tinyAvg.toFixed(1)}`);
}
