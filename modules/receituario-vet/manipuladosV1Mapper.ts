import type { ProtocolMedicationItem } from '../../src/lib/protocols/protocolsRepo'
import type { PatientInfo, PrescriptionItem } from './NovaReceita2Page'
import { sanitizeVisibleText } from './textSanitizer'
import { buildAdministrableUnit, formatDurationPhrase, normalizeManipuladoV1, type ManipuladoV1Formula } from './manipuladosV1'
import {
  getManipuladoV1CatalogSubtitle,
  getManipuladoV1PrintLineLeft,
  getManipuladoV1PrintLineRight,
  renderManipuladoV1PharmacyInstruction,
  renderManipuladoV1Recommendations,
  renderManipuladoV1TutorInstruction,
} from './manipuladosV1Render'

function defaultDoseEditorUnit(formula: ManipuladoV1Formula): string {
  const safeUnit = sanitizeVisibleText(formula.prescribing.dose_unit || '')
  if (formula.prescribing.posology_mode === 'mg_per_kg_dose') return `${safeUnit}/kg`
  if (formula.prescribing.posology_mode === 'mg_per_m2_dose') return `${safeUnit}/m²`
  if (formula.prescribing.posology_mode === 'fixed_per_animal') return `${safeUnit}/animal`
  if (formula.prescribing.posology_mode === 'fixed_per_application') return `${safeUnit}/dose`
  return safeUnit
}

function resolveDoseText(formula: ManipuladoV1Formula, patient: PatientInfo | null, targetDose?: number | null): string {
  const dose = targetDose ?? formula.prescribing.dose_min
  if (dose == null) return ''
  if (formula.prescribing.posology_mode === 'mg_per_kg_dose') {
    const weight = Number(patient?.weight_kg || 0)
    if (weight > 0) return `${Number((dose * weight).toFixed(2))} ${formula.prescribing.dose_unit}`
    return `${dose} ${formula.prescribing.dose_unit}/kg`
  }
  if (formula.prescribing.posology_mode === 'mg_per_m2_dose') {
    return `${dose} ${formula.prescribing.dose_unit}/m²`
  }
  return `${dose} ${formula.prescribing.dose_unit}`.trim()
}

function resolveTutorInstruction(formula: ManipuladoV1Formula, patient: PatientInfo | null, targetDose?: number | null): string {
  const doseText = resolveDoseText(formula, patient, targetDose) || '1 dose'
  const route = sanitizeVisibleText(formula.identity.primary_route || 'ORAL').toLowerCase()
  const frequency = sanitizeVisibleText(formula.prescribing.frequency_label || '')
  const duration =
    sanitizeVisibleText(formula.prescribing.duration_label || '') ||
    (formula.prescribing.duration_value ? `${formula.prescribing.duration_value} ${formula.prescribing.duration_unit}` : '')
  return sanitizeVisibleText(
    [
      `Administrar ${doseText}`,
      route ? `por via ${route}` : '',
      frequency,
      duration ? formatDurationPhrase(duration) : '',
    ].filter(Boolean).join(', ') + '.'
  )
}

type PrescribingExtras = ManipuladoV1Formula['prescribing'] & {
  _repeat_periodically?: boolean
  _repeat_every_value?: string | number
  _repeat_every_unit?: string
}

