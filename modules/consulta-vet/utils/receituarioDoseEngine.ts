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
const PLAUSIBLE_WEIGHT_KG: Record<PrescriptionSpecies, { min: number; max: number }> = {
  dog: { min: 0.05, max: 150 },
  cat: { min: 0.05, max: 30 },
};

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

function normalizeDoseDenominator(value: unknown): string | null {
  const normalized = normalizeText(value).replace(/^por\s+/, '').replace('m2', 'm²');
  if (!normalized) return null;
  if (/^(animal|cao|canino|gato|felino)$/.test(normalized)) return normalized === 'animal' ? 'animal' : normalized.includes('gat') || normalized.includes('felin') ? 'gato' : 'cão';
  return normalized;
}

export function inferTabletSplitIncrement(form: unknown, scoringInfo: unknown): number | null {
  const normalizedForm = normalizeText(form);
  if (!/comprim|tablet|dragea/.test(normalizedForm)) return null;
  const normalizedScoring = normalizeText(scoringInfo);
  if (/quadr|bissulc|quatro|1\s*\/\s*4/.test(normalizedScoring)) return 0.25;
  if (/partiv|sulc|meio|1\s*\/\s*2/.test(normalizedScoring)) return 0.5;
  return null;
}

/**
 * Os registros históricos podem guardar a unidade em duas colunas
 * (`dose_unit: mg` + `per_weight_unit: kg`). Esta função recompõe a unidade
 * clínica completa sem duplicar denominadores de registros mais novos.
 */
export function formatRecommendedDoseUnit(dose: Pick<RecommendedDose, 'dose_unit' | 'per_weight_unit'>): string {
  const unit = normalizeDoseUnit(dose.dose_unit);
  if (unit.denominator) return unit.canonical;
  const denominator = normalizeDoseDenominator(dose.per_weight_unit);
  return denominator ? `${unit.numerator}/${denominator}` : unit.canonical;
}

