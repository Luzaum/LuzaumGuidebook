import type { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { PDF_COLORS, PDF_PAGE } from '../lib/pdf/pdfTheme'
import { drawPdfSectionTitle, getLastTableY } from '../lib/pdf/pdfLayout'
import type { PdfPageManager } from './pageManager'

export function renderSectionTitle(doc: jsPDF, page: PdfPageManager, title: string, fontSize = 10) {
  page.ensureSpace(12)
  drawPdfSectionTitle(doc, title, page.currentY, fontSize)
  page.setY(page.currentY + 8)
}

export function renderFullWidthTable(
  doc: jsPDF,
  page: PdfPageManager,
  options: {
    title?: string
    head: string[][]
    body: string[][]
    fontSize?: number
    columnStyles?: Record<number, { cellWidth?: number; halign?: 'left' | 'right' | 'center' }>
  },
) {
  if (options.title) renderSectionTitle(doc, page, options.title)
  page.ensureSpace(18)
  autoTable(doc, {
    startY: page.currentY,
    head: options.head,
    body: options.body,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: options.fontSize ?? 9,
      cellPadding: 2,
      lineColor: PDF_COLORS.border,
      textColor: PDF_COLORS.text,
      overflow: 'linebreak',
    },
    headStyles: {
      fillColor: PDF_COLORS.headFill,
      textColor: PDF_COLORS.text,
      fontStyle: 'bold',
    },
    alternateRowStyles: { fillColor: PDF_COLORS.altFill },
    margin: { left: PDF_PAGE.marginLeft, right: PDF_PAGE.marginRight, top: PDF_PAGE.marginTop, bottom: PDF_PAGE.marginBottom },
    tableWidth: PDF_PAGE.contentWidth,
    columnStyles: options.columnStyles,
    showHead: 'everyPage',
    rowPageBreak: 'avoid',
  })
  page.setY(getLastTableY(doc) + 4)
}

export function renderBulletList(doc: jsPDF, page: PdfPageManager, title: string, bullets: string[]) {
  if (!bullets.length) return
  renderSectionTitle(doc, page, title, 9.5)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...PDF_COLORS.text)
  for (const bullet of bullets) {
    page.ensureSpace(6)
    const lines = doc.splitTextToSize(`• ${bullet}`, PDF_PAGE.contentWidth)
    for (const line of lines) {
      page.ensureSpace(5)
      doc.text(line, PDF_PAGE.marginLeft, page.currentY)
      page.advance(4.5)
    }
  }
  page.advance(2)
}

export function renderParagraph(doc: jsPDF, page: PdfPageManager, text: string) {
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...PDF_COLORS.text)
  const lines = doc.splitTextToSize(text, PDF_PAGE.contentWidth)
  for (const line of lines) {
    page.ensureSpace(5)
    doc.text(line, PDF_PAGE.marginLeft, page.currentY)
    page.advance(4.5)
  }
}

export function renderDocumentHeader(doc: jsPDF, page: PdfPageManager, options: {
  title: string
  subtitle?: string
  metaLines: string[]
}) {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(...PDF_COLORS.brand)
  doc.text(options.title, PDF_PAGE.marginLeft, page.currentY)
  page.advance(7)

  if (options.subtitle) {
    doc.setFontSize(11)
    doc.setTextColor(...PDF_COLORS.text)
    doc.text(options.subtitle, PDF_PAGE.marginLeft, page.currentY)
    page.advance(6)
  }

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...PDF_COLORS.muted)
  for (const line of options.metaLines) {
    doc.text(line, PDF_PAGE.marginLeft, page.currentY)
    page.advance(4.5)
  }
  page.advance(4)
}
