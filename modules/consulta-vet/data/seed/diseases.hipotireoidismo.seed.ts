import { DiseaseRecord } from '../../types/disease';

/** Hipotireoidismo Canino; texto editorial integrando ACVIM, MSD e Nelson & Couto. */
export const hipotireoidismoCaninoRecord: DiseaseRecord = {
  id: 'disease-hipotireoidismo-canino',
  slug: 'hipotireoidismo-canino',
  title: 'Hipotireoidismo Canino',
  synonyms: [
    'Hipotireoidismo',
    'Canine hypothyroidism',
    'Tireoidite linfocítica',
    'Atrofia tireóidea idiopática',
  ],
  species: ['dog'],
  category: 'endocrinologia',
  tags: [
    'Tireóide',
    'Levotiroxina',
    'T4 Livre',
    'cTSH',
    'Letargia',
    'Ganho de peso',
    'Alopecia simétrica',
    'Fáceis trágica',
  ],
  quickSummary:
    'O hipotireoidismo canino é uma das endocrinopatias mais comuns em cães, caracterizada pelo decréscimo da produção e secreção dos hormônios tireoidianos (T4 e T3). Na quase totalidade dos casos, é uma afecção primária decorrente de tireoidite linfocítica imunomediada (destruição ativa com presença de autoanticorpos antitiroglobulina) ou atrofia tireóidea idiopática (substituição por tecido adiposo). O hipotireoidismo secundário (pituitário) é muito raro (<5%). A deficiência hormonal diminui a atividade metabólica celular de quase todos os sistemas corporais, manifestando-se clinicamente por letargia profunda, ganho de peso sem aumento de ingestão calórica, intolerância ao exercício, busca por fontes de calor, e graves distúrbios dermatológicos (alopecia simétrica bilateral não pruriginosa, cauda de rato, hiperpigmentação e fácies trágica por mixedema facial). O diagnóstico é desafiador devido à inespecificidade dos sinais e à supressão do T4 sérico por doenças não tireoidianas (Euthyroid Sick Syndrome). A confirmação exige a combinação de T4 Livre por diálise baixo e cTSH elevado. O tratamento consiste na reposição vitalícia com Levotiroxina sódica oral.',
  quickDecisionStrip: [
    'Cão com letargia, ganho de peso injustificado, alopecia simétrica bilateral não pruriginosa ("cauda de rato") e hipercolesterolose marcante: suspeite forte de hipotireoidismo.',
    'Nunca firme o diagnóstico de hipotireoidismo baseando-se apenas em um T4 Total baixo; "Euthyroid Sick Syndrome" (supressão por outras doenças) é extremamente comum.',
    'A combinação laboratorial ideal para o diagnóstico definitivo é: T4 Livre por diálise baixo + TSH canino (cTSH) elevado.',
    'Até 15–20% dos cães hipotireóideos confirmados podem apresentar cTSH normal; nestes casos, a interpretação isolada do cTSH pode gerar falsos-negativos.',
    'O tratamento de escolha é a reposição oral vitalícia com Levotiroxina sódica sintética (T4), com monitorização de T4 Total 4–6 horas pós-dose.',
  ],
  quickSummaryRich: {
    lead:
      'O hipotireoidismo canino "desacelera" o metabolismo do cão. O principal desafio clínico não é a complexidade do tratamento — que é simples e altamente eficaz com levotiroxina —, mas sim evitar o sobrediagnóstico. Inúmeros cães com dermatopatias alérgicas ou obesidade simples são rotulados e tratados de forma errônea devido à interpretação incorreta de dosagens isoladas de T4 Total suprimidas por estresse, AINEs ou corticoides.',
    leadHighlights: ['desacelera', 'sobrediagnóstico', 'T4 Total suprimido', 'Euthyroid Sick', 'levotiroxina'],
    pillars: [
      {
        title: 'Origem primária',
        body:
          'Mais de 95% decorrem de tireoidite linfocítica imunomediada (com anticorpos antitiroglobulina ativos) ou de atrofia idiopática bilateral. Raras vezes é congênito ou secundário a tumores pituitários.',
        highlights: ['tireoidite linfocítica', 'atrofia idiopática'],
      },
      {
        title: 'Euthyroid Sick Syndrome',
        body: 'Praticamente qualquer doença sistêmica moderada a grave, além de fármacos (como corticoides, fenobarbital e sulfas), pode suprimir o T4 sérico em cães com tireoide perfeitamente normal. Primeiro cure a doença de base antes de testar.',
        highlights: ['doença sistêmica', 'fármacos', 'suprimir o T4'],
      },
      {
        title: 'Fáceis trágica',
        body: 'O acúmulo cutâneo de mucopolissacarídeos (mixedema) retém água na derme facial, provocando o espessamento da pele da testa e pálpebras, gerando o clássico olhar triste/trágico.',
        highlights: ['mixedema', 'olhar triste'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico (triagem → confirmação dinâmica)',
      steps: [
        {
          label: '1. Reconhecimento do perfil clínico',
          detail:
            'Identificar letargia marcante, inatividade, ganho de peso sem polifagia, alopecia endócrina bilateral e intolerância ao frio em cães adultos.',
        },
        {
          label: '2. Banco de dados inicial (Bioquímica)',
          detail:
            'Achar hipercolesterolemia pronunciada (> 75% dos casos, decorrente de metabolismo de lipídios deprimido) e anemia normocítica normocrômica não regenerativa.',
        },
        {
          label: '3. Triagem com T4 Total sérico',
          detail:
            'Dosar T4 Total. Se estiver bem dentro do intervalo de referência normal, o hipotireoidismo está virtualmente descartado. Se estiver baixo, avançar para confirmação.',
        },
        {
          label: '4. T4 Livre por Diálise (fT4ED) + cTSH',
          detail:
            'Padrão ouro laboratorial conjunto. Achar T4 Livre (por diálise em equilíbrio, que isola autoanticorpos) baixo + TSH canino elevado. Este par fecha o diagnóstico com >95% de especificidade.',
        },
        {
          label: '5. Pesquisa de Autoanticorpos (TgAA)',
          detail:
            'Dosar anticorpos antitiroglobulina (TgAA) se suspeita de tireoidite linfocítica ativa em cães jovens ou de linhagens predispostas para planejamento futuro.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo terapêutico (reposição hormonal e monitoramento)',
      steps: [
        {
          label: 'Passo 1: Confirmação e início de Levotiroxina',
          detail:
            'Iniciar Levotiroxina sódica sintética (T4). Dose clássica inicial: 0,02 mg/kg via oral a cada 12 horas (BID) ou 0,1–0,2 mg/10 kg BID. Administrar preferencialmente em jejum.',
        },
        {
          label: 'Passo 2: Resposta clínica esperada',
          detail:
            'Observar aumento de energia e atividade em 1-2 semanas. A perda de peso ocorre em 4-8 semanas. A melhora dermatológica e repilação pode levar de 3 a 4 meses.',
        },
        {
          label: 'Passo 3: Monitoramento Pós-pílula (4-8 Semanas)',
          detail:
            'Dosar T4 Total 4 a 6 horas após a administração da dose da manhã (pico sérico). Meta: T4 Total deve estar no terço superior do intervalo de referência ou ligeiramente acima (ex: 3,5 a 5,0 µg/dL).',
        },
        {
          label: 'Passo 4: Ajuste posológico por espécie/resposta',
          detail:
            'Se T4 pós-pílula estiver baixo: checar adesão ao tratamento, absorção gastrointestinal ou considerar conversão para dose SID (uma vez ao dia) se clinicamente estável e em dose maior.',
        },
        {
          label: 'Passo 5: Controle crônico a longo prazo',
          detail:
            'Uma vez estável, dosar T4 Total e avaliar clinicamente o cão a cada 6 meses. Monitorar sinais de tireotoxicose/hipertireoidismo iatrogênico (polidipsia, polifagia, perda de peso, taquicardia).',
        },
      ],
    },
  },
  etiology: {
    visaoGeral:
      'Mais de 95% dos casos de hipotireoidismo canino clínico são primários, decorrentes de duas etiologias principais: a tireoidite linfocítica imunomediada e a atrofia tireóidea idiopática. Ambas provocam a perda irreversível do parênquima glandular ativo.',
    fatores: [
      'Tireoidite linfocítica crônica autoimune: infiltração difusa de linfócitos, plasmócitos e macrófagos que destrói folículos. Caracterizada pela presença de anticorpos antitiroglobulina (TgAA) em ~50% dos casos precoces.',
      'Atrofia tireóidea idiopática bilateral: degeneração não inflamatória do tecido glandular com substituição por gordura (tecido adiposo) e tecido conjuntivo fibroso.',
      'Causas secundárias (hipofisárias): hipoplasia ou neoplasia pituitária diminuindo a secreção de TSH (rara, <5%).',
      'Hipotireoidismo congênito (nanismo desproporcional): disgenesia tireóidea ou defeitos na síntese hormonal em filhotes (raro).',
    ],
  },
  epidemiology: {
    especiePrincipal:
      'Cão — afeta tipicamente cães de meia-idade a idosos (4 a 10 anos de idade). Animais castrados (machos e fêmeas) parecem apresentar risco aumentado em comparação a inteiros.',
    breedPredisposition:
      'Predisposição racial estabelecida em Golden Retriever, Doberman Pinscher, Irish Setter, Great Dane, Boxer, Cocker Spaniel, e Dachshund. O rastreio precoce em linhagens familiares afetadas é útil.',
    notaFelinos:
      'Em gatos, o hipotireoidismo espontâneo é considerado extremamente raro na clínica veterinária. Quase a totalidade dos casos felinos com tireoide deprimida é iatrogênico, decorrente de tratamento prévio com iodo radioativo (I-131) ou tireoidectomia cirúrgica bilateral para correção de hipertireoidismo.',
  },
  pathogenesisTransmission: {
    patogenese: [
      'A destruição crônica progressiva do córtex tireoidiano reduz a síntese e a liberação de tiroxina (T4) e triiodotironina (T3) na circulação sistêmica.',
      'O T4 livre diminui, reduzindo a retroalimentação negativa sobre a hipófise. A hipófise responde aumentando a síntese e a secreção de TSH (hormônio estimulador da tireoide), na tentativa inútil de estimular a glândula atrofiada.',
      'A falta de hormônios tireoidianos intracelulares diminui o número e a atividade de enzimas metabólicas mitocondriais, reduzindo o consumo de oxigênio de todas as células corporais.',
      'Ocorre lentidão no turnover celular epidérmico: folículos capilares entram em fase telógena (repouso) contínua, levando à alopecia. Há acúmulo de glicosaminoglicanos (mixedema) na derme pela incapacidade de degradação.',
      'O metabolismo lipídico é deprimido: ocorre redução da eliminação biliar de colesterol e da atividade da lipase lipoproteica, promovendo hipercolesterolemia grave.',
    ],
    transmissao:
      'Doença metabólica endócrina autoimune ou degenerativa primária; sem transmissão horizontal ou caráter contagioso.',
  },
  pathophysiology:
    'O hipotireoidismo diminui a taxa metabólica basal celular. Ocorre redução na termogênese (intolerância ao frio, letargia profunda, busca por calor), diminuição do estímulo cardíaco simpático (bradicardia sinusal leve, pulso normal a fraco), redução do estímulo de medula óssea (anemia não regenerativa leve), e lentidão no catabolismo lipídico (hipercolesterolemia com risco de aterosclerose em cães, embora infrequente na espécie).',
  clinicalSignsPathophysiology: [
    {
      system: 'general',
      findings: [
        'Letargia pronunciada, inatividade física, sonolência contínua e desinteresse por brincadeiras/passeios.',
        'Ganho de peso substancial e obesidade progressiva sem que tenha havido aumento na ingestão diária de alimentos.',
        'Intolerância severa ao frio: o cão busca deitar-se ao sol, sob cobertas ou próximo a aquecedores.',
      ],
    },
    {
      system: 'dermatologic',
      findings: [
        'Alopecia bilateral simétrica não pruriginosa e não inflamatória do tronco e flancos, poupando a cabeça e extremidades dos membros.',
        'Queda completa de pelos na cauda, gerando o aspecto clássico de "cauda de rato".',
        'Fáceis trágica: espessamento da pele da testa e face decorrente de mixedema, gerando pregas cutâneas faciais e um olhar triste característico.',
        'Hiperpigmentação difusa da pele alopécica, comedões e seborreia seca ou oleosa com odor forte.',
        'Predisposição a infecções bacterianas oportunistas secundárias de pele (piodermite recorrente) e otite externa.',
      ],
    },
    {
      system: 'cardiovascular',
      findings: [
        'Bradicardia sinusal leve a moderada persistente.',
        'Arritmias cardíacas (bloqueios atrioventriculares de primeiro grau ou complexos prematuros) menos comuns.',
        'Disfunção sistólica miocárdica subclínica moderada em ecocardiografia.',
      ],
    },
    {
      system: 'neuromuscular',
      findings: [
        'Neuropatias periféricas: fraqueza muscular, ataxia de membros, paresia, paralisia de nervo facial ou laringeo (menos comuns).',
        'Miopatia hipotireóidea: rigidez ao caminhar e atrofia muscular generalizada discreta.',
      ],
    },
  ],
  diagnosis: {
    cmeSuspeitaClinica:
      'Cão obeso, letárgico, com alopecia simétrica bilateral e mixedema facial é o addisoniano metabólico clássico. Os achados laboratoriais de hipercolesterolemia em exames de triagem bioquímica rotineiros reforçam maciçamente a suspeita clínica.',
    cmeTabelaFasesSinaisLab: {
      kind: 'clinicalTable' as const,
      headers: ['Exame Diagnóstico', 'Resultado no Hipotireoidismo', 'Significado Clínico / Interpretação'],
      rows: [
        [
          'Total T4 sérico',
          'Diminuído (frequentemente < 1.0 µg/dL)',
          'Excelente triagem. Se normal, descarta a doença. Se baixo, pode ser euthyroid sick ou fármacos; exige confirmação.',
        ],
        [
          'Free T4 por Diálise (fT4ED)',
          'Diminuído (Baixo)',
          'Mais sensível e específico. A diálise em equilíbrio separa autoanticorpos (T4AA) e proteínas de ligação. Menos influenciado por doenças não tireoidianas.',
        ],
        [
          'TSH canino (cTSH)',
          'Elevado (Alto; tipicamente > 0.6 ng/mL)',
          'A falta de retroalimentação de T4 estimula a secreção hipofisária. cTSH alto + fT4 baixo confirma o diagnóstico. cTSH normal ocorre em 15–20% dos doentes.',
        ],
        [
          'Colesterol sérico',
          'Elevado (Hipercolesterolemia > 300–400 mg/dL)',
          'Decorrente da queda na eliminação biliar e de receptores de LDL. Presente em > 75% dos cães hipotireóideos.',
        ],
        [
          'Hemograma',
          'Anemia normocítica normocrômica não regenerativa leve',
          'Ocorre em ~30% dos casos, causada pela redução na taxa metabólica da medula óssea e menor demanda periférica por oxigênio.',
        ],
      ],
    },
    cmeEsfregacoSangue:
      'Euthyroid Sick Syndrome (Doença Não Tireoidiana): a supressão fisiológica da tireoide por outras doenças ou uso de fármacos (glicocorticoides, fenobarbital, sulfas) reduz o T4 Total sem que haja hipotireoidismo real. Sempre estabilize outras afecções ou descontinue esses medicamentos por pelo menos 4 a 6 semanas antes de testar a tireoide.',
    cmeSorologiaInterpretacao:
      'Anticorpos Antitiroglobulina (TgAA): marcador imunológico de tireoidite ativa. Presente em ~50% dos cães com hipotireoidismo espontâneo primário. Sua presença confirma tireoidite linfocítica ativa mesmo antes do T4 cair, sendo útil para triar cães jovens de raças predispostas.',
  },
  treatment: {
    ordemDePrioridade: [
      '1) Confirmar o diagnóstico definitivo com fT4 por diálise e cTSH (e afastar Euthyroid Sick) antes de iniciar terapia vitalícia.',
      '2) Iniciar reposição com Levotiroxina sódica sintética por via oral.',
      '3) Orientar o tutor sobre o cronograma de melhora clínica (energia em 1-2 semanas; dermatológico em 3-4 meses).',
      '4) Dosar T4 Total pós-pílula após 4 a 8 semanas para monitoramento de pico e ajuste de dose.',
      '5) Ajustar posologia conforme resultados laboratoriais e resposta clínica observada no cão.',
      '6) Manter reavaliações clínicas e laboratoriais semestrais periódicas vitais.',
    ],
    monitoramento: [
      'T4 Total pós-pílula 4 a 6 horas pós-dose (após 4–8 semanas de tratamento): meta de pico terapêutico deve situar-se no terço superior do intervalo de referência ou ligeiramente acima (ex: 3,5 a 5,0 µg/dL).',
      'cTSH sérico pós-pílula: deve retornar à faixa de referência normal como sinal de supressão adequada do eixo hipofisário.',
      'Sinais de superdosagem (Tireotoxicose): polidipsia, poliúria, polifagia, hiperatividade extrema, taquicardia sinusal e perda de peso rápida. Exige redução imediata da dose de levotiroxina.',
      'Repilação e Peso: acompanhar a perda de peso gradual e o crescimento de novos pelos. O cão deve retornar ao peso e atividade normais.',
    ],
    cmeDoxiciclinaPrimeiraLinha:
      'Terapia de Reposição Hormonal: Levotiroxina sódica (sintética de T4) é o fármaco de eleição vitalício. Dose inicial recomendada: 0,02 mg/kg via oral a cada 12 horas (BID) ou 0,1 mg a 0,2 mg por 10 kg de peso vivo BID. Administrar preferencialmente 1 hora antes da alimentação para garantir estabilidade e pico de absorção gastrointestinal. Em cães estáveis a longo prazo, alguns clínicos convertem com sucesso para administração SID (uma vez ao dia) com doses equivalentes totais maiores, monitorando rigorosamente pós-pílula.',
    cmeTabelaAntimicrobianos: {
      kind: 'clinicalTable' as const,
      headers: ['Fármaco / Medida', 'Dose / Posologia de manutenção', 'Papel e notas clínicas essenciais'],
      rows: [
        [
          'Levotiroxina sódica (T4 sintético)',
          '0,02 mg/kg VO q12h (BID) inicialmente.',
          'Primeira linha vitalícia. Pico de absorção ocorre em ~4-6 horas. Checar T4 pós-pílula após 4-8 semanas.',
        ],
        [
          'Desmame de Levotiroxina prévia',
          'Descontinuar terapia prévia por pelo menos 4 a 6 semanas antes de novos testes diagnósticos.',
          'Obrigatório para reavaliar cães falsamente rotulados. Permite que o eixo tireoidiano próprio retorne ao baseline real.',
        ],
        [
          'Tratamento de Piodermites',
          'Uso racional de xampus antissépticos (clorexidina) e antimicrobianos sob cultura.',
          'Adjuvante comum. As piodermites recorrentes secundárias ao hipotireoidismo só curam definitivamente quando a tireoide for estabilizada.',
        ],
      ],
    },
    cmeSuporteTransfusaoFluidos:
      'Aderência e erro terapêutico: a causa mais comum de "falha terapêutica" no hipotireoidismo é a administração irregular do medicamento, doses dadas junto com refeições gordurosas (que reduzem drasticamente a biodisponibilidade da levotiroxina) ou diagnóstico inicial incorreto de Euthyroid Sick.',
    cmeMedulaDeprimida:
      'Conversão hormonal deficitária: se o cão não responder adequadamente à levotiroxina e os níveis de T4 pós-pílula estiverem na faixa ideal, avaliar a rara falha de conversão periférica de T4 em T3 ativo, considerando o uso temporário de Liotironina (T3 sintético) sob extrema cautela especializada.',
  },
  prevention:
    'Por se tratar de um distúrbio crônico primário de caráter autoimune imunomediado ou atrófico idiopático espontâneo, não existem métodos preventivos eficazes ou vacinas contra o hipotireoidismo canino. O diagnóstico e manejo precoces evitam complicações metabólicas e melhoram imensamente a qualidade de vida do cão.',
  relatedConsensusSlugs: [],
  relatedMedicationSlugs: ['prednisolona'],
  references: [
    {
      id: 'ref-acvim-thyroid-2002',
      citationText:
        'Ferguson DC et al. Consensus Statement on Canine Hypothyroidism (ACVIM). Journal of Veterinary Internal Medicine, 2002.',
      sourceType: 'Consenso ACVIM',
      url: null,
      notes: 'Diretriz central sobre testes hormonais, euthyroid sick e reposição terapêutica.',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-nelson-couto-hypo-2020',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed., 2020. Cap. 48 — Disorders of the Thyroid Gland.',
      sourceType: 'Livro-texto',
      url: null,
      notes: 'Fisiopatologia do mixedema, alopecia endócrina, TgAA, fT4 por diálise e monitoramento pós-pílula.',
      evidenceLevel: 'Consenso clínico',
    },
    {
      id: 'ref-plumb-levothyroxine-2023',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook, 10th ed., 2023 — Levothyroxine Sodium.',
      sourceType: 'Formulário',
      url: null,
      notes: 'Posologia de reposição, interações e monitoração do pico pós-pílula.',
      evidenceLevel: 'A — referência prática',
    },
  ],
  isPublished: true,
  source: 'seed',
};
