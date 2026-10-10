import assert from 'node:assert/strict';
import test from 'node:test';
import { commercialOticProductsSeed } from '../../modules/consulta-vet/data/commercialOticProducts.seed';
import {
  filterAndRankCommercialProducts,
  searchPrescriptionCommercialProducts,
  searchPrescriptionCommercialProductsByName,
} from '../../modules/consulta-vet/services/receituarioCommercialCatalogService';
import {
  auditCommercialLabelDose,
  hasPracticalLabelDoseText,
  resolveCommercialLabelDose,
} from '../../modules/consulta-vet/utils/commercialLabelDose';
import { sanitizeCommercialProductForTakeHome } from '../../modules/consulta-vet/utils/receituarioTakeHome';

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

test('Eltrombopag oral é elegível para receituário domiciliar (take-home) com alertas clínicos mantidos', () => {
  const revolade = commercialOticProductsSeed.find((item) => item.id === 'revolade-eltrombopag-novartis')!;
  const takeHomeRevolade = sanitizeCommercialProductForTakeHome(revolade);
  assert.ok(takeHomeRevolade, 'Revolade oral deve ser permitido no receituário take-home');
  assert.equal(takeHomeRevolade.presentations.length, 2);

  const manipulado = commercialOticProductsSeed.find((item) => item.id === 'eltrombopag-manipulado-veterinario')!;
  const takeHomeManipulado = sanitizeCommercialProductForTakeHome(manipulado);
  assert.ok(takeHomeManipulado, 'Eltrombopag manipulado oral deve ser permitido no receituário take-home');
});

test('Busca comercial localiza Revolade e Eltrombopag por revolade, remolaid, eltrombopag e tpo', async () => {
  // Busca direta pelo apelido popular/coloquial digitado pelo usuário: "remolaid"
  const remolaidMatches = filterAndRankCommercialProducts(commercialOticProductsSeed, 'remolaid');
  assert.ok(remolaidMatches.some((item) => item.name.includes('Revolade')), 'Busca por remolaid deve encontrar Revolade');

  // Busca por revolade
  const revoladeByName = await searchPrescriptionCommercialProductsByName('revolade');
  assert.ok(revoladeByName.some((item) => item.name.includes('Revolade')));

  // Busca por remolaid na busca de receituário
  const remolaidPrescription = await searchPrescriptionCommercialProductsByName('remolaid');
  assert.ok(remolaidPrescription.some((item) => item.name.includes('Revolade')), 'Receituário deve resolver remolaid para Revolade');

  // Busca por eltrombopag
  const eltrombopagMatches = await searchPrescriptionCommercialProducts({ query: 'eltrombopag' });
  assert.ok(eltrombopagMatches.some((item) => item.name.includes('Revolade')));
  assert.ok(
    eltrombopagMatches.some(
      (item) => item.metadata?.commercial_product_id === 'eltrombopag-manipulado-veterinario' || item.name.includes('Eltrombopag'),
    ),
  );

  // Busca por tpo
  const tpoMatches = filterAndRankCommercialProducts(commercialOticProductsSeed, 'tpo');
  assert.ok(tpoMatches.some((item) => item.name.includes('Revolade')));
  assert.ok(tpoMatches.some((item) => item.name.includes('Nplate')));
});
