import test from 'node:test';
import assert from 'node:assert/strict';
import {
  expandNumericCitationParts,
  looksLikeNumericBibliography,
  splitEditorialRichText,
} from '../../modules/consulta-vet/utils/editorialReferenceMarkers';
import { diabetesMellitusCaninaRecord } from '../../modules/consulta-vet/data/seed/diseases.diabetes-mellitus-canina.seed';

test('looksLikeNumericBibliography reconhece listas e intervalos', () => {
  assert.equal(looksLikeNumericBibliography('1,4'), true);
  assert.equal(looksLikeNumericBibliography('1,4–9,15,16'), true);
  assert.equal(looksLikeNumericBibliography('Behrend et al., 2018'), false);
});

test('expandNumericCitationParts expande intervalos', () => {
  assert.deepEqual(expandNumericCitationParts('1,4'), [1, 4]);
  assert.deepEqual(expandNumericCitationParts('4–6'), [4, 5, 6]);
});

test('splitEditorialRichText liga citações numéricas às referências', () => {
  const refs = diabetesMellitusCaninaRecord.references ?? [];
  const segments = splitEditorialRichText('Triagem (1,4,5).', refs);
  const refSegments = segments.filter((segment) => segment.type === 'reference');
  assert.equal(refSegments.length, 3);
  assert.deepEqual(
    refSegments.map((segment) => segment.index),
    [0, 3, 4]
  );
});

test('splitEditorialRichText liga Behrend et al., 2018', () => {
  const refs = diabetesMellitusCaninaRecord.references ?? [];
  const segments = splitEditorialRichText('OVH indicada (Behrend et al., 2018).', refs);
  const refSegments = segments.filter((segment) => segment.type === 'reference');
  assert.equal(refSegments.length, 1);
  assert.equal(refSegments[0]?.index, 3);
});

test('splitEditorialRichText liga Milenkovic et al., 2026 no Cushing canino', async () => {
  const { sindromeCushingCaesRecord } = await import(
    '../../modules/consulta-vet/data/seed/diseases.sindrome-cushing-caes.seed'
  );
  const refs = sindromeCushingCaesRecord.references ?? [];
  const segments = splitEditorialRichText('Proteinúria (Milenkovic et al., 2026).', refs);
  const refSegments = segments.filter((segment) => segment.type === 'reference');
  assert.equal(refSegments.length, 1);
  assert.match(refs[refSegments[0]?.index ?? 0]?.citationText ?? '', /Milenkovic/i);
});
