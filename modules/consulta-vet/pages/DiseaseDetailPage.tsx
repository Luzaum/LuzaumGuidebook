import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AlertTriangle, ChevronRight, FileText, Pill, Share2, Stethoscope } from 'lucide-react';
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

type HighlightCardTone = 'primary' | 'neutral' | 'warning' | 'danger' | 'emerald';

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

const toneClassMap: Record<HighlightCardTone, string> = {
  primary: 'border-primary/20 bg-primary/5',
  neutral: 'border-border bg-card',
  warning: 'border-amber-500/20 bg-amber-500/10',
  danger: 'border-destructive/20 bg-destructive/10',
  emerald: 'border-emerald-500/20 bg-emerald-500/10',
};

function HighlightCard({
  id,
  title,
  items,
  tone = 'neutral',
  className = '',
}: {
  id: string;
  title: string;
  items?: string[];
  tone?: HighlightCardTone;
  className?: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <article id={id} className={`scroll-mt-24 rounded-2xl border p-5 shadow-sm md:p-6 ${toneClassMap[tone]} ${className}`.trim()}>
      <h3 className="mb-4 text-base font-semibold tracking-tight text-foreground">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
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
      disease.thirtySecondView?.length ? { id: 'thirty-second-view', label: UI_TEXT.thirtySecondView } : null,
      disease.doNotForget?.length ? { id: 'do-not-forget', label: UI_TEXT.doNotForget } : null,
      disease.whenToSuspect?.length ? { id: 'when-to-suspect', label: UI_TEXT.whenToSuspect } : null,
      disease.initialConduct?.length ? { id: 'initial-conduct', label: UI_TEXT.initialConduct } : null,
      disease.dogVsCatDifferences?.length ? { id: 'dog-vs-cat-differences', label: UI_TEXT.dogVsCatDifferences } : null,
      disease.highYieldTests?.length ? { id: 'high-yield-tests', label: UI_TEXT.highYieldTests } : null,
      disease.commonMistakes?.length ? { id: 'common-mistakes', label: UI_TEXT.commonMistakes } : null,
      disease.redFlags.length ? { id: 'red-flags', label: UI_TEXT.redFlags } : null,
      disease.clinicalPearls.length ? { id: 'clinical-pearls', label: UI_TEXT.clinicalPearls } : null,
      { id: 'introduction', label: UI_TEXT.introduction },
      { id: 'etiology', label: UI_TEXT.etiology },
      { id: 'transmission', label: UI_TEXT.transmission },
      { id: 'pathophysiology', label: UI_TEXT.pathophysiology },
      { id: 'epidemiology', label: UI_TEXT.epidemiology },
      { id: 'clinicalPresentation', label: UI_TEXT.clinicalPresentation },
      { id: 'physicalExam', label: UI_TEXT.physicalExam },
      { id: 'differentialDiagnoses', label: UI_TEXT.differentialDiagnoses },
      { id: 'diagnostics', label: UI_TEXT.diagnostics },
      { id: 'diagnosticApproach', label: UI_TEXT.diagnosticApproach },
      { id: 'treatment', label: UI_TEXT.treatment },
      { id: 'prognosis', label: UI_TEXT.prognosis },
      { id: 'complications', label: UI_TEXT.complications },
      { id: 'prevention', label: UI_TEXT.prevention },
      relatedConsensos.length > 0 || relatedMedications.length > 0 ? { id: 'related', label: UI_TEXT.related } : null,
      disease.references?.length ? { id: 'references', label: UI_TEXT.references } : null,
    ].filter(Boolean) as Array<{ id: string; label: string }>;
  }, [disease, relatedConsensos.length, relatedMedications.length]);

  const handleActiveSectionChange = (sectionId: string) => {
    if (!disease || !sectionId || lastSavedSectionRef.current === sectionId) return;
    lastSavedSectionRef.current = sectionId;
    addRecent('disease', disease.id, undefined, sectionId);
  };

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

  const hasQuickBlocks = Boolean(
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
    <div className="mx-auto flex h-full w-full max-w-[1560px] flex-col lg:flex-row">
      <div className="w-full flex-1 overflow-y-auto p-4 md:p-8 lg:pr-10 xl:pr-12">
        <nav className="mb-8 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
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

        <header className="mb-10 rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8">
          {disease.isDemonstrative && disease.warningLabel && (
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
              <AlertTriangle className="h-3 w-3" />
              {disease.warningLabel}
            </div>
          )}

          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                {disease.title}
              </h1>
              {disease.synonyms.length > 0 && (
                <p className="mt-3 text-base font-medium text-muted-foreground md:text-lg">
                  {disease.synonyms.join(' • ')}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-primary">
                  {formatSpeciesList(disease.species)}
                </span>
                <span className="rounded-lg border border-border bg-muted px-3 py-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {disease.category}
                </span>
              </div>

              <div className="mt-5">
                <TagPills tags={disease.tags} />
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 self-start">
              <button
                className="rounded-full bg-muted p-3 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
                title={UI_TEXT.copyLink}
                type="button"
                onClick={handleCopyLink}
              >
                <Share2 className="h-5 w-5" />
              </button>
              <FavoriteButton entityType="disease" entityId={disease.id} className="h-12 w-12 p-3" />
            </div>
          </div>
        </header>

        <section id="quick-summary" className="mb-8 scroll-mt-24">
          <div className="relative overflow-hidden rounded-[28px] border border-primary/15 bg-primary p-6 text-primary-foreground shadow-lg md:p-8">
            <div className="absolute right-0 top-0 h-56 w-56 translate-x-1/4 -translate-y-1/2 rounded-full bg-white/20 blur-3xl" />
            <div className="relative z-10 max-w-4xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-primary-foreground/80">
                {UI_TEXT.quickSummary}
              </p>
              <p className="text-xl leading-relaxed md:text-2xl">{disease.quickSummary}</p>
            </div>
          </div>
        </section>

        {hasQuickBlocks && (
          <section id="key-points" className="mb-12 scroll-mt-24 space-y-5">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">{UI_TEXT.quickBlocksTitle}</h2>
                <p className="text-sm text-muted-foreground">{UI_TEXT.quickBlocksBody}</p>
              </div>
            </div>

            <HighlightCard
              id="thirty-second-view"
              title={UI_TEXT.thirtySecondView}
              items={disease.thirtySecondView}
              tone="primary"
              className="md:p-7"
            />

            <div className="grid gap-5 xl:grid-cols-2">
              <HighlightCard id="do-not-forget" title={UI_TEXT.doNotForget} items={disease.doNotForget} tone="neutral" />
              <HighlightCard id="when-to-suspect" title={UI_TEXT.whenToSuspect} items={disease.whenToSuspect} tone="neutral" />
              <HighlightCard id="initial-conduct" title={UI_TEXT.initialConduct} items={disease.initialConduct} tone="emerald" />
              <HighlightCard id="dog-vs-cat-differences" title={UI_TEXT.dogVsCatDifferences} items={disease.dogVsCatDifferences} tone="neutral" />
              <HighlightCard id="high-yield-tests" title={UI_TEXT.highYieldTests} items={disease.highYieldTests} tone="neutral" />
              <HighlightCard id="common-mistakes" title={UI_TEXT.commonMistakes} items={disease.commonMistakes} tone="warning" className="xl:col-span-2" />
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
              <HighlightCard id="red-flags" title={UI_TEXT.redFlags} items={disease.redFlags} tone="danger" />
              <HighlightCard id="clinical-pearls" title={UI_TEXT.clinicalPearls} items={disease.clinicalPearls} tone="warning" />
            </div>
          </section>
        )}

        <div className="space-y-14">
          <DiseaseSectionRenderer id="introduction" title={UI_TEXT.introduction} data={disease.introduction} />
          <DiseaseSectionRenderer id="etiology" title={UI_TEXT.etiology} data={disease.etiology} />
          <DiseaseSectionRenderer id="transmission" title={UI_TEXT.transmission} data={disease.transmission} />
          <DiseaseSectionRenderer id="pathophysiology" title={UI_TEXT.pathophysiology} data={disease.pathophysiology} />
          <DiseaseSectionRenderer id="epidemiology" title={UI_TEXT.epidemiology} data={disease.epidemiology} />
          <DiseaseSectionRenderer id="clinicalPresentation" title={UI_TEXT.clinicalPresentation} data={disease.clinicalPresentation} />
          <DiseaseSectionRenderer id="physicalExam" title={UI_TEXT.physicalExam} data={disease.physicalExam} />
          <DiseaseSectionRenderer id="differentialDiagnoses" title={UI_TEXT.differentialDiagnoses} data={disease.differentialDiagnoses} />
          <DiseaseSectionRenderer id="diagnostics" title={UI_TEXT.diagnostics} data={disease.diagnostics} />
          <DiseaseSectionRenderer id="diagnosticApproach" title={UI_TEXT.diagnosticApproach} data={disease.diagnosticApproach} />
          <DiseaseSectionRenderer id="treatment" title={UI_TEXT.treatment} data={disease.treatment} />
          <DiseaseSectionRenderer id="prognosis" title={UI_TEXT.prognosis} data={disease.prognosis} />
          <DiseaseSectionRenderer id="complications" title={UI_TEXT.complications} data={disease.complications} />
          <DiseaseSectionRenderer id="prevention" title={UI_TEXT.prevention} data={disease.prevention} />
        </div>

        {(relatedConsensos.length > 0 || relatedMedications.length > 0) && (
          <section id="related" className="mt-16 scroll-mt-24 border-t border-border pt-12">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">{UI_TEXT.relatedContent}</h2>

            <div className="grid gap-8 xl:grid-cols-2">
              {relatedConsensos.length > 0 && (
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    {UI_TEXT.consensus}
                  </h3>
                  <div className="space-y-3">
                    {relatedConsensos.map((consenso) => (
                      <Link
                        key={consenso.id}
                        to={`/consulta-vet/consensos/${consenso.slug}`}
                        className="group block rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
                      >
                        <p className="font-semibold text-foreground transition-colors group-hover:text-primary">
                          {consenso.title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {consenso.organization || UI_TEXT.organizationFallback}
                          {consenso.year ? ` • ${consenso.year}` : ''}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {relatedMedications.length > 0 && (
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    <Pill className="h-4 w-4" />
                    {UI_TEXT.medications}
                  </h3>
                  <div className="space-y-3">
                    {relatedMedications.map((medication) => (
                      <Link
                        key={medication.id}
                        to={`/consulta-vet/medicamentos/${medication.slug}`}
                        className="group block rounded-xl border border-border bg-card p-4 transition-all hover:border-emerald-300 hover:shadow-sm dark:hover:border-emerald-700"
                      >
                        <p className="font-semibold text-foreground transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          {medication.title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">{medication.pharmacologicClass}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {disease.references && disease.references.length > 0 && (
          <div id="references" className="mt-16 scroll-mt-24">
            <ReferencesList references={disease.references} />
          </div>
        )}
      </div>

      <div className="hidden w-72 shrink-0 py-8 pr-8 xl:block">
        <SectionAnchorNav sections={sections} onActiveChange={handleActiveSectionChange} />
      </div>
    </div>
  );
}
