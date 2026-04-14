import type { AntibioticIndication, RecommendationResult } from '../model/types'
import { ANTIBIOTIC_MOLECULES } from '../data-v2/molecules'
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
  /** Abre o catálogo legado de antimicrobianos com busca pelo nome exibido (liga engine v2 ao catálogo). */
  onOpenAntibioticInCatalog?: (legacySearchSeed: string) => void
}

function MoleculeLinksRow({
  moleculeIds,
  onOpenInCatalog,
}: {
  moleculeIds: string[]
  onOpenInCatalog?: (legacySearchSeed: string) => void
}) {
  if (!moleculeIds.length || !onOpenInCatalog) return null
  return (
    <div className="mt-2 border-t pt-2" style={{ borderColor: 'hsl(var(--border))' }}>
      <span className="text-xs font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
        Antimicrobianos (catálogo legado):
      </span>
      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
        {moleculeIds.map((mid) => {
          const mol = ANTIBIOTIC_MOLECULES[mid]
          const label = mol?.displayName ?? mid
          return (
            <button
              key={mid}
              type="button"
              className="cursor-pointer text-xs font-medium underline-offset-2 hover:underline"
              style={{ color: 'hsl(var(--primary))' }}
              onClick={() => onOpenInCatalog(label)}
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

export function SyndromeV2Panel({ result, onOpenAntibioticInCatalog }: SyndromeV2PanelProps) {
  const institutionalMap = getSyndromeInstitutionalMapping(result.syndromeId)
  const syndromeConcordance = concordanceStateFromMapping(institutionalMap)

  return (
    <div className="space-y-5 text-left text-sm" style={{ color: 'hsl(var(--foreground))' }}>
      <div>
        <h2 className="font-serif text-xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
          {result.syndromeLabel}
        </h2>
        <p className="mt-1 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Motor v2 · cenário: <strong>{result.scenarioResolved}</strong>
          {result.scenarioFallbackFrom ? ` (ajuste a partir de ${result.scenarioFallbackFrom})` : ''}
        </p>
        {syndromeConcordance && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-medium uppercase tracking-wide" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Concordância do perfil
            </span>
            <InstitutionalConcordanceChip state={syndromeConcordance} />
          </div>
        )}
      </div>

      <section
        className="rounded-[var(--radius)] border p-3"
        style={{
          borderColor: 'hsl(var(--border))',
          background: 'color-mix(in srgb, hsl(var(--accent)) 12%, hsl(var(--card)))',
        }}
      >
        <h3 className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
          {INDICATION_EXPLAIN[result.antibioticIndication].title}
        </h3>
        <p className="mt-1 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {INDICATION_EXPLAIN[result.antibioticIndication].detail}
        </p>
      </section>

      <section className="abv-panel p-3">
        <h3 className="font-semibold" style={{ color: 'hsl(var(--primary))' }}>
          Racional da recomendação
        </h3>
        <ul className="mt-2 list-inside list-disc space-y-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {result.rationale.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </section>

      <section
        className="rounded-[var(--radius)] border p-3"
        style={{
          borderColor: 'hsl(var(--border))',
          background: 'color-mix(in srgb, hsl(var(--muted)) 35%, hsl(var(--card)))',
        }}
      >
        <h3 className="font-semibold">Cultura e amostragem</h3>
        <p className="mt-1 font-medium">{result.culture.summary}</p>
        <ul className="mt-2 list-inside list-disc space-y-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {result.culture.because.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-semibold" style={{ color: 'hsl(var(--primary))' }}>
          Recomendação principal (regimes)
        </h3>
        <p className="mt-1 text-[11px] leading-snug" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {REGIMEN_CONCORDANCE_EXPLANATION}
        </p>
        <div className="mt-2 space-y-3">
          {result.firstLine.map((r) => (
            <div
              key={r.regimenId}
              className="abv-panel p-3"
              style={{
                background: 'color-mix(in srgb, hsl(var(--primary)) 10%, hsl(var(--card)))',
              }}
            >
              <div className="font-medium">{r.regimen.label}</div>
              <div className="font-mono text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
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
                <p className="mt-2 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {r.regimen.settingNote}
                </p>
              )}
              <MoleculeLinksRow moleculeIds={r.regimen.moleculeIds} onOpenInCatalog={onOpenAntibioticInCatalog} />
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
                <MoleculeLinksRow moleculeIds={r.regimen.moleculeIds} onOpenInCatalog={onOpenAntibioticInCatalog} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {result.avoid.length > 0 && (
        <section>
          <h3 className="font-semibold" style={{ color: 'hsl(var(--destructive))' }}>
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
                  borderColor: 'color-mix(in srgb, var(--chart-5) 50%, hsl(var(--border)))',
                  background: 'color-mix(in srgb, var(--chart-5) 12%, hsl(var(--card)))',
                }}
              >
                <div className="font-semibold">{a.title}</div>
                <div style={{ color: 'hsl(var(--foreground))' }}>{a.detail}</div>
                <div className="mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
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
                  borderColor: 'hsl(var(--border))',
                  background: 'color-mix(in srgb, hsl(var(--accent)) 14%, hsl(var(--card)))',
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
        <section className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
          <h3 className="mb-1 font-semibold text-[hsl(var(--foreground))]">Registro de fontes (chaves)</h3>
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
