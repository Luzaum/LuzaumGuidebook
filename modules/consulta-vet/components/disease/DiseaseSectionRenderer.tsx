import React from 'react';
import { cn } from '../../../../lib/utils';
import { EditorialSectionValue, EditorialSystemGroup } from '../../types/common';

interface DiseaseSectionRendererProps {
  id: string;
  title: string;
  data: EditorialSectionValue;
  className?: string;
}

function formatKey(value: string): string {
  return value
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase());
}

function isSystemGroupArray(value: unknown): value is EditorialSystemGroup[] {
  return Array.isArray(value) && value.every((item) => item && typeof item === 'object' && 'system' in item && 'findings' in item);
}

export function DiseaseSectionRenderer({ id, title, data, className }: DiseaseSectionRendererProps) {
  if (!data || (Array.isArray(data) && data.length === 0)) return null;
  if (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0) return null;

  const renderContent = (content: EditorialSectionValue | string | string[] | EditorialSystemGroup[]) => {
    if (typeof content === 'string') {
      return <p className="mb-4 whitespace-pre-line leading-relaxed text-foreground/80">{content}</p>;
    }

    if (Array.isArray(content) && !isSystemGroupArray(content)) {
      return (
        <ul className="mb-6 space-y-2">
          {content.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
              <span className="leading-relaxed text-foreground/80">{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    if (isSystemGroupArray(content)) {
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {content.map((item) => (
            <div key={item.system} className="rounded-xl border border-border bg-muted/40 p-4">
              <h4 className="mb-2 font-semibold tracking-tight text-foreground">{item.system}</h4>
              <ul className="space-y-1">
                {item.findings.map((finding) => (
                  <li key={finding} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                    {finding}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }

    if (typeof content === 'object') {
      return Object.entries(content).map(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return null;

        return (
          <div key={key} className="mb-6">
            <h4 className="mb-3 font-semibold tracking-tight text-foreground">{formatKey(key)}</h4>
            {renderContent(value as string | string[] | EditorialSystemGroup[])}
          </div>
        );
      });
    }

    return null;
  };

  return (
    <section id={id} className={cn('mb-12 scroll-mt-24', className)}>
      <h2 className="mb-6 border-b border-border pb-2 text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="max-w-none">{renderContent(data)}</div>
    </section>
  );
}
