import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateQuickIndicationDose } from '../../modules/consulta-vet/utils/quickIndicationDoseCalculator';

test('calcula dose primária sem confundir doses de fármacos associados (butorfanol sedação)', () => {
  const result = calculateQuickIndicationDose(
    {
      condition: 'Sedação Multimodal e Contenção Química (Cães e Gatos)',
      species: 'both',
      doseSummary:
        '0,2 a 0,4 mg/kg IV ou IM (isolado) | Associado a dexmedetomidina (2,5–10 µg/kg IM/IV), acepromazina (0,02 mg/kg) ou alfaxalona (2–5 mg/kg IM)',
      route: 'IM ou IV',
      duration: '60 a 120 min',
    },
    10
  );

  assert.equal(result.status, 'calculated');
  assert.equal(result.items.length, 1);
  assert.equal(result.items[0].doseText, '2 a 4 mg');
});

test('calcula CRI por espécie com ataque + taxa horária (butorfanol CRI)', () => {
  const result = calculateQuickIndicationDose(
    {
      condition: 'Infusão Contínua Intravenosa Adjuvante (CRI)',
      species: 'both',
      doseSummary:
        'Cães: ataque 0,2 mg/kg IV + 0,1 a 0,24 mg/kg/h | Gatos: ataque 0,1 a 0,2 mg/kg IV + 0,1 a 0,2 mg/kg/h (± cetamina)',
      route: 'IV contínua',
      duration: 'Intraoperatório',
    },
    10
  );

  assert.equal(result.status, 'calculated');
  assert.equal(result.items.length, 2);
  assert.equal(result.items[0].label, 'Cães');
  assert.equal(result.items[0].doseText, '2 mg + 1 a 2,4 mg/h');
  assert.equal(result.items[1].label, 'Gatos');
  assert.equal(result.items[1].doseText, '1 a 2 mg + 1 a 2 mg/h');
});

test('respeita teto máximo quando o peso ultrapassa o limite (trazodona 60 kg)', () => {
  const result = calculateQuickIndicationDose(
    {
      condition: 'Ansiedade Situacional (Cães)',
      species: 'dog',
      doseSummary: '5 a 7,5 mg/kg VO em dose única 90 a 120 min antes (máx 300 mg)',
      route: 'VO',
      duration: 'Dose única',
    },
    60
  );

  assert.equal(result.status, 'calculated');
  assert.equal(result.items[0].doseText, '300 mg');
  assert.equal(result.items[0].isWarning, true);
  assert.match(result.items[0].note || '', /300 mg/);
});

test('calcula frações por kg (ex.: 1 mL / 4 kg)', () => {
  const result = calculateQuickIndicationDose(
    {
      condition: 'Hiperfosfatemia na DRC Felina',
      species: 'cat',
      doseSummary: '1 mL / 4 kg VO a cada 12 horas (0,25 mL/kg q12h)',
      route: 'VO',
      duration: 'Contínuo',
    },
    6
  );

  assert.equal(result.status, 'calculated');
  assert.equal(result.items[0].doseText, '1,5 mL');
});

test('identifica doses fixas e contraindicações', () => {
  const fixed = calculateQuickIndicationDose(
    {
      condition: 'Estresse de Transporte (Gatos)',
      species: 'cat',
      doseSummary: '50 mg/gato VO em dose única (gatos <2,5 kg: 25 mg)',
      route: 'VO',
      duration: 'Dose única',
    },
    4.5
  );
  assert.equal(fixed.status, 'fixed');
  assert.equal(fixed.items[0].doseText, '50 mg');

  const contra = calculateQuickIndicationDose(
    {
      condition: 'Uso na Espécie Canina',
      species: 'dog',
      doseSummary: 'CONTRAINDICADO: inexiste dose clínica validada para cães',
      route: 'VO',
      duration: 'Contraindicado',
    },
    10
  );
  assert.equal(contra.status, 'contraindicated');
  assert.equal(contra.items[0].isWarning, true);
});

test('calcula diretamente a partir de sourceDose quando quickIndications não existe', () => {
  const result = calculateQuickIndicationDose(
    {
      condition: 'Terapia anti-inflamatória',
      species: 'dog',
      doseSummary: '0,07 a 0,14 mg/kg q24–48h',
      route: 'VO',
      duration: '3 a 5 dias',
      sourceDose: {
        id: 'dose-test',
        species: 'dog',
        indication: 'Terapia anti-inflamatória',
        doseMin: 0.07,
        doseMax: 0.14,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'VO',
        frequency: 'q24-48h',
        calculatorEnabled: true,
      },
    },
    10
  );

  assert.equal(result.status, 'calculated');
  assert.equal(result.items[0].doseText, '0,7 a 1,4 mg');
});

test('retorna unavailable para peso inválido ou zero', () => {
  const resZero = calculateQuickIndicationDose(
    {
      condition: 'Qualquer',
      species: 'both',
      doseSummary: '1 mg/kg VO',
      route: 'VO',
      duration: '1 dia',
    },
    0
  );
  assert.equal(resZero.status, 'unavailable');
  assert.equal(resZero.items.length, 0);
});
