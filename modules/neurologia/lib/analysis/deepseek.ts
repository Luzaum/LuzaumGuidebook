import type { CaseReport } from '../../types/analysis'
import { getEnv } from '../../../../utils/env'

type CaseStateInput = {
  patient: unknown
  complaint: unknown
  neuroExam: unknown
}

type CoverageSection = {
  expected: string[]
  matched: string[]
  missing: string[]
  covered: boolean
}

export type DeepSeekCoverageReport = {
  score: number
  identification: CoverageSection
  historyContext: CoverageSection
  neuroExam: CoverageSection
}

export type DeepSeekClinicalOpinionResult = {
  content: string | null
  modelUsed: string
  fallbackUsed: boolean
  coverage: DeepSeekCoverageReport | null
}

export type DeepSeekProgressUpdate = {
  progress: number
  stage: string
  detail?: string
  model?: string
  fallback?: boolean
}

type DeepSeekStructuredDifferential = {
  diagnosis: string
  probability: number
  category: string
  clinicalFit: string
  supportingFindings: string[]
  opposingFindings: string[]
  prioritizedDiagnostics: string[]
  patientAssessment: string[]
  monitoringPlan: string[]
  treatmentPlan: string[]
  allowedDrugs: string[]
  avoidDrugs: string[]
  comorbidityIntegration: string[]
}

type DeepSeekStructuredClinicalReport = {
  neurolocalization: {
    probableLocation: string
    distribution: string
    motorPattern: string
    confidence: number
    reasoning: string
    supportiveFindings: string[]
    contradictoryFindings: string[]
  }
  differentials: DeepSeekStructuredDifferential[]
  prioritiesNext6h: string[]
  criticalAlerts: string[]
  comorbidityImpact: {
    alerts: string[]
    cautions: string[]
    recommendedTests: string[]
    avoidOrAdjust: string[]
  }
  limitations: string[]
  references: string[]
}

const DIRECT_DEEPSEEK_URL = 'https://api.deepseek.com/v1/chat/completions'
const DEV_PROXY_DEEPSEEK_URL = '/api/deepseek/v1/chat/completions'

const CHIEF_COMPLAINT_LABELS: Record<string, string> = {
  ConvulsaoFocal: 'Convulsao focal',
  ConvulsaoGeneralizada: 'Convulsao generalizada',
  ClusterConvulsoes: 'Cluster de convulsoes',
  Sincope: 'Sincope / colapso',
  AlteracaoConsciencia: 'Alteracao do nivel de consciencia',
  Comportamento: 'Alteracao comportamental',
  AndarCirculos: 'Andar em circulos / head pressing',
  Cegueira: 'Cegueira aguda',
  Anisocoria: 'Anisocoria / alteracao pupilar',
  HeadTilt: 'Head tilt',
  Vertigem: 'Vertigem / vomito vestibular',
  Nistagmo: 'Nistagmo',
  Ataxia: 'Ataxia / descoordenacao',
  Paresia: 'Paresia / paralisia',
  Tetraparesia: 'Tetraparesia',
  Paraparesia: 'Paraparesia',
  Hipermetria: 'Hipermetria / tremor de intencao',
  DorCervical: 'Dor espinhal cervical',
  DorToracolombar: 'Dor espinhal toracolombar',
  DorLombossacra: 'Dor espinhal lombossacra',
  DisfuncaoFacial: 'Disfuncao de nervo facial',
  Disfagia: 'Disfagia / regurgitacao',
  Disfonia: 'Disfonia / alteracao de voz',
  DisfuncaoUrinaria: 'Disfuncao urinaria / fecal',
  IncontinenciaUrinaria: 'Incontinencia urinaria',
  RetencaoUrinaria: 'Retencao urinaria',
  Tremores: 'Tremores / mioclonias',
  FraquezaFlacida: 'Fraqueza flacida / intolerancia ao exercicio',
  Colapso: 'Colapso recorrente',
  Outros: 'Outros sinais',
}

const RED_FLAG_LABELS: Record<string, string> = {
  coma_estupor: 'Coma / estupor',
  status_epilepticus: 'Status epilepticus / cluster grave',
  severe_progression_24h: 'Piora neurologica rapida (<24h)',
  acute_nonambulatory: 'Nao ambulatorio agudo',
  respiratory_compromise: 'Sinais respiratorios / aspiracao',
  deep_pain_loss: 'Dor profunda ausente',
  severe_cervical_pain: 'Cervicalgia intensa',
  anisocoria_acute: 'Anisocoria aguda',
  dysphagia_aspiration_risk: 'Disfagia com risco de aspiracao',
}

const EXAM_FIELD_LABELS: Record<string, string> = {
  mentation: 'Mentacao',
  behavior: 'Comportamento',
  head_posture: 'Postura da cabeca',
  ambulation: 'Capacidade de deambular',
  gait_thoracic: 'Marcha dos membros toracicos',
  gait_pelvic: 'Marcha dos membros pelvicos',
  ataxia_type: 'Tipo de ataxia',
  proprioception_thoracic_left: 'Propriocepcao toracico esquerdo',
  proprioception_thoracic_right: 'Propriocepcao toracico direito',
  proprioception_pelvic_left: 'Propriocepcao pelvico esquerdo',
  proprioception_pelvic_right: 'Propriocepcao pelvico direito',
  menace_left: 'Resposta a ameaca esquerda',
  menace_right: 'Resposta a ameaca direita',
  plr_left: 'PLR esquerdo',
  plr_right: 'PLR direito',
  nystagmus: 'Nistagmo',
  strabismus: 'Estrabismo',
  cn_facial_sensation: 'Sensibilidade facial',
  cn_swallowing: 'Reflexo de degluticao',
  reflex_patellar_left: 'Reflexo patelar esquerdo',
  reflex_patellar_right: 'Reflexo patelar direito',
  reflex_withdrawal_left_thoracic: 'Retirada toracico esquerdo',
  reflex_withdrawal_right_thoracic: 'Retirada toracico direito',
  reflex_panniculus: 'Panniculus',
  deep_pain: 'Dor profunda',
  pain_cervical: 'Dor cervical',
  pain_thoracolumbar: 'Dor toracolombar',
  pain_lumbosacral: 'Dor lombossacra',
}

