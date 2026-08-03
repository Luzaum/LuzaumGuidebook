import { useMemo, useState } from 'react'
import { Activity, AlertTriangle, ClipboardList, Download, Info, Stethoscope, Syringe } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Slider } from '../components/ui/slider'
import { Switch } from '../components/ui/switch'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip'
import { BCS } from '../types'
import { isNutritionFeatureEnabled } from '../lib/featureFlags'
import {
  assessRefeedingPlan,
  buildEnteralFeedingOrder,
  HOSPITAL_PROTOCOL_V2,
  LEGACY_REFEEDING_PROTOCOL_V1,
} from '../lib/hospital'
import { buildHospitalizedNutritionPdfDoc } from '../lib/pdf/hospitalizedNutritionPdf'

export default function Hospitalized() {
  const [weight, setWeight] = useState<number>(10)
  const [bcs, setBcs] = useState<BCS>(3)
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog')
  const [isAnorexic, setIsAnorexic] = useState<boolean>(true)
  const [daysAnorexic, setDaysAnorexic] = useState<number>(3)
  const [isHyporexic, setIsHyporexic] = useState<boolean>(false)
  const [daysHyporexic, setDaysHyporexic] = useState<number>(0)
  const [recentIntake, setRecentIntake] = useState<number>(0)
  const [electrolytesLow, setElectrolytesLow] = useState<boolean>(true)
  const [feedingRoute, setFeedingRoute] = useState<'oral' | 'tube' | 'parenteral' | 'undefined'>('oral')
  const [progressionProtocol, setProgressionProtocol] = useState<'3_days' | '4_days'>('4_days')
  const [clinicalNotes, setClinicalNotes] = useState('')
  const [foodName, setFoodName] = useState('Fórmula enteral / dieta terapêutica')
  const [energyDensity, setEnergyDensity] = useState<number>(1.2)

  const useHospitalV2 = isNutritionFeatureEnabled('nutrition_hospital_v2')

  const assessment = useMemo(
    () =>
      assessRefeedingPlan(
        {
          species,
          weightKg: weight,
          bcs,
          daysAnorexic: isAnorexic ? daysAnorexic : 0,
          daysHyporexic: isHyporexic ? daysHyporexic : 0,
          recentIntakePercent: isHyporexic ? recentIntake : isAnorexic ? 0 : 100,
          electrolytesLow,
        },
        {
          protocolId: progressionProtocol === '3_days' ? 'legacy_3_days' : 'legacy_4_days',
          useV2: useHospitalV2,
        },
      ),
    [
      bcs,
      daysAnorexic,
      daysHyporexic,
      electrolytesLow,
      isAnorexic,
      isHyporexic,
      progressionProtocol,
      recentIntake,
      species,
      useHospitalV2,
      weight,
    ],
  )

  const feedingOrder = useMemo(() => {
    if (!useHospitalV2 || assessment.progression.length === 0) return null
    const firstDay = assessment.progression[0]
    return buildEnteralFeedingOrder({
      species,
      patientName: 'Paciente hospitalizado',
      diagnosis: clinicalNotes || undefined,
      feedingRoute,
      rer: assessment.rer,
      dailyTargetKcal: firstDay.kcalTarget,
      percentRer: firstDay.percentRer,
      foodName,
      energyDensityKcalPerMl: feedingRoute === 'tube' ? energyDensity : undefined,
      energyDensityKcalPerGram: feedingRoute !== 'tube' ? energyDensity : undefined,
      administrationsPerDay: feedingRoute === 'tube' ? 4 : 3,
      progression: assessment.progression,
      flushVolumeMl: feedingRoute === 'tube' ? 5 : undefined,
    })
  }, [assessment, clinicalNotes, energyDensity, feedingRoute, foodName, species, useHospitalV2])

  const risk = assessment.riskLevel === 'insufficient_data' ? 'moderate' : assessment.riskLevel
  const rer = assessment.rer
  const progressionPlan = assessment.progression

  const RISK_COLORS = {
    high: { card: 'border-red-400 bg-red-50 dark:bg-red-950/20', badge: 'destructive' as const, text: 'ALTO RISCO', textColor: 'text-red-600' },
    moderate: { card: 'border-yellow-400 bg-yellow-50 dark:bg-yellow-950/20', badge: 'secondary' as const, text: 'RISCO MODERADO', textColor: 'text-yellow-600' },
    low: { card: 'border-green-400 bg-green-50 dark:bg-green-950/20', badge: 'outline' as const, text: 'BAIXO RISCO', textColor: 'text-green-600' },
    insufficient_data: { card: 'border-slate-300 bg-slate-50', badge: 'outline' as const, text: 'DADOS INSUFICIENTES', textColor: 'text-slate-600' },
  }
  const rc = RISK_COLORS[risk]

  const handleExportOrder = () => {
    if (!feedingOrder) return
    buildHospitalizedNutritionPdfDoc(feedingOrder, new Date().toISOString()).save(
      `VETIUS_NUTRICAO_INTERNACAO_${Date.now()}.pdf`,
    )
  }

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
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="outline">
            Protocolo: {assessment.protocolVersion === HOSPITAL_PROTOCOL_V2 ? 'Hospital V2' : LEGACY_REFEEDING_PROTOCOL_V1}
          </Badge>
          {useHospitalV2 && <Badge variant="outline">Ordem enteral + PDF disponíveis</Badge>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="w-5 h-5 text-primary" /> Dados Clínicos
              </CardTitle>
              <CardDescription>Preencha para calcular o risco de realimentação.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Espécie</Label>
                <div className="grid grid-cols-2 gap-3">
                  {(['dog', 'cat'] as const).map((sp) => (
                    <button
                      key={sp}
                      type="button"
                      onClick={() => setSpecies(sp)}
                      className={`rounded-xl border-2 py-2 text-sm font-medium transition-all ${species === sp ? 'border-primary bg-primary/10' : 'border-muted hover:bg-muted/20'}`}
                    >
                      {sp === 'dog' ? '🐕 Cão' : '🐈 Gato'}
                    </button>
                  ))}
                </div>
              </div>

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
                  <Switch checked={isAnorexic} onCheckedChange={(v) => { setIsAnorexic(v); if (v) setIsHyporexic(false) }} />
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
                        <TooltipContent><p>Redução significativa na ingestão alimentar.</p></TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Switch checked={isHyporexic} onCheckedChange={(v) => { setIsHyporexic(v); if (v) setIsAnorexic(false) }} />
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

              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <Label className="font-semibold">Eletrólitos baixos (K, P, Mg)?</Label>
                  <Switch checked={electrolytesLow} onCheckedChange={setElectrolytesLow} />
                </div>
                <div className="space-y-2">
                  <Label>Via de Alimentação Possível</Label>
                  <Select value={feedingRoute} onValueChange={(v: typeof feedingRoute) => setFeedingRoute(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oral">Oral Voluntária</SelectItem>
                      <SelectItem value="tube">Sonda (enteral)</SelectItem>
                      <SelectItem value="parenteral">Nutrição Parenteral</SelectItem>
                      <SelectItem value="undefined">A Definir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {useHospitalV2 && (
                <div className="space-y-3 border-t pt-4">
                  <Label>Fórmula / dieta (V2)</Label>
                  <Input value={foodName} onChange={(e) => setFoodName(e.target.value)} />
                  <Label>Densidade energética (kcal/g ou kcal/ml)</Label>
                  <Input type="number" step="0.01" min="0.1" value={energyDensity} onChange={(e) => setEnergyDensity(parseFloat(e.target.value) || 0)} />
                </div>
              )}

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
                  'Preferir via enteral sempre que o TGI estiver funcional.',
                  'Não avançar progressão sem avaliação de tolerância.',
                  'Registrar ingestão realmente administrada.',
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
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
              {assessment.alerts.map((alert) => (
                <p key={alert} className="text-sm text-muted-foreground">{alert}</p>
              ))}
            </CardContent>
          </Card>

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
              <div className="grid grid-cols-2 gap-3">
                {(['3_days', '4_days'] as const).map((protocol) => (
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

              <div className="space-y-2">
                {progressionPlan.map((step) => (
                  <div key={step.day} className="flex items-center justify-between rounded-xl border border-border/50 bg-secondary/30 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-primary-foreground font-bold w-9 h-9 rounded-full flex items-center justify-center text-sm">
                        D{step.day}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{step.percentRer}% do RER</p>
                        {step.requiresToleranceCheck && (
                          <p className="text-xs text-muted-foreground">Exige avaliação de tolerância</p>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-xl text-primary">
                      {step.kcalTarget.toFixed(0)}
                      <span className="text-sm text-muted-foreground font-normal ml-1">kcal</span>
                    </span>
                  </div>
                ))}
              </div>

              {useHospitalV2 && feedingOrder && (
                <div className="rounded-lg border p-4 space-y-2 text-sm">
                  <p className="font-semibold">Ordem enteral (dia 1)</p>
                  <p>{feedingOrder.gramsOrMlPerDay} {feedingRoute === 'tube' ? 'ml' : 'g'}/dia · {feedingOrder.administrationsPerDay} administrações</p>
                  <p className="text-muted-foreground">Horários: {feedingOrder.schedule.join(', ')}</p>
                  <Button size="sm" className="gap-2" onClick={handleExportOrder}>
                    <Download className="h-4 w-4" /> Exportar PDF hospitalar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
