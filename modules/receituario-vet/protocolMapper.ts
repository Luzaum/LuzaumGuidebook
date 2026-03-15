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

    const durationMode =
        protocolMed.duration_days === -1
            ? 'continuous_until_recheck'
            : protocolMed.duration_days
                ? 'fixed_days'
                : undefined

    return {
        id: `protocol-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        type: 'medication',
        medication_id: protocolMed.medication_id || undefined,
        presentation_id: protocolMed.presentation_id || undefined,
        is_controlled: !!protocolMed.is_controlled,
        name: protocolMed.medication_name || protocolMed.manual_medication_name || 'Medicamento',
        presentation_label: protocolMed.manual_presentation_label || protocolMed.presentation_text || '',
        pharmaceutical_form: presentationParsed.pharmaceutical_form,
        commercial_name: presentationParsed.commercial_name,
        concentration_text: fallbackConcentrationText || undefined,
        value: concentrationStructured.value,
        value_unit: concentrationStructured.value_unit,
        per_value: concentrationStructured.per_value,
        per_unit: concentrationStructured.per_unit,
        dose: dose || undefined,
        frequency: frequency || undefined,
        frequencyMode,
        timesPerDay,
        route: protocolMed.route || undefined,
        duration: protocolMed.duration_days && protocolMed.duration_days > 0 ? `${protocolMed.duration_days} dias` : undefined,
        durationMode,
        cautionsText: notes || undefined,
        presentation_metadata: metadata.presentation_metadata && typeof metadata.presentation_metadata === 'object'
            ? (metadata.presentation_metadata as Record<string, unknown>)
            : null,
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
