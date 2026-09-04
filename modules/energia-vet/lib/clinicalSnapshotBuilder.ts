import type { StoredCalculationReport } from '../types'
import type { CalculationSnapshotV2 } from './calculationPersistenceV2'
import type {
  BuildClinicalSnapshotInput,
  ClinicalWarningSnapshot,
  NutritionClinicalRecord,
  NutritionEnteralSnapshot,
  NutritionHydrationSnapshot,
  NutritionParenteralSnapshot,
  NutritionRefeedingSnapshot,
  NutritionTransitionSnapshot,
} from './clinicalSnapshotTypes'
import {
  muscleConditionLabel,
  neuterLabel,
  sexLabel,
  therapeuticStatusLabel,
  adequacyStatusLabel,
} from '../pdf-v5/clinicalLabels'
import { getClinicalProfileBadges } from './clinicalProfileLabels'
import {
  buildRefeedingProgression,
  classifyRefeedingRisk,
  REFEEDING_CLINICIAN_ALERTS,
} from './hospital-nutrition/refeedingEngine'
import {
  calculateBolusMeal,
  calculateCaloricDeficit,
  calculateContinuousInfusion,
  calculateDeliveredPercent,
  calculateEnteralDailyGrams,
  calculateEnteralDailyVolume,
} from './hospital-nutrition/enteralEngine'
import { calculateParenteralNutrition, PARENTERAL_PROTEIN_TARGETS } from './hospital-nutrition/parenteralEngine'
import {
  calculateFoodWaterMl,
  calculateMetabolicWaterMl,
  calculateOralWaterGap,
  estimateWaterFromEnergy,
  estimateWaterMicrobiomeMethod,
  WATER_DISCLAIMER,
} from './hospital-nutrition/waterEngine'
import { buildTransitionPlan } from './hospital-nutrition/transitionEngine'
import { resolveClinicalRecordLegacyFields } from '../pdf-v5/clinicalRecordBuilder'

function formatAgeYears(ageMonths: number | undefined): string {
  if (ageMonths == null || ageMonths < 0) return 'Não informado'
  const years = ageMonths / 12
  if (years < 1) return `${ageMonths} meses`
  return `${years.toFixed(1).replace('.0', '')} anos`
}

function mapEnteralRoute(route?: string): NutritionEnteralSnapshot['route'] {
  if (route === 'tube') return 'nasogastric'
  if (route === 'oral') return 'oral'
  return 'oral'
}

function buildTransitionSnapshot(
  report: StoredCalculationReport,
  targetKcal: number,
): NutritionTransitionSnapshot | undefined {
  const config = report.diet.dietTransition
  if (!config?.enabled) return undefined

  const contributions = report.formula.contributions
  const newPrimary = contributions[0]
  if (!newPrimary || targetKcal <= 0) return undefined

  const newKcalPerGram = newPrimary.gramsAsFed > 0 ? newPrimary.deliveredKcal / newPrimary.gramsAsFed : 0
  const previousKcalPerGram = config.previousKcalPerGram ?? newKcalPerGram
  if (previousKcalPerGram <= 0 || newKcalPerGram <= 0) return undefined

  const result = buildTransitionPlan({
    targetKcalDay: targetKcal,
    previousDiet: {
      name: config.previousDietName ?? 'Dieta anterior',
      kcalPerGram: previousKcalPerGram,
      currentGramsPerDay: config.previousGramsPerDay,
    },
    newDiet: {
      name: newPrimary.foodName,
      kcalPerGram: newKcalPerGram,
      prescribedGramsPerDay: newPrimary.gramsAsFed,
    },
    durationDays: config.durationDays ?? 7,
    rows: config.customRows,
  })

  if ('error' in result) return undefined
  return result
}

