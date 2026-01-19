import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Moon, Sun, RotateCcw, ArrowLeft } from 'lucide-react'
import { Button } from '../UI/Button'
import { useUiStore } from '../../stores/uiStore'
import Logo from '../../../../components/Logo'

interface HeaderProps {
  onReset: () => void
  onGoHome: () => void
  onBack?: () => void
  showBack?: boolean
}

export function Header({ onReset, onGoHome, onBack, showBack }: HeaderProps) {
  const { theme, toggleTheme } = useUiStore()
  const navigate = useNavigate()

  const handleGoToVetiusHome = () => {
    navigate('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Voltar (Mobile/Desktop se showBack true) */}
          {showBack && onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-white/10 text-white mr-1 sm:mr-0"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}

          {/* Logo Vetius - volta para homepage (Oculto no mobile se tiver Voltar, ou mantido menor?) */}
          <button
            type="button"
            onClick={handleGoToVetiusHome}
            className={`inline-flex items-center gap-2 hover:opacity-90 focus:outline-none transition-opacity p-2 rounded-lg hover:bg-white/10 group ${showBack ? 'hidden sm:inline-flex' : ''}`}
            aria-label="Voltar para a Home do Vetius"
            title="Voltar para a Home do Vetius"
          >
            <div className="h-10 w-10 flex items-center justify-center">
              <Logo size={40} className="drop-shadow-[0_0_12px_rgba(96,165,250,0.35)]" />
            </div>
            <span className="text-sm font-semibold text-white hidden sm:inline group-hover:text-gold transition-colors">
              Vetius
            </span>
          </button>

          {/* Separador (Oculto no mobile se showBack) */}
          <div className={`h-6 w-px bg-white/20 ${showBack ? 'hidden sm:block' : ''}`} />

          {/* Logo NeuroVet */}
          <button
            type="button"
            onClick={onGoHome}
            className="inline-flex items-center gap-3 hover:opacity-90 focus:outline-none transition-opacity"
            aria-label="Voltar ao início do wizard"
          >
            <div className="h-10 w-10 flex items-center justify-center">
              <img
                src="/apps/NEURO.png"
                alt="NeuroVet Logo"
                className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(245,197,66,0.35)]"
              />
            </div>
            <div className="text-left hidden sm:block">
              <h1 className="text-lg font-semibold text-white">NeuroVet</h1>
              <p className="text-xs text-white/60">
                Neurologia
              </p>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className="p-2"
            aria-label={theme === 'dark' ? 'Tema Claro' : 'Tema Escuro'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            onClick={onReset}
            className="p-2"
            aria-label="Reiniciar exame"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
