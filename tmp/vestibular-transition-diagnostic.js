async page => {
  await page.goto('http://localhost:5188/tmp/receituario-review.html');
  const menu=page.getByRole('combobox',{name:'Modelo',exact:true});
  await menu.selectOption('seed-sindrome-vestibular-cao');
  await page.getByRole('combobox',{name:'Espécie',exact:true}).selectOption('cão');
  await page.getByRole('textbox',{name:'Peso',exact:true}).fill('10');
  let region=page.getByRole('region',{name:'Configuração clínica do modelo'});
  let buttons=region.getByRole('button');
  for(let index=0;index<await buttons.count();index++){
    const states=await buttons.evaluateAll(ns=>ns.map((n,i)=>({i,pressed:n.getAttribute('aria-pressed')==='true'})));
    for(const s of states.filter(x=>x.pressed)) await buttons.nth(s.i).click({force:true});
    await buttons.nth(index).click({force:true});
    await page.waitForTimeout(1200);
  }
  await menu.selectOption('seed-sindrome-vestibular-gato');
  await page.getByRole('combobox',{name:'Espécie',exact:true}).selectOption('gato');
  await page.getByRole('textbox',{name:'Peso',exact:true}).fill('4');
  region=page.getByRole('region',{name:'Configuração clínica do modelo'}); buttons=region.getByRole('button');
  const states=await buttons.evaluateAll(ns=>ns.map((n,i)=>({i,pressed:n.getAttribute('aria-pressed')==='true'})));
  for(const s of states.filter(x=>x.pressed)) await buttons.nth(s.i).click({force:true});
  await buttons.nth(0).click({force:true});
  await page.waitForTimeout(1500);
  const body=await page.locator('.receituario-a4-wrapper').innerText();
  return {matches:body.split('\n').filter(l=>/A PREENCHER|APRESENTAÇÃO A SELECIONAR|ERRO DE DOSE/i.test(l)), meds:body.split('\n').filter(l=>/MAROPITANT|ONDANSETRONA|MECLIZINA|PREENCHER|ERRO DE DOSE/i.test(l)), overrides:JSON.parse(await page.getByTestId('overrides').textContent())};
}

