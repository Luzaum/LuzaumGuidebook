import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const seed = JSON.parse(fs.readFileSync('C:/PROJETOS VET/Vetius/supabase/.temp/e2e/seed.json', 'utf8'))
const outDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir = path.join(outDir, 'shots')
const downloadsDir = path.join(outDir, 'downloads')
fs.mkdirSync(shotsDir, { recursive: true })
fs.mkdirSync(downloadsDir, { recursive: true })

const now = Date.now()
const names = {
  suspension: `Suspensão antitussígena C1 ${now}`,
  capsule: `Trazodona cápsulas C1 ${now}`,
  gel: `Gabapentina gel transdérmico C1 ${now}`,
  protocol: `Protocolo Manipulados C1 ${now}`,
}

const result = {
  ok: false,
  names,
  log: [],
  pdfPath: '',
  previewChecks: {},
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
  push('screenshot', { file })
}

function fieldContainer(root, labelText) {
  return root.locator('label').filter({ hasText: new RegExp(`^${escapeRegex(labelText)}$`, 'i') }).first().locator('xpath=..')
}

async function fillInputByLabel(root, labelText, value) {
  const field = fieldContainer(root, labelText).locator('input').first()
  await field.waitFor({ timeout: 30000 })
  await field.fill(String(value))
}

async function fillTextareaByLabel(root, labelText, value) {
  const field = fieldContainer(root, labelText).locator('textarea').first()
  await field.waitFor({ timeout: 30000 })
  await field.fill(String(value))
}

async function selectByLabel(root, labelText, value) {
  const field = fieldContainer(root, labelText).locator('select').first()
  await field.waitFor({ timeout: 30000 })
  await field.selectOption(String(value))
}

async function toggleByTitle(root, titleText) {
  const button = root
    .getByText(titleText, { exact: false })
    .first()
    .locator('xpath=ancestor::div[.//button][1]//button')
    .first()
  await button.click()
}

async function saveAndWait(page) {
  await page.getByRole('button', { name: /Salvar catálogo/i }).click()
  await page.getByText(/Manipulado V2 salvo no catálogo/i).waitFor({ timeout: 30000 })
}

async function newFormula(page) {
  await page.getByRole('button', { name: /Novo manipulado/i }).click()
  await page.waitForFunction(() => {
    const labels = Array.from(document.querySelectorAll('label'))
    const nameLabel = labels.find((entry) => entry.textContent?.trim() === 'Nome da fórmula')
    if (!nameLabel) return false
    const wrapper = nameLabel.parentElement
    const input = wrapper?.querySelector('input')
    return !!input && input.value === ''
  }, { timeout: 30000 })
}

async function createSuspension(page) {
  const root = page.locator('body')
  await newFormula(page)
  await fillInputByLabel(root, 'Nome da fórmula', names.suspension)
  await selectByLabel(root, 'Forma farmacêutica', 'Suspensão oral')
  await selectByLabel(root, 'Espécies-alvo', 'Canina')
  await selectByLabel(root, 'Via principal', 'VO')
  await selectByLabel(root, 'Unidade de administração', 'mL')
  await fillTextareaByLabel(root, 'Resumo curto', 'Suspensão oral para controle de tosse e suporte de vias aéreas.')

  await fillInputByLabel(root, 'Nome do regime', 'Agudo respiratório')
  await selectByLabel(root, 'Espécie do regime', 'Canina')
  await fillInputByLabel(root, 'Indicação clínica', 'Tosse associada a colapso traqueal')
  await selectByLabel(root, 'Tipo de dose', 'fixed')
  await fillInputByLabel(root, 'Dose', '1')
  await selectByLabel(root, 'Unidade da dose', 'mL')
  await selectByLabel(root, 'Como a dose é calculada', 'na')
  await selectByLabel(root, 'Frequência', 'interval_hours')
  await selectByLabel(root, 'Intervalo', '12')
  await fillInputByLabel(root, 'Duração', '14')
  await selectByLabel(root, 'Unidade da duração', 'dias')
  await fillTextareaByLabel(root, 'Orientação base de uso', 'Administrar 1 mL por via oral a cada 12 horas por 14 dias.')
  await fillTextareaByLabel(root, 'Cuidados e recomendações ao tutor', 'Agitar antes de usar.\nUtilizar seringa dosadora.\nConservar conforme orientação da farmácia.')

  await fillInputByLabel(root, 'Ingrediente', 'Condroitina')
  await fillInputByLabel(root, 'Quantidade', '100')
  await selectByLabel(root, 'Unidade', 'mg')
  await fillInputByLabel(root, 'Q.S.P.', '30 mL')
  await selectByLabel(root, 'Veículo', 'veículo oral adequado')
  await selectByLabel(root, 'Sabor', 'bacon')
  await fillTextareaByLabel(root, 'Instrução para a farmácia', 'Manipular suspensão oral contendo UC-II®, clembuterol, codeína, condroitina e glucosamina conforme composição prescrita.')

  await saveAndWait(page)
  await shot(page, '50-v2-c1-suspensao-salva.png')
}

