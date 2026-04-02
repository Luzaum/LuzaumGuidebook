// Protocol to Prescription Mapper
// Converts ProtocolMedicationItem to PrescriptionItem compatible with Nova Receita 2.0 and rxRenderer

import { ProtocolMedicationItem, ProtocolRecommendation } from '../../src/lib/protocols/protocolsRepo'
import { PrescriptionItem as RxPrescriptionItem, RouteGroup } from './rxTypes'
import { createDefaultItem } from './rxDefaults'
import type { PrescriptionItem } from './NovaReceita2Page'
import type { CompoundedMedicationV2 } from './compoundedV2'
import { mapCompoundedV2ToPrescriptionItem } from './compoundedV2Mapper'
import { createEmptyManipuladoV1, normalizeManipuladoV1, type ManipuladoV1Formula } from './manipuladosV1'
import { mapManipuladoV1ToPrescriptionItem, mapManipuladoV1ToProtocolMedication } from './manipuladosV1Mapper'
import { sanitizeDeepText, sanitizeVisibleText } from './textSanitizer'

type StoredProtocolPrescriptionSnapshot = Omit<
  PrescriptionItem,
  'id' | 'start_date' | 'startDate' | 'startHour' | 'inheritStartFromPrescription'
>

function parsePresentationText(presentationText?: string | null): {
  pharmaceutical_form?: string
  commercial_name?: string
  concentration_text?: string
} {
  const raw = String(presentationText || '').trim()
  if (!raw) return {}

  const segments = raw
    .split(/\s+[—-]\s+/)
    .map((segment) => segment.trim())
    .filter(Boolean)

  const result: {
    pharmaceutical_form?: string
    commercial_name?: string
    concentration_text?: string
  } = {}

  if (segments[0]) result.pharmaceutical_form = segments[0]

  for (let idx = 1; idx < segments.length; idx += 1) {
    const segment = segments[idx]
    if (!result.concentration_text && /\d/.test(segment) && /\//.test(segment)) {
      result.concentration_text = segment
      continue
    }
    if (!result.commercial_name) {
      result.commercial_name = segment
    }
  }

  return result
}

function parseConcentrationText(concentrationText?: string | null): {
  value?: number
  value_unit?: string
  per_value?: number
  per_unit?: string
} {
  const raw = String(concentrationText || '').trim()
  if (!raw) return {}
  const match = raw.match(/(\d+(?:[.,]\d+)?)\s*([a-zA-ZÀ-ÿ%µ]+)\s*\/\s*(\d+(?:[.,]\d+)?)?\s*([a-zA-ZÀ-ÿ%µ]+)/i)
  if (!match) return {}
  const value = Number(match[1].replace(',', '.'))
  const perValue = match[3] ? Number(match[3].replace(',', '.')) : 1
  return {
    value: Number.isFinite(value) ? value : undefined,
    value_unit: match[2] || undefined,
    per_value: Number.isFinite(perValue) ? perValue : 1,
    per_unit: match[4] || undefined,
  }
}

function parseDoseString(dose?: string | null): { dose_value: number | null; dose_unit: string | null } {
  const raw = String(dose || '').trim()
  if (!raw) return { dose_value: null, dose_unit: null }
  const match = raw.match(/^(\d+(?:[.,]\d+)?)\s*(.*)$/)
  if (!match) return { dose_value: null, dose_unit: raw || null }
  const value = Number(match[1].replace(',', '.'))
  return {
    dose_value: Number.isFinite(value) ? value : null,
    dose_unit: match[2]?.trim() || null,
  }
}

