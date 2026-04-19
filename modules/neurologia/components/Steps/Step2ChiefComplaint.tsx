import React from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Brain,
  CornerDownRight,
  Droplet,
  Ear,
  Eye,
  EyeOff,
  FlaskConical,
  Footprints,
  MoveDiagonal,
  Radio,
  Stethoscope,
  TrendingUp,
  Video,
  Zap,
} from 'lucide-react'
import { Card } from '../UI/Card'
import type { ComplaintContext } from '../../stores/caseStore'
import { ClockTimelinePicker } from '../Step2/ClockTimelinePicker'
import { DiseaseProgressionChips } from '../Step2/DiseaseProgressionChips'

interface Step2Props {
  complaint: ComplaintContext
  setComplaint: (patch: Partial<ComplaintContext>) => void
}

const COMPLAINTS = [
  { id: 'ConvulsaoFocal', icon: Zap, label: 'Convulsão focal' },
  { id: 'ConvulsaoGeneralizada', icon: Zap, label: 'Convulsão generalizada' },
  { id: 'ClusterConvulsoes', icon: Zap, label: 'Cluster de convulsões' },
  { id: 'Sincope', icon: TrendingUp, label: 'Síncope / colapso' },
  { id: 'AlteracaoConsciencia', icon: Brain, label: 'Alteração de nível de consciência' },
  { id: 'Comportamento', icon: Brain, label: 'Alteração comportamental' },
  { id: 'AndarCirculos', icon: Activity, label: 'Andar em círculos / head pressing' },
  { id: 'Cegueira', icon: EyeOff, label: 'Cegueira aguda' },
  { id: 'Anisocoria', icon: EyeOff, label: 'Anisocoria / alteração pupilar' },
  { id: 'HeadTilt', icon: Activity, label: 'Head tilt (cabeça inclinada)' },
  { id: 'HeadTurn', icon: CornerDownRight, label: 'Head turn (rotação sem tilt)' },
  { id: 'Vertigem', icon: Activity, label: 'Vertigem / vômito vestibular' },
  { id: 'Nistagmo', icon: Activity, label: 'Nistagmo' },
  { id: 'Ataxia', icon: MoveDiagonal, label: 'Ataxia / descoordenação' },
  { id: 'Paresia', icon: Footprints, label: 'Paresia / paralisia' },
  { id: 'Hemiparesia', icon: Footprints, label: 'Hemiparesia / assimetria motora' },
  { id: 'Tetraparesia', icon: Footprints, label: 'Tetraparesia' },
  { id: 'Paraparesia', icon: Footprints, label: 'Paraparesia' },
  { id: 'Hipermetria', icon: MoveDiagonal, label: 'Hipermetria / tremor de intenção' },
  { id: 'DorCervical', icon: AlertCircle, label: 'Dor espinhal cervical' },
  { id: 'DorToracolombar', icon: AlertCircle, label: 'Dor espinhal toracolombar' },
  { id: 'DorLombossacra', icon: AlertCircle, label: 'Dor espinhal lombossacra' },
  { id: 'RootSignature', icon: Stethoscope, label: 'Claudicação / “root signature”' },
  { id: 'DisfuncaoFacial', icon: AlertCircle, label: 'Disfunção de nervo facial' },
  { id: 'Horner', icon: Eye, label: 'Síndrome de Horner / miósis' },
  { id: 'Disfagia', icon: Droplet, label: 'Disfagia / regurgitação' },
  { id: 'Megaesofago', icon: Radio, label: 'Megaesôfago / regurgitação passiva' },
  { id: 'Disfonia', icon: AlertCircle, label: 'Disfonia / alteração de voz' },
  { id: 'DisfuncaoUrinaria', icon: Droplet, label: 'Disfunção urinária / fecal' },
  { id: 'IncontinenciaUrinaria', icon: Droplet, label: 'Incontinência urinária' },
  { id: 'RetencaoUrinaria', icon: Droplet, label: 'Retenção urinária' },
  { id: 'Tremores', icon: TrendingUp, label: 'Tremores / mioclonias' },
  { id: 'MovimentosInvoluntarios', icon: Activity, label: 'Movimentos involuntários / paroxismos' },
  { id: 'FraquezaFlacida', icon: Footprints, label: 'Fraqueza flácida / intolerância ao exercício' },
  { id: 'Colapso', icon: TrendingUp, label: 'Colapso recorrente' },
  { id: 'DorNeuropaticaAutomutilacao', icon: AlertTriangle, label: 'Automutilação / dor neuropática' },
  { id: 'EpisodiosIndefinidos', icon: Video, label: 'Episódios indefinidos (pedir vídeo)' },
  { id: 'Surdez', icon: Ear, label: 'Surdez / hipoacusia' },
  { id: 'VocalizacaoAlterada', icon: Radio, label: 'Vocalização alterada' },
  { id: 'Knuckling', icon: Footprints, label: 'Knuckling / dorso do pé' },
  { id: 'ArrastarPatas', icon: Footprints, label: 'Arrastar patas / escorregar' },
  { id: 'PosturaAnormal', icon: Activity, label: 'Postura anormal (rígido/opistótono)' },
  { id: 'EpisodioPosEtico', icon: Brain, label: 'Pós-ictal prolongado' },
  { id: 'MiocloniasFasciculacoes', icon: Zap, label: 'Mioclonias / fasciculações' },
  { id: 'TremorRepouso', icon: TrendingUp, label: 'Tremor de repouso' },
  { id: 'AnorexiaHidratacao', icon: Droplet, label: 'Apetite / hidratação alterados' },
  { id: 'PerdaPesoRapida', icon: TrendingUp, label: 'Perda de peso rápida + neurológico' },
  { id: 'CefaleiaReferida', icon: AlertCircle, label: 'Desconforto cefálico (relato)' },
  { id: 'Outros', icon: FlaskConical, label: 'Outros sinais' },
]

