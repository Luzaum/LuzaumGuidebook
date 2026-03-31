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
  observationsCleared: false,
  routeNormalizedToOral: false,
  rightSideIsDispensing: false,
  titleStayedSingleLine: false,
  reviewOk: false,
  pdfPath: '',
  shots: [],
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
  if (await weightInput.count()) await weightInput.fill('5')
  await page.waitForTimeout(500)
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1680, height: 1280 }, acceptDownloads: true })
const page = await context.newPage()

try {
  await login(page, '/receituario-vet/manipulados')
  await page.waitForURL(/receituario-vet\/manipulados/, { timeout: 30000 })
  result.routeLoaded = true

  await page.goto(`${appUrl}/receituario-vet/manipulados`, { waitUntil: 'networkidle' })
  await page.locator('input[placeholder*="Nome, forma farmac"]').fill(targetName)
  await page.waitForTimeout(800)
  await page.getByRole('button', { name: new RegExp(targetName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }).first().click()
  await page.waitForTimeout(900)
  result.manipuladoPageOk = await page.locator(`input[value="${targetName}"]`).count() > 0
  await shot(page, 'phase5b2-manipulados-page-after.png')

  await page.goto(`${appUrl}/receituario-vet/nova-receita-2`, { waitUntil: 'networkidle' })
  await addTutorAndPatient(page)
  await page.getByTestId('nova-receita-add-compounded').click()
  await page.getByTestId('compounded-modal-search').fill(targetName)
  await page.waitForTimeout(1100)
  await page.getByRole('button', { name: new RegExp(targetName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }).first().click()
  await page.getByTestId('compounded-modal-confirm').click()
  await page.waitForTimeout(1500)

  const itemCard = page.locator('[data-testid^="rx-item-"]').first()
  result.recipeCardOk = await itemCard.count() > 0

  const tutorField = itemCard.locator('textarea').first()
  await tutorField.fill('Apagar este texto')
  await page.waitForTimeout(300)
  await itemCard.getByRole('button', { name: /Limpar observacoes/i }).first().click()
  await page.waitForTimeout(500)
  result.observationsCleared = await tutorField.inputValue() === ''

  await shot(page, 'phase5b2-nova-receita-card-after.png')

  await page.getByRole('button', { name: /Revisar/i }).first().click()
  await page.waitForURL(/nova-receita-2-print\?mode=review/, { timeout: 30000 })
  await page.waitForTimeout(1400)

  const printSheet = page.locator('[data-rx-print-canvas="sheet"]').first()
  const previewText = await printSheet.innerText()
  result.reviewOk = previewText.includes(targetName)
  result.routeNormalizedToOral = !/\bOUTROS\b/i.test(previewText)

  const firstLineRight = printSheet.locator('p.shrink-0.whitespace-nowrap.text-right').first()
  const rightText = ((await firstLineRight.textContent()) || '').trim()
  result.rightSideIsDispensing = !!rightText && !/^dose/i.test(rightText)

  const firstLineLeft = printSheet.locator('p.min-w-0.truncate.whitespace-nowrap').first()
  const leftMetrics = await firstLineLeft.evaluate((node) => {
    const el = node
    const style = window.getComputedStyle(el)
    return {
      clientHeight: el.clientHeight,
      lineHeight: Number.parseFloat(style.lineHeight || '0'),
    }
  })
  result.titleStayedSingleLine =
    leftMetrics.lineHeight > 0
      ? leftMetrics.clientHeight <= leftMetrics.lineHeight * 1.6
      : leftMetrics.clientHeight <= 24

  await shot(page, 'phase5b2-review-preview-after.png')

  const downloadPromise = page.waitForEvent('download', { timeout: 60000 })
  await page.getByRole('button', { name: /Exportar PDF/i }).click()
  const download = await downloadPromise
  const filePath = path.join(downloadsDir, `phase5b2-${Date.now()}-${download.suggestedFilename()}`)
  await download.saveAs(filePath)
  result.pdfPath = filePath

  result.ok =
    result.routeLoaded &&
    result.manipuladoPageOk &&
    result.recipeCardOk &&
    result.observationsCleared &&
    result.rightSideIsDispensing &&
    result.titleStayedSingleLine &&
    result.reviewOk &&
    !!result.pdfPath
} catch (error) {
  result.error = error instanceof Error ? error.message : String(error)
  await shot(page, 'phase5b2-fatal.png').catch(() => {})
} finally {
  fs.writeFileSync(path.join(outDir, 'phase5b2-corrective.json'), JSON.stringify(result, null, 2))
  await context.close()
  await browser.close()
}

console.log(JSON.stringify(result, null, 2))
