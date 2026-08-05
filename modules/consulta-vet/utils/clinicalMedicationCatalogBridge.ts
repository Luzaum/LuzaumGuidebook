import { commercialOticProductsSeed } from '../data/commercialOticProducts.seed';
import { medicationsSeed } from '../data/seed/medications.seed';
import type { CommercialMedicationProduct } from '../types/commercialMedication';
import type { MedicationDose, MedicationPresentation, MedicationRecord } from '../types/medication';
import type {
  ClinicalMedicationDefinition,
  ClinicalMedicationDose,
  ClinicalMedicationOverride,
  PrescriptionSpecies,
} from '../types/receituario';
import type { MedicationPresentationRecord, RecommendedDose } from '../../../src/lib/clinicRecords';
import { makeGlobalMedicationId } from '../../../src/lib/medicationCatalog';
import {
  calculateReceituarioDose,
  formatDecimalPtBr,
  isSpeciesCompatible,
  type DoseCalculationResult,
} from './receituarioDoseEngine';
import {
  formatPrescriptionFrequency,
  formatPrescriptionRoute,
  normalizePrescriptionSpecies,
  parsePositiveDecimal,
} from './receituarioMedication';
import { CLINICAL_DOSE_LABEL } from './receituarioTemplateCalculator';

export type ClinicalMedicationSourceKind = 'editorial' | 'commercial' | 'manual';

export interface ResolvedClinicalMedicationSource {
  kind: ClinicalMedicationSourceKind;
  editorialMedication?: MedicationRecord;
  commercialProducts?: CommercialMedicationProduct[];
}

function normalizeText(value: unknown): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function durationClause(value: string): string {
  const normalized = normalizeText(value);
  if (!value.trim()) return '';
  if (normalized.includes('uso continuo')) return ', em uso contínuo';
  if (normalized.includes('reavaliacao')) return ', até reavaliação clínica';
  if (/administrac/.test(normalized)) return `, por ${value.trim()}`;
  return `, durante ${value.trim()}`;
}

function presentationLabel(item: MedicationPresentationRecord): string {
  return [item.commercial_name, item.pharmaceutical_form, item.concentration_text, item.package_quantity && item.package_unit ? `${item.package_quantity} ${item.package_unit}` : '']
    .filter(Boolean)
    .join(' — ');
}

export function resolveEditorialMedication(canonicalMedicationId?: string | null): MedicationRecord | null {
  if (!canonicalMedicationId) return null;
  return medicationsSeed.find((item) => item.id === canonicalMedicationId) || null;
}

export function resolveClinicalMedicationSource(medication: ClinicalMedicationDefinition): ResolvedClinicalMedicationSource {
  const editorialMedication = resolveEditorialMedication(medication.canonicalMedicationId);
  if (editorialMedication) {
    return { kind: 'editorial', editorialMedication };
  }
  const commercialProducts = getCommercialProductsByIds(medication.presentationIds || []);
  if (commercialProducts.length) {
    return { kind: 'commercial', commercialProducts };
  }
  return { kind: 'manual' };
}

function resolveClinicalMedicationDefinition(
  medication: ClinicalMedicationDefinition,
  doseAlternativeKey?: string,
): ClinicalMedicationDefinition {
  const alternative = medication.doseAlternatives?.find((item) => item.key === doseAlternativeKey)
    || medication.doseAlternatives?.[0];
  if (!alternative) return medication;
  return { ...medication, dose: alternative.dose, prescriptionText: alternative.prescriptionText };
}

export interface ClinicalMedicationCatalogStatus {
  editable: boolean;
  needsRegistration: boolean;
  medicationName: string;
  lookupName: string;
  editorialSlug?: string | null;
  reason?: string;
  registrationTargets: Array<'medicamentos' | 'comerciais'>;
}

