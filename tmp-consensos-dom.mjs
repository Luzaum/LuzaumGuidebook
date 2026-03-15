import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://127.0.0.1:5173/consulta-vet/consensos', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(12000);
const result = await page.evaluate(() => ({
  body: document.body.innerText,
  links: Array.from(document.querySelectorAll('a[href^="/consulta-vet/consensos/"]')).map((el) => ({ href: el.getAttribute('href'), text: el.textContent?.trim() })),
  html: document.querySelector('main')?.innerHTML.slice(0, 2000)
}));
console.log(JSON.stringify(result, null, 2));
await browser.close();