/** Paridade Nova Receita: canonical_posology + frequency_mode V1. */
function resolveManipuladoFrequencyFields(formula: ManipuladoV1Formula): {
  frequencyMode: NonNullable<PrescriptionItem['frequencyMode']>
  timesPerDay?: number
  intervalHours?: number
  repeatEveryValue?: number
  repeatEveryUnit?: PrescriptionItem['repeatEveryUnit']
  frequency: string
} {
  const label = sanitizeVisibleText(formula.prescribing.frequency_label || '')
  const canon = formula.canonical_posology
  if (canon) {
    if (canon.is_single_dose && canon.repeat_periodically && canon.repeat_every_value != null && canon.repeat_every_unit) {
      return {
        frequencyMode: 'repeat_interval',
        repeatEveryValue: canon.repeat_every_value,
        repeatEveryUnit: canon.repeat_every_unit,
        frequency: `em dose única, repetir a cada ${canon.repeat_every_value} ${canon.repeat_every_unit}`,
      }
    }
    if (canon.is_single_dose) {
      return { frequencyMode: 'single_dose', frequency: label || 'em dose única' }
    }
  }

  const p = formula.prescribing as PrescribingExtras
  const fm = formula.prescribing.frequency_mode

  if (fm === 'single_dose') {
    if (p._repeat_periodically && p._repeat_every_value != null && String(p._repeat_every_value).trim() !== '') {
      const n = Number(String(p._repeat_every_value).replace(',', '.'))
      const uRaw = String(p._repeat_every_unit || 'semanas').toLowerCase()
      const unit: PrescriptionItem['repeatEveryUnit'] = uRaw.startsWith('semana') ? 'semanas' : uRaw.startsWith('mes') ? 'meses' : 'dias'
      if (Number.isFinite(n) && n > 0) {
        return {
          frequencyMode: 'repeat_interval',
          repeatEveryValue: n,
          repeatEveryUnit: unit,
          frequency: `em dose única, repetir a cada ${n} ${unit}`,
        }
      }
    }
    return { frequencyMode: 'single_dose', frequency: label || 'em dose única' }
  }

  if (fm === 'q6h') return { frequencyMode: 'interval_hours', intervalHours: 6, frequency: label }
  if (fm === 'q8h') return { frequencyMode: 'interval_hours', intervalHours: 8, frequency: label }
  if (fm === 'q12h') return { frequencyMode: 'interval_hours', intervalHours: 12, frequency: label }
  if (fm === 'q24h') return { frequencyMode: 'interval_hours', intervalHours: 24, frequency: label }

  if (fm === 'one_to_two_daily') {
    return { frequencyMode: 'times_per_day', timesPerDay: 2, frequency: label }
  }

  if (fm === 'custom') {
    const hoursMatch = label.match(/a cada\s*(\d+(?:[.,]\d+)?)\s*h/i)
    if (hoursMatch) {
      const h = Number(hoursMatch[1].replace(',', '.'))
      if (Number.isFinite(h) && h > 0) {
        return { frequencyMode: 'interval_hours', intervalHours: h, frequency: label }
      }
    }
    const tMatch = label.match(/(\d+)\s*x\s*(?:ao\s*)?dia/i)
    if (tMatch) {
      const t = Number(tMatch[1])
      if (t > 0) return { frequencyMode: 'times_per_day', timesPerDay: t, frequency: label }
    }
    return { frequencyMode: 'times_per_day', timesPerDay: 2, frequency: label }
  }

  if (fm === 'continuous_use' || fm === 'until_recheck' || fm === 'until_finished') {
    return { frequencyMode: 'times_per_day', timesPerDay: 1, frequency: label || '1x ao dia' }
  }

  return { frequencyMode: 'times_per_day', timesPerDay: 1, frequency: label || '1x ao dia' }
}

function resolveManipuladoDurationMode(formula: ManipuladoV1Formula): PrescriptionItem['durationMode'] {
  const label = String(formula.prescribing.duration_label || '').toLowerCase()
  if (formula.prescribing.duration_value != null && formula.prescribing.duration_value > 0) return 'fixed_days'
  if (label.includes('uso contínuo') && label.includes('reavalia')) return 'continuous_until_recheck'
  if (label.includes('uso contínuo')) return 'continuous_use'
  if (label.includes('reavalia')) return 'until_recheck'
  if (label.includes('terminar')) return 'until_finished'
  return 'continuous_until_recheck'
}

function resolveApplicationTarget(route?: string): string {
  const normalized = sanitizeVisibleText(route || '').toLowerCase()
  if (normalized.includes('oto')) return 'em cada ouvido'
  if (normalized.includes('oft')) return 'em cada olho'
  if (normalized.includes('nasa')) return 'em cada narina'
  if (normalized.includes('top') || normalized.includes('trans')) return 'sobre a lesao'
  return 'na pele afetada'
}

