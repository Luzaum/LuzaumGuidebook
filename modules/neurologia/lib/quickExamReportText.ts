import type { ComplaintContext, Patient } from '../stores/caseStore'
import {
  CHIEF_COMPLAINT_LABELS,
  RED_FLAG_LABELS,
  TEMPORAL_LABELS,
  EVOLUTION_LABELS,
} from '../data/complaintDictionaries'
import {
  EXAM_KEYS_BY_NEURO_SECTION,
  getNeuroExamReportTitle,
  NEURO_EXAM_SECTIONS,
  type NeuroExamSectionId,
} from '../data/neuroExamSections'

/** Chaves conhecidas do formulário (para ordenar e detectar extras no objeto `exam`). */
const ALL_EXAM_SCHEMA_KEYS = new Set(
  NEURO_EXAM_SECTIONS.flatMap((s) => [...s.examKeys]),
)

const LIFE_STAGE_LABELS: Record<string, string> = {
  neonate: 'Neonato',
  pediatric: 'Pediátrico',
  adult: 'Adulto',
  geriatric: 'Geriátrico',
}

/** Escopo do relatório no fluxo “exame rápido”: só a etapa atual (paciente, queixa ou secção 1–6). */
export type QuickReportScope =
  | { kind: 'full' }
  | { kind: 'patient' }
  | { kind: 'complaint' }
  | { kind: 'exam_section'; sectionId: 1 | 2 | 3 | 4 | 5 | 6 }

const EXAM_FIELD_LABELS: Record<string, string> = {
  mentation: 'Nível de consciência',
  behavior: 'Comportamento',
  head_posture: 'Postura da cabeça',
  ambulation: 'Deambulação',
  gait_thoracic: 'Marcha dos membros torácicos',
  gait_pelvic: 'Marcha dos membros pélvicos',
  ataxia_type: 'Tipo de ataxia',
  proprioception_thoracic_left: 'Propriocepção — torácico esquerdo',
  proprioception_thoracic_right: 'Propriocepção — torácico direito',
  proprioception_pelvic_left: 'Propriocepção — pélvico esquerdo',
  proprioception_pelvic_right: 'Propriocepção — pélvico direito',
  menace_left: 'Ameaça — esquerdo',
  menace_right: 'Ameaça — direito',
  plr_left: 'PLR — esquerdo',
  plr_right: 'PLR — direito',
  nystagmus: 'Nistagmo',
  strabismus: 'Estrabismo',
  cn_facial_sensation: 'Sensibilidade facial',
  cn_swallowing: 'Deglutição / reflexo faríngeo',
  reflex_patellar_left: 'Reflexo patelar — esquerdo',
  reflex_patellar_right: 'Reflexo patelar — direito',
  reflex_withdrawal_left_thoracic: 'Retirada — torácico esquerdo',
  reflex_withdrawal_right_thoracic: 'Retirada — torácico direito',
  reflex_panniculus: 'Pannículo',
  deep_pain: 'Dor profunda (nocicepção)',
  pain_cervical: 'Dor à palpação cervical',
  pain_thoracolumbar: 'Dor à palpação toracolombar',
  pain_lumbosacral: 'Dor à palpação lombossacra',
}

/** Valor que o utilizador escolheu/registou (inclui “Normal”, “Alerta”, etc.). */
function hasFilledExamValue(val: unknown): boolean {
  if (val === undefined || val === null) return false
  if (typeof val === 'string' && val.trim() === '') return false
  return true
}

/**
 * Lista [chave, valor] na ordem do formulário (secções 1–6), só entradas preenchidas.
 * Inclui chaves extra em `exam` que não estão no schema (ex.: dados legados).
 */
function orderedFilledExamEntries(
  exam: Record<string, unknown>,
  mode: { kind: 'full' } | { kind: 'section'; sectionId: NeuroExamSectionId },
): [string, unknown][] {
  const out: [string, unknown][] = []
  if (mode.kind === 'section') {
    for (const key of EXAM_KEYS_BY_NEURO_SECTION[mode.sectionId]) {
      const v = exam[key]
      if (hasFilledExamValue(v)) out.push([key, v])
    }
    return out
  }
  for (const section of NEURO_EXAM_SECTIONS) {
    for (const key of section.examKeys) {
      const v = exam[key]
      if (hasFilledExamValue(v)) out.push([key, v])
    }
  }
  for (const [k, v] of Object.entries(exam)) {
    if (k.startsWith('_')) continue
    if (!ALL_EXAM_SCHEMA_KEYS.has(k) && hasFilledExamValue(v)) out.push([k, v])
  }
  return out
}

function hasAnyFilledExamField(exam: Record<string, unknown>): boolean {
  for (const [k, v] of Object.entries(exam)) {
    if (k.startsWith('_')) continue
    if (hasFilledExamValue(v)) return true
  }
  return false
}

