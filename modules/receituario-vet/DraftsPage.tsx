import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReceituarioChrome from './ReceituarioChrome'
import { MAX_SAVED_RX_DRAFTS, listSavedRxDrafts, removeSavedRxDraft } from './rxStorage'

function formatDate(value: string) {
  const dt = new Date(value)
  if (Number.isNaN(dt.getTime())) return '-'
  return dt.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function DraftsPage() {
  const navigate = useNavigate()
  const [drafts, setDrafts] = useState(() => listSavedRxDrafts())

  const refresh = () => setDrafts(listSavedRxDrafts())

  const openDraft = (draftId: string) => {
    navigate(`/receituario-vet/nova-receita?draft=${encodeURIComponent(draftId)}`)
  }

  const deleteDraft = (draftId: string) => {
    const confirmed = window.confirm('Deseja excluir este rascunho salvo?')
    if (!confirmed) return
    removeSavedRxDraft(draftId)
    refresh()
  }

  return (
    <ReceituarioChrome
      section="drafts"
      title="Rascunhos Salvos"
      subtitle={`Seus rascunhos ficam salvos nesta conta. Limite máximo: ${MAX_SAVED_RX_DRAFTS} rascunhos.`}
      actions={
        <>
          <button
            type="button"
            className="rxv-btn-secondary inline-flex items-center gap-2 px-4 py-2 text-sm"
            onClick={refresh}
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Atualizar
          </button>
          <button
            type="button"
            className="rxv-btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm"
            onClick={() => navigate('/receituario-vet/nova-receita')}
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Nova Receita
          </button>
        </>
      }
    >
      <section className="rxv-card overflow-hidden">
        <div className="border-b border-[color:var(--rxv-border)] px-4 py-3">
          <h2 className="text-base font-bold">Lista de Rascunhos</h2>
          <p className="text-xs text-[color:var(--rxv-muted)]">Ordem: paciente, tutor e dia do rascunho.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-[color:var(--rxv-border)] text-xs uppercase tracking-wide text-[color:var(--rxv-muted)]">
                <th className="px-4 py-3">Paciente</th>
                <th className="px-4 py-3">Tutor</th>
                <th className="px-4 py-3">Dia do rascunho</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {drafts.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-sm text-[color:var(--rxv-muted)]" colSpan={4}>
                    Nenhum rascunho salvo ainda.
                  </td>
                </tr>
              ) : (
                drafts.map((draft) => (
                  <tr key={draft.id} className="border-b border-[color:var(--rxv-border)]/50 hover:bg-[color:var(--rxv-primary)]/5">
                    <td className="px-4 py-3 text-sm font-semibold">{draft.patientName || '-'}</td>
                    <td className="px-4 py-3 text-sm">{draft.tutorName || '-'}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(draft.savedAt)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          className="rxv-btn-secondary inline-flex items-center gap-1 px-3 py-1.5 text-xs"
                          onClick={() => openDraft(draft.id)}
                        >
                          <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                          Continuar
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-lg border border-red-700/60 bg-red-950/20 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-900/30 hover:text-red-100"
                          onClick={() => deleteDraft(draft.id)}
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </ReceituarioChrome>
  )
}

