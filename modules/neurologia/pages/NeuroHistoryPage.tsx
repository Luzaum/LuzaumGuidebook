import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, FolderOpen } from 'lucide-react'
import { useHistoryStore, type SavedNeuroCase } from '../stores/historyStore'
import { useCaseStore } from '../stores/caseStore'
import { Button } from '../components/UI/Button'

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
    navigate('/neurologia/exame')
  }

  return (
    <div className="relative z-10 w-full space-y-6 pb-16">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Histórico local</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Registros salvos neste navegador. Para sincronizar na nuvem no futuro, use a integração com a
          clínica (Supabase) quando estiver disponível.
        </p>
      </div>

      {entries.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Nenhum exame salvo ainda. Use &quot;Salvar no histórico local&quot; na revisão ou na análise.
        </p>
      ) : (
        <ul className="space-y-3">
          {entries.map((e) => (
            <li
              key={e.id}
              className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card/80 p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-foreground">
                  {e.label || 'Exame sem nome'}
                </div>
                <div className="text-xs text-muted-foreground">{formatDate(e.savedAt)}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Etapa {e.currentStep} ·{' '}
                  {e.patient.species === 'dog' ? 'Cão' : e.patient.species === 'cat' ? 'Gato' : 'Espécie ?'}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button type="button" variant="primary" className="gap-1" onClick={() => loadCase(e)}>
                  <FolderOpen className="h-4 w-4" />
                  Abrir
                </Button>
                <Button type="button" variant="secondary" onClick={() => removeEntry(e.id)} aria-label="Excluir">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
