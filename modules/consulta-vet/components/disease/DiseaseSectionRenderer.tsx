import React from 'react';
import { cn } from '../../../../lib/utils';

interface DiseaseSectionRendererProps {
  id: string;
  title: string;
  data: any;
  className?: string;
}

export function DiseaseSectionRenderer({ id, title, data, className }: DiseaseSectionRendererProps) {
  if (!data || (Array.isArray(data) && data.length === 0) || (typeof data === 'object' && Object.keys(data).length === 0)) {
    return null;
  }

  const renderContent = (content: any) => {
    if (typeof content === 'string') {
      return <p className="text-foreground/80 leading-relaxed mb-4">{content}</p>;
    }

    if (Array.isArray(content)) {
      return (
        <ul className="space-y-2 mb-6">
          {content.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
              <span className="text-foreground/80 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    if (typeof content === 'object') {
      return Object.entries(content).map(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return null;

        // Special handling for possibleSystemsAffected
        if (key === 'possibleSystemsAffected' && Array.isArray(value)) {
          return (
            <div key={key} className="mb-6">
              <h4 className="font-semibold text-foreground mb-3 capitalize tracking-tight">Sistemas Afetados</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                {value.map((sys: any, i: number) => (
                  <div key={i} className="bg-muted/50 p-4 rounded-xl border border-border">
                    <h5 className="font-medium text-foreground/90 mb-2">{sys.system}</h5>
                    <ul className="space-y-1">
                      {sys.findings.map((f: string, j: number) => (
                        <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/50 mt-2 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

        return (
          <div key={key} className="mb-6">
            <h4 className="font-semibold text-foreground mb-3 tracking-tight">{formattedKey}</h4>
            {renderContent(value)}
          </div>
        );
      });
    }

    return null;
  };

  return (
    <section id={id} className={cn('scroll-mt-24 mb-12', className)}>
      <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border tracking-tight">
        {title}
      </h2>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        {renderContent(data)}
      </div>
    </section>
  );
}
