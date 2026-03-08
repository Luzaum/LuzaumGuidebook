import { useState, useMemo } from 'react';
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

export function useDoseCalculator(dose: MedicationDose, presentation?: MedicationPresentation) {
  const [weight, setWeight] = useState<number | ''>('');

  const result = useMemo<DoseCalculatorResult | null>(() => {
    if (!weight || typeof weight !== 'number' || weight <= 0) return null;
    if (!dose.calculatorEnabled) return { warning: 'Calculadora não habilitada para esta dose.' };

    const res: DoseCalculatorResult = {};

    // Calculate mg
    if (dose.doseMin) res.doseMinMg = dose.doseMin * weight;
    if (dose.doseMax) res.doseMaxMg = dose.doseMax * weight;
    if (dose.doseMin && !dose.doseMax) res.doseCalculatedMg = dose.doseMin * weight;

    // If presentation is provided, calculate volume or tablets
    if (presentation) {
      if (presentation.concentrationValue && presentation.concentrationUnit === 'mg/mL') {
        if (res.doseMinMg) res.volumeMinMl = res.doseMinMg / presentation.concentrationValue;
        if (res.doseMaxMg) res.volumeMaxMl = res.doseMaxMg / presentation.concentrationValue;
        if (res.doseCalculatedMg) res.volumeCalculatedMl = res.doseCalculatedMg / presentation.concentrationValue;
      } else if (presentation.form.toLowerCase().includes('comprimido')) {
        // Extract mg from label if possible (e.g., "Comprimido 5 mg")
        const match = presentation.label.match(/(\d+)\s*mg/i);
        if (match) {
          const mgPerTablet = parseFloat(match[1]);
          if (res.doseMinMg) res.tabletsMin = res.doseMinMg / mgPerTablet;
          if (res.doseMaxMg) res.tabletsMax = res.doseMaxMg / mgPerTablet;
          if (res.doseCalculatedMg) res.tabletsCalculated = res.doseCalculatedMg / mgPerTablet;
          
          if (!presentation.scoringInfo) {
            res.warning = 'Atenção: Comprimido não sulcado. Arredondamento pode ser impreciso.';
          }
        }
      }
    }

    return res;
  }, [weight, dose, presentation]);

  return { weight, setWeight, result };
}
