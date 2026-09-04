import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Search } from 'lucide-react'
import { Card } from '../UI/Card'
import type { ComplaintContext } from '../../stores/caseStore'
import { ClockTimelinePicker } from '../Step2/ClockTimelinePicker'
import { DiseaseProgressionChips } from '../Step2/DiseaseProgressionChips'
import { CHIEF_COMPLAINT_CATEGORIES } from '../../data/chiefComplaintsCatalog'

interface Step2Props {
  complaint: ComplaintContext
  setComplaint: (patch: Partial<ComplaintContext>) => void
}

export function Step2ChiefComplaint({ complaint, setComplaint }: Step2Props) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | 'all'>('all')

  const toggleComplaint = (complaintId: string) => {
    const current = complaint.chiefComplaintIds
    const newComplaints = current.includes(complaintId)
      ? current.filter((c) => c !== complaintId)
      : [...current, complaintId]
    setComplaint({ chiefComplaintIds: newComplaints })
  }

  const normalizedSearch = search.trim().toLowerCase()

  const visibleCategories = useMemo(() => {
    return CHIEF_COMPLAINT_CATEGORIES.map((category) => ({
      ...category,
      items: category.items.filter((item) => {
        const matchesCategory = activeCategory === 'all' || category.id === activeCategory
        if (!matchesCategory) return false
        if (!normalizedSearch) return true
        const haystack = `${item.label} ${item.keywords || ''} ${item.id}`.toLowerCase()
        return haystack.includes(normalizedSearch)
      }),
    })).filter((category) => category.items.length > 0)
  }, [activeCategory, normalizedSearch])

  const selectedCount = complaint.chiefComplaintIds.length

  return (
    <div className="space-y-6 pb-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold text-foreground mb-2">Queixa principal</h2>
        <p className="text-muted-foreground">
          Selecione os sinais relatados pelo tutor. Lista curada conforme apresentações neurológicas mais comuns.
        </p>
      </motion.div>

      <Card className="space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar queixa (ex.: convulsão, ataxia, dor cervical...)"
            className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-gold/50"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              activeCategory === 'all'
                ? 'border-gold/60 bg-gold/15 text-gold'
                : 'border-border text-muted-foreground hover:border-gold/40'
            }`}
          >
            Todas
          </button>
          {CHIEF_COMPLAINT_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                activeCategory === category.id
                  ? 'border-gold/60 bg-gold/15 text-gold'
                  : 'border-border text-muted-foreground hover:border-gold/40'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {selectedCount > 0 && (
          <div className="rounded-xl border border-gold/30 bg-gold/10 px-3 py-2 text-xs text-gold">
            {selectedCount} queixa{selectedCount > 1 ? 's' : ''} selecionada{selectedCount > 1 ? 's' : ''}
          </div>
        )}
      </Card>

      <div className="space-y-5">
        <AnimatePresence mode="popLayout">
          {visibleCategories.map((category) => (
            <motion.section
              key={category.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              <div>
                <h3 className="text-sm font-semibold text-foreground">{category.label}</h3>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => {
                  const isSelected = complaint.chiefComplaintIds.includes(item.id)
                  const Icon = item.icon
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleComplaint(item.id)}
                      className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                        isSelected
                          ? 'border-gold/60 bg-gold/12 shadow-[0_0_16px_rgba(245,197,66,0.15)]'
                          : 'border-border bg-background/80 hover:border-gold/40'
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          isSelected ? 'bg-gold/25 text-gold' : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <span className={`flex-1 text-sm font-medium ${isSelected ? 'text-gold' : 'text-foreground'}`}>
                        {item.label}
                      </span>
                      {isSelected && <Check className="h-4 w-4 shrink-0 text-gold" aria-hidden />}
                    </motion.button>
                  )
                })}
              </div>
            </motion.section>
          ))}
        </AnimatePresence>

        {visibleCategories.length === 0 && (
          <Card className="py-8 text-center text-sm text-muted-foreground">
            Nenhuma queixa encontrada para &quot;{search}&quot;. Tente outro termo ou use a descrição livre abaixo.
          </Card>
        )}
      </div>

      <Card>
        <label className="text-sm font-medium text-muted-foreground mb-3 block">
          Descrição complementar (opcional)
        </label>
        <textarea
          value={complaint.contextNotes}
          onChange={(e) => setComplaint({ contextNotes: e.target.value })}
          className="w-full rounded-xl border border-border bg-background p-3 text-foreground outline-none focus:ring-2 focus:ring-gold/50 min-h-[88px] resize-y text-sm"
          placeholder="Detalhes da história: início, frequência, medicações, evolução relatada pelo tutor..."
        />
      </Card>

      <Card>
        <label className="text-sm font-medium text-muted-foreground mb-1 block">Quando começou?</label>
        <p className="mb-4 text-xs text-muted-foreground">Padrão temporal — obrigatório</p>
        <ClockTimelinePicker
          value={complaint.temporalPattern}
          onChange={(pattern) => setComplaint({ temporalPattern: pattern })}
        />
      </Card>

      <Card>
        <label className="text-sm font-medium text-muted-foreground mb-1 block">Como evoluiu?</label>
        <p className="mb-4 text-xs text-muted-foreground">Curso do quadro — obrigatório</p>
        <DiseaseProgressionChips
          value={complaint.evolutionPattern}
          onChange={(pattern) => setComplaint({ evolutionPattern: pattern })}
        />
      </Card>
    </div>
  )
}
