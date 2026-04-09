import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, ChevronLeft, ChevronRight, Info, Scale, SlidersHorizontal, Sparkles } from 'lucide-react'
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

const CLINICAL_FACTOR_PRESETS = [0.85, 0.9, 0.95, 1, 1.05, 1.1, 1.15, 1.2] as const

function clampClinicalFactor(raw: number): number {
  if (!Number.isFinite(raw) || raw <= 0) return 1
  return Math.min(3, Math.max(0.05, raw))
}

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

  const [clinicalAdjustEnabled, setClinicalAdjustEnabled] = useState(() => !!energy.clinicalMerAdjustmentEnabled)
  const [clinicalFactorInput, setClinicalFactorInput] = useState(() =>
    energy.clinicalMerAdjustmentFactor != null && energy.clinicalMerAdjustmentFactor > 0
      ? String(energy.clinicalMerAdjustmentFactor)
      : '1',
  )

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

  const merFromProfile = preview.mer
  const parsedClinicalFactor = clampClinicalFactor(parseFloat(clinicalFactorInput.replace(',', '.')))
  const effectiveClinicalFactor = clinicalAdjustEnabled ? parsedClinicalFactor : 1
  const merAfterClinicalAdjust = merFromProfile * effectiveClinicalFactor

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

    const factor = clinicalAdjustEnabled ? parsedClinicalFactor : 1
    const merFinal = merFromProfile * factor
    const formulaLines = [...preview.formulaLines]
    if (clinicalAdjustEnabled && Math.abs(factor - 1) > 1e-6) {
      formulaLines.push(
        `Ajuste clínico manual: ${merFromProfile.toFixed(1)} kcal/dia × ${factor.toFixed(2)} = ${merFinal.toFixed(1)} kcal/dia`,
      )
    }

    setEnergy({
      rer: preview.rer,
      mer: merFinal,
      merFromProfile: merFromProfile,
      merFactor: preview.factor ?? undefined,
      merFormula: formulaLines,
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
      clinicalMerAdjustmentEnabled: clinicalAdjustEnabled && Math.abs(factor - 1) > 1e-6,
      clinicalMerAdjustmentFactor: clinicalAdjustEnabled && Math.abs(factor - 1) > 1e-6 ? factor : undefined,
    })

    setDiet({
      requirementProfileId: defaultRequirement?.id,
      additionalRequirementProfileIds,
    })
    setTarget({ targetEnergy: merFinal })
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
        <details className="rounded-[30px] border border-border bg-muted/20 p-5 dark:border-white/10 dark:bg-white/[0.03]">
          <summary className="cursor-pointer text-base font-semibold text-foreground outline-none">
            Como cada perfil altera a energia final?
          </summary>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">RER</span> (repouso) depende só da espécie e do peso (fórmula
              alométrica). É a base comum a todos os perfis.
            </p>
            <p>
              <span className="font-medium text-foreground">Perfil energético</span> (cada cartão abaixo) escolhe o{' '}
              <em>estado fisiológico</em> FEDIAF: crescimento, castrado, trabalho, gestação, lactação, indoor etc. Esse
              estado define multiplicadores sobre o RER, ou kcal por massa metabólica, ou curvas específicas (filhotes /
              lactação).
            </p>
            <p>
              O resultado é a <span className="font-medium text-foreground">MER do perfil</span> — o valor central do
              cartão laranja. No passo <strong>Meta</strong>, essa energia ainda pode ser multiplicada pela meta (ex. perda
              ou ganho de peso).
            </p>
            <p className="text-xs">
              Opcionalmente, na secção <strong>«Quer mudar a energia em relação ao perfil?»</strong>, pode multiplicar o
              valor por um fator — para casos que o protocolo não cubra por completo (sempre com critério clínico).
            </p>
          </div>
        </details>

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
              {merAfterClinicalAdjust.toFixed(0)} kcal/dia
            </p>
            {clinicalAdjustEnabled && Math.abs(effectiveClinicalFactor - 1) > 1e-6 ? (
              <p className="mt-3 text-xs text-muted-foreground">
                Perfil puro (FEDIAF): <span className="font-medium text-foreground">{merFromProfile.toFixed(0)} kcal/dia</span>
                {' · '}
                Fator ×{effectiveClinicalFactor.toFixed(2)}
              </p>
            ) : (
              <p className="mt-3 text-xs text-muted-foreground">Igual à MER calculada pelo perfil selecionado.</p>
            )}
            <p className="mt-2 text-xs text-muted-foreground">Base para o passo Meta (antes de meta perda/ganho).</p>
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

        <section
          className="rounded-[30px] border border-orange-400/30 bg-orange-500/[0.06] p-5 sm:p-6 dark:border-orange-500/25 dark:bg-orange-500/[0.08]"
          aria-labelledby="energy-adjust-heading"
        >
          <div className="mb-5 text-center sm:text-left">
            <h3 id="energy-adjust-heading" className="text-lg font-bold tracking-tight text-foreground">
              Quer mudar a energia em relação ao perfil?
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Na maioria dos casos, use o valor do perfil. Só personalize se o caso clínico pedir mais ou menos kcal.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Modo de energia">
            <button
              type="button"
              role="radio"
              aria-checked={!clinicalAdjustEnabled}
              onClick={() => setClinicalAdjustEnabled(false)}
              className={cn(
                'flex w-full flex-col items-start gap-3 rounded-2xl border-2 px-4 py-4 text-left transition-all',
                'hover:border-orange-400/50 hover:bg-orange-500/5 dark:hover:bg-orange-500/[0.07]',
                !clinicalAdjustEnabled
                  ? 'border-orange-500 bg-orange-500/15 shadow-[0_0_0_1px_rgba(249,115,22,0.35)] dark:border-orange-400 dark:bg-orange-500/12'
                  : 'border-border bg-card/80 dark:border-white/10 dark:bg-black/20',
              )}
            >
              <div className="flex w-full items-start justify-between gap-2">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                  <CheckCircle2 className="h-6 w-6" aria-hidden />
                </span>
                {!clinicalAdjustEnabled && (
                  <Badge className="shrink-0 border-orange-400/40 bg-orange-500/20 text-orange-900 dark:text-orange-100">
                    Ativo
                  </Badge>
                )}
              </div>
              <div>
                <p className="font-semibold text-foreground">Não — usar só o perfil</p>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">
                  Energia = <strong className="text-foreground">{merFromProfile.toFixed(0)} kcal/dia</strong> (FEDIAF), sem
                  multiplicador extra.
                </p>
              </div>
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={clinicalAdjustEnabled}
              onClick={() => setClinicalAdjustEnabled(true)}
              className={cn(
                'flex w-full flex-col items-start gap-3 rounded-2xl border-2 px-4 py-4 text-left transition-all',
                'hover:border-orange-400/50 hover:bg-orange-500/5 dark:hover:bg-orange-500/[0.07]',
                clinicalAdjustEnabled
                  ? 'border-orange-500 bg-orange-500/15 shadow-[0_0_0_1px_rgba(249,115,22,0.35)] dark:border-orange-400 dark:bg-orange-500/12'
                  : 'border-border bg-card/80 dark:border-white/10 dark:bg-black/20',
              )}
            >
              <div className="flex w-full items-start justify-between gap-2">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 text-orange-800 dark:bg-orange-500/25 dark:text-orange-200">
                  <SlidersHorizontal className="h-6 w-6" aria-hidden />
                </span>
                {clinicalAdjustEnabled && (
                  <Badge className="shrink-0 border-orange-400/40 bg-orange-500/20 text-orange-900 dark:text-orange-100">
                    Ativo
                  </Badge>
                )}
              </div>
              <div>
                <p className="font-semibold text-foreground">Sim — personalizar energia</p>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">
                  Escolha um fator para <strong className="text-foreground">multiplicar</strong> a energia do perfil (ex.{' '}
                  1,10 = +10%, 0,90 = −10%).
                </p>
              </div>
            </button>
          </div>

          {clinicalAdjustEnabled && (
            <div className="mt-5 space-y-4 rounded-2xl border border-orange-400/25 bg-background/80 p-4 dark:border-orange-500/30 dark:bg-black/25">
              <p className="text-sm text-muted-foreground">
                Base do perfil: <strong className="text-foreground">{merFromProfile.toFixed(0)} kcal/dia</strong>. Fator
                entre <strong className="text-foreground">0,05</strong> e <strong className="text-foreground">3,00</strong>.
              </p>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Atalhos</p>
                <div className="flex flex-wrap gap-2">
                  {CLINICAL_FACTOR_PRESETS.map((preset) => (
                    <Button
                      key={preset}
                      type="button"
                      size="sm"
                      variant={Math.abs(parsedClinicalFactor - preset) < 0.001 ? 'default' : 'outline'}
                      className="rounded-full"
                      onClick={() => setClinicalFactorInput(String(preset))}
                    >
                      ×{preset.toFixed(2).replace('.', ',')}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex max-w-xs flex-col gap-2">
                <Label htmlFor="clinical-factor-input">Fator (multiplicador)</Label>
                <Input
                  id="clinical-factor-input"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={clinicalFactorInput}
                  onChange={(e) => setClinicalFactorInput(e.target.value)}
                  placeholder="Ex: 1,1 ou 0,9"
                  className="font-mono text-base h-11"
                />
              </div>
              <p className="rounded-xl border border-orange-400/30 bg-orange-500/10 px-4 py-3 text-sm dark:bg-orange-500/[0.12]">
                Resultado:{' '}
                <span className="text-lg font-black text-orange-700 dark:text-orange-300">
                  {merAfterClinicalAdjust.toFixed(0)} kcal/dia
                </span>
                {Math.abs(effectiveClinicalFactor - 1) > 1e-6 && (
                  <span className="text-muted-foreground">
                    {' '}
                    ({((effectiveClinicalFactor - 1) * 100).toFixed(1)}% em relação ao perfil)
                  </span>
                )}
              </p>
            </div>
          )}
        </section>

        <section className="rounded-[30px] border border-border bg-muted/25 p-5 dark:border-white/10 dark:bg-white/[0.03]">
          <p className="text-lg font-semibold text-foreground">Fatores clínicos do paciente</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="outline">{species === 'dog' ? 'Cão' : 'Gato'}</Badge>
            <Badge variant="outline">{patient.isNeutered ? 'Castrado' : 'Íntegro'}</Badge>
            {species === 'cat' && <Badge variant="outline">{patient.isIndoor ? 'Indoor' : 'Não indoor'}</Badge>}
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
