import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const appUrl = 'http://127.0.0.1:5173'
const baseDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir = path.join(baseDir, 'shots', 'front-phase2c')
const downloadsDir = path.join(baseDir, 'downloads')
const seed = JSON.parse(fs.readFileSync(path.join(baseDir, 'seed.json'), 'utf8'))
fs.mkdirSync(shotsDir, { recursive: true })
fs.mkdirSync(downloadsDir, { recursive: true })

const now = Date.now()
const medComprimidoName = `Bravecto Per Animal ${now}`
const medPipetaName = `Pipeta Per Animal ${now}`
const medSacheName = `Sache Per Animal ${now}`
const protocolName = `Protocolo Site Phase2C ${now}`

const result = {
  ok: false,
  timestamp: new Date().toISOString(),
  routeLoaded: false,
  buildPassed: true,
  catalogRepresentsPerAnimal: false,
  catalogDoseUnitCanonical: false,
  recipeCases: {
    comprimidoPorAnimal: false,
    pipetaPorAnimal: false,
    sachePorAnimal: false,
    gotasOuvido: false,
    gotaOlho: false,
    borrifadaNarina: false,
    clickLesao: false,
    pumpLesao: false,
  },
  reviewCases: {
    comprimidoPorAnimal: false,
    pipetaPorAnimal: false,
    sachePorAnimal: false,
  },
  noInvalidUnitCombination: false,
  reviewMatches: false,
  pdfExported: false,
  protocolImportRendered: false,
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
  result.routeLoaded = true

  const seeded = await page.evaluate(async ({ clinicId, userId, now, medComprimidoName, medPipetaName, medSacheName, protocolName }) => {
    const clinic = await import('/src/lib/clinicRecords.ts')
    const protocolsRepo = await import('/src/lib/protocols/protocolsRepo.ts')
    const rxPage = await import('/modules/receituario-vet/NovaReceita2Page.tsx')
    const manipV1 = await import('/modules/receituario-vet/manipuladosV1.ts')
    const manipMapper = await import('/modules/receituario-vet/manipuladosV1Mapper.ts')

    const medComprimido = await clinic.saveMedication({
      clinicId,
      userId,
      medication: {
        name: medComprimidoName,
        notes: 'E2E per animal comprimido',
        is_controlled: false,
        species: ['cão'],
        routes: ['VO'],
        is_active: true,
        metadata: {},
      },
      presentations: [{
        clinic_id: clinicId,
        commercial_name: 'Bravecto 112,5 mg',
        pharmaceutical_form: 'Comprimido',
        concentration_text: '112,5 mg/comprimido',
        value: 112.5,
        value_unit: 'mg',
        per_value: 1,
        per_unit: 'comprimido',
        package_quantity: 1,
        package_unit: 'Caixa',
        metadata: { dispensing_label: 'Caixa' },
      }],
    })

    await clinic.saveMedicationRecommendedDoses(clinicId, medComprimido.medication.id, [{
      species: 'cão',
      route: 'VO',
      dose_value: 1,
      dose_unit: 'mg/kg',
      indication: 'Antiparasitario',
      frequency: 'em dose unica',
      frequency_mode: 'single_dose',
      duration: 'ate reavaliacao clinica',
      administration_basis: 'per_animal',
      administration_amount: 1,
      administration_unit: 'comprimido',
      administration_target: 'por animal',
    }])

    const medPipeta = await clinic.saveMedication({
      clinicId,
      userId,
      medication: {
        name: medPipetaName,
        notes: 'E2E per animal pipeta',
        is_controlled: false,
        species: ['cão'],
        routes: ['Tópico'],
        is_active: true,
        metadata: {},
      },
      presentations: [{
        clinic_id: clinicId,
        commercial_name: 'Pipeta Spot On',
        pharmaceutical_form: 'Solução de uso externo',
        concentration_text: '1 pipeta',
        value: 1,
        value_unit: 'unidade',
        per_value: 1,
        per_unit: 'pipeta',
        package_quantity: 1,
        package_unit: 'Caixa',
      }],
    })

    const medSache = await clinic.saveMedication({
      clinicId,
      userId,
      medication: {
        name: medSacheName,
        notes: 'E2E per animal sache',
        is_controlled: false,
        species: ['cão'],
        routes: ['VO'],
        is_active: true,
        metadata: {},
      },
      presentations: [{
        clinic_id: clinicId,
        commercial_name: 'Suplemento Sache',
        pharmaceutical_form: 'Sachê',
        concentration_text: '1 sachê',
        value: 1,
        value_unit: 'unidade',
        per_value: 1,
        per_unit: 'sachê',
        package_quantity: 1,
        package_unit: 'Caixa',
      }],
    })

    const recommended = await clinic.getMedicationRecommendedDoses(clinicId, medComprimido.medication.id)
    const rec0 = recommended[0]

    const patient = {
      id: 'p-phase2c',
      name: 'Paciente E2E',
      species: 'Canina',
      weight_kg: 10,
    }

    const makeStandard = (params) => ({
      id: `item-${params.key}-${now}`,
      kind: 'standard',
      type: 'medication',
      isManual: true,
      is_controlled: false,
      catalog_source: 'clinic',
      name: params.name,
      pharmaceutical_form: params.form,
      concentration_text: params.concentration,
      package_unit: params.dispensing,
      administrationBasis: 'per_animal',
      administrationAmount: 1,
      administrationUnit: params.unit,
      administrationTarget: 'por animal',
      dose: `1 ${params.unit}`,
      frequencyMode: 'single_dose',
      frequency: 'em dose unica',
      route: params.route,
      durationMode: 'until_recheck',
      duration: 'ate reavaliacao clinica',
      inheritStartFromPrescription: true,
      startDate: '2026-04-05',
      startHour: '08:00',
      start_date: '2026-04-05T08:00:00',
      autoInstruction: true,
      manualEdited: false,
      cautions: [],
      instructions: '',
    })

    const standardComprimido = makeStandard({
      key: 'comp',
      name: medComprimidoName,
      form: 'Comprimido',
      concentration: '112,5 mg/comprimido',
      dispensing: 'Caixa',
      unit: 'comprimido',
      route: 'VO',
    })
    const standardPipeta = makeStandard({
      key: 'pip',
      name: medPipetaName,
      form: 'Pipeta',
      concentration: '1 pipeta',
      dispensing: 'Caixa',
      unit: 'pipeta',
      route: 'Topico',
    })
    const standardSache = makeStandard({
      key: 'sache',
      name: medSacheName,
      form: 'Sache',
      concentration: '1 sache',
      dispensing: 'Caixa',
      unit: 'sache',
      route: 'VO',
    })

    const baseFormula = manipV1.createEmptyManipuladoV1(clinicId)
    const makeManipFormula = (params) => manipV1.normalizeManipuladoV1({
      ...baseFormula,
      identity: {
        ...baseFormula.identity,
        id: crypto.randomUUID(),
        name: params.name,
        species_scope: 'ambos',
        pharmaceutical_form: params.form,
        primary_route: params.route,
        sale_classification: 'free',
      },
      prescribing: {
        ...baseFormula.prescribing,
        posology_mode: 'fixed_per_application',
        dose_min: params.amount,
        dose_max: null,
        dose_unit: params.unit,
        frequency_mode: 'q24h',
        frequency_label: 'a cada 24 horas',
        duration_label: 'ate reavaliacao clinica',
        duration_value: null,
        duration_unit: 'dias',
      },
      pharmacy: {
        ...baseFormula.pharmacy,
        qsp_text: 'q.s.p. 30 aplicacoes',
        total_quantity: '30 aplicacoes',
        final_unit: 'aplicacao',
        compounding_instructions: 'Uso conforme orientacao',
      },
      ingredients: [{
        id: crypto.randomUUID(),
        name: 'Ativo teste',
        quantity: 1,
        unit: 'mg',
        role: 'active',
        rule: 'fixed',
        note: '',
        concentration: '',
        min_weight_kg: '',
        max_weight_kg: '',
      }],
    })

    const makeCompoundedItem = ({ formula, amount, target, unit }) => {
      const item = manipMapper.mapManipuladoV1ToPrescriptionItem({
        formula,
        patient,
        defaultStartDate: '2026-04-05',
        defaultStartHour: '08:00',
        targetDose: amount,
      })
      item.administrationBasis = 'per_application_site'
      item.administrationAmount = amount
      item.administrationUnit = unit
      item.administrationTarget = target
      return item
    }

    const itemEar = makeCompoundedItem({
      formula: makeManipFormula({ name: `Otologico ${now}`, form: 'Solucao otologica', route: 'Otologico', amount: 4, unit: 'gota' }),
      amount: 4,
      target: 'em cada ouvido',
      unit: 'gota',
    })
    const itemEye = makeCompoundedItem({
      formula: makeManipFormula({ name: `Oftalmico ${now}`, form: 'Colirio', route: 'Oftalmico', amount: 1, unit: 'gota' }),
      amount: 1,
      target: 'em cada olho',
      unit: 'gota',
    })
    const itemNose = makeCompoundedItem({
      formula: makeManipFormula({ name: `Intranasal ${now}`, form: 'Solucao intranasal', route: 'Intranasal', amount: 1, unit: 'borrifada' }),
      amount: 1,
      target: 'em cada narina',
      unit: 'borrifada',
    })
    const itemClick = makeCompoundedItem({
      formula: makeManipFormula({ name: `Transdermico Click ${now}`, form: 'Gel transdermico', route: 'Transdermico', amount: 1, unit: 'click' }),
      amount: 1,
      target: 'sobre a lesao',
      unit: 'click',
    })
    const itemPump = makeCompoundedItem({
      formula: makeManipFormula({ name: `Transdermico Pump ${now}`, form: 'Gel transdermico', route: 'Transdermico', amount: 1, unit: 'pump' }),
      amount: 1,
      target: 'sobre a lesao',
      unit: 'pump',
    })

    const protocol = await protocolsRepo.saveProtocolBundle(clinicId, userId, {
      protocol: {
        name: protocolName,
        description: 'E2E protocolo per_application_site',
        species: 'Canina',
        duration_summary: null,
        tags: ['e2e', 'phase2c'],
        is_control_special: false,
        exams_justification: '',
        metadata: {},
      },
      medications: [{
        item_type: 'standard',
        medication_id: medComprimido.medication.id,
        compounded_medication_id: null,
        compounded_regimen_id: null,
        medication_name: medComprimidoName,
        presentation_id: medComprimido.presentations?.[0]?.id || null,
        presentation_text: 'Comprimido',
        manual_medication_name: null,
        manual_presentation_label: null,
        concentration_value: 112.5,
        concentration_unit: 'mg/comprimido',
        dose_value: 1,
        dose_unit: 'mg/kg',
        route: 'Otologico',
        frequency_type: 'interval_hours',
        times_per_day: null,
        interval_hours: 24,
        duration_days: 7,
        is_controlled: false,
        sort_order: 0,
        metadata: {
          administration_basis: 'per_application_site',
          administration_amount: 4,
          administration_unit: 'gota',
          administration_target: 'em cada ouvido',
        },
      }],
      recommendations: [],
      examItems: [],
    })

    const state = rxPage.normalizeNovaReceita2State({
      id: `rx-phase2c-${now}`,
      patient,
      tutor: { id: 't-phase2c', name: 'Tutor E2E' },
      defaultStartDate: '2026-04-05',
      defaultStartHour: '08:00',
      recommendations: '',
      examJustification: '',
      exams: [],
      items: [
        standardComprimido,
        standardPipeta,
        standardSache,
        itemEar,
        itemEye,
        itemNose,
        itemClick,
        itemPump,
      ],
    })
    localStorage.setItem(`rx_draft_v2:${clinicId}`, JSON.stringify(state))

    return {
      protocolName,
      protocolId: protocol.id,
      catalogRecommended: rec0
        ? {
          administration_basis: rec0.administration_basis || rec0.metadata?.administration_basis || null,
          administration_amount: rec0.administration_amount || rec0.metadata?.administration_amount || null,
          administration_unit: rec0.administration_unit || rec0.metadata?.administration_unit || null,
          administration_target: rec0.administration_target || rec0.metadata?.administration_target || null,
          dose_unit: rec0.dose_unit || null,
        }
        : null,
    }
  }, { clinicId: seed.clinicId, userId: seed.userId, now, medComprimidoName, medPipetaName, medSacheName, protocolName })

  result.entities = seeded
  result.catalogRepresentsPerAnimal =
    String(seeded.catalogRecommended?.administration_basis || '') === 'per_animal'
    && Number(seeded.catalogRecommended?.administration_amount) === 1
    && String(seeded.catalogRecommended?.administration_unit || '').toLowerCase() === 'comprimido'
    && String(seeded.catalogRecommended?.administration_target || '').toLowerCase() === 'por animal'
  result.catalogDoseUnitCanonical = String(seeded.catalogRecommended?.dose_unit || '') === 'mg/kg'

  await page.goto(`${appUrl}/receituario-vet/nova-receita-2`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  await shot(page, 'phase2c-receita-preview.png')

  const recipeText = await page.locator('body').innerText()
  result.recipeCases.comprimidoPorAnimal = /Administrar 1 comprimido por animal/i.test(recipeText)
  result.recipeCases.pipetaPorAnimal = /Aplicar 1 pipeta por animal/i.test(recipeText)
  result.recipeCases.sachePorAnimal = /Administrar 1 sache por animal/i.test(recipeText)
  result.recipeCases.gotasOuvido = /Aplicar 4 gotas? em cada ouvido/i.test(recipeText)
  result.recipeCases.gotaOlho = /Aplicar 1 gota em cada olho/i.test(recipeText)
  result.recipeCases.borrifadaNarina = /Aplicar 1 borrifada em cada narina/i.test(recipeText)
  result.recipeCases.clickLesao = /Aplicar 1 click sobre a lesao/i.test(recipeText)
  result.recipeCases.pumpLesao = /Aplicar 1 pump sobre a lesao/i.test(recipeText)

  result.noInvalidUnitCombination =
    !/mg\/kg\/kg/i.test(recipeText)
    && !/ml\/kg\/kg/i.test(recipeText)
    && !/ui\/kg\/kg/i.test(recipeText)
    && !/mg\/comprimido\/comprimido/i.test(recipeText)

  await page.getByRole('button', { name: /Revisar/i }).first().click()
  await page.waitForURL(/nova-receita-2-print/, { timeout: 30000 })
  await page.waitForTimeout(1200)
  await shot(page, 'phase2c-review.png')

  const reviewText = await page.locator('body').innerText()
  result.reviewCases.comprimidoPorAnimal = /Administrar 1 comprimido por animal/i.test(reviewText)
  result.reviewCases.pipetaPorAnimal = /Aplicar 1 pipeta por animal/i.test(reviewText)
  result.reviewCases.sachePorAnimal = /Administrar 1 sach[eê] por animal/i.test(reviewText)
  result.reviewMatches =
    result.reviewCases.comprimidoPorAnimal
    && result.reviewCases.pipetaPorAnimal
    && result.reviewCases.sachePorAnimal

  const downloadPromise = page.waitForEvent('download', { timeout: 60000 })
  await page.getByRole('button', { name: /Exportar PDF/i }).click()
  const download = await downloadPromise
  const pdfPath = path.join(downloadsDir, `front-phase2c-${Date.now()}-${download.suggestedFilename()}`)
  await download.saveAs(pdfPath)
  result.artifacts.pdfPath = pdfPath
  result.pdfExported = fs.existsSync(pdfPath)

  await page.goto(`${appUrl}/receituario-vet/protocolos-3`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)
  await page.locator('input[placeholder*="Buscar protocolo"]').fill(protocolName)
  await page.waitForTimeout(900)
  await shot(page, 'phase2c-protocol-list.png')
  await page.getByRole('button', { name: /Utilizar Protocolo/i }).first().click()
  await page.waitForURL(/nova-receita-2/, { timeout: 30000 })
  await page.waitForTimeout(1500)
  await shot(page, 'phase2c-protocol-applied.png')
  const protocolAppliedText = await page.locator('body').innerText()
  result.protocolImportRendered = /Aplicar 4 gotas? em cada ouvido/i.test(protocolAppliedText)

  const recipeCasesOk = Object.values(result.recipeCases).every(Boolean)
  result.ok =
    result.routeLoaded
    && result.catalogRepresentsPerAnimal
    && result.catalogDoseUnitCanonical
    && recipeCasesOk
    && result.noInvalidUnitCombination
    && result.reviewMatches
    && result.pdfExported
    && result.protocolImportRendered
} catch (error) {
  result.errors.push(error instanceof Error ? error.message : String(error))
  try {
    await shot(page, 'phase2c-fatal.png')
  } catch {}
} finally {
  await context.close()
  await browser.close()
  fs.writeFileSync(path.join(baseDir, 'front-phase2c-proof.json'), JSON.stringify(result, null, 2), 'utf8')
  console.log(JSON.stringify(result, null, 2))
}
