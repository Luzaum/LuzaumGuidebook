import React, { useCallback, useMemo, useState } from 'react'
import { Pill, Search, Sparkles, ChevronDown, ChevronRight } from 'lucide-react'
import { Drug, categories, drugs } from '../data/drugs'
import { HelpModal } from './HelpModal'
import { HelpContentRenderer } from './HelpContent'
import { CATEGORY_STYLES, mapCategoryToStyle } from '../ui/categoryStyles'
import { DrugProfileStatusBadge } from './DrugProfileWarning'
import { getDrugProfileValidation } from '../utils/drugProfileRegistry'
import { getMissingFieldsBySection } from '../utils/drugProfileValidation'
import { getDrug } from '../services/getDrug'

type DrugSelectorProps = {
  selectedDrug: Drug | null
  onSelectDrug: (drug: Drug) => void
}

function HelpButtonWithModal({
  title,
  drugId
}: {
  title: string
  drugId: string
}) {
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
    setExpandedCategories(prev => {
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
      {/* Card header */}
      <div className="crivet-card-header">
        <div className="crivet-step-badge">2</div>
        <h2 id="drug-selector-title" className="crivet-card-title">Seleção de fármaco</h2>
        {selectedDrug && (
          <span className="crivet-status-pill crivet-status-pill--active ml-auto">
            {selectedDrug.name}
          </span>
        )}
      </div>

      {/* Selected drug banner */}
      {selectedDrug && (() => {
        const categoryStyle = CATEGORY_STYLES[mapCategoryToStyle(selectedDrug.category)]
        const validation = getDrugProfileValidation(selectedDrug.id)
        const missingBySection = getMissingFieldsBySection(validation)
        return (
          <div className={`crivet-drug-selected-banner ${categoryStyle.className}`}>
            <div className="flex items-center gap-3">
              <div className="crivet-drug-icon-wrap">
                <Pill className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest opacity-75 font-semibold">Selecionado</p>
                <p className="text-base font-bold leading-tight">{selectedDrug.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold opacity-80 hidden sm:block">{categoryStyle.label}</span>
              <HelpButtonWithModal
                title={`Sobre ${selectedDrug.name}`}
                drugId={selectedDrug.id}
              />
              <Sparkles className="w-4 h-4 text-white/70 animate-pulse" aria-hidden="true" />
            </div>

            {/* Completeness bar */}
            <div className="col-span-2 mt-2 rounded-lg border border-white/15 bg-black/10 p-3">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide opacity-80 mb-1.5">
                <span>Completude do perfil</span>
                <span className="text-sm font-bold normal-case">{validation.completeness}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-white/80 transition-all duration-500"
                  style={{ width: `${validation.completeness}%` }}
                  role="progressbar"
                  aria-valuenow={validation.completeness}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              {validation.missing.length > 0 && (
                <div className="mt-2 space-y-2">
                  {Object.entries(missingBySection).map(([section, fields]) => (
                    <div key={section} className="text-xs">
                      <div className="font-semibold uppercase tracking-wide opacity-70">{section}</div>
                      <ul className="mt-1 space-y-0.5">
                        {fields.map((field) => (
                          <li key={`${field.section}-${field.field}`} className="flex items-start gap-1.5">
                            <span className={
                              field.severity === 'critical' ? 'text-red-200' :
                                field.severity === 'warning' ? 'text-yellow-200' : 'text-green-200'
                            }>
                              {field.severity === 'critical' ? '!' : field.severity === 'warning' ? '~' : 'i'}
                            </span>
                            <span className="opacity-80">
                              <code className="text-[10px] bg-black/20 px-1 rounded">{field.field}</code>{' '}
                              {field.description}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      })()}

      {/* Search */}
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
            ×
          </button>
        )}
      </div>

      {/* Drug list */}
      <div className="crivet-drug-list">
        {searchTerm && Object.keys(grouped).length === 0 ? (
          <div className="p-10 text-center">
            <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-3" aria-hidden="true" />
            <p className="text-slate-500 dark:text-slate-400 text-sm">Nenhum fármaco encontrado para "<strong>{searchTerm}</strong>"</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {Object.entries(grouped).map(([category, list]) => {
              const isExpanded = expandedCategories.has(category) || !!searchTerm
              return (
                <div key={category}>
                  <button
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className="crivet-category-header"
                    aria-expanded={isExpanded}
                  >
                    <span>{category}</span>
                    <div className="flex items-center gap-2">
                      <span className="crivet-category-count">{list.length}</span>
                      {isExpanded
                        ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                        : <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                      }
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-3">
                      {list.map((drug) => {
                        const validation = getDrugProfileValidation(drug.id)
                        const hasCritical = validation.missing.some((m) => m.severity === 'critical')
                        const isSelected = selectedDrug?.id === drug.id
                        return (
                          <button
                            key={drug.id}
                            type="button"
                            onClick={() => handleSelect(drug)}
                            aria-pressed={isSelected}
                            className={`crivet-drug-btn ${isSelected ? 'crivet-drug-btn--selected' : ''}`}
                          >
                            <span className={`font-semibold text-sm truncate ${isSelected
                                ? 'text-cyan-900 dark:text-cyan-100'
                                : 'text-slate-700 dark:text-slate-300'
                              }`}>
                              {drug.name}
                            </span>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              {isSelected && <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" aria-hidden="true" />}
                              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                                {validation.completeness}%
                              </span>
                              <DrugProfileStatusBadge completeness={validation.completeness} hasCritical={hasCritical} />
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
