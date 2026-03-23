// novaReceita2Adapter.ts
// Converte NovaReceita2State -> PrescriptionState -> PrintDoc
// para uso com rxRenderer e RxPrintView

import type { NovaReceita2State } from './NovaReceita2Page'
import type { PrescriptionState, RouteGroup, PrintDoc } from './rxTypes'
import { renderRxToPrintDoc, splitPrescriptionByControl } from './rxRenderer'
import type { RxTemplateStyle } from './rxDb'
import { buildPresentationConcentrationText } from '../../src/lib/medicationCatalog'
import {
    buildCompoundedCardSubtitle,
    buildCompoundedInstruction,
    getCompoundedCalculationSummary,
    buildCompoundedPreviewCautions,
} from './compoundedUi'

// =====================================================================
// FIX A3: garante que valores numéricos do DB/sessionStorage
// chegam ao renderer sempre como string (nunca como number/object).
// FIX G: parseia dose livre "10 mg/kg" em value+unit estruturados.
// =====================================================================

/** Converte qualquer valor para string segura (nunca undefined/null/object) */
function toSafeString(v: unknown): string {
    if (v == null) return ''
    if (typeof v === 'string') return v
    if (typeof v === 'number') return String(v)
    return ''
}

/**
 * Tenta parsear dose livre ("10 mg/kg", "0,5 ml/kg", "25 mg") em campos estruturados.
 * Retorna null se não reconhecer o padrão.
 */
function parseDoseString(dose: string): { numericStr: string; unit: string; perKg: boolean } | null {
    if (!dose) return null
    const ratioMatch = dose.match(/(\d+(?:[.,]\d+)?)\s*([a-zA-ZÀ-ÿ%Âµ]+)\s*\/\s*(\d+(?:[.,]\d+)?)\s*kg/i)
    if (ratioMatch) {
        const numerator = Number(ratioMatch[1].replace(',', '.'))
        const denominatorKg = Number(ratioMatch[3].replace(',', '.'))
        if (Number.isFinite(numerator) && Number.isFinite(denominatorKg) && denominatorKg > 0) {
            return {
                numericStr: String(numerator / denominatorKg),
                unit: ratioMatch[2].trim().toLowerCase(),
                perKg: true,
            }
        }
    }
    const match = dose.match(/(\d+(?:[.,]\d+)?)\s*([a-zA-ZÀ-ÿ%µ./()]+)?/i)
    if (!match) return null
    const rawUnit = String(match[2] || '').trim()
    const perKg = /\/\s*kg/i.test(dose) || /\/\s*kg/i.test(rawUnit)
    const unit = rawUnit
        .replace(/\/\s*kg/ig, '')
        .replace(/\(s\)/ig, '')
        .replace(/\./g, '')
        .trim()
    return {
        numericStr: match[1].replace(',', '.'),
        unit: (unit || 'mg').toLowerCase().replace('ui', 'ui').replace('iu', 'ui'),
        perKg,
    }
}

function normalizeLooseText(value: string): string {
    return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
}

function parseFrequencyFromText(raw?: string): {
    frequencyType: 'timesPerDay' | 'everyHours'
    frequencyToken: '' | 'SID' | 'BID' | 'TID' | 'QID'
    timesPerDay: string
    everyHours: string
} {
    const value = normalizeLooseText(raw || '')
    if (!value) return { frequencyType: 'timesPerDay', frequencyToken: '', timesPerDay: '1', everyHours: '' }

    const everyHoursMatch = value.match(/a cada\s*(\d+(?:[.,]\d+)?)\s*h/)
    if (everyHoursMatch) {
        return { frequencyType: 'everyHours', frequencyToken: '', timesPerDay: '', everyHours: everyHoursMatch[1].replace(',', '.') }
    }

    const timesPerDayMatch = value.match(/(\d+)\s*x\s*ao\s*dia|(\d+)\s*vez(?:es)?\s*(?:por|ao)\s*dia/)
    if (timesPerDayMatch) {
        const times = timesPerDayMatch[1] || timesPerDayMatch[2] || '1'
        return { frequencyType: 'timesPerDay', frequencyToken: '', timesPerDay: times, everyHours: '' }
    }

    if (value.includes('q24') || value.includes('sid') || value.includes('uma vez')) {
        return { frequencyType: 'timesPerDay', frequencyToken: 'SID', timesPerDay: '1', everyHours: '' }
    }
    if (value.includes('q12') || value.includes('bid')) {
        return { frequencyType: 'timesPerDay', frequencyToken: 'BID', timesPerDay: '2', everyHours: '' }
    }
    if (value.includes('q8') || value.includes('tid')) {
        return { frequencyType: 'timesPerDay', frequencyToken: 'TID', timesPerDay: '3', everyHours: '' }
    }
    if (value.includes('q6') || value.includes('qid')) {
        return { frequencyType: 'timesPerDay', frequencyToken: 'QID', timesPerDay: '4', everyHours: '' }
    }

    return { frequencyType: 'timesPerDay', frequencyToken: '', timesPerDay: '1', everyHours: '' }
}

