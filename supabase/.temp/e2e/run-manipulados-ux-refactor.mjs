import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const appUrl = 'http://127.0.0.1:4173';
const seed = JSON.parse(fs.readFileSync('C:/PROJETOS VET/Vetius/supabase/.temp/e2e/seed.json', 'utf8'));
const outDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e';
const shotsDir = path.join(outDir, 'shots');
const resultFile = path.join(outDir, 'manipulados-ux-refactor-result.json');
fs.mkdirSync(shotsDir, { recursive: true });

const log = [];
function push(step, data = {}) { log.push({ step, time: new Date().toISOString(), ...data }); }
async function shot(page, name) {
  const file = path.join(shotsDir, name);
  await page.screenshot({ path: file, fullPage: true });
  push('screenshot', { file });
}
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

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1600, height: 1400 } });
const page = await context.newPage();
page.on('dialog', async (dialog) => { push('dialog', { message: dialog.message() }); await dialog.accept(); });

const baseName = `UX Magistral ${Date.now()}`;
const updatedName = `${baseName} Editado`;
const duplicateName = baseName;

try {
  await page.goto(`${appUrl}/login?next=%2Freceituario-vet%2Fmanipulados`, { waitUntil: 'networkidle' });
  await page.getByLabel(/Email/i).fill(seed.email);
  await page.locator('#login-password').fill(seed.password);
  await page.getByRole('button', { name: /^Entrar$/ }).click();
  await page.waitForURL(/receituario-vet\/manipulados/, { timeout: 30000 });
  push('login_ok', { email: seed.email });
  await shot(page, '30-manipulados-ux-home.png');

  await page.getByTestId('manipulados-new-button').click();
  await page.locator('button').filter({ hasText: 'Concentração / unidade fixa' }).first().click();
  await page.locator('button').filter({ hasText: 'Oral unitizada' }).first().click();
  await page.locator('button').filter({ hasText: 'cápsula' }).first().click();
  await shot(page, '31-manipulados-ux-wizard.png');

  await fillByLabel(page, 'Nome da fórmula', baseName);
  await selectByLabel(page, 'Forma farmacêutica', 'Cápsula');
  await selectByLabel(page, 'Via principal', 'VO');
  await fillByLabel(page, 'Descrição breve', 'Fórmula magistral de teste para validar a nova UX e o save remoto.');

  await fillByLabel(page, 'Ingrediente 1', 'Gabapentina');
  await fillByLabel(page, 'Quantidade', '50');
  await fillByLabel(page, 'Unidade', 'mg');
  await fillByLabel(page, 'Quantidade total a manipular', '30 cápsulas');

  await fillByLabel(page, 'Nome do regime', 'Dor neuropática');
  await fillByLabel(page, 'Dose final por administração', '1');
  await selectByLabel(page, 'Unidade da dose', 'cápsula');
  await fillByLabel(page, 'Orientação ao tutor', 'Administrar preferencialmente após alimento.');
  await shot(page, '32-manipulados-ux-editor-pre-save.png');

  await page.getByTestId('manipulados-save-button').click();
  await page.getByText(/Manipulado salvo no catálogo/i).waitFor({ timeout: 30000 });
  await page.getByText(baseName).first().waitFor({ timeout: 30000 });
  push('save_ok', { name: baseName });
  await shot(page, '33-manipulados-ux-save-ok.png');

  await page.getByTestId('manipulados-new-button').click();
  await page.locator('button').filter({ hasText: 'Concentração / unidade fixa' }).first().click();
  await page.locator('button').filter({ hasText: 'Oral unitizada' }).first().click();
  await page.locator('button').filter({ hasText: 'cápsula' }).first().click();
  await fillByLabel(page, 'Nome da fórmula', duplicateName);
  await selectByLabel(page, 'Forma farmacêutica', 'Cápsula');
  await selectByLabel(page, 'Via principal', 'VO');
  await fillByLabel(page, 'Descrição breve', 'Segundo item com mesmo nome para validar slug incremental por clínica.');
  await fillByLabel(page, 'Ingrediente 1', 'Gabapentina');
  await fillByLabel(page, 'Quantidade', '25');
  await fillByLabel(page, 'Unidade', 'mg');
  await fillByLabel(page, 'Quantidade total a manipular', '15 cápsulas');
  await fillByLabel(page, 'Nome do regime', 'Cópia clínica');
  await fillByLabel(page, 'Dose final por administração', '1');
  await selectByLabel(page, 'Unidade da dose', 'cápsula');
  await page.getByTestId('manipulados-save-button').click();
  await page.getByText(/Manipulado salvo no catálogo/i).waitFor({ timeout: 30000 });
  push('duplicate_name_save_ok', { name: duplicateName });
  await shot(page, '34-manipulados-ux-duplicate-name-ok.png');

  await page.locator('button').filter({ hasText: baseName }).first().click();
  await fillByLabel(page, 'Nome da fórmula', updatedName);
  await page.getByTestId('manipulados-save-button').click();
  await page.getByText(/Manipulado salvo no catálogo/i).waitFor({ timeout: 30000 });
  await page.getByText(updatedName).first().waitFor({ timeout: 30000 });
  push('edit_ok', { name: updatedName });
  await shot(page, '35-manipulados-ux-edit-ok.png');

  await page.reload({ waitUntil: 'networkidle' });
  await page.getByText(updatedName).first().waitFor({ timeout: 30000 });
  push('reload_ok', { name: updatedName });
  await shot(page, '36-manipulados-ux-reload-ok.png');

  const summary = {
    ok: true,
    name: updatedName,
    save_without_manual_refresh: true,
    log,
  };
  fs.writeFileSync(resultFile, JSON.stringify(summary, null, 2));
} catch (error) {
  await shot(page, '36-manipulados-ux-fatal.png').catch(() => {});
  fs.writeFileSync(resultFile, JSON.stringify({
    ok: false,
    error: error instanceof Error ? error.message : String(error),
    log,
  }, null, 2));
  throw error;
} finally {
  await context.close();
  await browser.close();
}
