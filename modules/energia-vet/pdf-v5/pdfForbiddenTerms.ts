/** Padrões proibidos no texto renderizado do PDF clínico. */
export const FORBIDDEN_PDF_PATTERNS: RegExp[] = [
  /\bfeature\b/i,
  /\bfeature flag\b/i,
  /\bflag\b/i,
  /\blegacy\b/i,
  /\bmigration\b/i,
  /\bsupabase\b/i,
  /\blocalstorage\b/i,
  /\bsnapshot\b/i,
  /\bjson\b/i,
  /\bdebug\b/i,
  /\bstaging\b/i,
  /\bengineversion\b/i,
  /\bformulaid\b/i,
  /\bsourceid\b/i,
  /\bclinicalrulesetversion\b/i,
  /\bnutrition-calc/i,
  /\bnutrition-pdf/i,
  /\bnutrition-clinical/i,
  /\bmotor v3\b/i,
  /\bengine v3\b/i,
  /\bplaceholder\b/i,
  /\bTODO\b/,
]

export function findForbiddenPdfTerms(text: string): string[] {
  const hits: string[] = []
  for (const pattern of FORBIDDEN_PDF_PATTERNS) {
    const match = text.match(pattern)
    if (match) hits.push(match[0])
  }
  return [...new Set(hits)]
}

export function assertNoForbiddenPdfTerms(text: string, label = 'PDF'): void {
  const hits = findForbiddenPdfTerms(text)
  if (hits.length) {
    throw new Error(`${label} contém termos proibidos: ${hits.join(', ')}`)
  }
}
