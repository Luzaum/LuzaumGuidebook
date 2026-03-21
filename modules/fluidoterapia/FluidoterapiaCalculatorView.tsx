import React, { useEffect, useMemo, useState } from 'react'
import { Droplets, HeartPulse, ShieldAlert, Syringe, Waves } from 'lucide-react'
import {
  RANGE_BY_STATE,
  calculateRateMetrics,
  formatNumber,
  resolveMaintenanceMethods,
  type MaintenanceMethodId,
  type PhysState,
  type Species,
} from './logic'

export function FluidoterapiaCalculatorView() {
  const [species, setSpecies] = useState<Species | null>(null)
  const [weight, setWeight] = useState('')
  const [state, setState] = useState<PhysState>('adulto')
  const [customRate, setCustomRate] = useState('50')
  const [selectedMethod, setSelectedMethod] = useState<MaintenanceMethodId>('aaha-weight')
  const [pediatricBase, setPediatricBase] =
    useState<'aaha-weight' | 'aaha-allometric' | 'aaha-linear' | 'custom'>('aaha-weight')
  const [includeRehydration, setIncludeRehydration] = useState(false)
  const [dehydration, setDehydration] = useState('0.08')
  const [rehydrationHours, setRehydrationHours] = useState('12')
  const [includeLosses, setIncludeLosses] = useState(false)
  const [losses, setLosses] = useState('')
  const [bolusDose, setBolusDose] = useState('15')
  const [bolusMinutes, setBolusMinutes] = useState('20')

  const range = RANGE_BY_STATE[state]

  useEffect(() => {
    const numeric = Number.parseFloat(customRate)
    if (!Number.isFinite(numeric) || numeric < range.min || numeric > range.max) {
      setCustomRate(String(Math.round((range.min + range.max) / 2)))
    }
  }, [customRate, range.max, range.min])

  useEffect(() => {
    if (!species) {
      return
    }

    setBolusDose(species === 'cao' ? '15' : '7')
  }, [species])

  useEffect(() => {
    if (state !== 'filhote' && selectedMethod === 'aaha-pediatric') {
      setSelectedMethod('aaha-weight')
    }
  }, [selectedMethod, state])

  const weightNumber = Number.parseFloat(weight)
  const hasWeight = Number.isFinite(weightNumber) && weightNumber > 0
  const methods = useMemo(
    () =>
      resolveMaintenanceMethods({
        species,
        weight: weightNumber,
        customRate: Number.parseFloat(customRate),
        state,
        pediatricBase,
      }),
    [customRate, pediatricBase, species, state, weightNumber],
  )
  const selected = methods.find((method) => method.id === selectedMethod) ?? methods[0]

  const plan = useMemo(() => {
    if (!selected || !hasWeight) {
      return null
    }

    const deficit =
      includeRehydration && Number.parseFloat(dehydration) > 0
        ? weightNumber * Number.parseFloat(dehydration) * 1000
        : 0
    const ongoing = includeLosses ? Number.parseFloat(losses) || 0 : 0
    const maintenanceHourly = selected.daily / 24
    const deficitHourly = deficit > 0 ? deficit / Number.parseFloat(rehydrationHours) : 0
    const ongoingHourly = ongoing / 24

    return {
      deficit,
      ongoing,
      maintenanceDaily: selected.daily,
      maintenanceHourly,
      total24h: selected.daily + deficit + ongoing,
      initialHourly: maintenanceHourly + deficitHourly + ongoingHourly,
      subsequentHourly: maintenanceHourly + ongoingHourly,
    }
  }, [
    dehydration,
    hasWeight,
    includeLosses,
    includeRehydration,
    losses,
    rehydrationHours,
    selected,
    weightNumber,
  ])

  const bolus = useMemo(() => {
    if (!species || !hasWeight) {
      return null
    }

    const volume = weightNumber * (Number.parseFloat(bolusDose) || 0)
    const rate = volume / ((Number.parseFloat(bolusMinutes) || 20) / 60)

    return {
      volume,
      rate,
      range: species === 'cao' ? '15 a 20 mL/kg' : '5 a 10 mL/kg',
    }
  }, [bolusDose, bolusMinutes, hasWeight, species, weightNumber])

  const rateVariants = selected
    ? [1, 1.5, 2].map((multiplier) => {
        const daily = selected.daily * multiplier
        const hourly = daily / 24
        const metrics = calculateRateMetrics(hourly)

        return {
          label: multiplier === 1 ? '1x manutenção' : multiplier === 1.5 ? '1,5x manutenção' : '2x manutenção',
          daily,
          hourly,
          ...metrics,
        }
      })
    : []

  return (
    <div className="space-y-6">
      <section id="patient" className="fluid-panel rounded-[32px] p-6 md:p-8">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="fluid-kicker text-xs font-semibold uppercase tracking-[0.24em]">
              Passo 1
            </div>
            <h2 className="fluid-heading mt-3 text-3xl font-semibold">Escolha o paciente</h2>
            <p className="fluid-muted mt-3 max-w-3xl text-sm leading-7">
              Primeiro defina espécie, peso e contexto fisiológico. Sem isso o app não solta
              número útil.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                {
                  id: 'cao',
                  title: 'Cão',
                  note: 'Bolus de referência: 15 a 20 mL/kg em 15 a 30 min.',
                },
                {
                  id: 'gato',
                  title: 'Gato',
                  note: 'Bolus de referência: 5 a 10 mL/kg em 15 a 30 min.',
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSpecies(item.id as Species)}
                  className={[
                    'fluid-card-hover min-h-[148px] rounded-[28px] border p-5 text-left',
                    species === item.id
                      ? 'border-[var(--fluid-primary)] bg-[var(--fluid-accent-soft)]'
                      : 'border-[var(--fluid-border)] bg-[var(--fluid-panel-strong)]',
                  ].join(' ')}
                >
                  <div className="fluid-heading text-2xl font-semibold">{item.title}</div>
                  <p className="fluid-muted mt-3 text-sm leading-6">{item.note}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="fluid-panel-strong rounded-[28px] p-5">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--fluid-muted)]">
                Peso do paciente
              </label>
              <div className="mt-3 flex items-end gap-3">
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                  placeholder="Ex: 4,2"
                  className="w-full border-0 bg-transparent p-0 text-5xl font-semibold text-[var(--fluid-text)] outline-none placeholder:text-slate-300"
                />
                <span className="pb-1 text-sm font-medium text-[var(--fluid-muted)]">kg</span>
              </div>
            </div>

            <div className="fluid-panel-strong rounded-[28px] p-5">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--fluid-muted)]">
                Estado fisiológico
              </label>
              <select
                value={state}
                onChange={(event) => setState(event.target.value as PhysState)}
                className="mt-3 min-h-12 w-full rounded-2xl border border-[var(--fluid-border)] bg-transparent px-4 py-3 text-sm font-medium text-[var(--fluid-text)] outline-none"
              >
                <option value="adulto">Adulto</option>
                <option value="filhote">Filhote / neonato</option>
                <option value="idoso">Idoso</option>
                <option value="gestante">Gestante / lactante</option>
                <option value="obeso">Obeso</option>
              </select>
              <p className="fluid-muted mt-3 text-sm leading-6">{range.hint}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="method" className="fluid-panel rounded-[32px] p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="fluid-kicker text-xs font-semibold uppercase tracking-[0.24em]">
              Passo 2
            </div>
            <h2 className="fluid-heading mt-3 text-3xl font-semibold">Escolha o método</h2>
            <p className="fluid-muted mt-3 max-w-3xl text-sm leading-7">
              O app mostra mais de um método válido de manutenção e deixa explícita a fórmula
              usada.
            </p>
          </div>

          <div className="fluid-chip rounded-full px-4 py-2 text-sm font-semibold">
            Faixa clínica: {range.min} a {range.max} mL/kg/dia
          </div>
        </div>

        <div className="mt-6 fluid-panel-strong rounded-[28px] p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-[var(--fluid-text)]">
                Ajuste clínico personalizado
              </div>
              <p className="fluid-muted mt-1 text-sm leading-6">{range.hint}</p>
            </div>
            <div className="fluid-heading text-2xl font-semibold">{customRate} mL/kg/dia</div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--fluid-muted)]">
              {range.min}
            </span>
            <input
              type="range"
              min={range.min}
              max={range.max}
              step="1"
              value={customRate}
              onChange={(event) => setCustomRate(event.target.value)}
              className="w-full"
            />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--fluid-muted)]">
              {range.max}
            </span>
          </div>
        </div>

        {state === 'filhote' ? (
          <div className="mt-4 fluid-panel-strong rounded-[28px] p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-[var(--fluid-text)]">
                  Base da dose pediátrica
                </div>
                <p className="fluid-muted mt-1 text-sm leading-6">
                  O consenso informa o multiplicador pediátrico. O app deixa você escolher a base
                  adulta usada.
                </p>
              </div>
              <select
                value={pediatricBase}
                onChange={(event) =>
                  setPediatricBase(
                    event.target.value as 'aaha-weight' | 'aaha-allometric' | 'aaha-linear' | 'custom',
                  )
                }
                className="min-h-12 rounded-2xl border border-[var(--fluid-border)] bg-transparent px-4 py-3 text-sm font-medium text-[var(--fluid-text)] outline-none"
              >
                <option value="aaha-weight">AAHA por kg</option>
                <option value="aaha-allometric">Alométrico</option>
                <option value="aaha-linear">Linear</option>
                <option value="custom">Faixa clínica ajustável</option>
              </select>
            </div>
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {methods.map((method) => {
            const isActive = selectedMethod === method.id

            return (
              <button
                key={method.id}
                type="button"
                onClick={() => setSelectedMethod(method.id)}
                className={[
                  'fluid-card-hover rounded-[28px] border p-5 text-left',
                  isActive
                    ? 'border-[var(--fluid-primary)] bg-[var(--fluid-accent-soft)]'
                    : 'border-[var(--fluid-border)] bg-[var(--fluid-panel-strong)]',
                ].join(' ')}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--fluid-muted)]">
                      {method.source}
                    </div>
                    <div className="fluid-heading mt-2 text-2xl font-semibold">{method.title}</div>
                  </div>
                  <div className="fluid-chip rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                    {isActive ? 'Principal' : 'Selecionar'}
                  </div>
                </div>
                <div className="mt-4 text-sm font-medium text-[var(--fluid-muted)]">
                  Fórmula: {method.formula}
                </div>
                <div className="fluid-heading mt-5 text-4xl font-semibold">
                  {formatNumber(method.daily, 1)}
                  <span className="ml-2 text-base font-medium text-[var(--fluid-muted)]">
                    mL/dia
                  </span>
                </div>
                <p className="fluid-muted mt-4 text-sm leading-6">{method.note}</p>
              </button>
            )
          })}
        </div>
      </section>

      <section id="modifiers" className="fluid-panel rounded-[32px] p-6 md:p-8">
        <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <div className="space-y-4">
            <div className="fluid-panel-strong rounded-[28px] p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Waves className="h-4 w-4" />
                    Reidratação
                  </div>
                  <p className="fluid-muted mt-2 text-sm leading-6">
                    Ative quando o paciente estiver desidratado e você quiser distribuir o déficit
                    ao longo de 12 a 24 horas.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIncludeRehydration((value) => !value)}
                  className={[
                    'fluid-card-hover min-h-11 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]',
                    includeRehydration
                      ? 'border-[var(--fluid-primary)] bg-[var(--fluid-accent-soft)] text-[var(--fluid-primary)]'
                      : 'border-[var(--fluid-border)]',
                  ].join(' ')}
                >
                  {includeRehydration ? 'Ativo' : 'Inativo'}
                </button>
              </div>

              {includeRehydration ? (
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <label>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--fluid-muted)]">
                      Desidratação
                    </span>
                    <select
                      value={dehydration}
                      onChange={(event) => setDehydration(event.target.value)}
                      className="min-h-12 w-full rounded-2xl border border-[var(--fluid-border)] bg-transparent px-4 py-3 text-sm font-medium text-[var(--fluid-text)] outline-none"
                    >
                      <option value="0.05">5%</option>
                      <option value="0.06">6%</option>
                      <option value="0.07">7%</option>
                      <option value="0.08">8%</option>
                      <option value="0.09">9%</option>
                      <option value="0.10">10%</option>
                      <option value="0.11">11%</option>
                      <option value="0.12">12%</option>
                    </select>
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--fluid-muted)]">
                      Horas de correção
                    </span>
                    <select
                      value={rehydrationHours}
                      onChange={(event) => setRehydrationHours(event.target.value)}
                      className="min-h-12 w-full rounded-2xl border border-[var(--fluid-border)] bg-transparent px-4 py-3 text-sm font-medium text-[var(--fluid-text)] outline-none"
                    >
                      <option value="12">12 horas</option>
                      <option value="18">18 horas</option>
                      <option value="24">24 horas</option>
                    </select>
                  </label>
                </div>
              ) : null}
            </div>

            <div className="fluid-panel-strong rounded-[28px] p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Droplets className="h-4 w-4" />
                    Perdas contínuas
                  </div>
                  <p className="fluid-muted mt-2 text-sm leading-6">
                    Some as perdas em mL por 24h para não subdimensionar o plano.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIncludeLosses((value) => !value)}
                  className={[
                    'fluid-card-hover min-h-11 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]',
                    includeLosses
                      ? 'border-[var(--fluid-primary)] bg-[var(--fluid-accent-soft)] text-[var(--fluid-primary)]'
                      : 'border-[var(--fluid-border)]',
                  ].join(' ')}
                >
                  {includeLosses ? 'Ativo' : 'Inativo'}
                </button>
              </div>

              {includeLosses ? (
                <label className="mt-5 block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--fluid-muted)]">
                    Perdas em 24h
                  </span>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="0"
                      value={losses}
                      onChange={(event) => setLosses(event.target.value)}
                      placeholder="Ex: 180"
                      className="min-h-12 w-full rounded-2xl border border-[var(--fluid-border)] bg-transparent px-4 py-3 text-sm font-medium text-[var(--fluid-text)] outline-none"
                    />
                    <span className="text-sm font-medium text-[var(--fluid-muted)]">mL</span>
                  </div>
                </label>
              ) : null}
            </div>
          </div>

          <div className="fluid-panel-strong rounded-[28px] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Syringe className="h-4 w-4" />
              Bolus de ressuscitação
            </div>
            <p className="fluid-muted mt-2 text-sm leading-6">
              Área separada para choque e hipovolemia. Não misture bolus com reidratação de forma
              automática.
            </p>

            <div className="mt-5 grid gap-4">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-[var(--fluid-muted)]">
                  <span>Dose</span>
                  <span>{species === 'gato' ? '5 a 10 mL/kg' : '15 a 20 mL/kg'}</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--fluid-muted)]">
                    {species === 'gato' ? 5 : 10}
                  </span>
                  <input
                    type="range"
                    min={species === 'gato' ? 5 : 10}
                    max={species === 'gato' ? 10 : 20}
                    step="1"
                    value={bolusDose}
                    onChange={(event) => setBolusDose(event.target.value)}
                    className="w-full"
                  />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--fluid-muted)]">
                    {species === 'gato' ? 10 : 20}
                  </span>
                </div>
              </div>

              <label>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--fluid-muted)]">
                  Tempo
                </span>
                <select
                  value={bolusMinutes}
                  onChange={(event) => setBolusMinutes(event.target.value)}
                  className="min-h-12 w-full rounded-2xl border border-[var(--fluid-border)] bg-transparent px-4 py-3 text-sm font-medium text-[var(--fluid-text)] outline-none"
                >
                  <option value="15">15 minutos</option>
                  <option value="20">20 minutos</option>
                  <option value="30">30 minutos</option>
                </select>
              </label>

              {bolus ? (
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-[24px] border border-[var(--fluid-border)] bg-[var(--fluid-panel)] p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--fluid-muted)]">
                      Volume
                    </div>
                    <div className="fluid-heading mt-2 text-3xl font-semibold">
                      {formatNumber(bolus.volume, 1)} mL
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-[var(--fluid-border)] bg-[var(--fluid-panel)] p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--fluid-muted)]">
                      Taxa
                    </div>
                    <div className="fluid-heading mt-2 text-3xl font-semibold">
                      {formatNumber(bolus.rate, 1)} mL/h
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section id="results" className="fluid-panel rounded-[32px] p-6 md:p-8">
        <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
          <div>
            <div className="fluid-kicker text-xs font-semibold uppercase tracking-[0.24em]">
              Passo 3
            </div>
            <h2 className="fluid-heading mt-3 text-3xl font-semibold">Obtenha os resultados</h2>
            <p className="fluid-muted mt-3 max-w-3xl text-sm leading-7">
              O resultado principal sempre nasce do método selecionado. O app também mostra
              1x, 1,5x e 2x manutenção para comparação rápida.
            </p>

            <div className="mt-6 grid gap-4 xl:grid-cols-3">
              {rateVariants.map((variant) => (
                <div
                  key={variant.label}
                  className="fluid-panel-strong rounded-[28px] p-5"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--fluid-muted)]">
                    {variant.label}
                  </div>
                  <div className="fluid-heading mt-4 text-4xl font-semibold">
                    {formatNumber(variant.hourly, 1)}
                    <span className="ml-2 text-base font-medium text-[var(--fluid-muted)]">
                      mL/h
                    </span>
                  </div>
                  <div className="fluid-muted mt-2 text-sm">
                    {formatNumber(variant.daily, 1)} mL em 24h
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl border border-[var(--fluid-border)] bg-[var(--fluid-panel)] p-3">
                      <div className="text-[var(--fluid-muted)]">Macro</div>
                      <div className="mt-1 font-semibold">
                        {formatNumber(variant.macroDropsPerSecond, 1)} gotas/s
                      </div>
                    </div>
                    <div className="rounded-2xl border border-[var(--fluid-border)] bg-[var(--fluid-panel)] p-3">
                      <div className="text-[var(--fluid-muted)]">Micro</div>
                      <div className="mt-1 font-semibold">
                        {formatNumber(variant.microDropsPerMinute, 1)} microgotas/min
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="fluid-panel-strong rounded-[28px] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <HeartPulse className="h-4 w-4" />
              Resumo principal de 24h
            </div>

            {plan ? (
              <div className="mt-5 grid gap-4">
                <div className="rounded-[24px] border border-[var(--fluid-border)] bg-[var(--fluid-panel)] p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--fluid-muted)]">
                    Método principal
                  </div>
                  <div className="mt-2 text-lg font-semibold">{selected.title}</div>
                  <div className="fluid-muted mt-1 text-sm">{selected.formula}</div>
                </div>

                {[
                  ['Manutenção diária', plan.maintenanceDaily, 'mL'],
                  ['Déficit de reidratação', plan.deficit, 'mL'],
                  ['Perdas contínuas', plan.ongoing, 'mL'],
                  ['Total nas primeiras 24h', plan.total24h, 'mL'],
                  ['Taxa inicial', plan.initialHourly, 'mL/h'],
                  ['Taxa após reidratação', plan.subsequentHourly, 'mL/h'],
                ].map(([label, value, unit]) => (
                  <div
                    key={String(label)}
                    className="flex items-center justify-between rounded-[22px] border border-[var(--fluid-border)] bg-[var(--fluid-panel)] px-4 py-4"
                  >
                    <span className="text-sm font-medium text-[var(--fluid-muted)]">{label}</span>
                    <span className="fluid-heading text-xl font-semibold">
                      {formatNumber(Number(value), 1)} {unit}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-[24px] border border-[var(--fluid-border)] bg-[var(--fluid-panel)] p-4 text-sm leading-6 text-[var(--fluid-muted)]">
                Escolha espécie, peso e método para liberar o plano principal.
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="monitoring" className="fluid-panel rounded-[32px] p-6 md:p-8">
        <div className="fluid-kicker text-xs font-semibold uppercase tracking-[0.24em]">
          Passo 4
        </div>
        <h2 className="fluid-heading mt-3 text-3xl font-semibold">
          Leia o resultado com monitorização
        </h2>
        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          {[
            {
              title: 'Perfusão e perfis vitais',
              items: ['Pulso', 'TPC', 'mucosas', 'pressão arterial', 'estado mental'],
            },
            {
              title: 'Balanço hídrico',
              items: ['Peso corporal', 'entradas e saídas', 'débito urinário', 'perdas em drenos'],
            },
            {
              title: 'Sinais de sobrecarga',
              items: ['Crepitações', 'piora respiratória', 'quimose', 'edema', 'ganho de peso'],
            },
          ].map((group) => (
            <div
              key={group.title}
              className="fluid-panel-strong rounded-[28px] p-5"
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <ShieldAlert className="h-4 w-4" />
                {group.title}
              </div>
              <ul className="fluid-muted mt-4 space-y-2 text-sm leading-6">
                {group.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
