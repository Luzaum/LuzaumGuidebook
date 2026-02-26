// novaReceita2Adapter.ts
// Converte NovaReceita2State -> PrescriptionState -> PrintDoc
// para uso com rxRenderer e RxPrintView

import type { NovaReceita2State, PrescriptionItem } from './NovaReceita2Page'
import type { PrescriptionState, RouteGroup, PrintDoc } from './rxTypes'
import { renderRxToPrintDoc, splitPrescriptionByControl } from './rxRenderer'
import type { RxTemplateStyle } from './rxDb'

// =====================================================================
// Garante que valores numéricos do DB/sessionStorage
// chegam ao renderer sempre como string (nunca como number/object).
// =====================================================================

/** Converte qualquer valor para string segura (nunca undefined/null/object) */
function toSafeString(v: unknown): string {
    if (v == null) return ''
    if (typeof v === 'string') return v
    if (typeof v === 'number') return String(v)
    return ''
}

// =====================================================================
// A2: Conversão de frequência para texto leigo em horas
// =====================================================================
function frequencyToText(freq: string): string {
    if (!freq) return ''
    const f = freq.toLowerCase().trim()
    // Contínuo
    if (f.includes('contínuo') || f.includes('continuo') || f === 'uso contínuo') return 'uso contínuo'
    if (f.includes('dose única') || f.includes('dose unica')) return 'dose única'
    // Tokens padrão
    if (f === 'sid (1x ao dia)' || f === '1x ao dia' || f === 'q24h') return '1 vez ao dia'
    if (f === 'bid (12/12h)' || f === '2x ao dia' || f === 'q12h') return 'a cada 12 horas'
    if (f === 'tid (8/8h)' || f === '3x ao dia' || f === 'q8h') return 'a cada 8 horas'
    if (f === 'qid (6/6h)' || f === '4x ao dia' || f === 'q6h') return 'a cada 6 horas'
    if (f === '5x ao dia') return 'a cada ~5 horas'
    if (f === '6x ao dia' || f === 'q4h') return 'a cada 4 horas'
    if (f === '8x ao dia') return 'a cada 3 horas'
    if (f === '12x ao dia' || f === 'q2h') return 'a cada 2 horas'
    if (f === '24x ao dia' || f === 'q1h') return 'a cada 1 hora'
    if (f === 'q1h') return 'a cada 1 hora'
    if (f === 'q2h') return 'a cada 2 horas'
    if (f === 'q4h') return 'a cada 4 horas'
    if (f === 'q6h') return 'a cada 6 horas'
    if (f === 'q8h') return 'a cada 8 horas'
    if (f === 'q12h') return 'a cada 12 horas'
    // Fallback — retorna o texto original limpo
    return freq
}

// =====================================================================
// A2: Conversão de via de administração para texto por extenso
// =====================================================================
function routeToFullText(route: string): string {
    if (!route) return ''
    const r = route.trim()
    // Exact match (case-insensitive)
    const rUp = r.toUpperCase()
    if (rUp === 'VO' || rUp === 'ORAL') return 'oral'
    if (rUp === 'SC') return 'subcutânea'
    if (rUp === 'IM') return 'intramuscular'
    if (rUp === 'IV') return 'intravenosa'
    if (rUp === 'TÓPICO' || rUp === 'TOPICO') return 'tópica'
    if (rUp === 'OFTÁLMICO' || rUp === 'OFTALMICO') return 'oftálmica'
    if (rUp === 'OTOLÓGICO' || rUp === 'OTOLOGICO') return 'otológica'
    if (rUp === 'INTRANASAL') return 'intranasal'
    if (rUp === 'RETAL') return 'retal'
    if (rUp === 'INALATÓRIO' || rUp === 'INALATORIO') return 'inalatória'
    if (rUp === 'TRANSDÉRMICO' || rUp === 'TRANSDERMICO') return 'transdérmica'
    // Prefix match
    const rLow = r.toLowerCase()
    if (rLow.startsWith('oral') || rLow.startsWith('vo ')) return 'oral'
    if (rLow.startsWith('sc ') || rLow.startsWith('subcut')) return 'subcutânea'
    if (rLow.startsWith('im ') || rLow.startsWith('intra musc') || rLow.startsWith('intramuscular')) return 'intramuscular'
    if (rLow.startsWith('iv ') || rLow.startsWith('intravenosa') || rLow.startsWith('endoven')) return 'intravenosa'
    // Fallback — retorna o texto original em minúscula
    return r.toLowerCase()
}

