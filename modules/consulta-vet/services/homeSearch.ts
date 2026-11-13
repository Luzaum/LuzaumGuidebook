import { REFERENCE_APPS } from '../data/referenceApps';
import type { ConsensusRecord } from '../types/consenso';
import type { DiseaseRecord } from '../types/disease';
import type { MedicationRecord } from '../types/medication';
import { fuzzyTokenScore } from '../utils/fuzzySearch';
import { normalizeMedicationSearch } from '../utils/medicationSearch';
import { formatConsensusSpecies, formatSpeciesList } from '../utils/navigation';

const BASE = '/consulta-vet';
const COMMERCIAL_PATH = `${BASE}/apresentacoes-comerciais`;
const STOP_WORDS = new Set(['a', 'o', 'as', 'os', 'de', 'da', 'do', 'das', 'dos', 'e', 'em', 'no', 'na', 'nos', 'nas', 'para', 'com']);

type SearchEntry = {
  title: string;
  to: string;
  section: string;
  description?: string | null;
  aliases?: readonly (string | null | undefined)[];
  context?: readonly (string | null | undefined)[];
};

type IndexedEntry = {
  entry: SearchEntry;
  title: string;
  titleTokens: string[];
  identity: string[];
  identityTokens: string[];
  contextTokens: string[];
};

export type ClinicalSearchLists = {
  diseases: DiseaseRecord[];
  medications: MedicationRecord[];
  consensos: ConsensusRecord[];
};

const SECTION_ENTRIES: SearchEntry[] = [
  { title: 'Doenças', to: `${BASE}/doencas`, section: 'Seção' },
  { title: 'Medicamentos', to: `${BASE}/medicamentos`, section: 'Seção', aliases: ['fármacos', 'remédios'] },
  { title: 'Consensos', to: `${BASE}/consensos`, section: 'Seção', aliases: ['diretrizes', 'guidelines'] },
  { title: 'Procedimentos', to: `${BASE}/guias-rapidos`, section: 'Seção', aliases: ['guias rápidos', 'técnicas'] },
  { title: 'Manejo emergencial', to: `${BASE}/manejo-emergencial`, section: 'Seção', aliases: ['emergências', 'cartilhas de emergência'] },
  { title: 'Mini-apps', to: `${BASE}/referencias-rapidas`, section: 'Seção', aliases: ['calculadoras', 'referências rápidas'] },
  { title: 'Apresentações comerciais', to: COMMERCIAL_PATH, section: 'Seção', aliases: ['comerciais', 'marcas', 'produtos'] },
  { title: 'Favoritos', to: `${BASE}/favoritos`, section: 'Seção' },
  { title: 'Recentes', to: `${BASE}/recentes`, section: 'Seção' },
];

const MINI_APP_ENTRIES: SearchEntry[] = REFERENCE_APPS.map((app) => ({
  title: app.name,
  to: app.to,
  section: 'Mini-app',
  description: app.description,
  aliases: app.keywords,
}));

function tokens(value: unknown): string[] {
  return normalizeMedicationSearch(value).match(/[a-z0-9]+/g) ?? [];
}

function searchWords(value: unknown): string[] {
  return tokens(value).filter((word) => !STOP_WORDS.has(word));
}

function speciesTerms(labels: string): string {
  return labels.replace(/canino/gi, 'canino canina caninos caninas cão cães cachorro cachorros')
    .replace(/felino/gi, 'felino felina felinos felinas gato gatos');
}

function indexEntries(entries: SearchEntry[]): IndexedEntry[] {
  return entries.map((entry) => {
    const titleTokens = searchWords(entry.title);
    const title = titleTokens.join(' ');
    const identity = [title, ...(entry.aliases ?? []).map((alias) => searchWords(alias).join(' '))].filter(Boolean);
    const identityTokens = [...new Set(identity.flatMap(tokens))];
    const contextTokens = [...new Set([
      ...identityTokens,
      ...searchWords([entry.description, ...(entry.context ?? [])].join(' ')),
    ])];
    return { entry, title, titleTokens, identity, identityTokens, contextTokens };
  });
}

export const homeNavigationIndex = indexEntries([...SECTION_ENTRIES, ...MINI_APP_ENTRIES]);

