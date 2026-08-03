import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculateTemplateDosesByWeight,
  EDITABLE_RECIPE_RETURN_NOTICE,
  ensureEditableRecipeReturn,
  ensureRecipeClinicalWorseningNotice,
  RECIPE_CLINICAL_WORSENING_NOTICE,
  normalizeRecipeListMarkers,
  stripPrescriptionTechnicalDetails,
} from '../../modules/consulta-vet/utils/receituarioTemplateCalculator';

test('calcula doses simples e faixas de dose pelo peso', () => {
  const body = [
    'Administrar 1 mg/kg por via oral.',
    'Administrar 0,5 mg/kg por via oral.',
    'Administrar 25 a 50 mg/kg por via oral.',
    'Administrar 1 mL/kg por via oral.',
  ].join('\n');

  const calculated = calculateTemplateDosesByWeight(body, 10);
  assert.match(calculated, /Administrar 10 mg por via oral/);
  assert.match(calculated, /Administrar 5 mg por via oral/);
  assert.match(calculated, /Administrar 250 a 500 mg por via oral/);
  assert.match(calculated, /Administrar 10 mL por via oral/);
  assert.match(calculated, /Dose clínica: 1 mg\/kg/);
  assert.match(calculated, /Dose clínica: 25 a 50 mg\/kg/);

  const issued = stripPrescriptionTechnicalDetails(calculated);
  assert.doesNotMatch(issued, /Dose clínica|\/kg/);
  assert.match(issued, /Administrar 250 a 500 mg por via oral/);
});

test('troca asteriscos por marcadores visuais de lista', () => {
  const normalized = normalizeRecipeListMarkers('* Primeira recomendação.\n* Segunda recomendação.');
  assert.equal(normalized, '• Primeira recomendação.\n• Segunda recomendação.');
  assert.doesNotMatch(normalized, /^\*/m);
});

test('remove dados técnicos e cuidados automáticos de receitas antigas', () => {
  const cleaned = stripPrescriptionTechnicalDetails(`5. MEDICAMENTO — Comprimido
Administrar 0,75 comprimido por via oral.
Dose selecionada: 0,75 mg/kg — fonte: Cadastro da clínica.
Dose real após conversão: 0,5 mg/kg.
Dose clínica: 0,75 mg/kg • Faixa indicada: 0,5 a 1 mg/kg.

INFORMAÇÕES IMPORTANTES
• Referência clínica do modelo.
• Evidência ainda em revisão.

ORIENTAÇÕES E CUIDADOS IMPORTANTES
• Cuidado automático antigo.

RECOMENDAÇÕES
• Manter acompanhamento.`);
  assert.doesNotMatch(cleaned, /Dose selecionada|Dose real|Dose clínica|CUIDADOS IMPORTANTES|Cuidado automático|INFORMAÇÕES IMPORTANTES|Referência clínica/);
  assert.match(cleaned, /Administrar 0,75 comprimido/);
  assert.match(cleaned, /RECOMENDAÇÕES/);
});

test('inclui o aviso de piora clínica uma única vez', () => {
  const once = ensureRecipeClinicalWorseningNotice('RECOMENDAÇÕES');
  const twice = ensureRecipeClinicalWorseningNotice(once);
  assert.equal(once, twice);
  assert.match(once, new RegExp(RECIPE_CLINICAL_WORSENING_NOTICE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  const legacy = ensureRecipeClinicalWorseningNotice('EM CASO DE PIORA CLÍNICA, RETORNAR AO HOSPITAL OU BUSCAR SERVIÇO VETERINÁRIO EXTERNO.');
  assert.equal(legacy, RECIPE_CLINICAL_WORSENING_NOTICE);
});

test('troca o retorno impessoal por prazo editável definido pelo usuário', () => {
  const result = ensureEditableRecipeReturn('• Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário.');
  assert.equal(result, EDITABLE_RECIPE_RETURN_NOTICE);
  assert.match(result, /A PREENCHER/);
  assert.doesNotMatch(result, /definido pelo médico-veterinário/i);
});
