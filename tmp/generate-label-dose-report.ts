import { writeFileSync } from 'node:fs';
import { commercialProductsBeforeLabelDoseEnrichment } from '../modules/consulta-vet/data/commercialOticProducts.seed';
import {
  auditCommercialLabelDose,
  enrichCommercialProductLabelDose,
  hasPracticalLabelDoseText,
  resolveCommercialLabelDose,
} from '../modules/consulta-vet/utils/commercialLabelDose';

function detectSource(product: (typeof commercialProductsBeforeLabelDoseEnrichment)[number]) {
  const raw = product.dosageGuidance?.labelDose?.trim() || '';
  if (raw && hasPracticalLabelDoseText(raw)) return 'seedLabelDose' as const;

  const withoutLabel = {
    ...product,
    dosageGuidance: { ...product.dosageGuidance, labelDose: undefined },
  };

  const fromDirections = resolveCommercialLabelDose(withoutLabel);
  const directionsOnly = (() => {
    const t = product.labelDirections || '';
    const sentences = t.split(/(?<=[.;])\s+/).map((part) => part.trim()).filter(Boolean);
    const practical = sentences.find((sentence) => hasPracticalLabelDoseText(sentence));
    return practical || (hasPracticalLabelDoseText(t) ? t : null);
  })();

  if (directionsOnly && fromDirections === directionsOnly.replace(/\.$/, '')) {
    return 'labelDirections' as const;
  }

  const withoutDirections = { ...withoutLabel, labelDirections: '' };
  const fromPlumbs = resolveCommercialLabelDose(withoutDirections);
  if (fromPlumbs) return 'plumbs' as const;

  const withoutPlumbs = {
    ...withoutDirections,
    dosageGuidance: { ...withoutDirections.dosageGuidance, plumbs: undefined },
  };
  const fromPrescription = resolveCommercialLabelDose(withoutPlumbs);
  if (fromPrescription) return 'prescriptionExample' as const;

  return 'unresolved' as const;
}

const rows = commercialProductsBeforeLabelDoseEnrichment.map((product) => {
  const rawAudit = auditCommercialLabelDose(product);
  const enriched = enrichCommercialProductLabelDose(product);
  const source = detectSource(product);

  return {
    id: product.id,
    name: product.name,
    commercialClass: product.commercialClass,
    rawLabelDose: rawAudit.rawLabelDose,
    rawStatus: rawAudit.rawStatus,
    resolvedLabelDose: resolveCommercialLabelDose(enriched) || '',
    source,
    wasRuntimeEnriched: source !== 'seedLabelDose',
  };
});

const summary = {
  total: rows.length,
  rawOk: rows.filter((r) => r.rawStatus === 'ok').length,
  rawBlocked: rows.filter((r) => r.rawStatus === 'blocked').length,
  rawMissing: rows.filter((r) => r.rawStatus === 'missing').length,
  rawWeak: rows.filter((r) => r.rawStatus === 'weak').length,
  finalOk: rows.filter((r) => hasPracticalLabelDoseText(r.resolvedLabelDose)).length,
  bySource: Object.fromEntries(
    ['seedLabelDose', 'labelDirections', 'plumbs', 'prescriptionExample', 'unresolved'].map((key) => [
      key,
      rows.filter((r) => r.source === key).length,
    ]),
  ),
  byClassRaw: Object.fromEntries(
    [...new Set(rows.map((r) => r.commercialClass))].sort().map((cls) => [
      cls,
      {
        total: rows.filter((r) => r.commercialClass === cls).length,
        rawOk: rows.filter((r) => r.commercialClass === cls && r.rawStatus === 'ok').length,
        finalOk: rows.filter((r) => r.commercialClass === cls && hasPracticalLabelDoseText(r.resolvedLabelDose)).length,
      },
    ]),
  ),
};

const manualIds = new Set([
  'semintra-boehringer',
  'furolisin-vetnil',
  'upcard-vetoquinol',
  'cardisure-dechra',
  'cardalis-cvm',
  'benazepril-manipulado',
  'anlodipino-manipulado',
  'clopidogrel-manipulado',
  'sildenafila-manipulado',
  'atenolol-manipulado',
  'giardicid-agener',
  'condromax-pet-agener',
  'condroton-agener',
  'antisedan-zoetis',
  'invicto-zoetis',
  'petpril-agener',
  'sec-lac-agener',
  'doxitrat-agener',
  'mectimax-agener',
  'fluimucil-human',
  'osteosyn-agener',
  'surosolve-agener',
]);

const report = {
  generatedAt: new Date().toISOString(),
  summary,
  manualCorrections: rows.filter((r) => manualIds.has(r.id)),
  runtimeEnriched: rows.filter((r) => r.wasRuntimeEnriched),
  stillUnresolved: rows.filter((r) => !hasPracticalLabelDoseText(r.resolvedLabelDose)),
  blockedBefore: rows.filter((r) => r.rawStatus === 'blocked'),
};

writeFileSync('tmp/label-dose-report-data.json', JSON.stringify(report, null, 2), 'utf8');
console.log(JSON.stringify(summary, null, 2));
