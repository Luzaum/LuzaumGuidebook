import type { ReceituarioDocumentData } from '../types/receituario';
import { prescriptionPharmaceuticalFormLabel } from './receituarioMedication';

export const EMPTY_FIELD_LABEL = 'A PREENCHER';

export interface PaginatedLine {
  text: string;
  kind: 'body' | 'heading' | 'bullet' | 'spacer' | 'medication';
  medicationLabel?: string;
  medicationForm?: string;
}

export interface DocumentPageModel {
  number: number;
  totalPages: number;
  lines: PaginatedLine[];
}

export interface SignatureBoxModel {
  title: string;
  nameLabel: string;
  registrationLabel?: string;
}

const LEGACY_FIELD_LINE = /^(PACIENTE|ESPÉCIE|RAÇA|SEXO|IDADE|PESO|RESPONSÁVEL)\s*:/i;
const LEGACY_TOKEN = /\{\{[^{}]+\}\}|\[[^\[\]\n]+\]/g;

export function displayField(value: unknown): string {
  const clean = String(value || '').trim();
  return clean || EMPTY_FIELD_LABEL;
}

export function sanitizeIssuedText(value: string): string {
  return String(value || '')
    .replace(/\r\n/g, '\n')
    .replace(LEGACY_TOKEN, EMPTY_FIELD_LABEL)
    .replace(/_{3,}/g, EMPTY_FIELD_LABEL)
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim();
}

export function normalizeLegacyDocumentBody(value: string): string {
  const lines = sanitizeIssuedText(value).split('\n');
  const filtered: string[] = [];
  let identitySection = true;
  let skippedDocumentTitle = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (identitySection && !skippedDocumentTitle && trimmed && trimmed === trimmed.toUpperCase() && trimmed.length < 100) {
      skippedDocumentTitle = true;
      continue;
    }
    if (identitySection && (LEGACY_FIELD_LINE.test(trimmed) || !trimmed)) continue;
    identitySection = false;
    filtered.push(line);
  }
  return sanitizeIssuedText(filtered.join('\n'));
}

export function stripTextSignatureSection(value: string): string {
  const text = String(value || '');
  const marker = /(?:^|\n)RESPONSÁVEL PELO ANIMAL\s*(?:\n|$)/i.exec(text);
  return sanitizeIssuedText(marker ? text.slice(0, marker.index) : text);
}

export function getDocumentSignatureBoxes(document: ReceituarioDocumentData): SignatureBoxModel[] {
  if (document.documentType !== 'term') return [];
  const identification = document.identification;
  return [
    { title: 'Responsável pelo animal', nameLabel: displayField(identification.responsibleName), registrationLabel: `CPF: ${displayField(identification.responsibleCpf)}` },
    { title: 'Médico-veterinário', nameLabel: displayField(document.header.veterinarianName), registrationLabel: `CRMV: ${displayField(document.header.crmv)}` },
    { title: 'Testemunha 1', nameLabel: displayField(identification.witness1Name), registrationLabel: `CPF: ${displayField(identification.witness1Cpf)}` },
    { title: 'Testemunha 2', nameLabel: displayField(identification.witness2Name), registrationLabel: `CPF: ${displayField(identification.witness2Cpf)}` },
  ];
}

export function buildDocumentPlainText(document: ReceituarioDocumentData): string {
  const { identification, header } = document;
  return sanitizeIssuedText([
    document.title.toUpperCase(),
    '',
    `PACIENTE: ${displayField(identification.patientName)}`,
    `ESPÉCIE: ${displayField(identification.species)}`,
    `RAÇA: ${displayField(identification.breed)}`,
    `SEXO: ${displayField(identification.sex)}`,
    `IDADE: ${displayField(identification.age)}`,
    `PESO: ${identification.weightKg ? `${identification.weightKg} kg` : EMPTY_FIELD_LABEL}`,
    `RESPONSÁVEL: ${displayField(identification.responsibleName)}`,
    '',
    document.bodyPlainText,
    '',
    `LOCAL E DATA: ${displayField(header.location || header.documentDate)}`,
    `HORÁRIO: ${displayField(header.time)}`,
    '',
    ...(document.documentType === 'term' ? [
      `RESPONSÁVEL PELO ANIMAL: ${displayField(identification.responsibleName)}`,
      `CPF DO RESPONSÁVEL: ${displayField(identification.responsibleCpf)}`,
      `TESTEMUNHA 1: ${displayField(identification.witness1Name)}`,
      `CPF DA TESTEMUNHA 1: ${displayField(identification.witness1Cpf)}`,
      `TESTEMUNHA 2: ${displayField(identification.witness2Name)}`,
      `CPF DA TESTEMUNHA 2: ${displayField(identification.witness2Cpf)}`,
      '',
    ] : []),
    displayField(header.veterinarianName),
    `CRMV: ${displayField(header.crmv)}`,
  ].join('\n'));
}

/** Copia somente o conteúdo clínico, sem cabeçalho, paciente ou assinaturas. */
export function buildDocumentBodyPlainText(document: ReceituarioDocumentData): string {
  return sanitizeIssuedText(document.bodyPlainText);
}

function wrapText(text: string, maxChars: number): string[] {
  if (!text) return [''];
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    if (!current) { current = word; continue; }
    if (`${current} ${word}`.length <= maxChars) current += ` ${word}`;
    else { lines.push(current); current = word; }
  }
  if (current) lines.push(current);
  return lines;
}

