import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Grid2X2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { preloadMiniApp } from '../../miniAppLoaders';
import { REFERENCE_APPS } from '../data/referenceApps';
import { ConsultaVetPageHero } from '../components/layout/ConsultaVetPageHero';

export function QuickReferencesPage() {
  return (
    <div className="mx-auto w-full max-w-[1360px] space-y-6 p-4 md:p-8">
      <nav
        className="consulta-vet-breadcrumb flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground"
        aria-label="Navegação estrutural"
      >
        <Link to="/consulta-vet" className="transition-colors hover:text-primary">
          Início
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <span className="text-foreground">Mini-apps</span>
      </nav>

      <ConsultaVetPageHero
        title="Mini-apps"
        description="Acesse os aplicativos clínicos, calculadoras, escores e referências para o atendimento."
        icon={Grid2X2}
        accent="cyan"
        compact
      />

      <section aria-labelledby="reference-apps-title" className="rounded-[28px] border border-border/70 bg-card/45 p-4 shadow-sm backdrop-blur-sm sm:p-6">
        <h2 id="reference-apps-title" className="sr-only">
          Mini-apps disponíveis
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 min-[420px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-x-5 lg:gap-x-7">
          {REFERENCE_APPS.map((app) => {
            const isNeurology = app.id === 'neurologia';
            const isAntibioticotherapy = app.id === 'antibioticoterapia';
            const hasNavyBackground = isAntibioticotherapy || app.id === 'energia-vet';
            const showIconFrame = !isNeurology && !isAntibioticotherapy && app.id !== 'fluidoterapia-vet' && app.id !== 'transfusão-sanguinea';
            return (
              <Link
                key={app.id}
                to={app.to}
                onPointerEnter={() => preloadMiniApp(app.to)}
                onFocus={() => preloadMiniApp(app.to)}
                className="group flex min-w-0 flex-col items-center gap-2.5 rounded-2xl px-1 py-2 text-center outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                aria-label={`Abrir mini-app ${app.name}`}
              >
                <span className={cn(
                  'relative block aspect-square w-full max-w-[132px] overflow-hidden rounded-[25%] transition duration-300 group-hover:-translate-y-1 group-hover:scale-[1.025] group-active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none',
                  !isNeurology && (hasNavyBackground ? 'bg-[#0b1732]' : 'bg-[#05091c]'),
                  showIconFrame && 'shadow-[0_14px_34px_-18px_hsl(var(--foreground)/0.65)] ring-1 ring-white/15 group-hover:shadow-[0_20px_42px_-18px_hsl(var(--primary)/0.55)]',
                )}>
                  <img
                    src={app.iconSrc}
                    alt=""
                    width={264}
                    height={264}
                    decoding="async"
                    draggable={false}
                    className="h-full w-full object-contain"
                  />
                  {showIconFrame && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/20"
                    />
                  )}
                </span>
                <span className="line-clamp-2 min-h-[2.5rem] w-full text-xs font-bold leading-tight tracking-[-0.015em] text-foreground transition-colors group-hover:text-primary sm:text-sm sm:tracking-normal">
                  {app.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
