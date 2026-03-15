import React, { useEffect, useState } from 'react';
import { cn } from '../../../../lib/utils';

interface SectionAnchorNavProps {
  sections: { id: string; label: string }[];
  className?: string;
  onActiveChange?: (id: string) => void;
}

export function SectionAnchorNav({ sections, className, onActiveChange }: SectionAnchorNavProps) {
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

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveId(id);
  };

  return (
    <nav className={cn('sticky top-24 hidden max-h-[calc(100vh-7rem)] w-60 shrink-0 overflow-y-auto xl:block', className)}>
      <div className="rounded-[24px] border border-border/80 bg-card/90 px-4 py-4 shadow-sm">
        <h4 className="mb-4 px-2 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Índice</h4>
        <ul className="space-y-1 border-l border-border/80">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(event) => handleClick(event, section.id)}
                className={cn(
                  'block -ml-px border-l-2 px-4 py-2 text-sm leading-6 transition-all',
                  activeId === section.id
                    ? 'border-primary bg-primary/[0.06] font-semibold text-primary'
                    : 'border-transparent text-muted-foreground hover:border-border/80 hover:text-foreground'
                )}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
