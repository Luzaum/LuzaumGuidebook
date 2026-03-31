import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const appUrl = 'http://127.0.0.1:4173'
const seed = JSON.parse(fs.readFileSync('C:/PROJETOS VET/Vetius/supabase/.temp/e2e/seed.json', 'utf8'))
const phase3 = JSON.parse(fs.readFileSync('C:/PROJETOS VET/Vetius/supabase/.temp/e2e/manipulados-phase3-v2-page.json', 'utf8'))
const outDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir = path.join(outDir, 'shots')
const downloadsDir = path.join(outDir, 'downloads')
fs.mkdirSync(shotsDir, { recursive: true })
fs.mkdirSync(downloadsDir, { recursive: true })

const targetName = phase3.v2Name || 'Benazepril'
const result = {
  ok: false,
  targetName,
  routeLoaded: false,
  manipuladoPageOk: false,
  recipeCardOk: false,
  reviewOk: false,
  noMojibakeVisible: false,
  pdfPath: '',
  shots: [],
}

function hasMojibake(text) {
  return /Ã|Â|â€¢|�/.test(text)
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
  const weightInput = page.locator('label').filter({ hasText: /Peso/i }).first().locator('xpath=..').locator('input').first()
  if (await weightInput.count()) {
    await weightInput.fill('5')
  }
  await page.waitForTimeout(600)
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1680, height: 1280 }, acceptDownloads: true })
const page = await context.newPage()

try {
  await login(page, '/receituario-vet/manipulados')
  await page.waitForURL(/receituario-vet\/manipulados/, { timeout: 30000 })
  result.routeLoaded = true

  await page.goto(`${appUrl}/receituario-vet/manipulados`, { waitUntil: 'networkidle' })
  await page.locator('input[placeholder*="Nome, forma farmacêutica"]').fill(targetName)
  await page.waitForTimeout(900)
  await page.getByRole('button', { name: new RegExp(targetName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }).first().click()
  await page.waitForTimeout(1000)
  result.manipuladoPageOk = await page.locator(`input[value="${targetName}"]`).count() > 0
  await shot(page, 'phase5b-manipulados-page-after.png')

  await page.goto(`${appUrl}/receituario-vet/nova-receita-2`, { waitUntil: 'networkidle' })
  await addTutorAndPatient(page)
  await page.getByTestId('nova-receita-add-compounded').click()
  const searchInput = page.getByTestId('compounded-modal-search')
  await searchInput.fill(targetName)
  await page.waitForTimeout(1200)
  await page.getByRole('button', { name: new RegExp(targetName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }).first().click()
  await page.getByTestId('compounded-modal-confirm').click()
  await page.waitForTimeout(1600)

  const bodyAfterAdd = await page.locator('body').innerText()
  result.recipeCardOk = bodyAfterAdd.includes(targetName)
  await shot(page, 'phase5b-nova-receita-card-after.png')

  await page.getByRole('button', { name: /Revisar/i }).first().click()
  await page.waitForURL(/nova-receita-2-print\?mode=review/, { timeout: 30000 })
  await page.waitForTimeout(1800)
  const previewText = await page.locator('[data-rx-print-canvas="sheet"]').first().innerText()
  result.reviewOk = previewText.includes(targetName)
  result.noMojibakeVisible = !hasMojibake(previewText)
  await shot(page, 'phase5b-review-preview-after.png')

  const downloadPromise = page.waitForEvent('download', { timeout: 60000 })
  await page.getByRole('button', { name: /Exportar PDF/i }).click()
  const download = await downloadPromise
  const filePath = path.join(downloadsDir, `phase5b-${Date.now()}-${download.suggestedFilename()}`)
  await download.saveAs(filePath)
  result.pdfPath = filePath

  result.ok =
    result.routeLoaded &&
    result.manipuladoPageOk &&
    result.recipeCardOk &&
    result.reviewOk &&
    result.noMojibakeVisible &&
    !!result.pdfPath
} catch (error) {
  result.error = error instanceof Error ? error.message : String(error)
  await shot(page, 'phase5b-fatal.png').catch(() => {})
} finally {
  fs.writeFileSync(path.join(outDir, 'phase5b-visual.json'), JSON.stringify(result, null, 2))
  await context.close()
  await browser.close()
}

console.log(JSON.stringify(result, null, 2))
