import type { jsPDF } from 'jspdf'
import { PDF_PAGE } from '../lib/pdf/pdfTheme'

export class PdfPageManager {
  private y: number

  constructor(
    private doc: jsPDF,
    startY = PDF_PAGE.marginTop,
  ) {
    this.y = startY
  }

  get currentY() {
    return this.y
  }

  setY(value: number) {
    this.y = value
  }

  ensureSpace(requiredMm: number, onNewPage?: () => void) {
    const bottom = PDF_PAGE.height - PDF_PAGE.marginBottom
    if (this.y + requiredMm <= bottom) return
    this.doc.addPage()
    this.y = PDF_PAGE.marginTop
    onNewPage?.()
  }

  advance(delta: number) {
    this.y += delta
  }

  pageCount() {
    return this.doc.getNumberOfPages()
  }
}

export { PDF_PAGE }
