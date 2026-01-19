import React from 'react'
import {
    PawPrint,
    Bell,
    Settings,
    Menu,
    RefreshCcw,
    Download,
    Edit2,
    Droplets,
    Droplet,
    Beaker,
    FlaskConical,
    Clock,
    CalendarCheck,
    Info,
    Calculator,
    ChevronUp
} from 'lucide-react'

interface ResultProps {
    onNavigate: (screen: string) => void
}

export const Result: React.FC<ResultProps> = ({ onNavigate }) => {
    return (
        <div className="font-display bg-vet-bg-light dark:bg-vet-bg-dark text-slate-900 dark:text-white transition-colors duration-200 min-h-screen flex flex-col">
            {/* Top Navigation */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-vet-surface-hover px-6 py-4 bg-white dark:bg-[#1a120b] sticky top-0 z-50">
                <div className="flex items-center gap-4 text-slate-900 dark:text-white">
                    <div className="size-8 flex items-center justify-center text-vet-primary">
                        <PawPrint className="w-8 h-8" />
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">VetCalc Pro</h2>
                </div>
                <div className="hidden md:flex flex-1 justify-end gap-8">
                    <nav className="flex items-center gap-9">
                        <button onClick={() => onNavigate('hub')} className="text-slate-600 dark:text-gray-300 hover:text-vet-primary dark:hover:text-vet-primary text-sm font-semibold leading-normal transition-colors">Início</button>
                        <button onClick={() => onNavigate('configuration')} className="text-slate-600 dark:text-gray-300 hover:text-vet-primary dark:hover:text-vet-primary text-sm font-semibold leading-normal transition-colors">Calculadora</button>
                        <button className="text-vet-primary dark:text-vet-primary text-sm font-bold leading-normal border-b-2 border-vet-primary pb-1">Histórico</button>
                        <button onClick={() => onNavigate('library')} className="text-slate-600 dark:text-gray-300 hover:text-vet-primary dark:hover:text-vet-primary text-sm font-semibold leading-normal transition-colors">Guia Clínico</button>
                        <button className="text-slate-600 dark:text-gray-300 hover:text-vet-primary dark:hover:text-vet-primary text-sm font-semibold leading-normal transition-colors">Configurações</button>
                    </nav>
                    <div className="flex gap-3 items-center">
                        <button className="flex items-center justify-center rounded-lg size-10 hover:bg-slate-100 dark:hover:bg-vet-surface-hover text-slate-600 dark:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                        </button>
                        <button className="flex items-center justify-center rounded-lg size-10 hover:bg-slate-100 dark:hover:bg-vet-surface-hover text-slate-600 dark:text-white transition-colors">
                            <Settings className="w-5 h-5" />
                        </button>
                        <div
                            className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-slate-200 dark:border-vet-surface-hover"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD9oCA1MCJdYrzSc9zGTKa5751VNcFWCteWV1byPzIUrt7oo3xvGaUdGBJyLnRQbjCXDH5kcTqpj3SPl_Y0Iq_R3mAdZ50RiaQpfS7zl_LcSto7laVy8jJfw-4ProaM0gG_-6E2dS9hWYiLdr0--EUfyvocuyl9Yp0WhrLfiwAtw7NTC2-TJqijyCDjIhvDSlzN5TGQRGkNjMqMQb24Nn5OCQ9joskGTOHsIuS0-BZx6Vjb3IR4pm7SWkN1PX5RvQyqTxHMiq3aM7u1")' }}
                        ></div>
                    </div>
                </div>
                <button className="md:hidden flex items-center justify-center rounded-lg size-10 text-slate-900 dark:text-white">
                    <Menu className="w-6 h-6" />
                </button>
            </header>

            <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:p-8 lg:px-12">
                {/* Page Heading & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="bg-vet-primary/20 text-vet-primary text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Resultado Final</span>
                            <span className="text-slate-400 dark:text-[#8a7a6b] text-xs font-medium">Calculado em 24/10/2023 14:30</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] text-slate-900 dark:text-white">Plano de Infusão</h1>
                        <p className="text-slate-500 dark:text-vet-text-secondary text-base font-normal max-w-xl">
                            Confira abaixo os parâmetros calculados para a terapia de reposição eletrolítica.
                        </p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <button
                            onClick={() => onNavigate('identification')}
                            className="flex-1 md:flex-none h-12 px-6 rounded-lg border border-slate-300 dark:border-[#674d32] hover:bg-slate-100 dark:hover:bg-vet-surface-hover text-slate-700 dark:text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                        >
                            <RefreshCcw className="w-5 h-5" />
                            Reiniciar
                        </button>
                        <button className="flex-1 md:flex-none h-12 px-6 rounded-lg bg-vet-primary hover:bg-vet-primary-hover text-white font-bold text-sm shadow-lg shadow-vet-primary/20 flex items-center justify-center gap-2 transition-colors">
                            <Download className="w-5 h-5" />
                            Exportar PDF
                        </button>
                    </div>
                </div>

                {/* Patient Context Summary */}
                <div className="bg-white dark:bg-[#2d241b] border border-slate-200 dark:border-vet-surface-hover rounded-lg p-5 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-slate-100 dark:bg-vet-surface-hover flex items-center justify-center text-slate-600 dark:text-vet-text-secondary">
                            <PawPrint className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-500 dark:text-[#8a7a6b] uppercase tracking-wider mb-1">Resumo do Paciente</p>
                            <div className="flex flex-wrap items-center gap-2 text-sm md:text-base font-medium text-slate-900 dark:text-white">
                                <span>Canino (Thor)</span>
                                <span className="size-1 rounded-full bg-slate-300 dark:bg-[#674d32]"></span>
                                <span>12.5 kg</span>
                                <span className="size-1 rounded-full bg-slate-300 dark:bg-[#674d32]"></span>
                                <span className="text-red-500 dark:text-red-400 font-bold">Desidratação Severa (8%)</span>
                                <span className="size-1 rounded-full bg-slate-300 dark:bg-[#674d32]"></span>
                                <span className="text-vet-primary">Ringer Lactato</span>
                            </div>
                        </div>
                    </div>
                    <button className="text-vet-primary hover:text-vet-primary-hover text-sm font-bold flex items-center gap-1">
                        Editar Dados
                        <Edit2 className="w-4 h-4" />
                    </button>
                </div>

                {/* Main Stats / Results */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Stat Card 1 */}
                    <div className="relative overflow-hidden bg-white dark:bg-[#2d241b] rounded-xl p-6 border border-slate-200 dark:border-vet-surface-hover shadow-sm group hover:border-vet-primary/50 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Droplets className="w-24 h-24 text-vet-primary" />
                        </div>
                        <div className="flex flex-col h-full justify-between">
                            <div className="mb-4">
                                <p className="text-slate-500 dark:text-vet-text-secondary text-sm font-semibold mb-1">Taxa de Infusão</p>
                                <p className="text-slate-400 dark:text-[#8a7a6b] text-xs">Velocidade do fluxo</p>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl lg:text-5xl font-extrabold text-vet-primary tracking-tight">45</span>
                                <span className="text-xl font-bold text-slate-700 dark:text-white">mL/h</span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-vet-surface-hover">
                                <p className="text-xs text-slate-500 dark:text-[#8a7a6b] flex items-center gap-1">
                                    <Droplet className="w-4 h-4" />
                                    aprox. 15 gotas/min (macrogotas)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="relative overflow-hidden bg-white dark:bg-[#2d241b] rounded-xl p-6 border border-slate-200 dark:border-vet-surface-hover shadow-sm group hover:border-vet-primary/50 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Beaker className="w-24 h-24 text-vet-primary" />
                        </div>
                        <div className="flex flex-col h-full justify-between">
                            <div className="mb-4">
                                <p className="text-slate-500 dark:text-vet-text-secondary text-sm font-semibold mb-1">Volume Total</p>
                                <p className="text-slate-400 dark:text-[#8a7a6b] text-xs">Reposição + Manutenção</p>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl lg:text-5xl font-extrabold text-vet-primary tracking-tight">500</span>
                                <span className="text-xl font-bold text-slate-700 dark:text-white">mL</span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-vet-surface-hover">
                                <p className="text-xs text-slate-500 dark:text-[#8a7a6b] flex items-center gap-1">
                                    <FlaskConical className="w-4 h-4" />
                                    Deficit: 380ml + Manut: 120ml
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="relative overflow-hidden bg-white dark:bg-[#2d241b] rounded-xl p-6 border border-slate-200 dark:border-vet-surface-hover shadow-sm group hover:border-vet-primary/50 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Clock className="w-24 h-24 text-vet-primary" />
                        </div>
                        <div className="flex flex-col h-full justify-between">
                            <div className="mb-4">
                                <p className="text-slate-500 dark:text-vet-text-secondary text-sm font-semibold mb-1">Tempo Estimado</p>
                                <p className="text-slate-400 dark:text-[#8a7a6b] text-xs">Duração total da terapia</p>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl lg:text-5xl font-extrabold text-vet-primary tracking-tight">11<span className="text-2xl lg:text-3xl ml-1">h</span></span>
                                <span className="text-4xl lg:text-5xl font-extrabold text-vet-primary tracking-tight">06<span className="text-2xl lg:text-3xl ml-1">m</span></span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-vet-surface-hover">
                                <p className="text-xs text-slate-500 dark:text-[#8a7a6b] flex items-center gap-1">
                                    <CalendarCheck className="w-4 h-4" />
                                    Finaliza: Amanhã, 01:36 AM
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Clinical Warning */}
                <div className="mb-8 bg-blue-50 dark:bg-[#1e2329] border-l-4 border-blue-500 p-4 rounded-r-lg flex items-start gap-3">
                    <Info className="text-blue-500 mt-0.5 w-5 h-5" />
                    <div>
                        <p className="text-slate-800 dark:text-blue-100 font-bold text-sm">Nota Clínica</p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Recomenda-se monitorar os níveis de potássio a cada 4 horas devido ao volume elevado de reposição. Ajuste a taxa de fluxo se houver sinais de sobrecarga de volume.</p>
                    </div>
                </div>

                {/* Calculation Memory Section */}
                <div className="bg-white dark:bg-[#221a11] border border-slate-200 dark:border-vet-surface-hover rounded-xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-200 dark:border-vet-surface-hover flex justify-between items-center bg-slate-50/50 dark:bg-[#2d241b]">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Calculator className="text-vet-primary w-5 h-5" />
                                Memória de Cálculo
                            </h3>
                            <p className="text-slate-500 dark:text-[#8a7a6b] text-sm mt-1">Detalhamento passo a passo da fórmula utilizada</p>
                        </div>
                        <button className="text-slate-400 hover:text-vet-primary transition-colors">
                            <ChevronUp className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-vet-surface-hover">
                        {/* Step 1 */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 hover:bg-slate-50 dark:hover:bg-[#2d241b]/50 transition-colors">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-vet-primary uppercase tracking-wider mb-1">Passo 01</span>
                                <h4 className="text-sm font-bold text-slate-800 dark:text-white">Déficit de Hidratação</h4>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="text-slate-600 dark:text-vet-text-secondary text-sm">Cálculo do volume necessário para corrigir a desidratação atual baseada no peso corporal.</p>
                                <div className="bg-slate-100 dark:bg-[#1a120b] p-3 rounded-md font-mono text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-vet-surface-hover w-fit">
                                    Volume (L) = Peso (kg) × (% Desidratação / 100)
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-slate-500 dark:text-slate-500">Cálculo:</span>
                                    <span className="text-slate-800 dark:text-white font-medium">12.5 × 0.08 = <span className="text-vet-primary font-bold">1.0 L (1000 mL)</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 hover:bg-slate-50 dark:hover:bg-[#2d241b]/50 transition-colors">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-vet-primary uppercase tracking-wider mb-1">Passo 02</span>
                                <h4 className="text-sm font-bold text-slate-800 dark:text-white">Necessidade de Manutenção</h4>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="text-slate-600 dark:text-vet-text-secondary text-sm">Volume diário necessário para manter as funções fisiológicas normais (Fórmula de Holliday-Segar modif.).</p>
                                <div className="bg-slate-100 dark:bg-[#1a120b] p-3 rounded-md font-mono text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-vet-surface-hover w-fit">
                                    Manutenção = (Peso × 30) + 70 <span className="text-slate-400 text-xs ml-2">// Para cães {'>'} 2kg</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-slate-500 dark:text-slate-500">Cálculo:</span>
                                    <span className="text-slate-800 dark:text-white font-medium">(12.5 × 30) + 70 = <span className="text-vet-primary font-bold">445 mL/dia</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 hover:bg-slate-50 dark:hover:bg-[#2d241b]/50 transition-colors">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-vet-primary uppercase tracking-wider mb-1">Passo 03</span>
                                <h4 className="text-sm font-bold text-slate-800 dark:text-white">Volume Total & Taxa</h4>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="text-slate-600 dark:text-vet-text-secondary text-sm">Soma do déficit e manutenção distribuídos pelo período de tratamento.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-slate-50 dark:bg-[#2d241b] p-3 rounded border border-slate-100 dark:border-vet-surface-hover">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">Volume Total</p>
                                        <p className="text-sm text-slate-800 dark:text-white">1000 mL (Déficit) + 445 mL (Manut.) = <span className="font-bold text-vet-primary">1445 mL</span></p>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-[#2d241b] p-3 rounded border border-slate-100 dark:border-vet-surface-hover">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">Taxa Horária (24h)</p>
                                        <p className="text-sm text-slate-800 dark:text-white">1445 mL / 24h = <span className="font-bold text-vet-primary">60.2 mL/h</span></p>
                                    </div>
                                </div>
                                <p className="text-xs text-orange-600 dark:text-orange-400 mt-1 italic">*Nota: O resultado final foi ajustado para considerar perdas contínuas de 55 mL.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            {/* Simple Footer */}
            <footer className="border-t border-slate-200 dark:border-vet-surface-hover mt-12 py-8 bg-white dark:bg-[#1a120b]">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <p className="text-slate-400 dark:text-[#674d32] text-sm mb-2">VetCalc Pro v2.4.0 • Desenvolvido para auxílio veterinário profissional.</p>
                    <p className="text-slate-300 dark:text-vet-surface-hover text-xs">Os cálculos devem ser sempre verificados por um médico veterinário responsável.</p>
                </div>
            </footer>
        </div>
    )
}
