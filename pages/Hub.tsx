import React from 'react'
import { useNavigate } from 'react-router-dom'
import { modules } from '../modules/registry'
import { ModuleCard } from '../components/ModuleCard'
import { ArrowLeft, Layers } from 'lucide-react'
import { AuroraBackground } from '../components/ui/aurora-background'

export function Hub() {
    const navigate = useNavigate()

    const premiumIds = ['neurologia', 'peconhentos', 'antibioticoterapia', 'transfusão-sanguinea', 'crivet', 'receituario-vet']
    const developmentIds = ['veteletrolitico']

    const premiumModules = modules.filter(m => premiumIds.includes(m.id))
    const freeModules = modules.filter(m => !premiumIds.includes(m.id))

    return (
        <AuroraBackground className="w-full relative min-h-screen">
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

                    {/* FREE MODULES SECTION */}
                    <div className="mb-14">
                        <div className="flex justify-center mb-8">
                            <span className="inline-flex items-center gap-1.5 rounded-md border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm font-bold uppercase tracking-widest text-green-600 dark:text-green-400">
                                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                Essencial (Grátis)
                            </span>
                        </div>
                        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {freeModules.map((module) => (
                                <div key={module.id} className="transform transition-all duration-300 hover:-translate-y-2 active:scale-[0.98]">
                                    <ModuleCard module={module} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PREMIUM MODULES SECTION */}
                    <div className="mb-20">
                        <div className="flex justify-center mb-10">
                            <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-base font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                                <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                                Premium
                            </span>
                        </div>
                        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {premiumModules.map((module) => (
                                <div
                                    key={module.id}
                                    className="transform transition-all duration-500 hover:-translate-y-2 active:scale-[0.98] rounded-xl hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] hover:ring-2 hover:ring-amber-500/50"
                                >
                                    <ModuleCard module={module} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </AuroraBackground>
    )
}
