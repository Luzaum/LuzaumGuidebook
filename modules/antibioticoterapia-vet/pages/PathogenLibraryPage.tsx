import { useEffect, useRef } from 'react'
import Icon from '../components/Icon'
import { InstitutionalProvenanceStrip } from '../components/InstitutionalProvenanceStrip'
import { getResistanceInstitutionalMapping } from '../data-v2/institutionalMappings'
import { listPathogenProfilesV2 } from '../data-v2/pathogens'
import { listResistanceConceptsV2 } from '../data-v2/resistance'
import type { AbvInstitutionalFocus, AbvTab } from '../types'

interface PathogenLibraryPageProps {
  setPage: (t: AbvTab) => void
  institutionalFocus: AbvInstitutionalFocus | null
  onConsumedInstitutionalFocus: () => void
}

export function PathogenLibraryPage({
  setPage,
  institutionalFocus,
  onConsumedInstitutionalFocus,
}: PathogenLibraryPageProps) {
  const pathogens = listPathogenProfilesV2()
  const concepts = listResistanceConceptsV2()
  const didScroll = useRef(false)

  useEffect(() => {
    if (
      !institutionalFocus ||
      didScroll.current ||
      (institutionalFocus.kind !== 'pathogen' && institutionalFocus.kind !== 'resistance')
    )
      return
    const t = setTimeout(() => {
      let el: HTMLElement | null = null
      if (institutionalFocus.kind === 'pathogen') {
        el = document.getElementById(`abv-pathogen-${institutionalFocus.id}`)
      } else if (institutionalFocus.kind === 'resistance') {
        el = document.getElementById(`abv-resistance-${institutionalFocus.id}`)
      }
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      didScroll.current = true
      onConsumedInstitutionalFocus()
    }, 150)
    return () => clearTimeout(t)
  }, [institutionalFocus, onConsumedInstitutionalFocus])

  useEffect(() => {
    didScroll.current = false
  }, [institutionalFocus])

  return (
    <div className="min-h-full bg-[hsl(var(--background))] p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => setPage('home')}
          className="mb-6 flex items-center text-lg font-semibold transition hover:opacity-90"
          style={{ color: 'hsl(var(--primary))' }}
        >
          <Icon name="back" className="mr-2 h-6 w-6" />
          Voltar ao início
        </button>

        <header className="mb-8">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-wide"
            style={{ color: 'hsl(var(--primary))' }}
          >
            Núcleo v2 · microbiologia
          </p>
          <h1 className="font-serif text-3xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
            Microrganismos e resistência
          </h1>
          <p className="mt-3 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Perfis estruturados para apoio ao raciocínio clínico e stewardship — não substituem antibiograma, protocolo
            laboratorial nem diretriz institucional.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
            Patógenos e agrupamentos
          </h2>
          <div className="space-y-4">
            {pathogens.map((p) => (
              <article
                key={p.id}
                id={`abv-pathogen-${p.id}`}
                className="abv-panel scroll-mt-24 p-4"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
                    style={{
                      background: 'color-mix(in srgb, hsl(var(--primary)) 14%, hsl(var(--card)))',
                      color: 'hsl(var(--primary))',
                    }}
                  >
                    {p.kind === 'species' ? 'Espécie' : 'Agrupamento'}
                  </span>
                  <span className="font-mono text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {p.slug}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold">{p.label}</h3>
                <p className="mt-2 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {p.habitatSummary}
                </p>
                <p className="mt-2 text-sm">{p.clinicalRoleSummary}</p>
                <div className="mt-3">
                  <h4 className="text-xs font-semibold uppercase" style={{ color: 'hsl(var(--primary))' }}>
                    Resistência / alertas
                  </h4>
                  <ul className="mt-1 list-inside list-disc text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {p.resistanceHighlights.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3">
                  <h4 className="text-xs font-semibold uppercase" style={{ color: 'var(--chart-5)' }}>
                    Stewardship
                  </h4>
                  <ul className="mt-1 list-inside list-disc text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {p.stewardshipBullets.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3">
                  <h4 className="text-xs font-semibold uppercase">Amostragem</h4>
                  <ul className="mt-1 list-inside list-disc text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {p.samplingNotes.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>
                <p className="mt-3 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Ref.: {p.referenceKeys.join(', ')}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
            Conceitos de resistência e interpretação
          </h2>
          <div className="space-y-4">
            {concepts.map((c) => {
              const rMap = getResistanceInstitutionalMapping(c.id)
              return (
              <article
                key={c.id}
                id={`abv-resistance-${c.id}`}
                className="abv-panel scroll-mt-24 p-4"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                <span className="font-mono text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {c.slug}
                </span>
                <h3 className="mt-1 font-serif text-xl font-bold">{c.label}</h3>
                <p className="mt-2 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {c.definitionShort}
                </p>
                <div className="mt-3">
                  <h4 className="text-xs font-semibold uppercase">Implicação clínica</h4>
                  <ul className="mt-1 list-inside list-disc text-sm">
                    {c.clinicalImplication.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3">
                  <h4 className="text-xs font-semibold uppercase" style={{ color: 'hsl(var(--accent))' }}>
                    Stewardship
                  </h4>
                  <ul className="mt-1 list-inside list-disc text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {c.stewardshipBullets.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>
                {rMap && (
                  <div className="mt-3">
                    <InstitutionalProvenanceStrip mapping={rMap} contextLabel={c.label} variant="compact" />
                  </div>
                )}
                <p className="mt-3 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Ref.: {c.referenceKeys.join(', ')}
                </p>
              </article>
            )})}
          </div>
        </section>
      </div>
    </div>
  )
}
