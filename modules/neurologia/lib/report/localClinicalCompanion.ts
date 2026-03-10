import type { CaseReport, Differential } from '../../types/analysis'
import type { ParsedAiClinicalReport, ParsedDifferential } from './aiClinicalReportParser'

type CaseStateInput = {
  patient?: Record<string, any>
  complaint?: Record<string, any>
  neuroExam?: Record<string, any>
}

const CHIEF_COMPLAINT_LABELS: Record<string, string> = {
  ConvulsaoFocal: 'convulsão focal',
  ConvulsaoGeneralizada: 'convulsão generalizada',
  ClusterConvulsoes: 'cluster de convulsões',
  Sincope: 'síncope/colapso',
  AlteracaoConsciencia: 'alteração do nível de consciência',
  Comportamento: 'alteração comportamental',
  AndarCirculos: 'andar em círculos/head pressing',
  Cegueira: 'cegueira aguda',
  Anisocoria: 'anisocoria/alteração pupilar',
  HeadTilt: 'head tilt',
  Vertigem: 'vertigem/vômito vestibular',
  Nistagmo: 'nistagmo',
  Ataxia: 'ataxia/descoordenação',
  Paresia: 'paresia/paralisia',
  Tetraparesia: 'tetraparesia',
  Paraparesia: 'paraparesia',
  Hipermetria: 'hipermetria/tremor de intenção',
  DorCervical: 'dor espinhal cervical',
  DorToracolombar: 'dor espinhal toracolombar',
  DorLombossacra: 'dor espinhal lombossacra',
  DisfuncaoFacial: 'disfunção de nervo facial',
  Disfagia: 'disfagia/regurgitação',
  Disfonia: 'disfonia/alteração de voz',
  DisfuncaoUrinaria: 'disfunção urinária/fecal',
  IncontinenciaUrinaria: 'incontinência urinária',
  RetencaoUrinaria: 'retenção urinária',
  Tremores: 'tremores/mioclonias',
  FraquezaFlacida: 'fraqueza flácida/intolerância ao exercício',
  Colapso: 'colapso recorrente',
}

const RED_FLAG_LABELS: Record<string, string> = {
  coma_estupor: 'coma/estupor',
  status_epilepticus: 'status epilepticus/cluster grave',
  severe_progression_24h: 'piora neurológica rápida (<24h)',
  acute_nonambulatory: 'não ambulatório agudo',
  respiratory_compromise: 'comprometimento respiratório/aspiração',
  deep_pain_loss: 'dor profunda ausente',
  severe_cervical_pain: 'cervicalgia intensa',
  anisocoria_acute: 'anisocoria aguda',
  dysphagia_aspiration_risk: 'disfagia com risco de aspiração',
}

const EXAM_FIELD_LABELS: Record<string, string> = {
  mentation: 'mentação',
  behavior: 'comportamento',
  head_posture: 'postura da cabeça',
  ambulation: 'deambulação',
  gait_thoracic: 'marcha torácica',
  gait_pelvic: 'marcha pélvica',
  ataxia_type: 'tipo de ataxia',
  proprioception_thoracic_left: 'propriocepção torácico esquerdo',
  proprioception_thoracic_right: 'propriocepção torácico direito',
  proprioception_pelvic_left: 'propriocepção pélvico esquerdo',
  proprioception_pelvic_right: 'propriocepção pélvico direito',
  menace_left: 'resposta à ameaça esquerda',
  menace_right: 'resposta à ameaça direita',
  plr_left: 'PLR esquerdo',
  plr_right: 'PLR direito',
  nystagmus: 'nistagmo',
  strabismus: 'estrabismo',
  cn_facial_sensation: 'sensibilidade facial',
  cn_swallowing: 'deglutição',
  reflex_patellar_left: 'patelar esquerdo',
  reflex_patellar_right: 'patelar direito',
  reflex_withdrawal_left_thoracic: 'retirada torácico esquerdo',
  reflex_withdrawal_right_thoracic: 'retirada torácico direito',
  reflex_panniculus: 'panniculus',
  deep_pain: 'dor profunda',
  pain_cervical: 'dor cervical',
  pain_thoracolumbar: 'dor toracolombar',
  pain_lumbosacral: 'dor lombossacra',
}

