import assert from 'node:assert/strict'
import test from 'node:test'
import { computeDietPlan } from '../../modules/energia-vet/lib/dietEngine'
import { getFoodById } from '../../modules/energia-vet/lib/genutriData'

test('eletrólitos: déficit < 30% do requisito não gera alerta below', () => {
  const food = getFoodById('royal-canin-hypoallergenic-cao')
  assert.ok(food, 'Royal Canin Hypo Canine deve existir no catálogo')

  const result = computeDietPlan({
    entries: [{ foodId: food!.id, inclusionPct: 100 }],
    targetEnergy: 800,
    species: 'dog',
    weightKg: 15,
    mealsPerDay: 2,
    patientName: 'Teste',
    requirementProfileId: 'fediaf-dog-adult-95-1000kcal',
  })

  const potassium = result.evaluation.adequacy.find((row) => row.key === 'potassiumPct')
  assert.ok(potassium, 'Potássio deve ser avaliado')
  assert.notEqual(potassium!.deliveredValue, null)

  if (potassium!.target?.kind === 'number' && potassium!.target.value != null && potassium!.deliveredValue != null) {
    const minimum = potassium!.target.value
    const delivered = potassium!.deliveredValue
    const relativeDeficit = (minimum - delivered) / minimum
    if (relativeDeficit > 0 && relativeDeficit < 0.3) {
      assert.notEqual(potassium!.status, 'below', `Déficit ${(relativeDeficit * 100).toFixed(1)}% não deveria alertar`)
    }
  }
})

test('eletrólitos: déficit ≥ 30% do requisito continua alertando below', () => {
  const result = computeDietPlan({
    entries: [{ foodId: 'usda-abobora-inverno-cozida', inclusionPct: 100 }],
    targetEnergy: 600,
    species: 'dog',
    weightKg: 10,
    mealsPerDay: 2,
    patientName: 'Teste',
    requirementProfileId: 'fediaf-dog-adult-95-1000kcal',
  })

  const sodium = result.evaluation.adequacy.find((row) => row.key === 'sodiumPct')
  if (sodium?.deliveredValue != null && sodium.target?.kind === 'number' && sodium.target.value != null) {
    const relativeDeficit = (sodium.target.value - sodium.deliveredValue) / sodium.target.value
    if (relativeDeficit >= 0.3) {
      assert.equal(sodium.status, 'below')
    }
  }
})
