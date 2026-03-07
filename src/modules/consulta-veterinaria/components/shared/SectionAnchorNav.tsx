type AnchorItem = {
  id: string
  label: string
}

type SectionAnchorNavProps = {
  items: AnchorItem[]
  activeId?: string
  onSelect?: (id: string) => void
  className?: string
}

export function SectionAnchorNav({ items, activeId, onSelect, className }: SectionAnchorNavProps) {
  return (
    <nav className={`consulta-vet-panel rounded-[28px] p-3 ${className || ''}`}>
      <ul className="space-y-1">
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect?.(item.id)}
                className={[
                  'flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm transition',
                  active
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900/80',
                ].join(' ')}
              >
                <span>{item.label}</span>
                <span className="text-[10px] uppercase tracking-[0.18em]">{active ? 'ativa' : 'ir'}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

