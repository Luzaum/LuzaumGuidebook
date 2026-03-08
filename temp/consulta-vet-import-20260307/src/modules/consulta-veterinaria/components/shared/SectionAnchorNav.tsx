import React, { useEffect, useState } from 'react';
import { cn } from '../../../../lib/utils';

interface SectionAnchorNavProps {
  sections: { id: string; label: string }[];
  className?: string;
}

export function SectionAnchorNav({ sections, className }: SectionAnchorNavProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  };

  return (
    <nav className={cn('sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 hidden lg:block w-64 shrink-0', className)}>
      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 px-3">Índice</h4>
      <ul className="space-y-1 border-l-2 border-border">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(e) => handleClick(e, section.id)}
              className={cn(
                'block px-4 py-1.5 text-sm transition-all border-l-2 -ml-[2px]',
                activeId === section.id
                  ? 'border-primary text-primary font-semibold bg-primary/5'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border/80'
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
