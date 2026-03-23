import { CalculationStep } from '../shared/types/calculation';

export const buildDidacticStep = (
  step: number,
  title: string,
  explanation: string,
  formula: string,
  substitution: string,
  resultValue: string,
  unit: string,
  note?: string
): CalculationStep => ({
  step,
  title,
  explanation,
  formula,
  substitution,
  result: `${resultValue} ${unit}`,
  unit,
  note,
});
