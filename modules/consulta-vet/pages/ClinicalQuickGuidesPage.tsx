import React, { useDeferredValue, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, Search } from 'lucide-react';
import { ConsultaVetPageHero } from '../components/layout/ConsultaVetPageHero';
import { ClinicalQuickGuideCard } from '../components/clinicalQuickGuide/ClinicalQuickGuideCard';
import { getClinicalQuickGuideRepository } from '../services/clinicalQuickGuideRepository';
import { ClinicalQuickGuide, ClinicalQuickGuideCategoryId } from '../types/clinicalQuickGuide';
import { CLINICAL_QUICK_GUIDE_CATEGORIES } from '../data/seed/clinicalQuickGuides.categories';
import { cn } from '../../../lib/utils';

const UI_TEXT = {
  home: 'Início',
  title: 'Guia rápido clínico',
  lead:
    'Conceitos por sistema (especialidade), com guia breve, figuras, tabelas e vídeos incorporados quando disponíveis. Use a busca ou filtre por tema.',
  howTitle: 'Como usar',
  howBody:
    'Cada card abre um tópico com resumo rápido e conteúdo completo. Em mobile, os cartões empilham em duas colunas quando há espaço; em telas estreitas, uma coluna.',
  searchPlaceholder: 'Buscar por nome ou palavra-chave…',
  filterAll: 'Todos',
  empty: 'Nenhum guia corresponde à busca ou ao filtro.',
} as const;

/** Remove marcas diacríticas latinas — evita `\p{M}` (Unicode property), incompatível com alguns WebViews/navegadores. */
function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function matchesQuery(guide: ClinicalQuickGuide, q: string): boolean {
  if (!q.trim()) return true;
  const n = normalize(q);
  const hay = [
    guide.title,
    guide.subtitle,
    guide.summary,
    ...guide.searchKeywords,
    ...guide.species,
  ]
    .join(' ')
    .toLowerCase();
  return normalize(hay).includes(n);
}

export function ClinicalQuickGuidesPage() {
  const repo = useMemo(() => getClinicalQuickGuideRepository(), []);
  const [guides, setGuides] = useState<ClinicalQuickGuide[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ClinicalQuickGuideCategoryId | 'all'>('all');
  const deferredQuery = useDeferredValue(query);

  React.useEffect(() => {
    let ok = true;
    void repo.list().then(
      (list) => {
        if (ok) setGuides(list);
      },
      () => {
        if (ok) setError('Não foi possível carregar os guias.');
      }
    );
    return () => {
      ok = false;
    };
  }, [repo]);

  const categoryLabel = useMemo(
    () =>
      Object.fromEntries(CLINICAL_QUICK_GUIDE_CATEGORIES.map((c) => [c.id, c.shortLabel])) as Record<
        ClinicalQuickGuideCategoryId,
        string
      >,
    []
  );

  const filtered = useMemo(() => {
    return guides.filter((g) => {
      if (category !== 'all' && g.category !== category) return false;
      return matchesQuery(g, deferredQuery);
    });
  }, [guides, category, deferredQuery]);

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-8 p-4 md:p-8">
      <nav className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
        <Link to="/consulta-vet" className="transition-colors hover:text-primary">
          {UI_TEXT.home}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{UI_TEXT.title}</span>
      </nav>

      <ConsultaVetPageHero
        eyebrow="Consulta objetiva"
        title={UI_TEXT.title}
        description={UI_TEXT.lead}
        icon={BookOpen}
        accent="emerald"
        footer={
          <div className="rounded-2xl border border-primary/18 bg-primary/[0.06] px-5 py-5 md:px-6">
            <h2 className="text-sm font-bold text-foreground">{UI_TEXT.howTitle}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{UI_TEXT.howBody}</p>
          </div>
        }
      />

      {error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-5 py-4 text-sm text-destructive">{error}</div>
      ) : null}

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
        <div className="relative max-w-xl flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={UI_TEXT.searchPlaceholder}
            className="w-full rounded-2xl border border-border/90 bg-background py-3 pl-10 pr-4 text-sm shadow-inner outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            aria-label={UI_TEXT.searchPlaceholder}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar por especialidade">
        <button
          type="button"
          role="tab"
          aria-selected={category === 'all'}
          onClick={() => setCategory('all')}
          className={cn(
            'rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-200',
            category === 'all'
              ? 'border-primary bg-primary text-primary-foreground shadow-sm'
              : 'border-border/80 bg-card/80 text-muted-foreground hover:border-primary/35 hover:text-foreground'
          )}
        >
          {UI_TEXT.filterAll}
        </button>
        {CLINICAL_QUICK_GUIDE_CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={category === c.id}
            onClick={() => setCategory(c.id)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-200',
              category === c.id
                ? 'border-teal-500 bg-teal-500/15 text-teal-900 shadow-sm dark:text-teal-100'
                : 'border-border/80 bg-card/80 text-muted-foreground hover:border-teal-500/30 hover:text-foreground'
            )}
          >
            {c.shortLabel}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border/80 bg-muted/20 px-5 py-8 text-center text-sm text-muted-foreground">
          {UI_TEXT.empty}
        </p>
      ) : (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2" aria-label="Lista de guias">
          {filtered.map((g) => (
            <ClinicalQuickGuideCard
              key={g.id}
              guide={g}
              categoryLabel={categoryLabel[g.category] ?? g.category}
            />
          ))}
        </section>
      )}
    </div>
  );
}
