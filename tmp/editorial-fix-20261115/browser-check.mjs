import { chromium } from 'playwright';
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/luzau/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe',timeout:30000});
try{
 console.log('browser launched');
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 page.setDefaultTimeout(30000);
 await page.goto('http://127.0.0.1:5173/consulta-vet/doencas/cinomose-canina',{waitUntil:'domcontentloaded',timeout:30000});
 console.log((await page.locator('body').innerText()).slice(0,1400));
 await page.getByRole('heading',{name:'Manifestações gerais',exact:true}).waitFor({timeout:45000});
 const section=page.locator('#clinicalSignsPathophysiology');
 console.log('section', (await section.innerText()).slice(0,1000));
 await section.scrollIntoViewIfNeeded();
 await page.screenshot({path:'output/playwright/editorial-cinomose-desktop.png'});
 await page.setViewportSize({width:390,height:844});
 await section.scrollIntoViewIfNeeded();
 await page.screenshot({path:'output/playwright/editorial-cinomose-mobile.png'});
 console.log('mobile overflow',await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
 console.log('headings',await section.getByRole('heading').allTextContents());
}finally{await browser.close();}
