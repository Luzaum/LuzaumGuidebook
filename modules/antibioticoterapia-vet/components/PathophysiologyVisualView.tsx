import React, { useCallback, useMemo, useRef } from 'react'
import { AlertCircle, BookOpen, Info } from 'lucide-react'
import type { PathophysiologySection, PathophysiologyVisual, TreatmentLineBlock } from '../types'
import RichTextViewer, { InlineRichText } from './RichTextViewer'
import { normalizeDrugDisplayName, sanitizeInternalRegimenIds } from '../utils/clinicalCopy'
import { regimeModeLabel } from '../utils/diseaseTreatment'

/** Cores de grifa: mesma palavra repetida → mesma cor; palavras novas → próxima cor da rotação. */
const HIGHLIGHT_PALETTE: { bg: string; fg: string }[] = [
  { bg: 'color-mix(in srgb, hsl(var(--chart-2)) 34%, transparent)', fg: 'hsl(var(--foreground))' },
  { bg: 'color-mix(in srgb, hsl(var(--chart-3)) 32%, transparent)', fg: 'hsl(var(--foreground))' },
  { bg: 'color-mix(in srgb, hsl(var(--chart-4)) 30%, transparent)', fg: 'hsl(var(--foreground))' },
  { bg: 'color-mix(in srgb, hsl(var(--chart-5)) 30%, transparent)', fg: 'hsl(var(--foreground))' },
  { bg: 'color-mix(in srgb, hsl(var(--chart-1)) 28%, transparent)', fg: 'hsl(var(--foreground))' },
  { bg: 'color-mix(in srgb, hsl(var(--primary)) 26%, transparent)', fg: 'hsl(var(--foreground))' },
]

function useInlineHighlighter() {
  const cacheRef = useRef(new Map<string, number>())
  const renderInline = useCallback((text: string): React.ReactNode => {
    const cache = cacheRef.current
    const parts = sanitizeInternalRegimenIds(text).split(/(\*\*[^*]+\*\*)/g)
    return parts.map((p, i) => {
      if (p.startsWith('**') && p.endsWith('**')) {
        const inner = p.slice(2, -2)
        const k = inner.toLowerCase().trim()
        if (!cache.has(k)) {
          cache.set(k, cache.size % HIGHLIGHT_PALETTE.length)
        }
        const pi = cache.get(k)!
        const { bg, fg } = HIGHLIGHT_PALETTE[pi]
        return (
          <mark
            key={`${i}-${k}`}
            className="rounded px-1 py-0.5 font-semibold not-italic"
            style={{ background: bg, color: fg }}
          >
            {inner}
          </mark>
        )
      }
      return <span key={i}>{p}</span>
    })
  }, [])
  return renderInline
}

