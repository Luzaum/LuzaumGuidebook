import type { MedicationPresentation } from '../types/medication';

export type PracticalEquivalentResult = {
  success: boolean;
  equivalentValue: number;
  equivalentUnit: string;
  label: string;
  alert?: string;
  failReason?: string;
};

type PracticalEquivalentInput = {
  totalDosePerAdmin: number;
  doseUnit: string;
  presentation: {
    pharmaceutical_form?: string | null;
    value?: number | null;
    value_unit?: string | null;
    per_value?: number | null;
    per_unit?: string | null;
  };
};

const UNIT_CONVERSION: Record<string, number> = {
  'mg|mcg': 1000,
  'mcg|mg': 0.001,
  'g|mg': 1000,
  'mg|g': 0.001,
  'ui|ui': 1,
};

function normalizeUnit(value: string): string {
  const normalized = String(value || '').trim().toLowerCase().replace('µg', 'mcg');
  const canonical = normalized.match(/^(mcg|mg|g|ui)\b/);
  return canonical?.[1] || normalized;
}

function conversionFactor(fromUnit: string, toUnit: string): number | null {
  const from = normalizeUnit(fromUnit);
  const to = normalizeUnit(toUnit);
  if (from === to) return 1;
  return UNIT_CONVERSION[`${from}|${to}`] ?? null;
}

function decimalPtBr(value: number, decimals = 2): string {
  return value.toFixed(decimals).replace('.', ',');
}

function classifyUnit(form: string, perUnit: string): string {
  const normalized = `${form} ${perUnit}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (/comp|tab|drag/.test(normalized)) return 'comprimido';
  if (/caps/.test(normalized)) return 'cápsula';
  if (/ml|solu|susp|gota|liqu|xarope|elixir/.test(normalized)) return 'mL';
  return perUnit || 'unidade';
}

function formatLabel(value: number, unit: string): string {
  if (unit === 'mL') return `${decimalPtBr(value)} mL`;
  if (unit === 'comprimido' || unit === 'cápsula') {
    const rounded = Math.round(value);
    if (Math.abs(value - rounded) < 0.01) return `${rounded} ${unit}${rounded === 1 ? '' : 's'}`;
  }
  return `${decimalPtBr(value)} ${unit}`;
}

export function calculatePracticalEquivalent(input: PracticalEquivalentInput): PracticalEquivalentResult {
  const { totalDosePerAdmin, doseUnit, presentation } = input;
  if (!Number.isFinite(totalDosePerAdmin) || totalDosePerAdmin <= 0 || !doseUnit) {
    return { success: false, equivalentValue: 0, equivalentUnit: '', label: '', failReason: 'Dose ou unidade ausente.' };
  }

  const rawUnit = String(presentation.value_unit || '').trim();
  const slashIndex = rawUnit.indexOf('/');
  const valueUnit = slashIndex > 0 ? rawUnit.slice(0, slashIndex).trim() : rawUnit;
  const inferredPerUnit = slashIndex > 0 ? rawUnit.slice(slashIndex + 1).trim() : '';
  const value = Number(presentation.value);
  const perValue = Number(presentation.per_value);
  const perUnit = String(presentation.per_unit || inferredPerUnit || '').trim();

  if (!Number.isFinite(value) || value <= 0 || !valueUnit) {
    return { success: false, equivalentValue: 0, equivalentUnit: '', label: '', failReason: 'Apresentação sem concentração definida.' };
  }
  if (!Number.isFinite(perValue) || perValue <= 0 || !perUnit) {
    return { success: false, equivalentValue: 0, equivalentUnit: '', label: '', failReason: 'Apresentação sem unidade administrável definida.' };
  }

  const factor = conversionFactor(doseUnit, valueUnit);
  if (factor === null) {
    return { success: false, equivalentValue: 0, equivalentUnit: '', label: '', failReason: `Unidade da dose (${doseUnit}) incompatível com a apresentação (${valueUnit}).` };
  }

  const equivalentValue = (totalDosePerAdmin * factor) / (value / perValue);
  const equivalentUnit = classifyUnit(String(presentation.pharmaceutical_form || ''), perUnit);
  const label = formatLabel(equivalentValue, equivalentUnit);
  const alert = equivalentUnit === 'cápsula' && Math.abs(equivalentValue - Math.round(equivalentValue)) >= 0.01
    ? 'Cápsulas não devem ser fracionadas. Considere manipulação ou outra apresentação.'
    : undefined;

  return { success: true, equivalentValue, equivalentUnit, label, alert };
}

export function toPracticalPresentation(presentation: MedicationPresentation) {
  const rawConcentrationUnit = String(presentation.concentrationUnit || '').trim();
  const slashIndex = rawConcentrationUnit.indexOf('/');
  const denominator = slashIndex >= 0 ? rawConcentrationUnit.slice(slashIndex + 1).trim() : '';
  const denominatorMatch = denominator.match(/^(\d+(?:[.,]\d+)?)?\s*(.*)$/);
  const parsedPerValue = Number(String(denominatorMatch?.[1] || '1').replace(',', '.'));
  const parsedPerUnit = String(denominatorMatch?.[2] || denominator).trim();

  return {
    pharmaceutical_form: presentation.form,
    value: presentation.concentrationValue,
    value_unit: presentation.concentrationUnit,
    per_value: Number.isFinite(parsedPerValue) && parsedPerValue > 0 ? parsedPerValue : 1,
    per_unit: parsedPerUnit || (presentation.form.toLowerCase().includes('comp')
      ? 'comprimido'
      : presentation.form.toLowerCase().includes('caps')
        ? 'cápsula'
        : presentation.form.toLowerCase().includes('gota')
          ? 'gota'
          : 'mL'),
  };
}
