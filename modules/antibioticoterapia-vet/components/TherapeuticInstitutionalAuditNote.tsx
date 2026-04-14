import type { TherapeuticInstitutionalAuditState } from '../data-v2/therapeuticInstitutionalAudit'
import { THERAPEUTIC_AUDIT_LABEL } from '../data-v2/therapeuticInstitutionalAudit'

export function TherapeuticInstitutionalAuditNote({
  state,
  clinicianNote,
  variant,
}: {
  state: TherapeuticInstitutionalAuditState
  clinicianNote: string
  variant: 'molecule' | 'regimen'
}) {
  const scope = variant === 'molecule' ? 'Molécula (núcleo v2)' : 'Regime (sob perfil clínico)'
  return (
    <div
      className="mt-2 rounded-md border-l-2 py-2 pl-3 pr-2 text-[11px] leading-snug"
      style={{
        borderLeftColor: 'color-mix(in srgb, hsl(var(--primary)) 55%, hsl(var(--border)))',
        background: 'color-mix(in srgb, hsl(var(--muted)) 28%, hsl(var(--card)))',
        color: 'hsl(var(--muted-foreground))',
      }}
    >
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-[hsl(var(--foreground))]">
          Auditoria terapêutica · {scope}
        </span>
        <span className="font-medium text-[hsl(var(--foreground))]">{THERAPEUTIC_AUDIT_LABEL[state]}</span>
      </div>
      <p className="mt-1">{clinicianNote}</p>
    </div>
  )
}
