/**
 * Importa lote curado TACO (100 alimentos brasileiros) para genutri-dataset.json.
 * Uso: node scripts/merge-taco-brazil-foods.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const datasetPath = path.join(root, 'modules/energia-vet/data/genutri-dataset.json')
const sourcePath = path.join(__dirname, 'data/taco-brazil-foods-curated.json')

const SOURCE_WORKBOOK = 'Tabela Brasileira de Composição de Alimentos — TACO (4ª ed. 2011)'

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

function carbForNutrients(item) {
  const md = item.metadata ?? {}
  if (md.valorNormalizadoCarboidrato != null) return md.valorNormalizadoCarboidrato
  if (item.carb == null) return null
  return Math.max(0, item.carb)
}

function buildMetadataNotes(item) {
  const md = item.metadata ?? {}
  const notes = [
    'food_kind=human_ingredient',
    'completeness_class=ingredient_only',
    'basis=per_100g_edible_portion',
    'source_type=TACO',
    'fonteNome=Tabela Brasileira de Composição de Alimentos — TACO',
    'fonteInstituicao=NEPA/UNICAMP',
    'fonteEdicao=2011',
    'fonteAno=2011',
    'baseComposicao=por_100_g_parte_comestivel',
    'tipoValor=media_analitica',
    'paisReferencia=Brasil',
    'fonteOficial=true',
    'fonteBrasileira=true',
    'estadoAtualizacao=oficial_legada_2011',
    'requerRevisaoPeriodica=true',
    'classeCompletude=ingrediente_isolado',
    'dietaCompleta=false',
    'auto_prescription=false',
    'requires_veterinary_review=true',
    'prescricaoAutomatica=false',
    'requerAvaliacaoVeterinaria=true',
    'energy_value_kind=calculated',
    'energy_derivation=general_atwater_4_4_9',
    `taco_id=${item.tacoId}`,
    `canonical_food_key=${item.canonicalKey}`,
    `quality_grade=${md.qualityGrade ?? 'C'}`,
    `clinical_use_status=${md.clinicalUseStatus ?? 'reference_only'}`,
  ]

  if (md.classificacaoVeterinaria) notes.push(`classificacao_veterinaria=${md.classificacaoVeterinaria}`)
  if (md.adequacaoCaes) notes.push(`adequacao_caes=${md.adequacaoCaes}`)
  if (md.adequacaoGatos) notes.push(`adequacao_gatos=${md.adequacaoGatos}`)
  if (md.adequacaoEspecie) notes.push(`adequacao_especie=${md.adequacaoEspecie}`)
  if (md.limiteEnergetico) notes.push(`limite_energetico=${md.limiteEnergetico}`)
  if (md.ofertaRecomendada) notes.push(`oferta_recomendada=${md.ofertaRecomendada}`)

  if (md.problemaQualidade) {
    notes.push(`problema_qualidade=${md.problemaQualidade}`)
    notes.push('qualidade_fonte=alerta')
  }
  if (md.valorOriginalCarboidrato != null) notes.push(`valor_original_carboidrato=${md.valorOriginalCarboidrato}`)
  if (md.valorNormalizadoCarboidrato != null) notes.push(`valor_normalizado_carboidrato=${md.valorNormalizadoCarboidrato}`)

  for (const [key, value] of Object.entries(md)) {
    if ([
      'sourceType', 'qualityGrade', 'clinicalUseStatus', 'classificacaoVeterinaria',
      'adequacaoCaes', 'adequacaoGatos', 'adequacaoEspecie', 'limiteEnergetico', 'ofertaRecomendada',
      'problemaQualidade', 'valorOriginalCarboidrato', 'valorNormalizadoCarboidrato', 'flags',
    ].includes(key)) continue
    if (typeof value === 'boolean') notes.push(`${key}=${value}`)
    else if (typeof value === 'string') notes.push(`${key}=${value}`)
    else if (typeof value === 'number') notes.push(`${key}=${value}`)
  }

  if (md.flags?.length) notes.push(`clinical_flags=${md.flags.join(',')}`)

  if (item.hideUsdaIds?.length) {
    notes.push(`hide_usda_ids=${item.hideUsdaIds.join(',')}`)
    notes.push('taco_preferred_source=true')
    notes.push('fontePreferencialExibicao=TACO')
  }

  return notes
}

function buildFood(item, rowIndex) {
  const moisturePct = estimateMoisture(item)
  const dryMatterPct = r6(100 - moisturePct)
  const carbNfe = carbForNutrients(item)
  const nutrientsAsFed = {
    ...emptyNutrients(),
    moisturePct,
    dryMatterPct,
    energyKcalPer100g: r6(item.kcal),
    crudeProteinPct: r6(item.protein),
    etherExtractPct: r6(item.fat),
    crudeFiberPct: item.fiber == null ? null : r6(item.fiber),
    nitrogenFreeExtractPct: carbNfe == null ? null : r6(carbNfe),
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
      mnRow: 12000 + rowIndex,
      msRow: 12000 + rowIndex,
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

function hideFood(food, reason) {
  const notes = food.notes ?? []
  if (!notes.includes('catalog_hidden=true')) notes.push('catalog_hidden=true')
  if (reason && !notes.includes(reason)) notes.push(reason)
  food.notes = notes
}

const batchRaw = JSON.parse(fs.readFileSync(sourcePath, 'utf8'))
const main = JSON.parse(fs.readFileSync(datasetPath, 'utf8'))

const existingIds = new Set(main.foods.map((f) => f.id))
const hideUsdaTargets = new Set(batchRaw.flatMap((item) => item.hideUsdaIds ?? []))

const report = {
  inserted: 0,
  skippedDuplicateId: [],
  usdaHiddenByTaco: [],
  usdaFnddsHidden: 0,
  blocked: [],
  rawFishRecipeOnly: [],
  restricted: [],
}

const batch = []

for (const item of batchRaw) {
  if (existingIds.has(item.id)) {
    report.skippedDuplicateId.push(item.id)
    continue
  }
  batch.push(item)
}

for (let i = 0; i < batch.length; i += 1) {
  const built = buildFood(batch[i], i + 1)
  main.foods.push(built)
  existingIds.add(built.id)
  report.inserted += 1

  const vetClass = batch[i].metadata?.classificacaoVeterinaria
  if (vetClass === 'dados_para_receita_apenas') report.rawFishRecipeOnly.push(built.id)
  if (vetClass === 'uso_restrito') report.restricted.push(built.id)
}

for (const food of main.foods) {
  if (hideUsdaTargets.has(food.id)) {
    hideFood(food, 'taco_preferred_source=true')
    report.usdaHiddenByTaco.push(food.id)
  }
  if (food.id.startsWith('usda-fndds-')) {
    hideFood(food, 'hidden_non_brazilian_fndds_batch=true')
    report.usdaFnddsHidden += 1
  }
}

main.meta = {
  ...main.meta,
  tacoBrazilFoodsImport: {
    importedAt: new Date().toISOString(),
    sourceEdition: 'TACO_2011',
    batchSize: batchRaw.length,
    ...report,
    totalFoods: main.foods.length,
  },
}

fs.writeFileSync(datasetPath, `${JSON.stringify(main, null, 2)}\n`)
console.log(JSON.stringify({
  ...report,
  totalFoods: main.foods.length,
  batchSize: batchRaw.length,
}, null, 2))
