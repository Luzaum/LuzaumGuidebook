import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import { chromium, type Page } from 'playwright'

const cwd = process.cwd()
const validationPort = '4176'
const baseUrl = `http://127.0.0.1:${validationPort}`
const outputDir = join(cwd, 'tmp', 'energia-vet-validation')

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForServer(url: string, timeoutMs = 60000) {
  const startedAt = Date.now()
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {}
    await delay(1000)
  }
  throw new Error(`Timeout waiting for ${url}`)
}

async function readEnergyValue(page: Page) {
  const text = await page.locator('#energy-preview-kcal').textContent()
  return Number((text ?? '').replace(/[^\d.]/g, ''))
}

async function buildDogFlow(page: Page) {
  await page.goto(`${baseUrl}/calculadora-energetica/new`, { waitUntil: 'networkidle' })
  await page.fill('#pat-name', 'Paciente UX')
  await page.fill('#pat-owner', 'Tutor UX')
  await page.fill('#pat-weight', '15')
  await page.fill('#pat-age', '3')
  await page.screenshot({ path: join(outputDir, 'patient-step.png'), fullPage: true })
  await page.click('#btn-next-energy')
  await page.waitForURL('**/energy')

  await page.fill('#activity-hours', '0')
  await delay(250)
  const sedentary = await readEnergyValue(page)

  await page.fill('#activity-hours', '0.5')
  await delay(250)
  const lowActivity = await readEnergyValue(page)

  await page.fill('#activity-hours', '2')
  await page.getByRole('button', { name: /Baixo impacto/i }).click()
  await delay(250)
  const moderateLow = await readEnergyValue(page)

  await page.getByRole('button', { name: /Alto impacto/i }).click()
  await delay(250)
  const moderateHigh = await readEnergyValue(page)

  await page.fill('#activity-hours', '4')
  await delay(250)
  const highActivity = await readEnergyValue(page)

  await page.getByRole('button', { name: /Predisposto a obesidade/i }).click()
  await delay(250)
  const obesityProne = await readEnergyValue(page)

  await page.screenshot({ path: join(outputDir, 'energy-step.png'), fullPage: true })

  return { sedentary, lowActivity, moderateLow, moderateHigh, highActivity, obesityProne }
}

async function buildCatEnergyCheck(browser: Awaited<ReturnType<typeof chromium.launch>>) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } })
  await page.goto(`${baseUrl}/calculadora-energetica/new`, { waitUntil: 'networkidle' })
  await page.click('#species-card-cat')
  await page.fill('#pat-name', 'Mia UX')
  await page.fill('#pat-owner', 'Tutor Mia')
  await page.fill('#pat-weight', '4.5')
  await page.fill('#pat-age', '2')
  await page.click('#btn-next-energy')
  await page.waitForURL('**/energy')

  await page.fill('#cat-activity-hours', '1.5')
  await delay(250)
  const active = await readEnergyValue(page)

  await page.getByRole('button', { name: /Anterior/i }).click()
  await page.waitForURL('**/patient')
  await page.getByRole('button', { name: /Gato indoor/i }).click()
  await page.click('#btn-next-energy')
  await page.waitForURL('**/energy')
  await delay(250)
  const indoor = await readEnergyValue(page)

  await page.close()
  return { active, indoor }
}

async function main() {
  mkdirSync(outputDir, { recursive: true })

  const server = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', validationPort], {
    cwd,
    shell: true,
    stdio: 'ignore',
  })

  try {
    await waitForServer(`${baseUrl}/calculadora-energetica/new`)
    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext({ viewport: { width: 1440, height: 1400 }, acceptDownloads: true })
    const page = await context.newPage()

    const dogEnergy = await buildDogFlow(page)

    await page.click('#btn-next-target')
    await page.waitForURL('**/target')
    await page.click('#btn-next-food')
    await page.waitForURL('**/food')

    const addButtons = page.getByRole('button', { name: 'Add' })
    await addButtons.nth(0).click()
    await addButtons.nth(1).click()
    await page.screenshot({ path: join(outputDir, 'food-step.png'), fullPage: true })

    await page.getByRole('button', { name: /Ver resumo/i }).click()
    await page.waitForURL('**/summary')
    await page.screenshot({ path: join(outputDir, 'summary-step.png'), fullPage: true })
    const printRootCount = await page.locator('#print-report-root').count()
    if (printRootCount === 0) {
      throw new Error('O template de impressao nao foi renderizado no resumo.')
    }

    await page.emulateMedia({ media: 'print' })
    await page.locator('#print-report-root').screenshot({ path: join(outputDir, 'print-preview.png') })
    await page.locator('#print-feeding-sheet').screenshot({ path: join(outputDir, 'feeding-sheet-table.png') })
    await page.emulateMedia({ media: 'screen' })

    const catEnergy = await buildCatEnergyCheck(browser)

    const report = {
      generatedAt: new Date().toISOString(),
      screenshots: {
        patient: join(outputDir, 'patient-step.png'),
        energy: join(outputDir, 'energy-step.png'),
        food: join(outputDir, 'food-step.png'),
        printPreview: join(outputDir, 'print-preview.png'),
        feedingSheet: join(outputDir, 'feeding-sheet-table.png'),
      },
      checks: {
        dogEnergy,
        catEnergy,
        energyChangedSedentaryToLow: dogEnergy.sedentary !== dogEnergy.lowActivity,
        energyChangedLowToModerate: dogEnergy.lowActivity !== dogEnergy.moderateLow,
        energyChangedByImpact: dogEnergy.moderateLow !== dogEnergy.moderateHigh,
        energyChangedToHighActivity: dogEnergy.moderateHigh !== dogEnergy.highActivity,
        energyChangedByObesityProne: dogEnergy.highActivity !== dogEnergy.obesityProne,
        energyChangedByCatIndoor: catEnergy.active !== catEnergy.indoor,
      },
    }

    writeFileSync(join(outputDir, 'report.json'), JSON.stringify(report, null, 2), 'utf-8')
    await context.close()
    await browser.close()
    console.log(JSON.stringify(report, null, 2))
  } finally {
    server.kill()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
