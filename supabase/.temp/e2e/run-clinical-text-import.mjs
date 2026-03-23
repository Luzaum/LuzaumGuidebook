import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const baseDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const seed = JSON.parse(fs.readFileSync(path.join(baseDir, 'seed.json'), 'utf8'))
const shotsDir = path.join(baseDir, 'shots')
const resultFile = path.join(baseDir, 'clinical-text-import-result.json')
const appUrl = 'http://127.0.0.1:4190'
fs.mkdirSync(shotsDir, { recursive: true })

const log = []
const push = (step, data = {}) => log.push({ step, time: new Date().toISOString(), ...data })

async function shot(page, name) {
  const file = path.join(shotsDir, name)
  await page.screenshot({ path: file, fullPage: true })
  push('screenshot', { file })
}

function labelField(root, labelText, selector) {
  return root.locator('label').filter({ hasText: labelText }).first().locator('xpath=..').locator(selector).first()
}

async function fillByLabel(root, labelText, value) {
  const field = labelField(root, labelText, 'input,textarea')
  await field.waitFor({ timeout: 30000 })
  await field.fill(String(value))
}

async function selectCompoundedModalItem(page, modal, name) {
  const searchInput = modal.getByTestId('compounded-modal-search')
  await searchInput.fill(name)
  const itemButton = modal.locator('button[data-testid^="compounded-modal-item-"]').filter({ hasText: name }).first()
  await itemButton.waitFor({ timeout: 30000 })
  await itemButton.click()
  const confirmButton = modal.getByTestId('compounded-modal-confirm')
  await page.waitForFunction(() => {
    const button = document.querySelector('[data-testid="compounded-modal-confirm"]')
    return !!button && !button.hasAttribute('disabled')
  })
  await confirmButton.click()
}

const clinicalText = `Conheca as sugestoes de formulacoes da Formula Animal:

Caes em quadro agudo ou cronico controlado
Condroitina 15 mg/kg/dose/VO
Glucosamina 10 a 20 mg/kg/dose/VO
Colageno bioidentico (UC-II) 20 a 40 mg/dose/VO
Codeina 0,1 a 0,3 mg/kg/dose/VO
Prednisolona 0,1 a 1 mg/kg/dose/VO
Suspensao q.s.p. 100 mL
Modo de uso: Administrar uma dose a cada 12h, por 2 semanas (periodos agudos). Nos casos cronicos controlados, a dose pode ser reduzida em 50%.

*Doses de colageno bioidentico tipo II (UC-II) para caes:
Caes com ate 20 kg: 20 mg/animal.
Caes acima de 20 kg: 40 mg/animal.

**Observacao: medicamento controlado.

Caes apresentando quadro estavel
Condroitina 15 mg/kg/biscoito/VO
Glucosamina 10 a 20 mg/kg/biscoito/VO
Colageno bioidentico (UC-II) 20 a 40 mg/biscoito/VO
Biscoitos q.s.p 30 unidades
Modo de uso: Administrar um biscoito a cada 24h.

*Doses de colageno bioidentico tipo II (UC-II) para caes:
Caes com ate 20 kg: 20 mg/animal.
Caes acima de 20 kg: 40 mg/animal.`

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1600, height: 1400 } })
const page = await context.newPage()
const importedName = `Formula clinica importada ${Date.now()}`

try {
  await page.goto(`${appUrl}/login?next=%2Freceituario-vet%2Fmanipulados`, { waitUntil: 'networkidle' })
  await page.getByLabel(/Email/i).fill(seed.email)
  await page.locator('#login-password').fill(seed.password)
  await page.getByRole('button', { name: /^Entrar$/ }).click()
  await page.waitForURL(/receituario-vet\/manipulados/, { timeout: 30000 })
  push('login_ok', { email: seed.email })

  await page.getByRole('button', { name: /Importar texto clinico|Importar texto clínico/i }).click()
  await page.getByText('Importar de Texto Clínico', { exact: false }).waitFor({ timeout: 30000 })
  const clinicalPanel = page.locator('div').filter({ has: page.getByText('Importar de Texto Clínico', { exact: false }) }).first()
  await fillByLabel(clinicalPanel, 'Texto clínico semiestruturado', clinicalText)
  await page.getByRole('button', { name: /Interpretar texto/i }).click()
  await page.locator('input[placeholder*="Gabapentina magistral"]').first().waitFor({ timeout: 30000 })
  await page.getByText('Regras posológicas por ingrediente', { exact: false }).waitFor({ timeout: 30000 })
  await page.getByText('Colageno bioidentico', { exact: false }).first().waitFor({ timeout: 30000 })
  await page.getByText(/Caes em quadro agudo|Cães em quadro agudo/i).first().waitFor({ timeout: 30000 })
  push('parse_ok')
  await shot(page, '19-clinical-import-parse.png')

  await page.locator('input[placeholder*="Gabapentina magistral"]').first().fill(importedName)
  await page.getByTestId('manipulados-save-button').click()
  await page.getByText(/salvo no cat/i).waitFor({ timeout: 30000 })
  await page.reload({ waitUntil: 'networkidle' })
  await page.locator(`button:has-text("${importedName}")`).first().waitFor({ timeout: 30000 })
  push('catalog_save_ok', { importedName })
  await shot(page, '20-clinical-import-saved.png')

  await page.goto(`${appUrl}/receituario-vet/nova-receita-2`, { waitUntil: 'networkidle' })
  await page.locator('input[placeholder="Buscar tutor..."]').first().fill('Tutor E2E')
  await page.getByText('Tutor E2E Manipulados').first().click()
  await page.locator('input[placeholder="Buscar paciente..."]').first().fill('Paciente E2E')
  await page.getByText('Paciente E2E').first().click()

  await page.getByTestId('nova-receita-add-compounded').click()
  const modal = page.getByText('Adicionar manipulado').locator('xpath=ancestor::div[contains(@class,"rounded-3xl")]').first()
  await selectCompoundedModalItem(page, modal, importedName)
  await page.locator(`input[value="${importedName}"]`).waitFor({ timeout: 30000 })
  await page.getByText(/Dose final por ingrediente/i).first().waitFor({ timeout: 30000 })
  await page.getByText(/Peso usado:/i).first().waitFor({ timeout: 30000 })
  await page.getByText(/Manipulação: Favor manipular/i).first().waitFor({ timeout: 30000 })
  push('nova_receita_ok', { importedName })
  await shot(page, '21-clinical-import-nova-receita.png')

  fs.writeFileSync(resultFile, JSON.stringify({ ok: true, importedName, log }, null, 2))
} catch (error) {
  push('fatal', { message: error instanceof Error ? error.message : String(error) })
  await shot(page, 'clinical-import-fatal.png').catch(() => {})
  fs.writeFileSync(resultFile, JSON.stringify({ ok: false, importedName, log }, null, 2))
  throw error
} finally {
  await context.close()
  await browser.close()
}
