import test from 'node:test';
import assert from 'node:assert/strict';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';

const SLUG = 'hipotireoidismo-adquirido-caes-gatos';

test('Hipotireoidismo adquirido existe em diseasesSeed', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.deepEqual(record?.species, ['dog', 'cat']);
  assert.equal(record?.category, 'endocrinologia');
});

test('Hipotireoidismo adquirido está no catálogo público', () => {
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG));
});

test('Hipotireoidismo adquirido tem estrutura editorial mínima', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.ok(record!.quickDecisionStrip.length >= 12);
  assert.ok(record!.references && record!.references.length >= 15);
  assert.ok(record!.plainLanguage || DISEASE_PLAIN_LANGUAGE[SLUG]);
});

test('Hipotireoidismo adquirido documenta NTIS, TSH e TgAA', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /TT4 baixo.*diagnóstico/i);
  assert.match(strip, /20.?40%/);
  assert.match(strip, /TgAA.*NÃO|não mede função/i);
  assert.match(strip, /NTIS|sistêmico doente/i);
});

test('Hipotireoidismo adquirido documenta doses cão e gato', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /0,02 mg\/kg.*q12h/i);
  assert.match(strip, /0,05.?0,10 mg\/GATO/i);
  assert.match(strip, /NÃO mg\/kg/i);
  assert.match(strip, /Bugbee et al\., 2023/);
});

test('Hipotireoidismo adquirido inclui tabela combinada e evidências', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const patho = record?.pathophysiology as Record<string, unknown> | undefined;
  assert.ok(patho?.tabelaCombinacaoDiagnostica);
  assert.ok(patho?.evidenciaBeierCMD);
  const epi = record?.epidemiology as Record<string, unknown> | undefined;
  assert.match(String(epi?.caes), /O'Neill et al\./);
  assert.match(String(epi?.caes), /2022/);
  assert.match(String(epi?.caes), /0,23%/);
});

test('Hipotireoidismo adquirido relaciona congênito, hipertireoidismo e CMD', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record?.relatedDiseaseSlugs?.includes('hipotireoidismo-congenito-caes-gatos'));
  assert.ok(record?.relatedDiseaseSlugs?.includes('hipertireoidismo-felino'));
  assert.ok(record?.relatedDiseaseSlugs?.includes('cardiomiopatia-dilatada-caes-gatos'));
});

test('Hipotireoidismo adquirido documenta coma mixedematoso', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const treatment = record?.treatment as Record<string, unknown> | undefined;
  assert.ok(treatment?.comaMixedematoso);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /Coma mixedematoso/i);
});
