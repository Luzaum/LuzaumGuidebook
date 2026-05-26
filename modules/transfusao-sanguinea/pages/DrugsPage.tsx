import React, { useState, useEffect } from 'react';
import { Pill, Heart, Siren, AlertCircle, Calculator, Scale } from 'lucide-react';

interface DrugCalculatorState {
  id: string;
  name: string;
  minDose: number; // em mg/kg
  maxDose: number; // em mg/kg
  defaultDose: number;
  unit: string;
  defaultConcentration: number; // em mg/mL
  indication: string;
  category: 'allergy' | 'anaphylaxis' | 'support' | 'reversal';
}

const DRUGS_CONFIG: DrugCalculatorState[] = [
  {
    id: 'difenidramina',
    name: 'Difenidramina',
    minDose: 1.0,
    maxDose: 2.0,
    defaultDose: 1.5,
    unit: 'mg/kg',
    defaultConcentration: 50, // 50 mg/mL
    indication: 'Reações alérgicas (urticária, prurido).',
    category: 'allergy'
  },
  {
    id: 'prometazina',
    name: 'Prometazina',
    minDose: 0.2,
    maxDose: 0.5,
    defaultDose: 0.35,
    unit: 'mg/kg',
    defaultConcentration: 25, // 25 mg/mL
    indication: 'Alternativa à difenidramina para reações alérgicas. Uso controverso, pode causar sedação mais profunda.',
    category: 'allergy'
  },
  {
    id: 'epinefrina',
    name: 'Epinefrina (Adrenalina)',
    minDose: 0.01,
    maxDose: 0.02,
    defaultDose: 0.01,
    unit: 'mg/kg',
    defaultConcentration: 1, // 1 mg/mL (1:1000)
    indication: 'Anafilaxia (choque, dispneia grave).',
    category: 'anaphylaxis'
  },
  {
    id: 'dexametasona',
    name: 'Dexametasona',
    minDose: 0.5,
    maxDose: 1.0,
    defaultDose: 0.75,
    unit: 'mg/kg',
    defaultConcentration: 4, // 4 mg/mL
    indication: 'Reações alérgicas graves/anafilaxia, suporte em reação hemolítica.',
    category: 'support'
  },
  {
    id: 'furosemida',
    name: 'Furosemida',
    minDose: 2.0,
    maxDose: 4.0,
    defaultDose: 2.0,
    unit: 'mg/kg',
    defaultConcentration: 20, // 20 mg/mL
    indication: 'Sobrecarga circulatória (TACO), suporte em reação hemolítica.',
    category: 'support'
  },
  {
    id: 'gluconato_calcio',
    name: 'Gluconato de Cálcio 10%',
    minDose: 50.0,
    maxDose: 150.0,
    defaultDose: 100.0, // 100 mg/kg = 1 mL/kg de solução a 10%
    unit: 'mg/kg',
    defaultConcentration: 100, // 10% = 100 mg/mL
    indication: 'Toxicidade por citrato (hipocalcemia). Deve ser infundido muito lentamente sob monitoramento.',
    category: 'reversal'
  }
];

