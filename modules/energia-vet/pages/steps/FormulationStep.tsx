import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Equal, PieChart, RotateCcw } from 'lucide-react'
import { NutrientGapSection } from '../../components/NutrientGapSection'
import { DietTransitionSection, isDietTransitionValid } from '../../components/DietTransitionSection'
import { HydrationPlanSection, isHydrationPlanValid } from '../../components/HydrationPlanSection'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { LocalizedNumberInput } from '../../components/ui/localized-number-input'
import { EnergyPartitionChart } from '../../components/EnergyPartitionChart'
import { computeDietPlan } from '../../lib/dietEngine'
import {
  completeRemainingEqually,
  equalEntries,
  roundMealGrams,
} from '../../lib/formulationHelpers'
import { getFoodById, getFoodDisplayName } from '../../lib/genutriData'
import { splitMealPortion } from '../../lib/nutrition-calculations'
import { isCalculationEngineV3Enabled } from '../../lib/nutritionCalculationBridge'
import { useCalculationStore } from '../../store/calculationStore'
import type { DietFormulaEntry } from '../../types'
import type { DietTransitionConfig, HydrationPlanConfig } from '../../lib/clinicalSnapshotTypes'
import { cn } from '../../lib/utils'

const NEW_ROUTE = '/calculadora-energetica/new'

function hospitalHasFlag(ids: string[] | undefined, needles: string[]): boolean {
  if (!ids?.length) return false
  return ids.some((id) => needles.some((needle) => id.toLowerCase().includes(needle)))
}

