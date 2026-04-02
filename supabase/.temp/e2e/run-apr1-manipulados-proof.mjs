import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const appUrl = 'http://127.0.0.1:5173'
const baseDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir = path.join(baseDir, 'shots')
fs.mkdirSync(shotsDir, { recursive: true })
const seed = JSON.parse(fs.readFileSync(path.join(baseDir, 'seed.json'), 'utf8'))
const now = Date.now()
const formulaName = `Petisco Espaço V1 ${now}`
const rangeFormulaName = `Petisco Faixa V1 ${now}`
const protocolFormulaName = `${rangeFormulaName} Protocolo`
const protocolName = `Protocolo Instancia V1 ${now}`
const result = {
  ok: false,
  routeLoaded: false,
  inputTypingOk: false,
  inputDeleteOk: false,
  inputPasteOk: false,
  reopenOk: false,
  manipuladoImported: false,
  targetDosePersisted: false,
  previewReactive: false,
  reviewReactive: false,
  protocolInstanceIsolated: false,
  protocolCheck: null,
  mojibakeVisible: false,
  shots: [],
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

async function ensureTutorAndPatient(page) {
  await page.locator('input[placeholder="Buscar tutor..."]').first().fill('Tutor E2E')
  await page.getByText('Tutor E2E Manipulados').first().click()
  await page.locator('input[placeholder="Buscar paciente..."]').first().fill('Paciente E2E')
  await page.getByText('Paciente E2E').first().click()
  const weightInput = page.locator('label').filter({ hasText: /Peso \(kg\)/i }).first().locator('xpath=..').locator('input').first()
  await weightInput.fill('5')
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1680, height: 1280 }, acceptDownloads: true })
const page = await context.newPage()

