import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ChevronRight, Clock, FileText, Grid, Pill, Search, Stethoscope } from 'lucide-react';
import { EntityCard } from '../components/shared/EntityCard';
import { getConsensoRepository } from '../services/consensoRepository';
import { getDiseaseRepository } from '../services/diseaseRepository';
import { getMedicationRepository } from '../services/medicationRepository';
import { ConsensusRecord } from '../types/consenso';
import { DiseaseRecord } from '../types/disease';
import { MedicationRecord } from '../types/medication';
import { useRecents } from '../hooks/useRecents';
import { buildResumeState, formatSpeciesList } from '../utils/navigation';

type SearchResults = {
  diseases: DiseaseRecord[];
  medications: MedicationRecord[];
  consensos: ConsensusRecord[];
};

const UI_TEXT = {
  title: 'Consulta VET',
  heroBody:
    'Base cl\u00ednica para consulta r\u00e1pida de doen\u00e7as, medicamentos e consensos com navega\u00e7\u00e3o conectada, favoritos e retomada de leitura.',
  searchPlaceholder: 'Buscar doen\u00e7a, medicamento ou consenso...',
  shortcuts: 'Atalhos principais',
  continueTitle: 'Continuar de onde parou',
  diseaseLabel: 'Doen\u00e7as',
  medicationLabel: 'Medicamentos',
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

export function HomePage() {
  const diseaseRepository = useMemo(() => getDiseaseRepository(), []);
  const medicationRepository = useMemo(() => getMedicationRepository(), []);
  const consensoRepository = useMemo(() => getConsensoRepository(), []);
  const { recents } = useRecents();

  const [diseases, setDiseases] = useState<DiseaseRecord[]>([]);
  const [medications, setMedications] = useState<MedicationRecord[]>([]);
  const [consensos, setConsensos] = useState<ConsensusRecord[]>([]);
  const [query, setQuery] = useState('');
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

        setDiseases(loadedDiseases.slice(0, 3));
        setMedications(loadedMedications.slice(0, 3));
        setConsensos(loadedConsensos.slice(0, 3));

        const latestRecent = recents[0];
        if (!latestRecent) {
          setContinueItem(null);
          return;
        }

        const resumeState = buildResumeState(latestRecent);
        if (latestRecent.entityType === 'disease') {
          const found = loadedDiseases.find((item) => item.id === latestRecent.entityId);
          setContinueItem(found ? { kind: 'disease', item: found, state: resumeState } : null);
          return;
        }

        if (latestRecent.entityType === 'medication') {
          const found = loadedMedications.find((item) => item.id === latestRecent.entityId);
          setContinueItem(found ? { kind: 'medication', item: found, state: resumeState } : null);
          return;
        }

        const found = loadedConsensos.find((item) => item.id === latestRecent.entityId);
        setContinueItem(found ? { kind: 'consensus', item: found, state: resumeState } : null);
      } catch (loadError) {
        if (!isMounted) return;
        setError(loadError instanceof Error ? loadError.message : 'Falha ao carregar o módulo.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [consensoRepository, diseaseRepository, medicationRepository, recents]);

  useEffect(() => {
    const normalizedQuery = query.trim();
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
  }, [consensoRepository, diseaseRepository, medicationRepository, query]);

  const shortcuts = [
    { to: '/consulta-vet', label: UI_TEXT.homeLabel, icon: Grid, body: 'Vis\u00e3o geral do m\u00f3dulo' },
    { to: '/consulta-vet/doencas', label: UI_TEXT.diseaseLabel, icon: Stethoscope, body: 'Bases editoriais e navega\u00e7\u00e3o cl\u00ednica' },
    { to: '/consulta-vet/medicamentos', label: UI_TEXT.medicationLabel, icon: Pill, body: 'Posologias, apresenta\u00e7\u00f5es e cautelas' },
    { to: '/consulta-vet/consensos', label: UI_TEXT.consensoLabel, icon: FileText, body: 'PDFs reais e detalhes compartilhados' },
    { to: '/consulta-vet/favoritos', label: UI_TEXT.favoritesLabel, icon: Bookmark, body: 'Biblioteca pessoal r\u00e1pida' },
    { to: '/consulta-vet/recentes', label: UI_TEXT.recentsLabel, icon: Clock, body: 'Retomar do \u00faltimo ponto' },
  ];

  return (
    <div className="mx-auto w-full max-w-[1560px] space-y-10 p-4 md:p-8">
      <section className="overflow-hidden rounded-[30px] border border-border bg-card shadow-sm">
        <div className="grid gap-6 p-6 md:p-8 xl:grid-cols-[1.4fr_0.9fr] xl:items-end">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {UI_TEXT.title}
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">{UI_TEXT.title}</h1>
              <p className="max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg">{UI_TEXT.heroBody}</p>
            </div>
            <div className="relative max-w-3xl">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={UI_TEXT.searchPlaceholder}
                className="w-full rounded-2xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-2xl border border-border bg-muted/30 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{UI_TEXT.shortcuts}</p>
              <p className="text-sm leading-relaxed text-foreground/85">{UI_TEXT.shortcutsBody}</p>
            </div>
            <div className="rounded-2xl border border-border bg-muted/30 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{UI_TEXT.searchResults}</p>
              <p className="text-sm leading-relaxed text-foreground/85">{UI_TEXT.searchSectionBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{UI_TEXT.shortcuts}</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {shortcuts.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.body}</p>
            </Link>
          ))}
        </div>
      </section>

      {isLoading && (
        <section className="rounded-2xl border border-border bg-card py-16 text-center">
          <p className="text-sm text-muted-foreground">Carregando conteúdo do módulo...</p>
        </section>
      )}

      {!isLoading && error && (
        <section className="rounded-2xl border border-destructive/30 bg-destructive/10 px-6 py-5">
          <p className="text-sm text-destructive">{error}</p>
        </section>
      )}

      {!isLoading && !error && continueItem && !query.trim() && (
        <section className="rounded-[28px] border border-primary/20 bg-primary/5 p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
            <Clock className="h-4 w-4" />
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
