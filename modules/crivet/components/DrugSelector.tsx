import React, { useCallback, useMemo, useState } from 'react'
import { Pill, Search, Sparkles } from 'lucide-react'
import { Drug, categories, drugs } from '../data/drugs'
import { HelpModal } from './HelpModal'
import { CATEGORY_STYLES, mapCategoryToStyle } from '../ui/categoryStyles'
import { DrugProfileStatusBadge } from './DrugProfileWarning'
import { getDrugProfileValidation, getDrugProfile } from '../utils/drugProfileRegistry'
import { normalizeDrug } from '../services/normalizeDrug'

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

  // Obter perfil e normalizar
  const profile = getDrugProfile(drugId)
  const normalized = profile ? normalizeDrug(profile) : null

  // Verificar se há conteúdo para exibir
  const hasContent = normalized && normalized.helpDrawer.sections.length > 0

  // Renderizar conteúdo
  const content = hasContent ? (
    <div className="space-y-6">
      {normalized!.helpDrawer.sections.map((section, idx) => (
        <div key={idx} className="space-y-3">
          <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
            {section.title}
          </h3>
          <div className="space-y-2 text-white/90">
            {section.content.map((paragraph, pIdx) => (
              <p key={pIdx} className="text-sm leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="space-y-3">
      <p className="text-sm text-red-400 font-medium">
        ⚠️ Erro de Desenvolvimento
      </p>
      <p className="text-sm text-white/80">
        Fármaco sem conteúdo normalizado. Verifique import/normalizer.
      </p>
      <p className="text-xs text-white/60 mt-2">
        Este fármaco não possui informações no formato esperado. Em produção, isso não deve acontecer porque a importação será bloqueada.
      </p>
    </div>
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-7 w-7 rounded-full border border-white/30 hover:bg-white/20 text-white/90 hover:text-white transition-colors flex items-center justify-center text-sm font-medium"
        aria-label={`Ajuda: ${title}`}
        disabled={!hasContent}
        title={hasContent ? 'Informações sobre o fármaco' : 'Sem informações disponíveis'}
      >
        ?
      </button>
      <HelpModal open={open} title={title} onClose={() => setOpen(false)}>
        {content}
      </HelpModal>
    </>
  )
}

export default function DrugSelector({ selectedDrug, onSelectDrug }: DrugSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
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
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 p-6 space-y-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-700 text-xs font-black">
            2
          </span>
          Seleção de fármaco
        </h2>
      </div>

      {selectedDrug && (() => {
        const categoryStyle = CATEGORY_STYLES[mapCategoryToStyle(selectedDrug.category)]
        return (
          <div className={`rounded-xl border px-3 py-2 ${categoryStyle.className}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                  <Pill className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider opacity-80 font-semibold">Selecionado</p>
                  <p className="text-lg font-bold">{selectedDrug.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold opacity-90">{categoryStyle.label}</span>
                <HelpButtonWithModal
                  title={`Sobre ${selectedDrug.name}`}
                  drugId={selectedDrug.id}
                />
                <Sparkles className="w-5 h-5 text-white/80 animate-pulse" />
              </div>
            </div>
          </div>
        )
      })()}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        <input
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar fármaco..."
          className="w-full h-12 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 pl-10 pr-3 text-base text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label="Limpar busca"
          >
            ×
          </button>
        )}
      </div>

      <div className="border rounded-xl border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900/60">
        {searchTerm && Object.keys(grouped).length === 0 ? (
          <div className="p-8 text-center text-slate-600 dark:text-slate-400">Nenhum fármaco encontrado.</div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {Object.entries(grouped).map(([category, list]) => (
              <div key={category}>
                <button className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800">
                  {category}
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-3">
                  {list.map((drug) => (
                    <button
                      key={drug.id}
                      onClick={() => handleSelect(drug)}
                      className={`group relative flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 border-2 ${
                        selectedDrug?.id === drug.id
                          ? 'bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/30 dark:to-sky-800/30 border-sky-500 shadow-md'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-600 hover:shadow-md'
                      }`}
                    >
                      <span
                        className={`font-semibold text-sm ${
                          selectedDrug?.id === drug.id
                            ? 'text-sky-900 dark:text-sky-100'
                            : 'text-slate-700 dark:text-slate-300 group-hover:text-sky-700 dark:group-hover:text-sky-400'
                        }`}
                      >
                        {drug.name}
                      </span>
                      {selectedDrug?.id === drug.id && <Sparkles className="w-4 h-4 text-sky-500 animate-pulse" />}
                      <DrugProfileStatusBadge
                        completeness={(() => {
                          const validation = getDrugProfileValidation(drug.id)
                          return validation.completeness
                        })()}
                        hasCritical={(() => {
                          const validation = getDrugProfileValidation(drug.id)
                          return validation.missing.some((m) => m.severity === 'critical')
                        })()}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
