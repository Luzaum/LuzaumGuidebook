import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const appUrl = 'http://127.0.0.1:5173'
const baseDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir = path.join(baseDir, 'shots')
const downloadsDir = path.join(baseDir, 'downloads')
const seed = JSON.parse(fs.readFileSync(path.join(baseDir, 'seed.json'), 'utf8'))
const resultFile = path.join(baseDir, 'manipulados-v1-runtime-cut.json')
fs.mkdirSync(shotsDir, { recursive: true })
fs.mkdirSync(downloadsDir, { recursive: true })

const now = Date.now()
const formulaName = `Petisco de Benazepril V1 ${now}`
const protocolName = `Protocolo V1 Runtime ${now}`
const formulaText = [
  formulaName,
  'Benazepril 5 mg/kg/dose',
  'Petisco q.s.p. 30 unidades',
  'Controle pressórico em cães.',
  'Administrar 1 petisco a cada 12 horas por 14 dias.',
].join('\n')

const result = {
  ok: false,
  formulaName,
  protocolName,
  routeLoaded: false,
  manipuladoCreated: false,
  catalogV1Visible: false,
  importedIntoNovaReceita: false,
  weightBasedVisible: false,
  reviewVisible: false,
  pdfExported: false,
  importedIntoProtocolos: false,
  protocolReopened: false,
  protocolApplied: false,
  previewReviewPdfOk: false,
  legacySource: {
    remoteTable: true,
    localFallback: true,
    seed: false,
    otherScope: false,
    mixed: true,
  },
  log: [],
}

function push(step, data = {}) {
  result.log.push({ step, time: new Date().toISOString(), ...data })
}

async function shot(page, name) {
  const file = path.join(shotsDir, name)
  await page.screenshot({ path: file, fullPage: true })
  push('shot', { file })
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

async function createProtocolFromV1(page) {
  return await page.evaluate(async ({ clinicId, userId, protocolName, formulaName }) => {
    const [{ listManipuladosV1 }, { saveProtocolBundle }, { mapManipuladoV1ToProtocolMedication }] = await Promise.all([
      import('/src/lib/manipuladosV1Records.ts'),
      import('/src/lib/protocols/protocolsRepo.ts'),
      import('/modules/receituario-vet/manipuladosV1Mapper.ts'),
    ])

    const rows = await listManipuladosV1(clinicId)
    const row = rows.find((entry) => entry.name === formulaName)
    if (!row) throw new Error('Fórmula V1 não encontrada para o protocolo.')
    const formula = row.payload
    const protocolMedication = mapManipuladoV1ToProtocolMedication({
      formula,
      sortOrder: 0,
    })

    const protocol = await saveProtocolBundle(clinicId, userId, {
      protocol: {
        name: protocolName,
        description: 'Protocolo V1 para prova do corte do runtime.',
        species: 'Canina',
        duration_summary: '14 dias',
        tags: ['manipulado', 'v1'],
        is_control_special: false,
        exams_justification: '',
        metadata: {
          runtime_source: 'manipulados_v1',
        },
      },
      medications: [protocolMedication],
      recommendations: [],
      recommendations_text: '',
      exams: [],
      notes: '',
      metadata: {
        runtime_source: 'manipulados_v1',
      },
    })

    return { id: protocol.id, name: protocol.name }
  }, {
    clinicId: seed.clinicId,
    userId: seed.userId,
    protocolName,
    formulaName,
  })
}

async function createFormulaInRuntime(page) {
  return await page.evaluate(async ({ clinicId, userId, formulaName }) => {
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
        name: formulaName,
        slug: formulaName,
        pharmaceutical_form: 'Petisco',
        primary_route: 'ORAL',
        species_scope: 'cao',
        indication_summary: 'Controle pressórico em cães.',
        description: 'Fórmula V1 criada para prova do runtime.',
      },
      prescribing: {
        ...base.prescribing,
        posology_mode: 'mg_per_kg_dose',
        dose_min: 5,
        dose_unit: 'mg',
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
          min_quantity: null,
          max_quantity: null,
          weight_range_text: '',
        },
      ],
    })

    const saved = await saveManipuladoV1(formula, userId)
    return saved.identity.id
  }, { clinicId: seed.clinicId, userId: seed.userId, formulaName })
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1600, height: 1200 }, acceptDownloads: true })
const page = await context.newPage()
let pdfTarget = ''

