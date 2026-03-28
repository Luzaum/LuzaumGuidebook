import { Species, BCS } from '../types';

export const calculateRER = (weightKg: number): number => {
  return 70 * Math.pow(weightKg, 0.75);
};

export const calculateDogMER = (weightKg: number, factor: number): number => {
  return factor * Math.pow(weightKg, 0.75);
};

export const calculateCatMER = (weightKg: number, factor: number): number => {
  return factor * Math.pow(weightKg, 0.67);
};

export const DOG_MER_FACTORS = [
  { label: 'Adulto (1-2 anos) / Ativo', value: 130 },
  { label: 'Adulto (3-7 anos) / Atividade Moderada', value: 110 },
  { label: 'Sênior (> 7 anos) / Baixa Atividade', value: 95 },
  { label: 'Propenso à Obesidade / Castrado', value: 90 },
  { label: 'Crescimento (Pico)', value: 200 }, // Simplified for prototype
  { label: 'Gestação (Terço Final)', value: 132 },
  { label: 'Lactação', value: 145 }, // Base, depends on litter size
];

export const CAT_MER_FACTORS = [
  { label: 'Adulto Ativo (Intacto)', value: 100 },
  { label: 'Adulto Castrado / Indoor', value: 75 },
  { label: 'Sênior / Baixa Atividade', value: 52 },
  { label: 'Crescimento (até 4 meses)', value: 200 }, // 2x MER of 100
  { label: 'Crescimento (4 a 9 meses)', value: 175 },
  { label: 'Crescimento (9 a 12 meses)', value: 150 },
  { label: 'Gestação', value: 140 },
];

export const calculateIdealWeightCustom = (currentWeight: number, bcs: BCS, goal: 'weight_loss' | 'weight_gain'): number => {
  if (goal === 'weight_loss') {
    if (bcs === 6) return currentWeight * (1 - 0.15);
    if (bcs === 7) return currentWeight * (1 - 0.20);
    if (bcs === 8) return currentWeight * (1 - 0.30);
    if (bcs === 9) return currentWeight * (1 - 0.40);
  } else if (goal === 'weight_gain') {
    if (bcs === 4) return currentWeight * (1 + 0.15);
    if (bcs === 3) return currentWeight * (1 + 0.20);
    if (bcs === 2) return currentWeight * (1 + 0.30);
    if (bcs === 1) return currentWeight * (1 + 0.40);
  }
  return currentWeight;
};

export const calculateRefeedingRisk = (
  daysAnorexic: number, 
  daysHyporexic: number, 
  recentIntakePercent: number, 
  bcs: BCS, 
  electrolytesLow: boolean
): 'low' | 'moderate' | 'high' => {
  if (electrolytesLow || daysAnorexic >= 5 || (daysAnorexic >= 3 && bcs <= 3)) {
    return 'high';
  }
  if (daysAnorexic >= 3 || daysHyporexic >= 5 || recentIntakePercent <= 25) {
    return 'moderate';
  }
  return 'low';
};

