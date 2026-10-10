async (page) => {
  const results=[];
  await page.context().addInitScript(()=>{
    window.__readyDiag={lcp:null,cls:0};
    new PerformanceObserver(l=>l.getEntries().forEach(e=>window.__readyDiag.lcp=e.startTime)).observe({type:'largest-contentful-paint',buffered:true});
    new PerformanceObserver(l=>l.getEntries().forEach(e=>{if(!e.hadRecentInput)window.__readyDiag.cls+=e.value})).observe({type:'layout-shift',buffered:true});
  });
  for(const device of ['desktop','mobile']){
    await page.setViewportSize(device==='desktop'?{width:1440,height:1000}:{width:390,height:844});
    for(let round=1;round<=3;round++){
      const cdp=await page.context().newCDPSession(page);
      await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
      const start=Date.now();
      await page.goto('http://127.0.0.1:4188/calculadora-energetica',{waitUntil:'load'});
      let ready=true;
      try{await page.waitForFunction(()=>document.body.innerText.length>300,{},{timeout:20000});}catch{ready=false;}
      const readyWallMs=Date.now()-start;
      await page.waitForTimeout(1000);
      results.push({device,round,ready,readyWallMs,...await page.evaluate(()=>({textLength:document.body.innerText.length,text:document.body.innerText.slice(0,350),fcpMs:performance.getEntriesByName('first-contentful-paint')[0]?.startTime,lcpMs:window.__readyDiag.lcp,cls:window.__readyDiag.cls,resourceBytes:performance.getEntriesByType('resource').reduce((s,x)=>s+x.encodedBodySize,0),overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth}))});
      await cdp.detach();
    }
  }
  await page.goto('http://127.0.0.1:4188/',{waitUntil:'load'});
  await page.getByRole('heading',{name:'Medicina Veterinária de Alta Precisão'}).waitFor({state:'visible'});
  await page.screenshot({path:'output/playwright/vetius-diagnostics-home-mobile.png',fullPage:true});
  return {results};
}
