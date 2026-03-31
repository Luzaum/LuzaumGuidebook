import type {
  NutrientTargetValue,
  PhysiologicState,
  RequirementProfile,
  Species,
} from '../types'

function num(value: number, raw?: string | number): NutrientTargetValue {
  return { kind: 'number', raw: raw ?? value, value }
}

function max(value: number, raw?: string | number): NutrientTargetValue {
  return { kind: 'comparator', raw: raw ?? `<= ${value}`, operator: '<=', value }
}

function range(minValue: number, maxValue: number, raw?: string): NutrientTargetValue {
  return { kind: 'range', raw: raw ?? `${minValue}-${maxValue}`, min: minValue, max: maxValue }
}

type ProfileBasis = RequirementProfile['basisType']

function buildProfile(options: {
  id: string
  label: string
  species: Species
  lifeStage: string
  condition: string
  basisType: ProfileBasis
  page: number
  table: string
  nutrientTargets: RequirementProfile['nutrientTargets']
}): RequirementProfile {
  return {
    id: options.id,
    source: 'FEDIAF 2025',
    label: options.label,
    species: options.species,
    lifeStage: options.lifeStage,
    condition: options.condition,
    basisType: options.basisType,
    nutrientTargets: options.nutrientTargets,
    extras: {},
    sourceReference: {
      document: 'FEDIAF Nutritional Guidelines 2025',
      page: options.page,
      pages: [options.page],
      table: options.table,
    },
  }
}

const DOG_ADULT_110_DM = {
  crudeProteinPct: num(18),
  argininePct: num(0.52),
  histidinePct: num(0.23),
  isoleucinePct: num(0.46),
  leucinePct: num(0.82),
  lysinePct: num(0.42),
  methioninePct: num(0.4),
  methionineCystinePct: num(0.76),
  phenylalaninePct: num(0.54),
  phenylalanineTyrosinePct: num(0.89),
  threoninePct: num(0.52),
  tryptophanPct: num(0.17),
  valinePct: num(0.59),
  etherExtractPct: num(5.5),
  omega6Pct: num(1.32),
  calciumPct: range(0.5, 2.5, '0.50-2.50'),
  phosphorusPct: range(0.4, 1.6, '0.40-1.60'),
  potassiumPct: num(0.5),
  sodiumPct: num(0.1),
  chloridePct: num(0.15),
  magnesiumPct: num(0.07),
  zincMgPerKg: num(7.2),
  vitaminAIu: num(606),
  vitaminDIu: num(55.2),
  vitaminEIu: num(3.6),
}

const DOG_ADULT_110_1000KCAL = {
  crudeProteinPct: num(45),
  argininePct: num(1.3),
  histidinePct: num(0.58),
  isoleucinePct: num(1.15),
  leucinePct: num(2.05),
  lysinePct: num(1.05),
  methioninePct: num(1),
  methionineCystinePct: num(1.91),
  phenylalaninePct: num(1.35),
  phenylalanineTyrosinePct: num(2.23),
  threoninePct: num(1.3),
  tryptophanPct: num(0.43),
  valinePct: num(1.48),
  etherExtractPct: num(13.75),
  omega6Pct: num(3.27),
  calciumPct: range(1.25, 6.25, '1.25-6.25'),
  phosphorusPct: range(1, 4, '1.00-4.00'),
  potassiumPct: num(1.25),
  sodiumPct: num(0.25),
  chloridePct: num(0.38),
  magnesiumPct: num(0.18),
  zincMgPerKg: num(18),
  vitaminAIu: num(1515),
  vitaminDIu: num(138),
  vitaminEIu: num(9),
}

const DOG_ADULT_95_DM = {
  crudeProteinPct: num(21),
  argininePct: num(0.6),
  histidinePct: num(0.27),
  isoleucinePct: num(0.53),
  leucinePct: num(0.95),
  lysinePct: num(0.46),
  methioninePct: num(0.46),
  methionineCystinePct: num(0.88),
  phenylalaninePct: num(0.63),
  phenylalanineTyrosinePct: num(1.03),
  threoninePct: num(0.6),
  tryptophanPct: num(0.2),
  valinePct: num(0.68),
  etherExtractPct: num(5.5),
  omega6Pct: num(1.53),
  calciumPct: range(0.58, 2.5, '0.58-2.50'),
  phosphorusPct: range(0.46, 1.6, '0.46-1.60'),
  potassiumPct: num(0.58),
  sodiumPct: num(0.12),
  chloridePct: num(0.17),
  magnesiumPct: num(0.08),
  zincMgPerKg: num(8.34),
  vitaminAIu: num(702),
  vitaminDIu: num(63.9),
  vitaminEIu: num(4.17),
}

const DOG_ADULT_95_1000KCAL = {
  crudeProteinPct: num(52.1),
  argininePct: num(1.51),
  histidinePct: num(0.67),
  isoleucinePct: num(1.33),
  leucinePct: num(2.37),
  lysinePct: num(1.22),
  methioninePct: num(1.16),
  methionineCystinePct: num(2.21),
  phenylalaninePct: num(1.56),
  phenylalanineTyrosinePct: num(2.58),
  threoninePct: num(1.51),
  tryptophanPct: num(0.49),
  valinePct: num(1.71),
  etherExtractPct: num(13.75),
  omega6Pct: num(3.82),
  calciumPct: range(1.45, 6.25, '1.45-6.25'),
  phosphorusPct: range(1.16, 4, '1.16-4.00'),
  potassiumPct: num(1.45),
  sodiumPct: num(0.29),
  chloridePct: num(0.43),
  magnesiumPct: num(0.2),
  zincMgPerKg: num(20.8),
  vitaminAIu: num(1754),
  vitaminDIu: num(159),
  vitaminEIu: num(10.4),
}

