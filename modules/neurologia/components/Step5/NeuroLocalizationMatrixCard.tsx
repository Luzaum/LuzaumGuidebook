import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Brain, CheckCircle, ChevronDown, ChevronUp, Layers, MapPin, ShieldAlert, Sparkles } from 'lucide-react'
import { Card } from '../UI/Card'
import type { NeuroAxis } from '../../types/analysis'
import { NEURO_AXIS_LABELS_PT } from '../../data/axisLabelsPt'

interface NeuroLocalizationMatrixCardProps {
  detectedAxis?: NeuroAxis
  confidence?: number
}

interface AnatomicalRegionGuide {
  id: NeuroAxis
  name: string
  shortLabel: string
  subdivision: string
  thoracicLimbs: 'NMS' | 'NMI' | 'Normal' | 'Variável'
  pelvicLimbs: 'NMS' | 'NMI' | 'Normal' | 'Variável'
  hallmarks: string[]
  cranialNerves: string
  mentalStatus: string
  referenceBook: string
}

const REGION_GUIDES: AnatomicalRegionGuide[] = [
  {
    id: 'PROSENCEFALO',
    name: 'Prosencéfalo (Telencéfalo / Diencéfalo)',
    shortLabel: 'Prosencéfalo',
    subdivision: 'Cérebro anterior e tálamo',
    thoracicLimbs: 'Normal',
    pelvicLimbs: 'Normal',
    hallmarks: [
      'Alteração comportamental, andar em círculos (ipsiversivo) ou pressão de cabeça (head pressing)',
      'Déficits de reações posturais contralaterais à lesão com marcha frequentemente preservada',
      'Reflexos miotáticos espinhais normais em todos os 4 membros',
      'Crises epilépticas focais ou generalizadas frequentes',
    ],
    cranialNerves: 'Déficit de resposta à ameaça contralateral com reflexo pupilar preservado (I, II)',
    mentalStatus: 'Letargia, desorientação, estupor ou comportamento aberrante',
    referenceBook: "de Lahunta (5ª ed, Cap. 18) & Dewey (3ª ed, Cap. 3, p. 34)",
  },
  {
    id: 'TRONCO_ENCEFALICO',
    name: 'Tronco Encefálico (Mesencéfalo, Ponte, Bulbo)',
    shortLabel: 'Tronco Encefálico',
    subdivision: 'Centros vitais e núcleos dos pares III a XII',
    thoracicLimbs: 'NMS',
    pelvicLimbs: 'NMS',
    hallmarks: [
      'Tetraparesia ou hemiparesia com padrão NMS (espasticidade / hipertonia)',
      'Déficits de múltiplos pares cranianos (III ao XII)',
      'Estrabismo posicional / patológico, nistagmo espontâneo ou induzido',
      'Risco iminente de colapso cardiorrespiratório e herniação',
    ],
    cranialNerves: 'Déficits múltiplos característicos dos pares III a XII',
    mentalStatus: 'Obtundação grave, estupor a coma profundo',
    referenceBook: "de Lahunta (5ª ed, Cap. 8) & Dewey (3ª ed, Cap. 3, p. 36)",
  },
  {
    id: 'CEREBELO',
    name: 'Cerebelo',
    shortLabel: 'Cerebelo',
    subdivision: 'Coordenação e modulação motora',
    thoracicLimbs: 'Normal',
    pelvicLimbs: 'Normal',
    hallmarks: [
      'Ataxia cerebelar: dismetria, hipermetria (passos altos / ganso) e base ampla sem fraqueza (paresia ausente)',
      'Tremor de intenção (mais evidente na cabeça ao tentar apreender alimento)',
      'Reações posturais atrasadas com resposta subsequente exagerada (rebote)',
      'Reflexo de ameaça ausente ipsilateral com acuidade visual normal (sem déficit motor facial)',
    ],
    cranialNerves: 'Ameaça ausente com visão e PLR normais; possível nistagmo pendular/vestibulocerebelar',
    mentalStatus: 'Alerta e responsivo (consciência intacta)',
    referenceBook: "de Lahunta (5ª ed, Cap. 13) & Dewey (3ª ed, Cap. 3, p. 37)",
  },
  {
    id: 'MEDULA_C1_C5',
    name: 'Medula Cervical Cranial (C1–C5)',
    shortLabel: 'C1–C5 (Cervical Cranial)',
    subdivision: 'Segmentos medulares C1 a C5',
    thoracicLimbs: 'NMS',
    pelvicLimbs: 'NMS',
    hallmarks: [
      'Tetraparesia / tetraplegia espástica com ataxia proprioceptiva nos 4 membros (geralmente MP = MT)',
      'Reflexos espinhais normais a aumentados (hiper-reflexia) em todos os membros',
      'Tônus muscular aumentado nos 4 membros',
      'Possível dor cervical intensa com pescoço rígido e cabeça baixa',
    ],
    cranialNerves: 'Normais (exceto possível síndrome de Horner por trato simpático tectotegmentoespinhal)',
    mentalStatus: 'Alerta e normal',
    referenceBook: "Dewey & da Costa (3ª ed, Tab. 3.4, p. 43) & de Lahunta (Cap. 9)",
  },
  {
    id: 'MEDULA_C6_T2',
    name: 'Intumescência Cervicotorácica (C6–T2)',
    shortLabel: 'C6–T2 (Cervicotorácica)',
    subdivision: 'Segmentos da intumescência braquial',
    thoracicLimbs: 'NMI',
    pelvicLimbs: 'NMS',
    hallmarks: [
      'Padrão clássico de "dois motores": NMI nos membros torácicos e NMS nos membros pélvicos',
      'Hiporreflexia ou arreflexia nos membros torácicos (flexor/radial diminuído) com reflexos normais/hiper nos pélvicos',
      'Atrofia muscular precoce e hipotonia nos membros torácicos',
      'Passada curta nos membros torácicos com passada longa/espástica nos pélvicos (marcha "two-engine")',
      'Possível síndrome de Horner ipsilateral e reflexo cutâneo do tronco ausente ipsilateral (n. torácico lateral C8-T1)',
    ],
    cranialNerves: 'Normais (exceto síndrome de Horner)',
    mentalStatus: 'Alerta e normal',
    referenceBook: "Dewey & da Costa (3ª ed, Tab. 3.4, p. 43) & de Lahunta (Cap. 9)",
  },
  {
    id: 'MEDULA_T3_L3',
    name: 'Medula Toracolombar (T3–L3)',
    shortLabel: 'T3–L3 (Toracolombar)',
    subdivision: 'Segmentos medulares T3 a L3',
    thoracicLimbs: 'Normal',
    pelvicLimbs: 'NMS',
    hallmarks: [
      'Membros torácicos estritamente normais; paraparesia ou paraplegia espástica nos membros pélvicos',
      'Reflexos espinhais dos membros pélvicos normais a hiperativos (patelar, tibial cranial, flexor)',
      'Bexiga espástica / NMS (difícil de esvaziar manualmente, tônus de esfíncter aumentado)',
      'Fenômeno de Schiff-Sherrington em lesões graves (hipertonia extensora dos membros torácicos sem déficit funcional)',
      'Linha de interrupção (cutoff) do reflexo cutâneo do tronco geralmente 1 a 2 vértebras caudal à lesão',
    ],
    cranialNerves: 'Normais',
    mentalStatus: 'Alerta e normal',
    referenceBook: "Dewey & da Costa (3ª ed, Tab. 3.4, p. 43) & de Lahunta (Cap. 9)",
  },
  {
    id: 'MEDULA_L4_S3',
    name: 'Intumescência Lombossacra e Cauda Equina (L4–S3)',
    shortLabel: 'L4–S3 (Lombossacra)',
    subdivision: 'Segmentos da intumescência lombossacra',
    thoracicLimbs: 'Normal',
    pelvicLimbs: 'NMI',
    hallmarks: [
      'Membros torácicos normais; paraparesia ou monoparesia flácida nos membros pélvicos',
      'L4-L6: Reflexo patelar diminuído/ausente (n. femoral)',
      'L6-S1: Reflexo flexor/isquiático diminuído/ausente (n. isquiático); pseudohiper-reflexia patelar possível',
      'S1-S3: Reflexo perineal ausente, ânus atônico, bexiga flácida / NMI (gotejamento fácil e perda de tônus esfincteriano)',
      'Cd1-Cd5: Paresia ou paralisia de cauda',
    ],
    cranialNerves: 'Normais',
    mentalStatus: 'Alerta e normal',
    referenceBook: "Dewey & da Costa (3ª ed, Tab. 3.4, p. 43) & de Lahunta (Cap. 9)",
  },
  {
    id: 'NEUROMUSCULAR',
    name: 'Sistema Nervoso Periférico, JNM e Músculo',
    shortLabel: 'SNP / JNM / Músculo',
    subdivision: 'Nervos periféricos, junção neuromuscular e miopatias',
    thoracicLimbs: 'NMI',
    pelvicLimbs: 'NMI',
    hallmarks: [
      'Fraqueza generalizada (tetraparesia flácida) com ausência de ataxia proprioceptiva verdadeira',
      'Reflexos espinhais globalmente diminuídos ou ausentes (neuropatias) ou fatigáveis (miastenia gravis)',
      'Tônus muscular reduzido, atrofia muscular rápida neurogênica (neuropatias) ou mialgia (miopatias)',
      'Possível disfonia, megaesôfago e fraqueza de musculatura facial',
    ],
    cranialNerves: 'Possível acometimento de pares (ex.: n. facial, faríngeo/laríngeo em polirradiculoneurite / miastenia)',
    mentalStatus: 'Alerta e responsivo (a não ser por exaustão sistêmica)',
    referenceBook: "Dewey & da Costa (3ª ed, Tab. 3.5, p. 45) & de Lahunta (Cap. 5)",
  },
]

