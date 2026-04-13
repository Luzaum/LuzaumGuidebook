import { MedicationDose, MedicationPresentation, MedicationSupplyChannel } from '../types/medication';

const SUPPLY_CHANNELS: MedicationSupplyChannel[] = ['human_pharmacy', 'veterinary', 'compounded'];
import { calculatePracticalEquivalent } from '../../receituario-vet/rxUiHelpers';

const DOSE_SPECIES_LABELS = {
  dog: 'Cão',
  cat: 'Gato',
  both: 'Cão e gato',
} as const;

export type MedicationDoseSpecies = keyof typeof DOSE_SPECIES_LABELS;

export function formatDoseSpeciesLabel(species: MedicationDoseSpecies): string {
  return DOSE_SPECIES_LABELS[species] || 'Espécie não informada';
}

export function buildDoseSummaryLabel(dose: MedicationDose): string {
  const range = dose.doseMax && dose.doseMax !== dose.doseMin
    ? `${dose.doseMin} a ${dose.doseMax}`
    : `${dose.doseMin}`;

  const segments = [
    formatDoseSpeciesLabel(dose.species),
    dose.indication,
    `${range} ${dose.doseUnit}/${dose.perWeightUnit}`,
    dose.route,
    dose.frequency,
  ].map((value) => String(value || '').trim()).filter(Boolean);

  return segments.join(' • ');
}

export function isValidDoseSpecies(value: unknown): value is MedicationDoseSpecies {
  return value === 'dog' || value === 'cat' || value === 'both';
}

function includesMaintenancePattern(value: string): boolean {
  return /(q\d+h|sid|bid|tid|qid|manutenc|maintenance|cont[ií]nu)/i.test(value);
}

function includesSingleDosePattern(value: string): boolean {
  return /(dose\s*[úu]nica|dose\s*unica|pr[eé]-?operat|pr[eé]\s*transporte|90\s*min|1\s*h(?:ora)?\s*antes)/i.test(value);
}

function hasAggregatedPresentationPattern(label: string): boolean {
  const matches = label.match(/\d+(?:[.,]\d+)?\s*mg/gi) || [];
  return matches.length >= 3;
}

export function validateMedicationDoses(
  doses: MedicationDose[],
  medicationSpecies: Array<'dog' | 'cat'>
): string[] {
  const errors: string[] = [];

  doses.forEach((dose, index) => {
    const prefix = `Dose ${index + 1}`;
    if (!isValidDoseSpecies(dose.species)) {
      errors.push(`${prefix}: species deve ser dog, cat ou both.`);
    }
    if (!String(dose.indication || '').trim()) {
      errors.push(`${prefix}: indication é obrigatória.`);
    }
    if (!Number.isFinite(dose.doseMin) || dose.doseMin <= 0) {
      errors.push(`${prefix}: doseMin deve ser maior que zero.`);
    }
    if (dose.doseMax !== undefined && dose.doseMax < dose.doseMin) {
      errors.push(`${prefix}: doseMax não pode ser menor que doseMin.`);
    }
    if (!String(dose.route || '').trim()) {
      errors.push(`${prefix}: route é obrigatória.`);
    }
    if (!String(dose.frequency || '').trim()) {
      errors.push(`${prefix}: frequency é obrigatória.`);
    }

    const speciesConflicts =
      dose.species !== 'both' && !medicationSpecies.includes(dose.species);
    if (speciesConflicts) {
      errors.push(`${prefix}: a espécie da dose não está habilitada no medicamento.`);
    }

    const notes = String(dose.notes || '').trim();
    const frequency = String(dose.frequency || '').trim();
    const mergedRegime =
      includesSingleDosePattern(notes) && includesMaintenancePattern(frequency);

    if (mergedRegime || /;|\bdepois\b/i.test(frequency)) {
      errors.push(`${prefix}: separe dose única/pré-operatória e regime de manutenção em entradas distintas.`);
    }
  });

  return errors;
}

export function validateMedicationPresentations(presentations: MedicationPresentation[]): string[] {
  const errors: string[] = [];
  const seenIds = new Set<string>();

  presentations.forEach((presentation, index) => {
    const prefix = `Apresentação ${index + 1}`;
    const label = String(presentation.label || '').trim();
    const form = String(presentation.form || '').trim();

    if (!label) {
      errors.push(`${prefix}: label é obrigatório.`);
    }
    if (!form) {
      errors.push(`${prefix}: form é obrigatório.`);
    }
    if (!String(presentation.id || '').trim()) {
      errors.push(`${prefix}: id é obrigatório.`);
    } else if (seenIds.has(presentation.id)) {
      errors.push(`${prefix}: id duplicado (${presentation.id}).`);
    } else {
      seenIds.add(presentation.id);
    }

    if (label && hasAggregatedPresentationPattern(label)) {
      errors.push(`${prefix}: registre apresentações calculáveis em entradas individuais, não em lista agregada.`);
    }

    if (
      presentation.channel !== undefined &&
      presentation.channel !== null &&
      String(presentation.channel).trim() !== '' &&
      !SUPPLY_CHANNELS.includes(presentation.channel as MedicationSupplyChannel)
    ) {
      errors.push(`${prefix}: canal inválido (use human_pharmacy, veterinary ou compounded).`);
    }
  });

  return errors;
}

