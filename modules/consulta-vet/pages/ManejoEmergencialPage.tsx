import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Zap } from 'lucide-react';
import { EmergencyGuideListCard } from '../components/emergency/EmergencyGuideListCard';
import { getEmergencyGuideRepository } from '../services/emergencyGuideRepository';
import { EmergencyGuide } from '../types/emergencyGuide';

const UI_TEXT = {
  home: 'Início',
  title: 'Manejo emergencial',
  lead:
    'Cartilhas de consulta rápida com fluxo em páginas: reconhecimento → estabilização → tratamento → monitoramento. Toque em um tópico para seguir o passo a passo.',
  howTitle: 'Como usar',
  howBody:
    'Cada guia tem uma ou mais páginas na ordem recomendada. Use “Anterior / Próximo”, os atalhos do teclado (← →) ou o índice lateral no desktop. Blocos tracejados indicam trechos que serão preenchidos com a versão editorial completa.',
  previewBadge: 'Conteúdo em expansão',
} as const;

export function ManejoEmergencialPage() {
  const repo = useMemo(() => getEmergencyGuideRepository(), []);
  const [guides, setGuides] = useState<EmergencyGuide[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ok = true;
    void repo.list().then(
      (list) => {
        if (ok) setGuides(list);
      },
      () => {
        if (ok) setError('Não foi possível carregar os guias.');
      }
    );
    return () => {
      ok = false;
    };
  }, [repo]);

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-8 p-4 md:p-8">
      <nav className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
        <Link to="/consulta-vet" className="transition-colors hover:text-primary">
          {UI_TEXT.home}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{UI_TEXT.title}</span>
      </nav>

      <header className="relative overflow-hidden rounded-[28px] border border-border/80 bg-card/90 p-6 shadow-sm md:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-amber-500/15 blur-3xl"
        />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-200">
              <Zap className="h-3.5 w-3.5" />
              {UI_TEXT.previewBadge}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{UI_TEXT.title}</h1>
            <p className="mt-3 max-w-[85ch] text-base leading-relaxed text-muted-foreground md:text-lg">{UI_TEXT.lead}</p>
          </div>
        </div>
      </header>

      <section className="rounded-2xl border border-primary/15 bg-primary/[0.04] px-5 py-5 md:px-6">
        <h2 className="text-sm font-bold text-foreground">{UI_TEXT.howTitle}</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">{UI_TEXT.howBody}</p>
      </section>

      {error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-5 py-4 text-sm text-destructive">{error}</div>
      ) : null}

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => (
          <EmergencyGuideListCard key={g.id} guide={g} />
        ))}
      </section>
    </div>
  );
}