function hasPatientData(p: Patient): boolean {
  return !!(
    p.species ||
    p.ageYears != null ||
    p.ageMonths != null ||
    p.weightKg != null ||
    p.sex ||
    p.reproStatus ||
    p.lifeStage ||
    (p.comorbidities && p.comorbidities.length > 0)
  )
}

function hasComplaintData(c: ComplaintContext): boolean {
  return !!(
    (c.chiefComplaintIds && c.chiefComplaintIds.length > 0) ||
    c.temporalPattern ||
    c.evolutionPattern ||
    (c.contextNotes && c.contextNotes.trim()) ||
    (c.redFlags && c.redFlags.length > 0) ||
    c.trauma ||
    c.toxin ||
    c.fever ||
    c.ectoparasiticideExposure ||
    c.systemicDisease ||
    c.recentSurgeryAnesthesia ||
    c.vaccinationOrTravel ||
    c.videoOfEpisode ||
    c.respiratoryGiSigns ||
    c.anticonvulsantOrNeuroMeds ||
    c.recentMedChange
  )
}

/**
 * Resolve o escopo a partir da URL (suporta qualquer prefixo, ex. /neurologia/...).
 */
/** Texto de ajuda no modal do relatório rápido, alinhado ao escopo da rota. */
export function quickReportScopeHint(scope: QuickReportScope): string {
  if (scope.kind === 'full') {
    return 'Texto com identificação, queixa/contexto (se houver) e todos os itens do exame que tiver registado (valores selecionados, incluindo normais).'
  }
  if (scope.kind === 'patient') {
    return 'Apenas dados da etapa Paciente (identificação).'
  }
  if (scope.kind === 'complaint') {
    return 'Apenas queixa, temporal, evolução, contexto e alertas.'
  }
  return `Apenas itens da secção ${scope.sectionId} (${getNeuroExamReportTitle(scope.sectionId)}) que tiver preenchido — inclui valores normais. Outras secções não entram.`
}

export function quickReportScopeFromPathname(pathname: string): QuickReportScope {
  const p = pathname || ''
  if (p.includes('/exame-rapido/paciente')) return { kind: 'patient' }
  if (p.includes('/exame-rapido/queixa')) return { kind: 'complaint' }
  const m = p.match(/\/exame-rapido\/secao\/(\d+)/)
  if (m) {
    const n = Number.parseInt(m[1], 10)
    if (n >= 1 && n <= 6) return { kind: 'exam_section', sectionId: n as 1 | 2 | 3 | 4 | 5 | 6 }
  }
  return { kind: 'full' }
}

/**
 * Texto sucinto para relatório médico a partir do caso atual (exame rápido ou trechos preenchidos).
 * Com `scope` restrito (ex.: secção única no exame rápido), só inclui blocos dessa etapa.
 */
