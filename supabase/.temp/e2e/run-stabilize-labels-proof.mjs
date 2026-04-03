import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'
const appUrl='http://127.0.0.1:5173'
const baseDir='C:/PROJETOS VET/Vetius/supabase/.temp/e2e'
const shotsDir=path.join(baseDir,'shots')
const resultFile=path.join(baseDir,'stabilize-labels-proof.json')
const seed=JSON.parse(fs.readFileSync(path.join(baseDir,'seed.json'),'utf8'))
fs.mkdirSync(shotsDir,{recursive:true})
const badTokens=['Respons?vel','Orienta??es','Classifica??o','CAT?LOGO ATIVO','Cat?logo','? receita','Nova Receita 2.0','Protocolos 3.0']
const result={ok:false,checked:[],labelsOk:false,mojibakeVisible:false,log:[]}
const push=(step,data={})=>result.log.push({step,time:new Date().toISOString(),...data})
async function shot(page,name){const file=path.join(shotsDir,name); await page.screenshot({path:file,fullPage:true}); push('shot',{file})}
async function login(page,nextPath){
  for(let attempt=0; attempt<3; attempt++){
    await page.goto(`${appUrl}/login?next=${encodeURIComponent(nextPath)}`, {waitUntil:'networkidle'})
    await page.getByLabel(/Email/i).fill(seed.email)
    await page.locator('#login-password').fill(seed.password)
    await page.getByRole('button',{name:/^Entrar$/}).click()
    try {
      await page.waitForURL(new RegExp(nextPath.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')), { timeout: 20000 })
      return
    } catch {}
  }
  throw new Error('Falha ao autenticar para a prova de labels')
}
const browser=await chromium.launch({headless:true})
const context=await browser.newContext({viewport:{width:1600,height:1200}})
const page=await context.newPage()
try {
  await login(page,'/receituario-vet')
  const routes=[
    {url:'/receituario-vet',name:'hub',must:['Nova Receita','Protocolos']},
    {url:'/receituario-vet/nova-receita-2',name:'nova-receita',must:['Nova Receita']},
    {url:'/receituario-vet/manipulados',name:'manipulados',must:['Manipulados V1.0']},
    {url:'/receituario-vet/protocolos-3',name:'protocolos',must:['Protocolos']},
  ]
  for(const route of routes){
    await page.goto(`${appUrl}${route.url}`, {waitUntil:'networkidle'})
    const body=await page.locator('body').innerText()
    const found=badTokens.filter(t=>body.includes(t))
    const missing=route.must.filter(t=>!body.includes(t))
    result.checked.push({route:route.name,found,missing})
    await shot(page,`stabilize-labels-${route.name}.png`)
  }
  result.labelsOk=result.checked.every(entry=>entry.missing.length===0)
  result.mojibakeVisible=result.checked.some(entry=>entry.found.length>0)
  result.ok=result.labelsOk && !result.mojibakeVisible
} catch(error){push('fatal',{message:error instanceof Error?error.message:String(error)})}
finally{
  fs.writeFileSync(resultFile, JSON.stringify(result,null,2))
  await context.close(); await browser.close(); console.log(JSON.stringify(result,null,2))
}
