import { EditorialSectionValue } from '../types/common';

export function splitMultiline(value: string): string[] {
  return String(value || '')
    .split(/\r?\n/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function formatMultiline(values?: string[]): string {
  return Array.isArray(values) ? values.join('\n') : '';
}

export function formatSectionValue(value: EditorialSectionValue): string {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.join('\n');
  return JSON.stringify(value, null, 2);
}

export function parseSectionValue(value: string): EditorialSectionValue {
  const trimmed = String(value || '').trim();
  if (!trimmed) return '';

  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    return JSON.parse(trimmed) as EditorialSectionValue;
  }

  const lines = splitMultiline(trimmed);
  if (lines.length > 1) {
    return lines;
  }

  return trimmed;
}

export function formatJson(value: unknown): string {
  if (value == null) return '';
  return JSON.stringify(value, null, 2);
}

export function parseJsonValue<T>(value: string, fallback: T): T {
  const trimmed = String(value || '').trim();
  if (!trimmed) return fallback;
  return JSON.parse(trimmed) as T;
}

export function normalizeOptionalText(value: string): string | null {
  const trimmed = String(value || '').trim();
  return trimmed || null;
}

export function htmlToEditorText(value: string): string {
  const normalized = String(value || '').trim();
  if (!normalized) return '';

  return normalized
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>\s*<p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .trim();
}

export function editorTextToHtml(value: string): string {
  const paragraphs = String(value || '')
    .split(/\r?\n\r?\n/g)
    .map((item) => item.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return '<p></p>';
  }

  return paragraphs
    .map((paragraph) => `<p>${paragraph.replace(/\r?\n/g, '<br />')}</p>`)
    .join('');
}
