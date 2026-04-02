import { getEnergyRule, getFoodById, getNutrientDefinition, getRequirementById } from './genutriData'
import type {
  DietEvaluation,
  DietFormulaEntry,
  EvaluatedNutrient,
  FeedingPlan,
  FeedingPlanMeal,
  FoodContribution,
  FoodItem,
  MacroSlice,
  NutrientAmountMap,
  NutrientTargetValue,
  RequirementProfile,
  Species,
} from '../types'

const MACRO_COLORS: Record<MacroSlice['key'], string> = {
  protein: '#f97316',
  fat: '#eab308',
  carb: '#3b82f6',
}

// Apenas estes nutrientes são obrigatórios — os demais são opcionais e NÃO geram alerta de ausência
const REQUIRED_NUTRIENT_KEYS = new Set([
  'moisturePct',
  'dryMatterPct',
  'energyKcalPer100g',
  'crudeProteinPct',
  'etherExtractPct',
  'ashPct',
  'crudeFiberPct',
  'nitrogenFreeExtractPct',
  'calciumPct',
  'phosphorusPct',
])

function round(value: number | null | undefined, decimals = 4): number | null {
  if (value == null || Number.isNaN(value) || !Number.isFinite(value)) {
    return null
  }
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor
}

function normalizeEntries(entries: DietFormulaEntry[]): DietFormulaEntry[] {
  const positiveEntries = entries.filter((entry) => entry.inclusionPct > 0)
  const total = positiveEntries.reduce((sum, entry) => sum + entry.inclusionPct, 0)
  if (!total) {
    return []
  }
  return positiveEntries.map((entry) => ({
    ...entry,
    inclusionPct: (entry.inclusionPct / total) * 100,
  }))
}

function getPercentKeys() {
  return new Set([
    'moisturePct',
    'dryMatterPct',
    'crudeProteinPct',
    'etherExtractPct',
    'ashPct',
    'crudeFiberPct',
    'nitrogenFreeExtractPct',
    'calciumPct',
    'phosphorusPct',
    'potassiumPct',
    'sodiumPct',
    'chloridePct',
    'magnesiumPct',
    'taurinePct',
    'methionineCystinePct',
    'omega3Pct',
    'omega6Pct',
    'mcfaPct',
    'argininePct',
    'histidinePct',
    'isoleucinePct',
    'leucinePct',
    'lysinePct',
    'methioninePct',
    'phenylalaninePct',
    'phenylalanineTyrosinePct',
    'threoninePct',
    'tryptophanPct',
    'valinePct',
    'epaPct',
    'dhaPct',
    'epaDhaPct',
  ])
}

function makeEmptyMap(keys: string[]): NutrientAmountMap {
  return Object.fromEntries(keys.map((key) => [key, null]))
}

