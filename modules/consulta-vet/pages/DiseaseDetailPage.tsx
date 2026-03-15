import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AlertTriangle, ChevronRight, FileText, Pill, Share2 } from 'lucide-react';
import { DiseaseSectionRenderer } from '../components/disease/DiseaseSectionRenderer';
import { FavoriteButton } from '../components/shared/FavoriteButton';
import { ReferencesList } from '../components/shared/ReferencesList';
import { SectionAnchorNav } from '../components/shared/SectionAnchorNav';
import { TagPills } from '../components/shared/TagPills';
import { useRecents } from '../hooks/useRecents';
import { getConsensoRepository } from '../services/consensoRepository';
import { getDiseaseRepository } from '../services/diseaseRepository';
import { getMedicationRepository } from '../services/medicationRepository';
import { ConsensusRecord } from '../types/consenso';
import { DiseaseRecord } from '../types/disease';
import { MedicationRecord } from '../types/medication';
import { formatSpeciesList } from '../utils/navigation';

type ResumeLocationState = {
  sectionId?: string;
};

type DecisionPanelTone = 'default' | 'primary' | 'warning';

const UI_TEXT = {
  home: 'Início',
  diseases: 'Doenças',
  backToDiseases: 'Voltar para Doenças',
  loadErrorTitle: 'Erro ao abrir doença',
  loadErrorFallback: 'Falha ao carregar doença.',
  notFoundTitle: 'Doença não encontrada',
  notFoundBody: 'Não foi possível localizar o conteúdo solicitado.',
  copyLink: 'Copiar link',
  quickSummary: 'Resumo rápido',
  quickBlocksTitle: 'Blocos de decisão rápida',
  quickBlocksBody: 'Visão inicial para triagem, suspeita clínica e primeiros passos.',
  thirtySecondView: 'Visão em 30 segundos',
  doNotForget: 'Não esquecer',
  whenToSuspect: 'Quando suspeitar',
  initialConduct: 'Conduta inicial',
  dogVsCatDifferences: 'Diferenças cão x gato',
  highYieldTests: 'Exames que mais ajudam',
  commonMistakes: 'Erros comuns',
  redFlags: 'Red flags',
  clinicalPearls: 'Pérolas clínicas',
  understandingDisease: 'Como entender a doença',
  understandingDiseaseLead: 'A fisiopatologia, os fatores de risco e o contexto clínico ficam reunidos em uma leitura mais contínua e menos fragmentada.',
  diagnosticPlan: 'Plano diagnóstico',
  diagnosticPlanLead: 'A investigação foi agrupada em um fluxo prático: quando suspeitar, o que examinar, como confirmar e como adaptar a conduta quando os recursos são limitados.',
  treatmentPlan: 'Tratamento e monitoramento',
  treatmentPlanLead: 'O bloco final concentra tratamento, monitoramento, prognóstico, complicações e prevenção para reduzir repetição entre seções.',
  introduction: 'Introdução',
  etiology: 'Etiologia',
  transmission: 'Transmissão',
  pathophysiology: 'Fisiopatologia',
  epidemiology: 'Epidemiologia',
  clinicalPresentation: 'Apresentação clínica',
  physicalExam: 'Exame físico',
  differentialDiagnoses: 'Diagnósticos diferenciais',
  diagnostics: 'Diagnóstico',
  diagnosticApproach: 'Abordagem diagnóstica',
  treatment: 'Tratamento',
  prognosis: 'Prognóstico',
  complications: 'Complicações',
  prevention: 'Prevenção',
  related: 'Relacionados',
  relatedContent: 'Conteúdo relacionado',
  consensus: 'Consensos',
  medications: 'Medicamentos',
  references: 'Referências',
  organizationFallback: 'Organização não informada',
} as const;

const decisionToneClasses: Record<DecisionPanelTone, string> = {
  default: 'border-border bg-card/92',
  primary: 'border-primary/15 bg-primary/[0.05]',
  warning: 'border-amber-500/18 bg-amber-500/[0.05]',
};

