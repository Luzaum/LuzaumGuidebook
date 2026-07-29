import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Plus, Search, FileText } from 'lucide-react';
import { ConsultaVetPageHero } from '../components/layout/ConsultaVetPageHero';
import { getEntityCategoryTheme } from '../components/shared/EntityCard';
import { ConsensusRecord, ConsensusSpecies } from '../types/consenso';
import { getConsensoRepository } from '../services/consensoRepository';
import {
  getConsensusEditorialStatus,
  getConsensusSymbol,
} from '../utils/consensusVisuals';
import { cn } from '../../../lib/utils';

type SpeciesFilter = ConsensusSpecies | '';

const SPECIES_OPTIONS: Array<{ value: SpeciesFilter; label: string }> = [
  { value: '', label: 'Todas as espécies' },
  { value: 'dog', label: 'Canino' },
  { value: 'cat', label: 'Felino' },
  { value: 'both', label: 'Ambos' },
];

function formatSpecies(species: ConsensusSpecies): string {
  if (species === 'dog') return 'Canino';
  if (species === 'cat') return 'Felino';
  return 'Ambos';
}

const UI = {
  eyebrow: 'Diretrizes',
  title: 'Consensos',
  lead: 'Diretrizes e consensos clínicos para consulta rápida no atendimento.',
} as const;

function formatCategory(category: string | null): string {
  if (!category) return 'Sem categoria';
  return category
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function ConsensosPage() {
  const repository = useMemo(() => getConsensoRepository(), []);

  const [consensos, setConsensos] = useState<ConsensusRecord[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [species, setSpecies] = useState<SpeciesFilter>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await repository.list({ query, category, species });
        if (!isMounted) return;
        setConsensos(data);
      } catch (err) {
        if (!isMounted) return;
        setError('Não foi possível carregar os consensos.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [repository, query, category, species]);

  const categoryOptions = useMemo(() => {
    const unique = Array.from(
      new Set(consensos.map((item) => String(item.category || '').trim()).filter(Boolean))
    ).sort();

    return [{ value: '', label: 'Todas as categorias' }, ...unique.map((value) => ({ value, label: formatCategory(value) }))];
  }, [consensos]);

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-8 p-4 md:p-8">
      <ConsultaVetPageHero
        eyebrow={UI.eyebrow}
        title={UI.title}
        description={UI.lead}
        icon={FileText}
        accent="violet"
        aside={
          <Link
            to="/consulta-vet/consensos/novo"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-opacity hover:opacity-95 md:w-auto"
          >
            <Plus className="h-4 w-4" />
            Adicionar consenso
          </Link>
        }
        footer={
          <div className="grid gap-3 md:grid-cols-3">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60" />
              <input
                type="text"
                placeholder="Buscar por título ou organização..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full rounded-xl border border-border/90 bg-background/95 py-2.5 pl-10 pr-4 text-sm text-foreground shadow-inner outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="rounded-xl border border-border/90 bg-background/95 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value || 'all'} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={species}
                onChange={(event) => setSpecies(event.target.value as SpeciesFilter)}
                className="rounded-xl border border-border/90 bg-background/95 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {SPECIES_OPTIONS.map((option) => (
                  <option key={option.value || 'all'} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        }
      />

      {isLoading && (
        <div className="rounded-2xl border border-border bg-card py-16 text-center">
          <p className="text-muted-foreground">Carregando consensos...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-6 py-5">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {!isLoading && !error && consensos.length === 0 && (
        <div className="rounded-2xl border border-border bg-card py-16 text-center">
          <p className="text-muted-foreground">Nenhum consenso encontrado com os filtros atuais.</p>
        </div>
      )}

      {!isLoading && !error && consensos.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {consensos.map((consenso) => {
            const theme = getEntityCategoryTheme(consenso.category);
            const symbol = getConsensusSymbol(consenso.slug);
            const editorialStatus = getConsensusEditorialStatus(consenso.slug);

            return (
              <article
                key={consenso.id}
                className={cn(
                  'group relative flex min-h-[286px] flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-5 transition-all duration-300',
                  theme.borderHover,
                  theme.glow
                )}
                style={{
                  backgroundImage: `linear-gradient(145deg, ${theme.glowBg}, transparent 58%)`,
                }}
              >
                <div className="mb-4 flex items-start gap-4">
                  <div className={cn('h-16 w-16 shrink-0 overflow-hidden rounded-xl border', theme.badge)}>
                    {symbol ? (
                      <img
                        src={symbol}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <FileText className="m-4 h-8 w-8" aria-hidden="true" />
                    )}
                  </div>

                  <div className="min-w-0 pt-0.5">
                    <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground">
                      {consenso.title}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                      {consenso.organization || 'Organização não informada'}
                      {consenso.year ? ` • ${consenso.year}` : ''}
                    </p>
                  </div>
                </div>

                <div className="mb-3 flex flex-wrap gap-2 text-xs">
                  <span className={cn('rounded-md border px-2 py-1 font-medium', theme.badge)}>
                    {formatCategory(consenso.category)}
                  </span>
                  <span className="rounded-md border border-border bg-muted px-2 py-1 text-muted-foreground">
                    {formatSpecies(consenso.species)}
                  </span>
                  {editorialStatus && (
                    <span
                      className={cn(
                        'rounded-md border px-2 py-1 font-semibold',
                        editorialStatus.className
                      )}
                    >
                      {editorialStatus.label}
                    </span>
                  )}
                </div>

                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {consenso.description || consenso.summary || 'Conteúdo clínico disponível para consulta.'}
                </p>

                <div className={cn('mt-auto flex justify-end border-t pt-3', theme.line)}>
                  <Link
                    to={`/consulta-vet/consensos/${consenso.slug}`}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    Abrir consenso
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
