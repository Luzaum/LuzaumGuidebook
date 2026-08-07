import type { EditorialReference } from '../types/common';

export type EditorialReferenceMarkerToken = string;

const EXPLICIT_REF_MARKER_RE = /\{\{ref:([^}]+)\}\}/g;
const PARENTHETICAL_CITATION_RE = /\(([^()]+)\)/g;

export function getReferenceAnchorId(reference: EditorialReference, index: number): string {
  return reference.id || `reference-${index + 1}`;
}

export function resolveReferenceIndex(
  references: EditorialReference[] | undefined,
  token: EditorialReferenceMarkerToken
): number | null {
  if (!references?.length) return null;

  const normalized = String(token || '').trim();
  if (!normalized) return null;

  if (/^\d+$/.test(normalized)) {
    const numeric = Number(normalized);
    if (numeric >= 1 && numeric <= references.length) {
      return numeric - 1;
    }
    return null;
  }

  const byId = references.findIndex((reference) => reference.id === normalized);
  return byId >= 0 ? byId : null;
}

export function looksLikeBibliographicCitation(token: string): boolean {
  const value = String(token || '').trim();
  if (value.length < 8) return false;
  if (/\b(19|20)\d{2}\b/.test(value)) return true;
  if (/et al/i.test(value)) return true;
  if (/\b\d+(?:ª|º)?\s*ed/i.test(value)) return true;
  if (/plumb/i.test(value)) return true;
  if (/protect study/i.test(value)) return true;
  if (/nelson/i.test(value) && /couto/i.test(value)) return true;
  if (/johnson/i.test(value) && /respiratory/i.test(value)) return true;
  if (/rozanski/i.test(value)) return true;
  if (/mckiernan/i.test(value)) return true;
  if (/galler/i.test(value)) return true;
  if (/reinero/i.test(value)) return true;
  if (/trzil/i.test(value)) return true;
  if (/freeman/i.test(value)) return true;
  if (/summerfield/i.test(value)) return true;
  if (/cunningham/i.test(value)) return true;
  if (/bruyette/i.test(value)) return true;
  if (/august/i.test(value)) return true;
  return false;
}

function extractYear(value: string): string | null {
  return value.match(/\b(19|20)\d{2}\b/)?.[0] ?? null;
}

function extractLeadAuthor(value: string): string | null {
  const lead = value.split(/[,;&]/)[0]?.replace(/\bet al\.?\b/gi, '').trim() ?? '';
  const parts = lead.split(/\s+/).filter(Boolean);
  return parts[parts.length - 1]?.toLowerCase() ?? null;
}

export function resolveCitationTokenToReferenceIndex(
  token: string,
  references: EditorialReference[]
): number | null {
  const normalized = String(token || '').trim().toLowerCase();
  if (!normalized) return null;

  const year = extractYear(normalized);
  const leadAuthor = extractLeadAuthor(normalized);

  for (let index = 0; index < references.length; index += 1) {
    const reference = references[index];
    const haystack = `${reference.citationText} ${reference.notes || ''}`.toLowerCase();

    if (normalized.includes('protect') && haystack.includes('protect')) {
      return index;
    }

    if (normalized.includes('nelson') && normalized.includes('couto') && haystack.includes('nelson') && haystack.includes('couto')) {
      return index;
    }

    if (normalized.includes('plumb') && haystack.includes('plumb')) {
      return index;
    }

    if (year && haystack.includes(year)) {
      if (leadAuthor && haystack.includes(leadAuthor)) {
        return index;
      }
      if (/et al/i.test(normalized) && haystack.includes('et al')) {
        return index;
      }
    }

    if (leadAuthor && leadAuthor.length >= 4 && haystack.includes(leadAuthor) && (!year || haystack.includes(year))) {
      return index;
    }
  }

  return null;
}

export type EditorialRichTextSegment =
  | { type: 'text'; value: string }
  | { type: 'reference'; index: number };

export function splitEditorialRichText(value: string, references?: EditorialReference[]): EditorialRichTextSegment[] {
  const segments: EditorialRichTextSegment[] = [];
  const input = String(value || '');
  if (!input) return segments;

  let cursor = 0;
  const combined = new RegExp(`${EXPLICIT_REF_MARKER_RE.source}|${PARENTHETICAL_CITATION_RE.source}`, 'g');
  let match: RegExpExecArray | null;

  while ((match = combined.exec(input)) !== null) {
    if (match.index > cursor) {
      segments.push({ type: 'text', value: input.slice(cursor, match.index) });
    }

    const explicitToken = match[1];
    const parentheticalToken = match[2];

    if (explicitToken !== undefined) {
      const index = resolveReferenceIndex(references, explicitToken);
      if (index !== null) {
        segments.push({ type: 'reference', index });
      } else {
        segments.push({ type: 'text', value: match[0] });
      }
    } else if (parentheticalToken !== undefined) {
      const resolved =
        references && looksLikeBibliographicCitation(parentheticalToken)
          ? resolveCitationTokenToReferenceIndex(parentheticalToken, references)
          : null;

      if (resolved !== null) {
        segments.push({ type: 'reference', index: resolved });
      } else {
        segments.push({ type: 'text', value: match[0] });
      }
    }

    cursor = match.index + match[0].length;
  }

  if (cursor < input.length) {
    segments.push({ type: 'text', value: input.slice(cursor) });
  }

  return segments;
}
