import React, { useEffect, useState } from 'react';
import { ChevronDown, ListTree } from 'lucide-react';
import { cn } from '../../../../lib/utils';

export type SectionAnchorEntry = { id: string; label: string; activeClassName?: string };

interface SectionAnchorNavProps {
  sections: SectionAnchorEntry[];
  className?: string;
  onActiveChange?: (id: string) => void;
  title?: string;
  variant?: 'desktop' | 'mobile';
}

export function SectionAnchorNav({
  sections,
  className,
  onActiveChange,
  title = 'Índice desta doença',
  variant = 'desktop',
}: SectionAnchorNavProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (!visibleEntry?.target?.id) return;

        setActiveId(visibleEntry.target.id);
      },
      { rootMargin: '-18% 0px -70% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    if (!activeId || !onActiveChange) return;
    onActiveChange(activeId);
  }, [activeId, onActiveChange]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    const scrollToSection = () => {
      element.scrollIntoView({
        behavior,
        block: 'start',
      });
    };

    if (variant === 'mobile') {
      setIsMobileOpen(false);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const scrollContainer = element.closest('.consulta-vet-main-scroll') as HTMLElement | null;
          if (!scrollContainer) {
            scrollToSection();
            return;
          }

          const containerTop = scrollContainer.getBoundingClientRect().top;
          const elementTop = element.getBoundingClientRect().top;
          const mobileNavOffset = 64;
          scrollContainer.scrollTo({
            top: Math.max(0, scrollContainer.scrollTop + elementTop - containerTop - mobileNavOffset),
            behavior,
          });
        });
      });
    } else {
      scrollToSection();
    }

    setActiveId(id);
  };

  if (variant === 'mobile') {
    const activeSection = sections.find((section) => section.id === activeId) ?? sections[0];

    return (
      <nav
        aria-label={title}
        className={cn('consulta-vet-mobile-section-nav sticky top-0 z-30 md:hidden', className)}
      >
        <div className="overflow-hidden rounded-xl border border-border/80 bg-background/95 shadow-md backdrop-blur-md">
          <button
            type="button"
            onClick={() => setIsMobileOpen((value) => !value)}
            className="flex min-h-11 w-full items-center gap-2.5 px-3 py-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            aria-expanded={isMobileOpen}
            aria-controls="consulta-vet-mobile-section-list"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ListTree className="h-4 w-4" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Navegar por capítulos
              </span>
              <span className="block truncate text-xs font-semibold text-foreground">
                {activeSection?.label ?? title}
              </span>
            </span>
            <ChevronDown
              className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform', isMobileOpen && 'rotate-180')}
              aria-hidden
            />
          </button>

          {isMobileOpen ? (
            <div
              id="consulta-vet-mobile-section-list"
              className="max-h-[min(52dvh,28rem)] overflow-y-auto border-t border-border/70 bg-background px-2 py-2 overscroll-contain"
            >
              <ol className="grid gap-1 sm:grid-cols-2">
                {sections.map((section) => {
                  const activeDefault = 'border-primary bg-primary/[0.08] font-semibold text-primary';
                  const activeClasses = section.activeClassName || activeDefault;
                  const chapterMatch = section.label.match(/^(\d+)\.\s+(.+)$/);
                  const chapterNumber = chapterMatch?.[1];
                  const displayLabel = chapterMatch?.[2] ?? section.label;
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={(event) => handleClick(event, section.id)}
                        className={cn(
                          'flex min-h-11 items-center gap-2 rounded-lg border px-2.5 py-2 text-xs leading-5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring',
                          activeId === section.id
                            ? activeClasses
                            : 'border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                        )}
                      >
                        {chapterNumber ? (
                          <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-md bg-muted/70 px-1 text-[10px] font-bold text-muted-foreground">
                            {chapterNumber}
                          </span>
                        ) : null}
                        <span>{displayLabel}</span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          ) : null}
        </div>
      </nav>
    );
  }

  return (
    <nav aria-label={title} className={cn('sticky top-24 hidden max-h-[calc(100vh-7rem)] w-60 shrink-0 overflow-y-auto xl:block', className)}>
      <div className="border-l border-border/80 px-3 py-2">
        <h2 className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{title}</h2>
        <ul className="space-y-0.5">
          {sections.map((section) => {
            const activeDefault = 'border-primary bg-primary/[0.06] font-semibold text-primary';
            const activeClasses = section.activeClassName || activeDefault;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(event) => handleClick(event, section.id)}
                  className={cn(
                    'block min-h-10 rounded-sm border-l-2 px-3 py-2 text-sm leading-6 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    activeId === section.id ? activeClasses : 'border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                  )}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
