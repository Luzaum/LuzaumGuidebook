import test from 'node:test';
import assert from 'node:assert/strict';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';

const SLUG = 'insuficiencia-pancreatica-exocrina-caes-gatos';

test('IPE existe em diseasesSeed', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.deepEqual(record?.species, ['dog', 'cat']);
  assert.equal(record?.category, 'gastroenterologia');
});

test('IPE está no catálogo público', () => {
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG));
});

test('IPE tem cartão de listagem', () => {
  assert.ok(PUBLIC_CATALOG_DISEASE_CARD_STUBS.some((c) => c.slug === SLUG));
});

test('IPE tem estrutura editorial mínima', () => {
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

test('IPE documenta cutoff cTLI 5,5 e fTLI 8', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /5,5/);
  assert.match(strip, /fTLI ≤8|≤8 µg/);
  const patho = record?.pathophysiology as Record<string, unknown> | undefined;
  assert.ok(patho?.tabelaTLICao);
  assert.ok(patho?.tabelaTLIGato);
});

test('IPE explica sensibilidade TLI e valores preditivos', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const diagnosis = record?.diagnosis as Record<string, unknown> | undefined;
  assert.ok(diagnosis && !Array.isArray(diagnosis));
  const conceitos = diagnosis.conceitosTestes as Record<string, string>;
  assert.ok(conceitos?.sensibilidade?.includes('Sensibilidade'));
  assert.ok(conceitos?.valorPreditivoNegativo?.includes('VPN'));
  const plano = diagnosis.planoDiagnostico as unknown[];
  assert.ok(Array.isArray(plano) && plano.length >= 6);
});

test('IPE documenta PERT e cobalamina', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const treatment = record?.treatment as Record<string, unknown> | undefined;
  assert.ok(treatment?.pert);
  assert.ok(treatment?.cobalamin);
  const summary = record?.quickSummary ?? '';
  assert.match(summary, /PERT|cobalamina/i);
});

test('IPE relaciona diabetes mellitus', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record?.relatedDiseaseSlugs?.includes('diabetes-mellitus-canina'));
  assert.ok(record?.relatedDiseaseSlugs?.includes('diabetes-mellitus-felina'));
});