export function indexClinicalSearch({ diseases, medications, consensos }: ClinicalSearchLists) {
  return indexEntries([
    ...diseases.map((item) => ({
      title: item.title,
      to: `${BASE}/doencas/${item.slug}`,
      section: 'Doença',
      description: item.subtitle || item.quickSummary,
      aliases: [...item.synonyms, ...item.tags],
      context: [item.category, ...(item.categories ?? []), item.quickSummary, speciesTerms(formatSpeciesList(item.species))],
    })),
    ...medications.map((item) => ({
      title: item.title,
      to: `${BASE}/medicamentos/${item.slug}`,
      section: 'Medicamento',
      description: item.pharmacologicClass,
      aliases: [item.activeIngredient, ...item.tradeNames, ...item.tags],
      context: [item.category, ...item.indications, speciesTerms(formatSpeciesList(item.species))],
    })),
    ...consensos.filter((item) => item.isPublished).map((item) => ({
      title: item.title,
      to: `${BASE}/consensos/${item.slug}`,
      section: 'Consenso',
      description: item.organization,
      aliases: [item.shortTitle, item.organization, item.sourceOrganization, ...(item.tags ?? [])],
      context: [item.category, item.description, item.summary, item.year?.toString(), speciesTerms(formatConsensusSpecies(item.species))],
    })),
  ]);
}

export async function loadAdditionalHomeSearchIndex() {
  const sources = await Promise.allSettled([
    import('./emergencyGuideRepository').then(({ getEmergencyGuideRepository }) => getEmergencyGuideRepository().list()),
    import('./clinicalQuickGuideRepository').then(({ getClinicalQuickGuideRepository }) => getClinicalQuickGuideRepository().list()),
    import('../data/commercialOticProducts.seed').then(({ commercialOticProductsSeed }) => commercialOticProductsSeed),
  ]);
  const [emergencies, procedures, products] = sources;

  return {
    partial: sources.some((source) => source.status === 'rejected'),
    entries: indexEntries([
      ...(emergencies.status === 'fulfilled' ? emergencies.value : []).map((item) => ({
        title: item.title,
        to: `${BASE}/manejo-emergencial/${item.slug}`,
        section: 'Manejo emergencial',
        description: item.subtitle,
        aliases: item.tags,
        context: [item.description, speciesTerms(formatSpeciesList(item.species)), ...item.pages.map((page) => page.title)],
      })),
      ...(procedures.status === 'fulfilled' ? procedures.value : []).map((item) => ({
        title: item.title,
        to: `${BASE}/guias-rapidos/${item.slug}`,
        section: 'Procedimento',
        description: item.subtitle || item.summary,
        aliases: item.searchKeywords,
        context: [item.category, item.summary, ...item.quickBullets, speciesTerms(formatSpeciesList(item.species))],
      })),
      ...(products.status === 'fulfilled' ? products.value : []).map((item) => ({
        title: item.name,
        to: `${COMMERCIAL_PATH}?${new URLSearchParams({ q: item.name })}`,
        section: 'Comercial',
        description: item.activeComponents.join(' · '),
        aliases: [...item.activeComponents, ...(item.searchAliases ?? [])],
        context: [item.manufacturer, ...item.presentations, item.commercialClass, item.commercialSubclass,
          ...(item.commercialSubclasses ?? []), item.clinicalUse, speciesTerms(formatSpeciesList(item.species))],
      })),
    ]),
  };
}

function matchesTokens(words: string[], candidate: string[], prefix = false): boolean {
  return words.every((word) => candidate.some((token) => token === word ||
    (prefix && word.length >= 2 && token.startsWith(word))));
}

function relevance({ title, titleTokens, identity, identityTokens, contextTokens }: IndexedEntry, words: string[], phrase: string): number {
  if (title === phrase) return 0;
  if (identity.includes(phrase)) return 1;
  if (title.startsWith(`${phrase} `)) return 2;
  if (matchesTokens(words, titleTokens)) return 3;
  if (matchesTokens(words, identityTokens)) return 4;
  if (phrase.length >= 2 && title.startsWith(phrase)) return 5;
  if (matchesTokens(words, identityTokens, true)) return 6;
  if (matchesTokens(words, contextTokens)) return 7;
  if (matchesTokens(words, contextTokens, true)) return 8;

  const fuzzyWords = words.filter((word) => !/\d/.test(word));
  if (words.some((word) => /\d/.test(word) && !identityTokens.includes(word))) return Infinity;
  const fuzzy = fuzzyTokenScore(fuzzyWords, identityTokens);
  return fuzzy === null ? Infinity : 9 + fuzzy;
}

export function searchHomeIndex(entries: IndexedEntry[], query: string): SearchEntry[] {
  const words = [...new Set(searchWords(query))];
  if (!words.length) return [];
  const phrase = words.join(' ');
  const ranked = entries
    .map((item) => ({ entry: item.entry, score: relevance(item, words, phrase) }))
    .filter(({ score }) => Number.isFinite(score))
    .sort((left, right) => left.score - right.score || left.entry.title.localeCompare(right.entry.title, 'pt-BR'));
  const unique = new Map<string, SearchEntry>();
  for (const { entry } of ranked) {
    if (!unique.has(entry.to)) unique.set(entry.to, entry);
  }
  return [...unique.values()];
}