function parseStructuredFrequency(item: {
    frequency?: string
    frequencyMode?: 'times_per_day' | 'interval_hours'
    timesPerDay?: number
    intervalHours?: number
}): {
    frequencyType: 'timesPerDay' | 'everyHours'
    frequencyToken: '' | 'SID' | 'BID' | 'TID' | 'QID'
    timesPerDay: string
    everyHours: string
} {
    if (item.frequencyMode === 'interval_hours' && item.intervalHours && item.intervalHours > 0) {
        return {
            frequencyType: 'everyHours',
            frequencyToken: '',
            timesPerDay: '',
            everyHours: String(item.intervalHours),
        }
    }

    const structuredTimes = Number(item.timesPerDay)
    if (item.frequencyMode === 'times_per_day' && Number.isFinite(structuredTimes) && structuredTimes > 0) {
        const frequencyToken =
            structuredTimes === 1 ? 'SID'
                : structuredTimes === 2 ? 'BID'
                    : structuredTimes === 3 ? 'TID'
                        : structuredTimes === 4 ? 'QID'
                            : ''

        return {
            frequencyType: 'timesPerDay',
            frequencyToken,
            timesPerDay: String(structuredTimes),
            everyHours: '',
        }
    }

    return parseFrequencyFromText(item.frequency)
}

function parseDurationFromText(raw?: string): {
    durationDays: string
    continuousUse: boolean
    untilFinished: boolean
} {
    const value = normalizeLooseText(raw || '')
    if (!value) return { durationDays: '', continuousUse: false, untilFinished: false }

    if (value.includes('uso continuo')) {
        return { durationDays: '', continuousUse: true, untilFinished: false }
    }
    if (value.includes('ate terminar') || value.includes('ate acabar')) {
        return { durationDays: '', continuousUse: false, untilFinished: true }
    }

    const daysMatch = value.match(/(\d+)\s*dias?/)
    if (daysMatch) return { durationDays: daysMatch[1], continuousUse: false, untilFinished: false }

    const genericNumber = value.match(/(\d+)/)
    if (genericNumber) return { durationDays: genericNumber[1], continuousUse: false, untilFinished: false }

    return { durationDays: '', continuousUse: false, untilFinished: false }
}

function resolveStructuredDuration(item: NovaReceita2State['items'][number]) {
    if (item.durationMode === 'continuous_until_recheck') {
        return { durationDays: '', continuousUse: false, untilFinished: false, durationMode: item.durationMode }
    }
    if (item.durationMode === 'continuous_use') {
        return { durationDays: '', continuousUse: true, untilFinished: false, durationMode: item.durationMode }
    }
    if (item.durationMode === 'until_finished') {
        return { durationDays: '', continuousUse: false, untilFinished: true, durationMode: item.durationMode }
    }
    if (item.durationMode === 'until_recheck') {
        return { durationDays: '', continuousUse: false, untilFinished: false, durationMode: item.durationMode }
    }
    if (item.durationValue && item.durationValue > 0) {
        const normalizedUnit = String(item.durationUnit || 'dias').trim().toLowerCase()
        const multiplier = normalizedUnit.startsWith('semana') ? 7 : normalizedUnit.startsWith('mes') ? 30 : 1
        return {
            durationDays: String(item.durationValue * multiplier),
            continuousUse: false,
            untilFinished: false,
            durationMode: item.durationMode || 'fixed_days',
        }
    }
    const parsed = parseDurationFromText(item.duration)
    return {
        ...parsed,
        durationMode: item.durationMode || (parsed.continuousUse ? 'continuous_use' : parsed.untilFinished ? 'until_finished' : parsed.durationDays ? 'fixed_days' : 'until_recheck'),
    }
}

