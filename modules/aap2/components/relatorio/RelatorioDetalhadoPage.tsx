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

interface EvidenceBadge {
    label: string;
    severity: 'critical' | 'severe' | 'moderate' | 'mild' | 'neutral';
}

interface ActionItem {
    id: string;
    label: string;
    detail: string;
    done: boolean;
}

interface RelatorioDetalhadoPageProps {
    patient: PatientData;
    selectedSigns: string[];
    diagnosis: string;
    diagnosisSciName: string;
    confidence: number;
    onBack: () => void;
    onNewConsulta: () => void;
}

/* ─── Helpers ────────────────────────────────────────────────────── */
function buildEvidence(signs: string[]): EvidenceBadge[] {
    const map: Record<string, EvidenceBadge> = {
        hemorragia: { label: 'Hemorragia Ativa', severity: 'critical' },
        mioglobinuria: { label: 'Mioglobinúria', severity: 'critical' },
        paralisia: { label: 'Paralisia', severity: 'critical' },
        ptose: { label: 'Ptose Palpebral', severity: 'severe' },
        ataxia: { label: 'Ataxia', severity: 'severe' },
        midriase: { label: 'Midríase', severity: 'severe' },
        necrose: { label: 'Necrose / Bolha', severity: 'severe' },
        edema: { label: 'Edema Local', severity: 'moderate' },
        fraqueza: { label: 'Fraqueza Generalizada', severity: 'moderate' },
        tremores: { label: 'Tremores Musculares', severity: 'moderate' },
        taquicardia: { label: 'Taquicardia', severity: 'mild' },
        dispneia: { label: 'Dispneia', severity: 'mild' },
        vomito: { label: 'Vômito Agudo', severity: 'mild' },
        hipersalivacao: { label: 'Hipersalivação', severity: 'mild' },
        equimose: { label: 'Equimose / Hematoma', severity: 'mild' },
        mucosas: { label: 'Mucosas Pálidas', severity: 'mild' },
        diarreia: { label: 'Diarreia', severity: 'neutral' },
        dor: { label: 'Dor Local Intensa', severity: 'moderate' },
        marca_picada: { label: 'Marca de Picada', severity: 'neutral' },
        hipotensao: { label: 'Hipotensão', severity: 'severe' },
    };
    return signs.filter(s => s in map).map(s => map[s]);
}

function buildActions(dx: string, weight: number, signs: string[]): ActionItem[] {
    const base: ActionItem[] = [
        { id: 'soro', label: 'Administrar Soro Específico', detail: 'IV lentamente — dose conforme gravidade', done: false },
        { id: 'fluido', label: 'Fluidoterapia Agressiva', detail: 'Ringer Lactato. Bolus inicial, depois manutenção.', done: false },
        { id: 'urinario', label: 'Monitoramento Urinário', detail: 'Sondagem vesical — controle de débito e anúria.', done: false },
        { id: 'analgesia', label: 'Analgesia (Opioides)', detail: 'Metadona ou Morfina conforme nível de dor.', done: false },
    ];
    if (signs.includes('hemorragia') || signs.includes('equimose')) {
        base.push({ id: 'coagulacao', label: 'Tempo de Coagulação', detail: 'Mensurar a cada 4h — risco de CIVD.', done: false });
    }
    if (signs.includes('mioglobinuria')) {
        base.push({ id: 'renal', label: 'Painel Renal Urgente', detail: 'Creatinina, Ureia, CK — risco de IRA.', done: false });
    }
    return base;
}

const SEVERITY_STYLES: Record<EvidenceBadge['severity'], string> = {
    critical: 'bg-red-500/20 text-red-400 border-red-500/25',
    severe: 'bg-orange-500/20 text-orange-400 border-orange-500/25',
    moderate: 'bg-amber-500/20 text-amber-400 border-amber-500/25',
    mild: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/25',
    neutral: 'bg-slate-700 text-slate-300 border-slate-600',
};

const PULSE_DOT: Record<EvidenceBadge['severity'], string> = {
    critical: 'bg-red-400 animate-pulse',
    severe: 'bg-orange-400',
    moderate: 'bg-amber-400',
    mild: 'bg-emerald-400',
    neutral: '',
};

function speciesLabel(sp: string | null) {
    const m: Record<string, string> = { canine: 'Canino', feline: 'Felino', equine: 'Equino', exotic: 'Exótico' };
    return sp ? (m[sp] ?? sp) : '—';
}

