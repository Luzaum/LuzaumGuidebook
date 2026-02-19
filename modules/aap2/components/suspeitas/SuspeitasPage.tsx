// ============================================================
// SUSPEITAS — Ferramenta de Diagnóstico Diferencial
// ============================================================
import React, { useState } from 'react';
import {
    PATIENT_SPECIES, PATIENT_STATUS, COMORBIDITIES,
    CLINICAL_SIGNS_CATEGORIZED,
} from '../../data/constants';
import { useDiagnosis } from '../../hooks/useDiagnosis';
import { fetchAIAnalysis } from '../../services/aiService';
import type { PatientData, DiagnosisResult, Animal, Comorbidity } from '../../types';
import { HelpButton, Modal, SignificanceBadge, Loader } from '../ui';
import { AnimalDetailView } from '../bulario/index';

interface SuspeitasPageProps {
    onHelpClick: (title: string, content?: string) => void;
}

export const SuspeitasPage: React.FC<SuspeitasPageProps> = ({ onHelpClick }) => {
    // --- Estado do formulário ---
    const [patient, setPatient] = useState<PatientData>({
        species: 'Canino',
        weight: '',
        status: 'Adulto Saudável',
        comorbidities: [],
    });
    const [selectedSigns, setSelectedSigns] = useState<string[]>([]);
    const [clinicalNotes, setClinicalNotes] = useState('');

    // --- Estado da IA ---
    const [aiLoading, setAiLoading] = useState(false);
    const [aiResult, setAiResult] = useState<string | null>(null);
    const [aiError, setAiError] = useState('');

    // --- Estado dos modais ---
    const [previewAnimal, setPreviewAnimal] = useState<(Animal & { categoryId: string; categoryColor: string }) | null>(null);

    // --- Diagnóstico diferencial (calculado reativamente) ---
    const diagnosisResults = useDiagnosis(selectedSigns);

    // --- Handlers ---
    const toggleSign = (sign: string) => {
        setSelectedSigns(prev =>
            prev.includes(sign) ? prev.filter(s => s !== sign) : [...prev, sign]
        );
    };

    const toggleComorbidity = (c: Comorbidity) => {
        setPatient(prev => {
            if (c === 'Nenhuma') {
                return { ...prev, comorbidities: prev.comorbidities.includes('Nenhuma') ? [] : ['Nenhuma'] };
            }
            const filtered = prev.comorbidities.filter(i => i !== 'Nenhuma');
            return {
                ...prev,
                comorbidities: filtered.includes(c) ? filtered.filter(i => i !== c) : [...filtered, c],
            };
        });
    };

    const handleAIAnalysis = async () => {
        setAiLoading(true);
        setAiResult(null);
        setAiError('');
        try {
            const { html } = await fetchAIAnalysis({
                patientSpecies: patient.species,
                patientStatus: patient.status,
                patientWeight: patient.weight,
                comorbidities: patient.comorbidities,
                selectedSigns,
                clinicalNotes,
            });
            setAiResult(html);
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : 'Ocorreu um erro ao consultar a IA.';
            setAiError(msg);
        } finally {
            setAiLoading(false);
        }
    };

    return (
        <>
            <h2 className="page-title">Ferramenta de Suspeitas</h2>
            <p className="page-description">
                Insira os dados do paciente, selecione os sinais clínicos e obtenha diagnósticos diferenciais instantâneos.
            </p>

            {/* ---- DADOS DO PACIENTE ---- */}
            <section className="form-section">
                <h3 className="form-section-title">Dados do Paciente</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label" htmlFor="species">Espécie</label>
                        <select
                            id="species"
                            className="form-select"
                            value={patient.species}
                            onChange={e => setPatient(p => ({ ...p, species: e.target.value as typeof p.species }))}
                        >
                            {PATIENT_SPECIES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="weight">Peso (kg)</label>
                        <input
                            id="weight"
                            type="number"
                            className="form-input"
                            value={patient.weight}
                            onChange={e => setPatient(p => ({ ...p, weight: e.target.value }))}
                            placeholder="Ex: 15.5"
                            min="0"
                            step="0.1"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="status">
                            Estado Fisiológico
                            <HelpButton onClick={() => onHelpClick('Estado Fisiológico')} />
                        </label>
                        <select
                            id="status"
                            className="form-select"
                            value={patient.status}
                            onChange={e => setPatient(p => ({ ...p, status: e.target.value as typeof p.status }))}
                        >
                            {PATIENT_STATUS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">
                        Comorbidades
                        <HelpButton onClick={() => onHelpClick('Comorbidades')} />
                    </label>
                    <div className="checkbox-grid">
                        {COMORBIDITIES.map(c => (
                            <label
                                key={c}
                                className={`checkbox-label ${patient.comorbidities.includes(c) ? 'checkbox-label--selected' : ''}`}
                            >
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={patient.comorbidities.includes(c)}
                                    onChange={() => toggleComorbidity(c)}
                                />
                                {c}
                            </label>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---- SINAIS CLÍNICOS ---- */}
            <section className="form-section">
                <h3 className="form-section-title">Sinais Clínicos</h3>
                {Object.entries(CLINICAL_SIGNS_CATEGORIZED).map(([category, signs]) => (
                    <div key={category} className="form-group">
                        <p className="form-category-label">{category}</p>
                        <div className="checkbox-grid">
                            {signs.map(sign => (
                                <label
                                    key={sign}
                                    className={`checkbox-label ${selectedSigns.includes(sign) ? 'checkbox-label--selected' : ''}`}
                                >
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={selectedSigns.includes(sign)}
                                        onChange={() => toggleSign(sign)}
                                    />
                                    {sign}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* ---- NOTAS CLÍNICAS ---- */}
            <div className="form-group">
                <label className="form-label" htmlFor="clinicalNotes">
                    Descrição do Caso Clínico (Opcional)
                </label>
                <textarea
                    id="clinicalNotes"
                    className="form-textarea"
                    value={clinicalNotes}
                    onChange={e => setClinicalNotes(e.target.value)}
                    placeholder="Descreva aqui o histórico e outros achados do exame físico..."
                    rows={4}
                />
            </div>

            {/* ---- RESULTADOS ESTÁTICOS ---- */}
            {diagnosisResults.length > 0 && (
                <section className="results-section">
                    <h3 className="results-title">Análise Preliminar</h3>
                    <ol className="results-list">
                        {diagnosisResults.map((result, i) => (
                            <DiagnosisResultCard
                                key={result.animal.id}
                                rank={i + 1}
                                result={result}
                                onPreview={() => setPreviewAnimal(result.animal)}
                            />
                        ))}
                    </ol>
                </section>
            )}

            {/* ---- ANÁLISE POR IA ---- */}
            <section className="ai-section">
                <h3 className="ai-section-title">Análise Aprofundada por IA</h3>
                <p className="ai-section-description">
                    Gera análise detalhada de fisiopatologia, plano diagnóstico e protocolo terapêutico.
                </p>
                <button
                    className="btn btn--primary btn--full"
                    onClick={handleAIAnalysis}
                    disabled={aiLoading || selectedSigns.length === 0}
                >
                    {aiLoading ? <Loader label="Analisando..." /> : 'Gerar Análise com IA'}
                </button>
                {selectedSigns.length === 0 && (
                    <p className="ai-hint">Selecione ao menos um sinal clínico para habilitar a análise por IA.</p>
                )}
                {aiError && <p className="error-message">{aiError}</p>}
                {aiResult && (
                    <div className="ai-result" dangerouslySetInnerHTML={{ __html: aiResult }} />
                )}
            </section>

            {/* ---- MODAL DE PREVIEW DO ANIMAL ---- */}
            {previewAnimal && (
                <Modal onClose={() => setPreviewAnimal(null)}>
                    <div className="modal-scroll-body">
                        <AnimalDetailView animal={previewAnimal} onHelpClick={onHelpClick} />
                    </div>
                </Modal>
            )}
        </>
    );
};

// --- Sub-componente: Card de resultado de diagnóstico ---
const DiagnosisResultCard: React.FC<{
    rank: number;
    result: DiagnosisResult;
    onPreview: () => void;
}> = ({ rank, result, onPreview }) => (
    <li className="result-card">
        <div className="result-card-header">
            <h4 className="result-card-title">
                {rank}. {result.animal.accidentName}
                <span className="result-card-animal"> ({result.animal.name})</span>
            </h4>
            <div className="result-card-actions">
                <span className="result-probability">{result.probability}%</span>
                <button className="btn btn--ghost btn--sm" onClick={onPreview}>Ver no Bulário</button>
            </div>
        </div>
        <div className="result-signs">
            {result.matchingSigns.map(sign => (
                <SignificanceBadge key={sign.name} level={sign.significance} name={sign.name} />
            ))}
        </div>
    </li>
);
