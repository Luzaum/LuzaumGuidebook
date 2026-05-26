import { PainGuideSection } from '../types';

export const PAIN_GUIDE_SECTIONS: PainGuideSection[] = [
  {
    id: 'recognition',
    title: 'Reconhecimento da Dor',
    icon: 'Stethoscope',
    content: [
      {
        type: 'alert',
        title: 'Princípio Clínico Fundamental',
        body: 'A dor compromete o sistema imunológico, atrasa a cicatrização e causa estresse metabólico profundo. Animais sentem dor de forma análoga aos seres humanos. Na dúvida, adote o princípio do benefício da dúvida e trate.',
        alertType: 'info'
      },
      {
        type: 'text',
        title: 'Sinais Clínicos de Dor em Cães',
        body: 'Cães costumam manifestar dor de maneira mais ativa ou óbvia que os felinos. Fique atento a:\n• Comportamentais: Vocalizações (gemidos, ganidos), lambedura ou automutilação da área cirúrgica, agressividade defensiva, prostração.\n• Posturais: Dorso arqueado, cabeça baixa, relutância em se mover, tremores corporais espontâneos, cauda encolhida.\n• Fisiológicos: Taquicardia, taquipneia, midríase, salivação excessiva.'
      },
      {
        type: 'text',
        title: 'Sinais Clínicos de Dor em Gatos',
        body: 'Gatos são predadores solitários e tendem a ocultar sinais de dor física extrema para proteção. Eles manifestam dor de forma sutil:\n• Comportamentais: Isolamento absoluto no fundo do canil, recusa em interagir, silêncio absoluto ou ronrono disfuncional de dor.\n• Posturais: Olhos semicerrados, orelhas abertas lateralmente ou rotacionadas, corpo extremamente contraído ou imóvel (aparente apatia), rigidez.\n• Alimentares: Anorexia completa, desinteresse repentino pela comida.'
      }
    ]
  },
  {
    id: 'pharmacology',
    title: 'Classes Farmacológicas',
    icon: 'ShieldCheck',
    content: [
      {
        type: 'text',
        title: 'Abordagem de Analgesia Multimodal',
        body: 'A dor cirúrgica ou crônica deve ser tratada combinando fármacos com mecanismos de ação distintos nas vias de nocicepção, reduzindo doses individuais e minimizando efeitos colaterais deletérios.'
      },
      {
        type: 'table',
        headers: ['Classe', 'Fármacos Comuns', 'Mecanismo principal', 'Principais Indicações / Cuidados'],
        rows: [
          [
            'Opioides Fortes',
            'Morfina, Metadona, Fentanil',
            'Agonistas de receptores Mu (µ) no SNC',
            'Dor aguda grave, pré-operatório imediato, resgates analgésicos rápidos.'
          ],
          [
            'Opioides Fracos',
            'Tramadol, Buprenorfina',
            'Agonista µ fraco / inibidor de recaptação de serotonina',
            'Dor leve a moderada. Nota: Tramadol tem eficácia reduzida/variável em cães.'
          ],
          [
            'AINEs',
            'Meloxicam, Carprofeno, Grapiprant',
            'Inibidores da COX (COX-1/COX-2) ou EP4',
            'Dor inflamatória crônica ou aguda. Cuidado em cães e gatos renais/hepáticos.'
          ],
          [
            'Anestésicos Locais',
            'Lidocaína, Bupivacaína',
            'Bloqueio dos canais de Sódio periféricos',
            'Bloqueios incisionais, epidurais, infiltrações peri-nervosas. Essenciais na analgesia preventiva.'
          ],
          [
            'Adjuvantes',
            'Gabapentina, Pregabalina, Cetamina (CRI)',
            'Inibidores de canais de Cálcio / Antagonistas NMDA',
            'Prevenção de sensibilização central (wind-up) e dor neuropática crônica.'
          ]
        ]
      }
    ]
  },
  {
    id: 'decision-flow',
    title: 'Fluxo de Decisão Clínica',
    icon: 'ListChecks',
    content: [
      {
        type: 'alert',
        title: 'Fluxograma de Monitoramento',
        body: 'A dor deve ser avaliada como o 5º sinal vital de forma sistemática durante todo o internamento ou período pós-operatório imediato.',
        alertType: 'warning'
      },
      {
        type: 'list',
        title: 'Etapas Recomendadas para a Tomada de Decisão:',
        items: [
          '1. Aplique a escala de dor correspondente (ex: Glasgow CMPS-SF para cães, UNESP-Botucatu para gatos).',
          '2. Se o escore for menor que o limiar de resgate: Continue a monitorização a cada 2-4 horas.',
          '3. Se o escore atingir ou superar o limiar de resgate (ex: ≥ 6 no cão, ≥ 8 na UNESP-Gatos): Administre o Resgate Analgésico.',
          '4. Espere 30 a 60 minutos após a aplicação do fármaco endovenoso/intramuscular.',
          '5. Reavalie o paciente. Se a dor persistir, eleve o tier analgésico clínico.'
        ]
      }
    ]
  },
  {
    id: 'rescue-protocol',
    title: 'Protocolo de Resgate',
    icon: 'AlertTriangle',
    content: [
      {
        type: 'alert',
        title: 'Atenção aos Tiers de Intervenção',
        body: 'Em casos de dor aguda grave persistente, a escalada de dose deve seguir a gravidade do quadro, garantindo o conforto ético do animal.',
        alertType: 'danger'
      },
      {
        type: 'text',
        title: 'Tier 1: Dor Leve a Moderada (Escore ligeiramente acima do limiar)',
        body: '• Dipirona (25-30 mg/kg, IV ou SC) combinada a uma dose de reforço de AINE se não houver contraindicação (Meloxicam 0.1 mg/kg ou Carprofeno 4 mg/kg).\n• Considere aplicação de compressa fria local no sítio cirúrgico.'
      },
      {
        type: 'text',
        title: 'Tier 2: Dor Moderada a Grave (Escore nitidamente elevado)',
        body: '• Metadona (0.2 - 0.3 mg/kg, IM ou IV lento) OU Morfina (0.2 - 0.5 mg/kg, IM ou SC).\n• Adicione Dipirona caso o paciente não tenha recebido previamente nas últimas 8 horas.'
      },
      {
        type: 'text',
        title: 'Tier 3: Dor Refratária / Extrema',
        body: '• Estabelecer infusão contínua (CRI) de Cetamina (0.1 - 0.5 mg/kg/h) combinada ou não a Fentanil (2 - 5 mcg/kg/h).\n• Se aplicável, realize bloqueio local anestésico tardio ao redor da incisão com Bupivacaína diluída.'
      }
    ]
  }
];
