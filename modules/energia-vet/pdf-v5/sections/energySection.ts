import type { jsPDF } from 'jspdf'
import { renderFullWidthTable } from '../layoutPrimitives'
import type { PdfPageManager } from '../pageManager'
import type { NutritionPdfDocumentModel } from '../types'

export function renderEnergySection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  if (!model.energyRows.length) return
  renderFullWidthTable(doc, page, {
    title: 'Energia',
    head: [['Item', 'Resultado']],
    body: model.energyRows.map((row) => [row.label, row.value]),
    fontSize: 9,
    columnStyles: { 0: { halign: 'left', cellWidth: 90 }, 1: { halign: 'right' } },
  })
}
