import React, { useCallback, useMemo, useState } from 'react'
import {
  AbvTab,
  Species,
  LifeStageKey,
  ComorbidityState,
  DiseaseSystem,
  Disease,
  AntibioticClass,
  PathophysiologyVisual,
  TreatmentLineBlock,
} from '../types'
import { ABV_SPECIES_IMG_CAT, ABV_SPECIES_IMG_DOG } from '../constants/speciesAssets'
import Icon from '../components/Icon'
import Modal from '../components/Modal'
import { LIFE_STAGES, COMORB_HELP_TEXT } from '../constants'
import RichTextViewer, { InlineRichText } from '../components/RichTextViewer'
import {
  CLINICAL_SYSTEM_TAGS,
  CLINICAL_TAG_CARD_THEME,
  catalogCardThemeForSystemKey,
  countDiseasesPerTag,
  filterDiseaseCatalogByTags,
  groupCatalogBySystemKey,
  type ClinicalSystemTagId,
} from '../data/clinicalSystemTags'
import { PathophysiologyVisualView } from '../components/PathophysiologyVisualView'
import { DiseaseTreatmentBlocks } from '../components/DiseaseTreatmentBlocks'
import { safeList } from '../utils/dataUtils'

const comorbLabels: { [key in keyof ComorbidityState]: string } = {
  renal: 'Renal',
  hepatic: 'Hepática',
  septic: 'Séptica',
  cardiac: 'Cardíaca',
  neurological: 'Neurológica',
}

interface PatientGuideProps {
  setPage: (page: AbvTab) => void
  onDeepLinkDrug: (drugName: string) => void
  onReset: () => void
  step: number
  setStep: (step: number) => void
  species: Species | null
  setSpecies: (species: Species | null) => void
  life: LifeStageKey | null
  setLife: (life: LifeStageKey | null) => void
  co: ComorbidityState
  setCo: (co: ComorbidityState) => void
  chosen: Disease | null
  setChosen: (d: Disease | null) => void
  dzDict: DiseaseSystem
  abDict: AntibioticClass
}

