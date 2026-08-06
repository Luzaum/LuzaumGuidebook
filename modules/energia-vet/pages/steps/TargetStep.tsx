import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowDownRight, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Target } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { useCalculationStore } from '../../store/calculationStore'
import { getBCSDescription } from '../../lib/nutrition'
import {
  computeBodyTargetPlan,
  isCalculationEngineV3Enabled,
} from '../../lib/nutritionCalculationBridge'
import { idealWeightMethodLabel } from '../../lib/nutrition-calculations/bodyComposition'
import { estimateWeeksToTarget } from '../../lib/nutrition-calculations/bodyComposition'
import { muscleConditionLabel } from '../../pdf-v5/clinicalLabels'
import type { BCS, TargetGoal, WeightLossEnergyMethod } from '../../types'
import { cn } from '../../lib/utils'

const NEW_ROUTE = '/calculadora-energetica/new'
const ECC_IMAGE_BY_SPECIES = { dog: '/ecc-cao-2025.jpg', cat: '/ecc-gato-2025.jpg' }

function goalFromBcs(bcs: BCS): TargetGoal {
  if (bcs <= 4) return 'weight_gain'
  if (bcs >= 6) return 'weight_loss'
  return 'maintenance'
}

const GOAL_COPY: Record<TargetGoal, { label: string; description: string; icon: typeof Target }> = {
  maintenance: { label: 'Manutenção', description: 'ECC compatível com manutenção do peso atual.', icon: Target },
  weight_loss: { label: 'Redução de peso', description: 'O escore indica excesso de condição corporal.', icon: ArrowDownRight },
  weight_gain: { label: 'Recuperação de peso', description: 'O escore indica condição corporal abaixo do ideal.', icon: ArrowUpRight },
}

function reassessmentDateIso(): string {
  const d = new Date()
  d.setDate(d.getDate() + 21)
  return d.toLocaleDateString('pt-BR')
}

