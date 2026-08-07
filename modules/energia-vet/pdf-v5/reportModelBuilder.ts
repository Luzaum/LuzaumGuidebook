import { getClinicalProfileBadges } from '../lib/clinicalProfileLabels'
import type { NutritionClinicalRecord, StoredCalculationReport } from '../types'
import {
  adequacyStatusLabel,
  goalDetail,
  goalTitle,
  muscleConditionLabel,
  neuterLabel,
  sexLabel,
  speciesLabel,
  CLINICAL_REFERENCES,
  therapeuticStatusLabel,
} from './clinicalLabels'
import { resolveClinicalRecord } from './clinicalRecordBuilder'
import {
  formatAgeYears,
  formatDatePtBr,
  formatGrams,
  formatGramsDay,
  formatKcal,
  formatKcalDay,
  formatMissing,
  formatMlDay,
  formatPercent,
  formatRoundingNote,
  formatWeightKg,
} from './formatters'
import type {
  BuildPdfModelInput,
  NutritionPdfDocumentModel,
  PdfFoodPrescriptionRow,
  PdfKeyValueRow,
  PdfMealScheduleRow,
  PdfNutrientAdequacyRow,
} from './types'
import type { CalculationSnapshotV2 } from '../lib/calculationPersistenceV2'

function pushRow(rows: PdfKeyValueRow[], label: string, value: string | undefined) {
  if (!value || value === 'Não informado') return
  rows.push({ label, value })
}

function energyFromClinical(clinical: NutritionClinicalRecord) {
  if (clinical.energy) return clinical.energy
  return {
    rerKcalDay: clinical.rerKcalDay ?? 0,
    prescribedKcalDay: clinical.prescribedKcalDay ?? 0,
    maintenanceRangeMin: clinical.maintenanceRangeMin,
    maintenanceRangeMax: clinical.maintenanceRangeMax,
    weightBasisLabel: clinical.weightBasisLabel ?? 'Peso atual',
    energyProfileLabel: clinical.energyProfileLabel ?? 'Perfil energético selecionado',
    confidenceLabel: clinical.confidenceLabel ?? 'Moderada',
    methodSummary: clinical.methodSummary ?? '',
    observedIntakeKcalDay: clinical.observedIntakeKcal,
    roundingErrorPercent: clinical.roundingErrorPercent,
  }
}

function buildMealSchedule(report: StoredCalculationReport, clinical: NutritionClinicalRecord): PdfMealScheduleRow[] {
  const enteral = clinical.enteralPlan
  if (enteral?.schedule?.length) {
    const perAdmin = enteral.mlPerAdministration ?? enteral.gramsPerAdministration
    const unit = enteral.mlPerAdministration != null ? 'mL' : 'g'
    return enteral.schedule.map((time, index) => ({
      time,
      detail: perAdmin != null ? `${formatGrams(perAdmin).replace(' g', ` ${unit}`)}` : `${index + 1}ª administração`,
    }))
  }

  const programmed = report.formula.programmedFeeding ?? report.diet.programmedFeeding
  if (programmed?.meals?.length) {
    return programmed.meals.map((meal) => ({
      time: meal.time || meal.label,
      detail: meal.items.map((item) => `${item.foodName}: ${formatGrams(item.gramsAsFed)}`).join(' · '),
    }))
  }

  const meals = report.formula.feedingPlan.meals
  const mealsPerDay = report.diet.mealsPerDay ?? report.formula.feedingPlan.mealsPerDay ?? 2
  if (!meals.length) {
    const perMeal = (report.formula.feedingPlan.totalAsFedGrams ?? 0) / mealsPerDay
    return Array.from({ length: mealsPerDay }, (_, index) => ({
      time: `${index + 1}ª refeição`,
      detail: formatGrams(perMeal),
    }))
  }

  return meals.map((meal) => ({
    time: meal.time || meal.label,
    detail: formatGrams(meal.gramsAsFed),
  }))
}

