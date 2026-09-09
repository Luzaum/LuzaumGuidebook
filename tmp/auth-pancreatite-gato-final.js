async page => {
  const title='Pancreatite — Gato (após estabilização)';
  await page.goto('http://localhost:5173/consulta-vet/receituario');
  const search=page.getByRole('textbox',{name:'Doença, condição ou medicamento...'});
  await search.waitFor({state:'visible',timeout:45000});
  await search.fill(title);
  const card=page.getByRole('article').filter({hasText:title}).first();
  await card.getByRole('button',{name:'Usar modelo'}).click();
  await page.getByRole('textbox',{name:/Peso do paciente em quilogramas/}).fill('4');
  await page.getByRole('button',{name:'Calcular e abrir receita'}).click();
  const region=page.getByRole('region',{name:'Configuração clínica do modelo'});
  const buttons=region.getByRole('button'); const cases=[];
  for(let i=0;i<await buttons.count();i++){
    const pressed=await buttons.evaluateAll(ns=>ns.map((n,j)=>({j,pressed:n.getAttribute('aria-pressed')==='true'})).filter(x=>x.pressed));
    for(const p of pressed) await buttons.nth(p.j).click();
    const option=(await buttons.nth(i).innerText()).replace(/\s+/g,' ').trim();
    await buttons.nth(i).click(); await page.waitForTimeout(1200);
    const body=await page.getByRole('textbox',{name:'Corpo editável do documento'}).inputValue();
    cases.push({option,doseError:/ERRO DE DOSE|NaN|Infinity/i.test(body),placeholders:(body.match(/A PREENCHER/g)||[]).length,medicationLines:body.split('\n').filter(l=>/^\d+\.\s/.test(l))});
  }
  return {scope:'Fluxo autenticado real, paciente felino fictício de 4 kg, sem emissão',title,options:cases.length,problems:cases.filter(x=>x.doseError||x.placeholders),cases};
}
