import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity, ChevronLeft, ChevronRight, Info, Scale, Sparkles } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip'
import { Badge } from '../../components/ui/badge'
import { useCalculationStore } from '../../store/calculationStore'
import {
  CLINICAL_ENERGY_DISCLAIMER,
  calculateRER,
  computePhysiologicEnergy,
  getDefaultStateId,
  getPhysiologicStateById,
  getPhysiologicStates,
  resolveCatAdultState,
  resolveDogAdultStateFromActivity,
  resolveDogGrowthStateFromAge,
} from '../../lib/nutrition'
import { PhysiologicState } from '../../types'
import { cn } from '../../lib/utils'

const NEW_ROUTE = '/calculadora-energetica/new'

const DOG_AUTO_STATE_IDS = new Set([
  'dog_adult_sedentary',
  'dog_adult_low_activity',
  'dog_adult_obese_prone',
  'dog_adult_moderate_low_impact',
  'dog_adult_moderate_high_impact',
  'dog_adult_high_activity',
  'dog_adult_extreme_activity',
])

const DOG_GROWTH_STATE_IDS = new Set(['dog_growth_curve_8w_4m', 'dog_growth_curve_4_12m'])

const CAT_AUTO_STATE_IDS = new Set([
  'cat_adult_active',
  'cat_adult_neutered_indoor',
  'cat_adult_indoor_weight_prone',
])

const CAT_GROWTH_STATE_IDS = new Set(['cat_growth_0_4m', 'cat_growth_4_9m', 'cat_growth_9_12m'])

const FRIENDLY_LABELS: Record<string, string> = {
  dog_young_adult_1_2: 'Cao jovem adulto 1 a 2 anos',
  dog_adult_sedentary: 'Cao adulto sedentario',
  dog_adult_low_activity: 'Cao adulto baixa atividade',
  dog_adult_obese_prone: 'Cao adulto predisposto a obesidade',
  dog_adult_moderate_low_impact: 'Cao adulto atividade moderada — baixo impacto',
  dog_adult_moderate_high_impact: 'Cao adulto atividade moderada — alto impacto',
  dog_adult_high_activity: 'Cao adulto alta atividade',
  dog_adult_extreme_activity: 'Cao adulto condicoes extremas',
  dog_senior_gt_7: 'Cao senior',
  dog_growth_curve_8w_4m: 'Cao filhote 8 semanas a 4 meses',
  dog_growth_curve_4_12m: 'Cao filhote 4 a 12 meses',
  dog_gestation_first_4w: 'Cao em gestacao — inicio',
  dog_gestation_last_5w: 'Cao em gestacao — final',
  dog_lactation: 'Cao em lactacao',
  cat_adult_active: 'Gato adulto ativo',
  cat_adult_neutered_indoor: 'Gato adulto indoor/castrado',
  cat_adult_indoor_weight_prone: 'Gato indoor com baixa demanda energetica',
  cat_growth_0_4m: 'Gato filhote ate 4 meses',
  cat_growth_4_9m: 'Gato filhote 4 a 9 meses',
  cat_growth_9_12m: 'Gato filhote 9 a 12 meses',
  cat_gestation: 'Gata gestante',
  cat_lactation: 'Gata em lactacao',
}

const STATE_DESCRIPTIONS: Record<string, string> = {
  dog_adult_sedentary: 'Perfil para rotina sem exercicio regular ou mobilidade muito reduzida.',
  dog_adult_low_activity: 'Indicado para passeio curto e rotina de baixa atividade.',
  dog_adult_obese_prone: 'Prioriza menor oferta energetica para pacientes eficientes ou com tendencia a sobrepeso.',
  dog_adult_moderate_low_impact: 'Base pratica para rotina com 1 a 3 horas por dia de exercicio leve.',
  dog_adult_moderate_high_impact: 'Usado quando a rotina tem corrida, treino ou carga mecanica maior.',
  dog_adult_high_activity: 'Pensado para trabalho regular ou exercicio intenso.',
  dog_adult_extreme_activity: 'Perfil avancado e raro, reservado a condicoes extremas.',
  dog_senior_gt_7: 'Senior com monitoracao mais proxima de massa magra e atividade real.',
  dog_growth_curve_8w_4m: 'Fase inicial de crescimento com curva guiada por peso adulto esperado.',
  dog_growth_curve_4_12m: 'Fase de crescimento tardio com revisao da curva e da condicao corporal.',
  dog_gestation_first_4w: 'Gestacao inicial com ajuste energetico discreto.',
  dog_gestation_last_5w: 'Gestacao final com incremento importante da oferta.',
  dog_lactation: 'Lactacao exige numero de filhotes e semana para estimativa adequada.',
  cat_adult_active: 'Perfil para felinos ativos, sem carater indoor predominante.',
  cat_adult_neutered_indoor: 'Perfil clinico de rotina para felinos domiciliados ou castrados.',
  cat_adult_indoor_weight_prone: 'Faixa mais conservadora para felinos indoor de alta eficiencia energetica.',
  cat_growth_0_4m: 'Fase inicial do crescimento felino.',
  cat_growth_4_9m: 'Fase intermediaria do crescimento felino.',
  cat_growth_9_12m: 'Fase final do crescimento felino.',
  cat_gestation: 'Gestacao felina com perfil reprodutivo especifico.',
  cat_lactation: 'Lactacao felina depende do tamanho da ninhada e da semana de oferta.',
}

