import { useState, useEffect, useMemo } from 'react'
import { AccountPageShell } from '@/src/components/account/AccountPageShell'
import { useAuthSession } from '@/src/components/AuthSessionProvider'

type SettingsShape = {
  emailAlerts: boolean
  productUpdates: boolean
  autoOpenLastModule: boolean
  compactHeader: boolean
}

const defaultSettings: SettingsShape = {
  emailAlerts: true,
  productUpdates: false,
  autoOpenLastModule: true,
  compactHeader: false,
}

function buildStorageKey(userId: string | null | undefined): string {
  return `vetius:account:settings:${String(userId || 'anon')}`
}

function loadSettings(userId: string | null | undefined): SettingsShape {
  try {
    const raw = localStorage.getItem(buildStorageKey(userId))
    if (!raw) return defaultSettings
    const parsed = JSON.parse(raw)
    return {
      emailAlerts: Boolean(parsed.emailAlerts ?? defaultSettings.emailAlerts),
      productUpdates: Boolean(parsed.productUpdates ?? defaultSettings.productUpdates),
      autoOpenLastModule: Boolean(parsed.autoOpenLastModule ?? defaultSettings.autoOpenLastModule),
      compactHeader: Boolean(parsed.compactHeader ?? defaultSettings.compactHeader),
    }
  } catch {
    return defaultSettings
  }
}

function saveSettings(userId: string | null | undefined, value: SettingsShape) {
  localStorage.setItem(buildStorageKey(userId), JSON.stringify(value))
}

export default function AccountSettings() {
  const { user } = useAuthSession()
  const [settings, setSettings] = useState<SettingsShape>(defaultSettings)
  const [successMessage, setSuccessMessage] = useState('')

  const userId = useMemo(() => user?.id || null, [user?.id])

  useEffect(() => {
    setSettings(loadSettings(userId))
  }, [userId])

  function updateSetting(next: SettingsShape, feedback = 'Configurações atualizadas com sucesso!') {
    setSettings(next)
    saveSettings(userId, next)
    setSuccessMessage(feedback)
    
    // Clear message after 3 seconds
    const timer = setTimeout(() => setSuccessMessage(''), 3000)
    return () => clearTimeout(timer)
  }

  return (
    <AccountPageShell
      title="Configurações"
      subtitle="Controle preferências da conta para melhorar seu fluxo diário."
    >
      <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-6 backdrop-blur-md shadow-inner">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">
          Preferências da conta
        </h2>

        <div className="space-y-3">
          
          <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/30 p-4 transition-all hover:bg-slate-900/60 select-none cursor-pointer">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-200">Notificações por e-mail</p>
              <p className="text-xs text-slate-500 mt-0.5">Receber avisos importantes sobre segurança e acesso à plataforma.</p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailAlerts}
              onChange={(e) => updateSetting({ ...settings, emailAlerts: e.target.checked })}
              className="h-5 w-5 rounded-md border-slate-800 bg-slate-950 text-emerald-500 accent-emerald-500 focus:ring-emerald-500/30 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/30 p-4 transition-all hover:bg-slate-900/60 select-none cursor-pointer">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-200">Atualizações de produto</p>
              <p className="text-xs text-slate-500 mt-0.5">Ser notificado sobre o lançamento de novos módulos e melhorias gerais.</p>
            </div>
            <input
              type="checkbox"
              checked={settings.productUpdates}
              onChange={(e) => updateSetting({ ...settings, productUpdates: e.target.checked })}
              className="h-5 w-5 rounded-md border-slate-800 bg-slate-950 text-emerald-500 accent-emerald-500 focus:ring-emerald-500/30 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/30 p-4 transition-all hover:bg-slate-900/60 select-none cursor-pointer">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-200">Reabrir último módulo</p>
              <p className="text-xs text-slate-500 mt-0.5">Ir direto para o último módulo utilizado ao acessar a plataforma.</p>
            </div>
            <input
              type="checkbox"
              checked={settings.autoOpenLastModule}
              onChange={(e) => updateSetting({ ...settings, autoOpenLastModule: e.target.checked })}
              className="h-5 w-5 rounded-md border-slate-800 bg-slate-950 text-emerald-500 accent-emerald-500 focus:ring-emerald-500/30 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/30 p-4 transition-all hover:bg-slate-900/60 select-none cursor-pointer">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-200">Cabeçalho compacto</p>
              <p className="text-xs text-slate-500 mt-0.5">Reduzir o tamanho do cabeçalho global do app para obter mais área útil na tela.</p>
            </div>
            <input
              type="checkbox"
              checked={settings.compactHeader}
              onChange={(e) => updateSetting({ ...settings, compactHeader: e.target.checked })}
              className="h-5 w-5 rounded-md border-slate-800 bg-slate-950 text-emerald-500 accent-emerald-500 focus:ring-emerald-500/30 cursor-pointer"
            />
          </label>

        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-slate-800/80">
          <button
            type="button"
            className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 hover:text-white text-xs font-bold text-slate-300 px-4 py-2.5 transition-all w-fit"
            onClick={() => updateSetting(defaultSettings, 'Configurações restauradas para o padrão.')}
          >
            Restaurar padrão
          </button>
          
          {successMessage && (
            <p className="text-xs font-semibold text-emerald-400">
              {successMessage}
            </p>
          )}
        </div>
      </section>
    </AccountPageShell>
  )
}
