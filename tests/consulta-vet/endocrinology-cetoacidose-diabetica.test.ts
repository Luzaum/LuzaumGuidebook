import test from 'node:test';
import assert from 'node:assert/strict';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { applyDiseaseOverviewOverride } from '../../modules/consulta-vet/data/seed/diseaseOverviewOverrides';
import { getDiseaseCategorySlugs } from '../../modules/consulta-vet/utils/diseaseCategories';
import { sortDiagnosticSubsectionEntries } from '../../modules/consulta-vet/utils/editorialSubsectionOrder';

const SLUG = 'cetoacidose-diabetica-caes-gatos';

test('CAD existe no seed e no catálogo público', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.equal(record?.title, 'Cetoacidose diabética em cães e gatos');
  assert.equal(record?.category, 'endocrinologia');
  assert.ok(getDiseaseCategorySlugs(record!).includes('emergencia-intensivismo'));
  assert.deepEqual(record?.species, ['dog', 'cat']);
  assert.equal(record?.vinReferencePending, true);
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG));
  assert.ok(PUBLIC_CATALOG_DISEASE_CARD_STUBS.some((c) => c.slug === SLUG));
});

test('CAD tem estrutura editorial mínima', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.ok(record!.quickDecisionStrip.length >= 15);
  assert.equal(record!.references?.length, 17);
  assert.ok(DISEASE_PLAIN_LANGUAGE[SLUG]);
  assert.ok(record!.quickSummaryRich?.diagnosticFlow?.steps.length >= 6);
  assert.ok(record!.quickSummaryRich?.treatmentFlow?.steps.length >= 6);
  assert.ok(applyDiseaseOverviewOverride(record!));
});

test('CAD documenta alertas clínicos centrais', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /eDKA|EDKA|SGLT2/i);
  assert.match(strip, /BHB|β-hidroxibutirato/i);
  assert.match(strip, /bicarbonato.*não|não.*bicarbonato/i);
  assert.match(strip, /0,5 mEq\/kg\/h/i);

  const pathophysiology = record?.pathophysiology as Record<string, unknown>;
  assert.ok(pathophysiology.alertaEdkaSglT2_2026);
  assert.ok(pathophysiology.alertaBhbPreferencial);
  assert.ok(pathophysiology.tabelaBhbCutoffs);

  const treatment = record?.treatment as Record<string, unknown>;
  assert.ok(treatment.condutaImediata);
  assert.ok(treatment.bicarbonatoNaoRotina);
  assert.ok(Array.isArray(treatment.errosQueMatam) && (treatment.errosQueMatam as string[]).length >= 6);
  assert.ok(treatment.protocoloCaninoLisproAlternativa);
});

test('CAD alinha definição ALIVE e protocolos AAHA 2026', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const summary = record?.quickSummary ?? '';
  assert.match(summary, /7,35/);

  const treatment = record?.treatment as Record<string, unknown>;
  const glargina = treatment.protocoloFelinoGlargina as { protocolo?: string };
  assert.match(glargina.protocolo ?? '', /1 U\/gato IV/i);
  assert.match(glargina.protocolo ?? '', /0,5–1 U\/gato IM/i);

  const malerba = treatment.protocoloCaninoLisproAlternativa as { tabelaLisproMalerba?: { rows?: unknown[] } };
  assert.ok(malerba.tabelaLisproMalerba?.rows?.length);

  const visible = JSON.stringify({ pathophysiology: record?.pathophysiology, treatment });
  assert.doesNotMatch(visible, /lispro CRI.*gato|JFMS 2019.*lispro/i);
  assert.doesNotMatch(visible, /\.svg/);
});

test('CAD prioriza classificação diagnóstica antes dos passos', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const diagnosis = record?.diagnosis as Record<string, unknown>;
  const sorted = sortDiagnosticSubsectionEntries(Object.entries(diagnosis));
  const keys = sorted.map(([key]) => key);
  const tableIdx = keys.indexOf('tabelaComparativaEntidades');
  const stepsIdx = keys.indexOf('steps');
  assert.ok(tableIdx >= 0 && stepsIdx >= 0);
  assert.ok(tableIdx < stepsIdx, 'tabela comparativa deve aparecer antes dos passos numerados');
});
