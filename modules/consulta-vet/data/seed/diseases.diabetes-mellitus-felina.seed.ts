import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Diabetes Mellitus Felino — Ficha clínica estruturada ConsultaVET.
 * Fontes: AAHA 2026 Guidelines for Cats > iCatCare 2025 Consensus > Aula Magna 2026 > FDA Bexacat/Senvelgo Labels (2026) > Nelson & Couto 6ª ed.
 */
export const diabetesMellitusFelinaRecord: DiseaseRecord = {
  id: 'disease-diabetes-mellitus-felina',
  slug: 'diabetes-mellitus-felina',
  title: 'Diabetes Mellitus Felino',
  synonyms: [
    'Diabetes felino',
    'DM felina',
    'Diabetes mellitus em gatos',
    'Diabetes Mellitus Felino',
    'Feline diabetes mellitus',
  ],
  species: ['cat'],
  category: 'endocrinologia',
  tags: [
    'Diabetes',
    'Insulina',
    'Glargina',
    'PZI',
    'ProZinc',
    'SGLT2',
    'Bexacat',
    'Senvelgo',
    'eDKA',
    'Remissão',
    'AAHA2026',
    'iCatCare2025',
    'Neuropatia',
    'Plantigradia',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['diabetes-mellitus-felina'],
  quickSummary:
    'O diabetes mellitus felino resulta geralmente da interação entre resistência à insulina e deterioração progressiva da função das células β pancreáticas, com participação importante de obesidade, glicotoxicidade, lipotoxicidade e deposição de amiloide nas ilhotas. Os sinais clássicos são poliúria, polidipsia, polifagia e perda de peso, podendo ocorrer sarcopenia e neuropatia periférica com postura plantígrada. Como a hiperglicemia de estresse pode ser intensa em gatos, o diagnóstico deve comprovar hiperglicemia sustentada por sinais clínicos e evidências como glicosúria persistente, frutosamina elevada, glicemias domiciliares ou monitor contínuo de glicose. O manejo moderno pode utilizar insulinoterapia — principalmente glargina U100 ou PZI, frequentemente iniciadas em 1 UI/gato q12h — ou inibidores de SGLT2 em gatos recém-diagnosticados, metabolicamente estáveis e criteriosamente selecionados. SGLT2 exigem monitoramento de β-hidroxibutirato devido ao risco de cetoacidose euglicêmica. Dieta rica em proteína e restrita em carboidratos, controle da obesidade e tratamento precoce da hiperglicemia ajudam a preservar função β-celular e podem permitir remissão, definida atualmente como euglicemia por mais de quatro semanas sem tratamento antidiabético. Monitor contínuo de glicose e acompanhamento domiciliar são preferidos à curva glicêmica hospitalar de rotina (AAHA 2026; iCatCare 2025).',
  quickDecisionStrip: [
    'Hiperglicemia de Estresse Alerta: Não diagnosticar DM felino por uma única glicemia isolada na clínica; exige comprovação sustentada (2,3,6).',
    'Tríade Diagnóstica: Sinais clínicos (PU/PD, PP, sarcopenia) + Hiperglicemia sustentada + Glicosúria persistente (1–3).',
    'Remissão Diabética AAHA 2026: Euglicemia mantida por >4 semanas sem insulina/SGLT2. ~25% em 2-3 meses, maioria nos primeiros 6 meses (2).',
    'Insulinas Preferidas AAHA 2026: Glargina U100 ou PZI (ProZinc U40), ambas iniciadas com 1 U/GATO SC q12h (2). NPH não é recomendada (2).',
    'Via SGLT2 (Bexacat / Senvelgo): APENAS em gato recém-diagnosticado, metabolicamente estável, comendo, hidratado e sem cetose (2,10,11).',
    'Risco de eDKA (DKA Euglicêmica): SGLT2 induz glicosúria e normaliza glicemia mesmo com cetose/acidose grave (2,10,11).',
    'Vigilância do BHB (AAHA 2026): BHB >2,4 mmol/L ou cetonúria → suspender SGLT2 e iniciar insulina + dextrose hospitalar (2).',
    'Curvas Hospitalares Banidas: AAHA 2026 desaconselha curva glicêmica hospitalar de rotina em gatos devido ao estresse (2). Usar monitor contínuo de glicose ou ALIVE DCS (1,3).',
    'Neuropatia Plantígrada: Polineuropatia distal por hiperglicemia crônica com apoio dos tarsos no solo; controle metabólico é a chave (3).',
    'Alimentação Felina AAHA 2026: Dieta rica em proteínas (>40-45% EM) e pobre em carboidratos (<12-15% EM), preferencialmente úmida (2).',
  ],
  quickSummaryRich: {
    lead:
      'O diabetes mellitus felino é uma doença complexa de resistência à insulina e falência β reversível por glicotoxicidade, permitindo a remissão clínica em muitos pacientes. O manejo atual contempla insulinoterapia conservadora (1 UI/gato q12h) ou inibidores de SGLT2 em pacientes selecionados, exigindo vigilância de eDKA via β-hidroxibutirato.',
    leadHighlights: ['falência β reversível', 'remissão clínica', '1 UI/gato q12h', 'SGLT2', 'eDKA'],
    pillars: [
      {
        title: 'Remissão & Glicotoxicidade',
        body: 'A reversão precoce da hiperglicemia remove a glicotoxicidade e permite a recuperação da secreção endógena de insulina, podendo gerar remissão por mais de 4 semanas.',
        highlights: ['Glicotoxicidade', 'recuperação endógena', 'remissão por >4 semanas'],
      },
      {
        title: 'Insulinoterapia vs SGLT2',
        body: 'Glargina U100 ou PZI 1 U/gato q12h para descompensados ou gerais. SGLT2 (Bexacat/Senvelgo) exclusivamente para gatos estáveis não cetóticos.',
        highlights: ['Glargina U100', 'PZI 1 U/gato', 'Bexacat / Senvelgo'],
      },
      {
        title: 'Monitoramento Sem Estresse',
        body: 'Evitar curvas hospitalares. Utilizar sensor FreeStyle Libre (monitor contínuo de glicose), frutosamina seriada, glicemia domiciliar e escore ALIVE DCS (0–12) do iCatCare.',
        highlights: ['Evitar curvas hospitalares', 'monitor contínuo de glicose', 'ALIVE DCS'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxograma diagnóstico',
      steps: [
        {
          label: 'Suspeita clínica',
          timing: 'Consulta inicial',
          detail:
            'PU/PD, polifagia, perda de peso/sarcopenia; neuropatia plantígrada; diferenciar hipertireoidismo e DRC (AAHA 2026; iCatCare 2025).',
        },
        {
          label: 'Não confirmar por glicemia isolada',
          timing: 'Na clínica',
          detail:
            'Hiperglicemia de estresse felina pode ser >300–400 mg/dL. Exigir evidência sustentada: frutosamina, glicemia domiciliar ou monitor contínuo de glicose (AAHA 2026).',
          reassess: 'Repetir exames fora do estresse hospitalar.',
        },
        {
          label: 'Tríade + BHB se SGLT2',
          timing: 'Confirmação',
          detail:
            'Sinais clínicos + hiperglicemia sustentada + glicosúria persistente. Dosar BHB antes de iniciar SGLT2; cetose contraindica SGLT2 (AAHA 2026; FDA Bexacat/Senvelgo).',
        },
        {
          label: 'Banco inicial',
          timing: 'Estadiamento',
          detail:
            'Hemograma, bioquímica, eletrólitos, urinálise, T4 total em idosos; ultrassom se pancreatite/HST suspeita (AAHA 2026; Nelson & Couto, 2020).',
        },
        {
          label: 'Escolher via terapêutica',
          timing: 'Pós-confirmação',
          detail:
            'Insulina (descompensado/cetótico/anoréxico) vs SGLT2 (recém-diagnosticado, estável, comendo, hidratado, sem cetose) (AAHA 2026).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxograma terapêutico',
      steps: [
        {
          label: 'Insulina — 1ª linha',
          detail: 'Glargina U100 ou PZI (ProZinc®): 1 U/gato SC q12h; evitar NPH de rotina (AAHA 2026; iCatCare 2025).',
          dose: '1 U/gato q12h SC; titular ±0,5–1 U a cada 1–2 semanas.',
          duration: 'Até remissão ou controle estável.',
          reassess: 'Reduzir dose se pré-dose normoglicêmica ou queda da necessidade.',
        },
        {
          label: 'SGLT2 — seleção estrita',
          detail: 'Bexacat® 15 mg/gato q24h (≥3 kg) ou Senvelgo® 1 mg/kg q24h; apenas gato estável não cetótico (AAHA 2026; FDA labels).',
          reassess: 'BHB >2,4 mmol/L → suspender SGLT2 e iniciar insulina + dextrose.',
        },
        {
          label: 'Dieta rica em proteína e pobre em carboidrato',
          detail: '>40–45% EM proteína, <12–15% EM carboidrato, preferencialmente úmida (AAHA 2026).',
        },
        {
          label: 'Monitorar o gato, não só números',
          detail: 'Peso, ALIVE DCS (0–12), resolução PU/PD; monitor contínuo de glicose domiciliar; evitar curva hospitalar de rotina (AAHA 2026; iCatCare 2025).',
        },
        {
          label: 'Remissão',
          detail: 'Euglicemia >4 semanas sem tratamento; ~25% em 2–3 meses, maioria nos primeiros 6 meses (AAHA 2026).',
          reassess: 'Remissão não é cura — vigilância para recaída.',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'DM felina é uma síndrome metabólica caracterizada por resistência periférica à insulina associada à disfunção progressiva das células β, fortemente influenciada por obesidade, deposição de amiloide nas ilhotas, glicotoxicidade e lipotoxicidade (1–3,5). Compartilha semelhanças com o DM tipo 2 humano.',
    glicotoxicidadeERemissao:
      'Ciclo da glicotoxicidade: Obesidade/doença → Resistência insulínica → Hiperglicemia → Supressão tóxica da secreção de insulina pelas células β. A reversão rápida da hiperglicemia alivia a supressão tóxica e permite recuperar a função pancreática, levando à REMISSÃO DIABÉTICA (1–3). Remissão não é cura definitiva; exige vigilância para evitar recaídas (2).',
    fatoresDeResistência:
      'Fatores de resistência insulínica felina: Obesidade, sedentarismo, uso de glicocorticoides/progestágenos, Hipersomatotropismo (HST / acromegalia — associado a doses crescentes de insulina >5 U/dose), Hiperadrenocorticismo (HAC felino com fragilidade cutânea), pancreatite e doença periodontal (1–3).',
  },
  epidemiology: {
    prevalencia:
      'Endocrinopatia de alta prevalência em gatos maduros a idosos, com maior risco em machos castrados, obesos e sedentários (1–3).',
  },
  pathogenesisTransmission: {
    cascata: [
      'Instalação de resistência periférica à insulina (obesidade, inatividade, corticoides, progestágenos) (AAHA 2026; iCatCare 2025).',
      'Sobrecarga funcional compensatória sobre as células β pancreáticas (1–3).',
      'Início de hiperglicemia plasmática e deposição de polipeptídeo amiloide de ilhota (IAPP) no pâncreas (1–3).',
      'Efeito tóxico da hiperglicemia sustentada (glicotoxicidade) sobre o maquinário secretor das células β (1–3).',
      'Passagem do limiar renal felino (~250–300 mg/dL) desencadeando glicosúria persistente (1,6).',
      'Diurese osmótica tubular gerando poliúria e polidipsia compensatória (1,6).',
      'Déficit energético celular + sarcopenia e catabolismo muscular gerando polifagia com perda de peso (1–3).',
      'Desenvolvimento de polineuropatia diabética distal resultando em marcha plantígrada característica (3).',
    ],
    transmissao:
      'Doença endógena multifatorial. Não transmissível.',
  },
  pathophysiology:
    'No gato, o diabetes resulta da interação entre resistência periférica à insulina e falência progressiva das células β, com glicotoxicidade e deposição de amiloide nas ilhotas (Nelson & Couto, 2020; iCatCare 2025). A reversão precoce da hiperglicemia remove a supressão tóxica sobre as células β e permite remissão clínica em parcela significativa dos pacientes (AAHA 2026). No hipersomatotropismo (HST), excesso de IGF-1 antagoniza insulina — investigar quando doses >5 U/gato/dose (AAHA 2026; Nelson & Couto, 2020). A hiperglicemia crônica lesa axônios periféricos distais, gerando neuropatia plantígrada reversível com controle metabólico (iCatCare 2025). Com inibidores de SGLT2 (Bexacat/Senvelgo), a glicosúria forçada pode manter glicemia aparentemente normal enquanto persiste deficiência insulínica e cetogênese — risco de cetoacidose euglicêmica (eDKA) se BHB não for monitorado (AAHA 2026; FDA Bexacat/Senvelgo).',
  clinicalSignsPathophysiology: [
    {
      system: 'metabolico',
      findings: [
        {
          finding: 'Poliúria, Polidipsia, Polifagia e Perda de Peso (sarcopenia)',
          mechanism:
            'Diurese osmótica por glicosúria (>250-300 mg/dL) com inabilidade tecidual de utilizar glicose e proteólise grave (1,5,6).',
          clinicalMeaning: 'Sinais clássicos felinos. Exige diferenciação com hipertireoidismo e DRC (1–3).',
          priority: 'common',
        },
        {
          finding: 'Neuropatia Diabética / Postura Plantígrada',
          mechanism:
            'Polineuropatia periférica distal induzida por hiperglicemia prolongada com apoio dos tarsos no solo ao caminhar (3).',
          clinicalMeaning: 'Achado neurológico clássico felino. Reversível com controle metabólico continuado (3).',
          priority: 'common',
        },
        {
          finding: 'Resistência a Altas Doses de Insulina (>5 U/gato/dose)',
          mechanism:
            'Forte antagonismo ao receptor de insulina por excesso de IGF-1 no Hipersomatotropismo (acromegalia felina) ou hipercortisolismo (2,3,4).',
          clinicalMeaning: 'Investigar dosagem de IGF-1 e fragilidade cutânea após afastar erros de técnica (2,3,4).',
          priority: 'common',
        },
        {
          finding: 'Anorexia, Vômitos e Prostração em uso de SGLT2',
          mechanism:
            'Cetoacidose Diabética Euglicêmica (eDKA): acidose e cetonemia com glicemia normal ou discretamente elevada (2,10,11).',
          clinicalMeaning: 'Emergência médica vital! Suspender SGLT2, iniciar fluidoterapia, insulina regular e dextrose (2,10,11).',
          priority: 'critical',
        },
      ],
    },
  ],
  diagnosis: {
    triadeDiagnostica:
      'Sinais clínicos + comprovação de hiperglicemia sustentada + glicosúria persistente (1–3). A hiperglicemia de estresse em gatos pode atingir níveis elevados (>300–400 mg/dL); portanto, a AAHA 2026 exige evidência sustentada via frutosamina, glicemia domiciliar ou monitor contínuo de glicose para confirmar a doença (2).',
    examesIniciais:
      'Hemograma, bioquímica (glicose, ureia, creatinina, ALT, FA, proteínas, colesterol, triglicerídeos), eletrólitos, T4 total em gatos idosos, urinálise com sedimento/cetonas, dosagem de β-hidroxibutirato (BHB) sanguíneo e ultrassom abdominal conforme a suspeita (2).',
    frutosamina:
      'Avalia o controle glicêmico das últimas 1 a 2 semanas (1–3). Essencial para diferenciar hiperglicemia de estresse transitória. Pode estar falsamente reduzida no hipertireoidismo, enteropatia perdedora de proteína ou hipoproteinemia (2,3).',
    escoreAliveDcs:
      'Escore clínico iCatCare (ALIVE DCS) pontuado de 0 a 12 (perda de peso, PU/PD, apetite e atitude). Permite monitorar o controle clínico sem depender exclusivamente de curvas de estresse (1,3).',
  },
  treatment: {
    decisaoInicial:
      'Definir a via terapêutica: 1) Insulinoterapia em gatos descompensados, cetóticos, anoréxicos ou graves; 2) Inibidores de SGLT2 (Bexacat/Senvelgo) exclusivamente para gatos recém-diagnosticados, metabolicamente estáveis, comendo e sem cetose (AAHA 2026; FDA Bexacat/Senvelgo). A curva glicêmica hospitalar de rotina é desaconelhada pela AAHA 2026 (AAHA 2026).',
    tabelaInsulinas: {
      kind: 'clinicalTable' as const,
      title: 'Insulinas, SGLT2 e doses iniciais — gato',
      headers: ['Produto / classe', 'Dose inicial', 'Frequência', 'Indicação', 'Observações'],
      rows: [
        [
          'Glargina U100 (Lantus®)',
          '1 U/gato',
          'SC q12h',
          '1ª linha',
          'AAHA 2026; titular ±0,5–1 U a cada 1–2 semanas',
        ],
        [
          'PZI (ProZinc®)',
          '1 U/gato',
          'SC q12h',
          '1ª linha',
          'AAHA 2026; agitar antes da aspiração',
        ],
        ['NPH', '—', '—', 'Não recomendada', 'Duração <8 h no gato (AAHA 2026)'],
        [
          'Glargina U300 (Toujeo®)',
          '0,5 U/kg ou 2 U/gato',
          'SC q24h',
          'Alternativa basal',
          'Perfil plano; sem valor mínimo glicêmico acentuado (AAHA 2026)',
        ],
        [
          'Degludeca (Tresiba®)',
          '1 U/gato',
          'SC q12h',
          'Alternativa basal',
          'No gato duração ~10–12 h — NÃO usar q24h como em cães (AAHA 2026; iCatCare 2025)',
        ],
        [
          'Bexagliflozina (Bexacat®)',
          '15 mg/gato',
          'PO q24h',
          'SGLT2 — seleção',
          '≥3 kg; metabolicamente estável, não cetótico; monitorar BHB (FDA Bexacat)',
        ],
        [
          'Velagliflozina (Senvelgo®)',
          '1 mg/kg',
          'PO q24h',
          'SGLT2 — seleção',
          'Metabolicamente estável, não cetótico; monitorar BHB (FDA Senvelgo)',
        ],
      ],
    },
    calculoPesoIdeal:
      'Glargina U100 e PZI iniciam em 1 UI/gato (não mg/kg), mas o PCI orienta dieta, perda ponderal e insulinas doseadas por peso (Toujeo 0,5 UI/kg; velagliflozina 1 mg/kg). Em gatos obesos, não usar o peso atual para Toujeo/Senvelgo — estimar PCI pelo ECC (AAHA 2026; Nelson & Couto, 2020).',
    tabelaPesoIdealEcc: {
      kind: 'clinicalTable' as const,
      title: 'Estimativa do peso ideal pelo ECC (9 pontos)',
      headers: ['ECC', 'Relação com o ideal', 'Fórmula', 'Exemplo (peso atual 6 kg)'],
      rows: [
        ['5/9', 'Peso ideal', 'PCI = peso atual', '6,0 kg'],
        ['6/9', '~10% acima do ideal', 'PCI = peso atual ÷ 1,10', '5,5 kg'],
        ['7/9', '~20% acima do ideal', 'PCI = peso atual ÷ 1,20', '5,0 kg'],
        ['8/9', '~30% acima do ideal', 'PCI = peso atual ÷ 1,30', '4,6 kg'],
        ['9/9', '~40% acima do ideal', 'PCI = peso atual ÷ 1,40', '4,3 kg'],
      ],
    },
    exemploCalculoInsulina: [
      '1. Pesar o gato e atribuir ECC (9 pontos). Em obesidade, palpar costelas e cintura abdominal — ECC inflado superestima gordura (Nelson & Couto, 2020).',
      '2. Insulina 1ª linha: iniciar 1 UI/gato SC q12h (Glargina ou PZI), independentemente do PCI — titular pela clínica e monitor contínuo de glicose (AAHA 2026).',
      '3. Para Toujeo: PCI × 0,5 UI/kg (ex.: gato 6 kg, ECC 8 → PCI 4,6 kg → 4,6 × 0,5 = 2,3 UI → arredondar para 2 UI q24h).',
      '4. Para Senvelgo: 1 mg/kg sobre PCI (ex.: PCI 4,6 kg → 4,6 mg/dia PO).',
      '5. Conforme perda de peso, revisar PCI e reduzir insulina se pré-dose normoglicêmica ou remissão se aproximar (AAHA 2026).',
    ],
    ordemDePrioridadeEstruturada: [
      {
        priority: 1,
        title: 'Insulinoterapia Inicial (Glargina U100 ou PZI)',
        summary:
          'AAHA 2026 recomenda Glargina U100 ou PZI (ProZinc® 40 U/mL) como primeiras escolhas. Iniciar com 1 U/GATO SC q12h (2). Evitar NPH como escolha de rotina devido à curta duração (<8h) (2).',
      },
      {
        priority: 2,
        title: 'Terapia Oral com SGLT2 (Bexacat / Senvelgo)',
        summary:
          'Apenas em gatos estáveis, não cetóticos. Bexagliflozina (Bexacat®): 15 mg/gato PO q24h em gatos ≥3 kg (10). Velagliflozina (Senvelgo®): 1 mg/kg PO q24h (11). EXIGE monitoramento rigoroso de BHB devido ao risco de eDKA (2).',
      },
      {
        priority: 3,
        title: 'Manejo Nutricional (Alta Proteína / Baixo Carboidrato)',
        summary:
          'Dieta rica em proteínas (>40–45% da energia metabolizável) e pobre em carboidratos (<12–15% da energia metabolizável), de preferência úmida (2). Manter a alimentação habitual nas primeiras 2 semanas de SGLT2 para evitar oscilações metabólicas precoces (2).',
      },
      {
        priority: 4,
        title: 'Vigilância de Remissão & Ajustes de Dose',
        summary:
          'Remissão = euglicemia por >4 semanas sem tratamento. Quando a necessidade de insulina cai ou ocorrem pré-doses normais, REDUZIR a dose imediatamente (2). Manter dose antiga por prudência causa hipoglicemia grave (2).',
      },
      {
        priority: 5,
        title: 'Insulinas Basais Avançadas (Toujeo U300 e Degludeca)',
        summary:
          'Glargina U300 (Toujeo®): 0,5 U/kg q12-24h ou 2 U/gato q24h; produz perfil plano sem valor mínimo glicêmico acentuado (2). Degludeca (Tresiba®): 1 U/gato q12h (no gato a duração é ~10-12h; NÃO usar q24h como em cães) (2,3).',
      },
    ],
    protocoloTerapeutico:
      'Para a maioria dos gatos, a dose inicial de 1 U/gato q12h de Glargina U100 ou PZI é suficiente para controlar a glicotoxicidade inicial sem induzir hipoglicemia. Reavaliações clínicas a cada 1 a 2 semanas orientam ajustes sutis de 0,5 a 1 U (2,3).',
    monitoramento: [
      'Monitorar o gato e seus sintomas — não apenas os números laboratoriais (AAHA 2026). Acompanhar peso, escore ALIVE DCS e resolução da PU/PD (iCatCare 2025).',
      'Monitor contínuo de glicose com sensor FreeStyle Libre no ambiente domiciliar para visualizar tendências, valor mínimo glicêmico e hipoglicemias noturnas (AAHA 2026; iCatCare 2025).',
      'Dosagem de β-hidroxibutirato (BHB) sanguíneo: em uso de SGLT2, BHB >2,4 mmol/L indica necessidade imediata de transição para insulina + dextrose (AAHA 2026).',
      'Descontinuar curvas glicêmicas hospitalares de rotina (AAHA 2026).',
    ],
    fluxogramaResistencia: [
      'Etapa 1 — Técnica e aderência: seringa, agitação (PZI), horários, rotação de locais e consistência alimentar (AAHA 2026).',
      'Etapa 2 — Hipoglicemia oculta: reduzir dose se pré-dose normoglicêmica ou queda abrupta da necessidade — não manter dose antiga por prudência (AAHA 2026).',
      'Etapa 3 — Hipersomatotropismo: doses >5 U/gato/dose → dosar IGF-1; organomegalia e resistência extrema (AAHA 2026; Nelson & Couto, 2020).',
      'Etapa 4 — HAC felino: fragilidade cutânea, hepatomegalia, proteinúria — testes endócrinos selecionados (Nelson & Couto, 2020).',
      'Etapa 5 — Pancreatite, obesidade, esteroides/progestágenos e doença periodontal: tratar comorbidades antes de escalar insulina indefinidamente (AAHA 2026; iCatCare 2025).',
    ],
    complicacoes: {
      edka:
        'Cetoacidose diabética euglicêmica em uso de SGLT2: cetonemia/acidose com glicemia normal ou discretamente elevada (<250 mg/dL). Suspender SGLT2, insulinizar e administrar dextrose IV (AAHA 2026; FDA Bexacat/Senvelgo).',
      neuropatia:
        'Polineuropatia diabética distal com marcha plantígrada. Reversível com euglicemia continuada (iCatCare 2025).',
      acromegalia:
        'Hipersomatotropismo por adenoma hipofisário: resistência massiva (>5 U/gato/dose) e organomegalia. Diagnóstico por IGF-1 sérico (AAHA 2026; Nelson & Couto, 2020).',
    },
    prognostico:
      'Prognóstico funcional favorável com controle precoce. Remissão (euglicemia >4 semanas sem tratamento) ocorre em ~25% em 2–3 meses e na maioria nos primeiros 6 meses — não é cura definitiva (AAHA 2026). Neuropatia plantígrada é reversível com controle. eDKA com SGLT2 é emergência potencialmente fatal se BHB não for monitorado (AAHA 2026).',
  },
  prevention: {
    primaria:
      'Manter peso ideal e evitar obesidade; dieta rica em proteína e pobre em carboidratos antes do diagnóstico; evitar progestágenos e glicocorticoides desnecessários; estimular atividade física (AAHA 2026; Nelson & Couto, 2020).',
    remissaoPreservacao:
      'Diagnosticar e tratar cedo para reverter glicotoxicidade; insulinoterapia conservadora (1 U/gato q12h) ou SGLT2 selecionado em caso estável; monitorar remissão e reduzir dose prontamente — preservar função β residual aumenta chance de remissão (AAHA 2026; iCatCare 2025).',
    errosComuns: [
      'Confirmar DM por glicemia isolada de estresse hospitalar.',
      'Usar curva glicêmica hospitalar de rotina.',
      'Prescrever SGLT2 em gato cetótico, anoréxico ou descompensado.',
      'Ignorar BHB em paciente com SGLT2.',
      'Manter dose plena de insulina quando remissão se aproxima (hipoglicemia).',
      'Usar NPH como 1ª linha.',
      'Usar degludeca q24h no gato (duração ~10–12 h).',
      'Confundir hipertireoidismo ou DRC com DM sem painel adequado.',
    ],
  },
  relatedConsensusSlugs: [
    'consensual-endocrinologia-aaha-diabetes-dogs-cats',
    'consensual-endocrinologia-aaha-2026-cats',
    'consensual-endocrinologia-icatcare-2025-cats',
  ],
  relatedDiseaseSlugs: [
    'gengivoestomatite-cronica-felina',
    'doenca-periodontal-gatos',
    'hipertireoidismo',
    'drc',
  ],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-aula-magna-2026',
      citationText:
        'Aula Magna — Diabetes mellitus em cães e gatos: da fisiopatologia à escolha da insulina, nutrição, monitoramento, remissão e uso de inibidores de SGLT-2. Material fornecido ao projeto Vetius, 2026.',
      sourceType: 'Aula Magna',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-aaha-2026-cats',
      citationText:
        '2026 AAHA Diabetes Management Guidelines for Cats. American Animal Hospital Association. Published April 26, 2026.',
      sourceType: 'Diretriz Consensual AAHA 2026',
      url: 'https://www.aaha.org/resources/2026-aaha-diabetes-management-guidelines-for-cats/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-icatcare-2025',
      citationText:
        'Taylor S, Cannon M, Church D, Fleeman L, Fracassi F, Gilor C, Mott J, Niessen S. iCatCare 2025 consensus guidelines on the diagnosis and management of diabetes mellitus in cats. J Feline Med Surg. 2025;27(11):1098612X251399103.',
      sourceType: 'Consenso iCatCare 2025',
      url: 'https://pubmed.ncbi.nlm.nih.gov/41224734/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-aaha-2018-dogs',
      citationText:
        'Behrend E, Holford A, Lathan P, Rucinsky R, Schulman R. 2018 AAHA Diabetes Management Guidelines for Dogs and Cats. J Am Anim Hosp Assoc. 2018;54:1–21.',
      sourceType: 'Diretriz Consensual AAHA 2018/2022',
      url: 'https://www.aaha.org/resources/2018-aaha-diabetes-management-guideline-for-dogs-and-cats/dogs/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-nelson-couto-2020',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2020. Chapter 49 — Disorders of the Endocrine Pancreas.',
      sourceType: 'Tratado de Medicina Interna',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-bsava-nephrology',
      citationText:
        'BSAVA Manual of Canine and Feline Nephrology and Urology. 3rd ed. BSAVA.',
      sourceType: 'Manual BSAVA',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-plumbs-2023',
      citationText:
        'Plumb\'s Veterinary Drug Handbook. 10th ed. Wiley; 2023. Insulin monographs.',
      sourceType: 'Guia Farmacológico',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-tardo-toujeo-2024',
      citationText:
        'Tardo AM, et al. A dose titration protocol for once-daily insulin glargine 300 U/mL for the treatment of diabetes mellitus in dogs. J Vet Intern Med. 2024;38:2120–2133.',
      sourceType: 'Estudo Clínico Prospectivo (95 cães)',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11256126/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-mott-degludec-2025',
      citationText:
        'Mott J, Gal A, Tardo AM, et al. Insulin degludec 100 U/mL for treatment of spontaneous diabetes mellitus in dogs. J Vet Intern Med. 2025;39:e17303.',
      sourceType: 'Estudo Clínico Prospectivo (33 cães)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/39844001/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-bexacat-fda-2026',
      citationText:
        'FDA/DailyMed. Bexacat — bexagliflozin tablets. Current label updated 2026.',
      sourceType: 'Bula Oficial FDA',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f918583d-0337-40da-8da1-1e1320b8d027',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-senvelgo-fda-2026',
      citationText:
        'FDA/DailyMed. Senvelgo — velagliflozin oral solution 15 mg/mL. Current label updated 2026.',
      sourceType: 'Bula Oficial FDA',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3ec5ca1f-bded-459e-a813-24d931d50b9a',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-vin-hhs-2022',
      citationText:
        'VINcyclopedia of Diseases. Diabetes Mellitus, Hyperglycemic Hyperosmolar Syndrome — Canine/Feline. Revised December 14, 2022.',
      sourceType: 'Enciclopédia Clínica VIN',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-textbook-emergency-2020',
      citationText:
        'Textbook of Small Animal Emergency Medicine. Wiley-Blackwell. Chapters on diabetes mellitus, DKA and hyperosmolar hyperglycemic state.',
      sourceType: 'Tratado de Emergência',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-beam-cataract-1999',
      citationText:
        'Beam S, Correa MT, Davidson MG. A retrospective-cohort study on the development of cataracts in dogs with diabetes mellitus: 200 cases. Vet Ophthalmol. 1999;2:169–172.',
      sourceType: 'Estudo Retrospectivo de Coorte (200 cães)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/11397260/',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-pancreatitis-dm-2024',
      citationText:
        'Canine Hepatobiliary and Exocrine Pancreatic Diseases. 2024. Sections on pancreatitis and endocrine disease.',
      sourceType: 'Capítulo Especializado',
      evidenceLevel: 'B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
