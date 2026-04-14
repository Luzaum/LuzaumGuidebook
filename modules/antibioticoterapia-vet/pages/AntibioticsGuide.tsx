import React, { useState, useMemo, useEffect, useRef } from 'react'
import Icon from '../components/Icon'
import DrugCard from '../components/DrugCard'
import { AbvTab, AntibioticClass, Antibiotic, DiseaseSystem, Disease } from '../types'
import { safeList } from '../utils/dataUtils'
import { buildDrugToDiseasesIndex, lookupDiseasesForDrug } from '../utils/legacyDiseaseDrugIndex'
import { searchUnifiedClinical } from '../engine/searchV2'
import type { SyndromeId } from '../model/ids'
import type { AbvInstitutionalFocus } from '../types'
import type { UnifiedSearchHit } from '../engine/searchV2'
import { CLASS_STYLE } from '../constants'
import { subclassFor } from '../utils/pkpdUtils'

interface AntibioticsGuideProps {
  setPage: (page: AbvTab) => void
  abDict: AntibioticClass
  dzDict: DiseaseSystem
  focusDrug: string | null
  focusDiseaseName: string | null
  onClearFocusDisease: () => void
  sourcePage: AbvTab | null
  searchSeed?: string
  unifiedSearchSeed?: string
  onSearchSeedConsumed?: () => void
  onUnifiedSearchSeedConsumed?: () => void
  onNavigateSyndromeV2: (id: SyndromeId) => void
  onNavigateInstitutional: (target: AbvInstitutionalFocus) => void
  onOpenLegacyDisease: (diseaseName: string) => void
}

