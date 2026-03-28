import { PatientProfile, MaintenanceConfig, RehydrationConfig, OngoingLossesConfig, ResuscitationConfig } from '../../types';

export function calculateMaintenance(patient: PatientProfile, config: MaintenanceConfig) {
  const weight = patient.isObese && patient.idealWeightKg ? patient.idealWeightKg : patient.weightKg;
  let mlPerDay = 0;

  switch (config.method) {
    case 'manual':
      mlPerDay = weight * config.manualMlPerKgDay;
      break;
    case 'preset_dog':
      mlPerDay = weight * 60;
      break;
    case 'preset_cat':
      mlPerDay = weight * 40;
      break;
    case 'allometric':
      if (patient.species === 'canine') {
        mlPerDay = 132 * Math.pow(weight, 0.75);
      } else {
        mlPerDay = 80 * Math.pow(weight, 0.75);
      }
      break;
    case 'linear':
      mlPerDay = (30 * weight) + 70;
      break;
    case 'anesthesia':
      mlPerDay = weight * config.anesthesiaMlPerKgHour * 24;
      break;
  }

  return {
    mlPerDay,
    mlPerHour: mlPerDay / 24,
    x1: mlPerDay / 24,
    x1_5: (mlPerDay / 24) * 1.5,
    x2: (mlPerDay / 24) * 2,
  };
}

export function calculateRehydration(patient: PatientProfile, config: RehydrationConfig) {
  if (!config.enabled) return { deficitMl: 0, hourlyMl: 0 };
  
  const weight = patient.isObese && patient.idealWeightKg ? patient.idealWeightKg : patient.weightKg;
  const deficitMl = weight * config.dehydrationPercent * 10;
  
  const hours = config.correctionHours === 0 && config.customCorrectionHours ? config.customCorrectionHours : config.correctionHours;
  const hourlyMl = hours > 0 ? deficitMl / hours : 0;

  return {
    deficitMl,
    hourlyMl
  };
}

export function calculateOngoingLosses(patient: PatientProfile, config: OngoingLossesConfig) {
  if (!config.enabled) return { mlPerDay: 0, hourlyMl: 0 };

  let mlPerDay = 0;
  if (config.type === 'direct') {
    mlPerDay = config.directMl24h;
  } else {
    const weight = patient.isObese && patient.idealWeightKg ? patient.idealWeightKg : patient.weightKg;
    
    config.events.forEach(event => {
      if (event.type === 'vomit' || event.type === 'diarrhea') {
        const getVolumeMultiplier = (vol: string) => vol === 'small' ? 2 : vol === 'medium' ? 5 : 10;
        mlPerDay += getVolumeMultiplier(event.volumeSize || 'small') * weight * (event.episodes || 1);
      } else {
        mlPerDay += event.manualMl24h || 0;
      }
    });
  }

  return {
    mlPerDay,
    hourlyMl: mlPerDay / 24
  };
}

export function calculateResuscitation(patient: PatientProfile, config: ResuscitationConfig) {
  if (!config.enabled) return { totalMl: 0, mlPerMin: 0, timeMinutes: 0 };

  const weight = patient.isObese && patient.idealWeightKg ? patient.idealWeightKg : patient.weightKg;
  let totalMl = 0;
  let timeMinutes = 15; // default

  if (config.mode === 'preset') {
    if (patient.species === 'feline') {
      totalMl = weight * 7.5; // 5-10 ml/kg
      timeMinutes = 20; // 15-30 min
    } else {
      totalMl = weight * 17.5; // 15-20 ml/kg
      timeMinutes = 20; // 15-30 min
    }
  } else {
    totalMl = weight * config.customMlKg;
    timeMinutes = config.customMinutes;
  }

  return {
    totalMl,
    mlPerMin: totalMl / timeMinutes,
    timeMinutes
  };
}
