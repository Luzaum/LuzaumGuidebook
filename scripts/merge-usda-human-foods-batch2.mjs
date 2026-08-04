/**
 * Importa lote 2 de alimentos humanos USDA/FNDDS + pendentes brasileiros.
 * Uso: node scripts/merge-usda-human-foods-batch2.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const datasetPath = path.join(root, 'modules/energia-vet/data/genutri-dataset.json')
const sourcePath = path.join(__dirname, 'data/usda-human-foods-batch2.json')

const SOURCE_WORKBOOK = 'USDA FNDDS derived — human ingredients batch 2 (temporary 2021)'

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
  if (item.pending) return null
  const sum = (item.protein ?? 0) + (item.fat ?? 0) + (item.carb ?? 0) + (item.fiber ?? 0)
  return r6(Math.max(0, Math.min(95, 100 - sum - 0.5)))
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

function buildMetadataNotes(item) {
  const md = item.metadata ?? {}
  const clinicalUseStatus = md.clinicalUseStatus ?? 'reference_only'
  const qualityGrade = md.qualityGrade ?? (item.pending ? 'E' : 'D')
  const sourceType = md.sourceType ?? (item.pending ? 'BRAZILIAN_COMPOSITION_REQUIRED' : 'USDA_DERIVED_FNDDS')

  const notes = [
    'food_kind=human_ingredient',
    `completeness_class=${item.pending ? 'unknown' : 'ingredient_only'}`,
    'basis=per_100g_edible_portion',
    `source_type=${sourceType}`,
    'source_version=temporary_2021_dataset',
    `quality_grade=${qualityGrade}`,
    `clinical_use_status=${clinicalUseStatus}`,
    'auto_prescription=false',
    'requires_veterinary_review=true',
    `requires_current_fdc_refresh=${item.pending ? 'false' : 'true'}`,
    'energy_value_kind=calculated',
    'energy_derivation=general_atwater_4_4_9',
  ]

  if (item.usdaFoodCode) notes.push(`usda_food_code=${item.usdaFoodCode}`)
  if (item.nameEn) notes.push(`canonical_name_en=${item.nameEn}`)
  notes.push(`common_name_pt=${item.name}`)

  if (item.cooked) {
    notes.push('sodium_interpretation=provisional')
    notes.push('requires_unsalted_version_review=true')
  }

  if (md.speciesMappingStatus) {
    notes.push(`species_mapping_status=${md.speciesMappingStatus}`)
    notes.push('species_mapping_warning=IDENTIFICAÇÃO DE ESPÉCIE PENDENTE — NÃO USAR COMO EQUIVALÊNCIA AUTOMÁTICA COM PEIXES BRASILEIROS.')
  }

  if (md.regionalVarietyStatus) {
    notes.push(`regional_variety_status=${md.regionalVarietyStatus}`)
    notes.push('regional_variety_warning=Não traduzir automaticamente yam/inhame como espécie brasileira específica.')
  }

  if (md.ingredientClass) notes.push(`ingredient_class=${md.ingredientClass}`)
  if (md.allergenFlag) notes.push(`allergen_flag=${md.allergenFlag}`)
  if (md.hardFlags?.length) notes.push(`hard_flags=${md.hardFlags.join(',')}`)

  if (md.requiresDrainedWeight || md.preservationMedium) notes.push('requires_drained_weight=true')
  if (md.requiresLabelVerification || md.preservationMedium) notes.push('requires_label_verification=true')
  if (md.preservationMediumRequired || md.preservationMedium) notes.push('preservation_medium_required=true')
  if (md.addedSaltStatus) notes.push(`added_salt_status=${md.addedSaltStatus}`)
  if (md.requiresCommercialLabelCheck) notes.push('requires_commercial_label_check=true')
  if (md.requiresHydrationInstruction) notes.push('requires_hydration_instruction=true')
  if (md.maximumInclusionRequiresCalculation) notes.push('maximum_inclusion_requires_calculation=true')
  if (md.treatEnergyCalculationRequired) notes.push('treat_energy_calculation_required=true')
  if (md.requiresTbcaAuthorizationOrLocalAnalysis) {
    notes.push('requires_tbca_authorization_or_local_analysis=true')
    notes.push('nutrient_data=null')
  }

  if (md.clinicalFlags?.length) notes.push(`clinical_flags=${md.clinicalFlags.join(',')}`)

  for (const flag of item.flags ?? []) notes.push(`flag=${flag}`)

  if (item.notes?.length) notes.push(...item.notes)

  return notes
}

function buildFood(item, rowIndex) {
  if (item.pending) {
    const nutrientsAsFed = emptyNutrients()
    const nutrientsDryMatter = emptyNutrients()
    return {
      id: item.id,
      slug: item.id,
      name: item.name,
      category: item.category,
      categoryNormalized: item.category,
      sourceSheet: 'Alimentos MN',
      sourceReference: {
        workbook: SOURCE_WORKBOOK,
        mnRow: 11000 + rowIndex,
        msRow: 11000 + rowIndex,
      },
      speciesScope: 'unknown',
      foodType: 'natural',
      presentation: item.presentation,
      nutrientsAsFed,
      nutrientsDryMatter,
      missingNutrients: [...NUTRIENT_KEYS],
      notes: buildMetadataNotes(item),
    }
  }

  const moisturePct = estimateMoisture(item)
  const dryMatterPct = r6(100 - moisturePct)
  const nutrientsAsFed = {
    ...emptyNutrients(),
    moisturePct,
    dryMatterPct,
    energyKcalPer100g: r6(item.kcal),
    crudeProteinPct: r6(item.protein),
    etherExtractPct: r6(item.fat),
    crudeFiberPct: r6(item.fiber ?? 0),
    nitrogenFreeExtractPct: r6(Math.max(0, item.carb ?? 0)),
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
      mnRow: 11000 + rowIndex,
      msRow: 11000 + rowIndex,
    },
    speciesScope: 'unknown',
    foodType: 'natural',
    presentation: item.presentation,
    nutrientsAsFed,
    nutrientsDryMatter,
    missingNutrients,
    notes: buildMetadataNotes(item),
  }
}

function extractUsdaCode(notes) {
  const hit = notes.find((n) => n.startsWith('usda_food_code='))
  return hit ? hit.slice('usda_food_code='.length) : null
}

function extractCanonicalEn(notes) {
  const hit = notes.find((n) => n.startsWith('canonical_name_en='))
  return hit ? hit.slice('canonical_name_en='.length).toLowerCase() : null
}

const batchRaw = JSON.parse(fs.readFileSync(sourcePath, 'utf8'))
const main = JSON.parse(fs.readFileSync(datasetPath, 'utf8'))

const existingIds = new Set(main.foods.map((f) => f.id))
const existingCodes = new Set(main.foods.map((f) => extractUsdaCode(f.notes ?? [])).filter(Boolean))
const existingNamesEn = new Set(main.foods.map((f) => extractCanonicalEn(f.notes ?? [])).filter(Boolean))

const report = {
  inserted: 0,
  skippedDuplicateId: [],
  skippedDuplicateCode: [],
  skippedDuplicateNameEn: [],
  speciesMappingPending: [],
  blocked: [],
  requiresFdcRefresh: [],
  brazilianPending: [],
}

const batch = []

for (const item of batchRaw) {
  if (existingIds.has(item.id)) {
    report.skippedDuplicateId.push(item.id)
    continue
  }
  if (item.usdaFoodCode && existingCodes.has(String(item.usdaFoodCode))) {
    report.skippedDuplicateCode.push({ id: item.id, code: item.usdaFoodCode })
    continue
  }
  if (item.nameEn && existingNamesEn.has(item.nameEn.toLowerCase())) {
    report.skippedDuplicateNameEn.push({ id: item.id, nameEn: item.nameEn })
    continue
  }
  batch.push(item)
}

for (let i = 0; i < batch.length; i += 1) {
  const built = buildFood(batch[i], i + 1)
  main.foods.push(built)
  existingIds.add(built.id)
  if (batch[i].usdaFoodCode) existingCodes.add(String(batch[i].usdaFoodCode))
  if (batch[i].nameEn) existingNamesEn.add(batch[i].nameEn.toLowerCase())
  report.inserted += 1

  if (batch[i].metadata?.speciesMappingStatus === 'unconfirmed') {
    report.speciesMappingPending.push(built.id)
  }
  if (batch[i].metadata?.clinicalUseStatus === 'blocked' || batch[i].metadata?.clinicalUseStatus === 'blocked_pending_data') {
    report.blocked.push(built.id)
  }
  if (batch[i].pending) report.brazilianPending.push(built.id)
  else report.requiresFdcRefresh.push(built.id)
}

main.meta = {
  ...main.meta,
  usdaHumanFoodsBatch2Import: {
    importedAt: new Date().toISOString(),
    sourceVersion: 'temporary_2021_dataset',
    batchSize: batchRaw.length,
    ...report,
    totalFoods: main.foods.length,
  },
}

fs.writeFileSync(datasetPath, `${JSON.stringify(main, null, 2)}\n`)
console.log(JSON.stringify({ ...report, totalFoods: main.foods.length, batchSize: batchRaw.length }, null, 2))
