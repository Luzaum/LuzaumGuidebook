import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRightLeft, ChevronLeft, ChevronRight, Scale, Sparkles, Target, TrendingDown, TrendingUp, ZoomIn } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Badge } from '../../components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
import { useCalculationStore } from '../../store/calculationStore'
import {
  calculateIdealWeightCustom,
  computePhysiologicEnergy,
  getBCSDescription,
  getPhysiologicStateById,
  getWeightGainPercent,
  getWeightLossPercent,
} from '../../lib/nutrition'
import { BCS, TargetGoal } from '../../types'
import { cn } from '../../lib/utils'

const NEW_ROUTE = '/calculadora-energetica/new'
const ECC_IMAGE_BY_SPECIES = {
  dog: '/ecc-cao-2025.jpg',
  cat: '/ecc-gato-2025.jpg',
}

const GOAL_OPTIONS: Array<{
  value: TargetGoal
  label: string
  description: string
  icon: typeof Target
}> = [
  { value: 'maintenance', label: 'Manutenção', description: 'Mantém o peso e a rotina atual do paciente.', icon: Target },
  { value: 'weight_loss', label: 'Perda de peso', description: 'Usa o ECC para definir perda planejada e energia alvo mais restritiva.', icon: TrendingDown },
  { value: 'weight_gain', label: 'Ganho de peso', description: 'Apoia recuperação nutricional com peso-alvo acima do atual.', icon: TrendingUp },
]

function getGoalMultiplier(goal: TargetGoal) {
  if (goal === 'weight_loss') return 0.8
  if (goal === 'weight_gain') return 1.1
  return 1
}

