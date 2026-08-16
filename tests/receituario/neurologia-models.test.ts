import assert from 'node:assert/strict';
import test from 'node:test';
import { RECEITUARIO_NEUROLOGIA_MODELS } from '../../modules/consulta-vet/data/receituarioNeurologiaModels';
import { NEURO_EMERGENCY_INTRO } from '../../modules/consulta-vet/data/receituarioNeurologiaSharedSections';
import { buildClinicalMedicationOverridesMap } from '../../modules/consulta-vet/utils/clinicalMedicationCatalogBridge';
import { getDefaultClinicalOptionKeys, renderClinicalRecipe } from '../../modules/consulta-vet/utils/receituarioClinicalModels';
import { SEEDED_TEMPLATES } from '../../modules/consulta-vet/data/receituarioSeed';

test('cadastra cinco receitas de neurologia', () => {
  assert.equal(RECEITUARIO_NEUROLOGIA_MODELS.length, 5);
});

test('receitas de neurologia entram no seed global', () => {
  const ids = RECEITUARIO_NEUROLOGIA_MODELS.map((item) => item.id);
  for (const id of ids) {
    assert.ok(SEEDED_TEMPLATES.some((item) => item.id === id));
  }
});

test('trauma vertebromedular canino orienta emergência 24h e não ligação telefônica', () => {
  const model = RECEITUARIO_NEUROLOGIA_MODELS.find((item) => item.id === 'seed-trauma-vertebromedular-cao')!.structured_defaults!.clinical_model!;
  const body = renderClinicalRecipe(model, getDefaultClinicalOptionKeys(model), 10);
  assert.match(body, /TRAUMA VERTEBROMEDULAR — CÃO/i);
  assert.match(body, /GABAPENTINA/i);
  assert.match(body, new RegExp(NEURO_EMERGENCY_INTRO.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(body, /serviço veterinário externo de emergência/i);
  assert.doesNotMatch(body, /Ligue imediatamente para o médico-veterinário/i);
  assert.doesNotMatch(body, /METOCARBAMOL/i);
  assert.ok(model.options.some((item) => item.key === 'tramadol' && item.optional));
  assert.ok(model.options.some((item) => item.key === 'dipirona' && item.optional));
});

test('hérnia de disco canina inclui repouso de 4 semanas e opções de analgesia', () => {
  const model = RECEITUARIO_NEUROLOGIA_MODELS.find((item) => item.id === 'seed-hernia-disco-cao')!.structured_defaults!.clinical_model!;
  const keys = [...getDefaultClinicalOptionKeys(model), 'carprofen'];
  const medications = model.options.flatMap((option) => option.medications || []);
  const overrides = buildClinicalMedicationOverridesMap(medications, 'Cão');
  const body = renderClinicalRecipe(model, keys, 12, null, 'cápsula', {}, overrides, 'Cão');
  assert.match(body, /REPOUSO OBRIGATÓRIO/i);
  assert.match(body, /pelo menos 4 semanas/i);
  assert.match(body, /GABAPENTINA|CARPROFENO/i);
  assert.match(body, /QUANDO A CIRURGIA DEVE SER CONSIDERADA/i);
});

test('síndrome vestibular felina usa maropitant ou ondansetrona em seleção única', () => {
  const model = RECEITUARIO_NEUROLOGIA_MODELS.find((item) => item.id === 'seed-sindrome-vestibular-gato')!.structured_defaults!.clinical_model!;
  assert.equal(model.selectionMode, 'single');
  const body = renderClinicalRecipe(model, ['maropitant'], 4);
  assert.match(body, /MAROPITANT/i);
  assert.match(body, /SÍNDROME VESTIBULAR — GATO/i);
  assert.doesNotMatch(body, /SINAIS PARA RETORNO/i);
});

test('síndrome vestibular canina inclui meclizina opcional e sinais centrais', () => {
  const model = RECEITUARIO_NEUROLOGIA_MODELS.find((item) => item.id === 'seed-sindrome-vestibular-cao')!.structured_defaults!.clinical_model!;
  assert.ok(model.options.some((item) => item.key === 'meclizine' && item.optional));
  const body = renderClinicalRecipe(model, getDefaultClinicalOptionKeys(model), 8);
  assert.match(body, /SINAIS COMPATÍVEIS COM ENVOLVIMENTO DO CÉREBRO/i);
  assert.match(body, /nistagmo/i);
});
