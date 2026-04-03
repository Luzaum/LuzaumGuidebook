import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'
const appUrl='http://127.0.0.1:4173'
const baseDir='C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir=path.join(baseDir,'shots')
const resultFile=path.join(baseDir,'netlify-reference-fix-proof.json')
const seed=JSON.parse(fs.readFileSync(path.join(baseDir,'seed.json'),'utf8'))
fs.mkdirSync(shotsDir,{recursive:true})
const result={ok:false,routeLoaded:false,reviewRendered:false,hasReferenceError:false,consoleErrors:[],pageErrors:[],shot:''}
const browser=await chromium.launch({headless:true})
const context=await browser.newContext({viewport:{width:1600,height:1200}})
const page=await context.newPage()
page.on('console', msg => {
  if (msg.type() === 'error') result.consoleErrors.push(msg.text())
})
page.on('pageerror', err => {
  result.pageErrors.push(String(err.message || err))
})
try {
  await page.goto(`${appUrl}/login?next=${encodeURIComponent('/receituario-vet/nova-receita-2')}`, {waitUntil:'networkidle'})
  await page.getByLabel(/Email/i).fill(seed.email)
  await page.locator('#login-password').fill(seed.password)
  await page.getByRole('button',{name:/^Entrar$/}).click()
  await page.waitForURL(/receituario-vet\/nova-receita-2/, {timeout:30000})

  await page.evaluate(async () => {
    const rxModule = await import('/modules/receituario-vet/NovaReceita2Page.tsx')
    const v1Module = await import('/modules/receituario-vet/manipuladosV1.ts')
    const mapperModule = await import('/modules/receituario-vet/manipuladosV1Mapper.ts')

    const base = v1Module.createEmptyManipuladoV1('84b02794-c6fc-4303-aaa0-17880d42b32f')
    const formula = v1Module.normalizeManipuladoV1({
      ...base,
      identity: {
        ...base.identity,
        name: 'Prova bundle review',
        pharmaceutical_form: 'Petisco',
        primary_route: 'ORAL',
        species_scope: 'cao',
      },
      prescribing: {
        ...base.prescribing,
        posology_mode: 'fixed_per_animal',
        dose_min: 1,
        dose_max: 1,
        dose_unit: 'dose',
        frequency_mode: 'q12h',
        frequency_label: 'a cada 12 horas',
        duration_value: 7,
        duration_unit: 'dias',
        duration_label: '7 dias',
      },
      pharmacy: {
        ...base.pharmacy,
        qsp_text: '30 unidades',
        total_quantity: '30 unidades',
        final_unit: 'petiscos',
      },
      ingredients: [{
        id: crypto.randomUUID(),
        name: 'Benazepril',
        quantity: 2.5,
        unit: 'mg',
        role: 'active',
        rule: 'fixed',
        note: '',
      }],
    })

    const item = mapperModule.mapManipuladoV1ToPrescriptionItem({
      formula,
      patient: { id: 'p1', name: 'Paciente E2E', species: 'Canina', weight_kg: 5 },
      selectedDose: 1,
      startDate: '2026-04-03',
      startHour: '08:00',
    })

    const state = rxModule.normalizeNovaReceita2State({
      id: `rx2-proof-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      prescriber: null,
      tutor: { id: 't1', name: 'Tutor E2E', cpf: '', rg: '', address: '', phone: '', email: '' },
      patient: { id: 'p1', name: 'Paciente E2E', species: 'Canina', breed: '', sex: 'Macho', reproductive_condition: 'Não castrado', age_text: '5 anos', weight_kg: 5 },
      items: [item],
      recommendations: '',
      exams: [],
      examJustification: '',
      printTemplateId: 'rx_classic_vertical_v1',
      templateId: 'rx_classic_vertical_v1',
      defaultStartDate: '2026-04-03',
      defaultStartHour: '08:00',
    })
    sessionStorage.setItem('vetius:rx2:review-draft', JSON.stringify(state))
  })

  await page.goto(`${appUrl}/receituario-vet/nova-receita-2-print?mode=review`, {waitUntil:'networkidle'})
  result.routeLoaded = true
  await page.locator('[data-rx-print-canvas="sheet"]').first().waitFor({timeout:30000})
  result.reviewRendered = true
  const shotFile = path.join(shotsDir, 'netlify-reference-fix-review.png')
  await page.screenshot({path: shotFile, fullPage: true})
  result.shot = shotFile
  result.hasReferenceError = result.consoleErrors.some(t => t.includes('Cannot access')) || result.pageErrors.some(t => t.includes('Cannot access'))
  result.ok = result.reviewRendered && !result.hasReferenceError
} catch (error) {
  result.pageErrors.push(String(error?.message || error))
} finally {
  fs.writeFileSync(resultFile, JSON.stringify(result,null,2))
  await context.close(); await browser.close(); console.log(JSON.stringify(result,null,2))
}
