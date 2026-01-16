import React from 'react'
import { Brain, Moon, Sun, RotateCcw } from 'lucide-react'
import { Button } from '../UI/Button'
import { useDarkMode } from '../../hooks/useDarkMode'

interface HeaderProps {
  onReset: () => void
}

export function Header({ onReset }: HeaderProps) {
  const { theme, setTheme } = useDarkMode()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gold/20">
            <Brain className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">VetNeuro</h1>
            <p className="text-xs text-white/60">
              Assistente inteligente de neurologia veterinária
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2"
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
