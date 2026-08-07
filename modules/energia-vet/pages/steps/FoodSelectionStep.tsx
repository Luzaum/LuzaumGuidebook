import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronLeft, ChevronRight, Search, SlidersHorizontal } from 'lucide-react'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { FoodDetailDialog, FoodInfoButton } from '../../components/FoodDetailDialog'
import { filterFoods, getFoodById, getFoodDisplayName } from '../../lib/genutriData'
import { classifyFoodByBook } from '../../lib/foodTaxonomy'
import { distributeEqually } from '../../lib/diet-math'
import { useCalculationStore } from '../../store/calculationStore'
import type { DietFormulaEntry, FoodItem } from '../../types'
import { cn } from '../../lib/utils'

const NEW_ROUTE = '/calculadora-energetica/new'

function distributeInclusionEqually(entries: DietFormulaEntry[]): DietFormulaEntry[] {
  if (!entries.length) return []
  const shares = distributeEqually(entries.length)
  return entries.map((entry, index) => ({ ...entry, inclusionPct: shares[index] ?? 0 }))
}

function normalizeStoredEntries(entries: DietFormulaEntry[]): DietFormulaEntry[] {
  if (!entries.length) return []
  return distributeInclusionEqually(entries)
}

export default function FoodSelectionStep() {
  const navigate = useNavigate()
  const { patient, diet, setDiet } = useCalculationStore()
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [entries, setEntries] = useState<DietFormulaEntry[]>(() => normalizeStoredEntries(diet.entries ?? []))
  const [detailsFoodId, setDetailsFoodId] = useState<string | null>(null)
  const species = patient.species ?? 'dog'
  const selectedIds = useMemo(() => new Set(entries.map((entry) => entry.foodId)), [entries])
  const filteredFoods = useMemo(() => filterFoods({ species, query }), [query, species])
  const detailsFood = detailsFoodId ? getFoodById(detailsFoodId) : undefined
  const selectedFoods = useMemo(
    () => entries.map((entry) => getFoodById(entry.foodId)).filter((food): food is FoodItem => Boolean(food)),
    [entries],
  )
  const unselectedFilteredFoods = useMemo(
    () => filteredFoods.filter((food) => !selectedIds.has(food.id)),
    [filteredFoods, selectedIds],
  )
  const visibleFoods = useMemo(() => {
    if (showAll) return [...selectedFoods, ...unselectedFilteredFoods]
    return [...selectedFoods, ...unselectedFilteredFoods.slice(0, Math.max(0, 36 - selectedFoods.length))]
  }, [selectedFoods, showAll, unselectedFilteredFoods])

  const persistEntries = (next: DietFormulaEntry[]) => {
    setDiet({ dietType: 'hybrid', entries: next })
  }

  useEffect(() => {
    if (!entries.length) return
    if (JSON.stringify(diet.entries ?? []) !== JSON.stringify(entries)) {
      persistEntries(entries)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- persiste seleção inicial normalizada uma vez
  }, [])

  const applyEntries = (updater: (current: DietFormulaEntry[]) => DietFormulaEntry[]) => {
    setEntries((current) => {
      const raw = updater(current)
      const next = raw.length ? distributeInclusionEqually(raw) : []
      persistEntries(next)
      return next
    })
  }

  const toggleFood = (foodId: string) => {
    applyEntries((current) =>
      selectedIds.has(foodId)
        ? current.filter((entry) => entry.foodId !== foodId)
        : [...current, { foodId, inclusionPct: 0 }],
    )
  }

  const canAdvance = entries.length > 0

  const handleNext = () => {
    if (!canAdvance) return
    const next = distributeInclusionEqually(entries)
    persistEntries(next)
    navigate(`${NEW_ROUTE}/formulation`)
  }

  const stepNavigation = (className?: string) => (
    <div className={cn('flex justify-between border-t border-border/60 pt-4', className)}>
      <Button variant="outline" onClick={() => navigate(`${NEW_ROUTE}/target`)} className="gap-2">
        <ChevronLeft className="h-4 w-4" /> Anterior
      </Button>
      <Button onClick={handleNext} disabled={!canAdvance} className="gap-2">
        Próximo: Formulação <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )

  return (
    <>
      <Card className="nutrition-step-card w-full">
        <CardHeader className="border-b border-border/60 pb-4">
          <CardTitle className="text-2xl">Escolha dos alimentos</CardTitle>
          <CardDescription>
            Pesquise todo o catálogo e selecione os itens da formulação. Toque em <strong>i</strong> para ver nutrientes completos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-4">
          <section className="rounded-2xl border border-border p-3 space-y-4">
            <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  aria-label="Buscar alimentos"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setShowAll(false)
                  }}
                  placeholder="Buscar por alimento, marca ou apresentação"
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <SlidersHorizontal className="h-4 w-4" /> {filteredFoods.length} alimento(s)
              </div>
            </div>
            {stepNavigation('border-t-0 pt-0')}
          </section>

          {entries.length > 0 && (
            <section className="flex flex-wrap items-center gap-2 rounded-2xl bg-primary/[0.06] p-3">
              <span className="mr-2 text-sm font-semibold">Selecionados ({entries.length})</span>
              {selectedFoods.map((food) => (
                <Badge key={food.id} variant="outline" className="rounded-full bg-card">
                  {getFoodDisplayName(food.name, { id: food.id, foodType: food.foodType })}
                </Badge>
              ))}
              {entries.length > 1 && (
                <p className="w-full text-xs text-muted-foreground">
                  Proporções iniciais divididas igualmente — ajuste na etapa Formulação.
                </p>
              )}
            </section>
          )}

          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="hidden grid-cols-[minmax(220px,1fr)_180px_100px_90px_120px] gap-3 border-b border-border bg-muted/45 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground lg:grid">
              <span>Alimento</span>
              <span>Categoria</span>
              <span>Energia</span>
              <span>Proteína</span>
              <span></span>
            </div>
            <div className="divide-y divide-border">
              {selectedFoods.length > 0 && (
                <div className="bg-primary/[0.045] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                  Alimentos selecionados
                </div>
              )}
              {visibleFoods.map((food) => {
                const selected = selectedIds.has(food.id)
                const displayName = getFoodDisplayName(food.name, { id: food.id, foodType: food.foodType })
                const completeness = Object.values(food.nutrientsAsFed).filter((value) => value != null).length
                return (
                  <article
                    key={food.id}
                    className={cn(
                      'grid gap-2 p-3 lg:grid-cols-[minmax(220px,1fr)_180px_100px_90px_120px] lg:items-center',
                      selected && 'bg-primary/[0.045]',
                    )}
                  >
                    <div className="flex items-start gap-1.5">
                      <FoodInfoButton food={food} onOpen={() => setDetailsFoodId(food.id)} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground">{displayName}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {food.presentation || 'Apresentação não informada'} · {completeness} nutrientes
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{classifyFoodByBook(food)}</p>
                    <p className="text-xs font-medium">{food.nutrientsAsFed.energyKcalPer100g?.toFixed(0) ?? '—'} kcal/100g</p>
                    <p className="text-xs">{food.nutrientsDryMatter.crudeProteinPct?.toFixed(1) ?? '—'}% MS</p>
                    <Button
                      type="button"
                      variant={selected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleFood(food.id)}
                      className="min-h-9 gap-1 text-xs"
                    >
                      {selected && <Check className="h-3.5 w-3.5" />}
                      {selected ? 'Incluído' : 'Incluir'}
                    </Button>
                  </article>
                )
              })}
              {visibleFoods.length === 0 && (
                <div className="p-8 text-center text-sm text-muted-foreground">Nenhum alimento encontrado com esta busca.</div>
              )}
            </div>
          </div>
          {!showAll && filteredFoods.length > visibleFoods.length && (
            <div className="text-center">
              <Button variant="outline" onClick={() => setShowAll(true)}>
                Mostrar todos os {filteredFoods.length} alimentos
              </Button>
            </div>
          )}
          {stepNavigation()}
        </CardContent>
      </Card>

      <FoodDetailDialog food={detailsFood} open={!!detailsFood} onOpenChange={(open) => !open && setDetailsFoodId(null)} />
    </>
  )
}
