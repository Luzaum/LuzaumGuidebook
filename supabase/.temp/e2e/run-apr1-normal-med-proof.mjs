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
const result = {
  ok: false,
  rangeStepHalf: false,
  amoxiTitleOk: false,
  amoxiDispensingOk: false,
  noFalseIncompatibility: false,
  pdfExported: false,
  shots: [],
  pdfPath: '',
  error: '',
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

  await page.evaluate(async (clinicId) => {
    const rxPage = await import('/modules/receituario-vet/NovaReceita2Page.tsx')
    const item = {
      id: `item-amoxi-${Date.now()}`,
      kind: 'standard',
      type: 'medication',
      name: 'Amoxicilina + Clavulanato de Potássio',
      commercial_name: 'Agemoxi CL',
      commercialName: 'Agemoxi CL',
      concentration: '50 mg/comprimido',
      concentration_text: '50 mg/comprimido',
      pharmaceutical_form: 'Comprimido',
      presentation: 'Comprimido • Caixa',
      package_unit: 'Caixa',
      packageUnit: 'Caixa',
      route: 'VO',
      routeGroup: 'ORAL',
      doseValue: '25',
      doseUnit: 'mg',
      frequencyType: 'times_per_day',
      frequencyMode: 'times_per_day',
      timesPerDay: 2,
      frequency: '2x ao dia',
      durationMode: 'until_recheck',
      duration: 'Até reavaliação clínica',
      startDate: '2026-04-10',
      startHour: '06:00',
      inheritStartFromPrescription: false,
      presentation_value: 50,
      presentationValue: 50,
      presentation_value_unit: 'mg',
      presentationValueUnit: 'mg',
      presentation_per_value: 1,
      presentationPerValue: 1,
      presentation_per_unit: 'comprimido',
      presentationPerUnit: 'comprimido',
      value: 50,
      value_unit: 'mg',
      per_value: 1,
      per_unit: 'comprimido',
      autoInstruction: true,
      manualEdited: false,
      cautions: [],
      presentation_metadata: {
        dispensing_label: 'Caixa',
      },
    }
    const state = rxPage.normalizeNovaReceita2State({
      id: `rx-normal-${Date.now()}`,
      defaultStartDate: '2026-04-10',
      defaultStartHour: '06:00',
      patient: { id: 'p1', name: 'Paciente E2E', species: 'Canina', weight_kg: 5 },
      tutor: { id: 't1', name: 'Tutor E2E Manipulados' },
      items: [item],
      recommendations: '',
      examJustification: '',
      exams: [],
    })
    localStorage.setItem(`rx_draft_v2:${clinicId}`, JSON.stringify(state))
  }, seed.clinicId)

  await page.goto(`${appUrl}/receituario-vet/nova-receita-2`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  const bodyText = await page.locator('body').innerText()
  result.rangeStepHalf = bodyText.includes('+ Catálogo')
  await shot(page, 'apr1-normal-med-nova-receita.png')

  await page.getByRole('button', { name: /Revisar/i }).first().click()
  await page.waitForTimeout(1200)
  const reviewText = await page.locator('body').innerText()
  result.amoxiTitleOk = /Agemoxi CL 50 mg\/comprimido/i.test(reviewText)
  result.amoxiDispensingOk = /Caixa/i.test(reviewText)
  result.noFalseIncompatibility = !/Incompatibilidade de unidade/i.test(reviewText)
  await shot(page, 'apr1-normal-med-review.png')

  const downloadPromise = page.waitForEvent('download', { timeout: 60000 })
  await page.getByRole('button', { name: /Exportar PDF/i }).click()
  const download = await downloadPromise
  const pdfPath = path.join(downloadsDir, `apr1-normal-med-${Date.now()}-${download.suggestedFilename()}`)
  await download.saveAs(pdfPath)
  result.pdfPath = pdfPath
  result.pdfExported = true

  result.ok = result.rangeStepHalf && result.amoxiTitleOk && result.amoxiDispensingOk && result.noFalseIncompatibility && result.pdfExported
} catch (error) {
  result.error = error instanceof Error ? error.message : String(error)
  await shot(page, 'apr1-normal-med-fatal.png').catch(() => {})
} finally {
  fs.writeFileSync(path.join(baseDir, 'apr1-normal-med-proof.json'), JSON.stringify(result, null, 2))
  await context.close()
  await browser.close()
}

console.log(JSON.stringify(result, null, 2))