export function NeuroLocalizationMatrixCard({
  detectedAxis,
  confidence,
}: NeuroLocalizationMatrixCardProps) {
  const [selectedAxis, setSelectedAxis] = useState<NeuroAxis>(detectedAxis || 'MEDULA_T3_L3')
  const [showFullMatrix, setShowFullMatrix] = useState(false)

  const currentGuide = REGION_GUIDES.find((g) => g.id === selectedAxis) || REGION_GUIDES[5]

  return (
    <Card className="border-gold/30 bg-card/90 shadow-lg p-5 sm:p-6 space-y-5">
      {/* Header do Guia de Neurolocalização */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-border/80 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
            <BookOpen className="h-3.5 w-3.5" />
            GUIA DE APOIO À NEUROLOCALIZAÇÃO CLÍNICA
          </div>
          <h3 className="mt-2 text-lg sm:text-xl font-bold text-foreground">
            Matriz Anatômica NMS vs NMI (de Lahunta & Dewey)
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-2xl">
            Este módulo não substitui o raciocínio soberano do médico-veterinário: organiza e compara
            sistematicamente os sinais clínicos para fundamentar a localização topográfica da lesão.
          </p>
        </div>

        {detectedAxis && (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/30 px-4 py-3 text-left sm:text-right shrink-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              Sugestão do Caso
            </p>
            <p className="mt-0.5 text-sm font-bold text-foreground">
              {NEURO_AXIS_LABELS_PT[detectedAxis]}
            </p>
            {confidence != null && (
              <span className="mt-1 inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                ~{Math.round(confidence)}% de concordância
              </span>
            )}
          </div>
        )}
      </div>

      {/* Segment Selector Chips */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
          Selecione a região para consultar critérios anatômicos:
        </p>
        <div className="flex flex-wrap gap-2">
          {REGION_GUIDES.map((guide) => {
            const isSelected = selectedAxis === guide.id
            const isDetected = detectedAxis === guide.id
            return (
              <button
                key={guide.id}
                type="button"
                onClick={() => setSelectedAxis(guide.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-gold text-slate-950 shadow-md ring-2 ring-gold/50'
                    : isDetected
                      ? 'bg-emerald-500/15 border border-emerald-500 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25'
                      : 'bg-muted/70 border border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>{guide.shortLabel}</span>
                {isDetected && !isSelected && (
                  <span className="ml-1 rounded-full bg-emerald-500/30 px-1.5 py-0.2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                    caso
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Detailed Card for the Selected Region */}
      {currentGuide && (
        <div className="rounded-2xl border border-border bg-muted/20 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border/60 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-foreground">
                {currentGuide.name}
              </h4>
              <p className="text-xs text-muted-foreground">{currentGuide.subdivision}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm">
                Torácicos: <strong className="text-gold">{currentGuide.thoracicLimbs}</strong>
              </span>
              <span className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm">
                Pélvicos: <strong className="text-gold">{currentGuide.pelvicLimbs}</strong>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sinais Cardinais */}
            <div className="rounded-xl border border-border/80 bg-card p-4 space-y-2.5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Sinais Cardinais e Semiologia
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-foreground/90">
                {currentGuide.hallmarks.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pares Cranianos, Consciência e Referência */}
            <div className="space-y-3">
              <div className="rounded-xl border border-border/80 bg-card p-4 space-y-1.5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                  Pares Cranianos & Consciência
                </p>
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                  <strong className="text-muted-foreground">Pares Cranianos:</strong> {currentGuide.cranialNerves}
                </p>
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed pt-1">
                  <strong className="text-muted-foreground">Estado Mental:</strong> {currentGuide.mentalStatus}
                </p>
              </div>

              <div className="rounded-xl border border-gold/20 bg-gold/5 p-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>📚 <strong>Referência:</strong> {currentGuide.referenceBook}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Quick Reference Table */}
      <div>
        <button
          type="button"
          onClick={() => setShowFullMatrix((v) => !v)}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gold hover:underline"
        >
          {showFullMatrix ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {showFullMatrix ? 'Ocultar tabela comparativa geral de segmentos' : 'Ver tabela comparativa geral NMS vs NMI (todas as regiões)'}
        </button>

        <AnimatePresence>
          {showFullMatrix && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 overflow-x-auto rounded-2xl border border-border bg-card shadow-sm"
            >
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-muted-foreground font-semibold">
                    <th className="p-3">Região Anatômica</th>
                    <th className="p-3 text-center">Membros Torácicos</th>
                    <th className="p-3 text-center">Membros Pélvicos</th>
                    <th className="p-3">Reflexos e Particularidades</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {REGION_GUIDES.map((g) => (
                    <tr key={g.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-semibold text-foreground">{g.name}</td>
                      <td className="p-3 text-center font-bold text-gold">{g.thoracicLimbs}</td>
                      <td className="p-3 text-center font-bold text-gold">{g.pelvicLimbs}</td>
                      <td className="p-3 text-muted-foreground text-xs">{g.hallmarks[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  )
}
