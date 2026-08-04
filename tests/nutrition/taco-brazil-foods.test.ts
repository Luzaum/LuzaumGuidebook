import assert from 'node:assert/strict'
import test from 'node:test'
import { filterFoods, GENUTRI_FOODS, getFoodById } from '../../modules/energia-vet/lib/genutriData'
import { isFoodCatalogHidden, isFoodCatalogVisible } from '../../modules/energia-vet/lib/catalogVisibility'
import { getFoodDisplayName } from '../../modules/energia-vet/lib/foodSearchLexicon'

function noteValue(food: { notes?: string[] }, key: string): string | undefined {
  const hit = food.notes?.find((n) => n.startsWith(`${key}=`))
  return hit ? hit.slice(key.length + 1) : undefined
}

function tacoFoods() {
  return GENUTRI_FOODS.filter((f) => f.id.startsWith('taco-'))
}

test('importou exatamente 100 alimentos TACO', () => {
  assert.equal(tacoFoods().length, 100)
})

test('Tr/NA não são convertidos em zero nos nutrientes TACO', () => {
  const moranga = getFoodById('taco-067-abobora-moranga-crua')
  assert.ok(moranga)
  assert.equal(moranga!.nutrientsAsFed.sodiumPct, null)
})

test('fibra NI permanece null (não zero)', () => {
  const atum = getFoodById('taco-278-atum-fresco-cru')
  assert.ok(atum)
  assert.equal(atum!.nutrientsAsFed.crudeFiberPct, null)
})

test('fonte TACO vinculada à edição 2011', () => {
  for (const food of tacoFoods()) {
    assert.equal(noteValue(food, 'source_type'), 'TACO')
    assert.equal(noteValue(food, 'fonteEdicao'), '2011')
    assert.equal(noteValue(food, 'fonteAno'), '2011')
  }
})

test('base sempre por 100 g da parte comestível', () => {
  for (const food of tacoFoods()) {
    assert.equal(noteValue(food, 'baseComposicao'), 'por_100_g_parte_comestivel')
  }
})

test('ingredientes isolados não são dieta completa', () => {
  for (const food of tacoFoods()) {
    assert.equal(noteValue(food, 'classeCompletude'), 'ingrediente_isolado')
    assert.equal(noteValue(food, 'dietaCompleta'), 'false')
    assert.equal(noteValue(food, 'prescricaoAutomatica'), 'false')
  }
})

test('peixes crus não liberados para oferta automática', () => {
  const rawIds = [
    'taco-278-atum-fresco-cru',
    'taco-295-dourada-de-agua-doce-fresca',
    'taco-304-pescada-branca-crua',
    'taco-307-pescada-file-cru',
    'taco-321-sardinha-inteira-crua',
    'taco-322-tucunare-file-congelado-cru',
  ]
  for (const id of rawIds) {
    const food = getFoodById(id)
    assert.ok(food, id)
    assert.equal(noteValue(food!, 'classificacao_veterinaria'), 'dados_para_receita_apenas')
    assert.equal(noteValue(food!, 'ofertaDireta'), 'false')
    assert.equal(noteValue(food!, 'exigeCozimento'), 'true')
  }
})

test('tucunaré preserva carboidrato negativo original', () => {
  const food = getFoodById('taco-322-tucunare-file-congelado-cru')
  assert.ok(food)
  assert.equal(noteValue(food!, 'valor_original_carboidrato'), '-0.05')
  assert.ok(food!.notes.some((n) => n.includes('problema_qualidade')))
})

test('peru assado gera alerta de sódio elevado', () => {
  const food = getFoodById('taco-425-peru-congelado-assado')
  assert.ok(food)
  assert.ok(food!.notes.some((n) => n.includes('sodio_muito_elevado') || n.includes('sodio_elevado')))
})

