import React from 'react'
import { motion } from 'framer-motion'
import { CalendarClock, Clock, History, Repeat, Zap } from 'lucide-react'
import type { TemporalPattern } from '../../stores/caseStore'
import { TEMPORAL_LABELS } from '../../data/complaintDictionaries'

interface ClockTimelinePickerProps {
  value: TemporalPattern | null
  onChange: (value: TemporalPattern) => void
  disabled?: boolean
}

const TEMPORAL_OPTIONS: Array<{
  id: TemporalPattern
  shortLabel: string
  hint: string
  icon: React.ComponentType<{ className?: string }>
  accent: string
}> = [
  {
    id: 'peragudo',
    shortLabel: 'Peragudo',
    hint: 'Início em menos de 24 horas',
    icon: Zap,
    accent: 'from-red-500/20 to-red-600/5 border-red-500/40',
  },
  {
    id: 'agudo',
    shortLabel: 'Agudo',
    hint: '24 a 48 horas',
    icon: Clock,
    accent: 'from-orange-500/20 to-orange-600/5 border-orange-500/40',
  },
  {
    id: 'subagudo',
    shortLabel: 'Subagudo',
    hint: 'Alguns dias',
    icon: CalendarClock,
    accent: 'from-amber-500/20 to-amber-600/5 border-amber-500/40',
  },
  {
    id: 'cronico',
    shortLabel: 'Crônico',
    hint: 'Semanas ou meses',
    icon: History,
    accent: 'from-yellow-500/20 to-yellow-600/5 border-yellow-500/40',
  },
  {
    id: 'episodico',
    shortLabel: 'Episódico',
    hint: 'Surtos intermitentes',
    icon: Repeat,
    accent: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/40',
  },
]

export function ClockTimelinePicker({ value, onChange, disabled = false }: ClockTimelinePickerProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {TEMPORAL_OPTIONS.map((option) => {
          const isActive = value === option.id
          const Icon = option.icon
          return (
            <motion.button
              key={option.id}
              type="button"
              disabled={disabled}
              whileTap={{ scale: disabled ? 1 : 0.97 }}
              onClick={() => onChange(option.id)}
              className={`relative overflow-hidden rounded-2xl border p-4 text-left transition ${
                isActive
                  ? `bg-gradient-to-br ${option.accent} ring-1 ring-gold/40`
                  : 'border-border bg-background/70 hover:border-gold/35'
              } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              <div
                className={`mb-3 inline-flex rounded-lg p-2 ${
                  isActive ? 'bg-gold/20 text-gold' : 'bg-muted text-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <p className={`text-sm font-semibold ${isActive ? 'text-gold' : 'text-foreground'}`}>
                {option.shortLabel}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{option.hint}</p>
            </motion.button>
          )
        })}
      </div>

      {value && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-center"
        >
          <p className="text-xs uppercase tracking-wide text-gold/80">Selecionado</p>
          <p className="mt-1 text-sm font-semibold text-gold">{TEMPORAL_LABELS[value]}</p>
        </motion.div>
      )}
    </div>
  )
}
