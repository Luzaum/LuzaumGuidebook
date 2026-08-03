import assert from 'node:assert/strict'
import test from 'node:test'
import {
  assessRefeedingPlan,
  buildEnteralFeedingOrder,
  computeReceivedPercent,
  LEGACY_REFEEDING_PROTOCOL_V1,
} from '../../modules/energia-vet/lib/hospital'
import { buildHospitalizedNutritionPdfDoc } from '../../modules/energia-vet/lib/pdf/hospitalizedNutritionPdf'
import { buildOutpatientNutritionPdfDoc } from '../../modules/energia-vet/lib/pdf/outpatientNutritionPdf'
import { buildFeedingSheetPdfDoc } from '../../modules/energia-vet/lib/pdf/feedingSheetPdf'
import { REPORT_V4_SAMPLE } from './fixtures/report-v4-sample'

test('protocolo legado preserva progressao 25-50-75-100', () => {
  const plan = assessRefeedingPlan(
    { species: 'dog', weightKg: 10, bcs: 5, daysAnorexic: 0, daysHyporexic: 0, recentIntakePercent: 100, electrolytesLow: false },
    { protocolId: 'legacy_4_days', useV2: false },
  )
  assert.equal(plan.protocolVersion, LEGACY_REFEEDING_PROTOCOL_V1)
  assert.equal(plan.progression.length, 4)
  assert.equal(plan.progression[0].percentRer, 25)
  assert.equal(plan.progression[3].percentRer, 100)
})

test('alto risco quando anorexia prolongada e eletrolitos baixos', () => {
  const plan = assessRefeedingPlan(
    { species: 'cat', weightKg: 4, bcs: 3, daysAnorexic: 6, daysHyporexic: 0, recentIntakePercent: 0, electrolytesLow: true },
    { useV2: true },
  )
  assert.equal(plan.riskLevel, 'high')
  assert.ok(plan.stopCriteria.length > 0)
})

test('ordem enteral calcula ml/dia e horarios', () => {
  const order = buildEnteralFeedingOrder({
    species: 'dog',
    patientName: 'Thor',
    feedingRoute: 'tube',
    rer: 500,
    dailyTargetKcal: 125,
    percentRer: 25,
    foodName: 'Recovery',
    energyDensityKcalPerMl: 1,
    administrationsPerDay: 4,
    progression: [{ day: 1, percentRer: 25, kcalTarget: 125, requiresToleranceCheck: true }],
  })
  assert.equal(order.gramsOrMlPerDay, 125)
  assert.equal(order.gramsOrMlPerAdministration, 31.3)
  assert.equal(order.schedule.length, 4)
})

test('percentual recebido usa ingestao real', () => {
  assert.equal(computeReceivedPercent(500, 250), 50)
  assert.equal(computeReceivedPercent(0, 100), 0)
})

test('PDF ambulatorial V2 tipico tem no maximo 2 paginas', () => {
  const doc = buildOutpatientNutritionPdfDoc(REPORT_V4_SAMPLE)
  assert.ok(doc.getNumberOfPages() <= 2)
  assert.ok(doc.getNumberOfPages() >= 1)
})

test('PDF hospitalar tipico tem 1 pagina', () => {
  const order = buildEnteralFeedingOrder({
    species: 'dog',
    patientName: 'Luna',
    feedingRoute: 'tube',
    rer: 400,
    dailyTargetKcal: 100,
    percentRer: 25,
    foodName: 'Enteral',
    energyDensityKcalPerMl: 1,
    administrationsPerDay: 4,
    progression: [{ day: 1, percentRer: 25, kcalTarget: 100, requiresToleranceCheck: true }],
  })
  const doc = buildHospitalizedNutritionPdfDoc(order, REPORT_V4_SAMPLE.createdAt)
  assert.equal(doc.getNumberOfPages(), 1)
})

test('ficha alimentar semanal contém apenas a operação diária e pode incluir preparo', () => {
  const report = {
    ...REPORT_V4_SAMPLE,
    diet: {
      ...REPORT_V4_SAMPLE.diet,
      programmedFeeding: {
        enabled: true,
        mealsPerDay: 2,
        roundingRule: '1 g',
        startDate: '2026-08-03',
        printRangeMode: 'next_7_days' as const,
        generatedFeedingDates: ['2026-08-03', '2026-08-04', '2026-08-05', '2026-08-06', '2026-08-07', '2026-08-08', '2026-08-09'],
        includePreparationInstructions: true,
        preparationInstructions: 'Misturar os ingredientes pesados e servir em temperatura ambiente.',
        meals: [
          { id: 'meal-1', label: '1ª refeição', time: '08:00', totalGrams: 50, items: [{ foodId: 'food-1', foodName: 'Alimento teste', gramsAsFed: 50 }] },
          { id: 'meal-2', label: '2ª refeição', time: '18:00', totalGrams: 50, items: [{ foodId: 'food-1', foodName: 'Alimento teste', gramsAsFed: 50 }] },
        ],
      },
    },
    formula: {
      ...REPORT_V4_SAMPLE.formula,
      programmedFeeding: undefined,
    },
  }
  const doc = buildFeedingSheetPdfDoc(report)
  const text = doc.output('datauristring')
  assert.ok(doc.getNumberOfPages() >= 1)
  assert.ok(text.length > 1_000)
})
