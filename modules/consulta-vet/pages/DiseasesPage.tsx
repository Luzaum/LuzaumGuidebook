import React, { useEffect, useMemo, useState } from 'react';
import { Stethoscope, LayoutGrid } from 'lucide-react';
import { ConsultaVetPageHero } from '../components/layout/ConsultaVetPageHero';
import { EntityCard } from '../components/shared/EntityCard';
import { ModuleSearchInput } from '../components/shared/ModuleSearchInput';
import { getDiseaseRepository } from '../services/diseaseRepository';
import { getCategoryRepository } from '../services/categoryRepository';
import { DiseaseRecord } from '../types/disease';
import { Category } from '../types/category';
import { formatSpeciesList } from '../utils/navigation';
import { cn } from '../../../lib/utils';
import { diseaseMatchesCategoryFilter, getDiseaseCategorySlugs, normalizeCategorySlug } from '../utils/diseaseCategories';
import { formatDiseaseCategoryLabels, getSpecialtyVisual } from '../utils/specialtyVisuals';

const UI_TEXT = {
  eyebrow: 'Área clínica',
  title: 'Doenças & Especialidades',
  body: 'Diretrizes editoriais práticas organizadas por especialidades para suporte à decisão rápida no atendimento.',
  placeholder: 'Buscar por nome, sinônimo ou palavra-chave...',
  resultsLabel: 'Catálogo de Doenças',
  empty: 'Nenhuma doença encontrada com os filtros atuais.',
  allCategories: 'Todas as Especialidades',
} as const;

