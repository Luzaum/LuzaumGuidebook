import React, { useState, useEffect } from 'react';
import { HelpButton } from '../components/HelpButton';
import { sanitizeHTML } from '../../../utils/sanitize';
import { Activity, ShieldAlert, Award, FileSpreadsheet, RefreshCw } from 'lucide-react';

interface CalculatorPageProps {
  onOpenModal: (term: string) => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = React.memo(({ onOpenModal }) => {
  // --- Estado para Calculadora Transfusional ---
  const [species, setSpecies] = useState('dog');
  const [weight, setWeight] = useState('');
  const [currentPcv, setCurrentPcv] = useState('');
  const [desiredPcv, setDesiredPcv] = useState('');
  const [product, setProduct] = useState('whole_blood');
  const [bagPcv, setBagPcv] = useState('40');
  const [physState, setPhysState] = useState('adult');
  const [isHighRisk, setIsHighRisk] = useState(false);
  const [isActiveHemorrhage, setIsActiveHemorrhage] = useState(false);
  const [isFirstTransfusionDog, setIsFirstTransfusionDog] = useState(false);
  
  const [results, setResults] = useState<{
    totalVolume: string;
    initialRate: string;
    maintenanceRate: string;
    alerts: Array<{ type: string; text: string }>;
  } | null>(null);
  const [plasmaDose, setPlasmaDose] = useState<string | null>(null);

  // --- Estado para Calculadora de Anticoagulante (Coleta) ---
  const [collectionVolume, setCollectionVolume] = useState('');
  const [anticoagulantType, setAnticoagulantType] = useState('cpda1');
  const [anticoagulantResult, setAnticoagulantResult] = useState<string | null>(null);

  // --- Efeitos ---
  useEffect(() => {
    const productPcvs: Record<string, string> = { rbc: '80', whole_blood: '40', plasma: '0' };
    setBagPcv(productPcvs[product]);
  }, [product]);

  useEffect(() => {
    if (species === 'cat') {
      setIsFirstTransfusionDog(false);
    }
  }, [species]);

  // --- Handlers ---
  const handleCalculateTransfusion = () => {
    const w = parseFloat(weight);
    if (!w || w <= 0) {
      alert('Por favor, insira um peso válido.');
      return;
    }

    if (product === 'plasma') {
      const minDose = (10 * w).toFixed(1);
      const maxDose = (20 * w).toFixed(1);
      setPlasmaDose(`${minDose} - ${maxDose} mL`);
      setResults(null);
      return;
    }

    setPlasmaDose(null);
    const cPcv = parseFloat(currentPcv);
    const dPcv = parseFloat(desiredPcv);
    const bPcv = parseFloat(bagPcv);

    if (isNaN(cPcv) || isNaN(dPcv) || isNaN(bPcv) || bPcv <= 0 || cPcv >= dPcv) {
      alert('Por favor, verifique os valores de VG/Ht. O VG desejado deve ser maior que o atual e o VG da bolsa deve ser maior que zero.');
      return;
    }
    
    const bloodVolumePerKg = species === 'dog' ? 90 : 60;
    const totalVolume = bloodVolumePerKg * w * ((dPcv - cPcv) / bPcv);

    const highRiskChecked = isHighRisk || ['pediatric', 'senior', 'obese'].includes(physState);

    let initialRateRange: number[], maintenanceRateRange: number[];
    if (isActiveHemorrhage) {
      initialRateRange = [5, 10];
      maintenanceRateRange = [10, 22];
    } else if (highRiskChecked) {
      initialRateRange = [0.25, 0.5];
      maintenanceRateRange = [1, 4];
    } else {
      initialRateRange = [0.25, 1];
      maintenanceRateRange = [5, 10];
    }

    const initialRate = (initialRateRange[1] * w).toFixed(1);
    const maintenanceRate = (maintenanceRateRange[1] * w).toFixed(1);

    const alerts = [];
    if (highRiskChecked) {
      alerts.push({
        type: 'warning',
        text: `<strong>Paciente de Alto Risco:</strong> Taxas de infusão conservadoras (${maintenanceRateRange.join('-')} mL/kg/h) recomendadas devido à condição. Monitore de perto os sinais respiratórios e cardiovasculares.`
      });
    }
    if (species === 'cat') {
      alerts.push({
        type: 'danger',
        text: `<strong>Atenção Felinos:</strong> Tipagem sanguínea é <strong>MANDATÓRIA</strong>. Prova cruzada é fortemente recomendada devido à presença de aloanticorpos naturais potentes e antígenos como o Mik.`
      });
    }
    if (species === 'dog' && isFirstTransfusionDog) {
      alerts.push({
        type: 'warning',
        text: `<strong>Alerta de Sensibilização (Cão):</strong> Esta primeira transfusão sensibilizará um cão DEA 1 negativo. A tipagem sanguínea é fortemente recomendada para preservar futuras opções de transfusão.`
      });
    }
    
    const finalTotalVolume = totalVolume.toFixed(1);

    setResults({
      totalVolume: finalTotalVolume,
      initialRate,
      maintenanceRate,
      alerts
    });
    
    setCollectionVolume(finalTotalVolume);
  };

  const handleCalculateAnticoagulant = () => {
    const vol = parseFloat(collectionVolume);
    if (!vol || vol <= 0) {
      alert('Insira um volume de coleta válido.');
      return;
    }
    const ratio = anticoagulantType === 'cpda1' ? 7 : 9;
    const anticoagulantVolume = vol / ratio;
    setAnticoagulantResult(`${anticoagulantVolume.toFixed(1)} mL`);
  };

  const resetCalculator = () => {
    setWeight('');
    setCurrentPcv('');
    setDesiredPcv('');
    setProduct('whole_blood');
    setBagPcv('40');
    setPhysState('adult');
    setIsHighRisk(false);
    setIsActiveHemorrhage(false);
    setIsFirstTransfusionDog(false);
    setResults(null);
    setPlasmaDose(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Container Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form de Parâmetros */}
        <div className="lg:col-span-7 bg-card text-card-foreground border border-border/80 rounded-2xl p-6 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                <span className="p-1.5 rounded-lg bg-red-500/10 text-red-500">📊</span>
                Volume e Taxas de Transfusão
              </h3>
              <button 
                onClick={resetCalculator}
                className="text-xs flex items-center gap-1 text-muted-foreground hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-muted/50"
                title="Limpar calculadora"
              >
                <RefreshCw className="h-3 w-3" /> Limpar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/90">Espécie 🐾</label>
                <select 
                  value={species} 
                  onChange={e => setSpecies(e.target.value)} 
                  className="mt-1.5 block w-full rounded-xl border border-input/60 shadow-sm focus:border-red-500 focus:ring-red-500/20 bg-background text-foreground transition-all px-3 py-2.5"
                >
                  <option value="dog">Cão 🐶</option>
                  <option value="cat">Gato 🐱</option>
                </select>
              </div>

              <div>
                <label htmlFor="weight" className="block text-sm font-semibold text-foreground/90">Peso do Receptor (kg)</label>
                <input 
                  type="number" 
                  id="weight" 
                  value={weight} 
                  onChange={e => setWeight(e.target.value)} 
                  className="mt-1.5 block w-full rounded-xl border border-input/60 shadow-sm focus:border-red-500 focus:ring-red-500/20 bg-background text-foreground transition-all px-3 py-2" 
                  placeholder="25" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/90 flex items-center">
                  Hemocomponente 🩸
                  <HelpButton term="components" onOpenModal={onOpenModal} />
                </label>
                <select 
                  value={product} 
                  onChange={e => setProduct(e.target.value)} 
                  className="mt-1.5 block w-full rounded-xl border border-input/60 shadow-sm focus:border-red-500 focus:ring-red-500/20 bg-background text-foreground transition-all px-3 py-2.5"
                >
                  <option value="whole_blood">Sangue Total (ST)</option>
                  <option value="rbc">Conc. Hemácias (CH)</option>
                  <option value="plasma">Plasma (PFC/PC)</option>
                </select>
              </div>

              <div>
                <label htmlFor="current-pcv" className="block text-sm font-semibold text-foreground/90 flex items-center">
                  VG/Ht Receptor (%)
                  <HelpButton term="pcv" onOpenModal={onOpenModal} />
                </label>
                <input 
                  type="number" 
                  id="current-pcv" 
                  value={currentPcv} 
                  onChange={e => setCurrentPcv(e.target.value)} 
                  disabled={product === 'plasma'} 
                  className="mt-1.5 block w-full rounded-xl border border-input/60 shadow-sm focus:border-red-500 focus:ring-red-500/20 bg-background disabled:bg-muted disabled:text-muted-foreground text-foreground transition-all px-3 py-2" 
                  placeholder={product === 'plasma' ? '—' : '15'} 
                />
              </div>

              <div>
                <label htmlFor="desired-pcv" className="block text-sm font-semibold text-foreground/90 flex items-center">
                  VG/Ht Desejado (%)
                  <HelpButton term="desired_pcv" onOpenModal={onOpenModal} />
                </label>
                <input 
                  type="number" 
                  id="desired-pcv" 
                  value={desiredPcv} 
                  onChange={e => setDesiredPcv(e.target.value)} 
                  disabled={product === 'plasma'} 
                  className="mt-1.5 block w-full rounded-xl border border-input/60 shadow-sm focus:border-red-500 focus:ring-red-500/20 bg-background disabled:bg-muted disabled:text-muted-foreground text-foreground transition-all px-3 py-2" 
                  placeholder={product === 'plasma' ? '—' : '25'} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="bag-pcv" className="block text-sm font-semibold text-foreground/90 flex items-center">
                  VG da Bolsa (%)
                  <HelpButton term="bag_pcv" onOpenModal={onOpenModal} />
                </label>
                <input 
                  type="number" 
                  id="bag-pcv" 
                  value={bagPcv} 
                  onChange={e => setBagPcv(e.target.value)} 
                  disabled={product === 'plasma'} 
                  className="mt-1.5 block w-full rounded-xl border border-input/60 shadow-sm focus:border-red-500 focus:ring-red-500/20 bg-background disabled:bg-muted disabled:text-muted-foreground text-foreground transition-all px-3 py-2" 
                  placeholder={product === 'plasma' ? '—' : '80'} 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/90 flex items-center">
                  Estado Fisiológico
                  <HelpButton term="phys_state" onOpenModal={onOpenModal} />
                </label>
                <select 
                  value={physState} 
                  onChange={e => setPhysState(e.target.value)} 
                  className="mt-1.5 block w-full rounded-xl border border-input/60 shadow-sm focus:border-red-500 focus:ring-red-500/20 bg-background text-foreground transition-all px-3 py-2.5"
                >
                  <option value="adult">Adulto Hígido</option>
                  <option value="pediatric">Filhote/Pediátrico</option>
                  <option value="senior">Idoso/Geriátrico</option>
                  <option value="obese">Obeso</option>
                </select>
              </div>
            </div>

            <div className="bg-muted/40 rounded-xl p-4 border border-border/40 space-y-3.5">
              <span className="text-sm font-bold text-foreground flex items-center gap-1.5">
                🛡️ Condições Adicionais de Risco
                <HelpButton term="risk_conditions" onOpenModal={onOpenModal} />
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="relative flex items-start cursor-pointer group">
                  <div className="flex h-5 items-center">
                    <input 
                      type="checkbox" 
                      checked={isHighRisk} 
                      onChange={e => setIsHighRisk(e.target.checked)} 
                      className="h-4 w-4 rounded border-input text-red-500 focus:ring-red-500/20 cursor-pointer" 
                    />
                  </div>
                  <div className="ml-3 text-sm font-medium text-foreground/80 group-hover:text-foreground">
                    Doença Cardíaca/Renal ❤️
                  </div>
                </label>

                <label className="relative flex items-start cursor-pointer group">
                  <div className="flex h-5 items-center">
                    <input 
                      type="checkbox" 
                      checked={isActiveHemorrhage} 
                      onChange={e => setIsActiveHemorrhage(e.target.checked)} 
                      className="h-4 w-4 rounded border-input text-red-500 focus:ring-red-500/20 cursor-pointer" 
                    />
                  </div>
                  <div className="ml-3 text-sm font-medium text-foreground/80 group-hover:text-foreground">
                    Hemorragia Aguda Ativa 🚨
                  </div>
                </label>

                {species === 'dog' && (
                  <label className="relative flex items-start cursor-pointer group md:col-span-2">
                    <div className="flex h-5 items-center">
                      <input 
                        type="checkbox" 
                        checked={isFirstTransfusionDog} 
                        onChange={e => setIsFirstTransfusionDog(e.target.checked)} 
                        className="h-4 w-4 rounded border-input text-red-500 focus:ring-red-500/20 cursor-pointer" 
                      />
                    </div>
                    <div className="ml-3 text-sm font-medium text-foreground/80 group-hover:text-foreground flex items-center">
                      Primeira Transfusão (Cão) ☝️
                      <HelpButton term="first_transfusion" onOpenModal={onOpenModal} />
                    </div>
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              onClick={handleCalculateTransfusion} 
              className="w-full py-3.5 px-6 rounded-xl font-bold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-600/10 hover:shadow-red-600/25 active:scale-[0.98] transition-all text-base tracking-wide flex items-center justify-center gap-2"
            >
              <Activity className="h-5 w-5 animate-pulse" /> Calcular Volume e Taxas
            </button>
          </div>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Resultados da Transfusão */}
          {results && (
            <div className="bg-card text-card-foreground border border-border/80 rounded-2xl p-6 shadow-xl space-y-6 animate-in slide-in-from-right duration-300">
              <h3 className="text-xl font-bold text-foreground border-b border-border/50 pb-3 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">📈</span>
                Resultado dos Cálculos
              </h3>
              
              <div className="space-y-4">
                <div className="bg-muted/40 p-4 rounded-xl border border-border/40 text-center">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Volume Total Recomendado</p>
                  <p className="text-4xl font-extrabold text-red-500 dark:text-red-400 font-mono mt-1">{results.totalVolume} <span className="text-xl font-semibold">mL</span></p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/40 p-4 rounded-xl border border-border/40 text-center relative group">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-0.5">
                      Taxa Inicial
                      <HelpButton term="initial_rate_why" onOpenModal={onOpenModal} className="!p-0.5" />
                    </span>
                    <p className="text-2xl font-extrabold text-foreground font-mono mt-1">{results.initialRate} <span className="text-sm font-semibold">mL/h</span></p>
                    <p className="text-[10px] text-muted-foreground mt-1.5">Primeiros 15-30 min</p>
                  </div>

                  <div className="bg-muted/40 p-4 rounded-xl border border-border/40 text-center relative group">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-0.5">
                      Manutenção
                      <HelpButton term="maintenance_rate_why" onOpenModal={onOpenModal} className="!p-0.5" />
                    </span>
                    <p className="text-2xl font-extrabold text-foreground font-mono mt-1">{results.maintenanceRate} <span className="text-sm font-semibold">mL/h</span></p>
                    <p className="text-[10px] text-muted-foreground mt-1.5">Conclusão em até 4h</p>
                  </div>
                </div>
              </div>

              {/* Alertas de Segurança */}
              {results.alerts.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    <ShieldAlert className="h-4.5 w-4.5 text-red-500 stroke-[2.5]" />
                    Alertas Críticos de Segurança:
                  </h4>
                  <div className="space-y-2">
                    {results.alerts.map((alert, i) => (
                      <div 
                        key={i} 
                        className={`p-3 rounded-xl text-xs leading-relaxed border ${
                          alert.type === 'danger' 
                            ? 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400' 
                            : 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400'
                        }`}
                        dangerouslySetInnerHTML={{ __html: sanitizeHTML(alert.text) }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Plasma sug */}
          {plasmaDose && (
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 p-5 rounded-2xl shadow-xl flex items-start gap-3 animate-in slide-in-from-right duration-300">
              <span className="p-1 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 mt-0.5">💡</span>
              <div className="space-y-1.5 text-sm">
                <p className="font-bold">Dosagem Sugerida de Plasma:</p>
                <p>O volume estimado é de <strong className="text-base text-amber-600 dark:text-amber-400 font-mono">{plasmaDose}</strong>.</p>
                <p className="text-xs text-muted-foreground/80 leading-relaxed">
                  A dose padrão para coagulopatias ou hipoproteinemia varia de <strong>10 a 20 mL/kg</strong>. O valor é apenas um guia inicial, adapte com base na avaliação clínica e laboratorial.
                </p>
              </div>
            </div>
          )}

          {/* Fallback no calculation */}
          {!results && !plasmaDose && (
            <div className="bg-card text-card-foreground border border-border/80 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center text-center h-full min-h-[220px] text-muted-foreground/80">
              <span className="text-4xl mb-3">🩸</span>
              <p className="font-semibold text-foreground/90">Aguardando Parâmetros</p>
              <p className="text-xs mt-1 max-w-[240px]">Preencha os dados do paciente à esquerda e clique em calcular para obter o volume e taxas de infusão.</p>
            </div>
          )}
        </div>

      </div>

      {/* Calculadora de Anticoagulante */}
      <div className="bg-card text-card-foreground border border-border/80 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-xl font-bold text-foreground border-b border-border/50 pb-3 flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">🧪</span>
          Calculadora de Anticoagulante (Coleta)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-5">
            <label htmlFor="collection-volume" className="block text-xs font-bold text-foreground/80 uppercase tracking-wide">Volume de Sangue a Coletar (mL)</label>
            <input 
              type="number" 
              id="collection-volume" 
              value={collectionVolume} 
              onChange={e => setCollectionVolume(e.target.value)} 
              className="mt-1.5 block w-full rounded-xl border border-input/60 shadow-sm focus:border-red-500 focus:ring-red-500/20 bg-background text-foreground transition-all px-3 py-2" 
              placeholder="50" 
            />
          </div>

          <div className="md:col-span-4">
            <label htmlFor="anticoagulant-type" className="block text-xs font-bold text-foreground/80 uppercase tracking-wide flex items-center">
              Tipo de Anticoagulante
              <HelpButton term="anticoagulants" onOpenModal={onOpenModal} />
            </label>
            <select 
              id="anticoagulant-type" 
              value={anticoagulantType} 
              onChange={e => setAnticoagulantType(e.target.value)} 
              className="mt-1.5 block w-full rounded-xl border border-input/60 shadow-sm focus:border-red-500 focus:ring-red-500/20 bg-background text-foreground transition-all px-3 py-2"
            >
              <option value="cpda1">CPDA-1 (1:7)</option>
              <option value="citrate">Citrato de Sódio 3.2-3.8% (1:9)</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <button 
              onClick={handleCalculateAnticoagulant} 
              className="w-full py-2.5 px-4 rounded-xl font-bold bg-muted hover:bg-muted/80 text-foreground border border-border/80 shadow-sm active:scale-95 transition-all text-sm flex items-center justify-center gap-1.5"
            >
              <FileSpreadsheet className="h-4 w-4" /> Calcular
            </button>
          </div>
        </div>

        {anticoagulantResult && (
          <div className="text-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 p-4 rounded-xl flex items-center justify-center gap-2 animate-in zoom-in-95 duration-200">
            <Award className="h-5 w-5" />
            <p className="text-sm font-medium">
              Volume de anticoagulante necessário: <strong className="text-base font-mono font-bold text-emerald-600 dark:text-emerald-400">{anticoagulantResult}</strong>
            </p>
          </div>
        )}
      </div>

    </div>
  );
});

CalculatorPage.displayName = 'CalculatorPage';
export default CalculatorPage;
