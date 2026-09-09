import { useMemo, useState } from 'react'
import { AlertTriangle, ClipboardList, Download, ShieldAlert, Stethoscope, Syringe, User } from 'lucide-react'
import { SpeciesPortrait } from '@/components/SpeciesPortraitCards'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { LocalizedNumberInput } from '../components/ui/localized-number-input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Switch } from '../components/ui/switch'
import { Button } from '../components/ui/button'
import { cn } from '../lib/utils'
import { BCS } from '../types'
import { isNutritionFeatureEnabled } from '../lib/featureFlags'
import { assessRefeedingPlan, buildEnteralFeedingOrder } from '../lib/hospital'
import { buildHospitalizedNutritionPdfDoc } from '../lib/pdf/hospitalizedNutritionPdf'
import { getBCSDescription } from '../lib/nutrition'

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

  const bcsInfo = useMemo(() => getBCSDescription(bcs), [bcs])

  const bcsBadgeStyle = useMemo(() => {
    if (bcs <= 3) return 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800/40 dark:bg-blue-950/40 dark:text-blue-300'
    if (bcs <= 5) return 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/40 dark:text-emerald-300'
    if (bcs <= 7) return 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/40 dark:bg-amber-950/40 dark:text-amber-300'
    return 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800/40 dark:bg-rose-950/40 dark:text-rose-300'
  }, [bcs])

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
    <div className="nutrition-page w-full max-w-4xl mx-auto space-y-6 pb-16">
      <header className="nutrition-page-header">
        <div>
          <p className="nutrition-eyebrow">Terapia nutricional</p>
          <h1>Paciente hospitalizado</h1>
          <p>Avalie risco de síndrome de realimentação e construa uma progressão alimentar segura.</p>
        </div>
      </header>

      {/* Métricas do topo */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="nutrition-header-stat"><span>RER calculado</span><strong>{assessment.rer.toFixed(0)} kcal</strong></div>
        <div className="nutrition-header-stat"><span>Risco atual</span><strong className={riskView.text}>{riskView.label}</strong></div>
        <div className="nutrition-header-stat"><span>Progressão</span><strong>{progressionProtocol === '3_days' ? '3 dias' : '4 dias'}</strong></div>
      </div>

      {/* 1. PRIMEIRA PARTE: DADOS DO PACIENTE */}
      <Card className="gap-0 py-0 shadow-xs">
        <CardHeader className="border-b border-border p-5 lg:p-6">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" /> Informações do paciente
          </CardTitle>
          <CardDescription>
            Espécie, peso corporal e avaliação do escore de condição corporal (ECC).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-5 lg:p-6">
          {/* Espécie */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Espécie</Label>
            <div className="grid grid-cols-2 gap-3">
              {([{ id: 'dog' as const, label: 'Cão' }, { id: 'cat' as const, label: 'Gato' }]).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={species === item.id}
                  onClick={() => setSpecies(item.id)}
                  className={cn(
                    'flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-xl border text-sm font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/25',
                    species === item.id
                      ? 'border-primary/45 bg-primary/[0.08] text-primary shadow-xs'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted'
                  )}
                >
                  <span className="h-8 w-8 overflow-hidden rounded-lg bg-white shadow-xs">
                    <SpeciesPortrait species={item.id} decorative className="h-full w-full" />
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Peso atual */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="hospital-weight" className="text-sm font-semibold">Peso atual (kg)</Label>
              <span className="text-xs text-muted-foreground">Base para o cálculo do RER</span>
            </div>
            <div className="max-w-xs">
              <LocalizedNumberInput
                id="hospital-weight"
                min={0.1}
                value={weight}
                onValueChange={(value) => setWeight(value ?? 0)}
              />
            </div>
          </div>

          {/* Barra de ECC (1 a 9) */}
          <div className="space-y-3 rounded-2xl border border-border/80 bg-muted/30 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Label className="text-sm font-semibold">Escore de condição corporal (ECC)</Label>
                <span className={cn('text-xs font-semibold px-2.5 py-0.5 rounded-full border', bcsBadgeStyle)}>
                  {bcs}/9 · {bcsInfo.detail}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                Toque no escore (1 a 9)
              </span>
            </div>

            <div
              className="grid grid-cols-9 gap-1.5 sm:gap-2"
              role="radiogroup"
              aria-label="Escore de condição corporal de 1 a 9"
            >
              {([1, 2, 3, 4, 5, 6, 7, 8, 9] as BCS[]).map((score) => {
                const isSelected = bcs === score
                return (
                  <button
                    key={score}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setBcs(score)}
                    className={cn(
                      'flex h-12 cursor-pointer flex-col items-center justify-center rounded-xl border font-bold transition-all focus-visible:ring-2 focus-visible:ring-ring outline-none',
                      isSelected
                        ? 'border-primary bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/25 scale-[1.03]'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-card hover:text-foreground'
                    )}
                  >
                    <span className="text-base font-black leading-none">{score}</span>
                    <span className="text-[10px] font-normal leading-none opacity-70 mt-0.5">/9</span>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-between px-1 text-xs text-muted-foreground">
              <span>1–3: Magro / Caquético</span>
              <span className="font-medium text-foreground/80">4–5: Ideal</span>
              <span>6–9: Sobrepeso / Obeso</span>
            </div>

            {bcs <= 3 && (
              <div className="flex items-start gap-2.5 rounded-xl border border-amber-200/80 bg-amber-50/70 p-3 text-xs text-amber-900 dark:border-amber-400/25 dark:bg-amber-500/10 dark:text-amber-200">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <span>
                  <strong>Critério de risco:</strong> ECC ≤ 3 com anorexia ≥ 3 dias é critério importante para síndrome de realimentação.
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 2. SEGUNDA PARTE: AVALIAÇÃO CLÍNICA E HISTÓRICO */}
      <Card className="gap-0 py-0 shadow-xs">
        <CardHeader className="border-b border-border p-5 lg:p-6">
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" /> Avaliação clínica e triagem nutricional
          </CardTitle>
          <CardDescription>
            Histórico de ingestão, jejum, eletrólitos séricos e vias de administração alimentar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-5 lg:p-6">
          {/* Seção de Anorexia / Hiporexia */}
          <section className="space-y-4 rounded-2xl bg-muted/40 p-4 sm:p-5">
            <div className="flex min-h-11 items-center justify-between gap-4">
              <div>
                <Label className="font-semibold text-base">Anorexia</Label>
                <p className="mt-0.5 text-xs text-muted-foreground">Jejum total ou ingestão próxima de zero</p>
              </div>
              <Switch
                checked={isAnorexic}
                onCheckedChange={(value) => {
                  setIsAnorexic(value)
                  if (value) setIsHyporexic(false)
                }}
              />
            </div>
            {isAnorexic && (
              <div className="space-y-2 sm:max-w-xs">
                <Label htmlFor="anorexia-days">Duração em dias</Label>
                <LocalizedNumberInput
                  id="anorexia-days"
                  integer
                  min={0}
                  value={daysAnorexic}
                  onValueChange={(value) => setDaysAnorexic(value ?? 0)}
                />
              </div>
            )}
            <div className="h-px bg-border" />
            <div className="flex min-h-11 items-center justify-between gap-4">
              <div>
                <Label className="font-semibold text-base">Hiporexia</Label>
                <p className="mt-0.5 text-xs text-muted-foreground">Ingestão significativamente reduzida</p>
              </div>
              <Switch
                checked={isHyporexic}
                onCheckedChange={(value) => {
                  setIsHyporexic(value)
                  if (value) setIsAnorexic(false)
                }}
              />
            </div>
            {isHyporexic && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hyporexia-days">Duração em dias</Label>
                  <LocalizedNumberInput
                    id="hyporexia-days"
                    integer
                    min={0}
                    value={daysHyporexic}
                    onValueChange={(value) => setDaysHyporexic(value ?? 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ingestão recente</Label>
                  <Select value={recentIntake.toString()} onValueChange={(value) => setRecentIntake(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue>{recentIntake}% do necessário</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {[10, 25, 50, 75].map((value) => (
                        <SelectItem key={value} value={String(value)}>
                          {value}% do necessário
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </section>

          {/* Eletrólitos e Via de suporte */}
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/80 bg-muted/20 p-4">
              <div className="flex min-h-11 items-center justify-between gap-4">
                <div>
                  <Label className="font-semibold">Eletrólitos baixos</Label>
                  <p className="mt-0.5 text-xs text-muted-foreground">Potássio, fósforo ou magnésio</p>
                </div>
                <Switch checked={electrolytesLow} onCheckedChange={setElectrolytesLow} />
              </div>
            </div>
            <div className="rounded-2xl border border-border/80 bg-muted/20 p-4">
              <div className="space-y-2">
                <Label>Via de alimentação</Label>
                <Select value={feedingRoute} onValueChange={(value: typeof feedingRoute) => setFeedingRoute(value)}>
                  <SelectTrigger>
                    <SelectValue>
                      {{ oral: 'Oral voluntária', tube: 'Sonda enteral', parenteral: 'Nutrição parenteral', undefined: 'A definir' }[feedingRoute]}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oral">Oral voluntária</SelectItem>
                    <SelectItem value="tube">Sonda enteral</SelectItem>
                    <SelectItem value="parenteral">Nutrição parenteral</SelectItem>
                    <SelectItem value="undefined">A definir</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Fórmula / Densidade energética (V2) */}
          {useHospitalV2 && (
            <section className="grid gap-4 rounded-2xl bg-muted/40 p-4 sm:grid-cols-[1fr_200px]">
              <div className="space-y-2">
                <Label htmlFor="hospital-food">Fórmula ou dieta</Label>
                <Input id="hospital-food" value={foodName} onChange={(event) => setFoodName(event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospital-density">Densidade energética (kcal/ml ou g)</Label>
                <LocalizedNumberInput
                  id="hospital-density"
                  min={0.1}
                  value={energyDensity}
                  onValueChange={(value) => setEnergyDensity(value ?? 0)}
                />
              </div>
            </section>
          )}

          {/* Observações clínicas */}
          <div className="space-y-2">
            <Label htmlFor="hospital-notes">Observações clínicas</Label>
            <textarea
              id="hospital-notes"
              className="min-h-24 w-full resize-y outline-none focus:ring-3 focus:ring-ring/20 rounded-xl border border-input bg-card px-3 py-2 text-sm placeholder:text-muted-foreground"
              placeholder="Diagnóstico, comorbidades e condições especiais"
              value={clinicalNotes}
              onChange={(event) => setClinicalNotes(event.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* 3. PARTE INFERIOR: RISCO DE SÍNDROME DE REALIMENTAÇÃO (ANTES NA DIREITA, AGORA EMBAIXO) */}
      <section className={cn('rounded-2xl border p-5 sm:p-6 shadow-xs', riskView.panel)}>
        <div className="flex items-start gap-3.5">
          <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-card/85 shadow-xs', riskView.text)}>
            <ShieldAlert className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Risco de Síndrome de Realimentação
            </p>
            <h2 className={cn('mt-0.5 text-2xl font-bold', riskView.text)}>{riskView.label}</h2>
          </div>
        </div>
        <div className="mt-4 space-y-2.5">
          {assessment.alerts.map((alert) => (
            <p key={alert} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <span>{alert}</span>
            </p>
          ))}
        </div>
      </section>

      {/* 4. PARTE INFERIOR: PROGRESSÃO ALIMENTAR (ANTES NA DIREITA, AGORA EMBAIXO) */}
      <Card className="gap-0 py-0 shadow-xs">
        <CardHeader className="border-b border-border p-5 lg:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" /> Progressão alimentar calculada
              </CardTitle>
              <CardDescription className="mt-1">
                Meta diária baseada no RER calculado de {assessment.rer.toFixed(0)} kcal.
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">RER Diário</p>
              <p className="text-2xl font-bold text-primary">{assessment.rer.toFixed(0)} <span className="text-sm font-normal text-muted-foreground">kcal</span></p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-5 lg:p-6">
          <div className="grid grid-cols-2 gap-3 sm:max-w-md">
            {(['3_days', '4_days'] as const).map((protocol) => (
              <button
                key={protocol}
                type="button"
                aria-pressed={progressionProtocol === protocol}
                onClick={() => setProgressionProtocol(protocol)}
                className={cn(
                  'min-h-16 cursor-pointer rounded-xl border px-4 py-3 text-left outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/25',
                  progressionProtocol === protocol
                    ? 'border-primary bg-primary/[0.08] ring-2 ring-primary/20'
                    : 'border-border hover:bg-muted'
                )}
              >
                <span className="block text-sm font-bold">{protocol === '3_days' ? 'Protocolo de 3 dias' : 'Protocolo de 4 dias'}</span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {protocol === '3_days' ? '33% · 66% · 100%' : '25% · 50% · 75% · 100%'}
                </span>
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {assessment.progression.map((step) => (
              <div
                key={step.day}
                className="relative flex flex-col justify-between rounded-xl border border-border bg-card p-4 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {step.day}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {step.percentRer}% RER
                  </span>
                </div>
                <div className="my-3">
                  <p className="text-2xl font-black text-primary">
                    {step.kcalTarget.toFixed(0)}
                    <span className="ml-1 text-xs font-normal text-muted-foreground">kcal/dia</span>
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-snug">
                  {step.requiresToleranceCheck ? 'Avançar após avaliar tolerância' : 'Iniciar alimentação com monitoramento'}
                </p>
              </div>
            ))}
          </div>

          {useHospitalV2 && feedingOrder && (
            <div className="rounded-2xl border border-border/80 bg-muted/40 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                    <Syringe className="h-4 w-4 text-primary" /> Ordem enteral — Dia 1
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Volume: <strong className="text-foreground">{feedingOrder.gramsOrMlPerDay} {feedingRoute === 'tube' ? 'ml' : 'g'}/dia</strong> divididos em <strong className="text-foreground">{feedingOrder.administrationsPerDay} administrações</strong> ({feedingOrder.gramsOrMlPerAdministration} {feedingRoute === 'tube' ? 'ml' : 'g'} cada).
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Horários recomendados: {feedingOrder.schedule.join(', ')}
                  </p>
                </div>
                <Button className="gap-2" onClick={handleExportOrder}>
                  <Download className="h-4 w-4" /> Exportar ordem hospitalar (PDF)
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 5. PARTE INFERIOR: LEMBRETES CLÍNICOS */}
      <details className="rounded-2xl border border-border bg-card shadow-xs">
        <summary className="flex min-h-14 cursor-pointer list-none items-center gap-2 px-5 text-sm font-semibold hover:bg-muted/40 transition-colors">
          <Syringe className="h-4 w-4 text-primary" /> Lembretes clínicos para o paciente internado
        </summary>
        <ul className="space-y-2.5 border-t border-border px-6 py-4 text-sm leading-relaxed text-muted-foreground">
          {[
            'Suplementar tiamina antes de iniciar a realimentação.',
            'Monitorar fósforo, potássio e magnésio nas primeiras 24–72 horas.',
            'Preferir via enteral quando o trato gastrointestinal estiver funcional.',
            'Avançar apenas após avaliação de tolerância (vômitos, regurgitação, dor abdominal).',
            'Registrar a ingestão realmente administrada (não apenas o prescrito).',
          ].map((tip) => (
            <li key={tip} className="flex gap-2.5 items-start">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </details>

      <p className="text-xs leading-5 text-muted-foreground text-center">
        Base clínica: <strong>Nutritional Management of Hospitalized Small Animals</strong>, capítulos 1-3, 9, 12 e 16 (avaliação, RER, via de suporte, dieta enteral, desnutrição e síndrome de realimentação). A recomendação é iniciar de forma conservadora pelo RER e avançar conforme tolerância, com monitoramento de fósforo, potássio e magnésio.
      </p>
    </div>
  )
}
