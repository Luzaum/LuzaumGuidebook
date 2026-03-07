import type { NovaReceita2State } from './NovaReceita2Page'
import type { PrescriptionState, RouteGroup, PrintDoc } from './rxTypes'
import { renderRxToPrintDoc, splitPrescriptionByControl } from './rxRenderer'
import type { RxTemplateStyle } from './rxDb'

function toSafeString(value: unknown): string {
  if (value == null) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  return ''
}

<<<<<<< Updated upstream
function normalizeLooseText(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
=======
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
>>>>>>> Stashed changes
}

function normalizeDoseUnit(rawUnit: string): string {
  const normalized = normalizeLooseText(rawUnit)
    .replace(/\(s\)/g, 's')
    .replace(/\s+/g, '')
    .replace(/\./g, '')

  const aliases: Record<string, string> = {
    mg: 'mg',
    mcg: 'mcg',
    g: 'g',
    ml: 'ml',
    ui: 'ui',
    iu: 'ui',
    '%': '%',
    'mg/ml': 'mg/ml',
    'mcg/ml': 'mcg/ml',
    comprimido: 'comprimido',
    comprimidos: 'comprimido',
    capsula: 'capsula',
    capsulas: 'capsula',
    gota: 'gotas',
    gotas: 'gotas',
    ampola: 'ampola',
    ampolas: 'ampola',
    sache: 'sachet',
    saches: 'sachet',
    sachet: 'sachet',
    sachets: 'sachet',
  }

  return aliases[normalized] || normalized
}

function parseDoseString(dose: string): { numericStr: string; unit: string; perKg: boolean } | null {
  const raw = String(dose || '').trim()
  if (!raw) return null

  const match = raw.match(/^(\d+(?:[.,]\d+)?)\s*(.+)$/i)
  if (!match) return null

  let rawUnit = match[2].trim()
  const perKg = /\/\s*kg$/i.test(rawUnit)
  if (perKg) {
    rawUnit = rawUnit.replace(/\/\s*kg$/i, '').trim()
  }

  const unit = normalizeDoseUnit(rawUnit)
  if (!unit) return null

  return {
    numericStr: match[1].replace(',', '.'),
    unit,
    perKg,
  }
}

function routeStringToGroup(route?: string): RouteGroup {
  const normalized = normalizeLooseText(route || '')
  if (!normalized) return 'ORAL'

<<<<<<< Updated upstream
  if (normalized === 'vo' || normalized.includes('oral')) return 'ORAL'
  if (normalized === 'sc' || normalized.includes('subcut')) return 'SC'
  if (normalized === 'im' || normalized.includes('intramuscular')) return 'IM'
  if (normalized === 'iv' || normalized.includes('intraven')) return 'IV'
  if (normalized.includes('topico') || normalized.includes('topica')) return 'TOPICO'
  if (normalized.includes('oftalm')) return 'OFTALMICO'
  if (normalized.includes('otolog')) return 'OTOLOGICO'
  if (normalized.includes('intranasal') || normalized === 'nasal') return 'INTRANASAL'
  if (normalized.includes('retal')) return 'RETAL'
  if (normalized.includes('inalat') || normalized.includes('nebuliz')) return 'INALATORIO'
  if (normalized.includes('transderm')) return 'TRANSDERMICO'
=======
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
>>>>>>> Stashed changes

  return 'OUTROS'
}

