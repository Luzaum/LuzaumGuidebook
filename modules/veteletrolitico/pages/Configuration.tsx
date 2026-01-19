import React, { useState } from 'react'
import {
    Stethoscope,
    Calculator,
    PawPrint,
    ChevronDown,
    AlertTriangle,
    Droplet,
    ArrowRight,
    HelpCircle,
    Bell,
    ShieldAlert,
    Info
} from 'lucide-react'

interface ConfigurationProps {
    onNavigate: (screen: string) => void
}

export const Configuration: React.FC<ConfigurationProps> = ({ onNavigate }) => {
    const [method, setMethod] = useState<'syringe' | 'bag'>('syringe')
    const [syringeVolume, setSyringeVolume] = useState('20')
    const [ion, setIon] = useState('K')

    return (
        <div className="font-display bg-vet-bg-light dark:bg-vet-bg-dark text-slate-900 dark:text-white antialiased min-h-screen flex flex-col selection:bg-vet-primary selection:text-white">
            {/* Top Navbar */}
            <header className="sticky top-0 z-40 w-full border-b border-vet-border-brown bg-vet-bg-dark/95 backdrop-blur supports-[backdrop-filter]:bg-vet-bg-dark/60">
                <div className="flex h-16 items-center justify-between px-4 md:px-8 max-w-[1200px] mx-auto w-full">
                    <div className="flex items-center gap-4 text-white">
                        <div className="size-8 text-vet-primary">
                            <Stethoscope className="w-8 h-8" />
                        </div>
                        <h2 className="text-white text-xl font-bold tracking-tight">VetCalc Pro</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <button onClick={() => onNavigate('hub')} className="text-white/70 hover:text-white text-sm font-medium transition-colors">Início</button>
                        <button onClick={() => onNavigate('identification')} className="text-white/70 hover:text-white text-sm font-medium transition-colors">Pacientes</button>
                        <button className="text-white text-sm font-bold">Calculadoras</button>
                        <button className="text-white/70 hover:text-white text-sm font-medium transition-colors">Histórico</button>
                    </nav>
                    <div className="flex items-center gap-3">
                        <button className="flex size-9 items-center justify-center rounded-lg bg-vet-surface-dark hover:bg-vet-surface-hover text-white transition-colors">
                            <Bell className="w-5 h-5" />
                        </button>
                        <button className="flex size-9 items-center justify-center rounded-lg bg-vet-surface-dark hover:bg-vet-surface-hover text-white transition-colors">
                            <HelpCircle className="w-5 h-5" />
                        </button>
                        <div
                            className="ml-2 bg-center bg-no-repeat bg-cover rounded-full size-9 ring-2 ring-vet-primary/50"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuApO4ZBoz6y2eRV3T6lMvdNf2oZyjvLHcFIIkYK1UaW7UDvDvGiTm9gxmJSH2gwUMAzbEKfsTtz5Obxn9iGxgj-LuNakaQZR37dTXqLSVdK7HFDqPDg80ZlQXXqpVnFWsEx1xz_l3Zr69epW27t2C_7lyizdgxkwTjfta_Gr7Uq1Ghp_of9qPGmVF0ewi0TOqpgcNv_dxOlvGrjJFdd_9Cx50aFYV8blmWD7l3N7iwMTkZCOTmss-V8LCTlfH28Zf_cOKaIaqdYEz2r")' }}
                        ></div>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 md:px-8 py-8">
                {/* Breadcrumbs */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    <button onClick={() => onNavigate('hub')} className="text-vet-primary hover:text-vet-primary-hover text-sm font-medium transition-colors flex items-center gap-1">
                        <Calculator className="w-4 h-4" />
                        Calculadora de Infusão
                    </button>
                    <span className="text-white/20 text-sm font-medium">/</span>
                    <span className="text-white text-sm font-medium">Seção 2: Configuração</span>
                </div>

                {/* Page Heading */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div className="flex flex-col gap-2 max-w-2xl">
                        <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight">Configuração de Reposição</h1>
                        <p className="text-white/60 text-base leading-relaxed">
                            Defina o íon alvo, método de administração e fluido base. O sistema validará a compatibilidade e a taxa máxima de infusão automaticamente.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 bg-vet-surface-dark px-3 py-1.5 rounded-lg border border-vet-border-brown">
                        <PawPrint className="text-vet-primary w-4 h-4" />
                        <span className="text-sm font-medium text-white/80">Paciente: <span className="text-white">Thor (Golden Ret.)</span></span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Main Form */}
                    <div className="lg:col-span-8 flex flex-col gap-8">

                        {/* Step 1: Ion Selection */}
                        <section className="bg-vet-surface-dark rounded-xl p-6 border border-vet-border-brown/50">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="flex items-center justify-center size-8 rounded-full bg-vet-primary/20 text-vet-primary font-bold text-sm">1</span>
                                <h3 className="text-white text-lg font-bold">Seleção de Íon & Nível Atual</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Ion Select */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-white/80 text-sm font-medium">Íon Alvo</label>
                                    <div className="relative">
                                        <select
                                            value={ion}
                                            onChange={(e) => setIon(e.target.value)}
                                            className="w-full h-12 px-4 rounded-lg bg-vet-input-bg border-vet-border-brown text-white focus:border-vet-primary focus:ring-1 focus:ring-vet-primary appearance-none cursor-pointer"
                                        >
                                            <option value="K">Potássio (K+)</option>
                                            <option value="Na">Sódio (Na+)</option>
                                            <option value="Mg">Magnésio (Mg2+)</option>
                                            <option value="Cl">Cloro (Cl-)</option>
                                            <option value="Ca">Cálcio (Ca2+)</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                                            <ChevronDown className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <span className="text-xs text-white/40">Íon principal a ser calculado na reposição.</span>
                                </div>

                                {/* Current Level Input */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-white/80 text-sm font-medium">Nível Atual do Paciente</label>
                                    <div className="relative">
                                        <input
                                            className="w-full h-12 pl-4 pr-16 rounded-lg bg-vet-input-bg border-vet-border-brown text-white focus:border-vet-primary focus:ring-1 focus:ring-vet-primary placeholder:text-white/20"
                                            placeholder="0.0"
                                            step="0.1"
                                            type="number"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 text-sm font-medium">
                                            mEq/L
                                        </div>
                                    </div>
                                    <span className="text-xs text-vet-primary flex items-center gap-1">
                                        <AlertTriangle className="w-[14px] h-[14px]" />
                                        Hipocalemia severa detectada no histórico
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Step 2: Method & Volume */}
                        <section className="bg-vet-surface-dark rounded-xl p-6 border border-vet-border-brown/50">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="flex items-center justify-center size-8 rounded-full bg-vet-primary/20 text-vet-primary font-bold text-sm">2</span>
                                <h3 className="text-white text-lg font-bold">Método de Administração</h3>
                            </div>

                            {/* Toggle Switch */}
                            <div className="flex p-1 bg-vet-input-bg rounded-lg mb-6 w-full md:w-fit border border-vet-border-brown">
                                <label className="flex-1 md:flex-none cursor-pointer">
                                    <input
                                        type="radio"
                                        name="method"
                                        className="peer sr-only"
                                        checked={method === 'syringe'}
                                        onChange={() => setMethod('syringe')}
                                    />
                                    <div className="px-6 py-2 rounded text-sm font-bold text-center text-white/60 transition-all peer-checked:bg-vet-primary peer-checked:text-white peer-checked:shadow-sm">
                                        Seringa (Bolus)
                                    </div>
                                </label>
                                <label className="flex-1 md:flex-none cursor-pointer">
                                    <input
                                        type="radio"
                                        name="method"
                                        className="peer sr-only"
                                        checked={method === 'bag'}
                                        onChange={() => setMethod('bag')}
                                    />
                                    <div className="px-6 py-2 rounded text-sm font-bold text-center text-white/60 transition-all peer-checked:bg-vet-primary peer-checked:text-white peer-checked:shadow-sm">
                                        Bolsa (Infusão)
                                    </div>
                                </label>
                            </div>

                            {/* Volume Grid */}
                            <div className="flex flex-col gap-3">
                                <label className="text-white/80 text-sm font-medium">Volume da Seringa</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {['5', '10', '20', '60'].map((vol) => (
                                        <label key={vol} className="cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="volume"
                                                className="peer sr-only"
                                                checked={syringeVolume === vol}
                                                onChange={() => setSyringeVolume(vol)}
                                            />
                                            <div className="h-14 rounded-lg border border-vet-border-brown bg-vet-input-bg hover:border-vet-primary/50 flex flex-col items-center justify-center transition-all group-hover:bg-vet-input-bg/80 peer-checked:bg-vet-primary peer-checked:text-white peer-checked:border-vet-primary">
                                                <span className="font-bold text-lg">{vol}<span className="text-xs font-normal ml-0.5">ml</span></span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Step 3: Fluid Selection */}
                        <section className="bg-vet-surface-dark rounded-xl p-6 border border-vet-border-brown/50">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="flex items-center justify-center size-8 rounded-full bg-vet-primary/20 text-vet-primary font-bold text-sm">3</span>
                                <h3 className="text-white text-lg font-bold">Fluido de Diluição</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                                <div className="flex flex-col gap-2 w-full">
                                    <label className="text-white/80 text-sm font-medium">Fluido Base</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                                            <Droplet className="w-5 h-5" />
                                        </div>
                                        <select className="w-full h-14 pl-12 pr-10 rounded-lg bg-vet-input-bg border-vet-border-brown text-white focus:border-vet-primary focus:ring-1 focus:ring-vet-primary appearance-none cursor-pointer text-base">
                                            <option value="nacl">NaCl 0.9% (Fisiológico)</option>
                                            <option value="rl">Ringer Lactato</option>
                                            <option value="g5">Glicose 5%</option>
                                            <option value="nacl045">NaCl 0.45%</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                                            <ChevronDown className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-start gap-3">
                                    <Info className="text-blue-400 mt-0.5 w-5 h-5" />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-blue-100 text-sm font-medium">Dica Clínica</p>
                                        <p className="text-blue-200/70 text-xs">Evite soluções contendo potássio (ex: Ringer) se o nível do paciente for {'>'} 5.5 mEq/L.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Summary & Warnings */}
                    <div className="lg:col-span-4 flex flex-col gap-6">

                        {/* Safety Warning Card */}
                        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <AlertTriangle className="text-8xl text-yellow-500" />
                            </div>
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className="flex items-center gap-2 text-yellow-500">
                                    <ShieldAlert className="w-5 h-5" />
                                    <span className="font-bold text-sm tracking-wide uppercase">Aviso de Segurança</span>
                                </div>
                                {/* Tooltip Trigger */}
                                <div className="group relative inline-block">
                                    <button className="text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-full p-1 transition-colors">
                                        <HelpCircle className="w-5 h-5" />
                                    </button>
                                    {/* Tooltip/Popup */}
                                    <div className="invisible group-hover:visible absolute right-0 w-72 p-4 mt-2 bg-vet-surface-dark border border-vet-border-brown rounded-xl shadow-2xl opacity-0 transition-all duration-300 z-50 transform -translate-y-2 origin-top-right">
                                        <h4 className="text-white font-bold mb-2 text-sm flex items-center gap-2">
                                            <Calculator className="text-vet-primary w-4 h-4" />
                                            Fisiologia do Potássio
                                        </h4>
                                        <p className="text-xs text-white/70 leading-relaxed mb-3">
                                            A administração rápida de K+ pode levar a arritmias cardíacas fatais. A taxa máxima recomendada é de 0.5 mEq/kg/h.
                                        </p>
                                        <div className="bg-vet-bg-dark p-2 rounded border border-vet-border-brown">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-white/50">Taxa Max:</span>
                                                <span className="text-white font-mono">0.5 mEq/kg/h</span>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="text-white/50">Compatibilidade:</span>
                                                <span className="text-green-400 font-mono">NaCl 0.9% OK</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-yellow-100 font-bold text-lg mb-2 relative z-10">Velocidade de Infusão</h4>
                            <p className="text-yellow-200/70 text-sm leading-relaxed relative z-10">
                                Certifique-se de monitorar o ECG durante a infusão se a velocidade exceder 0.3 mEq/kg/h. O cálculo a seguir considerará este limite de segurança.
                            </p>
                        </div>

                        {/* Summary Preview */}
                        <div className="bg-vet-surface-dark rounded-xl p-5 border border-vet-border-brown">
                            <h4 className="text-white/50 text-xs font-bold uppercase tracking-wider mb-4">Resumo da Configuração</h4>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                    <span className="text-white/70 text-sm">Íon Selecionado</span>
                                    <span className="text-vet-primary font-bold">Potássio (K+)</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                    <span className="text-white/70 text-sm">Nível Atual</span>
                                    <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded text-sm">A aguardar input...</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                    <span className="text-white/70 text-sm">Método</span>
                                    <span className="text-white font-medium">Seringa (20ml)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/70 text-sm">Fluido</span>
                                    <span className="text-white font-medium">NaCl 0.9%</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 mt-auto">
                            <button
                                onClick={() => onNavigate('result')}
                                className="w-full h-14 bg-vet-primary hover:bg-vet-primary-hover text-white font-bold rounded-lg shadow-lg shadow-vet-primary/20 transition-all flex items-center justify-center gap-2 group"
                            >
                                Próximo: Calcular Infusão
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => onNavigate('identification')}
                                className="w-full h-12 bg-transparent border border-vet-border-brown text-white/60 hover:text-white hover:bg-white/5 font-medium rounded-lg transition-colors"
                            >
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
