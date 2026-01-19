import React, { useState } from 'react'
import {
    Calculator,
    BookOpen,
    History,
    Settings,
    PlusCircle,
    Menu,
    Search,
    FlaskConical,
    Wind,
    Droplets,
    HeartPulse,
    Activity,
    ChevronRight,
    ArrowRight,
    Share2,
    Bookmark,
    Microscope,
    MonitorPlay
} from 'lucide-react'

interface LibraryProps {
    onNavigate: (screen: string) => void
}

export const Library: React.FC<LibraryProps> = ({ onNavigate }) => {
    const [selectedCondition, setSelectedCondition] = useState('hipercalemia')

    return (
        <div className="font-display bg-vet-bg-light dark:bg-vet-bg-dark text-vet-text-main h-screen overflow-hidden flex">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 flex flex-col justify-between bg-vet-surface-dark border-r border-[#483623] h-full hidden md:flex">
                <div className="flex flex-col p-4 gap-6">
                    {/* Brand */}
                    <div className="flex gap-3 items-center px-2">
                        <div
                            className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 shrink-0 shadow-lg ring-2 ring-vet-primary/20"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBUF6dnNi7nE1Vn-cjICMKeua-Qrhe-YGmLvrmIAPNXBbj8uAxPlaRHq1j_k3cXqUm9H5L5V-kNXzMgzm8FYFm3n_kPzYhLqTWUOOGOjdRRQVpof-ScO_bt0OsAtM_i6ddu0Wj-YKNUrxnA-8jBneQSWDM3Gd4WSN43hhFO8sT1fPkcCVwIH5l2eukxx3qPDUgmX6Vay4RjiqTsKitVgf_vigzCXymADYvDmFyW7EHCxFG3L9xac1SBTUApd2TW6N1IgbVx6iY3j5tR")' }}
                        ></div>
                        <div className="flex flex-col">
                            <h1 className="text-white text-lg font-bold leading-tight tracking-tight">VetFluid</h1>
                            <p className="text-vet-text-secondary text-xs font-medium">Reposição Eletrolítica</p>
                        </div>
                    </div>
                    {/* Navigation */}
                    <nav className="flex flex-col gap-1">
                        <button onClick={() => onNavigate('configuration')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-vet-text-secondary hover:bg-vet-surface-hover hover:text-white transition-colors group">
                            <Calculator className="w-5 h-5 group-hover:text-vet-primary transition-colors" />
                            <p className="text-sm font-medium leading-normal">Calculadora</p>
                        </button>
                        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-vet-surface-hover text-white border-l-4 border-vet-primary">
                            <BookOpen className="w-5 h-5 text-vet-primary" />
                            <p className="text-sm font-bold leading-normal">Biblioteca</p>
                        </button>
                        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-vet-text-secondary hover:bg-vet-surface-hover hover:text-white transition-colors group">
                            <History className="w-5 h-5 group-hover:text-vet-primary transition-colors" />
                            <p className="text-sm font-medium leading-normal">Histórico</p>
                        </button>
                        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-vet-text-secondary hover:bg-vet-surface-hover hover:text-white transition-colors group">
                            <Settings className="w-5 h-5 group-hover:text-vet-primary transition-colors" />
                            <p className="text-sm font-medium leading-normal">Configurações</p>
                        </button>
                    </nav>
                </div>
                <div className="p-4">
                    <button
                        onClick={() => onNavigate('identification')}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-vet-primary hover:bg-vet-primary/90 transition-colors text-white text-sm font-bold shadow-lg shadow-orange-900/20"
                    >
                        <PlusCircle className="w-5 h-5" />
                        <span className="truncate">Nova Infusão</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full min-w-0 bg-vet-bg-dark relative">
                {/* Top Bar (Mobile Menu + Breadcrumbs/Title) */}
                <header className="flex items-center justify-between p-4 md:px-8 md:py-5 border-b border-[#483623] bg-vet-bg-dark/80 backdrop-blur-md z-10">
                    <div className="flex flex-col gap-1">
                        <p className="text-vet-text-secondary text-sm font-medium">Biblioteca Clínica {'>'} Condições</p>
                        <h2 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight">Guia Hidroeletrolítico</h2>
                    </div>
                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-white p-2">
                        <Menu className="w-6 h-6" />
                    </button>
                </header>

                {/* Split View Content */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Left Panel: Search & List (Master) */}
                    <div className="w-full md:w-[400px] lg:w-[450px] flex flex-col border-r border-[#483623] bg-vet-bg-dark/50">
                        {/* Search Box */}
                        <div className="p-4 md:p-6 pb-2">
                            <label className="flex flex-col w-full">
                                <div className="flex w-full items-center rounded-xl bg-vet-surface-dark border border-[#483623] focus-within:border-vet-primary/50 focus-within:ring-1 focus-within:ring-vet-primary/50 transition-all h-12 shadow-inner">
                                    <div className="text-vet-text-secondary flex items-center justify-center pl-4 pr-2">
                                        <Search className="w-5 h-5" />
                                    </div>
                                    <input className="w-full bg-transparent border-none text-white focus:ring-0 placeholder:text-vet-text-secondary/70 text-sm font-medium h-full" placeholder="Buscar condição (ex: Acidose)..." />
                                </div>
                            </label>
                        </div>

                        {/* Filter Chips */}
                        <div className="px-4 md:px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
                            <button className="px-3 py-1.5 rounded-full bg-vet-primary/20 text-vet-primary text-xs font-bold border border-vet-primary/30 whitespace-nowrap">Tudo</button>
                            <button className="px-3 py-1.5 rounded-full bg-vet-surface-dark hover:bg-vet-surface-hover text-vet-text-secondary text-xs font-medium border border-[#483623] whitespace-nowrap transition-colors">Ácido-Base</button>
                            <button className="px-3 py-1.5 rounded-full bg-vet-surface-dark hover:bg-vet-surface-hover text-vet-text-secondary text-xs font-medium border border-[#483623] whitespace-nowrap transition-colors">Eletrólitos</button>
                            <button className="px-3 py-1.5 rounded-full bg-vet-surface-dark hover:bg-vet-surface-hover text-vet-text-secondary text-xs font-medium border border-[#483623] whitespace-nowrap transition-colors">Volume</button>
                        </div>

                        {/* Condition List */}
                        <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6 space-y-2">
                            {/* A */}
                            <div className="text-vet-primary text-xs font-bold mt-4 mb-2 tracking-wider">A</div>
                            <button className="w-full text-left group">
                                <div className="flex items-center gap-4 rounded-xl p-4 transition-all bg-vet-surface-dark border border-[#483623] hover:border-vet-primary/50 hover:shadow-[0_0_15px_rgba(236,127,19,0.1)]">
                                    <div className="h-10 w-10 rounded-lg bg-vet-surface-hover flex items-center justify-center text-vet-primary shrink-0">
                                        <FlaskConical className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <p className="text-white text-sm font-bold truncate group-hover:text-vet-primary transition-colors">Acidose Metabólica</p>
                                        <p className="text-vet-text-secondary text-xs truncate">Distúrbio do equilíbrio ácido-base</p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 ml-auto text-vet-text-secondary/50" />
                                </div>
                            </button>
                            <button className="w-full text-left group">
                                <div className="flex items-center gap-4 rounded-xl p-4 transition-all bg-vet-bg-dark border border-transparent hover:bg-vet-surface-dark hover:border-[#483623]">
                                    <div className="h-10 w-10 rounded-lg bg-vet-surface-hover/50 flex items-center justify-center text-vet-text-secondary shrink-0">
                                        <Wind className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <p className="text-white text-sm font-bold truncate group-hover:text-vet-primary transition-colors">Acidose Respiratória</p>
                                        <p className="text-vet-text-secondary text-xs truncate">Acúmulo de CO2</p>
                                    </div>
                                </div>
                            </button>
                            <button className="w-full text-left group">
                                <div className="flex items-center gap-4 rounded-xl p-4 transition-all bg-vet-bg-dark border border-transparent hover:bg-vet-surface-dark hover:border-[#483623]">
                                    <div className="h-10 w-10 rounded-lg bg-vet-surface-hover/50 flex items-center justify-center text-vet-text-secondary shrink-0">
                                        <Droplets className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <p className="text-white text-sm font-bold truncate group-hover:text-vet-primary transition-colors">Alcalose Metabólica</p>
                                        <p className="text-vet-text-secondary text-xs truncate">Perda de ácidos ou ganho de bases</p>
                                    </div>
                                </div>
                            </button>

                            {/* H */}
                            <div className="text-vet-primary text-xs font-bold mt-6 mb-2 tracking-wider">H</div>

                            {/* Selected Item Style */}
                            <button
                                className="w-full text-left relative"
                                onClick={() => setSelectedCondition('hipercalemia')}
                            >
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-vet-primary rounded-r-full"></div>
                                <div className="flex items-center gap-4 rounded-xl p-4 bg-vet-surface-hover border border-vet-primary/40 shadow-lg">
                                    <div className="h-10 w-10 rounded-lg bg-vet-primary/20 flex items-center justify-center text-vet-primary shrink-0">
                                        <HeartPulse className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <p className="text-white text-sm font-bold truncate">Hipercalemia</p>
                                        <p className="text-vet-primary/80 text-xs truncate">Excesso de potássio no sangue</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 ml-auto text-vet-primary" />
                                </div>
                            </button>

                            <button className="w-full text-left group">
                                <div className="flex items-center gap-4 rounded-xl p-4 transition-all bg-vet-bg-dark border border-transparent hover:bg-vet-surface-dark hover:border-[#483623]">
                                    <div className="h-10 w-10 rounded-lg bg-vet-surface-hover/50 flex items-center justify-center text-vet-text-secondary shrink-0">
                                        <Activity className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <p className="text-white text-sm font-bold truncate group-hover:text-vet-primary transition-colors">Hipocalemia</p>
                                        <p className="text-vet-text-secondary text-xs truncate">Deficiência de potássio</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Right Panel: Detail View (Main) */}
                    <div className="flex-1 hidden md:flex flex-col bg-vet-bg-dark h-full overflow-hidden relative">
                        {/* Detail Header */}
                        <div className="px-8 py-6 pb-0 flex justify-between items-start">
                            <div className="flex gap-4 items-start">
                                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-900/40 border border-vet-primary/20 flex items-center justify-center shrink-0">
                                    <HeartPulse className="text-vet-primary w-8 h-8" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h1 className="text-3xl font-black text-white tracking-tight">Hipercalemia</h1>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">CRÍTICO</span>
                                    </div>
                                    <p className="text-vet-text-secondary text-base max-w-2xl">Aumento da concentração sérica de potássio ({'>'} 5.5 mEq/L), comum em obstruções uretrais e falência renal.</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-[#483623] hover:bg-vet-surface-hover text-vet-text-secondary transition-colors" title="Compartilhar">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-[#483623] hover:bg-vet-surface-hover text-vet-text-secondary transition-colors" title="Favoritar">
                                    <Bookmark className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="px-8 mt-6 border-b border-[#483623]">
                            <div className="flex gap-8">
                                <button className="pb-3 text-sm font-bold text-vet-primary border-b-2 border-vet-primary">Etiologia</button>
                                <button className="pb-3 text-sm font-medium text-vet-text-secondary hover:text-white transition-colors">Patogenia (Fisiologia)</button>
                                <button className="pb-3 text-sm font-medium text-vet-text-secondary hover:text-white transition-colors">Diagnóstico</button>
                                <button className="pb-3 text-sm font-medium text-vet-text-secondary hover:text-white transition-colors">Tratamento</button>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
                            {/* Section: Causes */}
                            <section className="animate-fade-in">
                                <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                                    <Microscope className="text-vet-primary w-4 h-4" />
                                    Principais Causas
                                </h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="bg-vet-surface-dark p-4 rounded-xl border border-[#483623]">
                                        <h4 className="text-white text-sm font-bold mb-2">Excreção Renal Reduzida</h4>
                                        <ul className="list-disc list-inside space-y-2 text-sm text-vet-text-secondary ml-1">
                                            <li>Obstrução ou ruptura uretral (comum em felinos)</li>
                                            <li>Insuficiência renal anúrica ou oligúrica</li>
                                            <li>Hipoadrenocorticismo (Doença de Addison)</li>
                                        </ul>
                                    </div>
                                    <div className="bg-vet-surface-dark p-4 rounded-xl border border-[#483623]">
                                        <h4 className="text-white text-sm font-bold mb-2">Translocação (Saída do IC para EC)</h4>
                                        <ul className="list-disc list-inside space-y-2 text-sm text-vet-text-secondary ml-1">
                                            <li>Acidose metabólica aguda</li>
                                            <li>Lise celular massiva (síndrome de lise tumoral)</li>
                                            <li>Dano tecidual extenso (esmagamento, queimaduras)</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Signs */}
                            <section>
                                <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                                    <MonitorPlay className="text-vet-primary w-4 h-4" />
                                    Sinais Clínicos e ECG
                                </h3>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-vet-surface-dark border border-[#483623]">
                                        <div
                                            className="bg-cover bg-center h-24 w-32 rounded-lg shrink-0 border border-[#483623]"
                                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCmSqjxkDH1OBTNKnJokvrAYyudGNghCOSx2yvTxPVEBXWLbZIqKPjEJARHcB72if74gkaec9k7R6Ia2vmeQVAzvgRir5DA2fOW1j4sBkpf9BzCzX6rpWkpnWdN50BgSbtU-CGlR4beTPnSFBrH_7trYwZZGeASlf1Y0OKoBBKhzW5_mlKNpDh0DfjORJxnNUmeVdtwgKz2Z_kOJFcVdpF8DA1lNP4cutvK9g4z7nIBQSdknczVNx1sQWGGhAmOPhnzx9oM4069O_ys")' }}
                                        ></div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm mb-1">Alterações Eletrocardiográficas</h4>
                                            <p className="text-vet-text-secondary text-sm leading-relaxed mb-2">A hipercalemia reduz o potencial de repouso da membrana celular.</p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-2 py-1 bg-vet-surface-hover rounded text-xs text-vet-text-secondary border border-[#483623]">Onda T apiculada</span>
                                                <span className="px-2 py-1 bg-vet-surface-hover rounded text-xs text-vet-text-secondary border border-[#483623]">Intervalo PR prolongado</span>
                                                <span className="px-2 py-1 bg-vet-surface-hover rounded text-xs text-vet-text-secondary border border-[#483623]">Desaparecimento da onda P</span>
                                                <span className="px-2 py-1 bg-red-500/10 rounded text-xs text-red-400 border border-red-500/20 font-medium">Fibrilação ventricular</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="h-10"></div>
                        </div>

                        {/* Floating CTA / Bottom Action */}
                        <div className="absolute bottom-6 right-8 left-8 flex justify-end pointer-events-none">
                            <div className="pointer-events-auto bg-[#221910]/90 backdrop-blur p-2 rounded-xl border border-[#483623] shadow-2xl flex gap-3 items-center">
                                <div className="px-3 flex flex-col">
                                    <span className="text-xs text-vet-text-secondary font-medium uppercase tracking-wider">Ação Recomendada</span>
                                    <span className="text-sm text-white font-bold">Iniciar protocolo de correção</span>
                                </div>
                                <button
                                    onClick={() => onNavigate('configuration')}
                                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-vet-primary hover:bg-vet-primary/90 text-[#221a11] font-bold shadow-lg transition-all hover:scale-[1.02]"
                                >
                                    <Calculator className="w-5 h-5" />
                                    Calcular Infusão
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
