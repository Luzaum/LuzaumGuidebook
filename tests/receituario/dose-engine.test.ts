import assert from 'node:assert/strict';
import test from 'node:test';
import type { MedicationPresentationRecord, RecommendedDose } from '../../src/lib/clinicRecords';
import { calculateReceituarioDose, formatAdministrationAmount, formatRecommendedDoseUnit, inferTabletSplitIncrement, normalizeDoseUnit, resolveAdministrationBasis } from '../../modules/consulta-vet/utils/receituarioDoseEngine';

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

test('recompõe unidades clínicas armazenadas em colunas separadas', () => {
  assert.equal(formatRecommendedDoseUnit(dose({ dose_unit: 'mg', per_weight_unit: 'kg' })), 'mg/kg');
  assert.equal(formatRecommendedDoseUnit(dose({ dose_unit: 'UI', per_weight_unit: 'kg' })), 'UI/kg');
  assert.equal(formatRecommendedDoseUnit(dose({ dose_unit: 'mL', per_weight_unit: 'kg' })), 'mL/kg');
  assert.equal(formatRecommendedDoseUnit(dose({ dose_unit: 'mcg/kg', per_weight_unit: 'kg' })), 'mcg/kg');
});

test('formata a unidade prática no singular e plural para o tutor', () => {
  assert.equal(formatAdministrationAmount(1, 'comprimido'), '1 comprimido');
  assert.equal(formatAdministrationAmount(0.5, 'comprimido'), '0,5 comprimido');
  assert.equal(formatAdministrationAmount(5, 'gota'), '5 gotas');
  assert.equal(formatAdministrationAmount(0.25, 'mL'), '0,25 mL');
});