const AXIS_LABELS: Record<string, string> = {
  PROSENCEFALO: 'Prosencéfalo',
  TRONCO_ENCEFALICO: 'Tronco encefálico',
  CEREBELO: 'Cerebelo',
  VESTIBULAR_PERIFERICO: 'Vestibular periférico',
  VESTIBULAR_CENTRAL: 'Vestibular central',
  MEDULA_C1_C5: 'Medula espinhal cervical (C1-C5)',
  MEDULA_C6_T2: 'Medula espinhal cervicotorácica (C6-T2)',
  MEDULA_T3_L3: 'Medula espinhal toracolombar (T3-L3)',
  MEDULA_L4_S3: 'Medula espinhal lombossacra (L4-S3)',
  CAUDA_EQUINA: 'Cauda equina',
  NEUROMUSCULAR: 'Neuromuscular',
  MULTIFOCAL_OU_DIFUSA: 'Multifocal ou difusa',
  INDETERMINADO: 'Indeterminado',
}

const MOTOR_PATTERN_LABELS: Record<string, string> = {
  UMN: 'Padrão de neurônio motor superior',
  LMN: 'Padrão de neurônio motor inferior',
  VESTIBULAR: 'Padrão vestibular',
  CEREBELAR: 'Padrão cerebelar',
  NEUROMUSCULAR: 'Padrão neuromuscular',
  INDEFINIDO: 'Indefinido',
}

const CATEGORY_LABELS: Record<string, string> = {
  INFLAMATORIA: 'Inflamatória',
  INFECCIOSA: 'Infecciosa',
  NEOPLASICA: 'Neoplásica',
  VASCULAR: 'Vascular',
  DEGENERATIVA: 'Degenerativa',
  TRAUMATICA: 'Traumática',
  TOXICO_METABOLICA: 'Tóxico-metabólica',
  COMPRESSIVA: 'Compressiva',
  IDIOPATICA: 'Idiopática',
  ENDOCRINA: 'Endócrina',
}

function unique(items: string[]): string[] {
  return Array.from(new Set(items.map((item) => item.trim()).filter(Boolean)))
}

function humanList(items: string[]): string {
  const valid = items.filter(Boolean)
  if (valid.length === 0) return 'sem achados destacados'
  if (valid.length === 1) return valid[0]
  if (valid.length === 2) return `${valid[0]} e ${valid[1]}`
  return `${valid.slice(0, -1).join(', ')} e ${valid[valid.length - 1]}`
}

function formatAxis(axis: string): string {
  return AXIS_LABELS[axis] || axis
}

function formatMotorPattern(pattern: string): string {
  return MOTOR_PATTERN_LABELS[pattern] || pattern
}

function formatCategory(category: string): string {
  return CATEGORY_LABELS[category] || category
}

function normalizeProbabilities(differentials: Differential[]): Array<{ dx: Differential; probability: number }> {
  const top = differentials.slice(0, 5)
  if (top.length === 0) {
    return []
  }

  const total = top.reduce((sum, item) => sum + Math.max(0, item.likelihood || 0), 0)
  if (total <= 0) {
    const base = Math.floor(100 / top.length)
    const remainder = 100 - base * top.length
    return top.map((dx, index) => ({ dx, probability: base + (index < remainder ? 1 : 0) }))
  }

  const raw = top.map((dx) => ({
    dx,
    scaled: (Math.max(0, dx.likelihood || 0) / total) * 100,
  }))
  const normalized = raw.map((entry) => ({
    dx: entry.dx,
    probability: Math.floor(entry.scaled),
  }))

  let remainder = 100 - normalized.reduce((sum, item) => sum + item.probability, 0)
  const ranked = raw
    .map((entry, index) => ({ index, fraction: entry.scaled - Math.floor(entry.scaled) }))
    .sort((left, right) => right.fraction - left.fraction)

  let pointer = 0
  while (remainder > 0 && ranked.length > 0) {
    normalized[ranked[pointer % ranked.length].index].probability += 1
    remainder -= 1
    pointer += 1
  }

  return normalized.sort((left, right) => right.probability - left.probability)
}

