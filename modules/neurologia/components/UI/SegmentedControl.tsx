import React from 'react'
import { cn } from '../../../../lib/utils'

interface SegmentedOption {
  label: string
  value: string
  icon?: React.ReactNode
}

interface SegmentedControlProps {
  options: SegmentedOption[]
  value: string | null
  onChange: (value: string) => void
  className?: string
}

export function SegmentedControl({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps) {
  return (
    <div
      className={cn(
        'flex p-1 bg-muted/60 rounded-xl border border-border',
        className,
      )}
    >
      {options.map((option) => {
        const isActive = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all',
              isActive
                ? 'bg-gold text-slate-950 shadow-md ring-1 ring-gold/40'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50',
            )}
          >
            {option.icon}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
