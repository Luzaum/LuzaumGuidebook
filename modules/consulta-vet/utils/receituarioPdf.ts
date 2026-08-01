import { jsPDF } from 'jspdf';
import type { ReceituarioDocumentData } from '../types/receituario';
import { displayField, paginateDocument } from './receituarioDocument';

export function createReceituarioPdf(document: ReceituarioDocumentData): jsPDF {
  const pages = paginateDocument(document);
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
      pdf.setFont('helvetica', line.kind === 'heading' ? 'bold' : 'normal');
      pdf.text(line.text, 16, y, { maxWidth: 178 }); y += 5.1;
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