const DOG_EARLY_GROWTH_DM = {
  crudeProteinPct: num(25),
  argininePct: num(0.82),
  histidinePct: num(0.39),
  isoleucinePct: num(0.65),
  leucinePct: num(1.29),
  lysinePct: range(0.88, 2.8, '0.88-2.80'),
  methioninePct: num(0.35),
  methionineCystinePct: num(0.7),
  phenylalaninePct: num(0.65),
  phenylalanineTyrosinePct: num(1.3),
  threoninePct: num(0.81),
  tryptophanPct: num(0.23),
  valinePct: num(0.68),
  etherExtractPct: num(8.5),
  omega6Pct: range(1.3, 6.5, '1.30-6.50'),
  epaDhaPct: num(0.05),
  calciumPct: range(1, 1.6, '1.00-1.60'),
  phosphorusPct: num(0.9),
  potassiumPct: num(0.44),
  sodiumPct: num(0.22),
  chloridePct: num(0.33),
  magnesiumPct: num(0.04),
  zincMgPerKg: num(10),
  vitaminDIu: range(55.2, 320, '55.20-320.00'),
  vitaminEIu: num(5),
}

const DOG_EARLY_GROWTH_1000KCAL = {
  crudeProteinPct: num(62.5),
  argininePct: num(2.04),
  histidinePct: num(0.98),
  isoleucinePct: num(1.63),
  leucinePct: num(3.23),
  lysinePct: range(2.2, 7, '2.20-7.00'),
  methioninePct: num(0.88),
  methionineCystinePct: num(1.75),
  phenylalaninePct: num(1.63),
  phenylalanineTyrosinePct: num(3.25),
  threoninePct: num(2.03),
  tryptophanPct: num(0.58),
  valinePct: num(1.7),
  etherExtractPct: num(21.25),
  omega6Pct: range(3.25, 16.25, '3.25-16.25'),
  epaDhaPct: num(0.13),
  calciumPct: range(2.5, 4, '2.50-4.00'),
  phosphorusPct: num(2.25),
  potassiumPct: num(1.1),
  sodiumPct: num(0.55),
  chloridePct: num(0.83),
  magnesiumPct: num(0.1),
  zincMgPerKg: num(25),
  vitaminDIu: range(138, 800, '138.00-800.00'),
  vitaminEIu: num(12.5),
}

const DOG_LATE_GROWTH_DM = {
  crudeProteinPct: num(20),
  argininePct: num(0.74),
  histidinePct: num(0.25),
  isoleucinePct: num(0.5),
  leucinePct: num(0.8),
  lysinePct: range(0.7, 2.8, '0.70-2.80'),
  methioninePct: num(0.26),
  methionineCystinePct: num(0.53),
  phenylalaninePct: num(0.5),
  phenylalanineTyrosinePct: num(1),
  threoninePct: num(0.64),
  tryptophanPct: num(0.21),
  valinePct: num(0.56),
  etherExtractPct: num(8.5),
  omega6Pct: num(1.3),
  epaDhaPct: num(0.05),
  calciumPct: range(0.8, 1.8, '0.80-1.80'),
  phosphorusPct: num(0.7),
  potassiumPct: num(0.44),
  sodiumPct: num(0.22),
  chloridePct: num(0.33),
  magnesiumPct: num(0.04),
}

const DOG_LATE_GROWTH_1000KCAL = {
  crudeProteinPct: num(50),
  argininePct: num(1.84),
  histidinePct: num(0.63),
  isoleucinePct: num(1.25),
  leucinePct: num(2),
  lysinePct: range(1.75, 7, '1.75-7.00'),
  methioninePct: num(0.65),
  methionineCystinePct: num(1.33),
  phenylalaninePct: num(1.25),
  phenylalanineTyrosinePct: num(2.5),
  threoninePct: num(1.6),
  tryptophanPct: num(0.53),
  valinePct: num(1.4),
  etherExtractPct: num(21.25),
  omega6Pct: num(3.25),
  epaDhaPct: num(0.13),
  calciumPct: range(2, 4.5, '2.00-4.50'),
  phosphorusPct: num(1.75),
  potassiumPct: num(1.1),
  sodiumPct: num(0.55),
  chloridePct: num(0.83),
  magnesiumPct: num(0.1),
}

const CAT_ADULT_100_DM = {
  crudeProteinPct: num(25),
  argininePct: num(1),
  histidinePct: num(0.26),
  isoleucinePct: num(0.43),
  leucinePct: num(1.02),
  lysinePct: num(0.34),
  methioninePct: num(0.17),
  methionineCystinePct: num(0.34),
  phenylalaninePct: num(0.4),
  phenylalanineTyrosinePct: num(1.53),
  threoninePct: num(0.52),
  tryptophanPct: num(0.13),
  valinePct: num(0.51),
  taurinePct: num(0.2, 'canned 0.20'),
  etherExtractPct: num(9),
  omega6Pct: num(0.5),
  calciumPct: num(0.4),
  phosphorusPct: num(0.26),
  potassiumPct: num(0.6),
  sodiumPct: num(0.08),
  chloridePct: num(0.11),
  magnesiumPct: num(0.04),
  zincMgPerKg: num(7.5),
  vitaminAIu: num(333),
  vitaminDIu: range(25, 3000, '25.00-3000.00'),
  vitaminEIu: num(3.8),
}

