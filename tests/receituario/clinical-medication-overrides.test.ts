import assert from 'node:assert/strict';
import test from 'node:test';
import { RECEITUARIO_PROTOCOL_MODELS } from '../../modules/consulta-vet/data/receituarioProtocolModels';
import { RECEITUARIO_INFECTOLOGIA_MODELS } from '../../modules/consulta-vet/data/receituarioInfectologiaModels';
import {
  buildClinicalMedicationPrescriptionBlock,
  buildDefaultClinicalMedicationOverride,
  evaluateClinicalMedicationCatalogStatus,
  evaluateCommercialDoseAlert,
  formatClinicalModelDoseRange,
  listClinicalMedicationsNeedingRegistration,
  resolveClinicalMedicationDoseAlert,
} from '../../modules/consulta-vet/utils/clinicalMedicationCatalogBridge';
import { stripPrescriptionTechnicalDetails } from '../../modules/consulta-vet/utils/receituarioTemplateCalculator';
import { getClinicalRecipeObservations, getDefaultClinicalOptionKeys, renderClinicalRecipe } from '../../modules/consulta-vet/utils/receituarioClinicalModels';

const gastroTemplate = RECEITUARIO_PROTOCOL_MODELS.find((item) => item.id === 'seed-gastroenterite-aguda-nao-complicada-cao');
assert.ok(gastroTemplate?.structured_defaults?.clinical_model);
const gastroModel = gastroTemplate.structured_defaults.clinical_model;
const maropitant = gastroModel.options.find((item) => item.key === 'maropitant')!.medications![0];
const ondansetron = gastroModel.options.find((item) => item.key === 'ondansetron')!.medications![0];

test('formata faixa do modelo clínico', () => {
  assert.equal(formatClinicalModelDoseRange(maropitant.dose), '2 mg/kg');
});

test('gera bloco editorial com apresentação e faixas do ConsultaVet', () => {
  const override = buildDefaultClinicalMedicationOverride(maropitant, 'cão');
  const block = buildClinicalMedicationPrescriptionBlock(maropitant, override, 5, 'Cão', 1);
  assert.match(block || '', /MAROPITANT —/i);
  assert.doesNotMatch(block || '', /APRESENTAÇÃO A SELECIONAR/i);
  assert.doesNotMatch(block || '', /Faixa do modelo/i);
  assert.doesNotMatch(block || '', /Faixa ConsultaVet/i);
  assert.match(block || '', /Dose clínica:/i);
  assert.match(block || '', /Administrar .* por via oral/i);
});

test('gera bloco comercial com dose escolhida resumida', () => {
  const override = buildDefaultClinicalMedicationOverride(ondansetron, 'cão');
  const block = buildClinicalMedicationPrescriptionBlock(ondansetron, override, 5, 'Cão', 2);
  assert.match(block || '', /ONDANSETRONA — VONAU/i);
  assert.doesNotMatch(block || '', /Catálogo comercial/i);
  assert.match(block || '', /Dose clínica: 0,5 mg\/kg/i);
});

test('renderiza receita clínica com overrides aplicados', () => {
  const selectedKeys = ['maropitant', 'ondansetron'];
  const overrides = {
    [maropitant.key]: buildDefaultClinicalMedicationOverride(maropitant, 'cão'),
    [ondansetron.key]: buildDefaultClinicalMedicationOverride(ondansetron, 'cão'),
  };
  const rendered = renderClinicalRecipe(gastroModel, selectedKeys, 5, null, 'cápsula', {}, overrides, 'Cão');
  assert.doesNotMatch(rendered, /APRESENTAÇÃO A SELECIONAR/i);
  assert.match(rendered, /MAROPITANT —/i);
  assert.match(rendered, /ONDANSETRONA —/i);
});

test('mantém seed inicial sem overrides explícitos', () => {
  const rendered = renderClinicalRecipe(gastroModel, getDefaultClinicalOptionKeys(gastroModel), null);
  assert.match(rendered, /APRESENTAÇÃO A SELECIONAR/i);
});

test('nota clínica de parvovirose fica nas observações e não na receita', () => {
  const selectedKeys = getDefaultClinicalOptionKeys(gastroModel);
  const rendered = renderClinicalRecipe(gastroModel, selectedKeys, 5, null, 'cápsula', {}, {}, 'Cão');
  assert.doesNotMatch(rendered, /parvovirose/i);
  const observations = getClinicalRecipeObservations(gastroModel, selectedKeys);
  assert.ok(observations.some((note) => /parvovirose/i.test(note)));
});

