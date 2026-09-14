import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getUltrasoundEvidenceGap,
  getUltrasoundReferenceValues,
  ULTRASOUND_ORGANS,
  ULTRASOUND_SOURCES,
} from '../../modules/consulta-vet/data/ultrasoundReferenceData';

test('catálogo ultrassonográfico oferece órgãos únicos e referências rastreáveis', () => {
  const ids = ULTRASOUND_ORGANS.map((organ) => organ.id);
  assert.ok(ids.length >= 10);
  assert.equal(new Set(ids).size, ids.length);

  const values = ULTRASOUND_ORGANS.flatMap((organ) => organ.values);
  assert.ok(values.length >= 35);
  for (const reference of values) {
    assert.ok(ULTRASOUND_SOURCES[reference.sourceId]);
    assert.ok(reference.sourcePage.includes('PDF'));
    assert.ok(reference.measurement.length > 0);
    assert.ok(reference.value.length > 0);
    assert.ok(reference.unit.length > 0);
  }
});

test('intestino delgado canino adulto permanece separado por peso', () => {
  const adultDog = getUltrasoundReferenceValues('small-intestine', 'dog', 'adult');
  const bands = new Set(adultDog.map((reference) => reference.weightBand));

  assert.deepEqual([...bands], ['≤ 20 kg', '20–29,9 kg', '> 30 kg']);
  assert.equal(adultDog.length, 6);
  assert.ok(adultDog.some((reference) => reference.measurement.includes('duodeno') && reference.value === '≤ 6,0'));
  assert.ok(adultDog.some((reference) => reference.measurement.includes('jejuno') && reference.value === '≤ 4,7'));
});

test('referência pediátrica é específica para Beagles e não é extrapolada a gatos jovens', () => {
  const puppy = getUltrasoundReferenceValues('small-intestine', 'dog', 'young');
  assert.equal(puppy.length, 2);
  assert.ok(puppy.every((reference) => reference.population.includes('7–12 semanas')));
  assert.ok(puppy.every((reference) => reference.weightBand === '2,3–5 kg'));

  const kitten = getUltrasoundReferenceValues('small-intestine', 'cat', 'young');
  assert.deepEqual(kitten, []);
  assert.match(getUltrasoundEvidenceGap('small-intestine', 'cat', 'young') ?? '', /não foi encontrado|exclusiva/i);
});

test('lacunas de fígado, próstata e filtros pediátricos ficam explícitas', () => {
  assert.deepEqual(getUltrasoundReferenceValues('liver', 'dog', 'adult'), []);
  assert.match(getUltrasoundEvidenceGap('liver', 'dog', 'adult') ?? '', /subjetiva|não estabelece/i);

  assert.deepEqual(getUltrasoundReferenceValues('prostate', 'dog', 'adult'), []);
  assert.match(getUltrasoundEvidenceGap('prostate', 'dog', 'adult') ?? '', /idade|estado reprodutivo/i);

  assert.deepEqual(getUltrasoundReferenceValues('kidneys', 'cat', 'young'), []);
  assert.match(getUltrasoundEvidenceGap('kidneys', 'cat', 'young') ?? '', /não extrapole/i);
});

test('valores-chave de rim, vesícula, adrenal e bexiga correspondem às tabelas dos livros', () => {
  assert.ok(getUltrasoundReferenceValues('kidneys', 'cat', 'adult').some((value) => value.value === '3,0–4,3'));
  assert.ok(getUltrasoundReferenceValues('gallbladder', 'dog', 'adult').some((value) => value.value === '≤ 1' && value.unit === 'mL/kg'));
  assert.ok(getUltrasoundReferenceValues('adrenals', 'cat', 'adult').some((value) => value.value === '2,8–5,5'));
  assert.ok(getUltrasoundReferenceValues('bladder', 'dog', 'adult').some((value) => value.value === '1,4'));
});
