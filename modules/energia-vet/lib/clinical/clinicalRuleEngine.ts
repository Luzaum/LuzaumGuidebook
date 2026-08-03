import type { ClinicalPatientContext, ClinicalSuitability, FoodDetails, TherapeuticFoodAssessment } from '../catalog/types'
import { isNutritionFeatureEnabled } from '../featureFlags'
import { detectTherapeuticProfileConflicts, resolveActiveTherapeuticProfiles } from './comorbidityResolver'
import { canProceedWithDetailedAssessment, evaluateContraindications, hasHardExclusion } from './contraindicationEngine'
import { resolveEvidenceReferences } from './evidenceResolver'
import { buildMonitoringPlanForProfiles } from './monitoringPlan'
import { assessFoodAgainstProfile, inferManufacturerClaims } from './therapeuticAssessment'
import { getTherapeuticProfileById } from './therapeuticProfiles'

function disabledAssessment(): TherapeuticFoodAssessment {
  return {
    suitability: 'insufficient_data',
    positiveMatches: [],
    cautions: [{ code: 'rules_v2_disabled', messagePt: 'Motor clínico V2 desativado.', severity: 'info' }],
    hardExclusions: [],
    missingCriticalData: [],
    manufacturerClaims: [],
    independentAssessment: {
      summaryPt: 'Ative nutrition_clinical_rules_v2 para avaliação clínica independente.',
      suitability: 'insufficient_data',
    },
    monitoringRecommendations: [],
    evidence: [],
  }
}

function mergeSuitability(values: ClinicalSuitability[]): ClinicalSuitability {
  if (values.includes('avoid')) return 'avoid'
  if (values.includes('insufficient_data')) return 'insufficient_data'
  if (values.every((value) => value === 'suitable')) return 'suitable'
  if (values.includes('consider')) return 'consider'
  return 'insufficient_data'
}

export function evaluateTherapeuticFoodAssessment(
  food: FoodDetails,
  context: ClinicalPatientContext,
): TherapeuticFoodAssessment {
  if (!isNutritionFeatureEnabled('nutrition_clinical_rules_v2')) {
    return disabledAssessment()
  }

  const activeProfileIds = resolveActiveTherapeuticProfiles(context.species, {
    comorbidityIds: context.comorbidityIds,
    therapeuticProfileIds: context.therapeuticProfileIds,
  })

  const profiles = activeProfileIds
    .map((id) => getTherapeuticProfileById(id))
    .filter((profile): profile is NonNullable<typeof profile> => Boolean(profile))

  const globalContraindications = evaluateContraindications({
    food,
    species: context.species,
    profileHardContraindications: [],
  })

  if (hasHardExclusion(globalContraindications) || !canProceedWithDetailedAssessment(food)) {
    return {
      suitability: 'avoid',
      positiveMatches: [],
      cautions: [],
      hardExclusions: globalContraindications.filter((item) => item.severity === 'exclusion'),
      missingCriticalData: food.missingNutrients.slice(0, 8).map((key) => ({
        nutrientDefinitionId: key,
        labelPt: key,
        reason: 'Nutriente essencial ausente no cadastro do alimento.',
      })),
      manufacturerClaims: inferManufacturerClaims(food).map((claim) => ({
        ...claim,
        sourceReference: 'Nome comercial / catálogo',
      })),
      independentAssessment: {
        summaryPt: 'Contraindicação ou dados insuficientes impedem adequação automática.',
        suitability: 'avoid',
      },
      monitoringRecommendations: buildMonitoringPlanForProfiles(profiles),
      evidence: resolveEvidenceReferences(profiles.flatMap((profile) => profile.evidenceSourceIds)),
    }
  }

  if (profiles.length === 0) {
    return {
      suitability: 'insufficient_data',
      positiveMatches: [],
      cautions: [{
        code: 'no_therapeutic_context',
        messagePt: 'Nenhum perfil terapêutico ativo — selecione comorbidades ou perfis clínicos para avaliação direcionada.',
        severity: 'info',
      }],
      hardExclusions: [],
      missingCriticalData: [],
      manufacturerClaims: inferManufacturerClaims(food).map((claim) => ({ ...claim })),
      independentAssessment: {
        summaryPt: 'Sem contexto clínico terapêutico para avaliar adequação específica.',
        suitability: 'insufficient_data',
      },
      monitoringRecommendations: [],
      evidence: [],
    }
  }

  const conflicts = detectTherapeuticProfileConflicts(activeProfileIds)
  const positiveMatches = []
  const cautions = []
  const hardExclusions = [...globalContraindications.filter((item) => item.severity === 'exclusion')]
  const missingCriticalData = []
  const suitabilities: ClinicalSuitability[] = []
  const evidenceIds = new Set<string>()

  for (const profile of profiles) {
    const result = assessFoodAgainstProfile(food, profile)
    positiveMatches.push(...result.positiveMatches)
    cautions.push(...result.cautions)
    hardExclusions.push(...result.hardExclusions)
    missingCriticalData.push(...result.missingCriticalData)
    suitabilities.push(result.suitability)
    for (const sourceId of profile.evidenceSourceIds) evidenceIds.add(sourceId)
  }

  for (const conflict of conflicts) {
    cautions.push({
      code: `conflict_${conflict.profileA}_${conflict.profileB}`,
      messagePt: conflict.messagePt,
      severity: 'caution',
    })
  }

  if (hasHardExclusion(hardExclusions)) {
    suitabilities.push('avoid')
  }

  const suitability = mergeSuitability(suitabilities)

  const manufacturerClaims = inferManufacturerClaims(food).map((claim) => ({
    ...claim,
    sourceReference: 'Rotulagem / nome comercial — não equivale a avaliação independente.',
  }))

  const summaryParts: string[] = []
  if (suitability === 'suitable') summaryParts.push('Características compatíveis com os perfis terapêuticos ativos.')
  if (suitability === 'consider') summaryParts.push('Considerar com ressalvas clínicas e monitoramento.')
  if (suitability === 'avoid') summaryParts.push('Evitar ou escolher alternativa — contraindicação ou incompatibilidade.')
  if (suitability === 'insufficient_data') summaryParts.push('Dados críticos ausentes — revisão veterinária necessária.')
  if (conflicts.length) summaryParts.push(`${conflicts.length} conflito(s) entre comorbidades detectado(s).`)

  return {
    suitability,
    positiveMatches,
    cautions,
    hardExclusions,
    missingCriticalData,
    manufacturerClaims,
    independentAssessment: {
      summaryPt: summaryParts.join(' ') || 'Avaliação clínica concluída.',
      suitability,
    },
    monitoringRecommendations: buildMonitoringPlanForProfiles(profiles),
    evidence: resolveEvidenceReferences(Array.from(evidenceIds)),
  }
}

/** Alias público usado pelo catálogo. */
export function evaluateClinicalSuitability(
  _foodId: string,
  context: ClinicalPatientContext,
  food?: FoodDetails | null,
): TherapeuticFoodAssessment {
  if (!food) {
    return {
      suitability: 'insufficient_data',
      positiveMatches: [],
      cautions: [{ code: 'food_not_found', messagePt: 'Alimento não encontrado.', severity: 'caution' }],
      hardExclusions: [],
      missingCriticalData: [],
      manufacturerClaims: [],
      independentAssessment: { summaryPt: 'Alimento não localizado.', suitability: 'insufficient_data' },
      monitoringRecommendations: [],
      evidence: [],
    }
  }
  return evaluateTherapeuticFoodAssessment(food, context)
}
