import { jsPDF } from 'jspdf';

type PdfSection = {
  title: string;
  lines: string[];
};

type PdfHighlight = {
  label: string;
  value: string;
};

type ExportPdfParams = {
  title: string;
  subtitle?: string;
  filename: string;
  highlights?: PdfHighlight[];
  sections: PdfSection[];
  footerNote?: string;
};

const PAGE = {
  margin: 36,
  headerHeight: 84,
};

export function exportSummaryPdf({
  title,
  subtitle,
  filename,
  highlights = [],
  sections,
  footerNote,
}: ExportPdfParams) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - PAGE.margin * 2;
  let y = PAGE.margin + PAGE.headerHeight + 12;

  const addPageIfNeeded = (height: number) => {
    if (y + height <= pageHeight - PAGE.margin) return;
    doc.addPage();
    drawHeader(false);
    y = PAGE.margin + PAGE.headerHeight + 12;
  };

  const drawHeader = (firstPage: boolean) => {
    doc.setFillColor(15, 23, 42);
    doc.roundedRect(PAGE.margin, PAGE.margin, contentWidth, PAGE.headerHeight, 12, 12, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text(title, PAGE.margin + 18, PAGE.margin + 30);

    if (subtitle) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(203, 213, 225);
      doc.text(subtitle, PAGE.margin + 18, PAGE.margin + 50);
    }

    doc.setFontSize(9);
    doc.setTextColor(203, 213, 225);
    doc.text(`Gerado em ${new Date().toLocaleString('pt-BR')}`, PAGE.margin + 18, PAGE.margin + 67);

    if (!firstPage) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(203, 213, 225);
      doc.text('Continuação', PAGE.margin + contentWidth - 54, PAGE.margin + 67);
    }

    doc.setTextColor(17, 24, 39);
  };

  drawHeader(true);

  if (highlights.length) {
    const cardsPerRow = 3;
    const cardGap = 10;
    const cardWidth = (contentWidth - cardGap * (cardsPerRow - 1)) / cardsPerRow;
    const cardHeight = 56;

    for (let i = 0; i < highlights.length; i++) {
      const row = Math.floor(i / cardsPerRow);
      const col = i % cardsPerRow;
      const x = PAGE.margin + col * (cardWidth + cardGap);
      const cardY = y + row * (cardHeight + cardGap);
      addPageIfNeeded(cardHeight + 6);

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(x, cardY, cardWidth, cardHeight, 8, 8, 'FD');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text(highlights[i].label, x + 10, cardY + 18);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(15, 23, 42);
      doc.text(highlights[i].value, x + 10, cardY + 38);
    }

    y += Math.ceil(highlights.length / cardsPerRow) * (cardHeight + cardGap) + 8;
  }

  sections.forEach((section) => {
    const estimatedHeight = 40 + section.lines.length * 20;
    addPageIfNeeded(estimatedHeight);

    const sectionX = PAGE.margin;
    const sectionW = contentWidth;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(sectionX, y, sectionW, 30, 8, 8, 'FD');

    doc.setFillColor(15, 23, 42);
    doc.roundedRect(sectionX, y, sectionW, 30, 8, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text(section.title, sectionX + 12, y + 20);
    y += 36;

    section.lines.forEach((line, idx) => {
      addPageIfNeeded(22);

      const rowY = y;
      const isEven = idx % 2 === 0;
      doc.setFillColor(isEven ? 248 : 255, isEven ? 250 : 255, isEven ? 252 : 255);
      doc.setDrawColor(241, 245, 249);
      doc.roundedRect(sectionX, rowY, sectionW, 20, 4, 4, 'FD');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.6);
      doc.setTextColor(30, 41, 59);
      const text = doc.splitTextToSize(line, sectionW - 20);
      doc.text(text, sectionX + 10, rowY + 13);
      y += 22;
    });

    y += 8;
  });

  if (footerNote) {
    addPageIfNeeded(30);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(footerNote, PAGE.margin, y + 10);
  }

  doc.save(filename);
}
