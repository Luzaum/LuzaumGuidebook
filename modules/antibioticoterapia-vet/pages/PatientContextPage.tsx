import React, { useEffect, useMemo, useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { InlineRichText } from '../components/RichTextViewer'
import { buildRecommendation } from '../engine/buildRecommendation'
import { collectPatientAlerts } from '../engine/patientRules'
import { listHospitalStewardshipCardsV2 } from '../data-v2/hospitalAlerts'
import { SYNDROME_PROFILES_V2 } from '../data-v2/syndromes'
import type { AbvTab } from '../types'
import type { AgeBand, ClinicalAlert, ComorbidityFlagsV2, PatientContextV2, SeverityTier } from '../model/types'
import type { HospitalStewardshipCardV2 } from '../model/institutional'
import { ABV_SESSION_KEYS, readSessionJson, writeSessionJson } from '../utils/abvSessionPersistence'

const DEFAULT_CTX: PatientContextV2 = {
  species: 'dog',
  ageBand: 'adult',
  isGestante: false,
  isLactante: false,
  severity: 'hospitalized',
  comorbidities: { renal: false, hepatic: false, cardiac: false, neurological: false, septic: false },
}

const AGE_LABELS: Record<AgeBand, string> = {
  neonate: 'Neonato',
  juvenile: 'Filhote / jovem',
  adult: 'Adulto',
  senior: 'Idoso',
}

const SEVERITY_LABELS: Record<SeverityTier, string> = {
  ambulatory_stable: 'Ambulatorial estável',
  hospitalized: 'Internado',
  severe: 'Grave',
  septic_unstable: 'Séptico / instável',
}

const CATEGORY_LABELS: Record<HospitalStewardshipCardV2['category'], string> = {
  risk: 'Risco hospitalar',
  precaution: 'Precaução / isolamento',
  culture: 'Cultura',
  deescalation: 'Descalonamento',
  indication: 'Indicação',
  nosocomial: 'Nosocomial',
  mdr: 'Multirresistência',
  notification: 'Notificação',
  catheter_uti: 'Cateter urinário / ITU',
}

function parseCtx(raw: unknown): PatientContextV2 {
  if (!raw || typeof raw !== 'object') return DEFAULT_CTX
  const c = raw as Partial<PatientContextV2>
  const species = c.species === 'cat' || c.species === 'dog' ? c.species : DEFAULT_CTX.species
  const ageBand =
    c.ageBand === 'neonate' ||
    c.ageBand === 'juvenile' ||
    c.ageBand === 'adult' ||
    c.ageBand === 'senior'
      ? c.ageBand
      : DEFAULT_CTX.ageBand
  const severity =
    c.severity === 'ambulatory_stable' ||
    c.severity === 'hospitalized' ||
    c.severity === 'severe' ||
    c.severity === 'septic_unstable'
      ? c.severity
      : DEFAULT_CTX.severity
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

function alertStyle(severity: ClinicalAlert['severity']): React.CSSProperties {
  if (severity === 'warning') {
    return {
      borderColor: 'color-mix(in srgb, hsl(var(--destructive)) 45%, hsl(var(--border)))',
      background: 'color-mix(in srgb, hsl(var(--destructive)) 10%, hsl(var(--card)))',
    }
  }
  if (severity === 'caution') {
    return {
      borderColor: 'color-mix(in srgb, var(--chart-5) 50%, hsl(var(--border)))',
      background: 'color-mix(in srgb, var(--chart-5) 12%, hsl(var(--card)))',
    }
  }
  return { borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }
}

interface PatientContextPageProps {
  setPage: (page: AbvTab) => void
}

export default function PatientContextPage({ setPage }: PatientContextPageProps) {
  const syndromeOptions = useMemo(
    () =>
      Object.values(SYNDROME_PROFILES_V2)
        .map((p) => ({ id: p.id, label: p.label }))
        .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR')),
    [],
  )

  const [ctx, setCtx] = useState<PatientContextV2>(() => {
    const raw = readSessionJson<{ v: 1; ctx: unknown; syndromeId?: string }>(ABV_SESSION_KEYS.patientContextUi)
    return raw?.v === 1 ? parseCtx(raw.ctx) : DEFAULT_CTX
  })

  const [syndromeId, setSyndromeId] = useState<string>(() => {
    const raw = readSessionJson<{ v: 1; syndromeId?: string }>(ABV_SESSION_KEYS.patientContextUi)
    return raw?.syndromeId ?? ''
  })

  useEffect(() => {
    writeSessionJson(ABV_SESSION_KEYS.patientContextUi, { v: 1, ctx, syndromeId })
  }, [ctx, syndromeId])

  const contextOnlyAlerts = useMemo(() => collectPatientAlerts(ctx, [], []), [ctx])

  const syndromeAlerts = useMemo(() => {
    if (!syndromeId) return [] as ClinicalAlert[]
    try {
      const result = buildRecommendation(syndromeId, ctx)
      return result.patientAlerts
    } catch {
      return [] as ClinicalAlert[]
    }
  }, [ctx, syndromeId])

  const mergedAlerts = useMemo(() => {
    const map = new Map<string, ClinicalAlert>()
    for (const a of [...contextOnlyAlerts, ...syndromeAlerts]) {
      map.set(a.id, a)
    }
    return [...map.values()]
  }, [contextOnlyAlerts, syndromeAlerts])

  const hospitalCards = useMemo(() => listHospitalStewardshipCardsV2(), [])

  const toggleComorb = (key: keyof ComorbidityFlagsV2) => {
    setCtx((c) => ({
      ...c,
      comorbidities: { ...c.comorbidities, [key]: !c.comorbidities[key] },
    }))
  }

  return (
    <div className="mx-auto w-full max-w-none px-4 py-8 md:px-8 md:py-12">
      <div className="abv-panel rounded-3xl p-6 shadow-lg md:p-8">
        <header className="mb-8">
          <div className="mb-4 flex items-start gap-4">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border"
              style={{
                background: 'color-mix(in srgb, var(--chart-5) 18%, hsl(var(--card)))',
                borderColor: 'hsl(var(--border))',
                color: 'var(--chart-5)',
              }}
            >
              <AlertTriangle className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'hsl(var(--foreground))' }}>
                Alertas por paciente
              </h1>
              <p className="mt-2 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Configure espécie, faixa etária, comorbidades e gravidade para gerar alertas de stewardship e segurança
                farmacológica. Opcionalmente selecione uma síndrome para alertas ligados ao esquema antimicrobiano.
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Cartões de stewardship alinhados ao framework institucional hospitalar (CCIH). Validar sempre com protocolo local.
          </p>
        </header>

        <section
          className="mb-8 rounded-2xl border p-4 md:p-5"
          style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--muted) / 0.25)' }}
        >
          <h2 className="mb-4 text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
            Perfil do paciente
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              Faixa etária
              <select
                className="abv-input mt-1 w-full p-2 text-sm"
                value={ctx.ageBand}
                onChange={(e) => setCtx((c) => ({ ...c, ageBand: e.target.value as AgeBand }))}
              >
                {(Object.keys(AGE_LABELS) as AgeBand[]).map((k) => (
                  <option key={k} value={k}>
                    {AGE_LABELS[k]}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Cenário assistencial
              <select
                className="abv-input mt-1 w-full p-2 text-sm"
                value={ctx.severity}
                onChange={(e) => setCtx((c) => ({ ...c, severity: e.target.value as SeverityTier }))}
              >
                {(Object.keys(SEVERITY_LABELS) as SeverityTier[]).map((k) => (
                  <option key={k} value={k}>
                    {SEVERITY_LABELS[k]}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Síndrome (opcional)
              <select
                className="abv-input mt-1 w-full p-2 text-sm"
                value={syndromeId}
                onChange={(e) => setSyndromeId(e.target.value)}
              >
                <option value="">— Apenas alertas gerais —</option>
                {syndromeOptions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={ctx.isGestante}
                onChange={(e) => setCtx((c) => ({ ...c, isGestante: e.target.checked }))}
              />
              <span>Gestante</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={ctx.isLactante}
                onChange={(e) => setCtx((c) => ({ ...c, isLactante: e.target.checked }))}
              />
              <span>Lactante</span>
            </label>
            {(
              [
                ['renal', 'Insuficiência renal'],
                ['hepatic', 'Insuficiência hepática'],
                ['cardiac', 'Cardiopatia'],
                ['neurological', 'Comorbidade neurológica'],
                ['septic', 'Sepse / instabilidade'],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex cursor-pointer items-center gap-2">
                <input type="checkbox" checked={ctx.comorbidities[key]} onChange={() => toggleComorb(key)} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </section>

        {mergedAlerts.length > 0 ? (
          <section className="mb-10">
            <h2 className="mb-3 text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              Alertas gerados ({mergedAlerts.length})
            </h2>
            <ul className="space-y-3">
              {mergedAlerts.map((a) => (
                <li key={a.id} className="rounded-xl border p-3 text-sm" style={alertStyle(a.severity)}>
                  <div className="font-semibold">{a.title}</div>
                  <div className="mt-1" style={{ color: 'hsl(var(--foreground))' }}>
                    <InlineRichText text={a.detail} />
                  </div>
                  <div className="mt-1 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Por quê: <InlineRichText text={a.because} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <p className="mb-10 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Nenhum alerta específico para este perfil. Revise os cartões de stewardship hospitalar abaixo.
          </p>
        )}

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
            Stewardship hospitalar
          </h2>
          <p className="mb-4 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Decisões de vigilância, cultura, isolamento e uso racional em ambiente hospitalar — integrar ao protocolo
            institucional (CCIH).
          </p>
          <div className="grid gap-4 lg:grid-cols-2">
            {hospitalCards.map((card) => (
              <article
                key={card.id}
                className="rounded-2xl border p-4"
                style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}
              >
                <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide" style={{ color: 'var(--chart-5)' }}>
                  {CATEGORY_LABELS[card.category]}
                </div>
                <h3 className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                  {card.title}
                </h3>
                <p className="mt-2 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {card.lead}
                </p>
                {card.bullets.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs" style={{ color: 'hsl(var(--foreground))' }}>
                    {card.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {card.whenToThink.length > 0 && (
                  <div className="mt-3 rounded-lg border border-dashed px-3 py-2 text-xs" style={{ borderColor: 'hsl(var(--border))' }}>
                    <span className="font-medium">Quando pensar: </span>
                    {card.whenToThink.join(' ')}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-8 flex flex-wrap gap-3 text-sm">
          <button type="button" className="abv-btn-secondary rounded-xl px-4 py-2" onClick={() => setPage('syndrome')}>
            Ir para síndromes
          </button>
          <button type="button" className="abv-btn-secondary rounded-xl px-4 py-2" onClick={() => setPage('perioperative')}>
            Perioperatório
          </button>
        </footer>
      </div>
    </div>
  )
}
