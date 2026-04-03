import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Download, Printer, Save } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { useCalculationStore } from '../../store/calculationStore'
import { computeDietPlan } from '../../lib/dietEngine'
import { getFoodById, getNutrientDefinition, getRequirementById } from '../../lib/genutriData'
import { saveReport } from '../../lib/persistence'
import { exportReportPdf } from '../../lib/reportDocument'
import { calculateRefeedingRisk, getPhysiologicStateById, getProgressionPlan3Days, getProgressionPlan4Days } from '../../lib/nutrition'
import { getClinicalProfileBadges, getHumanRequirementLabel } from '../../lib/clinicalProfiles'
import { buildProgrammedFeedingPlan } from '../../lib/programmedFeeding'
import PrintableReportDocument from '../../components/PrintableReportDocument'

const NEW_ROUTE = '/calculadora-energetica/new'
const MODULE_ROUTE = '/calculadora-energetica'

function isPercentLikeKey(key: string) {
  return key.endsWith('Pct')
}

function formatDailyAmount(key: string, value: number | null | undefined) {
  if (value == null) return '—'
  const definition = getNutrientDefinition(key)
  if (isPercentLikeKey(key)) {
    return `${value.toFixed(2)} g/dia`
  }
  return `${value.toFixed(2)} ${definition?.unit ?? ''}/dia`.trim()
}

function getBasisLabelForUi(basisType: string) {
  switch (basisType) {
    case 'percent_dm':
      return 'Comparação em matéria seca'
    case 'per_1000kcal':
      return 'Comparação por 1000 kcal'
    case 'per_100kcal':
      return 'Comparação por 100 kcal'
    case 'per_metabolic_bw':
      return 'Comparação por peso metabólico'
    case 'per_kg_bw':
      return 'Comparação por kg de peso'
    case 'energy_percent':
      return 'Comparação pela energia dos macronutrientes'
    default:
      return 'Comparação clínica'
  }
}

