import { mkdirSync, writeFileSync, realpathSync } from 'node:fs'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import { chromium, type Page } from 'playwright'

const cwd = realpathSync.native(process.cwd())
const port = String(4200 + process.pid % 1000)
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
  await page.waitForURL('**/energy', { timeout: 60_000 })
  await page.locator('#energy-rer-value').waitFor()
}

async function assertNoDocumentOverflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)
}

async function main() {
  mkdirSync(outputDir, { recursive: true })
  const server = spawn(process.execPath, [join(cwd, 'node_modules/vite/bin/vite.js'), ...(process.env.VETIUS_UI_PREVIEW === '1' ? ['preview'] : []), '--host', '127.0.0.1', '--port', port, '--strictPort'], { cwd, stdio: 'ignore' })
  let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined
  try {
    await waitForServer(`${baseUrl}/calculadora-energetica/new`)
    try { browser = await chromium.launch({ headless: true, channel: 'chrome' }) }
    catch { browser = await chromium.launch({ headless: true, channel: 'msedge' }) }
    const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } })
    context.setDefaultNavigationTimeout(60_000)
    const page = await context.newPage()
    await prepareQuickDiet(page)

    const energyText = await page.locator('body').innerText()
    const energyChecks = {
      hasBookSource: energyText.includes('Applied Veterinary Clinical Nutrition, 2nd Edition'),
      automaticNeuteredProfile: /Perfil:\s*Adulto castrado/.test(energyText),
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
    await page.getByRole('button', { name: 'Incluir', exact: true }).first().waitFor()

    const foodText = await page.locator('body').innerText()
    const foodChecks = { taxonomyVisible: foodText.includes('Dietas comerciais completas'), nutritionalDataVisible: foodText.includes('nutrientes') && foodText.includes('kcal/100g') }
    await page.getByRole('button', { name: 'Ver todas as informações do alimento', exact: true }).first().click()
    const foodDetails = await page.getByRole('dialog').innerText()
    Object.assign(foodChecks, { fullNutrientsAndSources: /matéria natural/i.test(foodDetails) && /matéria seca/i.test(foodDetails) && /fonte, metadados e regras clínicas/i.test(foodDetails) })
    await page.keyboard.press('Escape')
    await page.getByRole('dialog').waitFor({ state: 'hidden' })
    await page.getByRole('button', { name: 'Incluir', exact: true }).first().click()
    await page.screenshot({ path: join(outputDir, 'foods.png'), fullPage: true })
    await page.getByRole('button', { name: 'Próximo: Formulação', exact: true }).first().click()
    await page.getByText('Matéria seca', { exact: true }).first().waitFor()
    const formulationText = await page.locator('body').innerText()
    const formulationChecks = { dryMatter: formulationText.includes('Matéria seca'), asFed: formulationText.includes('Matéria natural'), partition: /partição energética/i.test(formulationText) }
    await page.screenshot({ path: join(outputDir, 'formulation.png'), fullPage: true })
    await page.getByRole('button', { name: 'Próximo: Resumo' }).click()
    await page.getByText('Adequação frente ao perfil', { exact: false }).first().waitFor()
    const summaryText = await page.locator('body').innerText()
    const summaryChecks = { clinicalTable: summaryText.includes('Adequação frente ao perfil'), contribution: summaryText.includes('Contribuição por alimento'), partition: /partição energética/i.test(summaryText) }
    await page.screenshot({ path: join(outputDir, 'summary.png'), fullPage: true })
    await page.getByRole('button', { name: 'Próximo: Alimentação' }).click()
    await page.getByText('Concluir sem cadastrar', { exact: false }).first().waitFor()
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
    browser = undefined

    const report = { generatedAt: new Date().toISOString(), outputDir, checks: { energyChecks, targetChecks, foodChecks, formulationChecks, summaryChecks, feedingChecks, responsiveChecks } }
    writeFileSync(join(outputDir, 'report.json'), JSON.stringify(report, null, 2), 'utf8')
    console.log(JSON.stringify(report, null, 2))
    const failed = Object.entries(report.checks).flatMap(([group, checks]) => Object.entries(checks).filter(([,value]) => !value).map(([name]) => `${group}.${name}`))
    if (failed.length) throw new Error(`Validações de interface falharam: ${failed.join(', ')}`)
  } finally { await browser?.close(); server.kill() }
}

main().catch((error) => { console.error(error); process.exit(1) })