const RED_FLAGS = [
  { id: 'coma_estupor' as const, label: 'Coma / estupor', tooltip: 'Alteração severa do nível de consciência' },
  { id: 'status_epilepticus' as const, label: 'Status epilepticus / cluster grave', tooltip: 'Convulsões contínuas ou em cluster' },
  { id: 'seizures_uncontrolled' as const, label: 'Convulsões não controladas', tooltip: 'Frequência em ascensão ou brechas pós-ictais mínimas' },
  { id: 'severe_progression_24h' as const, label: 'Piora neurológica rápida (<24h)', tooltip: 'Deterioração neurológica significativa em menos de 24 horas' },
  { id: 'acute_nonambulatory' as const, label: 'Não ambulatório agudo', tooltip: 'Perda súbita da capacidade de deambular' },
  { id: 'respiratory_compromise' as const, label: 'Sinais respiratórios / aspiração', tooltip: 'Dificuldade respiratória ou risco de aspiração' },
  { id: 'deep_pain_loss' as const, label: 'Dor profunda ausente', tooltip: 'Perda de nocicepção profunda indica lesão grave' },
  { id: 'severe_cervical_pain' as const, label: 'Cervicalgia intensa', tooltip: 'Pode indicar instabilidade ou compressão importante' },
  { id: 'anisocoria_acute' as const, label: 'Anisocoria aguda', tooltip: 'Pode indicar herniação ou lesão do III nervo' },
  { id: 'suspected_intracranial_hipertension' as const, label: 'Suspeita de HIC / edema', tooltip: 'NIC: deterioração, déficits de tronco, convulsões refratárias' },
  { id: 'dysphagia_aspiration_risk' as const, label: 'Disfagia com risco de aspiração', tooltip: 'Aumenta risco de pneumonia aspirativa' },
  { id: 'active_coagulopathy' as const, label: 'Coagulopatia ativa', tooltip: 'Sangramento ou plaquetopenia — risco com procedimentos ou NIC' },
  { id: 'septic_or_systemic_shock' as const, label: 'Choque séptico / instabilidade', tooltip: 'Hipoperfusão sistémica com risco de lesão encefálica secundária' },
  { id: 'acute_blindness' as const, label: 'Cegueira súbita', tooltip: 'Perda visual aguda — priorizar causas oculares e intracranianas' },
  { id: 'hypoglycemia_suspect' as const, label: 'Hipoglicemia suspeita', tooltip: 'Tremores, convulsões ou letargia; confirmar glicemia' },
  {
    id: 'cervical_instability_trauma' as const,
    label: 'Trauma cervical / instabilidade',
    tooltip: 'Manuseio cuidadoso; evitar flexão/extensão forçada até avaliação',
  },
]

const CONTEXT_ITEMS = [
  { key: 'trauma' as const, label: 'Trauma', emoji: '🩹' },
  { key: 'toxin' as const, label: 'Toxinas', emoji: '☣️' },
  { key: 'fever' as const, label: 'Febre', emoji: '🌡️' },
  { key: 'ectoparasiticideExposure' as const, label: 'Exposição a ectoparasiticidas', emoji: '🧴' },
  { key: 'systemicDisease' as const, label: 'Doença sistêmica recente', emoji: '🫀' },
  { key: 'recentSurgeryAnesthesia' as const, label: 'Cirurgia / anestesia recente', emoji: '🏥' },
  { key: 'vaccinationOrTravel' as const, label: 'Vacinação / viagem / endêmico', emoji: '✈️' },
  { key: 'videoOfEpisode' as const, label: 'Vídeo do episódio disponível', emoji: '🎬' },
  { key: 'respiratoryGiSigns' as const, label: 'Sinais respiratórios ou GI', emoji: '🫁' },
  { key: 'anticonvulsantOrNeuroMeds' as const, label: 'Anticonvulsivante / medicação neurológica', emoji: '💊' },
  { key: 'recentMedChange' as const, label: 'Mudança de medicação / dose recente', emoji: '💉' },
]