function StatusBadge({ status }: { status: 'adequate' | 'below' | 'above' | 'insufficient_data' | 'manual' }) {
  const styles =
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

  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${styles}`}>{label}</span>
}

export default function SummaryStep() {
  const navigate = useNavigate()
  const { patient, energy, target, diet, hospital } = useCalculationStore()
  const [programmedMealsPerDay, setProgrammedMealsPerDay] = useState(diet.programmedFeeding?.mealsPerDay ?? diet.mealsPerDay ?? 2)
  const [programmedTimes, setProgrammedTimes] = useState<string[]>(
    diet.programmedFeeding?.meals.map((meal) => meal.time) ?? [],
  )

  const species = patient.species ?? 'dog'
  const currentWeight = patient.currentWeight ?? 0
  const physiologicStateLabel = getPhysiologicStateById(energy.stateId ?? '')?.label ?? 'Nao informado'
  const comorbidityLabels = useMemo(
    () => getClinicalProfileBadges(species, patient.comorbidityIds ?? []),
    [patient.comorbidityIds, species],
  )

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

  const selectedRequirement = useMemo(() => getRequirementById(diet.requirementProfileId), [diet.requirementProfileId])

  const summaryItems = result
    ? [
        { label: 'Energia entregue', value: `${result.totalKcal.toFixed(1)} kcal/dia` },
        { label: 'Proteína total', value: formatDailyAmount('crudeProteinPct', result.evaluation.totalDelivered.crudeProteinPct) },
        { label: 'Gordura total', value: formatDailyAmount('etherExtractPct', result.evaluation.totalDelivered.etherExtractPct) },
        { label: 'Carboidrato estimado', value: formatDailyAmount('nitrogenFreeExtractPct', result.evaluation.totalDelivered.nitrogenFreeExtractPct) },
        { label: 'Fibra', value: formatDailyAmount('crudeFiberPct', result.evaluation.totalDelivered.crudeFiberPct) },
        { label: 'Cálcio', value: formatDailyAmount('calciumPct', result.evaluation.totalDelivered.calciumPct) },
        { label: 'Fósforo', value: formatDailyAmount('phosphorusPct', result.evaluation.totalDelivered.phosphorusPct) },
      // opcionais: só aparecem se há valor
      ...(result.evaluation.totalDelivered.taurinePct != null ? [{ label: 'Taurina', value: formatDailyAmount('taurinePct', result.evaluation.totalDelivered.taurinePct) }] : []),
      ...(result.evaluation.totalDelivered.omega6Pct != null ? [{ label: 'Ômega-6', value: formatDailyAmount('omega6Pct', result.evaluation.totalDelivered.omega6Pct) }] : []),
      ...(result.evaluation.totalDelivered.moisturePct != null ? [{ label: 'Umidade', value: formatDailyAmount('moisturePct', result.evaluation.totalDelivered.moisturePct) }] : []),
      ...(result.evaluation.totalDelivered.ashPct != null ? [{ label: 'Matéria mineral', value: formatDailyAmount('ashPct', result.evaluation.totalDelivered.ashPct) }] : []),
    ]
    : []

  const calcium = result?.evaluation.totalDelivered.calciumPct ?? null
  const phosphorus = result?.evaluation.totalDelivered.phosphorusPct ?? null
  const caP = calcium && phosphorus ? calcium / phosphorus : null

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

  const programmedFeeding = useMemo(
    () =>
      result
        ? buildProgrammedFeedingPlan({
            contributions: result.contributions,
            mealsPerDay: programmedMealsPerDay,
            times: programmedTimes,
            enabled: true,
          })
        : null,
    [programmedMealsPerDay, programmedTimes, result],
  )

  const printableReport = useMemo(() => {
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

  const adequacyByProfile = useMemo(() => {
    const groups = new Map<string, typeof result.evaluation.adequacy>()
    for (const item of result?.evaluation.adequacy ?? []) {
      if (item.status === 'insufficient_data') continue;
      const profileLabel = getHumanRequirementLabel(getRequirementById(item.profileId))
      const current = groups.get(profileLabel) ?? []
      current.push(item)
      groups.set(profileLabel, current)
    }
    return Array.from(groups.entries())
  }, [result?.evaluation.adequacy])

  const macroChartStyle = useMemo(() => {
    if (!result) {
      return {
        background: 'conic-gradient(#334155 0% 100%)',
      }
    }
    const [protein, fat, carb] = result.evaluation.macroSplit
    const proteinEnd = protein.percent
    const fatEnd = protein.percent + fat.percent
    return {
      background: `conic-gradient(${protein.color} 0% ${proteinEnd}%, ${fat.color} ${proteinEnd}% ${fatEnd}%, ${carb.color} ${fatEnd}% 100%)`,
    }
  }, [result])

  const handleSave = () => {
    if (!printableReport) return
    const report = {
      ...printableReport,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    saveReport(report)
    toast.success('Resumo salvo no histórico do Energia Vet.')
    navigate(MODULE_ROUTE)
  }

  if (!result) {
    return (
      <Card className="w-full shadow-sm">
        <CardContent className="p-6 text-sm text-muted-foreground">
          A formulação ainda não foi concluída. Volte à etapa anterior para selecionar os alimentos.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full pb-20">
      <style>{`
        @media print {
          body, html {
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          @page { size: A4; margin: 12mm 14mm; }
          body * {
            visibility: hidden !important;
          }
          .no-print, .no-print * {
            display: none !important;
          }
          #print-report-root, #print-report-root * {
            visibility: visible !important;
          }
          #print-report-root {
            display: block !important;
            position: absolute;
            inset: 0;
            width: 100%;
          }
          .rx-page-break { break-before: page; }
        }
      `}</style>
      
      <div className="no-print print:hidden space-y-6">
        <Card className="border-border dark:border-orange-400/15 bg-white dark:bg-gradient-to-b from-card via-card to-card/95 shadow-[0_18px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
          <CardHeader className="border-b border-border dark:border-white/5 bg-slate-50 dark:bg-orange-500/[0.04]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle className="text-2xl text-foreground dark:text-white">Resumo do plano nutricional</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">Visão final do paciente, energia, formulação, plano alimentar e adequação nutricional.</p>
              </div>
              <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2" onClick={() => window.print()}>
                <Printer className="h-4 w-4" /> Imprimir / PDF
              </Button>
              <Button size="sm" className="gap-2" onClick={() => printableReport && exportReportPdf(printableReport)}>
                <Download className="h-4 w-4" /> Exportar PDF
              </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <Card className="border-white/10 bg-white/[0.03]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Paciente e energia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">Paciente</p>
                    <p className="mt-1 font-semibold text-white">{patient.name || 'Não informado'}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">Tutor</p>
                    <p className="mt-1 font-semibold text-white">{patient.ownerName || '—'}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">Especie</p>
                    <p className="mt-1 font-semibold text-white">{species === 'dog' ? 'Cão' : 'Gato'}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">Sexo</p>
                    <p className="mt-1 font-semibold text-white">{patient.sex === 'female' ? 'Fêmea' : 'Macho'}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">Peso atual</p>
                    <p className="mt-1 font-semibold text-white">{currentWeight.toFixed(2)} kg</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">Peso usado no calculo</p>
                    <p className="mt-1 font-semibold text-white">{energy.weightUsed != null ? `${energy.weightUsed.toFixed(2)} kg` : '-'}</p>
                  </div>
                  <div className="rounded-2xl border border-orange-400/25 bg-orange-500/[0.08] p-4">
                    <p className="text-xs text-muted-foreground">Energia-alvo final</p>
                    <p className="mt-1 text-2xl font-black text-orange-300">{target.targetEnergy?.toFixed(0) ?? '—'} kcal/dia</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">Perfil energetico final</p>
                    <p className="mt-1 font-semibold text-white">{physiologicStateLabel}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{patient.isNeutered ? 'Castrado' : 'Não castrado'}</Badge>
                  <Badge variant="outline">{patient.isHospitalized ? 'Hospitalizado' : 'Ambulatorial'}</Badge>
                  <Badge variant="outline">ECC {patient.bcs ?? 5}/9</Badge>
                  <Badge variant="outline">{target.goal === 'weight_loss' ? 'Perda de peso' : target.goal === 'weight_gain' ? 'Ganho de peso' : 'Manutenção'}</Badge>
                  <Badge variant="outline">{energy.energyProfileMode === 'clinical' ? 'Modo clínica' : 'Modo FEDIAF'}</Badge>
                </div>

                {!!comorbidityLabels.length && (
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Comorbidades consideradas</p>
                    <div className="flex flex-wrap gap-2">
                      {comorbidityLabels.map((label) => (
                        <Badge key={label} className="rounded-full bg-orange-500/12 text-orange-200">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/[0.03]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Formulação final</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">Materia seca total</p>
                    <p className="mt-1 text-2xl font-black text-orange-300">{result.totalDryMatterGrams.toFixed(1)} g</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">Materia natural total</p>
                    <p className="mt-1 text-2xl font-black text-orange-300">{result.totalAsFedGrams.toFixed(1)} g</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">Refeicoes por dia</p>
                    <p className="mt-1 text-2xl font-black text-white">{diet.mealsPerDay ?? 2}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs text-muted-foreground">Perfil de exigencia principal</p>
                  <p className="mt-1 text-base font-semibold text-white">{getHumanRequirementLabel(selectedRequirement)}</p>
                  {!!comorbidityLabels.length && (
                    <p className="mt-2 text-sm text-muted-foreground">Os perfis clínicos adicionais da planilha foram aplicados na avaliação final.</p>
                  )}
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs text-muted-foreground">Plano alimentar</p>
                  <p className="mt-1 font-semibold text-white">
                    {diet.mealsPerDay ?? 2} refeições por dia · {result.feedingPlan.meals[0]?.gramsAsFed.toFixed(1) ?? '0.0'} g por refeição
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
            <Card className="border-white/10 bg-white/[0.03]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Partição energética</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-4">
                  <div
                    id="summary-macro-chart"
                    className="relative h-56 w-56 rounded-full border border-white/10 shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
                    style={macroChartStyle}
                  >
                    <div className="absolute inset-[24%] rounded-full border border-white/10 bg-[#171212]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Macro</p>
                      <p className="mt-1 text-2xl font-black text-white">{result.totalKcal.toFixed(0)}</p>
                      <p className="text-xs text-muted-foreground">kcal/dia</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {result.evaluation.macroSplit.map((slice) => (
                    <div key={slice.key} className="rounded-2xl border border-white/10 bg-black/10 p-3">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: slice.color }} />
                        <p className="text-sm font-semibold text-white">{slice.label}</p>
                      </div>
                      <p className="mt-2 text-xl font-black text-white">{slice.percent.toFixed(1)}%</p>
                      <p className="text-xs text-muted-foreground">{slice.grams.toFixed(1)} g · {slice.kcal.toFixed(1)} kcal</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/[0.03]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Resumo nutricional</CardTitle>

              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-3">
                {summaryItems.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="mt-1 font-semibold text-white">{item.value}</p>
                  </div>
                ))}
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs text-muted-foreground">Relação Ca:P</p>
                  <p className="mt-1 font-semibold text-white">{caP ? caP.toFixed(2) : '—'}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-white/10 bg-white/[0.03]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Contribuição por alimento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.contributions.map((item) => {
                const food = getFoodById(item.foodId)
                return (
                  <div key={item.foodId} className="grid gap-3 rounded-2xl border border-white/10 bg-black/10 p-4 md:grid-cols-4">
                    <div>
                      <p className="font-semibold text-white">{item.foodName}</p>
                      <p className="text-xs text-muted-foreground">{food?.categoryNormalized ?? 'Sem categoria'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Inclusao na mistura</p>
                      <p className="font-medium text-white">{item.inclusionPct.toFixed(2)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Oferta diaria</p>
                      <p className="font-medium text-white">{item.gramsAsFed.toFixed(2)} g</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Energia entregue</p>
                      <p className="font-medium text-white">{item.deliveredKcal.toFixed(2)} kcal</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.03]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Adequação frente ao perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {adequacyByProfile.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-muted-foreground">
                  Nenhum perfil operacional foi selecionado.
                </div>
              ) : (
                adequacyByProfile.map(([profileLabel, items]) => (
                  <div key={profileLabel} className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{profileLabel}</p>
                        <p className="text-sm text-muted-foreground">Comparacao clinica do plano frente ao perfil selecionado.</p>
                      </div>
                      <Badge variant="outline">{items.length} itens avaliados</Badge>
                    </div>

                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={`${profileLabel}-${item.key}`} className="grid gap-4 rounded-2xl border border-white/10 bg-black/10 p-4 lg:grid-cols-[1.1fr_0.7fr_0.5fr]">
                          <div>
                            <p className="font-semibold text-white">{item.label}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{getBasisLabelForUi(item.basisType)}</p>
                            <p className="mt-2 text-xs text-muted-foreground">{item.reason}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Entregue</p>
                            <p className="mt-1 font-semibold text-white">{item.deliveredValue != null ? item.deliveredValue.toFixed(2) : '—'}</p>
                            <p className="mt-2 text-xs text-muted-foreground">Alvo: {item.target?.raw != null ? String(item.target.raw) : '—'}</p>
                          </div>
                          <div className="flex items-center lg:justify-end">
                            <StatusBadge status={item.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.03]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Plano alimentar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.feedingPlan.meals.map((meal) => (
                <div key={meal.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 p-4">
                  <div>
                    <p className="font-semibold text-white">{meal.label}</p>
                    <p className="text-xs text-muted-foreground">Horario sugerido: {meal.time}</p>
                  </div>
                  <p className="font-bold text-orange-300">{meal.gramsAsFed.toFixed(1)} g</p>
                </div>
              ))}
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4 text-sm text-muted-foreground">
                {result.feedingPlan.instructions.map((instruction) => (
                  <p key={instruction}>{instruction}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          {programmedFeeding && (
            <Card className="border-white/10 bg-white/[0.03]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">6. Alimentação programada</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 xl:grid-cols-[0.75fr_1.25fr]">
                  <div className="space-y-4 rounded-2xl border border-white/10 bg-black/10 p-4">
                    <div>
                      <p className="font-semibold text-white">Configuração diária</p>
                      <p className="text-sm text-muted-foreground">Monte a rotina com horários e quantidades inteiras por refeição.</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Número de alimentações</p>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4, 5, 6].map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setProgrammedMealsPerDay(value)}
                            className={`rounded-xl border px-3 py-3 text-sm transition-all ${programmedMealsPerDay === value ? 'border-orange-400/60 bg-orange-500/12 text-white' : 'border-white/10 bg-black/10 text-muted-foreground hover:border-orange-500/30 hover:text-white'}`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Horários</p>
                      <div className="space-y-2">
                        {programmedFeeding.meals.map((meal, index) => (
                          <div key={meal.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 px-3 py-2">
                            <span className="w-28 text-sm text-white">{meal.label}</span>
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
                              className="max-w-[160px] bg-black/20 border-white/10"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-orange-400/20 bg-orange-500/[0.08] p-4 text-sm text-muted-foreground">
                      {programmedFeeding.roundingRule}
                    </div>
                  </div>

                  <div className="space-y-3 rounded-2xl border border-white/10 bg-black/10 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">Ficha de alimentação</p>
                      <Badge variant="outline">{programmedFeeding.mealsPerDay} alimentações</Badge>
                    </div>
                    {programmedFeeding.meals.map((meal) => (
                      <div key={meal.id} className="rounded-2xl border border-white/10 bg-[#181212] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold text-white">{meal.label}</p>
                            <p className="text-xs text-muted-foreground">{meal.time}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Total</p>
                            <p className="text-lg font-black text-orange-300">{meal.totalGrams} g</p>
                          </div>
                        </div>
                        <div className="mt-3 overflow-x-auto">
                          <table className="w-full min-w-[480px] text-sm">
                            <thead>
                              <tr className="text-left text-muted-foreground">
                                <th className="pb-2 font-medium">Ingrediente</th>
                                <th className="pb-2 font-medium">Quantidade</th>
                                <th className="pb-2 font-medium">Comeu?</th>
                                <th className="pb-2 font-medium">Sobra</th>
                              </tr>
                            </thead>
                            <tbody>
                              {meal.items.map((item) => (
                                <tr key={`${meal.id}-${item.foodId}`} className="border-t border-white/5">
                                  <td className="py-2 text-white">{item.foodName}</td>
                                  <td className="py-2 text-white">{item.gramsAsFed} g</td>
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
            <Card className="border-white/10 bg-white/[0.03]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Hospitalização e progressão alimentar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 md:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">Risco de realimentacao</p>
                    <p className="mt-1 font-semibold text-white">
                      {hospitalRisk === 'high' ? 'Alto risco' : hospitalRisk === 'moderate' ? 'Risco moderado' : 'Baixo risco'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">Via de oferta</p>
                    <p className="mt-1 font-semibold text-white">{hospital.feedingRoute ?? 'Não informada'}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">Ingestão recente</p>
                    <p className="mt-1 font-semibold text-white">{hospital.recentIntakePercent ?? 0}%</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">Protocolo</p>
                    <p className="mt-1 font-semibold text-white">{hospital.progressionProtocol === '3_days' ? '3 dias' : '4 dias'}</p>
                  </div>
                </div>

                {!!progressionPlan.length && (
                  <div className="grid gap-3 md:grid-cols-4">
                    {progressionPlan.map((day) => (
                      <div key={day.day} className="rounded-2xl border border-orange-400/20 bg-orange-500/[0.08] p-4">
                        <p className="text-xs text-muted-foreground">Dia {day.day}</p>
                        <p className="mt-1 text-lg font-bold text-orange-300">{day.kcal.toFixed(0)} kcal</p>
                        <p className="text-xs text-muted-foreground">{day.percent}% do RER</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {!!result.evaluation.alerts.length && (
            <Card className="border-white/10 bg-white/[0.03]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Alertas e lacunas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {result.evaluation.alerts.map((alert) => (
                  <div key={alert} className="rounded-2xl border border-amber-400/20 bg-amber-500/[0.08] p-3 text-amber-100">
                    {alert}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </CardContent>

          <div className="flex items-center justify-between pt-6 border-t border-border dark:border-white/5">
            <Button variant="outline" onClick={() => navigate(`${NEW_ROUTE}/food`)} className="gap-2">
              <ChevronLeft className="h-4 w-4" /> Voltar para formulação
            </Button>
            <Button size="lg" className="gap-2" onClick={handleSave} id="btn-save-plan">
              <Save className="h-5 w-5" /> Salvar no módulo
            </Button>
          </div>
        </Card>
      </div>

      {/* ═══ TEMPLATE DE IMPRESSÃO — só aparece no print, nunca na tela ═══ */}
      <div className="hidden print:block" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '11px', color: '#111', background: '#fff', lineHeight: 1.5 }}>
        <style>{`
          @media print {
            @page { size: A4; margin: 12mm 14mm; }
            body * { visibility: hidden !important; }
            .print\\:block, .print\\:block * { visibility: visible !important; }
            .print\\:block { position: fixed; top: 0; left: 0; width: 100%; }
            .rx-page-break { break-before: page; }
          }
        `}</style>

        {/* ── Cabeçalho ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid #e5630a', paddingBottom: '8px', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#e5630a' }}>NutriçãoVET · Relatório Nutricional</div>
            <div style={{ fontSize: '11px', color: '#555' }}>Emitido em {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '11px', color: '#555' }}>Vetius — Medicina Veterinária</div>
        </div>

        {/* ── 1. Paciente ── */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: '3px', marginBottom: '7px' }}>1. Identificação do Paciente</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px 16px' }}>
            <div><strong>Paciente:</strong> {patient.name || 'Não informado'}</div>
            <div><strong>Tutor:</strong> {patient.ownerName || '—'}</div>
            <div><strong>Espécie:</strong> {species === 'dog' ? 'Cão' : 'Gato'}</div>
            <div><strong>Sexo:</strong> {patient.sex === 'female' ? 'Fêmea' : 'Macho'}</div>
            <div><strong>Peso atual:</strong> {currentWeight.toFixed(2)} kg</div>
            <div><strong>ECC:</strong> {patient.bcs ?? 5}/9</div>
            <div><strong>Castrado:</strong> {patient.isNeutered ? 'Sim' : 'Não'}</div>
            <div><strong>Hospitalizado:</strong> {patient.isHospitalized ? 'Sim' : 'Não'}</div>
            {comorbidityLabels.length > 0 && <div style={{ gridColumn: '1/-1' }}><strong>Comorbidades:</strong> {comorbidityLabels.join(', ')}</div>}
          </div>
        </div>

        {/* ── 2. Energia ── */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: '3px', marginBottom: '7px' }}>2. Cálculo Energético</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px 16px' }}>
            <div><strong>RER:</strong> {energy.rer?.toFixed(0) ?? '—'} kcal/dia</div>
            <div><strong>MER estimado:</strong> {energy.mer?.toFixed(0) ?? '—'} kcal/dia</div>
            <div><strong>Energia-alvo:</strong> <strong style={{ color: '#e5630a' }}>{target.targetEnergy?.toFixed(0) ?? '—'} kcal/dia</strong></div>
            <div><strong>Estado fisiológico:</strong> {physiologicStateLabel}</div>
            <div><strong>Peso usado:</strong> {energy.weightUsed?.toFixed(2) ?? '—'} kg</div>
            {energy.activityHoursPerDay != null && <div><strong>Atividade:</strong> {energy.activityHoursPerDay}h/dia · {energy.activityImpact === 'high' ? 'alto impacto' : 'baixo impacto'}</div>}
            {energy.obesityProne && <div><strong>Predisposto a obesidade:</strong> Sim</div>}
          </div>
        </div>

        {/* ── 3. Meta nutricional ── */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: '3px', marginBottom: '7px' }}>3. Meta Nutricional</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px 16px' }}>
            <div><strong>Objetivo:</strong> {target.goal === 'weight_loss' ? 'Perda de peso' : target.goal === 'weight_gain' ? 'Ganho de peso' : 'Manutenção'}</div>
            {target.targetWeight && <div><strong>Peso-alvo:</strong> {target.targetWeight.toFixed(2)} kg</div>}
          </div>
        </div>

        {/* ── 4. Formulação ── */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: '3px', marginBottom: '7px' }}>4. Formulação Alimentar</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px 16px', marginBottom: '8px' }}>
            <div><strong>Tipo de dieta:</strong> {diet.dietType === 'commercial' ? 'Comercial' : diet.dietType === 'natural' ? '100% Natural' : 'Híbrida'}</div>
            <div><strong>Refeições/dia:</strong> {diet.mealsPerDay ?? 2}</div>
            <div><strong>Oferta/refeição:</strong> {result.feedingPlan.meals[0]?.gramsAsFed.toFixed(1) ?? '0.0'} g</div>
            <div><strong>Total diário (MN):</strong> {result.totalAsFedGrams.toFixed(1)} g/dia</div>
            <div><strong>Total diário (MS):</strong> {result.totalDryMatterGrams.toFixed(1)} g/dia</div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ border: '1px solid #ddd', padding: '4px 8px', textAlign: 'left' }}>Alimento</th>
                <th style={{ border: '1px solid #ddd', padding: '4px 8px', textAlign: 'right' }}>Inclusão (% MS)</th>
                <th style={{ border: '1px solid #ddd', padding: '4px 8px', textAlign: 'right' }}>Oferta diária (g MN)</th>
                <th style={{ border: '1px solid #ddd', padding: '4px 8px', textAlign: 'right' }}>Energia (kcal/dia)</th>
              </tr>
            </thead>
            <tbody>
              {result.contributions.map((item, i) => (
                <tr key={item.foodId} style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ border: '1px solid #ddd', padding: '4px 8px' }}>{item.foodName}</td>
                  <td style={{ border: '1px solid #ddd', padding: '4px 8px', textAlign: 'right' }}>{item.inclusionPct.toFixed(2)}%</td>
                  <td style={{ border: '1px solid #ddd', padding: '4px 8px', textAlign: 'right' }}>{item.gramsAsFed.toFixed(1)} g</td>
                  <td style={{ border: '1px solid #ddd', padding: '4px 8px', textAlign: 'right' }}>{item.deliveredKcal.toFixed(1)} kcal</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── 5. Resumo nutricional ── */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: '3px', marginBottom: '7px' }}>5. Resumo Nutricional</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px 16px' }}>
            {summaryItems.map((item) => (
              <div key={item.label}><strong>{item.label}:</strong> {item.value}</div>
            ))}
            {caP && <div><strong>Relação Ca:P:</strong> {caP.toFixed(2)}</div>}
          </div>
        </div>

        {/* ── 6. Partição energética ── */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: '3px', marginBottom: '7px' }}>6. Partição Energética</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px 16px' }}>
            {result.evaluation.macroSplit.map((slice) => (
              <div key={slice.key}><strong>{slice.label}:</strong> {slice.percent.toFixed(1)}% · {slice.grams.toFixed(1)} g · {slice.kcal.toFixed(1)} kcal</div>
            ))}
          </div>
        </div>

        {/* ── 7. Alertas ── */}
        {result.evaluation.alerts.length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: '3px', marginBottom: '7px' }}>7. Alertas e Observações</div>
            {result.evaluation.alerts.map((alert) => (
              <div key={alert} style={{ padding: '4px 8px', backgroundColor: '#fff9e6', border: '1px solid #f5c030', borderRadius: '4px', marginBottom: '4px' }}>{alert}</div>
            ))}
          </div>
        )}

        {/* ═══ FICHA DE ALIMENTAÇÃO — página própria ═══ */}
        <div className="rx-page-break" style={{ paddingTop: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid #e5630a', paddingBottom: '8px', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#e5630a' }}>FICHA DE ALIMENTAÇÃO</div>
              <div style={{ fontSize: '11px', color: '#555' }}>
                <strong>Animal:</strong> {patient.name || '_______________'} &nbsp;|&nbsp;
                <strong>Tutor:</strong> {patient.ownerName || '_______________'} &nbsp;|&nbsp;
                <strong>Espécie:</strong> {species === 'dog' ? 'Cão' : 'Gato'}
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '11px', color: '#555' }}>
              <div><strong>Peso:</strong> {currentWeight.toFixed(2)} kg</div>
              <div><strong>Energia-alvo:</strong> {target.targetEnergy?.toFixed(0) ?? '—'} kcal/dia</div>
            </div>
          </div>

          {/* Resumo dos alimentos e quantidades */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Alimentos utilizados</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ border: '1px solid #ddd', padding: '4px 8px', textAlign: 'left' }}>Alimento</th>
                  <th style={{ border: '1px solid #ddd', padding: '4px 8px', textAlign: 'right' }}>Oferta diária total</th>
                  <th style={{ border: '1px solid #ddd', padding: '4px 8px', textAlign: 'right' }}>Por refeição ({diet.mealsPerDay ?? 2} ref.)</th>
                </tr>
              </thead>
              <tbody>
                {result.contributions.map((item, i) => (
                  <tr key={item.foodId} style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={{ border: '1px solid #ddd', padding: '4px 8px' }}>{item.foodName}</td>
                    <td style={{ border: '1px solid #ddd', padding: '4px 8px', textAlign: 'right' }}>{item.gramsAsFed.toFixed(1)} g</td>
                    <td style={{ border: '1px solid #ddd', padding: '4px 8px', textAlign: 'right' }}>{((diet.mealsPerDay ?? 2) > 0 ? item.gramsAsFed / (diet.mealsPerDay ?? 2) : 0).toFixed(1)} g</td>
                  </tr>
                ))}
                <tr style={{ backgroundColor: '#e8f4e8', fontWeight: 'bold' }}>
                  <td style={{ border: '1px solid #ddd', padding: '4px 8px' }}>TOTAL</td>
                  <td style={{ border: '1px solid #ddd', padding: '4px 8px', textAlign: 'right' }}>{result.totalAsFedGrams.toFixed(1)} g</td>
                  <td style={{ border: '1px solid #ddd', padding: '4px 8px', textAlign: 'right' }}>{result.feedingPlan.meals[0]?.gramsAsFed.toFixed(1) ?? '0.0'} g</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tabela de registro diário */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>
              Registro diário — {diet.mealsPerDay ?? 2} alimentação(ões)/dia
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ border: '1px solid #ddd', padding: '5px 6px', textAlign: 'left', width: '60px' }}>Data</th>
                  <th style={{ border: '1px solid #ddd', padding: '5px 6px', textAlign: 'left', width: '55px' }}>Horário</th>
                  <th style={{ border: '1px solid #ddd', padding: '5px 6px', textAlign: 'left' }}>Alimento</th>
                  <th style={{ border: '1px solid #ddd', padding: '5px 6px', textAlign: 'right', width: '70px' }}>Qde ofertada</th>
                  <th style={{ border: '1px solid #ddd', padding: '5px 6px', textAlign: 'center', width: '55px' }}>Comeu?</th>
                  <th style={{ border: '1px solid #ddd', padding: '5px 6px', textAlign: 'right', width: '70px' }}>Sobra (g)</th>
                  <th style={{ border: '1px solid #ddd', padding: '5px 6px', textAlign: 'left', width: '80px' }}>Obs.</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.min(7, 3) * (diet.mealsPerDay ?? 2) }).map((_, rowIdx) => {
                  const mealIdx = rowIdx % (diet.mealsPerDay ?? 2)
                  const dayIdx = Math.floor(rowIdx / (diet.mealsPerDay ?? 2))
                  const meal = result.feedingPlan.meals[mealIdx]
                  return (
                    <tr key={rowIdx} style={{ backgroundColor: rowIdx % 2 === 0 ? '#fff' : '#fafafa' }}>
                      <td style={{ border: '1px solid #ddd', padding: '5px 6px' }}>{dayIdx === 0 ? '___/___' : ''}</td>
                      <td style={{ border: '1px solid #ddd', padding: '5px 6px' }}>{meal?.time ?? '——:——'}</td>
                      <td style={{ border: '1px solid #ddd', padding: '5px 6px' }}>
                        {result.contributions.map((c) => `${c.foodName}: ${((diet.mealsPerDay ?? 2) > 0 ? c.gramsAsFed / (diet.mealsPerDay ?? 2) : 0).toFixed(1)}g`).join(' / ')}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '5px 6px', textAlign: 'right' }}>{meal?.gramsAsFed.toFixed(1) ?? '—'} g</td>
                      <td style={{ border: '1px solid #ddd', padding: '5px 6px', textAlign: 'center' }}>Sim / Não</td>
                      <td style={{ border: '1px solid #ddd', padding: '5px 6px' }} />
                      <td style={{ border: '1px solid #ddd', padding: '5px 6px' }} />
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div style={{ marginTop: '4px', fontSize: '10px', color: '#888' }}>
              * Pesar sobra após cada refeição. Anotar apetite e comportamento.
            </div>
          </div>

          {/* Assinaturas */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '20px' }}>
            <div style={{ borderTop: '1px solid #999', paddingTop: '4px', fontSize: '11px', color: '#555' }}>Médico(a) Veterinário(a) responsável</div>
            <div style={{ borderTop: '1px solid #999', paddingTop: '4px', fontSize: '11px', color: '#555' }}>Tutor do animal</div>
          </div>
        </div>
      </div>
    </div>
  )
}
