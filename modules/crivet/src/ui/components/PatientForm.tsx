import React, { useState } from 'react';
import { Patient, Species, PhysiologicalState, Comorbidity } from '../../shared/types/patient';
import { cn } from '../lib/utils';
import { Activity, Heart, Droplets, ActivitySquare, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { SpeciesPortraitCards } from '../../../../../components/SpeciesPortraitCards';
import { motion, AnimatePresence } from 'framer-motion';

interface PatientFormProps {
  patient: Patient;
  onChange: (patient: Patient) => void;
}

export const PatientForm: React.FC<PatientFormProps> = ({ patient, onChange }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateField = <K extends keyof Patient>(field: K, value: Patient[K]) => {
    onChange({ ...patient, [field]: value });
  };

  const toggleComorbidity = (c: Comorbidity) => {
    const current = patient.comorbidities;
    if (current.includes(c)) {
      updateField('comorbidities', current.filter(item => item !== c));
    } else {
      updateField('comorbidities', [...current, c]);
    }
  };

  const comorbidityOptions: { id: Comorbidity; label: string }[] = [
    { id: 'cardiopath', label: 'Cardiopatia' },
    { id: 'renopath', label: 'Nefropatia' },
    { id: 'hepatopath', label: 'Hepatopatia' },
    { id: 'endocrinopath', label: 'Endocrinopatia' },
    { id: 'hypertension', label: 'Hipertensão' },
    { id: 'shock', label: 'Choque' },
    { id: 'hypovolemia', label: 'Hipovolemia' },
    { id: 'sepsis', label: 'Sepse' },
    { id: 'respiratory_disease', label: 'Doença Respiratória' },
    { id: 'neurological_disease', label: 'Doença Neurológica' },
    { id: 'pregnancy_lactation', label: 'Gestação/Lactação' },
    { id: 'urinary_obstruction', label: 'Obstrução Urinária' },
  ];

  return (
    <div className="space-y-5 bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">1. Dados do Paciente</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Informações base para cálculo e segurança</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Species */}
        <div className="space-y-3 md:col-span-3">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
            Espécie <span className="text-red-500">*</span>
          </label>
          <SpeciesPortraitCards
            variant="indigo"
            size="compact"
            showHeading={false}
            canineSelected={patient.species === 'dog'}
            felineSelected={patient.species === 'cat'}
            onSelectCanine={() => updateField('species', 'dog')}
            onSelectFeline={() => updateField('species', 'cat')}
            canineSubtitle="Cálculos e limites para cães"
            felineSubtitle="Cálculos e limites para gatos"
          />
        </div>

        {/* Weight */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
            Peso <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="0.1"
              step="any"
              value={patient.weight === 0 ? '' : patient.weight}
              onChange={(e) => {
                const val = e.target.value.replace(',', '.');
                updateField('weight', val === '' ? 0 : parseFloat(val));
              }}
              className={cn(
                "w-full py-2.5 pl-3 pr-10 rounded-xl border-2 focus:outline-none focus:ring-4 transition-all text-lg font-bold",
                patient.weight <= 0 
                  ? "border-red-300 dark:border-red-500/50 focus:border-red-500 focus:ring-red-500/10 bg-red-50 dark:bg-red-500/10 text-slate-800 dark:text-white" 
                  : "border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/10 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
              )}
              placeholder="Ex: 15.5"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold text-sm">kg</span>
          </div>
          {patient.weight <= 0 && (
            <p className="text-xs text-red-500 font-medium">O peso deve ser maior que zero.</p>
          )}
        </div>

        {/* State */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Fase de Vida (Opcional)</label>
          <div className="flex flex-col gap-2">
            {(['neonate', 'pediatric', 'adult', 'senior'] as PhysiologicalState[]).map((state) => {
              const labels: Record<PhysiologicalState, string> = {
                neonate: 'Neonato',
                pediatric: 'Filhote',
                adult: 'Adulto',
                senior: 'Idoso'
              };
              return (
                <button
                  key={state}
                  onClick={() => updateField('state', state)}
                  className={cn(
                    "py-2 px-3 rounded-xl border-2 text-xs transition-all font-medium text-left",
                    patient.state === state
                      ? "bg-slate-800 dark:bg-slate-700 border-slate-800 dark:border-slate-600 text-white shadow-sm"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/80"
                  )}
                >
                  {labels[state]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Advanced Clinical Data */}
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800/50">
        <button 
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors w-full"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
            {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
          Dados Clínicos Avançados (Comorbidades)
          {patient.comorbidities.length > 0 && (
            <span className="ml-auto bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 py-1 px-3 rounded-full text-xs font-bold">
              {patient.comorbidities.length} selecionada(s)
            </span>
          )}
        </button>

        <AnimatePresence>
          {showAdvanced && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-5 space-y-5">
                <div className="flex items-start gap-3 p-4 bg-blue-50/50 dark:bg-blue-500/5 text-blue-800 dark:text-blue-300 rounded-2xl border border-blue-100 dark:border-blue-500/10 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-blue-500 dark:text-blue-400" />
                  <p className="leading-relaxed font-medium">Selecione as condições clínicas do paciente. Isso ativará alertas de segurança específicos para os fármacos escolhidos.</p>
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {comorbidityOptions.map((c) => {
                    const isActive = patient.comorbidities.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        onClick={() => toggleComorbidity(c.id)}
                        className={cn(
                          "py-2 px-4 rounded-xl border-2 text-xs transition-all font-bold",
                          isActive
                            ? "bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-400 shadow-sm"
                            : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/80"
                        )}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
