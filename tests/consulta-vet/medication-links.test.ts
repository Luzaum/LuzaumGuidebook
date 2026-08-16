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
    ['amitriptilina', 'ampicilina', 'ampicilina-sulbactam', 'atropina', 'benzafibrato', 'brometo-de-ipratropio', 'budesonida', 'buprenorfina', 'butorfanol', 'clorambucil', 'desoxicorticosterona-pivalato', 'dexmedetomidina', 'digoxina', 'diltiazem', 'dipirona', 'esmolol', 'fenbendazol', 'fluoxetina', 'fluticasona-salmeterol', 'levotiroxina-sodica', 'marbofloxacina', 'propionato-de-fluticasona', 'propofol', 'propranolol', 'salbutamol', 'selegilina', 'sotalol', 'sulfametoxazol-trimetoprima', 'tiopental'],
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