function compareAgainstTarget(deliveredValue: number, target: NutrientTargetValue): Pick<EvaluatedNutrient, 'status' | 'reason'> {
  if (target.kind === 'number' || target.kind === 'number_with_text') {
    if (target.value == null) return { status: 'manual', reason: 'Alvo sem valor operacional.' }
    if (deliveredValue < target.value) return { status: 'below', reason: `Entregue ${deliveredValue.toFixed(2)} abaixo do alvo ${target.value.toFixed(2)}.` }
    return { status: 'adequate', reason: `Entregue ${deliveredValue.toFixed(2)} atende ou supera o alvo ${target.value.toFixed(2)}.` }
  }

  if (target.kind === 'range') {
    if (target.min == null || target.max == null) return { status: 'manual', reason: 'Faixa incompleta.' }
    if (deliveredValue < target.min) return { status: 'below', reason: `Entregue ${deliveredValue.toFixed(2)} abaixo da faixa ${target.min.toFixed(2)}-${target.max.toFixed(2)}.` }
    if (deliveredValue > target.max) return { status: 'above', reason: `Entregue ${deliveredValue.toFixed(2)} acima da faixa ${target.min.toFixed(2)}-${target.max.toFixed(2)}.` }
    return { status: 'adequate', reason: `Entregue ${deliveredValue.toFixed(2)} dentro da faixa ${target.min.toFixed(2)}-${target.max.toFixed(2)}.` }
  }

  if (target.kind === 'comparator') {
    if (target.value == null || !target.operator) return { status: 'manual', reason: 'Comparador inválido.' }
    if (target.operator === '>') return deliveredValue > target.value ? { status: 'adequate', reason: `Entregue ${deliveredValue.toFixed(2)} acima de ${target.value.toFixed(2)}.` } : { status: 'below', reason: `Entregue ${deliveredValue.toFixed(2)} não ultrapassa ${target.value.toFixed(2)}.` }
    if (target.operator === '>=') return deliveredValue >= target.value ? { status: 'adequate', reason: `Entregue ${deliveredValue.toFixed(2)} atende ≥ ${target.value.toFixed(2)}.` } : { status: 'below', reason: `Entregue ${deliveredValue.toFixed(2)} abaixo de ≥ ${target.value.toFixed(2)}.` }
    if (target.operator === '<') return deliveredValue < target.value ? { status: 'adequate', reason: `Entregue ${deliveredValue.toFixed(2)} abaixo de ${target.value.toFixed(2)}.` } : { status: 'above', reason: `Entregue ${deliveredValue.toFixed(2)} não fica abaixo de ${target.value.toFixed(2)}.` }
    if (target.operator === '<=') return deliveredValue <= target.value ? { status: 'adequate', reason: `Entregue ${deliveredValue.toFixed(2)} atende ≤ ${target.value.toFixed(2)}.` } : { status: 'above', reason: `Entregue ${deliveredValue.toFixed(2)} acima de ≤ ${target.value.toFixed(2)}.` }
  }

  return { status: 'manual', reason: 'Comparação manual/assistida.' }
}

function getMetabolicExponent(species: Species) {
  return getEnergyRule(species).exponent
}

function getMealTimes(mealsPerDay: number): string[] {
  const presets: Record<number, string[]> = {
    2: ['08:00', '20:00'],
    3: ['08:00', '14:00', '20:00'],
    4: ['08:00', '12:00', '16:00', '20:00'],
    5: ['08:00', '11:00', '14:00', '17:00', '20:00'],
  }
  if (presets[mealsPerDay]) {
    return presets[mealsPerDay]
  }

  const interval = Math.max(2, Math.floor(12 / Math.max(1, mealsPerDay - 1)))
  return Array.from({ length: mealsPerDay }, (_, index) => {
    const hour = 8 + index * interval
    return `${String(hour % 24).padStart(2, '0')}:00`
  })
}

export interface DietComputationResult {
  normalizedEntries: DietFormulaEntry[]
  contributions: FoodContribution[]
  totalDryMatterGrams: number
  totalAsFedGrams: number
  totalKcal: number
  evaluation: DietEvaluation
  feedingPlan: FeedingPlan
}

