import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Baby,
  Bean,
  Bone,
  Check,
  CircleUserRound,
  Clock3,
  Copy,
  Droplets,
  Drumstick,
  ExternalLink,
  HeartPulse,
  Home,
  LayoutGrid,
  PawPrint,
  Ruler,
  Search,
  Scale,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Utensils,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { getCommercialFoods } from '../lib/genutriData'
import { classifyCommercialDiet, CommercialDietMetadata, CommercialDietType } from '../lib/commercialDietClassifier'
import { getCommercialDietProductUrl } from '../lib/commercialDietImages'
import { CommercialDietCardVisual } from './CommercialDietCardVisual'
import { CommercialDietBrowseCard } from './CommercialDietBrowseCard'
import { DietImageZoomModal } from './DietImageZoomModal'
import { SpeciesSilhouette } from './SpeciesSilhouette'
import { useCalculationStore } from '../store/calculationStore'
import { cn } from '../lib/utils'

const THERAPEUTIC_FILTER_OPTIONS = [
  ['renal', 'Suporte Renal (DRC / IRIS)'],
  ['gastrointestinal', 'Gastrointestinal & Low Fat'],
  ['dermatology_allergy', 'Dermatológica & Hipoalergênica'],
  ['urinary', 'Trato Urinário & Dissolução de Cálculos'],
  ['hepatic', 'Hepatologia & Suporte Hepático'],
  ['cardiac', 'Cardiologia & Baixo Sódio'],
  ['obesity_satiety', 'Manejo de Obesidade & Saciedade'],
  ['convalescence_recovery', 'Recuperação, UTI & Alta Densidade'],
  ['diabetic', 'Endocrinologia & Controle Glicêmico'],
  ['joint_mobility', 'Articular & Suporte Osteoarticular'],
  ['oncology', 'Oncologia & Suporte Metabólico'],
  ['general_clinical', 'Coadjuvante Clínica'],
] as const

const MAINTENANCE_FILTER_OPTIONS = [
  ['breed_specific', 'Raças específicas'],
  ['size_specific', 'Porte específico'],
  ['growth_reproduction', 'Filhotes, gestação & lactação'],
  ['adult_maintenance', 'Adultos — manutenção diária'],
  ['mature_senior', 'Maduros & idosos'],
  ['sterilised_indoor', 'Castrados & vida indoor'],
  ['specific_care', 'Cuidados específicos'],
  ['general_maintenance', 'Manutenção geral'],
] as const

const CATEGORY_VISUALS: Record<string, { icon: LucideIcon; description: string }> = {
  all: { icon: LayoutGrid, description: 'Explore todas as opções disponíveis neste grupo.' },
  renal: { icon: Droplets, description: 'Fósforo controlado e suporte nutricional à função renal.' },
  gastrointestinal: { icon: Activity, description: 'Alta digestibilidade, fibras e opções com gordura reduzida.' },
  dermatology_allergy: { icon: Sparkles, description: 'Proteínas selecionadas e suporte à barreira cutânea.' },
  urinary: { icon: Droplets, description: 'Manejo nutricional do trato urinário e de urólitos.' },
  hepatic: { icon: ShieldCheck, description: 'Perfil nutricional adaptado ao suporte da função hepática.' },
  cardiac: { icon: HeartPulse, description: 'Sódio controlado e nutrientes de suporte cardiovascular.' },
  obesity_satiety: { icon: Scale, description: 'Saciedade e redução calórica para manejo do peso.' },
  convalescence_recovery: { icon: Stethoscope, description: 'Alta densidade energética para recuperação e suporte intensivo.' },
  diabetic: { icon: Activity, description: 'Controle glicêmico e perfil de carboidratos adaptado.' },
  joint_mobility: { icon: Bone, description: 'Suporte osteoarticular e manutenção da mobilidade.' },
  oncology: { icon: ShieldCheck, description: 'Suporte metabólico e preservação de massa corporal.' },
  general_clinical: { icon: Stethoscope, description: 'Outras dietas coadjuvantes de uso veterinário.' },
  breed_specific: { icon: PawPrint, description: 'Croquete e composição adaptados às particularidades da raça.' },
  size_specific: { icon: Ruler, description: 'Nutrição ajustada aos portes mini, médio, grande e gigante.' },
  growth_reproduction: { icon: Baby, description: 'Crescimento, gestação, lactação e primeiros meses de vida.' },
  adult_maintenance: { icon: CircleUserRound, description: 'Nutrição completa para a rotina saudável do adulto.' },
  mature_senior: { icon: Clock3, description: 'Vitalidade e suporte nutricional durante o envelhecimento.' },
  sterilised_indoor: { icon: Home, description: 'Controle calórico para castrados e animais de ambiente interno.' },
  specific_care: { icon: Sparkles, description: 'Pelagem, digestão, peso, dentes e outros cuidados específicos.' },
  general_maintenance: { icon: Utensils, description: 'Alimentos completos para manutenção cotidiana.' },
}

