import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { filterFoods, getFoodById } from '../../modules/energia-vet/lib/genutriData'
import { isFoodCatalogHidden } from '../../modules/energia-vet/lib/catalogVisibility'

const source = JSON.parse(readFileSync(path.join(process.cwd(), 'scripts/data/usda-brazil-curated-foods.json'), 'utf8'))
const tacoSource = JSON.parse(
  readFileSync(path.join(process.cwd(), 'scripts/data/taco-brazil-foods-curated.json'), 'utf8'),
) as Array<{ id: string; hideUsdaIds?: string[]; name: string }>

const usdaToTaco = new Map<string, string>()
for (const taco of tacoSource) {
  for (const usdaId of taco.hideUsdaIds ?? []) {
    usdaToTaco.set(usdaId, taco.id)
  }
}

const SEARCH_CASES = [
  { query: 'arroz integral', expectedId: 'taco-001-arroz-integral-cozido' },
  { query: 'feijao carioca', expectedId: 'taco-561-feijao-carioca-cozido' },
  { query: 'brocolis', expectedId: 'taco-100-brocolis-cozido' },
  { query: 'peito frango', expectedId: 'taco-408-frango-peito-sem-pele-cozido' },
  { query: 'azeite', expectedId: 'taco-260-azeite-de-oliva-extravirgem' },
  { query: 'semente chia', expectedId: 'usda-semente-chia' },
  { query: 'macarrao', expectedId: 'usda-macarrao-cozido' },
]

test('cadastrou 69 alimentos USDA curados para o Brasil (dataset completo)', () => {
  const ids = new Set(source.map((item: { id: string }) => item.id))
  const found = source.filter((item: { id: string }) => Boolean(getFoodById(item.id)))
  assert.equal(found.length, 69)
  assert.equal(ids.size, 69)
})

test('nomes respondem na caixa de pesquisa por token (TACO preferencial)', () => {
  for (const item of SEARCH_CASES) {
    const results = filterFoods({ query: item.query, foodType: 'natural' })
    assert.ok(
      results.some((food) => food.id === item.expectedId),
      `Busca "${item.query}" deveria encontrar ${item.expectedId}`,
    )
  }
})

test('USDA com equivalente TACO permanece no dataset mas oculto do catálogo', () => {
  const hiddenWithTaco = source.filter((item: { id: string }) => usdaToTaco.has(item.id))
  assert.ok(hiddenWithTaco.length >= 40)
  for (const item of hiddenWithTaco as Array<{ id: string }>) {
    const food = getFoodById(item.id)
    assert.ok(food)
    assert.ok(isFoodCatalogHidden(food!))
    const taco = getFoodById(usdaToTaco.get(item.id)!)
    assert.ok(taco)
    assert.ok(!isFoodCatalogHidden(taco!))
  }
})

test('ingredientes visíveis no catálogo incluem TACO e USDA sem duplicata', () => {
  const visibleUsdaBrazil = source.filter((item: { id: string }) => {
    const food = getFoodById(item.id)
    return food && !isFoodCatalogHidden(food)
  })
  assert.ok(visibleUsdaBrazil.length >= 10)
  assert.ok(tacoSource.length === 100)
})
