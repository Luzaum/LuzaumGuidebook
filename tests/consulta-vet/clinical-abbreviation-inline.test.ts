import test from 'node:test';
import assert from 'node:assert/strict';
import { lookupClinicalAbbreviation } from '../../modules/consulta-vet/utils/clinicalAbbreviationInline';

test('lookupClinicalAbbreviation resolve siglas neurológicas da junção', () => {
  assert.equal(lookupClinicalAbbreviation('CHAT')?.meaning.includes('colina acetiltransferase'), true);
  assert.equal(lookupClinicalAbbreviation('COLQ')?.meaning.includes('colágeno Q'), true);
  assert.equal(lookupClinicalAbbreviation('CHRNE')?.meaning.includes('épsilon'), true);
  assert.equal(lookupClinicalAbbreviation('ACh')?.meaning.includes('acetilcolina'), true);
  assert.equal(lookupClinicalAbbreviation('AChR-Ab negativo')?.meaning.includes('anticorpos'), true);
});

test('lookupClinicalAbbreviation retorna null para termo desconhecido', () => {
  assert.equal(lookupClinicalAbbreviation('XYZINVENTADO'), null);
});
