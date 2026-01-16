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
        'w-full p-4 rounded-xl border transition-all duration-200 text-left',
        'hover:border-gold/50 hover:bg-gold/5',
        isSelected
          ? 'border-gold bg-gold/10'
          : 'border-white/10 bg-white/5',
      )}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div
            className={cn(
              'p-2 rounded-lg',
              isSelected ? 'bg-gold/20 text-gold' : 'bg-white/10 text-white/60',
            )}
          >
            {icon}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3
              className={cn(
                'font-medium',
                isSelected ? 'text-gold' : 'text-white',
              )}
            >
              {label}
            </h3>
            {isSelected && <CheckCircle className="w-5 h-5 text-gold" />}
          </div>
          {description && (
            <p className="text-sm text-white/60 mt-1">{description}</p>
          )}
        </div>
      </div>
    </button>
  )
}