test('precauções de medicamento ficam nas observações e não na receita', () => {
  const selectedKeys = ['maropitant', 'ondansetron'];
  const rendered = renderClinicalRecipe(gastroModel, selectedKeys, 5, null, 'cápsula', {}, {}, 'Cão');
  assert.doesNotMatch(rendered, /CUIDADOS IMPORTANTES DO MEDICAMENTO/i);
  assert.doesNotMatch(rendered, /maropitant e ondansetrona automaticamente/i);
  const observations = getClinicalRecipeObservations(gastroModel, selectedKeys);
  assert.ok(observations.some((note) => /maropitant e ondansetrona/i.test(note)));
  assert.ok(observations.some((note) => /metronidazol/i.test(note)));
});

test('maropitant está no catálogo e probiótico exige cadastro', () => {
  const maropitant = gastroModel.options.find((item) => item.key === 'maropitant')!.medications![0];
  const probiotic = gastroModel.options.find((item) => item.key === 'probiotic')!.medications![0];
  assert.equal(evaluateClinicalMedicationCatalogStatus(maropitant, 'cão').editable, true);
  assert.equal(evaluateClinicalMedicationCatalogStatus(probiotic, 'cão').needsRegistration, true);
});

test('meloxicam com catálogo comercial é editável', () => {
  const castrationModel = RECEITUARIO_PROTOCOL_MODELS.find((item) => item.id === 'seed-pos-operatorio-castracao-cadela')!.structured_defaults!.clinical_model!;
  const meloxicam = castrationModel.options.find((item) => item.key === 'meloxicam')!.medications![0];
  const status = evaluateClinicalMedicationCatalogStatus(meloxicam, 'cão');
  assert.equal(status.editable, true);
  assert.equal(status.needsRegistration, false);
  const missing = listClinicalMedicationsNeedingRegistration([meloxicam], 'cão');
  assert.equal(missing.length, 0);
  const override = buildDefaultClinicalMedicationOverride(meloxicam, 'cão');
  const block = buildClinicalMedicationPrescriptionBlock(meloxicam, override, 10, 'Cão', 1);
  assert.match(block || '', /MELOXICAM —/i);
  assert.doesNotMatch(block || '', /APRESENTAÇÃO A SELECIONAR/i);
});

test('apoquel e itraconazol com catálogo comercial são editáveis', () => {
  const atopyModel = RECEITUARIO_PROTOCOL_MODELS.find((item) => item.id === 'seed-dermatite-atopica-cao')!.structured_defaults!.clinical_model!;
  const apoquel = atopyModel.options.find((item) => item.key === 'apoquel')!.medications![0];
  assert.equal(evaluateClinicalMedicationCatalogStatus(apoquel, 'cão').editable, true);

  const sporotrichosisModel = RECEITUARIO_INFECTOLOGIA_MODELS.find((item) => item.id === 'seed-infectologia-esporotricose-gatos')!.structured_defaults!.clinical_model!;
  const itraconazole = sporotrichosisModel.options.find((item) => item.key === 'initial')!.medications![0];
  assert.equal(evaluateClinicalMedicationCatalogStatus(itraconazole, 'gato').editable, true);
});

test('sobredose grave gera ERRO DE DOSE P/ CONCENTRAÇÃO na receita', () => {
  const override = {
    ...buildDefaultClinicalMedicationOverride(maropitant, 'cão'),
    selectedDoseValue: 10,
  };
  const alert = resolveClinicalMedicationDoseAlert(maropitant, override, 5, 'cão');
  assert.equal(alert?.severity, 'overdose');
  assert.equal(alert?.critical, true);
  const block = buildClinicalMedicationPrescriptionBlock(maropitant, override, 5, 'Cão', 1);
  assert.match(block || '', /Administrar ERRO DE DOSE P\/ CONCENTRAÇÃO/i);
  assert.match(block || '', /Erro de dose:/i);
  const issued = stripPrescriptionTechnicalDetails(block || '');
  assert.match(issued, /ERRO DE DOSE P\/ CONCENTRAÇÃO/i);
  assert.doesNotMatch(issued, /Erro de dose:/i);
});

test('alerta comercial identifica sobredose grave por concentração', () => {
  const alert = evaluateCommercialDoseAlert(
    { id: 'maxicam-ourofino', presentations: ['Maxicam 2 mg comprimidos'] } as never,
    0.3,
    1,
  );
  assert.equal(alert?.severity, 'overdose');
  assert.equal(alert?.critical, true);
});
