async (page) => {
  const results = [];
  await page.context().addInitScript(() => {
    window.__diag = { lcp: null, cls: 0, longTasks: [] };
    for (const [type, handler] of [
      ['largest-contentful-paint', e => window.__diag.lcp = e.startTime],
      ['layout-shift', e => { if (!e.hadRecentInput) window.__diag.cls += e.value; }],
      ['longtask', e => window.__diag.longTasks.push(e.duration)]
    ]) { try { new PerformanceObserver(list => list.getEntries().forEach(handler)).observe({type, buffered: true}); } catch {} }
  });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const metrics = async () => page.evaluate(() => {
    const n = performance.getEntriesByType('navigation')[0];
    const r = performance.getEntriesByType('resource');
    const d = window.__diag;
    return {
      path: location.pathname, title: document.title,
      textLength: document.body.innerText.length,
      errorScreen: document.body.innerText.includes('Não foi possível carregar esta página'),
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      ttfbMs: n.responseStart - n.requestStart, domContentLoadedMs: n.domContentLoadedEventEnd,
      fcpMs: performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? null,
      lcpMs: d.lcp, cls: d.cls, longTasks: d.longTasks.length,
      blockingTimeMs: d.longTasks.reduce((s, x) => s + Math.max(0, x - 50), 0),
      resourceCount: r.length, resourceBytes: r.reduce((s,x)=>s+x.encodedBodySize,0),
      heapBytes: performance.memory?.usedJSHeapSize ?? null,
      brokenImages: Array.from(document.images).filter(i => i.complete && i.naturalWidth === 0).map(i => new URL(i.src).pathname)
    };
  });
  for (const [device, viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]) {
    await page.setViewportSize(viewport);
    for (const route of ['/', '/login', '/signup', '/calculadora-energetica']) {
      for (let round = 1; round <= 3; round++) {
        errors.length = 0;
        const cdp = await page.context().newCDPSession(page);
        await cdp.send('Network.enable');
        await cdp.send('Network.setCacheDisabled', {cacheDisabled:true});
        const response = await page.goto('http://127.0.0.1:4188' + route, {waitUntil:'load',timeout:30000});
        await page.waitForTimeout(1200);
        results.push({device,route,round,status:response.status(),...await metrics(),errors:[...errors]});
        await cdp.detach();
      }
    }
  }
  const protectedRoutes = [];
  for (const route of ['/hub','/app','/consulta-vet','/consulta-vet/receituario','/fluidoterapia-vet','/transfusao-sanguinea','/hemogasovet','/dor','/antibioticoterapia','/crivet','/neurologia']) {
    await page.goto('http://127.0.0.1:4188'+route,{waitUntil:'load'});
    await page.waitForTimeout(300);
    protectedRoutes.push({route,redirectedToLogin:new URL(page.url()).pathname === '/login'});
  }
  errors.length = 0;
  await page.goto('http://127.0.0.1:4188/login?error_description=%25',{waitUntil:'load'});
  await page.waitForTimeout(300);
  const malformedQuery = {...await metrics(),errors:[...errors]};
  await page.goto('http://127.0.0.1:4188/calculadora-energetica',{waitUntil:'load'});
  await page.context().setOffline(true);
  let offlineReload;
  try {await page.reload({waitUntil:'load',timeout:5000});offlineReload='loaded';} catch {offlineReload='navigation failed';}
  await page.context().setOffline(false);
  await page.goto('http://127.0.0.1:4188/',{waitUntil:'load'});
  await page.screenshot({path:'output/diagnostics-2026-10-08/home-mobile.png',fullPage:true});
  return {results,protectedRoutes,malformedQuery,offlineReload};
}
