import { cn } from '../lib/utils'
import type { Species } from '../types'
import catPlayful from '../assets/species/cat-playful.png'
import dogPlayful from '../assets/species/dog-playful.png'

interface SpeciesSilhouetteProps {
  species: Species
  className?: string
}

const SPECIES_ART: Record<Species, { src: string; alt: string }> = {
  cat: { src: catPlayful, alt: 'Ilustração de gato' },
  dog: { src: dogPlayful, alt: 'Ilustração de cão' },
}

export function SpeciesSilhouette({ species, className }: SpeciesSilhouetteProps) {
  const art = SPECIES_ART[species]

  return (
    <img
      src={art.src}
      alt={art.alt}
      aria-hidden
      draggable={false}
      className={cn('h-16 w-16 object-contain select-none', className)}
    />
  )
}

interface SpeciesPickerCardProps {
  species: Species
  title: string
  active: boolean
  onSelect: () => void
}

export function SpeciesPickerCard({ species, title, active, onSelect }: SpeciesPickerCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onSelect}
      className={cn(
        'group relative flex min-h-[132px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border px-4 py-5 text-center outline-none transition-all duration-200 focus-visible:ring-3 focus-visible:ring-ring/25',
        active
          ? 'border-primary/50 bg-gradient-to-b from-primary/[0.12] to-primary/[0.04] shadow-sm'
          : 'border-border bg-card hover:border-primary/25 hover:bg-muted/45',
      )}
    >
      <span
        className={cn(
          'flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl transition-all duration-200',
          active ? 'bg-white/90 shadow-sm ring-1 ring-primary/15' : 'bg-white/70 group-hover:bg-white/85',
        )}
      >
        <SpeciesSilhouette
          species={species}
          className={cn('h-[4.5rem] w-[4.5rem] transition-transform duration-200', active ? 'scale-105' : 'scale-100')}
        />
      </span>
      <span className={cn('text-base font-semibold', active ? 'text-primary' : 'text-foreground')}>{title}</span>
      {active && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden>
            <path
              d="M3.5 8.5 6.5 11.5 12.5 4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </button>
  )
}
