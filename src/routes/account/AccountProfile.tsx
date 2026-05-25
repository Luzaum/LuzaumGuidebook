import React, { useState, useEffect, useMemo } from 'react'
import { AccountPageShell } from '@/src/components/account/AccountPageShell'
import { useAuthSession } from '@/src/components/AuthSessionProvider'
import { supabase } from '@/src/lib/supabaseClient'
import { Loader2, UserRound, Sparkles } from 'lucide-react'

type AvatarItem = {
  id: string
  url: string
}

type AvatarCategory = {
  category: string
  avatars: AvatarItem[]
}

const AVATAR_OPTIONS: AvatarCategory[] = [
  {
    category: 'Cães 🐶',
    avatars: [
      { id: 'dog-1', url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 'dog-2', url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 'dog-3', url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 'dog-4', url: 'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 'dog-5', url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 'dog-6', url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 'dog-7', url: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 'dog-8', url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 'dog-9', url: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 'dog-10', url: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=150&h=150&q=80' },
    ]
  },
  {
    category: 'Gatos 🐱',
    avatars: [
      { id: 'cat-1', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 'cat-2', url: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 'cat-3', url: 'https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 'cat-4', url: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 'cat-5', url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 'cat-6', url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 'cat-7', url: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 'cat-8', url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 'cat-9', url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=150&h=150&q=80' },
      { id: 'cat-10', url: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=150&h=150&q=80' },
    ]
  },
  {
    category: 'Veterinários Homens 🩺',
    avatars: [
      { id: 'vet-m-1', url: '/images/avatars/vet_m_1.png' },
      { id: 'vet-m-2', url: '/images/avatars/vet_m_2.png' },
      { id: 'vet-m-3', url: '/images/avatars/vet_m_3.png' },
      { id: 'vet-m-4', url: '/images/avatars/vet_m_4.png' },
      { id: 'vet-m-5', url: '/images/avatars/vet_m_5.png' },
    ]
  },
  {
    category: 'Veterinárias Mulheres 👩‍⚕️',
    avatars: [
      { id: 'vet-f-1', url: '/images/avatars/vet_f_1.png' },
      { id: 'vet-f-2', url: '/images/avatars/vet_f_2.png' },
      { id: 'vet-f-3', url: '/images/avatars/vet_f_3.png' },
      { id: 'vet-f-4', url: '/images/avatars/vet_f_4.png' },
      { id: 'vet-f-5', url: '/images/avatars/vet_f_5.png' },
    ]
  }
]

function trimValue(value: string | null | undefined): string {
  return String(value || '').trim()
}

export default function AccountProfile() {
  const { user, profile, refreshSession } = useAuthSession()
  const metadata = (user?.user_metadata) || {}

  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  
  const [saving, setSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const displayEmail = useMemo(() => profile?.email || '-', [profile?.email])

  useEffect(() => {
    setFullName(trimValue(metadata.full_name) || trimValue(profile?.name))
    setUsername(trimValue(metadata.username))
    setPhone(trimValue(metadata.phone))
    setAvatarUrl(trimValue(metadata.avatar_url) || trimValue(profile?.avatarUrl))
  }, [metadata.avatar_url, metadata.full_name, metadata.phone, metadata.username, profile?.avatarUrl, profile?.name])

  async function handleSave(event: React.FormEvent) {
    event.preventDefault()
    setSaving(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const nextMetadata = {
        ...metadata,
        full_name: fullName.trim(),
        username: username.trim(),
        phone: phone.trim(),
        avatar_url: avatarUrl.trim(),
      }

      const { error } = await supabase.auth.updateUser({
        data: nextMetadata,
      })

      if (error) throw error

      await refreshSession()
      setSuccessMessage('Perfil e avatar salvos com sucesso!')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao atualizar perfil.'
      setErrorMessage(message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AccountPageShell
      title="Alterar perfil"
      subtitle="Atualize os dados principais da conta e selecione seu avatar oficial."
    >
      <div className="space-y-6">
        
        {/* Profile and Avatar Form */}
        <form onSubmit={handleSave} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 sm:p-8 shadow-inner backdrop-blur-md grid gap-6 md:grid-cols-3">
          
          {/* Avatar Preview Section */}
          <div className="flex flex-col items-center justify-center p-4 border border-slate-800/60 bg-slate-950/30 rounded-2xl md:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
              <UserRound className="h-4 w-4 text-emerald-400" />
              Preview do Avatar
            </h3>
            <div className="relative group">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="h-28 w-28 rounded-full object-cover ring-4 ring-emerald-500/30 shadow-2xl transition duration-300 group-hover:scale-105"
                  onError={() => setAvatarUrl('')}
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-400">
                  <UserRound size={48} />
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                <Sparkles size={14} className="animate-pulse" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center max-w-[150px]">
              Selecione uma das opções abaixo ou cole um link customizado.
            </p>
          </div>

          {/* Form Fields Section */}
          <div className="md:col-span-2 space-y-4">
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Nome completo</label>
                <input
                  className="h-11 w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 text-sm text-slate-100 placeholder:text-slate-600 outline-none ring-emerald-500/30 transition-all duration-200 focus:border-emerald-500/80 focus:ring-4 focus:bg-slate-950"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nome completo"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Usuário exibido</label>
                <input
                  className="h-11 w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 text-sm text-slate-100 placeholder:text-slate-600 outline-none ring-emerald-500/30 transition-all duration-200 focus:border-emerald-500/80 focus:ring-4 focus:bg-slate-950"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="usuario-clinica"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">E-mail</label>
                <input
                  className="h-11 w-full rounded-xl border border-slate-800/60 bg-slate-900/10 px-4 text-sm text-slate-500 cursor-not-allowed select-none outline-none"
                  value={displayEmail}
                  readOnly
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Telefone</label>
                <input
                  className="h-11 w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 text-sm text-slate-100 placeholder:text-slate-600 outline-none ring-emerald-500/30 transition-all duration-200 focus:border-emerald-500/80 focus:ring-4 focus:bg-slate-950"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Link do Avatar Customizado</label>
              <input
                className="h-11 w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 text-sm text-slate-100 placeholder:text-slate-600 outline-none ring-emerald-500/30 transition-all duration-200 focus:border-emerald-500/80 focus:ring-4 focus:bg-slate-950"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://exemplo.com/avatar.jpg"
              />
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                type="submit"
                className="relative flex h-11 w-fit items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-sm font-bold text-white shadow-[0_4px_15px_rgba(16,185,129,0.25)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(16,185,129,0.35)] active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none px-6 py-2.5"
                disabled={saving}
              >
                {saving ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Salvando alterações...</span>
                  </div>
                ) : (
                  <span>Salvar perfil e avatar</span>
                )}
              </button>

              {successMessage && (
                <div className="text-sm font-medium text-emerald-400 mt-2">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="text-sm font-medium text-red-400 mt-2">
                  {errorMessage}
                </div>
              )}
            </div>

          </div>
        </form>

        {/* Premade Avatar Options */}
        <section className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 sm:p-8 shadow-inner backdrop-blur-md space-y-6">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">Escolha uma opção de Avatar</h2>
            <p className="text-xs text-slate-500 mt-1">
              Clique em qualquer imagem abaixo para selecioná-la instantaneamente como seu avatar, e depois clique em "Salvar perfil e avatar" acima.
            </p>
          </div>

          <div className="space-y-8">
            {AVATAR_OPTIONS.map((group) => (
              <div key={group.category} className="space-y-3 max-w-2xl mx-auto w-full">
                <h3 className="text-xs font-bold text-slate-400 tracking-wide uppercase border-b border-slate-800/80 pb-2">
                  {group.category}
                </h3>
                <div className="grid grid-cols-5 gap-4 sm:gap-5 w-full">
                  {group.avatars.map((av) => {
                    const isSelected = avatarUrl === av.url
                    return (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => {
                          setAvatarUrl(av.url)
                          setSuccessMessage('')
                        }}
                        className={`relative group aspect-square rounded-xl overflow-hidden border-2 bg-slate-950/50 transition-all duration-300 hover:scale-105 active:scale-95 ${
                          isSelected
                            ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] ring-2 ring-emerald-500/25'
                            : 'border-slate-800 hover:border-slate-600'
                        }`}
                      >
                        <img
                          src={av.url}
                          alt="Opção de avatar"
                          className="h-full w-full object-cover select-none pointer-events-none"
                          loading="lazy"
                        />
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </AccountPageShell>
  )
}