function buildHydrationSnapshot(
  report: StoredCalculationReport,
  prescribedKcal: number,
  rerKcal: number,
  enteralFlushMl?: number,
  hydrationConfig?: BuildClinicalSnapshotInput['hydration'],
): NutritionHydrationSnapshot | undefined {
  if (prescribedKcal <= 0) return undefined
  if (hydrationConfig?.selectedMethod === 'none') return undefined

  const species = report.patient.species ?? 'dog'
  const energyBased = estimateWaterFromEnergy(prescribedKcal)
  const speciesBased = estimateWaterMicrobiomeMethod(species, rerKcal)

  let selectedTarget = hydrationConfig?.manualTargetMlDay
  let methodLabel = 'Estimativa manual definida pelo médico-veterinário'
  if (!selectedTarget) {
    if (hydrationConfig?.selectedMethod === 'species_based') {
      selectedTarget = speciesBased
      methodLabel = species === 'cat' ? 'Estimativa por RER felino (1,2× RER)' : 'Estimativa por RER canino (1,6× RER)'
    } else {
      selectedTarget = energyBased
      methodLabel = 'Estimativa baseada na energia prescrita (1 mL/kcal)'
    }
  }

  const macros = report.formula.evaluation.macroSplit
  const proteinG = macros.find((m) => m.key === 'protein')?.grams ?? 0
  const fatG = macros.find((m) => m.key === 'fat')?.grams ?? 0
  const carbG = macros.find((m) => m.key === 'carb')?.grams ?? 0

  let foodWater = 0
  for (const item of report.formula.contributions) {
    const moisture = item.moisturePct ?? (report.diet.dietType === 'commercial' ? 10 : 70)
    foodWater += calculateFoodWaterMl(item.gramsAsFed, moisture)
  }

  const metabolicWater = calculateMetabolicWaterMl(fatG, carbG, proteinG)
  const voluntaryKnown = hydrationConfig?.voluntarilyConsumedWaterKnown === true
  const voluntary = voluntaryKnown ? hydrationConfig?.voluntarilyConsumedWaterMlDay : undefined
  const flush = enteralFlushMl ?? hydrationConfig?.enteralFlushWaterMlDay ?? 0
  const gap = calculateOralWaterGap({
    targetWaterMl: selectedTarget,
    foodWaterMl: foodWater,
    metabolicWaterMl: metabolicWater,
    voluntarilyDrunkWaterMl: voluntary,
    enteralFlushWaterMl: flush,
  })

  const notes = [
    'Manter água limpa e fresca sempre disponível.',
    'Reavaliar consumo em poliúria, vômito, diarreia, lactação ou febre.',
  ]
  if (report.diet.dietType === 'commercial') {
    notes.push('Dietas úmidas reduzem a necessidade de água oral adicional.')
  }

  return {
    prescribedEnergyKcalDay: prescribedKcal,
    estimates: {
      energyBasedMlDay: energyBased,
      speciesBasedMlDay: speciesBased,
      selectedTargetMlDay: selectedTarget,
      selectedMethodLabel: methodLabel,
    },
    foodWaterMlDay: foodWater > 0 ? foodWater : undefined,
    metabolicWaterMlDay: metabolicWater > 0 ? metabolicWater : undefined,
    voluntarilyConsumedWaterMlDay: voluntary,
    enteralFlushWaterMlDay: flush > 0 ? flush : undefined,
    estimatedOralWaterGapMlDay: gap,
    methodLabel,
    clinicalNotes: notes,
    notFluidTherapy: true,
    disclaimer: WATER_DISCLAIMER,
  }
}