function buildFoodRows(report: StoredCalculationReport, mode: NutritionPdfDocumentModel['mode'], clinical: NutritionClinicalRecord): PdfFoodPrescriptionRow[] {
  if (clinical.feeding?.foods.length) {
    return clinical.feeding.foods.map((item) => {
      const row: PdfFoodPrescriptionRow = {
        name: item.name,
        dailyAmount: formatGramsDay(item.dailyGramsPractical),
        perMealAmount: formatGrams(item.perMealGramsPractical),
        exactGrams: item.dailyGrams,
        practicalGrams: item.dailyGramsPractical,
      }
      if (mode === 'technical_report') {
        row.dailyKcal = formatKcal(item.dailyKcal)
        row.energyPct = formatPercent(item.energyPercent)
      }
      return row
    })
  }

  const mealsPerDay = report.diet.mealsPerDay ?? report.formula.feedingPlan.mealsPerDay ?? 2
  return report.formula.contributions.map((item) => {
    const perMeal = item.gramsAsFed / mealsPerDay
    const row: PdfFoodPrescriptionRow = {
      name: item.foodName,
      dailyAmount: formatGramsDay(item.gramsAsFed),
      perMealAmount: formatGrams(perMeal),
      exactGrams: item.gramsAsFed,
      practicalGrams: Math.round(perMeal * mealsPerDay) / mealsPerDay,
    }
    if (mode === 'technical_report') {
      row.dailyKcal = formatKcal(item.deliveredKcal)
      row.energyPct = formatPercent(item.inclusionPct)
    }
    return row
  })
}

function buildTransitionRows(clinical: NutritionClinicalRecord): { rows: string[][]; instructions: string[] } {
  const plan = clinical.transitionPlan
  if (!plan?.enabled || !plan.rows.length) return { rows: [], instructions: [] }
  return {
    rows: plan.rows.map((row) => [
      String(row.day),
      `${plan.previousDiet.name}: ${formatGrams(row.previousDietGramsPractical)}`,
      `${plan.newDiet.name}: ${formatGrams(row.newDietGramsPractical)}`,
    ]),
    instructions: plan.instructions,
  }
}

function buildHydrationText(clinical: NutritionClinicalRecord): { text: string; rows: PdfKeyValueRow[] } {
  const plan = clinical.hydrationPlan
  const rows: PdfKeyValueRow[] = []
  if (!plan) {
    return { text: 'Manter água limpa e fresca sempre disponível.', rows }
  }

  pushRow(rows, 'Método selecionado', plan.methodLabel)
  if (plan.estimates.selectedTargetMlDay != null) {
    pushRow(rows, 'Meta estimada', formatMlDay(plan.estimates.selectedTargetMlDay))
  }
  if (plan.foodWaterMlDay != null) pushRow(rows, 'Água da dieta', formatMlDay(plan.foodWaterMlDay))
  if (plan.metabolicWaterMlDay != null) pushRow(rows, 'Água metabólica', formatMlDay(plan.metabolicWaterMlDay))
  if (plan.voluntarilyConsumedWaterMlDay != null) {
    pushRow(rows, 'Água voluntária informada', formatMlDay(plan.voluntarilyConsumedWaterMlDay))
  }
  if (plan.enteralFlushWaterMlDay != null) {
    pushRow(rows, 'Lavagem enteral', formatMlDay(plan.enteralFlushWaterMlDay))
  }
  if (plan.estimatedOralWaterGapMlDay != null) {
    pushRow(rows, 'Lacuna oral estimada', formatMlDay(plan.estimatedOralWaterGapMlDay))
  }

  const target = plan.estimates.selectedTargetMlDay
  const text =
    target != null
      ? `Meta nutricional estimada: aproximadamente ${Math.round(target)} mL por dia, considerando a água presente nos alimentos. ${plan.disclaimer}`
      : `Manter água limpa e fresca sempre disponível. ${plan.disclaimer}`

  return { text, rows }
}

function buildEnteralRows(clinical: NutritionClinicalRecord): PdfKeyValueRow[] {
  const e = clinical.enteralPlan
  if (!e) return []
  const rows: PdfKeyValueRow[] = []
  pushRow(rows, 'Via', routeLabel(e.route))
  pushRow(rows, 'Dieta', e.dietName)
  if (e.kcalPerMl != null) pushRow(rows, 'Densidade energética', `${e.kcalPerMl.toFixed(2)} kcal/mL`)
  if (e.kcalPerGram != null) pushRow(rows, 'Densidade energética', `${e.kcalPerGram.toFixed(2)} kcal/g`)
  pushRow(rows, 'Meta diária', formatKcalDay(e.prescribedKcalDay))
  pushRow(rows, 'Percentual do RER', `${e.prescribedPercentRer.toFixed(1)}%`)
  if (e.prescribedMlDay != null) pushRow(rows, 'Volume diário', formatMlDay(e.prescribedMlDay))
  if (e.prescribedGramsDay != null) pushRow(rows, 'Quantidade diária', formatGramsDay(e.prescribedGramsDay))
  pushRow(rows, 'Modo', adminModeLabel(e.administrationMode))
  if (e.mlPerAdministration != null) pushRow(rows, 'Volume por administração', `${e.mlPerAdministration.toFixed(1)} mL`)
  if (e.gramsPerAdministration != null) pushRow(rows, 'Quantidade por administração', formatGrams(e.gramsPerAdministration))
  if (e.mlPerHour != null) pushRow(rows, 'Taxa horária', `${e.mlPerHour.toFixed(1)} mL/h`)
  if (e.totalFlushMlDay != null) pushRow(rows, 'Lavagem total/dia', formatMlDay(e.totalFlushMlDay))
  if (e.deliveredKcalDay != null) pushRow(rows, 'Calorias recebidas', formatKcalDay(e.deliveredKcalDay))
  if (e.deliveredPercent != null) pushRow(rows, 'Percentual recebido', `${e.deliveredPercent.toFixed(1)}%`)
  if (e.dailyDeficitKcal != null) pushRow(rows, 'Déficit diário', formatKcalDay(e.dailyDeficitKcal))
  if (e.cumulativeDeficitKcal != null) pushRow(rows, 'Déficit acumulado', formatKcalDay(e.cumulativeDeficitKcal))
  return rows
}

