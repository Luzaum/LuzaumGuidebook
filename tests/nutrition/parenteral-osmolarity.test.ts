import assert from 'node:assert/strict'
import test from 'node:test'
import {
  calculateParenteralOsmolarity,
  DEFAULT_PERIPHERAL_OSMOLARITY_LIMIT_MOSM_L,
} from '../../modules/energia-vet/lib/hospital-nutrition/parenteralOsmolarityEngine'
import { calculateParenteralNutrition } from '../../modules/energia-vet/lib/hospital-nutrition/parenteralEngine'

test('osmolaridade completa com três componentes', () => {
  const result = calculateParenteralOsmolarity({
    components: [
      { name: 'AA 8.5%', volumeMl: 100, osmolarityMosmL: 850, source: 'manufacturer' },
      { name: 'Dextrose 50%', volumeMl: 50, osmolarityMosmL: 2500, source: 'manufacturer' },
      { name: 'Lipídios 20%', volumeMl: 30, osmolarityMosmL: 260, source: 'manufacturer' },
    ],
    vascularAccess: 'central',
  })
  assert.ok(result.finalOsmolarityMosmL != null)
  assert.ok(result.finalOsmolarityMosmL! > 0)
  assert.equal(result.totalVolumeMl, 180)
})

test('dados incompletos retornam null — nunca zero', () => {
  const result = calculateParenteralOsmolarity({
    components: [
      { name: 'AA', volumeMl: 100, source: 'manual' },
      { name: 'Dextrose', volumeMl: 50, osmolarityMosmL: 2500, source: 'manufacturer' },
    ],
    vascularAccess: 'peripheral',
  })
  assert.equal(result.finalOsmolarityMosmL, null)
  assert.ok(result.alerts.some((a) => /insuficientes/i.test(a)))
})

test('limite periférico gera alerta', () => {
  const result = calculateParenteralOsmolarity({
    components: [
      { name: 'AA', volumeMl: 100, osmolarityMosmL: 1200, source: 'manufacturer' },
      { name: 'Dex', volumeMl: 100, osmolarityMosmL: 1200, source: 'manufacturer' },
    ],
    vascularAccess: 'peripheral',
    peripheralOsmolarityLimitMosmL: 900,
  })
  assert.ok(result.finalOsmolarityMosmL != null && result.finalOsmolarityMosmL > 900)
  assert.ok(result.alerts.some((a) => /acesso periférico/i.test(a)))
})

test('conversão mOsm/mL para mOsm/L', () => {
  const result = calculateParenteralOsmolarity({
    components: [{ name: 'Test', volumeMl: 100, osmolarityMosmPerMl: 1, source: 'manual' }],
    vascularAccess: 'central',
  })
  assert.equal(result.finalOsmolarityMosmL, 1000)
})

test('diluente adicional recalcula volume final', () => {
  const result = calculateParenteralOsmolarity({
    components: [{ name: 'AA', volumeMl: 100, osmolarityMosmL: 800, source: 'manufacturer' }],
    additionalDiluentMl: 100,
    additionalDiluentOsmolarityMosmL: 0,
    vascularAccess: 'central',
  })
  assert.equal(result.totalVolumeMl, 200)
  assert.equal(result.finalOsmolarityMosmL, 400)
})

test('motor parenteral integrado inclui osmolaridade', () => {
  const pn = calculateParenteralNutrition({
    currentWeightKg: 10,
    targetKcalDay: 500,
    proteinGramsPer100Kcal: 4,
    infusionHours: 24,
    vascularAccess: 'central',
  })
  assert.ok(pn.estimatedOsmolarityMosmL != null)
  assert.ok(pn.lipidGramsKgDay >= 0)
  assert.ok(pn.glucoseInfusionRateMgKgMin >= 0)
})

test('GIR alto gera alerta', () => {
  const pn = calculateParenteralNutrition({
    currentWeightKg: 2,
    targetKcalDay: 800,
    proteinGramsPer100Kcal: 4,
    infusionHours: 12,
    dextroseFraction: 0.9,
    lipidFraction: 0.1,
    vascularAccess: 'central',
  })
  assert.ok(pn.alerts.some((a) => /glicose/i.test(a)))
})

test('limite periférico padrão 900', () => {
  assert.equal(DEFAULT_PERIPHERAL_OSMOLARITY_LIMIT_MOSM_L, 900)
})
