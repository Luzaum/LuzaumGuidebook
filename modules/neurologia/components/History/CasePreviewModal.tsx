import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  Dog,
  Cat,
  FileText,
  FolderOpen,
  MapPin,
  X,
  Stethoscope,
} from 'lucide-react'
import type { SavedNeuroCase } from '../../stores/historyStore'
import { CHIEF_COMPLAINT_LABELS, TEMPORAL_LABELS, EVOLUTION_LABELS } from '../../data/complaintDictionaries'
import { isMgcsComplete, mgcsTotal } from '../../data/glasgowMgcs'
import { buildAlteredExamSections } from '../../lib/exam/examDefaults'
import { NEURO_AXIS_LABELS_PT } from '../../data/axisLabelsPt'

interface CasePreviewModalProps {
  caseItem: SavedNeuroCase | null
  onClose: () => void
  onOpenCase: (caseItem: SavedNeuroCase) => void
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('pt-BR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

export function CasePreviewModal({ caseItem, onClose, onOpenCase }: CasePreviewModalProps) {
  if (!caseItem) return null

  const p = caseItem.patient
  const c = caseItem.complaint
  const alteredSections = buildAlteredExamSections(caseItem.neuroExam as Record<string, unknown>)
  const mgcsPoints = isMgcsComplete(caseItem.mgcs) && mgcsTotal(caseItem.mgcs) != null ? mgcsTotal(caseItem.mgcs) : null
  const analysisReport = caseItem.analysis?.report as { neuroLocalization?: { primary?: string; confidence?: number } } | undefined

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 16 }}
        className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl flex flex-col text-foreground"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-border p-5 sm:p-6 bg-gradient-to-r from-gold/15 via-muted/30 to-transparent">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/20 text-gold shadow-inner">
              {p.species === 'cat' ? <Cat className="h-6 w-6" /> : <Dog className="h-6 w-6" />}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                {caseItem.label || (p.species === 'cat' ? 'Paciente Felino' : 'Paciente Canino')}
              </h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                <Calendar className="h-3.5 w-3.5" />
                Salvo em {formatDate(caseItem.savedAt)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body with Scroll */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Quick Badges Row */}
          <div className="flex flex-wrap gap-2">
            <span className="rounded-xl border border-border bg-muted/60 px-3 py-1.5 text-xs font-semibold text-foreground">
              Espécie: {p.species === 'cat' ? 'Felino' : 'Canino'}
            </span>
            <span className="rounded-xl border border-border bg-muted/60 px-3 py-1.5 text-xs font-semibold text-foreground">
              Idade: {p.ageYears ? `${p.ageYears} ano(s)` : ''} {p.ageMonths ? `${p.ageMonths} m` : ''} {!p.ageYears && !p.ageMonths ? 'Não informada' : ''}
            </span>
            <span className="rounded-xl border border-border bg-muted/60 px-3 py-1.5 text-xs font-semibold text-foreground">
              Etapa: {caseItem.currentStep}/5
            </span>
            {mgcsPoints != null && (
              <span className="rounded-xl border border-amber-500/40 bg-amber-500/15 px-3 py-1.5 text-xs font-bold text-amber-700 dark:text-amber-300">
                MGCS: {mgcsPoints}/18
              </span>
            )}
            {analysisReport?.neuroLocalization?.primary && (
              <span className="rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                {NEURO_AXIS_LABELS_PT[analysisReport.neuroLocalization.primary as keyof typeof NEURO_AXIS_LABELS_PT] || analysisReport.neuroLocalization.primary}
              </span>
            )}
          </div>

          {/* Queixa e Padrão Temporal */}
          <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Queixas e Evolução
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div>
                <p className="text-muted-foreground font-medium">Queixas principais:</p>
                {c.chiefComplaintIds && c.chiefComplaintIds.length > 0 ? (
                  <ul className="mt-1 list-disc list-inside space-y-0.5 font-semibold text-foreground">
                    {c.chiefComplaintIds.map((id) => (
                      <li key={id}>{CHIEF_COMPLAINT_LABELS[id] || id}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-muted-foreground italic">Nenhuma queixa selecionada</p>
                )}
              </div>
              <div className="space-y-1.5">
                <p className="text-muted-foreground font-medium">Curso Temporal:</p>
                <p className="font-semibold text-foreground">
                  {c.temporalPattern ? TEMPORAL_LABELS[c.temporalPattern] : 'Não informado'}
                </p>
                <p className="text-muted-foreground font-medium pt-1">Progressão:</p>
                <p className="font-semibold text-foreground">
                  {c.evolutionPattern ? EVOLUTION_LABELS[c.evolutionPattern] : 'Não informada'}
                </p>
              </div>
            </div>
          </div>

          {/* Alterações no Exame Físico */}
          <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <Stethoscope className="h-3.5 w-3.5 text-gold" />
              Achados do Exame Neurológico
            </p>
            {alteredSections.length > 0 ? (
              <div className="space-y-2">
                {alteredSections.map((sec) => (
                  <div key={sec.title} className="rounded-xl border border-border bg-card p-3 text-xs">
                    <p className="font-bold text-gold uppercase tracking-wide">{sec.title}</p>
                    <ul className="mt-1 list-disc list-inside space-y-0.5 text-foreground/90">
                      {sec.items.map((it, idx) => (
                        <li key={idx}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                Nenhuma alteração registrada nas 6 seções do exame.
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border p-4 sm:p-5 bg-muted/30">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border bg-card px-4 py-2 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted transition"
          >
            Fechar
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenCase(caseItem)
              onClose()
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-amber-500 px-5 py-2 text-xs sm:text-sm font-bold text-slate-950 shadow-md hover:brightness-105 transition"
          >
            <FolderOpen className="h-4 w-4" />
            Abrir Caso Completo
          </button>
        </div>
      </motion.div>
    </div>
  )
}
