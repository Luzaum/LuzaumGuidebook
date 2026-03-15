import { chromium } from 'playwright';

const baseUrl = 'http://127.0.0.1:5173';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const report = [];
const consoleErrors = [];
const pageErrors = [];

page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', (error) => pageErrors.push(String(error)));

async function getMainText() {
  return (await page.locator('main').first().innerText()).slice(0, 400);
}

async function runStep(name, url, checks) {
  const start = Date.now();
  try {
    await page.goto(`${baseUrl}${url}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await checks();
    report.push({ name, status: 'ok', durationMs: Date.now() - start, url: page.url(), mainText: await getMainText() });
  } catch (error) {
    report.push({ name, status: 'fail', durationMs: Date.now() - start, url: page.url(), error: String(error), mainText: await getMainText().catch(() => '') });
  }
}

await runStep('home', '/consulta-vet', async () => {
  await page.waitForSelector('input[placeholder*="Buscar"]', { timeout: 15000 });
  await page.waitForSelector('a[href="/consulta-vet/doencas"]', { timeout: 15000 });
});

await runStep('diseases-list', '/consulta-vet/doencas', async () => {
  await page.waitForSelector('input[placeholder*="sinônimo"], input[placeholder*="sinonimo"]', { timeout: 15000 });
  await page.waitForFunction(() => !!document.querySelector('a[href^="/consulta-vet/doencas/"]') || document.body.innerText.includes('Nenhuma doença encontrada'), { timeout: 15000 });
});

await runStep('disease-detail', '/consulta-vet/doencas/cinomose-canina', async () => {
  await page.waitForFunction(() => document.body.innerText.includes('Cinomose') || document.body.innerText.includes('Doença não encontrada'), { timeout: 15000 });
});

await runStep('medications-list', '/consulta-vet/medicamentos', async () => {
  await page.waitForSelector('input[placeholder*="princípio ativo"], input[placeholder*="principio ativo"]', { timeout: 15000 });
  await page.waitForFunction(() => !!document.querySelector('a[href^="/consulta-vet/medicamentos/"]') || document.body.innerText.includes('Nenhum medicamento encontrado'), { timeout: 15000 });
});

await runStep('medication-detail', '/consulta-vet/medicamentos/fenobarbital', async () => {
  await page.waitForFunction(() => document.body.innerText.includes('Fenobarbital') || document.body.innerText.includes('Medicamento não encontrado'), { timeout: 15000 });
});

await runStep('consensos-list', '/consulta-vet/consensos', async () => {
  await page.waitForSelector('input[placeholder*="título"], input[placeholder*="titulo"]', { timeout: 15000 });
  await page.waitForFunction(() => !!document.querySelector('a[href^="/consulta-vet/consensos/"]') || document.body.innerText.includes('Nenhum consenso encontrado') || document.body.innerText.includes('Falha ao carregar consensos'), { timeout: 15000 });
});

await runStep('consenso-detail', '/consulta-vet/consensos/leptospirose', async () => {
  await page.waitForFunction(() => document.body.innerText.includes('Leptospirose') || document.body.innerText.includes('Consenso não encontrado') || document.body.innerText.includes('Erro ao abrir consenso'), { timeout: 20000 });
});

await page.goto(`${baseUrl}/consulta-vet/doencas`, { waitUntil: 'domcontentloaded', timeout: 30000 });
const cards = page.locator('a[href^="/consulta-vet/doencas/"]');
const cardCount = await cards.count();
let backResult = null;
if (cardCount > 0) {
  await cards.first().click({ timeout: 15000 });
  await page.waitForTimeout(1200);
  await page.goBack({ waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(1200);
  backResult = { url: page.url(), mainText: await getMainText() };
}

console.log(JSON.stringify({ report, backResult, consoleErrors, pageErrors }, null, 2));
await browser.close();
