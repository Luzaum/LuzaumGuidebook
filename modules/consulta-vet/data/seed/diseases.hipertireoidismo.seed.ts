import { DiseaseRecord } from '../../types/disease';

/** Hipertireoidismo Felino; texto editorial integrando AAFP 2016, MSD e Nelson & Couto. */
export const hipertireoidismoFelinoRecord: DiseaseRecord = {
  id: 'disease-hipertireoidismo-felino',
  slug: 'hipertireoidismo-felino',
  title: 'Hipertireoidismo Felino',
  synonyms: [
    'Hipertireoidismo',
    'Adenoma tireóideo felino',
    'Feline hyperthyroidism',
    'Bócio felino',
    'Tireotoxicose',
  ],
  species: ['cat'],
  category: 'endocrinologia',
  tags: [
    'Tireóide',
    'T4 Total',
    'Metimazol',
    'Bócio',
    'I-131',
    'Perda de peso',
    'Polifagia',
    'Taquicardia',
  ],
  quickSummary:
    'O hipertireoidismo felino é a endocrinopatia mais comum em gatos idosos, caracterizada pela produção excessiva e autônoma dos hormônios tireoidianos tiroxina (T4) e triiodotironina (T3). Em mais de 98% dos casos, decorre de hiperplasia adenomatosa multinodular benigna ou adenoma de um ou ambos os lobos tireoidianos; o carcinoma tireoidiano é raro (<2%). O quadro clássico inclui perda de peso progressiva apesar de apetite voraz (polifagia), hiperatividade, poliúria/polidipsia, distúrbios gastrointestinais (vômitos/diarreia por hipermotilidade), taquicardia severa e bócio palpável (thyroid slip). O diagnóstico baseia-se na dosagem de T4 Total elevado, utilizando T4 Livre por diálise em casos limítrofes. O tratamento pode ser controle clínico (metimazol oral/transdérmico), curativo definitivo (Iodo radioativo I-131 ou tireoidectomia bilateral) ou dietético (baixo iodo). Um pilar crítico é a monitorização renal pós-tratamento, pois o restabelecimento do eutireoidismo reduz o fluxo sanguíneo renal e pode desmascarar Doença Renal Crônica (DRC) preexistente.',
  quickDecisionStrip: [
    'Gato com mais de 10 anos apresentando perda de peso marcada, polifagia (fome constante), taquicardia e pelagem opaca/emaranhada: suspeite forte de hipertireoidismo.',
    'A palpação da região ventral do pescoço revelando bócio ("thyroid slip") é um achado clínico altamente sugestivo e rápido.',
    'Total T4 bem elevado em laboratório de referência confirma o diagnóstico; em gatos doentes com T4 normal, dose T4 Livre por diálise para afastar "Euthyroid Sick Syndrome".',
    'Metimazol oral ou transdérmico é excelente para controle clínico, mas o Iodo Radioativo (I-131) é a terapia definitiva de escolha por curar sem necessidade de cirurgia.',
    'Sempre meça creatinina, ureia e pressão arterial antes e após estabilizar a tireoide; o tratamento reduz a TFG e pode expor uma doença renal oculta.',
  ],
  quickSummaryRich: {
    lead:
      'O hipertireoidismo felino acelera o gato: aumenta o metabolismo, a frequência cardíaca e a taxa de filtração glomerular. Esta última alteração é uma armadilha clássica: o rim parece "perfeito" nos exames iniciais porque a tireotoxicose força a filtração renal; ao tratar e normalizar o T4, a creatinina pode subir abruptamente, expondo uma DRC oculta. A chave é o tratamento escalonado e monitoramento constante.',
    leadHighlights: ['acelera o gato', 'taxa de filtração glomerular', 'DRC oculta', 'metimazol', 'I-131'],
    pillars: [
      {
        title: 'Origem benigna',
        body:
          'Mais de 98% refletem hiperplasia adenomatosa benigna bilateral ou unilateral. Carcinomas malignos são raros, mas devem ser considerados se a tireoide estiver muito grande, fixa ou refratária ao tratamento.',
        highlights: ['hiperplasia adenomatosa', 'carcinoma'],
      },
      {
        title: 'Efeito renal duplo',
        body: 'O hipertireoidismo mascara a insuficiência renal. O controle hormonal reduz a perfusão renal. Se a DRC desmascarada for severa, pode ser necessário tolerar um leve estado hipertireóideo para preservar a função renal.',
        highlights: ['mascara', 'função renal'],
      },
      {
        title: 'Terapia de escolha',
        body: 'O Iodo Radioativo (I-131) destrói seletivamente o tecido tireoidiano hiperativo, poupando a tireoide normal e as paratireoides. É curativo em ~95% dos casos.',
        highlights: ['Iodo Radioativo', 'I-131', 'curativo'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico (pesquisa → categorização AAFP)',
      steps: [
        {
          label: '1. Reconhecimento clínico e palpação',
          detail:
            'Identificar perda de peso, polifagia, bócio palpável na linha do pescoço (thyroid slip), sopro cardíaco, taquicardia e hiperatividade em felinos geriatras.',
        },
        {
          label: '2. Triagem com T4 Total sérico',
          detail:
            'Dosar T4 Total. Se significativamente elevado (> 4.5 µg/dL ou acima da referência local), em gato com sinais clínicos compatíveis, o diagnóstico é selado.',
        },
        {
          label: '3. Abordagem em casos limítrofes / Euthyroid Sick',
          detail:
            'Se T4 Total vier normal-alto ou normal em gato muito suspeito: avaliar comorbidades não tireoidianas. Repetir dosagem em 2-4 semanas ou dosar T4 Livre por diálise + T4 Total juntos.',
        },
        {
          label: '4. Pacote renal e pressórico obrigatório',
          detail:
            'Dosar creatinina, ureia, urinálise (densidade) e aferir Pressão Arterial Sistólica. Identificar estádio renal inicial para servir de baseline pós-tratamento.',
        },
        {
          label: '5. Diagnósticos diferenciais e imagem',
          detail:
            'Excluir diabetes mellitus, linfoma gastrointestinal crônico, doença inflamatória intestinal e insuficiência pancreática exócrina (IPE). Ecocardiograma se cardiomiopatia suspeita.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo terapêutico (estabilização e escolha de conduta)',
      steps: [
        {
          label: 'Passo 1: Decisão da abordagem e comorbidades',
          detail:
            'Avaliar se o paciente é elegível para terapia definitiva (I-131, cirurgia) ou se necessita de estabilização prévia/longo prazo com Metimazol.',
        },
        {
          label: 'Passo 2: Controle clínico com Metimazol',
          detail:
            'Iniciar Metimazol (1,25–2,5 mg por gato VO a cada 12 horas, ou em gel transdérmico na orelha). Avaliar tolerabilidade gastrointestinal e hematológica.',
        },
        {
          label: 'Passo 3: Acompanhamento de transição e rim',
          detail:
            'Repetir hemograma, T4 Total, bioquímica renal e pressão arterial a cada 2–3 semanas no início da terapia. Monitorar a elevação da creatinina.',
        },
        {
          label: 'Passo 4: Terapia definitiva (I-131)',
          detail:
            'Se estável e sem DRC descompensada grave pós-metimazol: encaminhar para Iodo Radioativo (I-131). Paciente fica em isolamento por ~7-14 dias conforme normas de radioproteção.',
        },
        {
          label: 'Passo 5: Manejo Dietético Alternativo',
          detail:
            'Se tratamento médico ou radioterapia forem inviáveis: uso exclusivo e estrito de ração restrita em iodo (Hill\'s y/d). O gato não pode comer absolutamente mais nada.',
        },
      ],
    },
  },
  etiology: {
    visaoGeral:
      'Mais de 98% dos gatos hipertireóideos sofrem de hiperplasia adenomatosa multinodular adenomatosa benigna de caráter bilateral (70% dos casos) ou unilateral (30%). Carcinoma de tireoide é raro (<2%). A causa exata do bócio adenomatoso benigno é multifatorial, associada a bociógenos na dieta/ambiente, excesso ou flutuações de iodo nas rações comerciais e mutações somáticas no receptor de TSH.',
    fatores: [
      'Hiperplasia adenomatosa benigna da tireoide: lesão central na grande maioria dos felinos idosos.',
      'Dieta e bociógenos: associação hipotética com substâncias químicas em enlatados (como o bisfenol A nos revestimentos de latas) e retardadores de chama (PBDEs) em poeira doméstica.',
      'Deficiência ou excesso crônico de iodo: variações nas rações secas ao longo dos anos predispõem à autonomia celular.',
      'Carcinoma tireoidiano: malignidade invasiva caracterizada por nódulos tireoidianos fixos, volumosos e metástases locais.',
    ],
  },
  epidemiology: {
    especiePrincipal:
      'Gato — afeta predominantemente felinos idosos (mediana de 13 anos; menos de 5% ocorrem em gatos com menos de 10 anos). Nenhuma predileção por sexo é descrita.',
    notaFelinos:
      'Gatos de raça pura como Siamês, Himalaio e Persa parecem apresentar uma menor incidência relativa da doença em comparação com gatos domésticos comuns sem raça definida (mestiços).',
    contextoGeografico:
      'Descrita globalmente como a endocrinopatia mais frequente na geriatria de felinos em áreas urbanas, correlacionada ao aumento da sobrevida dos gatos de companhia e ao uso de dietas comerciais formuladas.',
  },
  pathogenesisTransmission: {
    patogenese: [
      'As células tireoidianas hiperplásicas produzem e secretam T3 e T4 de forma autônoma, sem responder à regulação por feedback negativo do eixo HPT (hipotálamo–hipófise–tireoide). O TSH endógeno permanece suprimido.',
      'O excesso de hormônios tireoidianos circulantes aumenta a taxa metabólica basal de todos os tecidos corporais, levando ao catabolismo acelerado de proteínas e lipídios (perda de peso acentuada e perda de massa muscular, apesar de ingestão calórica exuberante).',
      'Efeito cardiovascular: estimulação direta dos receptores adrenérgicos beta no miocárdio e aumento da sensibilidade a catecolaminas. Provoca taquicardia sinusal crônica severa, aumento do débito cardíaco, hipertrofia miocárdica concêntrica (cardiomiopatia tireotóxica) e hipertensão arterial sistêmica.',
      'Efeito renal: aumento importante do fluxo sanguíneo renal e da taxa de filtração glomerular, reduzindo artificialmente os níveis plasmáticos de ureia e creatinina (mascarando a nefropatia em curso).',
    ],
    hiperFiguraFollicularCell: {
      kind: 'clinicalFigure' as const,
      src: '/consulta-vet/clinical-guides/hyperthyroidism-follicular-cell.png',
      alt: 'Síntese e liberação de T3 e T4 na célula folicular',
      caption:
        'Fisiologia da célula folicular ilustrando as principais etapas de síntese e liberação de T3 e T4: (1) captura do iodeto; (2) oxidação do iodeto; (3) exocitose da tireoglobulina; (4) iodação da tireoglobulina; (5) junção das iodotirosinas; (6) endocitose da tireoglobulina; (7) hidrólise da tireoglobulina; (8) liberação de T3 e T4; (9) desiodação de MIT e DIT; (10) reciclagem do iodeto (Melchioretto, 2022).',
    },
    transmissao:
      'Doença não infecciosa e não contagiosa; reflete puramente hiperplasia celular benigna autônoma de caráter multifatorial epigenético.',
  },
  pathophysiology:
    'Os hormônios tireoidianos (T3/T4) regulam a atividade metabólica celular. O excesso de hormônios provoca um estado hipermetabólico contínuo: aumento da produção de calor (intolerância ao calor, busca por locais frios), hipermotilidade gastrointestinal (má absorção, diarreia, vômito), excitabilidade do sistema nervoso central (hiperatividade, miados noturnos) e aumento do tônus simpático cardíaco (taquicardia, sopro, risco de insuficiência cardíaca de alto débito).',
  clinicalSignsPathophysiology: [
    {
      system: 'general',
      findings: [
        'Perda de peso progressiva e emagrecimento crônico, contrastando com polifagia severa (gato sempre faminto).',
        'Pelagem opaca, sem brilho, emaranhada e descuidada (por falta de autolimpeza decorrente de hiperatividade ou fraqueza muscular tardia).',
        'Intolerância ao calor, ofegação crônica leve (panting) e busca por pisos frios.',
      ],
    },
    {
      system: 'cardiovascular',
      findings: [
        'Tachycardia persistente (> 220–240 bpm) em repouso na consulta.',
        'Presença de sopros cardíacos sistólicos focais ou ritmo de galope decorrentes da circulação hiperdinâmica.',
        'Hipertensão arterial sistólica decorrente do aumento do débito cardíaco e resistência periférica alterada.',
      ],
    },
    {
      system: 'gastrointestinal',
      findings: [
        'Vômitos e diarreias intermitentes (devido ao trânsito intestinal acelerado, hipermotilidade e má absorção).',
        'Polidipsia e poliúria associadas ao aumento da perfusão renal e perda de capacidade de concentração por lavagem medular osmótica.',
      ],
    },
    {
      system: 'behavioral',
      findings: [
        'Hiperatividade, inquietação constante, nervosismo e agressividade atípica.',
        'Miados noturnos persistentes e vocalização excessiva (associada a alterações neurológicas do hipertireoidismo).',
      ],
    },
  ],
  diagnosis: {
    cmeSuspeitaClinica:
      'Gato idoso com emagrecimento rápido + apetite voraz + taquicardia = hipertireoidismo clássico. A palpação cuidadosa da tireoide (técnica de thyroid slip deslizando o polegar e indicador ao longo da traqueia cervical lateral) revela um ou dois lobos aumentados móveis (bócio) em ~85-90% dos gatos acometidos.',
    hiperFiguraPalpacaoTireoide: {
      kind: 'clinicalFigure' as const,
      src: '/consulta-vet/clinical-guides/hyperthyroidism-palpation.png',
      alt: 'Palpação da tireoide em felino',
      caption:
        'Tireoide palpável no exame físico de um felino: técnica de palpação cervical revelando bócio felino (Santos, 2021).',
    },
    cmeTecnicaNorsworthy:
      'Técnica Norsworthy onde o examinador se locomove para atrás do paciente, posicionando a cabeça do gato para cima e girando-a 45º para a direita ou esquerda, afastando-se do lado a ser testado (para palpar o lobo direito da tireoide, vire a cabeça do gato para a esquerda). A ponta do dedo indicador ou médio do examinador deve ser posicionada no sulco formado entre a traqueia e o músculo esternotireóideo, logo abaixo da laringe, e então deve-se descer pelo sulco até a entrada torácica. Se o lobo da tireoide estiver aumentado, é possível sentir um "piscar" (thyroid slip) característico quando é passado o dedo sobre o pescoço (Miller; Randolph; Peterson, 2019).',
    hiperFiguraNorsworthy: {
      kind: 'clinicalFigure' as const,
      src: '/consulta-vet/clinical-guides/hyperthyroidism-norsworthy.png',
      alt: 'Demonstração da técnica de Norsworthy',
      caption:
        'Demonstração prática da técnica de Norsworthy para palpação da tireoide felina, mostrando o posicionamento das mãos e da cabeça do felino (Miller; Randolph; Peterson, 2019).',
    },
    aafpCategoriasTabela: {
      kind: 'clinicalTable' as const,
      headers: ['Categoria AAFP', 'Definição clínica e laboratorial', 'Conduta recomendada'],
      rows: [
        [
          '1. Hipertireoidismo Clássico',
          'Sinais clínicos típicos + bócio palpável + T4 Total claramente elevado sérico.',
          'Confirmado. Iniciar tratamento de escolha (médico, I-131, cirúrgico ou dietético).',
        ],
        [
          '2. Hipertireoidismo Mascarado',
          'Sinais clínicos + bócio palpável, mas T4 Total normal por "Euthyroid Sick Syndrome" (doença não tireoidiana concomitante).',
          'Dosar T4 Livre por diálise. Se T4 Livre estiver elevado e comorbidade identificada, tratar a comorbidade e reavaliar T4.',
        ],
        [
          '3. Subclínico / Precoce',
          'Sinais clínicos sutis ou ausentes + bócio palpável + T4 Total normal-alto ou flutuante.',
          'Não tratar imediatamente. Repetir exames em 1 a 3 meses para acompanhar a curva hormonal.',
        ],
        [
          '4. Tumor / Bócio não funcional',
          'Nódulo tireoidiano palpável (bócio), mas sem qualquer sinal clínico ou laboratorial de excesso hormonal (T4 normal).',
          'Acompanhar clinicamente. Risco baixo de malignidade se estável; monitorar tamanho do nódulo.',
        ],
      ],
    },
    cmeEsfregacoSangue:
      'Urinálise e Hemograma: o hemograma pode mostrar eritrocitose leve ou policitemia (estímulo hormonal direto da eritropoiese) e leucograma de estresse. Urinálise com densidade flutuante e proteinúria discreta.',
    cmeSorologiaInterpretacao:
      'Dosagem de T4 Total (IFA ou Quimioluminescência): teste de triagem inicial preferencial. Altamente sensível. Se elevado no gato sintomático, fecha o diagnóstico. Lembrar que doenças não tireoidianas severas (DRC, EII, linfoma) podem suprimir o T4 Total de um gato hipertireóideo de volta à faixa de referência normal-alta.',
    cmePcrSangueMedula:
      'Dosagem de T4 Livre por Diálise (fT4ED): alta sensibilidade. Indicado apenas quando o T4 Total estiver normal-alto, mas o quadro clínico for extremamente suspeito. Nunca usar fT4ED como triagem isolada, pois gatos velhos saudáveis podem apresentar falsos-positivos na diálise.',
    hiperFiguraScintigraphy: {
      kind: 'clinicalFigure' as const,
      src: '/consulta-vet/clinical-guides/hyperthyroidism-scintigraphy.png',
      alt: 'Padrões de cintilografia tireoidiana no hipertireoidismo felino',
      caption:
        'Cintilografia tireoidiana ilustrando os padrões do hipertireoidismo em felinos: (A) Hipertireoidismo unilateral; (B) Hipertireoidismo bilateral assimétrico; (C) Três nódulos (doença bilateral com terceiro nódulo ectópico da linha média no tórax); (D-E-F) Doença multifocal (Peterson; Broome, 2015).',
    },
    hiperFiguraScintigraphyEctopic: {
      kind: 'clinicalFigure' as const,
      src: '/consulta-vet/clinical-guides/hyperthyroidism-ectopic.png',
      alt: 'Cintilografia de hiperplasia tireoidiana vs tecido ectópico',
      caption:
        'Imagens de exame cintilográfico dos lobos tireoidianos em felinos, consistentes com hiperplasia tireoidiana bilateral simétrica (A) e tecido tireoidiano ectópico (B) (Abend, 2023).',
    },
  },
  treatment: {
    ordemDePrioridade: [
      '1) Confirmar a estabilidade renal e cardíaca inicial do gato.',
      '2) Iniciar tratamento médico reversível com Metimazol para avaliar o comportamento da função renal sob estado eutireóideo.',
      '3) Tratar taquicardia severa e arritmias concomitantes com betabloqueadores (atenolol) quando indicado clinicamente.',
      '4) Monitorar bioquímicos (creatinina, ureia, K⁺) e hemograma a cada 2–3 semanas no início da administração de metimazol.',
      '5) Se o rim tolerar a normalização do T4 (creatinina estável ou levemente azotêmica controlável), planejar terapia definitiva com I-131 ou cirurgia.',
      '6) Se houver DRC grave descompensada (creatinina disparando > 3.0–3.5 mg/dL), reduzir a dose de metimazol para permitir um leve hipertiroidismo subclínico em favor da perfusão renal.',
    ],
    monitoramento: [
      'T4 Total aos 14, 30 e 90 dias: verificar a adequação da dose de metimazol. Meta: manter T4 no terço inferior do intervalo de referência (ex: 1,0 a 2,5 µg/dL).',
      'Bioquímica Renal (Creatinina e Ureia): monitorar rigorosamente o desmascaramento da DRC. A azotemia pós-eutireoidismo afeta ~20-30% dos gatos.',
      'Hemograma Completo: metimazol pode induzir discrasias sanguíneas (neutropenia grave, trombocitopenia, anemia hemolítica). Suspender se houver citopenias sérias.',
      'Enzimas Hepáticas (ALT/ALP): monitorar hepatotoxicidade medicamentosa induzida por metimazol.',
    ],
    cmeDoxiciclinaPrimeiraLinha:
      'Terapia Clínica com Metimazol (Tapazole): dose inicial recomendada de 1,25 mg a 2,5 mg por gato via oral a cada 12 horas (BID), ou 2,5 mg uma vez ao dia (SID). A administração BID é mais eficaz em reduzir o T4 rapidamente e apresenta menor incidência de reações adversas sistêmicas. Em gatos difíceis de medicar, usar gel transdérmico de Metimazol na face interna da orelha (mesmas doses; absorção ligeiramente mais lenta, exige tosa local suave).',
    cmeTabelaAntimicrobianos: {
      kind: 'clinicalTable' as const,
      headers: ['Abordagem Terapêutica', 'Protocolo / Posologia comum', 'Vantagens, Limitações e Alertas'],
      rows: [
        [
          'Metimazol (Oral)',
          '1,25–2,5 mg/gato VO q12h (BID). Iniciar com dose baixa e titular.',
          'Barato, reversível, fácil ajuste. Efeitos adversos: vômitos, prurido facial intenso, hepatotoxicidade, neutropenia.',
        ],
        [
          'Metimazol (Transdérmico Pluronic Lecithin Organogel)',
          '2,5 mg/gato transdérmico na pinna interna da orelha q12h.',
          'Excelente para gatos ariscos; menor incidência de vômitos. Pode demorar mais semanas para atingir euthyroid.',
        ],
        [
          'Iodo Radioativo (I-131)',
          'Dose calculada de iodo ativo injetável SC em ambiente especializado autorizado.',
          'Definitivo, padrão ouro. Sem anestesia. Destrói metástases ectópicas. Exige isolamento hospitalar e custo inicial alto.',
        ],
        [
          'Tireoidectomia Cirúrgica',
          'Remoção cirúrgica bilateral ou unilateral sob anestesia.',
          'Definitiva. Risco de lesão das paratireoides (hipocalemia / hipocalcemia severa tetânica pós-operatória).',
        ],
        [
          'Atenolol (Betabloqueador)',
          '6,25–12,5 mg por gato VO a cada 12 ou 24 horas.',
          'Terapia de suporte para cardiopatia tireotóxica, hipertensão e taquicardia extrema (>240 bpm) até estabilização com metimazol.',
        ],
        [
          'Dieta de Restrição de Iodo (Hill\'s y/d)',
          'Uso exclusivo e contínuo de alimento seco/úmido com <0.2 ppm de iodo.',
          'Eficaz se estrita. Inviável se o gato tiver acesso à rua ou comer petiscos. Não impede a progressão física do bócio.',
        ],
      ],
    },
    cmeSuporteTransfusaoFluidos:
      'Prevenção de Hipocalcemia Pós-Cirúrgica: após tireoidectomia bilateral, monitorar o cálcio ionizado sérico diariamente por ~7 dias. Se houver tetania, tremores ou hipocalcemia acentuada, iniciar Gluconato de Cálcio IV seguido de Carbonato de Cálcio oral e Vitamina D (Calcitriol) de manutenção.',
    cmeMedulaDeprimida:
      'Efeitos Colaterais Graves do Metimazol: prurido facial com escoriações por automutilação e necrose cutânea exigem suspensão permanente do fármaco. Hepatotoxicidade severa (icterícia, ALT elevada) e discrasias sanguíneas graves também inviabilizam o uso continuado.',
  },
  prevention:
    'Não há vacina ou prevenção específica para a hiperplasia adenomatosa espontânea. Recomenda-se realizar palpação cervical minuciosa da tireoide em todos os gatos com mais de 8 anos em consultas de rotina. Evitar a exposição crônica a bociogênicos domésticos conhecidos e manter dietas de alta qualidade nutricional balanceada.',
  relatedConsensusSlugs: [],
  relatedMedicationSlugs: ['benazepril'],
  references: [
    {
      id: 'ref-aafp-hyperthyroidism-2016',
      citationText:
        'Carney HC et al. 2016 AAFP Guidelines for the Management of Feline Hyperthyroidism. Journal of Feline Medicine and Surgery, 2016.',
      sourceType: 'Diretriz AAFP',
      url: 'https://doi.org/10.1177/1098612X15627226',
      notes: 'Diretriz central sobre as 6 categorias de pacientes, tratamentos e manejo renal.',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-nelson-couto-thyroid-2020',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed., 2020. Cap. 48 — Disorders of the Thyroid Gland.',
      sourceType: 'Livro-texto',
      url: null,
      notes: 'Fisiopatologia, bócio, bociogênicos, metimazol transdérmico, cardiomiopatia tireotóxica.',
      evidenceLevel: 'Consenso clínico',
    },
    {
      id: 'ref-plumb-methimazole-2023',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook, 10th ed., 2023 — Methimazole.',
      sourceType: 'Formulário',
      url: null,
      notes: 'Posologia oral/transdérmica e monitoração hepática/hematológica.',
      evidenceLevel: 'A — referência prática',
    },
  ],
  isPublished: true,
  source: 'seed',
};
