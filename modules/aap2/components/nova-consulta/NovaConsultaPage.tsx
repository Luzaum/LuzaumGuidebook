import React, { useState, useCallback } from 'react';
import '../../styles/dr-luzaum.css';

/* ─── Types ─────────────────────────────────────────────────────── */
type Species = 'canine' | 'feline' | 'equine' | 'exotic' | null;

interface PatientData {
    species: Species;
    weight: string;
    age: string;
    breed: string;
    history: string;
}

interface ClinicalSign {
    id: string;
    label: string;
    system: string;
}

interface NovaConsultaPageProps {
    onNavigateToReport: (patient: PatientData, signs: string[]) => void;
    onBack: () => void;
}

/* ─── Data ───────────────────────────────────────────────────────── */
const SPECIES_OPTIONS: { id: Species; label: string; icon: string }[] = [
    { id: 'canine', label: 'Canino', icon: '🐕' },
    { id: 'feline', label: 'Felino', icon: '🐈' },
    { id: 'equine', label: 'Equino', icon: '🐎' },
    { id: 'exotic', label: 'Exótico', icon: '🦜' },
];

const CLINICAL_SIGNS: { system: string; icon: string; signs: ClinicalSign[] }[] = [
    {
        system: 'Neurologia',
        icon: '🧠',
        signs: [
            { id: 'fraqueza', label: 'Fraqueza Generalizada', system: 'Neurologia' },
            { id: 'ataxia', label: 'Ataxia / Descoordenação', system: 'Neurologia' },
            { id: 'tremores', label: 'Tremores Musculares', system: 'Neurologia' },
            { id: 'paralisia', label: 'Paralisia (Ascendente)', system: 'Neurologia' },
            { id: 'ptose', label: 'Ptose Palpebral', system: 'Neurologia' },
            { id: 'midriase', label: 'Midríase / Disocoria', system: 'Neurologia' },
        ],
    },
    {
        system: 'Hematologia',
        icon: '🩸',
        signs: [
            { id: 'hemorragia', label: 'Hemorragia Ativa', system: 'Hematologia' },
            { id: 'mucosas', label: 'Mucosas Pálidas', system: 'Hematologia' },
            { id: 'equimose', label: 'Equimose / Hematoma', system: 'Hematologia' },
            { id: 'mioglobinuria', label: 'Mioglobinúria (urina escura)', system: 'Hematologia' },
        ],
    },
    {
        system: 'Gastrointestinal',
        icon: '🫀',
        signs: [
            { id: 'vomito', label: 'Vômito (Agudo)', system: 'Gastrointestinal' },
            { id: 'hipersalivacao', label: 'Hipersalivação', system: 'Gastrointestinal' },
            { id: 'diarreia', label: 'Diarreia', system: 'Gastrointestinal' },
        ],
    },
    {
        system: 'Local / Tegumentar',
        icon: '🔍',
        signs: [
            { id: 'edema', label: 'Edema Local', system: 'Local' },
            { id: 'necrose', label: 'Necrose / Bolha', system: 'Local' },
            { id: 'dor', label: 'Dor Intensa no Local', system: 'Local' },
            { id: 'marca_picada', label: 'Marca de Picada Visível', system: 'Local' },
        ],
    },
    {
        system: 'Cardiovascular / Respiratório',
        icon: '💓',
        signs: [
            { id: 'taquicardia', label: 'Taquicardia', system: 'Cardio' },
            { id: 'dispneia', label: 'Dispneia', system: 'Cardio' },
            { id: 'hipotensão', label: 'Hipotensão', system: 'Cardio' },
        ],
    },
];

/* ─── Helpers ────────────────────────────────────────────────────── */
function calcDiagProbability(signs: string[]): { label: string; pct: number; secondary?: string; secondaryPct?: number } {
    const hasNeuro = signs.some(s => ['fraqueza', 'ataxia', 'tremores', 'paralisia', 'ptose', 'midriase'].includes(s));
    const hasHemo = signs.some(s => ['hemorragia', 'equimose', 'mioglobinuria'].includes(s));
    const hasEdema = signs.includes('edema');
    const hasNecrose = signs.includes('necrose');

    if (hasNeuro && hasHemo) return { label: 'Acidente Crotálico', pct: 85, secondary: 'Acidente Botrópico', secondaryPct: 15 };
    if (hasNeuro) return { label: 'Acidente Elapídico / Crotálico', pct: 72, secondary: 'Acidente Botrópico', secondaryPct: 28 };
    if (hasHemo && hasEdema) return { label: 'Acidente Botrópico', pct: 88, secondary: 'Acidente Laquético', secondaryPct: 12 };
    if (hasEdema || hasNecrose) return { label: 'Acidente Botrópico', pct: 76, secondary: 'Acidente Escorpiônico', secondaryPct: 24 };
    if (signs.length === 0) return { label: 'Selecione os sinais', pct: 0 };
    return { label: 'Envenenamento Indeterminado', pct: 45, secondary: 'Analisar com Dr. Luzaum', secondaryPct: 55 };
}

