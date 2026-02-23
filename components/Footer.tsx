import React from 'react'

export function Footer() {
  const handleLinkClick = (section: string) => {
    // Scroll para a seção correspondente ou mostrar modal
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Para links que não têm seção específica, mostrar alerta
      alert(`${section} - Funcionalidade em desenvolvimento`)
    }
  }

  return (
    <footer className="bg-surface dark:bg-surface/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/apps/VETIUS.png"
                alt="Vetius Logo"
                className="h-8 w-auto mix-blend-multiply dark:mix-blend-screen"
              />
              <span className="font-semibold">Vetius</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Seu companheiro clínico, anestésico e cirúrgico — sempre que
              precisar, na palma das mãos.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Aplicativos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleLinkClick('calculadoras')}
                  className="text-muted-foreground hover:text-primary cursor-pointer"
                >
                  Calculadoras
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('emergências')}
                  className="text-muted-foreground hover:text-primary cursor-pointer"
                >
                  Emergências
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('guias')}
                  className="text-muted-foreground hover:text-primary cursor-pointer"
                >
                  Guias
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('avaliações')}
                  className="text-muted-foreground hover:text-primary cursor-pointer"
                >
                  Avaliações
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleLinkClick('artigos')}
                  className="text-muted-foreground hover:text-primary cursor-pointer"
                >
                  Artigos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('atualizacoes')}
                  className="text-muted-foreground hover:text-primary cursor-pointer"
                >
                  Atualizações
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('guia-uso')}
                  className="text-muted-foreground hover:text-primary cursor-pointer"
                >
                  Guia de uso
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('faq')}
                  className="text-muted-foreground hover:text-primary cursor-pointer"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleLinkClick('suporte')}
                  className="text-muted-foreground hover:text-primary cursor-pointer"
                >
                  Suporte
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('feedback')}
                  className="text-muted-foreground hover:text-primary cursor-pointer"
                >
                  Feedback
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('parcerias')}
                  className="text-muted-foreground hover:text-primary cursor-pointer"
                >
                  Parcerias
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Vetius. Todos os direitos reservados.
          </div>
          <div className="flex gap-4 text-sm">
            <button
              onClick={() => handleLinkClick('termos')}
              className="text-muted-foreground hover:text-primary cursor-pointer"
            >
              Termos
            </button>
            <button
              onClick={() => handleLinkClick('privacidade')}
              className="text-muted-foreground hover:text-primary cursor-pointer"
            >
              Privacidade
            </button>
            <button
              onClick={() => handleLinkClick('cookies')}
              className="text-muted-foreground hover:text-primary cursor-pointer"
            >
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
