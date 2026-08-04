import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, HelpCircle, SlidersHorizontal } from 'lucide-react'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { LocalizedNumberInput } from '../../components/ui/localized-number-input'
import { Label } from '../../components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip'
import { useCalculationStore } from '../../store/calculationStore'
import {
  BOOK_ENERGY_SOURCE,
  calculateBookProfileEnergy,
  calculateBookRER,
  getSelectableBookEnergyProfiles,
  getDefaultBookEnergyProfile,
} from '../../lib/bookEnergy'
import { getClinicalProfileIdsFromSelections } from '../../lib/clinicalProfiles'
import { getDefaultRequirement } from '../../lib/genutriData'
import {
  computeEnergyWithEngineV3,
  isCalculationEngineV3Enabled,
  mapStorePatientToAssessment,
} from '../../lib/nutritionCalculationBridge'
import { cn } from '../../lib/utils'

const NEW_ROUTE = '/calculadora-energetica/new'

export default function EnergyStep() {
  const navigate = useNavigate()
  const { patient, energy, setEnergy, setTarget, setDiet } = useCalculationStore()
  const species = patient.species ?? 'dog'
  const weightKg = patient.currentWeight ?? 0
  const profiles = useMemo(() => getSelectableBookEnergyProfiles(species), [species])
  const automaticProfileId = useMemo(() => getDefaultBookEnergyProfile({
    species,
    ageMonths: patient.ageMonths ?? 0,
    isNeutered: !!patient.isNeutered,
    isIndoor: patient.isIndoor,
  }), [patient.ageMonths, patient.isIndoor, patient.isNeutered, species])
  const [profileId, setProfileId] = useState(energy.resolvedEnergyProfileId ?? automaticProfileId)
  const [litterSize, setLitterSize] = useState(energy.litterSize ?? 1)
  const [lactationWeek, setLactationWeek] = useState(energy.lactationWeek ?? 1)
  const [customEnabled, setCustomEnabled] = useState(!!energy.clinicalMerAdjustmentEnabled)
  const [customFactor, setCustomFactor] = useState(energy.clinicalMerAdjustmentFactor ?? 1)

  useEffect(() => {
    if (!profiles.some((profile) => profile.id === profileId)) setProfileId(automaticProfileId)
  }, [automaticProfileId, profileId, profiles])

  const v3Enabled = isCalculationEngineV3Enabled()
  const v3Assessment = useMemo(
    () =>
      mapStorePatientToAssessment({
        species,
        weightKg,
        ageMonths: patient.ageMonths ?? 0,
        sex: patient.sex ?? 'male',
        isNeutered: !!patient.isNeutered,
        bcs: (patient.bcs ?? 5) as import('../../types').BCS,
        isIndoor: patient.isIndoor,
        nutritionalGoal: 'maintenance',
      }),
    [patient.ageMonths, patient.bcs, patient.isIndoor, patient.isNeutered, patient.sex, species, weightKg],
  )
  const v3Energy = useMemo(
    () => (v3Enabled && weightKg > 0 ? computeEnergyWithEngineV3(v3Assessment) : null),
    [v3Assessment, v3Enabled, weightKg],
  )

  const profile = profiles.find((item) => item.id === profileId) ?? profiles[0]
  const rer = v3Energy?.rerKcalDay ?? (weightKg > 0 ? calculateBookRER(weightKg) : 0)
  const profileResult = calculateBookProfileEnergy({ weightKg, profile, litterSize, lactationWeek })
  const safeCustomFactor = Math.min(3, Math.max(0.1, Number(customFactor) || 1))
  const legacyFinalEnergy = profileResult.kcal * (customEnabled ? safeCustomFactor : 1)
  const finalEnergy = v3Energy?.selectedTargetKcalDay ?? legacyFinalEnergy
  const differencePercent = customEnabled ? (safeCustomFactor - 1) * 100 : 0
  const groupedProfiles = Array.from(new Set(profiles.map((item) => item.group)))

  const handleNext = () => {
    if (!profile || weightKg <= 0) return
    const requirement = getDefaultRequirement(species, profile.id, !!patient.isNeutered)
    setEnergy({
      stateId: profile.id,
      resolvedEnergyProfileId: profile.id,
      resolvedProfileLabel: profile.label,
      rer,
      merFactor: profileResult.factor,
      merFromProfile: profileResult.kcal,
      mer: finalEnergy,
      clinicalMerAdjustmentEnabled: customEnabled,
      clinicalMerAdjustmentFactor: customEnabled ? safeCustomFactor : undefined,
      litterSize: profile.requiresLitterSize ? litterSize : undefined,
      lactationWeek: profile.requiresLactationWeek ? lactationWeek : undefined,
      merFormula: [
        `RER = 70 × ${weightKg.toFixed(2)} kg^0,75 = ${rer.toFixed(0)} kcal/dia`,
        profileResult.formula,
        ...(customEnabled ? [`Ajuste clínico: ${profileResult.kcal.toFixed(0)} × ${safeCustomFactor.toFixed(2)} = ${finalEnergy.toFixed(0)} kcal/dia`] : []),
      ],
      notes: `${BOOK_ENERGY_SOURCE.title}, ${BOOK_ENERGY_SOURCE.chapter}, páginas ${profile.sourcePages.join(', ')}.`,
    })
    setTarget({ targetEnergy: finalEnergy })
    setDiet({
      targetEnergy: finalEnergy,
      requirementProfileId: requirement?.id,
      additionalRequirementProfileIds: getClinicalProfileIdsFromSelections(species, patient.comorbidityIds ?? []),
    })
    navigate(`${NEW_ROUTE}/target`)
  }

  return (
    <Card className="nutrition-step-card w-full">
      <CardHeader className="border-b border-border/60 pb-6">
        <CardTitle className="text-2xl">Energia diária</CardTitle>
        <CardDescription>Uma estimativa clínica objetiva, baseada no peso e no perfil fisiológico do paciente.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 pt-4">
        <section className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-primary/20 bg-primary/[0.055] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Energia final estimada</p>
                <p id="energy-preview-kcal" className="mt-1 text-3xl font-black tracking-tight text-primary">
                  {finalEnergy.toFixed(0)} <span className="text-sm font-semibold">kcal/dia</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Perfil: <strong className="text-foreground">{v3Energy?.clinicalProfileLabel ?? profile?.label}</strong>
                  {v3Energy && (
                    <> · Faixa {v3Energy.estimatedRangeKcalDay.minimum.toFixed(0)}–{v3Energy.estimatedRangeKcalDay.maximum.toFixed(0)} kcal/dia</>
                  )}
                </p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" aria-label="Como a energia é calculada" className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-muted-foreground outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring">
                      <HelpCircle className="h-5 w-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm space-y-2 p-4">
                    <p className="font-semibold">Como foi calculado</p>
                    <p>RER = 70 × peso corporal elevado a 0,75.</p>
                    <p>{profileResult.formula}</p>
                    <p className="text-xs">{BOOK_ENERGY_SOURCE.title}, páginas {profile?.sourcePages.join(', ')}.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              Requerimento energético de repouso (RER)
              <TooltipProvider><Tooltip><TooltipTrigger asChild><HelpCircle className="h-3.5 w-3.5" aria-label="O que é RER" /></TooltipTrigger><TooltipContent className="max-w-xs">Energia basal em repouso — base do cálculo, não a dose final.</TooltipContent></Tooltip></TooltipProvider>
            </div>
            <p id="energy-rer-value" className="mt-1 text-2xl font-bold text-foreground">{rer.toFixed(0)} kcal/dia</p>
          </div>
        </section>

        <section>
          <div className="mb-2">
            <h2 className="text-base font-semibold">Perfil energético</h2>
            <p className="text-xs text-muted-foreground">Escolha o estado fisiológico ou de atividade. Perda/ganho de peso é definido na próxima etapa (ECC).</p>
          </div>
          <div id="energy-profile-grid" className="space-y-3">
            {groupedProfiles.map((group) => (
              <div key={group}>
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{group}</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {profiles.filter((item) => item.group === group).map((item) => {
                    const active = item.id === profile?.id
                    return (
                      <button key={item.id} id={`energy-profile-${item.id}`} type="button" onClick={() => setProfileId(item.id)} className={cn('min-h-[4.5rem] cursor-pointer rounded-xl border px-3 py-2 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring', active ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/40 hover:bg-muted/40')}>
                        <div className="flex items-start justify-between gap-2"><p className="text-sm font-semibold leading-tight text-foreground">{item.label}</p>{active && <Badge className="h-5 px-1.5 text-[10px]">Ativo</Badge>}</div>
                        <p className="mt-0.5 text-[11px] leading-4 text-muted-foreground line-clamp-2">{item.description}</p>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {(profile?.requiresLitterSize || profile?.requiresLactationWeek) && (
          <section className="grid gap-4 rounded-2xl bg-muted/45 p-5 sm:grid-cols-2">
            {profile.requiresLitterSize && <div className="space-y-2"><Label htmlFor="litter-size">Número de filhotes</Label><LocalizedNumberInput id="litter-size" integer min={1} value={litterSize} onValueChange={(value) => setLitterSize(value ?? 1)} /></div>}
            {profile.requiresLactationWeek && <div className="space-y-2"><Label htmlFor="lactation-week">Semana de lactação</Label><LocalizedNumberInput id="lactation-week" integer min={1} max={7} value={lactationWeek} onValueChange={(value) => setLactationWeek(value ?? 1)} /></div>}
          </section>
        )}

        <section className="rounded-2xl border border-border p-5">
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" checked={customEnabled} onChange={(event) => setCustomEnabled(event.target.checked)} className="mt-1 h-5 w-5 rounded border-border accent-primary" />
            <span><span className="flex items-center gap-2 font-semibold"><SlidersHorizontal className="h-4 w-4 text-primary" /> Ajustar manualmente a energia do perfil</span><span className="mt-1 block text-sm text-muted-foreground">Use somente quando houver justificativa clínica documentada.</span></span>
          </label>
          {customEnabled && <div className="mt-4 grid gap-4 rounded-2xl bg-muted/45 p-4 sm:grid-cols-[180px_1fr]"><div className="space-y-2"><Label htmlFor="custom-energy-factor">Multiplicador</Label><LocalizedNumberInput id="custom-energy-factor" min={0.1} max={3} value={customFactor} onValueChange={(value) => setCustomFactor(value ?? 1)} /></div><div className="self-end pb-2 text-sm text-muted-foreground">Variação de <strong className="text-foreground">{differencePercent >= 0 ? '+' : ''}{differencePercent.toFixed(0)}%</strong> · Resultado <strong className="text-primary">{finalEnergy.toFixed(0)} kcal/dia</strong></div></div>}
        </section>

        <p className="text-xs leading-5 text-muted-foreground">Fonte: {BOOK_ENERGY_SOURCE.title}, {BOOK_ENERGY_SOURCE.chapter}, páginas {BOOK_ENERGY_SOURCE.pages}. {BOOK_ENERGY_SOURCE.note}</p>
        <div className="flex justify-between border-t border-border/60 pt-4"><Button variant="outline" onClick={() => navigate(`${NEW_ROUTE}/patient`)} className="gap-2"><ChevronLeft className="h-4 w-4" /> Anterior</Button><Button id="btn-next-target" onClick={handleNext} disabled={weightKg <= 0} className="gap-2">Próximo: Meta <ChevronRight className="h-4 w-4" /></Button></div>
      </CardContent>
    </Card>
  )
}
