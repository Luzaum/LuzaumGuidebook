import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

type EntityCardProps = {
  title: string
  description: string
  href: string
  meta?: React.ReactNode
  tags?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export function EntityCard({
  title,
  description,
  href,
  meta,
  tags,
  actions,
  className,
}: EntityCardProps) {
  return (
    <article className={cn('consulta-vet-panel rounded-[28px] p-5 transition duration-300 hover:-translate-y-1', className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
          {meta ? <div className="mt-4 flex flex-wrap gap-2">{meta}</div> : null}
          {tags ? <div className="mt-4">{tags}</div> : null}
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
      <div className="mt-5 flex justify-end">
        <Link to={href} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 dark:bg-blue-500 dark:text-slate-950">
          Abrir
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}