function parseFrequencyFields(item: PrescriptionItem): {
  frequency_type: ProtocolMedicationItem['frequency_type']
  times_per_day: number | null
  interval_hours: number | null
} {
  if (item.frequencyMode === 'interval_hours' && item.intervalHours) {
    return {
      frequency_type: 'interval_hours',
      times_per_day: null,
      interval_hours: item.intervalHours,
    }
  }

  if (item.frequencyMode === 'times_per_day' && item.timesPerDay) {
    return {
      frequency_type: 'times_per_day',
      times_per_day: item.timesPerDay,
      interval_hours: null,
    }
  }

  const raw = String(item.frequency || '').trim().toLowerCase()
  if (!raw) {
    return {
      frequency_type: 'times_per_day',
      times_per_day: null,
      interval_hours: null,
    }
  }

  const timesMatch = raw.match(/(\d+)\s*x\s*ao\s*dia/)
  if (timesMatch) {
    const times = Number(timesMatch[1])
    return {
      frequency_type: 'times_per_day',
      times_per_day: Number.isFinite(times) ? times : null,
      interval_hours: null,
    }
  }

  const intervalMatch = raw.match(/a cada\s*(\d+(?:[.,]\d+)?)\s*hora/)
  if (intervalMatch) {
    const hours = Number(intervalMatch[1].replace(',', '.'))
    return {
      frequency_type: 'interval_hours',
      times_per_day: null,
      interval_hours: Number.isFinite(hours) ? hours : null,
    }
  }

  if (raw.includes('necessidade')) {
    return {
      frequency_type: 'as_needed',
      times_per_day: null,
      interval_hours: null,
    }
  }

  return {
    frequency_type: 'times_per_day',
    times_per_day: item.timesPerDay ?? null,
    interval_hours: null,
  }
}

function parseDurationFields(item: PrescriptionItem): {
  duration_days: number | null
} {
  if (item.durationMode === 'continuous_until_recheck') {
    return { duration_days: -1 }
  }

  if (item.durationValue && item.durationValue > 0) {
    const normalizedUnit = String(item.durationUnit || 'dias').trim().toLowerCase()
    const multiplier = normalizedUnit.startsWith('semana') ? 7 : normalizedUnit.startsWith('mes') ? 30 : 1
    return { duration_days: item.durationValue * multiplier }
  }

  const raw = String(item.duration || '').trim()
  if (!raw) return { duration_days: null }
  const match = raw.match(/(\d+)/)
  if (!match) return { duration_days: null }
  const days = Number(match[1])
  return {
    duration_days: Number.isFinite(days) ? days : null,
  }
}

function buildProtocolPresentationText(item: PrescriptionItem): string {
  if (item.kind === 'compounded') {
    const compounded = [
      item.compounded_snapshot?.pharmaceutical_form || item.pharmaceutical_form || '',
      item.compounded_snapshot?.qsp_text || item.compounded_snapshot?.quantity_text || item.presentation_label || '',
      item.concentration_text || '',
    ]
      .map((value) => String(value || '').trim())
      .filter(Boolean)
    if (compounded.length > 0) return compounded.join(' — ')
  }

  const rich = [item.pharmaceutical_form, item.commercial_name, item.concentration_text]
    .map((value) => String(value || '').trim())
    .filter(Boolean)
  if (rich.length > 0) return rich.join(' — ')
  return String(item.presentation_label || '').trim()
}

function buildSnapshotFromPrescriptionItem(item: PrescriptionItem): StoredProtocolPrescriptionSnapshot {
  const { id, start_date, startDate, startHour, inheritStartFromPrescription, ...snapshot } = item
  return snapshot
}

function buildDurationFromProtocol(protocolMed: ProtocolMedicationItem): {
  duration?: string
  durationMode?: PrescriptionItem['durationMode']
  durationValue?: number
  durationUnit?: string
} {
  if (protocolMed.duration_days === -1) {
    return {
      duration: undefined,
      durationMode: 'continuous_until_recheck',
    }
  }

  if (protocolMed.duration_days && protocolMed.duration_days > 0) {
    return {
      duration: `${protocolMed.duration_days} dias`,
      durationMode: 'fixed_days',
      durationValue: protocolMed.duration_days,
      durationUnit: 'dias',
    }
  }

  return {}
}

