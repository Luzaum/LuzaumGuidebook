import test from 'node:test';
import assert from 'node:assert/strict';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { getDiseaseCategorySlugs } from '../../modules/consulta-vet/utils/diseaseCategories';
import { DIAGNOSTIC_SUBSECTION_PRIORITY } from '../../modules/consulta-vet/utils/editorialSubsectionOrder';

const SLUG = 'giardiase-caes-gatos';

test('Giardíase existe no seed e no catálogo público', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.equal(record?.title, 'Giardíase em cães e gatos');
  assert.match(record?.subtitle ?? '', /protozoose intestinal/i);
  assert.equal(record?.category, 'gastroenterologia');
  assert.ok(getDiseaseCategorySlugs(record!).includes('infectologia'));
  assert.deepEqual(record?.species, ['dog', 'cat']);
  assert.equal(record?.vinReferencePending, true);
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG));
  assert.ok(PUBLIC_CATALOG_DISEASE_CARD_STUBS.some((c) => c.slug === SLUG));
});

test('Giardíase tem estrutura editorial mínima', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.ok(record!.quickDecisionStrip.length >= 10);
  assert.equal(record!.references?.length, 17);
  assert.ok(DISEASE_PLAIN_LANGUAGE[SLUG]);
  assert.ok(record!.quickSummaryRich?.diagnosticFlow?.steps.length >= 5);
  assert.ok(record!.quickSummaryRich?.treatmentFlow?.steps.length >= 4);
  assert.ok(record!.quickSummaryRich?.tabelaDecisaoClinicaRapida);
});

test('Giardíase documenta positivo≠causa, fenbendazol e Tritrichomonas', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /positivo.*diarreia|Positivo.*≠/i);
  assert.match(strip, /50 mg\/kg/i);
  assert.match(strip, /Fenbendazol/i);
  assert.match(strip, /Tritrichomonas/i);
  assert.match(strip, /ZnSO/i);

  const etiology = record?.etiology as Record<string, unknown>;
  assert.match(String(etiology.alertaPositivoNaoCausa), /positivo|ALERTA/i);
  const visible = JSON.stringify({
    quickSummary: record?.quickSummary,
    quickDecisionStrip: record?.quickDecisionStrip,
    etiology: record?.etiology,
    diagnosis: record?.diagnosis,
    treatment: record?.treatment,
  });
  assert.doesNotMatch(visible, /segundo o VIN|VINcyclopedia/i);
  assert.doesNotMatch(visible, /binary fission|carriage|grooming|off-label/i);
  assert.doesNotMatch(visible, /\.svg/);
});

test('Giardíase inclui tabelas, figura open access e apresentação clínica', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const diagnosis = record?.diagnosis as Record<string, unknown>;
  const treatment = record?.treatment as Record<string, unknown>;
  const etiology = record?.etiology as Record<string, unknown>;

  assert.ok(Array.isArray(etiology.pontosChave) && (etiology.pontosChave as string[]).length >= 10);
  assert.ok(diagnosis.apresentacaoClinicaTabela);
  assert.ok(diagnosis.tabelaComparacaoGiardiaTritrichomonas);
  assert.ok(treatment.farmacos);
  assert.ok(treatment.figuraCiuca2021);
  assert.ok(Array.isArray(treatment.errosComuns) && (treatment.errosComuns as string[]).length >= 8);
  assert.ok(Array.isArray(treatment.perolasClinicas) && (treatment.perolasClinicas as string[]).length >= 10);

  const apresentacao = diagnosis.apresentacaoClinicaTabela as { title?: string };
  assert.match(apresentacao.title ?? '', /Apresentação clínica/i);
  assert.match(apresentacao.title ?? '', /não estadiamento/i);
});

test('Giardíase prioriza chaves diagnósticas', () => {
  for (const key of ['apresentacaoClinicaTabela', 'tabelaComparacaoGiardiaTritrichomonas']) {
    assert.ok(DIAGNOSTIC_SUBSECTION_PRIORITY.includes(key), `missing diagnostic order for ${key}`);
  }
});
