import { useMemo } from 'react'
import { AlertTriangle, ShieldCheck } from 'lucide-react'
import { Label } from './ui/label'
import { LocalizedNumberInput } from './ui/localized-number-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Switch } from './ui/switch'
import {
  calculateParenteralNutrition,
  DEFAULT_PERIPHERAL_OSMOLARITY_LIMIT_MOSM_L,
  PARENTERAL_PROTEIN_TARGETS,
} from '../lib/hospital-nutrition/parenteralEngine'
import type { HospitalNutritionPlan } from '../types'

interface ParenteralNutritionSectionProps {
  species: 'dog' | 'cat'
  currentWeightKg: number
  targetKcalDay: number
  hospital: Partial<HospitalNutritionPlan>
  onChange: (data: Partial<HospitalNutritionPlan>) => void
}

export function ParenteralNutritionSection({
  species,
  currentWeightKg,
  targetKcalDay,
  hospital,
  onChange,
}: ParenteralNutritionSectionProps) {
  const proteinTarget = PARENTERAL_PROTEIN_TARGETS[species].standard[0]
  const limit = hospital.peripheralOsmolarityLimitMosmL ?? DEFAULT_PERIPHERAL_OSMOLARITY_LIMIT_MOSM_L

  const result = useMemo(() => {
    if (currentWeightKg <= 0 || targetKcalDay <= 0) return null
    return calculateParenteralNutrition({
      currentWeightKg,
      targetKcalDay,
      proteinGramsPer100Kcal: proteinTarget,
      lipidFraction: 0.5,
      dextroseFraction: 0.5,
      infusionHours: hospital.infusionHoursPerDay ?? 24,
      additionalFluidMlDay: hospital.additionalFluidMlDay,
      vascularAccess: hospital.vascularAccess ?? 'not_defined',
      peripheralOsmolarityLimitMosmL: limit,
    })
  }, [currentWeightKg, hospital.additionalFluidMlDay, hospital.infusionHoursPerDay, hospital.vascularAccess, limit, proteinTarget, targetKcalDay])

  const osmolarityLabel =
    result?.estimatedOsmolarityMosmL != null
      ? `${result.estimatedOsmolarityMosmL.toFixed(0)} mOsm/L`
      : 'Não calculada — dados insuficientes'

  return (
    <section className="rounded-2xl border border-rose-400/25 bg-rose-500/[0.04] p-5 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-rose-500" />
          Nutrição parenteral — fluxo profissional
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">Restrito à equipe clínica/hospitalar. Não exibido ao tutor.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
        <div className="rounded-xl border border-border bg-card/60 p-3">
          <p className="text-[10px] text-muted-foreground">Peso</p>
          <p className="font-semibold">{currentWeightKg.toFixed(2)} kg</p>
        </div>
        <div className="rounded-xl border border-border bg-card/60 p-3">
          <p className="text-[10px] text-muted-foreground">Meta energética</p>
          <p className="font-semibold">{targetKcalDay.toFixed(0)} kcal/dia</p>
        </div>
        <div className="rounded-xl border border-border bg-card/60 p-3">
          <p className="text-[10px] text-muted-foreground">Meta proteica</p>
          <p className="font-semibold">{proteinTarget} g/100 kcal</p>
        </div>
      </div>

      {result && (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[520px] text-sm">
            <tbody>
              {[
                ['Solução de aminoácidos', `${result.aminoAcidVolumeMlDay.toFixed(1)} mL/dia`],
                ['Dextrose', `${result.dextroseVolumeMlDay.toFixed(1)} mL/dia (${result.dextroseGramsDay.toFixed(1)} g)`],
                ['Emulsão lipídica', `${result.lipidVolumeMlDay.toFixed(1)} mL/dia (${result.lipidGramsDay.toFixed(1)} g)`],
                ['Diluentes adicionais', `${(hospital.additionalFluidMlDay ?? 0).toFixed(1)} mL/dia`],
                ['Volume final', `${result.totalPnVolumeMlDay.toFixed(1)} mL/dia`],
                ['Taxa de infusão', `${result.pnRateMlHour.toFixed(1)} mL/h`],
                ['GIR', `${result.glucoseInfusionRateMgKgMin.toFixed(2)} mg/kg/min`],
                ['Lipídios', `${result.lipidGramsKgDay.toFixed(2)} g/kg/dia`],
                ['Osmolaridade estimada', osmolarityLabel],
              ].map(([label, value]) => (
                <tr key={label} className="border-b border-border last:border-0">
                  <td className="p-3 text-muted-foreground">{label}</td>
                  <td className="p-3 text-right font-medium tabular-nums">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Via vascular</Label>
          <Select
            value={hospital.vascularAccess ?? 'not_defined'}
            onValueChange={(value: 'peripheral' | 'central' | 'not_defined') =>
              onChange({ vascularAccess: value })
            }
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="not_defined">A definir</SelectItem>
              <SelectItem value="peripheral">Acesso periférico</SelectItem>
              <SelectItem value="central">Acesso central</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pn-osm-limit">Limite periférico (mOsm/L)</Label>
          <LocalizedNumberInput
            id="pn-osm-limit"
            min={850}
            max={1000}
            value={limit}
            onValueChange={(value) => onChange({ peripheralOsmolarityLimitMosmL: value ?? DEFAULT_PERIPHERAL_OSMOLARITY_LIMIT_MOSM_L })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pn-add-fluid">Diluente adicional (mL/dia)</Label>
          <LocalizedNumberInput
            id="pn-add-fluid"
            min={0}
            value={hospital.additionalFluidMlDay}
            onValueChange={(value) => onChange({ additionalFluidMlDay: value ?? undefined })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pn-infusion-hours">Horas de infusão/dia</Label>
          <LocalizedNumberInput
            id="pn-infusion-hours"
            min={1}
            max={24}
            value={hospital.infusionHoursPerDay ?? 24}
            onValueChange={(value) => onChange({ infusionHoursPerDay: value ?? 24 })}
          />
        </div>
      </div>

      {result && result.alerts.length > 0 && (
        <ul className="space-y-1.5 text-xs text-amber-700 dark:text-amber-200">
          {result.alerts.map((alert) => (
            <li key={alert} className="flex gap-2">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              {alert}
            </li>
          ))}
        </ul>
      )}

      <div className="rounded-xl border border-border bg-card/50 p-4 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground">Monitoramento sugerido</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Glicemia capilar conforme protocolo institucional</li>
          <li>• Eletrólitos e função hepática</li>
          <li>• Sinais de sobrecarga lipídica</li>
        </ul>
        <label className="flex items-start gap-3 cursor-pointer">
          <Switch
            checked={hospital.parenteralReviewConfirmed ?? false}
            onCheckedChange={(checked) => onChange({ parenteralReviewConfirmed: checked })}
          />
          <span className="text-sm leading-relaxed">
            Revisei os componentes, concentrações, compatibilidade, via vascular e protocolo institucional.
          </span>
        </label>
      </div>
    </section>
  )
}

export function isParenteralReviewConfirmed(hospital: Partial<HospitalNutritionPlan>): boolean {
  return hospital.parenteralReviewConfirmed === true
}