// =====================================================================
// FIX CRÍTICO: mapear route string livre -> RouteGroup enum
// rxRenderer agrupa itens por routeGroup. Sem o enum correto,
// os itens não aparecem em nenhuma section do PrintDoc.
// =====================================================================
function routeStringToGroup(route?: string): RouteGroup {
    if (!route) return 'ORAL'
    const r = route.toLowerCase().trim()

    if (r === 'oral' || r === 'vo' || r.includes('oral') || r.includes('boca')) return 'ORAL'
    if (r === 'sc' || r.includes('subcut') || r.includes('subcutâneo')) return 'SC'
    if (r === 'im' || r.includes('intramuscular') || r.includes('muscular')) return 'IM'
    if (r === 'iv' || r.includes('intravenoso') || r.includes('endovenoso')) return 'IV'
    if (r.includes('tópic') || r.includes('topic') || r.includes('cutâneo')) return 'TOPICO'
    if (r.includes('oftal') || r.includes('ocular') || r.includes('olho')) return 'OFTALMICO'
    if (r.includes('otol') || r.includes('auric') || r.includes('ouvid')) return 'OTOLOGICO'
    if (r.includes('nasal') || r.includes('intranasal')) return 'INTRANASAL'
    if (r.includes('retal') || r.includes('reto')) return 'RETAL'
    if (r.includes('inalat') || r.includes('nebuliz')) return 'INALATORIO'
    if (r.includes('transderm')) return 'TRANSDERMICO'

    return 'OUTROS'
}

// Formatar título do item incluindo concentração e nome comercial
function buildItemTitle(item: {
    name: string
    concentration_text?: string
    commercial_name?: string
    pharmaceutical_form?: string
}): string {
    const parts: string[] = [item.name]

    if (item.concentration_text) {
        parts.push(item.concentration_text)
    }

    if (item.commercial_name) {
        parts.push(`(${item.commercial_name})`)
    }

    return parts.join(' ')
}

// Formatar subtitle com dados da apresentação
function buildItemSubtitle(item: {
    pharmaceutical_form?: string
    presentation_label?: string
    package_quantity?: string
    package_unit?: string
}): string {
    const parts: string[] = []

    const form = item.pharmaceutical_form || item.presentation_label
    if (form) parts.push(form)

    if (item.package_quantity && item.package_unit) {
        parts.push(`Emb: ${item.package_quantity} ${item.package_unit}`)
    }

    return parts.join(' • ')
}

// Formatar instruction combinando dose/route/frequency/duration ou usar manual
function buildItemInstruction(item: {
    instructions?: string
    dose?: string
    route?: string
    frequency?: string
    duration?: string
}): string {
    // Priorizar instruction manual se preenchida
    if (item.instructions && item.instructions.trim()) {
        return item.instructions.trim()
    }

    // Montar automático
    const parts: string[] = []
    if (item.dose) parts.push(`Dose: ${item.dose}`)
    if (item.route) parts.push(`Via: ${item.route}`)
    if (item.frequency) parts.push(item.frequency)
    if (item.duration) parts.push(`por ${item.duration}`)

    if (parts.length > 0) return parts.join(' • ')

    return 'Preencher instruções'
}

function resolvePresentationConcentration(item: NovaReceita2State['items'][number]): string {
    return buildPresentationConcentrationText({
        concentration_text: item.concentration_text,
        value: item.value,
        value_unit: item.value_unit,
        per_value: item.per_value,
        per_unit: item.per_unit,
        metadata: item.presentation_metadata || undefined,
    })
}

function buildCompoundedPresentationLabel(item: Extract<NovaReceita2State['items'][number], { kind: 'compounded' }>): string {
    return [
        item.compounded_snapshot?.pharmaceutical_form || item.pharmaceutical_form || '',
        item.compounded_snapshot?.qsp_text || item.compounded_snapshot?.quantity_text || item.presentation_label || '',
        item.compounded_snapshot?.flavor ? `Sabor ${item.compounded_snapshot.flavor}` : '',
    ].filter(Boolean).join(' • ')
}

function buildCompoundedConcentration(item: Extract<NovaReceita2State['items'][number], { kind: 'compounded' }>): string {
    const regimen = item.compounded_regimen_snapshot
    if (regimen?.concentration_value && regimen?.concentration_unit) {
        const perValue = regimen.concentration_per_value || 1
        const perUnit = regimen.concentration_per_unit || 'mL'
        return `${regimen.concentration_value} ${regimen.concentration_unit}/${perValue} ${perUnit}`.replace('/1 ', '/')
    }
    return toSafeString(item.concentration_text)
}

