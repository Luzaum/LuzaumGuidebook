import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../UI/Card'
import {
  Activity,
  AlertCircle,
  EyeOff,
  Footprints,
  Brain,
  Zap,
  MoveDiagonal,
  AlertTriangle,
  TrendingUp,
  Droplet,
  FlaskConical,
} from 'lucide-react'
import type { ComplaintContext } from '../../stores/caseStore'
import { ClockTimelinePicker } from '../Step2/ClockTimelinePicker'
import { DiseaseProgressionChips } from '../Step2/DiseaseProgressionChips'

interface Step2Props {
  complaint: ComplaintContext
  setComplaint: (patch: Partial<ComplaintContext>) => void
}

const COMPLAINTS = [
  // Convulsões e síncope
  {
    id: 'ConvulsaoFocal',
    icon: Zap,
    label: 'Convulsão Focal',
  },
  {
    id: 'ConvulsaoGeneralizada',
    icon: Zap,
    label: 'Convulsão Generalizada',
  },
  {
    id: 'ClusterConvulsoes',
    icon: Zap,
    label: 'Cluster de Convulsões',
  },
  {
    id: 'Sincope',
    icon: TrendingUp,
    label: 'Síncope / Colapso',
  },
  // Alterações de consciência e comportamento
  {
    id: 'AlteracaoConsciencia',
    icon: Brain,
    label: 'Alteração de Nível de Consciência',
  },
  {
    id: 'Comportamento',
    icon: Brain,
    label: 'Alteração Comportamental',
  },
  {
    id: 'AndarCirculos',
    icon: Activity,
    label: 'Andar em Círculos / Head Pressing',
  },
  // Cegueira e visão
  {
    id: 'Cegueira',
    icon: EyeOff,
    label: 'Cegueira Aguda',
  },
  {
    id: 'Anisocoria',
    icon: EyeOff,
    label: 'Anisocoria / Alteração Pupilar',
  },
  // Vestibular
  {
    id: 'HeadTilt',
    icon: Activity,
    label: 'Head Tilt (Cabeça Inclinada)',
  },
  {
    id: 'Vertigem',
    icon: Activity,
    label: 'Vertigem / Vômito Vestibular',
  },
  {
    id: 'Nistagmo',
    icon: Activity,
    label: 'Nistagmo',
  },
  // Locomoção e coordenação
  {
    id: 'Ataxia',
    icon: MoveDiagonal,
    label: 'Ataxia / Descoordenação',
  },
  {
    id: 'Paresia',
    icon: Footprints,
    label: 'Paresia / Paralisia',
  },
  {
    id: 'Tetraparesia',
    icon: Footprints,
    label: 'Tetraparesia',
  },
  {
    id: 'Paraparesia',
    icon: Footprints,
    label: 'Paraparesia',
  },
  {
    id: 'Hipermetria',
    icon: MoveDiagonal,
    label: 'Hipermetria / Tremor de Intenção',
  },
  // Dor espinhal
  {
    id: 'DorCervical',
    icon: AlertCircle,
    label: 'Dor Espinhal Cervical',
  },
  {
    id: 'DorToracolombar',
    icon: AlertCircle,
    label: 'Dor Espinhal Toracolombar',
  },
  {
    id: 'DorLombossacra',
    icon: AlertCircle,
    label: 'Dor Espinhal Lombossacra',
  },
  // Nervos cranianos e funções
  {
    id: 'DisfuncaoFacial',
    icon: AlertCircle,
    label: 'Disfunção de Nervo Facial',
  },
  {
    id: 'Disfagia',
    icon: Droplet,
    label: 'Disfagia / Regurgitação',
  },
  {
    id: 'Disfonia',
    icon: AlertCircle,
    label: 'Disfonia / Alteração de Voz',
  },
  // Funções autonômicas
  {
    id: 'DisfuncaoUrinaria',
    icon: Droplet,
    label: 'Disfunção Urinária / Fecal',
  },
  {
    id: 'IncontinenciaUrinaria',
    icon: Droplet,
    label: 'Incontinência Urinária',
  },
  {
    id: 'RetencaoUrinaria',
    icon: Droplet,
    label: 'Retenção Urinária',
  },
  // Outros
  {
    id: 'Tremores',
    icon: TrendingUp,
    label: 'Tremores / Mioclonias',
  },
  {
    id: 'FraquezaFlacida',
    icon: Footprints,
    label: 'Fraqueza Flácida / Intolerância ao Exercício',
  },
  {
    id: 'Colapso',
    icon: TrendingUp,
    label: 'Colapso Recorrente',
  },
  {
    id: 'Outros',
    icon: Activity,
    label: 'Outros Sinais',
  },
]

