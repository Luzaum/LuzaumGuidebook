import { jsPDF } from 'jspdf';
import type { ReceituarioDocumentData } from '../types/receituario';
import { displayField, getDocumentSignatureBoxes, paginateDocument } from './receituarioDocument';

function fitSinglePdfLine(pdf: jsPDF, value: string, maxWidth: number): string {
  if (pdf.getTextWidth(value) <= maxWidth) return value;
  let fitted = value;
  while (fitted.length > 1 && pdf.getTextWidth(`${fitted}…`) > maxWidth) fitted = fitted.slice(0, -1);
  return `${fitted.trimEnd()}…`;
}

export function createReceituarioPdf(document: ReceituarioDocumentData): jsPDF {
  const pages = paginateDocument(document);
  const signatureBoxes = getDocumentSignatureBoxes(document);
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
  pages.forEach((page, pageIndex) => {
    if (pageIndex) pdf.addPage('a4', 'portrait');
    pdf.setTextColor(15, 23, 42);
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(15);
    pdf.text(displayField(document.header.clinicName).toUpperCase(), 16, 18);
    pdf.setFontSize(8); pdf.setTextColor(100, 116, 139);
    pdf.text(document.documentType === 'recipe' ? 'RECEITUÁRIO VETERINÁRIO' : 'DOCUMENTO VETERINÁRIO', 16, 23);
    pdf.setTextColor(15, 23, 42); pdf.setFontSize(8.5);
    pdf.text(displayField(document.header.veterinarianName), 194, 17, { align: 'right' });
    pdf.setFont('helvetica', 'normal');
    pdf.text(`CRMV: ${displayField(document.header.crmv)}`, 194, 21, { align: 'right' });
    pdf.text(displayField(document.header.documentDate), 194, 25, { align: 'right' });
    pdf.setDrawColor(15, 23, 42); pdf.setLineWidth(0.6); pdf.line(16, 29, 194, 29);
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(12);
    pdf.text(document.title.toUpperCase(), 105, 37, { align: 'center', maxWidth: 170 });

    let y = 44;
    if (page.number === 1) {
      const id = document.identification;
      pdf.setFontSize(9); pdf.setFont('helvetica', 'normal');
      const pairs = [
        [`PACIENTE: ${displayField(id.patientName)}`, `RESPONSÁVEL: ${displayField(id.responsibleName)}`],
        [`ESPÉCIE: ${displayField(id.species)}`, `RAÇA: ${displayField(id.breed)}`],
        [`SEXO: ${displayField(id.sex)}`, `IDADE / PESO: ${displayField([id.age, id.weightKg ? `${id.weightKg} kg` : ''].filter(Boolean).join(' • '))}`],
      ];
      pairs.forEach(([left, right]) => { pdf.text(left, 16, y, { maxWidth: 84 }); pdf.text(right, 106, y, { maxWidth: 88 }); y += 5; });
      pdf.setDrawColor(203, 213, 225); pdf.setLineWidth(0.2); pdf.line(16, y, 194, y); y += 6;
    }

    pdf.setFontSize(9.5);
    for (const line of page.lines) {
      if (line.kind === 'spacer') { y += 5.1; continue; }
      if (line.kind === 'medication') {
        pdf.setFont('helvetica', 'bold');
        const form = String(line.medicationForm || 'Medicamento').toUpperCase();
        const formWidth = pdf.getTextWidth(form);
        const label = fitSinglePdfLine(pdf, String(line.medicationLabel || line.text).toUpperCase(), Math.max(35, 178 - formWidth - 10));
        const availableDotsWidth = Math.max(3, 178 - pdf.getTextWidth(label) - formWidth - 3);
        const dotWidth = Math.max(pdf.getTextWidth('.'), 0.5);
        const dots = '.'.repeat(Math.max(3, Math.floor(availableDotsWidth / dotWidth)));
        pdf.text(`${label} ${dots}`, 16, y);
        pdf.text(form, 194, y, { align: 'right' });
      } else {
        pdf.setFont('helvetica', line.kind === 'heading' ? 'bold' : 'normal');
        pdf.text(line.text, 16, y, { maxWidth: 178 });
      }
      y += 5.1;
    }
    if (page.number === page.totalPages && signatureBoxes.length) {
      const startY = 225;
      const boxWidth = 86;
      const boxHeight = 23;
      const gapX = 6;
      const gapY = 4;
      signatureBoxes.forEach((box, index) => {
        const column = index % 2;
        const row = Math.floor(index / 2);
        const x = 16 + column * (boxWidth + gapX);
        const boxY = startY + row * (boxHeight + gapY);
        pdf.setDrawColor(100, 116, 139);
        pdf.setLineWidth(0.25);
        pdf.roundedRect(x, boxY, boxWidth, boxHeight, 1.5, 1.5);
        pdf.setTextColor(15, 23, 42);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7.5);
        pdf.text(box.title.toUpperCase(), x + 3, boxY + 4.5);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(71, 85, 105);
        pdf.text(box.nameLabel, x + 3, boxY + 9, { maxWidth: boxWidth - 6 });
        if (box.registrationLabel) pdf.text(box.registrationLabel, x + 3, boxY + 13, { maxWidth: boxWidth - 6 });
        pdf.setDrawColor(100, 116, 139);
        pdf.line(x + 8, boxY + 18, x + boxWidth - 8, boxY + 18);
        pdf.setFontSize(6.5);
        pdf.text('Assinatura', x + boxWidth / 2, boxY + 21, { align: 'center' });
      });
    }
    pdf.setDrawColor(226, 232, 240); pdf.line(16, 283, 194, 283);
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7.5); pdf.setTextColor(148, 163, 184);
    pdf.text('ConsultaVet • Documento emitido pelo profissional responsável', 16, 288);
    pdf.text(`Página ${page.number} de ${page.totalPages}`, 194, 288, { align: 'right' });
  });
  return pdf;
}

export function downloadReceituarioPdf(document: ReceituarioDocumentData): void {
  const safeName = document.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
  createReceituarioPdf(document).save(`${safeName || 'documento-veterinario'}.pdf`);
}
