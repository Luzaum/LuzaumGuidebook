import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import { chromium, type Page } from 'playwright'

const cwd = process.cwd()
const validationPort = '4176'
const baseUrl = `http://127.0.0.1:${validationPort}`
const outputDir = join(cwd, 'tmp', 'energia-vet-validation')

const OPTIONAL_LABELS = [
  'Biotina',
  'Niacina',
  'Riboflavina',
  'Vitamina K',
  'Cobalamina',
  'Acido folico',
]

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

async function goToNewCalculation(page: Page) {
  await page.goto(`${baseUrl}/calculadora-energetica/new`, { waitUntil: 'networkidle' })
}

async function fillPatientDog(page: Page, neutered = false) {
  await goToNewCalculation(page)
  await page.click('#species-card-dog')
  await page.fill('#pat-name', 'Paciente UX')
  await page.fill('#pat-owner', 'Tutor UX')
  await page.fill('#pat-weight', '15')
  await page.fill('#pat-age', '3')
  if (neutered) {
    await page.getByRole('button', { name: /Paciente castrado/i }).click()
  }
  await page.screenshot({ path: join(outputDir, neutered ? 'patient-step-neutered.png' : 'patient-step.png'), fullPage: true })
  await page.click('#btn-next-energy')
  await page.waitForURL('**/energy')
}

async function fillPatientCat(page: Page, indoor = false) {
  await goToNewCalculation(page)
  await page.click('#species-card-cat')
  await page.fill('#pat-name', 'Mia UX')
  await page.fill('#pat-owner', 'Tutor Mia')
  await page.fill('#pat-weight', '4.5')
  await page.fill('#pat-age', '2')
  if (indoor) {
    await page.getByRole('button', { name: /Gato indoor/i }).click()
  }
  await page.click('#btn-next-energy')
  await page.waitForURL('**/energy')
}

async function selectProfile(page: Page, id: string) {
  await page.click(`#energy-profile-${id}`)
  await delay(200)
  return readEnergyValue(page)
}

async function validateDogProfiles(page: Page) {
  await fillPatientDog(page, false)
  const intact = await selectProfile(page, 'dog_adult_intact')
  const neuteredProfile = await selectProfile(page, 'dog_adult_neutered')
  const obeseProne = await selectProfile(page, 'dog_adult_inactive_obese')
  const workLight = await selectProfile(page, 'dog_work_light')
  const workModerate = await selectProfile(page, 'dog_work_moderate')
  const workIntense = await selectProfile(page, 'dog_work_intense')
  const energyText = (await page.locator('body').innerText()).toLowerCase()
  const hasSlugVisible = /dog_|cat_|fediaf|_impact|_growth/.test(energyText)
  const hasPortugueseProfiles =
    energyText.includes('cao adulto castrado') &&
    energyText.includes('cao adulto trabalho moderado') &&
    energyText.includes('cao em lactacao')
  await page.screenshot({ path: join(outputDir, 'energy-step-dog.png'), fullPage: true })
  return { intact, neuteredProfile, obeseProne, workLight, workModerate, workIntense, hasSlugVisible, hasPortugueseProfiles }
}

async function validateDogCastration(browser: Awaited<ReturnType<typeof chromium.launch>>) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1300 } })
  await fillPatientDog(page, false)
  const intactUnneutered = await selectProfile(page, 'dog_adult_intact')
  await page.close()

  const neuteredPage = await browser.newPage({ viewport: { width: 1440, height: 1300 } })
  await fillPatientDog(neuteredPage, true)
  const intactNeutered = await selectProfile(neuteredPage, 'dog_adult_intact')
  await neuteredPage.close()

  return { intactUnneutered, intactNeutered }
}

async function validateCatIndoor(browser: Awaited<ReturnType<typeof chromium.launch>>) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } })
  await fillPatientCat(page, false)
  const active = await selectProfile(page, 'cat_adult_intact')
  await page.close()

  const indoorPage = await browser.newPage({ viewport: { width: 1440, height: 1200 } })
  await fillPatientCat(indoorPage, true)
  const indoor = await selectProfile(indoorPage, 'cat_adult_intact')
  await indoorPage.close()

  return { active, indoor }
}

