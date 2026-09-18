import assert from 'node:assert/strict';
import test from 'node:test';

import { includesRelatedSlug } from '../../modules/consulta-vet/utils/relatedContent';

test('vínculo relacionado ausente é tratado como lista vazia', () => {
  assert.equal(includesRelatedSlug(undefined, 'anemia-caes-gatos'), false);
  assert.equal(includesRelatedSlug(null, 'anemia-caes-gatos'), false);
});

test('vínculo relacionado encontra apenas o slug informado', () => {
  const slugs = ['anemia-caes-gatos', 'leishmaniose-caes-gatos'];

  assert.equal(includesRelatedSlug(slugs, 'anemia-caes-gatos'), true);
  assert.equal(includesRelatedSlug(slugs, 'cinomose-canina'), false);
});