function getFriendlyLabel(stateId?: string) {
  if (!stateId) return 'Perfil nao definido'
  const state = getPhysiologicStateById(stateId)
  return FRIENDLY_LABELS[stateId] ?? state?.label ?? 'Perfil nao definido'
}

function getFriendlyDescription(stateId?: string) {
  if (!stateId) return 'Preencha os dados clinicos para estimar a energia.'
  return STATE_DESCRIPTIONS[stateId] ?? getPhysiologicStateById(stateId)?.clinicalObservation ?? 'Use a resposta do paciente para ajustar a oferta real.'
}

function resolveCatGrowthState(ageMonths: number) {
  if (ageMonths <= 4) return 'cat_growth_0_4m'
  if (ageMonths <= 9) return 'cat_growth_4_9m'
  return 'cat_growth_9_12m'
}

function getSuggestedStateId(options: {
  species: 'dog' | 'cat'
  ageMonths: number
  ageWeeks: number
  isNeutered: boolean
  isIndoor?: boolean
  bcs: number
  activityHoursPerDay: number
  activityImpact: 'low' | 'high'
  obesityProne: boolean
}) {
  const { species, ageMonths, ageWeeks, isNeutered, isIndoor, bcs, activityHoursPerDay, activityImpact, obesityProne } = options

  if (species === 'dog') {
    if (ageMonths > 0 && ageMonths <= 12) return resolveDogGrowthStateFromAge(ageWeeks)
    if (ageMonths >= 84) return 'dog_senior_gt_7'
    return resolveDogAdultStateFromActivity({
      hoursPerDay: activityHoursPerDay,
      impact: activityImpact,
      obesityProne: obesityProne || isNeutered || bcs >= 7,
    })
  }

  if (ageMonths > 0 && ageMonths <= 12) return resolveCatGrowthState(ageMonths)
  if ((activityHoursPerDay ?? 0) >= 1 && !isIndoor && !isNeutered && bcs < 7 && !obesityProne) return 'cat_adult_active'
  return resolveCatAdultState({ isIndoor, isNeutered, obesityProne: obesityProne || bcs >= 7 })
}

function groupStateLabel(state: PhysiologicState) {
  if (state.id.startsWith('dog_adult_')) return 'Adulto'
  if (state.id.startsWith('cat_adult_')) return 'Adulto'
  if (state.id.includes('growth')) return 'Crescimento'
  if (state.id.includes('gestation') || state.id.includes('lactation')) return 'Reproducao'
  if (state.id.includes('senior')) return 'Senior'
  return state.category
}

