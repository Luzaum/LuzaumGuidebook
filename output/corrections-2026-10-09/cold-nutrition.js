async (page) => {
  const results=[];
  for(let i=0;i<3;i++) {
    const context=await page.context().browser().newContext({viewport:{width:1440,height:1000}});
    try {
      const target=await context.newPage();
      const errors=[];
      target.on('pageerror',error=>errors.push(error.message));
      const start=Date.now();
      await target.goto('http://127.0.0.1:4189/calculadora-energetica',{waitUntil:'domcontentloaded',timeout:60000});
      await target.getByRole('heading',{name:'Acompanhamento nutricional baseado em evidências',exact:true}).waitFor({timeout:60000});
      const contentReadyMs=Date.now()-start;
      await target.getByText(/\d+ alimentos e micronutrientes/).waitFor({timeout:60000});
      results.push({run:i+1,contentReadyMs,catalogReadyMs:Date.now()-start,pageErrors:errors,...await target.evaluate(()=>({resources:performance.getEntriesByType('resource').length,encodedBytes:performance.getEntriesByType('resource').reduce((sum,e)=>sum+(e.encodedBodySize||0),0)}))});
    } finally {await context.close();}
  }
  return results;
}
