import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Download, Printer, Save } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { useCalculationStore } from '../../store/calculationStore'
import { computeDietPlan } from '../../lib/dietEngine'
import { getFoodById, getNutrientDefinition, getRequirementById } from '../../lib/genutriData'
import { getSavedReports, saveReport } from '../../lib/persistence'
import { exportReportPdf, printReportPdf } from '../../lib/reportDocument'
import { calculateRefeedingRisk, getPhysiologicStateById, getProgressionPlan3Days, getProgressionPlan4Days } from '../../lib/nutrition'
import { getClinicalProfileBadges, getHumanRequirementLabel } from '../../lib/clinicalProfiles'
import { buildProgrammedFeedingPlan } from '../../lib/programmedFeeding'
import { migrateLocalReportsToSupabase, saveNutritionReportToSupabase } from '../../lib/supabaseReports'
import PrintableReportDocument from '../../components/PrintableReportDocument'
import { EnergyPartitionChart } from '../../components/EnergyPartitionChart'
import type { StoredCalculationReport } from '../../types'

const NEW_ROUTE = '/calculadora-energetica/new'
const MODULE_ROUTE = '/calculadora-energetica'

function formatDailyAmount(key: string, value: number | null | undefined) {
  if (value == null) return '--'
  const definition = getNutrientDefinition(key)
  if (key.endsWith('Pct')) return `${value.toFixed(2)} g/dia`
  return `${value.toFixed(2)} ${definition?.unit ?? ''}/dia`.trim()
}

