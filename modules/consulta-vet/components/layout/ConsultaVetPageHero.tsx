import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { ConsultaVetHeroAccent, ConsultaVetSurface, consultaVetEyebrowClass } from './ConsultaVetSurface';

type ConsultaVetPageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  accent?: ConsultaVetHeroAccent;
  aside?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
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
}: ConsultaVetPageHeroProps) {
  return (
    <ConsultaVetSurface accent={accent} className={cn('p-6 md:p-8', className)}>
      <div
        className={cn(
          'flex flex-col gap-6',
          aside ? 'xl:flex-row xl:items-end xl:justify-between' : ''
        )}
      >
        <div className="min-w-0 max-w-3xl space-y-4">
          <div className={consultaVetEyebrowClass(accent)}>
            <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {eyebrow}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
            <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          {description ? (
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">
              {description}
            </p>
          ) : null}
        </div>
        {aside ? <div className="w-full shrink-0 xl:max-w-[420px]">{aside}</div> : null}
      </div>
      {footer ? <div className="mt-8 border-t border-border/50 pt-8">{footer}</div> : null}
    </ConsultaVetSurface>
  );
}
