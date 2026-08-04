import type { jsPDF } from 'jspdf'
import { renderFullWidthTable } from '../layoutPrimitives'
import type { PdfPageManager } from '../pageManager'
import type { NutritionPdfDocumentModel } from '../types'

export function renderFeedingPrescriptionSection(
  doc: jsPDF,
  page: PdfPageManager,
  model: NutritionPdfDocumentModel,
  mode: NutritionPdfDocumentModel['mode'],
) {
  if (!model.foodRows.length) return

  if (mode === 'tutor_plan') {
    renderFullWidthTable(doc, page, {
      title: 'Prescrição alimentar',
      head: [['Alimento', 'Quantidade diária', 'Divisão por refeição']],
      body: model.foodRows.map((row) => [row.name, row.dailyAmount, row.perMealAmount]),
      fontSize: 9,
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'right' },
        2: { halign: 'right' },
      },
    })
    return
  }

  renderFullWidthTable(doc, page, {
    title: 'Prescrição alimentar',
    head: [['Alimento', 'Quantidade exata', 'Quantidade prática', 'kcal/dia', '% da energia']],
    body: model.foodRows.map((row) => [
      row.name,
      row.dailyAmount,
      row.perMealAmount,
      row.dailyKcal ?? 'Não informado',
      row.energyPct ?? 'Não informado',
    ]),
    fontSize: 8.5,
    columnStyles: {
      0: { halign: 'left' },
      1: { halign: 'right' },
      2: { halign: 'right' },
      3: { halign: 'right' },
      4: { halign: 'right' },
    },
  })
}