export default function TargetStep() {
  const navigate = useNavigate()
  const { patient, energy, target, setPatient, setTarget } = useCalculationStore()

  const [goal, setGoal] = useState<TargetGoal>(target.goal ?? 'maintenance')
  const [ruleMode, setRuleMode] = useState<'fediaf' | 'clinical'>(
    target.isCustomClinicalRule === false ? 'fediaf' : 'clinical',
  )
  const [useManualWeight, setUseManualWeight] = useState<boolean>(
    target.isManualTarget ?? (target.isCustomClinicalRule === false && (target.goal === 'weight_loss' || target.goal === 'weight_gain')),
  )
  const [manualWeight, setManualWeight] = useState<number>(target.targetWeight ?? 0)
  const [weightForCalc, setWeightForCalc] = useState<'current' | 'target'>(target.weightToUseForEnergy ?? 'current')
  const [eccModalOpen, setEccModalOpen] = useState(false)
  const [modalBcs, setModalBcs] = useState<BCS>((patient.bcs ?? 5) as BCS)
  const [eccImageSrc, setEccImageSrc] = useState(ECC_IMAGE_BY_SPECIES[patient.species ?? 'dog'])

  const currentWeight = patient.currentWeight ?? 0
  const bcs = (patient.bcs ?? 5) as BCS
  const species = patient.species ?? 'dog'
  const state = getPhysiologicStateById(energy.stateId ?? '')
  const bcsInfo = getBCSDescription(bcs)
  const modalBcsInfo = getBCSDescription(modalBcs)

  useEffect(() => {
    setEccImageSrc(ECC_IMAGE_BY_SPECIES[species])
  }, [species])

  useEffect(() => {
    if (goal === 'weight_loss' || goal === 'weight_gain') {
      setWeightForCalc('target')
      return
    }
    setWeightForCalc(target.weightToUseForEnergy ?? 'current')
  }, [goal, target.weightToUseForEnergy])

  useEffect(() => {
    if (goal === 'maintenance') {
      setUseManualWeight(false)
      return
    }
    if (ruleMode === 'fediaf') {
      setUseManualWeight(true)
    }
  }, [goal, ruleMode])

  const autoTargetWeight = useMemo(() => {
    if (goal === 'maintenance') return currentWeight
    if (ruleMode === 'fediaf') return currentWeight
    return calculateIdealWeightCustom(currentWeight, bcs, goal)
  }, [bcs, currentWeight, goal, ruleMode])

  const targetWeight = useManualWeight && manualWeight > 0 ? manualWeight : autoTargetWeight
  const diffKg = targetWeight - currentWeight
  const diffPct = currentWeight > 0 ? (Math.abs(diffKg) / currentWeight) * 100 : 0
  const customRulePercent =
    goal === 'weight_loss' ? getWeightLossPercent(bcs) : goal === 'weight_gain' ? getWeightGainPercent(bcs) : null
  const calcWeight = weightForCalc === 'target' ? targetWeight : currentWeight
  const requiresManualOfficialWeight = ruleMode === 'fediaf' && goal !== 'maintenance'

  const baseEnergy = useMemo(
    () =>
      computePhysiologicEnergy({
        species,
        stateId: energy.stateId ?? '',
        weightKg: calcWeight,
        ageWeeks: energy.ageWeeks,
        expectedAdultWeightKg: energy.expectedAdultWeightKg,
        activityHoursPerDay: energy.activityHoursPerDay,
        activityImpact: energy.activityImpact,
        obesityProne: energy.obesityProne,
        litterSize: energy.litterSize,
        lactationWeek: energy.lactationWeek,
        specialBreedObservation: energy.specialBreedObservation,
      }),
    [calcWeight, energy.activityHoursPerDay, energy.activityImpact, energy.ageWeeks, energy.expectedAdultWeightKg, energy.lactationWeek, energy.litterSize, energy.obesityProne, energy.specialBreedObservation, energy.stateId, species],
  )

  const goalMultiplier = getGoalMultiplier(goal)
  const targetEnergy = Math.round(baseEnergy.mer * goalMultiplier)

  const modalWeightPreview = useMemo(() => {
    const nextGoal = modalBcs >= 6 ? 'weight_loss' : modalBcs <= 4 ? 'weight_gain' : 'maintenance'
    const nextTargetWeight =
      nextGoal === 'maintenance' ? currentWeight : calculateIdealWeightCustom(currentWeight, modalBcs, nextGoal)
    const nextDiffKg = nextTargetWeight - currentWeight
    const nextDiffPct = currentWeight > 0 ? (Math.abs(nextDiffKg) / currentWeight) * 100 : 0

    return {
      goal: nextGoal,
      targetWeight: nextTargetWeight,
      diffKg: nextDiffKg,
      diffPct: nextDiffPct,
    }
  }, [currentWeight, modalBcs])

  const importEccToCalculation = () => {
    const nextGoal = modalWeightPreview.goal as TargetGoal
    setPatient({ bcs: modalBcs })
    setGoal(nextGoal)
    setRuleMode('clinical')
    setUseManualWeight(false)
    setTarget({
      goal: nextGoal,
      targetWeight: modalWeightPreview.targetWeight,
      isManualTarget: false,
      isCustomClinicalRule: true,
    })
    setEccModalOpen(false)
  }

  const handleNext = () => {
    setTarget({
      goal,
      isCustomClinicalRule: ruleMode === 'clinical',
      isManualTarget: useManualWeight,
      currentWeight,
      targetWeight,
      weightToUseForEnergy: weightForCalc,
      targetEnergy,
    })
    navigate(`${NEW_ROUTE}/food`)
  }

  return (
    <>
      <Card className="w-full border-orange-500/10 bg-gradient-to-b from-card via-card to-card/95 shadow-[0_18px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
        <CardHeader className="border-b border-border/60 pb-6">
          <CardTitle className="text-2xl">Meta nutricional</CardTitle>
          <CardDescription>ECC, peso atual, peso-alvo e meta de energia trabalham juntos para definir o plano final.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-border bg-muted/25 p-5 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">ECC atual</p>
                  <p className="mt-1 text-4xl font-black text-foreground">{bcs}/9</p>
                  <p className="mt-1 text-sm text-muted-foreground">{bcsInfo.detail}</p>
                </div>
                <Badge className="rounded-full bg-orange-500/15 px-3 py-1 text-orange-900 dark:text-orange-200">
                  {bcsInfo.label}
                </Badge>
              </div>

              <Button
                variant="outline"
                className="mt-5 w-full justify-start gap-2 rounded-2xl border-orange-400/30 bg-orange-500/[0.06] text-left"
                onClick={() => setEccModalOpen(true)}
              >
                <Sparkles className="h-4 w-4" />
                Como saber o escore ideal do seu paciente?
              </Button>
            </div>

            <div className="rounded-3xl border border-orange-400/25 bg-gradient-to-br from-orange-500/15 to-transparent p-5 dark:from-orange-500/12">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-border bg-muted/40 p-4 dark:border-white/10 dark:bg-black/15">
                  <p className="text-xs text-muted-foreground">Peso atual</p>
                  <p className="mt-1 text-xl font-bold text-foreground">{currentWeight.toFixed(2)} kg</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4 dark:border-white/10 dark:bg-black/15">
                  <p className="text-xs text-muted-foreground">Peso-alvo</p>
                  <p className="mt-1 text-xl font-bold text-orange-600 dark:text-orange-300">{targetWeight.toFixed(2)} kg</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4 dark:border-white/10 dark:bg-black/15">
                  <p className="text-xs text-muted-foreground">Variacao</p>
                  <p className="mt-1 text-xl font-bold text-foreground">{diffPct.toFixed(1)}%</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-foreground">
                {goal === 'weight_loss'
                  ? `Precisa perder ${diffPct.toFixed(1)}% do peso corporal.`
                  : goal === 'weight_gain'
                  ? `Precisa ganhar ${diffPct.toFixed(1)}% do peso corporal.`
                  : 'Paciente em meta de manutencao no peso atual.'}
              </p>
            </div>
          </div>

          <section className="space-y-4 rounded-3xl border border-border bg-muted/25 p-5 dark:border-white/10 dark:bg-white/[0.03]">
            <div>
              <p className="text-lg font-semibold text-foreground">Objetivo do plano</p>
              <p className="text-sm text-muted-foreground">Cada meta altera o peso de referencia e a energia diaria sugerida.</p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {GOAL_OPTIONS.map((option) => {
                const Icon = option.icon
                const active = goal === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setGoal(option.value)}
                    className={cn(
                      'rounded-3xl border px-5 py-5 text-left transition-all duration-200 hover:-translate-y-1 active:scale-[0.99]',
                      active
                        ? 'border-orange-400/60 bg-orange-500/15 text-foreground shadow-[0_16px_32px_rgba(249,115,22,0.12)] dark:bg-orange-500/12 dark:text-white'
                        : 'border-border bg-muted/40 hover:border-orange-500/40 hover:bg-orange-500/10 dark:border-white/10 dark:bg-black/15 dark:hover:bg-orange-500/[0.05]',
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-foreground dark:text-inherit">{option.label}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{option.description}</p>
                      </div>
                      <span className="rounded-2xl border border-border bg-muted/50 p-3 text-orange-600 dark:border-white/10 dark:bg-black/20 dark:text-orange-300">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="space-y-4 rounded-3xl border border-border bg-muted/25 p-5 dark:border-white/10 dark:bg-white/[0.03]">
            <div>
              <p className="text-lg font-semibold text-foreground">Origem da meta ponderal</p>
              <p className="text-sm text-muted-foreground">O app agora separa claramente regra oficial de referencia e regra percentual customizada da clinica.</p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {[
                {
                  value: 'fediaf' as const,
                  title: 'Modo FEDIAF / oficial',
                  description: 'Usa peso corporal ótimo definido clinicamente. Para perda ou ganho, o peso-alvo deve ser informado manualmente.',
                },
                {
                  value: 'clinical' as const,
                  title: 'Modo clinica customizada',
                  description: 'Usa a regra percentual operacional por ECC configurada no modulo.',
                },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setRuleMode(option.value)}
                  className={cn(
                    'rounded-2xl border px-4 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.99]',
                    ruleMode === option.value
                      ? 'border-orange-400/60 bg-orange-500/15 text-foreground dark:bg-orange-500/12 dark:text-white'
                      : 'border-border bg-muted/40 text-muted-foreground hover:border-orange-500/40 hover:text-foreground dark:border-white/10 dark:bg-black/10 dark:hover:text-white',
                  )}
                >
                  <p className="font-semibold text-foreground dark:text-inherit">{option.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{option.description}</p>
                </button>
              ))}
            </div>

            {(goal === 'weight_loss' || goal === 'weight_gain') && (
              <div className="grid gap-4 md:grid-cols-[1fr_0.9fr]">
                <div className="space-y-2">
                  <Label htmlFor="manual-target-weight">
                    {ruleMode === 'fediaf' ? 'Peso corporal otimo definido clinicamente (kg)' : 'Peso-alvo manual (kg)'}
                  </Label>
                  <Input
                    id="manual-target-weight"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={useManualWeight ? manualWeight || '' : ''}
                    onChange={(event) => {
                      setUseManualWeight(true)
                      setManualWeight(Number(event.target.value) || 0)
                    }}
                    placeholder={ruleMode === 'fediaf' ? 'Informe o peso corporal ótimo' : 'Opcional: sobrescrever cálculo automático'}
                  />
                </div>

                <div className="rounded-2xl border border-orange-400/25 bg-orange-500/10 p-4 dark:bg-orange-500/[0.08]">
                  <p className="font-semibold text-foreground">
                    {ruleMode === 'fediaf' ? 'Referencia oficial' : 'Regra percentual da clinica'}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {ruleMode === 'fediaf'
                      ? 'A referência oficial usa peso corporal ótimo. O percentual automático por ECC não é apresentado como regra oficial.'
                      : customRulePercent != null
                      ? `ECC ${bcs}/9 aplica ${goal === 'weight_loss' ? `-${customRulePercent}%` : `+${customRulePercent}%`} no modulo da clinica.`
                      : 'O paciente esta em manutencao.'}
                  </p>
                </div>
              </div>
            )}
          </section>

          <section className="space-y-4 rounded-3xl border border-orange-400/25 bg-gradient-to-r from-orange-500/12 via-muted/50 to-transparent p-5 dark:via-black/10">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-orange-600 dark:text-orange-300" />
              <div>
                <p className="text-lg font-semibold text-foreground">Peso usado para energia</p>
                <p className="text-sm text-muted-foreground">A seleção muda o cálculo energetico imediatamente.</p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {(['current', 'target'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setWeightForCalc(option)}
                  className={cn(
                    'rounded-2xl border px-4 py-4 text-left transition-all',
                    weightForCalc === option
                      ? 'border-orange-400/60 bg-orange-500/15 text-foreground dark:bg-orange-500/12 dark:text-white'
                      : 'border-border bg-muted/40 text-muted-foreground dark:border-white/10 dark:bg-black/10',
                  )}
                >
                  <p className="font-semibold text-foreground dark:text-inherit">
                    {option === 'current' ? 'Usar peso atual' : 'Usar peso-alvo'}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{option === 'current' ? `${currentWeight.toFixed(2)} kg` : `${targetWeight.toFixed(2)} kg`}</p>
                </button>
              ))}
            </div>

            <div className="grid gap-4 xl:grid-cols-[1fr_1fr_1fr]">
              <div className="rounded-2xl border border-border bg-muted/40 p-4 dark:border-white/10 dark:bg-black/15">
                <p className="text-xs text-muted-foreground">Estado fisiológico</p>
                <p className="mt-1 font-semibold text-foreground">{state?.label ?? 'Nao informado'}</p>
              </div>
              <div className="rounded-2xl border border-border bg-muted/40 p-4 dark:border-white/10 dark:bg-black/15">
                <p className="text-xs text-muted-foreground">Energia fisiologica</p>
                <p className="mt-1 text-2xl font-black text-foreground">{baseEnergy.mer.toFixed(0)} kcal/dia</p>
              </div>
              <div className="rounded-2xl border border-orange-400/25 bg-orange-500/10 p-4 dark:bg-orange-500/[0.08]">
                <div className="flex items-center gap-2">
                  <ArrowRightLeft className="h-4 w-4 text-orange-600 dark:text-orange-300" />
                  <p className="text-xs text-muted-foreground">Energia alvo final</p>
                </div>
                <p className="mt-1 text-2xl font-black text-orange-600 dark:text-orange-300">{targetEnergy.toFixed(0)} kcal/dia</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {goal === 'maintenance'
                    ? 'Sem ajuste adicional de meta.'
                    : goal === 'weight_loss'
                    ? 'Meta de emagrecimento aplicada sobre a energia fisiologica.'
                    : 'Meta de ganho aplicada sobre a energia fisiologica.'}
                </p>
              </div>
            </div>
          </section>

          <div className="flex justify-between border-t border-border/60 pt-4">
            <Button variant="outline" onClick={() => navigate(`${NEW_ROUTE}/energy`)} className="gap-2">
              <ChevronLeft className="h-4 w-4" /> Anterior
            </Button>
            <Button onClick={handleNext} className="gap-2" id="btn-next-food" disabled={requiresManualOfficialWeight && manualWeight <= 0}>
              Proximo: Alimentos <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={eccModalOpen} onOpenChange={setEccModalOpen}>
        <DialogContent className="w-[min(98vw,1500px)] max-w-[1500px] sm:max-w-[1500px] overflow-hidden border border-orange-400/20 bg-popover p-0">
          <DialogHeader className="border-b border-border/60 px-6 py-5">
            <DialogTitle className="text-xl">Como saber o escore ideal do seu paciente?</DialogTitle>
          </DialogHeader>

          <div className="grid max-h-[85vh] gap-0 overflow-auto lg:grid-cols-[1.05fr_0.95fr]">
            <div className="border-b border-border/60 bg-muted/30 p-5 lg:border-b-0 lg:border-r dark:border-white/5 dark:bg-black/25">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="h-full w-full relative group cursor-zoom-in rounded-2xl overflow-hidden shadow-sm hover:ring-2 ring-orange-500/50 transition-all">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10 flex items-center justify-center">
                      <ZoomIn className="origin-center scale-0 group-hover:scale-150 text-foreground/80 transition-transform duration-300 drop-shadow-md dark:text-white/80" />
                    </div>
                    <img
                      src={eccImageSrc}
                      alt={`Guia de ECC ${species === 'dog' ? 'canino' : 'felino'}`}
                      className="h-full max-h-[70vh] w-full object-contain"
                      onError={() => setEccImageSrc(ECC_IMAGE_BY_SPECIES[species])}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] lg:max-w-[1400px] h-[90vh] p-0 overflow-hidden flex flex-col z-[100] border-border bg-zinc-950 text-zinc-100 dark:border-white/10">
                  <div className="w-full flex-1 overflow-auto p-4 cursor-move">
                    <img src={eccImageSrc} alt="Guia Ampliado" className="w-full min-w-[1000px] h-auto object-contain" />
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <p className="text-lg font-semibold text-foreground">Selecione o escore corporal</p>
                <p className="text-sm text-muted-foreground">Ao importar, o ECC entra na engine e o peso-alvo passa a ser usado no modulo de meta.</p>
              </div>

              <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
                {([1, 2, 3, 4, 5, 6, 7, 8, 9] as BCS[]).map((score) => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setModalBcs(score)}
                    className={cn(
                      'rounded-2xl border px-3 py-4 text-center transition-all hover:-translate-y-0.5 active:scale-[0.99]',
                      modalBcs === score
                        ? 'border-orange-400/60 bg-orange-500/15 text-foreground dark:bg-orange-500/12 dark:text-white'
                        : 'border-border bg-muted/40 text-muted-foreground dark:border-white/10 dark:bg-black/10',
                    )}
                  >
                    <p className="text-2xl font-black text-foreground dark:text-inherit">{score}</p>
                    <p className="text-xs">/9</p>
                  </button>
                ))}
              </div>

              <div className="rounded-2xl border border-orange-400/25 bg-orange-500/10 p-4 dark:bg-orange-500/[0.08]">
                <p className="font-semibold text-foreground">{modalBcsInfo.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{modalBcsInfo.detail}</p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-muted/40 p-4 dark:border-white/10 dark:bg-black/10">
                  <p className="text-xs text-muted-foreground">Peso atual</p>
                  <p className="mt-1 text-xl font-bold text-foreground">{currentWeight.toFixed(2)} kg</p>
                </div>
                <div className="rounded-2xl border border-orange-400/25 bg-orange-500/10 p-4 dark:bg-orange-500/[0.08]">
                  <p className="text-xs text-muted-foreground">Peso ideal estimado</p>
                  <p className="mt-1 text-xl font-bold text-orange-600 dark:text-orange-300">
                    {modalWeightPreview.targetWeight.toFixed(2)} kg
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4 dark:border-white/10 dark:bg-black/10">
                  <p className="text-xs text-muted-foreground">Variacao em kg</p>
                  <p className="mt-1 text-xl font-bold text-foreground">
                    {modalWeightPreview.diffKg > 0 ? '+' : ''}
                    {modalWeightPreview.diffKg.toFixed(2)} kg
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4 dark:border-white/10 dark:bg-black/10">
                  <p className="text-xs text-muted-foreground">Variacao em %</p>
                  <p className="mt-1 text-xl font-bold text-foreground">{modalWeightPreview.diffPct.toFixed(1)}%</p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-muted/40 p-4 text-sm text-foreground dark:border-white/10 dark:bg-black/10">
                {modalWeightPreview.goal === 'weight_loss'
                  ? `Este paciente precisa perder ${modalWeightPreview.diffPct.toFixed(1)}% do peso corporal.`
                  : modalWeightPreview.goal === 'weight_gain'
                  ? `Este paciente precisa ganhar ${modalWeightPreview.diffPct.toFixed(1)}% do peso corporal.`
                  : 'Este paciente esta proximo do escore ideal para manutencao.'}
              </div>

              <div className="flex justify-end">
                <Button onClick={importEccToCalculation} className="gap-2">
                  Importar para o calculo <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
