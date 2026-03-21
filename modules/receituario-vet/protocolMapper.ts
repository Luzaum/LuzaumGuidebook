// Protocol to Prescription Mapper
// Converts ProtocolMedicationItem to PrescriptionItem compatible with Nova Receita 2.0 and rxRenderer

import { ProtocolMedicationItem, ProtocolRecommendation } from '../../src/lib/protocols/protocolsRepo'
import { PrescriptionItem as RxPrescriptionItem, RouteGroup } from './rxTypes'
import { createDefaultItem } from './rxDefaults'

// Local PrescriptionItem interface from NovaReceita2Page.tsx
export interface PrescriptionItem {
    id: string
    type: 'medication' | 'hygiene' | 'other'

    // Medication-specific
    medication_id?: string
    presentation_id?: string
    is_controlled?: boolean

    // Common fields
    name: string
    presentation_label?: string
    dose?: string
    frequency?: string
    frequencyMode?: 'times_per_day'
    timesPerDay?: number
    route?: string
    duration?: string
    durationMode?: 'fixed_days' | 'until_recheck' | 'continuous_use' | 'until_finished' | 'continuous_until_recheck'
    instructions?: string
    cautionsText?: string
    pharmaceutical_form?: string
    concentration_text?: string
    commercial_name?: string
    value?: string | number
    value_unit?: string
    per_value?: string | number
    per_unit?: string
    presentation_metadata?: Record<string, unknown> | null
}

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
    const rich = [item.pharmaceutical_form, item.commercial_name, item.concentration_text]
        .map((value) => String(value || '').trim())
        .filter(Boolean)
    if (rich.length > 0) return rich.join(' — ')
    return String(item.presentation_label || '').trim()
}

function buildSnapshotFromPrescriptionItem(item: PrescriptionItem): StoredProtocolPrescriptionSnapshot {
    return {
        type: item.type,
        isManual: item.isManual,
        is_controlled: item.is_controlled,
        catalog_source: item.catalog_source,
        medication_id: item.medication_id,
        presentation_id: item.presentation_id,
        name: item.name,
        presentation_label: item.presentation_label,
        dose: item.dose,
        frequency: item.frequency,
        frequencyMode: item.frequencyMode,
        timesPerDay: item.timesPerDay,
        route: item.route,
        duration: item.duration,
        durationMode: item.durationMode,
        instructions: item.instructions,
        cautions: item.cautions,
        cautionsText: item.cautionsText,
        pharmaceutical_form: item.pharmaceutical_form,
        concentration_text: item.concentration_text,
        commercial_name: item.commercial_name,
        additional_component: item.additional_component,
        value: item.value,
        value_unit: item.value_unit,
        per_value: item.per_value,
        per_unit: item.per_unit,
        avg_price_brl: item.avg_price_brl,
        package_quantity: item.package_quantity,
        package_unit: item.package_unit,
        presentation_metadata: item.presentation_metadata,
    }
}

function buildDurationFromProtocol(protocolMed: ProtocolMedicationItem): {
    duration?: string
    durationMode?: PrescriptionItem['durationMode']
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
        }
    }

    return {}
}