function buildParenteralRows(clinical: NutritionClinicalRecord): PdfKeyValueRow[] {
  const p = clinical.parenteralPlan
  if (!p) return []
  const rows: PdfKeyValueRow[] = []
  pushRow(rows, 'Meta energética', formatKcalDay(p.targetKcalDay))
  pushRow(rows, 'Proteína', `${p.proteinGramsDay.toFixed(1)} g/dia`)
  pushRow(rows, 'Aminoácidos', `${p.aminoAcidVolumeMlDay.toFixed(1)} mL/dia`)
  pushRow(rows, 'Dextrose', `${p.dextroseVolumeMlDay.toFixed(1)} mL/dia (${p.dextroseGramsDay.toFixed(1)} g)`)
  pushRow(rows, 'Lipídios', `${p.lipidVolumeMlDay.toFixed(1)} mL/dia (${p.lipidGramsKgDay.toFixed(2)} g/kg/dia)`)
  pushRow(rows, 'GIR', `${p.glucoseInfusionRateMgKgMin.toFixed(2)} mg/kg/min`)
  pushRow(rows, 'Volume total', formatMlDay(p.totalVolumeMlDay))
  pushRow(rows, 'Taxa de infusão', `${p.infusionRateMlHour.toFixed(1)} mL/h`)
  pushRow(rows, 'Via sugerida', vascularLabel(p.vascularAccess))
  return rows
}

function buildRefeedingRows(clinical: NutritionClinicalRecord): PdfKeyValueRow[] {
  const r = clinical.refeedingPlan
  if (!r) return []
  const rows: PdfKeyValueRow[] = []
  pushRow(rows, 'Risco', riskLabel(r.riskLevel))
  pushRow(rows, 'RER', formatKcalDay(r.rerKcalDay))
  if (r.riskFactors.length) pushRow(rows, 'Fatores', r.riskFactors.join('; '))
  for (const day of r.days.slice(0, 7)) {
    pushRow(rows, `Dia ${day.day}`, `${day.targetPercentRer}% RER · ${Math.round(day.targetKcalDay)} kcal`)
  }
  return rows
}

function routeLabel(route: string): string {
  const map: Record<string, string> = {
    oral: 'Via oral',
    nasoesophageal: 'Sonda nasoesofágica',
    nasogastric: 'Sonda nasogástrica',
    esophagostomy: 'Esofagostomia',
    gastrostomy: 'Gastrostomia',
    jejunostomy: 'Jejunostomia',
  }
  return map[route] ?? route
}

function adminModeLabel(mode: string): string {
  if (mode === 'continuous') return 'Infusão contínua'
  if (mode === 'intermittent') return 'Intermitente'
  return 'Bolus'
}

function vascularLabel(access: string): string {
  if (access === 'central') return 'Via central'
  if (access === 'peripheral') return 'Via periférica'
  return 'Não definida'
}

function riskLabel(level: string): string {
  if (level === 'high') return 'Alto'
  if (level === 'moderate') return 'Moderado'
  return 'Baixo'
}

