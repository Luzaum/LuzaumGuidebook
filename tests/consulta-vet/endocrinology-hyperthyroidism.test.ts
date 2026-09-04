import test from 'node:test';
import assert from 'node:assert/strict';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';

const SLUG = 'hipertireoidismo-felino';

test('Hipertireoidismo existe em diseasesSeed', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.deepEqual(record?.species, ['cat']);
  assert.equal(record?.category, 'endocrinologia');
});

test('Hipertireoidismo está no catálogo público', () => {
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG));
});

test('Hipertireoidismo tem estrutura editorial mínima', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.ok(record!.quickDecisionStrip.length >= 10);
  assert.ok(record!.references && record!.references.length >= 10);
  assert.ok(record!.plainLanguage || DISEASE_PLAIN_LANGUAGE[SLUG]);
});

test('Hipertireoidismo documenta DRC mascarada e eutireoidismo', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /mascara DRC|mascara/i);
  assert.match(strip, /manter gato hipertireoideo/i);
  assert.match(strip, /eutireoidismo/i);
  assert.match(strip, /Geddes & Aguiar, 2022/);
});

test('Hipertireoidismo documenta TT4, fT4 e TSH 2026', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /T4 total normal|TT4 normal/i);
  assert.match(strip, /T4 livre elevada|fT4 elevada/i);
  assert.match(strip, /Brassard et al\., 2026/);
});

test('Hipertireoidismo inclui grupos AAHA e tabelas terapêuticas', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const diagnosis = record?.diagnosis as Record<string, unknown> | undefined;
  const patho = record?.pathophysiology as Record<string, unknown> | undefined;
  const treatment = record?.treatment as Record<string, unknown> | undefined;
  assert.ok(diagnosis?.tabelaGruposAAHA);
  assert.ok(patho?.tabelaComparacaoTratamentos);
  assert.ok(treatment?.tabelaMetimazol);
});

test('Hipertireoidismo não recomenda hipertireoidismo terapêutico para rim', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const treatment = record?.treatment as Record<string, unknown> | undefined;
  const drc = treatment?.drcConcomitante as string;
  assert.match(drc, /Nunca manter hipertireoidismo/i);
  const pillars = record?.quickSummaryRich?.pillars?.map((p) => p.body).join(' ') ?? '';
  assert.doesNotMatch(pillars, /tolerar.*hipertireoideo|leve hipertireoidismo subclínico em favor/i);
});

test('Hipertireoidismo relaciona DRC, HAS, DM e CMH', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record?.relatedDiseaseSlugs?.includes('doenca-renal-cronica-caes-gatos'));
  assert.ok(record?.relatedDiseaseSlugs?.some((s) => s.startsWith('hipertensao-arterial-sistemica')));
  assert.ok(record?.relatedDiseaseSlugs?.includes('diabetes-mellitus-felina'));
  assert.ok(record?.relatedDiseaseSlugs?.some((s) => s.startsWith('cardiomiopatia-hipertrofica')));
});

test('Hipertireoidismo documenta ^131I dose individualizada', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const i131 = (record?.treatment as Record<string, unknown>)?.iodoRadioativo as string;
  assert.match(i131, /NÃO fixa|individualizada|1,90 mCi/i);
  assert.match(i131, /Peterson & Rishniw, 2021/);
});
