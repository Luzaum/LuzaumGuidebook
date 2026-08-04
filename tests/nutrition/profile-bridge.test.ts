import assert from 'node:assert/strict'
import test from 'node:test'
import {
  BOOK_ENERGY_TO_REQUIREMENT_PROFILE,
  mapComorbiditySelectionsToTherapeuticProfilesBridge,
  mapSacnProfileIdsToTherapeutic,
  resolveRequirementProfileIdForEnergyState,
} from '../../modules/energia-vet/lib/profileBridge'

test('perfil energético do livro mapeia exigência FEDIAF correta', () => {
  assert.equal(BOOK_ENERGY_TO_REQUIREMENT_PROFILE.dog_adult_neutered, 'fediaf-dog-adult-95-1000kcal')
  assert.equal(BOOK_ENERGY_TO_REQUIREMENT_PROFILE.cat_kitten, 'fediaf-cat-growth-1000kcal')
  assert.equal(
    resolveRequirementProfileIdForEnergyState('dog', 'dog_adult_neutered', true),
    'fediaf-dog-adult-95-1000kcal',
  )
})

test('comorbidade renal mapeia perfis terapêuticos V2 via SACN', () => {
  const profiles = mapSacnProfileIdsToTherapeutic(['sacn-doenca-renal-cronica-caes-ms'])
  assert.ok(profiles.includes('renal_ckd_dog'))
})

test('comorbidade pancreatite obesa mapeia perda de peso + pancreatite', () => {
  const profiles = mapSacnProfileIdsToTherapeutic(['sacn-pancreatite-aguda-e-cronica-caes-obeso-ms'])
  assert.ok(profiles.includes('pancreatitis_dog'))
  assert.ok(profiles.includes('weight_loss_dog'))
})

test('picker de comorbidade resolve perfis terapêuticos pelo id SACN', () => {
  const profiles = mapComorbiditySelectionsToTherapeuticProfilesBridge('dog', ['dog:doen-a-renal-cr-nica-c-es'])
  assert.ok(profiles.includes('renal_ckd_dog'))
})
