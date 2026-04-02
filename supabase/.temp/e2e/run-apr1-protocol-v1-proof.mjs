import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const appUrl = 'http://127.0.0.1:5173'
const baseDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir = path.join(baseDir, 'shots')
fs.mkdirSync(shotsDir, { recursive: true })
const seed = JSON.parse(fs.readFileSync(path.join(baseDir, 'seed.json'), 'utf8'))
const now = Date.now()
const formulaName = `PROTO FORM V1 ${now}`
const protocolFormulaName = `${formulaName} INST`
const protocolName = `PROTOCOLO V1 ${now}`

const result = {
  ok: false,
  protocolSaved: false,
  protocolReopenedInV1: false,
  catalogUnchanged: false,
  shots: [],
  error: '',
}

async function shot(page, name) {
  const file = path.join(shotsDir, name)
  await page.screenshot({ path: file, fullPage: true })
  result.shots.push(file)
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1680, height: 1280 } })
const page = await context.newPage()

try {
  await page.goto(`${appUrl}/login?next=${encodeURIComponent('/receituario-vet/protocolos-3')}`, { waitUntil: 'networkidle' })
  await page.getByLabel(/Email/i).fill(seed.email)
  await page.locator('#login-password').fill(seed.password)
  await page.getByRole('button', { name: /^Entrar$/ }).click()
  await page.waitForURL(/receituario-vet\/protocolos-3/, { timeout: 30000 })

  await page.evaluate(async ({ clinicId, userId, formulaName }) => {
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
      },
      prescribing: {
        ...base.prescribing,
        posology_mode: 'fixed_per_animal',
        dose_min: 1,
        dose_max: 1,
        dose_unit: 'dose',
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
      },
      ingredients: [{
        id: crypto.randomUUID(),
        name: 'Benazepril',
        quantity: 10,
        unit: 'mg',
        role: 'active',
        rule: 'fixed',
        note: '',
      }],
    })
    await saveManipuladoV1(formula, userId)
  }, { clinicId: seed.clinicId, userId: seed.userId, formulaName })

  await page.getByRole('button', { name: /\+ Novo Protocolo/i }).click()
  await page.locator('input[placeholder*="Dermatite"]').first().fill(protocolName)
  await page.getByRole('button', { name: /^\+ Adicionar$/i }).first().click()
  await page.getByPlaceholder(/Nome do/i).first().fill(formulaName)
  await page.waitForTimeout(1200)
  await page.getByRole('button').filter({ hasText: formulaName }).first().click()
  await page.getByRole('button', { name: /Adicionar manipulado/i }).first().click()
  await page.getByRole('button', { name: /Editar f[óo]rmula completa|Editar formula completa|Editar no V1/i }).first().click()
  await page.locator('input[placeholder*="Aciclovir"]').first().fill(protocolFormulaName)
  await page.getByRole('button', { name: /Salvar no protocolo/i }).first().click()
  await page.getByRole('button', { name: /^Salvar$/i }).last().click()
  await page.getByText(protocolName).first().waitFor({ timeout: 30000 })
  result.protocolSaved = true
  await shot(page, 'apr1-protocol-v1-saved.png')

  const clickedEdit = await page.evaluate((targetName) => {
    const textNodes = Array.from(document.querySelectorAll('body *')).filter(
      (node) => (node.textContent || '').trim() === targetName
    )
    for (const node of textNodes) {
      let current = node
      for (let depth = 0; depth < 7 && current; depth += 1) {
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
    throw new Error(`Não foi possível reabrir o protocolo salvo: ${protocolName}`)
  }

  await page.getByRole('button', { name: /Editar f[óo]rmula completa|Editar formula completa|Editar no V1/i }).first().waitFor({ timeout: 30000 })
  await page.getByRole('button', { name: /Editar f[óo]rmula completa|Editar formula completa|Editar no V1/i }).first().click()
  const reopenedName = await page.locator('input[placeholder*="Aciclovir"]').first().inputValue()
  result.protocolReopenedInV1 = reopenedName === protocolFormulaName
  await shot(page, 'apr1-protocol-v1-reopened.png')

  await page.goto(`${appUrl}/receituario-vet/manipulados`, { waitUntil: 'networkidle' })
  const bodyText = await page.locator('body').innerText()
  result.catalogUnchanged = bodyText.includes(formulaName) && !bodyText.includes(protocolFormulaName)
  await shot(page, 'apr1-protocol-v1-catalog-check.png')

  result.ok = result.protocolSaved && result.protocolReopenedInV1 && result.catalogUnchanged
} catch (error) {
  result.error = error instanceof Error ? error.message : String(error)
  await shot(page, 'apr1-protocol-v1-fatal.png').catch(() => {})
} finally {
  fs.writeFileSync(path.join(baseDir, 'apr1-protocol-v1-proof.json'), JSON.stringify(result, null, 2))
  await context.close()
  await browser.close()
}

console.log(JSON.stringify(result, null, 2))
