import { NEURO_EXAM_SECTIONS } from '../../data/neuroExamSections'
import type { NeuroExamSectionId } from '../../data/neuroExamSections'

/** Valor basal quando nenhuma inferência contextual se aplica. */
export const NORMAL_EXAM_DEFAULTS: Record<string, string> = {
  mentation: 'Alerta',
  behavior: 'Normal',
  head_posture: 'Normal',
  ambulation: 'Ambulatório',
  gait_thoracic: 'Normal',
  gait_pelvic: 'Normal',
  ataxia_type: 'Ausente',
  proprioception_thoracic_left: 'Normal',
  proprioception_thoracic_right: 'Normal',
  proprioception_pelvic_left: 'Normal',
  proprioception_pelvic_right: 'Normal',
  menace_left: 'Presente',
  menace_right: 'Presente',
  plr_left: 'Normal',
  plr_right: 'Normal',
  nystagmus: 'Ausente',
  strabismus: 'Ausente',
  cn_facial_sensation: 'Normal',
  cn_swallowing: 'Normal',
  reflex_patellar_left: 'Normal',
  reflex_patellar_right: 'Normal',
  reflex_withdrawal_left_thoracic: 'Normal',
  reflex_withdrawal_right_thoracic: 'Normal',
  reflex_panniculus: 'Normal',
  deep_pain: 'Presente',
  pain_cervical: 'Ausente',
  pain_thoracolumbar: 'Ausente',
  pain_lumbosacral: 'Ausente',
}

/** Explicação clínica curta exibida no popup da etapa 3. */
export const ASSUMED_VALUE_HINTS: Record<string, string> = {
  Alerta: 'consciência preservada',
  Normal: 'sem alteração',
  Ambulatório: 'deambula sem auxílio',
  'Com Apoio': 'deambula com assistência',
  'Não Ambulatório': 'incapaz de deambular',
  Plegia: 'plegia',
  Paresia: 'paresia',
  Ataxia: 'ataxia',
  Ausente: 'achado ausente',
  Presente: 'resposta presente',
  Proprioceptiva: 'ataxia proprioceptiva (inferida da marcha)',
  Vestibular: 'ataxia vestibular',
  Cerebelar: 'ataxia cerebelar',
  Duvidoso: 'nocicepção duvidosa',
}

/** Campos cuja omissão altera mais a neurolocalização. */
export const HIGH_IMPACT_EXAM_KEYS = new Set([
  'mentation',
  'ambulation',
  'gait_thoracic',
  'gait_pelvic',
  'proprioception_thoracic_left',
  'proprioception_thoracic_right',
  'proprioception_pelvic_left',
  'proprioception_pelvic_right',
  'menace_left',
  'menace_right',
  'plr_left',
  'plr_right',
  'deep_pain',
])

export const EXAM_FIELD_LABELS: Record<string, string> = {
  mentation: 'Mentação',
  behavior: 'Comportamento',
  head_posture: 'Postura da cabeça',
  ambulation: 'Deambulação',
  gait_thoracic: 'Marcha — membros torácicos',
  gait_pelvic: 'Marcha — membros pélvicos',
  ataxia_type: 'Tipo de ataxia',
  proprioception_thoracic_left: 'Propriocepção — torácico esquerdo',
  proprioception_thoracic_right: 'Propriocepção — torácico direito',
  proprioception_pelvic_left: 'Propriocepção — pélvico esquerdo',
  proprioception_pelvic_right: 'Propriocepção — pélvico direito',
  menace_left: 'Resposta à ameaça — esquerda',
  menace_right: 'Resposta à ameaça — direita',
  plr_left: 'PLR — esquerdo',
  plr_right: 'PLR — direito',
  nystagmus: 'Nistagmo',
  strabismus: 'Estrabismo',
  cn_facial_sensation: 'Sensibilidade facial',
  cn_swallowing: 'Deglutição',
  reflex_patellar_left: 'Patelar — esquerdo',
  reflex_patellar_right: 'Patelar — direito',
  reflex_withdrawal_left_thoracic: 'Retirada — torácico esquerdo',
  reflex_withdrawal_right_thoracic: 'Retirada — torácico direito',
  reflex_panniculus: 'Panniculus',
  deep_pain: 'Dor profunda (nocicepção)',
  pain_cervical: 'Dor espinhal — cervical',
  pain_thoracolumbar: 'Dor espinhal — toracolombar',
  pain_lumbosacral: 'Dor espinhal — lombossacra',
}

