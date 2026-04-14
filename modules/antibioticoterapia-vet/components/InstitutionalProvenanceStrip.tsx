import type { InstitutionalContentMapping } from '../model/versionedSource'
import { getVersionedSource } from '../data-v2/sourceRegistry'

const TIER_LABEL: Record<string, string> = {
  institutional: 'Tier institucional',
  product_internal: 'Produto',
  external_literature: 'Literatura',
}

const ACCESS_SHORT: Record<string, string> = {
  public: 'Acesso público',
  private_internal: 'Uso interno',
  restricted_not_distributed: 'Restrito · não distribuído ao cliente',
}

const DISTRIBUTION_SHORT: Record<string, string> = {
  bundled: 'Incluído no bundle',
  repo_private_only: 'Repositório privado (sem exposição ao app)',
  external_audit_only: 'Auditoria externa ao produto',
  metadata_only: 'Apenas metadados no app',
}

interface InstitutionalProvenanceStripProps {
  mapping: InstitutionalContentMapping
  contextLabel?: string
  /** `compact`: resumo clínico; `full`: detalhe técnico (auditoria). */
  variant?: 'full' | 'compact'
}

export function InstitutionalProvenanceStrip({
  mapping,
  contextLabel,
  variant = 'full',
}: InstitutionalProvenanceStripProps) {
  const doc = getVersionedSource(mapping.versionedSourceId)
  if (!doc) return null

  const restricted = doc.accessPolicy === 'restricted_not_distributed'
  const noClientFile = !doc.fileExposedToClient
  const metadataDoc =
    doc.verificationMode === 'metadata_verified' || doc.verificationMode === 'content_verified'

  const mappingPending = mapping.linkStatus === 'prepared_pending_pdf' || mapping.linkStatus === 'unresolved'
  const pageLocatorOk = mapping.linkStatus === 'linked_verified_page_locator'
  const metadataOnly = mapping.linkStatus === 'linked_verified_metadata'

  const hasPages =
    mapping.locator.pageStart != null &&
    mapping.locator.pageEnd != null &&
    mapping.locator.pageStart > 0 &&
    mapping.locator.pageEnd > 0

  let stateLabel: string
  let stateTone: 'warn' | 'neutral' | 'ok' = 'neutral'

  if (mappingPending) {
    stateLabel = mapping.linkStatus === 'unresolved' ? 'Vínculo em resolução' : 'Mapeamento pendente'
    stateTone = 'warn'
  } else if (pageLocatorOk && hasPages) {
    stateLabel = 'Locator com páginas auditadas · verificação manual (tópico)'
    stateTone = 'ok'
  } else if (pageLocatorOk && !hasPages) {
    stateLabel = 'Estado page_locator inconsistente — rever mapeamento'
    stateTone = 'warn'
  } else if (restricted && metadataDoc && metadataOnly) {
    stateLabel = 'Documento restrito · metadados auditáveis (sem páginas no app)'
    stateTone = 'neutral'
  } else if (mapping.linkStatus === 'linked_verified_content') {
    stateLabel = 'Conteúdo auditado (registro)'
    stateTone = 'ok'
  } else {
    stateLabel = mapping.linkStatus
    stateTone = 'neutral'
  }

  if (variant === 'compact') {
    return (
      <div
        className="rounded-[var(--radius)] border p-3 text-xs"
        style={{
          borderColor: 'color-mix(in srgb, hsl(var(--primary)) 22%, hsl(var(--border)))',
          background: 'color-mix(in srgb, hsl(var(--primary)) 5%, hsl(var(--card)))',
          color: 'hsl(var(--foreground))',
        }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
            style={{
              background: 'color-mix(in srgb, hsl(var(--primary)) 16%, hsl(var(--card)))',
              color: 'hsl(var(--primary))',
            }}
          >
            Fonte · CCIH
          </span>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{
              background:
                stateTone === 'warn'
                  ? 'color-mix(in srgb, var(--chart-5) 18%, hsl(var(--card)))'
                  : stateTone === 'neutral'
                    ? 'color-mix(in srgb, hsl(var(--muted)) 32%, hsl(var(--card)))'
                    : 'color-mix(in srgb, var(--chart-2) 18%, hsl(var(--card)))',
              color: 'hsl(var(--foreground))',
            }}
          >
            {stateLabel}
          </span>
          <span className="text-[10px] opacity-75">{doc.versionLabel}</span>
        </div>
        <p className="mt-2 text-sm font-semibold leading-snug">{doc.title}</p>
        {contextLabel && (
          <p className="mt-1 text-[11px] leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Tópico no app: <span className="font-medium text-[hsl(var(--foreground))]">{contextLabel}</span>
          </p>
        )}
        <p className="mt-1 text-[11px] leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {mapping.topicHint}
        </p>
        <details className="mt-2 border-t pt-2" style={{ borderColor: 'hsl(var(--border))' }}>
          <summary className="cursor-pointer text-[10px] font-semibold uppercase tracking-wide opacity-80">
            Detalhes técnicos (auditoria)
          </summary>
          <div className="mt-2 space-y-1.5 text-[10px] leading-relaxed opacity-90">
            <p>
              {ACCESS_SHORT[doc.accessPolicy] ?? doc.accessPolicy} ·{' '}
              {DISTRIBUTION_SHORT[doc.distributionMode] ?? doc.distributionMode}
              {noClientFile ? ' · documento não entregue pelo aplicativo' : ''}
            </p>
            <p>
              <span className="font-semibold text-[hsl(var(--foreground))]">{TIER_LABEL[doc.reliabilityTier] ?? doc.reliabilityTier}</span>
              {' · '}
              Verificação: {doc.verificationMode}
            </p>
            {mapping.locator.sectionRef && (
              <p className="font-mono">
                <span className="font-sans font-semibold text-[hsl(var(--foreground))]">sectionRef:</span>{' '}
                {mapping.locator.sectionRef}
              </p>
            )}
            {mapping.locator.auditNote && (
              <p>
                <span className="font-semibold text-[hsl(var(--foreground))]">Nota:</span> {mapping.locator.auditNote}
              </p>
            )}
            {pageLocatorOk && hasPages && (
              <p>
                Páginas (auditoria no código): {mapping.locator.pageStart}–{mapping.locator.pageEnd}
              </p>
            )}
          </div>
        </details>
      </div>
    )
  }

  return (
    <div
      className="rounded-[var(--radius)] border p-3 text-xs"
      style={{
        borderColor: 'color-mix(in srgb, hsl(var(--primary)) 28%, hsl(var(--border)))',
        background: 'color-mix(in srgb, hsl(var(--primary)) 6%, hsl(var(--card)))',
        color: 'hsl(var(--foreground))',
      }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
          style={{
            background: 'color-mix(in srgb, hsl(var(--primary)) 18%, hsl(var(--card)))',
            color: 'hsl(var(--primary))',
          }}
        >
          Proveniência
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
          style={{
            background:
              stateTone === 'warn'
                ? 'color-mix(in srgb, var(--chart-5) 22%, hsl(var(--card)))'
                : stateTone === 'neutral'
                  ? 'color-mix(in srgb, hsl(var(--muted)) 38%, hsl(var(--card)))'
                  : 'color-mix(in srgb, var(--chart-2) 22%, hsl(var(--card)))',
            color: 'hsl(var(--foreground))',
          }}
        >
          {stateLabel}
        </span>
        <span className="text-[10px] opacity-80">{TIER_LABEL[doc.reliabilityTier] ?? doc.reliabilityTier}</span>
        <span className="text-[10px] opacity-80">Versão {doc.versionLabel}</span>
      </div>
      <p className="mt-2 font-medium leading-snug">{doc.title}</p>
      <p className="mt-1 text-[10px] leading-relaxed opacity-90">
        {ACCESS_SHORT[doc.accessPolicy] ?? doc.accessPolicy} · {DISTRIBUTION_SHORT[doc.distributionMode] ?? doc.distributionMode} ·
        Verificação: {doc.verificationMode}
        {noClientFile && ' · documento não entregue pelo aplicativo'}
      </p>
      {contextLabel && (
        <p className="mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Contexto: <span className="font-medium text-[hsl(var(--foreground))]">{contextLabel}</span>
        </p>
      )}
      <p className="mt-1 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
        <span className="font-semibold text-[hsl(var(--foreground))]">Tópico:</span> {mapping.topicHint}
      </p>
      {mapping.locator.sectionRef && (
        <p className="mt-1 font-mono text-[10px] leading-relaxed opacity-90">
          <span className="font-semibold text-[hsl(var(--foreground))]">sectionRef:</span> {mapping.locator.sectionRef}
        </p>
      )}
      {doc.internalStorageDesignation && (
        <p className="mt-1 text-[10px] leading-relaxed opacity-85">
          Arquivo institucional (referência interna, sem URL): {doc.internalStorageDesignation}
        </p>
      )}
      {pageLocatorOk && hasPages && (
        <p className="mt-2 rounded border px-2 py-1.5 text-[10px] leading-relaxed" style={{ borderColor: 'hsl(var(--border))' }}>
          <span className="font-semibold text-[hsl(var(--foreground))]">Páginas (auditoria humana no código):</span>{' '}
          {mapping.locator.pageStart}–{mapping.locator.pageEnd}
        </p>
      )}
      {mapping.locator.auditNote && (
        <p className="mt-2 border-t pt-2 text-[10px] leading-relaxed" style={{ borderColor: 'hsl(var(--border))' }}>
          <span className="font-semibold text-[hsl(var(--foreground))]">Nota:</span> {mapping.locator.auditNote}
        </p>
      )}
    </div>
  )
}
