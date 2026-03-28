import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import { Info, AlertTriangle, Stethoscope, Activity, Syringe, ClipboardList } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { calculateRER, calculateRefeedingRisk } from '../lib/nutrition';
import { BCS } from '../types';

export default function Hospitalized() {
  const [weight, setWeight] = useState<number>(10);
  const [bcs, setBcs] = useState<BCS>(3);
  const [isAnorexic, setIsAnorexic] = useState<boolean>(true);
  const [daysAnorexic, setDaysAnorexic] = useState<number>(3);
  const [isHyporexic, setIsHyporexic] = useState<boolean>(false);
  const [daysHyporexic, setDaysHyporexic] = useState<number>(0);
  const [recentIntake, setRecentIntake] = useState<number>(0);
  const [electrolytesLow, setElectrolytesLow] = useState<boolean>(true);
  const [feedingRoute, setFeedingRoute] = useState<'oral' | 'tube' | 'parenteral' | 'undefined'>('oral');
  const [progressionProtocol, setProgressionProtocol] = useState<'3_days' | '4_days'>('4_days');

  const rer = calculateRER(weight);
  const risk = calculateRefeedingRisk(daysAnorexic, daysHyporexic, recentIntake, bcs, electrolytesLow);

  const getProgressionPlan = () => {
    if (progressionProtocol === '3_days') {
      return [
        { day: 1, percent: 33, kcal: rer * 0.33 },
        { day: 2, percent: 66, kcal: rer * 0.66 },
        { day: 3, percent: 100, kcal: rer },
      ];
    }
    return [
      { day: 1, percent: 25, kcal: rer * 0.25 },
      { day: 2, percent: 50, kcal: rer * 0.50 },
      { day: 3, percent: 75, kcal: rer * 0.75 },
      { day: 4, percent: 100, kcal: rer },
    ];
  };

  const progressionPlan = getProgressionPlan();

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Stethoscope className="w-8 h-8 text-red-600" />
            Paciente Hospitalizado
          </h1>
          <p className="text-muted-foreground mt-2">Avaliação de risco de síndrome de realimentação e progressão alimentar.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Dados Clínicos
              </CardTitle>
              <CardDescription>Preencha para calcular o risco.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Peso Atual (kg)</Label>
                  <Input type="number" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>ECC / BCS (1-9)</Label>
                  <Input type="number" min={1} max={9} value={bcs} onChange={(e) => setBcs(parseInt(e.target.value) as BCS)} />
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="anorexia" className="font-semibold">Anorexia</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Jejum total ou ingestão quase nula.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Switch id="anorexia" checked={isAnorexic} onCheckedChange={(checked) => {
                    setIsAnorexic(checked);
                    if (checked) setIsHyporexic(false);
                  }} />
                </div>
                {isAnorexic && (
                  <div className="pl-4 border-l-2 border-primary/20 space-y-2">
                    <Label>Dias de Anorexia</Label>
                    <Input type="number" min={0} value={daysAnorexic} onChange={(e) => setDaysAnorexic(parseInt(e.target.value))} />
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="hyporexia" className="font-semibold">Hiporexia</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Ingestão alimentar reduzida.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Switch id="hyporexia" checked={isHyporexic} onCheckedChange={(checked) => {
                    setIsHyporexic(checked);
                    if (checked) setIsAnorexic(false);
                  }} />
                </div>
                {isHyporexic && (
                  <div className="pl-4 border-l-2 border-primary/20 space-y-4">
                    <div className="space-y-2">
                      <Label>Dias de Hiporexia</Label>
                      <Input type="number" min={0} value={daysHyporexic} onChange={(e) => setDaysHyporexic(parseInt(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>% de Ingestão Recente</Label>
                      <Select value={recentIntake.toString()} onValueChange={(v) => setRecentIntake(parseInt(v))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="25">~25% do RER</SelectItem>
                          <SelectItem value="50">~50% do RER</SelectItem>
                          <SelectItem value="75">~75% do RER</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="electrolytes" className="font-semibold">Eletrólitos Baixos (K, P, Mg)?</Label>
                  <Switch id="electrolytes" checked={electrolytesLow} onCheckedChange={setElectrolytesLow} />
                </div>
                <div className="space-y-2">
                  <Label>Via de Alimentação</Label>
                  <Select value={feedingRoute} onValueChange={(v: any) => setFeedingRoute(v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a via" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oral">Oral Voluntária</SelectItem>
                      <SelectItem value="tube">Sonda (Naso, Esofágica, Gástrica)</SelectItem>
                      <SelectItem value="parenteral">Nutrição Parenteral</SelectItem>
                      <SelectItem value="undefined">A Definir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className={risk === 'high' ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : risk === 'moderate' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20' : 'border-green-500 bg-green-50 dark:bg-green-950/20'}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className={`w-5 h-5 ${risk === 'high' ? 'text-red-600' : risk === 'moderate' ? 'text-yellow-600' : 'text-green-600'}`} />
                Risco de Síndrome de Realimentação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black uppercase mb-2 tracking-tight">
                {risk === 'high' ? <span className="text-red-600">ALTO RISCO</span> : risk === 'moderate' ? <span className="text-yellow-600">RISCO MODERADO</span> : <span className="text-green-600">BAIXO RISCO</span>}
              </div>
              <p className="text-sm font-medium opacity-90">
                {risk === 'high' ? 'Paciente com alto risco. Iniciar suporte nutricional com extrema cautela (máx 20-25% do RER no Dia 1). Monitorar eletrólitos rigorosamente.' : 
                 risk === 'moderate' ? 'Paciente com risco moderado. Iniciar com 33-50% do RER e progredir gradualmente.' : 
                 'Paciente sem sinais de risco iminente. Pode iniciar com 50-100% do RER dependendo da tolerância gastrointestinal.'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-primary" />
                  Plano de Progressão
                </CardTitle>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">RER Base</p>
                  <p className="text-xl font-bold text-primary">{rer.toFixed(0)} kcal</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-3">
                <Label>Protocolo de Progressão</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant={progressionProtocol === '3_days' ? 'default' : 'outline'} 
                    onClick={() => setProgressionProtocol('3_days')}
                    className="h-auto py-3"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold">3 Dias</span>
                      <span className="text-xs font-normal opacity-80">33% → 66% → 100%</span>
                    </div>
                  </Button>
                  <Button 
                    variant={progressionProtocol === '4_days' ? 'default' : 'outline'} 
                    onClick={() => setProgressionProtocol('4_days')}
                    className="h-auto py-3"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold">4 Dias</span>
                      <span className="text-xs font-normal opacity-80">25% → 50% → 75% → 100%</span>
                    </div>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {progressionPlan.map((step) => (
                  <div key={step.day} className="flex justify-between items-center p-3 bg-secondary/40 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 text-primary font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">
                        D{step.day}
                      </div>
                      <span className="font-medium text-sm">{step.percent}% do RER</span>
                    </div>
                    <span className="font-bold text-lg text-primary">{step.kcal.toFixed(0)} kcal</span>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border space-y-3">
                <h4 className="font-bold text-sm flex items-center gap-2">
                  <Syringe className="w-4 h-4 text-primary" />
                  Lembretes Clínicos
                </h4>
                <ul className="text-xs space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Considerar suplementação de <strong>Tiamina</strong> antes da realimentação.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Monitorar Fósforo, Potássio e Magnésio nas primeiras 24-72h.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Corrigir déficits hidroeletrolíticos antes e durante a progressão.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Preferir via enteral sempre que o trato GI for viável.</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

