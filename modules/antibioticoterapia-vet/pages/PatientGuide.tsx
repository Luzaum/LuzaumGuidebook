import React, { useMemo, useState } from 'react'
import { AbvTab, DiseaseSystem, AntibioticClass, Species, LifeStageKey, Disease, ComorbidityState } from '../types'
import { ABV_SPECIES_IMG_CAT, ABV_SPECIES_IMG_DOG } from '../constants/speciesAssets'
import { safeList } from '../utils/dataUtils'
import Icon from '../components/Icon'
import Modal from '../components/Modal'
import InlineDrugSummary from '../components/InlineDrugSummary'
import { DZ_EXPLAIN, LIFE_STAGES, COMORB_HELP_TEXT } from '../constants'
import RichTextViewer from '../components/RichTextViewer'
import { SYNDROME_PROFILES_V2 } from '../data-v2/syndromes'
import { buildRecommendation, patientContextFromWizard } from '../engine'
import { SyndromeV2Panel } from '../components/SyndromeV2Panel'
import type { SeverityTier } from '../model/types'
import { SYNDROME_V2_DISPLAY_ORDER, type SyndromeId } from '../model/ids'

const comorbLabels: { [key in keyof ComorbidityState]: string } = {
  renal: 'Renal',
  hepatic: 'Hepática',
  septic: 'Séptica',
  cardiac: 'Cardíaca',
  neurological: 'Neurológica',
}

const SEVERITY_OPTIONS: { value: SeverityTier; label: string }[] = [
  { value: 'ambulatory_stable', label: 'Ambulatorial estável' },
  { value: 'hospitalized', label: 'Internado' },
  { value: 'severe', label: 'Grave' },
  { value: 'septic_unstable', label: 'Séptico / instável' },
]

interface PatientGuideProps {
  setPage: (page: AbvTab) => void
  dzDict: DiseaseSystem
  abDict: AntibioticClass
  onDeepLinkDrug: (drugName: string) => void
  onOpenMoleculeV2: (moleculeId: string) => void
  onReset: () => void
  step: number
  setStep: (step: number) => void
  species: Species | null
  setSpecies: (species: Species | null) => void
  life: LifeStageKey | null
  setLife: (life: LifeStageKey | null) => void
  co: ComorbidityState
  setCo: (co: ComorbidityState) => void
  severity: SeverityTier
  setSeverity: (s: SeverityTier) => void
  chosenV2: SyndromeId | null
  setChosenV2: (id: SyndromeId | null) => void
  chosen: Disease | null
  setChosen: (disease: Disease | null) => void
}