function buildEnteralSnapshot(
  report: StoredCalculationReport,
  rerKcal: number,
  prescribedKcal: number,
): NutritionEnteralSnapshot | undefined {
  if (!report.patient.isHospitalized || report.hospital?.feedingRoute === 'parenteral') return undefined

  const primary = report.formula.contributions[0]
  if (!primary) return undefined

  const kcalPerMl = report.hospital?.energyDensityKcalPerMl
  const kcalPerGram = primary.gramsAsFed > 0 ? primary.deliveredKcal / primary.gramsAsFed : undefined
  const useMl = kcalPerMl != null && kcalPerMl > 0

  const prescribedMlDay = useMl ? calculateEnteralDailyVolume(prescribedKcal, kcalPerMl!) ?? undefined : undefined
  const prescribedGramsDay = !useMl && kcalPerGram
    ? calculateEnteralDailyGrams(prescribedKcal, kcalPerGram) ?? undefined
    : undefined

  const administrationsPerDay = report.diet.mealsPerDay ?? 4
  const administrationMode: NutritionEnteralSnapshot['administrationMode'] =
    report.hospital?.administrationMode === 'continuous' ? 'continuous' : 'bolus'

  let mlPerAdministration: number | undefined
  let gramsPerAdministration: number | undefined
  let mlPerHour: number | undefined
  let kcalPerHour: number | undefined
  const infusionHours = report.hospital?.infusionHoursPerDay ?? 24

  if (administrationMode === 'continuous' && prescribedMlDay != null) {
    const infusion = calculateContinuousInfusion(prescribedMlDay, prescribedKcal, infusionHours)
    mlPerHour = infusion.mlPerHour
    kcalPerHour = infusion.kcalPerHour
  } else if (prescribedMlDay != null) {
    const bolus = calculateBolusMeal(prescribedMlDay, prescribedKcal, administrationsPerDay)
    mlPerAdministration = bolus.mlPerMeal
  } else if (prescribedGramsDay != null) {
    const bolus = calculateBolusMeal(prescribedGramsDay, prescribedKcal, administrationsPerDay)
    gramsPerAdministration = bolus.mlPerMeal
  }

  const flushMl = report.hospital?.flushVolumeMl
  const totalFlush = flushMl != null ? flushMl * administrationsPerDay : undefined
  const delivered = report.hospital?.deliveredKcalDay
  const deliveredPercent =
    delivered != null ? calculateDeliveredPercent(prescribedKcal, delivered) : undefined
  const dailyDeficit = delivered != null ? calculateCaloricDeficit(prescribedKcal, delivered) : undefined

  const percentRer = rerKcal > 0 ? (prescribedKcal / rerKcal) * 100 : 0

  return {
    dietName: primary.foodName,
    route: mapEnteralRoute(report.hospital?.feedingRoute),
    kcalPerMl: kcalPerMl,
    kcalPerGram,
    prescribedKcalDay: prescribedKcal,
    prescribedPercentRer: Math.round(percentRer * 10) / 10,
    prescribedMlDay,
    prescribedGramsDay,
    administrationMode,
    administrationsPerDay,
    mlPerAdministration,
    gramsPerAdministration,
    infusionHoursPerDay: administrationMode === 'continuous' ? infusionHours : undefined,
    mlPerHour,
    kcalPerHour,
    flushMlPerAdministration: flushMl,
    totalFlushMlDay: totalFlush,
    deliveredKcalDay: delivered,
    deliveredPercent,
    dailyDeficitKcal: dailyDeficit,
    cumulativeDeficitKcal: report.hospital?.cumulativeDeficitKcal,
    schedule: report.formula.feedingPlan.meals.map((m) => m.time).filter(Boolean),
    tolerance: report.hospital?.tolerance,
    tutorInstructions: [
      'Administrar conforme horários prescritos pela equipe veterinária.',
      'Registrar volume efetivamente oferecido.',
      'Manter cabeceira elevada quando aplicável.',
      'Contatar a clínica diante de vômito, regurgitação ou recusa persistente.',
    ],
  }
}

