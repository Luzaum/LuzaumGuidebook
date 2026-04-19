import React, { useEffect, useMemo, useState } from 'react'
import Icon from '../components/Icon'
import { InlineRichText } from '../components/RichTextViewer'
import { SyndromeV2Panel } from '../components/SyndromeV2Panel'
import { DiseaseTreatmentBlocks } from '../components/DiseaseTreatmentBlocks'
import { CCIH_2024_PRIORITY_PAGE_AUDIT } from '../data-v2/ccih2024PageAudit'
import { getSyndromeInstitutionalMapping } from '../data-v2/institutionalMappings'
import { InstitutionalProvenanceStrip } from '../components/InstitutionalProvenanceStrip'
import { buildRecommendation } from '../engine/buildRecommendation'
import { SYNDROME_PROFILES_V2 } from '../data-v2/syndromes'
import { safeList } from '../utils/dataUtils'
import type { AbvTab, AntibioticClass, ComorbidityState, DiseaseSystem } from '../types'
import type { ComorbidityFlagsV2, PatientContextV2, SeverityTier } from '../model/types'
import { ABV_SESSION_KEYS, readSessionJson, writeSessionJson } from '../utils/abvSessionPersistence'

const PERIOP_COMORB: ComorbidityState = {
  renal: false,
  hepatic: false,
  septic: false,
  cardiac: false,
  neurological: false,
}

const PERIOP_DEFAULT_CTX: PatientContextV2 = {
  species: 'dog',
  ageBand: 'adult',
  isGestante: false,
  isLactante: false,
  severity: 'hospitalized',
  comorbidities: { renal: false, hepatic: false, cardiac: false, neurological: false, septic: false },
}

function parsePeriopCtx(raw: unknown): PatientContextV2 {
  if (!raw || typeof raw !== 'object') return PERIOP_DEFAULT_CTX
  const c = raw as Partial<PatientContextV2>
  const species = c.species === 'cat' || c.species === 'dog' ? c.species : PERIOP_DEFAULT_CTX.species
  const ageBand =
    c.ageBand === 'neonate' ||
    c.ageBand === 'juvenile' ||
    c.ageBand === 'adult' ||
    c.ageBand === 'senior'
      ? c.ageBand
      : PERIOP_DEFAULT_CTX.ageBand
  const severity =
    c.severity === 'ambulatory_stable' ||
    c.severity === 'hospitalized' ||
    c.severity === 'severe' ||
    c.severity === 'septic_unstable'
      ? c.severity
      : PERIOP_DEFAULT_CTX.severity
  const coIn = c.comorbidities as Partial<ComorbidityFlagsV2> | undefined
  return {
    species,
    ageBand,
    isGestante: Boolean(c.isGestante),
    isLactante: Boolean(c.isLactante),
    severity,
    comorbidities: {
      renal: !!coIn?.renal,
      hepatic: !!coIn?.hepatic,
      cardiac: !!coIn?.cardiac,
      neurological: !!coIn?.neurological,
      septic: !!coIn?.septic,
    },
  }
}

const SCENARIO_LABELS: Record<SeverityTier, string> = {
  ambulatory_stable: 'Ambulatorial estável (cirurgia limpa / eletiva)',
  hospitalized: 'Internado / profilaxia típica (dose perioperatória)',
  severe: 'Grave / campo contaminado',
  septic_unstable: 'Séptico instável (tratar como sepse)',
}

interface PerioperativePageProps {
  setPage: (page: AbvTab) => void
  abDict: AntibioticClass
  dzDict: DiseaseSystem
  onDeepLinkDrug: (drugName: string) => void
}

