import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const appUrl = 'http://127.0.0.1:4173'
const seed = JSON.parse(fs.readFileSync('C:/PROJETOS VET/Vetius/supabase/.temp/e2e/seed.json', 'utf8'))
const outDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir = path.join(outDir, 'shots')
fs.mkdirSync(shotsDir, { recursive: true })

const now = Date.now()
const benazeprilName = `Benazepril Biscoito Protocolo ${now}`
const legacyName = `Trazodona Cápsulas Legado ${now}`
const protocolName = `Protocolo Manipulado V2 ${now}`

const result = {
  ok: false,
  protocolName,
  benazeprilName,
  legacyName,
  routeLoaded: false,
  protocolEditorOpened: false,
  v2ItemOpened: false,
  legacyItemOpened: false,
  legacyNoticeVisible: false,
  protocolSaved: false,
  appliedToNovaReceita: false,
  reviewCoherent: false,
  log: [],
}

function push(step, data = {}) {
  result.log.push({ step, time: new Date().toISOString(), ...data })
}

async function shot(page, fileName) {
  const file = path.join(shotsDir, fileName)
  await page.screenshot({ path: file, fullPage: true })
  push('shot', { file })
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
  await weightInput.fill('5')
}

async function seedProtocol(page) {
  return await page.evaluate(async ({ clinicId, userId, benazeprilName, legacyName, protocolName }) => {
    const [
      compoundedRecords,
      compoundedV2,
      compoundedV2Mapper,
      protocolsRepo,
    ] = await Promise.all([
      import('/src/lib/compoundedRecords.ts'),
      import('/modules/receituario-vet/compoundedV2.ts'),
      import('/modules/receituario-vet/compoundedV2Mapper.ts'),
      import('/src/lib/protocols/protocolsRepo.ts'),
    ])

    const v2 = {
      formula: {
        id: crypto.randomUUID(),
        clinic_id: clinicId,
        slug: '',
        name: benazeprilName,
        pharmaceutical_form: 'Biscoitos',
        archetype: 'oral_unitario',
        formula_type: 'clinical_dose_oriented',
        dosage_form_family: 'oral_unit',
        species: ['Canina'],
        primary_route: 'VO',
        administration_unit: 'biscoito',
        sale_classification: 'free',
        control_type: null,
        is_active: true,
        is_continuous_use: false,
        short_description: 'Benazepril calculado pelo peso do paciente.',
        active_principles_summary: 'Benazepril',
        qsp_text: '30 unidades',
        total_quantity_text: '30 unidades',
        vehicle: '',
        flavor: 'bacon',
        excipient_base: '',
        ui_version: 2,
        legacy_source: 'protocol-phase4',
      },
      ingredients: [
        {
          id: crypto.randomUUID(),
          name: 'Benazepril',
          role: 'active',
          amount: 0.5,
          unit: 'mg',
          note: '',
          is_controlled: false,
          definition_mode: 'derived_from_regimen',
          target_unit: 'biscoito',
          calculation_basis: 'kg',
          multiplier: null,
          concentration_value: null,
          concentration_unit: '',
          use_regimen_directly: true,
          follows_primary_regimen: true,
        },
      ],
      regimens: [
        {
          id: crypto.randomUUID(),
          name: 'Controle pressórico',
          species: 'Canina',
          clinical_indication: 'Controle pressórico',
          scenario: '',
          dose_mode: 'by_weight',
          dose_min: 0.5,
          dose_max: null,
          dose_unit: 'mg',
          dose_basis: 'kg',
          concentration_value: null,
          concentration_unit: '',
          administration_unit: 'biscoito',
          frequency_mode: 'interval_hours',
          frequency_min: 24,
          frequency_max: null,
          frequency_text: 'a cada 24 horas',
          duration_mode: 'continuous_until_recheck',
          duration_value: null,
          duration_unit: 'dias',
          duration_text: 'até reavaliação',
          usage_instruction: 'Administrar 1 biscoito a cada 24 horas.',
          tutor_observation: 'Oferecer preferencialmente no mesmo horário todos os dias.',
          internal_note: '',
          pharmacy_note: '',
          pharmacy_strategy: 'dose_base_per_unit',
          is_default: true,
        },
      ],
    }

    const v2Payload = compoundedV2.v2ManipulatedToPersistence(v2)
    const v2Saved = await compoundedRecords.saveCompoundedMedicationBundle({
      clinicId,
      userId,
      medication: v2Payload.medication,
      ingredients: v2Payload.ingredients,
      regimens: v2Payload.regimens,
      allowLocalFallback: false,
    })

    const legacySaved = await compoundedRecords.saveCompoundedMedicationBundle({
      clinicId,
      userId,
      medication: {
        name: legacyName,
        pharmaceutical_form: 'Cápsula',
        description: 'Item legado clinic-only para prova do protocolo.',
        default_route: 'VO',
        species: ['Canina'],
        routes: ['VO'],
        is_controlled: true,
        control_type: 'controlado',
        is_active: true,
        default_quantity_text: '30 cápsulas',
        default_qsp_text: '30 cápsulas',
        default_flavor: '',
        default_vehicle: '',
        default_excipient: 'padrão da forma',
        manipulation_instructions: '',
        notes: '',
        metadata: {},
      },
      ingredients: [
        {
          ingredient_name: 'Trazodona',
          ingredient_role: 'active',
          quantity_value: 50,
          quantity_unit: 'mg',
          per_value: 1,
          per_unit: 'cápsula',
          free_text: '',
          notes: '',
        },
      ],
      regimens: [
        {
          regimen_name: 'Controle comportamental',
          indication: 'Ansiedade',
          dosing_mode: 'fixed_per_patient',
          species: 'Canina',
          route: 'VO',
          fixed_administration_value: 1,
          fixed_administration_unit: 'cápsula',
          frequency_value_min: 12,
          frequency_unit: 'hours',
          frequency_label: 'a cada 12 horas',
          duration_mode: 'fixed_days',
          duration_value: 14,
          duration_unit: 'dias',
          default_prepared_quantity_text: '30 cápsulas',
          default_administration_sig: 'Administrar 1 cápsula a cada 12 horas.',
        },
      ],
      allowLocalFallback: false,
    })

    const v2ProtocolMed = compoundedV2Mapper.mapCompoundedToProtocolMedicationV2({
      bundle: v2Saved,
      sortOrder: 0,
      regimenId: v2Saved.regimens[0]?.id,
    })

    const legacyProtocolMed = {
      item_type: 'compounded',
      medication_id: null,
      compounded_medication_id: legacySaved.medication.id,
      compounded_regimen_id: legacySaved.regimens[0]?.id || null,
      medication_name: legacySaved.medication.name,
      presentation_id: null,
      presentation_text: 'Cápsula • 30 cápsulas',
      manual_medication_name: null,
      manual_presentation_label: 'Cápsula • 30 cápsulas',
      concentration_value: null,
      concentration_unit: null,
      dose_value: 1,
      dose_unit: 'cápsula',
      route: 'VO',
      frequency_type: 'interval_hours',
      times_per_day: null,
      interval_hours: 12,
      duration_days: 14,
      is_controlled: true,
      sort_order: 1,
      metadata: {
        item_kind: 'compounded',
        notes: 'Item legado do protocolo sem payload_v2.',
      },
    }

    const savedProtocol = await protocolsRepo.saveProtocolBundle(clinicId, userId, {
      protocol: {
        name: protocolName,
        description: 'Protocolo com manipulados V2 e legado para prova visual.',
        species: 'Canina',
        duration_summary: null,
        tags: ['manipulado', 'v2'],
        is_control_special: true,
        exams_justification: '',
        metadata: {},
      },
      medications: [v2ProtocolMed, legacyProtocolMed],
      recommendations: [
        { text: 'Reavaliar clinicamente conforme resposta ao tratamento.', sort_order: 0, metadata: {} },
      ],
      examItems: [],
    })

    return {
      protocolId: savedProtocol.id,
      v2MedicationId: v2Saved.medication.id,
      legacyMedicationId: legacySaved.medication.id,
    }
  }, { clinicId: seed.clinicId, userId: seed.userId, benazeprilName, legacyName, protocolName })
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1600, height: 1300 } })
const page = await context.newPage()

