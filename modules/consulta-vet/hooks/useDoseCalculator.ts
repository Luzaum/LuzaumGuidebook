import { useMemo, useState } from 'react';
import { MedicationDose, MedicationPresentation } from '../types/medication';
import { resolvePresentationConversion } from '../utils/medicationRules';

interface DoseCalculatorResult {
  doseMinMg?: number;
  doseMaxMg?: number;
  doseCalculatedMg?: number;
  conversionKind?: 'mg-only' | 'ml' | 'capsules' | 'tablets';
  conversionUnitLabel?: string;
  conversionExactMin?: number;
  conversionExactMax?: number;
  conversionExactSingle?: number;
  conversionSafeMin?: number;
  conversionSafeMax?: number;
  conversionSafeSingle?: number;
  warning?: string;
  conversionNote?: string;
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
    const hasRange = Number.isFinite(dose.doseMax) && dose.doseMax !== dose.doseMin;

    if (dose.doseMin) nextResult.doseMinMg = dose.doseMin * weight;
    if (dose.doseMax) nextResult.doseMaxMg = dose.doseMax * weight;
    if (dose.doseMin && !hasRange) nextResult.doseCalculatedMg = dose.doseMin * weight;

    if (!presentation) return nextResult;

    const conversion = resolvePresentationConversion(
      presentation,
      nextResult.doseMinMg,
      nextResult.doseMaxMg,
      nextResult.doseCalculatedMg
    );

    if (conversion) {
      nextResult.conversionKind = conversion.kind;
      nextResult.conversionUnitLabel = conversion.unitLabel;
      nextResult.conversionExactMin = conversion.exactMin;
      nextResult.conversionExactMax = conversion.exactMax;
      nextResult.conversionExactSingle = conversion.exactSingle;
      nextResult.conversionSafeMin = conversion.safeMin;
      nextResult.conversionSafeMax = conversion.safeMax;
      nextResult.conversionSafeSingle = conversion.safeSingle;
      nextResult.conversionNote = conversion.note;
      nextResult.warning = conversion.warning;
    }

    if (
      presentation.form.toLowerCase().includes('comprimido') &&
      !presentation.scoringInfo &&
      !nextResult.warning
    ) {
      nextResult.warning = UI_TEXT.missingScoreInfo;
    }

    return nextResult;
  }, [dose, presentation, weight]);

  return { weight, setWeight, result };
}
