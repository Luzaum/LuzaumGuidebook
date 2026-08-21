import assert from 'node:assert/strict';
import test from 'node:test';
import { matchesExactMedicationSearch, matchesMedicationSearch, medicationMatchesCommercialProducts, medicationSearchScore } from '../../modules/consulta-vet/utils/medicationSearch';
import type { MedicationSearchResult } from '../../src/lib/clinicRecords';

test('reconhece correspondência exata sem diferenciar acentos ou maiúsculas', () => {
  assert.equal(matchesMedicationSearch('dipirona', 'DIPIRONA SÓDICA'), true);
});

test('tolera pequeno erro de digitação em princípio ativo', () => {
  assert.equal(matchesMedicationSearch('pimobendam', 'pimobendan cardiologia'), true);
  assert.equal(matchesExactMedicationSearch('pimobendam', 'pimobendan cardiologia'), false);
  assert.ok((medicationSearchScore('pimobendan', 'pimobendan') || 0) < (medicationSearchScore('pimobendam', 'pimobendan') || 0));
});

test('distingue correspondência direta da aproximação por erro de digitação', () => {
  assert.equal(matchesExactMedicationSearch('ondansetrona', 'Vonau Vet — cloridrato de ondansetrona'), true);
  assert.equal(matchesExactMedicationSearch('vonauvet', 'Vonau Vet — cloridrato de ondansetrona'), true);
  assert.equal(matchesExactMedicationSearch('ondansetrona', 'Vetmedin — pimobendan'), false);
});

test('não aplica aproximação imprecisa em termos curtos', () => {
  assert.equal(matchesMedicationSearch('dor', 'dom'), false);
});

test('entende consultas com mais de uma palavra e espaçamento diferente', () => {
  assert.equal(matchesMedicationSearch('vet medin pimoben', 'Vetmedin Boehringer pimobendan 5 mg'), true);
});

test('associa o princípio ativo ao produto comercial da categoria filtrada', () => {
  const pimobendan: MedicationSearchResult = {
    id: 'editorial:pimobendan', name: 'Pimobendan', is_controlled: false, is_private: false,
    metadata: { active_ingredient: 'Pimobendan' },
  };
  const vetmedin: MedicationSearchResult = {
    id: 'commercial:vetmedin', name: 'Vetmedin', is_controlled: false, is_private: false,
    metadata: { search_result_type: 'commercial', active_components: ['pimobendan 1,25 mg/comprimido'] },
  };

  assert.equal(medicationMatchesCommercialProducts(pimobendan, [vetmedin]), true);
});