const CAT_ADULT_100_1000KCAL = {
  crudeProteinPct: num(62.5),
  argininePct: num(2.5),
  histidinePct: num(0.65),
  isoleucinePct: num(1.08),
  leucinePct: num(2.55),
  lysinePct: num(0.85),
  methioninePct: num(0.43),
  methionineCystinePct: num(0.85),
  phenylalaninePct: num(1),
  phenylalanineTyrosinePct: num(3.83),
  threoninePct: num(1.3),
  tryptophanPct: num(0.33),
  valinePct: num(1.28),
  taurinePct: num(0.5, 'canned 0.50'),
  etherExtractPct: num(22.5),
  omega6Pct: num(1.25),
  calciumPct: num(1),
  phosphorusPct: num(0.64),
  potassiumPct: num(1.5),
  sodiumPct: num(0.19),
  chloridePct: num(0.29),
  magnesiumPct: num(0.1),
  zincMgPerKg: num(18.8),
  vitaminAIu: range(833, 100000, '833.00-100000.00'),
  vitaminDIu: range(62.5, 7500, '62.50-7500.00'),
  vitaminEIu: num(9.5),
}

const CAT_ADULT_75_DM = {
  crudeProteinPct: num(33.3),
  argininePct: num(1.3),
  histidinePct: num(0.35),
  isoleucinePct: num(0.57),
  leucinePct: num(1.36),
  lysinePct: num(0.45),
  methioninePct: num(0.23),
  methionineCystinePct: num(0.45),
  phenylalaninePct: num(0.53),
  phenylalanineTyrosinePct: num(2.04),
  threoninePct: num(0.69),
  tryptophanPct: num(0.17),
  valinePct: num(0.68),
  taurinePct: num(0.27, 'canned 0.27'),
  etherExtractPct: num(9),
  omega6Pct: num(0.67),
  calciumPct: num(0.53),
  phosphorusPct: num(0.35),
  potassiumPct: num(0.8),
  sodiumPct: num(0.1),
  chloridePct: num(0.15),
  magnesiumPct: num(0.05),
  zincMgPerKg: num(10),
  vitaminAIu: num(444),
  vitaminDIu: range(33.3, 3000, '33.30-3000.00'),
  vitaminEIu: num(5.07),
}

const CAT_ADULT_75_1000KCAL = {
  crudeProteinPct: num(83.3),
  argininePct: num(3.3),
  histidinePct: num(0.87),
  isoleucinePct: num(1.44),
  leucinePct: num(3.4),
  lysinePct: num(1.13),
  methioninePct: num(0.57),
  methionineCystinePct: num(1.13),
  phenylalaninePct: num(1.33),
  phenylalanineTyrosinePct: num(5.11),
  threoninePct: num(1.73),
  tryptophanPct: num(0.44),
  valinePct: num(1.7),
  taurinePct: num(0.67, 'canned 0.67'),
  etherExtractPct: num(22.5),
  omega6Pct: num(1.67),
  calciumPct: num(1.33),
  phosphorusPct: num(0.85),
  potassiumPct: num(2),
  sodiumPct: num(0.25),
  chloridePct: num(0.39),
  magnesiumPct: num(0.13),
  zincMgPerKg: num(25),
  vitaminAIu: range(1110, 100000, '1110.00-100000.00'),
  vitaminDIu: range(83.3, 7500, '83.30-7500.00'),
  vitaminEIu: num(12.7),
}

const CAT_GROWTH_DM = {
  crudeProteinPct: num(28, 'growth 28.00'),
  argininePct: range(1.07, 3.5, '1.07-3.50'),
  histidinePct: num(0.33),
  isoleucinePct: num(0.54),
  leucinePct: num(1.28),
  lysinePct: num(0.85),
  methioninePct: range(0.44, 1.3, '0.44-1.30'),
  methionineCystinePct: num(0.88),
  phenylalaninePct: num(0.5),
  phenylalanineTyrosinePct: num(1.91),
  threoninePct: num(0.65),
  tryptophanPct: range(0.16, 1.7, '0.16-1.70'),
  valinePct: num(0.64),
  taurinePct: num(0.25, 'canned 0.25'),
  etherExtractPct: num(9),
  omega6Pct: num(0.55),
  calciumPct: num(1),
  phosphorusPct: num(0.84),
  potassiumPct: num(0.6),
  sodiumPct: num(0.16),
  chloridePct: num(0.24),
  magnesiumPct: num(0.05),
  zincMgPerKg: num(7.5),
  vitaminDIu: range(28, 3000, '28.00-3000.00'),
  vitaminEIu: num(3.8),
}

const CAT_GROWTH_1000KCAL = {
  crudeProteinPct: num(70, 'growth 70.00'),
  argininePct: range(2.78, 8.75, '2.78-8.75'),
  histidinePct: num(0.83),
  isoleucinePct: num(1.35),
  leucinePct: num(3.2),
  lysinePct: num(2.13),
  methioninePct: range(1.1, 3.25, '1.10-3.25'),
  methionineCystinePct: num(2.2),
  phenylalaninePct: num(1.25),
  phenylalanineTyrosinePct: num(4.78),
  threoninePct: num(1.63),
  tryptophanPct: range(0.4, 4.25, '0.40-4.25'),
  valinePct: num(1.6),
  taurinePct: num(0.63, 'canned 0.63'),
  etherExtractPct: num(22.5),
  omega6Pct: num(1.38),
  calciumPct: num(2.5),
  phosphorusPct: num(2.1),
  potassiumPct: num(1.5),
  sodiumPct: num(0.4),
  chloridePct: num(0.6),
  magnesiumPct: num(0.13),
  zincMgPerKg: num(18.8),
  vitaminDIu: range(70, 7500, '70.00-7500.00'),
  vitaminEIu: num(9.5),
}

