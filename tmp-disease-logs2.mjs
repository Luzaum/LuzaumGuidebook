import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const logs=[];
page.on('console', (msg) => logs.push({type:msg.type(), text:msg.text()}));
await page.goto('http://127.0.0.1:5173/consulta-vet/doencas/cinomose-canina', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(6000);
console.log(JSON.stringify(logs, null, 2));
await browser.close();