export function Step2ChiefComplaint({ complaint, setComplaint }: Step2Props) {
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold text-foreground mb-2">Queixa principal</h2>
        <p className="text-muted-foreground">Selecione os sinais observados e qualifique o contexto clínico.</p>
      </motion.div>

      <div className="max-h-[min(72vh,40rem)] overflow-y-auto overscroll-contain pr-1 rounded-xl border border-border/40 bg-background/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
        {COMPLAINTS.map((item) => {
          const isSelected = complaint.chiefComplaintIds.includes(item.id)
          const Icon = item.icon
          return (
            <motion.button
              key={item.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleComplaint(item.id)}
              className="relative text-left"
            >
              <Card
                className={`h-32 flex flex-col items-start justify-center gap-2 transition-all duration-300 ${
                  isSelected
                    ? 'border-gold bg-gold/10 ring-1 ring-gold/50 shadow-[0_0_18px_rgba(245,197,66,0.22)]'
                    : 'hover:border-gold/45'
                }`}
              >
                <div className={`rounded-lg p-2 ${isSelected ? 'bg-gold/20 text-gold' : 'bg-muted text-muted-foreground'}`}>
                  <Icon size={20} />
                </div>
                <span className={`text-sm font-semibold ${isSelected ? 'text-gold' : 'text-foreground'}`}>{item.label}</span>
              </Card>
            </motion.button>
          )
        })}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Lista expandida: role o painel acima para ver todas as apresentações.</p>

      <Card>
        <label className="text-sm font-medium text-muted-foreground mb-4 block">Padrão temporal (obrigatório)</label>
        <ClockTimelinePicker
          value={complaint.temporalPattern}
          onChange={(pattern) => setComplaint({ temporalPattern: pattern })}
        />
      </Card>

      <Card>
        <label className="text-sm font-medium text-muted-foreground mb-4 block">Evolução do quadro</label>
        <DiseaseProgressionChips
          value={complaint.evolutionPattern}
          onChange={(pattern) => setComplaint({ evolutionPattern: pattern })}
        />
      </Card>

      <Card>
        <label className="text-sm font-medium text-muted-foreground mb-4 block">Contexto clínico</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {CONTEXT_ITEMS.map((item) => {
            const checked = Boolean(complaint[item.key])
            return (
              <motion.button
                key={item.key}
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => setComplaint({ [item.key]: !checked } as Partial<ComplaintContext>)}
                className={`rounded-xl border p-3 text-left transition ${
                  checked ? 'border-gold/65 bg-gold/12' : 'border-border bg-background hover:border-gold/45'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{item.emoji}</span>
                  <span className={`text-sm font-medium ${checked ? 'text-gold' : 'text-foreground'}`}>{item.label}</span>
                </div>
              </motion.button>
            )
          })}
        </div>

        <textarea
          value={complaint.contextNotes}
          onChange={(e) => setComplaint({ contextNotes: e.target.value })}
          className="w-full rounded-xl border border-border bg-background p-3 text-foreground outline-none focus:ring-2 focus:ring-gold/50 min-h-[100px] resize-y"
          placeholder="Observações adicionais de histórico e contexto clínico..."
        />
      </Card>

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
              <h3 className="text-xl font-bold text-red-300">Alertas de urgência (red flags)</h3>
              <p className="text-sm text-red-200/80 mt-1">Marque sinais de alerta presentes no paciente.</p>
            </div>
          </div>

          {hasRedFlags && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 p-3 bg-red-950/50 border border-red-600/50 rounded-lg"
            >
              <p className="text-red-200 font-semibold text-sm">
                {complaint.redFlags.length} sinal(is) de alerta selecionado(s).
              </p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {RED_FLAGS.map((flag) => {
              const isSelected = complaint.redFlags.includes(flag.id)
              return (
                <motion.label
                  key={flag.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-red-500/20 border-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                      : 'bg-red-900/20 border-red-700/40 hover:bg-red-900/30 hover:border-red-600/50'
                  }`}
                  title={flag.tooltip}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleRedFlag(flag.id)}
                    className="mt-1 w-5 h-5 rounded border-red-500 text-red-500 focus:ring-2 focus:ring-red-500 bg-transparent"
                  />
                  <div className="flex-1">
                    <span className={`text-sm font-medium ${isSelected ? 'text-red-200' : 'text-neutral-100'}`}>{flag.label}</span>
                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed">{flag.tooltip}</p>
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
