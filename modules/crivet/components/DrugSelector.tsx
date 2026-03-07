import React, { useCallback, useMemo, useState } from 'react'
import {
  Pill,
  Search,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Layers3,
  FlaskConical,
  FolderKanban,
  ShieldCheck,
} from 'lucide-react'
import { Drug, categories, drugs } from '../data/drugs'
import { HelpModal } from './HelpModal'
import { HelpContentRenderer } from './HelpContent'
import { CATEGORY_STYLES, mapCategoryToStyle } from '../ui/categoryStyles'
import { getDrug } from '../services/getDrug'

type DrugSelectorProps = {
  selectedDrug: Drug | null
  onSelectDrug: (drug: Drug) => void
}

function getDrugClasses(drug: Drug): string[] {
  const fromProfile = Array.isArray(drug.profile?.class) ? drug.profile.class : []
  const cleaned = fromProfile.map((item) => String(item || '').trim()).filter((item) => item.length > 0)
  if (cleaned.length > 0) return cleaned
  return ['Classe em revisão']
}

function HelpButtonWithModal({ title, drugId }: { title: string; drugId: string }) {
  const [open, setOpen] = useState(false)
  const normalized = getDrug(drugId)
  const helpTitle = normalized.helpDrawer.title || title
  const content = <HelpContentRenderer content={normalized.helpDrawer} />

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="crivet-help-btn"
        aria-label={`Ajuda: ${title}`}
        title="Informações sobre o fármaco"
      >
        ?
      </button>
      <HelpModal open={open} title={helpTitle} onClose={() => setOpen(false)}>
        {content}
      </HelpModal>
    </>
  )
}

export default function DrugSelector({ selectedDrug, onSelectDrug }: DrugSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(categories))

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }, [])

  const toggleCategory = useCallback((category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(category)) next.delete(category)
      else next.add(category)
      return next
    })
  }, [])

  const filteredDrugs = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase()
    if (!normalized) return drugs
    return drugs.filter((drugItem) => drugItem.name.toLowerCase().includes(normalized))
  }, [searchTerm])

  const grouped = useMemo(() => {
    return categories.reduce<Record<string, Drug[]>>((accumulator, category) => {
      const items = filteredDrugs.filter((drugItem) => drugItem.category === category)
      if (items.length > 0) accumulator[category] = items
      return accumulator
    }, {})
  }, [filteredDrugs])

  const handleSelect = useCallback(
    (drug: Drug) => {
      onSelectDrug(drug)
    },
    [onSelectDrug],
  )

  return (
    <section className="crivet-card" aria-labelledby="drug-selector-title">
      <div className="crivet-card-header">
        <div className="crivet-step-badge">2</div>
        <h2 id="drug-selector-title" className="crivet-card-title">
          Seleção de fármaco
        </h2>
        {selectedDrug && <span className="crivet-status-pill crivet-status-pill--active ml-auto">{selectedDrug.name}</span>}
      </div>

      {selectedDrug && (() => {
        const categoryStyle = CATEGORY_STYLES[mapCategoryToStyle(selectedDrug.category)]
        const classes = getDrugClasses(selectedDrug)

        return (
          <div className={`crivet-drug-selected-banner ${categoryStyle.bannerClassName}`}>
            <div className="flex items-start gap-3">
              <div className="crivet-drug-icon-wrap">
                <Pill className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="space-y-1 min-w-0">
                <p className="text-[11px] uppercase tracking-widest opacity-80 font-semibold">Selecionado</p>
                <p className="text-base font-bold leading-tight">{selectedDrug.name}</p>
                <p className="text-xs opacity-90 flex items-center gap-1.5 crivet-drug-meta-full" title={classes[0]}>
                  <FlaskConical className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                  Classe principal: <strong>{classes[0]}</strong>
                </p>
                <p className="text-xs opacity-90 flex items-center gap-1.5">
                  <FolderKanban className="w-3.5 h-3.5" aria-hidden="true" />
                  Categoria: <strong>{categoryStyle.label}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <HelpButtonWithModal title={`Sobre ${selectedDrug.name}`} drugId={selectedDrug.id} />
              <Sparkles className="w-4 h-4 text-white/75 animate-pulse" aria-hidden="true" />
            </div>
          </div>
        )
      })()}

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
        <input
          id="drug-search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar fármaco..."
          aria-label="Buscar fármaco"
          className="crivet-search-input"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center justify-center text-xs font-bold cursor-pointer"
            aria-label="Limpar busca"
          >
            x
          </button>
        )}
      </div>

      <div className="crivet-drug-list">
        {searchTerm && Object.keys(grouped).length === 0 ? (
          <div className="p-10 text-center">
            <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-3" aria-hidden="true" />
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Nenhum fármaco encontrado para "<strong>{searchTerm}</strong>"
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {Object.entries(grouped).map(([category, list]) => {
              const categoryStyle = CATEGORY_STYLES[mapCategoryToStyle(list[0].category)]
              const isExpanded = expandedCategories.has(category) || !!searchTerm

              return (
                <div key={category}>
                  <button
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={`crivet-category-header ${categoryStyle.headerClassName}`}
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Layers3 className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                      <span className="truncate">{category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`crivet-category-count ${categoryStyle.countClassName}`}>{list.length}</span>
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-current/70" aria-hidden="true" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-current/70" aria-hidden="true" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-3">
                      {list.map((drug) => {
                        const isSelected = selectedDrug?.id === drug.id
                        const drugClasses = getDrugClasses(drug)
                        const tone = CATEGORY_STYLES[mapCategoryToStyle(drug.category)]

                        return (
                          <button
                            key={drug.id}
                            type="button"
                            onClick={() => handleSelect(drug)}
                            aria-pressed={isSelected}
                            className={`crivet-drug-btn relative overflow-hidden transition-all duration-300 group ${isSelected ? `ring-2 ring-offset-2 ring-offset-slate-900 scale-[1.02] shadow-[0_4px_25px_rgba(0,0,0,0.5)] bg-slate-800 ${tone.selectedCardClassName} saturate-[1.5] brightness-125` : `bg-slate-900/50 hover:bg-slate-800 border-slate-700 hover:border-slate-500 ${tone.cardClassName}`}`}
                          >
                            {isSelected && <div className="absolute inset-0 bg-gradient-to-tr opacity-20 from-transparent to-white pointer-events-none" />}
                            <div className="min-w-0 flex-1">
                              <span
                                className={`block font-semibold text-sm truncate transition-colors ${isSelected ? 'text-white drop-shadow-md' : 'text-slate-300 group-hover:text-white'
                                  }`}
                              >
                                {drug.name}
                              </span>
                              <div className="mt-1.5 space-y-0.5">
                                <p className="text-[11px] text-slate-400 truncate flex items-center gap-1.5">
                                  <FlaskConical className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                                  {drugClasses[0]}
                                </p>
                                <p className="text-[11px] text-slate-400 truncate flex items-center gap-1.5">
                                  <FolderKanban className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                                  {tone.label}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 flex-shrink-0 pl-2">
                              {isSelected && <ShieldCheck className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" aria-hidden="true" />}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
