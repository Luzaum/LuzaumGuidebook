import React from 'react'
import { Card } from './ui/card'
import {
  Calculator,
  Heart,
  BookOpen,
  Activity,
  Syringe,
  Scissors,
  Pill,
  Microscope,
  Brain,
  Apple,
  Droplets,
  TestTube,
  Zap,
  Cat,
} from 'lucide-react'

const miniApps: Array<{
  id: string
  title: string
  description: string
  icon: React.ReactNode
  implemented: boolean
}> = [
  {
    id: 'calculadora-energetica',
    title: 'Calculadora Energética',
    description: 'Cálculo de necessidades energéticas para cães e gatos',
    icon: <Calculator className="h-6 w-6" />,
    implemented: true,
  },
  {
    id: 'fluidoterapia',
    title: 'Fluidoterapia',
    description: 'Cálculo de fluidoterapia com protocolos específicos',
    icon: <Droplets className="h-6 w-6" />,
    implemented: true,
  },
  {
    id: 'transfusão-sanguinea',
    title: 'Transfusão Sanguínea',
    description: 'Cálculo de transfusão sanguínea e compatibilidade',
    icon: <Heart className="h-6 w-6" />,
    implemented: true,
  },
  {
    id: 'emergências-veterinarias',
    title: 'Emergências Veterinárias',
    description: 'Protocolos de emergência e primeiros socorros',
    icon: <Zap className="h-6 w-6" />,
    implemented: true,
  },
  {
    id: 'escalas-dor',
    title: 'Escalas de Dor',
    description: 'Escalas de dor e protocolos de analgesia',
    icon: <Cat className="h-6 w-6" />,
    implemented: true,
  },
  {
    id: 'hemogasometria',
    title: 'Hemogasometria',
    description: 'Interpretação de hemogasometria arterial e venosa',
    icon: <TestTube className="h-6 w-6" />,
    implemented: true,
  },
  {
    id: 'anestesia',
    title: 'Anestesia',
    description: 'Drogas, CRIs, ASA',
    icon: <Syringe className="h-6 w-6" />,
    implemented: false,
  },
  {
    id: 'cirurgia',
    title: 'Cirurgia',
    description: 'Checklists, tempos, antibioticoprofilaxia',
    icon: <Scissors className="h-6 w-6" />,
    implemented: false,
  },
  {
    id: 'antimicrobianos',
    title: 'Antimicrobianos',
    description: 'Escolha guiada/ACVIM',
    icon: <Pill className="h-6 w-6" />,
    implemented: false,
  },
  {
    id: 'neurologia',
    title: 'Neurologia',
    description: 'Localização didática',
    icon: <Brain className="h-6 w-6" />,
    implemented: false,
  },
]

interface MiniAppGridProps {
  onAppClick?: (appId: string) => void
}

export function MiniAppGrid({ onAppClick }: MiniAppGridProps) {
  const handleAppClick = (appId: string, implemented: boolean) => {
    if (!implemented) {
      alert('Este aplicativo ainda não foi implementado.')
      return
    }

    if (onAppClick) {
      onAppClick(appId)
    }
  }

  return (
    <section id="aplicativos" className="py-16 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 dark:bg-primary/10 blur-[100px] opacity-50"></div>
      </div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Aplicativos Veterinários
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Acesse 10 mini-aplicativos especializados para auxiliar na sua
            prática clínica diária
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {miniApps.map((app) => (
            <div key={app.id}>
              <Card
                className="relative overflow-hidden p-6 cursor-pointer group hover:border-primary/50 transition-all duration-300"
                onClick={() => handleAppClick(app.id, app.implemented)}
              >
                <div className="mb-4 p-3 bg-surface/50 rounded-lg inline-block text-primary group-hover:scale-110 transition-transform duration-300">
                  {app.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{app.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {app.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary text-sm font-medium">
                    {app.implemented ? 'Abrir' : 'Em breve'}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {app.implemented ? 'Ver guia' : 'Em desenvolvimento'}
                  </span>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
