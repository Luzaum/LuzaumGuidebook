import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getRouteCategory,
  groupMedicationBlocksByRoute,
  formatGroupedPrescriptionBlocks,
  insertMedicationIntoPrescriptionText,
  removeMedicationFromPrescriptionText,
  updateMedicationInPrescriptionText,
} from '../../modules/consulta-vet/utils/receituarioMedication';

test('getRouteCategory classifica vias de uso corretamente', () => {
  assert.equal(getRouteCategory('oral'), 'USO ORAL');
  assert.equal(getRouteCategory('comprimido 5mg'), 'USO ORAL');
  assert.equal(getRouteCategory('tópica'), 'USO TÓPICO');
  assert.equal(getRouteCategory('shampoo clorexidina'), 'USO TÓPICO');
  assert.equal(getRouteCategory('otológica'), 'USO OTOLÓGICO');
  assert.equal(getRouteCategory('solução auricular'), 'USO OTOLÓGICO');
  assert.equal(getRouteCategory('oftálmica'), 'USO OFTÁLMICO');
  assert.equal(getRouteCategory('colírio tobramicina'), 'USO OFTÁLMICO');
  assert.equal(getRouteCategory('subcutânea'), 'USO INJETÁVEL');
  assert.equal(getRouteCategory('intramuscular'), 'USO INJETÁVEL');
  assert.equal(getRouteCategory('nebulização'), 'USO INALATÓRIO');
});

test('groupMedicationBlocksByRoute agrupa medicamentos por via de uso', () => {
  const blocks = [
    'AMOXICILINA 250 mg\nAdministrar 1 comprimido por via oral a cada 12 horas, durante 7 dias.',
    'SHAMPOO CLOREXIDINA 2%\nBanhar por via tópica 2 vezes por semana.',
    'DIPIRONA 500 mg/mL\nAdministrar 0,5 mL por via oral a cada 8 horas.',
    'OTOPROT 15 mL\nInstilar 4 gotas no ouvido esquerdo a cada 12 horas.',
  ];

  const grouped = groupMedicationBlocksByRoute(blocks);
  assert.equal(grouped.length, 3);
  assert.equal(grouped[0].route, 'USO ORAL');
  assert.equal(grouped[0].items.length, 2);
  assert.equal(grouped[1].route, 'USO TÓPICO');
  assert.equal(grouped[1].items.length, 1);
  assert.equal(grouped[2].route, 'USO OTOLÓGICO');
  assert.equal(grouped[2].items.length, 1);

  const formatted = formatGroupedPrescriptionBlocks(grouped);
  assert.match(formatted, /^USO ORAL/m);
  assert.match(formatted, /1\. AMOXICILINA/);
  assert.match(formatted, /2\. DIPIRONA/);
  assert.match(formatted, /USO TÓPICO/);
  assert.match(formatted, /3\. SHAMPOO/);
  assert.match(formatted, /USO OTOLÓGICO/);
  assert.match(formatted, /4\. OTOPROT/);
});

test('insertMedicationIntoPrescriptionText insere medicamentos agrupados por via de uso e preserva recomendações', () => {
  const initialBody = `USO ORAL

1. AMOXICILINA 250 mg
   Administrar 1 comprimido por via oral a cada 12 horas.

RECOMENDAÇÕES DA DOENÇA
• Oferecer água fresca à vontade.`;

  const newMedication = `OTOPROT 15 mL — Solução otológica
Instilar 4 gotas no ouvido esquerdo por via otológica a cada 12 horas, durante 7 dias.`;

  const updatedBody = insertMedicationIntoPrescriptionText(initialBody, newMedication);

  assert.match(updatedBody, /USO ORAL/);
  assert.match(updatedBody, /1\. AMOXICILINA/);
  assert.match(updatedBody, /USO OTOLÓGICO/);
  assert.match(updatedBody, /2\. OTOPROT/);
  assert.match(updatedBody, /RECOMENDAÇÕES DA DOENÇA/);
  assert.match(updatedBody, /• Oferecer água fresca à vontade/);
});

test('updateMedicationInPrescriptionText atualiza um medicamento existente e reordena as vias', () => {
  const body = `USO ORAL

1. AMOXICILINA 250 mg
   Administrar 1 comprimido por via oral a cada 12 horas.

2. DIPIRONA 500 mg/mL
   Administrar 0,5 mL por via oral a cada 8 horas.

RECOMENDAÇÕES DA DOENÇA
• Manter repouso.`;

  const oldBlock = `DIPIRONA 500 mg/mL\nAdministrar 0,5 mL por via oral a cada 8 horas.`;
  const newBlock = `DIPIRONA 500 mg/mL\nAdministrar 0,8 mL por via oral a cada 6 horas.`;

  const result = updateMedicationInPrescriptionText(body, oldBlock, newBlock);

  assert.match(result, /0,8 mL por via oral a cada 6 horas/);
  assert.match(result, /1\. AMOXICILINA/);
  assert.match(result, /2\. DIPIRONA/);
  assert.match(result, /RECOMENDAÇÕES DA DOENÇA/);
});

test('removeMedicationFromPrescriptionText remove um medicamento da receita e atualiza a numeração', () => {
  const body = `USO ORAL

1. AMOXICILINA 250 mg
   Administrar 1 comprimido por via oral a cada 12 horas.

2. DIPIRONA 500 mg/mL
   Administrar 0,5 mL por via oral a cada 8 horas.

RECOMENDAÇÕES DA DOENÇA
• Manter repouso.`;

  const result = removeMedicationFromPrescriptionText(body, 'AMOXICILINA 250 mg');

  assert.doesNotMatch(result, /AMOXICILINA/);
  assert.match(result, /1\. DIPIRONA/);
  assert.match(result, /RECOMENDAÇÕES DA DOENÇA/);
});
