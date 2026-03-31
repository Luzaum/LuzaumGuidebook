import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Download, Printer, Save } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { useCalculationStore } from '../../store/calculationStore'
import { computeDietPlan } from '../../lib/dietEngine'
import { getFoodById, getNutrientDefinition, getRequirementById } from '../../lib/genutriData'
import { saveReport } from '../../lib/persistence'
import { calculateRefeedingRisk, getProgressionPlan3Days, getProgressionPlan4Days } from '../../lib/nutrition'
import { getClinicalProfileBadges, getHumanRequirementLabel } from '../../lib/clinicalProfiles'

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
      return 'Comparacao em materia seca'
    case 'per_1000kcal':
      return 'Comparacao por 1000 kcal'
    case 'per_100kcal':
      return 'Comparacao por 100 kcal'
    case 'per_metabolic_bw':
      return 'Comparacao por peso metabolico'
    case 'per_kg_bw':
      return 'Comparacao por kg de peso'
    case 'energy_percent':
      return 'Comparacao pela energia dos macronutrientes'
    default:
      return 'Comparacao clinica'
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
      ? 'Revisao manual'
      : 'Dados insuficientes'

  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${styles}`}>{label}</span>
}

export default function SummaryStep() {
  const navigate = useNavigate()
  const { patient, energy, target, diet, hospital } = useCalculationStore()

  const species = patient.species ?? 'dog'
  const currentWeight = patient.currentWeight ?? 0
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
        { label: 'Proteina total', value: formatDailyAmount('crudeProteinPct', result.evaluation.totalDelivered.crudeProteinPct) },
        { label: 'Gordura total', value: formatDailyAmount('etherExtractPct', result.evaluation.totalDelivered.etherExtractPct) },
        { label: 'Carboidrato estimado', value: formatDailyAmount('nitrogenFreeExtractPct', result.evaluation.totalDelivered.nitrogenFreeExtractPct) },
        { label: 'Fibra', value: formatDailyAmount('crudeFiberPct', result.evaluation.totalDelivered.crudeFiberPct) },
        { label: 'Calcio', value: formatDailyAmount('calciumPct', result.evaluation.totalDelivered.calciumPct) },
        { label: 'Fosforo', value: formatDailyAmount('phosphorusPct', result.evaluation.totalDelivered.phosphorusPct) },
        { label: 'Taurina', value: formatDailyAmount('taurinePct', result.evaluation.totalDelivered.taurinePct) },
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
    const [protein, fat, carb] = result.evaluation.macroSplit
    const proteinEnd = protein.percent
    const fatEnd = protein.percent + fat.percent
    return {
      background: `conic-gradient(${protein.color} 0% ${proteinEnd}%, ${fat.color} ${proteinEnd}% ${fatEnd}%, ${carb.color} ${fatEnd}% 100%)`,
    }
  }, [result.evaluation.macroSplit])

  const handleSave = () => {
    if (!result) return
    const report = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      patient,
      energy,
      target,
      diet: {
        ...diet,
        entries: result.normalizedEntries,
        totalDryMatterGrams: result.totalDryMatterGrams,
        totalAsFedGrams: result.totalAsFedGrams,
        gramsPerDay: result.totalAsFedGrams,
        gramsPerMeal: result.feedingPlan.meals[0]?.gramsAsFed ?? 0,
        targetEnergy: target.targetEnergy ?? 0,
        mealsPerDay: diet.mealsPerDay ?? 2,
        dietType: diet.dietType ?? 'commercial',
      },
      formula: {
        contributions: result.contributions,
        evaluation: result.evaluation,
        feedingPlan: result.feedingPlan,
      },
    }
    saveReport(report)
    toast.success('Resumo salvo no historico do Energia Vet.')
    navigate(MODULE_ROUTE)
  }

  if (!result) {
    return (
      <Card className="w-full shadow-sm">
        <CardContent className="p-6 text-sm text-muted-foreground">
          A formulacao ainda nao foi concluida. Volte a etapa anterior para selecionar os alimentos.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full pb-20">
      <style>{`
        @media print {
          .no-print, button, nav, header, aside, .sidebar-vetius {
            display: none !important;
          }
          body {
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          @page {
            margin: 1.5cm;
          }
        }
      `}</style>
      
      <div className="no-print space-y-6">
        <Card className="border-border dark:border-orange-400/15 bg-white dark:bg-gradient-to-b from-card via-card to-card/95 shadow-[0_18px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
          <CardHeader className="border-b border-border dark:border-white/5 bg-slate-50 dark:bg-orange-500/[0.04]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle className="text-2xl text-foreground dark:text-white">Resumo do plano nutricional</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">Visao final do paciente, energia, formulacao, plano alimentar e adequacao nutricional.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => window.print()}>
                  <Printer className="h-4 w-4" /> Imprimir / PDF
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
                    <p className="mt-1 font-semibold text-white">{patient.name || 'Nao informado'}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">Tutor</p>
                    <p className="mt-1 font-semibold text-white">{patient.ownerName || '—'}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">Especie</p>
                    <p className="mt-1 font-semibold text-white">{species === 'dog' ? 'Cao' : 'Gato'}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">Sexo</p>
                    <p className="mt-1 font-semibold text-white">{patient.sex === 'female' ? 'Femea' : 'Macho'}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">Peso atual</p>
                    <p className="mt-1 font-semibold text-white">{currentWeight.toFixed(2)} kg</p>
                  </div>
                  <div className="rounded-2xl border border-orange-400/25 bg-orange-500/[0.08] p-4">
                    <p className="text-xs text-muted-foreground">Energia-alvo final</p>
                    <p className="mt-1 text-2xl font-black text-orange-300">{target.targetEnergy?.toFixed(0) ?? '—'} kcal/dia</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{patient.isNeutered ? 'Castrado' : 'Nao castrado'}</Badge>
                  <Badge variant="outline">{patient.isHospitalized ? 'Hospitalizado' : 'Ambulatorial'}</Badge>
                  <Badge variant="outline">ECC {patient.bcs ?? 5}/9</Badge>
                  <Badge variant="outline">{target.goal === 'weight_loss' ? 'Perda de peso' : target.goal === 'weight_gain' ? 'Ganho de peso' : 'Manutencao'}</Badge>
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
                <CardTitle className="text-lg">Formulacao final</CardTitle>
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
                    <p className="mt-2 text-sm text-muted-foreground">Os perfis clinicos adicionais da planilha foram aplicados na avaliacao final.</p>
                  )}
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs text-muted-foreground">Plano alimentar</p>
                  <p className="mt-1 font-semibold text-white">
                    {diet.mealsPerDay ?? 2} refeicoes por dia · {result.feedingPlan.meals[0]?.gramsAsFed.toFixed(1) ?? '0.0'} g por refeicao
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
            <Card className="border-white/10 bg-white/[0.03]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Particao energetica</CardTitle>
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
                  <p className="text-xs text-muted-foreground">Relacao Ca:P</p>
                  <p className="mt-1 font-semibold text-white">{caP ? caP.toFixed(2) : '—'}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-white/10 bg-white/[0.03]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Contribuicao por alimento</CardTitle>
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
              <CardTitle className="text-lg">Adequacao frente ao perfil</CardTitle>
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

          {patient.isHospitalized && (
            <Card className="border-white/10 bg-white/[0.03]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Hospitalizacao e progressao alimentar</CardTitle>
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
                    <p className="mt-1 font-semibold text-white">{hospital.feedingRoute ?? 'Nao informada'}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">Ingestao recente</p>
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
              <ChevronLeft className="h-4 w-4" /> Voltar para formulacao
            </Button>
            <Button size="lg" className="gap-2" onClick={handleSave} id="btn-save-plan">
              <Save className="h-5 w-5" /> Salvar no modulo
            </Button>
          </div>
        </Card>
      </div>

      <div className="hidden print:block text-black bg-white">
        <div className="border-b border-gray-300 pb-4 mb-6">
          <h1 className="text-3xl font-bold">Relatório Nutricional Vetius</h1>
          <p className="text-gray-500">Gerado em {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
        
        <div className="space-y-6 text-sm">
          <section>
            <h2 className="text-xl font-bold mb-3 border-b border-gray-200 pb-2">1. Dados do Paciente</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><strong>Paciente:</strong> {patient.name || 'Não informado'}</div>
              <div><strong>Tutor:</strong> {patient.ownerName || '—'}</div>
              <div><strong>Espécie:</strong> {species === 'dog' ? 'Cão' : 'Gato'}</div>
              <div><strong>Sexo:</strong> {patient.sex === 'female' ? 'Fêmea' : 'Macho'}</div>
              <div><strong>Peso Atual:</strong> {currentWeight.toFixed(2)} kg</div>
              <div><strong>Energia Final Estimada:</strong> {target.targetEnergy?.toFixed(0) ?? '—'} kcal/dia</div>
              <div><strong>Castrado:</strong> {patient.isNeutered ? 'Sim' : 'Não'}</div>
              <div><strong>Condição Corporal (ECC):</strong> {patient.bcs ?? 5}/9</div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 border-b border-gray-200 pb-2">2. Formulação e Plano Alimentar</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><strong>Matéria Seca Total (G/Dia):</strong> {result.totalDryMatterGrams.toFixed(1)} g</div>
              <div><strong>Matéria Natural Total (G/Dia):</strong> {result.totalAsFedGrams.toFixed(1)} g</div>
              <div><strong>Refeições por dia:</strong> {diet.mealsPerDay ?? 2}</div>
              <div><strong>Oferta por refeição:</strong> {result.feedingPlan.meals[0]?.gramsAsFed.toFixed(1) ?? '0.0'} g</div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Composição da Mistura:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {result.contributions.map((item) => (
                  <li key={item.foodId}>
                    {item.foodName}: <strong>{item.gramsAsFed.toFixed(1)} g/dia</strong> ({item.inclusionPct.toFixed(1)}% MS)
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 border-b border-gray-200 pb-2">3. Análise Nutricional</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {summaryItems.map(item => (
                <div key={item.label}><strong>{item.label}:</strong> {item.value}</div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
