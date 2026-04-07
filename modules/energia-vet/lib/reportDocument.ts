import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { StoredCalculationReport } from '../types'
import { buildPrintableReportViewModel } from './reportPresentation'

function sanitizeFilename(value?: string | null) {
  return (value && value.trim() ? value : 'paciente').replace(/[^a-zA-Z0-9-_]+/g, '_')
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

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(229, 99, 10)
  doc.text('NutriçãoVET - Relatório nutricional', 14, 18)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(98, 89, 79)
  doc.text(`Emitido em ${vm.generatedAt}`, 14, 24)
  doc.text(vm.patientTitle, 196, 18, { align: 'right' })
  doc.text(vm.patientSubtitle, 196, 24, { align: 'right' })

  let nextY = 32

  renderKeyValueTable(doc, '1. Identificação do paciente', vm.patientFields.map((field) => [field.label, field.value]), nextY)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderKeyValueTable(doc, '2. Dados clinicos', vm.clinicalFields.map((field) => [field.label, field.value]), nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderKeyValueTable(doc, '3. Cálculo energético', vm.energyFields.map((field) => [field.label, field.value]), nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderKeyValueTable(doc, '4. Meta nutricional', vm.targetFields.map((field) => [field.label, field.value]), nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderKeyValueTable(doc, '5. Formula geral', vm.formulaMetaFields.map((field) => [field.label, field.value]), nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderDataTable(doc, '6. Formula alimentar', ['Alimento', 'Inclusao', 'Oferta diaria', 'Energia'], vm.formulaRows, nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderDataTable(doc, '7. Resumo nutricional', ['Nutriente', 'Valor'], vm.nutrientRows, nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderDataTable(doc, '8. Particao energetica', ['Macro', '%', 'Gramas', 'Kcal'], vm.macroRows, nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderDataTable(doc, '9. Contribuicao por alimento', ['Alimento', 'Categoria', 'Oferta diaria', 'Energia', 'Por refeicao'], vm.contributionRows, nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  if (vm.alertNotes.length > 0) {
    renderDataTable(doc, '10. Observacoes finais', ['Observacao'], vm.alertNotes.map((note) => [note]), nextY + 8)
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
    doc.text('Pagina operacional isolada para rotina diaria', 14, 24)
    doc.text(vm.patientTitle, 196, 18, { align: 'right' })

    renderKeyValueTable(doc, 'Dados da ficha', sheet.meta.map((field) => [field.label, field.value]), 32)
    let feedingY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 32

    renderDataTable(doc, 'Alimentos utilizados', ['Alimento', 'Oferta diaria total', 'Por refeicao'], sheet.foodRows, feedingY + 8)
    feedingY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? feedingY

    renderDataTable(
      doc,
      'Controle diario',
      ['Horario', 'Quantidade/refeicao', 'Alimentos', 'Comeu? Sim/nao (pesar sobra)', 'Assinatura'],
      sheet.rows,
      feedingY + 8,
    )
  })

  return doc
}

/** Gera o mesmo PDF que “Exportar PDF” e descarrega o ficheiro. */
export function exportReportPdf(report: StoredCalculationReport) {
  const doc = buildNutritionReportPdfDoc(report)
  const patientName = sanitizeFilename(report.patient.name)
  doc.save(`energia-vet_${patientName}_${new Date(report.createdAt).toISOString().slice(0, 10)}.pdf`)
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