const RED_FLAGS = [
  {
    id: 'coma_estupor' as const,
    label: 'Coma / Estupor',
    tooltip: 'Alteração severa do nível de consciência',
  },
  {
    id: 'status_epilepticus' as const,
    label: 'Status Epilepticus / Cluster Grave',
    tooltip: 'Convulsões contínuas ou em cluster que requerem intervenção imediata',
  },
  {
    id: 'severe_progression_24h' as const,
    label: 'Piora Neurológica Rápida (<24h)',
    tooltip: 'Deterioração neurológica significativa em menos de 24 horas',
  },
  {
    id: 'acute_nonambulatory' as const,
    label: 'Não Ambulatório Agudo',
    tooltip: 'Perda súbita da capacidade de deambulação',
  },
  {
    id: 'respiratory_compromise' as const,
    label: 'Sinais Respiratórios / Aspiração (Disfagia)',
    tooltip: 'Dificuldade respiratória ou risco de aspiração devido a disfagia',
  },
  {
    id: 'deep_pain_loss' as const,
    label: 'Dor Profunda Ausente (se já avaliado)',
    tooltip: 'Perda de nocicepção profunda indica lesão neurológica grave',
  },
  {
    id: 'severe_cervical_pain' as const,
    label: 'Cervicalgia Intensa',
    tooltip: 'Dor cervical severa pode indicar instabilidade ou compressão',
  },
  {
    id: 'anisocoria_acute' as const,
    label: 'Anisocoria Aguda',
    tooltip: 'Diferença aguda no tamanho das pupilas pode indicar heriação ou lesão do III nervo',
  },
  {
    id: 'dysphagia_aspiration_risk' as const,
    label: 'Disfagia com Risco de Aspiração',
    tooltip: 'Dificuldade para deglutir aumenta risco de pneumonia aspirativa',
  },
]