async function createCapsule(page) {
  const root = page.locator('body')
  await newFormula(page)
  await fillInputByLabel(root, 'Nome da fórmula', names.capsule)
  await selectByLabel(root, 'Forma farmacêutica', 'Cápsula')
  await selectByLabel(root, 'Espécies-alvo', 'Canina')
  await selectByLabel(root, 'Via principal', 'VO')
  await selectByLabel(root, 'Unidade de administração', 'cápsula')
  await toggleByTitle(root, 'Controlado')
  await fillTextareaByLabel(root, 'Resumo curto', 'Cápsulas controladas para ansiedade situacional.')

  await fillInputByLabel(root, 'Nome do regime', 'Ansiedade aguda')
  await selectByLabel(root, 'Espécie do regime', 'Canina')
  await fillInputByLabel(root, 'Indicação clínica', 'Ansiedade situacional')
  await selectByLabel(root, 'Tipo de dose', 'fixed')
  await fillInputByLabel(root, 'Dose', '1')
  await selectByLabel(root, 'Unidade da dose', 'cápsula')
  await selectByLabel(root, 'Como a dose é calculada', 'por animal')
  await selectByLabel(root, 'Frequência', 'interval_hours')
  await selectByLabel(root, 'Intervalo', '12')
  await fillInputByLabel(root, 'Duração', '14')
  await selectByLabel(root, 'Unidade da duração', 'dias')
  await fillTextareaByLabel(root, 'Orientação base de uso', 'Administrar 1 cápsula por via oral a cada 12 horas por 14 dias.')
  await fillTextareaByLabel(root, 'Cuidados e recomendações ao tutor', 'Administrar preferencialmente no mesmo horário.\nManter fora do alcance de crianças.')

  await fillInputByLabel(root, 'Ingrediente', 'Trazodona')
  await fillInputByLabel(root, 'Quantidade', '50')
  await selectByLabel(root, 'Unidade', 'mg')
  await fillInputByLabel(root, 'Q.S.P.', '30 cápsulas')
  await selectByLabel(root, 'Base / excipiente farmacêutico', 'padrão da forma')
  await fillTextareaByLabel(root, 'Instrução para a farmácia', 'Manipular cápsulas opacas e identificar o item como controlado.')

  await saveAndWait(page)
  await shot(page, '51-v2-c1-capsula-controlada-salva.png')
}

