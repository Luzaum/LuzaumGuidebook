import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DiseaseSectionRenderer } from '../../modules/consulta-vet/components/disease/DiseaseSectionRenderer';

function render(data: unknown, id = 'treatment') {
  return renderToStaticMarkup(<DiseaseSectionRenderer id={id} title="Seção clínica" data={data as never} />);
}

test('preserva achados em objetos e listas mistas de importações', () => {
  const html = render(['Sinal inicial', { sign: 'Achado clínico', mechanism: 'Mecanismo explicado' }], 'clinicalSignsPathophysiology');
  for (const text of ['Sinal inicial', 'Achado clínico', 'Mecanismo explicado']) assert.ok(html.includes(text));
  assert.ok(!html.includes('[object Object]'));
});

test('tratamento com painel de prioridade preserva objetos aninhados e monitoramento estruturado', () => {
  const html = render({ ordemDePrioridade: ['Estabilizar'], suporte: { criterios: ['Reavaliar perfusão'], observacao: 'Informação importante' }, monitoramento: [{ parametro: 'Diurese', conduta: 'Ajustar suporte' }] });
  for (const text of ['Estabilizar', 'Reavaliar perfusão', 'Informação importante', 'Diurese', 'Ajustar suporte']) assert.ok(html.includes(text), text);
  assert.ok(!html.includes('[object Object]'));
});

test('não repete tabela de fármacos em tratamento com prioridade', () => {
  const html = render({ ordemDePrioridade: ['Estabilizar'], fármacos: ['Protocolo único'] });
  assert.equal(html.match(/Protocolo único/g)?.length, 1);
});

test('converte sinais importados como sign/detail para a tabela por sistemas', () => {
  const html = render([{ system: 'general', findings: [{ sign: 'Sinal importado', detail: 'Explicação preservada' }] }], 'clinicalSignsPathophysiology');
  assert.ok(html.includes('Sinal importado'));
  assert.ok(html.includes('Explicação preservada'));
  assert.ok(html.includes('Sinais clínicos e explicação fisiopatológica'));
  assert.ok(!html.includes('>general<'));
});
