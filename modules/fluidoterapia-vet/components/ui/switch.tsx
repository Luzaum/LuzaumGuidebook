"use client"

import { cn } from '../../lib/utils'

function Switch({
  className,
  size = 'default',
  checked,
  onCheckedChange,
  disabled,
}: {
  className?: string
  size?: 'sm' | 'default'
  checked?: boolean
  onCheckedChange?: (value: boolean) => void
  disabled?: boolean
}) {
  const isChecked = Boolean(checked)

  return (
    <button
      type="button"
      data-slot="switch"
      data-size={size}
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      className={cn(
        'relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50',
        size === 'sm' ? 'h-5 w-9' : 'h-6 w-11',
        isChecked ? 'bg-primary' : 'bg-input dark:bg-input/80',
        className,
      )}
      onClick={() => onCheckedChange?.(!isChecked)}
    >
      <span
        data-slot="switch-thumb"
        className={cn(
          'absolute left-0.5 top-0.5 block rounded-full bg-background shadow-sm transition-transform',
          size === 'sm' ? 'h-4 w-4' : 'h-5 w-5',
          isChecked && (size === 'sm' ? 'translate-x-4' : 'translate-x-5'),
        )}
      />
    </button>
  )
}

export { Switch }
