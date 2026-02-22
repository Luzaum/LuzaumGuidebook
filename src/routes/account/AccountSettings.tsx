import { useEffect, useMemo, useState } from 'react'
import { AccountPageShell } from '@/src/components/account/AccountPageShell'
import { useAuthSession } from '@/src/components/AuthSessionProvider'

type AccountSettingsState = {
  emailAlerts: boolean
  productUpdates: boolean
  autoOpenLastModule: boolean
  compactHeader: boolean
}

const defaultSettings: AccountSettingsState = {
  emailAlerts: true,
  productUpdates: false,
  autoOpenLastModule: true,
  compactHeader: false,
}

function getStorageKey(userId: string | null | undefined) {
  return `vetius:account:settings:${String(userId || 'anon')}`
}

function readSettings(userId: string | null | undefined): AccountSettingsState {
  try {
    const raw = localStorage.getItem(getStorageKey(userId))
    if (!raw) return defaultSettings
    const parsed = JSON.parse(raw) as Partial<AccountSettingsState>
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

function saveSettings(userId: string | null | undefined, value: AccountSettingsState) {
  localStorage.setItem(getStorageKey(userId), JSON.stringify(value))
}

export default function AccountSettings() {
  const { user } = useAuthSession()
  const [settings, setSettings] = useState<AccountSettingsState>(defaultSettings)
  const [message, setMessage] = useState('')

  const userId = useMemo(() => user?.id || null, [user?.id])

  useEffect(() => {
    setSettings(readSettings(userId))
  }, [userId])

  function updateSettings(next: AccountSettingsState, feedback = 'Configuracoes atualizadas.') {
    setSettings(next)
    saveSettings(userId, next)
    setMessage(feedback)
  }

  return (
    <AccountPageShell
      title="Configuracoes"
      subtitle="Controle preferencias da conta para melhorar seu fluxo diario."
    >
      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Preferencias da conta</h2>

        <label className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Notificacoes por email</p>
            <p className="text-xs text-slate-500">Receber avisos importantes sobre seguranca e acesso.</p>
          </div>
          <input
            type="checkbox"
            checked={settings.emailAlerts}
            onChange={(event) => {
              updateSettings({ ...settings, emailAlerts: event.target.checked })
            }}
            className="mt-1 h-4 w-4"
          />
        </label>

        <label className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Atualizacoes de produto</p>
            <p className="text-xs text-slate-500">Ser avisado sobre novos modulos e melhorias.</p>
          </div>
          <input
            type="checkbox"
            checked={settings.productUpdates}
            onChange={(event) => {
              updateSettings({ ...settings, productUpdates: event.target.checked })
            }}
            className="mt-1 h-4 w-4"
          />
        </label>

        <label className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Reabrir ultimo modulo</p>
            <p className="text-xs text-slate-500">Ao entrar, ir direto para o ultimo modulo usado.</p>
          </div>
          <input
            type="checkbox"
            checked={settings.autoOpenLastModule}
            onChange={(event) => {
              updateSettings({ ...settings, autoOpenLastModule: event.target.checked })
            }}
            className="mt-1 h-4 w-4"
          />
        </label>

        <label className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Cabecalho compacto</p>
            <p className="text-xs text-slate-500">Usar um cabecalho menor para maior area util de tela.</p>
          </div>
          <input
            type="checkbox"
            checked={settings.compactHeader}
            onChange={(event) => {
              updateSettings({ ...settings, compactHeader: event.target.checked })
            }}
            className="mt-1 h-4 w-4"
          />
        </label>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            onClick={() => {
              updateSettings(defaultSettings, 'Configuracoes restauradas para o padrao.')
            }}
          >
            Restaurar padrao
          </button>
        </div>

        {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
      </section>
    </AccountPageShell>
  )
}
