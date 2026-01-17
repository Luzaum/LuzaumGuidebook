import type { HelpTopic } from '../../types/helpTopics'

import { section1Mentacao } from './section1_mentacao'
import { section2MarchaPostura } from './section2_marcha_postura'
import { section3ReacoesPosturais } from './section3_reacoes_posturais'
import { section4NervosCranianos } from './section4_nervos_cranianos'
import { section5ReflexosEspinhais } from './section5_reflexos_espinhais'
import { section6DorNocicepcao } from './section6_dor_nocicepcao'

// Consolidar todos os tópicos de todas as seções
const allTopics: HelpTopic[] = [
  ...section1Mentacao,
  ...section2MarchaPostura,
  ...section3ReacoesPosturais,
  ...section4NervosCranianos,
  ...section5ReflexosEspinhais,
  ...section6DorNocicepcao,
]

// Mapa indexado por ID para acesso rápido
export const helpTopicsById: Record<string, HelpTopic> = allTopics.reduce(
  (acc, topic) => {
    acc[topic.id] = topic
    return acc
  },
  {} as Record<string, HelpTopic>,
)

// Função helper para obter tópico (com null safety)
export function getHelpTopic(id: string): HelpTopic | null {
  return helpTopicsById[id] || null
}

// Validação opcional em dev (não quebrar produção)
export function validateHelpTopics(): string[] {
  const errors: string[] = []
  const seen = new Set<string>()

  for (const t of allTopics) {
    if (!t.id?.trim()) {
      errors.push('HelpTopic sem id')
      continue
    }
    if (seen.has(t.id)) {
      errors.push(`HelpTopic id duplicado: ${t.id}`)
    }
    seen.add(t.id)

    const required = ['title', 'whatItAssesses', 'neuroanatomy', 'howToPerform', 'interpretation', 'pitfalls'] as const
    for (const k of required) {
      const v = t[k]
      if (!v || String(v).trim().length < 10) {
        errors.push(`HelpTopic ${t.id} campo fraco/ausente: ${k}`)
      }
    }
  }

  return errors
}

// Re-exportar tipo para compatibilidade
export type { HelpTopic } from '../../types/helpTopics'
