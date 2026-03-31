export type Species = 'dog' | 'cat'
export type SpeciesScope = Species | 'both' | 'unknown'
export type Sex = 'male' | 'female'
export type BCS = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type FeedingRoute = 'oral' | 'tube' | 'parenteral' | 'undefined'

export interface Patient {
  id: string
  name: string
  ownerName: string
  species: Species
  sex: Sex
  ageMonths: number
  isNeutered: boolean
  breed?: string
  currentWeight: number
  bcs: BCS
  isHospitalized: boolean
  clinicalNotes?: string
  comorbidityIds?: string[]
  createdAt: string
  updatedAt: string
}

export interface PhysiologicState {
  id: string
  label: string
  species: Species
  category: string
  minFactor: number
  maxFactor: number
  defaultFactor: number
  explanation: string
  source: string
  clinicalObservation: string
  calculationMode?: 'factor' | 'kcal_per_metabolic_bw' | 'dog_growth' | 'dog_lactation' | 'cat_lactation'
  minKcalPerMetabolicBw?: number
  maxKcalPerMetabolicBw?: number
  defaultKcalPerMetabolicBw?: number
  defaultRequirementProfileId?: string
  requiresExpectedAdultWeightKg?: boolean
  requiresLitterSize?: boolean
  requiresLactationWeek?: boolean
  sourceReference?: {
    document?: string | null
    pages?: number[]
    tables?: string[]
    note?: string | null
  }
}

export interface EnergyCalculation {
  id?: string
  patientId?: string
  date?: string
  weightUsed?: number
  isIdealWeight?: boolean
  stateId?: string
  rer?: number
  merFactor?: number
  mer?: number
  notes?: string
  expectedAdultWeightKg?: number
  litterSize?: number
  lactationWeek?: number
  merFormula?: string[]
}

export type TargetGoal = 'maintenance' | 'weight_loss' | 'weight_gain'

export interface WeightTargetPlan {
  id?: string
  patientId?: string
  date?: string
  goal?: TargetGoal
  currentWeight?: number
  targetWeight?: number
  isCustomClinicalRule?: boolean
  isManualTarget?: boolean
  weightToUseForEnergy?: 'current' | 'target'
  targetEnergy?: number
}

export interface NutrientDefinition {
  key: string
  label: string
  unit?: string | null
}

export interface NutrientTargetValue {
  kind: 'empty' | 'number' | 'range' | 'comparator' | 'text' | 'date_like' | 'error' | 'number_with_text'
  raw: string | number | null
  value?: number
  min?: number
  max?: number
  operator?: '>' | '>=' | '<' | '<='
}

export type NutrientAmountMap = Record<string, number | null>
export type NutrientTargetMap = Record<string, NutrientTargetValue>

export interface FoodItem {
  id: string
  slug: string
  name: string
  category: string | null
  categoryNormalized: string | null
  sourceSheet: 'Alimentos MN'
  sourceReference: {
    workbook: string
    mnRow: number
    msRow: number | null
  }
  speciesScope: SpeciesScope
  foodType: 'commercial' | 'natural' | 'suplemento' | 'enteral' | 'unknown'
  presentation: string
  nutrientsAsFed: NutrientAmountMap
  nutrientsDryMatter: NutrientAmountMap
  missingNutrients: string[]
  notes: string[]
}

export interface RequirementProfile {
  id: string
  source: string | null
  label: string | null
  species: SpeciesScope
  lifeStage: string | null
  condition: string | null
  basisType: 'percent_dm' | 'per_1000kcal' | 'per_metabolic_bw' | 'per_kg_bw' | 'energy_percent' | 'per_100kcal' | 'range_text'
  nutrientTargets: NutrientTargetMap
  extras: Record<string, NutrientTargetValue | undefined>
  sourceReference: {
    sheet?: string
    row?: number
    document?: string
    page?: number
    pages?: number[]
    table?: string
  }
}

export interface EnergyRule {
  id: string
  species: Species
  sourceLabel: string
  exponent: number
  constant: number
  formulaLabel: string
  source: string
  sourceReference: {
    sheet: string
    row: number
  }
}

export interface DietFormulaEntry {
  foodId: string
  inclusionPct: number
}

export type DietType = 'commercial' | 'natural' | 'hybrid'

