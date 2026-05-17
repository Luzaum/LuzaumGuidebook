import React from 'react';
import { AlertTriangle, CheckCircle2, ClipboardList, FunctionSquare, Info, ListOrdered, Sparkles, Target } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { EmergencyGuideBlock } from '../../types/emergencyGuide';

function Callout({
  variant,
  title,
  text,
}: {
  variant: 'critical' | 'warning' | 'info';
  title?: string;
  text: string;
}) {
  const styles = {
    critical: {
      wrap: 'border-rose-500/35 bg-rose-500/[0.08] dark:bg-rose-500/[0.1]',
      icon: AlertTriangle,
      iconClass: 'text-rose-600 dark:text-rose-400',
      titleClass: 'text-rose-900 dark:text-rose-100',
    },
    warning: {
      wrap: 'border-amber-500/35 bg-amber-500/[0.08] dark:bg-amber-500/[0.1]',
      icon: AlertTriangle,
      iconClass: 'text-amber-700 dark:text-amber-300',
      titleClass: 'text-amber-950 dark:text-amber-100',
    },
    info: {
      wrap: 'border-sky-500/30 bg-sky-500/[0.06] dark:bg-sky-500/[0.1]',
      icon: Info,
      iconClass: 'text-sky-700 dark:text-sky-300',
      titleClass: 'text-sky-950 dark:text-sky-100',
    },
  } as const;

  const s = styles[variant];
  const Icon = s.icon;

  return (
    <div className={cn('rounded-2xl border-l-4 p-5 shadow-sm', s.wrap)}>
      <div className="flex gap-3">
        <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', s.iconClass)} aria-hidden />
        <div className="min-w-0">
          {title ? <p className={cn('text-sm font-bold tracking-tight', s.titleClass)}>{title}</p> : null}
          <p className={cn('text-[15px] leading-7 text-foreground/90', title ? 'mt-2' : '')}>{text}</p>
        </div>
      </div>
    </div>
  );
}

export function EmergencyGuideBlockRenderer({ blocks }: { blocks: EmergencyGuideBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        if (block.type === 'callout') {
          return <Callout key={i} variant={block.variant} title={block.title} text={block.text} />;
        }
        if (block.type === 'checklist') {
          return (
            <div key={i} className="rounded-2xl border border-border/80 bg-card/60 px-5 py-5">
              {block.title ? (
                <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {block.title}
                </p>
              ) : null}
              <ul className="space-y-3">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-7 text-foreground/88">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/75" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        if (block.type === 'steps' || block.type === 'keyPoints') {
          const Icon = block.type === 'steps' ? ListOrdered : Sparkles;
          return (
            <div key={i} className="rounded-2xl border border-border/80 bg-muted/[0.2] px-5 py-5">
              {block.title ? (
                <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  <Icon className="h-4 w-4 text-primary" />
                  {block.title}
                </p>
              ) : null}
              <ol className="list-decimal space-y-3 pl-5 text-[15px] leading-7 text-foreground/88 marker:font-semibold marker:text-primary">
                {block.items.map((item) => (
                  <li key={item} className="pl-1">
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          );
        }
        if (block.type === 'targetStrip') {
          return (
            <div key={i} className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] px-5 py-5">
              {block.title ? (
                <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-200">
                  <Target className="h-4 w-4" />
                  {block.title}
                </p>
              ) : null}
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {block.items.map((item) => (
                  <div key={`${item.label}-${item.value}`} className="rounded-xl border border-emerald-500/20 bg-background/70 px-4 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{item.label}</p>
                    <p className="mt-1 text-lg font-extrabold tracking-tight text-foreground">{item.value}</p>
                    {item.detail ? <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.detail}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          );
        }
        if (block.type === 'formula') {
          return (
            <div key={i} className="rounded-2xl border border-sky-500/25 bg-sky-500/[0.06] px-5 py-5">
              <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-sky-800 dark:text-sky-200">
                <FunctionSquare className="h-4 w-4" />
                {block.title}
              </p>
              <div className="overflow-x-auto rounded-xl border border-sky-500/20 bg-background/80 px-4 py-3">
                <code className="whitespace-nowrap text-[15px] font-bold text-foreground">{block.expression}</code>
              </div>
              {block.variables?.length ? (
                <ul className="mt-3 space-y-1 text-sm leading-6 text-foreground/85">
                  {block.variables.map((variable) => (
                    <li key={variable} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/75" />
                      <span>{variable}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {block.note ? <p className="mt-3 text-sm leading-6 text-muted-foreground">{block.note}</p> : null}
            </div>
          );
        }
        if (block.type === 'table') {
          return (
            <div key={i} className="rounded-2xl border border-border/80 bg-card/60 px-5 py-5">
              {block.title ? (
                <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  <ClipboardList className="h-4 w-4 text-primary" />
                  {block.title}
                </p>
              ) : null}
              <div className="overflow-x-auto rounded-xl border border-border/70">
                <table className="min-w-full divide-y divide-border/70 text-left text-sm">
                  <thead className="bg-muted/60 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    <tr>
                      {block.columns.map((column) => (
                        <th key={column} scope="col" className="px-4 py-3">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 bg-background/55">
                    {block.rows.map((row, rowIndex) => (
                      <tr key={`${row.join('-')}-${rowIndex}`}>
                        {row.map((cell, cellIndex) => (
                          <td key={`${cell}-${cellIndex}`} className="px-4 py-3 align-top text-[14px] leading-6 text-foreground/88">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {block.caption ? <p className="mt-3 text-xs leading-5 text-muted-foreground">{block.caption}</p> : null}
            </div>
          );
        }
        if (block.type === 'comparison') {
          return (
            <div key={i} className="rounded-2xl border border-primary/20 bg-primary/[0.04] px-5 py-5">
              {block.title ? (
                <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-primary">
                  <Sparkles className="h-4 w-4" />
                  {block.title}
                </p>
              ) : null}
              <div className="overflow-x-auto rounded-xl border border-border/70">
                <table className="min-w-full divide-y divide-border/70 text-left text-sm">
                  <thead className="bg-background/80 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        Critério
                      </th>
                      {block.columns.map((column) => (
                        <th key={column} scope="col" className="px-4 py-3">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 bg-card/45">
                    {block.rows.map((row) => (
                      <tr key={row.label}>
                        <th scope="row" className="px-4 py-3 align-top text-[14px] font-bold leading-6 text-foreground">
                          {row.label}
                        </th>
                        {row.values.map((value, valueIndex) => (
                          <td key={`${row.label}-${valueIndex}`} className="px-4 py-3 align-top text-[14px] leading-6 text-foreground/88">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }
        if (block.type === 'placeholder') {
          return (
            <div
              key={i}
              className="rounded-2xl border border-dashed border-primary/35 bg-primary/[0.04] px-5 py-4 text-sm leading-7 text-muted-foreground"
            >
              <span className="font-semibold text-primary/90">Conteúdo em preparação — </span>
              {block.message}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