export function buildNutritionPdfDocumentModel(
  input: BuildPdfModelInput,
  snapshot?: CalculationSnapshotV2 | null,
): NutritionPdfDocumentModel {
  const { report, mode } = input
  const clinical = resolveClinicalRecord(report, snapshot)
  const energy = energyFromClinical(clinical)
  const species = report.patient.species ?? 'dog'
  const { rows: transitionRows, instructions: transitionInstructions } = buildTransitionRows(clinical)
  const hydration = buildHydrationText(clinical)

  const headerRows: PdfKeyValueRow[] = []
  pushRow(headerRows, 'Espécie', speciesLabel(species))
  pushRow(headerRows, 'Raça', formatMissing(report.patient.breed ?? clinical.patient.breed))
  pushRow(headerRows, 'Peso atual', formatWeightKg(clinical.patient.currentWeightKg ?? report.patient.currentWeight))
  pushRow(headerRows, 'Data', formatDatePtBr(report.createdAt))

  const identificationRows: PdfKeyValueRow[] = []
  pushRow(identificationRows, 'Paciente', clinical.patient.name)
  pushRow(identificationRows, 'Espécie', speciesLabel(species))
  pushRow(identificationRows, 'Raça', formatMissing(clinical.patient.breed))
  pushRow(identificationRows, 'Sexo', clinical.patient.sex ?? sexLabel(report.patient.sex))
  pushRow(identificationRows, 'Castração', clinical.patient.neuterLabel ?? neuterLabel(report.patient.isNeutered))
  pushRow(identificationRows, 'Idade', clinical.patient.ageLabel ?? formatAgeYears(report.patient.ageMonths))
  pushRow(identificationRows, 'Peso atual', formatWeightKg(clinical.patient.currentWeightKg))
  pushRow(identificationRows, 'ECC', clinical.patient.bcs9 != null ? `${clinical.patient.bcs9}/9` : undefined)
  pushRow(identificationRows, 'EMC', clinical.patient.muscleConditionLabel ?? muscleConditionLabel(report.patient.muscleCondition))
  pushRow(identificationRows, 'Atividade', clinical.patient.activitySummary)
  pushRow(identificationRows, 'Objetivo', goalTitle(report.target.goal))
  if (clinical.patient.comorbidityLabels?.length) {
    pushRow(identificationRows, 'Doenças', clinical.patient.comorbidityLabels.join(', '))
  }

  const bodyCompositionRows: PdfKeyValueRow[] = []
  pushRow(bodyCompositionRows, 'Peso atual', formatWeightKg(clinical.bodyComposition.currentWeightKg))
  pushRow(bodyCompositionRows, 'ECC atual', clinical.bodyComposition.bcs9 != null ? `${clinical.bodyComposition.bcs9}/9` : undefined)
  pushRow(bodyCompositionRows, 'EMC', clinical.bodyComposition.muscleConditionLabel)
  pushRow(bodyCompositionRows, 'Peso-alvo', formatWeightKg(clinical.bodyComposition.targetWeightKg))
  pushRow(bodyCompositionRows, 'Método de estimativa', clinical.bodyComposition.targetWeightMethodLabel)

  const energyRows: PdfKeyValueRow[] = []
  pushRow(energyRows, 'Necessidade energética de repouso', formatKcalDay(energy.rerKcalDay))
  if (energy.maintenanceRangeMin != null && energy.maintenanceRangeMax != null) {
    pushRow(energyRows, 'Faixa estimada de manutenção', `${Math.round(energy.maintenanceRangeMin)}–${Math.round(energy.maintenanceRangeMax)} kcal/dia`)
  }
  pushRow(energyRows, 'Meta prescrita', formatKcalDay(energy.prescribedKcalDay))
  pushRow(energyRows, 'Base utilizada', energy.weightBasisLabel)
  pushRow(energyRows, 'Perfil', energy.energyProfileLabel)
  if (energy.observedIntakeKcalDay != null) pushRow(energyRows, 'Ingestão observada', formatKcalDay(energy.observedIntakeKcalDay))
  if (energy.treatReserveKcalDay != null) pushRow(energyRows, 'Reserva para petiscos', formatKcalDay(energy.treatReserveKcalDay))
  const roundingNote = formatRoundingNote(energy.roundingErrorPercent)
  if (roundingNote) pushRow(energyRows, 'Arredondamento', roundingNote)

  const therapeuticReview = clinical.therapeuticReview ?? report.therapeuticReview
  const therapeuticProfiles =
    therapeuticReview?.profiles.map((profile) => ({
      profileName: profile.profileName,
      statusLabel: profile.statusLabel ?? therapeuticStatusLabel((profile as { status?: string }).status ?? 'adequate'),
      goalLines: profile.goalLines ?? (profile as { goals?: Array<{ messagePt: string }> }).goals?.map((g) => g.messagePt) ?? [],
    })) ?? []

  const nutrientRows: PdfNutrientAdequacyRow[] =
    clinical.nutrientAssessment?.adequacyRows.map((row) => ({
      nutrient: row.nutrient,
      delivered: row.delivered,
      target: row.target,
      status: row.statusLabel,
      interpretation: row.interpretation,
      basis: row.basisLabel,
    })) ??
    report.formula.evaluation.adequacy
      .filter((row) => row.deliveredValue != null || row.status === 'insufficient_data')
      .map((row) => ({
        nutrient: row.label,
        delivered: row.deliveredValue != null ? `${row.deliveredValue.toFixed(2)} ${row.unit ?? ''}`.trim() : 'Não informado',
        target: row.target?.raw != null ? String(row.target.raw) : 'Não informado',
        status: adequacyStatusLabel(row.status),
        interpretation: row.reason ?? adequacyStatusLabel(row.status),
        basis: row.basisLabel ?? 'por dia',
      }))

  const macroRows: PdfKeyValueRow[] =
    clinical.nutrientAssessment?.macroRows.map((m) => ({
      label: m.label,
      value: `${m.gramsDay.toFixed(1)} g/dia (${m.energyPercent.toFixed(1)}% da energia)`,
    })) ?? []

  const dataQualityRows =
    clinical.nutrientAssessment?.dataQualityRows.map((row) => ({ item: row.item, quality: row.qualityLabel })) ??
    report.formula.evaluation.missingDataFlags?.slice(0, 8).map((key) => ({ item: key, quality: 'Não informado' })) ??
    []

  const enteralRows = buildEnteralRows(clinical)
  const parenteralRows = mode === 'technical_report' ? buildParenteralRows(clinical) : []
  const refeedingRows = buildRefeedingRows(clinical)
  const hospitalRows = [...refeedingRows, ...enteralRows.filter((row) => !parenteralRows.length)]

  const treatsKcal = energy.treatReserveKcalDay ?? report.patient.dietHistory?.treatsKcalPerDay
  const treatsText =
    treatsKcal != null && treatsKcal > 0
      ? `Limite de petiscos: até ${Math.round(treatsKcal)} kcal por dia.`
      : 'Não oferecer petiscos ou alimentos adicionais sem orientação.'

  const warningBullets = clinical.warnings.map((w) => w.message)
  const monitoringBullets = clinical.monitoringPlan?.items ?? []

  return {
    mode,
    generatedAt: report.createdAt,
    clinicName: input.clinicName ?? clinical.clinic?.name ?? 'Clínica veterinária',
    veterinarianName: input.veterinarianName ?? clinical.prescribedBy?.name ?? 'Médico-veterinário responsável',
    patientName: clinical.patient.name,
    speciesLabel: speciesLabel(species),
    breed: clinical.patient.breed,
    currentWeight: formatWeightKg(clinical.patient.currentWeightKg),
    objectiveTitle: goalTitle(report.target.goal),
    objectiveDetail: goalDetail(report.target.goal, species),
    headerRows,
    identificationRows,
    bodyCompositionRows,
    energyRows,
    foodRows: buildFoodRows(report, mode, clinical),
    mealSchedule: buildMealSchedule(report, clinical),
    treatsText,
    hydrationText: hydration.text,
    transitionRows,
    transitionInstructions,
    preparationBullets:
      report.diet.dietType === 'natural'
        ? ['Pesar os alimentos em balança digital.', 'Não adicionar sal, alho, cebola, óleo ou temperos.', 'Não substituir ingredientes sem nova avaliação.']
        : [],
    monitoringBullets,
    warningBullets,
    macroRows,
    nutrientRows,
    therapeuticProfiles,
    therapeuticConflicts: therapeuticReview?.conflicts ?? [],
    monitoringRecommendations: therapeuticReview?.monitoringRecommendations ?? [],
    dataQualityRows,
    hospitalRows,
    hydrationRows: mode === 'technical_report' ? hydration.rows : [],
    enteralRows: mode === 'technical_report' ? enteralRows : [],
    parenteralRows,
    refeedingRows: mode === 'technical_report' ? refeedingRows : [],
    tutorEnteralBullets: mode === 'tutor_plan' ? (clinical.enteralPlan?.tutorInstructions ?? []) : [],
    references: mode === 'technical_report' ? CLINICAL_REFERENCES : [],
    comorbidityLabels: clinical.patient.comorbidityLabels ?? getClinicalProfileBadges(species, report.patient.comorbidityIds ?? []),
  }
}

export function collectPdfModelStrings(model: NutritionPdfDocumentModel): string {
  const parts: string[] = []
  const walk = (value: unknown) => {
    if (typeof value === 'string') {
      parts.push(value)
      return
    }
    if (Array.isArray(value)) {
      value.forEach(walk)
      return
    }
    if (value && typeof value === 'object') {
      Object.values(value).forEach(walk)
    }
  }
  walk(model)
  return parts.join(' ')
}
