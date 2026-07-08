import React, { useEffect, useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { EmergencyGuide, EmergencyGuidePage } from '../../types/emergencyGuide';
import { EMERGENCY_PHASE_LABEL } from './emergencyGuidePhaseLabels';
import { EmergencyGuideBlockRenderer } from './EmergencyGuideBlockRenderer';

function sortPages(pages: EmergencyGuidePage[]): EmergencyGuidePage[] {
  return [...pages].sort((a, b) => a.stepOrder - b.stepOrder);
}

interface EmergencyGuideReaderProps {
  guide: EmergencyGuide;
  className?: string;
}

export function EmergencyGuideReader({ guide, className }: EmergencyGuideReaderProps) {
  const pages = useMemo(() => sortPages(guide.pages), [guide.pages]);
  const [activeId, setActiveId] = useState(() => pages[0]?.id ?? '');

  useEffect(() => {
    if (!pages.length) return;
    setActiveId((prev) => prev || pages[0].id);

    let frame = 0;
    const updateActivePage = () => {
      frame = 0;
      const anchorY = 140;
      const pageRects = pages
        .map((page) => {
          const el = document.getElementById(page.id);
          return el ? { id: page.id, top: el.getBoundingClientRect().top } : null;
        })
        .filter(Boolean) as { id: string; top: number }[];

      const passed = pageRects.filter((item) => item.top <= anchorY);
      const active = passed.at(-1) ?? pageRects.sort((a, b) => Math.abs(a.top - anchorY) - Math.abs(b.top - anchorY))[0];
      if (active?.id) setActiveId(active.id);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActivePage);
    };

    updateActivePage();
    const scrollRoot = document.querySelector('.consulta-vet-main-scroll');
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    scrollRoot?.addEventListener('scroll', requestUpdate, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      scrollRoot?.removeEventListener('scroll', requestUpdate);
    };
  }, [pages]);

  if (!pages.length) return null;

  const current = pages.find((page) => page.id === activeId) ?? pages[0];

  const scrollToPage = (id: string) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={cn('space-y-6', className)}>
      <div className="grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
        <nav className="hidden xl:block">
          <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto pr-1">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Fluxo padrão</p>
            <ol className="space-y-1 border-l-2 border-border/80 pl-3">
              {pages.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => scrollToPage(p.id)}
                    className={cn(
                      'w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                      p.id === current.id
                        ? 'bg-primary/12 font-semibold text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <span className="mr-2 font-mono text-xs opacity-70">{p.stepOrder}.</span>
                    {p.title}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <article className="min-w-0 space-y-6">
          <div className="sticky top-0 z-20 -mx-1 rounded-b-2xl border border-t-0 border-border/70 bg-background/90 px-4 py-2.5 shadow-sm backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">{String(current.stepOrder).padStart(2, '0')}</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span>{EMERGENCY_PHASE_LABEL[current.phase]}</span>
              <span className="hidden text-foreground/80 sm:inline">/ {current.title}</span>
            </div>
          </div>
          {pages.map((page) => (
            <section
              key={page.id}
              id={page.id}
              className="scroll-mt-16 rounded-2xl border border-border/75 bg-background/35 px-4 py-4 transition-[border-color,background-color,box-shadow] duration-300 ease-out md:px-5 md:py-5"
            >
              <header className="mb-5 border-b border-border/70 pb-4">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">{String(page.stepOrder).padStart(2, '0')}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span>{EMERGENCY_PHASE_LABEL[page.phase]}</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-[26px]">{page.title}</h2>
                {page.intro ? <p className="mt-2.5 max-w-[100ch] text-sm leading-6 text-muted-foreground">{page.intro}</p> : null}
              </header>
              <EmergencyGuideBlockRenderer blocks={page.blocks} />
            </section>
          ))}
        </article>
      </div>

      <div className="flex flex-wrap justify-center gap-2 xl:hidden">
        {pages.map((page, i) => (
          <button
            key={page.id}
            type="button"
            aria-label={`Ir para passo ${i + 1}`}
            onClick={() => scrollToPage(page.id)}
            className={cn('h-2.5 w-2.5 rounded-full transition-all', page.id === current.id ? 'w-8 bg-primary' : 'bg-muted-foreground/30')}
          />
        ))}
      </div>
    </div>
  );
}