function lineKind(text: string): PaginatedLine['kind'] {
  if (!text.trim()) return 'spacer';
  if (/^[•*-]\s/.test(text)) return 'bullet';
  if (text.length <= 62 && text === text.toUpperCase() && /[A-ZÁÉÍÓÚÃÕÇ]/.test(text)) return 'heading';
  return 'body';
}

function medicationLineParts(raw: string, nearbyText: string): { label: string; form: string } | null {
  const match = raw.trim().match(/^(\d+)\.\s+(.+)$/);
  if (!match) return null;
  let content = match[2].replace(/\s+—\s*$/, '').trim();
  const segments = content.split(/\s+—\s+/).map((item) => item.trim()).filter(Boolean);
  const explicitForm = prescriptionPharmaceuticalFormLabel(segments[segments.length - 1]);
  const inferredForm = explicitForm || prescriptionPharmaceuticalFormLabel(`${content} ${nearbyText}`);
  const looksLikeMedication = /^(administrar|aplicar|instilar|pingar|oferecer|dar|usar|manipular|forma farmacêutica)/i.test(nearbyText.trim())
    || Boolean(explicitForm)
    || /\d+(?:[.,]\d+)?\s*(?:mcg|µg|mg|g|mL|UI)\b/i.test(content);
  if (!looksLikeMedication) return null;
  if (explicitForm) content = segments.slice(0, -1).join(' — ');
  return { label: `${match[1]}. ${content}`, form: inferredForm || 'Medicamento' };
}

function blocksFromText(text: string, maxChars: number): PaginatedLine[][] {
  const rawLines = sanitizeIssuedText(text).split('\n');
  return rawLines.map((raw, rawIndex) => {
    const nearbyText = rawLines.slice(rawIndex + 1, rawIndex + 4).map((item) => item.trim()).filter(Boolean).join(' ');
    const medication = medicationLineParts(raw, nearbyText);
    if (medication) return [{ text: raw, kind: 'medication', medicationLabel: medication.label, medicationForm: medication.form }];
    const kind = lineKind(raw);
    if (kind === 'spacer') return [{ text: '', kind }];
    const prefix = kind === 'bullet' ? raw.slice(0, 2) : '';
    const content = prefix ? raw.slice(2) : raw;
    return wrapText(content, maxChars).map((line, index) => ({ text: `${index === 0 ? prefix : prefix ? '  ' : ''}${line}`, kind }));
  });
}

export function paginateDocument(document: ReceituarioDocumentData, options?: { maxChars?: number; bodyLinesPerPage?: number }): DocumentPageModel[] {
  const maxChars = options?.maxChars ?? 91;
  // A primeira página reserva espaço para identificação; sem essa margem o corpo invade o rodapé do A4.
  const bodyLinesPerPage = options?.bodyLinesPerPage ?? (document.documentType === 'term' ? 28 : 41);
  const firstPageLines = options?.bodyLinesPerPage ?? (document.documentType === 'term' ? 28 : 36);
  const layoutBody = document.documentType === 'term' ? stripTextSignatureSection(document.bodyPlainText) : document.bodyPlainText;
  const rawBlocks = blocksFromText(layoutBody, maxChars);
  const blocks: PaginatedLine[][] = [];
  for (let index = 0; index < rawBlocks.length; index += 1) {
    const block = rawBlocks[index];
    const firstText = block[0]?.text || '';
    if (/^(RESPONSÁVEL PELO ANIMAL|MÉDICO-VETERINÁRIO|TESTEMUNHA\s*\d*)/i.test(firstText)) {
      const signatureBlock = [...block];
      let cursor = index + 1;
      while (cursor < rawBlocks.length && signatureBlock.length < 7) {
        const next = rawBlocks[cursor];
        if (next.every((line) => line.kind === 'spacer') && signatureBlock.length > 1) break;
        signatureBlock.push(...next);
        cursor += 1;
      }
      blocks.push(signatureBlock);
      index = cursor - 1;
    } else {
      blocks.push(block);
    }
  }
  const pages: PaginatedLine[][] = [[]];
  let used = 0;

  const pageCapacity = () => pages.length === 1 ? firstPageLines : bodyLinesPerPage;
  for (let blockIndex = 0; blockIndex < blocks.length; blockIndex += 1) {
    const block = blocks[blockIndex];
    const blockSize = block.length;
    const current = pages[pages.length - 1];
    const shouldKeepTogether = blockSize <= 8;
    const nextBlockSize = blocks[blockIndex + 1]?.length || 0;
    const isSectionHeading = block[0]?.kind === 'heading';
    const shouldKeepHeadingWithNextBlock = isSectionHeading && nextBlockSize > 0 && blockSize + nextBlockSize <= 8;
    if (used > 0 && (shouldKeepTogether || shouldKeepHeadingWithNextBlock) && used + blockSize + (shouldKeepHeadingWithNextBlock ? nextBlockSize : 0) > pageCapacity()) {
      pages.push([]); used = 0;
    }
    for (const line of block) {
      if (used >= pageCapacity()) { pages.push([]); used = 0; }
      pages[pages.length - 1].push(line); used += 1;
    }
  }

  const totalPages = pages.length;
  return pages.map((lines, index) => ({ number: index + 1, totalPages, lines }));
}

export function hasLegacyPlaceholders(value: string): boolean {
  return /\{\{[^{}]+\}\}|\[[^\[\]\n]+\]/.test(String(value || ''));
}
