import { useEffect, useMemo, useState } from 'react'
import { AccountPageShell } from '@/src/components/account/AccountPageShell'
import { useAuthSession } from '@/src/components/AuthSessionProvider'
import { supabase } from '@/src/lib/supabaseClient'

function readText(value: unknown): string {
  return String(value || '').trim()
}

export default function AccountProfile() {
  const { user, profile, refreshSession } = useAuthSession()
  const metadata = (user?.user_metadata || {}) as Record<string, unknown>

  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const email = useMemo(() => profile?.email || '-', [profile?.email])

  useEffect(() => {
    setFullName(readText(metadata.full_name) || profile?.name || '')
    setUsername(readText(metadata.username))
    setPhone(readText(metadata.phone))
    setAvatarUrl(readText(metadata.avatar_url) || profile?.avatarUrl || '')
  }, [metadata.avatar_url, metadata.full_name, metadata.phone, metadata.username, profile?.avatarUrl, profile?.name])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setMessage('')

    try {
      const nextMetadata = {
        ...metadata,
        full_name: fullName.trim(),
        username: username.trim(),
        phone: phone.trim(),
        avatar_url: avatarUrl.trim(),
      }

      const { error: updateError } = await supabase.auth.updateUser({
        data: nextMetadata,
      })
      if (updateError) throw updateError

      await refreshSession()
      setMessage('Perfil atualizado com sucesso.')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Falha ao atualizar perfil.'
      setError(msg)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AccountPageShell
      title="Alterar perfil"
      subtitle="Atualize os dados principais da conta e mantenha sua identificação consistente."
    >
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-2 dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Nome completo</label>
          <input
            className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Nome completo"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Usuario exibido</label>
          <input
            className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="usuario-clínica"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
          <input
            className="w-full cursor-not-allowed rounded-lg border border-slate-300 bg-slate-100 p-2.5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            value={email}
            readOnly
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Telefone</label>
          <input
            className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="(00) 00000-0000"
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">URL do avatar</label>
          <input
            className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            value={avatarUrl}
            onChange={(event) => setAvatarUrl(event.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900"
            disabled={busy}
          >
            {busy ? 'Salvando...' : 'Salvar perfil'}
          </button>

          {message ? <p className="mt-2 text-sm text-emerald-600">{message}</p> : null}
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        </div>
      </form>
    </AccountPageShell>
  )
}
