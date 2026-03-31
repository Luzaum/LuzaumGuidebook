/**
 * ReceituárioVET UI Helpers
 * Clinical calculations and formatting — v2
 */

// ---------------------------------------------------------------------------
// Presentation interface (shared shape)
// ---------------------------------------------------------------------------

export interface Presentation {
  id?: string;
  pharmaceutical_form?: string | null;
  value?: number | null;
  value_unit?: string | null;
  per_value?: number | null;
  per_unit?: string | null;
  concentration_text?: string | null;
  pharmacy_veterinary?: boolean;
  pharmacy_human?: boolean;
  pharmacy_compounding?: boolean;
  /** Legacy field from localStorage catalog */
  pharmacyTags?: string[];
  metadata?: Record<string, any>;
  [key: string]: any;
}

// ---------------------------------------------------------------------------
// Practical Equivalent — types
// ---------------------------------------------------------------------------

export type PracticalEquivalentReasonCode =
  | 'unit_mismatch'
  | 'missing_presentation_strength'
  | 'missing_per_value'
  | 'unsupported_form'
  | 'invalid_input';

export interface PracticalEquivalentInput {
  /** Dose TOTAL por administração — já calculada pelo chamador (ex: 14.25 mg) */
  totalDosePerAdmin: number;
  /** Unidade da dose (ex: 'mg', 'mcg', 'UI', 'g') */
  doseUnit: string;
  /** A apresentação farmacêutica selecionada */
  presentation: Presentation;
}

