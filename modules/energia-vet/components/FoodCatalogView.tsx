import { useMemo, useState } from 'react'
import { AlertTriangle, ChevronRight, Database, Search } from 'lucide-react'
import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { filterFoods, getFoodById, getFoodDisplayName, getNutrientDefinition } from '../lib/genutriData'
import { getCatalogDatasetStats } from '../lib/catalog'
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
}: {
  title: string
  description: string
}) {
  const [query, setQuery] = useState('')
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null)

  const datasetStats = useMemo(() => getCatalogDatasetStats(), [])
  const foods = useMemo(() => filterFoods({ query: query.trim() || undefined }), [query])
  const selectedFood = useMemo(() => getFoodById(selectedFoodId ?? foods[0]?.id ?? ''), [foods, selectedFoodId])
  const visibleMissingFields = selectedFood?.missingNutrients
    .map((key) => getNutrientDefinition(key)?.label ?? key)
    .sort((left, right) => left.localeCompare(right, 'pt-BR'))

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
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              aria-label="Buscar alimentos"
              placeholder="Buscar em português ou inglês (ex.: renal royal, frango farmina, recovery)"
              className="pl-10"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <p className="text-sm text-muted-foreground">
            <strong className="font-semibold text-foreground">{foods.length}</strong>
            {query.trim() ? ' resultados' : ' alimentos cadastrados'} · clique em uma linha para abrir a ficha
          </p>

          <div className="grid gap-5 2xl:grid-cols-[minmax(0,1.5fr)_minmax(360px,0.5fr)]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <Table className="min-w-[980px]">
                <TableHeader className="bg-muted/70">
                  <TableRow>
                    <TableHead className="w-[280px] px-4">Alimento</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Espécie</TableHead>
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
                    return (
                      <TableRow
                        key={`${food.id}-${foodIndex}`}
                        role="button"
                        tabIndex={0}
                        aria-label={`Abrir ficha de ${getFoodDisplayName(food.name, { id: food.id, foodType: food.foodType })}`}
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
                          <p className="max-w-[260px] truncate font-semibold text-foreground">{getFoodDisplayName(food.name, { id: food.id, foodType: food.foodType })}</p>
                          <p className="mt-0.5 max-w-[260px] truncate text-xs text-muted-foreground">{food.presentation || food.foodType}</p>
                        </TableCell>
                        <TableCell className="max-w-[160px] truncate text-muted-foreground">{food.categoryNormalized ?? 'Sem categoria'}</TableCell>
                        <TableCell><Badge variant="outline">{getSpeciesLabel(food)}</Badge></TableCell>
                        <TableCell className="text-right font-semibold tabular-nums">{formatNumber(food.nutrientsAsFed.energyKcalPer100g, ' kcal', 0)}</TableCell>
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
