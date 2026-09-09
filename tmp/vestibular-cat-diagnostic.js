async page => {
  await page.goto('http://localhost:5188/tmp/receituario-review.html');
  const menu=page.getByRole('combobox',{name:'Modelo',exact:true});
  await menu.selectOption('seed-sindrome-vestibular-gato');
  await page.getByRole('combobox',{name:'Espécie',exact:true}).selectOption('gato');
  await page.getByRole('textbox',{name:'Peso',exact:true}).fill('4');
  const region=page.getByRole('region',{name:'Configuração clínica do modelo'});
  const buttons=region.getByRole('button');
  const states=await buttons.evaluateAll(nodes=>nodes.map((n,i)=>({i,pressed:n.getAttribute('aria-pressed')==='true'})));
  for(const state of states.filter(x=>x.pressed)) await buttons.nth(state.i).click({force:true});
  await buttons.nth(0).click({force:true});
  await page.waitForTimeout(1200);
  const body=await page.locator('.receituario-a4-wrapper').innerText();
  return {matches: body.split('\n').filter(line=>/A PREENCHER|APRESENTAÇÃO A SELECIONAR|ERRO DE DOSE/i.test(line)), body};
}
