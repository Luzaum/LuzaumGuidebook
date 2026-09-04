import assert from 'node:assert/strict';
import test from 'node:test';
import { commercialOticProductsSeed } from '../../modules/consulta-vet/data/commercialOticProducts.seed';
import {
  auditCommercialLabelDose,
  hasPracticalLabelDoseText,
  resolveCommercialLabelDose,
} from '../../modules/consulta-vet/utils/commercialLabelDose';

test('catálogo comercial tem cobertura mínima de labelDose prática', () => {
  const audits = commercialOticProductsSeed.map(auditCommercialLabelDose);
  const ok = audits.filter((item) => item.finalStatus === 'ok');
  const coverage = ok.length / audits.length;
  assert.ok(coverage >= 0.95, `Cobertura ${(coverage * 100).toFixed(1)}% abaixo de 95%`);
});

test('Semintra expõe dose de bula em mg/kg e mL/kg', () => {
  const semintra = commercialOticProductsSeed.find((item) => item.id === 'semintra-boehringer')!;
  const labelDose = resolveCommercialLabelDose(semintra)!;
  assert.match(labelDose, /1 mg\/kg/i);
  assert.match(labelDose, /0,25 mL\/kg/i);
  assert.ok(hasPracticalLabelDoseText(labelDose));
});

test('textos genéricos de bula continuam bloqueados', () => {
  assert.ok(!hasPracticalLabelDoseText('Semintra 4 mg/mL: dose conforme indicação registrada/local'));
  assert.ok(!hasPracticalLabelDoseText('Cães: seguir bula/apresentação veterinária'));
});

test('texto com dose prática não é bloqueado por frase genérica no mesmo campo', () => {
  const mixed =
    'Bula humana: dose individualizada. Uso veterinario extra-label: gatos 1 UI/gato SC q12h; cães 0,25-0,5 UI/kg SC q12h.';
  assert.ok(hasPracticalLabelDoseText(mixed));
});