export function buildQuickExamReportText(
  patient: Patient,
  complaint: ComplaintContext,
  exam: Record<string, unknown>,
  scope: QuickReportScope = { kind: 'full' },
): string {
  const blocks: string[] = []
  const includePatient = scope.kind === 'full' || scope.kind === 'patient'
  const includeComplaint = scope.kind === 'full' || scope.kind === 'complaint'

  const titleSuffix =
    scope.kind === 'patient'
      ? ' — somente identificação do paciente'
      : scope.kind === 'complaint'
        ? ' — somente queixa e contexto'
        : scope.kind === 'exam_section'
          ? ` — somente secção ${scope.sectionId}: ${getNeuroExamReportTitle(scope.sectionId)}`
          : ''

  blocks.push(`RELATÓRIO RÁPIDO — NEUROVET (exame neurológico)${titleSuffix}`)
  blocks.push('—'.repeat(48))
  blocks.push('')

  if (includePatient && hasPatientData(patient)) {
    blocks.push('PACIENTE')
    const species =
      patient.species === 'dog' ? 'Canino' : patient.species === 'cat' ? 'Felino' : null
    if (species) blocks.push(`Espécie: ${species}.`)
    const ageParts: string[] = []
    if (patient.ageYears != null && patient.ageYears > 0) ageParts.push(`${patient.ageYears} a`)
    if (patient.ageMonths != null && patient.ageMonths > 0) ageParts.push(`${patient.ageMonths} m`)
    if (ageParts.length) blocks.push(`Idade: ${ageParts.join(' ')}.`)
    if (patient.weightKg != null) blocks.push(`Peso: ${patient.weightKg} kg.`)
    if (patient.sex === 'male') blocks.push('Sexo: macho.')
    if (patient.sex === 'female') blocks.push('Sexo: fêmea.')
    if (patient.reproStatus === 'intact') blocks.push('Reprodutivo: inteiro.')
    if (patient.reproStatus === 'neutered') blocks.push('Reprodutivo: castrado.')
    if (patient.lifeStage && LIFE_STAGE_LABELS[patient.lifeStage]) {
      blocks.push(`Fase de vida: ${LIFE_STAGE_LABELS[patient.lifeStage]}.`)
    }
    if (patient.pregnant) blocks.push('Gestante: sim.')
    if (patient.lactating) blocks.push('Lactante: sim.')
    if (patient.comorbidities?.length) {
      const cm = patient.comorbidities.map((x) => x.label + (x.severity ? ` (${x.severity})` : '')).join('; ')
      blocks.push(`Comorbidades: ${cm}.`)
    }
    blocks.push('')
  }

  if (includeComplaint && hasComplaintData(complaint)) {
    blocks.push('QUEIXA E CONTEXTO')
    if (complaint.chiefComplaintIds?.length) {
      const qs = complaint.chiefComplaintIds
        .map((id) => CHIEF_COMPLAINT_LABELS[id] || id)
        .join('; ')
      blocks.push(`Queixas / sinais selecionados: ${qs}.`)
    }
    if (complaint.temporalPattern && TEMPORAL_LABELS[complaint.temporalPattern]) {
      blocks.push(`Curso temporal: ${TEMPORAL_LABELS[complaint.temporalPattern]}.`)
    }
    if (complaint.evolutionPattern && EVOLUTION_LABELS[complaint.evolutionPattern]) {
      blocks.push(`Evolução: ${EVOLUTION_LABELS[complaint.evolutionPattern]}.`)
    }
    const ctx: string[] = []
    if (complaint.trauma) ctx.push('trauma')
    if (complaint.toxin) ctx.push('toxina')
    if (complaint.fever) ctx.push('febre')
    if (complaint.ectoparasiticideExposure) ctx.push('ectoparasiticida')
    if (complaint.systemicDisease) ctx.push('doença sistêmica')
    if (complaint.recentSurgeryAnesthesia) ctx.push('cirurgia/anestesia recente')
    if (complaint.vaccinationOrTravel) ctx.push('vacinação/viagem/endêmico')
    if (complaint.videoOfEpisode) ctx.push('vídeo do episódio disponível')
    if (complaint.respiratoryGiSigns) ctx.push('sinais respiratórios ou GI')
    if (complaint.anticonvulsantOrNeuroMeds) ctx.push('anticonvulsivante ou medicação neurológica')
    if (complaint.recentMedChange) ctx.push('mudança recente de medicação ou dose')
    if (ctx.length) blocks.push(`Contexto: ${ctx.join(', ')}.`)
    if (complaint.redFlags?.length) {
      const rf = complaint.redFlags.map((id) => RED_FLAG_LABELS[id] || id).join('; ')
      blocks.push(`Alertas: ${rf}.`)
    }
    if (complaint.contextNotes?.trim()) {
      blocks.push(`Observações: ${complaint.contextNotes.trim()}`)
    }
    blocks.push('')
  }

  const examEntries =
    scope.kind === 'exam_section'
      ? orderedFilledExamEntries(exam, { kind: 'section', sectionId: scope.sectionId })
      : orderedFilledExamEntries(exam, { kind: 'full' })

  const shouldOutputExam =
    scope.kind === 'full' || scope.kind === 'exam_section'

  if (shouldOutputExam && examEntries.length > 0) {
    const examHeading =
      scope.kind === 'exam_section'
        ? `EXAME — ${getNeuroExamReportTitle(scope.sectionId)} (itens registados)`
        : 'EXAME NEUROLÓGICO (itens registados)'
    blocks.push(examHeading)
    for (const [key, val] of examEntries) {
      const label = EXAM_FIELD_LABELS[key] || key.replace(/_/g, ' ')
      blocks.push(`• ${label}: ${String(val)}`)
    }
    blocks.push('')
  } else if (shouldOutputExam && scope.kind === 'exam_section') {
    blocks.push(
      `(Nenhum item preenchido nesta secção (${getNeuroExamReportTitle(scope.sectionId)}). Selecione as opções e gere novamente.)`,
    )
    blocks.push('')
  }

  if (scope.kind === 'patient' && !hasPatientData(patient)) {
    blocks.push('(Ainda sem dados de paciente nesta etapa. Preencha e gere novamente.)')
  } else if (scope.kind === 'complaint' && !hasComplaintData(complaint)) {
    blocks.push('(Ainda sem queixa ou contexto nesta etapa. Preencha e gere novamente.)')
  } else if (
    scope.kind === 'full' &&
    !hasPatientData(patient) &&
    !hasComplaintData(complaint) &&
    !hasAnyFilledExamField(exam)
  ) {
    blocks.push(
      '(Nenhum dado preenchido ainda. Preencha paciente, queixa e/ou itens do exame e gere novamente.)',
    )
  }

  blocks.push('—'.repeat(48))
  blocks.push(`Gerado em ${new Date().toLocaleString('pt-BR')}.`)

  return blocks.join('\n')
}