function getChiefComplaints(caseState: CaseStateInput): string[] {
  const ids = Array.isArray(caseState.complaint?.chiefComplaintIds) ? caseState.complaint?.chiefComplaintIds : []
  return unique(ids.map((item) => CHIEF_COMPLAINT_LABELS[item] || item))
}

function getRedFlags(caseState: CaseStateInput): string[] {
  const flags = Array.isArray(caseState.complaint?.redFlags) ? caseState.complaint?.redFlags : []
  return unique(flags.map((item) => RED_FLAG_LABELS[item] || item))
}

function getComorbidityLabels(caseState: CaseStateInput): string[] {
  const items = Array.isArray(caseState.patient?.comorbidities) ? caseState.patient?.comorbidities : []
  return unique(
    items.map((item: any) => {
      if (typeof item === 'string') return item
      return item?.label || item?.key || 'comorbidade não especificada'
    }),
  )
}

function getExamHighlights(caseState: CaseStateInput): string[] {
  const exam = caseState.neuroExam || {}
  return unique(
    Object.entries(exam)
      .filter(([, value]) => value !== null && value !== undefined && String(value).trim() !== '')
      .filter(([, value]) => !['Normal', 'Presente', 'Ausente'].includes(String(value).trim()))
      .map(([key, value]) => `${EXAM_FIELD_LABELS[key] || key}: ${String(value).trim()}`),
  ).slice(0, 10)
}

function buildNeurolocalizationReasoning(
  report: CaseReport,
  complaints: string[],
  examHighlights: string[],
  comorbidities: string[],
): string {
  const anchors = unique([
    ...report.neuroLocalization.supportiveFindings.slice(0, 3),
    ...complaints.slice(0, 2),
    ...examHighlights.slice(0, 3),
  ])

  const comorbidityText =
    comorbidities.length > 0
      ? ` As comorbidades (${humanList(comorbidities.slice(0, 3))}) devem ser consideradas como modificadoras de apresentação e de conduta.`
      : ''

  return (
    `A leitura integrada do exame favorece ${formatAxis(report.neuroLocalization.primary)} com ` +
    `${report.neuroLocalization.distribution.toLowerCase()} e ${formatMotorPattern(report.neuroLocalization.motorPattern).toLowerCase()}. ` +
    `Os principais pontos que sustentam essa topografia são ${humanList(anchors.slice(0, 4))}. ` +
    `A confiança atual é ${report.neuroLocalization.confidence}%, devendo ser reinterpretada à luz da evolução clínica, da dor espinhal, dos nervos cranianos e das reações posturais.` +
    comorbidityText
  )
}

function buildClinicalFit(
  dx: Differential,
  probability: number,
  report: CaseReport,
  complaints: string[],
  examHighlights: string[],
  comorbidities: string[],
): string {
  const anchors = unique([
    ...dx.why.slice(0, 2),
    ...report.neuroLocalization.supportiveFindings.slice(0, 2),
    ...complaints.slice(0, 2),
    ...examHighlights.slice(0, 2),
  ]).slice(0, 4)

  const comorbiditySentence =
    comorbidities.length > 0
      ? ` As comorbidades (${humanList(comorbidities.slice(0, 3))}) podem aumentar a plausibilidade ou alterar a prioridade diagnóstica e terapêutica dessa hipótese.`
      : ''

  return (
    `${dx.name} permanece entre as hipóteses mais prováveis (${probability}%) porque conversa com a neurolocalização em ` +
    `${formatAxis(report.neuroLocalization.primary)} e com o conjunto de achados do caso. ` +
    `Na prática, o clínico deve correlacionar especialmente ${humanList(anchors)} antes de definir o próximo passo.` +
    comorbiditySentence
  )
}

