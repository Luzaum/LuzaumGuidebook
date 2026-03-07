import { SearchX } from 'lucide-react'

type EmptyStateProps = {
  title: string
  description: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function EmptyState({
  title,
  description,
  icon = <SearchX className="h-5 w-5" />,
  action,
}: EmptyStateProps) {
  return (
    <div className="consulta-vet-panel rounded-[28px] border border-dashed p-8 text-left">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-700 dark:text-blue-200">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}