export function evaluateClinicalMedicationCatalogStatus(
  medication: ClinicalMedicationDefinition,
  speciesValue?: string,
  doseAlternativeKey?: string,
): ClinicalMedicationCatalogStatus {
  const resolved = resolveClinicalMedicationDefinition(medication, doseAlternativeKey);
  const base = {
    medicationName: resolved.name,
    lookupName: resolved.canonicalLookupName || resolved.name,
    editorialSlug: null as string | null,
    registrationTargets: [] as Array<'medicamentos' | 'comerciais'>,
  };

  if (resolved.canonicalMedicationId && !resolveEditorialMedication(resolved.canonicalMedicationId)) {
    return {
      ...base,
      editable: false,
      needsRegistration: true,
      reason: `O modelo referencia a monografia "${resolved.canonicalMedicationId}", mas ela não está cadastrada no ConsultaVet.`,
      registrationTargets: ['medicamentos'],
    };
  }

  const source = resolveClinicalMedicationSource(resolved);

  if (source.kind === 'editorial' && source.editorialMedication) {
    const editorialSlug = source.editorialMedication.slug;
    const species = normalizePrescriptionSpecies(speciesValue);
    const presentations = getEditorialPresentations(source.editorialMedication, resolved);
    const doses = species ? getEditorialRecommendedDoses(source.editorialMedication, resolved, species) : [];

    if (!presentations.length) {
      return {
        ...base,
        editorialSlug,
        editable: false,
        needsRegistration: true,
        reason: 'Monografia encontrada, mas sem apresentação compatível com este protocolo (via/filtro do modelo).',
        registrationTargets: ['medicamentos'],
      };
    }
    if (resolved.dose.basis !== 'manual' && species && !doses.length) {
      return {
        ...base,
        editorialSlug,
        editable: false,
        needsRegistration: true,
        reason: `Monografia encontrada, mas sem dose cadastrada para ${species === 'dog' ? 'cão' : 'gato'}.`,
        registrationTargets: ['medicamentos'],
      };
    }
    if (!species) {
      return {
        ...base,
        editorialSlug,
        editable: false,
        needsRegistration: false,
        reason: 'Informe a espécie do paciente para habilitar apresentações e doses.',
        registrationTargets: [],
      };
    }
    return {
      ...base,
      editorialSlug,
      editable: true,
      needsRegistration: false,
      registrationTargets: ['medicamentos'],
    };
  }

  if (source.kind === 'commercial' && source.commercialProducts?.length) {
    return {
      ...base,
      editable: true,
      needsRegistration: false,
      registrationTargets: ['comerciais'],
    };
  }

  if ((resolved.presentationIds || []).length && !getCommercialProductsByIds(resolved.presentationIds || []).length) {
    return {
      ...base,
      editable: false,
      needsRegistration: true,
      reason: 'Os produtos comerciais referenciados pelo modelo não foram encontrados no catálogo.',
      registrationTargets: ['comerciais'],
    };
  }

  if (resolved.dose.basis === 'manual') {
    return {
      ...base,
      editable: false,
      needsRegistration: true,
      reason: 'Sem monografia ou produto comercial vinculado. Cadastre no ConsultaVet para habilitar apresentações e doses, ou edite o texto manualmente na receita.',
      registrationTargets: ['medicamentos', 'comerciais'],
    };
  }

  return {
    ...base,
    editable: false,
    needsRegistration: true,
    reason: `"${resolved.name}" não está no Consulta Medicamentos nem no catálogo comercial. Cadastre a monografia (apresentações e doses) ou vincule produtos comerciais ao modelo.`,
    registrationTargets: ['medicamentos', 'comerciais'],
  };
}

export function listClinicalMedicationsNeedingRegistration(
  medications: ClinicalMedicationDefinition[],
  speciesValue?: string,
  doseAlternativeKeys: Record<string, string> = {},
): ClinicalMedicationCatalogStatus[] {
  return medications
    .map((medication) => evaluateClinicalMedicationCatalogStatus(
      medication,
      speciesValue,
      doseAlternativeKeys[medication.key],
    ))
    .filter((status) => status.needsRegistration);
}

export function getCommercialProductsByIds(ids: string[]): CommercialMedicationProduct[] {
  if (!ids.length) return [];
  const lookup = new Set(ids);
  return commercialOticProductsSeed.filter((product) => lookup.has(product.id));
}

