import React from 'react'
import { RxvButton, RxvField, RxvInput, RxvSelect } from '../../../src/components/receituario/RxvComponents'
import {
  COMPOUNDED_DURATION_MODE_OPTIONS,
  COMPOUNDED_DURATION_UNIT_OPTIONS,
  COMPOUNDED_FREQUENCY_MODE_OPTIONS,
  COMPOUNDED_TIMES_PER_DAY_OPTIONS,
} from '../compoundedStructuredEditing'

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
  className?: string
}) {
  return (
    <div className={props.className || ''}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 xl:grid-cols-12">
        <RxvField label="Dose final por administração" className="xl:col-span-4">
          <div className="flex h-full flex-col gap-3 rounded-2xl border border-slate-800 bg-black/20 p-4">
            <p className="text-sm font-semibold text-white">{props.doseSummary || 'Dose não definida'}</p>
            <div>
              <RxvButton variant="secondary" onClick={props.onEditDose}>Editar dose</RxvButton>
            </div>
          </div>
        </RxvField>
        <RxvField label="Modo de frequência" className="xl:col-span-4">
          <RxvSelect value={props.frequencyMode} onChange={(event) => props.onFrequencyModeChange(event.target.value)} options={COMPOUNDED_FREQUENCY_MODE_OPTIONS as unknown as { value: string; label: string }[]} />
        </RxvField>
        <RxvField label={props.frequencyMode === 'interval_hours' ? 'Intervalo (horas)' : 'Frequência'} className="xl:col-span-4">
          {props.frequencyMode === 'interval_hours' ? (
            <RxvInput type="number" min="1" step="1" value={props.intervalHours ?? ''} onChange={(event) => props.onIntervalHoursChange(event.target.value)} placeholder="Ex: 12" />
          ) : (
            <RxvSelect value={props.timesPerDay != null && props.timesPerDay !== '' ? String(props.timesPerDay) : ''} onChange={(event) => props.onTimesPerDayChange(event.target.value)} options={COMPOUNDED_TIMES_PER_DAY_OPTIONS as unknown as { value: string; label: string }[]} />
          )}
        </RxvField>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 xl:grid-cols-12">
        <RxvField label="Modo de duração" className="xl:col-span-4">
          <RxvSelect value={props.durationMode} onChange={(event) => props.onDurationModeChange(event.target.value)} options={COMPOUNDED_DURATION_MODE_OPTIONS as unknown as { value: string; label: string }[]} />
        </RxvField>
        <RxvField label="Valor da duração" className="xl:col-span-4">
          <RxvInput type="number" min="1" step="1" value={props.durationMode === 'fixed_days' ? (props.durationValue ?? '') : ''} onChange={(event) => props.onDurationValueChange(event.target.value)} placeholder="Ex: 4" disabled={props.durationMode !== 'fixed_days'} />
        </RxvField>
        <RxvField label="Unidade da duração" className="xl:col-span-4">
          <RxvSelect value={props.durationUnit} onChange={(event) => props.onDurationUnitChange(event.target.value)} options={COMPOUNDED_DURATION_UNIT_OPTIONS as unknown as { value: string; label: string }[]} disabled={props.durationMode !== 'fixed_days'} />
        </RxvField>
      </div>
    </div>
  )
}

export default CompoundedStructuredRegimenEditor
