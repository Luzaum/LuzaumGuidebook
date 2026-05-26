import React, { useState } from 'react'
import ReceituarioChrome from './ReceituarioChrome'

const THEME_KEY = 'receituario-vet:theme:v1'
const PAPER_SIZE_KEY = 'receituario-vet:default-paper-size'
const SHOW_LETTERHEAD_KEY = 'receituario-vet:show-letterhead'
const SHOW_SIGNATURE_KEY = 'receituario-vet:show-signature'
const SHOW_TIMESTAMP_KEY = 'receituario-vet:show-timestamp'
const AUTO_CALCULATIONS_KEY = 'receituario-vet:auto-calculations'
const GROUP_BY_ROUTE_KEY = 'receituario-vet:group-by-route'

export default function SettingsPage() {
  const [toast, setToast] = useState<string | null>(null)
  
  // Load settings from localStorage with default fallbacks
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark'
  })
  const [paperSize, setPaperSize] = useState<'A4' | 'A5'>(() => {
    return (localStorage.getItem(PAPER_SIZE_KEY) as 'A4' | 'A5') || 'A4'
  })
  const [showLetterhead, setShowLetterhead] = useState<boolean>(() => {
    return localStorage.getItem(SHOW_LETTERHEAD_KEY) !== 'false'
  })
  const [showSignature, setShowSignature] = useState<boolean>(() => {
    return localStorage.getItem(SHOW_SIGNATURE_KEY) !== 'false'
  })
  const [showTimestamp, setShowTimestamp] = useState<boolean>(() => {
    return localStorage.getItem(SHOW_TIMESTAMP_KEY) !== 'false'
  })
  const [autoCalculations, setAutoCalculations] = useState<boolean>(() => {
    return localStorage.getItem(AUTO_CALCULATIONS_KEY) !== 'false'
  })
  const [groupByRoute, setGroupByRoute] = useState<boolean>(() => {
    return localStorage.getItem(GROUP_BY_ROUTE_KEY) !== 'false'
  })

  const pushToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 3000)
  }

  const handleSave = () => {
    localStorage.setItem(THEME_KEY, theme)
    localStorage.setItem(PAPER_SIZE_KEY, paperSize)
    localStorage.setItem(SHOW_LETTERHEAD_KEY, String(showLetterhead))
    localStorage.setItem(SHOW_SIGNATURE_KEY, String(showSignature))
    localStorage.setItem(SHOW_TIMESTAMP_KEY, String(showTimestamp))
    localStorage.setItem(AUTO_CALCULATIONS_KEY, String(autoCalculations))
    localStorage.setItem(GROUP_BY_ROUTE_KEY, String(groupByRoute))

    // Apply theme change directly to trigger immediate color updates if modified
    window.dispatchEvent(new Event('storage'))
    
    pushToast('Configurações salvas com sucesso!')
  }

  return (
    <ReceituarioChrome
      section="settings"
      title="Configurações Gerais"
      subtitle="Personalize a interface do aplicativo, os padrões de visualização dos documentos e regras de automação clínica."
      forcedTheme={theme}
      onThemeChange={(newTheme) => {
        setTheme(newTheme)
        localStorage.setItem(THEME_KEY, newTheme)
      }}
      actions={
        <button
          type="button"
          className="rxv-btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm font-bold shadow-lg"
          onClick={handleSave}
        >
          <span className="material-symbols-outlined text-[18px]">save</span>
          Salvar Configurações
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="space-y-6 xl:col-span-8">
          
          {/* Card: Visual Preferences */}
          <section className="rxv-card p-6">
            <div className="mb-5 flex items-center gap-3 border-b border-[color:var(--rxv-border)] pb-4">
              <span className="material-symbols-outlined text-2xl text-[color:var(--rxv-primary)]">palette</span>
              <div>
                <h3 className="text-base font-extrabold text-[color:var(--rxv-text)]">Preferências Visuais</h3>
                <p className="text-xs text-[color:var(--rxv-muted)]">Configure a aparência e esquema de cores da sua área de trabalho.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-[color:var(--rxv-text)] mb-2">Tema do Aplicativo</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTheme('light')}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 text-sm font-semibold transition ${
                      theme === 'light'
                        ? 'border-[color:var(--rxv-primary)] bg-[color:color-mix(in_srgb,var(--rxv-primary)_8%,var(--rxv-surface))] text-[color:var(--rxv-primary)] shadow-sm'
                        : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] text-[color:var(--rxv-muted)] hover:border-[color:color-mix(in_srgb,var(--rxv-primary)_30%,transparent)]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">light_mode</span>
                    Modo Claro
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 text-sm font-semibold transition ${
                      theme === 'dark'
                        ? 'border-[color:var(--rxv-primary)] bg-[color:color-mix(in_srgb,var(--rxv-primary)_8%,var(--rxv-surface))] text-[color:var(--rxv-primary)] shadow-sm'
                        : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] text-[color:var(--rxv-muted)] hover:border-[color:color-mix(in_srgb,var(--rxv-primary)_30%,transparent)]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">dark_mode</span>
                    Modo Escuro
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[color:var(--rxv-text)] mb-2">Formato de Página Padrão</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaperSize('A4')}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 text-sm font-semibold transition ${
                      paperSize === 'A4'
                        ? 'border-[color:var(--rxv-primary)] bg-[color:color-mix(in_srgb,var(--rxv-primary)_8%,var(--rxv-surface))] text-[color:var(--rxv-primary)] shadow-sm'
                        : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] text-[color:var(--rxv-muted)] hover:border-[color:color-mix(in_srgb,var(--rxv-primary)_30%,transparent)]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">description</span>
                    Padrão A4
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaperSize('A5')}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 text-sm font-semibold transition ${
                      paperSize === 'A5'
                        ? 'border-[color:var(--rxv-primary)] bg-[color:color-mix(in_srgb,var(--rxv-primary)_8%,var(--rxv-surface))] text-[color:var(--rxv-primary)] shadow-sm'
                        : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] text-[color:var(--rxv-muted)] hover:border-[color:color-mix(in_srgb,var(--rxv-primary)_30%,transparent)]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">note</span>
                    Compacto A5
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Card: Printing Templates Defaults */}
          <section className="rxv-card p-6">
            <div className="mb-5 flex items-center gap-3 border-b border-[color:var(--rxv-border)] pb-4">
              <span className="material-symbols-outlined text-2xl text-[color:var(--rxv-primary)]">print</span>
              <div>
                <h3 className="text-base font-extrabold text-[color:var(--rxv-text)]">Padrões de Impressão</h3>
                <p className="text-xs text-[color:var(--rxv-muted)]">Defina quais seções visuais devem vir marcadas ao criar novos documentos.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[color:var(--rxv-surface-2)] border border-[color:var(--rxv-border)]">
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  <span className="material-symbols-outlined text-[22px] text-[color:var(--rxv-muted)]">badge</span>
                  <div className="min-w-0">
                    <label className="block text-sm font-bold text-[color:var(--rxv-text)] truncate">Exibir Cabeçalho por Padrão</label>
                    <span className="text-xs text-[color:var(--rxv-muted)] block sm:inline">Inclui logotipo da clínica e dados cadastrais no topo do receituário.</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLetterhead(!showLetterhead)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    showLetterhead ? 'bg-[color:var(--rxv-primary)]' : 'bg-slate-700'
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${showLetterhead ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[color:var(--rxv-surface-2)] border border-[color:var(--rxv-border)]">
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  <span className="material-symbols-outlined text-[22px] text-[color:var(--rxv-muted)]">signature</span>
                  <div className="min-w-0">
                    <label className="block text-sm font-bold text-[color:var(--rxv-text)] truncate">Exibir Assinatura Digital por Padrão</label>
                    <span className="text-xs text-[color:var(--rxv-muted)] block sm:inline">Carrega a imagem da assinatura veterinária cadastrada no rodapé do documento.</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSignature(!showSignature)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    showSignature ? 'bg-[color:var(--rxv-primary)]' : 'bg-slate-700'
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${showSignature ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[color:var(--rxv-surface-2)] border border-[color:var(--rxv-border)]">
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  <span className="material-symbols-outlined text-[22px] text-[color:var(--rxv-muted)]">schedule</span>
                  <div className="min-w-0">
                    <label className="block text-sm font-bold text-[color:var(--rxv-text)] truncate">Exibir Data/Hora no Rodapé</label>
                    <span className="text-xs text-[color:var(--rxv-muted)] block sm:inline">Insere a data e hora oficial de geração no rodapé para controle e rastreabilidade.</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTimestamp(!showTimestamp)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    showTimestamp ? 'bg-[color:var(--rxv-primary)]' : 'bg-slate-700'
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${showTimestamp ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </section>

          {/* Card: Prescription System Calculations */}
          <section className="rxv-card p-6">
            <div className="mb-5 flex items-center gap-3 border-b border-[color:var(--rxv-border)] pb-4">
              <span className="material-symbols-outlined text-2xl text-[color:var(--rxv-primary)]">calculate</span>
              <div>
                <h3 className="text-base font-extrabold text-[color:var(--rxv-text)]">Regras e Automações Clínicas</h3>
                <p className="text-xs text-[color:var(--rxv-muted)]">Configure a inteligência operacional do sistema de prescrição.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[color:var(--rxv-surface-2)] border border-[color:var(--rxv-border)]">
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  <span className="material-symbols-outlined text-[22px] text-[color:var(--rxv-muted)]">smart_toy</span>
                  <div className="min-w-0">
                    <label className="block text-sm font-bold text-[color:var(--rxv-text)] truncate">Cálculos e Posologia Automática</label>
                    <span className="text-xs text-[color:var(--rxv-muted)] block sm:inline">Calcula automaticamente a dose sugerida com base no peso vivo do paciente.</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoCalculations(!autoCalculations)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    autoCalculations ? 'bg-[color:var(--rxv-primary)]' : 'bg-slate-700'
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${autoCalculations ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[color:var(--rxv-surface-2)] border border-[color:var(--rxv-border)]">
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  <span className="material-symbols-outlined text-[22px] text-[color:var(--rxv-muted)]">list_alt</span>
                  <div className="min-w-0">
                    <label className="block text-sm font-bold text-[color:var(--rxv-text)] truncate">Agrupar por Via de Administração</label>
                    <span className="text-xs text-[color:var(--rxv-muted)] block sm:inline">Organiza automaticamente os itens agrupados por "Uso Oral", "Uso Tópico", etc.</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setGroupByRoute(!groupByRoute)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    groupByRoute ? 'bg-[color:var(--rxv-primary)]' : 'bg-slate-700'
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${groupByRoute ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </section>

        </div>

        {/* Aside Sidebar: Informational Tips */}
        <aside className="space-y-6 xl:col-span-4">
          <section className="rxv-card p-5">
            <h3 className="mb-4 text-xs font-black uppercase tracking-wider text-[color:var(--rxv-muted)] flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">info</span>
              Sobre as Configurações
            </h3>
            <div className="space-y-4 text-sm text-[color:var(--rxv-muted)] leading-relaxed">
              <p>
                Estas opções são mantidas localmente em seu navegador. Elas controlam a experiência diária do seu consultório e agilizam a emissão de novos documentos.
              </p>
              <p>
                Os padrões de impressão definidos aqui serão aplicados automaticamente na tela de <strong>Nova Receita</strong>, mas você sempre poderá alterá-los individualmente em cada documento antes de imprimir ou gerar o PDF.
              </p>
            </div>
          </section>

          <section className="rxv-card p-5 border border-dashed border-[color:color-mix(in_srgb,var(--rxv-primary)_20%,transparent)] bg-[color:color-mix(in_srgb,var(--rxv-primary)_3%,transparent)]">
            <h3 className="mb-3 text-xs font-black uppercase tracking-wider text-[color:var(--rxv-primary)] flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">shield_heart</span>
              Segurança dos Dados
            </h3>
            <p className="text-sm text-[color:var(--rxv-muted)] leading-relaxed">
              As configurações locais e dados dos seus pacientes são mantidos sob total sigilo e privacidade no seu dispositivo de trabalho.
            </p>
          </section>
        </aside>
      </div>

      {toast ? (
        <div className="fixed bottom-6 right-6 z-[120] rounded-xl border border-[color:var(--rxv-primary)] bg-[color:var(--rxv-surface)] px-5 py-3.5 text-sm font-bold text-[color:var(--rxv-primary)] shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          {toast}
        </div>
      ) : null}
    </ReceituarioChrome>
  )
}