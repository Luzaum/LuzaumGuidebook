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
  doseUnit: string;
}

const UI_TEXT = {
  calculatorDisabled: 'Calculadora n\u00e3o habilitada para esta dose.',
} as const;

export function useDoseCalculator(
  dose: MedicationDose,
  presentation?: MedicationPresentation,
  selectedSpecies?: 'dog' | 'cat',
) {
  const [weight, setWeight] = useState<number | ''>('');
  const effectiveSpecies = selectedSpecies || (dose?.species === 'cat' ? 'cat' : 'dog');
  const maximumWeight = effectiveSpecies === 'cat' ? 30 : 150;
  const validationError = typeof weight === 'number' && weight <= 0
    ? 'Informe um peso maior que zero.'
    : typeof weight === 'number' && weight > maximumWeight
      ? `O peso informado está acima da faixa plausível para ${effectiveSpecies === 'cat' ? 'gatos' : 'cães'} (máximo ${maximumWeight} kg). Confirme o cadastro do paciente.`
      : null;
  const disabledReason = dose && !dose.calculatorEnabled ? UI_TEXT.calculatorDisabled : null;

  const result = useMemo<DoseCalculatorResult | null>(() => {
    if (!weight || typeof weight !== 'number' || weight <= 0 || validationError || !dose?.calculatorEnabled) return null;

    const nextResult: DoseCalculatorResult = { doseUnit: dose.doseUnit };
    const hasRange = Number.isFinite(dose.doseMax) && dose.doseMax !== dose.doseMin;

    if (dose.doseMin) nextResult.doseMinMg = dose.doseMin * weight;
    if (dose.doseMax) nextResult.doseMaxMg = dose.doseMax * weight;
    if (dose.doseMin && !hasRange) nextResult.doseCalculatedMg = dose.doseMin * weight;

    if (!presentation || !/^(?:mcg|\u00b5g|\u03bcg|mg|g|ui)$/i.test(String(dose.doseUnit || '').trim())) return nextResult;

    const conversion = resolvePresentationConversion(
      presentation,
      nextResult.doseMinMg,
      nextResult.doseMaxMg,
      nextResult.doseCalculatedMg,
      dose.doseUnit,
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

    return nextResult;
  }, [dose, presentation, validationError, weight]);

  return { weight, setWeight, result, validationError, disabledReason, maximumWeight };
}
