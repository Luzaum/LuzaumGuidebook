import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const appUrl = 'http://127.0.0.1:5173'
const baseDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir = path.join(baseDir, 'shots')
fs.mkdirSync(shotsDir, { recursive: true })
const seed = JSON.parse(fs.readFileSync(path.join(baseDir, 'seed.json'), 'utf8'))
const now = Date.now()
const formulaName = `Repro Dose Faixa ${now}`
const result = { ok:false, routeLoaded:false, reviewLoaded:false, hasEditDoseButtonNova:false, hasEditDoseButtonReview:false, novaPreviewChanged:false, reviewPreviewChanged:false, beforeNova:'', afterNova:'', beforeReview:'', afterReview:'', shots:[] }

async function shot(page, name) { const file = path.join(shotsDir, name); await page.screenshot({ path:file, fullPage:true }); result.shots.push(file) }
async function login(page, nextPath) { await page.goto(`${appUrl}/login?next=${encodeURIComponent(nextPath)}`, { waitUntil:'networkidle' }); await page.getByLabel(/Email/i).fill(seed.email); await page.locator('#login-password').fill(seed.password); await page.getByRole('button',{name:/^Entrar$/}).click() }

const browser = await chromium.launch({ headless:true })
const context = await browser.newContext({ viewport:{ width:1680, height:1280 }, acceptDownloads:true })
const page = await context.newPage()

try {
  await login(page, '/receituario-vet/nova-receita-2')
  await page.waitForURL(/receituario-vet\/nova-receita-2/, { timeout:30000 })
  result.routeLoaded = true

  await page.evaluate(async ({ clinicId, formulaName }) => {
    const rxModule = await import('/modules/receituario-vet/NovaReceita2Page.tsx')
    const v1Module = await import('/modules/receituario-vet/manipuladosV1.ts')
    const mapperModule = await import('/modules/receituario-vet/manipuladosV1Mapper.ts')
    const base = v1Module.createEmptyManipuladoV1(clinicId)
    const formula = v1Module.normalizeManipuladoV1({
      ...base,
      identity: { ...base.identity, clinic_id: clinicId, name: formulaName, slug: formulaName, pharmaceutical_form: 'Petisco', primary_route: 'ORAL', species_scope: 'cao', indication_summary: 'Teste de reatividade' },
      prescribing: { ...base.prescribing, posology_mode: 'mg_per_kg_dose', dose_min: 5, dose_max: 10, dose_unit: 'mg', frequency_mode: 'q12h', frequency_label: 'a cada 12 horas', duration_value: 14, duration_unit: 'dias', duration_label: '14 dias' },
      pharmacy: { ...base.pharmacy, qsp_text: '30 unidades', total_quantity: '30 unidades', final_unit: 'petiscos', flavor_mode: 'Frango', base_text: 'Petisco hipoalergenico' },
      ingredients: [{ id: crypto.randomUUID(), name: 'Benazepril', quantity: 5, unit: 'mg/kg/dose', role: 'active', rule: 'per_kg', note: '', min_quantity: 5, max_quantity: 10, weight_range_text: '' }],
    })
    const item = mapperModule.mapManipuladoV1ToPrescriptionItem({ formula, patient: { id:'p1', name:'Paciente E2E', species:'Canina', weight_kg:5 }, defaultStartDate:'2026-04-03', defaultStartHour:'06:00', targetDose:7.5 })
    const state = rxModule.normalizeNovaReceita2State({
      id: `rx2-repro-${Date.now()}`,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), prescriber: null,
      tutor: { id:'t1', name:'Tutor E2E Manipulados', cpf:'', rg:'', address:'', phone:'', email:'' },
      patient: { id:'p1', name:'Paciente E2E', species:'Canina', breed:'', sex:'', age:'', weight_kg:5 },
      quickMode:false, templateId:'modern-dark', printTemplateId:'modern-dark', defaultStartDate:'2026-04-03', defaultStartHour:'06:00', recommendations:'', examJustification:'', exams:[], items:[item],
    })
    localStorage.setItem(`rx_draft_v2:${clinicId}`, JSON.stringify(state))
  }, { clinicId: seed.clinicId, formulaName })

  await page.goto(`${appUrl}/receituario-vet/nova-receita-2`, { waitUntil:'networkidle' })
  await page.waitForTimeout(1200)
  const card = page.locator('[data-testid^="rx-item-"]').first()
  await card.waitFor({ timeout: 30000 })
  result.hasEditDoseButtonNova = await card.getByRole('button', { name:/Editar dose/i }).count().then(c=>c>0)
  const previewSheet = page.locator('[data-rx-print-canvas="sheet"]').first()
  result.beforeNova = await previewSheet.innerText()
  await shot(page, 'repro-before-nova.png')

  const selects = card.locator('select')
  await selects.nth(1).selectOption('times_per_day')
  await page.waitForTimeout(150)
  await selects.nth(2).selectOption('3')
  await selects.nth(3).selectOption('fixed_days')
  const durationInput = card.locator('input[placeholder="Ex: 7"]').first()
  await durationInput.fill('4')
  await page.waitForTimeout(1200)
  result.afterNova = await previewSheet.innerText()
  result.novaPreviewChanged = result.beforeNova !== result.afterNova && /3x ao dia|4 dias|12 horas|8 horas/i.test(result.afterNova)
  await shot(page, 'repro-after-nova.png')

  await page.getByRole('button', { name:/Revisar/i }).first().click()
  await page.waitForURL(/nova-receita-2-print\?mode=review/, { timeout:30000 })
  await page.waitForTimeout(1200)
  result.reviewLoaded = true
  const reviewSheet = page.locator('[data-rx-print-canvas="sheet"]').first()
  result.beforeReview = await reviewSheet.innerText()
  result.hasEditDoseButtonReview = await page.getByRole('button', { name:/Editar dose/i }).count().then(c=>c>0)
  await shot(page, 'repro-before-review.png')

  const itemTitle = page.locator('text=' + formulaName).first()
  await itemTitle.click()
  await page.waitForTimeout(500)
  const aside = page.locator('aside').last()
  const reviewSelects = aside.locator('select')
  await reviewSelects.nth(1).selectOption('everyHours')
  const intervalInput = aside.locator('input').nth(3)
  await intervalInput.fill('8')
  const durationDaysInput = aside.locator('input').nth(4)
  await durationDaysInput.fill('4')
  await page.waitForTimeout(1200)
  result.afterReview = await reviewSheet.innerText()
  result.reviewPreviewChanged = result.beforeReview !== result.afterReview && /8 horas|4 dias/i.test(result.afterReview)
  await shot(page, 'repro-after-review.png')
  result.ok = true
} catch (error) {
  result.error = error instanceof Error ? error.message : String(error)
  await shot(page, 'repro-fatal.png').catch(()=>{})
} finally {
  fs.writeFileSync(path.join(baseDir, 'compounded-edit-repro-before-fix.json'), JSON.stringify(result, null, 2))
  await context.close(); await browser.close()
}
console.log(JSON.stringify(result, null, 2))
