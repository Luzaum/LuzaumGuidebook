import React, { useState } from 'react';
import '../../styles/dr-luzaum.css';

/* ─── Types ─────────────────────────────────────────────────────── */
interface PatientData {
    species: string | null;
    weight: string;
    age: string;
    breed: string;
    history: string;
}

interface DrLuzaumReportPageProps {
    patient: PatientData;
    selectedSigns: string[];
    onBack: () => void;
    onNewConsulta: () => void;
}

/* ─── Data helpers ───────────────────────────────────────────────── */
type Diagnosis = {
    name: string;
    sciName: string;
    confidence: number;
    gaugePct: string;
    signs: Array<{ label: string; match: boolean }>;
    contraindication: string;
    contraNote: string;
    treatment: TreatmentStep[];
    references: Array<{ title: string; author: string }>;
};

interface TreatmentStep {
    order: number;
    title: string;
    subtitle: string;
    priority?: 'alta' | 'media' | null;
    fields: Array<{ label: string; value: string; hint?: string }>;
    warning?: string;
}

function buildDiagnosis(signs: string[], patient: PatientData): Diagnosis {
    const hasNeuro = signs.some(s => ['fraqueza', 'ataxia', 'tremores', 'paralisia', 'ptose', 'midriase'].includes(s));
    const hasHemo = signs.some(s => ['hemorragia', 'equimose', 'mioglobinuria'].includes(s));
    const hasEdema = signs.includes('edema');
    const weight = parseFloat(patient.weight) || 10;

    if (hasNeuro && hasHemo) {
        return {
            name: 'Acidente Crotálico', sciName: 'Crotalus durissus', confidence: 88, gaugePct: '88%',
            signs: [
                { label: 'Fraqueza Generalizada', match: signs.includes('fraqueza') },
                { label: 'Ptose Palpebral', match: signs.includes('ptose') },
                { label: 'Mioglobinúria', match: signs.includes('mioglobinuria') },
                { label: 'Hemorragia Ativa', match: signs.includes('hemorragia') },
                { label: 'Edema Local', match: hasEdema },
            ],
            contraindication: 'NÃO USAR AINES',
            contraNote: 'Alto risco de nefrotoxicidade potencializada por frações miotóxicas do veneno crotálico.',
            treatment: [
                {
                    order: 1, title: 'Soro Anticrotálico', subtitle: 'Neutralização da Toxina', priority: 'alta',
                    fields: [
                        { label: 'Dose Recomendada', value: '10 a 20 Frascos', hint: 'Diluir em SF 0.9%' },
                        { label: 'Via de Administração', value: 'Intravenosa (IV)', hint: 'Infusão lenta 30–60 min' },
                    ],
                    warning: 'Monitorar reações anafiláticas. Ter adrenalina (0.01 mg/kg IM) disponível.',
                },
                {
                    order: 2, title: 'Fluidoterapia', subtitle: 'Proteção Renal', priority: null,
                    fields: [
                        { label: 'Solução', value: 'Ringer Lactato' },
                        { label: 'Taxa', value: '60–90 ml/kg/dia' },
                        { label: 'Volume 24h', value: `~${Math.round(weight * 75)} ml` },
                    ],
                },
                {
                    order: 3, title: 'Analgesia', subtitle: 'Controle de Dor', priority: null,
                    fields: [
                        { label: 'Opção 1', value: 'Metadona 0.2–0.4 mg/kg IM/IV' },
                        { label: 'Opção 2', value: 'Morfina 0.1–0.2 mg/kg SC/IM' },
                    ],
                },
                {
                    order: 4, title: 'Monitoramento', subtitle: 'Controle Urológico', priority: null,
                    fields: [
                        { label: 'Sondagem vesical', value: 'Medir débito urinário' },
                        { label: 'Frequência', value: 'A cada 2–4h' },
                    ],
                },
            ],
            references: [
                { title: 'Toxicologia Aplicada à Medicina Veterinária', author: 'Spinosa, H.S. et al.' },
                { title: 'Guia de Animais Peçonhentos do Brasil', author: 'Ministério da Saúde, FUNASA' },
            ],
        };
    }

    if (hasHemo || hasEdema) {
        return {
            name: 'Acidente Botrópico', sciName: 'Bothrops (Jararaca)', confidence: 92, gaugePct: '92%',
            signs: [
                { label: 'Edema Local', match: hasEdema },
                { label: 'Hemorragia', match: signs.includes('hemorragia') },
                { label: 'Ação Proteolítica (Necrose)', match: signs.includes('necrose') },
                { label: 'Neurotoxicidade', match: false },
                { label: 'Mioglobinúria', match: signs.includes('mioglobinuria') },
            ],
            contraindication: 'NÃO USAR AINES',
            contraNote: 'Alto risco de agravar hemorragias e insuficiência renal aguda em acidentes botrópicos.',
            treatment: [
                {
                    order: 1, title: 'Soro Antibotrópico', subtitle: 'Neutralização da Toxina', priority: 'alta',
                    fields: [
                        { label: 'Dose Recomendada', value: '3 a 5 Frascos', hint: 'Diluir em solução fisiológica' },
                        { label: 'Via de Administração', value: 'Intravenosa (IV)', hint: 'Infusão lenta 20–30 min' },
                    ],
                    warning: 'Monitorar reações anafiláticas durante a infusão. Ter adrenalina preparada.',
                },
                {
                    order: 2, title: 'Fluidoterapia', subtitle: 'Manutenção da Perfusão Renal', priority: null,
                    fields: [
                        { label: 'Solução', value: 'Ringer Lactato' },
                        { label: 'Taxa', value: '60 ml/kg/dia' },
                        { label: 'Volume Total', value: `~${Math.round(weight * 60)} ml / 24h` },
                    ],
                },
                {
                    order: 3, title: 'Analgesia', subtitle: 'Controle da Dor Aguda', priority: null,
                    fields: [
                        { label: 'Tramadol', value: `${Math.round(weight * 3)} mg (2–4 mg/kg)`, hint: 'BID ou TID' },
                        { label: 'Dipirona', value: `${Math.round(weight * 25)} mg (25 mg/kg)`, hint: 'TID (IV lento)' },
                    ],
                },
            ],
            references: [
                { title: 'Toxicologia Aplicada à Medicina Veterinária', author: 'Spinosa, H.S. et al.' },
                { title: 'Guia de Animais Peçonhentos', author: 'Ministério da Saúde' },
            ],
        };
    }

    return {
        name: 'Envenenamento Indeterminado', sciName: 'Análise pendente de sinais', confidence: 45, gaugePct: '45%',
        signs: [],
        contraindication: 'AINES – Uso Cauteloso',
        contraNote: 'Aguardar diagnóstico definitivo antes de iniciar anti-inflamatórios.',
        treatment: [
            {
                order: 1, title: 'Suporte Geral', subtitle: 'Estabilização Inicial', priority: 'alta',
                fields: [
                    { label: 'Fluidoterapia', value: 'Ringer Lactato IV, 10 ml/kg bolus' },
                    { label: 'Oxigenoterapia', value: 'Máscara ou cânula nasal' },
                ],
            },
        ],
        references: [
            { title: 'Toxicologia Aplicada à Medicina Veterinária', author: 'Spinosa, H.S. et al.' },
        ],
    };
}

