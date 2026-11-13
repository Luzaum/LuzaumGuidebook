async (page) => {
  const base = 'http://127.0.0.1:4180';
  page.setDefaultNavigationTimeout(90000);
  page.setDefaultTimeout(60000);
  const check = (condition, label) => { if (!condition) throw new Error(label); };
  const user = {id:'11111111-1111-4111-8111-111111111111', aud:'authenticated', role:'authenticated', email:'smoke@example.invalid', email_confirmed_at:new Date().toISOString(), user_metadata:{name:'Teste local'}, app_metadata:{provider:'email'}, created_at:new Date().toISOString()};
  const session = {access_token:'local-test-token', refresh_token:'local-test-refresh', token_type:'bearer', expires_in:3600, expires_at:Math.floor(Date.now()/1000)+3600, user};
  let failPassword = true;
  let signupSession = false;
  let signupCount = 0;
  await page.unrouteAll();
  await page.goto(base+'/login', {waitUntil:'domcontentloaded'});
  await page.evaluate(() => localStorage.clear());
  await page.reload({waitUntil:'domcontentloaded'});
  await page.route('**/auth/v1/**', async route => {
    const url = new URL(route.request().url());
    if (url.pathname.endsWith('/token')) return route.fulfill({status:failPassword ? 400 : 200,contentType:'application/json',body:JSON.stringify(failPassword ? {error_code:'invalid_credentials',msg:'Invalid login credentials'} : session)});
    if (url.pathname.endsWith('/signup')) { signupCount++; return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(signupSession ? session : user)}); }
    if (url.pathname.endsWith('/user')) return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(user)});
    return route.fulfill({status:200,contentType:'application/json',body:'{}'});
  });
  await page.route('**/rest/v1/**', route => route.fulfill({status:200,contentType:'application/json',body:'[]'}));
  await page.goto(base+'/', {waitUntil:'domcontentloaded'});
  await page.waitForURL('**/login?next=%2Fconsulta-vet');
  await page.getByLabel('Usuário ou e-mail').fill('smoke@example.invalid');
  await page.getByLabel('Senha', {exact:false}).first().fill('local-test-password');
  await page.getByRole('button',{name:'Entrar',exact:true}).click();
  await page.getByRole('alert').filter({hasText:'Usuário ou senha incorretos.'}).waitFor();
  failPassword = false;
  await page.getByRole('button',{name:'Entrar',exact:true}).click();
  await page.waitForURL(base+'/consulta-vet');
  await page.getByRole('heading',{name:'Vetius',exact:true}).waitFor();
  await page.setViewportSize({width:1440,height:1000});
  await page.screenshot({path:'output/playwright/vetius-home-desktop.png'});
  await page.goto(base+'/consulta-vet/referencias-rapidas', {waitUntil:'domcontentloaded'});
  const destinations = ['/antibioticoterapia','/dor','/fluidoterapia-vet','/transfusao-sanguinea','/neurologia','/calculadora-energetica'];
  for (const dest of destinations) {
    const link = page.locator(`a[href="${dest}"]`).filter({has:page.locator('img')});
    await link.waitFor();
    check(await link.count()===1, 'Mini-app duplicado: '+dest);
  }
  check(await page.locator('a[href="/crivet"],a[href^="/hemogasovet"]').count()===0,'Módulo removido ainda disponível');
  await page.screenshot({path:'output/playwright/vetius-mini-apps-desktop.png'});
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:'output/playwright/vetius-mini-apps-mobile.png'});
  for (const dest of destinations) {
    await page.goto(base+'/consulta-vet/referencias-rapidas', {waitUntil:'domcontentloaded'});
    await page.locator(`a[href="${dest}"]`).filter({has:page.locator('img')}).click();
    await page.waitForURL(url => url.pathname.startsWith(dest));
    await page.getByRole('link',{name:'Mini-apps',exact:true}).first().waitFor();
    check(!(await page.locator('body').innerText()).includes('Página não encontrada'),'Página ausente: '+dest);
  }
  await page.evaluate(() => localStorage.clear());
  await page.goto(base+'/signup', {waitUntil:'domcontentloaded'});
  await page.getByLabel('E-mail', {exact:false}).fill('smoke@example.invalid');
  await page.getByLabel('Senha',{exact:false}).first().fill('local-test-password');
  await page.getByRole('button',{name:'Criar conta',exact:true}).click();
  await page.getByRole('status').filter({hasText:'Verifique seu e-mail'}).waitFor();
  signupSession=true;
  await page.reload({waitUntil:'domcontentloaded'});
  await page.getByLabel('E-mail', {exact:false}).fill('smoke@example.invalid');
  await page.getByLabel('Senha',{exact:false}).first().fill('local-test-password');
  await page.getByRole('button',{name:'Criar conta',exact:true}).click();
  await page.waitForURL(base+'/consulta-vet');
  check(signupCount===2,'Cadastro não exercitado nas duas modalidades');
  await page.evaluate(() => localStorage.clear());
  await page.goto(base+'/auth/callback?next=%2Fdor&error_description=Acesso%20cancelado');
  await page.waitForURL('**/login?next=%2Fdor&error_description=Acesso%20cancelado');
  await page.getByRole('alert').filter({hasText:'Acesso cancelado'}).waitFor();
  await page.unrouteAll();
  console.log('PASS: entrada protegida, erro de senha, login, home Vetius, seis links de Mini-apps, cadastro com confirmação, cadastro com sessão, erro OAuth. Autenticação simulada; nenhuma conta real criada.');
}


