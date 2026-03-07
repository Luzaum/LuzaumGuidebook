import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

type FavoriteButtonProps = {
  active: boolean
  onToggle: () => void
  label?: string
  className?: string
}

export function FavoriteButton({
  active,
  onToggle,
  label = active ? 'Remover dos favoritos' : 'Adicionar aos favoritos',
  className,
}: FavoriteButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onToggle}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40',
        active
          ? 'border-rose-300 bg-rose-50 text-rose-600 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-300'
          : 'border-slate-200 bg-white/70 text-slate-500 hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-blue-500/40 dark:hover:text-blue-200',
        className
      )}
    >
      <Heart className={cn('h-4 w-4', active && 'fill-current')} />
    </button>
  )
}

