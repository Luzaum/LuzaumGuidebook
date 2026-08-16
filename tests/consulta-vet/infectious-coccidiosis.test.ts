import test from 'node:test';
import assert from 'node:assert/strict';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { applyDiseaseOverviewOverride } from '../../modules/consulta-vet/data/seed/diseaseOverviewOverrides';
import { getDiseaseCategorySlugs } from '../../modules/consulta-vet/utils/diseaseCategories';
import { DIAGNOSTIC_SUBSECTION_PRIORITY } from '../../modules/consulta-vet/utils/editorialSubsectionOrder';

const SLUG = 'coccidiose-caes-gatos';

test('Cistoisosporose existe no seed e no catálogo público', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.equal(record?.title, 'Cistoisosporose em cães e gatos');
  assert.match(record?.subtitle ?? '', /Cystoisospora/i);
  assert.equal(record?.category, 'gastroenterologia');
  assert.ok(getDiseaseCategorySlugs(record!).includes('infectologia'));
  assert.deepEqual(record?.species, ['dog', 'cat']);
  assert.equal(record?.vinReferencePending, true);
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG));
  assert.ok(PUBLIC_CATALOG_DISEASE_CARD_STUBS.some((c) => c.slug === SLUG));
  const withOverview = applyDiseaseOverviewOverride(record!);
  assert.ok(withOverview.quickSummaryRich?.pillars?.length);
  assert.match(withOverview.quickSummaryRich?.lead ?? '', /coccidioidomicose|Cystoisospora/i);
});

test('Cistoisosporose tem estrutura editorial mínima', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.ok(record!.quickDecisionStrip.length >= 10);
  assert.equal(record!.references?.length, 18);
  assert.ok(DISEASE_PLAIN_LANGUAGE[SLUG]);
  assert.ok(record!.quickSummaryRich?.diagnosticFlow?.steps.length >= 5);
  assert.ok(record!.quickSummaryRich?.treatmentFlow?.steps.length >= 4);
  assert.ok(record!.quickSummaryRich?.tabelaDecisaoClinicaRapida);
});

test('Cistoisosporose documenta alertas clínicos e ponazuril 50 mg/kg ×3', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /coccidioidomicose|Coccidioides/i);
  assert.match(strip, /50 mg\/kg/i);
  assert.match(strip, /3 dias|×3/i);
  assert.match(strip, /positivo|oocistos/i);

  const etiology = record?.etiology as Record<string, unknown>;
  assert.match(String(etiology.alertaCoccidioidomicose), /coccidioidomicose|Coccidioides/i);
  assert.match(String(etiology.alertaPositivoNaoCausa), /positivo|oocistos/i);

  const treatment = record?.treatment as Record<string, unknown>;
  assert.match(String(treatment.diclazurilDivergenciaAlerta), /2,5–5|25 mg\/kg/i);
  assert.match(String(treatment.ponazurilEsquemaTresDias), /50 mg\/kg/i);

  const visible = JSON.stringify({
    quickSummary: record?.quickSummary,
    quickDecisionStrip: record?.quickDecisionStrip,
    etiology: record?.etiology,
    diagnosis: record?.diagnosis,
    treatment: record?.treatment,
  });
  assert.doesNotMatch(visible, /segundo o VIN|VINcyclopedia/i);
  assert.doesNotMatch(visible, /carriage|grooming|off-label/i);
  assert.doesNotMatch(visible, /\.svg/);
});

test('Cistoisosporose inclui tabelas, figuras open access e classificação operacional', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const diagnosis = record?.diagnosis as Record<string, unknown>;
  const treatment = record?.treatment as Record<string, unknown>;
  const etiology = record?.etiology as Record<string, unknown>;

  assert.ok(Array.isArray(etiology.pontosChave) && (etiology.pontosChave as string[]).length >= 10);
  assert.ok(diagnosis.apresentacaoClinicaTabela);
  assert.ok(diagnosis.classificacaoGravidadeOperacional);
  assert.ok(diagnosis.figuraAttia2024);
  assert.ok(diagnosis.figuraFerreira2019);
  assert.ok(diagnosis.matrizInterpretacaoCopro);
  assert.ok(treatment.farmacos);
  assert.ok(treatment.controleAmbiental);
  assert.ok(Array.isArray(treatment.errosComuns) && (treatment.errosComuns as string[]).length >= 8);
  assert.ok(Array.isArray(treatment.perolasClinicas) && (treatment.perolasClinicas as string[]).length >= 10);

  const apresentacao = diagnosis.apresentacaoClinicaTabela as { title?: string };
  assert.match(apresentacao.title ?? '', /Apresentação clínica/i);
  assert.match(apresentacao.title ?? '', /não estadiamento/i);
});

test('Cistoisosporose prioriza chaves diagnósticas', () => {
  for (const key of [
    'apresentacaoClinicaTabela',
    'classificacaoGravidadeOperacional',
    'matrizInterpretacaoCopro',
    'tabelaMorfologiaOocistos',
    'figuraAttia2024',
  ]) {
    assert.ok(DIAGNOSTIC_SUBSECTION_PRIORITY.includes(key), `missing diagnostic order for ${key}`);
  }
});
