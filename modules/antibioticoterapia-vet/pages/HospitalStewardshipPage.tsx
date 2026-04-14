import { useEffect, useRef } from 'react'
import {
  Bell,
  Building2,
  ClipboardCheck,
  FileWarning,
  Hospital,
  Microscope,
  Pill,
  Shield,
  Syringe,
  TrendingDown,
} from 'lucide-react'
import Icon from '../components/Icon'
import { InlineRichText } from '../components/RichTextViewer'
import { SOURCE_REGISTRY } from '../data-v2/references'
import { listHospitalStewardshipCardsV2 } from '../data-v2/hospitalAlerts'
import { getHospitalCardInstitutionalMapping } from '../data-v2/institutionalMappings'
import { INSTITUTIONAL_SOURCE_CCIH_2024, getVersionedSource } from '../data-v2/sourceRegistry'
import type { AbvInstitutionalFocus, AbvTab } from '../types'

const CATEGORY_LABEL: Record<string, string> = {
  risk: 'Risco e internação',
  precaution: 'Precaução e isolamento',
  culture: 'Cultura e timing',
  deescalation: 'Reavaliação e desescalonamento',
  indication: 'Indicação de antimicrobianos',
  nosocomial: 'Infecção nosocomial',
  mdr: 'Multirresistência',
  notification: 'Vigilância e notificação',
  catheter_uti: 'Cateter urinário e ITU hospitalar',
}

const CATEGORY_ICON: Record<string, typeof Hospital> = {
  risk: Building2,
  precaution: Shield,
  culture: Microscope,
  deescalation: TrendingDown,
  indication: Pill,
  nosocomial: Hospital,
  mdr: FileWarning,
  notification: Bell,
  catheter_uti: Syringe,
}

function sourceTitlesForKeys(keys: string[]): string {
  return keys
    .map((k) => SOURCE_REGISTRY[k]?.title)
    .filter(Boolean)
    .join(' · ')
}

interface HospitalStewardshipPageProps {
  setPage: (t: AbvTab) => void
  institutionalFocus: AbvInstitutionalFocus | null
  onConsumedInstitutionalFocus: () => void
}

