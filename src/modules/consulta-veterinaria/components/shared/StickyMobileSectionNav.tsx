type StickyMobileSectionNavProps = {
  items: Array<{ id: string; label: string }>
  activeId?: string
  onSelect: (id: string) => void
}

export function StickyMobileSectionNav({
  items,
  activeId,
  onSelect,
}: StickyMobileSectionNavProps) {
  return (
    <div className="consulta-vet-sticky-blur sticky top-[72px] z-20 rounded-[24px] border border-slate-200/70 p-3 shadow-sm dark:border-slate-700 lg:hidden">
      <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        Navegação rápida
      </label>
      <select
        value={activeId}
        onChange={(event) => onSelect(event.target.value)}
        className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-50"
      >
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}
