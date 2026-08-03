import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const datasetPath = path.join(root, 'modules/energia-vet/data/genutri-dataset.json')
const sourcePath = path.join(__dirname, 'data/usda-brazil-curated-foods.json')

const SOURCE_WORKBOOK = 'USDA CORGIS 3.0.0 curated Brazil (temporary reference)'
const BASE_NOTES = [
  'source_release=CORGIS_USDA_2021_TEMPORARY',
  'quality_grade=D',
  'clinical_status=reference_only',
  'requires_fdc_2026_refresh=true',
  'completeness_class=ingredient_only',
  'auto_prescription=false',
  'basis=per_100g_edible_portion',
  'value_kind=reference_only',
]

const NUTRIENT_KEYS = [
  'moisturePct', 'dryMatterPct', 'energyKcalPer100g', 'crudeProteinPct', 'etherExtractPct', 'ashPct',
  'crudeFiberPct', 'nitrogenFreeExtractPct', 'calciumPct', 'phosphorusPct', 'potassiumPct', 'sodiumPct',
  'chloridePct', 'magnesiumPct', 'manganeseMg', 'copperMg', 'zincMg', 'seleniumMg', 'vitaminAIu',
  'vitaminDIu', 'vitaminEIu', 'thiamineMg', 'riboflavinMg', 'pyridoxineMg', 'taurinePct',
  'methionineCystinePct', 'omega3Pct', 'omega6Pct', 'mcfaPct', 'cholineMg', 'ironMg', 'iodineMg',
  'niacinMg', 'pantothenicAcidMg', 'biotinMg', 'folicAcidMg', 'cobalaminMcg', 'vitaminKMg',
]

function r6(value) {
  if (value == null || typeof value !== 'number' || Number.isNaN(value)) return value
  return Math.round(value * 1e6) / 1e6
}

function mgToPct(mg) {
  return mg == null ? null : r6(mg / 1000)
}

function emptyNutrients() {
  return Object.fromEntries(NUTRIENT_KEYS.map((key) => [key, null]))
}

function estimateMoisture(item) {
  if (item.moisturePct != null) return r6(item.moisturePct)
  const sum = item.protein + item.fat + item.carb + item.fiber
  return r6(Math.max(0, Math.min(95, 100 - sum - 0.5)))
}

function toDryMatter(asFed, moisturePct) {
  if (moisturePct >= 100) return emptyNutrients()
  const factor = 100 / (100 - moisturePct)
  const dm = emptyNutrients()
  dm.moisturePct = 0
  dm.dryMatterPct = 100
  for (const key of NUTRIENT_KEYS) {
    if (key === 'moisturePct' || key === 'dryMatterPct') continue
    const value = asFed[key]
    dm[key] = value == null ? null : r6(value * factor)
  }
  return dm
}

function buildFood(item, rowIndex) {
  const moisturePct = estimateMoisture(item)
  const dryMatterPct = r6(100 - moisturePct)
  const nutrientsAsFed = {
    ...emptyNutrients(),
    moisturePct,
    dryMatterPct,
    energyKcalPer100g: r6(item.kcal),
    crudeProteinPct: r6(item.protein),
    etherExtractPct: r6(item.fat),
    crudeFiberPct: r6(item.fiber),
    nitrogenFreeExtractPct: r6(Math.max(0, item.carb)),
    calciumPct: mgToPct(item.caMg),
    phosphorusPct: mgToPct(item.pMg),
    sodiumPct: mgToPct(item.naMg),
    potassiumPct: mgToPct(item.kMg),
  }
  const nutrientsDryMatter = toDryMatter(nutrientsAsFed, moisturePct)
  const missingNutrients = NUTRIENT_KEYS.filter((key) => nutrientsAsFed[key] == null)

  return {
    id: item.id,
    slug: item.id,
    name: item.name,
    category: item.category,
    categoryNormalized: item.category,
    sourceSheet: 'Alimentos MN',
    sourceReference: {
      workbook: SOURCE_WORKBOOK,
      mnRow: 9000 + rowIndex,
      msRow: 9000 + rowIndex,
    },
    speciesScope: 'unknown',
    foodType: 'natural',
    presentation: item.presentation,
    nutrientsAsFed,
    nutrientsDryMatter,
    missingNutrients,
    notes: [...BASE_NOTES, ...(item.notes || [])],
  }
}

const batchRaw = JSON.parse(fs.readFileSync(sourcePath, 'utf8'))
const batch = batchRaw.map((item, index) => buildFood(item, index + 1))
const main = JSON.parse(fs.readFileSync(datasetPath, 'utf8'))
const existing = new Set(main.foods.map((food) => food.id))

let inserted = 0
let skipped = 0
for (const item of batch) {
  if (existing.has(item.id)) {
    skipped += 1
    console.error('ID duplicado, ignorado:', item.id)
    continue
  }
  main.foods.push(item)
  existing.add(item.id)
  inserted += 1
}

main.meta = {
  ...main.meta,
  usdaBrazilCuratedImport: {
    importedAt: new Date().toISOString(),
    sourceRelease: 'CORGIS_USDA_2021_TEMPORARY',
    count: inserted,
    skipped,
  },
}

fs.writeFileSync(datasetPath, `${JSON.stringify(main, null, 2)}\n`)
console.log(JSON.stringify({ inserted, skipped, totalFoods: main.foods.length, batchSize: batch.length }, null, 2))
