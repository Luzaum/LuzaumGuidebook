import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';

test('Dermatite Atópica Canina (CAD) — Contrato estrutural e conteúdo científico', () => {
  const dogSeed = diseasesSeed.find((d) => d.slug === 'dermatite-atopica-canina');
  assert.ok(dogSeed, 'Dermatite Atópica Canina deve existir em diseasesSeed');
  assert.equal(dogSeed.title, 'Dermatite Atópica Canina');
  assert.deepEqual(dogSeed.species, ['dog']);
  assert.equal(dogSeed.category, 'dermatologia');

  // Catálogo público e stubs
  assert.ok((CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes('dermatite-atopica-canina'));
  const stub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((s) => s.slug === 'dermatite-atopica-canina');
  assert.ok(stub, 'Stub de CAD deve existir');
  assert.equal(stub.title, dogSeed.title);

  // Linguagem simples
  assert.ok(DISEASE_PLAIN_LANGUAGE['dermatite-atopica-canina']);

  // Conteúdo científico canino
  assert.ok(/oclacitinib|apoquel/i.test(dogSeed.quickSummary));
  assert.ok(dogSeed.quickDecisionStrip.some((s) => /favrot/i.test(s)));
  assert.ok(dogSeed.quickDecisionStrip.some((s) => /zenrelia/i.test(s) && /vacin/i.test(s)));
  assert.ok(dogSeed.quickDecisionStrip.some((s) => /numelvi/i.test(s) && /alimento/i.test(s)));

  // Validação de estudos e evidências
  const refIds = dogSeed.references.map((r) => r.id);
  assert.ok(refIds.includes('ref-vin-cad-2024'), 'Deve incluir VIN 2024');
  assert.ok(refIds.includes('ref-hensel-icada-2015'), 'Deve incluir ICADA Diagnóstico Hensel 2015');
  assert.ok(refIds.includes('ref-olivry-icada-2015'), 'Deve incluir ICADA Tratamento Olivry 2015');
  assert.ok(refIds.includes('ref-iscaid-pyoderma-2025'), 'Deve incluir ISCAID Piodermite 2025');
  assert.ok(refIds.includes('ref-forster-ilunocitinib-2025'), 'Deve incluir estudo RCT Ilunocitinib 2025');
  assert.ok(refIds.includes('ref-fda-numelvi-2026'), 'Deve incluir aprovação FDA Numelvi 2026');
});

test('Síndrome Cutânea Atópica Felina (FASS) — Contrato estrutural e conteúdo científico', () => {
  const catSeed = diseasesSeed.find((d) => d.slug === 'sindrome-cutanea-atopica-felina');
  assert.ok(catSeed, 'Síndrome Cutânea Atópica Felina deve existir em diseasesSeed');
  assert.equal(catSeed.title, 'Síndrome Cutânea Atópica Felina');
  assert.deepEqual(catSeed.species, ['cat']);
  assert.equal(catSeed.category, 'dermatologia');

  // Catálogo público e stubs
  assert.ok((CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes('sindrome-cutanea-atopica-felina'));
  const stub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((s) => s.slug === 'sindrome-cutanea-atopica-felina');
  assert.ok(stub);
  assert.equal(stub.title, 'Síndrome Cutânea Atópica Felina');

  // Linguagem simples
  assert.ok(DISEASE_PLAIN_LANGUAGE['sindrome-cutanea-atopica-felina']);

  // Conteúdo científico felino
  assert.ok(/ciclosporina|atopica/i.test(catSeed.quickSummary));
  assert.ok(catSeed.quickDecisionStrip.some((s) => /proibido|felinos/i.test(s)));
  assert.ok(catSeed.quickDecisionStrip.some((s) => /prednisolona/i.test(s)));

  // Os 4 padrões reacionais
  assert.ok(/alopecia autoinduzida/i.test(catSeed.quickSummary));
  assert.ok(/dermatite miliar/i.test(catSeed.quickSummary));
  assert.ok(/granuloma/i.test(catSeed.quickSummary));
  assert.ok(/cabeça/i.test(catSeed.quickSummary));

  // Referências felinas ICADA e Plumb's
  const refIds = catSeed.references.map((r) => r.id);
  assert.equal(catSeed.references.length, 20, 'Bibliografia FASS deve ter 20 referências numeradas');
  assert.ok(refIds.includes('ref-vin-fass-2024'), 'Deve incluir VIN FASS 2024');
  assert.ok(refIds.includes('ref-santoro-fass-diagnosis-2021'), 'Deve incluir ICADA Diagnóstico Felino Santoro 2021');
  assert.ok(refIds.includes('ref-mueller-fass-treatment-2021'), 'Deve incluir ICADA Tratamento Felino Mueller 2021');
  assert.ok(refIds.includes('ref-atopica-cats-fda'), 'Deve incluir Atopica Gatos FDA');
  assert.equal(catSeed.references[17]?.id, 'ref-mueller-fass-treatment-2021', '(18) deve ser Mueller 2021 tratamento');
  assert.equal(catSeed.references[18]?.id, 'ref-atopica-cats-fda', '(19) deve ser Atopica FDA');

  const treatment = catSeed.treatment as Record<string, unknown>;
  const ordem = treatment.ordemDePrioridadeEstruturada as Array<{ title?: string; summary?: string }>;
  const ciclosporinaBlock = ordem?.find((b) => /Ciclosporina Modificada/i.test(b.title ?? b.summary ?? ''));
  assert.ok(ciclosporinaBlock?.summary?.includes('(19)'), 'Dose inicial ciclosporina deve citar (19)');
  assert.match(ciclosporinaBlock?.summary ?? '', /\(18,19\)/, 'Taper ciclosporina deve citar (18,19)');
});
