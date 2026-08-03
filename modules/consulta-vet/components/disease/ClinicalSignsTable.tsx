import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import type { EditorialClinicalFinding, EditorialSystemGroup } from '../../types/common';
import { translateSystemGroupTitle } from '../../utils/editorialSubsectionLabels';
import type { DiseaseSectionVisual } from '../../utils/diseaseSectionVisual';

type NormalizedFinding = EditorialClinicalFinding & { system: string };

const PRIORITY_LABELS: Partial<Record<NonNullable<EditorialClinicalFinding['priority']>, string>> = {
  common: 'Comum',
  'heart-failure': 'Insuficiência cardíaca',
  'low-output': 'Baixo débito',
  arrhythmia: 'Arritmia',
  systemic: 'Sistêmico',
  uncommon: 'Menos frequente',
  emergency: 'Emergência',
};

function splitLegacyFinding(value: string): EditorialClinicalFinding {
  const separator = value.match(/:\s+|\s+[\u2013\u2014-]\s+/);
  if (separator?.index === undefined || separator.index <= 0 || separator.index > 220) {
    return { finding: value, mechanism: '' };
  }

  return {
    finding: value.slice(0, separator.index).trim(),
    mechanism: value.slice(separator.index + separator[0].length).trim(),
  };
}

function normalizeGroups(groups: EditorialSystemGroup[]): NormalizedFinding[] {
  return groups.flatMap((group) =>
    group.findings.map((finding) => ({
      ...(typeof finding === 'string' ? splitLegacyFinding(finding) : finding),
      system: group.system,
    }))
  );
}

function ContextBadges({ values }: { values?: string[] }) {
  if (!values?.length) return null;
  return (
    <span className="mt-2 flex flex-wrap gap-1.5">
      {values.map((value) => (
        <span key={value} className="border border-border/70 bg-muted/35 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
          {value}
        </span>
      ))}
    </span>
  );
}

function MobileFindingSummary({ item, visual, expandable }: { item: NormalizedFinding; visual: DiseaseSectionVisual; expandable: boolean }) {
  return (
    <>
      <span className="min-w-0 flex-1">
        <span className={cn('block text-[11px] font-bold uppercase', visual.titleClass)}>
          {translateSystemGroupTitle(item.system)}
        </span>
        <span className="mt-1 block text-[14px] font-semibold leading-6 text-foreground">{item.finding}</span>
        {item.clinicalMeaning ? (
          <span className="mt-1 block text-[12px] leading-5 text-muted-foreground">{item.clinicalMeaning}</span>
        ) : null}
      </span>
      {expandable ? (
        <span className="mt-1 flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
          <span className="hidden sm:inline">Mecanismo</span>
          <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" aria-hidden />
        </span>
      ) : null}
    </>
  );
}

export function ClinicalSignsTable({ groups, visual }: { groups: EditorialSystemGroup[]; visual: DiseaseSectionVisual }) {
  const findings = normalizeGroups(groups);
  const showClinicalMeaning = findings.some((item) => item.clinicalMeaning);

  return (
    <div className="overflow-hidden border border-border/65 bg-background/35">
      <div className="hidden 2xl:block">
        <table className="w-full table-fixed border-collapse text-left" aria-label="Sinais clínicos e explicação fisiopatológica">
          <caption className="sr-only">Sinais clínicos organizados por sistema, mecanismo e relevância clínica.</caption>
          <thead>
            <tr className={cn('border-b border-border/70', visual.headerTintClass)}>
              <th scope="col" className="w-[17%] px-4 py-3 text-xs font-bold text-foreground">Sistema</th>
              <th scope="col" className="w-[28%] px-4 py-3 text-xs font-bold text-foreground">O que observar</th>
              <th scope="col" className={cn('px-4 py-3 text-xs font-bold text-foreground', showClinicalMeaning ? 'w-[33%]' : 'w-[55%]')}>
                Por que acontece
              </th>
              {showClinicalMeaning ? (
                <th scope="col" className="w-[22%] px-4 py-3 text-xs font-bold text-foreground">O que sugere</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {findings.map((item, index) => {
              const previousSystem = findings[index - 1]?.system;
              const startsSystem = previousSystem !== item.system;
              return (
                <tr key={`${item.system}-${item.finding}-${index}`} className="border-b border-border/45 last:border-b-0">
                  <th scope="row" className="px-4 py-3.5 align-top text-[13px] font-semibold text-foreground">
                    {startsSystem ? (
                      <span className="flex items-center gap-2">
                        <span className={cn('h-2 w-2 shrink-0 rounded-full', visual.bulletDotClass)} aria-hidden />
                        {translateSystemGroupTitle(item.system)}
                      </span>
                    ) : (
                      <span className="sr-only">{translateSystemGroupTitle(item.system)}</span>
                    )}
                  </th>
                  <td className="px-4 py-3.5 align-top text-[14px] font-medium leading-6 text-foreground">
                    {item.finding}
                    <ContextBadges values={item.context} />
                  </td>
                  <td className="px-4 py-3.5 align-top text-[14px] leading-6 text-foreground/80">{item.mechanism || '—'}</td>
                  {showClinicalMeaning ? (
                    <td className="px-4 py-3.5 align-top text-[13px] leading-6 text-foreground/80">
                      {item.clinicalMeaning || '—'}
                      {item.priority ? (
                        <span className="mt-2 block w-fit border border-border/65 bg-muted/35 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                          {PRIORITY_LABELS[item.priority]}
                        </span>
                      ) : null}
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-border/55 2xl:hidden">
        {findings.map((item, index) => {
          const key = `${item.system}-${item.finding}-${index}`;
          if (!item.mechanism) {
            return (
              <div key={key} className="flex min-h-11 items-start gap-3 px-4 py-3.5">
                <MobileFindingSummary item={item} visual={visual} expandable={false} />
              </div>
            );
          }
          return (
            <details key={key} className="group px-4 py-3.5">
              <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <MobileFindingSummary item={item} visual={visual} expandable />
              </summary>
              <div className="mt-3 border-t border-border/50 pt-3">
                <p className="text-[11px] font-bold uppercase text-muted-foreground">Entender o mecanismo</p>
                <p className="mt-1 text-[14px] leading-6 text-foreground/82">{item.mechanism}</p>
                <ContextBadges values={item.context} />
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
