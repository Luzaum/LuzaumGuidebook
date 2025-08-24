import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../utils/theme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-surface/50 backdrop-blur-md transition-all hover:bg-surface/80 focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-accent" />
      ) : (
        <Moon className="h-5 w-5 text-primary" />
      )}
    </button>
  )
}
