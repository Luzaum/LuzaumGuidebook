import { DoseUnit } from '../shared/types/drug';
import { Species } from '../shared/types/patient';

/**
 * Calculates Body Surface Area (m2) based on weight and species
 */
export const calculateBSA = (weight: number, species: Species): number => {
  // Common Veterinary K factors: Dog 10.1 (or 10), Cat 10.0
  const K = species === 'dog' ? 10.1 : 10.0;
  return (K * Math.pow(weight, 0.67)) / 100;
};

/**
 * Converts any dose to mcg/h
 */
export const convertDoseToMcgPerHour = (
  dose: number,
  unit: DoseUnit,
  weight: number,
  species: Species,
  concentrationMcgPerMl?: number,
): number => {
  const bsa = calculateBSA(weight, species);
  switch (unit) {
    case 'ng/kg/min':
      return (dose / 1000) * weight * 60;
    case 'mcg/kg/min':
      return dose * weight * 60;
    case 'mcg/kg/h':
      return dose * weight;
    case 'mg/kg/min':
      return dose * weight * 1000 * 60;
    case 'mg/kg/h':
      return dose * weight * 1000;
    case 'U/kg/min':
      return dose * weight * 60; // Treating U as base unit for calculation purposes
    case 'U/kg/h':
      return dose * weight;
    case 'mg/kg':
      return dose * weight * 1000; // Bolus
    case 'mcg/kg':
      return dose * weight; // Bolus
    case 'U/kg':
      return dose * weight; // Bolus
    case 'mU/kg/min':
      return (dose / 1000) * weight * 60;
    case 'mU/kg/h':
      return (dose / 1000) * weight;
    case 'mcg/m2/h':
      return dose * bsa;
    case 'mcg/m2':
      return dose * bsa;
    case 'mL/kg':
      return dose * weight * (concentrationMcgPerMl || 0);
    default:
      return 0;
  }
};

/**
 * Converts presentation concentration to mcg/mL
 */
export const convertConcentrationToMcgPerMl = (concentration: number, unit: 'mg/mL' | 'mcg/mL' | 'ng/mL' | 'U/mL'): number => {
  switch (unit) {
    case 'mg/mL':
      return concentration * 1000;
    case 'mcg/mL':
      return concentration;
    case 'ng/mL':
      return concentration / 1000;
    case 'U/mL':
      return concentration; // Treating U as base unit
    default:
      return concentration;
  }
};