try {
  await login(page, '/receituario-vet/manipulados')
  await page.waitForURL(/receituario-vet\/manipulados/, { timeout: 30000 })
  result.routeLoaded = true

  await page.getByText(/Nova fórmula|Nova formula/i).first().click()

  const nameInput = page.locator('input[placeholder*="Aciclovir"]').first()
  await nameInput.fill(formulaName)
  await nameInput.press('ArrowLeft')
  await nameInput.type(' teste', { delay: 10 })
  await nameInput.press('Control+A')
  await nameInput.fill(formulaName)
  result.inputTypingOk = (await nameInput.inputValue()) === formulaName

  const descriptionInput = page.locator('input[placeholder*="Informação adicional"], input[placeholder*="Informacao adicional"]').first()
  await descriptionInput.fill('Linha 1 com espaço normal')
  await descriptionInput.press('Control+A')
  await descriptionInput.press('Backspace')
  result.inputDeleteOk = (await descriptionInput.inputValue()) === ''
  await descriptionInput.fill('Linha colada com espaços no meio')
  result.inputPasteOk = (await descriptionInput.inputValue()) === 'Linha colada com espaços no meio'

  await page.locator('input[placeholder="Ex.: 5"]').first().fill('5')
  await page.locator('input[placeholder*="60 g"], input[placeholder*="30 unidades"]').first().fill('30 unidades')

  await page.getByRole('button', { name: /Salvar manipulado|Salvar fórmula|Salvar formula/i }).first().click()
  await page.waitForTimeout(1200)
  await shot(page, 'apr1-manipulados-editor-saved.png')

  await page.reload({ waitUntil: 'networkidle' })
  const bodyText = await page.locator('body').innerText()
  result.reopenOk = bodyText.includes(formulaName)
  result.mojibakeVisible = /Cat\?logo|\? receita|Medicamento do Cat\?logo|adicione \? receita|�/.test(bodyText)
  await shot(page, 'apr1-manipulados-reopen.png')

  await page.evaluate(async ({ clinicId, userId, rangeFormulaName }) => {
    const [{ createEmptyManipuladoV1, normalizeManipuladoV1 }, { saveManipuladoV1 }] = await Promise.all([
      import('/modules/receituario-vet/manipuladosV1.ts'),
      import('/src/lib/manipuladosV1Records.ts'),
    ])
    const base = createEmptyManipuladoV1(clinicId)
    const formula = normalizeManipuladoV1({
      ...base,
      identity: {
        ...base.identity,
        clinic_id: clinicId,
        name: rangeFormulaName,
        slug: rangeFormulaName,
        pharmaceutical_form: 'Petisco',
        primary_route: 'ORAL',
        species_scope: 'cao',
        indication_summary: 'Controle pressórico.',
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
      ingredients: [{
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
      }],
    })
    await saveManipuladoV1(formula, userId)
  }, { clinicId: seed.clinicId, userId: seed.userId, rangeFormulaName })

  await page.goto(`${appUrl}/receituario-vet/nova-receita-2`, { waitUntil: 'networkidle' })
  await ensureTutorAndPatient(page)
  await page.getByRole('button', { name: /\+ Manipulado/i }).click()
  await page.locator('[data-testid="compounded-modal-search"]').fill(rangeFormulaName)
  await page.getByRole('button').filter({ hasText: rangeFormulaName }).first().click()
  const targetDoseInput = page.locator('input[type="number"]').last()
  await targetDoseInput.fill('7.5')
  await shot(page, 'apr1-manipulados-modal-dose-range.png')
  await page.locator('[data-testid="compounded-modal-confirm"]').click()
  await page.waitForTimeout(1000)
  result.manipuladoImported = (await page.locator('body').innerText()).includes(rangeFormulaName)

  const storedDraft = await page.evaluate((clinicId) => {
    const raw = localStorage.getItem(`rx_draft_v2:${clinicId}`)
    return raw ? JSON.parse(raw) : null
  }, seed.clinicId)
  const compoundedItem = (storedDraft?.items || []).find((item) => item?.name === rangeFormulaName)
  result.targetDosePersisted = Number(compoundedItem?.presentation_metadata?.target_dose) === 7.5

  const tutorObs = `Tutor ao vivo ${now}`
  const pharmObs = `Farmacia ao vivo ${now}`
  const tutorField = page.locator('textarea[placeholder*="usar luvas"], textarea[placeholder*="orientação"], textarea[placeholder*="orientacao"]').first()
  const pharmacyField = page.locator('textarea[placeholder*="manipulação"], textarea[placeholder*="manipulacao"], textarea[placeholder*="Detalhes adicionais"]').first()
  await tutorField.fill(tutorObs)
  await pharmacyField.fill(pharmObs)
  await page.waitForTimeout(900)
  const liveText = await page.locator('body').innerText()
  result.previewReactive = liveText.includes(tutorObs) && liveText.includes(pharmObs)
  await shot(page, 'apr1-manipulados-nova-receita-live.png')

  await page.getByRole('button', { name: /Revisar/i }).first().click()
  await page.waitForTimeout(1200)
  const reviewText = await page.locator('body').innerText()
  result.reviewReactive = reviewText.includes(tutorObs) && reviewText.includes(pharmObs)
  await shot(page, 'apr1-manipulados-review.png')

  await page.goto(`${appUrl}/receituario-vet/protocolos-3`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  await page.getByRole('button', { name: /\+ Novo Protocolo/i }).click()
  await page.locator('input[placeholder*="Dermatite"]').first().fill(protocolName)
  await page.getByRole('button', { name: /^\+ Adicionar$/i }).first().click()
  const searchInput = page.getByPlaceholder(/Nome do/i).first()
  await searchInput.fill(rangeFormulaName)
  await page.waitForTimeout(1200)
  await page.getByRole('button').filter({ hasText: rangeFormulaName }).first().click()
  await page.getByRole('button', { name: /Adicionar manipulado/i }).first().click()
  await page.getByRole('button', { name: /Editar fórmula completa \(V1\.0\)|Editar formula completa \(V1\.0\)|Editar no V1\.0/i }).first().click()
  const protName = page.locator('input[placeholder*="Aciclovir"]').first()
  await protName.fill(protocolFormulaName)
  await page.getByRole('button', { name: /Salvar no protocolo/i }).first().click()
  await page.getByRole('button', { name: /Editar fórmula completa \(V1\.0\)|Editar formula completa \(V1\.0\)|Editar no V1\.0/i }).first().waitFor({ timeout: 30000 })
  await page.waitForTimeout(1200)
  await page.getByRole('button', { name: /^Salvar$/i }).last().click()
  await page.getByText(protocolName).first().waitFor({ timeout: 30000 })
  await page.waitForTimeout(1200)

  const filteredBody = await page.locator('body').innerText()
  const protocolListed = filteredBody.includes(protocolName)
  if (!protocolListed) {
    throw new Error(`Protocolo salvo não apareceu na lista: ${protocolName}`)
  }
  const clickedEdit = await page.evaluate((targetName) => {
    const textNodes = Array.from(document.querySelectorAll('body *')).filter((node) =>
      (node.textContent || '').trim() === targetName
    )
    for (const node of textNodes) {
      let current = node
      for (let depth = 0; depth < 6 && current; depth += 1) {
        const button = Array.from(current.querySelectorAll('button')).find((entry) =>
          /edit/i.test((entry.textContent || '').trim())
        )
        if (button) {
          button.click()
          return true
        }
        current = current.parentElement
      }
    }
    return false
  }, protocolName)
  if (!clickedEdit) {
    throw new Error(`Não foi possível abrir o protocolo salvo: ${protocolName}`)
  }
  await page.waitForTimeout(1200)
  await page.getByRole('button', { name: /Editar fÃ³rmula completa \(V1\.0\)|Editar formula completa \(V1\.0\)|Editar no V1\.0/i }).first().click()
  const reopenedProtocolName = await page.locator('input[placeholder*="Aciclovir"]').first().inputValue()
  await page.locator('button').filter({ hasText: /^close$/i }).first().click().catch(() => {})
  await shot(page, 'apr1-manipulados-protocolo.png')

  await page.goto(`${appUrl}/receituario-vet/manipulados`, { waitUntil: 'networkidle' })
  await page.locator('input[placeholder*="Buscar"], input[placeholder*="Filtrar"]').first().fill(rangeFormulaName).catch(() => {})
  await page.waitForTimeout(900)
  const catalogBody = await page.locator('body').innerText()
  const catalogStillOriginal = catalogBody.includes(rangeFormulaName) && !catalogBody.includes(protocolFormulaName)
  const protocolCheck = {
    catalogName: catalogStillOriginal ? rangeFormulaName : '',
    protocolName: reopenedProtocolName || '',
    protocolListed,
  }
  result.protocolCheck = protocolCheck
  result.protocolInstanceIsolated =
    protocolListed &&
    reopenedProtocolName === protocolFormulaName &&
    catalogStillOriginal

  result.ok =
    result.routeLoaded &&
    result.inputTypingOk &&
    result.inputDeleteOk &&
    result.inputPasteOk &&
    result.reopenOk &&
    result.manipuladoImported &&
    result.targetDosePersisted &&
    result.previewReactive &&
    result.reviewReactive &&
    result.protocolInstanceIsolated &&
    !result.mojibakeVisible
} catch (error) {
  result.error = error instanceof Error ? error.message : String(error)
  await shot(page, 'apr1-manipulados-fatal.png').catch(() => {})
} finally {
  fs.writeFileSync(path.join(baseDir, 'apr1-manipulados-proof.json'), JSON.stringify(result, null, 2))
  await context.close()
  await browser.close()
}

console.log(JSON.stringify(result, null, 2))
