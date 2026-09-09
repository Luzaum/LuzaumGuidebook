async page => {
 const entries=QUERIES;
 const results=[];
 const c=page.locator('[data-testid=prescription-medication-composer]');
 for(const entry of entries){
  const result={...entry,cases:[]};
  try{
   if(await c.getByRole('button',{name:'Trocar medicamento',exact:true}).count()) await c.getByRole('button',{name:'Trocar medicamento',exact:true}).click({force:true});
   await c.getByRole('searchbox').fill(entry.query);
   const hit=c.getByRole('button').filter({hasText:entry.query}).first();
   await hit.waitFor({state:'visible',timeout:8000}); result.selected=await hit.innerText(); await hit.click({force:true});
   const forms=c.getByRole('combobox',{name:'Apresentação e concentração',exact:true});
   await forms.waitFor({timeout:8000});
   const options=await forms.locator('option').evaluateAll(nodes=>nodes.map(n=>({value:n.value,label:n.textContent})).filter(n=>n.value));
   for(const species of ['gato','cão']){
    await page.getByRole('combobox',{name:'Espécie',exact:true}).selectOption(species);
    await forms.waitFor({timeout:8000});
    const doseMenu=c.getByRole('combobox',{name:'Dose ou modo de uso',exact:true});
    if(!await doseMenu.count()){result.cases.push({species,status:'sem dose estruturada'});continue;}
    const doses=await doseMenu.locator('option').evaluateAll(nodes=>nodes.map(n=>({value:n.value,label:n.textContent})).filter(n=>n.value && n.value!=='manual'));
    for(const dose of doses){
     await doseMenu.selectOption(dose.value);
     const number=c.getByRole('spinbutton',{name:/Dose para o cálculo/});
     if(await number.count()){
      const min=dose.label.match(/•\s*([\d.,]+)/)?.[1];
      if(min) await number.fill(min.replace(',','.'));
     }
     await c.getByRole('combobox',{name:/^Frequência/}).selectOption({label:'A cada 8 horas'});
     await c.getByRole('combobox',{name:/^Duração/}).selectOption('custom');
     await c.getByRole('textbox',{name:'Duração personalizada'}).fill('3 dias — TESTE DE INTERFACE, NÃO UTILIZAR');
     for(const form of options){
      await forms.selectOption(form.value);
      const confirm=c.getByRole('checkbox'); if(await confirm.count()) await confirm.first().check({force:true});
      const insert=c.getByRole('button',{name:'Inserir medicamento na receita',exact:true});
      const enabled=await insert.isEnabled();
      const item={species,dose:dose.label,presentation:form.label,inserted:enabled};
      if(enabled){
       await insert.click({force:true});
       await page.locator('[data-testid=added-prescription]').filter({hasText:/Administrar|Aplicar|Dar|Instilar/}).waitFor({state:'attached',timeout:3000});
       item.block=await page.locator('[data-testid=added-prescription]').textContent();
       item.invalidNumber=/NaN|Infinity/.test(item.block);
      }else item.context=(await c.innerText()).slice(-1300);
      result.cases.push(item);
     }
    }
   }
  }catch(error){result.error=String(error).slice(0,350);}
  results.push(result);
 }
 return {scope:'Interações automatizadas na interface real isolada; frequência/duração são dados fictícios de teste, não recomendações clínicas',results};
}