function matchesPresentationFilter(presentation: MedicationPresentation, filter?: ClinicalMedicationDefinition['presentationFilter']): boolean {
  if (!filter || filter === 'none') return true;
  const haystack = normalizeText(`${presentation.form} ${presentation.label}`);
  if (filter === 'oral') return /comp|capsul|oral|solucao oral|suspensao oral|comprimido/.test(haystack);
  if (filter === 'injectable') return /inj|injet|solucao injetavel|ampola|frasco ampola/.test(haystack);
  if (filter === 'immediate_release') return !/retard|liberacao prolongada|modified|depot/.test(haystack);
  return true;
}

function mapPresentationOption(
  medication: MedicationRecord,
  presentation: MedicationPresentation,
  option?: NonNullable<MedicationPresentation['concentrationOptions']>[number],
): MedicationPresentationRecord {
  const globalMedicationId = makeGlobalMedicationId(medication.slug);
  const concentrationValue = option?.concentrationValue ?? presentation.concentrationValue ?? null;
  const concentrationUnit = option?.concentrationUnit ?? presentation.concentrationUnit ?? null;
  const perUnit = concentrationUnit?.includes('/') ? concentrationUnit.split('/').slice(1).join('/') : null;
  const valueUnit = concentrationUnit?.includes('/') ? concentrationUnit.split('/')[0] : concentrationUnit;
  return {
    id: option ? `${presentation.id}:${option.id}` : presentation.id,
    clinic_id: '',
    medication_id: globalMedicationId,
    pharmaceutical_form: presentation.form || null,
    concentration_text: option?.label || presentation.label,
    commercial_name: presentation.label.split('—')[0]?.trim() || medication.title,
    value: concentrationValue,
    value_unit: concentrationUnit || null,
    per_value: 1,
    per_unit: perUnit,
    metadata: {
      seed_presentation_id: presentation.id,
      seed_concentration_id: option?.id || null,
    },
  };
}

export function getEditorialPresentations(
  medication: MedicationRecord,
  medicationDefinition: ClinicalMedicationDefinition,
): MedicationPresentationRecord[] {
  const allowedIds = medicationDefinition.presentationIds || [];
  return (medication.presentations || []).flatMap((presentation) => {
    if (allowedIds.length && !allowedIds.includes(presentation.id)) return [];
    if (!matchesPresentationFilter(presentation, medicationDefinition.presentationFilter)) return [];
    if (presentation.concentrationOptions?.length) {
      return presentation.concentrationOptions.map((option) => mapPresentationOption(medication, presentation, option));
    }
    return [mapPresentationOption(medication, presentation)];
  });
}

export function mapEditorialDoseToRecommended(dose: MedicationDose, medication: MedicationRecord): RecommendedDose {
  const doseUnit = dose.perWeightUnit ? `${dose.doseUnit}/${dose.perWeightUnit}` : dose.doseUnit;
  return {
    id: dose.id,
    medication_id: makeGlobalMedicationId(medication.slug),
    species: dose.species === 'dog' ? 'cão' : dose.species === 'cat' ? 'gato' : 'ambos',
    route: dose.route,
    dose_value: dose.doseMin,
    dose_max: dose.doseMax ?? null,
    dose_unit: doseUnit,
    per_weight_unit: dose.perWeightUnit || 'kg',
    indication: dose.indication,
    frequency: formatPrescriptionFrequency(dose.frequency),
    frequency_text: formatPrescriptionFrequency(dose.frequency),
    duration: dose.duration || null,
    calculator_default_dose: dose.doseMin,
    metadata: {
      presentation_id: dose.presentationId || null,
      presentation_concentration_id: dose.presentationConcentrationId || null,
    },
    source_type: 'plumbs',
    source_label: 'ConsultaVet / monografia',
  };
}

function routeMatchesFilter(route: string, filter?: ClinicalMedicationDefinition['presentationFilter']): boolean {
  const normalized = normalizeText(route);
  if (!filter || filter === 'none') return true;
  if (filter === 'oral') return /vo|oral|po/.test(normalized);
  if (filter === 'injectable') return /sc|iv|im|inj|subcut|intraven|intramusc/.test(normalized);
  return true;
}

