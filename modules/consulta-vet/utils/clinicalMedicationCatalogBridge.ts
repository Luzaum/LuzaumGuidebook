import { prescriptionDurationClause as durationClause } from './prescriptionSchedule';
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
  formatAdministrationAmount,
  formatDecimalPtBr,
  formatRecommendedDoseUnit,
  isSpeciesCompatible,
  inferTabletSplitIncrement,
  type DoseCalculationResult,
} from './receituarioDoseEngine';
import {
  formatPrescriptionMedicationHeader,
  formatPrescriptionFrequency,
  formatPrescriptionRoute,
  normalizePrescriptionSpecies,
  parsePositiveDecimal,
} from './receituarioMedication';
import {
  calculateCommercialPracticalDose,
  formatCommercialAdministrationAmount,
  buildCompoundingDisplayAmount,
  evaluateCompoundingRecommendation,
  pickDefaultCommercialPotencyMg,
  parseCommercialPotencies,
  resolveCommercialPotencyMg,
  type CompoundingRecommendation,
} from './commercialPresentationDose';
import { CLINICAL_DOSE_LABEL } from './receituarioTemplateCalculator';
import {
  isTakeHomeMedicationPresentation,
  isTakeHomePrescriptionRoute,
  sanitizeCommercialProductForTakeHome,
} from './receituarioTakeHome';

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



export function resolveEditorialMedication(canonicalMedicationId?: string | null): MedicationRecord | null {
  if (!canonicalMedicationId) return null;
  return medicationsSeed.find((item) => item.id === canonicalMedicationId) || null;
}

function resolveEditorialMedicationByLookup(medication: ClinicalMedicationDefinition): MedicationRecord | null {
  const requested = normalizeText(medication.canonicalLookupName || medication.name);
  const requestedBase = requested.split(/\s+(?:-|—|–)\s+/)[0]?.trim() || requested;
  if (!requestedBase) return null;
  return medicationsSeed.find((item) => {
    const values = [item.title, item.activeIngredient, item.slug, ...(item.tradeNames || []), ...(item.tags || [])]
      .map(normalizeText)
      .filter(Boolean);
    return values.some((value) => value === requested || value === requestedBase)
      || (requestedBase.length >= 6 && values.some((value) => (
        value.startsWith(`${requestedBase} `) || requested.startsWith(`${value} `)
      )));
  }) || null;
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
  const editorialByLookup = resolveEditorialMedicationByLookup(medication);
  if (editorialByLookup) {
    return { kind: 'editorial', editorialMedication: editorialByLookup };
  }
  return { kind: 'manual' };
}