test('fígado não é classificado como carne muscular', () => {
  const food = getFoodById('taco-356-carne-bovina-figado-grelhado')
  assert.ok(food)
  assert.equal(noteValue(food!, 'classificacao_veterinaria'), 'uso_restrito')
  assert.equal(noteValue(food!, 'classeIngrediente'), 'viscera')
  assert.equal(noteValue(food!, 'naoTratarComoCarneMuscular'), 'true')
})

test('gema e clara são registros distintos', () => {
  const clara = getFoodById('taco-486-ovo-de-galinha-clara-cozida-por-10-minutos')
  const gema = getFoodById('taco-487-ovo-de-galinha-gema-cozida-por-10-minutos')
  assert.ok(clara && gema)
  assert.notEqual(clara!.id, gema!.id)
  assert.notEqual(clara!.nutrientsAsFed.etherExtractPct, gema!.nutrientsAsFed.etherExtractPct)
})

test('óleos não são equivalentes entre si', () => {
  const azeite = getFoodById('taco-260-azeite-de-oliva-extravirgem')
  const canola = getFoodById('taco-268-oleo-de-canola')
  const soja = getFoodById('taco-272-oleo-de-soja')
  assert.ok(azeite && canola && soja)
  assert.notEqual(azeite!.id, canola!.id)
  assert.notEqual(canola!.id, soja!.id)
})

test('leguminosas exigem cozimento completo', () => {
  const ids = [
    'taco-561-feijao-carioca-cozido',
    'taco-563-feijao-fradinho-cozido',
    'taco-567-feijao-preto-cozido',
    'taco-577-lentilha-cozida',
    'taco-584-soja-queijo-tofu',
  ]
  for (const id of ids) {
    const food = getFoodById(id)
    assert.ok(food, id)
    assert.equal(noteValue(food!, 'exigeCozimentoCompleto'), 'true')
  }
})

test('USDA equivalentes ficam ocultos quando TACO preferencial existe', () => {
  const usda = getFoodById('usda-arroz-integral-cozido')
  const taco = getFoodById('taco-001-arroz-integral-cozido')
  assert.ok(usda && taco)
  assert.ok(usda!.notes.includes('catalog_hidden=true'))
  assert.ok(usda!.notes.includes('taco_preferred_source=true'))
  assert.ok(isFoodCatalogHidden(usda!))
  assert.ok(isFoodCatalogVisible(taco!))
})

test('lote FNDDS em inglês permanece oculto do catálogo', () => {
  const fndds = GENUTRI_FOODS.filter((f) => f.id.startsWith('usda-fndds-'))
  assert.ok(fndds.length >= 40)
  for (const food of fndds) {
    assert.ok(isFoodCatalogHidden(food), food.id)
  }
})

test('nomes TACO permanecem em português do Brasil', () => {
  const sample = getFoodById('taco-182-banana-prata-crua')
  assert.ok(sample)
  assert.match(sample!.name, /Banana/i)
  assert.doesNotMatch(getFoodDisplayName(sample!.name, { id: sample!.id, foodType: 'natural' }), /\bChicken\b/i)
})

test('busca do catálogo inclui TACO e exclui ocultos', () => {
  const all = filterFoods({ catalogOnly: false })
  const visible = filterFoods({})
  assert.ok(all.length > visible.length)
  assert.ok(visible.some((f) => f.id.startsWith('taco-')))
  assert.ok(!visible.some((f) => f.id.startsWith('usda-fndds-')))
})

test('inhame cru exige cozimento e não é oferta direta', () => {
  const food = getFoodById('taco-126-inhame-cru')
  assert.ok(food)
  assert.equal(noteValue(food!, 'ofertaDireta'), 'false')
  assert.equal(noteValue(food!, 'exigeCozimento'), 'true')
})

test('sardinha inteira gera alerta de espinhas', () => {
  const assada = getFoodById('taco-318-sardinha-assada')
  const inteira = getFoodById('taco-321-sardinha-inteira-crua')
  assert.ok(assada && inteira)
  assert.ok(assada!.notes.some((n) => n.includes('espinha') || n.includes('Espinha')))
})
