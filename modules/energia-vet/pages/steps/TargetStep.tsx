import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowDownRight, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Target } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { useCalculationStore } from '../../store/calculationStore'
import { calculateIdealWeightCustom, calculateRER, getBCSDescription } from '../../lib/nutrition'
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
  const { patient, energy, target, diet, setPatient, setTarget, setDiet } = useCalculationStore()
  const species = patient.species ?? 'dog'
  const currentWeight = patient.currentWeight ?? 0
  const [bcs, setBcs] = useState<BCS>((patient.bcs ?? 5) as BCS)
  const [keepCurrentWeight, setKeepCurrentWeight] = useState(target.goal === 'maintenance' && bcs !== 5)
  const automaticGoal = goalFromBcs(bcs)
  const goal: TargetGoal = keepCurrentWeight ? 'maintenance' : automaticGoal
  const goalCopy = GOAL_COPY[goal]
  const GoalIcon = goalCopy.icon
  const bcsInfo = getBCSDescription(bcs)

  useEffect(() => setKeepCurrentWeight(false), [bcs])

  const targetWeight = useMemo(() => {
    if (goal === 'maintenance') return currentWeight
    return calculateIdealWeightCustom(currentWeight, bcs, goal)
  }, [bcs, currentWeight, goal])

  const profileEnergy = energy.mer ?? energy.merFromProfile ?? target.targetEnergy ?? 0
  const targetEnergy = useMemo(() => {
    if (goal === 'maintenance') return profileEnergy
    const targetRer = calculateRER(Math.max(0.1, targetWeight), species)
    if (goal === 'weight_loss') return targetRer * (species === 'cat' ? 0.8 : 1)
    return targetRer * 1.2
  }, [goal, profileEnergy, species, targetWeight])
  const weightDiffKg = targetWeight - currentWeight
  const weightDiffPct = currentWeight > 0 ? (weightDiffKg / currentWeight) * 100 : 0
  const energyDiffPct = profileEnergy > 0 ? ((targetEnergy - profileEnergy) / profileEnergy) * 100 : 0

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
      <CardHeader className="border-b border-border/60 pb-6">
        <CardTitle className="text-2xl">Meta corporal</CardTitle>
        <CardDescription>Selecione o ECC. O objetivo e a energia-alvo são definidos automaticamente.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-7 pt-6">
        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-3xl border border-border bg-muted/25 p-3">
            <img src={ECC_IMAGE_BY_SPECIES[species]} alt={`Escore de condição corporal ${species === 'dog' ? 'canino' : 'felino'} em escala de 1 a 9`} className="max-h-[620px] w-full rounded-2xl object-contain" />
          </div>
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold">Escore de condição corporal</h2>
              <p className="text-sm text-muted-foreground">Selecione o valor observado no exame físico.</p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 xl:grid-cols-3" role="radiogroup" aria-label="Escore de condição corporal">
              {([1, 2, 3, 4, 5, 6, 7, 8, 9] as BCS[]).map((score) => (
                <button key={score} type="button" role="radio" aria-checked={bcs === score} onClick={() => setBcs(score)} className={cn('flex min-h-20 cursor-pointer flex-col items-center justify-center rounded-2xl border outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring', bcs === score ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card hover:border-primary/40')}>
                  <span className="text-2xl font-black">{score}</span><span className="text-xs text-muted-foreground">/9</span>
                </button>
              ))}
            </div>
            <div className="rounded-2xl border border-border bg-muted/35 p-4"><p className="font-semibold">{bcsInfo.label}</p><p className="mt-1 text-sm text-muted-foreground">{bcsInfo.detail}</p></div>
            {automaticGoal !== 'maintenance' && (
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border p-4"><input type="checkbox" checked={keepCurrentWeight} onChange={(event) => setKeepCurrentWeight(event.target.checked)} className="mt-1 h-5 w-5 accent-primary" /><span><span className="font-semibold">Manter o peso atual</span><span className="mt-1 block text-sm text-muted-foreground">Use somente quando a decisão clínica for manutenção apesar do ECC.</span></span></label>
            )}
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-primary/20">
          <div className="flex flex-col gap-3 bg-primary/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><GoalIcon className="h-5 w-5" /></span><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Objetivo automático</p><p className="text-xl font-bold">{goalCopy.label}</p></div></div>
            <p className="max-w-md text-sm text-muted-foreground">{goalCopy.description}</p>
          </div>
          <div className="grid gap-px bg-border sm:grid-cols-4">
            <div className="bg-card p-5"><p className="text-xs text-muted-foreground">Peso atual</p><p className="mt-1 text-xl font-bold">{currentWeight.toFixed(2)} kg</p></div>
            <div className="bg-card p-5"><p className="text-xs text-muted-foreground">Peso-alvo estimado</p><p className="mt-1 text-xl font-bold">{targetWeight.toFixed(2)} kg</p></div>
            <div className="bg-card p-5"><p className="text-xs text-muted-foreground">Variação ponderal</p><p className="mt-1 text-xl font-bold">{weightDiffKg > 0 ? '+' : ''}{weightDiffKg.toFixed(2)} kg</p><p className="text-xs text-muted-foreground">{weightDiffPct > 0 ? '+' : ''}{weightDiffPct.toFixed(1)}%</p></div>
            <div className="bg-card p-5"><p className="text-xs text-muted-foreground">Energia-alvo</p><p className="mt-1 text-xl font-bold text-primary">{targetEnergy.toFixed(0)} kcal/dia</p></div>
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-border p-5 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="font-semibold">Energia em relação ao perfil</p><p className="mt-1 text-sm text-muted-foreground">Perfil original: {profileEnergy.toFixed(0)} kcal/dia · Meta: {targetEnergy.toFixed(0)} kcal/dia</p></div>
          <div className={cn('flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold', Math.abs(energyDiffPct) < 0.1 ? 'bg-muted text-foreground' : energyDiffPct < 0 ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300' : 'bg-amber-500/10 text-amber-700 dark:text-amber-300')}><ArrowRight className="h-4 w-4" />{energyDiffPct > 0 ? '+' : ''}{energyDiffPct.toFixed(1)}%</div>
        </section>

        <p className="text-xs leading-5 text-muted-foreground">A estimativa ponderal por ECC é uma referência inicial. Confirme a meta pelo exame físico, massa muscular e evolução do paciente.</p>
        <div className="flex justify-between border-t border-border/60 pt-4"><Button variant="outline" onClick={() => navigate(`${NEW_ROUTE}/energy`)} className="gap-2"><ChevronLeft className="h-4 w-4" /> Anterior</Button><Button onClick={handleNext} className="gap-2" id="btn-next-food">Próximo: Alimentos <ChevronRight className="h-4 w-4" /></Button></div>
      </CardContent>
    </Card>
  )
}
