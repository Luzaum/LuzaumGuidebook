import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Bean,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Droplets,
  Drumstick,
  Search,
  ShieldCheck,
  Utensils,
} from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { getCommercialFoods } from '../lib/genutriData'
import { classifyCommercialDiet, CommercialDietMetadata, CommercialDietType } from '../lib/commercialDietClassifier'
import { CommercialDietCardVisual } from './CommercialDietCardVisual'
import { SpeciesSilhouette } from './SpeciesSilhouette'
import { useCalculationStore } from '../store/calculationStore'
import { cn } from '../lib/utils'

export function CommercialDietsShowcase() {
  const navigate = useNavigate()
  const { patient, setDiet, setPatient, reset } = useCalculationStore()

  // 1. State
  const [query, setQuery] = useState('')
  const [speciesFilter, setSpeciesFilter] = useState<'all' | 'dog' | 'cat'>('all')
  const [dietTypeFilter, setDietTypeFilter] = useState<'all' | CommercialDietType>('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState<number>(1)
  const [copied, setCopied] = useState(false)

  // 2. Load and Classify All Commercial Diets
  const rawCommercialFoods = useMemo(() => getCommercialFoods(), [])
  const allClassifiedDiets = useMemo(() => {
    const list = rawCommercialFoods.map((f) => classifyCommercialDiet(f))
    
    // Sort to prioritize Royal Canin Renal Cães and premier clinical diets at the top
    return list.sort((a, b) => {
      const aId = a.food.id.toLowerCase()
      const bId = b.food.id.toLowerCase()
      if (aId === 'royal-canin-renal-caes') return -1
      if (bId === 'royal-canin-renal-caes') return 1
      if (a.dietType === 'therapeutic' && b.dietType !== 'therapeutic') return -1
      if (a.dietType !== 'therapeutic' && b.dietType === 'therapeutic') return 1
      return a.food.name.localeCompare(b.food.name, 'pt-BR')
    })
  }, [rawCommercialFoods])

  // 3. Filtered List
  const filteredDiets = useMemo(() => {
    return allClassifiedDiets.filter((item) => {
      // Species filter
      if (speciesFilter === 'dog' && item.food.speciesScope === 'cat') return false
      if (speciesFilter === 'cat' && item.food.speciesScope === 'dog') return false

      if (dietTypeFilter !== 'all' && item.dietType !== dietTypeFilter) return false

      if (categoryFilter !== 'all') {
        const itemCategory = item.dietType === 'therapeutic' ? item.specialty : item.maintenanceCategory
        if (itemCategory !== categoryFilter) return false
      }

      // Query search
      if (query.trim()) {
        const q = query.toLowerCase()
        const nameMatch = item.food.name.toLowerCase().includes(q)
        const brandMatch = item.brand.toLowerCase().includes(q)
        const lineMatch = item.lineName.toLowerCase().includes(q)
        const specMatch = item.specialtyLabel?.toLowerCase().includes(q) ?? false
        if (!nameMatch && !brandMatch && !lineMatch && !specMatch) return false
      }

      return true
    })
  }, [allClassifiedDiets, categoryFilter, dietTypeFilter, query, speciesFilter])

  const categoryOptions = useMemo(() => {
    if (dietTypeFilter === 'all') return []

    const categories = new Map<string, { label: string; count: number }>()
    allClassifiedDiets
      .filter((item) => {
        if (item.dietType !== dietTypeFilter) return false
        if (speciesFilter === 'dog' && item.food.speciesScope === 'cat') return false
        if (speciesFilter === 'cat' && item.food.speciesScope === 'dog') return false
        return true
      })
      .forEach((item) => {
        const key = item.dietType === 'therapeutic' ? item.specialty : item.maintenanceCategory
        const label = item.dietType === 'therapeutic' ? item.specialtyLabel : item.maintenanceCategoryLabel
        if (!key || !label) return
        const current = categories.get(key)
        categories.set(key, { label, count: (current?.count ?? 0) + 1 })
      })

    return Array.from(categories.entries())
      .map(([id, value]) => ({ id, ...value }))
      .sort((left, right) => left.label.localeCompare(right.label, 'pt-BR'))
  }, [allClassifiedDiets, dietTypeFilter, speciesFilter])

  // 4. Reset current index safely on filter change
  useEffect(() => {
    setCurrentIndex(0)
  }, [categoryFilter, dietTypeFilter, speciesFilter, query])

  useEffect(() => {
    setCategoryFilter('all')
  }, [dietTypeFilter, speciesFilter])

  const currentDiet: CommercialDietMetadata | undefined = filteredDiets[currentIndex] ?? filteredDiets[0]

  // 5. Slide Navigation Handlers
  const handlePrev = useCallback(() => {
    if (filteredDiets.length <= 1) return
    setSlideDirection(-1)
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredDiets.length - 1))
  }, [filteredDiets.length])

  const handleNext = useCallback(() => {
    if (filteredDiets.length <= 1) return
    setSlideDirection(1)
    setCurrentIndex((prev) => (prev < filteredDiets.length - 1 ? prev + 1 : 0))
  }, [filteredDiets.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev])

  // 6. Handle "Usar em Plano Nutricional"
  const handleUseInPlan = () => {
    if (!currentDiet) return

    const hasConfiguredPatient = !!(patient.currentWeight && patient.currentWeight > 0)

    if (hasConfiguredPatient) {
      // Patient already exists: put food in diet entries and go directly to food selection
      setDiet({
        dietType: 'commercial',
        entries: [{ foodId: currentDiet.food.id, inclusionPct: 100 }],
      })
      toast.success(`${currentDiet.food.name} selecionada para o paciente.`)
      navigate('/calculadora-energetica/new/food')
    } else {
      // Start from scratch: reset store, pre-select food and target species, start at beginning
      reset()
      setPatient({
        species: currentDiet.food.speciesScope === 'cat' ? 'cat' : 'dog',
      })
      setDiet({
        dietType: 'commercial',
        entries: [{ foodId: currentDiet.food.id, inclusionPct: 100 }],
      })
      toast.success(`Iniciando novo plano com ${currentDiet.food.name}.`)
      navigate('/calculadora-energetica/new')
    }
  }

  // 7. Copy clinical summary
  const handleCopySummary = () => {
    if (!currentDiet) return
    const text = `📋 FICHA CLÍNICA: ${currentDiet.food.name}
Fabricante: ${currentDiet.brand} (${currentDiet.lineName})
Categoria: ${currentDiet.dietType === 'therapeutic' ? `Terapêutica (${currentDiet.specialtyLabel ?? 'Clínica'})` : 'Fisiológica / Manutenção'}
Espécie: ${currentDiet.food.speciesScope === 'dog' ? 'Cães' : currentDiet.food.speciesScope === 'cat' ? 'Gatos' : 'Cães e Gatos'}

⚡ Densidade Energética: ${currentDiet.caloricDensityKcal100g.toFixed(0)} kcal/100g (${currentDiet.caloricDensityKcalKg} kcal/kg)
📊 Macronutrientes (Matéria Seca):
• Carboidrato (ENN): ${currentDiet.carbPctDm.toFixed(1)}% MS
• Extrato Etéreo: ${currentDiet.fatPctDm.toFixed(1)}% MS
• Proteína Bruta: ${currentDiet.proteinPctDm.toFixed(1)}% MS
• Fibra Bruta: ${currentDiet.fiberPctDm.toFixed(1)}% MS
• Matéria Seca: ${currentDiet.dryMatterPct.toFixed(1)}% | Umidade: ${currentDiet.moisturePct.toFixed(1)}%

🩺 Indicações Clínicas & Benefícios:
${currentDiet.clinicalIndications.map((ind) => `• ${ind}`).join('\n')}

Fonte: Catálogo NutriçãoVET`

    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Ficha clínica copiada com sucesso!')
    setTimeout(() => setCopied(false), 2500)
  }

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 320, damping: 32 },
        opacity: { duration: 0.28 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 320, damping: 32 },
        opacity: { duration: 0.2 },
      },
    }),
  }

  return (
    <div className="w-full space-y-3 pb-5">
      {/* 1. Clean, Modern Header Card (No dark gloomy background, no switcher tabs) */}
      <div className="rounded-2xl border border-border/80 bg-card px-4 py-3 shadow-sm sm:px-5">
        <h1 className="text-xl font-black tracking-tight text-foreground sm:text-2xl">
          Rações Comerciais
        </h1>
        <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground sm:text-xs">
          Catálogo completo de dietas coadjuvantes de prescrição veterinária e opções fisiológicas para cães e gatos, com composição nutricional detalhada e indicações clínicas.
        </p>
      </div>

      {/* 2. Compact Filter Toolbar: Search + Compact Species Selector */}
      <Card className="border-border/80 bg-card shadow-sm">
        <CardContent className="p-2 sm:p-2.5">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar ração por nome, fabricante ou formulação..."
                className="h-8 rounded-lg bg-background pl-8 text-xs font-medium"
              />
            </div>

            {/* Species Selector with Dog and Cat Icons */}
            <div className="flex shrink-0 items-center gap-1 rounded-xl bg-muted/80 p-1 border border-border/60">
              <button
                type="button"
                onClick={() => setSpeciesFilter('all')}
                className={cn(
                  'px-2.5 py-0.5 text-[11px] font-bold rounded-lg transition-all',
                  speciesFilter === 'all'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span>🐾 Todos</span>
              </button>

              <button
                type="button"
                onClick={() => setSpeciesFilter('dog')}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold rounded-lg transition-all',
                  speciesFilter === 'dog'
                    ? 'bg-background text-foreground shadow-sm ring-1 ring-primary/20'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <SpeciesSilhouette species="dog" className="h-4 w-4 object-contain shrink-0" />
                <span>Cães</span>
              </button>

              <button
                type="button"
                onClick={() => setSpeciesFilter('cat')}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold rounded-lg transition-all',
                  speciesFilter === 'cat'
                    ? 'bg-background text-foreground shadow-sm ring-1 ring-primary/20'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <SpeciesSilhouette species="cat" className="h-4 w-4 object-contain shrink-0" />
                <span>Gatos</span>
              </button>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-2 border-t border-border/60 pt-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Tipo</span>
              {([
                { id: 'all', label: 'Todas as rações' },
                { id: 'therapeutic', label: 'Terapêuticas' },
                { id: 'healthy', label: 'Manutenção' },
              ] as const).map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setDietTypeFilter(option.id)}
                  className={cn(
                    'rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition-colors',
                    dietTypeFilter === option.id
                      ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                      : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground',
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {dietTypeFilter !== 'all' && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {dietTypeFilter === 'therapeutic' ? 'Área clínica' : 'Categoria'}
                </span>
                <button
                  type="button"
                  onClick={() => setCategoryFilter('all')}
                  className={cn(
                    'rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-colors',
                    categoryFilter === 'all'
                      ? 'border-primary/30 bg-primary/10 text-primary'
                      : 'border-border bg-background text-muted-foreground hover:text-foreground',
                  )}
                >
                  Todas ({categoryOptions.reduce((total, option) => total + option.count, 0)})
                </button>
                {categoryOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setCategoryFilter(option.id)}
                    className={cn(
                      'rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-colors',
                      categoryFilter === option.id
                        ? 'border-primary/30 bg-primary/10 text-primary'
                        : 'border-border bg-background text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {option.label} ({option.count})
                  </button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 3. Hero Slide Showcase Main Stage */}
      {filteredDiets.length === 0 ? (
        <Card className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center">
          <Utensils className="h-10 w-10 text-muted-foreground/40 mb-3" />
          <h3 className="text-base font-bold text-foreground">Nenhuma ração encontrada</h3>
          <p className="mt-1 max-w-md text-xs text-muted-foreground">
            Tente ajustar os termos de busca ou selecionar outra espécie.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setQuery('')
              setSpeciesFilter('all')
            }}
            className="mt-4 text-xs"
          >
            Limpar busca
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {/* Animated Slide Showcase Card */}
          <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm">
            <AnimatePresence mode="wait" custom={slideDirection}>
              {currentDiet && (
                <motion.div
                  key={currentDiet.food.id}
                  custom={slideDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="grid items-stretch gap-4 p-4 sm:p-5 lg:grid-cols-[1.35fr_0.65fr] lg:gap-5"
                >
                  {/* Left Side: Clinical Info & Nutrient Profile */}
                  <div className="flex flex-col justify-between space-y-3">
                    <div>
                      {/* Clean Main Title */}
                      <h2 className="text-lg font-extrabold tracking-tight text-foreground sm:text-xl">
                        {currentDiet.food.name}
                      </h2>

                      {/* Clinical Summary */}
                      <p className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs">
                        {currentDiet.summaryPt}
                      </p>
                    </div>

                    {/* Quando é indicada & Objetivos Clínicos */}
                    <div className="rounded-xl border border-border/80 bg-muted/30 p-2.5 sm:p-3">
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                          Quando é indicada & Objetivos Clínicos
                        </h4>
                      </div>
                      <ul className="space-y-1 text-[11px] leading-snug text-foreground">
                        {currentDiet.clinicalIndications.map((ind, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500 mt-0.5" />
                            <span>{ind}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Composição de Macronutrientes com as cores do cálculo principal */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Composição de Macronutrientes
                      </h4>

                      <div className="grid grid-cols-3 gap-2">
                        {/* Carboidrato (ENN) - Azul (#3b82f6) */}
                        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-2 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">Carboidrato</span>
                            <Bean className="h-3.5 w-3.5 text-blue-500" />
                          </div>
                          <span className="mt-0.5 block text-lg font-black tracking-tight text-blue-600 dark:text-blue-400">
                            {currentDiet.carbPctDm.toFixed(1)}%
                          </span>
                          <span className="text-[10px] text-muted-foreground block">matéria seca</span>
                        </div>

                        {/* Extrato Etéreo (Gordura) - Amarelo/Âmbar (#eab308) */}
                        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">Extrato Etéreo</span>
                            <Droplets className="h-3.5 w-3.5 text-amber-500" />
                          </div>
                          <span className="mt-0.5 block text-lg font-black tracking-tight text-amber-600 dark:text-amber-400">
                            {currentDiet.fatPctDm.toFixed(1)}%
                          </span>
                          <span className="text-[10px] text-muted-foreground block">matéria seca</span>
                        </div>

                        {/* Proteína Bruta - Laranja (#f97316) */}
                        <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-2 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400">Proteína Bruta</span>
                            <Drumstick className="h-3.5 w-3.5 text-orange-500" />
                          </div>
                          <span className="mt-0.5 block text-lg font-black tracking-tight text-orange-600 dark:text-orange-400">
                            {currentDiet.proteinPctDm.toFixed(1)}%
                          </span>
                          <span className="text-[10px] text-muted-foreground block">matéria seca</span>
                        </div>
                      </div>

                      {/* Lista de Nutrientes estruturada em exatamente 4 linhas */}
                      <div className="divide-y divide-border/50 rounded-lg border border-border/60 bg-muted/40 px-2.5 py-2 text-[11px]">
                        {/* Linha 1: Energia & Matéria Seca */}
                        <div className="grid grid-cols-2 gap-3 py-1 first:pt-0">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Energia Metabolizável</span>
                            <span className="font-bold text-foreground tabular-nums">
                              {currentDiet.caloricDensityKcal100g.toFixed(0)} kcal/100g <span className="text-[10px] text-muted-foreground font-normal">({currentDiet.caloricDensityKcalKg} kcal/kg)</span>
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Matéria Seca (MS)</span>
                            <span className="font-bold text-foreground tabular-nums">
                              {currentDiet.dryMatterPct.toFixed(0)}% <span className="text-[10px] text-muted-foreground font-normal">(Umidade {currentDiet.moisturePct.toFixed(1)}%)</span>
                            </span>
                          </div>
                        </div>

                        {/* Linha 2: Cálcio & Fósforo */}
                        <div className="grid grid-cols-2 gap-3 py-1">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Cálcio</span>
                            <span className="font-bold text-foreground tabular-nums">
                              {currentDiet.calciumPctDm != null ? `${currentDiet.calciumPctDm.toFixed(2)}% MS` : '—'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Fósforo</span>
                            <span className="font-bold text-foreground tabular-nums">
                              {currentDiet.phosphorusPctDm != null ? `${currentDiet.phosphorusPctDm.toFixed(2)}% MS` : '—'}
                            </span>
                          </div>
                        </div>

                        {/* Linha 3: Relação Ca:P & Sódio */}
                        <div className="grid grid-cols-2 gap-3 py-1">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Relação Ca:P</span>
                            <span className="font-bold text-foreground tabular-nums">
                              {currentDiet.caPRatio ?? '—'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Sódio</span>
                            <span className="font-bold text-foreground tabular-nums">
                              {currentDiet.sodiumPctDm != null ? `${currentDiet.sodiumPctDm.toFixed(2)}% MS` : '—'}
                            </span>
                          </div>
                        </div>

                        {/* Linha 4: Potássio & Fibra Bruta */}
                        <div className="grid grid-cols-2 gap-3 py-1 last:pb-0">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Potássio</span>
                            <span className="font-bold text-foreground tabular-nums">
                              {currentDiet.potassiumPctDm != null ? `${currentDiet.potassiumPctDm.toFixed(2)}% MS` : '—'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Fibra Bruta</span>
                            <span className="font-bold text-foreground tabular-nums">
                              {currentDiet.fiberPctDm.toFixed(1)}% MS
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <Button
                        size="default"
                        className="h-8 gap-1.5 px-3 text-xs font-semibold shadow-sm"
                        onClick={handleUseInPlan}
                      >
                        <Utensils className="h-4 w-4" />
                        Usar em Plano Nutricional
                      </Button>

                      <Button
                        variant="outline"
                        size="default"
                        onClick={handleCopySummary}
                        className="h-8 gap-1.5 px-3 text-xs"
                      >
                        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                        {copied ? 'Copiado!' : 'Copiar Ficha'}
                      </Button>
                    </div>
                  </div>

                  {/* Right Side: Product Packaging Image */}
                  <div className="flex h-full w-full items-stretch justify-center">
                    <CommercialDietCardVisual metadata={currentDiet} className="w-full" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. Navigation Arrows at the Bottom of the Page */}
          <div className="flex items-center justify-between px-1 pt-0.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={filteredDiets.length <= 1}
              className="h-8 gap-1.5 rounded-lg px-3 text-[11px] font-semibold"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Ração Anterior</span>
            </Button>

            <span className="hidden text-[11px] font-medium text-muted-foreground sm:inline">
              Navegue pelas rações ou use as setas do teclado ← →
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={filteredDiets.length <= 1}
              className="h-8 gap-1.5 rounded-lg px-3 text-[11px] font-semibold"
            >
              <span>Próxima Ração</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
