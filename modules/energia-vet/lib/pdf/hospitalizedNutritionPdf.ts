import { jsPDF } from 'jspdf'
import type { EnteralFeedingOrder } from '../hospital/types'
import { addPdfFooters, drawPdfKeyValueTable, formatPdfDate, getLastTableY, slugifyPdfSegment } from './pdfLayout'
import { PDF_COLORS, PDF_PAGE, PDF_TEMPLATE_VERSION } from './pdfTheme'

export function buildHospitalizedNutritionPdfFilename(patientName: string, dateIso: string): string {
  const patient = slugifyPdfSegment(patientName, 'PACIENTE')
  const date = formatPdfDate(dateIso).split('/').reverse().join('-')
  return `VETIUS_NUTRICAO_INTERNACAO_${patient}_${date}.pdf`
}

export function buildHospitalizedNutritionPdfDoc(order: EnteralFeedingOrder, dateIso: string): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  doc.setProperties({
    title: `Internação — ${order.patientName}`,
    subject: 'Prescrição nutricional hospitalar',
    creator: `Vetius NutriçãoVET ${PDF_TEMPLATE_VERSION}`,
  })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.setTextColor(...PDF_COLORS.brand)
  doc.text('NutriçãoVET — Ordem nutricional hospitalar', PDF_PAGE.marginLeft, 18)

  let y = 28
  drawPdfKeyValueTable(
    doc,
    'Paciente e meta',
    [
      ['Paciente', order.patientName],
      ['Diagnóstico', order.diagnosis ?? '—'],
      ['Via alimentar', order.feedingRoute],
      ['Fórmula', order.foodName],
      ['Densidade', order.energyDensityLabel],
      ['RER', `${order.rer.toFixed(0)} kcal/dia`],
      ['Meta do dia', `${order.dailyTargetKcal.toFixed(0)} kcal (${order.percentRer.toFixed(0)}% RER)`],
    ],
    y,
  )
  y = getLastTableY(doc) + 8

  drawPdfKeyValueTable(
    doc,
    'Administração',
    [
      ['Volume/dia', `${order.gramsOrMlPerDay} g ou ml`],
      ['Por administração', `${order.gramsOrMlPerAdministration} g ou ml`],
      ['Administrações/dia', String(order.administrationsPerDay)],
      ['Horários', order.schedule.join(', ')],
      ['Velocidade infusão', order.infusionRateMlPerHour ? `${order.infusionRateMlPerHour} ml/h` : '—'],
      ['Flush', order.flushVolumeMl ? `${order.flushVolumeMl} ml` : '—'],
      ['Progressão', order.progressionSummary],
    ],
    y,
  )
  y = getLastTableY(doc) + 8

  drawPdfKeyValueTable(doc, 'Monitoramento', order.monitoring.map((line) => ['', line]), y)

  addPdfFooters(doc, `NutriçãoVET Internação · ${order.patientName} · ${formatPdfDate(dateIso)}`)
  return doc
}
