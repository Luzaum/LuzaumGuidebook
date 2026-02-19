import React, { useState } from 'react';
import { Animal } from '../../types';
import { AIImage } from '../shared/AIImage';
import { renderSafeFormattedText } from '../../utils/renderSafeFormattedText';

interface EncyclopediaDetailProps {
    animal: Animal;
}

type Tab = 'identification' | 'signs' | 'diagnosis' | 'treatment';

export const EncyclopediaDetail: React.FC<EncyclopediaDetailProps> = ({ animal }) => {
    const [activeTab, setActiveTab] = useState<Tab>('identification');

    // Extract scientific name and common name
    const match = animal.name.match(/^(.*?)\s*(\(.*?\))?$/);
    const commonName = match ? match[1] : animal.name;
    const scientificName = match ? match[2] : '';

    const getRiskBadgeColor = (level?: string) => {
        switch (level) {
            case 'high': return 'bg-red-100 text-red-600';
            case 'moderate': return 'bg-amber-100 text-amber-600';
            case 'low': return 'bg-blue-100 text-blue-600';
            case 'infectious': return 'bg-purple-100 text-purple-600';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    const riskLabel = {
        'high': 'Altamente Peçonhenta',
        'moderate': 'Moderado / Venenoso',
        'low': 'Baixa Toxicidade',
        'infectious': 'Infeccioso / Parasitário',
    }[animal.riskLevel || 'low'] || 'Desconhecido';

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-50/50">
            {/* Header / Hero */}
            <header className="p-8 pb-0">
                <section className="flex flex-col md:flex-row gap-8 items-start mb-8">
                    <div className="flex-1 space-y-4">
                        <div className="flex gap-2 flex-wrap">
                            <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1 ${getRiskBadgeColor(animal.riskLevel)}`}>
                                <span className="material-symbols-outlined text-xs">warning</span> {riskLabel}
                            </span>
                            {animal.family && (
                                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                    {animal.family}
                                </span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                                {commonName} <span className="text-slate-400 font-normal italic text-2xl lg:text-3xl block lg:inline mt-1 lg:mt-0">{scientificName}</span>
                            </h1>
                            <p className="mt-4 text-base lg:text-lg text-slate-600 max-w-2xl leading-relaxed">
                                {animal.identification}
                            </p>
                        </div>
                        {/* Action Buttons Placeholder - could be hooked up to real actions if needed */}
                        {/* 
                        <div className="flex gap-4 pt-2">
                            <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all text-sm">
                                <span className="material-symbols-outlined">medical_services</span> Protocolo de Emergência
                            </button>
                        </div>
                        */}
                    </div>

                    <div className="w-full md:w-[350px] lg:w-[400px] shrink-0">
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl group border-[6px] border-white ring-1 ring-slate-900/5 aspect-[4/3]">
                            <AIImage
                                animalId={animal.id}
                                animalName={animal.name}
                                imagePrompt={animal.imagePrompt}
                                staticImagePath={animal.staticImagePath}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">photo_camera</span> Espécime Adulto
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tabs */}
                <nav className="flex border-b border-slate-200 gap-6 lg:gap-8 overflow-x-auto">
                    {[
                        { id: 'identification', label: 'Identificação' },
                        { id: 'signs', label: 'Sinais Clínicos' },
                        { id: 'diagnosis', label: 'Diagnóstico' },
                        { id: 'treatment', label: 'Tratamento' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as Tab)}
                            className={`pb-4 text-sm whitespace-nowrap transition-colors border-b-2 px-1 ${activeTab === tab.id
                                    ? 'font-bold text-primary border-primary'
                                    : 'font-medium text-slate-500 hover:text-slate-800 border-transparent'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </header>

            {/* Content Area */}
            <div className="p-8 pt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">

                    {activeTab === 'identification' && (
                        <div className="space-y-6">
                            <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white">
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">visibility</span>
                                    Morfologia Detalhada
                                </h3>
                                <p className="text-slate-600 leading-relaxed">{animal.identification}</p>
                                <div className="mt-6 p-4 bg-blue-50 rounded-xl text-blue-800 text-sm flex gap-3 items-start">
                                    <span className="material-symbols-outlined shrink-0">info</span>
                                    <div>
                                        <strong>Dica Prática:</strong> Observe o padrão das escamas e o formato da cabeça. Fotos do animal trazido pelo tutor podem ser cruciais para confirmar a identificação.
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'signs' && (
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                                    <span className="material-symbols-outlined text-primary">clinical_notes</span>
                                    Quadro Clínico
                                </h3>
                                <div className="grid gap-4">
                                    {animal.signs.map((sign, index) => (
                                        <div key={index} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-slate-900 text-base">{sign.name}</h4>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${sign.significance === 'pathognomonic'
                                                        ? 'bg-purple-100 text-purple-700'
                                                        : sign.significance === 'characteristic'
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : 'bg-slate-100 text-slate-500'
                                                    }`}>
                                                    {sign.significance === 'pathognomonic' ? 'Patognomônico' : sign.significance === 'characteristic' ? 'Característico' : 'Geral'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-500 leading-relaxed">{sign.explanation}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'diagnosis' && (
                        <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white typography-slate">
                            {renderSafeFormattedText(animal.diagnosis)}
                        </div>
                    )}

                    {activeTab === 'treatment' && (
                        <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white typography-slate">
                            {renderSafeFormattedText(animal.treatment)}
                        </div>
                    )}

                </div>

                {/* Side Panels - Always visible or contextual? The design shows specific panels. */}
                <div className="space-y-6">
                    {/* Contraindication - Layout: Red Gradient Card */}
                    {animal.treatment.toLowerCase().includes('não usar') && (
                        <div className="bg-gradient-to-br from-red-500 to-red-700 p-6 rounded-2xl text-white shadow-xl shadow-red-200 relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 opacity-10">
                                <span className="material-symbols-outlined text-9xl">block</span>
                            </div>
                            <h4 className="flex items-center gap-2 font-bold uppercase tracking-wider mb-2 text-sm text-red-100">
                                <span className="material-symbols-outlined text-lg">warning</span> Contraindicação
                            </h4>
                            <p className="text-lg font-black mb-2 leading-tight">ATENÇÃO ÀS RESTRIÇÕES</p>
                            <p className="text-xs text-red-50 leading-relaxed opacity-90">
                                Verifique cuidadosamente as contraindicações no protocolo de tratamento (ex: AINEs em acidentes botrópicos).
                            </p>
                        </div>
                    )}

                    {/* Quick Stats / Info */}
                    <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-primary/5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                <span className="material-symbols-outlined">local_hospital</span>
                            </div>
                            <h4 className="font-bold text-slate-900">Gravidade</h4>
                        </div>
                        <p className="text-sm text-slate-600 mb-4">
                            O {animal.accidentName} é classificado como de risco <strong>{riskLabel}</strong>. O prognóstico depende da rapidez do atendimento.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