type DeepSeekMessage = {
  content?: unknown
  reasoning_content?: unknown
}

type DeepSeekResponse = {
  choices?: Array<{
    message?: DeepSeekMessage
    text?: unknown
  }>
}

function safeJson(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return '{}'
  }
}

function firstNonEmpty(...values: Array<string | null | undefined>): string {
  return values.find((value) => Boolean(value && value.trim().length > 0))?.trim() || ''
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\r/g, '').replace(/\n{3,}/g, '\n\n').trim()
}

function clampNumber(value: unknown, min: number, max: number, fallback: number): number {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) {
    return fallback
  }
  return Math.min(max, Math.max(min, numeric))
}

function normalizeForMatch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function prettifyToken(token: string): string {
  return token
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractTextFromUnknown(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim()
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => extractTextFromUnknown(item))
      .filter(Boolean)
      .join('\n')
      .trim()
  }

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    return firstNonEmpty(
      extractTextFromUnknown(record.text),
      extractTextFromUnknown(record.content),
      extractTextFromUnknown(record.value),
    )
  }

  return ''
}

function extractFirstJsonObject(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) {
    return null
  }

  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const candidate = fencedMatch?.[1]?.trim() || trimmed
  const start = candidate.indexOf('{')
  if (start < 0) {
    return null
  }

  let depth = 0
  let inString = false
  let escaped = false

  for (let index = start; index < candidate.length; index += 1) {
    const char = candidate[index]

    if (inString) {
      if (escaped) {
        escaped = false
      } else if (char === '\\') {
        escaped = true
      } else if (char === '"') {
        inString = false
      }
      continue
    }

    if (char === '"') {
      inString = true
      continue
    }

    if (char === '{') {
      depth += 1
    } else if (char === '}') {
      depth -= 1
      if (depth === 0) {
        return candidate.slice(start, index + 1)
      }
    }
  }

  return null
}

function sanitizeJsonCandidate(value: string): string {
  return value
    .replace(/^\uFEFF/, '')
    .replace(/,\s*([}\]])/g, '$1')
    .trim()
}

