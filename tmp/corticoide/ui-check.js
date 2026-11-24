async (page) => {
 const check = (ok, msg) => { if (!ok) throw new Error(msg) };
 await page.screenshot({path:'output/playwright/corticoide-desktop.png',fullPage:true});
 await page.getByRole('combobox',{name:'Unidade',exact:true}).selectOption('mg/kg');
 await page.getByLabel('Dose de origem',{exact:true}).fill('0,5');
 await page.getByLabel('Peso do paciente (kg)',{exact:true}).fill('10');
 await page.getByLabel('Concentração de dexametasona (mg/mL)',{exact:true}).fill('2');
 check((await page.locator('.cc-number').innerText()).includes('0,075'),'mg/kg conversion');
 check((await page.locator('.cc-volume').innerText()).includes('0,375 mL'),'volume conversion');
 await page.getByRole('combobox',{name:'Tipo de apresentação',exact:true}).selectOption('depot');
 check(await page.getByText('Sem equivalência direta',{exact:true}).isVisible(),'depot block');
 check(await page.locator('.cc-number').count()===0,'stale result');
 await page.getByRole('combobox',{name:'Tipo de apresentação',exact:true}).selectOption('systemic');
 await page.getByRole('combobox',{name:'Para',exact:true}).selectOption('docp');
 check(await page.getByText('Sem equivalência direta',{exact:true}).isVisible(),'DOCP block');
 await page.getByRole('button',{name:'Limpar',exact:true}).click();
 await page.getByLabel('Concentração de dexametasona (mg/mL)',{exact:true}).fill('2');
 await page.getByRole('button',{name:'Inverter fármacos',exact:true}).click();
 check(await page.getByRole('combobox',{name:'De',exact:true}).inputValue()==='dexametasona','swap source');
 check(await page.getByLabel('Concentração de prednisolona (mg/mL)',{exact:true}).inputValue()==='','swap clears concentration');
 await page.getByRole('button',{name:'Limpar',exact:true}).click();
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:'output/playwright/corticoide-mobile.png',fullPage:true});
 check(await page.evaluate(()=>document.documentElement.scrollWidth <= window.innerWidth),'mobile overflow');
 await page.getByRole('button',{name:'Ativar modo escuro',exact:true}).click();
 await page.screenshot({path:'output/playwright/corticoide-mobile-dark.png',fullPage:true});
 return ('PASS: mg/kg, peso, volume, depósito, DOCP, inversão, concentração, mobile sem overflow, tema escuro.');
}

