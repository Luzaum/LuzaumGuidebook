import { useMemo, useState } from 'react';
import { Activity, AlertTriangle, Cat, Clock, Dog, Info, Weight, Zap } from 'lucide-react';
import { resuscitationPresets } from '../../data/clinicalContent';
import { calculateResuscitation } from '../../lib/engines/calculations';
import { PatientProfile, ResuscitationConfig, Species } from '../../types';
import { ClinicalInfoModal } from '../shared/ClinicalInfoModal';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

const TIME_OPTIONS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

function getPreset(species: Species, presetId: string) {
  return resuscitationPresets.find((preset) => preset.species === species && preset.id === presetId) || resuscitationPresets.find((preset) => preset.species === species)!;
}

export function ResuscitationPage() {
  const [species, setSpecies] = useState<Species>('canine');
  const [weightKg, setWeightKg] = useState(10);
  const [config, setConfig] = useState<ResuscitationConfig>({
    enabled: true,
    mode: 'preset',
    presetId: 'canine-standard',
    aliquotMlKg: 15,
    administrationMinutes: 15,
  });
  const [openPresetId, setOpenPresetId] = useState<string | null>(null);

  const availablePresets = useMemo(() => resuscitationPresets.filter((preset) => preset.species === species), [species]);
  const activePreset = useMemo(() => getPreset(species, config.presetId || availablePresets[0].id), [availablePresets, config.presetId, species]);

  const patient: PatientProfile = {
    species,
    weightKg,
    isObese: false,
    ageGroup: 'adult',
    comorbidities: [],
  };

  const results = calculateResuscitation(patient, config);

  return (
    <>
      <div className="flex h-full w-full flex-col overflow-y-auto bg-slate-50/50 p-4 dark:bg-slate-950/50 lg:p-8">
        <div className="mx-auto w-full space-y-8">
          <header>
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              <Zap className="h-6 w-6 text-rose-500" />
              Ressuscitação volêmica
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Tela independente da calculadora principal. Fluido padrão fixo: Ringer com lactato. Bolus fracionados com reavaliação.
            </p>
          </header>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <Card className="border-slate-200 shadow-sm dark:border-slate-800">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
                  <CardTitle className="text-lg">Parâmetros do bolus</CardTitle>
                  <CardDescription>Hipovolemia e choque pedem alíquotas, não volume de choque inteiro de uma vez.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-900">
                    <button
                      type="button"
                      onClick={() => {
                        setSpecies('canine');
                        const preset = getPreset('canine', 'canine-standard');
                        setConfig((current) => ({ ...current, presetId: preset.id, aliquotMlKg: preset.defaultMlKg }));
                      }}
                      className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${species === 'canine' ? 'bg-white text-rose-600 shadow-sm dark:bg-slate-800 dark:text-rose-400' : 'text-slate-500'}`}
                    >
                      <span className="inline-flex items-center gap-2"><Dog className="h-4 w-4" /> Cão</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSpecies('feline');
                        const preset = getPreset('feline', 'feline-standard');
                        setConfig((current) => ({ ...current, presetId: preset.id, aliquotMlKg: preset.defaultMlKg }));
                      }}
                      className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${species === 'feline' ? 'bg-white text-rose-600 shadow-sm dark:bg-slate-800 dark:text-rose-400' : 'text-slate-500'}`}
                    >
                      <span className="inline-flex items-center gap-2"><Cat className="h-4 w-4" /> Gato</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      <Weight className="h-4 w-4 text-slate-400" />
                      Peso atual (kg)
                    </Label>
                    <Input type="number" min="0.1" step="0.1" value={weightKg} onChange={(event) => setWeightKg(Math.max(0, parseFloat(event.target.value) || 0))} className="w-32 text-right font-bold text-rose-700 dark:text-rose-400" />
                    <Slider value={[weightKg]} min={0.5} max={80} step={0.1} onValueChange={(value) => setWeightKg(value[0])} />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Preset clínico</Label>
                      <Badge variant="outline" className="border-rose-200 bg-white text-rose-700 dark:border-rose-800 dark:bg-slate-950 dark:text-rose-300">
                        RL fixo
                      </Badge>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      {availablePresets.map((preset) => (
                        <div key={preset.id} className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setConfig((current) => ({ ...current, presetId: preset.id, aliquotMlKg: preset.defaultMlKg }))}
                            className={`flex-1 rounded-xl border p-4 text-left transition-all ${config.presetId === preset.id ? 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'}`}
                          >
                            <p className="text-sm font-semibold">{preset.label}</p>
                            <p className="mt-1 text-xs opacity-80">{preset.summary}</p>
                          </button>
                          <button
                            type="button"
                            onClick={() => setOpenPresetId(preset.id)}
                            className="rounded-xl border border-slate-200 px-3 text-slate-500 hover:border-rose-300 hover:text-rose-600 dark:border-slate-800 dark:hover:border-rose-700 dark:hover:text-rose-400"
                          >
                            <Info className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Alíquota de prova de carga (mL/kg)</Label>
                      <span className="text-sm font-bold text-rose-700 dark:text-rose-300">{config.aliquotMlKg.toFixed(1)} mL/kg</span>
                    </div>
                    <Slider
                      value={[config.aliquotMlKg]}
                      min={activePreset.minMlKg}
                      max={activePreset.maxMlKg}
                      step={0.5}
                      onValueChange={(value) => setConfig((current) => ({ ...current, aliquotMlKg: value[0] }))}
                    />
                    <p className="text-sm text-slate-500">
                      Referência didática atual: cães 10 a 20 mL/kg; gatos 5 a 15 mL/kg. A prática moderna usa alíquotas com reavaliação, não choque inteiro de uma vez.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <Label className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Tempo de administração</Label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {TIME_OPTIONS.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setConfig((current) => ({ ...current, administrationMinutes: time }))}
                          className={`rounded-xl border px-3 py-2 text-sm font-medium transition-all ${config.administrationMinutes === time ? 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'}`}
                        >
                          {time} min
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>


            </div>

            <Card className="sticky top-6 overflow-hidden border-rose-200 shadow-lg dark:border-rose-900/50">
              <div className="h-2 w-full bg-gradient-to-r from-rose-500 to-red-600" />
              <CardHeader>
                <CardTitle className="text-xl text-rose-900 dark:text-rose-100">Prescrição do bolus</CardTitle>
                <CardDescription>Reavaliar ao fim de cada alíquota antes de repetir.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-3xl border border-rose-100 bg-white p-6 text-center shadow-sm dark:border-rose-900/50 dark:bg-slate-900">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Volume agora</p>
                  <p className="mt-2 text-6xl font-black tracking-tight text-rose-600 dark:text-rose-500">{results.totalMl.toFixed(0)} <span className="text-2xl font-semibold text-rose-400">mL</span></p>
                  <Badge variant="outline" className="mt-4 border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-300">
                    {config.aliquotMlKg.toFixed(1)} mL/kg em {config.administrationMinutes} min
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">mL/min</p>
                    <p className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-100">{results.mlPerMin.toFixed(1)}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">mL/h na bomba</p>
                    <p className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-100">{results.mlPerHour.toFixed(0)}</p>
                  </div>
                </div>

                <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/50">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Checklist pós-bolus</h4>
                  {[
                    'FC, qualidade de pulso e mucosas/TPC',
                    'PA e mentação',
                    'FR, esforço respiratório e ausculta',
                    'Diurese, temperatura e tendência do lactato',
                    'Parar e repensar quando a resposta não vier ou a sobrecarga aparecer',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <Activity className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm text-blue-800 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-300">
                  Volumes clássicos de choque permanecem como referência didática aproximada: cão 80 a 90 mL/kg, gato 50 a 60 mL/kg. A prática moderna não entrega isso de uma vez.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ClinicalInfoModal
        open={Boolean(openPresetId)}
        content={openPresetId ? {
          title: getPreset(species, openPresetId).label,
          summary: getPreset(species, openPresetId).summary,
          sections: [
            { heading: 'Por que o bolus muda', bullets: getPreset(species, openPresetId).why },
            { heading: 'O que monitorar', bullets: getPreset(species, openPresetId).monitor },
            { heading: 'Quando parar ou escalar', bullets: getPreset(species, openPresetId).stopWhen },
          ],
        } : undefined}
        onClose={() => setOpenPresetId(null)}
      />
    </>
  );
}
