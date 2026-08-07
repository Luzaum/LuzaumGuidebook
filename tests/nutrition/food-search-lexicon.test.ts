import assert from 'node:assert/strict'
import test from 'node:test'
import { filterFoods, getFoodDisplayName } from '../../modules/energia-vet/lib/genutriData'

const commercial = { id: 'x', foodType: 'commercial' as const }
const natural = { id: 'usda-fndds-26157123', foodType: 'natural' as const }

test('rações comerciais são exibidas em português do Brasil quando possível', () => {
  assert.equal(
    getFoodDisplayName('Royal Canin Recovery Mousse', commercial),
    'Royal Canin Recuperação Mousse',
  )
  assert.equal(
    getFoodDisplayName('Ração Royal Canin Mother and Baby Cat', commercial),
    'Ração Royal Canin Mãe e Filhote Gato',
  )
  assert.equal(
    getFoodDisplayName("Hill's Prescription Diet i/d Digestive Care Peru", commercial),
    "Hill's Dieta Prescrição i/d Cuidado Digestivo Peru",
  )
})

test('ingredientes naturais continuam exibidos em português', () => {
  assert.equal(getFoodDisplayName('Whiting', natural), 'Pescada-branca')
  assert.equal(getFoodDisplayName('Cod fresco', { id: 'usda-cod-fresco-assado', foodType: 'natural' }), 'Bacalhau fresco')
})

test('busca em português encontra alimentos com nome em inglês', () => {
  const recovery = filterFoods({ query: 'recuperacao royal', foodType: 'commercial' })
  assert.ok(recovery.some((f) => f.id === 'pate-royal-canin-recovery'))

  const renal = filterFoods({ query: 'renal gato royal', foodType: 'commercial' })
  assert.ok(renal.some((f) => f.name.toLowerCase().includes('renal')))

  const digestivo = filterFoods({ query: 'digestivo hills cao', foodType: 'commercial' })
  assert.ok(digestivo.some((f) => f.name.toLowerCase().includes('digestive') || f.name.toLowerCase().includes('i/d')))

  const frango = filterFoods({ query: 'frango farmina prime', foodType: 'commercial' })
  assert.ok(frango.some((f) => f.name.toLowerCase().includes('chicken')))

  const obesidade = filterFoods({ query: 'obesidade premier', foodType: 'commercial' })
  assert.ok(obesidade.some((f) => f.id.includes('premier-nc') && f.id.includes('obesidade')))

  const maeFilhote = filterFoods({ query: 'mae filhote royal gato', foodType: 'commercial' })
  assert.ok(maeFilhote.some((f) => f.id === 'racao-royal-canin-mother-and-baby-cat'))

  const racao = filterFoods({ query: 'racao renal', foodType: 'commercial' })
  assert.ok(racao.some((f) => f.name.toLowerCase().includes('renal')))
})

test('busca em inglês continua funcionando', () => {
  const results = filterFoods({ query: 'recovery mousse', foodType: 'commercial' })
  assert.ok(results.some((f) => f.id === 'pate-royal-canin-recovery'))
})

test('busca por marca não expande para termos genéricos', () => {
  const guabi = filterFoods({ query: 'guabi' })
  assert.ok(!guabi.some((f) => f.id === 'agua'), 'guabi não deve retornar Água')
  assert.ok(!guabi.some((f) => f.name.toLowerCase().includes('maizena')))

  const natural = filterFoods({ query: 'natural', foodType: 'commercial' })
  assert.ok(natural.some((f) => f.name.toLowerCase().includes('natural')))
})