test('reconhece kg/dia como dose dependente do peso', () => {
  const dailyDose = dose({ dose_unit: 'mg', per_weight_unit: 'kg/dia' });
  assert.equal(formatRecommendedDoseUnit(dailyDose), 'mg/kg/dia');
  assert.equal(resolveAdministrationBasis(dailyDose), 'weight_based');
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

test('aceita três quartos de comprimido como quantidade prática', () => {
  const result = calculateReceituarioDose({
    species: 'dog',
    weightKg: 5,
    selectedDoseValue: 0.75,
    dose: dose(),
    presentation: presentation({ value: 5, tablet_split_increment: 0.5 }),
  });
  assert.equal(result.exactAmount, 0.75);
  assert.equal(result.practicalAmount, 0.5);
  assert.equal(result.requiresConfirmation, true);
});

test('bloqueia comprimido inteiro quando a apresentação sem divisibilidade causaria sobredose', () => {
  const result = calculateReceituarioDose({ species: 'dog', weightKg: 7.5, selectedDoseValue: 0.5, dose: dose(), presentation: presentation({ value: 5, tablet_split_increment: null }) });
  assert.equal(result.practicalAmount, 1);
  assert.match(String(result.blockedReason), /forneceria .*% a mais/i);
});

test('cápsula é inteira e exige alternativa quando a dose é fracionada', () => {
  const result = calculateReceituarioDose({ species: 'dog', weightKg: 4, selectedDoseValue: 0.5, dose: dose(), presentation: presentation({ pharmaceutical_form: 'Cápsula', presentation_unit: 'cápsula', per_unit: 'cápsula' }) });
  assert.equal(result.practicalAmount, 1);
  assert.equal(result.requiresConfirmation, false);
  assert.match(String(result.blockedReason), /forneceria .*% a mais/i);
});

test('dipirona de 500 mg não vira um comprimido inteiro para cão de 5 kg', () => {
  const oralDose = dose({ dose_value: 25, dose_unit: 'mg', per_weight_unit: 'kg', frequency: 'q8h' });
  const splitIncrement = inferTabletSplitIncrement('Comprimido', 'Partível');
  const presentation500 = presentation({ value: 500, value_unit: 'mg/comprimido', tablet_split_increment: splitIncrement });
  assert.equal(formatRecommendedDoseUnit(oralDose), 'mg/kg');
  assert.equal(splitIncrement, 0.5);

  const result = calculateReceituarioDose({
    species: 'dog',
    weightKg: 5,
    selectedDoseValue: 25,
    dose: oralDose,
    presentation: presentation500,
  });
  assert.equal(result.totalDose, 125);
  assert.equal(result.exactAmount, 0.25);
  assert.equal(result.practicalAmount, 0.5);
  assert.match(String(result.blockedReason), /100,0% a mais/i);
});

test('converte dipirona 500 mg/mL em gotas apenas quando o gotejador está estruturado', () => {
  const oralDose = dose({ dose_value: 25, dose_unit: 'mg', per_weight_unit: 'kg' });
  const drops = presentation({
    pharmaceutical_form: 'Solução oral (gotas)',
    presentation_unit: null,
    value: 500,
    value_unit: 'mg/mL',
    per_value: null,
    per_unit: null,
    metadata: { drops_per_ml: 20 },
  });
  const result = calculateReceituarioDose({ species: 'dog', weightKg: 5, selectedDoseValue: 25, dose: oralDose, presentation: drops });
  assert.equal(result.totalDose, 125);
  assert.equal(result.exactAmount, 5);
  assert.equal(result.practicalAmount, 5);
  assert.equal(result.administrationUnit, 'gota');
});

test('solução em gotas sem fator documentado permanece em mL', () => {
  const oralDose = dose({ dose_value: 25, dose_unit: 'mg', per_weight_unit: 'kg' });
  const drops = presentation({
    pharmaceutical_form: 'Solução oral (gotas)',
    presentation_unit: null,
    value: 500,
    value_unit: 'mg/mL',
    per_value: null,
    per_unit: null,
    metadata: {},
  });
  const result = calculateReceituarioDose({ species: 'dog', weightKg: 5, selectedDoseValue: 25, dose: oralDose, presentation: drops });
  assert.equal(result.exactAmount, 0.25);
  assert.equal(result.practicalAmount, 0.25);
  assert.equal(result.administrationUnit, 'mL');
});

test('converte mcg para mg sem interpretar como mg/kg', () => {
  const result = calculateReceituarioDose({ species: 'dog', weightKg: 10, selectedDoseValue: 100, dose: dose({ dose_value: 100, dose_unit: 'mcg/kg' }), presentation: presentation({ value: 1, value_unit: 'mg', tablet_split_increment: 1 }) });
  assert.equal(result.totalDose, 1);
  assert.equal(result.exactAmount, 1);
});

test('interpreta corretamente concentração legada em mg/5 mL', () => {
  const result = calculateReceituarioDose({
    species: 'dog',
    selectedDoseValue: 20,
    dose: dose({ dose_value: 20, dose_unit: 'mg', per_weight_unit: null, administration_basis: 'per_animal' }),
    presentation: presentation({ pharmaceutical_form: 'Suspensão', presentation_unit: 'mL', value: 20, value_unit: 'mg/5 mL', per_value: null, per_unit: 'mL' }),
  });
  assert.equal(result.exactAmount, 5);
  assert.equal(result.practicalAmount, 5);
});

test('calcula mL/kg diretamente sem exigir concentração em massa', () => {
  const result = calculateReceituarioDose({
    species: 'cat',
    weightKg: 4,
    selectedDoseValue: 0.5,
    dose: dose({ species: 'gato', dose_value: 0.5, dose_unit: 'mL/kg' }),
    presentation: presentation({ pharmaceutical_form: 'Solução', presentation_unit: 'mL', value: null, value_unit: null, per_value: null, per_unit: 'mL' }),
  });
  assert.equal(result.totalDose, 2);
  assert.equal(result.practicalAmount, 2);
  assert.equal(result.blockedReason, undefined);
});

test('bloqueia peso fora da faixa plausível da espécie', () => {
  const result = calculateReceituarioDose({ species: 'cat', weightKg: 31, selectedDoseValue: 0.5, dose: dose({ species: 'gato' }) });
  assert.match(String(result.blockedReason), /fora da faixa plausível/);
});
