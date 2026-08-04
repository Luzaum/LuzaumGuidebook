/**
 * Importa catálogo técnico de alimentos úmidos Brasil (auditoria 2026-08-03).
 * Uso: node scripts/merge-brazil-wet-foods.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getBrazilWetFoodProducts } from './data/brazil-wet-foods-catalog.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const datasetPath = path.join(root, 'modules/energia-vet/data/genutri-dataset.json')

const SOURCE_WORKBOOK = 'Catálogo técnico alimentos úmidos Brasil (auditoria 2026-08-03)'
const SOURCE_DATE = '2026-08-03'

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

function mgKgToPct(mgKg) {
  return mgKg == null ? null : r6(mgKg / 10000)
}

function emptyNutrients() {
  return Object.fromEntries(NUTRIENT_KEYS.map((key) => [key, null]))
}

function toDryMatter(asFed, moisturePct) {
  if (moisturePct == null || moisturePct >= 100) return emptyNutrients()
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

function computeNfe(asFed, moisturePct) {
  if (moisturePct == null) return null
  const sum =
    moisturePct +
    (asFed.crudeProteinPct ?? 0) +
    (asFed.etherExtractPct ?? 0) +
    (asFed.ashPct ?? 0) +
    (asFed.crudeFiberPct ?? 0)
  const nfe = 100 - sum
  return nfe > 0 ? r6(nfe) : null
}

function applyGuaranteed(asFed, g) {
  if (!g) return
  if (g.moistureMax != null) {
    asFed.moisturePct = g.moistureMax
    asFed.dryMatterPct = r6(100 - g.moistureMax)
  }
  if (g.proteinMin != null) asFed.crudeProteinPct = g.proteinMin
  if (g.fatMin != null) asFed.etherExtractPct = g.fatMin
  if (g.fatMax != null && g.fatMin == null) asFed.etherExtractPct = g.fatMax
  if (g.fiberMax != null) asFed.crudeFiberPct = g.fiberMax
  if (g.ashMax != null) asFed.ashPct = g.ashMax
  if (g.calciumMin != null) asFed.calciumPct = g.calciumMin
  if (g.calciumMax != null && g.calciumMin == null) asFed.calciumPct = g.calciumMax
  if (g.phosphorusMin != null) asFed.phosphorusPct = g.phosphorusMin
  if (g.sodiumMin != null) asFed.sodiumPct = g.sodiumMin
  if (g.sodiumMax != null && g.sodiumMin == null) asFed.sodiumPct = g.sodiumMax
  if (g.sodiumPct != null) asFed.sodiumPct = g.sodiumPct
  if (g.potassiumMin != null) asFed.potassiumPct = g.potassiumMin
  if (g.potassiumPct != null) asFed.potassiumPct = g.potassiumPct
  if (g.magnesiumMin != null) asFed.magnesiumPct = g.magnesiumMin
  if (g.magnesiumMax != null && g.magnesiumMin == null) asFed.magnesiumPct = g.magnesiumMax
  if (g.magnesiumPct != null) asFed.magnesiumPct = g.magnesiumPct
  if (g.chlorideMin != null) asFed.chloridePct = g.chlorideMin
  if (g.taurineMinMgKg != null) asFed.taurinePct = mgKgToPct(g.taurineMinMgKg)
  if (g.methionineMinMgKg != null) asFed.methionineCystinePct = mgKgToPct(g.methionineMinMgKg)
  if (g.carnitineMinMgKg != null) asFed.cholineMg = null // stored in notes as mg/kg
  if (g.epaMinMgKg != null || g.dhaMinMgKg != null) {
    const epaDha = (g.epaMinMgKg ?? 0) + (g.dhaMinMgKg ?? 0)
    if (epaDha > 0) asFed.omega3Pct = mgKgToPct(epaDha)
  }
  if (g.omega6MinPct != null) asFed.omega6Pct = g.omega6MinPct
  if (g.omega3MinMgKg != null) asFed.omega3Pct = mgKgToPct(g.omega3MinMgKg)
}

function applyDryMatterAverages(asFed, dm, moisturePct) {
  const m = moisturePct ?? 78
  const factor = (100 - m) / 100
  asFed.moisturePct = m
  asFed.dryMatterPct = r6(100 - m)
  if (dm.protein != null) asFed.crudeProteinPct = r6(dm.protein * factor)
  if (dm.fat != null) asFed.etherExtractPct = r6(dm.fat * factor)
  if (dm.fiber != null) asFed.crudeFiberPct = r6(dm.fiber * factor)
  if (dm.carb != null) asFed.nitrogenFreeExtractPct = r6(dm.carb * factor)
  if (dm.calcium != null) asFed.calciumPct = r6(dm.calcium * factor)
}

function buildNotes(product) {
  const notes = [
    `sourceAccessedAt=${SOURCE_DATE}`,
    `verificationStatus=${product.verificationStatus ?? 'official_page_verified'}`,
    `completenessClass=${product.completenessClass ?? 'complete'}`,
    `nutrientBasis=${product.nutrientBasis ?? 'as_fed_guaranteed'}`,
    `format=${product.format ?? 'unknown'}`,
    `packageGrams=${product.packageGrams ?? 'unknown'}`,
  ]
  if (product.manufacturer) notes.push(`manufacturer=${product.manufacturer}`)
  if (product.brand) notes.push(`brand=${product.brand}`)
  if (product.line) notes.push(`line=${product.line}`)
  if (product.officialSourceUrl) notes.push(`officialSourceUrl=${product.officialSourceUrl}`)
  if (product.energyKcalKgAlt != null) {
    notes.push(`energyAlternativeKcalKg=${product.energyKcalKgAlt}`)
    notes.push(`energyQualityIssue=${product.energyQualityIssue ?? 'conflicting_energy_values'}`)
  }
  if (product.ingredientsRaw) notes.push(`ingredientsRaw=${product.ingredientsRaw.slice(0, 500)}`)
  if (product.manufacturerIndications?.length) {
    notes.push(`indications=${product.manufacturerIndications.join('; ')}`)
  }
  if (product.extraNotes?.length) notes.push(...product.extraNotes)
  return notes
}

function buildFood(product, rowIndex) {
  const nutrientsAsFed = emptyNutrients()

  if (product.dryMatterAverages) {
    applyDryMatterAverages(nutrientsAsFed, product.dryMatterAverages, product.moisturePctEstimated)
  } else {
    applyGuaranteed(nutrientsAsFed, product.guaranteed)
    if (product.moisturePct != null) {
      nutrientsAsFed.moisturePct = product.moisturePct
      nutrientsAsFed.dryMatterPct = r6(100 - product.moisturePct)
    }
  }

  if (product.energyKcalKg != null) {
    nutrientsAsFed.energyKcalPer100g = r6(product.energyKcalKg / 10)
  }

  if (nutrientsAsFed.nitrogenFreeExtractPct == null && nutrientsAsFed.moisturePct != null) {
    nutrientsAsFed.nitrogenFreeExtractPct = computeNfe(nutrientsAsFed, nutrientsAsFed.moisturePct)
  }

  const nutrientsDryMatter =
    nutrientsAsFed.moisturePct != null
      ? toDryMatter(nutrientsAsFed, nutrientsAsFed.moisturePct)
      : emptyNutrients()

  const missingNutrients = NUTRIENT_KEYS.filter((key) => nutrientsAsFed[key] == null)

  return {
    id: product.id,
    slug: product.id,
    name: product.name,
    category: product.category,
    categoryNormalized: product.categoryNormalized ?? product.category,
    sourceSheet: 'Alimentos MN',
    sourceReference: {
      workbook: SOURCE_WORKBOOK,
      mnRow: 10000 + rowIndex,
      msRow: 10000 + rowIndex,
    },
    speciesScope: product.speciesScope ?? 'unknown',
    foodType: product.foodType ?? 'commercial',
    presentation: product.presentation,
    nutrientsAsFed,
    nutrientsDryMatter,
    missingNutrients,
    notes: buildNotes(product),
  }
}

const products = getBrazilWetFoodProducts()
const main = JSON.parse(fs.readFileSync(datasetPath, 'utf8'))
const indexById = new Map(main.foods.map((food, idx) => [food.id, idx]))

let inserted = 0
let updated = 0

for (let i = 0; i < products.length; i += 1) {
  const product = products[i]
  const item = buildFood(product, i + 1)
  const legacyId = product.replaceLegacyId

  if (legacyId != null && indexById.has(legacyId)) {
    const legacyIdx = indexById.get(legacyId)
    main.foods[legacyIdx] = { ...item, id: legacyId, slug: legacyId }
    updated += 1
    continue
  }

  const existingIdx = indexById.get(item.id)
  if (existingIdx != null) {
    main.foods[existingIdx] = item
    updated += 1
  } else {
    main.foods.push(item)
    indexById.set(item.id, main.foods.length - 1)
    inserted += 1
  }
}

main.meta = {
  ...main.meta,
  brazilWetFoodsImport: {
    importedAt: new Date().toISOString(),
    sourceDate: SOURCE_DATE,
    batchSize: products.length,
    inserted,
    updated,
    totalFoods: main.foods.length,
  },
}

fs.writeFileSync(datasetPath, `${JSON.stringify(main, null, 2)}\n`)
console.log(
  JSON.stringify({ inserted, updated, totalFoods: main.foods.length, batchSize: products.length }, null, 2),
)
