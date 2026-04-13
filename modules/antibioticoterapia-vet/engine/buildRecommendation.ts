import type {
  AntibioticRegimen,
  AvoidEntry,
  PatientContextV2,
  RecommendationResult,
  RegimenRecommendation,
} from '../model/types'
import { SYNDROME_PROFILES_V2 } from '../data-v2/syndromes'
import { ANTIBIOTIC_REGIMENS } from '../data-v2/regimens'
import { ANTIBIOTIC_MOLECULES } from '../data-v2/molecules'
import { cultureDetail } from './culture'
import { resolveScenarioKey } from './resolveScenario'
import {
  applyGestationAdjustments,
  avoidEntriesForContext,
  collectPatientAlerts,
  stewardshipAlertsFromProfile,
} from './patientRules'

function getRegimen(id: string): AntibioticRegimen | undefined {
  return ANTIBIOTIC_REGIMENS[id]
}

function dedupe(ids: string[]): string[] {
  return [...new Set(ids)]
}

export function buildRecommendation(syndromeId: string, ctx: PatientContextV2): RecommendationResult {
  const profile = SYNDROME_PROFILES_V2[syndromeId]
  if (!profile) {
    throw new Error(`[abv-v2] Síndrome desconhecida: ${syndromeId}`)
  }

  const { key: scenarioKey, fallbackFrom } = resolveScenarioKey(profile, ctx)
  const block = profile.scenarios[scenarioKey]
  if (!block || !block.firstLineRegimenIds.length) {
    throw new Error(`[abv-v2] Cenário sem regimes: ${syndromeId} / ${scenarioKey}`)
  }

  let firstIds = dedupe([...block.firstLineRegimenIds])
  let altIds = dedupe([...block.alternativeRegimenIds])

  const gest = applyGestationAdjustments(ctx, firstIds, altIds, getRegimen)
  firstIds = dedupe(gest.firstLineIds)
  altIds = dedupe(gest.altIds).filter((id) => !firstIds.includes(id))

  if (firstIds.length === 0 && altIds.length > 0) {
    firstIds = [altIds[0]]
    altIds = altIds.slice(1)
  }

  const toRec = (id: string): RegimenRecommendation | null => {
    const regimen = getRegimen(id)
    if (!regimen) return null
    const mods = gest.modifiers.get(id) ?? []
    return { regimenId: id, regimen, modifiersApplied: mods }
  }

  const firstLine = firstIds.map(toRec).filter(Boolean) as RegimenRecommendation[]
  const alternatives = altIds.map(toRec).filter(Boolean) as RegimenRecommendation[]

  const patientAlerts = collectPatientAlerts(
    ctx,
    firstLine.map((x) => x.regimen),
    alternatives.map((x) => x.regimen),
  )

  const avoid: AvoidEntry[] = avoidEntriesForContext(ctx).map((a) => ({
    moleculeId: a.moleculeId,
    molecule: ANTIBIOTIC_MOLECULES[a.moleculeId],
    reason: a.reason,
  }))

  for (const mid of profile.globalAvoidMoleculeIds ?? []) {
    avoid.push({
      moleculeId: mid,
      molecule: ANTIBIOTIC_MOLECULES[mid],
      reason: 'Marcado como evitar nesta síndrome (perfil v2).',
    })
  }

  const rationale = [
    ...block.rationaleBullets,
    `Cenário resolvido: ${scenarioKey}${fallbackFrom ? ` (fallback assistencial a partir de ${fallbackFrom})` : ''}.`,
    `Espécie: ${ctx.species === 'dog' ? 'cão' : 'gato'}; gravidade declarada: ${ctx.severity}.`,
  ]

  return {
    syndromeId: profile.id,
    syndromeLabel: profile.label,
    scenarioResolved: scenarioKey,
    scenarioFallbackFrom: fallbackFrom,
    antibioticIndication: profile.antibioticIndication,
    culture: cultureDetail(profile.cultureRecommendation),
    firstLine,
    alternatives,
    avoid,
    patientAlerts,
    stewardshipAlerts: stewardshipAlertsFromProfile(profile.stewardshipNotes),
    rationale: [...rationale, ...profile.interpretiveNotes.map((n) => `Interpretação: ${n}`)],
    referenceKeys: profile.referenceKeys ?? [],
  }
}