async function validateFoodStepAndModal(page: Page) {
  await page.click('#btn-next-target')
  await page.waitForURL('**/target')
  await page.click('#btn-next-food')
  await page.waitForURL(/\/food$/)

  const hasEnergyProfileSelector = (await page.locator('#sel-physio').count()) > 0
  const profileTextVisible = await page.getByText(/^Perfil:/i).count()

  const addButtons = page.getByRole('button', { name: 'Add' })
  await addButtons.first().click()
  await page.getByRole('button', { name: 'Info' }).first().click()
  await page.waitForSelector('[role="dialog"]')

  const modalRows = page.locator('[role="dialog"] .rounded-lg.border.border-white\\/5')
  const rowCount = await modalRows.count()
  const modalText = (await page.locator('[role="dialog"]').innerText()).toLowerCase()
  const optionalMissingMentions = OPTIONAL_LABELS.some((label) =>
    modalText.includes(label.toLowerCase()) && modalText.includes('dado n') && modalText.includes(label.toLowerCase()),
  )
  await page.screenshot({ path: join(outputDir, 'food-modal.png'), fullPage: true })
  await page.keyboard.press('Escape')
  await page.waitForTimeout(200)
  await page.screenshot({ path: join(outputDir, 'food-step.png'), fullPage: true })

  return {
    hasEnergyProfileSelector,
    profileTextVisible: profileTextVisible > 0,
    rowCount,
    optionalMissingMentions,
  }
}

async function validateSummaryAndHistory(page: Page) {
  await page.getByRole('button', { name: /Ver resumo/i }).click()
  await page.waitForURL('**/summary')
  await page.screenshot({ path: join(outputDir, 'summary-step.png'), fullPage: true })

  await page.click('#btn-save-plan')
  await page.waitForURL('**/calculadora-energetica')

  const raw = await page.evaluate(() => localStorage.getItem('vetius-energia-vet-reports-v4'))
  let savedHasResolvedProfile = false
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Array<{ energy?: { resolvedProfileLabel?: string } }>
      const last = parsed[0]
      savedHasResolvedProfile = !!last?.energy?.resolvedProfileLabel
    } catch {
      savedHasResolvedProfile = false
    }
  }
  return { savedHasResolvedProfile }
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

    const dogProfiles = await validateDogProfiles(page)
    const foodChecks = await validateFoodStepAndModal(page)
    const summaryChecks = await validateSummaryAndHistory(page)
    const dogCastration = await validateDogCastration(browser)
    const catIndoor = await validateCatIndoor(browser)

    await context.close()
    await browser.close()

    const report = {
      generatedAt: new Date().toISOString(),
      screenshots: {
        patient: join(outputDir, 'patient-step.png'),
        energyDog: join(outputDir, 'energy-step-dog.png'),
        food: join(outputDir, 'food-step.png'),
        foodModal: join(outputDir, 'food-modal.png'),
        summary: join(outputDir, 'summary-step.png'),
      },
      checks: {
        dogProfiles,
        dogCastration,
        catIndoor,
        profileOptionsInPortuguese: dogProfiles.hasPortugueseProfiles && !dogProfiles.hasSlugVisible,
        speciesChangesProfiles: dogProfiles.workIntense > 0 && catIndoor.active > 0,
        castrationChangedCalculation: dogCastration.intactUnneutered !== dogCastration.intactNeutered,
        catIndoorChangedCalculation: catIndoor.active !== catIndoor.indoor,
        foodHasNoEnergyProfileSelector: !foodChecks.hasEnergyProfileSelector && !foodChecks.profileTextVisible,
        foodModalIsClean: foodChecks.rowCount >= 10 && !foodChecks.optionalMissingMentions,
        summaryUsesResolvedProfile: summaryChecks.savedHasResolvedProfile,
      },
    }

    writeFileSync(join(outputDir, 'report.json'), JSON.stringify(report, null, 2), 'utf-8')
    console.log(JSON.stringify(report, null, 2))
  } finally {
    server.kill()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
