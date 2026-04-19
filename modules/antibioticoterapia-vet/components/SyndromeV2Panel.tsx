import type { AntibioticIndication, RecommendationResult } from '../model/types'
import type { ClassStyle } from '../types'
import { ANTIBIOTIC_MOLECULES } from '../data-v2/molecules'
import { getSyndromeInstitutionalMapping } from '../data-v2/institutionalMappings'
import { getSourceEntry } from '../data-v2/references'
import { concordanceStateFromMapping, REGIMEN_CONCORDANCE_EXPLANATION } from '../data-v2/institutionalConcordance'
import { getRegimenTherapeuticAuditInSyndrome } from '../data-v2/therapeuticInstitutionalAudit'
import { InstitutionalProvenanceStrip } from './InstitutionalProvenanceStrip'
import { InlineRichText } from './RichTextViewer'
import { InstitutionalConcordanceChip } from './InstitutionalConcordanceChip'
import { TherapeuticInstitutionalAuditNote } from './TherapeuticInstitutionalAuditNote'
import { getClassStyleForMoleculeClassId } from '../utils/moleculeClassVisual'

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

/** Cor do cartão de regime: mesma lógica visual do guia de antimicrobianos (`CLASS_STYLE`), pela 1.ª molécula do esquema. */
function regimenClassStyle(moleculeIds: string[]): ClassStyle | null {
  const first = moleculeIds[0]
  if (!first) return null
  const mol = ANTIBIOTIC_MOLECULES[first]
  if (!mol?.classId) return null
  return getClassStyleForMoleculeClassId(mol.classId)
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
      <div className="mt-1 flex flex-wrap gap-2">
        {moleculeIds.map((mid) => {
          const mol = ANTIBIOTIC_MOLECULES[mid]
          const label = mol?.displayName ?? mid
          const st = mol?.classId ? getClassStyleForMoleculeClassId(mol.classId) : null
          return (
            <button
              key={mid}
              type="button"
              className="cursor-pointer rounded-lg border px-2 py-1 text-xs font-semibold underline-offset-2 hover:underline"
              style={
                st
                  ? {
                      color: 'hsl(var(--foreground))',
                      background: st.bg,
                      borderColor: st.border,
                    }
                  : {
                      color: 'hsl(var(--primary))',
                      borderColor: 'hsl(var(--border))',
                      background: 'hsl(var(--card))',
                    }
              }
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
        <h2 className="text-xl font-bold tracking-tight" style={{ color: 'hsl(var(--foreground))' }}>
          {result.syndromeLabel}
        </h2>
        <p className="mt-1 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Motor v2 · cenário: <strong>{result.scenarioResolved}</strong>
          {result.scenarioFallbackFrom ? ` (ajuste a partir de ${result.scenarioFallbackFrom})` : ''}
        </p>
        {syndromeConcordance && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-medium uppercase tracking-wide" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Concordância do perfil (síndrome)
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
            <li key={i}>
              <InlineRichText text={line} />
            </li>
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
        <p className="mt-1 font-medium">
          <InlineRichText text={result.culture.summary} />
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {result.culture.because.map((b, i) => (
            <li key={i}>
              <InlineRichText text={b} />
            </li>
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
          {result.firstLine.map((r) => {
            const regAudit = getRegimenTherapeuticAuditInSyndrome(result.syndromeId, r.regimenId)
            const cls = regimenClassStyle(r.regimen.moleculeIds)
            return (
              <div
                key={r.regimenId}
                className="abv-panel p-3"
                style={
                  cls
                    ? {
                        background: cls.bg,
                        borderColor: cls.border,
                        borderWidth: 1,
                        borderStyle: 'solid',
                      }
                    : {
                        background: 'color-mix(in srgb, hsl(var(--muted)) 14%, hsl(var(--card)))',
                        borderColor: 'hsl(var(--border))',
                        borderWidth: 1,
                        borderStyle: 'solid',
                      }
                }
              >
                <div className="font-medium">{r.regimen.label}</div>
                {r.modifiersApplied.length > 0 && (
                  <ul className="mt-2 list-inside list-disc text-xs" style={{ color: 'var(--chart-5)' }}>
                    {r.modifiersApplied.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                )}
                {r.regimen.settingNote && (
                  <p className="mt-2 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    <InlineRichText text={r.regimen.settingNote} />
                  </p>
                )}
                <TherapeuticInstitutionalAuditNote
                  variant="regimen"
                  state={regAudit.state}
                  clinicianNote={regAudit.clinicianNote}
                />
                <MoleculeLinksRow moleculeIds={r.regimen.moleculeIds} onOpenInCatalog={onOpenAntibioticInCatalog} />
              </div>
            )
          })}
        </div>
      </section>

      {result.alternatives.length > 0 && (
        <section>
          <h3 className="font-semibold">Alternativas</h3>
          <ul className="mt-2 space-y-2">
            {result.alternatives.map((r) => {
              const altAudit = getRegimenTherapeuticAuditInSyndrome(result.syndromeId, r.regimenId)
              const cls = regimenClassStyle(r.regimen.moleculeIds)
              return (
                <li
                  key={r.regimenId}
                  className="abv-panel p-2 text-sm"
                  style={
                    cls
                      ? {
                          background: cls.bg,
                          borderColor: cls.border,
                          borderWidth: 1,
                          borderStyle: 'solid',
                        }
                      : undefined
                  }
                >
                  <span className="font-medium">{r.regimen.label}</span>
                  {r.modifiersApplied.length > 0 && (
                    <span className="ml-2 text-xs" style={{ color: 'var(--chart-5)' }}>
                      ({r.modifiersApplied[0]})
                    </span>
                  )}
                  <TherapeuticInstitutionalAuditNote
                    variant="regimen"
                    state={altAudit.state}
                    clinicianNote={altAudit.clinicianNote}
                  />
                  <MoleculeLinksRow moleculeIds={r.regimen.moleculeIds} onOpenInCatalog={onOpenAntibioticInCatalog} />
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {result.avoid.length > 0 && (
        <section>
          <h3 className="font-semibold" style={{ color: 'hsl(var(--destructive))' }}>
            Evitar / cautela estrutural
          </h3>
          <ul className="mt-2 space-y-1">
            {result.avoid.map((a, i) => {
              const mol = a.molecule ?? (a.moleculeId ? ANTIBIOTIC_MOLECULES[a.moleculeId] : undefined)
              const cls = mol?.classId ? getClassStyleForMoleculeClassId(mol.classId) : null
              return (
                <li
                  key={i}
                  className="rounded-[var(--radius)] border px-2 py-1.5 text-sm"
                  style={
                    cls
                      ? { background: cls.bg, borderColor: cls.border }
                      : { borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }
                  }
                >
                  {a.molecule?.displayName ?? a.moleculeId}: <InlineRichText text={a.reason} />
                </li>
              )
            })}
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
                <div style={{ color: 'hsl(var(--foreground))' }}>
                  <InlineRichText text={a.detail} />
                </div>
                <div className="mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Por quê: <InlineRichText text={a.because} />
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
                <InlineRichText text={a.detail} />
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
