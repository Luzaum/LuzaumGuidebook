import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, FolderOpen } from 'lucide-react'
import { useHistoryStore, type SavedNeuroCase } from '../../neurologia/stores/historyStore'
import { useCaseStore } from '../../neurologia/stores/caseStore'

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

export function NeuroMobileHistoryScreen() {
  const navigate = useNavigate()
  const entries = useHistoryStore((s) => s.entries)
  const removeEntry = useHistoryStore((s) => s.removeEntry)
  const setPatient = useCaseStore((s) => s.setPatient)
  const setComplaint = useCaseStore((s) => s.setComplaint)
  const setNeuroExam = useCaseStore((s) => s.setNeuroExam)
  const setCurrentStep = useCaseStore((s) => s.setCurrentStep)
  const resetCase = useCaseStore((s) => s.resetCase)

  const loadCase = (e: SavedNeuroCase) => {
    resetCase()
    setPatient(e.patient)
    setComplaint(e.complaint)
    setNeuroExam(e.neuroExam as Record<string, unknown>)
    setCurrentStep(Math.min(Math.max(e.currentStep, 1), 5))
    navigate('/neuro-mobile/exame')
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-foreground">Histórico Local</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Exames salvos localmente neste navegador.
        </p>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-xs text-muted-foreground bg-card/45">
          Nenhum exame salvo no histórico local. Comece um novo exame e salve-o na etapa de revisão ou análise.
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((e) => (
            <div
              key={e.id}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 nm-fade-in"
            >
              <div className="min-w-0">
                <div className="font-bold text-foreground text-sm">
                  {e.label || 'Exame sem nome'}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{formatDate(e.savedAt)}</div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-gold">
                    Etapa {e.currentStep}/5
                  </span>
                  <span className="inline-flex items-center rounded-full bg-slate-500/10 px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-border/40">
                    {e.patient.species === 'dog' ? 'Cão' : e.patient.species === 'cat' ? 'Gato' : 'Espécie ?'}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 w-full pt-1">
                <button
                  type="button"
                  onClick={() => loadCase(e)}
                  className="flex-1 nm-btn nm-btn-primary gap-1.5 text-xs py-2 h-10"
                >
                  <FolderOpen className="h-3.5 w-3.5" />
                  Abrir exame
                </button>
                <button
                  type="button"
                  onClick={() => removeEntry(e.id)}
                  aria-label="Excluir"
                  className="px-3 rounded-xl border border-red-500/30 text-red-400 bg-red-500/5 active:bg-red-500/15 transition-all flex items-center justify-center"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