/** Detecta periodicidade livre no texto do manipulado V1 (ex.: "repetir a cada 30 dias"). */
function parseRepeatIntervalFromManipuladoText(formula: ManipuladoV1Formula): { value: number; unit: 'dias' | 'semanas' | 'meses' } | null {
  const blob = [
    formula.prescribing.frequency_label,
    formula.prescribing.duration_label,
    formula.prescribing.duration_value != null
      ? `${formula.prescribing.duration_value} ${formula.prescribing.duration_unit || ''}`
      : '',
    formula.prescribing.manual_usage_override,
    formula.prescribing.generated_usage_text,
  ]
    .map((s) => String(s || '').trim())
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  if (!blob) return null
  const match =
    blob.match(/repetir\s+a\s+cada\s+(\d+(?:[.,]\d+)?)\s*(dia|dias|semana|semanas|mês|meses)\b/i)
    || blob.match(/\ba\s+cada\s+(\d+(?:[.,]\d+)?)\s*(dia|dias|semana|semanas|mês|meses)\b/i)
  if (!match) return null
  const value = Number(String(match[1]).replace(',', '.'))
  if (!Number.isFinite(value) || value <= 0) return null
  const u = match[2].toLowerCase()
  if (u.startsWith('semana')) return { value, unit: 'semanas' }
  if (u.startsWith('mes')) return { value, unit: 'meses' }
  return { value, unit: 'dias' }
}