function parseFrequency(freq: string) {
<<<<<<< Updated upstream
  const normalized = normalizeLooseText(freq)
  if (!normalized) {
    return { frequencyType: 'timesPerDay' as const, frequencyToken: '' as const, timesPerDay: '', everyHours: '' }
  }

  const tokenMap: Record<string, 'SID' | 'BID' | 'TID' | 'QID'> = {
    sid: 'SID',
    bid: 'BID',
    tid: 'TID',
    qid: 'QID',
  }

  if (tokenMap[normalized]) {
    const token = tokenMap[normalized]
    const timesMap: Record<'SID' | 'BID' | 'TID' | 'QID', string> = { SID: '1', BID: '2', TID: '3', QID: '4' }
    return { frequencyType: 'timesPerDay' as const, frequencyToken: token, timesPerDay: timesMap[token], everyHours: '' }
  }

  if (normalized === '1x ao dia' || normalized.includes('1 vez') || normalized === 'q24h' || normalized === '24/24h') {
    return { frequencyType: 'timesPerDay' as const, frequencyToken: 'SID' as const, timesPerDay: '1', everyHours: '' }
  }
  if (normalized === '2x ao dia' || normalized.includes('2 vez') || normalized === 'q12h' || normalized === '12/12h') {
    return { frequencyType: 'timesPerDay' as const, frequencyToken: 'BID' as const, timesPerDay: '2', everyHours: '' }
  }
  if (normalized === '3x ao dia' || normalized.includes('3 vez') || normalized === 'q8h' || normalized === '8/8h') {
    return { frequencyType: 'timesPerDay' as const, frequencyToken: 'TID' as const, timesPerDay: '3', everyHours: '' }
  }
  if (normalized === '4x ao dia' || normalized.includes('4 vez') || normalized === 'q6h' || normalized === '6/6h') {
    return { frequencyType: 'timesPerDay' as const, frequencyToken: 'QID' as const, timesPerDay: '4', everyHours: '' }
  }

  const qhMatch = normalized.match(/^q(\d+)h$/)
  if (qhMatch) {
    return { frequencyType: 'everyHours' as const, frequencyToken: '' as const, timesPerDay: '', everyHours: qhMatch[1] }
  }

  const slashMatch = normalized.match(/^(\d+)\/(\d+)h?$/)
  if (slashMatch && slashMatch[1] === slashMatch[2]) {
    return { frequencyType: 'everyHours' as const, frequencyToken: '' as const, timesPerDay: '', everyHours: slashMatch[1] }
  }

  const timesMatch = normalized.match(/^(\d+)x\s*ao\s*dia$/)
  if (timesMatch) {
    const times = Number(timesMatch[1])
    if ([1, 2, 3, 4, 6, 8, 12, 24].includes(times)) {
      return { frequencyType: 'everyHours' as const, frequencyToken: '' as const, timesPerDay: '', everyHours: String(24 / times) }
    }
    return { frequencyType: 'timesPerDay' as const, frequencyToken: '' as const, timesPerDay: String(times), everyHours: '' }
  }

  return { frequencyType: 'timesPerDay' as const, frequencyToken: '' as const, timesPerDay: '1', everyHours: '' }
=======
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
    const parts: string[] = [item.name]
    if (concentrationSafe) parts.push(concentrationSafe)
    if (item.commercial_name) parts.push(`(${item.commercial_name})`)
    const form = item.pharmaceutical_form || item.presentation_label
    if (form) parts.push(`– ${form}`)
    return parts.join(' ')
>>>>>>> Stashed changes
}

function parseDuration(duration: string) {
  const normalized = normalizeLooseText(duration)
  if (!normalized) return { durationDays: '', continuousUse: false, untilFinished: false }

<<<<<<< Updated upstream
  if (normalized.includes('continu')) {
    return { durationDays: '', continuousUse: true, untilFinished: false }
  }

  if (normalized.includes('acabar') || normalized.includes('terminar')) {
    return { durationDays: '', continuousUse: false, untilFinished: true }
  }

  const match = normalized.match(/(\d+)/)
  if (match) {
    return { durationDays: match[1], continuousUse: false, untilFinished: false }
  }

  return { durationDays: '', continuousUse: false, untilFinished: false }
}

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
=======
    // Mantém apenas instrução extra livre; a linha "Iniciar em" usa start_date próprio.
    if (item.instructions && item.instructions.trim()) {
        parts.push(item.instructions.trim())
    }

    return parts.join('\n')
>>>>>>> Stashed changes
}

