import { useMemo, useState } from 'react';
import { MedicationDose, MedicationPresentation } from '../types/medication';

interface DoseCalculatorResult {
  doseMinMg?: number;
  doseMaxMg?: number;
  doseCalculatedMg?: number;
  volumeMinMl?: number;
  volumeMaxMl?: number;
  volumeCalculatedMl?: number;
  tabletsMin?: number;
  tabletsMax?: number;
  tabletsCalculated?: number;
  warning?: string;
}

const UI_TEXT = {
  calculatorDisabled: 'Calculadora n\u00e3o habilitada para esta dose.',
  missingScoreInfo: 'Aten\u00e7\u00e3o: apresenta\u00e7\u00e3o sem informa\u00e7\u00e3o de sulco. O arredondamento pode ser impreciso.',
} as const;

export function useDoseCalculator(dose: MedicationDose, presentation?: MedicationPresentation) {
  const [weight, setWeight] = useState<number | ''>('');

  const result = useMemo<DoseCalculatorResult | null>(() => {
    if (!weight || typeof weight !== 'number' || weight <= 0) return null;
    if (!dose?.calculatorEnabled) {
      return { warning: UI_TEXT.calculatorDisabled };
    }

    const nextResult: DoseCalculatorResult = {};

    if (dose.doseMin) nextResult.doseMinMg = dose.doseMin * weight;
    if (dose.doseMax) nextResult.doseMaxMg = dose.doseMax * weight;
    if (dose.doseMin && !dose.doseMax) nextResult.doseCalculatedMg = dose.doseMin * weight;

    if (!presentation) return nextResult;

    if (presentation.concentrationValue && presentation.concentrationUnit === 'mg/mL') {
      if (nextResult.doseMinMg) nextResult.volumeMinMl = nextResult.doseMinMg / presentation.concentrationValue;
      if (nextResult.doseMaxMg) nextResult.volumeMaxMl = nextResult.doseMaxMg / presentation.concentrationValue;
      if (nextResult.doseCalculatedMg) {
        nextResult.volumeCalculatedMl = nextResult.doseCalculatedMg / presentation.concentrationValue;
      }

      return nextResult;
    }

    if (presentation.form.toLowerCase().includes('comprimido')) {
      const match = presentation.label.match(/(\d+(?:[.,]\d+)?)\s*mg/i);
      if (!match) return nextResult;

      const mgPerTablet = Number(match[1].replace(',', '.'));
      if (!Number.isFinite(mgPerTablet) || mgPerTablet <= 0) return nextResult;

      if (nextResult.doseMinMg) nextResult.tabletsMin = nextResult.doseMinMg / mgPerTablet;
      if (nextResult.doseMaxMg) nextResult.tabletsMax = nextResult.doseMaxMg / mgPerTablet;
      if (nextResult.doseCalculatedMg) nextResult.tabletsCalculated = nextResult.doseCalculatedMg / mgPerTablet;

      if (!presentation.scoringInfo) {
        nextResult.warning = UI_TEXT.missingScoreInfo;
      }
    }

    return nextResult;
  }, [dose, presentation, weight]);

  return { weight, setWeight, result };
}
