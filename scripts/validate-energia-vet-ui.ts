import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import { chromium } from 'playwright'

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
    const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } })

    await page.goto(`${baseUrl}/calculadora-energetica/new`, { waitUntil: 'networkidle' })
    await page.fill('#pat-name', 'Paciente UI')
    await page.fill('#pat-owner', 'Tutor UI')
    await page.fill('#pat-weight', '15')
    await page.click('#btn-next-energy')

    await page.waitForURL('**/energy')
    await page.screenshot({ path: join(outputDir, 'energy-step.png'), fullPage: true })
    await page.click('#btn-next-target')

    await page.waitForURL('**/target')
    await page.getByRole('button', { name: /Como saber o escore ideal/i }).click()
    await page.waitForSelector('img[alt*="Guia de ECC"]')
    await page.screenshot({ path: join(outputDir, 'ecc-modal.png'), fullPage: true })
    await page.keyboard.press('Escape')
    await page.screenshot({ path: join(outputDir, 'target-step.png'), fullPage: true })
    await page.click('#btn-next-food')

    await page.waitForURL('**/food')
    const addButtons = page.getByRole('button', { name: 'Adicionar' })
    await page.locator('text=Saber mais informacoes nutricionais').first().click()
    await page.waitForSelector('text=Materia natural')
    await page.screenshot({ path: join(outputDir, 'food-modal.png'), fullPage: true })
    await page.keyboard.press('Escape')
    await addButtons.nth(0).click()
    await addButtons.nth(1).click()
    await page.screenshot({ path: join(outputDir, 'food-step.png'), fullPage: true })
    await page.click('#btn-next-summary')

    await page.waitForURL('**/summary')
    await page.waitForSelector('#summary-macro-chart')
    await page.screenshot({ path: join(outputDir, 'summary-step.png'), fullPage: true })

    const adequacyCount = await page.locator('text=Adequa').count()
    const chartPresent = (await page.locator('#summary-macro-chart').count()) > 0
    const profileText = await page.locator('text=Perfil de exig').first().locator('..').textContent()

    const report = {
      generatedAt: new Date().toISOString(),
      screenshots: {
        energy: join(outputDir, 'energy-step.png'),
        target: join(outputDir, 'target-step.png'),
        eccModal: join(outputDir, 'ecc-modal.png'),
        food: join(outputDir, 'food-step.png'),
        foodModal: join(outputDir, 'food-modal.png'),
        summary: join(outputDir, 'summary-step.png'),
      },
      checks: {
        summaryReached: true,
        macroChartPresent: chartPresent,
        adequacySectionPresent: adequacyCount > 0,
        eccModalPresent: true,
        foodModalPresent: true,
        profileText,
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
