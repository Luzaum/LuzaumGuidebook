import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { LocalizedNumberInput } from '../../components/ui/localized-number-input'
import { EnergyFinalEstimateCard } from '../../components/CalculationTransparencyPanel'
import { useCalculationStore } from '../../store/calculationStore'
import {
  BOOK_ENERGY_SOURCE,
  getDefaultBookEnergyProfile,
  getSelectableBookEnergyProfiles,
} from '../../lib/bookEnergy'
import { resolveRequirementProfileIdForEnergyState } from '../../lib/canonical/requirementBridge'
import {
  buildEnergyCalculationExplanation,
  calculateCanonicalNutrition,
  calculateMaintenanceEnergy,
  mapStoreToCanonicalInput,
} from '../../lib/canonical'
import {
  buildCalibrationSummaryLabel,
  buildNutrientCalibrationContext,
} from '../../lib/canonical/nutrientTargetCalibration'
import { getDefaultRequirement } from '../../lib/genutriData'
import { cn } from '../../lib/utils'

const NEW_ROUTE = '/calculadora-energetica/new'

export default function EnergyStep() {
  const navigate = useNavigate()
  const { patient, energy, target, setEnergy, setTarget, setDiet, dispatchCanonical } = useCalculationStore()
  const species = patient.species ?? 'dog'
  const weightKg = patient.currentWeight ?? 0
  const profiles = useMemo(() => getSelectableBookEnergyProfiles(species), [species])
  const automaticProfileId = useMemo(
    () =>
      getDefaultBookEnergyProfile({
        species,
        ageMonths: patient.ageMonths ?? 0,
        isNeutered: !!patient.isNeutered,
        isIndoor: patient.isIndoor,
      }),
    [patient.ageMonths, patient.isIndoor, patient.isNeutered, species],
  )
  const [profileId, setProfileId] = useState(energy.resolvedEnergyProfileId ?? automaticProfileId)
  const [litterSize, setLitterSize] = useState(energy.litterSize ?? 1)
  const [lactationWeek, setLactationWeek] = useState(energy.lactationWeek ?? 1)
  const [customEnabled, setCustomEnabled] = useState(() => energy.clinicalMerAdjustmentEnabled === true)
  const [customKcal, setCustomKcal] = useState(() =>
    energy.clinicalMerAdjustmentEnabled === true ? (energy.mer ?? 0) : 0,
  )

  useEffect(() => {
    if (!profiles.some((profile) => profile.id === profileId)) setProfileId(automaticProfileId)
  }, [automaticProfileId, profileId, profiles])

  useEffect(() => {
    if (energy.clinicalMerAdjustmentEnabled !== true && customEnabled) {
      setCustomEnabled(false)
    }
  }, [energy.clinicalMerAdjustmentEnabled, customEnabled])

  const canonicalInput = useMemo(() => {
    const input = mapStoreToCanonicalInput({
      patient: { ...patient, currentWeight: weightKg },
      energy: {
        ...energy,
        resolvedEnergyProfileId: profileId,
        stateId: profileId,
        litterSize: profiles.find((p) => p.id === profileId)?.requiresLitterSize ? litterSize : undefined,
        lactationWeek: profiles.find((p) => p.id === profileId)?.requiresLactationWeek ? lactationWeek : undefined,
      },
      target,
    })
    if (customEnabled && customKcal > 0) {
      input.calculationPreferences.clinicianEnergyOverrideKcalDay = customKcal
      input.calculationPreferences.clinicianOverrideReason =
        'Ajuste clínico manual registrado na etapa Energia.'
    }
    return input
  }, [customEnabled, customKcal, energy, litterSize, lactationWeek, patient, profileId, profiles, target, weightKg])

  const energyResult = useMemo(
    () => (weightKg > 0 ? calculateMaintenanceEnergy(canonicalInput) : null),
    [canonicalInput, weightKg],
  )
  const energyExplanation = useMemo(
    () => (energyResult && weightKg > 0 ? buildEnergyCalculationExplanation(canonicalInput, energyResult) : null),
    [canonicalInput, energyResult, weightKg],
  )
  const canonicalResult = useMemo(
    () => (weightKg > 0 ? calculateCanonicalNutrition(canonicalInput).result : null),
    [canonicalInput, weightKg],
  )
  const calibrationSummary = useMemo(() => {
    if (weightKg <= 0) return undefined
    const ctx = buildNutrientCalibrationContext(canonicalInput)
    return buildCalibrationSummaryLabel(ctx)
  }, [canonicalInput, weightKg])

  const profile = profiles.find((item) => item.id === profileId) ?? profiles[0]
  const rer = energyResult?.rerKcalDay ?? 0
  const finalEnergy = energyResult?.selectedTargetKcalDay ?? 0
  const groupedProfiles = Array.from(new Set(profiles.map((item) => item.group)))

  const handleNext = () => {
    if (!profile || weightKg <= 0 || !energyResult) return
    dispatchCanonical({
      type: 'calculation/preferenceChanged',
      payload: { selectedBookEnergyProfileId: profile.id },
    })
    const requirement = getDefaultRequirement(species, profile.id, !!patient.isNeutered)
    setEnergy({
      stateId: profile.id,
      resolvedEnergyProfileId: profile.id,
      resolvedProfileLabel: profile.label,
      rer,
      merFactor: energyResult.multiplierEquivalent,
      merFromProfile: finalEnergy,
      mer: customEnabled ? customKcal : finalEnergy,
      clinicalMerAdjustmentEnabled: customEnabled,
      clinicalMerAdjustmentFactor: undefined,
      litterSize: profile.requiresLitterSize ? litterSize : undefined,
      lactationWeek: profile.requiresLactationWeek ? lactationWeek : undefined,
      merFormula: [energyResult.methodSummary],
      notes: `${BOOK_ENERGY_SOURCE.title}, ${BOOK_ENERGY_SOURCE.chapter}.`,
    })
    setTarget({ targetEnergy: finalEnergy })
    setDiet({
      targetEnergy: finalEnergy,
      requirementProfileId: requirement?.id ?? resolveRequirementProfileIdForEnergyState(species, profile.id, patient.isNeutered),
      additionalRequirementProfileIds: [],
    })
    navigate(`${NEW_ROUTE}/target`)
  }

  return (
    <Card className="nutrition-step-card w-full">
      <CardHeader className="border-b border-border/60 pb-6">
        <CardTitle className="text-2xl">Energia diária</CardTitle>
        <CardDescription>
          Estimativa a partir do peso corporal e do estado fisiológico selecionado.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 pt-4">
        <section className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
          <EnergyFinalEstimateCard
            finalEnergyKcal={finalEnergy}
            rerKcal={rer}
            profileLabel={energyResult?.clinicalProfileLabel ?? profile?.label ?? '—'}
            energyRange={energyResult?.estimatedRangeKcalDay}
            result={canonicalResult}
            energyExplanation={energyExplanation}
            calibrationSummary={calibrationSummary}
          />
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs font-medium text-muted-foreground">RER (repouso)</p>
            <p id="energy-rer-value" className="mt-1 text-2xl font-bold text-foreground">
              {rer.toFixed(0)} kcal/dia
            </p>
          </div>
        </section>

        <section>
          <div className="mb-2">
            <h2 className="text-base font-semibold">Perfil energético</h2>
            <p className="text-xs text-muted-foreground">
              Perda/ganho de peso é definido na etapa Meta corporal (ECC).
            </p>
          </div>
          <div id="energy-profile-grid" className="space-y-3">
            {groupedProfiles.map((group) => (
              <div key={group}>
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {group}
                </p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {profiles
                    .filter((item) => item.group === group)
                    .map((item) => {
                      const active = item.id === profile?.id
                      return (
                        <button
                          key={item.id}
                          id={`energy-profile-${item.id}`}
                          type="button"
                          onClick={() => setProfileId(item.id)}
                          className={cn(
                            'min-h-[4.5rem] cursor-pointer rounded-xl border px-3 py-2 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring',
                            active
                              ? 'border-primary bg-primary/10'
                              : 'border-border bg-card hover:border-primary/40 hover:bg-muted/40',
                          )}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold leading-tight text-foreground">{item.label}</p>
                            {active && <Badge className="h-5 px-1.5 text-[10px]">Ativo</Badge>}
                          </div>
                          <p className="mt-0.5 line-clamp-2 text-[11px] leading-4 text-muted-foreground">
                            {item.description}
                          </p>
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
            {profile.requiresLitterSize && (
              <div className="space-y-2">
                <Label htmlFor="litter-size">Número de filhotes</Label>
                <LocalizedNumberInput
                  id="litter-size"
                  integer
                  min={1}
                  value={litterSize}
                  onValueChange={(value) => setLitterSize(value ?? 1)}
                />
              </div>
            )}
            {profile.requiresLactationWeek && (
              <div className="space-y-2">
                <Label htmlFor="lactation-week">Semana de lactação</Label>
                <LocalizedNumberInput
                  id="lactation-week"
                  integer
                  min={1}
                  max={7}
                  value={lactationWeek}
                  onValueChange={(value) => setLactationWeek(value ?? 1)}
                />
              </div>
            )}
          </section>
        )}

        <section className="rounded-2xl border border-border p-5">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={customEnabled}
              onChange={(event) => {
                const checked = event.target.checked
                setCustomEnabled(checked)
                if (checked) {
                  setCustomKcal(customKcal > 0 ? customKcal : finalEnergy)
                } else {
                  setCustomKcal(0)
                  setEnergy({ clinicalMerAdjustmentEnabled: false })
                }
              }}
              className="mt-1 h-5 w-5 rounded border-border accent-primary"
            />
            <span>
              <span className="flex items-center gap-2 font-semibold">
                <SlidersHorizontal className="h-4 w-4 text-primary" /> Prescrição manual de energia (kcal/dia)
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">
                Substitui a estimativa automática pelo valor definido pelo médico-veterinário.
              </span>
            </span>
          </label>
          {customEnabled && (
            <div className="mt-4 space-y-2">
              <Label htmlFor="custom-energy-kcal">Meta energética (kcal/dia)</Label>
              <LocalizedNumberInput
                id="custom-energy-kcal"
                min={1}
                value={customKcal}
                onValueChange={(value) => setCustomKcal(value ?? finalEnergy)}
              />
            </div>
          )}
        </section>

        <p className="text-xs leading-5 text-muted-foreground">
          Fonte: {BOOK_ENERGY_SOURCE.title}, {BOOK_ENERGY_SOURCE.chapter}, páginas {BOOK_ENERGY_SOURCE.pages}.{' '}
          {BOOK_ENERGY_SOURCE.note}
        </p>
        <div className="flex justify-between border-t border-border/60 pt-4">
          <Button variant="outline" onClick={() => navigate(`${NEW_ROUTE}/patient`)} className="gap-2">
            <ChevronLeft className="h-4 w-4" /> Anterior
          </Button>
          <Button id="btn-next-target" onClick={handleNext} disabled={weightKg <= 0 || !energyResult} className="gap-2">
            Próximo: Meta <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
