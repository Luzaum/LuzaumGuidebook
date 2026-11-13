import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useSearchParams, useParams } from 'react-router-dom';
import {
  Activity,
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
import { SectionAnchorNav } from '../components/shared/SectionAnchorNav';
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
import { includesRelatedSlug } from '../utils/relatedContent';

type MedicationTab = 'medicamento' | 'farmacocinetica' | 'info' | 'atencao' | 'mercado';

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

type ResumeLocationState = {
  sectionId?: string;
};

export function MedicationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
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
  const [quickIndicationWeight, setQuickIndicationWeight] = useState('');
  const lastSavedSectionRef = useRef<string>('');

  const resumeState = (location.state as ResumeLocationState | null) || null;
  const skipNextTabScrollResetRef = useRef(Boolean(resumeState?.sectionId));

  const scrollPageToTop = useCallback(() => {
    const scrollContainer = document.querySelector('.consulta-vet-main-scroll') as HTMLElement | null;
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'auto' });
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  // Tab State: Local state for instant switching without reloads, synced silently with query
  const [activeTab, setActiveTab] = useState<MedicationTab>(() => {
    const tabParam = searchParams.get('tab');
    if (
      tabParam === 'farmacocinetica' ||
      tabParam === 'info' ||
      tabParam === 'atencao' ||
      tabParam === 'mercado'
    ) {
      return tabParam;
    }
    return 'medicamento';
  });

  useEffect(() => {
    if (skipNextTabScrollResetRef.current) {
      skipNextTabScrollResetRef.current = false;
      return;
    }

    scrollPageToTop();
    const timeoutId = window.setTimeout(scrollPageToTop, 200);
    return () => window.clearTimeout(timeoutId);
  }, [activeTab, scrollPageToTop]);

  const handleTabChange = useCallback(
    (tab: MedicationTab, options?: { resetScroll?: boolean }) => {
      if (options?.resetScroll === false) {
        skipNextTabScrollResetRef.current = true;
      } else {
        scrollPageToTop();
      }
      setActiveTab(tab);
      const updated = new URLSearchParams(searchParams);
      if (tab === 'medicamento') {
        updated.delete('tab');
      } else {
        updated.set('tab', tab);
      }
      setSearchParams(updated, { replace: true });
    },
    [scrollPageToTop, searchParams, setSearchParams]
  );

  const handleReferenceClick = useCallback(
    (refId: string) => {
      const scrollToTarget = () => {
        const target = document.getElementById(refId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          target.classList.add('ring-2', 'ring-primary', 'transition-all');
          window.setTimeout(() => target.classList.remove('ring-2', 'ring-primary'), 2000);
        }
      };

      if (activeTab !== 'medicamento') {
        handleTabChange('medicamento', { resetScroll: false });
        window.setTimeout(scrollToTarget, 260);
        return;
      }

      scrollToTarget();
    },
    [activeTab, handleTabChange]
  );

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      setRelatedConsensos([]);
      setRelatedDiseases([]);

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

        // Show the monograph before loading optional related catalogs.
        setIsLoading(false);

        addRecent('medication', found.id, undefined, resumeState?.sectionId);

        const [loadedDiseases, loadedConsensos] = await Promise.all([
          diseaseRepository.list().catch(() => [] as DiseaseRecord[]),
          consensoRepository.list().catch(() => [] as ConsensusRecord[]),
        ]);

        if (!isMounted) return;

        const nextRelatedDiseases = loadedDiseases.filter(
          (item) =>
            includesRelatedSlug(found.relatedDiseaseSlugs, item.slug) ||
            includesRelatedSlug(item.relatedMedicationSlugs, found.slug),
        );
        const consensusSlugSet = new Set(nextRelatedDiseases.flatMap((item) => item.relatedConsensusSlugs));

        setRelatedDiseases(nextRelatedDiseases);
        setRelatedConsensos(loadedConsensos.filter((item) => consensusSlugSet.has(item.slug)));
      } catch (loadError) {
        if (!isMounted) return;
        console.error('[ConsultaVet] Falha ao carregar detalhes do medicamento.', { slug, error: loadError });
        setError('Falha ao carregar a monografia do medicamento.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [addRecent, consensoRepository, diseaseRepository, medicationRepository, resumeState?.sectionId, slug]);

  useEffect(() => {
    if (!medication || !resumeState?.sectionId) return;

    const pharmaSections = new Set(['farmacocinetica', 'classificacao-farmacologica', 'fundamentos-clinicos']);
    if (pharmaSections.has(resumeState.sectionId) && activeTab !== 'farmacocinetica') {
      handleTabChange('farmacocinetica', { resetScroll: false });
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const element = document.getElementById(resumeState.sectionId || '');
      element?.scrollIntoView({ block: 'start' });
    }, 150);

    return () => window.clearTimeout(timeoutId);
  }, [activeTab, handleTabChange, medication, resumeState?.sectionId]);

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

  const effectiveDetailedIndications = useMemo(() => {
    if (!medication) return [];
    if (medication.detailedIndications && medication.detailedIndications.length > 0) {
      return medication.detailedIndications;
    }
    if (medication.doses && medication.doses.length > 0) {
      return medication.doses.map((d) => {
        const unitLabel = d.perWeightUnit
          ? `${d.doseUnit}/${d.perWeightUnit}`
          : d.doseUnit;
        const doseRange = `${d.doseMin}${d.doseMax && d.doseMax !== d.doseMin ? ` a ${d.doseMax}` : ''} ${unitLabel}`;
        return {
          id: d.id,
          indication: d.indication,
          clinicalContext:
            d.clinicalContext ||
            d.notes ||
            `Aplicação clínica em ${d.species === 'dog' ? 'cães' : d.species === 'cat' ? 'gatos' : 'cães e gatos'} pela via ${d.route}.`,
          species: d.species,
          dose: doseRange,
          route: d.route,
          frequency: d.frequency,
          duration: d.duration || 'Conforme indicação e resposta clínica',
          mechanismOfAction: medication.mechanismOfAction,
          clinicalRationale:
            d.notes ||
            d.clinicalContext ||
            'Individualizar a posologia segundo o peso corporal, função orgânica e resposta clínica do paciente.',
          monitoring: d.monitoring,
          referenceIds: d.referenceIds || [],
          evidenceLevel: d.evidenceLevel,
        };
      });
    }
    return [];
  }, [medication]);

  const sections = useMemo(() => {
    if (!medication) return [];

    if (activeTab === 'medicamento') {
      const items: Array<{ id: string; label: string }> = [
        { id: 'resumo-rapido', label: 'Resumo rápido' },
      ];
      if (effectiveDetailedIndications.length > 0) {
        items.push({ id: 'indicacoes-clinicas', label: 'Indicações clínicas' });
      }
      if (relatedDiseases.length > 0 || relatedConsensos.length > 0) {
        items.push({ id: 'conteudo-relacionado', label: 'Conteúdo relacionado' });
      }
      if (medication.references && medication.references.length > 0) {
        items.push({ id: 'referencias-bibliograficas', label: 'Referências bibliográficas' });
      }
      return items.map((item, idx) => ({ id: item.id, label: `${idx + 1}. ${item.label}` }));
    }

    if (activeTab === 'farmacocinetica') {
      const items: Array<{ id: string; label: string }> = [];
      if (medication.pharmacokineticsData) {
        items.push({ id: 'farmacocinetica', label: 'Farmacocinética aplicada' });
      }
      if (
        medication.generalInfoData?.pharmacologicalClassification ||
        medication.pharmacologicClass ||
        medication.activeIngredient
      ) {
        items.push({ id: 'classificacao-farmacologica', label: 'Classificação farmacológica' });
      }
      items.push({ id: 'fundamentos-clinicos', label: 'Fundamentos e evidências' });
      return items.map((item, idx) => ({ id: item.id, label: `${idx + 1}. ${item.label}` }));
    }

    if (activeTab === 'info') {
      return [
        { id: 'formas-administracao', label: '1. Formas de administração' },
        { id: 'compatibilidade-diluicao', label: '2. Compatibilidade e diluição' },
        { id: 'particularidades-especies', label: '3. Particularidades por espécie' },
        { id: 'aspectos-prescricao', label: '4. Regulamentação e prescrição' },
      ];
    }

    if (activeTab === 'atencao') {
      return [
        { id: 'efeitos-adversos', label: '1. Efeitos adversos' },
        { id: 'contraindicacoes', label: '2. Contraindicações e cuidados' },
        { id: 'ajustes-renais-hepaticos', label: '3. Ajuste em comorbidades' },
        { id: 'interacoes-medicamentosas', label: '4. Interações medicamentosas' },
        medication.monitoringParameters && medication.monitoringParameters.length > 0
          ? { id: 'parametros-monitoramento', label: '5. Monitoramento clínico' }
          : null,
      ].filter(Boolean) as Array<{ id: string; label: string }>;
    }

    if (activeTab === 'mercado') {
      const items: Array<{ id: string; label: string }> = [
        { id: 'apresentacoes-comerciais', label: 'Apresentações comerciais' },
      ];
      if (medication.practicalWeightTable) {
        items.push({ id: 'tabela-posologia-pratica', label: 'Guia e posologia prática' });
      }
      if (medication.officialSiteUrl || medication.leafletUrl || medication.priceReference) {
        items.push({ id: 'bulas-fontes-oficiais', label: 'Bulas e fontes oficiais' });
      }
      return items.map((item, idx) => ({ id: item.id, label: `${idx + 1}. ${item.label}` }));
    }

    return [];
  }, [
    activeTab,
    effectiveDetailedIndications.length,
    medication,
    relatedConsensos.length,
    relatedDiseases.length,
  ]);

  const handleActiveSectionChange = useCallback(
    (sectionId: string) => {
      if (!medication || !sectionId || lastSavedSectionRef.current === sectionId) return;
      lastSavedSectionRef.current = sectionId;
      addRecent('medication', medication.id, undefined, sectionId);
    },
    [addRecent, medication]
  );

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
      id: 'farmacocinetica' as const,
      label: 'Farmacocinética',
      icon: Activity,
      badge: null,
      activeColor: 'bg-purple-600 text-white shadow-md shadow-purple-600/25',
    },
    {
      id: 'info' as const,
      label: 'Administração/Compatibilidade',
      icon: Info,
      badge: null,
      activeColor: 'bg-sky-600 text-white shadow-md shadow-sky-600/25',
    },
    {
      id: 'atencao' as const,
      label: 'Efeitos adversos/Contraindicações',
      icon: AlertTriangle,
      badge: null,
      activeColor: 'bg-amber-600 text-white shadow-md shadow-amber-600/25',
    },
    {
      id: 'mercado' as const,
      label: 'Apresentações comerciais',
      icon: ShoppingBag,
      badge: `${medication.presentations.length}`,
      activeColor: 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25',
    },
  ];

  return (
    <AbbreviationExpandedContext.Provider value={abbrevExpanded}>
      <div className="consulta-vet-detail-page consulta-vet-medication-detail mx-auto flex w-full max-w-[1840px] flex-col px-3 py-2.5 md:px-6 md:py-5 xl:px-8 2xl:px-10">
        {/* Breadcrumb de navegação */}
        <nav
          className="consulta-vet-breadcrumb mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
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

        {/* Header Compacto & Largura Total */}
        <ConsultaVetSurface accent="emerald" className="w-full rounded-2xl px-4 py-3 shadow-xs md:px-6 md:py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1 space-y-1.5">
              {/* Única tag permitida: Canino / Felino */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-emerald-500/25 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  {formatSpeciesList(medication.species)}
                </span>
              </div>

              {/* Título Compacto */}
              <h1 className="text-lg font-extrabold leading-snug tracking-tight text-foreground sm:text-xl lg:text-2xl">
                {medication.title}
              </h1>

              {/* Subtítulo Clínico Direto */}
              <p className="text-xs font-medium leading-snug text-muted-foreground">
                <strong className="text-foreground">{medication.activeIngredient}</strong> &bull; {medication.pharmacologicClass}
              </p>
            </div>

            {/* Ações da Monografia: Compartilhar, Favoritar */}
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                title={copiedLink ? 'Link copiado!' : 'Copiar link da monografia'}
              >
                <Share2 className="h-3.5 w-3.5" />
              </button>
              <FavoriteButton
                entityType="medication"
                entityId={medication.id}
                className="h-8 w-8 border border-border bg-background/80 p-1.5"
              />
            </div>
          </div>
        </ConsultaVetSurface>

        {/* NAVEGADOR DE ABAS PRINCIPAIS (Largura Total, 1 única linha sem sobreposição) */}
        <div className="consulta-vet-medication-tabs sticky top-0 z-20 mb-4 mt-3 md:top-2 md:mb-6 md:mt-4">
          <div className="flex w-full flex-nowrap items-center justify-between gap-1.5 overflow-x-auto rounded-xl border border-border/80 bg-background/95 p-1.5 shadow-md backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-2 md:rounded-2xl">
            {tabsConfig.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    'flex shrink-0 min-w-fit flex-auto items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all duration-200 md:rounded-xl md:px-4 md:py-2 md:text-xs xl:text-[13px]',
                    isActive
                      ? tab.activeColor
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={cn(
                        'rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none',
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

        {/* CORPO ABAIXO DAS ABAS: Conteúdo principal à esquerda + Índice do medicamento à direita */}
        <div className="flex flex-col xl:flex-row xl:gap-6 2xl:gap-8">
          <div className="w-full min-w-0 flex-1">
            {/* NAVEGADOR DE SEÇÕES MOBILE (TOC RESPONSIVO) */}
            {sections.length > 0 && (
              <SectionAnchorNav
                sections={sections}
                variant="mobile"
                title="Índice deste medicamento"
                onActiveChange={handleActiveSectionChange}
                className="top-[3.5rem] mt-1 mb-4"
              />
            )}

            {/* CONTEÚDO DAS 5 ABAS COM ANIMAÇÃO FLUIDA E SEM RELOAD */}
            <main className="pb-10 md:pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="consulta-vet-medication-tab space-y-5 md:space-y-10"
            >
              {/* ABA 1: MEDICAMENTO */}
              {activeTab === 'medicamento' && (
                <div className="space-y-5 md:space-y-10">
                  {/* 1. Resumo Rápido + Indicações de Uso Resumidas */}
                  <MedicationQuickSummaryPanel
                    medication={medication}
                    patientWeightInput={quickIndicationWeight}
                    onPatientWeightInputChange={setQuickIndicationWeight}
                  />

                  {/* 2. Tabela Completa de Indicações Clínicas Detalhadas com Mecanismos de Ação e Citações */}
                  {effectiveDetailedIndications.length > 0 && (
                    <MedicationIndicationsTable
                      indications={effectiveDetailedIndications}
                      references={medication.references}
                      onReferenceClick={handleReferenceClick}
                    />
                  )}

                  {/* 3. Conteúdo Relacionado (Doenças e Consensos) */}
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

              {/* ABA 2: FARMACOCINÉTICA */}
              {activeTab === 'farmacocinetica' && (
                <div className="space-y-5 md:space-y-10">
                  {/* 1. Farmacocinética Aprofundada (ADME, Stats) */}
                  <MedicationPharmacokineticsSection data={medication.pharmacokineticsData} />

                  {/* 2. Classificação Farmacológica */}
                  <MedicationPharmacologicalClassificationSection
                    classification={medication.generalInfoData?.pharmacologicalClassification}
                    activeIngredient={medication.activeIngredient}
                    pharmacologicClass={medication.pharmacologicClass}
                  />

                  {/* 3. Fundamentos Clínicos & Evidências Publicadas Interligadas */}
                  <MedicationClinicalFoundationsSection
                    medication={medication}
                    onReferenceClick={handleReferenceClick}
                  />
                </div>
              )}

              {/* ABA 3: ADMINISTRAÇÃO/COMPATIBILIDADE */}
              {activeTab === 'info' && (
                <MedicationGeneralInfoTab medication={medication} />
              )}

              {/* ABA 4: EFEITOS ADVERSOS/CONTRAINDICAÇÕES */}
              {activeTab === 'atencao' && (
                <MedicationAttentionTab medication={medication} />
              )}

              {/* ABA 5: APRESENTAÇÕES COMERCIAIS */}
              {activeTab === 'mercado' && (
                <MedicationMarketTab medication={medication} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
          </div>

          {/* NAVEGADOR DE SEÇÕES DESKTOP (STICKY SIDEBAR TOC ABAIXO DAS ABAS) */}
          {sections.length > 0 && (
            <div className="hidden w-56 shrink-0 2xl:w-60 xl:block">
              <SectionAnchorNav
                sections={sections}
                variant="desktop"
                title="Índice do medicamento"
                onActiveChange={handleActiveSectionChange}
                className="top-20 w-56 2xl:w-60"
              />
            </div>
          )}
        </div>
      </div>
    </AbbreviationExpandedContext.Provider>
  );
}
