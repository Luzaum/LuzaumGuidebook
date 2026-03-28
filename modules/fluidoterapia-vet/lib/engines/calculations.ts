import { lossSizePresets } from '../../data/clinicalContent';
import { MaintenanceConfig, OngoingLossEvent, OngoingLossesConfig, PatientProfile, RehydrationConfig, ResuscitationConfig } from '../../types';

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) {
    return min;
  }
  return Math.min(Math.max(value, min), max);
}

export function getCalculationWeight(patient: PatientProfile) {
  const rawWeight = patient.isObese && patient.idealWeightKg ? patient.idealWeightKg : patient.weightKg;
  return clamp(rawWeight || 0, 0, 500);
}

export function calculateMaintenance(patient: PatientProfile, config: MaintenanceConfig) {
  const weight = getCalculationWeight(patient);
  let mlPerDay = 0;

  switch (config.method) {
    case 'manual':
      mlPerDay = weight * clamp(config.manualMlPerKgDay, 20, 120);
      break;
    case 'preset_dog':
      mlPerDay = weight * 60;
      break;
    case 'preset_cat':
      mlPerDay = weight * 40;
      break;
    case 'allometric':
      mlPerDay = patient.species === 'canine' ? 132 * Math.pow(weight, 0.75) : 80 * Math.pow(weight, 0.75);
      break;
    case 'linear':
      mlPerDay = (30 * weight) + 70;
      break;
    case 'anesthesia':
      mlPerDay = weight * clamp(config.anesthesiaMlPerKgHour, 2, 10) * 24;
      break;
    default:
      mlPerDay = 0;
  }

  const mlPerHour = mlPerDay / 24;

  return {
    mlPerDay,
    mlPerHour,
    x1: mlPerHour,
    x1_5: mlPerHour * 1.5,
    x2: mlPerHour * 2,
  };
}

export function calculateRehydration(patient: PatientProfile, config: RehydrationConfig) {
  if (!config.enabled) {
    return { deficitMl: 0, hourlyMl: 0, hours: 0 };
  }

  const weight = getCalculationWeight(patient);
  const deficitMl = weight * clamp(config.dehydrationPercent, 0, 20) * 10;
  const hours = clamp(config.customCorrectionHours || config.correctionHours || 24, 1, 72);

  return {
    deficitMl,
    hourlyMl: deficitMl / hours,
    hours,
  };
}

export function calculateLossEventTotal(patient: PatientProfile, event: OngoingLossEvent) {
  const episodes = clamp(event.episodes || 0, 0, 1000);

  if (event.type === 'vomit' || event.type === 'diarrhea') {
    if (Number.isFinite(event.episodeVolumeMl) && (event.episodeVolumeMl || 0) > 0) {
      return (event.episodeVolumeMl || 0) * episodes;
    }

    const weight = getCalculationWeight(patient);
    return weight * lossSizePresets[event.animalSize].mlPerKg * episodes;
  }

  return clamp(event.manualMl24h || 0, 0, 100000);
}

export function calculateOngoingLosses(patient: PatientProfile, config: OngoingLossesConfig) {
  if (!config.enabled) {
    return { mlPerDay: 0, hourlyMl: 0 };
  }

  const mlPerDay = config.type === 'direct'
    ? clamp(config.directMl24h || 0, 0, 100000)
    : config.events.reduce((total, event) => total + calculateLossEventTotal(patient, event), 0);

  return {
    mlPerDay,
    hourlyMl: mlPerDay / 24,
  };
}

export function calculateResuscitation(patient: PatientProfile, config: ResuscitationConfig) {
  if (!config.enabled) {
    return { totalMl: 0, mlPerMin: 0, mlPerHour: 0, timeMinutes: 0 };
  }

  const weight = getCalculationWeight(patient);
  const timeMinutes = clamp(config.administrationMinutes || 15, 1, 240);
  const totalMl = weight * clamp(config.aliquotMlKg || 0, 0, 100);

  return {
    totalMl,
    mlPerMin: totalMl / timeMinutes,
    mlPerHour: (totalMl / timeMinutes) * 60,
    timeMinutes,
  };
}