async function createGel(page) {
  const root = page.locator('body')
  await newFormula(page)
  await fillInputByLabel(root, 'Nome da fórmula', names.gel)
  await selectByLabel(root, 'Forma farmacêutica', 'Gel transdérmico')
  await selectByLabel(root, 'Espécies-alvo', 'Felina')
  await selectByLabel(root, 'Via principal', 'Transdérmica')
  await selectByLabel(root, 'Unidade de administração', 'click')
  await fillTextareaByLabel(root, 'Resumo curto', 'Gel transdérmico felino para analgesia domiciliar.')

  await fillInputByLabel(root, 'Nome do regime', 'Manutenção transdérmica')
  await selectByLabel(root, 'Espécie do regime', 'Felina')
  await fillInputByLabel(root, 'Indicação clínica', 'Dor crônica felina')
  await selectByLabel(root, 'Tipo de dose', 'fixed')
  await fillInputByLabel(root, 'Dose', '1')
  await selectByLabel(root, 'Unidade da dose', 'click')
  await selectByLabel(root, 'Como a dose é calculada', 'por animal')
  await fillInputByLabel(root, 'Concentração da formulação', '100')
  await selectByLabel(root, 'Unidade da concentração', 'mg/click')
  await selectByLabel(root, 'Frequência', 'interval_hours')
  await selectByLabel(root, 'Intervalo', '8')
  await fillInputByLabel(root, 'Duração', '7')
  await selectByLabel(root, 'Unidade da duração', 'dias')
  await fillTextareaByLabel(root, 'Orientação base de uso', 'Aplicar 1 click por via transdérmica a cada 8 horas por 7 dias.')
  await fillTextareaByLabel(root, 'Cuidados e recomendações ao tutor', 'Usar luvas durante a aplicação.\nAlternar os lados da aplicação.\nEvitar lambedura logo após aplicar.')

  await fillInputByLabel(root, 'Ingrediente', 'Gabapentina')
  await fillInputByLabel(root, 'Quantidade', '100')
  await selectByLabel(root, 'Unidade', 'mg')
  await fillInputByLabel(root, 'Q.S.P.', '10 mL')
  await selectByLabel(root, 'Veículo', 'base transdérmica tipo Lipoderm®')
  await fillTextareaByLabel(root, 'Instrução para a farmácia', 'Ajustar a base transdérmica para fornecer 100 mg por click.')

  await saveAndWait(page)
  await shot(page, '52-v2-c1-gel-transdermico-salvo.png')
}

async function addTutorAndPatient(page) {
  await page.locator('input[placeholder="Buscar tutor..."]').first().fill('Tutor E2E')
  await page.getByText('Tutor E2E Manipulados').first().click()
  await page.locator('input[placeholder="Buscar paciente..."]').first().fill('Paciente E2E')
  await page.getByText('Paciente E2E').first().click()
}

async function addCompoundedFromModal(page, name) {
  await page.getByTestId('nova-receita-add-compounded').click()
  const modal = page.locator('div').filter({ has: page.getByRole('heading', { name: /Adicionar manipulado/i }) }).first()
  await modal.waitFor({ timeout: 30000 })
  await modal.locator('input[placeholder*="Nome da fórmula"]').first().fill(name)
  await modal.getByRole('button', { name: new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) }).first().click()
  await modal.getByRole('button', { name: /Adicionar à receita/i }).click()
  await page.locator(`input[value="${name.replace(/"/g, '\\"')}"]`).first().waitFor({ timeout: 30000 })
  push('added_to_recipe', { name })
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1600, height: 1200 }, acceptDownloads: true })
const page = await context.newPage()

let savedPrescriptionId = ''
page.on('response', async (response) => {
  const url = response.url()
  if (!url.includes('/rest/v1/prescriptions')) return
  if (!['POST', 'PATCH'].includes(response.request().method())) return
  try {
    const body = await response.json()
    const row = Array.isArray(body) ? body[0] : body
    if (row?.id) savedPrescriptionId = row.id
  } catch {}
})

