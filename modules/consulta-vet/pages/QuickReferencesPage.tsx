import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, Grid2X2 } from 'lucide-react';
import { ConsultaVetPageHero } from '../components/layout/ConsultaVetPageHero';

type ReferenceApp = {
  id: 'oncologia' | 'vhs' | 'ultrassom';
  name: string;
  to: string;
  iconSrc: string;
};

export const REFERENCE_APPS: ReferenceApp[] = [
  {
    id: 'oncologia',
    name: 'Oncologia',
    to: '/consulta-vet/referencias-rapidas/oncologia',
    iconSrc: '/consulta-vet/reference-apps/oncologia.png',
  },
  {
    id: 'vhs',
    name: 'VHS',
    to: '/consulta-vet/referencias-rapidas/vhs',
    iconSrc: '/consulta-vet/reference-apps/vhs.png',
  },
  {
    id: 'ultrassom',
    name: 'Ultrassom',
    to: '/consulta-vet/referencias-rapidas/ultrassom',
    iconSrc: '/consulta-vet/reference-apps/ultrassom.png',
  },
];

export function QuickReferencesPage() {
  const reduceMotion = useReducedMotion();

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
        <span className="text-foreground">Referências clínicas</span>
      </nav>

      <ConsultaVetPageHero
        title="Referências clínicas"
        description="Abra uma ferramenta clínica para consultar cálculos e valores de referência durante o atendimento."
        icon={Grid2X2}
        accent="cyan"
        compact
      />

      <section aria-labelledby="reference-apps-title" className="rounded-[28px] border border-border/70 bg-card/45 p-4 shadow-sm backdrop-blur-sm sm:p-6">
        <h2 id="reference-apps-title" className="sr-only">
          Mini-apps disponíveis
        </h2>
        <div className="grid grid-cols-5 gap-x-2 gap-y-6 sm:gap-x-5 lg:gap-x-7">
          {REFERENCE_APPS.map((app, index) => (
            <motion.div
              key={app.id}
              initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={reduceMotion ? { duration: 0 } : { delay: index * 0.055, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0"
            >
              <Link
                to={app.to}
                className="group flex min-w-0 flex-col items-center gap-2.5 rounded-2xl px-1 py-2 text-center outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                aria-label={`Abrir mini-app ${app.name}`}
              >
                <span className="relative block aspect-square w-full max-w-[132px] overflow-hidden rounded-[25%] bg-muted shadow-[0_14px_34px_-18px_hsl(var(--foreground)/0.65)] ring-1 ring-white/15 transition duration-300 group-hover:-translate-y-1 group-hover:scale-[1.025] group-hover:shadow-[0_20px_42px_-18px_hsl(var(--primary)/0.55)] group-active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none">
                  <img
                    src={app.iconSrc}
                    alt=""
                    loading="eager"
                    decoding="async"
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/20"
                  />
                </span>
                <span className="line-clamp-2 min-h-[2.5rem] w-full text-[9px] font-bold leading-tight tracking-[-0.015em] text-foreground transition-colors group-hover:text-primary sm:text-sm sm:tracking-normal">
                  {app.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
