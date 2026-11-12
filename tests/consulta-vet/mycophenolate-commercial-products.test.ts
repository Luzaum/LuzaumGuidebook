import assert from 'node:assert/strict';

import test from 'node:test';

import { commercialOticProductsSeed } from '../../modules/consulta-vet/data/commercialOticProducts.seed';

import {
  auditCommercialLabelDose,
  hasPracticalLabelDoseText,
  resolveCommercialLabelDose,
} from '../../modules/consulta-vet/utils/commercialLabelDose';

test('CellCept®, Genérico, Manipulado Veterinário e Myfortic® estão registrados no catálogo comercial com integridade de dados', () => {
  const cellcept = commercialOticProductsSeed.find((item) => item.id === 'cellcept-micofenolato-mofetila-roche');
  assert.ok(cellcept, 'CellCept deve existir no catálogo comercial');
  assert.equal(cellcept.manufacturer, 'Roche');
  assert.equal(cellcept.commercialClass, 'antiinflammatory');
  assert.equal(cellcept.commercialSubclass, 'systemic_immunosuppressive');
  assert.deepEqual(cellcept.species, ['dog', 'cat']);
  assert.equal(cellcept.presentations.length, 2);
  assert.ok(cellcept.presentations.some((p) => p.includes('50 comprimidos')));
  assert.ok(cellcept.presentations.some((p) => p.includes('100 comprimidos')));
  assert.ok(cellcept.activeComponents.some((c) => /micofenolato de mofetila/i.test(c)));
  assert.match(cellcept.labelCompositionSummary, /1\.0100\.0543/);

  const generico = commercialOticProductsSeed.find((item) => item.id === 'micofenolato-mofetila-generico-humano');
  assert.ok(generico, 'Genérico deve existir no catálogo comercial');
  assert.equal(generico.commercialClass, 'antiinflammatory');
  assert.equal(generico.commercialSubclass, 'systemic_immunosuppressive');
  assert.deepEqual(generico.species, ['dog', 'cat']);
  assert.match(generico.labelCompositionSummary, /1\.0235\.0927/);

  const manipulado = commercialOticProductsSeed.find((item) => item.id === 'micofenolato-mofetila-manipulado-veterinario');
  assert.ok(manipulado, 'Manipulado deve existir no catálogo comercial');
  assert.equal(manipulado.commercialClass, 'antiinflammatory');
  assert.equal(manipulado.commercialSubclass, 'systemic_immunosuppressive');
  assert.deepEqual(manipulado.species, ['dog', 'cat']);
  assert.ok(manipulado.presentations.some((p) => /c[aá]psulas.*sob medida/i.test(p)));
  assert.ok(manipulado.presentations.some((p) => /suspens[aã]o oral/i.test(p)));

  const myfortic = commercialOticProductsSeed.find((item) => item.id === 'myfortic-micofenolato-sodio-novartis');
  assert.ok(myfortic, 'Myfortic deve existir no catálogo comercial');
  assert.equal(myfortic.manufacturer, 'Novartis');
  assert.equal(myfortic.commercialClass, 'antiinflammatory');
  assert.equal(myfortic.commercialSubclass, 'systemic_immunosuppressive');
  assert.ok(myfortic.activeComponents.some((c) => /micofenolato s[oó]dico/i.test(c)));
  assert.match(myfortic.labelCompositionSummary, /1\.0068\.0898/);
});