const EXAM_KEY_SECTION: Record<string, { id: NeuroExamSectionId; title: string }> = NEURO_EXAM_SECTIONS.reduce(
  (acc, section) => {
    for (const key of section.examKeys) {
      acc[key] = { id: section.id, title: section.reportTitle }
    }
    return acc
  },
  {} as Record<string, { id: NeuroExamSectionId; title: string }>,
)

export const ALL_EXAM_KEYS = NEURO_EXAM_SECTIONS.flatMap((section) => [...section.examKeys])

export type UnfilledExamFieldDetail = {
  key: string
  label: string
  sectionTitle: string
  assumedValue: string
  assumedHint: string
  highImpact: boolean
  inferredFromContext: boolean
}

function isExamValueFilled(value: unknown): boolean {
  if (value === null || value === undefined) return false
  return String(value).trim() !== ''
}

function filled(value: unknown): string | null {
  return isExamValueFilled(value) ? String(value) : null
}

function allFilledNormal(values: Array<string | null>, normalToken = 'Normal'): boolean {
  const present = values.filter((v): v is string => v !== null)
  return present.length > 0 && present.every((v) => v === normalToken)
}

function anyEquals(values: Array<string | null>, token: string): boolean {
  return values.some((v) => v === token)
}

function inferAmbulationFromGait(exam: Record<string, unknown>): string | null {
  const thoracic = filled(exam.gait_thoracic)
  const pelvic = filled(exam.gait_pelvic)
  const gaits = [thoracic, pelvic].filter((v): v is string => v !== null)
  if (gaits.length === 0) return null

  if (anyEquals(gaits, 'Plegia')) return 'Plegia'
  if (anyEquals(gaits, 'Paresia')) return 'Com Apoio'
  if (gaits.every((g) => g === 'Normal')) return 'Ambulatório'
  if (anyEquals(gaits, 'Ataxia')) return 'Ambulatório'
  return null
}

function inferGaitFromAmbulation(ambulation: string | null): string | null {
  if (!ambulation) return null
  if (ambulation === 'Plegia' || ambulation === 'Não Ambulatório') return 'Plegia'
  if (ambulation === 'Com Apoio') return 'Paresia'
  if (ambulation === 'Ambulatório') return 'Normal'
  return null
}

function inferAtaxiaType(exam: Record<string, unknown>): string | null {
  const thoracic = filled(exam.gait_thoracic)
  const pelvic = filled(exam.gait_pelvic)
  const gaits = [thoracic, pelvic]
  if (anyEquals(gaits, 'Ataxia')) {
    const headPosture = filled(exam.head_posture)
    const nystagmus = filled(exam.nystagmus)
    if (headPosture === 'Head Tilt' || nystagmus === 'Presente') return 'Vestibular'
    return 'Proprioceptiva'
  }
  if (allFilledNormal(gaits) || (thoracic === 'Normal' && pelvic === 'Normal')) return 'Ausente'
  return null
}

function inferProprioception(_key: string, exam: Record<string, unknown>): string | null {
  const keys = [
    'proprioception_thoracic_left',
    'proprioception_thoracic_right',
    'proprioception_pelvic_left',
    'proprioception_pelvic_right',
  ] as const
  const values = keys.map((k) => filled(exam[k]))
  const filledValues = values.filter((v): v is string => v !== null)
  if (filledValues.length === 0) return null

  const hasDeficit = filledValues.some((v) => v === 'Diminuído' || v === 'Ausente')
  if (hasDeficit) return null

  if (filledValues.every((v) => v === 'Normal')) return 'Normal'
  return null
}

function inferBilateralNormal(
  key: string,
  pair: [string, string],
  exam: Record<string, unknown>,
  normalToken: string,
): string | null {
  const left = filled(exam[pair[0]])
  const right = filled(exam[pair[1]])
  if (key === pair[0] && !left && right === normalToken) return normalToken
  if (key === pair[1] && !right && left === normalToken) return normalToken
  return null
}

/**
 * Resolve o valor assumido para um campo vazio, usando defaults basais e coerência
 * com achados já registrados na mesma secção.
 */
