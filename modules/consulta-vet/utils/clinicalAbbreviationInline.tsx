import React, { createContext, useContext } from 'react';
import { clinicalAcronyms, type ClinicalAcronym } from '../../../data/clinicalAcronyms.v2';

/** Rastreia siglas já explicadas na página (primeira ocorrência = texto visível). */
export const AbbreviationExpandedContext = createContext<Set<string> | null>(null);

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

type SortedAbbrev = { term: string; meaning: string };

function buildSortedTerms(): SortedAbbrev[] {
  const terms: SortedAbbrev[] = [];
  for (const entry of clinicalAcronyms) {
    terms.push({ term: entry.acronym, meaning: entry.meaning });
    for (const alias of entry.aliases ?? []) {
      terms.push({ term: alias, meaning: entry.meaning });
    }
  }
  return terms.sort((left, right) => right.term.length - left.term.length);
}

const SORTED_TERMS = buildSortedTerms();

type AbbrevMatch = { term: string; meaning: string; index: number; length: number };

function findNextMatch(text: string, fromIndex: number): AbbrevMatch | null {
  let best: AbbrevMatch | null = null;

  for (const { term, meaning } of SORTED_TERMS) {
    const re = new RegExp(`(^|[^\\p{L}\\p{N}])(${escapeRegExp(term)})(?=$|[^\\p{L}\\p{N}])`, 'u');
    const slice = text.slice(fromIndex);
    const match = re.exec(slice);
    if (!match) continue;

    const index = fromIndex + match.index + match[1].length;
    const length = match[2].length;
    if (!best || index < best.index || (index === best.index && length > best.length)) {
      best = { term: match[2], meaning, index, length };
    }
  }

  return best;
}

export function lookupClinicalAbbreviation(term: string): ClinicalAcronym | null {
  const normalized = term.trim();
  if (!normalized) return null;
  return (
    clinicalAcronyms.find(
      (entry) => entry.acronym === normalized || entry.aliases?.some((alias) => alias === normalized)
    ) ?? null
  );
}

/** Insere explicação na 1ª ocorrência de cada sigla na página; demais ficam com tooltip. */
export function ClinicalAbbreviationText({ text }: { text: string }) {
  const expandedSet = useContext(AbbreviationExpandedContext);

  if (!text) return null;

  const parts: React.ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  while (cursor < text.length) {
    const match = findNextMatch(text, cursor);
    if (!match) {
      parts.push(<React.Fragment key={key++}>{text.slice(cursor)}</React.Fragment>);
      break;
    }

    if (match.index > cursor) {
      parts.push(<React.Fragment key={key++}>{text.slice(cursor, match.index)}</React.Fragment>);
    }

    const termKey = match.term.toUpperCase();
    const explainInline = expandedSet ? !expandedSet.has(termKey) : true;
    if (expandedSet && explainInline) expandedSet.add(termKey);

    if (explainInline) {
      parts.push(
        <React.Fragment key={key++}>
          <strong className="font-semibold">{match.term}</strong>
          <span className="opacity-75"> ({match.meaning})</span>
        </React.Fragment>
      );
    } else {
      parts.push(
        <abbr
          key={key++}
          title={match.meaning}
          className="cursor-help border-b border-dotted border-current/40 font-semibold no-underline"
        >
          {match.term}
        </abbr>
      );
    }

    cursor = match.index + match.length;
  }

  return <>{parts}</>;
}
