import { useState, FormEvent } from 'react'
import { ArrowRight, Hospital, Pill, Scissors, Stethoscope, Search } from 'lucide-react'
import AnimatedBackground from '../components/AnimatedBackground'
import type { AbvTab } from '../types'

interface HomePageProps {
  onNavigate: (tab: AbvTab) => void
  onSearch: (query: string) => void
}

export function HomePage({ onNavigate, onSearch }: HomePageProps) {
  const [q, setQ] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const t = q.trim()
    if (!t) return
    onSearch(t)
  }

  return (
    <div className="flex min-h-full flex-col bg-[var(--background)]">
      {/* Hero: única área com pills animadas + conteúdo legível acima do scrim */}
      <section className="abv-hero relative min-h-[min(52vh,420px)]">
        <div className="absolute inset-0">
          <AnimatedBackground pillCount={100} />
        </div>
        <div className="abv-hero-scrim" aria-hidden />
        <div className="abv-hero-content mx-auto flex max-w-5xl flex-col px-4 pb-8 pt-10 md:pb-10 md:pt-14">
          <header className="mb-8 text-center md:mb-10">
            <p
              className="mb-2 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: 'var(--primary)' }}
            >
              Stewardship antimicrobiano
            </p>
            <h1
              className="text-balance font-serif text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl"
              style={{ color: 'var(--foreground)' }}
            >
              Antibioticoterapia Vet
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base md:text-lg" style={{ color: 'var(--muted-foreground)' }}>
              Cultura quando importa, espectro o mais estreito possível, duração adequada e decisões explicadas — apoio à
              conduta clínica em cães e gatos.
            </p>
          </header>

          <form onSubmit={submit}>
            <label htmlFor="abv-global-search" className="sr-only">
              Busca global no módulo
            </label>
            <div className="abv-panel mx-auto flex max-w-2xl flex-col gap-2 p-2 shadow-md md:flex-row md:items-center">
              <div className="flex flex-1 items-center gap-2 px-3">
                <Search className="h-5 w-5 shrink-0" style={{ color: 'var(--primary)' }} aria-hidden />
                <input
                  id="abv-global-search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar antimicrobiano, condição ou palavra-chave…"
                  className="abv-input min-w-0 flex-1 border-0 bg-transparent py-3 text-sm focus:ring-0 md:text-base"
                  style={{ color: 'var(--foreground)' }}
                />
              </div>
              <button
                type="submit"
                disabled={!q.trim()}
                className="abv-btn-primary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                Buscar
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Busca unificada: síndromes, antimicrobianos, patógenos, resistência, alertas hospitalares, registro de fontes e,
              por último, catálogo legado quando houver correspondência.
            </p>
          </form>
        </div>
      </section>

      {/* Conteúdo funcional: superfície opaca, sem animação por baixo */}
      <section className="abv-content-stack flex-1 border-t px-4 py-8 md:py-10" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button
              type="button"
              onClick={() => onNavigate('syndrome')}
              className="abv-panel group flex flex-col p-5 text-left shadow-sm transition hover:shadow-md"
            >
              <span
                className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-md abv-badge-soft"
              >
                <Stethoscope className="h-6 w-6" style={{ color: 'var(--primary)' }} />
              </span>
              <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
                Por suspeita clínica
              </span>
              <span className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Conduta por síndrome enquanto o novo catálogo é integrado.
              </span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--primary)' }}>
                Abrir <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('antibiotics')}
              className="abv-panel group flex flex-col p-5 text-left shadow-sm transition hover:shadow-md"
            >
              <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-md abv-badge-soft">
                <Pill className="h-6 w-6" style={{ color: 'var(--primary)' }} />
              </span>
              <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
                Antimicrobianos
              </span>
              <span className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Fichas, PK/PD e cautelas por fármaco.
              </span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--primary)' }}>
                Abrir <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('hospital')}
              className="abv-panel group flex flex-col p-5 text-left shadow-sm transition hover:shadow-md"
            >
              <span
                className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-md border"
                style={{
                  background: 'color-mix(in srgb, var(--chart-4) 18%, var(--card))',
                  borderColor: 'color-mix(in srgb, var(--chart-4) 35%, var(--border))',
                }}
              >
                <Hospital className="h-6 w-6" style={{ color: 'var(--chart-4)' }} />
              </span>
              <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
                Hospitalar / CCIH
              </span>
              <span className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Resistência, isolamento e cenários críticos.
              </span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--primary)' }}>
                Abrir <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('perioperative')}
              className="abv-panel group flex flex-col p-5 text-left shadow-sm transition hover:shadow-md"
            >
              <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-md abv-badge-soft">
                <Scissors className="h-6 w-6" style={{ color: 'var(--secondary)' }} />
              </span>
              <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
                Perioperatório
              </span>
              <span className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Profilaxia e conduta cirúrgica (em construção).
              </span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--primary)' }}>
                Abrir <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </button>
          </div>

          <footer className="mt-10 text-center">
            <p className="abv-panel mx-auto max-w-2xl px-4 py-3 text-xs shadow-sm" style={{ color: 'var(--muted-foreground)' }}>
              Ferramenta educacional. Decisões clínicas devem considerar cultura, antibiograma, protocolos institucionais e
              estado do paciente. Conteúdo clínico em reestruturação alinhado ao stewardship.
            </p>
          </footer>
        </div>
      </section>
    </div>
  )
}
