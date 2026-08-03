import assert from 'node:assert/strict';
import test from 'node:test';
import { RECEITUARIO_INFECTOLOGIA_MODELS } from '../../modules/consulta-vet/data/receituarioInfectologiaModels';
import { RECEITUARIO_PROTOCOL_MODELS } from '../../modules/consulta-vet/data/receituarioProtocolModels';
import { isRetiredRecipeTemplate, SEEDED_TEMPLATES } from '../../modules/consulta-vet/data/receituarioSeed';
import {
  calculateClinicalMedicationAmount,
  calculateMagistralFormula,
  explainPatientTerms,
  getClinicalRecipeObservations,
  getDefaultClinicalOptionKeys,
  hasTechnicalPlaceholders,
  renderClinicalRecipe,
} from '../../modules/consulta-vet/utils/receituarioClinicalModels';
import { stripPrescriptionTechnicalDetails } from '../../modules/consulta-vet/utils/receituarioTemplateCalculator';

function template(id: string) {
  const found = [...RECEITUARIO_INFECTOLOGIA_MODELS, ...RECEITUARIO_PROTOCOL_MODELS].find((item) => item.id === id);
  assert.ok(found, `Modelo ${id} não localizado`);
  assert.ok(found.structured_defaults?.clinical_model);
  return found;
}

function medication(templateId: string, key: string) {
  const model = template(templateId).structured_defaults!.clinical_model!;
  const found = model.options.flatMap((option) => option.medications || []).find((item) => item.key === key);
  assert.ok(found, `Medicamento ${key} não localizado`);
  return found;
}

test('cadastra os modelos globais de infectologia e protocolos clínicos', () => {
  assert.equal(RECEITUARIO_INFECTOLOGIA_MODELS.length, 4);
  assert.equal(RECEITUARIO_PROTOCOL_MODELS.length, 9);
  assert.ok(RECEITUARIO_INFECTOLOGIA_MODELS.every((item) => item.is_global && item.document_type === 'recipe'));
  assert.ok(RECEITUARIO_PROTOCOL_MODELS.every((item) => item.is_global && item.document_type === 'recipe'));
  const seededRecipes = SEEDED_TEMPLATES.filter((item) => item.document_type === 'recipe');
  assert.deepEqual(
    seededRecipes.map((item) => item.id),
    [...RECEITUARIO_INFECTOLOGIA_MODELS, ...RECEITUARIO_PROTOCOL_MODELS].map((item) => item.id),
  );
});

test('modelos removidos não retornam pela biblioteca, cache ou banco antigo', () => {
  const titles = SEEDED_TEMPLATES.map((item) => item.title).join(' | ');
  assert.doesNotMatch(titles, /Parvovirose|Gastrite Aguda|Cardio\s*B2/i);
  assert.equal(isRetiredRecipeTemplate({ id: 'seed-gastrite-aguda', title: 'Gastrite Aguda / Gastroenterite', document_type: 'recipe' }), true);
  assert.equal(isRetiredRecipeTemplate({ id: 'legacy-cardio', title: 'CardioB2', document_type: 'recipe' }), true);
  assert.equal(isRetiredRecipeTemplate({ id: 'seed-infectologia-parvovirose-hospitalar', title: 'Parvovirose', document_type: 'recipe' }), true);
});

test('itraconazol felino permanece em mg/kg e calcula pelo peso', () => {
  const item = medication('seed-infectologia-esporotricose-gatos', 'itraconazole-cat');
  assert.equal(item.dose.unit, 'mg/kg');
  assert.equal(calculateClinicalMedicationAmount(item, 4), '40 mg');
});

test('terbinafina felina é 30 mg por animal e nunca por kg', () => {
  const item = medication('seed-infectologia-esporotricose-gatos', 'terbinafine-cat-fixed');
  assert.equal(item.dose.basis, 'per_animal');
  assert.equal(calculateClinicalMedicationAmount(item, 2), '30 mg');
  assert.equal(calculateClinicalMedicationAmount(item, 20), '30 mg');
  assert.match(item.internalAlert || '', /30 mg por animal.+não 30 mg\/kg/i);
});