export default function EnergyStep() {
  const navigate = useNavigate()
  const { patient, energy, target, setEnergy, setTarget } = useCalculationStore()

  const species = patient.species ?? 'dog'
  const weight = patient.currentWeight ?? 0
  const ageMonths = patient.ageMonths ?? 0
  const ageWeeks = patient.ageWeeks ?? (ageMonths > 0 ? Math.max(1, Math.round(ageMonths * 4.345)) : 0)
  const rer = weight > 0 ? calculateRER(weight, species) : 0
  const states = getPhysiologicStates(species)

  const [activityHoursPerDay, setActivityHoursPerDay] = useState<number>(energy.activityHoursPerDay ?? (species === 'dog' ? 0.5 : 1))
  const [activityImpact, setActivityImpact] = useState<'low' | 'high'>(energy.activityImpact ?? 'low')
  const [obesityProne, setObesityProne] = useState<boolean>(energy.obesityProne ?? !!patient.isNeutered)
  const [specialBreedObservation, setSpecialBreedObservation] = useState<'none' | 'great_dane' | 'newfoundland'>(energy.specialBreedObservation ?? 'none')
  const [expectedAdultWeightKg, setExpectedAdultWeightKg] = useState<number>(energy.expectedAdultWeightKg ?? 0)
  const [litterSize, setLitterSize] = useState<number>(energy.litterSize ?? 0)
  const [lactationWeek, setLactationWeek] = useState<number>(energy.lactationWeek ?? 1)
  const [selectedBaseStateId, setSelectedBaseStateId] = useState<string>(
    energy.stateId && getPhysiologicStateById(energy.stateId)?.species === species ? energy.stateId : getDefaultStateId(species, !!patient.isNeutered),
  )

  const suggestedStateId = useMemo(
    () =>
      getSuggestedStateId({
        species,
        ageMonths,
        ageWeeks,
        isNeutered: !!patient.isNeutered,
        isIndoor: patient.isIndoor,
        bcs: patient.bcs ?? 5,
        activityHoursPerDay,
        activityImpact,
        obesityProne,
      }),
    [activityHoursPerDay, activityImpact, ageMonths, ageWeeks, obesityProne, patient.bcs, patient.isIndoor, patient.isNeutered, species],
  )

  const validBaseStateId = useMemo(() => {
    const current = getPhysiologicStateById(selectedBaseStateId)
    if (current?.species === species) return selectedBaseStateId
    return suggestedStateId
  }, [selectedBaseStateId, species, suggestedStateId])

  const effectiveStateId = useMemo(() => {
    if (species === 'dog' && DOG_AUTO_STATE_IDS.has(validBaseStateId)) {
      return resolveDogAdultStateFromActivity({
        hoursPerDay: activityHoursPerDay,
        impact: activityImpact,
        obesityProne: obesityProne || !!patient.isNeutered || (patient.bcs ?? 5) >= 7,
      })
    }
    if (species === 'cat' && CAT_AUTO_STATE_IDS.has(validBaseStateId)) {
      return resolveCatAdultState({
        isIndoor: patient.isIndoor,
        isNeutered: !!patient.isNeutered,
        obesityProne: obesityProne || (patient.bcs ?? 5) >= 7,
      })
    }
    if (species === 'dog' && DOG_GROWTH_STATE_IDS.has(validBaseStateId)) {
      return resolveDogGrowthStateFromAge(ageWeeks)
    }
    if (species === 'cat' && CAT_GROWTH_STATE_IDS.has(validBaseStateId)) {
      return resolveCatGrowthState(ageMonths)
    }
    return validBaseStateId
  }, [activityHoursPerDay, activityImpact, ageMonths, ageWeeks, obesityProne, patient.bcs, patient.isIndoor, patient.isNeutered, species, validBaseStateId])

  const selectedState: PhysiologicState | undefined = getPhysiologicStateById(effectiveStateId)

  const preview = useMemo(
    () =>
      computePhysiologicEnergy({
        species,
        stateId: effectiveStateId,
        weightKg: weight,
        ageWeeks,
        expectedAdultWeightKg,
        activityHoursPerDay,
        activityImpact,
        obesityProne,
        litterSize,
        lactationWeek,
        specialBreedObservation,
      }),
    [activityHoursPerDay, activityImpact, ageWeeks, effectiveStateId, expectedAdultWeightKg, lactationWeek, litterSize, obesityProne, specialBreedObservation, species, weight],
  )

  const groupedStates = useMemo(() => {
    const groups = new Map<string, PhysiologicState[]>()
    for (const state of states) {
      const label = groupStateLabel(state)
      const current = groups.get(label) ?? []
      current.push(state)
      groups.set(label, current)
    }
    return Array.from(groups.entries())
  }, [states])

  const quickReading = useMemo(() => {
    if (species === 'dog' && DOG_AUTO_STATE_IDS.has(validBaseStateId)) {
      if (obesityProne) return 'Predisposicao a obesidade esta reduzindo a densidade energetica de partida.'
      if (activityHoursPerDay === 0) return 'Sem exercicio regular: o modulo assume um adulto sedentario.'
      if (activityHoursPerDay < 1) return 'Rotina leve: o modulo usa o perfil de baixa atividade.'
      if (activityHoursPerDay <= 3 && activityImpact === 'high') return 'Atividade moderada com alto impacto aplicada em tempo real.'
      if (activityHoursPerDay <= 3) return 'Atividade moderada com baixo impacto aplicada em tempo real.'
      if (activityHoursPerDay <= 6) return 'Alta atividade aplicada em tempo real.'
      return 'Condicao extrema selecionada. Reavalie consumo e desempenho cedo.'
    }
    if (species === 'cat' && CAT_AUTO_STATE_IDS.has(validBaseStateId)) {
      return patient.isIndoor ? 'O perfil felino esta considerando rotina indoor/castrada.' : 'O perfil felino esta considerando um gato ativo.'
    }
    return getFriendlyDescription(effectiveStateId)
  }, [activityHoursPerDay, activityImpact, effectiveStateId, obesityProne, patient.isIndoor, species, validBaseStateId])

  const isMissingRequiredInput =
    !selectedState ||
    weight <= 0 ||
    (selectedState.requiresExpectedAdultWeightKg && expectedAdultWeightKg <= 0) ||
    (selectedState.requiresAgeWeeks && ageWeeks <= 0) ||
    (selectedState.requiresLitterSize && litterSize <= 0) ||
    (selectedState.requiresLactationWeek && lactationWeek <= 0)

  const handleNext = () => {
    if (!selectedState || weight <= 0) return

    setEnergy({
      rer: preview.rer,
      mer: preview.mer,
      merFactor: preview.factor ?? undefined,
      merFormula: preview.formulaLines,
      weightUsed: weight,
      isIdealWeight: target.weightToUseForEnergy === 'target',
      stateId: effectiveStateId,
      ageWeeks: selectedState.requiresAgeWeeks ? ageWeeks : undefined,
      expectedAdultWeightKg: selectedState.requiresExpectedAdultWeightKg ? expectedAdultWeightKg : undefined,
      activityHoursPerDay,
      activityImpact,
      obesityProne,
      specialBreedObservation,
      litterSize: selectedState.requiresLitterSize ? litterSize : undefined,
      lactationWeek: selectedState.requiresLactationWeek ? lactationWeek : undefined,
      gestationPhase:
        effectiveStateId === 'dog_gestation_first_4w'
          ? 'first_4_weeks'
          : effectiveStateId === 'dog_gestation_last_5w'
          ? 'last_5_weeks'
          : undefined,
      energyProfileMode: energy.energyProfileMode ?? 'clinical',
    })
    setTarget({ targetEnergy: preview.mer })
    navigate(`${NEW_ROUTE}/target`)
  }

  return (
    <Card className="w-full border-orange-500/10 bg-gradient-to-b from-card via-card to-card/95 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
      <CardHeader className="border-b border-white/5 pb-6">
        <CardTitle className="text-2xl">Energia</CardTitle>
        <CardDescription>
          A tela abaixo usa um unico perfil clinico final para calcular a energia. O label mostrado e exatamente o label usado na estimativa.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        <div className="grid gap-4 xl:grid-cols-3">
          <div className="rounded-[30px] border border-orange-400/20 bg-gradient-to-br from-orange-500/12 via-orange-500/[0.06] to-transparent p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">RER</p>
                <p className="mt-1 text-4xl font-black text-white" id="energy-rer-value">
                  {rer.toFixed(0)} kcal/dia
                </p>
              </div>
              <div className="rounded-2xl border border-orange-400/30 bg-black/15 p-3 text-orange-300">
                <Scale className="h-7 w-7" />
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Base calculada com o peso corporal atual do paciente.
            </p>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Energia final estimada</p>
                <p className="mt-1 text-4xl font-black text-orange-300" id="energy-preview-kcal">
                  {preview.mer.toFixed(0)} kcal/dia
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/15 p-3 text-white">
                <Activity className="h-7 w-7" />
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              O valor responde no mesmo render ao perfil clinico, atividade, indoor e reproducao.
            </p>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-orange-300" />
              <p className="text-sm font-semibold text-white">Perfil clinico final</p>
            </div>
            <p className="mt-3 text-2xl font-black leading-tight text-white">{getFriendlyLabel(effectiveStateId)}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{quickReading}</p>
          </div>
        </div>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-semibold text-white">Perfil clinico</p>
              <p className="text-sm text-muted-foreground">Escolha o contexto do paciente. Quando o perfil depende de atividade ou indoor, o calculo se ajusta automaticamente.</p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="rounded-full border border-white/10 p-2 text-muted-foreground">
                    <Info className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>A selecao abaixo mostra apenas nomes clinicos. Nenhum id interno aparece para o usuario final.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-3">
              <Label htmlFor="sel-physio">Perfil usado no calculo</Label>
              <Select value={effectiveStateId} onValueChange={(value) => setSelectedBaseStateId(value)}>
                <SelectTrigger id="sel-physio" className="h-auto min-h-14 rounded-2xl border-white/10 bg-black/15 py-4">
                  <span className="block truncate text-left text-sm font-medium text-white">
                    {effectiveStateId ? getFriendlyLabel(effectiveStateId) : 'Selecione o perfil clinico'}
                  </span>
                </SelectTrigger>
                <SelectContent className="max-h-96">
                  {groupedStates.map(([group, items]) => (
                    <div key={group}>
                      <div className="px-2 py-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{group}</div>
                      {items.map((state) => (
                        <SelectItem key={state.id} value={state.id}>
                          {getFriendlyLabel(state.id)}
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{getFriendlyLabel(suggestedStateId)}</Badge>
                {patient.isNeutered && <Badge variant="outline">Castracao considerada</Badge>}
                {species === 'cat' && patient.isIndoor && <Badge variant="outline">Rotina indoor considerada</Badge>}
                {species === 'dog' && DOG_AUTO_STATE_IDS.has(validBaseStateId) && <Badge variant="outline">{activityHoursPerDay.toFixed(1)} h/dia</Badge>}
              </div>
            </div>

            <div className="rounded-2xl border border-orange-400/20 bg-orange-500/[0.08] p-4">
              <p className="font-semibold text-white">Leitura rapida</p>
              <p className="mt-3 text-sm text-white">{getFriendlyLabel(effectiveStateId)}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{getFriendlyDescription(effectiveStateId)}</p>
            </div>
          </div>
        </section>

        {species === 'dog' && DOG_AUTO_STATE_IDS.has(validBaseStateId) && (
          <section className="rounded-[30px] border border-white/10 bg-white/[0.03] p-5">
            <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-4 rounded-2xl border border-white/10 bg-black/10 p-4">
                <div>
                  <p className="font-semibold text-white">Atividade e manejo</p>
                  <p className="text-sm text-muted-foreground">Estas entradas controlam o perfil adulto do cao em tempo real.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="activity-hours">Horas de atividade por dia</Label>
                    <Input
                      id="activity-hours"
                      type="number"
                      min="0"
                      step="0.5"
                      value={activityHoursPerDay || ''}
                      onChange={(event) => setActivityHoursPerDay(Number(event.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de atividade</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: 'low' as const, label: 'Baixo impacto' },
                        { value: 'high' as const, label: 'Alto impacto' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setActivityImpact(option.value)}
                          className={cn(
                            'rounded-xl border px-3 py-3 text-sm transition-all',
                            activityImpact === option.value
                              ? 'border-orange-400/60 bg-orange-500/15 text-white'
                              : 'border-white/10 bg-black/10 text-muted-foreground hover:border-orange-500/30 hover:text-white',
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setObesityProne((value) => !value)}
                    className={cn(
                      'rounded-2xl border px-4 py-4 text-left transition-all',
                      obesityProne ? 'border-orange-400/60 bg-orange-500/12 text-white' : 'border-white/10 bg-black/10 text-muted-foreground',
                    )}
                  >
                    <p className="font-semibold">Predisposto a obesidade</p>
                    <p className="mt-1 text-xs text-muted-foreground">Reduz a oferta de partida quando aplicavel.</p>
                  </button>

                  <div className="space-y-2">
                    <Label>Observacao de raca</Label>
                    <Select value={specialBreedObservation} onValueChange={(value) => setSpecialBreedObservation(value as 'none' | 'great_dane' | 'newfoundland')}>
                      <SelectTrigger className="rounded-xl border-white/10 bg-black/10">
                        <SelectValue placeholder="Nao usar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Nao usar</SelectItem>
                        <SelectItem value="great_dane">Great Dane</SelectItem>
                        <SelectItem value="newfoundland">Newfoundland</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-orange-400/20 bg-orange-500/[0.08] p-4">
                <p className="font-semibold text-white">Como esta sendo lido</p>
                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <p>0 hora/dia = sedentario / sem exercicio regular.</p>
                  <p>Menos de 1 hora/dia = baixa atividade.</p>
                  <p>1 a 3 horas/dia = atividade moderada, com diferenciacao por impacto.</p>
                  <p>3 a 6 horas/dia = alta atividade.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {species === 'cat' && CAT_AUTO_STATE_IDS.has(validBaseStateId) && (
          <section className="rounded-[30px] border border-white/10 bg-white/[0.03] p-5">
            <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-4 rounded-2xl border border-white/10 bg-black/10 p-4">
                <div>
                  <p className="font-semibold text-white">Rotina felina</p>
                  <p className="text-sm text-muted-foreground">Indoor, castracao e atividade mudam a energia no mesmo render.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cat-activity-hours">Horas de atividade por dia</Label>
                    <Input
                      id="cat-activity-hours"
                      type="number"
                      min="0"
                      step="0.5"
                      value={activityHoursPerDay || ''}
                      onChange={(event) => setActivityHoursPerDay(Number(event.target.value) || 0)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setObesityProne((value) => !value)}
                    className={cn(
                      'rounded-2xl border px-4 py-4 text-left transition-all self-end',
                      obesityProne ? 'border-orange-400/60 bg-orange-500/12 text-white' : 'border-white/10 bg-black/10 text-muted-foreground',
                    )}
                  >
                    <p className="font-semibold">Baixa demanda energetica</p>
                    <p className="mt-1 text-xs text-muted-foreground">Aproxima a faixa indoor de menor demanda.</p>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-orange-400/20 bg-orange-500/[0.08] p-4">
                <p className="font-semibold text-white">Leitura felina</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  O modulo separa gato adulto ativo de gato indoor/castrado e tambem oferece uma faixa mais conservadora quando existe alta eficiencia energetica.
                </p>
              </div>
            </div>
          </section>
        )}

        {selectedState?.requiresExpectedAdultWeightKg && (
          <section className="rounded-[30px] border border-white/10 bg-white/[0.03] p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="expected-adult-weight">Peso adulto esperado (kg)</Label>
                <Input
                  id="expected-adult-weight"
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={expectedAdultWeightKg || ''}
                  onChange={(event) => setExpectedAdultWeightKg(Number(event.target.value) || 0)}
                />
              </div>
              <div className="rounded-2xl border border-orange-400/20 bg-orange-500/[0.08] p-4">
                <p className="font-semibold text-white">Crescimento guiado</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  A idade em anos foi convertida internamente para a curva de crescimento. Filhotes nao devem receber oferta ad libitum.
                </p>
              </div>
            </div>
          </section>
        )}

        {selectedState?.requiresLitterSize && (
          <section className="rounded-[30px] border border-white/10 bg-white/[0.03] p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="litter-size">Numero de filhotes</Label>
                <Input id="litter-size" type="number" min="1" step="1" value={litterSize || ''} onChange={(event) => setLitterSize(Number(event.target.value) || 0)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lactation-week">Semana de lactacao</Label>
                <Input id="lactation-week" type="number" min="1" step="1" value={lactationWeek || ''} onChange={(event) => setLactationWeek(Number(event.target.value) || 0)} />
              </div>
            </div>
          </section>
        )}

        <section className="rounded-[30px] border border-orange-400/20 bg-gradient-to-r from-orange-500/12 via-black/10 to-transparent p-5">
          <p className="text-sm font-semibold text-white">Como esta sendo calculado</p>
          <div className="mt-3 space-y-2 rounded-2xl border border-white/10 bg-black/15 p-4">
            {preview.formulaLines.map((line) => (
              <p key={line} className="text-sm text-white">
                {line}
              </p>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{CLINICAL_ENERGY_DISCLAIMER}</p>
        </section>

        <div className="flex justify-between border-t border-white/5 pt-4">
          <Button variant="outline" onClick={() => navigate(`${NEW_ROUTE}/patient`)} className="gap-2">
            <ChevronLeft className="h-4 w-4" /> Anterior
          </Button>
          <Button onClick={handleNext} className="gap-2" id="btn-next-target" disabled={isMissingRequiredInput}>
            Proximo: Meta <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
