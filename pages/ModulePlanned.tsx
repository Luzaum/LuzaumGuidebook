import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getModuleByRoute } from '../modules/registry'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react'

export function ModulePlanned() {
  const navigate = useNavigate()
  const location = useLocation()
  const module = getModuleByRoute(location.pathname)

  if (!module || module.status !== 'planned') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Módulo não encontrado</h2>
          <Button onClick={() => navigate('/')}>Voltar ao Hub</Button>
        </div>
      </div>
    )
  }

  const Icon = module.icon

  // Checklist genérico para módulos planejados
  const checklist = [
    'Definir requisitos funcionais',
    'Criar protótipos de interface',
    'Implementar cálculos e lógica',
    'Adicionar validações',
    'Testes de usabilidade',
    'Documentação',
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-xl font-semibold">{module.title}</h1>
        </div>
      </div>
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="p-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="mb-4 p-4 bg-surface/50 rounded-lg inline-block text-primary">
              <Icon className="h-12 w-12" />
            </div>
            <h2 className="text-3xl font-bold mb-2">{module.title}</h2>
            <p className="text-muted-foreground text-lg">{module.description}</p>
          </div>

          <div className="mb-8">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                ⚠️ Este módulo está em desenvolvimento
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-4">Checklist de Desenvolvimento</h3>
            <ul className="space-y-3">
              {checklist.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center">
            <Button onClick={() => navigate('/')} variant="primary">
              Voltar ao Hub
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}