test('iodeto de potássio felino registra escalonamento de 2,5 mg/kg e máximo de 20 mg/kg', () => {
  const item = medication('seed-infectologia-esporotricose-gatos', 'potassium-iodide-cat');
  assert.equal(item.dose.min, 2.5);
  assert.equal(item.dose.maximumMgKg, 20);
  assert.match(item.prescriptionText, /incrementos de 2,5 mg\/kg/i);
});

test('protocolo experimental calcula ribavirina e DMSO separadamente', () => {
  const model = template('seed-infectologia-cinomose-caes').structured_defaults!.clinical_model!;
  const ribavirin = medication('seed-infectologia-cinomose-caes', 'ribavirin-distemper');
  const dmso = medication('seed-infectologia-cinomose-caes', 'dmso-distemper');
  assert.equal(calculateClinicalMedicationAmount(ribavirin, 10), '200 mg');
  assert.equal(calculateClinicalMedicationAmount(dmso, 10), '500 mg');
  const rendered = renderClinicalRecipe(model, getDefaultClinicalOptionKeys(model), 10, 'small');
  assert.match(rendered, /Dose clínica: 20 mg\/kg/);
  assert.match(rendered, /Dose clínica: 50 mg\/kg/);
  const issued = stripPrescriptionTechnicalDetails(rendered);
  assert.doesNotMatch(issued, /Dose clínica|20 mg\/kg|50 mg\/kg/);
  assert.match(issued, /Administrar 200 mg por via oral/);
  assert.match(issued, /Administrar 500 mg/);
  assert.doesNotMatch(rendered, /INFORMAÇÕES IMPORTANTES/);
  assert.doesNotMatch(rendered, /A eficácia clínica da associação completa ainda não está definitivamente comprovada/i);
  assert.doesNotMatch(rendered, /Pessoas gestantes ou tentando engravidar não devem manipular/i);
  assert.doesNotMatch(rendered, /definir manualmente a via de administração, a concentração, a diluição e o volume final/i);
  assert.match(model.veterinarianNotes?.join(' ') || '', /definir manualmente a via de administração, a concentração, a diluição e o volume final/i);
  assert.match(model.recipeInformation?.join(' ') || '', /A eficácia clínica da associação completa ainda não está definitivamente comprovada/i);
  assert.match(model.recipeInformation?.join(' ') || '', /Pessoas gestantes ou tentando engravidar não devem manipular/i);
});

test('fórmula de suplementação preserva mg, UI e mcg sem misturar unidades', () => {
  const model = template('seed-infectologia-cinomose-caes').structured_defaults!.clinical_model!;
  const formula = model.options.find((option) => option.key === 'experimental-adjuvant-protocol')!.formula!;
  const result = calculateMagistralFormula(formula.components, 10, 'small', formula.frequency, formula.durationDays);
  assert.equal(result.find((item) => item.key === 'vitamin-a')!.amountPerDose, '400 UI');
  assert.equal(result.find((item) => item.key === 'vitamin-b12')!.amountPerDose, '200 mcg');
  assert.equal(result.find((item) => item.key === 'vitamin-e')!.amountPerDose, '100 mg');
  assert.doesNotMatch(result.map((item) => item.amountPerDose).join(' '), /UI\/mg|mcg\/mg/);
});

test('Coenzima Q10 exige porte e aplica a faixa correta', () => {
  const model = template('seed-infectologia-cinomose-caes').structured_defaults!.clinical_model!;
  const formula = model.options.find((option) => option.key === 'experimental-adjuvant-protocol')!.formula!;
  const small = calculateMagistralFormula(formula.components, 10, 'small', formula.frequency, formula.durationDays);
  const large = calculateMagistralFormula(formula.components, 10, 'large', formula.frequency, formula.durationDays);
  assert.equal(small.find((item) => item.name === 'Coenzima Q10')!.amountPerDose, '15 a 20 mg');
  assert.equal(large.find((item) => item.name === 'Coenzima Q10')!.amountPerDose, '30 mg');
  assert.equal(formula.requiresPatientSize, true);
});

test('levetiracetam aceita somente apresentação de liberação imediata', () => {
  const item = medication('seed-infectologia-cinomose-caes', 'levetiracetam-immediate');
  assert.equal(item.presentationFilter, 'immediate_release');
  assert.match(item.name, /liberação imediata/i);
});

