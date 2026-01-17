import React, { useState, useRef, useCallback } from 'react'
import { Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import type { TemporalPattern } from '../../stores/caseStore'

interface ClockTimelinePickerProps {
  value: TemporalPattern | null
  onChange: (value: TemporalPattern) => void
  disabled?: boolean
}

const PATTERNS: Array<{ id: TemporalPattern; label: string; position: number; color: string }> = [
  { id: 'peragudo', label: 'Peragudo (<24h)', position: 5, color: '#ef4444' }, // vermelho
  { id: 'agudo', label: 'Agudo (24-48h)', position: 20, color: '#f97316' }, // laranja
  { id: 'subagudo', label: 'Subagudo (dias)', position: 43, color: '#fb923c' }, // laranja claro
  { id: 'cronico', label: 'Crônico (semanas/meses)', position: 68, color: '#fbbf24' }, // amarelo
  { id: 'episodico', label: 'Episódico', position: 90, color: '#facc15' }, // amarelo claro
]

function getPatternFromPosition(pos: number): TemporalPattern {
  if (pos <= 10) return 'peragudo'
  if (pos <= 30) return 'agudo'
  if (pos <= 55) return 'subagudo'
  if (pos <= 80) return 'cronico'
  return 'episodico'
}

function getPositionFromPattern(pattern: TemporalPattern | null): number {
  if (!pattern) return 0
  const found = PATTERNS.find((p) => p.id === pattern)
  return found?.position || 0
}

export function ClockTimelinePicker({
  value,
  onChange,
  disabled = false,
}: ClockTimelinePickerProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [hoverPosition, setHoverPosition] = useState<number | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const currentPosition = getPositionFromPattern(value)
  const displayPosition = hoverPosition ?? currentPosition

  const handleMouseMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current || disabled) return
      const rect = sliderRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      const pattern = getPatternFromPosition(percentage)
      onChange(pattern)
      setHoverPosition(null)
    },
    [onChange, disabled],
  )

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return
    setIsDragging(true)
    handleMouseMove(e.clientX)
  }

  const handleMouseMoveGlobal = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        handleMouseMove(e.clientX)
      }
    },
    [isDragging, handleMouseMove],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setHoverPosition(null)
  }, [])

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMoveGlobal)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMoveGlobal)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMoveGlobal, handleMouseUp])

  const handleLabelClick = (pattern: TemporalPattern) => {
    if (disabled) return
    onChange(pattern)
  }

  const handleMouseEnter = (position: number) => {
    if (!disabled && !isDragging) {
      setHoverPosition(position)
    }
  }

  const handleMouseLeave = () => {
    if (!isDragging) {
      setHoverPosition(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-6">
        {/* Relógio Grande */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-gold/20 border-2 border-gold/40 flex items-center justify-center">
            <Clock className="w-12 h-12 text-gold" />
          </div>
        </div>

        {/* Barra Gradiente */}
        <div className="flex-1 pt-2">
          <div
            ref={sliderRef}
            className="relative h-12 cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
          >
            {/* Gradiente de Fundo */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(to right, #ef4444 0%, #f97316 30%, #fb923c 50%, #fbbf24 70%, #facc15 100%)',
                opacity: 0.3,
              }}
            />

            {/* Barra Preenchida */}
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 transition-all duration-200"
              style={{
                width: `${displayPosition}%`,
                opacity: 0.6,
              }}
            />

            {/* Marcador Atual */}
            {displayPosition > 0 && (
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gold border-2 border-white shadow-lg"
                style={{
                  left: `calc(${displayPosition}% - 12px)`,
                }}
                animate={{
                  scale: isDragging ? 1.2 : 1,
                }}
                transition={{ duration: 0.1 }}
              />
            )}

            {/* Indicadores de Posições */}
            {PATTERNS.map((pattern) => (
              <div
                key={pattern.id}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/60"
                style={{ left: `calc(${pattern.position}% - 4px)` }}
                onMouseEnter={() => handleMouseEnter(pattern.position)}
              />
            ))}
          </div>

          {/* Labels */}
          <div className="relative mt-4 h-12">
            {PATTERNS.map((pattern) => {
              const isActive = value === pattern.id
              return (
                <button
                  key={pattern.id}
                  type="button"
                  onClick={() => handleLabelClick(pattern.id)}
                  disabled={disabled}
                  className="absolute top-0 text-xs font-medium transition-all transform -translate-x-1/2 cursor-pointer"
                  style={{
                    left: `${pattern.position}%`,
                    color: isActive ? '#f5c542' : '#a3a3a3',
                  }}
                  onMouseEnter={() => !disabled && setHoverPosition(pattern.position)}
                  onMouseLeave={() => !isDragging && setHoverPosition(null)}
                >
                  <div
                    className={`px-2 py-1 rounded transition-all ${
                      isActive
                        ? 'bg-gold/20 text-gold scale-110'
                        : 'hover:bg-white/5 hover:text-white/80'
                    }`}
                  >
                    {pattern.label.split(' ')[0]}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Label Completo do Padrão Selecionado */}
      {value && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="text-sm font-semibold text-gold">
            {PATTERNS.find((p) => p.id === value)?.label}
          </span>
        </motion.div>
      )}
    </div>
  )
}