export function Step2ChiefComplaint({ complaint, setComplaint }: Step2Props) {
  const [showOtherComplaints, setShowOtherComplaints] = useState(false)

  const toggleComplaint = (complaintId: string) => {
    const current = complaint.chiefComplaintIds
    const newComplaints = current.includes(complaintId)
      ? current.filter((c) => c !== complaintId)
      : [...current, complaintId]
    setComplaint({ chiefComplaintIds: newComplaints })
  }

  const toggleRedFlag = (flagId: string) => {
    const current = complaint.redFlags
    const newFlags = current.includes(flagId as any)
      ? current.filter((f) => f !== flagId)
      : [...current, flagId as any]
    setComplaint({ redFlags: newFlags })
  }

  const hasRedFlags = complaint.redFlags.length > 0

  return (
    <div className="space-y-8 pb-24">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <h2 className="text-2xl font-bold text-white mb-2">Queixa Principal</h2>
        <p className="text-neutral-400">
          Selecione um ou mais sinais observados.
        </p>
      </motion.div>

      {/* Cards de Queixa */}
      <div className="grid grid-cols-2 gap-4">
        {COMPLAINTS.filter((c) => c.id !== 'Outros' || showOtherComplaints).map((item) => {
          const isSelected = complaint.chiefComplaintIds.includes(item.id)
          const Icon = item.icon
          return (
            <motion.button
              key={item.id}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => {
                if (item.id === 'Outros') {
                  setShowOtherComplaints(!showOtherComplaints)
                } else {
                  toggleComplaint(item.id)
                }
              }}
              className="relative"
            >
              <Card
                className={`p-2 sm:p-4 h-32 flex flex-col items-center justify-center gap-2 sm:gap-3 transition-all duration-300 ${isSelected
                    ? 'border-gold bg-gold/10 ring-1 ring-gold shadow-[0_0_15px_rgba(245,197,66,0.2)]'
                    : 'hover:border-gold/50 hover:bg-white/5'
                  }`}
              >
                <Icon
                  size={32}
                  className={`transition-colors ${isSelected ? 'text-gold' : 'text-neutral-500'
                    }`}
                />
                <span
                  className={`text-xs sm:text-sm font-medium text-center leading-tight ${isSelected ? 'text-gold' : 'text-neutral-300'
                    }`}
                >
                  {item.label}
                </span>
              </Card>
            </motion.button>
          )
        })}
      </div>

      {/* Padrão Temporal com ClockTimelinePicker */}
      <Card>
        <label className="text-sm font-medium text-neutral-300 mb-4 block">
          Padrão Temporal (Obrigatório)
        </label>
        <ClockTimelinePicker
          value={complaint.temporalPattern}
          onChange={(pattern) => setComplaint({ temporalPattern: pattern })}
        />
      </Card>

      {/* Evolução com DiseaseProgressionChips */}
      <Card>
        <label className="text-sm font-medium text-neutral-300 mb-4 block">
          Evolução do Quadro
        </label>
        <DiseaseProgressionChips
          value={complaint.evolutionPattern}
          onChange={(pattern) => setComplaint({ evolutionPattern: pattern })}
        />
      </Card>

      {/* Contexto Clínico com Toggles */}
      <Card>
        <label className="text-sm font-medium text-neutral-300 mb-4 block">
          Contexto Clínico
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          <label className="flex items-center gap-2 p-3 rounded-lg border border-neutral-700 hover:border-gold/50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={complaint.trauma}
              onChange={(e) => setComplaint({ trauma: e.target.checked })}
              className="w-5 h-5 rounded border-neutral-600 text-gold focus:ring-gold bg-transparent"
            />
            <span className="text-sm text-neutral-200">Trauma</span>
          </label>

          <label className="flex items-center gap-2 p-3 rounded-lg border border-neutral-700 hover:border-gold/50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={complaint.toxin}
              onChange={(e) => setComplaint({ toxin: e.target.checked })}
              className="w-5 h-5 rounded border-neutral-600 text-gold focus:ring-gold bg-transparent"
            />
            <span className="text-sm text-neutral-200">Toxinas</span>
          </label>

          <label className="flex items-center gap-2 p-3 rounded-lg border border-neutral-700 hover:border-gold/50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={complaint.fever}
              onChange={(e) => setComplaint({ fever: e.target.checked })}
              className="w-5 h-5 rounded border-neutral-600 text-gold focus:ring-gold bg-transparent"
            />
            <span className="text-sm text-neutral-200">Febre</span>
          </label>

          <label className="flex items-center gap-2 p-3 rounded-lg border border-neutral-700 hover:border-gold/50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={complaint.ectoparasiticideExposure}
              onChange={(e) =>
                setComplaint({ ectoparasiticideExposure: e.target.checked })
              }
              className="w-5 h-5 rounded border-neutral-600 text-gold focus:ring-gold bg-transparent"
            />
            <span className="text-sm text-neutral-200">Exposição a Ectoparasiticidas</span>
          </label>

          <label className="flex items-center gap-2 p-3 rounded-lg border border-neutral-700 hover:border-gold/50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={complaint.systemicDisease}
              onChange={(e) => setComplaint({ systemicDisease: e.target.checked })}
              className="w-5 h-5 rounded border-neutral-600 text-gold focus:ring-gold bg-transparent"
            />
            <span className="text-sm text-neutral-200">Doença Sistêmica Recente</span>
          </label>

          <label className="flex items-center gap-2 p-3 rounded-lg border border-neutral-700 hover:border-gold/50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={complaint.recentSurgeryAnesthesia}
              onChange={(e) =>
                setComplaint({ recentSurgeryAnesthesia: e.target.checked })
              }
              className="w-5 h-5 rounded border-neutral-600 text-gold focus:ring-gold bg-transparent"
            />
            <span className="text-sm text-neutral-200">Cirurgia/Anestesia Recente</span>
          </label>
        </div>

        <textarea
          value={complaint.contextNotes}
          onChange={(e) => setComplaint({ contextNotes: e.target.value })}
          className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none min-h-[100px] resize-y"
          placeholder="Adicione observações adicionais sobre o contexto clínico, histórico, ou detalhes importantes do caso..."
        />
      </Card>

      {/* Red Flags - Painel Destacado */}
      <section className="space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-red-900/40 via-red-800/30 to-red-900/40 border-2 border-red-500/60 rounded-xl p-5 shadow-[0_0_20px_rgba(239,68,68,0.15)]"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle size={24} className="text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-300">
                ⚠️ ALERTAS - Sinais de Urgência (Red Flags)
              </h3>
              <p className="text-sm text-red-200/80 mt-1">
                Marque todos os sinais de alerta presentes. Estes indicam necessidade de intervenção imediata ou urgência neurológica.
              </p>
            </div>
          </div>

          {hasRedFlags && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 p-3 bg-red-950/50 border border-red-600/50 rounded-lg"
            >
              <p className="text-red-200 font-semibold text-sm">
                {complaint.redFlags.length} sinal(is) de alerta selecionado(s) — considerar estabilização imediata e referência para neurologia/cuidados intensivos se necessário.
              </p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {RED_FLAGS.map((flag) => {
              const isSelected = complaint.redFlags.includes(flag.id)
              return (
                <motion.label
                  key={flag.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all
                    ${isSelected
                      ? 'bg-red-500/20 border-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                      : 'bg-red-900/20 border-red-700/40 hover:bg-red-900/30 hover:border-red-600/50'
                    }
                  `}
                  title={flag.tooltip}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleRedFlag(flag.id)}
                    className="mt-1 w-5 h-5 rounded border-red-500 text-red-500 focus:ring-2 focus:ring-red-500 bg-transparent pointer-events-auto cursor-pointer"
                  />
                  <div className="flex-1">
                    <span className={`text-sm font-medium ${isSelected ? 'text-red-200' : 'text-neutral-200'}`}>
                      {flag.label}
                    </span>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{flag.tooltip}</p>
                  </div>
                </motion.label>
              )
            })}
          </div>
        </motion.div>
      </section>
    </div>
  )
}