function buildOpposingFindings(dx: Differential, caseState: CaseStateInput, report: CaseReport): string[] {
  const temporal = caseState.complaint?.temporalPattern || null
  const evolution = caseState.complaint?.evolutionPattern || null
  const items: string[] = [...report.neuroLocalization.contradictoryFindings.slice(0, 2)]

  if (dx.category === 'VASCULAR' && temporal && !['peragudo', 'agudo'].includes(String(temporal))) {
    items.push('O curso não foi tipicamente peragudo/agudo, o que reduz a prioridade de etiologia vascular.')
  }
  if (dx.category === 'DEGENERATIVA' && temporal && !['cronico', 'subagudo'].includes(String(temporal))) {
    items.push('A linha do tempo não é a mais clássica para doença degenerativa progressiva.')
  }
  if (dx.category === 'IDIOPATICA' && report.neuroLocalization.distribution === 'MULTIFOCAL') {
    items.push('A distribuição multifocal torna causas idiopáticas menos confortáveis como hipótese principal.')
  }
  if (dx.category === 'COMPRESSIVA' && report.neuroLocalization.primary === 'MULTIFOCAL_OU_DIFUSA') {
    items.push('O padrão multifocal/difuso reduz a força de uma única lesão compressiva focal.')
  }
  if (dx.category === 'TOXICO_METABOLICA' && report.neuroLocalization.primary.startsWith('MEDULA_')) {
    items.push('A topografia medular pura enfraquece uma explicação exclusivamente metabólica.')
  }
  if (dx.category === 'INFECCIOSA' && !caseState.complaint?.fever) {
    items.push('A ausência de febre não exclui infecção, mas diminui um pouco o peso inicial dessa hipótese.')
  }

  return unique(items).slice(0, 4)
}

function formatDiagnostics(dx: Differential): string[] {
  const yieldLabel: Record<string, string> = {
    ALTA: 'rendimento alto',
    MEDIA: 'rendimento moderado',
    BAIXA: 'rendimento baixo',
  }

  return dx.diagnostics.slice(0, 4).map((item) => {
    const whatItAdds = item.whatItAdds || 'ajuda a confirmar ou refutar a hipótese'
    const expected = item.expectedFindings || 'achados dependem do estágio e da etiologia'
    return `${item.priority} | ${item.test} | ${yieldLabel[item.priority]} | Estimativa qualitativa | ${whatItAdds}. Espera-se ${expected}.`
  })
}

function buildPatientAssessment(caseState: CaseStateInput, report: CaseReport): string[] {
  const items: string[] = []
  const primary = report.neuroLocalization.primary
  const exam = caseState.neuroExam || {}

  if (['PROSENCEFALO', 'TRONCO_ENCEFALICO', 'MULTIFOCAL_OU_DIFUSA', 'VESTIBULAR_CENTRAL'].includes(primary)) {
    items.push('Reavaliar mentação, assimetria de pares cranianos, resposta à ameaça e ocorrência de crises em série.')
    items.push('Documentar pressão arterial, glicemia, temperatura e progressão dos déficits a cada reavaliação.')
  }
  if (primary.startsWith('MEDULA_') || primary === 'CAUDA_EQUINA') {
    items.push('Reexaminar dor espinhal, nocicepção profunda, capacidade de deambular e função vesical em cada turno.')
    items.push('Definir se o padrão motor é UMN ou LMN em todos os membros afetados antes de indicar imagem.')
  }
  if (primary === 'NEUROMUSCULAR') {
    items.push('Mensurar esforço respiratório, fadiga com manipulação mínima, reflexo de deglutição e risco de aspiração.')
  }
  if (primary.includes('VESTIBULAR')) {
    items.push('Monitorar náusea, hidratação, segurança para alimentar e incapacidade de permanecer em estação sem cair.')
  }
  if (String(exam.ambulation || '').includes('Não')) {
    items.push('Checar necessidade de mudança de decúbito, suporte para micção e proteção de proeminências ósseas.')
  }

  return unique(items).slice(0, 4)
}

function buildMonitoringPlan(caseState: CaseStateInput, report: CaseReport): string[] {
  const items: string[] = []
  const comorbidities = getComorbidityLabels(caseState)

  items.push('Monitorização neurológica seriada com foco na progressão ou reversão dos déficits dominantes do exame.')

  if (caseState.complaint?.redFlags?.includes('status_epilepticus')) {
    items.push('Registrar número, duração e intervalo entre crises; piora do sensório entre eventos sugere descompensação.')
  }
  if (report.neuroLocalization.primary.startsWith('MEDULA_') || report.neuroLocalization.primary === 'CAUDA_EQUINA') {
    items.push('Acompanhar dor, nocicepção, decúbito, micção e retorno funcional de marcha com horários definidos.')
  }
  if (comorbidities.some((item) => /reno|renal/i.test(item))) {
    items.push('Reavaliar hidratação, diurese, creatinina/ureia e ajuste de fármacos excretados por via renal.')
  }
  if (comorbidities.some((item) => /hep|f[ií]gad/i.test(item))) {
    items.push('Observar flutuação de mentação, amônia/ácidos biliares quando indicados e tolerância a fármacos hepatometabolizados.')
  }
  if (comorbidities.some((item) => /pneumo|respirat/i.test(item))) {
    items.push('Acompanhar frequência respiratória, esforço ventilatório, SpO2 e risco de aspiração após sedação ou crises.')
  }

  return unique(items).slice(0, 4)
}

