import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Info, Scale, Sparkles } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Badge } from '../../components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip'
import { useCalculationStore } from '../../store/calculationStore'
import {
  CLINICAL_ENERGY_DISCLAIMER,
  calculateRER,
  computePhysiologicEnergy,
  getPhysiologicStateById,
} from '../../lib/nutrition'
import { getClinicalProfileBadges, getClinicalProfileIdsFromSelections } from '../../lib/clinicalProfiles'
import { getDefaultRequirement } from '../../lib/genutriData'
import { cn } from '../../lib/utils'

const NEW_ROUTE = '/calculadora-energetica/new'

type EnergyProfileOption = {
  id: string
  label: string
  description: string
}

const DOG_PROFILES: EnergyProfileOption[] = [
  { id: 'dog_puppy_0_4', label: 'Cão filhote 0-4 meses', description: 'Crescimento inicial com curva energética pediátrica.' },
  { id: 'dog_puppy_4_adult', label: 'Cão filhote 4 meses até adulto', description: 'Crescimento tardio até transição para manutenção adulta.' },
  { id: 'dog_adult_intact', label: 'Cão adulto íntegro', description: 'Adulto sem ajuste conservador por castração.' },
  { id: 'dog_adult_neutered', label: 'Cão adulto castrado', description: 'Adulto com perfil energético mais conservador.' },
  { id: 'dog_adult_inactive_obese', label: 'Cão adulto inativo / predisposto à obesidade', description: 'Perfil para baixa demanda energética e risco de sobrepeso.' },
  { id: 'dog_work_light', label: 'Cão adulto trabalho leve', description: 'Demanda de manutenção com atividade leve.' },
  { id: 'dog_work_moderate', label: 'Cão adulto trabalho moderado', description: 'Demanda intermediária para trabalho regular.' },
  { id: 'dog_work_intense', label: 'Cão adulto trabalho intenso', description: 'Demanda elevada para atividade intensa.' },
  { id: 'dog_gestation', label: 'Cão em gestação', description: 'Perfil reprodutivo gestacional.' },
  { id: 'dog_lactation', label: 'Cão em lactação', description: 'Perfil reprodutivo com ajuste por ninhada e semana.' },
]

const CAT_PROFILES: EnergyProfileOption[] = [
  { id: 'cat_kitten', label: 'Gato filhote', description: 'Crescimento felino até o fechamento do primeiro ano.' },
  { id: 'cat_adult_intact', label: 'Gato adulto íntegro', description: 'Adulto sem ajuste conservador de indoor/castração.' },
  { id: 'cat_adult_neutered', label: 'Gato adulto castrado', description: 'Adulto castrado com demanda energética reduzida.' },
  { id: 'cat_adult_indoor_low', label: 'Gato adulto indoor / baixa demanda energética', description: 'Adulto indoor com tendência à eficiência energética.' },
  { id: 'cat_adult_active', label: 'Gato adulto ativo', description: 'Adulto com rotina ativa e maior demanda.' },
  { id: 'cat_gestation', label: 'Gata gestante', description: 'Perfil reprodutivo gestacional para felinos.' },
  { id: 'cat_lactation', label: 'Gata em lactação', description: 'Perfil reprodutivo com ajuste por ninhada e semana.' },
]

function getDefaultProfileId(species: 'dog' | 'cat', ageMonths: number, isNeutered: boolean, isIndoor?: boolean) {
  if (species === 'dog') {
    if (ageMonths > 0 && ageMonths <= 4) return 'dog_puppy_0_4'
    if (ageMonths > 4 && ageMonths <= 12) return 'dog_puppy_4_adult'
    return isNeutered ? 'dog_adult_neutered' : 'dog_adult_intact'
  }

  if (ageMonths > 0 && ageMonths <= 12) return 'cat_kitten'
  if (isIndoor) return 'cat_adult_indoor_low'
  return isNeutered ? 'cat_adult_neutered' : 'cat_adult_intact'
}

