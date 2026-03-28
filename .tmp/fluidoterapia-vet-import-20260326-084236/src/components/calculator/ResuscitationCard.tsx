import { PatientProfile, ResuscitationConfig } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { Zap, Clock, AlertTriangle } from 'lucide-react';
import { Badge } from '../ui/badge';

interface Props {
  patient: PatientProfile;
  config: ResuscitationConfig;
  onChange: (updates: Partial<ResuscitationConfig>) => void;
}

const CUSTOM_MINUTES = [5, 10, 15, 20, 30, 60];

export function ResuscitationCard({ patient, config, onChange }: Props) {
  const isHighRisk = patient.comorbidities.includes('cardiopatia') || 
                     patient.comorbidities.includes('doenca_renal') || 
                     patient.ageGroup === 'neonate' || 
                     (patient.species === 'feline' && patient.comorbidities.includes('sepse'));

  return (
    <Card className="border-slate-200 shadow-sm dark:border-slate-800 overflow-hidden">
      <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
              <Zap className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Ressuscitação Volêmica</CardTitle>
              <CardDescription>Prova de carga / Bolus para hipovolemia</CardDescription>
            </div>
          </div>
          <Switch checked={config.enabled} onCheckedChange={v => onChange({ enabled: v })} />
        </div>
      </CardHeader>

      {config.enabled && (
        <CardContent className="p-6 space-y-8 animate-in fade-in slide-in-from-top-2">
          
          {isHighRisk && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-amber-800 dark:text-amber-300">Atenção: Paciente de Alto Risco</p>
                <p className="text-xs text-amber-700 dark:text-amber-400/80">
                  Devido às comorbidades ou idade, recomenda-se forte cautela. Use bolus menores (ex: 5 mL/kg) e reavalie perfusão, ausculta e esforço respiratório após cada bolus.
                </p>
              </div>
            </div>
          )}

          <div className="flex bg-slate-100 dark:bg-slate-900 rounded-xl p-1">
            <button
              onClick={() => onChange({ mode: 'preset' })}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                config.mode === 'preset'
                  ? 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Preset Clínico
            </button>
            <button
              onClick={() => onChange({ mode: 'custom' })}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                config.mode === 'custom'
                  ? 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Customizado
            </button>
          </div>

          {config.mode === 'preset' ? (
            <div className="space-y-4 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Protocolo Sugerido</Label>
                <Badge variant="outline" className="text-lg px-3 py-1 bg-white dark:bg-slate-950 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400">
                  {patient.species === 'feline' ? '7.5 mL/kg' : '17.5 mL/kg'}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {patient.species === 'feline' 
                  ? 'Gatos: Bolus inicial conservador padrão de 5–10 mL/kg em 15–30 min.' 
                  : 'Cães: Bolus inicial padrão de 15–20 mL/kg em 15–30 min.'}
              </p>
              <p className="text-xs text-slate-500 font-medium mt-2">
                * O sistema usará a média da faixa para o cálculo automático.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Volume (mL/kg)</Label>
                <Input 
                  type="number" 
                  min="1"
                  value={config.customMlKg || ''} 
                  onChange={e => onChange({ customMlKg: parseFloat(e.target.value) || 0 })}
                  className="text-lg h-12"
                  placeholder="Ex: 10"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-slate-500" />
                  <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Tempo de Infusão</Label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CUSTOM_MINUTES.map(m => (
                    <button
                      key={m}
                      onClick={() => onChange({ customMinutes: m })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border-2 ${
                        config.customMinutes === m
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {m} min
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </CardContent>
      )}
    </Card>
  );
}
