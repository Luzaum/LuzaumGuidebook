import { useMemo } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { LocalizedNumberInput } from './ui/localized-number-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import type { HydrationPlanConfig } from '../lib/clinicalSnapshotTypes'
import {
  buildHydrationPlanPreview,
  validateManualHydrationTarget,
} from '../lib/nutrition-calculations/hydrationPlanEngine'
import type { Species } from '../types'

interface HydrationPlanSectionProps {
  config: HydrationPlanConfig
  species: Species
  prescribedKcalDay: number
  rerKcalDay: number
  totalFoodGrams: number
  averageMoisturePct: number
  proteinGrams: number
  fatGrams: number
  carbGrams: number
  clinicalFlags?: {
    vomiting?: boolean
    diarrhea?: boolean
    polyuria?: boolean
    lactation?: boolean
    renalDisease?: boolean
    urinaryDisease?: boolean
    elevatedTemperature?: boolean
    dryFoodOnly?: boolean
    enteralTube?: boolean
    continuousLosses?: boolean
  }
  onChange: (config: HydrationPlanConfig) => void
}

function formatMl(value?: number | null) {
  if (value == null) return null
  return `${Math.round(value)} mL/dia`
}

export function HydrationPlanSection({
  config,
  species,
  prescribedKcalDay,
  rerKcalDay,
  totalFoodGrams,
  averageMoisturePct,
  proteinGrams,
  fatGrams,
  carbGrams,
  clinicalFlags,
  onChange,
}: HydrationPlanSectionProps) {
  const method = config.selectedMethod ?? 'energy_based'

  const preview = useMemo(
    () =>
      buildHydrationPlanPreview({
        species,
        prescribedKcalDay,
        rerKcalDay,
        config: { ...config, selectedMethod: method },
        foodGrams: totalFoodGrams,
        moisturePct: averageMoisturePct,
        proteinGrams,
        fatGrams,
        carbGrams,
        clinicalFlags,
      }),
    [
      averageMoisturePct,
      carbGrams,
      clinicalFlags,
      config,
      fatGrams,
      method,
      prescribedKcalDay,
      proteinGrams,
      rerKcalDay,
      species,
      totalFoodGrams,
    ],
  )

  const manualError = validateManualHydrationTarget({ ...config, selectedMethod: method })

  const displayRows = [
    { label: 'Meta nutricional estimada', value: formatMl(preview?.selectedTargetMlDay) },
    { label: 'Água presente nos alimentos', value: formatMl(preview?.foodWaterMlDay) },
    { label: 'Água metabólica estimada', value: formatMl(preview?.metabolicWaterMlDay) },
    {
      label: 'Água voluntária informada',
      value:
        config.voluntarilyConsumedWaterKnown === true && config.voluntarilyConsumedWaterMlDay != null
          ? formatMl(config.voluntarilyConsumedWaterMlDay)
          : config.voluntarilyConsumedWaterKnown === false
            ? 'Consumo voluntário desconhecido'
            : null,
    },
    { label: 'Água de lavagem da sonda', value: formatMl(preview?.enteralFlushWaterMlDay) },
    { label: 'Quantidade adicional estimada', value: formatMl(preview?.estimatedOralWaterGapMlDay) },
  ].filter((row) => row.value != null)

  return (
    <section className="rounded-2xl border border-border bg-muted/30 p-5 space-y-4 dark:border-white/10">
      <div>
        <h3 className="text-sm font-semibold text-foreground">Água e hidratação nutricional</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Estimativa nutricional — não substitui fluidoterapia ou correção de desidratação.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Método de estimativa</Label>
        <Select
          value={method}
          onValueChange={(value: HydrationPlanConfig['selectedMethod']) =>
            onChange({ ...config, selectedMethod: value })
          }
        >
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="energy_based">Estimativa pela energia prescrita</SelectItem>
            <SelectItem value="species_based">Estimativa por espécie</SelectItem>
            <SelectItem value="manual">Meta manual definida pelo médico-veterinário</SelectItem>
            <SelectItem value="none">Não calcular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {method === 'manual' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="manual-target">Meta (mL/dia)</Label>
            <LocalizedNumberInput
              id="manual-target"
              min={1}
              value={config.manualTargetMlDay}
              onValueChange={(value) => onChange({ ...config, manualTargetMlDay: value ?? undefined })}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="manual-reason">Justificativa clínica</Label>
            <textarea
              id="manual-reason"
              className="min-h-20 w-full rounded-xl border border-input bg-card p-3 text-sm"
              value={config.manualReason ?? ''}
              onChange={(e) => onChange({ ...config, manualReason: e.target.value })}
            />
          </div>
          {manualError && (
            <p className="sm:col-span-2 text-xs text-amber-600 flex items-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5" /> {manualError}
            </p>
          )}
        </div>
      )}

      {method !== 'none' && (
        <>
          <div className="space-y-2">
            <Label>Consumo voluntário de água</Label>
            <Select
              value={
                config.voluntarilyConsumedWaterKnown === true
                  ? 'measured'
                  : config.voluntarilyConsumedWaterKnown === false
                    ? 'unknown'
                    : 'unknown'
              }
              onValueChange={(value) => {
                if (value === 'unknown') {
                  onChange({
                    ...config,
                    voluntarilyConsumedWaterKnown: false,
                    voluntarilyConsumedWaterMlDay: undefined,
                  })
                } else {
                  onChange({ ...config, voluntarilyConsumedWaterKnown: true })
                }
              }}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="unknown">Consumo voluntário desconhecido</SelectItem>
                <SelectItem value="measured">Consumo voluntário medido em mL/dia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {config.voluntarilyConsumedWaterKnown === true && (
            <div className="space-y-2">
              <Label htmlFor="voluntary-ml">Volume medido (mL/dia)</Label>
              <LocalizedNumberInput
                id="voluntary-ml"
                min={0}
                value={config.voluntarilyConsumedWaterMlDay}
                onValueChange={(value) =>
                  onChange({ ...config, voluntarilyConsumedWaterMlDay: value ?? undefined })
                }
              />
            </div>
          )}

          {displayRows.length > 0 && (
            <div className="rounded-xl border border-border bg-card/50 p-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Resumo hídrico</p>
              {displayRows.map((row) => (
                <div key={row.label} className="flex justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-medium tabular-nums text-right">{row.value}</span>
                </div>
              ))}
            </div>
          )}

          {preview && preview.alerts.length > 0 && (
            <ul className="space-y-1.5 text-xs text-amber-700 dark:text-amber-200">
              {preview.alerts.map((alert) => (
                <li key={alert} className="flex gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  {alert}
                </li>
              ))}
            </ul>
          )}

          <p className="text-xs leading-relaxed text-muted-foreground border-t border-border pt-3">
            Esta estimativa nutricional não substitui o cálculo de fluidoterapia, a correção da desidratação ou a reposição de perdas contínuas.
          </p>
        </>
      )}
    </section>
  )
}

export function isHydrationPlanValid(config: HydrationPlanConfig): boolean {
  if (config.selectedMethod === 'none') return true
  if (config.selectedMethod === 'manual') {
    return validateManualHydrationTarget(config) === null
  }
  return true
}
