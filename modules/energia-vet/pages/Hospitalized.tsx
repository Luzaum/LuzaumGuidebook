import { useMemo, useState } from 'react'
import { AlertTriangle, Cat, ClipboardList, Dog, Download, ShieldAlert, Stethoscope, Syringe } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { LocalizedNumberInput } from '../components/ui/localized-number-input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Slider } from '../components/ui/slider'
import { Switch } from '../components/ui/switch'
import { Button } from '../components/ui/button'
import { cn } from '../lib/utils'
import { BCS } from '../types'
import { isNutritionFeatureEnabled } from '../lib/featureFlags'
import { assessRefeedingPlan, buildEnteralFeedingOrder } from '../lib/hospital'
import { buildHospitalizedNutritionPdfDoc } from '../lib/pdf/hospitalizedNutritionPdf'

export default function Hospitalized() {
  const [weight, setWeight] = useState(10)
  const [bcs, setBcs] = useState<BCS>(3)
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog')
  const [isAnorexic, setIsAnorexic] = useState(true)
  const [daysAnorexic, setDaysAnorexic] = useState(3)
  const [isHyporexic, setIsHyporexic] = useState(false)
  const [daysHyporexic, setDaysHyporexic] = useState(0)
  const [recentIntake, setRecentIntake] = useState(0)
  const [electrolytesLow, setElectrolytesLow] = useState(true)
  const [feedingRoute, setFeedingRoute] = useState<'oral' | 'tube' | 'parenteral' | 'undefined'>('oral')
  const [progressionProtocol, setProgressionProtocol] = useState<'3_days' | '4_days'>('4_days')
  const [clinicalNotes, setClinicalNotes] = useState('')
  const [foodName, setFoodName] = useState('Fórmula enteral / dieta terapêutica')
  const [energyDensity, setEnergyDensity] = useState(1.2)

  const useHospitalV2 = isNutritionFeatureEnabled('nutrition_hospital_v2')
  const assessment = useMemo(() => assessRefeedingPlan(
    {
      species,
      weightKg: weight,
      bcs,
      daysAnorexic: isAnorexic ? daysAnorexic : 0,
      daysHyporexic: isHyporexic ? daysHyporexic : 0,
      recentIntakePercent: isHyporexic ? recentIntake : isAnorexic ? 0 : 100,
      electrolytesLow,
    },
    { protocolId: progressionProtocol === '3_days' ? 'legacy_3_days' : 'legacy_4_days', useV2: useHospitalV2 },
  ), [bcs, daysAnorexic, daysHyporexic, electrolytesLow, isAnorexic, isHyporexic, progressionProtocol, recentIntake, species, useHospitalV2, weight])

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
  const riskView = {
    high: { label: 'Alto risco', panel: 'border-red-200 bg-red-50/70 dark:border-red-400/25 dark:bg-red-500/10', text: 'text-red-700 dark:text-red-200' },
    moderate: { label: 'Risco moderado', panel: 'border-amber-200 bg-amber-50/70 dark:border-amber-400/25 dark:bg-amber-500/10', text: 'text-amber-700 dark:text-amber-200' },
    low: { label: 'Baixo risco', panel: 'border-emerald-200 bg-emerald-50/70 dark:border-emerald-400/25 dark:bg-emerald-500/10', text: 'text-emerald-700 dark:text-emerald-200' },
  }[risk]

  const handleExportOrder = () => {
    if (!feedingOrder) return
    buildHospitalizedNutritionPdfDoc(feedingOrder, new Date().toISOString()).save(`VETIUS_NUTRICAO_INTERNACAO_${Date.now()}.pdf`)
  }

  return (
    <div className="nutrition-page w-full space-y-6 pb-16">
      <header className="nutrition-page-header">
        <div><p className="nutrition-eyebrow">Terapia nutricional</p><h1>Paciente hospitalizado</h1><p>Avalie risco de síndrome de realimentação e construa uma progressão alimentar segura.</p></div>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="nutrition-header-stat"><span>RER calculado</span><strong>{assessment.rer.toFixed(0)} kcal</strong></div>
        <div className="nutrition-header-stat"><span>Risco atual</span><strong className={riskView.text}>{riskView.label}</strong></div>
        <div className="nutrition-header-stat"><span>Progressão</span><strong>{progressionProtocol === '3_days' ? '3 dias' : '4 dias'}</strong></div>
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
        <Card className="gap-0 py-0">
          <CardHeader className="border-b border-border p-5 lg:p-6"><CardTitle className="flex items-center gap-2"><Stethoscope className="h-5 w-5 text-primary" /> Avaliação clínica</CardTitle><CardDescription>Os resultados são atualizados conforme os dados informados.</CardDescription></CardHeader>
          <CardContent className="space-y-6 p-5 lg:p-6">
            <section>
              <Label>Espécie</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {([{ id: 'dog' as const, label: 'Cão', icon: Dog }, { id: 'cat' as const, label: 'Gato', icon: Cat }]).map((item) => {
                  const Icon = item.icon
                  return <button key={item.id} type="button" aria-pressed={species === item.id} onClick={() => setSpecies(item.id)} className={cn('flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border text-sm font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/25', species === item.id ? 'border-primary/45 bg-primary/[0.08] text-primary' : 'border-border bg-card text-muted-foreground hover:bg-muted')}><Icon className="h-5 w-5" /> {item.label}</button>
                })}
              </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label htmlFor="hospital-weight">Peso atual (kg)</Label><LocalizedNumberInput id="hospital-weight" min={0.1} value={weight} onValueChange={(value) => setWeight(value ?? 0)} /></div>
              <div className="space-y-2"><div className="flex items-center justify-between"><Label>ECC</Label><span className="text-sm font-semibold text-primary">{bcs}/9</span></div><div className="flex min-h-11 items-center rounded-xl bg-muted px-3"><Slider aria-label="Escore corporal" value={[bcs]} min={1} max={9} step={1} onValueChange={(value) => setBcs(value[0] as BCS)} /></div></div>
            </section>

            <section className="space-y-3 rounded-2xl bg-muted/55 p-4">
              <div className="flex min-h-11 items-center justify-between gap-4"><div><Label className="font-semibold">Anorexia</Label><p className="mt-0.5 text-xs text-muted-foreground">Jejum total ou ingestão próxima de zero</p></div><Switch checked={isAnorexic} onCheckedChange={(value) => { setIsAnorexic(value); if (value) setIsHyporexic(false) }} /></div>
              {isAnorexic && <div className="space-y-2"><Label htmlFor="anorexia-days">Duração em dias</Label><LocalizedNumberInput id="anorexia-days" integer min={0} value={daysAnorexic} onValueChange={(value) => setDaysAnorexic(value ?? 0)} /></div>}
              <div className="h-px bg-border" />
              <div className="flex min-h-11 items-center justify-between gap-4"><div><Label className="font-semibold">Hiporexia</Label><p className="mt-0.5 text-xs text-muted-foreground">Ingestão significativamente reduzida</p></div><Switch checked={isHyporexic} onCheckedChange={(value) => { setIsHyporexic(value); if (value) setIsAnorexic(false) }} /></div>
              {isHyporexic && <div className="grid gap-3 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="hyporexia-days">Duração em dias</Label><LocalizedNumberInput id="hyporexia-days" integer min={0} value={daysHyporexic} onValueChange={(value) => setDaysHyporexic(value ?? 0)} /></div><div className="space-y-2"><Label>Ingestão recente</Label><Select value={recentIntake.toString()} onValueChange={(value) => setRecentIntake(parseInt(value))}><SelectTrigger><SelectValue>{recentIntake}% do necessário</SelectValue></SelectTrigger><SelectContent>{[10, 25, 50, 75].map((value) => <SelectItem key={value} value={String(value)}>{value}% do necessário</SelectItem>)}</SelectContent></Select></div></div>}
            </section>

            <section className="space-y-4">
              <div className="flex min-h-11 items-center justify-between gap-4"><div><Label className="font-semibold">Eletrólitos baixos</Label><p className="mt-0.5 text-xs text-muted-foreground">Potássio, fósforo ou magnésio</p></div><Switch checked={electrolytesLow} onCheckedChange={setElectrolytesLow} /></div>
              <div className="space-y-2"><Label>Via de alimentação</Label><Select value={feedingRoute} onValueChange={(value: typeof feedingRoute) => setFeedingRoute(value)}><SelectTrigger><SelectValue>{{ oral: 'Oral voluntária', tube: 'Sonda enteral', parenteral: 'Nutrição parenteral', undefined: 'A definir' }[feedingRoute]}</SelectValue></SelectTrigger><SelectContent><SelectItem value="oral">Oral voluntária</SelectItem><SelectItem value="tube">Sonda enteral</SelectItem><SelectItem value="parenteral">Nutrição parenteral</SelectItem><SelectItem value="undefined">A definir</SelectItem></SelectContent></Select></div>
            </section>

            {useHospitalV2 && <section className="grid gap-4 rounded-2xl bg-muted/55 p-4 sm:grid-cols-[1fr_180px]"><div className="space-y-2"><Label htmlFor="hospital-food">Fórmula ou dieta</Label><Input id="hospital-food" value={foodName} onChange={(event) => setFoodName(event.target.value)} /></div><div className="space-y-2"><Label htmlFor="hospital-density">Densidade energética</Label><LocalizedNumberInput id="hospital-density" min={0.1} value={energyDensity} onValueChange={(value) => setEnergyDensity(value ?? 0)} /></div></section>}

            <div className="space-y-2"><Label htmlFor="hospital-notes">Observações clínicas</Label><textarea id="hospital-notes" className="min-h-24 w-full resize-y outline-none focus:ring-3 focus:ring-ring/20" placeholder="Diagnóstico, comorbidades e condições especiais" value={clinicalNotes} onChange={(event) => setClinicalNotes(event.target.value)} /></div>
          </CardContent>
        </Card>

        <div className="space-y-5 xl:sticky xl:top-6">
          <section className={cn('rounded-[1.35rem] border p-5', riskView.panel)}>
            <div className="flex items-start gap-3"><span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card/75', riskView.text)}><ShieldAlert className="h-5 w-5" /></span><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Síndrome de realimentação</p><h2 className={cn('mt-1 text-xl font-semibold', riskView.text)}>{riskView.label}</h2></div></div>
            <div className="mt-4 space-y-2">{assessment.alerts.map((alert) => <p key={alert} className="flex gap-2 text-sm leading-relaxed text-foreground/80"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> {alert}</p>)}</div>
          </section>

          <Card className="gap-0 py-0">
            <CardHeader className="border-b border-border p-5"><div className="flex items-center justify-between gap-3"><div><CardTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5 text-primary" /> Progressão alimentar</CardTitle><CardDescription className="mt-1">Meta diária baseada no RER calculado.</CardDescription></div><div className="text-right"><p className="text-[11px] text-muted-foreground">RER</p><p className="text-lg font-semibold text-primary">{assessment.rer.toFixed(0)} kcal</p></div></div></CardHeader>
            <CardContent className="space-y-5 p-5">
              <div className="grid grid-cols-2 gap-2">{(['3_days', '4_days'] as const).map((protocol) => <button key={protocol} type="button" aria-pressed={progressionProtocol === protocol} onClick={() => setProgressionProtocol(protocol)} className={cn('min-h-16 cursor-pointer rounded-xl border px-3 text-left outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/25', progressionProtocol === protocol ? 'border-primary/45 bg-primary/[0.08]' : 'border-border hover:bg-muted')}><span className="block text-sm font-semibold">{protocol === '3_days' ? '3 dias' : '4 dias'}</span><span className="mt-1 block text-xs text-muted-foreground">{protocol === '3_days' ? '33 · 66 · 100%' : '25 · 50 · 75 · 100%'}</span></button>)}</div>
              <div className="relative space-y-0">{assessment.progression.map((step, index) => <div key={step.day} className="relative flex items-center gap-3 pb-5 last:pb-0">{index < assessment.progression.length - 1 && <span className="absolute left-[17px] top-9 h-[calc(100%-1.25rem)] w-px bg-border" aria-hidden />}<span className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{step.day}</span><div className="min-w-0 flex-1"><p className="text-sm font-semibold">Dia {step.day} · {step.percentRer}% do RER</p><p className="mt-0.5 text-xs text-muted-foreground">{step.requiresToleranceCheck ? 'Avançar após avaliar tolerância' : 'Manter monitoramento clínico'}</p></div><p className="text-base font-semibold tabular-nums text-primary">{step.kcalTarget.toFixed(0)} <span className="text-xs font-normal text-muted-foreground">kcal</span></p></div>)}</div>
              {useHospitalV2 && feedingOrder && <div className="rounded-2xl bg-muted/60 p-4"><p className="flex items-center gap-2 text-sm font-semibold"><Syringe className="h-4 w-4 text-primary" /> Ordem enteral — dia 1</p><p className="mt-2 text-sm text-foreground">{feedingOrder.gramsOrMlPerDay} {feedingRoute === 'tube' ? 'ml' : 'g'}/dia · {feedingOrder.administrationsPerDay} administrações</p><p className="mt-1 text-xs text-muted-foreground">Horários: {feedingOrder.schedule.join(', ')}</p><Button className="mt-4 w-full gap-2" onClick={handleExportOrder}><Download className="h-4 w-4" /> Exportar ordem hospitalar</Button></div>}
            </CardContent>
          </Card>

          <details className="rounded-2xl border border-border bg-card"><summary className="flex min-h-14 cursor-pointer list-none items-center gap-2 px-4 text-sm font-semibold"><Syringe className="h-4 w-4 text-primary" /> Lembretes clínicos</summary><ul className="space-y-2 border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">{['Suplementar tiamina antes de iniciar a realimentação.', 'Monitorar fósforo, potássio e magnésio nas primeiras 24–72 horas.', 'Preferir via enteral quando o trato gastrointestinal estiver funcional.', 'Avançar apenas após avaliação de tolerância.', 'Registrar a ingestão realmente administrada.'].map((tip) => <li key={tip} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{tip}</li>)}</ul></details>
        </div>
      </div>
      <p className="text-xs leading-5 text-muted-foreground">Base clínica: <strong>Nutritional Management of Hospitalized Small Animals</strong>, capítulos 1-3, 9, 12 e 16 (avaliação, RER, via de suporte, dieta enteral, desnutrição e síndrome de realimentação). A recomendação é iniciar de forma conservadora pelo RER e avançar conforme tolerância, com monitoramento de fósforo, potássio e magnésio.</p>
    </div>
  )
}
