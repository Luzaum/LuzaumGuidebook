import { BloodGasInput, ParsedField, SampleType, Species } from '../types';
import { normalizeFiO2Input } from '../utils/fio2';

export type FieldSource = 'default' | 'manual' | 'ocr';

export interface PayloadIssue {
  level: 'warning' | 'critical';
  message: string;
  field?: keyof BloodGasInput | 'sampleType' | 'species';
}

export interface PayloadPreparationResult {
  payload: BloodGasInput;
  issues: PayloadIssue[];
  blocked: boolean;
  confidence: 'high' | 'moderate' | 'low' | 'blocked';
}

const PLAUSIBILITY_LIMITS: Partial<Record<keyof BloodGasInput, [number, number]>> = {
  pH: [6.5, 8.0],
  pCO2: [5, 150],
  pO2: [10, 800],
  HCO3: [3, 60],
  BE: [-30, 30],
  lactate: [0, 25],
  Na: [100, 190],
  K: [1.5, 10],
  Cl: [60, 160],
  temperature: [30, 43],
};

function getConfidenceLevel(issues: PayloadIssue[]): PayloadPreparationResult['confidence'] {
  const criticalCount = issues.filter((issue) => issue.level === 'critical').length;
  const warningCount = issues.filter((issue) => issue.level === 'warning').length;

  if (criticalCount > 0) return 'blocked';
  if (warningCount >= 3) return 'low';
  if (warningCount > 0) return 'moderate';
  return 'high';
}

function collectPlausibilityIssues(payload: BloodGasInput): PayloadIssue[] {
  const issues: PayloadIssue[] = [];

  for (const [field, limits] of Object.entries(PLAUSIBILITY_LIMITS) as Array<[keyof BloodGasInput, [number, number]]>) {
    const value = payload[field];
    if (typeof value !== 'number' || limits === undefined) continue;
    if (value < limits[0] || value > limits[1]) {
      issues.push({
        level: 'critical',
        field,
        message: `Valor de ${field} (${value}) fora de faixa fisiologica plausivel.`,
      });
    }
  }

  if (payload.sampleType === 'venous' && payload.pO2 !== undefined && payload.pO2 > 80) {
    issues.push({
      level: 'warning',
      field: 'pO2',
      message: 'pO2 venosa muito alta para faixa habitual. Confirme o tipo de amostra.',
    });
  }

  if (payload.HCO3 !== undefined && payload.BE !== undefined) {
    if (payload.HCO3 < 18 && payload.BE > 3) {
      issues.push({
        level: 'critical',
        field: 'BE',
        message: 'HCO3 baixo com BE positivo forte sugere conflito de dados.',
      });
    }
    if (payload.HCO3 > 28 && payload.BE < -3) {
      issues.push({
        level: 'critical',
        field: 'BE',
        message: 'HCO3 alto com BE negativo forte sugere conflito de dados.',
      });
    }
  }

  return issues;
}

export function applyOcrFieldsToFormData(
  current: Partial<BloodGasInput>,
  fields: ParsedField[],
  setFieldSource: (key: keyof BloodGasInput, source: FieldSource) => void
): Partial<BloodGasInput> {
  const next: Partial<BloodGasInput> = { ...current };
  for (const field of fields) {
    if (field.confidence === 'low') continue;
    (next as Record<keyof BloodGasInput, BloodGasInput[keyof BloodGasInput]>)[field.key] = field.value;
    setFieldSource(field.key, 'ocr');
  }
  return next;
}

export function buildInterpretationPayload(args: {
  formData: Partial<BloodGasInput>;
  species: Species;
  sampleType: SampleType;
  ocrPending: boolean;
  fieldSources: Partial<Record<keyof BloodGasInput, FieldSource>>;
}): PayloadPreparationResult {
  const { formData, species, sampleType, ocrPending, fieldSources } = args;
  const issues: PayloadIssue[] = [];

  if (ocrPending) {
    issues.push({
      level: 'critical',
      message: 'Ha dados de OCR nao aplicados. Confirme ou descarte antes de interpretar.',
    });
  }

  const fio2Raw = formData.fio2;
  const fio2Normalized = normalizeFiO2Input(fio2Raw);
  if (fio2Raw !== undefined && fio2Normalized.fraction === undefined) {
    issues.push({
      level: 'critical',
      field: 'fio2',
      message: 'FiO2 invalida. Use 21 ou 0.21.',
    });
  }

  const payload: BloodGasInput = {
    ...formData,
    species,
    sampleType,
    fio2: fio2Normalized.fraction ?? formData.fio2,
  } as BloodGasInput;

  const coreMissing: Array<keyof BloodGasInput> = [];
  if (payload.pH === undefined) coreMissing.push('pH');
  if (payload.pCO2 === undefined) coreMissing.push('pCO2');
  if (payload.HCO3 === undefined && payload.BE === undefined) {
    issues.push({
      level: 'warning',
      message: 'HCO3 e BE ausentes. A analise acido-base ficara limitada.',
    });
  }
  if (payload.sampleType === 'arterial' && payload.pO2 === undefined) {
    issues.push({
      level: 'warning',
      message: 'Amostra arterial sem pO2. A avaliacao de oxigenacao ficara limitada.',
      field: 'pO2',
    });
  }
  if (coreMissing.length > 0) {
    issues.push({
      level: 'warning',
      message: `Campos centrais ausentes: ${coreMissing.join(', ')}.`,
    });
  }

  const manualAndOcrFields = Object.entries(fieldSources)
    .filter(([, source]) => source === 'ocr')
    .map(([key]) => key);
  if (manualAndOcrFields.length > 0) {
    issues.push({
      level: 'warning',
      message: `Parte dos campos veio de OCR (${manualAndOcrFields.join(', ')}). Confirme se pertencem ao mesmo exame.`,
    });
  }

  issues.push(...collectPlausibilityIssues(payload));
  const confidence = getConfidenceLevel(issues);

  return {
    payload,
    issues,
    blocked: confidence === 'blocked',
    confidence,
  };
}