try {
  await page.goto('http://127.0.0.1:4173/login?next=%2Freceituario-vet%2Fmanipulados', { waitUntil: 'networkidle' })
  await page.getByLabel(/Email/i).fill(seed.email)
  await page.locator('#login-password').fill(seed.password)
  await page.getByRole('button', { name: /^Entrar$/ }).click()
  await page.waitForURL(/receituario-vet\/manipulados/, { timeout: 30000 })
  push('login_ok', { email: seed.email })

  await createSuspension(page)
  await createCapsule(page)
  await createGel(page)

  await page.goto('http://127.0.0.1:4173/receituario-vet/nova-receita-2', { waitUntil: 'networkidle' })
  await addTutorAndPatient(page)
  await addCompoundedFromModal(page, names.suspension)
  await addCompoundedFromModal(page, names.capsule)
  await addCompoundedFromModal(page, names.gel)
  await shot(page, '53-v2-c1-nova-receita-itens.png')

  await page.getByRole('button', { name: /^Salvar$/ }).click()
  await page.waitForTimeout(2500)
  push('recipe_saved', { prescriptionId: savedPrescriptionId || null })

  await page.getByRole('button', { name: /Revisar/i }).first().click()
  await page.waitForTimeout(2000)
  const reviewText = await page.locator('body').innerText()
  result.previewChecks = {
    hasDoubleFavorManipular: /Favor manipular.*Favor manipular/i.test(reviewText),
    hasDoubleQsp: /q\.s\.p\..*q\.s\.p\./i.test(reviewText),
    hasDoubleVehicle: /veículo[^.\n]*veículo/i.test(reviewText),
    hasDoubleFlavor: /sabor[^.\n]*sabor/i.test(reviewText),
  }
  await shot(page, '54-v2-c1-review-sem-duplicacao.png')

  const downloadPromise = page.waitForEvent('download', { timeout: 60000 })
  await page.getByRole('button', { name: /PDF/i }).click()
  const download = await downloadPromise
  const pdfPath = path.join(downloadsDir, download.suggestedFilename() || `manipulados-v2-c1-${now}.pdf`)
  await download.saveAs(pdfPath)
  result.pdfPath = pdfPath
  push('pdf_exported', { file: pdfPath, size: fs.statSync(pdfPath).size })

  await page.goto('http://127.0.0.1:4173/receituario-vet/protocolos-3', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /\+ Novo Protocolo/i }).click()
  await fillInputByLabel(page.locator('body'), 'Nome do protocolo', names.protocol)
  await selectByLabel(page.locator('body'), 'Espécie alvo', 'Canina')
  await page.getByRole('button', { name: /^\+ Adicionar$/ }).first().click()
  await page.getByText(names.suspension).first().click()
  await page.getByRole('button', { name: /Adicionar manipulado/i }).click()
  await page.getByText(names.suspension).first().waitFor({ timeout: 30000 })
  await page.getByRole('button', { name: /^Salvar$/ }).click()
  await page.waitForTimeout(2500)
  await shot(page, '55-v2-c1-protocolo-manipulado.png')
  const protocolCard = page.locator(`xpath=//div[contains(@class,"rxv-card")][.//*[contains(text(),"${names.protocol}")]]`).first()
  await protocolCard.getByRole('button', { name: /Utilizar Protocolo/i }).click()
  await page.waitForURL(/nova-receita-2/, { timeout: 30000 })
  await page.getByText(names.suspension).first().waitFor({ timeout: 30000 })
  await shot(page, '56-v2-c1-protocolo-aplicado.png')
  push('protocol_applied', { protocol: names.protocol })

  result.ok = true
  result.savedPrescriptionId = savedPrescriptionId
  fs.writeFileSync(path.join(outDir, 'manipulados-v2-c1-proof.json'), JSON.stringify(result, null, 2))
} catch (error) {
  push('fatal', { message: error instanceof Error ? error.message : String(error) })
  await shot(page, '57-v2-c1-fatal.png').catch(() => {})
  fs.writeFileSync(path.join(outDir, 'manipulados-v2-c1-proof.json'), JSON.stringify(result, null, 2))
  throw error
} finally {
  await context.close()
  await browser.close()
}
