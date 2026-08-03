import type { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { PDF_COLORS, PDF_PAGE } from './pdfTheme'

export function getLastTableY(doc: jsPDF): number {
  return (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? PDF_PAGE.marginTop
}

export function drawPdfSectionTitle(doc: jsPDF, title: string, y: number, fontSize = 11) {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(fontSize)
  doc.setTextColor(...PDF_COLORS.brand)
  doc.text(title, PDF_PAGE.marginLeft, y)
  doc.setDrawColor(...PDF_COLORS.brand)
  doc.setLineWidth(0.4)
  doc.line(PDF_PAGE.marginLeft, y + 2, PDF_PAGE.marginLeft + PDF_PAGE.contentWidth, y + 2)
}

export function drawPdfKeyValueTable(doc: jsPDF, title: string, rows: string[][], startY: number) {
  drawPdfSectionTitle(doc, title, startY)
  autoTable(doc, {
    startY: startY + 6,
    head: [['Campo', 'Valor']],
    body: rows,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 9,
      cellPadding: 2,
      lineColor: PDF_COLORS.border,
      textColor: PDF_COLORS.text,
    },
    headStyles: { fillColor: PDF_COLORS.headFill, textColor: PDF_COLORS.text, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: PDF_COLORS.altFill },
    columnStyles: { 0: { cellWidth: 52, fontStyle: 'bold' }, 1: { cellWidth: 128 } },
    margin: { left: PDF_PAGE.marginLeft, right: PDF_PAGE.marginRight },
    tableWidth: PDF_PAGE.contentWidth,
  })
}

export function addPdfFooters(doc: jsPDF, leftLabel: string) {
  const total = doc.getNumberOfPages()
  for (let page = 1; page <= total; page++) {
    doc.setPage(page)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(...PDF_COLORS.muted)
    doc.text(leftLabel, PDF_PAGE.marginLeft, PDF_PAGE.height - 8)
    doc.text(`Página ${page} de ${total}`, PDF_PAGE.width - PDF_PAGE.marginRight, PDF_PAGE.height - 8, {
      align: 'right',
    })
  }
}

export function slugifyPdfSegment(value: string | null | undefined, fallback: string) {
  const base = value?.trim() || fallback
  return (
    base
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/^_|_$/g, '')
      .toUpperCase() || fallback
  )
}

export function formatPdfDate(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso.slice(0, 10)
  return date.toLocaleDateString('pt-BR')
}
