import React from 'react'
import { HelpCircle } from 'lucide-react'
import { cn } from '../../../../lib/utils'

interface HelpButtonProps {
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void
  size?: 'sm' | 'md'
  className?: string
  'aria-label'?: string
}

export function HelpButton({
  onClick,
  size = 'md',
  className,
  'aria-label': ariaLabel = 'Ajuda',
}: HelpButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onClick(e)
      }}
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center justify-center rounded-full',
        'text-gold/80 hover:text-gold hover:bg-gold/10',
        'transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-neutral-900',
        size === 'sm' ? 'w-5 h-5' : 'w-6 h-6',
        className,
      )}
    >
      <HelpCircle className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
    </button>
  )
}
