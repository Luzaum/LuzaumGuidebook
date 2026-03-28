import { useState } from 'react';
import { Brain, AlertTriangle, Droplet, Clock, Info, Activity, Weight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Slider } from '../ui/slider';

export function OsmotherapyPage() {
  const [weightKg, setWeightKg] = useState<number>(10);
  const [agent, setAgent] = useState<'mannitol' | 'hypertonicSaline'>('mannitol');
  const [mannitolDose, setMannitolDose] = useState<number>(0.5); // 0.5 - 1.0 g/kg
  const [salineDose, setSalineDose] = useState<number>(4); // 4-5 ml/kg
  const [mannitolConcentration, setMannitolConcentration] = useState<number>(20); // 20%

  // Calculations
  // Mannitol: dose (g/kg) * weight (kg) = total grams. Volume (ml) = total grams / (concentration% / 100)
  const mannitolGrams = weightKg * mannitolDose;
  const mannitolVolume = (mannitolGrams / mannitolConcentration) * 100;
  
  // Hypertonic Saline: dose (ml/kg) * weight (kg)
  const salineVolume = weightKg * salineDose;

  return (
    <div className="flex flex-col h-full w-full bg-slate-50/50 dark:bg-slate-950/50 overflow-y-auto p-4 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8 w-full">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-500" />
            TCE / Osmoterapia
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Cálculo de agentes osmóticos para redução da pressão intracraniana (PIC) em casos de Traumatismo Cranioencefálico (TCE).
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Configurações */}
          <div className="space-y-6">
            <Card className="border-slate-200/60 dark:border-slate-800/60 shadow-sm bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-indigo-500" />
                  Parâmetros do Paciente e Agente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {agent === 'mannitol' && (
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-rose-800 dark:text-rose-300">CONTRAINDICAÇÃO ABSOLUTA</p>
                      <p className="text-sm text-rose-700 dark:text-rose-400/90 mt-1">
                        NÃO USAR Manitol se o paciente estiver hipovolêmico ou desidratado. Restaure a volemia primeiro. Risco de lesão renal aguda e hipotensão severa.
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Weight className="w-4 h-4 text-slate-400" />
                      Peso Atual (kg)
                    </Label>
                    <div className="relative w-24">
                      <Input
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={Number.isFinite(weightKg) ? weightKg : ''}
                        onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                        className="pr-8 text-right font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-950"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                        kg
                      </span>
                    </div>
                  </div>
                  <Slider
                    value={[Number.isFinite(weightKg) ? weightKg : 0]}
                    min={1}
                    max={80}
                    step={0.5}
                    onValueChange={(vals) => setWeightKg(vals[0])}
                    className="py-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Agente Osmótico</Label>
                  <Select value={agent} onValueChange={(v: any) => setAgent(v)}>
                    <SelectTrigger className="bg-white dark:bg-slate-950">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mannitol">Manitol</SelectItem>
                      <SelectItem value="hypertonicSaline">Salina Hipertônica (7.2% - 7.5%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {agent === 'mannitol' && (
                  <>
                    <div className="space-y-2">
                      <Label>Dose de Manitol (g/kg)</Label>
                      <Select value={mannitolDose.toString()} onValueChange={(v) => setMannitolDose(parseFloat(v))}>
                        <SelectTrigger className="bg-white dark:bg-slate-950">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0.25">0.25 g/kg</SelectItem>
                          <SelectItem value="0.5">0.5 g/kg (Padrão)</SelectItem>
                          <SelectItem value="1.0">1.0 g/kg (Agressivo)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Concentração do Manitol (%)</Label>
                      <Select value={mannitolConcentration.toString()} onValueChange={(v) => setMannitolConcentration(parseFloat(v))}>
                        <SelectTrigger className="bg-white dark:bg-slate-950">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20">20%</SelectItem>
                          <SelectItem value="15">15%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {agent === 'hypertonicSaline' && (
                  <div className="space-y-2">
                    <Label>Dose de Salina Hipertônica (mL/kg)</Label>
                    <Select value={salineDose.toString()} onValueChange={(v) => setSalineDose(parseFloat(v))}>
                      <SelectTrigger className="bg-white dark:bg-slate-950">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 mL/kg (Felinos)</SelectItem>
                        <SelectItem value="4">4 mL/kg (Caninos - Padrão)</SelectItem>
                        <SelectItem value="5">5 mL/kg (Caninos - Máximo)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Alertas */}
            <div className="space-y-4">
              {agent === 'mannitol' && (
                <div className="p-4 rounded-xl border bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-sm">Atenção com Manitol</p>
                      <p className="text-xs opacity-90">Contraindicado em pacientes hipovolêmicos, desidratados ou com hemorragia intracraniana ativa. Pode causar diurese osmótica severa. Administrar ao longo de 15-20 minutos.</p>
                    </div>
                  </div>
                </div>
              )}
              {agent === 'hypertonicSaline' && (
                <div className="p-4 rounded-xl border bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-sm">Salina Hipertônica</p>
                      <p className="text-xs opacity-90">Preferível em pacientes hipovolêmicos com TCE, pois também atua na ressuscitação volêmica. Administrar ao longo de 5-10 minutos. Monitorar natremia.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Resultados */}
          <div className="space-y-6">
            <Card className="border-purple-200/60 dark:border-purple-900/50 shadow-lg bg-purple-50/50 dark:bg-purple-950/20 backdrop-blur-sm overflow-hidden sticky top-6">
              <div className="h-2 w-full bg-gradient-to-r from-purple-500 to-indigo-600" />
              <CardHeader>
                <CardTitle className="text-xl text-purple-900 dark:text-purple-100">Prescrição Osmótica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-purple-100 dark:border-purple-900/50 shadow-sm">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Volume a Administrar</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black text-purple-600 dark:text-purple-500 tracking-tight">
                      {Number.isFinite(agent === 'mannitol' ? mannitolVolume : salineVolume) ? (agent === 'mannitol' ? mannitolVolume.toFixed(1) : salineVolume.toFixed(1)) : '0'}
                    </span>
                    <span className="text-2xl font-bold text-purple-400">mL</span>
                  </div>
                  <Badge variant="outline" className="mt-4 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                    {agent === 'mannitol' ? `Dose: ${mannitolDose} g/kg (${Number.isFinite(mannitolGrams) ? mannitolGrams.toFixed(1) : '0'}g total)` : `Dose: ${salineDose} mL/kg`}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">Tempo</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      {agent === 'mannitol' ? '15-20 min' : '5-10 min'}
                    </span>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                      <Activity className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">Via</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900 dark:text-slate-100">IV Lento</span>
                  </div>
                </div>

                <Separator className="dark:bg-slate-800" />

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Checklist Pós-Osmoterapia</h4>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                      <span>Manter a cabeça elevada a 30 graus.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                      <span>Evitar compressão da veia jugular.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                      <span>Monitorar estado neurológico (Escala de Coma de Glasgow Modificada).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                      <span>Monitorar eletrólitos (especialmente Sódio) e osmolaridade sérica.</span>
                    </li>
                  </ul>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
