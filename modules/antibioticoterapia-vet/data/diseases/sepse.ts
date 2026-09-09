import type { Disease } from '../../types'
import {
  SEPSE_PATHOPHYSIOLOGY_FULL,
  SEPSE_PATHOPHYSIOLOGY_VISUAL,
} from '../pathophysiologySepse'

export const sepseDiseases: Disease[] = [
  {
    name: 'Sepse de Origem Desconhecida / Choque Séptico',
    pathogens:
      'Infecção polimicrobiana bacteriana aguda envolvendo os 4 quadrantes microbiológicos: Gram-positivos (Staphylococcus pseudintermedius, Streptococcus canis, Enterococcus faecalis), bacilos Gram-negativos entéricos endotóxicos (Escherichia coli, Klebsiella pneumoniae, Proteus spp., Enterobacter spp., Pseudomonas aeruginosa) e anaeróbios estritos (Bacteroides fragilis, Clostridium spp.).',
    pathophysiologyFull: SEPSE_PATHOPHYSIOLOGY_FULL,
    pathophysiologyVisual: SEPSE_PATHOPHYSIOLOGY_VISUAL,
    firstLine: {
      title: '1ª linha de emergência: Associação IV Imediata de 4 Quadrantes',
      presentation:
        'HORA DE OURO DA SEPSE: Administrar terapia intravenosa bactericida combinada de amplo espectro na PRIMEIRA HORA após o diagnóstico da sepse ou choque séptico.',
      regimes: [
        {
          mode: 'combinacao_simultanea',
          drugs: [
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Base beta-lactâmica intravenosa rápida, cobrindo cocos Gram-positivos e anaeróbios com baixo perfil de toxicidade orgânica.',
            },
            {
              name: 'Enrofloxacina',
              rationale:
                'Fluoroquinolona potente com alta eficácia bactericida contra bacilos Gram-negativos aeróbios e enterobactérias endotóxicas.',
            },
          ],
        },
        {
          mode: 'combinacao_simultanea',
          drugs: [
            {
              name: 'Clindamicina',
              rationale:
                'Alternativa parenteral para Gram-positivos e anaeróbios com potente inibição da síntese de exotoxinas bacterianas.',
            },
            {
              name: 'Gentamicina (parenteral)',
              rationale:
                'Aminoglicosídeo bactericida de ação ultra-rápida (ATENÇÃO: usar apenas APÓS reidratação volêmica plena e restauração da pressão arterial para prevenir necrose tubular renal aguda).',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (Infecção Hospitalar Grave / Patógenos Multirresistentes)',
      presentation:
        'Reservar estritamente para sepse nosocomial adquirida em UTI, falha terapêutica grave ou isolamento microbiológico de germes produtores de carbapenemases / ESBL.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Piperacilina + Tazobactam (IV)',
              rationale:
                'Ureidopenicilina antipseudomonas de amplo espectro com inibidor de beta-lactamase para infecções intra-hospitalares graves.',
            },
            {
              name: 'Meropenem',
              rationale:
                'Carbapenêmico de reserva absoluta institucional para sepse refratária com choque distributivo severo (uso controlado por comissão de infecção).',
            },
          ],
        },
      ],
    },
    duration:
      'Geralmente 5 a 7 dias (descontinuar ou desescalonar a terapia precocemente assim que houver estabilização dos parâmetros vitais, normalização do lactato sérico, clareamento da leucocitose e resultado das hemoculturas e antibiograma). Cursos fixos arbitrários de 14 dias aumentam a mortalidade por infecções secundárias fúngicas e bactérias oportunistas.',
    notes:
      'PROTOCOLOS CRÍTICOS DA SEPSE:\n1. PACOTE DA PRIMEIRA HORA: Coletar 2 amostras de hemocultura de sítios venosos distintos antes de infundir o antimicrobiano, mas NUNCA atrasar a infusão da 1ª dose por mais de 45-60 minutos se houver dificuldade técnica de coleta.\n2. RESSUSCITAÇÃO HEMODINÂMICA: Fluidoterapia com cristaloides balanceados (alíquotas de 10-20 mL/kg em 15 min), mensuração seriada de lactato e uso precoce de vasopressores (Noradrenalina 0,1 a 1,0 µg/kg/min) se a PAM permanecer < 65 mmHg após expansão volêmica.\n3. CONTROLE DO FOCO INFECCIOSO (eliminação e drenagem da fonte infecciosa): Se houver abscesso, peritonite séptica, piometra ou piotórax, a intervenção cirúrgica descompressiva ou drenagem nas primeiras 6 a 12 horas é indispensável para a sobrevida.',
  },
  {
    name: 'Profilaxia da Sepse em Pacientes Neutropênicos',
    pathogens:
      'Translocação de bacilos Gram-negativos entéricos (Escherichia coli, Klebsiella, Pseudomonas) e bactérias comensais cutâneas (Staphylococcus spp.) facilitada pelo colapso da barreira mucosa e neutropenia severa.',
    firstLine: {
      title: '1ª linha (neutropenia profunda afebril)',
      presentation:
        'Indicada em animais com neutrófilos segmentados < 1.000 células/µL (ou queda rápida < 500/µL) secundária a quimioterapia mielossupressora ou parvovirose canina.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Monoterapia oral de amplo espectro em pacientes ambulatoriais estáveis, afebris e que toleram medicação por via oral.',
            },
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Opção parenteral intravenosa para pacientes hospitalizados com náusea ou íleo paralítico.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha: Neutropenia Febril (EMERGÊNCIA MÉDICA)',
      presentation:
        'Febre (> 39,5 °C) em paciente com neutropenia < 1.000/µL configura sepse neutropênica de alto risco com necessidade imediata de cobertura parenteral bactericida dupla.',
      regimes: [
        {
          mode: 'combinacao_simultanea',
          drugs: [
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Base para cobertura de Gram-positivos e anaeróbios.',
            },
            {
              name: 'Enrofloxacina',
              rationale:
                'Cobertura bactericida para bacilos Gram-negativos endotóxicos translocados.',
            },
          ],
        },
      ],
    },
    duration:
      'Manter até a recuperação segura da contagem absoluta de neutrófilos acima de 1.000 a 1.500 células/µL e ausência de febre por pelo menos 48 horas.',
    notes:
      'CONDUTA NA NEUTROPENIA FEBRIL: Medir a temperatura retal do paciente a cada 6 a 8 horas. Qualquer elevação térmica em animal neutropênico deve ser tratada como sepse imediata com antibiótico IV na primeira hora, isolamento reverso protetor e suspensão de quaisquer medicamentos imunossupressores.',
  },
]
