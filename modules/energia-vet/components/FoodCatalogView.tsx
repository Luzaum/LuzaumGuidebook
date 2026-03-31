import { useMemo, useState } from 'react'
import { AlertTriangle, Filter, Search, Utensils } from 'lucide-react'
import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { filterFoods, getFoodById, getFoodCategories, getFoodTypes, getNutrientDefinition } from '../lib/genutriData'
import type { FoodItem, Species } from '../types'

function getSpeciesLabel(food: FoodItem) {
  if (food.speciesScope === 'dog') return 'Cão'
  if (food.speciesScope === 'cat') return 'Gato'
  if (food.speciesScope === 'both') return 'Ambos'
  return 'Não definido'
}

function NutrientPanel({
  title,
  values,
}: {
  title: string
  values: FoodItem['nutrientsAsFed']
}) {
  const entries = useMemo(
    () =>
      Object.entries(values)
        .filter(([, value]) => value != null)
        .sort((left, right) => {
          const leftLabel = getNutrientDefinition(left[0])?.label ?? left[0]
          const rightLabel = getNutrientDefinition(right[0])?.label ?? right[0]
          return leftLabel.localeCompare(rightLabel, 'pt-BR')
        }),
    [values],
  )

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {entries.map(([key, value]) => {
          const definition = getNutrientDefinition(key)
          return (
            <div key={key} className="flex items-center justify-between border-b border-border/40 pb-2 text-sm last:border-0 last:pb-0">
              <span className="text-muted-foreground">{definition?.label ?? key}</span>
              <span className="font-medium">
                {typeof value === 'number' ? value.toFixed(2) : value}
                {definition?.unit ? ` ${definition.unit}` : ''}
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export function FoodCatalogView({
  title,
  description,
  initialFoodType,
  species,
}: {
  title: string
  description: string
  initialFoodType?: string
  species?: Species
}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('all')
  const [foodType, setFoodType] = useState<string>(initialFoodType ?? 'all')
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null)

  const categories = useMemo(() => getFoodCategories(), [])
  const foodTypes = useMemo(() => getFoodTypes(), [])

  const foods = useMemo(
    () =>
      filterFoods({
        species,
        query,
        category: category === 'all' ? undefined : category,
        foodType: foodType === 'all' ? undefined : foodType,
      }),
    [category, foodType, query, species],
  )

  const selectedFood = useMemo(() => {
    return getFoodById(selectedFoodId ?? foods[0]?.id ?? '')
  }, [foods, selectedFoodId])

  const visibleMissingFields = selectedFood?.missingNutrients
    .map((key) => getNutrientDefinition(key)?.label ?? key)
    .sort((left, right) => left.localeCompare(right, 'pt-BR'))

  return (
    <div className="space-y-8 w-full pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Utensils className="w-8 h-8 text-primary" />
          {title}
        </h1>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Base importada do GENUTRI</CardTitle>
          <CardDescription>Busca instantânea com filtros por categoria, tipo e espécie.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, categoria ou apresentação..."
                className="pl-9"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={foodType} onValueChange={setFoodType}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                {foodTypes.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            <Badge variant="outline">{foods.length} resultado(s)</Badge>
            <Badge variant="outline">
              <Filter className="mr-1 h-3.5 w-3.5" />
              {category === 'all' ? 'Sem filtro de categoria' : category}
            </Badge>
            <Badge variant="outline">{foodType === 'all' ? 'Todos os tipos' : foodType}</Badge>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Alimento</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Espécie</TableHead>
                    <TableHead>Energia</TableHead>
                    <TableHead>Dados faltantes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {foods.map((food) => (
                    <TableRow
                      key={food.id}
                      className={`cursor-pointer hover:bg-muted/30 ${selectedFood?.id === food.id ? 'bg-primary/5' : ''}`}
                      onClick={() => setSelectedFoodId(food.id)}
                    >
                      <TableCell>
                        <div>
                          <p className="font-semibold">{food.name}</p>
                          <p className="text-xs text-muted-foreground">{food.presentation}</p>
                        </div>
                      </TableCell>
                      <TableCell>{food.categoryNormalized ?? 'Sem categoria'}</TableCell>
                      <TableCell>{getSpeciesLabel(food)}</TableCell>
                      <TableCell className="font-mono">
                        {food.nutrientsAsFed.energyKcalPer100g != null ? `${food.nutrientsAsFed.energyKcalPer100g.toFixed(1)} kcal/100g` : '—'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={food.missingNutrients.length ? 'secondary' : 'outline'}>
                          {food.missingNutrients.length}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {selectedFood ? (
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">{selectedFood.name}</CardTitle>
                    <CardDescription className="flex flex-wrap gap-2">
                      <Badge variant="outline">{selectedFood.categoryNormalized ?? 'Sem categoria'}</Badge>
                      <Badge variant="outline">{selectedFood.foodType}</Badge>
                      <Badge variant="outline">{getSpeciesLabel(selectedFood)}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl border border-border/60 p-3">
                        <p className="text-muted-foreground">Energia MN</p>
                        <p className="font-bold">{selectedFood.nutrientsAsFed.energyKcalPer100g?.toFixed(2) ?? '—'} kcal/100g</p>
                      </div>
                      <div className="rounded-xl border border-border/60 p-3">
                        <p className="text-muted-foreground">Energia MS</p>
                        <p className="font-bold">{selectedFood.nutrientsDryMatter.energyKcalPer100g?.toFixed(2) ?? '—'} kcal/100g</p>
                      </div>
                      <div className="rounded-xl border border-border/60 p-3">
                        <p className="text-muted-foreground">Matéria seca</p>
                        <p className="font-bold">{selectedFood.nutrientsAsFed.dryMatterPct?.toFixed(2) ?? '—'}%</p>
                      </div>
                      <div className="rounded-xl border border-border/60 p-3">
                        <p className="text-muted-foreground">Referência</p>
                        <p className="font-bold">MN {selectedFood.sourceReference.mnRow} · MS {selectedFood.sourceReference.msRow ?? '—'}</p>
                      </div>
                    </div>

                    {!!visibleMissingFields?.length && (
                      <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                        <p className="flex items-center gap-2 font-semibold text-amber-900">
                          <AlertTriangle className="h-4 w-4" />
                          Campos faltantes
                        </p>
                        <p className="mt-2 text-sm text-amber-800/80">{visibleMissingFields.join(', ')}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <NutrientPanel title="Matéria Natural (MN)" values={selectedFood.nutrientsAsFed} />
                <NutrientPanel title="Matéria Seca (MS)" values={selectedFood.nutrientsDryMatter} />
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-sm text-muted-foreground">
                  Selecione um alimento para abrir a ficha completa.
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
