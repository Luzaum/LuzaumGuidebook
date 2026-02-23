import React, { useMemo, useState } from 'react';
import { Animal } from '../../types';
import { AIImage } from '../shared/AIImage';
import { renderSafeFormattedText } from '../../utils/renderSafeFormattedText';

interface EncyclopediaDetailProps {
    animal: Animal;
}

interface GlossaryContent {
    title: string;
    content: string;
}

const RISK_LABELS: Record<string, string> = {
    high: 'Alta toxicidade',
    moderate: 'Moderado / Venenoso',
    low: 'Baixa toxicidade',
    infectious: 'Infeccioso / Parasitario',
};

// Placeholder scaffold: você pode editar depois com textos finais.
const COMPLEX_TERM_GLOSSARY: Record<string, string> = {
    'Dor local intensa e imediata': 'Explicacao pendente. Descreva a fisiopatologia da dor local e sua relevancia clínica.',
    'Edema progressivo e duro': 'Explicacao pendente. Defina edema progressivo e o impacto prognostico.',
    'Hemorragia local e sistêmica': 'Explicacao pendente. Descreva mecanismo hemorrágico e risco de coagulopatia.',
    'Necrose tecidual': 'Explicacao pendente. Explique necrose, tempo de evolucao e sinais de gravidade.',
    'Hipotensão e choque': 'Explicacao pendente. Diferencie hipotensão inicial de choque instalado.',
};

const getRiskBadgeColor = (level?: string) => {
    switch (level) {
        case 'high':
            return 'bg-red-500/20 text-red-200 border-red-400/30';
        case 'moderate':
            return 'bg-amber-500/20 text-amber-200 border-amber-400/30';
        case 'low':
            return 'bg-blue-500/20 text-blue-200 border-blue-400/30';
        case 'infectious':
            return 'bg-purple-500/20 text-purple-200 border-purple-400/30';
        default:
            return 'bg-slate-500/20 text-slate-200 border-slate-400/30';
    }
};

const normalize = (value: string) =>
    value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

const getSignificanceClass = (significance: string) => {
    if (significance === 'pathognomonic') return 'bg-purple-500/20 text-purple-200';
    if (significance === 'characteristic') return 'bg-blue-500/20 text-blue-200';
    return 'bg-slate-500/20 text-slate-300';
};

const getSignificanceLabel = (significance: string) => {
    if (significance === 'pathognomonic') return 'Patognomonico';
    if (significance === 'characteristic') return 'Caracteristico';
    return 'Geral';
};

