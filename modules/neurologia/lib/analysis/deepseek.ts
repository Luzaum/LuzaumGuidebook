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

function safeJson(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return '{}'
  }
}

function normalizeForMatch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
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
  }
  const evolutionMap: Record<string, string> = {
    melhorando: 'melhorando',
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

function resolveModels(caseState: CaseStateInput, report: CaseReport): { primary: string; fallback: string } {
  const explicitModel = (import.meta.env.VITE_DEEPSEEK_MODEL as string | undefined)?.trim()
  const strategy = (import.meta.env.VITE_DEEPSEEK_MODEL_STRATEGY as string | undefined)
    ?.toLowerCase()
    .trim()

  let primary: string
  if (strategy === 'reasoner') {
    primary = 'deepseek-reasoner'
  } else if (strategy === 'chat') {
    primary = 'deepseek-chat'
  } else if (strategy === 'auto') {
    primary = isComplexCase(caseState, report) ? 'deepseek-reasoner' : 'deepseek-chat'
  } else if (explicitModel) {
    primary = explicitModel
  } else {
    primary = isComplexCase(caseState, report) ? 'deepseek-reasoner' : 'deepseek-chat'
  }

  const fallbackFromEnv = (import.meta.env.VITE_DEEPSEEK_FALLBACK_MODEL as string | undefined)?.trim()
  const fallback = fallbackFromEnv || (primary === 'deepseek-reasoner' ? 'deepseek-chat' : 'deepseek-reasoner')

  return { primary, fallback }
}

async function requestDeepSeekCompletion(
  apiKey: string,
  model: string,
  prompt: string,
): Promise<string> {
  const response = await fetch('/api/deepseek/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.15,
      max_tokens: 1700,
      messages: [
        {
          role: 'system',
          content:
            'Especialista senior em neurologia veterinaria. Resposta tecnica, objetiva e clinicamente acionavel.',
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

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }

  return data?.choices?.[0]?.message?.content?.trim() || ''
}

export async function generateDeepSeekClinicalOpinion(
  caseState: CaseStateInput,
  report: CaseReport,
): Promise<DeepSeekClinicalOpinionResult | null> {
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

  const prompt = [
    'Voce e um neurologista veterinario senior.',
    'Use TODOS os dados de identificacao, historico/contexto e exame neurologico para construir a resposta.',
    'Responda em portugues do Brasil, em Markdown tecnico e conciso.',
    'Formato obrigatorio:',
    '1) Checklist de cobertura dos dados de entrada',
    '- Identificacao do paciente (especie, idade, sexo, peso, comorbidades)',
    '- Historico e contexto (queixa, temporalidade, evolucao, red flags, contexto clinico)',
    '- Exame neurologico (achados-chave usados no raciocinio)',
    '',
    '2) Top 5 diagnosticos mais provaveis (EXATAMENTE 5, em ordem de probabilidade)',
    'Para cada diagnostico, inclua obrigatoriamente:',
    '- Diagnostico e probabilidade estimada (%)',
    '- Por que e provavel neste caso',
    '- Como diagnosticar (exames priorizados, achados esperados e limitacoes)',
    '- Como tratar (fase 0-6h e fase direcionada)',
    '- Como avaliar/reavaliar o paciente (monitorizacao e metas 24-72h)',
    '- Pontos importantes e armadilhas clinicas',
    '',
    '3) Prioridades praticas para as proximas 6 horas',
    '4) Alertas criticos que nao podem ser negligenciados',
    '',
    'Se faltar dado relevante, explicite na checklist e ajuste o grau de certeza.',
    '',
    'Resumo estruturado ja calculado pelo sistema:',
    safeJson(report),
    '',
    'Dados brutos do caso:',
    safeJson(caseState),
  ].join('\n')

  let content = ''
  let modelUsed = primary
  let fallbackUsed = false

  try {
    content = await requestDeepSeekCompletion(normalizedApiKey, primary, prompt)
  } catch (primaryError) {
    if (!fallback || fallback === primary) {
      throw primaryError
    }
    content = await requestDeepSeekCompletion(normalizedApiKey, fallback, prompt)
    modelUsed = fallback
    fallbackUsed = true
  }

  const normalized = content.trim()
  return {
    content: normalized || null,
    modelUsed,
    fallbackUsed,
    coverage: normalized ? evaluateCoverage(normalized, caseState) : null,
  }
}