export function mapManipuladoV1ToPrescriptionItem(params: {
  formula: ManipuladoV1Formula
  patient: PatientInfo | null
  defaultStartDate?: string
  defaultStartHour?: string
  targetDose?: number | null
}): PrescriptionItem {
  const formula = normalizeManipuladoV1(params.formula)
  const freqResolved = resolveManipuladoFrequencyFields(formula)
  const durationModeResolved = resolveManipuladoDurationMode(formula)
  const doseText = resolveDoseText(formula, params.patient, params.targetDose)
  const instructions = resolveTutorInstruction(formula, params.patient, params.targetDose) || renderManipuladoV1TutorInstruction(formula)
  const cautions = renderManipuladoV1Recommendations(formula)
  const administrableUnit = buildAdministrableUnit(formula)
  const selectedAdministrationAmount = params.targetDose ?? formula.prescribing.dose_min ?? 1
  const administrationBasis: PrescriptionItem['administrationBasis'] =
    formula.prescribing.posology_mode === 'fixed_per_animal'
      ? 'per_animal'
      : formula.prescribing.posology_mode === 'fixed_per_application'
        ? 'per_application_site'
        : formula.prescribing.posology_mode === 'variant_table'
          ? 'weight_band'
          : 'weight_based'
  const administrationAmount =
    administrationBasis === 'per_animal' || administrationBasis === 'per_application_site'
      ? Number(selectedAdministrationAmount || 1)
      : undefined
  const administrationUnit =
    administrationBasis === 'per_animal' || administrationBasis === 'per_application_site'
      ? sanitizeVisibleText(administrableUnit || 'unidade')
      : undefined
  const administrationTarget =
    administrationBasis === 'per_animal'
      ? 'por animal'
      : administrationBasis === 'per_application_site'
        ? resolveApplicationTarget(formula.identity.primary_route)
        : undefined

  const repeatFromText = parseRepeatIntervalFromManipuladoText(formula)
  const fm = formula.prescribing.frequency_mode
  const frequencyMode: PrescriptionItem['frequencyMode'] = repeatFromText
    ? 'repeat_interval'
    : fm === 'single_dose'
      ? 'single_dose'
      : fm === 'q6h' || fm === 'q8h' || fm === 'q12h' || fm === 'q24h'
        ? 'interval_hours'
        : undefined
  const intervalHours =
    !repeatFromText && frequencyMode === 'interval_hours'
      ? fm === 'q6h'
        ? 6
        : fm === 'q8h'
          ? 8
          : fm === 'q12h'
            ? 12
            : fm === 'q24h'
              ? 24
              : undefined
      : undefined

  return {
    id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    kind: 'compounded',
    type: 'medication',
    isManual: false,
    is_controlled: formula.identity.sale_classification === 'controlled',
    catalog_source: 'clinic',
    compounded_medication_id: formula.identity.id,
    compounded_regimen_id: null,
    name: formula.identity.name,
    presentation_label: getManipuladoV1CatalogSubtitle(formula),
    administrationBasis,
    administrationAmount,
    administrationUnit,
    administrationTarget,
    route: formula.identity.primary_route,
    startDate: params.defaultStartDate || '',
    startHour: params.defaultStartHour || '',
    start_date: params.defaultStartDate && params.defaultStartHour ? `${params.defaultStartDate}T${params.defaultStartHour}:00` : params.defaultStartDate || undefined,
    inheritStartFromPrescription: true,
    cautionsText: cautions.join('\n'),
    cautions,
    pharmaceutical_form: formula.identity.pharmaceutical_form,
    package_quantity: formula.pharmacy.total_quantity || formula.pharmacy.qsp_text,
    presentation_metadata: {
      manipulados_v1: true,
      print_line_mode: 'manual',
      print_line_left: getManipuladoV1PrintLineLeft(formula),
      print_line_right: getManipuladoV1PrintLineRight(formula),
      compounded_selected_dose_value: params.targetDose ?? formula.prescribing.dose_min ?? '',
      compounded_selected_dose_unit: defaultDoseEditorUnit(formula),
      compounded_recommended_min: formula.prescribing.dose_min ?? '',
      compounded_recommended_max: formula.prescribing.dose_max ?? '',
      compounded_recommended_unit: defaultDoseEditorUnit(formula),
      administration_basis: administrationBasis,
      administration_amount: administrationAmount,
      administration_unit: administrationUnit,
      administration_target: administrationTarget,
    },
    manualQuantity: formula.pharmacy.total_quantity || formula.pharmacy.qsp_text,
    compounded_pharmacy_guidance: renderManipuladoV1PharmacyInstruction(formula),
    compounded_internal_note: formula.prescribing.clinical_note || formula.identity.description || '',
    compounded_snapshot: {
      medication_id: formula.identity.id,
      medication_name: formula.identity.name,
      description: formula.identity.description,
      pharmaceutical_form: formula.identity.pharmaceutical_form,
      default_route: formula.identity.primary_route,
      is_controlled: formula.identity.sale_classification === 'controlled',
      control_type: formula.identity.sale_classification === 'controlled' ? 'controlled' : '',
      quantity_text: formula.pharmacy.total_quantity,
      qsp_text: formula.pharmacy.qsp_text,
      flavor: formula.pharmacy.flavor_mode === 'Outro' ? formula.pharmacy.flavor_text : formula.pharmacy.flavor_mode,
      vehicle: formula.pharmacy.base_text,
      excipient: formula.pharmacy.base_text,
      notes: formula.identity.description,
      manipulation_instructions: formula.pharmacy.compounding_instructions,
      metadata: {
        payload_v1: formula,
      },
      ingredients: formula.ingredients.map((ingredient) => ({
        id: ingredient.id,
        ingredient_name: ingredient.name,
        ingredient_role: ingredient.role === 'base' ? 'other' : ingredient.role,
        quantity_value: ingredient.quantity,
        quantity_unit: ingredient.unit,
        concentration_value: null,
        concentration_unit: null,
        per_value: null,
        per_unit: null,
        free_text: ingredient.note,
        is_controlled_ingredient: false,
        notes: ingredient.note,
      })),
    },
    compounded_regimen_snapshot: {
      id: formula.identity.id,
      regimen_name: formula.identity.indication_summary || 'Posologia padrão',
      indication: formula.identity.indication_summary || null,
      dosing_mode: formula.prescribing.posology_mode === 'mg_per_kg_dose' || formula.prescribing.posology_mode === 'mg_per_m2_dose' ? 'calculated' : 'fixed_per_patient',
      species: formula.identity.species_scope,
      route: formula.identity.primary_route,
      dose_min: formula.prescribing.dose_min,
      dose_max: formula.prescribing.dose_max,
      dose_unit: formula.prescribing.dose_unit,
      per_weight_unit: formula.prescribing.posology_mode === 'mg_per_kg_dose' ? 'kg' : formula.prescribing.posology_mode === 'mg_per_m2_dose' ? 'm2' : null,
      fixed_administration_value: formula.prescribing.posology_mode === 'fixed_per_animal' || formula.prescribing.posology_mode === 'fixed_per_application' ? formula.prescribing.dose_min : null,
      fixed_administration_unit: formula.pharmacy.final_unit,
      concentration_value: null,
      concentration_unit: null,
      concentration_per_value: 1,
      concentration_per_unit: formula.pharmacy.final_unit,
      frequency_value_min: null,
      frequency_value_max: null,
      frequency_unit: null,
      frequency_label: formula.prescribing.frequency_label,
      duration_mode: durationModeResolved,
      duration_value: formula.prescribing.duration_value,
      duration_unit: formula.prescribing.duration_unit,
      inherit_default_start: true,
      notes: formula.prescribing.clinical_note || null,
      allow_edit: true,
      default_prepared_quantity_text: formula.pharmacy.total_quantity || formula.pharmacy.qsp_text,
      default_administration_sig: instructions,
      calculation_mode: formula.prescribing.posology_mode === 'mg_per_kg_dose' ? 'weight_based' : 'fixed_per_animal',
      applied_dose_text: doseText,
      applied_quantity_text: formula.pharmacy.total_quantity || formula.pharmacy.qsp_text,
      metadata: {
        payload_v1: formula,
      },
    },
    dose: doseText,
    frequency: freqResolved.frequency,
    frequencyMode: freqResolved.frequencyMode,
    timesPerDay: freqResolved.timesPerDay,
    intervalHours: freqResolved.intervalHours,
    repeatEveryValue: freqResolved.repeatEveryValue,
    repeatEveryUnit: freqResolved.repeatEveryUnit,
    duration: formula.prescribing.duration_label,
    durationMode: durationModeResolved,
    durationValue: formula.prescribing.duration_value || undefined,
    durationUnit: formula.prescribing.duration_unit || undefined,
    instructions,
  }
}

