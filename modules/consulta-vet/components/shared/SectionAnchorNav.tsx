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
    <nav className={cn('sticky top-24 hidden max-h-[calc(100vh-7rem)] w-72 shrink-0 overflow-y-auto pr-4 xl:block', className)}>
      <h4 className="mb-4 px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">{'\u00cdndice'}</h4>
      <ul className="space-y-1 border-l-2 border-border">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(event) => handleClick(event, section.id)}
              className={cn(
                'block -ml-[2px] border-l-2 px-4 py-1.5 text-sm transition-all',
                activeId === section.id
                  ? 'border-primary bg-primary/5 font-semibold text-primary'
                  : 'border-transparent text-muted-foreground hover:border-border/80 hover:text-foreground'
              )}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
