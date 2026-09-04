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
import { classifyCommercialDiet, CommercialDietMetadata } from '../lib/commercialDietClassifier'
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
  }, [allClassifiedDiets, query, speciesFilter])

  // 4. Reset current index safely on filter change
  useEffect(() => {
    setCurrentIndex(0)
  }, [speciesFilter, query])

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
    <div className="w-full space-y-4 pb-8">
      {/* 1. Clean, Modern Header Card (No dark gloomy background, no switcher tabs) */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Rações Comerciais
        </h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          Catálogo completo de dietas coadjuvantes de prescrição veterinária e opções fisiológicas para cães e gatos, com composição nutricional detalhada e indicações clínicas.
        </p>
      </div>

      {/* 2. Compact Filter Toolbar: Search + Compact Species Selector */}
      <Card className="border-border/80 bg-card shadow-sm">
        <CardContent className="p-2.5 sm:p-3">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar ração por nome, fabricante ou formulação..."
                className="h-9 rounded-xl pl-8 text-xs font-medium bg-background"
              />
            </div>

            {/* Species Selector with Dog and Cat Icons */}
            <div className="flex shrink-0 items-center gap-1 rounded-xl bg-muted/80 p-1 border border-border/60">
              <button
                type="button"
                onClick={() => setSpeciesFilter('all')}
                className={cn(
                  'px-3 py-1 text-xs font-bold rounded-lg transition-all',
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
                  'flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-all',
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
                  'flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-all',
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
        <div className="space-y-4">
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
                  className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.25fr_0.85fr] lg:gap-7 xl:p-8 items-stretch"
                >
                  {/* Left Side: Clinical Info & Nutrient Profile */}
                  <div className="flex flex-col justify-between space-y-4">
                    <div>
                      {/* Clean Main Title */}
                      <h2 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                        {currentDiet.food.name}
                      </h2>

                      {/* Clinical Summary */}
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {currentDiet.summaryPt}
                      </p>
                    </div>

                    {/* Quando é indicada & Objetivos Clínicos */}
                    <div className="rounded-2xl border border-border/80 bg-muted/30 p-3.5 sm:p-4">
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                          Quando é indicada & Objetivos Clínicos
                        </h4>
                      </div>
                      <ul className="space-y-1.5 text-xs leading-relaxed text-foreground">
                        {currentDiet.clinicalIndications.map((ind, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500 mt-0.5" />
                            <span>{ind}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Composição de Macronutrientes com as cores do cálculo principal */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Composição de Macronutrientes
                      </h4>

                      <div className="grid grid-cols-3 gap-2.5">
                        {/* Carboidrato (ENN) - Azul (#3b82f6) */}
                        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-3 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">Carboidrato</span>
                            <Bean className="h-3.5 w-3.5 text-blue-500" />
                          </div>
                          <span className="mt-1.5 block text-xl font-black tracking-tight text-blue-600 dark:text-blue-400">
                            {currentDiet.carbPctDm.toFixed(1)}%
                          </span>
                          <span className="text-[10px] text-muted-foreground block">matéria seca</span>
                        </div>

                        {/* Extrato Etéreo (Gordura) - Amarelo/Âmbar (#eab308) */}
                        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">Extrato Etéreo</span>
                            <Droplets className="h-3.5 w-3.5 text-amber-500" />
                          </div>
                          <span className="mt-1.5 block text-xl font-black tracking-tight text-amber-600 dark:text-amber-400">
                            {currentDiet.fatPctDm.toFixed(1)}%
                          </span>
                          <span className="text-[10px] text-muted-foreground block">matéria seca</span>
                        </div>

                        {/* Proteína Bruta - Laranja (#f97316) */}
                        <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-3 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400">Proteína Bruta</span>
                            <Drumstick className="h-3.5 w-3.5 text-orange-500" />
                          </div>
                          <span className="mt-1.5 block text-xl font-black tracking-tight text-orange-600 dark:text-orange-400">
                            {currentDiet.proteinPctDm.toFixed(1)}%
                          </span>
                          <span className="text-[10px] text-muted-foreground block">matéria seca</span>
                        </div>
                      </div>

                      {/* Lista de Nutrientes estruturada em exatamente 4 linhas */}
                      <div className="rounded-xl bg-muted/40 p-3 border border-border/60 divide-y divide-border/50 text-xs">
                        {/* Linha 1: Energia & Matéria Seca */}
                        <div className="grid grid-cols-2 gap-3 py-1.5 first:pt-0">
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
                        <div className="grid grid-cols-2 gap-3 py-1.5">
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
                        <div className="grid grid-cols-2 gap-3 py-1.5">
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
                        <div className="grid grid-cols-2 gap-3 py-1.5 last:pb-0">
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
                    <div className="flex flex-wrap items-center gap-2.5 pt-1">
                      <Button
                        size="default"
                        className="gap-2 font-semibold shadow-sm text-xs sm:text-sm h-10"
                        onClick={handleUseInPlan}
                      >
                        <Utensils className="h-4 w-4" />
                        Usar em Plano Nutricional
                      </Button>

                      <Button
                        variant="outline"
                        size="default"
                        onClick={handleCopySummary}
                        className="gap-2 text-xs sm:text-sm h-10"
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
          <div className="flex items-center justify-between pt-2 px-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={filteredDiets.length <= 1}
              className="gap-2 rounded-xl text-xs font-semibold h-9 px-4"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Ração Anterior</span>
            </Button>

            <span className="text-xs text-muted-foreground font-medium">
              Navegue pelas rações ou use as setas do teclado ← →
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={filteredDiets.length <= 1}
              className="gap-2 rounded-xl text-xs font-semibold h-9 px-4"
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
