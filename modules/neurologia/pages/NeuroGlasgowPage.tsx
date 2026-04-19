import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MGCS_DOMAINS, MGCS_TOTAL_BANDS, interpretMgcsTotal, type MgcsDomainId } from '../data/glasgowMgcs'
import { Card } from '../components/UI/Card'
import { cn } from '../../../lib/utils'

type Selection = Record<MgcsDomainId, number | null>

const INITIAL: Selection = {
  motor: null,
  brainstem: null,
  consciousness: null,
}

/** Ordem visual: consciência | tronco | motor */
const DOMAIN_COLUMN_ORDER: MgcsDomainId[] = ['consciousness', 'brainstem', 'motor']

function getDomainById(id: MgcsDomainId) {
  return MGCS_DOMAINS.find((d) => d.id === id)!
}

/** Três tabelas de referência verticais (formato clássico MGCS) */
function MgcsReferenceVerticalTables() {
  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:gap-5">
      {DOMAIN_COLUMN_ORDER.map((id) => {
        const d = getDomainById(id)
        const subtitle =
          id === 'consciousness'
            ? 'Nível de consciência'
            : id === 'brainstem'
              ? 'Função do tronco encefálico (reflexos)'
              : 'Atividade motora'
        const orderedLevels = [...d.levels].sort((a, b) => b.score - a.score)

        return (
          <div
            key={id}
            className="overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-b from-card/90 to-card/40 shadow-[0_12px_40px_rgba(0,0,0,0.25)] ring-1 ring-gold/10"
          >
            <div className="border-b border-gold/20 bg-gradient-to-r from-gold/20 via-amber-500/10 to-transparent px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gold/95">{subtitle}</p>
              <h3 className="mt-0.5 text-base font-bold text-foreground">{d.shortTitle}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border/80 bg-background/40 text-[10px] uppercase tracking-wide text-muted-foreground sm:text-xs">
                    <th className="w-11 px-2 py-2 text-center font-semibold sm:w-12">Pts</th>
                    <th className="px-2 py-2 pr-3 font-semibold">Critério</th>
                  </tr>
                </thead>
                <tbody>
                  {orderedLevels.map((lvl, idx) => (
                    <tr
                      key={lvl.score}
                      className={cn(
                        'border-b border-border/40 transition-colors',
                        idx % 2 === 0 ? 'bg-background/25' : 'bg-background/10',
                        'hover:bg-gold/5',
                      )}
                    >
                      <td className="align-top px-2 py-2.5 text-center">
                        <span className="inline-flex min-w-[1.75rem] items-center justify-center rounded-lg bg-gold/15 px-1.5 py-0.5 font-mono text-sm font-bold tabular-nums text-gold">
                          {lvl.score}
                        </span>
                      </td>
                      <td className="px-1 py-2.5 pr-3 align-top">
                        <span className="font-semibold text-foreground">{lvl.label}</span>
                        <span className="mt-1 block text-[11px] leading-snug text-muted-foreground sm:text-xs">
                          {lvl.summary}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function NeuroGlasgowPage() {
  const [sel, setSel] = useState<Selection>(() => ({ ...INITIAL }))
  const [expanded, setExpanded] = useState<{ domain: MgcsDomainId; score: number } | null>(null)

  const previewTotal = (sel.motor ?? 0) + (sel.brainstem ?? 0) + (sel.consciousness ?? 0)
  const complete =
    sel.motor != null && sel.brainstem != null && sel.consciousness != null

  const band = useMemo(() => {
    if (!complete || previewTotal < 3 || previewTotal > 18) return null
    return interpretMgcsTotal(previewTotal)
  }, [complete, previewTotal])

  const setLevel = (domain: MgcsDomainId, score: number) => {
    setSel((prev) => ({ ...prev, [domain]: score }))
    setExpanded({ domain, score })
  }

  return (
    <div className="relative z-10 w-full space-y-8 pb-24">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Escala de coma de Glasgow modificada (MGCS)</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Escala veterinária em <strong>três domínios</strong>, cada um de <strong>1 (pior) a 6
          (melhor)</strong>. Pontuação total <strong>3–18</strong>. Valores não selecionados contam como{' '}
          <strong>0</strong> apenas na pré-visualização da soma.
        </p>
      </div>

      <section className="space-y-4">
        <div className="text-center lg:text-left">
          <h2 className="text-lg font-semibold text-foreground">Tabelas de referência</h2>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Três domínios independentes; em cada tabela, da melhor nota (6) à pior (1), como nas fichas
            clínicas originais.
          </p>
        </div>
        <MgcsReferenceVerticalTables />
      </section>

      <div>
        <h2 className="mb-2 text-base font-semibold text-foreground sm:text-lg">Seleção da pontuação</h2>
        <p className="mb-3 text-xs text-muted-foreground sm:text-sm">
          Toque em <strong>uma linha em cada coluna</strong> (consciência, tronco e motor). A seleção ativa
          fica destacada em cada coluna. Abaixo: detalhe do último nível tocado.
        </p>

        <div className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-2 md:overflow-visible md:pb-0 lg:gap-3">
          {DOMAIN_COLUMN_ORDER.map((domainId) => {
            const domain = getDomainById(domainId)
            const selectedScore = sel[domainId]

            return (
              <section
                key={domainId}
                className="flex min-w-[82vw] shrink-0 snap-center flex-col overflow-hidden rounded-xl border border-border bg-card/70 shadow-sm sm:min-w-[70vw] md:min-w-0"
              >
                <div className="border-b border-border/80 bg-background/50 px-2 py-2 sm:px-3">
                  <h3 className="text-center text-xs font-semibold leading-tight text-foreground sm:text-sm">
                    {domain.shortTitle}
                  </h3>
                  <p className="mt-0.5 line-clamp-2 text-center text-[10px] text-muted-foreground sm:text-[11px]">
                    {domain.description}
                  </p>
                  {selectedScore != null && (
                    <p className="mt-1.5 text-center text-[10px] font-medium text-gold sm:text-xs">
                      Selecionado: <span className="tabular-nums">{selectedScore}</span> / 6
                    </p>
                  )}
                </div>
                <div className="max-h-[min(52vh,28rem)] overflow-y-auto overscroll-contain">
                  <div className="flex flex-col">
                    {[...domain.levels].reverse().map((row) => {
                      const active = selectedScore === row.score
                      return (
                        <button
                          key={`${domainId}-${row.score}`}
                          type="button"
                          onClick={() => setLevel(domainId, row.score)}
                          aria-pressed={active}
                          className={cn(
                            'flex w-full cursor-pointer border-b border-border/40 text-left transition-colors',
                            active
                              ? 'bg-gold/30 ring-1 ring-inset ring-gold/50'
                              : 'bg-transparent hover:bg-muted/50',
                          )}
                        >
                          <div className="flex w-8 shrink-0 items-start justify-center px-1.5 py-2 sm:w-9 sm:px-2">
                            <span
                              className={cn(
                                'inline-flex min-w-[1.4rem] items-center justify-center rounded-md px-1 font-mono text-xs font-bold tabular-nums sm:text-sm',
                                active ? 'bg-gold/35 text-foreground' : 'text-gold',
                              )}
                            >
                              {row.score}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 px-1.5 py-2 pr-2 sm:px-2">
                            <div
                              className={cn(
                                'text-[11px] font-medium leading-tight sm:text-xs',
                                active ? 'text-foreground' : 'text-foreground',
                              )}
                            >
                              {row.label}
                            </div>
                            <div className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-muted-foreground">
                              {row.summary}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0 }}
            className="overflow-hidden rounded-2xl border border-gold/30 bg-gold/10 p-4 text-sm text-foreground"
          >
            {(() => {
              const d = MGCS_DOMAINS.find((x) => x.id === expanded.domain)
              const lvl = d?.levels.find((l) => l.score === expanded.score)
              if (!lvl) return null
              return (
                <div>
                  <p className="font-semibold">
                    {d?.shortTitle} — nível {lvl.score}: {lvl.label}
                  </p>
                  <p className="mt-2 text-muted-foreground">{lvl.summary}</p>
                  <p className="mt-3 leading-relaxed text-foreground/90">{lvl.detail}</p>
                </div>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground">Resultado</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Pré-visualização (zeros nos não selecionados):{' '}
          <span className="font-mono text-xl font-bold text-gold">{previewTotal}</span>
        </p>
        {complete && (
          <>
            <p className="mt-4 text-sm">
              Pontuação completa:{' '}
              <span className="font-mono text-2xl font-bold text-gold">{previewTotal}</span> / 18
            </p>
            {band && (
              <div className="mt-4 space-y-3 rounded-xl border border-border bg-background/60 p-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">
                    Faixa {band.band}{' '}
                    <span className="normal-case text-foreground">— {band.severity}</span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{band.shortText}</p>
                </div>
                {band.whatItSuggests.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gold/90">O que sugere / gravidade relativa</p>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                      {band.whatItSuggests.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {band.monitoring.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gold/90">Monitorização (orientativa)</p>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                      {band.monitoring.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground">Todas as faixas da pontuação total (3–18)</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cada faixa descreve gravidade global aproximada; a evolução serial importa mais que um único valor isolado.
        </p>
        <div className="mt-4 space-y-4">
          {MGCS_TOTAL_BANDS.map((row) => (
            <div
              key={row.band}
              className="rounded-xl border border-border/80 bg-background/40 p-4 text-sm text-foreground/90"
            >
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-mono font-bold text-gold">{row.band}</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{row.severity}</span>
              </div>
              <p className="mt-2 leading-relaxed text-muted-foreground">{row.summary}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-amber-500/20 bg-amber-500/5 p-6">
        <h2 className="text-lg font-semibold text-foreground">Contexto clínico e prognóstico (orientativo)</h2>
        <ul className="mt-4 list-inside list-disc space-y-3 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">TCE (traumatismo cranioencefálico):</strong> quedas abruptas
            da MGCS nas primeiras horas indicam piora e necessidade de reavaliação intensiva; estabilização
            ou melhora gradual costuma correlacionar com melhor desfecho, sempre junto à imagem e suporte.
          </li>
          <li>
            <strong className="text-foreground">Crises epilépticas / pós-ictal:</strong> depressão transitória
            de consciência pode reduzir a pontuação sem refletir lesão estrutural permanente; repetir após
            estabilização.
          </li>
          <li>
            <strong className="text-foreground">Encefalites, intoxicações e doenças metabólicas:</strong> a MGCS
            ajuda a seguir resposta ao tratamento etiológico; causas reversíveis podem normalizar a escala com
            terapia adequada.
          </li>
          <li>
            <strong className="text-foreground">Doenças crônicas (ex.: degenerativas):</strong> tendência a
            declínio lento; mudanças agudas sobre o basal devem buscar causa sobreagregada.
          </li>
        </ul>
        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          Esta ferramenta não substitui exame físico completo, diagnóstico por imagem ou julgamento clínico. A
          MGCS é um apoio à serialização e comunicação da gravidade neurológica.
        </p>
      </Card>
    </div>
  )
}
