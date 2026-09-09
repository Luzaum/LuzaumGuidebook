import assert from 'node:assert/strict';
import test from 'node:test';
import { commercialOticProductsSeed } from '../../modules/consulta-vet/data/commercialOticProducts.seed';
import { SEEDED_TEMPLATES } from '../../modules/consulta-vet/data/receituarioSeed';
import { medicationsSeed } from '../../modules/consulta-vet/data/seed/medications.seed';
import { isKnownInjectionOnlyPrescriptionQuery, searchPrescriptionCommercialProductsByName } from '../../modules/consulta-vet/services/receituarioCommercialCatalogService';
import {
  getEditorialPresentations,
  getEditorialRecommendedDoses,
  resolveEditorialMedication,
} from '../../modules/consulta-vet/utils/clinicalMedicationCatalogBridge';
import {
  isInjectablePrescriptionText,
  isTakeHomeMedicationPresentation,
  isTakeHomePresentationRecord,
  isTakeHomePrescriptionRoute,
  sanitizeCommercialProductForTakeHome,
} from '../../modules/consulta-vet/utils/receituarioTakeHome';

test('reconhece vias e embalagens injetáveis sem bloquear pipeta tópica', () => {
  for (const value of ['IV', 'IM', 'SC', 'SQ', 'via intravenosa', 'subcutânea', 'solução injetável', 'frasco-ampola', 'ampola 2 mL']) {
    assert.equal(isInjectablePrescriptionText(value), true, value);
  }
  for (const value of ['via oral', 'inalatória', 'otológica', 'pipeta spot-on', 'ampola tópica spot-on']) {
    assert.equal(isInjectablePrescriptionText(value), false, value);
  }
});

test('catálogos editorial e comercial só entregam apresentações domiciliares', () => {
  for (const medication of medicationsSeed) {
    const visible = medication.presentations.filter(isTakeHomeMedicationPresentation);
    assert.ok(visible.every(isTakeHomeMedicationPresentation), medication.title);
  }
  for (const product of commercialOticProductsSeed) {
    const visible = sanitizeCommercialProductForTakeHome(product);
    if (!visible) continue;
    assert.ok(visible.presentations.length > 0, product.name);
    assert.ok(visible.presentations.every(line => !isInjectablePrescriptionText(line)), product.name);
  }
});

test('produtos exclusivamente injetáveis e canetas de insulina somem da busca', async () => {
  assert.deepEqual(await searchPrescriptionCommercialProductsByName('Caninsulin'), []);
  assert.deepEqual(await searchPrescriptionCommercialProductsByName('Toujeo'), []);
  assert.deepEqual(await searchPrescriptionCommercialProductsByName('Convenia'), []);
  assert.deepEqual(await searchPrescriptionCommercialProductsByName('Zycortal'), []);
  assert.equal(await isKnownInjectionOnlyPrescriptionQuery('Caninsulin'), true);
  assert.equal(await isKnownInjectionOnlyPrescriptionQuery('Maxicam'), false);

  for (const id of ['med-cefovecina', 'med-desoxicorticosterona-pivalato', 'med-propofol']) {
    const medication = medicationsSeed.find(item => item.id === id);
    if (medication) assert.ok(!medication.presentations.some(isTakeHomeMedicationPresentation), id);
  }
});

test('todo medicamento dos modelos publicados resolve apenas apresentações e doses de casa', () => {
  const models = SEEDED_TEMPLATES.flatMap(template => template.structured_defaults?.clinical_model ? [template.structured_defaults.clinical_model] : []);
  for (const model of models) {
    for (const definition of model.options.flatMap(option => option.medications || [])) {
      assert.equal(isTakeHomePrescriptionRoute(definition.dose.route), true, `${model.categoryPath}: ${definition.name}`);
      const medication = resolveEditorialMedication(definition.canonicalMedicationId);
      if (!medication) continue;
      const presentations = getEditorialPresentations(medication, definition);
      const species = model.categoryPath.includes('felina') || model.categoryPath.includes('Gato') ? 'cat' : null;
      const doses = getEditorialRecommendedDoses(medication, definition, species);
      assert.ok(presentations.every(isTakeHomePresentationRecord), `${model.categoryPath}: ${definition.name}`);
      assert.ok(doses.every(dose => isTakeHomePrescriptionRoute(dose.route)), `${model.categoryPath}: ${definition.name}`);
    }
  }
});
