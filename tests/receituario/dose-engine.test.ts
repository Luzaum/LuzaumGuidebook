import assert from 'node:assert/strict';
import test from 'node:test';
import type { MedicationPresentationRecord, RecommendedDose } from '../../src/lib/clinicRecords';
import { calculateReceituarioDose, normalizeDoseUnit, resolveAdministrationBasis } from '../../modules/consulta-vet/utils/receituarioDoseEngine';

const presentation = (overrides: Partial<MedicationPresentationRecord> = {}): MedicationPresentationRecord => ({
  id: 'p1', clinic_id: 'c1', medication_id: 'm1', pharmaceutical_form: 'Comprimido', concentration_text: '5 mg/comprimido',
  additional_component: null, presentation_unit: 'comprimido', commercial_name: 'Teste', value: 5, value_unit: 'mg', per_value: 1,
  per_unit: 'comprimido', avg_price_brl: null, pharmacy_veterinary: true, pharmacy_human: false, pharmacy_compounding: false,
  metadata: {}, package_quantity: 10, package_unit: 'comprimidos', created_at: '', ...overrides,
});

const dose = (overrides: Partial<RecommendedDose> = {}): RecommendedDose => ({
  id: 'd1', species: 'cão', route: 'VO', dose_value: 0.5, dose_unit: 'mg/kg', per_weight_unit: 'kg', frequency: 'a cada 24 horas', notes: null, ...overrides,
});

test('preserva unidades mg/kg, mcg/kg, UI/kg, mEq/kg, mg/m² e mL/kg', () => {
  for (const unit of ['mg/kg', 'mcg/kg', 'UI/kg', 'mEq/kg', 'mg/m²', 'mL/kg']) assert.equal(normalizeDoseUnit(unit).canonical, unit);
});

test('calcula dose por peso para cão e gato', () => {
  for (const species of ['dog', 'cat'] as const) {
    const result = calculateReceituarioDose({ species, weightKg: 4, selectedDoseValue: 0.5, dose: dose({ species: species === 'dog' ? 'cão' : 'gato' }) });
    assert.equal(result.totalDose, 2);
  }
});

test('não exige peso para dose por animal', () => {
  const fixed = dose({ dose_unit: 'mg', per_weight_unit: null, administration_basis: 'per_animal', dose_value: 40 });
  assert.equal(resolveAdministrationBasis(fixed), 'per_animal');
  const result = calculateReceituarioDose({ species: 'dog', selectedDoseValue: 40, dose: fixed });
  assert.equal(result.blockedReason, undefined);
  assert.equal(result.totalDose, 40);
});

test('suporta dose por local sem peso', () => {
  const local = dose({ dose_unit: 'gota', per_weight_unit: null, administration_basis: 'per_application_site', administration_target: 'cada ouvido' });
  const result = calculateReceituarioDose({ species: 'cat', selectedDoseValue: 2, dose: local });
  assert.equal(result.basis, 'per_application_site');
  assert.equal(result.requiresWeight, false);
});

test('arredonda 0,40 para 0,50 comprimido quando permite quartos', () => {
  const result = calculateReceituarioDose({ species: 'dog', weightKg: 4, selectedDoseValue: 0.5, dose: dose(), presentation: presentation({ tablet_split_increment: 0.25 }) });
  assert.equal(result.exactAmount, 0.4);
  assert.equal(result.practicalAmount, 0.5);
  assert.equal(result.actualDosePerBasis, 0.625);
  assert.equal(result.requiresConfirmation, true);
});

test('arredonda em quartos e oferece alternativas próximas', () => {
  const result = calculateReceituarioDose({ species: 'dog', weightKg: 7, selectedDoseValue: 0.5, dose: dose(), presentation: presentation({ tablet_split_increment: 0.25 }) });
  assert.equal(result.practicalAmount, 0.75);
  assert.ok(result.alternatives.length >= 2);
});

test('bloqueia comprimido sem divisibilidade cadastrada', () => {
  const result = calculateReceituarioDose({ species: 'dog', weightKg: 4, selectedDoseValue: 0.5, dose: dose(), presentation: presentation() });
  assert.match(result.blockedReason || '', /Divisibilidade/);
});

test('cápsula é inteira e exige alternativa quando a dose é fracionada', () => {
  const result = calculateReceituarioDose({ species: 'dog', weightKg: 4, selectedDoseValue: 0.5, dose: dose(), presentation: presentation({ pharmaceutical_form: 'Cápsula', presentation_unit: 'cápsula', per_unit: 'cápsula' }) });
  assert.equal(result.practicalAmount, 1);
  assert.equal(result.requiresConfirmation, true);
});

test('converte mcg para mg sem interpretar como mg/kg', () => {
  const result = calculateReceituarioDose({ species: 'dog', weightKg: 10, selectedDoseValue: 100, dose: dose({ dose_value: 100, dose_unit: 'mcg/kg' }), presentation: presentation({ value: 1, value_unit: 'mg', tablet_split_increment: 1 }) });
  assert.equal(result.totalDose, 1);
  assert.equal(result.exactAmount, 1);
});
