import React from 'react';
import { ChevronDown, Trophy } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import type { EditorialDiagnosticStep } from '../../types/common';
import type { DiseaseSectionVisual } from '../../utils/diseaseSectionVisual';

export function DiagnosticPathway({ steps, visual }: { steps: EditorialDiagnosticStep[]; visual: DiseaseSectionVisual }) {
  const showLimits = steps.some((step) => step.limitations);

  return (
    <div className="overflow-hidden border border-border/65 bg-background/35">
      <div className="hidden 2xl:block">
        <table className="w-full table-fixed border-collapse text-left" aria-label="Sequência diagnóstica">
          <caption className="sr-only">Exames e decisões organizados na ordem de investigação.</caption>
          <thead>
            <tr className={cn('border-b border-border/70', visual.headerTintClass)}>
              <th scope="col" className="w-16 px-4 py-3 text-center text-xs font-bold text-foreground">Etapa</th>
              <th scope="col" className="w-[27%] px-4 py-3 text-xs font-bold text-foreground">Exame ou decisão</th>
              <th scope="col" className={cn('px-4 py-3 text-xs font-bold text-foreground', showLimits ? 'w-[46%]' : 'w-auto')}>Como usar e interpretar</th>
              {showLimits ? <th scope="col" className="w-[20%] px-4 py-3 text-xs font-bold text-foreground">Limite importante</th> : null}
            </tr>
          </thead>
          <tbody>
            {steps.map((step, index) => (
              <tr key={`${step.title}-${index}`} className="border-b border-border/45 last:border-b-0">
                <td className="px-4 py-4 text-center align-top">
                  <span className={cn('inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold', visual.diagnosticNumBgClass, visual.diagnosticNumTextClass)}>
                    {step.stepNumber || index + 1}
                  </span>
                </td>
                <th scope="row" className="px-4 py-4 align-top text-[14px] font-semibold leading-6 text-foreground">
                  <span className="flex flex-wrap items-center gap-2">
                    {step.title}
                    {step.isGoldStandard ? (
                      <span className="inline-flex items-center gap-1 border border-amber-500/35 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:text-amber-200">
                        <Trophy className="h-3 w-3" aria-hidden /> Referência
                      </span>
                    ) : null}
                  </span>
                  {step.purpose ? <span className="mt-1 block text-[12px] font-normal leading-5 text-muted-foreground">{step.purpose}</span> : null}
                </th>
                <td className="px-4 py-4 align-top text-[14px] leading-6 text-foreground/82">
                  {step.description}
                  {step.interpretation ? <p className="mt-2 font-medium text-foreground">{step.interpretation}</p> : null}
                </td>
                {showLimits ? <td className="px-4 py-4 align-top text-[13px] leading-6 text-muted-foreground">{step.limitations || '—'}</td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ol className="divide-y divide-border/55 2xl:hidden">
        {steps.map((step, index) => (
          <li key={`${step.title}-${index}`}>
            <details className="group px-4 py-3.5">
              <summary className="flex min-h-11 cursor-pointer list-none items-start gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span className={cn('mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold', visual.diagnosticNumBgClass, visual.diagnosticNumTextClass)}>
                  {step.stepNumber || index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2 text-[14px] font-semibold leading-6 text-foreground">
                    {step.title}
                    {step.isGoldStandard ? <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300">REFERÊNCIA</span> : null}
                  </span>
                  {step.purpose ? <span className="mt-0.5 block text-[12px] leading-5 text-muted-foreground">{step.purpose}</span> : null}
                </span>
                <span className="mt-1 flex shrink-0 items-center gap-1 text-[11px] font-semibold text-muted-foreground">
                  <span className="hidden sm:inline">Detalhes</span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" aria-hidden />
                </span>
              </summary>
              <div className="ml-10 mt-3 border-t border-border/50 pt-3 text-[14px] leading-6 text-foreground/82">
                <p>{step.description}</p>
                {step.interpretation ? <p className="mt-2 font-medium text-foreground">{step.interpretation}</p> : null}
                {step.limitations ? (
                  <p className="mt-2 text-[13px] text-muted-foreground"><strong className="text-foreground">Limite:</strong> {step.limitations}</p>
                ) : null}
              </div>
            </details>
          </li>
        ))}
      </ol>
    </div>
  );
}