function buildTreatmentPlan(dx: Differential, caseState: CaseStateInput, report: CaseReport): string[] {
  const initial = dx.treatment.find((item) => item.phase === '0-6H')
  const definitive = dx.treatment.find((item) => item.phase === 'DEFINITIVO')
  const items: string[] = []

  if (initial?.plan?.length) {
    items.push(`Fase inicial: ${initial.plan.join('; ')}.`)
  }
  if (definitive?.plan?.length) {
    items.push(`Tratamento específico: ${definitive.plan.join('; ')}.`)
  }
  if (initial?.cautions?.length || definitive?.cautions?.length) {
    items.push(`Cautelas: ${unique([...(initial?.cautions || []), ...(definitive?.cautions || [])]).join('; ')}.`)
  }
  if (String(caseState.neuroExam?.ambulation || '').includes('Não')) {
    items.push('Suporte clínico: enfermagem para paciente não ambulatório, manejo vesical, nutrição e fisioterapia passiva quando estável.')
  }
  if (
    ['PROSENCEFALO', 'TRONCO_ENCEFALICO', 'MULTIFOCAL_OU_DIFUSA', 'VESTIBULAR_CENTRAL'].includes(
      report.neuroLocalization.primary,
    )
  ) {
    items.push('Se houver piora intracraniana aguda, priorizar oxigenação, cabeça elevada e controle rigoroso de crises e perfusão.')
  }

  return unique(items).slice(0, 4)
}

function buildAllowedDrugs(dx: Differential, caseState: CaseStateInput, report: CaseReport): string[] {
  const items: string[] = []
  const comorbidities = getComorbidityLabels(caseState)

  if (dx.category === 'COMPRESSIVA') {
    items.push('Opioides e analgesia multimodal costumam ser mais seguros que AINEs em pacientes com comorbidades sistêmicas.')
  }
  if (dx.category === 'INFLAMATORIA') {
    items.push('Corticoterapia ou imunossupressão só devem ser consideradas depois de excluir, na medida do possível, causa infecciosa.')
  }
  if (dx.category === 'TOXICO_METABOLICA') {
    items.push('Cristaloides balanceados, controle de glicose/eletrólitos e levetiracetam são opções usuais quando o quadro é compatível.')
  }
  if (report.neuroLocalization.primary.includes('VESTIBULAR')) {
    items.push('Maropitant, ondansetrona e suporte de hidratação podem melhorar conforto e viabilizar alimentação.')
  }
  if (report.neuroLocalization.primary === 'NEUROMUSCULAR') {
    items.push('A escolha de anticolinesterásicos ou suporte ventilatório depende do padrão neuromuscular confirmado e da segurança respiratória.')
  }
  if (comorbidities.some((item) => /hep|f[ií]gad/i.test(item))) {
    items.push('Levetiracetam tende a ser uma opção mais confortável do que anticonvulsivantes mais hepatometabolizados.')
  }

  return unique(items).slice(0, 4)
}

function buildAvoidDrugs(dx: Differential, caseState: CaseStateInput): string[] {
  const items: string[] = []
  const comorbidities = getComorbidityLabels(caseState)

  if (comorbidities.some((item) => /reno|renal/i.test(item))) {
    items.push('Evitar AINEs e rever dose de fármacos eliminados por via renal.')
  }
  if (comorbidities.some((item) => /hep|f[ií]gad/i.test(item))) {
    items.push('Usar com cautela fármacos hepatometabolizados e sedativos que deprimam excessivamente o sensório.')
  }
  if (comorbidities.some((item) => /pneumo|respirat/i.test(item))) {
    items.push('Evitar sedação excessiva e combinações que aumentem depressão respiratória ou risco de aspiração.')
  }
  if (dx.category === 'INFLAMATORIA' || dx.category === 'INFECCIOSA') {
    items.push('Evitar iniciar imunossupressão às cegas quando infecção ainda não foi razoavelmente descartada.')
  }
  if (dx.category === 'COMPRESSIVA') {
    items.push('Evitar manipulações intensas de coluna antes de estabilizar dor, transporte e planejamento de imagem.')
  }

  return unique(items).slice(0, 4)
}

