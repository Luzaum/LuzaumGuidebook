import { chromium } from 'playwright';

const baseUrl = 'http://127.0.0.1:5173';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const report = [];

async function capture(name, url, waitForScript) {
  const startedAt = Date.now();
  try {
    await page.goto(`${baseUrl}${url}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForFunction(waitForScript, { timeout: 30000 });
    report.push({ name, status: 'ok', durationMs: Date.now() - startedAt, url: page.url(), text: (await page.locator('body').innerText()).slice(0, 500) });
  } catch (error) {
    report.push({ name, status: 'fail', durationMs: Date.now() - startedAt, url: page.url(), error: String(error), text: await page.locator('body').innerText().catch(() => '') });
  }
}

await capture('home', '/consulta-vet', () => document.body.innerText.includes('Consulta VET'));
await capture('diseases', '/consulta-vet/doencas', () => document.body.innerText.includes('Doenças') && (document.body.innerText.includes('Nenhuma doença encontrada') || document.querySelector('a[href^="/consulta-vet/doencas/"]')));
await capture('disease-detail', '/consulta-vet/doencas/cinomose-canina', () => document.body.innerText.includes('Cinomose') || document.body.innerText.includes('Doença não encontrada'));
await capture('medications', '/consulta-vet/medicamentos', () => document.body.innerText.includes('Medicamentos') && (document.body.innerText.includes('Nenhum medicamento encontrado') || document.querySelector('a[href^="/consulta-vet/medicamentos/"]')));
await capture('medication-detail', '/consulta-vet/medicamentos/fenobarbital', () => document.body.innerText.includes('Fenobarbital') || document.body.innerText.includes('Medicamento não encontrado'));
await capture('consensos', '/consulta-vet/consensos', () => document.body.innerText.includes('Consensos') && (document.body.innerText.includes('Nenhum consenso encontrado') || document.body.innerText.includes('Falha ao carregar consensos') || document.querySelector('a[href^="/consulta-vet/consensos/"]')));

console.log(JSON.stringify(report, null, 2));
await browser.close();
