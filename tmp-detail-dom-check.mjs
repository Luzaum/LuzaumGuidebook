import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
for (const route of ['/consulta-vet/doencas/cinomose-canina','/consulta-vet/medicamentos/fenobarbital']) {
  await page.goto(`http://127.0.0.1:5173${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(12000);
  const body = await page.locator('body').innerText();
  console.log('ROUTE', route);
  console.log(body.slice(0, 1200));
  console.log('---END---');
}
await browser.close();