function getProtocolPayloadV2(protocolMed: ProtocolMedicationItem, storedSnapshot: StoredProtocolPrescriptionSnapshot | null): CompoundedMedicationV2 | null {
  const metadata = (protocolMed.metadata || {}) as Record<string, unknown>
  const directPayload = metadata.payload_v2
  if (directPayload && typeof directPayload === 'object' && !Array.isArray(directPayload)) {
    return sanitizeDeepText(directPayload as CompoundedMedicationV2)
  }

  const snapshotCandidate = storedSnapshot as Record<string, unknown> | null
  const compoundedSnapshot = snapshotCandidate?.compounded_snapshot as Record<string, unknown> | undefined
  const snapshotMetadata = compoundedSnapshot?.metadata
  if (snapshotMetadata && typeof snapshotMetadata === 'object' && !Array.isArray(snapshotMetadata)) {
    const nestedPayload = (snapshotMetadata as Record<string, unknown>).payload_v2
    if (nestedPayload && typeof nestedPayload === 'object' && !Array.isArray(nestedPayload)) {
      return sanitizeDeepText(nestedPayload as CompoundedMedicationV2)
    }
  }

  return null
}

function getProtocolPayloadV1(protocolMed: ProtocolMedicationItem, storedSnapshot: StoredProtocolPrescriptionSnapshot | null): ManipuladoV1Formula | null {
  const metadata = (protocolMed.metadata || {}) as Record<string, unknown>
  const directPayload = metadata.payload_v1
  if (directPayload && typeof directPayload === 'object' && !Array.isArray(directPayload)) {
    return normalizeManipuladoV1(sanitizeDeepText(directPayload as ManipuladoV1Formula))
  }

  const snapshotCandidate = storedSnapshot as Record<string, unknown> | null
  const compoundedSnapshot = snapshotCandidate?.compounded_snapshot as Record<string, unknown> | undefined
  const snapshotMetadata = compoundedSnapshot?.metadata
  if (snapshotMetadata && typeof snapshotMetadata === 'object' && !Array.isArray(snapshotMetadata)) {
    const nestedPayload = (snapshotMetadata as Record<string, unknown>).payload_v1
    if (nestedPayload && typeof nestedPayload === 'object' && !Array.isArray(nestedPayload)) {
      return normalizeManipuladoV1(sanitizeDeepText(nestedPayload as ManipuladoV1Formula))
    }
  }

  return null
}

function applyProtocolMedicationOverridesToV2(
  v2: CompoundedMedicationV2,
  protocolMed: ProtocolMedicationItem,
  notes: string,
): CompoundedMedicationV2 {
  const regimen = v2.regimens.find((entry) => entry.id === protocolMed.compounded_regimen_id) || v2.regimens.find((entry) => entry.is_default) || v2.regimens[0]
  if (!regimen) return v2

  const nextFrequencyMode =
    protocolMed.frequency_type === 'interval_hours'
      ? 'interval_hours'
      : protocolMed.frequency_type === 'times_per_day' || protocolMed.frequency_type === 'once_daily'
        ? 'times_per_day'
        : regimen.frequency_mode

  return sanitizeDeepText({
    ...v2,
    formula: {
      ...v2.formula,
      primary_route: sanitizeVisibleText(protocolMed.route).trim() || v2.formula.primary_route,
      sale_classification: protocolMed.is_controlled ? 'controlled' : v2.formula.sale_classification,
    },
    regimens: v2.regimens.map((entry) => entry.id !== regimen.id ? entry : {
      ...entry,
      dose_min: protocolMed.dose_value ?? entry.dose_min,
      dose_unit: sanitizeVisibleText(protocolMed.dose_unit).trim() || entry.dose_unit,
      frequency_mode: nextFrequencyMode,
      frequency_min:
        protocolMed.frequency_type === 'interval_hours'
          ? protocolMed.interval_hours ?? entry.frequency_min
          : protocolMed.frequency_type === 'once_daily'
            ? 1
            : protocolMed.times_per_day ?? entry.frequency_min,
      frequency_text:
        protocolMed.frequency_type === 'interval_hours' && protocolMed.interval_hours
          ? `a cada ${protocolMed.interval_hours} horas`
          : protocolMed.frequency_type === 'once_daily'
            ? '1 vez ao dia'
            : protocolMed.times_per_day
              ? `${protocolMed.times_per_day}x ao dia`
              : entry.frequency_text,
      duration_mode: protocolMed.duration_days === -1 ? 'continuous_until_recheck' : 'fixed',
      duration_value: protocolMed.duration_days && protocolMed.duration_days > 0 ? protocolMed.duration_days : entry.duration_value,
      duration_unit: protocolMed.duration_days === -1 ? 'até reavaliação' : 'dias',
      duration_text:
        protocolMed.duration_days === -1
          ? 'até reavaliação'
          : protocolMed.duration_days && protocolMed.duration_days > 0
            ? `${protocolMed.duration_days} dias`
            : entry.duration_text,
      tutor_observation: notes || entry.tutor_observation,
    }),
  })
}

