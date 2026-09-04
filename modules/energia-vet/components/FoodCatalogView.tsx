import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, ChevronRight, Database, Search, Utensils } from 'lucide-react'
import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { filterFoods, getFoodById, getFoodDisplayName, getNutrientDefinition } from '../lib/genutriData'
import { getCatalogDatasetStats } from '../lib/catalog'
import { highlightMatchingSegments } from '../lib/foodSearchLexicon'
import { SmartFoodSearchBar } from './SmartFoodSearchBar'
import { cn } from '../lib/utils'
import type { FoodItem } from '../types'

function getSpeciesLabel(food: FoodItem) {
  if (food.speciesScope === 'dog') return 'Cão'
  if (food.speciesScope === 'cat') return 'Gato'
  if (food.speciesScope === 'both') return 'Cão e gato'
  return 'Não definido'
}

function formatNumber(value: number | null | undefined, suffix = '', digits = 1) {
  return value == null ? '—' : `${value.toFixed(digits)}${suffix}`
}

function NutrientPanel({ title, subtitle, values }: { title: string; subtitle: string; values: FoodItem['nutrientsAsFed'] }) {
  const entries = useMemo(
    () => Object.entries(values)
      .filter(([, value]) => value != null)
      .sort((left, right) => (getNutrientDefinition(left[0])?.label ?? left[0]).localeCompare(getNutrientDefinition(right[0])?.label ?? right[0], 'pt-BR')),
    [values],
  )

  return (
    <section className="rounded-2xl bg-muted/55 p-4">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <div className="grid gap-x-5 sm:grid-cols-2">
        {entries.map(([key, value]) => {
          const definition = getNutrientDefinition(key)
          return (
            <div key={key} className="flex min-h-10 items-center justify-between gap-3 border-b border-border/70 text-xs">
              <span className="text-muted-foreground">{definition?.label ?? key}</span>
              <span className="font-semibold tabular-nums text-foreground">
                {typeof value === 'number' ? value.toFixed(2) : value}{definition?.unit ? ` ${definition.unit}` : ''}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function FoodCatalogView({
  title,
  description,
  initialFoodType,
  initialCategory,
}: {
  title: string
  description: string
  initialFoodType?: string
  initialCategory?: string
}) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<string>(initialFoodType ?? 'all')
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null)

  const datasetStats = useMemo(() => getCatalogDatasetStats(), [])
  
  const foods = useMemo(() => {
    const raw = filterFoods({
      query: query.trim() || undefined,
      category: initialCategory,
    })

    if (activeFilter === 'all') return raw
    if (activeFilter === 'commercial') return raw.filter((f) => f.foodType === 'commercial')
    if (activeFilter === 'natural') return raw.filter((f) => f.foodType === 'natural')
    if (activeFilter === 'wet') return raw.filter((f) => {
      const pres = (f.presentation || '').toLowerCase()
      const cat = (f.categoryNormalized || '').toLowerCase()
      return pres.includes('sachê') || pres.includes('lata') || pres.includes('ensopado') || cat.includes('sachê') || cat.includes('lata') || cat.includes('ensopado')
    })
    if (activeFilter === 'supplement') return raw.filter((f) => f.foodType === 'suplemento' || f.foodType === 'enteral')
    return raw
  }, [activeFilter, initialCategory, query])

  const selectedFood = useMemo(() => getFoodById(selectedFoodId ?? foods[0]?.id ?? ''), [foods, selectedFoodId])
  const visibleMissingFields = selectedFood?.missingNutrients
    .map((key) => getNutrientDefinition(key)?.label ?? key)
    .sort((left, right) => left.localeCompare(right, 'pt-BR'))

  const filterTabs = [
    { id: 'all', label: 'Todos' },
    { id: 'commercial', label: 'Rações Comerciais' },
    { id: 'natural', label: 'Base Natural (TACO / USDA)' },
    { id: 'wet', label: 'Sachês & Latas' },
    { id: 'supplement', label: 'Suplementos & Enteral' },
  ]

  return (
    <div className="nutrition-page w-full space-y-6 pb-16">
      <header className="nutrition-page-header">
        <div>
          <p className="nutrition-eyebrow">Base nutricional</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:grid-cols-3">
          <div className="nutrition-header-stat"><span>Alimentos</span><strong>{datasetStats.foods}</strong></div>
          <div className="nutrition-header-stat"><span>Categorias</span><strong>{datasetStats.categories}</strong></div>
          <div className="nutrition-header-stat col-span-2 sm:col-span-1"><span>Perfis</span><strong>{datasetStats.requirements}</strong></div>
        </div>
      </header>

      <Card className="gap-0 py-0">
        <CardHeader className="border-b border-border px-5 py-5 lg:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg"><Database className="h-5 w-5 text-primary" /> Catálogo completo</CardTitle>
              <CardDescription className="mt-1">Compare energia, macronutrientes, matéria seca e qualidade cadastral.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 p-5 lg:p-6">
          {/* Banner para o visor interativo de rações */}
          <Link
            to="/calculadora-energetica/commercial"
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-indigo-500/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Utensils className="h-5 w-5" />
              </span>
              <div>
                <span className="block font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                  Visor Interativo de Rações Comerciais (Saudáveis & Terapêuticas)
                </span>
                <span className="block text-xs text-muted-foreground">
                  Explore 349 rações com fotos, fichas clínicas detalhadas e animação de passagem lateral.
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-primary shrink-0 self-end sm:self-center">
              Abrir visor interativo <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <div className="flex flex-col gap-3">
            <div className="max-w-2xl">
              <SmartFoodSearchBar
                value={query}
                onChange={setQuery}
                placeholder="Buscar por alimento, marca, indicação clínica (ex.: renal royal, farmina frango, recovery)..."
                showQuickChips={false}
              />
            </div>

            {/* Pílulas de filtro rápido */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    activeFilter === tab.id
                      ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                      : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            <strong className="font-semibold text-foreground">{foods.length}</strong>
            {query.trim() || activeFilter !== 'all' ? ' resultados encontrados' : ' alimentos cadastrados'} · clique em uma linha para abrir a ficha
          </p>

          <div className="grid gap-5 2xl:grid-cols-[minmax(0,1.5fr)_minmax(360px,0.5fr)]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <Table className="min-w-[980px]">
                <TableHeader className="bg-muted/70">
                  <TableRow>
                    <TableHead className="w-[280px] px-4">Alimento</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Energia</TableHead>
                    <TableHead className="text-right">Proteína</TableHead>
                    <TableHead className="text-right">Gordura</TableHead>
                    <TableHead className="text-right">MS</TableHead>
                    <TableHead className="text-center">Pendências</TableHead>
                    <TableHead><span className="sr-only">Abrir</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {foods.map((food, foodIndex) => {
                    const active = selectedFood?.id === food.id
                    const displayName = getFoodDisplayName(food.name, { id: food.id, foodType: food.foodType })
                    const segments = query.trim() ? highlightMatchingSegments(displayName, query) : null
                    return (
                      <TableRow
                        key={`${food.id}-${foodIndex}`}
                        role="button"
                        tabIndex={0}
                        aria-label={`Abrir ficha de ${displayName}`}
                        className={cn('cursor-pointer outline-none focus-visible:bg-primary/[0.06]', active && 'bg-primary/[0.06]')}
                        onClick={() => setSelectedFoodId(food.id)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            setSelectedFoodId(food.id)
                          }
                        }}
                      >
                        <TableCell className="px-4 py-3">
                          <p className="max-w-[260px] truncate font-semibold text-foreground">
                            {segments ? (
                              segments.map((seg, i) =>
                                seg.match ? (
                                  <mark key={i} className="rounded bg-primary/20 text-primary font-bold px-0.5">
                                    {seg.text}
                                  </mark>
                                ) : (
                                  <span key={i}>{seg.text}</span>
                                ),
                              )
                            ) : (
                              displayName
                            )}
                          </p>
                          <p className="mt-0.5 max-w-[260px] truncate text-xs text-muted-foreground">{food.presentation || food.foodType}</p>
                        </TableCell>
                        <TableCell className="max-w-[160px] truncate text-muted-foreground">{food.categoryNormalized ?? 'Sem categoria'}</TableCell>
                        <TableCell className="text-right font-semibold tabular-nums">
                          {food.nutrientsAsFed.energyKcalPer100g != null && food.nutrientsAsFed.energyKcalPer100g > 0 ? (
                            formatNumber(food.nutrientsAsFed.energyKcalPer100g, ' kcal', 0)
                          ) : (
                            <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[11px] font-medium text-amber-700 dark:text-amber-300">
                              Pendente
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">{formatNumber(food.nutrientsAsFed.crudeProteinPct, '%')}</TableCell>
                        <TableCell className="text-right tabular-nums">{formatNumber(food.nutrientsAsFed.etherExtractPct, '%')}</TableCell>
                        <TableCell className="text-right tabular-nums">{formatNumber(food.nutrientsAsFed.dryMatterPct, '%')}</TableCell>
                        <TableCell className="text-center"><Badge variant={food.missingNutrients.length ? 'secondary' : 'outline'}>{food.missingNutrients.length}</Badge></TableCell>
                        <TableCell><ChevronRight className={cn('h-4 w-4 text-muted-foreground', active && 'text-primary')} /></TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            {selectedFood ? (
              <aside className="space-y-4 2xl:sticky 2xl:top-6 2xl:self-start">
                <Card className="gap-0 py-0">
                  <CardHeader className="border-b border-border p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Ficha nutricional</p>
                    <CardTitle className="mt-1 text-xl">{getFoodDisplayName(selectedFood.name, { id: selectedFood.id, foodType: selectedFood.foodType })}</CardTitle>
                    <CardDescription>{selectedFood.presentation || 'Apresentação não informada'}</CardDescription>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="outline">{selectedFood.categoryNormalized ?? 'Sem categoria'}</Badge>
                      <Badge variant="outline">{getSpeciesLabel(selectedFood)}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-2 p-5">
                    <div className="nutrition-metric"><span>Energia MN</span><strong>{formatNumber(selectedFood.nutrientsAsFed.energyKcalPer100g, ' kcal', 0)}</strong></div>
                    <div className="nutrition-metric"><span>Energia MS</span><strong>{formatNumber(selectedFood.nutrientsDryMatter.energyKcalPer100g, ' kcal', 0)}</strong></div>
                    <div className="nutrition-metric"><span>Proteína</span><strong>{formatNumber(selectedFood.nutrientsAsFed.crudeProteinPct, '%')}</strong></div>
                    <div className="nutrition-metric"><span>Gordura</span><strong>{formatNumber(selectedFood.nutrientsAsFed.etherExtractPct, '%')}</strong></div>
                  </CardContent>
                </Card>

                {!!visibleMissingFields?.length && (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-400/25 dark:bg-amber-500/10 dark:text-amber-100">
                    <p className="flex items-center gap-2 text-sm font-semibold"><AlertTriangle className="h-4 w-4" /> {visibleMissingFields.length} dados não cadastrados</p>
                    <p className="mt-2 text-xs leading-relaxed opacity-80">{visibleMissingFields.join(', ')}</p>
                  </div>
                )}

                <details className="group rounded-2xl border border-border bg-card" open>
                  <summary className="cursor-pointer list-none px-4 py-3.5 text-sm font-semibold text-foreground">Composição completa</summary>
                  <div className="space-y-3 border-t border-border p-3">
                    <NutrientPanel title="Matéria natural" subtitle="Valores como fornecidos" values={selectedFood.nutrientsAsFed} />
                    <NutrientPanel title="Matéria seca" subtitle="Valores sem a fração de água" values={selectedFood.nutrientsDryMatter} />
                  </div>
                </details>
              </aside>
            ) : (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">Selecione um alimento para abrir a ficha.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
