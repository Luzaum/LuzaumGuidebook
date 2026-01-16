import React from 'react'
import { modules } from '../modules/registry'
import { ModuleCard } from '../components/ModuleCard'

export function Home() {
  return (
    <div className="w-full py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Aplicativos Veterinários
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Acesse os mini-aplicativos especializados para auxiliar na sua
          prática clínica diária
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-fr">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  )
}
