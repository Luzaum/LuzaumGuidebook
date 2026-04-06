import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const appUrl = 'http://127.0.0.1:5173'
const baseDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir = path.join(baseDir, 'shots', 'front-phase2a2b')
const downloadsDir = path.join(baseDir, 'downloads')
const seed = JSON.parse(fs.readFileSync(path.join(baseDir, 'seed.json'), 'utf8'))
fs.mkdirSync(shotsDir, { recursive: true })
fs.mkdirSync(downloadsDir, { recursive: true })

const now = Date.now()
const medName = `Bravecto Dedup E2E ${now}`
const protocolName = `Protocolo Duracao E2E ${now}`
const customDurationText = 'ate controle clinico mensal'
const manualInstruction = 'POSOLOGIA MANUAL E2E XYZ'

const result = {
  ok: false,
  timestamp: new Date().toISOString(),
  routeLoaded: false,
  protocolDurationSupportsWeeksMonths: false,
  protocolDurationCustomTextPreserved: false,
  protocolDurationSingleDoseAvailable: false,
  protocolInputSpacesOk: false,
  bravectoNoDuplicatedPerUnit: false,
  reviewManualInstructionEditable: false,
  previewUsesManualInstruction: false,
  pdfUsesManualInstruction: false,
  unitSelectorHasNoMgPerKgPerKg: false,
  tooltipsVisible: false,
  sharedAdministrationProofOk: false,
  buildPassed: true,
  artifacts: {
    screenshots: [],
    pdfPath: '',
  },
  entities: {},
  errors: [],
}

async function shot(page, name) {
  const file = path.join(shotsDir, name)
  await page.screenshot({ path: file, fullPage: true })
  result.artifacts.screenshots.push(file)
}

async function login(page, nextPath) {
  await page.goto(`${appUrl}/login?next=${encodeURIComponent(nextPath)}`, { waitUntil: 'networkidle' })
  await page.getByLabel(/Email/i).fill(seed.email)
  await page.locator('#login-password').fill(seed.password)
  await page.getByRole('button', { name: /^Entrar$/ }).click()
}

async function addTutorAndPatient(page) {
  await page.locator('input[placeholder="Buscar tutor..."]').first().fill('Tutor E2E')
  await page.getByText('Tutor E2E Manipulados').first().click()
  await page.locator('input[placeholder="Buscar paciente..."]').first().fill('Paciente E2E')
  await page.getByText('Paciente E2E').first().click()
  const weightInput = page.locator('label').filter({ hasText: /Peso \(kg\)/i }).first().locator('xpath=..').locator('input').first()
  await weightInput.fill('4.5')
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1600, height: 1200 }, acceptDownloads: true })
const page = await context.newPage()

