import assert from 'node:assert/strict';
import test from 'node:test';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { medicationsSeed } from '../../modules/consulta-vet/data/seed/medications.seed';
import { commercialOticProductsSeed } from '../../modules/consulta-vet/data/commercialOticProducts.seed';
import {
  PUBLIC_CATALOG_DISEASE_CARD_STUBS,
  PUBLIC_CATALOG_MEDICATION_CARD_STUBS,
} from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';
import { clinicalQuickGuidesSeed } from '../../modules/consulta-vet/data/seed/clinicalQuickGuides.seed';

const TEXTBOOK_INLINE_PATTERNS: Array<{ label: string; regex: RegExp }> = [
  { label: "Plumb's", regex: /Plumb[’'\\]*s|\bPlumb\b(?![a-z])/i },
  { label: 'BSAVA', regex: /\bBSAVA\b/i },
  { label: 'Nelson & Couto', regex: /Nelson\s*(?:&|e)\s*Couto/i },
  { label: 'Ettinger', regex: /\bEttinger(?:[’']s)?\b/i },
  { label: 'Greene', regex: /\bGreene(?:[’']s)?\b/i },
  { label: 'Withrow & MacEwen', regex: /\bWithrow\b/i },
  { label: "Kirk's CVT", regex: /\bKirk(?:[’']s)?\b/i },
  { label: 'Papich', regex: /\bPapich\b/i },
  { label: 'Feldman & Nelson', regex: /Feldman\s*(?:&|e)\s*Nelson/i },
  { label: 'AVCN', regex: /\bAVCN\b|Applied Veterinary Clinical Nutrition/i },
  { label: 'de Lahunta', regex: /de\s+Lahunta/i },
  { label: 'Dewey & da Costa', regex: /Dewey\s*(?:&|e)\s*(?:da\s+Costa|de\s+Lahunta)/i },
  { label: 'Lumb & Jones', regex: /Lumb\s*(?:&|e)\s*Jones/i },
  { label: 'DiBartola', regex: /\bDiBartola\b/i },
  { label: 'Platt & Garosi', regex: /Platt\s*(?:&|e)\s*Garosi/i },
];

const INLINE_BOOK_REF_TOKEN =
  /\{\{ref:ref-(?:nelson|plumbs|plumb|bsava|ettinger|greene|withrow|kirk|papich|feldman|lumb|dibartola|delahunta|dewey)[^}]*\}\}/i;

function scrubAllowedNonTextbookMentions(text: string): string {
  return text
    .replace(/\bplumbemia\b/gi, '')
    .replace(/\bMerck\s+(?:Sa[úu]de|Animal\s+Health)\b/gi, '')
    .replace(/\bMSD\s*\/\s*Merck\b/gi, '')
    .replace(/\bKirk(?:\s*,\s*Levy\s*&\s*Crawford|\s+et\s+al\.|\s*\(?\s*2017\s*\)?)/g, '')
    .replace(/\bReinert\s*&\s*Feldman\b/g, '')
    .replace(/\bLappin\s+MR,\s+Greene\s+CE\b/g, '')
    .replace(/\bGreene\s+SN\b/g, '')
    .replace(/\bPapich\s+(?:et\s+al\.|MG|\(?\s*20(?:04|17|25|26)\)?)/g, '')
    .replace(/\bDewey\s+(?:et\s+al\.|CW)\b/g, '')
    .replace(/\{\{ref:ref-bsava-neuro-video-1417\}\}/g, '')
    .replace(/\{\{ref:ref-kirk-2017\}\}/g, '');
}

function collectStrings(value: unknown, ignoredKeys: Set<string>, path = ''): Array<{ path: string; text: string }> {
  if (typeof value === 'string') {
    return [{ path, text: value }];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, idx) => collectStrings(item, ignoredKeys, `${path}[${idx}]`));
  }
  if (value && typeof value === 'object') {
    const out: Array<{ path: string; text: string }> = [];
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (ignoredKeys.has(k)) continue;
      out.push(...collectStrings(v, ignoredKeys, path ? `${path}.${k}` : k));
    }
    return out;
  }
  return [];
}

function findInlineTextbookViolations(entries: Array<{ path: string; text: string }>): string[] {
  const errors: string[] = [];
  for (const { path, text } of entries) {
    const scrubbed = scrubAllowedNonTextbookMentions(text);
    if (INLINE_BOOK_REF_TOKEN.test(scrubbed)) {
      errors.push(`${path}: token inline para livro (${scrubbed.match(INLINE_BOOK_REF_TOKEN)?.[0]})`);
    }
    for (const { label, regex } of TEXTBOOK_INLINE_PATTERNS) {
      if (regex.test(scrubbed)) {
        errors.push(`${path}: menção inline a "${label}" em "${text.slice(0, 120)}"`);
      }
    }
  }
  return errors;
}

test('nenhuma doença possui citações diretas a livros-texto no corpo do conteúdo', () => {
  const ignored = new Set(['id', 'slug', 'references', 'referenceIds', 'relatedDiseaseSlugs', 'relatedConsensusSlugs', 'relatedMedicationSlugs', 'imageUrl', 'src']);
  const errors: string[] = [];
  for (const disease of diseasesSeed) {
    const strings = collectStrings(disease, ignored, `disease:${disease.slug}`);
    errors.push(...findInlineTextbookViolations(strings));
  }
  assert.deepEqual(errors, [], `Encontradas citações inline a livros em doenças:\n${errors.join('\n')}`);
});

test('nenhum medicamento ou posologia possui citações diretas a livros-texto fora de references', () => {
  const ignored = new Set(['id', 'slug', 'references', 'referenceIds', 'referenceId', 'presentationId', 'authorsYear', 'citationText', 'citation', 'url', 'imageUrl', 'diseaseSlugs', 'relatedDiseaseSlugs', 'source']);
  const errors: string[] = [];
  for (const med of medicationsSeed) {
    const strings = collectStrings(med, ignored, `med:${med.slug}`);
    errors.push(...findInlineTextbookViolations(strings));
  }
  assert.deepEqual(errors, [], `Encontradas citações inline a livros em medicamentos:\n${errors.join('\n')}`);
});

test('nenhum produto comercial possui citações diretas a livros-texto nos campos exibidos na UI', () => {
  const ignored = new Set(['id', 'slug', 'medicationSlug', 'productPageUrl', 'labelUrl', 'imageUrl', 'manufacturer', 'searchAliases']);
  const errors: string[] = [];
  for (const prod of commercialOticProductsSeed) {
    const strings = collectStrings(prod, ignored, `commercial:${prod.id}`);
    errors.push(...findInlineTextbookViolations(strings));
  }
  assert.deepEqual(errors, [], `Encontradas citações inline a livros em produtos comerciais:\n${errors.join('\n')}`);
});

test('stubs de catálogo e títulos editoriais não possuem citações diretas a livros-texto', () => {
  const ignored = new Set(['id', 'slug', 'category', 'categories', 'relatedDiseaseSlugs', 'relatedConsensusSlugs', 'relatedMedicationSlugs', 'source']);
  const errors = [
    ...findInlineTextbookViolations(collectStrings(PUBLIC_CATALOG_DISEASE_CARD_STUBS, ignored, 'diseaseStubs')),
    ...findInlineTextbookViolations(collectStrings(PUBLIC_CATALOG_MEDICATION_CARD_STUBS, ignored, 'medStubs')),
    ...findInlineTextbookViolations(collectStrings(FULL_KEY_LABELS, new Set(), 'FULL_KEY_LABELS')),
  ];
  assert.deepEqual(errors, [], `Encontradas citações inline em stubs/labels:\n${errors.join('\n')}`);
});

test('guias rápidos não possuem citações diretas a livros-texto antes da bibliografia final', () => {
  const errors: string[] = [];
  for (const guide of clinicalQuickGuidesSeed) {
    const bodySections = [];
    for (const sec of guide.sections) {
      if (
        sec.type === 'heading' &&
        /^(?:\d+\.\s*)?(?:refer[êe]ncias|bibliografia|fontes\b)/i.test(sec.text.trim())
      ) {
        break;
      }
      bodySections.push(sec);
    }
    const entries = collectStrings(
      { title: guide.title, subtitle: guide.subtitle, summary: guide.summary, sections: bodySections },
      new Set(['id', 'slug', 'url', 'src']),
      `guide:${guide.slug}`
    );
    errors.push(...findInlineTextbookViolations(entries));
  }
  assert.deepEqual(errors, [], `Encontradas citações inline em guias rápidos:\n${errors.join('\n')}`);
});
