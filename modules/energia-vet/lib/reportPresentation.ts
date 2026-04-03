import type { StoredCalculationReport } from '../types'
import { getFoodById, getRequirementById } from './genutriData'
import { getHumanRequirementLabel } from './clinicalProfiles'
import { getPhysiologicStateById } from './nutrition'

type ReportField = {
  label: string
  value: string
}

type TableRow = string[]

export type PrintableReportViewModel = {
  generatedAt: string
  patientTitle: string
  patientSubtitle: string
  patientFields: ReportField[]
  clinicalFields: ReportField[]
  energyFields: ReportField[]
  targetFields: ReportField[]
  formulaMetaFields: ReportField[]
  formulaRows: TableRow[]
  nutrientRows: TableRow[]
  macroRows: TableRow[]
  contributionRows: TableRow[]
  alertNotes: string[]
  feedingSheetTitle: string
  feedingSheetMeta: ReportField[]
  feedingSheetFoodRows: TableRow[]
  feedingSheetRows: TableRow[]
}

const OPTIONAL_NUTRIENT_KEYS = [
  'taurinePct',
  'omega3Pct',
  'omega6Pct',
  'sodiumPct',
  'potassiumPct',
  'magnesiumPct',
]

function safeText(value?: string | null) {
  return value && value.trim() ? value.trim() : 'Nao informado'
}

function toDateLabel(value: string) {
  return new Date(value).toLocaleString('pt-BR')
}

function getSpeciesLabel(species?: string) {
  if (species === 'dog') return 'Cao'
  if (species === 'cat') return 'Gato'
  return 'Nao informado'
}

function getSexLabel(sex?: string) {
  if (sex === 'female') return 'Femea'
  if (sex === 'male') return 'Macho'
  return 'Nao informado'
}

function getDietTypeLabel(dietType?: string) {
  if (dietType === 'commercial') return 'Comercial'
  if (dietType === 'natural') return '100% natural'
  if (dietType === 'hybrid') return 'Hibrida'
  return 'Nao informado'
}

function getGoalLabel(goal?: string) {
  if (goal === 'weight_loss') return 'Perda de peso'
  if (goal === 'weight_gain') return 'Ganho de peso'
  return 'Manutencao'
}

function formatDailyGrams(value: number | null | undefined, decimals = 1) {
  if (value == null) return 'Nao informado'
  return `${value.toFixed(decimals)} g/dia`
}

function formatKcal(value: number | null | undefined, decimals = 0) {
  if (value == null) return 'Nao informado'
  return `${value.toFixed(decimals)} kcal/dia`
}

function buildNutritionRows(report: StoredCalculationReport): TableRow[] {
  const delivered = report.formula.evaluation.totalDelivered
  const rows: Array<{ label: string; value: string | null }> = [
    { label: 'Energia entregue', value: formatKcal(report.diet.targetEnergy, 1) },
    { label: 'Proteina', value: formatDailyGrams(delivered.crudeProteinPct) },
    { label: 'Gordura', value: formatDailyGrams(delivered.etherExtractPct) },
    { label: 'Carboidrato', value: formatDailyGrams(delivered.nitrogenFreeExtractPct) },
    { label: 'Fibra', value: formatDailyGrams(delivered.crudeFiberPct) },
    { label: 'Calcio', value: formatDailyGrams(delivered.calciumPct, 2) },
    { label: 'Fosforo', value: formatDailyGrams(delivered.phosphorusPct, 2) },
  ]

  for (const key of OPTIONAL_NUTRIENT_KEYS) {
    const value = delivered[key]
    if (value == null) continue
    const label =
      key === 'taurinePct'
        ? 'Taurina'
        : key === 'omega3Pct'
        ? 'Omega 3'
        : key === 'omega6Pct'
        ? 'Omega 6'
        : key === 'sodiumPct'
        ? 'Sodio'
        : key === 'potassiumPct'
        ? 'Potassio'
        : 'Magnesio'
    rows.push({ label, value: formatDailyGrams(value, 2) })
  }

  return rows
    .filter((item) => item.value != null)
    .map((item) => [item.label, item.value as string])
}

