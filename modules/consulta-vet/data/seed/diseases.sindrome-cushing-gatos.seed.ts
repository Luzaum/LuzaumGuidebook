import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Síndrome de Cushing Felina (Hiperadrenocorticismo Felino) — Guia Clínico Editorial de Padrão Ouro.
 * Embasamento: ALIVE 2025 Consensus > Miceli et al. 2022 > Boland et al. 2017 >
 * Ettinger's Textbook of Vet Internal Med 9ª ed. 2024 > Nelson & Couto 6ª ed. 2020 >
 * BSAVA Manual of Feline Endocrinology 5ª ed. > Plumb's 10ª ed.
 */
export const sindromeCushingGatosRecord: DiseaseRecord = {
  id: 'disease-sindrome-cushing-gatos',
  slug: 'sindrome-cushing-gatos',
  title: 'Síndrome de Cushing — Gato',
  subtitle: 'Hipercortisolismo felino: diabetes mellitus insulinorresistente associado, síndrome da fragilidade cutânea extrema, dosagem diagnóstica felina do LDDST e protocolo com trilostano',
  synonyms: [
    'Hiperadrenocorticismo felino',
    'HAC felino',
    'Hipercortisolismo felino',
    'Feline Cushing syndrome',
    'Feline hyperadrenocorticism',
    'Síndrome da fragilidade cutânea felina cushingóide'
  ],
  species: ['cat'],
  category: 'endocrinologia',
  categories: ['endocrinologia', 'medicina-felina', 'dermatologia', 'clinica-medica'],
  tags: [
    'Cortisol',
    'PDH',
    'ADH',
    'Trilostano',
    'LDDST felino',
    'Diabetes felino',
    'Pele fragil',
    'Insulinorresistencia',
    'ALIVE 2025',
    'Miceli 2022'
  ],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['sindrome-cushing-gatos'],

  quickSummary:
    'A Síndrome de Cushing felina (hiperadrenocorticismo) é uma endocrinopatia incomum a rara em gatos, caracterizada por hipercortisolismo crônico sustentado de origem hipófise-dependente (PDH, 80-85% por adenomas ou macroadenomas corticotróficos) ou adrenal-dependente (ADH, 15-20% por adenomas ou carcinomas adrenocorticais autônomos). Distingue-se marcantemente da apresentação canina por dois pilares fundamentais: aproximadamente 80% dos gatos afetados apresentam Diabetes Mellitus concomitante severamente insulinorresistente (exigindo doses elevadas de insulina >1,5 a 2,0 U/kg/dose); e a presença patognomônica da Síndrome da Fragilidade Cutânea Felina (Feline Cutaneous Asthenia / Fragile Skin Syndrome), em que a pele torna-se tão fina e friável que se rasga espontaneamente ou à mínima tração durante contenção ou tosa. O diagnóstico laboratorial exige o teste de supressão por dexametasona em dose baixa com dose específica para a espécie felina (LDDST 0,1 mg/kg IV, dez vezes superior à canina). A fosfatase alcalina sérica (FA) é frequentemente normal, pois felinos não possuem a isoenzima esteróide induzível característica dos cães. O tratamento clínico padrão baseia-se no trilostano administrado a cada 12 horas, demandando redução preventiva imediata das doses de insulina para prevenir hipoglicemia fatal à medida que a resistência periférica é debelada.',

  quickDecisionStrip: [
    'Suspeitar de Cushing felino sempre que houver: gato diabético de difícil controle (requerendo >1,5-2,0 U/kg de insulina) associado a emaciação e adelgaçamento cutâneo acentuado.',
    'A Síndrome da Fragilidade Cutânea (pele com consistência de papel de seda que se rasga ao toque suave) é o sinal dermatológico mais patognomônico; calcinosis cutis NÃO ocorre em felinos.',
    'A Fosfatase Alcalina (FA) frequentemente é NORMAL em gatos com Cushing: a espécie felina não produz a isoforma esteróide induzível por glicocorticoides clássica do cão.',
    'A densidade urinária (USG) em felinos cushingóides frequentemente é >1,020: a hipostenúria marcante típica do cão é incomum no gato.',
    'LDDST Felino EXIGE dose de 0,1 mg/kg de Dexametasona IV: o uso inadvertido da dose canina (0,01 mg/kg) gera 100% de falsos-positivos por não suprimir o eixo hipotálamo-hipófise felino normal.',
    'O Teste de Estimulação por ACTH é um teste de TRIAGEM RUIM no gato (sensibilidade de apenas 33-60%): utilize o LDDST para diagnóstico e reserve o ACTH para monitoramento de trilostano.',
    'Cosintropina na dose de 125 mcg/gato (dose fixa por felino, NUNCA por mg/kg) para o teste de ACTH.',
    'Trilostano em gatos DEVE ser prescrito a cada 12 horas (q12h), iniciando em aproximadamente 1,0 mg/kg VO q12h (média de 1,3 a 1,9 mg/kg na coorte Miceli 2022); a administração q24h é ineficaz pelo metabolismo acelerado na espécie.',
    'PERIGO DE HIPOGLICEMIA FATAL: ao controlar o hipercortisolismo com trilostano, a resistência à insulina desaparece subitamente; reduza a dose de insulina em 30-50% e monitore a glicemia capilar de perto.',
    'Manipulação extremamente gentil ("touchless handling"): NUNCA use fita adesiva sobre a pele, contenção pelo dorso do pescoço (scruffing) ou tricotomia com lâmina rente, que provocam lacerações extensas que exigem sutura.',
    'Investigar macroadenoma hipofisário por Tomografia ou Ressonância se surgirem sinais neurológicos centrais (estupor, marcha em círculos, pressão da cabeça contra anteparos).',
    'Mortalidade e prognóstico: sobrevida mediana de 10 a 14 meses; infecções bacterianas oportunistas recorrentes, lacerações cutâneas graves e descompensação de diabetes mellitus concomitante (presente em ~80% dos casos, coorte Miceli et al. 2022) representam os fatores prognósticos determinantes.'
  ],

  quickSummaryRich: {
    lead:
      'O hiperadrenocorticismo felino é uma entidade clínica singular que não deve ser extrapolada a partir do cão. Manifesta-se como uma emergência metabólica e tegumentar, onde o controle da insulinorresistência diabética caminha lado a lado com a proteção estrita contra lesões cutâneas por avulsão.',
    leadHighlights: [
      'Gato diabético insulinorresistente em 80% dos casos',
      'Síndrome da Fragilidade Cutânea (pele de papel)',
      'LDDST felino específico de 0,1 mg/kg IV',
      'Fosfatase alcalina normal e ausência de calcinosis cutis',
      'Trilostano fracionado a cada 12 horas (q12h)',
      'Risco severo de hipoglicemia pós-queda do cortisol'
    ],
    pillars: [
      {
        title: 'Pilar 1: Tríade Fisiopatológica Felina',
        body: 'Diferentemente do cão (que exibe obesidade centrípeta e calcinose), o gato com Cushing apresenta catabolismo proteico extremo: atrofia muscular intensa com abdômen pendular, diabetes mellitus refratário por bloqueio da translocação de receptores GLUT-4 e fragilidade cutânea severa por degradação das fibras de colágeno dérmico e vasos capilares.',
        highlights: ['Atrofia muscular e emaciação', 'Resistência insulínica periférica', 'Lise de colágeno dérmico']
      },
      {
        title: 'Pilar 2: Particularidades do Diagnóstico Laboratorial',
        body: 'O eixo hipotálamo-hipófise felino é menos sensível à dexametasona que o canino, exigindo 0,1 mg/kg IV no LDDST para supressão fisiológica. A estimulação por ACTH tem baixa sensibilidade e não deve ser usada para exclusão diagnóstica. A fosfatase alcalina sérica não serve como biomarcador de triagem no gato.',
        highlights: ['LDDST 0,1 mg/kg padrão', 'ACTH com 125 mcg/gato fixo', 'ALP normal não descarta']
      },
      {
        title: 'Pilar 3: Manejo com Trilostano e Dessensibilização à Insulina',
        body: 'A inibição da esteroidogênese adrenal pelo trilostano a cada 12 horas restaura a sensibilidade periférica à insulina em questão de dias. O veterinário deve monitorar a glicemia capilar diariamente e reduzir proativamente a dose de insulina para evitar hipoglicemia iatrogênica convulsiva à medida que o cortisol normaliza.',
        highlights: ['Trilostano q12h obrigatório', 'Redução preventiva de insulina', 'Curvas glicêmicas frequentes']
      }
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico Sequencial do Hiperadrenocorticismo Felino',
      steps: [
        {
          label: 'Passo 1: Reconhecimento do Fenótipo Clínico Típico',
          detail: 'Gato idoso (>9-10 anos) portador de Diabetes Mellitus difícil de regular apesar de doses crescentes de insulina glargina ou detemir (>1,5-2,0 U/kg/dose), apresentando perda de peso progressiva, atrofia dos músculos temporais e epaxiais, abdômen abaulado pendular, orelhas com pontas enroladas (curled ear tips) e pele translúcida com lacerações espontâneas.'
        },
        {
          label: 'Passo 2: Exclusão de Terapia Esteroidal Exógena e Progesterona',
          detail: 'Anamnese dirigida: descartar uso prévio de acetato de medroxiprogesterona, acetato de megestrol, colírios ou pomadas otológicas contendo dexametasona ou betametasona. Em fêmeas inteiras, descartar tumores ovarianos secretores de progesterona.'
        },
        {
          label: 'Passo 3: Teste de Supressão por Dexametasona em Dose Baixa (LDDST Felino)',
          detail: 'Padrão-ouro de triagem funcional. Colher amostra de cortisol basal (hora 0); administrar Dexametasona na dose de 0,1 mg/kg IV estrita (formulação solúvel aquosa); colher amostras de cortisol sérico 4 e 8 horas pós-injeção. Interpretação: falha de supressão do cortisol às 8 horas (>1,4 mcg/dL ou >30-40 nmol/L) confirma hiperadrenocorticismo.'
        },
        {
          label: 'Passo 4: Diferenciação entre PDH e ADH (Ultrassonografia e ACTH Endógeno)',
          detail: 'Ultrassonografia abdominal de alta resolução: adrenais aumentadas bilateralmente (>4,5-5,0 mm de polo cranial e caudal) sugerem tumor hipofisário (PDH, 85%); assimetria acentuada com massa adrenal unilateral invasiva e contralateral atrófica aponta para tumor adrenocortical (ADH, 15%). Mensurar ACTH endógeno felino (amostra colhida em tubo de EDTA plástico congelado).'
        },
        {
          label: 'Passo 5: Tomografia Computadorizada (TC) ou Ressonância Magnética de Encéfalo',
          detail: 'Indicada nos pacientes com PDH confirmado para mensurar a altura e extensão do tumor hipofisário. Macroadenomas (>4-5 mm de altura) comprimem o hipotálamo e tronco encefálico, demandando radioterapia ou hipofisectomia transesfenoidal.'
        }
      ]
    },
    treatmentFlow: {
      title: 'Algoritmo Terapêutico e Titulação da Insulina',
      steps: [
        {
          label: 'Fase 1: Manejo Protetor da Pele e Ambiente',
          detail: 'Suspender completamente o uso de colares elizabetanos rígidos, esparadrapos ou fitas sobre a pele. Acomodar o paciente em caixas de transporte almofadadas com tecidos macios. Em caso de laceração cutânea: realizar limpeza antisséptica estéril e aproximar as bordas com fita de sutura adesiva suave (Steri-Strip) ou cola de cianoacrilato tecidual, evitando pontos cirúrgicos convencionais que rasgam a pele.'
        },
        {
          label: 'Fase 2: Instituição do Trilostano a cada 12 Horas',
          detail: 'Iniciar Trilostano oral na dose de 0,5 a 1,0 mg/kg VO a cada 12 horas administrado sempre junto com alimento. O fracionamento a cada 12 horas é mandatório em gatos devido à meia-vida ultracurta do fármaco na espécie felina.'
        },
        {
          label: 'Fase 3: Ajuste Antecipado e Monitoramento da Insulina',
          detail: 'No primeiro dia de início do trilostano, reduzir preventivamente a dose de insulina em 25% a 30%. Realizar monitoramento intensivo da glicemia capilar por glicosímetro portátil ou sensor de monitorização contínua (FreeStyle Libre) nos dias 3, 7 e 14. Se a glicemia em jejum cair abaixo de 150 mg/dL, reduzir ainda mais a insulina.'
        },
        {
          label: 'Fase 4: Teste de Estimulação com ACTH para Monitoramento',
          detail: 'Realizar teste de estimulação com ACTH (125 mcg de cosintropina IV ou IM colhendo cortisol 1 hora após) 10 a 14 dias após início do trilostano ou após qualquer ajuste posológico, colhido exatamente 2 a 4 horas pós-dose matinal de trilostano. Alvo: cortisol pós-ACTH entre 2,0 e 5,0 mcg/dL (50 a 140 nmol/L).'
        },
        {
          label: 'Fase 5: Tratamentos Definitivos e Terapias Avançadas',
          detail: 'Adrenalectomia unilateral por laparoscopia ou cirurgia aberta em centros especializados para adenomas/carcinomas adrenais operáveis sem invasão de veia cava caudal. Radioterapia hipofisária fracionada para macroadenomas corticotróficos expansivos.'
        }
      ]
    }
  },

  etiology: {
    classificacaoETipos:
      'A Síndrome de Cushing (hiperadrenocorticismo) felina divide-se etiopatogenicamente em: 1) Hiperadrenocorticismo Hipófise-Dependente (PDH), responsável por 80% a 85% dos casos de origem espontânea, originado por microadenomas ou macroadenomas funcionais corticotróficos da pars distalis ou pars intermedia da adenohipófise que secretam ACTH de maneira autônoma; 2) Hiperadrenocorticismo Adrenal-Dependente (ADH), responsável por 15% a 20% dos casos, deflagrado por adenomas benignos ou carcinomas adrenocorticais funcionais unilaterais que secretam cortisol independentemente de estímulo hipofisário; e 3) Hiperadrenocorticismo Iatrogênico, provocado por administração crônica de doses suprafisiológicas de glicocorticoides exógenos (orais, injetáveis de depósito ou tópicos oftálmicos/dermatológicos) ou progestágenos com atividade glicocorticoide cruzada.',
    progestagenosEMimics:
      'Fêmeas inteiras com tumores ovarianos secretores de progesterona ou gatos expostos a fármacos progestínicos (acetato de megestrol, acetato de medroxiprogesterona) podem apresentar um fenótipo indistinguível do Cushing espontâneo, em razão da ligação da progesterona com receptores de glicocorticoides no fígado e tecido cutâneo.'
  },

  epidemiology: {
    diabetes:
      'Aproximadamente 80% (~80%) dos gatos com hiperadrenocorticismo apresentam Diabetes Mellitus concomitante secundário à severa resistência periférica à insulina induzida pelo excesso sustentado de glicocorticoides.',
    baixaFrequenciaEIdade:
      'Ao contrário do que ocorre na espécie canina, o hiperadrenocorticismo no gato é uma endocrinopatia incomum a rara, com prevalência estimada inferior a 0,1% da população felina atendida. Acomete quase que exclusivamente gatos de meia-idade a idosos, com idade mediana de 10 a 12 anos (faixa etária de 6 a 16 anos). Não há predisposição racial evidente, acometendo machos e fêmeas em proporção similar (com ligeiro predomínio de fêmeas em algumas coortes).',
    concomitanciaComDiabetesMellitus:
      'O achado epidemiológico mais expressivo da afecção na espécie felina é que aproximadamente 80% a 85% dos gatos com hiperadrenocorticismo espontâneo possuem Diabetes Mellitus concomitante no momento do diagnóstico ou desenvolvem a endocrinopatia nas semanas subsequentes. O Cushing felino é frequentemente diagnosticado durante a triagem de investigação de diabetes descompensado ou com severa resistência insulínica.'
  },

  pathogenesisTransmission: {
    cascataDoHipercortisolismo:
      'O excesso contínuo de cortisol circulante liga-se a receptores intracelulares de glicocorticoide, alterando a transcrição de centenas de genes metabólicos. Induz acentuada resistência periférica à insulina nos hepatócitos, adipócitos e miócitos esqueléticos, bloqueando a translocação dos transportadores de glicose sensíveis à insulina (GLUT-4) para a membrana celular. Simultaneamente, hiperestimula a neoglicogênese hepática e a lipólise, provocando hiperglicemia crônica, exaustão das células beta pancreáticas e deposição de amilina, culminando em Diabetes Mellitus manifesto.',
    sindromeDaFragilidadeCutaneaPatogenese:
      'O cortisol exerce um efeito catabólico proteico devastador sobre os fibroblastos da derme felina. Ocorre inibição maciça da síntese de pró-colágeno dos tipos I e III, aumento da expressão de metaloproteinases de matriz tecidual e acentuada depleção de glicosaminoglicanos na matriz extracelular. A derme sofre atrofia profunda, reduzindo sua espessura a uma camada delgada com menos de 2 a 3 células. As junções dermoepidérmicas tornam-se frágeis e os vasos capilares subcutâneos perdem o suporte perivascular. Como consequência mecânica, a menor tração na pele — como o ato de coçar-se, escovação, contenção durante a consulta ou retirada de esparadrapos — provoca avulsão e laceração transmural completa da pele ("como papel molhado"), expondo o subcutâneo e a fáscia muscular subjacente.',
    figuraPeleFragil: {
      kind: 'clinicalFigure' as const,
      src: '/assets/consulta-vet/diseases/sindrome-cushing-gatos/laceracao-pele-fragil-hardy-fig3.jpg',
      alt: 'Laceração de espessura total em gato com hipercortisolismo hipófise-dependente',
      caption:
        'Laceração cutânea espontânea de espessura total com exposição do tecido subcutâneo e fáscia muscular em gato cushingóide (Hardy et al., 2023). CC BY-NC 4.0.'
    },
    figuraCtPituitaria: {
      kind: 'clinicalFigure' as const,
      src: '/assets/consulta-vet/diseases/sindrome-cushing-gatos/ct-pituitaria-hardy-fig4.jpg',
      alt: 'TC de massa hipofisária aumentada em gato com PDH',
      display: 'wide',
      caption:
        'Tomografia computadorizada de crânio exibindo macroadenoma hipofisário expansivo (seta) em gato com hiperadrenocorticismo hipófise-dependente (Hardy et al., 2023). CC BY-NC 4.0.'
    },
    figuraLaceracaoExtensa: {
      kind: 'clinicalFigure' as const,
      src: '/assets/consulta-vet/diseases/sindrome-cushing-gatos/laceracao-extensa-hardy-fig7.jpg',
      alt: 'Laceração extensa de pele em flanco esquerdo de gato cushingoide',
      caption:
        'Extensa área de deiscência cutânea e laceração em flanco secundária à Síndrome da Fragilidade Cutânea Felina (Hardy et al., 2023). CC BY-NC 4.0.'
    }
  },

  pathophysiology: {
    tabelaComparacaoCaoGato: {
      kind: 'clinicalTable' as const,
      caption: 'Diferenças Fundamentais da Síndrome de Cushing: Cão vs Gato',
      headers: ['Parâmetro Clínico / Laboratorial', 'Apresentação no Cão', 'Apresentação no Gato'],
      rows: [
        ['Prevalência na Clínica', 'Relativamente frequente', 'Raro a muito incomum (<0,1%)'],
        ['Concomitância com Diabetes Mellitus', 'Ocorre em 10% a 15%', 'Ocorre em 80% a 85% dos pacientes'],
        ['Fragilidade Cutânea Extrema', 'Rara (<2%)', 'Sinal patognomônico cardinal (50-60%)'],
        ['Calcinosis Cutis', 'Presente em 10% a 20%', 'Extremamente rara / Não característica'],
        ['Fosfatase Alcalina Sérica (FA)', 'Elevada em >85-90% (isoenzima esteróide)', 'Frequentemente normal ou discretamente elevada'],
        ['Densidade Urinária (USG)', 'Frequentemente hipostenúrica (<1,015)', 'Frequentemente concentrada (>1,020 a 1,025)'],
        ['Dose do Teste LDDST', '0,01 mg/kg IV de dexametasona', '0,1 mg/kg IV de dexametasona (10x maior)'],
        ['Sensibilidade do Teste com ACTH', 'Elevada (~80-85%) para triagem', 'Baixa (~33-60%) — Teste de triagem inadequado'],
        ['Dose de Cosintropina para ACTH', '5,0 mcg/kg IV (máximo 250 mcg)', '125 mcg/gato (dose fixa por animal)'],
        ['Posologia do Trilostano', 'Geralmente 1 a 2 mg/kg VO a cada 24 horas', 'Obrigatoriamente a cada 12 horas (q12h)']
      ]
    },
    resistenciaInsulinica:
      'O cortisol antagoniza os receptores de insulina no fígado e músculo esquelético, estimulando a gliconeogênese descontrolada. Os pacientes exigem doses de insulina exógena progressivamente maiores (>1,5 a 2,5 U/kg/dose), sem que haja normalização da glicemia ou da frutosamina sérica.',
    atrofiaMuscularEAlteracoesConformacionais:
      'A proteólise catabólica continuada depleciona os músculos epaxiais, glúteos e da mastigação, conferindo aspecto de emaciação dorsal contrastando com abdômen globoso e pendular resultante da fraqueza da musculatura da parede abdominal e hepatomegalia esteatótica.',
    curledEarTips:
      'A reabsorção e o enfraquecimento da matriz de cartilagem elástica do pavilhão auricular provocam encurvamento ventral ou lateral das pontas das orelhas (curled ear tips), achado sutil característico do Cushing felino avançado.'
  },

  clinicalSignsPathophysiology: {
    sinaisClassicos: [
      'Poliúria, polidipsia (PU/PD) e polifagia voraz secundárias à diurese osmótica induzida pela glicosúria do diabetes associado e ação antidiurética do cortisol.',
      'Perda de peso progressiva e caquexia com perda de massa muscular esquelética apesar de apetite voraz.',
      'Abdômen distendido e pendular (pendulous belly) por hipotonia dos músculos retos e oblíquos abdominais e hepatomegalia.',
      'Síndrome da Fragilidade Cutânea (Feline Cutaneous Asthenia): pele excessivamente fina, translúcida, sem elasticidade, que se rasga espontaneamente com movimentos bruscos, grooming ou contenção delicada, criando grandes feridas cutâneas limpas sem sangramento abundante.',
      'Alopecia bilateral simétrica não pruriginosa ou pelagem opaca, desidratada e falhada que não regenera após tosa higiênica.',
      'Encurvamento característico das pontas das orelhas (curled ear tips) decorrente de condromalácia induzida pelo catabolismo esteróide.',
      'Hematomas e sufusões cutâneas espontâneas por fragilidade capilar dermoepidérmica.'
    ],
    sinaisNeurologicosEComplicados: [
      'Sinais neurológicos centrais por expansão de macroadenoma hipofisário: depressão sensorial, letargia profunda, cegueira central, desorientação, marcha compulsiva e pressão da cabeça contra a parede (head pressing).',
      'Neuropatia diabética concomitante: postura plantígrada dos membros pélvicos decorrente da hiperglicemia axonal crônica descompensada.'
    ]
  },

  diagnosis: {
    raciocinioClinico:
      'O diagnóstico baseia-se na demonstração laboratorial inequívoca da secreção autônoma de cortisol através de ensaios endocrinológicos validados para a espécie felina, seguido da diferenciação anatômica entre origem hipofisária e adrenal.',
    passosDiagnosticos: [
      {
        stepNumber: 1,
        title: 'Suspeição Clínica em Diabéticos Resistentes e Avaliação Geral',
        description:
          'Identificar gato com diabetes mellitus insulinorresistente e fragilidade cutânea. No painel bioquímico basal: hiperglicemia acentuada, frutosamina elevada, hipercolesterolemia; notar que a fosfatase alcalina (FA) frequentemente é NORMAL no gato.',
        purpose: 'Triagem preliminar e exclusão de cetoacidose diabética.',
        interpretation: 'A coexistência de diabetes com atrofia muscular e lesões cutâneas friáveis justifica investigação endocrinológica imediata.'
      },
      {
        stepNumber: 2,
        title: 'Teste de Supressão por Dexametasona em Dose Baixa (LDDST Felino - 0,1 mg/kg IV)',
        description:
          'Teste funcional de triagem de escolha. Colheita de cortisol sérico basal (T0); injeção intravenosa estrita de Dexametasona solúvel aquosa na dose de 0,1 mg/kg; colheita de amostras de cortisol sérico 4 e 8 horas pós-injeção.',
        purpose: 'Confirmação inequívoca de secreção autônoma de cortisol.',
        interpretation:
          'Padrão-ouro funcional (*isGoldStandard: true*). Gatos saudáveis suprimem o cortisol sérico às 8 horas para concentrações <1,0 a 1,4 mcg/dL (<30 nmol/L). No hiperadrenocorticismo felino, há ausência de supressão no ponto de 8 horas. Se o cortisol às 4 horas suprimir (<1,4 mcg/dL) e escapar às 8 horas, fecha-se o diagnóstico de PDH.',
        limitations: 'O uso da dose canina (0,01 mg/kg) gera supressão inadequada mesmo em gatos normais e NUNCA deve ser utilizada.',
        isGoldStandard: true
      },
      {
        stepNumber: 3,
        title: 'Razão Cortisol:Creatinina Urinária (UCCR) em Amostra Domiciliar',
        description:
          'Colheita de urina pela manhã em domicílio pelo tutor, sem estresse hospitalar.',
        purpose: 'Teste de exclusão de altíssima sensibilidade.',
        interpretation: 'Se a UCCR estiver dentro do intervalo de referência normal, o diagnóstico de Cushing felino fica praticamente descartado. Se estiver elevada, exige confirmação pelo LDDST (baixa especificidade).',
        limitations: 'Estresse hospitalar ou cistite isolada inflam a UCCR falsamente.'
      },
      {
        stepNumber: 4,
        title: 'Ultrassonografia Abdominal Especializada de Adrenais',
        description:
          'Mensuração tridimensional dos polos cranial, caudal e espessura dorsoventral de ambas as glândulas adrenais.',
        purpose: 'Diferenciação entre PDH bilateral e tumor adrenal autônomo unilateral (ADH).',
        interpretation: 'Aumento bilateral simétrico ou discretamente assimétrico das glândulas adrenais (>4,5 a 5,0 mm de espessura) indica hiperplasia secundária ao ACTH hipofisário (PDH). Presença de nódulo/massa adrenal unilateral com adrenal contralateral atrófica (<3,0 mm) confirma ADH.',
        limitations: 'Exige operador experiente e transdutor linear de alta frequência (>= 12 MHz).'
      },
      {
        stepNumber: 5,
        title: 'Tomografia Computadorizada (TC) ou Ressonância Magnética (RM) Encefálica',
        purpose: 'Mapeamento morfológico do tumor hipofisário corticotrófico.',
        interpretation: 'Identifica e quantifica a altura da massa hipofisária. Macroadenomas (>4,0 mm de altura) possuem indicação de radioterapia ou hipofisectomia para prevenir sinais neurológicos compressivos.',
        limitations: 'Necessidade de anestesia geral e centro de imagem avançado.'
      }
    ]
  },

  treatment: {
    trilostano: {
      coorteMiceli:
        'Na coorte multicêntrica de Miceli et al. (2022), a introdução escalonada de trilostano a cada 12 horas demonstrou controle endócrino seguro e eficaz em gatos com hiperadrenocorticismo pituitário-dependente.',
    },
    farmacoterapiaComTrilostano: [
      {
        drug: 'Trilostano (Modrenal / Vetoryl)',
        indication: 'Terapia clínica de eleição para controle médico do hipercortisolismo felino (PDH e ADH inoperável).',
        dose: 'Dose inicial: 0,5 a 1,0 mg/kg VO a cada 12 horas (q12h), administrado RIGOROSAMENTE junto com o alimento para garantir absorção lipofílica.',
        frequency: 'A cada 12 horas (duas vezes ao dia). A posologia a cada 24 horas NUNCA deve ser utilizada em gatos, pois o fármaco é metabolizado muito mais rapidamente na espécie felina.',
        mechanism: 'Inibidor competitivo reversível da enzima 3-beta-hidroxiesteróide desidrogenase no córtex adrenal, bloqueando a conversão de pregnenolona em progesterona e a síntese de cortisol e aldosterona.',
        cautions: 'RISCO CRÍTICO DE HIPOGLICEMIA SEVERA: à medida que o cortisol cai, a sensibilidade periférica à insulina é subitamente restaurada. A dose de insulina deve ser reduzida preventivamente em 25-30% no início e monitorada diariamente.',
        reassess: 'Efetuar teste de estimulação com ACTH (125 mcg de cosintropina/gato colhido 2 a 4 horas pós-dose de trilostano) aos 10-14 dias, 30 dias e a cada 3 meses.'
      }
    ],
    manejoDaFragilidadeCutaneaEAmbiente: [
      {
        drug: 'Cuidados Dermatológicos e Suporte de Pele',
        indication: 'Obrigatório para prevenir lacerações extensas por avulsão.',
        notes: 'Protocolo "touchless handling": proibir expressamente a contenção por pinçamento de pele na nuca (scruffing). Jamais aplicar esparadrapos, fitas adesivas ou eletrodos de monitorização com adesivo sobre a pele. Para suturas de feridas, utilizar fitas de sutura estéreis adesivas suaves, cola biológica tecidual de cianoacrilato ou pontos em U colchoeiro com fios monofilamentares atraumáticos muito frouxos com botões de silicone.'
      }
    ],
    opcoesCirurgicasERadioterapicas: [
      {
        drug: 'Adrenalectomia Unilateral',
        indication: 'Tratamento curativo definitivo para adenomas ou carcinomas adrenocorticais unilaterais (ADH) operáveis sem invasão vascular.',
        notes: 'Requer suporte glicocorticoide trans e pós-operatório (Dexametasona 0,1 mg/kg IV) em razão da atrofia funcional da glândula adrenal contralateral.'
      },
      {
        drug: 'Radioterapia Hipofisária Fracionada',
        indication: 'Macroadenomas hipofisários volumosos que comprimem o quiasma óptico e estruturas cerebrais centrais.',
        notes: 'Reduz o volume tumoral e alivia sinais neurológicos de hipertensão intracraniana.'
      }
    ]
  },

  complications: {
    sequelasClinicasEGravidade: [
      'Crise Hipoglicêmica Grave e Convulsões: ocorre quando a resistência insulínica é rapidamente desfeita pelo trilostano sem o ajuste compensatório para baixo da dose de insulina. O paciente desenvolve hipoglicemia severa (<40 mg/dL), coma hipoglicêmico, ataxia e convulsões refratárias.',
      'Lacerações Cutâneas Graves por Desluvamento (Degloving): a fragilidade cutânea extrema permite que a pele se rasgue com a própria movimentação ou lambedura do animal, gerando lacerações extensas de até 10-15 cm de diâmetro com deiscência secundária e sepse de tecidos moles.',
      'Sinais Neurológicos Compressivos por Macroadenoma: crescimento progressivo do tumor hipofisário provocando hidrocefalia obstrutiva, cegueira súbita, perda de reflexos pupilares e coma terminal.',
      'Hipoadrenocorticismo Iatrogênico e Necrose Adrenal: superdosagem de trilostano ou necrose isquêmica aguda da adrenal induzida pelo fármaco provocando crise addisoniana aguda com hipotensão, hiponatremia severa, hipercalemia e choque circulatório.',
      'Infecções Oportunistas Sistêmicas Silenciosas: a imunossupressão crônica induzida pelo cortisol mascara os sinais clássicos de febre e inflamação, permitindo que pielonefrites bacterianas graves, abscessos subcutâneos e pneumonias se instalem de forma insidiosa sem leucocitose expressiva.'
    ],
    prognostico:
      'O prognóstico para gatos com Síndrome de Cushing é historicamente reservado a desfavorável, com sobrevida mediana variando de 6 a 18 meses após o diagnóstico. O fator limitante da qualidade de vida é frequentemente a Síndrome da Fragilidade Cutânea, que predispõe a infecções bacterianas intratáveis e feridas crônicas de difícil cicatrização. Todavia, em pacientes que atingem bom controle médico com trilostano e nos quais o diabetes mellitus entra em remissão clínica sem lesões cutâneas irreversíveis, sobrevidas superiores a 2 a 3 anos são plenamente possíveis.'
  },

  prevention: {
    estrategiaPreventivaEDomiciliar:
      'A prevenção primária das formas espontâneas (PDH e ADH) não é viável por se tratarem de neoplasias endócrinas funcionais. A profilaxia primordial é iatrogênica: uso altamente criterioso e parcimonioso de glicocorticoides sistêmicos e progestágenos injetáveis em gatos, sempre na menor dose eficaz e pelo menor tempo possível. Em gatos diabéticos, o rastreamento precoce do hipercortisolismo em fases onde a dose de insulina ultrapassa 1,5 U/kg/dose previne o colapso catabólico dérmico irreversível.',
    errosComuns: [
      'Aplicar o teste LDDST com a dose canina de 0,01 mg/kg de dexametasona no gato, resultando em falsos diagnósticos positivos universais.',
      'Utilizar o teste de estimulação com ACTH como exame de triagem para descartar a doença na espécie felina, ignorando sua baixíssima sensibilidade de 33-60%.',
      'Descartar Cushing felino com base em uma dosagem de fosfatase alcalina sérica (FA) normal.',
      'Prescrever trilostano em dose única diária (a cada 24 horas), o que leva a falha terapêutica completa pelo metabolismo acelerado no gato.',
      'Manter inalterada a dose de insulina ao iniciar o tratamento com trilostano, expondo o paciente ao óbito por hipoglicemia convulsiva.',
      'Realizar contenção física vigorosa (scruffing) ou utilizar esparadrapos em gatos com suspeita de Cushing, provocando avulsões cutâneas transmurais graves.'
    ],
    redFlags: [
      'Laceração cutânea espontânea de espessura total com exposição da gordura subcutânea (fragilidade cutânea crítica).',
      'Ataxia, letargia profunda, mioclonias ou convulsões em paciente diabético iniciando trilostano (alerta de hipoglicemia aguda).',
      'Pressão da cabeça contra a parede (head pressing), marcha compulsiva em círculos ou cegueira súbita (compressão neurológica por macroadenoma).'
    ]
  },

  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'sindrome-cushing-caes',
    'diabetes-mellitus-felina',
    'hipoadrenocorticismo-addison',
    'hipertensao-arterial-sistemica-caes-gatos'
  ],
  relatedMedicationSlugs: [
    'trilostano',
    'insulina-glargina',
    'insulina-detemir',
    'dexametasona',
    'prednisolona'
  ],
  references: [
    {
      id: 'ref-cush-fel-alive-2025',
      title: "ALIVE Consensus: Cushing's Syndrome and Hypoadrenocorticism in Dogs and Cats",
      citationText: 'Niessen SJM, et al. ALIVE Consensus: Cushing\'s Syndrome and Hypoadrenocorticism in Dogs and Cats. Vet Sci. 2025;12(8):761.',
      authors: 'Niessen SJM, et al.',
      year: 2025,
      journal: 'Veterinary Sciences',
      volume: '12',
      pages: '761',
      sourceType: 'Consenso Internacional ALIVE 2025',
      url: 'https://doi.org/10.3390/vetsci12080761',
      doi: '10.3390/vetsci12080761',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-cush-fel-miceli-2022',
      title: 'Trilostane therapy in feline hyperadrenocorticism: a multicentre retrospective study of 42 cats',
      citationText: 'Miceli DD, et al. Trilostane therapy in feline hyperadrenocorticism: a multicentre retrospective study of 42 cats. J Feline Med Surg. 2022;24(9):e1-e11.',
      authors: 'Miceli DD, et al.',
      year: 2022,
      journal: 'Journal of Feline Medicine and Surgery',
      volume: '24',
      pages: 'e1-e11',
      sourceType: 'Estudo Clínico Multicêntrico',
      url: 'https://doi.org/10.1177/1098612X211069123',
      doi: '10.1177/1098612X211069123',
      evidenceLevel: 'B'
    },
    {
      id: 'ref-cush-fel-boland-2017',
      title: 'Feline hyperadrenocorticism: rare but real',
      citationText: 'Boland LA, et al. Feline hyperadrenocorticism: rare but real. J Feline Med Surg. 2017;19(9):933-943.',
      authors: 'Boland LA, et al.',
      year: 2017,
      journal: 'Journal of Feline Medicine and Surgery',
      volume: '19',
      pages: '933-943',
      sourceType: 'Artigo de Revisão Temática',
      url: 'https://doi.org/10.1177/1098612X17723245',
      doi: '10.1177/1098612X17723245',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-cush-fel-valentin-2014',
      title: 'Spontaneous feline hyperadrenocorticism: 30 cases (1995-2012)',
      citationText: 'Valentin SY, et al. Spontaneous feline hyperadrenocorticism: 30 cases (1995-2012). J Vet Intern Med. 2014;28(2):418-423.',
      authors: 'Valentin SY, et al.',
      year: 2014,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '28',
      pages: '418-423',
      sourceType: 'Estudo Retrospectivo',
      url: 'https://doi.org/10.1111/jvim.12298',
      doi: '10.1111/jvim.12298',
      evidenceLevel: 'B'
    },
    {
      id: 'ref-cush-fel-ettinger-2024',
      title: "Ettinger's Textbook of Veterinary Internal Medicine: Feline Hyperadrenocorticism",
      citationText: "Ettinger SJ, Feldman EC, Cote E. Textbook of Veterinary Internal Medicine: Diseases of the Dog and Cat. 9th ed. St. Louis: Elsevier; 2024:1880-1887.",
      authors: 'Ettinger SJ, Feldman EC, Cote E.',
      year: 2024,
      journal: "Ettinger's Textbook of Veterinary Internal Medicine",
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-cush-fel-nelson-2020',
      title: 'Small Animal Internal Medicine: Disorders of the Feline Adrenal Gland',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020:860-867.',
      authors: 'Nelson RW, Couto CG.',
      year: 2020,
      journal: 'Small Animal Internal Medicine (6th ed)',
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-cush-fel-bsava-endo',
      title: 'BSAVA Manual of Canine and Feline Endocrinology: Feline Hyperadrenocorticism',
      citationText: 'Mooney CT, Peterson ME. BSAVA Manual of Canine and Feline Endocrinology. 5th ed. Gloucester: BSAVA; 2020:200-212.',
      authors: 'Mooney CT, Peterson ME.',
      year: 2020,
      journal: 'BSAVA Manual of Canine and Feline Endocrinology',
      sourceType: 'Manual Especializado',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-cush-fel-hardy-2023',
      title: 'Feline cutaneous asthenia and fragile skin syndrome in pituitary-dependent hyperadrenocorticism',
      citationText: 'Hardy L, et al. Skin fragility in a cat with pituitary-dependent hyperadrenocorticism. JFMS Open Rep. 2023;9(1):20551169231171245.',
      authors: 'Hardy L, et al.',
      year: 2023,
      journal: 'JFMS Open Reports',
      volume: '9',
      pages: '20551169231171245',
      sourceType: 'Relato de Caso com Revisão',
      url: 'https://doi.org/10.1177/20551169231171245',
      doi: '10.1177/20551169231171245',
      evidenceLevel: 'B'
    },
    {
      id: 'ref-cush-fel-plumb-2023',
      title: "Plumb's Veterinary Drug Handbook (10th ed) - Trilostane",
      citationText: "Budde J. Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023:1015-1018.",
      authors: 'Budde J.',
      year: 2023,
      journal: "Plumb's Veterinary Drug Handbook",
      sourceType: 'Formulário Terapêutico de Referência',
      evidenceLevel: 'A'
    }
  ]
};
