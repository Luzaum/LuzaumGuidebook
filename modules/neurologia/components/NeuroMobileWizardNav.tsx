import React from 'react'
import { Menu, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type NeuroWizardStepItem = {
  step: number
  label: string
  desc: string
  icon: LucideIcon
}

type NeuroMobileWizardNavProps = {
  steps: NeuroWizardStepItem[]
  currentStep: number
  onSelectStep: (step: number) => void
}

/**
 * Navegação das etapas do caso no mobile (equivalente ao aside desktop).
 */
export function NeuroMobileWizardNav({ steps, currentStep, onSelectStep }: NeuroMobileWizardNavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div className="sticky top-14 z-30 -mx-4 mb-3 flex items-center justify-between gap-2 border-b border-border bg-background/95 px-4 py-2 backdrop-blur-sm lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-sm transition hover:border-gold/50 hover:bg-card/80"
          aria-expanded={open}
          aria-controls="neuro-mobile-wizard-sheet"
        >
          <Menu className="h-4 w-4 text-gold" aria-hidden />
          Etapas do caso
        </button>
        <span className="truncate text-right text-xs text-muted-foreground">
          Etapa {currentStep} de {steps.length}
        </span>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" id="neuro-mobile-wizard-sheet" role="dialog" aria-modal="true" aria-label="Etapas do caso">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Fechar menu de etapas"
            onClick={() => setOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[min(78dvh,32rem)] overflow-hidden rounded-t-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="text-sm font-semibold text-foreground">Ir para etapa</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="max-h-[calc(min(78dvh,32rem)-3.5rem)] space-y-2 overflow-y-auto p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {steps.map((item) => {
                const Icon = item.icon
                const isActive = item.step === currentStep
                const isDone = item.step < currentStep
                return (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => {
                      onSelectStep(item.step)
                      setOpen(false)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className={`w-full rounded-2xl border px-3 py-3 text-left transition ${
                      isActive
                        ? 'border-gold/60 bg-gold/15 shadow-[0_8px_30px_rgba(245,197,66,0.12)]'
                        : isDone
                          ? 'border-emerald-400/30 bg-emerald-400/10 hover:border-emerald-400/50'
                          : 'border-border bg-background/60 hover:border-gold/40 hover:bg-muted/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-xl p-2 ${
                          isActive
                            ? 'bg-gold/25 text-gold'
                            : isDone
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-foreground">
                          Etapa {item.step}: {item.label}
                        </div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
