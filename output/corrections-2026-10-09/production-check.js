async (page) => {
  const results = [];
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({width:1440,height:1000});
  for (const [path, heading] of [['/', null], ['/calculadora-energetica', 'Acompanhamento nutricional baseado em evidências']]) {
    const start = Date.now();
    await page.goto('http://127.0.0.1:4189'+path, {waitUntil:'domcontentloaded',timeout:60000});
    if (heading) await page.getByRole('heading',{name:heading,exact:true}).waitFor({timeout:60000});
    else await page.locator('main h1').first().waitFor({timeout:60000});
    const contentReadyMs = Date.now()-start;
    if (heading) await page.getByText(/\d+ alimentos e micronutrientes/).waitFor({timeout:60000});
    results.push({path,contentReadyMs,catalogReadyMs:Date.now()-start,...await page.evaluate(()=>({resources:performance.getEntriesByType('resource').length,encodedBytes:performance.getEntriesByType('resource').reduce((n,e)=>n+(e.encodedBodySize||0),0),overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth}))});
  }
  await page.goto('http://127.0.0.1:4189/login?error_description=%25',{waitUntil:'domcontentloaded'});
  await page.getByRole('textbox',{name:'Usuário ou e-mail *',exact:true}).waitFor();
  const login = {rendered:true,showsPercent:(await page.locator('body').innerText()).includes('%'),pageErrors:[...errors]};
  await page.screenshot({path:'output/playwright/vetius-corrections-login.png',fullPage:true});
  const mobileContext = await page.context().browser().newContext({viewport:{width:390,height:844}});
  try {
    const mobile = await mobileContext.newPage();
    mobile.on('pageerror',error=>errors.push(error.message));
    const start=Date.now();
    await mobile.goto('http://127.0.0.1:4189/calculadora-energetica',{waitUntil:'domcontentloaded',timeout:60000});
    await mobile.getByRole('heading',{name:'Acompanhamento nutricional baseado em evidências',exact:true}).waitFor({timeout:60000});
    results.push({path:'/calculadora-energetica',viewport:'390x844',contentReadyMs:Date.now()-start,overflow:await mobile.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth)});
    await mobile.screenshot({path:'output/playwright/vetius-corrections-nutrition-mobile.png',fullPage:true});
  } finally {await mobileContext.close();}
  return {results,login,pageErrors:errors};
}