const DOG_ADULT_METABOLIC = {
  crudeProteinPct: num(4.95),
  argininePct: num(0.14),
  histidinePct: num(0.06),
  isoleucinePct: num(0.13),
  leucinePct: num(0.23),
  lysinePct: num(0.12),
  methioninePct: num(0.11),
  methionineCystinePct: num(0.21),
  phenylalaninePct: num(0.15),
  phenylalanineTyrosinePct: num(0.24),
  threoninePct: num(0.14),
  tryptophanPct: num(0.05),
  valinePct: num(0.16),
  etherExtractPct: num(1.51),
  omega6Pct: num(0.36),
  calciumPct: num(0.14),
  phosphorusPct: num(0.11),
  potassiumPct: num(0.14),
  sodiumPct: num(0.03),
  chloridePct: num(0.04),
  magnesiumPct: num(0.02),
  zincMgPerKg: num(2),
  vitaminAIu: num(167),
  vitaminDIu: num(15.2),
  vitaminEIu: num(1),
}

const CAT_ADULT_METABOLIC = {
  crudeProteinPct: num(6.25),
  argininePct: num(0.25),
  histidinePct: num(0.08),
  isoleucinePct: num(0.12),
  leucinePct: num(0.29),
  lysinePct: num(0.09),
  methioninePct: num(0.04),
  methionineCystinePct: num(0.09),
  phenylalaninePct: num(0.12),
  phenylalanineTyrosinePct: num(0.44),
  threoninePct: num(0.15),
  tryptophanPct: num(0.04),
  valinePct: num(0.15),
  taurinePct: num(0.05, 'canned 0.05'),
  etherExtractPct: num(2.25),
  omega6Pct: num(0.13),
  calciumPct: num(0.1),
  phosphorusPct: num(0.06),
  potassiumPct: num(0.15),
  sodiumPct: num(0.02),
  chloridePct: num(0.03),
  magnesiumPct: num(0.01),
  zincMgPerKg: num(1.88),
  vitaminAIu: num(83.25),
  vitaminDIu: num(6.25),
  vitaminEIu: num(0.95),
}

