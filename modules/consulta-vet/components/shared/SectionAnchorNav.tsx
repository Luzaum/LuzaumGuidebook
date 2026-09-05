import React, { useEffect, useState } from 'react';
import { cn } from '../../../../lib/utils';

export type SectionAnchorEntry = { id: string; label: string; activeClassName?: string };

interface SectionAnchorNavProps {
  sections: SectionAnchorEntry[];
  className?: string;
  onActiveChange?: (id: string) => void;
  title?: string;
}

export function SectionAnchorNav({ sections, className, onActiveChange, title = 'Índice desta doença' }: SectionAnchorNavProps) {
  const [activeId, setActiveId] = useState<string>('');

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

    element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    setActiveId(id);
  };

  return (
    <nav aria-label={title} className={cn('sticky top-24 hidden max-h-[calc(100vh-7rem)] w-60 shrink-0 overflow-y-auto 2xl:block', className)}>
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
