import type { ReceituarioDocumentData } from '../types/receituario';

export const EMPTY_FIELD_LABEL = 'A PREENCHER';

export interface PaginatedLine {
  text: string;
  kind: 'body' | 'heading' | 'bullet' | 'spacer';
}

export interface DocumentPageModel {
  number: number;
  totalPages: number;
  lines: PaginatedLine[];
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
    displayField(header.veterinarianName),
    `CRMV: ${displayField(header.crmv)}`,
  ].join('\n'));
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

function blocksFromText(text: string, maxChars: number): PaginatedLine[][] {
  return sanitizeIssuedText(text).split('\n').map((raw) => {
    const kind = lineKind(raw);
    if (kind === 'spacer') return [{ text: '', kind }];
    const prefix = kind === 'bullet' ? raw.slice(0, 2) : '';
    const content = prefix ? raw.slice(2) : raw;
    return wrapText(content, maxChars).map((line, index) => ({ text: `${index === 0 ? prefix : prefix ? '  ' : ''}${line}`, kind }));
  });
}

export function paginateDocument(document: ReceituarioDocumentData, options?: { maxChars?: number; bodyLinesPerPage?: number }): DocumentPageModel[] {
  const maxChars = options?.maxChars ?? 91;
  const bodyLinesPerPage = options?.bodyLinesPerPage ?? 43;
  const rawBlocks = blocksFromText(document.bodyPlainText, maxChars);
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

  for (const block of blocks) {
    const blockSize = block.length;
    const current = pages[pages.length - 1];
    const shouldKeepTogether = blockSize <= 8;
    if (used > 0 && shouldKeepTogether && used + blockSize > bodyLinesPerPage) {
      pages.push([]); used = 0;
    }
    for (const line of block) {
      if (used >= bodyLinesPerPage) { pages.push([]); used = 0; }
      pages[pages.length - 1].push(line); used += 1;
    }
  }

  const totalPages = pages.length;
  return pages.map((lines, index) => ({ number: index + 1, totalPages, lines }));
}

export function hasLegacyPlaceholders(value: string): boolean {
  return /\{\{[^{}]+\}\}|\[[^\[\]\n]+\]/.test(String(value || ''));
}
