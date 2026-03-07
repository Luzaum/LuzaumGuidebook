import React from 'react'

interface VetiusAppTopbarProps {
  isDark: boolean
  onMenuClick: () => void
  onHubClick: () => void
  onThemeToggle: () => void
  onHomeClick: () => void
  className?: string
  buttonClassName?: string
  logoClassName?: string
  logoTextClassName?: string
}

export function VetiusAppTopbar({
  isDark,
  onMenuClick,
  onHubClick,
  onThemeToggle,
  onHomeClick,
  className = '',
  buttonClassName = '',
  logoClassName = '',
  logoTextClassName = '',
}: VetiusAppTopbarProps) {
  return (
    <header className={`sticky top-0 z-[120] border-b backdrop-blur-md ${className}`}>
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 px-3 py-2 sm:px-4">
        <button
          type="button"
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition ${buttonClassName}`}
          onClick={onMenuClick}
          title="Abrir menu lateral"
          aria-label="Abrir menu lateral"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>

        <button
          type="button"
          className={`mx-auto inline-flex items-center gap-2 rounded-xl px-3 py-1.5 transition ${logoClassName}`}
          onClick={onHubClick}
          title="Ir para a homepage de apps do VETIUS"
          aria-label="Ir para a homepage de apps do VETIUS"
        >
          <img src="/apps/VETIUS.png" alt="Logo VETIUS" className="h-7 w-7 object-contain sm:h-8 sm:w-8" />
          <span className={`text-sm font-black tracking-[0.18em] sm:text-base ${logoTextClassName}`}>VETIUS</span>
        </button>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition ${buttonClassName}`}
            onClick={onThemeToggle}
            title={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
            aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            <span className="material-symbols-outlined text-[20px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
          </button>
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition ${buttonClassName}`}
            onClick={onHomeClick}
            title="Ir para a home do aplicativo"
            aria-label="Ir para a home do aplicativo"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
          </button>
        </div>
      </div>
    </header>
  )
}