export function mapManipuladoV1ToProtocolMedication(params: {
  formula: ManipuladoV1Formula
  sortOrder: number
}): ProtocolMedicationItem {
  const formula = normalizeManipuladoV1(params.formula)
  return {
    item_type: 'compounded',
    medication_id: null,
    compounded_medication_id: null,
    compounded_regimen_id: null,
    medication_name: formula.identity.name,
    presentation_id: null,
    presentation_text: getManipuladoV1CatalogSubtitle(formula),
    manual_medication_name: formula.identity.name,
    manual_presentation_label: getManipuladoV1PrintLineRight(formula),
    concentration_value: null,
    concentration_unit: null,
    dose_value: formula.prescribing.dose_min,
    dose_unit: formula.prescribing.dose_unit || null,
    route: formula.identity.primary_route,
    frequency_type: formula.prescribing.frequency_mode === 'q24h' ? 'once_daily' : 'times_per_day',
    times_per_day: formula.prescribing.frequency_mode === 'q24h' ? 1 : null,
    interval_hours: formula.prescribing.frequency_mode === 'q12h' ? 12 : formula.prescribing.frequency_mode === 'q8h' ? 8 : formula.prescribing.frequency_mode === 'q6h' ? 6 : null,
    duration_days: formula.prescribing.duration_value || null,
    is_controlled: formula.identity.sale_classification === 'controlled',
    sort_order: params.sortOrder,
    metadata: {
      payload_v1: formula,
      notes: formula.prescribing.clinical_note || '',
      runtime_source: 'manipulados_v1',
      administration_basis:
        formula.prescribing.posology_mode === 'fixed_per_animal'
          ? 'per_animal'
          : formula.prescribing.posology_mode === 'fixed_per_application'
            ? 'per_application_site'
            : formula.prescribing.posology_mode === 'variant_table'
              ? 'weight_band'
              : 'weight_based',
      administration_amount: formula.prescribing.dose_min ?? 1,
      administration_unit: sanitizeVisibleText(buildAdministrableUnit(formula) || 'unidade'),
      administration_target:
        formula.prescribing.posology_mode === 'fixed_per_animal'
          ? 'por animal'
          : formula.prescribing.posology_mode === 'fixed_per_application'
            ? resolveApplicationTarget(formula.identity.primary_route)
            : null,
    },
  }
}