function resolveClinicalMedicationDefinition(
  medication: ClinicalMedicationDefinition,
  doseAlternativeKey?: string,
): ClinicalMedicationDefinition {
  const alternative = medication.doseAlternatives?.find((item) => item.key === doseAlternativeKey);
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

  const source = resolveClinicalMedicationSource(resolved);

  if (resolved.canonicalMedicationId && source.kind !== 'editorial') {
    return {
      ...base,
      editable: false,
      needsRegistration: true,
      reason: `O modelo referência a monografia "${resolved.canonicalMedicationId}", mas ela não está cadastrada no ConsultaVet.`,
      registrationTargets: ['medicamentos'],
    };
  }

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

  if (source.kind === 'manual' && resolved.dose.basis === 'weight') {
    return {
      ...base,
      editable: true,
      needsRegistration: false,
      reason: 'Sem produto comercial vinculado. Ajuste a dose e utilize manipulação quando indicado.',
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
  return commercialOticProductsSeed
    .filter((product) => lookup.has(product.id))
    .map(sanitizeCommercialProductForTakeHome)
    .filter((product): product is CommercialMedicationProduct => product !== null);
}

function matchesPresentationFilter(presentation: MedicationPresentation, filter?: ClinicalMedicationDefinition['presentationFilter']): boolean {
  if (!filter || filter === 'none') return true;
  const haystack = normalizeText(`${presentation.form} ${presentation.label}`);
  if (filter === 'oral') return /comp|capsul|oral|solucao oral|suspensão oral|comprimido/.test(haystack);
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
  return {
    id: option ? `${presentation.id}:${option.id}` : presentation.id,
    clinic_id: '',
    medication_id: globalMedicationId,
    pharmaceutical_form: presentation.form || null,
    concentration_text: option?.label || presentation.label,
    additional_component: null,
    presentation_unit: null,
    commercial_name: presentation.label.split('—')[0]?.trim() || medication.title,
    value: concentrationValue,
    value_unit: concentrationUnit || null,
    per_value: 1,
    per_unit: perUnit,
    avg_price_brl: null,
    pharmacy_veterinary: presentation.channel !== 'human_pharmacy',
    pharmacy_human: presentation.channel === 'human_pharmacy',
    pharmacy_compounding: presentation.channel === 'compounded',
    metadata: {
      seed_presentation_id: presentation.id,
      seed_concentration_id: option?.id || null,
      route: presentation.route || null,
      drops_per_ml: presentation.dropsPerMl || null,
      scoring_info: presentation.scoringInfo || null,
    },
    created_at: '',
    source: 'global',
    tablet_split_increment: inferTabletSplitIncrement(presentation.form, presentation.scoringInfo),
  };
}

export function getEditorialPresentations(
  medication: MedicationRecord,
  medicationDefinition: ClinicalMedicationDefinition,
): MedicationPresentationRecord[] {
  const allowedIds = medicationDefinition.presentationIds || [];
  return (medication.presentations || []).filter(isTakeHomeMedicationPresentation).flatMap((presentation) => {
    if (allowedIds.length && !allowedIds.includes(presentation.id)) return [];
    if (!matchesPresentationFilter(presentation, medicationDefinition.presentationFilter)) return [];
    if (presentation.concentrationOptions?.length) {
      return presentation.concentrationOptions.map((option) => mapPresentationOption(medication, presentation, option));
    }
    return [mapPresentationOption(medication, presentation)];
  });
}

export function mapEditorialDoseToRecommended(dose: MedicationDose, medication: MedicationRecord): RecommendedDose {
  const doseUnit = formatRecommendedDoseUnit({ dose_unit: dose.doseUnit, per_weight_unit: dose.perWeightUnit });
  return {
    id: dose.id,
    medication_id: makeGlobalMedicationId(medication.slug),
    species: dose.species === 'dog' ? 'cão' : dose.species === 'cat' ? 'gato' : 'ambos',
    route: dose.route,
    dose_value: dose.doseMin,
    dose_max: dose.doseMax ?? null,
    dose_unit: doseUnit,
    per_weight_unit: dose.perWeightUnit || null,
    indication: dose.indication,
    frequency: formatPrescriptionFrequency(dose.frequency),
    frequency_text: formatPrescriptionFrequency(dose.frequency),
    duration: dose.duration || null,
    notes: dose.notes || null,
    calculator_default_dose: dose.doseMin,
    metadata: {
      presentation_id: dose.presentationId || null,
      presentation_concentration_id: dose.presentationConcentrationId || null,
      follow_up_phases: dose.followUpPhases || [],
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
  const doses = (medication.doses || [])
    .filter((dose) => !species || isSpeciesCompatible(dose.species === 'dog' ? 'cão' : dose.species === 'cat' ? 'gato' : 'ambos', species))
    .filter((dose) => !linkedIds.length || linkedIds.includes(dose.id))
    .filter((dose) => routeMatchesFilter(dose.route, medicationDefinition.presentationFilter))
    .filter((dose) => isTakeHomePrescriptionRoute(dose.route))
    .map((dose) => mapEditorialDoseToRecommended(dose, medication));
  const modelUnit = comparableClinicalUnit(medicationDefinition.dose.unit);
  if (doses.length && medicationDefinition.dose.basis !== 'manual' && !doses.some(dose => comparableClinicalUnit(formatRecommendedDoseUnit(dose)) === modelUnit)) {
    // Nunca interpretar "100 mcg" do modelo como "100 jatos" da monografia.
    // O regime do modelo é uma fonte distinta, identificada explicitamente.
    doses.unshift({
      id: `clinical-model:${medicationDefinition.key}`,
      species: species === 'cat' ? 'gato' : species === 'dog' ? 'cão' : 'ambos',
      dose_value: medicationDefinition.dose.min, dose_max: medicationDefinition.dose.max,
      dose_unit: medicationDefinition.dose.unit, route: medicationDefinition.dose.route,
      frequency: medicationDefinition.dose.frequency, duration: medicationDefinition.dose.duration,
      indication: 'Regime do modelo clínico — conferir fonte e adequação ao paciente',
      notes: 'Conferir a referência do modelo e a apresentação selecionada antes de prescrever.',
      source_type: 'other', source_label: 'Modelo clínico do ConsultaVet',
    });
  }
  return doses;
}

function comparableClinicalUnit(unit: string): string {
  return normalizeText(unit).replace(/\/(?:por\s+)?(?:gato|cao|animal)$/, '/animal');
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
  const unit = formatRecommendedDoseUnit(dose) || 'mg/kg';
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
  species?: PrescriptionSpecies | null,
  weightKg?: number | null,
  selectedDoseValue?: number | null,
): MedicationPresentationRecord | null {
  const presentations = getEditorialPresentations(medication, medicationDefinition);
  if (!presentations.length) return null;
  const presentationId = String(dose?.metadata?.presentation_id || '');
  const concentrationId = String(dose?.metadata?.presentation_concentration_id || '');
  const linked = presentations.filter((item) => (
    (!presentationId || item.id === presentationId || item.metadata?.seed_presentation_id === presentationId)
    && (!concentrationId || item.id === `${presentationId}:${concentrationId}` || item.metadata?.seed_concentration_id === concentrationId)
  ));
  const ordered = [...linked, ...presentations.filter(item => !linked.includes(item))];
  if (dose && species && weightKg && selectedDoseValue) {
    const viable = ordered.map((presentation) => ({
      presentation,
      calculation: calculateReceituarioDose({ species, weightKg, dose, selectedDoseValue, presentation }),
    })).filter(item => !item.calculation.blockedReason)
      .sort((left, right) => (
        Number(left.calculation.requiresConfirmation) - Number(right.calculation.requiresConfirmation)
        || Number((left.calculation.percentDifference || 0) < 0) - Number((right.calculation.percentDifference || 0) < 0)
        || Math.abs(left.calculation.percentDifference || 0) - Math.abs(right.calculation.percentDifference || 0)
        || Math.abs((left.calculation.practicalAmount ?? Number.POSITIVE_INFINITY) - 1)
          - Math.abs((right.calculation.practicalAmount ?? Number.POSITIVE_INFINITY) - 1)
      ));
    return viable[0]?.presentation || null;
  }
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
  const compatible = doses.filter(item => comparableClinicalUnit(formatRecommendedDoseUnit(item)) === comparableClinicalUnit(modelDose.unit));
  const exact = compatible.find((item) => item.dose_value === modelDose.min && (item.dose_max ?? item.dose_value) === (modelDose.max ?? modelDose.min));
  return exact || compatible[0] || null;
}

export function buildDefaultClinicalMedicationOverride(
  medication: ClinicalMedicationDefinition,
  speciesValue?: string,
  doseAlternativeKey?: string,
  weightKg?: number | null,
): ClinicalMedicationOverride {
  const resolved = resolveClinicalMedicationDefinition(medication, doseAlternativeKey);
  const species = normalizePrescriptionSpecies(speciesValue);
  const source = resolveClinicalMedicationSource(resolved);
  const defaultContextKey = JSON.stringify({
    key: resolved.key,
    canonicalMedicationId: resolved.canonicalMedicationId || null,
    linkedDoseIds: resolved.linkedDoseIds || [],
    presentationIds: resolved.presentationIds || [],
    presentationFilter: resolved.presentationFilter || null,
    dose: resolved.dose,
    species,
    weightKg: weightKg || null,
    doseAlternativeKey: doseAlternativeKey || null,
  });

  const selectedDoseValue = resolved.dose.basis === 'manual' ? null : resolved.dose.min;
  const administration = {
    route: resolved.dose.route,
    frequency: resolved.dose.frequency,
    duration: resolved.dose.duration,
  };
  if (source.kind === 'editorial' && source.editorialMedication) {
    const dose = pickDefaultEditorialDose(source.editorialMedication, resolved, species, resolved.dose);
    const presentation = pickDefaultEditorialPresentation(source.editorialMedication, resolved, dose, species, weightKg, selectedDoseValue);
    const shouldUsePatientSpecificCapsule = !presentation
      && resolved.dose.unit === 'mg/kg'
      && /oral|\bvo\b/.test(normalizeText(resolved.dose.route))
      && Boolean(weightKg && weightKg > 0);
    return {
      defaultContextKey,
      editorialMedicationId: source.editorialMedication.id,
      presentationId: presentation?.id || null,
      doseId: dose?.id || null,
      selectedDoseValue,
      useCompounding: shouldUsePatientSpecificCapsule,
      ...administration,
    };
  }
  if (source.kind === 'commercial' && source.commercialProducts?.length) {
    const product = source.commercialProducts[0];
    const isInternationalUnitDose = resolved.dose.unit.startsWith('UI');
    const shouldUsePatientSpecificCapsule = !isInternationalUnitDose
      && resolved.dose.unit === 'mg/kg'
      && /oral|\bvo\b/.test(normalizeText(resolved.dose.route))
      && Boolean(weightKg && weightKg > 0)
      && (product.presentations || []).some((item) => /manipulad/.test(normalizeText(item)));
    if (shouldUsePatientSpecificCapsule) {
      return {
        defaultContextKey,
        commercialProductId: product.id,
        commercialPotencyMg: null,
        commercialPresentationUnit: null,
        selectedDoseValue,
        useCompounding: true,
        ...administration,
      };
    }
    if (isInternationalUnitDose) {
      return {
        defaultContextKey,
        commercialProductId: product.id,
        commercialPotencyMg: null,
        commercialPresentationUnit: null,
        selectedDoseValue,
        ...administration,
      };
    }
    const defaultPotencyMg = pickDefaultCommercialPotencyMg(product);
    const defaultPotency = parseCommercialPotencies(product)
      .find((item) => item.mgPerUnit === defaultPotencyMg);
    return {
      defaultContextKey,
      commercialProductId: product.id,
      commercialPotencyMg: defaultPotencyMg,
      commercialPresentationUnit: defaultPotency?.unitLabel || null,
      selectedDoseValue,
      ...administration,
    };
  }
  return { defaultContextKey, selectedDoseValue, ...administration };
}

export function buildClinicalMedicationOverridesMap(
  medications: ClinicalMedicationDefinition[],
  speciesValue?: string,
  doseAlternativeKeys: Record<string, string> = {},
  existing: Record<string, ClinicalMedicationOverride> = {},
  weightKg?: number | null,
): Record<string, ClinicalMedicationOverride> {
  const next = { ...existing };
  for (const medication of medications) {
    const defaults = buildDefaultClinicalMedicationOverride(
      medication,
      speciesValue,
      doseAlternativeKeys[medication.key],
      weightKg,
    );
    const current = next[medication.key];
    if (!current || (current.defaultContextKey && current.defaultContextKey !== defaults.defaultContextKey)) {
      next[medication.key] = defaults;
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
  selectedPotencyMg?: number | null,
  selectedUnitLabel?: string | null,
  useCompounding?: boolean,
): string {
  if (dose.basis === 'manual') return 'conforme orientação do fabricante';
  if (dose.basis === 'per_animal') {
    const unit = dose.unit.replace('/animal', '') || 'UI';
    return `${formatDecimalPtBr(doseValue)} ${unit}`;
  }
  if (!weightKg || weightKg <= 0) return 'A PREENCHER';
  if (dose.unit === 'UI/kg' || dose.unit.startsWith('UI')) {
    return `${formatDecimalPtBr(doseValue * weightKg)} UI`;
  }
  const totalMg = doseValue * weightKg;
  if (useCompounding) {
    return buildCompoundingDisplayAmount(totalMg);
  }
  if (product) {
    return formatCommercialAdministrationAmount(
      product,
      doseValue,
      weightKg,
      selectedPotencyMg,
      selectedUnitLabel,
    );
  }
  return `${formatDecimalPtBr(totalMg)} ${dose.unit.startsWith('mcg') ? 'mcg' : 'mg'}${dose.basis === 'weight_per_day' ? ' por dia' : ''}`;
}

function buildCompoundingPrescriptionBlock(
  medicationName: string,
  totalMg: number,
  route: string,
  frequency: string,
  duration: string,
  index: number,
  doseValue: number,
  doseUnit: string,
  pharmaceuticalForm = 'cápsula',
): string {
  const roundedMg = Math.round(totalMg * 100) / 100;
  const routeClause = /^por via\s+/i.test(route.trim()) ? route.trim() : `por via ${route.trim()}`;
  return [
    `${index}. ${formatPrescriptionMedicationHeader({
      medicationName,
      commercialName: 'Manipulado',
      concentration: `${formatDecimalPtBr(roundedMg)} mg/${pharmaceuticalForm}`,
      pharmaceuticalForm,
    })}`,
    '',
    `Forma farmacêutica: ${pharmaceuticalForm}.`,
    '',
    `Manipular ${pharmaceuticalForm}s contendo ${formatDecimalPtBr(roundedMg)} mg de ${medicationName.toLowerCase()} por ${pharmaceuticalForm}.`,
    '',
    `Administrar 1 ${pharmaceuticalForm} ${routeClause}${frequency ? `, ${frequency}` : ''}${durationClause(duration)}.`,
    '',
    `${CLINICAL_DOSE_LABEL} ${formatDecimalPtBr(roundedMg)} mg por ${pharmaceuticalForm} (${formatDecimalPtBr(doseValue)} ${doseUnit}).`,
  ].join('\n');
}

export function resolveCommercialCompoundingRecommendation(
  product: CommercialMedicationProduct,
  doseMgKg: number,
  weightKg: number | null,
  selectedPotencyMg?: number | null,
  selectedUnitLabel?: string | null,
): CompoundingRecommendation | null {
  if (!weightKg || weightKg <= 0 || doseMgKg <= 0) return null;
  const totalMg = doseMgKg * weightKg;
  const practical = calculateCommercialPracticalDose(product, totalMg, selectedPotencyMg, selectedUnitLabel);
  return evaluateCompoundingRecommendation(practical, totalMg);
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
    const amount = formatAdministrationAmount(calculation.practicalAmount, calculation.administrationUnit);
    return `${CLINICAL_DOSE_LABEL} ${amount} (${formatDecimalPtBr(selectedDoseValue)} ${unit})`;
  }
  return `${CLINICAL_DOSE_LABEL} ${formatDecimalPtBr(selectedDoseValue)} ${unit}`;
}

export function evaluateEditorialDoseAlert(
  calculation: DoseCalculationResult | null | undefined,
  selectedDoseValue: number | null | undefined,
  dose?: RecommendedDose | null,
): ClinicalDoseAlert | null {
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
  return null;
}

function buildCommercialDoseSupportLine(
  selectedDoseValue: number,
  doseUnit: string,
  product: CommercialMedicationProduct,
  weightKg: number | null,
  selectedPotencyMg?: number | null,
  selectedUnitLabel?: string | null,
  useCompounding?: boolean,
): string {
  const parsedWeight = parsePositiveDecimal(weightKg);
  if (!parsedWeight || parsedWeight <= 0) {
    return buildClinicalDoseSupportLine(selectedDoseValue, doseUnit);
  }
  const totalMg = selectedDoseValue * parsedWeight;
  if (useCompounding) {
    return `${CLINICAL_DOSE_LABEL} ${buildCompoundingDisplayAmount(totalMg)} (${formatDecimalPtBr(selectedDoseValue)} ${doseUnit})`;
  }
  const practical = calculateCommercialPracticalDose(product, totalMg, selectedPotencyMg, selectedUnitLabel);
  if (!practical) return buildClinicalDoseSupportLine(selectedDoseValue, doseUnit);
  return `${CLINICAL_DOSE_LABEL} ${practical.displayAmount} (${formatDecimalPtBr(selectedDoseValue)} ${doseUnit})`;
}

export function evaluateCommercialDoseAlert(
  product: CommercialMedicationProduct,
  doseMgKg: number,
  weightKg: number | null,
  selectedPotencyMg?: number | null,
  useCompounding?: boolean,
  selectedUnitLabel?: string | null,
): ClinicalDoseAlert | null {
  if (useCompounding) return null;
  if (!weightKg || weightKg <= 0 || doseMgKg <= 0) return null;
  const totalMg = doseMgKg * weightKg;
  const practical = calculateCommercialPracticalDose(product, totalMg, selectedPotencyMg, selectedUnitLabel);
  if (!practical) return null;
  if (Math.abs(practical.percentDifference) <= DOSE_ROUNDING_TOLERANCE_PERCENT) return null;
  const diff = Math.abs(practical.percentDifference).toFixed(1).replace('.', ',');
  if (practical.percentDifference > 0) {
    return withCriticalFlag({
      severity: 'overdose',
      message: practical.isLiquid
        ? `O volume prático (${formatDecimalPtBr(practical.practicalUnits)} mL) supera a dose calculada em ${diff}%.`
        : `A fração/${practical.unitLabel} disponível (${formatDecimalPtBr(practical.practicalUnits)}) entrega ${diff}% a mais do que a dose calculada.`,
    }, practical.percentDifference);
  }
  return {
    severity: 'underdose',
    message: practical.isLiquid
      ? `O volume prático (${formatDecimalPtBr(practical.practicalUnits)} mL) fica ${diff}% abaixo da dose calculada.`
      : `A fração/${practical.unitLabel} disponível (${formatDecimalPtBr(practical.practicalUnits)}) entrega ${diff}% a menos do que a dose calculada.`,
  };
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
    if (override.useCompounding && resolved.dose.unit === 'mg/kg') return null;
    const editorialMedication = source.editorialMedication;
    const dose = findEditorialDose(editorialMedication, resolved, species, override.doseId)
      || pickDefaultEditorialDose(editorialMedication, resolved, species, resolved.dose);
    const presentation = override.presentationId === null ? null : findEditorialPresentation(editorialMedication, resolved, override.presentationId)
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
    return evaluateCommercialDoseAlert(
      product,
      doseMgKg,
      parsedWeight,
      override.commercialPotencyMg,
      override.useCompounding,
      override.commercialPresentationUnit,
    );
  }

  if (source.kind === 'manual' && resolved.dose.basis === 'weight' && override.useCompounding) {
    return null;
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
  const lines = [`Administrar ${administrationAmount}, ${route}${frequency ? `, ${formatPrescriptionFrequency(frequency)}` : ''}${durationClause(duration)}.`];
  if (alert?.critical && alert.severity === 'overdose') {
    lines.push(`${DOSE_ERROR_REASON_PREFIX} ${alert.message}`);
  }
  return lines;
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

  if (override.catalogMedicationId && override.presentationSnapshot && override.doseSnapshot && species) {
    const presentation = override.presentationSnapshot as unknown as MedicationPresentationRecord;
    const dose = override.doseSnapshot as unknown as RecommendedDose;
    const selectedDoseValue = override.selectedDoseValue ?? dose.dose_value;
    const calculation = calculateReceituarioDose({
      species,
      weightKg: parsePositiveDecimal(weightKg),
      dose,
      selectedDoseValue,
      presentation,
    });
    const frequency = override.frequency || dose.frequency_text || dose.frequency || resolved.dose.frequency || '';
    const duration = override.duration || dose.duration || resolved.dose.duration || '';
    const route = formatPrescriptionRoute(override.route || dose.route || resolved.dose.route || '');
    const amount = calculation && !calculation.blockedReason
      ? (calculation.practicalAmount != null && calculation.administrationUnit
        ? formatAdministrationAmount(calculation.practicalAmount, calculation.administrationUnit)
        : `${formatDecimalPtBr(calculation.totalDose)} ${calculation.totalDoseUnit}`)
      : override.manualAdministrationAmount || 'A PREENCHER';
    const alert = evaluateEditorialDoseAlert(calculation, selectedDoseValue, dose);

    return [
      `${index}. ${formatPrescriptionMedicationHeader({
        medicationName: resolved.name,
        commercialName: presentation.commercial_name,
        concentration: presentation.concentration_text,
        pharmaceuticalForm: presentation.pharmaceutical_form,
      })}`,
      '',
      ...buildAdministrationLine(amount, route, frequency, duration, alert),
      '',
      buildClinicalDoseSupportLine(selectedDoseValue, formatRecommendedDoseUnit(dose), calculation),
    ].join('\n');
  }

  if (source.kind === 'editorial' && source.editorialMedication && species) {
    const editorialMedication = source.editorialMedication;
    const dose = findEditorialDose(editorialMedication, resolved, species, override.doseId)
      || pickDefaultEditorialDose(editorialMedication, resolved, species, resolved.dose);
    const selectedDoseValue = override.selectedDoseValue ?? dose?.dose_value ?? resolved.dose.min;
    const parsedWeight = parsePositiveDecimal(weightKg);
    if (override.useCompounding && resolved.dose.unit === 'mg/kg' && parsedWeight && selectedDoseValue) {
      return buildCompoundingPrescriptionBlock(
        resolved.name,
        selectedDoseValue * parsedWeight,
        formatPrescriptionRoute(override.route || resolved.dose.route || dose?.route || ''),
        override.frequency || resolved.dose.frequency || dose?.frequency_text || dose?.frequency || '',
        override.duration || resolved.dose.duration || dose?.duration || '',
        index,
        selectedDoseValue,
        resolved.dose.unit,
      );
    }
    const presentation = override.presentationId === null ? null : findEditorialPresentation(editorialMedication, resolved, override.presentationId)
      || pickDefaultEditorialPresentation(editorialMedication, resolved, dose);
    if (!dose || !presentation) return null;

    const calculation = calculateReceituarioDose({
      species,
      weightKg: parsePositiveDecimal(weightKg),
      dose,
      selectedDoseValue,
      presentation,
    });
    const frequency = override.frequency || resolved.dose.frequency || dose.frequency_text || dose.frequency || '';
    const duration = override.duration || resolved.dose.duration || dose.duration || '';
    const route = formatPrescriptionRoute(override.route || resolved.dose.route || dose.route || '');
    const amount = calculation && !calculation.blockedReason
      ? (calculation.practicalAmount != null && calculation.administrationUnit
        ? formatAdministrationAmount(calculation.practicalAmount, calculation.administrationUnit)
        : `${formatDecimalPtBr(calculation.totalDose)} ${calculation.totalDoseUnit}`)
      : 'A PREENCHER';
    const doseUnit = formatRecommendedDoseUnit(dose);
    const alert = resolveClinicalMedicationDoseAlert(resolved, override, weightKg, speciesValue, doseAlternativeKey);

    return [
      `${index}. ${formatPrescriptionMedicationHeader({
        medicationName: resolved.name,
        commercialName: presentation.commercial_name,
        concentration: presentation.concentration_text,
        pharmaceuticalForm: presentation.pharmaceutical_form,
      })}`,
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
    const doseUnit = resolved.dose.basis === 'per_animal'
      ? resolved.dose.unit
      : resolved.dose.unit;
    const frequency = override.frequency || resolved.dose.frequency;
    const duration = override.duration || resolved.dose.duration;
    const route = formatPrescriptionRoute(override.route || resolved.dose.route);
    const totalMg = parsedWeight && doseValue ? doseValue * parsedWeight : null;

    if (override.useCompounding && totalMg) {
      return buildCompoundingPrescriptionBlock(
        resolved.name,
        totalMg,
        route,
        frequency,
        duration,
        index,
        doseValue,
        doseUnit,
      );
    }

    const isInternationalUnitDose = resolved.dose.unit.startsWith('UI');
    const selectedPotency = isInternationalUnitDose ? null : resolveCommercialPotencyMg(product, override.commercialPotencyMg);
    const potency = isInternationalUnitDose ? null : parseCommercialPotencies(product)
      .find((item) => selectedPotency != null
        && item.mgPerUnit === selectedPotency
        && (!override.commercialPresentationUnit || item.unitLabel === override.commercialPresentationUnit));
    const internationalUnitConcentration = [
      product.labelCompositionSummary,
      ...(product.activeComponents || []),
      ...(product.presentations || []),
    ].join(' ').match(/(\d+(?:[.,]\d+)?)\s*(?:UI|U)\s*\/\s*mL/i)?.[0] || '';
    const potencyConcentration = isInternationalUnitDose
      ? internationalUnitConcentration.replace(/\bU\b/i, 'UI')
      : potency
      ? `${formatDecimalPtBr(potency.mgPerUnit)} mg/${potency.unitLabel}`
      : selectedPotency ? `${formatDecimalPtBr(selectedPotency)} mg` : '';
    const amount = buildClinicalAdministrationAmount(
      resolved.dose,
      doseValue,
      parsedWeight,
      product,
      selectedPotency,
      override.commercialPresentationUnit,
      override.useCompounding,
    );
    const alert = isInternationalUnitDose ? null : evaluateCommercialDoseAlert(
      product,
      doseValue,
      parsedWeight,
      selectedPotency,
      override.useCompounding,
      override.commercialPresentationUnit,
    );

    return [
      `${index}. ${formatPrescriptionMedicationHeader({
        medicationName: resolved.name,
        commercialName: product.name,
        concentration: potencyConcentration,
        pharmaceuticalForm: potency?.unitLabel || (isInternationalUnitDose ? 'suspensão injetável U-40' : product.presentations.join(' ')),
      })}`,
      '',
      ...buildAdministrationLine(amount, route, frequency, duration, alert),
      '',
      resolved.dose.basis === 'manual'
        ? buildClinicalDoseSupportLine(null, doseUnit, null, 'conforme orientação do fabricante')
        : buildCommercialDoseSupportLine(doseValue, doseUnit, product, weightKg, selectedPotency, override.commercialPresentationUnit, override.useCompounding),
    ].join('\n');
  }

  if (source.kind === 'manual') {
    const doseValue = override.selectedDoseValue ?? resolved.dose.min;
    const parsedWeight = parsePositiveDecimal(weightKg);
    const totalMg = resolved.dose.basis === 'weight' && parsedWeight && doseValue ? doseValue * parsedWeight : null;
    const frequency = override.frequency || resolved.dose.frequency;
    const duration = override.duration || resolved.dose.duration;
    const route = formatPrescriptionRoute(override.route || resolved.dose.route);
    const doseUnit = resolved.dose.unit;

    if (override.useCompounding && totalMg) {
      return buildCompoundingPrescriptionBlock(
        resolved.name,
        totalMg,
        route,
        frequency,
        duration,
        index,
        doseValue,
        doseUnit,
      );
    }

    const amount = override.manualAdministrationAmount
      || (resolved.dose.basis === 'manual'
        ? 'A PREENCHER'
        : buildClinicalAdministrationAmount(resolved.dose, doseValue, parsedWeight));
    return [
      `${index}. ${formatPrescriptionMedicationHeader({
        medicationName: resolved.name,
        commercialName: override.manualPresentation || undefined,
      })}`,
      '',
      ...buildAdministrationLine(amount, route, frequency, duration, null),
      '',
      resolved.dose.basis === 'manual'
        ? buildClinicalDoseSupportLine(null, doseUnit, null, 'conforme definição do médico-veterinário')
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
