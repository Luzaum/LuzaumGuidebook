async page => {
  const menu = page.getByRole('combobox', { name: 'Modelo', exact: true });
  await menu.waitFor({state:'visible'}); const entries = await menu.locator('option').evaluateAll(options => options.map(option => ({id:option.value,title:option.textContent})));
  const results = [];
  for (const entry of entries.slice(0, 10)) {
    await menu.selectOption(entry.id);
    await page.getByRole('combobox', {name:'Espécie',exact:true}).selectOption(/gat|felin/i.test(entry.title)?'gato':'cão');
    await page.getByRole('textbox',{name:'Peso',exact:true}).fill(/gat|felin/i.test(entry.title)?'4':'10');
    const region = page.getByRole('region', {name:'Configuração clínica do modelo'});
    const count = await region.getByRole('button').count();
    let selected=0;
    for(let i=0;i<count;i++){
      const button=region.getByRole('button').nth(i);
      if(await button.isEnabled() && await button.getAttribute('aria-pressed')!=='true')await button.click({force:true});
      selected++;
      await page.evaluate(()=>new Promise(requestAnimationFrame));
      const body=(await page.locator('.receituario-a4-wrapper').innerText());
      if(/\bNaN\b|\bInfinity\b/.test(body))throw new Error(entry.title+': cálculo não finito');
    }
    const body=await page.locator('.receituario-a4-wrapper').innerText();
    results.push({id:entry.id,title:entry.title,optionsVisited:selected,pages:await page.locator('article').count(),requiresCompletion:/A PREENCHER|ERRO DE DOSE/.test(body)});
  }
  await page.evaluate(data => { window.__receituarioReview = data; }, results); return results;
}