export function buildPrescriptionStateFromNovaReceita2(state: NovaReceita2State): PrescriptionState {
  const now = new Date().toISOString()

  const mappedItems = state.items.map((item) => {
    const routeGroup = routeStringToGroup(item.route)
    const subtitle = buildItemSubtitle(item)
    const parsedDose = parseDoseString(toSafeString(item.dose))
    const doseValue = parsedDose ? parsedDose.numericStr : toSafeString(item.dose)
    const doseUnit = parsedDose
      ? parsedDose.perKg
        ? `${parsedDose.unit}/kg`
        : parsedDose.unit
      : ''

<<<<<<< Updated upstream
    const { frequencyType, frequencyToken, timesPerDay, everyHours } = parseFrequency(item.frequency || '')
    const { durationDays, continuousUse, untilFinished } = parseDuration(item.duration || '')
=======
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

        let doseValue = item.doseValue || ''
        let doseUnit = item.doseUnit || ''
        if (!doseValue || !doseUnit) {
            const parsedDose = parseDoseString(toSafeString(item.dose))
            doseValue = parsedDose ? parsedDose.numericStr : toSafeString(item.dose)
            doseUnit = parsedDose ? (parsedDose.perKg ? `${parsedDose.unit}/kg` : parsedDose.unit) : ''
        }

        const { frequencyType, frequencyToken, timesPerDay, everyHours } = parseFrequency(item.frequency || '')
        const { durationDays, continuousUse, untilFinished } = parseDuration(item.duration || '')

        return {
            id: item.id,
            category: 'medication' as const,
            catalogDrugId: item.medication_id || '',
            controlled: item.is_controlled || false,
            // A1: título completo em `name`;
            name: displayName,
            presentation: subtitle,
            concentration: concentrationSafe, // necessário para o rxRenderer calcular dose
            commercialName: '',
            pharmacyType: 'veterinária' as const,
            packageType: 'frasco' as const,
            pharmacyName: '',
            observations: '',
            routeGroup,
            doseValue,
            doseUnit,
            // Usa autoInstruction combinada com a instruction extra pre-construída
            autoInstruction: true,
            frequencyType,
            frequencyToken,
            timesPerDay,
            everyHours,
            durationDays,
            untilFinished,
            continuousUse,
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
>>>>>>> Stashed changes

    return {
      id: item.id,
      category: 'medication' as const,
      catalogDrugId: item.medication_id || '',
      medication_id: item.medication_id || '',
      controlled: !!item.is_controlled,
      is_controlled: !!item.is_controlled,
      name: item.name,
      presentation: subtitle,
      concentration: toSafeString(item.concentration_text),
      commercialName: toSafeString(item.commercial_name),
      pharmacyType: 'veterinária' as const,
      packageType: 'frasco' as const,
      pharmacyName: '',
      observations: '',
      routeGroup,
      doseValue,
      doseUnit,
      autoInstruction: true,
      frequencyType,
      frequencyToken,
      timesPerDay,
      everyHours,
      durationDays,
      untilFinished,
      continuousUse,
      instruction: toSafeString(item.instructions).trim(),
      manualEdited: false,
      titleBold: false,
      titleUnderline: false,
      manualQuantity: toSafeString((item as any).manualQuantity),
      start_date: toSafeString(item.start_date),
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
    },
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
  const splitDocs = splitPrescriptionByControl(rxState)
  const docs: PrintDoc[] = []

  if (splitDocs.standard) {
    docs.push(renderRxToPrintDoc(splitDocs.standard, { documentKind: 'standard' }))
  }
  if (splitDocs.specialControl) {
    docs.push(renderRxToPrintDoc(splitDocs.specialControl, { documentKind: 'special-control' }))
  }
  if (!docs.length) {
    docs.push(renderRxToPrintDoc(rxState, { documentKind: 'standard' }))
  }

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
  ]
    .filter(Boolean)
    .join(', ')

  for (const doc of docs) {
    doc.addressLine = tutorAddressLine || ''
  }

  return docs
}
