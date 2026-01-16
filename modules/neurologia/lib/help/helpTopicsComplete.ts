export type HelpTopic = {
  id: string
  title: string
  section:
    | 'mentation_behavior'
    | 'gait_posture'
    | 'postural_reactions'
    | 'cranial_nerves'
    | 'spinal_reflexes'
    | 'pain_nociception'
  content: string
  clinicalTip?: string
  additionalInfo?: string
}

const fallbackTopic = (id: string): HelpTopic => ({
  id,
  title: 'Ajuda',
  section: 'mentation_behavior',
  content:
    'Conteúdo de ajuda em desenvolvimento. Use os achados clínicos e o contexto do paciente para interpretar o teste.',
  clinicalTip:
    'Em caso de dúvida, repita o teste e compare lateralidade.',
})

export const helpTopicsComplete: HelpTopic[] = [
  {
    id: 'sec_mentation_behavior',
    title: 'Mentação e Comportamento',
    section: 'mentation_behavior',
    content:
      'Avalia nível de consciência e comportamento. Alterações de mentação podem indicar lesões em prosencéfalo ou tronco encefálico.',
    clinicalTip:
      'Diferencie depressão por dor/sedação de alteração neurológica real.',
  },
  {
    id: 'sec_gait_posture',
    title: 'Marcha e Postura',
    section: 'gait_posture',
    content:
      'Diferencia paresia/plegia de ataxia e ajuda a localizar lesões na medula espinhal.',
    clinicalTip:
      'Observe o paciente em linha reta e em curvas para identificar padrões.',
  },
  {
    id: 'sec_postural_reactions',
    title: 'Reações Posturais',
    section: 'postural_reactions',
    content:
      'Testes de via longa para detectar déficits proprioceptivos e assimetrias.',
  },
  {
    id: 'sec_cranial_nerves',
    title: 'Nervos Cranianos',
    section: 'cranial_nerves',
    content:
      'Avalia tronco encefálico e vias sensoriais. Combinar com mentação para localização.',
  },
  {
    id: 'sec_spinal_reflexes',
    title: 'Reflexos Espinhais',
    section: 'spinal_reflexes',
    content:
      'Avaliam arco reflexo e integridade de neurônio motor inferior.',
  },
  {
    id: 'sec_pain_nociception',
    title: 'Dor e Nocicepção',
    section: 'pain_nociception',
    content:
      'Dor espinhal e nocicepção profunda ajudam a definir prognóstico e urgência.',
    clinicalTip:
      'Reflexo não equivale à percepção consciente de dor.',
  },
  {
    id: 'test_consciousness',
    title: 'Nível de Consciência',
    section: 'mentation_behavior',
    content:
      'Avalie responsividade espontânea e a estímulos auditivos/táteis.',
  },
  {
    id: 'test_behavior',
    title: 'Comportamento',
    section: 'mentation_behavior',
    content:
      'Observe interação, orientação e resposta ao ambiente.',
  },
  {
    id: 'test_ambulation',
    title: 'Capacidade de Deambular',
    section: 'gait_posture',
    content:
      'Determine se o paciente é ambulatório, com apoio ou não ambulatório.',
  },
  {
    id: 'test_deep_pain',
    title: 'Dor Profunda',
    section: 'pain_nociception',
    content:
      'Estimule a falange e observe resposta consciente (virar cabeça, vocalizar).',
  },
]

export function getHelpTopicComplete(id: string): HelpTopic {
  return helpTopicsComplete.find((topic) => topic.id === id) || fallbackTopic(id)
}

export function requireHelpId(id: string): string {
  return id || 'help_missing'
}