export function resolveExamDefault(key: string, exam: Record<string, unknown>): { value: string; inferred: boolean } {
  if (isExamValueFilled(exam[key])) {
    return { value: String(exam[key]), inferred: false }
  }

  const ambulation = filled(exam.ambulation)
  const thoracic = filled(exam.gait_thoracic)
  const pelvic = filled(exam.gait_pelvic)

  if (key === 'ambulation') {
    const fromGait = inferAmbulationFromGait(exam)
    if (fromGait) return { value: fromGait, inferred: true }
  }

  if (key === 'gait_thoracic' || key === 'gait_pelvic') {
    const fromAmbulation = inferGaitFromAmbulation(ambulation)
    if (fromAmbulation) return { value: fromAmbulation, inferred: true }
    const sibling = key === 'gait_thoracic' ? pelvic : thoracic
    if (sibling === 'Normal') return { value: 'Normal', inferred: true }
    if (sibling === 'Ataxia' || sibling === 'Paresia' || sibling === 'Plegia') {
      return { value: sibling, inferred: true }
    }
  }

  if (key === 'ataxia_type') {
    const fromGait = inferAtaxiaType(exam)
    if (fromGait) return { value: fromGait, inferred: true }
  }

  if (key.startsWith('proprioception_')) {
    const fromSection = inferProprioception(key, exam)
    if (fromSection) return { value: fromSection, inferred: true }
  }

  if (key === 'menace_left' || key === 'menace_right') {
    const mirrored = inferBilateralNormal(key, ['menace_left', 'menace_right'], exam, 'Presente')
    if (mirrored) return { value: mirrored, inferred: true }
  }

  if (key === 'plr_left' || key === 'plr_right') {
    const mirrored = inferBilateralNormal(key, ['plr_left', 'plr_right'], exam, 'Normal')
    if (mirrored) return { value: mirrored, inferred: true }
  }

  if (key === 'reflex_patellar_left' || key === 'reflex_patellar_right') {
    const mirrored = inferBilateralNormal(key, ['reflex_patellar_left', 'reflex_patellar_right'], exam, 'Normal')
    if (mirrored) return { value: mirrored, inferred: true }
  }

  if (key === 'reflex_withdrawal_left_thoracic' || key === 'reflex_withdrawal_right_thoracic') {
    const mirrored = inferBilateralNormal(
      key,
      ['reflex_withdrawal_left_thoracic', 'reflex_withdrawal_right_thoracic'],
      exam,
      'Normal',
    )
    if (mirrored) return { value: mirrored, inferred: true }
  }

  if (key.startsWith('pain_')) {
    const pains = ['pain_cervical', 'pain_thoracolumbar', 'pain_lumbosacral'].map((k) => filled(exam[k]))
    const filledPains = pains.filter((v): v is string => v !== null)
    if (filledPains.length > 0 && filledPains.every((v) => v === 'Ausente')) {
      return { value: 'Ausente', inferred: true }
    }
  }

  return { value: NORMAL_EXAM_DEFAULTS[key] || 'Normal', inferred: false }
}

export function getAssumedValueHint(value: string): string {
  return ASSUMED_VALUE_HINTS[value] || 'valor basal de normalidade'
}

/** @deprecated Prefer getUnfilledExamFieldDetails */
export function getUnfilledExamFields(exam: Record<string, unknown> | undefined | null): string[] {
  return getUnfilledExamFieldDetails(exam).map((item) => item.label)
}

export function getUnfilledExamFieldDetails(
  exam: Record<string, unknown> | undefined | null,
): UnfilledExamFieldDetail[] {
  const source = exam || {}
  const preview = applyNormalExamDefaults(exam)

  return ALL_EXAM_KEYS.filter((key) => !isExamValueFilled(source[key])).map((key) => {
    const assumedValue = preview[key]
    const basalValue = NORMAL_EXAM_DEFAULTS[key] || 'Normal'
    const section = EXAM_KEY_SECTION[key]
    return {
      key,
      label: EXAM_FIELD_LABELS[key] || key,
      sectionTitle: section?.title || 'Exame neurológico',
      assumedValue,
      assumedHint: getAssumedValueHint(assumedValue),
      highImpact: HIGH_IMPACT_EXAM_KEYS.has(key),
      inferredFromContext: assumedValue !== basalValue,
    }
  })
}

