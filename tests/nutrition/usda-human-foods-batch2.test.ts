import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { getFoodById, filterFoods } from '../../modules/energia-vet/lib/genutriData'
import { legacyGenutriCatalogAdapter } from '../../modules/energia-vet/lib/catalog/legacyGenutriAdapter'
import { setNutritionFeatureOverride, clearNutritionFeatureOverrides } from '../../modules/energia-vet/lib/featureFlags'

const source = JSON.parse(
  readFileSync(path.join(process.cwd(), 'scripts/data/usda-human-foods-batch2.json'), 'utf8'),
) as Array<{ id: string; pending?: boolean; usdaFoodCode?: string; nameEn?: string }>

const BATCH_IDS = new Set(source.map((item) => item.id))

function note(foodId: string, key: string): string | undefined {
  const food = getFoodById(foodId)
  const prefix = `${key}=`
  return food?.notes.find((n) => n.startsWith(prefix))?.slice(prefix.length)
}

function batchFoods() {
  return filterFoods({ foodType: 'natural' }).filter((food) => BATCH_IDS.has(food.id))
}

test.afterEach(() => clearNutritionFeatureOverrides())

test('lote 2 inseriu 69 alimentos humanos no dataset', () => {
  const found = source.filter((item) => Boolean(getFoodById(item.id)))
  assert.equal(found.length, 69)
})

test('nenhum alimento humano do lote 2 é classificado como dieta completa', async () => {
  setNutritionFeatureOverride('nutrition_catalog_v2', true)
  for (const item of source) {
    const details = await legacyGenutriCatalogAdapter.getById(item.id)
    assert.ok(details)
    assert.notEqual(details.completenessClass, 'complete', item.id)
    assert.equal(details.foodKind, 'human_ingredient')
  }
})

test('pescado enlatado não compartilha id com pescado fresco equivalente', () => {
  assert.ok(getFoodById('usda-fndds-26155190'))
  assert.ok(getFoodById('usda-atum-fresco-assado'))
  assert.notEqual(getFoodById('usda-fndds-26155190')?.id, getFoodById('usda-atum-fresco-assado')?.id)
  assert.notEqual(getFoodById('usda-fndds-26139180')?.id, getFoodById('usda-sardinha-agua')?.id)
})

test('anchova enlatada permanece bloqueada por sódio extremo', () => {
  const anchovy = getFoodById('usda-fndds-26101180')
  assert.ok(anchovy)
  assert.equal(note('usda-fndds-26101180', 'clinical_use_status'), 'blocked')
  assert.match(note('usda-fndds-26101180', 'hard_flags') ?? '', /extreme_sodium/)
  assert.equal(anchovy.nutrientsAsFed.sodiumPct != null && anchovy.nutrientsAsFed.sodiumPct > 1, true)
})

test('fígado e rim são vísceras, não carne muscular', () => {
  assert.equal(note('usda-fndds-25110420', 'ingredient_class'), 'organ_meat')
  assert.equal(note('usda-fndds-25130000', 'ingredient_class'), 'organ_meat')
})

test('clara e gema de ovo são registros distintos', () => {
  const white = getFoodById('usda-fndds-31108110')
  const yolk = getFoodById('usda-fndds-31111010')
  assert.ok(white && yolk)
  assert.notEqual(white.id, yolk.id)
  assert.notEqual(white.nutrientsAsFed.energyKcalPer100g, yolk.nutrientsAsFed.energyKcalPer100g)
})

test('farelo de trigo e farelo de aveia são registros distintos', () => {
  const oat = getFoodById('usda-fndds-57602500')
  const wheat = getFoodById('usda-fndds-57601100')
  assert.ok(oat && wheat)
  assert.notEqual(oat.id, wheat.id)
})

test('nome USDA original preservado — não substituído por equivalente brasileiro', () => {
  const whiting = getFoodById('usda-fndds-26157123')
  assert.ok(whiting?.notes.some((n) => n.includes('Whiting, baked or broiled')))
  assert.equal(note('usda-fndds-26157123', 'species_mapping_status'), 'unconfirmed')
  assert.ok(getFoodById('br-pending-merluza-brasil'))
  assert.notEqual(getFoodById('br-pending-merluza-brasil')?.name, whiting?.name)
})

test('dados ausentes permanecem null — nunca zero forçado', () => {
  for (const food of batchFoods()) {
    if (food.id.startsWith('br-pending-')) {
      assert.ok(food.nutrientsAsFed.taurinePct == null)
      assert.ok(food.nutrientsAsFed.epaPct == null || food.nutrientsAsFed.epaPct == null)
      continue
    }
    assert.ok(food.nutrientsAsFed.vitaminDIu == null || food.nutrientsAsFed.vitaminDIu === null)
    assert.ok(food.nutrientsAsFed.omega3Pct == null)
  }
})

test('energia calculada identificada nos metadados', () => {
  for (const food of batchFoods()) {
    if (food.id.startsWith('br-pending-')) continue
    assert.equal(note(food.id, 'energy_value_kind'), 'calculated')
    assert.equal(note(food.id, 'energy_derivation'), 'general_atwater_4_4_9')
  }
})

test('registros USDA exigem atualização FDC futura', () => {
  for (const item of source.filter((row) => !row.pending)) {
    assert.equal(note(item.id, 'requires_current_fdc_refresh'), 'true')
  }
})

test('registros USDA com mapeamento pendente permanecem no catálogo', async () => {
  setNutritionFeatureOverride('nutrition_catalog_v2', true)
  const details = await legacyGenutriCatalogAdapter.getById('usda-fndds-26157123')
  assert.ok(details)
  assert.notEqual(details.completenessClass, 'complete')
})

test('truta FNDDS permanece como ingrediente humano provisório', async () => {
  setNutritionFeatureOverride('nutrition_catalog_v2', true)
  const trout = await legacyGenutriCatalogAdapter.getById('usda-fndds-26151123')
  assert.ok(trout)
  assert.equal(trout.foodKind, 'human_ingredient')
})

test('busca encontra novos peixes e vísceras em português (dataset completo)', () => {
  const find = (query: string, id: string) =>
    filterFoods({ query, foodType: 'natural', catalogOnly: false }).some((f) => f.id === id)

  assert.ok(find('truta', 'usda-fndds-26151123'))
  assert.ok(find('figado frango', 'usda-fndds-25110420'))
  assert.ok(find('quinoa cozida', 'usda-fndds-56204005'))
})

test('lote FNDDS permanece oculto na busca padrão do catálogo', () => {
  assert.equal(
    filterFoods({ query: 'truta', foodType: 'natural' }).some((f) => f.id === 'usda-fndds-26151123'),
    false,
  )
})

test('pendentes brasileiros sem composição nutricional', () => {
  const pending = source.filter((item) => item.pending)
  assert.equal(pending.length, 21)
  for (const item of pending) {
    const food = getFoodById(item.id)
    assert.ok(food)
    assert.equal(note(item.id, 'source_type'), 'BRAZILIAN_COMPOSITION_REQUIRED')
    assert.equal(note(item.id, 'clinical_use_status'), 'blocked_pending_data')
    assert.equal(food.nutrientsAsFed.energyKcalPer100g, null)
  }
})