export function resolveAdministrationBasis(dose: RecommendedDose): AdministrationBasis {
  const explicit = normalizeText(dose.administration_basis);
  if (explicit === 'per_animal') return 'per_animal';
  if (explicit === 'per_application_site' || explicit === 'application_per_site') return 'per_application_site';
  if (explicit === 'weight_band') return 'weight_band';
  const unit = normalizeDoseUnit(dose.dose_unit);
  const denominator = unit.denominator || normalizeDoseDenominator(dose.per_weight_unit) || '';
  if (/^kg(?:\/|$)/.test(denominator)) return 'weight_based';
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

function presentationAdministrationUnit(
  presentation: MedicationPresentationRecord,
  concentrationPerUnit: string | null,
  metadata: ReturnType<typeof getDoseEngineMetadata>,
): string {
  const haystack = normalizeText(`${presentation.pharmaceutical_form} ${presentation.presentation_unit} ${presentation.per_unit}`);
  if (/caps/.test(haystack)) return 'cápsula';
  if (/comp|tablet|drag/.test(haystack)) return 'comprimido';
  if (/^ml$/.test(normalizeText(concentrationPerUnit))) {
    return /gota/.test(haystack) && metadata.drops_per_ml ? 'gota' : 'mL';
  }
  if (/gota/.test(normalizeText(concentrationPerUnit)) || /gota/.test(haystack)) return 'gota';
  if (/spray|jato|borrif|aerossol|pmdi/.test(haystack)) return 'jato';
  if (/ml|solu|susp|xarope|liquid/.test(haystack)) return 'mL';
  return String(presentation.per_unit || presentation.presentation_unit || 'unidade');
}

function isDirectAdministrationUnit(sourceUnit: string, administrationUnit: string): boolean {
  const source = normalizeText(sourceUnit);
  const administration = normalizeText(administrationUnit);
  if (source === 'ml' && administration === 'ml') return true;
  if (/^gotas?$/.test(source) && /^gotas?$/.test(administration)) return true;
  if (/^(jato|spray|borrifada)s?$/.test(source) && /^(jato|spray|borrifada)s?$/.test(administration)) return true;
  if (/^(aplicacao|dose)s?$/.test(source) && /^(aplicacao|dose)s?$/.test(administration)) return true;
  return false;
}

function parsePresentationConcentration(presentation: MedicationPresentationRecord): {
  value: number;
  valueUnit: string;
  perValue: number;
  perUnit: string | null;
} | null {
  const concentrationValue = Number(presentation.value);
  const rawValueUnit = String(presentation.value_unit || '').trim();
  if (!Number.isFinite(concentrationValue) || concentrationValue <= 0 || !rawValueUnit) return null;

  const [rawNumerator, rawDenominator = ''] = rawValueUnit.split('/').map((item) => item.trim());
  const numeratorMatch = rawNumerator.match(/(?:^|\s)(mcg|ug|\u00b5g|\u03bcg|mg|g|ui|u|meq|ml|l|%)(?:\s|$)/i);
  const valueUnit = numeratorMatch?.[1] || rawNumerator;
  const denominatorMatch = rawDenominator.match(/^(\d+(?:[.,]\d+)?)\s*(.*)$/);
  const denominatorFromUnit = denominatorMatch ? Number(denominatorMatch[1].replace(',', '.')) : null;
  const explicitPerValue = Number(presentation.per_value);
  const perValue = Number.isFinite(denominatorFromUnit) && Number(denominatorFromUnit) > 0
    ? Number(denominatorFromUnit)
    : Number.isFinite(explicitPerValue) && explicitPerValue > 0
      ? explicitPerValue
      : 1;

  const perUnit = (denominatorMatch ? denominatorMatch[2] : rawDenominator)
    || String(presentation.per_unit || '').trim()
    || null;

  return { value: concentrationValue, valueUnit, perValue, perUnit };
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

export function isPresentationRouteCompatible(presentation: MedicationPresentationRecord | null | undefined, route: string): boolean {
  if (!presentation) return true;
  const form = normalizeText(presentation.pharmaceutical_form);
  const prescribed = normalizeText(route);
  // Formulações injetáveis convencionais podem ter uso transmucoso explícito (ex.: buprenorfina).
  if (/\botm\b|transmucos|mucosa.*boc|bucal/.test(prescribed) && /injet|injec/.test(form)) return true;
  const categories = (value: string) => [
    /\bvo\b|\bpo\b|oral|comprim|capsul|orodispers/.test(value) ? 'oral' : '',
    /\biv\b|\bsc\b|\bim\b|injet|injec|intraven|subcut|intramusc/.test(value) ? 'injetável' : '',
    /inal|inhal|pmdi|aerossol/.test(value) ? 'inalatória' : '',
  ].filter(Boolean);
  const available = categories(normalizeText(presentation.metadata?.route) || form);
  const requested = categories(prescribed);
  return !available.length || !requested.length || available.some(item => requested.includes(item));
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

  if (!isSpeciesCompatible(input.dose.species, input.species)) {
    return { ...base, blockedReason: 'Esta dose não está cadastrada para a espécie do paciente.' };
  }
  if (!isPresentationRouteCompatible(input.presentation, input.dose.route)) {
    return { ...base, blockedReason: 'A apresentação selecionada não corresponde à via desta dose. Escolha uma apresentação compatível ou outro regime de administração.' };
  }

  if (!Number.isFinite(input.selectedDoseValue) || input.selectedDoseValue <= 0) {
    return { ...base, blockedReason: 'Informe uma dose válida.' };
  }
  if (requiresWeight && !weight) {
    return { ...base, blockedReason: 'Informe o peso para esta dose.' };
  }
  if (requiresWeight && weight) {
    const plausible = PLAUSIBLE_WEIGHT_KG[input.species];
    if (weight < plausible.min || weight > plausible.max) {
      return {
        ...base,
        blockedReason: `O peso de ${weight.toLocaleString('pt-BR')} kg está fora da faixa plausível para ${input.species === 'dog' ? 'cães' : 'gatos'} (${plausible.min.toLocaleString('pt-BR')} a ${plausible.max.toLocaleString('pt-BR')} kg). Confirme o cadastro do paciente.`,
      };
    }
  }

  const totalDose = basis === 'weight_based' ? input.selectedDoseValue * (weight || 0) : input.selectedDoseValue;
  base.totalDose = totalDose;
  if (!input.presentation) return base;

  const presentation = input.presentation;
  const metadata = getDoseEngineMetadata(presentation);
  const concentration = parsePresentationConcentration(presentation);
  const administrationUnit = presentationAdministrationUnit(presentation, concentration?.perUnit || null, metadata);
  if (isDirectAdministrationUnit(sourceUnit.numerator, administrationUnit)) {
    return {
      ...base,
      exactAmount: totalDose,
      practicalAmount: totalDose,
      administrationUnit,
      actualTotalDose: totalDose,
      actualDosePerBasis: weight ? totalDose / weight : totalDose,
      percentDifference: 0,
    };
  }

  if (!concentration) {
    return { ...base, blockedReason: 'A apresentação não possui concentração estruturada para cálculo.' };
  }
  const convertedTotal = convertDose(totalDose, sourceUnit.numerator, concentration.valueUnit);
  if (convertedTotal == null) {
    return { ...base, blockedReason: `A unidade ${sourceUnit.numerator} não é compatível com ${concentration.valueUnit}.` };
  }

  const concentrationPerMeasuredUnit = concentration.value / concentration.perValue;
  const dropsPerMl = Number(metadata.drops_per_ml);
  const concentrationPerUnit = administrationUnit === 'gota'
    && normalizeText(concentration.perUnit) === 'ml'
    && Number.isFinite(dropsPerMl)
    && dropsPerMl > 0
    ? concentrationPerMeasuredUnit / dropsPerMl
    : concentrationPerMeasuredUnit;
  const exactAmount = convertedTotal / concentrationPerUnit;
  const isCapsule = administrationUnit === 'cápsula';
  const isTablet = administrationUnit === 'comprimido';
  const isDrop = administrationUnit === 'gota';
  const isActuation = /^(jato|puff|dose|acionamento)$/i.test(administrationUnit);
  if (isActuation && Math.abs(exactAmount - Math.round(exactAmount)) > 1e-8) {
    return { ...base, exactAmount, administrationUnit, blockedReason: 'A dose exige uma fração de jato, que esta bombinha não fornece. Escolha outra concentração ou revise a dose clínica; não arredonde os jatos automaticamente.' };
  }
  const configuredIncrement = Number(presentation.tablet_split_increment ?? metadata.split_increment);
  const hasConfiguredIncrement = Number.isFinite(configuredIncrement) && configuredIncrement > 0;
  const increment = metadata.whole_unit_only || isCapsule || isDrop || isActuation
    ? 1
    : isTablet
      ? hasConfiguredIncrement ? configuredIncrement : 1
      : hasConfiguredIncrement
        ? configuredIncrement
        : 0;

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
    const missingTabletDivisibility = isTablet && !hasConfiguredIncrement && !metadata.whole_unit_only;
    const unsafeOverdose = selected.percentDifference > 25;
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
      requiresConfirmation: rounded && !unsafeOverdose,
      blockedReason: unsafeOverdose
        ? `A apresentação escolhida forneceria ${Math.abs(selected.percentDifference).toFixed(1).replace('.', ',')}% a mais do que a dose calculada. Escolha outra concentração ou apresentação.`
        : undefined,
      warning: unsafeOverdose
        ? undefined
        : missingTabletDivisibility
        ? 'Divisibilidade não cadastrada; por segurança, a quantidade foi limitada a comprimidos inteiros.'
        : Math.abs(selected.percentDifference) > tolerance
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

export function formatAdministrationAmount(amount: number, unit: string): string {
  const singular = String(unit || '').trim();
  const pluralByUnit: Record<string, string> = {
    comprimido: 'comprimidos',
    'cápsula': 'cápsulas',
    gota: 'gotas',
    jato: 'jatos',
    unidade: 'unidades',
  };
  const displayUnit = amount > 1 ? pluralByUnit[singular] || singular : singular;
  return `${formatDecimalPtBr(amount)} ${displayUnit}`.trim();
}
