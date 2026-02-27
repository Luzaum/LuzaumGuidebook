// novaReceita2Adapter.ts
// Converte NovaReceita2State -> PrescriptionState -> PrintDoc
// para uso com rxRenderer e RxPrintView

import type { NovaReceita2State } from './NovaReceita2Page'
import type { PrescriptionState, RouteGroup, PrintDoc } from './rxTypes'
import { renderRxToPrintDoc } from './rxRenderer'
import type { RxTemplateStyle } from './rxDb'

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
    // Aceita: "10 mg/kg", "0,5 mg/kg BID", "25 mg", "0.5 ml/kg", "10 mcg/kg"
    const match = dose.match(/(\d+(?:[.,]\d+)?)\s*(mg|mcg|g|ml|mL|UI|IU|u\.?i\.?)(?:\/kg)?/i)
    if (!match) return null
    const perKg = /\/kg/i.test(dose)
    return {
        numericStr: match[1].replace(',', '.'),
        unit: match[2].toLowerCase().replace('ui', 'ui').replace('iu', 'ui'),
        perKg,
    }
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
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
    if (r.indexOf('inalat') >= 0 || r.indexOf('nebuliz') >= 0) return 'INALATORIO'
    if (r.indexOf('transderm') >= 0) return 'TRANSDERMICO'

    return 'OUTROS'
}

<<<<<<< Updated upstream
// Formatar título do item incluindo concentração e nome comercial
function buildItemTitle(item: {
    name: string
    concentration_text?: string
    commercial_name?: string
    pharmaceutical_form?: string
}): string {
=======
function parseFrequency(freq: string) {
    if (!freq) return { frequencyType: 'timesPerDay' as const, frequencyToken: '' as any, timesPerDay: '', everyHours: '' }

    const normalized = freq.toLowerCase().trim()
    if (normalized === 'sid' || normalized === '1x ao dia' || normalized === 'q24h') {
        return { frequencyType: 'timesPerDay' as const, frequencyToken: 'SID' as const, timesPerDay: '1', everyHours: '' }
    }
    if (normalized === 'bid' || normalized === '2x ao dia' || normalized === 'q12h') {
        return { frequencyType: 'timesPerDay' as const, frequencyToken: 'BID' as const, timesPerDay: '2', everyHours: '' }
    }
    if (normalized === 'tid' || normalized === '3x ao dia' || normalized === 'q8h') {
        return { frequencyType: 'timesPerDay' as const, frequencyToken: 'TID' as const, timesPerDay: '3', everyHours: '' }
    }
    if (normalized === 'qid' || normalized === '4x ao dia' || normalized === 'q6h') {
        return { frequencyType: 'timesPerDay' as const, frequencyToken: 'QID' as const, timesPerDay: '4', everyHours: '' }
    }

    if (freq.startsWith('q') && freq.endsWith('h')) {
        const hours = freq.replace('q', '').replace('h', '')
        return { frequencyType: 'everyHours' as const, frequencyToken: '' as any, timesPerDay: '', everyHours: hours }
    }

    const nxMatch = freq.match(/^(\d+)x/)
    if (nxMatch) {
        const times = Number(nxMatch[1])
        if ([1, 2, 3, 4, 6, 8, 12, 24].includes(times)) {
            return { frequencyType: 'everyHours' as const, frequencyToken: '' as any, timesPerDay: '', everyHours: String(24 / times) }
        }
        return { frequencyType: 'timesPerDay' as const, frequencyToken: '' as any, timesPerDay: nxMatch[1], everyHours: '' }
    }

    return { frequencyType: 'timesPerDay' as const, frequencyToken: '' as any, timesPerDay: '1', everyHours: '' }
}

function parseDuration(dur: string) {
    if (!dur) return { durationDays: '', continuousUse: false, untilFinished: false }

    const lower = dur.toLowerCase()
    if (lower.indexOf('contínu') >= 0 || lower.indexOf('continu') >= 0) {
        return { durationDays: '', continuousUse: true, untilFinished: false }
    }
    if (lower.indexOf('acabar') >= 0) {
        return { durationDays: '', continuousUse: false, untilFinished: true }
    }
    const match = dur.match(/(\d+)/)
    if (match) {
        return { durationDays: match[1], continuousUse: false, untilFinished: false }
    }
    return { durationDays: '', continuousUse: false, untilFinished: false }
}

// =====================================================================
// A1: Construir Linha 1 completa do item
// Formato: "Nome Concentração (Nome Comercial) – Forma Farmacêutica"
// Tudo em `name`; deixar concentration/commercialName vazios para o
// rxRenderer não acrescentar nada extra.
// =====================================================================
function buildLineOneTitle(item: PrescriptionItem, concentrationSafe: string): string {
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
=======
    // Mantém apenas instrução extra livre; a linha "Iniciar em" usa start_date próprio.
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
        // FIX G: parsear dose livre para campos estruturados (doseValue numérico + doseUnit)
        // Permite que calculateMedicationQuantity exiba "Dose calculada: X mg / Volume: Y mL"
        const parsedDose = parseDoseString(toSafeString(item.dose))
        const doseValue = parsedDose ? parsedDose.numericStr : toSafeString(item.dose)
        const doseUnit = parsedDose
            ? parsedDose.perKg ? `${parsedDose.unit}/kg` : parsedDose.unit
            : ''

        // FIX A3: garantir que concentration_text nunca seja objeto/número
        const concentrationSafe = toSafeString(item.concentration_text)
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
                instruction: instruction.slice(0, 60),
            })
