import type { MedicationPresentationRecord, RecommendedDose } from '../../../src/lib/clinicRecords';
import { getDoseEngineMetadata } from '../../../src/lib/medicationCatalog';
import type { AdministrationBasis, PrescriptionSpecies } from '../types/receituario';

export interface DoseCalculationInput {
  species: PrescriptionSpecies;
  weightKg?: number | null;
  dose: RecommendedDose;
  selectedDoseValue: number;
  presentation?: MedicationPresentationRecord | null;
  roundingTolerancePercent?: number;
}

export interface PracticalAlternative {
  amount: number;
  totalDose: number;
  actualDosePerBasis: number;
  percentDifference: number;
}

export interface DoseCalculationResult {
  basis: AdministrationBasis;
  sourceDoseUnit: string;
  requiresWeight: boolean;
  totalDose: number;
  totalDoseUnit: string;
  exactAmount?: number;
  practicalAmount?: number;
  administrationUnit?: string;
  actualTotalDose?: number;
  actualDosePerBasis?: number;
  percentDifference?: number;
  alternatives: PracticalAlternative[];
  requiresConfirmation: boolean;
  warning?: string;
  blockedReason?: string;
}

const UNIT_ALIASES: Record<string, string> = {
  'µg': 'mcg', ug: 'mcg', mcg: 'mcg', mg: 'mg', g: 'g',
  ui: 'UI', u: 'UI', unidade: 'UI', unidades: 'UI',
  meq: 'mEq', ml: 'mL', l: 'L', '%': '%',
};

const MASS_TO_MG: Record<string, number> = { mcg: 0.001, mg: 1, g: 1000 };

function normalizeText(value: unknown): string {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
}

export function normalizeDoseUnit(value: string): { numerator: string; denominator: string | null; canonical: string } {
  const clean = String(value || '').trim().replace(/µ/g, 'u');
  const [rawNumerator, rawDenominator] = clean.split('/').map((item) => item.trim());
  const numerator = UNIT_ALIASES[rawNumerator.toLowerCase()] || rawNumerator;
  const denominator = rawDenominator ? normalizeText(rawDenominator).replace('m2', 'm²') : null;
  return { numerator, denominator, canonical: denominator ? `${numerator}/${denominator}` : numerator };
}

export function resolveAdministrationBasis(dose: RecommendedDose): AdministrationBasis {
  const explicit = normalizeText(dose.administration_basis);
  if (explicit === 'per_animal') return 'per_animal';
  if (explicit === 'per_application_site' || explicit === 'application_per_site') return 'per_application_site';
  if (explicit === 'weight_band') return 'weight_band';
  const unit = normalizeDoseUnit(dose.dose_unit);
  if (unit.denominator === 'kg' || normalizeText(dose.per_weight_unit) === 'kg') return 'weight_based';
  if (/olho|ouvido|narina|local|sitio|aplicacao/.test(normalizeText(dose.administration_target))) return 'per_application_site';
  return 'per_animal';
}

export function isSpeciesCompatible(value: string, species: PrescriptionSpecies): boolean {
  const normalized = normalizeText(value);
  if (!normalized || /ambos|both|cao e gato|canino e felino/.test(normalized)) return true;
  return species === 'dog' ? /cao|canin|dog/.test(normalized) : /gato|felin|cat/.test(normalized);
}

function convertDose(value: number, from: string, to: string): number | null {
  const source = normalizeDoseUnit(from).numerator;
  const target = normalizeDoseUnit(to).numerator;
  if (source === target) return value;
  if (MASS_TO_MG[source] && MASS_TO_MG[target]) return (value * MASS_TO_MG[source]) / MASS_TO_MG[target];
  return null;
}

function presentationAdministrationUnit(presentation: MedicationPresentationRecord): string {
  const haystack = normalizeText(`${presentation.pharmaceutical_form} ${presentation.presentation_unit} ${presentation.per_unit}`);
  if (/caps/.test(haystack)) return 'cápsula';
  if (/comp|tablet|drag/.test(haystack)) return 'comprimido';
  if (/gota/.test(haystack)) return 'gota';
  if (/spray|jato|borrif/.test(haystack)) return 'jato';
  if (/ml|solu|susp|xarope|liquid/.test(haystack)) return 'mL';
  return String(presentation.per_unit || presentation.presentation_unit || 'unidade');
}

function roundToIncrement(value: number, increment: number): number {
  return Math.round(value / increment) * increment;
}

