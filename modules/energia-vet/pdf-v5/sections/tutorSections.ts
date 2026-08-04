import type { jsPDF } from 'jspdf'
import { renderBulletList, renderFullWidthTable, renderParagraph } from '../layoutPrimitives'
import type { PdfPageManager } from '../pageManager'
import type { NutritionPdfDocumentModel } from '../types'

export function renderObjectiveSection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  renderParagraph(doc, page, model.objectiveDetail)
}

export function renderTreatsSection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  renderParagraph(doc, page, model.treatsText)
}

export function renderHydrationSection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  renderParagraph(doc, page, model.hydrationText)
}

export function renderTransitionSection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  if (!model.transitionRows.length) return
  renderFullWidthTable(doc, page, {
    title: 'Transição alimentar',
    head: [['Dia', 'Dieta anterior', 'Dieta nova']],
    body: model.transitionRows,
    fontSize: 9,
    columnStyles: { 0: { halign: 'right' }, 1: { halign: 'right' }, 2: { halign: 'right' } },
  })
}

export function renderPreparationSection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  renderBulletList(doc, page, 'Orientações de preparo', model.preparationBullets)
}

export function renderMonitoringSection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  renderBulletList(doc, page, 'Monitoramento', model.monitoringBullets)
}

export function renderWarningsSection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  renderBulletList(doc, page, 'Advertências', model.warningBullets)
}