function StatusBadge({ status }: { status: 'adequate' | 'below' | 'above' | 'insufficient_data' | 'manual' }) {
  const classes =
    status === 'adequate'
      ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200'
      : status === 'below'
      ? 'border-red-400/30 bg-red-500/10 text-red-200'
      : status === 'above'
      ? 'border-amber-400/30 bg-amber-500/10 text-amber-200'
      : status === 'manual'
      ? 'border-sky-400/30 bg-sky-500/10 text-sky-200'
      : 'border-white/15 bg-white/5 text-muted-foreground'

  const label =
    status === 'adequate'
      ? 'Adequado'
      : status === 'below'
      ? 'Abaixo do alvo'
      : status === 'above'
      ? 'Acima do alvo'
      : status === 'manual'
      ? 'Revisão manual'
      : 'Dados insuficientes'

  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${classes}`}>{label}</span>
}

export default function SummaryStep() {
  const navigate = useNavigate()
  const { patient, energy, target, diet, hospital } = useCalculationStore()
  const [programmedMealsPerDay, setProgrammedMealsPerDay] = useState(diet.programmedFeeding?.mealsPerDay ?? diet.mealsPerDay ?? 2)
  const [programmedTimes, setProgrammedTimes] = useState<string[]>(diet.programmedFeeding?.meals.map((meal) => meal.time) ?? [])
  const [programmedStartDate, setProgrammedStartDate] = useState(
    diet.programmedFeeding?.startDate ?? new Date().toISOString().slice(0, 10),
  )
  const [printRangeMode, setPrintRangeMode] = useState<'single_day' | 'next_3_days'>(
    diet.programmedFeeding?.printRangeMode ?? 'single_day',
  )

  const species = patient.species ?? 'dog'
  const currentWeight = patient.currentWeight ?? 0
  const physiologicStateLabel = energy.resolvedProfileLabel ?? getPhysiologicStateById(energy.stateId ?? '')?.label ?? 'Não informado'
  const requirementLabel = getHumanRequirementLabel(getRequirementById(diet.requirementProfileId))
  const comorbidityLabels = useMemo(() => getClinicalProfileBadges(species, patient.comorbidityIds ?? []), [patient.comorbidityIds, species])

  const result = useMemo(() => {
    if (!diet.entries?.length || !target.targetEnergy || !currentWeight) return null
    return computeDietPlan({
      entries: diet.entries,
      targetEnergy: target.targetEnergy,
      species,
      weightKg: currentWeight,
      mealsPerDay: diet.mealsPerDay ?? 2,
      patientName: patient.name ?? 'Paciente',
      requirementProfileId: diet.requirementProfileId,
      additionalRequirementProfileIds: diet.additionalRequirementProfileIds,
    })
  }, [currentWeight, diet.additionalRequirementProfileIds, diet.entries, diet.mealsPerDay, diet.requirementProfileId, patient.name, species, target.targetEnergy])

  const generatedFeedingDates = useMemo(() => {
    const start = new Date(`${programmedStartDate}T00:00:00`)
    if (Number.isNaN(start.getTime())) return [new Date().toISOString().slice(0, 10)]
    if (printRangeMode === 'single_day') return [programmedStartDate]
    return [0, 1, 2].map((offset) => {
      const next = new Date(start)
      next.setDate(next.getDate() + offset)
      const y = next.getFullYear()
      const m = String(next.getMonth() + 1).padStart(2, '0')
      const d = String(next.getDate()).padStart(2, '0')
      return `${y}-${m}-${d}`
    })
  }, [printRangeMode, programmedStartDate])

  const programmedFeeding = useMemo(() => {
    if (!result) return null
    const basePlan = buildProgrammedFeedingPlan({
      contributions: result.contributions,
      mealsPerDay: programmedMealsPerDay,
      times: programmedTimes,
      enabled: true,
    })
    return {
      ...basePlan,
      startDate: programmedStartDate,
      printRangeMode,
      generatedFeedingDates,
    }
  }, [generatedFeedingDates, printRangeMode, programmedMealsPerDay, programmedStartDate, programmedTimes, result])

  const printableReport = useMemo<StoredCalculationReport | null>(() => {
    if (!result) return null
    return {
      id: 'preview-report',
      createdAt: new Date().toISOString(),
      patient,
      energy,
      target,
      diet: {
        ...diet,
        entries: diet.entries,
        totalDryMatterGrams: result.totalDryMatterGrams,
        totalAsFedGrams: result.totalAsFedGrams,
        gramsPerDay: result.totalAsFedGrams,
        gramsPerMeal: result.feedingPlan.meals[0]?.gramsAsFed ?? 0,
        targetEnergy: target.targetEnergy ?? 0,
        mealsPerDay: diet.mealsPerDay ?? 2,
        dietType: diet.dietType ?? 'commercial',
        programmedFeeding: programmedFeeding ?? undefined,
      },
      hospital,
      formula: {
        contributions: result.contributions,
        evaluation: result.evaluation,
        feedingPlan: result.feedingPlan,
        programmedFeeding: programmedFeeding ?? undefined,
      },
    }
  }, [diet, energy, hospital, patient, programmedFeeding, result, target])

  const summaryItems = useMemo(() => {
    if (!result) return [] as Array<{ label: string; value: string }>
    const td = result.evaluation.totalDelivered
    const items: Array<{ label: string; value: string }> = [
      { label: 'Energia entregue', value: `${result.totalKcal.toFixed(1)} kcal/dia` },
    ]
    const pushIf = (label: string, key: string, raw: number | null | undefined) => {
      if (raw == null) return
      items.push({ label, value: formatDailyAmount(key, raw) })
    }
    pushIf('Proteína total', 'crudeProteinPct', td.crudeProteinPct)
    pushIf('Gordura total', 'etherExtractPct', td.etherExtractPct)
    pushIf('Carboidrato estimado', 'nitrogenFreeExtractPct', td.nitrogenFreeExtractPct)
    pushIf('Fibra', 'crudeFiberPct', td.crudeFiberPct)
    pushIf('Cálcio', 'calciumPct', td.calciumPct)
    pushIf('Fósforo', 'phosphorusPct', td.phosphorusPct)
    if (td.taurinePct != null) {
      items.push({ label: 'Taurina', value: formatDailyAmount('taurinePct', td.taurinePct) })
    }
    return items
  }, [result])

  const hospitalRisk = patient.isHospitalized
    ? calculateRefeedingRisk(
        hospital.daysAnorexic ?? 0,
        hospital.daysHyporexic ?? 0,
        hospital.recentIntakePercent ?? 100,
        patient.bcs ?? 5,
        (hospital.electrolytes?.phosphorus ?? 1) < 1 ||
          (hospital.electrolytes?.potassium ?? 1) < 1 ||
          (hospital.electrolytes?.magnesium ?? 1) < 1,
      )
    : null

  const progressionPlan =
    patient.isHospitalized && (energy.rer ?? 0) > 0
      ? hospital.progressionProtocol === '3_days'
        ? getProgressionPlan3Days(energy.rer ?? 0)
        : getProgressionPlan4Days(energy.rer ?? 0)
      : []

  const handleSave = async () => {
    if (!printableReport) return
    try {
      const reportToSave = { ...printableReport, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
      saveReport(reportToSave)
      await saveNutritionReportToSupabase(reportToSave)
      await migrateLocalReportsToSupabase(getSavedReports())
      toast.success('Resumo salvo no histórico da clínica (Supabase).')
      navigate(MODULE_ROUTE)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Falha ao salvar no Supabase.'
      toast.error(message)
    }
  }

  if (!result) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-sm text-muted-foreground">A formulação ainda não foi concluída.</CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full pb-20">
      <style>{`@media print{body,html{background:white!important;color:black!important;padding:0!important;margin:0!important;}@page{size:A4;margin:12mm 14mm;}body *{visibility:hidden!important;}.no-print,.no-print *{display:none!important;}#print-report-root,#print-report-root *{visibility:visible!important;}#print-report-root{display:block!important;position:absolute;inset:0;width:100%;}.rx-page-break{break-before:page;}}`}</style>

      <div className="no-print print:hidden space-y-6">
        <Card className="border-border bg-white shadow-[0_18px_50px_rgba(0,0,0,0.08)] dark:border-orange-400/15 dark:bg-gradient-to-b dark:from-card dark:via-card dark:to-card/95 dark:shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
          <CardHeader className="border-b border-border bg-slate-50 dark:border-white/5 dark:bg-orange-500/[0.04]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle className="text-2xl text-foreground dark:text-white">Resumo do plano nutricional</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">Resumo clínico, formulação e alimentação programada.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => printableReport && printReportPdf(printableReport)}>
                  <Printer className="h-4 w-4" /> Imprimir PDF
                </Button>
                <Button size="sm" className="gap-2" onClick={() => printableReport && exportReportPdf(printableReport)}>
                  <Download className="h-4 w-4" /> Exportar PDF
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <Card className="border-border bg-muted/25 dark:border-white/10 dark:bg-white/[0.03]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Paciente e energia</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-black/10 p-4"><p className="text-xs text-muted-foreground">Paciente</p><p className="mt-1 font-semibold text-foreground dark:text-white">{patient.name || 'Nao informado'}</p></div>
                  <div className="rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-black/10 p-4"><p className="text-xs text-muted-foreground">Tutor</p><p className="mt-1 font-semibold text-foreground dark:text-white">{patient.ownerName || '--'}</p></div>
                  <div className="rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-black/10 p-4"><p className="text-xs text-muted-foreground">Espécie</p><p className="mt-1 font-semibold text-foreground dark:text-white">{species === 'dog' ? 'Cao' : 'Gato'}</p></div>
                  <div className="rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-black/10 p-4"><p className="text-xs text-muted-foreground">Peso atual</p><p className="mt-1 font-semibold text-foreground dark:text-white">{currentWeight.toFixed(2)} kg</p></div>
                  <div className="rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-black/10 p-4"><p className="text-xs text-muted-foreground">Perfil final</p><p className="mt-1 font-semibold text-foreground dark:text-white">{physiologicStateLabel}</p></div>
                  <div className="rounded-2xl border border-orange-400/25 bg-orange-500/[0.08] p-4"><p className="text-xs text-muted-foreground">Energia-alvo</p><p className="mt-1 text-2xl font-black text-orange-300">{target.targetEnergy?.toFixed(0) ?? '--'} kcal/dia</p></div>
                  <div className="md:col-span-2 flex flex-wrap gap-2">
                    <Badge variant="outline">{patient.isNeutered ? 'Castrado' : 'Não castrado'}</Badge>
                    <Badge variant="outline">{patient.isHospitalized ? 'Hospitalizado' : 'Ambulatorial'}</Badge>
                    <Badge variant="outline">{requirementLabel}</Badge>
                    {comorbidityLabels.map((label) => (
                      <Badge key={label} className="rounded-full bg-orange-500/12 text-orange-200">{label}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-muted/25 dark:border-white/10 dark:bg-white/[0.03]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Partição energética</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <EnergyPartitionChart
                    chartId="summary-macro-chart"
                    totalKcal={result.totalKcal}
                    macroSplit={result.evaluation.macroSplit}
                    size="lg"
                    kcalSuffix="kcal/dia"
                    showTitle={false}
                    showMacroKcal
                  />
                </CardContent>
              </Card>
            </div>

            <Card className="border-border bg-muted/25 dark:border-white/10 dark:bg-white/[0.03]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Resumo nutricional</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-4">
                {summaryItems.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="mt-1 font-semibold text-foreground dark:text-white">{item.value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border bg-muted/25 dark:border-white/10 dark:bg-white/[0.03]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Contribuição por alimento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.contributions.map((item) => {
                  const food = getFoodById(item.foodId)
                  return (
                    <div key={item.foodId} className="grid gap-3 rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-black/10 p-4 md:grid-cols-4">
                      <div><p className="font-semibold text-foreground dark:text-white">{item.foodName}</p><p className="text-xs text-muted-foreground">{food?.categoryNormalized ?? 'Sem categoria'}</p></div>
                      <div><p className="text-xs text-muted-foreground">Inclusão</p><p className="font-medium text-foreground dark:text-white">{item.inclusionPct.toFixed(2)}%</p></div>
                      <div><p className="text-xs text-muted-foreground">Oferta diária</p><p className="font-medium text-foreground dark:text-white">{item.gramsAsFed.toFixed(2)} g</p></div>
                      <div><p className="text-xs text-muted-foreground">Energia</p><p className="font-medium text-foreground dark:text-white">{item.deliveredKcal.toFixed(2)} kcal</p></div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card className="border-border bg-muted/25 dark:border-white/10 dark:bg-white/[0.03]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Adequação frente ao perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.evaluation.adequacy.filter((item) => item.deliveredValue != null).length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nenhum nutriente com valor entregue disponível para comparar ao perfil (nutrientes sem dado cadastrado ficam de fora deste resumo).
                  </p>
                ) : (
                  result.evaluation.adequacy
                    .filter((item) => item.deliveredValue != null)
                    .map((item) => (
                      <div key={`${item.profileId}-${item.key}`} className="grid gap-4 rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-black/10 p-4 lg:grid-cols-[1.1fr_0.7fr_0.5fr]">
                        <div>
                          <p className="font-semibold text-foreground dark:text-white">{item.label}</p>
                          <p className="mt-2 text-xs text-muted-foreground">{item.reason}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Entregue</p>
                          <p className="mt-1 font-semibold text-foreground dark:text-white">{item.deliveredValue!.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center lg:justify-end">
                          <StatusBadge status={item.status} />
                        </div>
                      </div>
                    ))
                )}
              </CardContent>
            </Card>

            {programmedFeeding && (
              <Card className="border-border bg-muted/25 dark:border-white/10 dark:bg-white/[0.03]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">6. Alimentação programada</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 xl:grid-cols-[0.75fr_1.25fr]">
                    <div className="space-y-4 rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-black/10 p-4">
                      <p className="font-semibold text-foreground dark:text-white">Configuração diária</p>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4, 5, 6].map((value) => (
                          <button key={value} type="button" onClick={() => setProgrammedMealsPerDay(value)} className={`rounded-xl border px-3 py-3 text-sm transition-all ${programmedMealsPerDay === value ? 'border-orange-400/60 bg-orange-500/12 text-foreground dark:text-white' : 'border-border bg-muted/40 text-muted-foreground hover:border-orange-500/40 hover:text-foreground dark:border-white/10 dark:bg-black/10 dark:hover:text-white'}`}>{value}</button>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="feeding-start-date">Data inicial da ficha</Label>
                        <Input
                          id="feeding-start-date"
                          type="date"
                          value={programmedStartDate}
                          onChange={(event) => setProgrammedStartDate(event.target.value)}
                          className="max-w-[220px] border-border bg-muted/50 dark:border-white/10 dark:bg-black/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Intervalo de impressão</p>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setPrintRangeMode('single_day')}
                            className={`rounded-xl border px-3 py-2 text-xs transition-all ${
                              printRangeMode === 'single_day'
                                ? 'border-orange-400/60 bg-orange-500/12 text-foreground dark:text-white'
                                : 'border-border bg-muted/40 text-muted-foreground hover:border-orange-500/40 hover:text-foreground dark:border-white/10 dark:bg-black/10 dark:hover:text-white'
                            }`}
                          >
                            Imprimir apenas esta data
                          </button>
                          <button
                            type="button"
                            onClick={() => setPrintRangeMode('next_3_days')}
                            className={`rounded-xl border px-3 py-2 text-xs transition-all ${
                              printRangeMode === 'next_3_days'
                                ? 'border-orange-400/60 bg-orange-500/12 text-foreground dark:text-white'
                                : 'border-border bg-muted/40 text-muted-foreground hover:border-orange-500/40 hover:text-foreground dark:border-white/10 dark:bg-black/10 dark:hover:text-white'
                            }`}
                          >
                            Imprimir para os próximos 3 dias
                          </button>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          Fichas geradas: {generatedFeedingDates.map((date) => new Date(`${date}T00:00:00`).toLocaleDateString('pt-BR')).join(' | ')}
                        </p>
                      </div>
                      <div className="space-y-2">
                        {programmedFeeding.meals.map((meal, index) => (
                          <div key={meal.id} className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 dark:border-white/10 dark:bg-black/10 px-3 py-2">
                            <span className="w-28 text-sm text-foreground dark:text-white">{meal.label}</span>
                            <Input
                              type="time"
                              value={programmedTimes[index] ?? meal.time}
                              onChange={(event) =>
                                setProgrammedTimes((current) => {
                                  const next = [...current]
                                  next[index] = event.target.value
                                  return next
                                })
                              }
                              className="max-w-[160px] border-border bg-muted/50 dark:border-white/10 dark:bg-black/20"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-black/10 p-4">
                      {programmedFeeding.meals.map((meal) => (
                        <div key={meal.id} className="rounded-2xl border border-border bg-muted/50 p-4 dark:border-white/10 dark:bg-[#181212]">
                          <div className="flex items-center justify-between gap-3">
                            <div><p className="font-semibold text-foreground dark:text-white">{meal.label}</p><p className="text-xs text-muted-foreground">{meal.time}</p></div>
                            <p className="text-lg font-black text-orange-300">{meal.totalGrams} g</p>
                          </div>
                          <div className="mt-3 overflow-x-auto">
                            <table className="w-full min-w-[460px] text-sm">
                              <thead>
                                <tr className="text-left text-muted-foreground">
                                  <th className="pb-2 font-medium">Ingrediente</th>
                                  <th className="pb-2 font-medium">Qtd.</th>
                                  <th className="pb-2 font-medium">Comeu?</th>
                                  <th className="pb-2 font-medium">Sobra</th>
                                </tr>
                              </thead>
                              <tbody>
                                {meal.items.map((item) => (
                                  <tr key={`${meal.id}-${item.foodId}`} className="border-t border-border/60 dark:border-white/5">
                                    <td className="py-2 text-foreground dark:text-white">{item.foodName}</td>
                                    <td className="py-2 text-foreground dark:text-white">{item.gramsAsFed} g</td>
                                    <td className="py-2 text-muted-foreground">Sim / Não</td>
                                    <td className="py-2 text-muted-foreground">Pesar sobra</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {patient.isHospitalized && (
              <Card className="border-border bg-muted/25 dark:border-white/10 dark:bg-white/[0.03]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Hospitalização e progressão alimentar</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 md:grid-cols-4">
                  <div className="rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-black/10 p-4"><p className="text-xs text-muted-foreground">Risco</p><p className="mt-1 font-semibold text-foreground dark:text-white">{hospitalRisk === 'high' ? 'Alto risco' : hospitalRisk === 'moderate' ? 'Risco moderado' : 'Baixo risco'}</p></div>
                  <div className="rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-black/10 p-4"><p className="text-xs text-muted-foreground">Via</p><p className="mt-1 font-semibold text-foreground dark:text-white">{hospital.feedingRoute ?? 'Não informada'}</p></div>
                  <div className="rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-black/10 p-4"><p className="text-xs text-muted-foreground">Ingestao recente</p><p className="mt-1 font-semibold text-foreground dark:text-white">{hospital.recentIntakePercent ?? 0}%</p></div>
                  <div className="rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-black/10 p-4"><p className="text-xs text-muted-foreground">Protocolo</p><p className="mt-1 font-semibold text-foreground dark:text-white">{hospital.progressionProtocol === '3_days' ? '3 dias' : '4 dias'}</p></div>
                  {progressionPlan.map((day) => (
                    <div key={day.day} className="rounded-2xl border border-orange-400/20 bg-orange-500/[0.08] p-4">
                      <p className="text-xs text-muted-foreground">Dia {day.day}</p>
                      <p className="mt-1 text-lg font-bold text-orange-300">{day.kcal.toFixed(0)} kcal</p>
                      <p className="text-xs text-muted-foreground">{day.percent}% do RER</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </CardContent>

          <div className="flex items-center justify-between border-t border-border pt-6 dark:border-white/5">
            <Button variant="outline" onClick={() => navigate(`${NEW_ROUTE}/food`)} className="gap-2">
              <ChevronLeft className="h-4 w-4" /> Voltar para formulação
            </Button>
            <Button size="lg" className="gap-2" onClick={handleSave} id="btn-save-plan">
              <Save className="h-5 w-5" /> Salvar no módulo
            </Button>
          </div>
        </Card>
      </div>

      {printableReport && <PrintableReportDocument report={printableReport} className="hidden print:block" />}
    </div>
  )
}
