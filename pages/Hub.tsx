import React from 'react'
import { useNavigate } from 'react-router-dom'
import { modules } from '../modules/registry'
import { ModuleCard } from '../components/ModuleCard'
import { ArrowLeft, Layers } from 'lucide-react'

export function Hub() {
    const navigate = useNavigate()

    return (
        <div className="relative w-full overflow-x-hidden">
            {/* Background Decorativo */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-30 animate-pulse" />
                <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] opacity-20" />
            </div>

            <section className="py-10 sm:py-14 lg:py-16 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header da seção */}
                    <div className="flex items-center justify-between mb-8 sm:mb-10">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground active:text-foreground transition-colors duration-200 cursor-pointer group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                            Voltar ao início
                        </button>
                    </div>

                    <div className="text-center mb-10 sm:mb-12 lg:mb-16 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-semibold mb-4 sm:mb-6">
                            <Layers className="w-4 h-4" />
                            Todos os Módulos
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                            Ecossistema Clínico Completo
                        </h1>
                        <p className="text-base sm:text-lg text-muted-foreground">
                            Explore nossa suíte de ferramentas especializadas. De cálculos de emergência a guias
                            terapêuticos complexos, tudo em um só lugar.
                        </p>
                    </div>

                    {/* Grid de Módulos: 1 col on xs, 2 on sm, 3 on lg, 4 on xl */}
                    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {modules.map((module) => (
                            <div key={module.id} className="transform transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]">
                                <ModuleCard module={module} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
