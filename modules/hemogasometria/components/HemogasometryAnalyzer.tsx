import React from 'react';
import { BloodGasInputs, Species } from '../types/hemoTypes';

interface Props {
  inputs: BloodGasInputs;
  setInputs: React.Dispatch<React.SetStateAction<BloodGasInputs>>;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

const QuickAddButtons = ({ param, setInputs, steps }: { param: keyof BloodGasInputs, setInputs: any, steps: number[] }) => {
    const handleAdd = (amount: number) => {
        setInputs((prev: any) => {
            const current = parseFloat(prev[param]) || 0;
            const next = current + amount;
            return { ...prev, [param]: parseFloat(next.toFixed(2)) };
        });
    };
    return (
        <div className="flex w-full gap-1 mt-2 justify-between">
            {steps.map(step => (
                <button 
                  key={step} 
                  type="button" 
                  onClick={() => handleAdd(step)} 
                  className={`flex-1 flex justify-center items-center text-[10px] font-bold py-1.5 px-0.5 rounded-md border transition-all hover:scale-105 active:scale-95 shadow-sm
                  ${step > 0 
                    ? 'bg-blue-50/80 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40' 
                    : 'bg-rose-50/80 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/40'}`}
                >
                    {step > 0 ? '+' : ''}{step}
                </button>
            ))}
        </div>
    );
};

export const HemogasometryAnalyzer: React.FC<Props> = ({ inputs, setInputs, onSubmit, onReset }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setInputs(prev => ({ ...prev, [id]: id === 'species' || id === 'declaredSampleType' ? value : parseFloat(value) || 0 }));
  };

  const handleSpeciesChange = (species: Species) => {
    setInputs(prev => ({ ...prev, species }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Nova Análise</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Insira os dados da hemogasometria para interpretação inteligente.</p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={onReset} className="px-4 py-2 bg-slate-200 dark:bg-[#151b28] hover:bg-slate-300 dark:hover:bg-slate-700 text-red-600 dark:text-red-400 rounded-lg font-medium transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">restart_alt</span> Resetar
          </button>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Card 1: Paciente */}
          <section className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-800 p-5 shadow-xl">
             <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                    <span className="material-symbols-outlined">pets</span>
                </div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">Paciente</h3>
            </div>
            
            <div className="space-y-4">
               <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => handleSpeciesChange('dog')} className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${inputs.species === 'dog' ? 'border-blue-500 bg-blue-500/10 text-blue-500' : 'border-slate-200 dark:border-slate-800 hover:border-blue-500/50'}`}>
                    <span className="material-symbols-outlined text-3xl mb-1">sound_detection_dog_barking</span>
                    <span className="text-xs font-bold uppercase">Cão</span>
                  </button>
                  <button type="button" onClick={() => handleSpeciesChange('cat')} className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${inputs.species === 'cat' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-800 hover:border-primary/50'}`}>
                    <span className="material-symbols-outlined text-3xl mb-1">cruelty_free</span>
                    <span className="text-xs font-bold uppercase">Gato</span>
                  </button>
               </div>

               <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Temp (°C)</label>
                    <input id="temp" value={inputs.temp} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono font-medium" placeholder="38.5" step="0.1" type="number" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">FiO₂ (%)</label>
                    <input id="fio2" value={inputs.fio2} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono font-medium" placeholder="21" step="1" type="number" required />
                  </div>
               </div>
               
               <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Amostra</label>
                  <select id="declaredSampleType" value={inputs.declaredSampleType} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer">
                    <option value="arterial">Arterial</option>
                    <option value="venous">Venosa</option>
                  </select>
               </div>
            </div>
          </section>

          {/* Card 2: Gases */}
          <section className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-800 p-5 shadow-xl">
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-teal-500/10 text-teal-500">
                    <span className="material-symbols-outlined">air</span>
                </div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">Gases</h3>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">pH</label>
                <input id="ph" value={inputs.ph} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-mono text-lg font-bold" placeholder="7.40" step="0.01" type="number" required />
                <QuickAddButtons param="ph" setInputs={setInputs} steps={[-0.1, -0.01, 0.01, 0.1]} />
              </div>
              <div className="relative">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">pCO₂ (mmHg)</label>
                <input id="pco2" value={inputs.pco2} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-mono text-lg font-bold" placeholder="40.0" step="0.1" type="number" required />
                <QuickAddButtons param="pco2" setInputs={setInputs} steps={[-5, -1, 1, 5]} />
              </div>
              <div className="relative">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">pO₂ (mmHg)</label>
                <input id="po2" value={inputs.po2} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-mono text-lg font-bold" placeholder="95.0" step="0.1" type="number" required />
                <QuickAddButtons param="po2" setInputs={setInputs} steps={[-10, -1, 1, 10]} />
              </div>
            </div>
          </section>

          {/* Card 3: Eletrólitos */}
          <section className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-800 p-5 shadow-xl">
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                    <span className="material-symbols-outlined">bolt</span>
                </div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">Eletrólitos</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="relative">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Na⁺ (mEq/L)</label>
                <input id="na" value={inputs.na} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none font-mono font-bold" placeholder="140" step="0.1" type="number" />
                <QuickAddButtons param="na" setInputs={setInputs} steps={[-5, -1, 1, 5]} />
              </div>
              <div className="relative">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">K⁺ (mEq/L)</label>
                <input id="k" value={inputs.k} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none font-mono font-bold" placeholder="4.0" step="0.1" type="number" />
                <QuickAddButtons param="k" setInputs={setInputs} steps={[-0.5, -0.1, 0.1, 0.5]} />
              </div>
              <div className="relative">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Cl⁻ (mEq/L)</label>
                <input id="cl" value={inputs.cl} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none font-mono font-bold" placeholder="105" step="0.1" type="number" />
                <QuickAddButtons param="cl" setInputs={setInputs} steps={[-5, -1, 1, 5]} />
              </div>
            </div>
          </section>

          {/* Card 4: Metabólitos */}
          <section className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-800 p-5 shadow-xl">
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                    <span className="material-symbols-outlined">water_drop</span>
                </div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">Metabólitos</h3>
            </div>
            <div className="space-y-4">
               <div className="relative">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">HCO₃⁻ (mEq/L)</label>
                <input id="hco3" value={inputs.hco3} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none font-mono text-lg font-bold" placeholder="24" step="0.1" type="number" required />
                <QuickAddButtons param="hco3" setInputs={setInputs} steps={[-2, -1, 1, 2]} />
              </div>
              <div className="relative">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Albumina (g/dL)</label>
                <input id="albumin" value={inputs.albumin} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none font-mono font-bold" placeholder="3.0" step="0.1" type="number" />
                <QuickAddButtons param="albumin" setInputs={setInputs} steps={[-0.5, -0.1, 0.1, 0.5]} />
              </div>
              <div className="relative">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">BE (Base Excess)</label>
                <input id="be" value={inputs.be} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none font-mono font-bold" placeholder="0" step="0.1" type="number" />
                <QuickAddButtons param="be" setInputs={setInputs} steps={[-2, -1, 1, 2]} />
              </div>
            </div>
          </section>
        </div>

        <div className="flex justify-center p-6">
          <button type="submit" className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl shadow-2xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">analytics</span>
            <span className="text-xl font-black uppercase tracking-widest">Analisar Hemogasometria</span>
          </button>
        </div>
      </form>
    </div>
  );
};
