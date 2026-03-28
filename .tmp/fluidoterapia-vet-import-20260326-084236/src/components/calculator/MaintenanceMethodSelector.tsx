import { PatientProfile, MaintenanceConfig, MaintenanceMethod } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { Droplets, Settings2, Calculator, Stethoscope, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Input } from '../ui/input';

interface Props {
  patient: PatientProfile;
  config: MaintenanceConfig;
  onChange: (updates: Partial<MaintenanceConfig>) => void;
  results: { mlPerDay: number; mlPerHour: number; x1: number; x1_5: number; x2: number };
}

const METHODS: { id: MaintenanceMethod; label: string; desc: string; icon: any }[] = [
  { id: 'allometric', label: 'Alométrico (Padrão)', desc: 'Recomendado', icon: Calculator },
  { id: 'linear', label: 'Linear (Regra de Bolso)', desc: '30 × peso + 70', icon: Calculator },
  { id: 'manual', label: 'Manual', desc: 'Ajuste livre', icon: Settings2 },
];

export function MaintenanceMethodSelector({ patient, config, onChange, results }: Props) {
  const weight = patient.isObese && patient.idealWeightKg ? patient.idealWeightKg : patient.weightKg;
  const showLinearWarning = config.method === 'linear' && (weight < 2 || weight > 40);

  return (
    <Card className="border-slate-200 shadow-sm dark:border-slate-800 overflow-hidden">
      <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-lg">2. Manutenção</CardTitle>
            <CardDescription>Escolha o método de cálculo das necessidades basais</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {METHODS.map(m => {
            const Icon = m.icon;
            const isActive = config.method === m.id;
            return (
              <button
                key={m.id}
                onClick={() => onChange({ method: m.id })}
                className={cn(
                  "flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all",
                  isActive 
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm" 
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                )}
              >
                <Icon className={cn("w-5 h-5 mb-3", isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400")} />
                <span className={cn("font-semibold text-sm", isActive ? "text-blue-900 dark:text-blue-100" : "text-slate-700 dark:text-slate-300")}>{m.label}</span>
                <span className={cn("text-xs mt-1", isActive ? "text-blue-700 dark:text-blue-300" : "text-slate-500")}>{m.desc}</span>
              </button>
            )
          })}
        </div>

        {showLinearWarning && (
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Atenção: Precisão Reduzida</p>
              <p className="mt-1">A fórmula linear (30 × peso + 70) perde precisão em pacientes com menos de 2 kg ou mais de 40 kg. Considere usar o método Alométrico.</p>
            </div>
          </div>
        )}

        {config.method === 'manual' && (
          <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Taxa Manual (mL/kg/dia)</Label>
              <div className="flex items-center gap-2">
                <Input 
                  type="number" 
                  min="20" 
                  max="120" 
                  value={Number.isFinite(config.manualMlPerKgDay) ? config.manualMlPerKgDay : 50} 
                  onChange={(e) => onChange({ manualMlPerKgDay: Number(e.target.value) })}
                  className="w-24 text-right font-bold text-blue-700 dark:text-blue-400"
                />
                <span className="text-sm font-medium text-slate-500">mL/kg/dia</span>
              </div>
            </div>
            <Slider
              value={[Number.isFinite(config.manualMlPerKgDay) ? config.manualMlPerKgDay : 50]}
              min={20}
              max={120}
              step={1}
              onValueChange={(v) => onChange({ manualMlPerKgDay: v[0] })}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>20 mL/kg/dia</span>
              <span>120 mL/kg/dia</span>
            </div>
          </div>
        )}

      </CardContent>
    </Card>
  );
}
