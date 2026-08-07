import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { EditorialReference } from '../../modules/consulta-vet/types/common';
import {
  looksLikeBibliographicCitation,
  resolveCitationTokenToReferenceIndex,
  resolveReferenceIndex,
  splitEditorialRichText,
} from '../../modules/consulta-vet/utils/editorialReferenceMarkers';

const references: EditorialReference[] = [
  {
    id: 'ref-nelson-couto-dcm',
    citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. 2020.',
    sourceType: 'Livro-texto',
  },
  {
    id: 'ref-protect',
    citationText: 'Summerfield NJ, et al. PROTECT Study. JVIM. 2012.',
    sourceType: 'Ensaio randomizado',
  },
];

describe('editorialReferenceMarkers', () => {
  it('resolve referência explícita por número e id', () => {
    assert.equal(resolveReferenceIndex(references, '1'), 0);
    assert.equal(resolveReferenceIndex(references, 'ref-protect'), 1);
  });

  it('converte marcador {{ref:N}} em segmento de referência', () => {
    const segments = splitEditorialRichText('Texto clínico. {{ref:2}}', references);
    assert.deepEqual(segments, [
      { type: 'text', value: 'Texto clínico. ' },
      { type: 'reference', index: 1 },
    ]);
  });

  it('converte citação bibliográfica entre parênteses em botão numerado', () => {
    const segments = splitEditorialRichText('Estabilizar antes do BAL (Nelson & Couto, 6ª ed.).', references);
    const referenceSegment = segments.find((segment) => segment.type === 'reference');
    assert.ok(referenceSegment);
    assert.equal((referenceSegment as { index: number }).index, 0);
  });

  it('não confunde parênteses clínicos com referência', () => {
    assert.equal(looksLikeBibliographicCitation('BAL'), false);
    const segments = splitEditorialRichText('Considerar BAL quando estável.', references);
    assert.deepEqual(segments, [{ type: 'text', value: 'Considerar BAL quando estável.' }]);
  });

  it('resolve citações et al + ano', () => {
    assert.equal(resolveCitationTokenToReferenceIndex('Summerfield et al., 2012', references), 1);
  });
});
