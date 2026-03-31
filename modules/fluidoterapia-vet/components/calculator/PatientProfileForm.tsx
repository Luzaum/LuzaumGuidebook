import { useMemo, useState } from 'react';
import { Activity, Cat, Dog, HeartPulse, Info, Weight } from 'lucide-react';
import { comorbidityContent, physiologicStateContent } from '../../data/clinicalContent';
import { Comorbidity, PatientProfile, PhysiologicState } from '../../types';
import { cn } from '../../lib/utils';
import { ClinicalInfoModal } from '../shared/ClinicalInfoModal';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';

interface Props {
  patient: PatientProfile;
  onChange: (updates: Partial<PatientProfile>) => void;
}

const PHYSIOLOGIC_STATES: { id: PhysiologicState; label: string }[] = [
  { id: 'adult', label: 'Adulto' },
  { id: 'puppy', label: 'Filhote' },
  { id: 'neonate', label: 'Neonato' },
  { id: 'senior', label: 'Idoso' },
  { id: 'pregnant', label: 'Gestante' },
  { id: 'lactating', label: 'Lactante' },
  { id: 'obese', label: 'Obeso' },
];

const COMORBIDITIES: { id: Comorbidity; label: string }[] = [
  { id: 'cardiopatia', label: 'Cardiopatia' },
  { id: 'doenca_renal', label: 'Doença renal' },
  { id: 'tce', label: 'TCE' },
  { id: 'hipoalbuminemia', label: 'Hipoalbuminemia' },
  { id: 'anemia', label: 'Anemia / hemorragia' },
  { id: 'sepse', label: 'Sepse / vasodilatação' },
  { id: 'anestesia', label: 'Anestesia / perioperatório' },
];

export function PatientProfileForm({ patient, onChange }: Props) {
  const [modalContentKey, setModalContentKey] = useState<string | null>(null);

  const modalContent = useMemo(() => {
    if (!modalContentKey) {
      return undefined;
    }
    if (modalContentKey in physiologicStateContent) {
      return physiologicStateContent[modalContentKey as PhysiologicState];
    }
    return comorbidityContent[modalContentKey as Comorbidity];
  }, [modalContentKey]);

  const toggleComorbidity = (id: Comorbidity) => {
    const comorbidities = patient.comorbidities.includes(id)
      ? patient.comorbidities.filter((item) => item !== id)
      : [...patient.comorbidities, id];
    onChange({ comorbidities });
  };

  return (
    <>
      <Card className="border-slate-200 shadow-sm dark:border-slate-800">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4 dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-teal-100 p-2 dark:bg-teal-900/30">
              <Activity className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <CardTitle className="text-lg">1. Perfil do Paciente</CardTitle>
              <CardDescription>Defina espécie, peso, estado fisiológico e fatores que mudam a prescrição.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 p-6">
          <div className="space-y-3">
            <Label className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Espécie</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => onChange({ species: 'canine' })}
                className={cn(
                  'flex items-center justify-center gap-3 rounded-xl border-2 p-4 transition-all',
                  patient.species === 'canine'
                    ? 'border-teal-500 bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700',
                )}
              >
                <Dog className="h-6 w-6" />
                <span className="text-lg font-medium">Cão</span>
              </button>
              <button
                type="button"
                onClick={() => onChange({ species: 'feline' })}
                className={cn(
                  'flex items-center justify-center gap-3 rounded-xl border-2 p-4 transition-all',
                  patient.species === 'feline'
                    ? 'border-teal-500 bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700',
                )}
              >
                <Cat className="h-6 w-6" />
                <span className="text-lg font-medium">Gato</span>
              </button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <Label className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Peso atual (kg)</Label>
              <div className="relative">
                <Weight className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={patient.weightKg || ''}
                  onChange={(event) => onChange({ weightKg: Math.max(0, parseFloat(event.target.value) || 0) })}
                  className="h-12 pl-10 text-lg font-bold text-teal-700 dark:text-teal-400"
                  placeholder="Ex: 10.5"
                />
              </div>
              <Slider
                value={[patient.weightKg || 0]}
                min={0.5}
                max={80}
                step={0.1}
                onValueChange={(value) => onChange({ weightKg: value[0] })}
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Paciente obeso?</Label>
                  <p className="text-sm text-slate-500">Permite usar peso ideal para os cálculos de manutenção e reposição.</p>
                </div>
                <Switch checked={patient.isObese} onCheckedChange={(checked) => onChange({ isObese: checked })} />
              </div>

              {patient.isObese ? (
                <div className="mt-4 space-y-2">
                  <Label className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Peso ideal (kg)</Label>
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={patient.idealWeightKg || ''}
                    onChange={(event) => onChange({ idealWeightKg: parseFloat(event.target.value) || undefined })}
                    placeholder="Peso usado para o cálculo"
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Estado fisiológico</Label>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {PHYSIOLOGIC_STATES.map((state) => {
                const active = patient.ageGroup === state.id;
                return (
                  <div key={state.id} className="flex items-stretch gap-2">
                    <button
                      type="button"
                      onClick={() => onChange({ ageGroup: state.id })}
                      className={cn(
                        'flex-1 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all',
                        active
                          ? 'border-teal-500 bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-slate-700',
                      )}
                    >
                      {state.label}
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalContentKey(state.id)}
                      className="rounded-xl border border-slate-200 px-3 text-slate-500 transition-colors hover:border-teal-300 hover:text-teal-600 dark:border-slate-800 dark:hover:border-teal-700 dark:hover:text-teal-400"
                      aria-label={`Abrir ajuda sobre ${state.label}`}
                    >
                      <Info className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-rose-500" />
              <Label className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Comorbidades e condições clínicas</Label>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {COMORBIDITIES.map((comorbidity) => {
                const active = patient.comorbidities.includes(comorbidity.id);
                return (
                  <div key={comorbidity.id} className="flex items-stretch gap-2">
                    <Badge
                      variant={active ? 'default' : 'outline'}
                      className={cn(
                        'flex-1 cursor-pointer justify-start rounded-xl px-4 py-3 text-sm font-medium transition-all',
                        active
                          ? 'border-transparent bg-rose-500 text-white hover:bg-rose-600'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-rose-300 hover:bg-rose-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-rose-950/30',
                      )}
                      onClick={() => toggleComorbidity(comorbidity.id)}
                    >
                      {comorbidity.label}
                    </Badge>
                    <button
                      type="button"
                      onClick={() => setModalContentKey(comorbidity.id)}
                      className="rounded-xl border border-slate-200 px-3 text-slate-500 transition-colors hover:border-rose-300 hover:text-rose-600 dark:border-slate-800 dark:hover:border-rose-700 dark:hover:text-rose-400"
                      aria-label={`Abrir ajuda sobre ${comorbidity.label}`}
                    >
                      <Info className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <ClinicalInfoModal open={Boolean(modalContent)} content={modalContent} onClose={() => setModalContentKey(null)} />
    </>
  );
}
