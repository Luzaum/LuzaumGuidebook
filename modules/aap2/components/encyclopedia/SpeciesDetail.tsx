import React from 'react';
import type { AppPage } from '../../types';
import '../dashboard/dashboard.css';
import './encyclopedia.css';

interface SpeciesDetailPageProps {
    onNavigate: (page: AppPage) => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export const SpeciesDetailPage: React.FC<SpeciesDetailPageProps> = ({ onNavigate, isDarkMode, toggleTheme }) => {
    // Reusing sidebar structure with active state logic mock
    const userImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuAWe7Fd0Mjd6RDb7RdyROid-tuPRGsdEPxvqY7YHESxTQv7ypRv-kEgqdcllYihBE-F-L1ZthZwpDvPCbKh-BBFMg19pJE5Ao2IrjPfNytbvncVqjUC42T1JW4RfU98nRr5o2EOrrPSSls1Vx43b8Ok1flg_FhMkXFt5_UhS3PZe78jFV3e1FHaxGkQYCQ5JoqaHxlzTqO0sEm9mP7vAjKjniHR6tB-BB5f_MNvUiEPaOD29N7I-jCPgL3uLw4tN9gDQQwXijaUYYVt";

    return (
        <div className={`text-slate-800 antialiased overflow-hidden h-screen flex w-full transition-colors duration-300 ${isDarkMode ? 'bg-aap-background-dark text-white' : 'bg-aap-background-light'}`}>
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
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg group transition-colors cursor-pointer ${isDarkMode ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                            onClick={() => onNavigate('home')}
                        >
                            <span className="material-symbols-outlined">dashboard</span>
                            <span className="text-sm font-medium">Dashboard</span>
                        </a>
                        <a
                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-aap-primary/10 text-aap-primary group transition-colors cursor-pointer"
                            onClick={() => onNavigate('enciclopedia')}
                        >
                            <span className="material-symbols-outlined">menu_book</span>
                            <span className="text-sm font-semibold">Enciclopédia</span>
                        </a>
                        <div className="pt-6 pb-2">
                            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Sistema</p>
                            <a className={`flex items-center gap-3 px-4 py-3 rounded-lg group transition-colors cursor-pointer ${isDarkMode ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`} href="#">
                                <span className="material-symbols-outlined">settings</span>
                                <span className="text-sm font-medium">Configurações</span>
                            </a>
                            <a className={`flex items-center gap-3 px-4 py-3 rounded-lg group transition-colors cursor-pointer ${isDarkMode ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`} href="#">
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
                    <div className={`p-4 border-t ${isDarkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200/60 bg-white/50'}`}>
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
                        {/* Theme Toggle */}
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
                    <div className="flex flex-col gap-8">
                        {/* Species Header Area */}
                        {/* Using static data from snippet for Jararaca as a placeholder/demo */}
                        <section className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-1 space-y-4">
                                <div className="flex gap-2">
                                    <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs">warning</span> Altamente Peçonhenta
                                    </span>
                                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Viperidae</span>
                                </div>
                                <div>
                                    <h1 className={`text-5xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                        Jararaca <span className="text-slate-400 font-normal italic text-3xl">(Bothrops spp.)</span>
                                    </h1>
                                    <p className={`mt-4 text-lg max-w-2xl leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                        O gênero de serpentes de maior importância médica na <span className="text-aap-primary font-bold">América do Sul</span>. Identificadas pela cabeça triangular, fossetas loreais e padrões dorsais variados.
                                    </p>
                                </div>
                                <div className="flex gap-4 pt-2">
                                    <button className="bg-aap-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-aap-primary/30 hover:bg-aap-primary-dark transition-all">
                                        <span className="material-symbols-outlined">medical_services</span> Protocolo de Emergência
                                    </button>
                                    <button className={`border-2 border-aap-primary/20 text-aap-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-aap-primary-light transition-all ${isDarkMode ? 'bg-transparent text-aap-primary-light border-aap-primary/40 hover:bg-aap-primary/20' : 'bg-white hover:bg-aap-primary-light'}`}>
                                        <span className="material-symbols-outlined">calculate</span> Calculadora de Dose
                                    </button>
                                </div>
                            </div>
                            <div className="w-full md:w-[400px] shrink-0">
                                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl group">
                                    <img alt="Jararaca Specimen" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR7HjByJK-mUIWZj4SxZOAlOcuowii2jlC8j8N5og3Ba4CvsDdo_0OtyFGP-a1HugtzA8xLrSkKmwN_62L6DF58DjO8gKK-nRRR4z1dQOxpdckQOQzGj-jJRh0yIM-1AyURjGJdugtKtnByU3ZErUl0vLS9AwmUy5e6wgSdJGqfkJ2LtEtP8p0dVgJghFoljrhU_Iu2bCpUx8nA1QVMrpWj-4E8WKmqkpkk80RV7SOe-04wQds4rNWvi72wVGL-9Zmfd4u9RV83aWs" />
                                    <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs">photo_camera</span> Espécime Adulto
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Navigation Tabs */}
                        <nav className={`flex border-b gap-8 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                            <button className={`pb-4 text-sm font-medium transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}>Identificação</button>
                            <button className="pb-4 text-sm font-bold text-aap-primary border-b-2 border-aap-primary">Sinais Clínicos</button>
                            <button className={`pb-4 text-sm font-medium transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}>Diagnóstico</button>
                            <button className={`pb-4 text-sm font-medium transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}>Tratamento</button>
                        </nav>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Clinical Signs Content */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="space-y-6">
                                    <h3 className={`flex items-center gap-2 text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                        <span className="material-symbols-outlined text-aap-primary">emergency_home</span> Manifestações Locais
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start group">
                                            <div>
                                                <h4 className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>Edema & Dor</h4>
                                                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Inchaço progressivo iniciando no local da picada.</p>
                                            </div>
                                            <span className="material-symbols-outlined text-slate-300 group-hover:text-aap-primary cursor-help">help</span>
                                        </div>
                                        <div className="flex justify-between items-start group">
                                            <div>
                                                <h4 className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>Hemorragia (Equimose)</h4>
                                                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Sangramento subcutâneo, hematomas.</p>
                                            </div>
                                            <span className="material-symbols-outlined text-slate-300 group-hover:text-aap-primary cursor-help">help</span>
                                        </div>
                                        <div className="flex justify-between items-start group">
                                            <div>
                                                <h4 className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>Necrose</h4>
                                                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Morte tecidual ao redor das marcas das presas.</p>
                                            </div>
                                            <span className="material-symbols-outlined text-slate-300 group-hover:text-aap-primary cursor-help">help</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6 pt-4">
                                    <h3 className={`flex items-center gap-2 text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                        <span className="material-symbols-outlined text-aap-primary">monitor_heart</span> Complicações Sistêmicas
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start group">
                                            <div>
                                                <h4 className="font-bold text-red-600">Coagulopatia</h4>
                                                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Sangue incoagulável, gengivorragia.</p>
                                            </div>
                                            <span className="material-symbols-outlined text-slate-300 group-hover:text-red-500 cursor-help">help</span>
                                        </div>
                                        <div className="flex justify-between items-start group">
                                            <div>
                                                <h4 className="font-bold text-red-600">Lesão Renal Aguda (LRA)</h4>
                                                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Oligúria, anúria, urina escura.</p>
                                            </div>
                                            <span className="material-symbols-outlined text-slate-300 group-hover:text-red-500 cursor-help">help</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Side Panels */}
                            <div className="space-y-6">
                                {/* ID Check */}
                                <div className={`glass-panel p-6 rounded-2xl ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'border-slate-200'}`}>
                                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Check de Identificação</h4>
                                    <ul className="space-y-3">
                                        <li className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                            <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Cabeça triangular / em lança
                                        </li>
                                        <li className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                            <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Fosseta loreal presente
                                        </li>
                                        <li className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                            <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Pupilas verticais
                                        </li>
                                    </ul>
                                </div>
                                {/* Contraindication */}
                                <div className="bg-gradient-to-br from-red-500 to-red-700 p-6 rounded-2xl text-white shadow-xl shadow-red-200 relative overflow-hidden">
                                    <div className="absolute -right-4 -top-4 opacity-10">
                                        <span className="material-symbols-outlined text-9xl">block</span>
                                    </div>
                                    <h4 className="flex items-center gap-2 font-bold uppercase tracking-wider mb-2 text-sm">
                                        <span className="material-symbols-outlined text-lg">warning</span> Contraindicação
                                    </h4>
                                    <p className="text-xl font-black mb-2">NÃO USAR AINES</p>
                                    <p className="text-xs text-red-100 leading-relaxed">
                                        AINEs são estritamente contraindicados devido ao risco de agravamento da <span className="underline font-bold">coagulopatia</span> e lesão renal.
                                    </p>
                                </div>
                                {/* Antivenom */}
                                <div className={`glass-panel p-6 rounded-2xl ${isDarkMode ? 'bg-aap-primary/10 border-slate-700' : 'bg-aap-primary/5 border-slate-200'}`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-aap-primary/10 text-aap-primary rounded-lg">
                                            <span className="material-symbols-outlined">vaccines</span>
                                        </div>
                                        <h4 className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>Soroterapia</h4>
                                    </div>
                                    <p className={`text-sm font-bold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>Soro Antibotrópico (SAB)</p>
                                    <p className="text-[11px] text-slate-500 leading-tight mb-4">Ou Soro Antibotrópico-Crotálico (SABC) em caso de dúvida diagnóstica.</p>
                                    <a className="text-aap-primary text-xs font-bold underline hover:text-aap-primary-dark transition-colors" href="#">Ver Tabela de Dosagem</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
