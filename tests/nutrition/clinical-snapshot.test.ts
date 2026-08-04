import assert from 'node:assert/strict'
import test from 'node:test'
import { buildFullClinicalSnapshot } from '../../modules/energia-vet/lib/clinicalSnapshotBuilder'
import { computeSnapshotChecksum, verifySnapshotChecksum } from '../../modules/energia-vet/lib/sync/checksum'
import { toCanonicalSnapshotJson } from '../../modules/energia-vet/lib/sync/canonicalSnapshot'
import { REPORT_V4_SAMPLE } from './fixtures/report-v4-sample'

const baseReport = {
  ...REPORT_V4_SAMPLE,
  formula: {
    ...REPORT_V4_SAMPLE.formula,
    evaluation: {
      ...REPORT_V4_SAMPLE.formula.evaluation,
      macroSplit: [
        { key: 'protein' as const, label: 'Proteína', grams: 50, kcal: 200, percent: 30, color: '#000' },
        { key: 'fat' as const, label: 'Gordura', grams: 30, kcal: 270, percent: 40, color: '#000' },
        { key: 'carb' as const, label: 'Carboidrato', grams: 60, kcal: 240, percent: 30, color: '#000' },
      ],
    },
  },
}

test('snapshot inclui transição com gramas quando habilitada', () => {
  const report = {
    ...baseReport,
    diet: {
      ...baseReport.diet,
      dietTransition: {
        enabled: true,
        previousDietName: 'Ração anterior',
        previousKcalPerGram: 3.6,
        durationDays: 7,
      },
    },
  }
  const clinical = buildFullClinicalSnapshot({ report })
  assert.ok(clinical.transitionPlan?.enabled)
  assert.equal(clinical.transitionPlan?.rows.length, 7)
  assert.ok(clinical.transitionPlan!.rows[0].previousDietGramsPractical > 0)
  assert.ok(clinical.transitionPlan!.rows[0].newDietGramsPractical > 0)
})

test('snapshot inclui hidratação com água alimentar e metabólica', () => {
  const clinical = buildFullClinicalSnapshot({ report: baseReport })
  assert.ok(clinical.hydrationPlan)
  assert.ok(clinical.hydrationPlan!.estimates.selectedTargetMlDay != null)
  assert.ok(clinical.hydrationPlan!.foodWaterMlDay != null)
  assert.ok(clinical.hydrationPlan!.metabolicWaterMlDay != null)
  assert.match(clinical.hydrationPlan!.disclaimer, /fluidoterapia/i)
})

test('snapshot hospitalar inclui enteral e realimentação', () => {
  const report = {
    ...baseReport,
    patient: { ...baseReport.patient, isHospitalized: true },
    hospital: {
      feedingRoute: 'tube' as const,
      energyDensityKcalPerMl: 1,
      administrationMode: 'bolus' as const,
      deliveredKcalDay: 300,
      daysAnorexic: 4,
      recentIntakePercent: 20,
      progressionProtocol: '4_days' as const,
    },
    energy: { ...baseReport.energy, rer: 500 },
    target: { ...baseReport.target, targetEnergy: 350 },
  }
  const clinical = buildFullClinicalSnapshot({ report })
  assert.ok(clinical.enteralPlan)
  assert.equal(clinical.enteralPlan!.prescribedMlDay, 350)
  assert.ok(clinical.refeedingPlan)
  assert.ok(clinical.refeedingPlan!.days.length >= 3)
})

test('snapshot parenteral não aparece em via oral', () => {
  const clinical = buildFullClinicalSnapshot({ report: baseReport })
  assert.equal(clinical.parenteralPlan, undefined)
})

test('checksum determinístico e verificável', () => {
  const clinical = buildFullClinicalSnapshot({ report: baseReport })
  const a = computeSnapshotChecksum(clinical)
  const b = computeSnapshotChecksum(JSON.parse(toCanonicalSnapshotJson(clinical)))
  assert.equal(a, b)
  assert.ok(verifySnapshotChecksum(clinical, a))
})

test('nutriente ausente permanece como Não informado', () => {
  const report = {
    ...baseReport,
    formula: {
      ...baseReport.formula,
      evaluation: {
        ...baseReport.formula.evaluation,
        adequacy: [
          {
            key: 'potassiumPct',
            label: 'Potássio',
            profileId: 'renal',
            deliveredValue: null,
            unit: 'g/dia',
            status: 'insufficient_data' as const,
            reason: 'Dados insuficientes',
            basisType: 'per1000kcal' as const,
            target: null,
            missingData: true,
          },
        ],
      },
    },
  }
  const clinical = buildFullClinicalSnapshot({ report })
  const row = clinical.nutrientAssessment?.adequacyRows.find((r) => r.nutrient === 'Potássio')
  assert.equal(row?.delivered, 'Não informado')
})