function speciesLabel(sp: string | null): string {
    const map: Record<string, string> = { canine: 'Canino', feline: 'Felino', equine: 'Equino', exotic: 'Exótico' };
    return sp ? (map[sp] ?? sp) : 'Não informado';
}
function speciesEmoji(sp: string | null): string {
    const map: Record<string, string> = { canine: '🐕', feline: '🐈', equine: '🐎', exotic: '🦜' };
    return sp ? (map[sp] ?? '🐾') : '🐾';
}

/* ─── Component ─────────────────────────────────────────────────── */
export const DrLuzaumReportPage: React.FC<DrLuzaumReportPageProps> = ({
    patient, selectedSigns, onBack, onNewConsulta,
}) => {
    const dx = buildDiagnosis(selectedSigns, patient);
    const [printing, setPrinting] = useState(false);

    const handlePrint = () => {
        setPrinting(true);
        setTimeout(() => { window.print(); setPrinting(false); }, 300);
    };

    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const protocol = `APX-${Math.floor(Math.random() * 9000 + 1000)}`;

    // Gauge conic gradient degree
    const gaugeAngle = Math.round((dx.confidence / 100) * 360);
    const gaugeStyle = {
        background: `conic-gradient(#6a25f4 0deg ${gaugeAngle}deg, #2e2938 ${gaugeAngle}deg 360deg)`,
    } as React.CSSProperties;

    return (
        <div className="min-h-screen bg-[#120e16] text-slate-100 font-sans flex flex-col">
            {/* ── Header ─────────────────────────────────────────── */}
            <header className="sticky top-0 z-50 dl-glass border-b border-white/10">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Brand */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={onBack}
                                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-slate-300 hover:text-white mr-1"
                            >
                                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                            </button>
                            <div className="flex items-center justify-center w-8 h-8 rounded bg-[#6a25f4] text-white shadow-lg shadow-[#6a25f4]/30">
                                <span className="text-sm">🐾</span>
                            </div>
                            <div>
                                <h1 className="text-white text-base font-bold tracking-tight leading-none">Dr. Luzaum AI</h1>
                                <span className="text-xs text-slate-400 font-medium tracking-wide">Toxicologia Veterinária</span>
                            </div>
                        </div>
                        {/* Status badge */}
                        <div className="hidden md:flex items-center px-3 py-1 rounded-full bg-[#6a25f4]/10 border border-[#6a25f4]/30">
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6a25f4] opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6a25f4]" />
                            </span>
                            <span className="text-xs font-bold text-[#6a25f4] tracking-wide uppercase">Análise Concluída</span>
                        </div>
                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrint}
                                disabled={printing}
                                className="hidden sm:flex items-center gap-2 h-9 px-3 rounded bg-[#18181b] border border-white/10 hover:bg-white/5 transition text-sm font-medium text-white"
                            >
                                🖨️ <span>Imprimir</span>
                            </button>
                            <button
                                onClick={onNewConsulta}
                                className="flex items-center gap-2 h-9 px-4 rounded bg-[#6a25f4] hover:bg-[#7c3aed] transition text-sm font-bold text-white shadow-lg shadow-[#6a25f4]/20"
                            >
                                <span>+ Nova Consulta</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── Main ─────────────────────────────────────────────── */}
            <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
                {/* Page header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-[#6a25f4] text-sm font-medium mb-1">
                            <span>📋</span>
                            <span>Protocolo #{protocol}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">Relatório de Análise Clínica</h2>
                        <p className="text-slate-400 mt-1">Gerado em {dateStr} às {timeStr}</p>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left sidebar */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Patient summary */}
                        <section className="dl-glass rounded-xl p-5">
                            <h3 className="text-white font-bold text-lg flex items-center gap-2 mb-4">
                                <span className="text-[#6a25f4]">📁</span> Síntese do Caso
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Espécie', value: `${speciesEmoji(patient.species)} ${speciesLabel(patient.species)}` },
                                    { label: 'Peso', value: patient.weight ? `${patient.weight} kg` : '—' },
                                    { label: 'Idade', value: patient.age ? `${patient.age} anos` : '—' },
                                    { label: 'Raça', value: patient.breed || '—' },
                                ].map(item => (
                                    <div key={item.label} className="bg-[#18181b]/50 border border-white/8 p-3 rounded flex flex-col gap-1">
                                        <span className="text-xs text-slate-400 font-medium">{item.label}</span>
                                        <span className="text-white font-bold text-sm">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                            {patient.history && (
                                <div className="mt-3 bg-[#6a25f4]/10 border border-[#6a25f4]/20 p-3 rounded">
                                    <span className="text-xs text-[#6a25f4] font-bold uppercase tracking-wider block mb-1">Histórico</span>
                                    <p className="text-slate-300 text-sm leading-relaxed">{patient.history}</p>
                                </div>
                            )}
                        </section>

                        {/* Diagnosis gauge */}
                        <section className="dl-glass rounded-xl p-6 relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#6a25f4]/15 blur-[60px] rounded-full pointer-events-none" />
                            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2 relative z-10">
                                <span className="text-[#6a25f4]">🏥</span> Diagnóstico Provável
                            </h3>
                            <div className="flex flex-col items-center justify-center mb-5 relative z-10">
                                <div className="relative w-44 h-44 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-[#6a25f4]/25" style={gaugeStyle}>
                                    <div className="w-36 h-36 bg-[#17141d] rounded-full flex flex-col items-center justify-center z-10">
                                        <span className="text-4xl font-black text-white tracking-tighter">
                                            {dx.confidence}<span className="text-xl text-slate-400">%</span>
                                        </span>
                                        <span className="text-xs text-[#6a25f4] font-bold uppercase tracking-wider mt-1">Confiança</span>
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-white text-center mb-1">{dx.name}</h4>
                                <p className="text-slate-400 text-sm text-center italic">{dx.sciName}</p>
                            </div>
                            {dx.signs.length > 0 && (
                                <div className="space-y-2.5 relative z-10">
                                    {dx.signs.map(s => (
                                        <div key={s.label} className={`flex items-center justify-between text-sm ${!s.match ? 'opacity-50' : ''}`}>
                                            <span className="text-slate-400 flex items-center gap-2">
                                                <span className={`w-1.5 h-1.5 rounded-full ${s.match ? 'bg-[#6a25f4]' : 'bg-slate-600'}`} />
                                                {s.label}
                                            </span>
                                            {s.match ? (
                                                <span className="text-green-400 font-bold text-xs bg-green-400/10 px-2 py-0.5 rounded border border-green-400/20">MATCH</span>
                                            ) : (
                                                <span className="text-slate-400 font-bold text-xs bg-slate-400/10 px-2 py-0.5 rounded border border-slate-400/20">NO MATCH</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Contraindication */}
                        <section className="rounded-xl p-5 border border-red-500/40 bg-red-500/5 shadow-lg shadow-red-500/10 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,#000_8px,#000_10px)]" />
                            <div className="relative z-10">
                                <h3 className="text-red-400 font-black text-base mb-3 flex items-center gap-2 uppercase tracking-wide">
                                    ⚠️ Contraindicações
                                </h3>
                                <div className="bg-[#120e16]/80 p-4 rounded border border-red-500/20 mb-2">
                                    <p className="text-white font-bold text-base mb-1">{dx.contraindication}</p>
                                    <p className="text-slate-300 text-sm leading-relaxed">{dx.contraNote}</p>
                                </div>
                                <p className="text-xs text-red-400/80 font-medium px-1">Monitorar tempo de coagulação a cada 4h.</p>
                            </div>
                        </section>
                    </div>

                    {/* Right: Treatment */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <section className="dl-glass rounded-xl p-6 lg:p-8 h-full">
                            <div className="flex items-center justify-between mb-7">
                                <div>
                                    <h3 className="text-white font-bold text-2xl flex items-center gap-3">
                                        <span className="p-2 rounded bg-[#6a25f4]/20 text-[#6a25f4] text-lg">💊</span>
                                        Conduta Terapêutica
                                    </h3>
                                    <p className="text-slate-400 mt-1 text-sm">Protocolo calculado com base em {patient.weight ? `${patient.weight} kg` : 'dados informados'} e espécie.</p>
                                </div>
                            </div>

                            {/* Treatment timeline */}
                            <div className="relative">
                                <div className="absolute left-[19px] top-4 bottom-10 w-0.5 bg-gradient-to-b from-[#6a25f4] via-[#6a25f4]/50 to-transparent" />
                                <div className="space-y-7">
                                    {dx.treatment.map((step, idx) => (
                                        <div key={step.order} className="relative pl-12 group">
                                            <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold z-10 ${idx === 0
                                                    ? 'bg-[#6a25f4] border-4 border-[#120e16] shadow-lg shadow-[#6a25f4]/30'
                                                    : 'bg-[#1d1825] border-4 border-[#120e16] text-slate-400 ring-2 ring-[#6a25f4]/30'
                                                }`}>
                                                {step.order}
                                            </div>
                                            <div className="bg-[#1d1825]/40 border border-white/8 rounded-xl p-5 hover:border-[#6a25f4]/40 transition duration-300">
                                                <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                                                    <div>
                                                        <h4 className="text-xl font-bold text-white">{step.title}</h4>
                                                        <span className={`text-sm font-medium ${idx === 0 ? 'text-[#6a25f4]' : 'text-slate-400'}`}>{step.subtitle}</span>
                                                    </div>
                                                    {step.priority === 'alta' && (
                                                        <div className="bg-[#6a25f4]/20 text-[#6a25f4] px-3 py-1 rounded text-sm font-bold border border-[#6a25f4]/30">
                                                            Prioridade Alta
                                                        </div>
                                                    )}
                                                </div>
                                                <div className={`grid gap-3 mt-2 ${step.fields.length === 2 ? 'md:grid-cols-2' : step.fields.length === 3 ? 'md:grid-cols-3' : ''}`}>
                                                    {step.fields.map(f => (
                                                        <div key={f.label} className="bg-[#120e16] p-3 rounded border border-white/5">
                                                            <p className="text-slate-400 text-xs uppercase font-bold mb-1">{f.label}</p>
                                                            <p className="text-white font-medium text-base">{f.value}</p>
                                                            {f.hint && <p className="text-slate-400 text-xs mt-1">{f.hint}</p>}
                                                        </div>
                                                    ))}
                                                </div>
                                                {step.warning && (
                                                    <div className="mt-3 flex items-start gap-2 text-sm text-slate-300 bg-[#120e16]/40 p-2.5 rounded">
                                                        <span className="text-[#6a25f4] mt-0.5 shrink-0">⚠️</span>
                                                        <p>{step.warning}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* References */}
                        <section className="border-t border-white/10 pt-6 pb-2">
                            <h5 className="text-white text-sm font-bold mb-3 flex items-center gap-2">
                                <span className="text-slate-400 text-lg">📚</span>
                                Referências Literárias &amp; Base de Conhecimento
                            </h5>
                            <div className="grid md:grid-cols-2 gap-4">
                                {dx.references.map(ref => (
                                    <div key={ref.title} className="flex gap-3 items-start p-3 rounded hover:bg-white/5 transition cursor-pointer">
                                        <div className="w-10 h-14 bg-slate-700 rounded-sm flex-shrink-0 flex items-end justify-center pb-1">
                                            <span className="text-xs text-slate-400">📖</span>
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-medium leading-tight">{ref.title}</p>
                                            <p className="text-slate-400 text-xs mt-1">{ref.author}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* ── Footer ─────────────────────────────────────────── */}
            <footer className="mt-auto border-t border-white/10 py-5 px-4">
                <div className="max-w-[1400px] mx-auto text-center">
                    <p className="text-slate-500 text-xs">
                        © {now.getFullYear()} Dr. Luzaum AI — Ferramenta auxiliar de diagnóstico. A decisão clínica final é responsabilidade exclusiva do médico-veterinário.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default DrLuzaumReportPage;