function looksLikeJsonPayload(value: string): boolean {
  const trimmed = value.trim()
  return (
    trimmed.startsWith('{') ||
    trimmed.startsWith('[') ||
    /^```(?:json)?/i.test(trimmed)
  )
}

function pickFirstDefined(record: Record<string, any>, keys: string[]): unknown {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null) {
      return record[key]
    }
  }
  return undefined
}

function toStringList(value: unknown, fallback: string[] = []): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => extractTextFromUnknown(item))
      .filter(Boolean)
  }

  if (typeof value === 'string') {
    const normalized = value
      .split(/\r?\n|;\s+/)
      .map((item) => item.replace(/^[-•]\s*/, '').trim())
      .filter(Boolean)
    return normalized.length > 0 ? normalized : fallback
  }

  return fallback
}

function normalizeProbabilities(items: DeepSeekStructuredDifferential[]): DeepSeekStructuredDifferential[] {
  if (items.length === 0) {
    return []
  }

  const total = items.reduce((sum, item) => sum + Math.max(0, item.probability || 0), 0)
  if (total <= 0) {
    const base = Math.floor(100 / items.length)
    const remainder = 100 - base * items.length
    return items.map((item, index) => ({
      ...item,
      probability: base + (index < remainder ? 1 : 0),
    }))
  }

  const raw = items.map((item) => ({
    item,
    scaled: (Math.max(0, item.probability || 0) / total) * 100,
  }))

  const normalized = raw.map((entry) => ({
    ...entry.item,
    probability: Math.floor(entry.scaled),
  }))

  let remainder = 100 - normalized.reduce((sum, item) => sum + item.probability, 0)
  const rankedRemainders = raw
    .map((entry, index) => ({
      index,
      fraction: entry.scaled - Math.floor(entry.scaled),
    }))
    .sort((left, right) => right.fraction - left.fraction)

  let pointer = 0
  while (remainder > 0 && rankedRemainders.length > 0) {
    normalized[rankedRemainders[pointer % rankedRemainders.length].index].probability += 1
    remainder -= 1
    pointer += 1
  }

  return normalized.sort((left, right) => right.probability - left.probability)
}

function parseStructuredClinicalReport(rawContent: string): DeepSeekStructuredClinicalReport | null {
  const jsonBlock = extractFirstJsonObject(rawContent)
  if (!jsonBlock) {
    return null
  }

  try {
    const parsed = JSON.parse(sanitizeJsonCandidate(jsonBlock)) as Record<string, any>
    const neurolocalization =
      (pickFirstDefined(parsed, [
        'neurolocalization',
        'neuroLocalization',
        'neuro_localization',
      ]) as Record<string, any>) || {}
    const differentialsSource = pickFirstDefined(parsed, [
      'differentials',
      'topDifferentials',
      'top5Differentials',
      'diagnosticDifferentials',
    ])
    const differentialsRaw = Array.isArray(differentialsSource) ? differentialsSource.slice(0, 5) : []
    if (differentialsRaw.length < 5) {
      return null
    }

    const normalizedDifferentials = normalizeProbabilities(
      differentialsRaw.map((item: Record<string, any>) => ({
        diagnosis:
          extractTextFromUnknown(
            pickFirstDefined(item, ['diagnosis', 'diagnostic', 'title', 'name', 'differential']),
          ) || 'Diagnostico nao especificado',
        probability: clampNumber(
          pickFirstDefined(item, ['probability', 'likelihood', 'chance', 'confidence']),
          0,
          100,
          0,
        ),
        category: extractTextFromUnknown(pickFirstDefined(item, ['category', 'etiology', 'group'])) || 'Nao informado',
        clinicalFit:
          extractTextFromUnknown(
            pickFirstDefined(item, [
              'clinicalFit',
              'caseFit',
              'summary',
              'rationaleSummary',
              'fitSummary',
            ]),
          ) || 'Sintese clinica nao informada.',
        supportingFindings: toStringList(
          pickFirstDefined(item, [
            'supportingFindings',
            'supportiveFindings',
            'findingsFor',
            'supportingEvidence',
          ]),
          ['Achados a favor nao informados'],
        ),
        opposingFindings: toStringList(
          pickFirstDefined(item, [
            'opposingFindings',
            'findingsAgainst',
            'contradictoryFindings',
            'conflictingFindings',
          ]),
          ['Achados contra nao informados'],
        ),
        prioritizedDiagnostics: toStringList(
          pickFirstDefined(item, [
            'prioritizedDiagnostics',
            'diagnostics',
            'diagnosticPlan',
            'howToDiagnose',
            'workup',
          ]),
          ['Exames priorizados nao informados'],
        ),
        patientAssessment: toStringList(
          pickFirstDefined(item, ['patientAssessment', 'assessment', 'howToAssess', 'bedsideEvaluation']),
          ['Avaliacao do paciente nao informada'],
        ),
        monitoringPlan: toStringList(
          pickFirstDefined(item, ['monitoringPlan', 'monitoring', 'reassessment', 'followUp']),
          ['Monitorizacao nao informada'],
        ),
        treatmentPlan: toStringList(
          pickFirstDefined(item, ['treatmentPlan', 'treatment', 'management', 'howToTreat']),
          ['Plano terapeutico nao informado'],
        ),
        allowedDrugs: toStringList(
          pickFirstDefined(item, ['allowedDrugs', 'consideredDrugs', 'medicationsToConsider']),
          ['Farmacos a considerar nao informados'],
        ),
        avoidDrugs: toStringList(
          pickFirstDefined(item, ['avoidDrugs', 'avoidOrAdjustDrugs', 'contraindicatedDrugs']),
          ['Farmacos a evitar ou ajustar nao informados'],
        ),
        comorbidityIntegration: toStringList(
          pickFirstDefined(item, ['comorbidityIntegration', 'comorbidityNotes', 'caseModifiers']),
          ['Impacto das comorbidades nao informado'],
        ),
      })),
    )

    return {
      neurolocalization: {
        probableLocation:
          extractTextFromUnknown(
            pickFirstDefined(neurolocalization, ['probableLocation', 'location', 'primaryLocation']),
          ) || 'Nao informado',
        distribution:
          extractTextFromUnknown(pickFirstDefined(neurolocalization, ['distribution', 'patternDistribution'])) ||
          'Nao informado',
        motorPattern:
          extractTextFromUnknown(pickFirstDefined(neurolocalization, ['motorPattern', 'gaitPattern'])) ||
          'Nao informado',
        confidence: clampNumber(
          pickFirstDefined(neurolocalization, ['confidence', 'confidencePercent', 'estimatedConfidence']),
          0,
          100,
          0,
        ),
        reasoning:
          extractTextFromUnknown(pickFirstDefined(neurolocalization, ['reasoning', 'summary', 'analysis'])) ||
          'Raciocinio nao informado.',
        supportiveFindings: toStringList(
          pickFirstDefined(neurolocalization, ['supportiveFindings', 'supportingFindings', 'supportive']),
        ),
        contradictoryFindings: toStringList(
          pickFirstDefined(neurolocalization, [
            'contradictoryFindings',
            'conflictingFindings',
            'contradictions',
          ]),
        ),
      },
      differentials: normalizedDifferentials,
      prioritiesNext6h: toStringList(
        pickFirstDefined(parsed, ['prioritiesNext6h', 'priorities', 'nextSteps', 'prioritiesNextHours']),
      ),
      criticalAlerts: toStringList(pickFirstDefined(parsed, ['criticalAlerts', 'alerts', 'redFlags'])),
      comorbidityImpact: {
        alerts: toStringList(parsed.comorbidityImpact?.alerts),
        cautions: toStringList(
          pickFirstDefined(parsed.comorbidityImpact || {}, ['cautions', 'precautions', 'therapeuticCautions']),
        ),
        recommendedTests: toStringList(
          pickFirstDefined(parsed.comorbidityImpact || {}, ['recommendedTests', 'tests', 'diagnosticAdds']),
        ),
        avoidOrAdjust: toStringList(
          pickFirstDefined(parsed.comorbidityImpact || {}, ['avoidOrAdjust', 'avoid', 'doseAdjustments']),
        ),
      },
      limitations: toStringList(pickFirstDefined(parsed, ['limitations', 'missingData', 'uncertainties'])),
      references: toStringList(pickFirstDefined(parsed, ['references', 'bibliography', 'sources'])),
    }
  } catch {
    return null
  }
}

function renderStructuredClinicalReport(report: DeepSeekStructuredClinicalReport): string {
  const lines: string[] = []

  lines.push('Neurolocalizacao')
  lines.push(`Localizacao provavel: ${report.neurolocalization.probableLocation}`)
  lines.push(`Distribuicao: ${report.neurolocalization.distribution}`)
  lines.push(`Padrao motor: ${report.neurolocalization.motorPattern}`)
  lines.push(`Confianca estimada: ${report.neurolocalization.confidence}%`)
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
    lines.push(`${index + 1}. ${item.diagnosis} - ${item.probability}%`)
    lines.push(`Categoria: ${item.category}`)
    lines.push(`Sintese clinica: ${item.clinicalFit}`)
    lines.push('Achados a favor:')
    item.supportingFindings.forEach((entry) => lines.push(`- ${entry}`))
    lines.push('Achados contra:')
    item.opposingFindings.forEach((entry) => lines.push(`- ${entry}`))
    lines.push('Exames priorizados:')
    item.prioritizedDiagnostics.forEach((entry) => lines.push(`- ${entry}`))
    lines.push('Como avaliar este paciente no plantao:')
    item.patientAssessment.forEach((entry) => lines.push(`- ${entry}`))
    lines.push('Monitorizacao e reavaliacao:')
    item.monitoringPlan.forEach((entry) => lines.push(`- ${entry}`))
    lines.push('Tratamento e conduta:')
    item.treatmentPlan.forEach((entry) => lines.push(`- ${entry}`))
    lines.push('Farmacos que posso considerar:')
    item.allowedDrugs.forEach((entry) => lines.push(`- ${entry}`))
    lines.push('Farmacos a evitar ou ajustar:')
    item.avoidDrugs.forEach((entry) => lines.push(`- ${entry}`))
    lines.push('Como as comorbidades mudam a conduta:')
    item.comorbidityIntegration.forEach((entry) => lines.push(`- ${entry}`))
    lines.push('')
  })

  if (report.prioritiesNext6h.length > 0) {
    lines.push('Prioridades praticas nas proximas 6 horas')
    report.prioritiesNext6h.forEach((item) => lines.push(`- ${item}`))
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

  return normalizeWhitespace(lines.join('\n'))
}

function resolveDeepSeekEndpoint(): string {
  const configuredUrl =
    getEnv('VITE_DEEPSEEK_API_BASE_URL') ||
    ((import.meta as any).env?.VITE_DEEPSEEK_API_BASE_URL as string | undefined)

  if (configuredUrl?.trim()) {
    return configuredUrl.trim()
  }

  const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
  const isLocalHost = /^(localhost|127\.0\.0\.1)$/i.test(hostname)
  if ((import.meta as any).env?.DEV || isLocalHost) {
    return DEV_PROXY_DEEPSEEK_URL
  }

  return DIRECT_DEEPSEEK_URL
}

function isDefinedExamValue(value: unknown): boolean {
  return value !== null && value !== undefined && String(value).trim() !== ''
}

function isAlteredExamValue(value: unknown): boolean {
  const normalized = String(value).trim()
  return !['Normal', 'Presente', 'Ausente', 'Alerta', 'Ambulatorio'].includes(normalized)
}

function buildCaseContext(caseState: CaseStateInput, report: CaseReport): string {
  const patient = (caseState?.patient || {}) as Record<string, any>
  const complaint = (caseState?.complaint || {}) as Record<string, any>
  const exam = (caseState?.neuroExam || {}) as Record<string, any>

  const chiefComplaints = Array.isArray(complaint.chiefComplaintIds)
    ? complaint.chiefComplaintIds.map((item: string) => CHIEF_COMPLAINT_LABELS[item] || prettifyToken(item))
    : []
  const redFlags = Array.isArray(complaint.redFlags)
    ? complaint.redFlags.map((item: string) => RED_FLAG_LABELS[item] || prettifyToken(item))
    : []

  const clinicalContext = [
    complaint.trauma ? 'Trauma' : null,
    complaint.toxin ? 'Toxinas' : null,
    complaint.fever ? 'Febre' : null,
    complaint.ectoparasiticideExposure ? 'Exposicao a ectoparasiticidas' : null,
    complaint.systemicDisease ? 'Doenca sistemica recente' : null,
    complaint.recentSurgeryAnesthesia ? 'Cirurgia/anestesia recente' : null,
  ].filter(Boolean)

  const examEntries = Object.entries(exam)
    .filter(([, value]) => isDefinedExamValue(value))
    .map(([key, value]) => ({
      key,
      label: EXAM_FIELD_LABELS[key] || prettifyToken(key),
      value: String(value).trim(),
      altered: isAlteredExamValue(value),
    }))

  const keyExamFindings = examEntries
    .filter((entry) => entry.altered || entry.key === 'mentation' || entry.key === 'ambulation')
    .slice(0, 18)
  const normalExamHighlights = examEntries.filter((entry) => !entry.altered).slice(0, 8)

  const pregnancyFlags = [
    patient.pregnant ? 'Gestante' : null,
    patient.lactating ? 'Lactante' : null,
  ].filter(Boolean)

  return [
    'RESUMO CLINICO LEGIVEL PARA A IA',
    '',
    'Identificacao do paciente:',
    `- ${report.patientSummary}`,
    pregnancyFlags.length > 0 ? `- Condicoes fisiologicas: ${pregnancyFlags.join(', ')}` : '- Condicoes fisiologicas: nenhuma informada',
    '',
    'Queixa, historia e contexto:',
    `- ${report.historySummary}`,
    `- Queixas principais selecionadas: ${chiefComplaints.join(', ') || 'nenhuma informada'}`,
    `- Red flags selecionadas: ${redFlags.join(', ') || 'nenhuma informada'}`,
    `- Contextos clinicos marcados: ${clinicalContext.join(', ') || 'nenhum marcado'}`,
    complaint.contextNotes?.trim() ? `- Observacoes livres: ${complaint.contextNotes.trim()}` : '- Observacoes livres: nenhuma',
    '',
    'Exame neurologico relevante:',
    ...keyExamFindings.map((entry) => `- ${entry.label}: ${entry.value}`),
    ...(normalExamHighlights.length > 0
      ? ['', 'Achados explicitamente normais/preservados informados:', ...normalExamHighlights.map((entry) => `- ${entry.label}: ${entry.value}`)]
      : []),
    '',
    'Sintese calculada pelo motor local:',
    `- ${report.examSummary}`,
    `- Neurolocalizacao: ${report.neuroLocalization.primary} | distribuicao: ${report.neuroLocalization.distribution} | padrao motor: ${report.neuroLocalization.motorPattern} | confianca: ${report.neuroLocalization.confidence}%`,
    ...(report.neuroLocalization.supportiveFindings.length > 0
      ? [`- Achados que suportam: ${report.neuroLocalization.supportiveFindings.join('; ')}`]
      : []),
    ...(report.neuroLocalization.contradictoryFindings.length > 0
      ? [`- Achados contraditorios: ${report.neuroLocalization.contradictoryFindings.join('; ')}`]
      : []),
  ].join('\n')
}

function hasStructuredReportMinimumQuality(report: DeepSeekStructuredClinicalReport): boolean {
  const meaningfulDifferentials = report.differentials.filter((item) => {
    const normalizedDiagnosis = normalizeForMatch(item.diagnosis)
    return (
      normalizedDiagnosis.length >= 8 &&
      !/diferencial amplo|indeterminado|diagnostico nao especificado|diagnostico inespecifico/.test(
        normalizedDiagnosis,
      )
    )
  })

  return (
    normalizeForMatch(report.neurolocalization.probableLocation).length >= 4 &&
    normalizeForMatch(report.neurolocalization.reasoning).length >= 24 &&
    meaningfulDifferentials.length >= 4
  )
}

function isLowQualityDeepSeekOutput(
  content: string,
  coverage: DeepSeekCoverageReport | null,
  structuredReport: DeepSeekStructuredClinicalReport | null,
): boolean {
  const normalized = normalizeForMatch(content)
  const genericPatterns = [
    /diferencial amplo \d/,
    /indeterminado/,
    /diagnostico inespecifico/,
    /preencher exame neurologico/,
  ]

  if (content.trim().length < 280) {
    return true
  }

  if (genericPatterns.some((pattern) => pattern.test(normalized))) {
    return true
  }

  if (structuredReport && hasStructuredReportMinimumQuality(structuredReport)) {
    if (!coverage) {
      return false
    }
    return coverage.score < 12
  }

  if (!coverage) {
    return true
  }

  return coverage.score < 22
}

function uniqueTokens(tokens: Array<string | null | undefined>): string[] {
  return Array.from(
    new Set(
      tokens
        .map((token) => (token || '').toString().trim())
        .filter((token) => token.length >= 3)
        .map((token) => normalizeForMatch(token)),
    ),
  )
}

function getIdentificationTokens(caseState: CaseStateInput): string[] {
  const patient = (caseState?.patient || {}) as Record<string, any>
  const species = patient.species === 'dog' ? 'cao' : patient.species === 'cat' ? 'gato' : null
  const sex = patient.sex === 'male' ? 'macho' : patient.sex === 'female' ? 'femea' : null
  const lifeStageMap: Record<string, string> = {
    neonate: 'neonato',
    pediatric: 'pediatrico',
    adult: 'adulto',
    geriatric: 'geriatrico',
  }
  const lifeStage = patient.lifeStage ? lifeStageMap[String(patient.lifeStage)] || String(patient.lifeStage) : null
  const ageYears = typeof patient.ageYears === 'number' ? `${patient.ageYears} anos` : null
  const ageMonths = typeof patient.ageMonths === 'number' ? `${patient.ageMonths} meses` : null
  const weight = typeof patient.weightKg === 'number' ? `${patient.weightKg} kg` : null
  const comorbidities = Array.isArray(patient.comorbidities)
    ? patient.comorbidities
      .slice(0, 5)
      .map((item: any) => (typeof item === 'string' ? item : item?.label || item?.key))
    : []

  return uniqueTokens([species, sex, lifeStage, ageYears, ageMonths, weight, ...comorbidities])
}

function getHistoryTokens(caseState: CaseStateInput): string[] {
  const complaint = (caseState?.complaint || {}) as Record<string, any>
  const temporalMap: Record<string, string> = {
    peragudo: 'peragudo',
    agudo: 'agudo',
    subagudo: 'subagudo',
    cronico: 'cronico',
    episodico: 'episodico',
    insidioso: 'insidioso',
    oscilante: 'oscilante',
    recorrente: 'recorrente',
  }
  const evolutionMap: Record<string, string> = {
    melhorando: 'melhorando',
    melhora_parcial: 'melhora parcial',
    estatico: 'estatico',
    'estático': 'estatico',
    flutuante: 'flutuante',
    progressivo: 'progressivo',
  }
  const contextLabels: Record<string, string> = {
    trauma: 'trauma',
    toxin: 'toxina',
    fever: 'febre',
    ectoparasiticideExposure: 'exposicao a ectoparasiticidas',
    systemicDisease: 'doenca sistemica',
    recentSurgeryAnesthesia: 'cirurgia anestesia recente',
    vaccinationOrTravel: 'vacinacao viagem endemico',
    videoOfEpisode: 'video episodio',
    respiratoryGiSigns: 'sinais respiratorios gi',
  }
  const chiefComplaints = Array.isArray(complaint.chiefComplaintIds)
    ? complaint.chiefComplaintIds.slice(0, 6)
    : []
  const redFlags = Array.isArray(complaint.redFlags) ? complaint.redFlags.slice(0, 6) : []
  const contextNotesTokens =
    typeof complaint.contextNotes === 'string'
      ? complaint.contextNotes
        .split(/[^a-zA-Z0-9À-ÿ]+/)
        .filter((word: string) => word.length >= 5)
        .slice(0, 4)
      : []
  const contexts = Object.keys(contextLabels)
    .filter((key) => Boolean(complaint[key]))
    .map((key) => contextLabels[key])

  return uniqueTokens([
    ...chiefComplaints,
    ...redFlags,
    ...contextNotesTokens,
    ...contexts,
    complaint.temporalPattern ? temporalMap[String(complaint.temporalPattern)] || String(complaint.temporalPattern) : null,
    complaint.evolutionPattern
      ? evolutionMap[String(complaint.evolutionPattern)] || String(complaint.evolutionPattern)
      : null,
  ])
}

function getExamTokens(caseState: CaseStateInput): string[] {
  const exam = (caseState?.neuroExam || {}) as Record<string, any>
  const baseTokens = [exam.mentation, exam.ambulation]
  const alteredValues = Object.entries(exam)
    .filter(
      ([, value]) =>
        value !== null &&
        value !== undefined &&
        value !== '' &&
        value !== 'Normal' &&
        value !== 'Ausente' &&
        value !== 'Presente',
    )
    .slice(0, 12)
    .map(([, value]) => String(value))

  return uniqueTokens([...baseTokens, ...alteredValues])
}

function evaluateSection(expected: string[], normalizedOutput: string): CoverageSection {
  const matched = expected.filter((token) => normalizedOutput.includes(token))
  const minimumMatches = expected.length === 0 ? 0 : Math.min(2, expected.length)
  return {
    expected,
    matched,
    missing: expected.filter((token) => !matched.includes(token)),
    covered: matched.length >= minimumMatches,
  }
}

function evaluateCoverage(output: string, caseState: CaseStateInput): DeepSeekCoverageReport {
  const normalizedOutput = normalizeForMatch(output)
  const identification = evaluateSection(getIdentificationTokens(caseState), normalizedOutput)
  const historyContext = evaluateSection(getHistoryTokens(caseState), normalizedOutput)
  const neuroExam = evaluateSection(getExamTokens(caseState), normalizedOutput)

  const expectedCount =
    identification.expected.length + historyContext.expected.length + neuroExam.expected.length
  const matchedCount =
    identification.matched.length + historyContext.matched.length + neuroExam.matched.length

  return {
    score: expectedCount > 0 ? Math.round((matchedCount / expectedCount) * 100) : 0,
    identification,
    historyContext,
    neuroExam,
  }
}

function isComplexCase(caseState: CaseStateInput, report: CaseReport): boolean {
  const complaint = (caseState?.complaint || {}) as Record<string, any>
  const patient = (caseState?.patient || {}) as Record<string, any>
  const neuroExam = (caseState?.neuroExam || {}) as Record<string, any>
  const redFlags = Array.isArray(complaint.redFlags) ? complaint.redFlags.length : 0
  const comorbidities = Array.isArray(patient.comorbidities) ? patient.comorbidities.length : 0
  const alteredExamCount = Object.values(neuroExam).filter(
    (value) =>
      value !== null &&
      value !== undefined &&
      value !== '' &&
      value !== 'Normal' &&
      value !== 'Ausente' &&
      value !== 'Presente',
  ).length

  const lowLocalizationConfidence = report.neuroLocalization.confidence < 70
  const lowTopLikelihood = (report.differentials[0]?.likelihood || 100) < 65
  const multifocalOrDiffuse =
    report.neuroLocalization.distribution === 'MULTIFOCAL' ||
    report.neuroLocalization.distribution === 'DIFUSA'

  return (
    redFlags > 0 ||
    comorbidities > 0 ||
    alteredExamCount >= 8 ||
    lowLocalizationConfidence ||
    lowTopLikelihood ||
    multifocalOrDiffuse
  )
}

function resolveModels(caseState: CaseStateInput, report: CaseReport): { primary: string; fallback: string | null } {
  const explicitModel = ((import.meta as any).env?.VITE_DEEPSEEK_MODEL as string | undefined)?.trim()
  const strategy = ((import.meta as any).env?.VITE_DEEPSEEK_MODEL_STRATEGY as string | undefined)
    ?.toLowerCase()
    .trim()
  const complexCase = isComplexCase(caseState, report)

  let primary: string
  if (strategy === 'reasoner') {
    primary = 'deepseek-reasoner'
  } else if (strategy === 'chat') {
    primary = 'deepseek-chat'
  } else if (strategy === 'auto') {
    primary = 'deepseek-chat'
  } else if (explicitModel) {
    primary = explicitModel
  } else {
    primary = 'deepseek-chat'
  }

  const fallbackFromEnv = ((import.meta as any).env?.VITE_DEEPSEEK_FALLBACK_MODEL as string | undefined)?.trim()
  const derivedFallback =
    primary === 'deepseek-reasoner'
      ? 'deepseek-chat'
      : complexCase
        ? 'deepseek-reasoner'
        : null
  const fallback =
    fallbackFromEnv && fallbackFromEnv !== primary
      ? fallbackFromEnv
      : derivedFallback

  return { primary, fallback }
}

async function requestDeepSeekCompletion(
  apiKey: string,
  model: string,
  prompt: string,
): Promise<string> {
  const response = await fetch(resolveDeepSeekEndpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.05,
      max_tokens: 3600,
      response_format: {
        type: 'json_object',
      },
      messages: [
        {
          role: 'system',
          content:
            'Especialista senior em neurologia veterinaria de pequenos animais. Responda com rigor tecnico, sem inventar dados, e siga estritamente o formato solicitado.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`DeepSeek HTTP ${response.status}: ${body}`)
  }

  const data = (await response.json()) as DeepSeekResponse
  const firstChoice = data?.choices?.[0]
  const content = firstNonEmpty(
    extractTextFromUnknown(firstChoice?.message?.content),
    extractTextFromUnknown(firstChoice?.text),
    extractTextFromUnknown(firstChoice?.message?.reasoning_content),
  )

  return normalizeWhitespace(content)
}

export async function generateDeepSeekClinicalOpinion(
  caseState: CaseStateInput,
  report: CaseReport,
  options: { onProgress?: (update: DeepSeekProgressUpdate) => void } = {},
): Promise<DeepSeekClinicalOpinionResult | null> {
  const pushProgress = (update: DeepSeekProgressUpdate) => {
    options.onProgress?.(update)
  }

  pushProgress({
    progress: 8,
    stage: 'Preparando contexto clinico',
    detail: 'Consolidando identificacao, historico, exame neurologico e sintese local.',
  })

  const processEnv =
    typeof process !== 'undefined' ? ((process as any).env as Record<string, string> | undefined) : undefined
  const apiKey =
    getEnv('VITE_DEEPSEEK_API_KEY') ||
    getEnv('DEEPSEEK_API_KEY') ||
    ((import.meta as any).env?.VITE_DEEPSEEK_API_KEY as string | undefined) ||
    ((import.meta as any).env?.DEEPSEEK_API_KEY as string | undefined) ||
    processEnv?.VITE_DEEPSEEK_API_KEY ||
    processEnv?.DEEPSEEK_API_KEY
  const normalizedApiKey = apiKey?.trim()
  if (!normalizedApiKey) {
    throw new Error(
      'VITE_DEEPSEEK_API_KEY não encontrada no frontend. Defina a variável com prefixo VITE_ e reinicie o servidor Vite.',
    )
  }
  if ((import.meta as any).env?.DEV) {
    console.debug('[NeuroVet][DeepSeek] API key detectada no frontend.')
  }

  const { primary, fallback } = resolveModels(caseState, report)
  pushProgress({
    progress: 16,
    stage: 'Estruturando pedido para a IA',
    detail: `Modelo principal selecionado: ${primary}.`,
    model: primary,
  })
  const readableCaseContext = buildCaseContext(caseState, report)

  const prompt = [
    'Voce e um neurologista veterinario senior.',
    'Use TODOS os dados de identificacao, historico/contexto e exame neurologico para construir a resposta.',
    'Baseie o raciocinio em neurologia veterinaria de pequenos animais, priorizando consensos clinicos e textos-classicos como BSAVA Manual of Canine and Feline Neurology, Dewey & da Costa, Platt & Olby, Lorenz, Merck Veterinary Manual e consensos ACVIM quando aplicaveis.',
    'Nao invente achados, exames ou comorbidades. Quando um dado estiver ausente, escreva explicitamente "nao informado".',
    'Nao use placeholders como "diferencial amplo", "indeterminado", "diagnostico 1" ou listas genericas sem vinculo ao caso.',
    'Retorne APENAS um objeto JSON valido, sem markdown, sem cercas de codigo e sem texto antes ou depois.',
    'Todos os valores textuais do JSON devem estar em portugues do Brasil.',
    'A resposta deve servir como companheiro de plantao: organizada, priorizada e clinicamente acionavel.',
    'Seja economico no texto para conseguir fechar o JSON completamente: prefira frases curtas e objetivas.',
    'Integre as comorbidades e outros problemas relevantes dentro da explicacao de cada diferencial, e nao apenas em uma secao separada.',
    'Quando citar sensibilidade/especificidade de exames, use numero apenas se houver base veterinaria robusta; caso contrario, escreva explicitamente "estimativa qualitativa" e classifique o rendimento diagnostico como alto, moderado ou baixo.',
    'Em exames de imagem e LCR, priorize linguagem prudente: explique o que o exame agrega, quais achados seriam esperados e como ele muda a conduta.',
    'Em tratamento, detalhe estabilizacao inicial, terapia-alvo, suporte, monitorizacao e restricoes farmacologicas ligadas a rim, figado, hipertensao, risco de aspiracao ou outras comorbidades presentes.',
    'O JSON deve obedecer exatamente este schema:',
    '{',
    '  "neurolocalization": {',
    '    "probableLocation": "string",',
    '    "distribution": "string",',
    '    "motorPattern": "string",',
    '    "confidence": 0,',
    '    "reasoning": "string",',
    '    "supportiveFindings": ["string"],',
    '    "contradictoryFindings": ["string"]',
    '  },',
    '  "differentials": [',
    '    {',
    '      "diagnosis": "string especifica",',
    '      "probability": 0,',
    '      "category": "string",',
    '      "clinicalFit": "paragrafo curto integrando sinais, exame e comorbidades",',
    '      "supportingFindings": ["string"],',
    '      "opposingFindings": ["string"],',
    '      "prioritizedDiagnostics": ["Prioridade | exame | rendimento diagnostico | sensibilidade/especificidade ou estimativa qualitativa | o que muda"],',
    '      "patientAssessment": ["string"],',
    '      "monitoringPlan": ["string"],',
    '      "treatmentPlan": ["string"],',
    '      "allowedDrugs": ["string"],',
    '      "avoidDrugs": ["string"],',
    '      "comorbidityIntegration": ["string"]',
    '    }',
    '  ],',
    '  "prioritiesNext6h": ["string"],',
    '  "criticalAlerts": ["string"],',
    '  "comorbidityImpact": {',
    '    "alerts": ["string"],',
    '    "cautions": ["string"],',
    '    "recommendedTests": ["string"],',
    '    "avoidOrAdjust": ["string"]',
    '  },',
    '  "limitations": ["string"],',
    '  "references": ["string"]',
    '}',
    'Regras obrigatorias:',
    '- Preencha EXATAMENTE 5 itens em "differentials".',
    '- Ordene os 5 itens da maior para a menor probabilidade.',
    '- As 5 probabilidades devem somar exatamente 100.',
    '- Use diagnosticos especificos e plausiveis para o caso.',
    '- Cada "clinicalFit" deve citar explicitamente achados do exame, evolucao e impacto das comorbidades quando houver.',
    '- Cada "clinicalFit" deve ter no maximo 3 frases curtas ou 80 palavras.',
    '- Em "prioritizedDiagnostics", comece pelo exame mais util e urgente para aquele diferencial.',
    '- Em "patientAssessment", descreva como reavaliar esse paciente no plantao de forma objetiva.',
    '- Em "monitoringPlan", explique o que monitorar, com que foco clinico e o que sugeriria piora.',
    '- Em "treatmentPlan", detalhe estabilizacao, tratamento especifico e suporte clinico de forma pratica e alinhada com literatura veterinaria.',
    '- Em "allowedDrugs" e "avoidDrugs", cite classes ou farmacos plausiveis e diga o motivo clinico da escolha/evitacao quando relevante.',
    '- Seja conciso: supportiveFindings e contradictoryFindings da neurolocalizacao com no maximo 4 itens curtos.',
    '- Em cada diferencial, use no maximo 4 itens curtos em supportingFindings, opposingFindings, prioritizedDiagnostics, patientAssessment, monitoringPlan, treatmentPlan, allowedDrugs, avoidDrugs e comorbidityIntegration.',
    '- Cada item de lista deve ter no maximo 18 palavras e apenas uma ideia principal.',
    '- prioritiesNext6h com no maximo 5 itens curtos.',
    '- criticalAlerts com no maximo 5 itens curtos.',
    '- limitations com no maximo 4 itens curtos.',
    '- references com no maximo 5 itens curtos.',
    '- Em "references", cite obras/consensos curtos usados como base do raciocinio.',
    '- Se nao existir numero confiavel de sensibilidade/especificidade para um exame naquele diferencial, nao invente percentual.',
    '',
    readableCaseContext,
    '',
    'Resumo estruturado ja calculado pelo sistema:',
    safeJson(report),
    '',
    'Dados brutos do caso:',
    safeJson(caseState),
  ].join('\n')

  const attempts = [
    { model: primary, fallbackUsed: false, qualityRetry: false },
    ...(fallback && fallback !== primary
      ? [{ model: fallback, fallbackUsed: true, qualityRetry: true }]
      : []),
  ]

  let lastError: unknown = null
  let lastContent = ''
  let lastCoverage: DeepSeekCoverageReport | null = null
  let modelUsed = primary
  let fallbackUsed = false
  const diagnostics: Array<Record<string, unknown>> = []

  for (const attempt of attempts) {
    const promptForAttempt = attempt.qualityRetry
      ? [
          prompt,
          '',
          'ATENCAO: a tentativa anterior ficou vazia, superficial ou generica.',
          'Refaca a resposta ancorando cada secao nos dados clinicos acima.',
          'O JSON anterior ficou longo demais ou fora do formato.',
          'Seja mais conciso, mantenha tudo em portugues do Brasil e feche o objeto JSON completamente.',
          'Se o caso estiver incompleto, liste exatamente quais dados faltam, mas ainda forneca hipoteses especificas plausiveis.',
        ].join('\n')
      : prompt

    try {
      pushProgress({
        progress: attempt.fallbackUsed ? 72 : 34,
        stage: attempt.fallbackUsed ? 'Acionando segunda tentativa' : 'Consultando IA principal',
        detail: attempt.fallbackUsed
          ? `A primeira resposta nao ficou boa o suficiente; tentando ${attempt.model}.`
          : `Gerando relatorio com ${attempt.model}.`,
        model: attempt.model,
        fallback: attempt.fallbackUsed,
      })

      const rawContent = await requestDeepSeekCompletion(normalizedApiKey, attempt.model, promptForAttempt)
      pushProgress({
        progress: attempt.fallbackUsed ? 84 : 58,
        stage: 'Resposta recebida',
        detail: `Validando estrutura e coerencia do retorno do modelo ${attempt.model}.`,
        model: attempt.model,
        fallback: attempt.fallbackUsed,
      })
      const normalizedRawContent = normalizeWhitespace(rawContent)
      const structuredReport = normalizedRawContent ? parseStructuredClinicalReport(normalizedRawContent) : null
      const content = structuredReport
        ? renderStructuredClinicalReport(structuredReport)
        : looksLikeJsonPayload(normalizedRawContent)
          ? ''
          : normalizedRawContent
      const coverage = content ? evaluateCoverage(content, caseState) : null
      const probabilitiesSum = structuredReport
        ? structuredReport.differentials.reduce((sum, item) => sum + item.probability, 0)
        : 0
      const lowQuality =
        !content ||
        !structuredReport ||
        isLowQualityDeepSeekOutput(content, coverage, structuredReport) ||
        structuredReport.differentials.length !== 5 ||
        probabilitiesSum !== 100

      modelUsed = attempt.model
      fallbackUsed = attempt.fallbackUsed
      lastContent = content
      lastCoverage = coverage

      if (!lowQuality) {
        pushProgress({
          progress: 100,
          stage: 'Relatorio finalizado',
          detail: 'A analise estruturada da IA foi aceita e esta pronta para leitura.',
          model: attempt.model,
          fallback: attempt.fallbackUsed,
        })
        return {
          content,
          modelUsed,
          fallbackUsed,
          coverage,
        }
      }

      diagnostics.push({
        type: 'low_quality',
        model: attempt.model,
        coverage,
        preview: rawContent.slice(0, 600),
      })

      if ((import.meta as any).env?.DEV) {
        console.debug('[NeuroVet][DeepSeek] Tentativa rejeitada, seguindo para fallback.', {
          model: attempt.model,
          coverage,
        })
      }

      pushProgress({
        progress: attempt.fallbackUsed ? 92 : 66,
        stage: attempt.fallbackUsed ? 'Ajustando melhor versao disponivel' : 'Ajustando para nova tentativa',
        detail: attempt.fallbackUsed
          ? 'A segunda resposta nao ficou perfeita; verificando se a melhor versao disponivel ainda e aproveitavel.'
          : 'A primeira resposta ficou incompleta ou pouco consistente; vou tentar uma segunda passagem.',
        model: attempt.model,
        fallback: attempt.fallbackUsed,
      })
    } catch (error) {
      lastError = error
      diagnostics.push({
        type: 'request_error',
        model: attempt.model,
        error,
      })

      if ((import.meta as any).env?.DEV) {
        console.debug('[NeuroVet][DeepSeek] Falha na tentativa, seguindo para fallback.', {
          model: attempt.model,
        })
      }

      pushProgress({
        progress: attempt.fallbackUsed ? 88 : 62,
        stage: attempt.fallbackUsed ? 'Falha na segunda tentativa' : 'Falha na primeira tentativa',
        detail: attempt.fallbackUsed
          ? 'Nao foi possivel obter uma resposta melhor na segunda passagem.'
          : 'A primeira consulta falhou; vou tentar o modelo alternativo.',
        model: attempt.model,
        fallback: attempt.fallbackUsed,
      })
    }
  }

  if (lastError && !lastContent) {
    if ((import.meta as any).env?.DEV) {
      console.warn('[NeuroVet][DeepSeek] Todas as tentativas falharam.', diagnostics)
    }
    throw lastError
  }

  if (!lastContent && (import.meta as any).env?.DEV) {
    console.warn('[NeuroVet][DeepSeek] Nenhuma tentativa gerou relatorio clinico valido.', diagnostics)
  }

  if (lastContent) {
    pushProgress({
      progress: 100,
      stage: 'Relatorio finalizado com melhor versao disponivel',
      detail: 'A resposta nao passou em todos os criterios internos, mas havia conteudo clinico suficiente para exibir.',
      model: modelUsed,
      fallback: fallbackUsed,
    })
  }

  return {
    content: lastContent || null,
    modelUsed,
    fallbackUsed,
    coverage: lastCoverage,
  }
}