export interface PracticalEquivalentResult {
  /** Se o cálculo foi possível */
  success: boolean;
  /** Valor numérico equivalente (ex: 0.25 comprimido, 2.5 mL) */
  equivalentValue: number;
  /** Unidade de administração (ex: 'comprimido', 'mL', 'cápsula') */
  equivalentUnit: string;
  /** Label formatado pronto para exibição */
  label: string;
  /** Alerta clínico, quando aplicável */
  alert?: string;
  /** Severidade do alerta */
  alertSeverity?: 'info' | 'warning' | 'danger';
  /** Label de origem: 'Veterinária' | 'Humana' | 'Manipulado' */
  pharmacyLabel?: string;
  /** Reason code quando success=false */
  reasonCode?: PracticalEquivalentReasonCode;
  /** Motivo de falha legível quando success=false */
  failReason?: string;
  /** Optional step-by-step trace */
  steps?: string[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const EPSILON = 0.01;

/** Known fractions for tablet splitting */
const PRACTICAL_FRACTIONS = [0, 0.25, 0.5, 0.75, 1] as const;

/** Safe unit conversion table — maps "fromUnit|toUnit" → factor */
const UNIT_CONVERSION: Record<string, number> = {
  'mg|mcg': 1000,
  'mcg|mg': 0.001,
  'g|mg': 1000,
  'mg|g': 0.001,
  'g|mcg': 1_000_000,
  'mcg|g': 0.000_001,
  'ui|ui': 1,
};

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function normalizeUnit(raw: string): string {
  return (raw || '').trim().toLowerCase().replace('µg', 'mcg');
}

function getConversionFactor(fromUnit: string, toUnit: string): number | null {
  const from = normalizeUnit(fromUnit);
  const to = normalizeUnit(toUnit);
  if (from === to) return 1;
  return UNIT_CONVERSION[`${from}|${to}`] ?? null;
}

function nearEpsilon(a: number, b: number): boolean {
  return Math.abs(a - b) < EPSILON;
}

/**
 * Checks whether the fractional part of `value` is close to a practical
 * splitting fraction (0, 0.25, 0.5, 0.75).
 */
function isPracticalFraction(value: number): boolean {
  const frac = value - Math.floor(value);
  return PRACTICAL_FRACTIONS.some(pf => nearEpsilon(frac, pf));
}

function formatDecimalPtBr(value: number, decimals = 2): string {
  return value.toFixed(decimals).replace('.', ',');
}

function pluralize(singular: string, count: number): string {
  if (nearEpsilon(count, 1)) return singular;
  const map: Record<string, string> = {
    comprimido: 'comprimidos',
    cápsula: 'cápsulas',
    unidade: 'unidades',
  };
  return count > 1 ? (map[singular] || singular) : singular;
}

/**
 * Returns a fractional label like '1/4', '1/2', '3/4' for values near those
 * fractions, or null if not a practical fraction.
 */
function fractionLabel(frac: number): string | null {
  if (nearEpsilon(frac, 0.25)) return '1/4';
  if (nearEpsilon(frac, 0.5)) return '1/2';
  if (nearEpsilon(frac, 0.75)) return '3/4';
  return null;
}

// ---------------------------------------------------------------------------
// Form classification
// ---------------------------------------------------------------------------

interface FormClassification {
  isPill: boolean;
  isCapsule: boolean;
  isLiquid: boolean;
}

/** Strip diacritics for safe regex matching (cápsula → capsula) */
function stripDiacritics(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function classifyForm(presentation: Presentation): FormClassification {
  const form = stripDiacritics((presentation.pharmaceutical_form || '').toLowerCase());
  const perUnit = stripDiacritics((presentation.per_unit || '').toLowerCase());

  let isPill = /comp|tab|drag/.test(form);
  let isCapsule = /caps/.test(form);
  let isLiquid = /solu|susp|gota|liqu|xarope|elixir/.test(form);

  // Fallback: use per_unit as hint when form is unrecognized
  if (!isPill && !isCapsule && !isLiquid) {
    if (/ml/.test(perUnit)) isLiquid = true;
    else if (/comp|tab/.test(perUnit)) isPill = true;
    else if (/caps/.test(perUnit)) isCapsule = true;
  }

  return { isPill, isCapsule, isLiquid };
}

// ---------------------------------------------------------------------------
// Pharmacy label
// ---------------------------------------------------------------------------

function resolvePharmacyLabel(p: Presentation): string | undefined {
  // New-schema booleans
  if (p.pharmacy_compounding) return 'Manipulado';
  if (p.pharmacy_veterinary) return 'Veterinária';
  if (p.pharmacy_human) return 'Humana';

  // Legacy pharmacyTags array
  if (Array.isArray(p.pharmacyTags) && p.pharmacyTags.length > 0) {
    const first = (p.pharmacyTags[0] || '').toLowerCase();
    if (first.includes('vet')) return 'Veterinária';
    if (first.includes('hum')) return 'Humana';
    if (first.includes('manip') || first.includes('compounding')) return 'Manipulado';
  }

  return undefined;
}

// ---------------------------------------------------------------------------
// Main calculator — v2
// ---------------------------------------------------------------------------

/**
 * Calculates the practical equivalent (pills, mL, capsules, etc.) for a given
 * total dose per administration and a selected presentation.
 *
 * The caller is responsible for computing `totalDosePerAdmin` (e.g. doseValue × weight).
 *
 * @example
 * ```ts
 * const result = calculatePracticalEquivalent({
 *   totalDosePerAdmin: 14.25,
 *   doseUnit: 'mg',
 *   presentation: { value: 57, value_unit: 'mg', per_value: 1, per_unit: 'comprimido', pharmaceutical_form: 'Comprimido' },
 * });
 * // result.label === '1/4 comprimido'
 * ```
 */
export function calculatePracticalEquivalent(
  input: PracticalEquivalentInput
): PracticalEquivalentResult {
  const { totalDosePerAdmin, doseUnit, presentation } = input;
  const steps: string[] = [];
  const pharmacyLabel = resolvePharmacyLabel(presentation);

  // ------ Step 1: Validate input ------
  if (!totalDosePerAdmin || totalDosePerAdmin <= 0 || !doseUnit) {
    return fail('invalid_input', 'Dados insuficientes para cálculo (dose ou unidade ausentes).', pharmacyLabel, steps);
  }

  const concValue = presentation.value;
  const concUnit = presentation.value_unit;
  if (concValue == null || concValue <= 0 || !concUnit) {
    return fail('missing_presentation_strength', 'Apresentação sem concentração definida (value/value_unit).', pharmacyLabel, steps);
  }

  const perValue = presentation.per_value;
  const perUnit = presentation.per_unit;
  if (perValue == null || perValue <= 0) {
    return fail('missing_per_value', 'Apresentação sem per_value definido.', pharmacyLabel, steps);
  }
  if (!perUnit) {
    return fail('missing_per_value', 'Apresentação sem per_unit definido.', pharmacyLabel, steps);
  }

  steps.push(`Dose por administração: ${totalDosePerAdmin} ${doseUnit}`);
  steps.push(`Apresentação: ${concValue} ${concUnit} / ${perValue} ${perUnit}`);

  // ------ Step 2: Real concentration per admin unit ------
  const concentrationPerUnit = concValue / perValue;
  steps.push(`Concentração por unidade de administração: ${concentrationPerUnit} ${concUnit}/${perUnit}`);
  // e.g. 20 mg / 5 mL = 4 mg/mL

  // ------ Step 3: Unit conversion ------
  const factor = getConversionFactor(doseUnit, concUnit);
  if (factor === null) {
    return fail(
      'unit_mismatch',
      `Unidade da dose (${doseUnit}) incompatível com a apresentação (${concUnit}).`,
      pharmacyLabel,
      steps,
    );
  }
  steps.push(`Fator de conversão de ${doseUnit} para ${concUnit}: ${factor}`);
  const totalDoseConverted = totalDosePerAdmin * factor;
  steps.push(`Dose convertida para unidade da apresentação: ${totalDoseConverted} ${concUnit}`);

  // ------ Step 4: Equivalent value ------
  const equivalentValue = totalDoseConverted / concentrationPerUnit;
  steps.push(`Cálculo do equivalente: ${totalDoseConverted} ${concUnit} / ${concentrationPerUnit} ${concUnit}/${perUnit} = ${equivalentValue.toFixed(4)} ${perUnit}`);

  // ------ Step 5: Classify form ------
  const { isPill, isCapsule, isLiquid } = classifyForm(presentation);

  // ------ Step 6: Format label + alerts ------
  let label = '';
  let alert: string | undefined;
  let alertSeverity: PracticalEquivalentResult['alertSeverity'];
  let equivalentUnit = perUnit;

  if (isPill) {
    ({ label, alert, alertSeverity, equivalentUnit } = formatPill(equivalentValue));
    steps.push(`Formato classificado como: Comprimido. Label formatado: ${label}`);
  } else if (isCapsule) {
    ({ label, alert, alertSeverity, equivalentUnit } = formatCapsule(equivalentValue));
    steps.push(`Formato classificado como: Cápsula. Label formatado: ${label}`);
  } else if (isLiquid) {
    ({ label, alert, alertSeverity, equivalentUnit } = formatLiquid(equivalentValue, presentation));
    steps.push(`Formato classificado como: Líquido. Label formatado: ${label}`);
  } else {
    // Generic / unknown form
    equivalentUnit = perUnit || 'unidade';
    label = `${formatDecimalPtBr(equivalentValue)} ${pluralize(equivalentUnit, equivalentValue)}`;
    steps.push(`Formato não classificado. Label genérico: ${label}`);
  }

  return {
    success: true,
    equivalentValue,
    equivalentUnit,
    label,
    alert,
    alertSeverity,
    pharmacyLabel,
    steps,
  };
}

// ---------------------------------------------------------------------------
// Format helpers per pharmaceutical form
// ---------------------------------------------------------------------------

interface FormatOutput {
  label: string;
  equivalentUnit: string;
  alert?: string;
  alertSeverity?: PracticalEquivalentResult['alertSeverity'];
}

function formatPill(eqVal: number): FormatOutput {
  const unit = 'comprimido';
  let label = '';
  let alert: string | undefined;
  let alertSeverity: PracticalEquivalentResult['alertSeverity'];

  // --- Build label ---
  if (nearEpsilon(eqVal, Math.round(eqVal)) && eqVal >= 0.5) {
    // Integer (or close enough)
    const rounded = Math.round(eqVal);
    label = `${rounded} ${pluralize(unit, rounded)}`;
  } else if (eqVal < 1) {
    // Pure fraction < 1
    const fl = fractionLabel(eqVal);
    label = fl ? `${fl} ${unit}` : `${formatDecimalPtBr(eqVal)} ${unit}`;
  } else {
    // > 1 with possible fractional part
    const whole = Math.floor(eqVal);
    const frac = eqVal - whole;
    if (nearEpsilon(frac, 0)) {
      label = `${whole} ${pluralize(unit, whole)}`;
    } else {
      const fl = fractionLabel(frac);
      if (fl) {
        label = `${whole} e ${fl} ${pluralize(unit, eqVal)}`;
      } else {
        label = `${formatDecimalPtBr(eqVal)} ${pluralize(unit, eqVal)}`;
      }
    }
  }

  // --- Alert: fraction < 1/4 ---
  if (eqVal < 0.25 - EPSILON) {
    alert = 'Concentração muito alta para este paciente. Considere outra apresentação ou manipulação.';
    alertSeverity = 'warning';
  }

  // --- Alert: impractical fraction (not near 1/4, 1/2, 3/4 boundaries) ---
  if (!alert && !isPracticalFraction(eqVal)) {
    alert = `Divisão pouco prática (${formatDecimalPtBr(eqVal)} ${pluralize(unit, eqVal)}). Considere ajustar a dose ou selecionar outra apresentação.`;
    alertSeverity = 'info';
  }

  return { label, equivalentUnit: unit, alert, alertSeverity };
}

function formatCapsule(eqVal: number): FormatOutput {
  const unit = 'cápsula';
  let label: string;
  let alert: string | undefined;
  let alertSeverity: PracticalEquivalentResult['alertSeverity'];

  if (nearEpsilon(eqVal, Math.round(eqVal))) {
    // Exact integer — no problem
    const rounded = Math.round(eqVal);
    label = `${rounded} ${pluralize(unit, rounded)}`;
  } else {
    // Fractional capsule — NEVER ceil
    label = `Equivalente teórico: ${formatDecimalPtBr(eqVal)} ${unit}`;
    alert = 'Cápsulas NÃO devem ser fracionadas. Considere manipulação para dose exata ou selecione outra apresentação.';
    alertSeverity = 'danger';
  }

  return { label, equivalentUnit: unit, alert, alertSeverity };
}

function formatLiquid(eqVal: number, presentation: Presentation): FormatOutput {
  const unit = 'mL';

  // Determine rounding precision from dose_engine metadata
  const doseEngine = presentation.metadata?.dose_engine ?? presentation.metadata ?? {};
  const roundTo = (typeof doseEngine.round_ml_to === 'number' && doseEngine.round_ml_to > 0)
    ? doseEngine.round_ml_to
    : 0.01;

  const rounded = Math.round(eqVal / roundTo) * roundTo;
  // Decide decimal places: at least enough to show the rounding step
  const decimals = Math.max(2, -Math.floor(Math.log10(roundTo)));
  const label = `${formatDecimalPtBr(rounded, decimals)} ${unit}`;

  let alert: string | undefined;
  let alertSeverity: PracticalEquivalentResult['alertSeverity'];

  // Alert for very small volumes
  if (rounded < 0.1) {
    alert = `Volume muito pequeno (${formatDecimalPtBr(rounded, decimals)} mL). Considere diluição ou outra apresentação para maior precisão de medida.`;
    alertSeverity = 'info';
  }

  return { label, equivalentUnit: unit, alert, alertSeverity };
}

// ---------------------------------------------------------------------------
// Failure helper
// ---------------------------------------------------------------------------

function fail(
  reasonCode: PracticalEquivalentReasonCode,
  failReason: string,
  pharmacyLabel?: string,
  steps: string[] = [],
): PracticalEquivalentResult {
  return {
    success: false,
    equivalentValue: 0,
    equivalentUnit: '',
    label: '',
    reasonCode,
    failReason,
    pharmacyLabel,
    steps,
  };
}

// ---------------------------------------------------------------------------
// Duration label formatter (unchanged)
// ---------------------------------------------------------------------------

/**
 * Formats duration values into human-readable strings.
 */
export function formatDurationLabel(duration: string | null | undefined): string {
  if (!duration) return '';
  const trimmed = duration.trim().toLowerCase();

  if (/^\d+$/.test(trimmed)) {
    return `${trimmed} dias`;
  }

  if (['continuo', 'contínuo', 'uso continuo', 'uso contínuo', 'continuous'].includes(trimmed)) {
    return 'uso contínuo';
  }

  if (['ate retorno', 'até retorno', 'until recheck', 'recheck'].includes(trimmed)) {
    return 'até o retorno';
  }

  if (['ate o fim', 'até o fim', 'until finished'].includes(trimmed)) {
    return 'até o fim do frasco/caixa';
  }

  return duration;
}

// ---------------------------------------------------------------------------
// Pharmacy type label (unchanged)
// ---------------------------------------------------------------------------

/**
 * Renames internal pharmacy type codes to friendly labels.
 */
export function getPharmacyTypeLabel(type: string): string {
  const map: Record<string, string> = {
    'vet': 'Veterinária',
    'veterinary': 'Veterinária',
    'hum': 'Humana',
    'human': 'Humana',
    'manip': 'Manipulado',
    'compounding': 'Manipulado',
    'manipulacao': 'Manipulado',
    'manipulado': 'Manipulado',
  };
  return map[type.toLowerCase()] || type;
}