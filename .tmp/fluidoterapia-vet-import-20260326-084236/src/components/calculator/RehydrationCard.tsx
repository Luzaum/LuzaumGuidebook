import { RehydrationConfig } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Droplet, Info, Clock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '../ui/tooltip';
import { Input } from '../ui/input';

interface Props {
  config: RehydrationConfig;
  onChange: (updates: Partial<RehydrationConfig>) => void;
}

const CORRECTION_HOURS = [6, 8, 10, 12, 16, 24, 48];

export function RehydrationCard({ config, onChange }: Props) {
  return (
    <Card className="border-slate-200 shadow-sm dark:border-slate-800 overflow-hidden">
      <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Droplet className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Reidratação</CardTitle>
              <CardDescription>Correção de déficits do compartimento intersticial</CardDescription>
            </div>
          </div>
          <Switch checked={config.enabled} onCheckedChange={v => onChange({ enabled: v })} />
        </div>
      </CardHeader>

      {config.enabled && (
        <CardContent className="p-6 space-y-8 animate-in fade-in slide-in-from-top-2">
          
          {/* Desidratação */}
          <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Grau de Desidratação (%)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-slate-400 hover:text-indigo-500 transition-colors">
                      <Info className="w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent className="w-80 p-4 space-y-2 text-sm bg-slate-900 text-slate-100 border-slate-800">
                      <p className="font-bold text-indigo-400 mb-2">Como estimar clinicamente:</p>
                      <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                        <li><strong className="text-white">&lt;5%:</strong> Geralmente não detectável</li>
                        <li><strong className="text-white">5-6%:</strong> Discreta alteração de turgor</li>
                        <li><strong className="text-white">6-8%:</strong> Leve diminuição do turgor + mucosas secas</li>
                        <li><strong className="text-white">8-10%:</strong> Turgor reduzido + globos retraídos</li>
                        <li><strong className="text-white">10-12%:</strong> Skin tent persistente, córneas opacas, evidência de hipovolemia</li>
                        <li><strong className="text-rose-400">&gt;12%:</strong> Choque hipovolêmico / risco de morte</li>
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-2">
                <Input 
                  type="number" 
                  min="0" 
                  max="15" 
                  step="1"
                  value={config.dehydrationPercent} 
                  onChange={(e) => onChange({ dehydrationPercent: Number(e.target.value) })}
                  className="w-24 text-right font-bold text-indigo-700 dark:text-indigo-400"
                />
                <span className="text-sm font-medium text-slate-500">%</span>
              </div>
            </div>
            
            <Slider
              value={[config.dehydrationPercent]}
              min={0}
              max={15}
              step={1}
              onValueChange={(v) => onChange({ dehydrationPercent: v[0] })}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>0%</span>
              <span>15% (Choque)</span>
            </div>
          </div>

          {/* Tempo de Correção */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-500" />
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Tempo para Correção (horas)</Label>
            </div>
            <div className="flex items-center gap-2">
              <Input 
                type="number" 
                min="1" 
                max="72" 
                value={config.correctionHours === 0 ? config.customCorrectionHours : config.correctionHours} 
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onChange({ correctionHours: val, customCorrectionHours: val });
                }}
                className="w-32 text-right font-bold text-indigo-700 dark:text-indigo-400 h-12 text-lg"
                placeholder="Ex: 24"
              />
              <span className="text-sm font-medium text-slate-500">horas</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Recomenda-se correção lenta (12-24h) para evitar sobrecarga e permitir equilíbrio intracelular.
            </p>
          </div>

        </CardContent>
      )}
    </Card>
  );
}
