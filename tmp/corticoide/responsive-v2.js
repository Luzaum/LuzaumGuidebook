async (page) => {
  const check = (condition, message) => { if (!condition) throw new Error(message) }
  const report = []
  await page.getByRole('heading', {name:'Conversor de corticóide',exact:true}).waitFor({timeout:120000})
  for (const [width, height] of [[320,740],[390,844],[667,375],[768,1024],[1024,768],[1440,1000],[1920,1080]]) {
    await page.setViewportSize({width,height})
    const geometry = await page.evaluate(() => {
      const app=document.querySelector('.corticoid-app'), main=document.querySelector('main'), wrap=document.querySelector('.cc-wrap')
      return {app:app.getBoundingClientRect().width,main:main.getBoundingClientRect().width,overflow:app.scrollWidth>app.clientWidth+1,doc:document.documentElement.scrollWidth>innerWidth+1,wrap:wrap.getBoundingClientRect().width}
    })
    check(!geometry.overflow && !geometry.doc,`Overflow ${width}: ${JSON.stringify(geometry)}`)
    check(Math.abs(geometry.app-geometry.main)<2,`App doesn't fill parent at ${width}`)
    report.push({width,height,...geometry})
    if ([390,768,1440].includes(width)) {
      await page.locator('.cc-hero').scrollIntoViewIfNeeded()
      await page.screenshot({path:`output/playwright/corticoide-v2-${width}.png`})
    }
  }
  await page.setViewportSize({width:1440,height:1000})
  await page.getByRole('button',{name:'Simular conversão',exact:true}).click()
  await page.waitForFunction(()=>Number(document.querySelector('[role="progressbar"]').getAttribute('aria-valuenow'))>=45)
  await page.getByRole('button',{name:'Pausar',exact:true}).click()
  const paused=await page.getByRole('progressbar').getAttribute('aria-valuenow')
  await page.waitForTimeout(150)
  check(await page.getByRole('progressbar').getAttribute('aria-valuenow')===paused,'Pause changed progress')
  await page.locator('.cc-simulation').screenshot({path:'output/playwright/corticoide-v2-animation-mid.png'})
  await page.getByRole('button',{name:'Continuar',exact:true}).click()
  await page.getByRole('button',{name:'Reproduzir novamente',exact:true}).waitFor({timeout:20000})
  check(await page.getByRole('progressbar').getAttribute('aria-valuenow')==='100','Completion')
  await page.locator('.cc-simulation').screenshot({path:'output/playwright/corticoide-v2-animation-end.png'})
  await page.getByRole('button',{name:'Reiniciar simulação',exact:true}).click()
  check(await page.getByRole('progressbar').getAttribute('aria-valuenow')==='0','Reset')
  await page.getByRole('button',{name:'Simular conversão',exact:true}).click()
  await page.getByRole('textbox',{name:'Dose de origem',exact:true}).fill('10')
  check(await page.getByRole('progressbar').getAttribute('aria-valuenow')==='0','Input change did not reset animation')
  check((await page.locator('.cc-simulation-labels').innerText()).includes('1,5 mg'),'Dynamic dose label')
  await page.getByRole('combobox',{name:'Para',exact:true}).selectOption('docp')
  check(await page.getByRole('button',{name:'Simular conversão',exact:true}).isDisabled(),'Unsupported allowed animation')
  await page.getByRole('button',{name:'Limpar',exact:true}).click()
  await page.emulateMedia({reducedMotion:'reduce'})
  await page.getByRole('button',{name:'Mostrar resultado visual',exact:true}).click()
  check(await page.getByRole('progressbar').getAttribute('aria-valuenow')==='100','Reduced motion final state')
  await page.setViewportSize({width:390,height:844})
  await page.getByRole('button',{name:'Ativar modo escuro',exact:true}).click()
  await page.locator('.cc-simulation').scrollIntoViewIfNeeded()
  await page.screenshot({path:'output/playwright/corticoide-v2-mobile-dark.png'})
  await page.getByText('Tabela de equivalências e método de cálculo',{exact:true}).click()
  check(await page.evaluate(()=>document.querySelector('.corticoid-app').scrollWidth<=document.querySelector('.corticoid-app').clientWidth+1),'Table expands app')
  return {report,animation:'play / pause / resume / finish / reset / input reset passed',blocked:'passed',reducedMotion:'passed',dark:'passed'}
}
