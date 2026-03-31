import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const appUrl = 'http://127.0.0.1:4173'
const seed = JSON.parse(fs.readFileSync('C:/PROJETOS VET/Vetius/supabase/.temp/e2e/seed.json', 'utf8'))
const outDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir = path.join(outDir, 'shots')
const downloadsDir = path.join(outDir, 'downloads')
fs.mkdirSync(shotsDir, { recursive: true })
fs.mkdirSync(downloadsDir, { recursive: true })

const customQuantity = 'q.s.p. 45 unidades'
const customTutorNote = 'Orientacao reativa unica do tutor.'

const result = {
  ok: false,
  routeLoaded: false,
  previewReactive: false,
  reviewReactive: false,
  paperTitleDark: false,
  pdfPath: '',
  beforeTitle: '',
  afterTitle: '',
  beforeRight: '',
  afterRight: '',
  shots: [],
}

async function shot(page, name) {
  const file = path.join(shotsDir, name)
  await page.screenshot({ path: file, fullPage: true })
  result.shots.push(file)
}

async function login(page, nextPath) {
  await page.goto(`${appUrl}/login?next=${encodeURIComponent(nextPath)}`, { waitUntil: 'networkidle' })
  await page.getByLabel(/Email/i).fill(seed.email)
  await page.locator('#login-password').fill(seed.password)
  await page.getByRole('button', { name: /^Entrar$/ }).click()
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1680, height: 1280 }, acceptDownloads: true })
const page = await context.newPage()

