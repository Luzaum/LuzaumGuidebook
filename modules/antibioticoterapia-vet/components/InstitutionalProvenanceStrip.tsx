import { getVersionedSource } from '../data-v2/sourceRegistry'
import type { InstitutionalContentMapping } from '../model/versionedSource'
import { InlineRichText } from './RichTextViewer'

interface InstitutionalProvenanceStripProps {
  mapping: InstitutionalContentMapping
  contextLabel?: string
  variant?: 'compact' | 'full'
}

function pageLabel(pageStart?: number, pageEnd?: number): string | null {
  if (!pageStart) return null
  if (!pageEnd || pageEnd === pageStart) return `Página consultada: ${pageStart}`
  return `Páginas consultadas: ${pageStart}–${pageEnd}`
}

export function InstitutionalProvenanceStrip({
  mapping,
  contextLabel,
  variant = 'full',
}: InstitutionalProvenanceStripProps) {
  const source = getVersionedSource(mapping.versionedSourceId)
  const pages = pageLabel(mapping.locator.pageStart ?? undefined, mapping.locator.pageEnd ?? undefined)
  const compact = variant === 'compact'

  if (!source) return null

  return (
    <aside
      className={`border-l-4 border-emerald-600 bg-emerald-50/70 ${
        compact ? 'px-4 py-3' : 'px-5 py-4'
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-emerald-700 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-white">
          Fonte institucional
        </span>
        <span className="bg-white px-2 py-1 text-[10px] font-bold text-emerald-900">
          {source.versionLabel}
        </span>
        {pages ? (
          <span className="bg-white px-2 py-1 text-[10px] font-bold text-slate-600">{pages}</span>
        ) : null}
      </div>

      <p className={`${compact ? 'mt-2 text-xs' : 'mt-3 text-sm'} font-black text-slate-900`}>
        {source.title}
      </p>

      {contextLabel ? (
        <p className="mt-1 text-xs leading-relaxed text-slate-600">
          <strong>Contexto clínico:</strong> {contextLabel}
        </p>
      ) : null}

      {mapping.topicHint ? (
        <div className="mt-2 text-xs leading-relaxed text-slate-700">
          <InlineRichText text={mapping.topicHint} />
        </div>
      ) : null}
    </aside>
  )
}

export default InstitutionalProvenanceStrip
