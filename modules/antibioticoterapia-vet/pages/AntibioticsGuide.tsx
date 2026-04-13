import React, { useState, useMemo, useEffect, useRef } from 'react'
import Icon from '../components/Icon'
import DrugCard from '../components/DrugCard'
import { AntibioticV2Panel } from '../components/AntibioticV2Panel'
import { AbvTab, AntibioticClass, Antibiotic, DiseaseSystem } from '../types'
import { safeList } from '../utils/dataUtils'
import { buildDrugToDiseasesIndex, lookupDiseasesForDrug } from '../utils/legacyDiseaseDrugIndex'
import { searchUnifiedClinical } from '../engine/searchV2'
import type { SyndromeId } from '../model/ids'
import { listAntibioticSheetsV2, getAntibioticSheetV2 } from '../data-v2/antibiotics'
import type { AbvInstitutionalFocus } from '../types'
import type { UnifiedSearchHit } from '../engine/searchV2'
import { CLASS_STYLE } from '../constants'
import { subclassFor } from '../utils/pkpdUtils'

interface AntibioticsGuideProps {
  setPage: (page: AbvTab) => void
  abDict: AntibioticClass
  dzDict: DiseaseSystem
  focusDrug: string | null
  focusMoleculeIdV2: string | null
  onClearFocusMoleculeV2: () => void
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
  focusMoleculeIdV2,
  onClearFocusMoleculeV2,
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
  const [q, setQ] = useState('')
  const [cls, setCls] = useState('todas')
  const [showV2Library, setShowV2Library] = useState(false)
  const [selectedLibraryMoleculeId, setSelectedLibraryMoleculeId] = useState<string | null>(null)
  const diseaseDrugIndex = useMemo(() => buildDrugToDiseasesIndex(dzDict), [dzDict])
  const firstHighlightRef = useRef<HTMLDivElement>(null)
  const sheetTopRef = useRef<HTMLDivElement>(null)

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
    if (focusMoleculeIdV2) {
      setSelectedLibraryMoleculeId(focusMoleculeIdV2)
      setTimeout(() => {
        sheetTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [focusMoleculeIdV2])

  const unifiedHits = useMemo(() => {
    const t = q.trim()
    if (!t) return [] as UnifiedSearchHit[]
    return searchUnifiedClinical(t, abDict)
  }, [q, abDict])

  const v2SheetsFiltered = useMemo(() => {
    const all = listAntibioticSheetsV2()
    const t = q.trim().toLowerCase()
    if (!t) return all
    const molHits = new Set(
      unifiedHits.filter((h): h is Extract<UnifiedSearchHit, { kind: 'molecule' }> => h.kind === 'molecule').map((h) => h.id),
    )
    if (molHits.size) return all.filter((s) => molHits.has(s.id))
    return all.filter(
      (s) =>
        `${s.displayName} ${s.classLabel} ${s.synonyms.join(' ')}`.toLowerCase().includes(t) ||
        s.slug.toLowerCase().includes(t),
    )
  }, [q, unifiedHits])

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

  const activeSheetId = focusMoleculeIdV2 ?? selectedLibraryMoleculeId
  const activeSheet = activeSheetId ? getAntibioticSheetV2(activeSheetId) : undefined

  return (
    <div className="relative isolate min-h-full bg-[var(--background)] p-4 md:p-8">
      <div className="abv-panel relative z-10 mx-auto max-w-6xl p-6 shadow-md">
        <button
          type="button"
          onClick={() => setPage(backTarget)}
          className="mb-6 flex items-center text-lg font-semibold transition hover:opacity-90"
          style={{ color: 'var(--primary)' }}
        >
          <Icon name="back" className="mr-2 h-6 w-6" />
          {backText}
        </button>
        <h1 className="mb-2 font-serif text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
          Guia de antimicrobianos
        </h1>
        <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
          <strong style={{ color: 'var(--foreground)' }}>Catálogo principal:</strong> classes com cores e calculadora de dose
          (mesmo modelo do guia clássico). Cada ficha pode abrir as <strong>doenças do catálogo legado</strong> que citam o
          fármaco. As <strong>fichas v2</strong> servem ao motor de síndromes e à concordância institucional — use o bloco
          opcional abaixo.
        </p>

        <div className="mb-6 flex flex-col gap-3 md:flex-row">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Busca clínica unificada (síndromes, moléculas, patógenos, hospital, referências, legado…)"
            className="abv-input flex-1 p-3 text-sm md:text-base"
          />
        </div>

        {q.trim() && unifiedHits.length > 0 && (
          <section className="mb-6 rounded-[var(--radius)] border p-4" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              Resultados da busca
            </h2>
            <p className="mb-3 text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Universo v2 (clínico, antimicrobianos, microbiologia, hospital, fontes) ordenado por relevância; legado por
              último.
            </p>
            <ul className="max-h-56 space-y-2 overflow-y-auto pr-1 text-sm">
              {unifiedHits.map((h, i) => {
                if (h.kind === 'syndrome') {
                  return (
                    <li key={`syn-${h.id}-${i}`}>
                      <button
                        type="button"
                        className="text-left font-medium underline-offset-2 hover:underline"
                        style={{ color: 'var(--primary)' }}
                        onClick={() => onNavigateSyndromeV2(h.id)}
                      >
                        <span
                          className="mr-2 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
                          style={{
                            background: 'color-mix(in srgb, var(--primary) 15%, var(--card))',
                            color: 'var(--primary)',
                          }}
                        >
                          Síndrome v2
                        </span>
                        {h.label}
                      </button>
                      <p className="mt-0.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                        {h.hint}
                      </p>
                    </li>
                  )
                }
                if (h.kind === 'molecule') {
                  return (
                    <li key={`mol-${h.id}-${i}`}>
                      <button
                        type="button"
                        className="text-left font-medium underline-offset-2 hover:underline"
                        style={{ color: 'var(--primary)' }}
                        onClick={() => {
                          setSelectedLibraryMoleculeId(h.id)
                          onClearFocusMoleculeV2()
                          setTimeout(() => sheetTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
                        }}
                      >
                        <span
                          className="mr-2 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
                          style={{
                            background: 'color-mix(in srgb, var(--secondary) 18%, var(--card))',
                            color: 'var(--secondary)',
                          }}
                        >
                          Ficha v2
                        </span>
                        {h.label}
                      </button>
                      <p className="mt-0.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>
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
                        className="text-left font-medium underline-offset-2 hover:underline"
                        style={{ color: 'var(--primary)' }}
                        onClick={() => onNavigateInstitutional({ kind: 'pathogen', id: h.id })}
                      >
                        <span
                          className="mr-2 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
                          style={{
                            background: 'color-mix(in srgb, var(--chart-3) 20%, var(--card))',
                            color: 'var(--foreground)',
                          }}
                        >
                          Patógeno v2
                        </span>
                        {h.label}
                      </button>
                      <p className="mt-0.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>
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
                        className="text-left font-medium underline-offset-2 hover:underline"
                        style={{ color: 'var(--primary)' }}
                        onClick={() => onNavigateInstitutional({ kind: 'resistance', id: h.id })}
                      >
                        <span
                          className="mr-2 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
                          style={{
                            background: 'color-mix(in srgb, var(--chart-4) 22%, var(--card))',
                            color: 'var(--foreground)',
                          }}
                        >
                          Resistência v2
                        </span>
                        {h.label}
                      </button>
                      <p className="mt-0.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>
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
                        className="text-left font-medium underline-offset-2 hover:underline"
                        style={{ color: 'var(--primary)' }}
                        onClick={() => onNavigateInstitutional({ kind: 'hospital', id: h.id })}
                      >
                        <span
                          className="mr-2 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
                          style={{
                            background: 'color-mix(in srgb, var(--chart-5) 18%, var(--card))',
                            color: 'var(--foreground)',
                          }}
                        >
                          Hospital v2
                        </span>
                        {h.label}
                      </button>
                      <p className="mt-0.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>
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
                        className="text-left font-medium underline-offset-2 hover:underline"
                        style={{ color: 'var(--primary)' }}
                        onClick={() => onNavigateInstitutional({ kind: 'reference', key: h.key })}
                      >
                        <span
                          className="mr-2 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
                          style={{
                            background: 'color-mix(in srgb, var(--muted) 50%, var(--card))',
                            color: 'var(--foreground)',
                          }}
                        >
                          Fonte
                        </span>
                        {h.label}
                      </button>
                      <p className="mt-0.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                        {h.hint}
                      </p>
                    </li>
                  )
                }
                return (
                  <li key={`leg-${h.name}-${h.className}-${i}`} className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
                      Legado:
                    </span>{' '}
                    {h.name} <span className="opacity-80">({h.className})</span>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {q.trim() && unifiedHits.length === 0 && (
          <p className="mb-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Nenhum resultado na busca unificada. Ajuste o termo ou percorra o catálogo por classe abaixo.
          </p>
        )}

        {activeSheet && (
          <div ref={sheetTopRef} className="mb-8">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide"
                style={{
                  background: 'color-mix(in srgb, var(--secondary) 16%, var(--card))',
                  color: 'var(--secondary)',
                  border: '1px solid color-mix(in srgb, var(--secondary) 30%, var(--border))',
                }}
              >
                Ficha v2 aberta
              </span>
              <button
                type="button"
                className="text-xs font-medium underline"
                style={{ color: 'var(--primary)' }}
                onClick={() => {
                  setSelectedLibraryMoleculeId(null)
                  onClearFocusMoleculeV2()
                }}
              >
                Fechar ficha
              </button>
            </div>
            <AntibioticV2Panel sheet={activeSheet} />
          </div>
        )}

        <section className="mb-10">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide"
                style={{
                  background: 'color-mix(in srgb, var(--chart-2) 18%, var(--card))',
                  color: 'var(--foreground)',
                  border: '1px solid color-mix(in srgb, var(--chart-2) 35%, var(--border))',
                }}
              >
                Catálogo por classe
              </span>
              <p className="mt-2 max-w-3xl text-xs" style={{ color: 'var(--muted-foreground)' }}>
                Cartões com cores por subclasse PK/PD, doses e calculadora. Links para doenças usam o catálogo clássico do
                guia por suspeita.
              </p>
            </div>
            <select
              value={cls}
              onChange={(e) => setCls(e.target.value)}
              className="abv-input w-full p-3 md:w-72"
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
                    <h2 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                      {k}
                    </h2>
                  </div>
                  <div className="grid gap-4 p-5 md:grid-cols-2">
                    {list.map((d) => {
                      const isHighlighted = !firstHitGiven && !!q && !focusMoleculeIdV2
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
              <div className="py-6 text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Nenhum fármaco com os filtros atuais.
              </div>
            )}
          </div>
        </section>

        <div className="border-t pt-6" style={{ borderColor: 'var(--border)' }}>
          <p className="mb-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
            <strong style={{ color: 'var(--foreground)' }}>Biblioteca v2 (motor de síndromes):</strong> fichas alinhadas ao
            bloco clínico estruturado e à trilha de concordância institucional.
          </p>
          <button
            type="button"
            className="mb-4 text-sm font-medium underline"
            style={{ color: 'var(--primary)' }}
            onClick={() => setShowV2Library((v) => !v)}
          >
            {showV2Library ? 'Ocultar' : 'Mostrar'} fichas v2 / moléculas do motor
          </button>
          {showV2Library && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {v2SheetsFiltered.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSelectedLibraryMoleculeId(s.id)
                    onClearFocusMoleculeV2()
                    setTimeout(() => sheetTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
                  }}
                  className={`rounded-lg border px-3 py-3 text-left text-sm transition hover:opacity-95 ${
                    activeSheetId === s.id ? 'ring-2' : ''
                  }`}
                  style={
                    activeSheetId === s.id
                      ? {
                          borderColor: 'var(--primary)',
                          background: 'color-mix(in srgb, var(--primary) 10%, var(--card))',
                          color: 'var(--foreground)',
                          boxShadow: '0 0 0 1px color-mix(in srgb, var(--ring) 45%, transparent)',
                        }
                      : {
                          borderColor: 'var(--border)',
                          background: 'var(--card)',
                          color: 'var(--foreground)',
                        }
                  }
                >
                  <span className="font-semibold">{s.displayName}</span>
                  <p className="mt-1 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    {s.classLabel} · {s.subclassLabel}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AntibioticsGuide
