import React, { useState, useEffect } from 'react';
import type { AppPage } from '../../types';
import '../dashboard/dashboard.css'; // Reusing dashboard styles for consistency
import './encyclopedia.css';

interface EncyclopediaPageProps {
    onNavigate: (page: AppPage) => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
}

// Mock data structure for the encyclopedia to allow mapping
const ENCYCLOPEDIA_DATA = {
    serpentes: [
        {
            name: "Jararaca",
            scientificName: "Bothrops spp.",
            risk: "Alto Risco",
            riskColor: "red",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDR7HjByJK-mUIWZj4SxZOAlOcuowii2jlC8j8N5og3Ba4CvsDdo_0OtyFGP-a1HugtzA8xLrSkKmwN_62L6DF58DjO8gKK-nRRR4z1dQOxpdckQOQzGj-jJRh0yIM-1AyURjGJdugtKtnByU3ZErUl0vLS9AwmUy5e6wgSdJGqfkJ2LtEtP8p0dVgJghFoljrhU_Iu2bCpUx8nA1QVMrpWj-4E8WKmqkpkk80RV7SOe-04wQds4rNWvi72wVGL-9Zmfd4u9RV83aWs",
            icon: "cruelty_free",
            morphology: "Cabeça triangular, fosseta loreal, cauda lisa."
        },
        {
            name: "Cascavel",
            scientificName: "Crotalus durissus",
            risk: "Alto Risco",
            riskColor: "red",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-YlcrGg0gUI_Mh7j3MBbM3txhzaEgNah7rdOpLr3FYWFIPdyj0zh34EDWi0ryqwkV-o5VAuOUMAcxclTO8KyCkVkM2ru7_cMsxs1X1MYtrMfHC_F0m3GiqVjAyZP89KzZ4J5baIGv0OxLsFJ-KiKvcaZ07VcdUMqSVYaGpFnSfU8x_KOzDSta3c0hshc6i_6A3PTcVj_ItS3DzK0FaF2-hwNaZ4zjlDvkZbqtFeu7VWXUc8euhxboU_NqZQBwYys6jqGnComg-hQG",
            icon: "cruelty_free",
            morphology: "Guizo na ponta da cauda."
        },
        {
            name: "Surucucu",
            scientificName: "Lachesis muta",
            risk: "Alto Risco",
            riskColor: "red",
            image: null, // Placeholder in original
            icon: "cruelty_free",
            morphology: "Escamas 'pico de jaca', cauda com espinho."
        },
        {
            name: "Coral Verdadeira",
            scientificName: "Micrurus spp.",
            risk: "Alto Risco",
            riskColor: "red",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBy7E4y5wDq62Z1qg9E7c2Q8a5T6z5n6dM3rS1k5P1F8e2C9t4G6x7J3V5b1K8L9M2N4O7P0R3S6T9U2V5W8X1Y4Z7a0B3c6D9E2F5G8H1I4J7K0L3M6N9O2P5Q8R1S4T7U/1280",
            icon: "cruelty_free",
            morphology: "Anéis vermelhos, pretos e brancos/amarelos."
        }
    ],
    escorpioes: [
        {
            name: "Escorpião Amarelo",
            scientificName: "Tityus serrulatus",
            risk: "Alto Risco",
            riskColor: "yellow",
            image: null,
            icon: "warning",
            morphology: "Serrilha no 3º e 4º anéis da cauda."
        },
        {
            name: "Escorpião Marrom",
            scientificName: "Tityus bahiensis",
            risk: "Risco Moderado",
            riskColor: "yellow",
            image: null,
            icon: "warning",
            morphology: "Coloração marrom, pernas manchadas."
        },
        {
            name: "Escorpião Preto",
            scientificName: "Tityus obscurus",
            risk: "Risco Moderado",
            riskColor: "yellow",
            image: null,
            icon: "warning",
            morphology: "Coloração escura, comum na Amazônia."
        }
    ],
    aranhas: [
        {
            name: "Armadeira",
            scientificName: "Phoneutria spp.",
            risk: "Alto Risco",
            riskColor: "orange",
            image: null,
            icon: "dangerous",
            morphology: "Postura de defesa erguida, quelíceras vermelhas."
        },
        {
            name: "Aranha Marrom",
            scientificName: "Loxosceles spp.",
            risk: "Alto Risco",
            riskColor: "orange",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGeHjiOWPqmdsYvqg83TQQPspE_VakODHDGmdWQqQbJgluoLS-tU4YVmtbS7lr0P1FjcX1C_xxQxFAy9Mp_fa7e5e_lDr2djAQS9Fy685n1rGMn3wdvQ8LHu5S2VTfaKtDeUwlpDTTPiG8iqtFvPIntmup81BninnJUFdWQqeo5qeAblVP1VsHLqGu6flXfopKh2rWBkNCmgvtBqBz84KugIHk4gMzEimSu_qpBduHk5c0XEJkza8v8al5-tdsuCEgSl1u23FuJwKc",
            icon: "dangerous",
            morphology: "Desenho de violino no cefalotórax."
        },
        {
            name: "Viúva Negra",
            scientificName: "Latrodectus spp.",
            risk: "Risco Moderado",
            riskColor: "orange",
            image: null,
            icon: "dangerous",
            morphology: "Ampulheta vermelha no abdômen ventral."
        }
    ],
    outros: [
        {
            name: "Taturana",
            scientificName: "Lonomia obliqua",
            risk: "Alto Risco",
            riskColor: "green",
            image: null,
            icon: "nature_people",
            morphology: "Cerdas em forma de pinheirinho."
        },
        {
            name: "Abelhas",
            scientificName: "Apis mellifera",
            risk: "Risco Moderado",
            riskColor: "green",
            image: null,
            icon: "nature_people",
            morphology: "Corpo peludo, listrado de amarelo e preto."
        },
        {
            name: "Arraia",
            scientificName: "Potamotrygon spp.",
            risk: "Doloroso",
            riskColor: "green",
            image: null,
            icon: "water_drop",
            morphology: "Ferrão serrilhado na base da cauda."
        }
    ]
};

