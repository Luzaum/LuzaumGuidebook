import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ChevronRight, FileText, Pill, Share2, Stethoscope } from 'lucide-react';
import { DoseCalculatorCard } from '../components/medication/DoseCalculatorCard';
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

const UI_TEXT = {
  home: 'Início',
  medications: 'Medicamentos',
  backToMedications: 'Voltar para Medicamentos',
  copyLink: 'Copiar link',
  loadErrorTitle: 'Erro ao abrir medicamento',
  loadErrorFallback: 'Falha ao carregar medicamento.',
  notFoundTitle: 'Medicamento não encontrado',
  notFoundBody: 'Não foi possível localizar o conteúdo solicitado.',
  doseCalculator: 'Calculadora de dose',
  pharmacology: 'Informações farmacológicas',
  clinicalNotes: 'Observações clínicas',
  adminNotes: 'Notas editoriais',
  references: 'Referências',
  related: 'Relacionados',
  activeIngredient: 'Princípio ativo',
  pharmacologicClass: 'Classe farmacológica',
  tradeNames: 'Nomes comerciais',
  presentations: 'Apresentações',
  mechanismOfAction: 'Mecanismo de ação',
  indications: 'Indicações',
  contraindications: 'Contraindicações',
  cautions: 'Precauções',
  adverseEffects: 'Efeitos adversos',
  interactions: 'Interações',
  routes: 'Vias',
  relatedContent: 'Conteúdo relacionado',
  relatedDiseases: 'Doenças relacionadas',
  relatedConsensos: 'Consensos relacionados',
  organizationFallback: 'Organização não informada',
  noTradeName: 'Sem nome comercial de referência',
} as const;

