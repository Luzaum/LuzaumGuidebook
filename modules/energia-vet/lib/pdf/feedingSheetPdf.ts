import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { StoredCalculationReport } from '../../types'
import { formatPdfDate, slugifyPdfSegment } from './pdfLayout'
import { PDF_COLORS, PDF_PAGE, PDF_TEMPLATE_VERSION } from './pdfTheme'

export function buildFeedingSheetPdfFilename(report: StoredCalculationReport) {
  const patient = slugifyPdfSegment(report.patient.name, 'PACIENTE')
  const date = formatPdfDate(report.createdAt).split('/').reverse().join('-')
  return `VETIUS_FICHA_ALIMENTACAO_${patient}_${date}.pdf`
}

export function buildFeedingSheetPdfDoc(report: StoredCalculationReport): jsPDF {
  const programmed = report.formula.programmedFeeding ?? report.diet.programmedFeeding
  const meals = programmed?.meals ?? []
  const dates = programmed?.generatedFeedingDates?.length ? programmed.generatedFeedingDates : [programmed?.startDate ?? report.createdAt.slice(0, 10)]
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  doc.setProperties({ title: `Ficha de alimentação - ${report.patient.name || 'Paciente'}`, subject: 'Controle diário alimentar', creator: `Vetius NutriçãoVET ${PDF_TEMPLATE_VERSION}` })
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.setTextColor(...PDF_COLORS.brand)
  doc.text('NutriçãoVET - Ficha de alimentação', PDF_PAGE.marginLeft, 18)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...PDF_COLORS.muted)
  doc.text(`Paciente: ${report.patient.name || 'Dieta rápida'}  |  Início: ${formatPdfDate(programmed?.startDate ?? report.createdAt)}`, PDF_PAGE.marginLeft, 24)

  let y = 31
  autoTable(doc, { startY: y, head: [['Alimentos utilizados', 'Oferta diária', 'Por refeição']], body: report.formula.contributions.map((item) => [item.foodName, `${item.gramsAsFed.toFixed(1)} g`, `${(item.gramsAsFed / Math.max(programmed?.mealsPerDay ?? report.diet.mealsPerDay ?? 1, 1)).toFixed(1)} g`]), theme: 'grid', styles: { fontSize: 9, cellPadding: 2, lineColor: [220, 225, 235], lineWidth: 0.2, overflow: 'linebreak' }, headStyles: { fillColor: PDF_COLORS.brand, textColor: [255, 255, 255] }, columnStyles: { 0: { cellWidth: 110 }, 1: { cellWidth: 32 }, 2: { cellWidth: 32 } }, margin: { left: PDF_PAGE.marginLeft, right: PDF_PAGE.marginRight }, tableWidth: 174 })
  y = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y

  if (programmed?.includePreparationInstructions && programmed.preparationInstructions?.trim()) {
    autoTable(doc, { startY: y + 7, head: [['Como preparar']], body: [[programmed.preparationInstructions.trim()]], theme: 'grid', styles: { fontSize: 9, cellPadding: 2.4, lineColor: [220, 225, 235], lineWidth: 0.2, overflow: 'linebreak' }, headStyles: { fillColor: [235, 242, 255], textColor: PDF_COLORS.brand }, margin: { left: PDF_PAGE.marginLeft, right: PDF_PAGE.marginRight } })
    y = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y
  }

  const controlRows = dates.flatMap((date) => meals.map((meal) => [formatPdfDate(date), meal.time, meal.items.map((item) => `${item.foodName}: ${item.gramsAsFed} g`).join('\n'), 'Sim / Não', '__________', '__________']))
  autoTable(doc, { startY: y + 7, head: [['Data', 'Horário', 'Oferta', 'Consumiu?', 'Sobra', 'Assinatura']], body: controlRows, theme: 'grid', styles: { fontSize: 8, cellPadding: 2, minCellHeight: 10, lineColor: [220, 225, 235], lineWidth: 0.2, overflow: 'linebreak' }, headStyles: { fillColor: PDF_COLORS.brand, textColor: [255, 255, 255] }, columnStyles: { 0: { cellWidth: 21 }, 1: { cellWidth: 15 }, 2: { cellWidth: 63 }, 3: { cellWidth: 22 }, 4: { cellWidth: 25 }, 5: { cellWidth: 27 } }, margin: { left: PDF_PAGE.marginLeft, right: PDF_PAGE.marginRight }, tableWidth: 173 })
  return doc
}

export function exportFeedingSheetPdf(report: StoredCalculationReport) {
  buildFeedingSheetPdfDoc(report).save(buildFeedingSheetPdfFilename(report))
}
