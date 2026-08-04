import { getClinicalProfileBadges } from '../lib/clinicalProfiles'
import type { StoredCalculationReport } from '../types'
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

function buildMealSchedule(report: StoredCalculationReport): PdfMealScheduleRow[] {
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

function buildFoodRows(report: StoredCalculationReport, mode: NutritionPdfDocumentModel['mode']): PdfFoodPrescriptionRow[] {
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

function buildNutrientRows(report: StoredCalculationReport): PdfNutrientAdequacyRow[] {
  return report.formula.evaluation.adequacy
    .filter((row) => row.deliveredValue != null || row.status === 'insufficient_data')
    .map((row) => ({
      nutrient: row.label,
      delivered: row.deliveredValue != null ? `${row.deliveredValue.toFixed(2)} ${row.unit ?? ''}`.trim() : 'Não informado',
      target: row.target?.raw != null ? String(row.target.raw) : 'Não informado',
      status: adequacyStatusLabel(row.status),
      interpretation: row.reason ?? adequacyStatusLabel(row.status),
      basis: row.basisLabel ?? 'por dia',
    }))
}

function buildMacroRows(report: StoredCalculationReport): PdfKeyValueRow[] {
  const macros = report.formula.evaluation.macroSplit
  const rows: PdfKeyValueRow[] = []
  for (const slice of macros) {
    pushRow(rows, slice.label, `${slice.grams.toFixed(1)} g/dia (${slice.percent.toFixed(1)}% da energia)`)
  }
  pushRow(rows, 'Matéria seca total', formatGramsDay(report.formula.feedingPlan.totalDryMatterGrams))
  return rows
}

function buildWarnings(report: StoredCalculationReport): string[] {
  const warnings = [
    'Não oferecer outros alimentos além dos prescritos sem orientação.',
    'A quantidade prescrita poderá ser ajustada conforme a evolução do peso.',
  ]
  if (report.target.goal === 'weight_loss') {
    warnings.push('Pesar o paciente regularmente e não reduzir a quantidade por conta própria.')
  }
  if (report.patient.isHospitalized) {
    warnings.push('Não avançar a oferta alimentar sem avaliação da equipe veterinária.')
  }
  return warnings
}

function buildMonitoring(report: StoredCalculationReport): string[] {
  const items = [
    'Monitorar apetite, vômito, diarreia e aceitação da dieta.',
    'Avaliar mudanças nas fezes.',
    'Reavaliar peso e condição corporal na consulta de retorno.',
  ]
  if (report.target.goal === 'weight_loss') {
    items.unshift('Pesar o paciente regularmente durante o protocolo de emagrecimento.')
  }
  if ((report.patient.ageMonths ?? 0) < 12) {
    items.unshift('Reavaliar frequentemente peso, ECC e curva de crescimento.')
  }
  return items
}

export function buildNutritionPdfDocumentModel(
  input: BuildPdfModelInput,
  snapshot?: CalculationSnapshotV2 | null,
): NutritionPdfDocumentModel {
  const { report, mode } = input
  const baseClinical = resolveClinicalRecord(report, snapshot)
  const totalKcal = report.formula.contributions.reduce((sum, item) => sum + item.deliveredKcal, 0)
  const roundingError =
    baseClinical.prescribedKcalDay > 0
      ? ((totalKcal - baseClinical.prescribedKcalDay) / baseClinical.prescribedKcalDay) * 100
      : undefined
  const clinical = {
    ...baseClinical,
    roundingErrorPercent: baseClinical.roundingErrorPercent ?? roundingError,
  }
  const species = report.patient.species ?? 'dog'

  const headerRows: PdfKeyValueRow[] = []
  pushRow(headerRows, 'Espécie', speciesLabel(species))
  pushRow(headerRows, 'Raça', formatMissing(report.patient.breed))
  pushRow(headerRows, 'Peso atual', formatWeightKg(report.patient.currentWeight))
  pushRow(headerRows, 'Data', formatDatePtBr(report.createdAt))

  const identificationRows: PdfKeyValueRow[] = []
  pushRow(identificationRows, 'Paciente', formatMissing(report.patient.name))
  pushRow(identificationRows, 'Espécie', speciesLabel(species))
  pushRow(identificationRows, 'Raça', formatMissing(report.patient.breed))
  pushRow(identificationRows, 'Sexo', sexLabel(report.patient.sex))
  pushRow(identificationRows, 'Castração', neuterLabel(report.patient.isNeutered))
  pushRow(identificationRows, 'Idade', formatAgeYears(report.patient.ageMonths))
  pushRow(identificationRows, 'Peso atual', formatWeightKg(report.patient.currentWeight))
  pushRow(identificationRows, 'ECC', report.patient.bcs != null ? `${report.patient.bcs}/9` : undefined)
  pushRow(identificationRows, 'EMC', clinical.muscleConditionLabel ?? muscleConditionLabel(report.patient.muscleCondition))
  pushRow(identificationRows, 'Atividade', clinical.activitySummary)
  pushRow(identificationRows, 'Objetivo', goalTitle(report.target.goal))

  const bodyCompositionRows: PdfKeyValueRow[] = []
  pushRow(bodyCompositionRows, 'Peso atual', formatWeightKg(report.patient.currentWeight))
  pushRow(bodyCompositionRows, 'ECC atual', report.patient.bcs != null ? `${report.patient.bcs}/9` : undefined)
  pushRow(bodyCompositionRows, 'EMC', clinical.muscleConditionLabel)
  pushRow(bodyCompositionRows, 'Peso-alvo', formatWeightKg(report.target.targetWeight))
  pushRow(bodyCompositionRows, 'Método de estimativa', clinical.targetWeightMethod ?? 'Peso-alvo estimado pela condição corporal')
  if (report.patient.previousHealthyWeightKg) {
    pushRow(bodyCompositionRows, 'Peso saudável anterior', formatWeightKg(report.patient.previousHealthyWeightKg))
  }

  const energyRows: PdfKeyValueRow[] = []
  pushRow(energyRows, 'Necessidade energética de repouso', formatKcalDay(clinical.rerKcalDay))
  if (clinical.maintenanceRangeMin != null && clinical.maintenanceRangeMax != null) {
    pushRow(
      energyRows,
      'Faixa estimada de manutenção',
      `${Math.round(clinical.maintenanceRangeMin)}–${Math.round(clinical.maintenanceRangeMax)} kcal/dia`,
    )
  }
  pushRow(energyRows, 'Meta prescrita', formatKcalDay(clinical.prescribedKcalDay))
  pushRow(energyRows, 'Base utilizada', clinical.weightBasisLabel)
  pushRow(energyRows, 'Perfil', clinical.energyProfileLabel)
  pushRow(energyRows, 'Grau de confiança', clinical.confidenceLabel)
  if (clinical.observedIntakeKcal != null) {
    pushRow(energyRows, 'Ingestão observada', formatKcalDay(clinical.observedIntakeKcal))
  }
  const roundingNote = formatRoundingNote(clinical.roundingErrorPercent)
  if (roundingNote) pushRow(energyRows, 'Arredondamento', roundingNote)

  const therapeuticReview = report.therapeuticReview
  const therapeuticProfiles =
    therapeuticReview?.profiles.map((profile) => ({
      profileName: profile.profileName,
      statusLabel: therapeuticStatusLabel(profile.status),
      goalLines: profile.goals.map((goal) => `${goal.label}: ${goal.messagePt}`),
    })) ?? []

  const dataQualityRows =
    report.formula.evaluation.missingDataFlags?.slice(0, 8).map((key) => ({
      item: key,
      quality: 'Não informado',
    })) ?? []

  const hospitalRows: PdfKeyValueRow[] = []

  if (report.patient.comorbidityIds?.length) {
    const labels = getClinicalProfileBadges(species, report.patient.comorbidityIds)
    pushRow(identificationRows, 'Doenças', labels.join(', '))
  }

  const treatsKcal = report.patient.dietHistory?.treatsKcalPerDay
  const treatsText =
    treatsKcal != null && treatsKcal > 0
      ? `Limite de petiscos: até ${Math.round(treatsKcal)} kcal por dia.`
      : 'Não oferecer petiscos ou alimentos adicionais sem orientação.'

  if (report.patient.isHospitalized && report.hospital) {
    pushRow(hospitalRows, 'Risco de realimentação', formatRefeedingRisk(report.hospital.refeedingRiskLevel))
    pushRow(hospitalRows, 'Via de alimentação', formatFeedingRoute(report.hospital.feedingRoute))
    if (report.energy.rer) {
      pushRow(hospitalRows, 'RER hospitalar', formatKcalDay(report.energy.rer))
    }
    const progression = report.hospital.progressionPlan?.[0]
    if (progression) {
      pushRow(hospitalRows, 'Meta do dia', formatKcalDay(progression.kcalTarget))
      pushRow(hospitalRows, 'Percentual do RER', `${progression.percentRER}%`)
    }
    if (report.hospital.recentIntakePercent != null) {
      pushRow(hospitalRows, 'Percentual recebido recente', `${report.hospital.recentIntakePercent}%`)
    }
    if (report.hospital.refeedingRiskLevel === 'high') {
      pushRow(
        hospitalRows,
        'Progressão',
        'A progressão deve ser autorizada após avaliação clínica e eletrolítica.',
      )
    }
  }

  return {
    mode,
    generatedAt: report.createdAt,
    clinicName: input.clinicName ?? 'Clínica veterinária',
    veterinarianName: input.veterinarianName ?? 'Médico-veterinário responsável',
    patientName: formatMissing(report.patient.name),
    speciesLabel: speciesLabel(species),
    breed: report.patient.breed,
    currentWeight: formatWeightKg(report.patient.currentWeight),
    objectiveTitle: goalTitle(report.target.goal),
    objectiveDetail: goalDetail(report.target.goal, species),
    headerRows,
    identificationRows,
    bodyCompositionRows,
    energyRows,
    foodRows: buildFoodRows(report, mode),
    mealSchedule: buildMealSchedule(report),
    treatsText,
    hydrationText: 'Manter água limpa e fresca sempre disponível.',
    transitionRows: [],
    preparationBullets:
      report.diet.dietType === 'natural'
        ? [
            'Pesar os alimentos em balança digital.',
            'Não adicionar sal, alho, cebola, óleo ou temperos.',
            'Não substituir ingredientes sem nova avaliação.',
          ]
        : [],
    monitoringBullets: buildMonitoring(report),
    warningBullets: buildWarnings(report),
    macroRows: buildMacroRows(report),
    nutrientRows: buildNutrientRows(report),
    therapeuticProfiles,
    therapeuticConflicts: therapeuticReview?.conflicts.map((item) => item.messagePt) ?? [],
    monitoringRecommendations: therapeuticReview?.monitoringRecommendations ?? [],
    dataQualityRows,
    hospitalRows,
    references: mode === 'technical_report' ? CLINICAL_REFERENCES : [],
    comorbidityLabels: getClinicalProfileBadges(species, report.patient.comorbidityIds ?? []),
  }
}

function formatRefeedingRisk(level?: string): string {
  if (level === 'high') return 'Alto'
  if (level === 'moderate') return 'Moderado'
  if (level === 'low') return 'Baixo'
  return 'Não informado'
}

function formatFeedingRoute(route?: string): string {
  if (route === 'tube') return 'Sonda enteral'
  if (route === 'oral') return 'Via oral'
  if (route === 'parenteral') return 'Parenteral'
  return 'Não informado'
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
