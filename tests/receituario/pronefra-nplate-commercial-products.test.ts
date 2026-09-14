import assert from 'node:assert/strict';
import test from 'node:test';
import { commercialOticProductsSeed } from '../../modules/consulta-vet/data/commercialOticProducts.seed';
import {
  filterAndRankCommercialProducts,
  isKnownInjectionOnlyPrescriptionQuery,
  searchPrescriptionCommercialProducts,
  searchPrescriptionCommercialProductsByName,
} from '../../modules/consulta-vet/services/receituarioCommercialCatalogService';
import {
  auditCommercialLabelDose,
  hasPracticalLabelDoseText,
  resolveCommercialLabelDose,
} from '../../modules/consulta-vet/utils/commercialLabelDose';
import { sanitizeCommercialProductForTakeHome } from '../../modules/consulta-vet/utils/receituarioTakeHome';

test('Pronefra® e Nplate® estão registrados no catálogo comercial com integridade de dados', () => {
  const pronefra = commercialOticProductsSeed.find((item) => item.id === 'pronefra-virbac');
  assert.ok(pronefra, 'Pronefra deve existir no catálogo comercial');
  assert.equal(pronefra.manufacturer, 'Virbac');
  assert.equal(pronefra.commercialClass, 'renal');
  assert.equal(pronefra.commercialSubclass, 'renal_ckd_support');
  assert.deepEqual(pronefra.species, ['cat', 'dog']);
  assert.equal(pronefra.presentations.length, 2);
  assert.ok(pronefra.presentations.some((p) => p.includes('60 mL')));
  assert.ok(pronefra.presentations.some((p) => p.includes('180 mL')));
  assert.ok(pronefra.activeComponents.some((c) => /carbonato de c[aá]lcio/i.test(c)));
  assert.ok(pronefra.activeComponents.some((c) => /quitosana/i.test(c)));

  const nplate = commercialOticProductsSeed.find((item) => item.id === 'nplate-romiplostim-amgen');
  assert.ok(nplate, 'Nplate deve existir no catálogo comercial');
  assert.equal(nplate.manufacturer, 'Amgen');
  assert.equal(nplate.commercialClass, 'emergency');
  assert.equal(nplate.commercialSubclass, 'emergency_thrombopoietin');
  assert.deepEqual(nplate.species, ['dog', 'cat']);
  assert.equal(nplate.presentations.length, 2);
  assert.ok(nplate.presentations.some((p) => p.includes('250 mcg')));
  assert.ok(nplate.presentations.some((p) => p.includes('500 mcg')));
  assert.ok(nplate.activeComponents.some((c) => /romiplostim/i.test(c)));
  assert.match(nplate.labelCompositionSummary, /1\.0244\.0004/);
});

test('Pronefra e Nplate possuem posologia prática aprovada na auditoria de labelDose', () => {
  const pronefra = commercialOticProductsSeed.find((item) => item.id === 'pronefra-virbac')!;
  const pronefraAudit = auditCommercialLabelDose(pronefra);
  assert.equal(pronefraAudit.finalStatus, 'ok', 'Pronefra deve ser aprovado na auditoria');
  const pronefraDose = resolveCommercialLabelDose(pronefra)!;
  assert.match(pronefraDose, /1 mL\s*\/\s*4 kg/i);
  assert.match(pronefraDose, /1 mL\s*\/\s*5 kg/i);
  assert.ok(hasPracticalLabelDoseText(pronefraDose));

  const nplate = commercialOticProductsSeed.find((item) => item.id === 'nplate-romiplostim-amgen')!;
  const nplateAudit = auditCommercialLabelDose(nplate);
  assert.equal(nplateAudit.finalStatus, 'ok', 'Nplate deve ser aprovado na auditoria');
  const nplateDose = resolveCommercialLabelDose(nplate)!;
  assert.match(nplateDose, /3 a 5 mcg\/kg/i);
  assert.ok(hasPracticalLabelDoseText(nplateDose));
});

