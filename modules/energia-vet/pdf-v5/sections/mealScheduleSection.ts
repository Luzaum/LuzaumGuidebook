import type { jsPDF } from 'jspdf'
import { renderFullWidthTable } from '../layoutPrimitives'
import type { PdfPageManager } from '../pageManager'
import type { NutritionPdfDocumentModel } from '../types'

export function renderMealScheduleSection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  if (!model.mealSchedule.length) return
  renderFullWidthTable(doc, page, {
    title: 'Refeições',
    head: [['Horário', 'Quantidade']],
    body: model.mealSchedule.map((row) => [row.time, row.detail]),
    fontSize: 9,
    columnStyles: { 0: { halign: 'left' }, 1: { halign: 'left' } },
  })
}
