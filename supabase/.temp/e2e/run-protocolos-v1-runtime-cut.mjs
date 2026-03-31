import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const appUrl = 'http://127.0.0.1:5173'
const baseDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir = path.join(baseDir, 'shots')
const seed = JSON.parse(fs.readFileSync(path.join(baseDir, 'seed.json'), 'utf8'))
const source = JSON.parse(fs.readFileSync(path.join(baseDir, 'manipulados-v1-runtime-cut.json'), 'utf8'))
const protocolRunName = `${source.protocolName}-p4-${Date.now()}`
const resultFile = path.join(baseDir, 'protocolos-v1-runtime-cut.json')
fs.mkdirSync(shotsDir, { recursive: true })

const result = {
  ok: false,
  protocolName: protocolRunName,
  formulaName: source.formulaName,
  routeLoaded: false,
  protocolVisible: false,
  v1EditorOpened: false,
  protocolApplied: false,
  reviewCoherent: false,
  log: [],
}

function push(step, data = {}) {
  result.log.push({ step, time: new Date().toISOString(), ...data })
}

async function shot(page, name) {
  const file = path.join(shotsDir, name)
  await page.screenshot({ path: file, fullPage: true })
  push('shot', { file })
}

async function login(page, nextPath) {
  await page.goto(`${appUrl}/login?next=${encodeURIComponent(nextPath)}`, { waitUntil: 'networkidle' })
  await page.getByLabel(/Email/i).fill(seed.email)
  await page.locator('#login-password').fill(seed.password)
  await page.getByRole('button', { name: /^Entrar$/ }).click()
}

async function ensureTutorAndPatient(page) {
  await page.locator('input[placeholder="Buscar tutor..."]').first().fill('Tutor E2E')
  await page.getByText('Tutor E2E Manipulados').first().click()
  await page.locator('input[placeholder="Buscar paciente..."]').first().fill('Paciente E2E')
  await page.getByText('Paciente E2E').first().click()
  const weightInput = page.locator('label').filter({ hasText: /Peso \(kg\)/i }).first().locator('xpath=..').locator('input').first()
  await weightInput.fill('5')
}

async function ensureFormulaInThisBrowser(page) {
  await page.evaluate(async ({ clinicId, userId, formulaName }) => {
    const [{ createEmptyManipuladoV1, normalizeManipuladoV1 }, { saveManipuladoV1 }] = await Promise.all([
      import('/modules/receituario-vet/manipuladosV1.ts'),
      import('/src/lib/manipuladosV1Records.ts'),
    ])

    const base = createEmptyManipuladoV1(clinicId)
    const formula = normalizeManipuladoV1({
      ...base,
      identity: {
        ...base.identity,
        clinic_id: clinicId,
        name: formulaName,
        slug: formulaName,
        pharmaceutical_form: 'Petisco',
        primary_route: 'ORAL',
        species_scope: 'cao',
        indication_summary: 'Controle pressórico em cães.',
      },
      prescribing: {
        ...base.prescribing,
        posology_mode: 'mg_per_kg_dose',
        dose_min: 5,
        dose_unit: 'mg',
        frequency_mode: 'q12h',
        frequency_label: 'a cada 12 horas',
        duration_value: 14,
        duration_unit: 'dias',
        duration_label: '14 dias',
      },
      pharmacy: {
        ...base.pharmacy,
        qsp_text: '30 unidades',
        total_quantity: '30 unidades',
        final_unit: 'petiscos',
        flavor_mode: 'Frango',
        base_text: 'Petisco hipoalergênico',
      },
      ingredients: [
        {
          id: crypto.randomUUID(),
          name: 'Benazepril',
          quantity: 5,
          unit: 'mg/kg/dose',
          role: 'active',
          rule: 'per_kg',
          note: '',
          min_quantity: null,
          max_quantity: null,
          weight_range_text: '',
        },
      ],
    })

    await saveManipuladoV1(formula, userId)
  }, {
    clinicId: seed.clinicId,
    userId: seed.userId,
    formulaName: source.formulaName,
  })
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1600, height: 1200 } })
const page = await context.newPage()

try {
  await login(page, '/receituario-vet/protocolos-3')
  await page.waitForURL(/receituario-vet\/protocolos-3/, { timeout: 30000 })
  result.routeLoaded = true

  await ensureFormulaInThisBrowser(page)

  await page.getByRole('button', { name: /\+ Novo Protocolo/i }).click()
  await page.getByText(/Novo protocolo|Novo Protocolo/i).first().waitFor({ timeout: 30000 })

  const protocolNameInput = page.locator('label').filter({ hasText: /Nome do protocolo/i }).first().locator('xpath=..').locator('input').first()
  await protocolNameInput.fill(protocolRunName)

  await page.getByRole('button', { name: /^\+ Adicionar$/i }).first().click()
  const searchInput = page.getByPlaceholder(/Nome do/i).first()
  await searchInput.click()
  await searchInput.fill('')
  await searchInput.type(source.formulaName, { delay: 20 })
  await page.waitForTimeout(1200)
  await page.getByRole('button').filter({ hasText: source.formulaName }).first().click()
  await page.getByRole('button', { name: /Adicionar manipulado/i }).first().click()

  await page.getByRole('button', { name: /Editar no V1.0/i }).first().waitFor({ timeout: 30000 })
  result.protocolVisible = true
  await shot(page, 'v1-runtime-cut-08-protocol-visible.png')

  await page.getByRole('button', { name: /Editar no V1.0/i }).first().click()
  await page.getByText(/Manipulados V1.0/i).first().waitFor({ timeout: 30000 })
  result.v1EditorOpened = true
  await shot(page, 'v1-runtime-cut-09-protocol-v1-editor.png')

  await page.getByRole('button', { name: /Fechar/i }).first().click()
  await page.getByRole('button', { name: /^Salvar$/i }).first().click()
  await page.waitForTimeout(1200)

  await page.locator('input[type="search"]').first().fill(protocolRunName)
  await page.getByText(protocolRunName).first().waitFor({ timeout: 30000 })
  await shot(page, 'v1-runtime-cut-10-protocol-saved.png')

  await page.getByRole('button', { name: /Utilizar protocolo|Utilizar Protocolo/i }).first().click()
  await page.waitForURL(/receituario-vet\/nova-receita-2/, { timeout: 30000 })
  await ensureTutorAndPatient(page)
  await page.locator(`input[value="${source.formulaName}"]`).first().waitFor({ timeout: 30000 })
  result.protocolApplied = true
  await shot(page, 'v1-runtime-cut-11-protocol-applied.png')

  await page.getByRole('button', { name: /Revisar/i }).first().click()
  await page.getByText(source.formulaName).first().waitFor({ timeout: 30000 })
  result.reviewCoherent = true
  await shot(page, 'v1-runtime-cut-12-protocol-review.png')

  result.ok = true
  fs.writeFileSync(resultFile, JSON.stringify(result, null, 2))
} catch (error) {
  push('fatal', { message: error instanceof Error ? error.message : String(error) })
  await shot(page, 'v1-runtime-cut-protocol-fatal.png').catch(() => {})
  fs.writeFileSync(resultFile, JSON.stringify(result, null, 2))
  throw error
} finally {
  await context.close()
  await browser.close()
}
