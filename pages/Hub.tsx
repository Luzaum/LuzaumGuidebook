import React from 'react'
import { useNavigate } from 'react-router-dom'
import { modules, type Module } from '../modules/registry'
import { ModuleCard } from '../components/ModuleCard'
import { ArrowLeft } from 'lucide-react'
import { AuroraBackground } from '../components/ui/aurora-background'

export function Hub() {
    const navigate = useNavigate()

    const premiumIds = ['neurologia', 'antibioticoterapia', 'transfusão-sanguinea', 'crivet']
    /** Módulos em construção / experimentais — fora das grelhas principal e premium. */
    const developmentIds: string[] = []

    const activeModules = modules
        .filter((m) => !developmentIds.includes(m.id))
        .sort((a, b) => a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' }))

    const developmentModules = developmentIds
        .map((id) => modules.find((m) => m.id === id))
        .filter((m): m is Module => Boolean(m))

    return (
        <AuroraBackground className="w-full relative min-h-screen !h-auto" variant="solid">
            <section className="pt-3 sm:pt-5 pb-12 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header da seção */}
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground active:text-foreground transition-colors duration-200 cursor-pointer group font-medium"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                            Voltar ao início
                        </button>
                    </div>

                    <div className="text-center mb-5 sm:mb-7 max-w-2xl mx-auto">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1.5 sm:mb-2">
                            Ecossistema Clínico Completo
                        </h1>
                        <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                            Explore nossa suíte de ferramentas especializadas. De cálculos de emergência a guias
                            terapêuticos complexos, tudo em um só lugar.
                        </p>
                    </div>

                    {/* TODOS OS MÓDULOS ATIVOS */}
                    <div className="mb-14">
                        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {activeModules.map((module) => {
                                return (
                                    <div
                                        key={module.id}
                                        className="transform transition-all duration-500 hover:-translate-y-2 active:scale-[0.98] rounded-xl hover:shadow-[0_0_35px_rgba(14,165,233,0.7)] hover:ring-2 hover:ring-sky-500/70"
                                    >
                                        <ModuleCard module={module} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Ferramentas indisponíveis — no final da página */}
                    {developmentModules.length > 0 ? (
                        <div className="border-t border-border/80 pt-14 sm:pt-16">
                            <div className="flex justify-center mb-8">
                                <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-500/35 bg-slate-500/10 px-3 py-1 text-sm font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-400">
                                    <span className="h-2 w-2 rounded-full bg-slate-500" />
                                    Indisponíveis
                                </span>
                            </div>
                            <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto mb-8">
                                Estas ferramentas ainda não estão disponíveis para uso.
                            </p>
                            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 opacity-95">
                                {developmentModules.map((module) => (
                                    <div
                                        key={module.id}
                                        className="transform transition-all duration-500 hover:-translate-y-2 active:scale-[0.98] rounded-xl hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:ring-2 hover:ring-sky-500/50"
                                    >
                                        <ModuleCard module={module} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </section>
        </AuroraBackground>
    )
}