try {
  await login(page, '/receituario-vet/manipulados')
  await page.waitForURL(/receituario-vet\/manipulados/, { timeout: 30000 })
  result.routeLoaded = true
  push('route_loaded')

  await createFormulaInRuntime(page)
  await page.reload({ waitUntil: 'networkidle' })
  await page.getByRole('button').filter({ hasText: formulaName }).first().click()
  await page.locator(`input[value="${formulaName}"]`).first().waitFor({ timeout: 30000 })
  const descriptionInput = page.locator('label').filter({ hasText: /Descri/i }).first().locator('xpath=..').locator('input').first()
  await descriptionInput.fill('Fórmula V1 criada e editada pela UI.')
  await page.getByRole('button', { name: /Salvar fórmula|Salvar formula/i }).last().click({ force: true })
  await page.getByText(/salvo no catálogo|salvo no cat[aá]logo/i).first().waitFor({ timeout: 30000 })
  result.manipuladoCreated = true
  result.catalogV1Visible = true
  push('manipulado_v1_created', { formulaName })
  await shot(page, 'v1-runtime-cut-01-manipulados-page.png')

  await page.reload({ waitUntil: 'networkidle' })
  await page.getByRole('button').filter({ hasText: formulaName }).first().click()
  await page.locator(`input[value="${formulaName}"]`).first().waitFor({ timeout: 30000 })
  push('manipulado_reopened')
  await shot(page, 'v1-runtime-cut-02-manipulados-reopen.png')

  await page.goto(`${appUrl}/receituario-vet/nova-receita-2`, { waitUntil: 'networkidle' })
  await ensureTutorAndPatient(page)
  await page.getByTestId('nova-receita-add-compounded').click()
  await page.getByTestId('compounded-modal-search').fill(formulaName)
  await page.locator('button').filter({ hasText: formulaName }).first().click()
  await page.getByTestId('compounded-modal-confirm').click()
  await page.locator(`input[value="${formulaName}"]`).first().waitFor({ timeout: 30000 })
  result.importedIntoNovaReceita = true
  push('nova_receita_import_ok')

  await page.getByText(/25 mg/i).first().waitFor({ timeout: 30000 })
  result.weightBasedVisible = true
  push('weight_based_visible', { expected: '25 mg' })
  await shot(page, 'v1-runtime-cut-03-nova-receita.png')

  await page.getByRole('button', { name: /Revisar/i }).first().click()
  await page.getByText(formulaName).first().waitFor({ timeout: 30000 })
  result.reviewVisible = true
  push('review_visible')
  await shot(page, 'v1-runtime-cut-04-review.png')

  const downloadPromise = page.waitForEvent('download', { timeout: 60000 })
  await page.getByRole('button', { name: /Exportar PDF/i }).click()
  const download = await downloadPromise
  pdfTarget = path.join(downloadsDir, download.suggestedFilename() || `manipulados-v1-runtime-cut-${now}.pdf`)
  await download.saveAs(pdfTarget)
  result.pdfExported = true
  result.previewReviewPdfOk = true
  push('pdf_exported', { pdfTarget })

  await createProtocolFromV1(page)
  await page.goto(`${appUrl}/receituario-vet/protocolos-3`, { waitUntil: 'networkidle' })
  await page.locator('input[type="search"]').first().fill(protocolName)
  const protocolCard = page.locator(`xpath=//*[contains(normalize-space(.), "${protocolName}")]`).first()
  await protocolCard.waitFor({ timeout: 30000 })
  await shot(page, 'v1-runtime-cut-05-protocol-list.png')
  const editButton = protocolCard.locator('xpath=ancestor::*[self::div or self::article][1]//button[@title="Editar"]').first()
  if (await editButton.count()) {
    await editButton.click()
  } else {
    await page.getByTitle('Editar').first().click()
  }
  await page.getByText(/Editar protocolo|Editar Protocolo/i).first().waitFor({ timeout: 30000 })
  await page.getByRole('button', { name: /Editar no V1.0/i }).first().click()
  await page.getByText(/Manipulados V1.0/i).first().waitFor({ timeout: 30000 })
  result.importedIntoProtocolos = true
  result.protocolReopened = true
  push('protocol_v1_editor_open')
  await shot(page, 'v1-runtime-cut-06-protocol-editor.png')

  await page.getByRole('button', { name: /Salvar fórmula|Salvar formula/i }).click()
  await page.getByRole('button', { name: /Fechar/i }).click()
  await page.getByRole('button', { name: /^Salvar$/i }).click()
  await page.waitForTimeout(1500)
  push('protocol_saved')

  const useProtocolButton = page.getByRole('button', { name: /Utilizar protocolo|Utilizar Protocolo/i }).first()
  await useProtocolButton.click()
  await page.waitForURL(/receituario-vet\/nova-receita-2/, { timeout: 30000 })
  await ensureTutorAndPatient(page)
  await page.locator(`input[value="${formulaName}"]`).first().waitFor({ timeout: 30000 })
  result.protocolApplied = true
  push('protocol_applied')
  await shot(page, 'v1-runtime-cut-07-protocol-applied.png')

  result.ok = true
  fs.writeFileSync(resultFile, JSON.stringify({ ...result, pdfTarget }, null, 2))
} catch (error) {
  push('fatal', { message: error instanceof Error ? error.message : String(error) })
  await shot(page, 'v1-runtime-cut-fatal.png').catch(() => {})
  fs.writeFileSync(resultFile, JSON.stringify({ ...result, pdfTarget }, null, 2))
  throw error
} finally {
  await context.close()
  await browser.close()
}
