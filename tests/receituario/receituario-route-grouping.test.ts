import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getRouteCategory,
  groupMedicationBlocksByRoute,
  formatGroupedPrescriptionBlocks,
  formatPrescriptionPlainLanguage,
  insertMedicationIntoPrescriptionText,
  prescriptionReadyDuration,
  removeMedicationFromPrescriptionText,
  updateMedicationInPrescriptionText,
} from '../../modules/consulta-vet/utils/receituarioMedication';

test('prescriptionReadyDuration aceita tempo objetivo e rejeita nota clínica vaga', () => {
  assert.equal(prescriptionReadyDuration('7 dias'), '7 dias');
  assert.equal(prescriptionReadyDuration('Uso contínuo'), 'Uso contínuo');
  assert.equal(prescriptionReadyDuration('Até reavaliação clínica'), 'Até reavaliação clínica');
  assert.equal(prescriptionReadyDuration('Curto prazo; associar analgesia multimodal adequada.'), '');
  assert.equal(prescriptionReadyDuration('Curto prazo.'), '');
});

test('linguagem do tutor expande a via sem alterar algarismo romano clínico', () => {
  assert.equal(formatPrescriptionPlainLanguage('Administrar por via IV, q8h.'), 'Administrar por via intravenosa, a cada 8 horas.');
  assert.equal(formatPrescriptionPlainLanguage('Doença renal em estágio IV.'), 'Doença renal em estágio IV.');
});

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

test('vias de receituário ambulatorial não contêm intravenosa e normalizam VO para oral', async () => {
  const { OUTPATIENT_PRESCRIPTION_ROUTES, normalizePrescriptionRouteToOption, formatPracticalAmountWithFraction } = await import('../../modules/consulta-vet/utils/receituarioMedication');

  // Não pode conter IV/EV/intravenosa
  const values = OUTPATIENT_PRESCRIPTION_ROUTES.map((item: { value: string }) => item.value.toLowerCase());
  const labels = OUTPATIENT_PRESCRIPTION_ROUTES.map((item: { label: string }) => item.label.toLowerCase());
  assert.ok(!values.includes('intravenosa'), 'não deve conter intravenosa em value');
  assert.ok(!values.includes('iv'), 'não deve conter iv em value');
  assert.ok(!values.includes('ev'), 'não deve conter ev em value');
  assert.ok(!labels.some((l: string) => l.includes('intravenosa')), 'não deve conter intravenosa em labels');

  // Contém somente vias de uso domiciliar
  assert.ok(values.includes('oral'));
  assert.ok(values.includes('tópica'));
  assert.ok(values.includes('otológica'));
  assert.ok(values.includes('oftálmica'));
  assert.ok(values.includes('nasal'));
  assert.ok(!values.includes('subcutânea'));
  assert.ok(!values.includes('intramuscular'));
  assert.ok(values.includes('inalatória'));
  assert.ok(values.includes('transmucosa'));
  assert.ok(values.includes('retal'));
  assert.ok(values.includes('outra'));

  // Normalização de siglas comuns como VO, PO, SC, IM
  assert.equal(normalizePrescriptionRouteToOption('VO'), 'oral');
  assert.equal(normalizePrescriptionRouteToOption('vo'), 'oral');
  assert.equal(normalizePrescriptionRouteToOption('PO'), 'oral');
  assert.equal(normalizePrescriptionRouteToOption('oral'), 'oral');
  assert.equal(normalizePrescriptionRouteToOption('via oral'), 'oral');
  assert.equal(normalizePrescriptionRouteToOption('SC'), 'subcutânea');
  assert.equal(normalizePrescriptionRouteToOption('subcutânea'), 'subcutânea');
  assert.equal(normalizePrescriptionRouteToOption('IM'), 'intramuscular');
  assert.equal(normalizePrescriptionRouteToOption('otológica'), 'otológica');

  // Frações de comprimidos
  assert.equal(formatPracticalAmountWithFraction(0.25, 'comprimido'), '0,25 comprimido (1/4 de comprimido)');
  assert.equal(formatPracticalAmountWithFraction(0.5, 'comprimido'), '0,5 comprimido (1/2 comprimido)');
  assert.equal(formatPracticalAmountWithFraction(0.75, 'comprimido'), '0,75 comprimido (3/4 de comprimido)');
  assert.equal(formatPracticalAmountWithFraction(1, 'comprimido'), '1 comprimido');
});
