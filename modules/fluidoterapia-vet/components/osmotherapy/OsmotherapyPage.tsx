import { useMemo, useState } from 'react';
import { AlertTriangle, Brain, Clock, Droplet, Info, Weight } from 'lucide-react';
import { mgcsSections, tcePrinciples } from '../../data/clinicalContent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';

interface Props {
  onNavigate: (tab: any) => void;
}

export function OsmotherapyPage({ onNavigate }: Props) {
  const [weightKg, setWeightKg] = useState(10);
  const [mannitolDose, setMannitolDose] = useState(0.5);
  const [mannitolConcentration, setMannitolConcentration] = useState(20);
  const [mannitolMinutes, setMannitolMinutes] = useState(15);
  const [salineConcentration, setSalineConcentration] = useState<'3%' | '7.2%' | '7.5%'>('7.2%');
  const [salineDose, setSalineDose] = useState(4);
  const [salineMinutes, setSalineMinutes] = useState(15);

  const mannitolGrams = useMemo(() => weightKg * mannitolDose, [mannitolDose, weightKg]);
  const mannitolVolume = useMemo(() => (mannitolGrams / mannitolConcentration) * 100, [mannitolConcentration, mannitolGrams]);
  const salineVolume = useMemo(() => weightKg * salineDose, [salineDose, weightKg]);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-slate-50/50 p-4 dark:bg-slate-950/50 lg:p-8">
      <div className="mx-auto w-full space-y-8">
        <header>
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            <Brain className="h-6 w-6 text-indigo-500" />
            TCE / Osmoterapia
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">TCE pede euvolemia com perfusão adequada, sem excesso. Mannitol e salina hipertônica entram como osmoterapia com monitorização e cautelas reais.</p>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          {/* Manitol Calculator */}
          <Card className="border-slate-200 shadow-sm dark:border-slate-800">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
              <CardTitle className="text-lg text-indigo-700 dark:text-indigo-300">Calculadora de mannitol</CardTitle>
              <CardDescription>Faixa prática: 0,5 a 1 g/kg IV em 10 a 20 min.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  <Weight className="h-4 w-4 text-slate-400" />
                  Peso (kg)
                </Label>
                <div className="flex items-center gap-4">
                  <Input type="number" min="0.1" step="0.1" value={weightKg} onChange={(event) => setWeightKg(Math.max(0, parseFloat(event.target.value) || 0))} className="w-32 text-right font-bold text-indigo-700 dark:text-indigo-400" />
                  <Slider value={[weightKg]} min={0.5} max={80} step={0.1} onValueChange={(value) => setWeightKg(value[0])} className="flex-1" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Dose (g/kg)</Label>
                  <Select value={String(mannitolDose)} onValueChange={(value) => setMannitolDose(Number(value))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">0,5 g/kg</SelectItem>
                      <SelectItem value="0.75">0,75 g/kg</SelectItem>
                      <SelectItem value="1">1 g/kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Concentração</Label>
                  <Select value={String(mannitolConcentration)} onValueChange={(value) => setMannitolConcentration(Number(value))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20">20%</SelectItem>
                      <SelectItem value="15">15%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tempo</Label>
                  <Select value={String(mannitolMinutes)} onValueChange={(value) => setMannitolMinutes(Number(value))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 min</SelectItem>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="20">20 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 dark:border-indigo-900/50 dark:bg-indigo-950/30">
                <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">Volume de mannitol</p>
                <p className="mt-2 text-3xl font-black text-indigo-700 dark:text-indigo-300">{mannitolVolume.toFixed(1)} mL</p>
                <p className="mt-1 text-sm text-indigo-800 dark:text-indigo-200">{mannitolGrams.toFixed(2)} g totais em {mannitolMinutes} min</p>
              </div>
            </CardContent>
          </Card>

          {/* Hypertonic Saline Calculator */}
          <Card className="border-slate-200 shadow-sm dark:border-slate-800">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
              <CardTitle className="text-lg text-blue-700 dark:text-blue-300">Calculadora de salina hipertônica</CardTitle>
              <CardDescription>Faixas práticas: 3% a 7,5% (dose 3 a 5,4 mL/kg).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Concentração</Label>
                  <Select
                    value={salineConcentration}
                    onValueChange={(value) => {
                      const concentration = value as typeof salineConcentration;
                      setSalineConcentration(concentration);
                      setSalineDose(concentration === '3%' ? 5.4 : 4);
                      setSalineMinutes(concentration === '7.5%' ? 10 : 15);
                    }}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3%">3%</SelectItem>
                      <SelectItem value="7,2%">7,2%</SelectItem>
                      <SelectItem value="7,5%">7,5%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Dose (mL/kg)</Label>
                  <Input type="number" min="0.1" step="0.1" value={salineDose} onChange={(event) => setSalineDose(Math.max(0, Number(event.target.value) || 0))} className="font-bold text-blue-700 dark:text-blue-300" />
                </div>
                <div className="space-y-2">
                  <Label>Tempo (min)</Label>
                  <Input type="number" min="1" step="1" value={salineMinutes} onChange={(event) => setSalineMinutes(Math.max(1, Number(event.target.value) || 1))} className="font-bold text-blue-700 dark:text-blue-300" />
                </div>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900/50 dark:bg-blue-950/30">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">Volume de salina</p>
                <p className="mt-2 text-3xl font-black text-blue-700 dark:text-blue-300">{salineVolume.toFixed(1)} mL</p>
                <p className="mt-1 text-sm text-blue-800 dark:text-blue-200">{salineConcentration} em {salineMinutes} min</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Dilutions Navigation Section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Droplet className="h-5 w-5 text-teal-500" />
                Precisa montar concentrações específicas?
              </h3>
              <p className="text-sm text-slate-500">Para preparar soluções hipertônicas personalizadas (ex: NaCl 3% ou 7,5% a partir de estoque), use o módulo de diluições.</p>
            </div>
            <button
              onClick={() => onNavigate('dilutions')}
              className="group flex items-center gap-2 rounded-xl bg-teal-500 px-6 py-3 font-semibold text-white transition-all hover:bg-teal-600 active:scale-95 shadow-md shadow-teal-500/20"
            >
              Ir para Diluições e Soluções
              <Info className="h-4 w-4 transition-transform group-hover:rotate-12" />
            </button>
          </div>
        </section>

        {/* Glasgow Coma Scale Section */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Modified Glasgow Coma Scale (MGCS)</h3>
            <p className="text-sm text-slate-500">Soma de 3 a 18. Tendência seriada importa mais do que medida isolada. Escore 8 se associa a cerca de 50% de sobrevida nas primeiras 48 h em cães.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {mgcsSections.map((section) => (
              <Card key={section.title} className="overflow-hidden border-slate-200 shadow-sm dark:border-slate-800">
                <CardHeader className="bg-slate-50/50 py-4 dark:bg-slate-900/50">
                  <CardTitle className="text-base text-indigo-700 dark:text-indigo-300">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {section.rows.map(([score, description]) => (
                      <div key={`${section.title}-${score}`} className="grid grid-cols-[32px_1fr] gap-3 px-4 py-3 text-sm">
                        <span className="font-black text-indigo-600 dark:text-indigo-400">{score}</span>
                        <span className="text-slate-600 dark:text-slate-400">{description}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Principles and Monitoring at the Bottom */}
        <section className="grid gap-6 lg:grid-cols-[1fr_auto]">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <Card className="border-slate-200 shadow-sm dark:border-slate-800">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
                <CardTitle className="text-lg">Princípios obrigatórios no TCE</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-6">
                {tcePrinciples.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/30 p-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/20 dark:text-slate-300">
                    <Brain className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm dark:border-slate-800">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
                <CardTitle className="text-lg">Monitorização no TCE</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-x-6 gap-y-2 p-6 md:grid-cols-2">
                {[
                  'Consciência/Tendência',
                  'Pupilas / PLR',
                  'Frec. Resp. e esforço',
                  'Reflexo oculocefálico',
                  'Reflexo de Cushing',
                  'PA e Perfusão',
                  'Glicemia',
                  'Eletrólitos',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Clock className="h-3.5 w-3.5 text-indigo-500" />
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="w-full lg:w-80 space-y-6">
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
              <div className="flex items-start gap-3 text-rose-600 dark:text-rose-400">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                <p className="font-bold uppercase tracking-wider">Atenção</p>
              </div>
              <p className="mt-3 leading-relaxed">Piora neurológica aguda ou reflexo de Cushing (Bradicardia + Hipertensão) são emergências extremas. Hipertônica ou mannitol conforme contexto.</p>
            </div>
            
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/50">
              <p>Hipertônica e mannitol podem ser ferramentas válidas conforme o contexto. O módulo mostra faixas práticas para ajudar o raciocínio clínico.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
