import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://127.0.0.1:5173/consulta-vet/doencas/cinomose-canina', { waitUntil: 'domcontentloaded', timeout: 30000 });
for (const ms of [5000,10000,20000,40000]) {
  await page.waitForTimeout(ms === 5000 ? 5000 : ms - (ms === 10000 ? 5000 : ms === 20000 ? 10000 : 20000));
  const snapshot = await page.evaluate(() => ({
    hasSpinner: !!document.querySelector('.animate-spin'),
    text: document.body.innerText.slice(0,500)
  }));
  console.log('T', ms, JSON.stringify(snapshot));
}
await browser.close();
