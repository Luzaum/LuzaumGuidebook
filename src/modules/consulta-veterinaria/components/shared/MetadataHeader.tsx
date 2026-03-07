import type { ReactNode } from 'react'

type MetadataHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  badges?: ReactNode
  actions?: ReactNode
}

export function MetadataHeader({
  eyebrow,
  title,
  description,
  badges,
  actions,
}: MetadataHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="max-w-4xl">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-800 dark:text-blue-200">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          {title}
        </h1>
        {description ? <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p> : null}
        {badges ? <div className="mt-4 flex flex-wrap gap-2">{badges}</div> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  )
}
