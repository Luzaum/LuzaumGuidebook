import React from 'react';
import { Zap, BrainCircuit, Stethoscope, BookOpen, BriefcaseMedical, ArrowRight } from 'lucide-react';
import type { AnimalCategoryId, AppPage } from '../../types';
import './dashboard.css';

interface DashboardProps {
    onNavigate: (page: AppPage) => void;
    onOpenEncyclopedia: (params?: { categoryId?: AnimalCategoryId }) => void;
    isDarkMode: boolean;
}

const IDENTIFICATION_CARDS: Array<{
    label: string;
    subtitle: string;
    bg: string;
    categoryId: AnimalCategoryId;
    desc: string;
}> = [
    {
        label: 'Cobras',
        subtitle: 'Bothrops, Crotalus, Micrurus, Lachesis',
        bg: '/images/aap2/home-jararaca.jpg',
        categoryId: 'cobras',
        desc: 'Identifique jararacas, cascaveis, corais e surucucus por características visuais e sintomas.',
    },
    {
        label: 'Escorpioes',
        subtitle: 'Tityus serrulatus (Amarelo), Tityus bahiensis',
        bg: '/images/aap2/home-escorpiao-amarelo.jpg',
        categoryId: 'escorpioes',
        desc: 'Escorpiao amarelo e o mais perigoso. Identifique pelo serrilhado na cauda e coloracao.',
    },
    {
        label: 'Aranhas',
        subtitle: 'Phoneutria (Armadeira), Loxosceles (Marrom)',
        bg: '/images/aap2/home-aranha-marrom.jpg',
        categoryId: 'aranhas',
        desc: 'Armadeira assume postura de defesa. Aranha-marrom possui desenho de violino no dorso.',
    },
    {
        label: 'Sapos',
        subtitle: 'Rhinella (Sapo-cururu), Phyllomedusa',
        bg: '/images/aap2/home-sapo-cururu.jpg',
        categoryId: 'sapos',
        desc: 'Intoxicação por bufotoxinas. Contato com mucosas ou ingestao acidental por caes.',
    },
    {
        label: 'Outros & Invertebrados',
        subtitle: 'Lagartas (Lonomia), Caramujos, Abelhas',
        bg: '/images/aap2/home-snail.jpg',
        categoryId: 'outros',
        desc: 'Acidentes com animais peconhentos atipicos e invertebrados terrestres.',
    },
];

