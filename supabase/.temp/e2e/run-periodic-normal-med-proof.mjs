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
  savedSingleDose: false,
  savedPeriodic: false,
  reopenedCatalog: false,
  importedToRecipe: false,
  reviewCorrect: false,
  pdfExported: false,
  reviewText: '',
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
const context = await browser.newContext({ viewport: { width: 1600, height: 1200 }, acceptDownloads: true })
const page = await context.newPage()

try {
  await login(page, '/receituario-vet/catalogo3')
  await page.waitForURL(/receituario-vet\/catalogo3/, { timeout: 30000 })

  const records = await page.evaluate(async ({ clinicId, userId }) => {
    try {
      const clinic = await import('/src/lib/clinicRecords.ts')
      const bravectoName = `Bravecto 250 mg E2E ${Date.now()}`
      const simparicName = `Simparic 40 mg E2E ${Date.now()}`

    const bravecto = await clinic.saveMedication({
      clinicId,
      userId,
      medication: {
        name: bravectoName,
        notes: 'Antiparasitário de repetição periódica',
        is_controlled: false,
        species: ['cão'],
        routes: ['VO'],
        is_active: true,
        metadata: {
          active_ingredient: 'Fluralaner',
          therapeutic_class: 'Antiparasitário',
        },
      },
      presentations: [
        {
          clinic_id: clinicId,
          commercial_name: 'Bravecto 250 mg',
          pharmaceutical_form: 'Comprimido',
          concentration_text: '250 mg/comprimido',
          value: 250,
          value_unit: 'mg',
          per_value: 1,
          per_unit: 'comprimido',
          package_quantity: 1,
          package_unit: 'Caixa',
          metadata: {
            dispensing_label: 'Caixa',
          },
        },
      ],
    })

    await clinic.saveMedicationRecommendedDoses(clinicId, bravecto.medication.id, [
      {
        species: 'cão',
        route: 'VO',
        dose_value: 25,
        dose_unit: 'mg/kg',
        per_weight_unit: 'kg',
        indication: 'Ectoparasitas',
        frequency: 'repetir a cada 12 semanas',
        frequency_mode: 'repeat_interval',
        frequency_text: 'repetir a cada 12 semanas',
        recurrence_value: 12,
        recurrence_unit: 'semanas',
        duration: 'até reavaliação clínica',
        calculator_default_dose: 25,
        notes: 'Administrar e repetir a cada 12 semanas.',
      },
    ])

    const simparic = await clinic.saveMedication({
      clinicId,
      userId,
      medication: {
        name: simparicName,
        notes: 'Antiparasitário em dose única',
        is_controlled: false,
        species: ['cão'],
        routes: ['VO'],
        is_active: true,
        metadata: {
          active_ingredient: 'Sarolaner',
          therapeutic_class: 'Antiparasitário',
        },
      },
      presentations: [
        {
          clinic_id: clinicId,
          commercial_name: 'Simparic 40 mg',
          pharmaceutical_form: 'Comprimido',
          concentration_text: '40 mg/comprimido',
          value: 40,
          value_unit: 'mg',
          per_value: 1,
          per_unit: 'comprimido',
          package_quantity: 1,
          package_unit: 'Caixa',
          metadata: {
            dispensing_label: 'Caixa',
          },
        },
      ],
    })

    await clinic.saveMedicationRecommendedDoses(clinicId, simparic.medication.id, [
      {
        species: 'cão',
        route: 'VO',
        dose_value: 1,
        dose_unit: 'comprimido(s)',
        indication: 'Antiparasitário oral',
        frequency: 'em dose única',
        frequency_mode: 'single_dose',
        frequency_text: 'em dose única',
        duration: 'dose única',
        calculator_default_dose: 1,
        notes: 'Administrar em dose única.',
      },
    ])

      return {
        bravectoName,
        simparicName,
        bravectoId: bravecto.medication.id,
        simparicId: simparic.medication.id,
      }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : JSON.stringify(error),
      }
    }
  }, { clinicId: seed.clinicId, userId: seed.userId })

  if (records.error) {
    throw new Error(records.error)
  }

  result.savedPeriodic = !!records.bravectoId
  result.savedSingleDose = !!records.simparicId

  await page.goto(`${appUrl}/receituario-vet/catalogo3`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  const catalogText = await page.locator('body').innerText()
  result.reopenedCatalog = catalogText.includes(records.bravectoName) && catalogText.includes(records.simparicName)
  await shot(page, 'periodic-normal-med-catalog.png')

  await page.goto(`${appUrl}/receituario-vet/nova-receita-2`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  await page.evaluate(async ({ clinicId, bravectoName, medicationId }) => {
    const rxPage = await import('/modules/receituario-vet/NovaReceita2Page.tsx')
    const clinic = await import('/src/lib/clinicRecords.ts')
    const presentations = await clinic.getMedicationPresentations(clinicId, medicationId)
    const selectedPresentation = presentations[0]
    const state = rxPage.normalizeNovaReceita2State({
      id: `rx-periodic-${Date.now()}`,
      defaultStartDate: '2026-04-05',
      defaultStartHour: '08:00',
      patient: { id: 'p1', name: 'Paciente E2E', species: 'Canina', weight_kg: 10 },
      tutor: { id: 't1', name: 'Tutor E2E' },
      items: [{
        id: `item-periodic-${Date.now()}`,
        kind: 'standard',
        type: 'medication',
        name: bravectoName,
        medication_id: medicationId,
        is_controlled: false,
        catalog_source: 'clinic',
        pharmaceutical_form: selectedPresentation?.pharmaceutical_form || 'Comprimido',
        concentration_text: selectedPresentation?.concentration_text || '250 mg/comprimido',
        commercial_name: selectedPresentation?.commercial_name || 'Bravecto 250 mg',
        package_unit: selectedPresentation?.package_unit || 'Caixa',
        package_quantity: selectedPresentation?.package_quantity || 1,
        value: selectedPresentation?.value || 250,
        value_unit: selectedPresentation?.value_unit || 'mg',
        per_value: selectedPresentation?.per_value || 1,
        per_unit: selectedPresentation?.per_unit || 'comprimido',
        presentation_metadata: selectedPresentation?.metadata || { dispensing_label: 'Caixa' },
        dose: '25 mg/kg',
        doseValue: '25',
        doseUnit: 'mg/kg',
        frequencyMode: 'repeat_interval',
        frequency: 'repetir a cada 12 semanas',
        repeatEveryValue: 12,
        repeatEveryUnit: 'semanas',
        route: 'VO',
        routeGroup: 'ORAL',
        durationMode: 'until_recheck',
        duration: 'até reavaliação clínica',
        inheritStartFromPrescription: true,
        startDate: '2026-04-05',
        startHour: '08:00',
        start_date: '2026-04-05T08:00:00',
        autoInstruction: true,
        manualEdited: false,
        cautions: [],
        instructions: '',
      }],
      recommendations: '',
      examJustification: '',
      exams: [],
    })
    localStorage.setItem(`rx_draft_v2:${clinicId}`, JSON.stringify(state))
  }, { clinicId: seed.clinicId, bravectoName: records.bravectoName, medicationId: records.bravectoId })
  await page.goto(`${appUrl}/receituario-vet/nova-receita-2`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)

  const recipeText = await page.locator('body').innerText()
  result.importedToRecipe = recipeText.includes(records.bravectoName)
  await shot(page, 'periodic-normal-med-recipe.png')

  await page.getByRole('button', { name: /Revisar/i }).first().click()
  await page.waitForTimeout(1500)
  const reviewText = await page.locator('body').innerText()
  result.reviewText = reviewText
  result.reviewCorrect =
    reviewText.includes('Bravecto 250 mg') &&
    reviewText.includes('Caixa') &&
    /repetir a cada 12 semanas/i.test(reviewText)
  await shot(page, 'periodic-normal-med-review.png')

  const downloadPromise = page.waitForEvent('download', { timeout: 60000 })
  await page.getByRole('button', { name: /Exportar PDF/i }).click()
  const download = await downloadPromise
  const pdfPath = path.join(downloadsDir, `periodic-normal-med-${Date.now()}-${download.suggestedFilename()}`)
  await download.saveAs(pdfPath)
  result.pdfPath = pdfPath
  result.pdfExported = true

  result.ok =
    result.savedSingleDose &&
    result.savedPeriodic &&
    result.reopenedCatalog &&
    result.importedToRecipe &&
    result.reviewCorrect &&
    result.pdfExported
} catch (error) {
  result.error = error instanceof Error ? error.message : String(error)
  await shot(page, 'periodic-normal-med-fatal.png').catch(() => {})
} finally {
  fs.writeFileSync(path.join(baseDir, 'periodic-normal-med-proof.json'), JSON.stringify(result, null, 2))
  await context.close()
  await browser.close()
}

console.log(JSON.stringify(result, null, 2))
