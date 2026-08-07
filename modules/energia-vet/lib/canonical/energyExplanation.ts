import {
  BOOK_ENERGY_SOURCE,
  BOOK_RER_CONSTANT,
  BOOK_RER_EXPONENT,
  getBookEnergyProfileById,
} from '../bookEnergy'
import type { CanonicalEnergyResult } from './energyCalculator'
import type { BodyTargetPlan } from './bodyTargetPlan'
import type { CanonicalNutritionInput } from './types'
import { getEvidenceReference } from './evidenceCatalog'

export interface EnergyCalculationStep {
  step: number
  title: string
  lines: string[]
}

export interface EnergyCalculationExplanation {
  steps: EnergyCalculationStep[]
  summaryKcalDay: number
  sourceCitation: string
  physiologicalProfileLabel: string
  physiologicalProfileDescription?: string
}

function weightBasisLabel(basis: CanonicalEnergyResult['weightBasis']): string {
  if (basis === 'ideal_weight') return 'peso ideal'
  if (basis === 'target_weight') return 'peso-alvo'
  return 'peso atual'
}

function speciesExponent(species: 'dog' | 'cat'): number {
  return species === 'cat' ? 0.67 : BOOK_RER_EXPONENT
}

export function buildEnergyCalculationExplanation(
  input: CanonicalNutritionInput,
  result: CanonicalEnergyResult,
  bodyTargetPlan?: BodyTargetPlan | null,
): EnergyCalculationExplanation {
  const weightKg = result.weightUsedKg
  const exponent = speciesExponent(input.patient.species)
  const rer = result.rerKcalDay
  const pow = Math.pow(weightKg, exponent)
  const profileId = input.calculationPreferences.selectedBookEnergyProfileId
  const bookProfile = profileId ? getBookEnergyProfileById(profileId) : undefined
  const source = getEvidenceReference(result.sourceId)

  const steps: EnergyCalculationStep[] = []

  steps.push({
    step: 1,
    title: 'Energia de repouso (RER)',
    lines: [
      `Peso utilizado: ${weightKg.toFixed(2)} kg (${weightBasisLabel(result.weightBasis)}).`,
      `Fórmula alométrica: RER = ${BOOK_RER_CONSTANT} × (peso em kg)^${exponent}.`,
      `Cálculo: ${BOOK_RER_CONSTANT} × ${weightKg.toFixed(2)}^${exponent} = ${BOOK_RER_CONSTANT} × ${pow.toFixed(2)} ≈ ${rer.toFixed(0)} kcal/dia.`,
      `Referência: ${BOOK_ENERGY_SOURCE.title}, ${BOOK_ENERGY_SOURCE.chapter}.`,
    ],
  })

  if (input.calculationPreferences.clinicianEnergyOverrideKcalDay != null) {
    steps.push({
      step: 2,
      title: 'Prescrição manual',
      lines: [
        `Energia definida pelo médico-veterinário: ${result.selectedTargetKcalDay.toFixed(0)} kcal/dia.`,
        'Este valor substitui a estimativa automática para este atendimento.',
      ],
    })
  } else if (result.clinicalProfileLabel === 'Ingestão observada estável') {
    steps.push({
      step: 2,
      title: 'Ingestão real documentada',
      lines: [
        'Manutenção estimada a partir da ingestão calórica registrada, com peso estável e ECC compatível.',
        `Energia adotada: ${result.selectedTargetKcalDay.toFixed(0)} kcal/dia.`,
      ],
    })
  } else {
    const physioLines = [
      bookProfile
        ? `Estado fisiológico selecionado: ${bookProfile.label}.`
        : `Estado fisiológico: ${result.clinicalProfileLabel}.`,
    ]
    if (bookProfile?.description) {
      physioLines.push(bookProfile.description)
    }
    if (input.patient.species === 'dog' && input.patient.activityImpact === 'high' && profileId === 'dog_work_moderate') {
      physioLines.push('Atividade classificada como alto impacto — coeficiente FEDIAF para demanda moderada/alta.')
    }
    steps.push({
      step: 2,
      title: 'Estado fisiológico e demanda energética',
      lines: physioLines,
    })

    steps.push({
      step: 3,
      title: 'Energia de manutenção estimada',
      lines: [
        result.methodSummary,
        result.multiplierEquivalent != null && result.multiplierEquivalent > 0
          ? `Em relação ao RER, equivale aproximadamente a × ${result.multiplierEquivalent.toFixed(2)}.`
          : '',
        `Resultado: ${result.selectedTargetKcalDay.toFixed(0)} kcal/dia.`,
        `Faixa de referência: ${result.estimatedRangeKcalDay.minimum.toFixed(0)}–${result.estimatedRangeKcalDay.maximum.toFixed(0)} kcal/dia.`,
      ].filter(Boolean),
    })
  }

  const goal = input.calculationPreferences.nutritionalGoal ?? 'maintenance'
  if (
    goal === 'weight_loss' &&
    bodyTargetPlan &&
    bodyTargetPlan.targetEnergyKcal !== bodyTargetPlan.maintenanceEnergyKcal
  ) {
    const idealKg = bodyTargetPlan.targetWeightKg
    const targetKcal = bodyTargetPlan.targetEnergyKcal
    const maintenanceKcal = bodyTargetPlan.maintenanceEnergyKcal
    const species = input.patient.species
    const coef = species === 'cat' ? 52 : 63
    const exp = species === 'cat' ? 0.711 : 0.75
    const powIdeal = Math.pow(idealKg, exp)
    const rerIdealExp = speciesExponent(species)
    const rerIdeal = BOOK_RER_CONSTANT * Math.pow(idealKg, rerIdealExp)
    const reductionPct = maintenanceKcal > 0 ? Math.round((1 - targetKcal / maintenanceKcal) * 100) : 0

    steps.push({
      step: steps.length + 1,
      title: 'Meta energética para redução de peso (AAHA 2021)',
      lines: [
        bodyTargetPlan.idealWeightEstimate.methodSummary,
        `Fórmula AAHA (${species === 'cat' ? 'gato' : 'cão'}): ${coef} × (peso-alvo em kg)^${exp}.`,
        `Cálculo: ${coef} × ${idealKg.toFixed(2)}^${exp} = ${coef} × ${powIdeal.toFixed(2)} ≈ ${targetKcal.toFixed(0)} kcal/dia.`,
        `RER no peso-alvo: ${rerIdeal.toFixed(0)} kcal/dia (referência; AAHA usa coeficiente ${coef}, não MER).`,
        `Manutenção no peso atual (${result.weightUsedKg.toFixed(2)} kg): ${maintenanceKcal.toFixed(0)} kcal/dia — serve de referência clínica, não é a base do emagrecimento.`,
        reductionPct > 0
          ? `Em relação à manutenção no peso atual, a meta inicial fica ~${reductionPct}% abaixo. Isso é esperado pela AAHA porque a fórmula usa o peso-alvo, não um percentual fixo da manutenção.`
          : '',
        `Faixa de referência: ${bodyTargetPlan.targetResult.estimatedRangeKcalDay.minimum.toFixed(0)}–${bodyTargetPlan.targetResult.estimatedRangeKcalDay.maximum.toFixed(0)} kcal/dia.`,
        'Reavaliar peso e adesão em 2–4 semanas; ajustar se a perda for rápida demais ou estagnar.',
      ].filter(Boolean),
    })
  }

  const summaryKcalDay =
    goal === 'weight_loss' && bodyTargetPlan
      ? bodyTargetPlan.targetEnergyKcal
      : result.selectedTargetKcalDay

  return {
    steps,
    summaryKcalDay,
    sourceCitation: source
      ? `${source.title} (${source.year}${source.guidelineVersion ? ` · ${source.guidelineVersion}` : ''})`
      : `${BOOK_ENERGY_SOURCE.title}, ${BOOK_ENERGY_SOURCE.chapter}`,
    physiologicalProfileLabel: bookProfile?.label ?? result.clinicalProfileLabel,
    physiologicalProfileDescription: bookProfile?.description,
  }
}

/** Resumo curto para tooltip compacto. */
export function buildEnergyCalculationTooltip(
  input: CanonicalNutritionInput,
  result: CanonicalEnergyResult,
): string[] {
  const explanation = buildEnergyCalculationExplanation(input, result)
  return explanation.steps.flatMap((step) => [step.title, ...step.lines])
}
