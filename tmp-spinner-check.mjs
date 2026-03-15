import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://127.0.0.1:5173/consulta-vet/doencas/cinomose-canina', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(12000);
const result = await page.evaluate(() => ({
  hasSpinner: !!document.querySelector('.animate-spin'),
  mainChildren: document.querySelector('main main')?.innerHTML,
  pathname: location.pathname,
  readyState: document.readyState,
}));
console.log(JSON.stringify(result, null, 2));
await browser.close();