export function computeDietPlan(options: {
  entries: DietFormulaEntry[]
  targetEnergy: number
  species: Species
  weightKg: number
  mealsPerDay: number
  patientName: string
  requirementProfileId?: string
  additionalRequirementProfileIds?: string[]
}): DietComputationResult {
  const normalizedEntries = normalizeEntries(options.entries)
  const foods = normalizedEntries
    .map((entry) => ({ entry, food: getFoodById(entry.foodId) }))
    .filter((item): item is { entry: DietFormulaEntry; food: FoodItem } => Boolean(item.food))

  const weightedEnergyDensity = foods.reduce((sum, item) => {
    const energy = item.food.nutrientsDryMatter.energyKcalPer100g
    if (energy == null) return sum
    return sum + (energy * item.entry.inclusionPct) / 100
  }, 0)

  const totalDryMatterGrams = weightedEnergyDensity > 0 ? (options.targetEnergy * 100) / weightedEnergyDensity : 0
  const contributions = foods.map(({ entry, food }) => {
    const gramsDryMatter = (totalDryMatterGrams * entry.inclusionPct) / 100
    const dryMatterPct = food.nutrientsAsFed.dryMatterPct ?? 0
    const gramsAsFed = dryMatterPct > 0 ? (gramsDryMatter * 100) / dryMatterPct : 0
    const energyAsFed = food.nutrientsAsFed.energyKcalPer100g ?? 0

    return {
      foodId: food.id,
      foodName: food.name,
      inclusionPct: round(entry.inclusionPct, 2) ?? 0,
      gramsDryMatter: round(gramsDryMatter, 2) ?? 0,
      gramsAsFed: round(gramsAsFed, 2) ?? 0,
      deliveredKcal: round((gramsAsFed * energyAsFed) / 100, 2) ?? 0,
    }
  })

  const totalAsFedGrams = contributions.reduce((sum, item) => sum + item.gramsAsFed, 0)
  const totalKcal = contributions.reduce((sum, item) => sum + item.deliveredKcal, 0)

  const nutrientKeys = Array.from(
    new Set(
      foods.flatMap(({ food }) => [
        ...Object.keys(food.nutrientsAsFed),
        ...Object.keys(food.nutrientsDryMatter),
      ]),
    ),
  )

  const deliveredTotals = makeEmptyMap(nutrientKeys)
  const deliveredOnDryMatterBasis = makeEmptyMap(nutrientKeys)
  const deliveredPer1000Kcal = makeEmptyMap(nutrientKeys)
  const deliveredPer100Kcal = makeEmptyMap(nutrientKeys)
  const deliveredPerMetabolicBw = makeEmptyMap(nutrientKeys)
  const deliveredPerKgBw = makeEmptyMap(nutrientKeys)
  const missingDataFlags = new Set<string>()
  const percentKeys = getPercentKeys()

  for (const key of nutrientKeys) {
    let totalAmount = 0
    let hasValue = false

    for (const contribution of contributions) {
      const food = getFoodById(contribution.foodId)
      if (!food) continue
      const asFedValue = food.nutrientsAsFed[key]
      if (asFedValue == null) {
        if (contribution.gramsAsFed > 0 && REQUIRED_NUTRIENT_KEYS.has(key)) {
          missingDataFlags.add(key)
        }
        continue
      }

      hasValue = true
      totalAmount += (asFedValue * contribution.gramsAsFed) / 100
    }

    if (!hasValue) {
      deliveredTotals[key] = null
      continue
    }

    deliveredTotals[key] = round(totalAmount, 6)

    if (totalDryMatterGrams > 0) {
      deliveredOnDryMatterBasis[key] = round((totalAmount * 100) / totalDryMatterGrams, 6)
    }
    if (totalKcal > 0) {
      deliveredPer1000Kcal[key] = round((totalAmount * 1000) / totalKcal, 6)
      deliveredPer100Kcal[key] = round((totalAmount * 100) / totalKcal, 6)
    }
    if (options.weightKg > 0) {
      deliveredPerKgBw[key] = round(totalAmount / options.weightKg, 6)
      deliveredPerMetabolicBw[key] = round(totalAmount / options.weightKg ** getMetabolicExponent(options.species), 6)
    }

    if (REQUIRED_NUTRIENT_KEYS.has(key) && percentKeys.has(key) && totalDryMatterGrams <= 0) {
      missingDataFlags.add(key)
    }
  }

  const proteinGrams = deliveredTotals.crudeProteinPct ?? 0
  const fatGrams = deliveredTotals.etherExtractPct ?? 0
  const carbGrams = deliveredTotals.nitrogenFreeExtractPct ?? 0
  const proteinKcal = proteinGrams * 4
  const fatKcal = fatGrams * 9
  const carbKcal = carbGrams * 4
  const macroTotalKcal = proteinKcal + fatKcal + carbKcal

  const macroSplit: MacroSlice[] = [
    { key: 'protein', label: 'Proteína', grams: round(proteinGrams, 2) ?? 0, kcal: round(proteinKcal, 2) ?? 0, percent: macroTotalKcal ? round((proteinKcal / macroTotalKcal) * 100, 2) ?? 0 : 0, color: MACRO_COLORS.protein },
    { key: 'fat', label: 'Gordura', grams: round(fatGrams, 2) ?? 0, kcal: round(fatKcal, 2) ?? 0, percent: macroTotalKcal ? round((fatKcal / macroTotalKcal) * 100, 2) ?? 0 : 0, color: MACRO_COLORS.fat },
    { key: 'carb', label: 'Carboidrato', grams: round(carbGrams, 2) ?? 0, kcal: round(carbKcal, 2) ?? 0, percent: macroTotalKcal ? round((carbKcal / macroTotalKcal) * 100, 2) ?? 0 : 0, color: MACRO_COLORS.carb },
  ]

  const appliedProfiles = [options.requirementProfileId, ...(options.additionalRequirementProfileIds ?? [])]
    .filter((id, index, ids): id is string => Boolean(id) && ids.indexOf(id) === index)
    .map((id) => getRequirementById(id))
    .filter((profile): profile is RequirementProfile => Boolean(profile))

  const adequacy = appliedProfiles.flatMap((profile) =>
    evaluateDiet(profile, {
      deliveredTotals,
      deliveredOnDryMatterBasis,
      deliveredPer1000Kcal,
      deliveredPer100Kcal,
      deliveredPerMetabolicBw,
      deliveredPerKgBw,
      macroSplit,
      missingDataFlags,
    }),
  )

  const alerts: string[] = []
  if (!normalizedEntries.length) {
    alerts.push('Nenhum alimento foi selecionado.')
  }
  if (!appliedProfiles.length) {
    alerts.push('Nenhum perfil de exigência foi selecionado; a adequação clínica não foi calculada.')
  }
  const requiredMissingCount = Array.from(missingDataFlags).filter((k) => REQUIRED_NUTRIENT_KEYS.has(k)).length
  if (requiredMissingCount > 0) {
    alerts.push(`Há ${requiredMissingCount} nutriente(s) obrigatório(s) com dados incompletos nos alimentos selecionados.`)
  }
  if (Math.abs(totalKcal - options.targetEnergy) > 2) {
    alerts.push(`Energia entregue (${totalKcal.toFixed(1)} kcal) difere do alvo (${options.targetEnergy.toFixed(1)} kcal).`)
  }

  const meals = buildMeals(totalAsFedGrams, options.mealsPerDay)
  const feedingPlan: FeedingPlan = {
    patientName: options.patientName || 'Paciente',
    mealsPerDay: options.mealsPerDay,
    totalAsFedGrams: round(totalAsFedGrams, 2) ?? 0,
    totalDryMatterGrams: round(totalDryMatterGrams, 2) ?? 0,
    mode: 'automatic',
    instructions: [
      `Fracionar a dieta em ${options.mealsPerDay} refeições por dia.`,
      `Usar ${round(totalAsFedGrams, 0) ?? 0} g/dia em matéria natural.`,
      `A formulação foi balanceada em base de matéria seca antes da conversão para gramas ofertadas.`,
    ],
    meals,
  }

  return {
    normalizedEntries,
    contributions,
    totalDryMatterGrams: round(totalDryMatterGrams, 4) ?? 0,
    totalAsFedGrams: round(totalAsFedGrams, 4) ?? 0,
    totalKcal: round(totalKcal, 4) ?? 0,
    evaluation: {
      totalDelivered: deliveredTotals,
      deliveredAsPercentDm: deliveredOnDryMatterBasis,
      deliveredPer1000Kcal,
      deliveredPer100Kcal,
      deliveredPerMetabolicBw,
      deliveredPerKgBw,
      macroSplit,
      adequacy,
      appliedRequirementIds: appliedProfiles.map((profile) => profile.id),
      missingDataFlags: Array.from(missingDataFlags),
      alerts,
    },
    feedingPlan,
  }
}

