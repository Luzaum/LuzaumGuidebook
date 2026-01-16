import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, CheckCircle2, Circle } from 'lucide-react'
import { NeuroExam } from '../../types'
import { HelpButton } from '../UI/HelpButton'
import { HelpModal } from '../UI/HelpModal'
import {
  getHelpTopicComplete,
  requireHelpId,
} from '../../lib/help/helpTopicsComplete'

interface Step3Props {
  exam: NeuroExam
  updateExam: (key: string, value: any) => void
}

interface SectionHeaderProps {
  title: string
  helpTopicId: string
  progress: {
    filled: number
    total: number
  }
  isOpen: boolean
  onToggle: () => void
  onHelpClick: (id: string) => void
}

function SectionHeader({
  title,
  helpTopicId,
  progress,
  isOpen,
  onToggle,
  onHelpClick,
}: SectionHeaderProps) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gold/5 to-transparent border-b border-gold/20 hover:from-gold/10 transition-all group"
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="text-left flex-1">
          <h3 className="text-lg font-bold text-foreground group-hover:text-gold transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="text-xs text-muted-foreground">
              {progress.filled}/{progress.total} itens preenchidos
            </div>
            {progress.filled === progress.total && progress.total > 0 && (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            )}
          </div>
        </div>
        <HelpButton
          onClick={(e) => {
            e?.stopPropagation()
            onHelpClick(helpTopicId)
          }}
        />
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gold" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
    </button>
  )
}

interface SectionIntroProps {
  text: string
  howToObserve: string[]
}