function buildAlternatives(exact: number, increment: number, concentrationPerUnit: number, weight: number | null, totalDose: number): PracticalAlternative[] {
  const center = roundToIncrement(exact, increment);
  const candidates = [center - increment, center, center + increment]
    .filter((value) => value > 0)
    .filter((value, index, values) => values.indexOf(value) === index);
  return candidates.map((amount) => {
    const actualTotal = amount * concentrationPerUnit;
    return {
      amount,
      totalDose: actualTotal,
      actualDosePerBasis: weight ? actualTotal / weight : actualTotal,
      percentDifference: ((actualTotal - totalDose) / totalDose) * 100,
    };
  }).sort((a, b) => Math.abs(a.percentDifference) - Math.abs(b.percentDifference));
}

export function calculateReceituarioDose(input: DoseCalculationInput): DoseCalculationResult {
  const basis = resolveAdministrationBasis(input.dose);
  const sourceUnit = normalizeDoseUnit(input.dose.dose_unit);
  const requiresWeight = basis === 'weight_based' || basis === 'weight_band';
  const weight = input.weightKg && input.weightKg > 0 ? input.weightKg : null;
  const base: DoseCalculationResult = {
    basis,
    sourceDoseUnit: sourceUnit.canonical,
    requiresWeight,
    totalDose: 0,
    totalDoseUnit: sourceUnit.numerator,
    alternatives: [],
    requiresConfirmation: false,
  };

  if (!Number.isFinite(input.selectedDoseValue) || input.selectedDoseValue <= 0) {
    return { ...base, blockedReason: 'Informe uma dose válida.' };
  }
  if (requiresWeight && !weight) {
    return { ...base, blockedReason: 'Informe o peso para esta dose.' };
  }

  const totalDose = basis === 'weight_based' ? input.selectedDoseValue * (weight || 0) : input.selectedDoseValue;
  base.totalDose = totalDose;
  if (!input.presentation) return base;

  const presentation = input.presentation;
  const concentrationValue = Number(presentation.value);
  const perValue = Number(presentation.per_value || 1);
  const presentationUnit = String(presentation.value_unit || '').split('/')[0].trim();
  if (!Number.isFinite(concentrationValue) || concentrationValue <= 0 || !presentationUnit) {
    return { ...base, blockedReason: 'A apresentação não possui concentração estruturada para cálculo.' };
  }
  const convertedTotal = convertDose(totalDose, sourceUnit.numerator, presentationUnit);
  if (convertedTotal == null) {
    return { ...base, blockedReason: `A unidade ${sourceUnit.numerator} não é compatível com ${presentationUnit}.` };
  }

  const concentrationPerUnit = concentrationValue / (Number.isFinite(perValue) && perValue > 0 ? perValue : 1);
  const exactAmount = convertedTotal / concentrationPerUnit;
  const administrationUnit = presentationAdministrationUnit(presentation);
  const metadata = getDoseEngineMetadata(presentation);
  const isCapsule = administrationUnit === 'cápsula';
  const isTablet = administrationUnit === 'comprimido';
  const configuredIncrement = Number(presentation.tablet_split_increment ?? metadata.split_increment);
  const increment = Number.isFinite(configuredIncrement) && configuredIncrement > 0
    ? configuredIncrement
    : metadata.whole_unit_only || isCapsule ? 1 : isTablet && metadata.allow_split ? 0.5 : 0;

  if ((isTablet || isCapsule) && !increment) {
    return {
      ...base,
      exactAmount,
      administrationUnit,
      blockedReason: 'Divisibilidade não cadastrada. Confirme a apresentação ou escolha outra opção.',
    };
  }

  if (increment > 0) {
    const alternatives = buildAlternatives(exactAmount, increment, concentrationPerUnit, weight, convertedTotal);
    const selected = alternatives[0];
    const tolerance = input.roundingTolerancePercent ?? 10;
    const rounded = Math.abs(selected.amount - exactAmount) > 1e-9;
    return {
      ...base,
      totalDose: convertedTotal,
      exactAmount,
      practicalAmount: selected.amount,
      administrationUnit,
      actualTotalDose: selected.totalDose,
      actualDosePerBasis: selected.actualDosePerBasis,
      percentDifference: selected.percentDifference,
      alternatives,
      requiresConfirmation: rounded,
      warning: Math.abs(selected.percentDifference) > tolerance
        ? `A diferença de ${Math.abs(selected.percentDifference).toFixed(1).replace('.', ',')}% excede a tolerância de ${tolerance}%.`
        : rounded ? 'A quantidade prática foi arredondada conforme a divisibilidade cadastrada.' : undefined,
    };
  }

  return {
    ...base,
    totalDose: convertedTotal,
    exactAmount,
    practicalAmount: exactAmount,
    administrationUnit,
    actualTotalDose: convertedTotal,
    actualDosePerBasis: weight ? convertedTotal / weight : convertedTotal,
    percentDifference: 0,
  };
}

export function formatDecimalPtBr(value: number, maximumFractionDigits = 3): string {
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits }).format(value);
}
