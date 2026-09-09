import assert from 'node:assert/strict';
import test from 'node:test';
import { RECEITUARIO_PROTOCOL_MODELS } from '../../modules/consulta-vet/data/receituarioProtocolModels';
import { RECEITUARIO_PANCREATITIS_MODELS } from '../../modules/consulta-vet/data/receituarioPancreatitisModels';
import { SEEDED_TEMPLATES } from '../../modules/consulta-vet/data/receituarioSeed';
import { buildClinicalMedicationPrescriptionBlock, buildDefaultClinicalMedicationOverride, buildClinicalMedicationOverridesMap, getEditorialPresentations, mapEditorialDoseToRecommended } from '../../modules/consulta-vet/utils/clinicalMedicationCatalogBridge';
import { renderClinicalRecipe, normalizeClinicalOptionKeys } from '../../modules/consulta-vet/utils/receituarioClinicalModels';
import { prescriptionDurationClause, inferPrescriptionDurationPreset } from '../../modules/consulta-vet/utils/prescriptionSchedule';
import { calculateReceituarioDose, isPresentationRouteCompatible } from '../../modules/consulta-vet/utils/receituarioDoseEngine';
import { medicationsSeed } from '../../modules/consulta-vet/data/seed/medications.seed';
import { simplifyPrescriptionTutorLanguage } from '../../modules/consulta-vet/utils/prescriptionTutorLanguage';
import { extractPrescriptionConcentration, getRouteCategory } from '../../modules/consulta-vet/utils/receituarioMedication';

test('retira as apresentações injetáveis de ondansetrona do Receituário', () => {
  const med = medicationsSeed.find(item => item.id === 'med-ondansetron')!;
  assert.ok(med);
  const definition = RECEITUARIO_PANCREATITIS_MODELS[0].structured_defaults!.clinical_model!.options[0].medications![0];
  const presentations = getEditorialPresentations(med, { ...definition, presentationIds: [], presentationFilter: 'none' });
  assert.ok(presentations.length > 0);
  assert.ok(presentations.every(item => !/inj|injet|ampola/i.test(`${item.id} ${item.pharmaceutical_form} ${item.concentration_text}`)));
});

test('não apaga prazo ou condição de retorno de durações complexas', () => {
  for (const text of ['3 dias; reavaliar em 24 a 48 horas', '7 a 14 dias', 'até reavaliação em 7 dias']) {
    assert.ok(prescriptionDurationClause(text).includes(text));
    assert.equal(inferPrescriptionDurationPreset(text), 'custom');
  }
  assert.equal(inferPrescriptionDurationPreset('3 dias'), 'days');
  assert.equal(prescriptionDurationClause('uma única administração'), ', em dose única');
});