const actionCards: Array<{
    id: AppPage;
    title: string;
    description: string;
    icon: React.ElementType;
    badge: string | null;
    theme: {
        text: string;
        textDark: string;
        borderHover: string;
        borderDarkHover: string;
        shadowHover: string;
        waveColor: string;
        waveColorHover: string;
        iconBg: string;
        iconBgDark: string;
    };
    linkText: string;
}> = [
    {
        id: 'histórico',
        title: 'Dr. Luzaum AI',
        description: 'Triagem inteligente: informe sinais e receba análise e protocolo.',
        icon: BrainCircuit,
        badge: 'NOVO',
        theme: {
            text: 'text-[#7e40e7]',
            textDark: 'text-[#a78bfa]',
            borderHover: 'hover:border-[#7e40e7]/40',
            borderDarkHover: 'dark:hover:border-[#a78bfa]/40',
            shadowHover: 'hover:shadow-[#7e40e7]/20',
            waveColor: 'bg-[#7e40e7]/10',
            waveColorHover: 'group-hover:bg-[#7e40e7]/20',
            iconBg: 'bg-white',
            iconBgDark: 'dark:bg-slate-800',
        },
        linkText: 'ACESSAR',
    },
    {
        id: 'suspeitas',
        title: 'Ferramenta de Suspeitas',
        description: 'Ranqueie hipoteses por sinais clínicos.',
        icon: Stethoscope,
        badge: null,
        theme: {
            text: 'text-blue-600',
            textDark: 'text-blue-400',
            borderHover: 'hover:border-blue-400/40',
            borderDarkHover: 'dark:hover:border-blue-400/40',
            shadowHover: 'hover:shadow-blue-500/20',
            waveColor: 'bg-blue-500/10',
            waveColorHover: 'group-hover:bg-blue-500/20',
            iconBg: 'bg-white',
            iconBgDark: 'dark:bg-slate-800',
        },
        linkText: 'ACESSAR',
    },
    {
        id: 'enciclopedia',
        title: 'Enciclopedia',
        description: 'Categorias, fichas completas e protocolos em cards.',
        icon: BookOpen,
        badge: null,
        theme: {
            text: 'text-amber-600',
            textDark: 'text-amber-400',
            borderHover: 'hover:border-amber-400/40',
            borderDarkHover: 'dark:hover:border-amber-400/40',
            shadowHover: 'hover:shadow-amber-500/20',
            waveColor: 'bg-amber-500/10',
            waveColorHover: 'group-hover:bg-amber-500/20',
            iconBg: 'bg-white',
            iconBgDark: 'dark:bg-slate-800',
        },
        linkText: 'ACESSAR',
    },
    {
        id: 'tratamentos',
        title: 'Protocolos',
        description: 'Guias de emergência e estabilizacao.',
        icon: BriefcaseMedical,
        badge: null,
        theme: {
            text: 'text-red-600',
            textDark: 'text-red-400',
            borderHover: 'hover:border-red-400/40',
            borderDarkHover: 'dark:hover:border-red-400/40',
            shadowHover: 'hover:shadow-red-500/20',
            waveColor: 'bg-red-500/10',
            waveColorHover: 'group-hover:bg-red-500/20',
            iconBg: 'bg-white',
            iconBgDark: 'dark:bg-slate-800',
        },
        linkText: 'ACESSAR',
    },
];

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onOpenEncyclopedia, isDarkMode }) => {
    return (
        <div className="w-full h-full">
            <section className="mb-10">
                <h3 className={`text-lg font-bold mb-5 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    <span className="material-symbols-outlined text-[#7e40e7]">visibility</span>
                    Guia de Identificação Rapida
                </h3>
                <div className="species-card-container flex gap-4 h-[450px] w-full">
                    {IDENTIFICATION_CARDS.map((card) => (
                        <div
                            key={card.label}
                            className="species-card rounded-2xl group/link relative flex cursor-pointer"
                            onClick={() => onOpenEncyclopedia({ categoryId: card.categoryId })}
                        >
                            <div
                                className="image-bg absolute inset-0 bg-cover bg-center transition-transform duration-700"
                                style={{ backgroundImage: `url('${card.bg}')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full">
                                <h4 className="text-white text-2xl font-bold mb-1 translate-y-8 group-hover/link:translate-y-0 transition-transform duration-300">
                                    {card.label}
                                </h4>
                                <div className="overlay-content text-white/90">
                                    <p className="text-xs font-bold text-[#efe9fc] uppercase tracking-wider mb-2">{card.subtitle}</p>
                                    <p className="text-xs leading-relaxed mb-4 text-slate-200 line-clamp-3">
                                        {card.desc}
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-xs font-bold bg-white/20 hover:bg-white/30 transition px-3 py-1.5 rounded-lg backdrop-blur-sm">
                                        Ver na Enciclopedia <span className="material-symbols-outlined text-xs">open_in_new</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-10 relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-purple-500/30">
                        <Zap size={20} strokeWidth={2.5} />
                    </div>
                    <h3 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        Ações Rapidas
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {actionCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={card.id}
                                onClick={() => onNavigate(card.id)}
                                className={`
                                    group relative overflow-hidden rounded-3xl
                                    ${isDarkMode ? 'bg-slate-800/40 border-white/10' : 'bg-white/40 border-white/60'}
                                    backdrop-blur-xl border
                                    shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                                    transition-all duration-400 ease-out
                                    hover:-translate-y-2 ${isDarkMode ? 'hover:bg-slate-800/60' : 'hover:bg-white/60'}
                                    ${card.theme.borderHover} ${card.theme.borderDarkHover}
                                    ${card.theme.shadowHover} hover:shadow-2xl
                                    flex flex-col h-full cursor-pointer
                                `}
                            >
                                <div className={`wave-element ${card.theme.waveColor} ${card.theme.waveColorHover}`} />
                                <div className={`wave-element ${card.theme.waveColor} opacity-50 animation-delay-1000 bottom-[-190px]`} />

                                <div className="relative z-10 p-6 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`
                                            w-12 h-12 rounded-2xl flex items-center justify-center
                                            shadow-sm ring-1 ${isDarkMode ? 'ring-white/10' : 'ring-black/5'}
                                            transition-transform duration-300 group-hover:scale-110
                                            ${card.theme.iconBg} ${card.theme.iconBgDark}
                                            ${isDarkMode ? card.theme.textDark : card.theme.text}
                                        `}>
                                            <Icon size={24} strokeWidth={2} />
                                        </div>

                                        {card.badge && (
                                            <span className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-[#7e40e7] to-indigo-500 text-white rounded-full shadow-md shadow-[#7e40e7]/20">
                                                {card.badge}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mb-8 flex-grow">
                                        <h4 className={`text-lg font-bold mb-2 transition-colors ${isDarkMode ? 'text-white group-hover:text-slate-200' : 'text-slate-800 group-hover:text-black'}`}>
                                            {card.title}
                                        </h4>
                                        <p className={`text-sm font-medium leading-relaxed transition-colors line-clamp-3 ${isDarkMode ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-500 group-hover:text-slate-700'}`}>
                                            {card.description}
                                        </p>
                                    </div>

                                    <div className={`
                                        flex items-center gap-2 mt-auto font-bold text-xs tracking-wide
                                        transition-all duration-300 group-hover:gap-3
                                        ${isDarkMode ? card.theme.textDark : card.theme.text}
                                    `}>
                                        {card.linkText}
                                        <ArrowRight size={16} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};
