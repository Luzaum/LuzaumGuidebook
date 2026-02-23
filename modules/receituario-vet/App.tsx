import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReceituarioChrome from './ReceituarioChrome'
import { loadRxDb, removeHistoryRecord, saveRxDb } from './rxDb'
import { listSavedRxDrafts } from './rxStorage'
import { readHomeIconSelection } from './rxAssets'

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

function todayLabel() {
  const now = new Date()
  return now.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' })
}

function loadRecentHistory() {
  const db = loadRxDb()
  return [...db.history]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8)
}

function loadRecentDrafts() {
  return listSavedRxDrafts().slice(0, 6)
}

export default function ReceituarioVetPage() {
  const navigate = useNavigate()
  const [history, setHistory] = useState(loadRecentHistory)
  const [drafts] = useState(loadRecentDrafts)
  const homeIcon = useMemo(() => readHomeIconSelection(), [])

  const removeHistoryEntry = (entryId: string) => {
    const confirmDelete = window.confirm('Deseja excluir este paciente do histórico de receitas?')
    if (!confirmDelete) return
    const nextDb = removeHistoryRecord(loadRxDb(), entryId)
    saveRxDb(nextDb)
    setHistory(loadRecentHistory())
  }

  return (
    <ReceituarioChrome
      section="home"
      title="Painel de Controle"
      subtitle="Gerencie receitas, pacientes e protocolos clínicos com agilidade e precisão."
      actions={
        <>
          <button type="button" className="rxv-btn-secondary inline-flex items-center gap-2 px-4 py-2 text-sm" onClick={() => navigate('/receituario-vet/protocolos')}>
            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            Protocolos
          </button>
          <button type="button" className="rxv-btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm" onClick={() => navigate('/receituario-vet/nova-receita')}>
            <span className="material-symbols-outlined text-[18px]">add</span>
            Nova Receita
          </button>
          <button type="button" className="rxv-btn-secondary inline-flex items-center gap-2 px-4 py-2 text-sm" onClick={() => navigate('/receituario-vet/rascunhos')}>
            <span className="material-symbols-outlined text-[18px]">draft</span>
            Rascunhos
          </button>
        </>
      }
    >
      <div className="rxv-home-shell text-[color:var(--rxv-text)]">
      <section className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-3 py-1 text-xs font-semibold text-[color:var(--rxv-muted)]">
          <span className="material-symbols-outlined text-[15px] text-[#61ec4b]">calendar_today</span>
          {todayLabel()}
        </div>
      </section>

      <section className="rxv-home-grid-primary grid grid-cols-1 gap-3 p-1 lg:grid-cols-12">
          <Link
            to="/receituario-vet/nova-receita"
            className="rxv-home-primary-card rxv-card rxv-fade-up rxv-anim-pulse rxv-shimmer group relative overflow-hidden p-5 sm:p-6 lg:col-span-6 lg:row-span-2"
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,var(--rxv-primary-soft,#15351b)_0%,var(--rxv-primary-soft-2,#0f2416)_55%,var(--rxv-primary-soft-3,#0d1d13)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_95%_at_8%_8%,rgba(57,255,20,0.18),transparent_62%)]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[42%] bg-[radial-gradient(70%_80%_at_55%_45%,rgba(57,255,20,0.1),transparent_74%)]" />

            <div className="relative z-10 flex h-full min-h-[180px] flex-col justify-between gap-5 md:flex-row md:items-center">
              <div className="max-w-[560px]">
                <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rxv-primary)]/45 bg-[color:var(--rxv-primary)]/14 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-[color:var(--rxv-primary)]">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--rxv-primary)]" />
                  Ação rápida
                </span>

                <h3 className="mt-3 text-2xl font-black tracking-tight text-[color:var(--rxv-text)] md:text-[42px]">CRIAR NOVA RECEITA</h3>
                <p className="mt-2 max-w-[540px] text-sm text-[color:var(--rxv-muted)] md:text-lg">
                  Prescrever medicamentos para um paciente com modelos inteligentes e verificação de interações.
                </p>

                <span className="mt-5 inline-flex items-center gap-2 rounded-[10px] bg-[color:var(--rxv-primary)] px-5 py-3 text-sm font-black text-[#0f1d12] transition-all duration-300 group-hover:brightness-105 group-hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]">
                  <span className="material-symbols-outlined text-[19px]">add_circle</span>
                  Começar Prescrição
                </span>
              </div>

              <div className="hidden h-full min-h-[190px] flex-1 items-center justify-end pr-1 md:flex">
                <img
                  src={homeIcon.src}
                  alt={homeIcon.name}
                  className="h-[152px] w-[152px] object-contain drop-shadow-[0_0_16px_rgba(57,255,20,0.34)] transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </Link>

          <Link to="/receituario-vet/clientes" className="rxv-home-link-card rxv-card rxv-fade-up delay-100 rxv-anim-pulse rxv-shimmer lg:col-span-3">
            <div className="rxv-home-icon-badge">
              <span className="material-symbols-outlined text-[22px]">group</span>
            </div>
            <h4 className="text-xl font-bold">Tutores e Pacientes</h4>
            <p className="mt-1 text-sm text-[color:var(--rxv-muted)]">Cadastro completo para receitas controladas, com vários animais por tutor.</p>
          </Link>

          <Link to="/receituario-vet/protocolos" className="rxv-home-link-card rxv-card rxv-fade-up delay-150 rxv-anim-pulse rxv-shimmer lg:col-span-3">
            <div className="rxv-home-icon-badge">
              <span className="material-symbols-outlined text-[22px]">inventory_2</span>
            </div>
            <h4 className="text-xl font-bold">Protocolos e Modelos</h4>
            <p className="mt-1 text-sm text-[color:var(--rxv-muted)]">Monte tratamentos prontos por especialidade e importe direto na receita.</p>
          </Link>

          <Link to="/receituario-vet/catalogo" className="rxv-home-link-card rxv-card rxv-fade-up delay-200 rxv-anim-pulse rxv-shimmer lg:col-span-6">
            <div className="rxv-home-icon-badge">
              <span className="material-symbols-outlined text-[22px]">vaccines</span>
            </div>
            <h4 className="text-xl font-bold">Cadastrar Medicamento</h4>
            <p className="mt-1 text-sm text-[color:var(--rxv-muted)]">Banco de fármacos persistente, editável e reutilizável.</p>
          </Link>
      </section>

      <section className="rxv-home-grid-secondary mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
        <Link to="/receituario-vet/configuração" className="rxv-home-link-card rxv-card rxv-fade-up delay-200 rxv-anim-pulse rxv-shimmer">
          <div className="rxv-home-icon-badge">
            <span className="material-symbols-outlined text-[22px]">settings_account_box</span>
          </div>
          <h4 className="text-base font-bold">Configurar Médico</h4>
        </Link>

        <Link to="/receituario-vet/controle-especial" className="rxv-home-link-card rxv-card rxv-fade-up delay-300 rxv-anim-pulse rxv-shimmer">
          <div className="rxv-home-icon-badge border-amber-400/45 bg-amber-400/12 text-amber-500">
            <span className="material-symbols-outlined text-[22px]">gpp_maybe</span>
          </div>
          <h4 className="text-base font-bold">Controle Especial</h4>
        </Link>

        <Link to="/receituario-vet/templates" className="rxv-home-link-card rxv-card rxv-fade-up delay-400 rxv-anim-pulse rxv-shimmer">
          <div className="rxv-home-icon-badge">
            <span className="material-symbols-outlined text-[22px]">palette</span>
          </div>
          <h4 className="text-base font-bold">Templates</h4>
        </Link>

        <Link to="/receituario-vet/configurações" className="rxv-home-link-card rxv-card rxv-fade-up delay-500 rxv-anim-pulse rxv-shimmer">
          <div className="rxv-home-icon-badge">
            <span className="material-symbols-outlined text-[22px]">cloud_upload</span>
          </div>
          <h4 className="text-base font-bold">Dados e Backup</h4>
        </Link>

        <Link to="/receituario-vet/rascunhos" className="rxv-home-link-card rxv-card rxv-fade-up delay-500 rxv-anim-pulse rxv-shimmer">
          <div className="rxv-home-icon-badge">
            <span className="material-symbols-outlined text-[22px]">draft</span>
          </div>
          <h4 className="text-base font-bold">Rascunhos</h4>
        </Link>
      </section>

      <section className="rxv-card rxv-anim-pulse rxv-fade-up delay-500 mt-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-[color:var(--rxv-border)] px-4 py-3">
          <h2 className="text-base font-bold">Rascunhos Salvos</h2>
          <Link to="/receituario-vet/rascunhos" className="text-sm font-semibold text-[#68df51]">
            Ver todos
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-[color:var(--rxv-border)] text-xs uppercase tracking-wide text-[color:var(--rxv-muted)]">
                <th className="px-4 py-3">Paciente</th>
                <th className="px-4 py-3">Tutor</th>
                <th className="px-4 py-3">Dia do rascunho</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {drafts.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-sm text-[color:var(--rxv-muted)]" colSpan={5}>
                    Nenhum rascunho salvo.
                  </td>
                </tr>
              ) : (
                drafts.map((entry) => (
                  <tr key={entry.id} className="border-b border-[color:var(--rxv-border)]/50 group transition-colors hover:bg-[color:var(--rxv-primary)]/5">
                    <td className="px-4 py-3 text-sm font-semibold">{entry.patientName || '-'}</td>
                    <td className="px-4 py-3 text-sm">{entry.tutorName || '-'}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(entry.savedAt)}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="rxv-status-badge rxv-status-draft">Pendente</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        className="group/btn rxv-btn-secondary inline-flex items-center gap-1 px-3 py-1.5 text-xs transition-colors hover:border-[#39ff14]/40 hover:bg-[#39ff14]/10 hover:text-white"
                        onClick={() => navigate(`/receituario-vet/nova-receita?draft=${encodeURIComponent(entry.id)}`)}
                      >
                        <span className="material-symbols-outlined text-[16px] transition-transform group-hover/btn:translate-x-1 group-hover/btn:text-[#39ff14]">open_in_new</span>
                        Continuar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rxv-card rxv-anim-pulse rxv-fade-up delay-500 mt-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-[color:var(--rxv-border)] px-4 py-3">
          <h2 className="text-base font-bold">Últimas Receitas</h2>
          <Link to="/receituario-vet/nova-receita" className="text-sm font-semibold text-[#68df51]">
            Ver editor
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-[color:var(--rxv-border)] text-xs uppercase tracking-wide text-[color:var(--rxv-muted)]">
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Paciente</th>
                <th className="px-4 py-3">Tutor</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-sm text-[color:var(--rxv-muted)]" colSpan={5}>
                    Nenhuma receita registrada ainda.
                  </td>
                </tr>
              ) : (
                history.map((entry) => (
                  <tr key={entry.id} className="border-b border-[color:var(--rxv-border)]/50 group transition-colors hover:bg-[color:var(--rxv-primary)]/5">
                    <td className="px-4 py-3 text-sm">{formatDate(entry.createdAt)}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{entry.patientName || '-'}</td>
                    <td className="px-4 py-3 text-sm">{entry.tutorName || '-'}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="rxv-status-badge rxv-status-issued">Emitida</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button type="button" className="group/btn rxv-btn-secondary inline-flex items-center gap-1 px-3 py-1.5 text-xs transition-colors hover:border-[#39ff14]/40 hover:bg-[#39ff14]/10 hover:text-white" onClick={() => navigate('/receituario-vet/nova-receita')}>
                          <span className="material-symbols-outlined text-[16px] transition-transform group-hover/btn:translate-x-1 group-hover/btn:text-[#39ff14]">open_in_new</span>
                          Abrir
                        </button>
                        <button
                          type="button"
                          className="group/btn inline-flex items-center gap-1 rounded-lg border border-red-700/60 bg-red-950/20 px-3 py-1.5 text-xs font-semibold text-red-300 transition-colors hover:bg-red-900/30 hover:text-red-100"
                          onClick={() => removeHistoryEntry(entry.id)}
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
      </div>
    </ReceituarioChrome>
  )
}



