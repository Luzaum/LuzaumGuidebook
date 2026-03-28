import type { ElementType } from 'react';
import { AlertTriangle, Calculator, Clock3, Droplets, Info, Settings2, Stethoscope } from 'lucide-react';
import { maintenanceGuide } from '../../data/clinicalContent';
import { MaintenanceConfig, MaintenanceMethod, PatientProfile } from '../../types';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

interface Props {
  patient: PatientProfile;
  config: MaintenanceConfig;
  onChange: (updates: Partial<MaintenanceConfig>) => void;
  results: { mlPerDay: number; mlPerHour: number; x1: number; x1_5: number; x2: number };
}

const METHODS: { id: MaintenanceMethod; label: string; desc: string; icon: ElementType }[] = [
  { id: 'allometric', label: 'Alometrico por especie', desc: 'Padrao recomendado', icon: Calculator },
  { id: 'preset_dog', label: 'Padrao cao', desc: '60 mL/kg/dia', icon: Droplets },
  { id: 'preset_cat', label: 'Padrao gato', desc: '40 mL/kg/dia', icon: Droplets },
  { id: 'linear', label: 'Linear', desc: '30 x peso + 70', icon: Calculator },
  { id: 'anesthesia', label: 'Anestesia', desc: 'Taxa inicial conservadora', icon: Stethoscope },
  { id: 'manual', label: 'Manual', desc: '20 a 120 mL/kg/dia', icon: Settings2 },
];

function clampManual(value: number) {
  if (!Number.isFinite(value)) {
    return 60;
  }
  return Math.min(Math.max(value, 20), 120);
}

export function MaintenanceMethodSelector({ patient, config, onChange, results }: Props) {
  const isSpeciesMismatch =
    (config.method === 'preset_dog' && patient.species !== 'canine') ||
    (config.method === 'preset_cat' && patient.species !== 'feline');

  const anesthesiaDefault = patient.species === 'canine' ? 5 : 3;
  const anesthesiaMax = 5;

  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm dark:border-slate-800">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
            <Droplets className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-lg">2. Manutencao</CardTitle>
            <CardDescription>Escolha a logica basal e ajuste a taxa sem misturar ressuscitacao.</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 p-6">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {METHODS.map((method) => {
            const Icon = method.icon;
            const active = config.method === method.id;

            return (
              <button
                key={method.id}
                type="button"
                onClick={() => onChange({ method: method.id })}
                className={cn(
                  'rounded-xl border-2 p-4 text-left transition-all',
                  active
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700',
                )}
              >
                <Icon className={cn('mb-3 h-5 w-5', active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400')} />
                <p className={cn('text-sm font-semibold', active ? 'text-blue-900 dark:text-blue-100' : 'text-slate-700 dark:text-slate-300')}>{method.label}</p>
                <p className={cn('mt-1 text-xs', active ? 'text-blue-700 dark:text-blue-300' : 'text-slate-500')}>{method.desc}</p>
              </button>
            );
          })}
        </div>

        {isSpeciesMismatch ? (
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              O preset de especie nao combina com o paciente atual. O allometrico por especie deve ser o padrao preferencial quando nao houver motivo forte para usar outra abordagem.
            </div>
          </div>
        ) : null}

        {config.method === 'manual' ? (
          <div className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex items-center justify-between gap-4">
              <Label className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Taxa manual (mL/kg/dia)</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="20"
                  max="120"
                  value={clampManual(config.manualMlPerKgDay)}
                  onChange={(event) => onChange({ manualMlPerKgDay: clampManual(Number(event.target.value)) })}
                  className="w-28 text-right font-bold text-blue-700 dark:text-blue-400"
                />
                <span className="text-sm text-slate-500">mL/kg/dia</span>
              </div>
            </div>
            <Slider
              value={[clampManual(config.manualMlPerKgDay)]}
              min={20}
              max={120}
              step={1}
              onValueChange={(value) => onChange({ manualMlPerKgDay: clampManual(value[0]) })}
            />
            <p className="text-xs text-slate-500">O slider e o campo numerico ficam sincronizados, com clamp automatico e sem gerar NaN.</p>
          </div>
        ) : null}

        {config.method === 'anesthesia' ? (
          <div className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Taxa inicial em anestesia (mL/kg/h)</Label>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Antes se usava 10 mL/kg/h sem boa base. Hoje a logica e mais conservadora. Nem toda hipotensao anestesica e por falta de volume.
                </p>
              </div>
              <Badge variant="outline" className="border-blue-200 bg-white text-blue-700 dark:border-blue-800 dark:bg-slate-950 dark:text-blue-300">
                default {anesthesiaDefault} mL/kg/h
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                min={2}
                max={anesthesiaMax}
                step="0.1"
                value={config.anesthesiaMlPerKgHour}
                onChange={(event) => onChange({ anesthesiaMlPerKgHour: Math.min(Math.max(Number(event.target.value) || anesthesiaDefault, 2), anesthesiaMax) })}
                className="w-28 text-right font-bold text-blue-700 dark:text-blue-400"
              />
              <span className="text-sm text-slate-500">mL/kg/h</span>
            </div>
            <Slider
              value={[config.anesthesiaMlPerKgHour]}
              min={2}
              max={anesthesiaMax}
              step={0.1}
              onValueChange={(value) => onChange({ anesthesiaMlPerKgHour: value[0] })}
            />
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
              Avaliar profundidade anestesica, temperatura, FC, hemorragia, vasodilatacao, analgesia e necessidade de vasopressor ou inotropico antes de "subir soro" automaticamente.
            </div>
          </div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-4 flex items-center gap-2">
              <Info className="h-4 w-4 text-slate-400" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Guia visual de manutencao</h4>
            </div>
            <div className="space-y-3">
              {maintenanceGuide.map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/40">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-500 to-cyan-600 p-5 text-white shadow-lg shadow-blue-500/10 dark:border-slate-800">
            <div className="flex items-center gap-2 text-blue-100">
              <Clock3 className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Preview da manutencao</span>
            </div>
            <p className="mt-4 text-5xl font-black tracking-tight">{results.mlPerHour.toFixed(1)} <span className="text-2xl font-semibold opacity-80">mL/h</span></p>
            <p className="mt-2 text-sm text-blue-100">{results.mlPerDay.toFixed(0)} mL/dia</p>
            <div className="mt-5 border-t border-white/20 pt-4 text-sm text-blue-50">
              Fluido e droga: a taxa basal precisa ser revista quando o paciente deixa de ser apenas "manutencao".
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
