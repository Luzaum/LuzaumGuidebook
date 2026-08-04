import assert from 'node:assert/strict'
import test from 'node:test'
import { filterFoods, getFoodById, getDatasetStats } from '../../modules/energia-vet/lib/genutriData'

const KEY_PRODUCTS = [
  { id: 'pate-a-d-hills', query: 'urgent care', nameIncludes: 'a/d Urgent Care' },
  { id: 'pate-royal-canin-recovery', query: 'recovery mousse', nameIncludes: 'Recovery Mousse' },
  { id: 'premier-nc-caes-diabetes-85g', query: 'premier diabetes', nameIncludes: 'Diabetes' },
  { id: 'premier-nc-gatos-urinario-70g', query: 'premier urinario', nameIncludes: 'Urinário' },
  { id: 'royal-canin-vet-renal-feline-85g', query: 'royal renal feline', nameIncludes: 'Renal Feline' },
  { id: 'farmina-nd-prime-caes-adult-chicken-pomegranate-140g', query: 'farmina prime chicken', nameIncludes: 'Chicken & Pomegranate' },
  { id: 'farmina-vet-life-gatos-hepatic', query: 'farmina hepatic', nameIncludes: 'Hepatic' },
  { id: 'guabi-natural-sache-gatos-frango-cereais-vegetais-85g', query: 'guabi sache gato', nameIncludes: 'Guabi Natural Sachê Gato' },
  { id: 'guabi-natural-racao-caes-adulto-medio-cordeiro-aveia', query: 'guabi cordeiro aveia', nameIncludes: 'Cordeiro e Aveia' },
]

test('catálogo úmido Brasil aumentou o dataset GENUTRI', () => {
  const stats = getDatasetStats()
  assert.ok(stats.foods >= 411)
})

test('produtos-chave do catálogo úmido estão cadastrados', () => {
  for (const item of KEY_PRODUCTS) {
    const food = getFoodById(item.id)
    assert.ok(food, `Faltando ${item.id}`)
    assert.ok(food.name.includes(item.nameIncludes) || food.name.toLowerCase().includes(item.nameIncludes.toLowerCase()))
  }
})

test('Hill a/d e Royal Recovery legados foram atualizados com metadados da auditoria', () => {
  const hills = getFoodById('pate-a-d-hills')
  assert.ok(hills?.notes.some((n) => n.includes('average_dry_matter')))
  assert.equal(hills?.speciesScope, 'both')

  const recovery = getFoodById('pate-royal-canin-recovery')
  assert.ok(recovery?.notes.some((n) => n.includes('conflicting_energy_values')))
  assert.equal(recovery?.nutrientsAsFed.crudeProteinPct, 10.7)
})

test('PremieR NC urinário gatos usa embalagem 70 g (não 85 g)', () => {
  const food = getFoodById('premier-nc-gatos-urinario-70g')
  assert.ok(food?.presentation.includes('70'))
  assert.ok(food?.notes.some((n) => n.includes('packageGrams_historical=85g')))
})

test('Guabi sachê felino é complementar, não completo', () => {
  const food = getFoodById('guabi-natural-sache-gatos-frango-cereais-vegetais-85g')
  assert.ok(food?.notes.some((n) => n.includes('completenessClass=complementary')))
  assert.equal(food?.nutrientsAsFed.moisturePct, 94.5)
})

test('busca encontra produtos principais do catálogo úmido', () => {
  for (const item of KEY_PRODUCTS) {
    const results = filterFoods({ query: item.query, foodType: 'commercial' })
    assert.ok(
      results.some((food) => food.id === item.id),
      `Busca "${item.query}" deveria encontrar ${item.id}`,
    )
  }
})

test('Biofresh úmido e PremieR renal úmido não foram auto-cadastrados', () => {
  const all = filterFoods({ foodType: 'commercial' })
  assert.ok(!all.some((f) => f.id.includes('biofresh') && f.presentation?.toLowerCase().includes('sach')))
  assert.ok(!all.some((f) => f.id.includes('premier-nc') && f.id.includes('renal')))
})
