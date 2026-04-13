import type { PatientContextV2, ScenarioKey, SyndromeProfileV2 } from '../model/types'

/**
 * Resolve qual bloco de cenário usar. Prioriza o informado pelo usuário (severity);
 * faz fallback se o perfil não tiver o bloco.
 *
 * Quadros em que “ambulatorial estável” raramente é adequado — prioriza internação no modelo.
 */
const SYNDROMES_PREFER_HOSPITAL_OVER_AMBULATORY = new Set<string>([
  'sepse',
  'pielonefrite',
  'piotórax',
  'artrite_septica',
  'osteomielite',
])

export function resolveScenarioKey(
  profile: SyndromeProfileV2,
  ctx: PatientContextV2,
): { key: ScenarioKey; fallbackFrom?: ScenarioKey } {
  const order: ScenarioKey[] = ['septic_unstable', 'severe', 'hospitalized', 'ambulatory_stable']

  let requested = mapSeverityToScenario(ctx.severity)

  if (requested === 'ambulatory_stable' && SYNDROMES_PREFER_HOSPITAL_OVER_AMBULATORY.has(profile.id)) {
    const h = profile.scenarios.hospitalized?.firstLineRegimenIds?.length
      ? 'hospitalized'
      : profile.scenarios.severe?.firstLineRegimenIds?.length
        ? 'severe'
        : null
    if (h) {
      requested = h as ScenarioKey
      const pick = (k: ScenarioKey): ScenarioKey | null => {
        if (profile.scenarios[k]?.firstLineRegimenIds?.length) return k
        return null
      }
      const primary = pick(requested)
      if (primary) return { key: primary, fallbackFrom: 'ambulatory_stable' }
    }
  }

  const pick = (k: ScenarioKey): ScenarioKey | null => {
    if (profile.scenarios[k]?.firstLineRegimenIds?.length) return k
    return null
  }

  let primary = pick(requested)
  if (primary) return { key: primary }

  const idx = order.indexOf(requested)
  for (let i = idx + 1; i < order.length; i++) {
    const k = order[i]
    if (pick(k)) return { key: k!, fallbackFrom: requested }
  }
  for (let i = idx - 1; i >= 0; i--) {
    const k = order[i]
    if (pick(k)) return { key: k!, fallbackFrom: requested }
  }

  return { key: 'ambulatory_stable', fallbackFrom: requested }
}

function mapSeverityToScenario(s: PatientContextV2['severity']): ScenarioKey {
  switch (s) {
    case 'septic_unstable':
      return 'septic_unstable'
    case 'severe':
      return 'severe'
    case 'hospitalized':
      return 'hospitalized'
    case 'ambulatory_stable':
    default:
      return 'ambulatory_stable'
  }
}