export const FEDIAF_REQUIREMENT_PROFILES: RequirementProfile[] = [
  buildProfile({ id: 'fediaf-dog-early-growth-1000kcal', label: 'FEDIAF Cao - crescimento precoce/reproducao - por 1000 kcal', species: 'dog', lifeStage: 'early_growth_reproduction', condition: 'fediaf_principal', basisType: 'per_1000kcal', page: 73, table: 'VII-17a', nutrientTargets: DOG_EARLY_GROWTH_1000KCAL }),
  buildProfile({ id: 'fediaf-dog-early-growth-dm', label: 'FEDIAF Cao - crescimento precoce/reproducao - %MS', species: 'dog', lifeStage: 'early_growth_reproduction', condition: 'fediaf_principal', basisType: 'percent_dm', page: 73, table: 'VII-17a', nutrientTargets: DOG_EARLY_GROWTH_DM }),
  buildProfile({ id: 'fediaf-dog-late-growth-1000kcal', label: 'FEDIAF Cao - crescimento tardio - por 1000 kcal', species: 'dog', lifeStage: 'late_growth', condition: 'fediaf_principal', basisType: 'per_1000kcal', page: 74, table: 'VII-17b', nutrientTargets: DOG_LATE_GROWTH_1000KCAL }),
  buildProfile({ id: 'fediaf-dog-late-growth-dm', label: 'FEDIAF Cao - crescimento tardio - %MS', species: 'dog', lifeStage: 'late_growth', condition: 'fediaf_principal', basisType: 'percent_dm', page: 74, table: 'VII-17b', nutrientTargets: DOG_LATE_GROWTH_DM }),
  buildProfile({ id: 'fediaf-dog-adult-110-1000kcal', label: 'FEDIAF Cao adulto 110 kcal/kg^0.75 - por 1000 kcal', species: 'dog', lifeStage: 'adult_maintenance', condition: 'normal_activity', basisType: 'per_1000kcal', page: 75, table: 'VII-17c', nutrientTargets: DOG_ADULT_110_1000KCAL }),
  buildProfile({ id: 'fediaf-dog-adult-110-dm', label: 'FEDIAF Cao adulto 110 kcal/kg^0.75 - %MS', species: 'dog', lifeStage: 'adult_maintenance', condition: 'normal_activity', basisType: 'percent_dm', page: 75, table: 'VII-17c', nutrientTargets: DOG_ADULT_110_DM }),
  buildProfile({ id: 'fediaf-dog-adult-95-1000kcal', label: 'FEDIAF Cao adulto 95 kcal/kg^0.75 - por 1000 kcal', species: 'dog', lifeStage: 'adult_maintenance', condition: 'low_activity_or_obese_prone', basisType: 'per_1000kcal', page: 76, table: 'VII-17d', nutrientTargets: DOG_ADULT_95_1000KCAL }),
  buildProfile({ id: 'fediaf-dog-adult-95-dm', label: 'FEDIAF Cao adulto 95 kcal/kg^0.75 - %MS', species: 'dog', lifeStage: 'adult_maintenance', condition: 'low_activity_or_obese_prone', basisType: 'percent_dm', page: 76, table: 'VII-17d', nutrientTargets: DOG_ADULT_95_DM }),
  buildProfile({ id: 'fediaf-cat-growth-1000kcal', label: 'FEDIAF Gato crescimento/reproducao - por 1000 kcal', species: 'cat', lifeStage: 'growth_reproduction', condition: 'fediaf_principal', basisType: 'per_1000kcal', page: 77, table: 'VII-18a', nutrientTargets: CAT_GROWTH_1000KCAL }),
  buildProfile({ id: 'fediaf-cat-growth-dm', label: 'FEDIAF Gato crescimento/reproducao - %MS', species: 'cat', lifeStage: 'growth_reproduction', condition: 'fediaf_principal', basisType: 'percent_dm', page: 77, table: 'VII-18a', nutrientTargets: CAT_GROWTH_DM }),
  buildProfile({ id: 'fediaf-cat-adult-100-1000kcal', label: 'FEDIAF Gato adulto 100 kcal/kg^0.67 - por 1000 kcal', species: 'cat', lifeStage: 'adult_maintenance', condition: 'active', basisType: 'per_1000kcal', page: 78, table: 'VII-18b', nutrientTargets: CAT_ADULT_100_1000KCAL }),
  buildProfile({ id: 'fediaf-cat-adult-100-dm', label: 'FEDIAF Gato adulto 100 kcal/kg^0.67 - %MS', species: 'cat', lifeStage: 'adult_maintenance', condition: 'active', basisType: 'percent_dm', page: 78, table: 'VII-18b', nutrientTargets: CAT_ADULT_100_DM }),
  buildProfile({ id: 'fediaf-cat-adult-75-1000kcal', label: 'FEDIAF Gato adulto 75 kcal/kg^0.67 - por 1000 kcal', species: 'cat', lifeStage: 'adult_maintenance', condition: 'neutered_or_indoor', basisType: 'per_1000kcal', page: 79, table: 'VII-18c', nutrientTargets: CAT_ADULT_75_1000KCAL }),
  buildProfile({ id: 'fediaf-cat-adult-75-dm', label: 'FEDIAF Gato adulto 75 kcal/kg^0.67 - %MS', species: 'cat', lifeStage: 'adult_maintenance', condition: 'neutered_or_indoor', basisType: 'percent_dm', page: 79, table: 'VII-18c', nutrientTargets: CAT_ADULT_75_DM }),
  buildProfile({ id: 'fediaf-dog-adult-metabolic', label: 'FEDIAF Cao adulto manutencao - por peso metabolico', species: 'dog', lifeStage: 'adult_maintenance', condition: 'metabolic_reference', basisType: 'per_metabolic_bw', page: 58, table: 'VII-11', nutrientTargets: DOG_ADULT_METABOLIC }),
  buildProfile({ id: 'fediaf-cat-adult-metabolic', label: 'FEDIAF Gato adulto manutencao - por peso metabolico', species: 'cat', lifeStage: 'adult_maintenance', condition: 'metabolic_reference', basisType: 'per_metabolic_bw', page: 58, table: 'VII-11', nutrientTargets: CAT_ADULT_METABOLIC }),
]

