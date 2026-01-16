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
        'flex p-1 bg-white/5 rounded-xl border border-white/10',
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
              'flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
              isActive
                ? 'bg-gold text-neutral-deep shadow-lg'
                : 'text-white/60 hover:text-white hover:bg-white/5',
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