function BulletList({ items, tone }: { items: string[]; tone: 'emerald' | 'destructive' | 'amber' | 'muted' }) {
  const dotClassMap = {
    emerald: 'bg-emerald-500',
    destructive: 'bg-destructive',
    amber: 'bg-amber-500',
    muted: 'bg-muted-foreground/50',
  } as const;

  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-foreground/85">
          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dotClassMap[tone]}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function MedicationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const medicationRepository = useMemo(() => getMedicationRepository(), []);
  const diseaseRepository = useMemo(() => getDiseaseRepository(), []);
  const consensoRepository = useMemo(() => getConsensoRepository(), []);
  const { addRecent } = useRecents();

  const [medication, setMedication] = useState<MedicationRecord | null>(null);
  const [relatedDiseases, setRelatedDiseases] = useState<DiseaseRecord[]>([]);
  const [relatedConsensos, setRelatedConsensos] = useState<ConsensusRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastSavedSectionRef = useRef<string>('');

  const resumeState = (location.state as ResumeLocationState | null) || null;

  const sections = [
    { id: 'dose-calculator', label: UI_TEXT.doseCalculator },
    { id: 'pharmacology', label: UI_TEXT.pharmacology },
    { id: 'clinical-notes', label: UI_TEXT.clinicalNotes },
    medication?.adminNotesText ? { id: 'admin-notes', label: UI_TEXT.adminNotes } : null,
    medication?.references?.length ? { id: 'references', label: UI_TEXT.references } : null,
    { id: 'related', label: UI_TEXT.related },
  ].filter(Boolean) as Array<{ id: string; label: string }>;

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

        addRecent('medication', found.id, undefined, resumeState?.sectionId);

        const [loadedDiseases, loadedConsensos] = await Promise.all([
          diseaseRepository.list(),
          consensoRepository.list(),
        ]);

        if (!isMounted) return;

        const nextRelatedDiseases = loadedDiseases.filter((item) => found.relatedDiseaseSlugs.includes(item.slug));
        const consensusSlugSet = new Set(nextRelatedDiseases.flatMap((item) => item.relatedConsensusSlugs));

        setRelatedDiseases(nextRelatedDiseases);
        setRelatedConsensos(loadedConsensos.filter((item) => consensusSlugSet.has(item.slug)));
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
    if (!medication || !resumeState?.sectionId) return;

    const timeoutId = window.setTimeout(() => {
      const element = document.getElementById(resumeState.sectionId || '');
      element?.scrollIntoView({ block: 'start' });
    }, 150);

    return () => window.clearTimeout(timeoutId);
  }, [medication, resumeState?.sectionId]);

  const handleActiveSectionChange = (sectionId: string) => {
    if (!medication || !sectionId || lastSavedSectionRef.current === sectionId) return;
    lastSavedSectionRef.current = sectionId;
    addRecent('medication', medication.id, undefined, sectionId);
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
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
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
            to="/consulta-vet/medicamentos"
            className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            {UI_TEXT.backToMedications}
          </Link>
        </div>
      </div>
    );
  }

  if (!medication) {
    return (
      <div className="mx-auto flex h-full w-full max-w-[860px] items-center justify-center p-6">
        <div className="w-full rounded-2xl border border-border bg-card p-6 text-center md:p-8">
          <h2 className="mb-2 text-xl font-semibold text-foreground">{UI_TEXT.notFoundTitle}</h2>
          <p className="mb-6 text-sm text-muted-foreground">{UI_TEXT.notFoundBody}</p>
          <Link
            to="/consulta-vet/medicamentos"
            className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            {UI_TEXT.backToMedications}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-[1560px] flex-col lg:flex-row">
      <div className="w-full flex-1 overflow-y-auto p-4 md:p-8 lg:pr-10 xl:pr-12">
        <nav className="mb-8 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <Link to="/consulta-vet" className="transition-colors hover:text-emerald-600">
            {UI_TEXT.home}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/consulta-vet/medicamentos" className="transition-colors hover:text-emerald-600">
            {UI_TEXT.medications}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate text-foreground">{medication.title}</span>
        </nav>

        <header className="mb-10 rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                {medication.title}
              </h1>
              <p className="mt-3 text-base font-medium text-muted-foreground md:text-lg">
                {medication.activeIngredient} • {medication.pharmacologicClass}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {formatSpeciesList(medication.species)}
                </span>
                <span className="rounded-lg border border-border bg-muted px-3 py-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {medication.category}
                </span>
              </div>

              <div className="mt-5">
                <TagPills tags={medication.tags} />
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
              <FavoriteButton entityType="medication" entityId={medication.id} className="h-12 w-12 p-3" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-border bg-muted/30 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{UI_TEXT.activeIngredient}</p>
              <p className="text-sm font-medium text-foreground">{medication.activeIngredient}</p>
            </div>
            <div className="rounded-2xl border border-border bg-muted/30 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{UI_TEXT.pharmacologicClass}</p>
              <p className="text-sm font-medium text-foreground">{medication.pharmacologicClass}</p>
            </div>
            <div className="rounded-2xl border border-border bg-muted/30 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{UI_TEXT.tradeNames}</p>
              <p className="text-sm font-medium text-foreground">
                {medication.tradeNames.length > 0 ? medication.tradeNames.join(', ') : UI_TEXT.noTradeName}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-muted/30 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{UI_TEXT.presentations}</p>
              <p className="text-sm font-medium text-foreground">{medication.presentations.map((item) => item.label).join(' | ')}</p>
            </div>
          </div>
        </header>

        <div className="space-y-12">
          <section id="dose-calculator" className="scroll-mt-24">
            <DoseCalculatorCard doses={medication.doses} presentations={medication.presentations} />
          </section>

          <section id="pharmacology" className="scroll-mt-24 rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
              <Pill className="h-5 w-5 text-emerald-600" />
              {UI_TEXT.pharmacology}
            </h2>

            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-muted/20 p-5">
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">{UI_TEXT.mechanismOfAction}</h3>
                <p className="leading-relaxed text-foreground/85">{medication.mechanismOfAction}</p>
              </div>

              <div className="grid gap-5 xl:grid-cols-2">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">{UI_TEXT.indications}</h3>
                  <BulletList items={medication.indications} tone="emerald" />
                </div>

                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-destructive">{UI_TEXT.contraindications}</h3>
                  <BulletList items={medication.contraindications} tone="destructive" />
                </div>
              </div>

              <div className="grid gap-5 xl:grid-cols-2">
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">{UI_TEXT.cautions}</h3>
                  <BulletList items={medication.cautions} tone="amber" />
                </div>

                <div className="rounded-2xl border border-border bg-muted/20 p-5">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">{UI_TEXT.adverseEffects}</h3>
                  <BulletList items={medication.adverseEffects} tone="muted" />
                </div>
              </div>

              {(medication.interactions?.length || medication.routes?.length) ? (
                <div className="grid gap-5 xl:grid-cols-2">
                  {medication.interactions && medication.interactions.length > 0 ? (
                    <div className="rounded-2xl border border-border bg-muted/20 p-5">
                      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">{UI_TEXT.interactions}</h3>
                      <BulletList items={medication.interactions} tone="muted" />
                    </div>
                  ) : null}
                  {medication.routes && medication.routes.length > 0 ? (
                    <div className="rounded-2xl border border-border bg-muted/20 p-5">
                      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">{UI_TEXT.routes}</h3>
                      <BulletList items={medication.routes} tone="muted" />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </section>

          <section id="clinical-notes" className="scroll-mt-24 rounded-[28px] border border-emerald-500/20 bg-emerald-500/5 p-6 md:p-8">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold tracking-tight text-emerald-900 dark:text-emerald-400">
              <Pill className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
              {UI_TEXT.clinicalNotes}
            </h2>
            <div
              className="prose prose-emerald max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: medication.clinicalNotesRichText }}
            />
          </section>

          {medication.adminNotesText ? (
            <section id="admin-notes" className="scroll-mt-24 rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8">
              <h2 className="mb-4 text-xl font-bold tracking-tight text-foreground">{UI_TEXT.adminNotes}</h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{medication.adminNotesText}</p>
            </section>
          ) : null}

          {medication.references && medication.references.length > 0 ? (
            <div id="references" className="scroll-mt-24">
              <ReferencesList references={medication.references} title={UI_TEXT.references} />
            </div>
          ) : null}

          {(relatedDiseases.length > 0 || relatedConsensos.length > 0) && (
            <section id="related" className="scroll-mt-24 border-t border-border pt-12">
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">{UI_TEXT.relatedContent}</h2>

              <div className="grid gap-8 xl:grid-cols-2">
                {relatedDiseases.length > 0 && (
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      <Stethoscope className="h-4 w-4" />
                      {UI_TEXT.relatedDiseases}
                    </h3>
                    <div className="space-y-3">
                      {relatedDiseases.map((disease) => (
                        <Link
                          key={disease.id}
                          to={`/consulta-vet/doencas/${disease.slug}`}
                          className="group block rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
                        >
                          <p className="font-semibold text-foreground transition-colors group-hover:text-primary">
                            {disease.title}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">{disease.category}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {relatedConsensos.length > 0 && (
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      {UI_TEXT.relatedConsensos}
                    </h3>
                    <div className="space-y-3">
                      {relatedConsensos.map((consenso) => (
                        <Link
                          key={consenso.id}
                          to={`/consulta-vet/consensos/${consenso.slug}`}
                          className="group block rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
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
              </div>
            </section>
          )}
        </div>
      </div>

      <div className="hidden w-72 shrink-0 py-8 pr-8 xl:block">
        <SectionAnchorNav sections={sections} onActiveChange={handleActiveSectionChange} />
      </div>
    </div>
  );
}
