import { chromium } from 'playwright';

const base = 'http://127.0.0.1:4173';
const routes = ['/crivet','/consulta-vet'];
const viewports = [
  { name: 'w375', width: 375, height: 812 },
  { name: 'w390', width: 390, height: 844 },
  { name: 'w430', width: 430, height: 932 }
];

const browser = await chromium.launch({ headless: true });
for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(1000);
    const metrics = await page.evaluate(() => {
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
          return { w: r.width, h: r.height };
        });
      const tinyTargets = interactive.filter((i) => i.w < 40 || i.h < 40).length;
      return { horizontalOverflowPx, tinyTargets, count: interactive.length };
    });
    console.log(`${route} ${vp.name} overflow=${metrics.horizontalOverflowPx} tiny=${metrics.tinyTargets}/${metrics.count}`);
  }
  await context.close();
}
await browser.close();
