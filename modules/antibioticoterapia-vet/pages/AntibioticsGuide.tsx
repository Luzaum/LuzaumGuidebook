import React, { useState, useMemo, useEffect, useRef } from 'react'
import Icon from '../components/Icon'
import DrugCard from '../components/DrugCard'
import { AbvTab, AntibioticClass, Antibiotic, DiseaseSystem } from '../types'
import { safeList } from '../utils/dataUtils'
import { buildDrugToDiseasesIndex, lookupDiseasesForDrug } from '../utils/legacyDiseaseDrugIndex'
import { searchLegacyDrugs } from '../engine/searchV2'
import type { AbvInstitutionalFocus } from '../types'
import { CLASS_STYLE } from '../constants'
import { subclassFor } from '../utils/pkpdUtils'
import { ABV_SESSION_KEYS, readSessionJson, writeSessionJson } from '../utils/abvSessionPersistence'

interface AntibioticsGuideProps {
  setPage: (page: AbvTab) => void
  abDict: AntibioticClass
  dzDict: DiseaseSystem
  focusDrug: string | null
  sourcePage: AbvTab | null
  searchSeed?: string
  onSearchSeedConsumed?: () => void
  onOpenLegacyDisease: (diseaseName: string) => void
}

const AntibioticsGuide: React.FC<AntibioticsGuideProps> = ({
  setPage,
  abDict,
  dzDict,
  focusDrug,
  sourcePage,
  searchSeed,
  onSearchSeedConsumed,
  onOpenLegacyDisease,
}) => {
  const classes = useMemo(() => Object.keys(abDict).sort((a, b) => a.localeCompare(b, 'pt')), [abDict])
  const [q, setQ] = useState(() => {
    const raw = readSessionJson<{ v: 1; q: string }>(ABV_SESSION_KEYS.antibioticsUi)
    return raw?.v === 1 && typeof raw.q === 'string' ? raw.q : ''
  })
  const [cls, setCls] = useState('todas')
  const diseaseDrugIndex = useMemo(() => buildDrugToDiseasesIndex(dzDict), [dzDict])
  const firstHighlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const raw = readSessionJson<{ v: 1; cls: string }>(ABV_SESSION_KEYS.antibioticsUi)
    if (raw?.v !== 1 || typeof raw.cls !== 'string') return
    if (raw.cls === 'todas' || classes.includes(raw.cls)) setCls(raw.cls)
  }, [classes])

  useEffect(() => {
    writeSessionJson(ABV_SESSION_KEYS.antibioticsUi, { v: 1, q, cls })
  }, [q, cls])

  useEffect(() => {
    if (searchSeed) {
      setQ(searchSeed)
      setCls('todas')
      onSearchSeedConsumed?.()
    }
  }, [searchSeed, onSearchSeedConsumed])

  useEffect(() => {
    if (focusDrug) {
      setQ(focusDrug)
      setCls('todas')
      setTimeout(() => {
        firstHighlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }, [focusDrug])

  const drugHits = useMemo(() => {
    const t = q.trim()
    if (!t) return []
    return searchLegacyDrugs(t, abDict)
  }, [q, abDict])

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

  const backTarget: AbvTab =
    sourcePage === 'syndrome'
      ? 'syndrome'
      : sourcePage === 'diseases' || sourcePage === 'perioperative'
        ? sourcePage
        : 'home'
  const backText =
    sourcePage === 'syndrome'
      ? 'Voltar para o guia por suspeita'
      : sourcePage === 'diseases'
        ? 'Voltar para doenças por sistema'
        : sourcePage === 'perioperative'
          ? 'Voltar para perioperatório'
          : 'Voltar ao início'

  return (
    <div className="relative isolate min-h-full w-full bg-[hsl(var(--background))] px-3 py-4 sm:px-6 md:px-8 md:py-8">
      <div className="abv-panel relative z-10 w-full max-w-none p-4 shadow-md sm:p-6 md:p-8">
        <button
          type="button"
          onClick={() => setPage(backTarget)}
          className="mb-6 flex cursor-pointer items-center text-lg font-semibold transition hover:opacity-90"
          style={{ color: 'hsl(var(--primary))' }}
        >
          <Icon name="back" className="mr-2 h-6 w-6" />
          {backText}
        </button>
        <h1 className="mb-2 text-3xl font-bold tracking-tight" style={{ color: 'hsl(var(--foreground))' }}>
          Guia de antimicrobianos
        </h1>
        <p className="mb-6 max-w-4xl text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          <strong style={{ color: 'hsl(var(--foreground))' }}>Apenas fármacos</strong> por classe, com cores PK/PD e
          calculadora. Para condições clínicas, patógenos e busca alargada, use{' '}
          <button
            type="button"
            className="font-semibold underline"
            style={{ color: 'hsl(var(--primary))' }}
            onClick={() => setPage('diseases')}
          >
            Doenças por sistema
          </button>
          .
        </p>

        <div className="mb-6 flex flex-col gap-3 md:flex-row">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar antimicrobiano por nome, classe ou indicação…"
            className="abv-input flex-1 p-3 text-sm md:text-base"
          />
        </div>

        {q.trim() && drugHits.length > 0 && (
          <section className="mb-6 rounded-[var(--radius)] border p-4" style={{ borderColor: 'hsl(var(--border))' }}>
            <h2 className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              Resultados (fármacos)
            </h2>
            <p className="mb-3 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Correspondências no catálogo legado de antimicrobianos.
            </p>
            <ul className="max-h-56 space-y-2 overflow-y-auto pr-1 text-sm">
              {drugHits.map((h, i) => (
                <li key={`${h.name}-${h.className}-${i}`} className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <span className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                    Fármaco:
                  </span>{' '}
                  {h.name} <span className="opacity-80">({h.className})</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {q.trim() && drugHits.length === 0 && (
          <p className="mb-4 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Nenhum fármaco encontrado. Ajuste o termo ou use as classes abaixo.
          </p>
        )}

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
              <p className="mt-2 max-w-none text-xs sm:max-w-4xl" style={{ color: 'hsl(var(--muted-foreground))' }}>
                PK/PD por cor, doses e calculadora. Os chips ligam às condições em que o fármaco entra nas linhas de
                tratamento cadastradas.
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
                      const isHighlighted = !firstHitGiven && !!q
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
