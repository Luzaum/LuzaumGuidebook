import React from 'react'
import { HelpCircle } from 'lucide-react'
import { cn } from '../../../../lib/utils'

interface HelpButtonProps {
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void
  label?: string
  size?: 'sm' | 'md'
  className?: string
}

export function HelpButton({
  onClick,
  label = 'Ajuda',
  size = 'md',
  className,
}: HelpButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
        'text-gold/80 hover:text-gold hover:bg-gold/10 transition-colors',
        size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm',
        className,
      )}
    >
      <HelpCircle className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
      <span className={cn(size === 'sm' ? 'text-xs' : 'text-sm', 'font-medium')}>
        {label}
      </span>
    </button>
  )
}
