import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowDownRight, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Target } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { useCalculationStore } from '../../store/calculationStore'
import { calculateIdealWeightCustom, getBCSDescription } from '../../lib/nutrition'
import {
  calculateBookRER,
  calculateEnergyGoalFromBcs,
  calculateMaintenanceEnergyFromProfile,
  getDefaultBookEnergyProfile,
} from '../../lib/bookEnergy'
import {
  computeBodyTargetPlan,
  isCalculationEngineV3Enabled,
} from '../../lib/nutritionCalculationBridge'
import type { BCS, TargetGoal } from '../../types'
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

export default function TargetStep() {
  const navigate = useNavigate()
  const { patient, energy, target, setPatient, setTarget, setDiet } = useCalculationStore()
  const species = patient.species ?? 'dog'
  const currentWeight = patient.currentWeight ?? 0
  const [bcs, setBcs] = useState<BCS>((patient.bcs ?? 5) as BCS)
  const [keepCurrentWeight, setKeepCurrentWeight] = useState(target.goal === 'maintenance' && bcs !== 5)
  const automaticGoal = goalFromBcs(bcs)
  const goal: TargetGoal = keepCurrentWeight ? 'maintenance' : automaticGoal
  const goalCopy = GOAL_COPY[goal]
  const GoalIcon = goalCopy.icon
  const bcsInfo = getBCSDescription(bcs)
  const v3Enabled = isCalculationEngineV3Enabled()

  useEffect(() => setKeepCurrentWeight(false), [bcs])

  const profileId =
    energy.resolvedEnergyProfileId ??
    getDefaultBookEnergyProfile({
      species,
      ageMonths: patient.ageMonths ?? 0,
      isNeutered: !!patient.isNeutered,
      isIndoor: patient.isIndoor,
    })

  const v3Plan = useMemo(
    () =>
      v3Enabled && currentWeight > 0
        ? computeBodyTargetPlan({
            patient,
            energy,
            goal,
            energyStepMerKcal: energy.mer,
          })
        : null,
    [currentWeight, energy, goal, patient, v3Enabled],
  )

  const legacyMaintenanceEnergy = useMemo(
    () =>
      calculateMaintenanceEnergyFromProfile({
        weightKg: currentWeight,
        profileId,
        litterSize: energy.litterSize,
        lactationWeek: energy.lactationWeek,
      }),
    [currentWeight, energy.lactationWeek, energy.litterSize, profileId],
  )

  const legacyTargetWeight = useMemo(() => {
    if (goal === 'maintenance') return currentWeight
    return calculateIdealWeightCustom(currentWeight, bcs, goal)
  }, [bcs, currentWeight, goal])

  const legacyTargetEnergy = useMemo(
    () =>
      calculateEnergyGoalFromBcs({
        species,
        currentWeightKg: currentWeight,
        targetWeightKg: legacyTargetWeight,
        goal,
        maintenanceEnergyKcal: legacyMaintenanceEnergy,
      }),
    [currentWeight, goal, legacyMaintenanceEnergy, legacyTargetWeight, species],
  )

  const maintenanceEnergy = v3Plan?.maintenanceEnergyKcal ?? legacyMaintenanceEnergy
  const targetWeight = v3Plan?.targetWeightKg ?? legacyTargetWeight
  const targetEnergy = v3Plan?.targetEnergyKcal ?? legacyTargetEnergy

  const weightDiffKg = targetWeight - currentWeight
  const weightDiffPct = currentWeight > 0 ? (weightDiffKg / currentWeight) * 100 : 0
  const energyDiffPct = maintenanceEnergy > 0 ? ((targetEnergy - maintenanceEnergy) / maintenanceEnergy) * 100 : 0

  const energyFormula = useMemo(() => {
    if (v3Plan) return v3Plan.energyFormula

    if (goal === 'maintenance') {
      return `Manutenção no peso atual (${currentWeight.toFixed(2)} kg), conforme perfil energético selecionado.`
    }

    const targetRer = calculateBookRER(Math.max(0.1, targetWeight))
    if (goal === 'weight_loss') {
      const factor = species === 'cat' ? 0.8 : 1
      return `Peso-alvo ${targetWeight.toFixed(2)} kg (ECC ${bcs}) → RER ${targetRer.toFixed(0)} kcal × ${factor.toFixed(1)} = ${targetEnergy.toFixed(0)} kcal/dia`
    }

    return `Peso-alvo ${targetWeight.toFixed(2)} kg → RER ${targetRer.toFixed(0)} kcal × 1,2 = ${targetEnergy.toFixed(0)} kcal/dia`
  }, [bcs, currentWeight, goal, species, targetEnergy, targetWeight, v3Plan])

  const targetEnergyRange = v3Plan?.targetResult.estimatedRangeKcalDay
  const weightMethodSummary = v3Plan?.idealWeightEstimate.methodSummary
  const requiresClinicianReview = v3Plan?.idealWeightEstimate.requiresClinicianReview ?? false
  const isProvisionalEstimate = v3Plan?.idealWeightEstimate.isProvisionalEstimate ?? false
  const verificationReference = v3Plan?.targetResult.verificationReference
  const weeklyLossTarget = v3Plan?.weeklyLossTargetPct

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
    })
    setDiet({ targetEnergy })
    navigate(`${NEW_ROUTE}/food`)
  }

  return (
    <Card className="nutrition-step-card w-full">
      <CardHeader className="border-b border-border/60 pb-4">
        <CardTitle className="text-2xl">Meta corporal</CardTitle>
        <CardDescription>Selecione o ECC. O objetivo e a energia-alvo são definidos automaticamente.</CardDescription>
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
                  <span className="font-semibold">Manter o peso atual</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    Use quando a decisão clínica for manutenção apesar do ECC.
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
                <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">Objetivo automático</p>
                <p className="text-lg font-bold">{goalCopy.label}</p>
              </div>
            </div>
            <p className="max-w-md text-xs text-muted-foreground">{goalCopy.description}</p>
          </div>
          <div className="grid gap-px bg-border sm:grid-cols-4">
            <div className="bg-card p-3">
              <p className="text-[10px] text-muted-foreground">Peso atual</p>
              <p className="mt-0.5 text-lg font-bold">{currentWeight.toFixed(2)} kg</p>
            </div>
            <div className="bg-card p-3">
              <p className="text-[10px] text-muted-foreground">Peso-alvo estimado</p>
              <p className="mt-0.5 text-lg font-bold">{targetWeight.toFixed(2)} kg</p>
              {weightMethodSummary && goal !== 'maintenance' && (
                <p className="mt-1 text-[10px] leading-4 text-muted-foreground">{weightMethodSummary}</p>
              )}
            </div>
            <div className="bg-card p-3">
              <p className="text-[10px] text-muted-foreground">Variação ponderal</p>
              <p className="mt-0.5 text-lg font-bold">
                {weightDiffKg > 0 ? '+' : ''}
                {weightDiffKg.toFixed(2)} kg
              </p>
              <p className="text-[10px] text-muted-foreground">
                {weightDiffPct > 0 ? '+' : ''}
                {weightDiffPct.toFixed(1)}%
              </p>
            </div>
            <div className="bg-card p-3">
              <p className="text-[10px] text-muted-foreground">Energia-alvo</p>
              <p className="mt-0.5 text-lg font-bold text-primary">{targetEnergy.toFixed(0)} kcal/dia</p>
              {targetEnergyRange && goal !== 'maintenance' && (
                <p className="mt-1 text-[10px] text-muted-foreground">
                  Faixa: {targetEnergyRange.minimum.toFixed(0)}–{targetEnergyRange.maximum.toFixed(0)} kcal/dia
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold">Comparação energética</p>
            <p className="text-xs text-muted-foreground">
              Manutenção (peso atual): {maintenanceEnergy.toFixed(0)} kcal/dia · Meta: {targetEnergy.toFixed(0)} kcal/dia
            </p>
            {v3Plan && goal === 'weight_loss' && weeklyLossTarget && (
              <p className="text-xs text-muted-foreground">
                Meta semanal de perda: {weeklyLossTarget.min}–{weeklyLossTarget.max}% do peso corporal (
                {species === 'dog' ? 'cão' : 'gato'}).
              </p>
            )}
            <p className="text-[11px] leading-5 text-muted-foreground">{energyFormula}</p>
            {v3Plan && verificationReference && goal === 'weight_loss' && (
              <p className="text-[11px] leading-5 text-muted-foreground/90 italic">
                {verificationReference.methodSummary} (somente conferência — não altera a meta prescrita.)
              </p>
            )}
            {v3Plan && (
              <p className="text-[11px] leading-5 text-muted-foreground">
                Reavaliar peso, ECC, EMC e adesão em 2–4 semanas; ajustar calorias ~10% se a perda estiver fora da meta
                com adesão confirmada.
              </p>
            )}
          </div>
          <div
            className={cn(
              'flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold',
              Math.abs(energyDiffPct) < 0.1
                ? 'bg-muted text-foreground'
                : energyDiffPct < 0
                  ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300'
                  : 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
            )}
          >
            <ArrowRight className="h-3.5 w-3.5" />
            {energyDiffPct > 0 ? '+' : ''}
            {energyDiffPct.toFixed(1)}%
          </div>
        </section>

        {requiresClinicianReview && (
          <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs leading-5 text-amber-900 dark:text-amber-200">
            {isProvisionalEstimate
              ? 'Estimativa provisória — confirme pelo exame físico, EMC e histórico ponderal. Considere meta intermediária ou override clínico antes de prescrever.'
              : 'A estimativa automática de peso-alvo tem baixa confiança neste ECC. Confirme manualmente pelo exame físico antes de prescrever.'}
          </p>
        )}

        {!v3Enabled && goal !== 'maintenance' && (
          <p className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-xs leading-5 text-blue-900 dark:text-blue-200">
            Motor legado ativo. Para homologação do cálculo clínico versionado (hierarquia AAHA + histórico alimentar),
            ative <code className="text-[10px]">VITE_NUTRITION_CALCULATION_ENGINE_V3=true</code> no ambiente local.
          </p>
        )}

        <p className="text-xs leading-5 text-muted-foreground">
          A estimativa ponderal por ECC é referência inicial. Confirme pelo exame físico, massa muscular e evolução do paciente.
        </p>

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
