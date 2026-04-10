import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { StoredCalculationReport } from '../types'
import { buildPrintableReportViewModel } from './reportPresentation'

/** Segmento seguro para nome de ficheiro (ASCII, maiúsculas, underscores). */
function slugifyFilenameSegment(value: string | null | undefined, fallback: string) {
  const base = value && value.trim() ? value.trim() : fallback
  const ascii = base
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[çÇ]/g, 'c')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .toUpperCase()
  return ascii || fallback.toUpperCase().replace(/[^A-Z0-9]+/g, '_')
}

function formatFilenameDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * Nome do ficheiro PDF: VETIUS_NUTRICAO_PACIENTE_TUTOR_YYYY-MM-DD.pdf
 * ("NUTRICAO" = forma ASCII de NUTRIÇÃO, compatível com mais sistemas e anexos.)
 */
export function buildVetiusNutritionPdfFilename(report: StoredCalculationReport): string {
  const patient = slugifyFilenameSegment(report.patient.name, 'PACIENTE')
  const tutor = slugifyFilenameSegment(report.patient.ownerName, 'TUTOR')
  const date = formatFilenameDate(report.createdAt)
  return `VETIUS_NUTRICAO_${patient}_${tutor}_${date}.pdf`
}

function truncateFooterText(value: string, max: number) {
  if (value.length <= max) return value
  return `${value.slice(0, Math.max(0, max - 1))}…`
}

function addNutritionPdfPageFooters(doc: jsPDF, report: StoredCalculationReport) {
  const total = doc.getNumberOfPages()
  const patient = truncateFooterText(report.patient.name?.trim() || 'Paciente', 36)
  const tutor = truncateFooterText(report.patient.ownerName?.trim() || 'Tutor', 32)
  const dateStr = new Date(report.createdAt).toLocaleDateString('pt-BR')
  const leftLine = `Vetius · NutriçãoVET · ${patient} · ${tutor} · ${dateStr}`
  const left = leftLine.length > 118 ? `NutriçãoVET · ${patient} · ${dateStr}` : leftLine
  const pageW = doc.internal.pageSize.getWidth()

  for (let i = 1; i <= total; i++) {
    doc.setPage(i)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(118, 110, 100)
    doc.text(left, 14, 287, { maxWidth: pageW - 60 })
    doc.text(`Página ${i} de ${total}`, pageW - 14, 287, { align: 'right' })
  }
}

function drawSectionTitle(doc: jsPDF, title: string, startY: number) {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text(title, 14, startY)
  doc.setDrawColor(229, 99, 10)
  doc.setLineWidth(0.5)
  doc.line(14, startY + 2, 196, startY + 2)
}

function renderKeyValueTable(doc: jsPDF, title: string, rows: string[][], startY: number) {
  drawSectionTitle(doc, title, startY)
  autoTable(doc, {
    startY: startY + 6,
    head: [['Campo', 'Valor']],
    body: rows,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 10,
      cellPadding: 2.4,
      lineColor: [222, 217, 208],
      lineWidth: 0.2,
      textColor: [29, 26, 23],
    },
    headStyles: {
      fillColor: [246, 244, 241],
      textColor: [29, 26, 23],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [251, 250, 248],
    },
    columnStyles: {
      0: { cellWidth: 54, fontStyle: 'bold' },
      1: { cellWidth: 128 },
    },
    margin: { left: 14, right: 14 },
  })
}

function renderDataTable(doc: jsPDF, title: string, headers: string[], rows: string[][], startY: number) {
  drawSectionTitle(doc, title, startY)
  autoTable(doc, {
    startY: startY + 6,
    head: [headers],
    body: rows,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 9.5,
      cellPadding: 2.3,
      lineColor: [222, 217, 208],
      lineWidth: 0.2,
      textColor: [29, 26, 23],
      overflow: 'linebreak',
    },
    headStyles: {
      fillColor: [246, 244, 241],
      textColor: [29, 26, 23],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [251, 250, 248],
    },
    margin: { left: 14, right: 14 },
  })
}

