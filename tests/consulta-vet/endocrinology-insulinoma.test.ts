import test from 'node:test';
import assert from 'node:assert/strict';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { applyDiseaseOverviewOverride } from '../../modules/consulta-vet/data/seed/diseaseOverviewOverrides';
import { getDiseaseCategorySlugs } from '../../modules/consulta-vet/utils/diseaseCategories';
import { sortDiagnosticSubsectionEntries } from '../../modules/consulta-vet/utils/editorialSubsectionOrder';

const SLUG = 'insulinoma-caes-gatos';

test('Insulinoma existe no seed e no catálogo público', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.equal(record?.title, 'Insulinoma em cães e gatos');
  assert.equal(record?.category, 'endocrinologia');
  assert.ok(getDiseaseCategorySlugs(record!).includes('oncologia'));
  assert.ok(getDiseaseCategorySlugs(record!).includes('neurologia'));
  assert.ok(getDiseaseCategorySlugs(record!).includes('emergencia-intensivismo'));
  assert.deepEqual(record?.species, ['dog', 'cat']);
  assert.equal(record?.vinReferencePending, true);
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG));
  assert.ok(PUBLIC_CATALOG_DISEASE_CARD_STUBS.some((c) => c.slug === SLUG));
});

test('Insulinoma tem estrutura editorial mínima', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.ok(record!.quickDecisionStrip.length >= 15);
  assert.equal(record!.references?.length, 25);
  assert.ok(DISEASE_PLAIN_LANGUAGE[SLUG]);
  assert.ok(record!.quickSummaryRich?.diagnosticFlow?.steps.length >= 6);
  assert.ok(record!.quickSummaryRich?.treatmentFlow?.steps.length >= 6);
  assert.ok(applyDiseaseOverviewOverride(record!));
});

test('Insulinoma documenta alertas clínicos centrais', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /insulina.*normal|normal.*insulina/i);
  assert.match(strip, /relação insulina|razão insulina|insulina:glicose/i);
  assert.match(strip, /0,25 mg\/kg/i);
  assert.match(strip, /50 ng\/kg/i);
  assert.match(strip, /Petrelli|insulina absoluta|metástase/i);

  const pathophysiology = record?.pathophysiology as Record<string, unknown>;
  assert.ok(pathophysiology.alertaRelacaoInsulinaGlicose);
  assert.ok(pathophysiology.alertaInsulinaNormalHipoglicemia);

  const diagnosis = record?.diagnosis as Record<string, unknown>;
  assert.match(String(diagnosis.alertaInsulinaAbsolutaEstadiamento), /Petrelli|não usar|não estadia/i);

  const treatment = record?.treatment as Record<string, unknown>;
  assert.ok(treatment.condutaImediataCrise);
  assert.match(String((treatment.condutaImediataCrise as { titulo?: string }).titulo), /Conduta imediata/i);
});

test('Insulinoma inclui figuras CC BY e tabelas', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const epidemiology = record?.epidemiology as Record<string, unknown>;
  const diagnosis = record?.diagnosis as Record<string, unknown>;
  const treatment = record?.treatment as Record<string, unknown>;

  assert.ok(epidemiology.figuraSinaisClinicos);
  assert.ok(epidemiology.figuraPredisposicaoRacial);
  assert.ok(diagnosis.tabelaEstadiamentoTNM);
  assert.ok(treatment.tabelaFarmacos);
  assert.ok(Array.isArray(treatment.errosComuns) && (treatment.errosComuns as string[]).length >= 8);

  const visible = JSON.stringify({ epidemiology, diagnosis, treatment, pathophysiology: record?.pathophysiology });
  assert.doesNotMatch(visible, /\.svg/);
  assert.doesNotMatch(visible, /bioone\.org.*fig2|CC BY-NC.*figura incorporada/i);
});

test('Insulinoma prioriza chaves diagnósticas', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const diagnosis = record?.diagnosis as Record<string, unknown>;
  const sorted = sortDiagnosticSubsectionEntries(Object.entries(diagnosis));
  const keys = sorted.map(([key]) => key);
  const alertIdx = keys.indexOf('alertaInsulinaAbsolutaEstadiamento');
  const stepsIdx = keys.indexOf('steps');
  assert.ok(alertIdx >= 0 && stepsIdx >= 0);
  assert.ok(alertIdx < stepsIdx, 'alertas devem aparecer antes dos passos numerados');
});