function buildParenteralSnapshot(
  report: StoredCalculationReport,
  prescribedKcal: number,
): NutritionParenteralSnapshot | undefined {
  if (report.hospital?.feedingRoute !== 'parenteral') return undefined
  const weight = report.patient.currentWeight ?? 0
  if (weight <= 0 || prescribedKcal <= 0) return undefined

  const species = report.patient.species ?? 'dog'
  const proteinTarget = PARENTERAL_PROTEIN_TARGETS[species].standard[0]
  const pn = calculateParenteralNutrition({
    currentWeightKg: weight,
    targetKcalDay: prescribedKcal,
    proteinGramsPer100Kcal: proteinTarget,
    infusionHours: report.hospital?.infusionHoursPerDay ?? 24,
    additionalFluidMlDay: report.hospital?.additionalFluidMlDay,
    vascularAccess: report.hospital?.vascularAccess ?? 'not_defined',
    peripheralOsmolarityLimitMosmL: report.hospital?.peripheralOsmolarityLimitMosmL,
  })

  return {
    currentWeightKg: weight,
    targetKcalDay: prescribedKcal,
    proteinTargetGPer100Kcal: proteinTarget,
    proteinGramsDay: pn.proteinGramsDay,
    proteinKcalDay: pn.proteinKcalDay,
    aminoAcidSolutionPercent: 8.5,
    aminoAcidVolumeMlDay: pn.aminoAcidVolumeMlDay,
    nonProteinKcalDay: pn.nonProteinKcalDay,
    dextroseFraction: 0.5,
    lipidFraction: 0.5,
    dextroseKcalDay: pn.dextroseKcalDay,
    dextroseConcentrationPercent: 50,
    dextroseVolumeMlDay: pn.dextroseVolumeMlDay,
    dextroseGramsDay: pn.dextroseGramsDay,
    lipidKcalDay: pn.lipidKcalDay,
    lipidConcentrationPercent: 20,
    lipidVolumeMlDay: pn.lipidVolumeMlDay,
    lipidGramsDay: pn.lipidGramsDay,
    lipidGramsKgDay: pn.lipidGramsKgDay,
    additionalFluidMlDay: report.hospital?.additionalFluidMlDay,
    totalVolumeMlDay: pn.totalPnVolumeMlDay,
    infusionHours: report.hospital?.infusionHoursPerDay ?? 24,
    infusionRateMlHour: pn.pnRateMlHour,
    glucoseInfusionRateMgKgMin: pn.glucoseInfusionRateMgKgMin,
    estimatedOsmolarityMosmL: pn.estimatedOsmolarityMosmL ?? undefined,
    vascularAccess: report.hospital?.vascularAccess ?? 'not_defined',
    warnings: [
      ...pn.alerts,
      'A formulação deve ser revisada pela equipe responsável pelo preparo e pela administração.',
    ],
    monitoring: [
      'Glicemia capilar conforme protocolo institucional.',
      'Eletrólitos e função hepática.',
      'Sinais de sobrecarga lipídica.',
    ],
    professionalOnly: true,
  }
}

function buildRefeedingSnapshot(
  report: StoredCalculationReport,
  rerKcal: number,
): NutritionRefeedingSnapshot | undefined {
  if (!report.patient.isHospitalized) return undefined

  const hospital = report.hospital ?? {}
  const electrolytes = hospital.electrolytes ?? {}
  const riskInput = {
    currentWeightKg: report.patient.currentWeight ?? 0,
    previousWeightKg: report.patient.previousHealthyWeightKg,
    bcs: report.patient.bcs ?? 5,
    muscleCondition: report.patient.muscleCondition ?? 'normal',
    daysAnorexia: hospital.daysAnorexic ?? 0,
    daysHyporexia: hospital.daysHyporexic ?? 0,
    recentIntakePercent: hospital.recentIntakePercent ?? 100,
    phosphorusLow: (electrolytes.phosphorus ?? 1) < 1,
    potassiumLow: (electrolytes.potassium ?? 1) < 1,
    magnesiumLow: (electrolytes.magnesium ?? 1) < 1,
    onParenteralNutrition: hospital.feedingRoute === 'parenteral',
  }

  const riskLevel = classifyRefeedingRisk(riskInput)
  const model =
    riskLevel === 'high'
      ? 'high_risk_gradual'
      : hospital.progressionProtocol === '3_days'
        ? '33-66-100'
        : '50-75-100'

  const selectedPlan: NutritionRefeedingSnapshot['selectedPlan'] =
    riskLevel === 'high'
      ? 'high_risk_gradual'
      : hospital.progressionProtocol === '3_days'
        ? '33_66_100'
        : '50_75_100'

  const progression = buildRefeedingProgression(rerKcal, riskLevel, model as '50-75-100' | '33-66-100' | 'high_risk_gradual')

  const riskFactors: string[] = []
  if (riskInput.daysAnorexia >= 3) riskFactors.push('Anorexia recente')
  if (riskInput.recentIntakePercent <= 25) riskFactors.push('Ingestão recente muito baixa')
  if (riskInput.phosphorusLow || riskInput.potassiumLow || riskInput.magnesiumLow) {
    riskFactors.push('Distúrbios eletrolíticos')
  }

  return {
    riskLevel,
    riskFactors,
    rerKcalDay: rerKcal,
    selectedPlan,
    days: progression.map((step) => ({
      day: step.day,
      targetPercentRer: step.percentRer,
      targetKcalDay: step.kcalTarget,
      authorizedToAdvance: !step.requiresClinicalReview,
      authorizationReason: step.requiresClinicalReview
        ? 'Requer avaliação clínica e eletrolítica antes de avançar.'
        : undefined,
    })),
    monitoring: {
      phosphorus: true,
      potassium: true,
      magnesium: true,
      glucose: true,
      fluidBalance: true,
      cardiacSigns: riskLevel === 'high',
      neurologicSigns: riskLevel === 'high',
    },
    advancementCriteria: [
      'Eletrólitos estáveis.',
      'Sem sinais de sobrecarga hídrica.',
      'Alimentação tolerada.',
    ],
    holdCriteria: [...REFEEDING_CLINICIAN_ALERTS],
  }
}

