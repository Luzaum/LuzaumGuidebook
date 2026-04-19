import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  AlertTriangle,
  Apple,
  BookOpen,
  Brain,
  Cat,
  Dog,
  Dumbbell,
  Droplets,
  Eye,
  Flame,
  HeartPulse,
  LayoutGrid,
  Lightbulb,
  Shield,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Trophy,
  Wind,
} from 'lucide-react';
import { cn } from '../../../../lib/utils';
import {
  EditorialClinicalFigure,
  EditorialClinicalTable,
  EditorialDiagnosticStep,
  EditorialDrugProtocol,
  EditorialSectionValue,
  EditorialSystemGroup,
} from '../../types/common';
import { getEditorialSubsectionIcon } from '../../utils/editorialSubsectionIcons';
import { translateEditorialSubsectionKey, translateSystemGroupTitle } from '../../utils/editorialSubsectionLabels';
import { sortDiagnosticSubsectionEntries } from '../../utils/editorialSubsectionOrder';
import { type DiseaseSectionVisual, getDiseaseSectionVisual } from '../../utils/diseaseSectionVisual';
import { EditorialClinicalTableBlock } from '../editorial/EditorialClinicalTableBlock';
import { TreatmentMonitoringPanel, TreatmentPriorityPanel } from './TreatmentSectionVisual';

interface DiseaseSectionRendererProps {
  id: string;
  title: string;
  data: EditorialSectionValue;
  className?: string;
  /** Título exibido no DiseaseSectionFrame; aqui omite o h3 duplicado */
  hideTitle?: boolean;
}

function isSystemGroupArray(value: unknown): value is EditorialSystemGroup[] {
  return Array.isArray(value) && value.length > 0 && value.every((item) => item && typeof item === 'object' && 'system' in item && 'findings' in item);
}

function isDrugProtocolArray(value: unknown): value is EditorialDrugProtocol[] {
  return Array.isArray(value) && value.length > 0 && value.every((item) => item && typeof item === 'object' && 'drug' in item);
}

function isDiagnosticStepArray(value: unknown): value is EditorialDiagnosticStep[] {
  return Array.isArray(value) && value.length > 0 && value.every((item) => item && typeof item === 'object' && 'title' in item && 'description' in item);
}

function isClinicalTable(value: unknown): value is EditorialClinicalTable {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  if (v.kind !== 'clinicalTable') return false;
  if (!Array.isArray(v.headers) || v.headers.length === 0 || !v.headers.every((h) => typeof h === 'string')) return false;
  if (!Array.isArray(v.rows) || v.rows.length === 0) return false;
  const n = v.headers.length;
  return v.rows.every((row) => Array.isArray(row) && row.length === n && row.every((cell) => typeof cell === 'string'));
}

function isClinicalFigure(value: unknown): value is EditorialClinicalFigure {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  return v.kind === 'clinicalFigure' && typeof v.src === 'string' && v.src.length > 0 && typeof v.alt === 'string' && v.alt.length > 0;
}

function ClinicalFigureBlock({ figure }: { figure: EditorialClinicalFigure }) {
  return (
    <figure className="space-y-3">
      <div className="overflow-x-auto rounded-xl border border-border/55 bg-muted/20 p-2 shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06] md:p-3">
        <img
          src={figure.src}
          alt={figure.alt}
          loading="lazy"
          className="mx-auto h-auto w-full max-w-5xl rounded-lg"
        />
      </div>
      {figure.caption ? (
        <figcaption className="text-center text-sm leading-relaxed text-muted-foreground">{figure.caption}</figcaption>
      ) : null}
    </figure>
  );
}

function ClinicalComparisonTable({ table, visual }: { table: EditorialClinicalTable; visual: DiseaseSectionVisual }) {
  return <EditorialClinicalTableBlock table={table} headerTintClass={visual.headerTintClass} />;
}

