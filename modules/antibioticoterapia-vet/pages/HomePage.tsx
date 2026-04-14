import { useState, FormEvent, type CSSProperties } from 'react'
import { ArrowRight, Hospital, Pill, Scissors, Stethoscope, Search } from 'lucide-react'
import AnimatedBackground from '../components/AnimatedBackground'
import type { AbvTab } from '../types'

interface HomePageProps {
  onNavigate: (tab: AbvTab) => void
  onSearch: (query: string) => void
}

type LucideIcon = typeof Stethoscope

interface FeatureCardDef {
  tab: AbvTab
  title: string
  description: string
  Icon: LucideIcon
  iconWrapStyle?: CSSProperties
}

const FEATURE_CARDS: FeatureCardDef[] = [
  {
    tab: 'syndrome',
    title: 'Por suspeita clínica',
    description: 'Fluxo guiado por apresentação, com ligação ao catálogo de doses.',
    Icon: Stethoscope,
  },
  {
    tab: 'antibiotics',
    title: 'Antimicrobianos',
    description: 'Condições clínicas e classes com calculadora integrada.',
    Icon: Pill,
  },
  {
    tab: 'hospital',
    title: 'Cenário hospitalar',
    description: 'Resistência, isolamento e cenários críticos.',
    Icon: Hospital,
    iconWrapStyle: {
      background: 'color-mix(in srgb, var(--chart-4) 18%, hsl(var(--card)))',
      borderColor: 'color-mix(in srgb, var(--chart-4) 35%, hsl(var(--border)))',
    },
  },
  {
    tab: 'perioperative',
    title: 'Perioperatório',
    description: 'Profilaxia e conduta cirúrgica (em construção).',
    Icon: Scissors,
    iconWrapStyle: {
      background: 'color-mix(in srgb, hsl(var(--secondary)) 22%, hsl(var(--card)))',
      borderColor: 'color-mix(in srgb, hsl(var(--secondary)) 38%, hsl(var(--border)))',
    },
  },
]

export function HomePage({ onNavigate, onSearch }: HomePageProps) {
  const [q, setQ] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const t = q.trim()
    if (!t) return
    onSearch(t)
  }

  return (
    <div className="flex min-h-full flex-col bg-[hsl(var(--background))]">
      <section className="abv-hero relative min-h-[min(52vh,420px)]">
        <div className="absolute inset-0">
          <AnimatedBackground pillCount={100} />
        </div>
        <div className="abv-hero-scrim" aria-hidden />
        <div className="abv-hero-content mx-auto flex w-full max-w-none flex-col px-4 pb-8 pt-10 md:px-8 md:pb-10 md:pt-14">
          <header className="mb-8 text-center md:mb-10">
            <p
              className="mb-2 text-xs font-semibold uppercase tracking-[0.22em]"
              style={{ color: 'hsl(var(--primary))' }}
            >
              Apoio à decisão clínica
            </p>
            <h1
              className="abv-hero-title text-balance text-3xl md:text-4xl lg:text-5xl"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              Antibioticoterapia Vet
            </h1>
            <p
              className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed md:text-lg"
              style={{ color: 'hsl(var(--muted-foreground))' }}
            >
              Cultura quando importa, espectro o mais estreito possível, duração adequada e decisões explicadas — apoio à
              conduta clínica em cães e gatos.
            </p>
          </header>

          <form onSubmit={submit}>
            <label htmlFor="abv-global-search" className="sr-only">
              Busca global no módulo
            </label>
            <div className="abv-home-search-shell mx-auto max-w-2xl p-1.5 sm:p-2">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-2">
                <div className="abv-home-search-field flex-1">
                  <span className="abv-home-search-icon-wrap" aria-hidden>
                    <Search className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                  <input
                    id="abv-global-search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Buscar antimicrobiano, condição ou palavra-chave…"
                    autoComplete="off"
                    className="abv-home-search-input sm:text-[0.9375rem]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!q.trim()}
                  className="abv-home-search-btn w-full sm:w-auto sm:min-w-[9.75rem]"
                >
                  Buscar
                  <ArrowRight className="h-4 w-4 shrink-0 opacity-95" strokeWidth={2.25} />
                </button>
              </div>
            </div>
            <p className="mt-3 text-center text-xs leading-relaxed sm:text-[0.8125rem]" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Busca: fármacos, patógenos, resistência, hospital e fontes; condições clínicas do catálogo incluem, entre
              outras, piometra, sepse, pneumonia e pielonefrite — em expansão contínua.
            </p>
          </form>
        </div>
      </section>

      <section className="abv-content-stack flex-1 border-t px-4 py-8 md:py-10" style={{ borderColor: 'hsl(var(--border))' }}>
        <div className="mx-auto w-full max-w-none px-4 md:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURE_CARDS.map(({ tab, title, description, Icon, iconWrapStyle }) => (
              <button
                key={tab}
                type="button"
                onClick={() => onNavigate(tab)}
                className="abv-home-feature-card group flex flex-col p-6 text-left"
              >
                <span
                  className="abv-home-icon-wrap mb-4"
                  style={iconWrapStyle}
                >
                  <Icon
                    className="h-6 w-6"
                    style={{
                      color:
                        tab === 'hospital'
                          ? 'var(--chart-4)'
                          : tab === 'perioperative'
                            ? 'hsl(var(--secondary))'
                            : 'hsl(var(--primary))',
                    }}
                  />
                </span>
                <span className="text-base font-semibold leading-snug" style={{ color: 'hsl(var(--foreground))' }}>
                  {title}
                </span>
                <span className="mt-2 text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {description}
                </span>
                <span
                  className="mt-4 inline-flex cursor-pointer items-center gap-1 text-sm font-semibold transition-colors group-hover:opacity-90"
                  style={{ color: 'hsl(var(--primary))' }}
                >
                  Abrir <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </button>
            ))}
          </div>

          <footer className="mt-10 text-center">
            <p
              className="abv-home-footer-note mx-auto max-w-2xl px-5 py-4 text-xs leading-relaxed shadow-sm"
              style={{ color: 'hsl(var(--muted-foreground))' }}
            >
              Ferramenta educacional. Decisões clínicas devem considerar cultura, antibiograma, protocolos institucionais e
              estado do paciente. O conteúdo clínico está em reestruturação contínua.
            </p>
          </footer>
        </div>
      </section>
    </div>
  )
}
