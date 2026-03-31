import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const appUrl = 'http://127.0.0.1:4173'
const seed = JSON.parse(fs.readFileSync('C:/PROJETOS VET/Vetius/supabase/.temp/e2e/seed.json', 'utf8'))
const outDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir = path.join(outDir, 'shots')
fs.mkdirSync(shotsDir, { recursive: true })

const now = Date.now()
const v2Name = `Manipulado V2 Page ${now}`
const legacyName = `Manipulado Legado Page ${now}`
const editedLegacyName = `${legacyName} Editado`

const result = {
  ok: false,
  v2Name,
  legacyName,
  editedLegacyName,
  routeLoaded: false,
  v2Opened: false,
  legacyOpened: false,
  legacyNoticeVisible: false,
  saveWorked: false,
  reopenedWorked: false,
  importWorked: false,
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

async function createItems(page) {
  return await page.evaluate(async ({ clinicId, userId, v2Name, legacyName }) => {
    const [{ saveCompoundedMedicationBundle }, { v2ManipulatedToPersistence }] = await Promise.all([
      import('/src/lib/compoundedRecords.ts'),
      import('/modules/receituario-vet/compoundedV2.ts'),
    ])

    const v2 = {
      formula: {
        id: crypto.randomUUID(),
        clinic_id: clinicId,
        slug: '',
        name: v2Name,
        pharmaceutical_form: 'Biscoito medicamentoso',
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
        short_description: 'Item V2 para prova visual da página.',
        active_principles_summary: 'Benazepril',
        qsp_text: '30 unidades',
        total_quantity_text: '30 biscoitos',
        vehicle: '',
        flavor: 'bacon',
        excipient_base: '',
        ui_version: 2,
        legacy_source: 'phase3-proof',
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
          name: 'Regime padrão',
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
          duration_mode: 'fixed',
          duration_value: 30,
          duration_unit: 'dias',
          duration_text: 'por 30 dias',
          usage_instruction: 'Administrar 1 biscoito a cada 24 horas.',
          tutor_observation: 'Oferecer preferencialmente no mesmo horário.',
          internal_note: '',
          pharmacy_note: '',
          pharmacy_strategy: 'dose_base_per_unit',
          is_default: true,
        },
      ],
    }

    const v2Payload = v2ManipulatedToPersistence(v2)
    const v2Saved = await saveCompoundedMedicationBundle({
      clinicId,
      userId,
      medication: v2Payload.medication,
      ingredients: v2Payload.ingredients,
      regimens: v2Payload.regimens,
      allowLocalFallback: false,
    })

    const legacySaved = await saveCompoundedMedicationBundle({
      clinicId,
      userId,
      medication: {
        name: legacyName,
        pharmaceutical_form: 'Cápsula',
        description: 'Item legado sem payload_v2.',
        default_route: 'VO',
        species: ['Canina'],
        routes: ['VO'],
        is_controlled: false,
        control_type: null,
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
          ingredient_name: 'Benazepril',
          ingredient_role: 'active',
          quantity_value: 5,
          quantity_unit: 'mg',
          per_value: 1,
          per_unit: 'cápsula',
          free_text: '',
          notes: '',
        },
      ],
      regimens: [
        {
          regimen_name: 'Legado VO',
          indication: 'Controle clínico',
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

    return {
      v2Id: v2Saved.medication.id,
      legacyId: legacySaved.medication.id,
    }
  }, { clinicId: seed.clinicId, userId: seed.userId, v2Name, legacyName })
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1600, height: 1400 } })
const page = await context.newPage()

try {
  await login(page, '/receituario-vet/manipulados')
  await page.waitForURL(/receituario-vet\/manipulados/, { timeout: 30000 })
  result.routeLoaded = true
  push('route_loaded')

  const created = await createItems(page)
  push('items_created', created)

  await page.goto(`${appUrl}/receituario-vet/manipulados`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  await shot(page, 'phase3-v2-list.png')

  await page.getByRole('button', { name: new RegExp(v2Name, 'i') }).click()
  await page.waitForTimeout(800)
  result.v2Opened = await page.locator(`input[value="${v2Name}"]`).count() > 0
  await shot(page, 'phase3-v2-editor-open.png')

  await page.getByRole('button', { name: new RegExp(legacyName, 'i') }).click()
  await page.waitForTimeout(800)
  result.legacyOpened = await page.locator(`input[value="${legacyName}"]`).count() > 0
  result.legacyNoticeVisible = /legado convertido/i.test(await page.locator('body').innerText())
  await shot(page, 'phase3-v2-legacy-converted.png')

  const nameInput = page.locator(`input[value="${legacyName}"]`).first()
  await nameInput.fill(editedLegacyName)
  await page.getByRole('button', { name: /Salvar catálogo/i }).click()
  await page.waitForTimeout(1600)
  const bodyAfterSave = await page.locator('body').innerText()
  result.saveWorked =
    /salvo/i.test(bodyAfterSave) ||
    await page.locator(`input[value="${editedLegacyName}"]`).count() > 0 ||
    await page.getByRole('button', { name: new RegExp(editedLegacyName, 'i') }).count() > 0
  await shot(page, 'phase3-v2-save-reopen.png')

  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)
  await page.locator('input[placeholder*="Nome, forma farmacêutica"]').fill(editedLegacyName)
  await page.waitForTimeout(800)
  await page.getByRole('button', { name: new RegExp(editedLegacyName, 'i') }).click()
  await page.waitForTimeout(800)
  result.reopenedWorked = await page.locator(`input[value="${editedLegacyName}"]`).count() > 0

  await page.goto(`${appUrl}/receituario-vet/nova-receita-2`, { waitUntil: 'networkidle' })
  await addTutorAndPatient(page)
  await page.getByTestId('nova-receita-add-compounded').click()
  const searchInput = page.getByTestId('compounded-modal-search')
  await searchInput.fill(editedLegacyName)
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: new RegExp(editedLegacyName, 'i') }).click()
  await page.getByTestId('compounded-modal-confirm').click()
  await page.waitForTimeout(1200)
  result.importWorked = /Administrar 1 cápsula a cada 12 horas/i.test(await page.locator('body').innerText())
  await shot(page, 'phase3-v2-import-nova-receita.png')

  result.ok =
    result.routeLoaded &&
    result.v2Opened &&
    result.legacyOpened &&
    result.legacyNoticeVisible &&
    result.saveWorked &&
    result.reopenedWorked &&
    result.importWorked
} catch (error) {
  push('fatal', { message: error instanceof Error ? error.message : String(error) })
  await shot(page, 'phase3-v2-fatal.png').catch(() => {})
  throw error
} finally {
  fs.writeFileSync(path.join(outDir, 'manipulados-phase3-v2-page.json'), JSON.stringify(result, null, 2))
  await context.close()
  await browser.close()
}