function frequencyFromProtocolItem(protocolMed: ProtocolMedicationItem): Pick<ManipuladoV1Formula['prescribing'], 'frequency_mode' | 'frequency_label'> {
  if (protocolMed.frequency_type === 'interval_hours' && protocolMed.interval_hours) {
    const hours = protocolMed.interval_hours
    return {
      frequency_mode: hours === 6 ? 'q6h' : hours === 8 ? 'q8h' : hours === 12 ? 'q12h' : hours === 24 ? 'q24h' : 'custom',
      frequency_label: `a cada ${hours} horas`,
    }
  }

  if (protocolMed.frequency_type === 'once_daily') {
    return { frequency_mode: 'q24h', frequency_label: 'a cada 24 horas' }
  }

  if (protocolMed.frequency_type === 'times_per_day' && protocolMed.times_per_day) {
    return protocolMed.times_per_day === 1
      ? { frequency_mode: 'q24h', frequency_label: '1x ao dia' }
      : protocolMed.times_per_day === 2
        ? { frequency_mode: 'q12h', frequency_label: '2x ao dia' }
        : { frequency_mode: 'custom', frequency_label: `${protocolMed.times_per_day}x ao dia` }
  }

  if (protocolMed.frequency_type === 'as_needed') {
    return { frequency_mode: 'custom', frequency_label: 'conforme necessidade' }
  }

  return { frequency_mode: 'q12h', frequency_label: 'a cada 12 horas' }
}

function applyProtocolMedicationOverridesToV1(
  v1: ManipuladoV1Formula,
  protocolMed: ProtocolMedicationItem,
  notes: string,
): ManipuladoV1Formula {
  const next = normalizeManipuladoV1({
    ...v1,
    identity: {
      ...v1.identity,
      name: sanitizeVisibleText(protocolMed.medication_name || protocolMed.manual_medication_name || v1.identity.name),
      primary_route: sanitizeVisibleText(protocolMed.route || v1.identity.primary_route),
      sale_classification: protocolMed.is_controlled ? 'controlled' : v1.identity.sale_classification,
      description: notes || v1.identity.description,
    },
    prescribing: {
      ...v1.prescribing,
      dose_min: protocolMed.dose_value ?? v1.prescribing.dose_min,
      dose_max: protocolMed.dose_value ?? v1.prescribing.dose_max,
      dose_unit: sanitizeVisibleText(protocolMed.dose_unit || v1.prescribing.dose_unit),
      ...frequencyFromProtocolItem(protocolMed),
      duration_value: protocolMed.duration_days && protocolMed.duration_days > 0 ? protocolMed.duration_days : v1.prescribing.duration_value,
      duration_unit: protocolMed.duration_days && protocolMed.duration_days > 0 ? 'dias' : v1.prescribing.duration_unit,
      duration_label: protocolMed.duration_days === -1 ? 'até reavaliação' : v1.prescribing.duration_label,
      clinical_note: notes || v1.prescribing.clinical_note,
    },
    pharmacy: {
      ...v1.pharmacy,
      qsp_text: (protocolMed.metadata as Record<string, unknown>)?.qsp_override as string || v1.pharmacy.qsp_text,
    },
    display: {
      ...v1.display,
      auto_print_line: true,
    },
  })

  return next
}

