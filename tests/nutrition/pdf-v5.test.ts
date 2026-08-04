import assert from 'node:assert/strict'
import test from 'node:test'
import { buildOutpatientNutritionPdfDoc } from '../../modules/energia-vet/lib/pdf/outpatientNutritionPdf'
import { clearNutritionFeatureOverrides, setNutritionFeatureOverride } from '../../modules/energia-vet/lib/featureFlags'
import { buildNutritionPdfV5Doc } from '../../modules/energia-vet/pdf-v5/pdfV5Document'
import { buildNutritionPdfDocumentModel, collectPdfModelStrings } from '../../modules/energia-vet/pdf-v5/reportModelBuilder'
import { assertNoForbiddenPdfTerms } from '../../modules/energia-vet/pdf-v5/pdfForbiddenTerms'
import { REPORT_V4_SAMPLE } from './fixtures/report-v4-sample'
import {
  PDF_GOLDEN_CASES,
  PDF_GOLDEN_CKD_CAT,
  PDF_GOLDEN_HEALTHY_DOG,
} from './fixtures/pdf-v5-golden'
import { buildFullClinicalSnapshot } from '../../modules/energia-vet/lib/clinicalSnapshotBuilder'

test.afterEach(() => {
  clearNutritionFeatureOverrides()
})

test('plano do tutor contém seções clínicas essenciais', () => {
  const model = buildNutritionPdfDocumentModel({ report: PDF_GOLDEN_CASES[0].report, mode: 'tutor_plan' })
  const text = collectPdfModelStrings(model)
  assert.match(text, /Thor/)
  assert.match(text, /Objetivo:/)
  assert.match(text, /Ração All Canis adultos/)
  assert.match(text, /g\/dia/)
  assert.match(text, /Refeições|08:00/)
  assert.match(text, /petiscos/i)
  assert.match(text, /água/i)
  assert.match(text, /Monitorar/)
  assert.match(text, /Advertências|Não oferecer outros alimentos/)
})

test('relatório técnico contém energia, ECC e adequação', () => {
  const report = PDF_GOLDEN_CKD_CAT
  const model = buildNutritionPdfDocumentModel({ report, mode: 'technical_report' })
  const text = collectPdfModelStrings(model)
  assert.match(text, /Necessidade energética de repouso/)
  assert.match(text, /Meta prescrita/)
  assert.match(text, /ECC/)
  assert.match(text, /Fósforo/)
  assert.match(text, /Potássio/)
  assert.match(text, /Não informado/)
  assert.match(text, /Doença renal/)
  assert.match(text, /FEDIAF/)
})

test('modelo clínico não contém termos de desenvolvimento', () => {
  for (const { report } of PDF_GOLDEN_CASES) {
    const tutor = collectPdfModelStrings(buildNutritionPdfDocumentModel({ report, mode: 'tutor_plan' }))
    const technical = collectPdfModelStrings(
      buildNutritionPdfDocumentModel({ report, mode: 'technical_report' }),
    )
    assertNoForbiddenPdfTerms(tutor, 'Plano tutor')
    assertNoForbiddenPdfTerms(technical, 'Relatório técnico')
  }
})

test('paginação: plano simples em uma página', () => {
  const doc = buildNutritionPdfV5Doc(PDF_GOLDEN_CASES[0].report, 'tutor_plan')
  assert.equal(doc.getNumberOfPages(), 1)
})

test('paginação: plano caseiro em até duas páginas', () => {
  const doc = buildNutritionPdfV5Doc(PDF_GOLDEN_CASES[2].report, 'tutor_plan')
  assert.ok(doc.getNumberOfPages() >= 1)
  assert.ok(doc.getNumberOfPages() <= 2)
})

test('paginação: relatório técnico multipágina compacto', () => {
  const doc = buildNutritionPdfV5Doc(PDF_GOLDEN_CKD_CAT, 'technical_report')
  assert.ok(doc.getNumberOfPages() >= 1)
  assert.ok(doc.getNumberOfPages() <= 4)
})