export default function FormulationStep() {
  const navigate = useNavigate()
  const { patient, energy, target, diet, setDiet } = useCalculationStore()
  const [entries, setEntries] = useState<DietFormulaEntry[]>(diet.entries ?? [])
  const [lockedFoodIds, setLockedFoodIds] = useState<Set<string>>(() => new Set())
  const [dietTransition, setDietTransition] = useState<DietTransitionConfig>(
    diet.dietTransition ?? { enabled: false, durationDays: 7, planMode: 'standard' },
  )
  const [hydrationPlan, setHydrationPlan] = useState<HydrationPlanConfig>(
    diet.hydrationPlan ?? { selectedMethod: 'energy_based', voluntarilyConsumedWaterKnown: false },
  )
  const targetEnergy = target.targetEnergy ?? diet.targetEnergy ?? 0
  const mealsPerDay = Math.max(1, diet.mealsPerDay ?? 2)
  const v3Enabled = isCalculationEngineV3Enabled()

  const result = useMemo(
    () =>
      computeDietPlan({
        entries,
        targetEnergy,
        species: patient.species ?? 'dog',
        weightKg: target.targetWeight ?? patient.currentWeight ?? 0,
        mealsPerDay,
        patientName: patient.name || 'Paciente',
        requirementProfileId: diet.requirementProfileId,
        additionalRequirementProfileIds: diet.additionalRequirementProfileIds,
      }),
    [
      diet.additionalRequirementProfileIds,
      diet.requirementProfileId,
      entries,
      mealsPerDay,
      patient.currentWeight,
      patient.name,
      patient.species,
      target.targetEnergy,
      target.targetWeight,
      targetEnergy,
    ],
  )

  const totalPercent = entries.reduce((sum, entry) => sum + (entry.inclusionPct || 0), 0)
  const proportionsValid = entries.length === 0 || Math.abs(totalPercent - 100) < 0.05
  const valid = entries.length > 0 && totalPercent > 0 && (!v3Enabled || proportionsValid)
  const transitionValid = !v3Enabled || isDietTransitionValid(dietTransition, patient.isHospitalized)
  const hydrationValid = !v3Enabled || isHydrationPlanValid(hydrationPlan)
  const canAdvance = valid && transitionValid && hydrationValid

  const primaryContribution = result.contributions[0]
  const newKcalPerGram =
    primaryContribution && primaryContribution.gramsAsFed > 0
      ? primaryContribution.deliveredKcal / primaryContribution.gramsAsFed
      : 0
  const averageMoisturePct =
    result.contributions.length > 0
      ? result.contributions.reduce((sum, item) => sum + (item.moisturePct ?? 10), 0) / result.contributions.length
      : 10
  const macroProtein = result.evaluation.macroSplit.find((m) => m.key === 'protein')?.grams ?? 0
  const macroFat = result.evaluation.macroSplit.find((m) => m.key === 'fat')?.grams ?? 0
  const macroCarb = result.evaluation.macroSplit.find((m) => m.key === 'carb')?.grams ?? 0
  const hydrationFlags = {
    vomiting: hospitalHasFlag(patient.comorbidityIds, ['vomiting', 'vomito']),
    diarrhea: hospitalHasFlag(patient.comorbidityIds, ['diarrhea', 'diarreia']),
    renalDisease: hospitalHasFlag(patient.comorbidityIds, ['renal', 'ckd', 'insuficiencia-renal']),
    urinaryDisease: hospitalHasFlag(patient.comorbidityIds, ['urinary', 'urinaria']),
    lactation: energy.stateId === 'lactation',
    dryFoodOnly: diet.dietType === 'commercial',
    enteralTube: patient.isHospitalized && diet.entries?.length > 0,
  }
  const gramsPerMealTotal = v3Enabled
    ? splitMealPortion(result.totalAsFedGrams, mealsPerDay).practicalValue
    : roundMealGrams(result.totalAsFedGrams / mealsPerDay)
  const belowRows = result.evaluation.adequacy.filter(
    (row) => row.deliveredValue != null && row.target != null && row.status === 'below',
  )

  const updateEntry = (foodId: string, inclusionPct: number) => {
    setLockedFoodIds((current) => new Set(current).add(foodId))
    setEntries((current) =>
      current.map((entry) =>
        entry.foodId === foodId ? { ...entry, inclusionPct: Math.max(0, inclusionPct) } : entry,
      ),
    )
  }

  const handleEqualSplit = () => {
    setLockedFoodIds(new Set())
    setEntries(equalEntries(entries))
  }

  const handleCompleteRemaining = () => {
    const next = completeRemainingEqually(entries, lockedFoodIds)
    if (next) setEntries(next)
  }

  const handleRestore = () => {
    setLockedFoodIds(new Set())
    setEntries(diet.entries ?? [])
  }

  const handleNext = () => {
    if (v3Enabled && !proportionsValid) return
    setDiet({
      entries: v3Enabled ? entries.filter((entry) => entry.inclusionPct > 0) : result.normalizedEntries,
      targetEnergy,
      totalDryMatterGrams: result.totalDryMatterGrams,
      totalAsFedGrams: result.totalAsFedGrams,
      gramsPerMeal: gramsPerMealTotal,
      dietTransition: v3Enabled ? dietTransition : undefined,
      hydrationPlan: v3Enabled ? hydrationPlan : undefined,
    })
    navigate(`${NEW_ROUTE}/summary`)
  }

  const lockedSum = entries
    .filter((entry) => lockedFoodIds.has(entry.foodId))
    .reduce((sum, entry) => sum + (entry.inclusionPct || 0), 0)
  const unlockedCount = entries.filter((entry) => !lockedFoodIds.has(entry.foodId)).length
  const canCompleteRemaining = entries.length > 1 && unlockedCount > 0

  const mealGramsForFood = (gramsAsFed: number) =>
    v3Enabled
      ? splitMealPortion(gramsAsFed, mealsPerDay).practicalValue
      : roundMealGrams(gramsAsFed / mealsPerDay)

  return (
    <Card className="nutrition-step-card w-full">
      <CardHeader className="border-b border-border/60 pb-6">
        <CardTitle className="text-2xl">Formulação da dieta</CardTitle>
        <CardDescription>
          {v3Enabled
            ? 'Defina a participação calórica de cada alimento. A soma deve fechar 100% antes de avançar.'
            : 'Defina a participação dos alimentos. Alimentos editados manualmente permanecem fixos ao usar "Completar o restante".'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-7 pt-6">
        {result.evaluation.alerts.length > 0 && (
          <div className="space-y-2">
            {result.evaluation.alerts.map((alert) => (
              <p
                key={alert}
                className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs leading-5 text-amber-900 dark:text-amber-200"
              >
                {alert}
              </p>
            ))}
          </div>
        )}

        <section className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-border p-4">
            <p className="text-xs text-muted-foreground">Energia-alvo</p>
            <p className="mt-1 text-xl font-bold">{targetEnergy.toFixed(0)} kcal/dia</p>
          </div>
          <div className="rounded-2xl border border-border p-4">
            <p className="text-xs text-muted-foreground">Matéria seca</p>
            <p className="mt-1 text-xl font-bold">{result.totalDryMatterGrams.toFixed(1)} g/dia</p>
          </div>
          <div className="rounded-2xl border border-border p-4">
            <p className="text-xs text-muted-foreground">Matéria natural</p>
            <p className="mt-1 text-xl font-bold">{result.totalAsFedGrams.toFixed(1)} g/dia</p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/[0.06] p-4">
            <p className="text-xs text-muted-foreground">Por refeição</p>
            <p className="mt-1 text-xl font-bold text-primary">{gramsPerMealTotal} g</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {mealsPerDay} refeições · {v3Enabled ? 'arredondamento prático' : 'arredondado'}
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-border">
          <div className="flex flex-col gap-3 border-b border-border bg-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold">{v3Enabled ? 'Alocação calórica' : 'Participação dos alimentos'}</h2>
              <p className="text-sm text-muted-foreground">
                {v3Enabled
                  ? 'Cada % representa a fração da meta calórica diária. Edite manualmente ou use os atalhos abaixo.'
                  : 'Edite as % manualmente; ao completar o restante, os demais são reduzidos ou repartidos para fechar 100%.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleEqualSplit} className="gap-2">
                <Equal className="h-4 w-4" /> Dividir igualmente
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCompleteRemaining}
                disabled={!canCompleteRemaining}
                className="gap-2"
                title={
                  lockedFoodIds.size
                    ? 'Mantém os travados e reparte ou reduz os demais para fechar 100%'
                    : 'Reparte 100% igualmente entre todos os alimentos'
                }
              >
                <PieChart className="h-4 w-4" /> Completar o restante
              </Button>
              <Button variant="outline" size="sm" onClick={handleRestore} className="gap-2">
                <RotateCcw className="h-4 w-4" /> Restaurar
              </Button>
            </div>
          </div>
          <div className="divide-y divide-border">
            {entries.map((entry) => {
              const food = getFoodById(entry.foodId)
              if (!food) return null
              const isLocked = lockedFoodIds.has(entry.foodId)
              return (
                <div key={entry.foodId} className="grid gap-3 p-4 sm:grid-cols-[1fr_150px] sm:items-center">
                  <div>
                    <p className="font-semibold">
                      {getFoodDisplayName(food.name, { id: food.id, foodType: food.foodType })}
                      {isLocked && (
                        <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary">
                          Travado
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {food.nutrientsAsFed.energyKcalPer100g?.toFixed(0) ?? '—'} kcal/100g · {food.presentation}
                    </p>
                  </div>
                  <div className="relative">
                    <LocalizedNumberInput
                      aria-label={`Participação de ${getFoodDisplayName(food.name, { id: food.id, foodType: food.foodType })}`}
                      min={0}
                      max={100}
                      value={Number(entry.inclusionPct.toFixed(2))}
                      onValueChange={(value) => updateEntry(entry.foodId, value ?? 0)}
                      className="pr-9 text-right font-semibold"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex flex-col gap-1 border-t border-border bg-muted/30 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
            <span>{v3Enabled ? 'Total calórico informado' : 'Total informado'}</span>
            <div className="flex items-center gap-3">
              {lockedFoodIds.size > 0 && (
                <span className="text-xs text-muted-foreground">Travados: {lockedSum.toFixed(1)}%</span>
              )}
              <strong
                className={cn(
                  Math.abs(totalPercent - 100) < 0.1 ? 'text-emerald-600' : v3Enabled ? 'text-destructive' : 'text-amber-600',
                )}
              >
                {totalPercent.toFixed(1)}%
              </strong>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl border border-border p-5">
            <EnergyPartitionChart
              macroSplit={result.evaluation.macroSplit}
              totalKcal={result.evaluation.macroSplit.reduce((sum, item) => sum + item.kcal, 0)}
            />
          </div>
          <div className="overflow-hidden rounded-3xl border border-border">
            <div className="border-b border-border bg-muted/40 p-4">
              <h2 className="font-semibold">Formulação calculada</h2>
              <p className="text-sm text-muted-foreground">
                Valores diários por alimento{v3Enabled ? ', com alocação calórica explícita' : ''} e gramas por refeição.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="p-4">Alimento</th>
                    <th className="p-4 text-right">{v3Enabled ? '% energia' : '% fórmula'}</th>
                    <th className="p-4 text-right">MN/dia</th>
                    <th className="p-4 text-right">MN/refeição</th>
                    <th className="p-4 text-right">Energia</th>
                  </tr>
                </thead>
                <tbody>
                  {result.contributions.map((item) => (
                    <tr key={item.foodId} className="border-b border-border last:border-0">
                      <td className="p-4 font-medium">{item.foodName}</td>
                      <td className="p-4 text-right">{item.inclusionPct.toFixed(1)}%</td>
                      <td className="p-4 text-right">{item.gramsAsFed.toFixed(1)} g</td>
                      <td className="p-4 text-right font-medium">{mealGramsForFood(item.gramsAsFed)} g</td>
                      <td className="p-4 text-right">{item.deliveredKcal.toFixed(0)} kcal</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <NutrientGapSection belowRows={belowRows} contributions={result.contributions} />

        {v3Enabled && primaryContribution && (
          <>
            <DietTransitionSection
              config={dietTransition}
              targetKcalDay={targetEnergy}
              newDietName={primaryContribution.foodName}
              newKcalPerGram={newKcalPerGram}
              newGramsPerDay={primaryContribution.gramsAsFed}
              isHospitalized={patient.isHospitalized}
              onChange={setDietTransition}
            />
            <HydrationPlanSection
              config={hydrationPlan}
              species={patient.species ?? 'dog'}
              prescribedKcalDay={targetEnergy}
              rerKcalDay={energy.rer ?? targetEnergy / 1.4}
              totalFoodGrams={result.totalAsFedGrams}
              averageMoisturePct={averageMoisturePct}
              proteinGrams={macroProtein}
              fatGrams={macroFat}
              carbGrams={macroCarb}
              clinicalFlags={hydrationFlags}
              onChange={setHydrationPlan}
            />
          </>
        )}

        <div className="flex justify-between border-t border-border/60 pt-4">
          <Button variant="outline" onClick={() => navigate(`${NEW_ROUTE}/food`)} className="gap-2">
            <ChevronLeft className="h-4 w-4" /> Anterior
          </Button>
          <Button onClick={handleNext} disabled={!canAdvance} className="gap-2">
            Próximo: Resumo <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