function getProfileOptions(species: 'dog' | 'cat') {
  return species === 'dog' ? DOG_PROFILES : CAT_PROFILES
}

function toAgeWeeks(ageMonths: number) {
  if (!Number.isFinite(ageMonths) || ageMonths <= 0) return 0
  return Math.max(1, Math.round(ageMonths * 4.345))
}

function resolveCatGrowthState(ageMonths: number) {
  if (ageMonths <= 4) return 'cat_growth_0_4m'
  if (ageMonths <= 9) return 'cat_growth_4_9m'
  return 'cat_growth_9_12m'
}

function resolveStateFromProfile(options: {
  species: 'dog' | 'cat'
  profileId: string
  ageMonths: number
  isNeutered: boolean
  isIndoor?: boolean
  gestationPhase: 'initial' | 'final'
}) {
  const { species, profileId, ageMonths, isNeutered, isIndoor, gestationPhase } = options
  const adjustments: string[] = []

  if (species === 'dog') {
    if (profileId === 'dog_puppy_0_4') {
      return { stateId: 'dog_growth_curve_8w_4m', label: 'Cão filhote 0-4 meses', adjustments }
    }
    if (profileId === 'dog_puppy_4_adult') {
      return { stateId: 'dog_growth_curve_4_12m', label: 'Cão filhote 4 meses até adulto', adjustments }
    }
    if (profileId === 'dog_adult_neutered') {
      return { stateId: 'dog_adult_low_activity', label: 'Cão adulto castrado', adjustments }
    }
    if (profileId === 'dog_adult_inactive_obese') {
      return { stateId: 'dog_adult_obese_prone', label: 'Cão adulto inativo / predisposto à obesidade', adjustments }
    }
    if (profileId === 'dog_work_light') {
      return { stateId: 'dog_adult_moderate_low_impact', label: 'Cão adulto trabalho leve', adjustments }
    }
    if (profileId === 'dog_work_moderate') {
      return { stateId: 'dog_adult_moderate_high_impact', label: 'Cão adulto trabalho moderado', adjustments }
    }
    if (profileId === 'dog_work_intense') {
      return { stateId: 'dog_adult_high_activity', label: 'Cão adulto trabalho intenso', adjustments }
    }
    if (profileId === 'dog_gestation') {
      return {
        stateId: gestationPhase === 'initial' ? 'dog_gestation_first_4w' : 'dog_gestation_last_5w',
        label: 'Cão em gestação',
        adjustments,
      }
    }
    if (profileId === 'dog_lactation') {
      return { stateId: 'dog_lactation', label: 'Cão em lactação', adjustments }
    }

    if (isNeutered) {
      adjustments.push('Ajuste automático por castração aplicado.')
      return { stateId: 'dog_adult_low_activity', label: 'Cão adulto castrado', adjustments }
    }
    return { stateId: 'dog_adult_moderate_low_impact', label: 'Cão adulto íntegro', adjustments }
  }

  if (profileId === 'cat_kitten') {
    return { stateId: resolveCatGrowthState(ageMonths), label: 'Gato filhote', adjustments }
  }
  if (profileId === 'cat_adult_neutered') {
    return { stateId: 'cat_adult_neutered_indoor', label: 'Gato adulto castrado', adjustments }
  }
  if (profileId === 'cat_adult_indoor_low') {
    return { stateId: 'cat_adult_indoor_weight_prone', label: 'Gato adulto indoor / baixa demanda energética', adjustments }
  }
  if (profileId === 'cat_adult_active') {
    return { stateId: 'cat_adult_active', label: 'Gato adulto ativo', adjustments }
  }
  if (profileId === 'cat_gestation') {
    return { stateId: 'cat_gestation', label: 'Gata gestante', adjustments }
  }
  if (profileId === 'cat_lactation') {
    return { stateId: 'cat_lactation', label: 'Gata em lactação', adjustments }
  }

  if (isIndoor || isNeutered) {
    adjustments.push('Ajuste automático por indoor/castração aplicado.')
    return { stateId: 'cat_adult_neutered_indoor', label: 'Gato adulto castrado', adjustments }
  }
  return { stateId: 'cat_adult_active', label: 'Gato adulto íntegro', adjustments }
}

