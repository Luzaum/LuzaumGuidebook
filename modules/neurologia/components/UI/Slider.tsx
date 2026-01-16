import React, { useEffect, useRef } from 'react'
import { cn } from '../../../../lib/utils'

interface SliderProps {
  value: number
  min?: number
  max?: number
  step?: number
  onChange: (value: number) => void
  label?: string
  showValue?: boolean
  unit?: string
  className?: string
}

export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label,
  showValue = true,
  unit = '',
  className,
}: SliderProps) {
  const sliderRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (sliderRef.current) {
      const percentage = ((value - min) / (max - min)) * 100
      sliderRef.current.style.setProperty(
        '--slider-progress',
        `${percentage}%`,
      )
    }
  }, [value, min, max])

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-white/70">{label}</label>
          {showValue && (
            <span className="text-sm font-medium text-gold">
              {value}
              {unit}
            </span>
          )}
        </div>
      )}
      <input
        ref={sliderRef}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  )
}
