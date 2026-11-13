import React, { useEffect, useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  homeNavigationIndex,
  indexClinicalSearch,
  loadAdditionalHomeSearchIndex,
  searchHomeIndex,
  type ClinicalSearchLists,
} from '../../services/homeSearch';

const PAGE_SIZE = 8;
const MAX_PREVIEW_LENGTH = 160;
type AdditionalIndex = Awaited<ReturnType<typeof loadAdditionalHomeSearchIndex>>;

function getDescriptionPreview(description?: string | null): string {
  const text = description?.replace(/\s+/g, ' ').trim() ?? '';
  if (text.length <= MAX_PREVIEW_LENGTH) return text;

  const prefix = text.slice(0, MAX_PREVIEW_LENGTH - 1);
  const lastSpace = prefix.lastIndexOf(' ');
  const excerpt = lastSpace > 0 && text[prefix.length] !== ' ' ? prefix.slice(0, lastSpace) : prefix;
  return `${excerpt.trimEnd()}…`;
}

export function HomeSearchResults({ query, clinicalLists, clinicalUnavailable }: {
  query: string;
  clinicalLists: ClinicalSearchLists | null;
  clinicalUnavailable: boolean;
}) {
  const active = Boolean(query);
  const [additional, setAdditional] = useState<AdditionalIndex | null>(null);
  const [visible, setVisible] = useState({ query, count: PAGE_SIZE });

  useEffect(() => {
    if (!active || additional) return;
    let cancelled = false;
    void loadAdditionalHomeSearchIndex().then(
      (index) => { if (!cancelled) setAdditional(index); },
      () => { if (!cancelled) setAdditional({ entries: [], partial: true }); },
    );
    return () => { cancelled = true; };
  }, [active, additional]);

  const clinicalIndex = useMemo(() => active && clinicalLists ? indexClinicalSearch(clinicalLists) : [], [active, clinicalLists]);
  const results = useMemo(() => {
    if (!query) return [];
    return searchHomeIndex([...homeNavigationIndex, ...clinicalIndex, ...(additional?.entries ?? [])], query);
  }, [additional, clinicalIndex, query]);

  if (!active) return null;

  const pending = !additional || (!clinicalLists && !clinicalUnavailable);
  const partial = clinicalUnavailable || additional?.partial;
  const limit = visible.query === query ? visible.count : PAGE_SIZE;

  return (
    <section id="vetius-search-results" aria-labelledby="vetius-search-results-title" className="w-full max-w-2xl rounded-2xl border border-border/90 bg-card p-3 text-left shadow-sm sm:p-4">
      <h2 id="vetius-search-results-title" className="px-2 text-sm font-bold text-foreground">Resultados da busca</h2>
      <p role="status" className={results.length && !pending ? 'sr-only' : 'px-2 pt-2 text-sm text-muted-foreground'}>
        {pending ? 'Buscando no Vetius…' : results.length
          ? `${results.length} ${results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}.`
          : 'Nenhum resultado encontrado.'}
      </p>
      {partial && <p className="px-2 pt-2 text-sm text-muted-foreground">Alguns setores estão indisponíveis no momento.</p>}
      {results.length > 0 && (
        <ul className="mt-2 divide-y divide-border/60">
          {results.slice(0, limit).map((result) => {
            const preview = getDescriptionPreview(result.description);
            return (
              <li key={result.to}>
                <Link to={result.to} className="flex items-center justify-between gap-3 rounded-xl px-2 py-2.5 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary">
                  <span className="min-w-0">
                    <span className="line-clamp-2 break-words text-sm font-semibold text-foreground">{result.title}</span>
                    <span className="line-clamp-2 break-words text-xs text-muted-foreground">
                      <span className="font-medium text-primary">{result.section}</span>
                      {preview && <span className="ml-1.5">· {preview}</span>}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      {results.length > limit && (
        <button type="button" onClick={() => setVisible({ query, count: limit + PAGE_SIZE })} className="mt-2 rounded-lg px-2 py-2 text-sm font-semibold text-primary hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary">
          Mostrar mais resultados
        </button>
      )}
    </section>
  );
}
