import { useEffect, useRef } from 'react'
import Icon from '../components/Icon'
import RichTextViewer from '../components/RichTextViewer'
import {
  CCIH_PRIORITY_PAGE_AUDIT_KEYS,
  countValidPriorityPageAuditEntries,
} from '../data-v2/ccih2024PageAudit'
import {
  RESISTANCE_INSTITUTIONAL_MAPPINGS,
  SYNDROME_INSTITUTIONAL_MAPPINGS,
  countLinkedVerifiedMetadataMappings,
  countLinkedVerifiedPageLocatorMappings,
  listThematicCcInstitutionalMappings,
} from '../data-v2/institutionalMappings'
import { REGIMEN_CONCORDANCE_EXPLANATION, summarizeV2MoleculeConcordance } from '../data-v2/institutionalConcordance'
import {
  THERAPEUTIC_AUDIT_LABEL,
  summarizeMoleculeAuditStatesV2,
  summarizeRegimenAuditStatesInV2Syndromes,
  type TherapeuticInstitutionalAuditState,
} from '../data-v2/therapeuticInstitutionalAudit'
import { REFERENCE_GROUPS, SOURCE_REGISTRY, getSourceEntry } from '../data-v2/references'
import { getVersionedSource, listVersionedSources } from '../data-v2/sourceRegistry'
import type { ReferenceDomain, SourceEntryStatus, SourceEntryV2 } from '../model/institutional'
import type { VersionedInstitutionalSource } from '../model/versionedSource'
import type { AbvInstitutionalFocus, AbvTab } from '../types'

const DOMAIN_LABEL: Record<ReferenceDomain, string> = {
  clinical_v2: 'Domínio: clínico v2',
  molecules_v2: 'Domínio: biblioteca de moléculas v2',
  microbiology_v2: 'Domínio: microbiologia / resistência v2',
  hospital_institutional_pending: 'Domínio: hospital / institucional (mapeamentos v2)',
  institutional_versioned: 'Domínio: documento institucional versionado',
}

function sourceAnchorId(key: string): string {
  return `abv-src-${key.replace(/[^a-zA-Z0-9]+/g, '-')}`
}

function statusBadge(status: SourceEntryStatus): { label: string; tone: 'neutral' | 'warn' | 'ok' } {
  switch (status) {
    case 'placeholder':
      return { label: 'Placeholder interno', tone: 'neutral' }
    case 'external_pending':
      return { label: 'Externo pendente', tone: 'warn' }
    case 'versioned_pending_import':
      return { label: 'Versionada — importação PDF pendente', tone: 'warn' }
    case 'versioned_active':
      return { label: 'Versionada — ativa no repo', tone: 'ok' }
    case 'versioned_restricted_metadata':
      return { label: 'Restrita — metadados no app (sem PDF ao cliente)', tone: 'neutral' }
    default:
      return { label: status, tone: 'neutral' }
  }
}