export function CommercialDietsShowcase() {
  const navigate = useNavigate()
  const { patient, setDiet, setPatient, reset } = useCalculationStore()

  // 1. State
  const [query, setQuery] = useState('')
  const [speciesFilter, setSpeciesFilter] = useState<'all' | 'dog' | 'cat'>('all')
  const [dietTypeFilter, setDietTypeFilter] = useState<'all' | CommercialDietType>('therapeutic')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'browse' | 'detail'>('browse')
  const [visibleCount, setVisibleCount] = useState(12)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState<number>(1)
  const [copied, setCopied] = useState(false)
  const [zoomedDiet, setZoomedDiet] = useState<CommercialDietMetadata | null>(null)

  // 2. Load and Classify All Commercial Diets
  const rawCommercialFoods = useMemo(() => getCommercialFoods(), [])
  const allClassifiedDiets = useMemo(() => {
    const list = rawCommercialFoods.map((f) => classifyCommercialDiet(f))
    
    // Organiza as rações rigorosamente em ordem alfabética (A-Z)
    return list.sort((a, b) => {
      const cmp = a.food.name.localeCompare(b.food.name, 'pt-BR', { sensitivity: 'base' })
      if (cmp !== 0) return cmp
      return a.food.id.localeCompare(b.food.id)
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

    const availableOptions = dietTypeFilter === 'therapeutic'
      ? THERAPEUTIC_FILTER_OPTIONS
      : MAINTENANCE_FILTER_OPTIONS

    return availableOptions.map(([id, label]) => ({
      id,
      label,
      count: categories.get(id)?.count ?? 0,
    }))
  }, [allClassifiedDiets, dietTypeFilter, speciesFilter])

  // 4. Reset current index safely on filter change
  useEffect(() => {
    setCurrentIndex(0)
    setVisibleCount(12)
    setViewMode('browse')
  }, [categoryFilter, dietTypeFilter, speciesFilter, query])

  useEffect(() => {
    setCategoryFilter('all')
  }, [dietTypeFilter, speciesFilter])

  const currentDiet: CommercialDietMetadata | undefined = filteredDiets[currentIndex] ?? filteredDiets[0]
  const currentProductUrl = currentDiet ? getCommercialDietProductUrl(currentDiet.food.id, currentDiet.food.name) : null
  const visibleDiets = filteredDiets.slice(0, visibleCount)

  // 5. Infinite Scroll com Detecção Contínua e Fluida
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const isFetchingMore = useRef(false)

  const loadMore = useCallback(() => {
    if (isFetchingMore.current) return
    isFetchingMore.current = true
    setVisibleCount((prev) => {
      if (prev >= filteredDiets.length) {
        isFetchingMore.current = false
        return prev
      }
      return Math.min(prev + 12, filteredDiets.length)
    })
    setTimeout(() => {
      isFetchingMore.current = false
      // Se após o lote carregar o sentinel ainda estiver visível (ex: tela ampla), busca próximo lote
      if (sentinelRef.current) {
        const rect = sentinelRef.current.getBoundingClientRect()
        if (rect.top <= window.innerHeight + 400) {
          loadMore()
        }
      }
    }, 140)
  }, [filteredDiets.length])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const mainEl = sentinel.closest('main') || document.querySelector('main')

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      {
        root: mainEl ?? null,
        rootMargin: '600px', // Antecipa o carregamento 600px antes do rodapé para fluxo contínuo
        threshold: 0,
      }
    )

    observer.observe(sentinel)

    // Listener complementar no container de rolagem <main> e window
    const handleScroll = () => {
      if (isFetchingMore.current) return
      const rect = sentinel.getBoundingClientRect()
      if (rect.top <= window.innerHeight + 600) {
        loadMore()
      }
    }

    if (mainEl) {
      mainEl.addEventListener('scroll', handleScroll, { passive: true })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      if (mainEl) mainEl.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [loadMore, visibleCount])

  // Verificação no carregamento inicial para telas grandes
  useEffect(() => {
    if (viewMode !== 'browse') return
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const rect = sentinel.getBoundingClientRect()
    if (rect.top <= window.innerHeight + 300 && visibleCount < filteredDiets.length) {
      loadMore()
    }
  }, [viewMode, visibleCount, filteredDiets.length, loadMore])

  const handleOpenDiet = (index: number) => {
    setCurrentIndex(index)
    setSlideDirection(1)
    setViewMode('detail')
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  }

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
      if (viewMode !== 'detail') return
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
  }, [handleNext, handlePrev, viewMode])

  // 6. Handle "Usar em Plano Nutricional"
  const handleUseInPlan = (mode: 'quick' | 'registered' = 'quick') => {
    if (!currentDiet) return

    const hasConfiguredPatient = !!(patient.currentWeight && patient.currentWeight > 0)

    if (hasConfiguredPatient) {
      // Paciente já configurado: insere o alimento na dieta e vai para formulação/alimentos
      setDiet({
        dietType: 'commercial',
        entries: [{ foodId: currentDiet.food.id, inclusionPct: 100 }],
      })
      toast.success(`${currentDiet.food.name} selecionada para o paciente.`)
      navigate('/calculadora-energetica/new/food')
    } else {
      // Inicia novo plano: define espécie, peso de partida e modo de dieta rápida (sem travas cadastrais de tutor)
      const targetSpecies = currentDiet.food.speciesScope === 'cat' ? 'cat' : 'dog'
      reset()
      setPatient({
        species: targetSpecies,
        registrationMode: mode,
        currentWeight: targetSpecies === 'cat' ? 4 : 10,
        ageMonths: 24,
        bcs: 5,
        muscleCondition: 'normal',
      })
      setDiet({
        dietType: 'commercial',
        entries: [{ foodId: currentDiet.food.id, inclusionPct: 100 }],
      })
      toast.success(`Iniciando cálculo para ${currentDiet.food.name}.`)
      navigate('/calculadora-energetica/new/food')
    }
  }

  // 7. Copy clinical summary
  const handleCopySummary = () => {
    if (!currentDiet) return
    const text = `📋 FICHA CLÍNICA: ${currentDiet.food.name}
Fabricante: ${currentDiet.brand} (${currentDiet.lineName})
Categoria: ${currentDiet.dietType === 'therapeutic' ? `Terapêutica (${currentDiet.specialtyLabel ?? 'Clínica'})` : 'Fisiológica / Manutenção'}
Espécie: ${currentDiet.food.speciesScope === 'dog' ? 'Cães' : currentDiet.food.speciesScope === 'cat' ? 'Gatos' : 'Cães e Gatos'}

⚡ Densidade Energética: ${currentDiet.caloricDensityKcal100g != null ? `${currentDiet.caloricDensityKcal100g.toFixed(0)} kcal/100g (${currentDiet.caloricDensityKcalKg ?? 0} kcal/kg)` : 'Sob consulta'}
📊 Macronutrientes (Matéria Seca):
• Carboidrato (ENN): ${currentDiet.carbPctDm != null ? `${currentDiet.carbPctDm.toFixed(1)}% MS` : 'Sob consulta'}
• Extrato Etéreo: ${currentDiet.fatPctDm != null ? `${currentDiet.fatPctDm.toFixed(1)}% MS` : 'Sob consulta'}
• Proteína Bruta: ${currentDiet.proteinPctDm != null ? `${currentDiet.proteinPctDm.toFixed(1)}% MS` : 'Sob consulta'}
• Fibra Bruta: ${currentDiet.fiberPctDm != null ? `${currentDiet.fiberPctDm.toFixed(1)}% MS` : 'Sob consulta'}
• Matéria Seca: ${currentDiet.dryMatterPct != null ? `${currentDiet.dryMatterPct.toFixed(1)}%` : '—'} | Umidade: ${currentDiet.moisturePct != null ? `${currentDiet.moisturePct.toFixed(1)}%` : '—'}

🩺 Indicações Clínicas & Benefícios:
${(currentDiet.clinicalIndications ?? []).map((ind) => `• ${ind}`).join('\n')}

Fonte: Catálogo NutriçãoVET`

    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Ficha clínica copiada com sucesso!')
    setTimeout(() => setCopied(false), 2500)
  }

  // Animation variants
  const slideVariants: Variants = {
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

          <div className="mt-2 border-t border-border/60 pt-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Tipo</span>
              {([
                { id: 'therapeutic', label: 'Terapêuticas' },
                { id: 'healthy', label: 'Manutenção' },
                { id: 'all', label: 'Todas as rações' },
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
          </div>
        </CardContent>
      </Card>

      {dietTypeFilter !== 'all' && viewMode === 'browse' && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-border/80 bg-card p-3 shadow-sm sm:p-4"
        >
          <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-primary">
                {dietTypeFilter === 'therapeutic' ? 'Área clínica' : 'Perfil de manutenção'}
              </p>
              <h2 className="mt-0.5 text-sm font-extrabold text-foreground sm:text-base">
                {dietTypeFilter === 'therapeutic' ? 'Qual é o objetivo terapêutico?' : 'Qual perfil de alimentação você procura?'}
              </h2>
            </div>
            <p className="text-[10px] text-muted-foreground">Selecione um bloco para refinar os resultados</p>
          </div>

          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[
              {
                id: 'all',
                label: dietTypeFilter === 'therapeutic' ? 'Todas as áreas clínicas' : 'Todas as categorias',
                count: categoryOptions.reduce((total, option) => total + option.count, 0),
              },
              ...categoryOptions,
            ].map((option, optionIndex) => {
              const visual = CATEGORY_VISUALS[option.id] ?? CATEGORY_VISUALS.all
              const Icon = visual.icon
              const selected = categoryFilter === option.id
              const disabled = option.count === 0

              return (
                <motion.button
                  key={option.id}
                  type="button"
                  disabled={disabled}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(optionIndex * 0.015, 0.15), duration: 0.2 }}
                  whileHover={disabled ? undefined : { y: -1, scale: 1.003 }}
                  whileTap={disabled ? undefined : { scale: 0.99 }}
                  onClick={() => setCategoryFilter(option.id)}
                  className={cn(
                    'group relative flex min-h-[50px] items-center gap-2.5 overflow-hidden rounded-xl border px-2.5 py-1.5 text-left outline-none transition-[border-color,background-color,box-shadow] focus-visible:ring-2 focus-visible:ring-primary/40',
                    selected
                      ? 'border-primary/45 bg-primary/[0.07] shadow-[0_4px_16px_rgba(37,99,235,0.08)]'
                      : 'border-border/80 bg-background hover:border-primary/30 hover:bg-primary/[0.025]',
                    disabled && 'cursor-not-allowed opacity-45',
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="selected-diet-category"
                      className="absolute inset-y-0 left-0 w-1 rounded-r-full bg-primary"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors',
                    selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary',
                  )}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-1.5">
                      <strong className="truncate text-[11px] font-bold leading-tight text-foreground">{option.label}</strong>
                      <span className={cn(
                        'rounded-full px-1.5 py-0.2 text-[9px] font-black tabular-nums shrink-0',
                        selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                      )}>{option.count}</span>
                    </span>
                    <span className="line-clamp-1 text-[9px] text-muted-foreground mt-0.5">{visual.description}</span>
                  </span>
                </motion.button>
              )
            })}
          </div>
        </motion.section>
      )}

      {/* 3. Catálogo em cards ou ficha detalhada */}
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
              setDietTypeFilter('all')
              setCategoryFilter('all')
            }}
            className="mt-4 text-xs"
          >
            Limpar busca
          </Button>
        </Card>
      ) : viewMode === 'browse' ? (
        <motion.section
          key="diet-browser"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          <div className="flex flex-col gap-2 rounded-2xl border border-border/80 bg-card px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-primary">Resultados</p>
              <h2 className="mt-0.5 text-base font-extrabold text-foreground">
                {filteredDiets.length} {filteredDiets.length === 1 ? 'ração encontrada' : 'rações encontradas'}
              </h2>
            </div>
            <p className="max-w-md text-[10px] leading-relaxed text-muted-foreground sm:text-right">
              Compare os diferenciais e macronutrientes. Clique em uma ração para abrir a ficha clínica completa.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleDiets.map((diet, dietIndex) => (
              <CommercialDietBrowseCard
                key={diet.food.id}
                metadata={diet}
                index={dietIndex}
                onSelect={() => handleOpenDiet(dietIndex)}
                onZoomImage={() => setZoomedDiet(diet)}
              />
            ))}
          </div>

          {visibleCount < filteredDiets.length ? (
            <div
              ref={sentinelRef}
              className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground"
            >
              <div className="flex items-center gap-2 rounded-full border border-border/80 bg-card/90 px-4 py-2 text-xs font-medium shadow-sm backdrop-blur-sm">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span>Carregando mais rações...</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center text-xs text-muted-foreground/70">
              <span className="font-medium">Todas as {filteredDiets.length} rações foram carregadas.</span>
            </div>
          )}
        </motion.section>
      ) : (
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-2 rounded-2xl border border-border/80 bg-card px-3 py-2.5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('browse')}
              className="h-8 justify-start gap-1.5 px-2 text-xs font-bold"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Voltar aos resultados
            </Button>
            <span className="px-2 text-[10px] font-medium text-muted-foreground">
              Ração {currentIndex + 1} de {filteredDiets.length}
            </span>
          </motion.div>

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
                            {currentDiet.carbPctDm != null ? `${currentDiet.carbPctDm.toFixed(1)}%` : '—'}
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
                            {currentDiet.fatPctDm != null ? `${currentDiet.fatPctDm.toFixed(1)}%` : '—'}
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
                            {currentDiet.proteinPctDm != null ? `${currentDiet.proteinPctDm.toFixed(1)}%` : '—'}
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
                              {(currentDiet.caloricDensityKcal100g ?? 0).toFixed(0)} kcal/100g <span className="text-[10px] text-muted-foreground font-normal">({currentDiet.caloricDensityKcalKg ?? 0} kcal/kg)</span>
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Matéria Seca (MS)</span>
                            <span className="font-bold text-foreground tabular-nums">
                              {(currentDiet.dryMatterPct ?? 0).toFixed(0)}% <span className="text-[10px] text-muted-foreground font-normal">(Umidade {(currentDiet.moisturePct ?? 0).toFixed(1)}%)</span>
                            </span>
                          </div>
                        </div>

                        {/* Linha 2: Cálcio & Fósforo */}
                        <div className="grid grid-cols-2 gap-3 py-1">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Cálcio</span>
                            <span className="font-bold text-foreground tabular-nums">
                              {currentDiet.calciumPctDm != null ? `${Number(currentDiet.calciumPctDm).toFixed(2)}% MS` : '—'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Fósforo</span>
                            <span className="font-bold text-foreground tabular-nums">
                              {currentDiet.phosphorusPctDm != null ? `${Number(currentDiet.phosphorusPctDm).toFixed(2)}% MS` : '—'}
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
                              {currentDiet.sodiumPctDm != null ? `${Number(currentDiet.sodiumPctDm).toFixed(2)}% MS` : '—'}
                            </span>
                          </div>
                        </div>

                        {/* Linha 4: Potássio & Fibra Bruta */}
                        <div className="grid grid-cols-2 gap-3 py-1 last:pb-0">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Potássio</span>
                            <span className="font-bold text-foreground tabular-nums">
                              {currentDiet.potassiumPctDm != null ? `${Number(currentDiet.potassiumPctDm).toFixed(2)}% MS` : '—'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Fibra Bruta</span>
                            <span className="font-bold text-foreground tabular-nums">
                              {(currentDiet.fiberPctDm ?? 0).toFixed(1)}% MS
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
                        onClick={() => handleUseInPlan()}
                      >
                        <Utensils className="h-4 w-4" />
                        Usar em Plano Nutricional
                      </Button>

                      {currentProductUrl && (
                        <a
                          href={currentProductUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-blue-600 px-3 text-xs font-bold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow"
                          title={`Abrir página oficial da fabricante (${currentDiet.brand})`}
                        >
                          <ExternalLink className="h-3.5 w-3.5 text-white shrink-0" />
                          <span className="text-white">Consultar Fabricante ({currentDiet.brand})</span>
                        </a>
                      )}

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
                    <CommercialDietCardVisual
                      metadata={currentDiet}
                      className="w-full"
                      onZoomImage={() => setZoomedDiet(currentDiet)}
                    />
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

      {/* 5. Lightbox / Modal de Zoom da Embalagem */}
      <DietImageZoomModal
        diet={zoomedDiet}
        isOpen={!!zoomedDiet}
        onClose={() => setZoomedDiet(null)}
      />
    </div>
  )
}
