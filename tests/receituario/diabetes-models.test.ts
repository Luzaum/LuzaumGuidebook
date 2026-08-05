import assert from 'node:assert/strict';
import test from 'node:test';
import { RECEITUARIO_DIABETES_MODELS } from '../../modules/consulta-vet/data/receituarioDiabetesModels';
import { formatHoneyHypoglycemiaDose } from '../../modules/consulta-vet/data/receituarioDiabetesSharedSections';
import { buildClinicalMedicationOverridesMap } from '../../modules/consulta-vet/utils/clinicalMedicationCatalogBridge';
import { renderClinicalRecipe, getDefaultClinicalOptionKeys } from '../../modules/consulta-vet/utils/receituarioClinicalModels';
import { SEEDED_TEMPLATES, RETIRED_RECIPE_TEMPLATE_IDS } from '../../modules/consulta-vet/data/receituarioSeed';

test('cadastra sete receitas de diabetes mellitus por insulina e espécie', () => {
  assert.equal(RECEITUARIO_DIABETES_MODELS.length, 7);
});

test('receita não inclui seção SINAIS PARA RETORNO com jargão', () => {
  const model = RECEITUARIO_DIABETES_MODELS.find((item) => item.id === 'seed-dm-cao-glargina-u100')!.structured_defaults!.clinical_model!;
  const body = renderClinicalRecipe(model, getDefaultClinicalOptionKeys(model), 12);
  assert.doesNotMatch(body, /SINAIS PARA RETORNO/i);
  assert.doesNotMatch(body, /Retornar diante de/i);
  assert.doesNotMatch(body, /cetonas/i);
});

test('receita de glargina canina não cita outras insulinas', () => {
  const model = RECEITUARIO_DIABETES_MODELS.find((item) => item.id === 'seed-dm-cao-glargina-u100')!.structured_defaults!.clinical_model!;
  const body = renderClinicalRecipe(model, getDefaultClinicalOptionKeys(model), 12);
  assert.doesNotMatch(body, /Caninsulin|NPH|Toujeo/i);
  assert.match(body, /GLARGINA U-100/i);
});

test('mel para hipoglicemia é calculado pelo peso', () => {
  assert.match(formatHoneyHypoglycemiaDose(8), /2 mL de mel/);
  const model = RECEITUARIO_DIABETES_MODELS.find((item) => item.id === 'seed-dm-cao-caninsulin')!.structured_defaults!.clinical_model!;
  const body = renderClinicalRecipe(model, getDefaultClinicalOptionKeys(model), 8);
  assert.match(body, /Passar 2 mL de mel ou xarope de milho/i);
});

test('não inclui curva glicêmica na receita do tutor', () => {
  const model = RECEITUARIO_DIABETES_MODELS.find((item) => item.id === 'seed-dm-gato-glargina-u100')!.structured_defaults!.clinical_model!;
  const body = renderClinicalRecipe(model, getDefaultClinicalOptionKeys(model), 5);
  assert.doesNotMatch(body, /CURVA GLICÊMICA/i);
});

test('glicosímetro explica locais de coleta em linguagem simples', () => {
  const model = RECEITUARIO_DIABETES_MODELS.find((item) => item.id === 'seed-dm-cao-nph')!.structured_defaults!.clinical_model!;
  const body = renderClinicalRecipe(model, getDefaultClinicalOptionKeys(model), 10);
  assert.match(body, /Borda interna da orelha/i);
  assert.match(body, /Almofada da pata/i);
  assert.doesNotMatch(body, /pavilhão auricular|coxim plantar|aquecer o local/i);
});

test('alimentos terapêuticos aparecem em lista', () => {
  const model = RECEITUARIO_DIABETES_MODELS.find((item) => item.id === 'seed-dm-cao-caninsulin')!.structured_defaults!.clinical_model!;
  const body = renderClinicalRecipe(model, getDefaultClinicalOptionKeys(model), 10);
  assert.match(body, /• Royal Canin Veterinary Diabetic Canine/);
});

test('notas veterinárias não entram no corpo da receita', () => {
  const model = RECEITUARIO_DIABETES_MODELS.find((item) => item.id === 'seed-dm-cao-toujeo-u300')!.structured_defaults!.clinical_model!;
  const body = renderClinicalRecipe(model, getDefaultClinicalOptionKeys(model), 15);
  assert.doesNotMatch(body, /NÃO IMPRIMIR/i);
  assert.doesNotMatch(body, /Ajuste de dose: nunca aumentar/i);
});

test('receita genérica antiga de diabetes foi aposentada', () => {
  assert.ok(RETIRED_RECIPE_TEMPLATE_IDS.has('seed-diabetes-mellitus'));
  assert.ok(!SEEDED_TEMPLATES.some((item) => item.id === 'seed-diabetes-mellitus'));
});

test('insulina glargina calcula UI ao abrir sem abrir edição de medicamentos', () => {
  const model = RECEITUARIO_DIABETES_MODELS.find((item) => item.id === 'seed-dm-cao-glargina-u100')!.structured_defaults!.clinical_model!;
  const medications = model.options.flatMap((option) => option.medications || []);
  const overrides = buildClinicalMedicationOverridesMap(medications, 'Cão');
  const body = renderClinicalRecipe(model, getDefaultClinicalOptionKeys(model), 5, null, 'cápsula', {}, overrides, 'Cão');
  assert.match(body, /Administrar 1,25 UI/i);
  assert.match(body, /Dose clínica: 0,25 UI\/kg/i);
  assert.doesNotMatch(body, /Administrar 1,5 mg|0,3 mg\/kg/i);
});
