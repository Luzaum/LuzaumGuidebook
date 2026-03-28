"use client"

import { cn } from '../../lib/utils'

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  step,
  onValueChange,
}: {
  className?: string
  defaultValue?: number[]
  value?: number[]
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number[]) => void
}) {
  const currentValue = Array.isArray(value)
    ? value[0]
    : Array.isArray(defaultValue)
      ? defaultValue[0]
      : min

  return (
    <div className={cn('w-full', className)} data-slot="slider">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        className="fluidoterapia-vet-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-[hsl(var(--primary))]"
        onChange={(event) => onValueChange?.([Number(event.target.value)])}
      />
    </div>
  )
}

export { Slider }
