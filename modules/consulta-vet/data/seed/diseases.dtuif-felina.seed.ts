import type { DiseaseRecord } from '../../types/disease';

const ICATCARE_2025_FIGURE_CREDIT =
  'Fonte: Taylor et al. 2025 iCatCare consensus guidelines on the diagnosis and management of lower urinary tract diseases in cats. Journal of Feline Medicine and Surgery, 2025.';

export const dtuifFelinaRecord: DiseaseRecord = {
  id: 'disease-dtuif-felina',
  slug: 'doencas-trato-urinario-inferior-felino-dtuif',
  title: 'Doenças do trato urinário inferior felino (DTUIF)',
  synonyms: [
    'DTUIF',
    'FLUTD',
    'LUTS felino',
    'Doenças do trato urinário baixo em gatos',
    'Cistite idiopática felina',
    'Obstrução uretral felina',
  ],
  species: ['cat'],
  category: 'nefrologia-urologia',
  tags: [
    'iCatCare 2025',
    'FIC',
    'Obstrução uretral',
    'Urolitíase',
    'ITU',
    'Periúria',
    'Manejo ambiental',
    'Hipercalemia',
  ],
  quickSummary:
    'DTUIF é um guarda-chuva clínico para gatos com disúria, hematúria, periúria, polaciúria e/ou estrangúria. O consenso iCatCare 2025 recomenda abandonar a ideia de "FLUTD" como diagnóstico final: os sinais são parecidos, mas as causas mudam completamente a conduta. A ficha deve separar rapidamente gato obstruído de gato não obstruído, depois organizar os principais diagnósticos diferenciais: cistite idiopática felina (FIC), urolitíase, infecção urinária, tampão uretral, neoplasia, trauma e alterações congênitas. FIC é comum, mas é diagnóstico de exclusão; ITU é incomum em gatos adultos saudáveis e não justifica antibiótico empírico automático. Macho com bexiga grande, firme e dolorida é emergência até provar o contrário.',
  quickDecisionStrip: [
    'Macho estrangúrico + bexiga grande/firme = tratar como obstrução uretral até exclusão.',
    'DTUIF não é diagnóstico final; sempre buscar a causa subjacente.',
    'FIC é diagnóstico de exclusão e exige analgesia + manejo ambiental multimodal.',
    'ITU é incomum em adulto saudável; cultura pesa mais que "urina feia" isolada.',
    'Após desobstrução, prevenir recidiva exige água, dieta, analgesia e redução de ameaça ambiental.',
  ],
  quickSummaryRich: {
    lead:
      'O consenso iCatCare 2025 muda a postura mental: sinais urinários baixos em gatos são ponto de partida, não conclusão. A primeira pergunta é "este gato está obstruído?". A segunda é "qual causa explica melhor estes sinais?". A terceira é "o ambiente e o cuidador conseguem sustentar o plano?".',
    leadHighlights: ['ponto de partida', 'obstruído', 'causa', 'ambiente', 'cuidador'],
    pillars: [
      {
        title: 'Nome correto',
        body:
          'Use "doenças do trato urinário inferior" no plural. "DTUIF/FLUTD" ajuda a agrupar sinais, mas não deve virar rótulo diagnóstico.',
        highlights: ['plural', 'não deve virar rótulo'],
      },
      {
        title: 'Emergência',
        body:
          'Obstrução uretral causa azotemia, acidose, hipercalemia e arritmias. Fluidoterapia e estabilização não devem esperar a passagem do cateter.',
        highlights: ['hipercalemia', 'não devem esperar'],
      },
      {
        title: 'Longo prazo',
        body:
          'FIC e recidivas dependem de analgesia, ingestão hídrica, caixa sanitária adequada, redução de ameaça e comunicação realista com o cuidador.',
        highlights: ['analgesia', 'ingestão hídrica', 'caixa sanitária'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Reconhecer LUTS',
          timing: 'Primeira consulta',
          detail:
            'Disúria, hematúria, periúria, polaciúria e estrangúria podem ocorrer em várias combinações e não diferenciam sozinhas FIC, urolitíase, ITU e obstrução (iCatCare, 2025).',
        },
        {
          label: 'Palpar bexiga e classificar risco',
          timing: 'Antes de rotular',
          detail:
            'Bexiga normal/pequena orienta investigação ambulatorial; bexiga dolorosa, firme e distendida em gato estrangúrico orienta emergência por suspeita de obstrução uretral (iCatCare, 2025).',
        },
        {
          label: 'Banco mínimo útil',
          detail:
            'História urinária e ambiental, exame físico, peso, condição corporal, palpação abdominal, exame perineal, urinálise quando possível e imagem conforme estabilidade e recurso (iCatCare, 2025).',
        },
        {
          label: 'Excluir causas tratáveis',
          detail:
            'Radiografia e ultrassom para urolitíase/anormalidades; cultura quando bacteriúria e sinais sustentam ITU; avaliar comorbidades em gatos maduros/idosos (iCatCare, 2025).',
        },
        {
          label: 'FIC como exclusão',
          detail:
            'FIC é presumida quando não há obstrução ativa, cálculo, ITU ou outra causa; exige plano ambiental, analgesia e seguimento, não só anti-inflamatório (iCatCare, 2025).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano de tratamento',
      steps: [
        {
          label: 'Obstruído primeiro',
          detail:
            'Triagem, analgesia, estabilização, fluidoterapia, correção de hipercalemia quando indicada e desobstrução atraumática — não atrasar fluidos esperando cateter (iCatCare, 2025).',
        },
        {
          label: 'Dor sempre',
          detail:
            'FIC e obstrução são dolorosas. Priorizar analgesia e reduzir estresse de internação, manipulação e medicação (iCatCare, 2025).',
        },
        {
          label: 'Causa específica',
          detail:
            'Dissolução/remoção de estruvita quando cabível, remoção de oxalato, antibiótico guiado por cultura para ITU clínica, oncologia/intervenção quando neoplasia (iCatCare, 2025).',
        },
        {
          label: 'MEMO',
          detail:
            'Modificação ambiental multimodal, água, caixas sanitárias, brincadeira, locais elevados e redução de conflitos são parte do tratamento (iCatCare, 2025).',
        },
      ],
    },
  },
  etiology: {
    conceito:
      'DTUIF descreve sinais do trato urinário inferior, não uma etiologia única. O consenso prefere "lower urinary tract diseases" no plural para evitar que o termo vire diagnóstico final e para forçar busca de causa subjacente.',
    causasPrincipais: [
      'Cistite idiopática felina (FIC): causa comum de sinais urinários baixos, associada a resposta de ameaça central, dor e ambiente provocativo.',
      'Urolitíase: estruvita e oxalato de cálcio são os tipos mais relevantes; o tipo de cristal nem sempre prediz o tipo de cálculo.',
      'Infecção do trato urinário: incomum em gatos adultos saudáveis, mais provável em idosos, fêmeas e pacientes com DRC, diabetes, hipertireoidismo, cateterização ou cirurgia urológica.',
      'Obstrução uretral: consequência potencialmente fatal de FIC, tampões, urolitíase, espasmo, defeitos anatômicos e raramente neoplasia.',
      'Outras causas: neoplasia, trauma, malformações congênitas, incontinência por doença neurológica/uretral e condições raras.',
    ],
    figuraSinais: {
      kind: 'clinicalFigure',
      src: '/images/consulta-vet/dtuif-felina-icatcare-2025/figura-1-sinais-dtuif.png',
      alt: 'Gato com sinais de doença do trato urinário inferior descritos no consenso iCatCare 2025.',
      caption: `Figura 1 do consenso iCatCare 2025: sinais do trato urinário inferior em gatos. ${ICATCARE_2025_FIGURE_CREDIT}`,
    },
  },
  epidemiology: {
    perfilGeral:
      'Os sinais urinários baixos são frequentes na clínica felina e muitas séries classificam cerca de 55-65% dos casos como FIC quando uma causa específica não é encontrada. A prevalência por causa varia conforme idade, sexo, comorbidades e acesso a exames.',
    fic:
      'FIC tende a afetar gatos suscetíveis em ambientes provocativos: vida indoor, obesidade, sedentarismo, casas multicat, mudanças frequentes, ausência de pontos elevados, recursos mal distribuídos e experiências adversas precoces aparecem como fatores de risco consistentes.',
    utiEUrolitos:
      'ITU deve entrar com mais força em gatos maduros/idosos, fêmeas e pacientes com DRC, diabetes, hipertireoidismo, incontinência, cateterização, ureterostomia/perineal urethrostomy ou urolitíase. Urolitíase representa parcela importante dos casos e também pode causar obstrução.',
    obstrucao:
      'Obstrução uretral é mais crítica em machos, pela anatomia uretral, e pode evoluir em horas para distúrbios metabólicos graves. O tutor pode relatar "prisão de ventre", vocalização na caixa ou tentativas improdutivas de urinar.',
  },
  pathogenesisTransmission: {
    naoContagiosa:
      'DTUIF não é contagiosa. O que existe é um conjunto de causas urinárias, metabólicas, anatômicas, comportamentais e ambientais que produzem sinais semelhantes.',
    ficRespostaAmeaca:
      'Na FIC, o consenso descreve a bexiga como parte de uma síndrome sistêmica ligada à ativação persistente do sistema central de resposta à ameaça. A bexiga expressa dor e sinais urinários, mas o problema envolve eixo neuroendócrino, comportamento, ambiente e comorbidades.',
    obstrucao:
      'Na obstrução completa, a pressão intravesical aumenta, lesa mucosa vesical, transmite pressão a ureteres e rins e reduz filtração glomerular. Surgem azotemia, hiperfosfatemia, acidose, hipercalemia e hipocalcemia, com risco de bradicardia e arritmias.',
  },
  pathophysiology:
    'Disúria e estrangúria refletem dor, inflamação, espasmo ou obstrução uretral. Hematúria decorre de lesão/inflamação urotelial, trauma por cálculo ou cateterização, ou neoplasia. Polaciúria ocorre por irritação vesical e redução do limiar de micção. Periúria pode ser sinal de dor, associação negativa com a caixa sanitária, conflito ambiental ou recurso inadequado; não deve ser interpretada automaticamente como "vingança" ou marcação. Na obstrução, a progressão sistêmica é o ponto crítico: potássio alto, acidose e azotemia transformam um sinal urinário em emergência cardiovascular e metabólica.',
  clinicalSignsPathophysiology: [
    {
      system: 'urinary',
      findings: [
        {
          finding: 'Disúria, polaciúria e estrangúria',
          mechanism:
            'Inflamação urotelial, espasmo da musculatura lisa vesical/uretral ou obstrução parcial aumentam frequência e esforço miccional com dor.',
          clinicalMeaning: 'Diferenciar obstrução (bexiga distendida) de FIC/cistite não obstrutiva — conduta oposta.',
          priority: 'common',
        },
        {
          finding: 'Hematúria',
          mechanism:
            'Lesão da mucosa vesical/uretral por inflamação, cálculo, trauma ou neoplasia permite extravasamento de sangue no urinário.',
          clinicalMeaning: 'Isolada pode ser autolimitada; persistente exige exclusão de cálculo, infecção e neoplasia.',
          priority: 'common',
        },
        {
          finding: 'Periúria',
          mechanism:
            'Dor ou aversão associada à caixa leva o gato a miccionar fora do local; estresse ambiental reduz limiar de micção.',
          clinicalMeaning: 'Não é “vingança” — sinal de dor, recurso inadequado ou conflito multicat (Buffington et al.; iCatCare 2025).',
          priority: 'common',
        },
        {
          finding: 'Anúria/oligúria com bexiga distendida',
          mechanism:
            'Obstrução uretral impede esvaziamento; pressão intravesical transmite-se aos ureteres e reduz filtração.',
          clinicalMeaning: 'Emergência até prova em contrário — desobstruir e monitorar K⁺.',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Letargia, vômito, anorexia, colapso',
          mechanism:
            'Obstrução prolongada causa azotemia, acidose metabólica, desidratação e hipercalemia.',
          clinicalMeaning: 'Transforma quadro urinário em emergência sistêmica.',
          priority: 'emergency',
          context: ['Obstrução'],
        },
        {
          finding: 'Hipotermia e bradicardia',
          mechanism:
            'Hipercalemia grave reduz excitabilidade cardíaca e débito.',
          clinicalMeaning: 'Red flag para parada cardíaca iminente — ECG e correção urgente de K⁺.',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'behavioral',
      findings: [
        {
          finding: 'Esconder-se, agressividade defensiva, overgrooming perineal',
          mechanism:
            'Dor visceral e ameaça percebida ativam resposta de fuga/luta; lambedura local pode ser resposta à dor vesical.',
          clinicalMeaning: 'Comportamento reflete sofrimento — analgesia e manejo ambiental fazem parte do tratamento.',
          priority: 'common',
        },
        {
          finding: 'Recidivas em ambiente estressante',
          mechanism:
            'Estresse crônico altera eixo HPA e sensibilidade vesical em gatos predispostos (FIC).',
          clinicalMeaning: 'Modificar recursos, rotas de fuga e número de caixas reduz recorrência.',
          priority: 'common',
        },
      ],
    },
  ],
  diagnosis: {
    algoritmoConsenso: {
      kind: 'clinicalFigure',
      src: '/images/consulta-vet/dtuif-felina-icatcare-2025/figura-4-algoritmo-dtuif.png',
      alt: 'Algoritmo do consenso iCatCare 2025 para gatos com sinais de trato urinário inferior.',
      caption: `Figura 4 do consenso iCatCare 2025: tomada de decisão em gatos com sinais urinários baixos. ${ICATCARE_2025_FIGURE_CREDIT}`,
    },
    passos: [
      {
        stepNumber: 1,
        title: 'Triagem: obstruído ou não obstruído',
        purpose: 'Diferenciar emergência uretral de FIC não obstrutiva.',
        description:
          'Palpar bexiga com gentileza. Bexiga grande, firme, dolorida ou tentativas improdutivas em macho exigem abordagem de obstrução uretral (iCatCare, 2025).',
        interpretation: 'Obstrução confirmada tem prioridade sobre exames eletivos.',
        limitations: 'Palpação inconclusiva em gato obeso — considerar ultrassom.',
        isGoldStandard: true,
      },
      {
        stepNumber: 2,
        title: 'História urinária e ambiental',
        purpose: 'Identificar gatilhos de FIC e fatores de risco.',
        description:
          'Registrar sinais, volume/cor da urina, mudança de ambiente, dieta, caixas, substrato, conflitos e comorbidades.',
        interpretation: 'Periúria com recurso inadequado favorece FIC funcional.',
        limitations: 'História incompleta é frequente — usar questionário estruturado.',
      },
      {
        stepNumber: 3,
        title: 'Urinálise e cultura quando possível',
        purpose: 'Excluir ITU e documentar sedimento.',
        description:
          'USG, fita e sedimento; cultura por cistocentese quando bacteriúria clínica ou recidiva.',
        interpretation: 'Bacteriúria subclínica isolada geralmente não requer tratamento.',
        limitations: 'Amostra de bolsa pode contaminar.',
      },
      {
        stepNumber: 4,
        title: 'Imagem para cálculo e causas estruturais',
        purpose: 'Detectar urolitíase e massas vesicais.',
        description:
          'Radiografias abdominais e ultrassom; uretrografia se falha de cateterização.',
        interpretation: 'Estruvita pode dissolver; oxalato exige remoção quando sintomático.',
        limitations: 'Nem todos os cálculos são radiopacos.',
      },
      {
        stepNumber: 5,
        title: 'FIC por exclusão clínica',
        purpose: 'Rotular FIC após excluir causas tratáveis.',
        description:
          'Integrar sinalamento, história, exclusão de obstrução, cálculo e ITU; resposta ao MEMO.',
        interpretation: 'Melhora ambiental apoia diagnóstico funcional de FIC.',
        limitations: 'Não existe teste confirmatório específico.',
      },
      {
        stepNumber: 6,
        title: 'Recursos limitados',
        purpose: 'Conduta mínima segura quando exames completos não estão disponíveis.',
        description:
          'Diferenciar obstrução, analgesia, hidratação, urina quando possível e retorno curto.',
        interpretation: 'Obstrução suspeita exige encaminhamento mesmo com recursos limitados.',
        limitations: 'Antibiótico empírico não substitui diagnóstico.',
      },
    ],
    obstrucaoUretral: {
      kind: 'clinicalFigure',
      src: '/images/consulta-vet/dtuif-felina-icatcare-2025/figura-16-algoritmo-obstrucao.png',
      alt: 'Algoritmo do consenso iCatCare 2025 para suspeita de obstrução uretral em gatos.',
      caption: `Figura 16 do consenso iCatCare 2025: abordagem inicial de gato com suspeita de obstrução uretral. ${ICATCARE_2025_FIGURE_CREDIT}`,
    },
  },
  treatment: {
    decisaoInicial:
      'Separar três cenários muda tudo: gato obstruído instável, gato obstruído estável e gato com sinais urinários sem obstrução. A primeira prioridade é estabilizar e aliviar dor; a segunda é identificar a causa; a terceira é prevenir recidiva com plano executável pelo cuidador.',
    ordemDePrioridade: [
      '1) Suspeita de obstrução uretral: analgesia, acesso IV, PCV/TS, ureia/creatinina, eletrólitos, ECG quando possível, fluidoterapia e correção de hipercalemia se indicada; não atrasar fluidos esperando cateter.',
      '2) Desobstrução: sedação/anestesia adequada, técnica atraumática, cateter apropriado, lavagem com solução estéril morna quando há debris visível e sistema fechado se cateter permanecer.',
      '3) Hipercalemia com bradicardia/ECG alterado: gluconato de cálcio como primeira linha para estabilização cardíaca, além de fluidoterapia e terapias de deslocamento de potássio conforme necessidade.',
      '4) FIC não obstrutiva: analgesia, aumentar água, dieta úmida se aceita, manejo ambiental multimodal (MEMO), evitar medicalização forçada que piore estresse.',
      '5) Urolitíase: estruvita pode ser dissolvida em circunstâncias selecionadas; oxalato de cálcio não dissolve e exige remoção/intervenção quando clinicamente relevante; sempre analisar cálculo removido.',
      '6) ITU clínica: tratar com base em cultura e sensibilidade; bacteriúria subclínica geralmente não deve ser tratada; evitar cefovecina/fluoroquinolona empíricas sem indicação robusta.',
      '7) Alta pós-obstrução: observar micção quando possível, analgesia domiciliar, reintrodução cuidadosa ao ambiente, monitorar recidiva, água/dieta e plano de caixa sanitária.',
    ],
    hipercalemia: {
      kind: 'clinicalFigure',
      src: '/images/consulta-vet/dtuif-felina-icatcare-2025/figura-18-hipercalemia.png',
      alt: 'Algoritmo do consenso iCatCare 2025 para manejo de hipercalemia em gatos obstruídos.',
      caption: `Figura 18 do consenso iCatCare 2025: manejo de hipercalemia em gatos com obstrução uretral. ${ICATCARE_2025_FIGURE_CREDIT}`,
    },
    ficManejo:
      'MEMO é padrão de prática para FIC: educação do cuidador, recursos múltiplos e separados, caixa sanitária adequada, locais seguros/elevados, interações positivas, redução de punição, aumento de água e brincadeira. Analgesia deve ser priorizada porque FIC é dolorosa. Prednisolona, pentosano e glicosaminoglicanos não mostraram benefício consistente; amitriptilina pode ser considerada em casos refratários selecionados.',
    antibioticStewardship:
      'Antibiótico profilático em gato com cateter urinário não é recomendado. Cultura de urina de bolsa/coletor pode refletir bacteriúria, não ITU. Antimicrobianos criticamente importantes para humanos não devem ser usados para pacientes felinos; cefalosporinas de gerações altas e fluoroquinolonas devem ficar reservadas para indicação real.',
    cateterizacao:
      'Preparar todo o material antes da sedação/anestesia, fazer antissepsia ampla, exame retal para uretra intrapélvica, massagear suavemente a ponta do pênis, alinhar o pênis caudal/dorsalmente para reduzir a curva em S e avançar com flush pulsátil sem força. Resistência persistente pede reavaliação, não agressividade técnica.',
    monitoramento: [
      'Dor, frequência de micção, tamanho dos grumos na areia, hematúria visível e tentativas improdutivas nas primeiras 24-72 h.',
      'Creatinina, ureia, potássio, fósforo e hidratação após desobstrução, especialmente se havia azotemia ou diurese pós-obstrutiva.',
      'Urina produzida versus fluido administrado quando internado; diurese pós-obstrutiva acima de 2 ml/kg/h pode causar desidratação e hipocalemia.',
      'Recidivas devem acionar revisão de ambiente, água, dieta, urolitíase, ITU e dor, não apenas repetição de prazosina/antibiótico.',
    ],
  },
  prevention: {
    manejoAmbiental:
      'A prevenção de recidivas depende de reduzir percepção de ameaça e aumentar controle do gato sobre o ambiente: recursos múltiplos e separados, caixas grandes e limpas, substrato arenoso/agregante quando aceito, locais elevados, esconderijos, brincadeira, treino com reforço positivo e ausência de punição.',
    figuraManejoAmbiental: {
      kind: 'clinicalFigure',
      src: '/images/consulta-vet/dtuif-felina-icatcare-2025/figura-34-manejo-ambiental.png',
      alt: 'Resumo visual do consenso iCatCare 2025 sobre áreas de foco ambiental para gatos com doença urinária baixa.',
      caption: `Figura 34 do consenso iCatCare 2025: áreas de foco para cuidadores de gatos com doença urinária baixa. ${ICATCARE_2025_FIGURE_CREDIT}`,
    },
    caixasSanitarias:
      'Orientação prática: uma caixa por gato mais uma extra, em locais quietos e separados, com entrada fácil, limpeza diária, lavagem periódica e tamanho suficiente para o gato girar confortavelmente. Caixa inadequada reduz micção e piora sinais.',
    aguaEDieta:
      'Aumentar água beneficia FIC, urolitíase, ITU e prevenção de obstrução: fontes e potes em vários locais, água limpa, potes largos de cerâmica, dieta úmida quando aceita, água adicionada ao alimento se não reduzir ingestão e distância entre água e comida.',
    figuraAgua: {
      kind: 'clinicalFigure',
      src: '/images/consulta-vet/dtuif-felina-icatcare-2025/figura-38-ingestao-hidrica.png',
      alt: 'Recomendações do consenso iCatCare 2025 para aumentar ingestão hídrica em gatos.',
      caption: `Box 12/Figura 38 do consenso iCatCare 2025: estratégias para aumentar ingestão hídrica. ${ICATCARE_2025_FIGURE_CREDIT}`,
    },
    comunicacao:
      'Explicar ao cuidador que periúria não é vingança e punição piora medo/estresse. Definir poucas mudanças prioritárias, fazer retorno em 24-48 h quando há medicação ou alta pós-obstrução e ajustar o plano à capacidade real da família.',
  },
  relatedConsensusSlugs: ['icatcare-dtuif-felina-2025'],
  relatedDiseaseSlugs: ['doenca-renal-cronica-caes-gatos', 'hipertireoidismo-felino'],
  relatedMedicationSlugs: ['amoxicilina-clavulanato', 'sulfametoxazol-trimetoprima', 'pregabalina', 'maropitant', 'fluoxetina', 'amitriptilina'],
  references: [
    {
      id: 'ref-taylor-icatcare-2025-lutd',
      citationText:
        'Taylor S. et al. 2025 iCatCare consensus guidelines on the diagnosis and management of lower urinary tract diseases in cats. Journal of Feline Medicine and Surgery. 2025;27:1-36.',
      sourceType: 'Consenso',
      url: 'https://doi.org/10.1177/1098612X251333835',
      notes: 'Documento-base da ficha; recomenda abordagem por causa, triagem de obstrução e MEMO para FIC.',
      evidenceLevel: 'Consenso internacional 2025',
    },
  ],
  isPublished: true,
};
