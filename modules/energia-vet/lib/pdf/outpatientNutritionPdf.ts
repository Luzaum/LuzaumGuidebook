import { jsPDF } from 'jspdf'
import type { StoredCalculationReport } from '../../types'
import { buildPrintableReportViewModel } from '../reportPresentation'
import {
  addPdfFooters,
  drawPdfKeyValueTable,
  formatPdfDate,
  getLastTableY,
  slugifyPdfSegment,
} from './pdfLayout'
import { PDF_COLORS, PDF_PAGE, PDF_TEMPLATE_VERSION } from './pdfTheme'

export function buildOutpatientNutritionPdfFilename(report: StoredCalculationReport): string {
  const patient = slugifyPdfSegment(report.patient.name, 'PACIENTE')
  const tutor = slugifyPdfSegment(report.patient.ownerName, 'TUTOR')
  const date = formatPdfDate(report.createdAt).split('/').reverse().join('-')
  return `VETIUS_NUTRICAO_${patient}_${tutor}_${date}.pdf`
}

export function buildOutpatientNutritionPdfDoc(report: StoredCalculationReport): jsPDF {
  const vm = buildPrintableReportViewModel(report)
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })

  doc.setProperties({
    title: `NutriçãoVET — ${report.patient.name ?? 'Paciente'}`,
    subject: 'Plano alimentar ambulatorial',
    creator: `Vetius NutriçãoVET ${PDF_TEMPLATE_VERSION}`,
  })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.setTextColor(...PDF_COLORS.brand)
  doc.text('NutriçãoVET — Plano alimentar', PDF_PAGE.marginLeft, 18)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...PDF_COLORS.muted)
  doc.text(`Emitido em ${vm.generatedAt}`, PDF_PAGE.marginLeft, 24)
  doc.text(vm.patientTitle, PDF_PAGE.width - PDF_PAGE.marginRight, 18, { align: 'right' })

  let y = 32
  drawPdfKeyValueTable(
    doc,
    'Resumo',
    [
      ['Paciente', report.patient.name ?? '—'],
      ['Tutor', report.patient.ownerName ?? '—'],
      ['Peso atual', `${report.patient.currentWeight ?? '—'} kg`],
      ['Meta energética', `${report.diet.targetEnergy?.toFixed(0) ?? '—'} kcal/dia`],
      ['Objetivo', vm.targetFields.find((f) => f.label.includes('Objetivo'))?.value ?? 'Manutenção'],
    ],
    y,
  )
  y = getLastTableY(doc) + 8

  const primary = report.formula.contributions[0]
  drawPdfKeyValueTable(
    doc,
    'O que oferecer',
    [
      ['Alimento', primary?.foodName ?? '—'],
      ['Quantidade/dia', `${report.diet.totalAsFedGrams?.toFixed(0) ?? '—'} g`],
      ['Por refeição', `${report.diet.gramsPerMeal?.toFixed(0) ?? '—'} g`],
      ['Refeições/dia', String(report.diet.mealsPerDay ?? '—')],
    ],
    y,
  )
  y = getLastTableY(doc) + 8

  if (y < 240 && vm.alertNotes.length) {
    drawPdfKeyValueTable(
      doc,
      'Observações',
      vm.alertNotes.slice(0, 4).map((note) => ['', note]),
      y,
    )
  }

  addPdfFooters(doc, `NutriçãoVET · ${report.patient.name ?? 'Paciente'} · ${formatPdfDate(report.createdAt)}`)
  return doc
}

export function exportOutpatientNutritionPdf(report: StoredCalculationReport) {
  buildOutpatientNutritionPdfDoc(report).save(buildOutpatientNutritionPdfFilename(report))
}
