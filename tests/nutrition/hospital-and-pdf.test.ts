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
