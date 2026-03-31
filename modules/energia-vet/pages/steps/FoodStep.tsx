import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Info, Layers3, Leaf, Package, Plus, Search, Trash2 } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Badge } from '../../components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { useCalculationStore } from '../../store/calculationStore'
import { computeDietPlan } from '../../lib/dietEngine'
import {
  filterFoods,
  getDefaultRequirement,
  getFoodById,
  getFoodCategories,
  getRequirementOptions,
  GENUTRI_NUTRIENT_CATALOG,
} from '../../lib/genutriData'
import { getClinicalProfileBadges, getClinicalProfileIdsFromSelections, getHumanRequirementLabel } from '../../lib/clinicalProfiles'
import type { DietFormulaEntry, DietType, FoodItem } from '../../types'
import { MEALS_OPTIONS } from '../../lib/nutrition'
import { cn } from '../../lib/utils'

const NEW_ROUTE = '/calculadora-energetica/new'

function resolveFoodTypeFilter(dietType: DietType): string[] | undefined {
  if (dietType === 'commercial') return ['commercial']
  if (dietType === 'natural') return ['natural', 'suplemento', 'enteral']
  return undefined
}

function formatNutrient(value: number | null | undefined, unit?: string | null, decimals = 2) {
  if (value == null) return 'Dado nao cadastrado'
  return `${value.toFixed(decimals)} ${unit ?? ''}`.trim()
}

function formatFoodKcalPerGram(food: FoodItem) {
  const kcal = food.nutrientsAsFed.energyKcalPer100g
  if (kcal == null) return 'Dado nao cadastrado'
  return `${(kcal / 100).toFixed(2)} kcal/g`
}

const DIET_TYPE_OPTIONS: Array<{
  value: DietType
  label: string
  description: string
  icon: typeof Package
}> = [
  { value: 'commercial', label: 'Dieta comercial', description: 'Racoes secas, umidas e formulas prontas.', icon: Package },
  { value: 'natural', label: 'Dieta 100% natural', description: 'Ingredientes naturais, suplementos e bases preparadas.', icon: Leaf },
  { value: 'hybrid', label: 'Dieta hibrida', description: 'Combina itens comerciais e naturais no mesmo plano.', icon: Layers3 },
]

