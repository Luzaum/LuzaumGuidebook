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

  const [rxTheme, setRxTheme] = useState<'dark' | 'light'>(() => {
    try {
      return localStorage.getItem('receituario-vet:theme:v1') === 'light' ? 'light' : 'dark'
    } catch { return 'dark' }
  })
  const isDark = rxTheme === 'dark'

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
      forcedTheme={rxTheme}
      onThemeChange={setRxTheme}
      actions={
        <>
          <button type="button" className="rxv-btn-secondary inline-flex items-center gap-2 px-4 py-2 text-sm" onClick={() => navigate('/receituario-vet/protocolos-3')}>
            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            Protocolos
          </button>
          <button type="button" className="rxv-btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm" onClick={() => navigate('/receituario-vet/nova-receita-2')}>
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

        {/* ── ROW 1 · Date + stats ───────────────────────────────────────── */}
        <section className="mb-5 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-3 py-1 text-xs font-semibold text-[color:var(--rxv-muted)]">
            <span className="material-symbols-outlined text-[15px] text-[#61ec4b]">calendar_today</span>
            {todayLabel()}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-3 py-1 text-xs font-semibold text-[color:var(--rxv-muted)]">
              <span className="material-symbols-outlined text-[14px] text-[#61ec4b]">receipt_long</span>
              <span className="text-[color:var(--rxv-text)]">{history.length}</span>
              receitas recentes
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-3 py-1 text-xs font-semibold text-[color:var(--rxv-muted)]">
              <span className="material-symbols-outlined text-[14px] text-amber-400">draft</span>
              <span className="text-[color:var(--rxv-text)]">{drafts.length}</span>
              rascunhos
            </div>
          </div>
        </section>

        {/* ── ROW 2 · Hero + 2×2 quick-access ──────────────────────────── */}
        <section className="mb-4 grid grid-cols-1 gap-3 lg:grid-cols-12">

          {/* Hero CTA */}
          <Link
            to="/receituario-vet/nova-receita-2"
            className="rxv-home-primary-card rxv-card rxv-premium rxv-fade-up rxv-anim-pulse rxv-shimmer group relative overflow-hidden p-6 lg:col-span-8"
          >
            <div className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'linear-gradient(100deg, var(--rxv-primary-soft,#15351b) 0%, var(--rxv-primary-soft-2,#0f2416) 55%, var(--rxv-primary-soft-3,#0d1d13) 100%)' }} />
            <div className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-100'}`} style={{ background: 'linear-gradient(100deg, #f0fdf4 0%, #dcfce7 55%, #bbf7d0 100%)' }} />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_95%_at_8%_8%,rgba(57,255,20,0.18),transparent_62%)]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[42%] bg-[radial-gradient(70%_80%_at_55%_45%,rgba(57,255,20,0.1),transparent_74%)]" />

            <div className="relative z-10 flex h-full min-h-[200px] flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="max-w-[480px]">
                <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rxv-primary)]/45 bg-[color:var(--rxv-primary)]/14 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-[color:var(--rxv-primary)]">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--rxv-primary)]" />
                  Ação rápida
                </span>
                <h3 className="mt-3 text-[28px] font-black leading-tight tracking-tight text-[color:var(--rxv-text)] md:text-[40px]">CRIAR NOVA<br />RECEITA</h3>
                <p className="mt-2 text-sm text-[color:var(--rxv-muted)] md:text-base">
                  Prescrever medicamentos com modelos inteligentes e verificação de interações.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 rounded-[10px] bg-[color:var(--rxv-primary)] px-5 py-3 text-sm font-black text-[#0f1d12] transition-all duration-300 group-hover:brightness-105 group-hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]">
                  <span className="material-symbols-outlined text-[19px]">add_circle</span>
                  Começar Prescrição
                </span>
              </div>
              <div className="hidden flex-shrink-0 items-center justify-center sm:flex">
                <img
                  src={homeIcon.src}
                  alt={homeIcon.name}
                  className="h-[160px] w-[160px] object-contain drop-shadow-[0_0_16px_rgba(57,255,20,0.34)] transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>
            </div>
          </Link>

          {/* 2×2 Quick-access panel */}
          <div className="grid grid-cols-2 gap-3 lg:col-span-4">
            <Link to="/receituario-vet/clientes" className="rxv-home-link-card rxv-card rxv-fade-up delay-100 rxv-anim-pulse rxv-shimmer flex flex-col gap-2 p-4">
              <div className="rxv-home-icon-badge self-start">
                <span className="material-symbols-outlined text-[20px]">group</span>
              </div>
              <h4 className="text-sm font-bold leading-snug">Tutores e Pacientes</h4>
              <p className="text-[11px] text-[color:var(--rxv-muted)] leading-relaxed hidden xl:block">Cadastro completo com vários animais por tutor.</p>
            </Link>

            <Link to="/receituario-vet/protocolos-3" className="rxv-home-link-card rxv-card rxv-premium rxv-fade-up delay-150 rxv-anim-pulse rxv-shimmer flex flex-col gap-2 p-4">
              <div className="rxv-home-icon-badge self-start">
                <span className="material-symbols-outlined text-[20px]">inventory_2</span>
              </div>
              <h4 className="text-sm font-bold leading-snug">Protocolos</h4>
              <p className="text-[11px] text-[color:var(--rxv-muted)] leading-relaxed hidden xl:block">Tratamentos prontos por especialidade.</p>
            </Link>

            <Link to="/receituario-vet/catalogo3" className="rxv-home-link-card rxv-card rxv-fade-up delay-200 rxv-anim-pulse rxv-shimmer flex flex-col gap-2 p-4">
              <div className="rxv-home-icon-badge self-start">
                <span className="material-symbols-outlined text-[20px]">vaccines</span>
              </div>
              <h4 className="text-sm font-bold leading-snug">Cadastrar Medicamento</h4>
              <p className="text-[11px] text-[color:var(--rxv-muted)] leading-relaxed hidden xl:block">Banco de fármacos reutilizável.</p>
            </Link>

            <Link to="/receituario-vet/manipulados" className="rxv-home-link-card rxv-card rxv-premium rxv-fade-up delay-250 rxv-anim-pulse rxv-shimmer flex flex-col gap-2 p-4">
              <div className="rxv-home-icon-badge self-start border-[#39ff14]/45 bg-[#39ff14]/12 text-[#8af77a]">
                <span className="material-symbols-outlined text-[20px]">science</span>
              </div>
              <h4 className="text-sm font-bold leading-snug">Manipulados</h4>
              <p className="text-[11px] text-[color:var(--rxv-muted)] leading-relaxed hidden xl:block">Fórmulas magistrais e regimes próprios.</p>
            </Link>
          </div>
        </section>

        {/* ── ROW 3 · Ferramentas strip ─────────────────────────────────── */}
        <section className="mb-5 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {[
            { to: '/receituario-vet/historico', icon: 'history', label: 'Histórico' },
            { to: '/receituario-vet/configuração', icon: 'settings_account_box', label: 'Config. Médico' },
            { to: '/receituario-vet/controle-especial', icon: 'gpp_maybe', label: 'Ctrl. Especial', amber: true },
            { to: '/receituario-vet/templates', icon: 'palette', label: 'Templates' },
            { to: '/receituario-vet/configurações', icon: 'cloud_upload', label: 'Dados e Backup' },
            { to: '/receituario-vet/rascunhos', icon: 'draft', label: 'Rascunhos' },
          ].map(({ to, icon, label, amber }) => (
            <Link
              key={to}
              to={to}
              className="rxv-home-link-card rxv-card rxv-fade-up rxv-anim-pulse rxv-shimmer flex flex-col items-center gap-2 py-4 px-2 text-center"
            >
              <div className={`rxv-home-icon-badge${amber ? ' border-amber-400/45 bg-amber-400/12 text-amber-500' : ''}`}>
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
              </div>
              <h4 className="text-xs font-bold leading-tight">{label}</h4>
            </Link>
          ))}
        </section>

        {/* ── ROW 4 · Tables side by side ───────────────────────────────── */}
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">

          {/* Rascunhos Salvos */}
          <div className="rxv-card rxv-anim-pulse rxv-fade-up delay-500 overflow-hidden">
            <div className="flex items-center justify-between border-b border-[color:var(--rxv-border)] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-amber-400">draft</span>
                <h2 className="text-sm font-bold">Rascunhos Salvos</h2>
                {drafts.length > 0 && (
                  <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[11px] font-bold text-amber-400">{drafts.length}</span>
                )}
              </div>
              <Link to="/receituario-vet/rascunhos" className="text-xs font-semibold text-[#68df51] hover:underline">
                Ver todos
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[color:var(--rxv-border)] text-[10px] uppercase tracking-wide text-[color:var(--rxv-muted)]">
                    <th className="px-4 py-2.5">Paciente</th>
                    <th className="px-4 py-2.5">Tutor</th>
                    <th className="px-4 py-2.5 hidden sm:table-cell">Data</th>
                    <th className="px-4 py-2.5 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {drafts.length === 0 ? (
                    <tr>
                      <td className="px-4 py-6 text-sm text-[color:var(--rxv-muted)]" colSpan={4}>
                        Nenhum rascunho salvo.
                      </td>
                    </tr>
                  ) : (
                    drafts.map((entry) => (
                      <tr key={entry.id} className="border-b border-[color:var(--rxv-border)]/50 transition-colors hover:bg-[color:var(--rxv-primary)]/5">
                        <td className="px-4 py-2.5 text-sm font-semibold">{entry.patientName || '-'}</td>
                        <td className="px-4 py-2.5 text-sm text-[color:var(--rxv-muted)]">{entry.tutorName || '-'}</td>
                        <td className="px-4 py-2.5 text-xs text-[color:var(--rxv-muted)] hidden sm:table-cell">{formatDate(entry.savedAt)}</td>
                        <td className="px-4 py-2.5 text-right">
                          <button
                            type="button"
                            className="group/btn rxv-btn-secondary inline-flex items-center gap-1 px-3 py-1.5 text-xs transition-colors hover:border-[#39ff14]/40 hover:bg-[#39ff14]/10 hover:text-white"
                            onClick={() => navigate(`/receituario-vet/nova-receita-2?draft=${encodeURIComponent(entry.id)}`)}
                          >
                            <span className="material-symbols-outlined text-[14px] transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:text-[#39ff14]">open_in_new</span>
                            Continuar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Últimas Receitas */}
          <div className="rxv-card rxv-anim-pulse rxv-fade-up delay-500 overflow-hidden">
            <div className="flex items-center justify-between border-b border-[color:var(--rxv-border)] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#61ec4b]">receipt_long</span>
                <h2 className="text-sm font-bold">Últimas Receitas</h2>
                {history.length > 0 && (
                  <span className="rounded-full bg-[#39ff14]/12 px-2 py-0.5 text-[11px] font-bold text-[#61ec4b]">{history.length}</span>
                )}
              </div>
              <Link to="/receituario-vet/nova-receita-2" className="text-xs font-semibold text-[#68df51] hover:underline">
                Ver editor
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[color:var(--rxv-border)] text-[10px] uppercase tracking-wide text-[color:var(--rxv-muted)]">
                    <th className="px-4 py-2.5">Paciente</th>
                    <th className="px-4 py-2.5 hidden sm:table-cell">Tutor</th>
                    <th className="px-4 py-2.5 hidden md:table-cell">Data</th>
                    <th className="px-4 py-2.5">Status</th>
                    <th className="px-4 py-2.5 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length === 0 ? (
                    <tr>
                      <td className="px-4 py-6 text-sm text-[color:var(--rxv-muted)]" colSpan={5}>
                        Nenhuma receita registrada ainda.
                      </td>
                    </tr>
                  ) : (
                    history.map((entry) => (
                      <tr key={entry.id} className="border-b border-[color:var(--rxv-border)]/50 transition-colors hover:bg-[color:var(--rxv-primary)]/5">
                        <td className="px-4 py-2.5 text-sm font-semibold">{entry.patientName || '-'}</td>
                        <td className="px-4 py-2.5 text-sm text-[color:var(--rxv-muted)] hidden sm:table-cell">{entry.tutorName || '-'}</td>
                        <td className="px-4 py-2.5 text-xs text-[color:var(--rxv-muted)] hidden md:table-cell">{formatDate(entry.createdAt)}</td>
                        <td className="px-4 py-2.5 text-sm">
                          <span className="rxv-status-badge rxv-status-issued">Emitida</span>
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button type="button" className="group/btn rxv-btn-secondary inline-flex items-center gap-1 px-2.5 py-1.5 text-xs transition-colors hover:border-[#39ff14]/40 hover:bg-[#39ff14]/10 hover:text-white" onClick={() => navigate('/receituario-vet/nova-receita-2')}>
                              <span className="material-symbols-outlined text-[14px] transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:text-[#39ff14]">open_in_new</span>
                              Abrir
                            </button>
                            <button
                              type="button"
                              className={`group/btn inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors ${isDark ? 'border-red-700/60 bg-red-950/20 text-red-300 hover:bg-red-900/30 hover:text-red-100' : 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100'}`}
                              onClick={() => removeHistoryEntry(entry.id)}
                            >
                              <span className="material-symbols-outlined text-[14px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>
    </ReceituarioChrome>
  )
}
