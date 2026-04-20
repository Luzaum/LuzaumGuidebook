import React from 'react';
import { ClinicalQuickGuideBlock } from '../../types/clinicalQuickGuide';
import { ClinicalQuickGuideYoutubeEmbed } from './ClinicalQuickGuideYoutubeEmbed';
import { cn } from '../../../../lib/utils';

interface ClinicalQuickGuideBodyProps {
  blocks: ClinicalQuickGuideBlock[];
  youtubeVideoId: string | null;
  youtubeTitle: string;
}

const CALLOUT: Record<NonNullable<Extract<ClinicalQuickGuideBlock, { type: 'callout' }>['variant']>, string> = {
  info: 'border-sky-500/35 bg-sky-500/[0.08] text-sky-950 dark:text-sky-100',
  warning: 'border-amber-500/40 bg-amber-500/[0.1] text-amber-950 dark:text-amber-50',
  tip: 'border-emerald-500/35 bg-emerald-500/[0.08] text-emerald-950 dark:text-emerald-50',
};

function FlowchartBlock({
  nodes,
  title,
}: Extract<ClinicalQuickGuideBlock, { type: 'flowchart' }>) {
  return (
    <div className="space-y-3">
      {title ? <p className="text-sm font-semibold text-foreground">{title}</p> : null}
      <div
        className="flex flex-col gap-2 rounded-2xl border border-border/70 bg-muted/20 p-4 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-x-2 md:gap-y-2"
        role="list"
      >
        {nodes.map((n, idx) => (
          <React.Fragment key={n.id}>
            {idx > 0 ? (
              <span
                className="hidden text-lg font-light text-muted-foreground md:inline"
                aria-hidden
              >
                →
              </span>
            ) : null}
            <div
              role="listitem"
              className={cn(
                'rounded-xl border px-3 py-2.5 text-center text-sm font-medium leading-snug shadow-sm',
                n.variant === 'start' && 'border-emerald-500/40 bg-emerald-500/10 text-emerald-950 dark:text-emerald-50',
                n.variant === 'end' && 'border-violet-500/40 bg-violet-500/10 text-violet-950 dark:text-violet-50',
                n.variant === 'decision' && 'border-amber-500/40 bg-amber-500/10 text-amber-950 dark:text-amber-50',
                (!n.variant || n.variant === 'action') && 'border-border bg-card/90 text-foreground'
              )}
            >
              {n.label}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export function ClinicalQuickGuideBody({ blocks, youtubeVideoId, youtubeTitle }: ClinicalQuickGuideBodyProps) {
  return (
    <div className="space-y-8">
      {youtubeVideoId ? (
        <section className="space-y-3" aria-labelledby="cqg-video-heading">
          <h2 id="cqg-video-heading" className="text-lg font-bold tracking-tight text-foreground">
            Vídeo
          </h2>
          <ClinicalQuickGuideYoutubeEmbed videoId={youtubeVideoId} title={youtubeTitle} />
        </section>
      ) : null}

      {blocks.map((block, i) => {
        const key = `b-${i}`;
        switch (block.type) {
          case 'heading': {
            const Tag = block.level === 2 ? 'h2' : block.level === 3 ? 'h3' : 'h4';
            return (
              <Tag
                key={key}
                className={cn(
                  'font-bold tracking-tight text-foreground',
                  block.level === 2 && 'text-xl md:text-2xl',
                  block.level === 3 && 'text-lg md:text-xl',
                  block.level === 4 && 'text-base md:text-lg'
                )}
              >
                {block.text}
              </Tag>
            );
          }
          case 'paragraph':
            return (
              <p key={key} className="max-w-[75ch] text-[15px] leading-7 text-foreground/90">
                {block.text}
              </p>
            );
          case 'callout':
            return (
              <div
                key={key}
                className={cn('rounded-2xl border px-4 py-3 text-sm leading-relaxed', CALLOUT[block.variant])}
                role="note"
              >
                {block.title ? <p className="font-semibold">{block.title}</p> : null}
                <p className={block.title ? 'mt-1' : ''}>{block.text}</p>
              </div>
            );
          case 'table':
            return (
              <div key={key} className="overflow-x-auto rounded-2xl border border-border/80 bg-card/50 shadow-sm">
                {block.caption ? (
                  <p className="border-b border-border/60 bg-muted/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {block.caption}
                  </p>
                ) : null}
                <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border/80 bg-muted/40">
                      {block.headers.map((h) => (
                        <th key={h} className="px-4 py-3 font-semibold text-foreground">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, ri) => (
                      <tr key={ri} className="border-b border-border/50 last:border-0">
                        {row.map((cell, ci) => (
                          <td key={ci} className="align-top px-4 py-3 text-muted-foreground">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'steps':
            return (
              <div key={key} className="space-y-3">
                {block.title ? <p className="text-sm font-semibold text-foreground">{block.title}</p> : null}
                <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-7 text-foreground/90">
                  {block.items.map((item, si) => (
                    <li key={si}>{item}</li>
                  ))}
                </ol>
              </div>
            );
          case 'flowchart':
            return (
              <div key={key}>
                <FlowchartBlock {...block} />
              </div>
            );
          case 'figure':
            return (
              <figure key={key} className="space-y-2">
                <div className="overflow-hidden rounded-2xl border border-border/80 bg-muted/20">
                  <img src={block.src} alt={block.alt} className="h-auto w-full object-contain" loading="lazy" />
                </div>
                {block.caption ? (
                  <figcaption className="text-xs leading-relaxed text-muted-foreground">{block.caption}</figcaption>
                ) : null}
              </figure>
            );
          case 'videoPlaceholder':
            return (
              <div
                key={key}
                className="rounded-2xl border border-dashed border-primary/35 bg-primary/[0.04] px-4 py-5 text-sm text-muted-foreground"
              >
                <p className="font-semibold text-foreground">{block.title}</p>
                <p className="mt-2 leading-relaxed">{block.body}</p>
              </div>
            );
          case 'youtubeEmbed':
            return (
              <section key={key} className="space-y-3" aria-labelledby={`${key}-yt`}>
                <h3 id={`${key}-yt`} className="text-base font-semibold tracking-tight text-foreground">
                  {block.title}
                </h3>
                <ClinicalQuickGuideYoutubeEmbed videoId={block.videoId} title={block.title} />
                {block.caption ? (
                  <p className="text-sm leading-relaxed text-muted-foreground">{block.caption}</p>
                ) : null}
              </section>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
