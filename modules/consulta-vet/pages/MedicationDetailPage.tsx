import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import {
  ChevronRight,
  ExternalLink,
  FileText,
  Pill,
  Share2,
  ShoppingBag,
  Stethoscope,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConsultaVetSurface } from '../components/layout/ConsultaVetSurface';
import { MedicationQuickSummaryPanel } from '../components/medication/MedicationQuickSummaryPanel';
import { MedicationIndicationsTable } from '../components/medication/MedicationIndicationsTable';
import { MedicationPharmacokineticsSection } from '../components/medication/MedicationPharmacokineticsSection';
import { MedicationPharmacologicalClassificationSection } from '../components/medication/MedicationPharmacologicalClassificationSection';
import { MedicationClinicalFoundationsSection } from '../components/medication/MedicationClinicalFoundationsSection';
import { MedicationGeneralInfoTab } from '../components/medication/MedicationGeneralInfoTab';
import { MedicationAttentionTab } from '../components/medication/MedicationAttentionTab';
import { MedicationMarketTab } from '../components/medication/MedicationMarketTab';
import { MedicationSectionFrame } from '../components/medication/MedicationSectionFrame';
import { FavoriteButton } from '../components/shared/FavoriteButton';
import { ReferencesList } from '../components/shared/ReferencesList';
import { useRecents } from '../hooks/useRecents';
import { getConsensoRepository } from '../services/consensoRepository';
import { getDiseaseRepository } from '../services/diseaseRepository';
import { getMedicationRepository } from '../services/medicationRepository';
import { ConsensusRecord } from '../types/consenso';
import { DiseaseRecord } from '../types/disease';
import { MedicationRecord } from '../types/medication';
import { AbbreviationExpandedContext } from '../utils/clinicalAbbreviationInline';
import { formatSpeciesList } from '../utils/navigation';
import { cn } from '../../../lib/utils';

type MedicationTab = 'medicamento' | 'info' | 'atencao' | 'mercado';

function ProductResourceLink({ href, label }: { href?: string | null; label: string }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
    >
      <ExternalLink className="h-3.5 w-3.5" />
      {label}
    </a>
  );
}

