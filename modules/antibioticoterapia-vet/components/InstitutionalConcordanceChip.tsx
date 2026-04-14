import type { InstitutionalConcordanceState } from '../data-v2/institutionalConcordance'
import { concordanceChipCopy } from '../data-v2/institutionalConcordance'

export function InstitutionalConcordanceChip({ state }: { state: InstitutionalConcordanceState }) {
  const { label, hint } = concordanceChipCopy(state)
  const isPage = state === 'page_locator'
  return (
    <span
      className="inline-flex max-w-full items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold leading-tight"
      style={{
        borderColor: isPage
          ? 'color-mix(in srgb, var(--chart-2) 45%, hsl(var(--border)))'
          : 'color-mix(in srgb, hsl(var(--muted-foreground)) 35%, hsl(var(--border)))',
        background: isPage
          ? 'color-mix(in srgb, var(--chart-2) 14%, hsl(var(--card)))'
          : 'color-mix(in srgb, hsl(var(--muted)) 28%, hsl(var(--card)))',
        color: 'hsl(var(--foreground))',
      }}
      title={hint}
    >
      {label}
    </span>
  )
}