export const EncyclopediaPage: React.FC<EncyclopediaPageProps> = ({ onNavigate, isDarkMode, toggleTheme }) => {
    // User image is no longer displayed in sidebar, but keeping if needed elsewhere or removing if unused. Removed usage.

    const renderAnimalCard = (animal: any) => (
        <div
            key={animal.name}
            className="animal-card rounded-3xl shadow-lg flex flex-col group cursor-pointer relative"
            onClick={() => onNavigate('species_detail')}
        >
            <div className="h-[25%] p-5 flex items-start justify-between z-20 relative border-b border-white/10 bg-white/5 backdrop-blur-sm">
                <div>
                    <h3 className={`text-2xl font-black text-white leading-tight drop-shadow-md`}>{animal.name}</h3>
                    <p className="text-base italic text-slate-300 font-serif mt-0.5">{animal.scientificName}</p>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-${animal.riskColor}-500 bg-white/10 backdrop-blur-md shadow-inner`}>
                    <span className="material-symbols-outlined text-2xl">{animal.icon}</span>
                </div>
            </div>
            <div className="h-[75%] relative overflow-hidden bg-slate-900/50">
                {animal.image ? (
                    <img alt={animal.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={animal.image} />
                ) : (
                    <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        <span className="material-symbols-outlined text-6xl opacity-50">image_not_supported</span>
                    </div>
                )}

                <div className={`absolute inset-0 bg-gradient-to-t from-${animal.riskColor}-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>

                <div className="absolute bottom-6 left-0 right-0 flex justify-center location-tag z-30 px-4 group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                    <div className="flex flex-col items-center gap-1 text-center font-medium text-slate-100 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white/10 max-w-full">
                        <div className="flex items-center gap-2">
                            <span className={`material-symbols-outlined text-${animal.riskColor}-400 text-lg`}>visibility</span>
                            <span className="text-xs uppercase tracking-wide opacity-80">Identificação</span>
                        </div>
                        <span className="text-sm leading-tight text-white/95 font-semibold">{animal.morphology}</span>
                    </div>
                </div>
            </div>
        </div>
    );

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
                        <button
                            className="w-full flex items-center justify-center gap-2 bg-aap-primary hover:bg-aap-primary-dark text-white py-3 px-4 rounded-xl shadow-lg shadow-aap-primary/25 transition-all active:scale-95 font-semibold text-sm"
                            onClick={() => onNavigate('suspeitas')}
                        >
                            <span className="material-symbols-outlined text-xl">add</span>
                            Nova Consulta
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

                <header className={`flex items-center justify-between px-8 py-5 border-b-0 border-l-0 border-r-0 border-t-0 z-10 shrink-0 sticky top-0 ${isDarkMode ? 'glass-panel bg-slate-900/60 border-slate-700' : 'glass-panel'}`}>
                    <div className="flex items-center gap-4 flex-1">
                        <h2 className={`text-2xl font-bold tracking-tight hidden md:block ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Veterinary Encyclopedia Hub</h2>
                        <div className="max-w-md w-full ml-8 relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-aap-primary transition-colors">search</span>
                            </div>
                            <input
                                className={`block w-full pl-10 pr-3 py-2.5 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-aap-primary/20 transition-all shadow-sm text-sm ${isDarkMode ? 'bg-slate-800/60 text-white placeholder-slate-500 focus:bg-slate-800' : 'bg-white/60 text-slate-900 placeholder-slate-400 focus:bg-white'}`}
                                placeholder="Buscar por espécie, sintoma ou toxina..."
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

                <div className="flex-1 flex flex-col p-8 gap-10 overflow-y-auto">
                    <div>
                        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Animais Peçonhentos</h1>
                        <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} mt-1`}>Catálogo de referência rápida para diagnóstico clínico</p>
                    </div>

                    {/* Serpentes */}
                    <section>
                        <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>
                            <span className="w-2 h-8 bg-red-500 rounded-full"></span>
                            Serpentes
                            <span className="text-xs font-medium px-2 py-0.5 rounded bg-red-500/10 text-red-500 border border-red-500/20">Viperidae & Elapidae</span>
                        </h2>
                        <div className="species-row">
                            {ENCYCLOPEDIA_DATA.serpentes.map(animal => renderAnimalCard(animal))}
                        </div>
                    </section>

                    {/* Escorpiões */}
                    <section>
                        <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                            <span className="w-2 h-8 bg-yellow-500 rounded-full"></span>
                            Escorpiões
                            <span className="text-xs font-medium px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">Buthidae</span>
                        </h2>
                        <div className="species-row">
                            {ENCYCLOPEDIA_DATA.escorpioes.map(animal => renderAnimalCard(animal))}
                        </div>
                    </section>

                    {/* Aranhas */}
                    <section>
                        <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                            <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
                            Aranhas
                            <span className="text-xs font-medium px-2 py-0.5 rounded bg-orange-500/10 text-orange-500 border border-orange-500/20">Arachnida</span>
                        </h2>
                        <div className="species-row">
                            {ENCYCLOPEDIA_DATA.aranhas.map(animal => renderAnimalCard(animal))}
                        </div>
                    </section>

                    {/* Outros */}
                    <section className="mb-8">
                        <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
                            <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                            Outros
                            <span className="text-xs font-medium px-2 py-0.5 rounded bg-green-500/10 text-green-500 border border-green-500/20">Lepidoptera & Hymenoptera</span>
                        </h2>
                        <div className="species-row">
                            {ENCYCLOPEDIA_DATA.outros.map(animal => renderAnimalCard(animal))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};