export function buildPrescriptionStateFromNovaReceita2(state: NovaReceita2State): PrescriptionState {
    const now = new Date().toISOString()

    const mappedItems = state.items.map(item => {
        const routeGroup = routeStringToGroup(item.route)
        const inheritStart = item.inheritStartFromPrescription !== false
        const effectiveStartDate = inheritStart ? state.defaultStartDate : (item.startDate || '')
        const effectiveStartHour = inheritStart ? state.defaultStartHour : (item.startHour || '')
        // FIX: subtitle apenas para presentation (forma + embalagem + preço)
        const compoundedCalculation = item.kind === 'compounded'
            ? getCompoundedCalculationSummary(item, state.patient)
            : null
        const subtitle =
            item.kind === 'compounded'
                ? (buildCompoundedCardSubtitle(item, state.patient) || buildCompoundedPresentationLabel(item))
                : buildItemSubtitle(item) || item.pharmaceutical_form || item.presentation_label
        // FIX: pre-build a instrução e sempre usar (nunca deixar o renderer substituir
        // por buildAutoInstruction que não consegue parsear dose livre "10 mg/kg")
        const manualInstruction = item.kind === 'compounded'
            ? buildCompoundedInstruction(item, state.patient)
            : toSafeString(item.instructions).trim()
        const hasManualInstruction = manualInstruction.length > 0

        // FIX G: parsear dose livre para campos estruturados (doseValue numérico + doseUnit)
        // Permite que calculateMedicationQuantity exiba "Dose calculada: X mg / Volume: Y mL"
        const parsedDose = item.kind === 'compounded'
            ? (
                compoundedCalculation?.mode === 'weight_based'
                    ? parseDoseString(toSafeString(compoundedCalculation?.doseDescriptorText))
                    : parseDoseString(toSafeString(compoundedCalculation?.perAdministrationText || item.dose))
            )
            : parseDoseString(toSafeString(item.dose))
        const doseValue = parsedDose ? parsedDose.numericStr : toSafeString(item.dose)
        const doseUnit = parsedDose
            ? parsedDose.perKg ? `${parsedDose.unit}/kg` : parsedDose.unit
            : ''
        const frequency = parseStructuredFrequency(item)
        const duration = resolveStructuredDuration(item)
        const legacyStart =
            effectiveStartDate && effectiveStartHour
                ? `${effectiveStartDate}T${effectiveStartHour}:00`
                : effectiveStartDate || effectiveStartHour || item.start_date

        // FIX A3: garantir que concentration_text nunca seja objeto/número
        const concentrationSafe = item.kind === 'compounded'
            ? buildCompoundedConcentration(item)
            : toSafeString(resolvePresentationConcentration(item) || item.concentration_text)
        // FIX A3: garantir que weight_kg do patient seja sempre string
        // (Supabase pode retornar como number dependendo da versão do schema)

        if (import.meta.env.DEV) {
            console.log('[novaReceita2Adapter] item mapped', {
                id: item.id,
                name: item.name,
                concentration: concentrationSafe,
                commercial: item.commercial_name,
                routeGroup,
                doseValue,
                doseUnit,
                instruction: manualInstruction.slice(0, 60),
            })
        }

        return {
            id: item.id,
            category: 'medication' as const,
            catalogDrugId: item.kind === 'standard' ? item.medication_id || '' : '',
            controlled: !!item.is_controlled,
            // FIX: colocar APENAS nome do fármaco em name;
            // o renderer (rxRenderer.buildItemTitle) concatena name + concentration + commercialName.
            name: item.name,
            presentation: subtitle,    // subtitle: forma + embalagem + preço
            concentration: concentrationSafe,
            commercialName: toSafeString(item.commercial_name),
            pharmaceuticalForm: toSafeString(
                item.kind === 'compounded'
                    ? item.compounded_snapshot?.pharmaceutical_form || item.pharmaceutical_form
                    : item.pharmaceutical_form
            ),
            presentationValue: toSafeString(item.value),
            presentationValueUnit: toSafeString(item.value_unit),
            presentationPerValue: toSafeString(item.per_value),
            presentationPerUnit: toSafeString(item.per_unit),
            presentationMetadata: item.presentation_metadata || null,
            pharmacyType: 'veterinária' as const,
            packageType: 'frasco' as const,
            pharmacyName: '',
            observations: '',
            routeGroup,
            doseValue,
            doseUnit,
            // FIX: autoInstruction = false + manualEdited = true para que o renderer
            // use SEMPRE a instrução pre-construída pelo adapter (buildItemInstruction)
            autoInstruction: !hasManualInstruction,
            frequencyType: frequency.frequencyType,
            frequencyToken: frequency.frequencyToken,
            timesPerDay: frequency.timesPerDay,
            everyHours: frequency.everyHours,
            durationDays: duration.durationDays,
            durationMode: duration.durationMode,
            untilFinished: duration.untilFinished,
            continuousUse: duration.continuousUse,
            instruction: manualInstruction,
            manualEdited: hasManualInstruction,
            titleBold: false,
            titleUnderline: false,
            cautions: item.kind === 'compounded'
                ? buildCompoundedPreviewCautions(item, state.patient)
                : [
                    ...(item.cautions || []),
                ],
            startDate: effectiveStartDate,
            startHour: effectiveStartHour,
            inheritStartFromPrescription: inheritStart,
            start_date: legacyStart,
            createdAt: now,
            updatedAt: now,
        }
    })

    return {
        id: state.id,
        updatedAt: now,
        prescriber: {
            profileId: state.prescriber?.id || '',
            adminId: '',
            name: state.prescriber?.name || '',
            crmv: state.prescriber?.crmv || '',
            clinicName: '',
        },
        tutor: {
            tutorRecordId: state.tutor?.id || '',
            name: state.tutor?.name || '',
            fullName: state.tutor?.name || '',
            full_name: state.tutor?.name || '',
            phone: state.tutor?.phone || '',
            email: state.tutor?.email || '',
            documentId: state.tutor?.cpf || '',
            document_id: state.tutor?.cpf || '',
            cpf: state.tutor?.cpf || '',
            rg: state.tutor?.rg || '',
            street: state.tutor?.street || '',
            number: state.tutor?.number || '',
            complement: state.tutor?.complement || '',
            neighborhood: state.tutor?.neighborhood || '',
            city: state.tutor?.city || '',
            state: state.tutor?.state || '',
            zipcode: state.tutor?.zipcode || '',
            notes: state.tutor?.notes || '',
        },
        patient: {
            patientRecordId: state.patient?.id || '',
            name: state.patient?.name || '',
            species: (state.patient?.species as any) || 'Canina',
            breed: state.patient?.breed || '',
            sex: (state.patient?.sex as any) || 'Sem dados',
            reproductiveStatus: (state.patient?.reproductive_condition as any) || 'Sem dados',
            ageText: state.patient?.age_text || '',
            birthDate: '',
            color: state.patient?.coat || '',
            coat: state.patient?.coat || '',
            weightKg: toSafeString(state.patient?.weight_kg),
            weightDate: '',
            anamnesis: state.patient?.anamnesis || '',
            notes: state.patient?.notes || '',
            showNotesInPrint: false,
        },
        items: mappedItems,
        recommendations: {
            bullets: state.recommendations
                ? state.recommendations.split('\n').filter(Boolean)
                : [],
            exams: state.exams || [],
            customExams: [],
            examReasons: state.examJustification ? state.examJustification.split('\n').filter(Boolean) : [],
            waterMlPerDay: '',
            specialControlPharmacy: 'veterinária' as const,
            standardTemplateId: state.printTemplateId || state.templateId || '',
            specialControlTemplateId: '',
        }
    }
}

