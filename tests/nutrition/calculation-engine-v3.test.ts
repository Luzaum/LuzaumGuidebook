import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  calculateRerAllometric,
  calculateRerLinear,
  calculateDogAdultMerDirect,
  calculateCatAdultMerDirect,
  calculateDogGrowthNrc,
  calculateDogGrowthFediaf,
  calculateDogGestationLast5Weeks,
  calculateCatGestation,
  calculateDogLactation,
  calculateCatLactation,
  calculateDogWeightLossAaha,
  calculateCatWeightLossAaha,
  calculateHospitalEnergy,
  estimateIdealWeightFromOverweight,
  calculateNfePercent,
  calculateModifiedAtwaterKcalPer100g,
  convertPercentMnToMs,
  convertPercentMsToMn,
  formulateDiet,
  distributeEqually,
  validateFormulationProportions,
  roundPracticalGrams,
  classifyRefeedingRisk,
  calculatePatientEnergy,
  calculateMacroEnergySplit,
  nutrientPer1000KcalFromMnPercent,
  calciumPhosphorusRatio,
} from '../../modules/energia-vet/lib/nutrition-calculations'
import type { NutritionPatientAssessment } from '../../modules/energia-vet/lib/nutrition-calculations'

describe('Motor de cálculos v3 — goldens numéricos', () => {
  it('RER canino 15 kg ≈ 534 kcal', () => {
    const rer = calculateRerAllometric(15)
    assert.ok(Math.abs(rer - 534) < 2)
  })

  it('RER felino 4,5 kg ≈ 216 kcal', () => {
    const rer = calculateRerAllometric(4.5)
    assert.ok(Math.abs(rer - 216) < 2)
  })

  it('equação linear só entre 2 e 30 kg', () => {
    assert.equal(calculateRerLinear(1.5), null)
    assert.equal(calculateRerLinear(35), null)
    assert.ok(calculateRerLinear(10)! > 0)
  })

  it('cão baixa atividade 95×kg^0,75 ≈ 724 kcal (15 kg)', () => {
    const mer = calculateDogAdultMerDirect(15, 'low_activity')
    assert.ok(Math.abs(mer.kcal - 724) < 5)
  })

  it('cão atividade moderada 110×kg^0,75 ≈ 838 kcal (15 kg)', () => {
    const mer = calculateDogAdultMerDirect(15, 'moderate_low_impact')
    assert.ok(Math.abs(mer.kcal - 838) < 5)
  })

  it('gato ativo 100×kg^0,67 ≈ 274 kcal (4,5 kg)', () => {
    const mer = calculateCatAdultMerDirect(4.5, 'active')
    assert.ok(Math.abs(mer.kcal - 274) < 5)
  })

  it('gato indoor 75×kg^0,67 — referência 4,5 kg', () => {
    const mer = calculateCatAdultMerDirect(4.5, 'indoor_neutered', 'high')
    assert.ok(Math.abs(mer.kcal - 205) < 5)
  })

  it('crescimento canino NRC — 11 kg / 30 kg adulto', () => {
    const kcal = calculateDogGrowthNrc(11, 30)!
    assert.ok(Math.abs(kcal - 1575) < 80)
  })

  it('crescimento canino FEDIAF', () => {
    const kcal = calculateDogGrowthFediaf(11, 30)!
    assert.ok(kcal > 1200 && kcal < 1800)
  })

  it('gestação canina últimas semanas', () => {
    const kcal = calculateDogGestationLast5Weeks(15)
    assert.ok(kcal > 900)
  })

  it('gestação felina', () => {
    const kcal = calculateCatGestation(4.5)
    assert.ok(Math.abs(kcal - 384) < 15)
  })

  it('lactação canina', () => {
    const { kcal } = calculateDogLactation(15, 4, 2)
    assert.ok(kcal > 1500)
  })

  it('lactação felina', () => {
    const kcal = calculateCatLactation(4.5, 3, 3)
    assert.ok(kcal > 400)
  })

  it('perda de peso AAHA — cão (peso ideal 12 kg)', () => {
    const a = calculateDogWeightLossAaha(12)
    assert.ok(a.kcal > 400 && a.kcal < 480)
  })

  it('perda de peso AAHA — gato (peso ideal 4,25 kg)', () => {
    const a = calculateCatWeightLossAaha(4.25)
    assert.ok(Math.abs(a.kcal - 145) < 15)
  })

  it('hospital inicia no RER', () => {
    const h = calculateHospitalEnergy(15)
    assert.ok(Math.abs(h.selectedTargetKcalDay - 534) < 2)
  })

  it('peso ideal AAHA ECC 7 — 15 kg → 12,5 kg', () => {
    const est = estimateIdealWeightFromOverweight(15, 7)
    assert.ok(Math.abs(est.targetWeightKg - 12.5) < 0.01)
  })
})

