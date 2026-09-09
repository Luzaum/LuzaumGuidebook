import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { EditorialRichText } from '../../modules/consulta-vet/components/shared/EditorialRichText';
import { DiseaseReferenceProvider } from '../../modules/consulta-vet/context/DiseaseReferenceContext';

const mockReferences = [
  { citationText: 'Unar et al., 2023', publicationYear: 2023 }
];

function renderText(text: string) {
  return renderToStaticMarkup(
    React.createElement(
      DiseaseReferenceProvider,
      { references: mockReferences },
      React.createElement(EditorialRichText, { value: text })
    )
  );
}

test('EditorialRichText remove ** e formata como strong sem expor asteriscos literais', () => {
  const input = '**Figura 2 — Eixo imunotrombose-sepse.** Ativação plaquetária.';
  const output = renderText(input);
  assert.equal(output.includes('**'), false, 'Não deve conter asteriscos duplos');
  assert.match(output, /<strong class="font-semibold text-foreground">Figura 2 — Eixo imunotrombose-sepse.<\/strong>/);
});

test('EditorialRichText converte *itálico* em em e limpa asteriscos soltos', () => {
  const input = 'Fonte: Unar et al. (2023), *Cells* (CC BY 4.0).';
  const output = renderText(input);
  assert.equal(output.includes('*Cells*'), false);
  assert.match(output, /<em class="italic">Cells<\/em>/);
});

test('EditorialRichText limpa asteriscos duplos soltos ou desbalanceados', () => {
  const input = 'Alerta ** crítico sem fechamento';
  const output = renderText(input);
  assert.equal(output.includes('**'), false);
});