test('nutriente ausente não aparece como zero no modelo', () => {
  const model = buildNutritionPdfDocumentModel({ report: PDF_GOLDEN_CKD_CAT, mode: 'technical_report' })
  const potassium = model.nutrientRows.find((row) => row.nutrient === 'Potássio')
  assert.ok(potassium)
  assert.equal(potassium.delivered, 'Não informado')
  assert.notEqual(potassium.delivered, '0')
})

test('relatório salvo preserva clinicalRecord embutido', () => {
  const saved = PDF_GOLDEN_HEALTHY_DOG
  const modelA = buildNutritionPdfDocumentModel({ report: saved, mode: 'technical_report' })
  const altered = {
    ...saved,
    energy: { ...saved.energy, rer: 9999 },
  }
  const modelB = buildNutritionPdfDocumentModel({ report: altered, mode: 'technical_report' })
  assert.match(collectPdfModelStrings(modelA), /534/)
  assert.match(collectPdfModelStrings(modelB), /534/)
  assert.doesNotMatch(collectPdfModelStrings(modelB), /9999/)
})

test('flag desligada mantém PDF legado V2 inalterado', () => {
  setNutritionFeatureOverride('nutrition_calculation_engine_v3', false)
  setNutritionFeatureOverride('nutrition_pdf_v2', true)
  const doc = buildOutpatientNutritionPdfDoc(REPORT_V4_SAMPLE)
  assert.ok(doc.getNumberOfPages() <= 2)
})

test('casos hospitalares incluem realimentação no relatório técnico', () => {
  const report = {
    ...PDF_GOLDEN_CASES[5].report,
    clinicalRecord: buildFullClinicalSnapshot({ report: PDF_GOLDEN_CASES[5].report }),
  }
  const model = buildNutritionPdfDocumentModel({
    report,
    mode: 'technical_report',
  })
  const text = collectPdfModelStrings(model)
  assert.match(text, /RER/)
  assert.match(text, /Percentual do RER/)
  assert.match(text, /20%/)
  assert.match(text, /autorizada após avaliação clínica/)
})

test('PDF inclui transição quando snapshot possui plano', () => {
  const report = {
    ...PDF_GOLDEN_HEALTHY_DOG,
    diet: {
      ...PDF_GOLDEN_HEALTHY_DOG.diet,
      dietTransition: {
        enabled: true,
        previousDietName: 'Ração anterior',
        previousKcalPerGram: 3.5,
        durationDays: 7,
      },
    },
    clinicalRecord: undefined,
  }
  const clinical = buildFullClinicalSnapshot({ report })
  report.clinicalRecord = clinical
  const model = buildNutritionPdfDocumentModel({ report, mode: 'tutor_plan' })
  const text = collectPdfModelStrings(model)
  assert.ok(model.transitionRows.length >= 7)
  assert.match(text, /Ração anterior/)
})

test('PDF técnico inclui hidratação e enteral hospitalar', () => {
  const report = {
    ...PDF_GOLDEN_HEALTHY_DOG,
    patient: { ...PDF_GOLDEN_HEALTHY_DOG.patient, isHospitalized: true },
    hospital: {
      feedingRoute: 'tube' as const,
      energyDensityKcalPerMl: 1,
      deliveredKcalDay: 300,
      daysAnorexic: 3,
    },
    energy: { ...PDF_GOLDEN_HEALTHY_DOG.energy, rer: 500 },
  }
  const clinical = buildFullClinicalSnapshot({ report })
  const model = buildNutritionPdfDocumentModel({ report: { ...report, clinicalRecord: clinical }, mode: 'technical_report' })
  const text = collectPdfModelStrings(model)
  assert.ok(model.hydrationRows.length > 0)
  assert.ok(model.enteralRows.length > 0)
  assert.match(text, /Meta estimada|Volume diário/)
})
