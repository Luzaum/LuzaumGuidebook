import React from 'react';
import { Activity, HeartPulse, PawPrint, Scale } from 'lucide-react';
import { HelpIcon } from './UI/HelpIcon';
import { factors } from '../utils/nutritionUtils';

interface EnergyTabProps {
    species: string;
    setSpecies: (s: string) => void;
    weight: string;
    setWeight: (w: string) => void;
    status: string;
    setStatus: (s: string) => void;
    setModalContent: (content: any) => void;
    calculationResults: any;
    isCritical: boolean;
}

export const EnergyTab: React.FC<EnergyTabProps> = ({
    species,
    setSpecies,
    weight,
    setWeight,
    status,
    setStatus,
    setModalContent,
    calculationResults,
    isCritical
}) => {
    const hasResults = Boolean(calculationResults);
    const rerValue = calculationResults?.rer?.toFixed(1) || '0.0';
    const derValue = calculationResults?.derRange || calculationResults?.der?.toFixed(1) || '0.0';
    const factorValue = calculationResults?.k || '0.0';

    return (
        <div id="page-calc-energia" className="energy-v2">
            <header className="energy-v2-header">
                <h1 className="energy-v2-title">Diagnostico Nutricional</h1>
                <p className="energy-v2-subtitle">Determinacao de requerimentos metabolicos para caes e gatos</p>
            </header>

            <div className="energy-v2-layout">
                <div className="energy-v2-left-panel">
                    <section className="energy-v2-block">
                        <h2 className="energy-v2-block-title">
                            <PawPrint className="h-4 w-4" />
                            Informacoes do paciente
                        </h2>
                        <div className="energy-v2-fields">
                            <div>
                                <label htmlFor="weight" className="energy-v2-label">Peso (kg)</label>
                                <input
                                    type="number"
                                    id="weight"
                                    placeholder="Ex: 15.5"
                                    value={weight}
                                    onChange={e => setWeight(e.target.value)}
                                    className="input-field energy-v2-input"
                                    step="0.1"
                                    min="0.1"
                                />
                            </div>
                            <div>
                                <span className="energy-v2-label">Espécie</span>
                                <div className="energy-v2-species-grid">
                                    <button
                                        type="button"
                                        className={`energy-v2-species-btn ${species === 'dog' ? 'active' : ''}`}
                                        onClick={() => setSpecies('dog')}
                                        aria-pressed={species === 'dog'}
                                    >
                                        Cao
                                    </button>
                                    <button
                                        type="button"
                                        className={`energy-v2-species-btn ${species === 'cat' ? 'active' : ''}`}
                                        onClick={() => setSpecies('cat')}
                                        aria-pressed={species === 'cat'}
                                    >
                                        Gato
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="energy-v2-block">
                        <h2 className="energy-v2-block-title">
                            <HeartPulse className="h-4 w-4" />
                            Estado fisiologico
                        </h2>
                        <label htmlFor="status" className="energy-v2-label energy-v2-label-inline">
                            Fator metabolico
                            <HelpIcon term="status" onOpenModal={setModalContent} />
                        </label>
                        <select id="status" value={status} onChange={e => setStatus(e.target.value)} className="w-full input-field energy-v2-input">
                            {Object.keys(factors[species]).map(key => <option key={key} value={key}>{key}</option>)}
                        </select>
                    </section>
                </div>

                <aside id="results-container" className={`energy-v2-right-panel ${hasResults ? 'is-visible' : 'is-hidden'}`}>
                    <h2 className="energy-v2-right-title">Resultado de analise</h2>

                    <div className="energy-v2-result-row">
                        <div>
                            <p className="energy-v2-kpi-label">RER (Repouso)</p>
                            <p className="energy-v2-kpi-note">{calculationResults?.rerFormula || 'Ponto de partida da analise energetica'}</p>
                        </div>
                        <p className="energy-v2-kpi-value">{rerValue}<span> kcal/dia</span></p>
                    </div>

                    <div className="energy-v2-result-row">
                        <div>
                            <p className="energy-v2-kpi-label">Multiplicador</p>
                            <p className="energy-v2-kpi-note">{calculationResults?.factorDesc || 'Ajuste por estado fisiologico'}</p>
                        </div>
                        <p className="energy-v2-kpi-value">{factorValue}x</p>
                    </div>

                    <div className="energy-v2-total-box">
                        <p className="energy-v2-kpi-label">Total NED requerido</p>
                        <p className="energy-v2-total-value">{derValue}<span> kcal/dia</span></p>
                    </div>

                    <div className="energy-v2-mini-chip">
                        <Scale className="h-4 w-4" />
                        Meta calorica para manutencao de peso
                    </div>
                </aside>
            </div>

            {isCritical && calculationResults && (
                <div className="progression-section mt-8">
                    <h2 className="energy-v2-progress-title">
                        <Activity className="h-5 w-5" />
                        Plano de progressao alimentar
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="energy-v2-progress-card">
                            <h3 className="energy-v2-progress-subtitle">Protocolo de 3 dias</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="energy-v2-progress-row"><span>Dia 1 (33%)</span> <strong>{(calculationResults.rer * 0.33).toFixed(1)} kcal</strong></li>
                                <li className="energy-v2-progress-row"><span>Dia 2 (66%)</span> <strong>{(calculationResults.rer * 0.66).toFixed(1)} kcal</strong></li>
                                <li className="energy-v2-progress-row"><span>Dia 3 (100%)</span> <strong>{calculationResults.rer.toFixed(1)} kcal</strong></li>
                            </ul>
                        </div>
                        <div className="energy-v2-progress-card">
                            <h3 className="energy-v2-progress-subtitle">Protocolo de 4 dias</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="energy-v2-progress-row"><span>Dia 1 (25%)</span> <strong>{(calculationResults.rer * 0.25).toFixed(1)} kcal</strong></li>
                                <li className="energy-v2-progress-row"><span>Dia 2 (50%)</span> <strong>{(calculationResults.rer * 0.50).toFixed(1)} kcal</strong></li>
                                <li className="energy-v2-progress-row"><span>Dia 3 (75%)</span> <strong>{(calculationResults.rer * 0.75).toFixed(1)} kcal</strong></li>
                                <li className="energy-v2-progress-row"><span>Dia 4 (100%)</span> <strong>{calculationResults.rer.toFixed(1)} kcal</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
