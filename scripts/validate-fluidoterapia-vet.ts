import assert from 'node:assert/strict';
import { calculateMaintenance, calculateOngoingLosses, calculateRehydration, calculateResuscitation } from '../modules/fluidoterapia-vet/lib/engines/calculations';
import { CalculatorState, PatientProfile } from '../modules/fluidoterapia-vet/types';

function approxEqual(actual: number, expected: number, tolerance = 0.02) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `Expected ${actual} to be within ${tolerance} of ${expected}`);
}

const canine10kg: PatientProfile = {
  species: 'canine',
  weightKg: 10,
  isObese: false,
  ageGroup: 'adult',
  comorbidities: [],
};

const feline4kg: PatientProfile = {
  species: 'feline',
  weightKg: 4,
  isObese: false,
  ageGroup: 'adult',
  comorbidities: [],
};

const maintenanceDog = calculateMaintenance(canine10kg, { method: 'preset_dog', manualMlPerKgDay: 60, anesthesiaMlPerKgHour: 5 });
assert.equal(maintenanceDog.mlPerDay, 600);
approxEqual(maintenanceDog.mlPerHour, 25);

const maintenanceCat = calculateMaintenance(feline4kg, { method: 'preset_cat', manualMlPerKgDay: 40, anesthesiaMlPerKgHour: 3 });
assert.equal(maintenanceCat.mlPerDay, 160);
approxEqual(maintenanceCat.mlPerHour, 160 / 24);

const allometricDog = calculateMaintenance(canine10kg, { method: 'allometric', manualMlPerKgDay: 60, anesthesiaMlPerKgHour: 5 });
const allometricCat = calculateMaintenance(feline4kg, { method: 'allometric', manualMlPerKgDay: 40, anesthesiaMlPerKgHour: 3 });
approxEqual(allometricDog.mlPerDay, 132 * Math.pow(10, 0.75));
approxEqual(allometricCat.mlPerDay, 80 * Math.pow(4, 0.75));

const manualNoNan = calculateMaintenance(canine10kg, { method: 'manual', manualMlPerKgDay: Number.NaN, anesthesiaMlPerKgHour: 5 });
assert.ok(Number.isFinite(manualNoNan.mlPerDay));
assert.ok(Number.isFinite(manualNoNan.mlPerHour));

const rehydration = calculateRehydration(canine10kg, { enabled: true, dehydrationPercent: 5, correctionHours: 24, customCorrectionHours: 24 });
assert.equal(rehydration.deficitMl, 500);
approxEqual(rehydration.hourlyMl, 500 / 24);

const losses = calculateOngoingLosses(canine10kg, {
  enabled: true,
  type: 'events',
  directMl24h: 0,
  events: [
    { id: '1', type: 'vomit', animalSize: 'small', episodeVolumeMl: 20, episodes: 3, manualMl24h: 0 },
    { id: '2', type: 'drain', animalSize: 'small', episodes: 0, manualMl24h: 140 },
  ],
});
assert.equal(losses.mlPerDay, 200);
approxEqual(losses.hourlyMl, 200 / 24);

const resusDog15 = calculateResuscitation(canine10kg, { enabled: true, mode: 'custom', presetId: 'canine-standard', aliquotMlKg: 15, administrationMinutes: 15 });
assert.equal(resusDog15.totalMl, 150);
approxEqual(resusDog15.mlPerMin, 10);
assert.equal(resusDog15.mlPerHour, 600);

const resusDog20 = calculateResuscitation(canine10kg, { enabled: true, mode: 'custom', presetId: 'canine-standard', aliquotMlKg: 20, administrationMinutes: 20 });
assert.equal(resusDog20.totalMl, 200);

const resusCat10 = calculateResuscitation(feline4kg, { enabled: true, mode: 'custom', presetId: 'feline-standard', aliquotMlKg: 10, administrationMinutes: 15 });
assert.equal(resusCat10.totalMl, 40);

const totalGreen = maintenanceDog.mlPerHour + rehydration.hourlyMl + losses.hourlyMl;
approxEqual(totalGreen, 25 + (500 / 24) + (200 / 24));
approxEqual(maintenanceDog.x1_5, 37.5);
approxEqual(maintenanceDog.x2, 50);
assert.ok([maintenanceDog.mlPerHour, maintenanceDog.x1_5, maintenanceDog.x2, totalGreen].every(Number.isFinite));

const sampleState: CalculatorState = {
  patient: canine10kg,
  maintenance: { method: 'preset_dog', manualMlPerKgDay: 60, anesthesiaMlPerKgHour: 5 },
  rehydration: { enabled: true, dehydrationPercent: 5, correctionHours: 24, customCorrectionHours: 24 },
  ongoingLosses: {
    enabled: true,
    type: 'events',
    directMl24h: 0,
    events: [{ id: '1', type: 'vomit', animalSize: 'medium', episodes: 2, episodeVolumeMl: 25, manualMl24h: 0 }],
  },
  resuscitation: { enabled: false, mode: 'preset', presetId: 'canine-standard', aliquotMlKg: 15, administrationMinutes: 15 },
  fluidSelection: { type: 'Ringer com lactato', route: 'IV', deliveryMode: 'auto', presentationSize: 500 },
};
assert.equal(sampleState.fluidSelection.type, 'Ringer com lactato');

console.log('validate:fluidoterapia-vet OK');
