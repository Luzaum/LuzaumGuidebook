import type { jsPDF } from 'jspdf'
import { renderBulletList, renderFullWidthTable, renderParagraph } from '../layoutPrimitives'
import type { PdfPageManager } from '../pageManager'
import type { NutritionPdfDocumentModel } from '../types'

export function renderMacroSection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  if (!model.macroRows.length) return
  renderFullWidthTable(doc, page, {
    title: 'Macronutrientes',
    head: [['Nutriente', 'Entrega diária']],
    body: model.macroRows.map((row) => [row.label, row.value]),
    fontSize: 9,
    columnStyles: { 0: { halign: 'left' }, 1: { halign: 'right' } },
  })
}

export function renderNutrientAdequacySection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  if (!model.nutrientRows.length) return
  renderFullWidthTable(doc, page, {
    title: 'Adequação nutricional',
    head: [['Nutriente', 'Entregue', 'Meta', 'Adequação', 'Interpretação']],
    body: model.nutrientRows.map((row) => [
      row.nutrient,
      row.delivered,
      row.target,
      row.status,
      row.interpretation,
    ]),
    fontSize: 8.5,
    columnStyles: {
      0: { halign: 'left' },
      1: { halign: 'right' },
      2: { halign: 'right' },
      3: { halign: 'left' },
      4: { halign: 'left' },
    },
  })
}

export function renderTherapeuticAssessmentSection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  if (!model.therapeuticProfiles.length && !model.therapeuticConflicts.length) return

  renderFullWidthTable(doc, page, {
    title: 'Avaliação terapêutica',
    head: [['Perfil clínico', 'Situação']],
    body: model.therapeuticProfiles.map((profile) => [profile.profileName, profile.statusLabel]),
    fontSize: 9,
  })

  for (const profile of model.therapeuticProfiles) {
    if (!profile.goalLines.length) continue
    renderBulletList(doc, page, profile.profileName, profile.goalLines)
  }

  if (model.therapeuticConflicts.length) {
    renderBulletList(doc, page, 'Conflitos entre doenças', model.therapeuticConflicts)
  }

  if (model.monitoringRecommendations.length) {
    renderBulletList(doc, page, 'Monitoramento recomendado', model.monitoringRecommendations)
  }
}

export function renderDataQualitySection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  if (!model.dataQualityRows.length) return
  renderFullWidthTable(doc, page, {
    title: 'Qualidade dos dados',
    head: [['Item', 'Qualidade']],
    body: model.dataQualityRows.map((row) => [row.item, row.quality]),
    fontSize: 9,
    columnStyles: { 0: { halign: 'left' }, 1: { halign: 'left' } },
  })
}

export function renderHospitalSection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  if (!model.hospitalRows.length) return
  renderFullWidthTable(doc, page, {
    title: 'Hospital e realimentação',
    head: [['Campo', 'Valor']],
    body: model.hospitalRows.map((row) => [row.label, row.value]),
    fontSize: 9,
    columnStyles: { 0: { halign: 'left', cellWidth: 72 }, 1: { halign: 'left' } },
  })
}

export function renderReferencesSection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  if (!model.references.length) return
  renderBulletList(doc, page, 'Referências', model.references)
}

export function renderHydrationSection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  if (!model.hydrationRows.length) return
  renderFullWidthTable(doc, page, {
    title: 'Hidratação',
    head: [['Item', 'Valor']],
    body: model.hydrationRows.map((row) => [row.label, row.value]),
    fontSize: 9,
    columnStyles: { 0: { halign: 'left', cellWidth: 72 }, 1: { halign: 'left' } },
  })
}

export function renderEnteralSection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  if (!model.enteralRows.length) return
  renderFullWidthTable(doc, page, {
    title: 'Nutrição enteral',
    head: [['Campo', 'Valor']],
    body: model.enteralRows.map((row) => [row.label, row.value]),
    fontSize: 9,
    columnStyles: { 0: { halign: 'left', cellWidth: 72 }, 1: { halign: 'left' } },
  })
}

export function renderParenteralSection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  if (!model.parenteralRows.length) return
  renderFullWidthTable(doc, page, {
    title: 'Nutrição parenteral',
    head: [['Campo', 'Valor']],
    body: model.parenteralRows.map((row) => [row.label, row.value]),
    fontSize: 9,
    columnStyles: { 0: { halign: 'left', cellWidth: 72 }, 1: { halign: 'left' } },
  })
  renderParagraph(doc, page, 'A formulação deve ser revisada pela equipe responsável pelo preparo e pela administração.')
}

export function renderTutorEnteralSection(doc: jsPDF, page: PdfPageManager, model: NutritionPdfDocumentModel) {
  if (!model.tutorEnteralBullets.length) return
  renderBulletList(doc, page, 'Alimentação por sonda', model.tutorEnteralBullets)
}
