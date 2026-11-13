async (page) => {
  const base='http://127.0.0.1:4181';
  page.setDefaultTimeout(60000);
  const user={id:'11111111-1111-4111-8111-111111111111',aud:'authenticated',role:'authenticated',email:'smoke@example.invalid',user_metadata:{name:'Teste local'},app_metadata:{provider:'email'},created_at:new Date().toISOString()};
  const session={access_token:'local-test-token',refresh_token:'local-test-refresh',token_type:'bearer',expires_in:3600,expires_at:Math.floor(Date.now()/1000)+3600,user};
  await page.route('**/auth/v1/**',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(route.request().url().includes('/token') ? session : user)}));
  await page.route('**/rest/v1/**',route=>route.fulfill({status:200,contentType:'application/json',body:'[]'}));
  await page.goto(base+'/login',{waitUntil:'domcontentloaded'});
  await page.getByLabel('Usuário ou e-mail').fill('smoke@example.invalid');
  await page.getByLabel('Senha',{exact:false}).first().fill('local-test-password');
  await page.getByRole('button',{name:'Entrar',exact:true}).click();
  await page.waitForURL(base+'/consulta-vet');
  await page.setViewportSize({width:1440,height:1000});
  await page.getByRole('heading',{name:'Vetius',exact:true}).waitFor();
  await page.waitForFunction(()=>Array.from(document.images).filter(i=>i.src.includes(location.origin)).every(i=>i.complete&&i.naturalWidth>0));
  await page.screenshot({path:'output/playwright/vetius-home-desktop.png'});
  await page.getByRole('button',{name:'Esconder barra lateral',exact:true}).click();
  await page.locator('aside[data-collapsed="true"]').waitFor();
  await page.getByRole('button',{name:'Mostrar barra lateral',exact:true}).click();
  await page.goto(base+'/consulta-vet/referencias-rapidas',{waitUntil:'domcontentloaded'});
  await page.getByRole('heading',{name:'Mini-apps',exact:true}).waitFor();
  await page.waitForFunction(()=>Array.from(document.images).filter(i=>i.src.includes(location.origin)).every(i=>i.complete&&i.naturalWidth>0));
  await page.waitForFunction(()=>Array.from(document.querySelectorAll('section[aria-labelledby=reference-apps-title] a')).every(a=>getComputedStyle(a.parentElement).opacity==='1'));
  await page.locator('section[aria-labelledby=reference-apps-title] img').evaluateAll(async images => { await Promise.all(images.map(image => image.decode())); await new Promise(resolve => requestAnimationFrame(()=>requestAnimationFrame(resolve))); });
  await page.screenshot({path:'output/playwright/vetius-mini-apps-desktop.png'});
  await page.setViewportSize({width:390,height:844});
  await page.waitForFunction(()=>document.querySelector('.consulta-vet-sidebar-panel').getBoundingClientRect().right<=1);
  await page.screenshot({path:'output/playwright/vetius-mini-apps-mobile.png'});
  await page.getByRole('button',{name:'Abrir menu lateral',exact:true}).click();
  await page.getByRole('img',{name:'Vetius — base clínica para consulta rápida',exact:true}).click();
  await page.waitForURL(base+'/consulta-vet');
  await page.evaluate(()=>localStorage.clear());
  await page.goto(base+'/login',{waitUntil:'domcontentloaded'});
  await page.unrouteAll();
  console.log('PASS: imagens carregadas, desktop/celular, recolher/expandir menu, logo retorna ao início.');
}