export default function PerioperativePage({ setPage, abDict, dzDict, onDeepLinkDrug }: PerioperativePageProps) {
  const legacyDisease = useMemo(() => {
    const list = safeList(dzDict['Perioperatório'])
    return list.find((d) => d.name.includes('Profilaxia')) ?? list[0] ?? null
  }, [dzDict])

  const drugDedupe = useMemo(() => new Set<string>(), [legacyDisease?.name])

  const [ctx, setCtx] = useState<PatientContextV2>(() => {
    const raw = readSessionJson<{ v: 1; ctx: unknown }>(ABV_SESSION_KEYS.perioperativeUi)
    return raw?.v === 1 ? parsePeriopCtx(raw.ctx) : PERIOP_DEFAULT_CTX
  })

  useEffect(() => {
    writeSessionJson(ABV_SESSION_KEYS.perioperativeUi, { v: 1, ctx })
  }, [ctx])

  const result = useMemo(() => {
    try {
      return buildRecommendation('perioperatorio', ctx)
    } catch {
      return null
    }
  }, [ctx])

  const syndromeProfile = SYNDROME_PROFILES_V2.perioperatorio
  const institutionalMap = getSyndromeInstitutionalMapping('perioperatorio')
  const pageAudit = CCIH_2024_PRIORITY_PAGE_AUDIT.perioperatorio

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
            background: 'color-mix(in srgb, hsl(var(--secondary)) 22%, hsl(var(--card)))',
            color: 'hsl(var(--foreground))',
            border: '1px solid color-mix(in srgb, hsl(var(--secondary)) 38%, hsl(var(--border)))',
          }}
        >
          Perioperatório · CCIH
        </span>
        <h1 className="mb-2 mt-3 text-3xl font-bold tracking-tight" style={{ color: 'hsl(var(--foreground))' }}>
          Profilaxia e terapia perioperatória
        </h1>
        <p className="mb-6 max-w-4xl text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Motor v2 alinhado ao perfil institucional <strong className="text-[hsl(var(--foreground))]">perioperatorio</strong> com
          regimes e concordância terapêutica. Abaixo, a ficha narrativa legada resume linhas de tratamento e liga aos
          fármacos com doses. Para classes e calculadora, use o{' '}
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

        {pageAudit ? (
          <p className="mb-4 rounded-lg border px-3 py-2 text-xs leading-relaxed" style={{ borderColor: 'hsl(var(--border))' }}>
            <strong className="text-[hsl(var(--foreground))]">Guia CCIH 2024 (referência interna):</strong> págs. {pageAudit.pageStart}
            {pageAudit.pageEnd !== pageAudit.pageStart ? `–${pageAudit.pageEnd}` : ''}. {pageAudit.auditNote}
          </p>
        ) : null}

        {institutionalMap ? (
          <div className="mb-6">
            <InstitutionalProvenanceStrip mapping={institutionalMap} contextLabel="Perioperatório" variant="compact" />
          </div>
        ) : null}

        <section
          className="mb-8 rounded-[var(--radius)] border p-4"
          style={{ borderColor: 'hsl(var(--border))', background: 'color-mix(in srgb, hsl(var(--accent)) 10%, hsl(var(--card)))' }}
        >
          <h2 className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
            Contexto do paciente (declarativo)
          </h2>
          <p className="mt-1 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {syndromeProfile.summary}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Espécie
              <select
                className="abv-input mt-1 w-full p-2 text-sm"
                value={ctx.species}
                onChange={(e) => setCtx((c) => ({ ...c, species: e.target.value as 'dog' | 'cat' }))}
              >
                <option value="dog">Cão</option>
                <option value="cat">Gato</option>
              </select>
            </label>
            <label className="block text-xs font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Cenário assistencial
              <select
                className="abv-input mt-1 w-full p-2 text-sm"
                value={ctx.severity}
                onChange={(e) => setCtx((c) => ({ ...c, severity: e.target.value as SeverityTier }))}
              >
                {(Object.keys(SCENARIO_LABELS) as SeverityTier[]).map((k) => (
                  <option key={k} value={k}>
                    {SCENARIO_LABELS[k]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={ctx.comorbidities.septic}
              onChange={(e) =>
                setCtx((c) => ({
                  ...c,
                  comorbidities: { ...c.comorbidities, septic: e.target.checked },
                }))
              }
            />
            <span style={{ color: 'hsl(var(--foreground))' }}>Suspeita clínica de sepse / instabilidade (comorbidade séptica)</span>
          </label>
        </section>

        {result ? (
          <div className="mb-10">
            <SyndromeV2Panel
              result={result}
              onOpenAntibioticInCatalog={(legacySearchSeed) => {
                onDeepLinkDrug(legacySearchSeed)
              }}
            />
          </div>
        ) : (
          <p className="mb-8 text-sm" style={{ color: 'hsl(var(--destructive))' }}>
            Não foi possível calcular a recomendação para o contexto atual.
          </p>
        )}

        {legacyDisease ? (
          <section>
            <h2 className="mb-2 text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              Ficha clínica (texto legado)
            </h2>
            <p className="mb-4 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {legacyDisease.name} — complementa o motor v2 com notas de linha e justificativas por fármaco.
            </p>
            <p className="mb-3 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <span className="font-medium text-[hsl(var(--foreground))]">Patógenos / contexto:</span>{' '}
              <InlineRichText text={legacyDisease.pathogens} />
            </p>
            <DiseaseTreatmentBlocks
              block={legacyDisease.firstLine}
              abDict={abDict}
              onSeeGuide={onDeepLinkDrug}
              comorbidities={PERIOP_COMORB}
              drugDetailDedupeSet={drugDedupe}
            />
            {legacyDisease.secondLine ? (
              <DiseaseTreatmentBlocks
                block={legacyDisease.secondLine}
                abDict={abDict}
                onSeeGuide={onDeepLinkDrug}
                comorbidities={PERIOP_COMORB}
                drugDetailDedupeSet={drugDedupe}
              />
            ) : null}
            {legacyDisease.thirdLine ? (
              <DiseaseTreatmentBlocks
                block={legacyDisease.thirdLine}
                abDict={abDict}
                onSeeGuide={onDeepLinkDrug}
                comorbidities={PERIOP_COMORB}
                drugDetailDedupeSet={drugDedupe}
              />
            ) : null}
            {legacyDisease.notes ? (
              <div className="mt-4 rounded-lg border p-3 text-sm" style={{ borderColor: 'hsl(var(--border))' }}>
                <strong className="text-[hsl(var(--foreground))]">Notas:</strong> <InlineRichText text={legacyDisease.notes} />
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
    </div>
  )
}
