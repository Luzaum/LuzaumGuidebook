import test from 'node:test';
import assert from 'node:assert/strict';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';

const SLUG_CANINE = 'doenca-periodontal-caes';
const SLUG_FELINE = 'doenca-periodontal-gatos';

test('Doença Periodontal — Cães existe em diseasesSeed', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG_CANINE);
  assert.ok(record);
  assert.deepEqual(record?.species, ['dog']);
  assert.equal(record?.category, 'odontologia');
});

test('Doença Periodontal — Gatos existe em diseasesSeed', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG_FELINE);
  assert.ok(record);
  assert.deepEqual(record?.species, ['cat']);
  assert.equal(record?.category, 'odontologia');
});

test('Ambas as doenças periodontais estão no catálogo público', () => {
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG_CANINE));
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG_FELINE));
});

test('Ambas as doenças periodontais têm cartões de listagem (stubs)', () => {
  assert.ok(PUBLIC_CATALOG_DISEASE_CARD_STUBS.some((c) => c.slug === SLUG_CANINE));
  assert.ok(PUBLIC_CATALOG_DISEASE_CARD_STUBS.some((c) => c.slug === SLUG_FELINE));
});

test('Doença Periodontal — Cães possui estrutura editorial completa', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG_CANINE);
  assert.ok(record);
  assert.ok(record!.quickDecisionStrip.length >= 10);
  assert.ok(record!.references && record!.references.length >= 15);
  assert.ok(record!.plainLanguage || DISEASE_PLAIN_LANGUAGE[SLUG_CANINE]);

  const signs = record!.clinicalSignsPathophysiology;
  assert.ok(Array.isArray(signs));
  const firstFinding = signs[0]?.findings?.[0];
  assert.ok(firstFinding && typeof firstFinding === 'object' && 'mechanism' in firstFinding);
});

test('Doença Periodontal — Gatos possui estrutura editorial completa', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG_FELINE);
  assert.ok(record);
  assert.ok(record!.quickDecisionStrip.length >= 10);
  assert.ok(record!.references && record!.references.length >= 12);
  assert.ok(record!.plainLanguage || DISEASE_PLAIN_LANGUAGE[SLUG_FELINE]);

  const signs = record!.clinicalSignsPathophysiology;
  assert.ok(Array.isArray(signs));
  const firstFinding = signs[0]?.findings?.[0];
  assert.ok(firstFinding && typeof firstFinding === 'object' && 'mechanism' in firstFinding);
});

test('Cães: valida limiares, AVDC, evidências e antibiotic stewardship', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG_CANINE);
  const text = JSON.stringify(record);

  assert.match(text, /0 a 3 mm|≤3 mm/);
  assert.match(text, /PD0|PD1|PD2|PD3|PD4/);
  assert.match(text, /AVDC/);
  assert.match(text, /41,57%/); // Bauer 2018
  assert.match(text, /O'Neill et al\., 2021|22\.333/); // VetCompass
  assert.match(text, /Yang & Moon, 2026/);
  assert.match(text, /Hendy et al\., 2026/);
  assert.match(text, /RANKL/);
  assert.match(text, /ANTIBIÓTICO NÃO É TRATAMENTO PRIMÁRIO/i);
});

test('Gatos: valida sulco 0-1 mm, diferenciais (TR/FCGS), early-onset e evidências', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG_FELINE);
  const text = JSON.stringify(record);

  assert.match(text, /0 a 1 mm|≤1 mm/);
  assert.match(text, /Tooth Resorption/i);
  assert.match(text, /FCGS|gengivoestomatite/i);
  assert.match(text, /Palmeira et al\., 2022/);
  assert.match(text, /Soltero-Rivera et al\., 2023/);
  assert.match(text, /Rodrigues et al\., 2019/);
  assert.match(text, /O'Neill et al\., 2023/);
  assert.match(text, /Trevejo et al\., 2018/);
  assert.match(text, /92,8%/); // Raízes retidas felinas
});
