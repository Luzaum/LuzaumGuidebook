import assert from 'node:assert/strict';
import { interpretBloodGas } from '../modules/hemogasovet/engine/interpreter';
import { parseBloodGasText } from '../modules/hemogasovet/engine/parser';
import { normalizeFiO2Input } from '../modules/hemogasovet/utils/fio2';
import { formatCompensationStatus, formatDomainStatus, formatOxygenationStatus, formatPrimaryDisorder, formatQualityStatus } from '../modules/hemogasovet/utils/presentation';
import { BloodGasInput } from '../modules/hemogasovet/types';

function baseInput(overrides: Partial<BloodGasInput> = {}): BloodGasInput {
  return {
    species: 'canine',
    sampleType: 'arterial',
    pH: 7.25,
    pCO2: 28,
    HCO3: 12,
    pO2: 82,
    fio2: 0.21,
    temperature: 38.5,
    ...overrides,
  };
}

function run() {
  const fio2Percent = normalizeFiO2Input(21);
  assert.equal(fio2Percent.fraction, 0.21);
  assert.equal(fio2Percent.displayPercent, 21);
  assert.equal(fio2Percent.source, 'percentage');

  const fio2Fraction = normalizeFiO2Input(0.21);
  assert.equal(fio2Fraction.fraction, 0.21);
  assert.equal(fio2Fraction.displayPercent, 21);
  assert.equal(fio2Fraction.source, 'fraction');

  const partial = interpretBloodGas(baseInput({ pO2: undefined }));
  assert.equal(partial.domainStatuses.acidBase, 'ok');
  assert.notEqual(partial.domainStatuses.oxygenation, 'ok');
  assert.equal(partial.deepOxygenation.status, 'cannot_assess');

  const mapped = {
    quality: formatQualityStatus('probable_error'),
    domain: formatDomainStatus('blocked'),
    disorder: formatPrimaryDisorder('mixed'),
    compensation: formatCompensationStatus('not_applicable'),
    oxygenation: formatOxygenationStatus(partial.deepOxygenation),
  };
  assert.equal(mapped.quality, 'provavel erro de entrada/parser/unidade');
  assert.equal(mapped.domain, 'bloqueado por dados implausiveis');
  assert.equal(mapped.disorder, 'disturbio misto');
  assert.equal(mapped.compensation, 'nao aplicavel neste cenario');
  assert.equal(mapped.oxygenation, 'nao avaliavel com os dados atuais');

  const hypothermia = interpretBloodGas(baseInput({ temperature: 35.2 }));
  assert.equal(hypothermia.temperatureContext.status, 'hypothermia');
  assert.ok(hypothermia.executiveSummary.some((line) => line.includes('Hipotermia')));
  assert.ok(hypothermia.expandedPhysiology.includes('temperatura'));

  const inconsistent = interpretBloodGas(baseInput({ HCO3: 10, BE: 8 }));
  assert.ok(inconsistent.dataQuality.consistencyChecks.some((check) => check.fields?.includes('BE')));
  assert.equal(inconsistent.domainStatuses.quality, 'blocked');

  const parsed = parseBloodGasText('Na: 148\\nCl-: 109\\nPaO2: 92\\nSatO2 97\\nFiO2: 21\\nTemp: 37,9', 'canine', 'arterial');
  assert.equal(parsed.Na, 148);
  assert.equal(parsed.Cl, 109);
  assert.equal(parsed.pO2, 92);
  assert.equal(parsed.sO2, 97);
  assert.equal(parsed.fio2, 0.21);
  assert.equal(parsed.temperature, 37.9);

  const absurd = interpretBloodGas(baseInput({ pH: 23, pO2: 23232, HCO3: 2323 }));
  assert.equal(absurd.dataQuality.status, 'probable_error');
  assert.equal(absurd.domainStatuses.quality, 'blocked');

  const venous = interpretBloodGas(baseInput({ sampleType: 'venous', pO2: 44 }));
  assert.equal(venous.deepOxygenation.domainStatus, 'limited');
  assert.equal(venous.deepOxygenation.status, 'cannot_assess');
  assert.ok(venous.deepOxygenation.limitationNote?.includes('venosa'));

  console.log('HemoGasoVet validation passed.');
}

run();
