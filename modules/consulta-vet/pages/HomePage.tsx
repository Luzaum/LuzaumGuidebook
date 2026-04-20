import React, { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bookmark,
  BookOpen,
  ChevronRight,
  Clock,
  FileText,
  Grid,
  LayoutGrid,
  Pill,
  Search,
  Sparkles,
  Stethoscope,
  Zap,
} from 'lucide-react';
import { ConsultaVetShortcutGrid } from '../components/home/ConsultaVetShortcutGrid';
import { EntityCard } from '../components/shared/EntityCard';
import { getConsensoRepository } from '../services/consensoRepository';
import { getDiseaseRepository } from '../services/diseaseRepository';
import { getMedicationRepository } from '../services/medicationRepository';
import { ConsensusRecord } from '../types/consenso';
import { DiseaseRecord } from '../types/disease';
import { MedicationRecord } from '../types/medication';
import { useRecents } from '../hooks/useRecents';
import { buildResumeState, formatSpeciesList } from '../utils/navigation';
import { RecentRecord } from '../types/recents';

type SearchResults = {
  diseases: DiseaseRecord[];
  medications: MedicationRecord[];
  consensos: ConsensusRecord[];
};

const UI_TEXT = {
  title: 'ConsultaVET',
  heroBody:
    'Base cl\u00ednica para consulta r\u00e1pida de doen\u00e7as, medicamentos, guias r\u00e1pidos por sistema, cartilhas de manejo emergencial e consensos, com navega\u00e7\u00e3o conectada, favoritos e retomada de leitura.',
  searchPlaceholder: 'Buscar doen\u00e7a, medicamento ou consenso...',
  shortcuts: 'Atalhos principais',
  continueTitle: 'Continuar de onde parou',
  diseaseLabel: 'Doen\u00e7as',
  medicationLabel: 'Medicamentos',
  emergencyLabel: 'Manejo emergencial',
  consensoLabel: 'Consensos',
  favoritesLabel: 'Favoritos',
  recentsLabel: 'Recentes',
  homeLabel: 'In\u00edcio',
  noOrganization: 'Sem organiza\u00e7\u00e3o',
  searchResults: 'Resultados da busca',
  searchEmptyDisease: 'Nenhuma doen\u00e7a encontrada.',
  searchEmptyMedication: 'Nenhum medicamento encontrado.',
  searchEmptyConsenso: 'Nenhum consenso encontrado.',
  featuredDiseases: 'Doen\u00e7as em destaque',
  usefulMedications: 'Medicamentos \u00fateis',
  recentConsensos: 'Consensos recentes',
  viewAll: 'Ver todos',
  shortcutsBody: 'Acesso r\u00e1pido aos fluxos centrais do m\u00f3dulo.',
  searchSectionBody: 'Resultados curtos e objetivos para triagem de conte\u00fado.',
} as const;

type ListCache = {
  diseases: DiseaseRecord[];
  medications: MedicationRecord[];
  consensos: ConsensusRecord[];
};

function buildContinueItem(
  latest: RecentRecord | undefined,
  cache: ListCache | null
):
  | {
      kind: 'disease';
      item: DiseaseRecord;
      state?: { pageNumber?: number; sectionId?: string };
    }
  | {
      kind: 'medication';
      item: MedicationRecord;
      state?: { pageNumber?: number; sectionId?: string };
    }
  | {
      kind: 'consensus';
      item: ConsensusRecord;
      state?: { pageNumber?: number; sectionId?: string };
    }
  | null {
  if (!latest || !cache) return null;

  const resumeState = buildResumeState(latest);

  if (latest.entityType === 'disease') {
    const found = cache.diseases.find((item) => item.id === latest.entityId);
    return found ? { kind: 'disease', item: found, state: resumeState } : null;
  }

  if (latest.entityType === 'medication') {
    const found = cache.medications.find((item) => item.id === latest.entityId);
    return found ? { kind: 'medication', item: found, state: resumeState } : null;
  }

  const found = cache.consensos.find((item) => item.id === latest.entityId);
  return found ? { kind: 'consensus', item: found, state: resumeState } : null;
}

