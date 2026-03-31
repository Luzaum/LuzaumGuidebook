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
  isNeutered: boolean
  bcs: number
}) {
  const { species, ageMonths, isNeutered, bcs } = options

  if (species === 'dog') {
    if (ageMonths > 0 && ageMonths <= 12) return 'dog_growth_0_12m'
    if (ageMonths >= 84) return 'dog_senior_gt_7'
    if (isNeutered || bcs >= 7) return 'dog_adult_low_activity'
    return 'dog_adult_moderate'
  }

  if (ageMonths > 0 && ageMonths <= 4) return 'cat_growth_0_4m'
  if (ageMonths > 4 && ageMonths <= 9) return 'cat_growth_4_9m'
  if (ageMonths > 9 && ageMonths <= 12) return 'cat_growth_9_12m'
  return isNeutered || bcs >= 7 ? 'cat_adult_neutered_indoor' : 'cat_adult_active'
}

export default function EnergyStep() {
  const navigate = useNavigate()
  const { patient, energy, target, setEnergy, setTarget } = useCalculationStore()

  const species = patient.species ?? 'dog'
  const weight = patient.currentWeight ?? 0
  const ageMonths = patient.ageMonths ?? 0
  const rer = weight > 0 ? calculateRER(weight, species) : 0
  const states = getPhysiologicStates(species)
  const suggestedStateId = getSuggestedStateId({
    species,
    ageMonths,
    isNeutered: !!patient.isNeutered,
    bcs: patient.bcs ?? 5,
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

  const selectedState: PhysiologicState | undefined = getPhysiologicStateById(selectedStateId)
  const preview = useMemo(
    () =>
      computePhysiologicEnergy({
        species,
        stateId: selectedStateId,
        weightKg: weight,
        expectedAdultWeightKg,
        litterSize,
        lactationWeek,
      }),
    [expectedAdultWeightKg, lactationWeek, litterSize, selectedStateId, species, weight],
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
      expectedAdultWeightKg: selectedState.requiresExpectedAdultWeightKg ? expectedAdultWeightKg : undefined,
      litterSize: selectedState.requiresLitterSize ? litterSize : undefined,
      lactationWeek: selectedState.requiresLactationWeek ? lactationWeek : undefined,
    })
    setTarget({ targetEnergy: preview.mer })
    navigate(`${NEW_ROUTE}/target`)
  }

  const isMissingRequiredInput =
    !selectedState ||
    weight <= 0 ||
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
                <p className="mt-1 text-4xl font-black text-white">{rer.toFixed(0)} kcal/dia</p>
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
                <p className="mt-1 text-4xl font-black text-orange-300">{preview.mer.toFixed(0)} kcal/dia</p>
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
                {patient.ageMonths != null && patient.ageMonths > 0 && <Badge variant="outline">Idade: {patient.ageMonths} meses</Badge>}
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

          {selectedState?.requiresExpectedAdultWeightKg && (
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
