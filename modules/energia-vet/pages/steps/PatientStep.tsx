import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Mars, UserRoundPlus, Venus, Zap } from 'lucide-react'
import { toast } from 'sonner'
import { ComorbidityPicker } from '../../components/ComorbidityPicker'
import { SpeciesPickerCard } from '../../components/SpeciesSilhouette'
import { cn } from '../../lib/utils'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { LocalizedNumberInput } from '../../components/ui/localized-number-input'
import { Label } from '../../components/ui/label'
import { useCalculationStore } from '../../store/calculationStore'
import { getDefaultStateId } from '../../lib/nutrition'
import { getClinicalProfileIdsFromSelections, getClinicalProfileOptions, type ClinicalProfileOption } from '../../lib/clinicalProfiles'
import { getDefaultRequirement } from '../../lib/genutriData'
import {
  isCalculationEngineV3Enabled,
  validatePatientStepForV3,
} from '../../lib/nutritionCalculationBridge'
import { mapComorbiditySelectionsToTherapeuticProfiles } from '../../lib/clinical/comorbidityResolver'
import { getTherapeuticProfileById } from '../../lib/clinical/therapeuticProfiles'
import { getEvidenceSourceById } from '../../lib/clinical/evidenceResolver'
import { Species, MuscleCondition } from '../../types'
import { DOG_BREEDS_BR, CAT_BREEDS_BR } from '../../lib/breedOptions'

const NEW_ROUTE = '/calculadora-energetica/new'

const SPECIES_OPTIONS = [
  { value: 'dog' as const, title: 'Cão' },
  { value: 'cat' as const, title: 'Gato' },
]

const SEX_OPTIONS = [
  { value: 'male' as const, label: 'Macho', icon: Mars },
  { value: 'female' as const, label: 'Fêmea', icon: Venus },
]

const EMC_OPTIONS: Array<{ value: MuscleCondition; label: string; detail: string }> = [
  { value: 'normal', label: 'Normal', detail: 'Massa muscular preservada.' },
  { value: 'mild_loss', label: 'Perda leve', detail: 'Leve redução muscular.' },
  { value: 'moderate_loss', label: 'Perda moderada', detail: 'Atrofia visível em grupos principais.' },
  { value: 'severe_loss', label: 'Perda acentuada', detail: 'Atrofia marcada — priorizar suporte proteico.' },
]

type ComorbidityCategory = 'renal' | 'digestive' | 'metabolic' | 'allergy' | 'systemic'

