import {
  NeuroExam,
  NeuroLocalization,
  PatientProfile,
} from '../types'
import { getHelpTopic } from '../data/helpTopics'
import { EXAM_TO_TOPIC_MAP } from './engineRules'
import type { HelpTopic } from '../types/helpTopics'

// Definição interna para pontuação
type LocalizationScore = {
  region: string
  score: number
  count: number
}

export function analyzeNeuroExam(
  exam: NeuroExam,
  patient: PatientProfile,
): NeuroLocalization {
  // 1. Identificar Tópicos Ativos
  const activeTopics: HelpTopic[] = []

  Object.entries(exam).forEach(([key, value]) => {
    // Verifica se temos regra para essa chave
    const rule = EXAM_TO_TOPIC_MAP[key]
    if (rule && typeof value === 'string') {
      const topicId = rule[value] // Ex: 's5-patelar-esq-normal'
      if (topicId) {
        const topic = getHelpTopic(topicId)
        if (topic) {
          activeTopics.push(topic)
        }
      }
    }
  })

  // 2. Processar Lógica do Motor
  const localizationScores = new Map<string, number>()
  const alerts: string[] = []
  const suggestedTestsSet = new Set<string>()
  const emergencyTriggers: string[] = []
  let maxUrgency: 'BAIXA' | 'MEDIA' | 'ALTA' = 'BAIXA'

  activeTopics.forEach(topic => {
    // A. Neurolocalização e Pesos
    if (topic.neuroLocalization && topic.neuroLocalization.length > 0) {
      const weight = topic.diagnosticWeight || 1
      topic.neuroLocalization.forEach(loc => {
        const currentScore = localizationScores.get(loc) || 0
        localizationScores.set(loc, currentScore + weight)
      })
    }

    // B. Urgência / Emergências
    if (topic.urgencyFlag) {
      if (maxUrgency === 'BAIXA') maxUrgency = 'MEDIA'
    }

    if (topic.emergencyTriggers && topic.emergencyTriggers.length > 0) {
      maxUrgency = 'ALTA'
      topic.emergencyTriggers.forEach(t => emergencyTriggers.push(t))
    }

    // C. Alertas Clínicos
    if (topic.clinicalAlerts) {
      topic.clinicalAlerts.forEach(alert => alerts.push(alert))
    }

    // D. Exames Sugeridos
    if (topic.suggestedTests) {
      topic.suggestedTests.forEach(test => suggestedTestsSet.add(test))
    }
  })

  // 3. Ranking de Localização
  const sortedLocalizations = Array.from(localizationScores.entries())
    .sort((a, b) => b[1] - a[1]) // Maior score primeiro

  const primaryResult = sortedLocalizations[0]
  const secondaryResult = sortedLocalizations[1]

  // Mapear identificadores internos para nomes legíveis
  const prettyNames: Record<string, string> = {
    forebrain: 'Prosencéfalo (Cérebro)',
    brainstem: 'Tronco Encefálico',
    cerebellum: 'Cerebelo',
    vestibular_peripheral: 'Vestibular Periférico',
    vestibular_central: 'Vestibular Central (Tronco Encefálico)',
    C1_C5: 'C1-C5 (Cervical Cranial)',
    C6_T2: 'C6-T2 (Intumescência Cervical)',
    T3_L3: 'T3-L3 (Toracolombar)',
    L4_S3: 'L4-S3 (Intumescência Lombar)',
    peripheral_nerve: 'Nervo Periférico',
    neuromuscular: 'Junção Neuromuscular / Miopatia'
  }

  const primaryName = primaryResult ? prettyNames[primaryResult[0]] || primaryResult[0] : 'Indeterminado'
  const secondaryName = secondaryResult ? prettyNames[secondaryResult[0]] || secondaryResult[0] : undefined

  // 4. Construir narrativa e explicação
  let explanation = ''
  let confidence = 0

  if (activeTopics.length === 0) {
    explanation = 'Ainda não há dados suficientes. Preencha o exame.'
  } else if (!primaryResult) {
    explanation = 'Não foi possível determinar uma localização focal com os dados atuais. Considere doença difusa ou multifocal.'
  } else {
    explanation = `Localização mais provável: ${primaryName}`
    if (secondaryResult && secondaryResult[1] >= (primaryResult[1] * 0.7)) {
      explanation += ` ou ${secondaryName}.`
      confidence = 70
    } else {
      confidence = 90
    }
    explanation += ` Baseado em ${activeTopics.length} achados clínicos.`
  }

  if (emergencyTriggers.length > 0) {
    explanation += ` \n\n⚠️ ALERTA DE EMERGÊNCIA: Sinais compatíveis com ${emergencyTriggers.join(', ')} identificados.`
  }

  return {
    primary: primaryName as any, // Cast para evitar erro de tipo estrito temporário
    secondary: secondaryResult ? [secondaryName as any] : [],
    explanation,
    confidence,
    // Estendendo o tipo de retorno se necessário, ou adaptando ao existente
    // O tipo NeuroLocalization atual é restrito, talvez precisemos estender
  }
}
