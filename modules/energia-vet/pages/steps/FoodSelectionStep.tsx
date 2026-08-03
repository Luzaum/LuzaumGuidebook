import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronLeft, ChevronRight, Search, SlidersHorizontal } from 'lucide-react'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { filterFoods, getFoodById } from '../../lib/genutriData'
import { BOOK_FOOD_CATEGORIES, BOOK_FOOD_TAXONOMY_SOURCE, classifyFoodByBook } from '../../lib/foodTaxonomy'
import { useCalculationStore } from '../../store/calculationStore'
import type { DietFormulaEntry, DietType, FoodItem } from '../../types'
import { cn } from '../../lib/utils'

const NEW_ROUTE = '/calculadora-energetica/new'
const TYPE_OPTIONS: Array<{ value: DietType; label: string; description: string }> = [
  { value: 'commercial', label: 'Comercial', description: 'Dietas completas e terapêuticas prontas.' },
  { value: 'natural', label: 'Natural', description: 'Ingredientes, suplementos e fórmulas enterais.' },
  { value: 'hybrid', label: 'Híbrida', description: 'Combinação de alimento comercial e ingredientes naturais.' },
]

function matchesDietType(food: FoodItem, dietType: DietType) {
  if (dietType === 'hybrid') return true
  if (dietType === 'commercial') return food.foodType === 'commercial'
  return food.foodType === 'natural' || food.foodType === 'suplemento' || food.foodType === 'enteral'
}

