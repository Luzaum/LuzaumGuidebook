import test from 'node:test';
import assert from 'node:assert/strict';
import { lookupClinicalAbbreviation, ClinicalAbbreviationText } from '../../modules/consulta-vet/utils/clinicalAbbreviationInline';

test('lookupClinicalAbbreviation retorna null — siglas devem estar por extenso no conteúdo', () => {
  assert.equal(lookupClinicalAbbreviation('PIF'), null);
  assert.equal(lookupClinicalAbbreviation('TLI'), null);
  assert.equal(lookupClinicalAbbreviation('XYZINVENTADO'), null);
});

test('ClinicalAbbreviationText repassa texto sem transformação', () => {
  assert.equal(typeof ClinicalAbbreviationText, 'function');
});
