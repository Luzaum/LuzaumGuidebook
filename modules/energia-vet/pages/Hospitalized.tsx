import { useState } from 'react';
import { Activity, AlertTriangle, ClipboardList, Info, Stethoscope, Syringe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { calculateRER, calculateRefeedingRisk, getProgressionPlan3Days, getProgressionPlan4Days } from '../lib/nutrition';
import { BCS } from '../types';

export default function Hospitalized() {
  const [weight, setWeight] = useState<number>(10);
  const [bcs, setBcs] = useState<BCS>(3);
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog');
  const [isAnorexic, setIsAnorexic] = useState<boolean>(true);
  const [daysAnorexic, setDaysAnorexic] = useState<number>(3);
  const [isHyporexic, setIsHyporexic] = useState<boolean>(false);
  const [daysHyporexic, setDaysHyporexic] = useState<number>(0);
  const [recentIntake, setRecentIntake] = useState<number>(0);
  const [electrolytesLow, setElectrolytesLow] = useState<boolean>(true);
  const [feedingRoute, setFeedingRoute] = useState<'oral' | 'tube' | 'parenteral' | 'undefined'>('oral');
  const [progressionProtocol, setProgressionProtocol] = useState<'3_days' | '4_days'>('4_days');
  const [clinicalNotes, setClinicalNotes] = useState('');

  const rer = calculateRER(weight, species);
  const risk = calculateRefeedingRisk(daysAnorexic, daysHyporexic, recentIntake, bcs, electrolytesLow);

  const progressionPlan = progressionProtocol === '3_days'
    ? getProgressionPlan3Days(rer)
    : getProgressionPlan4Days(rer);

  const RISK_COLORS = {
    high: { card: 'border-red-400 bg-red-50 dark:bg-red-950/20', badge: 'destructive' as const, text: 'ALTO RISCO', textColor: 'text-red-600' },
    moderate: { card: 'border-yellow-400 bg-yellow-50 dark:bg-yellow-950/20', badge: 'secondary' as const, text: 'RISCO MODERADO', textColor: 'text-yellow-600' },
    low: { card: 'border-green-400 bg-green-50 dark:bg-green-950/20', badge: 'outline' as const, text: 'BAIXO RISCO', textColor: 'text-green-600' },
  };
  const rc = RISK_COLORS[risk];

  return (
    <div className="space-y-8 w-full pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Stethoscope className="w-8 h-8 text-red-500" />
          Paciente Hospitalizado
        </h1>
        <p className="text-muted-foreground mt-2">
          Avaliação de risco de síndrome de realimentação e protocolo de progressão alimentar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT — CLINICAL DATA */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="w-5 h-5 text-primary" /> Dados Clínicos
              </CardTitle>
              <CardDescription>Preencha para calcular o risco de realimentação.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Species */}
              <div className="space-y-2">
                <Label>Espécie</Label>
                <div className="grid grid-cols-2 gap-3">
                  {(['dog', 'cat'] as const).map(sp => (
                    <button
                      key={sp}
                      onClick={() => setSpecies(sp)}
                      className={`rounded-xl border-2 py-2 text-sm font-medium transition-all
                        ${species === sp ? 'border-primary bg-primary/10' : 'border-muted hover:bg-muted/20'}`}
                    >
                      {sp === 'dog' ? '🐕 Cão' : '🐈 Gato'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight + BCS */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Peso Atual (kg)</Label>
                  <Input type="number" step="0.1" min="0.1" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value) || 0)} />
                </div>
                <div className="space-y-2">
                  <Label>ECC / BCS (1–9)</Label>
                  <div className="flex items-center gap-3 mt-1">
                    <Slider value={[bcs]} min={1} max={9} step={1} onValueChange={(v) => setBcs(v[0] as BCS)} className="flex-1" />
                    <span className="font-bold w-8 text-center">{bcs}/9</span>
                  </div>
                </div>
              </div>

              {/* Anorexia */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label className="font-semibold">Anorexia?</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger><Info className="w-4 h-4 text-muted-foreground cursor-help" /></TooltipTrigger>
                        <TooltipContent><p>Jejum total ou ingestão próxima de zero.</p></TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Switch checked={isAnorexic} onCheckedChange={(v) => { setIsAnorexic(v); if (v) setIsHyporexic(false); }} />
                </div>
                {isAnorexic && (
                  <div className="pl-4 border-l-2 border-red-300 space-y-2">
                    <Label className="text-sm">Há quantos dias?</Label>
                    <Input type="number" min={0} value={daysAnorexic} onChange={(e) => setDaysAnorexic(parseInt(e.target.value) || 0)} />
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <Label className="font-semibold">Hiporexia?</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger><Info className="w-4 h-4 text-muted-foreground cursor-help" /></TooltipTrigger>
                        <TooltipContent><p>Redução significativa na ingestão alimentar (paciente come, mas pouco).</p></TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Switch checked={isHyporexic} onCheckedChange={(v) => { setIsHyporexic(v); if (v) setIsAnorexic(false); }} />
                </div>
                {isHyporexic && (
                  <div className="pl-4 border-l-2 border-yellow-300 space-y-3">
                    <div className="space-y-1">
                      <Label className="text-sm">Há quantos dias?</Label>
                      <Input type="number" min={0} value={daysHyporexic} onChange={(e) => setDaysHyporexic(parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm">% de ingestão recente estimada</Label>
                      <Select value={recentIntake.toString()} onValueChange={(v) => setRecentIntake(parseInt(v))}>
                        <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">~10% do necessário</SelectItem>
                          <SelectItem value="25">~25% do necessário</SelectItem>
                          <SelectItem value="50">~50% do necessário</SelectItem>
                          <SelectItem value="75">~75% do necessário</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              {/* Electrolytes + Route */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <Label className="font-semibold">Eletrólitos baixos (K, P, Mg)?</Label>
                  <Switch checked={electrolytesLow} onCheckedChange={setElectrolytesLow} />
                </div>
                <div className="space-y-2">
                  <Label>Via de Alimentação Possível</Label>
                  <Select value={feedingRoute} onValueChange={(v: any) => setFeedingRoute(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oral">Oral Voluntária</SelectItem>
                      <SelectItem value="tube">Sonda (nasoesofágica, esofágica, gástrica)</SelectItem>
                      <SelectItem value="parenteral">Nutrição Parenteral</SelectItem>
                      <SelectItem value="undefined">A Definir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Clinical notes */}
              <div className="space-y-2 border-t pt-4">
                <Label>Observações Clínicas</Label>
                <textarea
                  className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm min-h-[70px] focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y"
                  placeholder="Diagnóstico, condições especiais, comorbidades…"
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Clinical reminders */}
          <Card className="bg-muted/30 border-dashed border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Syringe className="w-4 h-4 text-primary" /> Lembretes Clínicos Obrigatórios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs space-y-2 text-muted-foreground">
                {[
                  'Suplementar Tiamina (B1) antes de iniciar a realimentação.',
                  'Monitorar Fósforo, Potássio e Magnésio séricos nas primeiras 24–72h.',
                  'A síndrome de realimentação pode causar colapso cardiovascular e neurológico fatal.',
                  'Preferir via enteral sempre que o TGI estiver funcional.',
                  'Corrigir desidratação e distúrbios eletrolíticos antes de iniciar suporte nutricional.',
                  'Pesagem e avaliação do ECC diariamente durante a hospitalização.',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT — RISK + PROGRESSION */}
        <div className="space-y-6">
          {/* Risk card */}
          <Card className={`border-2 ${rc.card}`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertTriangle className={`w-5 h-5 ${rc.textColor}`} />
                Risco de Síndrome de Realimentação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge variant={rc.badge} className="text-base px-4 py-1 uppercase font-black">
                {rc.text}
              </Badge>
              <p className={`text-sm font-medium ${rc.textColor}`}>
                {risk === 'high'
                  ? 'Paciente de alto risco. Iniciar com máximo 20–25% do RER no Dia 1. Monitorar eletrólitos a cada 12–24h. Considerar UTI.'
                  : risk === 'moderate'
                  ? 'Risco moderado. Iniciar com 33–50% do RER. Progredir gradualmente a cada 24h. Monitorar eletrólitos diariamente.'
                  : 'Baixo risco aparente. Pode iniciar com 50–100% do RER conforme tolerância gastrointestinal. Monitorar evolução.'}
              </p>

              {/* Risk factors summary */}
              <div className="rounded-lg bg-card border border-border/50 p-3 text-xs space-y-1">
                <p className="font-semibold text-foreground mb-1">Fatores avaliados:</p>
                {isAnorexic && <p>• Anorexia há <strong>{daysAnorexic} dia(s)</strong></p>}
                {isHyporexic && <p>• Hiporexia há <strong>{daysHyporexic} dia(s)</strong> ({recentIntake}% ingestão)</p>}
                {electrolytesLow && <p>• Eletrólitos baixos (K/P/Mg)</p>}
                <p>• ECC: <strong>{bcs}/9</strong></p>
                {!isAnorexic && !isHyporexic && !electrolytesLow && <p className="text-muted-foreground">Sem fatores de alto risco identificados.</p>}
              </div>
            </CardContent>
          </Card>

          {/* Progression plan */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <ClipboardList className="w-5 h-5 text-primary" /> Plano de Progressão Alimentar
                </CardTitle>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">RER Base</p>
                  <p className="text-xl font-bold text-primary">{rer.toFixed(0)} kcal</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Protocol selector */}
              <div className="grid grid-cols-2 gap-3">
                {(['3_days', '4_days'] as const).map(protocol => (
                  <Button
                    key={protocol}
                    variant={progressionProtocol === protocol ? 'default' : 'outline'}
                    onClick={() => setProgressionProtocol(protocol)}
                    className="h-auto py-3 flex flex-col gap-1"
                  >
                    <span className="font-bold">{protocol === '3_days' ? '3 dias' : '4 dias'}</span>
                    <span className="text-xs font-normal opacity-80">
                      {protocol === '3_days' ? '33% → 66% → 100%' : '25% → 50% → 75% → 100%'}
                    </span>
                  </Button>
                ))}
              </div>

              {/* Progression table */}
              <div className="space-y-2">
                {progressionPlan.map((step) => (
                  <div
                    key={step.day}
                    className="flex items-center justify-between rounded-xl border border-border/50 bg-secondary/30 px-4 py-3 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-primary-foreground font-bold w-9 h-9 rounded-full flex items-center justify-center text-sm shadow-sm">
                        D{step.day}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{step.percent}% do RER</p>
                        <p className="text-xs text-muted-foreground">{step.day === 1 ? 'Início cuidadoso' : step.percent === 100 ? 'Meta completa' : 'Progressão'}</p>
                      </div>
                    </div>
                    <span className="font-bold text-xl text-primary">{step.kcal.toFixed(0)}<span className="text-sm text-muted-foreground font-normal ml-1">kcal</span></span>
                  </div>
                ))}
              </div>

              {/* Monitoring reminders based on risk */}
              {risk !== 'low' && (
                <div className={`rounded-lg border p-3 text-xs space-y-1 ${risk === 'high' ? 'border-red-300 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300' : 'border-yellow-300 bg-yellow-50 dark:bg-yellow-950/20 text-yellow-800 dark:text-yellow-300'}`}>
                  <p className="font-semibold">Monitorização obrigatória:</p>
                  <p>• Fósforo sérico a cada 12–24h nas primeiras 72h</p>
                  <p>• Potássio e magnésio séricos diariamente</p>
                  {risk === 'high' && <p>• Considerar suplementação IV de P, K, Mg antes de iniciar</p>}
                  <p>• Sinais clínicos de síndrome de realimentação: fraqueza, arritmia, hemólise, convulsão</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
