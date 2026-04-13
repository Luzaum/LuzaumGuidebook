import type { HospitalStewardshipCardV2 } from '../model/institutional'
import { INSTITUTIONAL_SOURCE_CCIH_2024 } from './sourceRegistry'

/**
 * Alertas e decisões de stewardship em contexto hospitalar.
 * Estrutura preparada para vinculação futura a diretriz institucional versionada (PDF/CCIH etc.).
 * Não contém texto literal de documento externo não presente no repositório.
 */
export const HOSPITAL_STEWARDSHIP_CARDS_V2: Record<string, HospitalStewardshipCardV2> = {
  signal_inpatient_risk: {
    id: 'signal_inpatient_risk',
    slug: 'sinalizar-risco-hospitalar',
    title: 'Quando sinalizar risco de internação e manejo hospitalar',
    category: 'risk',
    lead:
      'Critérios clínicos de instabilidade, hipoperfusão, hipóxia refratária, dor abdominal aguda com peritonite suspeita ou incapacidade de via oral definem prioridade de ambiente hospitalar — independentemente do antibiótico escolhido.',
    bullets: [
      'O módulo v2 usa “gravidade assistencial” declarada pelo usuário; a equipe valida na beira-leito.',
      'Internação habilita via parenteral, monitorização e coleta sistemática de culturas.',
    ],
    whenToThink: [
      'Lactente, idoso, gestante ou comorbidades graves com infecção fechada ou sistêmica.',
      'Suspeita de sepse: priorizar estabilização e amostras, não apenas troca empírica de ATB.',
    ],
    sourceKey: 'institutional.hospital_bundle.pending_v1',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    referenceKeys: ['ref_registry.hospital_institutional_pending'],
  },

  compulsory_notification: {
    id: 'compulsory_notification',
    slug: 'notificacao-compulsoria-ccih',
    title: 'Notificação compulsória de microrganismos (vigilância institucional)',
    category: 'notification',
    lead:
      'Determinados achados microbiológicos ou eventos de vigilância exigem comunicação formal à CCIH ou setor equivalente — integra controle de infecção e não substitui o manejo clínico do paciente.',
    bullets: [
      'Seguir lista e fluxo institucional vigentes; registrar data, canal e responsável no prontuário.',
      'A obrigação de notificar é distinta da decisão de tratar: ambas coexistem no cuidado hospitalar.',
    ],
    whenToThink: [
      'Resultado ou quadro classificado pela unidade como de notificação obrigatória.',
      'Padrão incomum de resistência, agrupamento de casos ou suspeita de evento coletivo.',
    ],
    sourceKey: 'institutional.ccih_compulsory_notification.v1',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    referenceKeys: ['ref_registry.institutional_ccih_2024'],
  },

  isolation_precaution: {
    id: 'isolation_precaution',
    slug: 'isolamento-precaucao',
    title: 'Isolamento e precauções (contato / gotículas)',
    category: 'precaution',
    lead:
      'Precauções protegem pacientes e equipe quando há suspeita epidemiológica de patógeno multirresistente ou transmissão fecal-oral — o protocolo detalhado deve vir da CCIH institucional versionada.',
    bullets: [
      'MRSP/MRSA, Enterobacterales multirresistentes e patógenos fecais em surtos: candidatos a precaução de contato.',
      'Documentar início e término de precaução com critério clínico e laboratorial.',
    ],
    whenToThink: [
      'Transferência de outra unidade com histórico de colonização.',
      'Uso prévio prolongado de ATB de amplo espectro e infecção de sítio hospitalar.',
    ],
    sourceKey: 'institutional.ccih_isolation.pending_v1',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    referenceKeys: ['ref_registry.hospital_institutional_pending'],
  },

  suspect_mdr: {
    id: 'suspect_mdr',
    slug: 'suspeita-multirresistencia',
    title: 'Quando suspeitar multirresistência (MDR)',
    category: 'mdr',
    lead:
      'Exposição hospitalar recente, antibióticos de amplo espectro, colonização prévia e infecção de sítio invasivo elevam probabilidade de resistência — o esquema empírico deve seguir dados locais (antibiograma institucional agregado), não achismo individual.',
    bullets: [
      'Cultura e identificação guiam descalonamento; empirismo prolongado sem critério aumenta seleção.',
      'Evitar “última linha” como primeira linha sem gravidade proporcional.',
    ],
    whenToThink: [
      'Pneumonia nosocomial, ITU associada a cateter, infecção de ferida pós-cirúrgica tardia.',
      'Paciente com culturas prévias com padrão resistente.',
    ],
    sourceKey: 'institutional.mdr_suspicion.pending_v1',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    referenceKeys: ['ref_registry.hospital_institutional_pending'],
  },

  culture_before_antibiotic: {
    id: 'culture_before_antibiotic',
    slug: 'cultura-antes-antibiotico',
    title: 'Cultura antes do antimicrobiano (quando seguro)',
    category: 'culture',
    lead:
      'Coletar material representativo antes da primeira dose melhora interpretação posterior e permite descalonamento — salvo emergências em que a dose não pode esperar após punção inicial.',
    bullets: [
      'Hemocultura em febre sem foco claro; material de ferida profunda antes de limpeza extensiva quando possível.',
      'Registrar horário da primeira dose no prontuário para correlação laboratorial.',
    ],
    whenToThink: [
      'Piometra, piotórax, sepse, ITU complicada e qualquer internação com foco potencialmente cultivável.',
    ],
    sourceKey: 'institutional.culture_timing.pending_v1',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    referenceKeys: ['ref_registry.hospital_culture_timing'],
  },

  urinary_catheter_observations: {
    id: 'urinary_catheter_observations',
    slug: 'cateter-urinario-observacoes',
    title: 'Uso de cateter urinário: cautelas e leitura clínica',
    category: 'catheter_uti',
    lead:
      'O cateter altera flora urinária, favorece bacteriúria de colonização e infecção associada ao cuidado; tratar “cultura positiva” sem síndrome compatível costuma ser má stewardship.',
    bullets: [
      'Reavaliar necessidade do dispositivo com frequência; menor tempo de sonda, menor risco acumulado.',
      'Correlacionar urocultura com sintomas, sedimento e outros focos antes de iniciar ou prolongar ATB.',
    ],
    whenToThink: [
      'Paciente internado com sonda vesical de demora ou coleta seriada por cateter.',
      'Resultado laboratorial positivo sem clínica de ITU.',
    ],
    sourceKey: 'institutional.urinary_catheter_observations.v1',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    referenceKeys: ['ref_registry.institutional_ccih_2024'],
  },

  catheter_signs_of_cystitis: {
    id: 'catheter_signs_of_cystitis',
    slug: 'cateter-e-cistite-sinais',
    title: 'Animal com cateter urinário e sinais de cistite',
    category: 'catheter_uti',
    lead:
      'Com sonda em uso, disúria, desconforto miccional ou alterações compatíveis com inflamação de trato baixo podem indicar cistite associada ao dispositivo — diferenciar de colonização assintomática.',
    bullets: [
      'Integrar tempo de cateter, exame físico e outros focos infecciosos; amostra representativa conforme protocolo local.',
      'Remoção ou troca do cateter pode fazer parte do plano quando seguro clinicamente.',
    ],
    whenToThink: [
      'Estrangúria, hematúria miccional sintomática ou dor suprapúbica com cateter presente.',
      'Febre com hipótese de foco urinário e sonda em lugar.',
    ],
    sourceKey: 'institutional.catheter_signs_cystitis.v1',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    referenceKeys: ['ref_registry.institutional_ccih_2024'],
  },

  nosocomial_reasoning: {
    id: 'nosocomial_reasoning',
    slug: 'infeccao-nosocomial-raciocinio',
    title: 'Infecção nosocomial no raciocínio clínico',
    category: 'nosocomial',
    lead:
      'Infecção adquirida após 48–72 h de internação ou relacionada a dispositivo/procedimento muda probabilidade de patógeno e de resistência — exige integração com dados da unidade, não prescrição isolada.',
    bullets: [
      'Rever cateteres, drenos e linhas como foco antes de apenas trocar ATB.',
      'Notificar e registrar eventos conforme protocolo local de vigilância.',
    ],
    whenToThink: [
      'Febre nova após procedimento, pneumonia tardia em ventilado, ITU associada a sonda.',
    ],
    sourceKey: 'institutional.nosocomial_framework.pending_v1',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    referenceKeys: ['ref_registry.hospital_institutional_pending'],
  },

  reassess_deescalate: {
    id: 'reassess_deescalate',
    slug: 'reavaliar-descalonar',
    title: 'Reavaliar em 48–72 h e descalonar',
    category: 'deescalation',
    lead:
      'Todo esquema empírico amplo deve ter data de revisão explícita: resposta clínica, função orgânica, cultura e tolerância guiam estreitamento de espectro ou via oral.',
    bullets: [
      'Parar duplas gram-negativas sem indicação após estabilização.',
      'Substituir IV por VO quando critérios de estabilidade forem atingidos.',
    ],
    whenToThink: [
      'Após primeiras 48–72 h de terapia empírica em internação.',
      'Quando cultura mostra patógeno único sensível a espectro mais estreito.',
    ],
    sourceKey: 'institutional.deescalation.pending_v1',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    referenceKeys: ['ref_registry.hospital_stewardship_core'],
  },

  avoid_unnecessary_escalation: {
    id: 'avoid_unnecessary_escalation',
    slug: 'evitar-escalonamento-desnecessario',
    title: 'Evitar escalonamento desnecessário',
    category: 'deescalation',
    lead:
      'Trocar antibiótico por medo sem novo dado clínico ou laboratorial é um driver comum de resistência e efeito adverso — documentar o motivo da mudança.',
    bullets: [
      'Febre isolada nas primeiras 24–48 h nem sempre exige novo espectro.',
      'Falha real: revisar foco não drenado, dose, via e diagnóstico alternativo.',
    ],
    whenToThink: [
      'Pedido de “algo mais forte” sem nova cultura ou piora objetiva.',
    ],
    sourceKey: 'institutional.escalation_audit.pending_v1',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    referenceKeys: ['ref_registry.hospital_stewardship_core'],
  },

  antibiotic_may_not_be_indicated: {
    id: 'antibiotic_may_not_be_indicated',
    slug: 'antibiotico-pode-nao-ser-indicado',
    title: 'Quando o antibiótico pode não estar indicado',
    category: 'indication',
    lead:
      'Bacteriúria assintomática, colonização de vias aéreas, culturas de baixo valor e processos não bacterianos não devem gerar ciclos prolongados “por precaução”.',
    bullets: [
      'Discutir abstinência terapêutica ou observação ativa com a equipe e o tutor.',
      'Registrar decisão e critérios de reavaliação.',
    ],
    whenToThink: [
      'Cultura positiva sem síndrome infecciosa compatível.',
      'Quadro viral ou inflamatório não infeccioso mais provável.',
    ],
    sourceKey: 'institutional.indication_review.pending_v1',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    referenceKeys: ['ref_registry.hospital_stewardship_core'],
  },
}

export const HOSPITAL_CARD_IDS_V2 = Object.keys(HOSPITAL_STEWARDSHIP_CARDS_V2)

export function listHospitalStewardshipCardsV2(): HospitalStewardshipCardV2[] {
  return HOSPITAL_CARD_IDS_V2.map((id) => HOSPITAL_STEWARDSHIP_CARDS_V2[id])
}
