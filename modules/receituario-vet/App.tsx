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

const PRIMARY_LINKS = [
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
] as const

const TOOL_LINKS = [
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
] as const

export default function ReceituarioVetPage() {
  const navigate = useNavigate()
  const [history, setHistory] = useState(loadRecentHistory)
  const [drafts] = useState(loadRecentDrafts)
  const homeIcon = useMemo(() => readHomeIconSelection(), [])

  const [rxTheme, setRxTheme] = useState<'dark' | 'light'>(() => {
    try {
      return localStorage.getItem('receituario-vet:theme:v1') === 'light' ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
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
          <button
            type="button"
            className="rxv-btn-secondary inline-flex items-center gap-2 px-4 py-2 text-sm"
            onClick={() => navigate('/receituario-vet/protocolos-3')}
          >
            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            Protocolos
          </button>
          <button
            type="button"
            className="rxv-btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm"
            onClick={() => navigate('/receituario-vet/nova-receita-2')}
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Nova Receita
          </button>
          <button
            type="button"
            className="rxv-btn-secondary inline-flex items-center gap-2 px-4 py-2 text-sm"
            onClick={() => navigate('/receituario-vet/rascunhos')}
          >
            <span className="material-symbols-outlined text-[18px]">draft</span>
            Rascunhos
          </button>
        </>
      }
    >
      <div className="rxv-home-shell relative pb-10 text-[color:var(--rxv-text)]">
        <div className="relative z-10 mb-6 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-3 py-1.5 text-xs font-medium text-[color:var(--rxv-muted)]">
            <span className="material-symbols-outlined text-[15px] text-[color:var(--rxv-primary)]">calendar_today</span>
            {todayLabel()}
          </div>
        </div>

        <Link
          to="/receituario-vet/nova-receita-2"
          className="rxv-hub-hero group relative z-10 mb-8 flex w-full overflow-hidden rounded-2xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface)]/90"
          title="Abrir Nova Receita"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: isDark
                ? 'linear-gradient(118deg, #0a1524 0%, #070f18 55%, #050a12 100%)'
                : 'linear-gradient(118deg, #f8fafc 0%, #f1f5f9 55%, #e8eef7 100%)',
            }}
          />
          <div className="rxv-hub-hero-wash pointer-events-none absolute inset-0" aria-hidden />

          <div className="relative z-10 flex w-full flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="min-w-0 flex-1">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--rxv-primary)]/35 bg-[color:var(--rxv-primary)]/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[color:var(--rxv-primary)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--rxv-primary)]" />
                Ação rápida
              </span>
              <h2 className="text-2xl font-black leading-tight tracking-tight text-[color:var(--rxv-text)] sm:text-3xl">
                Criar Nova Receita
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[color:var(--rxv-muted)]">
                Prescreva com posologia automática, calcule doses por peso, detecte interações e exporte PDF com texto selecionável — tudo em menos de 2 minutos.
              </p>
              <span className="rxv-hub-hero-cta mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[color:var(--rxv-primary)] px-5 py-2.5 text-sm font-black text-[color:var(--rxv-on-primary)] transition duration-200 group-hover:brightness-105">
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Começar Prescrição
              </span>
            </div>
            <div className="hidden flex-shrink-0 sm:flex">
              <img
                src={homeIcon.src}
                alt={homeIcon.name}
                className="rxv-hub-hero-icon h-32 w-32 object-contain transition-transform duration-300 group-hover:scale-[1.04] sm:h-36 sm:w-36"
              />
            </div>
          </div>
        </Link>

        <section className="relative z-10 mb-8" aria-labelledby="hub-primary-heading">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <p id="hub-primary-heading" className="rxv-hub-section-label">
                Atalhos principais
              </p>
              <p className="mt-1 text-sm text-[color:var(--rxv-muted)]">Acesso direto às áreas mais usadas</p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {PRIMARY_LINKS.map(({ to, icon, label, desc, delay, premium, accent }) => (
              <Link
                key={to}
                to={to}
                title={`${label}\n\n${desc}`}
                className={`rxv-hub-tile rxv-card gap-3 p-5${premium ? ' rxv-premium' : ''}${accent ? ' rxv-hub-tile-accent' : ''}`}
                style={{ animationDelay: `${delay}ms` }}
              >
                <div className="rxv-home-icon-badge mb-0 self-start">
                  <span className="material-symbols-outlined text-[22px]">{icon}</span>
                </div>
                <h3 className="text-sm font-bold leading-snug text-[color:var(--rxv-text)]">{label}</h3>
                <p className="rxv-hub-tile-desc text-xs leading-relaxed text-[color:var(--rxv-muted)]">{desc}</p>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--rxv-primary)]/90">
                  Abrir
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative z-10 mb-6" aria-labelledby="hub-tools-heading">
          <div className="mb-4">
            <p id="hub-tools-heading" className="rxv-hub-section-label">
              Ferramentas e configurações
            </p>
            <p className="mt-1 text-sm text-[color:var(--rxv-muted)]">Histórico, perfil, backup e mais</p>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {TOOL_LINKS.map(({ to, icon, label, desc, delay, amber }) => (
              <Link
                key={to}
                to={to}
                title={`${label}\n\n${desc}`}
                className="rxv-hub-tile rxv-card gap-2.5 p-4"
                style={{ animationDelay: `${delay}ms` }}
              >
                <div className={`rxv-home-icon-badge mb-0 h-10 w-10 self-start [&_.material-symbols-outlined]:text-[19px]${amber ? ' border-amber-400/45 bg-amber-400/12 text-amber-500' : ''}`}>
                  <span className="material-symbols-outlined">{icon}</span>
                </div>
                <h3 className="text-xs font-bold leading-tight text-[color:var(--rxv-text)]">{label}</h3>
                <p className="rxv-hub-tile-desc min-h-[5.5rem] text-[11px] leading-relaxed text-[color:var(--rxv-muted)]">{desc}</p>
                <span className="mt-auto text-[10px] font-semibold uppercase tracking-wider text-[color:var(--rxv-primary)]/85">Abrir</span>
              </Link>
            ))}
          </div>
        </section>

        <footer className="relative z-10 border-t border-[color:var(--rxv-border)]/50 pt-6 text-center text-xs text-[color:var(--rxv-muted)]">
          VETIUS © 2026 — ReceituárioVET
        </footer>
      </div>
    </ReceituarioChrome>
  )
}
