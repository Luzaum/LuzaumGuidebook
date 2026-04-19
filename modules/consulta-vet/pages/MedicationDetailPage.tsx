import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { ChevronRight, FileText, Pill, Share2, Stethoscope } from 'lucide-react';
import { ConsultaVetSurface } from '../components/layout/ConsultaVetSurface';
import { DoseCalculatorCard } from '../components/medication/DoseCalculatorCard';
import { MedicationSectionFrame } from '../components/medication/MedicationSectionFrame';
import { MedicationStructuredBlocks } from '../components/medication/MedicationStructuredBlocks';
import { FavoriteButton } from '../components/shared/FavoriteButton';
import { ReferencesList } from '../components/shared/ReferencesList';
import { SectionAnchorNav, type SectionAnchorEntry } from '../components/shared/SectionAnchorNav';
import { TagPills } from '../components/shared/TagPills';
import { useRecents } from '../hooks/useRecents';
import { getConsensoRepository } from '../services/consensoRepository';
import { getDiseaseRepository } from '../services/diseaseRepository';
import { getMedicationRepository } from '../services/medicationRepository';
import { ConsensusRecord } from '../types/consenso';
import { DiseaseRecord } from '../types/disease';
import { MedicationPresentation, MedicationRecord, MedicationSupplyChannel } from '../types/medication';
import { formatSpeciesList } from '../utils/navigation';
import { cn } from '../../../lib/utils';
import { buildDoseSummaryLabel, formatDoseSpeciesLabel } from '../utils/medicationRules';
import { medicationPharmacologyBlockIcons } from '../utils/editorialSubsectionIcons';
import { getMedicationSectionVisual } from '../utils/medicationSectionVisual';

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
  doseCalculatorLead: 'Peso, espécie, regime e apresentação em um cálculo só.',
  regimens: 'Doses por espécie e regime',
  regimensLead:
    'Leitura por espécie, em linhas clínicas expansíveis — comparar regimes com menos ruído visual.',
  pharmacology: 'Informações farmacológicas',
  pharmacologyLead: 'Mecanismo em destaque; blocos seguintes apoiam a decisão clínica (indicações, cautelas, interações).',
  clinicalNotes: 'Observações clínicas',
  clinicalNotesLead: 'Texto corrido para leitura prática, com boa largura de linha.',
  references: 'Referências',
  related: 'Relacionados',
  activeIngredient: 'Princípio ativo',
  pharmacologicClass: 'Classe farmacológica',
  tradeNames: 'Nomes comerciais',
  presentations: 'Apresentações',
  mechanismOfAction: 'Como esse fármaco funciona',
  indications: 'Quando usar',
  contraindications: 'Quando evitar',
  cautions: 'Cautelas importantes',
  adverseEffects: 'Efeitos adversos relevantes',
  interactions: 'Interações que mudam conduta',
  routes: 'Vias',
  relatedContent: 'Conteúdo relacionado',
  relatedLead: 'Materiais associados como apoio à consulta, sem competir com o conteúdo principal.',
  relatedDiseases: 'Doenças relacionadas',
  relatedConsensos: 'Consensos relacionados',
  organizationFallback: 'Organização não informada',
  noTradeName: 'Sem nome comercial de referência',
  presentationInfo: 'Cada apresentação continua disponível para cálculo e comparação, mas em um layout mais limpo.',
} as const;

function formatSupplyChannel(channel?: MedicationSupplyChannel): string {
  if (channel === 'human_pharmacy') return 'Farmácia humana';
  if (channel === 'compounded') return 'Manipulado';
  return 'Medicina veterinária';
}

function MetaStat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border-l border-border/70 pl-4 first:border-l-0 first:pl-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{label}</p>
      <div className="mt-2 text-sm leading-6 text-foreground">{value}</div>
    </div>
  );
}

