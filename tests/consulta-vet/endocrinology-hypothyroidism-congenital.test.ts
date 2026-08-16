import test from 'node:test';
import assert from 'node:assert/strict';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';

const SLUG = 'hipotireoidismo-congenito-caes-gatos';

test('Hipotireoidismo congênito existe em diseasesSeed', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.deepEqual(record?.species, ['dog', 'cat']);
  assert.equal(record?.category, 'endocrinologia');
});

test('Hipotireoidismo congênito está no catálogo público', () => {
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG));
});

test('Hipotireoidismo congênito tem estrutura editorial mínima', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.ok(record!.quickDecisionStrip.length >= 10);
  assert.ok(record!.references && record!.references.length >= 8);
  assert.ok(record!.plainLanguage || DISEASE_PLAIN_LANGUAGE[SLUG]);
});

test('Hipotireoidismo congênito documenta goitroso, genética e tratamento precoce', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /goitro/i);
  assert.match(strip, /Van Poucke et al\., 2022/);
  assert.match(strip, /Abitbol et al\./);
  assert.match(strip, /2026/);
  assert.match(strip, /Golinelli et al\./);
  assert.match(strip, /35,3.*cohort|cohort.*35,3/i);
});

test('Hipotireoidismo congênito inclui tabelas comparativas', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const patho = record?.pathophysiology as Record<string, unknown> | undefined;
  const etiology = record?.etiology as Record<string, unknown> | undefined;
  assert.ok(patho?.tabelaNanismoHipofisario);
  assert.ok(patho?.tabelaDiferencialNanismo);
  assert.ok(patho?.tabelaRadiografia);
  assert.ok(etiology?.genetica);
  assert.ok(etiology?.evidenciaAbitbolRottweiler);
});

test('Hipotireoidismo congênito usa cretinismo apenas como sinônimo histórico', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record?.synonyms?.includes('Cretinismo'));
  assert.doesNotMatch(record?.title ?? '', /cretinismo/i);
  const etiology = record?.etiology as Record<string, unknown> | undefined;
  assert.match(String(etiology?.cretinismoHistorico), /sinônimo histórico/i);
});

test('Hipotireoidismo congênito relaciona adquirido', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record?.relatedDiseaseSlugs?.includes('hipotireoidismo-adquirido-caes-gatos'));
});
