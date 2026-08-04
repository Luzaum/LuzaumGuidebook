import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildHydrationPlanPreview,
  validateManualHydrationTarget,
} from '../../modules/energia-vet/lib/nutrition-calculations/hydrationPlanEngine'
import { WATER_DISCLAIMER } from '../../modules/energia-vet/lib/nutrition-calculations/waterEngine'

test('método energético calcula meta e água alimentar', () => {
  const preview = buildHydrationPlanPreview({
    species: 'dog',
    prescribedKcalDay: 700,
    rerKcalDay: 400,
    config: { selectedMethod: 'energy_based' },
    foodGrams: 200,
    moisturePct: 75,
    proteinGrams: 40,
    fatGrams: 20,
    carbGrams: 50,
  })
  assert.ok(preview)
  assert.equal(preview!.selectedTargetMlDay, 700)
  assert.ok(preview!.foodWaterMlDay != null && preview!.foodWaterMlDay > 0)
  assert.ok(preview!.metabolicWaterMlDay != null && preview!.metabolicWaterMlDay > 0)
})

test('método por espécie usa RER felino', () => {
  const preview = buildHydrationPlanPreview({
    species: 'cat',
    prescribedKcalDay: 300,
    rerKcalDay: 200,
    config: { selectedMethod: 'species_based' },
    foodGrams: 100,
    moisturePct: 10,
    proteinGrams: 20,
    fatGrams: 10,
    carbGrams: 15,
  })
  assert.ok(preview)
  assert.equal(preview!.selectedTargetMlDay, 240)
})

test('meta manual exige justificativa', () => {
  assert.equal(
    validateManualHydrationTarget({ selectedMethod: 'manual', manualTargetMlDay: 500 }),
    'Justificativa clínica obrigatória para meta manual.',
  )
  assert.equal(
    validateManualHydrationTarget({
      selectedMethod: 'manual',
      manualTargetMlDay: 500,
      manualReason: 'Poliúria compensatória',
    }),
    null,
  )
})

test('água voluntária desconhecida permanece null', () => {
  const preview = buildHydrationPlanPreview({
    species: 'dog',
    prescribedKcalDay: 500,
    rerKcalDay: 350,
    config: { selectedMethod: 'energy_based', voluntarilyConsumedWaterKnown: false },
    foodGrams: 150,
    moisturePct: 10,
    proteinGrams: 30,
    fatGrams: 15,
    carbGrams: 40,
  })
  assert.ok(preview)
  assert.equal(preview!.voluntarilyConsumedWaterMlDay, null)
})

test('água voluntária medida entra no gap', () => {
  const preview = buildHydrationPlanPreview({
    species: 'dog',
    prescribedKcalDay: 500,
    rerKcalDay: 350,
    config: {
      selectedMethod: 'energy_based',
      voluntarilyConsumedWaterKnown: true,
      voluntarilyConsumedWaterMlDay: 200,
    },
    foodGrams: 150,
    moisturePct: 10,
    proteinGrams: 30,
    fatGrams: 15,
    carbGrams: 40,
  })
  assert.ok(preview)
  assert.equal(preview!.voluntarilyConsumedWaterMlDay, 200)
})

test('método none retorna null', () => {
  const preview = buildHydrationPlanPreview({
    species: 'dog',
    prescribedKcalDay: 500,
    rerKcalDay: 350,
    config: { selectedMethod: 'none' },
    foodGrams: 150,
    moisturePct: 10,
    proteinGrams: 30,
    fatGrams: 15,
    carbGrams: 40,
  })
  assert.equal(preview, null)
})

test('disclaimer de fluidoterapia presente', () => {
  const preview = buildHydrationPlanPreview({
    species: 'dog',
    prescribedKcalDay: 500,
    rerKcalDay: 350,
    config: { selectedMethod: 'energy_based' },
    foodGrams: 150,
    moisturePct: 10,
    proteinGrams: 30,
    fatGrams: 15,
    carbGrams: 40,
  })
  assert.ok(preview)
  assert.equal(preview!.disclaimer, WATER_DISCLAIMER)
})

test('alertas clínicos sem calcular reposição automática', () => {
  const preview = buildHydrationPlanPreview({
    species: 'dog',
    prescribedKcalDay: 500,
    rerKcalDay: 350,
    config: { selectedMethod: 'energy_based' },
    foodGrams: 150,
    moisturePct: 10,
    proteinGrams: 30,
    fatGrams: 15,
    carbGrams: 40,
    clinicalFlags: { vomiting: true, diarrhea: true },
  })
  assert.ok(preview!.alerts.length >= 2)
})
