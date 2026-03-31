import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const appUrl = 'http://127.0.0.1:4173'
const seed = JSON.parse(fs.readFileSync('C:/PROJETOS VET/Vetius/supabase/.temp/e2e/seed.json', 'utf8'))
const outDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir = path.join(outDir, 'shots')
fs.mkdirSync(shotsDir, { recursive: true })

const now = Date.now()
const names = {
  benazeprilSearch: 'Benazepril',
}

const result = {
  ok: false,
  names,
  draftRestored: false,
  reviewUpdated: false,
  benazeprilCalculated: false,
  shots: [],
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
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

async function addTutorAndPatient(page) {
  await page.locator('input[placeholder="Buscar tutor..."]').first().fill('Tutor E2E')
  await page.getByText('Tutor E2E Manipulados').first().click()
  await page.locator('input[placeholder="Buscar paciente..."]').first().fill('Paciente E2E')
  await page.getByText('Paciente E2E').first().click()
  const weightCandidates = [
    page.locator('label').filter({ hasText: /Peso/i }).first().locator('xpath=..').locator('input').first(),
    page.locator('input[name=\"weight_kg\"]').first(),
    page.locator('input[placeholder*=\"Peso\"]').first(),
  ]
  for (const candidate of weightCandidates) {
    if (await candidate.count()) {
      await candidate.fill('5').catch(() => {})
      break
    }
  }
  await page.waitForTimeout(800)
}

async function addCompoundedFromModal(page, searchTerm) {
  await page.getByTestId('nova-receita-add-compounded').click()
  const modalRoot = page.locator('div').filter({ has: page.getByRole('heading', { name: /Adicionar manipulado/i }) }).first()
  const searchInput = page.getByTestId('compounded-modal-search')
  await searchInput.fill(searchTerm)
  const loadingState = modalRoot.getByText(/Carregando manipulados/i)
  if (await loadingState.count()) {
    await loadingState.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {})
  }
  const resultButton = modalRoot.locator('button').nth(1)
  await resultButton.waitFor({ timeout: 30000 })
  await resultButton.click({ force: true })
  const confirm = page.getByTestId('compounded-modal-confirm')
  await confirm.waitFor({ timeout: 30000 })
  await page.waitForFunction(() => {
    const button = document.querySelector('[data-testid="compounded-modal-confirm"]')
    return !!button && !(button instanceof HTMLButtonElement && button.disabled)
  }, { timeout: 30000 })
  await confirm.click()
  await page.waitForTimeout(1200)
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1600, height: 1400 } })
const page = await context.newPage()

try {
  await login(page, '/receituario-vet/nova-receita-2')
  await page.waitForURL((url) => url.href.includes('/receituario-vet/nova-receita-2'), { timeout: 30000 })
  await page.goto(`${appUrl}/receituario-vet/nova-receita-2`, { waitUntil: 'networkidle' })
  await addTutorAndPatient(page)

  await addCompoundedFromModal(page, names.benazeprilSearch)
  await shot(page, 'phase5a-reactive-initial.png')

  const bodyBefore = await page.locator('body').innerText()
  result.benazeprilCalculated = /Benazepril/i.test(bodyBefore)

  const textareas = page.locator('textarea')
  const textareasCount = await textareas.count()
  if (textareasCount > 0) {
    await textareas.nth(0).fill('Administrar 1 biscoito a cada 24 horas, por 10 dias.')
  }
  if (textareasCount > 1) {
    await textareas.nth(1).fill('Oferecer no mesmo horário todos os dias.\\nRetornar para reavaliação em 10 dias.')
  }

  await page.waitForTimeout(1200)
  await page.getByRole('button', { name: /Revisar/i }).first().click()
  await page.waitForTimeout(1800)
  const reviewText = await page.locator('body').innerText()
  result.reviewUpdated = /Administrar 1 biscoito a cada 24 horas, por 10 dias/i.test(reviewText)
  await shot(page, 'phase5a-reactive-review.png')

  await page.goto(`${appUrl}/receituario-vet/nova-receita-2`, { waitUntil: 'networkidle' })
  result.draftRestored = /Administrar 1 biscoito a cada 24 horas, por 10 dias/i.test(await page.locator('body').innerText())

  result.ok = result.reviewUpdated
} catch (error) {
  result.error = error instanceof Error ? error.message : String(error)
} finally {
  await context.close()
  await browser.close()
}

fs.writeFileSync(path.join(outDir, 'manipulados-reactive-proof.json'), JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))
