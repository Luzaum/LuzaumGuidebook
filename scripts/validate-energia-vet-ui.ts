import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import { chromium, type Page } from 'playwright'

const cwd = process.cwd()
const baseUrl = 'http://127.0.0.1:4173'
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

async function selectState(page: Page, label: string) {
  await page.click('#sel-physio')
  await page.getByRole('option', { name: label }).click()
}

async function buildDogFlow(page: Page) {
  await page.goto(`${baseUrl}/calculadora-energetica/new`, { waitUntil: 'networkidle' })
  await page.fill('#pat-name', 'Paciente UX')
  await page.fill('#pat-owner', 'Tutor UX')
  await page.fill('#pat-weight', '15')
  await page.fill('#pat-age', '36')
  await page.getByRole('button', { name: /Fêmea|Femea/i }).click()
  await page.click('#btn-next-energy')

  await page.waitForURL('**/energy')

  await page.fill('#activity-hours', '0')
  await delay(300)
  const sedentary = await readEnergyValue(page)

  await page.fill('#activity-hours', '2')
  await delay(300)
  const moderateLow = await readEnergyValue(page)

  await page.getByRole('button', { name: /Alto impacto/i }).click()
  await delay(300)
  const moderateHigh = await readEnergyValue(page)

  await page.getByRole('button', { name: /Predisposto a obesidade/i }).click()
  await delay(300)
  const obesityProne = await readEnergyValue(page)

  await selectState(page, 'Gestacao primeiras 4 semanas')
  await delay(300)
  const gestation = await readEnergyValue(page)

  await page.screenshot({ path: join(outputDir, 'energy-step.png'), fullPage: true })

  return { sedentary, moderateLow, moderateHigh, obesityProne, gestation }
}

async function buildCatEnergyCheck(browser: Awaited<ReturnType<typeof chromium.launch>>) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } })
  await page.goto(`${baseUrl}/calculadora-energetica/new`, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /GATO/i }).click()
  await page.fill('#pat-name', 'Mia UX')
  await page.fill('#pat-owner', 'Tutor Mia')
  await page.fill('#pat-weight', '4.5')
  await page.fill('#pat-age', '24')
  await page.click('#btn-next-energy')
  await page.waitForURL('**/energy')

  await page.fill('#cat-activity-hours', '1.5')
  await delay(300)
  const active = await readEnergyValue(page)

  await selectState(page, 'Adulto castrado e/ou indoor')
  await delay(300)
  const indoor = await readEnergyValue(page)

  await page.close()
  return { active, indoor }
}

async function main() {
  mkdirSync(outputDir, { recursive: true })

  const server = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173'], {
    cwd,
    shell: true,
    stdio: 'ignore',
  })

  try {
    await waitForServer(`${baseUrl}/calculadora-energetica/new`)
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage({ viewport: { width: 1440, height: 1400 } })

    const dogEnergy = await buildDogFlow(page)

    await page.click('#btn-next-target')
    await page.waitForURL('**/target')
    await page.screenshot({ path: join(outputDir, 'target-step.png'), fullPage: true })

    await page.click('#btn-next-food')
    await page.waitForURL('**/food')

    const addButtons = page.getByRole('button', { name: 'Add' })
    await addButtons.nth(0).click()
    await addButtons.nth(1).click()

    const percentInputs = page.locator('input[type="number"]')
    const secondInitial = await percentInputs.nth(1).inputValue()
    await percentInputs.nth(0).fill('60')
    await percentInputs.nth(0).press('Enter')
    await delay(300)
    const secondBefore = await percentInputs.nth(1).inputValue()

    await page.getByRole('button', { name: /Complementar outras %/i }).click()
    await delay(300)
    const secondAfterComplement = await percentInputs.nth(1).inputValue()

    await page.screenshot({ path: join(outputDir, 'food-step.png'), fullPage: true })
    await page.getByRole('button', { name: /Ver resumo/i }).click()

    await page.waitForURL('**/summary')
    await page.screenshot({ path: join(outputDir, 'summary-step.png'), fullPage: true })
    const programmedSectionPresent = (await page.locator('text=Alimentação programada').count()) > 0 || (await page.locator('text=Alimentacao programada').count()) > 0
    await page.screenshot({ path: join(outputDir, 'programmed-feeding.png'), fullPage: true })
    await page.getByRole('button', { name: /Salvar no módulo|Salvar no modulo/i }).click()

    await page.waitForURL('**/calculadora-energetica')
    await page.goto(`${baseUrl}/calculadora-energetica/patients`, { waitUntil: 'networkidle' })
    await page.getByRole('link', { name: /Ver detalhes/i }).first().click()
    await page.waitForURL('**/patients/**')
    await page.screenshot({ path: join(outputDir, 'patient-detail.png'), fullPage: true })
    const savedReportComplete =
      (await page.locator('text=Formula e contribuicao por alimento').count()) > 0 &&
      (await page.locator('text=Alimentacao programada').count()) > 0

    const catEnergy = await buildCatEnergyCheck(browser)

    const report = {
      generatedAt: new Date().toISOString(),
      screenshots: {
        energy: join(outputDir, 'energy-step.png'),
        target: join(outputDir, 'target-step.png'),
        food: join(outputDir, 'food-step.png'),
        summary: join(outputDir, 'summary-step.png'),
        patientDetail: join(outputDir, 'patient-detail.png'),
        programmedFeeding: join(outputDir, 'programmed-feeding.png'),
      },
      checks: {
        dogEnergy,
        catEnergy,
        energyChangedByActivity: dogEnergy.sedentary !== dogEnergy.moderateLow,
        energyChangedByImpact: dogEnergy.moderateLow !== dogEnergy.moderateHigh,
        energyChangedByObesityProne: dogEnergy.moderateHigh !== dogEnergy.obesityProne,
        energyChangedByReproduction: dogEnergy.obesityProne !== dogEnergy.gestation,
        energyChangedByCatIndoor: catEnergy.active !== catEnergy.indoor,
        manualModeDidNotAutoAdjustSecondPercentage: secondInitial === secondBefore,
        complementChangedPercentages: secondBefore !== secondAfterComplement,
        programmedSectionPresent,
        savedReportComplete,
      },
    }

    writeFileSync(join(outputDir, 'report.json'), JSON.stringify(report, null, 2), 'utf-8')
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
