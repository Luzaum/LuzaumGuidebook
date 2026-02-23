import React from 'react'
import { Card } from './ui/card'
import { CheckCircle, Lightbulb, GraduationCap } from 'lucide-react'

export function HowVetiusHelps() {
  const handleVerExemplos = (section: string) => {
    // Scroll para a seção de aplicativos
    const element = document.getElementById('aplicativos')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="py-16 bg-surface/30 dark:bg-surface/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Como o Vetius ajuda
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ferramentas e recursos desenvolvidos para otimizar sua prática
            veterinária
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8">
            <div className="mb-6 text-primary">
              <Lightbulb className="h-12 w-12" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Tomada de decisão</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Protocolos baseados em evidências</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Calculadoras clínicas precisas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Guias de conduta atualizados</span>
              </li>
            </ul>
            <button
              onClick={() => handleVerExemplos('calculadoras')}
              className="inline-block mt-6 text-primary hover:underline cursor-pointer"
            >
              Ver exemplos
            </button>
          </Card>
          <Card className="p-8">
            <div className="mb-6 text-primary">
              <CheckCircle className="h-12 w-12" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Padronização</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Checklists cirúrgicos</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Formulários de avaliação</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Protocolos anestésicos padronizados</span>
              </li>
            </ul>
            <button
              onClick={() => handleVerExemplos('avaliações')}
              className="inline-block mt-6 text-primary hover:underline cursor-pointer"
            >
              Ver exemplos
            </button>
          </Card>
          <Card className="p-8">
            <div className="mb-6 text-primary">
              <GraduationCap className="h-12 w-12" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Ensino rápido</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Fluxogramas didáticos</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Resumos objetivos</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Imagens e casos clínicos</span>
              </li>
            </ul>
            <button
              onClick={() => handleVerExemplos('guias')}
              className="inline-block mt-6 text-primary hover:underline cursor-pointer"
            >
              Ver exemplos
            </button>
          </Card>
        </div>
      </div>
    </section>
  )
}
