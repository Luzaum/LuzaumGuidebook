import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity, ChevronLeft, ChevronRight, Info, Sparkles } from 'lucide-react'
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
  resolveCatAdultState,
  resolveDogAdultStateFromActivity,
  resolveDogGrowthStateFromAge,
  getDefaultStateId,
  getPhysiologicStateById,
  getPhysiologicStates,
} from '../../lib/nutrition'
import { PhysiologicState } from '../../types'
import { cn } from '../../lib/utils'

const NEW_ROUTE = '/calculadora-energetica/new'

function getSuggestedStateId(options: {
  species: 'dog' | 'cat'
  ageMonths: number
  ageWeeks?: number
  isNeutered: boolean
  isIndoor?: boolean
  bcs: number
  activityHoursPerDay?: number
  activityImpact?: 'low' | 'high'
  obesityProne?: boolean
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

  if (ageMonths > 0 && ageMonths <= 4) return 'cat_growth_0_4m'
  if (ageMonths > 4 && ageMonths <= 9) return 'cat_growth_4_9m'
  if (ageMonths > 9 && ageMonths <= 12) return 'cat_growth_9_12m'
  if ((activityHoursPerDay ?? 0) >= 1 && !isIndoor && !isNeutered && bcs < 7 && !obesityProne) return 'cat_adult_active'
  return resolveCatAdultState({ isIndoor, isNeutered, obesityProne: obesityProne || bcs >= 7 })
}

export default function EnergyStep() {
  const navigate = useNavigate()
  const { patient, energy, target, setEnergy, setTarget } = useCalculationStore()

  const species = patient.species ?? 'dog'
  const weight = patient.currentWeight ?? 0
  const ageMonths = patient.ageMonths ?? 0
  const ageWeeks = patient.ageWeeks ?? (ageMonths > 0 ? Math.round(ageMonths * 4.345) : 0)
  const rer = weight > 0 ? calculateRER(weight, species) : 0
  const states = getPhysiologicStates(species)
  const [guidelineMode, setGuidelineMode] = useState<'fediaf' | 'clinical'>(energy.energyProfileMode ?? 'fediaf')
  const [activityHoursPerDay, setActivityHoursPerDay] = useState<number>(energy.activityHoursPerDay ?? 1)
  const [activityImpact, setActivityImpact] = useState<'low' | 'high'>(energy.activityImpact ?? 'low')
  const [obesityProne, setObesityProne] = useState<boolean>(energy.obesityProne ?? !!patient.isNeutered)
  const [specialBreedObservation, setSpecialBreedObservation] = useState<'none' | 'great_dane' | 'newfoundland'>(
    energy.specialBreedObservation ?? 'none',
  )
  const suggestedStateId = getSuggestedStateId({
    species,
    ageMonths,
    ageWeeks,
    isNeutered: !!patient.isNeutered,
    isIndoor: patient.isIndoor,
    bcs: patient.bcs ?? 5,
    activityHoursPerDay,
    activityImpact,
    obesityProne,
  })
  const fallbackStateId = getDefaultStateId(species, !!patient.isNeutered)

  const [selectedStateId, setSelectedStateId] = useState<string>(
    energy.stateId && getPhysiologicStateById(energy.stateId)?.species === species ? energy.stateId : suggestedStateId,
  )
  const [expectedAdultWeightKg, setExpectedAdultWeightKg] = useState<number>(energy.expectedAdultWeightKg ?? 0)
  const [litterSize, setLitterSize] = useState<number>(energy.litterSize ?? 0)
  const [lactationWeek, setLactationWeek] = useState<number>(energy.lactationWeek ?? 1)

  useEffect(() => {
    const current = getPhysiologicStateById(selectedStateId)
    if (!current || current.species !== species) {
      setSelectedStateId(suggestedStateId || fallbackStateId)
    }
  }, [fallbackStateId, selectedStateId, species, suggestedStateId])

  useEffect(() => {
    const current = getPhysiologicStateById(selectedStateId)
    if (!current) return

    if (species === 'dog' && current.id.startsWith('dog_adult')) {
      setSelectedStateId(suggestedStateId)
      return
    }

    if (species === 'dog' && current.id.startsWith('dog_growth')) {
      setSelectedStateId(resolveDogGrowthStateFromAge(ageWeeks))
      return
    }

    if (species === 'cat' && current.id.startsWith('cat_adult')) {
      setSelectedStateId(suggestedStateId)
    }
  }, [activityHoursPerDay, activityImpact, ageWeeks, obesityProne, selectedStateId, species, suggestedStateId])

  const selectedState: PhysiologicState | undefined = getPhysiologicStateById(selectedStateId)
  const preview = useMemo(
    () =>
      computePhysiologicEnergy({
        species,
        stateId: selectedStateId,
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
    [activityHoursPerDay, activityImpact, ageWeeks, expectedAdultWeightKg, lactationWeek, litterSize, obesityProne, selectedStateId, specialBreedObservation, species, weight],
  )

  const categories = Array.from(new Set(states.map((state) => state.category)))
  const factorLabel =
    selectedState?.calculationMode === 'kcal_per_metabolic_bw'
      ? `${selectedState.defaultKcalPerMetabolicBw?.toFixed(0)} kcal por peso metabolico`
      : preview.factor != null
      ? `${preview.factor.toFixed(2)} x RER`
      : 'Equacao especifica'

  const calculationSummary = patient.isHospitalized
    ? 'Plano hospitalar ativo: a progressao alimentar aparecera no resumo final.'
    : specialBreedObservation !== 'none'
    ? 'Observacao energetica especial de raca ativada para revisao clinica fina.'
    : selectedState?.clinicalObservation ?? 'Use esta estimativa como ponto de partida e acompanhe o paciente.'

  const handleNext = () => {
    if (!selectedState || weight <= 0) return

    setEnergy({
      rer: preview.rer,
      mer: preview.mer,
      merFactor: preview.factor ?? undefined,
      merFormula: preview.formulaLines,
      weightUsed: weight,
      isIdealWeight: target.weightToUseForEnergy === 'target',
      stateId: selectedStateId,
      ageWeeks: selectedState.requiresAgeWeeks ? ageWeeks : undefined,
      expectedAdultWeightKg: selectedState.requiresExpectedAdultWeightKg ? expectedAdultWeightKg : undefined,
      activityHoursPerDay,
      activityImpact,
      obesityProne,
      specialBreedObservation,
      litterSize: selectedState.requiresLitterSize ? litterSize : undefined,
      lactationWeek: selectedState.requiresLactationWeek ? lactationWeek : undefined,
      gestationPhase:
        selectedStateId === 'dog_gestation_first_4w'
          ? 'first_4_weeks'
          : selectedStateId === 'dog_gestation_last_5w'
          ? 'last_5_weeks'
          : undefined,
      energyProfileMode: guidelineMode,
    })
    setTarget({ targetEnergy: preview.mer })
    navigate(`${NEW_ROUTE}/target`)
  }

  const isMissingRequiredInput =
    !selectedState ||
    weight <= 0 ||
    (selectedState.requiresAgeWeeks && ageWeeks <= 0) ||
    (selectedState.requiresExpectedAdultWeightKg && expectedAdultWeightKg <= 0) ||
    (selectedState.requiresLitterSize && litterSize <= 0) ||
    (selectedState.requiresLactationWeek && lactationWeek <= 0)

  return (
    <Card className="w-full border-orange-500/10 bg-gradient-to-b from-card via-card to-card/95 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
      <CardHeader className="border-b border-white/5 pb-6">
        <CardTitle className="text-2xl">Calculo de energia</CardTitle>
        <CardDescription>RER em destaque, fator fisiologico aplicado e resultado final sincronizado com o plano nutricional.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-orange-400/20 bg-gradient-to-br from-orange-500/12 to-transparent p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">RER</p>
                <p className="mt-1 text-4xl font-black text-white" id="energy-rer-value">{rer.toFixed(0)} kcal/dia</p>
              </div>
              <div className="rounded-2xl border border-orange-400/30 bg-black/15 p-3 text-orange-300">
                <Activity className="h-7 w-7" />
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Calculado a partir do peso atual e usado como base para o ajuste fisiologico do paciente.
            </p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/15 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Formula</p>
              <p className="mt-2 text-lg font-semibold text-white">{species === 'dog' ? '90 x peso^0.75' : '70 x peso^0.67'}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Energia final estimada</p>
                <p className="mt-1 text-4xl font-black text-orange-300" id="energy-preview-kcal">{preview.mer.toFixed(0)} kcal/dia</p>
              </div>
              <Badge className="rounded-full bg-orange-500/15 px-3 py-1 text-orange-200">{factorLabel}</Badge>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                <p className="text-xs text-muted-foreground">Peso usado</p>
                <p className="mt-1 text-lg font-semibold text-white">{weight.toFixed(2)} kg</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                <p className="text-xs text-muted-foreground">Estado clinico</p>
                <p className="mt-1 text-sm font-semibold text-white">{selectedState?.label ?? 'Nao definido'}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                <p className="text-xs text-muted-foreground">Leitura rapida</p>
                <p className="mt-1 text-sm font-semibold text-white">{calculationSummary}</p>
              </div>
            </div>
          </div>
        </div>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-2">
            <div>
              <p className="text-lg font-semibold text-white">Estado fisiologico</p>
              <p className="text-sm text-muted-foreground">As opcoes sao agrupadas por fase clinica para manter a escolha intuitiva.</p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="text-muted-foreground">
                    <Info className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>As sugestoes variam com especie, idade, castracao e condicao corporal. Voce ainda pode trocar manualmente se precisar.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
            <div className="space-y-3">
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  {
                    value: 'fediaf' as const,
                    title: 'Modo FEDIAF',
                    description: 'Usa a referencia oficial de energia como base primaria.',
                  },
                  {
                    value: 'clinical' as const,
                    title: 'Modo clinica',
                    description: 'Mantem a referencia oficial, mas explicita ajustes operacionais da rotina clinica.',
                  },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setGuidelineMode(option.value)}
                    className={cn(
                      'rounded-2xl border px-4 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.99]',
                      guidelineMode === option.value
                        ? 'border-orange-400/60 bg-orange-500/12 text-white'
                        : 'border-white/10 bg-black/10 text-muted-foreground hover:border-orange-500/30 hover:text-white',
                    )}
                  >
                    <p className="font-semibold">{option.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{option.description}</p>
                  </button>
                ))}
              </div>

              <Select value={selectedStateId} onValueChange={setSelectedStateId}>
                <SelectTrigger id="sel-physio" className="h-auto min-h-14 rounded-2xl border-white/10 bg-black/15 py-4">
                  <SelectValue placeholder="Selecione o estado fisiologico" />
                </SelectTrigger>
                <SelectContent className="max-h-96">
                  {categories.map((category) => (
                    <div key={category}>
                      <div className="px-2 py-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                        {category}
                      </div>
                      {states
                        .filter((state) => state.category === category)
                        .map((state) => (
                          <SelectItem key={state.id} value={state.id}>
                            {state.label}
                          </SelectItem>
                        ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Sugestao automatica: {getPhysiologicStateById(suggestedStateId)?.label ?? 'Nao disponivel'}</Badge>
                {patient.isNeutered && <Badge variant="outline">Castracao considerada</Badge>}
                {species === 'cat' && patient.isIndoor && <Badge variant="outline">Indoor considerado</Badge>}
                {patient.ageMonths != null && patient.ageMonths > 0 && <Badge variant="outline">Idade: {patient.ageMonths} meses</Badge>}
                {species === 'dog' && !selectedStateId.startsWith('dog_growth') && <Badge variant="outline">{activityHoursPerDay.toFixed(1)} h/dia</Badge>}
              </div>
            </div>

            <div className="rounded-2xl border border-orange-400/20 bg-orange-500/[0.08] p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-orange-300" />
                <p className="font-semibold text-white">Resumo do perfil</p>
              </div>
              <p className="mt-3 text-sm text-white">{selectedState?.label ?? 'Sem perfil selecionado'}</p>
              <p className="mt-2 text-sm text-muted-foreground">{selectedState?.explanation ?? 'Selecione um estado para ver a explicacao.'}</p>
            </div>
          </div>

          {species === 'dog' && (
            <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4 rounded-2xl border border-white/10 bg-black/10 p-4">
                <div>
                  <p className="font-semibold text-white">Atividade e manejo do adulto</p>
                  <p className="text-sm text-muted-foreground">Horas por dia, impacto e propensao a obesidade sugerem automaticamente o perfil energetico adulto.</p>
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
                    <p className="mt-1 text-xs text-muted-foreground">Prioriza perfis de menor densidade energetica.</p>
                  </button>
                  <div className="space-y-2">
                    <Label>Observacao energetica especial de raca</Label>
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
                <p className="font-semibold text-white">Leitura pratica FEDIAF</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Baixa atividade: &lt; 1 h/dia. Moderada: 1 a 3 h/dia com diferenciacao de impacto. Alta: 3 a 6 h/dia. Extrema: acima disso.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  O bloco de racas especiais e avancado e serve como lembrete clinico para monitoracao mais cautelosa, sem forcar ajuste numerico inventado.
                </p>
              </div>
            </div>
          )}

          {species === 'cat' && (
            <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4 rounded-2xl border border-white/10 bg-black/10 p-4">
                <div>
                  <p className="font-semibold text-white">Perfil energetico felino</p>
                  <p className="text-sm text-muted-foreground">Indoor, castracao, atividade e tendencia a ganho de peso ajudam a escolher o perfil adulto felino.</p>
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
                    <p className="font-semibold">Baixa demanda energetica / obesity-prone</p>
                    <p className="mt-1 text-xs text-muted-foreground">Aproxima o calculo da faixa indoor de menor demanda.</p>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-orange-400/20 bg-orange-500/[0.08] p-4">
                <p className="font-semibold text-white">Leitura pratica felina</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  O app separa gato ativo de gato indoor/castrado e tambem permite uma faixa mais baixa para felinos domiciliados com alta eficiencia energetica.
                </p>
              </div>
            </div>
          )}

          {selectedState?.requiresExpectedAdultWeightKg && (
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
              <div className="space-y-2">
                <Label htmlFor="age-weeks-energy">Idade em semanas</Label>
                <Input
                  id="age-weeks-energy"
                  type="number"
                  min="1"
                  step="1"
                  value={ageWeeks || ''}
                  onChange={() => void 0}
                  disabled
                />
              </div>
              <div className="rounded-2xl border border-orange-400/20 bg-orange-500/[0.08] p-4 md:col-span-2">
                <p className="font-semibold text-white">Curva de crescimento FEDIAF</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Esta modalidade usa peso atual e peso adulto esperado para estimar a energia. Filhotes, especialmente de grande porte, nao devem ser alimentados ad libitum.
                </p>
              </div>
            </div>
          )}

          {species === 'dog' && patient.sex === 'female' && (
            <div className="space-y-3 rounded-2xl border border-white/10 bg-black/10 p-4">
              <div>
                <p className="font-semibold text-white">Reproducao canina</p>
                <p className="text-sm text-muted-foreground">Gestacao e lactacao pedem inputs especificos para sair do modelo simplificado.</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  { id: 'dog_gestation_first_4w', label: 'Gestacao 1-4 semanas' },
                  { id: 'dog_gestation_last_5w', label: 'Gestacao 5-9 semanas' },
                  { id: 'dog_lactation', label: 'Lactacao' },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedStateId(option.id)}
                    className={cn(
                      'rounded-2xl border px-4 py-4 text-left transition-all',
                      selectedStateId === option.id
                        ? 'border-orange-400/60 bg-orange-500/12 text-white'
                        : 'border-white/10 bg-black/10 text-muted-foreground hover:border-orange-500/30 hover:text-white',
                    )}
                  >
                    <p className="font-semibold">{option.label}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {species === 'cat' && patient.sex === 'female' && (
            <div className="space-y-3 rounded-2xl border border-white/10 bg-black/10 p-4">
              <div>
                <p className="font-semibold text-white">Reproducao felina</p>
                <p className="text-sm text-muted-foreground">Gestacao e lactacao felina usam perfis especificos por fase e tamanho da ninhada.</p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { id: 'cat_gestation', label: 'Gestacao' },
                  { id: 'cat_lactation', label: 'Lactacao' },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedStateId(option.id)}
                    className={cn(
                      'rounded-2xl border px-4 py-4 text-left transition-all',
                      selectedStateId === option.id
                        ? 'border-orange-400/60 bg-orange-500/12 text-white'
                        : 'border-white/10 bg-black/10 text-muted-foreground hover:border-orange-500/30 hover:text-white',
                    )}
                  >
                    <p className="font-semibold">{option.label}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedState?.requiresLitterSize && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="litter-size">Numero de filhotes</Label>
                <Input
                  id="litter-size"
                  type="number"
                  min="1"
                  step="1"
                  value={litterSize || ''}
                  onChange={(event) => setLitterSize(Number(event.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lactation-week">Semana de lactacao</Label>
                <Input
                  id="lactation-week"
                  type="number"
                  min="1"
                  step="1"
                  value={lactationWeek || ''}
                  onChange={(event) => setLactationWeek(Number(event.target.value) || 0)}
                />
              </div>
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-orange-400/20 bg-gradient-to-r from-orange-500/12 via-black/10 to-transparent p-5">
          <p className="text-sm font-semibold text-white">Como o modulo esta calculando</p>
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
