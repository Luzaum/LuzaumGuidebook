import assert from 'node:assert/strict'
import test from 'node:test'
import { REPORT_V4_SAMPLE } from './fixtures/report-v4-sample'

/** Congela compatibilidade de abertura de relatórios v4 sem campo schemaVersion. */
test('relatório v4 não possui schemaVersion (legado)', () => {
  const report = REPORT_V4_SAMPLE as Record<string, unknown>
  assert.equal(report.schemaVersion, undefined)
  assert.equal(report.provenance, undefined)
})

test('relatório v4 preserva campos essenciais para reabertura', () => {
  assert.equal(REPORT_V4_SAMPLE.patient.species, 'dog')
  assert.equal(REPORT_V4_SAMPLE.energy.stateId, 'dog_adult_low_activity')
  assert.equal(REPORT_V4_SAMPLE.diet.dietType, 'commercial')
  assert.equal(REPORT_V4_SAMPLE.formula.feedingPlan.mealsPerDay, 2)
})

test('relatório v4 — energia e dieta numéricas válidas', () => {
  assert.ok((REPORT_V4_SAMPLE.energy.mer ?? 0) > 0)
  assert.ok((REPORT_V4_SAMPLE.diet.totalAsFedGrams ?? 0) > 0)
  for (const meal of REPORT_V4_SAMPLE.formula.feedingPlan.meals) {
    assert.ok(meal.gramsAsFed >= 0)
    assert.ok(!Number.isNaN(meal.gramsAsFed))
  }
})