export default function FoodStep() {
  const navigate = useNavigate()
  const { patient, energy, target, diet, setDiet } = useCalculationStore()

  const species = patient.species ?? 'dog'
  const targetEnergy = target.targetEnergy ?? 0
  const currentWeight = patient.currentWeight ?? 0
  const defaultRequirement = useMemo(
    () => getDefaultRequirement(species, energy.stateId, !!patient.isNeutered),
    [energy.stateId, patient.isNeutered, species],
  )

  const [dietType, setDietType] = useState<DietType>(diet.dietType ?? 'commercial')
  const [mealsPerDay, setMealsPerDay] = useState<number>(diet.mealsPerDay ?? 2)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [requirementProfileId, setRequirementProfileId] = useState<string>(diet.requirementProfileId ?? defaultRequirement?.id ?? '')
  const [entries, setEntries] = useState<DietFormulaEntry[]>(diet.entries ?? [])
  const [detailsFoodId, setDetailsFoodId] = useState<string | null>(null)

  const categories = useMemo(() => getFoodCategories(), [])
  const requirementOptions = useMemo(() => getRequirementOptions(species), [species])
  const comorbidityLabels = useMemo(
    () => getClinicalProfileBadges(species, patient.comorbidityIds ?? []),
    [patient.comorbidityIds, species],
  )
  const additionalRequirementProfileIds = useMemo(
    () => getClinicalProfileIdsFromSelections(species, patient.comorbidityIds ?? []),
    [patient.comorbidityIds, species],
  )

  const visibleFoods = useMemo(() => {
    const typeFilter = resolveFoodTypeFilter(dietType)
    const base = filterFoods({
      species,
      query: searchQuery,
      category: categoryFilter === 'all' ? undefined : categoryFilter,
    })

    return typeFilter ? base.filter((food) => typeFilter.includes(food.foodType)) : base
  }, [categoryFilter, dietType, searchQuery, species])

  const selectedFoods = useMemo(() => {
    return entries
      .map((entry) => {
        const food = getFoodById(entry.foodId)
        return food ? { entry, food } : null
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
  }, [entries])

  const preview = useMemo(() => {
    if (!entries.length || targetEnergy <= 0 || currentWeight <= 0) {
      return null
    }
    return computeDietPlan({
      entries,
      targetEnergy,
      species,
      weightKg: currentWeight,
      mealsPerDay,
      patientName: patient.name ?? 'Paciente',
      requirementProfileId: requirementProfileId || undefined,
      additionalRequirementProfileIds,
    })
  }, [additionalRequirementProfileIds, currentWeight, entries, mealsPerDay, patient.name, requirementProfileId, species, targetEnergy])

  const inclusionSum = useMemo(() => entries.reduce((sum, entry) => sum + entry.inclusionPct, 0), [entries])
  const detailsFood = detailsFoodId ? getFoodById(detailsFoodId) : undefined

  const addFood = (foodId: string) => {
    setEntries((current) => {
      if (current.some((entry) => entry.foodId === foodId)) return current
      if (!current.length) return [{ foodId, inclusionPct: 100 }]
      const redistributed = current.map((entry) => ({ ...entry, inclusionPct: (entry.inclusionPct * 100) / (100 + 10) }))
      return [...redistributed, { foodId, inclusionPct: 10 }]
    })
  }

  const removeFood = (foodId: string) => {
    setEntries((current) => current.filter((entry) => entry.foodId !== foodId))
  }

  const updateInclusion = (foodId: string, value: number) => {
    setEntries((current) =>
      current.map((entry) =>
        entry.foodId === foodId
          ? {
              ...entry,
              inclusionPct: Number.isFinite(value) && value >= 0 ? value : entry.inclusionPct,
            }
          : entry,
      ),
    )
  }

  const handleNext = () => {
    if (!preview) return
    setDiet({
      dietType,
      mealsPerDay,
      targetEnergy,
      entries: preview.normalizedEntries,
      totalDryMatterGrams: preview.totalDryMatterGrams,
      totalAsFedGrams: preview.totalAsFedGrams,
      gramsPerDay: preview.totalAsFedGrams,
      gramsPerMeal: preview.feedingPlan.meals[0]?.gramsAsFed ?? 0,
      requirementProfileId: requirementProfileId || undefined,
      additionalRequirementProfileIds,
    })
    navigate(`${NEW_ROUTE}/summary`)
  }

  return (
    <>
      <Card className="w-full border-border dark:border-orange-500/10 bg-white dark:bg-[#141010] shadow-[0_18px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
        <CardHeader className="border-b border-border dark:border-white/5 pb-6">
          <CardTitle className="text-2xl text-foreground dark:text-white">Alimentos e formulacao</CardTitle>
          <CardDescription>Selecione o tipo de dieta, monte a mistura e acompanhe a conversao entre materia seca e materia natural.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
            {DIET_TYPE_OPTIONS.map((option) => {
              const Icon = option.icon
              const active = dietType === option.value

              let containerClass = 'border-border dark:border-white/10 bg-white dark:bg-[#1b1514] hover:border-orange-500/30 hover:bg-orange-500/[0.05] text-muted-foreground'
              let iconClass = 'border-border dark:border-white/10 bg-slate-100 dark:bg-black/20 text-muted-foreground'
              let textClass = 'text-foreground dark:text-white'

              if (active) {
                if (option.value === 'commercial') {
                  containerClass = 'border-cyan-200 dark:border-cyan-400/60 bg-cyan-50 dark:bg-cyan-500/12 shadow-[0_16px_32px_rgba(6,182,212,0.12)] ring-1 ring-cyan-200 dark:ring-cyan-400/30'
                  iconClass = 'border-cyan-200 dark:border-cyan-400/40 bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300'
                  textClass = 'text-cyan-900 dark:text-cyan-50'
                } else if (option.value === 'natural') {
                  containerClass = 'border-emerald-200 dark:border-emerald-400/60 bg-emerald-50 dark:bg-emerald-500/12 shadow-[0_16px_32px_rgba(16,185,129,0.12)] ring-1 ring-emerald-200 dark:ring-emerald-400/30'
                  iconClass = 'border-emerald-200 dark:border-emerald-400/40 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300'
                  textClass = 'text-emerald-900 dark:text-emerald-50'
                } else {
                  containerClass = 'border-fuchsia-200 dark:border-fuchsia-400/60 bg-fuchsia-50 dark:bg-fuchsia-500/12 shadow-[0_16px_32px_rgba(217,70,239,0.12)] ring-1 ring-fuchsia-200 dark:ring-fuchsia-400/30'
                  iconClass = 'border-fuchsia-200 dark:border-fuchsia-400/40 bg-fuchsia-100 dark:bg-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-300'
                  textClass = 'text-fuchsia-900 dark:text-fuchsia-50'
                }
              }

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setDietType(option.value)}
                  className={cn(
                    'rounded-3xl border px-5 py-5 text-left transition-all duration-300 hover:-translate-y-1 active:scale-[0.99]',
                    containerClass,
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={cn('font-semibold', textClass)}>{option.label}</p>
                      <p className="mt-1 text-sm text-muted-foreground/80">{option.description}</p>
                    </div>
                    <span className={cn('rounded-2xl border p-3 transition-colors', iconClass)}>
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                </button>
              )
            })}

          <section className="rounded-3xl border border-white/10 bg-[#171212] p-5">
            <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr_0.95fr]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar alimento" className="pl-9" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="rounded-2xl border-white/10 bg-[#221a19]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={requirementProfileId} onValueChange={setRequirementProfileId}>
                <SelectTrigger className="rounded-2xl border-white/10 bg-[#221a19]">
                  <SelectValue placeholder="Perfil de exigencia" />
                </SelectTrigger>
                <SelectContent className="max-h-96">
                  {requirementOptions.map((profile) => (
                    <SelectItem key={profile.id} value={profile.id}>
                      {getHumanRequirementLabel(profile)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline">Perfil principal: {getHumanRequirementLabel(requirementOptions.find((item) => item.id === requirementProfileId))}</Badge>
              {comorbidityLabels.map((label) => (
                <Badge key={label} variant="outline">
                  {label}
                </Badge>
              ))}
            </div>
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-4 rounded-3xl border border-white/10 bg-[#171212] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-white">Catalogo de alimentos</p>
                  <p className="text-sm text-muted-foreground">{visibleFoods.length} opcoes compativeis com a especie selecionada.</p>
                </div>
                <Badge variant="outline">{species === 'dog' ? 'Cao' : 'Gato'}</Badge>
              </div>

              <div className="max-h-[34rem] space-y-3 overflow-y-auto pr-1">
                {visibleFoods.map((food) => (
                  <div key={food.id} className="rounded-2xl border border-white/10 bg-[#221a19] p-4 transition-colors hover:border-orange-500/30 hover:bg-[#2a1f1c]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{food.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{food.categoryNormalized ?? 'Sem categoria'} · {food.presentation || 'Apresentacao nao informada'}</p>
                      </div>
                      <Button size="sm" className="gap-2" onClick={() => addFood(food.id)} disabled={entries.some((entry) => entry.foodId === food.id)}>
                        <Plus className="h-4 w-4" />
                        Adicionar
                      </Button>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-white/10 bg-[#171212] p-3">
                        <p className="text-[11px] text-muted-foreground">Energia</p>
                        <p className="mt-1 font-semibold text-white">{formatFoodKcalPerGram(food)}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-[#171212] p-3">
                        <p className="text-[11px] text-muted-foreground">Proteina bruta</p>
                        <p className="mt-1 font-semibold text-white">{formatNutrient(food.nutrientsAsFed.crudeProteinPct, '%')}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-[#171212] p-3">
                        <p className="text-[11px] text-muted-foreground">Extrato etereo</p>
                        <p className="mt-1 font-semibold text-white">{formatNutrient(food.nutrientsAsFed.etherExtractPct, '%')}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button id={`food-details-${food.id}`} variant="ghost" size="sm" onClick={() => setDetailsFoodId(food.id)}>
                        Saber mais informacoes nutricionais
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-[#171212] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-white">Mistura selecionada</p>
                    <p className="text-sm text-muted-foreground">Inclusao em base de materia seca.</p>
                  </div>
                  <Badge variant={Math.abs(inclusionSum - 100) <= 0.5 ? 'outline' : 'secondary'}>{inclusionSum.toFixed(1)}%</Badge>
                </div>

                {selectedFoods.length === 0 ? (
                  <div className="mt-4 rounded-2xl border border-dashed border-white/10 p-4 text-sm text-muted-foreground">Nenhum alimento adicionado ainda.</div>
                ) : (
                  <div className="mt-4 space-y-3">
                    {selectedFoods.map(({ food, entry }) => (
                      <div key={food.id} className="rounded-2xl border border-white/10 bg-[#221a19] p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-white">{food.name}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {formatNutrient(food.nutrientsDryMatter.energyKcalPer100g, 'kcal/100g MS', 1)} · {formatNutrient(food.nutrientsAsFed.dryMatterPct, '% MS', 1)}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeFood(food.id)}>
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>

                        <div className="mt-3 grid gap-3 md:grid-cols-[1fr_0.5fr]">
                          <div className="space-y-2">
                            <Label>Inclusao (%)</Label>
                            <Input type="number" min="0" step="0.1" value={entry.inclusionPct} onChange={(event) => updateInclusion(food.id, Number(event.target.value))} />
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-[#171212] p-3">
                            <p className="text-xs text-muted-foreground">Dados faltantes</p>
                            <p className="mt-1 text-lg font-bold text-white">{food.missingNutrients.length}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-3xl border border-orange-400/20 bg-gradient-to-br from-orange-500/[0.10] to-transparent p-5">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-white">Materia seca e materia natural</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" className="text-muted-foreground">
                          <Info className="h-4 w-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Materia seca remove a agua do alimento para comparar ingredientes diferentes. Materia natural mostra quanto sera realmente servido.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-[#171212] p-4">
                    <p className="text-sm font-semibold text-white">Materia seca</p>
                    <p className="mt-1 text-sm text-muted-foreground">Usada para balancear a mistura e distribuir as inclusoes.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#171212] p-4">
                    <p className="text-sm font-semibold text-white">Materia natural</p>
                    <p className="mt-1 text-sm text-muted-foreground">Mostra a quantidade final que sera ofertada ao paciente.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-3xl border border-white/10 bg-[#171212] p-5">
              <div>
                <Label className="text-base font-semibold text-white">Quantidade de refeicoes por dia</Label>
                <p className="mt-1 text-sm text-muted-foreground">O fracionamento final por refeicao e recalculado automaticamente.</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                {MEALS_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setMealsPerDay(option)}
                    className={cn(
                      'rounded-2xl border px-3 py-4 text-center transition-all hover:-translate-y-0.5 active:scale-[0.99]',
                      mealsPerDay === option ? 'border-orange-400/60 bg-orange-500/12 text-white' : 'border-white/10 bg-[#221a19] text-muted-foreground',
                    )}
                  >
                    <p className="text-2xl font-black">{option}</p>
                    <p className="text-xs">refeicoes</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-[#171212] p-5">
                <p className="text-sm text-muted-foreground">Energia-alvo</p>
                <p className="mt-1 text-3xl font-black text-orange-300">{targetEnergy.toFixed(0)} kcal/dia</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-[#171212] p-5">
                <p className="text-sm text-muted-foreground">Peso usado</p>
                <p className="mt-1 text-3xl font-black text-white">{currentWeight.toFixed(2)} kg</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-[#171212] p-5">
                <p className="text-sm text-muted-foreground">Perfil clinico</p>
                <p className="mt-1 text-base font-semibold text-white">{getHumanRequirementLabel(requirementOptions.find((item) => item.id === requirementProfileId))}</p>
              </div>
            </div>
          </section>

          {preview && (
            <section className="rounded-3xl border border-orange-400/25 bg-gradient-to-r from-orange-500/12 via-black/10 to-transparent p-5">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Total materia seca</p>
                  <p className="mt-1 text-3xl font-black text-orange-300">{preview.totalDryMatterGrams.toFixed(1)} g</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total materia natural</p>
                  <p className="mt-1 text-3xl font-black text-orange-300">{preview.totalAsFedGrams.toFixed(1)} g</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Por refeicao</p>
                  <p className="mt-1 text-3xl font-black text-orange-300">{preview.feedingPlan.meals[0]?.gramsAsFed.toFixed(1) ?? '0.0'} g</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {preview.contributions.map((item) => (
                  <div key={item.foodId} className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#171212] px-4 py-3 text-sm">
                    <div>
                      <p className="font-medium text-white">{item.foodName}</p>
                      <p className="text-xs text-muted-foreground">{item.inclusionPct.toFixed(1)}% da mistura em MS</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">{item.gramsAsFed.toFixed(1)} g/dia</p>
                      <p className="text-xs text-muted-foreground">{item.deliveredKcal.toFixed(1)} kcal</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="flex justify-between border-t border-white/5 pt-4">
            <Button variant="outline" onClick={() => navigate(`${NEW_ROUTE}/target`)} className="gap-2">
              <ChevronLeft className="h-4 w-4" /> Anterior
            </Button>
            <Button onClick={handleNext} className="gap-2" id="btn-next-summary" disabled={!preview || !entries.length}>
              Ver resumo <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!detailsFood} onOpenChange={(open) => !open && setDetailsFoodId(null)}>
        <DialogContent className="w-[min(96vw,1120px)] max-w-[1120px] sm:max-w-[1120px] border border-orange-400/20 bg-[#141010]">
          <DialogHeader>
            <DialogTitle className="text-white">{detailsFood?.name ?? 'Informacoes nutricionais'}</DialogTitle>
          </DialogHeader>

          {detailsFood && (
            <div className="space-y-5">
              <div className="grid gap-3 md:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-[#1c1514] p-4">
                  <p className="text-xs text-muted-foreground">Energia</p>
                  <p className="mt-1 font-semibold text-white">{formatNutrient(detailsFood.nutrientsAsFed.energyKcalPer100g, 'kcal/100g')}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#1c1514] p-4">
                  <p className="text-xs text-muted-foreground">Proteina</p>
                  <p className="mt-1 font-semibold text-white">{formatNutrient(detailsFood.nutrientsAsFed.crudeProteinPct, '%')}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#1c1514] p-4">
                  <p className="text-xs text-muted-foreground">Gordura</p>
                  <p className="mt-1 font-semibold text-white">{formatNutrient(detailsFood.nutrientsAsFed.etherExtractPct, '%')}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#1c1514] p-4">
                  <p className="text-xs text-muted-foreground">Umidade</p>
                  <p className="mt-1 font-semibold text-white">{formatNutrient(detailsFood.nutrientsAsFed.moisturePct, '%')}</p>
                </div>
              </div>

              <div className="grid gap-5 xl:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-[#1c1514] p-4">
                  <p className="text-base font-semibold text-white">Materia natural</p>
                  <div className="mt-4 max-h-[26rem] space-y-2 overflow-y-auto pr-1">
                    {GENUTRI_NUTRIENT_CATALOG.map((nutrient) => (
                      <div key={`asfed-${nutrient.key}`} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 px-3 py-2">
                        <p className="text-sm text-muted-foreground">{nutrient.label}</p>
                        <p className="text-sm font-medium text-white">{formatNutrient(detailsFood.nutrientsAsFed[nutrient.key], nutrient.unit)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#1c1514] p-4">
                  <p className="text-base font-semibold text-white">Materia seca</p>
                  <div className="mt-4 max-h-[26rem] space-y-2 overflow-y-auto pr-1">
                    {GENUTRI_NUTRIENT_CATALOG.map((nutrient) => (
                      <div key={`dm-${nutrient.key}`} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 px-3 py-2">
                        <p className="text-sm text-muted-foreground">{nutrient.label}</p>
                        <p className="text-sm font-medium text-white">{formatNutrient(detailsFood.nutrientsDryMatter[nutrient.key], nutrient.unit)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#1c1514] p-4">
                <p className="text-base font-semibold text-white">Observacoes e rastreabilidade</p>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/5 p-3">
                    <p className="text-xs text-muted-foreground">Categoria</p>
                    <p className="mt-1 text-sm text-white">{detailsFood.categoryNormalized ?? 'Dado nao cadastrado'}</p>
                  </div>
                  <div className="rounded-2xl border border-white/5 p-3">
                    <p className="text-xs text-muted-foreground">Tipo</p>
                    <p className="mt-1 text-sm text-white">{detailsFood.foodType}</p>
                  </div>
                  <div className="rounded-2xl border border-white/5 p-3 md:col-span-2">
                    <p className="text-xs text-muted-foreground">Observacoes</p>
                    <p className="mt-1 text-sm text-white">{detailsFood.notes.join(' · ') || 'Dado nao cadastrado'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
