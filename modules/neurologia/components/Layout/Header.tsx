import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Brain, Moon, Sun, RotateCcw } from 'lucide-react'
import { Button } from '../UI/Button'
import { useUiStore } from '../../stores/uiStore'
import Logo from '../../../../components/Logo'

interface HeaderProps {
  onReset: () => void
  onGoHome: () => void
}

export function Header({ onReset, onGoHome }: HeaderProps) {
  const { theme, toggleTheme } = useUiStore()
  const navigate = useNavigate()

  const handleGoToVetiusHome = () => {
    navigate('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Logo Vetius - volta para homepage */}
          <button
            type="button"
            onClick={handleGoToVetiusHome}
            className="inline-flex items-center gap-2 hover:opacity-90 focus:outline-none transition-opacity p-2 rounded-lg hover:bg-white/10 group"
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

          {/* Separador */}
          <div className="h-6 w-px bg-white/20" />

          {/* Logo VetNeuro - volta para etapa 1 do wizard */}
          <button
            type="button"
            onClick={onGoHome}
            className="inline-flex items-center gap-3 hover:opacity-90 focus:outline-none transition-opacity"
            aria-label="Voltar ao início do wizard"
          >
            <div className="p-2 rounded-xl bg-gold/20">
              <Brain className="w-6 h-6 text-gold" />
            </div>
            <div className="text-left">
              <h1 className="text-lg font-semibold text-white">VetNeuro</h1>
              <p className="text-xs text-white/60">
                Assistente inteligente de neurologia veterinária
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
