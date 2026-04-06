import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReceituarioChrome from './ReceituarioChrome'
import { loadRxDb, removeHistoryRecord, saveRxDb } from './rxDb'
import { listSavedRxDrafts } from './rxStorage'
import { readHomeIconSelection } from './rxAssets'

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
  void removeHistoryEntry
  void history
  void drafts

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
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hub-card {
          animation: fadeSlideUp 0.4s ease forwards;
          opacity: 0;
        }
        .hub-card:hover {
          transform: translateY(-2px);
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
        }
      `}</style>

      {/* wrapper relativo — grade de fundo posicionada absolutamente dentro do flow */}
      <div className="rxv-home-shell relative pb-12 text-[color:var(--rxv-text)]">

        {/* ── Date pill ────────────────────────────────────────────────── */}
        <div className="relative z-10 mb-6 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-3 py-1 text-xs font-semibold text-[color:var(--rxv-muted)]">
            <span className="material-symbols-outlined text-[15px] text-[#61ec4b]">calendar_today</span>
            {todayLabel()}
          </div>
        </div>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <Link
          to="/receituario-vet/nova-receita-2"
          className="hub-card relative z-10 group mb-5 flex w-full overflow-hidden rounded-2xl border border-[color:var(--rxv-border)] hover:border-[color:var(--rxv-primary)]/50 hover:shadow-[0_8px_32px_-8px_rgba(57,255,20,0.18)]"
          style={{ animationDelay: '0ms' }}
        >
          <div
            className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}
            style={{ background: 'linear-gradient(110deg, #0d1f10 0%, #0a160d 60%, #000 100%)' }}
          />
          <div
            className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-100'}`}
            style={{ background: 'linear-gradient(110deg, #f0fdf4 0%, #dcfce7 60%, #bbf7d0 100%)' }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_0%_50%,rgba(57,255,20,0.12),transparent_55%)]" />

          <div className="relative z-10 flex w-full flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--rxv-primary)]/40 bg-[color:var(--rxv-primary)]/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[color:var(--rxv-primary)]">
                <span className="h-2 w-2 rounded-full bg-[color:var(--rxv-primary)]" />
                Ação rápida
              </span>
              <h3 className="text-3xl font-black leading-tight tracking-tight text-[color:var(--rxv-text)]">
                Criar Nova Receita
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[color:var(--rxv-muted)]">
                Prescreva com posologia automática, calcule doses por peso, detecte interações e exporte PDF com texto selecionável — tudo em menos de 2 minutos.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[color:var(--rxv-primary)] px-6 py-3 text-sm font-black text-[#0f1d12] transition-all duration-200 group-hover:brightness-105 group-hover:shadow-[0_0_24px_rgba(57,255,20,0.35)]">
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Começar Prescrição
              </span>
            </div>
            <div className="hidden flex-shrink-0 sm:flex">
              <img
                src={homeIcon.src}
                alt={homeIcon.name}
                className="h-36 w-36 object-contain drop-shadow-[0_0_20px_rgba(57,255,20,0.28)] transition-transform duration-300 group-hover:scale-[1.05]"
              />
            </div>
          </div>
        </Link>

        {/* ── NAVEGAÇÃO PRIMÁRIA ────────────────────────────────────────── */}
        <div className="relative z-10 mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {([
            {
              to: '/receituario-vet/clientes',
              icon: 'group',
              label: 'Tutores e Pacientes',
              desc: 'Cadastre tutores com múltiplos animais vinculados. Busque por nome, espécie ou histórico. Acesse receitas anteriores e repita prescrições com um clique. Ex.: "Amoxicilina 10 mg/kg para Rex, 7 dias, 2× ao dia" — reaplicada em segundos.',
              delay: 80,
              premium: false,
              accent: false,
            },
            {
              to: '/receituario-vet/protocolos-3',
              icon: 'clinical_notes',
              label: 'Protocolos Clínicos',
              desc: 'Monte protocolos por especialidade (ortopedia, dermatologia, oncologia…) e aplique com um clique em qualquer receita. Ex.: "Protocolo pós-cirúrgico: Tramadol + Dipirona + Omeprazol" inserido automaticamente, com posologia individual para cada fármaco.',
              delay: 140,
              premium: true,
              accent: false,
            },
            {
              to: '/receituario-vet/catalogo3',
              icon: 'vaccines',
              label: 'Cadastrar Medicamento',
              desc: 'Banco de fármacos com concentração, via de administração, apresentação e alertas de controlado. Ex.: cadastre "Tramadol 50 mg/mL — uso restrito — SC/IM" e ele aparece em todas as receitas com badge laranja de controle especial.',
              delay: 200,
              premium: false,
              accent: false,
            },
            {
              to: '/receituario-vet/manipulados',
              icon: 'science',
              label: 'Manipulados V1',
              desc: 'Fórmulas magistrais com cálculo por kg, m² ou dose fixa. Instrução automática para farmácia incluída. Ex.: "Fenobarbital 2,5 mg/kg — cão 8 kg → 20 mg — xarope 2 mg/mL — QSP 100 mL — Tomar 5 mL/dose a cada 12h".',
              delay: 260,
              premium: true,
              accent: true,
            },
          ] as { to: string; icon: string; label: string; desc: string; delay: number; premium: boolean; accent: boolean }[]).map(({ to, icon, label, desc, delay, premium, accent }) => (
            <Link
              key={to}
              to={to}
              className={`hub-card rxv-card${premium ? ' rxv-premium' : ''} flex flex-col gap-3 p-5 hover:shadow-[0_8px_24px_-8px_rgba(57,255,20,0.15)]`}
              style={{ animationDelay: `${delay}ms` }}
            >
              <div className={`rxv-home-icon-badge self-start${accent ? ' border-[#39ff14]/45 bg-[#39ff14]/12 text-[#8af77a]' : ''}`}>
                <span className="material-symbols-outlined text-[22px]">{icon}</span>
              </div>
              <div>
                <h4 className="text-sm font-bold leading-snug text-[color:var(--rxv-text)]">{label}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[color:var(--rxv-muted)]">{desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* ── FERRAMENTAS ───────────────────────────────────────────────── */}
        <div className="relative z-10 mb-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {([
            {
              to: '/receituario-vet/historico',
              icon: 'history',
              label: 'Histórico',
              desc: 'Consulte todas as receitas emitidas por paciente, data ou medicamento. Reabra qualquer receita para editar ou reimprimir.',
              delay: 320,
            },
            {
              to: '/receituario-vet/configuração',
              icon: 'settings_account_box',
              label: 'Config. Médico',
              desc: 'Configure seu CRMV, especialidade, assinatura e logotipo. Esses dados preenchem automaticamente o cabeçalho de toda receita.',
              delay: 360,
            },
            {
              to: '/receituario-vet/controle-especial',
              icon: 'gpp_maybe',
              label: 'Ctrl. Especial',
              desc: 'Receituários azul e amarelo com rastreabilidade por lote, numeração sequencial e conformidade com a Portaria 344.',
              delay: 400,
              amber: true,
            },
            {
              to: '/receituario-vet/templates',
              icon: 'palette',
              label: 'Templates',
              desc: 'Crie modelos visuais de receita com logo, cores e zonas customizadas. Salve e aplique com um clique em qualquer prescrição.',
              delay: 440,
            },
            {
              to: '/receituario-vet/configurações',
              icon: 'cloud_upload',
              label: 'Dados e Backup',
              desc: 'Exporte ou importe todo o banco local (pacientes, protocolos, histórico) em JSON. Ideal para troca de dispositivo ou backup preventivo.',
              delay: 480,
            },
            {
              to: '/receituario-vet/rascunhos',
              icon: 'draft',
              label: 'Rascunhos',
              desc: 'Receitas iniciadas e não finalizadas ficam salvas localmente. Retome de onde parou sem perder nenhum dado preenchido.',
              delay: 520,
            },
          ] as { to: string; icon: string; label: string; desc: string; delay: number; amber?: boolean }[]).map(({ to, icon, label, desc, delay, amber }) => (
            <Link
              key={to}
              to={to}
              className="hub-card rxv-card flex flex-col gap-3 p-5 hover:shadow-[0_8px_24px_-8px_rgba(57,255,20,0.15)]"
              style={{ animationDelay: `${delay}ms` }}
            >
              <div className={`rxv-home-icon-badge self-start${amber ? ' border-amber-400/45 bg-amber-400/12 text-amber-500' : ''}`}>
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[color:var(--rxv-text)]">{label}</h4>
                <p className="mt-1 text-[11px] leading-relaxed text-[color:var(--rxv-muted)]">{desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <footer className="relative z-10 mt-4 text-center text-xs text-[color:var(--rxv-muted)]">
          VETIUS © 2026 — ReceituárioVET
        </footer>

      </div>
    </ReceituarioChrome>
  )
}
