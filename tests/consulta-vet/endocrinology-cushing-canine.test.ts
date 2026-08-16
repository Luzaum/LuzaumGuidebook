import test from 'node:test';
import assert from 'node:assert/strict';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';

const SLUG = 'sindrome-cushing-caes';

test('Síndrome de Cushing canina existe em diseasesSeed', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.deepEqual(record?.species, ['dog']);
  assert.equal(record?.category, 'endocrinologia');
  assert.equal(record?.title, 'Síndrome de Cushing — Cão');
});

test('Síndrome de Cushing canina está no catálogo público', () => {
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG));
});

test('Síndrome de Cushing canina tem estrutura editorial mínima', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.ok(record!.quickDecisionStrip.length >= 15);
  assert.ok(record!.references && record!.references.length >= 10);
  assert.ok(record!.plainLanguage || DISEASE_PLAIN_LANGUAGE[SLUG]);
});

test('Síndrome de Cushing canina usa nomenclatura ALIVE e LDDST', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /ALP.*NÃO|não.*ALP|ALP alta/i);
  assert.match(strip, /0,01 mg\/kg/i);
  assert.match(strip, /1 mg\/kg.*q12h|q12h.*1 mg\/kg/i);
  assert.match(strip, /Bugbee et al\., 2023/);
  assert.match(record?.title ?? '', /Síndrome de Cushing/);
});

test('Síndrome de Cushing canina inclui classificação ALIVE e Cushing Clinical Score', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const etiology = record?.etiology as Record<string, unknown> | undefined;
  assert.ok(etiology?.classificacaoALIVE);
  const patho = record?.pathophysiology as Record<string, unknown> | undefined;
  assert.ok(patho?.tabelaCushingClinicalScore);
  assert.ok(patho?.tabelaLDDST);
});

test('Síndrome de Cushing canina relaciona gato, Addison e diabetes', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record?.relatedDiseaseSlugs?.includes('sindrome-cushing-gatos'));
  assert.ok(record?.relatedDiseaseSlugs?.includes('hipoadrenocorticismo-addison'));
  assert.ok(record?.relatedDiseaseSlugs?.includes('diabetes-mellitus-canina'));
});

test('Slug legado hiperadrenocorticismo-sindrome-cushing não permanece no seed', () => {
  assert.equal(diseasesSeed.some((d) => d.slug === 'hiperadrenocorticismo-sindrome-cushing'), false);
});