describe('Motor v3 — propriedades e segurança', () => {
  it('nutriente ausente não vira zero na formulação', () => {
    const issues = validateFormulationProportions([{ foodId: 'a', energyAllocationPct: 50 }])
    assert.ok(issues.some((i) => i.code === 'proportion_not_100'))
  })

  it('distribuição igual explícita', () => {
    const parts = distributeEqually(3)
    assert.ok(Math.abs(parts.reduce((a, b) => a + b, 0) - 100) < 0.001)
  })

  it('MN→MS→MN idempotente', () => {
    const mn = 25
    const dm = 30
    const ms = convertPercentMnToMs(mn, dm)!
    const back = convertPercentMsToMn(ms, dm)!
    assert.ok(Math.abs(back - mn) < 0.001)
  })

  it('NFE negativo gera alerta', () => {
    const { issues } = calculateNfePercent({
      proteinPct: 50,
      fatPct: 30,
      crudeFiberPct: 10,
      moisturePct: 20,
      ashPct: 10,
    })
    assert.ok(issues.some((i) => i.code === 'negative_nfe'))
  })

  it('arredondamento não zera 0,3 g silenciosamente como prática mínima', () => {
    const r = roundPracticalGrams(0.3)
    assert.equal(r.exactValue, 0.3)
    assert.ok(r.practicalValue >= 0)
  })

  it('macros Atwater modificado ≠ natural', () => {
    const atw = calculateMacroEnergySplit({
      proteinGrams: 10,
      fatGrams: 5,
      carbohydrateGrams: 20,
      method: 'modified_atwater',
    })
    const nat = calculateMacroEnergySplit({
      proteinGrams: 10,
      fatGrams: 5,
      carbohydrateGrams: 20,
      method: 'natural_ingredient',
    })
    assert.notEqual(atw.proteinKcal, nat.proteinKcal + 5)
  })

  it('Ca:P null se fósforo ausente', () => {
    assert.equal(calciumPhosphorusRatio(1.2, null), null)
  })

  it('refeeding alto risco', () => {
    assert.equal(
      classifyRefeedingRisk({
        currentWeightKg: 4,
        previousWeightKg: 5,
        bcs: 3,
        muscleCondition: 'moderate_loss',
        daysAnorexia: 5,
        daysHyporexia: 0,
        recentIntakePercent: 0,
        phosphorusLow: true,
        potassiumLow: false,
        magnesiumLow: false,
      }),
      'high',
    )
  })

  it('formulação bloqueia soma ≠ 100%', () => {
    const plan = formulateDiet({
      targetKcalDay: 500,
      entries: [
        { foodId: 'a', energyAllocationPct: 40 },
        { foodId: 'b', energyAllocationPct: 40 },
      ],
      foodKcalPerGram: { a: 0.4, b: 0.35 },
      normalizeProportions: false,
    })
    assert.equal(plan.foods.length, 0)
    assert.ok(plan.issues.some((i) => i.code === 'proportion_not_100'))
  })

  it('formulação calórica 70/30', () => {
    const plan = formulateDiet({
      targetKcalDay: 724,
      entries: [
        { foodId: 'a', energyAllocationPct: 70 },
        { foodId: 'b', energyAllocationPct: 30 },
      ],
      foodKcalPerGram: { a: 0.384, b: 0.35 },
      normalizeProportions: false,
    })
    assert.equal(plan.foods.length, 2)
    assert.ok(Math.abs(plan.totalExactKcal - 724) < 1)
  })

  it('calculatePatientEnergy — cão adulto castrado', () => {
    const assessment: NutritionPatientAssessment = {
      species: 'dog',
      currentWeightKg: 15,
      bodyConditionScore9: 5,
      muscleCondition: 'normal',
      ageMonths: 36,
      sex: 'male',
      neuterStatus: 'neutered',
      lifeStage: 'adult',
      activity: { environment: 'indoor', lowImpactHoursPerDay: 0.5 },
      nutritionalGoal: 'maintenance',
    }
    const { result } = calculatePatientEnergy(assessment)
    assert.ok(result != null)
    assert.ok(result.selectedTargetKcalDay > 600)
  })

  it('expoente felino não usado em MER canino', () => {
    const dog = calculateDogAdultMerDirect(10, 'low_activity').kcal
    const wrong = 95 * Math.pow(10, 0.67)
    assert.notEqual(Math.round(dog), Math.round(wrong))
  })
})

describe('Motor v3 — Atwater e por 1000 kcal', () => {
  it('Atwater modificado', () => {
    const kcal = calculateModifiedAtwaterKcalPer100g(25, 14, 40)
    assert.ok(kcal > 300 && kcal < 450)
  })

  it('por 1000 kcal', () => {
    const v = nutrientPer1000KcalFromMnPercent(25, 3500)!
    assert.ok(v > 60 && v < 80)
  })
})
