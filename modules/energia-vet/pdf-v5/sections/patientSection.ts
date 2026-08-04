import type { jsPDF } from 'jspdf'
import { renderFullWidthTable } from '../layoutPrimitives'
import type { PdfPageManager } from '../pageManager'
import type { NutritionPdfDocumentModel } from '../types'

export function renderPatientIdentificationSection(
  doc: jsPDF,
  page: PdfPageManager,
  model: NutritionPdfDocumentModel,
) {
  if (!model.identificationRows.length) return
  renderFullWidthTable(doc, page, {
    title: 'Identificação e avaliação nutricional',
    head: [['Campo', 'Valor']],
    body: model.identificationRows.map((row) => [row.label, row.value]),
    fontSize: 9,
    columnStyles: { 0: { halign: 'left', cellWidth: 62 }, 1: { halign: 'left' } },
  })
}

export function renderBodyCompositionSection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  if (!model.bodyCompositionRows.length) return
  renderFullWidthTable(doc, page, {
    title: 'Composição corporal',
    head: [['Campo', 'Valor']],
    body: model.bodyCompositionRows.map((row) => [row.label, row.value]),
    fontSize: 9,
    columnStyles: { 0: { halign: 'left', cellWidth: 72 }, 1: { halign: 'left' } },
  })
}