function EditorialPanel({
  id,
  title,
  lead,
  children,
  className = '',
}: {
  id?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 rounded-[30px] border border-border bg-card/92 p-7 shadow-sm md:p-8 ${className}`.trim()}>
      <div className="mb-6">
        <h2 className="text-[28px] font-bold tracking-tight text-foreground">{title}</h2>
        {lead ? <p className="mt-2 max-w-[102ch] text-sm leading-7 text-muted-foreground">{lead}</p> : null}
      </div>
      {children}
    </section>
  );
}

function HighlightList({ items }: { items?: string[] }) {
  if (!items || !items.length) return null;

  return (
    <ul className="space-y-3.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] leading-7 text-foreground/86">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DecisionListBlock({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items?: string[];
}) {
  if (!items || !items.length) return null;

  return (
    <div id={id} className="scroll-mt-24 border-t border-border/70 pt-5 first:border-t-0 first:pt-0">
      <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">{title}</h4>
      <div className="mt-4 text-foreground/86">
        <HighlightList items={items} />
      </div>
    </div>
  );
}

function DecisionPanel({
  title,
  tone = 'default',
  children,
}: {
  title: string;
  tone?: DecisionPanelTone;
  children: React.ReactNode;
}) {
  return (
    <article className={`rounded-[26px] border px-6 py-6 ${decisionToneClasses[tone]}`}>
      <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>
      <div className="mt-5 space-y-5">{children}</div>
    </article>
  );
}

export function DiseaseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const diseaseRepository = useMemo(() => getDiseaseRepository(), []);
  const medicationRepository = useMemo(() => getMedicationRepository(), []);
  const consensoRepository = useMemo(() => getConsensoRepository(), []);
  const { addRecent } = useRecents();

  const [disease, setDisease] = useState<DiseaseRecord | null>(null);
  const [relatedMedications, setRelatedMedications] = useState<MedicationRecord[]>([]);
  const [relatedConsensos, setRelatedConsensos] = useState<ConsensusRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastSavedSectionRef = useRef<string>('');

  const resumeState = (location.state as ResumeLocationState | null) || null;

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      if (!slug) {
        if (isMounted) {
          setDisease(null);
          setRelatedMedications([]);
          setRelatedConsensos([]);
          setIsLoading(false);
        }
        return;
      }

      try {
        const found = await diseaseRepository.getBySlug(slug);
        if (!isMounted) return;

        setDisease(found);
        if (!found) {
          setRelatedMedications([]);
          setRelatedConsensos([]);
          setIsLoading(false);
          return;
        }

        addRecent('disease', found.id, undefined, resumeState?.sectionId);

        const [loadedMedications, loadedConsensos] = await Promise.all([
          medicationRepository.list(),
          consensoRepository.list(),
        ]);

        if (!isMounted) return;

        setRelatedMedications(
          loadedMedications.filter((item) => found.relatedMedicationSlugs.includes(item.slug))
        );
        setRelatedConsensos(
          loadedConsensos.filter((item) => found.relatedConsensusSlugs.includes(item.slug))
        );
      } catch (loadError) {
        if (!isMounted) return;
        setError(loadError instanceof Error ? loadError.message : UI_TEXT.loadErrorFallback);
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
    if (!disease || !resumeState?.sectionId) return;

    const timeoutId = window.setTimeout(() => {
      const element = document.getElementById(resumeState.sectionId || '');
      element?.scrollIntoView({ block: 'start' });
    }, 150);

    return () => window.clearTimeout(timeoutId);
  }, [disease, resumeState?.sectionId]);

  const sections = useMemo(() => {
    if (!disease) return [];

    return [
      { id: 'quick-summary', label: UI_TEXT.quickSummary },
      { id: 'decision-map', label: UI_TEXT.quickBlocksTitle },
      { id: 'understanding-disease', label: UI_TEXT.understandingDisease },
      { id: 'diagnostic-plan', label: UI_TEXT.diagnosticPlan },
      { id: 'treatment-plan', label: UI_TEXT.treatmentPlan },
      relatedConsensos.length > 0 || relatedMedications.length > 0 ? { id: 'related', label: UI_TEXT.related } : null,
      disease.references?.length ? { id: 'references', label: UI_TEXT.references } : null,
    ].filter(Boolean) as Array<{ id: string; label: string }>;
  }, [disease, relatedConsensos.length, relatedMedications.length]);

  const handleActiveSectionChange = useCallback((sectionId: string) => {
    if (!disease || !sectionId || lastSavedSectionRef.current === sectionId) return;
    lastSavedSectionRef.current = sectionId;
    addRecent('disease', disease.id, undefined, sectionId);
  }, [addRecent, disease]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // noop
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex h-full w-full max-w-[860px] items-center justify-center p-6">
        <div className="w-full rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center md:p-8">
          <h2 className="mb-2 text-xl font-semibold text-destructive">{UI_TEXT.loadErrorTitle}</h2>
          <p className="mb-6 text-sm text-destructive/80">{error}</p>
          <Link
            to="/consulta-vet/doencas"
            className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            {UI_TEXT.backToDiseases}
          </Link>
        </div>
      </div>
    );
  }

  if (!disease) {
    return (
      <div className="mx-auto flex h-full w-full max-w-[860px] items-center justify-center p-6">
        <div className="w-full rounded-2xl border border-border bg-card p-6 text-center md:p-8">
          <h2 className="mb-2 text-xl font-semibold text-foreground">{UI_TEXT.notFoundTitle}</h2>
          <p className="mb-6 text-sm text-muted-foreground">{UI_TEXT.notFoundBody}</p>
          <Link
            to="/consulta-vet/doencas"
            className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            {UI_TEXT.backToDiseases}
          </Link>
        </div>
      </div>
    );
  }

  const hasDecisionPanels = Boolean(
    disease.thirtySecondView?.length ||
    disease.doNotForget?.length ||
    disease.whenToSuspect?.length ||
    disease.initialConduct?.length ||
    disease.dogVsCatDifferences?.length ||
    disease.highYieldTests?.length ||
    disease.commonMistakes?.length ||
    disease.redFlags.length ||
    disease.clinicalPearls.length
  );

  return (
    <div className="mx-auto flex h-full w-full max-w-[1840px] flex-col xl:flex-row">
      <div className="w-full flex-1 overflow-y-auto px-4 py-4 md:px-8 md:py-8 xl:px-10 xl:pr-8 2xl:px-12">
        <nav className="mb-7 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
          <Link to="/consulta-vet" className="transition-colors hover:text-primary">
            {UI_TEXT.home}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/consulta-vet/doencas" className="transition-colors hover:text-primary">
            {UI_TEXT.diseases}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate text-foreground">{disease.title}</span>
        </nav>

        <header className="rounded-[34px] border border-border bg-card/95 p-6 shadow-sm md:p-8 xl:p-10">
          {disease.isDemonstrative && disease.warningLabel ? (
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
              <AlertTriangle className="h-3 w-3" />
              {disease.warningLabel}
            </div>
          ) : null}

          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                  {formatSpeciesList(disease.species)}
                </span>
                <span className="rounded-full border border-border bg-muted/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {disease.category}
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl xl:max-w-[16ch]">
                {disease.title}
              </h1>
              {disease.synonyms.length > 0 ? (
                <p className="mt-3 max-w-[96ch] text-lg leading-8 text-muted-foreground">
                  {disease.synonyms.join(' • ')}
                </p>
              ) : null}

              <div className="mt-5">
                <TagPills tags={disease.tags} />
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 self-start">
              <button
                className="rounded-full border border-border bg-background/80 p-3 text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                title={UI_TEXT.copyLink}
                type="button"
                onClick={handleCopyLink}
              >
                <Share2 className="h-5 w-5" />
              </button>
              <FavoriteButton entityType="disease" entityId={disease.id} className="h-12 w-12 border border-border bg-background/80 p-3" />
            </div>
          </div>
        </header>

        <div className="space-y-8 pb-10 pt-8 md:space-y-10">
          <section id="quick-summary" className="scroll-mt-24">
            <div className="relative overflow-hidden rounded-[34px] border border-primary/15 bg-primary p-6 text-primary-foreground shadow-lg md:p-8 xl:p-10">
              <div className="absolute right-0 top-0 h-56 w-56 translate-x-1/4 -translate-y-1/2 rounded-full bg-white/20 blur-3xl" />
              <div className="relative z-10 max-w-[108ch]">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-primary-foreground/80">{UI_TEXT.quickSummary}</p>
                <p className="text-xl leading-9 md:text-[28px] md:leading-[1.45]">{disease.quickSummary}</p>
              </div>
            </div>
          </section>

          {hasDecisionPanels ? (
            <EditorialPanel
              id="decision-map"
              title={UI_TEXT.quickBlocksTitle}
              lead={UI_TEXT.quickBlocksBody}
            >
              <div className="grid gap-5 xl:grid-cols-3">
                <DecisionPanel title="Suspeita e triagem" tone="primary">
                  <DecisionListBlock id="thirty-second-view" title={UI_TEXT.thirtySecondView} items={disease.thirtySecondView} />
                  <DecisionListBlock id="when-to-suspect" title={UI_TEXT.whenToSuspect} items={disease.whenToSuspect} />
                  <DecisionListBlock id="high-yield-tests" title={UI_TEXT.highYieldTests} items={disease.highYieldTests} />
                </DecisionPanel>

                <DecisionPanel title="Primeiros passos e conduta" tone="default">
                  <DecisionListBlock id="initial-conduct" title={UI_TEXT.initialConduct} items={disease.initialConduct} />
                  <DecisionListBlock id="do-not-forget" title={UI_TEXT.doNotForget} items={disease.doNotForget} />
                  <DecisionListBlock id="dog-vs-cat-differences" title={UI_TEXT.dogVsCatDifferences} items={disease.dogVsCatDifferences} />
                </DecisionPanel>

                <DecisionPanel title="Segurança clínica" tone="warning">
                  <DecisionListBlock id="red-flags" title={UI_TEXT.redFlags} items={disease.redFlags} />
                  <DecisionListBlock id="common-mistakes" title={UI_TEXT.commonMistakes} items={disease.commonMistakes} />
                  <DecisionListBlock id="clinical-pearls" title={UI_TEXT.clinicalPearls} items={disease.clinicalPearls} />
                </DecisionPanel>
              </div>
            </EditorialPanel>
          ) : null}

          <EditorialPanel
            id="understanding-disease"
            title={UI_TEXT.understandingDisease}
            lead={UI_TEXT.understandingDiseaseLead}
          >
            <div className="space-y-12">
              <DiseaseSectionRenderer id="introduction" title={UI_TEXT.introduction} data={disease.introduction} />
              <DiseaseSectionRenderer id="etiology" title={UI_TEXT.etiology} data={disease.etiology} />
              <DiseaseSectionRenderer id="transmission" title={UI_TEXT.transmission} data={disease.transmission} />
              <DiseaseSectionRenderer id="pathophysiology" title={UI_TEXT.pathophysiology} data={disease.pathophysiology} />
              <DiseaseSectionRenderer id="epidemiology" title={UI_TEXT.epidemiology} data={disease.epidemiology} />
            </div>
          </EditorialPanel>

          <EditorialPanel
            id="diagnostic-plan"
            title={UI_TEXT.diagnosticPlan}
            lead={UI_TEXT.diagnosticPlanLead}
          >
            <div className="space-y-12">
              <DiseaseSectionRenderer id="clinicalPresentation" title={UI_TEXT.clinicalPresentation} data={disease.clinicalPresentation} />
              <DiseaseSectionRenderer id="physicalExam" title={UI_TEXT.physicalExam} data={disease.physicalExam} />
              <DiseaseSectionRenderer id="differentialDiagnoses" title={UI_TEXT.differentialDiagnoses} data={disease.differentialDiagnoses} />
              <DiseaseSectionRenderer id="diagnostics" title={UI_TEXT.diagnostics} data={disease.diagnostics} />
              <DiseaseSectionRenderer id="diagnosticApproach" title={UI_TEXT.diagnosticApproach} data={disease.diagnosticApproach} />
            </div>
          </EditorialPanel>

          <EditorialPanel
            id="treatment-plan"
            title={UI_TEXT.treatmentPlan}
            lead={UI_TEXT.treatmentPlanLead}
          >
            <div className="space-y-12">
              <DiseaseSectionRenderer id="treatment" title={UI_TEXT.treatment} data={disease.treatment} />
              <DiseaseSectionRenderer id="prognosis" title={UI_TEXT.prognosis} data={disease.prognosis} />
              <DiseaseSectionRenderer id="complications" title={UI_TEXT.complications} data={disease.complications} />
              <DiseaseSectionRenderer id="prevention" title={UI_TEXT.prevention} data={disease.prevention} />
            </div>
          </EditorialPanel>

          {(relatedConsensos.length > 0 || relatedMedications.length > 0) ? (
            <EditorialPanel
              id="related"
              title={UI_TEXT.relatedContent}
              lead="Materiais associados aparecem como apoio à consulta, sem competir com o raciocínio diagnóstico e terapêutico principal."
            >
              <div className="grid gap-8 xl:grid-cols-2">
                {relatedConsensos.length > 0 ? (
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      {UI_TEXT.consensus}
                    </h3>
                    <div className="space-y-3">
                      {relatedConsensos.map((consenso) => (
                        <Link
                          key={consenso.id}
                          to={`/consulta-vet/consensos/${consenso.slug}`}
                          className="group block rounded-[22px] border border-border/80 bg-background/75 px-5 py-4 transition-all hover:border-primary/35 hover:bg-background"
                        >
                          <p className="font-semibold text-foreground transition-colors group-hover:text-primary">{consenso.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {consenso.organization || UI_TEXT.organizationFallback}
                            {consenso.year ? ` • ${consenso.year}` : ''}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}

                {relatedMedications.length > 0 ? (
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      <Pill className="h-4 w-4" />
                      {UI_TEXT.medications}
                    </h3>
                    <div className="space-y-3">
                      {relatedMedications.map((medication) => (
                        <Link
                          key={medication.id}
                          to={`/consulta-vet/medicamentos/${medication.slug}`}
                          className="group block rounded-[22px] border border-border/80 bg-background/75 px-5 py-4 transition-all hover:border-primary/35 hover:bg-background"
                        >
                          <p className="font-semibold text-foreground transition-colors group-hover:text-primary">{medication.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{medication.pharmacologicClass}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </EditorialPanel>
          ) : null}

          {disease.references && disease.references.length > 0 ? (
            <div id="references" className="scroll-mt-24">
              <ReferencesList references={disease.references} />
            </div>
          ) : null}
        </div>
      </div>

      <div className="hidden w-60 shrink-0 py-8 pr-6 2xl:w-64 2xl:pr-8 xl:block">
        <SectionAnchorNav sections={sections} onActiveChange={handleActiveSectionChange} className="w-60 2xl:w-64" />
      </div>
    </div>
  );
}