try {
  await login(page, '/receituario-vet/protocolos-3')
  await page.waitForURL(/receituario-vet\/protocolos-3/, { timeout: 30000 })
  result.routeLoaded = true
  push('route_loaded')

  const seeded = await seedProtocol(page)
  push('protocol_seeded', seeded)

  await page.goto(`${appUrl}/receituario-vet/protocolos-3`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  await page.locator('input[placeholder*="Buscar protocolo"]').fill(protocolName)
  await page.waitForTimeout(1200)
  await shot(page, 'phase4-protocol-list.png')

  await page.locator('button[title="Editar"]').first().click()
  await page.waitForTimeout(1500)
  result.protocolEditorOpened = await page.getByText(/Medicamentos do protocolo/i).count() > 0 || await page.getByText(/Editar Protocolo/i).count() > 0
  await shot(page, 'phase4-protocol-editor-open.png')

  const editButtons = page.getByRole('button', { name: /Editar no V2/i })
  await editButtons.nth(0).click()
  await page.waitForTimeout(1200)
  result.v2ItemOpened = await page.getByRole('button', { name: /Salvar no protocolo/i }).count() > 0
  await shot(page, 'phase4-protocol-v2-item-open.png')

  const summaryInput = page.locator('label').filter({ hasText: /Resumo curto/i }).first().locator('xpath=..').locator('input').first()
  await summaryInput.fill('Benazepril ajustado no protocolo.')
  await page.getByRole('button', { name: /Salvar no protocolo/i }).click()
  await page.waitForTimeout(1000)

  await editButtons.nth(1).click()
  await page.waitForTimeout(1200)
  const bodyLegacy = await page.locator('body').innerText()
  result.legacyItemOpened = /Salvar no protocolo/i.test(bodyLegacy)
  result.legacyNoticeVisible = /legado.*convertido/i.test(bodyLegacy)
  await shot(page, 'phase4-protocol-legacy-converted.png')
  await page.getByRole('button', { name: /Salvar no protocolo/i }).click()
  await page.waitForTimeout(1000)

  await page.getByRole('button', { name: /^Salvar$/ }).click()
  await page.waitForTimeout(1600)
  result.protocolSaved =
    /receituario-vet\/protocolos-3/.test(page.url()) &&
    (await page.getByRole('button', { name: /Utilizar Protocolo/i }).count()) >= 1
  await shot(page, 'phase4-protocol-saved.png')

  const useProtocolButton = page.getByRole('button', { name: /Utilizar Protocolo/i }).first()
  await useProtocolButton.click()
  await page.waitForURL(/receituario-vet\/nova-receita-2/, { timeout: 30000 })
  await addTutorAndPatient(page)
  await page.waitForTimeout(1500)
  result.appliedToNovaReceita = await page.locator(`input[value="${benazeprilName.replace(/"/g, '\\"')}"]`).count() > 0
  await shot(page, 'phase4-protocol-applied-nova-receita.png')

  await page.getByRole('button', { name: /Revisar/i }).first().click()
  await page.waitForTimeout(2000)
  const reviewText = await page.locator('body').innerText()
  result.reviewCoherent =
    /Administrar 1 biscoito a cada 24/i.test(reviewText) &&
    /Benazepril 2[,.]5 mg/i.test(reviewText) &&
    !/Ãƒ|ï¿½|Ã¢â‚¬Â¢/.test(reviewText)
  await shot(page, 'phase4-protocol-review-final.png')

  result.ok =
    result.routeLoaded &&
    result.protocolEditorOpened &&
    result.v2ItemOpened &&
    result.legacyItemOpened &&
    result.legacyNoticeVisible &&
    result.protocolSaved &&
    result.appliedToNovaReceita &&
    result.reviewCoherent
} catch (error) {
  push('fatal', { message: error instanceof Error ? error.message : String(error) })
  await shot(page, 'phase4-protocol-fatal.png').catch(() => {})
  throw error
} finally {
  fs.writeFileSync(path.join(outDir, 'protocolos-phase4-v2.json'), JSON.stringify(result, null, 2))
  await context.close()
  await browser.close()
}
