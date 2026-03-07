import { Link } from 'react-router-dom'
import { Clock3 } from 'lucide-react'
import type { RecentRecord } from '../../types/recents'
import { formatDateTime } from '../../utils/date'

type RecentAccessListProps = {
  items: Array<RecentRecord & { title: string; href: string; subtitle?: string }>
}

export function RecentAccessList({ items }: RecentAccessListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Link
          key={`${item.entityType}-${item.entityId}`}
          to={item.href}
          className="consulta-vet-panel flex items-start gap-4 rounded-[24px] p-4 transition hover:-translate-y-0.5"
        >
          <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-700 dark:text-blue-200">
            <Clock3 className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
            {item.subtitle ? <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.subtitle}</p> : null}
            <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-slate-400">
              {formatDateTime(item.visitedAt)}
              {item.pageNumber ? ` • página ${item.pageNumber}` : ''}
              {item.sectionId ? ` • seção ${item.sectionId}` : ''}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

