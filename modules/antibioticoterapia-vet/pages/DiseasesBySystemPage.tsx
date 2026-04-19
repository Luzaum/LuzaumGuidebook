import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Icon from '../components/Icon'
import { DiseaseDetailView } from '../components/DiseaseDetailView'
import { InlineRichText } from '../components/RichTextViewer'
import {
  CLINICAL_SYSTEM_TAGS,
  CLINICAL_TAG_CARD_THEME,
  catalogCardThemeForSystemKey,
  countDiseasesPerTag,
  filterDiseaseCatalogByTags,
  groupCatalogBySystemKey,
  type ClinicalSystemTagId,
} from '../data/clinicalSystemTags'
import { searchUnifiedClinical } from '../engine/searchV2'
import type { UnifiedSearchHit } from '../engine/searchV2'
import { safeList } from '../utils/dataUtils'
import { ABV_SESSION_KEYS, readSessionJson, writeSessionJson } from '../utils/abvSessionPersistence'
import type { AbvInstitutionalFocus, AbvTab, AntibioticClass, ComorbidityState, Disease, DiseaseSystem } from '../types'

const CATALOG_COMORB: ComorbidityState = {
  renal: false,
  hepatic: false,
  septic: false,
  cardiac: false,
  neurological: false,
}

interface DiseasesBySystemPageProps {
  setPage: (page: AbvTab) => void
  abDict: AntibioticClass
  dzDict: DiseaseSystem
  unifiedSearchSeed?: string
  onUnifiedSearchSeedConsumed?: () => void
  onNavigateInstitutional: (target: AbvInstitutionalFocus) => void
  onDeepLinkDrug: (drugName: string) => void
  focusDiseaseName: string | null
  onClearFocusDisease: () => void
}

function findDiseaseEntry(
  dzDict: DiseaseSystem,
  name: string,
): { systemKey: string; disease: Disease } | null {
  for (const systemKey of Object.keys(dzDict)) {
    const found = safeList(dzDict[systemKey]).find((d) => d.name === name)
    if (found) return { systemKey, disease: found }
  }
  return null
}

