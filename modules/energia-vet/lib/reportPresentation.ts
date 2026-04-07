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
  feedingSheets: Array<{
    dateLabel: string
    meta: ReportField[]
    foodRows: TableRow[]
    rows: TableRow[]
  }>
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

function toIsoDate(value: Date) {
  const y = value.getFullYear()
  const m = String(value.getMonth() + 1).padStart(2, '0')
  const d = String(value.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function toPtDate(value: string) {
  if (!value) return '__/__/____'
  const [y, m, d] = value.split('-')
  if (!y || !m || !d) return '__/__/____'
  return `${d}/${m}/${y}`
}

function getSpeciesLabel(species?: string) {
  if (species === 'dog') return 'Cao'
  if (species === 'cat') return 'Gato'
  return 'Não informado'
}

function getSexLabel(sex?: string) {
  if (sex === 'female') return 'Fêmea'
  if (sex === 'male') return 'Macho'
  return 'Não informado'
}

function getDietTypeLabel(dietType?: string) {
  if (dietType === 'commercial') return 'Comercial'
  if (dietType === 'natural') return '100% natural'
  if (dietType === 'hybrid') return 'Hibrida'
  return 'Não informado'
}

function getGoalLabel(goal?: string) {
  if (goal === 'weight_loss') return 'Perda de peso'
  if (goal === 'weight_gain') return 'Ganho de peso'
  return 'Manutencao'
}

function formatDailyGrams(value: number | null | undefined, decimals = 1) {
  if (value == null) return 'Não informado'
  return `${value.toFixed(decimals)} g/dia`
}

function formatKcal(value: number | null | undefined, decimals = 0) {
  if (value == null) return 'Não informado'
  return `${value.toFixed(decimals)} kcal/dia`
}

function buildNutritionRows(report: StoredCalculationReport): TableRow[] {
  const delivered = report.formula.evaluation.totalDelivered
  const totalKcalDelivered = report.formula.contributions.reduce((sum, c) => sum + c.deliveredKcal, 0)

  const rows: Array<{ label: string; value: string }> = []

  if (Number.isFinite(totalKcalDelivered) && totalKcalDelivered > 0) {
    rows.push({ label: 'Energia entregue', value: `${totalKcalDelivered.toFixed(1)} kcal/dia` })
  }

  const pushIf = (label: string, raw: number | null | undefined, decimals = 1) => {
    if (raw == null) return
    rows.push({ label, value: formatDailyGrams(raw, decimals) })
  }

  pushIf('Proteina', delivered.crudeProteinPct)
  pushIf('Gordura', delivered.etherExtractPct)
  pushIf('Carboidrato', delivered.nitrogenFreeExtractPct)
  pushIf('Fibra', delivered.crudeFiberPct)
  pushIf('Calcio', delivered.calciumPct, 2)
  pushIf('Fosforo', delivered.phosphorusPct, 2)

  for (const key of OPTIONAL_NUTRIENT_KEYS) {
    const value = delivered[key as keyof typeof delivered] as number | null | undefined
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

  return rows.map((item) => [item.label, item.value])
}

export function buildPrintableReportViewModel(report: StoredCalculationReport): PrintableReportViewModel {
  const requirement = getRequirementById(report.diet.requirementProfileId)
  const physiologicState = report.energy.resolvedProfileLabel ?? getPhysiologicStateById(report.energy.stateId ?? '')?.label ?? 'Nao informado'
  const programmed = report.formula.programmedFeeding ?? report.diet.programmedFeeding
  const feedingMealsPerDay = programmed?.mealsPerDay ?? report.diet.mealsPerDay ?? 2
  const startDateIso = programmed?.startDate || toIsoDate(new Date(report.createdAt))
  const printRangeMode = programmed?.printRangeMode ?? 'single_day'
  const feedingDates =
    programmed?.generatedFeedingDates?.length
      ? programmed.generatedFeedingDates
      : printRangeMode === 'next_3_days'
      ? [0, 1, 2].map((offset) => {
          const next = new Date(`${startDateIso}T00:00:00`)
          next.setDate(next.getDate() + offset)
          return toIsoDate(next)
        })
      : [startDateIso]

  const patientFields: ReportField[] = [
    { label: 'Paciente', value: safeText(report.patient.name) },
    { label: 'Tutor', value: safeText(report.patient.ownerName) },
    { label: 'Espécie', value: getSpeciesLabel(report.patient.species) },
    { label: 'Sexo', value: getSexLabel(report.patient.sex) },
    { label: 'Peso atual', value: report.patient.currentWeight != null ? `${report.patient.currentWeight.toFixed(2)} kg` : 'Nao informado' },
    { label: 'Idade', value: report.patient.ageMonths != null ? `${(report.patient.ageMonths / 12).toFixed(1)} anos` : 'Nao informado' },
    { label: 'ECC', value: report.patient.bcs != null ? `${report.patient.bcs}/9` : 'Nao informado' },
    { label: 'Castrado', value: report.patient.isNeutered ? 'Sim' : 'Nao' },
  ]

  const clinicalFields: ReportField[] = [
    { label: 'Perfil clínico final', value: physiologicState },
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

  if (report.patient.isNeutered) energyFields.push({ label: 'Castracao considerada', value: 'Sim' })
  if (report.patient.species === 'cat') energyFields.push({ label: 'Indoor considerado', value: report.patient.isIndoor ? 'Sim' : 'Nao' })

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
    { label: 'Modo de formulação', value: report.diet.formulationMode === 'complement' ? 'Complementar outras %' : 'Manual' },
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

  const feedingRowsByMeal = (programmed?.meals ?? report.formula.feedingPlan.meals.map((meal, index) => ({
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
    meal.time,
    `${meal.totalGrams} g`,
    meal.items.map((item) => `${item.foodName}: ${item.gramsAsFed} g`).join(' | '),
    'Sim / Nao (pesar sobra)',
    '',
  ])

  const feedingSheets = feedingDates.map((isoDate) => ({
    dateLabel: toPtDate(isoDate),
    meta: [
      { label: 'Data', value: toPtDate(isoDate) },
      { label: 'Animal', value: safeText(report.patient.name) },
      {
        label: 'Peso',
        value: report.patient.currentWeight != null ? `${report.patient.currentWeight.toFixed(2)} kg` : 'Nao informado',
      },
      { label: 'Alimentacoes por dia', value: String(feedingMealsPerDay) },
      { label: 'Alimentos utilizados', value: report.formula.contributions.map((item) => item.foodName).join(', ') || 'Nao informado' },
    ],
    foodRows: feedingSheetFoodRows,
    rows: feedingRowsByMeal,
  }))

  return {
    generatedAt: toDateLabel(report.createdAt),
    patientTitle: safeText(report.patient.name),
    patientSubtitle: `${getSpeciesLabel(report.patient.species)} - ${safeText(report.patient.ownerName)}`,
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
    feedingSheets,
  }
}