function buildComorbidityIntegration(report: CaseReport): string[] {
  const items = [
    ...(report.comorbidityImpact?.alerts || []),
    ...(report.comorbidityImpact?.cautions || []),
    ...(report.comorbidityImpact?.diagnosticAdds || []),
    ...(report.comorbidityImpact?.diagnosticAvoids || []),
  ]
  return unique(items).slice(0, 4)
}

function buildPriorities(caseState: CaseStateInput, report: CaseReport): string[] {
  const items: string[] = []
  const redFlags = getRedFlags(caseState)

  if (redFlags.includes('status epilepticus/cluster grave')) {
    items.push('Controlar crises imediatamente, checar glicemia e proteger via aérea antes de qualquer aprofundamento diagnóstico.')
  }
  if (redFlags.includes('comprometimento respiratório/aspiração')) {
    items.push('Priorizar oxigenação, monitorização respiratória e prevenção de aspiração.')
  }
  if (String(caseState.neuroExam?.ambulation || '').includes('Não')) {
    items.push('Organizar suporte para paciente não ambulatório: decúbito, bexiga, dor, hidratação e segurança para transporte.')
  }
  if (report.neuroLocalization.primary !== 'INDETERMINADO') {
    items.push(`Definir se a topografia em ${formatAxis(report.neuroLocalization.primary)} é focal, multifocal ou difusa com base na reavaliação completa.`)
  }
  items.push('Escolher o primeiro exame que realmente muda conduta hoje, em vez de abrir investigação ampla sem hierarquia.')

  return unique(items).slice(0, 5)
}

function buildCriticalAlerts(caseState: CaseStateInput, report: CaseReport): string[] {
  const items: string[] = []
  const redFlags = getRedFlags(caseState)

  items.push(...redFlags)

  if (report.neuroLocalization.primary === 'TRONCO_ENCEFALICO') {
    items.push('Lesões de tronco encefálico podem descompensar ventilação, deglutição e estado de consciência com rapidez.')
  }
  if (report.neuroLocalization.primary.startsWith('MEDULA_')) {
    items.push('Queda de nocicepção, piora de dor ou progressão para não ambulatório mudam urgência de imagem e prognóstico.')
  }
  if (report.neuroLocalization.primary === 'NEUROMUSCULAR') {
    items.push('Fraqueza ventilatória e aspiração são as complicações que mais mudam desfecho no plantão.')
  }

  return unique(items).slice(0, 5)
}

function buildLimitations(caseState: CaseStateInput, report: CaseReport): string[] {
  const items = [...(report.neuroLocalization.missing || [])]

  if (getExamHighlights(caseState).length < 4) {
    items.push('O exame neurológico registrado ainda tem poucos achados detalhados para refinar a hierarquia diagnóstica.')
  }
  if (!caseState.complaint?.contextNotes) {
    items.push('Faltam detalhes de cronologia fina, gatilhos, resposta a terapias prévias e evolução entre crises.')
  }
  if (!Array.isArray(caseState.patient?.comorbidities) || caseState.patient?.comorbidities.length === 0) {
    items.push('A ausência de comorbidades registradas reduz a capacidade de ajustar risco e terapêutica à realidade do paciente.')
  }

  return unique(items).slice(0, 4)
}