function VersionedDocCard({ doc }: { doc: VersionedInstitutionalSource }) {
  return (
    <article
      className="abv-panel p-4 text-sm"
      style={{ color: 'hsl(var(--foreground))' }}
      id={`abv-versioned-${doc.sourceId.replace(/[^a-zA-Z0-9]+/g, '-')}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
          style={{ background: 'color-mix(in srgb, hsl(var(--primary)) 16%, hsl(var(--card)))', color: 'hsl(var(--primary))' }}
        >
          Documento versionado
        </span>
        <span className="text-[10px] opacity-80">Tier {doc.reliabilityTier}</span>
        <span className="text-[10px] opacity-80">Versão {doc.versionLabel}</span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
          style={{ background: 'color-mix(in srgb, hsl(var(--muted)) 35%, hsl(var(--card)))' }}
        >
          {doc.lifecycleStatus}
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
          style={{ background: 'color-mix(in srgb, hsl(var(--secondary)) 14%, hsl(var(--card)))', color: 'hsl(var(--secondary))' }}
        >
          {doc.accessPolicy}
        </span>
        <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase opacity-90">
          {doc.distributionMode}
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
          style={{
            background:
              doc.verificationMode === 'pending_import'
                ? 'color-mix(in srgb, var(--chart-5) 22%, hsl(var(--card)))'
                : 'color-mix(in srgb, var(--chart-2) 22%, hsl(var(--card)))',
          }}
        >
          {doc.verificationMode}
        </span>
      </div>
      <h3 className="mt-2 text-lg font-bold tracking-tight">{doc.title}</h3>
      <p className="mt-1 text-xs leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {doc.provenance}
      </p>
      <p className="mt-2 font-mono text-[10px] opacity-85">{doc.sourceId}</p>
      <ul className="mt-2 space-y-1 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
        <li>
          <span className="font-semibold text-[hsl(var(--foreground))]">Política:</span> {doc.accessPolicy} ·{' '}
          <span className="font-semibold text-[hsl(var(--foreground))]">Distribuição:</span> {doc.distributionMode}
        </li>
        <li>
          <span className="font-semibold text-[hsl(var(--foreground))]">Exposto ao cliente:</span>{' '}
          {doc.fileExposedToClient ? 'sim (documento normativo restrito)' : 'não'}
        </li>
        <li>
          <span className="font-semibold text-[hsl(var(--foreground))]">Binário no repo de build:</span>{' '}
          {doc.filePresentInRepo ? 'declarado' : 'não declarado'} (não implica download no app)
        </li>
        <li>
          <span className="font-semibold text-[hsl(var(--foreground))]">Auditoria humana:</span>{' '}
          {doc.auditedByHuman ? 'sim' : 'não registrada'}
        </li>
      </ul>
      {doc.internalStorageDesignation && (
        <p className="mt-2 text-xs leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          <span className="font-semibold text-[hsl(var(--foreground))]">Designação interna (sem URL):</span>{' '}
          {doc.internalStorageDesignation}
        </p>
      )}
      <p className="mt-2 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
        Tipo: {doc.sourceType} · Mapeamentos: <span className="font-mono">{doc.mappingsModulePath}</span>
      </p>
      {doc.notes ? (
        <div className="mt-2 text-xs leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          <RichTextViewer text={doc.notes} />
        </div>
      ) : null}
      {doc.lastAuditNote && (
        <p
          className="mt-2 rounded border border-dashed p-2 text-xs"
          style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}
        >
          <span className="font-semibold text-[hsl(var(--foreground))]">Última nota de auditoria:</span> {doc.lastAuditNote}
        </p>
      )}
      {doc.publicationDate && (
        <p className="mt-2 text-xs">Publicação (metadado): {doc.publicationDate}</p>
      )}
      <p className="mt-3 text-[10px] opacity-80">Não há link de download público para este documento a partir do aplicativo.</p>
    </article>
  )
}

function SourceEntryArticle({ entry }: { entry: SourceEntryV2 }) {
  const vs = entry.versionedSourceId ? getVersionedSource(entry.versionedSourceId) : undefined
  const st = statusBadge(entry.status)

  return (
    <article
      id={sourceAnchorId(entry.key)}
      className="abv-panel scroll-mt-24 p-4 text-sm"
      style={{ color: 'hsl(var(--foreground))' }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
          style={{
            background:
              st.tone === 'ok'
                ? 'color-mix(in srgb, var(--chart-2) 22%, hsl(var(--card)))'
                : st.tone === 'warn'
                  ? 'color-mix(in srgb, var(--chart-5) 22%, hsl(var(--card)))'
                  : 'color-mix(in srgb, hsl(var(--muted)) 40%, hsl(var(--card)))',
            color: 'hsl(var(--foreground))',
          }}
        >
          {st.label}
        </span>
        {vs && (
          <span className="text-[10px] font-medium opacity-90">
            ↔ {vs.versionLabel} · {vs.verificationMode} · {vs.accessPolicy}
          </span>
        )}
      </div>
      <div className="mt-1 font-mono text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {entry.key}
      </div>
      <h3 className="mt-1 font-semibold text-base">{entry.title}</h3>
      <p className="mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {entry.description}
      </p>
      {entry.versionedSourceId && (
        <p className="mt-2 text-xs">
          <span className="font-semibold">Vínculo versionado:</span>{' '}
          <span className="font-mono">{entry.versionedSourceId}</span>
        </p>
      )}
      {vs && (
        <ul className="mt-2 space-y-0.5 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
          <li>
            <span className="font-semibold text-[hsl(var(--foreground))]">Distribuição:</span> {vs.distributionMode}
          </li>
          <li>
            <span className="font-semibold text-[hsl(var(--foreground))]">Cliente recebe PDF:</span>{' '}
            {vs.fileExposedToClient ? 'sim' : 'não'}
          </li>
          {vs.internalStorageDesignation && (
            <li>
              <span className="font-semibold text-[hsl(var(--foreground))]">Arquivo (referência interna):</span>{' '}
              {vs.internalStorageDesignation}
            </li>
          )}
        </ul>
      )}
      {entry.note && (
        <p
          className="mt-2 rounded border border-dashed p-2 text-xs"
          style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}
        >
          {entry.note}
        </p>
      )}
    </article>
  )
}

interface ReferencesPageProps {
  setPage: (t: AbvTab) => void
  institutionalFocus: AbvInstitutionalFocus | null
  onConsumedInstitutionalFocus: () => void
}

export function ReferencesPage({
  setPage,
  institutionalFocus,
  onConsumedInstitutionalFocus,
}: ReferencesPageProps) {
  const didScroll = useRef(false)
  const versionedDocs = listVersionedSources()

  useEffect(() => {
    if (!institutionalFocus || institutionalFocus.kind !== 'reference' || didScroll.current) return
    const t = setTimeout(() => {
      const el = document.getElementById(sourceAnchorId(institutionalFocus.key))
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      didScroll.current = true
      onConsumedInstitutionalFocus()
    }, 150)
    return () => clearTimeout(t)
  }, [institutionalFocus, onConsumedInstitutionalFocus])

  useEffect(() => {
    didScroll.current = false
  }, [institutionalFocus])

  return (
    <div className="min-h-full w-full bg-[hsl(var(--background))] p-4 md:p-8">
      <div className="mx-auto w-full max-w-none">
        <button
          type="button"
          onClick={() => setPage('home')}
          className="mb-6 flex items-center text-lg font-semibold transition hover:opacity-90"
          style={{ color: 'hsl(var(--primary))' }}
        >
          <Icon name="back" className="mr-2 h-6 w-6" />
          Voltar ao início
        </button>

        <header className="mb-8">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-wide"
            style={{ color: 'hsl(var(--primary))' }}
          >
            Registro de fontes
          </p>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'hsl(var(--foreground))' }}>
            Referências, tiers e documentos versionados
          </h1>
          <p className="mt-3 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            O módulo separa <strong>chaves de registro</strong> (<span className="font-mono">referenceKey</span>),{' '}
            <strong>documentos institucionais</strong> (<span className="font-mono">sourceRegistry</span>) e{' '}
            <strong>mapeamentos</strong> (<span className="font-mono">institutionalMappings.ts</span>). Documentos restritos
            permanecem fora do bundle; o app exibe política de acesso, modos de distribuição e locators simbólicos (
            <span className="font-mono">sectionRef</span>) — sem link público de download.
          </p>
        </header>

        <section className="mb-10 space-y-4">
          <h2 className="border-b pb-2 text-lg font-semibold" style={{ borderColor: 'hsl(var(--border))' }}>
            Documentos versionados (camada central)
          </h2>
          <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <span className="font-mono">fileExposedToClient === false</span> garante que o binário não é entregue pelo
            frontend. <span className="font-mono">filePresentInRepo</span> refere-se a cópia eventual em arquivo interno —
            não implica publicação.
          </p>
          {versionedDocs.map((doc) => (
            <VersionedDocCard key={doc.sourceId} doc={doc} />
          ))}
        </section>

        <section className="mb-10 space-y-4">
          <h2 className="border-b pb-2 text-lg font-semibold" style={{ borderColor: 'hsl(var(--border))' }}>
            Maturidade da auditoria institucional (metadados vs páginas)
          </h2>
          <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <span className="font-mono">linked_verified_metadata</span>: sectionRef estável, sem páginas no código.{' '}
            <span className="font-mono">linked_verified_page_locator</span>: páginas registadas em{' '}
            <span className="font-mono">ccih2024PageAudit.ts</span> após leitura do exemplar restrito. O PDF não é
            distribuído ao cliente.
          </p>
          {(() => {
            const meta = countLinkedVerifiedMetadataMappings()
            const page = countLinkedVerifiedPageLocatorMappings()
            const filledPriority = countValidPriorityPageAuditEntries()
            const molConc = summarizeV2MoleculeConcordance()
            return (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="abv-panel p-3 text-sm" style={{ color: 'hsl(var(--foreground))' }}>
                    <p className="font-semibold">Metadados apenas (metadata)</p>
                    <ul className="mt-2 list-inside list-disc text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      <li>Síndromes v2: {meta.syndromes}</li>
                      <li>Cartões hospitalares: {meta.hospitalCards}</li>
                      <li>Resistência / laboratório: {meta.resistance}</li>
                      <li>Fichas de moléculas: {meta.molecules}</li>
                      <li>Temas transversais: {meta.thematic}</li>
                    </ul>
                  </div>
                  <div className="abv-panel p-3 text-sm" style={{ color: 'hsl(var(--foreground))' }}>
                    <p className="font-semibold">Locator com páginas (page_locator)</p>
                    <ul className="mt-2 list-inside list-disc text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      <li>Síndromes v2: {page.syndromes}</li>
                      <li>Cartões hospitalares: {page.hospitalCards}</li>
                      <li>Resistência / laboratório: {page.resistance}</li>
                      <li>Fichas de moléculas: {page.molecules}</li>
                      <li>Temas transversais: {page.thematic}</li>
                    </ul>
                    <p className="mt-2 text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      Prioridade de auditoria: {filledPriority}/{CCIH_PRIORITY_PAGE_AUDIT_KEYS.length} chaves com página válida em{' '}
                      <span className="font-mono">ccih2024PageAudit.ts</span> (demais permanecem só metadados até auditoria).
                    </p>
                  </div>
                </div>
                <p className="text-[10px] leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <span className="font-semibold text-[hsl(var(--foreground))]">Núcleo v2 — moléculas (camada explícita):</span>{' '}
                  {molConc.metadataOnly} fichas em <span className="font-mono">linked_verified_metadata</span>;{' '}
                  {molConc.pageLocator} em <span className="font-mono">linked_verified_page_locator</span> (total{' '}
                  {molConc.total}). Nada é marcado como auditado sem entrada correspondente em{' '}
                  <span className="font-mono">ccih2024PageAudit.ts</span>.{' '}
                  <span className="font-semibold text-[hsl(var(--foreground))]">Regimes:</span> {REGIMEN_CONCORDANCE_EXPLANATION}
                </p>
                {(() => {
                  const molA = summarizeMoleculeAuditStatesV2()
                  const regA = summarizeRegimenAuditStatesInV2Syndromes()
                  const lines = (c: Record<TherapeuticInstitutionalAuditState, number>) =>
                    (Object.entries(c) as [TherapeuticInstitutionalAuditState, number][])
                      .filter(([, n]) => n > 0)
                      .map(([k, n]) => (
                        <li key={k}>
                          {THERAPEUTIC_AUDIT_LABEL[k]}: {n}
                        </li>
                      ))
                  return (
                    <div
                      className="abv-panel mt-4 p-3 text-sm"
                      style={{ color: 'hsl(var(--foreground))' }}
                    >
                      <p className="font-semibold">Trilha terapêutica institucional (matriz v2)</p>
                      <p className="mt-1 text-[10px] leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        Derivado de <span className="font-mono">therapeuticInstitutionalAudit.ts</span>: separa concordância da
                        ficha de molécula da auditoria do regime sob perfil de síndrome (sem locator CCIH por regime no código).
                      </p>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-medium">Domínio: moléculas (biblioteca v2)</p>
                          <ul className="mt-1 list-inside list-disc text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
                            {lines(molA)}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-medium">Domínio: regimes (pares síndrome×regime)</p>
                          <ul className="mt-1 list-inside list-disc text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
                            {lines(regA)}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </>
            )
          })()}
          <div className="space-y-2">
            <p className="text-xs font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              Temas transversais — sectionRef e páginas (se auditadas)
            </p>
            <ul className="space-y-1 font-mono text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {listThematicCcInstitutionalMappings().map((m) => (
                <li key={m.locator.sectionRef ?? m.topicHint}>
                  {m.locator.sectionRef} — {m.topicHint}
                  {m.linkStatus === 'linked_verified_page_locator' &&
                    m.locator.pageStart != null &&
                    m.locator.pageEnd != null &&
                    ` · p.${m.locator.pageStart}–${m.locator.pageEnd}`}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              Síndromes prioritárias — estado por id
            </p>
            <ul className="max-h-48 overflow-y-auto font-mono text-[10px] leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {Object.entries(SYNDROME_INSTITUTIONAL_MAPPINGS).map(([id, m]) => (
                <li key={id}>
                  {id}: {m.linkStatus}
                  {m.locator.pageStart != null && m.locator.pageEnd != null
                    ? ` · p.${m.locator.pageStart}–${m.locator.pageEnd}`
                    : ''}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              Resistência (prioritário MRSP/MRSA/ESBL/intrínseca)
            </p>
            <ul className="font-mono text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {(['mrsp', 'mrsa', 'esbl', 'intrinsic_resistance'] as const).map((id) => {
                const m = RESISTANCE_INSTITUTIONAL_MAPPINGS[id]
                if (!m) return null
                return (
                  <li key={id}>
                    {id}: {m.linkStatus}
                    {m.locator.pageStart != null && m.locator.pageEnd != null
                      ? ` · p.${m.locator.pageStart}–${m.locator.pageEnd}`
                      : ''}
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        <section className="mb-10 space-y-8">
          {REFERENCE_GROUPS.map((g) => (
            <div key={g.domain}>
              <h2 className="mb-3 border-b pb-2 text-lg font-semibold" style={{ borderColor: 'hsl(var(--border))' }}>
                {g.label}
              </h2>
              <p className="mb-3 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {DOMAIN_LABEL[g.domain]}
              </p>
              <div className="space-y-3">
                {g.sourceKeys.map((key) => {
                  const entry = getSourceEntry(key) ?? SOURCE_REGISTRY[key]
                  if (!entry) return null
                  return <SourceEntryArticle key={key} entry={entry} />
                })}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