function TreatmentLinesAppendix({
  blocks,
  dedupeKey,
}: {
  blocks: TreatmentLineBlock[]
  /** Reseta o conjunto ao mudar de doença (ex.: nome da condição). */
  dedupeKey?: string
}) {
  const drugDetailDedupeSet = useMemo(() => new Set<string>(), [dedupeKey ?? ''])

  if (!blocks.length) return null
  return (
    <div
      className="mt-6 space-y-6 border-t pt-6"
      style={{ borderColor: 'color-mix(in srgb, hsl(var(--primary)) 22%, hsl(var(--border)))' }}
    >
      <div>
        <h4 className="text-base font-bold tracking-tight sm:text-lg" style={{ color: 'hsl(var(--foreground))' }}>
          Antimicrobianos: linhas de tratamento e justificativas
        </h4>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Opções cadastradas para esta condição no aplicativo. A decisão final deve considerar estabilidade do paciente,
          cultura, função orgânica e protocolos locais.
        </p>
      </div>
      {blocks.map((block, bi) => (
        <div
          key={`${block.title}-${bi}`}
          className="rounded-2xl border p-4 shadow-sm sm:p-5"
          style={{
            borderColor: 'hsl(var(--border))',
            background: 'color-mix(in srgb, hsl(var(--foreground)) 2.5%, hsl(var(--card)))',
          }}
        >
          <h5 className="text-sm font-bold uppercase tracking-wide" style={{ color: 'hsl(var(--primary))' }}>
            {block.title}
          </h5>
          <div className="mt-2 text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <RichTextViewer text={block.presentation} />
          </div>
          {block.regimes.map((reg, ri) => (
            <div key={ri} className="mt-4">
              {reg.label ? (
                <p className="mb-1 text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                  {reg.label}
                </p>
              ) : null}
              <p
                className="mb-3 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold"
                style={{
                  color: 'hsl(var(--primary))',
                  borderColor: 'color-mix(in srgb, hsl(var(--primary)) 45%, hsl(var(--border)))',
                  background: 'color-mix(in srgb, hsl(var(--primary)) 10%, hsl(var(--card)))',
                }}
              >
                {regimeModeLabel(reg.mode)}
              </p>
              <ul className="mt-2 space-y-3">
                {reg.drugs.map((d, di) => {
                  const dk = normalizeDrugDisplayName(d.name)
                  const already = drugDetailDedupeSet.has(dk)
                  if (already) {
                    return (
                      <li
                        key={`${d.name}-${di}`}
                        className="rounded-xl border border-dashed px-3 py-3 text-sm leading-relaxed"
                        style={{
                          borderColor: 'color-mix(in srgb, hsl(var(--muted-foreground)) 35%, hsl(var(--border)))',
                          background: 'color-mix(in srgb, hsl(var(--muted)) 12%, hsl(var(--card)))',
                          color: 'hsl(var(--muted-foreground))',
                        }}
                      >
                        <span className="font-semibold text-[hsl(var(--foreground))]">{d.name}</span>
                        <p className="mt-1 text-xs">
                          Mesmo fármaco já descrito numa linha anterior — mantém-se neste esquema.{' '}
                          <InlineRichText text={d.rationale} />
                        </p>
                      </li>
                    )
                  }
                  drugDetailDedupeSet.add(dk)
                  return (
                    <li
                      key={`${d.name}-${di}`}
                      className="rounded-xl border px-3 py-3 text-sm leading-relaxed"
                      style={{ borderColor: 'color-mix(in srgb, hsl(var(--border)) 88%, transparent)' }}
                    >
                      <span className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                        {d.name}
                      </span>
                      <p className="mt-1.5" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        <span className="font-medium text-[hsl(var(--foreground))]">Por que nesta condição: </span>
                        <InlineRichText text={d.rationale} />
                      </p>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export const PathophysiologyVisualView: React.FC<{
  doc: PathophysiologyVisual
  treatmentAppendix?: TreatmentLineBlock[]
  /** Alinha deduplicação de fármacos com o guia principal (ex.: nome da doença). */
  treatmentAppendixDedupeKey?: string
}> = ({ doc, treatmentAppendix, treatmentAppendixDedupeKey }) => {
  const renderInline = useInlineHighlighter()

  return (
    <div className="abv-pathophysiology-visual space-y-8 pb-2 text-[15px] leading-relaxed sm:text-base">
      {doc.intro ? (
        <div
          className="rounded-2xl border p-4 sm:p-5"
          style={{
            borderColor: 'color-mix(in srgb, hsl(var(--primary)) 35%, hsl(var(--border)))',
            background: 'color-mix(in srgb, hsl(var(--primary)) 6%, hsl(var(--card)))',
          }}
        >
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold" style={{ color: 'hsl(var(--primary))' }}>
            <BookOpen className="h-4 w-4 shrink-0" aria-hidden />
            Visão geral
          </div>
          <p style={{ color: 'hsl(var(--foreground))' }}>{renderInline(doc.intro)}</p>
        </div>
      ) : null}

      {doc.sections.map((sec) => (
        <SectionBlock
          key={sec.id}
          section={sec}
          renderInline={renderInline}
          treatmentAppendix={sec.id === 'rx' ? treatmentAppendix : undefined}
          treatmentAppendixDedupeKey={sec.id === 'rx' ? treatmentAppendixDedupeKey : undefined}
        />
      ))}
    </div>
  )
}

const SectionBlock: React.FC<{
  section: PathophysiologySection
  renderInline: (text: string) => React.ReactNode
  treatmentAppendix?: TreatmentLineBlock[]
  treatmentAppendixDedupeKey?: string
}> = ({ section, renderInline, treatmentAppendix, treatmentAppendixDedupeKey }) => (
  <section
    className="rounded-2xl border p-4 shadow-sm sm:p-6"
    style={{
      borderColor: 'hsl(var(--border))',
      background: 'color-mix(in srgb, hsl(var(--foreground)) 2.5%, hsl(var(--card)))',
    }}
  >
    <h3 className="text-lg font-bold tracking-tight sm:text-xl" style={{ color: 'hsl(var(--foreground))' }}>
      {section.title}
    </h3>
    {section.lead ? (
      <p className="mt-2 text-sm font-medium sm:text-base" style={{ color: 'hsl(var(--foreground))' }}>
        {renderInline(section.lead)}
      </p>
    ) : null}

    {section.flow ? (
      <div className="mt-4">
        {section.flow.title ? (
          <p className="mb-3 text-sm font-semibold" style={{ color: 'hsl(var(--primary))' }}>
            {section.flow.title}
          </p>
        ) : null}
        <ol className="relative space-y-0">
          {section.flow.steps.map((step, idx) => (
            <li key={idx} className="relative flex gap-3 pb-6 last:pb-0">
              {idx < section.flow!.steps.length - 1 ? (
                <div
                  className="absolute left-[17px] top-9 h-[calc(100%-0.5rem)] w-px"
                  style={{ background: 'color-mix(in srgb, hsl(var(--primary)) 45%, transparent)' }}
                  aria-hidden
                />
              ) : null}
              <div
                className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  background: 'color-mix(in srgb, hsl(var(--primary)) 18%, hsl(var(--card)))',
                  color: 'hsl(var(--primary))',
                  border: '1px solid color-mix(in srgb, hsl(var(--primary)) 35%, hsl(var(--border)))',
                }}
              >
                {idx + 1}
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                  {step.title}
                </p>
                {step.subtitle ? (
                  <p className="mt-1 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {renderInline(step.subtitle)}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    ) : null}

    {section.table ? (
      <div className="mt-4 overflow-x-auto rounded-xl border" style={{ borderColor: 'hsl(var(--border))' }}>
        {section.table.caption ? (
          <p
            className="border-b px-3 py-2 text-xs font-semibold"
            style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}
          >
            {section.table.caption}
          </p>
        ) : null}
        <table className="w-full min-w-[280px] border-collapse text-left text-sm">
          <thead>
            <tr style={{ background: 'color-mix(in srgb, hsl(var(--muted)) 35%, hsl(var(--card)))' }}>
              {section.table.columns.map((c) => (
                <th
                  key={c}
                  className="border-b px-3 py-2.5 font-semibold"
                  style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.table.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className="border-t px-3 py-2.5 align-top"
                    style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                  >
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : null}

    {section.paragraphs?.map((para, i) => (
      <p key={i} className="mt-3 first:mt-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {renderInline(para)}
      </p>
    ))}

    {section.bullets?.length ? (
      <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-[hsl(var(--primary))]" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {section.bullets.map((b, i) => (
          <li key={i}>{renderInline(b)}</li>
        ))}
      </ul>
    ) : null}

    {section.callout ? (
      <div
        className="mt-4 flex gap-3 rounded-xl border p-4"
        style={{
          borderColor:
            section.callout.kind === 'clinical'
              ? 'color-mix(in srgb, hsl(var(--chart-5)) 45%, hsl(var(--border)))'
              : 'color-mix(in srgb, hsl(var(--primary)) 40%, hsl(var(--border)))',
          background:
            section.callout.kind === 'clinical'
              ? 'color-mix(in srgb, hsl(var(--chart-5)) 10%, hsl(var(--card)))'
              : 'color-mix(in srgb, hsl(var(--primary)) 8%, hsl(var(--card)))',
        }}
      >
        {section.callout.kind === 'clinical' ? (
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" style={{ color: 'hsl(var(--chart-5))' }} aria-hidden />
        ) : (
          <Info className="mt-0.5 h-5 w-5 shrink-0" style={{ color: 'hsl(var(--primary))' }} aria-hidden />
        )}
        <div>
          {section.callout.title ? (
            <p className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              {section.callout.title}
            </p>
          ) : null}
          <p className="mt-1 text-sm sm:text-base" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {renderInline(section.callout.text)}
          </p>
        </div>
      </div>
    ) : null}

    {section.id === 'rx' && treatmentAppendix && treatmentAppendix.length > 0 ? (
      <TreatmentLinesAppendix blocks={treatmentAppendix} dedupeKey={treatmentAppendixDedupeKey} />
    ) : null}
  </section>
)
