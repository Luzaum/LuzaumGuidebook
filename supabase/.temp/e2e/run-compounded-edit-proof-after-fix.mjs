import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const appUrl = 'http://127.0.0.1:5173'
const baseDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir = path.join(baseDir, 'shots')
const downloadsDir = path.join(baseDir, 'downloads')
fs.mkdirSync(shotsDir, { recursive: true })
fs.mkdirSync(downloadsDir, { recursive: true })
const seed = JSON.parse(fs.readFileSync(path.join(baseDir, 'seed.json'), 'utf8'))
const now = Date.now()
const formulaName = `Compounded Edit Fix ${now}`
const result = {
  ok: false,
  routeLoaded: false,
  reviewLoaded: false,
  hasEditDoseButtonNova: false,
  hasEditDoseButtonReview: false,
  novaPreviewChanged: false,
  reviewPreviewChanged: false,
  pdfExported: false,
  beforeNova: '',
  afterNova: '',
  beforeReview: '',
  afterReview: '',
  shots: [],
  download: '',
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
const context = await browser.newContext({
  viewport: { width: 1680, height: 1280 },
  acceptDownloads: true,
})
const page = await context.newPage()

try {
  await login(page, '/receituario-vet/nova-receita-2')
  await page.waitForURL(/receituario-vet\/nova-receita-2/, { timeout: 30000 })
  result.routeLoaded = true

  await page.evaluate(async ({ clinicId, formulaName }) => {
    const rxModule = await import('/modules/receituario-vet/NovaReceita2Page.tsx')
    const v1Module = await import('/modules/receituario-vet/manipuladosV1.ts')
    const mapperModule = await import('/modules/receituario-vet/manipuladosV1Mapper.ts')
    const base = v1Module.createEmptyManipuladoV1(clinicId)
    const formula = v1Module.normalizeManipuladoV1({
      ...base,
      identity: {
        ...base.identity,
        clinic_id: clinicId,
        name: formulaName,
        slug: formulaName,
        pharmaceutical_form: 'Petisco',
        primary_route: 'ORAL',
        species_scope: 'cao',
        indication_summary: 'Teste estruturado de dose e revisão',
      },
      prescribing: {
        ...base.prescribing,
        posology_mode: 'mg_per_kg_dose',
        dose_min: 5,
        dose_max: 10,
        dose_unit: 'mg/kg',
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
          min_quantity: 5,
          max_quantity: 10,
          weight_range_text: '',
        },
      ],
    })
    const item = mapperModule.mapManipuladoV1ToPrescriptionItem({
      formula,
      patient: { id: 'p1', name: 'Paciente E2E', species: 'Canina', weight_kg: 5 },
      defaultStartDate: '2026-04-03',
      defaultStartHour: '06:00',
      targetDose: 7.5,
    })
    const state = rxModule.normalizeNovaReceita2State({
      id: `rx2-proof-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      prescriber: null,
      tutor: { id: 't1', name: 'Tutor E2E', cpf: '', rg: '', address: '', phone: '', email: '' },
      patient: { id: 'p1', name: 'Paciente E2E', species: 'Canina', breed: '', sex: '', age: '', weight_kg: 5 },
      quickMode: false,
      templateId: 'modern-dark',
      printTemplateId: 'modern-dark',
      defaultStartDate: '2026-04-03',
      defaultStartHour: '06:00',
      recommendations: '',
      examJustification: '',
      exams: [],
      items: [item],
    })
    localStorage.setItem(`rx_draft_v2:${clinicId}`, JSON.stringify(state))
  }, { clinicId: seed.clinicId, formulaName })

  await page.goto(`${appUrl}/receituario-vet/nova-receita-2`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  const card = page.locator('[data-testid^="rx-item-"]').first()
  await card.waitFor({ timeout: 30000 })
  const previewSheet = page.locator('[data-rx-print-canvas="sheet"]').first()
  result.beforeNova = await previewSheet.innerText()
  result.hasEditDoseButtonNova = await card.getByRole('button', { name: /Editar dose/i }).count().then((c) => c > 0)
  await shot(page, 'compounded-proof-before-nova.png')

  await card.getByRole('button', { name: /Editar dose/i }).click()
  const novaDoseDialog = page.locator('.rounded-3xl').filter({ hasText: 'Editar dose' }).last()
  await novaDoseDialog.locator('input').first().fill('9')
  await novaDoseDialog.locator('select').first().selectOption('mg/kg')
  await page.getByRole('button', { name: /Aplicar dose/i }).click()
  await page.waitForTimeout(300)

  const cardSelects = card.locator('select')
  await cardSelects.nth(1).selectOption('interval_hours')
  await card.locator('input[placeholder="Ex: 12"]').fill('8')
  await cardSelects.nth(2).selectOption('fixed_days')
  await card.locator('input[placeholder="Ex: 4"]').fill('4').catch(async () => {
    await card.locator('input[placeholder="Ex: 4"]').first().fill('4')
  })
  await page.waitForTimeout(1200)
  result.afterNova = await previewSheet.innerText()
  result.novaPreviewChanged =
    result.beforeNova !== result.afterNova &&
    /45 mg/i.test(result.afterNova) &&
    /8 horas/i.test(result.afterNova) &&
    /4 dias/i.test(result.afterNova)
  await shot(page, 'compounded-proof-after-nova.png')

  await page.getByRole('button', { name: /Revisar/i }).first().click()
  await page.waitForURL(/nova-receita-2-print\?mode=review/, { timeout: 30000 })
  await page.waitForTimeout(1500)
  result.reviewLoaded = true
  const reviewSheet = page.locator('[data-rx-print-canvas="sheet"]').first()
  result.beforeReview = await reviewSheet.innerText()
  await shot(page, 'compounded-proof-before-review.png')

  await page.locator(`text=${formulaName}`).first().click()
  await page.waitForTimeout(500)
  result.hasEditDoseButtonReview = await page.getByRole('button', { name: /Editar dose/i }).count().then((c) => c > 0)
  await page.getByRole('button', { name: /Editar dose/i }).click()
  await page.locator('input[placeholder="Ex: 10"]').last().fill('6')
  await page.locator('select:visible').nth(0).selectOption('mg/kg')
  await page.getByRole('button', { name: /^Aplicar$/ }).click()
  await page.waitForTimeout(300)

  const reviewSelectMeta = await page.locator('select:visible').evaluateAll((els) => els.map((el, index) => ({
    index,
    options: Array.from(el.options).map((option) => ({ value: option.value, text: option.textContent || '' })),
  })))
  const reviewFrequencySelect = reviewSelectMeta.find((entry) => entry.options.some((option) => /intervalo/i.test(option.text)))
  const reviewDurationSelect = reviewSelectMeta.find((entry) => entry.options.some((option) => /duração fechada|duraÃ§Ã£o fechada/i.test(option.text)))
  if (!reviewFrequencySelect) throw new Error('Não encontrei o select de frequência na revisão.')
  if (!reviewDurationSelect) throw new Error('Não encontrei o select de duração na revisão.')
  const reviewFrequencyValue = reviewFrequencySelect.options.find((option) => /intervalo/i.test(option.text))?.value
  const reviewDurationValue = reviewDurationSelect.options.find((option) => /duração fechada|duraÃ§Ã£o fechada/i.test(option.text))?.value
  if (!reviewFrequencyValue) throw new Error('Não encontrei a opção de intervalo na revisão.')
  if (!reviewDurationValue) throw new Error('Não encontrei a opção de duração fechada na revisão.')
  await page.locator('select:visible').nth(reviewFrequencySelect.index).selectOption(reviewFrequencyValue)
  await page.locator('input[placeholder="Ex: 12"]').last().fill('6')
  await page.locator('select:visible').nth(reviewDurationSelect.index).selectOption(reviewDurationValue)
  await page.locator('input:visible').last().fill('2')
  await page.waitForTimeout(1200)
  result.afterReview = await reviewSheet.innerText()
  result.reviewPreviewChanged =
    result.beforeReview !== result.afterReview &&
    /30 mg/i.test(result.afterReview) &&
    /6 horas/i.test(result.afterReview) &&
    /2 dias/i.test(result.afterReview)
  await shot(page, 'compounded-proof-after-review.png')

  const downloadPromise = page.waitForEvent('download', { timeout: 30000 })
  await page.getByRole('button', { name: /Exportar PDF|Gerar PDF/i }).click()
  const download = await downloadPromise
  const downloadPath = path.join(downloadsDir, `compounded-proof-${now}-${download.suggestedFilename()}`)
  await download.saveAs(downloadPath)
  result.pdfExported = fs.existsSync(downloadPath)
  result.download = downloadPath

  result.ok =
    result.routeLoaded &&
    result.reviewLoaded &&
    result.hasEditDoseButtonNova &&
    result.hasEditDoseButtonReview &&
    result.novaPreviewChanged &&
    result.reviewPreviewChanged &&
    result.pdfExported
} catch (error) {
  result.error = error instanceof Error ? error.message : String(error)
  await shot(page, 'compounded-proof-fatal.png').catch(() => {})
} finally {
  fs.writeFileSync(path.join(baseDir, 'compounded-edit-proof-after-fix.json'), JSON.stringify(result, null, 2))
  await context.close()
  await browser.close()
}

console.log(JSON.stringify(result, null, 2))