=======
        let doseValue = item.doseValue || ''
        let doseUnit = item.doseUnit || ''
        if (!doseValue || !doseUnit) {
            const parsedDose = parseDoseString(toSafeString(item.dose))
            doseValue = parsedDose ? parsedDose.numericStr : toSafeString(item.dose)
            doseUnit = parsedDose ? (parsedDose.perKg ? `${parsedDose.unit}/kg` : parsedDose.unit) : ''
>>>>>>> Stashed changes
        }

        const { frequencyType, frequencyToken, timesPerDay, everyHours } = parseFrequency(item.frequency || '')
        const { durationDays, continuousUse, untilFinished } = parseDuration(item.duration || '')

        return {
            id: item.id,
            category: 'medication' as const,
            catalogDrugId: item.medication_id || '',
<<<<<<< Updated upstream
            controlled: false,
            // FIX: colocar APENAS nome do fármaco em name;
            // o renderer (rxRenderer.buildItemTitle) concatena name + concentration + commercialName.
            name: item.name,
            presentation: subtitle,    // subtitle: forma + embalagem + preço
            concentration: concentrationSafe,
            commercialName: toSafeString(item.commercial_name),
=======
            controlled: item.is_controlled || false,
            // A1: título completo em `name`;
            name: displayName,
            presentation: subtitle,
            concentration: concentrationSafe, // necessário para o rxRenderer calcular dose
            commercialName: '',
>>>>>>> Stashed changes
            pharmacyType: 'veterinária' as const,
            packageType: 'frasco' as const,
            pharmacyName: '',
            observations: '',
            routeGroup,
            doseValue,
            doseUnit,
<<<<<<< Updated upstream
            // FIX: autoInstruction = false + manualEdited = true para que o renderer
            // use SEMPRE a instrução pre-construída pelo adapter (buildItemInstruction)
            autoInstruction: false,
            frequencyType: 'timesPerDay' as const,
            frequencyToken: '' as '' | 'SID' | 'BID' | 'TID' | 'QID',
            timesPerDay: '1',
            everyHours: '',
            durationDays: '',
            untilFinished: false,
            continuousUse: false,
=======
            // Usa autoInstruction combinada com a instruction extra pre-construída
            autoInstruction: true,
            frequencyType,
            frequencyToken,
            timesPerDay,
            everyHours,
            durationDays,
            untilFinished,
            continuousUse,
>>>>>>> Stashed changes
            instruction,
            manualEdited: false,
            titleBold: false,
            titleUnderline: false,
            manualQuantity: item.manualQuantity || '',
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
