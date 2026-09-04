import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  lifeStageMatchesDdxRule,
  normalizeLifeStageForDdx,
  normalizeSpeciesForDdx,
  speciesMatchesDdxRule,
  temporalPatternMatchesRule,
} from '../ddxNormalization.ts'

describe('ddxNormalization', () => {
  it('mapeia espécie dog/cat para CAO/GATO', () => {
    assert.equal(normalizeSpeciesForDdx('dog'), 'CAO')
    assert.equal(normalizeSpeciesForDdx('cat'), 'GATO')
    assert.equal(speciesMatchesDdxRule('dog', ['CAO']), true)
    assert.equal(speciesMatchesDdxRule('cat', ['CAO']), false)
  })

  it('mapeia faixa etária geriatric para GERIATRICO', () => {
    assert.equal(normalizeLifeStageForDdx('geriatric'), 'GERIATRICO')
    assert.equal(lifeStageMatchesDdxRule('geriatric', ['GERIATRICO', 'ADULTO']), true)
    assert.equal(lifeStageMatchesDdxRule('pediatric', ['GERIATRICO']), false)
  })

  it('casa curso temporal peragudo com PERAGUDO', () => {
    assert.equal(temporalPatternMatchesRule('peragudo', ['PERAGUDO', 'AGUDO']), true)
    assert.equal(temporalPatternMatchesRule('cronico', ['PERAGUDO']), false)
  })
})
