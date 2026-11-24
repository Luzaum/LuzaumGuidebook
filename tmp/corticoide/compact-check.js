async (page) => {
  const check = (ok, message) => { if (!ok) throw new Error(message) }
  await page.getByRole('heading', { name: 'Resultado da conversão' }).waitFor({ timeout: 120000 })
  const scene = page.locator('.cc-simulation-scene')
  check(await page.locator('#cc-result .cc-simulation-scene').count() === 1, 'Animação fora do card')
  check(await page.locator('.cc-hero img').count() === 0, 'Ícone no cabeçalho')
  check(await page.getByText('Antes de trocar', {exact:true}).count() === 0, 'Seção antiga')
  const dose = page.getByRole('textbox', {name:'Dose de origem',exact:true})
  await dose.fill('10')
  check((await page.locator('.cc-number').innerText()).includes('1,5'), 'Resultado não atualizou')
  await page.waitForFunction(() => document.querySelector('.cc-simulation-scene g[opacity="0"]') !== null, {timeout:1000})
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({width,height:844})
    check(await page.evaluate(() => {
      const app = document.querySelector('.corticoid-app')
      const scene = document.querySelector('.cc-simulation-scene')
      return app.scrollWidth <= app.clientWidth + 1 && scene.getBoundingClientRect().width <= 131
    }), 'Layout em ' + width)
  }
  await page.setViewportSize({width:390,height:844})
  await page.locator('#cc-result').screenshot({path:'output/playwright/corticoide-compact-result.png'})
  await page.emulateMedia({reducedMotion:'reduce'})
  await dose.fill('15')
  check(await scene.isVisible(), 'Sem ilustração estática em movimento reduzido')
  await page.getByRole('combobox',{name:'Para',exact:true}).selectOption('docp')
  check(await page.getByText('Sem equivalência direta',{exact:true}).isVisible(), 'Bloqueio ausente')
  check(await scene.count() === 0, 'Animação em conversão bloqueada')
  return 'Resultado, animação compacta, bloqueio e quatro larguras conferidos'
}
