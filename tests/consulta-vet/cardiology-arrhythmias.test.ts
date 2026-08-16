import test from 'node:test';
import assert from 'node:assert/strict';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { DIAGNOSTIC_SUBSECTION_PRIORITY } from '../../modules/consulta-vet/utils/editorialSubsectionOrder';

const SLUG = 'arritmias-cardiacas-caes-gatos';

test('Arritmias cardíacas existe no seed e no catálogo público', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.equal(record?.title, 'Arritmias cardíacas em cães e gatos');
  assert.match(record?.subtitle ?? '', /estratificação de risco/i);
  assert.equal(record?.category, 'cardiologia');
  assert.deepEqual(record?.species, ['dog', 'cat']);
  assert.equal(record?.vinReferencePending, true);
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG));
  assert.ok(PUBLIC_CATALOG_DISEASE_CARD_STUBS.some((c) => c.slug === SLUG));
});

test('Arritmias cardíacas tem estrutura editorial mínima', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.ok(record!.quickDecisionStrip.length >= 8);
  assert.ok(record!.references && record!.references.length >= 25);
  assert.ok(DISEASE_PLAIN_LANGUAGE[SLUG]);
  assert.ok(record!.quickSummaryRich?.diagnosticFlow?.steps.length >= 5);
  assert.ok(record!.quickSummaryRich?.treatmentFlow?.steps.length >= 4);
  assert.equal(record!.tags.length, 11);
});

test('Arritmias documenta ORCA, adenosina e estratificação de urgência', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /Holter ≤125|Holter.*125/i);
  assert.match(strip, /Adenosina/i);
  assert.match(strip, /marcapasso/i);
  assert.match(strip, /RECOVER/i);

  const treatment = record?.treatment as Record<string, unknown>;
  const nota = treatment?.arrNotaEstratificacao as string;
  assert.match(nota, /não.*estadiamento|não é estadiamento|organização clínica/i);
});

test('Arritmias inclui tabelas, figuras e alerta lidocaína felina', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const diagnosis = record?.diagnosis as Record<string, unknown>;
  const treatment = record?.treatment as Record<string, unknown>;
  const etiology = record?.etiology as Record<string, unknown>;

  assert.ok(Array.isArray(etiology.pontosChave) && (etiology.pontosChave as string[]).length >= 5);
  assert.ok(diagnosis.tabelaLeituraRapidaECG);
  assert.ok(diagnosis.figuraHolterGatosSaudaveis);
  assert.ok(treatment.figuraEstratificacaoUrgencia);
  assert.ok(treatment.farmacos);
  assert.ok(Array.isArray(treatment.errosComuns) && (treatment.errosComuns as string[]).length >= 8);

  const gato = treatment.arrVtAgudaGato as string;
  assert.match(gato, /0,25|0\.25|gato/i);
  assert.doesNotMatch(JSON.stringify(record), /segundo o VIN|VINcyclopedia/i);
});

test('Arritmias prioriza chaves diagnósticas', () => {
  for (const key of ['tabelaLeituraRapidaECG', 'figuraNaoTrateEcg', 'holterIndicacoes', 'figuraHolterGatosSaudaveis']) {
    assert.ok(DIAGNOSTIC_SUBSECTION_PRIORITY.includes(key), `missing diagnostic order for ${key}`);
  }
});
