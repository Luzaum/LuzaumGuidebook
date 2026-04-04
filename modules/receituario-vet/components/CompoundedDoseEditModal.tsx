import React from 'react'
import { RxvButton, RxvField, RxvInput, RxvModalShell, RxvSelect } from '../../../src/components/receituario/RxvComponents'

export function CompoundedDoseEditModal(props: {
  open: boolean
  title: string
  recommendedRangeText?: string
  administrationPreview?: string
  value: string
  unit: string
  unitOptions: Array<{ value: string; label: string }>
  onValueChange: (value: string) => void
  onUnitChange: (value: string) => void
  onClose: () => void
  onApply: () => void
}) {
  if (!props.open) return null

  return (
    <RxvModalShell zIndexClass="z-[120]" overlayClassName="bg-black/85 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-slate-700 bg-[color:var(--rxv-surface)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-6 py-5">
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight text-[color:var(--rxv-text)]">Editar dose</h2>
            <p className="mt-1 text-xs text-[color:var(--rxv-muted)]">{props.title}</p>
          </div>
          <RxvButton variant="secondary" onClick={props.onClose}>Fechar</RxvButton>
        </div>
        <div className="space-y-5 px-6 py-6">
          {props.recommendedRangeText ? (
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300">Faixa recomendada</p>
              <p className="mt-2 text-sm font-semibold text-white">{props.recommendedRangeText}</p>
            </div>
          ) : null}
          {props.administrationPreview ? (
            <div className="rounded-2xl border border-slate-700 bg-black/20 px-4 py-3">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[color:var(--rxv-muted)]">Dose administrável</p>
              <p className="mt-2 text-sm font-semibold text-white">{props.administrationPreview}</p>
            </div>
          ) : null}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <RxvField label="Valor da dose">
              <RxvInput value={props.value} onChange={(event) => props.onValueChange(event.target.value)} placeholder="Ex: 7,5" />
            </RxvField>
            <RxvField label="Unidade da dose">
              <RxvSelect value={props.unit} onChange={(event) => props.onUnitChange(event.target.value)} options={props.unitOptions} />
            </RxvField>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-6 py-4">
          <RxvButton variant="secondary" onClick={props.onClose}>Cancelar</RxvButton>
          <RxvButton variant="primary" onClick={props.onApply}>Aplicar dose</RxvButton>
        </div>
      </div>
    </RxvModalShell>
  )
}

export default CompoundedDoseEditModal