export function getEditorialRecommendedDoses(
  medication: MedicationRecord,
  medicationDefinition: ClinicalMedicationDefinition,
  species: PrescriptionSpecies | null,
): RecommendedDose[] {
  const linkedIds = medicationDefinition.linkedDoseIds || [];
  return (medication.doses || [])
    .filter((dose) => !species || isSpeciesCompatible(dose.species === 'dog' ? 'cão' : dose.species === 'cat' ? 'gato' : 'ambos', species))
    .filter((dose) => !linkedIds.length || linkedIds.includes(dose.id))
    .filter((dose) => routeMatchesFilter(dose.route, medicationDefinition.presentationFilter))
    .map((dose) => mapEditorialDoseToRecommended(dose, medication));
}

export function formatClinicalModelDoseRange(dose: ClinicalMedicationDose): string {
  if (dose.basis === 'manual') return 'conforme orientação do fabricante';
  const unit = dose.unit.replace('/animal', '');
  if (dose.max != null && dose.max !== dose.min) {
    return `${formatDecimalPtBr(dose.min)} a ${formatDecimalPtBr(dose.max)} ${unit}`;
  }
  return `${formatDecimalPtBr(dose.min)} ${unit}`;
}

export function formatCatalogDoseRange(dose: RecommendedDose): string {
  const unit = dose.dose_unit || 'mg/kg';
  if (dose.dose_max != null && dose.dose_max !== dose.dose_value) {
    return `${formatDecimalPtBr(dose.dose_value)} a ${formatDecimalPtBr(dose.dose_max)} ${unit}`;
  }
  return `${formatDecimalPtBr(dose.dose_value)} ${unit}`;
}

function findEditorialPresentation(
  medication: MedicationRecord,
  medicationDefinition: ClinicalMedicationDefinition,
  presentationId?: string | null,
): MedicationPresentationRecord | null {
  if (!presentationId) return null;
  return getEditorialPresentations(medication, medicationDefinition).find((item) => item.id === presentationId) || null;
}

function findEditorialDose(
  medication: MedicationRecord,
  medicationDefinition: ClinicalMedicationDefinition,
  species: PrescriptionSpecies | null,
  doseId?: string | null,
): RecommendedDose | null {
  if (!doseId) return null;
  return getEditorialRecommendedDoses(medication, medicationDefinition, species).find((item) => item.id === doseId) || null;
}

function pickDefaultEditorialPresentation(
  medication: MedicationRecord,
  medicationDefinition: ClinicalMedicationDefinition,
  dose?: RecommendedDose | null,
): MedicationPresentationRecord | null {
  const presentations = getEditorialPresentations(medication, medicationDefinition);
  if (!presentations.length) return null;
  const presentationId = String(dose?.metadata?.presentation_id || '');
  const concentrationId = String(dose?.metadata?.presentation_concentration_id || '');
  if (presentationId && concentrationId) {
    const match = presentations.find((item) => item.id === `${presentationId}:${concentrationId}`);
    if (match) return match;
  }
  if (presentationId) {
    const match = presentations.find((item) => item.id === presentationId || item.metadata?.seed_presentation_id === presentationId);
    if (match) return match;
  }
  return presentations[0] || null;
}

function pickDefaultEditorialDose(
  medication: MedicationRecord,
  medicationDefinition: ClinicalMedicationDefinition,
  species: PrescriptionSpecies | null,
  modelDose: ClinicalMedicationDose,
): RecommendedDose | null {
  const doses = getEditorialRecommendedDoses(medication, medicationDefinition, species);
  if (!doses.length) return null;
  const exact = doses.find((item) => item.dose_value === modelDose.min && (item.dose_max ?? item.dose_value) === (modelDose.max ?? modelDose.min));
  return exact || doses[0];
}