export default function EnergyStep() {
  const navigate = useNavigate()
  const { patient, energy, target, diet, setEnergy, setTarget, setDiet } = useCalculationStore()

  const species = (patient.species ?? 'dog') as 'dog' | 'cat'
  const weightKg = patient.currentWeight ?? 0
  const ageMonths = patient.ageMonths ?? 0
  const ageWeeks = toAgeWeeks(ageMonths)
  const rer = weightKg > 0 ? calculateRER(weightKg, species) : 0
  const comorbidityLabels = useMemo(() => getClinicalProfileBadges(species, patient.comorbidityIds ?? []), [patient.comorbidityIds, species])
  const additionalRequirementProfileIds = useMemo(
    () => getClinicalProfileIdsFromSelections(species, patient.comorbidityIds ?? []),
    [patient.comorbidityIds, species],
  )

  const profiles = useMemo(() => getProfileOptions(species), [species])
  const defaultProfileId = useMemo(
    () => getDefaultProfileId(species, ageMonths, !!patient.isNeutered, patient.isIndoor),
    [ageMonths, patient.isIndoor, patient.isNeutered, species],
  )

  const [selectedProfileId, setSelectedProfileId] = useState<string>(energy.resolvedEnergyProfileId ?? defaultProfileId)
  const [gestationPhase, setGestationPhase] = useState<'initial' | 'final'>(
    energy.gestationPhase === 'first_4_weeks' ? 'initial' : 'final',
  )
  const [expectedAdultWeightKg, setExpectedAdultWeightKg] = useState<number>(energy.expectedAdultWeightKg ?? 0)
  const [litterSize, setLitterSize] = useState<number>(energy.litterSize ?? 0)
  const [lactationWeek, setLactationWeek] = useState<number>(energy.lactationWeek ?? 1)

  const selectedProfile = profiles.find((item) => item.id === selectedProfileId) ?? profiles[0]

  const resolved = useMemo(
    () =>
      resolveStateFromProfile({
        species,
        profileId: selectedProfile.id,
        ageMonths,
        isNeutered: !!patient.isNeutered,
        isIndoor: patient.isIndoor,
        gestationPhase,
      }),
    [ageMonths, gestationPhase, patient.isIndoor, patient.isNeutered, selectedProfile.id, species],
  )

  const selectedState = getPhysiologicStateById(resolved.stateId)

  const preview = useMemo(
    () =>
      computePhysiologicEnergy({
        species,
        stateId: resolved.stateId,
        weightKg,
        ageWeeks,
        expectedAdultWeightKg,
        litterSize,
        lactationWeek,
      }),
    [ageWeeks, expectedAdultWeightKg, lactationWeek, litterSize, resolved.stateId, species, weightKg],
  )

  const isGrowthProfile = selectedProfile.id === 'dog_puppy_0_4' || selectedProfile.id === 'dog_puppy_4_adult'
  const isLactationProfile = selectedProfile.id === 'dog_lactation' || selectedProfile.id === 'cat_lactation'
  const isGestationProfile = selectedProfile.id === 'dog_gestation'

  const isMissingRequiredInput =
    !selectedState ||
    weightKg <= 0 ||
    (isGrowthProfile && expectedAdultWeightKg <= 0) ||
    (isLactationProfile && litterSize <= 0) ||
    (isLactationProfile && lactationWeek <= 0)

  const handleNext = () => {
    if (isMissingRequiredInput) return
    const defaultRequirement = getDefaultRequirement(species, resolved.stateId, !!patient.isNeutered)

    setEnergy({
      rer: preview.rer,
      mer: preview.mer,
      merFactor: preview.factor ?? undefined,
      merFormula: preview.formulaLines,
      weightUsed: weightKg,
      isIdealWeight: target.weightToUseForEnergy === 'target',
      stateId: resolved.stateId,
      resolvedEnergyProfileId: selectedProfile.id,
      resolvedProfileLabel: resolved.label,
      ageWeeks: isGrowthProfile ? ageWeeks : undefined,
      expectedAdultWeightKg: isGrowthProfile ? expectedAdultWeightKg : undefined,
      litterSize: isLactationProfile ? litterSize : undefined,
      lactationWeek: isLactationProfile ? lactationWeek : undefined,
      gestationPhase:
        isGestationProfile && gestationPhase === 'initial'
          ? 'first_4_weeks'
          : isGestationProfile
          ? 'last_5_weeks'
          : undefined,
      energyProfileMode: 'clinical',
    })

    setDiet({
      requirementProfileId: defaultRequirement?.id,
      additionalRequirementProfileIds,
    })
    setTarget({ targetEnergy: preview.mer })
    navigate(`${NEW_ROUTE}/target`)
  }

  return (
    <Card className="w-full border-orange-500/10 bg-gradient-to-b from-card via-card to-card/95 shadow-[0_18px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
      <CardHeader className="border-b border-border/60 pb-6">
        <CardTitle className="text-2xl">Perfil clínico energético</CardTitle>
        <CardDescription>
          Resolva aqui o perfil energético final. A formulação de alimentos apenas consome este perfil resolvido.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        <div className="grid gap-4 xl:grid-cols-3">
          <div className="rounded-[30px] border border-orange-400/25 bg-gradient-to-br from-orange-500/15 via-orange-500/8 to-transparent p-5 dark:from-orange-500/12 dark:via-orange-500/[0.06]">
            <p className="text-sm text-muted-foreground">RER</p>
            <p className="mt-1 text-4xl font-black text-foreground" id="energy-rer-value">
              {rer.toFixed(0)} kcal/dia
            </p>
            <p className="mt-3 text-xs text-muted-foreground">Base energética pelo peso corporal atual.</p>
          </div>

          <div className="rounded-[30px] border border-border bg-muted/25 p-5 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-orange-600 dark:text-orange-300" />
              <p className="text-sm text-muted-foreground">Energia final estimada</p>
            </div>
            <p
              className="mt-1 text-4xl font-black text-orange-600 dark:text-orange-300"
              id="energy-preview-kcal"
            >
              {preview.mer.toFixed(0)} kcal/dia
            </p>
            <p className="mt-3 text-xs text-muted-foreground">Valor usado diretamente na meta nutricional.</p>
          </div>

          <div className="rounded-[30px] border border-border bg-muted/25 p-5 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-orange-600 dark:text-orange-300" />
              <p className="text-sm font-semibold text-foreground">Perfil final aplicado</p>
            </div>
            <p className="mt-2 text-xl font-black leading-tight text-foreground">{resolved.label}</p>
            <p className="mt-2 text-sm text-muted-foreground">{selectedProfile.description}</p>
          </div>
        </div>

        <section className="rounded-[30px] border border-border bg-muted/25 p-5 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-semibold text-foreground">Perfis energéticos disponíveis</p>
              <p className="text-sm text-muted-foreground">Selecione um perfil em português. Nenhum slug técnico aparece na interface.</p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="rounded-full border border-border p-2 text-muted-foreground dark:border-white/10">
                    <Info className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>A seção 4 não permite escolher perfil energético. Ela usa exatamente o perfil resolvido aqui.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3" id="energy-profile-grid">
            {profiles.map((profile) => {
              const active = selectedProfile.id === profile.id
              return (
                <button
                  key={profile.id}
                  id={`energy-profile-${profile.id}`}
                  type="button"
                  onClick={() => setSelectedProfileId(profile.id)}
                  className={cn(
                    'rounded-2xl border px-4 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.99]',
                    active
                      ? 'border-orange-400/60 bg-orange-500/15 text-foreground shadow-[0_12px_24px_rgba(249,115,22,0.15)] dark:bg-orange-500/12 dark:text-white'
                      : 'border-border bg-muted/40 text-muted-foreground hover:border-orange-500/40 hover:text-foreground dark:border-white/10 dark:bg-black/15 dark:hover:text-white',
                  )}
                >
                  <p className="font-semibold">{profile.label}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{profile.description}</p>
                </button>
              )
            })}
          </div>
        </section>

        <section className="rounded-[30px] border border-border bg-muted/25 p-5 dark:border-white/10 dark:bg-white/[0.03]">
          <p className="text-lg font-semibold text-foreground">Fatores clinicos do paciente</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="outline">{species === 'dog' ? 'Cao' : 'Gato'}</Badge>
            <Badge variant="outline">{patient.isNeutered ? 'Castrado' : 'Integro'}</Badge>
            {species === 'cat' && <Badge variant="outline">{patient.isIndoor ? 'Indoor' : 'Nao indoor'}</Badge>}
            {comorbidityLabels.map((label) => (
              <Badge
                key={label}
                className="rounded-full bg-orange-500/15 text-orange-900 dark:bg-orange-500/12 dark:text-orange-100"
              >
                {label}
              </Badge>
            ))}
          </div>

          {resolved.adjustments.length > 0 && (
            <div className="mt-3 space-y-1 rounded-2xl border border-orange-400/25 bg-orange-500/10 p-3 dark:bg-orange-500/[0.08]">
              {resolved.adjustments.map((item) => (
                <p key={item} className="text-xs text-orange-900 dark:text-orange-100">
                  {item}
                </p>
              ))}
            </div>
          )}
        </section>

        {isGestationProfile && (
          <section className="rounded-[30px] border border-border bg-muted/25 p-5 dark:border-white/10 dark:bg-white/[0.03]">
            <p className="text-lg font-semibold text-foreground">Fase gestacional</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {[
                { value: 'initial' as const, label: 'Inicio da gestacao' },
                { value: 'final' as const, label: 'Final da gestacao' },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setGestationPhase(item.value)}
                  className={cn(
                    'rounded-2xl border px-4 py-4 text-left transition-all',
                    gestationPhase === item.value
                      ? 'border-orange-400/60 bg-orange-500/15 text-foreground dark:bg-orange-500/12 dark:text-white'
                      : 'border-border bg-muted/40 text-muted-foreground hover:border-orange-500/40 hover:text-foreground dark:border-white/10 dark:bg-black/10 dark:hover:text-white',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </section>
        )}

        {isGrowthProfile && (
          <section className="rounded-[30px] border border-border bg-muted/25 p-5 dark:border-white/10 dark:bg-white/[0.03]">
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
              <div className="rounded-2xl border border-orange-400/25 bg-orange-500/10 p-4 dark:bg-orange-500/[0.08]">
                <p className="font-semibold text-foreground">Idade derivada internamente</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Idade em anos da secao 1 foi convertida para {ageWeeks} semanas para a curva de crescimento.
                </p>
              </div>
            </div>
          </section>
        )}

        {isLactationProfile && (
          <section className="rounded-[30px] border border-border bg-muted/25 p-5 dark:border-white/10 dark:bg-white/[0.03]">
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
          </section>
        )}

        <section className="rounded-[30px] border border-orange-400/25 bg-gradient-to-r from-orange-500/12 via-muted/50 to-transparent p-5 dark:via-black/10">
          <p className="text-sm font-semibold text-foreground">Como esta sendo calculado</p>
          <div className="mt-3 space-y-2 rounded-2xl border border-border bg-muted/50 p-4 dark:border-white/10 dark:bg-black/15">
            {preview.formulaLines.map((line) => (
              <p key={line} className="text-sm text-foreground">
                {line}
              </p>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{CLINICAL_ENERGY_DISCLAIMER}</p>
        </section>

        <div className="flex justify-between border-t border-border/60 pt-4">
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
