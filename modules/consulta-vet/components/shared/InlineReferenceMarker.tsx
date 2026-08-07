import React from 'react';
import { cn } from '../../../../lib/utils';

type InlineReferenceMarkerProps = {
  index: number;
  citationText: string;
  onClick: () => void;
  tone?: 'default' | 'dark';
};

/**
 * Marcador inline de referência — círculo compacto, legível em texto corrido,
 * alinhado ao badge numérico da seção de referências.
 */
export function InlineReferenceMarker({
  index,
  citationText,
  onClick,
  tone = 'default',
}: InlineReferenceMarkerProps) {
  const label = index + 1;

  return (
    <button
      type="button"
      onClick={onClick}
      title={citationText}
      aria-label={`Ir para referência ${label}`}
      className={cn(
        'group/ref mx-0.5 inline-flex h-[1.375rem] min-w-[1.375rem] shrink-0 translate-y-[-0.08em] items-center justify-center rounded-full border align-middle',
        'cursor-pointer text-[10px] font-semibold tabular-nums leading-none antialiased',
        'transition-[transform,box-shadow,background-color,border-color] duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
        'motion-reduce:transition-none motion-reduce:hover:transform-none',
        'hover:-translate-y-px hover:shadow-[0_2px_8px_rgba(15,23,42,0.08)] active:translate-y-0 active:scale-[0.97]',
        tone === 'dark'
          ? 'border-white/30 bg-white/12 text-white focus-visible:ring-white/35 hover:border-white/45 hover:bg-white/20'
          : 'border-primary/30 bg-primary/[0.08] text-primary focus-visible:ring-primary/30 hover:border-primary/45 hover:bg-primary/[0.14]'
      )}
    >
      <span className="relative z-[1]">{label}</span>
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-[2px] rounded-full opacity-0 transition-opacity duration-200 group-hover/ref:opacity-100',
          tone === 'dark' ? 'bg-white/10' : 'bg-primary/[0.06]'
        )}
      />
    </button>
  );
}
