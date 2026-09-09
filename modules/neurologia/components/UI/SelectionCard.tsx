import React from 'react'
import { CheckCircle } from 'lucide-react'
import { cn } from '../../../../lib/utils'

interface SelectionCardProps {
  label: string
  description?: string
  isSelected: boolean
  onClick: () => void
  icon?: React.ReactNode
}

export function SelectionCard({
  label,
  description,
  isSelected,
  onClick,
  icon,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full p-4 rounded-xl border transition-all duration-200 text-left shadow-sm',
        'hover:border-gold/50 hover:bg-gold/5',
        isSelected
          ? 'border-gold bg-gold/10 ring-1 ring-gold/40 shadow-[0_0_16px_rgba(245,197,66,0.15)]'
          : 'border-border bg-card/90 text-foreground hover:bg-muted/40',
      )}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div
            className={cn(
              'p-2.5 rounded-xl transition-colors',
              isSelected
                ? 'bg-gold/20 text-gold'
                : 'bg-muted text-muted-foreground group-hover:text-foreground',
            )}
          >
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3
              className={cn(
                'font-semibold text-sm sm:text-base leading-snug',
                isSelected ? 'text-gold' : 'text-foreground',
              )}
            >
              {label}
            </h3>
            {isSelected && <CheckCircle className="w-5 h-5 text-gold shrink-0" />}
          </div>
          {description && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </button>
  )
}