function normalizePresentationForm(form: string): string {
  return String(form || '').trim().toLowerCase();
}

function parseMgValueFromLabel(label: string): number | null {
  const match = String(label || '').match(/(\d+(?:[.,]\d+)?)\s*mg/i);
  if (!match) return null;
  const value = Number(match[1].replace(',', '.'));
  return Number.isFinite(value) && value > 0 ? value : null;
}

function resolveMgPerUnit(presentation: MedicationPresentation): number | null {
  if (
    Number.isFinite(presentation.concentrationValue) &&
    String(presentation.concentrationUnit || '').trim() &&
    !/mg\s*\/\s*m[lL]/i.test(String(presentation.concentrationUnit))
  ) {
    const value = Number(presentation.concentrationValue);
    return Number.isFinite(value) && value > 0 ? value : null;
  }

  return parseMgValueFromLabel(presentation.label);
}

function resolveTabletFractionStep(scoringInfo: string | undefined): number | null {
  const normalized = String(scoringInfo || '').toLowerCase();
  if (!normalized || /sem sulco/.test(normalized)) return 1;
  if (/1\/8|oitav/.test(normalized)) return 0.125;
  if (/1\/4|quart/.test(normalized)) return 0.25;
  if (/1\/2|meio|bissul|sulcad/.test(normalized)) return 0.5;
  return 1;
}

export type DoseConversionKind = 'mg-only' | 'ml' | 'capsules' | 'tablets';

export type DoseConversionResult = {
  kind: DoseConversionKind;
  unitLabel: string;
  exactMin?: number;
  exactMax?: number;
  exactSingle?: number;
  safeMin?: number;
  safeMax?: number;
  safeSingle?: number;
  warning?: string;
  note?: string;
};

export function resolvePresentationConversion(
  presentation: MedicationPresentation | undefined,
  doseMinMg: number | undefined,
  doseMaxMg: number | undefined,
  doseSingleMg: number | undefined
): DoseConversionResult | null {
  if (!presentation) return null;

  // Map to the internal helper format
  const mappedPresentation = {
    pharmaceutical_form: presentation.form,
    value: presentation.concentrationValue,
    value_unit: presentation.concentrationUnit,
    // Note: older presentations might not have per_value, use 1 as default
    per_value: 1, 
    per_unit: presentation.form.toLowerCase().includes('comp') ? 'comprimido' : presentation.form.toLowerCase().includes('caps') ? 'cápsula' : 'mL'
  };

  // If we have concentration like "20 mg / 5 mL", the old schema might have concentrationValue=20.
  // But actually the helper handles this if we provide the right mappings.
  // For safety, if it's already "mg/mL", we treat it as per_value=1.
  
  const callHelper = (val: number | undefined) => {
    if (val === undefined) return null;
    return calculatePracticalEquivalent({
      presentation: mappedPresentation as any,
      totalDosePerAdmin: val,
      doseUnit: 'mg'
    });
  };

  const resMin = callHelper(doseMinMg);
  const resMax = callHelper(doseMaxMg);
  const resSingle = callHelper(doseSingleMg);

  const mainRes = resSingle || resMin || resMax;
  if (!mainRes || !mainRes.success) {
    return {
      kind: 'mg-only',
      unitLabel: 'mg',
      warning: mainRes?.failReason || 'Não foi possível converter com segurança.',
    };
  }

  const kindMap: Record<string, DoseConversionKind> = {
    'comprimido': 'tablets',
    'cápsula': 'capsules',
    'mL': 'ml'
  };

  return {
    kind: kindMap[mainRes.equivalentUnit] || 'mg-only',
    unitLabel: mainRes.equivalentUnit === 'comprimido' ? 'comp.' : mainRes.equivalentUnit === 'cápsula' ? 'cáps.' : mainRes.equivalentUnit,
    exactMin: resMin?.equivalentValue,
    exactMax: resMax?.equivalentValue,
    exactSingle: resSingle?.equivalentValue,
    // Note: The new helper doesn't provide a numeric "safe" value separate from "equivalentValue" anymore,
    // because it handles labels like "1/4". But the UI expects numbers for conversionLabel.min/max/single.
    // For tablets, if it's a fraction label, we don't have a numeric "safe" value easily.
    // However, for the calculator UI, we can use the numeric equivalentValue.
    safeMin: resMin?.equivalentValue,
    safeMax: resMax?.equivalentValue,
    safeSingle: resSingle?.equivalentValue,
    warning: mainRes.alert,
    note: mainRes.label
  };
}