export function HospitalStewardshipPage({
  setPage,
  institutionalFocus,
  onConsumedInstitutionalFocus,
}: HospitalStewardshipPageProps) {
  const cards = listHospitalStewardshipCardsV2()
  const didScroll = useRef(false)
  const centralDoc = getVersionedSource(INSTITUTIONAL_SOURCE_CCIH_2024)

  useEffect(() => {
    if (!institutionalFocus || institutionalFocus.kind !== 'hospital' || didScroll.current) return
    const t = setTimeout(() => {
      const el = document.getElementById(`abv-hospital-${institutionalFocus.id}`)
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

        <header className="mb-8 max-w-3xl">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-wide"
            style={{ color: 'hsl(var(--primary))' }}
          >
            Hospital e controle de infecção
          </p>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'hsl(var(--foreground))' }}>
            Infecção hospitalar e uso racional de antimicrobianos
          </h1>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Cartões educacionais para apoiar decisões na internação. Eles{' '}
            <strong className="font-semibold text-[hsl(var(--foreground))]">não substituem</strong> o protocolo da sua
            unidade nem o prontuário — servem para organizar o raciocínio clínico e o stewardship.
          </p>
        </header>

        {centralDoc ? (
          <aside
            className="mb-10 max-w-3xl rounded-2xl border px-4 py-4 sm:px-5"
            style={{
              borderColor: 'color-mix(in srgb, hsl(var(--primary)) 28%, hsl(var(--border)))',
              background: 'color-mix(in srgb, hsl(var(--primary)) 7%, hsl(var(--card)))',
            }}
          >
            <div className="flex items-start gap-3">
              <ClipboardCheck
                className="mt-0.5 h-5 w-5 shrink-0"
                style={{ color: 'hsl(var(--primary))' }}
                aria-hidden
              />
              <div>
                <p className="text-sm font-semibold leading-snug" style={{ color: 'hsl(var(--foreground))' }}>
                  Alinhamento ao guia institucional (CCIH)
                </p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  O conteúdo desta secção segue a mesma linha temática do{' '}
                  <span className="font-medium text-[hsl(var(--foreground))]">{centralDoc.title}</span>
                  {centralDoc.versionLabel ? ` (${centralDoc.versionLabel})` : ''}. O ficheiro PDF completo é{' '}
                  <strong className="font-medium text-[hsl(var(--foreground))]">interno e restrito</strong> — não é
                  enviado nem mostrado nesta aplicação; aqui vê apenas resumos redigidos para o contexto veterinário.
                </p>
              </div>
            </div>
          </aside>
        ) : null}

        <div className="space-y-6">
          {cards.map((c) => {
            const cardMap = getHospitalCardInstitutionalMapping(c.id)
            const refLine = sourceTitlesForKeys(c.referenceKeys)
            const CatIcon = CATEGORY_ICON[c.category] ?? Hospital
            const categoryLabel = CATEGORY_LABEL[c.category] ?? c.category

            return (
              <article
                key={c.id}
                id={`abv-hospital-${c.id}`}
                className="abv-panel scroll-mt-24 overflow-hidden rounded-2xl shadow-sm"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                <header
                  className="border-b px-4 py-4 sm:px-6"
                  style={{
                    borderColor: 'hsl(var(--border))',
                    background: 'color-mix(in srgb, hsl(var(--secondary)) 6%, hsl(var(--card)))',
                  }}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                      style={{
                        background: 'color-mix(in srgb, hsl(var(--primary)) 14%, hsl(var(--card)))',
                        color: 'hsl(var(--primary))',
                      }}
                    >
                      <CatIcon className="h-3.5 w-3.5" aria-hidden />
                      {categoryLabel}
                    </span>
                  </div>
                  <h2 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">{c.title}</h2>
                  {cardMap?.topicHint && cardMap.topicHint.trim() !== c.title.trim() ? (
                    <p className="mt-2 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      Tema no guia:{' '}
                      <span className="font-medium text-[hsl(var(--foreground))]">
                        <InlineRichText text={cardMap.topicHint} />
                      </span>
                    </p>
                  ) : null}
                </header>

                <div className="space-y-5 px-4 py-5 sm:px-6">
                  <section>
                    <h3 className="mb-2 text-sm font-semibold" style={{ color: 'hsl(var(--primary))' }}>
                      Em resumo
                    </h3>
                    <p className="text-sm leading-relaxed">
                      <InlineRichText text={c.lead} />
                    </p>
                  </section>

                  <section
                    className="rounded-xl border p-4"
                    style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}
                  >
                    <h3 className="mb-3 text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                      Na prática
                    </h3>
                    <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {c.bullets.map((b, i) => (
                        <li key={i}>
                          <InlineRichText text={b} />
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section
                    className="rounded-xl border p-4"
                    style={{
                      borderColor: 'color-mix(in srgb, hsl(var(--chart-3)) 35%, hsl(var(--border)))',
                      background: 'color-mix(in srgb, hsl(var(--chart-3)) 6%, hsl(var(--card)))',
                    }}
                  >
                    <h3 className="mb-3 text-sm font-semibold" style={{ color: 'hsl(var(--chart-3))' }}>
                      Quando pensar neste tema
                    </h3>
                    <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed" style={{ color: 'hsl(var(--foreground))' }}>
                      {c.whenToThink.map((w, i) => (
                        <li key={i}>
                          <InlineRichText text={w} />
                        </li>
                      ))}
                    </ul>
                  </section>

                  <footer className="border-t pt-4" style={{ borderColor: 'hsl(var(--border))' }}>
                    {refLine ? (
                      <p className="text-xs leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        <span className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                          Base de conteúdo:{' '}
                        </span>
                        {refLine}
                      </p>
                    ) : null}

                    {cardMap?.locator?.sectionRef ? (
                      <details className="mt-3">
                        <summary className="cursor-pointer text-xs font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          Referência interna (auditoria)
                        </summary>
                        <p className="mt-2 rounded-md border px-2 py-1.5 font-mono text-[10px] leading-relaxed" style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
                          {cardMap.locator.sectionRef}
                        </p>
                        {cardMap.locator.auditNote ? (
                          <p className="mt-2 text-[10px] leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                            {cardMap.locator.auditNote}
                          </p>
                        ) : null}
                      </details>
                    ) : null}
                  </footer>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
