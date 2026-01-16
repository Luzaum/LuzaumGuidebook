import React, { useEffect, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { Menu, Search, X } from 'lucide-react'
import { Button } from './ui/button'

interface NavbarProps {
  onAppClick?: () => void
}

export function Navbar({ onAppClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavLinkClick = (sectionId: string) => {
    setIsMenuOpen(false)
    
    if (sectionId === 'aplicativos' && onAppClick) {
      onAppClick()
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleComecarAgora = () => {
    if (onAppClick) {
      onAppClick()
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2 bg-background/80 backdrop-blur-lg shadow-md'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/apps/VETIUS.png"
            alt="Vetius Logo"
            className="h-[1200px] w-auto mix-blend-multiply dark:mix-blend-screen object-contain"
          />
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Vetius
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => handleNavLinkClick('aplicativos')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Aplicativos
          </button>
          <button
            onClick={() => handleNavLinkClick('guias')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Guias
          </button>
          <button
            onClick={() => handleNavLinkClick('emergencias')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Emergências
          </button>
          <button
            onClick={() => handleNavLinkClick('calculadoras')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Calculadoras
          </button>
          <button
            onClick={() => handleNavLinkClick('avaliacoes')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Avaliações
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            className="p-2 rounded-full hover:bg-surface/50 transition-colors"
            aria-label="Buscar"
          >
            <Search className="h-5 w-5 text-foreground" />
          </button>
          <ThemeToggle />
          <Button variant="primary" onClick={handleComecarAgora}>
            Começar agora
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-surface/50 transition-colors"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg p-4">
          <nav className="flex flex-col gap-4">
            <button
              onClick={() => handleNavLinkClick('aplicativos')}
              className="text-foreground hover:text-primary p-2 transition-colors text-left"
            >
              Aplicativos
            </button>
            <button
              onClick={() => handleNavLinkClick('guias')}
              className="text-foreground hover:text-primary p-2 transition-colors text-left"
            >
              Guias
            </button>
            <button
              onClick={() => handleNavLinkClick('emergencias')}
              className="text-foreground hover:text-primary p-2 transition-colors text-left"
            >
              Emergências
            </button>
            <button
              onClick={() => handleNavLinkClick('calculadoras')}
              className="text-foreground hover:text-primary p-2 transition-colors text-left"
            >
              Calculadoras
            </button>
            <button
              onClick={() => handleNavLinkClick('avaliacoes')}
              className="text-foreground hover:text-primary p-2 transition-colors text-left"
            >
              Avaliações
            </button>
            <div className="pt-2 border-t border-border">
              <Button variant="primary" className="w-full" onClick={handleComecarAgora}>
                Começar agora
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