const DiseasesBySystemPage: React.FC<DiseasesBySystemPageProps> = ({
  setPage,
  abDict,
  dzDict,
  unifiedSearchSeed,
  onUnifiedSearchSeedConsumed,
  onNavigateInstitutional,
  onDeepLinkDrug,
  focusDiseaseName,
  onClearFocusDisease,
}) => {
  const [q, setQ] = useState(() => {
    const raw = readSessionJson<{ v: 1; q: string }>(ABV_SESSION_KEYS.diseasesUi)
    return raw?.v === 1 && typeof raw.q === 'string' ? raw.q : ''
  })
  const [selected, setSelected] = useState<{ systemKey: string; disease: Disease } | null>(null)
  const [catalogTagFilter, setCatalogTagFilter] = useState<Set<string>>(() => {
    const raw = readSessionJson<{ v: 1; tags: string[] }>(ABV_SESSION_KEYS.diseasesUi)
    return raw?.v === 1 && Array.isArray(raw.tags) ? new Set(raw.tags) : new Set()
  })
  const restoredDetailRef = useRef(false)

  const tagDiseaseCounts = useMemo(() => countDiseasesPerTag(dzDict), [dzDict])

  const filteredCatalogGrouped = useMemo(() => {
    const entries = filterDiseaseCatalogByTags(dzDict, catalogTagFilter)
    return groupCatalogBySystemKey(entries)
  }, [dzDict, catalogTagFilter])

  const unifiedHits = useMemo(() => {
    const t = q.trim()
    if (!t) return [] as UnifiedSearchHit[]
    return searchUnifiedClinical(t, abDict, dzDict)
  }, [q, abDict, dzDict])

  useEffect(() => {
    if (unifiedSearchSeed) {
      setQ(unifiedSearchSeed)
      onUnifiedSearchSeedConsumed?.()
    }
  }, [unifiedSearchSeed, onUnifiedSearchSeedConsumed])

  /** Reabre ficha de doença após recarregar a página (mesma aba). */
  useEffect(() => {
    if (restoredDetailRef.current) return
    const raw = readSessionJson<{ v: 1; diseaseName: string | null }>(ABV_SESSION_KEYS.diseasesUi)
    if (raw?.v === 1 && raw.diseaseName) {
      const found = findDiseaseEntry(dzDict, raw.diseaseName)
      if (found) setSelected(found)
    }
    restoredDetailRef.current = true
  }, [dzDict])

  useEffect(() => {
    if (!focusDiseaseName) return
    const found = findDiseaseEntry(dzDict, focusDiseaseName)
    if (found) setSelected(found)
    onClearFocusDisease()
  }, [focusDiseaseName, dzDict, onClearFocusDisease])

  useEffect(() => {
    writeSessionJson(ABV_SESSION_KEYS.diseasesUi, {
      v: 1,
      q,
      diseaseName: selected?.disease.name ?? null,
      tags: [...catalogTagFilter],
    })
  }, [q, selected, catalogTagFilter])

  const toggleCatalogTag = useCallback((tagId: string) => {
    setCatalogTagFilter((prev) => {
      const next = new Set(prev)
      if (next.has(tagId)) next.delete(tagId)
      else next.add(tagId)
      return next
    })
  }, [])

  const clearCatalogTagFilter = useCallback(() => {
    setCatalogTagFilter(new Set())
  }, [])

  const openDiseaseFromHit = (name: string) => {
    const found = findDiseaseEntry(dzDict, name)
    if (found) setSelected(found)
  }

  if (selected) {
    return (
      <div className="relative isolate min-h-full w-full bg-[hsl(var(--background))] px-3 py-4 sm:px-6 md:px-8 md:py-8">
        <div className="abv-panel relative z-10 w-full max-w-none p-4 shadow-md sm:p-6 md:p-8">
          <button
            type="button"
            onClick={() => setPage('home')}
            className="mb-4 flex cursor-pointer items-center font-semibold transition hover:opacity-90"
            style={{ color: 'hsl(var(--primary))' }}
          >
            <Icon name="back" className="mr-2 h-5 w-5" />
            Início
          </button>
          <DiseaseDetailView
            disease={selected.disease}
            abDict={abDict}
            comorbidities={CATALOG_COMORB}
            onDeepLinkDrug={onDeepLinkDrug}
            showPatientProfilePrompt={false}
            footerMode="catalog"
            onCatalogBack={() => setSelected(null)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="relative isolate min-h-full w-full bg-[hsl(var(--background))] px-3 py-4 sm:px-6 md:px-8 md:py-8">
      <div className="abv-panel relative z-10 w-full max-w-none p-4 shadow-md sm:p-6 md:p-8">
        <button
          type="button"
          onClick={() => setPage('home')}
          className="mb-6 flex cursor-pointer items-center text-lg font-semibold transition hover:opacity-90"
          style={{ color: 'hsl(var(--primary))' }}
        >
          <Icon name="back" className="mr-2 h-6 w-6" />
          Voltar ao início
        </button>
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide"
          style={{
            background: 'color-mix(in srgb, var(--chart-4) 18%, hsl(var(--card)))',
            color: 'hsl(var(--foreground))',
            border: '1px solid color-mix(in srgb, var(--chart-4) 35%, hsl(var(--border)))',
          }}
        >
          Doenças por sistema
        </span>
        <h1 className="mb-2 mt-3 text-3xl font-bold tracking-tight" style={{ color: 'hsl(var(--foreground))' }}>
          Condições clínicas
        </h1>
        <p className="mb-6 max-w-4xl text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Busca unificada (patógenos, resistência, fontes, doenças e fármacos). Para{' '}
          <strong className="text-[hsl(var(--foreground))]">classes de antimicrobianos com calculadora</strong>, use o{' '}
          <button
            type="button"
            className="font-semibold underline"
            style={{ color: 'hsl(var(--primary))' }}
            onClick={() => setPage('antibiotics')}
          >
            Guia de antimicrobianos
          </button>
          .
        </p>

        <div className="mb-6 flex flex-col gap-3 md:flex-row">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar condição, antimicrobiano, patógeno, resistência ou referência…"
            className="abv-input flex-1 p-3 text-sm md:text-base"
          />
        </div>

        {q.trim() && unifiedHits.length > 0 && (
          <section className="mb-8 rounded-[var(--radius)] border p-4" style={{ borderColor: 'hsl(var(--border))' }}>
            <h2 className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              Resultados da busca
            </h2>
            <p className="mb-3 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Ordem: patógenos, resistência e fontes; em seguida doenças e fármacos do catálogo.
            </p>
            <ul className="max-h-56 space-y-2 overflow-y-auto pr-1 text-sm">
              {unifiedHits.map((h, i) => {
                if (h.kind === 'disease') {
                  return (
                    <li key={`dz-${h.system}-${h.name}-${i}`}>
                      <button
                        type="button"
                        className="cursor-pointer text-left font-medium underline-offset-2 hover:underline"
                        style={{ color: 'hsl(var(--primary))' }}
                        onClick={() => openDiseaseFromHit(h.name)}
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
                    <button
                      type="button"
                      className="cursor-pointer text-left font-medium underline-offset-2 hover:underline"
                      style={{ color: 'hsl(var(--primary))' }}
                      onClick={() => onDeepLinkDrug(h.name)}
                    >
                      <span className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                        Fármaco:
                      </span>{' '}
                      {h.name} <span className="opacity-80">({h.className})</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {q.trim() && unifiedHits.length === 0 && (
          <p className="mb-6 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Nenhum resultado. Ajuste o termo ou navegue pelo catálogo abaixo.
          </p>
        )}

        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide"
            style={{
              background: 'color-mix(in srgb, hsl(var(--primary)) 18%, hsl(var(--card)))',
              color: 'hsl(var(--primary))',
              border: '1px solid color-mix(in srgb, hsl(var(--primary)) 35%, hsl(var(--border)))',
            }}
          >
            Catálogo por sistema
          </span>
        </div>
        <p className="mb-4 max-w-4xl text-xs leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Filtre por um ou mais sistemas (a lista mostra fichas de <strong className="font-semibold">qualquer</strong> sistema
          selecionado).
        </p>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-medium uppercase tracking-wide" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Sistemas
            </span>
            {catalogTagFilter.size > 0 ? (
              <button
                type="button"
                onClick={clearCatalogTagFilter}
                className="text-[11px] font-semibold underline-offset-2 hover:underline"
                style={{ color: 'hsl(var(--primary))' }}
              >
                Limpar filtros
              </button>
            ) : null}
          </div>
          <div className="-mx-1 flex flex-wrap gap-2 px-1 pb-1">
            {CLINICAL_SYSTEM_TAGS.map(({ id, label, Icon }) => {
              const active = catalogTagFilter.has(id)
              const n = tagDiseaseCounts[id as ClinicalSystemTagId] ?? 0
              const chipTheme = CLINICAL_TAG_CARD_THEME[id as ClinicalSystemTagId]
              const faded = n === 0
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleCatalogTag(id)}
                  className="inline-flex min-h-[2.25rem] shrink-0 items-center gap-1.5 rounded-full border-2 px-2.5 py-1.5 text-left text-xs font-medium transition hover:brightness-[1.03] dark:hover:brightness-110"
                  style={
                    active
                      ? {
                          borderColor: chipTheme.accent,
                          background: chipTheme.bgSelected,
                          color: 'hsl(var(--foreground))',
                          boxShadow: `0 0 0 1px color-mix(in srgb, ${chipTheme.accent} 50%, transparent)`,
                          opacity: faded ? 0.55 : 1,
                        }
                      : {
                          borderColor: chipTheme.border,
                          background: chipTheme.bg,
                          color: 'hsl(var(--foreground))',
                          opacity: faded ? 0.55 : 1,
                        }
                  }
                  title={n === 0 ? 'Nenhuma ficha neste sistema (ainda)' : `${n} ficha(s)`}
                >
                  <Icon className="h-4 w-4 shrink-0" style={{ color: chipTheme.accent }} aria-hidden />
                  <span className="whitespace-nowrap">{label}</span>
                  <span
                    className="ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums"
                    style={{
                      background: `color-mix(in srgb, ${chipTheme.accent} ${active ? '28%' : '14%'}, hsl(var(--card)))`,
                      color: 'hsl(var(--foreground))',
                    }}
                  >
                    {n}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {filteredCatalogGrouped.length === 0 ? (
            <p className="rounded-lg border px-3 py-4 text-sm" style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
              Nenhuma ficha corresponde a esta combinação de filtros. Tente outro sistema ou limpe os filtros.
            </p>
          ) : (
            filteredCatalogGrouped.map(({ systemKey, diseases }) => {
              const { tagId, theme } = catalogCardThemeForSystemKey(systemKey)
              const tagMeta = CLINICAL_SYSTEM_TAGS.find((t) => t.id === tagId)
              const SectionIcon = tagMeta?.Icon
              return (
                <div key={systemKey}>
                  <div className="mb-3 flex items-center gap-2.5">
                    {SectionIcon ? (
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                        style={{
                          background: theme.bg,
                          border: `1px solid ${theme.border}`,
                          color: theme.accent,
                        }}
                        aria-hidden
                      >
                        <SectionIcon className="h-[1.15rem] w-[1.15rem]" />
                      </span>
                    ) : null}
                    <h4 className="text-sm font-semibold tracking-tight" style={{ color: 'hsl(var(--foreground))' }}>
                      {systemKey}
                    </h4>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {diseases.map((dz) => {
                      const CardIcon = tagMeta?.Icon
                      return (
                        <button
                          key={`${systemKey}-${dz.name}`}
                          type="button"
                          onClick={() => setSelected({ systemKey, disease: dz })}
                          className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 px-4 py-4 text-left text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                          style={{
                            borderColor: theme.border,
                            background: theme.bg,
                            color: 'hsl(var(--foreground))',
                          }}
                        >
                          <span
                            className="absolute left-0 top-0 h-full w-1.5 rounded-l-2xl"
                            style={{ background: theme.accent }}
                            aria-hidden
                          />
                          <div className="relative flex items-start justify-between gap-2 pl-2.5">
                            <span className="font-semibold leading-snug">{dz.name}</span>
                            {CardIcon ? (
                              <CardIcon
                                className="h-5 w-5 shrink-0 opacity-60 transition group-hover:opacity-90"
                                style={{ color: theme.accent }}
                                aria-hidden
                              />
                            ) : null}
                          </div>
                          <div
                            className="relative mt-2 line-clamp-3 pl-2.5 text-xs leading-relaxed"
                            style={{ color: 'hsl(var(--muted-foreground))' }}
                          >
                            <InlineRichText text={dz.pathogens} />
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default DiseasesBySystemPage
