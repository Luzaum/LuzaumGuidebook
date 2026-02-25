// novaReceita2Adapter.ts
// Converte NovaReceita2State -> PrescriptionState -> PrintDoc
// para uso com rxRenderer e RxPrintView

import type { NovaReceita2State } from './NovaReceita2Page'
import type { PrescriptionState, RouteGroup, PrintDoc } from './rxTypes'
import { renderRxToPrintDoc } from './rxRenderer'
import type { RxTemplateStyle } from './rxDb'

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
    avg_price_brl?: number
    package_quantity?: string
    package_unit?: string
}): string {
    const parts: string[] = []

    const form = item.pharmaceutical_form || item.presentation_label
    if (form) parts.push(form)

    if (item.package_quantity && item.package_unit) {
        parts.push(`Emb: ${item.package_quantity} ${item.package_unit}`)
    }

    if (item.avg_price_brl && item.avg_price_brl > 0) {
        parts.push(`R$ ${item.avg_price_brl.toFixed(2)}`)
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

export function buildPrescriptionStateFromNovaReceita2(state: NovaReceita2State): PrescriptionState {
    const now = new Date().toISOString()

    const mappedItems = state.items.map(item => {
        const routeGroup = routeStringToGroup(item.route)
        // FIX: subtitle apenas para presentation (forma + embalagem + preço)
        const subtitle = buildItemSubtitle(item)
        // FIX: pre-build a instrução e sempre usar (nunca deixar o renderer substituir
        // por buildAutoInstruction que não consegue parsear dose livre "10 mg/kg")
        const instruction = buildItemInstruction(item)

        if (import.meta.env.DEV) {
            console.log('[novaReceita2Adapter] item mapped', {
                id: item.id,
                name: item.name,
                concentration: item.concentration_text,
                commercial: item.commercial_name,
                routeGroup,
                instruction: instruction.slice(0, 60),
            })
        }

        return {
            id: item.id,
            category: 'medication' as const,
            catalogDrugId: item.medication_id || '',
            controlled: false,
            // FIX: colocar APENAS nome do fármaco em name;
            // o renderer (rxRenderer.buildItemTitle) concatena name + concentration + commercialName.
            // Antes estava sendo colocado o título completo, gerando duplicação.
            name: item.name,
            presentation: subtitle,    // subtitle: forma + embalagem + preço
            concentration: item.concentration_text || '',
            commercialName: item.commercial_name || '',
            pharmacyType: 'veterinária' as const,
            packageType: 'frasco' as const,
            pharmacyName: '',
            observations: '',
            routeGroup,
            doseValue: item.dose || '',
            doseUnit: '',
            // FIX: autoInstruction = false + manualEdited = true para que o renderer
            // use SEMPRE a instrução pre-construída pelo adapter (buildItemInstruction)
            // e nunca tente chamar buildAutoInstruction com dados livres não estruturados.
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
            weightKg: state.patient?.weight_kg || '',
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
            specialControlTemplateId: '',
        }
    }
}

export function buildPrintDocFromNovaReceita2(
    state: NovaReceita2State,
    _template?: Partial<RxTemplateStyle>
): PrintDoc {
    const rxState = buildPrescriptionStateFromNovaReceita2(state)
    const doc = renderRxToPrintDoc(rxState)

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

    doc.addressLine = tutorAddressLine || ''

    return doc
}
