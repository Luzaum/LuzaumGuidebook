import { useMemo } from 'react'
import { AlertTriangle, Copy, RotateCcw, Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { LocalizedNumberInput } from './ui/localized-number-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Switch } from './ui/switch'
import type { DietTransitionConfig, DietTransitionSpecialSituation } from '../lib/clinicalSnapshotTypes'
import {
  buildTransitionPlan,
  DEFAULT_SEVEN_DAY_TRANSITION,
  validateTransitionDayPercents,
} from '../lib/nutrition-calculations/transitionEngine'
import { cn } from '../lib/utils'

interface DietTransitionSectionProps {
  config: DietTransitionConfig
  targetKcalDay: number
  newDietName: string
  newKcalPerGram: number
  newGramsPerDay: number
  isHospitalized?: boolean
  onChange: (config: DietTransitionConfig) => void
}

function buildStandardRows(durationDays: number) {
  return DEFAULT_SEVEN_DAY_TRANSITION.slice(0, durationDays).map((row, index) => ({
    ...row,
    day: index + 1,
  }))
}

export function DietTransitionSection({
  config,
  targetKcalDay,
  newDietName,
  newKcalPerGram,
  newGramsPerDay,
  isHospitalized,
  onChange,
}: DietTransitionSectionProps) {
  const durationDays = config.durationDays ?? 7
  const planMode = config.planMode ?? 'standard'
  const rows =
    planMode === 'custom' && config.customRows?.length
      ? config.customRows
      : buildStandardRows(durationDays)

  const planResult = useMemo(() => {
    if (!config.enabled || targetKcalDay <= 0) return null
    const previousKcal = config.previousKcalPerGram ?? 0
    if (previousKcal <= 0 || newKcalPerGram <= 0) return { error: 'Informe a densidade energética da dieta anterior.' }
    return buildTransitionPlan({
      targetKcalDay,
      previousDiet: {
        name: config.previousDietName ?? 'Dieta anterior',
        kcalPerGram: previousKcal,
        currentGramsPerDay: config.previousGramsPerDay,
      },
      newDiet: {
        name: newDietName,
        kcalPerGram: newKcalPerGram,
        prescribedGramsPerDay: newGramsPerDay,
      },
      durationDays,
      rows: planMode === 'custom' ? config.customRows : undefined,
    })
  }, [config, durationDays, newDietName, newGramsPerDay, newKcalPerGram, planMode, rows, targetKcalDay])

  const percentError = planMode === 'custom' && config.customRows ? validateTransitionDayPercents(config.customRows) : null

  const updateRows = (nextRows: DietTransitionConfig['customRows']) => {
    onChange({ ...config, planMode: 'custom', customRows: nextRows })
  }

  const setDuration = (days: number) => {
    const clamped = Math.min(14, Math.max(3, days))
    if (planMode === 'custom') {
      const current = config.customRows ?? buildStandardRows(clamped)
      const resized =
        current.length === clamped
          ? current
          : clamped > current.length
            ? [
                ...current,
                ...Array.from({ length: clamped - current.length }, (_, i) => ({
                  day: current.length + i + 1,
                  previousDietPercent: 50,
                  newDietPercent: 50,
                })),
              ]
            : current.slice(0, clamped).map((row, i) => ({ ...row, day: i + 1 }))
      onChange({ ...config, durationDays: clamped, customRows: resized })
    } else {
      onChange({ ...config, durationDays: clamped })
    }
  }

  const restoreStandard = () => {
    onChange({
      ...config,
      planMode: 'standard',
      durationDays: 7,
      customRows: undefined,
    })
  }

  const immediateNeedsJustification =
    config.specialSituation === 'immediate' && !isHospitalized && !config.immediateJustification?.trim()

  return (
    <section className="rounded-2xl border border-border bg-muted/30 p-5 space-y-4 dark:border-white/10">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Transição alimentar</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Plano gradual entre a dieta anterior e a nova formulação.</p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="transition-enabled" className="text-xs text-muted-foreground">Realizar transição?</Label>
          <Switch
            id="transition-enabled"
            checked={config.enabled}
            onCheckedChange={(enabled) => onChange({ ...config, enabled })}
          />
        </div>
      </div>

      {config.enabled && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="prev-diet-name">Dieta anterior</Label>
              <Input
                id="prev-diet-name"
                value={config.previousDietName ?? ''}
                onChange={(e) => onChange({ ...config, previousDietName: e.target.value })}
                placeholder="Nome da dieta anterior"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prev-kcal">Densidade energética anterior (kcal/g)</Label>
              <LocalizedNumberInput
                id="prev-kcal"
                min={0.01}
                step={0.01}
                value={config.previousKcalPerGram}
                onValueChange={(value) => onChange({ ...config, previousKcalPerGram: value ?? undefined })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Dieta nova (da formulação)</Label>
              <Input value={`${newDietName} — ${newKcalPerGram.toFixed(2)} kcal/g`} readOnly className="bg-muted/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transition-days">Duração (dias)</Label>
              <LocalizedNumberInput
                id="transition-days"
                integer
                min={3}
                max={14}
                value={durationDays}
                onValueChange={(value) => setDuration(value ?? 7)}
              />
            </div>
            <div className="space-y-2">
              <Label>Plano</Label>
              <Select
                value={planMode}
                onValueChange={(value: 'standard' | 'custom') => {
                  if (value === 'standard') {
                    onChange({ ...config, planMode: 'standard', customRows: undefined })
                  } else {
                    onChange({ ...config, planMode: 'custom', customRows: buildStandardRows(durationDays) })
                  }
                }}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Padrão (7 dias — gradual)</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Situação especial</Label>
            <Select
              value={config.specialSituation ?? 'none'}
              onValueChange={(value: DietTransitionSpecialSituation) =>
                onChange({ ...config, specialSituation: value })
              }
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Transição gradual padrão</SelectItem>
                <SelectItem value="immediate">Sem transição — mudança imediata indicada</SelectItem>
                <SelectItem value="prolonged">Transição prolongada</SelectItem>
                <SelectItem value="suspended_intolerance">Transição suspensa por intolerância</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {config.specialSituation === 'immediate' && !isHospitalized && (
            <div className="space-y-2">
              <Label htmlFor="immediate-justification">Justificativa clínica (obrigatória)</Label>
              <textarea
                id="immediate-justification"
                className="min-h-20 w-full rounded-xl border border-input bg-card p-3 text-sm"
                value={config.immediateJustification ?? ''}
                onChange={(e) => onChange({ ...config, immediateJustification: e.target.value })}
                placeholder="Descreva a indicação clínica para mudança imediata fora do ambiente hospitalar."
              />
            </div>
          )}

          {planMode === 'custom' && config.customRows && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Button type="button" variant="outline" size="sm" onClick={restoreStandard} className="gap-1">
                  <RotateCcw className="h-3.5 w-3.5" /> Restaurar plano padrão
                </Button>
              </div>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[420px] text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 text-left text-xs text-muted-foreground">
                      <th className="p-3">Dia</th>
                      <th className="p-3 text-right">Anterior %</th>
                      <th className="p-3 text-right">Nova %</th>
                      <th className="p-3 w-20" />
                    </tr>
                  </thead>
                  <tbody>
                    {config.customRows.map((row, index) => (
                      <tr key={row.day} className="border-b border-border last:border-0">
                        <td className="p-2 font-medium">{row.day}</td>
                        <td className="p-2">
                          <LocalizedNumberInput
                            min={0}
                            max={100}
                            value={row.previousDietPercent}
                            onValueChange={(value) => {
                              const next = [...config.customRows!]
                              next[index] = { ...row, previousDietPercent: value ?? 0 }
                              updateRows(next)
                            }}
                          />
                        </td>
                        <td className="p-2">
                          <LocalizedNumberInput
                            min={0}
                            max={100}
                            value={row.newDietPercent}
                            onValueChange={(value) => {
                              const next = [...config.customRows!]
                              next[index] = { ...row, newDietPercent: value ?? 0 }
                              updateRows(next)
                            }}
                          />
                        </td>
                        <td className="p-2">
                          <div className="flex gap-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              title="Duplicar linha"
                              onClick={() => {
                                if (config.customRows!.length >= 14) return
                                const next = [...config.customRows!]
                                next.splice(index + 1, 0, { ...row, day: row.day + 1 })
                                updateRows(next.map((r, i) => ({ ...r, day: i + 1 })))
                                onChange({ ...config, durationDays: next.length, customRows: next.map((r, i) => ({ ...r, day: i + 1 })) })
                              }}
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              disabled={config.customRows!.length <= 3}
                              onClick={() => {
                                const next = config.customRows!.filter((_, i) => i !== index).map((r, i) => ({ ...r, day: i + 1 }))
                                onChange({ ...config, durationDays: next.length, customRows: next })
                              }}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {percentError && (
                <p className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  {percentError}
                </p>
              )}
            </div>
          )}

          {planResult && 'error' in planResult && (
            <p className="text-xs text-amber-600 dark:text-amber-300">{planResult.error}</p>
          )}

          {planResult && !('error' in planResult) && (
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-left text-xs text-muted-foreground">
                    <th className="p-3">Dia</th>
                    <th className="p-3 text-right">Dieta anterior</th>
                    <th className="p-3 text-right">Dieta nova</th>
                    <th className="p-3 text-right">Energia total</th>
                  </tr>
                </thead>
                <tbody>
                  {planResult.rows.map((row) => (
                    <tr key={row.day} className="border-b border-border last:border-0">
                      <td className="p-3 font-medium">{row.day}</td>
                      <td className="p-3 text-right tabular-nums">
                        {row.previousDietGramsPractical} g
                        <span className="block text-[10px] text-muted-foreground">{row.previousDietPercent}%</span>
                      </td>
                      <td className="p-3 text-right tabular-nums">
                        {row.newDietGramsPractical} g
                        <span className="block text-[10px] text-muted-foreground">{row.newDietPercent}%</span>
                      </td>
                      <td className="p-3 text-right tabular-nums">{row.totalKcal.toFixed(0)} kcal</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {planResult.roundingErrorPercent != null && Math.abs(planResult.roundingErrorPercent) > 3 && (
                <p className="border-t border-border p-3 text-xs text-muted-foreground">
                  Erro energético após arredondamento: {planResult.roundingErrorPercent.toFixed(1)}%
                </p>
              )}
            </div>
          )}

          {immediateNeedsJustification && (
            <p className="text-xs text-amber-600">Informe a justificativa clínica para mudança imediata em ambiente ambulatorial.</p>
          )}
        </>
      )}
    </section>
  )
}

export function isDietTransitionValid(config: DietTransitionConfig, isHospitalized?: boolean): boolean {
  if (!config.enabled) return true
  if (config.specialSituation === 'immediate' && !isHospitalized && !config.immediateJustification?.trim()) {
    return false
  }
  if (!config.previousKcalPerGram || config.previousKcalPerGram <= 0) return false
  if (config.planMode === 'custom' && config.customRows) {
    return validateTransitionDayPercents(config.customRows) === null
  }
  return true
}