export function buildFullClinicalSnapshot(input: BuildClinicalSnapshotInput): NutritionClinicalRecord {
  const { report, snapshot, hydration, clinic, prescriber } = input
  const legacy = resolveClinicalRecordLegacyFields(report, snapshot)
  const species = report.patient.species ?? 'dog'
  const mealsPerDay = report.diet.mealsPerDay ?? report.formula.feedingPlan.mealsPerDay ?? 2
  const prescribedKcal = legacy.prescribedKcalDay
  const rerKcal = legacy.rerKcalDay
  const totalKcal = report.formula.contributions.reduce((s, c) => s + c.deliveredKcal, 0)
  const roundingError =
    prescribedKcal > 0 ? ((totalKcal - prescribedKcal) / prescribedKcal) * 100 : undefined

  const enteralPlan = buildEnteralSnapshot(report, rerKcal, prescribedKcal)
  const hydrationPlan = buildHydrationSnapshot(
    report,
    prescribedKcal,
    rerKcal,
    enteralPlan?.totalFlushMlDay,
    hydration,
  )
  const transitionPlan = buildTransitionSnapshot(report, prescribedKcal)
  const parenteralPlan = buildParenteralSnapshot(report, prescribedKcal)
  const refeedingPlan = buildRefeedingSnapshot(report, rerKcal)

  const therapeuticReview = input.therapeuticReview ?? report.therapeuticReview ?? snapshot?.therapeuticReview

  const warnings: ClinicalWarningSnapshot[] = [
    { level: 'info', message: 'Não oferecer outros alimentos além dos prescritos sem orientação.' },
    { level: 'info', message: 'A quantidade prescrita poderá ser ajustada conforme a evolução do peso.' },
  ]
  if (report.target.goal === 'weight_loss') {
    warnings.push({
      level: 'caution',
      message: 'Pesar o paciente regularmente e não reduzir a quantidade por conta própria.',
    })
  }
  if (refeedingPlan?.riskLevel === 'high') {
    warnings.push({
      level: 'critical',
      message: 'A progressão alimentar deve ser autorizada após avaliação clínica e eletrolítica.',
    })
  }
  if (enteralPlan?.deliveredPercent != null && enteralPlan.deliveredPercent > 100) {
    warnings.push({
      level: 'caution',
      message: 'Ingestão acima do prescrito — revisar tolerância e meta energética.',
    })
  }

  return {
    patient: {
      name: report.patient.name?.trim() || 'Não informado',
      species,
      breed: report.patient.breed,
      sex: sexLabel(report.patient.sex),
      neuterLabel: neuterLabel(report.patient.isNeutered),
      ageLabel: formatAgeYears(report.patient.ageMonths),
      currentWeightKg: report.patient.currentWeight,
      bcs9: report.patient.bcs,
      muscleConditionLabel: legacy.muscleConditionLabel ?? muscleConditionLabel(report.patient.muscleCondition),
      activitySummary: legacy.activitySummary,
      comorbidityLabels: getClinicalProfileBadges(species, report.patient.comorbidityIds ?? []),
      isHospitalized: report.patient.isHospitalized,
    },
    bodyComposition: {
      currentWeightKg: report.patient.currentWeight,
      bcs9: report.patient.bcs,
      targetBcs9: 5,
      muscleConditionLabel: legacy.muscleConditionLabel,
      targetWeightKg: report.target.targetWeight,
      targetWeightMethodLabel: legacy.targetWeightMethod ?? 'Peso-alvo estimado pela condição corporal',
      previousHealthyWeightKg: report.patient.previousHealthyWeightKg,
    },
    energy: {
      rerKcalDay: rerKcal,
      maintenanceRangeMin: legacy.maintenanceRangeMin,
      maintenanceRangeMax: legacy.maintenanceRangeMax,
      prescribedKcalDay: prescribedKcal,
      weightBasisLabel: legacy.weightBasisLabel,
      energyProfileLabel: legacy.energyProfileLabel,
      confidenceLabel: legacy.confidenceLabel,
      methodSummary: legacy.methodSummary,
      observedIntakeKcalDay: legacy.observedIntakeKcal,
      treatReserveKcalDay: report.patient.dietHistory?.treatsKcalPerDay,
      mainDietKcalDay: totalKcal,
      roundingErrorPercent: legacy.roundingErrorPercent ?? roundingError,
    },
    feeding: {
      dietType: report.diet.dietType ?? 'commercial',
      mealsPerDay,
      foods: report.formula.contributions.map((item) => ({
        name: item.foodName,
        dailyGrams: item.gramsAsFed,
        dailyGramsPractical: Math.round(item.gramsAsFed),
        perMealGrams: item.gramsAsFed / mealsPerDay,
        perMealGramsPractical: Math.round((item.gramsAsFed / mealsPerDay) * 10) / 10,
        dailyKcal: item.deliveredKcal,
        energyPercent: item.inclusionPct,
        moisturePct: item.moisturePct,
      })),
      totalDailyGrams: report.formula.feedingPlan.totalAsFedGrams,
      totalDailyKcal: totalKcal,
    },
    nutrientAssessment: {
      macroRows: report.formula.evaluation.macroSplit.map((slice) => ({
        label: slice.label,
        gramsDay: slice.grams,
        energyPercent: slice.percent,
        basisLabel: 'calculado',
      })),
      adequacyRows: report.formula.evaluation.adequacy
        .filter((row) => row.deliveredValue != null || row.status === 'insufficient_data')
        .map((row) => ({
          nutrient: row.label,
          delivered: row.deliveredValue != null ? `${row.deliveredValue.toFixed(2)} ${row.unit ?? ''}`.trim() : 'Não informado',
          target: row.target?.raw != null ? String(row.target.raw) : 'Não informado',
          statusLabel: adequacyStatusLabel(row.status),
          interpretation: row.reason ?? adequacyStatusLabel(row.status),
          basisLabel: 'por dia',
        })),
      dataQualityRows:
        report.formula.evaluation.missingDataFlags?.slice(0, 12).map((item) => ({
          item,
          qualityLabel: 'Não informado',
        })) ?? [],
    },
    therapeuticReview: therapeuticReview?.profiles.length
      ? {
          profiles: therapeuticReview.profiles.map((p) => ({
            profileName: p.profileName,
            statusLabel: therapeuticStatusLabel(p.status),
            goalLines: p.goals.map((g) => `${g.label}: ${g.messagePt}`),
          })),
          conflicts: therapeuticReview.conflicts.map((c) => c.messagePt),
          monitoringRecommendations: therapeuticReview.monitoringRecommendations,
        }
      : undefined,
    transitionPlan,
    hydrationPlan,
    enteralPlan,
    parenteralPlan,
    refeedingPlan,
    monitoringPlan: {
      items: [
        'Monitorar apetite, vômito, diarreia e aceitação da dieta.',
        'Avaliar mudanças nas fezes.',
        'Reavaliar peso e condição corporal na consulta de retorno.',
      ],
      weightMonitoring: report.target.goal === 'weight_loss' ? 'Pesar regularmente durante o protocolo.' : undefined,
      reevaluationLabel: 'Conforme retorno agendado',
    },
    warnings,
    createdAt: report.createdAt,
    prescribedBy: prescriber,
    clinic,
    ...legacy,
  }
}

export function isFullClinicalRecord(record: NutritionClinicalRecord | undefined): boolean {
  return !!record?.patient && !!record?.energy && !!record?.feeding
}
