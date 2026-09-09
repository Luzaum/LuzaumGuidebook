import React from 'react'
import { X } from 'lucide-react'
import { cn } from '../../../../lib/utils'

interface ChipProps extends React.HTMLAttributes<HTMLButtonElement> {
  label: string
  selected?: boolean
  onRemove?: () => void
}

export function Chip({
  label,
  selected = false,
  onRemove,
  className,
  ...props
}: ChipProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all text-xs sm:text-sm font-medium',
        selected
          ? 'bg-gold/20 border border-gold text-gold shadow-[0_0_12px_rgba(245,197,66,0.2)]'
          : 'bg-muted/70 border border-border text-foreground/80 hover:bg-muted hover:text-foreground hover:border-gold/40',
        className,
      )}
      {...props}
    >
      <span>{label}</span>
      {onRemove && (
        <span
          role="button"
          tabIndex={0}
          onClick={(event) => {
            event.stopPropagation()
            onRemove()
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              event.stopPropagation()
              onRemove()
            }
          }}
          className="hover:bg-gold/20 rounded-full p-0.5 transition-colors"
          aria-label={`Remover ${label}`}
        >
          <X className="w-3.5 h-3.5" />
        </span>
      )}
    </button>
  )
}
