import assert from 'node:assert/strict'
import test from 'node:test'
import { buildNutrientGapAdvice } from '../../modules/energia-vet/lib/nutrientGapAdvice'
import { getNutrientDisplayLabel, getNutrientDisplayUnit } from '../../modules/energia-vet/lib/nutrientDisplayUtils'
import type { EvaluatedNutrient, FoodContribution } from '../../modules/energia-vet/types'

const aboboraAbacaxiContributions: FoodContribution[] = [
  {
    foodId: 'usda-abobora-inverno-cozida',
    foodName: 'Abóbora de inverno',
    inclusionPct: 50,
    gramsAsFed: 100,
    gramsDryMatter: 13.4,
    deliveredKcal: 42,
  },
  {
    foodId: 'taco-164-abacaxi-cru',
    foodName: 'Abacaxi, cru',
    inclusionPct: 50,
    gramsAsFed: 100,
    gramsDryMatter: 14.77,
    deliveredKcal: 48.3,
  },
]

function makeRow(partial: Partial<EvaluatedNutrient> & Pick<EvaluatedNutrient, 'key' | 'basisType' | 'profileId'>): EvaluatedNutrient {
  return {
    label: partial.label ?? 'Proteína Bruta (% MS)',
    unit: partial.unit ?? 'g/1000 kcal',
    profileLabel: partial.profileLabel ?? 'Referência nutricional - cão adulto com baixa atividade',
    deliveredValue: partial.deliveredValue ?? 19.62,
    target: partial.target ?? { kind: 'number', value: 52.1, raw: '52.1' },
    status: 'below',
    reason: 'Abaixo do mínimo',
    missingData: false,
    ...partial,
  }
}

test('getNutrientDisplayUnit usa g/1000 kcal para proteína na base por 1000 kcal', () => {
  assert.equal(getNutrientDisplayUnit('crudeProteinPct', 'per_1000kcal', '%'), 'g/1000 kcal')
  assert.equal(getNutrientDisplayLabel('Proteína Bruta (%)', 'per_1000kcal'), 'Proteína Bruta (por 1000 kcal ME)')
})

test('getNutrientDisplayUnit mantém % MS na base percent_dm', () => {
  assert.equal(getNutrientDisplayUnit('crudeProteinPct', 'percent_dm', '%'), '%')
  assert.equal(getNutrientDisplayLabel('Proteína Bruta (%)', 'percent_dm'), 'Proteína Bruta (% MS)')
})

test('buildNutrientGapAdvice não sugere microajuste abóbora/abacaxi quando referência está longe', () => {
  const row = makeRow({
    key: 'crudeProteinPct',
    basisType: 'per_1000kcal',
    profileId: 'fediaf-dog-adult-95-1000kcal',
    label: 'Proteína Bruta (por 1000 kcal ME)',
    unit: 'g/1000 kcal',
  })

  const advice = buildNutrientGapAdvice(row, aboboraAbacaxiContributions)

  assert.match(advice.referenceLabel, /52\.1 g\/1000 kcal/)
  assert.match(advice.deliveredLabel, /g\/1000 kcal/)
  assert.match(advice.gapLabel, /por 1000 kcal/)
  assert.ok(advice.formulationIdeas.some((idea) => idea.includes('redistribuir proporções não fecha')))
  assert.equal(
    advice.formulationIdeas.some((idea) => idea.includes('Considere subir de 50.0%')),
    false,
  )
})

test('buildNutrientGapAdvice diferencia perfis distintos no contexto do card', () => {
  const per1000 = buildNutrientGapAdvice(
    makeRow({
      key: 'crudeProteinPct',
      basisType: 'per_1000kcal',
      profileId: 'fediaf-dog-adult-95-1000kcal',
      profileLabel: 'Referência nutricional - cão adulto com baixa atividade',
      label: 'Proteína Bruta (por 1000 kcal ME)',
      unit: 'g/1000 kcal',
    }),
    aboboraAbacaxiContributions,
  )

  const percentDm = buildNutrientGapAdvice(
    makeRow({
      key: 'crudeProteinPct',
      basisType: 'percent_dm',
      profileId: 'sacn-diabetes-caes-ms',
      profileLabel: 'Diabetes Cães - %MS',
      label: 'Proteína Bruta (% MS)',
      unit: '%',
      deliveredValue: 6.28,
      target: { kind: 'range', min: 15, max: 35, raw: '15 a 35' },
    }),
    aboboraAbacaxiContributions,
  )

  assert.match(per1000.profileContext, /por 1000 kcal/)
  assert.match(percentDm.profileContext, /%MS/)
  assert.equal(percentDm.referenceLabel, '15–35 %')
})