function buildMeals(totalAsFedGrams: number, mealsPerDay: number): FeedingPlanMeal[] {
  const mealTimes = getMealTimes(mealsPerDay)
  const perMeal = mealsPerDay > 0 ? totalAsFedGrams / mealsPerDay : 0
  return mealTimes.map((time, index) => ({
    label: `${index + 1}ª refeição`,
    time,
    gramsAsFed: round(perMeal, 2) ?? 0,
  }))
}

function evaluateDiet(
  profile: RequirementProfile,
  values: {
    deliveredTotals: NutrientAmountMap
    deliveredOnDryMatterBasis: NutrientAmountMap
    deliveredPer1000Kcal: NutrientAmountMap
    deliveredPer100Kcal: NutrientAmountMap
    deliveredPerMetabolicBw: NutrientAmountMap
    deliveredPerKgBw: NutrientAmountMap
    macroSplit: MacroSlice[]
    missingDataFlags: Set<string>
  },
): EvaluatedNutrient[] {
  return Object.entries(profile.nutrientTargets)
    .filter(([, target]) => target.kind !== 'empty')
    .map(([key, target]) => {
      const label = getNutrientDefinition(key)?.label ?? key
      const unit = getNutrientDefinition(key)?.unit

      const deliveredValue =
        profile.basisType === 'percent_dm'
          ? values.deliveredOnDryMatterBasis[key]
          : profile.basisType === 'per_1000kcal'
          ? values.deliveredPer1000Kcal[key]
          : profile.basisType === 'per_100kcal'
          ? values.deliveredPer100Kcal[key]
          : profile.basisType === 'per_metabolic_bw'
          ? values.deliveredPerMetabolicBw[key]
          : profile.basisType === 'per_kg_bw'
          ? values.deliveredPerKgBw[key]
          : profile.basisType === 'energy_percent'
          ? getMacroPercent(key, values.macroSplit)
          : null

      const isRequiredNutrient = REQUIRED_NUTRIENT_KEYS.has(key)
      const missingData = isRequiredNutrient && (values.missingDataFlags.has(key) || deliveredValue == null)

      if (target.kind === 'date_like' || target.kind === 'text' || target.kind === 'error') {
        return {
          key,
          label,
          unit,
          basisType: profile.basisType,
          profileId: profile.id,
          profileLabel: profile.label,
          deliveredValue,
          target,
          status: 'manual',
          reason: `Referência '${String(target.raw)}' exige interpretação clínica manual.`,
          missingData,
        }
      }

      if (deliveredValue == null && !isRequiredNutrient) {
        return {
          key,
          label,
          unit,
          basisType: profile.basisType,
          profileId: profile.id,
          profileLabel: profile.label,
          deliveredValue: null,
          target,
          status: 'manual',
          reason: 'Nutriente opcional sem dado cadastrado; nao gera alerta de ausencia.',
          missingData: false,
        }
      }

      if (deliveredValue == null) {
        return {
          key,
          label,
          unit,
          basisType: profile.basisType,
          profileId: profile.id,
          profileLabel: profile.label,
          deliveredValue: null,
          target,
          status: 'insufficient_data',
          reason: 'Dados insuficientes para calcular o nutriente nesta base.',
          missingData: true,
        }
      }

      const comparison = compareAgainstTarget(deliveredValue, target)
      return {
        key,
        label,
        unit,
        basisType: profile.basisType,
        profileId: profile.id,
        profileLabel: profile.label,
        deliveredValue,
        target,
        status: missingData ? 'insufficient_data' : comparison.status,
        reason: missingData ? 'Um ou mais alimentos não possuem esse nutriente; a comparação fica incompleta.' : comparison.reason,
        missingData,
      }
    })
}

function getMacroPercent(key: string, slices: MacroSlice[]): number | null {
  if (key === 'crudeProteinPct') {
    return slices.find((slice) => slice.key === 'protein')?.percent ?? null
  }
  if (key === 'etherExtractPct') {
    return slices.find((slice) => slice.key === 'fat')?.percent ?? null
  }
  if (key === 'nitrogenFreeExtractPct') {
    return slices.find((slice) => slice.key === 'carb')?.percent ?? null
  }
  return null
}