export function mapPrescriptionItemToProtocolMedicationItem(
  item: PrescriptionItem,
  sortOrder: number
): ProtocolMedicationItem {
  const doseParsed = parseDoseString(item.dose)
  const frequencyParsed = parseFrequencyFields(item)
  const durationParsed = parseDurationFields(item)
  const notes = String(item.cautionsText || '').trim()

  if (item.kind === 'compounded') {
    const compoundedMetadata = ((item.compounded_snapshot?.metadata || {}) as Record<string, unknown>)
    const regimenMetadata = ((item.compounded_regimen_snapshot?.metadata || {}) as Record<string, unknown>)
    const payloadV1 = compoundedMetadata.payload_v1 || regimenMetadata.payload_v1
    if (payloadV1 && typeof payloadV1 === 'object' && !Array.isArray(payloadV1)) {
      const mapped = mapManipuladoV1ToProtocolMedication({
        formula: normalizeManipuladoV1(sanitizeDeepText(payloadV1 as ManipuladoV1Formula)),
        sortOrder,
      })
      return {
        ...mapped,
        metadata: {
          ...(mapped.metadata || {}),
          notes,
          item_kind: item.kind,
          presentation_metadata: item.presentation_metadata || null,
          rx_item_snapshot: buildSnapshotFromPrescriptionItem(item),
        },
      }
    }
  }

  return {
    item_type: item.kind === 'compounded' ? 'compounded' : 'standard',
    medication_id: item.kind === 'standard' ? item.medication_id || null : null,
    compounded_medication_id: item.kind === 'compounded' ? item.compounded_medication_id || null : null,
    compounded_regimen_id: item.kind === 'compounded' ? item.compounded_regimen_id || null : null,
    medication_name: item.name,
    presentation_id: item.kind === 'standard' ? item.presentation_id || null : null,
    presentation_text: buildProtocolPresentationText(item),
    manual_medication_name: item.kind === 'standard' && !item.medication_id ? item.name : null,
    manual_presentation_label: item.presentation_label || null,
    concentration_value: item.value != null && item.value !== '' ? Number(item.value) : null,
    concentration_unit: item.value_unit || null,
    dose_value: doseParsed.dose_value,
    dose_unit: doseParsed.dose_unit,
    route: item.route || null,
    frequency_type: frequencyParsed.frequency_type,
    times_per_day: frequencyParsed.times_per_day,
    interval_hours: frequencyParsed.interval_hours,
    duration_days: durationParsed.duration_days,
    is_controlled: !!item.is_controlled,
    sort_order: sortOrder,
    metadata: {
      notes,
      item_kind: item.kind,
      presentation_metadata: item.presentation_metadata || null,
      rx_item_snapshot: buildSnapshotFromPrescriptionItem(item),
    },
  }
}

function getStoredSnapshot(protocolMed: ProtocolMedicationItem): StoredProtocolPrescriptionSnapshot | null {
  const metadata = (protocolMed.metadata || {}) as Record<string, unknown>
  const candidate = metadata.rx_item_snapshot
  if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) return null
  return candidate as StoredProtocolPrescriptionSnapshot
}

/**
 * Map a protocol medication item to a rxTypes PrescriptionItem (for rxRenderer)
 */
