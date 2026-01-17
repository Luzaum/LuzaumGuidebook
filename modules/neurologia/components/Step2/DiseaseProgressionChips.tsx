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
  bgColor: string
  borderColor: string
  textColor: string
}> = [
  {
    id: 'melhorando',
    label: 'Melhorando',
    color: '#22c55e',
    bgColor: 'bg-green-900/30',
    borderColor: 'border-green-500',
    textColor: 'text-green-400',
  },
  {
    id: 'estatico',
    label: 'Estático',
    color: '#eab308',
    bgColor: 'bg-yellow-900/30',
    borderColor: 'border-yellow-500',
    textColor: 'text-yellow-400',
  },
  {
    id: 'flutuante',
    label: 'Flutuante',
    color: '#f97316',
    bgColor: 'bg-orange-900/30',
    borderColor: 'border-orange-500',
    textColor: 'text-orange-400',
  },
  {
    id: 'progressivo',
    label: 'Progressivo',
    color: '#ef4444',
    bgColor: 'bg-red-900/30',
    borderColor: 'border-red-500',
    textColor: 'text-red-400',
  },
]

export function DiseaseProgressionChips({
  value,
  onChange,
  disabled = false,
}: DiseaseProgressionChipsProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {PROGRESSION_OPTIONS.map((option) => {
          const isSelected = value === option.id
          return (
            <motion.button
              key={option.id}
              type="button"
              onClick={() => !disabled && onChange(option.id)}
              disabled={disabled}
              whileTap={disabled ? {} : { scale: 0.95 }}
              className={`
                px-4 py-3 rounded-lg border-2 font-medium text-sm transition-all
                ${
                  isSelected
                    ? `${option.bgColor} ${option.borderColor} ${option.textColor} shadow-[0_0_12px_${option.color}40]`
                    : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300'
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-neutral-400 italic"
        >
          Impacta diferenciais e urgência do caso
        </motion.p>
      )}
    </div>
  )
}
