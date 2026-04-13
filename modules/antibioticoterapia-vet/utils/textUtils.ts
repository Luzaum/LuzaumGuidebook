
import { NAME_ALIASES, DISEASE_ALIASES } from '../constants';

export const stripAccents = (s: string): string => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const normalizeBaseName = (s: string): string => stripAccents(s).toLowerCase()
  .replace(/\([^)]*\)/g, ' ')
  .replace(/\b(iv|sc|im|vo|po|sid|bid|tid|qid)\b/g, ' ')
  .replace(/[+\\/]/g, ' + ')
  .replace(/[^a-z0-9+]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

// Alias maps are created once and reused
const NAME_ALIAS_MAP = Object.fromEntries(Object.entries(NAME_ALIASES).map(([k, v]) => [normalizeBaseName(k), v]));
const DISEASE_ALIAS_MAP = Object.fromEntries(Object.entries(DISEASE_ALIASES).map(([k, v]) => [normalizeBaseName(k), v]));

export const getCanonicalName = (name: string, aliasMap: { [key: string]: string }): string => {
  const norm = normalizeBaseName(name || '');
  const aliased = aliasMap[norm] || name || '';
  return normalizeBaseName(aliased);
};

export const canonicalDrugName = (name: string): string => getCanonicalName(name, NAME_ALIAS_MAP);
export const canonicalDiseaseName = (name: string): string => getCanonicalName(name, DISEASE_ALIAS_MAP);
