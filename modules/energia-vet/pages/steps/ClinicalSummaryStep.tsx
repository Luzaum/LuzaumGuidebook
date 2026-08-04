import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight, MinusCircle } from 'lucide-react'
import { NutrientGapSection } from '../../components/NutrientGapSection'
import { ParenteralNutritionSection } from '../../components/ParenteralNutritionSection'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { EnergyPartitionChart } from '../../components/EnergyPartitionChart'
import { computeDietPlan } from '../../lib/dietEngine'
import { isCalculationEngineV3Enabled } from '../../lib/nutritionCalculationBridge'
import { useCalculationStore } from '../../store/calculationStore'

const NEW_ROUTE = '/calculadora-energetica/new'

function targetText(target: { raw: string | number | null }) { return target.raw == null ? '—' : String(target.raw) }
function statusView(status: string) {
  if (status === 'adequate') return { label: 'Adequado', className: 'text-emerald-700 dark:text-emerald-300', icon: CheckCircle2 }
  if (status === 'below') return { label: 'Abaixo', className: 'text-amber-700 dark:text-amber-300', icon: AlertTriangle }
  if (status === 'above') return { label: 'Acima', className: 'text-red-700 dark:text-red-300', icon: AlertTriangle }
  return { label: 'Revisar', className: 'text-muted-foreground', icon: MinusCircle }
}

