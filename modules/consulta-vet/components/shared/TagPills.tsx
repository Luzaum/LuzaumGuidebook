import React from 'react';
import { cn } from '../../../../lib/utils';

interface TagPillsProps {
  tags: string[];
  className?: string;
  /** Quantidade máxima antes de agregar; `all` exibe todas (recomendado na ficha de doença). */
  maxVisible?: number | 'all';
  /** Força exibição estrita em uma única linha (sem quebra de linha / wrap) */
  singleLine?: boolean;
}

export function TagPills({ tags, className, maxVisible = 2, singleLine = false }: TagPillsProps) {
  if (!tags?.length) return null;

  const limit = maxVisible === 'all' ? tags.length : maxVisible;
  const visibleTags = tags.slice(0, limit);
  const hiddenCount = tags.length - visibleTags.length;

  return (
    <div
      className={cn(
        'flex items-center gap-1.5',
        singleLine
          ? 'w-full flex-nowrap overflow-x-auto overflow-y-hidden pb-0.5 [scrollbar-width:thin]'
          : 'flex-wrap',
        className
      )}
    >
      {visibleTags.map((tag) => (
        <span
          key={tag}
          className={cn(
            'inline-flex items-center rounded-md border border-border bg-muted/80 px-2 py-0.5 text-[11px] leading-snug text-muted-foreground',
            singleLine ? 'whitespace-nowrap' : 'max-w-[min(100%,220px)] sm:max-w-none'
          )}
          title={tag}
        >
          {tag}
        </span>
      ))}
      {!singleLine && hiddenCount > 0 && (
        <span
          className="rounded-md border border-dashed border-border/80 bg-muted/50 px-2 py-0.5 text-[11px] text-muted-foreground"
          title={`Mais ${hiddenCount} etiqueta(s): ${tags.slice(limit).join(', ')}`}
        >
          +{hiddenCount} etiquetas
        </span>
      )}
    </div>
  );
}
