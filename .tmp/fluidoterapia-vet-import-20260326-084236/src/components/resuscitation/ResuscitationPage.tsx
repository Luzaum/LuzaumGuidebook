import { useState } from 'react';
import { Zap, AlertTriangle, Droplet, Clock, Info, Activity, Dog, Cat, Weight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Slider } from '../ui/slider';

export function ResuscitationPage() {
  const [species, setSpecies] = useState<'canine' | 'feline'>('canine');
  const [weightKg, setWeightKg] = useState<number>(10);
  const [fluidType, setFluidType] = useState<'isotonic' | 'hypertonic' | 'colloid'>('isotonic');
  const [bolusFraction, setBolusFraction] = useState<'1/4' | '1/3' | 'full'>('1/4');
  const [administrationTime, setAdministrationTime] = useState<number>(15);

  // Shock dose guidelines (ml/kg)
  const shockDoses = {
    canine: {
      isotonic: 90,
      hypertonic: 4, // 4-5 ml/kg
      colloid: 20, // 20 ml/kg max daily
    },
    feline: {
      isotonic: 60,
      hypertonic: 2, // 2-4 ml/kg
      colloid: 10, // 10-20 ml/kg max daily
    }
  };

  const currentShockDose = shockDoses[species][fluidType];
  const fractionMultiplier = bolusFraction === '1/4' ? 0.25 : bolusFraction === '1/3' ? 0.3333 : 1;
  
  const bolusVolume = weightKg * currentShockDose * fractionMultiplier;
  const rateMlPerHour = (bolusVolume / administrationTime) * 60;

  const getFractionLabel = (fraction: '1/4' | '1/3' | 'full') => {
    if (fluidType !== 'isotonic') {
      return fraction === '1/4' ? '1/4 da dose' : fraction === '1/3' ? '1/3 da dose' : 'Dose Cheia';
    }
    const baseDose = species === 'canine' ? 90 : 60;
    if (fraction === '1/4') return `1/4 da dose (${(baseDose * 0.25).toFixed(1)} ml/kg)`;
    if (fraction === '1/3') return `1/3 da dose (${(baseDose * 0.3333).toFixed(1)} ml/kg)`;
    return `Dose Cheia (${baseDose} ml/kg)`;
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50/50 dark:bg-slate-950/50 overflow-y-auto p-4 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8 w-full">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <Zap className="w-6 h-6 text-rose-500" />
            Ressuscitação Volêmica (Choque)
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Cálculo de bolus para tratamento de choque hipovolêmico ou distributivo.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Configurações */}
          <div className="space-y-6">
            <Card className="border-slate-200/60 dark:border-slate-800/60 shadow-sm bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-indigo-500" />
                  Parâmetros do Bolus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-slate-400" />
                    Espécie
                  </Label>
                  <div className="flex bg-slate-100 dark:bg-slate-900 rounded-xl p-1">
                    <button
                      onClick={() => setSpecies('canine')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                        species === 'canine'
                          ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                          : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                      }`}
                    >
                      <Dog className="w-4 h-4" />
                      Cão (90 ml/kg)
                    </button>
                    <button
                      onClick={() => setSpecies('feline')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                        species === 'feline'
                          ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                          : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                      }`}
                    >
                      <Cat className="w-4 h-4" />
                      Gato (60 ml/kg)
                    </button>
                  </div>
                </div>

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
                  <Label>Tipo de Fluido</Label>
                  <Select value={fluidType} onValueChange={(v: any) => setFluidType(v)}>
                    <SelectTrigger className="bg-white dark:bg-slate-950">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="isotonic">Cristaloide Isotônico (ex: Ringer Lactato)</SelectItem>
                      <SelectItem value="hypertonic">Salina Hipertônica (7.2% - 7.5%)</SelectItem>
                      <SelectItem value="colloid">Coloide Sintético (ex: Voluven)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Fração da Dose de Choque
                  </Label>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => setBolusFraction('1/4')}
                      className={`px-4 py-3 text-sm font-medium rounded-xl border transition-all text-left flex justify-between items-center ${
                        bolusFraction === '1/4'
                          ? 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-400'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-rose-200 hover:bg-rose-50/50 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400'
                      }`}
                    >
                      <span>{getFractionLabel('1/4')}</span>
                      {bolusFraction === '1/4' && <Badge variant="secondary" className="bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300">Recomendado</Badge>}
                    </button>
                    <button
                      onClick={() => setBolusFraction('1/3')}
                      className={`px-4 py-3 text-sm font-medium rounded-xl border transition-all text-left flex justify-between items-center ${
                        bolusFraction === '1/3'
                          ? 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-400'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-rose-200 hover:bg-rose-50/50 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400'
                      }`}
                    >
                      <span>{getFractionLabel('1/3')}</span>
                    </button>
                    <button
                      onClick={() => setBolusFraction('full')}
                      className={`px-4 py-3 text-sm font-medium rounded-xl border transition-all text-left flex justify-between items-center ${
                        bolusFraction === 'full'
                          ? 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-400'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-rose-200 hover:bg-rose-50/50 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400'
                      }`}
                    >
                      <span>{getFractionLabel('full')}</span>
                      {bolusFraction === 'full' && <Badge variant="secondary" className="bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300">Agressivo</Badge>}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tempo de Administração</Label>
                  <Select value={administrationTime.toString()} onValueChange={(v) => setAdministrationTime(parseInt(v))}>
                    <SelectTrigger className="bg-white dark:bg-slate-950">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutos (Push)</SelectItem>
                      <SelectItem value="10">10 minutos</SelectItem>
                      <SelectItem value="15">15 minutos (Padrão)</SelectItem>
                      <SelectItem value="20">20 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Alertas */}
            <div className="space-y-4">
              {species === 'feline' && (
                <div className="p-4 rounded-xl border bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-sm">Atenção com Gatos</p>
                      <p className="text-xs opacity-90">Gatos são extremamente sensíveis à sobrecarga volêmica. Reavalie cuidadosamente após cada bolus de 5-10 ml/kg.</p>
                    </div>
                  </div>
                </div>
              )}
              {fluidType === 'hypertonic' && (
                <div className="p-4 rounded-xl border bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-sm">Salina Hipertônica</p>
                      <p className="text-xs opacity-90">Contraindicada em desidratação severa ou hipernatremia. O efeito expansor dura cerca de 30-60 minutos. Siga com cristaloides isotônicos.</p>
                    </div>
                  </div>
                </div>
              )}
              {fluidType === 'colloid' && (
                <div className="p-4 rounded-xl border bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-sm">Coloides Sintéticos</p>
                      <p className="text-xs opacity-90">Risco de lesão renal aguda (AKI) e coagulopatias. Use com cautela e não exceda a dose diária máxima (20 ml/kg/dia).</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Resultados */}
          <div className="space-y-6">
            <Card className="border-rose-200/60 dark:border-rose-900/50 shadow-lg bg-rose-50/50 dark:bg-rose-950/20 backdrop-blur-sm overflow-hidden sticky top-6">
              <div className="h-2 w-full bg-gradient-to-r from-rose-500 to-red-600" />
              <CardHeader>
                <CardTitle className="text-xl text-rose-900 dark:text-rose-100">Prescrição do Bolus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-rose-100 dark:border-rose-900/50 shadow-sm">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Volume a Administrar AGORA</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black text-rose-600 dark:text-rose-500 tracking-tight">
                      {Number.isFinite(bolusVolume) ? bolusVolume.toFixed(0) : '0'}
                    </span>
                    <span className="text-2xl font-bold text-rose-400">mL</span>
                  </div>
                  <Badge variant="outline" className="mt-4 bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800">
                    Dose total de choque: {currentShockDose} mL/kg
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">Tempo</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900 dark:text-slate-100">{administrationTime} min</span>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                      <Activity className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">Taxa na Bomba</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900 dark:text-slate-100">{Number.isFinite(rateMlPerHour) ? rateMlPerHour.toFixed(0) : '0'} mL/h</span>
                  </div>
                </div>

                <Separator className="dark:bg-slate-800" />

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Checklist Pós-Bolus</h4>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>Reavaliar Frequência Cardíaca e Qualidade de Pulso</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>Reavaliar Tempo de Preenchimento Capilar (TPC) e Cor de Mucosa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>Mensurar Pressão Arterial (se disponível)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>Auscultar pulmões para sinais de sobrecarga (crepitações)</span>
                    </li>
                  </ul>
                  <p className="text-xs font-medium text-rose-600 dark:text-rose-400 mt-4">
                    Se os parâmetros não melhorarem, considere repetir o bolus ou iniciar suporte vasopressor.
                  </p>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
