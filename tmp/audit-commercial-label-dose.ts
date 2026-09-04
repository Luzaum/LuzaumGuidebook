import { writeFileSync } from 'node:fs';
import { commercialOticProductsSeed } from '../modules/consulta-vet/data/commercialOticProducts.seed';
import {
  auditCommercialLabelDose,
  enrichCommercialProductLabelDose,
  hasPracticalLabelDoseText,
  resolveCommercialLabelDose,
} from '../modules/consulta-vet/utils/commercialLabelDose';

function auditProduct(product: (typeof commercialOticProductsSeed)[number], enriched: boolean) {
  const base = enriched ? enrichCommercialProductLabelDose(product) : product;
  const audit = auditCommercialLabelDose(base);
  return {
    ...audit,
    enrichedApplied: enriched,
    displayLabelDose: resolveCommercialLabelDose(base) || '',
  };
}

// Re-import raw array by stripping enrichment: audit uses resolve which reads raw fields
const finalAudits = commercialOticProductsSeed.map((product) => auditProduct(product, false));

const summary = {
  total: finalAudits.length,
  ok: finalAudits.filter((item) => item.finalStatus === 'ok').length,
  stillBad: finalAudits.filter((item) => item.finalStatus !== 'ok').length,
  byClass: Object.fromEntries(
    [...new Set(finalAudits.map((item) => item.commercialClass))].sort().map((commercialClass) => [
      commercialClass,
      {
        total: finalAudits.filter((item) => item.commercialClass === commercialClass).length,
        ok: finalAudits.filter((item) => item.commercialClass === commercialClass && item.finalStatus === 'ok').length,
        bad: finalAudits.filter((item) => item.commercialClass === commercialClass && item.finalStatus !== 'ok').length,
      },
    ]),
  ),
};

const stillBad = finalAudits.filter((item) => item.finalStatus !== 'ok');

writeFileSync(
  'tmp/audit-commercial-label-dose.json',
  JSON.stringify({ summary, stillBad, generatedAt: new Date().toISOString() }, null, 2),
  'utf8',
);

console.log(JSON.stringify(summary, null, 2));
if (stillBad.length) {
  console.log('\nAinda pendentes:');
  stillBad.forEach((item) => console.log(`- ${item.id}: ${item.rawLabelDose || '(vazio)'}`));
}
