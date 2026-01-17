import React, { useEffect } from 'react'
import { modules } from '../modules/registry'
import { ModuleCard } from '../components/ModuleCard'

export function Home() {
  useEffect(() => {
    // Carregar script do Unicorn Studio apenas se ainda não foi inicializado
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false }
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js'
      script.onload = () => {
        if (!window.UnicornStudio.isInitialized) {
          UnicornStudio.init()
          window.UnicornStudio.isInitialized = true
        }
      }
      ;(document.head || document.body).appendChild(script)
    }
  }, [])

  return (
    <div className="relative w-full py-10">
      {/* Background Unicorn Studio */}
      <div 
        data-us-project="p7Ff6pfTrb5Gs59C7nLC" 
        className="absolute w-full h-full left-0 top-0 -z-10 opacity-[0.15]"
      />

      <div className="text-center mb-12 relative z-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Aplicativos Veterinários
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Acesse os mini-aplicativos especializados para auxiliar na sua
          prática clínica diária
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-fr relative z-0">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  )
}
