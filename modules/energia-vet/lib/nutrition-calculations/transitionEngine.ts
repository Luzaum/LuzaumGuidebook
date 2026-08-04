export interface TransitionDayInput {
  day: number
  previousDietPercent: number
  newDietPercent: number
}

export interface TransitionPlanInput {
  targetKcalDay: number
  previousDiet: { name: string; kcalPerGram: number; currentGramsPerDay?: number }
  newDiet: { name: string; kcalPerGram: number; prescribedGramsPerDay: number }
  durationDays: number
  rows?: TransitionDayInput[]
}

export interface TransitionPlanRow {
  day: number
  previousDietPercent: number
  newDietPercent: number
  previousDietKcal: number
  newDietKcal: number
  previousDietGrams: number
  newDietGrams: number
  previousDietGramsPractical: number
  newDietGramsPractical: number
  totalKcal: number
}

export interface TransitionPlanResult {
  enabled: true
  previousDiet: TransitionPlanInput['previousDiet']
  newDiet: TransitionPlanInput['newDiet']
  durationDays: number
  rows: TransitionPlanRow[]
  instructions: string[]
  roundingErrorPercent?: number
}

export const DEFAULT_SEVEN_DAY_TRANSITION: TransitionDayInput[] = [
  { day: 1, previousDietPercent: 90, newDietPercent: 10 },
  { day: 2, previousDietPercent: 75, newDietPercent: 25 },
  { day: 3, previousDietPercent: 50, newDietPercent: 50 },
  { day: 4, previousDietPercent: 50, newDietPercent: 50 },
  { day: 5, previousDietPercent: 25, newDietPercent: 75 },
  { day: 6, previousDietPercent: 10, newDietPercent: 90 },
  { day: 7, previousDietPercent: 0, newDietPercent: 100 },
]

function roundPracticalGrams(value: number): number {
  const abs = Math.abs(value)
  if (abs >= 10) return Math.round(value)
  if (abs >= 1) return Math.round(value * 10) / 10
  if (abs > 0) return Math.round(value * 100) / 100
  return 0
}

export function validateTransitionDayPercents(rows: TransitionDayInput[]): string | null {
  for (const row of rows) {
    const sum = row.previousDietPercent + row.newDietPercent
    if (Math.abs(sum - 100) > 0.01) {
      return `Dia ${row.day}: a soma dos percentuais deve ser 100% (atual: ${sum.toFixed(1)}%).`
    }
    if (row.previousDietPercent < 0 || row.newDietPercent < 0) {
      return `Dia ${row.day}: percentuais não podem ser negativos.`
    }
  }
  return null
}

export function buildTransitionPlan(input: TransitionPlanInput): TransitionPlanResult | { error: string } {
  if (input.targetKcalDay <= 0) return { error: 'Meta energética inválida para transição.' }
  if (input.previousDiet.kcalPerGram <= 0 || input.newDiet.kcalPerGram <= 0) {
    return { error: 'Densidade energética deve ser maior que zero em ambas as dietas.' }
  }
  if (input.durationDays < 3 || input.durationDays > 14) {
    return { error: 'A transição deve ter entre 3 e 14 dias.' }
  }

  const baseRows =
    input.rows ??
    DEFAULT_SEVEN_DAY_TRANSITION.slice(0, input.durationDays).map((row, index) => ({
      ...row,
      day: index + 1,
    }))

  if (baseRows.length !== input.durationDays) {
    return { error: 'Número de linhas não corresponde à duração informada.' }
  }

  const percentError = validateTransitionDayPercents(baseRows)
  if (percentError) return { error: percentError }

  const rows: TransitionPlanRow[] = baseRows.map((row) => {
    const previousDietKcal = (input.targetKcalDay * row.previousDietPercent) / 100
    const newDietKcal = (input.targetKcalDay * row.newDietPercent) / 100
    const previousDietGrams = previousDietKcal / input.previousDiet.kcalPerGram
    const newDietGrams = newDietKcal / input.newDiet.kcalPerGram
    return {
      day: row.day,
      previousDietPercent: row.previousDietPercent,
      newDietPercent: row.newDietPercent,
      previousDietKcal,
      newDietKcal,
      previousDietGrams,
      newDietGrams,
      previousDietGramsPractical: roundPracticalGrams(previousDietGrams),
      newDietGramsPractical: roundPracticalGrams(newDietGrams),
      totalKcal: previousDietKcal + newDietKcal,
    }
  })

  const lastDay = rows[rows.length - 1]
  const practicalTotal = lastDay
    ? lastDay.previousDietGramsPractical * input.previousDiet.kcalPerGram +
      lastDay.newDietGramsPractical * input.newDiet.kcalPerGram
    : input.targetKcalDay
  const roundingErrorPercent =
    input.targetKcalDay > 0 ? ((practicalTotal - input.targetKcalDay) / input.targetKcalDay) * 100 : undefined

  return {
    enabled: true,
    previousDiet: input.previousDiet,
    newDiet: input.newDiet,
    durationDays: input.durationDays,
    rows,
    instructions: [
      'Misturar as quantidades prescritas de cada dieta no dia correspondente.',
      'Pesar os alimentos em balança digital.',
      'Observar apetite, vômito e fezes durante a transição.',
      'Não acelerar a transição sem orientação veterinária.',
    ],
    roundingErrorPercent,
  }
}
