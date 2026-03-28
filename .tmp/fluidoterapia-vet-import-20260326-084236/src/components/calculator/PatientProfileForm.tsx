import { PatientProfile, PhysiologicState, Comorbidity } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Cat, Dog, Weight, Activity, HeartPulse } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  patient: PatientProfile;
  onChange: (updates: Partial<PatientProfile>) => void;
}

const COMORBIDITIES: { id: Comorbidity; label: string }[] = [
  { id: 'cardiopatia', label: 'Cardiopatia' },
  { id: 'doenca_renal', label: 'Doença Renal' },
  { id: 'tce', label: 'TCE / TBI' },
  { id: 'hipoalbuminemia', label: 'Hipoalbuminemia' },
  { id: 'anemia', label: 'Anemia / Hemorragia' },
  { id: 'sepse', label: 'Sepse / Vasodilatação' },
  { id: 'anestesia', label: 'Anestesia / Perioperatório' },
];

export function PatientProfileForm({ patient, onChange }: Props) {
  const toggleComorbidity = (id: Comorbidity) => {
    const newComorbidities = patient.comorbidities.includes(id)
      ? patient.comorbidities.filter(c => c !== id)
      : [...patient.comorbidities, id];
    onChange({ comorbidities: newComorbidities });
  };

  return (
    <Card className="border-slate-200 shadow-sm dark:border-slate-800">
      <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
            <Activity className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <CardTitle className="text-lg">Perfil do Paciente</CardTitle>
            <CardDescription>Dados base para os cálculos de fluidoterapia</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        
        {/* Espécie */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Espécie</Label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onChange({ species: 'canine' })}
              className={cn(
                "flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all",
                patient.species === 'canine' 
                  ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300" 
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400"
              )}
            >
              <Dog className="w-6 h-6" />
              <span className="font-medium text-lg">Cão</span>
            </button>
            <button
              onClick={() => onChange({ species: 'feline' })}
              className={cn(
                "flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all",
                patient.species === 'feline' 
                  ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300" 
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400"
              )}
            >
              <Cat className="w-6 h-6" />
              <span className="font-medium text-lg">Gato</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Peso */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Peso Atual (kg)</Label>
            <div className="relative">
              <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input 
                type="number" 
                min="0.1" 
                step="0.1"
                value={patient.weightKg || ''} 
                onChange={e => onChange({ weightKg: parseFloat(e.target.value) || 0 })}
                className="pl-10 text-lg h-12 font-bold text-teal-700 dark:text-teal-400"
                placeholder="Ex: 10.5"
              />
            </div>
            <Slider
              value={[patient.weightKg || 0]}
              min={1}
              max={80}
              step={0.5}
              onValueChange={(v) => onChange({ weightKg: v[0] })}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>1 kg</span>
              <span>80 kg</span>
            </div>
          </div>

          {/* Estado Fisiológico */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Idade</Label>
            <Select value={patient.ageGroup} onValueChange={(v: PhysiologicState) => onChange({ ageGroup: v })}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="puppy">Pediátrico (&lt; 6m)</SelectItem>
                <SelectItem value="adult">Adulto</SelectItem>
                <SelectItem value="senior">Geriátrico</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Obesidade Toggle */}
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="space-y-0.5">
            <Label className="text-base font-medium">Paciente Obeso?</Label>
            <p className="text-sm text-slate-500">Permite usar peso ideal para cálculos</p>
          </div>
          <Switch 
            checked={patient.isObese} 
            onCheckedChange={v => onChange({ isObese: v })} 
          />
        </div>

        {patient.isObese && (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Peso Ideal (kg)</Label>
            <Input 
              type="number" 
              min="0.1" 
              step="0.1"
              value={patient.idealWeightKg || ''} 
              onChange={e => onChange({ idealWeightKg: parseFloat(e.target.value) || undefined })}
              className="text-lg h-12"
              placeholder="Peso ajustado para o cálculo"
            />
            <p className="text-xs text-amber-600 dark:text-amber-400">
              O tecido adiposo contém pouca água. Usar o peso atual em obesos pode superestimar as necessidades hídricas.
            </p>
          </div>
        )}

        {/* Comorbidades */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-rose-500" />
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Comorbidades e Condições Clínicas</Label>
          </div>
          <div className="flex flex-wrap gap-2">
            {COMORBIDITIES.map(c => (
              <Badge
                key={c.id}
                variant={patient.comorbidities.includes(c.id) ? "default" : "outline"}
                className={cn(
                  "cursor-pointer text-sm py-1.5 px-3 transition-all",
                  patient.comorbidities.includes(c.id) 
                    ? "bg-rose-500 hover:bg-rose-600 text-white border-transparent" 
                    : "hover:border-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                )}
                onClick={() => toggleComorbidity(c.id)}
              >
                {c.label}
              </Badge>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
