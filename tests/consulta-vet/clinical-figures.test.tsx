import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { DiseaseSectionRenderer } from '../../modules/consulta-vet/components/disease/DiseaseSectionRenderer';
const legacy = { kind: 'imageModal', url: '/example.jpg', caption: 'Legenda da figura' };
const modern = { kind: 'clinicalFigure', src: '/modern.jpg', alt: 'Figura moderna' };
for (const [name, data, count] of [
  ['isolada', legacy, 1],
  ['aninhada', { figura: legacy }, 1],
  ['galeria', [legacy, modern], 2],
  ['lista mista', ['Texto preservado', legacy], 1],
  ['tratamento', { ordemDePrioridade: ['Estabilizar'], figura: legacy }, 1],
] as const) {
  test(`renderiza figura ${name} como imagem`, () => {
    const html = renderToStaticMarkup(<DiseaseSectionRenderer id="treatment" title="Figuras" data={data as any} />);
    assert.equal((html.match(/<img /g) || []).length, count);
    assert.ok(html.includes('Legenda da figura'));
    assert.ok(html.includes('object-contain'));
    assert.ok(!html.includes('imageModal'));
    if (name === 'lista mista') assert.ok(html.includes('Texto preservado'));
  });
}
test('varredura do catálogo: todas as figuras têm arquivo e renderizam', () => {
  let count = 0;
  const missing: string[] = [];
  const visit = (value: unknown, context: string) => {
    if (!value || typeof value !== 'object') return;
    const v = value as Record<string, any>;
    if (v.kind === 'imageModal' || v.kind === 'clinicalFigure') {
      count++;
      const src = v.url || v.src;
      assert.ok(src, context);
      if (src.startsWith('/') && !fs.existsSync(path.join(process.cwd(), 'public', src))) missing.push(`${context}: ${src}`);
      const html = renderToStaticMarkup(<DiseaseSectionRenderer id="figures" title="Figura" data={v} />);
      assert.ok(html.includes('<img '), context);
      assert.ok(!html.includes('imageModal'), context);
      return;
    }
    for (const [key, child] of Object.entries(v)) visit(child, `${context}.${key}`);
  };
  visit(diseasesSeed, 'diseasesSeed');
  assert.deepEqual(missing, []);
  assert.ok(count > 10);
  console.log(`Figuras verificadas: ${count}`);
});
