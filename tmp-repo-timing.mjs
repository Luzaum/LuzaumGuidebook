import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://127.0.0.1:5173/consulta-vet/doencas/cinomose-canina', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(3000);
const result = await page.evaluate(async () => {
  const diseaseMod = await import('/modules/consulta-vet/services/diseaseRepository.ts');
  const medMod = await import('/modules/consulta-vet/services/medicationRepository.ts');
  const consMod = await import('/modules/consulta-vet/services/consensoRepository.ts');
  const diseaseRepo = diseaseMod.getDiseaseRepository();
  const medRepo = medMod.getMedicationRepository();
  const consRepo = consMod.getConsensoRepository();

  async function timed(label, fn) {
    const startedAt = performance.now();
    try {
      const timeout = new Promise((resolve) => setTimeout(() => resolve({ timeout: true }), 12000));
      const result = await Promise.race([fn(), timeout]);
      return { label, durationMs: Math.round(performance.now() - startedAt), result };
    } catch (error) {
      return { label, durationMs: Math.round(performance.now() - startedAt), error: String(error) };
    }
  }

  return {
    disease: await timed('disease', () => diseaseRepo.getBySlug('cinomose-canina')),
    medications: await timed('medications', () => medRepo.list()),
    consensos: await timed('consensos', () => consRepo.list()),
  };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
