import React, { useState } from 'react';
import { Patient, Species, PhysiologicalState, Comorbidity } from '../../shared/types/patient';
import { cn } from '../lib/utils';
import { Activity, ChevronDown, ChevronUp, AlertCircle, Cat, Dog } from 'lucide-react';
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
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900 md:p-6">
      <div className="mb-3 flex items-center gap-3 md:mb-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400 md:h-10 md:w-10">
          <Activity className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">1. Dados do Paciente</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Informações base para cálculo e segurança</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        {/* Species */}
        <div className="space-y-2 md:col-span-3 md:space-y-3">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
            Espécie <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'dog' as Species, label: 'Cao', subtitle: 'Canino', icon: Dog },
              { id: 'cat' as Species, label: 'Gato', subtitle: 'Felino', icon: Cat },
            ].map((option) => {
              const Icon = option.icon;
              const isActive = patient.species === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => updateField('species', option.id)}
                  className={cn(
                    'flex min-h-28 flex-col items-center justify-center rounded-2xl border-2 p-3 text-center transition-all',
                    isActive
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-800 shadow-sm dark:border-indigo-400/70 dark:bg-indigo-500/15 dark:text-indigo-100'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-indigo-500/40',
                  )}
                >
                  <span
                    className={cn(
                      'mb-2 flex h-12 w-12 items-center justify-center rounded-full border',
                      isActive
                        ? 'border-indigo-200 bg-white text-indigo-600 dark:border-indigo-400/30 dark:bg-slate-900 dark:text-indigo-300'
                        : 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400',
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-sm font-black">{option.label}</span>
                  <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] opacity-70">
                    {option.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Weight */}
        <div className="space-y-2 md:space-y-3">
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
                "w-full rounded-xl border-2 py-3 pl-3 pr-10 text-lg font-bold transition-all focus:outline-none focus:ring-4",
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
        <div className="space-y-2 md:space-y-3">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Fase de Vida (Opcional)</label>
          <div className="grid grid-cols-2 gap-2 md:flex md:flex-col">
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
                    "min-h-11 rounded-xl border-2 px-3 py-2 text-left text-xs font-bold transition-all",
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
      <div className="border-t border-slate-100 pt-4 dark:border-slate-800/50 md:pt-6">
        <button 
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex min-h-11 w-full items-center gap-2 text-left text-sm font-bold text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
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
                
                <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
                  {comorbidityOptions.map((c) => {
                    const isActive = patient.comorbidities.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        onClick={() => toggleComorbidity(c.id)}
                        className={cn(
                          "min-h-11 rounded-xl border-2 px-3 py-2 text-xs font-bold transition-all",
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