export function mapProtocolMedicationToRxPrescriptionItem(
  protocolMed: ProtocolMedicationItem
): RxPrescriptionItem {
  const routeGroup = mapRouteToRouteGroup(protocolMed.route)
  const item = createDefaultItem('medication', routeGroup)

  item.name = protocolMed.medication_name || protocolMed.manual_medication_name || 'Medicamento'
  item.presentation = protocolMed.manual_presentation_label || protocolMed.presentation_text || ''
  item.concentration = protocolMed.concentration_value
    ? `${protocolMed.concentration_value} ${protocolMed.concentration_unit || ''}`.trim()
    : protocolMed.concentration_unit || ''

  if (protocolMed.dose_value !== null && protocolMed.dose_value !== undefined) {
    item.doseValue = protocolMed.dose_value.toString()
  }
  if (protocolMed.dose_unit) {
    item.doseUnit = protocolMed.dose_unit
  }

  if (protocolMed.frequency_type === 'times_per_day' && protocolMed.times_per_day) {
    item.frequencyType = 'timesPerDay'
    item.timesPerDay = protocolMed.times_per_day.toString()
    if (protocolMed.times_per_day === 1) item.frequencyToken = 'SID'
    else if (protocolMed.times_per_day === 2) item.frequencyToken = 'BID'
    else if (protocolMed.times_per_day === 3) item.frequencyToken = 'TID'
    else if (protocolMed.times_per_day === 4) item.frequencyToken = 'QID'
  } else if (protocolMed.frequency_type === 'interval_hours' && protocolMed.interval_hours) {
    item.frequencyType = 'everyHours'
    item.everyHours = protocolMed.interval_hours.toString()
  } else if (protocolMed.frequency_type === 'once_daily') {
    item.frequencyType = 'timesPerDay'
    item.timesPerDay = '1'
    item.frequencyToken = 'SID'
  } else if (protocolMed.frequency_type === 'as_needed') {
    item.frequencyType = 'timesPerDay'
    item.timesPerDay = '1'
    item.instruction = 'Administrar conforme necessidade.'
    item.autoInstruction = false
    item.manualEdited = true
  }

  if (protocolMed.duration_days) {
    item.durationDays = protocolMed.duration_days.toString()
  }

  item.autoInstruction = true
  item.manualEdited = false
  item.id = `protocol-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

  return item
}

/**
 * Map a protocol medication item to a NovaReceita2Page PrescriptionItem
 */
export function mapProtocolMedicationToPrescriptionItem(
  protocolMed: ProtocolMedicationItem
): PrescriptionItem {
  const metadata = (protocolMed.metadata || {}) as Record<string, unknown>
  const notes = typeof metadata.notes === 'string' ? metadata.notes.trim() : ''
  const storedSnapshot = getStoredSnapshot(protocolMed)
  const payloadV1 = getProtocolPayloadV1(protocolMed, storedSnapshot)
  const payloadV2 = getProtocolPayloadV2(protocolMed, storedSnapshot)
  const presentationParsed = parsePresentationText(protocolMed.presentation_text || protocolMed.manual_presentation_label)
  const fallbackConcentrationText =
    presentationParsed.concentration_text ||
    (protocolMed.concentration_value != null
      ? `${protocolMed.concentration_value} ${protocolMed.concentration_unit || ''}`.trim()
      : '')
  const concentrationStructured = parseConcentrationText(fallbackConcentrationText)

  let dose = ''
  if (protocolMed.dose_value !== null && protocolMed.dose_value !== undefined) {
    dose = protocolMed.dose_value.toString()
    if (protocolMed.dose_unit) {
      dose += ` ${protocolMed.dose_unit}`
    }
  }

  let frequency = ''
  let frequencyMode: 'times_per_day' | 'interval_hours' | undefined
  let timesPerDay: number | undefined
  let intervalHours: number | undefined
  if (protocolMed.frequency_type === 'times_per_day' && protocolMed.times_per_day) {
    frequency = `${protocolMed.times_per_day}x ao dia`
    frequencyMode = 'times_per_day'
    timesPerDay = protocolMed.times_per_day
  } else if (protocolMed.frequency_type === 'interval_hours' && protocolMed.interval_hours) {
    frequency = `a cada ${protocolMed.interval_hours} horas`
    frequencyMode = 'interval_hours'
    intervalHours = protocolMed.interval_hours
  } else if (protocolMed.frequency_type === 'once_daily') {
    frequency = '1x ao dia'
    frequencyMode = 'times_per_day'
    timesPerDay = 1
  } else if (protocolMed.frequency_type === 'as_needed') {
    frequency = 'conforme necessidade'
  }

  const durationState = buildDurationFromProtocol(protocolMed)

  const baseItem: PrescriptionItem = storedSnapshot
    ? {
      ...storedSnapshot,
      id: `protocol-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      type: storedSnapshot.type || 'medication',
    }
    : {
      id: `protocol-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      kind: protocolMed.item_type === 'compounded' ? 'compounded' : 'standard',
      type: 'medication',
    }

  if ((protocolMed.item_type === 'compounded' || baseItem.kind === 'compounded') && payloadV1) {
    const mapped = mapManipuladoV1ToPrescriptionItem({
      formula: applyProtocolMedicationOverridesToV1(payloadV1, protocolMed, notes),
      patient: null,
    })
    return {
      ...mapped,
      id: `protocol-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      cautionsText: notes || mapped.cautionsText,
      cautions: notes ? notes.split(/\r?\n/).filter(Boolean) : mapped.cautions,
    }
  }

  if ((protocolMed.item_type === 'compounded' || baseItem.kind === 'compounded') && payloadV2) {
    return mapCompoundedV2ToPrescriptionItem({
      v2: applyProtocolMedicationOverridesToV2(payloadV2, protocolMed, notes),
      patient: null,
      regimenId: protocolMed.compounded_regimen_id || undefined,
    })
  }

  if (protocolMed.item_type === 'compounded' || baseItem.kind === 'compounded') {
    const compoundedBase = baseItem.kind === 'compounded'
      ? baseItem
      : {
        ...baseItem,
        kind: 'compounded' as const,
        compounded_snapshot: {
          medication_id: protocolMed.compounded_medication_id || '',
          medication_name: protocolMed.medication_name || protocolMed.manual_medication_name || baseItem.name || 'Manipulado',
          pharmaceutical_form: baseItem.pharmaceutical_form || presentationParsed.pharmaceutical_form || '',
          is_controlled: !!protocolMed.is_controlled,
          ingredients: [],
        },
      }

    return {
      ...compoundedBase,
      id: `protocol-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      kind: 'compounded',
      type: 'medication',
      compounded_medication_id: protocolMed.compounded_medication_id || compoundedBase.compounded_medication_id,
      compounded_regimen_id: protocolMed.compounded_regimen_id || compoundedBase.compounded_regimen_id,
      medication_id: undefined,
      presentation_id: undefined,
      is_controlled: !!protocolMed.is_controlled,
      name: protocolMed.medication_name || compoundedBase.name || compoundedBase.compounded_snapshot.medication_name || 'Manipulado',
      presentation_label: protocolMed.presentation_text || compoundedBase.presentation_label || '',
      pharmaceutical_form: compoundedBase.pharmaceutical_form || presentationParsed.pharmaceutical_form,
      concentration_text: compoundedBase.concentration_text || fallbackConcentrationText || undefined,
      value: compoundedBase.value ?? concentrationStructured.value,
      value_unit: compoundedBase.value_unit || concentrationStructured.value_unit,
      per_value: compoundedBase.per_value ?? concentrationStructured.per_value,
      per_unit: compoundedBase.per_unit || concentrationStructured.per_unit,
      dose: dose || compoundedBase.dose || compoundedBase.compounded_regimen_snapshot?.applied_dose_text || undefined,
      frequency: frequency || compoundedBase.frequency || undefined,
      frequencyMode: frequencyMode || compoundedBase.frequencyMode,
      timesPerDay: timesPerDay ?? compoundedBase.timesPerDay,
      intervalHours: intervalHours ?? compoundedBase.intervalHours,
      route: protocolMed.route || compoundedBase.route || compoundedBase.compounded_snapshot.default_route || undefined,
      duration: durationState.duration || compoundedBase.duration,
      durationMode: durationState.durationMode || compoundedBase.durationMode,
      durationValue: durationState.durationValue ?? compoundedBase.durationValue,
      durationUnit: durationState.durationUnit || compoundedBase.durationUnit,
      cautionsText: notes || compoundedBase.cautionsText || undefined,
      cautions: compoundedBase.cautions || (notes ? notes.split(/\r?\n/).filter(Boolean) : undefined),
      presentation_metadata: metadata.presentation_metadata && typeof metadata.presentation_metadata === 'object'
        ? (metadata.presentation_metadata as Record<string, unknown>)
        : (compoundedBase.presentation_metadata || null),
      compounded_snapshot: {
        ...compoundedBase.compounded_snapshot,
        medication_id: protocolMed.compounded_medication_id || compoundedBase.compounded_snapshot.medication_id,
        medication_name: protocolMed.medication_name || compoundedBase.compounded_snapshot.medication_name,
        pharmaceutical_form:
          compoundedBase.compounded_snapshot.pharmaceutical_form ||
          compoundedBase.pharmaceutical_form ||
          presentationParsed.pharmaceutical_form ||
          '',
        is_controlled: !!protocolMed.is_controlled,
      },
    }
  }

  return {
    ...baseItem,
    id: `protocol-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    kind: 'standard',
    type: 'medication',
    medication_id: protocolMed.medication_id || baseItem.medication_id || undefined,
    presentation_id: protocolMed.presentation_id || baseItem.presentation_id || undefined,
    is_controlled: !!protocolMed.is_controlled,
    name: protocolMed.medication_name || protocolMed.manual_medication_name || baseItem.name || 'Medicamento',
    presentation_label: protocolMed.manual_presentation_label || protocolMed.presentation_text || baseItem.presentation_label || '',
    pharmaceutical_form: baseItem.pharmaceutical_form || presentationParsed.pharmaceutical_form,
    commercial_name: baseItem.commercial_name || presentationParsed.commercial_name,
    concentration_text: baseItem.concentration_text || fallbackConcentrationText || undefined,
    value: baseItem.value ?? concentrationStructured.value,
    value_unit: baseItem.value_unit || concentrationStructured.value_unit,
    per_value: baseItem.per_value ?? concentrationStructured.per_value,
    per_unit: baseItem.per_unit || concentrationStructured.per_unit,
    dose: dose || baseItem.dose || undefined,
    frequency: frequency || baseItem.frequency || undefined,
    frequencyMode: frequencyMode || baseItem.frequencyMode,
    timesPerDay: timesPerDay ?? baseItem.timesPerDay,
    intervalHours: intervalHours ?? baseItem.intervalHours,
    route: protocolMed.route || baseItem.route || undefined,
    duration: durationState.duration || baseItem.duration,
    durationMode: durationState.durationMode || baseItem.durationMode,
    durationValue: durationState.durationValue ?? baseItem.durationValue,
    durationUnit: durationState.durationUnit || baseItem.durationUnit,
    cautionsText: notes || baseItem.cautionsText || undefined,
    cautions: baseItem.cautions || (notes ? notes.split(/\r?\n/).filter(Boolean) : undefined),
    presentation_metadata: metadata.presentation_metadata && typeof metadata.presentation_metadata === 'object'
      ? (metadata.presentation_metadata as Record<string, unknown>)
      : (baseItem.presentation_metadata || null),
  }
}

