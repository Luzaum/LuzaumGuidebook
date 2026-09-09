import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  AlertCircle,
  Brain,
  Calendar,
  Cat,
  Copy,
  Dog,
  Eye,
  FilePlus,
  Filter,
  FolderOpen,
  PlusCircle,
  Search,
  Stethoscope,
  Trash2,
  X,
} from 'lucide-react'
import { useHistoryStore, type SavedNeuroCase } from '../stores/historyStore'
import { useCaseStore } from '../stores/caseStore'
import { Card } from '../components/UI/Card'
import { isMgcsComplete, mgcsTotal } from '../data/glasgowMgcs'
import { CasePreviewModal } from '../components/History/CasePreviewModal'
import { NEURO_AXIS_LABELS_PT } from '../data/axisLabelsPt'
import { buildAlteredExamSections } from '../lib/exam/examDefaults'

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

export function NeuroHistoryPage() {
  const navigate = useNavigate()
  const entries = useHistoryStore((s) => s.entries)
  const removeEntry = useHistoryStore((s) => s.removeEntry)
  const addEntry = useHistoryStore((s) => s.addEntry)

  const setPatient = useCaseStore((s) => s.setPatient)
  const setComplaint = useCaseStore((s) => s.setComplaint)
  const setNeuroExam = useCaseStore((s) => s.setNeuroExam)
  const setAnalysis = useCaseStore((s) => s.setAnalysis)
  const setMgcs = useCaseStore((s) => s.setMgcs)
  const setCurrentStep = useCaseStore((s) => s.setCurrentStep)
  const resetCase = useCaseStore((s) => s.resetCase)

  const [searchTerm, setSearchTerm] = useState('')
  const [speciesFilter, setSpeciesFilter] = useState<'all' | 'dog' | 'cat' | 'analysis' | 'mgcs'>('all')
  const [previewCase, setPreviewCase] = useState<SavedNeuroCase | null>(null)
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null)

  const loadCase = (e: SavedNeuroCase) => {
    resetCase()
    setPatient(e.patient)
    setComplaint(e.complaint)
    setNeuroExam(e.neuroExam as Record<string, unknown>)
    setAnalysis((e.analysis as Parameters<typeof setAnalysis>[0]) ?? null)
    setMgcs(e.mgcs ?? null)
    setCurrentStep(Math.min(Math.max(e.currentStep, 1), 5))
    navigate('/neurologia/exame')
  }

  const handleDuplicate = (e: SavedNeuroCase) => {
    const newLabel = `${e.label || (e.patient.species === 'cat' ? 'Gato' : 'Cão')} (Cópia)`
    addEntry({
      ...e,
      label: newLabel,
      savedAt: new Date().toISOString(),
    })
  }

  const handleStartNewExam = () => {
    resetCase()
    setCurrentStep(1)
    navigate('/neurologia/exame')
  }

  // Filtragem e Busca
  const filteredEntries = useMemo(() => {
    return entries.filter((e) => {
      // Filtro de Categoria
      if (speciesFilter === 'dog' && e.patient.species !== 'dog') return false
      if (speciesFilter === 'cat' && e.patient.species !== 'cat') return false
      if (speciesFilter === 'analysis' && !e.analysis) return false
      if (speciesFilter === 'mgcs' && !e.mgcs) return false

      // Filtro de Busca
      if (!searchTerm.trim()) return true
      const term = searchTerm.toLowerCase().trim()
      const labelMatch = (e.label || '').toLowerCase().includes(term)
      const speciesMatch = (e.patient.species === 'cat' ? 'gato felino' : 'cão canino cachorro').includes(term)
      const dateMatch = formatDate(e.savedAt).toLowerCase().includes(term)
      const chiefComplaintMatch = (e.complaint.chiefComplaintIds || []).some((c) => c.toLowerCase().includes(term))

      return labelMatch || speciesMatch || dateMatch || chiefComplaintMatch
    })
  }, [entries, speciesFilter, searchTerm])

  return (
    <div className="relative z-10 w-full space-y-6 pb-24">
      {/* Header do Histórico */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Histórico Clínico Local
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Exames salvos localmente neste navegador para consulta, acompanhamento evolutivo e retomada imediata.
          </p>
        </div>

        <motion.button
          type="button"
          onClick={handleStartNewExam}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-gold to-amber-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-md hover:brightness-105 transition"
        >
          <PlusCircle className="h-4 w-4" />
          Novo Exame
        </motion.button>
      </div>

      {/* Barra de Filtros & Busca */}
      <Card className="p-4 space-y-3.5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por identificação, espécie, queixa ou data..."
            className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-xs sm:text-sm text-foreground outline-none focus:ring-2 focus:ring-gold/50"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-semibold text-muted-foreground mr-1 flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" />
            Filtros:
          </span>
          {[
            { id: 'all', label: `Todos (${entries.length})` },
            { id: 'dog', label: 'Cães' },
            { id: 'cat', label: 'Gatos' },
            { id: 'analysis', label: 'Com Relatório' },
            { id: 'mgcs', label: 'Com Glasgow' },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSpeciesFilter(f.id as typeof speciesFilter)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                speciesFilter === f.id
                  ? 'bg-gold text-slate-950 shadow-sm'
                  : 'bg-muted/60 border border-border text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Lista de Casos Salvos */}
      {filteredEntries.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground">
            <FilePlus className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">
              {entries.length === 0 ? 'Nenhum exame neurológico salvo' : 'Nenhum caso encontrado com os filtros atuais'}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              {entries.length === 0
                ? 'Durante a revisão ou análise de qualquer caso, utilize o botão "Salvar no histórico local" para arquivar os dados.'
                : 'Tente limpar a busca ou selecionar outro filtro para localizar o caso desejado.'}
            </p>
          </div>
          {entries.length === 0 ? (
            <button
              type="button"
              onClick={handleStartNewExam}
              className="inline-flex items-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-bold text-gold hover:bg-gold/20 transition"
            >
              Iniciar primeiro exame
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('')
                setSpeciesFilter('all')
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition"
            >
              Limpar filtros
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredEntries.map((e) => {
              const p = e.patient
              const alteredCount = buildAlteredExamSections(e.neuroExam as Record<string, unknown>).length
              const hasMgcs = isMgcsComplete(e.mgcs) && mgcsTotal(e.mgcs) != null
              const mgcsPts = hasMgcs ? mgcsTotal(e.mgcs) : null
              const analysisObj = e.analysis?.report as { neuroLocalization?: { primary?: string } } | undefined

              return (
                <motion.div
                  key={e.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm transition-all duration-200 hover:border-gold/45 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-gold shadow-sm group-hover:scale-105 transition-transform">
                        {p.species === 'cat' ? <Cat className="h-6 w-6" /> : <Dog className="h-6 w-6" />}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-foreground truncate">
                          {e.label || (p.species === 'cat' ? 'Paciente Felino' : 'Paciente Canino')}
                        </h3>
                        <p className="mt-0.5 text-xs text-muted-foreground flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(e.savedAt)}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-xl border border-border bg-muted/60 px-2.5 py-1 text-[11px] font-bold text-foreground shrink-0">
                      Etapa {e.currentStep}/5
                    </span>
                  </div>

                  {/* Informações Rápidas e Badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="rounded-lg border border-border bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                      {p.species === 'cat' ? 'Gato' : 'Cão'} {p.ageYears ? `· ${p.ageYears}a` : ''} {p.ageMonths ? `${p.ageMonths}m` : ''}
                    </span>

                    {mgcsPts != null && (
                      <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-bold text-amber-700 dark:text-amber-300">
                        MGCS {mgcsPts}/18
                      </span>
                    )}

                    {analysisObj?.neuroLocalization?.primary && (
                      <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                        {NEURO_AXIS_LABELS_PT[analysisObj.neuroLocalization.primary as keyof typeof NEURO_AXIS_LABELS_PT] || analysisObj.neuroLocalization.primary}
                      </span>
                    )}

                    {alteredCount > 0 && (
                      <span className="rounded-lg border border-gold/30 bg-gold/10 px-2.5 py-1 text-[11px] font-bold text-gold">
                        {alteredCount} alteraç{alteredCount > 1 ? 'ões' : 'ão'} no exame
                      </span>
                    )}
                  </div>

                  {/* Botões de Ação com Microinterações */}
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4 gap-2">
                    <div className="flex items-center gap-1.5">
                      <motion.button
                        type="button"
                        onClick={() => setPreviewCase(e)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted/50 px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted transition"
                        title="Pré-visualizar dados do caso"
                      >
                        <Eye className="h-3.5 w-3.5 text-gold" />
                        <span className="hidden sm:inline">Visualizar</span>
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={() => handleDuplicate(e)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted/50 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition"
                        title="Duplicar este caso"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Duplicar</span>
                      </motion.button>
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.button
                        type="button"
                        onClick={() => setDeleteCandidateId(e.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-xl border border-red-500/20 bg-red-500/10 p-2 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition"
                        title="Excluir do histórico"
                        aria-label="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={() => loadCase(e)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-gold to-amber-500 px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 shadow-sm hover:brightness-105 transition"
                      >
                        <FolderOpen className="h-4 w-4" />
                        Abrir
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Modal de Pré-Visualização */}
      <AnimatePresence>
        {previewCase && (
          <CasePreviewModal
            caseItem={previewCase}
            onClose={() => setPreviewCase(null)}
            onOpenCase={loadCase}
          />
        )}
      </AnimatePresence>

      {/* Diálogo de Confirmação de Exclusão */}
      <AnimatePresence>
        {deleteCandidateId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-4 text-center text-foreground"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/15 text-red-600 dark:text-red-400">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-base font-bold">Excluir exame salvo?</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Esta ação não pode ser desfeita. Os dados deste exame serão removidos do armazenamento deste navegador.
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteCandidateId(null)}
                  className="flex-1 rounded-xl border border-border bg-muted/60 py-2.5 text-xs font-semibold text-foreground hover:bg-muted"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (deleteCandidateId) removeEntry(deleteCandidateId)
                    setDeleteCandidateId(null)
                  }}
                  className="flex-1 rounded-xl bg-red-600 py-2.5 text-xs font-bold text-white hover:bg-red-700 transition"
                >
                  Excluir
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
