import { useState } from 'react';
import { Clock, Droplet, Info } from 'lucide-react';
import { dehydrationScale } from '../../data/clinicalContent';
import { RehydrationConfig } from '../../types';
import { ClinicalInfoModal } from '../shared/ClinicalInfoModal';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';

interface Props {
  config: RehydrationConfig;
  onChange: (updates: Partial<RehydrationConfig>) => void;
}

const dehydrationModal = {
  title: 'Grau de desidratação',
  summary: 'Desidratação não é a mesma coisa que hipovolemia. O déficit intersticial costuma ser corrigido de forma sustentada, geralmente em 12 a 24 h em pacientes estáveis.',
  sections: [
    {
      heading: 'Tabela clínica',
      bullets: dehydrationScale.map((item) => `${item.range}: ${item.signs}`),
    },
    {
      heading: 'Cautelas',
      bullets: [
        'Xerostomia pode ocorrer em AKI ou CKD sem verdadeira desidratação.',
        'Peso seriado ajuda muito.',
        'Cerca de 1 kg de variação rápida equivale a aproximadamente 1 L de água corporal.',
      ],
    },
    {
      heading: 'Janelas práticas',
      bullets: [
        'Estável: geralmente corrigir em 12 a 24 h.',
        'Crônico, debilitado ou cardiopata: pode ir para 24 a 48 h.',
        'Reposição em 2 a 4 h existe em cenários renais específicos, mas não é default universal.',
      ],
    },
  ],
};

export function RehydrationCard({ config, onChange }: Props) {
  const [openInfo, setOpenInfo] = useState(false);

  return (
    <>
      <Card className="overflow-hidden border-slate-200 shadow-sm dark:border-slate-800">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4 dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-indigo-100 p-2 dark:bg-indigo-900/30">
                <Droplet className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Reidratação</CardTitle>
                <CardDescription>Correção do déficit do interstício, separada da ressuscitação.</CardDescription>
              </div>
            </div>
            <Switch checked={config.enabled} onCheckedChange={(checked) => onChange({ enabled: checked })} />
          </div>
        </CardHeader>

        {config.enabled ? (
          <CardContent className="space-y-8 p-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Grau de desidratação (%)</Label>
                  <button type="button" onClick={() => setOpenInfo(true)} className="text-slate-400 transition-colors hover:text-indigo-500">
                    <Info className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="15"
                    step="0.5"
                    value={config.dehydrationPercent}
                    onChange={(event) => onChange({ dehydrationPercent: Math.min(Math.max(Number(event.target.value) || 0, 0), 15) })}
                    className="w-24 text-right font-bold text-indigo-700 dark:text-indigo-400"
                  />
                  <span className="text-sm text-slate-500">%</span>
                </div>
              </div>
              <Slider
                value={[config.dehydrationPercent]}
                min={0}
                max={15}
                step={0.5}
                onValueChange={(value) => onChange({ dehydrationPercent: value[0] })}
                className="mt-4"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">Déficit (mL) = peso x % x 10</Badge>
                <Badge variant="outline" className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">Hipovolemia não entra nessa conta</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-slate-500" />
                <Label className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Tempo para correção</Label>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {[
                  { label: 'Estável', desc: '12 a 24 h', value: 24 },
                  { label: 'Conservador', desc: '24 a 48 h', value: 48 },
                  { label: 'Personalizar', desc: 'ajuste manual', value: config.customCorrectionHours || config.correctionHours || 24 },
                ].map((preset, index) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => index < 2 ? onChange({ correctionHours: preset.value, customCorrectionHours: preset.value }) : null}
                    className="rounded-xl border border-slate-200 bg-white p-4 text-left transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
                  >
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{preset.label}</p>
                    <p className="mt-1 text-sm text-slate-500">{preset.desc}</p>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  min="1"
                  max="72"
                  value={config.customCorrectionHours || config.correctionHours}
                  onChange={(event) => {
                    const hours = Math.min(Math.max(Number(event.target.value) || 1, 1), 72);
                    onChange({ correctionHours: hours, customCorrectionHours: hours });
                  }}
                  className="w-28 text-right font-bold text-indigo-700 dark:text-indigo-400"
                />
                <span className="text-sm text-slate-500">horas</span>
              </div>
              <p className="text-sm text-slate-500">
                Se o paciente estiver crônico, debilitado ou cardiopata, considere 24 a 48 h. Cenários renais que exigem reposição mais rápida devem sair para protocolo específico.
              </p>
            </div>
          </CardContent>
        ) : null}
      </Card>

      <ClinicalInfoModal open={openInfo} content={dehydrationModal} onClose={() => setOpenInfo(false)} />
    </>
  );
}
