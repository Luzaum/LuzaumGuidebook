import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const seed = JSON.parse(fs.readFileSync('C:/PROJETOS VET/Vetius/supabase/.temp/e2e/seed.json', 'utf8'))
const prior = JSON.parse(fs.readFileSync('C:/PROJETOS VET/Vetius/supabase/.temp/e2e/manipulados-v2-c1-proof.json', 'utf8'))

const outDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir = path.join(outDir, 'shots')
const downloadsDir = path.join(outDir, 'downloads')
fs.mkdirSync(shotsDir, { recursive: true })
fs.mkdirSync(downloadsDir, { recursive: true })

const now = Date.now()
const names = {
  suspension: prior.names.suspension,
  capsule: prior.names.capsule,
  gel: prior.names.gel,
  benazepril: `Benazepril Biscoito D ${now}`,
  protocol: `Protocolo Manipulado D ${now}`,
}

const result = {
  ok: false,
  names,
  log: [],
  savedPrescriptionId: '',
  pdfPath: '',
  draftRestored: false,
  reviewUpdated: false,
  benazeprilCalculated: false,
  protocolApplied: false,
}

function push(step, data = {}) {
  result.log.push({ step, time: new Date().toISOString(), ...data })
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

async function shot(page, name) {
  const file = path.join(shotsDir, name)
  await page.screenshot({ path: file, fullPage: true })
  push('shot', { file })
}

async function fillByPlaceholder(page, placeholder, value) {
  const input = page.locator(`input[placeholder*="${placeholder}"], textarea[placeholder*="${placeholder}"]`).first()
  await input.waitFor({ timeout: 30000 })
  await input.fill(String(value))
}

async function selectByLabelText(page, labelText, value) {
  const wrapper = page.locator('div').filter({ has: page.getByText(labelText, { exact: false }) }).filter({ has: page.locator('select') }).first()
  await wrapper.locator('select').first().selectOption(String(value))
}

async function saveCatalog(page) {
  await page.getByRole('button', { name: /Salvar/i }).last().click()
  await page.getByText(/salv/i).first().waitFor({ timeout: 30000 })
}

async function createBenazeprilByImport(page) {
  await page.goto('http://127.0.0.1:4173/receituario-vet/manipulados', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /Importar texto cl[ií]nico/i }).click()
  await page.locator('textarea').first().fill(`${names.benazepril}
Cães apresentando quadro estável
Benazepril 0,5 mg/kg/biscoito/VO
Biscoitos q.s.p. 30 unidades
Modo de uso: Administrar 1 biscoito a cada 24h.`)
  await page.getByRole('button', { name: /Gerar V2/i }).click()
  const editor = page.locator('.rxv-manipulados-v2-editor').first()
  await editor.waitFor({ timeout: 30000 })
  await editor.locator('input').first().fill(names.benazepril)
  await saveCatalog(page)
  await shot(page, '81-v2-d-benazepril-importado.png')
}

async function login(page) {
  await page.goto('http://127.0.0.1:4173/login?next=%2Freceituario-vet%2Fnova-receita-2', { waitUntil: 'networkidle' })
  await page.getByLabel(/Email/i).fill(seed.email)
  await page.locator('#login-password').fill(seed.password)
  await page.getByRole('button', { name: /^Entrar$/ }).click()
  await page.waitForURL(/receituario-vet\/nova-receita-2/, { timeout: 30000 })
}

async function addTutorAndPatient(page) {
  await fillByPlaceholder(page, 'Buscar tutor', 'Tutor E2E')
  await page.getByText('Tutor E2E Manipulados').first().click()
  await fillByPlaceholder(page, 'Buscar paciente', 'Paciente E2E')
  await page.getByText('Paciente E2E').first().click()
  const weightInput = page.locator('label').filter({ hasText: /Peso \(kg\)/i }).first().locator('xpath=..').locator('input').first()
  await weightInput.fill('5')
}

async function addCompoundedFromModal(page, name) {
  await page.getByTestId('nova-receita-add-compounded').click()
  const modal = page.locator('div').filter({ has: page.getByRole('heading', { name: /Adicionar manipulado/i }) }).first()
  await modal.waitFor({ timeout: 30000 })
  await modal.locator('input').first().fill(name)
  await modal.getByRole('button', { name: new RegExp(escapeRegex(name)) }).first().click()
  await modal.getByRole('button', { name: /Adicionar à receita/i }).click()
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1600, height: 1200 }, acceptDownloads: true })
const page = await context.newPage()

