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
    <section id={sectionId} className={cn('scroll-mt-24 overflow-hidden rounded-[28px] border border-border/60 bg-card/30 shadow-sm', className)}>
      <div className={cn('flex items-start gap-4 border-b border-border/60 px-5 py-4 md:px-6 md:py-5', v.headerTintClass)}>
        <div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06]',
            v.iconWrapClass
          )}
          aria-hidden
        >
          <Icon className={cn('h-6 w-6', v.iconClass)} strokeWidth={2.25} />
        </div>
        <div className="min-w-0 pt-0.5">
          <h2 className={cn('text-xl font-bold tracking-tight md:text-[26px] md:leading-snug', v.titleClass)}>{title}</h2>
          {lead ? <div className="mt-2 max-w-[102ch] text-sm leading-7 text-muted-foreground">{lead}</div> : null}
        </div>
      </div>
      <div className={cn('border-l-4 pl-4 pr-4 py-6 md:pl-6 md:pr-6 md:py-7', v.leftBarClass, v.contentTintClass)}>{children}</div>
    </section>
  );
}