export function buildDefaultClinicalMedicationOverride(
  medication: ClinicalMedicationDefinition,
  speciesValue?: string,
  doseAlternativeKey?: string,
): ClinicalMedicationOverride {
  const resolved = resolveClinicalMedicationDefinition(medication, doseAlternativeKey);
  const species = normalizePrescriptionSpecies(speciesValue);
  const source = resolveClinicalMedicationSource(resolved);
  const selectedDoseValue = resolved.dose.basis === 'manual' ? null : resolved.dose.min;
  if (source.kind === 'editorial' && source.editorialMedication) {
    const dose = pickDefaultEditorialDose(source.editorialMedication, resolved, species, resolved.dose);
    const presentation = pickDefaultEditorialPresentation(source.editorialMedication, resolved, dose);
    return {
      editorialMedicationId: source.editorialMedication.id,
      presentationId: presentation?.id || null,
      doseId: dose?.id || null,
      selectedDoseValue,
    };
  }
  if (source.kind === 'commercial' && source.commercialProducts?.length) {
    return {
      commercialProductId: source.commercialProducts[0].id,
      selectedDoseValue,
    };
  }
  return { selectedDoseValue };
}

export function buildClinicalMedicationOverridesMap(
  medications: ClinicalMedicationDefinition[],
  speciesValue?: string,
  doseAlternativeKeys: Record<string, string> = {},
  existing: Record<string, ClinicalMedicationOverride> = {},
): Record<string, ClinicalMedicationOverride> {
  const next = { ...existing };
  for (const medication of medications) {
    if (!next[medication.key]) {
      next[medication.key] = buildDefaultClinicalMedicationOverride(
        medication,
        speciesValue,
        doseAlternativeKeys[medication.key],
      );
    }
  }
  for (const key of Object.keys(next)) {
    if (!medications.some((item) => item.key === key)) delete next[key];
  }
  return next;
}

function buildClinicalAdministrationAmount(
  dose: ClinicalMedicationDose,
  doseValue: number,
  weightKg: number | null,
  product?: CommercialMedicationProduct,
): string {
  if (dose.basis === 'manual') return 'conforme orientação do fabricante';
  if (dose.basis === 'per_animal') {
    const unit = dose.unit.replace('/animal', '') || 'UI';
    if (dose.max != null && dose.max !== dose.min) {
      return `${formatDecimalPtBr(dose.min)} a ${formatDecimalPtBr(dose.max)} ${unit}`;
    }
    return `${formatDecimalPtBr(doseValue)} ${unit}`;
  }
  if (!weightKg || weightKg <= 0) return 'A PREENCHER';
  if (dose.unit === 'UI/kg' || dose.unit.startsWith('UI')) {
    return `${formatDecimalPtBr(doseValue * weightKg)} UI`;
  }
  if (product) return buildCommercialAdministrationAmount(product, doseValue, weightKg);
  return `${formatDecimalPtBr(doseValue * weightKg)} mg`;
}

function parseLiquidConcentrationMgPerMl(product: CommercialMedicationProduct): number | null {
  const text = [product.labelCompositionSummary, ...product.presentations].join(' ');
  const match = text.match(/(\d+(?:[.,]\d+)?)\s*mg\s*\/\s*mL/i);
  return match ? Number(match[1].replace(',', '.')) : null;
}

function parseTabletMg(text: string): number | null {
  const match = text.match(/(\d+(?:[.,]\d+)?)\s*mg\b/i);
  return match ? Number(match[1].replace(',', '.')) : null;
}

export const DOSE_ERROR_AMOUNT_LABEL = 'ERRO DE DOSE P/ CONCENTRAÇÃO';
export const DOSE_ERROR_REASON_PREFIX = 'Erro de dose:';
export const CRITICAL_OVERDOSE_TOLERANCE_PERCENT = 25;

export type ClinicalDoseAlertSeverity = 'overdose' | 'underdose';

export interface ClinicalDoseAlert {
  severity: ClinicalDoseAlertSeverity;
  message: string;
  critical?: boolean;
}

const DOSE_ROUNDING_TOLERANCE_PERCENT = 10;

function isCriticalOverdosePercent(percentDifference: number): boolean {
  return percentDifference > CRITICAL_OVERDOSE_TOLERANCE_PERCENT;
}

function withCriticalFlag(alert: ClinicalDoseAlert, percentDifference?: number): ClinicalDoseAlert {
  if (alert.severity !== 'overdose') return alert;
  const critical = alert.critical
    || (percentDifference != null && isCriticalOverdosePercent(percentDifference));
  return critical ? { ...alert, critical: true } : alert;
}

