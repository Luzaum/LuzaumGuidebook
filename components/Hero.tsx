import React from 'react'
import { Button } from './ui/button'
import { ArrowRight, ExternalLink } from 'lucide-react'

interface HeroProps {
  onExploreApps?: () => void
}

export function Hero({ onExploreApps }: HeroProps) {
  const handleExploreApps = () => {
    if (onExploreApps) {
      onExploreApps()
    }
  }

  const handleVerNovidades = () => {
    // Scroll para a seção de novidades ou abrir modal
    const element = document.getElementById('aplicativos')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/80 dark:from-primary/10 dark:to-background/90"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/20 dark:bg-primary/10 blur-[100px] opacity-70"></div>
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px] opacity-60"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-60 h-60 md:w-78 md:h-78 mb-6 drop-shadow-lg relative">
            <img
              src="https://uploadthingy.s3.us-west-1.amazonaws.com/uqx8z1Pxb4rR6VJkom5v9g/image.png"
              alt="Vetius Logo"
              className="w-full h-full object-contain animate-[pulse_3s_ease-in-out_infinite]"
              style={{
                filter: 'contrast(1.1) brightness(1.05)',
                mixBlendMode: 'multiply'
              }}
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Vetius
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl text-muted-foreground mb-8">
            Seu companheiro clínico, anestésico e cirúrgico — sempre que
            precisar, na palma das mãos.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="h-5 w-5" />}
              iconPosition="right"
              onClick={handleExploreApps}
            >
              Explorar aplicativos
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={<ExternalLink className="h-5 w-5" />}
              iconPosition="right"
              onClick={handleVerNovidades}
            >
              Ver novidades
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="bg-surface-2/70 backdrop-blur-md rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">+10</div>
            <div className="text-sm text-muted-foreground">Mini-apps</div>
          </div>
          <div className="bg-surface-2/70 backdrop-blur-md rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">100%</div>
            <div className="text-sm text-muted-foreground">
              Protocolos atualizados
            </div>
          </div>
          <div className="bg-surface-2/70 backdrop-blur-md rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">Foco</div>
            <div className="text-sm text-muted-foreground">Em cães e gatos</div>
          </div>
        </div>
      </div>
    </section>
  )
}