export interface DietPlan {
  id?: string
  patientId?: string
  date?: string
  dietType: DietType
  targetEnergy: number
  mealsPerDay: number
  requirementProfileId?: string
  additionalRequirementProfileIds?: string[]
  entries: DietFormulaEntry[]
  totalDryMatterGrams?: number
  totalAsFedGrams?: number
  gramsPerMeal?: number
  commercialFoodId?: string
  naturalIngredients?: { ingredientId: string; grams: number }[]
  commercialPercent?: number
  naturalPercent?: number
  gramsPerDay?: number
}

export interface DietNutrientBreakdown {
  proteinPercent: number
  fatPercent: number
  carbPercent: number
  totalKcal: number
  proteinGrams: number
  fatGrams: number
  carbGrams: number
  fiberGrams: number
  moistureGrams: number
  ashGrams: number
  calciumMg?: number
  phosphorusMg?: number
  sodiumMg?: number
  potassiumMg?: number
  magnesiumMg?: number
  taurineMg?: number
}

export interface MacroSlice {
  key: 'protein' | 'fat' | 'carb'
  label: string
  grams: number
  kcal: number
  percent: number
  color: string
}

export interface FoodContribution {
  foodId: string
  foodName: string
  inclusionPct: number
  gramsDryMatter: number
  gramsAsFed: number
  deliveredKcal: number
}

export interface EvaluatedNutrient {
  key: string
  label: string
  unit?: string | null
  basisType: RequirementProfile['basisType']
  profileId?: string
  profileLabel?: string | null
  deliveredValue: number | null
  target: NutrientTargetValue | null
  status: 'adequate' | 'below' | 'above' | 'insufficient_data' | 'manual'
  reason?: string
  missingData: boolean
}

export interface DietEvaluation {
  totalDelivered: NutrientAmountMap
  deliveredAsPercentDm: NutrientAmountMap
  deliveredPer1000Kcal: NutrientAmountMap
  deliveredPer100Kcal: NutrientAmountMap
  deliveredPerMetabolicBw: NutrientAmountMap
  deliveredPerKgBw: NutrientAmountMap
  macroSplit: MacroSlice[]
  adequacy: EvaluatedNutrient[]
  appliedRequirementIds?: string[]
  missingDataFlags: string[]
  alerts: string[]
}

export interface FeedingPlanMeal {
  label: string
  time: string
  gramsAsFed: number
}

export interface FeedingPlan {
  patientName: string
  mealsPerDay: number
  totalAsFedGrams: number
  totalDryMatterGrams: number
  instructions: string[]
  meals: FeedingPlanMeal[]
  mode: 'manual' | 'automatic'
}

export interface HospitalNutritionPlan {
  id?: string
  patientId?: string
  date?: string
  isAnorexic?: boolean
  daysAnorexic?: number
  isHyporexic?: boolean
  daysHyporexic?: number
  recentIntakePercent?: number
  hasVomiting?: boolean
  hasDiarrhea?: boolean
  feedingRoute?: FeedingRoute
  electrolytes?: {
    phosphorus?: number
    potassium?: number
    magnesium?: number
    calcium?: number
    glucose?: number
  }
  refeedingRiskLevel?: 'low' | 'moderate' | 'high'
  progressionProtocol?: '3_days' | '4_days'
  progressionPlan?: RefeedingPlan[]
  clinicalNotes?: string
}

export interface RefeedingPlan {
  day: number
  percentRER: number
  kcalTarget: number
}

export interface StoredCalculationReport {
  id: string
  createdAt: string
  patient: Partial<Patient>
  energy: Partial<EnergyCalculation>
  target: Partial<WeightTargetPlan>
  diet: DietPlan
  formula: {
    contributions: FoodContribution[]
    evaluation: DietEvaluation
    feedingPlan: FeedingPlan
  }
}

export interface Report {
  id: string
  patientId: string
  date: string
  patient: Patient
  energy: EnergyCalculation
  target: WeightTargetPlan
  diet: DietPlan
  hospital?: HospitalNutritionPlan
}

export interface WorkbookIssue {
  severity: 'info' | 'warning' | 'error'
  sheet: string
  message: string
  cell?: string
}

export interface GenutriDataset {
  meta: {
    generatedAt: string
    sourceWorkbook: string
    nutrientCatalog: NutrientDefinition[]
  }
  foods: FoodItem[]
  requirements: RequirementProfile[]
  energyRules: EnergyRule[]
  audit: {
    sheetSummary: Array<{
      title: string
      dimension: string
      formulaCells: number
      mergedRanges: number
      errorValues: number
    }>
    issues: WorkbookIssue[]
  }
}
