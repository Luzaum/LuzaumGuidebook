import type { AntibioticIndication, RecommendationResult } from '../model/types'
import { ANTIBIOTIC_MOLECULES } from '../data-v2/molecules'
import { getAntibioticSheetV2 } from '../data-v2/antibiotics'
import { getSyndromeInstitutionalMapping } from '../data-v2/institutionalMappings'
import { getSourceEntry } from '../data-v2/references'
import { concordanceStateFromMapping, REGIMEN_CONCORDANCE_EXPLANATION } from '../data-v2/institutionalConcordance'
import { InstitutionalProvenanceStrip } from './InstitutionalProvenanceStrip'
import { InstitutionalConcordanceChip } from './InstitutionalConcordanceChip'

const INDICATION_EXPLAIN: Record<AntibioticIndication, { title: string; detail: string }> = {
  yes_empiric: {
    title: 'Antimicrobiano empírico',
    detail:
      'No modelo v2, há esquema empírico sugerido; reavaliar com cultura, desfecho clínico e stewardship local.',
  },
  yes_after_sampling: {
    title: 'Priorizar amostras',
    detail:
      'A indicação enfatiza cultura/amostragem antes de repetir ciclos empíricos idênticos, quando o quadro permitir.',
  },
  no_not_routine: {
    title: 'Não é rotina sistêmica',
    detail:
      'O perfil indica que antibiótico sistêmico não é padrão para todos os casos — ver regimes e notas.',
  },
  conditional: {
    title: 'Indicação condicional',
    detail:
      'Depende do subcenário (ex.: cirurgia limpa vs contaminada). Leia os regimes e stewardship abaixo.',
  },
}

interface SyndromeV2PanelProps {
  result: RecommendationResult
  onOpenMoleculeV2?: (moleculeId: string) => void
}