export function DiseasesPage() {
  const diseaseRepository = useMemo(() => getDiseaseRepository(), []);
  const categoryRepository = useMemo(() => getCategoryRepository(), []);

  const [diseases, setDiseases] = useState<DiseaseRecord[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carrega doenças e categorias
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [nextDiseases, nextCategories] = await Promise.all([
          query.trim()
            ? diseaseRepository.search(query.trim())
            : diseaseRepository.list(),
          categoryRepository.list(),
        ]);

        if (!isMounted) return;
        setDiseases(nextDiseases.filter((item) => item && item.id && item.slug && item.title));
        setCategories(nextCategories.filter((item) => item && item.id && item.slug && item.title));
      } catch (loadError) {
        if (!isMounted) return;
        setDiseases([]);
        setError('Não foi possível carregar o catálogo de doenças.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [diseaseRepository, categoryRepository, query]);

  // Filtra as doenças com base na especialidade selecionada
  const filteredDiseases = useMemo(() => {
    if (selectedCategory === 'all') return diseases;
    return diseases.filter((d) => diseaseMatchesCategoryFilter(d, selectedCategory));
  }, [diseases, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    diseases.forEach((d) => {
      for (const slug of getDiseaseCategorySlugs(d)) {
        counts[slug] = (counts[slug] || 0) + 1;
      }
    });
    return counts;
  }, [diseases]);

  // Lista de especialidades filtradas apenas pelas que possuem contagem ativa
  const activeCategories = useMemo(() => {
    return categories.filter((cat) => cat?.slug && categoryCounts[cat.slug] > 0);
  }, [categories, categoryCounts]);

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
  };

  return (
    <div className="mx-auto w-full max-w-[1720px] space-y-8 p-4 md:p-8">
      <ConsultaVetPageHero
        eyebrow={UI_TEXT.eyebrow}
        title={UI_TEXT.title}
        description={UI_TEXT.body}
        icon={Stethoscope}
        accent="primary"
        aside={
          <ModuleSearchInput
            value={query}
            onChange={setQuery}
            placeholder={UI_TEXT.placeholder}
            className="w-full max-w-md"
          />
        }
      />

      <div className="flex flex-col gap-8 xl:flex-row xl:items-start">
        {/* Sidebar de especialidades moderna com Glassmorphism */}
        <aside className="w-full shrink-0 rounded-2xl border border-border/80 bg-background/50 p-5 backdrop-blur-xs xl:w-72">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Especialidades</h3>
            <span className="rounded-full bg-muted/60 px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
              {activeCategories.length} Ativas
            </span>
          </div>

          <nav className="flex flex-row flex-wrap gap-2 xl:flex-col xl:gap-1.5">
            <button
              onClick={() => handleCategorySelect('all')}
              className={cn(
                'flex items-center gap-3.5 rounded-xl border border-border/60 px-4 py-3 text-left text-sm font-semibold transition-all duration-300 xl:w-full',
                selectedCategory === 'all'
                  ? 'border-primary bg-primary/[0.06] text-primary shadow-[0_0_12px_-3px_rgba(var(--primary),0.12)]'
                  : 'bg-card/50 text-foreground/80 hover:border-border-hover hover:bg-card'
              )}
            >
              <span className="flex h-5 w-5 items-center justify-center text-xs">
                <LayoutGrid className="h-4 w-4" />
              </span>
              <span className="flex-1">{UI_TEXT.allCategories}</span>
              <span className={cn(
                'rounded-full px-2 py-0.5 text-[10px] font-bold',
                selectedCategory === 'all' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
              )}>
                {diseases.length}
              </span>
            </button>

            {activeCategories.map((cat) => {
              const visual = getSpecialtyVisual(cat.slug);
              const isSelected =
                selectedCategory === cat.slug ||
                normalizeCategorySlug(selectedCategory) === normalizeCategorySlug(cat.slug);

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={cn(
                    'flex items-center gap-3.5 rounded-xl border border-border/60 px-4 py-3 text-left text-sm font-semibold transition-all duration-300 xl:w-full',
                    isSelected
                      ? cn('border-solid shadow-xs', visual.borderActive, visual.bgActive, visual.textActive)
                      : 'bg-card/50 text-foreground/80 hover:border-border-hover hover:bg-card'
                  )}
                >
                  <span className="flex h-5 w-5 items-center justify-center text-base">
                    {visual.icon}
                  </span>
                  <span className="flex-1 truncate">{visual.label}</span>
                  <span className={cn(
                    'rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors',
                    isSelected ? 'bg-background/80 font-extrabold' : 'bg-muted text-muted-foreground'
                  )}>
                    {categoryCounts[cat.slug] || 0}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Grade de Doenças */}
        <main className="flex-1 space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{UI_TEXT.resultsLabel}</h2>
            <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-bold text-foreground">
              {isLoading ? '...' : filteredDiseases.length} {filteredDiseases.length === 1 ? 'doença' : 'doenças'}
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {isLoading && (
              <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-24 text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="mt-4 text-sm font-medium text-muted-foreground">Buscando diretrizes de doenças...</p>
              </div>
            )}

            {!isLoading && error && (
              <div className="col-span-full rounded-2xl border border-destructive/30 bg-destructive/10 px-6 py-5">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {!isLoading && !error && filteredDiseases.map((disease) => {
              const primarySlug = normalizeCategorySlug(disease.category);
              const categoryLabel = formatDiseaseCategoryLabels(disease);

              return (
                <div
                  key={disease.id}
                  className="animate-in fade-in-50 slide-in-from-bottom-3 duration-300"
                >
                  <EntityCard
                    to={`/consulta-vet/doencas/${disease.slug}`}
                    title={disease.title}
                    subtitle={`${categoryLabel} \u2022 ${formatSpeciesList(disease.species)}`}
                    description={disease.quickSummary}
                    entityType="disease"
                    entityId={disease.id}
                    category={primarySlug}
                  />
                </div>
              );
            })}

            {!isLoading && !error && filteredDiseases.length === 0 && (
              <div className="col-span-full rounded-2xl border border-border bg-card py-20 text-center">
                <p className="text-sm font-medium text-muted-foreground">{UI_TEXT.empty}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
