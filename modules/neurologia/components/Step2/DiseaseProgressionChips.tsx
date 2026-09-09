import React from 'react'
import { motion } from 'framer-motion'
import type { EvolutionPattern } from '../../stores/caseStore'

interface DiseaseProgressionChipsProps {
  value: EvolutionPattern | null
  onChange: (value: EvolutionPattern) => void
  disabled?: boolean
}

const PROGRESSION_OPTIONS: Array<{
  id: EvolutionPattern
  label: string
  color: string
  selectedClasses: string
}> = [
  {
    id: 'melhorando',
    label: 'Melhorando',
    color: '#22c55e',
    selectedClasses:
      'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 dark:bg-emerald-950/30 ring-1 ring-emerald-500/40',
  },
  {
    id: 'melhora_parcial',
    label: 'Melhora parcial',
    color: '#10b981',
    selectedClasses:
      'bg-teal-500/15 border-teal-500 text-teal-700 dark:text-teal-300 dark:bg-teal-950/30 ring-1 ring-teal-500/40',
  },
  {
    id: 'estático',
    label: 'Estático',
    color: '#eab308',
    selectedClasses:
      'bg-yellow-500/15 border-yellow-500 text-yellow-700 dark:text-yellow-300 dark:bg-yellow-950/30 ring-1 ring-yellow-500/40',
  },
  {
    id: 'flutuante',
    label: 'Flutuante',
    color: '#f97316',
    selectedClasses:
      'bg-orange-500/15 border-orange-500 text-orange-700 dark:text-orange-300 dark:bg-orange-950/30 ring-1 ring-orange-500/40',
  },
  {
    id: 'progressivo',
    label: 'Progressivo',
    color: '#ef4444',
    selectedClasses:
      'bg-red-500/15 border-red-500 text-red-700 dark:text-red-300 dark:bg-red-950/30 ring-1 ring-red-500/40',
  },
  {
    id: 'assintomatico_entre_episodios',
    label: 'Assintomático entre episódios',
    color: '#06b6d4',
    selectedClasses:
      'bg-cyan-500/15 border-cyan-500 text-cyan-700 dark:text-cyan-300 dark:bg-cyan-950/30 ring-1 ring-cyan-500/40',
  },
]

export function DiseaseProgressionChips({
  value,
  onChange,
  disabled = false,
}: DiseaseProgressionChipsProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2.5">
        {PROGRESSION_OPTIONS.map((option) => {
          const isSelected = value === option.id
          return (
            <motion.button
              key={option.id}
              type="button"
              onClick={() => !disabled && onChange(option.id)}
              disabled={disabled}
              whileTap={disabled ? {} : { scale: 0.96 }}
              style={isSelected ? { boxShadow: `0 0 14px ${option.color}33` } : undefined}
              className={`
                px-3.5 py-2 rounded-xl border font-semibold text-xs sm:text-sm transition-all
                ${
                  isSelected
                    ? option.selectedClasses
                    : 'bg-card border-border text-muted-foreground hover:border-gold/45 hover:text-foreground hover:bg-muted/40'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {option.label}
            </motion.button>
          )
        })}
      </div>
      {value && (
        <motion.p
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-muted-foreground italic"
        >
          Característica temporal integrada aos diferenciais etiológicos.
        </motion.p>
      )}
    </div>
  )
}
