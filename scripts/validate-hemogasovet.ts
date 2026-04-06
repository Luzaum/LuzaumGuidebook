import assert from 'node:assert/strict';
import { interpretBloodGas } from '../modules/hemogasovet/engine/interpreter';
import { parseBloodGasText } from '../modules/hemogasovet/engine/parser';
import { buildInterpretationPayload } from '../modules/hemogasovet/engine/inputPipeline';
import { normalizeFiO2Input } from '../modules/hemogasovet/utils/fio2';
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
  // FiO2 normalization
  const fio2Percent = normalizeFiO2Input(21);
  assert.equal(fio2Percent.fraction, 0.21);
  assert.equal(fio2Percent.displayPercent, 21);
  assert.equal(fio2Percent.source, 'percentage');

  const fio2Fraction = normalizeFiO2Input(0.21);
  assert.equal(fio2Fraction.fraction, 0.21);
  assert.equal(fio2Fraction.displayPercent, 21);
  assert.equal(fio2Fraction.source, 'fraction');

  // Partial per-domain behavior
  const partial = interpretBloodGas(baseInput({ pO2: undefined }));
  assert.equal(partial.domainStatuses.acidBase, 'ok');
  assert.notEqual(partial.domainStatuses.oxygenation, 'ok');
  assert.equal(partial.deepOxygenation.status, 'cannot_assess');

  // Temperature integrated
  const hypothermia = interpretBloodGas(baseInput({ temperature: 35.2 }));
  assert.equal(hypothermia.temperatureContext.status, 'hypothermia');
  assert.ok(hypothermia.executiveSummary.some((line) => line.includes('Hipotermia')));
  assert.ok(hypothermia.expandedPhysiology.toLowerCase().includes('temperatura'));

  // Internal consistency checks
  const inconsistent = interpretBloodGas(baseInput({ HCO3: 10, BE: 8 }));
  assert.ok(inconsistent.dataQuality.consistencyChecks.some((check) => check.fields?.includes('BE')));
  assert.equal(inconsistent.domainStatuses.quality, 'blocked');

  // Parser coverage
  const parsed = parseBloodGasText('Na: 148\\nCl-: 109\\nPaO2: 92\\nSatO2 97\\nFiO2: 21\\nTemp: 37,9', 'canine', 'arterial');
  assert.equal(parsed.Na, 148);
  assert.equal(parsed.Cl, 109);
  assert.equal(parsed.pO2, 92);
  assert.equal(parsed.sO2, 97);
  assert.equal(parsed.fio2, 0.21);
  assert.equal(parsed.temperature, 37.9);

  const parsedAliases = parseBloodGasText('Sodio 150\\nChloride 114\\nPvO2: 42\\nSO2: 75', 'canine', 'venous');
  assert.equal(parsedAliases.Na, 150);
  assert.equal(parsedAliases.Cl, 114);
  assert.equal(parsedAliases.pO2, 42);
  assert.equal(parsedAliases.sO2, 75);

  // Implausible data hard stop
  const absurd = interpretBloodGas(baseInput({ pH: 23, pO2: 23232, HCO3: 2323 }));
  assert.equal(absurd.dataQuality.status, 'probable_error');
  assert.equal(absurd.domainStatuses.quality, 'blocked');

  // Required reported venous case
  const venousCase = interpretBloodGas(baseInput({
    sampleType: 'venous',
    pH: 7.4,
    pCO2: 40,
    pO2: 42,
    HCO3: 24,
    BE: 0,
    lactate: 1.5,
    fio2: 21,
    temperature: 38.5,
    Na: 145,
    K: 4.2,
    Cl: 112,
    iCa: 1.25,
    glucose: 95,
    sO2: 75,
    AG: 18,
  }));
  assert.equal(venousCase.input.sampleType, 'venous');
  assert.equal(venousCase.deepOxygenation.status, 'cannot_assess');
  assert.equal(venousCase.deepOxygenation.pfRatio, undefined);
  assert.equal(venousCase.deepOxygenation.aaGradient, undefined);
  assert.ok(venousCase.deepOxygenation.summary.toLowerCase().includes('venosa'));
  assert.equal(venousCase.deepAcidBase.primaryDisorder, 'normal');

  const venous = interpretBloodGas(baseInput({ sampleType: 'venous', pO2: 44 }));
  assert.equal(venous.deepOxygenation.domainStatus, 'limited');
  assert.equal(venous.deepOxygenation.status, 'cannot_assess');
  assert.ok(venous.deepOxygenation.limitationNote?.includes('venosa'));

  // Mandatory clinical scenarios
  const arterialNormal = interpretBloodGas(baseInput({ pH: 7.4, pCO2: 40, HCO3: 24, pO2: 98, fio2: 0.21, sampleType: 'arterial' }));
  assert.equal(arterialNormal.deepAcidBase.primaryDisorder, 'normal');
  assert.notEqual(arterialNormal.deepOxygenation.pfRatio, undefined);

  const metabolicAcidosisComp = interpretBloodGas(baseInput({ pH: 7.2, pCO2: 32, HCO3: 12, BE: -12 }));
  assert.equal(metabolicAcidosisComp.deepAcidBase.primaryDisorder, 'metabolic_acidosis');

  const metabolicAlkalosisHypochloremic = interpretBloodGas(baseInput({ pH: 7.55, pCO2: 55, HCO3: 40, Cl: 88, Na: 145 }));
  assert.equal(metabolicAlkalosisHypochloremic.deepAcidBase.primaryDisorder, 'metabolic_alkalosis');
  assert.ok(metabolicAlkalosisHypochloremic.deepElectrolytes.some((entry) => entry.parameter.toLowerCase().includes('cl')));

  const respiratoryAcidosisAcute = interpretBloodGas(baseInput({ pH: 7.16, pCO2: 70, HCO3: 27 }));
  assert.equal(respiratoryAcidosisAcute.deepAcidBase.primaryDisorder, 'respiratory_acidosis');

  const mixedDisorder = interpretBloodGas(baseInput({ pH: 7.2, pCO2: 20, HCO3: 8, BE: -18 }));
  assert.equal(mixedDisorder.deepAcidBase.compensationStatus, 'mixed_suspected');

  const felineCaution = interpretBloodGas(baseInput({ species: 'feline', sampleType: 'arterial', pH: 7.2, pCO2: 28, HCO3: 12 }));
  assert.ok(felineCaution.deepAcidBase.physiologicalExplanation.toLowerCase().includes('gatos'));

  const severeHyperkalemia = interpretBloodGas(baseInput({ K: 7.2, pH: 7.1, pCO2: 38, HCO3: 12 }));
  assert.ok(severeHyperkalemia.alerts.some((a) => a.message.toLowerCase().includes('hipercalemia')));
  assert.ok(severeHyperkalemia.clinicalActions.immediate.some((a) => a.toLowerCase().includes('ecg')));

  const highLactate = interpretBloodGas(baseInput({ lactate: 6.2, pH: 7.25, pCO2: 30, HCO3: 13 }));
  assert.ok(highLactate.clinicalActions.serial.some((a) => a.toLowerCase().includes('lactato')));

  const aaHigh = interpretBloodGas(baseInput({ sampleType: 'arterial', pH: 7.35, pCO2: 32, HCO3: 18, pO2: 52, fio2: 0.21 }));
  assert.equal(aaHigh.deepOxygenation.status, 'hypoxemia');
  assert.ok((aaHigh.deepOxygenation.aaGradient || 0) > 20);

  // Payload pipeline reliability checks
  const preparedManual = buildInterpretationPayload({
    formData: { pH: 7.4, pCO2: 40, HCO3: 24, pO2: 95, fio2: 21 },
    species: 'canine',
    sampleType: 'arterial',
    ocrPending: false,
    fieldSources: { pH: 'manual', pCO2: 'manual', HCO3: 'manual', pO2: 'manual', fio2: 'manual' },
  });
  assert.equal(preparedManual.payload.sampleType, 'arterial');
  assert.equal(preparedManual.payload.fio2, 0.21);
  assert.equal(preparedManual.blocked, false);

  const preparedPendingOcr = buildInterpretationPayload({
    formData: { pH: 7.4, pCO2: 40, HCO3: 24, pO2: 95, fio2: 21 },
    species: 'canine',
    sampleType: 'arterial',
    ocrPending: true,
    fieldSources: {},
  });
  assert.equal(preparedPendingOcr.blocked, true);
  assert.ok(preparedPendingOcr.issues.some((i) => i.message.toLowerCase().includes('ocr')));

  console.log('HemoGasoVet validation passed.');
}

run();
