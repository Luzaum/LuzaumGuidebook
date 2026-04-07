import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Info, Plus, Search, Trash2 } from 'lucide-react'
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
  GENUTRI_NUTRIENT_CATALOG,
} from '../../lib/genutriData'
import { getClinicalProfileIdsFromSelections } from '../../lib/clinicalProfiles'
import type { DietFormulaEntry, DietType, FoodItem } from '../../types'
import { MEALS_OPTIONS } from '../../lib/nutrition'
import { cn } from '../../lib/utils'
import { EnergyPartitionChart } from '../../components/EnergyPartitionChart'
import { DIET_CATALOG_TITLE, DietTypeCards } from '../../components/DietTypeCards'

const NEW_ROUTE = '/calculadora-energetica/new'

const REQUIRED_NUTRIENT_KEYS = new Set([
  'moisturePct',
  'dryMatterPct',
  'energyKcalPer100g',
  'crudeProteinPct',
  'etherExtractPct',
  'ashPct',
  'crudeFiberPct',
  'nitrogenFreeExtractPct',
  'calciumPct',
  'phosphorusPct',
])

function resolveFoodTypeFilter(dietType: DietType): string[] | undefined {
  if (dietType === 'commercial') return ['commercial']
  if (dietType === 'natural') return ['natural', 'suplemento', 'enteral']
  return undefined
}

function formatNutrient(value: number | null | undefined, unit?: string | null, decimals = 2) {
  if (value == null) return 'Dado não cadastrado'
  return `${value.toFixed(decimals)} ${unit ?? ''}`.trim()
}

function formatKcal(food: FoodItem) {
  const kcal = food.nutrientsAsFed.energyKcalPer100g
  if (kcal == null) return '—'
  return `${kcal.toFixed(0)} kcal/100g`
}

