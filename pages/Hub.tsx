import React from 'react'
import { useNavigate } from 'react-router-dom'
import { modules, type Module } from '../modules/registry'
import { ModuleCard } from '../components/ModuleCard'
import { ArrowLeft, Layers } from 'lucide-react'
import { AuroraBackground } from '../components/ui/aurora-background'

export function Hub() {
    const navigate = useNavigate()

    const premiumIds = ['neurologia', 'antibioticoterapia', 'transfusão-sanguinea', 'crivet', 'receituario-vet']
    /** Módulos em construção / experimentais — fora das grelhas principal e premium. */
    const developmentIds = ['peconhentos', 'plantao-vet', 'veteletrolitico', 'emergências-veterinarias']

    const activeModules = modules
        .filter((m) => !developmentIds.includes(m.id))
        .sort((a, b) => a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' }))

    const developmentModules = developmentIds
        .map((id) => modules.find((m) => m.id === id))
        .filter((m): m is Module => Boolean(m))

    return (
        <AuroraBackground className="w-full relative min-h-screen !h-auto" variant="solid">
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

                    {/* TODOS OS MÓDULOS ATIVOS */}
                    <div className="mb-20">
                        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

                    {/* DESENVOLVIMENTO — no final da página */}
                    {developmentModules.length > 0 ? (
                        <div className="border-t border-border/80 pt-14 sm:pt-16">
                            <div className="flex justify-center mb-8">
                                <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-500/35 bg-slate-500/10 px-3 py-1 text-sm font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-400">
                                    <span className="h-2 w-2 rounded-full bg-slate-500" />
                                    Desenvolvimento
                                </span>
                            </div>
                            <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto mb-8">
                                Módulos em evolução ou integração; acesso mantido para testes e feedback.
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