function buildClinicalDoseSupportLine(
  selectedDoseValue: number | null,
  doseUnit: string,
  calculation?: DoseCalculationResult | null,
  manualLabel?: string,
): string {
  if (manualLabel) return `${CLINICAL_DOSE_LABEL} ${manualLabel}`;
  if (selectedDoseValue == null) return `${CLINICAL_DOSE_LABEL} A PREENCHER`;
  const unit = doseUnit || 'mg/kg';
  if (calculation?.practicalAmount != null && calculation.administrationUnit) {
    const amount = `${formatDecimalPtBr(calculation.practicalAmount)} ${calculation.administrationUnit}${calculation.practicalAmount > 1 ? 's' : ''}`;
    return `${CLINICAL_DOSE_LABEL} ${amount} (${formatDecimalPtBr(selectedDoseValue)} ${unit})`;
  }
  return `${CLINICAL_DOSE_LABEL} ${formatDecimalPtBr(selectedDoseValue)} ${unit}`;
}

export function evaluateEditorialDoseAlert(
  calculation: DoseCalculationResult | null | undefined,
  selectedDoseValue: number | null | undefined,
  dose?: RecommendedDose | null,
): ClinicalDoseAlert | null {
  if (calculation?.percentDifference != null && Math.abs(calculation.percentDifference) > DOSE_ROUNDING_TOLERANCE_PERCENT) {
    const diff = Math.abs(calculation.percentDifference).toFixed(1).replace('.', ',');
    if (calculation.percentDifference > 0) {
      return withCriticalFlag({
        severity: 'overdose',
        message: `A apresentação escolhida exige ${diff}% a mais de princípio ativo do que a dose calculada — risco de sobredose.`,
      }, calculation.percentDifference);
    }
    return {
      severity: 'underdose',
      message: `A apresentação escolhida entrega ${diff}% a menos de princípio ativo do que a dose calculada — risco de subdose.`,
    };
  }
  if (selectedDoseValue != null && dose) {
    const maximum = dose.dose_max ?? dose.dose_value;
    if (selectedDoseValue > maximum) {
      const percentAbove = ((selectedDoseValue - maximum) / maximum) * 100;
      return withCriticalFlag({
        severity: 'overdose',
        message: `Dose escolhida acima da faixa ConsultaVet (${formatCatalogDoseRange(dose)}).`,
      }, percentAbove);
    }
    if (selectedDoseValue < dose.dose_value) {
      return {
        severity: 'underdose',
        message: `Dose escolhida abaixo da faixa ConsultaVet (${formatCatalogDoseRange(dose)}).`,
      };
    }
  }
  return null;
}

function roundTabletUnits(units: number): number {
  return Math.round(units * 4) / 4;
}

export function evaluateCommercialDoseAlert(
  product: CommercialMedicationProduct,
  doseMgKg: number,
  weightKg: number | null,
): ClinicalDoseAlert | null {
  if (!weightKg || weightKg <= 0 || doseMgKg <= 0) return null;
  const targetMg = doseMgKg * weightKg;
  const liquid = parseLiquidConcentrationMgPerMl(product);
  if (liquid) {
    const exactMl = targetMg / liquid;
    const practicalMl = Math.round(exactMl * 100) / 100;
    const actualMg = practicalMl * liquid;
    const percentDifference = ((actualMg - targetMg) / targetMg) * 100;
    if (Math.abs(percentDifference) <= DOSE_ROUNDING_TOLERANCE_PERCENT) return null;
    const diff = Math.abs(percentDifference).toFixed(1).replace('.', ',');
    return percentDifference > 0
      ? withCriticalFlag({ severity: 'overdose', message: `O volume prático (${formatDecimalPtBr(practicalMl)} mL) supera a dose calculada em ${diff}%.` }, percentDifference)
      : { severity: 'underdose', message: `O volume prático (${formatDecimalPtBr(practicalMl)} mL) fica ${diff}% abaixo da dose calculada.` };
  }
  const tabletMg = parseTabletMg(product.presentations.join(' '));
  if (tabletMg) {
    const exactUnits = targetMg / tabletMg;
    const practicalUnits = roundTabletUnits(exactUnits);
    const actualMg = practicalUnits * tabletMg;
    const percentDifference = ((actualMg - targetMg) / targetMg) * 100;
    if (Math.abs(percentDifference) <= DOSE_ROUNDING_TOLERANCE_PERCENT) return null;
    const diff = Math.abs(percentDifference).toFixed(1).replace('.', ',');
    return percentDifference > 0
      ? withCriticalFlag({ severity: 'overdose', message: `A fração/comprimido disponível (${formatDecimalPtBr(practicalUnits)}) entrega ${diff}% a mais do que a dose calculada.` }, percentDifference)
      : { severity: 'underdose', message: `A fração/comprimido disponível (${formatDecimalPtBr(practicalUnits)}) entrega ${diff}% a menos do que a dose calculada.` };
  }
  return null;
}