export function MedicationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const medicationRepository = useMemo(() => getMedicationRepository(), []);
  const diseaseRepository = useMemo(() => getDiseaseRepository(), []);
  const consensoRepository = useMemo(() => getConsensoRepository(), []);
  const { addRecent } = useRecents();

  const [medication, setMedication] = useState<MedicationRecord | null>(null);
  const [relatedDiseases, setRelatedDiseases] = useState<DiseaseRecord[]>([]);
  const [relatedConsensos, setRelatedConsensos] = useState<ConsensusRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Tab State: Local state for instant switching without reloads, synced silently with query
  const [activeTab, setActiveTab] = useState<MedicationTab>(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'info' || tabParam === 'atencao' || tabParam === 'mercado') {
      return tabParam;
    }
    return 'medicamento';
  });

  const handleTabChange = (tab: MedicationTab) => {
    setActiveTab(tab);
    const updated = new URLSearchParams(searchParams);
    if (tab === 'medicamento') {
      updated.delete('tab');
    } else {
      updated.set('tab', tab);
    }
    setSearchParams(updated, { replace: true });
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      if (!slug) {
        if (isMounted) {
          setMedication(null);
          setRelatedDiseases([]);
          setRelatedConsensos([]);
          setIsLoading(false);
        }
        return;
      }

      try {
        const found = await medicationRepository.getBySlug(slug);
        if (!isMounted) return;

        setMedication(found);
        if (!found) {
          setRelatedDiseases([]);
          setRelatedConsensos([]);
          setIsLoading(false);
          return;
        }

        addRecent('medication', found.id);

        const [loadedDiseases, loadedConsensos] = await Promise.all([
          diseaseRepository.list(),
          consensoRepository.list(),
        ]);

        if (!isMounted) return;

        const nextRelatedDiseases = loadedDiseases.filter(
          (item) => found.relatedDiseaseSlugs.includes(item.slug) || item.relatedMedicationSlugs.includes(found.slug),
        );
        const consensusSlugSet = new Set(nextRelatedDiseases.flatMap((item) => item.relatedConsensusSlugs));

        setRelatedDiseases(nextRelatedDiseases);
        setRelatedConsensos(loadedConsensos.filter((item) => consensusSlugSet.has(item.slug)));
      } catch {
        if (!isMounted) return;
        setError('Falha ao carregar a monografia do medicamento.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [addRecent, consensoRepository, diseaseRepository, medicationRepository, slug]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // noop
    }
  };

  const abbrevExpanded = useMemo(() => new Set<string>(), [medication?.slug]);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  if (error || !medication) {
    return (
      <div className="mx-auto flex h-full w-full max-w-[860px] items-center justify-center p-6">
        <div className="w-full rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center md:p-8">
          <h2 className="mb-2 text-xl font-semibold text-destructive">Medicamento não encontrado</h2>
          <p className="mb-6 text-sm text-destructive/80">
            {error || 'Não foi possível localizar o medicamento solicitado.'}
          </p>
          <Link
            to="/consulta-vet/medicamentos"
            className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Voltar para Medicamentos
          </Link>
        </div>
      </div>
    );
  }

  const tabsConfig = [
    {
      id: 'medicamento' as const,
      label: 'Medicamento',
      icon: Pill,
      badge: null,
      activeColor: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25',
    },
    {
      id: 'info' as const,
      label: 'Info',
      icon: Info,
      badge: null,
      activeColor: 'bg-sky-600 text-white shadow-md shadow-sky-600/25',
    },
    {
      id: 'atencao' as const,
      label: 'Atenção',
      icon: AlertTriangle,
      badge: null,
      activeColor: 'bg-amber-600 text-white shadow-md shadow-amber-600/25',
    },
    {
      id: 'mercado' as const,
      label: 'Mercado',
      icon: ShoppingBag,
      badge: `${medication.presentations.length}`,
      activeColor: 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25',
    },
  ];

  return (
    <AbbreviationExpandedContext.Provider value={abbrevExpanded}>
      <div className="mx-auto w-full max-w-[1580px] px-4 py-4 md:px-8 md:py-6 xl:px-10">
        {/* Breadcrumb de navegação */}
        <nav
          className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
          aria-label="Navegação estrutural"
        >
          <Link to="/consulta-vet" className="transition-colors hover:text-primary">
            Início
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/consulta-vet/medicamentos" className="transition-colors hover:text-primary">
            Medicamentos
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate text-foreground">{medication.title}</span>
        </nav>

        {/* Header Compacto & Limpo: Apenas tag de Espécies, sem Terapêutica Geral e sem tabela inferior de metadados */}
        <ConsultaVetSurface accent="emerald" className="p-6 md:p-7 xl:p-8 rounded-3xl shadow-xs">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1 space-y-3">
              {/* Única tag permitida: Canino / Felino */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-emerald-500/15 border border-emerald-500/25 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  {formatSpeciesList(medication.species)}
                </span>
              </div>

              {/* Título Menor e Elegante */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-foreground">
                {medication.title}
              </h1>

              {/* Subtítulo Clínico Direto */}
              <p className="max-w-[85ch] text-xs sm:text-sm font-medium leading-relaxed text-muted-foreground">
                <strong className="text-foreground">{medication.activeIngredient}</strong> &bull; {medication.pharmacologicClass}
              </p>
            </div>

            {/* Ações da Monografia: Compartilhar, Favoritar */}
            <div className="flex shrink-0 flex-wrap items-center gap-2 lg:justify-end">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                title={copiedLink ? 'Link copiado!' : 'Copiar link da monografia'}
              >
                <Share2 className="h-4 w-4" />
              </button>
              <FavoriteButton
                entityType="medication"
                entityId={medication.id}
                className="h-9 w-9 border border-border bg-background/80 p-2"
              />
            </div>
          </div>
        </ConsultaVetSurface>

        {/* NAVEGADOR DE ABAS PRINCIPAIS (Transição ultra-limpa e instantânea) */}
        <div className="sticky top-2 z-20 mt-7 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto rounded-2xl border border-border/80 bg-background/95 p-1.5 shadow-md backdrop-blur-md">
            {tabsConfig.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    'flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap',
                    isActive
                      ? tab.activeColor
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={cn(
                        'rounded-full px-1.5 py-0.2 text-[10px] font-bold',
                        isActive
                          ? 'bg-white/25 text-white'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTEÚDO DAS 4 ABAS COM ANIMAÇÃO FLUIDA E SEM RELOAD */}
        <main className="pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="space-y-10"
            >
              {/* ABA 1: MEDICAMENTO */}
              {activeTab === 'medicamento' && (
                <div className="space-y-10">
                  {/* 1. Resumo Rápido + Indicações de Uso Resumidas */}
                  <MedicationQuickSummaryPanel medication={medication} />

                  {/* 2. Tabela Completa de Indicações Clínicas Detalhadas com Mecanismos de Ação e Citações */}
                  <MedicationIndicationsTable medication={medication} />

                  {/* 3. Farmacocinética Aprofundada (4-MAA/4-AA, ADME, Stats) */}
                  <MedicationPharmacokineticsSection data={medication.pharmacokineticsData} />

                  {/* 4. Classificação Farmacológica & Mecânica (Sítios & Receptores-Alvo) */}
                  <MedicationPharmacologicalClassificationSection
                    classification={medication.generalInfoData?.pharmacologicalClassification}
                    activeIngredient={medication.activeIngredient}
                    pharmacologicClass={medication.pharmacologicClass}
                  />

                  {/* 5. Fundamentos Clínicos & Evidências Publicadas Interligadas (Estilo CID) */}
                  <MedicationClinicalFoundationsSection />

                  {/* 5. Conteúdo Relacionado (Doenças e Consensos) */}
                  {(relatedDiseases.length > 0 || relatedConsensos.length > 0) && (
                    <MedicationSectionFrame sectionId="conteudo-relacionado" title="Conteúdo & Casos Relacionados">
                      <div className="grid gap-6 md:grid-cols-2">
                        {relatedDiseases.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              <Stethoscope className="h-4 w-4" />
                              Doenças Associadas
                            </h4>
                            <div className="space-y-2.5">
                              {relatedDiseases.map((disease) => (
                                <Link
                                  key={disease.id}
                                  to={`/consulta-vet/doencas/${disease.slug}`}
                                  className="group block rounded-2xl border border-border bg-card p-4 transition hover:border-primary/40 hover:bg-muted/40"
                                >
                                  <p className="font-bold text-foreground group-hover:text-primary transition-colors text-sm">
                                    {disease.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-0.5">{disease.category}</p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {relatedConsensos.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              <FileText className="h-4 w-4" />
                              Consensos & Diretrizes
                            </h4>
                            <div className="space-y-2.5">
                              {relatedConsensos.map((consenso) => (
                                <Link
                                  key={consenso.id}
                                  to={`/consulta-vet/consensos/${consenso.slug}`}
                                  className="group block rounded-2xl border border-border bg-card p-4 transition hover:border-primary/40 hover:bg-muted/40"
                                >
                                  <p className="font-bold text-foreground group-hover:text-primary transition-colors text-sm">
                                    {consenso.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {consenso.organization} &bull; {consenso.year}
                                  </p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </MedicationSectionFrame>
                  )}

                  {/* 7. Lista de Referências Bibliográficas com Âncoras #ref-X */}
                  {medication.references && medication.references.length > 0 && (
                    <MedicationSectionFrame sectionId="referencias-bibliograficas" title="Referências Bibliográficas & Diretrizes">
                      <ReferencesList references={medication.references} variant="embedded" />
                    </MedicationSectionFrame>
                  )}
                </div>
              )}

              {/* ABA 2: INFO */}
              {activeTab === 'info' && (
                <MedicationGeneralInfoTab medication={medication} />
              )}

              {/* ABA 3: ATENÇÃO */}
              {activeTab === 'atencao' && (
                <MedicationAttentionTab medication={medication} />
              )}

              {/* ABA 4: MERCADO */}
              {activeTab === 'mercado' && (
                <MedicationMarketTab medication={medication} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </AbbreviationExpandedContext.Provider>
  );
}
