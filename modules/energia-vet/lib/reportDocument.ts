import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { StoredCalculationReport } from '../types'
import {
  buildPrintableReportViewModel,
  buildSharedFeedingSheetMetaFields,
  type PrintableReportViewModel,
} from './reportPresentation'
import { isNutritionFeatureEnabled } from './featureFlags'
import {
  buildOutpatientNutritionPdfDoc,
  buildOutpatientNutritionPdfFilename,
} from './pdf/outpatientNutritionPdf'
import {
  buildNutritionPdfV5Doc,
  buildNutritionPdfV5Filename,
  exportNutritionPdfV5,
  printNutritionPdfV5,
} from '../pdf-v5/pdfV5Document'
import type { NutritionPdfMode } from '../pdf-v5/types'
import { getCalculationSnapshotByReportId } from './calculationPersistenceV2'

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
export function buildVetiusNutritionPdfFilename(report: StoredCalculationReport, mode?: NutritionPdfMode): string {
  return buildNutritionPdfV5Filename(report, mode ?? 'tutor_plan')
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

function drawSectionTitle(doc: jsPDF, title: string, startY: number, compact = false, micro = false) {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(micro ? 8 : compact ? 10 : 12)
  doc.text(title, 14, startY)
  doc.setDrawColor(229, 99, 10)
  doc.setLineWidth(compact ? 0.35 : 0.5)
  doc.line(14, startY + 2, 196, startY + 2)
}

function renderKeyValueTable(doc: jsPDF, title: string, rows: string[][], startY: number, compact = false) {
  drawSectionTitle(doc, title, startY, compact)
  autoTable(doc, {
    startY: startY + (compact ? 5 : 6),
    head: [['Campo', 'Valor']],
    body: rows,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: compact ? 8 : 10,
      cellPadding: compact ? 1.5 : 2.4,
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
      0: { cellWidth: compact ? 48 : 54, fontStyle: 'bold' },
      1: { cellWidth: compact ? 134 : 128 },
    },
    margin: { left: 14, right: 14 },
  })
}

function renderDataTable(
  doc: jsPDF,
  title: string,
  headers: string[],
  rows: string[][],
  startY: number,
  compact = false,
  micro = false,
) {
  drawSectionTitle(doc, title, startY, compact, micro)
  const fontSize = micro ? 6.5 : compact ? 7.5 : 9.5
  const cellPad = micro ? 1.05 : compact ? 1.4 : 2.3
  autoTable(doc, {
    startY: startY + (micro ? 4 : compact ? 5 : 6),
    head: [headers],
    body: rows,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize,
      cellPadding: cellPad,
      lineColor: [222, 217, 208],
      lineWidth: 0.2,
      textColor: [29, 26, 23],
      overflow: 'linebreak',
    },
    headStyles: {
      fillColor: [246, 244, 241],
      textColor: [29, 26, 23],
      fontStyle: 'bold',
      fontSize,
    },
    alternateRowStyles: {
      fillColor: [251, 250, 248],
    },
    margin: { left: 14, right: 14 },
    tableWidth: compact || micro ? 182 : undefined,
  })
}

function getLastTableFinalY(doc: jsPDF): number {
  return (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 0
}

/** Títulos de secção na ficha compacta (3 dias / folha). */
function drawTripleSheetSectionTitle(doc: jsPDF, title: string, startY: number) {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(229, 99, 10)
  doc.text(title, 14, startY)
  doc.setDrawColor(229, 99, 10)
  doc.setLineWidth(0.45)
  doc.line(14, startY + 2.5, 196, startY + 2.5)
}

/** Dados da ficha + alimentos com tipografia maior (aproveita altura da folha). */
function renderTripleSheetKeyValueTable(doc: jsPDF, title: string, rows: string[][], startY: number) {
  drawTripleSheetSectionTitle(doc, title, startY)
  autoTable(doc, {
    startY: startY + 7,
    head: [['Campo', 'Valor']],
    body: rows,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 9.5,
      cellPadding: { top: 2.4, bottom: 2.4, left: 2.2, right: 2.2 },
      lineColor: [222, 217, 208],
      lineWidth: 0.2,
      textColor: [29, 26, 23],
    },
    headStyles: {
      fillColor: [246, 244, 241],
      textColor: [29, 26, 23],
      fontStyle: 'bold',
      fontSize: 9.5,
    },
    alternateRowStyles: { fillColor: [251, 250, 248] },
    columnStyles: {
      0: { cellWidth: 52, fontStyle: 'bold' },
      1: { cellWidth: 128 },
    },
    margin: { left: 14, right: 14 },
  })
}

