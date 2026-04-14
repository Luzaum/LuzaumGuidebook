import React from 'react';
import { AlertTriangle, BookOpen, Cat, ShieldAlert, Trophy } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import {
  EditorialClinicalTable,
  EditorialDiagnosticStep,
  EditorialDrugProtocol,
  EditorialSectionValue,
  EditorialSystemGroup,
} from '../../types/common';
import { translateEditorialSubsectionKey, translateSystemGroupTitle } from '../../utils/editorialSubsectionLabels';
import { sortDiagnosticSubsectionEntries } from '../../utils/editorialSubsectionOrder';
import { type DiseaseSectionVisual, getDiseaseSectionVisual } from '../../utils/diseaseSectionVisual';
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

function ClinicalComparisonTable({ table, visual }: { table: EditorialClinicalTable; visual: DiseaseSectionVisual }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/55 bg-card/30 shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06]">
      <table className="w-full min-w-[52rem] border-collapse text-left text-[13px] leading-snug md:text-[14px] md:leading-relaxed">
        <thead>
          <tr className={cn('border-b border-border/80', visual.headerTintClass)}>
            {table.headers.map((h) => (
              <th
                key={h}
                scope="col"
                className="px-3 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground first:pl-4 last:pr-4 md:px-4"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr
              key={i}
              className={cn(
                'border-b border-border/35 last:border-b-0',
                i % 2 === 0 ? 'bg-background/40' : 'bg-muted/[0.2]'
              )}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    'px-3 py-2.5 align-top text-foreground/90 first:pl-4 last:pr-4 md:px-4',
                    j === 0 && 'font-semibold text-foreground'
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NarrativeText({ value }: { value: string }) {
  return <p className="max-w-[106ch] whitespace-pre-line text-[15px] leading-8 text-foreground/88">{value}</p>;
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
    <div className={cn('space-y-8 border-l-2 pl-5', visual.systemRailClass)}>
      {groups.map((item) => (
        <div key={item.system}>
          <h4 className="text-base font-semibold tracking-tight text-foreground">{translateSystemGroupTitle(item.system)}</h4>
          <div className="mt-3">
            <BulletList items={item.findings} visual={visual} />
          </div>
        </div>
      ))}
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

type SubsectionTone = 'default' | 'warning' | 'danger' | 'teaching' | 'species';

/** Ordem editorial dos blocos longos do tratamento (Cushing) após a timeline de prioridade. */
const TREATMENT_NARRATIVE_AFTER_PRIORITY = [
  'trilostanoNoCao',
  'mitotanoNoCao',
  'cetoconazolNoCao',
  'cirurgiaEspecializada',
  'tratamentoFelino',
  'iatrogenicoManejo',
] as const;

function subsectionToneForKey(key: string): SubsectionTone {
  if (key === 'notaFelinos') return 'species';
  if (key === 'diagnosticPlanIfLimitedResources') return 'warning';
  if (key === 'commonClinicalMistakesExpanded' || key === 'falsePositiveConsiderations' || key === 'falseNegativeConsiderations') {
    return 'danger';
  }
  if (key === 'teachingOverview' || key === 'diagnosticReasoning' || key === 'treatmentReasoning') return 'teaching';
  return 'default';
}

function FlowSubsection({ title, tone, children }: { title: string; tone: SubsectionTone; children: React.ReactNode }) {
  if (tone === 'default') {
    return (
      <div>
        <h4 className="text-base font-semibold tracking-tight text-foreground">{title}</h4>
        <div className="mt-3">{children}</div>
      </div>
    );
  }

  if (tone === 'species') {
    return (
      <div className="rounded-xl border-l-4 border-l-violet-500 bg-violet-500/[0.06] py-3 pl-4 pr-3 dark:border-l-violet-400 dark:bg-violet-400/[0.08]">
        <h4 className="flex items-center gap-2 text-base font-semibold tracking-tight text-violet-950 dark:text-violet-100">
          <Cat className="h-5 w-5 shrink-0 text-violet-600 dark:text-violet-300" aria-hidden />
          {title}
        </h4>
        <div className="mt-3 text-foreground/90">{children}</div>
      </div>
    );
  }

  const accent =
    tone === 'warning'
      ? 'border-l-amber-500/75 bg-amber-500/[0.05]'
      : tone === 'danger'
        ? 'border-l-destructive/75 bg-destructive/[0.05]'
        : 'border-l-primary/75 bg-primary/[0.05]';

  const icon =
    tone === 'warning' ? (
      <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
    ) : tone === 'danger' ? (
      <ShieldAlert className="h-4 w-4 shrink-0 text-destructive" />
    ) : (
      <BookOpen className="h-4 w-4 shrink-0 text-primary" />
    );

  return (
    <div className={cn('rounded-lg border-l-4 py-2 pl-4', accent)}>
      <h4 className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground">
        {icon}
        {title}
      </h4>
      <div className="mt-3">{children}</div>
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
    if (typeof value === 'string') return <NarrativeText value={value} />;
    if (Array.isArray(value) && value.length > 0 && value.every((x) => typeof x === 'string')) {
      return <BulletList items={value as string[]} visual={visual} />;
    }
    return <NarrativeText value={String(value ?? '')} />;
  };

  const pushNarrative = (key: string, blocks: React.ReactNode[]) => {
    const value = obj[key];
    if (value === null || value === undefined) return;
    if (typeof value === 'string' && !value.trim()) return;
    if (Array.isArray(value) && value.length === 0) return;
    blocks.push(
      <FlowSubsection key={key} title={translateEditorialSubsectionKey(key)} tone={subsectionToneForKey(key)}>
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

  return <div className="space-y-10">{blocks}</div>;
}

export function DiseaseSectionRenderer({ id, title, data, className, hideTitle }: DiseaseSectionRendererProps) {
  const visual = getDiseaseSectionVisual(id);

  if (!data || (Array.isArray(data) && data.length === 0)) return null;
  if (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0) return null;

  const useDiagnosticOrder = id === 'diagnostics-unified' || id === 'diagnosis';

  const renderContent = (content: EditorialSectionValue | string | string[] | unknown): React.ReactNode => {
    if (typeof content === 'string') {
      return <NarrativeText value={content} />;
    }

    if (Array.isArray(content)) {
      if (content.length === 0) return null;
      if (isDrugProtocolArray(content)) return <DrugProtocolList protocols={content} />;
      if (isDiagnosticStepArray(content)) return <DiagnosticStepList steps={content} visual={visual} />;
      if (isSystemGroupArray(content)) return <SystemGroupList groups={content} visual={visual} />;
      return <BulletList items={content.filter((item): item is string => typeof item === 'string')} visual={visual} />;
    }

    if (content && typeof content === 'object') {
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
        <div className="space-y-10">
          {entries.map(([key, value]) => {
            const tone = subsectionToneForKey(key);
            return (
              <FlowSubsection key={key} title={translateEditorialSubsectionKey(key)} tone={tone}>
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