export const DrugsPage: React.FC = React.memo(() => {
  const [weight, setWeight] = useState<string>('25');

  // Estado para armazenar as doses e concentrações personalizadas por fármaco
  const [customParams, setCustomParams] = useState<Record<string, { dose: number; conc: number }>>(() => {
    const initial: Record<string, { dose: number; conc: number }> = {};
    DRUGS_CONFIG.forEach(d => {
      initial[d.id] = { dose: d.defaultDose, conc: d.defaultConcentration };
    });
    return initial;
  });

  const handleParamChange = (id: string, field: 'dose' | 'conc', value: number) => {
    setCustomParams(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const getCategoryStyles = (category?: string) => {
    switch (category) {
      case 'anaphylaxis':
        return {
          icon: <Siren className="h-5 w-5 animate-pulse" />,
          badge: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20',
          badgeText: 'Emergência / Anafilaxia',
          cardBorder: 'border-red-500/20 shadow-red-500/5'
        };
      case 'allergy':
        return {
          icon: <Pill className="h-5 w-5" />,
          badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
          badgeText: 'Anti-histamínico',
          cardBorder: 'border-blue-500/20 shadow-blue-500/5'
        };
      case 'reversal':
        return {
          icon: <Siren className="h-5 w-5 text-amber-500" />,
          badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
          badgeText: 'Antídoto / Reversão',
          cardBorder: 'border-amber-500/20 shadow-amber-500/5'
        };
      default:
        return {
          icon: <Heart className="h-5 w-5" />,
          badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20',
          badgeText: 'Suporte Clínico',
          cardBorder: 'border-purple-500/20 shadow-purple-500/5'
        };
    }
  };

  const calculateVolume = (drug: DrugCalculatorState): string => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return '—';
    const params = customParams[drug.id];
    if (!params || params.conc <= 0) return '—';
    
    // Cálculo: (Dose desejada * Peso) / Concentração
    const vol = (params.dose * w) / params.conc;
    return `${vol.toFixed(2)} mL`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Barra de Ajuste de Peso do Paciente (Global para os fármacos) */}
      <div className="bg-card text-card-foreground border border-border/85 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-red-500/5 to-transparent">
        <div className="flex items-center gap-3">
          <span className="p-3 rounded-xl bg-red-500/10 text-red-500">
            <Scale className="h-6 w-6" />
          </span>
          <div>
            <h4 className="font-bold text-sm md:text-base text-foreground leading-snug">Calculadora de Fármacos Automática</h4>
            <p className="text-xs text-muted-foreground mt-0.5">Insira o peso do paciente para calcular automaticamente os volumes de infusão para todos os fármacos.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label htmlFor="patient-weight" className="text-xs font-bold text-foreground/80 uppercase tracking-wider shrink-0">Peso do Paciente:</label>
          <div className="relative flex-1 md:w-36">
            <input 
              type="number"
              id="patient-weight"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              className="w-full rounded-xl border border-input/60 shadow-sm focus:border-red-500 focus:ring-red-500/20 bg-background text-foreground transition-all px-3 py-2 text-right pr-9 font-bold font-mono"
              placeholder="25"
              min="0.1"
              step="0.1"
            />
            <span className="absolute right-3 top-2 text-xs font-bold text-muted-foreground uppercase pointer-events-none">kg</span>
          </div>
        </div>
      </div>

      {/* Grid de Fármacos */}
      <div className="bg-card text-card-foreground border border-border/80 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-500">💊</span>
            Calculadoras de Infusão de Suporte &amp; Emergência
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            Configure a dose e concentração desejada para obter volumes de aplicação instantâneos.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {DRUGS_CONFIG.map((drug) => {
            const styles = getCategoryStyles(drug.category);
            const params = customParams[drug.id] || { dose: drug.defaultDose, conc: drug.defaultConcentration };
            const computedVol = calculateVolume(drug);

            return (
              <div 
                key={drug.id} 
                className={`bg-background border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${styles.cardBorder}`}
              >
                
                <div className="space-y-4">
                  {/* Categoria e Ícone */}
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-xl bg-muted/60 text-foreground">
                      {styles.icon}
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${styles.badge}`}>
                      {styles.badgeText}
                    </span>
                  </div>

                  {/* Nome e Indicação */}
                  <div>
                    <h4 className="font-bold text-base text-foreground leading-snug">
                      {drug.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {drug.indication}
                    </p>
                  </div>

                  {/* Controles de Parâmetros */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    
                    {/* Dose */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-foreground/80 uppercase tracking-wider block">
                        Dose Desejada
                      </label>
                      <div className="relative">
                        <input 
                          type="number"
                          value={params.dose}
                          onChange={e => handleParamChange(drug.id, 'dose', parseFloat(e.target.value) || 0)}
                          className="w-full text-xs rounded-xl border border-input/60 shadow-sm focus:border-red-500 focus:ring-red-500/20 bg-background text-foreground transition-all px-2.5 py-1.5 font-bold font-mono"
                          step="0.01"
                          min={drug.minDose}
                          max={drug.maxDose}
                        />
                        <span className="absolute right-2.5 top-1.5 text-[9px] font-bold text-muted-foreground">{drug.unit}</span>
                      </div>
                      <span className="text-[9px] text-muted-foreground block">
                        Intervalo: {drug.minDose}-{drug.maxDose} {drug.unit}
                      </span>
                    </div>

                    {/* Concentração */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-foreground/80 uppercase tracking-wider block">
                        Concentração
                      </label>
                      <div className="relative">
                        <input 
                          type="number"
                          value={params.conc}
                          onChange={e => handleParamChange(drug.id, 'conc', parseFloat(e.target.value) || 0)}
                          className="w-full text-xs rounded-xl border border-input/60 shadow-sm focus:border-red-500 focus:ring-red-500/20 bg-background text-foreground transition-all px-2.5 py-1.5 font-bold font-mono"
                          step="0.1"
                          min="0.001"
                        />
                        <span className="absolute right-2.5 top-1.5 text-[9px] font-bold text-muted-foreground">mg/mL</span>
                      </div>
                      <span className="text-[9px] text-muted-foreground block">
                        Comercial comum: {drug.defaultConcentration} mg/mL
                      </span>
                    </div>

                  </div>
                </div>

                {/* Volume Calculado Destaque */}
                <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-red-500/5 to-transparent border border-red-500/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-red-500/10 text-red-500">
                      <Calculator className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-bold text-foreground">Volume de Aplicação:</span>
                  </div>
                  <p className="text-xl font-black text-red-600 dark:text-red-400 font-mono">
                    {computedVol}
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Rodapé de Informação */}
      <div className="bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 p-5 rounded-2xl shadow-md flex items-start gap-3">
        <span className="p-1 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 mt-0.5">
          <AlertCircle className="h-5 w-5" />
        </span>
        <div className="space-y-1 text-sm">
          <p className="font-bold">Aviso de Uso Clínico:</p>
          <p className="text-xs text-muted-foreground dark:text-amber-300/80 leading-relaxed">
            Esta calculadora automatiza a matemática posológica. O clínico deve validar a concentração real do frasco disponível antes da aplicação, especialmente no caso de formulações concentradas. Recomenda-se cautela redobrada e monitoramento de ECG durante a infusão de Gluconato de Cálcio a 10%.
          </p>
        </div>
      </div>

    </div>
  );
});

DrugsPage.displayName = 'DrugsPage';
export default DrugsPage;