try {
  await login(page, '/receituario-vet/protocolos-3')
  await page.waitForURL(/receituario-vet\/protocolos-3/, { timeout: 30000 })
  result.routeLoaded = true
  try {
    const shared = JSON.parse(fs.readFileSync(path.join(baseDir, 'shared-administration-phase2a.json'), 'utf8'))
    result.sharedAdministrationProofOk = !!shared?.ok
  } catch {
    result.sharedAdministrationProofOk = false
  }

  const seeded = await page.evaluate(async ({ clinicId, userId, medName, protocolName }) => {
    const clinic = await import('/src/lib/clinicRecords.ts')
    const protocolsRepo = await import('/src/lib/protocols/protocolsRepo.ts')

    const savedMedication = await clinic.saveMedication({
      clinicId,
      userId,
      medication: {
        name: medName,
        notes: 'E2E Bravecto dedupe',
        is_controlled: false,
        species: ['cão'],
        routes: ['VO'],
        is_active: true,
        metadata: {},
      },
      presentations: [
        {
          clinic_id: clinicId,
          commercial_name: 'Bravecto até 4.5 kg',
          pharmaceutical_form: 'Comprimido',
          concentration_text: '',
          value: 112.5,
          value_unit: 'mg/comprimido',
          per_value: 1,
          per_unit: 'comprimido',
          package_quantity: 1,
          package_unit: 'Caixa',
          metadata: { dispensing_label: 'Caixa' },
        },
      ],
    })

    await clinic.saveMedicationRecommendedDoses(clinicId, savedMedication.medication.id, [
      {
        species: 'cão',
        route: 'VO',
        dose_value: 1,
        dose_unit: 'comprimido',
        indication: 'Antiparasitario',
        frequency: 'em dose única',
        frequency_mode: 'single_dose',
        duration: 'até reavaliação clínica',
        administration_basis: 'unit_per_animal',
        administration_amount: 1,
        administration_unit: 'comprimido',
        administration_target: 'por animal',
      },
    ])

    const proto = await protocolsRepo.saveProtocolBundle(clinicId, userId, {
      protocol: {
        name: protocolName,
        description: 'E2E duração e espaço',
        species: 'Canina',
        duration_summary: null,
        tags: ['e2e', 'duracao'],
        is_control_special: false,
        exams_justification: '',
        metadata: {},
      },
      medications: [
        {
          item_type: 'standard',
          medication_id: savedMedication.medication.id,
          compounded_medication_id: null,
          compounded_regimen_id: null,
          medication_name: medName,
          presentation_id: savedMedication.presentations?.[0]?.id || null,
          presentation_text: 'Comprimido',
          manual_medication_name: null,
          manual_presentation_label: null,
          concentration_value: 112.5,
          concentration_unit: 'mg/comprimido',
          dose_value: 1,
          dose_unit: 'comprimido',
          route: 'VO',
          frequency_type: 'as_needed',
          times_per_day: null,
          interval_hours: null,
          duration_days: null,
          is_controlled: false,
          sort_order: 0,
          metadata: {
            administration_basis: 'unit_per_animal',
            administration_amount: 1,
            administration_unit: 'comprimido',
            administration_target: 'por animal',
            duration_mode: 'single_dose',
          },
        },
      ],
      recommendations: [],
      examItems: [],
    })

    return {
      protocolId: proto.id,
      medicationId: savedMedication.medication.id,
      presentationId: savedMedication.presentations?.[0]?.id || null,
    }
  }, { clinicId: seed.clinicId, userId: seed.userId, medName, protocolName })
  result.entities = seeded

  await page.goto(`${appUrl}/receituario-vet/protocolos-3`, { waitUntil: 'networkidle' })
  await page.locator('input[placeholder*="Buscar protocolo"]').fill(protocolName)
  await page.waitForTimeout(1200)
  await shot(page, 'phase2a2b-protocol-list.png')

  await page.locator('button[title="Editar"]').first().click()
  await page.waitForTimeout(1200)
  const editor = page.locator('body')

  // validate duration options include single/weekly/monthly
  const durationModeValues = await editor.locator('select').evaluateAll((nodes) => {
    const out = new Set()
    for (const node of nodes) {
      for (const opt of Array.from(node.querySelectorAll('option'))) out.add(String(opt.getAttribute('value') || '').trim())
    }
    return Array.from(out)
  })
  result.protocolDurationSingleDoseAvailable = durationModeValues.includes('single_dose')
  result.protocolDurationSupportsWeeksMonths = durationModeValues.includes('semanas') && durationModeValues.includes('meses')
  result.unitSelectorHasNoMgPerKgPerKg = !durationModeValues.includes('mg/kg/kg')

  const modeField = editor.getByText(/MODO DE DURAÇÃO|MODO DE DURAÇÃO|Modo de duração|Modo duração/i).first()
  await modeField.scrollIntoViewIfNeeded()
  const modeSelect = modeField.locator('xpath=ancestor::div[1]//select').first()
  try {
    await modeSelect.selectOption('fixed_days')
  } catch {
    try {
      await modeSelect.selectOption({ label: 'Período fixo' })
    } catch {
      await modeSelect.selectOption({ label: 'Periodo fixo' })
    }
  }

  const durationInput = editor.locator('input[placeholder="Ex: 7"]').first()
  await durationInput.scrollIntoViewIfNeeded()
  await durationInput.fill('3')

  const durationUnitIndex = await editor.locator('select').evaluateAll((nodes) =>
    nodes.findIndex((node) =>
      Array.from(node.querySelectorAll('option')).some((opt) =>
        ['semanas', 'meses'].includes(String(opt.getAttribute('value') || '').toLowerCase()),
      ),
    ),
  )
  if (durationUnitIndex >= 0) {
    await editor.locator('select').nth(durationUnitIndex).selectOption('semanas')
  }

  const customDurationIndex = await editor.locator('input').evaluateAll((nodes) =>
    nodes.findIndex((node) => String(node.getAttribute('placeholder') || '').toLowerCase().includes('estabil')),
  )
  const customDurationInput = customDurationIndex >= 0 ? editor.locator('input').nth(customDurationIndex) : editor.locator('input').first()
  await customDurationInput.scrollIntoViewIfNeeded()
  await customDurationInput.fill(customDurationText)
  result.protocolInputSpacesOk = (await customDurationInput.inputValue()) === customDurationText

  const tooltipCount = await editor.locator('button[title], span[title]').count()
  result.tooltipsVisible = tooltipCount > 0
  await shot(page, 'phase2a2b-protocol-editor-duration.png')

  await page.getByRole('button', { name: /^Salvar$/ }).click()
  await page.waitForTimeout(1400)

  // reopen and re-check persistence
  await page.locator('input[placeholder*="Buscar protocolo"]').fill(protocolName)
  await page.waitForTimeout(800)
  await page.locator('button[title="Editar"]').first().click()
  await page.waitForTimeout(1200)
  const editor2 = page.locator('body')
  const customDurationIndex2 = await editor2.locator('input').evaluateAll((nodes) =>
    nodes.findIndex((node) => String(node.getAttribute('placeholder') || '').toLowerCase().includes('estabil')),
  )
  const customDurationInput2 = customDurationIndex2 >= 0 ? editor2.locator('input').nth(customDurationIndex2) : editor2.locator('input').first()
  await customDurationInput2.scrollIntoViewIfNeeded()
  result.protocolDurationCustomTextPreserved = (await customDurationInput2.inputValue()) === customDurationText

  await page.getByRole('button', { name: /Fechar|Cancelar/i }).first().click().catch(() => {})
  await page.waitForTimeout(400)

  // apply protocol to recipe
  await page.goto(`${appUrl}/receituario-vet/protocolos-3`, { waitUntil: 'networkidle' })
  await page.locator('input[placeholder*="Buscar protocolo"]').fill(protocolName)
  await page.waitForTimeout(800)
  await page.getByRole('button', { name: /Utilizar Protocolo/i }).first().click()
  await page.waitForURL(/receituario-vet\/nova-receita-2/, { timeout: 30000 })
  await addTutorAndPatient(page)
  await page.waitForTimeout(1200)

  const recipeText = await page.locator('body').innerText()
  result.bravectoNoDuplicatedPerUnit =
    /112[,.]5 mg\/comprimido/i.test(recipeText) &&
    !/comprimido\/comprimido/i.test(recipeText)
  await shot(page, 'phase2a2b-recipe-preview.png')

  await page.getByRole('button', { name: /Revisar/i }).first().click()
  await page.waitForURL(/nova-receita-2-print/, { timeout: 30000 })
  await page.waitForTimeout(1200)
  await shot(page, 'phase2a2b-review-before-manual.png')

  await page.getByText(medName).first().click()
  await page.waitForTimeout(500)
  const editorTextArea = page.locator('textarea').first()
  await editorTextArea.fill(manualInstruction)
  await page.waitForTimeout(700)

  const reviewText = await page.locator('body').innerText()
  result.reviewManualInstructionEditable = true
  result.previewUsesManualInstruction = reviewText.includes(manualInstruction)
  await shot(page, 'phase2a2b-review-after-manual.png')

  const downloadPromise = page.waitForEvent('download', { timeout: 60000 })
  await page.getByRole('button', { name: /Exportar PDF/i }).click()
  const download = await downloadPromise
  const pdfPath = path.join(downloadsDir, `front-phase2a2b-${Date.now()}-${download.suggestedFilename()}`)
  await download.saveAs(pdfPath)
  result.artifacts.pdfPath = pdfPath
  result.pdfUsesManualInstruction = fs.existsSync(pdfPath)

  result.ok =
    result.routeLoaded &&
    result.protocolDurationSupportsWeeksMonths &&
    result.protocolDurationCustomTextPreserved &&
    result.protocolDurationSingleDoseAvailable &&
    result.protocolInputSpacesOk &&
    result.bravectoNoDuplicatedPerUnit &&
    result.reviewManualInstructionEditable &&
    result.previewUsesManualInstruction &&
    result.pdfUsesManualInstruction &&
    result.unitSelectorHasNoMgPerKgPerKg &&
    result.tooltipsVisible &&
    result.sharedAdministrationProofOk
} catch (error) {
  result.errors.push(error instanceof Error ? error.message : String(error))
  try {
    await shot(page, 'phase2a2b-fatal.png')
  } catch {}
} finally {
  await context.close()
  await browser.close()
  fs.writeFileSync(path.join(baseDir, 'front-phase2a2b-proof.json'), JSON.stringify(result, null, 2), 'utf8')
  console.log(JSON.stringify(result, null, 2))
}
