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

export function Header({ onReset, onGoHome: _onGoHome, onBack, showBack }: HeaderProps) {
  const { theme, toggleTheme } = useUiStore()
  const navigate = useNavigate()

  const handleGoToVetiusHome = () => {
    navigate('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full lg:pl-80 border-b border-white/10 bg-background/85 backdrop-blur-md">
        <div className="w-full px-4 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBack && onBack && (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-white/10 text-white"
                aria-label="Voltar"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <button
              type="button"
              onClick={handleGoToVetiusHome}
              className="inline-flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition"
              aria-label="Voltar para a Home do Vetius"
              title="Voltar para a Home do Vetius"
            >
              <div className="h-8 w-8 flex items-center justify-center">
                <Logo size={30} className="drop-shadow-[0_0_10px_rgba(96,165,250,0.35)]" />
              </div>
              <span className="text-sm font-semibold text-white">Vetius</span>
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
      </div>
    </header>
  )
}
