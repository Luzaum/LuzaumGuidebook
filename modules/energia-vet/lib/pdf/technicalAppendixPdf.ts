import { jsPDF } from 'jspdf'
import type { StoredCalculationReport } from '../../types'
import { inferProvenanceFromReport } from '../reportVersions'
import { buildPrintableReportViewModel } from '../reportPresentation'
import { addPdfFooters, drawPdfKeyValueTable, formatPdfDate, getLastTableY, slugifyPdfSegment } from './pdfLayout'
import { PDF_COLORS, PDF_PAGE, PDF_TEMPLATE_VERSION } from './pdfTheme'

export function buildTechnicalAppendixPdfFilename(report: StoredCalculationReport): string {
  const patient = slugifyPdfSegment(report.patient.name, 'PACIENTE')
  const date = formatPdfDate(report.createdAt).split('/').reverse().join('-')
  return `VETIUS_NUTRICAO_ANEXO_TECNICO_${patient}_${date}.pdf`
}

export function buildTechnicalAppendixPdfDoc(report: StoredCalculationReport): jsPDF {
  const vm = buildPrintableReportViewModel(report)
  const provenance = inferProvenanceFromReport(report)
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })

  doc.setProperties({
    title: `Anexo técnico — ${report.patient.name ?? 'Paciente'}`,
    creator: `Vetius NutriçãoVET ${PDF_TEMPLATE_VERSION}`,
  })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(...PDF_COLORS.brand)
  doc.text('Anexo técnico veterinário', PDF_PAGE.marginLeft, 18)

  let y = 28
  drawPdfKeyValueTable(
    doc,
    'Versões e motores',
    [
      ['schemaVersion', String(provenance.schemaVersion)],
      ['calculationEngineVersion', provenance.calculationEngineVersion],
      ['energyRuleSetVersion', provenance.energyRuleSetVersion],
      ['clinicalRuleSetVersion', provenance.clinicalRuleSetVersion],
      ['catalogReleaseId', provenance.catalogReleaseId],
      ['pdfTemplateVersion', provenance.pdfTemplateVersion],
    ],
    y,
  )
  y = getLastTableY(doc) + 8

  drawPdfKeyValueTable(doc, 'Energia', vm.energyFields.map((field) => [field.label, field.value]), y)
  y = getLastTableY(doc) + 8

  drawPdfKeyValueTable(
    doc,
    'Nutrientes (amostra)',
    vm.nutrientRows.slice(0, 18),
    y,
  )

  addPdfFooters(doc, `Anexo técnico · ${report.patient.name ?? 'Paciente'}`)
  return doc
}
