import test from 'node:test';
import assert from 'node:assert/strict';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { DIAGNOSTIC_SUBSECTION_PRIORITY } from '../../modules/consulta-vet/utils/editorialSubsectionOrder';

const SLUG = 'doenca-valvar-mitral-degenerativa-caes';

test('DMVD existe no seed e no catálogo público', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.equal(record?.category, 'cardiologia');
  assert.deepEqual(record?.species, ['dog']);
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG));
  assert.ok(PUBLIC_CATALOG_DISEASE_CARD_STUBS.some((c) => c.slug === SLUG));
});

test('DMVD tem estrutura editorial mínima e consenso ACVIM ligado', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.ok(record!.quickDecisionStrip.length >= 8);
  assert.ok(record!.references && record!.references.length >= 5);
  assert.ok(DISEASE_PLAIN_LANGUAGE[SLUG]);
  assert.ok(record!.quickSummaryRich?.diagnosticFlow?.steps.length >= 5);
  assert.ok(record!.quickSummaryRich?.treatmentFlow?.steps.length >= 4);
  assert.ok(record!.relatedConsensusSlugs.includes('acvim-mmvd-canina-2019'));
});

test('DMVD organiza etiologia, diagnóstico e tratamento em subseções clínicas', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const etiology = record?.etiology as Record<string, unknown>;
  const diagnosis = record?.diagnosis as Record<string, unknown>;
  const treatment = record?.treatment as Record<string, unknown>;
  const pathogenesis = record?.pathogenesisTransmission as Record<string, unknown>;
  const prevention = record?.prevention as Record<string, unknown>;

  assert.ok(Array.isArray(etiology.pontosChave) && (etiology.pontosChave as string[]).length >= 5);
  assert.ok(etiology.definicao);
  assert.ok(Array.isArray(pathogenesis.cascata) && (pathogenesis.cascata as string[]).length >= 5);
  assert.ok(Array.isArray(diagnosis.diagnosticPlanStepByStep));
  assert.ok(diagnosis.dmvdEstadiamentoAcvimTabela);
  assert.ok(diagnosis.dmvdCriteriosB2Tabela);
  assert.ok(diagnosis.dmvdTosseCardiacaVsRespiratoria);
  assert.ok(treatment.dmvdEstrategiaPorEstagioAcvim);
  assert.ok(treatment.farmacos);
  assert.ok(Array.isArray(treatment.errosComuns) && (treatment.errosComuns as string[]).length >= 6);
  assert.ok(prevention.tutor);
});

test('DMVD documenta critérios de B2 e não trata tosse isolada como ICC', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const diagnosis = record?.diagnosis as Record<string, unknown>;
  const b2 = diagnosis.dmvdCriteriosB2Tabela as { rows: string[][] };
  const joined = JSON.stringify(b2.rows);
  assert.match(joined, /1,6/);
  assert.match(joined, /1,7/);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /Tosse isolada/i);
  assert.match(strip, /Frequência respiratória durante o sono/i);
});

test('DMVD prioriza chaves diagnósticas na ordem clínica', () => {
  for (const key of [
    'dmvdClinicaAusculta',
    'dmvdEcocardiografiaPadraoOuro',
    'dmvdEstadiamentoAcvimTabela',
    'dmvdCriteriosB2Tabela',
    'dmvdTosseCardiacaVsRespiratoria',
  ]) {
    assert.ok(DIAGNOSTIC_SUBSECTION_PRIORITY.includes(key), `missing diagnostic order for ${key}`);
  }
});
