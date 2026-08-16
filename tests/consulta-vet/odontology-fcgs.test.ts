import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';

const SLUG = 'gengivoestomatite-cronica-felina';

test('FCGS existe em diseasesSeed', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.deepEqual(record?.species, ['cat']);
  assert.equal(record?.category, 'odontologia');
});

test('FCGS está no catálogo público', () => {
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG));
});

test('FCGS tem cartão de listagem', () => {
  assert.ok(PUBLIC_CATALOG_DISEASE_CARD_STUBS.some((c) => c.slug === SLUG));
});

test('FCGS tem estrutura editorial mínima', () => {
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

test('FCGS documenta extrações, antibiótico e radiografia', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /extração|PME|FME/i);
  assert.match(strip, /Antibiótico NÃO|antibiótico/i);
  assert.match(strip, /radiograf/i);
  assert.match(strip, /Lobprise et al\., 2025/);
});

test('FCGS inclui tabelas clínicas e figuras', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const patho = record?.pathophysiology as Record<string, unknown> | undefined;
  assert.ok(patho?.tabelaPMEFME);
  assert.ok(patho?.tabelaHierarquiaTerapeutica);
  const fig = patho?.figuraFenotipos as { src?: string };
  assert.match(fig?.src ?? '', /gengivoestomatite-cronica-felina/);
  assert.ok(
    existsSync(
      'public/assets/consulta-vet/diseases/gengivoestomatite-cronica-felina/fcgs-fenotipos-soltero-rivera-2023.jpg',
    ),
  );
});

test('FCGS documenta ciclosporina pós-extração e refratário', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const treatment = record?.treatment as Record<string, unknown> | undefined;
  const ciclosporina = treatment?.ciclosporina as string;
  assert.match(ciclosporina, /2,5 mg\/kg/);
  assert.match(ciclosporina, /pós-extração|após extração/i);
  assert.match(record?.quickSummary ?? '', /Jennings et al\., 2015/);
});

test('FCGS relaciona FIV, FeLV e granuloma eosinofílico', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record?.relatedDiseaseSlugs?.includes('imunodeficiencia-felina-fiv'));
  assert.ok(record?.relatedDiseaseSlugs?.includes('leucemia-viral-felina'));
  assert.ok(record?.relatedDiseaseSlugs?.includes('granuloma-eosinofilico-felino'));
});
