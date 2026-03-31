import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const seed = JSON.parse(fs.readFileSync('C:/PROJETOS VET/Vetius/supabase/.temp/e2e/seed.json', 'utf8'));
const prepPath = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e/manipulados-v2-prep.json';
const prep = fs.existsSync(prepPath) ? JSON.parse(fs.readFileSync(prepPath, 'utf8')) : {};
const outDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e';
const shotsDir = path.join(outDir, 'shots');
const downloadsDir = path.join(outDir, 'downloads');
fs.mkdirSync(shotsDir, { recursive: true });
fs.mkdirSync(downloadsDir, { recursive: true });

const now = Date.now();
const freeName = `Gabapentina gel transdérmico V2 ${now}`;
const controlledName = `Trazodona cápsulas V2 ${now}`;
const protocolName = `Protocolo Manipulado V2 ${now}`;
const result = {
  ok: false,
  seed,
  freeName,
  controlledName,
  protocolName,
  legacyName: prep.legacyName || '',
  log: [],
};

function push(step, data = {}) {
  result.log.push({ step, time: new Date().toISOString(), ...data });
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function shot(page, name) {
  const file = path.join(shotsDir, name);
  await page.screenshot({ path: file, fullPage: true });
  push('screenshot', { file });
}

function fieldContainer(root, labelText) {
  return root.locator('label').filter({ hasText: new RegExp(`^${escapeRegex(labelText)}$`, 'i') }).first().locator('xpath=..');
}

async function fillInputByLabel(root, labelText, value) {
  const field = fieldContainer(root, labelText).locator('input').first();
  await field.waitFor({ timeout: 30000 });
  await field.fill(String(value));
}

async function fillTextareaByLabel(root, labelText, value) {
  const field = fieldContainer(root, labelText).locator('textarea').first();
  await field.waitFor({ timeout: 30000 });
  await field.fill(String(value));
}

async function selectByLabel(root, labelText, value) {
  const field = fieldContainer(root, labelText).locator('select').first();
  await field.waitFor({ timeout: 30000 });
  await field.selectOption(String(value));
}

async function clickToggleCard(root, titleText) {
  const button = root
    .getByText(titleText, { exact: false })
    .first()
    .locator('xpath=ancestor::div[contains(@class,"justify-between")][1]//button')
    .first();
  await button.click();
}

async function clickChip(root, text) {
  await root.getByRole('button', { name: new RegExp(`^${text}$`, 'i') }).click();
}

async function createFreeFormula(page) {
  await page.getByRole('button', { name: /Novo manipulado/i }).click();
  const pageRoot = page.locator('body');
  await page.waitForFunction(() => {
    const input = Array.from(document.querySelectorAll('input')).find((entry) => {
      const candidate = entry;
      return candidate.placeholder && candidate.placeholder.includes('Gabapentina');
    });
    const legacyBlock = Array.from(document.querySelectorAll('body *')).some((node) => node.textContent?.includes('Compatibilidade legada'));
    return !!input && input.value === '' && !legacyBlock;
  });

  await fillInputByLabel(pageRoot, 'Nome da fórmula', freeName);
  await selectByLabel(pageRoot, 'Forma farmacêutica', 'Gel transdérmico');
  await clickChip(pageRoot, 'Felina');
  await selectByLabel(pageRoot, 'Via principal', 'Transdermica');
  await fillInputByLabel(pageRoot, 'Unidade de administração', 'click');
  await fillTextareaByLabel(pageRoot, 'Resumo curto', 'Formulação magistral felina para uso transdérmico com UX V2.');

  await fillInputByLabel(pageRoot, 'Nome do regime', 'Manutenção felina');
  await selectByLabel(pageRoot, 'Espécie do regime', 'Felina');
  await fillInputByLabel(pageRoot, 'Cenário clínico', 'manutenção');
  await fillInputByLabel(pageRoot, 'Indicação clínica', 'Dor crônica felina');
  await selectByLabel(pageRoot, 'Tipo de dose', 'fixed');
  await fillInputByLabel(pageRoot, 'Dose mínima', '1');
  await fillInputByLabel(pageRoot, 'Unidade da dose', 'click');
  await selectByLabel(pageRoot, 'Base da dose', 'animal');
  await fillInputByLabel(pageRoot, 'Unidade administrada', 'click');
  await fillInputByLabel(pageRoot, 'Concentração útil', '100');
  await fillInputByLabel(pageRoot, 'Unidade da concentração', 'mg/click');
  await selectByLabel(pageRoot, 'Modo da frequência', 'interval_hours');
  await fillInputByLabel(pageRoot, 'Frequência mínima', '8');
  await selectByLabel(pageRoot, 'Modo da duração', 'fixed');
  await fillInputByLabel(pageRoot, 'Duração', '7');
  await fillInputByLabel(pageRoot, 'Unidade da duração', 'dias');
  await selectByLabel(pageRoot, 'Estratégia farmacotécnica', 'dose_base_per_click');
  await fillTextareaByLabel(pageRoot, 'Orientação final de uso', 'Aplicar 1 click por via transdérmica a cada 8 horas por 7 dias.');
  await fillTextareaByLabel(pageRoot, 'Observação adicional ao tutor', 'Aplicar em área com pouco pelo e alternar os lados.');

  await fillInputByLabel(pageRoot, 'Ingrediente', 'Gabapentina');
  await selectByLabel(pageRoot, 'Tipo', 'active');
  await fillInputByLabel(pageRoot, 'Quantidade', '100');
  await fillInputByLabel(pageRoot, 'Unidade', 'mg/click');
  await fillInputByLabel(pageRoot, 'Q.S.P.', 'q.s.p. 10 mL');
  await fillInputByLabel(pageRoot, 'Quantidade final', '10 mL');
  await fillInputByLabel(pageRoot, 'Veículo', 'Lipoderm');
  await fillTextareaByLabel(pageRoot, 'Instrução para a farmácia', 'Ajustar a base transdérmica para fornecer 100 mg por click.');

  await shot(page, '40-v2-free-editor-before-save.png');
  await page.getByRole('button', { name: /Salvar catálogo/i }).click();
  await page.getByText(/Manipulado V2 salvo no catálogo/i).waitFor({ timeout: 30000 });
  await page.getByText(freeName).first().waitFor({ timeout: 30000 });
  push('free_saved', { name: freeName });
  await shot(page, '41-v2-free-saved.png');
}

async function createControlledFormula(page) {
  await page.getByRole('button', { name: /Novo manipulado/i }).click();
  const pageRoot = page.locator('body');
  await page.waitForFunction(() => {
    const input = Array.from(document.querySelectorAll('input')).find((entry) => {
      const candidate = entry;
      return candidate.placeholder && candidate.placeholder.includes('Gabapentina');
    });
    const legacyBlock = Array.from(document.querySelectorAll('body *')).some((node) => node.textContent?.includes('Compatibilidade legada'));
    return !!input && input.value === '' && !legacyBlock;
  });

  await fillInputByLabel(pageRoot, 'Nome da fórmula', controlledName);
  await selectByLabel(pageRoot, 'Forma farmacêutica', 'Cápsula');
  await clickChip(pageRoot, 'Canina');
  await selectByLabel(pageRoot, 'Via principal', 'VO');
  await fillInputByLabel(pageRoot, 'Unidade de administração', 'cápsula');
  await fillTextareaByLabel(pageRoot, 'Resumo curto', 'Cápsulas controladas para teste do fluxo documental V2.');
  await clickToggleCard(pageRoot, 'Classificação de venda');

  await fillInputByLabel(pageRoot, 'Nome do regime', 'Ansiedade controlada');
  await selectByLabel(pageRoot, 'Espécie do regime', 'Canina');
  await fillInputByLabel(pageRoot, 'Cenário clínico', 'agudo');
  await fillInputByLabel(pageRoot, 'Indicação clínica', 'Ansiedade situacional');
  await selectByLabel(pageRoot, 'Tipo de dose', 'fixed');
  await fillInputByLabel(pageRoot, 'Dose mínima', '1');
  await fillInputByLabel(pageRoot, 'Unidade da dose', 'cápsula');
  await selectByLabel(pageRoot, 'Base da dose', 'animal');
  await fillInputByLabel(pageRoot, 'Unidade administrada', 'cápsula');
  await selectByLabel(pageRoot, 'Modo da frequência', 'interval_hours');
  await fillInputByLabel(pageRoot, 'Frequência mínima', '12');
  await fillInputByLabel(pageRoot, 'Duração', '14');
  await fillInputByLabel(pageRoot, 'Unidade da duração', 'dias');
  await fillTextareaByLabel(pageRoot, 'Orientação final de uso', 'Administrar 1 cápsula por via oral a cada 12 horas por 14 dias.');
  await fillTextareaByLabel(pageRoot, 'Observação adicional ao tutor', 'Administrar preferencialmente à noite e manter observação comportamental.');

  await fillInputByLabel(pageRoot, 'Ingrediente', 'Trazodona');
  await selectByLabel(pageRoot, 'Tipo', 'active');
  await fillInputByLabel(pageRoot, 'Quantidade', '50');
  await fillInputByLabel(pageRoot, 'Unidade', 'mg/cápsula');
  await fillInputByLabel(pageRoot, 'Q.S.P.', 'q.s.p. 30 cápsulas');
  await fillInputByLabel(pageRoot, 'Quantidade final', '30 cápsulas');
  await fillTextareaByLabel(pageRoot, 'Instrução para a farmácia', 'Manipular cápsulas opacas e identificar como controlado.');

  await page.getByRole('button', { name: /Salvar catálogo/i }).click();
  await page.getByText(/Manipulado V2 salvo no catálogo/i).waitFor({ timeout: 30000 });
  await page.getByText(controlledName).first().waitFor({ timeout: 30000 });
  push('controlled_saved', { name: controlledName });
  await shot(page, '42-v2-controlled-saved.png');
}

async function normalizeLegacy(page) {
  if (!prep.legacyName) return;
  await page.getByText(prep.legacyName, { exact: false }).first().click();
  await page.getByText(/Compatibilidade legada/i).waitFor({ timeout: 30000 });
  const pageRoot = page.locator('body');
  await fillTextareaByLabel(pageRoot, 'Resumo curto', 'Item legado regravado pelo editor V2 para normalização canônica.');
  await page.getByRole('button', { name: /Salvar catálogo/i }).click();
  await page.getByText(/Manipulado V2 salvo no catálogo/i).waitFor({ timeout: 30000 });
  push('legacy_resaved_v2', { name: prep.legacyName, id: prep.legacyId || null });
  await shot(page, '43-v2-legacy-normalized.png');
}

async function addTutorAndPatient(page) {
  await page.locator('input[placeholder="Buscar tutor..."]').first().fill('Tutor E2E');
  await page.getByText('Tutor E2E Manipulados').first().click();
  await page.locator('input[placeholder="Buscar paciente..."]').first().fill('Paciente E2E');
  await page.getByText('Paciente E2E').first().click();
  push('patient_selected');
}

async function addCompoundedFromModal(page, name) {
  await page.getByTestId('nova-receita-add-compounded').click();
  const modal = page.locator('div').filter({ has: page.getByRole('heading', { name: /Adicionar manipulado/i }) }).first();
  await modal.waitFor({ timeout: 30000 });
  await modal.locator('input[placeholder*="Nome da fórmula"]').first().fill(name);
  await modal.getByRole('button', { name: new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) }).first().click();
  await modal.getByRole('button', { name: /Adicionar à receita/i }).click();
  await page.locator(`input[value="${name.replace(/"/g, '\\"')}"]`).first().waitFor({ timeout: 30000 });
  push('added_to_recipe', { name });
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1600, height: 1200 }, acceptDownloads: true });
const page = await context.newPage();

