import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import { chromium, type Page } from 'playwright'

const cwd = process.cwd()
const port = '4176'
const baseUrl = `http://127.0.0.1:${port}`
const outputDir = join(cwd, 'tmp', 'energia-vet-validation', `${Date.now()}-${process.pid}`)

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function waitForServer(url: string, timeoutMs = 60_000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try { if ((await fetch(url)).ok) return } catch {}
    await delay(700)
  }
  throw new Error(`Timeout waiting for ${url}`)
}

async function prepareQuickDiet(page: Page) {
  await page.goto(`${baseUrl}/calculadora-energetica/new`, { waitUntil: 'domcontentloaded' })
  await page.getByRole('radio', { name: /Dieta rápida/i }).click()
  const weightInput = page.getByLabel('Peso atual (kg)')
  await weightInput.fill('')
  const acceptsBlank = (await weightInput.inputValue()) === ''
  await weightInput.type('12,4')
  const acceptsComma = (await weightInput.inputValue()) === '12,4'
  await weightInput.fill('12.4')
  const acceptsDot = (await weightInput.inputValue()) === '12.4'
  await weightInput.fill(',75')
  const acceptsLeadingSeparator = (await weightInput.inputValue()) === ',75'
  if (![acceptsBlank, acceptsComma, acceptsDot, acceptsLeadingSeparator].every(Boolean)) {
    throw new Error('O campo numérico não aceitou uma das sequências de edição esperadas.')
  }
  await weightInput.fill('15')
  await page.getByRole('radio', { name: /^Castrado$/ }).click()
  await page.getByRole('button', { name: 'Próximo: Energia' }).click()
  await page.waitForURL('**/energy')
}

async function assertNoDocumentOverflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)
}

async function main() {
  mkdirSync(outputDir, { recursive: true })
  const server = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', port], { cwd, shell: true, stdio: 'ignore' })
  try {
    await waitForServer(`${baseUrl}/calculadora-energetica/new`)
    let browser
    try { browser = await chromium.launch({ headless: true, channel: 'chrome' }) }
    catch { browser = await chromium.launch({ headless: true, channel: 'msedge' }) }
    const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } })
    const page = await context.newPage()
    await prepareQuickDiet(page)

    const energyText = await page.locator('body').innerText()
    const energyChecks = {
      hasBookSource: energyText.includes('Applied Veterinary Clinical Nutrition, 2nd Edition'),
      automaticNeuteredProfile: energyText.includes('Perfil aplicado: Adulto castrado'),
      hasRer: (await page.locator('#energy-rer-value').count()) === 1,
      noExpectedAdultWeight: (await page.getByText(/Peso adulto esperado/i).count()) === 0,
    }
    await page.screenshot({ path: join(outputDir, 'energy.png'), fullPage: true })
    await page.getByRole('button', { name: 'Próximo: Meta' }).click()
    await page.getByRole('radio', { name: '8 /9' }).click()
    const targetText = await page.locator('body').innerText()
    const targetChecks = { imageVisible: (await page.getByAltText(/Escore de condição corporal canino/i).count()) === 1, automaticWeightLoss: targetText.includes('Redução de peso') }
    await page.screenshot({ path: join(outputDir, 'target.png'), fullPage: true })
    await page.getByRole('button', { name: 'Próximo: Alimentos' }).click()

    const foodText = await page.locator('body').innerText()
    const foodChecks = { taxonomyVisible: foodText.includes('Dietas comerciais completas'), bookSourceVisible: foodText.includes('Nutrient Requirements of Dogs and Cats') }
    await page.getByRole('button', { name: 'Incluir', exact: true }).first().click()
    await page.screenshot({ path: join(outputDir, 'foods.png'), fullPage: true })
    await page.getByRole('button', { name: 'Próximo: Formulação' }).click()
    const formulationText = await page.locator('body').innerText()
    const formulationChecks = { dryMatter: formulationText.includes('Matéria seca'), asFed: formulationText.includes('Matéria natural'), partition: formulationText.includes('Partição energética') }
    await page.screenshot({ path: join(outputDir, 'formulation.png'), fullPage: true })
    await page.getByRole('button', { name: 'Próximo: Resumo' }).click()
    const summaryText = await page.locator('body').innerText()
    const summaryChecks = { clinicalTable: summaryText.includes('Adequação frente ao perfil'), contribution: summaryText.includes('Contribuição por alimento'), partition: summaryText.includes('Partição energética') }
    await page.screenshot({ path: join(outputDir, 'summary.png'), fullPage: true })
    await page.getByRole('button', { name: 'Próximo: Alimentação' }).click()
    const feedingText = await page.locator('body').innerText()
    const feedingChecks = { quickModeDoesNotSave: feedingText.includes('Indisponível na dieta rápida'), finishLabel: feedingText.includes('Concluir sem cadastrar') }
    await page.screenshot({ path: join(outputDir, 'feeding.png'), fullPage: true })

    await page.setViewportSize({ width: 390, height: 844 })
    const responsiveChecks: Record<string, boolean> = {}
    for (const path of ['energy', 'target', 'food', 'formulation', 'summary', 'feeding']) {
      await page.goto(`${baseUrl}/calculadora-energetica/new/${path}`)
      responsiveChecks[path] = await assertNoDocumentOverflow(page)
    }
    await page.screenshot({ path: join(outputDir, 'feeding-mobile.png'), fullPage: true })
    await context.close()
    await browser.close()

    const report = { generatedAt: new Date().toISOString(), outputDir, checks: { energyChecks, targetChecks, foodChecks, formulationChecks, summaryChecks, feedingChecks, responsiveChecks } }
    writeFileSync(join(outputDir, 'report.json'), JSON.stringify(report, null, 2), 'utf8')
    console.log(JSON.stringify(report, null, 2))
  } finally { server.kill() }
}

main().catch((error) => { console.error(error); process.exit(1) })
