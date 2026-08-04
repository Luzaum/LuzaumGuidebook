import type { jsPDF } from 'jspdf'
import { PdfPageManager } from './pageManager'
import { renderDocumentHeader } from './layoutPrimitives'
import { renderFeedingPrescriptionSection } from './sections/feedingPrescriptionSection'
import { renderMealScheduleSection } from './sections/mealScheduleSection'
import {
  renderHydrationSection,
  renderMonitoringSection,
  renderObjectiveSection,
  renderPreparationSection,
  renderTransitionSection,
  renderTreatsSection,
  renderWarningsSection,
} from './sections/tutorSections'
import { renderTutorEnteralSection } from './sections/technicalSections'
import type { NutritionPdfDocumentModel } from './types'
import { formatDatePtBr } from './formatters'

function buildHeaderMetaLines(model: NutritionPdfDocumentModel): string[] {
  const lines: string[] = []
  for (const row of model.headerRows) {
    lines.push(`${row.label}: ${row.value}`)
  }
  if (model.veterinarianName) lines.push(`Médico-veterinário: ${model.veterinarianName}`)
  if (model.clinicName) lines.push(`Clínica: ${model.clinicName}`)
  lines.push(`Data: ${formatDatePtBr(model.generatedAt)}`)
  return lines
}

export function buildTutorPlanPdf(doc: jsPDF, model: NutritionPdfDocumentModel): void {
  const page = new PdfPageManager(doc)

  renderDocumentHeader(doc, page, {
    title: 'PLANO NUTRICIONAL',
    subtitle: model.patientName,
    metaLines: buildHeaderMetaLines(model),
  })

  renderObjectiveSection(doc, page, model)
  renderFeedingPrescriptionSection(doc, page, model, 'tutor_plan')
  renderMealScheduleSection(doc, page, model)
  renderTreatsSection(doc, page, model)
  renderHydrationSection(doc, page, model)
  renderTransitionSection(doc, page, model)
  renderTutorEnteralSection(doc, page, model)
  renderPreparationSection(doc, page, model)
  renderMonitoringSection(doc, page, model)
  renderWarningsSection(doc, page, model)
}
