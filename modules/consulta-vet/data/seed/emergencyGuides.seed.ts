import { EmergencyGuide } from '../../types/emergencyGuide';

/**
 * Cartilhas de manejo emergencial — conteúdo editorial em expansão.
 * Por enquanto: previews estruturais; substituir blocos `placeholder` quando a pesquisa estiver pronta.
 */
export const emergencyGuidesSeed: EmergencyGuide[] = [
  {
    id: 'eg-cetoacidose',
    slug: 'cetoacidose-diabetica',
    title: 'Manejo de cetoacidose',
    subtitle: 'Cetoacidose diabética (CAD / DKA) — fluxo de bolso',
    description:
      'Cartilha em etapas: reconhecer, estabilizar, tratar a causa metabólica e monitorar. Conteúdo completo será adicionado na próxima revisão editorial.',
    tags: ['Metabólico', 'Diabetes', 'Emergência', 'Fluidoterapia'],
    species: ['dog', 'cat'],
    isPublished: true,
    pages: [
      {
        id: 'ca-p1',
        title: 'Reconhecimento e prioridades',
        stepOrder: 1,
        phase: 'reconhecimento',
        intro:
          'Pense em CAD em paciente poliúrico prévio com vômito, fraqueza, dispneia de Kussmaul (quando aplicável) e cheiro cetônico; confirmação laboratorial virá na sequência do seu fluxo local.',
        blocks: [
          {
            type: 'callout',
            variant: 'critical',
            title: 'Primeiro: avaliação ABC',
            text: 'Via aérea, respiração, circulação e estado de consciência — antes de qualquer protocolo fino.',
          },
          {
            type: 'checklist',
            title: 'Sinais que elevam suspeita (prévia — detalhar depois)',
            items: [
              'História compatível com diabetes ou poliúria/polidipsia recente',
              'Vômito, anorexia, progressão rápida do quadro',
              'Desidratação, fraqueza, hipotermia relativa ou febre se complicado',
              'Hálito cetônico ou hiperventilação compensatória quando presente',
            ],
          },
          {
            type: 'placeholder',
            message:
              'Preview: aqui entrará lista enxuta de critérios laboratoriais (glicose, cetonas, ácidos-base, eletrólitos) e decisão de encaminhamento internamento.',
          },
        ],
      },
      {
        id: 'ca-p2',
        title: 'Estabilização inicial',
        stepOrder: 2,
        phase: 'estabilizacao',
        intro: 'Fluidoterapia, correções e início de terapia antidiabética conforme protocolo do serviço — texto completo a seguir.',
        blocks: [
          {
            type: 'callout',
            variant: 'warning',
            title: 'Potássio',
            text: 'Preview: regra prática sobre K+ antes/durante fluidos e insulina — evitar hipocalemia iatrogênica.',
          },
          {
            type: 'steps',
            title: 'Esqueleto de passos (completar)',
            items: [
              'Acesso venoso e coleta para gasometria, eletrólitos, hematócrito e glicemia',
              'Plano de fluidos isotônicos — taxas e reavaliação seriada (detalhar)',
              'Insulina: esquema e alvo de queda glicêmica (detalhar)',
            ],
          },
          {
            type: 'placeholder',
            message: 'Preview: tabela-resumo de alvos de glicemia/hora e quando reduzir infusão.',
          },
        ],
      },
      {
        id: 'ca-p3',
        title: 'Monitoramento e transição',
        stepOrder: 3,
        phase: 'monitoramento',
        blocks: [
          {
            type: 'keyPoints',
            title: 'O que acompanhar (expandir)',
            items: [
              'Glicemia seriada, input/output, peso e perfusão',
              'Eletrólitos (K+, fosfato) e ácidos-base',
              'Apetite, vômito, sinais neurológicos',
            ],
          },
          {
            type: 'placeholder',
            message:
              'Preview: critérios de alta da infusão, transição para SC, educação do tutor e sinais de alarme para retorno.',
          },
        ],
      },
    ],
  },
  {
    id: 'eg-edema-pulmonar',
    slug: 'edema-pulmonar-cardiogenico',
    title: 'Manejo de edema pulmonar cardiogênico agudo',
    subtitle: 'Congestão aguda — oxigenação, redução de pré-carga e suporte',
    description:
      'Fluxo focado em oxigenar, reduzir estresse cardíaco e tratar gatilhos. Conteúdo detalhado e doses na próxima versão.',
    tags: ['Cardiologia', 'Respiratório', 'Emergência', 'ICC'],
    species: ['dog', 'cat'],
    isPublished: true,
    pages: [
      {
        id: 'ep-p1',
        title: 'Triagem e oxigenação',
        stepOrder: 1,
        phase: 'reconhecimento',
        intro: 'Identificar padrão de dispneia congestiva e instalar suporte imediato.',
        blocks: [
          {
            type: 'callout',
            variant: 'critical',
            title: 'Estabilizar respiração',
            text: 'Preview: posicionamento, oxigenoterapia, caixa de O₂ vs fluxo; quando considerar sedação leve.',
          },
          {
            type: 'checklist',
            title: 'Achados compatíveis (expandir)',
            items: [
              'Dispneia aguda com ruídos pulmonares úmidos / crackles',
              'História de cardiopatia ou murmúrio relevante',
              'Cianose ou esforço respiratório extremo = prioridade máxima',
            ],
          },
          {
            type: 'placeholder',
            message: 'Preview: algoritmo imagem (rápido) vs estabilização primeiro.',
          },
        ],
      },
      {
        id: 'ep-p2',
        title: 'Tratamento farmacológico e monitorização',
        stepOrder: 2,
        phase: 'tratamento_especifico',
        blocks: [
          {
            type: 'steps',
            title: 'Eixo terapêutico (a detalhar)',
            items: [
              'Diurético de alça — dose e cautelas renais/hepáticas',
              'Vasodilatador / nitrato quando indicado no seu protocolo',
              'Opioides em estresse respiratório extremo — dose e monitoração',
            ],
          },
          {
            type: 'callout',
            variant: 'info',
            title: 'Gato',
            text: 'Preview: nuances felinas (ex.: cautela com alguns vasodilatadores) — texto a incorporar.',
          },
          {
            type: 'placeholder',
            message: 'Preview: frequência de reavaliação, meta de FR, quando encaminhar UTI.',
          },
        ],
      },
    ],
  },
  {
    id: 'eg-tce',
    slug: 'traumatismo-cranioencefalico',
    title: 'Manejo de TCE',
    subtitle: 'Traumatismo cranioencefálico — neuroproteção e suporte',
    description:
      'Sequência: estabilização geral, controle de pressão intracraniana e suporte. Detalhes neuro e farmacológicos na versão completa.',
    tags: ['Neurologia', 'Trauma', 'Emergência', 'Anestesia'],
    species: ['dog', 'cat'],
    isPublished: true,
    pages: [
      {
        id: 'tce-p1',
        title: 'Primeiros minutos',
        stepOrder: 1,
        phase: 'estabilizacao',
        intro: 'Evitar hipóxia e hipotensão — ambas pioram desfecho neurológico.',
        blocks: [
          {
            type: 'callout',
            variant: 'critical',
            title: 'Coluna e via aérea',
            text: 'Preview: imobilização cervical quando indicado; priorizar oxigenação sem hiperventilar de rotina.',
          },
          {
            type: 'checklist',
            title: 'Avaliação neurológica rápida',
            items: [
              'Nível de consciência (escala do serviço)',
              'Pupilas e reflexos — série documentada',
              'Sinais de herniação (acionar protocolo de crise)',
            ],
          },
          {
            type: 'placeholder',
            message: 'Preview: escore de coma modificado e fotos/desenho de pupilas para equipe.',
          },
        ],
      },
      {
        id: 'tce-p2',
        title: 'Medidas de suporte intracraniano',
        stepOrder: 2,
        phase: 'tratamento_especifico',
        blocks: [
          {
            type: 'steps',
            title: 'Pilares (completar com evidência)',
            items: [
              'Elevar cabeceira moderadamente quando seguro',
              'Manitol ou hipertônico — indicações e doses',
              'Evitar fator que aumente PIC (luta, vômito, hipertermia)',
            ],
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Fluidoterapia',
            text: 'Preview: equilíbrio entre perfusão cerebral e edema — diretrizes do centro.',
          },
        ],
      },
      {
        id: 'tce-p3',
        title: 'Monitoramento contínuo',
        stepOrder: 3,
        phase: 'monitoramento',
        blocks: [
          {
            type: 'keyPoints',
            title: 'Série neurológica',
            items: [
              'Frequência de reavaliação nas primeiras horas',
              'Quando repetir imagem',
              'Critérios de piora que exigem escalação',
            ],
          },
          {
            type: 'placeholder',
            message: 'Preview: plano de analgesia segura, anticonvulsivante de resgate e prognóstico conversado com tutor.',
          },
        ],
      },
    ],
  },
];
