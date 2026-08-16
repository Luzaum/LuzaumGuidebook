import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';

test('Diabetes Mellitus Canino — Contrato estrutural e conteúdo científico', () => {
  const dogSeed = diseasesSeed.find((d) => d.slug === 'diabetes-mellitus-canina');
  assert.ok(dogSeed, 'Diabetes Mellitus Canino deve existir em diseasesSeed');
  assert.equal(dogSeed.title, 'Diabetes Mellitus Canino', 'Título deve ser Diabetes Mellitus Canino');
  assert.deepEqual(dogSeed.species, ['dog']);
  assert.equal(dogSeed.category, 'endocrinologia');

  // Catálogo público e stubs
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes('diabetes-mellitus-canina'));
  const stub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((s) => s.slug === 'diabetes-mellitus-canina');
  assert.ok(stub);
  assert.equal(stub.title, 'Diabetes Mellitus Canino');

  // Linguagem simples
  assert.ok(DISEASE_PLAIN_LANGUAGE['diabetes-mellitus-canina']);

  // Conteúdo científico
  assert.ok(dogSeed.quickSummary.includes('0,25 U/kg SC q12h'));
  assert.ok(dogSeed.quickDecisionStrip.some((s) => s.includes('OVARIOHISTERECTOMIA')));
  assert.ok(dogSeed.quickDecisionStrip.some((s) => s.includes('Toujeo U300')));

  // Validação de estudos e evidências
  const refIds = dogSeed.references.map((r) => r.id);
  assert.ok(refIds.includes('ref-tardo-toujeo-2024'), 'Deve incluir estudo Toujeo U300 Tardo 2024');
  assert.ok(refIds.includes('ref-mott-degludec-2025'), 'Deve incluir estudo Degludeca Mott 2025');
  assert.ok(refIds.includes('ref-beam-cataract-1999'), 'Deve incluir estudo de catarata Beam 1999');

  // Fluxogramas e tabela de insulinas
  assert.ok(dogSeed.quickSummaryRich?.diagnosticFlow?.steps.length);
  assert.ok(dogSeed.quickSummaryRich?.treatmentFlow?.steps.length);
  const treatment = dogSeed.treatment as Record<string, unknown>;
  assert.equal((treatment.tabelaInsulinas as { kind?: string })?.kind, 'clinicalTable');
  assert.ok(Array.isArray(treatment.fluxogramaResistencia));
  assert.equal((treatment.tabelaPesoIdealEcc as { kind?: string })?.kind, 'clinicalTable');
  assert.ok(Array.isArray(treatment.exemploCalculoInsulina));
  assert.ok(!JSON.stringify(dogSeed.treatment).includes('rebound'));
  assert.ok(dogSeed.prevention && typeof dogSeed.prevention === 'object');
  assert.ok(!('complications' in dogSeed), 'Complicações devem estar em treatment.complicacoes');
});

test('Diabetes Mellitus Felino — Contrato estrutural e conteúdo científico', () => {
  const catSeed = diseasesSeed.find((d) => d.slug === 'diabetes-mellitus-felina');
  assert.ok(catSeed, 'Diabetes Mellitus Felino deve existir em diseasesSeed');
  assert.equal(catSeed.title, 'Diabetes Mellitus Felino', 'Título deve ser Diabetes Mellitus Felino');
  assert.deepEqual(catSeed.species, ['cat']);
  assert.equal(catSeed.category, 'endocrinologia');

  // Catálogo público e stubs
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes('diabetes-mellitus-felina'));
  const stub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((s) => s.slug === 'diabetes-mellitus-felina');
  assert.ok(stub);
  assert.equal(stub.title, 'Diabetes Mellitus Felino');

  // Linguagem simples
  assert.ok(DISEASE_PLAIN_LANGUAGE['diabetes-mellitus-felina']);

  // Conteúdo científico felino
  assert.ok(catSeed.quickSummary.includes('Glargina U100 ou PZI') || catSeed.quickSummary.includes('1 UI/gato'));
  assert.ok(catSeed.quickDecisionStrip.some((s) => s.includes('eDKA') || s.includes('SGLT2')));
  assert.ok(catSeed.quickDecisionStrip.some((s) => s.includes('BHB >2,4 mmol/L')));

  // Referências felinas AAHA 2026 e iCatCare 2025
  const refIds = catSeed.references.map((r) => r.id);
  assert.ok(refIds.includes('ref-aaha-2026-cats'), 'Deve incluir diretriz AAHA 2026');
  assert.ok(refIds.includes('ref-icatcare-2025'), 'Deve incluir consenso iCatCare 2025');
  assert.ok(refIds.includes('ref-bexacat-fda-2026'), 'Deve incluir Bexacat FDA');

  // Fluxogramas, tabela e prevenção
  assert.ok(catSeed.quickSummaryRich?.diagnosticFlow?.steps.length);
  assert.ok(catSeed.quickSummaryRich?.treatmentFlow?.steps.length);
  const catTreatment = catSeed.treatment as Record<string, unknown>;
  assert.equal((catTreatment.tabelaInsulinas as { kind?: string })?.kind, 'clinicalTable');
  assert.ok(Array.isArray(catTreatment.fluxogramaResistencia));
  assert.equal((catTreatment.tabelaPesoIdealEcc as { kind?: string })?.kind, 'clinicalTable');
  assert.ok(!JSON.stringify(catSeed.treatment).includes('Monitor the cat'));
  assert.ok(!JSON.stringify(catSeed.treatment).includes('High-Protein'));
  assert.ok(catSeed.prevention && typeof catSeed.prevention === 'object');
  assert.ok(!('complications' in catSeed), 'Complicações devem estar em treatment.complicacoes');

  // Correção editorial: cascata sem texto periodontal
  const cascata = (catSeed.pathogenesisTransmission as { cascata?: string[] })?.cascata ?? [];
  assert.ok(!cascata.some((line) => line.includes('película') || line.includes('esmalte')));
  assert.ok(!String(catSeed.pathophysiology).includes('sulco periodontal'));
});

test('Doença Periodontal — Verificação de títulos Canina e Felina', () => {
  const dogPeriodontal = diseasesSeed.find((d) => d.slug === 'doenca-periodontal-caes');
  const catPeriodontal = diseasesSeed.find((d) => d.slug === 'doenca-periodontal-gatos');

  assert.ok(dogPeriodontal);
  assert.ok(catPeriodontal);

  assert.equal(dogPeriodontal.title, 'Doença Periodontal Canina', 'Título do cão deve explicitar Canina');
  assert.equal(catPeriodontal.title, 'Doença Periodontal Felina', 'Título do gato deve explicitar Felina');
});
