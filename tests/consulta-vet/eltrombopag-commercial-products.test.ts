import assert from 'node:assert/strict';

import test from 'node:test';

import { commercialOticProductsSeed } from '../../modules/consulta-vet/data/commercialOticProducts.seed';

import {
  auditCommercialLabelDose,
  hasPracticalLabelDoseText,
  resolveCommercialLabelDose,
} from '../../modules/consulta-vet/utils/commercialLabelDose';

test('Revolade® e Eltrombopag Manipulado estão registrados no catálogo comercial com integridade de dados', () => {
  const revolade = commercialOticProductsSeed.find((item) => item.id === 'revolade-eltrombopag-novartis');
  assert.ok(revolade, 'Revolade deve existir no catálogo comercial');
  assert.equal(revolade.manufacturer, 'Novartis');
  assert.equal(revolade.commercialClass, 'emergency');
  assert.equal(revolade.commercialSubclass, 'emergency_thrombopoietin');
  assert.deepEqual(revolade.species, ['dog', 'cat']);
  assert.equal(revolade.presentations.length, 2);
  assert.ok(revolade.presentations.some((p) => p.includes('25 mg')));
  assert.ok(revolade.presentations.some((p) => p.includes('50 mg')));
  assert.ok(revolade.activeComponents.some((c) => /eltrombopag/i.test(c)));
  assert.match(revolade.labelCompositionSummary, /1\.0068\.1077/);

  const manipulado = commercialOticProductsSeed.find((item) => item.id === 'eltrombopag-manipulado-veterinario');
  assert.ok(manipulado, 'Eltrombopag Manipulado deve existir no catálogo comercial');
  assert.equal(manipulado.commercialClass, 'emergency');
  assert.equal(manipulado.commercialSubclass, 'emergency_thrombopoietin');
  assert.deepEqual(manipulado.species, ['dog', 'cat']);
  assert.ok(manipulado.presentations.some((p) => /c[aá]psulas.*sob medida/i.test(p)));
  assert.ok(manipulado.activeComponents.some((c) => /eltrombopag/i.test(c)));
});

test('Revolade e Eltrombopag Manipulado possuem posologia prática aprovada na auditoria de labelDose', () => {
  const revolade = commercialOticProductsSeed.find((item) => item.id === 'revolade-eltrombopag-novartis')!;
  const revoladeAudit = auditCommercialLabelDose(revolade);
  assert.equal(revoladeAudit.finalStatus, 'ok', 'Revolade deve ser aprovado na auditoria de dosagem');
  const revoladeDose = resolveCommercialLabelDose(revolade)!;
  assert.match(revoladeDose, /1,25 mg\/kg/i);
  assert.ok(hasPracticalLabelDoseText(revoladeDose));

  const manipulado = commercialOticProductsSeed.find((item) => item.id === 'eltrombopag-manipulado-veterinario')!;
  const manipuladoAudit = auditCommercialLabelDose(manipulado);
  assert.equal(manipuladoAudit.finalStatus, 'ok', 'Eltrombopag manipulado deve ser aprovado na auditoria');
  const manipuladoDose = resolveCommercialLabelDose(manipulado)!;
  assert.match(manipuladoDose, /1,25 mg\/kg/i);
  assert.ok(hasPracticalLabelDoseText(manipuladoDose));
});

test('Eltrombopag inclui avisos críticos essenciais: falta de eficácia/espécie-especificidade, quelação com cátions, hepatotoxicidade e alternativa Romiplostim', () => {
  const revolade = commercialOticProductsSeed.find((item) => item.id === 'revolade-eltrombopag-novartis')!;
  assert.match(revolade.safetyAlert, /ESPÉCIE-ESPECIFICIDADE|HISTIDINA-499|HIS499/i);
  assert.match(revolade.safetyAlert, /FALTA DE EFICÁCIA COMPROVADA|JAVMA 2023/i);
  assert.match(revolade.safetyAlert, /QUELAÇÃO|CÁLCIO|CÁTIONS/i);
  assert.match(revolade.safetyAlert, /HEPATOTOXICIDADE|ALT/i);
  assert.match(revolade.safetyAlert, /Romiplostim|Nplate/i);
  assert.match(revolade.labelDirections, /jejum/i);
  assert.match(revolade.labelDirections, /latic[ií]nio|suplemento/i);
});
