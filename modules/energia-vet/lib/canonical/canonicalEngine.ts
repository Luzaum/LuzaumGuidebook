import { EVIDENCE_CATALOG } from './evidenceCatalog'
import { calculateMaintenanceEnergy, CANONICAL_ENGINE_VERSION } from './energyCalculator'
import { buildAssessmentFingerprint, validateCanonicalInput } from './reducer'
import { CANONICAL_NUTRITION_SCHEMA_VERSION } from './schemaVersion'
import { resolveTherapeuticConflicts } from './therapeuticConflictResolver'
import type {
  CanonicalNutritionInput,
  CanonicalNutritionResult,
  CanonicalValidationIssue,
  EnergyDecision,
} from './types'
import type { CanonicalEnergyResult } from './energyCalculator'

export function buildEnergyDecision(
  input: CanonicalNutritionInput,
  engineResult: CanonicalEnergyResult,
): EnergyDecision {
  const species = input.patient.species
  const exponent = species === 'cat' ? 0.67 : 0.75
  const source = EVIDENCE_CATALOG[engineResult.sourceId]

  return {
    rerKcalDay: engineResult.rerKcalDay,
    equation: {
      id: input.calculationPreferences.energyEquationId ?? 'rer_allometric_70',
      formula: `70 × peso^${exponent}`,
      coefficient: engineResult.multiplierEquivalent,
      exponent,
      weightKg: engineResult.weightUsedKg,
      weightBasis: engineResult.weightBasis,
      source,
    },
    selectedEnergyTarget: {
      kcalDay: engineResult.selectedTargetKcalDay,
      multiplierEquivalent: engineResult.multiplierEquivalent,
      rationale: engineResult.methodSummary,
      selectedBy: input.calculationPreferences.clinicianEnergyOverrideKcalDay
        ? 'manual_clinician_override'
        : 'validated_rule',
      confidence: engineResult.confidence === 'patient_calibrated' ? 'high' : 'moderate',
    },
    rejectedAlternatives: [],
    clinicalProfileLabel: engineResult.clinicalProfileLabel,
    methodSummary: engineResult.methodSummary,
  }
}

export function calculateCanonicalNutrition(input: CanonicalNutritionInput): {
  result: CanonicalNutritionResult | null
  validationIssues: CanonicalValidationIssue[]
} {
  const validationIssues = validateCanonicalInput(input)
  if (validationIssues.some((issue) => issue.severity === 'error')) {
    return { result: null, validationIssues }
  }

  const engineResult = calculateMaintenanceEnergy(input)
  if (!engineResult) {
    return {
      result: null,
      validationIssues: [
        ...validationIssues,
        { path: 'energy', message: 'Não foi possível calcular a energia de manutenção.', severity: 'error' },
      ],
    }
  }

  const therapeutic = resolveTherapeuticConflicts(input)
  const energy = buildEnergyDecision(input, engineResult)

  return {
    result: {
      metadata: {
        calculatedAt: new Date().toISOString(),
        engineVersion: CANONICAL_ENGINE_VERSION,
        schemaVersion: CANONICAL_NUTRITION_SCHEMA_VERSION,
        therapeuticProfileVersions: Object.fromEntries(
          therapeutic.activeProfileIds.map((id) => [id, 'v3.2026.08']),
        ),
      },
      energy,
      therapeutic,
      assessmentFingerprint: buildAssessmentFingerprint(input),
    },
    validationIssues,
  }
}

export { CANONICAL_ENGINE_VERSION }