function matchesVisibleSpecies(food: FoodItem, species: 'dog' | 'cat') {
  const text = `${food.name} ${food.presentation}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  if (species === 'dog' && /\bgato|\bgatos|felin|feline/.test(text)) return false
  if (species === 'cat' && /\bcao|\bcaes|canin|canine/.test(text)) return false
  return food.speciesScope === species || food.speciesScope === 'both' || food.speciesScope === 'unknown'
}

function rebalance(entries: DietFormulaEntry[]) {
  const share = entries.length ? 100 / entries.length : 0
  return entries.map((entry) => ({ ...entry, inclusionPct: share }))
}

export default function FoodSelectionStep() {
  const navigate = useNavigate()
  const { patient, diet, setDiet } = useCalculationStore()
  const [dietType, setDietType] = useState<DietType>(diet.dietType ?? 'commercial')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('Todas')
  const [showAll, setShowAll] = useState(false)
  const [entries, setEntries] = useState<DietFormulaEntry[]>(diet.entries ?? [])
  const species = patient.species ?? 'dog'
  const selectedIds = useMemo(() => new Set(entries.map((entry) => entry.foodId)), [entries])
  const allFoods = useMemo(() => filterFoods({ species, query }).filter((food) => matchesVisibleSpecies(food, species)), [query, species])
  const counts = useMemo(() => Object.fromEntries(BOOK_FOOD_CATEGORIES.map((item) => [item, allFoods.filter((food) => matchesDietType(food, dietType) && classifyFoodByBook(food) === item).length])), [allFoods, dietType])
  const filteredFoods = useMemo(() => allFoods.filter((food) => matchesDietType(food, dietType) && (category === 'Todas' || classifyFoodByBook(food) === category)), [allFoods, category, dietType])
  // Selecionados ficam sempre no topo, mesmo após mudar busca, categoria ou tipo.
  const selectedFoods = useMemo(() => entries.map((entry) => getFoodById(entry.foodId)).filter((food): food is FoodItem => Boolean(food)), [entries])
  const unselectedFilteredFoods = useMemo(() => filteredFoods.filter((food) => !selectedIds.has(food.id)), [filteredFoods, selectedIds])
  const visibleFoods = useMemo(() => {
    if (showAll) return [...selectedFoods, ...unselectedFilteredFoods]
    return [...selectedFoods, ...unselectedFilteredFoods.slice(0, Math.max(0, 36 - selectedFoods.length))]
  }, [selectedFoods, showAll, unselectedFilteredFoods])

  const toggleFood = (foodId: string) => {
    setEntries((current) => selectedIds.has(foodId) ? rebalance(current.filter((entry) => entry.foodId !== foodId)) : rebalance([...current, { foodId, inclusionPct: 0 }]))
  }

  const handleNext = () => {
    setDiet({ dietType, entries: rebalance(entries) })
    navigate(`${NEW_ROUTE}/formulation`)
  }

  return (
    <Card className="nutrition-step-card w-full">
      <CardHeader className="border-b border-border/60 pb-6"><CardTitle className="text-2xl">Escolha dos alimentos</CardTitle><CardDescription>Pesquise todo o catálogo em uma única página e selecione os itens que entrarão na formulação.</CardDescription></CardHeader>
      <CardContent className="space-y-7 pt-6">
        <section className="grid gap-3 md:grid-cols-3" role="radiogroup" aria-label="Tipo de dieta">
          {TYPE_OPTIONS.map((option) => <button key={option.value} type="button" role="radio" aria-checked={dietType === option.value} onClick={() => { setDietType(option.value); setCategory('Todas') }} className={cn('min-h-24 cursor-pointer rounded-2xl border p-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring', dietType === option.value ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/40')}><p className="font-semibold">{option.label}</p><p className="mt-1 text-sm text-muted-foreground">{option.description}</p></button>)}
        </section>

        <section className="rounded-2xl border border-border p-4">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto]"><div className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input aria-label="Buscar alimentos" value={query} onChange={(event) => { setQuery(event.target.value); setShowAll(false) }} placeholder="Buscar por alimento, marca ou apresentação" className="pl-10" /></div><div className="flex items-center gap-2 text-sm text-muted-foreground"><SlidersHorizontal className="h-4 w-4" /> {filteredFoods.length} alimento(s)</div></div>
          <div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => setCategory('Todas')} className={cn('min-h-11 rounded-full border px-4 text-sm', category === 'Todas' ? 'border-primary bg-primary text-primary-foreground' : 'border-border')}>Todas</button>{BOOK_FOOD_CATEGORIES.filter((item) => counts[item] > 0).map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={cn('min-h-11 rounded-full border px-4 text-sm', category === item ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}>{item} <span className="opacity-70">{counts[item]}</span></button>)}</div>
        </section>

        {entries.length > 0 && <section className="flex flex-wrap items-center gap-2 rounded-2xl bg-primary/[0.06] p-4"><span className="mr-2 text-sm font-semibold">Selecionados ({entries.length})</span>{selectedFoods.map((food) => <Badge key={food.id} variant="outline" className="rounded-full bg-card">{food.name}</Badge>)}</section>}

        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="hidden grid-cols-[minmax(260px,1fr)_220px_120px_110px_90px] gap-4 border-b border-border bg-muted/45 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:grid"><span>Alimento</span><span>Categoria</span><span>Energia</span><span>Proteína</span><span></span></div>
          <div className="divide-y divide-border">
            {selectedFoods.length > 0 && <div className="bg-primary/[0.045] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">Alimentos selecionados</div>}
            {visibleFoods.map((food) => { const selected = selectedIds.has(food.id); const completeness = Object.values(food.nutrientsAsFed).filter((value) => value != null).length; return <article key={food.id} className={cn('grid gap-3 p-4 lg:grid-cols-[minmax(260px,1fr)_220px_120px_110px_90px] lg:items-center', selected && 'bg-primary/[0.045]')}><div><p className="font-semibold text-foreground">{food.name}</p><p className="mt-1 text-xs text-muted-foreground">{food.presentation || 'Apresentação não informada'} · {completeness} nutrientes informados</p></div><p className="text-sm text-muted-foreground">{classifyFoodByBook(food)}</p><p className="text-sm font-medium">{food.nutrientsAsFed.energyKcalPer100g?.toFixed(0) ?? '—'} kcal/100g</p><p className="text-sm">{food.nutrientsDryMatter.crudeProteinPct?.toFixed(1) ?? '—'}% MS</p><Button type="button" variant={selected ? 'default' : 'outline'} size="sm" onClick={() => toggleFood(food.id)} className="min-h-11 gap-1.5">{selected && <Check className="h-4 w-4" />}{selected ? 'Incluído' : 'Incluir'}</Button></article> })}
            {visibleFoods.length === 0 && <div className="p-10 text-center text-sm text-muted-foreground">Nenhum alimento encontrado com estes filtros.</div>}
          </div>
        </div>
        {!showAll && filteredFoods.length > visibleFoods.length && <div className="text-center"><Button variant="outline" onClick={() => setShowAll(true)}>Mostrar todos os {filteredFoods.length} alimentos</Button></div>}
        <p className="text-xs text-muted-foreground">Categorias clínicas reorganizadas a partir de {BOOK_FOOD_TAXONOMY_SOURCE.title}, {BOOK_FOOD_TAXONOMY_SOURCE.chapters}, páginas {BOOK_FOOD_TAXONOMY_SOURCE.pages}. Nenhum alimento cadastrado foi removido.</p>
        <div className="flex justify-between border-t border-border/60 pt-4"><Button variant="outline" onClick={() => navigate(`${NEW_ROUTE}/target`)} className="gap-2"><ChevronLeft className="h-4 w-4" /> Anterior</Button><Button onClick={handleNext} disabled={!entries.length} className="gap-2">Próximo: Formulação <ChevronRight className="h-4 w-4" /></Button></div>
      </CardContent>
    </Card>
  )
}
