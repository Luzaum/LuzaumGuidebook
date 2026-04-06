import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const appUrl = 'http://127.0.0.1:5173'
const baseDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir = path.join(baseDir, 'shots', 'density-pass-20260405')
fs.mkdirSync(shotsDir, { recursive: true })

const seed = JSON.parse(fs.readFileSync(path.join(baseDir, 'seed.json'), 'utf8'))

const result = {
  ok: false,
  viewport: { width: 1600, height: 1200 },
  shots: {},
  error: '',
}

async function login(page, nextPath) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    await page.goto(`${appUrl}/login?next=${encodeURIComponent(nextPath)}`, { waitUntil: 'networkidle' })
    await page.getByLabel(/Email/i).fill(seed.email)
    await page.locator('#login-password').fill(seed.password)
    await page.getByRole('button', { name: /^Entrar$/ }).click()
    try {
      await page.waitForURL(new RegExp(nextPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), { timeout: 20000 })
      return
    } catch {}
  }
  throw new Error('Falha ao autenticar para a prova visual de densidade')
}

async function capture(page, route, fileName, waitMs = 1200) {
  await page.goto(`${appUrl}${route}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(waitMs)
  const file = path.join(shotsDir, fileName)
  await page.screenshot({ path: file, fullPage: true })
  return file
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: result.viewport })
const page = await context.newPage()

try {
  await login(page, '/receituario-vet')
  await page.waitForURL(/receituario-vet/, { timeout: 30000 })

  result.shots.hub = await capture(page, '/receituario-vet', 'hub-after.png')
  result.shots.novaReceita = await capture(page, '/receituario-vet/nova-receita-2', 'nova-receita-after.png')
  result.shots.catalogo = await capture(page, '/receituario-vet/catalogo3', 'catalogo-after.png')
  result.shots.manipulados = await capture(page, '/receituario-vet/manipulados', 'manipulados-after.png')
  result.shots.protocolos = await capture(page, '/receituario-vet/protocolos-3', 'protocolos-after.png')
  result.ok = true
} catch (error) {
  result.error = error instanceof Error ? error.message : String(error)
} finally {
  await context.close()
  await browser.close()
}

const output = path.join(baseDir, 'density-pass-proof.json')
fs.writeFileSync(output, JSON.stringify(result, null, 2), 'utf8')

if (!result.ok) {
  console.error(result.error || 'density pass proof failed')
  process.exit(1)
}
