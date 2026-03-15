import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const results = [];

async function timed(name, action) {
  const startedAt = Date.now();
  try {
    const details = await action();
    results.push({ name, status: 'ok', durationMs: Date.now() - startedAt, ...details });
  } catch (error) {
    results.push({ name, status: 'fail', durationMs: Date.now() - startedAt, error: String(error) });
  }
}

await timed('home', async () => {
  await page.goto('http://127.0.0.1:5173/consulta-vet', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForFunction(() => document.body.innerText.includes('Consulta VET'), { timeout: 15000 });
  return { url: page.url() };
});

await timed('diseases-list', async () => {
  await page.goto('http://127.0.0.1:5173/consulta-vet/doencas', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForFunction(() => document.body.innerText.includes('Doenças') && document.body.innerText.includes('Cinomose Canina'), { timeout: 15000 });
  return { url: page.url() };
});

await timed('disease-detail', async () => {
  await page.goto('http://127.0.0.1:5173/consulta-vet/doencas/cinomose-canina', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForFunction(() => document.body.innerText.includes('Cinomose Canina') && document.body.innerText.includes('Resumo rápido'), { timeout: 15000 });
  return { url: page.url() };
});

await timed('back-from-disease', async () => {
  await page.goBack({ waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForFunction(() => document.body.innerText.includes('Doenças') && document.body.innerText.includes('Cinomose Canina'), { timeout: 15000 });
  return { url: page.url() };
});

await timed('medications-list', async () => {
  await page.goto('http://127.0.0.1:5173/consulta-vet/medicamentos', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForFunction(() => document.body.innerText.includes('Medicamentos') && document.body.innerText.includes('Fenobarbital'), { timeout: 15000 });
  return { url: page.url() };
});

await timed('medication-detail', async () => {
  await page.goto('http://127.0.0.1:5173/consulta-vet/medicamentos/fenobarbital', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForFunction(() => document.body.innerText.includes('Fenobarbital') && document.body.innerText.includes('Calculadora de dose'), { timeout: 15000 });
  return { url: page.url() };
});

await timed('consensos-list', async () => {
  await page.goto('http://127.0.0.1:5173/consulta-vet/consensos', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForFunction(() => document.body.innerText.includes('Consensos') && document.body.innerText.includes('Leptospirose'), { timeout: 15000 });
  return { url: page.url() };
});

console.log(JSON.stringify(results, null, 2));
await browser.close();
