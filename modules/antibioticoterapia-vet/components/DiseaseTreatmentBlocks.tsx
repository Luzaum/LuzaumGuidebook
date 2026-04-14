import React from 'react'
import type { AntibioticClass, ComorbidityState, TreatmentLineBlock } from '../types'
import InlineDrugSummary from './InlineDrugSummary'
import RichTextViewer, { InlineRichText } from './RichTextViewer'
import { normalizeDrugDisplayName } from '../utils/clinicalCopy'
import { regimeModeLabel } from '../utils/diseaseTreatment'

export const DiseaseTreatmentBlocks: React.FC<{
  block: TreatmentLineBlock
  abDict: AntibioticClass
  onSeeGuide: (drugName: string) => void
  comorbidities: ComorbidityState
  /** Quando definido, evita repetir a mesma ficha longa de fármaco já mostrada numa linha anterior (1ª→2ª→3ª). */
  drugDetailDedupeSet?: Set<string>
}> = ({ block, abDict, onSeeGuide, comorbidities, drugDetailDedupeSet }) => {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-base font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
          {block.title}
        </h3>
        <div className="mt-2 text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          <RichTextViewer text={block.presentation} />
        </div>
      </div>
      {block.regimes.map((reg, ri) => (
        <div
          key={ri}
          className="rounded-2xl border p-4 shadow-sm"
          style={{
            borderColor: 'hsl(var(--border))',
            background: 'color-mix(in srgb, hsl(var(--foreground)) 3%, hsl(var(--card)))',
          }}
        >
          {reg.label ? (
            <p className="mb-2 text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              {reg.label}
            </p>
          ) : null}
          <p
            className="mb-3 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold"
            style={{
              color: 'hsl(var(--primary))',
              borderColor: 'color-mix(in srgb, hsl(var(--primary)) 45%, hsl(var(--border)))',
              background: 'color-mix(in srgb, hsl(var(--primary)) 12%, hsl(var(--card)))',
            }}
          >
            {regimeModeLabel(reg.mode)}
          </p>
          <div className="space-y-4">
            {reg.drugs.map((drug, di) => {
              const key = normalizeDrugDisplayName(drug.name)
              const alreadyDetailed = Boolean(drugDetailDedupeSet?.has(key))
              if (alreadyDetailed) {
                return (
                  <div
                    key={di}
                    className="rounded-xl border border-dashed px-3 py-3 text-sm"
                    style={{
                      borderColor: 'color-mix(in srgb, hsl(var(--muted-foreground)) 35%, hsl(var(--border)))',
                      background: 'color-mix(in srgb, hsl(var(--muted)) 12%, hsl(var(--card)))',
                      color: 'hsl(var(--muted-foreground))',
                    }}
                  >
                    <span className="font-semibold text-[hsl(var(--foreground))]">{drug.name}</span>
                    <p className="mt-1 text-xs leading-relaxed">
                      Mesmo fármaco já descrito numa linha anterior — mantém-se neste esquema (associação ou continuação).{' '}
                      <InlineRichText text={drug.rationale} />
                    </p>
                  </div>
                )
              }

              drugDetailDedupeSet?.add(key)

              return (
                <div key={di}>
                  <InlineDrugSummary name={drug.name} abDict={abDict} onSeeGuide={onSeeGuide} comorbidities={comorbidities} />
                  <div
                    className="mt-2 rounded-lg border px-3 py-2 text-sm leading-relaxed"
                    style={{
                      borderColor: 'color-mix(in srgb, hsl(var(--border)) 80%, transparent)',
                      color: 'hsl(var(--foreground))',
                    }}
                  >
                    <span className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                      Por que nesta condição:{' '}
                    </span>
                    <InlineRichText text={drug.rationale} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}
