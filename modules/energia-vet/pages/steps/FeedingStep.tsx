import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, ChevronLeft, Download, Save } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { computeDietPlan } from '../../lib/dietEngine'
import { exportFeedingSheetPdf } from '../../lib/pdf/feedingSheetPdf'
import { buildProgrammedFeedingPlan } from '../../lib/programmedFeeding'
import { getSavedReports, saveReport } from '../../lib/persistence'
import { migrateLocalReportsToSupabase, saveNutritionReportToSupabase } from '../../lib/supabaseReports'
import { useCalculationStore } from '../../store/calculationStore'
import type { StoredCalculationReport } from '../../types'
import { cn } from '../../lib/utils'

const NEW_ROUTE = '/calculadora-energetica/new'
const MODULE_ROUTE = '/calculadora-energetica'

function weekDates(startDate: string) {
  const base = new Date(`${startDate}T00:00:00`)
  return Array.from({ length: 7 }, (_, index) => { const date = new Date(base); date.setDate(date.getDate() + index); return date.toISOString().slice(0, 10) })
}

export default function FeedingStep() {
  const navigate = useNavigate()
  const { patient, energy, target, diet, hospital, setDiet } = useCalculationStore()
  const isQuick = patient.registrationMode === 'quick'
  const [mealsPerDay, setMealsPerDay] = useState(diet.programmedFeeding?.mealsPerDay ?? diet.mealsPerDay ?? 2)
  const [times, setTimes] = useState<string[]>(diet.programmedFeeding?.meals.map((meal) => meal.time) ?? [])
  const [startDate, setStartDate] = useState(diet.programmedFeeding?.startDate ?? new Date().toISOString().slice(0, 10))
  const [includePreparation, setIncludePreparation] = useState(diet.programmedFeeding?.includePreparationInstructions ?? false)
  const [preparationInstructions, setPreparationInstructions] = useState(diet.programmedFeeding?.preparationInstructions ?? '')
  const [saveToHistory, setSaveToHistory] = useState(!isQuick)
  const [saving, setSaving] = useState(false)

  const result = useMemo(() => computeDietPlan({ entries: diet.entries ?? [], targetEnergy: target.targetEnergy ?? diet.targetEnergy ?? 0, species: patient.species ?? 'dog', weightKg: target.targetWeight ?? patient.currentWeight ?? 0, mealsPerDay, patientName: isQuick ? 'Dieta rápida' : patient.name || 'Paciente', requirementProfileId: diet.requirementProfileId, additionalRequirementProfileIds: diet.additionalRequirementProfileIds }), [diet.additionalRequirementProfileIds, diet.entries, diet.requirementProfileId, diet.targetEnergy, isQuick, mealsPerDay, patient.currentWeight, patient.name, patient.species, target.targetEnergy, target.targetWeight])
  const dates = useMemo(() => weekDates(startDate), [startDate])
  const programmed = useMemo(() => ({ ...buildProgrammedFeedingPlan({ contributions: result.contributions, mealsPerDay, times, enabled: true }), startDate, printRangeMode: 'next_7_days' as const, generatedFeedingDates: dates, includePreparationInstructions: includePreparation, preparationInstructions }), [dates, includePreparation, mealsPerDay, preparationInstructions, result.contributions, startDate, times])
  const report = useMemo<StoredCalculationReport>(() => ({ id: 'preview-report', createdAt: new Date().toISOString(), patient: isQuick ? { ...patient, name: 'Dieta rápida', ownerName: '' } : patient, energy, target, diet: { ...diet, entries: result.normalizedEntries, targetEnergy: target.targetEnergy ?? 0, mealsPerDay, totalDryMatterGrams: result.totalDryMatterGrams, totalAsFedGrams: result.totalAsFedGrams, gramsPerDay: result.totalAsFedGrams, gramsPerMeal: result.totalAsFedGrams / mealsPerDay, programmedFeeding: programmed }, hospital, formula: { contributions: result.contributions, evaluation: result.evaluation, feedingPlan: result.feedingPlan, programmedFeeding: programmed } }), [diet, energy, hospital, isQuick, mealsPerDay, patient, programmed, result, target])

  const finish = async () => {
    setDiet({ mealsPerDay, programmedFeeding: programmed })
    if (!saveToHistory || isQuick) { toast.success(isQuick ? 'Dieta rápida concluída sem cadastrar o paciente.' : 'Plano concluído sem salvar no histórico.'); navigate(MODULE_ROUTE); return }
    setSaving(true)
    const stored = { ...report, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
    saveReport(stored)
    try { await saveNutritionReportToSupabase(stored); await migrateLocalReportsToSupabase(getSavedReports()); toast.success('Plano salvo e sincronizado.') } catch { toast.success('Plano salvo localmente no navegador.') }
    setSaving(false)
    navigate(MODULE_ROUTE)
  }

  return (
    <Card className="nutrition-step-card w-full">
      <CardHeader className="border-b border-border/60 pb-6"><CardTitle className="text-2xl">Alimentação programada</CardTitle><CardDescription>Organize uma semana de acompanhamento, os horários e a ficha operacional.</CardDescription></CardHeader>
      <CardContent className="space-y-7 pt-6">
        <section className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-6 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div className="min-w-0 space-y-5 rounded-3xl border border-border p-5">
            <div className="min-w-0"><Label>Refeições por dia</Label><div className="mt-2 grid min-w-0 grid-cols-3 gap-2">{[1, 2, 3, 4, 5, 6].map((value) => <button key={value} type="button" onClick={() => setMealsPerDay(value)} className={cn('min-h-12 min-w-0 rounded-xl border text-sm font-semibold', mealsPerDay === value ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}>{value}</button>)}</div></div>
            <div className="space-y-2"><Label htmlFor="feeding-start-date">Data inicial</Label><Input id="feeding-start-date" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /></div>
            <div className="rounded-2xl bg-primary/[0.06] p-4"><p className="font-semibold">Período da ficha: 7 dias</p><p className="mt-1 text-sm text-muted-foreground">De {dates[0]?.split('-').reverse().join('/')} a {dates[6]?.split('-').reverse().join('/')}.</p></div>
            <div><Label>Horários</Label><div className="mt-2 space-y-2">{programmed.meals.map((meal, index) => <div key={meal.id} className="flex items-center gap-3"><span className="min-w-24 text-sm">{index + 1}ª refeição</span><Input type="time" aria-label={`Horário da ${index + 1}ª refeição`} value={times[index] ?? meal.time} onChange={(event) => setTimes((current) => { const next = [...current]; next[index] = event.target.value; return next })} /></div>)}</div></div>
            <div className="rounded-2xl border border-border p-4"><label className="flex cursor-pointer items-start gap-3"><input type="checkbox" checked={includePreparation} onChange={(event) => setIncludePreparation(event.target.checked)} className="mt-1 h-5 w-5 accent-primary" /><span><span className="font-semibold">Incluir como preparar na ficha</span><span className="mt-1 block text-sm text-muted-foreground">Use para orientações de mistura, hidratação, cozimento ou armazenamento.</span></span></label>{includePreparation && <textarea value={preparationInstructions} onChange={(event) => setPreparationInstructions(event.target.value)} placeholder="Ex.: Misturar os ingredientes já pesados. Manter refrigerado por até 24 h. Servir em temperatura ambiente." className="mt-4 min-h-28 w-full rounded-xl border border-input bg-card p-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/20" />}</div>
          </div>

          <div className="space-y-3">{programmed.meals.map((meal) => <article key={meal.id} className="overflow-hidden rounded-2xl border border-border"><header className="flex items-center justify-between bg-muted/40 px-5 py-4"><div><p className="font-semibold">{meal.label}</p><p className="text-xs text-muted-foreground">{meal.time}</p></div><p className="text-xl font-bold text-primary">{meal.totalGrams} g</p></header><div className="overflow-x-auto"><table className="w-full min-w-[560px] text-sm"><thead><tr className="border-b border-border text-left text-xs text-muted-foreground"><th className="p-4">Alimento</th><th className="p-4 text-right">Quantidade</th><th className="p-4">Consumiu?</th><th className="p-4">Sobra</th></tr></thead><tbody>{meal.items.map((item) => <tr key={`${meal.id}-${item.foodId}`} className="border-b border-border last:border-0"><td className="p-4 font-medium">{item.foodName}</td><td className="p-4 text-right">{item.gramsAsFed} g</td><td className="p-4 text-muted-foreground">Sim / Não</td><td className="p-4 text-muted-foreground">Pesar sobra</td></tr>)}</tbody></table></div></article>)}</div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-border p-5 sm:flex-row sm:items-center sm:justify-between"><label className={cn('flex items-start gap-3', isQuick ? 'cursor-not-allowed opacity-60' : 'cursor-pointer')}><input type="checkbox" checked={saveToHistory && !isQuick} disabled={isQuick} onChange={(event) => setSaveToHistory(event.target.checked)} className="mt-1 h-5 w-5 accent-primary" /><span><span className="font-semibold">Salvar paciente e plano no histórico</span><span className="mt-1 block text-sm text-muted-foreground">{isQuick ? 'Indisponível na dieta rápida.' : 'Desmarque para concluir sem guardar este plano.'}</span></span></label><Button variant="outline" onClick={() => exportFeedingSheetPdf(report)} className="gap-2"><Download className="h-4 w-4" /> Baixar ficha PDF</Button></section>
        <div className="flex justify-between border-t border-border/60 pt-4"><Button variant="outline" onClick={() => navigate(`${NEW_ROUTE}/summary`)} className="gap-2"><ChevronLeft className="h-4 w-4" /> Anterior</Button><Button onClick={finish} disabled={saving} className="gap-2">{isQuick || !saveToHistory ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}{saving ? 'Salvando...' : isQuick ? 'Concluir sem cadastrar' : saveToHistory ? 'Salvar plano' : 'Concluir sem salvar'}</Button></div>
      </CardContent>
    </Card>
  )
}
