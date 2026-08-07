import { cn } from '../lib/utils'
import { getSelectableComorbidities } from '../lib/canonical/comorbidityCatalog'
import type { Species } from '../types'

interface ComorbidityPickerProps {
  species: Species
  value: string[]
  onChange: (ids: string[]) => void
  disabled?: boolean
}

export function ComorbidityPicker({ species, value, onChange, disabled }: ComorbidityPickerProps) {
  const options = getSelectableComorbidities(species)
  const groups = Array.from(new Set(options.map((option) => option.group)))

  const toggle = (id: string) => {
    if (disabled) return
    if (value.includes(id)) {
      onChange(value.filter((item) => item !== id))
      return
    }
    onChange([...value, id])
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">Condicionantes clínicos</h2>
        <p className="text-xs text-muted-foreground">
          Opcional. Selecione diagnósticos relevantes para metas nutricionais terapêuticas — não alteram a energia de
          manutenção automaticamente.
        </p>
      </div>
      {groups.map((group) => (
        <div key={group}>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{group}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {options
              .filter((option) => option.group === group)
              .map((option) => {
                const active = value.includes(option.id)
                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => toggle(option.id)}
                    className={cn(
                      'min-h-[4.25rem] rounded-xl border px-3 py-2 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60',
                      active
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/40 hover:bg-muted/40',
                    )}
                  >
                    <p className="text-sm font-semibold leading-tight">{option.label}</p>
                    {option.description && (
                      <p className="mt-0.5 line-clamp-2 text-[11px] leading-4 text-muted-foreground">
                        {option.description}
                      </p>
                    )}
                    {option.bookChapter && (
                      <p className="mt-1 text-[10px] leading-4 text-muted-foreground/80">{option.bookChapter}</p>
                    )}
                  </button>
                )
              })}
          </div>
        </div>
      ))}
    </div>
  )
}