export default function TargetStep() {
  const navigate = useNavigate()
  const { patient, energy, target, setPatient, setTarget, setDiet } = useCalculationStore()
  const species = patient.species ?? 'dog'
  const currentWeight = patient.currentWeight ?? 0
  const [bcs, setBcs] = useState<BCS>((patient.bcs ?? 5) as BCS)
  const [keepCurrentWeight, setKeepCurrentWeight] = useState(target.goal === 'maintenance' && bcs !== 5)
  const [weightLossMethod, setWeightLossMethod] = useState<WeightLossEnergyMethod>(
    target.weightLossEnergyMethod ?? 'aaha2021',
  )
  const automaticGoal = goalFromBcs(bcs)
  const goal: TargetGoal = keepCurrentWeight ? 'maintenance' : automaticGoal
  const goalCopy = GOAL_COPY[goal]
  const GoalIcon = goalCopy.icon
  const bcsInfo = getBCSDescription(bcs)
  const v3Enabled = isCalculationEngineV3Enabled()

  useEffect(() => setKeepCurrentWeight(false), [bcs])

  const v3Plan = useMemo(
    () =>
      v3Enabled && currentWeight > 0
        ? computeBodyTargetPlan({
            patient,
            energy,
            goal,
            energyStepMerKcal: energy.mer,
            weightLossEnergyMethod: weightLossMethod,
          })
        : null,
    [currentWeight, energy, goal, patient, v3Enabled, weightLossMethod],
  )

  if (!v3Enabled) {
    return (
      <Card className="nutrition-step-card w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Meta corporal</CardTitle>
          <CardDescription>
            Novos planos nutricionais requerem o motor de cálculo clínico atualizado. Contacte o suporte técnico interno
            para rollback temporário.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (!v3Plan) {
    return (
      <Card className="nutrition-step-card w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Meta corporal</CardTitle>
          <CardDescription>Informe o peso atual do paciente na etapa anterior.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const targetWeight = v3Plan.targetWeightKg
  const targetEnergy = v3Plan.targetEnergyKcal
  const maintenanceEnergy = v3Plan.maintenanceEnergyKcal
  const weightDiffKg = targetWeight - currentWeight
  const weightDiffPct = currentWeight > 0 ? (weightDiffKg / currentWeight) * 100 : 0
  const energyDiffPct = maintenanceEnergy > 0 ? ((targetEnergy - maintenanceEnergy) / maintenanceEnergy) * 100 : 0
  const ideal = v3Plan.idealWeightEstimate
  const weeklyLoss = v3Plan.weeklyLossTargetPct
  const weeksPreview =
    goal === 'weight_loss' && weeklyLoss
      ? estimateWeeksToTarget({
          currentWeightKg: currentWeight,
          targetWeightKg: targetWeight,
          weeklyTargetLossPercent: weeklyLoss.preferredMax,
        })
      : null

  const handleNext = () => {
    setPatient({ bcs })
    setTarget({
      goal,
      currentWeight,
      targetWeight,
      isCustomClinicalRule: false,
      isManualTarget: false,
      weightToUseForEnergy: goal === 'maintenance' ? 'current' : 'target',
      targetEnergy,
      weightLossEnergyMethod: goal === 'weight_loss' ? weightLossMethod : undefined,
      targetWeightMethodLabel: idealWeightMethodLabel(ideal.method),
      percentOverweightEstimate: ideal.percentOverweight,
    })
    setDiet({ targetEnergy })
    navigate(`${NEW_ROUTE}/food`)
  }

  return (
    <Card className="nutrition-step-card w-full">
      <CardHeader className="border-b border-border/60 pb-4">
        <CardTitle className="text-2xl">Meta corporal</CardTitle>
        <CardDescription>
          Selecione o ECC. O objetivo e a energia-alvo seguem as diretrizes AAHA 2021 para emagrecimento ambulatorial.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 pt-4">
        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-2xl border border-border bg-muted/25 p-2">
            <img
              src={ECC_IMAGE_BY_SPECIES[species]}
              alt={`Escore de condição corporal ${species === 'dog' ? 'canino' : 'felino'} em escala de 1 a 9`}
              className="max-h-[420px] w-full rounded-xl object-contain"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold">Escore de condição corporal (ECC)</h2>
              <p className="text-xs text-muted-foreground">Toque no valor observado no exame físico.</p>
            </div>
            <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5 xl:grid-cols-3" role="radiogroup" aria-label="Escore de condição corporal">
              {([1, 2, 3, 4, 5, 6, 7, 8, 9] as BCS[]).map((score) => (
                <button
                  key={score}
                  type="button"
                  role="radio"
                  aria-checked={bcs === score}
                  onClick={() => setBcs(score)}
                  className={cn(
                    'flex min-h-14 cursor-pointer flex-col items-center justify-center rounded-xl border outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring',
                    bcs === score ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card hover:border-primary/40',
                  )}
                >
                  <span className="text-xl font-black">{score}</span>
                  <span className="text-[10px] text-muted-foreground">/9</span>
                </button>
              ))}
            </div>
            <div className="rounded-xl border border-border bg-muted/35 p-3">
              <p className="text-sm font-semibold">{bcsInfo.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{bcsInfo.detail}</p>
            </div>
            {automaticGoal !== 'maintenance' && (
              <label className="flex cursor-pointer items-start gap-2 rounded-xl border border-border p-3 text-sm">
                <input
                  type="checkbox"
                  checked={keepCurrentWeight}
                  onChange={(event) => setKeepCurrentWeight(event.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-primary"
                />
                <span>
                  <span className="font-semibold">Manutenção monitorada</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    Use quando a decisão clínica for manutenção apesar do ECC (prevenção de progressão, sem dieta
                    restritiva automática).
                  </span>
                </span>
              </label>
            )}
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-primary/20">
          <div className="flex flex-col gap-2 bg-primary/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <GoalIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">Objetivo</p>
                <p className="text-lg font-bold">{goalCopy.label}</p>
              </div>
            </div>
            <p className="max-w-md text-xs text-muted-foreground">{goalCopy.description}</p>
          </div>
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-card p-3">
              <p className="text-[10px] text-muted-foreground">Peso atual</p>
              <p className="mt-0.5 text-lg font-bold">{currentWeight.toFixed(2)} kg</p>
            </div>
            <div className="bg-card p-3">
              <p className="text-[10px] text-muted-foreground">ECC / EMC</p>
              <p className="mt-0.5 text-lg font-bold">
                {bcs}/9 · {muscleConditionLabel(patient.muscleCondition ?? 'normal')}
              </p>
            </div>
            <div className="bg-card p-3">
              <p className="text-[10px] text-muted-foreground">Peso-alvo</p>
              <p className="mt-0.5 text-lg font-bold">{targetWeight.toFixed(2)} kg</p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                Método: {idealWeightMethodLabel(ideal.method)}
              </p>
              {ideal.percentOverweight != null && (
                <p className="text-[10px] text-muted-foreground">Excesso estimado: {ideal.percentOverweight.toFixed(0)}%</p>
              )}
            </div>
            <div className="bg-card p-3">
              <p className="text-[10px] text-muted-foreground">Meta energética inicial</p>
              <p className="mt-0.5 text-lg font-bold text-primary">{targetEnergy.toFixed(0)} kcal/dia</p>
              {v3Plan.targetResult.estimatedRangeKcalDay && goal === 'weight_loss' && (
                <p className="mt-1 text-[10px] text-muted-foreground">
                  Faixa: {v3Plan.targetResult.estimatedRangeKcalDay.minimum.toFixed(0)}–
                  {v3Plan.targetResult.estimatedRangeKcalDay.maximum.toFixed(0)} kcal/dia
                </p>
              )}
            </div>
          </div>
        </section>

        {goal === 'weight_loss' && v3Plan.weightLossEnergyOptions?.observedKcal != null && (
          <section className="rounded-xl border border-border p-4 space-y-3">
            <p className="text-sm font-semibold">Seleção do método energético</p>
            <p className="text-xs text-muted-foreground">
              Escolha um método — não são calculados em média. Fonte canônica: AAHA 2021.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="flex cursor-pointer gap-2 rounded-lg border p-3 text-sm">
                <input
                  type="radio"
                  name="weight-loss-method"
                  checked={weightLossMethod === 'aaha2021'}
                  onChange={() => setWeightLossMethod('aaha2021')}
                  className="mt-1 accent-primary"
                />
                <span>
                  <span className="font-semibold">Método padrão AAHA</span>
                  <span className="block text-xs text-muted-foreground">
                    {v3Plan.weightLossEnergyOptions.aahaKcal.toFixed(0)} kcal/dia no peso-alvo
                  </span>
                </span>
              </label>
              <label className="flex cursor-pointer gap-2 rounded-lg border p-3 text-sm">
                <input
                  type="radio"
                  name="weight-loss-method"
                  checked={weightLossMethod === 'observed_history'}
                  onChange={() => setWeightLossMethod('observed_history')}
                  className="mt-1 accent-primary"
                />
                <span>
                  <span className="font-semibold">Histórico alimentar (80% da ingestão)</span>
                  <span className="block text-xs text-muted-foreground">
                    {v3Plan.weightLossEnergyOptions.observedKcal?.toFixed(0)} kcal/dia
                  </span>
                </span>
              </label>
            </div>
          </section>
        )}

        <section className="rounded-xl border border-border p-4 space-y-2">
          <p className="text-sm font-semibold">Plano de acompanhamento</p>
          {goal === 'weight_loss' && weeklyLoss && (
            <p className="text-xs text-muted-foreground">
              Meta semanal: {weeklyLoss.min}–{weeklyLoss.max}% do peso corporal (
              {species === 'cat' ? 'gato — iniciar preferencialmente 0,5–1%' : 'cão'}).
            </p>
          )}
          {weeksPreview != null && weeksPreview > 0 && (
            <p className="text-xs text-muted-foreground">
              Previsão inicial: ~{weeksPreview.toFixed(0)} semanas até o peso-alvo (estimativa, sujeita a reavaliação).
            </p>
          )}
          <p className="text-xs text-muted-foreground">{v3Plan.reassessmentHint} Próxima reavaliação sugerida: {reassessmentDateIso()}.</p>
          <p className="text-[11px] leading-5 text-muted-foreground">{v3Plan.energyFormula}</p>
          {v3Plan.targetResult.verificationReference && goal === 'weight_loss' && (
            <p className="text-[11px] italic text-muted-foreground">{v3Plan.targetResult.verificationReference.methodSummary}</p>
          )}
        </section>

        {ideal.requiresClinicianReview && (
          <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs leading-5 text-amber-900 dark:text-amber-200">
            {ideal.isProvisionalEstimate
              ? 'Peso-alvo provisório — requer revisão clínica.'
              : 'Confirme pelo exame físico antes de prescrever.'}
          </p>
        )}

        <p className="text-xs leading-5 text-muted-foreground">{v3Plan.uncertaintyNotice}</p>

        <div className="flex justify-between border-t border-border/60 pt-4">
          <Button variant="outline" onClick={() => navigate(`${NEW_ROUTE}/energy`)} className="gap-2">
            <ChevronLeft className="h-4 w-4" /> Anterior
          </Button>
          <Button onClick={handleNext} className="gap-2" id="btn-next-food">
            Próximo: Alimentos <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