function buildNutritionReportPdfDoc(report: StoredCalculationReport): jsPDF {
  const vm = buildPrintableReportViewModel(report)
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })

  const metaTitle = `Vetius NutriçãoVET — ${report.patient.name?.trim() || 'Paciente'}`
  doc.setProperties({
    title: metaTitle,
    subject: 'Relatório nutricional veterinário',
    author: 'Vetius',
    keywords: 'nutrição veterinária, prescrição, energia, dieta',
    creator: 'Vetius NutriçãoVET',
  })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(229, 99, 10)
  doc.text('NutriçãoVET — Relatório nutricional', 14, 18)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(98, 89, 79)
  doc.text(`Emitido em ${vm.generatedAt}`, 14, 24)
  doc.text(vm.patientTitle, 196, 18, { align: 'right' })
  doc.text(vm.patientSubtitle, 196, 24, { align: 'right' })

  let nextY = 32

  renderKeyValueTable(doc, '1. Identificação do paciente', vm.patientFields.map((field) => [field.label, field.value]), nextY)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderKeyValueTable(doc, '2. Dados clínicos', vm.clinicalFields.map((field) => [field.label, field.value]), nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderKeyValueTable(doc, '3. Cálculo energético', vm.energyFields.map((field) => [field.label, field.value]), nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderKeyValueTable(doc, '4. Meta nutricional', vm.targetFields.map((field) => [field.label, field.value]), nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderKeyValueTable(doc, '5. Fórmula geral', vm.formulaMetaFields.map((field) => [field.label, field.value]), nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderDataTable(doc, '6. Fórmula alimentar', ['Alimento', 'Inclusão', 'Oferta diária', 'Energia'], vm.formulaRows, nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderDataTable(doc, '7. Resumo nutricional', ['Nutriente', 'Valor'], vm.nutrientRows, nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderDataTable(doc, '8. Partição energética', ['Macro', '%', 'Gramas', 'Kcal'], vm.macroRows, nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderDataTable(
    doc,
    '9. Contribuição por alimento',
    ['Alimento', 'Categoria', 'Oferta diária', 'Energia', 'Por refeição'],
    vm.contributionRows,
    nextY + 8,
  )
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  if (vm.alertNotes.length > 0) {
    renderDataTable(doc, '10. Observações finais', ['Observação'], vm.alertNotes.map((note) => [note]), nextY + 8)
  }

  vm.feedingSheets.forEach((sheet) => {
    doc.addPage()
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.setTextColor(229, 99, 10)
    doc.text(vm.feedingSheetTitle, 14, 18)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(98, 89, 79)
    doc.text('Página operacional para rotina diária', 14, 24)
    doc.text(vm.patientTitle, 196, 18, { align: 'right' })

    renderKeyValueTable(doc, 'Dados da ficha', sheet.meta.map((field) => [field.label, field.value]), 32)
    let feedingY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 32

    renderDataTable(doc, 'Alimentos utilizados', ['Alimento', 'Oferta diária total', 'Por refeição'], sheet.foodRows, feedingY + 8)
    feedingY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? feedingY

    renderDataTable(
      doc,
      'Controle diário',
      ['Horário', 'Quantidade/refeição', 'Alimentos', 'Comeu? Sim/não (pesar sobra)', 'Assinatura'],
      sheet.rows,
      feedingY + 8,
    )
  })

  addNutritionPdfPageFooters(doc, report)

  return doc
}

/** Gera o mesmo PDF que “Exportar PDF” e descarrega o ficheiro. */
export function exportReportPdf(report: StoredCalculationReport) {
  const doc = buildNutritionReportPdfDoc(report)
  doc.save(buildVetiusNutritionPdfFilename(report))
}

/**
 * Mesmo conteúdo que export — abre o PDF num separador e dispara a impressão do sistema.
 * Fallback: descarrega o ficheiro se o popup estiver bloqueado.
 */
export function printReportPdf(report: StoredCalculationReport) {
  const doc = buildNutritionReportPdfDoc(report)
  const blob = doc.output('blob')
  const url = URL.createObjectURL(blob)
  const win = window.open(url, '_blank')
  if (!win) {
    URL.revokeObjectURL(url)
    exportReportPdf(report)
    return
  }
  const tryPrint = () => {
    try {
      win.focus()
      win.print()
    } catch {
      /* ignorar — utilizador pode imprimir manualmente no leitor PDF */
    }
  }
  win.addEventListener('load', () => window.setTimeout(tryPrint, 400))
  window.setTimeout(tryPrint, 1200)
}