function SectionIntro({ text, howToObserve }: SectionIntroProps) {
  return (
    <div className="p-4 bg-blue-900/10 border-l-4 border-blue-500 rounded-r-lg mb-4">
      <p className="text-sm text-foreground/90 leading-relaxed mb-3">{text}</p>
      <div className="space-y-1">
        <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
          Como observar:
        </p>
        <ul className="space-y-1">
          {howToObserve.map((item, idx) => (
            <li key={idx} className="text-xs text-foreground/80 flex gap-2">
              <span className="text-blue-400">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

interface ExamItemProps {
  label: string
  helpTopicId: string
  howToTestSummary: string
  options: Array<{
    value: string
    label: string
    helpTopicId: string
  }>
  currentValue: any
  onSelect: (value: string) => void
  onHelpClick: (id: string) => void
}

function ExamItem({
  label,
  helpTopicId,
  howToTestSummary,
  options,
  currentValue,
  onSelect,
  onHelpClick,
}: ExamItemProps) {
  return (
    <div className="p-4 bg-card border border-border rounded-xl hover:border-gold/30 transition-all">
      <div className="flex items-center gap-2 mb-2">
        <label className="text-sm font-semibold text-foreground">{label}</label>
        <HelpButton onClick={() => onHelpClick(helpTopicId)} size="sm" />
      </div>
      <p className="text-xs text-muted-foreground italic mb-3">
        {howToTestSummary}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = currentValue === opt.value
          const isNormal =
            opt.value === 'Normal' ||
            opt.value === 'Alerta' ||
            opt.value === 'Presente' ||
            (opt.value === 'Ausente' && label.includes('Dor'))
          const isAltered =
            opt.value === 'Alterado' ||
            opt.value === 'Coma' ||
            opt.value === 'Estupor' ||
            opt.value === 'Severa' ||
            opt.value === 'Plegia'
          return (
            <div key={opt.value} className="flex items-center gap-1">
              <motion.button
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() => onSelect(opt.value)}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium border-2 transition-all flex items-center gap-2
                  ${
                    isSelected
                      ? isNormal
                        ? 'bg-green-900/30 border-green-500 text-green-400 shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                        : isAltered
                        ? 'bg-red-900/30 border-red-500 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                        : 'bg-gold/20 border-gold text-gold shadow-[0_0_12px_rgba(245,197,66,0.3)]'
                      : 'bg-card border-border text-muted-foreground hover:border-gold/50 hover:text-foreground'
                  }
                `}
              >
                {isSelected ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
                {opt.label}
              </motion.button>
              <HelpButton onClick={() => onHelpClick(opt.helpTopicId)} size="sm" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Step3NeuroExam({ exam, updateExam }: Step3Props) {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  })
  const [helpModalOpen, setHelpModalOpen] = useState(false)
  const [currentHelpTopicId, setCurrentHelpTopicId] = useState<string | null>(
    null,
  )

  const toggleSection = (section: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const openHelp = (topicId: string) => {
    setCurrentHelpTopicId(requireHelpId(topicId))
    setHelpModalOpen(true)
  }

  const getProgress = (keys: string[]) => {
    const filled = keys.filter(
      (key) => exam.findings[key] !== undefined && exam.findings[key] !== null,
    ).length
    return {
      filled,
      total: keys.length,
    }
  }

  return (
    <div className="space-y-4 pb-24">
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
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Exame Neurológico
        </h2>
        <p className="text-muted-foreground text-sm">
          Avalie cada sistema sistematicamente. Todos os itens possuem
          orientação clínica detalhada (botão "?").
        </p>
      </motion.div>

      {/* SEÇÃO 1: MENTAÇÃO E COMPORTAMENTO */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
        <SectionHeader
          title="1. Mentação e Comportamento"
          helpTopicId="sec_mentation_behavior"
          progress={getProgress(['mentation', 'behavior', 'head_posture'])}
          isOpen={openSections[1]}
          onToggle={() => toggleSection(1)}
          onHelpClick={openHelp}
        />
        {openSections[1] && (
          <div className="p-4 space-y-4">
            <SectionIntro
              text="Você está avaliando nível de consciência (capacidade de manter vigília) e conteúdo mental (cognição/comportamento). Nível de consciência depende do ARAS (sistema reticular ativador ascendente) no tronco encefálico + projeções para tálamo/córtex. Conteúdo mental/comportamento depende principalmente de prosencéfalo (córtex e sistema límbico). Padrão útil: alteração de consciência sugere tronco encefálico/difuso; alteração comportamental com consciência preservada sugere prosencéfalo."
              howToObserve={[
                'Observar responsividade espontânea ao ambiente',
                'Avaliar resposta a chamados e estímulos táteis',
                'Comparar com comportamento basal relatado pelo tutor',
              ]}
            />

            <ExamItem
              label="Nível de Consciência"
              helpTopicId="test_consciousness"
              howToTestSummary="Observe responsividade espontânea, depois chamada/estímulo tátil; nociceptivo só se necessário."
              options={[
                {
                  value: 'Alerta',
                  label: 'Alerta',
                  helpTopicId: 'opt_conscious_alert',
                },
                {
                  value: 'Deprimido',
                  label: 'Deprimido',
                  helpTopicId: 'opt_conscious_depressed',
                },
                {
                  value: 'Estupor',
                  label: 'Estupor',
                  helpTopicId: 'opt_conscious_stupor',
                },
                {
                  value: 'Coma',
                  label: 'Coma',
                  helpTopicId: 'opt_conscious_coma',
                },
              ]}
              currentValue={exam.findings['mentation']}
              onSelect={(value) => updateExam('mentation', value)}
              onHelpClick={openHelp}
            />

            <ExamItem
              label="Comportamento"
              helpTopicId="test_behavior"
              howToTestSummary="Observe interação, resposta ao ambiente, reatividade e sinais de dor/medo."
              options={[
                {
                  value: 'Normal',
                  label: 'Normal',
                  helpTopicId: 'opt_behavior_normal',
                },
                {
                  value: 'Desorientado',
                  label: 'Desorientado',
                  helpTopicId: 'opt_behavior_disoriented',
                },
                {
                  value: 'Agressivo',
                  label: 'Agressivo',
                  helpTopicId: 'opt_behavior_aggressive',
                },
                {
                  value: 'Vocalização',
                  label: 'Vocalização',
                  helpTopicId: 'opt_behavior_vocalization',
                },
              ]}
              currentValue={exam.findings['behavior']}
              onSelect={(value) => updateExam('behavior', value)}
              onHelpClick={openHelp}
            />

            <ExamItem
              label="Postura da Cabeça"
              helpTopicId="test_head_posture"
              howToTestSummary="Observe posição da cabeça em repouso e durante movimento."
              options={[
                {
                  value: 'Normal',
                  label: 'Normal',
                  helpTopicId: 'opt_headposture_normal',
                },
                {
                  value: 'Head Tilt',
                  label: 'Head Tilt',
                  helpTopicId: 'opt_headposture_headtilt',
                },
                {
                  value: 'Opistótono',
                  label: 'Opistótono',
                  helpTopicId: 'opt_headposture_opisthotonus',
                },
                {
                  value: 'Cabeça Baixa',
                  label: 'Cabeça Baixa',
                  helpTopicId: 'opt_headposture_headlow',
                },
              ]}
              currentValue={exam.findings['head_posture']}
              onSelect={(value) => updateExam('head_posture', value)}
              onHelpClick={openHelp}
            />
          </div>
        )}
      </div>

      {/* SEÇÃO 2: MARCHA E POSTURA */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
        <SectionHeader
          title="2. Marcha e Postura"
          helpTopicId="sec_gait_posture"
          progress={getProgress([
            'ambulation',
            'gait_thoracic',
            'gait_pelvic',
            'ataxia_type',
          ])}
          isOpen={openSections[2]}
          onToggle={() => toggleSection(2)}
          onHelpClick={openHelp}
        />
        {openSections[2] && (
          <div className="p-4 space-y-4">
            <SectionIntro
              text="Aqui você diferencia fraqueza (paresia/plegia) de descoordenação (ataxia). Fraqueza reflete falha em vias motoras (UMN/LMN), junção neuromuscular ou músculo. Ataxia reflete falha de propriocepção, vestibular ou cerebelo. O padrão 'quais membros' + 'tipo' orienta a neuro-localização."
              howToObserve={[
                'Observar paciente caminhando em linha reta',
                'Avaliar base de sustentação, passos, quedas',
                'Testar viradas e manobras em piso antiderrapante',
              ]}
            />

            <ExamItem
              label="Capacidade de Deambular"
              helpTopicId="test_ambulation"
              howToTestSummary="Observe se o paciente consegue se movimentar sem auxílio."
              options={[
                {
                  value: 'Ambulatório',
                  label: 'Ambulatório',
                  helpTopicId: 'opt_ambulation_ambulatory',
                },
                {
                  value: 'Com Apoio',
                  label: 'Com Apoio',
                  helpTopicId: 'opt_ambulation_supported',
                },
                {
                  value: 'Não Ambulatório',
                  label: 'Não Ambulatório',
                  helpTopicId: 'opt_ambulation_nonambulatory',
                },
                {
                  value: 'Plegia',
                  label: 'Plegia',
                  helpTopicId: 'opt_ambulation_plegia',
                },
              ]}
              currentValue={exam.findings['ambulation']}
              onSelect={(value) => updateExam('ambulation', value)}
              onHelpClick={openHelp}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ExamItem
                label="Membros Torácicos"
                helpTopicId="test_gait_thoracic"
                howToTestSummary="Avalie força e coordenação dos membros anteriores."
                options={[
                  {
                    value: 'Normal',
                    label: 'Normal',
                    helpTopicId: 'opt_gait_normal',
                  },
                  {
                    value: 'Ataxia',
                    label: 'Ataxia',
                    helpTopicId: 'opt_gait_ataxia',
                  },
                  {
                    value: 'Paresia',
                    label: 'Paresia',
                    helpTopicId: 'opt_gait_paresis',
                  },
                  {
                    value: 'Plegia',
                    label: 'Plegia',
                    helpTopicId: 'opt_gait_plegia',
                  },
                ]}
                currentValue={exam.findings['gait_thoracic']}
                onSelect={(value) => updateExam('gait_thoracic', value)}
                onHelpClick={openHelp}
              />

              <ExamItem
                label="Membros Pélvicos"
                helpTopicId="test_gait_pelvic"
                howToTestSummary="Avalie força e coordenação dos membros posteriores."
                options={[
                  {
                    value: 'Normal',
                    label: 'Normal',
                    helpTopicId: 'opt_gait_normal',
                  },
                  {
                    value: 'Ataxia',
                    label: 'Ataxia',
                    helpTopicId: 'opt_gait_ataxia',
                  },
                  {
                    value: 'Paresia',
                    label: 'Paresia',
                    helpTopicId: 'opt_gait_paresis',
                  },
                  {
                    value: 'Plegia',
                    label: 'Plegia',
                    helpTopicId: 'opt_gait_plegia',
                  },
                ]}
                currentValue={exam.findings['gait_pelvic']}
                onSelect={(value) => updateExam('gait_pelvic', value)}
                onHelpClick={openHelp}
              />
            </div>

            <ExamItem
              label="Tipo de Ataxia (se houver)"
              helpTopicId="test_ataxia_type"
              howToTestSummary="Identifique o padrão de descoordenação para localizar a lesão."
              options={[
                {
                  value: 'Ausente',
                  label: 'Ausente',
                  helpTopicId: 'opt_ataxia_none',
                },
                {
                  value: 'Proprioceptiva',
                  label: 'Proprioceptiva',
                  helpTopicId: 'opt_ataxia_proprioceptive',
                },
                {
                  value: 'Vestibular',
                  label: 'Vestibular',
                  helpTopicId: 'opt_ataxia_vestibular',
                },
                {
                  value: 'Cerebelar',
                  label: 'Cerebelar',
                  helpTopicId: 'opt_ataxia_cerebelar',
                },
              ]}
              currentValue={exam.findings['ataxia_type']}
              onSelect={(value) => updateExam('ataxia_type', value)}
              onHelpClick={openHelp}
            />
          </div>
        )}
      </div>

      {/* SEÇÃO 3: REAÇÕES POSTURAIS */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
        <SectionHeader
          title="3. Reações Posturais (Propriocepção)"
          helpTopicId="sec_postural_reactions"
          progress={getProgress([
            'proprioception_thoracic_left',
            'proprioception_thoracic_right',
            'proprioception_pelvic_left',
            'proprioception_pelvic_right',
          ])}
          isOpen={openSections[3]}
          onToggle={() => toggleSection(3)}
          onHelpClick={openHelp}
        />
        {openSections[3] && (
          <div className="p-4 space-y-4">
            <SectionIntro
              text="Reações posturais são testes de via longa: aferência proprioceptiva + integração (medula/tronco/córtex) + eferência motora. São muito sensíveis para disfunção neurológica, mas a localização depende do padrão com os demais achados."
              howToObserve={[
                'Propriocepção (knuckling): virar pata e observar correção',
                'Hopping: deslocar lateralmente e observar salto',
                'Sempre comparar lados (lateralização é crucial)',
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ExamItem
                label="Torácico Esquerdo"
                helpTopicId="test_postural_thoracic_left"
                howToTestSummary="Teste propriocepção e hopping do membro anterior esquerdo."
                options={[
                  {
                    value: 'Normal',
                    label: 'Normal',
                    helpTopicId: 'opt_postural_normal',
                  },
                  {
                    value: 'Diminuído',
                    label: 'Diminuído',
                    helpTopicId: 'opt_postural_decreased',
                  },
                  {
                    value: 'Ausente',
                    label: 'Ausente',
                    helpTopicId: 'opt_postural_absent',
                  },
                ]}
                currentValue={exam.findings['proprioception_thoracic_left']}
                onSelect={(value) =>
                  updateExam('proprioception_thoracic_left', value)
                }
                onHelpClick={openHelp}
              />

              <ExamItem
                label="Torácico Direito"
                helpTopicId="test_postural_thoracic_right"
                howToTestSummary="Teste propriocepção e hopping do membro anterior direito."
                options={[
                  {
                    value: 'Normal',
                    label: 'Normal',
                    helpTopicId: 'opt_postural_normal',
                  },
                  {
                    value: 'Diminuído',
                    label: 'Diminuído',
                    helpTopicId: 'opt_postural_decreased',
                  },
                  {
                    value: 'Ausente',
                    label: 'Ausente',
                    helpTopicId: 'opt_postural_absent',
                  },
                ]}
                currentValue={exam.findings['proprioception_thoracic_right']}
                onSelect={(value) =>
                  updateExam('proprioception_thoracic_right', value)
                }
                onHelpClick={openHelp}
              />

              <ExamItem
                label="Pélvico Esquerdo"
                helpTopicId="test_postural_pelvic_left"
                howToTestSummary="Teste propriocepção e hopping do membro posterior esquerdo."
                options={[
                  {
                    value: 'Normal',
                    label: 'Normal',
                    helpTopicId: 'opt_postural_normal',
                  },
                  {
                    value: 'Diminuído',
                    label: 'Diminuído',
                    helpTopicId: 'opt_postural_decreased',
                  },
                  {
                    value: 'Ausente',
                    label: 'Ausente',
                    helpTopicId: 'opt_postural_absent',
                  },
                ]}
                currentValue={exam.findings['proprioception_pelvic_left']}
                onSelect={(value) =>
                  updateExam('proprioception_pelvic_left', value)
                }
                onHelpClick={openHelp}
              />

              <ExamItem
                label="Pélvico Direito"
                helpTopicId="test_postural_pelvic_right"
                howToTestSummary="Teste propriocepção e hopping do membro posterior direito."
                options={[
                  {
                    value: 'Normal',
                    label: 'Normal',
                    helpTopicId: 'opt_postural_normal',
                  },
                  {
                    value: 'Diminuído',
                    label: 'Diminuído',
                    helpTopicId: 'opt_postural_decreased',
                  },
                  {
                    value: 'Ausente',
                    label: 'Ausente',
                    helpTopicId: 'opt_postural_absent',
                  },
                ]}
                currentValue={exam.findings['proprioception_pelvic_right']}
                onSelect={(value) =>
                  updateExam('proprioception_pelvic_right', value)
                }
                onHelpClick={openHelp}
              />
            </div>
          </div>
        )}
      </div>

      {/* SEÇÃO 4: NERVOS CRANIANOS */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
        <SectionHeader
          title="4. Nervos Cranianos"
          helpTopicId="sec_cranial_nerves"
          progress={getProgress([
            'menace_left',
            'menace_right',
            'plr_left',
            'plr_right',
            'nystagmus',
            'strabismus',
            'cn_facial_sensation',
            'cn_swallowing',
          ])}
          isOpen={openSections[4]}
          onToggle={() => toggleSection(4)}
          onHelpClick={openHelp}
        />
        {openSections[4] && (
          <div className="p-4 space-y-4">
            <SectionIntro
              text="Nervos cranianos avaliam principalmente tronco encefálico (pons/medula/mesencéfalo), além de aferência visual e eferência facial/oculomotora. Combinando CN + mentação + posturais você separa vestibular central vs periférico e localiza lesões no encéfalo."
              howToObserve={[
                'PLR: luz focal em cada olho, observar miose direta e consensual',
                'Menace: movimento rápido sem tocar, sem deslocar ar',
                'Avaliar simetria e presença de nistagmo/estrabismo',
              ]}
            />

            <div>
              <div className="flex items-center gap-2 mb-3">
                <h4 className="text-sm font-semibold text-foreground">
                  Ameaça (Menace) - II/VII
                </h4>
                <HelpButton
                  onClick={() => openHelp('cn_menace_response')}
                  size="sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ExamItem
                  label="Olho Esquerdo"
                  helpTopicId="test_menace_left"
                  howToTestSummary="Movimento rápido em direção ao olho esquerdo."
                  options={[
                    {
                      value: 'Presente',
                      label: 'Presente',
                      helpTopicId: 'opt_menace_present',
                    },
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                      helpTopicId: 'opt_menace_absent',
                    },
                  ]}
                  currentValue={exam.findings['menace_left']}
                  onSelect={(value) => updateExam('menace_left', value)}
                  onHelpClick={openHelp}
                />
                <ExamItem
                  label="Olho Direito"
                  helpTopicId="test_menace_right"
                  howToTestSummary="Movimento rápido em direção ao olho direito."
                  options={[
                    {
                      value: 'Presente',
                      label: 'Presente',
                      helpTopicId: 'opt_menace_present',
                    },
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                      helpTopicId: 'opt_menace_absent',
                    },
                  ]}
                  currentValue={exam.findings['menace_right']}
                  onSelect={(value) => updateExam('menace_right', value)}
                  onHelpClick={openHelp}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <h4 className="text-sm font-semibold text-foreground">
                  Reflexo Pupilar (PLR) - II/III
                </h4>
                <HelpButton onClick={() => openHelp('test_plr')} size="sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ExamItem
                  label="Olho Esquerdo"
                  helpTopicId="test_plr_left"
                  howToTestSummary="Luz focal no olho esquerdo, observar miose."
                  options={[
                    {
                      value: 'Normal',
                      label: 'Normal',
                      helpTopicId: 'opt_plr_normal',
                    },
                    {
                      value: 'Lento',
                      label: 'Lento',
                      helpTopicId: 'opt_plr_slow',
                    },
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                      helpTopicId: 'opt_plr_absent',
                    },
                  ]}
                  currentValue={exam.findings['plr_left']}
                  onSelect={(value) => updateExam('plr_left', value)}
                  onHelpClick={openHelp}
                />
                <ExamItem
                  label="Olho Direito"
                  helpTopicId="test_plr_right"
                  howToTestSummary="Luz focal no olho direito, observar miose."
                  options={[
                    {
                      value: 'Normal',
                      label: 'Normal',
                      helpTopicId: 'opt_plr_normal',
                    },
                    {
                      value: 'Lento',
                      label: 'Lento',
                      helpTopicId: 'opt_plr_slow',
                    },
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                      helpTopicId: 'opt_plr_absent',
                    },
                  ]}
                  currentValue={exam.findings['plr_right']}
                  onSelect={(value) => updateExam('plr_right', value)}
                  onHelpClick={openHelp}
                />
              </div>
            </div>

            <ExamItem
              label="Nistagmo Patológico"
              helpTopicId="test_nystagmus"
              howToTestSummary="Observe movimento rítmico involuntário dos olhos."
              options={[
                {
                  value: 'Ausente',
                  label: 'Ausente',
                  helpTopicId: 'opt_nystagmus_absent',
                },
                {
                  value: 'Presente',
                  label: 'Presente',
                  helpTopicId: 'opt_nystagmus_present',
                },
              ]}
              currentValue={exam.findings['nystagmus']}
              onSelect={(value) => updateExam('nystagmus', value)}
              onHelpClick={openHelp}
            />

            <ExamItem
              label="Estrabismo"
              helpTopicId="test_strabismus"
              howToTestSummary="Observe desvio anormal dos olhos."
              options={[
                {
                  value: 'Ausente',
                  label: 'Ausente',
                  helpTopicId: 'opt_strabismus_absent',
                },
                {
                  value: 'Presente',
                  label: 'Presente',
                  helpTopicId: 'opt_strabismus_present',
                },
              ]}
              currentValue={exam.findings['strabismus']}
              onSelect={(value) => updateExam('strabismus', value)}
              onHelpClick={openHelp}
            />

            <ExamItem
              label="Sensibilidade Facial (V)"
              helpTopicId="test_facial_sensation"
              howToTestSummary="Toque leve na face, observe retirada/piscar."
              options={[
                {
                  value: 'Normal',
                  label: 'Normal',
                  helpTopicId: 'opt_facial_normal',
                },
                {
                  value: 'Diminuído',
                  label: 'Diminuído',
                  helpTopicId: 'opt_facial_decreased',
                },
                {
                  value: 'Ausente',
                  label: 'Ausente',
                  helpTopicId: 'opt_facial_absent',
                },
              ]}
              currentValue={exam.findings['cn_facial_sensation']}
              onSelect={(value) => updateExam('cn_facial_sensation', value)}
              onHelpClick={openHelp}
            />

            <ExamItem
              label="Reflexo de Deglutição (IX/X)"
              helpTopicId="test_swallow"
              howToTestSummary="Observe deglutição espontânea; avaliar tosse/engasgos."
              options={[
                {
                  value: 'Normal',
                  label: 'Normal',
                  helpTopicId: 'opt_swallow_normal',
                },
                {
                  value: 'Diminuído',
                  label: 'Diminuído',
                  helpTopicId: 'opt_swallow_decreased',
                },
                {
                  value: 'Ausente',
                  label: 'Ausente',
                  helpTopicId: 'opt_swallow_absent',
                },
              ]}
              currentValue={exam.findings['cn_swallowing']}
              onSelect={(value) => updateExam('cn_swallowing', value)}
              onHelpClick={openHelp}
            />
          </div>
        )}
      </div>

      {/* SEÇÃO 5: REFLEXOS ESPINHAIS */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
        <SectionHeader
          title="5. Reflexos Espinhais"
          helpTopicId="sec_spinal_reflexes"
          progress={getProgress([
            'reflex_patellar_left',
            'reflex_patellar_right',
            'reflex_withdrawal_left_thoracic',
            'reflex_withdrawal_right_thoracic',
            'reflex_panniculus',
          ])}
          isOpen={openSections[5]}
          onToggle={() => toggleSection(5)}
          onHelpClick={openHelp}
        />
        {openSections[5] && (
          <div className="p-4 space-y-4">
            <SectionIntro
              text="Reflexos espinhais avaliam arco reflexo (LMN: nervo periférico + segmento medular + músculo) e a modulação por UMN (tratos descendentes). A combinação 'posturais + marcha + reflexos' localiza medula em segmentos."
              howToObserve={[
                'Paciente relaxado em decúbito lateral',
                'Percutir/estimular com técnica adequada',
                'Sempre comparar lados (simetria é crucial)',
              ]}
            />

            <div>
              <div className="flex items-center gap-2 mb-3">
                <h4 className="text-sm font-semibold text-foreground">
                  Reflexo Patelar (Membros Pélvicos)
                </h4>
                <HelpButton
                  onClick={() => openHelp('test_patellar')}
                  size="sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ExamItem
                  label="Esquerdo"
                  helpTopicId="test_patellar_left"
                  howToTestSummary="Percutir ligamento patelar esquerdo."
                  options={[
                    {
                      value: 'Normal',
                      label: 'Normal',
                      helpTopicId: 'opt_reflex_normal',
                    },
                    {
                      value: 'Aumentado',
                      label: 'Aumentado',
                      helpTopicId: 'opt_reflex_increased',
                    },
                    {
                      value: 'Diminuído',
                      label: 'Diminuído',
                      helpTopicId: 'opt_reflex_decreased',
                    },
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                      helpTopicId: 'opt_reflex_absent',
                    },
                  ]}
                  currentValue={exam.findings['reflex_patellar_left']}
                  onSelect={(value) =>
                    updateExam('reflex_patellar_left', value)
                  }
                  onHelpClick={openHelp}
                />
                <ExamItem
                  label="Direito"
                  helpTopicId="test_patellar_right"
                  howToTestSummary="Percutir ligamento patelar direito."
                  options={[
                    {
                      value: 'Normal',
                      label: 'Normal',
                      helpTopicId: 'opt_reflex_normal',
                    },
                    {
                      value: 'Aumentado',
                      label: 'Aumentado',
                      helpTopicId: 'opt_reflex_increased',
                    },
                    {
                      value: 'Diminuído',
                      label: 'Diminuído',
                      helpTopicId: 'opt_reflex_decreased',
                    },
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                      helpTopicId: 'opt_reflex_absent',
                    },
                  ]}
                  currentValue={exam.findings['reflex_patellar_right']}
                  onSelect={(value) =>
                    updateExam('reflex_patellar_right', value)
                  }
                  onHelpClick={openHelp}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <h4 className="text-sm font-semibold text-foreground">
                  Flexor/Retirada (Membros Torácicos)
                </h4>
                <HelpButton
                  onClick={() => openHelp('reflex_withdrawal_flexor')}
                  size="sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ExamItem
                  label="Esquerdo"
                  helpTopicId="test_withdrawal_thoracic_left"
                  howToTestSummary="Pinçar dígito do membro anterior esquerdo."
                  options={[
                    {
                      value: 'Normal',
                      label: 'Normal',
                      helpTopicId: 'opt_reflex_normal',
                    },
                    {
                      value: 'Aumentado',
                      label: 'Aumentado',
                      helpTopicId: 'opt_reflex_increased',
                    },
                    {
                      value: 'Diminuído',
                      label: 'Diminuído',
                      helpTopicId: 'opt_reflex_decreased',
                    },
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                      helpTopicId: 'opt_reflex_absent',
                    },
                  ]}
                  currentValue={
                    exam.findings['reflex_withdrawal_left_thoracic']
                  }
                  onSelect={(value) =>
                    updateExam('reflex_withdrawal_left_thoracic', value)
                  }
                  onHelpClick={openHelp}
                />
                <ExamItem
                  label="Direito"
                  helpTopicId="test_withdrawal_thoracic_right"
                  howToTestSummary="Pinçar dígito do membro anterior direito."
                  options={[
                    {
                      value: 'Normal',
                      label: 'Normal',
                      helpTopicId: 'opt_reflex_normal',
                    },
                    {
                      value: 'Aumentado',
                      label: 'Aumentado',
                      helpTopicId: 'opt_reflex_increased',
                    },
                    {
                      value: 'Diminuído',
                      label: 'Diminuído',
                      helpTopicId: 'opt_reflex_decreased',
                    },
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                      helpTopicId: 'opt_reflex_absent',
                    },
                  ]}
                  currentValue={
                    exam.findings['reflex_withdrawal_right_thoracic']
                  }
                  onSelect={(value) =>
                    updateExam('reflex_withdrawal_right_thoracic', value)
                  }
                  onHelpClick={openHelp}
                />
              </div>
            </div>

            <ExamItem
              label="Reflexo Cutâneo do Tronco (Panniculus)"
              helpTopicId="test_panniculus"
              howToTestSummary="Pinçar pele lateral do tórax, observar contração."
              options={[
                {
                  value: 'Normal',
                  label: 'Normal',
                  helpTopicId: 'opt_panniculus_normal',
                },
                {
                  value: 'Cutoff',
                  label: 'Corte (Cutoff)',
                  helpTopicId: 'opt_panniculus_cutoff',
                },
                {
                  value: 'Ausente',
                  label: 'Ausente',
                  helpTopicId: 'opt_panniculus_absent',
                },
              ]}
              currentValue={exam.findings['reflex_panniculus']}
              onSelect={(value) => updateExam('reflex_panniculus', value)}
              onHelpClick={openHelp}
            />
          </div>
        )}
      </div>

      {/* SEÇÃO 6: DOR E NOCICEPÇÃO */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
        <SectionHeader
          title="6. Dor e Nocicepção"
          helpTopicId="sec_pain_nociception"
          progress={getProgress([
            'deep_pain',
            'pain_cervical',
            'pain_thoracolumbar',
            'pain_lumbosacral',
          ])}
          isOpen={openSections[6]}
          onToggle={() => toggleSection(6)}
          onHelpClick={openHelp}
        />
        {openSections[6] && (
          <div className="p-4 space-y-4">
            <SectionIntro
              text="Você está avaliando dor espinhal (disco/meninges/raiz nervosa) e nocicepção profunda (vias ascendentes críticas). Importante: reflexo ≠ percepção consciente de dor."
              howToObserve={[
                'Dor profunda: estímulo forte em falange, observar resposta consciente',
                'Palpação de coluna: sempre por último, progressiva e suave',
                'Observar vocalização, espasmo, postura antálgica',
              ]}
            />

            <ExamItem
              label="Dor Profunda (Nocicepção)"
              helpTopicId="test_deep_pain"
              howToTestSummary="Estímulo forte e controlado em falange, procurando resposta consciente (virar cabeça, vocalizar, tentar morder)."
              options={[
                {
                  value: 'Presente',
                  label: 'Presente',
                  helpTopicId: 'opt_deep_pain_present',
                },
                {
                  value: 'Ausente',
                  label: 'Ausente',
                  helpTopicId: 'opt_deep_pain_absent',
                },
                {
                  value: 'Duvidoso',
                  label: 'Duvidoso',
                  helpTopicId: 'opt_deep_pain_equivocal',
                },
              ]}
              currentValue={exam.findings['deep_pain']}
              onSelect={(value) => updateExam('deep_pain', value)}
              onHelpClick={openHelp}
            />

            <div className="pt-4 border-t border-border">
              <h4 className="text-gold font-semibold mb-4 flex items-center gap-2">
                Palpação de Coluna (Dor Espinhal)
                <HelpButton
                  onClick={() => openHelp('test_spinal_pain')}
                  size="sm"
                />
              </h4>

              <div className="space-y-4">
                <ExamItem
                  label="Cervical"
                  helpTopicId="test_spinal_pain_cervical"
                  howToTestSummary="Palpar vértebras cervicais, mobilizar pescoço suavemente."
                  options={[
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                      helpTopicId: 'opt_pain_none',
                    },
                    {
                      value: 'Leve',
                      label: 'Leve',
                      helpTopicId: 'opt_pain_mild',
                    },
                    {
                      value: 'Moderada',
                      label: 'Moderada',
                      helpTopicId: 'opt_pain_moderate',
                    },
                    {
                      value: 'Severa',
                      label: 'Severa',
                      helpTopicId: 'opt_pain_severe',
                    },
                  ]}
                  currentValue={exam.findings['pain_cervical']}
                  onSelect={(value) => updateExam('pain_cervical', value)}
                  onHelpClick={openHelp}
                />

                <ExamItem
                  label="Toracolombar"
                  helpTopicId="test_spinal_pain_thoracolumbar"
                  howToTestSummary="Palpar vértebras toracolombares (T3-L3)."
                  options={[
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                      helpTopicId: 'opt_pain_none',
                    },
                    {
                      value: 'Leve',
                      label: 'Leve',
                      helpTopicId: 'opt_pain_mild',
                    },
                    {
                      value: 'Moderada',
                      label: 'Moderada',
                      helpTopicId: 'opt_pain_moderate',
                    },
                    {
                      value: 'Severa',
                      label: 'Severa',
                      helpTopicId: 'opt_pain_severe',
                    },
                  ]}
                  currentValue={exam.findings['pain_thoracolumbar']}
                  onSelect={(value) => updateExam('pain_thoracolumbar', value)}
                  onHelpClick={openHelp}
                />

                <ExamItem
                  label="Lombossacra"
                  helpTopicId="test_spinal_pain_lumbosacral"
                  howToTestSummary="Palpar região lombossacra e cauda equina."
                  options={[
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                      helpTopicId: 'opt_pain_none',
                    },
                    {
                      value: 'Leve',
                      label: 'Leve',
                      helpTopicId: 'opt_pain_mild',
                    },
                    {
                      value: 'Moderada',
                      label: 'Moderada',
                      helpTopicId: 'opt_pain_moderate',
                    },
                    {
                      value: 'Severa',
                      label: 'Severa',
                      helpTopicId: 'opt_pain_severe',
                    },
                  ]}
                  currentValue={exam.findings['pain_lumbosacral']}
                  onSelect={(value) => updateExam('pain_lumbosacral', value)}
                  onHelpClick={openHelp}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Help Modal */}
      <HelpModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
        topic={
          currentHelpTopicId ? getHelpTopicComplete(currentHelpTopicId) : null
        }
      />
    </div>
  )
}