export function resolveClinicalMedicationDoseAlert(
  medication: ClinicalMedicationDefinition,
  override: ClinicalMedicationOverride | undefined,
  weightKg: number | null,
  speciesValue?: string,
  doseAlternativeKey?: string,
): ClinicalDoseAlert | null {
  if (!override) return null;
  const resolved = resolveClinicalMedicationDefinition(medication, doseAlternativeKey);
  const species = normalizePrescriptionSpecies(speciesValue);
  const parsedWeight = parsePositiveDecimal(weightKg);
  const source = resolveClinicalMedicationSource(resolved);

  if (source.kind === 'editorial' && source.editorialMedication && species) {
    const editorialMedication = source.editorialMedication;
    const dose = findEditorialDose(editorialMedication, resolved, species, override.doseId)
      || pickDefaultEditorialDose(editorialMedication, resolved, species, resolved.dose);
    const presentation = findEditorialPresentation(editorialMedication, resolved, override.presentationId)
      || pickDefaultEditorialPresentation(editorialMedication, resolved, dose);
    if (!dose || !presentation) return null;
    const selectedDoseValue = override.selectedDoseValue ?? dose.dose_value;
    const calculation = calculateReceituarioDose({
      species,
      weightKg: parsedWeight,
      dose,
      selectedDoseValue,
      presentation,
    });
    return evaluateEditorialDoseAlert(calculation, selectedDoseValue, dose);
  }

  if (source.kind === 'commercial' && source.commercialProducts?.length && resolved.dose.basis !== 'manual') {
    if (resolved.dose.unit === 'UI/kg' || resolved.dose.unit === 'UI/animal' || resolved.dose.basis === 'per_animal') {
      return null;
    }
    const product = source.commercialProducts.find((item) => item.id === override.commercialProductId)
      || source.commercialProducts[0];
    const doseMgKg = override.selectedDoseValue ?? resolved.dose.min;
    return evaluateCommercialDoseAlert(product, doseMgKg, parsedWeight);
  }

  return null;
}

function buildAdministrationLine(
  amount: string,
  route: string,
  frequency: string,
  duration: string,
  alert: ClinicalDoseAlert | null,
): string[] {
  const administrationAmount = alert?.critical && alert.severity === 'overdose'
    ? DOSE_ERROR_AMOUNT_LABEL
    : amount;
  const lines = [`Administrar ${administrationAmount}, ${route}${frequency ? `, ${frequency}` : ''}${durationClause(duration)}.`];
  if (alert?.critical && alert.severity === 'overdose') {
    lines.push(`${DOSE_ERROR_REASON_PREFIX} ${alert.message}`);
  }
  return lines;
}

function buildCommercialAdministrationAmount(
  product: CommercialMedicationProduct,
  doseMgKg: number,
  weightKg: number | null,
): string {
  if (!weightKg || weightKg <= 0) return 'A PREENCHER';
  const totalMg = doseMgKg * weightKg;
  const liquid = parseLiquidConcentrationMgPerMl(product);
  if (liquid) {
    return `${formatDecimalPtBr(totalMg / liquid)} mL`;
  }
  const tabletMg = parseTabletMg(product.presentations.join(' '));
  if (tabletMg) {
    const units = roundTabletUnits(totalMg / tabletMg);
    return `${formatDecimalPtBr(units)} comprimido${units === 1 ? '' : 's'}`;
  }
  return `${formatDecimalPtBr(totalMg)} mg`;
}

