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

test('EditorialRichText converte marcadores ==...== em destaque mark visivel sem expor sinais literais', () => {
  const input = 'Regra de ouro: ==esfregaço negativo não descarta babesiose==.';
  const output = renderText(input);
  assert.equal(output.includes('=='), false);
  assert.match(output, /<mark class="[^"]*consulta-vet-readable-highlight[^"]*">esfregaço negativo não descarta babesiose<\/mark>/);
});

test('EditorialRichText preserva ==...== mesmo com parenteses, numeros ou referencias internas sem vazar ==', () => {
  const input =
    '- ==Revisão sistemática e meta-análise global (Unar et al., 2023)==: detectou ==13% (13/100)== buscando ==piroplasmas grandes (> 2,5 µm)==.';
  const output = renderText(input);
  assert.equal(output.includes('=='), false, 'Nunca deve exibir == literais com parenteses internos');
  assert.match(output, /<mark class="[^"]*">13% \(13\/100\)<\/mark>/);
  assert.match(output, /<mark class="[^"]*">piroplasmas grandes \(&gt; 2,5 µm\)<\/mark>/);
  assert.match(output, /Revisão sistemática e meta-análise global/);
});
