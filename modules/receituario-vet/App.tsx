import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReceituarioChrome from './ReceituarioChrome'
import { loadRxDb, removeHistoryRecord, saveRxDb } from './rxDb'
import { listSavedRxDrafts } from './rxStorage'
import { readHomeIconSelection } from './rxAssets'
import { 
  Sparkles, 
  FileText, 
  ChevronRight, 
  Users, 
  Settings, 
  Trash2, 
  History, 
  ShieldAlert, 
  Palette, 
  HardDriveUpload, 
  FolderLock, 
  ArrowRight,
  ClipboardList,
  Pill,
  Syringe,
  Calendar,
  Layers,
  Wrench,
  BookOpen
} from 'lucide-react'

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
  return listSavedRxDrafts().slice(0, 3)
}

export default function ReceituarioVetPage() {
  const navigate = useNavigate()
  const [history, setHistory] = useState(loadRecentHistory)
  const [drafts, setDrafts] = useState(loadRecentDrafts)
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

  const primaryLinks = [
    {
      to: '/receituario-vet/clientes',
      icon: Users,
      color: 'blue',
      label: 'Tutores e Pacientes',
      summary: 'Cadastro unificado de tutores e animais com reaplicação rápida de receitas.',
      premium: false,
    },
    {
      to: '/receituario-vet/protocolos-3',
      icon: ClipboardList,
      color: 'violet',
      label: 'Protocolos Clínicos',
      summary: 'Monte protocolos por especialidade e insira múltiplos fármacos em segundos.',
      premium: true,
    },
    {
      to: '/receituario-vet/catalogo3',
      icon: Pill,
      color: 'emerald',
      label: 'Cadastrar Medicamento',
      summary: 'Catálogo avançado com regras de dose recomendada e controle especial.',
      premium: false,
    },
    {
      to: '/receituario-vet/manipulados',
      icon: Syringe,
      color: 'amber',
      label: 'Manipulados V1',
      summary: 'Fórmulas magistrais estruturadas com cálculo por peso ou m² corporal.',
      premium: true,
    },
  ]

  const toolLinks = [
    {
      to: '/receituario-vet/historico',
      icon: History,
      color: 'slate',
      label: 'Histórico',
      summary: 'Busca e reimpressão de PDFs anteriores.',
    },
    {
      to: '/receituario-vet/configuração',
      icon: Wrench,
      color: 'sky',
      label: 'Config. Médico',
      summary: 'Assinatura digital, CRMV e logotipos.',
    },
    {
      to: '/receituario-vet/controle-especial',
      icon: ShieldAlert,
      color: 'orange',
      label: 'Ctrl. Especial',
      summary: 'Receituário restrito Portaria 344 e MAPA.',
    },
    {
      to: '/receituario-vet/templates',
      icon: Palette,
      color: 'pink',
      label: 'Templates',
      summary: 'Modelos visuais e estilos A4/A5.',
    },
    {
      to: '/receituario-vet/configurações',
      icon: HardDriveUpload,
      color: 'teal',
      label: 'Dados e Backup',
      summary: 'Exportação e migração local em JSON.',
    },
    {
      to: '/receituario-vet/rascunhos',
      icon: FolderLock,
      color: 'rose',
      label: 'Rascunhos',
      summary: 'Projetos locais salvos no navegador.',
    },
  ]

  return (
    <ReceituarioChrome
      section="home"
      title="Início"
      subtitle="Prescrição digital de alto padrão — simplificada para rotinas veterinárias de alto fluxo."
      forcedTheme={rxTheme}
      onThemeChange={setRxTheme}
      actions={
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold"
            onClick={() => navigate('/receituario-vet/rascunhos')}
          >
            <FolderLock className="h-3.5 w-3.5 shrink-0" />
            Rascunhos
          </button>
          <button
            type="button"
            className="rxv-btn-primary inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold shadow-md shadow-primary/20"
            onClick={() => navigate('/receituario-vet/nova-receita-2')}
          >
            <FileText className="h-3.5 w-3.5 shrink-0" />
            Nova Receita
          </button>
        </div>
      }
    >
      <div className="mx-auto w-full max-w-[1560px] space-y-10 pb-10">
        
        {/* HERO SECTION REDESIGNED */}
        <section className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-[color:var(--rxv-surface)] via-[color:var(--rxv-surface)] to-primary/[0.04] shadow-lg shadow-primary/[0.06] ring-1 ring-primary/5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_0%_-30%,rgba(59,130,246,0.12),transparent_55%),radial-gradient(ellipse_70%_50%_at_100%_100%,rgba(6,182,212,0.06),transparent_50%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 top-1/2 h-72 w-72 -translate-y-1/2 bg-primary/[0.08] blur-3xl rounded-full"
          />
          <div className="relative grid gap-8 p-6 sm:p-8 md:p-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-stretch">
            <div className="flex flex-col justify-center space-y-5">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
                Geração Inteligente de Prescrições
              </div>
              
              <h1 className="m-0 text-3xl font-extrabold tracking-tight text-[color:var(--rxv-text)] sm:text-4xl lg:text-[2.5rem] lg:leading-[1.1]">
                <span>Receituário </span>
                <span className="bg-gradient-to-r from-primary via-sky-500 to-cyan-500 bg-clip-text text-transparent">
                  VET
                </span>
              </h1>
              
              <p className="max-w-xl text-[14px] leading-relaxed text-[color:var(--rxv-muted)] sm:text-base">
                Emissão simplificada com cálculos posológicos automáticos, catálogo robusto integrado e controle especial em conformidade com as normas MAPA e Portaria 344.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigate('/receituario-vet/nova-receita-2')}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:scale-[1.01] hover:brightness-[1.05]"
                >
                  <FileText className="h-4.5 w-4.5 shrink-0" />
                  Emitir nova receita
                  <ChevronRight className="h-4 w-4 shrink-0" />
                </button>
                
                <div className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--rxv-border)]/60 bg-[color:var(--rxv-surface-2)]/40 px-4 py-2 text-xs font-semibold text-[color:var(--rxv-muted)]">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  <span>{todayLabel()}</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center p-4">
              <div className="relative flex items-center justify-center h-48 w-48 rounded-3xl border border-primary/10 bg-primary/[0.03] shadow-inner">
                <img
                  src={homeIcon.src}
                  alt={homeIcon.name}
                  className="h-28 w-28 object-contain transition-transform duration-300 hover:scale-[1.04]"
                />
                <div className="absolute -bottom-2 px-3 py-1 rounded-lg border border-primary/25 bg-[color:var(--rxv-surface)] text-[10px] font-bold text-primary tracking-wide shadow-sm">
                  VETIUS ECOSYSTEM
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RECENT DRAFTS SECTION */}
        {drafts.length > 0 && (
          <section className="space-y-4 rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/[0.05] to-transparent p-6 shadow-sm shadow-primary/5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <FolderLock className="h-4 w-4" />
                </span>
                Rascunhos Pendentes
              </div>
              <Link to="/receituario-vet/rascunhos" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                Ver todos <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {drafts.map((draft) => (
                <Link
                  to={`/receituario-vet/nova-receita-2?draft=${draft.id}`}
                  key={draft.id}
                  className="flex flex-col justify-between rounded-2xl border border-[color:var(--rxv-border)]/70 bg-[color:var(--rxv-surface)] p-4 hover:border-primary/30 hover:shadow-md transition-all group shadow-sm"
                >
                  <div>
                    <h4 className="font-bold text-[color:var(--rxv-text)] group-hover:text-primary transition-colors line-clamp-1">
                      {draft.patientName || 'Paciente sem nome'}
                    </h4>
                    <p className="text-xs text-[color:var(--rxv-muted)] mt-1.5 line-clamp-1">
                      Tutor: {draft.tutorName || 'Não informado'}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-[color:var(--rxv-border)]/40">
                    <span className="text-[11px] text-[color:var(--rxv-muted)]">
                      {new Date(draft.savedAt).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="text-xs font-semibold text-primary inline-flex items-center gap-0.5">
                      Retomar <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* PRIMARY CLINICAL LINKS */}
        <section className="space-y-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold tracking-tight text-[color:var(--rxv-text)]">Fluxo clínico central</h2>
            <p className="text-sm text-[color:var(--rxv-muted)]">Gerenciamento de fichas de pacientes, cadastros de fármacos e protocolos clínicos.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {primaryLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group relative overflow-hidden rounded-2xl border border-[color:var(--rxv-border)]/80 bg-[color:var(--rxv-surface)] p-6 shadow-sm hover:shadow-md hover:border-primary/25 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-${item.color}-500/15 text-${item.color}-600 dark:text-${item.color}-400 shadow-inner`}>
                    <item.icon className="h-5.5 w-5.5" />
                  </div>
                  {item.premium && (
                    <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[9px] font-semibold text-primary uppercase tracking-wide">
                      Avançado
                    </span>
                  )}
                </div>
                
                <h3 className="mt-5 text-15px font-bold text-[color:var(--rxv-text)] group-hover:text-primary transition-colors">{item.label}</h3>
                <p className="mt-2 text-13px text-[color:var(--rxv-muted)] leading-relaxed line-clamp-3">{item.summary}</p>
                
                <div className="mt-5 pt-3 border-t border-[color:var(--rxv-border)]/20 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Acessar <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* UTILITIES & TOOLS */}
        <section className="space-y-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold tracking-tight text-[color:var(--rxv-text)]">Utilitários e conta</h2>
            <p className="text-sm text-[color:var(--rxv-muted)]">Históricos, documentos especiais, configuração de templates e backups.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {toolLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group relative overflow-hidden rounded-2xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface)] p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${item.color}-500/10 text-${item.color}-600 dark:text-${item.color}-400 shadow-inner`}>
                  <item.icon className="h-5 w-5" />
                </div>
                
                <h3 className="mt-4 text-[13px] font-bold text-[color:var(--rxv-text)] group-hover:text-primary transition-colors">{item.label}</h3>
                <p className="mt-1.5 text-12px text-[color:var(--rxv-muted)] leading-normal line-clamp-2">{item.summary}</p>
                
                <div className="mt-4 flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Abrir <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* PRINT HISTORY SECTION */}
        {history.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--rxv-text)]">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[color:var(--rxv-surface-2)] text-[color:var(--rxv-text)]">
                  <History className="h-4 w-4" />
                </span>
                Prescrições Recentes
              </div>
              <Link to="/receituario-vet/historico" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                Ver completo <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {history.map((record) => (
                <div
                  key={record.id}
                  className="flex flex-col justify-between rounded-2xl border border-[color:var(--rxv-border)]/65 bg-[color:var(--rxv-surface)] p-4 hover:border-primary/20 transition-all shadow-sm"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-[color:var(--rxv-text)] line-clamp-1">{record.patientName}</h4>
                      <button
                        onClick={() => removeHistoryEntry(record.id)}
                        className="text-[color:var(--rxv-muted)] hover:text-red-500 p-0.5 rounded transition-colors"
                        title="Excluir do histórico"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-[color:var(--rxv-muted)] mt-1.5 line-clamp-1">Tutor: {record.tutorName}</p>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-[color:var(--rxv-border)]/40">
                    <span className="text-[11px] text-[color:var(--rxv-muted)]">
                      {new Date(record.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                    <Link
                      to={`/receituario-vet/print?id=${record.prescriptionId}`}
                      className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-0.5"
                    >
                      Ver PDF <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer className="relative mt-4 border-t border-[color:var(--rxv-border)]/40 pt-6 pb-2 text-center text-xs text-[color:var(--rxv-muted)]">
          VETIUS © 2026 — Receituário Veterinário de Alto Padrão
        </footer>
      </div>
    </ReceituarioChrome>
  )
}
