import test from 'node:test';
import assert from 'node:assert/strict';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';

const SLUG = 'sindrome-cushing-gatos';

test('Síndrome de Cushing felina existe em diseasesSeed', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.deepEqual(record?.species, ['cat']);
  assert.equal(record?.category, 'endocrinologia');
  assert.equal(record?.title, 'Síndrome de Cushing — Gato');
});

test('Síndrome de Cushing felina está no catálogo público', () => {
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG));
});

test('Síndrome de Cushing felina tem estrutura editorial mínima', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.ok(record!.quickDecisionStrip.length >= 12);
  assert.ok(record!.references && record!.references.length >= 8);
  assert.ok(record!.plainLanguage || DISEASE_PLAIN_LANGUAGE[SLUG]);
});

test('Síndrome de Cushing felina documenta LDDST 0,1 mg/kg e pele frágil', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /0,1 mg\/kg/i);
  assert.match(strip, /pele frágil|fragilidade/i);
  assert.match(strip, /125.*µg|125.*mcg/i);
  const patho = record?.pathophysiology as Record<string, unknown> | undefined;
  assert.ok(patho?.tabelaComparacaoCaoGato);
});

test('Síndrome de Cushing felina documenta diabetes e Miceli 2022', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const epi = record?.epidemiology as Record<string, unknown> | undefined;
  assert.match(String(epi?.diabetes), /80%|~80/i);
  const treatment = record?.treatment as Record<string, unknown> | undefined;
  const trilostano = treatment?.trilostano as Record<string, unknown> | undefined;
  assert.match(String(trilostano?.coorteMiceli), /Miceli/i);
});

test('Síndrome de Cushing felina relaciona cão e diabetes felina', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record?.relatedDiseaseSlugs?.includes('sindrome-cushing-caes'));
  assert.ok(record?.relatedDiseaseSlugs?.includes('diabetes-mellitus-felina'));
});
