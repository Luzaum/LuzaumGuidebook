import React, { useState, useRef, useCallback } from 'react'
import { Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import type { TemporalPattern } from '../../stores/caseStore'
import { TEMPORAL_LABELS } from '../../data/complaintDictionaries'

interface ClockTimelinePickerProps {
  value: TemporalPattern | null
  onChange: (value: TemporalPattern) => void
  disabled?: boolean
}

/** Padrões principais no slider (curso temporal clássico). */
const MAIN_PATTERNS: Array<{ id: TemporalPattern; label: string; position: number; color: string }> = [
  { id: 'peragudo', label: TEMPORAL_LABELS.peragudo, position: 5, color: '#ef4444' },
  { id: 'agudo', label: TEMPORAL_LABELS.agudo, position: 20, color: '#f97316' },
  { id: 'subagudo', label: TEMPORAL_LABELS.subagudo, position: 43, color: '#fb923c' },
  { id: 'cronico', label: TEMPORAL_LABELS.cronico, position: 68, color: '#fbbf24' },
  { id: 'episodico', label: TEMPORAL_LABELS.episodico, position: 90, color: '#facc15' },
]

const REFINEMENT_PATTERNS: Array<{ id: TemporalPattern; label: string; position: number }> = [
  { id: 'insidioso', label: TEMPORAL_LABELS.insidioso, position: 62 },
  { id: 'oscilante', label: TEMPORAL_LABELS.oscilante, position: 78 },
  { id: 'recorrente', label: TEMPORAL_LABELS.recorrente, position: 94 },
]

const MAIN_IDS = new Set(MAIN_PATTERNS.map((p) => p.id))

function getMainPatternFromPosition(pos: number): TemporalPattern {
  let nearest = MAIN_PATTERNS[0]
  let min = 100
  for (const p of MAIN_PATTERNS) {
    const d = Math.abs(pos - p.position)
    if (d < min) {
      min = d
      nearest = p
    }
  }
  return nearest.id
}

function getPatternFromPosition(pos: number): TemporalPattern {
  return getMainPatternFromPosition(pos)
}

function getPositionFromPattern(pattern: TemporalPattern | null): number {
  if (!pattern) return 0
  const main = MAIN_PATTERNS.find((p) => p.id === pattern)
  if (main) return main.position
  const ref = REFINEMENT_PATTERNS.find((p) => p.id === pattern)
  return ref?.position ?? 0
}

function labelForPattern(pattern: TemporalPattern | null): string | undefined {
  if (!pattern) return undefined
  return TEMPORAL_LABELS[pattern]
}

export function ClockTimelinePicker({
  value,
  onChange,
  disabled = false,
}: ClockTimelinePickerProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [hoverPosition, setHoverPosition] = useState<number | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const lastPctRef = useRef(0)

  const currentPosition = getPositionFromPattern(value)
  const displayPosition = hoverPosition ?? currentPosition

  const handleMouseMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current || disabled) return
      const rect = sliderRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100))
      lastPctRef.current = pct
      setHoverPosition(pct)
    },
    [disabled],
  )

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return
    setIsDragging(true)
    handleMouseMove(e.clientX)
  }

  const handleMouseMoveGlobal = useCallback(
    (e: MouseEvent) => {
      handleMouseMove(e.clientX)
    },
    [handleMouseMove],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    if (!disabled) {
      onChange(getPatternFromPosition(lastPctRef.current))
    }
    setHoverPosition(null)
  }, [disabled, onChange])

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

  const handleRefinementClick = (id: TemporalPattern) => {
    if (disabled) return
    if (value === id) {
      onChange('cronico')
      return
    }
    onChange(id)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold/40 bg-gold/20">
            <Clock className="h-12 w-12 text-gold" />
          </div>
        </div>

        <div className="flex-1 pt-2">
          <div
            ref={sliderRef}
            className="relative h-12 cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(to right, #ef4444 0%, #f97316 30%, #fb923c 50%, #fbbf24 70%, #facc15 100%)',
                opacity: 0.3,
              }}
            />

            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 transition-all duration-200"
              style={{
                width: `${displayPosition}%`,
                opacity: 0.6,
              }}
            />

            {displayPosition > 0 && (
              <motion.div
                className="absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-2 border-white bg-gold shadow-lg"
                style={{
                  left: `calc(${displayPosition}% - 12px)`,
                }}
                animate={{
                  scale: isDragging ? 1.2 : 1,
                }}
                transition={{ duration: 0.1 }}
              />
            )}

            {MAIN_PATTERNS.map((pattern) => (
              <div
                key={pattern.id}
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white/60"
                style={{ left: `calc(${pattern.position}% - 4px)` }}
                onMouseEnter={() => handleMouseEnter(pattern.position)}
              />
            ))}
            {REFINEMENT_PATTERNS.map((pattern) => (
              <div
                key={`r-${pattern.id}`}
                className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-400/80 ring-1 ring-cyan-300/50"
                style={{ left: `calc(${pattern.position}% - 3px)` }}
                title={pattern.label}
              />
            ))}
          </div>

          <div className="relative mt-4 h-12">
            {MAIN_PATTERNS.map((pattern) => {
              const isActive = value === pattern.id
              return (
                <button
                  key={pattern.id}
                  type="button"
                  onClick={() => handleLabelClick(pattern.id)}
                  disabled={disabled}
                  className="absolute top-0 -translate-x-1/2 transform cursor-pointer text-xs font-medium transition-all"
                  style={{
                    left: `${pattern.position}%`,
                    color: isActive ? '#f5c542' : '#a3a3a3',
                  }}
                  onMouseEnter={() => !disabled && setHoverPosition(pattern.position)}
                  onMouseLeave={() => !isDragging && setHoverPosition(null)}
                >
                  <div
                    className={`rounded px-2 py-1 transition-all ${
                      isActive
                        ? 'scale-110 bg-gold/20 text-gold'
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

      <div className="rounded-xl border border-border/60 bg-background/40 p-3">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Refinamentos temporais (cap. 1 — curso em exceções)</p>
        <div className="flex flex-wrap gap-2">
          {REFINEMENT_PATTERNS.map((p) => {
            const active = value === p.id
            return (
              <button
                key={p.id}
                type="button"
                disabled={disabled}
                onClick={() => handleRefinementClick(p.id)}
                className={`rounded-lg border px-3 py-2 text-left text-xs transition ${
                  active
                    ? 'border-cyan-400/60 bg-cyan-500/15 text-cyan-100'
                    : 'border-border bg-background/60 text-muted-foreground hover:border-cyan-500/40'
                }`}
              >
                {p.label}
              </button>
            )
          })}
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground/90">
          Arrastar a barra define peragudo → episódico; use os refinamentos para insidioso, oscilante ou recorrente. Clicar
          novamente no refinamento ativo volta a um padrão crônico como referência.
        </p>
      </div>

      {value && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="text-sm font-semibold text-gold">{labelForPattern(value)}</span>
          {value && !MAIN_IDS.has(value) && (
            <span className="mt-1 block text-xs text-muted-foreground">Refinamento ativo (compatível com DDx do livro-base)</span>
          )}
        </motion.div>
      )}
    </div>
  )
}