test('doxiciclina da cinomose permite escolher 5 mg/kg q12h ou 10 mg/kg q24h', () => {
  const item = medication('seed-infectologia-cinomose-caes', 'doxycycline-distemper');
  assert.deepEqual(item.doseAlternatives?.map((alternative) => [alternative.dose.min, alternative.dose.frequency]), [
    [5, 'a cada 12 horas'],
    [10, 'a cada 24 horas'],
  ]);
});

test('erliquiose oferece as duas opções exatas de doxiciclina', () => {
  const once = medication('seed-infectologia-erliquiose-anaplasmose', 'doxycycline-ehrlichia-10');
  const twice = medication('seed-infectologia-erliquiose-anaplasmose', 'doxycycline-ehrlichia-5');
  assert.deepEqual([once.dose.min, once.dose.frequency, once.dose.duration], [10, 'a cada 24 horas', '28 dias']);
  assert.deepEqual([twice.dose.min, twice.dose.frequency, twice.dose.duration], [5, 'a cada 12 horas', '28 dias']);
});

test('termos técnicos da receita recebem explicação entre parênteses para o tutor', () => {
  assert.match(explainPatientTerms('Pequena equimose pode ocorrer.'), /equimose \(manchas roxas na pele\)/);
  assert.match(explainPatientTerms('equimose (manchas roxas na pele)'), /equimose \(manchas roxas na pele\)/);
  assert.doesNotMatch(explainPatientTerms('equimose (manchas roxas na pele)'), /equimose \(manchas roxas na pele\) \(manchas roxas na pele\)/);
  const castrationModel = template('seed-pos-operatorio-castracao-cadela').structured_defaults!.clinical_model!;
  const castrationKeys = getDefaultClinicalOptionKeys(castrationModel);
  const rendered = renderClinicalRecipe(castrationModel, castrationKeys, 10);
  assert.match(rendered, /equimose \(manchas roxas na pele\)/);
  assert.ok(getClinicalRecipeObservations(castrationModel, castrationKeys).some((item) => /melena/i.test(item)));
  assert.doesNotMatch(rendered, /CUIDADOS IMPORTANTES DO MEDICAMENTO/i);
});

test('precauções ficam nas observações da receita e não no corpo impresso', () => {
  const model = template('seed-infectologia-erliquiose-anaplasmose').structured_defaults!.clinical_model!;
  const selectedKeys = getDefaultClinicalOptionKeys(model);
  assert.ok(model.medicationPrecautions.some((item) => /água ou alimento/i.test(item)));
  assert.ok(model.diseaseRecommendations.some((item) => /controle.+carrapatos/i.test(item)));
  const rendered = renderClinicalRecipe(model, selectedKeys, 10);
  const observations = getClinicalRecipeObservations(model, selectedKeys);
  assert.match(rendered, /RECOMENDAÇÕES DA DOENÇA/);
  assert.doesNotMatch(rendered, /CUIDADOS IMPORTANTES DO MEDICAMENTO/);
  assert.ok(observations.some((item) => /água ou alimento/i.test(item)));
  assert.match(rendered, /SINAIS PARA RETORNO/);
  assert.doesNotMatch(rendered, /SINAIS PARA RETORNO[\s\S]*\n• /);
});

test('campos vazios usam A PREENCHER e não há chaves ou colchetes técnicos', () => {
  for (const entry of [...RECEITUARIO_INFECTOLOGIA_MODELS, ...RECEITUARIO_PROTOCOL_MODELS]) {
    const model = entry.structured_defaults!.clinical_model!;
    const allKeys = model.options.map((option) => option.key);
    const rendered = renderClinicalRecipe(model, allKeys, null, null);
    const needsWeight = model.options
      .flatMap((option) => option.medications || [])
      .some((item) => item.dose.basis === 'weight' || item.dose.basis === 'weight_per_day');
    if (needsWeight) {
      assert.match(rendered, /A PREENCHER/);
    }
    assert.equal(hasTechnicalPlaceholders(rendered), false);
  }
});

test('os modelos continuam aptos ao fluxo comum de A4, PDF, favorito e modelo pessoal', () => {
  for (const entry of [...RECEITUARIO_INFECTOLOGIA_MODELS, ...RECEITUARIO_PROTOCOL_MODELS]) {
    assert.equal(entry.document_type, 'recipe');
    assert.equal(entry.is_global, true);
    assert.ok(entry.body_plain_text.trim().length > 0);
    assert.ok(entry.structured_defaults?.clinical_model);
  }
});