function getDetailNutrientsForBasis(basis: Record<string, number | null>) {
  return GENUTRI_NUTRIENT_CATALOG.filter((nutrient) => {
    if (REQUIRED_NUTRIENT_KEYS.has(nutrient.key)) return true
    return basis[nutrient.key] != null
  })
}

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
  const requirementProfileId = diet.requirementProfileId ?? defaultRequirement?.id ?? ''

  const [dietType, setDietType] = useState<DietType>(diet.dietType ?? 'commercial')
  const [mealsPerDay, setMealsPerDay] = useState<number>(diet.mealsPerDay ?? 2)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [entries, setEntries] = useState<DietFormulaEntry[]>(diet.entries ?? [])
  const [detailsFoodId, setDetailsFoodId] = useState<string | null>(null)

  const categories = useMemo(() => getFoodCategories(), [])
  const additionalRequirementProfileIds = useMemo(
    () => getClinicalProfileIdsFromSelections(species, patient.comorbidityIds ?? []),
    [patient.comorbidityIds, species],
  )

  const visibleFoods = useMemo(() => {
    const typeFilter = resolveFoodTypeFilter(dietType)
    const base = filterFoods({ species, query: searchQuery, category: categoryFilter === 'all' ? undefined : categoryFilter })
    return typeFilter ? base.filter((food) => typeFilter.includes(food.foodType)) : base
  }, [categoryFilter, dietType, searchQuery, species])

  const selectedFoods = useMemo(
    () =>
      entries
        .map((entry) => {
          const food = getFoodById(entry.foodId)
          return food ? { entry, food } : null
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    [entries],
  )

  const preview = useMemo(() => {
    if (!entries.length || targetEnergy <= 0 || currentWeight <= 0) return null
    return computeDietPlan({
      entries, targetEnergy, species, weightKg: currentWeight, mealsPerDay,
      patientName: patient.name ?? 'Paciente',
      requirementProfileId: requirementProfileId || undefined,
      additionalRequirementProfileIds,
    })
  }, [additionalRequirementProfileIds, currentWeight, entries, mealsPerDay, patient.name, requirementProfileId, species, targetEnergy])

  const inclusionSum = useMemo(() => entries.reduce((sum, e) => sum + e.inclusionPct, 0), [entries])
  const detailsFood = detailsFoodId ? getFoodById(detailsFoodId) : undefined

  // Modo de formulação: manual = edita só o item | complement = redistribui para somar 100%
  const [formulationMode, setFormulationMode] = useState<'manual' | 'complement'>(diet.formulationMode ?? 'manual')
  // Último alimento editado manualmente — preservado no "Completar %"
  const [lastEditedFoodId, setLastEditedFoodId] = useState<string | null>(null)

  // Estado local para inputs em edição (evita o input "pular" enquanto o usuário digita)
  const [editingPct, setEditingPct] = useState<Record<string, string>>({})
  const [editingGrams, setEditingGrams] = useState<Record<string, string>>({})

  // Feedback visual: qual item foi editado e quais foram redistribuídos
  const [flashedFood, setFlashedFood] = useState<string | null>(null)
  const [flashedImpacted, setFlashedImpacted] = useState<string[]>([])

  const flashItem = (foodId: string, impactedIds: string[] = []) => {
    setFlashedFood(foodId)
    setFlashedImpacted(impactedIds)
    setTimeout(() => { setFlashedFood(null); setFlashedImpacted([]) }, 1200)
  }

  const addFood = (foodId: string) => {
    setEntries((current) => {
      if (current.some((e) => e.foodId === foodId)) return current
      if (!current.length) return [{ foodId, inclusionPct: 100 }]
      return [...current, { foodId, inclusionPct: 0 }]
    })
  }

  const removeFood = (foodId: string) => {
    setEntries((current) => current.filter((e) => e.foodId !== foodId))
    setEditingPct((p) => { const n = { ...p }; delete n[foodId]; return n })
    setEditingGrams((p) => { const n = { ...p }; delete n[foodId]; return n })
  }

  // Modo automático: seta o item editado e reescala os outros para a soma fechar 100%
  const updateInclusionAuto = (foodId: string, value: number) => {
    setEntries((current) => {
      const others = current.filter((e) => e.foodId !== foodId)
      const othersSum = others.reduce((s, e) => s + e.inclusionPct, 0)
      const remainder = Math.max(0, 100 - value)
      return current.map((e) => {
        if (e.foodId === foodId) return { ...e, inclusionPct: value }
        return { ...e, inclusionPct: othersSum > 0 ? (e.inclusionPct / othersSum) * remainder : remainder / Math.max(1, others.length) }
      })
    })
  }

  // Modo travado: altera só o item; outros ficam intocados (soma pode ≠ 100%)
  const updateInclusion = (foodId: string, value: number) =>
    setEntries((current) =>
      current.map((e) => e.foodId === foodId ? { ...e, inclusionPct: Number.isFinite(value) && value >= 0 ? value : e.inclusionPct } : e),
    )

  // Escala o inclusionPct do item pela proporção gramas pedidas / gramas atuais
  const updateGrams = (foodId: string, newGrams: number) => {
    if (!preview || !Number.isFinite(newGrams) || newGrams <= 0) return
    const contribution = preview.contributions.find((c) => c.foodId === foodId)
    if (!contribution || contribution.gramsAsFed <= 0) return
    const scaleFactor = newGrams / contribution.gramsAsFed
    const newPct = Math.max(0.001, (entries.find((e) => e.foodId === foodId)?.inclusionPct ?? 0) * scaleFactor)
    if (formulationMode === 'complement') {
      updateInclusionAuto(foodId, newPct)
    } else {
      setEntries((current) =>
        current.map((e) => e.foodId === foodId ? { ...e, inclusionPct: newPct } : e),
      )
    }
  }

  // Helpers para exibir valores nos inputs
  const getPctValue = (foodId: string, rawPct: number) =>
    editingPct[foodId] !== undefined ? editingPct[foodId] : rawPct.toFixed(2)

  const getGramsValue = (foodId: string) => {
    if (editingGrams[foodId] !== undefined) return editingGrams[foodId]
    const contribution = preview?.contributions.find((c) => c.foodId === foodId)
    return contribution ? contribution.gramsAsFed.toFixed(1) : ''
  }

  const commitPct = (foodId: string, rawPct: number) => {
    const raw = editingPct[foodId]
    if (raw !== undefined) {
      const num = parseFloat(raw)
      if (Number.isFinite(num) && num >= 0 && num <= 100) {
        const wouldAllBeZero = entries.every((e) => e.foodId === foodId ? num === 0 : e.inclusionPct === 0)
        if (!wouldAllBeZero) {
          setLastEditedFoodId(foodId)
          if (formulationMode === 'complement') {
            const otherIds = entries.filter((e) => e.foodId !== foodId).map((e) => e.foodId)
            updateInclusionAuto(foodId, num)
            flashItem(foodId, otherIds)
          } else {
            updateInclusion(foodId, num)
            flashItem(foodId)
          }
        }
      }
    }
    setEditingPct((p) => { const n = { ...p }; delete n[foodId]; return n })
  }

  const commitGrams = (foodId: string) => {
    const raw = editingGrams[foodId]
    if (raw !== undefined) {
      const num = parseFloat(raw)
      if (Number.isFinite(num) && num > 0) {
        setLastEditedFoodId(foodId)
        const otherIds = formulationMode === 'complement' ? entries.filter((e) => e.foodId !== foodId).map((e) => e.foodId) : []
        updateGrams(foodId, num)
        flashItem(foodId, otherIds)
      }
    }
    setEditingGrams((p) => { const n = { ...p }; delete n[foodId]; return n })
  }

  // Completar %: fecha a fórmula em 100%, PRESERVANDO o último item editado manualmente.
  // Os demais itens são redistribuídos proporcionalmente para completar o restante.
  const complementOtherPercentages = () => {
    if (entries.length === 0) return

    const preserved = lastEditedFoodId ?? entries[entries.length - 1].foodId
    const preservedEntry = entries.find((e) => e.foodId === preserved)
    if (!preservedEntry) return

    const preservedPct = preservedEntry.inclusionPct
    const remainder = Math.max(0, 100 - preservedPct)
    const others = entries.filter((e) => e.foodId !== preserved)
    const othersSum = others.reduce((s, e) => s + e.inclusionPct, 0)

    setEntries((current) =>
      current.map((e) => {
        if (e.foodId === preserved) return e // preserva intocado
        return {
          ...e,
          inclusionPct: othersSum > 0
            ? (e.inclusionPct / othersSum) * remainder
            : remainder / Math.max(1, others.length),
        }
      }),
    )
    flashItem(preserved, others.map((e) => e.foodId))
  }

  const handleNext = () => {
    if (!preview) return
    setDiet({
      dietType, mealsPerDay, targetEnergy,
        entries,
      totalDryMatterGrams: preview.totalDryMatterGrams,
      totalAsFedGrams: preview.totalAsFedGrams,
      gramsPerDay: preview.totalAsFedGrams,
      gramsPerMeal: preview.feedingPlan.meals[0]?.gramsAsFed ?? 0,
      requirementProfileId: requirementProfileId || undefined,
      additionalRequirementProfileIds,
      formulationMode,
    })
    navigate(`${NEW_ROUTE}/summary`)
  }

  return (
    <>
      <Card className="w-full border-border dark:border-orange-500/10 bg-white dark:bg-[#141010] shadow-[0_18px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
        <CardHeader className="border-b border-border dark:border-white/5 pb-5">
          <CardTitle className="text-2xl text-foreground dark:text-white">Alimentos e formulação</CardTitle>
          <CardDescription>Monte a dieta e acompanhe a prévia nutricional ao vivo.</CardDescription>
        </CardHeader>

        <CardContent className="pt-0 px-0">
          {/* Layout 2 painéis com scroll independente */}
          <div className="grid xl:grid-cols-2 divide-y xl:divide-y-0 xl:divide-x divide-border dark:divide-white/5">

            {/* ─── COLUNA ESQUERDA ─── */}
            <div className="space-y-5 min-w-0 px-6 pt-6 pb-6 xl:overflow-y-auto xl:max-h-[calc(100svh-220px)]">

              <DietTypeCards value={dietType} onChange={setDietType} />

              {/* Filtros de busca */}
              <div className="rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-[#171212] p-4 space-y-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar alimento..."
                    className="pl-9 border-border bg-card dark:border-white/10 dark:bg-[#221a19]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="rounded-xl border-border bg-card text-sm dark:border-white/10 dark:bg-[#221a19]">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Catálogo de alimentos */}
              <div className="rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-[#171212] p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-foreground dark:text-white">
                    {DIET_CATALOG_TITLE[dietType]} — {visibleFoods.length} opções
                  </p>
                  <Badge variant="outline" className="text-xs">{species === 'dog' ? 'Cão' : 'Gato'}</Badge>
                </div>
                <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                  {visibleFoods.map((food) => {
                    const alreadyAdded = entries.some((e) => e.foodId === food.id)
                    return (
                      <div
                        key={food.id}
                        className="rounded-xl border border-border bg-card p-3 transition-colors hover:border-orange-400/30 dark:border-white/10 dark:bg-[#221a19]"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground dark:text-white truncate">{food.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{food.categoryNormalized ?? 'Sem categoria'}</p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground" onClick={() => setDetailsFoodId(food.id)}>
                              Info
                            </Button>
                            <Button size="sm" className="h-7 px-2 text-xs gap-1" onClick={() => addFood(food.id)} disabled={alreadyAdded}>
                              <Plus className="h-3 w-3" />{alreadyAdded ? 'Adicionado' : 'Add'}
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-1.5">
                          {[
                            { label: 'Energia', value: formatKcal(food) },
                            { label: 'Proteína', value: formatNutrient(food.nutrientsAsFed.crudeProteinPct, '%', 1) },
                            { label: 'Gordura', value: formatNutrient(food.nutrientsAsFed.etherExtractPct, '%', 1) },
                          ].map((item) => (
                            <div key={item.label} className="rounded-lg bg-muted/60 px-2 py-1.5 dark:bg-black/20">
                              <p className="text-[10px] text-muted-foreground">{item.label}</p>
                              <p className="text-xs font-semibold text-foreground dark:text-white mt-0.5">{item.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Mistura selecionada */}
              <div className="rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-[#171212] p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground dark:text-white">Formulação</p>
                  <div className="flex items-center gap-2">
                    {/* Seletor de modo */}
                    <div className="flex overflow-hidden rounded-xl border border-border text-[10px] font-semibold dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => setFormulationMode('manual')}
                        className={cn(
                          'px-2.5 py-1.5 transition-colors',
                          formulationMode === 'manual'
                            ? 'bg-orange-500/20 text-orange-200'
                            : 'text-muted-foreground hover:text-foreground dark:hover:text-white',
                        )}
                      >
                        Modo manual
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormulationMode('complement')}
                        className={cn(
                          'border-l border-border px-2.5 py-1.5 transition-colors dark:border-white/10',
                          formulationMode === 'complement'
                            ? 'bg-sky-500/20 text-sky-200'
                            : 'text-muted-foreground hover:text-foreground dark:hover:text-white',
                        )}
                      >
                        Complementar %
                      </button>
                    </div>
                    <Badge
                      variant={formulationMode === 'manual'
                        ? (Math.abs(inclusionSum - 100) <= 0.5 ? 'outline' : 'secondary')
                        : 'outline'}
                      className={cn('text-xs', formulationMode === 'manual' && Math.abs(inclusionSum - 100) > 0.5 && 'border-sky-400/40 text-sky-300')}
                    >
                      {inclusionSum.toFixed(1)}%
                    </Badge>
                  </div>
                </div>

                {/* Descrição do modo ativo */}
                {selectedFoods.length > 0 && (
                  <p className="text-[10px] text-muted-foreground/70 mb-3 leading-relaxed">
                    {formulationMode === 'complement'
                      ? <>Modo <span className="text-orange-300/80">complementar</span>: a redistribuição automática só acontece quando este modo está ativo.</>
                      : <>Modo <span className="text-sky-300/80">manual</span>: o app não altera automaticamente as outras porcentagens. Você controla toda a fórmula.</>
                    }
                  </p>
                )}

                {selectedFoods.length > 0 && (
                  <div className={cn(
                    'flex items-center gap-2 rounded-xl border px-3 py-2 mb-3 text-[10px] font-medium',
                    Math.abs(inclusionSum - 100) <= 0.5
                      ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300'
                      : inclusionSum < 99
                      ? 'border-amber-400/30 bg-amber-500/10 text-amber-300'
                      : 'border-rose-400/30 bg-rose-500/10 text-rose-300',
                  )}>
                    <span>{Math.abs(inclusionSum - 100) <= 0.5 ? '✓' : inclusionSum < 99 ? '⚠' : '↑'}</span>
                    <span>
                      {Math.abs(inclusionSum - 100) <= 0.5
                        ? 'Fórmula fechada corretamente (100%)'
                        : inclusionSum < 99
                        ? `Fórmula incompleta — faltam ${(100 - inclusionSum).toFixed(1)}% para fechar`
                        : `Fórmula excedente — sobram ${(inclusionSum - 100).toFixed(1)}% acima de 100%`
                      }
                    </span>
                  </div>
                )}

                {selectedFoods.length > 1 && Math.abs(inclusionSum - 100) > 0.5 && (
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      id="btn-complement-percentages"
                      className="border-orange-400/30 bg-orange-500/[0.06] text-orange-200 text-[11px]"
                      onClick={complementOtherPercentages}
                    >
                      ⟳ Completar % para 100
                    </Button>
                    {lastEditedFoodId && (
                      <p className="text-[10px] text-muted-foreground">
                        Preserva: <span className="text-orange-300/70">{getFoodById(lastEditedFoodId)?.name ?? lastEditedFoodId}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Totais da formulação */}
                {preview && selectedFoods.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="rounded-lg border border-border/60 bg-muted/50 px-2.5 py-2 text-center dark:border-white/5 dark:bg-black/20">
                      <p className="text-[10px] text-muted-foreground">Total incluído</p>
                        <p className="text-xs font-bold text-foreground dark:text-white mt-0.5">{inclusionSum.toFixed(1)}%</p>
                    </div>
                    <div className="rounded-lg border border-border/60 bg-muted/50 px-2.5 py-2 text-center dark:border-white/5 dark:bg-black/20">
                      <p className="text-[10px] text-muted-foreground">Total diário</p>
                      <p className="text-xs font-bold text-orange-300 mt-0.5">{preview.totalAsFedGrams.toFixed(1)} g</p>
                    </div>
                    <div className="rounded-lg border border-border/60 bg-muted/50 px-2.5 py-2 text-center dark:border-white/5 dark:bg-black/20">
                      <p className="text-[10px] text-muted-foreground">Total kcal</p>
                      <p className="text-xs font-bold text-orange-300 mt-0.5">{preview.totalKcal.toFixed(0)} kcal</p>
                    </div>
                  </div>
                )}
                {selectedFoods.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-border p-3 text-sm text-muted-foreground dark:border-white/10">
                    Nenhum alimento adicionado ainda.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {selectedFoods.map(({ food, entry }) => {
                      const contribution = preview?.contributions.find((c) => c.foodId === food.id)
                      const gramsPerMeal = contribution && mealsPerDay > 0 ? contribution.gramsAsFed / mealsPerDay : null
                      const isFlashedEdited = flashedFood === food.id
                      const isFlashedImpacted = flashedImpacted.includes(food.id)

                      return (
                        <div
                          key={food.id}
                          className={cn(
                            'rounded-xl border p-3 space-y-3 transition-all duration-300',
                            isFlashedEdited
                              ? 'border-orange-400/60 bg-orange-500/[0.10] shadow-[0_0_12px_rgba(249,115,22,0.15)]'
                              : isFlashedImpacted
                              ? 'border-sky-400/30 bg-sky-500/[0.06]'
                              : 'border-border bg-card dark:border-white/10 dark:bg-[#221a19]',
                          )}
                        >
                          {/* Cabeçalho do alimento */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-foreground dark:text-white truncate">{food.name}</p>
                              <p className="text-xs text-muted-foreground">{food.categoryNormalized ?? 'Sem categoria'} · MS: {formatNutrient(food.nutrientsAsFed.dryMatterPct, '%', 1)}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => removeFood(food.id)}>
                              <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                            </Button>
                          </div>

                          {/* Campos editáveis — bidirecionais */}
                          <div className="grid grid-cols-2 gap-2">
                            {/* % de inclusão */}
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <Label className="text-[10px] text-orange-300/70 uppercase tracking-wider">Inclusão na fórmula (%)</Label>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="text-muted-foreground cursor-default"><Info className="h-3 w-3" /></span>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-[220px] text-xs">
                                      Percentual em base seca (MS). Alterar aqui recalcula a quantidade em gramas automaticamente.
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                step="0.1"
                                data-field="inclusion-pct"
                                data-food-id={food.id}
                                value={getPctValue(food.id, entry.inclusionPct)}
                                onChange={(e) => setEditingPct((p) => ({ ...p, [food.id]: e.target.value }))}
                                onBlur={() => commitPct(food.id, entry.inclusionPct)}
                                onKeyDown={(e) => e.key === 'Enter' && commitPct(food.id, entry.inclusionPct)}
                                className="h-8 border-border bg-muted/50 text-sm transition-colors focus:border-orange-400/60 dark:border-white/10 dark:bg-black/20"
                              />
                            </div>

                            {/* Gramagem diária */}
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <Label className="text-[10px] text-sky-300/70 uppercase tracking-wider">Quantidade diária (g MN)</Label>
                              </div>
                              <Input
                                type="number"
                                min="0"
                                step="0.5"
                                data-field="grams-as-fed"
                                data-food-id={food.id}
                                value={getGramsValue(food.id)}
                                placeholder={preview ? '—' : 'sem prévia'}
                                disabled={!preview}
                                onChange={(e) => setEditingGrams((p) => ({ ...p, [food.id]: e.target.value }))}
                                onBlur={() => commitGrams(food.id)}
                                onKeyDown={(e) => e.key === 'Enter' && commitGrams(food.id)}
                                className="h-8 border-border bg-muted/50 text-sm transition-colors focus:border-orange-400/60 disabled:opacity-40 dark:border-white/10 dark:bg-black/20"
                              />
                            </div>
                          </div>

                          {/* Stats derivados — somente leitura */}
                          {contribution && (
                            <div className="grid grid-cols-2 gap-2">
                              <div className="rounded-lg bg-muted/50 px-2.5 py-2 dark:bg-black/20">
                                <p className="text-[10px] text-muted-foreground">Quantidade por refeição</p>
                                <p className="text-xs font-semibold text-foreground dark:text-white mt-0.5">
                                  {gramsPerMeal != null ? `${gramsPerMeal.toFixed(1)} g` : '—'}
                                </p>
                              </div>
                              <div className="rounded-lg bg-muted/50 px-2.5 py-2 dark:bg-black/20">
                                <p className="text-[10px] text-muted-foreground">Energia entregue</p>
                                <p className="text-xs font-semibold text-orange-300 mt-0.5">
                                  {contribution.deliveredKcal.toFixed(1)} kcal/dia
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Normalização — aviso quando a soma não fecha 100% */}
                          {isFlashedImpacted && !isFlashedEdited && (
                            <p className="text-[10px] text-sky-400/80 animate-pulse">
                              ↺ redistribuído pela edição de outro alimento
                            </p>
                          )}

                          {/* Aviso de normalização quando a soma dos pesos brutos ≠ 100 */}
                          {preview && !isFlashedImpacted && (() => {
                            const norm = preview.normalizedEntries.find((e) => e.foodId === food.id)
                            const normPct = norm?.inclusionPct ?? entry.inclusionPct
                            if (Math.abs(normPct - entry.inclusionPct) < 0.5) return null
                            return (
                              <p className="text-[10px] text-amber-400/70">
                                % final normalizado: {normPct.toFixed(1)}
                              </p>
                            )
                          })()}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Refeições + stats */}
              <div className="rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-[#171212] p-4 space-y-4">
                <div>
                  <Label className="text-sm font-semibold text-foreground dark:text-white">Refeições por dia</Label>
                  <div className="mt-2 grid grid-cols-5 gap-2">
                    {MEALS_OPTIONS.map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setMealsPerDay(n)}
                        className={cn(
                          'rounded-xl border px-2 py-3 text-center transition-all hover:-translate-y-0.5 active:scale-[0.98]',
                          mealsPerDay === n
                            ? 'border-orange-400/60 bg-orange-500/12 text-orange-900 dark:text-orange-200'
                            : 'border-border bg-card text-muted-foreground dark:border-white/10 dark:bg-[#221a19]',
                        )}
                      >
                        <p className="text-xl font-black">{n}</p>
                        <p className="text-[10px]">ref.</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-xl border border-orange-400/20 bg-orange-500/[0.08] p-3 text-center">
                    <p className="text-[10px] text-muted-foreground">Energia-alvo</p>
                    <p className="text-lg font-black text-orange-300 mt-0.5">{targetEnergy.toFixed(0)}</p>
                    <p className="text-[10px] text-muted-foreground">kcal/dia</p>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/40 p-3 text-center dark:border-white/10 dark:bg-black/10">
                    <p className="text-[10px] text-muted-foreground">Peso usado</p>
                    <p className="mt-0.5 text-lg font-black text-foreground dark:text-white">{currentWeight.toFixed(1)}</p>
                    <p className="text-[10px] text-muted-foreground">kg</p>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/40 p-3 text-center dark:border-white/10 dark:bg-black/10">
                    <p className="text-[10px] text-muted-foreground">Espécie</p>
                    <p className="mt-0.5 text-base font-black text-foreground dark:text-white">{species === 'dog' ? '🐕' : '🐈'}</p>
                    <p className="text-[10px] text-muted-foreground">{species === 'dog' ? 'Cão' : 'Gato'}</p>
                  </div>
                </div>
              </div>

              {/* Explicação MS vs MN */}
              <div className="rounded-2xl border border-orange-400/15 bg-orange-500/[0.05] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm font-semibold text-foreground dark:text-white">Matéria seca vs. natural</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" className="text-muted-foreground">
                          <Info className="h-4 w-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        Matéria seca remove a água para comparar ingredientes diferentes. Matéria natural mostra quanto será servido.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-xs text-muted-foreground">A inclusão é ajustada em base seca. O peso final ofertado é convertido para matéria natural (como fornecido).</p>
              </div>
            </div>

            {/* ─── COLUNA DIREITA — Preview ao vivo ─── */}
              <div className="min-w-0 px-6 pt-6 pb-6 xl:overflow-y-auto xl:max-h-[calc(100svh-220px)]" id="food-preview-panel">
                <div className="space-y-4">
                {/* Header do painel */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Prévia nutricional</p>
                  {preview && (
                    <Badge className="bg-orange-500/20 text-orange-200 border-orange-400/30 text-xs">Ao vivo</Badge>
                  )}
                </div>

                {!preview ? (
                  <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center dark:border-white/10 dark:bg-[#171212]">
                    <p className="text-2xl mb-2">🍽️</p>
                    <p className="text-sm text-muted-foreground">Adicione alimentos para ver a prévia nutricional em tempo real.</p>
                  </div>
                ) : (
                  <div className="space-y-4">

                    {/* Quantidades principais */}
                    <div className="rounded-2xl border border-orange-400/25 bg-gradient-to-br from-orange-500/12 to-transparent p-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-orange-300/70 mb-3">Formulação</p>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: 'Matéria seca', value: `${preview.totalDryMatterGrams.toFixed(1)} g` },
                          { label: 'Matéria natural', value: `${preview.totalAsFedGrams.toFixed(1)} g` },
                          { label: 'Por refeição', value: `${preview.feedingPlan.meals[0]?.gramsAsFed.toFixed(1) ?? '0.0'} g` },
                        ].map((item) => (
                          <div key={item.label} className="rounded-xl bg-muted/50 p-3 text-center dark:bg-black/20">
                            <p className="text-[10px] text-muted-foreground">{item.label}</p>
                            <p className="mt-1 text-base font-black text-orange-600 dark:text-orange-300">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <EnergyPartitionChart
                      totalKcal={preview.totalKcal}
                      macroSplit={preview.evaluation.macroSplit}
                      size="sm"
                    />

                    {/* Resumo nutricional */}
                    <div className="rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-[#171212] p-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Resumo nutricional</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: 'Energia', value: `${preview.totalKcal.toFixed(1)} kcal/dia` },
                          { label: 'Proteína', value: preview.evaluation.totalDelivered.crudeProteinPct != null ? `${preview.evaluation.totalDelivered.crudeProteinPct.toFixed(1)} g/dia` : '—' },
                          { label: 'Gordura', value: preview.evaluation.totalDelivered.etherExtractPct != null ? `${preview.evaluation.totalDelivered.etherExtractPct.toFixed(1)} g/dia` : '—' },
                          { label: 'Carboidrato', value: preview.evaluation.totalDelivered.nitrogenFreeExtractPct != null ? `${preview.evaluation.totalDelivered.nitrogenFreeExtractPct.toFixed(1)} g/dia` : '—' },
                          { label: 'Fibra', value: preview.evaluation.totalDelivered.crudeFiberPct != null ? `${preview.evaluation.totalDelivered.crudeFiberPct.toFixed(1)} g/dia` : '—' },
                          { label: 'Cálcio', value: preview.evaluation.totalDelivered.calciumPct != null ? `${preview.evaluation.totalDelivered.calciumPct.toFixed(2)} g/dia` : '—' },
                          { label: 'Fósforo', value: preview.evaluation.totalDelivered.phosphorusPct != null ? `${preview.evaluation.totalDelivered.phosphorusPct.toFixed(2)} g/dia` : '—' },
                          {
                            label: 'Rel. Ca:P',
                            value: preview.evaluation.totalDelivered.calciumPct && preview.evaluation.totalDelivered.phosphorusPct
                              ? (preview.evaluation.totalDelivered.calciumPct / preview.evaluation.totalDelivered.phosphorusPct).toFixed(2)
                              : '—',
                          },
                        ].map((item) => (
                          <div key={item.label} className="rounded-xl border border-border/60 bg-muted/40 px-3 py-2.5 dark:border-white/5 dark:bg-black/15">
                            <p className="text-[10px] text-muted-foreground">{item.label}</p>
                            <p className="text-sm font-semibold text-foreground dark:text-white mt-0.5">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contribuição por alimento */}
                    <div className="rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-[#171212] p-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Contribuição por alimento</p>
                      <div className="space-y-2">
                        {preview.contributions.map((item) => (
                          <div
                            key={item.foodId}
                            className="rounded-xl border border-border bg-card px-3 py-2.5 dark:border-white/10 dark:bg-[#221a19]"
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium text-foreground dark:text-white truncate flex-1 pr-2">{item.foodName}</p>
                              <p className="text-xs font-bold text-foreground dark:text-white shrink-0">{item.gramsAsFed.toFixed(1)} g/dia</p>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <div className="flex items-center gap-1">
                                {/* Barra de proporção */}
                                <div className="h-1 w-16 overflow-hidden rounded-full bg-muted dark:bg-white/10">
                                  <div className="h-full rounded-full bg-orange-400" style={{ width: `${Math.min(item.inclusionPct, 100)}%` }} />
                                </div>
                                <p className="text-[10px] text-muted-foreground">{item.inclusionPct.toFixed(1)}% MS</p>
                              </div>
                              <p className="text-[10px] text-muted-foreground">{item.deliveredKcal.toFixed(1)} kcal</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* Botões de navegação dentro do painel direito (visíveis em xl) */}
                <div className="hidden xl:flex justify-between pt-1">
                  <Button variant="outline" size="sm" onClick={() => navigate(`${NEW_ROUTE}/target`)} className="gap-2">
                    <ChevronLeft className="h-3.5 w-3.5" /> Anterior
                  </Button>
                  <Button size="sm" onClick={handleNext} className="gap-2" disabled={!preview || !entries.length}>
                    Ver resumo <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Botões de navegação (mobile/tablet) */}
          <div className="mt-6 flex justify-between border-t border-border/60 pt-4 xl:hidden dark:border-white/5">
            <Button variant="outline" onClick={() => navigate(`${NEW_ROUTE}/target`)} className="gap-2">
              <ChevronLeft className="h-4 w-4" /> Anterior
            </Button>
            <Button onClick={handleNext} className="gap-2" disabled={!preview || !entries.length}>
              Ver resumo <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal informações nutricionais */}
      <Dialog open={!!detailsFood} onOpenChange={(open) => !open && setDetailsFoodId(null)}>
        <DialogContent className="max-h-[90vh] w-[min(96vw,860px)] max-w-[860px] overflow-hidden border border-orange-400/20 bg-card sm:max-w-[860px] dark:bg-[#141010]">
          <DialogHeader>
            <DialogTitle className="text-foreground dark:text-white">{detailsFood?.name ?? 'Informações nutricionais'}</DialogTitle>
          </DialogHeader>

          {detailsFood && (
            <div className="space-y-4 overflow-y-auto pr-1">
              <div className="rounded-xl border border-border bg-muted/40 px-4 py-3 dark:border-white/10 dark:bg-[#1c1514]">
                <p className="text-xs text-muted-foreground">Categoria</p>
                <p className="mt-1 font-semibold text-foreground dark:text-white">{detailsFood.categoryNormalized ?? 'Dado não cadastrado'}</p>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                {[
                  { title: 'Matéria natural (como fornecido)', basis: detailsFood.nutrientsAsFed },
                  { title: 'Matéria seca', basis: detailsFood.nutrientsDryMatter },
                ].map(({ title, basis }) => (
                  <div key={title} className="rounded-2xl border border-border bg-muted/40 p-4 dark:border-white/10 dark:bg-[#1c1514]">
                    <p className="text-sm font-semibold text-foreground dark:text-white mb-3">{title}</p>
                    <div className="space-y-1.5">
                      {getDetailNutrientsForBasis(basis).map((nutrient) => (
                        <div
                          key={nutrient.key}
                          className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2 dark:border-white/5"
                        >
                          <p className="text-xs text-muted-foreground">{nutrient.label}</p>
                          <p className="text-xs font-medium text-foreground dark:text-white">{formatNutrient(basis[nutrient.key], nutrient.unit)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {detailsFood.notes.length > 0 && (
                <div className="rounded-xl border border-border bg-muted/40 px-4 py-3 dark:border-white/10 dark:bg-[#1c1514]">
                  <p className="text-xs text-muted-foreground">Observações</p>
                  <p className="mt-1 text-sm text-foreground dark:text-white">{detailsFood.notes.join(' · ')}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