function BulletList({
  items,
  bulletDotClass,
  className = '',
}: {
  items: string[];
  bulletDotClass: string;
  className?: string;
}) {
  if (!items.length) return null;

  return (
    <ul className={`space-y-3.5 ${className}`.trim()}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] leading-7 text-foreground/86">
          <span className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${bulletDotClass}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PharmacologyBlock({
  title,
  items,
  bulletDotClass,
  className = '',
  icon: Icon,
}: {
  title: string;
  items: string[];
  bulletDotClass: string;
  className?: string;
  /** Ícone minimalista alinhado ao tema do bloco */
  icon?: LucideIcon;
}) {
  if (!items.length) return null;

  return (
    <article className={`rounded-[24px] border border-border/80 bg-background/68 px-6 py-5 ${className}`.trim()}>
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {Icon ? <Icon className="h-4 w-4 shrink-0 opacity-90" strokeWidth={2} aria-hidden /> : null}
        <span>{title}</span>
      </h3>
      <div className="mt-4">
        <BulletList items={items} bulletDotClass={bulletDotClass} />
      </div>
    </article>
  );
}

function DoseRegimenSection({ medication }: { medication: MedicationRecord }) {
  const grouped = useMemo(() => {
    const groups = new Map<string, MedicationRecord['doses']>();
    medication.doses.forEach((dose) => {
      const label = formatDoseSpeciesLabel(dose.species);
      const current = groups.get(label) || [];
      current.push(dose);
      groups.set(label, current);
    });
    return Array.from(groups.entries());
  }, [medication.doses]);

  const [activeSpecies, setActiveSpecies] = useState(grouped[0]?.[0] || '');

  useEffect(() => {
    if (!grouped.length) return;
    if (grouped.some(([label]) => label === activeSpecies)) return;
    setActiveSpecies(grouped[0][0]);
  }, [activeSpecies, grouped]);

  const activeDoses = grouped.find(([label]) => label === activeSpecies)?.[1] || grouped[0]?.[1] || [];

  if (!medication.doses.length) return null;

  return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2.5">
          {grouped.map(([speciesLabel]) => (
            <button
              key={speciesLabel}
              type="button"
              onClick={() => setActiveSpecies(speciesLabel)}
              className={
                activeSpecies === speciesLabel
                  ? 'rounded-full border border-primary/25 bg-primary/[0.08] px-4 py-2 text-sm font-semibold text-primary'
                  : 'rounded-full border border-border bg-background/70 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
              }
            >
              {speciesLabel}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-[26px] border border-border/80 bg-background/72">
          <div className="hidden grid-cols-[2.1fr_1fr_0.9fr_0.95fr_1.2fr] gap-4 border-b border-border/70 bg-muted/[0.16] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground lg:grid">
            <span>Indicação e dose</span>
            <span>Via</span>
            <span>Frequência</span>
            <span>Duração</span>
            <span>Leitura rápida</span>
          </div>

          <div className="divide-y divide-border/70">
            {activeDoses.map((dose) => (
              <details key={dose.id} className="group open:bg-muted/[0.08]">
                <summary className="cursor-pointer list-none px-5 py-5 marker:hidden transition-colors hover:bg-muted/[0.08] md:px-6">
                  <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[2.1fr_1fr_0.9fr_0.95fr_1.2fr] lg:items-start lg:gap-4">
                    <div className="min-w-0">
                      <p className="text-base font-semibold leading-7 text-foreground">{dose.indication}</p>
                      <p className="mt-1 text-sm leading-7 text-muted-foreground">{buildDoseSummaryLabel(dose)}</p>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground lg:hidden">Via</p>
                      <p className="mt-1 text-sm leading-7 text-foreground">{dose.route}</p>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground lg:hidden">Frequência</p>
                      <p className="mt-1 text-sm leading-7 text-foreground">{dose.frequency}</p>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground lg:hidden">Duração</p>
                      <p className="mt-1 text-sm leading-7 text-foreground">{dose.duration || 'Individualizar'}</p>
                    </div>

                    <div className="flex items-start justify-between gap-4 lg:block">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground lg:hidden">Resumo</p>
                      <p className="mt-1 text-sm leading-7 text-muted-foreground">
                        {dose.notes ? 'Ver observações e cautelas' : 'Sem observações extras'}
                      </p>
                    </div>
                  </div>
                </summary>

                {(dose.notes || dose.duration) && (
                  <div className="border-t border-border/70 px-5 pb-5 pt-4 md:px-6">
                    <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Espécie</p>
                        <p className="mt-2 text-sm leading-7 text-foreground">{activeSpecies}</p>
                        {dose.duration ? (
                          <>
                            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Duração</p>
                            <p className="mt-2 text-sm leading-7 text-foreground/85">{dose.duration}</p>
                          </>
                        ) : null}
                      </div>

                      {dose.notes ? (
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Observações</p>
                          <p className="mt-2 text-sm leading-7 text-muted-foreground">{dose.notes}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </details>
            ))}
          </div>
        </div>
      </div>
  );
}

function MobilePresentationCard({ presentation }: { presentation: MedicationPresentation }) {
  return (
    <article className="rounded-[24px] border border-border/80 bg-background/75 p-5">
      <p className="text-base font-semibold text-foreground">{presentation.label}</p>
      <dl className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground">
        <div className="flex items-start justify-between gap-4">
          <dt className="font-medium text-foreground">Canal</dt>
          <dd className="text-right">{formatSupplyChannel(presentation.channel)}</dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="font-medium text-foreground">Forma</dt>
          <dd className="text-right">{presentation.form}</dd>
        </div>
        {presentation.route ? (
          <div className="flex items-start justify-between gap-4">
            <dt className="font-medium text-foreground">Via</dt>
            <dd className="text-right">{presentation.route}</dd>
          </div>
        ) : null}
        {presentation.concentrationValue ? (
          <div className="flex items-start justify-between gap-4">
            <dt className="font-medium text-foreground">Concentração</dt>
            <dd className="text-right">
              {presentation.concentrationValue} {presentation.concentrationUnit}
            </dd>
          </div>
        ) : null}
        {presentation.packInfo ? (
          <div className="flex items-start justify-between gap-4">
            <dt className="font-medium text-foreground">Apresentação</dt>
            <dd className="text-right">{presentation.packInfo}</dd>
          </div>
        ) : null}
        {presentation.scoringInfo ? (
          <div className="flex items-start justify-between gap-4">
            <dt className="font-medium text-foreground">Fracionamento</dt>
            <dd className="text-right">{presentation.scoringInfo}</dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}

function PresentationsSection({ medication }: { medication: MedicationRecord }) {
  if (!medication.presentations.length) return null;

  return (
    <>
      <p className="mb-6 max-w-[96ch] text-sm leading-7 text-muted-foreground">{UI_TEXT.presentationInfo}</p>
      <div className="hidden overflow-hidden rounded-[24px] border border-border/80 xl:block">
        <div className="grid grid-cols-[1.8fr_1.25fr_1fr_0.75fr_1.1fr_1fr_1fr] gap-4 border-b border-border/80 bg-muted/18 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          <span>Nome</span>
          <span>Canal</span>
          <span>Forma</span>
          <span>Via</span>
          <span>Concentração</span>
          <span>Apresentação</span>
          <span>Fracionamento</span>
        </div>

        <div className="divide-y divide-border/70">
          {medication.presentations.map((presentation) => (
            <div
              key={presentation.id}
              className="grid grid-cols-[1.8fr_1.25fr_1fr_0.75fr_1.1fr_1fr_1fr] gap-4 px-6 py-5 text-sm leading-6 text-foreground/85"
            >
              <div className="font-semibold text-foreground">{presentation.label}</div>
              <div className="text-xs text-muted-foreground">{formatSupplyChannel(presentation.channel)}</div>
              <div>{presentation.form}</div>
              <div>{presentation.route || '—'}</div>
              <div>
                {presentation.concentrationValue
                  ? `${presentation.concentrationValue} ${presentation.concentrationUnit}`
                  : '—'}
              </div>
              <div>{presentation.packInfo || '—'}</div>
              <div>{presentation.scoringInfo || '—'}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:hidden">
        {medication.presentations.map((presentation) => (
          <MobilePresentationCard key={presentation.id} presentation={presentation} />
        ))}
      </div>
    </>
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

  const sections: SectionAnchorEntry[] = useMemo(() => {
    if (!medication) return [];
    const base: SectionAnchorEntry[] = [];
    if (medication.doses.length > 0) {
      base.push(
        { id: 'dose-calculator', label: UI_TEXT.doseCalculator, activeClassName: getMedicationSectionVisual('dose-calculator').navItemActiveClass },
        { id: 'dose-regimens', label: UI_TEXT.regimens, activeClassName: getMedicationSectionVisual('dose-regimens').navItemActiveClass }
      );
    }
    if (medication.presentations.length > 0) {
      base.push({
        id: 'presentations',
        label: UI_TEXT.presentations,
        activeClassName: getMedicationSectionVisual('presentations').navItemActiveClass,
      });
    }
    base.push(
      { id: 'pharmacology', label: UI_TEXT.pharmacology, activeClassName: getMedicationSectionVisual('pharmacology').navItemActiveClass },
      { id: 'clinical-notes', label: UI_TEXT.clinicalNotes, activeClassName: getMedicationSectionVisual('clinical-notes').navItemActiveClass }
    );
    if (medication.references?.length) {
      base.push({
        id: 'references',
        label: UI_TEXT.references,
        activeClassName: getMedicationSectionVisual('references').navItemActiveClass,
      });
    }
    if (relatedDiseases.length > 0 || relatedConsensos.length > 0) {
      base.push({
        id: 'related',
        label: UI_TEXT.related,
        activeClassName: getMedicationSectionVisual('related').navItemActiveClass,
      });
    }
    return base;
  }, [medication, relatedDiseases.length, relatedConsensos.length]);

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

  const handleActiveSectionChange = useCallback((sectionId: string) => {
    if (!medication || !sectionId || lastSavedSectionRef.current === sectionId) return;
    lastSavedSectionRef.current = sectionId;
    addRecent('medication', medication.id, undefined, sectionId);
  }, [addRecent, medication]);

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

  const pharmacologyVisual = getMedicationSectionVisual('pharmacology');

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
    <div className="mx-auto flex h-full w-full max-w-[1840px] flex-col xl:flex-row">
      <div className="w-full flex-1 overflow-y-auto px-4 py-4 md:px-8 md:py-8 xl:px-10 xl:pr-8 2xl:px-12">
        <nav className="mb-7 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
          <Link to="/consulta-vet" className="transition-colors hover:text-primary">
            {UI_TEXT.home}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/consulta-vet/medicamentos" className="transition-colors hover:text-primary">
            {UI_TEXT.medications}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate text-foreground">{medication.title}</span>
        </nav>

        <ConsultaVetSurface accent="emerald" className="p-6 shadow-md md:p-8 xl:p-10">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                  {formatSpeciesList(medication.species)}
                </span>
                <span className="rounded-full border border-border bg-muted/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {medication.category}
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl xl:max-w-[16ch]">
                {medication.title}
              </h1>

              <p className="mt-4 max-w-[96ch] text-lg leading-8 text-muted-foreground">
                {medication.activeIngredient} • {medication.pharmacologicClass}
              </p>

              <div className="mt-5">
                <TagPills tags={medication.tags} className="gap-2" />
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
              <FavoriteButton entityType="medication" entityId={medication.id} className="h-12 w-12 border border-border bg-background/80 p-3" />
            </div>
          </div>

          <div className="mt-8 grid gap-5 border-t border-border/70 pt-6 md:grid-cols-2 xl:grid-cols-4">
            <MetaStat label={UI_TEXT.activeIngredient} value={medication.activeIngredient} />
            <MetaStat label={UI_TEXT.pharmacologicClass} value={medication.pharmacologicClass} />
            <MetaStat
              label={UI_TEXT.tradeNames}
              value={medication.tradeNames.length > 0 ? medication.tradeNames.join(', ') : UI_TEXT.noTradeName}
            />
            <MetaStat label={UI_TEXT.presentations} value={medication.presentations.length} />
          </div>
        </ConsultaVetSurface>

        <div className="space-y-8 pb-10 pt-8 md:space-y-10">
          {medication.doses.length > 0 ? (
            <MedicationSectionFrame sectionId="dose-calculator" title={UI_TEXT.doseCalculator} lead={UI_TEXT.doseCalculatorLead}>
              <DoseCalculatorCard doses={medication.doses} presentations={medication.presentations} variant="embedded" />
            </MedicationSectionFrame>
          ) : null}

          {medication.doses.length > 0 ? (
            <MedicationSectionFrame sectionId="dose-regimens" title={UI_TEXT.regimens} lead={UI_TEXT.regimensLead}>
              <DoseRegimenSection medication={medication} />
            </MedicationSectionFrame>
          ) : null}

          {medication.presentations.length > 0 ? (
            <MedicationSectionFrame sectionId="presentations" title={UI_TEXT.presentations}>
              <PresentationsSection medication={medication} />
            </MedicationSectionFrame>
          ) : null}

          <MedicationSectionFrame sectionId="pharmacology" title={UI_TEXT.pharmacology} lead={UI_TEXT.pharmacologyLead}>
            <div className="space-y-6">
              <div className="rounded-[28px] border border-border/80 bg-muted/[0.12] px-7 py-7">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  <Pill className={cn('h-4 w-4', pharmacologyVisual.iconClass)} />
                  {UI_TEXT.mechanismOfAction}
                </h3>
                <div className="mt-5 max-w-none">
                  <p className="max-w-[108ch] text-[15px] leading-8 text-foreground/88">{medication.mechanismOfAction}</p>
                </div>
              </div>

              <div className="grid gap-5 xl:grid-cols-12">
                <PharmacologyBlock
                  title={UI_TEXT.indications}
                  items={medication.indications}
                  icon={medicationPharmacologyBlockIcons.indications}
                  bulletDotClass={pharmacologyVisual.bulletDotClass}
                  className="xl:col-span-7"
                />
                <PharmacologyBlock
                  title={UI_TEXT.contraindications}
                  items={medication.contraindications}
                  icon={medicationPharmacologyBlockIcons.contraindications}
                  bulletDotClass={pharmacologyVisual.bulletDotClass}
                  className="xl:col-span-5"
                />
                <PharmacologyBlock
                  title={UI_TEXT.cautions}
                  items={medication.cautions}
                  icon={medicationPharmacologyBlockIcons.cautions}
                  bulletDotClass={pharmacologyVisual.bulletDotClass}
                  className="xl:col-span-6"
                />
                <PharmacologyBlock
                  title={UI_TEXT.adverseEffects}
                  items={medication.adverseEffects}
                  icon={medicationPharmacologyBlockIcons.adverseEffects}
                  bulletDotClass={pharmacologyVisual.bulletDotClass}
                  className="xl:col-span-6"
                />
                {medication.interactions && medication.interactions.length > 0 ? (
                  <PharmacologyBlock
                    title={UI_TEXT.interactions}
                    items={medication.interactions}
                    icon={medicationPharmacologyBlockIcons.interactions}
                    bulletDotClass={pharmacologyVisual.bulletDotClass}
                    className="xl:col-span-8"
                  />
                ) : null}
                {medication.routes && medication.routes.length > 0 ? (
                  <PharmacologyBlock
                    title={UI_TEXT.routes}
                    items={medication.routes}
                    icon={medicationPharmacologyBlockIcons.routes}
                    bulletDotClass={pharmacologyVisual.bulletDotClass}
                    className="xl:col-span-4"
                  />
                ) : null}
              </div>
            </div>
          </MedicationSectionFrame>

          <MedicationSectionFrame sectionId="clinical-notes" title={UI_TEXT.clinicalNotes} lead={UI_TEXT.clinicalNotesLead}>
            <div className="space-y-8">
              {medication.clinicalStructuredBlocks?.length ? (
                <MedicationStructuredBlocks blocks={medication.clinicalStructuredBlocks} />
              ) : null}
              <div
                className="prose prose-slate max-w-[108ch] text-[15px] leading-8 dark:prose-invert prose-p:my-0 prose-p:leading-8 prose-p:mb-5 prose-strong:text-foreground"
                dangerouslySetInnerHTML={{ __html: medication.clinicalNotesRichText }}
              />
            </div>
          </MedicationSectionFrame>

          {medication.references && medication.references.length > 0 ? (
            <MedicationSectionFrame sectionId="references" title={UI_TEXT.references}>
              <ReferencesList references={medication.references} variant="embedded" />
            </MedicationSectionFrame>
          ) : null}

          {(relatedDiseases.length > 0 || relatedConsensos.length > 0) && (
            <MedicationSectionFrame sectionId="related" title={UI_TEXT.relatedContent} lead={UI_TEXT.relatedLead}>
              <div className="grid gap-8 xl:grid-cols-2">
                {relatedDiseases.length > 0 && (
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      <Stethoscope className="h-4 w-4" />
                      {UI_TEXT.relatedDiseases}
                    </h3>
                    <div className="space-y-3">
                      {relatedDiseases.map((disease) => (
                        <Link
                          key={disease.id}
                          to={`/consulta-vet/doencas/${disease.slug}`}
                          className="group block rounded-[22px] border border-border/80 bg-background/75 px-5 py-4 transition-all hover:border-primary/35 hover:bg-background"
                        >
                          <p className="font-semibold text-foreground transition-colors group-hover:text-primary">{disease.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{disease.category}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {relatedConsensos.length > 0 && (
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      {UI_TEXT.relatedConsensos}
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
                )}
              </div>
            </MedicationSectionFrame>
          )}
        </div>
      </div>

      <div className="hidden w-60 shrink-0 py-8 pr-6 2xl:w-64 2xl:pr-8 xl:block">
        <SectionAnchorNav sections={sections} onActiveChange={handleActiveSectionChange} className="w-60 2xl:w-64" />
      </div>
    </div>
  );
}