/* ─── Component ─────────────────────────────────────────────────── */
export const NovaConsultaPage: React.FC<NovaConsultaPageProps> = ({ onNavigateToReport, onBack }) => {
    const [patient, setPatient] = useState<PatientData>({ species: null, weight: '', age: '', breed: '', history: '' });
    const [checkedSigns, setCheckedSigns] = useState<Set<string>>(new Set());

    const toggleSign = useCallback((id: string) => {
        setCheckedSigns(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }, []);

    const resetSigns = useCallback(() => setCheckedSigns(new Set()), []);

    const signArray = Array.from(checkedSigns);
    const prob = calcDiagProbability(signArray);
    const canSubmit = !!patient.species && signArray.length > 0;

    return (
        <div className="flex flex-col h-screen bg-[#0f0f12] text-slate-100 font-sans overflow-hidden">
            {/* ── Header ─────────────────────────────────────────── */}
            <header className="dl-glass h-16 flex items-center justify-between px-6 border-b border-white/10 shrink-0 z-50">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-slate-300 hover:text-white"
                        title="Voltar"
                    >
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <div className="w-8 h-8 rounded-lg bg-[#6a25f4] flex items-center justify-center text-white font-bold text-sm">🐾</div>
                    <h1 className="text-base font-bold tracking-tight text-white">
                        Nova Consulta <span className="text-slate-400 font-normal ml-2 text-sm">| Triagem de Envenenamento</span>
                    </h1>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={resetSigns}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm font-medium border border-white/5 text-slate-400 hover:text-white"
                    >
                        Resetar
                    </button>
                </div>
            </header>

            {/* ── Main: Split Screen ──────────────────────────────── */}
            <main className="flex flex-1 overflow-hidden">

                {/* Left: Patient Profile */}
                <aside className="w-full lg:w-[400px] xl:w-[460px] shrink-0 flex flex-col border-r border-white/10 bg-[#120d1a] overflow-y-auto dl-scroll">
                    <div className="p-6 flex flex-col gap-7">
                        <div>
                            <h2 className="text-xl font-bold text-white mb-1">Perfil do Paciente</h2>
                            <p className="text-slate-400 text-sm">Selecione a espécie e informe os dados.</p>
                        </div>

                        {/* Species Grid */}
                        <div className="flex flex-col gap-3">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Espécie</label>
                            <div className="grid grid-cols-2 gap-3">
                                {SPECIES_OPTIONS.map(sp => (
                                    <button
                                        key={sp.id}
                                        onClick={() => setPatient(p => ({ ...p, species: sp.id }))}
                                        className={`dl-species-card relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all h-24 cursor-pointer select-none ${patient.species === sp.id
                                                ? 'border-[#6a25f4] bg-[#6a25f4]/20 selected'
                                                : 'border-white/10 bg-white/5 hover:border-[#6a25f4]/40'
                                            }`}
                                    >
                                        <span className="text-3xl">{sp.icon}</span>
                                        <span className={`text-sm font-medium ${patient.species === sp.id ? 'text-white' : 'text-slate-400'}`}>{sp.label}</span>
                                        {patient.species === sp.id && (
                                            <div className="absolute top-2 right-2 w-4 h-4 bg-[#6a25f4] rounded-full flex items-center justify-center">
                                                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" /></svg>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Vitals */}
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                <label className="flex-1 flex flex-col gap-2">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Peso (kg)</span>
                                    <div className="relative">
                                        <input
                                            type="number" min="0" step="0.1" placeholder="0.0"
                                            value={patient.weight}
                                            onChange={e => setPatient(p => ({ ...p, weight: e.target.value }))}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4 pr-10 text-white placeholder-white/20 focus:outline-none focus:border-[#6a25f4] focus:ring-1 focus:ring-[#6a25f4] transition font-medium text-sm"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">kg</span>
                                    </div>
                                </label>
                                <label className="flex-1 flex flex-col gap-2">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Idade (anos)</span>
                                    <input
                                        type="number" min="0" step="0.5" placeholder="0"
                                        value={patient.age}
                                        onChange={e => setPatient(p => ({ ...p, age: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4 text-white placeholder-white/20 focus:outline-none focus:border-[#6a25f4] focus:ring-1 focus:ring-[#6a25f4] transition font-medium text-sm"
                                    />
                                </label>
                            </div>
                            <label className="flex flex-col gap-2">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Raça (Opcional)</span>
                                <input
                                    type="text" placeholder="ex: Golden Retriever"
                                    value={patient.breed}
                                    onChange={e => setPatient(p => ({ ...p, breed: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4 text-white placeholder-white/20 focus:outline-none focus:border-[#6a25f4] focus:ring-1 focus:ring-[#6a25f4] transition font-medium text-sm"
                                />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Histórico do Incidente</span>
                                <textarea
                                    rows={4} placeholder="Descreva brevemente o contexto da exposição ou da picada..."
                                    value={patient.history}
                                    onChange={e => setPatient(p => ({ ...p, history: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-white/20 focus:outline-none focus:border-[#6a25f4] focus:ring-1 focus:ring-[#6a25f4] transition resize-none text-sm"
                                />
                            </label>
                        </div>
                    </div>
                </aside>

                {/* Right: Clinical Signs */}
                <section className="flex-1 flex flex-col relative bg-[#0f0f12]/50 overflow-hidden">
                    {/* Sticky probability header */}
                    <div className="sticky top-0 z-40 dl-glass border-b border-white/10 px-6 py-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                                <span className="text-base">📊</span> Probabilidade Dinâmica
                            </h3>
                            <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded">{signArray.length} sinais selecionados</span>
                        </div>
                        <div className="flex flex-col gap-2.5">
                            {prob.pct > 0 && (
                                <div className="flex items-center gap-4">
                                    <div className="w-44 shrink-0">
                                        <span className="font-bold text-white text-sm">{prob.label}</span>
                                    </div>
                                    <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-[#6a25f4] to-purple-400 rounded-full transition-all duration-500" style={{ width: `${prob.pct}%` }} />
                                    </div>
                                    <span className="w-12 text-right font-bold text-[#6a25f4] text-sm">{prob.pct}%</span>
                                </div>
                            )}
                            {prob.secondary && (
                                <div className="flex items-center gap-4 opacity-55">
                                    <div className="w-44 shrink-0">
                                        <span className="font-medium text-slate-300 text-sm">{prob.secondary}</span>
                                    </div>
                                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-slate-500 rounded-full transition-all duration-500" style={{ width: `${prob.secondaryPct ?? 0}%` }} />
                                    </div>
                                    <span className="w-12 text-right font-medium text-slate-400 text-sm">{prob.secondaryPct}%</span>
                                </div>
                            )}
                            {prob.pct === 0 && (
                                <p className="text-slate-500 text-sm">Selecione os sinais clínicos para gerar probabilidade.</p>
                            )}
                        </div>
                    </div>

                    {/* Scrollable signs list */}
                    <div className="flex-1 overflow-y-auto dl-scroll px-6 py-6 pb-32">
                        <div className="max-w-3xl mx-auto flex flex-col gap-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white">Sinais Clínicos</h2>
                                <button onClick={resetSigns} className="text-sm text-[#6a25f4] hover:text-purple-300 font-medium transition-colors">Limpar todos</button>
                            </div>

                            {CLINICAL_SIGNS.map(group => (
                                <div key={group.system} className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                                        <span className="text-xl">{group.icon}</span>
                                        <h3 className="text-base font-semibold text-white">{group.system}</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {group.signs.map(sign => {
                                            const checked = checkedSigns.has(sign.id);
                                            return (
                                                <label
                                                    key={sign.id}
                                                    onClick={() => toggleSign(sign.id)}
                                                    className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all select-none ${checked
                                                            ? 'bg-[#6a25f4]/15 border border-[#6a25f4]/40'
                                                            : 'bg-white/5 border border-white/5 hover:bg-white/10'
                                                        }`}
                                                >
                                                    <span className={`text-sm transition-colors ${checked ? 'text-white font-medium' : 'text-slate-300'}`}>{sign.label}</span>
                                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0 ${checked ? 'bg-[#6a25f4] border-[#6a25f4]' : 'border-slate-500 bg-transparent'
                                                        }`}>
                                                        {checked && (
                                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Floating CTA footer */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 dl-glass border-t border-white/10 z-50 flex justify-center">
                        <button
                            onClick={() => canSubmit && onNavigateToReport(patient, signArray)}
                            disabled={!canSubmit}
                            className={`dl-neon-btn w-full max-w-xl h-13 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 tracking-wide transition-all ${canSubmit
                                    ? 'bg-[#6a25f4] hover:bg-[#7c3aed] text-white cursor-pointer'
                                    : 'bg-white/10 text-slate-500 cursor-not-allowed opacity-50 !shadow-none !transform-none'
                                }`}
                        >
                            <span className="text-xl">🩺</span>
                            {canSubmit ? 'Consultar Dr. Luzaum AI' : 'Selecione espécie e sinais clínicos'}
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default NovaConsultaPage;