test('N-acetilcisteína não expõe Fluimucil injetável no Receituário', () => {
  const medication = medicationsSeed.find(item => item.id === 'med-n-acetilcisteina')!;
  const presentations = getEditorialPresentations(medication, {
    key: 'nac-test', name: medication.title, canonicalLookupName: medication.title,
    canonicalMedicationId: medication.id, presentationIds: [], linkedDoseIds: [], presentationFilter: 'none',
    dose: { min: 140, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 4 horas', duration: 'conforme avaliação' },
    doseSourceLabel: 'Modelo clínico do ConsultaVet', sourceReviewStatus: 'Revisão de fonte pendente', prescriptionText: '',
  });
  assert.ok(!presentations.some(item => item.id === 'pres-fluimucil-inj-100'));
  assert.ok(presentations.every(item => !/injet|ampola/i.test(`${item.pharmaceutical_form} ${item.concentration_text}`)));
});

test('cabeçalho preserva denominador de concentração e via prescrita prevalece sobre forma', () => {
  assert.equal(extractPrescriptionConcentration('Vonau Vet 4 mg/5 mL'), '4 mg/5 mL');
  assert.equal(extractPrescriptionConcentration('Clorexidina 2%'), '2%');
  assert.equal(getRouteCategory('Buprenorfina — solução injetável\nAdministrar 0,4 mL, por via mucosa oral, a cada 8 horas.'), 'USO NA MUCOSA DA BOCA');
  assert.equal(getRouteCategory('Fluticasona spray\nAdministrar 1 jato, por via inalatória, a cada 12 horas.'), 'USO INALATÓRIO');
});

test('salbutamol não interpreta os 100 mcg do modelo como 100 jatos do catálogo', () => {
  const model = RECEITUARIO_PROTOCOL_MODELS.find(t => t.id === 'seed-asma-felina-protocolo')!.structured_defaults!.clinical_model!;
  const med = model.options.find(o => o.key === 'salbutamol')!.medications![0];
  const overrides = buildClinicalMedicationOverridesMap([med], 'gato');
  const body = renderClinicalRecipe(model, ['salbutamol'], 4, null, 'cápsula', {}, overrides, 'gato');
  assert.match(body, /Administrar 1 jato/);
  assert.doesNotMatch(body, /ERRO DE DOSE|100 jatos/);
});

test('linguagem do tutor preserva condições e nomes dentro de parênteses', () => {
  assert.equal(simplifyPrescriptionTutorLanguage('Suspender o AINE (meloxicam) se houver melena.'), 'Suspender o anti-inflamatório (meloxicam) se houver fezes pretas como piche.');
});

test('asma usa somente jatos inteiros nas apresentações brasileiras de fluticasona', () => {
  const model = RECEITUARIO_PROTOCOL_MODELS.find(t => t.id === 'seed-asma-felina-protocolo')!.structured_defaults!.clinical_model!;
  const medication = model.options.find(o => o.key === 'fluticasone')!.medications![0];
  const initial = buildDefaultClinicalMedicationOverride(medication, 'gato', undefined, 4);
  const stepDown = buildDefaultClinicalMedicationOverride(medication, 'gato', 'step-down', 4);
  assert.equal(initial.selectedDoseValue, 250);
  assert.match(initial.presentationId || '', /pres-flixotide-250/);
  assert.equal(stepDown.selectedDoseValue, 50);
  assert.match(stepDown.presentationId || '', /pres-flixotide-50/);
  const inhaled = renderClinicalRecipe(model, ['fluticasone'], 4, null, 'cápsula', {}, { [medication.key]: initial }, 'gato');
  assert.match(inhaled, /Administrar 1 jato/);
  assert.doesNotMatch(inhaled, /A PREENCHER|ERRO DE DOSE|0,5 jato/);
  const body = renderClinicalRecipe(model, ['prednisolone'], 4, null, 'cápsula', {}, {}, 'gato');
  assert.match(body, /7 a 10 respirações/);
  assert.doesNotMatch(body, /Após esse período, suspender/);
});

test('Seretide seleciona a apresentação 25/125 e mantém o alerta clínico de evidência limitada', () => {
  const model = RECEITUARIO_PROTOCOL_MODELS.find(t => t.id === 'seed-asma-felina-protocolo')!.structured_defaults!.clinical_model!;
  const medication = model.options.find(o => o.key === 'seretide')!.medications![0];
  const override = buildDefaultClinicalMedicationOverride(medication, 'gato', undefined, 4);
  assert.equal(override.selectedDoseValue, 125);
  assert.match(override.presentationId || '', /pres-seretide-25-125/);
  assert.match(medication.internalAlert || '', /evidência direta em gatos.*limitada/i);
  const body = renderClinicalRecipe(model, ['seretide'], 4, null, 'cápsula', {}, { [medication.key]: override }, 'gato');
  assert.match(body, /Administrar 1 jato/);
  assert.doesNotMatch(body, /A PREENCHER|ERRO DE DOSE|0,5 jato/);
});

test('alternativas incompatíveis não entram juntas mesmo em rascunhos antigos', () => {
  const model = RECEITUARIO_PROTOCOL_MODELS.find(t => t.id === 'seed-colapso-traqueia-cao')!.structured_defaults!.clinical_model!;
  assert.deepEqual(normalizeClinicalOptionKeys(model, ['hydrocodone', 'codeine', 'prednisolone']), ['codeine', 'prednisolone']);
  assert.doesNotMatch(renderClinicalRecipe(model, ['hydrocodone', 'codeine'], 5), /^\d+\. HIDROCODONA/m);
});

test('modelos domiciliares não oferecem buprenorfina em solução injetável', () => {
  const options = [...RECEITUARIO_PANCREATITIS_MODELS, ...RECEITUARIO_PROTOCOL_MODELS]
    .flatMap(template => template.structured_defaults?.clinical_model?.options || []);
  assert.ok(!options.some(option => option.key === 'buprenorphine'));
});

test('maropitant felino não escolhe comprimido canino inseguro e usa cápsula manipulada calculada', () => {
  const model = RECEITUARIO_PANCREATITIS_MODELS.find(t => t.id === 'seed-pancreatite-gato')!.structured_defaults!.clinical_model!;
  const medication = model.options.find(o => o.key === 'maropitant')!.medications![0];
  const override = buildDefaultClinicalMedicationOverride(medication, 'gato', undefined, 4);
  assert.equal(override.presentationId, null);
  assert.equal(override.useCompounding, true);
  const block = buildClinicalMedicationPrescriptionBlock(medication, override, 4, 'gato', 1);
  assert.match(block || '', /MANIPULADO/);
  assert.match(block || '', /4 mg\/cápsula/);
  assert.match(block || '', /Administrar 1 cápsula por via oral/);
  assert.doesNotMatch(block || '', /por via por via/);
  assert.doesNotMatch(block || '', /ERRO DE DOSE/);
});

test('maropitant canino prefere apresentação acima do mínimo a uma subdose equivalente', () => {
  const model = RECEITUARIO_PANCREATITIS_MODELS.find(t => t.id === 'seed-pancreatite-cao')!.structured_defaults!.clinical_model!;
  const medication = model.options.find(o => o.key === 'maropitant')!.medications![0];
  const override = buildDefaultClinicalMedicationOverride(medication, 'cão', undefined, 10);
  assert.match(override.presentationId || '', /:24$/);
});

test('modelos de insulina não entram na biblioteca domiciliar', () => {
  assert.ok(!SEEDED_TEMPLATES.some(item => item.id.startsWith('seed-dm-')));
});

test('gabapentina de dose baixa escolhe manipulação em vez de fracionar cápsula humana', () => {
  const model = SEEDED_TEMPLATES.find(item => item.id === 'seed-trauma-vertebromedular-cao')!.structured_defaults!.clinical_model!;
  const medication = model.options.find(item => item.key === 'gabapentin')!.medications![0];
  const override = buildDefaultClinicalMedicationOverride(medication, 'cão', undefined, 10);
  assert.equal(override.useCompounding, true);
  const block = buildClinicalMedicationPrescriptionBlock(medication, override, 10, 'cão', 1) || '';
  assert.match(block, /MANIPULADO/);
  assert.match(block, /100 mg\/cápsula/);
  assert.doesNotMatch(block, /ERRO DE DOSE|A PREENCHER/);
});

test('dose de asma incompatível com bombinha não produz jato fracionado', () => {
  const medication = medicationsSeed.find(m => m.id === 'med-propionato-de-fluticasona')!;
  const model = RECEITUARIO_PROTOCOL_MODELS.find(t => t.id === 'seed-asma-felina-protocolo')!.structured_defaults!.clinical_model!;
  const definition = model.options.find(o => o.key === 'fluticasone')!.medications![0];
  const presentation = getEditorialPresentations(medication, definition).find(p => p.value === 250)!;
  const dose = mapEditorialDoseToRecommended(medication.doses.find(d => d.species === 'cat')!, medication);
  const result = calculateReceituarioDose({ species: 'cat', weightKg: 4, dose, selectedDoseValue: 125, presentation });
  assert.ok(result.blockedReason);
  assert.notEqual(result.practicalAmount, 0.5);
});

test('conversão protege espécie e mantém unidade estruturada sem duplicar kg', () => {
  const medication = medicationsSeed.find(m => m.id === 'med-buprenorfina')!;
  const dose = mapEditorialDoseToRecommended(medication.doses.find(d => d.id === 'dose-buprenorfina-cat-std')!, medication);
  assert.equal(dose.dose_unit, 'mg/kg');
  assert.ok(calculateReceituarioDose({species: 'dog', weightKg: 5, dose, selectedDoseValue: 0.03}).blockedReason);
});

test('Apoquel preserva a transição para manutenção ao calcular comprimidos', () => {
  const model = RECEITUARIO_PROTOCOL_MODELS.find(t => /dermatite-atopica/.test(t.id))!.structured_defaults!.clinical_model!;
  const medication = model.options.find(o => o.key === 'apoquel')!.medications![0];
  const overrides = buildClinicalMedicationOverridesMap([medication], 'cão');
  const body = renderClinicalRecipe(model, ['apoquel'], 10, null, 'cápsula', {}, overrides, 'cão');
  assert.match(body, /a cada 12 horas, durante 14 dias/);
  assert.match(body, /Em seguida, administrar .*a cada 24 horas.*uso contínuo até reavaliação/);
  assert.deepEqual(normalizeClinicalOptionKeys(model, ['apoquel', 'prednisolone']), ['prednisolone']);
});