const PatientGuide: React.FC<PatientGuideProps> = ({
  setPage,
  onDeepLinkDrug,
  onReset,
  step,
  setStep,
  species,
  setSpecies,
  life,
  setLife,
  co,
  setCo,
  chosen,
  setChosen,
  dzDict,
  abDict,
}) => {
  const [modalInfo, setModalInfo] = useState<{
    title: string
    content: string
    visual?: PathophysiologyVisual
    treatmentAppendix?: TreatmentLineBlock[]
    wide?: boolean
  } | null>(null)

  /** Filtro multi-tag (OR) no passo do catálogo */
  const [catalogTagFilter, setCatalogTagFilter] = useState<Set<string>>(() => new Set())

  const tagDiseaseCounts = useMemo(() => countDiseasesPerTag(dzDict), [dzDict])

  /** Evita repetir a mesma ficha longa do mesmo fármaco ao percorrer 1ª→2ª→3ª linha. */
  const drugDetailDedupeSet = useMemo(() => new Set<string>(), [chosen?.name])

  const filteredCatalogGrouped = useMemo(() => {
    const entries = filterDiseaseCatalogByTags(dzDict, catalogTagFilter)
    return groupCatalogBySystemKey(entries)
  }, [dzDict, catalogTagFilter])

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

  const renderStep = () => {
    switch (step) {
      case 1: {
        const showSpeciesWarning = species && !life
        const showLifeStageWarning = !species && life

        return (
          <div className="space-y-6">
            <div>
              <h3
                className={`mb-3 text-lg font-semibold transition-colors ${showSpeciesWarning ? 'text-red-600' : ''}`}
                style={!showSpeciesWarning ? { color: 'hsl(var(--foreground))' } : undefined}
              >
                1) Selecione a espécie
              </h3>
              <div
                className={`grid grid-cols-2 gap-4 rounded-xl border-2 p-1 transition-all ${showSpeciesWarning ? 'border-red-400' : 'border-transparent'}`}
              >
                <button
                  type="button"
                  onClick={() => setSpecies('Cão')}
                  className={`flex flex-col items-center justify-center overflow-hidden rounded-xl border-2 p-4 transition-transform duration-200 hover:scale-[1.02] ${species === 'Cão' ? 'ring-2' : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:opacity-95'}`}
                  style={
                    species === 'Cão'
                      ? {
                          borderColor: 'hsl(var(--primary))',
                          background: 'color-mix(in srgb, hsl(var(--primary)) 12%, hsl(var(--card)))',
                          boxShadow: '0 0 0 1px color-mix(in srgb, hsl(var(--ring)) 45%, transparent)',
                        }
                      : { borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }
                  }
                >
                  <img src={ABV_SPECIES_IMG_DOG} alt="Ilustração de cão" className="h-28 w-full max-w-[140px] object-contain md:h-32" />
                  <span className="mt-3 text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                    Cão
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setSpecies('Gato')}
                  className={`flex flex-col items-center justify-center overflow-hidden rounded-xl border-2 p-4 transition-transform duration-200 hover:scale-[1.02] ${species === 'Gato' ? 'ring-2' : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:opacity-95'}`}
                  style={
                    species === 'Gato'
                      ? {
                          borderColor: 'hsl(var(--primary))',
                          background: 'color-mix(in srgb, hsl(var(--primary)) 12%, hsl(var(--card)))',
                          boxShadow: '0 0 0 1px color-mix(in srgb, hsl(var(--ring)) 45%, transparent)',
                        }
                      : { borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }
                  }
                >
                  <img src={ABV_SPECIES_IMG_CAT} alt="Ilustração de gato" className="h-28 w-full max-w-[140px] object-contain md:h-32" />
                  <span className="mt-3 text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                    Gato
                  </span>
                </button>
              </div>
            </div>
            <div>
              <h3
                className={`mb-3 text-lg font-semibold transition-colors ${showLifeStageWarning ? 'text-red-600' : ''}`}
                style={!showLifeStageWarning ? { color: 'hsl(var(--foreground))' } : undefined}
              >
                2) Selecione a fase da vida
              </h3>
              <div className={`rounded-xl border-2 p-1 transition-all ${showLifeStageWarning ? 'border-red-400' : 'border-transparent'}`}>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {(Object.keys(LIFE_STAGES) as LifeStageKey[]).map((k) => {
                    const v = LIFE_STAGES[k]
                    return (
                      <div key={k}>
                        <button
                          type="button"
                          onClick={() => setLife(k)}
                          className={`flex w-full items-center justify-between rounded-lg p-3 text-left transition ${life === k ? 'font-semibold' : 'hover:opacity-95'}`}
                          style={
                            life === k
                              ? { background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }
                              : { background: 'color-mix(in srgb, hsl(var(--foreground)) 10%, hsl(var(--card)))', color: 'hsl(var(--foreground))' }
                          }
                        >
                          <span>{v.label}</span>
                          {v.warn && (
                            <span
                              role="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setModalInfo({ title: `Alerta: ${v.label}`, content: v.warn_why || v.warn || 'Sem observações.' })
                              }}
                              className={`cursor-pointer rounded-full p-1 ${life === k ? 'hover:bg-white/20' : ''}`}
                              style={
                                life === k
                                  ? undefined
                                  : { background: 'transparent' }
                              }
                              onMouseEnter={(e) => {
                                if (life !== k) {
                                  e.currentTarget.style.background =
                                    'color-mix(in srgb, hsl(var(--foreground)) 14%, transparent)'
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (life !== k) e.currentTarget.style.background = 'transparent'
                              }}
                            >
                              <Icon name="help" />
                            </span>
                          )}
                        </button>
                        {life === k && v.warn && (
                          <div
                            className="mt-2 rounded border p-2 text-xs font-medium"
                            style={{
                              borderColor: 'color-mix(in srgb, var(--chart-5) 40%, hsl(var(--border)))',
                              background: 'color-mix(in srgb, var(--chart-5) 12%, hsl(var(--card)))',
                              color: 'hsl(var(--foreground))',
                            }}
                          >
                            {v.warn}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <button
              type="button"
              disabled={!species || !life}
              onClick={() => setStep(2)}
              className="abv-btn-primary w-full cursor-pointer rounded-lg py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
            >
              Próximo
            </button>
            {(!species || !life) && (
              <p className="mt-2 text-center text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Por favor, selecione a espécie e a fase da vida para continuar.
              </p>
            )}
          </div>
        )
      }
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                3) Comorbidades
              </h3>
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-1 text-sm opacity-90 hover:opacity-100"
                style={{ color: 'hsl(var(--primary))' }}
                onClick={() => setModalInfo({ title: 'Ajustes por Comorbidade', content: COMORB_HELP_TEXT })}
              >
                <Icon name="help" /> Dúvidas
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              {(Object.keys(co) as Array<keyof ComorbidityState>).map((k) => (
                <label
                  key={k}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border-2 px-3 py-2 font-medium transition hover:opacity-95"
                  style={
                    co[k]
                      ? {
                          borderColor: 'hsl(var(--primary))',
                          background: 'color-mix(in srgb, hsl(var(--primary)) 14%, hsl(var(--card)))',
                          color: 'hsl(var(--foreground))',
                        }
                      : {
                          borderColor: 'hsl(var(--border))',
                          background: 'color-mix(in srgb, hsl(var(--foreground)) 6%, hsl(var(--card)))',
                          color: 'hsl(var(--foreground))',
                        }
                  }
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={co[k]}
                    onChange={(e) => setCo({ ...co, [k]: e.target.checked })}
                  />
                  {comorbLabels[k]}
                </label>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="abv-btn-secondary w-full cursor-pointer py-3 font-semibold transition">
                Voltar
              </button>
              <button
                type="button"
                onClick={() => setStep(chosen ? 4 : 3)}
                className="abv-btn-primary w-full cursor-pointer rounded-lg py-3 font-semibold"
              >
                Próximo
              </button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
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
            <h3 className="text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              4) Escolha a condição
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Filtre por um ou mais sistemas (a lista mostra fichas de <strong className="font-semibold">qualquer</strong>{' '}
              sistema selecionado). Para comparar doses e calculadora, use o{' '}
              <button
                type="button"
                className="cursor-pointer font-semibold underline"
                style={{ color: 'hsl(var(--primary))' }}
                onClick={() => setPage('antibiotics')}
              >
                Guia de antimicrobianos
              </button>
              .
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
                  const n = tagDiseaseCounts[id] ?? 0
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

            <div className="mt-3 space-y-6">
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
                          const isCardSelected = chosen?.name === dz.name
                          const CardIcon = tagMeta?.Icon
                          return (
                            <button
                              key={`${systemKey}-${dz.name}`}
                              type="button"
                              onClick={() => {
                                setChosen(dz)
                                setStep(4)
                              }}
                              className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 px-4 py-4 text-left text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                                isCardSelected ? 'ring-2 ring-[hsl(var(--primary))] ring-offset-2 ring-offset-[hsl(var(--background))]' : ''
                              }`}
                              style={{
                                borderColor: isCardSelected ? 'hsl(var(--primary))' : theme.border,
                                background: isCardSelected ? theme.bgSelected : theme.bg,
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

            <div className="flex gap-3 border-t pt-4" style={{ borderColor: 'hsl(var(--border))' }}>
              <button type="button" onClick={() => setStep(2)} className="abv-btn-secondary w-full cursor-pointer py-3 font-semibold transition">
                Voltar
              </button>
            </div>
          </div>
        )
      case 4:
        if (!chosen) {
          return (
            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Nenhuma condição selecionada. Volte e escolha uma doença na lista.
            </p>
          )
        }
        return (
          <div className="space-y-4">
            {!species || !life ? (
              <div
                className="rounded-lg border p-3 text-sm"
                style={{
                  borderColor: 'color-mix(in srgb, hsl(var(--chart-5)) 40%, hsl(var(--border)))',
                  background: 'color-mix(in srgb, hsl(var(--chart-5)) 10%, hsl(var(--card)))',
                  color: 'hsl(var(--foreground))',
                }}
              >
                <p className="font-medium">Complete o perfil do paciente para ver alertas de dose/comorbidade nos fármacos.</p>
                <button
                  type="button"
                  className="mt-2 text-sm font-semibold underline"
                  style={{ color: 'hsl(var(--primary))' }}
                  onClick={() => setStep(1)}
                >
                  Definir espécie e fase da vida
                </button>
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <h2 className="text-2xl font-bold tracking-tight sm:flex-1" style={{ color: 'hsl(var(--foreground))' }}>
                {chosen.name}
              </h2>
              {chosen.pathophysiologyFull || chosen.pathophysiologyVisual ? (
                <button
                  type="button"
                  className="inline-flex shrink-0 cursor-pointer items-center gap-2 self-start rounded-xl border px-3 py-2 text-sm font-semibold shadow-sm transition hover:opacity-90 sm:ml-4"
                  style={{
                    borderColor: 'hsl(var(--primary))',
                    color: 'hsl(var(--primary))',
                    background: 'color-mix(in srgb, hsl(var(--primary)) 8%, hsl(var(--card)))',
                  }}
                  onClick={() =>
                    setModalInfo({
                      title: `Fisiopatologia — ${chosen.name}`,
                      content: chosen.pathophysiologyFull,
                      visual: chosen.pathophysiologyVisual,
                      treatmentAppendix: [chosen.firstLine, chosen.secondLine, chosen.thirdLine].filter(
                        (b): b is TreatmentLineBlock => Boolean(b),
                      ),
                      wide: true,
                    })
                  }
                >
                  <Icon name="help" className="h-4 w-4" />
                  Fisiopatologia completa
                </button>
              ) : null}
            </div>

            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <span className="font-medium text-[hsl(var(--foreground))]">Patógenos:</span>{' '}
              {chosen.pathogens ? <InlineRichText text={chosen.pathogens} /> : '—'}
            </p>
            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <span className="font-medium text-[hsl(var(--foreground))]">Duração sugerida:</span>{' '}
              {chosen.duration ? <InlineRichText text={chosen.duration} /> : '—'}
            </p>

            <DiseaseTreatmentBlocks
              block={chosen.firstLine}
              abDict={abDict}
              onSeeGuide={onDeepLinkDrug}
              comorbidities={co}
              drugDetailDedupeSet={drugDetailDedupeSet}
            />

            {chosen.secondLine ? (
              <DiseaseTreatmentBlocks
                block={chosen.secondLine}
                abDict={abDict}
                onSeeGuide={onDeepLinkDrug}
                comorbidities={co}
                drugDetailDedupeSet={drugDetailDedupeSet}
              />
            ) : null}

            {chosen.thirdLine ? (
              <DiseaseTreatmentBlocks
                block={chosen.thirdLine}
                abDict={abDict}
                onSeeGuide={onDeepLinkDrug}
                comorbidities={co}
                drugDetailDedupeSet={drugDetailDedupeSet}
              />
            ) : null}

            {chosen.notes ? (
              <div>
                <h3 className="mb-2 text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                  Notas clínicas
                </h3>
                <div
                  className="rounded-lg border p-3 text-sm leading-relaxed"
                  style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                >
                  <RichTextViewer text={chosen.notes} />
                </div>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setChosen(null)
                  setStep(3)
                }}
                className="abv-btn-secondary cursor-pointer rounded-lg px-4 py-2 font-semibold"
              >
                Outra condição
              </button>
              <button type="button" onClick={onReset} className="abv-btn-primary cursor-pointer rounded-lg px-4 py-2 font-semibold">
                Nova consulta
              </button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="relative isolate min-h-full w-full overflow-x-hidden bg-[hsl(var(--background))] px-3 py-4 sm:px-6 md:px-8 md:py-8">
      <div className="abv-panel relative z-10 w-full max-w-none p-4 shadow-md sm:p-6 md:p-8">
        <button
          type="button"
          onClick={() => setPage('home')}
          className="mb-6 flex cursor-pointer items-center font-semibold transition hover:opacity-90"
          style={{ color: 'hsl(var(--primary))' }}
        >
          <Icon name="back" className="mr-2 h-5 w-5" />
          Voltar
        </button>
        <h1 className="mb-2 text-3xl font-bold tracking-tight" style={{ color: 'hsl(var(--foreground))' }}>
          Guia por suspeita clínica
        </h1>
        <p className="mb-6 max-w-4xl text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Perfil do paciente e condições cadastradas; os links de fármaco abrem o guia de antimicrobianos com doses e
          calculadora.
        </p>
        <div
          className="rounded-[var(--radius)] border p-6 shadow-sm"
          style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))', color: 'hsl(var(--card-foreground))' }}
        >
          {renderStep()}
        </div>
      </div>
      <Modal
        open={!!modalInfo}
        title={modalInfo?.title || 'Ajuda'}
        onClose={() => setModalInfo(null)}
        wide={modalInfo?.wide}
      >
        {modalInfo?.visual ? (
          <PathophysiologyVisualView
            doc={modalInfo.visual}
            treatmentAppendix={modalInfo.treatmentAppendix}
            treatmentAppendixDedupeKey={chosen?.name}
          />
        ) : (
          <RichTextViewer text={modalInfo?.content || ''} />
        )}
      </Modal>
    </div>
  )
}

export default PatientGuide
