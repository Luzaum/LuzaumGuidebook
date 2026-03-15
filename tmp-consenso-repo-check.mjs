import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://127.0.0.1:5173/consulta-vet', { waitUntil: 'domcontentloaded', timeout: 30000 });
const result = await page.evaluate(async () => {
  try {
    const mod = await import('/modules/consulta-vet/services/consensoRepository.ts');
    const repo = mod.getConsensoRepository();
    const timeout = new Promise((resolve) => setTimeout(() => resolve({ timeout: true }), 10000));
    const response = await Promise.race([repo.list(), timeout]);
    return { ok: true, responseLength: Array.isArray(response) ? response.length : null, response };
  } catch (error) {
    return { ok: false, error: String(error) };
  }
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