/* ─── Component ─────────────────────────────────────────────────── */
export const RelatorioDetalhadoPage: React.FC<RelatorioDetalhadoPageProps> = ({
    patient, selectedSigns, diagnosis, diagnosisSciName, confidence,
    onBack, onNewConsulta,
}) => {
    const weight = parseFloat(patient.weight) || 10;
    const evidence = buildEvidence(selectedSigns);
    const [actions, setActions] = useState<ActionItem[]>(() => buildActions(diagnosis, weight, selectedSigns));
    const toggleAction = (id: string) => setActions(prev => prev.map(a => a.id === id ? { ...a, done: !a.done } : a));

    const now = new Date();
    const caseRef = `TOX-${now.getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}-B`;

    // SVG circle for confidence
    const svgPct = confidence; // out of 100

    const isNSAIDDanger = selectedSigns.some(s => ['hemorragia', 'equimose', 'mioglobinuria', 'edema'].includes(s));

    return (
        <div className="min-h-screen bg-[#0f0f12] text-slate-100 font-sans flex flex-col">
            {/* ── Header ─────────────────────────────────────────── */}
            <header className="dl-glass sticky top-0 z-50 border-b border-white/10 px-6 py-3.5">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-slate-300 hover:text-white"
                        >
                            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <div className="w-10 h-10 rounded-xl bg-[#6a25f4]/20 flex items-center justify-center text-[#6a25f4] border border-[#6a25f4]/30">
                            <span className="text-xl">🔬</span>
                        </div>
                        <div>
                            <h1 className="text-white text-lg font-bold leading-tight tracking-tight">Dr. Luzaum AI</h1>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-[#8b5cf6] uppercase tracking-wider">Relatório de Análise Crítica</span>
                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                <span className="text-xs text-slate-400 font-mono">Caso #{caseRef}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 h-10 px-4 rounded-lg bg-[#18181b] border border-white/10 hover:bg-white/5 transition-colors text-slate-300 text-sm font-semibold"
                        >
                            <span>📄</span><span>Exportar PDF</span>
                        </button>
                        <button
                            onClick={onNewConsulta}
                            className="flex items-center gap-2 h-10 px-4 rounded-lg bg-[#6a25f4] hover:bg-[#7c3aed] transition-colors text-white text-sm font-bold shadow-lg shadow-[#6a25f4]/20"
                        >
                            <span>＋</span><span>Novo Caso</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Main: 12-col grid ─────────────────────────────── */}
            <main className="flex-grow p-5 lg:p-7 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* ── Left: Patient + Evidence (4 cols) ─────────── */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Patient Card */}
                    <section className="dl-glass rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-7xl pointer-events-none">🐾</div>
                        <h2 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                            <span className="text-[#6a25f4] text-lg">🪪</span> Perfil do Paciente
                        </h2>
                        <div className="space-y-3.5">
                            {[
                                { label: 'Espécie', value: speciesLabel(patient.species) },
                                { label: 'Peso', value: patient.weight ? `${patient.weight} kg` : '—' },
                                { label: 'Idade', value: patient.age ? `${patient.age} anos` : '—' },
                                { label: 'Raça', value: patient.breed || '—' },
                                { label: 'Entrada', value: now.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) },
                            ].map(item => (
                                <div key={item.label} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                                    <span className="text-slate-400 text-sm">{item.label}</span>
                                    <span className="text-white font-semibold text-sm">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Evidence Badges */}
                    <section className="dl-glass rounded-2xl p-6">
                        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-[#6a25f4] text-lg">📋</span> Evidências Clínicas
                        </h2>
                        {evidence.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {evidence.map(ev => (
                                    <span
                                        key={ev.label}
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${SEVERITY_STYLES[ev.severity]}`}
                                    >
                                        {ev.severity !== 'neutral' && (
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${PULSE_DOT[ev.severity]}`} />
                                        )}
                                        {ev.label}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-500 text-sm">Nenhum sinal clínico registrado.</p>
                        )}
                        {patient.history && (
                            <div className="mt-5 p-4 rounded-xl bg-slate-900/50 border border-white/5">
                                <strong className="text-slate-200 block mb-1 text-sm">Nota do Triador:</strong>
                                <p className="text-xs text-slate-400 leading-relaxed">{patient.history}</p>
                            </div>
                        )}
                    </section>
                </div>

                {/* ── Right: Diagnosis + Action (8 cols) ─────────── */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* Diagnostic Verdict */}
                    <section className="dl-glass rounded-2xl p-7 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6a25f4] to-transparent opacity-50" />
                        <div className="flex flex-col md:flex-row items-center gap-7">
                            {/* Confidence circle */}
                            <div className="shrink-0 relative w-44 h-44 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                    <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#2e2839" strokeWidth="2.5" />
                                    <circle
                                        cx="18" cy="18" r="15.9155" fill="transparent"
                                        stroke="#6a25f4" strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeDasharray={`${svgPct}, 100`}
                                        className="drop-shadow-[0_0_10px_rgba(106,37,244,0.6)]"
                                        style={{ animation: 'dl-progress 1.4s ease-out forwards' }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-black text-white tracking-tighter">{confidence}%</span>
                                    <span className="text-[10px] uppercase tracking-widest text-[#6a25f4] font-bold mt-1">Probabilidade</span>
                                </div>
                            </div>
                            {/* Details */}
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-xs font-semibold text-[#6a25f4] uppercase tracking-wider mb-2">Veredito Diagnóstico</h2>
                                <h3 className="text-3xl font-black text-white tracking-tight mb-3">{diagnosis}</h3>
                                <p className="text-slate-300 leading-relaxed text-sm mb-4">
                                    Quadro compatível com envenenamento por <em className="text-white not-italic font-semibold">{diagnosisSciName}</em>.
                                    Análise baseada nos sinais clínicos reportados e perfil do paciente.
                                </p>
                                {isNSAIDDanger && (
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#18181b] border border-white/10">
                                        <span className="text-amber-400 text-sm">⚠️</span>
                                        <span className="text-xs font-medium text-slate-300">Risco de Insuficiência Renal Aguda</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Sub-grid: Action Plan + Danger */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Action Plan Checklist */}
                        <section className="dl-glass rounded-2xl p-6 flex flex-col h-full">
                            <h2 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                                <span className="text-emerald-400 text-lg">✅</span> Plano de Ação Imediato
                            </h2>
                            <div className="space-y-3 flex-1">
                                {actions.map(action => (
                                    <label
                                        key={action.id}
                                        className="group flex items-start gap-3 p-3 rounded-xl bg-[#18181b]/50 border border-white/5 hover:bg-[#18181b] transition-colors cursor-pointer"
                                        onClick={() => toggleAction(action.id)}
                                    >
                                        {/* Checkbox */}
                                        <div className={`w-5 h-5 mt-0.5 rounded border flex items-center justify-center transition-all shrink-0 ${action.done ? 'bg-[#6a25f4] border-[#6a25f4]' : 'border-slate-500 bg-transparent'
                                            }`}>
                                            {action.done && (
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <div>
                                            <p className={`text-sm font-semibold group-hover:text-white transition-colors ${action.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                                                {action.label}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                <span className="text-[#6a25f4] font-bold">{action.detail.split(' ')[0]}</span>{' '}
                                                {action.detail.split(' ').slice(1).join(' ')}
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            {actions.filter(a => a.done).length > 0 && (
                                <div className="mt-4 pt-3 border-t border-white/5 text-xs text-slate-500 text-center">
                                    {actions.filter(a => a.done).length} de {actions.length} ações concluídas
                                </div>
                            )}
                        </section>

                        {/* Right column: Danger Zone + References */}
                        <div className="flex flex-col gap-6">
                            {/* Danger Zone */}
                            <section className="dl-glass-danger rounded-2xl p-5 relative overflow-hidden">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/40">
                                        <span className="text-red-400 text-lg animate-pulse">🚫</span>
                                    </div>
                                    <h2 className="text-base font-bold text-white">Zona de Perigo</h2>
                                </div>
                                <div className="bg-red-950/40 border-l-4 border-red-500 p-4 rounded-r-xl mb-3">
                                    <h3 className="text-red-400 font-bold text-xs mb-1 uppercase tracking-wide">🚫 Proibido</h3>
                                    <p className="text-white font-semibold mb-1 text-sm">NÃO USAR AINES</p>
                                    <p className="text-xs text-red-200/80 leading-relaxed">
                                        Anti-inflamatórios não esteroides (Meloxicam, Cetoprofeno, etc.) são contraindicados — alto risco de nefrotoxicidade potencializada pelo veneno.
                                    </p>
                                </div>
                                <div className="bg-orange-950/30 border-l-4 border-orange-500 p-4 rounded-r-xl">
                                    <h3 className="text-orange-400 font-bold text-xs mb-1 uppercase tracking-wide">⚠️ Atenção</h3>
                                    <p className="text-xs text-orange-200/80 leading-relaxed">
                                        Não realizar torniquete, incisões ou sucção no local da picada.
                                    </p>
                                </div>
                            </section>

                            {/* Academic Foundation */}
                            <section className="dl-glass rounded-2xl p-5 flex-1">
                                <h2 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2 uppercase tracking-wide">
                                    <span className="text-base">📚</span> Fundamentação Acadêmica
                                </h2>
                                <div className="space-y-2">
                                    {[
                                        { quote: '"O veneno contém frações miotóxicas e coagulantes que exigem suporte renal intensivo."', ref: 'Toxicologia Veterinária — Spinosa et al.' },
                                        { quote: '"Insuficiência renal aguda é a principal causa de óbito em acidentes crotálicos."', ref: 'Nelson & Couto, Medicina Interna — 6ª Ed.' },
                                    ].map(item => (
                                        <div key={item.ref} className="p-3 rounded-xl bg-[#18181b] border border-white/5 hover:border-[#6a25f4]/30 transition-colors">
                                            <p className="text-xs text-slate-300 italic leading-relaxed">"{item.quote.replace(/^"|"$/g, '')}"</p>
                                            <p className="text-[10px] text-[#6a25f4] mt-1 font-semibold">{item.ref}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RelatorioDetalhadoPage;