const PatientGuide: React.FC<PatientGuideProps> = ({
  setPage,
  dzDict,
  abDict,
  onDeepLinkDrug,
  onOpenMoleculeV2,
  onReset,
  step,
  setStep,
  species,
  setSpecies,
  life,
  setLife,
  co,
  setCo,
  severity,
  setSeverity,
  chosenV2,
  setChosenV2,
  chosen,
  setChosen,
}) => {
  const systems = useMemo(() => Object.keys(dzDict).sort((a, b) => a.localeCompare(b, 'pt')), [dzDict])
  const [modalInfo, setModalInfo] = useState<{ title: string; content: string } | null>(null)
  const [showLegacyCatalog, setShowLegacyCatalog] = useState(true)

  const v2Result = useMemo(() => {
    if (!chosenV2 || !species || !life) return null
    const ctx = patientContextFromWizard(species, life, co, severity)
    if (!ctx) return null
    try {
      return buildRecommendation(chosenV2, ctx)
    } catch {
      return null
    }
  }, [chosenV2, species, life, co, severity])

  const getDzExplainBlock = (name: string) => {
    const e = DZ_EXPLAIN[name]
    if (!e) return { title: name, content: 'Nenhuma explicação detalhada disponível.' }
    return {
      title: name,
      content: `##Fisiopatogenia##\n${e.physio}\n\n##Justificativa do Tratamento##\n${e.why}\n\n##Sinais Clínicos e Diagnóstico##\n${e.signs}\n\n##Terapias Adjuvantes e Manejo##\n${e.adjuncts}`,
    }
  }

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
                              className={`rounded-full p-1 ${life === k ? 'hover:bg-white/20' : ''}`}
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
              className="abv-btn-primary w-full rounded-lg py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
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
                className="inline-flex items-center gap-1 text-sm opacity-90 hover:opacity-100"
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
            <div>
              <h3 className="mb-2 text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                4) Gravidade assistencial
              </h3>
              <p className="mb-2 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Usado pela engine v2 para escolher o cenário (não infere automaticamente a gravidade clínica).
              </p>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as SeverityTier)}
                className="abv-input w-full rounded-lg p-3"
              >
                {SEVERITY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="abv-btn-secondary w-full py-3 font-semibold transition">
                Voltar
              </button>
              <button type="button" onClick={() => setStep(3)} className="abv-btn-primary w-full rounded-lg py-3 font-semibold">
                Próximo
              </button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide"
                  style={{
                    background: 'color-mix(in srgb, var(--chart-2) 20%, hsl(var(--card)))',
                    color: 'hsl(var(--foreground))',
                    border: '1px solid color-mix(in srgb, var(--chart-2) 35%, hsl(var(--border)))',
                  }}
                >
                  Catálogo clássico
                </span>
                <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Por sistema · liga aos ATBs do guia (cores + calculadora)
                </span>
              </div>
              <h3 className="text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                1) Escolha por doença
              </h3>
              <p className="mt-1 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Lista tradicional por aparelho. Depois de ver recomendações, use <strong>Guia</strong> em cada ATB ou o{' '}
                <strong>Guia de antimicrobianos</strong> para a ficha completa. O bloco v2 fica abaixo.
              </p>
              <button
                type="button"
                className="mt-2 text-sm font-medium underline"
                style={{ color: 'hsl(var(--primary))' }}
                onClick={() => setShowLegacyCatalog((v) => !v)}
              >
                {showLegacyCatalog ? 'Ocultar' : 'Mostrar'} lista de doenças por sistema
              </button>
              {showLegacyCatalog && (
                <div className="mt-3 max-h-[min(52vh,420px)] space-y-3 overflow-y-auto pr-2">
                  {systems.map((sys) => (
                    <div
                      key={sys}
                      className="rounded-lg border"
                      style={{
                        borderColor: 'hsl(var(--border))',
                        background: 'color-mix(in srgb, hsl(var(--foreground)) 4%, hsl(var(--card)))',
                      }}
                    >
                      <div className="px-3 py-2 font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                        {sys}
                      </div>
                      <div className="grid gap-2 border-t p-3 md:grid-cols-2" style={{ borderColor: 'hsl(var(--border))' }}>
                        {safeList(dzDict[sys]).map((dz: Disease) => (
                          <button
                            key={dz.name}
                            type="button"
                            onClick={() => {
                              setChosen(dz)
                              setChosenV2(null)
                            }}
                            className={`rounded-md border px-4 py-2 text-left text-sm transition ${chosen?.name === dz.name ? 'ring-2' : 'hover:opacity-95'}`}
                            style={
                              chosen?.name === dz.name
                                ? {
                                    borderColor: 'hsl(var(--primary))',
                                    background: 'hsl(var(--primary))',
                                    color: 'hsl(var(--primary-foreground))',
                                    boxShadow: '0 0 0 1px color-mix(in srgb, hsl(var(--ring)) 50%, transparent)',
                                  }
                                : {
                                    borderColor: 'hsl(var(--border))',
                                    background: 'hsl(var(--card))',
                                    color: 'hsl(var(--foreground))',
                                  }
                            }
                          >
                            {dz.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t pt-4" style={{ borderColor: 'hsl(var(--border))' }}>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide"
                  style={{
                    background: 'color-mix(in srgb, hsl(var(--primary)) 18%, hsl(var(--card)))',
                    color: 'hsl(var(--primary))',
                    border: '1px solid color-mix(in srgb, hsl(var(--primary)) 35%, hsl(var(--border)))',
                  }}
                >
                  Fluxo v2
                </span>
                <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Síndromes com cultura, cenários e concordância institucional
                </span>
              </div>
              <h3 className="text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                2) Ou escolha por síndrome (motor estruturado)
              </h3>
              <p className="mt-1 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Modelo v2 com IDs estáveis; não substitui o catálogo por doença acima — complementa com regimes e
                stewardship.
              </p>
              <div className="mt-3 grid max-h-[min(60vh,480px)] gap-2 overflow-y-auto pr-1 md:grid-cols-2 lg:grid-cols-3">
                {SYNDROME_V2_DISPLAY_ORDER.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setChosenV2(id)
                      setChosen(null)
                    }}
                    className={`rounded-lg border px-3 py-3 text-left text-sm transition ${chosenV2 === id ? 'ring-2' : 'hover:opacity-95'}`}
                    style={
                      chosenV2 === id
                        ? {
                            borderColor: 'hsl(var(--primary))',
                            background: 'hsl(var(--primary))',
                            color: 'hsl(var(--primary-foreground))',
                            boxShadow: '0 0 0 1px color-mix(in srgb, hsl(var(--ring)) 55%, transparent)',
                          }
                        : {
                            borderColor: 'hsl(var(--border))',
                            background: 'hsl(var(--card))',
                            color: 'hsl(var(--foreground))',
                          }
                    }
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold leading-snug">{SYNDROME_PROFILES_V2[id].label}</span>
                      <span
                        className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
                        style={
                          chosenV2 === id
                            ? { background: 'rgba(255,255,255,0.25)', color: 'hsl(var(--primary-foreground))' }
                            : {
                                background: 'color-mix(in srgb, hsl(var(--secondary)) 22%, hsl(var(--card)))',
                                color: 'hsl(var(--secondary))',
                              }
                        }
                      >
                        v2
                      </span>
                    </div>
                    <p className="mt-1 text-xs opacity-90">
                      {SYNDROME_PROFILES_V2[id].summary.length > 120
                        ? `${SYNDROME_PROFILES_V2[id].summary.slice(0, 120)}…`
                        : SYNDROME_PROFILES_V2[id].summary}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 border-t pt-4" style={{ borderColor: 'hsl(var(--border))' }}>
              <button type="button" onClick={() => setStep(2)} className="abv-btn-secondary w-full py-3 font-semibold transition">
                Voltar
              </button>
              <button
                type="button"
                disabled={
                  (!chosen && !chosenV2) || (!!chosenV2 && (!species || !life))
                }
                onClick={() => setStep(4)}
                className="abv-btn-primary w-full rounded-lg py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              >
                Ver recomendações
              </button>
            </div>
          </div>
        )
      case 4:
        if (chosenV2) {
          if (!v2Result) {
            return (
              <p className="text-red-700 dark:text-red-300">
                Não foi possível gerar o resultado v2. Verifique os dados do paciente e tente novamente.
              </p>
            )
          }
          return (
            <div>
              <h2 className="mb-3 font-serif text-2xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                Recomendações (v2): {v2Result.syndromeLabel}
              </h2>
              <SyndromeV2Panel result={v2Result} onOpenMoleculeV2={onOpenMoleculeV2} />
              <button type="button" onClick={onReset} className="abv-btn-primary mt-8 w-full rounded-lg py-3 font-semibold">
                Nova consulta
              </button>
            </div>
          )
        }
        if (!chosen) return null
        return (
          <div>
            <h2 className="mb-3 font-serif text-2xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
              Recomendações para {chosen.name}
            </h2>
            <div
              className="abv-panel mb-4 p-3 text-sm"
              style={{
                background: 'color-mix(in srgb, hsl(var(--primary)) 8%, hsl(var(--card)))',
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="mb-1 text-base font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                    {chosen.name}
                  </div>
                  <div>
                    <b>Patógenos comuns:</b> <span className="italic">{chosen.pathogens || '—'}</span>
                  </div>
                  <div>
                    <b>Duração típica:</b> {chosen.duration || '—'}
                  </div>
                  {chosen.notes && (
                    <div className="mt-1">
                      <b>Notas:</b> {chosen.notes}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="flex-shrink-0 opacity-90 hover:opacity-100"
                  style={{ color: 'hsl(var(--primary))' }}
                  title="Ver explicações detalhadas"
                  onClick={() => setModalInfo(getDzExplainBlock(chosen.name))}
                >
                  <Icon name="help" />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {safeList(chosen.first_line).length > 0 && (
                <div>
                  <h4 className="mb-2 text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                    Primeira Escolha (Empírico)
                  </h4>
                  <div className="space-y-2">
                    {chosen.first_line.map((n, i) => (
                      <InlineDrugSummary key={`first-${i}`} name={n} abDict={abDict} onSeeGuide={onDeepLinkDrug} comorbidities={co} />
                    ))}
                  </div>
                </div>
              )}
              {safeList(chosen.alternatives).length > 0 && (
                <div>
                  <h4 className="mb-2 mt-4 text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                    Alternativas / Escalonamento
                  </h4>
                  <div className="space-y-2">
                    {chosen.alternatives.map((n, i) => (
                      <InlineDrugSummary key={`alt-${i}`} name={n} abDict={abDict} onSeeGuide={onDeepLinkDrug} comorbidities={co} />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => setPage('antibiotics')}
              className="abv-btn-secondary mt-4 w-full rounded-lg border py-3 font-semibold transition"
              style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
            >
              Abrir catálogo de antimicrobianos (classes coloridas e calculadora)
            </button>
            <button type="button" onClick={onReset} className="abv-btn-primary mt-4 w-full rounded-lg py-3 font-semibold">
              Nova consulta
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="relative isolate min-h-full overflow-hidden bg-[hsl(var(--background))] p-4 md:p-8">
      <div className="abv-panel relative z-10 mx-auto max-w-4xl p-6 shadow-md">
        <button
          type="button"
          onClick={() => setPage('home')}
          className="mb-6 flex items-center font-semibold transition hover:opacity-90"
          style={{ color: 'hsl(var(--primary))' }}
        >
          <Icon name="back" className="mr-2 h-5 w-5" />
          Voltar
        </button>
        <h1 className="mb-2 font-serif text-3xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
          Guia por suspeita clínica
        </h1>
        <p className="mb-6 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
          O primeiro bloco de síndromes usa o motor v2; o catálogo antigo permanece como fallback explícito.
        </p>
        <div
          className="rounded-[var(--radius)] border p-6 shadow-sm"
          style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))', color: 'hsl(var(--card-foreground))' }}
        >
          {renderStep()}
        </div>
      </div>
      <Modal open={!!modalInfo} title={modalInfo?.title || 'Ajuda'} onClose={() => setModalInfo(null)}>
        <RichTextViewer text={modalInfo?.content || ''} />
      </Modal>
    </div>
  )
}

export default PatientGuide