function buildReferences(caseState: CaseStateInput, report: CaseReport, differentials: ParsedDifferential[]): string[] {
  const items = [
    'Merck Veterinary Manual - The Neurologic Examination of Animals',
    'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
    'BSAVA Manual of Canine and Feline Neurology',
  ]

  const complaints = getChiefComplaints(caseState).join(' ')
  const differentialNames = differentials.map((item) => item.title.toLowerCase()).join(' ')

  if (/convuls|prosenc|encefal|metab[oó]lic/i.test(`${complaints} ${differentialNames} ${report.neuroLocalization.primary}`)) {
    items.push('ACVIM Consensus - Seizure Management in Dogs')
    items.push('Merck Veterinary Manual - Hepatic Encephalopathy in Small Animals')
  } else if (report.neuroLocalization.primary.includes('MEDULA') || report.neuroLocalization.primary === 'CAUDA_EQUINA') {
    items.push('Merck Veterinary Manual - Degenerative Diseases of the Spinal Column and Cord in Animals')
    items.push('ACVIM Consensus - Acute Canine Thoracolumbar IVDE')
  } else if (report.neuroLocalization.primary.includes('VESTIBULAR')) {
    items.push('Merck Veterinary Manual - Otitis Media and Interna in Animals')
  } else if (
    report.neuroLocalization.primary === 'MULTIFOCAL_OU_DIFUSA' ||
    /meningoencefal|neoplasia intracraniana|avc|vascular/i.test(differentialNames)
  ) {
    items.push('MRI differentiation of neoplastic, inflammatory and cerebrovascular brain disease in dogs')
  }

  return unique(items).slice(0, 5)
}

function buildParsedClinicalCompanion(caseState: CaseStateInput, report: CaseReport): ParsedAiClinicalReport {
  const complaints = getChiefComplaints(caseState)
  const examHighlights = getExamHighlights(caseState)
  const comorbidities = getComorbidityLabels(caseState)
  const normalizedDifferentials = normalizeProbabilities(report.differentials)

  const differentials: ParsedDifferential[] = normalizedDifferentials.map(({ dx, probability }) => ({
    title: dx.name,
    probability,
    category: formatCategory(dx.category),
    clinicalFit: buildClinicalFit(dx, probability, report, complaints, examHighlights, comorbidities),
    supportingFindings: unique([
      ...dx.why,
      ...report.neuroLocalization.supportiveFindings,
      ...complaints.map((item) => `Queixa relevante: ${item}`),
      ...examHighlights,
    ]).slice(0, 4),
    opposingFindings: buildOpposingFindings(dx, caseState, report),
    prioritizedDiagnostics: formatDiagnostics(dx),
    patientAssessment: buildPatientAssessment(caseState, report),
    monitoringPlan: buildMonitoringPlan(caseState, report),
    treatmentPlan: buildTreatmentPlan(dx, caseState, report),
    allowedDrugs: buildAllowedDrugs(dx, caseState, report),
    avoidDrugs: buildAvoidDrugs(dx, caseState),
    comorbidityIntegration: buildComorbidityIntegration(report),
  }))

  return {
    neurolocalization: {
      probableLocation: formatAxis(report.neuroLocalization.primary),
      distribution: report.neuroLocalization.distribution.toLowerCase(),
      motorPattern: formatMotorPattern(report.neuroLocalization.motorPattern),
      confidence: `${report.neuroLocalization.confidence}%`,
      reasoning: buildNeurolocalizationReasoning(report, complaints, examHighlights, comorbidities),
      supportiveFindings: unique([
        ...report.neuroLocalization.supportiveFindings,
        ...complaints.map((item) => `Queixa principal: ${item}`),
        ...examHighlights,
      ]).slice(0, 4),
      contradictoryFindings: unique(report.neuroLocalization.contradictoryFindings).slice(0, 4),
    },
    differentials,
    priorities: buildPriorities(caseState, report),
    criticalAlerts: buildCriticalAlerts(caseState, report),
    comorbidityImpact: {
      alerts: report.comorbidityImpact?.alerts || [],
      cautions: report.comorbidityImpact?.cautions || [],
      recommendedTests: report.comorbidityImpact?.diagnosticAdds || [],
      avoidOrAdjust: report.comorbidityImpact?.diagnosticAvoids || [],
    },
    limitations: buildLimitations(caseState, report),
    references: buildReferences(caseState, report, differentials),
  }
}