function renderTripleSheetFoodTable(doc: jsPDF, title: string, headers: string[], rows: string[][], startY: number) {
  drawTripleSheetSectionTitle(doc, title, startY)
  autoTable(doc, {
    startY: startY + 7,
    head: [headers],
    body: rows,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 9,
      cellPadding: { top: 2.2, bottom: 2.2, left: 2, right: 2 },
      lineColor: [222, 217, 208],
      lineWidth: 0.2,
      textColor: [29, 26, 23],
      overflow: 'linebreak',
      minCellHeight: 8,
    },
    headStyles: {
      fillColor: [246, 244, 241],
      textColor: [29, 26, 23],
      fontStyle: 'bold',
      fontSize: 9,
    },
    alternateRowStyles: { fillColor: [251, 250, 248] },
    margin: { left: 14, right: 14 },
    tableWidth: 182,
  })
}

/** Controle diário: linhas mais altas; `minCellHeight` reparte o espaço vertical da folha. */
function renderTripleSheetControlTable(
  doc: jsPDF,
  title: string,
  headers: string[],
  rows: string[][],
  startY: number,
  minCellHeight = 10,
) {
  drawTripleSheetSectionTitle(doc, title, startY)
  autoTable(doc, {
    startY: startY + 7,
    head: [headers],
    body: rows,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 8.8,
      cellPadding: { top: 2.6, bottom: 2.6, left: 1.8, right: 1.8 },
      lineColor: [222, 217, 208],
      lineWidth: 0.2,
      textColor: [29, 26, 23],
      overflow: 'linebreak',
      minCellHeight,
    },
    headStyles: {
      fillColor: [246, 244, 241],
      textColor: [29, 26, 23],
      fontStyle: 'bold',
      fontSize: 8.5,
    },
    alternateRowStyles: { fillColor: [251, 250, 248] },
    margin: { left: 14, right: 14 },
    tableWidth: 182,
  })
}

/** Uma ficha completa (dados + alimentos + controle); `compact` para caber 2 dias na mesma folha A4. */
function renderFeedingSheetBlock(
  doc: jsPDF,
  sheet: PrintableReportViewModel['feedingSheets'][0],
  startY: number,
  compact: boolean,
): number {
  const gap = compact ? 5 : 8
  renderKeyValueTable(doc, 'Dados da ficha', sheet.meta.map((field) => [field.label, field.value]), startY, compact)
  let y = getLastTableFinalY(doc)
  renderDataTable(doc, 'Alimentos utilizados', ['Alimento', 'Oferta diária total', 'Por refeição'], sheet.foodRows, y + gap, compact)
  y = getLastTableFinalY(doc)
  renderDataTable(
    doc,
    'Controle diário',
    ['Horário', 'Quantidade/refeição', 'Alimentos', 'Comeu? Sim/não (pesar sobra)', 'Assinatura'],
    sheet.rows,
    y + gap,
    compact,
    false,
  )
  return getLastTableFinalY(doc)
}

function resolveV5Snapshot(report: StoredCalculationReport) {
  if (typeof window === 'undefined') return undefined
  return getCalculationSnapshotByReportId(report.id)
}

function buildNutritionReportPdfDoc(report: StoredCalculationReport, mode: NutritionPdfMode = 'tutor_plan'): jsPDF {
  return buildNutritionPdfV5Doc(report, mode, { snapshot: resolveV5Snapshot(report) })
}

/** Gera o mesmo PDF que “Exportar PDF” e descarrega o ficheiro. */
export function exportReportPdf(report: StoredCalculationReport) {
  exportNutritionPdfV5(report, 'tutor_plan', { snapshot: resolveV5Snapshot(report) })
}

export function exportTutorPlanPdf(report: StoredCalculationReport) {
  exportNutritionPdfV5(report, 'tutor_plan', { snapshot: resolveV5Snapshot(report) })
}

export function exportTechnicalReportPdf(report: StoredCalculationReport) {
  exportNutritionPdfV5(report, 'technical_report', { snapshot: resolveV5Snapshot(report) })
}

export function printReportPdf(report: StoredCalculationReport) {
  printNutritionPdfV5(report, 'tutor_plan', { snapshot: resolveV5Snapshot(report) })
}

export function printTutorPlanPdf(report: StoredCalculationReport) {
  printNutritionPdfV5(report, 'tutor_plan', { snapshot: resolveV5Snapshot(report) })
}

export function printTechnicalReportPdf(report: StoredCalculationReport) {
  printNutritionPdfV5(report, 'technical_report', { snapshot: resolveV5Snapshot(report) })
}
