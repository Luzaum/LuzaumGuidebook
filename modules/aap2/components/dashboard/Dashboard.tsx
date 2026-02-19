import React, { useState } from 'react';
import type { AppPage } from '../../types';
import './dashboard.css';

interface DashboardProps {
    onNavigate: (page: AppPage) => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, isDarkMode, toggleTheme }) => {
    // Sidebar state if needed, though for now it's static in the snippet
    // Images from snippet
    const userImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuAWe7Fd0Mjd6RDb7RdyROid-tuPRGsdEPxvqY7YHESxTQv7ypRv-kEgqdcllYihBE-F-L1ZthZwpDvPCbKh-BBFMg19pJE5Ao2IrjPfNytbvncVqjUC42T1JW4RfU98nRr5o2EOrrPSSls1Vx43b8Ok1flg_FhMkXFt5_UhS3PZe78jFV3e1FHaxGkQYCQ5JoqaHxlzTqO0sEm9mP7vAjKjniHR6tB-BB5f_MNvUiEPaOD29N7I-jCPgL3uLw4tN9gDQQwXijaUYYVt";

    // Quick Actions Handling
    const handleQuickAction = (action: AppPage) => {
        onNavigate(action);
    };

    return (
        <div className={`text-slate-800 antialiased overflow-hidden h-screen flex relative w-full transition-colors duration-300 ${isDarkMode ? 'bg-aap-background-dark text-white' : 'bg-aap-background-light'}`}>
            {/* Sidebar */}
            <aside className={`w-64 h-full flex flex-col justify-between shrink-0 z-20 transition-all duration-300 ${isDarkMode ? 'glass-sidebar bg-slate-900/80 border-slate-700' : 'glass-sidebar'}`}>
                <div className="flex flex-col h-full">
                    <div className="p-6 flex items-center gap-3">
                        <div className="bg-gradient-to-br from-aap-primary to-aap-primary-dark rounded-lg w-10 h-10 flex items-center justify-center shadow-lg shadow-aap-primary/30 text-white">
                            <span className="material-symbols-outlined text-2xl">pets</span>
                        </div>
                        <div>
                            <h1 className={`text-lg font-bold leading-none tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Animais Peçonhentos</h1>
                            <p className="text-aap-primary text-xs font-medium mt-1">Vetius</p>
                        </div>
                    </div>
                    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                        <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Menu Principal</p>
                        <a
                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-aap-primary/10 text-aap-primary group transition-colors cursor-pointer"
                            onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
                        >
                            <span className="material-symbols-outlined">dashboard</span>
                            <span className="text-sm font-semibold">Dashboard</span>
                        </a>
                        <a
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg group transition-colors cursor-pointer ${isDarkMode ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                            onClick={(e) => { e.preventDefault(); onNavigate('enciclopedia'); }}
                        >
                            <span className="material-symbols-outlined">menu_book</span>
                            <span className="text-sm font-semibold">Enciclopédia</span>
                        </a>
                        <div className="pt-6 pb-2">
                            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Sistema</p>
                            <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 group transition-colors cursor-pointer" href="#">
                                <span className="material-symbols-outlined">settings</span>
                                <span className="text-sm font-medium">Configurações</span>
                            </a>
                            <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 group transition-colors cursor-pointer" href="#">
                                <span className="material-symbols-outlined">help</span>
                                <span className="text-sm font-medium">Suporte</span>
                            </a>
                        </div>
                    </nav>
                    <div className="p-4">
                        <div className="mb-4">
                            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Acesso Rápido</p>
                            <button className="w-full flex items-center gap-3 bg-blue-50 text-blue-700 py-3 px-4 rounded-xl hover:bg-blue-100 transition-all font-semibold text-sm">
                                <span className="material-symbols-outlined text-xl">phone_in_talk</span>
                                Centro de Intoxicações
                            </button>
                        </div>
                        <button
                            className="w-full flex items-center justify-center gap-2 bg-aap-primary hover:bg-aap-primary-dark text-white py-3 px-4 rounded-xl shadow-lg shadow-aap-primary/25 transition-all active:scale-95 font-semibold text-sm"
                            onClick={() => onNavigate('suspeitas')}
                        >
                            <span className="material-symbols-outlined text-xl">add</span>
                            Nova Consulta
                        </button>
                    </div>
                    <div className="p-4 border-t border-slate-200/60 bg-white/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-white shadow-sm" style={{ backgroundImage: `url('${userImage}')` }}></div>
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Dr. Julia Santos</p>
                                <p className="text-xs text-slate-500 truncate">Veterinária Chefe</p>
                            </div>
                            <button className="text-slate-400 hover:text-aap-primary">
                                <span className="material-symbols-outlined text-xl">logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

                <header className={`flex items-center justify-between px-8 py-5 border-b-0 border-l-0 border-r-0 border-t-0 z-10 shrink-0 sticky top-0 ${isDarkMode ? 'glass-panel bg-slate-900/60 border-slate-700' : 'glass-panel'}`}>
                    <div className="flex items-center gap-4 flex-1">
                        <h2 className={`text-2xl font-bold tracking-tight hidden md:block ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Visual Identification Hub</h2>
                        <div className="max-w-md w-full ml-8 relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-aap-primary transition-colors">search</span>
                            </div>
                            <input
                                className={`block w-full pl-10 pr-3 py-2.5 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-aap-primary/20 transition-all shadow-sm text-sm ${isDarkMode ? 'bg-slate-800/60 text-white placeholder-slate-500 focus:bg-slate-800' : 'bg-white/60 text-slate-900 placeholder-slate-400 focus:bg-white'}`}
                                placeholder="Identificar espécie por características..."
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-yellow-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-white/50 hover:text-aap-primary'}`}
                            onClick={toggleTheme}
                            title={isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
                        >
                            <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
                        </button>

                        <div className={`h-8 w-px mx-2 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></div>

                        <button className={`relative p-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-white/50 hover:text-aap-primary'}`}>
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>

                        <div className="text-right hidden lg:block">
                            <p className="text-xs text-slate-500 font-medium">Clínica Central</p>
                            <p className="text-xs font-bold text-aap-primary">Status: Online</p>
                        </div>
                    </div>
                </header>

                <div className="flex-1 flex flex-col p-8 gap-8 overflow-y-auto">
                    {/* Identification Hub Section (from Snippet 1) */}
                    <section className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                <span className="material-symbols-outlined text-aap-primary">visibility</span>
                                Identificação Visual Rápida
                            </h3>
                            <span className="text-slate-500 text-sm italic">Passe o mouse para detalhar características</span>
                        </div>
                        <div className="id-hub-container flex gap-3 h-[450px] w-full">
                            {/* Cards */}
                            <a className="id-card flex-1 group rounded-3xl cursor-pointer relative shadow-xl" onClick={() => onNavigate('bulario')}>
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDR7HjByJK-mUIWZj4SxZOAlOcuowii2jlC8j8N5og3Ba4CvsDdo_0OtyFGP-a1HugtzA8xLrSkKmwN_62L6DF58DjO8gKK-nRRR4z1dQOxpdckQOQzGj-jJRh0yIM-1AyURjGJdugtKtnByU3ZErUl0vLS9AwmUy5e6wgSdJGqfkJ2LtEtP8p0dVgJghFoljrhU_Iu2bCpUx8nA1QVMrpWj-4E8WKmqkpkk80RV7SOe-04wQds4rNWvi72wVGL-9Zmfd4u9RV83aWs')" }}></div>
                                <div className="id-overlay absolute inset-0"></div>
                                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                                    <div className="card-header mb-2">
                                        <span className="bg-red-500/80 backdrop-blur-md text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Alto Risco</span>
                                        <h4 className="text-xl font-bold mt-1">Bothrops (Jararaca)</h4>
                                    </div>
                                    <div className="id-info space-y-3">
                                        <p className="text-sm text-white/80 leading-relaxed border-t border-white/20 pt-3">
                                            <span className="block font-bold text-white mb-1">Características Visíveis:</span>
                                            Padrões em forma de "V" invertido (telefone) ao longo do corpo. Cabeça triangular bem definida e fosseta loreal presente.
                                        </p>
                                        <p className="text-xs text-white/60">
                                            Clique para ver epidemiologia, sinais clínicos e tratamento no bulário.
                                        </p>
                                    </div>
                                </div>
                            </a>

                            <a className="id-card flex-1 group rounded-3xl cursor-pointer relative shadow-xl" onClick={() => onNavigate('bulario')}>
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-YlcrGg0gUI_Mh7j3MBbM3txhzaEgNah7rdOpLr3FYWFIPdyj0zh34EDWi0ryqwkV-o5VAuOUMAcxclTO8KyCkVkM2ru7_cMsxs1X1MYtrMfHC_F0m3GiqVjAyZP89KzZ4J5baIGv0OxLsFJ-KiKvcaZ07VcdUMqSVYaGpFnSfU8x_KOzDSta3c0hshc6i_6A3PTcVj_ItS3DzK0FaF2-hwNaZ4zjlDvkZbqtFeu7VWXUc8euhxboU_NqZQBwYys6jqGnComg-hQG')" }}></div>
                                <div className="id-overlay absolute inset-0"></div>
                                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                                    <div className="card-header mb-2">
                                        <span className="bg-red-500/80 backdrop-blur-md text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Alto Risco</span>
                                        <h4 className="text-xl font-bold mt-1">Crotalus (Cascavel)</h4>
                                    </div>
                                    <div className="id-info space-y-3">
                                        <p className="text-sm text-white/80 leading-relaxed border-t border-white/20 pt-3">
                                            <span className="block font-bold text-white mb-1">Morfologia:</span>
                                            Presença característica de chocalho na cauda. Escamas poligonais e cores em tons de marrom e cinza.
                                        </p>
                                        <p className="text-xs text-white/60">
                                            Ver enciclopédia completa de neurotoxinas.
                                        </p>
                                    </div>
                                </div>
                            </a>

                            <a className="id-card flex-1 group rounded-3xl cursor-pointer relative shadow-xl" onClick={() => onNavigate('bulario')}>
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBGeHjiOWPqmdsYvqg83TQQPspE_VakODHDGmdWQqQbJgluoLS-tU4YVmtbS7lr0P1FjcX1C_xxQxFAy9Mp_fa7e5e_lDr2djAQS9Fy685n1rGMn3wdvQ8LHu5S2VTfaKtDeUwlpDTTPiG8iqtFvPIntmup81BninnJUFdWQqeo5qeAblVP1VsHLqGu6flXfopKh2rWBkNCmgvtBqBz84KugIHk4gMzEimSu_qpBduHk5c0XEJkza8v8al5-tdsuCEgSl1u23FuJwKc')" }}></div>
                                <div className="id-overlay absolute inset-0"></div>
                                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                                    <div className="card-header mb-2">
                                        <span className="bg-orange-500/80 backdrop-blur-md text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Médio Risco</span>
                                        <h4 className="text-xl font-bold mt-1">Loxosceles (Marrom)</h4>
                                    </div>
                                    <div className="id-info space-y-3">
                                        <p className="text-sm text-white/80 leading-relaxed border-t border-white/20 pt-3">
                                            <span className="block font-bold text-white mb-1">Identificação:</span>
                                            Coloração marrom acinzentada, pernas longas e finas. Marcação em forma de violino no cefalotórax.
                                        </p>
                                        <p className="text-xs text-white/60">
                                            Detalhes de necrose tecidual e manejo de feridas.
                                        </p>
                                    </div>
                                </div>
                            </a>

                            <a className="id-card flex-1 group rounded-3xl cursor-pointer relative shadow-xl" onClick={() => onNavigate('bulario')}>
                                <div className="absolute inset-0 bg-cover bg-center bg-gray-900 group-hover:scale-110 transition-transform duration-700 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white/20 text-8xl">potted_plant</span>
                                </div>
                                <div className="id-overlay absolute inset-0"></div>
                                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                                    <div className="card-header mb-2">
                                        <span className="bg-red-500/80 backdrop-blur-md text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Alto Risco</span>
                                        <h4 className="text-xl font-bold mt-1">Micrurus (Coral)</h4>
                                    </div>
                                    <div className="id-info space-y-3">
                                        <p className="text-sm text-white/80 leading-relaxed border-t border-white/20 pt-3">
                                            <span className="block font-bold text-white mb-1">Padrão de Cores:</span>
                                            Anéis vermelhos, pretos e brancos/amarelos que circundam todo o corpo. Cabeça arredondada sem fosseta.
                                        </p>
                                        <p className="text-xs text-white/60">
                                            Guia de diferenciação entre coral verdadeira e falsa.
                                        </p>
                                    </div>
                                </div>
                            </a>

                            <a className="id-card flex-1 group rounded-3xl cursor-pointer relative shadow-xl" onClick={() => onNavigate('bulario')}>
                                <div className="absolute inset-0 bg-cover bg-center bg-gray-800 group-hover:scale-110 transition-transform duration-700 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white/20 text-8xl">bug_report</span>
                                </div>
                                <div className="id-overlay absolute inset-0"></div>
                                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                                    <div className="card-header mb-2">
                                        <span className="bg-yellow-500/80 backdrop-blur-md text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Risco Moderado</span>
                                        <h4 className="text-xl font-bold mt-1">Tityus serrulatus</h4>
                                    </div>
                                    <div className="id-info space-y-3">
                                        <p className="text-sm text-white/80 leading-relaxed border-t border-white/20 pt-3">
                                            <span className="block font-bold text-white mb-1">Morfologia:</span>
                                            Pernas e cauda amareladas. Presença de "serrilha" nos anéis caudais posteriores. Tronco escuro.
                                        </p>
                                        <p className="text-xs text-white/60">
                                            Ver protocolos de dor intensa e edema pulmonar.
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </section>

                    {/* Quick Actions - FROM SNIPPET 2 */}
                    <section className="mb-10">
                        <h3 className={`text-lg font-bold mb-5 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                            <span className="material-symbols-outlined text-aap-primary">bolt</span>
                            Ações Rápidas
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Card 1: Ferramenta de Suspeitas */}
                            <div className="glass-panel p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden" onClick={() => handleQuickAction('suspeitas')}>
                                <div className="absolute right-0 top-0 w-32 h-32 bg-aap-primary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-aap-primary/10 transition-all"></div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-purple-100 text-aap-primary rounded-xl group-hover:bg-aap-primary group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-3xl">stethoscope</span>
                                    </div>
                                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">Novo</span>
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 mb-1">Ferramenta de Suspeitas</h4>
                                <p className="text-slate-500 text-sm mb-4 leading-relaxed">Auxílio diagnóstico rápido para casos de envenenamento baseados em sintomas clínicos.</p>
                                <button className="text-aap-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Iniciar Diagnóstico <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>

                            {/* Card 2: Bulário Peçonhento */}
                            <div className="glass-panel p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden" onClick={() => handleQuickAction('bulario')}>
                                <div className="absolute right-0 top-0 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-100 transition-all"></div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-3xl">menu_book</span>
                                    </div>
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 mb-1">Bulário Peçonhento</h4>
                                <p className="text-slate-500 text-sm mb-4 leading-relaxed">Enciclopédia completa de espécies, toxinas e antídotos disponíveis.</p>
                                <button className="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Acessar Bulário <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>

                            {/* Card 3: Protocolos de Emergência */}
                            <div className="glass-panel p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer border-l-4 border-l-red-500 relative overflow-hidden" onClick={() => handleQuickAction('tratamentos')}>
                                <div className="absolute right-0 top-0 w-32 h-32 bg-red-100/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-red-100 transition-all"></div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-3xl">medical_services</span>
                                    </div>
                                    <span className="animate-pulse bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span> Urgente
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 mb-1">Protocolos de Emergência</h4>
                                <p className="text-slate-500 text-sm mb-4 leading-relaxed">Guias passo-a-passo para estabilização de pacientes críticos.</p>
                                <button className="text-red-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Ver Protocolos <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </section>

                    <div className="mt-auto pt-6 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
                        <p>© 2024 AAP2 Vetius. Todos os direitos reservados.</p>
                        <div className="flex gap-4 mt-2 md:mt-0">
                            <a className="hover:text-aap-primary" href="#">Termos de Uso</a>
                            <a className="hover:text-aap-primary" href="#">Privacidade</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
