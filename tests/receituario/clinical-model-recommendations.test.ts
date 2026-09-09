import assert from 'node:assert/strict';
import test from 'node:test';
import { SEEDED_TEMPLATES } from '../../modules/consulta-vet/data/receituarioSeed';

test('todo modelo clínico de receita inclui orientações ao tutor', () => {
  const missing = SEEDED_TEMPLATES
    .filter((template) => template.document_type === 'recipe')
    .filter((template) => {
      const model = template.structured_defaults?.clinical_model;
      return model
        && !model.diseaseRecommendations.length
        && !model.appendBodySections?.length
        && !model.appendBodySectionsBuilder;
    })
    .map((template) => template.id);
  assert.deepEqual(missing, []);
});
