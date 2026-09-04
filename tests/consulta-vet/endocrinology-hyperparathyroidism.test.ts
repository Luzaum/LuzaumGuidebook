import test from 'node:test';
import assert from 'node:assert/strict';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { DIAGNOSTIC_SUBSECTION_PRIORITY } from '../../modules/consulta-vet/utils/editorialSubsectionOrder';

const SLUG = 'hiperparatireoidismo-caes-gatos';

test('Hiperparatireoidismo existe no seed e no catálogo público', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.equal(record?.title, 'Hiperparatireoidismo em cães e gatos');
  assert.match(record?.subtitle ?? '', /CKD-MBD|secundário nutricional/i);
  assert.equal(record?.category, 'endocrinologia');
  assert.deepEqual(record?.species, ['dog', 'cat']);
  assert.equal(record?.vinReferencePending, true);
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG));
  assert.ok(PUBLIC_CATALOG_DISEASE_CARD_STUBS.some((c) => c.slug === SLUG));
});

test('Hiperparatireoidismo tem estrutura editorial mínima', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.ok(record!.quickDecisionStrip.length >= 12);
  assert.equal(record!.references?.length, 23);
  assert.ok(DISEASE_PLAIN_LANGUAGE[SLUG]);
  assert.ok(record!.quickSummaryRich?.diagnosticFlow?.steps.length >= 7);
  assert.ok(record!.quickSummaryRich?.treatmentFlow?.steps.length >= 5);
  assert.ok(record!.quickSummaryRich?.tabelaComparacaoTresMecanismos);
});

test('Hiperparatireoidismo documenta três mecanismos e interpretação PTH', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /autônomo|compensatório/i);
  assert.match(strip, /iCa|cálcio ionizado/i);
  assert.match(strip, /IRIS/i);
  assert.match(strip, /paratireoidectomia/i);

  const etiology = record?.etiology as Record<string, unknown>;
  assert.ok(etiology.cardInterpretacaoPth || etiology.matrizInterpretacaoPth);
  assert.match(String(etiology.alertaNaoUsarCalcioCorrigido), /cálcio corrigido|iCa/i);

  const visible = JSON.stringify({
    quickSummary: record?.quickSummary,
    quickDecisionStrip: record?.quickDecisionStrip,
    etiology: record?.etiology,
    diagnosis: record?.diagnosis,
    treatment: record?.treatment,
  });
  assert.doesNotMatch(visible, /segundo o VIN|VINcyclopedia/i);
});

test('Hiperparatireoidismo inclui IRIS e tratamento por fenótipo', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const diagnosis = record?.diagnosis as Record<string, unknown>;
  const treatment = record?.treatment as Record<string, unknown>;

  assert.ok(diagnosis);
  assert.ok(diagnosis.tabelaAlvosFosforoIrisCao || diagnosis.tabelaAlvosFosforoIrisGato || diagnosis.matrizInterpretacaoPth);
  assert.ok(treatment.phptParatireoidectomia);
  assert.ok(treatment.ckdMbdDietaQuelante);
  assert.ok(treatment.nshpTratamento);
  assert.ok(Array.isArray(treatment.errosComuns) && (treatment.errosComuns as string[]).length >= 5);
});

test('Hiperparatireoidismo prioriza chaves diagnósticas', () => {
  for (const key of ['matrizInterpretacaoPth', 'figuraFluxogramaPrincipal', 'tabelaAlvosFosforoIrisCao']) {
    assert.ok(DIAGNOSTIC_SUBSECTION_PRIORITY.includes(key), `missing diagnostic order for ${key}`);
  }
});