export function HomePage() {
  const diseaseRepository = useMemo(() => getDiseaseRepository(), []);
  const medicationRepository = useMemo(() => getMedicationRepository(), []);
  const consensoRepository = useMemo(() => getConsensoRepository(), []);
  const { recents } = useRecents();
  const listsCacheRef = useRef<ListCache | null>(null);

  const [diseases, setDiseases] = useState<DiseaseRecord[]>([]);
  const [medications, setMedications] = useState<MedicationRecord[]>([]);
  const [consensos, setConsensos] = useState<ConsensusRecord[]>([]);
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [searchResults, setSearchResults] = useState<SearchResults>({ diseases: [], medications: [], consensos: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [continueItem, setContinueItem] = useState<
    | { kind: 'disease'; item: DiseaseRecord; state?: { pageNumber?: number; sectionId?: string } }
    | { kind: 'medication'; item: MedicationRecord; state?: { pageNumber?: number; sectionId?: string } }
    | { kind: 'consensus'; item: ConsensusRecord; state?: { pageNumber?: number; sectionId?: string } }
    | null
  >(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [loadedDiseases, loadedMedications, loadedConsensos] = await Promise.all([
          diseaseRepository.list(),
          medicationRepository.list(),
          consensoRepository.list(),
        ]);

        if (!isMounted) return;

        listsCacheRef.current = {
          diseases: loadedDiseases,
          medications: loadedMedications,
          consensos: loadedConsensos,
        };

        setDiseases(loadedDiseases.slice(0, 3));
        setMedications(loadedMedications.slice(0, 3));
        setConsensos(loadedConsensos.slice(0, 3));
      } catch (loadError) {
        if (!isMounted) return;
        setError(loadError instanceof Error ? loadError.message : 'Falha ao carregar o módulo.');
        listsCacheRef.current = null;
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [consensoRepository, diseaseRepository, medicationRepository]);

  useEffect(() => {
    if (isLoading || !listsCacheRef.current) return;
    setContinueItem(buildContinueItem(recents[0], listsCacheRef.current));
  }, [recents, isLoading]);

  useEffect(() => {
    const normalizedQuery = deferredQuery.trim();
    if (!normalizedQuery) {
      setSearchResults({ diseases: [], medications: [], consensos: [] });
      return;
    }

    let isMounted = true;

    const loadSearch = async () => {
      try {
        const [loadedDiseases, loadedMedications, loadedConsensos] = await Promise.all([
          diseaseRepository.search(normalizedQuery),
          medicationRepository.search(normalizedQuery),
          consensoRepository.search(normalizedQuery),
        ]);

        if (!isMounted) return;

        setSearchResults({
          diseases: loadedDiseases.slice(0, 3),
          medications: loadedMedications.slice(0, 3),
          consensos: loadedConsensos.slice(0, 3),
        });
      } catch {
        if (!isMounted) return;
        setSearchResults({ diseases: [], medications: [], consensos: [] });
      }
    };

    void loadSearch();

    return () => {
      isMounted = false;
    };
  }, [consensoRepository, diseaseRepository, medicationRepository, deferredQuery]);

  const shortcuts = [
    { to: '/consulta-vet', label: UI_TEXT.homeLabel, icon: Grid, body: 'Vis\u00e3o geral do m\u00f3dulo', accent: 'sky' as const },
    {
      to: '/consulta-vet/doencas',
      label: UI_TEXT.diseaseLabel,
      icon: Stethoscope,
      body: 'Bases editoriais e navega\u00e7\u00e3o cl\u00ednica',
      accent: 'emerald' as const,
    },
    {
      to: '/consulta-vet/medicamentos',
      label: UI_TEXT.medicationLabel,
      icon: Pill,
      body: 'Posologias, apresenta\u00e7\u00f5es e cautelas',
      accent: 'amber' as const,
    },
    {
      to: '/consulta-vet/guias-rapidos',
      label: 'Guia r\u00e1pido cl\u00ednico',
      icon: BookOpen,
      body: 'Conceitos por sistema, figuras e v\u00eddeos',
      accent: 'slate' as const,
    },
    {
      to: '/consulta-vet/manejo-emergencial',
      label: UI_TEXT.emergencyLabel,
      icon: Zap,
      body: 'Cartilhas r\u00e1pidas com fluxo em p\u00e1ginas',
      accent: 'orange' as const,
    },
    {
      to: '/consulta-vet/consensos',
      label: UI_TEXT.consensoLabel,
      icon: FileText,
      body: 'PDFs reais e detalhes compartilhados',
      accent: 'violet' as const,
    },
    {
      to: '/consulta-vet/favoritos',
      label: UI_TEXT.favoritesLabel,
      icon: Bookmark,
      body: 'Biblioteca pessoal r\u00e1pida',
      accent: 'rose' as const,
    },
    {
      to: '/consulta-vet/recentes',
      label: UI_TEXT.recentsLabel,
      icon: Clock,
      body: 'Retomar do \u00faltimo ponto',
      accent: 'cyan' as const,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1560px] space-y-12 p-4 md:p-8">
      <section className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-card via-card to-primary/[0.04] shadow-lg shadow-primary/[0.07] ring-1 ring-primary/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_0%_-30%,hsl(var(--primary)/0.14),transparent_55%),radial-gradient(ellipse_70%_50%_at_100%_100%,hsl(199_89%_48%/0.09),transparent_50%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/[0.09] blur-3xl"
        />
        <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1.2fr_0.85fr] lg:items-stretch">
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary shadow-sm shadow-primary/10">
              <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Base clínica integrada
            </div>
            <h1 className="m-0 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-[2.65rem] lg:leading-[1.1]">
              <span className="text-foreground">Consulta</span>
              <span className="bg-gradient-to-r from-primary via-sky-500 to-cyan-500 bg-clip-text text-transparent">
                VET
              </span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">{UI_TEXT.heroBody}</p>
            <div className="relative max-w-xl pt-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-[1.125rem] w-[1.125rem] -translate-y-1/2 text-primary/70"
                aria-hidden
              />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={UI_TEXT.searchPlaceholder}
                className="w-full rounded-2xl border border-border/90 bg-background/95 py-3.5 pl-11 pr-4 text-sm text-foreground shadow-inner shadow-black/[0.03] outline-none ring-0 transition-all placeholder:text-muted-foreground hover:border-primary/35 focus:border-primary focus:shadow-md focus:shadow-primary/10 md:text-[15px]"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div className="rounded-2xl border border-primary/20 bg-primary/[0.07] p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20 text-primary shadow-inner">
                <LayoutGrid className="h-5 w-5" aria-hidden />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">{UI_TEXT.shortcuts}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{UI_TEXT.shortcutsBody}</p>
            </div>
            <div className="rounded-2xl border border-violet-500/25 bg-violet-500/[0.08] p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 dark:bg-violet-500/[0.12]">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/20 text-violet-700 shadow-inner dark:text-violet-300">
                <Search className="h-5 w-5" aria-hidden />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300">
                {UI_TEXT.searchResults}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{UI_TEXT.searchSectionBody}</p>
            </div>
          </div>
        </div>
      </section>

      <ConsultaVetShortcutGrid title={UI_TEXT.shortcuts} shortcuts={shortcuts} />

      {isLoading && (
        <section className="rounded-[28px] border border-border bg-card p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-xl bg-primary/15" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-40 animate-pulse rounded-full bg-muted" />
              <div className="h-3 w-64 max-w-full animate-pulse rounded-full bg-muted/70" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[0, 1, 2].map((key) => (
              <div key={key} className="space-y-3 rounded-2xl border border-border/80 bg-muted/20 p-4">
                <div className="h-4 w-2/3 animate-pulse rounded-md bg-muted" />
                <div className="h-3 w-full animate-pulse rounded-md bg-muted/70" />
                <div className="h-3 w-[92%] animate-pulse rounded-md bg-muted/50" />
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Carregando conteúdo do módulo…
          </p>
        </section>
      )}

      {!isLoading && error && (
        <section className="rounded-2xl border border-destructive/30 bg-destructive/10 px-6 py-5">
          <p className="text-sm text-destructive">{error}</p>
        </section>
      )}

      {!isLoading && !error && continueItem && !query.trim() && (
        <section className="rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/[0.07] to-primary/[0.02] p-6 shadow-md shadow-primary/10 md:p-7">
          <div className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
              <Clock className="h-4 w-4" />
            </span>
            {UI_TEXT.continueTitle}
          </div>

          {continueItem.kind === 'disease' && (
            <EntityCard
              to={`/consulta-vet/doencas/${continueItem.item.slug}`}
              title={continueItem.item.title}
              subtitle={`${continueItem.item.category} \u2022 ${formatSpeciesList(continueItem.item.species)}`}
              description={continueItem.item.quickSummary}
              entityType="disease"
              entityId={continueItem.item.id}
              linkState={continueItem.state}
            />
          )}

          {continueItem.kind === 'medication' && (
            <EntityCard
              to={`/consulta-vet/medicamentos/${continueItem.item.slug}`}
              title={continueItem.item.title}
              subtitle={continueItem.item.pharmacologicClass}
              description={continueItem.item.indications.join(', ')}
              entityType="medication"
              entityId={continueItem.item.id}
              linkState={continueItem.state}
            />
          )}

          {continueItem.kind === 'consensus' && (
            <EntityCard
              to={`/consulta-vet/consensos/${continueItem.item.slug}`}
              title={continueItem.item.title}
              subtitle={`${continueItem.item.organization || UI_TEXT.noOrganization}${continueItem.item.year ? ` \u2022 ${continueItem.item.year}` : ''}`}
              description={continueItem.item.description || ''}
              entityType="consensus"
              entityId={continueItem.item.id}
              linkState={continueItem.state}
            />
          )}
        </section>
      )}

      {!isLoading && !error && (query.trim() ? (
        <section className="space-y-8">
          <div className="grid gap-8 xl:grid-cols-3">
            <div>
              <div className="mb-4 flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
                <Stethoscope className="h-5 w-5 text-primary" />
                {UI_TEXT.diseaseLabel}
              </div>
              <div className="space-y-4">
                {searchResults.diseases.length > 0 ? (
                  searchResults.diseases.map((disease) => (
                    <EntityCard
                      key={disease.id}
                      to={`/consulta-vet/doencas/${disease.slug}`}
                      title={disease.title}
                      subtitle={`${disease.category} \u2022 ${formatSpeciesList(disease.species)}`}
                      description={disease.quickSummary}
                      entityType="disease"
                      entityId={disease.id}
                    />
                  ))
                ) : (
                  <div className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
                    {UI_TEXT.searchEmptyDisease}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
                <Pill className="h-5 w-5 text-emerald-600" />
                {UI_TEXT.medicationLabel}
              </div>
              <div className="space-y-4">
                {searchResults.medications.length > 0 ? (
                  searchResults.medications.map((medication) => (
                    <EntityCard
                      key={medication.id}
                      to={`/consulta-vet/medicamentos/${medication.slug}`}
                      title={medication.title}
                      subtitle={medication.pharmacologicClass}
                      description={medication.indications.join(', ')}
                      entityType="medication"
                      entityId={medication.id}
                    />
                  ))
                ) : (
                  <div className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
                    {UI_TEXT.searchEmptyMedication}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
                <FileText className="h-5 w-5 text-violet-600" />
                {UI_TEXT.consensoLabel}
              </div>
              <div className="space-y-4">
                {searchResults.consensos.length > 0 ? (
                  searchResults.consensos.map((consenso) => (
                    <EntityCard
                      key={consenso.id}
                      to={`/consulta-vet/consensos/${consenso.slug}`}
                      title={consenso.title}
                      subtitle={`${consenso.organization || UI_TEXT.noOrganization}${consenso.year ? ` \u2022 ${consenso.year}` : ''}`}
                      description={consenso.description || ''}
                      entityType="consensus"
                      entityId={consenso.id}
                    />
                  ))
                ) : (
                  <div className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
                    {UI_TEXT.searchEmptyConsenso}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="grid gap-8 xl:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
                <Stethoscope className="h-5 w-5 text-primary" />
                {UI_TEXT.featuredDiseases}
              </h2>
              <Link to="/consulta-vet/doencas" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80">
                {UI_TEXT.viewAll}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {diseases.map((disease) => (
                <EntityCard
                  key={disease.id}
                  to={`/consulta-vet/doencas/${disease.slug}`}
                  title={disease.title}
                  subtitle={`${disease.category} \u2022 ${formatSpeciesList(disease.species)}`}
                  description={disease.quickSummary}
                  entityType="disease"
                  entityId={disease.id}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
                <Pill className="h-5 w-5 text-emerald-600" />
                {UI_TEXT.usefulMedications}
              </h2>
              <Link to="/consulta-vet/medicamentos" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80">
                {UI_TEXT.viewAll}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {medications.map((medication) => (
                <EntityCard
                  key={medication.id}
                  to={`/consulta-vet/medicamentos/${medication.slug}`}
                  title={medication.title}
                  subtitle={medication.pharmacologicClass}
                  description={medication.indications.join(', ')}
                  entityType="medication"
                  entityId={medication.id}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
                <FileText className="h-5 w-5 text-violet-600" />
                {UI_TEXT.recentConsensos}
              </h2>
              <Link to="/consulta-vet/consensos" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80">
                {UI_TEXT.viewAll}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {consensos.map((consenso) => (
                <EntityCard
                  key={consenso.id}
                  to={`/consulta-vet/consensos/${consenso.slug}`}
                  title={consenso.title}
                  subtitle={`${consenso.organization || UI_TEXT.noOrganization}${consenso.year ? ` \u2022 ${consenso.year}` : ''}`}
                  description={consenso.description || ''}
                  entityType="consensus"
                  entityId={consenso.id}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
