import type { Disease } from '../../types'
import {
  PERIOP_PATHOPHYSIOLOGY_FULL,
  PERIOP_PATHOPHYSIOLOGY_VISUAL,
} from '../pathophysiologyPeriop'

export const perioperatorioDiseases: Disease[] = [
  {
    name: 'Profilaxia Cirúrgica Perioperatória',
    pathogens:
      'Bactérias comensais autóctones da pele do sítio cirúrgico (Staphylococcus pseudintermedius, Staphylococcus epidermidis, Streptococcus spp.) ou microbiota endógena do órgão oco abordado (Enterobacteriaceae e anaeróbios em cirurgias digestivas).',
    pathophysiologyFull: PERIOP_PATHOPHYSIOLOGY_FULL,
    pathophysiologyVisual: PERIOP_PATHOPHYSIOLOGY_VISUAL,
    firstLine: {
      title: '1ª linha de escolha (Cefalosporina de 1ª geração IV)',
      presentation:
        'A profilaxia antibiótica perioperatória visa atingir concentrações teciduais bactericidas no sítio cirúrgico ANTES da incisão com o bisturi.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Cefazolina (IV)',
              rationale:
                'PADRÃO OURO DE PROFILAXIA CIRÚRGICA: Administrar 30 mg/kg IV lenta na indução anestésica (30 a 60 minutos antes da incisão cirúrgica na pele). Excelente concentração tecidual cutânea e subcutânea e ação bactericida seletiva contra estafilococos e estreptococos.',
            },
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Alternativa parenteral para cirurgias com contaminação fisiológica leve ou abordagem de trato hepatobiliar/urinário.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: 'Cirurgias Colorretais Contaminadas / Abordagem de Vísceras Ocas',
      presentation:
        'Procedimentos com abertura de cólon, reto ou cavidades com alta densidade de bactérias anaeróbias estritas.',
      regimes: [
        {
          mode: 'combinacao_simultanea',
          drugs: [
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Base para enterococos e cocos Gram-positivos.',
            },
            {
              name: 'Metronidazol',
              rationale:
                'Reforço bactericida intravenoso potente contra anaeróbios estritos da luz intestinal.',
            },
          ],
        },
      ],
    },
    duration:
      '**DOSE ÚNICA PRÉ-OPERATÓRIA**. Se a cirurgia exceder 90 a 120 minutos (duas meias-vidas da cefazolina) ou houver hemorragia volumosa (> 20 mL/kg), administrar reforço intraoperatório na metade da dose inicial a cada 90-120 min. **DESCONTINUAR O ANTIMICROBIANO IMEDIATAMENTE AO FINAL DA CIRURGIA** (nunca prolongar por mais de 24 horas no pós-operatório).',
    notes:
      'CRITÉRIOS DE INDICAÇÃO E CONDUTAS DA COMISSÃO DE INFECÇÃO HOSPITALAR (CCIH):\n1. QUANDO NÃO USAR PROFILAXIA: Procedimentos cirúrgicos limpos em animais saudáveis (ASA I ou II) com duração inferior a 90 minutos (ex.: OHE e orquiectomias eletivas em animais jovens, nódulos cutâneos pequenos, sutura de feridas limpas recentes) NÃO DEVEM RECEBER ANTIMICROBIANOS de rotina.\n2. QUANDO USAR PROFILAXIA: Cirurgias limpas com implantação de próteses/materiais ortopédicos (placas, parafusos, telas de polipropileno); procedimentos com duração prevista > 90 minutos; cirurgias limpas-contaminadas (abertura programada de trato digestivo, urinário ou respiratório); animais ASA III, idosos, desnutridos ou imunossuprimidos.\n3. O ERRO DO "PÓS-OPERATÓRIO PREVENTIVO": Manter antibióticos orais ou injetáveis por 7 a 10 dias após uma cirurgia limpa eletiva não diminui as taxas de infecção de ferida cirúrgica e aumenta comprovadamente a colonização por bactérias multirresistentes hospitalares.',
  },
]