function systemTopicIcon(system: string): LucideIcon {
  const s = system.toLowerCase();
  if (s.includes('cardio')) return HeartPulse;
  if (s.includes('respir') || s.includes('pulmon') || s.includes('thorac')) return Wind;
  if (s.includes('renal') || s.includes('urinar')) return Droplets;
  if (s.includes('neuro')) return Brain;
  if (s.includes('ocular') || s.includes('ophthalm')) return Eye;
  if (s.includes('hepat')) return Activity;
  if (s.includes('hemat') || s.includes('lymph')) return Droplets;
  if (s.includes('dermat')) return Sparkles;
  if (s.includes('immun') || s.includes('imune')) return Shield;
  if (s.includes('gastro') || s.includes('oral')) return Apple;
  if (s.includes('metabol')) return Flame;
  if (s.includes('musculo') || s.includes('orthop')) return Dumbbell;
  if (s.includes('multi')) return LayoutGrid;
  if (s.includes('behavior')) return Brain;
  return Stethoscope;
}

const BULLET_LINE_RE = /^\s*[-•*]\s+/;
const NUMBERED_LINE_RE = /^\s*\d+[\).]\s+/;

/**
 * Quebra narrativas longas em blocos visuais: parágrafos, listas automáticas e callouts de “Dica de estudo”.
 */
