import { useEffect, useRef } from 'react'
import { ClipboardList, MapPin, Microscope, ShieldAlert, Stethoscope, TestTube2 } from 'lucide-react'
import Icon from '../components/Icon'
import { InstitutionalProvenanceStrip } from '../components/InstitutionalProvenanceStrip'
import { getResistanceInstitutionalMapping } from '../data-v2/institutionalMappings'
import { listPathogenProfilesV2 } from '../data-v2/pathogens'
import { listResistanceConceptsV2 } from '../data-v2/resistance'
import { SOURCE_REGISTRY } from '../data-v2/references'
import { InlineRichText } from '../components/RichTextViewer'
import type { AbvInstitutionalFocus, AbvTab } from '../types'

function sourceTitlesForKeys(keys: string[]): string {
  return keys
    .map((k) => SOURCE_REGISTRY[k]?.title)
    .filter(Boolean)
    .join(' · ')
}

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
    <div className="min-h-full w-full bg-[hsl(var(--background))] p-4 md:p-8">
      <div className="mx-auto w-full max-w-none">
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
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'hsl(var(--foreground))' }}>
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
            {pathogens.map((p) => {
              const refLine = sourceTitlesForKeys(p.referenceKeys)
              return (
              <article
                key={p.id}
                id={`abv-pathogen-${p.id}`}
                className="abv-panel scroll-mt-24 overflow-hidden rounded-2xl p-0 shadow-sm"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                <header
                  className="border-b px-4 py-4 sm:px-6"
                  style={{ borderColor: 'hsl(var(--border))', background: 'color-mix(in srgb, hsl(var(--primary)) 5%, hsl(var(--card)))' }}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                      style={{
                        background: 'color-mix(in srgb, hsl(var(--primary)) 16%, hsl(var(--card)))',
                        color: 'hsl(var(--primary))',
                      }}
                    >
                      {p.kind === 'species' ? 'Espécie' : 'Agrupamento'}
                    </span>
                    <Microscope className="h-4 w-4 shrink-0 opacity-70" style={{ color: 'hsl(var(--muted-foreground))' }} aria-hidden />
                  </div>
                  <h3 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">{p.label}</h3>
                </header>

                <div className="space-y-4 px-4 py-4 sm:px-6 sm:py-5">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div
                      className="rounded-xl border p-4"
                      style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}
                    >
                      <h4 className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'hsl(var(--primary))' }}>
                        <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                        Colonização e habitat
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        <InlineRichText text={p.habitatSummary} />
                      </p>
                    </div>
                    <div
                      className="rounded-xl border p-4"
                      style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}
                    >
                      <h4 className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'hsl(var(--primary))' }}>
                        <Stethoscope className="h-4 w-4 shrink-0" aria-hidden />
                        Papel clínico
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed">
                        <InlineRichText text={p.clinicalRoleSummary} />
                      </p>
                    </div>
                  </div>

                  <div
                    className="rounded-xl border p-4"
                    style={{ borderColor: 'color-mix(in srgb, hsl(var(--chart-2)) 35%, hsl(var(--border)))' }}
                  >
                    <h4 className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'hsl(var(--chart-2))' }}>
                      <ShieldAlert className="h-4 w-4 shrink-0" aria-hidden />
                      Resistência e alertas
                    </h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {p.resistanceHighlights.map((x, i) => (
                        <li key={i}>
                          <InlineRichText text={x} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="rounded-xl border p-4"
                    style={{ borderColor: 'color-mix(in srgb, hsl(var(--chart-5)) 30%, hsl(var(--border)))' }}
                  >
                    <h4 className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'hsl(var(--chart-5))' }}>
                      <ClipboardList className="h-4 w-4 shrink-0" aria-hidden />
                      Uso racional (stewardship)
                    </h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {p.stewardshipBullets.map((x, i) => (
                        <li key={i}>{x}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border p-4" style={{ borderColor: 'hsl(var(--border))' }}>
                    <h4 className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                      <TestTube2 className="h-4 w-4 shrink-0" aria-hidden />
                      Amostragem e interpretação
                    </h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {p.samplingNotes.map((x, i) => (
                        <li key={i}>{x}</li>
                      ))}
                    </ul>
                  </div>

                  {refLine ? (
                    <p className="border-t pt-3 text-xs leading-snug" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      <span className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                        Base de conteúdo:{' '}
                      </span>
                      {refLine}
                    </p>
                  ) : null}
                </div>
              </article>
              )
            })}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
            Conceitos de resistência e interpretação
          </h2>
          <div className="space-y-4">
            {concepts.map((c) => {
              const rMap = getResistanceInstitutionalMapping(c.id)
              const conceptRefLine = sourceTitlesForKeys(c.referenceKeys)
              return (
              <article
                key={c.id}
                id={`abv-resistance-${c.id}`}
                className="abv-panel scroll-mt-24 rounded-2xl p-5 shadow-sm"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                <h3 className="text-xl font-bold tracking-tight">{c.label}</h3>
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
                {conceptRefLine ? (
                  <p className="mt-3 border-t pt-3 text-xs leading-snug" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    <span className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                      Base de conteúdo:{' '}
                    </span>
                    {conceptRefLine}
                  </p>
                ) : null}
              </article>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
