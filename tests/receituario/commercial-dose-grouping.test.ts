import assert from 'node:assert/strict';
import test from 'node:test';
import {
  groupCommercialDoseEntries,
  shouldGroupCommercialDoseEntries,
  splitDoseRegimenAndDuration,
} from '../../modules/consulta-vet/utils/commercialDoseGrouping';

test('separa duração do esquema posológico', () => {
  assert.deepEqual(splitDoseRegimenAndDuration('15 mg/kg VO q12h por 4 semanas'), {
    regimen: '15 mg/kg VO q12h',
    duration: 'por 4 semanas',
  });
  assert.deepEqual(splitDoseRegimenAndDuration('10–30 mg/kg VO q24h por 1–3 dias'), {
    regimen: '10–30 mg/kg VO q24h',
    duration: 'por 1–3 dias',
  });
});

test('não particiona esquemas com alternativas na mesma linha', () => {
  const complex = '15 mg/kg VO q12h (não complicada) ou 15–30 mg/kg VO q12h (complicada)';
  assert.deepEqual(splitDoseRegimenAndDuration(complex), { regimen: complex });
});

test('agrupa indicações com a mesma dose', () => {
  const grouped = groupCommercialDoseEntries([
    { title: 'Toxoplasmose', dose: '15 mg/kg VO q12h por 4 semanas' },
    { title: 'Cistite não complicada', dose: '15 mg/kg VO q12h' },
    { title: 'Foliculite', dose: '15–30 mg/kg VO q12h' },
    { title: 'Cistite complicada', dose: '15–30 mg/kg VO q12h' },
  ]);

  assert.equal(grouped.length, 2);
  assert.deepEqual(grouped.find((g) => g.regimen === '15 mg/kg VO q12h')?.indications, [
    { title: 'Toxoplasmose', duration: 'por 4 semanas', note: undefined },
    { title: 'Cistite não complicada', duration: undefined, note: undefined },
  ]);
  assert.deepEqual(
    grouped.find((g) => g.regimen === '15–30 mg/kg VO q12h')?.indications.map((i) => i.title),
    ['Foliculite', 'Cistite complicada'],
  );
});

test('ativa agrupamento quando há muitas entradas ou repetição', () => {
  const many = [
    { title: 'A', dose: '15 mg/kg VO q12h' },
    { title: 'B', dose: '15 mg/kg VO q12h por 4 semanas' },
    { title: 'C', dose: '30 mg/kg VO q24h' },
    { title: 'D', dose: '30 mg/kg VO q24h' },
  ];
  assert.equal(shouldGroupCommercialDoseEntries(many), true);
  assert.equal(shouldGroupCommercialDoseEntries([{ title: 'A', dose: '1 mg/kg' }]), false);
});
