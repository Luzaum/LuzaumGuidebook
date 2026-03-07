import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type InfoBadgeProps = {
  children: React.ReactNode
  tone?: 'default' | 'accent' | 'warning' | 'danger' | 'success'
  className?: string
}

const toneMap = {
  default: 'border-slate-200/70 bg-white/70 text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200',
  accent: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200',
  warning: 'border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-200',
  danger: 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200',
} as const

export function InfoBadge({ children, tone = 'default', className }: InfoBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn('rounded-full px-3 py-1 text-[11px] font-semibold', toneMap[tone], className)}
    >
      {children}
    </Badge>
  )
}

