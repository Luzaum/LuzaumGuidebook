import { CalculationAlert } from '../shared/types/calculation';

export const checkVolumeSafety = (volumeMl: number): CalculationAlert | null => {
  if (volumeMl > 0 && volumeMl < 0.05) {
    return {
      id: 'volume-critical-low',
      title: 'Volume Crítico',
      message: 'O volume a aspirar é criticamente baixo (< 0,05 mL).',
      severity: 'critical',
      recommendation: 'Realize pré-diluição da ampola ou dilua o paciente em volume final menor.',
    };
  }
  if (volumeMl > 0 && volumeMl < 0.1) {
    return {
      id: 'volume-warning-low',
      title: 'Atenção ao Volume',
      message: 'O volume a aspirar é baixo (< 0,1 mL).',
      severity: 'warning',
      recommendation: 'Utilize seringa de insulina (1 mL) para garantir precisão na aspiração.',
    };
  }
  return null;
};

export const checkReverseMatchTolerance = (calculatedDose: number, targetDose: number, tolerancePct: number = 0.05): boolean => {
  if (targetDose === 0) return calculatedDose === 0;
  const diff = Math.abs(calculatedDose - targetDose) / targetDose;
  return diff <= tolerancePct;
};
