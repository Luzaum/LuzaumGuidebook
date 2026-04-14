import { useEffect, useRef } from 'react'
import Icon from '../components/Icon'
import { InstitutionalProvenanceStrip } from '../components/InstitutionalProvenanceStrip'
import { listHospitalStewardshipCardsV2 } from '../data-v2/hospitalAlerts'
import { getHospitalCardInstitutionalMapping } from '../data-v2/institutionalMappings'
import { INSTITUTIONAL_SOURCE_CCIH_2024, getVersionedSource } from '../data-v2/sourceRegistry'
import type { AbvInstitutionalFocus, AbvTab } from '../types'

const CATEGORY_LABEL: Record<string, string> = {
  risk: 'Risco / internação',
  precaution: 'Precaução / isolamento',
  culture: 'Cultura e timing',
  deescalation: 'Reavaliação / descalonamento',
  indication: 'Indicação de ATB',
  nosocomial: 'Nosocomial',
  mdr: 'Multirresistência',
  notification: 'Vigilância / notificação',
  catheter_uti: 'Cateter urinário / ITU hospitalar',
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

        <header className="mb-6">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-wide"
            style={{ color: 'hsl(var(--primary))' }}
          >
            Camada institucional v2
          </p>
          <h1 className="font-serif text-3xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
            Infecção hospitalar e stewardship
          </h1>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Os cartões estão alinhados ao guia CCIH (metadados no app). O documento completo é{' '}
            <strong>restrito e não é distribuído</strong> pelo aplicativo; quando aplicável, cada cartão traz um{' '}
            <span className="font-mono text-[10px]">sectionRef</span> simbólico para rastreabilidade interna.
          </p>
        </header>

        {centralDoc && (
          <div
            className="mb-6 rounded-[var(--radius)] border p-4 text-sm"
            style={{
              borderColor: 'hsl(var(--border))',
              background: 'color-mix(in srgb, hsl(var(--primary)) 8%, hsl(var(--card)))',
            }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
                style={{ background: 'color-mix(in srgb, hsl(var(--secondary)) 18%, hsl(var(--card)))', color: 'hsl(var(--secondary))' }}
              >
                Fonte institucional restrita
              </span>
              <span className="text-[10px] opacity-80">Versão {centralDoc.versionLabel}</span>
              <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase opacity-90">
                {centralDoc.accessPolicy}
              </span>
              <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase opacity-90">
                {centralDoc.distributionMode}
              </span>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
                style={{
                  background:
                    centralDoc.verificationMode === 'pending_import'
                      ? 'color-mix(in srgb, var(--chart-5) 20%, hsl(var(--card)))'
                      : 'color-mix(in srgb, var(--chart-2) 20%, hsl(var(--card)))',
                }}
              >
                {centralDoc.verificationMode}
              </span>
            </div>
            <p className="mt-2 font-medium">{centralDoc.title}</p>
            <p className="mt-1 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {centralDoc.provenance}
            </p>
            <p className="mt-2 text-xs leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
              PDF não exposto ao cliente ({centralDoc.fileExposedToClient ? 'erro de política' : 'confirmado'}).{' '}
              {centralDoc.internalStorageDesignation}
            </p>
          </div>
        )}

        <div className="space-y-4">
          {cards.map((c) => {
            const cardMap = getHospitalCardInstitutionalMapping(c.id)
            return (
            <article
              key={c.id}
              id={`abv-hospital-${c.id}`}
              className="abv-panel scroll-mt-24 p-4"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
                  style={{
                    background: 'color-mix(in srgb, hsl(var(--secondary)) 16%, hsl(var(--card)))',
                    color: 'hsl(var(--secondary))',
                  }}
                >
                  {CATEGORY_LABEL[c.category] ?? c.category}
                </span>
                <span className="font-mono text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {c.sourceKey}
                </span>
                {c.versionedSourceId && (
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ color: 'hsl(var(--primary))' }}>
                    Guia CCIH · metadados
                  </span>
                )}
              </div>
              <h2 className="font-serif text-xl font-bold">{c.title}</h2>
              {cardMap && (
                <div className="mt-3">
                  <InstitutionalProvenanceStrip mapping={cardMap} contextLabel={c.title} variant="compact" />
                </div>
              )}
              <p className="mt-2 text-sm font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {c.lead}
              </p>
              <ul className="mt-3 list-inside list-disc text-sm">
                {c.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="mt-3 rounded-lg border p-3 text-sm" style={{ borderColor: 'hsl(var(--border))' }}>
                <span className="font-semibold" style={{ color: 'hsl(var(--primary))' }}>
                  Quando pensar nisto
                </span>
                <ul className="mt-1 list-inside list-disc" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {c.whenToThink.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
              <p className="mt-3 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Ref.: {c.referenceKeys.join(', ')}
              </p>
            </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
