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
    summary:
      'Cadastro de tutores e pacientes, busca por nome ou espécie e reaplicação rápida de prescrições anteriores.',
    desc: 'Cadastre tutores com múltiplos animais vinculados. Busque por nome, espécie ou histórico. Acesse receitas anteriores e repita prescrições com um clique. Ex.: "Amoxicilina 10 mg/kg para Rex, 7 dias, 2× ao dia" — reaplicada em segundos.',
    delay: 80,
    premium: false,
    accent: false,
  },
  {
    to: '/receituario-vet/protocolos-3',
    icon: 'clinical_notes',
    label: 'Protocolos Clínicos',
    summary: 'Monte protocolos por especialidade e insira vários medicamentos na receita de uma vez, com posologia por item.',
    desc: 'Monte protocolos por especialidade (ortopedia, dermatologia, oncologia…) e aplique com um clique em qualquer receita. Ex.: "Protocolo pós-cirúrgico: Tramadol + Dipirona + Omeprazol" inserido automaticamente, com posologia individual para cada fármaco.',
    delay: 140,
    premium: true,
    accent: false,
  },
  {
    to: '/receituario-vet/catalogo3',
    icon: 'vaccines',
    label: 'Cadastrar Medicamento',
    summary: 'Catálogo da clínica com concentração, vias, apresentações e marcação de medicamentos controlados.',
    desc: 'Banco de fármacos com concentração, via de administração, apresentação e alertas de controlado. Ex.: cadastre "Tramadol 50 mg/mL — uso restrito — SC/IM" e ele aparece em todas as receitas com badge laranja de controle especial.',
    delay: 200,
    premium: false,
    accent: false,
  },
  {
    to: '/receituario-vet/manipulados',
    icon: 'science',
    label: 'Manipulados V1',
    summary: 'Fórmulas magistrais com cálculo por peso, m² ou dose fixa e texto orientado à manipulação.',
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
    summary: 'Liste receitas por paciente, data ou fármaco; reabra para editar ou gerar PDF.',
    desc: 'Consulte todas as receitas emitidas por paciente, data ou medicamento. Reabra qualquer receita para editar ou reimprimir.',
    delay: 320,
  },
  {
    to: '/receituario-vet/configuração',
    icon: 'settings_account_box',
    label: 'Config. Médico',
    summary: 'CRMV, especialidade, assinatura e dados que entram no cabeçalho de toda receita.',
    desc: 'Configure seu CRMV, especialidade, assinatura e logotipo. Esses dados preenchem automaticamente o cabeçalho de toda receita.',
    delay: 360,
  },
  {
    to: '/receituario-vet/controle-especial',
    icon: 'gpp_maybe',
    label: 'Ctrl. Especial',
    summary: 'Receituário de controle especial com rastreio e conformidade à Portaria 344.',
    desc: 'Receituários azul e amarelo com rastreabilidade por lote, numeração sequencial e conformidade com a Portaria 344.',
    delay: 400,
    amber: true,
  },
  {
    to: '/receituario-vet/templates',
    icon: 'palette',
    label: 'Templates',
    summary: 'Layouts de receita com logo e zonas personalizadas; aplique em qualquer prescrição.',
    desc: 'Crie modelos visuais de receita com logo, cores e zonas customizadas. Salve e aplique com um clique em qualquer prescrição.',
    delay: 440,
  },
  {
    to: '/receituario-vet/configurações',
    icon: 'cloud_upload',
    label: 'Dados e Backup',
    summary: 'Exportação e importação dos dados locais em JSON para backup ou troca de equipamento.',
    desc: 'Exporte ou importe todo o banco local (pacientes, protocolos, histórico) em JSON. Ideal para troca de dispositivo ou backup preventivo.',
    delay: 480,
  },
  {
    to: '/receituario-vet/rascunhos',
    icon: 'draft',
    label: 'Rascunhos',
    summary: 'Receitas em andamento salvas neste navegador; retome sem perder o que já preencheu.',
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
      title="Início"
      subtitle="Receituário veterinário — prescrever, catalogar e acompanhar em um fluxo só."
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
      <div className="rxv-home-shell relative pb-6 text-[color:var(--rxv-text)] sm:pb-8">
        <div className="relative z-10 mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:color-mix(in_srgb,var(--rxv-border)_88%,var(--rxv-primary)_12%)] bg-[color:color-mix(in_srgb,var(--rxv-surface-2)_92%,transparent)] px-4 py-2 text-[13px] text-[color:var(--rxv-muted)]">
            <span className="material-symbols-outlined text-[18px] text-[color:var(--rxv-primary)]">calendar_today</span>
            <span className="font-medium text-[color:var(--rxv-text)]">{todayLabel()}</span>
          </div>
        </div>

        <Link
          to="/receituario-vet/nova-receita-2"
          className="rxv-hub-hero rxv-hub-hero--featured group relative z-10 mb-5 flex w-full overflow-hidden rounded-[22px] border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface)] shadow-[0_4px_40px_-12px_rgba(0,0,0,0.45)]"
          title="Abrir Nova Receita"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: isDark
                ? 'linear-gradient(125deg, #0c1828 0%, #081018 48%, #050a12 100%)'
                : 'linear-gradient(125deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
            }}
          />
          <div className="rxv-hub-hero-wash pointer-events-none absolute inset-0 opacity-90" aria-hidden />

          <div className="relative z-10 flex w-full flex-col gap-8 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-9 lg:p-10">
            <div className="min-w-0 flex-1">
              <span className="rxv-hub-eyebrow mb-4 inline-flex items-center gap-2 text-[color:var(--rxv-primary)]">
                <span className="h-px w-6 bg-[color:color-mix(in_srgb,var(--rxv-primary)_55%,transparent)]" aria-hidden />
                Nova prescrição
              </span>
              <h2 className="text-[1.65rem] font-semibold leading-[1.15] tracking-tight text-[color:var(--rxv-text)] sm:text-3xl lg:text-[2rem]">
                Criar nova receita
              </h2>
              <p className="mt-3 max-w-[34rem] text-[15px] leading-relaxed text-[color:var(--rxv-muted)] sm:text-base">
                Posologia estruturada, dose por peso, catálogo da clínica e PDF com texto selecionável — num fluxo único.
              </p>
              <span className="rxv-hub-hero-cta mt-7 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[color:var(--rxv-primary)] px-6 py-3 text-sm font-semibold text-[color:var(--rxv-on-primary)] shadow-[0_8px_28px_-6px_color-mix(in_srgb,var(--rxv-primary)_50%,transparent)] transition duration-200 group-hover:brightness-[1.06]">
                <span className="material-symbols-outlined text-[20px]">edit_document</span>
                Abrir editor de receita
                <span className="material-symbols-outlined text-[18px] opacity-90 transition group-hover:translate-x-0.5" aria-hidden>
                  arrow_forward
                </span>
              </span>
            </div>
            <div className="hidden flex-shrink-0 sm:flex">
              <img
                src={homeIcon.src}
                alt={homeIcon.name}
                className="rxv-hub-hero-icon h-28 w-28 object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-32 sm:w-32 lg:h-36 lg:w-36"
              />
            </div>
          </div>
        </Link>

        <section className="relative z-10 mb-10" aria-labelledby="hub-primary-heading">
          <header className="mb-4 max-w-4xl">
            <h2 id="hub-primary-heading" className="rxv-hub-section-title">
              Fluxo clínico
            </h2>
            <p className="mt-1 text-sm leading-snug text-[color:var(--rxv-muted)] lg:whitespace-nowrap">
              Cadastros mestres e protocolos — mesma base, leitura mais direta.
            </p>
          </header>
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {PRIMARY_LINKS.map(({ to, icon, label, summary, desc, delay, premium, accent }) => (
              <Link
                key={to}
                to={to}
                title={`${label}\n\n${desc}`}
                className={`rxv-hub-tile rxv-hub-tile--primary rxv-card gap-4 p-6${premium ? ' rxv-premium' : ''}${accent ? ' rxv-hub-tile-accent' : ''}`}
                style={{ animationDelay: `${delay}ms` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="rxv-home-icon-badge mb-0 shrink-0">
                    <span className="material-symbols-outlined text-[22px]">{icon}</span>
                  </div>
                  {premium ? (
                    <span className="shrink-0 rounded-md border border-[color:color-mix(in_srgb,var(--rxv-primary)_35%,transparent)] bg-[color:color-mix(in_srgb,var(--rxv-primary)_8%,transparent)] px-2 py-0.5 text-[10px] font-medium text-[color:var(--rxv-primary)]">
                      Avançado
                    </span>
                  ) : null}
                </div>
                <h3 className="text-[15px] font-semibold leading-snug text-[color:var(--rxv-text)]">{label}</h3>
                <p className="rxv-hub-tile-summary text-[13px] leading-relaxed text-[color:var(--rxv-muted)]">{summary}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-[color:var(--rxv-primary)]">
                  Entrar
                  <span className="material-symbols-outlined text-[16px] transition group-hover:translate-x-0.5" aria-hidden>
                    chevron_right
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative z-10 mb-8" aria-labelledby="hub-tools-heading">
          <header className="mb-6 max-w-2xl">
            <h2 id="hub-tools-heading" className="rxv-hub-section-title">
              Operação e conta
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--rxv-muted)]">
              Histórico, documentos especiais, modelo visual e backup — atalhos para o dia a dia.
            </p>
          </header>
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {TOOL_LINKS.map(({ to, icon, label, summary, desc, delay, amber }) => (
              <Link
                key={to}
                to={to}
                title={`${label}\n\n${desc}`}
                className="rxv-hub-tile rxv-hub-tile--tool rxv-card gap-3 p-4"
                style={{ animationDelay: `${delay}ms` }}
              >
                <div
                  className={`rxv-home-icon-badge rxv-home-icon-badge--sm mb-0 h-10 w-10 shrink-0 self-start [&_.material-symbols-outlined]:text-[20px]${amber ? ' !border-amber-400/40 !bg-amber-400/10 !text-amber-500' : ''}`}
                >
                  <span className="material-symbols-outlined">{icon}</span>
                </div>
                <h3 className="text-[13px] font-semibold leading-snug text-[color:var(--rxv-text)]">{label}</h3>
                <p className="rxv-hub-tile-summary rxv-hub-tile-summary--tool text-[12px] leading-relaxed text-[color:var(--rxv-muted)]">
                  {summary}
                </p>
                <span className="mt-auto inline-flex items-center gap-0.5 text-xs font-medium text-[color:var(--rxv-primary)]">
                  Abrir
                  <span className="material-symbols-outlined text-[14px] opacity-80" aria-hidden>
                    north_east
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <footer className="relative z-10 mt-2 border-t border-[color:color-mix(in_srgb,var(--rxv-border)_70%,transparent)] pt-5 pb-1 text-center text-[13px] text-[color:var(--rxv-muted)]">
          VETIUS © 2026 — ReceituárioVET
        </footer>
      </div>
    </ReceituarioChrome>
  )
}
