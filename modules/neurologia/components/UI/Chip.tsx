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
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors text-sm',
        selected
          ? 'bg-gold/20 border border-gold/50 text-gold'
          : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10',
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
