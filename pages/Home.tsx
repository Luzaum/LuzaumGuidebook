import React, { useRef } from 'react'
import { modules } from '../modules/registry'
import { ModuleCard } from '../components/ModuleCard'
import { RevealWaveImage } from '../components/ui/reveal-wave-image'
import { ArrowRight, BookOpen, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'

export function Home() {
  const modulesRef = useRef<HTMLDivElement>(null)

  const scrollToModules = () => {
    modulesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Background Decorativo Global - Mantido sutil */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-40 animate-pulse" />
      </div>

      {/* HERO SECTION - Full Width */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center overflow-hidden">

        {/* Background Interativo - RevealWaveImage */}
        <div className="absolute inset-0 z-0">
          <RevealWaveImage
            src="/HERO.png"
            waveSpeed={0.25}
            waveFrequency={0.5}
            waveAmplitude={0.3}
            revealRadius={0.3}
            revealSoftness={0.6}
            pixelSize={1}
            mouseRadius={0.2}
            imageShiftX={0.2}
            zoom={1.1}
            className="w-full h-full object-cover"
          />
          {/* Overlay Gradiente Extra */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent z-[1] pointer-events-none" />
        </div>

        {/* Conteúdo em Card Flutuante na Esquerda - Pointer Events Controlado */}
        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 pointer-events-none h-full flex items-center">

          <div className="max-w-xl mr-auto p-8 md:p-10 rounded-3xl animate-in fade-in slide-in-from-left duration-700
                            bg-blue-950/20 dark:bg-blue-900/10 backdrop-blur-md border border-blue-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">

            {/* Título - Interativo */}
            <div className="pointer-events-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6 drop-shadow-sm">
                Medicina Veterinária de <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  Alta Precisão
                </span>
              </h1>

              <p className="text-lg md:text-xl text-blue-50 dark:text-blue-100/90 leading-relaxed font-medium mb-8 drop-shadow-sm">
                Ferramentas de decisão clínica baseadas nas últimas evidências de
                <strong className="text-white"> Plumb’s, Nelson & Couto, Ettinger, BSAVA, ACVIM</strong> e muito mais!
                Torne seu dia a dia mais eficiente, aprendendo muito no processo!
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={scrollToModules}
                  className="w-full sm:w-auto h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Explorar Módulos
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto h-14 px-8 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-sm">
                  Saiba Mais
                </button>
              </div>
            </div>

            {/* Footer do Card - Interativo */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-6 text-sm font-medium text-blue-100/80 pointer-events-auto">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Validado por Especialistas</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span>Literatura Atualizada</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MÓDULOS SECTION */}
      <section ref={modulesRef} className="py-24 bg-surface-2/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ecossistema Clínico Completo
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore nossa suíte de ferramentas especializadas. De cálculos de emergência a guias terapêuticos complexos,
              tudo em um só lugar.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {modules.map((module) => (
              <div key={module.id} className="transform transition-all duration-300 hover:-translate-y-2">
                <ModuleCard module={module} />
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={scrollToModules}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors cursor-pointer"
            >
              Ver todos os recursos <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