// =====================================================================
// A2: Derivar unidade da apresentação a partir da forma farmacêutica
// =====================================================================
function presentationUnit(item: PrescriptionItem): string {
    const form = (item.pharmaceutical_form || item.presentation_label || '').toLowerCase()
    if (form.includes('comprimido')) return 'comprimido(s)'
    if (form.includes('cápsula') || form.includes('capsul')) return 'cápsula(s)'
    if (form.includes('gotas') || form.includes('gota')) return 'gotas'
    if (form.includes('injetável') || form.includes('injetavel')) return 'mL'
    if (form.includes('suspensão') || form.includes('suspensao')) return 'mL'
    if (form.includes('solução') || form.includes('solucao') || form.includes('xarope')) return 'mL'
    if (form.includes('colírio') || form.includes('colirio')) return 'gotas'
    if (form.includes('pomada') || form.includes('creme') || form.includes('gel')) return 'g'
    if (form.includes('spray')) return 'aplicação(ões)'
    if (form.includes('shampoo') || form.includes('loção') || form.includes('locao')) return 'mL'
    if (form.includes('inalat') || form.includes('nebuliz')) return 'mL'
    // Fallback: package_unit ou value_unit do item
    if (item.package_unit) return item.package_unit
    if (item.value_unit) return item.value_unit
    return ''
}

// =====================================================================
// FIX CRÍTICO: mapear route string livre -> RouteGroup enum
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

// =====================================================================
// A1: Construir Linha 1 completa do item
// Formato: "Nome Concentração (Nome Comercial) – Forma Farmacêutica"
// Tudo em `name`; deixar concentration/commercialName vazios para o
// rxRenderer não acrescentar nada extra.
// =====================================================================
function buildLineOneTitle(item: PrescriptionItem, concentrationSafe: string): string {
    const parts: string[] = [item.name]
    if (concentrationSafe) parts.push(concentrationSafe)
    if (item.commercial_name) parts.push(`(${item.commercial_name})`)
    const form = item.pharmaceutical_form || item.presentation_label
    if (form) parts.push(`– ${form}`)
    return parts.join(' ')
}

// =====================================================================
// A2: Construir Linha 2+ da instrução (leiga-friendly)
// =====================================================================
function buildItemInstruction(item: PrescriptionItem): string {
    const parts: string[] = []

    // Derivar unidade de administração da forma farmacêutica
    const unit = presentationUnit(item)
    const freqText = frequencyToText(item.frequency || '')
    const routeText = routeToFullText(item.route || '')
    const isContinuous = freqText === 'uso contínuo'
        || (item.duration || '').toLowerCase().includes('contínuo')
        || (item.duration || '').toLowerCase().includes('continuo')

    // Linha 2: "Administrar X comprimido(s) por via oral, a cada 12 horas, por 7 dias"
    const adminPart: string[] = []

    if (item.dose) {
        // dose + unidade derivada (ex: "10 mg/kg" → "10 mg/kg comprimido(s)")
        // Se a unidade já está implícita no dose, não duplicar
        adminPart.push(`Administrar ${item.dose}${unit && !item.dose.toLowerCase().includes(unit.replace('(s)', '').replace('(ões)', '')) ? ` ${unit}` : ''}`)
    } else if (unit) {
        adminPart.push(`Administrar conforme orientação clínica (${unit})`)
    } else {
        adminPart.push('Administrar conforme orientação clínica')
    }

    if (routeText) adminPart.push(`por via ${routeText}`)

    if (freqText === 'dose única') {
        adminPart.push('em dose única')
    } else if (freqText === 'uso contínuo') {
        adminPart.push('em uso contínuo')
    } else if (freqText) {
        adminPart.push(freqText)
    }

    if (!isContinuous && item.duration && !item.duration.toLowerCase().includes('dose única')) {
        // Normalizar duração: "7 dias" → "por 7 dias"
        const dur = item.duration.trim()
        adminPart.push(dur.toLowerCase().startsWith('por ') ? dur : `por ${dur}`)
    }

    parts.push(adminPart.join(', ') + '.')

    // Linha 3: Iniciar em DD/MM às HH:MM
    if (item.start_date && item.start_date.trim()) {
        parts.push(`Iniciar em ${item.start_date.trim()}`)
    } else {
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        parts.push(`Iniciar em ${dd}/${mm} às __:__`)
    }

    // Linha 4: Instrução extra livre
    if (item.instructions && item.instructions.trim()) {
        parts.push(item.instructions.trim())
    }

    return parts.join('\n')
}

