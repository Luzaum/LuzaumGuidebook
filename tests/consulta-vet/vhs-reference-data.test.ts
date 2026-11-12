import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {
  calculateVhs,
  interpretVhs,
  VHS_IMAGE_SOURCE,
  VHS_REFERENCES,
  VHS_SOURCE,
} from '../../modules/consulta-vet/data/vhsReferenceData';

test('calculadora de VHS soma os eixos e arredonda para 0,1 vértebra', () => {
  assert.equal(calculateVhs(5.1, 4.6), 9.7);
  assert.equal(calculateVhs(5.17, 4.68), 9.9);
  assert.equal(calculateVhs(0, 4.6), 0);
  assert.equal(calculateVhs(Number.NaN, 4.6), 0);
});

test('referências gerais de VHS preservam as faixas publicadas', () => {
  const dog = VHS_REFERENCES.find((reference) => reference.id === 'dog-general');
  const puppy = VHS_REFERENCES.find((reference) => reference.id === 'dog-puppy');
  const cat = VHS_REFERENCES.find((reference) => reference.id === 'cat-general');

  assert.ok(dog);
  assert.deepEqual([dog.lower, dog.upper, dog.mean], [8.5, 10.5, 9.7]);
  assert.equal(dog.intervalBasis, 'published-range');

  assert.ok(puppy);
  assert.deepEqual([puppy.lower, puppy.upper], [8.5, 10.5]);
  assert.equal(puppy.lifeStage, 'puppy');

  assert.ok(cat);
  assert.deepEqual([cat.lower, cat.upper, cat.mean], [6.9, 8.1, 7.5]);
  assert.equal(cat.intervalBasis, 'derived-2sd');
});

test('interpretação do VHS respeita o intervalo selecionado e mantém ressalva clínica', () => {
  const reference = VHS_REFERENCES.find((item) => item.id === 'dog-general');
  assert.ok(reference);

  assert.equal(interpretVhs(8.4, reference).status, 'below');
  assert.equal(interpretVhs(9.7, reference).status, 'within');
  const above = interpretVhs(10.6, reference);
  assert.equal(above.status, 'above');
  assert.match(above.summary, /não fecha diagnóstico|ecocardiografia/i);
});

test('faixas de raças derivadas permanecem identificadas como média ± 2 DP', () => {
  const breeds = VHS_REFERENCES.filter(
    (reference) => reference.species === 'dog' && !['dog-general', 'dog-puppy'].includes(reference.id)
  );

  assert.ok(breeds.length >= 15);
  assert.ok(breeds.every((reference) => reference.intervalBasis === 'derived-2sd'));
  assert.match(VHS_SOURCE.pages, /179–180/);
});

test('imagem de referência do VHS está presente e com fonte atribuída', () => {
  const imagePath = path.join(process.cwd(), 'public', VHS_IMAGE_SOURCE.src);
  const legacySvgPath = path.join(process.cwd(), 'public/consulta-vet/reference-apps/vhs-measurement.svg');

  assert.equal(fs.existsSync(imagePath), true);
  assert.equal(fs.existsSync(legacySvgPath), false);
  assert.match(VHS_IMAGE_SOURCE.author, /Uwe Gille.*Ophélie Tissier/i);
  assert.match(VHS_IMAGE_SOURCE.repository, /Wikimedia Commons/i);
  assert.equal(VHS_IMAGE_SOURCE.license, 'CC BY-SA 4.0');
  assert.match(VHS_IMAGE_SOURCE.methodReference, /Buchanan.*Bücheler.*1995/i);
});
