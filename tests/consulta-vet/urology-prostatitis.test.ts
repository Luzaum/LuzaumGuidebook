import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';

const SLUG = 'prostatite-caes-gatos';

test('Prostatite existe em diseasesSeed', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.deepEqual(record?.species, ['dog', 'cat']);
  assert.equal(record?.category, 'nefrologia-urologia');
});

test('Prostatite está no catálogo público', () => {
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG));
});

test('Prostatite tem cartão de listagem', () => {
  assert.ok(PUBLIC_CATALOG_DISEASE_CARD_STUBS.some((c) => c.slug === SLUG));
});

test('Prostatite tem estrutura editorial mínima', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.ok(record!.quickDecisionStrip.length >= 10);
  assert.ok(record!.references && record!.references.length >= 10);
  assert.ok(record!.plainLanguage || DISEASE_PLAIN_LANGUAGE[SLUG]);
  const signs = record!.clinicalSignsPathophysiology;
  assert.ok(Array.isArray(signs));
  const firstFinding = signs[0]?.findings?.[0];
  assert.ok(firstFinding && typeof firstFinding === 'object' && 'mechanism' in firstFinding);
});

test('Prostatite documenta ISCAID, massagem e urocultura', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /NÃO massagear|massagear/i);
  assert.match(strip, /50%/);
  assert.match(strip, /Weese et al\., 2019/);
  assert.ok(record?.relatedConsensusSlugs?.includes('iscaid-itu-caes-gatos-2019'));
});

test('Prostatite inclui tabelas clínicas e figura CC BY', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const patho = record?.pathophysiology as Record<string, unknown> | undefined;
  assert.ok(patho?.tabelaAgudaCronica);
  assert.ok(patho?.tabelaPenetracao);
  const fig = patho?.figuraHistopatologia as { src?: string };
  assert.match(fig?.src ?? '', /prostatite-caes-gatos/);
  assert.ok(existsSync('public/assets/consulta-vet/diseases/prostatite-caes-gatos/prostatite-espectro-histopatologia-palmieri-2022.webp'));
});

test('Prostatite documenta enrofloxacina e duração', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const treatment = record?.treatment as Record<string, unknown> | undefined;
  assert.ok(treatment?.tabelaAntimicrobianos);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /Enrofloxacina|10 mg\/kg/i);
  assert.match(record?.quickSummary ?? '', /4 semanas/i);
});

test('Prostatite cita divergência de duração sem ocultar', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const duracao = (record?.treatment as Record<string, unknown>)?.duracao as string[] | undefined;
  const text = duracao?.join(' ') ?? '';
  assert.match(text, /4–6 semanas/);
  assert.match(text, /8–12 semanas|≥6/);
});
