import assert from 'node:assert/strict'
import test from 'node:test'
import { buildFullClinicalSnapshot } from '../../modules/energia-vet/lib/clinicalSnapshotBuilder'
import { isDietTransitionValid } from '../../modules/energia-vet/components/DietTransitionSection'
import { isHydrationPlanValid } from '../../modules/energia-vet/components/HydrationPlanSection'
import { isParenteralReviewConfirmed } from '../../modules/energia-vet/components/ParenteralNutritionSection'
import { buildTransitionPlan, validateTransitionDayPercents } from '../../modules/energia-vet/lib/hospital-nutrition/transitionEngine'
import { REPORT_V4_SAMPLE } from './fixtures/report-v4-sample'

test('validação transição — plano padrão 7 dias', () => {
  assert.equal(isDietTransitionValid({ enabled: true, previousKcalPerGram: 3.5, durationDays: 7 }), true)
})

test('validação transição — percentuais inválidos bloqueiam', () => {
  assert.equal(
    validateTransitionDayPercents([{ day: 1, previousDietPercent: 80, newDietPercent: 10 }]),
    'A soma das dietas neste dia deve ser igual a 100%.',
  )
  assert.equal(
    isDietTransitionValid({
      enabled: true,
      previousKcalPerGram: 3,
      planMode: 'custom',
      customRows: [{ day: 1, previousDietPercent: 80, newDietPercent: 10 }],
    }),
    false,
  )
})

test('mudança imediata ambulatorial exige justificativa', () => {
  assert.equal(
    isDietTransitionValid({
      enabled: true,
      previousKcalPerGram: 3,
      specialSituation: 'immediate',
    }),
    false,
  )
  assert.equal(
    isDietTransitionValid(
      {
        enabled: true,
        previousKcalPerGram: 3,
        specialSituation: 'immediate',
        immediateJustification: 'Intolerância grave documentada',
      },
      false,
    ),
    true,
  )
})

test('hidratação manual inválida sem justificativa', () => {
  assert.equal(isHydrationPlanValid({ selectedMethod: 'manual', manualTargetMlDay: 400 }), false)
  assert.equal(
    isHydrationPlanValid({
      selectedMethod: 'manual',
      manualTargetMlDay: 400,
      manualReason: 'Poliúria',
    }),
    true,
  )
})

test('confirmação profissional parenteral', () => {
  assert.equal(isParenteralReviewConfirmed({}), false)
  assert.equal(isParenteralReviewConfirmed({ parenteralReviewConfirmed: true }), true)
})

test('imutabilidade snapshot — transição e hidratação persistidas', () => {
  const report = {
    ...REPORT_V4_SAMPLE,
    diet: {
      ...REPORT_V4_SAMPLE.diet,
      dietTransition: {
        enabled: true,
        previousDietName: 'Anterior',
        previousKcalPerGram: 3.6,
        durationDays: 7,
      },
      hydrationPlan: {
        selectedMethod: 'energy_based' as const,
        voluntarilyConsumedWaterKnown: false,
      },
    },
  }
  const first = buildFullClinicalSnapshot({ report })
  const second = buildFullClinicalSnapshot({ report })
  assert.deepEqual(first.transitionPlan?.rows, second.transitionPlan?.rows)
  assert.equal(first.hydrationPlan?.voluntarilyConsumedWaterMlDay, undefined)
})

test('PDF snapshot — transição com gramas práticas', () => {
  const result = buildTransitionPlan({
    targetKcalDay: 600,
    previousDiet: { name: 'A', kcalPerGram: 3.5 },
    newDiet: { name: 'B', kcalPerGram: 4, prescribedGramsPerDay: 150 },
    durationDays: 7,
  })
  assert.ok(!('error' in result))
  if ('error' in result) return
  assert.ok(result.rows[0].previousDietGramsPractical > 0)
  assert.ok(result.rows[0].newDietGramsPractical > 0)
})

const FORBIDDEN_UI_TERMS = [
  'supabase',
  'migration',
  'rls',
  'checksum',
  'payload',
  'snapshot',
  'queue',
  'queued',
  'syncing',
  'engine',
  'feature flag',
  'localstorage',
  'jsonb',
]

test('termos proibidos ausentes nos componentes clínicos', () => {
  const clinicalStrings = [
    'Transição alimentar',
    'Água e hidratação nutricional',
    'Nutrição parenteral — fluxo profissional',
    'Esta estimativa nutricional não substitui',
    'Revisei os componentes, concentrações',
    'Salvo neste dispositivo',
    'Salvo com segurança',
  ].join(' ').toLowerCase()

  for (const term of FORBIDDEN_UI_TERMS) {
    assert.ok(!clinicalStrings.includes(term), `termo proibido encontrado: ${term}`)
  }
})
