import React, { useState } from 'react';
import { Patient, Species, PhysiologicalState, Comorbidity } from '../../shared/types/patient';
import { cn } from '../lib/utils';
import { Activity, ChevronDown, ChevronUp, Dog, Cat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionCard } from './SectionCard';

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
      updateField('comorbidities', current.filter((item) => item !== c));
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
    { id: 'respiratory_disease', label: 'Respiratória' },
    { id: 'neurological_disease', label: 'Neurológica' },
    { id: 'pregnancy_lactation', label: 'Gestação/Lactação' },
    { id: 'urinary_obstruction', label: 'Obstr. Urinária' },
  ];

  const lifeStages: { id: PhysiologicalState; label: string }[] = [
    { id: 'neonate', label: 'Neonato' },
    { id: 'pediatric', label: 'Filhote' },
    { id: 'adult', label: 'Adulto' },
    { id: 'senior', label: 'Idoso' },
  ];

  const speciesOptions: { id: Species; label: string; icon: typeof Dog }[] = [
    { id: 'dog', label: 'Cão', icon: Dog },
    { id: 'cat', label: 'Gato', icon: Cat },
  ];

  return (
    <SectionCard
      step={1}
      icon={Activity}
      title="Paciente"
      subtitle="Espécie, peso e condições clínicas"
    >
      <div className="space-y-4">
        {/* Espécie + peso em linha */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-2">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Espécie
            </label>
            <div className="flex gap-2">
              {speciesOptions.map((option) => {
                const Icon = option.icon;
                const isActive = patient.species === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => updateField('species', option.id)}
                    className={cn(
                      'flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-colors',
                      isActive
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-500/50 dark:bg-emerald-500/10 dark:text-emerald-300'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300',
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full space-y-2 sm:w-36">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Peso (kg)
            </label>
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
                'w-full rounded-xl border px-3 py-2.5 text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20',
                patient.weight <= 0
                  ? 'border-rose-300 bg-rose-50/50 dark:border-rose-500/40 dark:bg-rose-500/5'
                  : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800',
              )}
              placeholder="15.5"
            />
          </div>
        </div>

        {patient.weight <= 0 && (
          <p className="text-xs text-rose-600 dark:text-rose-400">Informe um peso maior que zero.</p>
        )}

        {/* Fase de vida */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Fase de vida <span className="text-slate-400">(opcional)</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {lifeStages.map((stage) => {
              const isActive = patient.state === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => updateField('state', stage.id)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                    isActive
                      ? 'bg-slate-800 text-white dark:bg-slate-600'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700',
                  )}
                >
                  {stage.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comorbidades colapsáveis */}
        <div className="border-t border-slate-100 pt-3 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex w-full items-center gap-2 text-left text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {showAdvanced ? (
              <ChevronUp className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            )}
            Comorbidades
            {patient.comorbidities.length > 0 && (
              <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                {patient.comorbidities.length}
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
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {comorbidityOptions.map((c) => {
                    const isActive = patient.comorbidities.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => toggleComorbidity(c.id)}
                        className={cn(
                          'rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors',
                          isActive
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400',
                        )}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionCard>
  );
};
