import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeInternalRedirect } from '../../src/lib/internalRedirect';
import { modules } from '../../modules/registry';

test('entrada padrão e retornos inválidos abrem a base clínica Vetius', () => {
  for (const target of [null, undefined, '', 'https://example.com', '//example.com', '/%5cexample.com']) {
    assert.equal(normalizeInternalRedirect(target), '/consulta-vet');
  }
});

test('catálogo mantém exatamente os seis aplicativos clínicos solicitados', () => {
  assert.deepEqual(modules.map(module => module.route).sort(), [
    '/antibioticoterapia', '/calculadora-energetica', '/dor', '/fluidoterapia-vet', '/neurologia', '/transfusao-sanguinea',
  ].sort());
  assert.equal(new Set(modules.map(module => module.id)).size, 6);
});
