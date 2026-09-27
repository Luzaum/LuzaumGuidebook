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
          'Preferir "doenças do trato urinário inferior" no plural. "DTUIF/FLUTD" ajuda a agrupar sinais, mas não deve virar rótulo diagnóstico.',
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
  complications: {
    sequelasObstrutivas: [
      'Reobstrução Uretral Recorrente: complicação frequente que acomete entre 15% e 35% dos gatos machos sobreviventes a um primeiro episódio de desobstrução, ocorrendo predominantemente nas primeiras 24 a 72 horas pós-remoção da sonda ou nos primeiros 6 meses. Decorre da persistência do espasmo uretral, formação contínua de tampões de matriz proteica/cristalina, edema da mucosa peniana ou urolitíase residual.',
      'Diurese Pós-Obstrutiva (POD): poliúria patológica intensa e abrupta (>2 a 5 mL/kg/h, podendo atingir até 10-15 mL/kg/h) deflagrada pelo alívio da pressão intravesical. É provocada pela excreção osmótica de solutos retidos (ureia), perda de tonicidade da medula renal e insensibilidade temporária dos túbulos coletores ao hormônio antidiurético (ADH). Se a reposição volêmica e eletrolítica não acompanhar milimetricamente as perdas urinárias, o paciente desenvolve hipovolemia severa, colapso circulatório e hipocalemia fatal.',
      'Atonia Vesical por Lesão do Músculo Detrusor: a sobredistensão vesical prolongada (>24-48 horas de anúria) estira de forma excessiva as fibras musculares lisas do detrusor, rompendo as junções comunicantes (gap junctions) intercelulares. Isso impede a propagação dos potenciais de ação de despolarização, deixando a bexiga atônica, flácida e incapaz de contração voluntária mesmo após a desobstrução da uretra. Exige esvaziamento manual delicado frequente ou manutenção de sonda fechada por 3 a 5 dias para regeneração miofascial.',
      'Laceração, Estenose Cicatricial e Ruptura de Uretra: traumas mecânicos induzidos por passagens forçadas de sondas rígidas sem lubrificação suficiente ou hidropropulsão em alta pressão podem provocar laceração ou necrose transmural da uretra peniana ou intrapélvica, com extravasamento urinário retroperitoneal/subcutâneo, celulite necrosante, estenose uretral retrátil cicatricial e necessidade imperativa de uretrostomia perineal (PU) emergencial.',
      'Ruptura de Bexiga e Uroperitônio: complicação de compressão manual vigorosa de bexiga distendida ("tentativa de esvaziamento forçado") ou necrose isquêmica transmural parietal da bexiga em obstruções negligenciadas. Provoca peritonite química, reabsorção peritoneal fulminante de ureia e potássio, acidose metabólica severa e colapso hemodinâmico.'
    ],
    sequelasMetabolicasECardiovasculares: [
      'Parada Cardiorrespiratória por Hipercalemia Fulminante: concentrações séricas de potássio superiores a 7,5-8,0 mEq/L reduzem o potencial de membrana das células miocárdicas, causando desaparecimento de ondas P, alargamento de complexos QRS, bradiarritmias sinusais extremas, bloqueio sinoatrial ou atrioventricular e assistolia terminal ou fibrilação ventricular.',
      'Lesão Renal Aguda Isquêmica e Intrínseca (LRA): a transmissão retrógrada da alta pressão intracavitária vesical (que pode atingir 80 a 100 cmH2O) ao longo dos ureteres comprime a microcirculação peritubular renal e o parênquima glomerular, deflagrando necrose tubular aguda (NTA) e perda persistente de néfrons funcionais, podendo converter-se em Doença Renal Crônica permanente.',
      'Infecção Ascendente Iatrogênica / Pielonefrite: o cateterismo uretral de demora, especialmente em sistemas coletores abertos ou manuseados sem antissepsia estrita, introduz biofilme bacteriano que ascende rapidamente pela bexiga e ureteres, resultando em pielonefrite séptica e bacteremia.'
    ],
    prognostico:
      'Para a crise não obstrutiva de cistite idiopática (FIC), o prognóstico de curto prazo para resolução do episódio agudo é excelente, com a vasta maioria dos casos apresentando caráter autolimitado e melhora dos sinais clínicos em 3 a 7 dias com analgesia adequada. Todavia, o prognóstico de longo prazo é reservado quanto a recidivas caso o ambiente doméstico e a ingestão hídrica não sejam modificados permanentemente, com taxas de recorrência de 40% a 50% em 1 ano. Na obstrução uretral (UO), a sobrevida inicial ultrapassa 90% a 95% quando o paciente é atendido e desobstruído precocemente com correção da hipercalemia; o prognóstico torna-se grave quando há hipotermia severa (<35°C), bradicardia extrema, uroperitônio ou ruptura uretral associada.'
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
      'Orientação prática: uma caixa por gato mais uma extra (regra N+1), em locais quietos, seguros e separados, com entrada fácil, limpeza diária dos dejetos, lavagem periódica sem produtos clorados irritantes e tamanho suficiente para o gato girar confortavelmente (1,5 vezes o comprimento do corpo). Caixa inadequada ou com acesso bloqueado reduz micção e deflagra crises.',
    aguaEDieta:
      'Aumentar água beneficia FIC, urolitíase, ITU e prevenção de obstrução: fontes e potes em vários locais, água limpa e fresca diariamente, potes largos de cerâmica ou vidro para evitar toque nos bigodes, dieta úmida exclusiva ou mista (sachês/latas) quando aceita, água morna adicionada ao alimento se não reduzir ingestão e distância física entre água e comida.',
    figuraAgua: {
      kind: 'clinicalFigure',
      src: '/images/consulta-vet/dtuif-felina-icatcare-2025/figura-38-ingestao-hidrica.png',
      alt: 'Recomendações do consenso iCatCare 2025 para aumentar ingestão hídrica em gatos.',
      caption: `Box 12/Figura 38 do consenso iCatCare 2025: estratégias para aumentar ingestão hídrica. ${ICATCARE_2025_FIGURE_CREDIT}`,
    },
    comunicacao:
      'Explicar exaustivamente ao cuidador que periúria não é "vingança" ou "ciúme" e que punições verbais ou físicas pioram exponencialmente a resposta de estresse do SNC, agravando a inflamação neurogênica vesical. Definir poucas mudanças prioritárias por vez, fazer retorno em 24-48 h quando há medicação ou alta pós-obstrução e ajustar o plano à capacidade real da família.',
  },
  relatedConsensusSlugs: ['icatcare-dtuif-felina-2025'],
  relatedDiseaseSlugs: ['doenca-renal-cronica-caes-gatos', 'hipertireoidismo-felino', 'cistite-idiopatica-felina'],
  relatedMedicationSlugs: [
    'buprenorfina',
    'gabapentina',
    'prazosina',
    'amoxicilina-clavulanato',
    'sulfametoxazol-trimetoprima',
    'amitriptilina',
    'fluoxetina'
  ],
  references: [
    {
      id: 'ref-taylor-icatcare-2025-lutd',
      title: '2025 iCatCare consensus guidelines on the diagnosis and management of lower urinary tract diseases in cats',
      citationText:
        'Taylor S, Sparkes A, Briscoe K, et al. 2025 iCatCare consensus guidelines on the diagnosis and management of lower urinary tract diseases in cats. Journal of Feline Medicine and Surgery. 2025;27(2):1-36.',
      authors: 'Taylor S, Sparkes A, Briscoe K, et al.',
      year: 2025,
      journal: 'Journal of Feline Medicine and Surgery',
      volume: '27',
      pages: '1-36',
      sourceType: 'Consenso Internacional iCatCare',
      url: 'https://doi.org/10.1177/1098612X251333835',
      doi: '10.1177/1098612X251333835',
      evidenceLevel: 'Consenso Internacional 2025'
    },
    {
      id: 'ref-ettinger-flutd-2024',
      title: "Disorders of the Urethra and Lower Urinary Tract in Cats",
      citationText: "Ettinger SJ, Feldman EC, Cote E. Textbook of Veterinary Internal Medicine: Diseases of the Dog and Cat. 9th ed. St. Louis: Elsevier; 2024:2010-2035.",
      authors: 'Ettinger SJ, Feldman EC, Cote E.',
      year: 2024,
      journal: "Ettinger's Textbook of Veterinary Internal Medicine",
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-nelson-couto-flutd-2020',
      title: 'Disorders of the Lower Urinary Tract in Cats',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020:695-715.',
      authors: 'Nelson RW, Couto CG.',
      year: 2020,
      journal: 'Small Animal Internal Medicine (6th ed)',
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-bsava-nephrology-2017',
      title: 'BSAVA Manual of Canine and Feline Nephrology and Urology (3rd ed)',
      citationText: 'Elliott J, Grauer GF, Westropp JL. BSAVA Manual of Canine and Feline Nephrology and Urology. 3rd ed. Gloucester: BSAVA; 2017.',
      authors: 'Elliott J, Grauer GF, Westropp JL.',
      year: 2017,
      journal: 'BSAVA Manual of Canine and Feline Nephrology and Urology',
      sourceType: 'Manual Especializado',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-macleod-fic-2025',
      title: 'Systematic review of the medical and environmental management of feline idiopathic cystitis',
      citationText: 'Macleod E, et al. Systematic review of the medical and environmental management of feline idiopathic cystitis. J Feline Med Surg. 2025;27(1):1098612X241300892.',
      authors: 'Macleod E, et al.',
      year: 2025,
      journal: 'Journal of Feline Medicine and Surgery',
      volume: '27',
      pages: 'e241300892',
      sourceType: 'Revisão Sistemática',
      doi: '10.1177/1098612X241300892',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-reineke-prazosin-2017',
      title: 'Evaluation of prazosin for prevention of recurrent urethral obstruction in cats: a double-blind, randomized, controlled trial',
      citationText: 'Reineke EL, et al. Evaluation of prazosin for prevention of recurrent urethral obstruction in cats: a double-blind, randomized, controlled trial. J Am Vet Med Assoc. 2017;250(8):878-886.',
      authors: 'Reineke EL, et al.',
      year: 2017,
      journal: 'Journal of the American Veterinary Medical Association',
      volume: '250',
      pages: '878-886',
      sourceType: 'Ensaio Clínico Randomizado Duplo-Cego',
      doi: '10.2460/javma.250.8.878',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-buffington-memo-2006',
      title: 'Clinical evaluation of multimodal environmental modification (MEMO) in the management of cats with idiopathic cystitis',
      citationText: 'Buffington CAT, et al. Clinical evaluation of multimodal environmental modification (MEMO) in the management of cats with idiopathic cystitis. J Feline Med Surg. 2006;8(4):261-268.',
      authors: 'Buffington CAT, et al.',
      year: 2006,
      journal: 'Journal of Feline Medicine and Surgery',
      volume: '8',
      pages: '261-268',
      sourceType: 'Estudo Clínico Prospectivo',
      doi: '10.1016/j.jfms.2006.02.002',
      evidenceLevel: 'B'
    },
    {
      id: 'ref-cooper-pod-2010',
      title: 'Postobstructive diuresis in 10 male cats with urethral obstruction',
      citationText: 'Cooper ES, et al. Postobstructive diuresis in 10 male cats with urethral obstruction. J Vet Emerg Crit Care. 2010;20(5):508-517.',
      authors: 'Cooper ES, et al.',
      year: 2010,
      journal: 'Journal of Veterinary Emergency and Critical Care',
      volume: '20',
      pages: '508-517',
      sourceType: 'Estudo Clínico',
      doi: '10.1111/j.1476-4431.2010.00570.x',
      evidenceLevel: 'B'
    },
    {
      id: 'ref-hall-uo-2014',
      title: 'Outcome of male cats managed for urethral obstruction: 49 cases (2007-2009)',
      citationText: 'Hall J, et al. Outcome of male cats managed for urethral obstruction: 49 cases (2007-2009). J Vet Emerg Crit Care. 2014;24(5):555-562.',
      authors: 'Hall J, et al.',
      year: 2014,
      journal: 'Journal of Veterinary Emergency and Critical Care',
      volume: '24',
      pages: '555-562',
      sourceType: 'Estudo Retrospectivo',
      doi: '10.1111/vec.12216',
      evidenceLevel: 'B'
    },
    {
      id: 'ref-plumb-dtuif-2023',
      title: "Plumb's Veterinary Drug Handbook (10th ed) - Buprenorphine, Gabapentin, Prazosin",
      citationText: "Budde J. Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023.",
      authors: 'Budde J.',
      year: 2023,
      journal: "Plumb's Veterinary Drug Handbook",
      sourceType: 'Formulário Terapêutico de Referência',
      evidenceLevel: 'A'
    }
  ],
  isPublished: true,
};