export function buildPrintDocFromNovaReceita2(
    state: NovaReceita2State,
    _template?: Partial<RxTemplateStyle>
): PrintDoc {
    const docs = buildPrintDocsFromNovaReceita2(state, _template)
    return docs[0]
}

export function buildPrintDocsFromNovaReceita2(
    state: NovaReceita2State,
    _template?: Partial<RxTemplateStyle>
): PrintDoc[] {
    const rxState = buildPrescriptionStateFromNovaReceita2(state)
    const split = splitPrescriptionByControl(rxState)
    const docs: PrintDoc[] = []

    if (split.standard) docs.push(renderRxToPrintDoc(split.standard, { documentKind: 'standard' }))
    if (split.specialControl) docs.push(renderRxToPrintDoc(split.specialControl, { documentKind: 'special-control' }))
    if (!docs.length) docs.push(renderRxToPrintDoc(rxState, { documentKind: 'standard' }))

    // Formatar endereço do tutor em uma linha (sem microchip)
    const tutorAddressLine = [
        state.tutor?.street,
        state.tutor?.number,
        state.tutor?.complement,
        state.tutor?.neighborhood,
        state.tutor?.city && state.tutor?.state
            ? `${state.tutor.city}/${state.tutor.state}`
            : state.tutor?.city || state.tutor?.state,
        state.tutor?.zipcode,
        state.tutor?.phone,
    ].filter(Boolean).join(', ')

    for (const doc of docs) {
        doc.addressLine = tutorAddressLine || ''
    }

    return docs
}
