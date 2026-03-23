import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const seed = JSON.parse(fs.readFileSync('C:/PROJETOS VET/Vetius/supabase/.temp/e2e/seed.json', 'utf8'));
const outDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e';
const shotsDir = path.join(outDir, 'shots');
const downloadsDir = path.join(outDir, 'downloads');
fs.mkdirSync(shotsDir, { recursive: true });
fs.mkdirSync(downloadsDir, { recursive: true });
const log = [];
let savedPrescriptionId = '';

function push(step, data = {}) { log.push({ step, time: new Date().toISOString(), ...data }); }
async function shot(page, name) { const file = path.join(shotsDir, name); await page.screenshot({ path: file, fullPage: true }); push('screenshot', { file }); }
function labelField(root, labelText, selector) {
  return root.locator('label').filter({ hasText: labelText }).first().locator('xpath=..').locator(selector).first();
}
async function fillByLabel(root, labelText, value) {
  const field = labelField(root, labelText, 'input,textarea');
  await field.waitFor({ timeout: 30000 });
  await field.fill(String(value));
}
async function selectByLabel(root, labelText, value) {
  const field = labelField(root, labelText, 'select');
  await field.waitFor({ timeout: 30000 });
  await field.selectOption(String(value));
}
function cardByTitle(page, titlePart) {
  return page.locator('div').filter({ has: page.getByText(titlePart, { exact: false }) }).filter({ has: page.locator('.rxv-card, [class*="rxv-card"]') }).first();
}
async function selectCompoundedModalItem(modal, name) {
  const searchInput = modal.getByTestId('compounded-modal-search');
  await searchInput.fill(name);
  const itemButton = modal.locator('button[data-testid^="compounded-modal-item-"]').filter({ hasText: name }).first();
  await itemButton.waitFor({ timeout: 30000 });
  await itemButton.click();
  const confirmButton = modal.getByTestId('compounded-modal-confirm');
  await confirmButton.waitFor({ state: 'visible', timeout: 30000 });
  await confirmButton.waitFor({ state: 'attached', timeout: 30000 });
  await modal.getByText(name, { exact: false }).first().waitFor({ timeout: 30000 });
  await page.waitForFunction(() => {
    const button = document.querySelector('[data-testid="compounded-modal-confirm"]');
    return !!button && !button.hasAttribute('disabled');
  });
  return confirmButton;
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1600, height: 1200 } });
const page = await context.newPage();
page.on('dialog', async (dialog) => { push('dialog', { message: dialog.message() }); await dialog.accept(); });
page.on('response', async (response) => {
  const url = response.url();
  if (!url.includes('/rest/v1/prescriptions')) return;
  if (!['POST', 'PATCH'].includes(response.request().method())) return;
  try {
    const body = await response.json();
    const row = Array.isArray(body) ? body[0] : body;
    if (row?.id) {
      savedPrescriptionId = row.id;
      push('prescription_response', { id: row.id, url });
    }
  } catch {}
});

const firstName = `Codex Formula Magistral ${Date.now()}`;
const firstNameUpdated = `${firstName} Atualizada`;
const secondName = `Codex Formula Controlada ${Date.now()}`;
const protocolName = `Protocolo Magistral ${Date.now()}`;