function StructuredNarrative({ value, visual }: { value: string; visual: DiseaseSectionVisual }) {
  const blocks = value
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="max-w-[106ch] space-y-4">
      {blocks.map((block, i) => {
        if (/^Dica de estudo:/i.test(block)) {
          const body = block.replace(/^Dica de estudo:\s*/i, '').trim();
          return (
            <aside
              key={i}
              className="flex gap-3 rounded-2xl border border-amber-500/35 bg-gradient-to-br from-amber-500/[0.09] to-amber-500/[0.03] px-4 py-3.5 shadow-sm dark:from-amber-500/15 dark:to-amber-500/5"
            >
              <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden />
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-800 dark:text-amber-200">Dica de estudo</p>
                <p className="mt-1.5 whitespace-pre-line text-[15px] leading-relaxed text-foreground/90">{body}</p>
              </div>
            </aside>
          );
        }

        const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
        if (lines.length >= 2 && lines.every((l) => BULLET_LINE_RE.test(l))) {
          const items = lines.map((l) => l.replace(BULLET_LINE_RE, ''));
          return <BulletList key={i} items={items} visual={visual} />;
        }
        if (lines.length >= 2 && lines.every((l) => NUMBERED_LINE_RE.test(l))) {
          const items = lines.map((l) => l.replace(NUMBERED_LINE_RE, ''));
          return (
            <ol key={i} className="space-y-2.5">
              {items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-[15px] leading-7 text-foreground/86">
                  <span
                    className={cn(
                      'mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold shadow-sm ring-1 ring-black/[0.05] dark:ring-white/[0.08]',
                      visual.diagnosticNumBgClass,
                      visual.diagnosticNumTextClass
                    )}
                  >
                    {j + 1}
                  </span>
                  <span className="min-w-0 pt-0.5">{item}</span>
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p key={i} className="text-[15px] leading-8 text-foreground/88 [text-wrap:pretty]">
            {block}
          </p>
        );
      })}
    </div>
  );
}

function BulletList({ items, visual }: { items: string[]; visual: DiseaseSectionVisual }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] leading-7 text-foreground/86">
          <span className={cn('mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full', visual.bulletDotClass)} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SystemGroupList({ groups, visual }: { groups: EditorialSystemGroup[]; visual: DiseaseSectionVisual }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {groups.map((item) => {
        const SysIcon = systemTopicIcon(item.system);
        return (
          <div
            key={item.system}
            className="rounded-2xl border border-border/55 bg-card/45 p-4 shadow-sm ring-1 ring-black/[0.04] dark:bg-card/35 dark:ring-white/[0.06] md:p-5"
          >
            <div className="flex items-start gap-3 border-b border-border/45 pb-3">
              <span
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06]',
                  visual.iconWrapClass
                )}
                aria-hidden
              >
                <SysIcon className={cn('h-5 w-5', visual.iconClass)} strokeWidth={2} />
              </span>
              <div className="min-w-0 pt-0.5">
                <h4 className="text-base font-semibold tracking-tight text-foreground">{translateSystemGroupTitle(item.system)}</h4>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Sinais correlacionados</p>
              </div>
            </div>
            <div className="mt-3">
              <BulletList items={item.findings} visual={visual} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function isLimitedResourceStep(step: EditorialDiagnosticStep): boolean {
  const t = `${step.title} ${step.description}`.toLowerCase();
  return t.includes('recurso') && (t.includes('limitad') || t.includes('mínim') || t.includes('minim'));
}

function DiagnosticStepList({ steps, visual }: { steps: EditorialDiagnosticStep[]; visual: DiseaseSectionVisual }) {
  return (
    <ol className="space-y-0">
      {steps.map((step, index) => {
        const limited = isLimitedResourceStep(step);
        const num = step.stepNumber || index + 1;
        const isLast = index === steps.length - 1;
        return (
          <li key={`${step.title}-${index}`} className="flex items-stretch gap-4 md:gap-5">
            <div className="flex w-11 shrink-0 flex-col items-center md:w-12">
              <span
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-sm ring-1 ring-black/[0.06] dark:ring-white/[0.08] md:h-10 md:w-10 md:text-sm',
                  visual.diagnosticNumBgClass,
                  visual.diagnosticNumTextClass
                )}
              >
                {num}
              </span>
              {!isLast ? (
                <div
                  className="mt-2 w-px flex-1 min-h-[1.5rem] bg-gradient-to-b from-border via-border/70 to-border/25"
                  aria-hidden
                />
              ) : null}
            </div>
            <div className={cn('min-w-0 flex-1', !isLast && 'pb-8')}>
              <div
                className={cn(
                  'rounded-xl border border-border/50 bg-card/50 p-4 shadow-sm md:p-5',
                  limited ? 'border-amber-500/30 bg-amber-500/[0.06] dark:bg-amber-500/[0.08]' : ''
                )}
              >
                <div className="flex flex-wrap items-start gap-x-2 gap-y-2">
                  <h4 className="text-base font-semibold tracking-tight text-foreground">{step.title}</h4>
                  {step.isGoldStandard ? (
                    <span
                      className="inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-400/20 to-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900 shadow-sm dark:from-amber-400/25 dark:to-amber-500/20 dark:text-amber-100"
                      title="Padrão ouro"
                    >
                      <Trophy className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" aria-hidden />
                      Padrão ouro
                    </span>
                  ) : null}
                  {limited ? (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-600/30 bg-amber-600/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-100">
                      Recursos limitados
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 max-w-[98ch] text-[15px] leading-relaxed text-foreground/88 md:leading-8">{step.description}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function DrugProtocolList({ protocols }: { protocols: EditorialDrugProtocol[] }) {
  return (
    <div className="space-y-6">
      {protocols.map((protocol, index) => (
        <div
          key={`${protocol.drug}-${index}`}
          className="rounded-xl border border-border/80 bg-muted/[0.06] px-5 py-4"
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_repeat(4,minmax(0,0.7fr))]">
            <div>
              <h4 className="text-base font-semibold text-foreground">{protocol.drug}</h4>
              {protocol.indication ? <p className="mt-1 text-sm leading-7 text-muted-foreground">{protocol.indication}</p> : null}
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Dose</p>
              <p className="mt-1.5 text-sm leading-7 text-foreground">{protocol.dose || '—'}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Frequência</p>
              <p className="mt-1.5 text-sm leading-7 text-foreground">{protocol.frequency || '—'}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Via</p>
              <p className="mt-1.5 text-sm leading-7 text-foreground">{protocol.route || '—'}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Duração</p>
              <p className="mt-1.5 text-sm leading-7 text-foreground">{protocol.duration || '—'}</p>
            </div>
          </div>

          {(protocol.notes || protocol.cautions || protocol.contraindications) ? (
            <div className="mt-4 grid gap-4 border-t border-border/60 pt-4 lg:grid-cols-3">
              {protocol.notes ? (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Observações</p>
                  <p className="mt-1.5 text-sm leading-7 text-muted-foreground">{protocol.notes}</p>
                </div>
              ) : null}
              {protocol.cautions ? (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">Cautelas</p>
                  <p className="mt-1.5 text-sm leading-7 text-foreground/85">{protocol.cautions}</p>
                </div>
              ) : null}
              {protocol.contraindications ? (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-destructive">Contraindicações</p>
                  <p className="mt-1.5 text-sm leading-7 text-foreground/85">{protocol.contraindications}</p>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

type SubsectionTone = 'default' | 'warning' | 'danger' | 'teaching' | 'species' | 'speciesDog';

/** Ordem editorial dos blocos longos do tratamento após a timeline de prioridade (Cushing, DRC, etc.). */
const TREATMENT_NARRATIVE_AFTER_PRIORITY = [
  'trilostanoNoCao',
  'mitotanoNoCao',
  'cetoconazolNoCao',
  'cirurgiaEspecializada',
  'tratamentoFelino',
  'iatrogenicoManejo',
  'drcAlertaEstadiamentoInstavel',
  'drcDietaRenal',
  'drcMetasFosforoIRIS',
  'drcFosforoQuelantes',
  'drcProteinuriaRaas',
  'drcHipertensao',
  'drcSintomasUremicos',
  'drcHipocalemiaAcidose',
  'drcAnemia',
  'drcSuplementacaoFerro',
  'drcFluidoterapiaSc',
  'drcNutricaoAssistida',
  'drcCalcitriol',
  'drcUtiOculta',
  'drcTabelaPrognosticoFelino',
  'notaFelinos',
  'notaCaninos',
  /* DMVD — ordem editorial do detalhamento terapêutico (só rende se a chave existir no registo) */
  'farmacos',
  'dmvdPimobendanFormaJeJumMarcas',
  'dmvdFurosemidaAgudaCronicaTorasemida',
  'dmvdUrgenciaHospitalarVasodilatadoresInotropicos',
  'dmvdIsosorbidaVasodilatadorOral',
  'dmvdEspironolactonaBloqueioNefron',
  'dmvdIecaBenazeprilEnalapril',
  'dmvdAnlodipinoHipertensao',
] as const;

function subsectionToneForKey(key: string): SubsectionTone {
  if (key === 'notaFelinos') return 'species';
  if (key === 'notaCaninos') return 'speciesDog';
  if (key === 'drcAlertaEstadiamentoInstavel' || key === 'drcAlertaEstadiamentoIRIS') return 'warning';
  if (key === 'hemoTabelaDoxiciclinaGatoAlerta') return 'warning';
  if (key === 'diagnosticPlanIfLimitedResources') return 'warning';
  if (key === 'commonClinicalMistakesExpanded' || key === 'falsePositiveConsiderations' || key === 'falseNegativeConsiderations') {
    return 'danger';
  }
  if (key === 'teachingOverview' || key === 'diagnosticReasoning' || key === 'treatmentReasoning') return 'teaching';
  if (key === 'dmvdPimobendanFormaJeJumMarcas' || key === 'dmvdUrgenciaHospitalarVasodilatadoresInotropicos') return 'warning';
  return 'default';
}

function FlowSubsection({
  title,
  tone,
  children,
  subsectionKey,
  visual,
}: {
  title: string;
  tone: SubsectionTone;
  children: React.ReactNode;
  subsectionKey?: string;
  visual?: DiseaseSectionVisual;
}) {
  const TopicGlyph =
    subsectionKey && tone !== 'species' && tone !== 'speciesDog'
      ? getEditorialSubsectionIcon(subsectionKey)
      : undefined;

  if (tone === 'default') {
    return (
      <div className="rounded-2xl border border-border/55 bg-background/70 p-4 shadow-md ring-1 ring-black/[0.04] dark:bg-background/45 dark:ring-white/[0.07] md:p-5">
        <h4 className="flex items-center gap-3 text-base font-semibold tracking-tight text-foreground">
          {TopicGlyph && visual ? (
            <span
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06]',
                visual.iconWrapClass
              )}
              aria-hidden
            >
              <TopicGlyph className={cn('h-5 w-5', visual.iconClass)} strokeWidth={2} />
            </span>
          ) : TopicGlyph ? (
            <TopicGlyph className="h-5 w-5 shrink-0 text-muted-foreground opacity-90" strokeWidth={2} aria-hidden />
          ) : null}
          <span className="min-w-0 leading-snug">{title}</span>
        </h4>
        <div className="mt-4 border-t border-border/50 pt-4">{children}</div>
      </div>
    );
  }

  if (tone === 'species') {
    return (
      <div className="rounded-2xl border border-violet-500/25 border-l-4 border-l-violet-500 bg-violet-500/[0.06] p-4 shadow-sm dark:border-l-violet-400 dark:bg-violet-400/[0.09] md:p-5">
        <h4 className="flex items-center gap-3 text-base font-semibold tracking-tight text-violet-950 dark:text-violet-100">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 dark:bg-violet-400/25" aria-hidden>
            <Cat className="h-5 w-5 text-violet-600 dark:text-violet-300" />
          </span>
          {title}
        </h4>
        <div className="mt-4 border-t border-violet-500/20 pt-4 text-foreground/90 dark:border-violet-400/20">{children}</div>
      </div>
    );
  }

  if (tone === 'speciesDog') {
    return (
      <div className="rounded-2xl border border-sky-500/25 border-l-4 border-l-sky-600 bg-sky-500/[0.06] p-4 shadow-sm dark:border-l-sky-400 dark:bg-sky-400/[0.09] md:p-5">
        <h4 className="flex items-center gap-3 text-base font-semibold tracking-tight text-sky-950 dark:text-sky-100">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/20 dark:bg-sky-400/25" aria-hidden>
            <Dog className="h-5 w-5 text-sky-700 dark:text-sky-300" />
          </span>
          {title}
        </h4>
        <div className="mt-4 border-t border-sky-500/20 pt-4 text-foreground/90 dark:border-sky-400/20">{children}</div>
      </div>
    );
  }

  const shell =
    tone === 'warning'
      ? 'border-amber-500/30 border-l-amber-500 bg-amber-500/[0.06] dark:bg-amber-500/[0.08]'
      : tone === 'danger'
        ? 'border-destructive/30 border-l-destructive bg-destructive/[0.06]'
        : 'border-primary/25 border-l-primary bg-primary/[0.04] dark:bg-primary/[0.07]';

  const ToneIcon =
    tone === 'warning' ? AlertTriangle : tone === 'danger' ? ShieldAlert : BookOpen;
  const LeadIcon = TopicGlyph ?? ToneIcon;
  const leadIconClass =
    TopicGlyph != null && visual
      ? cn('h-5 w-5', visual.iconClass)
      : TopicGlyph != null
        ? 'h-5 w-5 shrink-0 text-muted-foreground opacity-90'
        : tone === 'warning'
          ? 'h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400'
          : tone === 'danger'
            ? 'h-5 w-5 shrink-0 text-destructive'
            : 'h-5 w-5 shrink-0 text-primary';

  return (
    <div className={cn('rounded-2xl border border-l-4 p-4 shadow-md ring-1 ring-black/[0.03] dark:ring-white/[0.06] md:p-5', shell)}>
      <h4 className="flex items-center gap-3 text-base font-semibold tracking-tight text-foreground">
        {TopicGlyph && visual ? (
          <span
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-black/[0.05] dark:ring-white/[0.08]',
              visual.iconWrapClass
            )}
            aria-hidden
          >
            <LeadIcon className={leadIconClass} strokeWidth={2} />
          </span>
        ) : (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/50 ring-1 ring-border/60" aria-hidden>
            <LeadIcon className={leadIconClass} strokeWidth={2} />
          </span>
        )}
        <span className="min-w-0 leading-snug">{title}</span>
      </h4>
      <div className="mt-4 border-t border-border/40 pt-4">{children}</div>
    </div>
  );
}

function tryRenderTreatmentRichObject(
  obj: Record<string, unknown>,
  visual: DiseaseSectionVisual
): React.ReactNode | null {
  const ordem = Array.isArray(obj.ordemDePrioridade)
    ? (obj.ordemDePrioridade as string[]).map((s) => String(s).trim()).filter(Boolean)
    : [];
  const monitor = Array.isArray(obj.monitoramento)
    ? (obj.monitoramento as string[]).map((s) => String(s).trim()).filter(Boolean)
    : [];
  if (ordem.length === 0 && monitor.length === 0) return null;

  const renderLeaf = (value: unknown): React.ReactNode => {
    if (typeof value === 'string') return <StructuredNarrative value={value} visual={visual} />;
    if (isClinicalFigure(value)) {
      return <ClinicalFigureBlock figure={value as EditorialClinicalFigure} />;
    }
    if (isClinicalTable(value)) {
      return <ClinicalComparisonTable table={value as EditorialClinicalTable} visual={visual} />;
    }
    if (Array.isArray(value) && value.length > 0) {
      if (value.every((x) => typeof x === 'string')) {
        return <BulletList items={value as string[]} visual={visual} />;
      }
      if (isDrugProtocolArray(value)) {
        return <DrugProtocolList protocols={value as EditorialDrugProtocol[]} />;
      }
    }
    return <StructuredNarrative value={String(value ?? '')} visual={visual} />;
  };

  const pushNarrative = (key: string, blocks: React.ReactNode[]) => {
    const value = obj[key];
    if (value === null || value === undefined) return;
    if (typeof value === 'string' && !value.trim()) return;
    if (Array.isArray(value) && value.length === 0) return;
    blocks.push(
      <FlowSubsection
        key={key}
        title={translateEditorialSubsectionKey(key)}
        tone={subsectionToneForKey(key)}
        subsectionKey={key}
        visual={visual}
      >
        {renderLeaf(value)}
      </FlowSubsection>
    );
  };

  const blocks: React.ReactNode[] = [];

  if (obj.decisaoInicial) pushNarrative('decisaoInicial', blocks);

  if (ordem.length > 0) {
    blocks.push(<TreatmentPriorityPanel key="ordem" items={ordem} visual={visual} />);
  }

  for (const key of TREATMENT_NARRATIVE_AFTER_PRIORITY) {
    if (obj[key]) pushNarrative(key, blocks);
  }

  const handled = new Set<string>([
    'ordemDePrioridade',
    'monitoramento',
    'decisaoInicial',
    'prognosticoResumo',
    ...TREATMENT_NARRATIVE_AFTER_PRIORITY,
  ]);
  const extras = Object.keys(obj)
    .filter((k) => !handled.has(k))
    .sort((a, b) => a.localeCompare(b, 'pt'));
  for (const key of extras) {
    if (obj[key]) pushNarrative(key, blocks);
  }

  if (monitor.length > 0) {
    blocks.push(<TreatmentMonitoringPanel key="monitor" items={monitor} visual={visual} />);
  }

  if (obj.prognosticoResumo) pushNarrative('prognosticoResumo', blocks);

  return <div className="space-y-8 md:space-y-10">{blocks}</div>;
}

export function DiseaseSectionRenderer({ id, title, data, className, hideTitle }: DiseaseSectionRendererProps) {
  const visual = getDiseaseSectionVisual(id);

  if (!data || (Array.isArray(data) && data.length === 0)) return null;
  if (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0) return null;

  const useDiagnosticOrder = id === 'diagnostics-unified' || id === 'diagnosis';

  const renderContent = (content: EditorialSectionValue | string | string[] | unknown): React.ReactNode => {
    if (typeof content === 'string') {
      return <StructuredNarrative value={content} visual={visual} />;
    }

    if (Array.isArray(content)) {
      if (content.length === 0) return null;
      if (isDrugProtocolArray(content)) return <DrugProtocolList protocols={content} />;
      if (isDiagnosticStepArray(content)) return <DiagnosticStepList steps={content} visual={visual} />;
      if (isSystemGroupArray(content)) return <SystemGroupList groups={content} visual={visual} />;
      return <BulletList items={content.filter((item): item is string => typeof item === 'string')} visual={visual} />;
    }

    if (content && typeof content === 'object') {
      if (isClinicalFigure(content)) {
        return <ClinicalFigureBlock figure={content} />;
      }
      if (isClinicalTable(content)) {
        return <ClinicalComparisonTable table={content} visual={visual} />;
      }

      if (id === 'treatment') {
        const rich = tryRenderTreatmentRichObject(content as Record<string, unknown>, visual);
        if (rich !== null) return rich;
      }

      let entries = Object.entries(content).filter(([, value]) => {
        if (value === null || value === undefined) return false;
        if (Array.isArray(value) && value.length === 0) return false;
        return true;
      });

      if (useDiagnosticOrder) {
        entries = sortDiagnosticSubsectionEntries(entries);
      }

      return (
        <div className="space-y-8 md:space-y-10">
          {entries.map(([key, value]) => {
            const tone = subsectionToneForKey(key);
            return (
              <FlowSubsection
                key={key}
                title={translateEditorialSubsectionKey(key)}
                tone={tone}
                subsectionKey={key}
                visual={visual}
              >
                {renderContent(value as EditorialSectionValue)}
              </FlowSubsection>
            );
          })}
        </div>
      );
    }

    return null;
  };

  if (hideTitle) {
    return <div className={cn('max-w-none', className)}>{renderContent(data)}</div>;
  }

  return (
    <section id={id} className={cn('scroll-mt-24', className)}>
      <div className="mb-6 border-b border-border/70 pb-4">
        <h3 className="text-[22px] font-bold tracking-tight text-foreground md:text-[24px]">{title}</h3>
      </div>
      <div className="max-w-none">{renderContent(data)}</div>
    </section>
  );
}
