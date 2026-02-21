import React from 'react';
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
    return (
        <div id="page-calc-energia">
            <header className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Cálculo de Energia</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Cálculo de necessidades energéticas para cães e gatos
                </p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                    <label htmlFor="species" className="block text-sm font-medium text-foreground mb-2">Espécie</label>
                    <select id="species" value={species} onChange={(e) => setSpecies(e.target.value)} className="w-full p-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition text-foreground placeholder:text-muted-foreground">
                        <option value="dog">Cão 🐶</option>
                        <option value="cat">Gato 🐱</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-foreground mb-2">Peso Atual (kg)</label>
                    <input type="number" id="weight" placeholder="Ex: 15.5" value={weight} onChange={e => setWeight(e.target.value)} className="input-field" step="0.1" min="0.1" />
                </div>
                <div>
                    <label htmlFor="status" className="flex items-center text-sm font-medium text-foreground mb-2">Estado Fisiológico <HelpIcon term="status" onOpenModal={setModalContent} /></label>
                    <select id="status" value={status} onChange={e => setStatus(e.target.value)} className="w-full p-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition text-foreground placeholder:text-muted-foreground">
                        {Object.keys(factors[species]).map(key => <option key={key} value={key}>{key}</option>)}
                    </select>
                </div>
            </div>

            <div id="results-container" className={`space-y-4 ${calculationResults ? 'opacity-100' : 'opacity-0'}`}>
                <div className="result-card bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-blue-800">RER (Energia em Repouso)</h3>
                            <p className="text-sm text-blue-600">{calculationResults?.rerFormula || 'Ponto de partida.'}</p>
                        </div>
                        <p className="text-2xl font-bold text-blue-800">{calculationResults?.rer.toFixed(1) || 0} <span className="text-lg font-medium">kcal/dia</span></p>
                    </div>
                </div>
                <div className="result-card bg-primary/10 border-l-4 border-indigo-500 p-4 rounded-lg flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-indigo-800">Fator (k)</h3>
                        <p className="text-sm text-indigo-600">{calculationResults?.factorDesc || 'Multiplicador.'}</p>
                    </div>
                    <p className="text-2xl font-bold text-indigo-800">{calculationResults?.k || 0.0}</p>
                </div>
                <div className="result-card bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-lg flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-emerald-800">NED (Energia Diária)</h3>
                        <p className="text-sm text-emerald-600">Meta calórica para manutenção de peso.</p>
                    </div>
                    <p className="text-2xl font-bold text-emerald-800">{calculationResults?.derRange || calculationResults?.der.toFixed(1) || 0} <span className="text-lg font-medium">kcal/dia</span></p>
                </div>
            </div>

            {isCritical && calculationResults && (
                <div className="progression-section mt-8">
                    <h2 className="text-xl font-bold text-foreground text-center mb-4">Plano de Progressão Alimentar</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-muted p-4 rounded-lg border border-border">
                            <h3 className="font-semibold text-foreground mb-3 text-center">Protocolo de 3 Dias</h3>
                            <ul className="space-y-2 text-sm text-foreground">
                                <li className="flex justify-between p-2 bg-card rounded"><span>Dia 1 (33%):</span> <strong className="text-foreground">{(calculationResults.rer * 0.33).toFixed(1)} kcal</strong></li>
                                <li className="flex justify-between p-2 bg-card rounded"><span>Dia 2 (66%):</span> <strong className="text-foreground">{(calculationResults.rer * 0.66).toFixed(1)} kcal</strong></li>
                                <li className="flex justify-between p-2 bg-card rounded"><span>Dia 3 (100%):</span> <strong className="text-foreground">{calculationResults.rer.toFixed(1)} kcal</strong></li>
                            </ul>
                        </div>
                        <div className="bg-muted p-4 rounded-lg border border-border">
                            <h3 className="font-semibold text-foreground mb-3 text-center">Protocolo de 4 Dias</h3>
                            <ul className="space-y-2 text-sm text-foreground">
                                <li className="flex justify-between p-2 bg-card rounded"><span>Dia 1 (25%):</span> <strong className="text-foreground">{(calculationResults.rer * 0.25).toFixed(1)} kcal</strong></li>
                                <li className="flex justify-between p-2 bg-card rounded"><span>Dia 2 (50%):</span> <strong className="text-foreground">{(calculationResults.rer * 0.50).toFixed(1)} kcal</strong></li>
                                <li className="flex justify-between p-2 bg-card rounded"><span>Dia 3 (75%):</span> <strong className="text-foreground">{(calculationResults.rer * 0.75).toFixed(1)} kcal</strong></li>
                                <li className="flex justify-between p-2 bg-card rounded"><span>Dia 4 (100%):</span> <strong className="text-foreground">{calculationResults.rer.toFixed(1)} kcal</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
