import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { ConsultaVetHeroAccent, ConsultaVetSurface, consultaVetEyebrowClass } from './ConsultaVetSurface';

type ConsultaVetPageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  accent?: ConsultaVetHeroAccent;
  aside?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  compact?: boolean;
};

/**
 * Hero padrão das páginas internas (alinhado ao tratamento da home: gradiente, selo, título em destaque).
 */
export function ConsultaVetPageHero({
  eyebrow,
  title,
  description,
  icon: Icon,
  accent = 'primary',
  aside,
  footer,
  className,
  compact = false,
}: ConsultaVetPageHeroProps) {
  return (
    <ConsultaVetSurface
      accent={accent}
      className={cn(compact ? 'p-4 sm:p-5' : 'p-5 sm:p-6 md:p-7', className)}
    >
      <div
        className={cn(
          'flex flex-col',
          compact ? 'gap-3.5' : 'gap-5',
          aside ? cn('xl:flex-row xl:justify-between', compact ? 'xl:items-center' : 'xl:items-end') : ''
        )}
      >
        <div className={cn('min-w-0', compact ? 'max-w-2xl space-y-1.5' : 'max-w-3xl space-y-2.5')}>
          {eyebrow ? (
            <div className={consultaVetEyebrowClass(accent)}>
              <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {eyebrow}
            </div>
          ) : null}
          <h1
            className={cn(
              'font-extrabold tracking-tight text-foreground',
              compact
                ? 'text-xl sm:text-2xl lg:text-[1.75rem] lg:leading-snug'
                : 'text-2xl sm:text-3xl lg:text-[2.25rem] lg:leading-tight'
            )}
          >
            <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          {description ? (
            <p
              className={cn(
                'max-w-2xl text-muted-foreground',
                compact ? 'text-xs leading-relaxed sm:text-sm' : 'text-sm leading-relaxed sm:text-[15px]'
              )}
            >
              {description}
            </p>
          ) : null}
        </div>
        {aside ? (
          <div className={cn('w-full shrink-0', compact ? 'xl:max-w-sm' : 'xl:max-w-[420px]')}>{aside}</div>
        ) : null}
      </div>
      {footer ? (
        <div className={cn('border-t border-border/50', compact ? 'mt-4 pt-4' : 'mt-6 pt-6')}>{footer}</div>
      ) : null}
    </ConsultaVetSurface>
  );
}