export function buildPrescriptionStateFromNovaReceita2(state: NovaReceita2State): PrescriptionState {
    const now = new Date().toISOString()

    const mappedItems = state.items.map(item => {
        const routeGroup = routeStringToGroup(item.route)

        // A1: Garantir que concentration_text nunca seja objeto/número
        const concentrationSafe = toSafeString(item.concentration_text)

        // A1: Título completo na linha 1 — tudo em `name`, concentration/commercialName vazios
        const displayName = buildLineOneTitle(item, concentrationSafe)

        // Subtitle: embalagem + preço (não inclui a forma — já está no título)
        const subtitleParts: string[] = []
        if (item.package_quantity && item.package_unit) {
            subtitleParts.push(`Emb: ${item.package_quantity} ${item.package_unit}`)
        }
        if (item.avg_price_brl && item.avg_price_brl > 0) {
            subtitleParts.push(`R$ ${item.avg_price_brl.toFixed(2)}`)
        }
        const subtitle = subtitleParts.join(' • ')

        // A2: Instrução leiga-friendly
        const instruction = buildItemInstruction(item)

        // Dose estruturado para rxRenderer (não exibe "Dose calculada" na receita — apenas para cálculo)
        const doseRaw = toSafeString(item.dose)

        if (import.meta.env.DEV) {
            console.log('[novaReceita2Adapter] item', {
                id: item.id,
                displayName,
                routeGroup,
                instruction: instruction.slice(0, 80),
            })
        }

        return {
            id: item.id,
            category: 'medication' as const,
            catalogDrugId: item.medication_id || '',
            controlled: item.is_controlled || false,
            // A1: título completo em `name`; concentration/commercialName vazios para evitar duplicação
            name: displayName,
            presentation: subtitle,
            concentration: '',
            commercialName: '',
            pharmacyType: 'veterinária' as const,
            packageType: 'frasco' as const,
            pharmacyName: '',
            observations: '',
            routeGroup,
            doseValue: doseRaw,
            doseUnit: '',
            // Usar instrução pré-construída pelo adapter (não usar buildAutoInstruction do renderer)
            autoInstruction: false,
            frequencyType: 'timesPerDay' as const,
            frequencyToken: '' as '' | 'SID' | 'BID' | 'TID' | 'QID',
            timesPerDay: '1',
            everyHours: '',
            durationDays: '',
            untilFinished: false,
            continuousUse: false,
            instruction,
            manualEdited: true,
            titleBold: false,
            titleUnderline: false,
            cautions: item.cautions || [],
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
            clinicName: state.prescriber?.clinicName || '',
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
            examReasons: [],
            waterMlPerDay: '',
            specialControlPharmacy: 'veterinária' as const,
            standardTemplateId: state.templateId || '',
            specialControlTemplateId: state.controlledTemplateId || '',
        }
    }
}

export function buildPrintDocsFromNovaReceita2(
    state: NovaReceita2State,
    _template?: Partial<RxTemplateStyle>
): { standard: PrintDoc | null; specialControl: PrintDoc | null } {
    const rxState = buildPrescriptionStateFromNovaReceita2(state)
    const split = splitPrescriptionByControl(rxState)

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

    let standardDoc: PrintDoc | null = null
    if (split.standard) {
        standardDoc = renderRxToPrintDoc(split.standard, { documentKind: 'standard' })
        standardDoc.addressLine = tutorAddressLine || ''
    }

    let specialControlDoc: PrintDoc | null = null
    if (split.specialControl) {
        specialControlDoc = renderRxToPrintDoc(split.specialControl, { documentKind: 'special-control' })
        specialControlDoc.addressLine = tutorAddressLine || ''
    }

    // Fallback if empty
    if (!standardDoc && !specialControlDoc) {
        standardDoc = renderRxToPrintDoc(rxState, { documentKind: 'standard' })
        standardDoc.addressLine = tutorAddressLine || ''
    }

    return { standard: standardDoc, specialControl: specialControlDoc }
}
