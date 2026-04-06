import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  ChevronRight,
  HeartPulse,
  Home,
  Mars,
  Search,
  Stethoscope,
  Venus,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '../../lib/utils'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Badge } from '../../components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip'
import { useCalculationStore } from '../../store/calculationStore'
import { calculateRefeedingRisk, getDefaultStateId } from '../../lib/nutrition'
import { getClinicalProfileBadges, getClinicalProfileIdsFromSelections, getClinicalProfileOptions } from '../../lib/clinicalProfiles'
import { getDefaultRequirement } from '../../lib/genutriData'
import { Species } from '../../types'
import { DOG_BREEDS_BR, CAT_BREEDS_BR } from '../../../receituario-vet/rxReferenceData'

const NEW_ROUTE = '/calculadora-energetica/new'

const SPECIES_OPTIONS = [
  {
    value: 'dog' as const,
    title: 'CÃO',
    subtitle: 'Perfis caninos, guia ECC do cão e alimentos compatíveis.',
    photo: '/foto-cao.jpg',
    emoji: '🐕',
    fallbackGradient: 'from-amber-900/80 via-orange-950/90 to-neutral-950',
  },
  {
    value: 'cat' as const,
    title: 'GATO',
    subtitle: 'Perfis felinos, guia ECC do gato e catálogo filtrado.',
    photo: '/foto-gato.jpg',
    emoji: '🐈',
    fallbackGradient: 'from-slate-700/80 via-slate-900/90 to-neutral-950',
  },
]

const SEX_OPTIONS = [
  { value: 'male' as const, label: 'Macho', icon: Mars },
  { value: 'female' as const, label: 'Fêmea', icon: Venus },
]

const HOSPITAL_ROUTE_OPTIONS = [
  { value: 'oral', label: 'Via oral' },
  { value: 'tube', label: 'Sonda' },
  { value: 'parenteral', label: 'Parenteral' },
]

