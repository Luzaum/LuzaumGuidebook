import type { KeyValueItem } from '../../types/common'

type KeyValueMetaListProps = {
  items: KeyValueItem[]
}

export function KeyValueMetaList({ items }: KeyValueMetaListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-900/60">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
          <p className="mt-2 text-sm font-medium text-slate-800 dark:text-slate-100">{item.value}</p>
        </div>
      ))}
    </div>
  )
}

