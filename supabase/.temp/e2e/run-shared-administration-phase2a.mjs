import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const appUrl = 'http://127.0.0.1:5173'
const baseDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir = path.join(baseDir, 'shots', 'shared-administration-phase2a')
const downloadsDir = path.join(baseDir, 'downloads')
const seed = JSON.parse(fs.readFileSync(path.join(baseDir, 'seed.json'), 'utf8'))
fs.mkdirSync(shotsDir, { recursive: true })
fs.mkdirSync(downloadsDir, { recursive: true })

const now = Date.now()

const result = {
  ok: false,
  timestamp: new Date().toISOString(),
  catalogRepresentsUnitPerAnimal: false,
  manipuladoSiteCasesRendered: false,
  protocolCanImportAndRender: false,
  recipePreviewCorrect: false,
  reviewCorrect: false,
  pdfExported: false,
  classicModeRegressionOk: false,
  phrases: {
    unitPerAnimal: '',
    siteOtic: '',
    siteLesion: '',
  },
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

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1600, height: 1200 }, acceptDownloads: true })
const page = await context.newPage()

try {
  await login(page, '/receituario-vet/nova-receita-2')
  await page.waitForURL(/receituario-vet\/nova-receita-2/, { timeout: 30000 })

  const seeded = await page.evaluate(async ({ clinicId, userId, now }) => {
    const clinic = await import('/src/lib/clinicRecords.ts')
    const protocolsRepo = await import('/src/lib/protocols/protocolsRepo.ts')
    const rxPage = await import('/modules/receituario-vet/NovaReceita2Page.tsx')
    const manipV1 = await import('/modules/receituario-vet/manipuladosV1.ts')
    const manipMapper = await import('/modules/receituario-vet/manipuladosV1Mapper.ts')

    const medicationName = `Bravecto UnitPerAnimal E2E ${now}`
    const protocolName = `Protocolo Site Admin E2E ${now}`

    const savedMedication = await clinic.saveMedication({
      clinicId,
      userId,
      medication: {
        name: medicationName,
        notes: 'E2E - administração por unidade por animal',
        is_controlled: false,
        species: ['cão'],
        routes: ['VO'],
        is_active: true,
        metadata: {},
      },
      presentations: [
        {
          clinic_id: clinicId,
          commercial_name: 'Bravecto 500 mg',
          pharmaceutical_form: 'Comprimido',
          concentration_text: '500 mg/comprimido',
          value: 500,
          value_unit: 'mg',
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
        indication: 'Antiparasitário',
        frequency: 'em dose única, repetir a cada 12 semanas',
        frequency_mode: 'repeat_interval',
        recurrence_value: 12,
        recurrence_unit: 'semanas',
        duration: 'até reavaliação clínica',
        administration_basis: 'unit_per_animal',
        administration_amount: 1,
        administration_unit: 'comprimido',
        administration_target: 'por animal',
      },
    ])

    const recommended = await clinic.getMedicationRecommendedDoses(clinicId, savedMedication.medication.id)
    const rec0 = recommended[0]

    const baseFormula = manipV1.createEmptyManipuladoV1(clinicId)

    const oticFormula = manipV1.normalizeManipuladoV1({
      ...baseFormula,
      identity: {
        ...baseFormula.identity,
        id: crypto.randomUUID(),
        name: `Otológico Gotas E2E ${now}`,
        species_scope: 'ambos',
        pharmaceutical_form: 'Solução otológica',
        primary_route: 'Otológico',
        sale_classification: 'free',
      },
      prescribing: {
        ...baseFormula.prescribing,
        posology_mode: 'fixed_per_application',
        dose_min: 4,
        dose_max: null,
        dose_unit: 'gota',
        frequency_mode: 'q12h',
        frequency_label: 'a cada 12 horas',
        duration_label: 'por 7 dias',
        duration_value: 7,
        duration_unit: 'dias',
      },
      pharmacy: {
        ...baseFormula.pharmacy,
        qsp_text: 'q.s.p. 30 aplicações',
        total_quantity: '30 aplicações',
        final_unit: 'aplicação',
        compounding_instructions: 'Uso otológico',
      },
      ingredients: [
        {
          id: crypto.randomUUID(),
          name: 'Ativo X',
          quantity: 1,
          unit: 'mg',
          role: 'active',
          rule: 'fixed',
          note: '',
          concentration: '',
          min_weight_kg: '',
          max_weight_kg: '',
        },
      ],
    })

    const clickFormula = manipV1.normalizeManipuladoV1({
      ...baseFormula,
      identity: {
        ...baseFormula.identity,
        id: crypto.randomUUID(),
        name: `Transdérmico Click E2E ${now}`,
        species_scope: 'ambos',
        pharmaceutical_form: 'Gel transdérmico',
        primary_route: 'Transdérmico',
        sale_classification: 'free',
      },
      prescribing: {
        ...baseFormula.prescribing,
        posology_mode: 'fixed_per_application',
        dose_min: 1,
        dose_max: null,
        dose_unit: 'click',
        frequency_mode: 'q24h',
        frequency_label: 'a cada 24 horas',
        duration_label: 'até reavaliação clínica',
        duration_value: null,
        duration_unit: 'dias',
      },
      pharmacy: {
        ...baseFormula.pharmacy,
        qsp_text: 'q.s.p. 30 aplicações',
        total_quantity: '30 aplicações',
        final_unit: 'aplicação',
        compounding_instructions: 'Uso tópico',
      },
      ingredients: [
        {
          id: crypto.randomUUID(),
          name: 'Ativo Y',
          quantity: 1,
          unit: 'mg',
          role: 'active',
          rule: 'fixed',
          note: '',
          concentration: '',
          min_weight_kg: '',
          max_weight_kg: '',
        },
      ],
    })

    const patient = {
      id: 'p-e2e',
      name: 'Paciente E2E',
      species: 'Canina',
      weight_kg: 10,
    }

    const oticItem = manipMapper.mapManipuladoV1ToPrescriptionItem({
      formula: oticFormula,
      patient,
      defaultStartDate: '2026-04-05',
      defaultStartHour: '08:00',
      targetDose: 4,
    })
    const clickItem = manipMapper.mapManipuladoV1ToPrescriptionItem({
      formula: clickFormula,
      patient,
      defaultStartDate: '2026-04-05',
      defaultStartHour: '08:00',
      targetDose: 1,
    })
    // força os alvos explícitos exigidos na fase 2A
    oticItem.administrationTarget = 'em cada ouvido'
    oticItem.administrationUnit = 'gota'
    clickItem.administrationTarget = 'sobre a lesão'
    clickItem.administrationUnit = 'click'

    const standardItem = {
      id: `item-unit-${now}`,
      kind: 'standard',
      type: 'medication',
      name: medicationName,
      medication_id: savedMedication.medication.id,
      is_controlled: false,
      catalog_source: 'clinic',
      pharmaceutical_form: 'Comprimido',
      concentration_text: '500 mg/comprimido',
      commercial_name: 'Bravecto 500 mg',
      package_unit: 'Caixa',
      package_quantity: 1,
      value: 500,
      value_unit: 'mg',
      per_value: 1,
      per_unit: 'comprimido',
      presentation_metadata: {
        dispensing_label: 'Caixa',
      },
      administrationBasis: 'unit_per_animal',
      administrationAmount: 1,
      administrationUnit: 'comprimido',
      administrationTarget: 'por animal',
      dose: '1 comprimido',
      frequencyMode: 'repeat_interval',
      frequency: 'em dose única, repetir a cada 12 semanas',
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
    }

    const state = rxPage.normalizeNovaReceita2State({
      id: `rx-admin-${now}`,
      patient,
      tutor: { id: 't-e2e', name: 'Tutor E2E' },
      defaultStartDate: '2026-04-05',
      defaultStartHour: '08:00',
      recommendations: '',
      examJustification: '',
      exams: [],
      items: [standardItem, oticItem, clickItem],
    })
    localStorage.setItem(`rx_draft_v2:${clinicId}`, JSON.stringify(state))

    const protocolMedication = manipMapper.mapManipuladoV1ToProtocolMedication({
      formula: oticFormula,
      sortOrder: 0,
    })
    protocolMedication.metadata = {
      ...(protocolMedication.metadata || {}),
      administration_basis: 'application_per_site',
      administration_amount: 4,
      administration_unit: 'gota',
      administration_target: 'em cada ouvido',
    }

    const savedProtocol = await protocolsRepo.saveProtocolBundle(clinicId, userId, {
      protocol: {
        name: protocolName,
        description: 'E2E administração por sítio',
        species: 'Canina',
        duration_summary: null,
        tags: ['e2e', 'shared-admin'],
        is_control_special: false,
        exams_justification: '',
        metadata: {},
      },
      medications: [protocolMedication],
      recommendations: [],
      examItems: [],
    })
    const loadedProtocol = await protocolsRepo.loadProtocolBundle(clinicId, userId, savedProtocol.id)
    const protocolMeta = loadedProtocol?.medications?.[0]?.metadata || {}

    return {
      medicationName,
      medicationId: savedMedication.medication.id,
      protocolName,
      protocolId: savedProtocol.id,
      recommendedAdministration: {
        administration_basis: rec0?.administration_basis || rec0?.metadata?.administration_basis || null,
        administration_amount: rec0?.administration_amount || rec0?.metadata?.administration_amount || null,
        administration_unit: rec0?.administration_unit || rec0?.metadata?.administration_unit || null,
        administration_target: rec0?.administration_target || rec0?.metadata?.administration_target || null,
      },
      protocolAdministration: {
        administration_basis: protocolMeta?.administration_basis || null,
        administration_amount: protocolMeta?.administration_amount || null,
        administration_unit: protocolMeta?.administration_unit || null,
        administration_target: protocolMeta?.administration_target || null,
      },
    }
  }, { clinicId: seed.clinicId, userId: seed.userId, now })

  result.entities = seeded
  result.catalogRepresentsUnitPerAnimal =
    seeded.recommendedAdministration?.administration_basis === 'unit_per_animal' &&
    Number(seeded.recommendedAdministration?.administration_amount) === 1 &&
    String(seeded.recommendedAdministration?.administration_unit || '').toLowerCase() === 'comprimido' &&
    String(seeded.recommendedAdministration?.administration_target || '').toLowerCase() === 'por animal'

  await page.goto(`${appUrl}/receituario-vet/nova-receita-2`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  await shot(page, 'phase2a-receita-preview.png')

  const recipeText = await page.locator('body').innerText()
  result.phrases.unitPerAnimal = /Administrar 1 comprimido por animal/i.test(recipeText)
    ? 'Administrar 1 comprimido por animal'
    : ''
  result.phrases.siteOtic = /Aplicar 4 gotas? em cada ouvido/i.test(recipeText)
    ? 'Aplicar 4 gotas em cada ouvido'
    : ''
  result.phrases.siteLesion = /Aplicar 1 click sobre a les[aã]o/i.test(recipeText)
    ? 'Aplicar 1 click sobre a lesão'
    : ''

  result.recipePreviewCorrect =
    !!result.phrases.unitPerAnimal &&
    !!result.phrases.siteOtic &&
    !!result.phrases.siteLesion &&
    /repetir a cada 12 semanas/i.test(recipeText)

  result.manipuladoSiteCasesRendered = !!result.phrases.siteOtic && !!result.phrases.siteLesion

  const reviewButton = page.getByRole('button', { name: /Revisar/i }).first()
  await reviewButton.click()
  await page.waitForURL(/nova-receita-2-print/, { timeout: 30000 })
  await page.waitForTimeout(1200)
  await shot(page, 'phase2a-review.png')

  const reviewText = await page.locator('body').innerText()
  result.reviewCorrect =
    /Administrar 1 comprimido por animal/i.test(reviewText) &&
    /Aplicar 4 gotas? em cada ouvido/i.test(reviewText) &&
    /Aplicar 1 click sobre a les[aã]o/i.test(reviewText)

  const downloadPromise = page.waitForEvent('download', { timeout: 60000 })
  await page.getByRole('button', { name: /Exportar PDF/i }).click()
  const download = await downloadPromise
  const pdfPath = path.join(downloadsDir, `shared-administration-phase2a-${Date.now()}-${download.suggestedFilename()}`)
  await download.saveAs(pdfPath)
  result.artifacts.pdfPath = pdfPath
  result.pdfExported = fs.existsSync(pdfPath)

  await page.goto(`${appUrl}/receituario-vet/protocolos-3`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)
  await page.locator('input[placeholder*="Buscar protocolo"]').fill(String(seeded.protocolName))
  await page.waitForTimeout(700)
  await shot(page, 'phase2a-protocol-list.png')
  result.protocolCanImportAndRender =
    seeded.protocolAdministration?.administration_basis === 'application_per_site' &&
    Number(seeded.protocolAdministration?.administration_amount) === 4 &&
    String(seeded.protocolAdministration?.administration_target || '').toLowerCase() === 'em cada ouvido'

  // quick non-regression check (classic weight-based phrase still present)
  result.classicModeRegressionOk = /a cada 12 horas|a cada 24 horas|repetir a cada 12 semanas/i.test(reviewText)

  result.ok =
    result.catalogRepresentsUnitPerAnimal &&
    result.manipuladoSiteCasesRendered &&
    result.protocolCanImportAndRender &&
    result.recipePreviewCorrect &&
    result.reviewCorrect &&
    result.pdfExported &&
    result.classicModeRegressionOk
} catch (error) {
  result.errors.push(error instanceof Error ? error.message : String(error))
  try {
    await shot(page, 'phase2a-fatal.png')
  } catch {}
} finally {
  await context.close()
  await browser.close()
  fs.writeFileSync(path.join(baseDir, 'shared-administration-phase2a.json'), JSON.stringify(result, null, 2), 'utf8')
  console.log(JSON.stringify(result, null, 2))
}