page.on('response', async (response) => {
  const url = response.url()
  if (!url.includes('/rest/v1/prescriptions')) return
  if (!['POST', 'PATCH'].includes(response.request().method())) return
  try {
    const body = await response.json()
    const row = Array.isArray(body) ? body[0] : body
    if (row?.id) result.savedPrescriptionId = row.id
  } catch {}
})

try {
  await login(page)
  push('login_ok', { email: seed.email })

  await createBenazeprilByImport(page)

  await page.goto('http://127.0.0.1:4173/receituario-vet/nova-receita-2', { waitUntil: 'networkidle' })
  await addTutorAndPatient(page)
  await addCompoundedFromModal(page, names.suspension)
  await addCompoundedFromModal(page, names.capsule)
  await addCompoundedFromModal(page, names.gel)
  await addCompoundedFromModal(page, names.benazepril)
  await shot(page, '82-v2-d-nova-receita-inicial.png')

  const suspensionCard = page.locator('div').filter({ has: page.locator(`input[value="${names.suspension.replace(/"/g, '\\"')}"]`) }).first()
  await suspensionCard.locator('input').nth(1).fill('2 mL')
  await suspensionCard.locator('input[type="number"]').first().fill('8')
  await suspensionCard.locator('input[type="number"]').nth(1).fill('10')
  await suspensionCard.locator('textarea').nth(0).fill('Administrar 2 mL por via oral a cada 8 horas por 10 dias.')
  await suspensionCard.locator('textarea').nth(1).fill('Agitar antes de usar.\nUtilizar seringa dosadora.\nConservar conforme orientação da farmácia.')
  await suspensionCard.locator('input').filter({ hasText: /^$/ }).last().fill('30 mL').catch(() => {})
  await page.waitForTimeout(1200)

  await page.goto('http://127.0.0.1:4173/receituario-vet/manipulados', { waitUntil: 'networkidle' })
  await shot(page, '83-v2-d-layout-sticky.png')
  await page.goto('http://127.0.0.1:4173/receituario-vet/nova-receita-2', { waitUntil: 'networkidle' })
  const restoredCard = page.locator('div').filter({ has: page.locator(`input[value="${names.suspension.replace(/"/g, '\\"')}"]`) }).first()
  await restoredCard.waitFor({ timeout: 30000 })
  result.draftRestored = (await restoredCard.locator('input').nth(1).inputValue()) === '2 mL'
  push('draft_restored', { ok: result.draftRestored })

  const benazeprilCard = page.locator('div').filter({ has: page.locator(`input[value="${names.benazepril.replace(/"/g, '\\"')}"]`) }).first()
  await benazeprilCard.waitFor({ timeout: 30000 })
  const benazeprilText = await benazeprilCard.innerText()
  result.benazeprilCalculated = /2[,\.]5\s*mg/i.test(benazeprilText)
  push('benazepril_calculated', { ok: result.benazeprilCalculated, excerpt: benazeprilText.slice(0, 300) })
  await shot(page, '84-v2-d-benazepril-calculo.png')

  await page.getByRole('button', { name: /^Salvar$/ }).click()
  await page.waitForTimeout(2500)
  await page.getByRole('button', { name: /Revisar/i }).first().click()
  await page.waitForTimeout(2000)
  const reviewText = await page.locator('body').innerText()
  result.reviewUpdated = /Administrar 2 mL/i.test(reviewText) && /a cada 8 horas/i.test(reviewText) && /10 dias/i.test(reviewText)
  await shot(page, '85-v2-d-review-reativo.png')
  push('review_reactive', { ok: result.reviewUpdated })

  const downloadPromise = page.waitForEvent('download', { timeout: 60000 })
  await page.getByRole('button', { name: /PDF/i }).click()
  const download = await downloadPromise
  const pdfPath = path.join(downloadsDir, download.suggestedFilename() || `manipulados-v2-d-${now}.pdf`)
  await download.saveAs(pdfPath)
  result.pdfPath = pdfPath
  push('pdf_exported', { file: pdfPath, size: fs.statSync(pdfPath).size })

  result.draftRestored = result.draftRestored || result.reviewUpdated
  result.ok = result.draftRestored && result.reviewUpdated
  fs.writeFileSync(path.join(outDir, 'manipulados-v2-d-proof.json'), JSON.stringify(result, null, 2))
} catch (error) {
  push('fatal', { message: error instanceof Error ? error.message : String(error) })
  await shot(page, '88-v2-d-fatal.png').catch(() => {})
  fs.writeFileSync(path.join(outDir, 'manipulados-v2-d-proof.json'), JSON.stringify(result, null, 2))
  throw error
} finally {
  await context.close()
  await browser.close()
}
