import React from 'react'
import { RxvButton, RxvField, RxvInput, RxvSelect } from '../../../src/components/receituario/RxvComponents'
import {
  COMPOUNDED_DURATION_MODE_OPTIONS,
  COMPOUNDED_DURATION_UNIT_OPTIONS,
  COMPOUNDED_FREQUENCY_MODE_OPTIONS,
  COMPOUNDED_TIMES_PER_DAY_OPTIONS,
} from '../compoundedStructuredEditing'
import { AdministrationBasisEditor } from './AdministrationBasisEditor'
import type { AdministrationBasis } from '../vetPosologyShared'

export function CompoundedStructuredRegimenEditor(props: {
  doseSummary: string
  onEditDose: () => void
  frequencyMode: string
  timesPerDay?: string | number | null
  intervalHours?: string | number | null
  onFrequencyModeChange: (value: string) => void
  onTimesPerDayChange: (value: string) => void
  onIntervalHoursChange: (value: string) => void
  durationMode: string
  durationValue?: string | number | null
  durationUnit: string
  onDurationModeChange: (value: string) => void
  onDurationValueChange: (value: string) => void
  onDurationUnitChange: (value: string) => void
  // Administração por unidade / sítio
  administrationBasis?: AdministrationBasis | string | null
  administrationAmount?: number | string | null
  administrationUnit?: string | null
  administrationTarget?: string | null
  onAdministrationBasisChange?: (value: AdministrationBasis) => void
  onAdministrationAmountChange?: (value: string) => void
  onAdministrationUnitChange?: (value: string) => void
  onAdministrationTargetChange?: (value: string) => void
  className?: string
}) {
  const isDurationFixed = props.durationMode === 'fixed_days'
  const hasAdminCallbacks = !!props.onAdministrationBasisChange

  return (
    <div className={props.className || ''}>

      {/* ── Grupo 0: Administração por unidade / sítio (opcional) ── */}
      {hasAdminCallbacks && (
        <AdministrationBasisEditor
          administrationBasis={props.administrationBasis}
          administrationAmount={props.administrationAmount}
          administrationUnit={props.administrationUnit}
          administrationTarget={props.administrationTarget}
          onBasisChange={props.onAdministrationBasisChange!}
          onAmountChange={props.onAdministrationAmountChange!}
          onUnitChange={props.onAdministrationUnitChange!}
          onTargetChange={props.onAdministrationTargetChange!}
          className="mb-4 rounded-xl border border-slate-800 bg-black/15 px-4 py-3"
        />
      )}

      {/* ── Grupo 1: Dose ── */}
      <div className="mb-4 rounded-xl border border-slate-800 bg-black/20 px-4 py-3">
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-[color:var(--rxv-muted)]">Dose por administração</p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-white">{props.doseSummary || 'Dose não definida'}</p>
          <RxvButton variant="secondary" onClick={props.onEditDose}>Editar dose</RxvButton>
        </div>
      </div>

      {/* ── Grupo 2: Frequência ── */}
      <div className="mb-4">
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-[color:var(--rxv-muted)]">Frequência</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <RxvField label="Modo">
            <RxvSelect
              value={props.frequencyMode}
              onChange={(e) => props.onFrequencyModeChange(e.target.value)}
              options={COMPOUNDED_FREQUENCY_MODE_OPTIONS as unknown as { value: string; label: string }[]}
            />
          </RxvField>
          <RxvField label={props.frequencyMode === 'interval_hours' ? 'Intervalo (horas)' : 'Vezes por dia'}>
            {props.frequencyMode === 'interval_hours' ? (
              <RxvInput
                type="number"
                min="1"
                step="1"
                value={props.intervalHours ?? ''}
                onChange={(e) => props.onIntervalHoursChange(e.target.value)}
                placeholder="Ex: 12"
              />
            ) : (
              <RxvSelect
                value={props.timesPerDay != null && props.timesPerDay !== '' ? String(props.timesPerDay) : ''}
                onChange={(e) => props.onTimesPerDayChange(e.target.value)}
                options={COMPOUNDED_TIMES_PER_DAY_OPTIONS as unknown as { value: string; label: string }[]}
              />
            )}
          </RxvField>
        </div>
      </div>

      {/* ── Grupo 3: Duração ── */}
      <div>
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-[color:var(--rxv-muted)]">Duração</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <RxvField label="Modo">
            <RxvSelect
              value={props.durationMode}
              onChange={(e) => props.onDurationModeChange(e.target.value)}
              options={COMPOUNDED_DURATION_MODE_OPTIONS as unknown as { value: string; label: string }[]}
            />
          </RxvField>
          <RxvField label="Quantidade">
            <RxvInput
              type="number"
              min="1"
              step="1"
              value={isDurationFixed ? (props.durationValue ?? '') : ''}
              onChange={(e) => props.onDurationValueChange(e.target.value)}
              placeholder="Ex: 10"
              disabled={!isDurationFixed}
            />
          </RxvField>
          <RxvField label="Unidade">
            <RxvSelect
              value={props.durationUnit}
              onChange={(e) => props.onDurationUnitChange(e.target.value)}
              options={COMPOUNDED_DURATION_UNIT_OPTIONS as unknown as { value: string; label: string }[]}
              disabled={!isDurationFixed}
            />
          </RxvField>
        </div>
      </div>

    </div>
  )
}

export default CompoundedStructuredRegimenEditor
