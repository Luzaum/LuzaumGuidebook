import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const timings = [];
async function measure(url, text) {
  const start = Date.now();
  await page.goto(`http://127.0.0.1:5173${url}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForFunction((value) => document.body.innerText.includes(value), text, { timeout: 20000 });
  timings.push({ url, ms: Date.now() - start });
}
await measure('/consulta-vet/doencas/cinomose-canina', 'Resumo rápido');
await measure('/consulta-vet/medicamentos/fenobarbital', 'Calculadora de dose');
await measure('/consulta-vet/consensos', 'Leptospirose');
console.log(JSON.stringify(timings, null, 2));
await browser.close();
