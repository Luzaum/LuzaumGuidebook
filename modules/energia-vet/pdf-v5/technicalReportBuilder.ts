import type { jsPDF } from 'jspdf'
import { PdfPageManager } from './pageManager'
import { renderDocumentHeader } from './layoutPrimitives'
import { renderFeedingPrescriptionSection } from './sections/feedingPrescriptionSection'
import { renderMealScheduleSection } from './sections/mealScheduleSection'
import { renderEnergySection } from './sections/energySection'
import { renderBodyCompositionSection, renderPatientIdentificationSection } from './sections/patientSection'
import {
  renderDataQualitySection,
  renderHospitalSection,
  renderMacroSection,
  renderNutrientAdequacySection,
  renderReferencesSection,
  renderTherapeuticAssessmentSection,
} from './sections/technicalSections'
import type { NutritionPdfDocumentModel } from './types'
import { formatDatePtBr } from './formatters'

export function buildTechnicalReportPdf(doc: jsPDF, model: NutritionPdfDocumentModel): void {
  const page = new PdfPageManager(doc)

  renderDocumentHeader(doc, page, {
    title: 'RELATÓRIO TÉCNICO NUTRICIONAL',
    subtitle: model.patientName,
    metaLines: [
      `Espécie: ${model.speciesLabel}`,
      model.breed ? `Raça: ${model.breed}` : '',
      model.currentWeight ? `Peso atual: ${model.currentWeight}` : '',
      `Data: ${formatDatePtBr(model.generatedAt)}`,
      model.veterinarianName ? `Médico-veterinário: ${model.veterinarianName}` : '',
      model.clinicName ? `Clínica: ${model.clinicName}` : '',
    ].filter(Boolean),
  })

  renderPatientIdentificationSection(doc, page, model)
  renderBodyCompositionSection(doc, page, model)
  renderEnergySection(doc, page, model)
  renderFeedingPrescriptionSection(doc, page, model, 'technical_report')
  renderMealScheduleSection(doc, page, model)
  renderMacroSection(doc, page, model)
  renderNutrientAdequacySection(doc, page, model)
  renderTherapeuticAssessmentSection(doc, page, model)
  renderDataQualitySection(doc, page, model)
  renderHospitalSection(doc, page, model)
  renderReferencesSection(doc, page, model)
}
