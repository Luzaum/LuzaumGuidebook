import React, { useEffect, useMemo, useState } from 'react'
import { Activity, Droplets, HeartPulse, ShieldAlert, Syringe, Waves } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
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
  const [selectedMethod, setSelectedMethod] = useState<MaintenanceMethodId | 'custom'>('custom')
  const [pediatricBase, setPediatricBase] = useState<'aaha-weight' | 'aaha-allometric' | 'aaha-linear' | 'custom'>('aaha-weight')
  const [includeRehydration, setIncludeRehydration] = useState(false)
  const [dehydration, setDehydration] = useState('0.08')
  const [rehydrationHours, setRehydrationHours] = useState('12')
  const [includeLosses, setIncludeLosses] = useState(false)
  const [losses, setLosses] = useState('')
  const [bolusDose, setBolusDose] = useState('15')
  const [bolusMinutes, setBolusMinutes] = useState('20')

  useEffect(() => {
    if (!species) {
      return
    }
    setBolusDose(species === 'cao' ? '15' : '7')
  }, [species])

  const weightNumber = Number.parseFloat(weight)
  const hasWeight = Number.isFinite(weightNumber) && weightNumber > 0

  const methods = useMemo(() => resolveMaintenanceMethods({
      species,
      weight: weightNumber,
      customRate: Number.parseFloat(customRate) || 50,
      state,
      pediatricBase,
  }), [customRate, pediatricBase, species, state, weightNumber])
  
  const selected = methods.find(m => m.id === selectedMethod) || methods.find(m => m.id === 'custom') || methods[0]

  const plan = useMemo(() => {
    if (!hasWeight || !selected) {
      return null
    }

    const maintenanceDaily = selected.daily
    const maintenanceHourly = maintenanceDaily / 24

    const deficit =
      includeRehydration && Number.parseFloat(dehydration) > 0
        ? weightNumber * Number.parseFloat(dehydration) * 1000
        : 0
    const ongoing = includeLosses ? Number.parseFloat(losses) || 0 : 0
    const deficitHourly = deficit > 0 ? deficit / Number.parseFloat(rehydrationHours) : 0
    const ongoingHourly = ongoing / 24

    return {
      deficit,
      ongoing,
      maintenanceDaily,
      maintenanceHourly,
      total24h: maintenanceDaily + deficit + ongoing,
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
    customRate,
    weightNumber,
    selected,
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

  return (
    <div className="flex flex-col items-start gap-6 xl:flex-row">
      {/* LEFT COLUMN: Input Configuration */}
      <div className="min-w-0 flex-1 space-y-6">
        <motion.section 
          id="patient" 
          className="fluid-panel rounded-[24px] p-5 md:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="fluid-kicker mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
            1. Perfil do Paciente
          </div>
          <div className="grid gap-5 md:grid-cols-[1fr_1fr]">
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--fluid-muted)]">Espécie</label>
              <div className="flex gap-3">
                {[
                  { id: 'cao', title: 'Cão' },
                  { id: 'gato', title: 'Gato' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSpecies(item.id as Species)}
                    className={[
                      'fluid-card-hover flex-1 rounded-2xl border p-3 text-center text-sm font-semibold transition-colors',
                      species === item.id
                        ? 'border-[var(--fluid-primary)] bg-[var(--fluid-accent-soft)] text-[var(--fluid-primary)]'
                        : 'border-[var(--fluid-border)] bg-transparent text-[var(--fluid-muted)] hover:bg-[var(--fluid-accent-soft)]',
                    ].join(' ')}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--fluid-muted)]">Peso (kg)</label>
              <div className="fluid-panel-strong flex items-center overflow-hidden rounded-2xl border-0">
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                  placeholder="Ex: 4.2"
                  className="w-full border-0 bg-transparent px-4 py-3 text-lg font-semibold text-[var(--fluid-text)] outline-none placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--fluid-muted)]">Fase / Estado Fisiológico</label>
              <select
                value={state}
                onChange={(event) => setState(event.target.value as PhysState)}
                className="w-full rounded-2xl border border-[var(--fluid-border)] bg-[var(--fluid-panel-strong)] px-4 py-3 text-sm font-medium text-[var(--fluid-text)] outline-none focus:border-[var(--fluid-primary)]"
              >
                <option value="adulto">Adulto</option>
                <option value="filhote">Filhote / neonato</option>
                <option value="idoso">Idoso</option>
                <option value="gestante">Gestante / lactante</option>
                <option value="obeso">Obeso</option>
              </select>
            </div>
          </div>
        </motion.section>

        <motion.section 
          id="method" 
          className="fluid-panel rounded-[24px] p-5 md:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="fluid-kicker mb-6 text-xs font-semibold uppercase tracking-[0.2em]">
            2. Taxa de Manutenção
          </div>

          <div 
             onClick={() => setSelectedMethod('custom')}
             className={`flex flex-col items-center justify-center rounded-[24px] border p-6 md:p-8 cursor-pointer transition-colors ${selectedMethod === 'custom' ? 'border-[var(--fluid-primary)] bg-[var(--fluid-accent-soft)] ring-1 ring-[var(--fluid-primary)]' : 'border-[var(--fluid-border)] bg-[var(--fluid-panel-strong)] hover:bg-[var(--fluid-accent-soft)]'}`}
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--fluid-muted)]">Ajuste Manual (mL/kg/dia)</div>
            <div className={`fluid-heading my-6 text-6xl font-black tracking-tighter ${selectedMethod === 'custom' ? 'text-[var(--fluid-primary)]' : 'text-[var(--fluid-text)]'} drop-shadow-sm`}>
              {customRate}
            </div>
            <div className="flex w-full items-center gap-5">
              <span className="text-xs font-bold text-[var(--fluid-muted)]">40</span>
              <input
                type="range"
                min="40"
                max="120"
                step="1"
                value={customRate}
                onChange={(event) => {
                  setCustomRate(event.target.value)
                  setSelectedMethod('custom')
                }}
                className="flex-1 accent-[var(--fluid-primary)]"
              />
              <span className="text-xs font-bold text-[var(--fluid-muted)]">120</span>
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {methods.filter(m => m.id !== 'custom').map((method) => {
              const isActive = selectedMethod === method.id
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedMethod(method.id)}
                  className={[
                    'fluid-card-hover flex flex-col justify-between rounded-2xl border p-4 text-left transition-colors',
                    isActive
                      ? 'border-[var(--fluid-primary)] bg-[var(--fluid-primary)]/10 ring-1 ring-[var(--fluid-primary)]'
                      : 'border-[var(--fluid-border)] bg-transparent',
                  ].join(' ')}
                >
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--fluid-muted)]">
                      {method.source}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[var(--fluid-text)]">{method.title}</div>
                    <div className="mt-1 text-xs text-[var(--fluid-muted)]">{method.formula}</div>
                  </div>
                  <div className="fluid-heading mt-4 text-2xl font-bold">
                    {formatNumber(method.daily, 1)} <span className="text-xs font-medium text-[var(--fluid-muted)]">mL/dia</span>
                  </div>
                </button>
              )
            })}
          </div>
        </motion.section>

        <motion.section 
          id="modifiers" 
          className="fluid-panel rounded-[24px] p-5 md:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="fluid-kicker mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
            3. Modificadores Clínicos
          </div>

          <div className="space-y-4">
            {/* Rehydration */}
            <div className="rounded-2xl border border-[var(--fluid-border)] bg-[var(--fluid-panel-strong)] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Waves className="h-4 w-4 text-[var(--fluid-primary)]" /> Reidratação
                </div>
                <button
                  onClick={() => setIncludeRehydration(!includeRehydration)}
                  className={`text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full transition-all ${
                    includeRehydration 
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 border border-transparent' 
                      : 'bg-transparent text-[var(--fluid-muted)] border border-[var(--fluid-border)] hover:bg-[var(--fluid-accent-soft)]'
                  }`}
                >
                  {includeRehydration ? 'Ativo' : 'Inativo'}
                </button>
              </div>
              <AnimatePresence>
                {includeRehydration && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[var(--fluid-border)] pt-4">
                      <div>
                        <label className="text-[10px] uppercase text-[var(--fluid-muted)]">Déficit</label>
                        <select value={dehydration} onChange={e => setDehydration(e.target.value)} className="mt-1 w-full rounded-xl border border-[var(--fluid-border)] bg-transparent px-3 py-2 text-sm outline-none">
                          {[5,6,7,8,9,10,11,12].map(n => <option key={n} value={n/100}>{n}%</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-[var(--fluid-muted)]">Tempo</label>
                        <select value={rehydrationHours} onChange={e => setRehydrationHours(e.target.value)} className="mt-1 w-full rounded-xl border border-[var(--fluid-border)] bg-transparent px-3 py-2 text-sm outline-none">
                          <option value="12">12h</option><option value="18">18h</option><option value="24">24h</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Continuous Losses */}
            <div className="rounded-2xl border border-[var(--fluid-border)] bg-[var(--fluid-panel-strong)] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Droplets className="h-4 w-4 text-[var(--fluid-primary)]" /> Perdas Contínuas
                </div>
                <button
                  onClick={() => setIncludeLosses(!includeLosses)}
                  className={`text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full transition-all ${
                    includeLosses 
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 border border-transparent' 
                      : 'bg-transparent text-[var(--fluid-muted)] border border-[var(--fluid-border)] hover:bg-[var(--fluid-accent-soft)]'
                  }`}
                >
                  {includeLosses ? 'Ativo' : 'Inativo'}
                </button>
              </div>
              <AnimatePresence>
                {includeLosses && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="mt-4 border-t border-[var(--fluid-border)] pt-4">
                      <label className="text-[10px] uppercase text-[var(--fluid-muted)]">Estimativa 24h (mL)</label>
                      <input type="number" min="0" value={losses} onChange={e => setLosses(e.target.value)} className="mt-1 w-full rounded-xl border border-[var(--fluid-border)] bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-300" placeholder="Ex: 150" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bolus */}
            <div className="rounded-2xl border border-[var(--fluid-border)] bg-[var(--fluid-panel-strong)] p-4 border-dashed">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Syringe className="h-4 w-4 text-[var(--fluid-warning)]" /> Bolus Emergencial / Choque
              </div>
              <p className="mt-1 text-xs text-[var(--fluid-muted)]">Calculado separado. Não entra na bomba contínua.</p>
              
              <div className="mt-4 border-t border-[var(--fluid-border)] pt-4">
                <div className="flex items-center justify-between text-[10px] uppercase text-[var(--fluid-muted)]">
                  <span>Dose ({species === 'gato' ? '5-10' : '15-20'} mL/kg)</span>
                  <span>Minutos</span>
                </div>
                <div className="mt-2 flex gap-3">
                   <div className="flex-1 rounded-xl border border-[var(--fluid-border)] px-3 py-2">
                     <input type="number" value={bolusDose} onChange={e => setBolusDose(e.target.value)} className="w-full bg-transparent text-sm outline-none" />
                   </div>
                   <select value={bolusMinutes} onChange={e => setBolusMinutes(e.target.value)} className="w-[100px] rounded-xl border border-[var(--fluid-border)] bg-transparent px-3 py-2 text-sm outline-none">
                     <option value="15">15 min</option><option value="20">20 min</option><option value="30">30 min</option>
                   </select>
                </div>
                {bolus && (
                  <div className="mt-3 flex items-center justify-between rounded-lg bg-[var(--fluid-warning)]/10 px-3 py-2 text-sm font-medium text-[var(--fluid-warning)]">
                    <span>{formatNumber(bolus.volume, 1)} mL</span>
                    <span>{formatNumber(bolus.rate, 1)} mL/h</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* RIGHT COLUMN: Sticky Results Dashboard (Enhanced Focus) */}
      <div className="w-full shrink-0 space-y-6 xl:sticky xl:top-24 xl:w-[500px]">
        <motion.section 
          id="results" 
          className="fluid-panel relative overflow-hidden rounded-[32px] border-0 p-0 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle gradient overlay to make it pop like a glass console */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent dark:from-white/5 pointer-events-none" />
          
          <div className="relative p-6">
            <div className="flex items-center justify-center text-center gap-2 text-sm font-bold uppercase tracking-[0.25em] text-[var(--fluid-primary)]">
               Resultados
            </div>
            
            <AnimatePresence mode="popLayout">
              {plan ? (
                <motion.div 
                  key="plan-active"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 space-y-6"
                >
                  <div className="text-center">
                    <div className="mt-2 flex flex-col items-center justify-center gap-3">
                      
                      {/* 1x Maintenance */}
                      <div className="flex w-full flex-col items-center justify-center rounded-[24px] bg-[var(--fluid-accent-soft)] p-8 shadow-inner ring-1 ring-[var(--fluid-border)]">
                        <div className="text-xs font-black uppercase tracking-widest bg-gradient-to-br from-emerald-400 to-emerald-600 dark:from-emerald-300 dark:to-emerald-500 bg-clip-text text-transparent drop-shadow-sm">
                          1x Manutenção
                        </div>
                        <div className="fluid-heading mt-2 text-7xl font-black tracking-tighter text-[var(--fluid-text)]">
                          {formatNumber(plan.initialHourly, 1)} <span className="text-2xl font-semibold tracking-normal text-[var(--fluid-muted)]">mL/h</span>
                        </div>
                      </div>

                      {/* 1.5x and 2x Side-by-side */}
                      <div className="flex w-full gap-3">
                        <div className="flex flex-1 flex-col items-center justify-center rounded-[20px] bg-black/5 dark:bg-white/5 p-5 ring-1 ring-[var(--fluid-border)]">
                          <div className="text-[10px] font-black uppercase tracking-widest bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-300 dark:to-amber-500 bg-clip-text text-transparent">
                            1.5x Manutenção
                          </div>
                          <div className="fluid-heading mt-2 text-3xl font-bold tracking-tighter text-[var(--fluid-text)]">
                            {formatNumber(plan.initialHourly * 1.5, 1)} <span className="text-sm font-medium tracking-normal text-[var(--fluid-muted)]">mL/h</span>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col items-center justify-center rounded-[20px] bg-black/5 dark:bg-white/5 p-5 ring-1 ring-[var(--fluid-border)]">
                          <div className="text-[10px] font-black uppercase tracking-widest bg-gradient-to-br from-rose-400 to-rose-600 dark:from-rose-300 dark:to-rose-500 bg-clip-text text-transparent">
                            2x Manutenção
                          </div>
                          <div className="fluid-heading mt-2 text-3xl font-bold tracking-tighter text-[var(--fluid-text)]">
                            {formatNumber(plan.initialHourly * 2, 1)} <span className="text-sm font-medium tracking-normal text-[var(--fluid-muted)]">mL/h</span>
                          </div>
                        </div>
                      </div>

                    </div>
                    {includeRehydration && (
                      <div className="mt-4 inline-block rounded-full bg-emerald-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        *Cai para {formatNumber(plan.subsequentHourly, 1)} mL/h após {rehydrationHours}h
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-black/5 p-3 dark:bg-white/5">
                      <div className="text-[10px] uppercase text-[var(--fluid-muted)]">Bomba (Macro)</div>
                      <div className="mt-1 text-lg font-semibold">{formatNumber(calculateRateMetrics(plan.initialHourly).macroDropsPerSecond, 1)} gts/s</div>
                    </div>
                    <div className="rounded-2xl bg-black/5 p-3 dark:bg-white/5">
                      <div className="text-[10px] uppercase text-[var(--fluid-muted)]">Microgotas</div>
                      <div className="mt-1 text-lg font-semibold">{formatNumber(calculateRateMetrics(plan.initialHourly).microDropsPerMinute, 1)} mcgts/m</div>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-[var(--fluid-border)] pt-4">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--fluid-muted)]">Composição (24h)</div>
                    {[
                      ['Manutenção', plan.maintenanceDaily],
                      ['Déficit (Reidratação)', plan.deficit],
                      ['Perdas', plan.ongoing],
                    ].map(([label, value]) => Number(value) > 0 && (
                      <div key={String(label)} className="flex items-center justify-between text-sm">
                        <span className="text-[var(--fluid-muted)]">{label}</span>
                        <span className="font-semibold">{formatNumber(Number(value), 1)} mL</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between border-t border-dashed border-[var(--fluid-border)] pt-2 text-sm font-bold">
                      <span>Total 24h</span>
                      <span className="text-[var(--fluid-primary)]">{formatNumber(plan.total24h, 1)} mL</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="plan-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 flex h-[350px] flex-col items-center justify-center text-center text-sm text-[var(--fluid-muted)]"
                >
                  <Activity className="mb-3 h-10 w-10 opacity-20" />
                  Preencha os dados do paciente<br/>para calcular o plano.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        <motion.section 
          id="monitoring" 
          className="fluid-panel rounded-[24px] p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--fluid-muted)]">
            <ShieldAlert className="h-4 w-4" /> Alertas
          </div>
          <p className="mt-3 text-xs leading-5 text-[var(--fluid-muted)]">
            Monitore continuamente TPC, ausculta pulmonar e peso. <br/>
            Reduza a taxa imeditamente se notar crepitações ou secreção nasal serosa (sobrecarga!).
          </p>
        </motion.section>
      </div>
    </div>
  )
}