const AntibioticsGuide: React.FC<AntibioticsGuideProps> = ({
  setPage,
  abDict,
  dzDict,
  focusDrug,
  focusDiseaseName,
  onClearFocusDisease,
  sourcePage,
  searchSeed,
  unifiedSearchSeed,
  onSearchSeedConsumed,
  onUnifiedSearchSeedConsumed,
  onNavigateSyndromeV2,
  onNavigateInstitutional,
  onOpenLegacyDisease,
}) => {
  const classes = useMemo(() => Object.keys(abDict).sort((a, b) => a.localeCompare(b, 'pt')), [abDict])
  const systems = useMemo(() => Object.keys(dzDict).sort((a, b) => a.localeCompare(b, 'pt')), [dzDict])
  const [q, setQ] = useState('')
  const [cls, setCls] = useState('todas')
  const [diseaseSectionOpen, setDiseaseSectionOpen] = useState(true)
  const diseaseDrugIndex = useMemo(() => buildDrugToDiseasesIndex(dzDict), [dzDict])
  const firstHighlightRef = useRef<HTMLDivElement>(null)
  const diseaseHighlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchSeed) {
      setQ(searchSeed)
      setCls('todas')
      onSearchSeedConsumed?.()
    }
  }, [searchSeed, onSearchSeedConsumed])

  useEffect(() => {
    if (unifiedSearchSeed) {
      setQ(unifiedSearchSeed)
      setCls('todas')
      onUnifiedSearchSeedConsumed?.()
    }
  }, [unifiedSearchSeed, onUnifiedSearchSeedConsumed])

  useEffect(() => {
    if (focusDrug) {
      setQ(focusDrug)
      setCls('todas')
      setTimeout(() => {
        firstHighlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }, [focusDrug])

  useEffect(() => {
    if (focusDiseaseName) {
      setDiseaseSectionOpen(true)
      setTimeout(() => {
        diseaseHighlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 120)
    }
  }, [focusDiseaseName])

  const unifiedHits = useMemo(() => {
    const t = q.trim()
    if (!t) return [] as UnifiedSearchHit[]
    return searchUnifiedClinical(t, abDict, dzDict)
  }, [q, abDict, dzDict])

  const filteredLegacy = useMemo(() => {
    const res: [string, Antibiotic[]][] = []
    const lowerQ = q.toLowerCase()
    for (const k of classes) {
      if (cls !== 'todas' && k !== cls) continue
      const list = safeList(abDict[k]).filter((d) =>
        `${d.name} ${d.spectrum} ${d.indications}`.toLowerCase().includes(lowerQ),
      )
      if (list.length) res.push([k, list])
    }
    return res
  }, [q, cls, abDict, classes])

  let firstHitGiven = false

  const backTarget: AbvTab = sourcePage === 'syndrome' ? 'syndrome' : 'home'
  const backText = sourcePage === 'syndrome' ? 'Voltar para o guia por suspeita' : 'Voltar ao início'

  const renderDiseaseCard = (sys: string, dz: Disease) => {
    const isFocus = focusDiseaseName === dz.name
    return (
      <div
        key={`${sys}-${dz.name}`}
        ref={isFocus ? diseaseHighlightRef : undefined}
        className={`rounded-xl border p-4 transition-shadow ${isFocus ? 'ring-2 ring-[hsl(var(--primary))]' : ''}`}
        style={{
          borderColor: 'hsl(var(--border))',
          background: 'color-mix(in srgb, hsl(var(--foreground)) 4%, hsl(var(--card)))',
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold leading-snug" style={{ color: 'hsl(var(--foreground))' }}>
              {dz.name}
            </h3>
            <p className="mt-1 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <span className="font-medium text-[hsl(var(--foreground))]">{sys}</span>
            </p>
          </div>
          {isFocus && (
            <button
              type="button"
              className="shrink-0 text-xs font-medium underline"
              style={{ color: 'hsl(var(--primary))' }}
              onClick={() => onClearFocusDisease()}
            >
              Limpar destaque
            </button>
          )}
        </div>
        {dz.ccihSummary ? (
          <p
            className="mt-2 rounded-md border px-3 py-2 text-xs leading-relaxed"
            style={{
              borderColor: 'color-mix(in srgb, hsl(var(--primary)) 35%, hsl(var(--border)))',
              background: 'color-mix(in srgb, hsl(var(--primary)) 8%, hsl(var(--card)))',
              color: 'hsl(var(--foreground))',
            }}
          >
            <span className="font-semibold">CCIH / stewardship:</span> {dz.ccihSummary}
          </p>
        ) : null}
        <p className="mt-2 text-xs leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          <span className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>
            Patógenos:
          </span>{' '}
          {dz.pathogens || '—'}
        </p>
        <p className="mt-1 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
          <span className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>
            1ª linha:
          </span>{' '}
          {safeList(dz.first_line).join(', ') || '—'}
        </p>
        <p className="mt-1 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
          <span className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>
            Duração:
          </span>{' '}
          {dz.duration || '—'}
        </p>
      </div>
    )
  }

  return (
    <div className="relative isolate min-h-full bg-[hsl(var(--background))] p-4 md:p-8">
      <div className="abv-panel relative z-10 mx-auto max-w-6xl p-5 shadow-md md:p-6">
        <button
          type="button"
          onClick={() => setPage(backTarget)}
          className="mb-6 flex cursor-pointer items-center text-lg font-semibold transition hover:opacity-90"
          style={{ color: 'hsl(var(--primary))' }}
        >
          <Icon name="back" className="mr-2 h-6 w-6" />
          {backText}
        </button>
        <h1 className="mb-2 font-serif text-3xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
          Guia de antimicrobianos
        </h1>
        <p className="mb-6 max-w-3xl text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Catálogo único: <strong style={{ color: 'hsl(var(--foreground))' }}>doenças</strong> com referência CCIH (quando
          preenchida), <strong style={{ color: 'hsl(var(--foreground))' }}>fármacos por classe</strong> com cores PK/PD e
          calculadora. A busca liga ao motor de <strong style={{ color: 'hsl(var(--foreground))' }}>suspeita clínica (v2)</strong>{' '}
          e às bibliotecas institucionais.
        </p>

        <div className="mb-6 flex flex-col gap-3 md:flex-row">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar doença, antimicrobiano, síndrome, patógeno ou tema hospitalar…"
            className="abv-input flex-1 p-3 text-sm md:text-base"
          />
        </div>

        {q.trim() && unifiedHits.length > 0 && (
          <section className="mb-6 rounded-[var(--radius)] border p-4" style={{ borderColor: 'hsl(var(--border))' }}>
            <h2 className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              Resultados da busca
            </h2>
            <p className="mb-3 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Ordem: síndromes e conteúdos v2; em seguida doenças e fármacos do catálogo legado.
            </p>
            <ul className="max-h-56 space-y-2 overflow-y-auto pr-1 text-sm">
              {unifiedHits.map((h, i) => {
                if (h.kind === 'syndrome') {
                  return (
                    <li key={`syn-${h.id}-${i}`}>
                      <button
                        type="button"
                        className="cursor-pointer text-left font-medium underline-offset-2 hover:underline"
                        style={{ color: 'hsl(var(--primary))' }}
                        onClick={() => onNavigateSyndromeV2(h.id)}
                      >
                        <span
                          className="mr-2 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
                          style={{
                            background: 'color-mix(in srgb, hsl(var(--primary)) 15%, hsl(var(--card)))',
                            color: 'hsl(var(--primary))',
                          }}
                        >
                          Síndrome
                        </span>
                        {h.label}
                      </button>
                      <p className="mt-0.5 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {h.hint}
                      </p>
                    </li>
                  )
                }
                if (h.kind === 'disease') {
                  return (
                    <li key={`dz-${h.system}-${h.name}-${i}`}>
                      <button
                        type="button"
                        className="cursor-pointer text-left font-medium underline-offset-2 hover:underline"
                        style={{ color: 'hsl(var(--primary))' }}
                        onClick={() => onOpenLegacyDisease(h.name)}
                      >
                        <span
                          className="mr-2 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
                          style={{
                            background: 'color-mix(in srgb, var(--chart-2) 18%, hsl(var(--card)))',
                            color: 'hsl(var(--foreground))',
                          }}
                        >
                          Doença
                        </span>
                        {h.name}{' '}
                        <span className="text-xs opacity-80">({h.system})</span>
                      </button>
                      <p className="mt-0.5 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {h.hint}
                      </p>
                    </li>
                  )
                }
                if (h.kind === 'pathogen') {
                  return (
                    <li key={`path-${h.id}-${i}`}>
                      <button
                        type="button"
                        className="cursor-pointer text-left font-medium underline-offset-2 hover:underline"
                        style={{ color: 'hsl(var(--primary))' }}
                        onClick={() => onNavigateInstitutional({ kind: 'pathogen', id: h.id })}
                      >
                        <span
                          className="mr-2 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
                          style={{
                            background: 'color-mix(in srgb, var(--chart-3) 20%, hsl(var(--card)))',
                            color: 'hsl(var(--foreground))',
                          }}
                        >
                          Patógeno
                        </span>
                        {h.label}
                      </button>
                      <p className="mt-0.5 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {h.hint}
                      </p>
                    </li>
                  )
                }
                if (h.kind === 'resistance') {
                  return (
                    <li key={`res-${h.id}-${i}`}>
                      <button
                        type="button"
                        className="cursor-pointer text-left font-medium underline-offset-2 hover:underline"
                        style={{ color: 'hsl(var(--primary))' }}
                        onClick={() => onNavigateInstitutional({ kind: 'resistance', id: h.id })}
                      >
                        <span
                          className="mr-2 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
                          style={{
                            background: 'color-mix(in srgb, var(--chart-4) 22%, hsl(var(--card)))',
                            color: 'hsl(var(--foreground))',
                          }}
                        >
                          Resistência
                        </span>
                        {h.label}
                      </button>
                      <p className="mt-0.5 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {h.hint}
                      </p>
                    </li>
                  )
                }
                if (h.kind === 'hospital') {
                  return (
                    <li key={`hosp-${h.id}-${i}`}>
                      <button
                        type="button"
                        className="cursor-pointer text-left font-medium underline-offset-2 hover:underline"
                        style={{ color: 'hsl(var(--primary))' }}
                        onClick={() => onNavigateInstitutional({ kind: 'hospital', id: h.id })}
                      >
                        <span
                          className="mr-2 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
                          style={{
                            background: 'color-mix(in srgb, var(--chart-5) 18%, hsl(var(--card)))',
                            color: 'hsl(var(--foreground))',
                          }}
                        >
                          Hospital
                        </span>
                        {h.label}
                      </button>
                      <p className="mt-0.5 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {h.hint}
                      </p>
                    </li>
                  )
                }
                if (h.kind === 'reference') {
                  return (
                    <li key={`ref-${h.key}-${i}`}>
                      <button
                        type="button"
                        className="cursor-pointer text-left font-medium underline-offset-2 hover:underline"
                        style={{ color: 'hsl(var(--primary))' }}
                        onClick={() => onNavigateInstitutional({ kind: 'reference', key: h.key })}
                      >
                        <span
                          className="mr-2 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
                          style={{
                            background: 'color-mix(in srgb, hsl(var(--muted)) 50%, hsl(var(--card)))',
                            color: 'hsl(var(--foreground))',
                          }}
                        >
                          Fonte
                        </span>
                        {h.label}
                      </button>
                      <p className="mt-0.5 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {h.hint}
                      </p>
                    </li>
                  )
                }
                return (
                  <li key={`leg-${h.name}-${h.className}-${i}`} className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    <span className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                      Fármaco:
                    </span>{' '}
                    {h.name} <span className="opacity-80">({h.className})</span>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {q.trim() && unifiedHits.length === 0 && (
          <p className="mb-4 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Nenhum resultado. Ajuste o termo ou use as secções abaixo.
          </p>
        )}

        <section className="mb-10 border-b pb-8" style={{ borderColor: 'hsl(var(--border))' }}>
          <button
            type="button"
            className="mb-4 flex w-full cursor-pointer flex-wrap items-center justify-between gap-2 text-left md:w-auto"
            onClick={() => setDiseaseSectionOpen((v) => !v)}
          >
            <div>
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide"
                style={{
                  background: 'color-mix(in srgb, var(--chart-4) 18%, hsl(var(--card)))',
                  color: 'hsl(var(--foreground))',
                  border: '1px solid color-mix(in srgb, var(--chart-4) 35%, hsl(var(--border)))',
                }}
              >
                Doenças · CCIH
              </span>
              <h2 className="mt-2 font-serif text-xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                Condições por sistema
              </h2>
              <p className="mt-1 max-w-3xl text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Referência clínica legada; campo CCIH é preenchido com auditoria institucional. Use os cartões de
                antibióticos abaixo para doses e calculadora.
              </p>
            </div>
            <span className="text-sm font-medium" style={{ color: 'hsl(var(--primary))' }}>
              {diseaseSectionOpen ? 'Ocultar' : 'Mostrar'}
            </span>
          </button>
          {diseaseSectionOpen && (
            <div className="space-y-6">
              {systems.map((sys) => (
                <div key={sys}>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {sys}
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {safeList(dzDict[sys]).map((dz) => renderDiseaseCard(sys, dz))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mb-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide"
                style={{
                  background: 'color-mix(in srgb, var(--chart-2) 18%, hsl(var(--card)))',
                  color: 'hsl(var(--foreground))',
                  border: '1px solid color-mix(in srgb, var(--chart-2) 35%, hsl(var(--border)))',
                }}
              >
                Antimicrobianos por classe
              </span>
              <p className="mt-2 max-w-3xl text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                PK/PD por cor, doses e calculadora. Chips ligam às doenças do catálogo quando o fármaco aparece na 1ª linha ou alternativas.
              </p>
            </div>
            <select
              value={cls}
              onChange={(e) => setCls(e.target.value)}
              className="abv-input w-full cursor-pointer p-3 md:w-72"
            >
              <option value="todas">Todas as classes</option>
              {classes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-5">
            {filteredLegacy.map(([k, list]) => {
              const sample = list[0]
              const sub = sample ? subclassFor(sample.name, k) : 'penicilina'
              const st = CLASS_STYLE[sub] || CLASS_STYLE.penicilina
              return (
                <div key={k} className="abv-panel overflow-hidden shadow-sm">
                  <div
                    className="flex items-center gap-3 border-b px-5 py-4"
                    style={{
                      borderColor: st.border,
                      background: st.bg,
                      borderLeftWidth: 4,
                      borderLeftColor: st.border,
                    }}
                  >
                    <span className="text-2xl" aria-hidden>
                      {st.emoji}
                    </span>
                    <h2 className="text-xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                      {k}
                    </h2>
                  </div>
                  <div className="grid gap-4 p-5 md:grid-cols-2">
                    {list.map((d) => {
                      const isHighlighted = !firstHitGiven && !!q && !focusDiseaseName
                      if (isHighlighted) firstHitGiven = true
                      const linked = lookupDiseasesForDrug(d.name, diseaseDrugIndex)
                      return (
                        <div key={d.name} ref={isHighlighted ? firstHighlightRef : null}>
                          <DrugCard
                            drug={d}
                            cls={k}
                            highlight={!!isHighlighted}
                            linkedDiseases={linked}
                            onOpenLegacyDisease={onOpenLegacyDisease}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
            {filteredLegacy.length === 0 && (
              <div className="py-6 text-center text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Nenhum fármaco com os filtros atuais.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default AntibioticsGuide