test('Pronefra é elegível para prescrição domiciliar (take-home oral), enquanto Nplate é retido como parenteral hospitalar', async () => {
  const pronefra = commercialOticProductsSeed.find((item) => item.id === 'pronefra-virbac')!;
  const takeHomePronefra = sanitizeCommercialProductForTakeHome(pronefra);
  assert.ok(takeHomePronefra, 'Pronefra oral deve ser permitido no receituário take-home');
  assert.equal(takeHomePronefra.presentations.length, 2);

  const nplate = commercialOticProductsSeed.find((item) => item.id === 'nplate-romiplostim-amgen')!;
  const takeHomeNplate = sanitizeCommercialProductForTakeHome(nplate);
  assert.equal(takeHomeNplate, null, 'Nplate injetável hospitalar não deve ser receitado como produto domiciliar leigo');

  assert.equal(await isKnownInjectionOnlyPrescriptionQuery('Nplate'), true);
  assert.equal(await isKnownInjectionOnlyPrescriptionQuery('Romiplostim'), true);
  assert.equal(await isKnownInjectionOnlyPrescriptionQuery('Pronefra'), false);
});

test('Nplate inclui avisos críticos: anticorpos neutralizantes, microgramas, risco de trombose e cuidados de reconstituição', () => {
  const nplate = commercialOticProductsSeed.find((item) => item.id === 'nplate-romiplostim-amgen')!;
  assert.match(nplate.safetyAlert, /ANTICORPOS NEUTRALIZANTES/i);
  assert.match(nplate.safetyAlert, /MICROGRAMAS/i);
  assert.match(nplate.safetyAlert, /TROMBOSE/i);
  assert.match(nplate.safetyAlert, /PARENTERAL EXCLUSIVO/i);
  assert.match(nplate.labelDirections, /500 mcg\/mL/i);
  assert.match(nplate.labelDirections, /seringa de insulina/i);
});

test('Pronefra traz suporte completo para nefropatia: quelantes, quitosana, oligopeptídeos e monitoramento Ca x P', () => {
  const pronefra = commercialOticProductsSeed.find((item) => item.id === 'pronefra-virbac')!;
  assert.match(pronefra.labelCompositionSummary, /carbonato de c[aá]lcio/i);
  assert.match(pronefra.labelCompositionSummary, /carbonato de magn[eé]sio/i);
  assert.match(pronefra.labelCompositionSummary, /quitosana/i);
  assert.match(pronefra.labelCompositionSummary, /hidrolisado de peixe/i);
  assert.match(pronefra.labelCompositionSummary, /Astragalus/i);
  assert.match(pronefra.reassessment, /Ca x P/i);
  assert.match(pronefra.safetyAlert, /hipercalcemia/i);
});

test('Busca comercial localiza Pronefra e Nplate por termos-chave e filtros de taxonomia', async () => {
  // Pronefra na busca de receituário (take-home oral)
  const pronefraByName = await searchPrescriptionCommercialProductsByName('pronefra');
  assert.ok(pronefraByName.some((item) => item.name.includes('Pronefra')));

  const pronefraByAlias = await searchPrescriptionCommercialProducts({ query: 'quelante de fosforo' });
  assert.ok(pronefraByAlias.some((item) => item.name.includes('Pronefra')));

  // Nplate no catálogo geral de apresentações comerciais (hospitalar / emergência)
  const nplateMatches = filterAndRankCommercialProducts(commercialOticProductsSeed, 'nplate');
  assert.ok(nplateMatches.some((item) => item.name.includes('Nplate')));

  const romiplostimMatches = filterAndRankCommercialProducts(commercialOticProductsSeed, 'romiplostim');
  assert.ok(romiplostimMatches.some((item) => item.name.includes('Nplate')));

  const tpoMatches = filterAndRankCommercialProducts(commercialOticProductsSeed, 'tpo');
  assert.ok(tpoMatches.some((item) => item.name.includes('Nplate')));
});