function renderClinicalCompanion(report: ParsedAiClinicalReport): string {
  const lines: string[] = []

  lines.push('Neurolocalizacao')
  lines.push(`Localizacao provavel: ${report.neurolocalization.probableLocation}`)
  lines.push(`Distribuicao: ${report.neurolocalization.distribution}`)
  lines.push(`Padrao motor: ${report.neurolocalization.motorPattern}`)
  lines.push(`Confianca estimada: ${report.neurolocalization.confidence}`)
  lines.push(`Raciocinio: ${report.neurolocalization.reasoning}`)

  if (report.neurolocalization.supportiveFindings.length > 0) {
    lines.push('Achados que sustentam:')
    report.neurolocalization.supportiveFindings.forEach((item) => lines.push(`- ${item}`))
  }
  if (report.neurolocalization.contradictoryFindings.length > 0) {
    lines.push('Achados contraditorios:')
    report.neurolocalization.contradictoryFindings.forEach((item) => lines.push(`- ${item}`))
  }

  lines.push('')
  lines.push('Top 5 diagnosticos diferenciais')
  report.differentials.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.title} - ${item.probability ?? 0}%`)
    lines.push(`Categoria: ${item.category}`)
    lines.push(`Sintese clinica: ${item.clinicalFit}`)
    lines.push('Achados a favor:')
    item.supportingFindings.forEach((entry) => lines.push(`- ${entry}`))
    if (item.opposingFindings.length > 0) {
      lines.push('Achados contra:')
      item.opposingFindings.forEach((entry) => lines.push(`- ${entry}`))
    }
    lines.push('Exames priorizados:')
    item.prioritizedDiagnostics.forEach((entry) => lines.push(`- ${entry}`))
    lines.push('Como avaliar este paciente no plantao:')
    item.patientAssessment.forEach((entry) => lines.push(`- ${entry}`))
    lines.push('Monitorizacao e reavaliacao:')
    item.monitoringPlan.forEach((entry) => lines.push(`- ${entry}`))
    lines.push('Tratamento e conduta:')
    item.treatmentPlan.forEach((entry) => lines.push(`- ${entry}`))
    if (item.allowedDrugs.length > 0) {
      lines.push('Farmacos que posso considerar:')
      item.allowedDrugs.forEach((entry) => lines.push(`- ${entry}`))
    }
    if (item.avoidDrugs.length > 0) {
      lines.push('Farmacos a evitar ou ajustar:')
      item.avoidDrugs.forEach((entry) => lines.push(`- ${entry}`))
    }
    if (item.comorbidityIntegration.length > 0) {
      lines.push('Como as comorbidades mudam a conduta:')
      item.comorbidityIntegration.forEach((entry) => lines.push(`- ${entry}`))
    }
    lines.push('')
  })

  if (report.priorities.length > 0) {
    lines.push('Prioridades praticas nas proximas 6 horas')
    report.priorities.forEach((item) => lines.push(`- ${item}`))
    lines.push('')
  }

  if (report.criticalAlerts.length > 0) {
    lines.push('Alertas clinicos criticos')
    report.criticalAlerts.forEach((item) => lines.push(`- ${item}`))
    lines.push('')
  }

  if (
    report.comorbidityImpact.alerts.length > 0 ||
    report.comorbidityImpact.cautions.length > 0 ||
    report.comorbidityImpact.recommendedTests.length > 0 ||
    report.comorbidityImpact.avoidOrAdjust.length > 0
  ) {
    lines.push('Impacto das comorbidades')
    report.comorbidityImpact.alerts.forEach((item) => lines.push(`- Alerta: ${item}`))
    report.comorbidityImpact.cautions.forEach((item) => lines.push(`- Cautela terapeutica: ${item}`))
    report.comorbidityImpact.recommendedTests.forEach((item) => lines.push(`- Exame recomendado: ${item}`))
    report.comorbidityImpact.avoidOrAdjust.forEach((item) => lines.push(`- Evitar/Ajustar: ${item}`))
    lines.push('')
  }

  if (report.limitations.length > 0) {
    lines.push('Limitacoes e dados faltantes')
    report.limitations.forEach((item) => lines.push(`- ${item}`))
    lines.push('')
  }

  if (report.references.length > 0) {
    lines.push('Base bibliografica considerada')
    report.references.forEach((item) => lines.push(`- ${item}`))
  }

  return lines.join('\n')
}

export function buildLocalClinicalCompanionReport(caseState: CaseStateInput, report: CaseReport): string {
  return renderClinicalCompanion(buildParsedClinicalCompanion(caseState, report))
}
