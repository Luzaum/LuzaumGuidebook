import { Check, Layers3, Leaf, PackageCheck } from 'lucide-react'
import type { DietType } from '../types'
import { cn } from '../lib/utils'

export const DIET_CATALOG_TITLE: Record<DietType, string> = {
  commercial: 'Catálogo comercial',
  natural: 'Catálogo natural',
  hybrid: 'Catálogo híbrido',
}

const OPTIONS = [
  {
    value: 'commercial' as const,
    label: 'Comercial',
    description: 'Rações e fórmulas prontas',
    icon: PackageCheck,
  },
  {
    value: 'natural' as const,
    label: 'Natural',
    description: 'Ingredientes e suplementos',
    icon: Leaf,
  },
  {
    value: 'hybrid' as const,
    label: 'Híbrida',
    description: 'Combinação das duas bases',
    icon: Layers3,
  },
]

export interface DietTypeCardsProps {
  value: DietType
  onChange: (value: DietType) => void
}

export function DietTypeCards({ value, onChange }: DietTypeCardsProps) {
  return (
    <div className="w-full">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Estratégia alimentar</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Escolha a origem dos alimentos da fórmula.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Selecionar estratégia alimentar">
        {OPTIONS.map((option) => {
          const Icon = option.icon
          const active = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.value)}
              className={cn(
                'group relative flex min-h-[92px] cursor-pointer items-center gap-3 rounded-2xl border p-3.5 text-left outline-none transition-colors duration-200 focus-visible:ring-3 focus-visible:ring-ring/25',
                active
                  ? 'border-primary/45 bg-primary/[0.07] text-foreground'
                  : 'border-border bg-card text-foreground hover:border-primary/25 hover:bg-muted/55',
              )}
            >
              <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground group-hover:text-primary')}>
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{option.label}</span>
                <span className="mt-1 block text-xs leading-snug text-muted-foreground">{option.description}</span>
              </span>
              {active && (
                <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
