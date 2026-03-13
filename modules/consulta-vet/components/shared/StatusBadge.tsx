import React from 'react';
import { cn } from '../../../../lib/utils';

interface StatusBadgeProps {
  isPublished?: boolean;
  className?: string;
}

export function StatusBadge({ isPublished = true, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]',
        isPublished
          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
          : 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400',
        className
      )}
    >
      {isPublished ? 'Publicado' : 'Rascunho'}
    </span>
  );
}
