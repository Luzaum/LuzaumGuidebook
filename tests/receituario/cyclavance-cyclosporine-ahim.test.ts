import assert from 'node:assert/strict';
import test from 'node:test';
import { commercialOticProductsSeed } from '../../modules/consulta-vet/data/commercialOticProducts.seed';
import { ciclosporinaMedicationRecord } from '../../modules/consulta-vet/data/seed/medications.ciclosporina.seed';
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

test('Cyclavance® inclui orientação explícita de que em AHIM pode-se pensar em 5 mg/kg BID (a cada 12 horas)', () => {
  const cyclavance = commercialOticProductsSeed.find((item) => item.id === 'cyclavance-virbac');
  assert.ok(cyclavance, 'Cyclavance deve existir no catálogo comercial');
  assert.equal(cyclavance.manufacturer, 'Virbac');
  assert.equal(cyclavance.catalogMedicationId, 'med-ciclosporina');
  assert.ok(cyclavance.commercialSubclasses?.includes('systemic_immunosuppressive'));

  // Orientação em labelDirections
  assert.match(cyclavance.labelDirections, /AHIM|IMHA/i);
  assert.match(cyclavance.labelDirections, /5 mg\/kg.*(BID|q12h|a cada 12 horas)/i);
  assert.match(cyclavance.labelDirections, /0,05 mL\/kg.*(q12h|a cada 12 horas)/i);

  // dosageGuidance estruturado
  const labelDose = cyclavance.dosageGuidance?.labelDose || '';
  assert.match(labelDose, /AHIM.*5 mg\/kg.*BID/i);

  // Plumb’s dog entries
  const dogPlumbs = cyclavance.dosageGuidance?.plumbs?.dog || [];
  const ahimEntry = dogPlumbs.find((entry) => entry.title.includes('AHIM') || entry.title.includes('IMHA'));
  assert.ok(ahimEntry, 'Deve haver entrada específica para AHIM nas doses do Plumb’s');
  assert.match(ahimEntry.dose, /5 mg\/kg.*(12 horas|BID|q12h)/i);
  assert.match(ahimEntry.note, /segundo agente imunossupressor|Consenso ACVIM|5 mg\/kg BID/i);

  // Notas clínicas
  const notes = cyclavance.dosageGuidance?.notes || [];
  assert.ok(notes.some((note) => note.includes('AHIM') && note.includes('5 mg/kg') && note.includes('BID')));

  // Exemplo de prescrição
  assert.match(cyclavance.prescriptionExample || '', /AHIM.*5 mg\/kg.*(12 horas|BID)/i);
});

test('Atopica® também contempla a possibilidade de 5 mg/kg BID em AHIM', () => {
  const atopica = commercialOticProductsSeed.find((item) => item.id === 'atopica-elanco');
  assert.ok(atopica, 'Atopica deve existir no catálogo comercial');
  assert.equal(atopica.catalogMedicationId, 'med-ciclosporina');
  assert.match(atopica.labelDirections, /AHIM|IMHA/i);
  assert.match(atopica.labelDirections, /5 mg\/kg.*BID/i);

  const labelDose = atopica.dosageGuidance?.labelDose || '';
  assert.match(labelDose, /AHIM.*5 mg\/kg.*BID/i);

  const dogPlumbs = atopica.dosageGuidance?.plumbs?.dog || [];
  const ahimEntry = dogPlumbs.find((entry) => entry.title.includes('AHIM') || entry.title.includes('IMHA'));
  assert.ok(ahimEntry, 'Deve haver entrada específica para AHIM em Atopica');
  assert.match(ahimEntry.dose, /5 mg\/kg.*(12 horas|BID|q12h)/i);
});

test('Cyclavance e Atopica são aprovados na auditoria de labelDose com posologia prática', () => {
  const cyclavance = commercialOticProductsSeed.find((item) => item.id === 'cyclavance-virbac')!;
  const cyclavanceAudit = auditCommercialLabelDose(cyclavance);
  assert.equal(cyclavanceAudit.finalStatus, 'ok', 'Cyclavance deve ser aprovado na auditoria');
  const cyclavanceDose = resolveCommercialLabelDose(cyclavance)!;
  assert.ok(hasPracticalLabelDoseText(cyclavanceDose));

  const atopica = commercialOticProductsSeed.find((item) => item.id === 'atopica-elanco')!;
  const atopicaAudit = auditCommercialLabelDose(atopica);
  assert.equal(atopicaAudit.finalStatus, 'ok', 'Atopica deve ser aprovado na auditoria');
});

test('Busca comercial localiza Cyclavance e Atopica por termos de AHIM e ciclosporina', async () => {
  // Busca por cyclavance
  const cyclavanceByName = await searchPrescriptionCommercialProductsByName('cyclavance');
  assert.ok(cyclavanceByName.some((item) => item.name.includes('Cyclavance')));

  // Busca por ahim
  const ahimMatches = filterAndRankCommercialProducts(commercialOticProductsSeed, 'ahim');
  assert.ok(ahimMatches.some((item) => item.name.includes('Cyclavance')), 'Busca por ahim deve encontrar Cyclavance');
  assert.ok(ahimMatches.some((item) => item.name.includes('Atopica')), 'Busca por ahim deve encontrar Atopica');

  // Busca por ciclosporina
  const ciclosporinaMatches = await searchPrescriptionCommercialProducts({ query: 'ciclosporina' });
  assert.ok(ciclosporinaMatches.some((item) => item.name.includes('Cyclavance')));
});

test('Registro editorial de ciclosporina integra AHIM nas tags e indicações rápidas com 5,0 mg/kg BID', () => {
  assert.ok(ciclosporinaMedicationRecord.tags.includes('AHIM'));
  const ahimIndication = ciclosporinaMedicationRecord.quickIndications?.find(
    (item) => item.condition.includes('AHIM') || item.condition.includes('IMHA'),
  );
  assert.ok(ahimIndication, 'Deve haver quickIndication de AHIM no registro editorial');
  assert.match(ahimIndication.doseSummary, /5,0 mg\/kg.*(12 horas|BID|q12h)/i);
  assert.match(ahimIndication.doseSummary, /Cyclavance/i);
});