function MoleculeLinksRow({
  moleculeIds,
  onOpen,
}: {
  moleculeIds: string[]
  onOpen?: (moleculeId: string) => void
}) {
  if (!moleculeIds.length || !onOpen) return null
  return (
    <div className="mt-2 border-t pt-2" style={{ borderColor: 'var(--border)' }}>
      <span className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>
        Antimicrobianos (ficha v2):
      </span>
      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
        {moleculeIds.map((mid) => {
          const mol = ANTIBIOTIC_MOLECULES[mid]
          const sheet = getAntibioticSheetV2(mid)
          const label = mol?.displayName ?? mid
          if (!sheet) {
            return (
              <span key={mid} className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                {label}
              </span>
            )
          }
          return (
            <button
              key={mid}
              type="button"
              className="text-xs font-medium underline-offset-2 hover:underline"
              style={{ color: 'var(--primary)' }}
              onClick={() => onOpen(mid)}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function referenceKeyDisplayLabel(key: string): string {
  const entry = getSourceEntry(key)
  if (entry) return entry.title
  return key
}

export function SyndromeV2Panel({ result, onOpenMoleculeV2 }: SyndromeV2PanelProps) {
  const institutionalMap = getSyndromeInstitutionalMapping(result.syndromeId)
  const syndromeConcordance = concordanceStateFromMapping(institutionalMap)

  return (
    <div className="space-y-5 text-left text-sm" style={{ color: 'var(--foreground)' }}>
      <div>
        <h2 className="font-serif text-xl font-bold" style={{ color: 'var(--foreground)' }}>
          {result.syndromeLabel}
        </h2>
        <p className="mt-1 text-xs" style={{ color: 'var(--muted-foreground)' }}>
          Motor v2 · cenário: <strong>{result.scenarioResolved}</strong>
          {result.scenarioFallbackFrom ? ` (ajuste a partir de ${result.scenarioFallbackFrom})` : ''}
        </p>
        {syndromeConcordance && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-medium uppercase tracking-wide" style={{ color: 'var(--muted-foreground)' }}>
              Concordância do perfil
            </span>
            <InstitutionalConcordanceChip state={syndromeConcordance} />
          </div>
        )}
      </div>

      <section
        className="rounded-[var(--radius)] border p-3"
        style={{
          borderColor: 'var(--border)',
          background: 'color-mix(in srgb, var(--accent) 12%, var(--card))',
        }}
      >
        <h3 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
          {INDICATION_EXPLAIN[result.antibioticIndication].title}
        </h3>
        <p className="mt-1 text-xs" style={{ color: 'var(--muted-foreground)' }}>
          {INDICATION_EXPLAIN[result.antibioticIndication].detail}
        </p>
      </section>

      <section className="abv-panel p-3">
        <h3 className="font-semibold" style={{ color: 'var(--primary)' }}>
          Racional da recomendação
        </h3>
        <ul className="mt-2 list-inside list-disc space-y-1" style={{ color: 'var(--muted-foreground)' }}>
          {result.rationale.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </section>

      <section
        className="rounded-[var(--radius)] border p-3"
        style={{
          borderColor: 'var(--border)',
          background: 'color-mix(in srgb, var(--muted) 35%, var(--card))',
        }}
      >
        <h3 className="font-semibold">Cultura e amostragem</h3>
        <p className="mt-1 font-medium">{result.culture.summary}</p>
        <ul className="mt-2 list-inside list-disc space-y-1" style={{ color: 'var(--muted-foreground)' }}>
          {result.culture.because.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-semibold" style={{ color: 'var(--primary)' }}>
          Recomendação principal (regimes)
        </h3>
        <p className="mt-1 text-[11px] leading-snug" style={{ color: 'var(--muted-foreground)' }}>
          {REGIMEN_CONCORDANCE_EXPLANATION}
        </p>
        <div className="mt-2 space-y-3">
          {result.firstLine.map((r) => (
            <div
              key={r.regimenId}
              className="abv-panel p-3"
              style={{
                background: 'color-mix(in srgb, var(--primary) 10%, var(--card))',
              }}
            >
              <div className="font-medium">{r.regimen.label}</div>
              <div className="font-mono text-xs" style={{ color: 'var(--muted-foreground)' }}>
                ID regime: {r.regimenId}
              </div>
              {r.modifiersApplied.length > 0 && (
                <ul className="mt-2 list-inside list-disc text-xs" style={{ color: 'var(--chart-5)' }}>
                  {r.modifiersApplied.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              )}
              {r.regimen.settingNote && (
                <p className="mt-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  {r.regimen.settingNote}
                </p>
              )}
              <MoleculeLinksRow moleculeIds={r.regimen.moleculeIds} onOpen={onOpenMoleculeV2} />
            </div>
          ))}
        </div>
      </section>

      {result.alternatives.length > 0 && (
        <section>
          <h3 className="font-semibold">Alternativas</h3>
          <ul className="mt-2 space-y-2">
            {result.alternatives.map((r) => (
              <li key={r.regimenId} className="abv-panel p-2 text-sm">
                <span className="font-medium">{r.regimen.label}</span>
                {r.modifiersApplied.length > 0 && (
                  <span className="ml-2 text-xs" style={{ color: 'var(--chart-5)' }}>
                    ({r.modifiersApplied[0]})
                  </span>
                )}
                <MoleculeLinksRow moleculeIds={r.regimen.moleculeIds} onOpen={onOpenMoleculeV2} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {result.avoid.length > 0 && (
        <section>
          <h3 className="font-semibold" style={{ color: 'var(--destructive)' }}>
            Evitar / cautela estrutural
          </h3>
          <ul className="mt-2 space-y-1">
            {result.avoid.map((a, i) => (
              <li key={i} className="text-sm">
                {a.molecule?.displayName ?? a.moleculeId}: {a.reason}
              </li>
            ))}
          </ul>
        </section>
      )}

      {result.patientAlerts.length > 0 && (
        <section>
          <h3 className="font-semibold">Alertas do paciente</h3>
          <ul className="mt-2 space-y-2">
            {result.patientAlerts.map((a) => (
              <li
                key={a.id}
                className="rounded-[var(--radius)] border p-2 text-xs"
                style={{
                  borderColor: 'color-mix(in srgb, var(--chart-5) 50%, var(--border))',
                  background: 'color-mix(in srgb, var(--chart-5) 12%, var(--card))',
                }}
              >
                <div className="font-semibold">{a.title}</div>
                <div style={{ color: 'var(--foreground)' }}>{a.detail}</div>
                <div className="mt-1" style={{ color: 'var(--muted-foreground)' }}>
                  Por quê: {a.because}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {result.stewardshipAlerts.length > 0 && (
        <section>
          <h3 className="font-semibold">Observações de stewardship</h3>
          <ul className="mt-2 space-y-2">
            {result.stewardshipAlerts.map((a) => (
              <li
                key={a.id}
                className="rounded-[var(--radius)] border p-2 text-xs"
                style={{
                  borderColor: 'var(--border)',
                  background: 'color-mix(in srgb, var(--accent) 14%, var(--card))',
                }}
              >
                {a.detail}
              </li>
            ))}
          </ul>
        </section>
      )}

      {institutionalMap && (
        <InstitutionalProvenanceStrip mapping={institutionalMap} contextLabel={result.syndromeLabel} variant="compact" />
      )}

      {result.referenceKeys.length > 0 && (
        <section className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
          <h3 className="mb-1 font-semibold text-[var(--foreground)]">Registro de fontes (chaves)</h3>
          <ul className="list-inside list-disc space-y-0.5">
            {result.referenceKeys.map((key) => (
              <li key={key}>
                <span className="font-mono text-[10px]">{key}</span>
                {getSourceEntry(key) && (
                  <span className="ml-1 text-[10px]">— {referenceKeyDisplayLabel(key)}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
