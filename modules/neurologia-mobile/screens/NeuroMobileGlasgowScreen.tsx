import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MGCS_DOMAINS, MGCS_TOTAL_BANDS, interpretMgcsTotal, type MgcsDomainId } from '../../neurologia/data/glasgowMgcs'
import { cn } from '../../../lib/utils'
import { Activity, ShieldAlert, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'

type Selection = Record<MgcsDomainId, number | null>

const INITIAL: Selection = {
  motor: null,
  brainstem: null,
  consciousness: null,
}

const DOMAIN_COLUMN_ORDER: MgcsDomainId[] = ['consciousness', 'brainstem', 'motor']

function getDomainById(id: MgcsDomainId) {
  return MGCS_DOMAINS.find((d) => d.id === id)!
}

export function NeuroMobileGlasgowScreen() {
  const [sel, setSel] = useState<Selection>(() => ({ ...INITIAL }))
  const [activeTab, setActiveTab] = useState<MgcsDomainId>('consciousness')
  const [showReferences, setShowReferences] = useState(false)
  const [expandedDetail, setExpandedDetail] = useState<{ domain: MgcsDomainId; score: number } | null>(null)

  const previewTotal = (sel.motor ?? 0) + (sel.brainstem ?? 0) + (sel.consciousness ?? 0)
  const complete =
    sel.motor != null && sel.brainstem != null && sel.consciousness != null

  const band = useMemo(() => {
    if (!complete || previewTotal < 3 || previewTotal > 18) return null
    return interpretMgcsTotal(previewTotal)
  }, [complete, previewTotal])

  const setLevel = (domain: MgcsDomainId, score: number) => {
    setSel((prev) => ({ ...prev, [domain]: score }))
    setExpandedDetail({ domain, score })
    
    // Automatically switch to the next unselected domain tab for a smooth wizard-like flow
    const currentIndex = DOMAIN_COLUMN_ORDER.indexOf(domain)
    if (currentIndex < DOMAIN_COLUMN_ORDER.length - 1) {
      const nextDomain = DOMAIN_COLUMN_ORDER[currentIndex + 1]
      if (sel[nextDomain] === null) {
        setActiveTab(nextDomain)
      }
    }
  }

  const handleReset = () => {
    setSel({ ...INITIAL })
    setActiveTab('consciousness')
    setExpandedDetail(null)
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-foreground">Escala de Glasgow (MGCS)</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Apoio para avaliação de gravidade neurológica (TCE, traumas, etc.).
        </p>
      </div>

      {/* Domain Switcher Tabs */}
      <div className="flex rounded-xl bg-card border border-border p-1">
        {DOMAIN_COLUMN_ORDER.map((id) => {
          const d = getDomainById(id)
          const isSelected = sel[id] !== null
          const isActive = activeTab === id

          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                'flex-1 text-center py-2 text-[11px] font-bold rounded-lg transition-all',
                isActive
                  ? 'bg-gold text-black'
                  : isSelected
                    ? 'text-foreground'
                    : 'text-muted-foreground'
              )}
            >
              {d.shortTitle}
              {isSelected && (
                <span className="block font-mono text-[10px] opacity-80 mt-0.5">
                  ({sel[id]} pts)
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Active Tab Level Selector */}
      <div className="rounded-2xl border border-border bg-card/65 p-3 space-y-2">
        {(() => {
          const domain = getDomainById(activeTab)
          return (
            <>
              <div className="px-1 py-1 border-b border-border/60">
                <p className="text-[10px] font-semibold text-gold uppercase tracking-wider">
                  {domain.description}
                </p>
              </div>
              <div className="space-y-2">
                {[...domain.levels].reverse().map((row) => {
                  const active = sel[activeTab] === row.score
                  return (
                    <button
                      key={`${activeTab}-${row.score}`}
                      type="button"
                      onClick={() => setLevel(activeTab, row.score)}
                      className={cn(
                        'w-full text-left p-3 rounded-xl border flex items-start gap-3 transition-all',
                        active
                          ? 'bg-gold/15 border-gold ring-1 ring-gold/30'
                          : 'bg-background/40 border-border/80 active:bg-muted'
                      )}
                    >
                      <span className={cn(
                        'font-mono font-bold text-xs px-2 py-0.5 rounded-md flex items-center justify-center shrink-0',
                        active ? 'bg-gold text-black' : 'bg-gold/10 text-gold'
                      )}>
                        {row.score}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-xs text-foreground leading-tight">
                          {row.label}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-1 leading-snug">
                          {row.summary}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </>
          )
        })()}
      </div>

      {/* Expanded Selection Details */}
      <AnimatePresence>
        {expandedDetail && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-gold/25 bg-gold/5 p-3.5 text-xs"
          >
            {(() => {
              const d = getDomainById(expandedDetail.domain)
              const lvl = d.levels.find((l) => l.score === expandedDetail.score)
              if (!lvl) return null
              return (
                <div>
                  <p className="font-bold text-gold">
                    {d.shortTitle} · Nível {lvl.score}: {lvl.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                    {lvl.detail}
                  </p>
                </div>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calculation Results Card */}
      <div className="rounded-2xl border border-border bg-card p-4 space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-foreground text-sm">Resultado</h3>
          <span className="font-mono font-bold text-lg text-gold">
            {previewTotal} <span className="text-[10px] font-normal text-muted-foreground">/ 18</span>
          </span>
        </div>

        {complete ? (
          <div className="space-y-3">
            {band && (
              <div className="rounded-xl bg-background/55 border border-border/80 p-3 space-y-2">
                <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wide">
                  Faixa {band.band} · <span className="text-foreground normal-case font-semibold">{band.severity}</span>
                </p>
                <p className="text-xs text-foreground leading-relaxed">
                  {band.shortText}
                </p>
                {band.whatItSuggests.length > 0 && (
                  <div className="pt-1.5 border-t border-border/50">
                    <p className="text-[10px] font-bold text-gold/90">Sugestões / Gravidade:</p>
                    <ul className="list-disc list-inside mt-1 text-[11px] text-muted-foreground space-y-0.5">
                      {band.whatItSuggests.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={handleReset}
              className="w-full nm-btn nm-btn-secondary text-xs h-9"
            >
              Reiniciar escala
            </button>
          </div>
        ) : (
          <p className="text-[11px] text-muted-foreground text-center py-2">
            Selecione uma pontuação em cada um dos 3 domínios para ver o diagnóstico.
          </p>
        )}
      </div>

      {/* Accordion: Reference Tables & Clinical Context */}
      <div className="space-y-2.5">
        <button
          onClick={() => setShowReferences(!showReferences)}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-card border border-border text-xs font-semibold text-foreground active:bg-muted transition-all"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-gold" />
            Tabelas de Referência & Guia Clínico
          </span>
          {showReferences ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showReferences && (
          <div className="space-y-4 rounded-xl border border-border bg-card/45 p-3 nm-fade-in text-xs leading-relaxed text-muted-foreground">
            {/* Glasgow Levels reference tables summary */}
            {DOMAIN_COLUMN_ORDER.map((id) => {
              const d = getDomainById(id)
              return (
                <div key={id} className="space-y-1.5">
                  <h4 className="font-bold text-foreground border-b border-border/55 pb-1">
                    {d.shortTitle}
                  </h4>
                  <div className="space-y-1">
                    {[...d.levels].reverse().map((l) => (
                      <div key={l.score} className="flex gap-2">
                        <span className="font-mono text-gold font-bold w-4 shrink-0">{l.score}</span>
                        <div>
                          <strong className="text-foreground/90">{l.label}: </strong>
                          {l.summary}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* Context guidelines */}
            <div className="border-t border-border pt-3 space-y-2">
              <h4 className="font-bold text-foreground flex items-center gap-1.5">
                <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
                Guia Clínico e Prognóstico
              </h4>
              <p>
                <strong>TCE (traumatismo):</strong> queda na MGCS indica piora e urgência diagnóstica. Melhoras graduais sugerem bom prognóstico.
              </p>
              <p>
                <strong>Crise epiléptica:</strong> depressão pós-ictal pode mascarar um escore melhor temporariamente. Avalie novamente após o paciente se estabilizar.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
