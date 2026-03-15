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
page.on('pageerror', (error) => {
  pageErrors.push(String(error));
});

async function step(name, fn) {
  const start = Date.now();
  try {
    const details = await fn();
    report.push({ name, status: 'ok', durationMs: Date.now() - start, details });
  } catch (error) {
    report.push({ name, status: 'fail', durationMs: Date.now() - start, details: String(error) });
  }
}

async function text(locator) {
  return (await locator.textContent())?.trim() || '';
}

await step('open-home', async () => {
  await page.goto(`${baseUrl}/consulta-vet`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForSelector('h1', { timeout: 15000 });
  return { url: page.url(), h1: await text(page.locator('h1').first()) };
});

await step('open-diseases', async () => {
  await page.getByRole('link', { name: /Doenças/i }).click();
  await page.waitForURL('**/consulta-vet/doencas', { timeout: 15000 });
  await page.waitForSelector('h1', { timeout: 15000 });
  const cards = await page.locator('a[href^="/consulta-vet/doencas/"] >> visible=true').count();
  return { url: page.url(), h1: await text(page.locator('h1').first()), cards };
});

await step('open-first-disease', async () => {
  const first = page.locator('a[href^="/consulta-vet/doencas/"]').first();
  await first.click();
  await page.waitForURL(/\/consulta-vet\/doencas\/.+/, { timeout: 20000 });
  await page.waitForSelector('h1', { timeout: 20000 });
  return { url: page.url(), h1: await text(page.locator('h1').first()) };
});

await step('go-back-from-disease', async () => {
  await page.goBack({ waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForURL('**/consulta-vet/doencas', { timeout: 15000 });
  return { url: page.url(), h1: await text(page.locator('h1').first()) };
});

await step('open-medications', async () => {
  await page.getByRole('link', { name: /Medicamentos/i }).click();
  await page.waitForURL('**/consulta-vet/medicamentos', { timeout: 15000 });
  const cards = await page.locator('a[href^="/consulta-vet/medicamentos/"]').count();
  return { url: page.url(), h1: await text(page.locator('h1').first()), cards };
});

await step('open-first-medication', async () => {
  const first = page.locator('a[href^="/consulta-vet/medicamentos/"]').first();
  await first.click();
  await page.waitForURL(/\/consulta-vet\/medicamentos\/.+/, { timeout: 20000 });
  await page.waitForSelector('h1', { timeout: 20000 });
  return { url: page.url(), h1: await text(page.locator('h1').first()) };
});

await step('open-consensos', async () => {
  await page.getByRole('link', { name: /Consensos/i }).click();
  await page.waitForURL('**/consulta-vet/consensos', { timeout: 15000 });
  await page.waitForSelector('h1', { timeout: 15000 });
  const cards = await page.locator('a[href^="/consulta-vet/consensos/"]').count();
  const empty = await page.locator('text=Nenhum consenso encontrado').count();
  const error = await page.locator('text=/Falha ao carregar consensos|Erro ao abrir consenso/i').count();
  return { url: page.url(), h1: await text(page.locator('h1').first()), cards, empty, error };
});

await step('open-first-consenso', async () => {
  const first = page.locator('a[href^="/consulta-vet/consensos/"]').first();
  if (!(await first.count())) {
    return { skipped: true };
  }
  await first.click();
  await page.waitForURL(/\/consulta-vet\/consensos\/.+/, { timeout: 20000 });
  await page.waitForSelector('h1', { timeout: 20000 });
  const pdfError = await page.locator('text=/Não foi possível carregar o PDF|Falha ao carregar/i').count();
  return { url: page.url(), h1: await text(page.locator('h1').first()), pdfError };
});

console.log(JSON.stringify({ report, consoleErrors, pageErrors }, null, 2));
await browser.close();