test('Produtos de micofenolato possuem posologia prática validada na auditoria de labelDose', () => {
  const cellcept = commercialOticProductsSeed.find((item) => item.id === 'cellcept-micofenolato-mofetila-roche')!;
  const cellceptAudit = auditCommercialLabelDose(cellcept);
  assert.equal(cellceptAudit.finalStatus, 'ok', 'CellCept deve ser aprovado na auditoria');
  const cellceptDose = resolveCommercialLabelDose(cellcept)!;
  assert.match(cellceptDose, /8 a 12 mg\/kg/i);
  assert.match(cellceptDose, /10 mg\/kg/i);
  assert.ok(hasPracticalLabelDoseText(cellceptDose));

  const generico = commercialOticProductsSeed.find((item) => item.id === 'micofenolato-mofetila-generico-humano')!;
  const genericoAudit = auditCommercialLabelDose(generico);
  assert.equal(genericoAudit.finalStatus, 'ok', 'Genérico deve ser aprovado na auditoria');

  const manipulado = commercialOticProductsSeed.find((item) => item.id === 'micofenolato-mofetila-manipulado-veterinario')!;
  const manipuladoAudit = auditCommercialLabelDose(manipulado);
  assert.equal(manipuladoAudit.finalStatus, 'ok', 'Manipulado deve ser aprovado na auditoria');

  const myfortic = commercialOticProductsSeed.find((item) => item.id === 'myfortic-micofenolato-sodio-novartis')!;
  const myforticAudit = auditCommercialLabelDose(myfortic);
  assert.equal(myforticAudit.finalStatus, 'ok', 'Myfortic deve ser aprovado na auditoria');
});

test('Micofenolato incorpora referências explícitas e posologias do Plumb’s e BSAVA', () => {
  const cellcept = commercialOticProductsSeed.find((item) => item.id === 'cellcept-micofenolato-mofetila-roche')!;
  assert.match(cellcept.labelDirections, /Plumb/i);
  assert.match(cellcept.labelDirections, /BSAVA/i);
  assert.match(cellcept.labelDirections, /8 a 12 mg\/kg/i);
  assert.match(cellcept.labelDirections, /10 mg\/kg/i);
  assert.match(cellcept.labelDirections, /MUE/i);
  assert.match(cellcept.labelDirections, /Glomerulopatias/i);
  assert.match(cellcept.labelDirections, /ITP|PTI/i);

  const dogPlumbs = cellcept.dosageGuidance?.plumbs?.dog || [];
  assert.ok(dogPlumbs.length >= 5, 'Plumb’s deve ter pelo menos 5 indicações caninas detalhadas');
  assert.ok(dogPlumbs.some((entry) => entry.title.includes('MUE')));
  assert.ok(dogPlumbs.some((entry) => entry.title.includes('Glomerulopatias')));
  assert.ok(dogPlumbs.some((entry) => entry.title.includes('ITP')));
  assert.ok(dogPlumbs.some((entry) => entry.title.includes('Dermatopatias') || entry.title.includes('Pênfigo')));

  const catPlumbs = cellcept.dosageGuidance?.plumbs?.cat || [];
  assert.ok(catPlumbs.length >= 1, 'Plumb’s deve ter indicação felina detalhada');
  assert.match(catPlumbs[0].dose, /10 mg\/kg/i);
});

test('Micofenolato inclui alertas de biossegurança ocupacional (NIOSH), diarreia dose-limitante e não-intercambialidade com Myfortic', () => {
  const cellcept = commercialOticProductsSeed.find((item) => item.id === 'cellcept-micofenolato-mofetila-roche')!;
  assert.match(cellcept.safetyAlert, /NIOSH|TERATOG[EÊ]NIC/i);
  assert.match(cellcept.safetyAlert, /DOSE-LIMITANTE|DIARREIA/i);
  assert.match(cellcept.safetyAlert, /MYFORTIC/i);
  assert.match(cellcept.safetyAlert, /CICLOSPORINA/i);
  assert.match(cellcept.safetyAlert, /ANTIBI[OÓ]TICOS/i);

  const myfortic = commercialOticProductsSeed.find((item) => item.id === 'myfortic-micofenolato-sodio-novartis')!;
  assert.match(myfortic.safetyAlert, /N[AÃ]O.*INTERCAMBI[AÁ]VEL|N[AÃ]O DEVE SER USADO COMO SUBSTITUTO/i);
  assert.match(myfortic.safetyAlert, /DIARREIA|ENTERITE/i);
});