let savedPrescriptionId = '';
page.on('response', async (response) => {
  const url = response.url();
  if (!url.includes('/rest/v1/prescriptions')) return;
  if (!['POST', 'PATCH'].includes(response.request().method())) return;
  try {
    const body = await response.json();
    const row = Array.isArray(body) ? body[0] : body;
    if (row?.id) {
      savedPrescriptionId = row.id;
    }
  } catch {}
});

try {
  await page.goto('http://127.0.0.1:4173/login?next=%2Freceituario-vet%2Fmanipulados', { waitUntil: 'networkidle' });
  await page.getByLabel(/Email/i).fill(seed.email);
  await page.locator('#login-password').fill(seed.password);
  await page.getByRole('button', { name: /^Entrar$/ }).click();
  await page.waitForURL(/receituario-vet\/manipulados/, { timeout: 30000 });
  push('login_ok', { email: seed.email });
  await shot(page, '39-v2-login.png');

  await createFreeFormula(page);
  await createControlledFormula(page);
  await normalizeLegacy(page);

  await page.goto('http://127.0.0.1:4173/receituario-vet/nova-receita-2', { waitUntil: 'networkidle' });
  await addTutorAndPatient(page);
  await addCompoundedFromModal(page, freeName);
  await addCompoundedFromModal(page, controlledName);
  await shot(page, '44-v2-recipe-two-items.png');

  await page.getByRole('button', { name: /^Salvar$/ }).click();
  await page.waitForTimeout(3000);
  push('recipe_saved', { prescriptionId: savedPrescriptionId || null });

  await page.getByRole('button', { name: /Revisar/i }).first().click();
  await page.waitForTimeout(2500);
  await shot(page, '45-v2-review.png');

  const downloadPromise = page.waitForEvent('download', { timeout: 60000 });
  await page.getByRole('button', { name: /Exportar PDF/i }).click();
  const download = await downloadPromise;
  const pdfPath = path.join(downloadsDir, download.suggestedFilename() || `manipulados-v2-${now}.pdf`);
  await download.saveAs(pdfPath);
  push('pdf_exported', { file: pdfPath, size: fs.statSync(pdfPath).size });

  await page.goto('http://127.0.0.1:4173/receituario-vet/protocolos-3', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /\+ Novo Protocolo/i }).click();
  await fillInputByLabel(page, 'Nome do protocolo', protocolName);
  await selectByLabel(page, 'Espécie alvo', 'Canina');
  await page.getByRole('button', { name: /^\+ Adicionar$/ }).first().click();
  await page.getByText(freeName).first().click();
  await page.getByRole('button', { name: /Adicionar manipulado/i }).click();
  await page.getByText(freeName).first().waitFor({ timeout: 30000 });
  await page.getByRole('button', { name: /^Salvar$/ }).click();
  await page.waitForTimeout(2500);
  await page.reload({ waitUntil: 'networkidle' });
  await page.getByText(protocolName).first().waitFor({ timeout: 30000 });
  push('protocol_saved', { protocolName });
  await shot(page, '46-v2-protocol-saved.png');

  const protocolCard = page.locator(`xpath=//div[contains(@class,"rxv-card")][.//*[contains(text(),"${protocolName}")]]`).first();
  await protocolCard.getByRole('button', { name: /Utilizar Protocolo/i }).click();
  await page.waitForURL(/nova-receita-2/, { timeout: 30000 });
  await page.getByText(freeName).first().waitFor({ timeout: 30000 });
  push('protocol_applied', { protocolName, itemName: freeName });
  await shot(page, '47-v2-protocol-applied.png');

  result.ok = true;
  result.savedPrescriptionId = savedPrescriptionId;
  fs.writeFileSync(path.join(outDir, 'manipulados-v2-proof.json'), JSON.stringify(result, null, 2));
} catch (error) {
  push('fatal', { message: error instanceof Error ? error.message : String(error) });
  await shot(page, '48-v2-fatal-state.png').catch(() => {});
  fs.writeFileSync(path.join(outDir, 'manipulados-v2-proof.json'), JSON.stringify(result, null, 2));
  throw error;
} finally {
  await context.close();
  await browser.close();
}