export const EncyclopediaDetail: React.FC<EncyclopediaDetailProps> = ({ animal }) => {
    const [glossaryModal, setGlossaryModal] = useState<GlossaryContent | null>(null);
    const match = animal.name.match(/^(.*?)\s*(\(.*?\))?$/);
    const commonName = match ? match[1] : animal.name;
    const scientificName = match ? match[2] : '';
    const riskLabel = RISK_LABELS[animal.riskLevel ?? 'low'] ?? 'Desconhecido';
    const hasContraindication = useMemo(() => normalize(animal.treatment).includes('não usar'), [animal.treatment]);

    const openGlossary = (term: string, fallbackText: string) => {
        setGlossaryModal({
            title: term,
            content: COMPLEX_TERM_GLOSSARY[term] ?? `Explicacao pendente para "${term}". ${fallbackText}`,
        });
    };

    return (
        <div className="h-full overflow-y-auto bg-transparent p-6 lg:p-8">
            {glossaryModal && (
                <div className="tooltip-modal-overlay" onClick={() => setGlossaryModal(null)} role="dialog" aria-modal="true">
                    <div className="tooltip-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            className="tooltip-modal-close"
                            onClick={() => setGlossaryModal(null)}
                            aria-label="Fechar"
                        >
                            x
                        </button>
                        <h3 className="tooltip-modal-title">{glossaryModal.title}</h3>
                        <div className="tooltip-modal-body">{glossaryModal.content}</div>
                    </div>
                </div>
            )}

            <section className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4 rounded-3xl border border-white/10 bg-white/45 p-6 backdrop-blur-xl dark:bg-slate-900/45">
                    <div className="flex flex-wrap gap-2">
                        <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${getRiskBadgeColor(animal.riskLevel)}`}>
                            <span className="material-symbols-outlined text-xs">warning</span>
                            {riskLabel}
                        </span>
                        {animal.family && (
                            <span className="inline-flex items-center rounded-full bg-slate-100/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-800/80 dark:text-slate-300">
                                {animal.family}
                            </span>
                        )}
                    </div>

                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 lg:text-4xl">
                            {commonName}
                        </h1>
                        {scientificName && (
                            <p className="mt-1 text-lg italic text-slate-500 dark:text-slate-300">
                                {scientificName}
                            </p>
                        )}
                        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            {animal.identification}
                        </p>
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/45 p-3 backdrop-blur-xl dark:bg-slate-900/45">
                    <div className="overflow-hidden rounded-2xl border border-white/10">
                        <AIImage
                            animalId={animal.id}
                            animalName={animal.name}
                            imagePrompt={animal.imagePrompt}
                            staticImagePath={animal.staticImagePath}
                            className="h-[260px] w-full object-cover lg:h-[300px]"
                        />
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.8fr_1fr]">
                <div className="space-y-6">
                    <div className="rounded-3xl border border-white/10 bg-white/45 p-6 backdrop-blur-xl dark:bg-slate-900/45">
                        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                            <span className="material-symbols-outlined text-[#7e40e7]">visibility</span>
                            Identificação e morfologia
                        </h3>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-300">{animal.identification}</p>
                    </div>

                    <div className="space-y-4 rounded-3xl border border-white/10 bg-white/45 p-6 backdrop-blur-xl dark:bg-slate-900/45">
                        <h3 className="mb-1 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                            <span className="material-symbols-outlined text-[#7e40e7]">clinical_notes</span>
                            Sinais clínicos
                        </h3>
                        {animal.signs.map((sign) => (
                            <div key={sign.name} className="rounded-2xl border border-white/10 bg-white/50 p-5 backdrop-blur-xl dark:bg-slate-900/45">
                                <div className="mb-2 flex items-start justify-between gap-2">
                                    <div className="flex items-start gap-2">
                                        <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{sign.name}</h4>
                                        <button
                                            type="button"
                                            className="help-btn mt-[1px]"
                                            onClick={() => openGlossary(sign.name, sign.explanation)}
                                            aria-label={`Explicar termo: ${sign.name}`}
                                            title="Ver explicacao"
                                        >
                                            ?
                                        </button>
                                    </div>
                                    <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${getSignificanceClass(sign.significance)}`}>
                                        {getSignificanceLabel(sign.significance)}
                                    </span>
                                </div>
                                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{sign.explanation}</p>
                            </div>
                        ))}
                    </div>

                    <div className="typography-slate rounded-3xl border border-white/10 bg-white/50 p-6 backdrop-blur-xl dark:bg-slate-900/45 dark:text-slate-100">
                        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                            <span className="material-symbols-outlined text-[#7e40e7]">lab_profile</span>
                            Diagnóstico
                        </h3>
                        {renderSafeFormattedText(animal.diagnosis)}
                    </div>

                    <div className="typography-slate rounded-3xl border border-white/10 bg-white/50 p-6 backdrop-blur-xl dark:bg-slate-900/45 dark:text-slate-100">
                        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                            <span className="material-symbols-outlined text-[#7e40e7]">medication</span>
                            Tratamento
                        </h3>
                        {renderSafeFormattedText(animal.treatment)}
                    </div>
                </div>

                <div className="space-y-5">
                    {hasContraindication && (
                        <div className="overflow-hidden rounded-3xl border border-red-400/30 bg-gradient-to-br from-red-600/85 to-red-700/85 p-6 text-white">
                            <h4 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-red-100">
                                <span className="material-symbols-outlined text-base">warning</span>
                                Contraindicação
                            </h4>
                            <p className="text-lg font-black leading-tight">Atenção as restrições</p>
                            <p className="mt-2 text-xs leading-relaxed text-red-50/90">
                                Revise as restrições da terapia antes de iniciar o protocolo, principalmente em pacientes com risco renal.
                            </p>
                        </div>
                    )}

                    <div className="rounded-3xl border border-white/10 bg-white/50 p-6 backdrop-blur-xl dark:bg-slate-900/45">
                        <div className="mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#7e40e7]">local_hospital</span>
                            <h4 className="font-bold text-slate-900 dark:text-slate-100">Gravidade</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            O {animal.accidentName} e classificado como de risco <strong>{riskLabel}</strong>. O prognostico depende da velocidade do atendimento e suporte intensivo.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
