import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, CheckCircle2, Circle } from 'lucide-react'
import { HelpButton } from '../help/HelpButton'
import { useUiStore } from '../../stores/uiStore'

interface Step3Props {
  exam: Record<string, any>
  updateExam: (exam: Record<string, any>) => void
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
  theme: 'dark' | 'light'
}

function SectionHeader({
  title,
  helpTopicId,
  progress,
  isOpen,
  onToggle,
  theme,
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
        <HelpButton topicId={helpTopicId} theme={theme} size="md" />
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
  helpTopicId?: string
  howToTestSummary: string
  options: Array<{
    value: string
    label: string
    helpTopicId?: string
  }>
  currentValue: any
  onSelect: (value: string) => void
}

function ExamItem({
  label,
  helpTopicId,
  howToTestSummary,
  options,
  currentValue,
  onSelect,
  theme,
}: ExamItemProps & { theme: 'dark' | 'light' }) {
  return (
    <div className="p-4 bg-card border border-border rounded-xl hover:border-gold/30 transition-all">
      <div className="flex items-center gap-2 mb-2">
        <label className="text-sm font-semibold text-foreground">{label}</label>
        {helpTopicId && <HelpButton topicId={helpTopicId} theme={theme} size="sm" />}
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
                type="button"
                whileTap={{
                  scale: 0.95,
                }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onSelect(opt.value)
                }}
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
              {opt.helpTopicId && <HelpButton topicId={opt.helpTopicId} theme={theme} size="sm" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Step3NeuroExam({ exam, updateExam }: Step3Props) {
  const theme = useUiStore((s) => s.theme)
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  })

  const toggleSection = (section: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Wrapper para manter compatibilidade com chamadas handleUpdateExam(key, value)
  const handleUpdateExam = (key: string, value: any) => {
    updateExam({
      ...exam,
      [key]: value,
    })
  }

  const getProgress = (keys: string[]) => {
    const filled = keys.filter(
      (key) => exam[key] !== undefined && exam[key] !== null,
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
          theme={theme}
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
              howToTestSummary="Observe responsividade espontânea, depois chamada/estímulo tátil; nociceptivo só se necessário."
              options={[
                {
                  value: 'Alerta',
                  label: 'Alerta',
                  helpTopicId: 'help_s1_consciencia_alerta',
                },
                {
                  value: 'Deprimido',
                  label: 'Deprimido',
                  helpTopicId: 'help_s1_consciencia_deprimido',
                },
                {
                  value: 'Estupor',
                  label: 'Estupor',
                  helpTopicId: 'help_s1_consciencia_estupor',
                },
                {
                  value: 'Coma',
                  label: 'Coma',
                  helpTopicId: 'help_s1_consciencia_coma',
                },
              ]}
              currentValue={exam['mentation']}
              onSelect={(value) => handleUpdateExam('mentation', value)}
              theme={theme}
            />

            <ExamItem
              label="Comportamento"
              howToTestSummary="Observe interação, resposta ao ambiente, reatividade e sinais de dor/medo."
              options={[
                {
                  value: 'Normal',
                  label: 'Normal',
                },
                {
                  value: 'Desorientado',
                  label: 'Desorientado',
                  helpTopicId: 'help_s1_comportamento_desorientado',
                },
                {
                  value: 'Agressivo',
                  label: 'Agressivo',
                  helpTopicId: 'help_s1_comportamento_agressivo',
                },
                {
                  value: 'Vocalização',
                  label: 'Vocalização',
                  helpTopicId: 'help_s1_comportamento_vocalizacao',
                },
              ]}
              currentValue={exam['behavior']}
              onSelect={(value) => handleUpdateExam('behavior', value)}
              theme={theme}
            />

            <ExamItem
              label="Postura da Cabeça"
              howToTestSummary="Observe posição da cabeça em repouso e durante movimento."
              options={[
                {
                  value: 'Normal',
                  label: 'Normal',
                },
                {
                  value: 'Head Tilt',
                  label: 'Head Tilt',
                  helpTopicId: 'help_s1_postura_cabeca_headtilt',
                },
                {
                  value: 'Opistótono',
                  label: 'Opistótono',
                  helpTopicId: 'help_s1_postura_cabeca_opistotono',
                },
                {
                  value: 'Cabeça Baixa',
                  label: 'Cabeça Baixa',
                  helpTopicId: 'help_s1_postura_cabeca_cabeca_baixa',
                },
              ]}
              currentValue={exam['head_posture']}
              onSelect={(value) => handleUpdateExam('head_posture', value)}
              theme={theme}
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
          theme={theme}
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
              helpTopicId="help_s2_deambular_capacidade"
              howToTestSummary="Observe se o paciente consegue se movimentar sem auxílio."
              options={[
                {
                  value: 'Ambulatório',
                  label: 'Ambulatório',
                },
                {
                  value: 'Com Apoio',
                  label: 'Com Apoio',
                },
                {
                  value: 'Não Ambulatório',
                  label: 'Não Ambulatório',
                },
                {
                  value: 'Plegia',
                  label: 'Plegia',
                },
              ]}
              currentValue={exam['ambulation']}
              onSelect={(value) => handleUpdateExam('ambulation', value)}
              theme={theme}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ExamItem
                label="Membros Torácicos"
                helpTopicId="help_s2_membros_toracicos"
                howToTestSummary="Avalie força e coordenação dos membros anteriores."
                options={[
                  {
                    value: 'Normal',
                    label: 'Normal',
                  },
                  {
                    value: 'Ataxia',
                    label: 'Ataxia',
                  },
                  {
                    value: 'Paresia',
                    label: 'Paresia',
                  },
                  {
                    value: 'Plegia',
                    label: 'Plegia',
                  },
                ]}
                currentValue={exam['gait_thoracic']}
                onSelect={(value) => handleUpdateExam('gait_thoracic', value)}
                theme={theme}
              />

              <ExamItem
                label="Membros Pélvicos"
                helpTopicId="help_s2_membros_pelvicos"
                howToTestSummary="Avalie força e coordenação dos membros posteriores."
                options={[
                  {
                    value: 'Normal',
                    label: 'Normal',
                  },
                  {
                    value: 'Ataxia',
                    label: 'Ataxia',
                  },
                  {
                    value: 'Paresia',
                    label: 'Paresia',
                  },
                  {
                    value: 'Plegia',
                    label: 'Plegia',
                  },
                ]}
                currentValue={exam['gait_pelvic']}
                onSelect={(value) => handleUpdateExam('gait_pelvic', value)}
                theme={theme}
              />
            </div>

            <ExamItem
              label="Tipo de Ataxia (se houver)"
              helpTopicId="help_s2_tipo_ataxia"
              howToTestSummary="Identifique o padrão de descoordenação para localizar a lesão."
              options={[
                {
                  value: 'Ausente',
                  label: 'Ausente',
                },
                {
                  value: 'Proprioceptiva',
                  label: 'Proprioceptiva',
                },
                {
                  value: 'Vestibular',
                  label: 'Vestibular',
                },
                {
                  value: 'Cerebelar',
                  label: 'Cerebelar',
                },
              ]}
              currentValue={exam['ataxia_type']}
              onSelect={(value) => handleUpdateExam('ataxia_type', value)}
              theme={theme}
            />
          </div>
        )}
      </div>

      {/* SEÇÃO 3: REAÇÕES POSTURAIS */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
        <SectionHeader
          title="3. Reações Posturais (Propriocepção)"
          helpTopicId="s3-propriocepcao-geral"
          progress={getProgress([
            'proprioception_thoracic_left',
            'proprioception_thoracic_right',
            'proprioception_pelvic_left',
            'proprioception_pelvic_right',
          ])}
          isOpen={openSections[3]}
          onToggle={() => toggleSection(3)}
          theme={theme}
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
                helpTopicId="s3-toracico-esquerdo"
                howToTestSummary="Teste propriocepção e hopping do membro anterior esquerdo."
                options={[
                  {
                    value: 'Normal',
                    label: 'Normal',
                  },
                  {
                    value: 'Diminuído',
                    label: 'Diminuído',
                  },
                  {
                    value: 'Ausente',
                    label: 'Ausente',
                  },
                ]}
                currentValue={exam['proprioception_thoracic_left']}
                onSelect={(value) =>
                  handleUpdateExam('proprioception_thoracic_left', value)
                }
                theme={theme}
              />

              <ExamItem
                label="Torácico Direito"
                helpTopicId="s3-toracico-direito"
                howToTestSummary="Teste propriocepção e hopping do membro anterior direito."
                options={[
                  {
                    value: 'Normal',
                    label: 'Normal',
                  },
                  {
                    value: 'Diminuído',
                    label: 'Diminuído',
                  },
                  {
                    value: 'Ausente',
                    label: 'Ausente',
                  },
                ]}
                currentValue={exam['proprioception_thoracic_right']}
                onSelect={(value) =>
                  handleUpdateExam('proprioception_thoracic_right', value)
                }
                theme={theme}
              />

              <ExamItem
                label="Pélvico Esquerdo"
                helpTopicId="s3-pelvico-esquerdo"
                howToTestSummary="Teste propriocepção e hopping do membro posterior esquerdo."
                options={[
                  {
                    value: 'Normal',
                    label: 'Normal',
                  },
                  {
                    value: 'Diminuído',
                    label: 'Diminuído',
                  },
                  {
                    value: 'Ausente',
                    label: 'Ausente',
                  },
                ]}
                currentValue={exam['proprioception_pelvic_left']}
                onSelect={(value) =>
                  handleUpdateExam('proprioception_pelvic_left', value)
                }
                theme={theme}
              />

              <ExamItem
                label="Pélvico Direito"
                helpTopicId="s3-pelvico-direito"
                howToTestSummary="Teste propriocepção e hopping do membro posterior direito."
                options={[
                  {
                    value: 'Normal',
                    label: 'Normal',
                  },
                  {
                    value: 'Diminuído',
                    label: 'Diminuído',
                  },
                  {
                    value: 'Ausente',
                    label: 'Ausente',
                  },
                ]}
                currentValue={exam['proprioception_pelvic_right']}
                onSelect={(value) =>
                  handleUpdateExam('proprioception_pelvic_right', value)
                }
                theme={theme}
              />
            </div>
          </div>
        )}
      </div>

      {/* SEÇÃO 4: NERVOS CRANIANOS */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
        <SectionHeader
          title="4. Nervos Cranianos"
          helpTopicId="s4-nervos-cranianos-geral"
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
          theme={theme}
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
                <HelpButton topicId="s4-ameaca-oquee" theme={theme} size="sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ExamItem
                  label="Olho Esquerdo"
                  helpTopicId="s4-ameaca-olho-esquerdo"
                  howToTestSummary="Movimento rápido em direção ao olho esquerdo."
                  options={[
                    {
                      value: 'Presente',
                      label: 'Presente',
                    },
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                    },
                  ]}
                  currentValue={exam['menace_left']}
                  onSelect={(value) => handleUpdateExam('menace_left', value)}
                  theme={theme}
                />
                <ExamItem
                  label="Olho Direito"
                  helpTopicId="s4-ameaca-olho-direito"
                  howToTestSummary="Movimento rápido em direção ao olho direito."
                  options={[
                    {
                      value: 'Presente',
                      label: 'Presente',
                    },
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                    },
                  ]}
                  currentValue={exam['menace_right']}
                  onSelect={(value) => handleUpdateExam('menace_right', value)}
                  theme={theme}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <h4 className="text-sm font-semibold text-foreground">
                  Reflexo Pupilar (PLR) - II/III
                </h4>
                <HelpButton topicId="s4-plr-oquee" theme={theme} size="sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ExamItem
                  label="Olho Esquerdo"
                  helpTopicId="s4-plr-olho-esquerdo"
                  howToTestSummary="Luz focal no olho esquerdo, observar miose."
                  options={[
                    {
                      value: 'Normal',
                      label: 'Normal',
                    },
                    {
                      value: 'Lento',
                      label: 'Lento',
                    },
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                    },
                  ]}
                  currentValue={exam['plr_left']}
                  onSelect={(value) => handleUpdateExam('plr_left', value)}
                  theme={theme}
                />
                <ExamItem
                  label="Olho Direito"
                  helpTopicId="s4-plr-olho-direito"
                  howToTestSummary="Luz focal no olho direito, observar miose."
                  options={[
                    {
                      value: 'Normal',
                      label: 'Normal',
                    },
                    {
                      value: 'Lento',
                      label: 'Lento',
                    },
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                    },
                  ]}
                  currentValue={exam['plr_right']}
                  onSelect={(value) => handleUpdateExam('plr_right', value)}
                  theme={theme}
                />
              </div>
            </div>

            <ExamItem
              label="Nistagmo Patológico"
              helpTopicId="s4-nistagmo-oquee"
              howToTestSummary="Observe movimento rítmico involuntário dos olhos."
              options={[
                {
                  value: 'Ausente',
                  label: 'Ausente',
                },
                {
                  value: 'Presente',
                  label: 'Presente',
                },
              ]}
              currentValue={exam['nystagmus']}
              onSelect={(value) => handleUpdateExam('nystagmus', value)}
              theme={theme}
            />

            <ExamItem
              label="Estrabismo"
              helpTopicId="s4-estrabismo-oquee"
              howToTestSummary="Observe desvio anormal dos olhos."
              options={[
                {
                  value: 'Ausente',
                  label: 'Ausente',
                },
                {
                  value: 'Presente',
                  label: 'Presente',
                },
              ]}
              currentValue={exam['strabismus']}
              onSelect={(value) => handleUpdateExam('strabismus', value)}
              theme={theme}
            />

            <ExamItem
              label="Sensibilidade Facial (V)"
              helpTopicId="s4-sensibilidade-facial-v"
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
              currentValue={exam['cn_facial_sensation']}
              onSelect={(value) => handleUpdateExam('cn_facial_sensation', value)}
              theme={theme}
            />

            <ExamItem
              label="Reflexo de Deglutição (IX/X)"
              helpTopicId="s4-degluticao-ix-x"
              howToTestSummary="Observe deglutição espontânea; avaliar tosse/engasgos."
              options={[
                {
                  value: 'Normal',
                  label: 'Normal',
                },
                {
                  value: 'Diminuído',
                  label: 'Diminuído',
                },
                {
                  value: 'Ausente',
                  label: 'Ausente',
                },
              ]}
              currentValue={exam['cn_swallowing']}
              onSelect={(value) => handleUpdateExam('cn_swallowing', value)}
              theme={theme}
            />
          </div>
        )}
      </div>

      {/* SEÇÃO 5: REFLEXOS ESPINHAIS */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
        <SectionHeader
          title="5. Reflexos Espinhais"
          helpTopicId="s5-reflexos-geral"
          progress={getProgress([
            'reflex_patellar_left',
            'reflex_patellar_right',
            'reflex_withdrawal_left_thoracic',
            'reflex_withdrawal_right_thoracic',
            'reflex_panniculus',
          ])}
          isOpen={openSections[5]}
          onToggle={() => toggleSection(5)}
          theme={theme}
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
                <HelpButton topicId="s5-patelar-oquee" theme={theme} size="sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ExamItem
                  label="Esquerdo"
                  helpTopicId="s5-patelar-esq-normal"
                  howToTestSummary="Percutir ligamento patelar esquerdo."
                  options={[
                    {
                      value: 'Normal',
                      label: 'Normal',
                      helpTopicId: 's5-patelar-esq-normal',
                    },
                    {
                      value: 'Aumentado',
                      label: 'Aumentado',
                      helpTopicId: 's5-patelar-esq-aumentado',
                    },
                    {
                      value: 'Diminuído',
                      label: 'Diminuído',
                      helpTopicId: 's5-patelar-esq-diminuido',
                    },
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                      helpTopicId: 's5-patelar-esq-ausente',
                    },
                  ]}
                  currentValue={exam['reflex_patellar_left']}
                  onSelect={(value) =>
                    handleUpdateExam('reflex_patellar_left', value)
                  }
                  theme={theme}
                />
                <ExamItem
                  label="Direito"
                  helpTopicId="s5-patelar-dir-normal"
                  howToTestSummary="Percutir ligamento patelar direito."
                  options={[
                    {
                      value: 'Normal',
                      label: 'Normal',
                      helpTopicId: 's5-patelar-dir-normal',
                    },
                    {
                      value: 'Aumentado',
                      label: 'Aumentado',
                      helpTopicId: 's5-patelar-dir-aumentado',
                    },
                    {
                      value: 'Diminuído',
                      label: 'Diminuído',
                      helpTopicId: 's5-patelar-dir-diminuido',
                    },
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                      helpTopicId: 's5-patelar-dir-ausente',
                    },
                  ]}
                  currentValue={exam['reflex_patellar_right']}
                  onSelect={(value) =>
                    handleUpdateExam('reflex_patellar_right', value)
                  }
                  theme={theme}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <h4 className="text-sm font-semibold text-foreground">
                  Flexor/Retirada (Membros Torácicos)
                </h4>
                <HelpButton topicId="s5-retirada-toracico-oquee" theme={theme} size="sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ExamItem
                  label="Esquerdo"
                  helpTopicId="s5-retirada-toracico-esq-normal"
                  howToTestSummary="Pinçar dígito do membro anterior esquerdo."
                  options={[
                    {
                      value: 'Normal',
                      label: 'Normal',
                      helpTopicId: 's5-retirada-toracico-esq-normal',
                    },
                    {
                      value: 'Aumentado',
                      label: 'Aumentado',
                      helpTopicId: 's5-retirada-toracico-esq-aumentado',
                    },
                    {
                      value: 'Diminuído',
                      label: 'Diminuído',
                      helpTopicId: 's5-retirada-toracico-esq-diminuido',
                    },
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                      helpTopicId: 's5-retirada-toracico-esq-ausente',
                    },
                  ]}
                  currentValue={
                    exam['reflex_withdrawal_left_thoracic']
                  }
                  onSelect={(value) =>
                    handleUpdateExam('reflex_withdrawal_left_thoracic', value)
                  }
                  theme={theme}
                />
                <ExamItem
                  label="Direito"
                  helpTopicId="s5-retirada-toracico-dir-normal"
                  howToTestSummary="Pinçar dígito do membro anterior direito."
                  options={[
                    {
                      value: 'Normal',
                      label: 'Normal',
                      helpTopicId: 's5-retirada-toracico-dir-normal',
                    },
                    {
                      value: 'Aumentado',
                      label: 'Aumentado',
                      helpTopicId: 's5-retirada-toracico-dir-aumentado',
                    },
                    {
                      value: 'Diminuído',
                      label: 'Diminuído',
                      helpTopicId: 's5-retirada-toracico-dir-diminuido',
                    },
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                      helpTopicId: 's5-retirada-toracico-dir-ausente',
                    },
                  ]}
                  currentValue={
                    exam['reflex_withdrawal_right_thoracic']
                  }
                  onSelect={(value) =>
                    handleUpdateExam('reflex_withdrawal_right_thoracic', value)
                  }
                  theme={theme}
                />
              </div>
            </div>

            <ExamItem
              label="Reflexo Cutâneo do Tronco (Panniculus)"
              helpTopicId="s5-panniculus-oquee"
              howToTestSummary="Pinçar pele lateral do tórax, observar contração."
              options={[
                {
                  value: 'Normal',
                  label: 'Normal',
                  helpTopicId: 's5-panniculus-normal',
                },
                {
                  value: 'Cutoff',
                  label: 'Corte (Cutoff)',
                  helpTopicId: 's5-panniculus-cutoff',
                },
                {
                  value: 'Ausente',
                  label: 'Ausente',
                  helpTopicId: 's5-panniculus-ausente',
                },
              ]}
              currentValue={exam['reflex_panniculus']}
              onSelect={(value) => handleUpdateExam('reflex_panniculus', value)}
              theme={theme}
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
          theme={theme}
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
              helpTopicId="help_s6_dor_profunda"
              howToTestSummary="Estímulo forte e controlado em falange, procurando resposta consciente (virar cabeça, vocalizar, tentar morder)."
              options={[
                {
                  value: 'Presente',
                  label: 'Presente',
                },
                {
                  value: 'Ausente',
                  label: 'Ausente',
                },
                {
                  value: 'Duvidoso',
                  label: 'Duvidoso',
                },
              ]}
              currentValue={exam['deep_pain']}
              onSelect={(value) => handleUpdateExam('deep_pain', value)}
              theme={theme}
            />

            <div className="pt-4 border-t border-border">
              <h4 className="text-gold font-semibold mb-4 flex items-center gap-2">
                Palpação de Coluna (Dor Espinhal)
              </h4>

              <div className="space-y-4">
                <ExamItem
                  label="Cervical"
                  helpTopicId="help_s6_palpacao_coluna_cervical"
                  howToTestSummary="Palpar vértebras cervicais, mobilizar pescoço suavemente."
                  options={[
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                    },
                    {
                      value: 'Leve',
                      label: 'Leve',
                    },
                    {
                      value: 'Moderada',
                      label: 'Moderada',
                    },
                    {
                      value: 'Severa',
                      label: 'Severa',
                    },
                  ]}
                  currentValue={exam['pain_cervical']}
                  onSelect={(value) => handleUpdateExam('pain_cervical', value)}
                  theme={theme}
                />

                <ExamItem
                  label="Toracolombar"
                  helpTopicId="help_s6_palpacao_coluna_tl"
                  howToTestSummary="Palpar vértebras toracolombares (T3-L3)."
                  options={[
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                    },
                    {
                      value: 'Leve',
                      label: 'Leve',
                    },
                    {
                      value: 'Moderada',
                      label: 'Moderada',
                    },
                    {
                      value: 'Severa',
                      label: 'Severa',
                    },
                  ]}
                  currentValue={exam['pain_thoracolumbar']}
                  onSelect={(value) => handleUpdateExam('pain_thoracolumbar', value)}
                  theme={theme}
                />

                <ExamItem
                  label="Lombossacra"
                  helpTopicId="help_s6_palpacao_coluna_ls"
                  howToTestSummary="Palpar região lombossacra e cauda equina."
                  options={[
                    {
                      value: 'Ausente',
                      label: 'Ausente',
                    },
                    {
                      value: 'Leve',
                      label: 'Leve',
                    },
                    {
                      value: 'Moderada',
                      label: 'Moderada',
                    },
                    {
                      value: 'Severa',
                      label: 'Severa',
                    },
                  ]}
                  currentValue={exam['pain_lumbosacral']}
                  onSelect={(value) => handleUpdateExam('pain_lumbosacral', value)}
                  theme={theme}
                />
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