export const FEDIAF_PHYSIOLOGIC_STATES: PhysiologicState[] = [
  { id: 'dog_young_adult_1_2', label: 'Jovem adulto 1-2 anos', species: 'dog', category: 'Adulto', minFactor: 130 / 90, maxFactor: 130 / 90, defaultFactor: 130 / 90, calculationMode: 'kcal_per_metabolic_bw', minKcalPerMetabolicBw: 125, maxKcalPerMetabolicBw: 140, defaultKcalPerMetabolicBw: 130, defaultRequirementProfileId: 'fediaf-dog-adult-110-1000kcal', explanation: 'Tabela VII-6: MER medio para caes de 1 a 2 anos.', source: 'FEDIAF 2025', clinicalObservation: 'Usar como ponto de partida e reajustar por condicao corporal.', sourceReference: { document: 'FEDIAF Nutritional Guidelines 2025', pages: [54], tables: ['VII-6'] } },
  { id: 'dog_adult_moderate', label: 'Adulto moderadamente ativo', species: 'dog', category: 'Adulto', minFactor: 110 / 90, maxFactor: 110 / 90, defaultFactor: 110 / 90, calculationMode: 'kcal_per_metabolic_bw', minKcalPerMetabolicBw: 110, maxKcalPerMetabolicBw: 110, defaultKcalPerMetabolicBw: 110, defaultRequirementProfileId: 'fediaf-dog-adult-110-1000kcal', explanation: 'Tabela VII-7: 110 kcal/kg^0.75 para atividade moderada de baixo impacto.', source: 'FEDIAF 2025', clinicalObservation: 'Referencia-base para adultos de manutencao com rotina comum.', sourceReference: { document: 'FEDIAF Nutritional Guidelines 2025', pages: [55], tables: ['VII-7'] } },
  { id: 'dog_adult_low_activity', label: 'Adulto baixa atividade / obeso-prone', species: 'dog', category: 'Adulto', minFactor: 90 / 90, maxFactor: 95 / 90, defaultFactor: 95 / 90, calculationMode: 'kcal_per_metabolic_bw', minKcalPerMetabolicBw: 90, maxKcalPerMetabolicBw: 95, defaultKcalPerMetabolicBw: 95, defaultRequirementProfileId: 'fediaf-dog-adult-95-1000kcal', explanation: 'Tabela VII-7: 95 kcal/kg^0.75 para baixa atividade; <=90 para obesidade.', source: 'FEDIAF 2025', clinicalObservation: 'Preferir esta base em pacientes sedentarios ou propensos a ganho de peso.', sourceReference: { document: 'FEDIAF Nutritional Guidelines 2025', pages: [55], tables: ['VII-7'] } },
  { id: 'dog_senior_gt_7', label: 'Senior > 7 anos', species: 'dog', category: 'Senior', minFactor: 80 / 90, maxFactor: 120 / 90, defaultFactor: 95 / 90, calculationMode: 'kcal_per_metabolic_bw', minKcalPerMetabolicBw: 80, maxKcalPerMetabolicBw: 120, defaultKcalPerMetabolicBw: 95, defaultRequirementProfileId: 'fediaf-dog-adult-95-1000kcal', explanation: 'Tabela VII-6: media de 95 kcal/kg^0.75 com faixa 80-120 em seniors.', source: 'FEDIAF 2025', clinicalObservation: 'Nao assumir reducao fixa; validar massa muscular e atividade real.', sourceReference: { document: 'FEDIAF Nutritional Guidelines 2025', pages: [54], tables: ['VII-6'] } },
  { id: 'dog_growth_0_12m', label: 'Crescimento 8 semanas a 12 meses', species: 'dog', category: 'Crescimento', minFactor: 0, maxFactor: 0, defaultFactor: 0, calculationMode: 'dog_growth', requiresExpectedAdultWeightKg: true, defaultRequirementProfileId: 'fediaf-dog-early-growth-1000kcal', explanation: 'Tabela VII-8b: usar a equacao de crescimento baseada em peso atual e peso adulto esperado.', source: 'FEDIAF 2025', clinicalObservation: 'Filhotes nao devem ser alimentados ad libitum; pesar com frequencia.', sourceReference: { document: 'FEDIAF Nutritional Guidelines 2025', pages: [56], tables: ['VII-8b'] } },
  { id: 'dog_gestation_first_4w', label: 'Gestacao primeiras 4 semanas', species: 'dog', category: 'Reproducao', minFactor: 132 / 90, maxFactor: 132 / 90, defaultFactor: 132 / 90, calculationMode: 'kcal_per_metabolic_bw', minKcalPerMetabolicBw: 132, maxKcalPerMetabolicBw: 132, defaultKcalPerMetabolicBw: 132, defaultRequirementProfileId: 'fediaf-dog-early-growth-1000kcal', explanation: 'Tabela VII-8b: 132 kcal x kg^0.75 nas 4 primeiras semanas.', source: 'FEDIAF 2025', clinicalObservation: 'A exigencia nutricional segue o perfil de reproducao/early growth.', sourceReference: { document: 'FEDIAF Nutritional Guidelines 2025', pages: [56], tables: ['VII-8b'] } },
  { id: 'dog_gestation_last_5w', label: 'Gestacao ultimas 5 semanas', species: 'dog', category: 'Reproducao', minFactor: 0, maxFactor: 0, defaultFactor: 0, calculationMode: 'factor', defaultRequirementProfileId: 'fediaf-dog-early-growth-1000kcal', explanation: 'Tabela VII-8b: 132 x kg^0.75 + 26 x kg nas ultimas 5 semanas.', source: 'FEDIAF 2025', clinicalObservation: 'Reavaliar oferta com ganho gestacional e apetite.', sourceReference: { document: 'FEDIAF Nutritional Guidelines 2025', pages: [56], tables: ['VII-8b'] } },
  { id: 'dog_lactation', label: 'Lactacao', species: 'dog', category: 'Reproducao', minFactor: 0, maxFactor: 0, defaultFactor: 0, calculationMode: 'dog_lactation', requiresLitterSize: true, requiresLactationWeek: true, defaultRequirementProfileId: 'fediaf-dog-early-growth-1000kcal', explanation: 'Tabela VII-8b: equacao varia por tamanho da ninhada e semana de lactacao.', source: 'FEDIAF 2025', clinicalObservation: 'Para algumas cadelas a necessidade real exige alimentacao ad libitum.', sourceReference: { document: 'FEDIAF Nutritional Guidelines 2025', pages: [56], tables: ['VII-8b'] } },
  { id: 'cat_adult_active', label: 'Adulto ativo', species: 'cat', category: 'Adulto', minFactor: 100 / 70, maxFactor: 100 / 70, defaultFactor: 100 / 70, calculationMode: 'kcal_per_metabolic_bw', minKcalPerMetabolicBw: 100, maxKcalPerMetabolicBw: 100, defaultKcalPerMetabolicBw: 100, defaultRequirementProfileId: 'fediaf-cat-adult-100-1000kcal', explanation: 'Tabela VII-9: 100 kcal/kg^0.67 para gatos ativos.', source: 'FEDIAF 2025', clinicalObservation: 'Base para gatos magros e ativos; indoor costuma pedir menos.', sourceReference: { document: 'FEDIAF Nutritional Guidelines 2025', pages: [57], tables: ['VII-9'] } },
  { id: 'cat_adult_neutered_indoor', label: 'Adulto castrado e/ou indoor', species: 'cat', category: 'Adulto', minFactor: 75 / 70, maxFactor: 75 / 70, defaultFactor: 75 / 70, calculationMode: 'kcal_per_metabolic_bw', minKcalPerMetabolicBw: 75, maxKcalPerMetabolicBw: 75, defaultKcalPerMetabolicBw: 75, defaultRequirementProfileId: 'fediaf-cat-adult-75-1000kcal', explanation: 'Tabela VII-9: 75 kcal/kg^0.67 para gatos castrados e/ou indoor.', source: 'FEDIAF 2025', clinicalObservation: 'Esta e a referencia padrao para risco de obesidade em gatos domiciliados.', sourceReference: { document: 'FEDIAF Nutritional Guidelines 2025', pages: [57], tables: ['VII-9'] } },
  { id: 'cat_growth_0_4m', label: 'Crescimento ate 4 meses', species: 'cat', category: 'Crescimento', minFactor: 2, maxFactor: 2.5, defaultFactor: 2.25, calculationMode: 'factor', defaultRequirementProfileId: 'fediaf-cat-growth-1000kcal', explanation: 'Tabela VII-10: 2.0 a 2.5 vezes o MER de manutencao.', source: 'FEDIAF 2025', clinicalObservation: 'Usar crescimento/reproducao como base de comparacao nutricional.', sourceReference: { document: 'FEDIAF Nutritional Guidelines 2025', pages: [57], tables: ['VII-10'] } },
  { id: 'cat_growth_4_9m', label: 'Crescimento 4 a 9 meses', species: 'cat', category: 'Crescimento', minFactor: 1.75, maxFactor: 2, defaultFactor: 1.875, calculationMode: 'factor', defaultRequirementProfileId: 'fediaf-cat-growth-1000kcal', explanation: 'Tabela VII-10: 1.75 a 2.0 vezes o MER de manutencao.', source: 'FEDIAF 2025', clinicalObservation: 'Ajustar conforme curva de crescimento e condicao corporal.', sourceReference: { document: 'FEDIAF Nutritional Guidelines 2025', pages: [57], tables: ['VII-10'] } },
  { id: 'cat_growth_9_12m', label: 'Crescimento 9 a 12 meses', species: 'cat', category: 'Crescimento', minFactor: 1.5, maxFactor: 1.5, defaultFactor: 1.5, calculationMode: 'factor', defaultRequirementProfileId: 'fediaf-cat-growth-1000kcal', explanation: 'Tabela VII-10: 1.5 vezes o MER de manutencao.', source: 'FEDIAF 2025', clinicalObservation: 'Ao final do crescimento, a demanda se aproxima da manutencao adulta.', sourceReference: { document: 'FEDIAF Nutritional Guidelines 2025', pages: [57], tables: ['VII-10'] } },
  { id: 'cat_gestation', label: 'Gestacao', species: 'cat', category: 'Reproducao', minFactor: 140 / 70, maxFactor: 140 / 70, defaultFactor: 140 / 70, calculationMode: 'kcal_per_metabolic_bw', minKcalPerMetabolicBw: 140, maxKcalPerMetabolicBw: 140, defaultKcalPerMetabolicBw: 140, defaultRequirementProfileId: 'fediaf-cat-growth-1000kcal', explanation: 'Tabela VII-10: 140 kcal x kg^0.67 durante a gestacao.', source: 'FEDIAF 2025', clinicalObservation: 'A comparacao nutricional segue o quadro de crescimento/reproducao.', sourceReference: { document: 'FEDIAF Nutritional Guidelines 2025', pages: [57], tables: ['VII-10'] } },
  { id: 'cat_lactation', label: 'Lactacao', species: 'cat', category: 'Reproducao', minFactor: 0, maxFactor: 0, defaultFactor: 0, calculationMode: 'cat_lactation', requiresLitterSize: true, requiresLactationWeek: true, defaultRequirementProfileId: 'fediaf-cat-growth-1000kcal', explanation: 'Tabela VII-10: formula varia por numero de filhotes e semana de lactacao.', source: 'FEDIAF 2025', clinicalObservation: 'Na lactacao, a checagem do consumo real e essencial para evitar perda excessiva de peso.', sourceReference: { document: 'FEDIAF Nutritional Guidelines 2025', pages: [57], tables: ['VII-10'] } },
]

