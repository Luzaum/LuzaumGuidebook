import { useMemo, useState } from 'react';
import { AlertTriangle, Brain, Clock, Droplet, Info, Weight } from 'lucide-react';
import { mgcsSections, tcePrinciples } from '../../data/clinicalContent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';

export function OsmotherapyPage() {
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
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <header>
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            <Brain className="h-6 w-6 text-indigo-500" />
            TCE / Osmoterapia
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">TCE pede euvolemia com perfusao adequada, sem excesso. Mannitol e salina hipertônica entram como osmoterapia com monitorizacao e cautelas reais.</p>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <Card className="border-slate-200 shadow-sm dark:border-slate-800">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
                <CardTitle className="text-lg">Principios obrigatorios no TCE</CardTitle>
                <CardDescription>O alvo e perfusao cerebral sustentada sem hiperhidratacao.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 p-6">
                {tcePrinciples.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                    <Brain className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm dark:border-slate-800">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
                <CardTitle className="text-lg">Calculadora de mannitol</CardTitle>
                <CardDescription>Faixa pratica: 0,5 a 1 g/kg IV em 10 a 20 min. AAHA tambem cita 1 g/kg em ate 3 doses q60-90 min no fluxograma de TBI.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    <Weight className="h-4 w-4 text-slate-400" />
                    Peso (kg)
                  </Label>
                  <Input type="number" min="0.1" step="0.1" value={weightKg} onChange={(event) => setWeightKg(Math.max(0, parseFloat(event.target.value) || 0))} className="w-32 text-right font-bold text-indigo-700 dark:text-indigo-400" />
                  <Slider value={[weightKg]} min={0.5} max={80} step={0.1} onValueChange={(value) => setWeightKg(value[0])} />
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
                    <Label>Concentracao</Label>
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
                  <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">Resultado</p>
                  <p className="mt-2 text-3xl font-black text-indigo-700 dark:text-indigo-300">{mannitolVolume.toFixed(1)} mL</p>
                  <p className="mt-1 text-sm text-indigo-800 dark:text-indigo-200">{mannitolGrams.toFixed(2)} g totais em {mannitolMinutes} min</p>
                </div>

                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
                  <p className="font-semibold">Cautelas obrigatorias do mannitol</p>
                  <ul className="mt-2 space-y-2">
                    <li>Pode cristalizar. Se cristalizado, aquecer a solucao a cerca de 37 C e nao puxar nem infundir cristais.</li>
                    <li>Usar microfiltro ou filtro em linha.</li>
                    <li>Monitorar osmolaridade serica se o uso for repetido e manter osmolalidade ate 320 mOsm/L.</li>
                    <li>Evitar ou ter muita cautela em hipovolemia, doenca renal e insuficiencia cardiaca congestiva.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm dark:border-slate-800">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
                <CardTitle className="text-lg">Calculadora de salina hipertônica</CardTitle>
                <CardDescription>Faixas praticas: 7,2% a 4 mL/kg em 15 a 20 min; 3% a 5,4 mL/kg em 15 a 20 min; 7% a 3 a 4 mL/kg em 10 a 15 min aparece no fluxograma de TBI.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Concentracao</Label>
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
                        <SelectItem value="7.2%">7,2%</SelectItem>
                        <SelectItem value="7.5%">7,5%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Dose (mL/kg)</Label>
                    <Input type="number" min="0.1" step="0.1" value={salineDose} onChange={(event) => setSalineDose(Math.max(0, Number(event.target.value) || 0))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Tempo</Label>
                    <Input type="number" min="1" step="1" value={salineMinutes} onChange={(event) => setSalineMinutes(Math.max(1, Number(event.target.value) || 1))} />
                  </div>
                </div>

                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900/50 dark:bg-blue-950/30">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">Resultado</p>
                  <p className="mt-2 text-3xl font-black text-blue-700 dark:text-blue-300">{salineVolume.toFixed(1)} mL</p>
                  <p className="mt-1 text-sm text-blue-800 dark:text-blue-200">{salineConcentration} em {salineMinutes} min</p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
                  <p className="font-semibold">Alertas obrigatorios da hipertônica</p>
                  <ul className="mt-2 space-y-2">
                    <li>Hipernatremia sustentada, hipercloremia e acidose metabolica hipercloremica sao riscos reais.</li>
                    <li>Ter cautela ou evitar em ICC e insuficiencia renal.</li>
                    <li>Nao ha consenso absoluto de superioridade entre hipertônica e mannitol; em hipovolemicos, hipertônica costuma ser preferida em muitos cenarios.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-slate-200 shadow-sm dark:border-slate-800">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
                <CardTitle className="text-lg">Monitorizacao no TCE</CardTitle>
                <CardDescription>Avaliar no inicio e apos intervencoes, geralmente a cada 30 a 60 min.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 p-6">
                {[
                  'Consciencia e tendencia neurologica',
                  'Pupilas / PLR',
                  'Reflexo oculocefalico',
                  'Padrao respiratorio',
                  'Reflexo de Cushing',
                  'PA',
                  'Glicemia',
                  'Eletrólitos',
                  'Gasometria e capnografia se disponiveis',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm dark:border-slate-800">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
                <CardTitle className="text-lg">Modified Glasgow Coma Scale</CardTitle>
                <CardDescription>Soma de 3 a 18. Tendencia seriada importa mais do que medida isolada. Escore 8 se associa a cerca de 50% de sobrevida nas primeiras 48 h em caes.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {mgcsSections.map((section) => (
                  <div key={section.title} className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/50">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{section.title}</p>
                    </div>
                    <div className="divide-y divide-slate-200 dark:divide-slate-800">
                      {section.rows.map(([score, description]) => (
                        <div key={`${section.title}-${score}`} className="grid grid-cols-[64px_1fr] gap-4 bg-white px-4 py-3 text-sm dark:bg-slate-950">
                          <span className="font-black text-indigo-600 dark:text-indigo-400">{score}</span>
                          <span className="text-slate-700 dark:text-slate-300">{description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                <Info className="h-4 w-4 text-indigo-500" />
                Honestidade clinica do modulo
              </div>
              <ul className="mt-3 space-y-2">
                <li>Hipotonicidade e manutencao nao servem para ressuscitar hipovolemico.</li>
                <li>Mannitol nao pode ser reduzido a uma dose sem cautelas de cristalizacao, filtro e monitorizacao.</li>
                <li>NaCl 0,9% pode agravar hipercloremia em certos cenarios; isso precisa entrar no raciocinio global do paciente.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-semibold">Sem consenso absoluto de superioridade</p>
                  <p className="mt-2">Hipertônica e mannitol podem ser ferramentas validas conforme o contexto. O modulo mostra faixas praticas, cautelas e monitorizacao para ajudar o raciocinio, nao para substituir julgamento clinico.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