export function buildClinicalMedicationPrescriptionBlock(
  medication: ClinicalMedicationDefinition,
  override: ClinicalMedicationOverride | undefined,
  weightKg: number | null,
  speciesValue?: string,
  index = 1,
  doseAlternativeKey?: string,
): string | null {
  if (!override) return null;
  const resolved = resolveClinicalMedicationDefinition(medication, doseAlternativeKey);
  const species = normalizePrescriptionSpecies(speciesValue);
  const source = resolveClinicalMedicationSource(resolved);

  if (source.kind === 'editorial' && source.editorialMedication && species) {
    const editorialMedication = source.editorialMedication;
    const dose = findEditorialDose(editorialMedication, resolved, species, override.doseId)
      || pickDefaultEditorialDose(editorialMedication, resolved, species, resolved.dose);
    const presentation = findEditorialPresentation(editorialMedication, resolved, override.presentationId)
      || pickDefaultEditorialPresentation(editorialMedication, resolved, dose);
    if (!dose || !presentation) return null;

    const selectedDoseValue = override.selectedDoseValue ?? dose.dose_value;
    const calculation = calculateReceituarioDose({
      species,
      weightKg: parsePositiveDecimal(weightKg),
      dose,
      selectedDoseValue,
      presentation,
    });
    const frequency = resolved.dose.frequency || dose.frequency_text || dose.frequency || '';
    const duration = resolved.dose.duration || dose.duration || '';
    const route = formatPrescriptionRoute(resolved.dose.route || dose.route || '');
    const amount = calculation && !calculation.blockedReason
      ? (calculation.practicalAmount != null && calculation.administrationUnit
        ? `${formatDecimalPtBr(calculation.practicalAmount)} ${calculation.administrationUnit}${calculation.practicalAmount > 1 ? 's' : ''}`
        : `${formatDecimalPtBr(calculation.totalDose)} ${calculation.totalDoseUnit}`)
      : 'A PREENCHER';
    const doseUnit = normalizeText(dose.dose_unit).includes('kg') ? dose.dose_unit : 'mg/kg';
    const alert = resolveClinicalMedicationDoseAlert(resolved, override, weightKg, speciesValue, doseAlternativeKey);

    return [
      `${index}. ${resolved.name.toUpperCase()} — ${presentationLabel(presentation)}`,
      '',
      ...buildAdministrationLine(amount, route, frequency, duration, alert),
      '',
      buildClinicalDoseSupportLine(selectedDoseValue, doseUnit, calculation),
    ].join('\n');
  }

  if (source.kind === 'commercial' && source.commercialProducts?.length) {
    const product = source.commercialProducts.find((item) => item.id === override.commercialProductId)
      || source.commercialProducts[0];
    const doseValue = override.selectedDoseValue ?? resolved.dose.min;
    const parsedWeight = parsePositiveDecimal(weightKg);
    const amount = buildClinicalAdministrationAmount(resolved.dose, doseValue, parsedWeight, product);
    const frequency = resolved.dose.frequency;
    const duration = resolved.dose.duration;
    const route = formatPrescriptionRoute(resolved.dose.route);
    const alert = resolveClinicalMedicationDoseAlert(resolved, override, weightKg, speciesValue, doseAlternativeKey);
    const doseUnit = resolved.dose.basis === 'per_animal'
      ? resolved.dose.unit
      : resolved.dose.unit;

    return [
      `${index}. ${resolved.name.toUpperCase()} — ${product.name.toUpperCase()}`,
      '',
      ...buildAdministrationLine(amount, route, frequency, duration, alert),
      '',
      resolved.dose.basis === 'manual'
        ? buildClinicalDoseSupportLine(null, doseUnit, null, 'conforme orientação do fabricante')
        : buildClinicalDoseSupportLine(doseValue, doseUnit),
    ].join('\n');
  }

  return null;
}

export function resolveSelectedClinicalMedications(
  model: { options: Array<{ key: string; medications?: ClinicalMedicationDefinition[] }> },
  selectedOptionKeys: string[],
): ClinicalMedicationDefinition[] {
  return model.options
    .filter((option) => selectedOptionKeys.includes(option.key))
    .flatMap((option) => option.medications || []);
}
