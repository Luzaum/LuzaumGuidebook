import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { ClinicalGuideInline } from '../../modules/consulta-vet/components/clinicalQuickGuide/ClinicalGuideInline';

test('preserves line and paragraph breaks inside an inline guide block', () => {
  const html = renderToStaticMarkup(<ClinicalGuideInline text={'**Fórmula**\n1. Primeiro\n\n2. Segundo'} />);
  assert.equal((html.match(/<br\/>/g) ?? []).length, 3);
  assert.match(html, /<strong[^>]*>Fórmula<\/strong>/);
  assert.match(html, /1\. Primeiro/);
  assert.doesNotMatch(html, /<(?:p|ol|li)[ >]/);
});

test('keeps highlights and emphasis with breaks without interpreting raw HTML', () => {
  const html = renderToStaticMarkup(<ClinicalGuideInline text={'==**Atenção**==\n<script>alert(1)</script>'} />);
  assert.match(html, /<mark[^>]*><strong[^>]*>Atenção<\/strong><\/mark><br\/>/);
  assert.doesNotMatch(html, /<script>/);
});