export default function ClinicalSummaryStep() {
  const navigate = useNavigate()
  const { patient, energy, target, diet, hospital, setHospital } = useCalculationStore()
  const v3Enabled = isCalculationEngineV3Enabled()
  const result = useMemo(() => computeDietPlan({ entries: diet.entries ?? [], targetEnergy: target.targetEnergy ?? diet.targetEnergy ?? 0, species: patient.species ?? 'dog', weightKg: target.targetWeight ?? patient.currentWeight ?? 0, mealsPerDay: diet.mealsPerDay ?? 2, patientName: patient.name || 'Dieta rápida', requirementProfileId: diet.requirementProfileId, additionalRequirementProfileIds: diet.additionalRequirementProfileIds }), [diet.additionalRequirementProfileIds, diet.entries, diet.mealsPerDay, diet.requirementProfileId, diet.targetEnergy, patient.currentWeight, patient.name, patient.species, target.targetEnergy, target.targetWeight])
  const energyTotal = result.evaluation.macroSplit.reduce((sum, item) => sum + item.kcal, 0)
  const goalLabel = target.goal === 'weight_loss' ? 'Redução de peso' : target.goal === 'weight_gain' ? 'Recuperação de peso' : 'Manutenção'
  const comparableAdequacy = result.evaluation.adequacy.filter((row) => row.deliveredValue != null && row.target != null)
  const unavailableAdequacy = result.evaluation.adequacy.filter((row) => row.deliveredValue == null || row.target == null)
  const belowRows = comparableAdequacy.filter((row) => row.status === 'below')

  return (
    <Card className="nutrition-step-card w-full">
      <CardHeader className="border-b border-border/60 pb-6"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><CardTitle className="text-2xl">Resumo clínico nutricional</CardTitle><CardDescription className="mt-1">Revisão técnica da prescrição antes de programar as refeições.</CardDescription></div><Badge variant="outline" className="w-fit rounded-full px-3 py-1">Documento clínico</Badge></div></CardHeader>
      <CardContent className="space-y-7 pt-6">
        <section className="overflow-hidden rounded-2xl border border-border"><div className="border-b border-border bg-muted/40 px-5 py-4"><h2 className="font-semibold">Paciente, energia e meta</h2></div><dl className="grid sm:grid-cols-2 lg:grid-cols-4"><div className="border-b border-border p-5 sm:border-r lg:border-b-0"><dt className="text-xs text-muted-foreground">Paciente</dt><dd className="mt-1 font-semibold">{patient.registrationMode === 'quick' ? 'Dieta rápida' : patient.name || 'Sem nome'}</dd><dd className="text-sm text-muted-foreground">{patient.species === 'cat' ? 'Gato' : 'Cão'} · ECC {patient.bcs ?? 5}/9</dd></div><div className="border-b border-border p-5 lg:border-b-0 lg:border-r"><dt className="text-xs text-muted-foreground">Perfil energético</dt><dd className="mt-1 font-semibold">{energy.resolvedProfileLabel ?? 'Não informado'}</dd><dd className="text-sm text-muted-foreground">{energy.merFromProfile?.toFixed(0) ?? '—'} kcal/dia no perfil</dd></div><div className="border-b border-border p-5 sm:border-r sm:border-b-0"><dt className="text-xs text-muted-foreground">Meta</dt><dd className="mt-1 font-semibold">{goalLabel}</dd><dd className="text-sm text-muted-foreground">{target.targetWeight?.toFixed(2) ?? patient.currentWeight?.toFixed(2) ?? '—'} kg</dd></div><div className="p-5"><dt className="text-xs text-muted-foreground">Prescrição energética</dt><dd className="mt-1 text-xl font-bold text-primary">{(target.targetEnergy ?? 0).toFixed(0)} kcal/dia</dd><dd className="text-sm text-muted-foreground">{result.totalAsFedGrams.toFixed(1)} g/dia</dd></div></dl></section>

        <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]"><div className="rounded-3xl border border-border p-5"><EnergyPartitionChart macroSplit={result.evaluation.macroSplit} totalKcal={energyTotal} showMacroKcal size="lg" /></div><div className="overflow-hidden rounded-3xl border border-border"><div className="border-b border-border bg-muted/40 p-4"><h2 className="font-semibold">Contribuição por alimento</h2><p className="text-sm text-muted-foreground">Quantidade e energia entregues diariamente.</p></div><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border text-left text-xs text-muted-foreground"><th className="p-4">Alimento</th><th className="p-4 text-right">Fórmula</th><th className="p-4 text-right">MN/dia</th><th className="p-4 text-right">MS/dia</th><th className="p-4 text-right">Energia</th></tr></thead><tbody>{result.contributions.map((row) => <tr key={row.foodId} className="border-b border-border last:border-0"><td className="p-4 font-medium">{row.foodName}</td><td className="p-4 text-right">{row.inclusionPct.toFixed(1)}%</td><td className="p-4 text-right">{row.gramsAsFed.toFixed(1)} g</td><td className="p-4 text-right">{row.gramsDryMatter.toFixed(1)} g</td><td className="p-4 text-right">{row.deliveredKcal.toFixed(0)} kcal</td></tr>)}</tbody></table></div></div></section>

        <section className="overflow-hidden rounded-3xl border border-border"><div className="flex flex-col gap-2 border-b border-border bg-muted/40 p-5 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="font-semibold">Adequação frente ao perfil</h2><p className="text-sm text-muted-foreground">Primeiro, apenas nutrientes com dado entregue e referência disponível.</p></div><p className="text-xs text-muted-foreground">Valores ausentes não são presumidos.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-sm"><thead><tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground"><th className="p-4">Nutriente</th><th className="p-4 text-right">Entregue</th><th className="p-4 text-right">Referência</th><th className="p-4">Situação</th></tr></thead><tbody>{comparableAdequacy.map((row, index) => { const view = statusView(row.status); const Icon = view.icon; return <tr key={`${row.key}-${index}`} className="border-b border-border last:border-0"><td className="p-4 font-medium">{row.label}</td><td className="p-4 text-right tabular-nums">{row.deliveredValue?.toFixed(2)} {row.unit ?? ''}</td><td className="p-4 text-right tabular-nums">{targetText(row.target!)}</td><td className={`p-4 ${view.className}`}><span className="inline-flex items-center gap-2 font-medium"><Icon className="h-4 w-4" />{view.label}</span></td></tr> })}{comparableAdequacy.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">Ainda não há nutrientes com dados suficientes para comparar.</td></tr>}</tbody></table></div>{unavailableAdequacy.length > 0 && <details className="border-t border-border"><summary className="flex min-h-14 cursor-pointer items-center justify-between gap-3 px-5 text-sm font-semibold"><span>Nutrientes sem informação suficiente</span><span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">{unavailableAdequacy.length}</span></summary><div className="border-t border-border bg-muted/20 p-4"><div className="flex flex-wrap gap-2">{unavailableAdequacy.map((row, index) => <Badge key={`${row.key}-${index}`} variant="outline" className="rounded-full bg-card">{row.label}</Badge>)}</div><p className="mt-3 text-xs text-muted-foreground">Abra esta área para revisar o que ainda precisa de dado analítico do alimento ou de referência aplicável.</p></div></details>}</section>

        <NutrientGapSection belowRows={belowRows} contributions={result.contributions} />
        {v3Enabled && patient.isHospitalized && hospital.feedingRoute === 'parenteral' && (
          <ParenteralNutritionSection
            species={patient.species ?? 'dog'}
            currentWeightKg={patient.currentWeight ?? 0}
            targetKcalDay={target.targetEnergy ?? 0}
            hospital={hospital}
            onChange={setHospital}
          />
        )}
        {result.evaluation.alerts.length > 0 && <section className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.07] p-5"><h2 className="flex items-center gap-2 font-semibold"><AlertTriangle className="h-5 w-5 text-amber-600" /> Pontos para revisão</h2><ul className="mt-3 space-y-2 text-sm text-muted-foreground">{result.evaluation.alerts.map((alert) => <li key={alert}>• {alert}</li>)}</ul></section>}
        <div className="flex justify-between border-t border-border/60 pt-4"><Button variant="outline" onClick={() => navigate(`${NEW_ROUTE}/formulation`)} className="gap-2"><ChevronLeft className="h-4 w-4" /> Anterior</Button><Button onClick={() => navigate(`${NEW_ROUTE}/feeding`)} className="gap-2">Próximo: Alimentação <ChevronRight className="h-4 w-4" /></Button></div>
      </CardContent>
    </Card>
  )
}
