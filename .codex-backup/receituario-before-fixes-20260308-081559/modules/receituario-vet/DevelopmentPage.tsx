import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReceituarioChrome from './ReceituarioChrome'
import { HOME_ICON_OPTIONS, readHomeIconSelection, saveHomeIconSelection } from './rxAssets'

export default function DevelopmentPage() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(() => readHomeIconSelection().id)
  const [savedAt, setSavedAt] = useState<string>('')

  const selected = useMemo(
    () => HOME_ICON_OPTIONS.find((item) => item.id === selectedId) || HOME_ICON_OPTIONS[0],
    [selectedId]
  )

  const applyIcon = (iconId: string) => {
    const applied = saveHomeIconSelection(iconId)
    setSelectedId(applied.id)
    setSavedAt(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
  }

  return (
    <ReceituarioChrome
      section="dev"
      title="Desenvolvimento"
      subtitle="Preview e seleção do icone de receita usado no card principal da Home."
      actions={
        <button
          type="button"
          className="rxv-btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm"
          onClick={() => navigate('/receituario-vet')}
        >
          <span className="material-symbols-outlined text-[18px]">home</span>
          Voltar para Home
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <section className="rxv-card p-4 xl:col-span-8">
          <h2 className="mb-3 text-base font-bold">Variações disponíveis</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {HOME_ICON_OPTIONS.map((item) => {
              const active = selectedId === item.id
              return (
                <article
                  key={item.id}
                  className={`rounded-xl border p-3 transition-all ${
                    active
                      ? 'border-[color:var(--rxv-primary)] bg-[color:var(--rxv-primary)]/10 shadow-[0_0_24px_rgba(57,255,20,0.2)]'
                      : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/70'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-bold">{item.name}</p>
                    {active ? (
                      <span className="rounded-full border border-[color:var(--rxv-primary)]/50 bg-[color:var(--rxv-primary)]/20 px-2 py-0.5 text-[10px] font-bold text-[color:var(--rxv-primary)]">
                        Ativo
                      </span>
                    ) : null}
                  </div>
                  <div className="rounded-lg border border-[color:var(--rxv-border)] bg-black/70 p-3">
                    <img src={item.src} alt={item.name} className="mx-auto h-[160px] w-[160px] object-contain" />
                  </div>
                  <p className="mt-2 min-h-[34px] text-xs text-[color:var(--rxv-muted)]">{item.description}</p>
                  <button
                    type="button"
                    className={`mt-2 w-full rounded-lg px-3 py-2 text-xs font-bold ${
                      active ? 'rxv-btn-secondary' : 'rxv-btn-primary'
                    }`}
                    onClick={() => applyIcon(item.id)}
                  >
                    {active ? 'Selecionado' : 'Selecionar esta versao'}
                  </button>
                </article>
              )
            })}
          </div>
        </section>

        <aside className="rxv-card p-4 xl:col-span-4">
          <h2 className="mb-3 text-base font-bold">Preview no card principal</h2>
          <div className="rounded-xl border border-[color:var(--rxv-border)] bg-[linear-gradient(100deg,var(--rxv-primary-soft,#15351b)_0%,var(--rxv-primary-soft-2,#0f2416)_55%,var(--rxv-primary-soft-3,#0d1d13)_100%)] p-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rxv-primary)]/45 bg-[color:var(--rxv-primary)]/14 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-[color:var(--rxv-primary)]">
              <span className="h-2 w-2 rounded-full bg-[color:var(--rxv-primary)]" />
              Ação rápida
            </span>
            <h3 className="mt-3 text-xl font-black tracking-tight">CRIAR NOVA RECEITA</h3>
            <p className="mt-1 text-xs text-[color:var(--rxv-muted)]">
              Esta area mostra como o icone escolhido aparece no card da Home.
            </p>
            <div className="mt-3 rounded-lg border border-[color:var(--rxv-border)] bg-black/70 p-3">
              <img src={selected.src} alt={selected.name} className="mx-auto h-[180px] w-[180px] object-contain" />
            </div>
          </div>
          <div className="mt-3 rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-3 py-2 text-xs text-[color:var(--rxv-muted)]">
            <p className="font-semibold text-[color:var(--rxv-text)]">Ativo: {selected.name}</p>
            <p>{savedAt ? `Atualizado as ${savedAt}` : 'Selecione uma versao para aplicar.'}</p>
          </div>
        </aside>
      </div>
    </ReceituarioChrome>
  )
}

