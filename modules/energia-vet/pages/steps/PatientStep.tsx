import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronDown, ChevronRight, HeartPulse, Mars, Search, UserRoundPlus, Venus, X, Zap } from 'lucide-react'
import { toast } from 'sonner'
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
import { mapComorbiditySelectionsToTherapeuticProfiles } from '../../lib/clinical/comorbidityResolver'
import { getTherapeuticProfileById } from '../../lib/clinical/therapeuticProfiles'
import { getEvidenceSourceById } from '../../lib/clinical/evidenceResolver'
import { Species } from '../../types'
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

const COMORBIDITY_CATEGORIES = [
  { id: 'all', label: 'Todas' },
  { id: 'renal', label: 'Renal e urinário' },
  { id: 'digestive', label: 'Digestivo' },
  { id: 'metabolic', label: 'Metabólico' },
  { id: 'allergy', label: 'Alergias' },
  { id: 'systemic', label: 'Sistêmico' },
] as const

type ComorbidityCategoryId = (typeof COMORBIDITY_CATEGORIES)[number]['id']

function normalizeSearchText(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

function getComorbidityCategory(option: ClinicalProfileOption): Exclude<ComorbidityCategoryId, 'all'> {
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
  const sources = Array.from(new Set(profiles.flatMap((profile) => profile.evidenceSourceIds).map((id) => getEvidenceSourceById(id)?.title).filter((title): title is string => Boolean(title))))
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
  const [comorbidityQuery, setComorbidityQuery] = useState('')
  const [comorbidityCategory, setComorbidityCategory] = useState<ComorbidityCategoryId>('all')

  const breeds = useMemo(
    () => [...(species === 'cat' ? CAT_BREEDS_BR : DOG_BREEDS_BR)].sort((left, right) => left.localeCompare(right, 'pt-BR')),
    [species],
  )
  const availableComorbidities = useMemo(() => getClinicalProfileOptions(species), [species])
  const selectedComorbidityIds = patient.comorbidityIds ?? []
  const filteredComorbidities = useMemo(() => {
    const query = normalizeSearchText(comorbidityQuery.trim())
    return availableComorbidities.filter((option) => {
      const matchesCategory = comorbidityCategory === 'all' || getComorbidityCategory(option) === comorbidityCategory
      const matchesQuery = !query || normalizeSearchText([option.label, option.description, option.tags.join(' ')].join(' ')).includes(query)
      return matchesCategory && matchesQuery
    })
  }, [availableComorbidities, comorbidityCategory, comorbidityQuery])

  const categoryCounts = useMemo(() => {
    const counts = new Map<ComorbidityCategoryId, number>([['all', availableComorbidities.length]])
    for (const option of availableComorbidities) {
      const category = getComorbidityCategory(option)
      counts.set(category, (counts.get(category) ?? 0) + 1)
    }
    return counts
  }, [availableComorbidities])

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
    setComorbidityCategory('all')
    setComorbidityQuery('')
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
    <Card className="nutrition-step-card w-full">
      <CardHeader className="border-b border-border/70 pb-6">
        <CardTitle className="text-2xl">Identificação do paciente</CardTitle>
        <CardDescription>Registre os dados essenciais que serão usados no cálculo e na avaliação nutricional.</CardDescription>
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
                <button key={option.value} type="button" role="radio" aria-checked={active} onClick={() => setPatient({ registrationMode: option.value })} className={cn('flex min-h-20 cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-left outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/25', active ? 'border-primary/50 bg-primary/[0.07]' : 'border-border bg-card hover:border-primary/25 hover:bg-muted/55')}>
                  <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}><Icon className="h-5 w-5" /></span>
                  <span className="min-w-0"><span className="block text-sm font-semibold text-foreground">{option.title}</span><span className="mt-1 block text-xs leading-5 text-muted-foreground">{option.description}</span></span>
                </button>
              )
            })}
          </div>
        </section>

        <section>
          <Label>Espécie</Label>
          <div className="mt-3 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Espécie do paciente">
            {SPECIES_OPTIONS.map((option) => {
              const active = species === option.value
              return (
                <button
                  key={option.value}
                  id={`species-card-${option.value}`}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => handleSpeciesChange(option.value)}
                  className={cn(
                    'relative flex min-h-16 cursor-pointer items-center justify-center rounded-2xl border px-4 text-center text-base font-semibold outline-none transition-colors duration-200 focus-visible:ring-3 focus-visible:ring-ring/25',
                    active ? 'border-primary/50 bg-primary/[0.08] text-primary' : 'border-border bg-card text-foreground hover:border-primary/25 hover:bg-muted/55',
                  )}
                >
                  {option.title}
                  {active && <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-3 w-3" /></span>}
                </button>
              )
            })}
          </div>
        </section>

        <section className="rounded-2xl bg-muted/55 p-5">
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
                  {breeds.map((breed) => <option key={breed} value={breed}>{breed}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-muted-foreground" />
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
                    <button key={option.value} type="button" role="radio" aria-checked={active} onClick={() => setPatient({ sex: option.value })} className={cn('flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/25', active ? 'border-primary/50 bg-primary/[0.08] text-primary' : 'border-border bg-card text-muted-foreground hover:bg-muted')}>
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
                    <button key={String(option.value)} type="button" role="radio" aria-checked={active} onClick={() => handleNeuterChange(option.value)} className={cn('flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-3 text-sm font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/25', active ? 'border-primary/50 bg-primary/[0.08] text-primary' : 'border-border bg-card text-muted-foreground hover:bg-muted')}>
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
                      <button key={String(option.value)} type="button" role="radio" aria-checked={active} onClick={() => setPatient({ isIndoor: option.value })} className={cn('flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-3 text-sm font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/25', active ? 'border-primary/50 bg-primary/[0.08] text-primary' : 'border-border bg-card text-muted-foreground hover:bg-muted')}>
                        {option.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="border-b border-border p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-2"><HeartPulse className="h-5 w-5 text-primary" /><h2 className="text-lg font-semibold text-foreground">Comorbidades</h2></div>
                <p className="mt-1 text-sm text-muted-foreground">Escolha uma categoria, selecione a condição e veja imediatamente o impacto nutricional cadastrado.</p>
              </div>
              <div className="relative w-full lg:max-w-sm">
                <Search className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                <Input value={comorbidityQuery} onChange={(event) => setComorbidityQuery(event.target.value)} placeholder="Buscar condição clínica" className="pl-10 pr-10" />
                {comorbidityQuery && <button type="button" aria-label="Limpar busca" onClick={() => setComorbidityQuery('')} className="absolute right-2 top-1.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"><X className="h-4 w-4" /></button>}
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Categorias de comorbidades">
              {COMORBIDITY_CATEGORIES.map((category) => (
                <button key={category.id} type="button" role="tab" aria-selected={comorbidityCategory === category.id} onClick={() => setComorbidityCategory(category.id)} className={cn('flex min-h-10 shrink-0 cursor-pointer items-center gap-2 rounded-xl border px-3 text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/25', comorbidityCategory === category.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground')}>
                  {category.label}<span className={cn('text-xs', comorbidityCategory === category.id ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{categoryCounts.get(category.id) ?? 0}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-5">
            {selectedComorbidityIds.length > 0 && (
              <div className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-primary/[0.06] px-4 py-3">
                <p className="text-sm font-medium text-foreground">{selectedComorbidityIds.length} condição(ões) selecionada(s)</p>
                <button type="button" onClick={() => setPatient({ comorbidityIds: [] })} className="min-h-9 cursor-pointer rounded-lg px-2 text-xs font-semibold text-primary hover:bg-primary/10">Limpar seleção</button>
              </div>
            )}

            <div className="grid gap-3 lg:grid-cols-2">
              {filteredComorbidities.map((option) => {
                const active = selectedComorbidityIds.includes(option.id)
                const guidance = active ? buildComorbidityGuidance(species, option) : null
                return (
                  <article key={option.id} className={cn('overflow-hidden rounded-2xl border transition-colors duration-200', active ? 'border-primary/45 bg-primary/[0.045]' : 'border-border bg-card')}>
                    <button type="button" aria-pressed={active} onClick={() => toggleComorbidity(option.id)} className="flex min-h-16 w-full cursor-pointer items-center gap-3 px-4 py-3 text-left outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/25">
                      <span className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border', active ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-muted text-transparent')}><Check className="h-3.5 w-3.5" /></span>
                      <span className="min-w-0 flex-1 text-sm font-semibold text-foreground">{option.label.replace(/\s+(Cães|Gatos)\s*-?$/i, '')}</span>
                    </button>
                    {guidance && (
                      <div className="border-t border-primary/15 px-4 py-4">
                        <p className="text-sm leading-6 text-foreground/80">{guidance.summary}</p>
                        {guidance.priorities.length > 0 && <p className="mt-2 text-xs leading-5 text-muted-foreground"><strong className="font-semibold text-foreground">Prioridades:</strong> {guidance.priorities.join(' · ')}</p>}
                        {guidance.sources.length > 0 && <p className="mt-2 text-[11px] leading-5 text-muted-foreground"><strong className="font-semibold text-foreground">Referência:</strong> {guidance.sources.join(' · ')}</p>}
                      </div>
                    )}
                  </article>
                )
              })}
            </div>

            {filteredComorbidities.length === 0 && <div className="rounded-2xl border border-dashed border-border px-5 py-10 text-center text-sm text-muted-foreground">Nenhuma condição encontrada nesta categoria.</div>}
          </div>
        </section>

        <div className="flex justify-end border-t border-border/60 pt-4">
          <Button onClick={handleNext} className="gap-2" id="btn-next-energy">Próximo: Energia <ChevronRight className="h-4 w-4" /></Button>
        </div>
      </CardContent>
    </Card>
  )
}