function mapRouteToRouteGroup(route: string | null): RouteGroup {
  if (!route) return 'ORAL'

  const routeLower = route.toLowerCase().trim()

  if (routeLower.includes('oral')) return 'ORAL'
  if (routeLower.includes('otológico') || routeLower.includes('otologico') || routeLower.includes('otico')) return 'OTOLOGICO'
  if (routeLower.includes('oftálmico') || routeLower.includes('oftalmico')) return 'OFTALMICO'
  if (routeLower.includes('tópico') || routeLower.includes('topico')) return 'TOPICO'
  if (routeLower.includes('intranasal')) return 'INTRANASAL'
  if (routeLower.includes('retal')) return 'RETAL'
  if (routeLower.includes('subcutâneo') || routeLower.includes('subcutaneo') || routeLower === 'sc') return 'SC'
  if (routeLower.includes('intramuscular') || routeLower === 'im') return 'IM'
  if (routeLower.includes('intravenoso') || routeLower === 'iv') return 'IV'
  if (routeLower.includes('inalatório') || routeLower.includes('inalatorio')) return 'INALATORIO'
  if (routeLower.includes('transdérmico') || routeLower.includes('transdermico')) return 'TRANSDERMICO'

  return 'OUTROS'
}

export function mapProtocolRecommendationsToString(
  recommendations: ProtocolRecommendation[]
): string {
  return recommendations
    .map((rec) => rec.text.trim())
    .filter((text) => text.length > 0)
    .join('\n\n')
}

export function isPrescriptionItemComplete(item: PrescriptionItem): boolean {
  return !!item.name.trim() && !!item.route && !!item.instructions?.trim()
}

export function isRxPrescriptionItemComplete(item: RxPrescriptionItem): boolean {
  return !!item.name.trim() && !!item.routeGroup && !!item.instruction.trim()
}
