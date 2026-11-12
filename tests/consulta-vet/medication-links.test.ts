import assert from 'node:assert/strict';
import test from 'node:test';
import { commercialOticProductsSeed } from '../../modules/consulta-vet/data/commercialOticProducts.seed';
import { medicationsSeed } from '../../modules/consulta-vet/data/seed/medications.seed';
import {
  getCommercialProductsForMedication,
  getMedicationsForCommercialProduct,
} from '../../modules/consulta-vet/utils/commercialMedicationLinks';

test('o vínculo automático cobre o catálogo atual sem inventar equivalência de princípio ativo', () => {
  const withoutCommercialProducts = medicationsSeed.filter(
    (medication) => getCommercialProductsForMedication(medication, commercialOticProductsSeed).length === 0,
  );
  assert.deepEqual(
    withoutCommercialProducts.map((medication) => medication.slug).sort(),
    [
      'amitriptilina',
      'ampicilina-sulbactam',
      'betanecol',
      'buprenorfina',
      'clorambucil',
      'diazepam',
      'dipirona',
      'metadona',
      'micofenolato-mofetila',
      'pradofloxacina',
      'trazodona',
    ],
  );
});

test('o vínculo medicamento-comercial funciona nos dois sentidos', () => {
  for (const medication of medicationsSeed) {
    const products = getCommercialProductsForMedication(medication, commercialOticProductsSeed);
    for (const product of products) {
      assert.ok(
        getMedicationsForCommercialProduct(product, medicationsSeed).some((candidate) => candidate.slug === medication.slug),
        `${product.slug} deveria apontar de volta para ${medication.slug}`,
      );
    }
  }
});

test('todas as monografias têm ao menos uma referência pública verificável', () => {
  const withoutLinkedEvidence = medicationsSeed.filter(
    (medication) => !(medication.references || []).some((reference) => reference.url),
  );
  assert.deepEqual(withoutLinkedEvidence.map((medication) => medication.slug), []);
});

test('Milteforan vincula a bula e a única dose calculável à solução canina de 20 mg/mL', () => {
  const medication = medicationsSeed.find((item) => item.slug === 'miltefosina');
  assert.ok(medication);
  const [product, ...otherProducts] = getCommercialProductsForMedication(medication, commercialOticProductsSeed);
  assert.equal(product?.slug, 'milteforan');
  assert.equal(otherProducts.length, 0);
  assert.equal(product.labelUrl, medication.leafletUrl);
  assert.deepEqual(medication.species, ['dog']);
  assert.match(medication.controlNotice ?? '', /SIPEAGRO/);
  const [dose, ...otherDoses] = medication.doses.filter((item) => item.calculatorEnabled);
  assert.equal(otherDoses.length, 0);
  assert.ok(dose);
  const presentation = medication.presentations.find((item) => item.id === dose.presentationId);
  assert.equal(presentation?.commercialProductSlug, product.slug);
  assert.equal(presentation?.concentrationValue, 20);
  assert.deepEqual([dose.species, dose.doseMin, dose.doseMax, dose.route], ['dog', 2, 2, 'VO']);
  assert.equal(dose.duration, '28 dias consecutivos');
});
