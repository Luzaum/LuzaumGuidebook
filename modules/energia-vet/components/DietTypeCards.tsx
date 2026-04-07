import { Check } from 'lucide-react'
import type { DietType } from '../types'
import { cn } from '../lib/utils'

export const DIET_CATALOG_TITLE: Record<DietType, string> = {
  commercial: 'Catálogo comercial',
  natural: 'Catálogo Natural',
  hybrid: 'Catálogo Híbrido',
}

/** Ilustrações por tipo (mesma área e escala para as três) */
const DIET_IMAGES: Record<DietType, string> = {
  commercial: '/diet-comercial-illustration.png',
  natural: '/diet-natural-illustration.png',
  hybrid: '/diet-hibrido-illustration.png',
}

type Option = {
  value: DietType
  label: string
  description: string
}

const OPTIONS: Option[] = [
  { value: 'commercial', label: 'Comercial', description: 'Rações secas, úmidas e fórmulas prontas.' },
  { value: 'natural', label: '100% Natural', description: 'Ingredientes naturais, suplementos e bases.' },
  { value: 'hybrid', label: 'Híbrida', description: 'Combina comercial e natural no mesmo plano.' },
]

export interface DietTypeCardsProps {
  value: DietType
  onChange: (v: DietType) => void
}

export function DietTypeCards({ value, onChange }: DietTypeCardsProps) {
  return (
    <div className="w-full">
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Tipo de dieta</p>
      <div className="mx-auto w-full max-w-4xl" role="radiogroup" aria-label="Selecionar tipo de dieta">
        <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {OPTIONS.map((option) => {
            const active = value === option.value
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={active}
                title={`${option.label} — ${option.description}`}
                aria-label={`${option.label}. ${option.description}`}
                onClick={() => onChange(option.value)}
                className={cn(
                  'relative flex min-h-[9.5rem] flex-col items-stretch justify-between gap-2 rounded-2xl border-2 px-2 py-3 text-center transition-colors sm:min-h-[11rem] sm:px-3 sm:py-4 lg:min-h-[12rem]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  active
                    ? 'border-orange-500 bg-orange-500/15 text-foreground shadow-sm dark:bg-orange-500/10 dark:text-white'
                    : 'border-border bg-muted/50 text-muted-foreground hover:border-orange-400/40 hover:bg-muted/80 dark:border-white/10 dark:bg-black/20 dark:hover:border-white/20',
                )}
              >
                {active ? (
                  <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white shadow-md sm:right-2.5 sm:top-2.5 sm:h-7 sm:w-7">
                    <Check className="h-3.5 w-3.5 stroke-[3] sm:h-4 sm:w-4" aria-hidden />
                  </span>
                ) : null}

                {/* Área fixa igual para as 3 imagens — padronizado visível */}
                <span className="mx-auto flex h-28 w-full max-w-[10rem] shrink-0 items-center justify-center sm:h-32 sm:max-w-[11.5rem] lg:h-36 lg:max-w-[13rem]">
                  <img
                    src={DIET_IMAGES[option.value]}
                    alt=""
                    width={256}
                    height={256}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="max-h-full max-w-full object-contain object-center select-none"
                  />
                </span>

                <span
                  className={cn(
                    'mt-1 text-[11px] font-semibold leading-tight sm:text-xs lg:text-[13px]',
                    active ? 'text-foreground dark:text-white' : 'text-foreground/90 dark:text-white/90',
                  )}
                >
                  {option.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
