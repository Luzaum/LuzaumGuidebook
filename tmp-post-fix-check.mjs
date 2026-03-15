import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
for (const route of ['/consulta-vet/doencas/cinomose-canina','/consulta-vet/medicamentos/fenobarbital','/consulta-vet/consensos']) {
  await page.goto(`http://127.0.0.1:5173${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(5000);
  const snapshot = await page.evaluate(() => ({
    hasSpinner: !!document.querySelector('.animate-spin'),
    text: document.body.innerText.slice(0,1200)
  }));
  console.log('ROUTE', route, JSON.stringify(snapshot));
}
await browser.close();