export function getFediafPhysiologicStates(species: Species): PhysiologicState[] {
  return FEDIAF_PHYSIOLOGIC_STATES.filter((state) => state.species === species)
}

export function getFediafPhysiologicStateById(id: string): PhysiologicState | undefined {
  return FEDIAF_PHYSIOLOGIC_STATES.find((state) => state.id === id)
}

export function getDefaultFediafStateId(species: Species, isNeutered: boolean): string {
  if (species === 'dog') {
    return isNeutered ? 'dog_adult_low_activity' : 'dog_adult_moderate'
  }
  return isNeutered ? 'cat_adult_neutered_indoor' : 'cat_adult_active'
}

export function getDefaultRequirementProfileIdForState(species: Species, stateId?: string, isNeutered?: boolean): string {
  const state = stateId ? getFediafPhysiologicStateById(stateId) : undefined
  if (state?.defaultRequirementProfileId) {
    return state.defaultRequirementProfileId
  }
  return species === 'dog'
    ? isNeutered
      ? 'fediaf-dog-adult-95-1000kcal'
      : 'fediaf-dog-adult-110-1000kcal'
    : isNeutered
    ? 'fediaf-cat-adult-75-1000kcal'
    : 'fediaf-cat-adult-100-1000kcal'
}

export function getBasisLabel(basisType: RequirementProfile['basisType']): string {
  switch (basisType) {
    case 'percent_dm':
      return '%MS'
    case 'per_1000kcal':
      return 'por 1000 kcal'
    case 'per_100kcal':
      return 'por 100 kcal'
    case 'per_metabolic_bw':
      return 'por peso metabolico'
    case 'per_kg_bw':
      return 'por kg PV'
    case 'energy_percent':
      return '% energetico'
    default:
      return basisType
  }
}

