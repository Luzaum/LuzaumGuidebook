import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { filterFoods, getFoodById } from '../../modules/energia-vet/lib/genutriData'

const source = JSON.parse(readFileSync(path.join(process.cwd(), 'scripts/data/usda-brazil-curated-foods.json'), 'utf8'))

const SEARCH_CASES = [
  { query: 'arroz branco', expectedName: 'Arroz branco' },
  { query: 'feijao carioca', expectedName: 'Feijão-carioca' },
  { query: 'brocolis', expectedName: 'Brócolis' },
  { query: 'peito frango', expectedName: 'Peito de frango' },
  { query: 'cod fresco', expectedName: 'Cod fresco' },
  { query: 'azeite', expectedName: 'Azeite de oliva' },
  { query: 'semente chia', expectedName: 'Semente de chia' },
  { query: 'iogurte grego', expectedName: 'Iogurte grego desnatado' },
]

test('cadastrou 69 alimentos USDA curados para o Brasil', () => {
  const ids = new Set(source.map((item: { id: string }) => item.id))
  const found = source.filter((item: { id: string }) => Boolean(getFoodById(item.id)))
  assert.equal(found.length, 69)
  assert.equal(ids.size, 69)
})

test('nomes respondem na caixa de pesquisa por token', () => {
  for (const item of SEARCH_CASES) {
    const results = filterFoods({ query: item.query, foodType: 'natural' })
    assert.ok(
      results.some((food) => food.name === item.expectedName),
      `Busca "${item.query}" deveria encontrar ${item.expectedName}`,
    )
  }
})

test('todos os 69 nomes canônicos são encontrados pela busca', () => {
  const missing: string[] = []
  for (const item of source as Array<{ id: string; name: string }>) {
    const tokens = item.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .split(/[\s/]+/)
      .filter(Boolean)
    const query = tokens.slice(0, 2).join(' ')
    const results = filterFoods({ query, foodType: 'natural' })
    if (!results.some((food) => food.id === item.id)) {
      missing.push(`${item.name} (query: "${query}")`)
    }
  }
  assert.deepEqual(missing, [])
})

test('todos os alimentos importados são ingredient_only (natural)', () => {
  const ids = new Set(source.map((item: { id: string }) => item.id))
  const foods = filterFoods({ foodType: 'natural' }).filter((food) => ids.has(food.id))
  assert.equal(foods.length, 69)
  assert.ok(foods.every((food) => food.foodType === 'natural'))
  assert.ok(foods.every((food) => food.notes.some((note) => note.includes('ingredient_only'))))
})