export default function PatientStep() {
  const navigate = useNavigate()
  const { patient, energy, diet, hospital, setPatient, setEnergy, setDiet, setHospital } = useCalculationStore()
  const species = patient.species ?? 'dog'
  const [comorbidityQuery, setComorbidityQuery] = useState('')

  const breeds = species === 'cat' ? CAT_BREEDS_BR : DOG_BREEDS_BR
  const availableComorbidities = useMemo(() => getClinicalProfileOptions(species), [species])
  const filteredComorbidities = useMemo(() => {
    const query = comorbidityQuery.trim().toLowerCase()
    if (!query) return availableComorbidities
    return availableComorbidities.filter((option) =>
      [option.label, option.description, option.tags.join(' ')].join(' ').toLowerCase().includes(query),
    )
  }, [availableComorbidities, comorbidityQuery])
  const selectedComorbidityIds = patient.comorbidityIds ?? []
  const selectedComorbidityBadges = useMemo(
    () => getClinicalProfileBadges(species, selectedComorbidityIds),
    [selectedComorbidityIds, species],
  )

  const electrolytesLow =
    (hospital.electrolytes?.phosphorus ?? 1) < 1 ||
    (hospital.electrolytes?.potassium ?? 1) < 1 ||
    (hospital.electrolytes?.magnesium ?? 1) < 1

  const refeedingRisk = patient.isHospitalized
    ? calculateRefeedingRisk(
        hospital.daysAnorexic ?? 0,
        hospital.daysHyporexic ?? 0,
        hospital.recentIntakePercent ?? 100,
        patient.bcs ?? 5,
        electrolytesLow,
      )
    : null

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
      setDiet({
        requirementProfileId: fallbackRequirement.id,
        additionalRequirementProfileIds,
      })
      return
    }

    if (additionalChanged) {
      setDiet({ additionalRequirementProfileIds })
    }
  }, [availableComorbidities, diet.additionalRequirementProfileIds, diet.requirementProfileId, energy.stateId, patient.isNeutered, selectedComorbidityIds, setDiet, setPatient, species])

  const handleSpeciesChange = (nextSpecies: Species) => {
    if (nextSpecies === species) return
    const nextStateId = getDefaultStateId(nextSpecies, !!patient.isNeutered)
    const nextRequirement = getDefaultRequirement(nextSpecies, nextStateId, !!patient.isNeutered)

    setPatient({
      species: nextSpecies,
      breed: '',
      isIndoor: nextSpecies === 'cat' ? false : false,
      comorbidityIds: [],
    })
    setEnergy({
      stateId: nextStateId,
      expectedAdultWeightKg: undefined,
      litterSize: undefined,
      lactationWeek: undefined,
    })
    setDiet({
      requirementProfileId: nextRequirement?.id,
      additionalRequirementProfileIds: [],
      entries: [],
    })
  }

  const handleNeuterChange = (checked: boolean) => {
    const nextStateId = getDefaultStateId(species, checked)
    const nextRequirement = getDefaultRequirement(species, nextStateId, checked)
    setPatient({ isNeutered: checked })
    setEnergy({ stateId: nextStateId })
    setDiet({ requirementProfileId: nextRequirement?.id })
  }

  const handleHospitalizedChange = (checked: boolean) => {
    setPatient({ isHospitalized: checked })
    if (checked) {
      setHospital({
        isAnorexic: hospital.isAnorexic ?? false,
        daysAnorexic: hospital.daysAnorexic ?? 0,
        isHyporexic: hospital.isHyporexic ?? false,
        daysHyporexic: hospital.daysHyporexic ?? 0,
        recentIntakePercent: hospital.recentIntakePercent ?? 50,
        feedingRoute: hospital.feedingRoute ?? 'oral',
        progressionProtocol: hospital.progressionProtocol ?? '4_days',
        electrolytes: hospital.electrolytes ?? { phosphorus: 1, potassium: 1, magnesium: 1 },
      })
    }
  }

  const toggleComorbidity = (optionId: string) => {
    const current = new Set(selectedComorbidityIds)
    if (current.has(optionId)) current.delete(optionId)
    else current.add(optionId)
    setPatient({ comorbidityIds: Array.from(current) })
  }

  const handleNext = () => {
    if (!patient.currentWeight || patient.currentWeight <= 0) {
      toast.error('Informe o peso atual do paciente para continuar.')
      return
    }

    const nextStateId = energy.stateId ?? getDefaultStateId(species, !!patient.isNeutered)
    const nextRequirement = getDefaultRequirement(species, nextStateId, !!patient.isNeutered)

    setEnergy({ stateId: nextStateId })
    setDiet({
      requirementProfileId: diet.requirementProfileId ?? nextRequirement?.id,
      additionalRequirementProfileIds: getClinicalProfileIdsFromSelections(species, selectedComorbidityIds),
    })

    navigate(`${NEW_ROUTE}/energy`)
  }

  return (
    <Card className="w-full border-orange-500/10 bg-gradient-to-b from-card via-card to-card/95 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
      <CardHeader className="border-b border-white/5 pb-6">
        <CardTitle className="text-2xl">Identificacao do paciente</CardTitle>
        <CardDescription>
          Defina o perfil clinico do paciente. Especie, sexo, estado reprodutivo, internacao e comorbidades entram no fluxo automaticamente.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8 pt-6">
        {/* ── Seleção de espécie ── */}
        <section>
          <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
            ESPÉCIE
          </p>
          <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
            {SPECIES_OPTIONS.map((option) => {
              const active = species === option.value
              return (
                <button
                  key={option.value}
                  id={`species-card-${option.value}`}
                  type="button"
                  onClick={() => handleSpeciesChange(option.value)}
                  className={cn(
                    'group relative flex flex-col items-center overflow-hidden rounded-[28px] border pb-6 pt-7 text-center',
                    'transition-all duration-300 hover:-translate-y-1 active:scale-[0.985]',
                    active
                      ? 'border-orange-400/60 bg-[#1e1108] shadow-[0_0_0_1px_rgba(251,146,60,0.35),0_24px_56px_rgba(249,115,22,0.22)]'
                      : 'border-white/10 bg-[#141010] hover:border-orange-500/25 hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]',
                  )}
                >
                  {/* Foto / placeholder */}
                  <div
                    className={cn(
                      'relative mx-auto overflow-hidden transition-all duration-300',
                      'h-[180px] w-[160px] rounded-[24px]',
                      active
                        ? 'shadow-[0_0_0_3px_rgba(251,146,60,0.55),0_0_32px_10px_rgba(249,115,22,0.30)]'
                        : 'shadow-[0_8px_28px_rgba(0,0,0,0.55)] group-hover:shadow-[0_8px_32px_rgba(249,115,22,0.15)]',
                    )}
                  >
                    {/* Fallback gradient + emoji */}
                    <div
                      className={cn(
                        'absolute inset-0 flex items-end justify-center bg-gradient-to-b pb-4 text-[72px] leading-none',
                        option.fallbackGradient,
                      )}
                    >
                      {option.emoji}
                    </div>
                    {/* Foto real — cobre o fallback quando carregada */}
                    <img
                      src={option.photo}
                      alt={option.title}
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                    />
                    {/* Gradiente de base para fundir foto com card */}
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Nome */}
                  <p className={cn('mt-5 text-[26px] font-black tracking-[0.14em]', active ? 'text-white' : 'text-white/80')}>
                    {option.title}
                  </p>

                  {/* Subtítulo */}
                  <p className="mx-6 mt-1.5 text-[13px] leading-5 text-muted-foreground">
                    {option.subtitle}
                  </p>

                  {/* Botão */}
                  <div className="mt-5 px-8 w-full">
                    <span
                      className={cn(
                        'block w-full rounded-full py-2 text-[11px] font-bold uppercase tracking-[0.20em] transition-colors duration-200',
                        active
                          ? 'bg-orange-400/20 text-orange-200 ring-1 ring-orange-400/40'
                          : 'bg-white/[0.07] text-muted-foreground',
                      )}
                    >
                      {active ? 'SELECIONADO' : 'TOQUE PARA ESCOLHER'}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pat-name">Nome do paciente</Label>
                <Input id="pat-name" value={patient.name || ''} onChange={(event) => setPatient({ name: event.target.value })} placeholder="Ex: Rex ou Mia" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pat-owner">Tutor</Label>
                <Input id="pat-owner" value={patient.ownerName || ''} onChange={(event) => setPatient({ ownerName: event.target.value })} placeholder="Ex: Joao Silva" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pat-weight">Peso atual (kg)</Label>
                <Input id="pat-weight" type="number" step="0.1" min="0.1" value={patient.currentWeight || ''} onChange={(event) => setPatient({ currentWeight: Number(event.target.value) || 0 })} placeholder="Ex: 12.4" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pat-age">Idade (anos)</Label>
                <Input
                  id="pat-age"
                  type="number"
                  step="0.5"
                  min="0"
                  value={patient.ageMonths != null ? Math.round((patient.ageMonths / 12) * 10) / 10 : ''}
                  onChange={(event) => {
                    const years = Number(event.target.value) || 0
                    setPatient({ ageMonths: Math.round(years * 12), ageWeeks: Math.round(years * 52) })
                  }}
                  placeholder="Ex: 2"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="pat-breed">Raca</Label>
                <Input
                  id="pat-breed"
                  list="breed-list"
                  value={patient.breed || ''}
                  onChange={(event) => setPatient({ breed: event.target.value })}
                  placeholder={species === 'dog' ? 'Ex: Golden Retriever' : 'Ex: SRD'}
                />
                <datalist id="breed-list">
                  {breeds.sort().map((breed) => (
                    <option key={breed} value={breed} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Sexo</Label>
              <div className="grid gap-3 md:grid-cols-2">
                {SEX_OPTIONS.map((option) => {
                  const Icon = option.icon
                  const active = patient.sex === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setPatient({ sex: option.value })}
                      className={cn(
                        'flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.99]',
                        active
                          ? 'border-orange-400/60 bg-orange-500/12 text-white shadow-[0_12px_28px_rgba(249,115,22,0.14)]'
                          : 'border-white/10 bg-black/15 text-muted-foreground hover:border-orange-500/30 hover:text-white',
                      )}
                    >
                      <span className="rounded-xl border border-current/20 bg-black/20 p-2">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-base font-semibold">{option.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-orange-400/15 bg-gradient-to-b from-orange-500/[0.08] via-white/[0.02] to-transparent p-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">Leitura rapida</p>
              <p className="mt-3 text-2xl font-black text-white">{patient.name || 'Paciente sem nome'}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                A especie escolhida ajusta automaticamente o guia ECC, os perfis energeticos e o catalogo compativel da formula.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                <p className="text-xs text-muted-foreground">Especie</p>
                <p className="mt-1 text-lg font-semibold text-white">{species === 'dog' ? 'Cao' : 'Gato'}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                <p className="text-xs text-muted-foreground">Peso atual</p>
                <p className="mt-1 text-lg font-semibold text-white">{patient.currentWeight ? `${patient.currentWeight.toFixed(1)} kg` : 'Nao informado'}</p>
              </div>
            </div>

            {!!selectedComorbidityBadges.length && (
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Comorbidades selecionadas</p>
                <div className="flex flex-wrap gap-2">
                  {selectedComorbidityBadges.map((label) => (
                    <Badge key={label} className="rounded-full bg-orange-500/12 text-orange-100">
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={cn('grid gap-4 lg:col-span-2', species === 'cat' ? 'md:grid-cols-3' : 'md:grid-cols-2')}>
            <button
              type="button"
              onClick={() => handleNeuterChange(!patient.isNeutered)}
              className={cn(
                'flex items-start gap-4 rounded-3xl border px-5 py-5 text-left transition-all duration-200 hover:-translate-y-1 active:scale-[0.99]',
                patient.isNeutered
                  ? 'border-orange-400/60 bg-orange-500/12 shadow-[0_12px_28px_rgba(249,115,22,0.12)]'
                  : 'border-white/10 bg-white/[0.03] hover:border-orange-500/30 hover:bg-orange-500/[0.05]',
              )}
            >
              <div className={cn('rounded-2xl border p-3', patient.isNeutered ? 'border-orange-400/40 bg-orange-500/20 text-orange-300' : 'border-white/10 bg-black/20 text-muted-foreground')}>
                <HeartPulse className="h-6 w-6" />
              </div>
              <div>
                <p className={cn('font-bold', patient.isNeutered ? 'text-white' : 'text-muted-foreground')}>Paciente castrado</p>
                <p className="mt-1 text-xs text-muted-foreground">Ajusta energia base e o perfil comparativo.</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleHospitalizedChange(!patient.isHospitalized)}
              className={cn(
                'flex items-start gap-4 rounded-3xl border px-5 py-5 text-left transition-all duration-200 hover:-translate-y-1 active:scale-[0.99]',
                patient.isHospitalized
                  ? 'border-orange-400/60 bg-orange-500/12 shadow-[0_12px_28px_rgba(249,115,22,0.12)]'
                  : 'border-white/10 bg-white/[0.03] hover:border-orange-500/30 hover:bg-orange-500/[0.05]',
              )}
            >
              <div className={cn('rounded-2xl border p-3', patient.isHospitalized ? 'border-orange-400/40 bg-orange-500/20 text-orange-300' : 'border-white/10 bg-black/20 text-muted-foreground')}>
                <Stethoscope className="h-6 w-6" />
              </div>
              <div>
                <p className={cn('font-bold', patient.isHospitalized ? 'text-white' : 'text-muted-foreground')}>Paciente hospitalizado</p>
                <p className="mt-1 text-xs text-muted-foreground">Ativa risco de realimentacao e progressao clinica.</p>
              </div>
            </button>

            {species === 'cat' && (
              <button
                type="button"
                onClick={() => setPatient({ isIndoor: !patient.isIndoor })}
                className={cn(
                  'flex items-start gap-4 rounded-3xl border px-5 py-5 text-left transition-all duration-200 hover:-translate-y-1 active:scale-[0.99]',
                  patient.isIndoor
                    ? 'border-orange-400/60 bg-orange-500/12 shadow-[0_12px_28px_rgba(249,115,22,0.12)]'
                    : 'border-white/10 bg-white/[0.03] hover:border-orange-500/30 hover:bg-orange-500/[0.05]',
                )}
              >
                <div className={cn('rounded-2xl border p-3', patient.isIndoor ? 'border-orange-400/40 bg-orange-500/20 text-orange-300' : 'border-white/10 bg-black/20 text-muted-foreground')}>
                  <Home className="h-6 w-6" />
                </div>
                <div>
                  <p className={cn('font-bold', patient.isIndoor ? 'text-white' : 'text-muted-foreground')}>Gato indoor</p>
                  <p className="mt-1 text-xs text-muted-foreground">Usado para sugerir o perfil energetico felino.</p>
                </div>
              </button>
            )}
          </div>
        </section>

        {patient.isHospitalized && (
          <section className="space-y-4 rounded-3xl border border-orange-400/25 bg-gradient-to-r from-orange-500/12 via-orange-500/[0.08] to-transparent p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 text-orange-300" />
              <div>
                <p className="font-semibold text-white">Plano hospitalar ativo</p>
                <p className="text-sm text-muted-foreground">O resumo final vai incluir progressao alimentar e triagem de risco de realimentacao.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="space-y-2">
                <Label>Dias de anorexia</Label>
                <Input type="number" min="0" value={hospital.daysAnorexic ?? 0} onChange={(event) => setHospital({ daysAnorexic: Number(event.target.value) || 0 })} />
              </div>
              <div className="space-y-2">
                <Label>Dias de hiporexia</Label>
                <Input type="number" min="0" value={hospital.daysHyporexic ?? 0} onChange={(event) => setHospital({ daysHyporexic: Number(event.target.value) || 0 })} />
              </div>
              <div className="space-y-2">
                <Label>Ingestao recente (%)</Label>
                <Input type="number" min="0" max="100" value={hospital.recentIntakePercent ?? 50} onChange={(event) => setHospital({ recentIntakePercent: Number(event.target.value) || 0 })} />
              </div>
              <div className="space-y-2">
                <Label>Protocolo</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: '3_days', label: '3 dias' },
                    { value: '4_days', label: '4 dias' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setHospital({ progressionProtocol: option.value as '3_days' | '4_days' })}
                      className={cn(
                        'rounded-xl border px-3 py-3 text-sm font-medium transition-all',
                        hospital.progressionProtocol === option.value
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

            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-3 rounded-2xl border border-white/10 bg-black/10 p-4">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-white">Via de oferta e eletrólitos</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Via de alimentacao</Label>
                    <div className="grid gap-2 md:grid-cols-3">
                      {HOSPITAL_ROUTE_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setHospital({ feedingRoute: option.value as 'oral' | 'tube' | 'parenteral' })}
                          className={cn(
                            'rounded-xl border px-3 py-3 text-sm transition-all',
                            hospital.feedingRoute === option.value
                              ? 'border-orange-400/60 bg-orange-500/15 text-white'
                              : 'border-white/10 bg-black/10 text-muted-foreground hover:border-orange-500/30 hover:text-white',
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Fosforo</Label>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        value={hospital.electrolytes?.phosphorus ?? 1}
                        onChange={(event) =>
                          setHospital({
                            electrolytes: {
                              phosphorus: Number(event.target.value) || 0,
                              potassium: hospital.electrolytes?.potassium ?? 1,
                              magnesium: hospital.electrolytes?.magnesium ?? 1,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Potassio</Label>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        value={hospital.electrolytes?.potassium ?? 1}
                        onChange={(event) =>
                          setHospital({
                            electrolytes: {
                              phosphorus: hospital.electrolytes?.phosphorus ?? 1,
                              potassium: Number(event.target.value) || 0,
                              magnesium: hospital.electrolytes?.magnesium ?? 1,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Magnesio</Label>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        value={hospital.electrolytes?.magnesium ?? 1}
                        onChange={(event) =>
                          setHospital({
                            electrolytes: {
                              phosphorus: hospital.electrolytes?.phosphorus ?? 1,
                              potassium: hospital.electrolytes?.potassium ?? 1,
                              magnesium: Number(event.target.value) || 0,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-orange-400/20 bg-orange-500/[0.08] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-white">Risco de realimentacao</p>
                  <Badge variant="outline">
                    {refeedingRisk === 'high' ? 'Alto risco' : refeedingRisk === 'moderate' ? 'Risco moderado' : 'Baixo risco'}
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  O modulo hospitalar entra no resumo final para orientar oferta progressiva e vigilancia clinica.
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-semibold text-white">Comorbidades</p>
              <p className="text-sm text-muted-foreground">Selecione multiplas condicoes. Os perfis terapeuticos da planilha entram na avaliacao final.</p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="rounded-full border border-white/10 p-2 text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Voce pode combinar mais de uma comorbidade. O plano final considera os perfis clinicos da base importada.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                value={comorbidityQuery}
                onChange={(event) => setComorbidityQuery(event.target.value)}
                placeholder="Buscar comorbidades"
                className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
              />
            </div>
          </div>

          {!!selectedComorbidityBadges.length && (
            <div className="flex flex-wrap gap-2">
              {selectedComorbidityBadges.map((label) => (
                <Badge key={label} className="rounded-full bg-orange-500/12 text-orange-100">
                  {label}
                </Badge>
              ))}
            </div>
          )}

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filteredComorbidities.map((option) => {
              const active = selectedComorbidityIds.includes(option.id)
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleComorbidity(option.id)}
                  className={cn(
                    'rounded-2xl border px-4 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.99]',
                    active
                      ? 'border-orange-400/60 bg-orange-500/12 text-white shadow-[0_10px_24px_rgba(249,115,22,0.12)]'
                      : 'border-white/10 bg-black/10 text-muted-foreground hover:border-orange-500/30 hover:text-white',
                  )}
                >
                  <p className="font-semibold">{option.label}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{option.description}</p>
                </button>
              )
            })}
          </div>
        </section>

        <div className="flex justify-end border-t border-white/5 pt-4">
          <Button onClick={handleNext} className="gap-2" id="btn-next-energy">
            Proximo: Energia <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
