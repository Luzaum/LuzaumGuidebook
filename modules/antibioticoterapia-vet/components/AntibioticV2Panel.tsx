import type { ReactNode } from 'react'
import type { AntibioticSheetV2 } from '../data-v2/antibiotics'
import { getMoleculeInstitutionalMapping } from '../data-v2/institutionalMappings'
import { getSourceEntry } from '../data-v2/references'
import { concordanceStateFromMapping } from '../data-v2/institutionalConcordance'
import { InstitutionalProvenanceStrip } from './InstitutionalProvenanceStrip'
import { InstitutionalConcordanceChip } from './InstitutionalConcordanceChip'

interface AntibioticV2PanelProps {
  sheet: AntibioticSheetV2
}

function refLabel(key: string): string {
  return getSourceEntry(key)?.title ?? key
}

function SectionCard({
  title,
  accent,
  children,
}: {
  title: string
  accent: 'primary' | 'foreground' | 'chart5'
  children: ReactNode
}) {
  const border =
    accent === 'primary'
      ? 'hsl(var(--primary))'
      : accent === 'chart5'
        ? 'var(--chart-5)'
        : 'color-mix(in srgb, hsl(var(--foreground)) 35%, hsl(var(--border)))'
  const titleColor =
    accent === 'primary' ? 'hsl(var(--primary))' : accent === 'chart5' ? 'var(--chart-5)' : 'hsl(var(--foreground))'

  return (
    <section
      className="rounded-[var(--radius)] border border-l-4 p-4 shadow-sm"
      style={{
        borderColor: 'hsl(var(--border))',
        borderLeftColor: border,
        background: 'color-mix(in srgb, hsl(var(--card)) 94%, hsl(var(--foreground)) 2%)',
      }}
    >
      <h3 className="border-b pb-2 text-base font-bold leading-tight" style={{ borderColor: 'hsl(var(--border))', color: titleColor }}>
        {title}
      </h3>
      <div className="pt-3">{children}</div>
    </section>
  )
}

export function AntibioticV2Panel({ sheet }: AntibioticV2PanelProps) {
  const institutionalMap = getMoleculeInstitutionalMapping(sheet.id)
  const concordance = concordanceStateFromMapping(institutionalMap)
  return (
    <article
      className="abv-panel space-y-5 p-4 text-left text-sm md:p-6"
      style={{ color: 'hsl(var(--foreground))' }}
    >
      <header className="rounded-[var(--radius)] border p-4" style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}>
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'hsl(var(--primary))' }}>
          Ficha clínica v2
        </p>
        <h2 className="mt-1 font-serif text-2xl font-bold md:text-3xl">{sheet.displayName}</h2>
        <p className="mt-2 text-xs leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          <span className="font-medium text-[hsl(var(--foreground))]">{sheet.classLabel}</span>
          {' · '}
          {sheet.subclassLabel}
        </p>
        {concordance && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-medium uppercase tracking-wide" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Concordância institucional
            </span>
            <InstitutionalConcordanceChip state={concordance} />
          </div>
        )}
      </header>

      <SectionCard title="Mecanismo de ação" accent="primary">
        <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {sheet.mechanismSummary}
        </p>
      </SectionCard>

      <SectionCard title="PK/PD (visão clínica)" accent="primary">
        <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {sheet.pkpdSummary}
        </p>
      </SectionCard>

      <SectionCard title="Espectro (resumido)" accent="primary">
        <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {sheet.spectrumSummary}
        </p>
      </SectionCard>

      <SectionCard title="Uso neste módulo (v2)" accent="foreground">
        <ul className="ml-4 list-disc space-y-2 text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {sheet.usesInApp.map((u, i) => (
            <li key={i} className="pl-1 marker:text-[hsl(var(--primary))]">
              {u}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Cautelas por contexto do paciente" accent="chart5">
        <ul className="ml-4 list-disc space-y-2 text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {sheet.patientCautions.map((c, i) => (
            <li key={i} className="pl-1 marker:text-[var(--chart-5)]">
              {c}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Efeitos adversos relevantes" accent="foreground">
        <ul className="ml-4 list-disc space-y-2 text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {sheet.adverseEffects.map((c, i) => (
            <li key={i} className="pl-1 marker:text-[hsl(var(--primary))]">
              {c}
            </li>
          ))}
        </ul>
      </SectionCard>

      <section
        className="rounded-[var(--radius)] border-l-4 p-4"
        style={{
          borderColor: 'hsl(var(--border))',
          borderLeftColor: 'hsl(var(--accent))',
          background: 'color-mix(in srgb, hsl(var(--accent)) 10%, hsl(var(--card)))',
        }}
      >
        <h3 className="border-b pb-2 text-base font-bold" style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}>
          Stewardship
        </h3>
        <ul className="ml-4 mt-3 list-disc space-y-2 text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {sheet.stewardshipNotes.map((c, i) => (
            <li key={i} className="pl-1 marker:text-[hsl(var(--accent))]">
              {c}
            </li>
          ))}
        </ul>
      </section>

      {sheet.synonyms.length > 0 && (
        <div
          className="rounded-[var(--radius)] border px-3 py-2 text-xs"
          style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}
        >
          <span className="font-semibold text-[hsl(var(--foreground))]">Sinônimos controlados: </span>
          {sheet.synonyms.join(' · ')}
        </div>
      )}

      {institutionalMap && (
        <InstitutionalProvenanceStrip mapping={institutionalMap} contextLabel={sheet.displayName} variant="compact" />
      )}

      <details className="rounded-[var(--radius)] border text-xs" style={{ borderColor: 'hsl(var(--border))' }}>
        <summary className="cursor-pointer px-3 py-2 font-semibold" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Referências técnicas (equipe)
        </summary>
        <ul className="space-y-1 border-t px-3 py-2 leading-relaxed" style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
          {sheet.referenceKeys.map((k) => (
            <li key={k} className="font-mono text-[10px]">
              {k}
              {getSourceEntry(k) && <span className="ml-1 font-sans text-[11px]">— {refLabel(k)}</span>}
            </li>
          ))}
        </ul>
      </details>
    </article>
  )
}