function normalizeSearchText(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

function getComorbidityCategory(option: ClinicalProfileOption): ComorbidityCategory {
  const text = normalizeSearchText(`${option.label} ${option.description}`)
  if (/renal|urolit|estruv|oxalato|urin/.test(text)) return 'renal'
  if (/intestinal|pancre|ileo|linfang|hepat|digest/.test(text)) return 'digestive'
  if (/diabet|hiperlipid|obes/.test(text)) return 'metabolic'
  if (/alerg|reacao/.test(text)) return 'allergy'
  return 'systemic'
}

function buildComorbidityGuidance(species: Species, option: ClinicalProfileOption) {
  const mappedIds = mapComorbiditySelectionsToTherapeuticProfiles(species, [option.id])
  const profiles = mappedIds
    .map((profileId) => getTherapeuticProfileById(profileId))
    .filter((profile): profile is NonNullable<typeof profile> => Boolean(profile))

  if (!profiles.length) {
    return {
      summary: `Esta condição ativa as metas nutricionais cadastradas para ${option.label}. A composição será conferida na formulação final.`,
      priorities: [] as string[],
      sources: [] as string[],
    }
  }

  const priorities = Array.from(new Set(profiles.flatMap((profile) => profile.desiredCharacteristics))).slice(0, 3)
  const sources = Array.from(
    new Set(
      profiles
        .flatMap((profile) => profile.evidenceSourceIds)
        .map((id) => getEvidenceSourceById(id)?.title)
        .filter((title): title is string => Boolean(title)),
    ),
  )
  return {
    summary: profiles.map((profile) => profile.clinicalContext).filter(Boolean).join(' '),
    priorities,
    sources,
  }
}

export default function PatientStep() {
  const navigate = useNavigate()
  const { patient, energy, diet, setPatient, setEnergy, setDiet } = useCalculationStore()
  const species = patient.species ?? 'dog'
  const registrationMode = patient.registrationMode ?? 'registered'
  const v3Enabled = isCalculationEngineV3Enabled()
  const isPuppy = (patient.ageMonths ?? 0) < 12
  const dietHistory = patient.dietHistory
  const documentedIntakeKcal =
    (dietHistory?.mainFoodKcalPerDay ?? 0) +
    (dietHistory?.treatsKcalPerDay ?? 0) +
    (dietHistory?.chewsKcalPerDay ?? 0) +
    (dietHistory?.medicationVehicleKcalPerDay ?? 0) +
    (dietHistory?.supplementsKcalPerDay ?? 0)

  const updateDietHistory = (patch: Partial<NonNullable<typeof patient.dietHistory>>) => {
    setPatient({
      dietHistory: {
        documented: dietHistory?.documented ?? false,
        ...dietHistory,
        ...patch,
      },
    })
  }

  const breeds = useMemo(
    () => [...(species === 'cat' ? CAT_BREEDS_BR : DOG_BREEDS_BR)].sort((left, right) => left.localeCompare(right, 'pt-BR')),
    [species],
  )
  const availableComorbidities = useMemo(() => getClinicalProfileOptions(species), [species])
  const selectedComorbidityIds = patient.comorbidityIds ?? []

  useEffect(() => {
    const validSelections = selectedComorbidityIds.filter((selection) =>
      availableComorbidities.some((option) => option.id === selection),
    )

    if (validSelections.length !== selectedComorbidityIds.length) {
      setPatient({ comorbidityIds: validSelections })
    }

    const additionalRequirementProfileIds = getClinicalProfileIdsFromSelections(species, validSelections)
    const fallbackRequirement = getDefaultRequirement(species, energy.stateId, !!patient.isNeutered)
    const currentAdditional = diet.additionalRequirementProfileIds ?? []
    const additionalChanged =
      currentAdditional.length !== additionalRequirementProfileIds.length ||
      currentAdditional.some((id, index) => id !== additionalRequirementProfileIds[index])

    if (!diet.requirementProfileId && fallbackRequirement?.id) {
      setDiet({ requirementProfileId: fallbackRequirement.id, additionalRequirementProfileIds })
      return
    }

    if (additionalChanged) setDiet({ additionalRequirementProfileIds })
  }, [availableComorbidities, diet.additionalRequirementProfileIds, diet.requirementProfileId, energy.stateId, patient.isNeutered, selectedComorbidityIds, setDiet, setPatient, species])

  const handleSpeciesChange = (nextSpecies: Species) => {
    if (nextSpecies === species) return
    const nextStateId = getDefaultStateId(nextSpecies, !!patient.isNeutered)
    const nextRequirement = getDefaultRequirement(nextSpecies, nextStateId, !!patient.isNeutered)
    setPatient({ species: nextSpecies, breed: '', isIndoor: false, comorbidityIds: [] })
    setEnergy({ stateId: nextStateId, expectedAdultWeightKg: undefined, litterSize: undefined, lactationWeek: undefined })
    setDiet({ requirementProfileId: nextRequirement?.id, additionalRequirementProfileIds: [], entries: [] })
  }

  const handleNeuterChange = (checked: boolean) => {
    const nextStateId = getDefaultStateId(species, checked)
    const nextRequirement = getDefaultRequirement(species, nextStateId, checked)
    setPatient({ isNeutered: checked })
    setEnergy({ stateId: nextStateId })
    setDiet({ requirementProfileId: nextRequirement?.id })
  }

  const toggleComorbidity = (optionId: string) => {
    const current = new Set(selectedComorbidityIds)
    if (current.has(optionId)) current.delete(optionId)
    else current.add(optionId)
    setPatient({ comorbidityIds: Array.from(current) })
  }

  const handleNext = () => {
    if (v3Enabled) {
      const issues = validatePatientStepForV3(patient)
      if (issues.length > 0) {
        toast.error(issues[0].message)
        return
      }
    } else if (!patient.currentWeight || patient.currentWeight <= 0) {
      toast.error('Informe o peso atual do paciente para continuar.')
      return
    }

    const nextStateId = energy.stateId ?? getDefaultStateId(species, !!patient.isNeutered)
    const nextRequirement = getDefaultRequirement(species, nextStateId, !!patient.isNeutered)
    setEnergy({
      stateId: nextStateId,
      expectedAdultWeightKg: patient.expectedAdultWeightKg,
      activityHoursPerDay: patient.activityHoursPerDay,
      activityImpact: patient.activityImpact,
    })
    setDiet({
      requirementProfileId: diet.requirementProfileId ?? nextRequirement?.id,
      additionalRequirementProfileIds: getClinicalProfileIdsFromSelections(species, selectedComorbidityIds),
    })
    navigate(`${NEW_ROUTE}/energy`)
  }

  return (
    <Card className="nutrition-step-card w-full">
      <CardHeader className="border-b border-border/70 pb-6">
        <div>
          <CardTitle className="text-2xl">Identificação do paciente</CardTitle>
          <CardDescription>Registre os dados essenciais que serão usados no cálculo e na avaliação nutricional.</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 pt-6">
        <section>
          <Label>Como deseja começar?</Label>
          <div className="mt-3 grid gap-3 md:grid-cols-2" role="radiogroup" aria-label="Tipo de atendimento nutricional">
            {[
              { value: 'registered' as const, title: 'Cadastrar paciente', description: 'Identifica o paciente e permite salvar o plano no histórico.', icon: UserRoundPlus },
              { value: 'quick' as const, title: 'Dieta rápida', description: 'Calcula a dieta sem criar cadastro ou histórico de paciente.', icon: Zap },
            ].map((option) => {
              const Icon = option.icon
              const active = registrationMode === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setPatient({ registrationMode: option.value })}
                  className={cn(
                    'flex min-h-20 cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-left outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/25',
                    active ? 'border-primary/50 bg-primary/[0.07]' : 'border-border bg-card hover:border-primary/25 hover:bg-muted/55',
                  )}
                >
                  <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">{option.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">{option.description}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        <section>
          <Label>Espécie</Label>
          <div className="mt-3 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Espécie do paciente">
            {SPECIES_OPTIONS.map((option) => (
              <SpeciesPickerCard
                key={option.value}
                species={option.value}
                title={option.title}
                active={species === option.value}
                onSelect={() => handleSpeciesChange(option.value)}
              />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-muted/35 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            {registrationMode === 'registered' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="pat-name">Nome do paciente</Label>
                  <Input id="pat-name" value={patient.name || ''} onChange={(event) => setPatient({ name: event.target.value })} placeholder="Ex.: Rex" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pat-owner">Tutor</Label>
                  <Input id="pat-owner" value={patient.ownerName || ''} onChange={(event) => setPatient({ ownerName: event.target.value })} placeholder="Nome do responsável" />
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="pat-weight">Peso atual (kg)</Label>
              <LocalizedNumberInput id="pat-weight" min={0.1} value={patient.currentWeight || null} onValueChange={(value) => setPatient({ currentWeight: value ?? 0 })} placeholder="Ex.: 12,4" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pat-age">Idade (anos)</Label>
              <LocalizedNumberInput
                id="pat-age"
                min="0"
                value={patient.ageMonths != null ? Math.round((patient.ageMonths / 12) * 10) / 10 : null}
                onValueChange={(value) => {
                  const years = value ?? 0
                  setPatient({ ageMonths: Math.round(years * 12), ageWeeks: Math.round(years * 52) })
                }}
                placeholder="Ex.: 2"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="pat-breed">Raça</Label>
              <div className="relative">
                <select
                  id="pat-breed"
                  value={patient.breed || ''}
                  onChange={(event) => setPatient({ breed: event.target.value })}
                  className="h-11 w-full appearance-none rounded-xl border border-input bg-card px-3 pr-10 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/20"
                >
                  <option value="">Selecione a raça</option>
                  {patient.breed && !breeds.includes(patient.breed) && <option value={patient.breed}>{patient.breed}</option>}
                  {breeds.map((breed) => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))}
                </select>
                <ChevronRight className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 rotate-90 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <Label>Sexo</Label>
              <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Sexo do paciente">
                {SEX_OPTIONS.map((option) => {
                  const Icon = option.icon
                  const active = patient.sex === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setPatient({ sex: option.value })}
                      className={cn(
                        'flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/25',
                        active ? 'border-primary/50 bg-primary/[0.08] text-primary' : 'border-border bg-card text-muted-foreground hover:bg-muted',
                      )}
                    >
                      <Icon className="h-4 w-4" /> {option.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Estado reprodutivo</Label>
              <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Estado reprodutivo">
                {[
                  { value: false, label: 'Não castrado' },
                  { value: true, label: 'Castrado' },
                ].map((option) => {
                  const active = Boolean(patient.isNeutered) === option.value
                  return (
                    <button
                      key={String(option.value)}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => handleNeuterChange(option.value)}
                      className={cn(
                        'flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-3 text-sm font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/25',
                        active ? 'border-primary/50 bg-primary/[0.08] text-primary' : 'border-border bg-card text-muted-foreground hover:bg-muted',
                      )}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {species === 'cat' && (
              <div className="space-y-3 md:col-span-2">
                <Label>Rotina do gato</Label>
                <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Rotina do gato">
                  {[
                    { value: false, label: 'Ativo / acesso externo' },
                    { value: true, label: 'Indoor' },
                  ].map((option) => {
                    const active = Boolean(patient.isIndoor) === option.value
                    return (
                      <button
                        key={String(option.value)}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setPatient({ isIndoor: option.value })}
                        className={cn(
                          'flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-3 text-sm font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/25',
                          active ? 'border-primary/50 bg-primary/[0.08] text-primary' : 'border-border bg-card text-muted-foreground hover:bg-muted',
                        )}
                      >
                        {option.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {v3Enabled && (
          <section className="space-y-5 rounded-2xl border border-primary/20 bg-primary/[0.04] p-5">
            <div>
              <h2 className="text-base font-semibold">Avaliação clínica (EMC e atividade)</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Dados usados pelo motor energético para calibrar manutenção, perda ou ganho de peso.
              </p>
            </div>

            <div className="space-y-3">
              <Label>Escore de massa muscular (EMC)</Label>
              <div className="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Condição de massa muscular">
                {EMC_OPTIONS.map((option) => {
                  const active = (patient.muscleCondition ?? 'normal') === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setPatient({ muscleCondition: option.value })}
                      className={cn(
                        'cursor-pointer rounded-xl border px-3 py-2 text-left outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/25',
                        active ? 'border-primary/50 bg-primary/[0.08]' : 'border-border bg-card hover:border-primary/25',
                      )}
                    >
                      <span className="block text-sm font-semibold">{option.label}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{option.detail}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pat-activity-hours">Horas de atividade por dia</Label>
                <LocalizedNumberInput
                  id="pat-activity-hours"
                  min={0}
                  max={24}
                  value={patient.activityHoursPerDay ?? 1}
                  onValueChange={(value) => setPatient({ activityHoursPerDay: value ?? 0 })}
                  placeholder="Ex.: 1,5"
                />
              </div>
              {species === 'dog' && (
                <div className="space-y-3">
                  <Label>Intensidade predominante</Label>
                  <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Intensidade da atividade">
                    {[
                      { value: 'low' as const, label: 'Baixo impacto' },
                      { value: 'high' as const, label: 'Alto impacto' },
                    ].map((option) => {
                      const active = (patient.activityImpact ?? 'low') === option.value
                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => setPatient({ activityImpact: option.value })}
                          className={cn(
                            'flex min-h-11 cursor-pointer items-center justify-center rounded-xl border px-3 text-sm font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/25',
                            active ? 'border-primary/50 bg-primary/[0.08] text-primary' : 'border-border bg-card text-muted-foreground hover:bg-muted',
                          )}
                        >
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {isPuppy && (
              <div className="space-y-2">
                <Label htmlFor="pat-adult-weight">Peso adulto esperado (kg)</Label>
                <LocalizedNumberInput
                  id="pat-adult-weight"
                  min={0.1}
                  value={patient.expectedAdultWeightKg ?? null}
                  onValueChange={(value) => setPatient({ expectedAdultWeightKg: value ?? undefined })}
                  placeholder="Ex.: 28"
                />
                <p className="text-xs text-muted-foreground">Obrigatório para filhotes — usado nas equações de crescimento.</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="pat-previous-weight">Peso saudável anterior (kg)</Label>
              <LocalizedNumberInput
                id="pat-previous-weight"
                min={0.1}
                value={patient.previousHealthyWeightKg ?? null}
                onValueChange={(value) => setPatient({ previousHealthyWeightKg: value ?? undefined })}
                placeholder="Opcional — útil em recuperação de peso"
              />
            </div>
          </section>
        )}

        {v3Enabled && (
          <section className="space-y-4 rounded-2xl border border-border bg-muted/25 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-base font-semibold">Histórico alimentar atual</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Se a ingestão estiver estável e documentada, o motor pode calibrar a meta pela ingestão real (PNA).
                </p>
              </div>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!dietHistory?.documented}
                  onChange={(event) =>
                    updateDietHistory({
                      documented: event.target.checked,
                      reliable: event.target.checked ? dietHistory?.reliable : undefined,
                      weightStable: event.target.checked ? dietHistory?.weightStable : undefined,
                    })
                  }
                  className="h-4 w-4 accent-primary"
                />
                Documentar ingestão
              </label>
            </div>

            {dietHistory?.documented && (
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={!!dietHistory.reliable}
                    onChange={(event) => updateDietHistory({ reliable: event.target.checked })}
                    className="mt-0.5 h-4 w-4 accent-primary"
                  />
                  <span>
                    <span className="font-semibold">Registro confiável</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">Porções medidas ou pesadas pelo tutor/clínica.</span>
                  </span>
                </label>
                <label className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={!!dietHistory.weightStable}
                    onChange={(event) => updateDietHistory({ weightStable: event.target.checked })}
                    className="mt-0.5 h-4 w-4 accent-primary"
                  />
                  <span>
                    <span className="font-semibold">Peso estável</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">Sem perda ou ganho relevante no período registrado.</span>
                  </span>
                </label>
                <div className="space-y-2">
                  <Label htmlFor="diet-days">Dias registrados</Label>
                  <LocalizedNumberInput
                    id="diet-days"
                    min={1}
                    value={dietHistory.daysRecorded ?? null}
                    onValueChange={(value) => updateDietHistory({ daysRecorded: value ?? undefined })}
                    placeholder="Ex.: 7"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diet-main-kcal">Dieta principal (kcal/dia)</Label>
                  <LocalizedNumberInput
                    id="diet-main-kcal"
                    min={0}
                    value={dietHistory.mainFoodKcalPerDay ?? null}
                    onValueChange={(value) => updateDietHistory({ mainFoodKcalPerDay: value ?? undefined })}
                    placeholder="Ex.: 420"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diet-treats">Petiscos (kcal/dia)</Label>
                  <LocalizedNumberInput
                    id="diet-treats"
                    min={0}
                    value={dietHistory.treatsKcalPerDay ?? null}
                    onValueChange={(value) => updateDietHistory({ treatsKcalPerDay: value ?? undefined })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diet-chews">Ossos/mastigáveis (kcal/dia)</Label>
                  <LocalizedNumberInput
                    id="diet-chews"
                    min={0}
                    value={dietHistory.chewsKcalPerDay ?? null}
                    onValueChange={(value) => updateDietHistory({ chewsKcalPerDay: value ?? undefined })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diet-med-kcal">Veículo medicamentoso (kcal/dia)</Label>
                  <LocalizedNumberInput
                    id="diet-med-kcal"
                    min={0}
                    value={dietHistory.medicationVehicleKcalPerDay ?? null}
                    onValueChange={(value) => updateDietHistory({ medicationVehicleKcalPerDay: value ?? undefined })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diet-sup-kcal">Suplementos (kcal/dia)</Label>
                  <LocalizedNumberInput
                    id="diet-sup-kcal"
                    min={0}
                    value={dietHistory.supplementsKcalPerDay ?? null}
                    onValueChange={(value) => updateDietHistory({ supplementsKcalPerDay: value ?? undefined })}
                  />
                </div>
                {documentedIntakeKcal > 0 && (
                  <p className="md:col-span-2 text-sm text-muted-foreground">
                    Ingestão total documentada: <strong className="text-foreground">{documentedIntakeKcal.toFixed(0)} kcal/dia</strong>
                  </p>
                )}
              </div>
            )}
          </section>
        )}

        <ComorbidityPicker
          options={availableComorbidities}
          selectedIds={selectedComorbidityIds}
          onToggle={toggleComorbidity}
          onClear={() => setPatient({ comorbidityIds: [] })}
          getCategory={getComorbidityCategory}
          buildGuidance={(option) => buildComorbidityGuidance(species, option)}
        />

        <div className="flex justify-end border-t border-border/60 pt-4">
          <Button onClick={handleNext} className="gap-2" id="btn-next-energy">
            Próximo: Energia <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