try {
  await login(page, '/receituario-vet/nova-receita-2')
  await page.waitForURL(/receituario-vet\/nova-receita-2/, { timeout: 30000 })
  result.routeLoaded = true

  await page.evaluate(async () => {
    const clinicModule = await import('/src/lib/clinic.ts')
    const rxModule = await import('/modules/receituario-vet/NovaReceita2Page.tsx')
    const v2Module = await import('/modules/receituario-vet/compoundedV2.ts')
    const mapperModule = await import('/modules/receituario-vet/compoundedV2Mapper.ts')

    const clinicId = clinicModule.getStoredClinicId() || '84b02794-c6fc-4303-aaa0-17880d42b32f'

    const v2 = v2Module.createEmptyCompoundedV2()
    const regimenId = v2.regimens[0].id
    v2.formula.name = 'Benazepril teste reativo'
    v2.formula.pharmaceutical_form = 'Biscoito medicamentoso'
    v2.formula.archetype = 'oral_unitario'
    v2.formula.administration_unit = 'biscoito'
    v2.formula.primary_route = 'VO'
    v2.formula.total_quantity_text = '30 unidades'
    v2.formula.qsp_text = '30 unidades'
    v2.ingredients = [
      {
        id: crypto.randomUUID(),
        name: 'Benazepril',
        role: 'active',
        amount: null,
        unit: 'mg',
        note: '',
        is_controlled: false,
        definition_mode: 'derived_from_regimen',
        follows_primary_regimen: true,
        use_regimen_directly: true,
        target_unit: 'biscoito',
        calculation_basis: 'kg',
        multiplier: null,
        concentration_value: null,
        concentration_unit: '',
      },
    ]
    v2.regimens[0] = {
      ...v2.regimens[0],
      name: 'Regime oral',
      species: 'Canina',
      clinical_indication: 'Controle pressorico',
      administration_unit: 'biscoito',
      dose_mode: 'by_weight',
      dose_min: 0.5,
      dose_max: null,
      dose_unit: 'mg',
      dose_basis: 'kg',
      frequency_mode: 'interval_hours',
      frequency_min: 24,
      frequency_max: null,
      frequency_text: 'a cada 24 horas',
      duration_mode: 'continuous_until_recheck',
      duration_value: null,
      duration_unit: 'dias',
      duration_text: 'ate reavaliacao clinica',
      usage_instruction: '',
      tutor_observation: '',
      internal_note: '',
      pharmacy_note: '',
      is_default: true,
      concentration_value: null,
      concentration_unit: '',
      pharmacy_strategy: 'dose_base_per_unit',
    }

    const persisted = v2Module.v2ManipulatedToPersistence(v2)
    const item = mapperModule.mapCompoundedToPrescriptionItemV2({
      bundle: {
        medication: persisted.medication,
        ingredients: persisted.ingredients,
        regimens: persisted.regimens,
      },
      patient: { id: 'p1', name: 'Paciente E2E', species: 'Canina', weight_kg: 5 },
      regimenId,
      defaultStartDate: '2026-03-30',
      defaultStartHour: '20:00',
    })

    const state = rxModule.normalizeNovaReceita2State({
      id: `rx2-proof-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      prescriber: null,
      tutor: {
        id: 't1',
        name: 'Tutor E2E Manipulados',
        cpf: '',
        rg: '',
        address: '',
        phone: '',
        email: '',
      },
      patient: {
        id: 'p1',
        name: 'Paciente E2E',
        species: 'Canina',
        breed: '',
        sex: '',
        age: '',
        weight_kg: 5,
      },
      quickMode: false,
      templateId: 'modern-dark',
      printTemplateId: 'modern-dark',
      defaultStartDate: '2026-03-30',
      defaultStartHour: '20:00',
      recommendations: '',
      examJustification: '',
      exams: [],
      items: [item],
    })

    localStorage.setItem(`rx_draft_v2:${clinicId}`, JSON.stringify(state))
  })

  await page.goto(`${appUrl}/receituario-vet/nova-receita-2`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)

  const previewSheet = page.locator('[data-rx-print-canvas="sheet"]').first()
  const previewLeft = previewSheet.locator('p.min-w-0.truncate.whitespace-nowrap').first()
  const previewRight = previewSheet.locator('p.shrink-0.whitespace-nowrap.text-right').first()

  result.beforeTitle = ((await previewLeft.textContent()) || '').trim()
  result.beforeRight = ((await previewRight.textContent()) || '').trim()
  await shot(page, 'phase5b3-preview-before.png')

  const itemCard = page.locator('[data-testid^="rx-item-"]').first()
  const quantityField = page.locator('input[placeholder*="q.s.p. 10 mL"]').first()
  await quantityField.scrollIntoViewIfNeeded()
  await quantityField.fill(customQuantity)
  await quantityField.press('Tab')

  const obsField = page.locator('textarea[placeholder*="usar luvas"]').first()
  await obsField.fill(customTutorNote)
  await obsField.press('Tab')
  await page.waitForTimeout(800)

  result.afterTitle = ((await previewLeft.textContent()) || '').trim()
  result.afterRight = ((await previewRight.textContent()) || '').trim()
  const previewText = await previewSheet.innerText()
  result.previewReactive =
    result.afterTitle.length > 0 &&
    result.afterRight.length > 0 &&
    previewText.includes(customQuantity) &&
    previewText.includes(customTutorNote)

  await shot(page, 'phase5b3-preview-after.png')

  await page.getByRole('button', { name: /Revisar/i }).first().click()
  await page.waitForURL(/nova-receita-2-print\?mode=review/, { timeout: 30000 })
  await page.waitForTimeout(900)

  const reviewSheet = page.locator('[data-rx-print-canvas="sheet"]').first()
  const reviewText = await reviewSheet.innerText()
  result.reviewReactive =
    reviewText.includes(customQuantity) &&
    reviewText.includes(customTutorNote)

  const reviewLeft = reviewSheet.locator('p.min-w-0.truncate.whitespace-nowrap').first()
  const leftColor = await reviewLeft.evaluate((node) => window.getComputedStyle(node).color)
  result.paperTitleDark = leftColor === 'rgb(15, 23, 42)' || leftColor === 'rgb(17, 24, 39)'

  await shot(page, 'phase5b3-review-after.png')

  const downloadPromise = page.waitForEvent('download', { timeout: 60000 })
  await page.getByRole('button', { name: /Exportar PDF/i }).click()
  const download = await downloadPromise
  const filePath = path.join(downloadsDir, `phase5b3-${Date.now()}-${download.suggestedFilename()}`)
  await download.saveAs(filePath)
  result.pdfPath = filePath

  result.ok = result.routeLoaded && result.previewReactive && result.reviewReactive && result.paperTitleDark && !!result.pdfPath
} catch (error) {
  result.error = error instanceof Error ? error.message : String(error)
  await shot(page, 'phase5b3-fatal.png').catch(() => {})
} finally {
  fs.writeFileSync(path.join(outDir, 'phase5b3-reactive.json'), JSON.stringify(result, null, 2))
  await context.close()
  await browser.close()
}

console.log(JSON.stringify(result, null, 2))
