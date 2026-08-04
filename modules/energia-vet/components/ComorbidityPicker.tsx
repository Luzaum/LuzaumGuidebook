import { useMemo, useState } from 'react'
import {
  Activity,
  AlertCircle,
  Check,
  ChevronDown,
  Droplets,
  HeartPulse,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import { cn } from '../lib/utils'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import type { ClinicalProfileOption } from '../lib/clinicalProfiles'

const COMORBIDITY_CATEGORIES = [
  { id: 'all', label: 'Todas', icon: Sparkles, tone: 'bg-slate-500/10 text-slate-700 dark:text-slate-200 ring-slate-500/20' },
  { id: 'renal', label: 'Renal e urinário', icon: Droplets, tone: 'bg-sky-500/10 text-sky-800 dark:text-sky-200 ring-sky-500/20' },
  { id: 'digestive', label: 'Digestivo', icon: Activity, tone: 'bg-amber-500/10 text-amber-900 dark:text-amber-100 ring-amber-500/20' },
  { id: 'metabolic', label: 'Metabólico', icon: HeartPulse, tone: 'bg-violet-500/10 text-violet-800 dark:text-violet-200 ring-violet-500/20' },
  { id: 'allergy', label: 'Alergias', icon: AlertCircle, tone: 'bg-rose-500/10 text-rose-800 dark:text-rose-200 ring-rose-500/20' },
  { id: 'systemic', label: 'Sistêmico', icon: HeartPulse, tone: 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 ring-emerald-500/20' },
] as const

export type ComorbidityCategoryId = (typeof COMORBIDITY_CATEGORIES)[number]['id']

type ComorbidityCategory = Exclude<ComorbidityCategoryId, 'all'>

export interface ComorbidityGuidance {
  summary: string
  priorities: string[]
  sources: string[]
}

interface ComorbidityPickerProps {
  options: ClinicalProfileOption[]
  selectedIds: string[]
  onToggle: (optionId: string) => void
  onClear: () => void
  getCategory: (option: ClinicalProfileOption) => ComorbidityCategory
  buildGuidance: (option: ClinicalProfileOption) => ComorbidityGuidance
}

function normalizeSearchText(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

function getCategoryMeta(categoryId: ComorbidityCategoryId) {
  return COMORBIDITY_CATEGORIES.find((category) => category.id === categoryId) ?? COMORBIDITY_CATEGORIES[0]
}

export function ComorbidityPicker({
  options,
  selectedIds,
  onToggle,
  onClear,
  getCategory,
  buildGuidance,
}: ComorbidityPickerProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ComorbidityCategoryId>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredOptions = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query.trim())
    return options.filter((option) => {
      const matchesCategory = category === 'all' || getCategory(option) === category
      const matchesQuery =
        !normalizedQuery ||
        normalizeSearchText([option.label, option.description, option.tags.join(' ')].join(' ')).includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [category, getCategory, options, query])

  const categoryCounts = useMemo(() => {
    const counts = new Map<ComorbidityCategoryId, number>([['all', options.length]])
    for (const option of options) {
      const optionCategory = getCategory(option)
      counts.set(optionCategory, (counts.get(optionCategory) ?? 0) + 1)
    }
    return counts
  }, [getCategory, options])

  const selectedOptions = useMemo(
    () => selectedIds.map((id) => options.find((option) => option.id === id)).filter((option): option is ClinicalProfileOption => Boolean(option)),
    [options, selectedIds],
  )

  return (
    <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="border-b border-border bg-gradient-to-r from-primary/[0.06] via-card to-card px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <HeartPulse className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Comorbidades</h2>
                <p className="text-sm text-muted-foreground">Selecione condições clínicas para orientar metas e alertas nutricionais.</p>
              </div>
            </div>
          </div>
          <div className="relative w-full lg:max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar condição..."
              className="border-border/80 bg-background/90 pl-10 pr-10"
            />
            {query && (
              <button
                type="button"
                aria-label="Limpar busca"
                onClick={() => setQuery('')}
                className="absolute right-2 top-1.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="border-b border-border bg-muted/20 p-4 lg:border-b-0 lg:border-r">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Categorias</p>
          <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0" role="tablist" aria-label="Categorias de comorbidades">
            {COMORBIDITY_CATEGORIES.map((item) => {
              const Icon = item.icon
              const active = category === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(item.id)}
                  className={cn(
                    'flex min-h-11 shrink-0 cursor-pointer items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left outline-none transition-all focus-visible:ring-3 focus-visible:ring-ring/25 lg:w-full',
                    active
                      ? 'border-primary/35 bg-primary/[0.08] text-foreground shadow-sm'
                      : 'border-transparent bg-transparent text-muted-foreground hover:border-border hover:bg-card hover:text-foreground',
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset', item.tone)}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="truncate text-sm font-medium">{item.label}</span>
                  </span>
                  <span className={cn('rounded-full px-2 py-0.5 text-xs tabular-nums', active ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground')}>
                    {categoryCounts.get(item.id) ?? 0}
                  </span>
                </button>
              )
            })}
          </div>
        </aside>

        <div className="p-4 sm:p-5">
          {selectedOptions.length > 0 && (
            <div className="mb-5 rounded-2xl border border-primary/20 bg-primary/[0.05] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{selectedOptions.length} condição(ões) ativa(s)</p>
                  <p className="mt-1 text-xs text-muted-foreground">Toque em um chip para ver o impacto nutricional cadastrado.</p>
                </div>
                <button
                  type="button"
                  onClick={onClear}
                  className="min-h-9 cursor-pointer rounded-lg px-3 text-xs font-semibold text-primary hover:bg-primary/10"
                >
                  Limpar tudo
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedOptions.map((option) => {
                  const meta = getCategoryMeta(getCategory(option))
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setExpandedId((current) => (current === option.id ? null : option.id))}
                      className={cn(
                        'inline-flex max-w-full cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-left text-sm font-medium transition-colors',
                        expandedId === option.id
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-primary/25 bg-card text-foreground hover:border-primary/40 hover:bg-primary/[0.06]',
                      )}
                    >
                      <span className={cn('h-2 w-2 shrink-0 rounded-full', expandedId === option.id ? 'bg-primary-foreground' : 'bg-primary')} />
                      <span className="truncate">{option.label.replace(/\s+(Cães|Gatos)\s*-?$/i, '')}</span>
                      <span
                        role="button"
                        tabIndex={0}
                        aria-label={`Remover ${option.label}`}
                        onClick={(event) => {
                          event.stopPropagation()
                          onToggle(option.id)
                          if (expandedId === option.id) setExpandedId(null)
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            event.stopPropagation()
                            onToggle(option.id)
                            if (expandedId === option.id) setExpandedId(null)
                          }
                        }}
                        className={cn(
                          'ml-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                          expandedId === option.id ? 'hover:bg-primary-foreground/15' : 'hover:bg-muted',
                        )}
                      >
                        <X className="h-3 w-3" />
                      </span>
                    </button>
                  )
                })}
              </div>

              {expandedId && (
                <div className="mt-4 rounded-2xl border border-border/80 bg-card/90 p-4">
                  {(() => {
                    const option = selectedOptions.find((item) => item.id === expandedId)
                    if (!option) return null
                    const guidance = buildGuidance(option)
                    const meta = getCategoryMeta(getCategory(option))
                    return (
                      <>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Badge variant="outline" className={cn('rounded-full border-0 ring-1 ring-inset', meta.tone)}>
                              {meta.label}
                            </Badge>
                            <p className="mt-2 text-sm font-semibold text-foreground">{option.label.replace(/\s+(Cães|Gatos)\s*-?$/i, '')}</p>
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">{guidance.summary}</p>
                        {guidance.priorities.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {guidance.priorities.map((priority) => (
                              <span key={priority} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                                {priority}
                              </span>
                            ))}
                          </div>
                        )}
                        {guidance.sources.length > 0 && (
                          <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
                            <span className="font-semibold text-foreground">Referência:</span> {guidance.sources.join(' · ')}
                          </p>
                        )}
                      </>
                    )
                  })()}
                </div>
              )}
            </div>
          )}

          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {filteredOptions.map((option) => {
              const active = selectedIds.includes(option.id)
              const meta = getCategoryMeta(getCategory(option))
              const Icon = meta.icon
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    onToggle(option.id)
                    if (!active) setExpandedId(option.id)
                    else if (expandedId === option.id) setExpandedId(null)
                  }}
                  className={cn(
                    'group flex min-h-[74px] cursor-pointer items-start gap-3 rounded-2xl border px-3.5 py-3 text-left outline-none transition-all focus-visible:ring-3 focus-visible:ring-ring/25',
                    active
                      ? 'border-primary/40 bg-primary/[0.06] shadow-sm'
                      : 'border-border/80 bg-background hover:border-primary/20 hover:bg-muted/35',
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset transition-colors',
                      active ? 'bg-primary text-primary-foreground ring-primary/30' : meta.tone,
                    )}
                  >
                    {active ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold leading-5 text-foreground">
                      {option.label.replace(/\s+(Cães|Gatos)\s*-?$/i, '')}
                    </span>
                    <span className="mt-1 block line-clamp-2 text-xs leading-5 text-muted-foreground">{option.description}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {filteredOptions.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border px-5 py-12 text-center">
              <ChevronDown className="mx-auto h-5 w-5 rotate-180 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium text-foreground">Nenhuma condição encontrada</p>
              <p className="mt-1 text-sm text-muted-foreground">Tente outra categoria ou limpe a busca.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export { COMORBIDITY_CATEGORIES }