export function buildPrintableReportViewModel(report: StoredCalculationReport): PrintableReportViewModel {
  const requirement = getRequirementById(report.diet.requirementProfileId)
  const physiologicState = getPhysiologicStateById(report.energy.stateId ?? '')?.label ?? 'Nao informado'
  const programmed = report.formula.programmedFeeding ?? report.diet.programmedFeeding
  const feedingMealsPerDay = programmed?.mealsPerDay ?? report.diet.mealsPerDay ?? 2

  const patientFields: ReportField[] = [
    { label: 'Paciente', value: safeText(report.patient.name) },
    { label: 'Tutor', value: safeText(report.patient.ownerName) },
    { label: 'Especie', value: getSpeciesLabel(report.patient.species) },
    { label: 'Sexo', value: getSexLabel(report.patient.sex) },
    { label: 'Peso atual', value: report.patient.currentWeight != null ? `${report.patient.currentWeight.toFixed(2)} kg` : 'Nao informado' },
    { label: 'Idade', value: report.patient.ageMonths != null ? `${(report.patient.ageMonths / 12).toFixed(1)} anos` : 'Nao informado' },
    { label: 'ECC', value: report.patient.bcs != null ? `${report.patient.bcs}/9` : 'Nao informado' },
    { label: 'Castrado', value: report.patient.isNeutered ? 'Sim' : 'Nao' },
  ]

  const clinicalFields: ReportField[] = [
    { label: 'Perfil clinico final', value: physiologicState },
    { label: 'Perfil de exigencia', value: getHumanRequirementLabel(requirement) },
    { label: 'Indoor', value: report.patient.isIndoor ? 'Sim' : 'Nao' },
    { label: 'Hospitalizado', value: report.patient.isHospitalized ? 'Sim' : 'Nao' },
  ]

  const energyFields: ReportField[] = [
    { label: 'RER', value: formatKcal(report.energy.rer) },
    { label: 'Energia final estimada', value: formatKcal(report.energy.mer) },
    { label: 'Energia-alvo', value: formatKcal(report.target.targetEnergy) },
    { label: 'Peso usado', value: report.energy.weightUsed != null ? `${report.energy.weightUsed.toFixed(2)} kg` : 'Nao informado' },
  ]

  if (report.energy.activityHoursPerDay != null) {
    energyFields.push({
      label: 'Atividade diaria',
      value: `${report.energy.activityHoursPerDay.toFixed(1)} h/dia`,
    })
  }

  if (report.energy.activityImpact) {
    energyFields.push({
      label: 'Impacto da atividade',
      value: report.energy.activityImpact === 'high' ? 'Alto impacto' : 'Baixo impacto',
    })
  }

  if (report.energy.obesityProne) {
    energyFields.push({
      label: 'Predisposicao a obesidade',
      value: 'Sim',
    })
  }

  const targetFields: ReportField[] = [
    { label: 'Objetivo', value: getGoalLabel(report.target.goal) },
    { label: 'Peso-alvo', value: report.target.targetWeight != null ? `${report.target.targetWeight.toFixed(2)} kg` : 'Nao informado' },
    {
      label: 'Diferenca ponderal',
      value:
        report.target.targetWeight != null && report.patient.currentWeight != null
          ? `${(report.target.targetWeight - report.patient.currentWeight).toFixed(2)} kg`
          : 'Nao informado',
    },
  ]

  const formulaMetaFields: ReportField[] = [
    { label: 'Tipo de dieta', value: getDietTypeLabel(report.diet.dietType) },
    { label: 'Modo de formulacao', value: report.diet.formulationMode === 'complement' ? 'Complementar outras %' : 'Manual' },
    { label: 'Refeicoes por dia', value: String(report.diet.mealsPerDay) },
    { label: 'Quantidade por refeicao', value: report.diet.gramsPerMeal != null ? `${report.diet.gramsPerMeal.toFixed(1)} g` : 'Nao informado' },
    { label: 'Total diario (MN)', value: report.diet.totalAsFedGrams != null ? `${report.diet.totalAsFedGrams.toFixed(1)} g` : 'Nao informado' },
    { label: 'Total diario (MS)', value: report.diet.totalDryMatterGrams != null ? `${report.diet.totalDryMatterGrams.toFixed(1)} g` : 'Nao informado' },
  ]

  const formulaRows = report.formula.contributions.map((item) => {
    const rawEntry = report.diet.entries.find((entry) => entry.foodId === item.foodId)
    return [
      item.foodName,
      `${rawEntry?.inclusionPct?.toFixed(1) ?? item.inclusionPct.toFixed(1)}%`,
      `${item.gramsAsFed.toFixed(1)} g`,
      `${item.deliveredKcal.toFixed(1)} kcal`,
    ]
  })

  const macroRows = report.formula.evaluation.macroSplit.map((item) => [
    item.label,
    `${item.percent.toFixed(1)}%`,
    `${item.grams.toFixed(1)} g`,
    `${item.kcal.toFixed(1)} kcal`,
  ])

  const contributionRows = report.formula.contributions.map((item) => {
    const food = getFoodById(item.foodId)
    return [
      item.foodName,
      food?.categoryNormalized ?? 'Sem categoria',
      `${item.gramsAsFed.toFixed(1)} g/dia`,
      `${item.deliveredKcal.toFixed(1)} kcal/dia`,
      report.diet.mealsPerDay > 0 ? `${(item.gramsAsFed / report.diet.mealsPerDay).toFixed(1)} g/refeicao` : 'Nao informado',
    ]
  })

  const alertNotes = [
    ...report.formula.evaluation.alerts,
    ...report.formula.feedingPlan.instructions,
  ]

  const feedingSheetFoodRows = report.formula.contributions.map((item) => [
    item.foodName,
    `${item.gramsAsFed.toFixed(1)} g`,
    report.diet.mealsPerDay > 0 ? `${(item.gramsAsFed / report.diet.mealsPerDay).toFixed(1)} g` : 'Nao informado',
  ])

  const feedingSheetRows = (programmed?.meals ?? report.formula.feedingPlan.meals.map((meal, index) => ({
    id: `meal-${index}`,
    label: meal.label,
    time: meal.time,
    totalGrams: Math.round(meal.gramsAsFed),
    items: report.formula.contributions.map((item) => ({
      foodId: item.foodId,
      foodName: item.foodName,
      gramsAsFed: Math.round(item.gramsAsFed / feedingMealsPerDay),
    })),
  }))).map((meal) => [
    '__/__/____',
    meal.time,
    `${meal.totalGrams} g`,
    meal.items.map((item) => `${item.foodName}: ${item.gramsAsFed} g`).join(' | '),
    'Sim / Nao (pesar sobra)',
    '',
  ])

  return {
    generatedAt: toDateLabel(report.createdAt),
    patientTitle: safeText(report.patient.name),
    patientSubtitle: `${getSpeciesLabel(report.patient.species)} • ${safeText(report.patient.ownerName)}`,
    patientFields,
    clinicalFields,
    energyFields,
    targetFields,
    formulaMetaFields,
    formulaRows,
    nutrientRows: buildNutritionRows(report),
    macroRows,
    contributionRows,
    alertNotes,
    feedingSheetTitle: 'FICHA DE ALIMENTACAO',
    feedingSheetMeta: [
      { label: 'Data', value: new Date(report.createdAt).toLocaleDateString('pt-BR') },
      { label: 'Animal', value: safeText(report.patient.name) },
      { label: 'Alimentacoes por dia', value: String(feedingMealsPerDay) },
      { label: 'Alimentos utilizados', value: report.formula.contributions.map((item) => item.foodName).join(', ') || 'Nao informado' },
    ],
    feedingSheetFoodRows,
    feedingSheetRows,
  }
}
