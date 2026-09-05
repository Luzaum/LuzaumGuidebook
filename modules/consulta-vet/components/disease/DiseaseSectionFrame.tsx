import React from 'react';
import { cn } from '../../../../lib/utils';
import { getDiseaseSectionVisual } from '../../utils/diseaseSectionVisual';

interface DiseaseSectionFrameProps {
  sectionId: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Moldura colorida + ícone por seção da ficha de doença (navegação por âncora no sectionId).
 */
export function DiseaseSectionFrame({ sectionId, title, children, className }: DiseaseSectionFrameProps) {
  const v = getDiseaseSectionVisual(sectionId);
  const { Icon } = v;

  return (
    <section id={sectionId} className={cn('scroll-mt-24 overflow-hidden rounded-[22px] border border-border/60 bg-card/30 shadow-sm sm:rounded-[28px]', className)}>
      <div className={cn('flex items-start gap-3 border-b border-border/60 px-4 py-4 sm:gap-4 sm:px-5 md:px-6 md:py-5', v.headerTintClass)}>
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06] sm:h-12 sm:w-12 sm:rounded-2xl',
            v.iconWrapClass
          )}
          aria-hidden
        >
          <Icon className={cn('h-5 w-5 sm:h-6 sm:w-6', v.iconClass)} strokeWidth={2.25} />
        </div>
        <div className="min-w-0 pt-0.5">
          <h2 className={cn('text-lg font-bold leading-snug tracking-tight sm:text-xl md:text-[26px]', v.titleClass)}>{title}</h2>
        </div>
      </div>
      <div className={cn('border-l-2 px-3 py-4 sm:border-l-4 sm:px-5 sm:py-6 md:px-6 md:py-7', v.leftBarClass, v.contentTintClass)}>{children}</div>
    </section>
  );
}
