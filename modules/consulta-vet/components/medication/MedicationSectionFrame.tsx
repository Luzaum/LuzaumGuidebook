import React from 'react';
import { cn } from '../../../../lib/utils';
import { getMedicationSectionVisual } from '../../utils/medicationSectionVisual';

interface MedicationSectionFrameProps {
  sectionId: string;
  title: string;
  lead?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Moldura colorida + ícone por seção da ficha de medicamento (âncoras = sectionId).
 */
export function MedicationSectionFrame({ sectionId, title, lead, children, className }: MedicationSectionFrameProps) {
  const v = getMedicationSectionVisual(sectionId);
  const { Icon } = v;

  return (
    <section id={sectionId} className={cn('consulta-vet-medication-section scroll-mt-24 overflow-hidden rounded-[20px] border border-border/60 bg-card/30 shadow-sm md:rounded-[28px]', className)}>
      <div className={cn('flex items-start gap-3 border-b border-border/60 px-3.5 py-3 md:gap-4 md:px-6 md:py-5', v.headerTintClass)}>
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06] md:h-12 md:w-12 md:rounded-2xl',
            v.iconWrapClass
          )}
          aria-hidden
        >
          <Icon className={cn('h-5 w-5 md:h-6 md:w-6', v.iconClass)} strokeWidth={2.25} />
        </div>
        <div className="min-w-0 pt-0.5">
          <h2 className={cn('text-lg font-bold leading-snug tracking-tight md:text-[26px]', v.titleClass)}>{title}</h2>
          {lead ? <div className="mt-1.5 max-w-[102ch] text-[13px] leading-5 text-muted-foreground md:mt-2 md:text-sm md:leading-7">{lead}</div> : null}
        </div>
      </div>
      <div className={cn('border-l-2 px-3.5 py-4 md:border-l-4 md:px-6 md:py-7', v.leftBarClass, v.contentTintClass)}>{children}</div>
    </section>
  );
}
