import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://127.0.0.1:5173/consulta-vet', { waitUntil: 'domcontentloaded', timeout: 30000 });
const result = await page.evaluate(async () => {
  const supabase = window.supabase;
  if (!supabase) return { error: 'no window.supabase' };
  try {
    const timeout = new Promise((resolve) => setTimeout(() => resolve({ timeout: true }), 8000));
    const query = supabase.from('consensus_documents').select('id, slug, title, is_published').limit(5);
    const response = await Promise.race([query, timeout]);
    return response;
  } catch (error) {
    return { error: String(error) };
  }
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
