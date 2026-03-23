import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const baseDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e';
const seed = JSON.parse(fs.readFileSync(path.join(baseDir, 'seed.json'), 'utf8'));
const priorRun = JSON.parse(fs.readFileSync(path.join(baseDir, 'browser-e2e-result.json'), 'utf8'));
const freeName =
  priorRun.firstNameUpdated ||
  priorRun.log?.find?.((entry) => entry.step === 'manipulado_editado')?.name ||
  priorRun.log?.find?.((entry) => entry.step === 'manipulado_criado')?.name ||
  '';
const controlledName =
  priorRun.secondName ||
  priorRun.log?.find?.((entry) => entry.step === 'manipulado_controlado_criado')?.name ||
  '';
const shotsDir = path.join(baseDir, 'shots');
const downloadsDir = path.join(baseDir, 'downloads');
const resultFile = path.join(baseDir, 'manipulados-final-check.json');
fs.mkdirSync(shotsDir, { recursive: true });
fs.mkdirSync(downloadsDir, { recursive: true });

const log = [];
const push = (step, data = {}) => log.push({ step, time: new Date().toISOString(), ...data });
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function shot(page, name) {
  const file = path.join(shotsDir, name);
  await page.screenshot({ path: file, fullPage: true });
  push('screenshot', { file });
}

function fieldByLabel(root, labelText, selector) {
  return root.locator('label').filter({ hasText: labelText }).first().locator('xpath=..').locator(selector).first();
}

async function fillByLabel(root, labelText, value) {
  const input = fieldByLabel(root, labelText, 'input,textarea');
  await input.waitFor({ timeout: 30000 });
  await input.fill(String(value));
}

async function selectByLabel(root, labelText, value) {
  const input = fieldByLabel(root, labelText, 'select');
  await input.waitFor({ timeout: 30000 });
  await input.selectOption(String(value));
}

async function addCompoundedByName(page, itemName) {
  await page.getByTestId('nova-receita-add-compounded').click();
  const modal = page.getByText('Adicionar manipulado').locator('xpath=ancestor::div[contains(@class,"rounded-3xl")]').first();
  await modal.waitFor({ timeout: 30000 });
  await modal.getByTestId('compounded-modal-search').fill(itemName);
  const itemButton = modal.locator('button[data-testid^="compounded-modal-item-"]').filter({ hasText: itemName }).first();
  await itemButton.waitFor({ timeout: 30000 });
  await itemButton.click();
  const confirm = modal.getByTestId('compounded-modal-confirm');
  await confirm.waitFor({ timeout: 30000 });
  await confirm.click();
  await page.locator(`input[value="${itemName}"]`).waitFor({ timeout: 30000 });
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1600, height: 1200 }, acceptDownloads: true });
const page = await context.newPage();
let pdfTarget = '';

try {
  await page.goto('http://127.0.0.1:4173/login?next=%2Freceituario-vet%2Fnova-receita-2', { waitUntil: 'networkidle' });
  await page.getByLabel(/Email/i).fill(seed.email);
  await page.locator('#login-password').fill(seed.password);
  await page.getByRole('button', { name: /^Entrar$/ }).click();
  await page.waitForURL(/receituario-vet\/nova-receita-2/, { timeout: 30000 });
  push('login_ok', { email: seed.email, freeName, controlledName });

  await page.locator('input[placeholder="Buscar tutor..."]').first().fill('Tutor E2E');
  await page.getByText('Tutor E2E Manipulados').first().click();
  await page.locator('input[placeholder="Buscar paciente..."]').first().fill('Paciente E2E');
  await page.getByText('Paciente E2E').first().click();
  push('tutor_paciente_ok');

  await addCompoundedByName(page, freeName);
  await addCompoundedByName(page, controlledName);
  push('manipulados_adicionados', { freeName, controlledName });

  const freeCard = page.locator(`xpath=//div[contains(@class,"rxv-card")][.//input[@value="${freeName}"]]`).first();
  await fillByLabel(freeCard, 'Dose', '0,75 mL');
  await selectByLabel(freeCard, 'Modo de frequ', 'interval_hours');
  await fillByLabel(freeCard, 'Intervalo', '8');
  await fillByLabel(freeCard, 'Valor da dura', '7');
  await fillByLabel(freeCard, 'Quantidade final para manipular', '10 mL');
  await fieldByLabel(freeCard, 'Orienta', 'textarea').fill('Usar luvas e alternar os lados a cada administração.');

  await wait(1800);
  await page.getByText(/Quantidade final/i).first().waitFor({ timeout: 30000 });
  await page.getByText(/10 mL/i).first().waitFor({ timeout: 30000 });
  await page.getByText(/a cada 8 horas/i).first().waitFor({ timeout: 30000 });
  await page.getByText(/7 dias/i).first().waitFor({ timeout: 30000 });
  push('preview_ao_vivo_ok');
  await shot(page, '13-manipulados-final-receita.png');

  await page.getByRole('button', { name: /Revisar/i }).first().click();
  await wait(2500);
  await page.getByText(freeName).first().waitFor({ timeout: 30000 });
  await page.getByText(/Manipulação:/i).first().waitFor({ timeout: 30000 });
  await page.getByText(/Orientações ao tutor:/i).first().waitFor({ timeout: 30000 });
  push('preview_revisao_ok');
  await shot(page, '14-manipulados-final-preview.png');

  const downloadPromise = page.waitForEvent('download', { timeout: 60000 });
  await page.getByRole('button', { name: /Exportar PDF/i }).click();
  const download = await downloadPromise;
  pdfTarget = path.join(downloadsDir, download.suggestedFilename() || `manipulados-final-${Date.now()}.pdf`);
  await download.saveAs(pdfTarget);
  push('pdf_exportado', { file: pdfTarget, size: fs.statSync(pdfTarget).size });

  fs.writeFileSync(resultFile, JSON.stringify({ ok: true, freeName, controlledName, pdfTarget, log }, null, 2));
} catch (error) {
  push('fatal', { message: error instanceof Error ? error.message : String(error) });
  await shot(page, 'manipulados-final-fatal.png').catch(() => {});
  fs.writeFileSync(resultFile, JSON.stringify({ ok: false, pdfTarget, log }, null, 2));
  throw error;
} finally {
  await context.close();
  await browser.close();
}