export function mapPrescriptionItemToProtocolMedicationItem(
    item: PrescriptionItem,
    sortOrder: number
): ProtocolMedicationItem {
    const doseParsed = parseDoseString(item.dose)
    const frequencyParsed = parseFrequencyFields(item)
    const durationParsed = parseDurationFields(item)
    const notes = String(item.cautionsText || '').trim()

    return {
        medication_id: item.medication_id || null,
        medication_name: item.name,
        presentation_id: item.presentation_id || null,
        presentation_text: buildProtocolPresentationText(item),
        manual_medication_name: item.medication_id ? null : item.name,
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
    // Determine route group from protocol route
    const routeGroup = mapRouteToRouteGroup(protocolMed.route)

    // Create default item with proper route
    const item = createDefaultItem('medication', routeGroup)

    // Set basic information
    item.name = protocolMed.medication_name || protocolMed.manual_medication_name || 'Medicamento'
    item.presentation = protocolMed.manual_presentation_label || protocolMed.presentation_text || ''
    item.concentration = protocolMed.concentration_value
        ? `${protocolMed.concentration_value} ${protocolMed.concentration_unit || ''}`.trim()
        : protocolMed.concentration_unit || ''

    // Set dose information if available
    if (protocolMed.dose_value !== null && protocolMed.dose_value !== undefined) {
        item.doseValue = protocolMed.dose_value.toString()
    }
    if (protocolMed.dose_unit) {
        item.doseUnit = protocolMed.dose_unit
    }

    // Set frequency information
    if (protocolMed.frequency_type === 'times_per_day' && protocolMed.times_per_day) {
        item.frequencyType = 'timesPerDay'
        item.timesPerDay = protocolMed.times_per_day.toString()
        // Map common frequencies to tokens
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

    // Set duration
    if (protocolMed.duration_days) {
        item.durationDays = protocolMed.duration_days.toString()
    }

    // Auto instruction will be generated by rxRenderer based on dose/frequency/duration
    // NOTE: `instructions` column does NOT exist in protocol_medications DB table
    item.autoInstruction = true
    item.manualEdited = false

    // Set status based on completeness
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
    const presentationParsed = parsePresentationText(protocolMed.presentation_text || protocolMed.manual_presentation_label)
    const fallbackConcentrationText =
        presentationParsed.concentration_text ||
        (protocolMed.concentration_value != null
            ? `${protocolMed.concentration_value} ${protocolMed.concentration_unit || ''}`.trim()
            : '')
    const concentrationStructured = parseConcentrationText(fallbackConcentrationText)

    // Build dose string
    let dose = ''
    if (protocolMed.dose_value !== null && protocolMed.dose_value !== undefined) {
        dose = protocolMed.dose_value.toString()
        if (protocolMed.dose_unit) {
            dose += ` ${protocolMed.dose_unit}`
        }
    }

    // Build frequency string
    let frequency = ''
    let frequencyMode: 'times_per_day' | undefined
    let timesPerDay: number | undefined
    if (protocolMed.frequency_type === 'times_per_day' && protocolMed.times_per_day) {
        frequency = `${protocolMed.times_per_day}x ao dia`
        frequencyMode = 'times_per_day'
        timesPerDay = protocolMed.times_per_day
    } else if (protocolMed.frequency_type === 'interval_hours' && protocolMed.interval_hours) {
        frequency = `a cada ${protocolMed.interval_hours} horas`
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
            type: 'medication',
        }

    return {
        ...baseItem,
        id: `protocol-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
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
        route: protocolMed.route || baseItem.route || undefined,
        duration: durationState.duration || baseItem.duration,
        durationMode: durationState.durationMode || baseItem.durationMode,
        cautionsText: notes || baseItem.cautionsText || undefined,
        cautions: baseItem.cautions || (notes ? notes.split(/\r?\n/).filter(Boolean) : undefined),
        presentation_metadata: metadata.presentation_metadata && typeof metadata.presentation_metadata === 'object'
            ? (metadata.presentation_metadata as Record<string, unknown>)
            : (baseItem.presentation_metadata || null),
    }
}

/**
 * Map route string to RouteGroup enum
 */
function mapRouteToRouteGroup(route: string | null): RouteGroup {
    if (!route) return 'ORAL'

    const routeLower = route.toLowerCase().trim()

    if (routeLower.includes('oral') || routeLower.includes('oral')) return 'ORAL'
    if (routeLower.includes('otológico') || routeLower.includes('otico')) return 'OTOLOGICO'
    if (routeLower.includes('oftálmico') || routeLower.includes('oftalmico')) return 'OFTALMICO'
    if (routeLower.includes('tópico') || routeLower.includes('topico')) return 'TOPICO'
    if (routeLower.includes('intranasal')) return 'INTRANASAL'
    if (routeLower.includes('retal')) return 'RETAL'
    if (routeLower.includes('subcutâneo') || routeLower.includes('sc') || routeLower.includes('subcutaneo')) return 'SC'
    if (routeLower.includes('intramuscular') || routeLower.includes('im')) return 'IM'
    if (routeLower.includes('intravenoso') || routeLower.includes('iv')) return 'IV'
    if (routeLower.includes('inalatório') || routeLower.includes('inalatorio')) return 'INALATORIO'
    if (routeLower.includes('transdérmico') || routeLower.includes('transdermico')) return 'TRANSDERMICO'

    return 'OUTROS'
}

/**
 * Convert protocol recommendations to a single string for Nova Receita 2.0
 */
export function mapProtocolRecommendationsToString(
    recommendations: ProtocolRecommendation[]
): string {
    return recommendations
        .map(rec => rec.text.trim())
        .filter(text => text.length > 0)
        .join('\n\n')
}

/**
 * Check if a prescription item is complete (has name, route, and instructions)
 */
export function isPrescriptionItemComplete(item: PrescriptionItem): boolean {
    return !!item.name.trim() && !!item.route && !!item.instructions?.trim()
}

/**
 * Check if a rx prescription item is complete
 */
export function isRxPrescriptionItemComplete(item: RxPrescriptionItem): boolean {
    return !!item.name.trim() && !!item.routeGroup && !!item.instruction.trim()
}