function getMetabolicExponent(species: Species) {
  return species === 'dog' ? 0.75 : 0.67
}

function getDogLactationFactor(week: number) {
  if (week <= 1) return 0.75
  if (week === 2) return 0.95
  if (week === 3) return 1.1
  return 1.2
}

function getCatLactationFactor(week: number) {
  if (week <= 2) return 0.9
  if (week <= 4) return 1.2
  if (week === 5) return 1.1
  if (week === 6) return 1
  return 0.8
}

export function computeFediafEnergy(options: {
  species: Species
  stateId: string
  weightKg: number
  expectedAdultWeightKg?: number
  litterSize?: number
  lactationWeek?: number
}): {
  rer: number
  mer: number
  factor: number | null
  formulaLines: string[]
  state?: PhysiologicState
} {
  const state = getFediafPhysiologicStateById(options.stateId)
  const exponent = getMetabolicExponent(options.species)
  const safeWeight = Math.max(options.weightKg, 0)
  const metabolicWeight = safeWeight ** exponent
  const rerBase = (options.species === 'dog' ? 90 : 70) * metabolicWeight

  if (!state) {
    return { rer: rerBase, mer: rerBase, factor: 1, formulaLines: [`RER = ${(options.species === 'dog' ? 90 : 70)} x peso^${exponent}`] }
  }

  if (state.calculationMode === 'kcal_per_metabolic_bw') {
    const kcalPerMetabolic = state.defaultKcalPerMetabolicBw ?? 0
    const mer = kcalPerMetabolic * metabolicWeight
    return { rer: rerBase, mer, factor: rerBase > 0 ? mer / rerBase : null, state, formulaLines: [`MER = ${kcalPerMetabolic.toFixed(2)} x peso^${exponent}`, `MER = ${kcalPerMetabolic.toFixed(2)} x ${metabolicWeight.toFixed(3)}`] }
  }

  if (state.calculationMode === 'dog_growth') {
    const expectedAdultWeightKg = Math.max(options.expectedAdultWeightKg ?? 0, safeWeight)
    const ratio = expectedAdultWeightKg > 0 ? safeWeight / expectedAdultWeightKg : 0
    const coeff = 254.1 - 135 * ratio
    const mer = coeff * metabolicWeight
    return { rer: rerBase, mer, factor: rerBase > 0 ? mer / rerBase : null, state, formulaLines: ['MER = [254.1 - 135 x (peso atual / peso adulto esperado)] x peso^0.75', `MER = [254.1 - 135 x (${safeWeight.toFixed(2)} / ${expectedAdultWeightKg.toFixed(2)})] x ${metabolicWeight.toFixed(3)}`] }
  }

  if (state.id === 'dog_gestation_last_5w') {
    const mer = 132 * metabolicWeight + 26 * safeWeight
    return { rer: rerBase, mer, factor: rerBase > 0 ? mer / rerBase : null, state, formulaLines: ['MER = 132 x peso^0.75 + 26 x peso', `MER = 132 x ${metabolicWeight.toFixed(3)} + 26 x ${safeWeight.toFixed(2)}`] }
  }

  if (state.calculationMode === 'dog_lactation') {
    const litterSize = Math.max(1, Math.round(options.litterSize ?? 1))
    const week = Math.max(1, Math.round(options.lactationWeek ?? 1))
    const l = getDogLactationFactor(week)
    const puppyComponent = litterSize <= 4 ? 24 * litterSize * safeWeight * l : (96 + 12 * (litterSize - 4)) * safeWeight * l
    const mer = 145 * metabolicWeight + puppyComponent
    return { rer: rerBase, mer, factor: rerBase > 0 ? mer / rerBase : null, state, formulaLines: [litterSize <= 4 ? 'MER = 145 x peso^0.75 + 24 x n x peso x L' : 'MER = 145 x peso^0.75 + [96 + 12 x (n-4)] x peso x L', `n = ${litterSize}, L = ${l.toFixed(2)} (semana ${week})`] }
  }

  if (state.calculationMode === 'cat_lactation') {
    const litterSize = Math.max(1, Math.round(options.litterSize ?? 1))
    const week = Math.max(1, Math.round(options.lactationWeek ?? 1))
    const l = getCatLactationFactor(week)
    const multiplier = litterSize < 3 ? 18 : litterSize <= 4 ? 60 : 70
    const mer = 100 * metabolicWeight + multiplier * safeWeight * l
    return { rer: rerBase, mer, factor: rerBase > 0 ? mer / rerBase : null, state, formulaLines: [litterSize < 3 ? 'MER = 100 x peso^0.67 + 18 x peso x L' : litterSize <= 4 ? 'MER = 100 x peso^0.67 + 60 x peso x L' : 'MER = 100 x peso^0.67 + 70 x peso x L', `n = ${litterSize}, L = ${l.toFixed(2)} (semana ${week})`] }
  }

  const factor = state.defaultFactor || 1
  return { rer: rerBase, mer: rerBase * factor, factor, state, formulaLines: [`MER = RER x ${factor.toFixed(3)}`] }
}
