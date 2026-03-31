import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const appUrl = 'http://127.0.0.1:4173'
const seed = JSON.parse(fs.readFileSync('C:/PROJETOS VET/Vetius/supabase/.temp/e2e/seed.json', 'utf8'))
const outDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir = path.join(outDir, 'shots')
fs.mkdirSync(shotsDir, { recursive: true })

const now = Date.now()
const name = `Benazepril Biscoito V2 F2 ${now}`
const result = {
  ok: false,
  name,
  itemCreated: false,
  noMojibakeVisible: false,
  reviewCoherent: false,
  cardCoherent: false,
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

async function login(page) {
  await page.goto(`${appUrl}/login?next=%2Freceituario-vet%2Fnova-receita-2`, { waitUntil: 'networkidle' })
  await page.getByLabel(/Email/i).fill(seed.email)
  await page.locator('#login-password').fill(seed.password)
  await page.getByRole('button', { name: /^Entrar$/ }).click()
  await page.waitForURL(/receituario-vet\/nova-receita-2/, { timeout: 30000 })
}

async function addTutorAndPatient(page) {
  await page.locator('input[placeholder="Buscar tutor..."]').first().fill('Tutor E2E')
  await page.getByText('Tutor E2E Manipulados').first().click()
  await page.locator('input[placeholder="Buscar paciente..."]').first().fill('Paciente E2E')
  await page.getByText('Paciente E2E').first().click()
  const weightInput = page.locator('label').filter({ hasText: /Peso \(kg\)/i }).first().locator('xpath=..').locator('input').first()
  await weightInput.fill('5')
}

async function clearReceituarioDrafts(page) {
  await page.evaluate(() => {
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith('rx_draft_v2:') || key === 'receituario-vet:draft:v1' || key === 'receituario-vet:drafts:v1') {
        localStorage.removeItem(key)
      }
    }
    sessionStorage.removeItem('vetius:rx2:review-draft')
  })
}

async function addCompoundedFromModal(page, itemName) {
  await page.getByTestId('nova-receita-add-compounded').click()
  const modal = page.locator('div').filter({ has: page.getByRole('heading', { name: /Adicionar manipulado/i }) }).first()
  await modal.waitFor({ timeout: 30000 })
  await modal.getByTestId('compounded-modal-search').fill(itemName)
  const itemButton = modal.locator('button[data-testid^="compounded-modal-item-"]').filter({ hasText: itemName }).first()
  await itemButton.waitFor({ timeout: 30000 })
  await itemButton.click()
  const confirm = modal.getByTestId('compounded-modal-confirm')
  await confirm.waitFor({ timeout: 30000 })
  await confirm.click()
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1600, height: 1200 } })
const page = await context.newPage()

try {
  await login(page)
  push('login_ok', { email: seed.email })
  await clearReceituarioDrafts(page)

  const created = await page.evaluate(async ({ clinicId, userId, name }) => {
    const [{ saveCompoundedMedicationBundle }, { v2ManipulatedToPersistence }] = await Promise.all([
      import('/src/lib/compoundedRecords.ts'),
      import('/modules/receituario-vet/compoundedV2.ts'),
    ])

    const v2 = {
      formula: {
        id: crypto.randomUUID(),
        clinic_id: clinicId,
        slug: '',
        name,
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
        legacy_source: 'phase2-visual',
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
          usage_instruction: 'Administrar 1 biscoito a cada 24h.',
          tutor_observation: 'Oferecer preferencialmente no mesmo horário todos os dias.',
          internal_note: '',
          pharmacy_note: '',
          pharmacy_strategy: 'dose_base_per_unit',
          is_default: true,
        },
      ],
    }

    const payload = v2ManipulatedToPersistence(v2)
    const saved = await saveCompoundedMedicationBundle({
      clinicId,
      userId,
      medication: payload.medication,
      ingredients: payload.ingredients,
      regimens: payload.regimens,
      allowLocalFallback: false,
    })

    return {
      id: saved.medication.id,
      name: saved.medication.name,
      metadataHasV2: !!saved.medication.metadata?.payload_v2,
    }
  }, { clinicId: seed.clinicId, userId: seed.userId, name })

  result.itemCreated = !!created?.id
  push('item_created', created)

  await page.goto(`${appUrl}/receituario-vet/nova-receita-2`, { waitUntil: 'networkidle' })
  await clearReceituarioDrafts(page)
  await page.reload({ waitUntil: 'networkidle' })
  await addTutorAndPatient(page)
  await addCompoundedFromModal(page, name)

  const card = page.locator('div').filter({ has: page.locator(`input[value="${name.replace(/"/g, '\\"')}"]`) }).first()
  await card.waitFor({ timeout: 30000 })
  await shot(page, 'phase2-visual-nova-receita-benazepril.png')

  const cardText = await card.innerText()
  result.cardCoherent =
    /2[,.]5\s*mg/i.test(cardText) &&
    /1\s*biscoito/i.test(cardText) &&
    /a cada 24 horas/i.test(cardText)
  push('card_checked', { ok: result.cardCoherent, excerpt: cardText.slice(0, 800) })

  await page.getByRole('button', { name: /Revisar/i }).first().click()
  await page.waitForTimeout(2000)
  await shot(page, 'phase2-visual-review-benazepril.png')
  const reviewText = await page.locator('body').innerText()
  const benazeprilBlockMatch = reviewText.match(new RegExp(`1\\. ${name.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}[\\s\\S]*?(?=Sem assinatura CRMV|Assinatura CRMV|$)`))
  const benazeprilBlock = benazeprilBlockMatch?.[0] || reviewText
  result.reviewCoherent =
    /Administrar 1 biscoito a cada 24h/i.test(reviewText) &&
    /Benazepril 2[,.]5 mg por 1 biscoito/i.test(reviewText)
  result.noMojibakeVisible = !/Ã|�|â€¢/.test(benazeprilBlock)
  push('mojibake_checked', { ok: result.noMojibakeVisible })
  push('review_checked', { ok: result.reviewCoherent, excerpt: benazeprilBlock.slice(0, 1200) })

  result.ok = result.itemCreated && result.cardCoherent && result.reviewCoherent && result.noMojibakeVisible
} catch (error) {
  push('fatal', { message: error instanceof Error ? error.message : String(error) })
  await shot(page, 'phase2-visual-fatal.png').catch(() => {})
  throw error
} finally {
  fs.writeFileSync(path.join(outDir, 'manipulados-phase2-visual.json'), JSON.stringify(result, null, 2))
  await context.close()
  await browser.close()
}