/** Preenche campos vazios com defaults clínicos (contextuais quando possível). */
export function applyNormalExamDefaults(exam: Record<string, unknown> | undefined | null): Record<string, string> {
  const source = { ...(exam || {}) } as Record<string, string>
  const originallyEmpty = ALL_EXAM_KEYS.filter((key) => !isExamValueFilled(source[key]))

  // Várias passagens para propagar coerência entre marcha, deambulação e ataxia.
  for (let pass = 0; pass < 5; pass += 1) {
    for (const key of originallyEmpty) {
      source[key] = resolveExamDefault(key, source).value
    }
  }

  for (const key of originallyEmpty) {
    if (!isExamValueFilled(source[key])) {
      source[key] = NORMAL_EXAM_DEFAULTS[key] || 'Normal'
    }
  }

  return source
}

const NORMAL_VALUES_BY_FIELD: Record<string, readonly string[]> = {
  mentation: ['Alerta'],
  behavior: ['Normal'],
  head_posture: ['Normal'],
  ambulation: ['Ambulatório'],
  gait_thoracic: ['Normal'],
  gait_pelvic: ['Normal'],
  ataxia_type: ['Ausente'],
  proprioception_thoracic_left: ['Normal'],
  proprioception_thoracic_right: ['Normal'],
  proprioception_pelvic_left: ['Normal'],
  proprioception_pelvic_right: ['Normal'],
  menace_left: ['Presente'],
  menace_right: ['Presente'],
  plr_left: ['Normal'],
  plr_right: ['Normal'],
  nystagmus: ['Ausente'],
  strabismus: ['Ausente'],
  cn_facial_sensation: ['Normal'],
  cn_swallowing: ['Normal'],
  reflex_patellar_left: ['Normal'],
  reflex_patellar_right: ['Normal'],
  reflex_withdrawal_left_thoracic: ['Normal'],
  reflex_withdrawal_right_thoracic: ['Normal'],
  reflex_panniculus: ['Normal'],
  deep_pain: ['Presente'],
  pain_cervical: ['Ausente'],
  pain_thoracolumbar: ['Ausente'],
  pain_lumbosacral: ['Ausente'],
}

export function isNormalExamValue(key: string, value: unknown): boolean {
  if (!isExamValueFilled(value)) return true
  const normalValues = NORMAL_VALUES_BY_FIELD[key]
  if (!normalValues) return String(value) === 'Normal'
  return normalValues.includes(String(value))
}

export type ExamSectionSummary = {
  title: string
  items: string[]
}

export function buildFullExamSections(exam: Record<string, unknown> | undefined | null): ExamSectionSummary[] {
  const source = applyNormalExamDefaults(exam)
  return NEURO_EXAM_SECTIONS.map((section) => ({
    title: section.reportTitle,
    items: section.examKeys.map(
      (key) => `${EXAM_FIELD_LABELS[key] || key}: ${String(source[key] ?? 'Não avaliado')}`,
    ),
  }))
}

export function buildAlteredExamSections(exam: Record<string, unknown> | undefined | null): ExamSectionSummary[] {
  const source = applyNormalExamDefaults(exam)
  return NEURO_EXAM_SECTIONS.map((section) => ({
    title: section.reportTitle,
    items: section.examKeys
      .filter((key) => !isNormalExamValue(key, source[key]))
      .map((key) => `${EXAM_FIELD_LABELS[key] || key}: ${String(source[key])}`),
  })).filter((section) => section.items.length > 0)
}

export function groupUnfilledFieldsBySection(
  details: UnfilledExamFieldDetail[],
): Array<{ sectionTitle: string; items: UnfilledExamFieldDetail[] }> {
  const order = NEURO_EXAM_SECTIONS.map((s) => s.reportTitle)
  const grouped = new Map<string, UnfilledExamFieldDetail[]>()
  for (const item of details) {
    const list = grouped.get(item.sectionTitle) || []
    list.push(item)
    grouped.set(item.sectionTitle, list)
  }
  return order
    .filter((title) => grouped.has(title))
    .map((sectionTitle) => ({ sectionTitle, items: grouped.get(sectionTitle)! }))
}