try {
  await page.goto('http://127.0.0.1:4173/login?next=%2Freceituario-vet%2Fmanipulados', { waitUntil: 'networkidle' });
  await page.getByLabel(/Email/i).fill(seed.email);
  await page.locator('#login-password').fill(seed.password);
  await page.getByRole('button', { name: /^Entrar$/ }).click();
  await page.waitForURL(/receituario-vet\/manipulados/, { timeout: 30000 });
  push('login_ok', { email: seed.email });
  await shot(page, '01-manipulados-login.png');

  const identity = page.locator('div').filter({ has: page.getByText('Identidade', { exact: false }) }).first();
  const composition = page.locator('div').filter({ has: page.getByText('Composi', { exact: false }) }).first();
  const regimens = page.locator('div').filter({ has: page.getByText('Regimes de Uso', { exact: false }) }).first();

  await page.getByTestId('manipulados-new-button').click();
  await page.waitForFunction(() => {
    const input = document.querySelector('input[placeholder*="Gabapentina magistral"]');
    return !!input && input.value === '';
  });
  const formulaNameInput = page.locator('input[placeholder*="Gabapentina magistral"]').first();
  await formulaNameInput.fill(firstName);
  await fillByLabel(identity, 'Descri', 'Formula magistral de uso clinico para validacao E2E do ReceituarioVET.');
  await fillByLabel(composition, 'Ingrediente 1', 'Gabapentina');
  await fillByLabel(composition, 'Concentra', '50 mg/mL');
  await fillByLabel(regimens, 'Nome do regime', 'Dor neuropatica inicial');
  await regimens.locator('select').filter({ has: page.locator('option[value=\"Canina\"]') }).first().selectOption('Canina');
  await page.getByTestId('manipulados-save-button').click();
  await page.getByText(/salvo no catálogo/i).waitFor({ timeout: 30000 });
  await page.getByText(firstName).first().waitFor({ timeout: 30000 });
  push('manipulado_criado', { name: firstName });
  await shot(page, '02-manipulado-criado.png');

  await page.reload({ waitUntil: 'networkidle' });
  await page.getByText(firstName).first().waitFor({ timeout: 30000 });
  push('manipulado_persistiu_reload', { name: firstName });

  await formulaNameInput.fill(firstNameUpdated);
  await page.getByTestId('manipulados-save-button').click();
  await page.getByText(/salvo no catálogo/i).waitFor({ timeout: 30000 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.getByText(firstNameUpdated).first().waitFor({ timeout: 30000 });
  push('manipulado_editado', { name: firstNameUpdated });

  await page.getByTestId('manipulados-new-button').click();
  await page.locator('input[placeholder*="Gabapentina magistral"]').first().waitFor({ timeout: 30000 });
  await page.waitForFunction(() => {
    const input = document.querySelector('input[placeholder*="Gabapentina magistral"]');
    return !!input && input.value === '';
  });
  await page.locator('input[placeholder*="Gabapentina magistral"]').first().fill(secondName);
  await fillByLabel(identity, 'Descri', 'Formula controlada para teste visual e split de documento especial.');
  await fillByLabel(composition, 'Ingrediente 1', 'Codeina');
  await fillByLabel(composition, 'Concentra', '10 mg/mL');
  await fillByLabel(regimens, 'Nome do regime', 'Antitussigeno controlado');
  await regimens.locator('select').filter({ has: page.locator('option[value=\"Canina\"]') }).first().selectOption('Canina');
  await page.getByRole('button', { name: /^Controle especial$/ }).click();
  await page.getByTestId('manipulados-save-button').click();
  await page.getByText(/salvo no catálogo/i).waitFor({ timeout: 30000 });
  await page.getByText(secondName).first().waitFor({ timeout: 30000 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.getByText(secondName).first().waitFor({ timeout: 30000 });
  push('manipulado_controlado_criado', { name: secondName });
  await shot(page, '03-manipulado-controlado.png');

  await page.goto('http://127.0.0.1:4173/receituario-vet/nova-receita-2', { waitUntil: 'networkidle' });
  await page.locator('input[placeholder="Buscar tutor..."]').first().fill('Tutor E2E');
  await page.getByText('Tutor E2E Manipulados').first().click();
  await page.locator('input[placeholder="Buscar paciente..."]').first().fill('Paciente E2E');
  await page.getByText('Paciente E2E').first().click();
  push('tutor_paciente_ok');

  await page.getByTestId('nova-receita-add-compounded').click();
  const modal = page.getByText('Adicionar manipulado').locator('xpath=ancestor::div[contains(@class,"rounded-3xl")]').first();
  await (await selectCompoundedModalItem(modal, firstNameUpdated)).click();
  await page.locator(`input[value="${firstNameUpdated}"]`).waitFor({ timeout: 30000 });
  push('receita_primeiro_manipulado_ok', { name: firstNameUpdated });

  const card = page.locator(`xpath=//div[contains(@class,"rxv-card")][.//input[@value="${firstNameUpdated}"]]`).first();
  await fillByLabel(card, 'Dose', '0,75 mL');
  await selectByLabel(card, 'Modo de frequ', 'interval_hours');
  await fillByLabel(card, 'Intervalo', '8');
  await fillByLabel(card, 'Valor da dura', '10');
  await labelField(card, 'Orientações ao tutor', 'textarea').fill('Usar com monitoramento clinico e revisar resposta em 48 horas.');
  await page.getByText('Administrar 0,75 mL').first().waitFor({ timeout: 30000 });
  await page.getByText(/a cada 8 horas/i).first().waitFor({ timeout: 30000 });
  await page.getByText(/10 dias/i).first().waitFor({ timeout: 30000 });
  push('preview_realtime_ok');
  await shot(page, '04-receita-preview-ao-vivo.png');

  await page.getByRole('button', { name: /^Salvar$/ }).click();
  await page.waitForTimeout(3000);
  push('receita_salva', { prescriptionId: savedPrescriptionId || null });

  if (savedPrescriptionId) {
    await page.goto(`http://127.0.0.1:4173/receituario-vet/nova-receita-2?prescriptionId=${savedPrescriptionId}`, { waitUntil: 'networkidle' });
    await page.locator(`input[value="${firstNameUpdated}"]`).waitFor({ timeout: 30000 });
    await page.getByText(/0,75 mL/i).first().waitFor({ timeout: 30000 });
    await page.getByText(/a cada 8 horas/i).first().waitFor({ timeout: 30000 });
    await page.getByText(/10 dias/i).first().waitFor({ timeout: 30000 });
    push('receita_reaberta_integra', { prescriptionId: savedPrescriptionId });
    await shot(page, '05-receita-reaberta.png');
  }

  await page.getByTestId('nova-receita-add-compounded').click();
  const modal2 = page.getByText('Adicionar manipulado').locator('xpath=ancestor::div[contains(@class,"rounded-3xl")]').first();
  await (await selectCompoundedModalItem(modal2, secondName)).click();
  await page.locator(`input[value="${secondName}"]`).waitFor({ timeout: 30000 });
  push('segundo_manipulado_ok', { name: secondName });
  await shot(page, '06-receita-dois-manipulados.png');

  await page.getByRole('button', { name: /Revisar/i }).first().click();
  await page.waitForTimeout(2500);
  await shot(page, '07-preview-controlado.png');
  push('preview_controlado_capturado');

  const downloadPromise = page.waitForEvent('download', { timeout: 60000 });
  await page.getByRole('button', { name: /Exportar PDF/i }).click();
  const download = await downloadPromise;
  const pdfTarget = path.join(downloadsDir, download.suggestedFilename() || 'receita-e2e.pdf');
  await download.saveAs(pdfTarget);
  const pdfSize = fs.statSync(pdfTarget).size;
  push('pdf_exportado', { file: pdfTarget, size: pdfSize });

  await page.goto('http://127.0.0.1:4173/receituario-vet/protocolos-3', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /\+ Novo Protocolo/i }).click();
  await fillByLabel(page, 'Nome do protocolo', protocolName);
  await selectByLabel(page, 'Esp', 'Canina');
  await page.getByRole('button', { name: /^\+ Adicionar$/ }).first().click();
  await page.getByText(firstNameUpdated).first().click();
  await page.getByRole('button', { name: /Adicionar manipulado/i }).click();
  await page.getByText(firstNameUpdated).first().waitFor({ timeout: 30000 });
  await page.getByRole('button', { name: /^Salvar$/ }).click();
  await page.waitForTimeout(2500);
  await page.reload({ waitUntil: 'networkidle' });
  await page.getByText(protocolName).first().waitFor({ timeout: 30000 });
  push('protocolo_salvo', { protocolName });
  await shot(page, '08-protocolo-salvo.png');

  const protocolCard = page.locator(`xpath=//div[contains(@class,"rxv-card")][.//*[contains(text(),"${protocolName}")]]`).first();
  await protocolCard.getByRole('button', { name: /Utilizar Protocolo/i }).click();
  await page.waitForURL(/nova-receita-2/, { timeout: 30000 });
  await page.getByText(firstNameUpdated).first().waitFor({ timeout: 30000 });
  push('protocolo_aplicado_nova_receita', { protocolName, itemName: firstNameUpdated });
  await shot(page, '09-protocolo-aplicado.png');

  fs.writeFileSync(path.join(outDir, 'browser-e2e-result.json'), JSON.stringify({ ok: true, seed, firstNameUpdated, secondName, savedPrescriptionId, protocolName, log }, null, 2));
} catch (error) {
  push('fatal', { message: error instanceof Error ? error.message : String(error) });
  await shot(page, 'fatal-state.png').catch(() => {});
  fs.writeFileSync(path.join(outDir, 'browser-e2e-result.json'), JSON.stringify({ ok: false, seed, savedPrescriptionId, log }, null, 2));
  throw error;
} finally {
  await context.close();
  await browser.close();
}


