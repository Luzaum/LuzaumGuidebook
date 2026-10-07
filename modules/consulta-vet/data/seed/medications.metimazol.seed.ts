import { MedicationRecord } from '../../types/medication';

export const metimazolMedicationRecord: MedicationRecord = {
  id: 'med-metimazol',
  slug: 'metimazol',
  title: 'Metimazol',
  activeIngredient: 'Metimazol / Tiamazol (3-metil-1H-imidazol-2-tiona; C₄H₆N₂S)',
  isControlled: false,
  tradeNames: [
    'Felimazole® 2,5 mg Comprimidos Revestidos (Dechra — Produto Veterinário Registrado no MAPA)',
    'Felimazole® 5 mg Comprimidos Revestidos (Dechra — Produto Veterinário Registrado no MAPA)',
    'Tapazol® 5 mg e 10 mg Comprimidos (Biolab Sanus / Aspen — Referência Linha Humana no Brasil)',
    'Metimazol Gel Lipofílico Transdérmico 25 mg/mL e 50 mg/mL (Farmácias Magistrais Veterinárias)',
    'Metimazol Suspensão Oral e Cápsulas Magistrais 1,25 mg e 2,5 mg (Manipulação Veterinária)',
    'Thiamazole / Methimazole Genérico Comprimidos (Linha Humana e Veterinária Internacional)',
  ],
  officialSiteUrl: 'https://www.dechra.com.br/produtos/felimazole',
  leafletUrl: 'https://vetsmart.com.br/cg/produto/6826/felimazole',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/methimazole/PNG',
  priceReference: {
    amountBrl: 366.61,
    label:
      'Felimazole® 2,5 mg Frasco c/ 100 comp (Dechra): R$ 366,61 a R$ 407,34 | Felimazole® 5 mg Frasco c/ 100 comp: R$ 580,00 a R$ 680,00 | Tapazol® 5 mg Linha Humana cx c/ 100 comp: R$ 50,00 a R$ 75,00 | Metimazol Gel Lipofílico Transdérmico 25 mg/mL (30 mL): R$ 85,00 a R$ 140,00 | Cápsulas Manipuladas 1,25 mg (frasco c/ 60): R$ 65,00 a R$ 95,00',
    presentation: 'Felimazole® 2,5 mg comprimidos revestidos frasco com 100 comprimidos (Dechra Brasil)',
    sourceName: 'Minha Dechra / Varejo Veterinário Especializado / MAPA',
    sourceUrl: 'https://www.minhadechra.com.br/felimazole-tratamento-hipertireoidismo-felino/p',
    checkedAt: '2026-10-06',
    notes:
      'Medicamento veterinário devidamente registrado no MAPA (Felimazole 2,5 mg: PR 000007-8.000011; Felimazole 5 mg: PR 000007-8.000012). Venda sob prescrição veterinária simples (sem controle especial pela Portaria 344/98).',
  },
  pharmacologicClass:
    'Tionamida / derivado imidazólico antitireoidiano (inibidor reversível da tireoperoxidase - TPO); supressor da síntese hormonal tireoidiana de T4 e T3',
  species: ['cat', 'dog'],
  category: 'endocrinologia',
  tags: [
    'Metimazol',
    'Tiamazol',
    'Methimazole',
    'Thiamazole',
    'Felimazole',
    'Tapazol',
    'Hipertireoidismo Felino',
    'Tireotoxicose',
    'AAHA 2023',
    'AAFP Guidelines',
    'TPO Tireoperoxidase',
    'Trial Renal',
    'DRC Felina',
    'Hipotireoidismo Iatrogênico',
    'Gel Transdérmico',
    'Carcinoma Tireoidiano Canino',
    'Receituário Simples',
  ],

  indications: [
    'Tratamento médico crônico do hipertireoidismo primário felino espontâneo decorrente de hiperplasia adenomatosa ou adenoma tireoidiano funcional.',
    'Estabilização clínica e metabólica do felino hipertireoideo previamente à tireoidectomia cirúrgica unilateral ou bilateral.',
    'Teste terapêutico reversível ("trial" médico) em gatos com suspeita de Doença Renal Crônica (DRC) oculta para avaliar o impacto da queda da taxa de filtração glomerular antes do tratamento ablativo definitivo com Iodo Radioativo (¹³¹I) ou cirurgia.',
    'Tratamento médico conservador com titulação lenta em gatos hipertireoideos frágeis, idosos, com perda de massa muscular acentuada ou azotemia prévia (estágios IRIS 2 a 3; Diretrizes AAHA 2023 e AAFP).',
    'Alternativa terapêutica por via transdérmica (gel lipofílico na face interna da orelha) em felinos com intolerância gastrintestinal persistente (vômitos e anorexia induzidos pela via oral) ou de difícil administração oral.',
    'Ponte terapêutica e controle adjuvante da tireotoxicose em cães com carcinoma tireoidiano funcional ou neoplasia secretora avançada enquanto se programa cirurgia ou radioterapia metabólica.',
  ],

  relatedDiseaseSlugs: [
    'hipertireoidismo-felino',
    'doenca-renal-cronica-felina',
    'cardiomiopatia-hipertrofica-felina',
    'hipertensao-arterial-sistemica-felina',
  ],

  attentionSubtitle:
    'Tionamida antitireoidiana: inibidor reversível da tireoperoxidase (TPO); bloqueia oxidação do iodeto, organificação e acoplamento sem bloquear o transportador NIS nem hormônios já estocados. Alertas Vitais ConsultaVET: 1) CONTROLA A TIREOTOXICOSE MAS NÃO CURA A DOENÇA: o tecido adenomatoso persiste e progride estruturalmente ao longo dos anos (Peterson et al. 2016); ¹³¹I continua sendo o tratamento de escolha definitivo; 2) NÃO SUBTRATAR HIPERTIREOIDISMO PARA "PROTEGER" CREATININA: a elevação de creatinina pós-tratamento reflete em grande parte a correção da hiperfiltração glomerular patológica e desmascaramento da DRC real; manter eutireoidismo (alvo TT4 1,0–2,5 µg/dL); 3) RISCO DE HIPOTIREOIDISMO IATROGÊNICO: TT4 muito baixa combinada a TSH elevado agrava a hipoperfusão renal, dobra o risco de azotemia e reduz drasticamente a sobrevida média de 905 para 456 dias (Williams et al. 2010); 4) HEMOGRAMA COMPLETO OBRIGATÓRIO PRECOCE: suspender imediatamente e em caráter definitivo se agranulocitose, neutropenia grave, trombocitopenia, anemia hemolítica, hepatopatia ou prurido facial severo com escoriações cervicais. Risco teratogênico ocupacional: gestantes não devem manusear os comprimidos nem o gel transdérmico.',

  plainLanguageSummary:
    'O metimazol (também conhecido internacionalmente como tiamazol e vendido para gatos pelo nome comercial Felimazole®) é o remédio mais prescrito no mundo para o tratamento do hipertireoidismo felino. A doença ocorre quando nódulos na tireoide começam a produzir hormônios tireoidianos (T4 e T3) em excesso descontrolado, acelerando o metabolismo do gato e causando perda de peso, apetite voraz, agitação, pressão alta e sobrecarga no coração.\n\nÉ essencial entender um ponto-chave: o metimazol NÃO cura a doença nem destrói o tumor na tireoide; ele funciona como um "freio de fábrica", bloqueando a enzima (tireoperoxidase) que monta os novos hormônios. O efeito não é imediato no primeiro dia porque a tireoide ainda tem um estoque de hormônios já prontos que continuam caindo no sangue por 1 a 3 semanas. Por isso, a reavaliação com exame de sangue (T4 total) é feita tipicamente entre 2 a 3 semanas após iniciar o remédio.\n\nDois grandes cuidados devem nortear o tratamento: Primeiro, o rim do gato! O hipertireoidismo funciona como uma "turbina" que força o rim a filtrar sangue muito rápido, mascarando uma doença renal oculta. Ao iniciar o metimazol e controlar o hipertireoidismo, a creatinina pode subir porque o rim volta ao fluxo normal — isso não é culpa do remédio, mas sim a revelação do rim real do paciente. O grande perigo é deixar a dose alta demais e jogar o gato no "hipotireoidismo", o que derruba a função renal e piora muito a sobrevida. Segundo, a segurança: se o gato começar a coçar violentamente a face e o pescoço até ferir, ou apresentar febre, fraqueza severa, amarelão (icterícia) ou manchas roxas na pele, o remédio deve ser suspenso imediatamente. Em gatas prenhas ou tutoras grávidas, o contato com o remédio é expressamente proibido devido ao risco de malformações congênitas.',

  pillars: [
    {
      title: 'Inibição Seletiva da Tireoperoxidase (TPO)',
      icon: 'Zap',
      desc: 'Inibe as reações catalisadas pela enzima heme TPO: oxidação do iodeto (I⁻), organificação em resíduos tirosil da tireoglobulina (MIT/DIT) e acoplamento das iodotirosinas (T4 e T3). Não bloqueia o transportador basolateral NIS nem a liberação dos hormônios já armazenados no coloide.',
    },
    {
      title: 'Reversibilidade Farmacológica e Caráter "Trial" Renal',
      icon: 'Activity',
      desc: 'Ao suspender o fármaco, a produção hormonal retorna em 48 a 72 horas. Essa reversibilidade confere ao metimazol um papel de "ensaio terapêutico renal" perfeito: permite reverter a hiperfiltração patológica e verificar a real função renal antes de intervenções definitivas como o radioiodo (¹³¹I).',
    },
    {
      title: 'Controle da Tireotoxicose Sem Cura Estrutural',
      icon: 'ShieldAlert',
      desc: 'O metimazol controla a produção de T4, mas não destrói as células do adenoma e não interrompe a progressão morfológica da tireoide. Peterson et al. (2016) demonstraram que com os anos de terapia médica crônica há aumento do volume tumoral (5,1% para 88,6%) e extensão intratorácica (3,4% para 32,3%). O ¹³¹I continua sendo a terapia de escolha curativa.',
    },
    {
      title: 'Titulação Fina e Prevenção do Hipotireoidismo Iatrogênico',
      icon: 'HeartPulse',
      desc: 'O alvo contemporâneo é TT4 na metade inferior do intervalo de referência (1,0 a 2,5 µg/dL segundo a AAHA 2023). O hipotireoidismo iatrogênico (TT4 subnormal associado a TSH elevado) reduz drasticamente a taxa de filtração glomerular, induz azotemia em 57% dos gatos e encurta a sobrevida média pela metade (Williams et al. 2010). Jamais subtratar hipertireoidismo para mascarar creatinina!',
    },
  ],

  clinicalFoundationsData: [
    {
      id: 'found-metimazol-fisiologia-mecanismo',
      title: 'Fisiopatologia do Hipertireoidismo Felino e Bloqueio da Tireoperoxidase (TPO)',
      narrative:
        'A síntese de tetraiodotironina (tiroxina ou T4) e triiodotironina (T3) nas células foliculares da tireoide depende do transporte basolateral de iodeto através do simporte sódio-iodeto (NIS — sodium/iodide symporter), acoplado ao gradiente mantido pela Na⁺/K⁺-ATPase. O iodeto cruza o citoplasma em direção à membrana apical folicular por transportadores específicos (incluindo pendrina) e alcança a luz folicular repleta de coloide. Na membrana apical, a enzima heme tireoperoxidase (TPO), utilizando peróxido de hidrogênio (H₂O₂) gerado pelo sistema enzimático DUOX, catalisa três etapas essenciais da esteroidogênese tireoidiana: 1) Oxidação do iodeto (I⁻) em espécie iodante reativa eletrofílica; 2) Organificação do iodo em resíduos de tirosina da glicoproteína tireoglobulina, gerando monoiodotirosina (MIT) e diiodotirosina (DIT); 3) Acoplamento oxidativo intramolecular de resíduos iodotirosil (DIT + DIT originando T4; MIT + DIT originando T3). O metimazol (e seu congênere internacional tiamazol) atua como um substrato alternativo competitivo da TPO, desviando as espécies intermediárias oxidantes e inativando o centro catalítico férrico da enzima. É crucial salientar que o metimazol NÃO bloqueia o transportador NIS, não inibe a proteólise da tireoglobulina armazenada no coloide, não acelera a degradação de T4/T3 já circulantes e não inibe a desiodação periférica de T4 para T3 (diferenciando-se do propiltiouracil). Consequentemente, mesmo com a inibição enzimática imediata da nova síntese de hormônios, os estoques coloidais pré-formados continuam sendo liberados na circulação sistêmica, explicando o período de latência clínica ("lag time") de 1 a 3 semanas para a normalização sustentada das concentrações de T4 total.',
      narrativeHighlights: [
        'Inibe TPO apical reversivelmente nas 3 etapas: oxidação, organificação (MIT/DIT) e acoplamento (T4/T3).',
        'Não impede a captação basolateral de iodo pelo NIS e não interfere nos hormônios pré-armazenados no coloide.',
        'Explica o lag time de 1 a 3 semanas para atingir eutireoidismo laboratorial pleno após o início da terapia.',
      ],
      studies: [
        {
          citation:
            'Trepanier LA, Hoffman SB, Kroll M, Rodan I, Challoner L. Efficacy and safety of once versus twice daily administration of methimazole in cats with hyperthyroidism. JAVMA 2003; 222(7):954–958.',
          referenceId: 'ref-trepanier-2003',
          sourceType: 'Ensaio clínico prospectivo randomizado',
          summaryText:
            'Ensaio prospectivo randomizado em 40 felinos hipertireoideos comparando metimazol 2,5 mg VO q12h (BID) versus 5 mg VO q24h (SID). Após 2 semanas de terapia, o grupo BID alcançou eutireoidismo em 87% dos pacientes (T4 médio de 2,0 µg/dL), comparado a apenas 54% no grupo SID (T4 médio de 3,7 µg/dL). A meia-vida plasmática felina do metimazol (~3 a 6 h) e a cinética de esgotamento hormonal intratireoidiano confirmam que o fracionamento em duas tomadas diárias garante uma supressão enzimática mais homogênea e previsível.',
          clinicalConclusion:
            'A administração oral fracionada a cada 12 horas (q12h) é farmacologicamente e clinicamente superior à dose única diária (q24h) para a indução do eutireoidismo na rotina clínica.',
        },
      ],
    },
    {
      id: 'found-metimazol-rim-drc-hipotireoidismo',
      title: 'Interação Nefroendócrina: Desmascaramento da DRC versus Risco Letal do Hipotireoidismo Iatrogênico',
      narrative:
        'A relação entre tireoide e função renal em felinos idosos é um dos temas mais críticos da medicina interna felina. O estado tireotóxico induz hiperfiltração glomerular patológica mediante aumento do débito cardíaco, redução da resistência vascular periférica e hipertensão intraglomerular, o que mantém a taxa de filtração glomerular (TFG/GFR) artificialmente superestimada. Paralelamente, o hipercatabolismo muscular induz sarcopenia acentuada, diminuindo a produção endógena de creatinina. Dessa forma, antes do início do metimazol, a creatinina sérica apresenta-se artificialmente normal ou falsamente baixa. Com a supressão do excesso de T4 e a restauração do eutireoidismo, a perfusão renal normaliza-se, a hiperfiltração cessa e a massa muscular gradativamente se regenera, desmascarando a Doença Renal Crônica (DRC) estrutural pré-existente (tipicamente estágios IRIS 1, 2 ou 3) em aproximadamente 15% a 40% dos gatos. Esse fenômeno fisiológico NÃO representa nefrotoxicidade intrínseca do fármaco. Conforme preconizado pelas Diretrizes AAFP e Consensos da AAHA, subtratar o hipertireoidismo com o objetivo equivocado de "proteger" ou "poupar" a creatinina é uma conduta proscrita que perpetua a cardiotoxicidade, desnutrição e hipertensão sistêmica. O verdadeiro fator de risco iatrogênico associado à piora do prognóstico renal e sobrevida reside no desenvolvimento de HIPOTIREOIDISMO IATROGÊNICO (induzido por superdosagem de metimazol). A deficiência de hormônios tireoidianos colapsa o metabolismo basal, induz bradicardia, deprime o fluxo plasmático renal e derruba criticamente a GFR, deflagrando azotemia franca e reduzindo a sobrevida média pela metade.',
      narrativeHighlights: [
        'Elevação de creatinina pós-tratamento reflete cessação da hiperfiltração patológica e ganho muscular, não nefrotoxicidade da molécula.',
        'Jamais subtratar hipertireoidismo para manter creatinina falsamente baixa.',
        'Hipotireoidismo iatrogênico é o verdadeiro gatilho de colapso da GFR renal e redução drástica da sobrevida.',
      ],
      studies: [
        {
          citation:
            'Williams TL, Elliott J, Syme HM. Association of iatrogenic hypothyroidism with azotemia and reduced survival time in cats treated for hyperthyroidism. JVIM 2010; 24(5):1086–1092.',
          referenceId: 'ref-williams-2010',
          sourceType: 'Estudo de coorte prospectivo',
          summaryText:
            'Estudo com 80 gatos hipertireoideos tratados com metimazol ou radioiodo. Azotemia foi significativamente mais prevalente no grupo que desenvolveu hipotireoidismo iatrogênico (57%; 16/28) do que nos gatos que permaneceram eutireoideos (30%; 14/47; p = 0,028). Entre os gatos hipotireoideos azotêmicos, a sobrevida mediana foi drasticamente reduzida para 456 dias, comparada a 905 dias nos gatos não azotêmicos (p = 0,018). Williams et al. (2014) demonstraram posteriormente que a simples redução da dose de metimazol para corrigir o hipotireoidismo iatrogênico promoveu queda imediata e estatisticamente significativa da creatinina sérica de 2,61 para 2,07 mg/dL (p < 0,001).',
          clinicalConclusion:
            'O hipotireoidismo iatrogênico deve ser ativamente evitado e imediatamente corrigido mediante descalonamento da dose de metimazol quando detectado.',
        },
        {
          citation:
            'Aldridge C, Behrend EN, Martin LG, Kemppainen RJ, Ward CR. Evaluation of thyroid-stimulating hormone, total thyroxine, and free thyroxine concentrations in hyperthyroid cats receiving methimazole treatment. JVIM 2015; 29(3):862–868.',
          referenceId: 'ref-aldridge-2015',
          sourceType: 'Estudo transversal prospectivo',
          summaryText:
            'Avaliação de 125 amostras séricas de gatos em uso de metimazol. Concentração sérica de TSH elevada (sugestiva de hipotireoidismo iatrogênico) foi detectada em 33% dos gatos avaliados, e em 68% daqueles com T4 total abaixo do intervalo de referência. Azotemia esteve presente em 39% dos gatos com TSH elevado vs apenas 18% com TSH normal (p < 0,001).',
          clinicalConclusion:
            'A dosagem combinada de T4 total e TSH felino é a ferramenta de eleição para diagnosticar hipotireoidismo iatrogênico e orientar a redução imediata da posologia.',
        },
      ],
    },
    {
      id: 'found-metimazol-evolucao-doenca-transdermico',
      title: 'Progressão Estrutural da Doença sob Terapia Médica e Formulações Transdérmicas Lipofílicas',
      narrative:
        'Embora o metimazol seja o pilar farmacológico mais acessível para estabilização de longo prazo, deve ser claramente esclarecido aos tutores que a terapia médica crônica não interrompe a hiperplasia celular subjacente nem erradica o adenoma tireoidiano. No clássico estudo de coorte em 2.096 felinos de Peterson et al. (2016), demonstrou-se que com o aumento da duração da doença sob controle puramente medicamentoso, a proporção de grandes tumores tireoidianos aumentou de 5,1% para 88,6%, a incidência de tecido tireoidiano ectópico intratorácico subiu de 3,4% para 32,3% e a suspeita histopatológica de carcinoma folicular avançou de 0,4% para 19,3%. Portanto, em gatos jovens e clinicamente estáveis, a terapia radioisotópica definitiva com Iodo Radioativo (¹³¹I) representa o padrão-ouro curativo definitivo (cura em >95% dos casos). No que tange à via de administração, o uso do gel transdérmico aplicado na pina auricular representa uma alternativa de valor inestimável para animais que apresentam intolerância gastrintestinal severa (vômitos e anorexia) ou refratariedade ao estresse da medicação oral. Contudo, o veículo de veiculação é determinante: formulações arcaicas em gel plurônico de lecitina-organogel (PLO) exibem biodisponibilidade errática e absorção limitada (F ~11,4%), enquanto géis lipofílicos modernos garantem biodisponibilidade relativa próxima a 50%, exigindo rotação regular do pavilhão auricular, higiene prévia com gaze umedecida e uso estrito de luvas protetoras pelo manipulador.',
      narrativeHighlights: [
        'A hiperplasia adenomatosa progride morfologicamente com o tempo sob uso de metimazol (tecido ectópico e maior volume tumoral).',
        '¹³¹I continua sendo o tratamento de escolha curativo definitivo em felinos jovens e estáveis.',
        'O gel transdérmico reduz drasticamente efeitos colaterais digestivos (4% vs 24% no oral), mas requer veículo lipofílico testado e técnica de higiene correta.',
      ],
      studies: [
        {
          citation:
            'Peterson ME, Broome MR, Rishniw M. Prevalence and degree of thyroid pathology in hyperthyroid cats increases with disease duration: a cross-sectional analysis of 2096 cats referred for radioiodine therapy. JFMS 2016; 18(2):92–103.',
          referenceId: 'ref-peterson-2016',
          sourceType: 'Estudo transversal epidemiológico de grande escala (n = 2.096)',
          summaryText:
            'Análise de 2.096 gatos encaminhados para iodoterapia. Demonstrou aumento exponencial do volume tumoral, tecido intratorácico (3,4% para 32,3%) e suspeita de carcinoma folicular ao longo dos anos de tratamento puramente médico. Confirma que o metimazol controla a síntese hormonal mas não impede a expansão citogenética tecidual.',
          clinicalConclusion:
            'A terapia médica exclusiva deve ser monitorada para aumentos progressivos de dose necessários para suprimir massas tireoidianas em contínua expansão.',
        },
        {
          citation:
            'Sartor LL, Trepanier LA, Kroll MM, Rodan I, Challoner L. Efficacy and safety of transdermal methimazole in the treatment of cats with hyperthyroidism. JAVMA 2004; 225(11):1700–1705.',
          referenceId: 'ref-sartor-2004',
          sourceType: 'Ensaio clínico prospectivo randomizado',
          summaryText:
            'Comparação de metimazol transdérmico em gel vs metimazol oral em 47 gatos hipertireoideos (2,5 mg q12h em ambos). A incidência de reações adversas gastrintestinais foi significativamente menor no grupo transdérmico (1/27 = 4% vs 4/17 = 24%; p = 0,04). A taxa de eutireoidismo em 2 semanas foi superior no grupo oral (87,5% vs 56%), porém em 4 semanas a eficácia foi equivalente (82% oral vs 67% transdérmico; p = 0,44).',
          clinicalConclusion:
            'A via transdérmica é a conduta de escolha para pacientes que desenvolvem vômitos ou anorexia com a formulação oral, com excelente tolerância digestiva.',
        },
        {
          citation:
            'Mastrangelo C. Adverse side effects, including agranulocytosis and anemia, from methimazole treatment of a hyperthyroid cat. Can Vet J 2025; 66(2):206–209.',
          referenceId: 'ref-mastrangelo-2025',
          sourceType: 'Relato de caso clínico e revisão toxicológica contemporânea',
          summaryText:
            'Gata de 13 anos que desenvolveu neutropenia severa/agranulocitose e anemia não regenerativa grave após 40 dias de metimazol oral. Houve recuperação hematológica completa e resolução clínica após a interrupção precoce da medicação e suporte clínico.',
          clinicalConclusion:
            'Reitera a necessidade inegociável de monitoração hematológica seriada (hemograma com contagem de plaquetas) nas primeiras 3 a 12 semanas de início do metimazol.',
        },
      ],
    },
  ],

  clinicalWarningItems: [
    {
      label: 'METIMAZOL CONTROLA A SÍNTESE, MAS NÃO CURA A DOENÇA ESTRUTURAL',
      text: 'O fármaco atua exclusivamente inibindo a enzima tireoperoxidase e reduzindo a montagem de T4/T3. Ele não destrói o adenoma nem impede o crescimento volumétrico do tecido tireoidiano hiperplásico, que progride continuamente ao longo dos anos (Peterson et al. 2016). Em gatos jovens, deve-se propor o Iodo Radioativo (¹³¹I) como terapia curativa definitiva.',
    },
    {
      label: 'NÃO SUBTRATAR HIPERTIREOIDISMO PARA PROTEGER CREATININA ARTIFICIALMENTE',
      text: 'A elevação sérica da creatinina após atingir o eutireoidismo reflete o desmascaramento fisiológico da Doença Renal Crônica estrutural prévia e o fim da hiperfiltração patológica provocada pela tireotoxicose. Manter o felino em hipertireoidismo residual perpetua hipertensão sistêmica, catabolismo proteico, proteinúria glomerular e cardiomiopatia tireotóxica.',
    },
    {
      label: 'PERIGO EXTREMO DO HIPOTIREOIDISMO IATROGÊNICO (QUEDA CRÍTICA DA GFR)',
      text: 'A indução de hipotireoidismo iatrogênico por superdosagem de metimazol (TT4 < 1,0 µg/dL associada a TSH elevado) deprime o débito cardíaco e a perfusão renal, disparando azotemia em 57% dos gatos e reduzindo a sobrevida mediana de 905 para 456 dias (Williams et al. 2010). O alvo é manter o TT4 dentro da metade inferior do intervalo de referência (1,0 a 2,5 µg/dL segundo AAHA 2023). Se o TSH subir ou o T4 estiver subnormal, descalonar a dose imediatamente.',
    },
    {
      label: 'HEMOGRAMA COMPLETO OBRIGATÓRIO (RISCO DE NEUTROPENIA E AGRANULOCITOSE)',
      text: 'Cerca de 16% dos gatos exibem alterações hematológicas leves transitórias, mas reações idiossincráticas severas ocorrem em ~3,8% dos pacientes (agranulocitose, neutropenia profunda e trombocitopenia imunomediada). Qualquer episódio de febre, prostração, anorexia ou petéquias exige hemograma emergencial imediato e suspensão definitiva da medicação se houver mielotoxicidade.',
    },
    {
      label: 'PRURIDO FACIAL GRAVE E ESCORIAÇÕES DE CABEÇA E PESCOÇO',
      text: 'Efeito idiossincrático clássico caracterizado por prurido intenso, alopecia e automutilação com crostas na face, orelhas e região cervical. Não responde satisfatoriamente a anti-histamínicos ou corticoides e constitui indicação estrita de SUSPENSÃO IMEDIATA E DEFINITIVA do metimazol, contraindicando reexposição.',
    },
    {
      label: 'HEPATOTOXICIDADE IDIOSINCRÁTICA (ICTERÍCIA E DISFUNÇÃO HEPÁTICA)',
      text: 'Pode manifestar-se por icterícia aguda, anorexia profunda e elevação desproporcional de ALT e bilirrubinas totais. Distinguir da leve elevação de enzimas hepáticas frequentemente causada pelo próprio estado tireotóxico basal. A suspeita de lesão hepática por droga exige interrupção definitiva.',
    },
    {
      label: 'SEGURANÇA OCUPACIONAL: RISCO TERATOGÊNICO PARA O TUTOR',
      text: 'O metimazol atravessa a placenta e acumula-se na tireoide fetal, associando-se a bócio, aplasia cutis, atresia de coanas e defeitos congênitos graves. Mulheres grávidas ou que estejam tentando engravidar devem evitar qualquer contato com comprimidos partidos, urina/fezes de animais tratados e utilizar luvas protetoras obrigatórias ao aplicar formulações transdérmicas.',
    },
  ],

  mechanismOfAction:
    'O metimazol (1-metil-2-mercaptoimidazol) e seu pró-fármaco carbimazol pertencem à classe das tionamidas (derivados imidazólicos tioureilenos). Atua como um potente inibidor reversível da enzima tireoperoxidase (TPO), uma hemoproteína apical das células foliculares tireoidianas. No mecanismo bioquímico folicular, o metimazol atua como um substrato alternativo da TPO catalítica, competindo com a tirosina da tireoglobulina pelo complexo peroxidativo ativado (TPO-H₂O₂-I⁻). Essa interação enzimática inibe três passos fundamentais da esteroidogênese tireoidiana: 1) A oxidação do iodeto inorgânico (I⁻) a iodo reativo eletrofílico; 2) A organificação do iodo aos resíduos de tirosil na molécula de tireoglobulina, impedindo a formação de monoiodotirosina (MIT) e diiodotirosina (DIT); 3) A reação de acoplamento oxidativo entre as iodotirosinas (DIT + DIT gerando tiroxina/T4; MIT + DIT gerando triiodotironina/T3). O metimazol concentra-se ativamente no interior do parênquima folicular tireoidiano através de mecanismos de transporte dependentes de energia, o que confere à molécula uma duração de ação farmacodinâmica intrínseca consideravelmente superior à sua meia-vida plasmática de eliminação. A molécula NÃO inibe o transportador basolateral de iodeto (NIS), não destrói a massa adenomatosa hiperplásica, não afeta a proteólise da tireoglobulina pré-formada no coloide e não interfere nos estoques circulantes ou teciduais pré-existentes de T4 e T3, tampouco bloqueia de forma significativa a conversão periférica extratireoidiana de T4 para T3 via desiodases (diferenciando-se do propiltiouracil). Consequentemente, o esgotamento dos estoques hormonais prévios requer um período de latência de 1 a 3 semanas para a reversão clínica sustentada da tireotoxicose.',

  doses: [
    {
      id: 'dose-metimazol-fda-label',
      species: 'cat',
      indication: 'Hipertireoidismo felino — protocolo oral inicial padrão ouro (bula Felimazole® / Plumb’s / BSAVA)',
      doseMin: 2.5,
      doseMax: 2.5,
      doseUnit: 'mg',
      perWeightUnit: 'gato',
      route: 'VO',
      frequency: 'a cada 12 horas (q12h)',
      duration: 'Uso contínuo; primeira reavaliação clínica e laboratorial em 2 a 3 semanas',
      notes:
        'Protocolo de excelência terapêutica consolidado em ensaios clínicos (Trepanier et al. 2003: taxa de eutireoidismo de 87% com q12h vs 54% com q24h após 2 semanas). Administrar 1 comprimido de Felimazole® 2,5 mg a cada 12 horas. Administrar inteiro (nunca partir ou esmagar o comprimido revestido). Pode ser administrado com uma pequena quantidade de alimento para minimizar irritação gástrica. Reavaliar TT4, hemograma completo, perfil renal (ureia, creatinina, fósforo) e hepático (ALT, FA) às 2 a 3 semanas.',
      calculatorEnabled: false,
      presentationId: 'pres-felimazole-comp-2-5mg',
      evidenceLevel: 'Nível 1a — Ensaio clínico randomizado (Trepanier 2003), Bula MAPA Felimazole®, Plumb’s 10ª ed. e BSAVA 10ª ed.',
    },
    {
      id: 'dose-metimazol-transdermal',
      species: 'cat',
      indication: 'Hipertireoidismo felino — formulação transdérmica lipofílica (alternativa para intolerância digestiva oral)',
      doseMin: 2.5,
      doseMax: 5.0,
      doseUnit: 'mg',
      perWeightUnit: 'gato',
      route: 'Transdérmica (face interna da pina auricular)',
      frequency: 'a cada 12 horas (q12h)',
      duration: 'Uso contínuo; reavaliação laboratorial em 2 a 4 semanas',
      notes:
        'Indicado de primeira escolha para felinos que desenvolvem vômitos, anorexia ou intolerância gástrica sob a via oral. Sartor et al. (2004) comprovaram que a taxa de eventos adversos digestivos despenca de 24% (oral) para apenas 4% (transdérmico). Dose inicial recomendada: 2,5 mg/gato q12h (utilizar formulações magistrais com veículo lipofílico validado na concentração de 25 mg/mL, correspondendo a 0,1 mL por aplicação). Instruções essenciais: o tutor deve usar luvas protetoras obrigatórias; alternar a orelha a cada aplicação; limpar resíduos antigos suavemente com gaze úmida antes da nova aplicação.',
      calculatorEnabled: false,
      presentationId: 'pres-metimazol-transdermico-gel',
      evidenceLevel: 'Nível 1b — Ensaio clínico prospectivo cruzado (Sartor et al. 2004); Plumb’s 10ª ed. e BSAVA 10ª ed.',
    },
    {
      id: 'dose-metimazol-cat-conservative-aaha',
      species: 'cat',
      indication: 'Hipertireoidismo felino — introdução conservadora em pacientes frágeis ou com DRC limítrofe (Diretrizes AAHA 2023)',
      doseMin: 1.25,
      doseMax: 1.25,
      doseUnit: 'mg',
      perWeightUnit: 'gato',
      route: 'VO',
      frequency: 'a cada 12 horas (q12h) [ou 1,25–2,5 mg q24h na 1ª semana]',
      duration: '7 a 14 dias iniciais, progredindo para 2,5 mg q12h conforme tolerância e monitorização renal',
      notes:
        'Protocolo conservador preconizado pelo consenso AAHA 2023 e diretrizes de endocrinologia felina para minimizar a queda abrupta da taxa de filtração glomerular e reduzir o estresse de adaptação em gatos geriátricos, com perda importante de escore corporal ou azotemia inicial limítrofe (creatinina 1,6 a 2,2 mg/dL). Utilizar formulação magistral fracionada de 1,25 mg ou suspensão calibrada para garantir precisão e evitar fragmentação manual do comprimido comercial.',
      calculatorEnabled: false,
      presentationId: 'pres-metimazol-magistral-comp-1-25mg',
      evidenceLevel: 'Nível 1a — Diretrizes de Consenso Clínico AAHA (2023) e AAFP Feline Hyperthyroidism Guidelines',
    },
    {
      id: 'dose-metimazol-cat-severe-high-t4',
      species: 'cat',
      indication: 'Hipertireoidismo felino severo com T4 total extremamente elevado (>15 a 20 µg/dL)',
      doseMin: 3.75,
      doseMax: 5.0,
      doseUnit: 'mg',
      perWeightUnit: 'gato',
      route: 'VO',
      frequency: 'a cada 12 horas (q12h)',
      duration: '2 a 3 semanas sob monitorização rigorosa até controle da tireotoxicose',
      notes:
        'Reservado para gatos com concentrações maciças de T4 e tireotoxicose pronunciada (marcada por caquexia rápida, hipertensão grave e taquicardia descompensada). Administrar 5 mg/gato VO q12h (Felimazole® 5 mg comprimido). Limite posológico máximo de segurança de bula: 20 mg/gato/dia (nunca exceder 10 mg por tomada individual). Se o controle não for alcançado com doses progressivas, investigar tecido tireoidiano ectópico intratorácico ou carcinoma folicular e indicar ablação por Iodo Radioativo (¹³¹I).',
      calculatorEnabled: false,
      presentationId: 'pres-felimazole-comp-5mg',
      evidenceLevel: 'Nível 2 — Plumb’s 10ª ed., BSAVA 10ª ed. e Bula Felimazole® Dechra',
    },
    {
      id: 'dose-metimazol-cat-pretireoidectomia',
      species: 'cat',
      indication: 'Estabilização pré-operatória de felinos hipertireoideos antes da tireoidectomia cirúrgica',
      doseMin: 2.5,
      doseMax: 2.5,
      doseUnit: 'mg',
      perWeightUnit: 'gato',
      route: 'VO',
      frequency: 'a cada 12 horas (q12h)',
      duration: '2 a 4 semanas até alcançar eutireoidismo laboratorial pleno',
      notes:
        'Indicação formal aprovada em bula e pelo MAPA. O restabelecimento do eutireoidismo antes do ato cirúrgico minimiza drasticamente o risco anestésico inerente a arritmias cardíacas ventriculares, hipertensão arterial, colapso hemodinâmico e disfunção ventricular decorrentes da cardiomiopatia tireotóxica induzida pelo excesso crônico de T4.',
      calculatorEnabled: false,
      presentationId: 'pres-felimazole-comp-2-5mg',
      evidenceLevel: 'Nível 1b — Bula Oficial Felimazole® (MAPA PR 000007-8.000011) e Diretrizes Cirúrgicas Veterinárias',
    },
    {
      id: 'dose-metimazol-cat-trial-renal-i131',
      species: 'cat',
      indication: 'Ensaio clínico médico reversível ("trial" renal) prévio à terapia definitiva com Iodo Radioativo (¹³¹I)',
      doseMin: 1.25,
      doseMax: 2.5,
      doseUnit: 'mg',
      perWeightUnit: 'gato',
      route: 'VO',
      frequency: 'a cada 12 horas (q12h)',
      duration: '4 semanas consecutivas',
      notes:
        'Protocolo estratégico para avaliar a reserva funcional renal: suspende temporariamente a hiperfiltração da tireotoxicose para identificar se o paciente desenvolverá DRC descompensada grave após a ablação definitiva. Se a creatinina permanecer estável (IRIS 1 ou 2 compensada), o paciente pode ser encaminhado com segurança para iodoterapia com ¹³¹I. Observar que serviços de medicina nuclear frequentemente preconizam a suspensão do metimazol de 5 a 7 dias antes da administração do radioiodo para permitir captação ótima do radiotraçador.',
      calculatorEnabled: false,
      presentationId: 'pres-felimazole-comp-2-5mg',
      evidenceLevel: 'Nível 1a — Consenso AAFP e Diretrizes de Nefrologia BSAVA',
    },
    {
      id: 'dose-metimazol-dog-carcinoma',
      species: 'dog',
      indication: 'Ponte e adjuvância no controle da tireotoxicose em cães com carcinoma tireoidiano funcional',
      doseMin: 0.1,
      doseMax: 0.1,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'a cada 12 horas (q12h) [faixa de 2,5 a 5 mg total por cão q12h]',
      duration: 'Uso como ponte para estabilização metabólica pré-tireoidectomia ou radioterapia metabólica',
      notes:
        'O hipertireoidismo espontâneo canino é raro e decorre predominantemente de tumores tireoidianos volumosos e carcinomas funcionais hipersecretantes de T4. O metimazol não trata a neoplasia subjacente, funcionando exclusivamente como estabilizador hormonal pré-operatório. Monitorar hematócrito e plaquetas seriadamente.',
      calculatorEnabled: true,
      evidenceLevel: 'Nível 2 — Plumb’s 10ª ed. (p. 849 / PDF p. 876) e BSAVA Small Animal Formulary 10ª ed.',
    },
  ],

  presentations: [
    {
      id: 'pres-felimazole-comp-2-5mg',
      brand: 'Felimazole (Dechra Brasil)',
      name: 'Felimazole 2,5 mg',
      form: 'Comprimido revestido redondo vermelho',
      concentrationValue: 2.5,
      concentrationUnit: 'mg',
      route: 'Oral',
      channel: 'veterinary',
      commercialProductSlug: 'felimazole-dechra-comp-2-5mg',
      packageDescription: 'Frasco plástico de segurança contendo 100 comprimidos revestidos de 2,5 mg de tiamazol/metimazol (Registro MAPA PR 000007-8.000011)',
      scoringInfo: 'Comprimido revestido sem sulco — não partir nem triturar (proteção contra quebra irregular e risco de absorção cutânea pelo tutor)',
    },
    {
      id: 'pres-felimazole-comp-5mg',
      brand: 'Felimazole (Dechra Brasil)',
      name: 'Felimazole 5 mg',
      form: 'Comprimido revestido redondo laranja',
      concentrationValue: 5.0,
      concentrationUnit: 'mg',
      route: 'Oral',
      channel: 'veterinary',
      commercialProductSlug: 'felimazole-dechra-comp-5mg',
      packageDescription: 'Frasco plástico de segurança contendo 100 comprimidos revestidos de 5 mg de tiamazol/metimazol (Registro MAPA PR 000007-8.000012)',
      scoringInfo: 'Comprimido revestido sem sulco — não partir nem triturar',
    },
    {
      id: 'pres-tapazol-comp-5mg',
      brand: 'Tapazol (Biolab Sanus / Aspen)',
      name: 'Tapazol 5 mg',
      form: 'Comprimido',
      concentrationValue: 5.0,
      concentrationUnit: 'mg',
      route: 'Oral',
      channel: 'human_pharmacy',
      commercialProductSlug: 'tapazol-aspen-biolab-comp-5mg',
      packageDescription: 'Embalagem contendo 100 comprimidos de 5 mg (linha humana para prescrição veterinária extralabel)',
      scoringInfo: 'Comprimido simples',
    },
    {
      id: 'pres-metimazol-transdermico-gel',
      brand: 'Metimazol Gel Lipofílico Transdérmico Magistral',
      name: 'Metimazol Gel Transdérmico 25 mg/mL (ou 50 mg/mL)',
      form: 'Gel lipofílico transdérmico',
      concentrationValue: 25.0,
      concentrationUnit: 'mg/mL',
      route: 'Transdérmica (face interna da pina auricular)',
      channel: 'compounded',
      commercialProductSlug: 'metimazol-gel-transdermico-magistral',
      packageDescription: 'Frasco dosador / seringa dosadora sem agulha ou caneta aplicadora tipo Click (0,1 mL = 2,5 mg de metimazol)',
      scoringInfo: 'Exige uso de luvas protetoras obrigatórias pelo tutor em todas as manipulações e aplicações',
    },
    {
      id: 'pres-metimazol-magistral-comp-1-25mg',
      brand: 'Metimazol Magistral Veterinário',
      name: 'Metimazol Cápsulas / Biscoitos Palatáveis 1,25 mg',
      form: 'Cápsula ou biscoito palatável',
      concentrationValue: 1.25,
      concentrationUnit: 'mg',
      route: 'Oral',
      channel: 'compounded',
      packageDescription: 'Frasco contendo 30 a 60 unidades magistrais de 1,25 mg (ideal para descalonamento fino e titulação em nefropatas)',
      scoringInfo: 'Formulação magistral individualizada',
    },
  ],

  practicalWeightTable: {
    standardDoseText:
      'Em felinos, a posologia do metimazol é dosada por indivíduo (mg/gato) e não linearmente por kg, pois a dose depende da atividade secretora autônoma da massa folicular adenomatosa. Em cães com neoplasia funcional, a dose de referência é calculada a 0,1 mg/kg VO q12h.',
    headers: ['Espécie / Condição', 'Dose Inicial Típica', 'Apresentação Comercial / Magistral Sugerida', 'Frequência e Cuidados'],
    rows: [
      {
        weight: 'Gato — Protocolo Padrão Ouro',
        totalDose: '2,5 mg/gato',
        col1: '2,5 mg total por tomada',
        col2: 'Felimazole® 2,5 mg (1 comprimido inteiro)',
        col3: 'VO a cada 12 horas (q12h); reavaliar TT4 e exames laboratoriais em 2 a 3 semanas.',
      },
      {
        weight: 'Gato — Conservador / DRC Limítrofe (AAHA)',
        totalDose: '1,25 mg/gato',
        col1: '1,25 mg total por tomada',
        col2: 'Cápsula magistral ou biscoito de 1,25 mg',
        col3: 'VO a cada 12h (ou q24h na 1ª semana); titular lentamente para prevenir queda abrupta da filtração glomerular.',
      },
      {
        weight: 'Gato — Intolerância Digestiva / Vômitos',
        totalDose: '2,5 a 5,0 mg/gato',
        col1: '0,1 mL de gel (a 25 mg/mL)',
        col2: 'Metimazol Gel Lipofílico Transdérmico',
        col3: 'Face interna da pina q12h; uso estrito de luvas; alternar orelhas e limpar resíduos antigos.',
      },
      {
        weight: 'Gato — Hipertireoidismo Severo (T4 >15 µg/dL)',
        totalDose: '3,75 a 5,0 mg/gato',
        col1: '5,0 mg total por tomada',
        col2: 'Felimazole® 5 mg (1 comprimido inteiro)',
        col3: 'VO a cada 12 horas; monitorar hemograma e função renal rigorosamente; teto de 20 mg/dia.',
      },
      {
        weight: 'Cão 5 kg (Carcinoma Funcional)',
        totalDose: '0,5 mg',
        col1: '0,1 mg/kg',
        col2: 'Formulação magistral 0,5 mg',
        col3: 'VO a cada 12 horas (q12h) como ponte para ressecção cirúrgica ou terapia com radioiodo.',
      },
      {
        weight: 'Cão 10 kg (Carcinoma Funcional)',
        totalDose: '1,0 mg',
        col1: '0,1 mg/kg',
        col2: 'Formulação magistral 1,0 mg',
        col3: 'VO a cada 12 horas (q12h); estabilização metabólica e cardíaca pré-cirúrgica.',
      },
      {
        weight: 'Cão 20 kg (Carcinoma Funcional)',
        totalDose: '2,0 mg',
        col1: '0,1 mg/kg',
        col2: 'Formulação magistral 2,0 mg',
        col3: 'VO a cada 12 horas (q12h); monitorar hemograma e plaquetas seriadamente.',
      },
      {
        weight: 'Cão 30 kg (Carcinoma Funcional)',
        totalDose: '3,0 mg',
        col1: '0,1 mg/kg',
        col2: 'Formulação magistral 3,0 mg',
        col3: 'VO a cada 12 horas (q12h); adjuvância em tireotoxicose canina neoplásica.',
      },
      {
        weight: 'Cão 40 kg (Carcinoma Funcional)',
        totalDose: '4,0 mg',
        col1: '0,1 mg/kg',
        col2: 'Formulação magistral 4,0 mg',
        col3: 'VO a cada 12 horas (q12h); suporte endocrinológico individualizado.',
      },
    ],
  },

  samplePrescriptionText:
    'RECEITUÁRIO VETERINÁRIO DE CONTROLE SIMPLES\n\nPaciente: Felino (Gato) | Idade: 11 anos | Peso: 3,8 kg\nDiagnóstico: Hipertireoidismo Felino Primário Espontâneo\n\nUSO VETERINÁRIO — VIA ORAL\n\n1. FELIMAZOLE® 2,5 mg (Dechra) ------------------------------------------------ 1 Frasco c/ 100 comprimidos revestidos\n   Administrar 1 (um) comprimido por via oral, a cada 12 horas (q12h), continuamente.\n\nORIENTAÇÕES CLÍNICAS ESSENCIAIS AO TUTOR:\n- Administrar o comprimido inteiro, sem mastigar, partir ou esmagar, preferencialmente junto a uma pequena porção de alimento nos mesmos horários todos os dias.\n- NÃO suspender o tratamento por conta própria: o metimazol não destrói o adenoma e a tireotoxicose retorna em 48 a 72 horas após a interrupção da medicação.\n- Mulheres grávidas ou em planejamento de gestação NUNCA devem manusear os comprimidos ou a caixa de areia do animal sem o uso de luvas protetoras de borracha/látex (risco teratogênico).\n- Retorno agendado em exatamente 2 a 3 semanas para exame clínico e dosagem de T4 total, TSH felino, hemograma completo, ureia, creatinina, fósforo e enzimas hepáticas.\n- Entrar em contato imediatamente com o hospital veterinário se o animal manifestar vômitos persistentes, febre, fraqueza severa, amarelão (icterícia), manchas arroxeadas ou prurido violento na cabeça/pescoço com automutilação.',

  pharmacokineticsData: {
    absorption:
      'Em gatos, a absorção oral é rápida e quase completa, com biodisponibilidade sistêmica variando de 78% a 81% (Trepanier et al. 1991: 77,6% em normais e 79,5% em hipertireoideos). O pico de concentração plasmática (Tmax) ocorre em aproximadamente 1,19 ± 0,42 horas. A presença de alimento não altera significativamente a absorção líquida do fármaco. Na via transdérmica, a absorção depende criticamente da base carreadora: veículos lipofílicos modernos garantem biodisponibilidade relativa próxima a 48% (Tmax de 5,2 h), enquanto o gel de plurônico (PLO) exibe absorção errática e baixa (F ~11,4%).',
    distribution:
      'Volume de distribuição moderado: 0,80 a 0,89 L/kg em felinos eutireoideos e ~0,66 L/kg em hipertireoideos (com discreta redução da meia-vida de residência tecidual). A ligação a proteínas plasmáticas é mínima (<5% a 10%), permitindo livre difusão aos compartimentos periféricos. Crucialmente, o metimazol acumula-se e atinge concentrações ativas no interior do tecido folicular tireoidiano por meio de transporte celular carreador, justificando a persistência do bloqueio enzimático muito além da curva plasmática do fármaco. Atravessa prontamente a barreira placentária e é excretado no leite materno.',
    metabolism:
      'Metabolismo primariamente hepático por reações oxidativas microssomais e de conjugação. Em humanos, as vias CYP1A2 e CYP2C9 são os catalisadores primários; contudo, a orquestração enzimática em felinos não deve ser extrapolada diretamente para isoformas humanas específicas. Gatos realizam glucuronidação e sulfatação em taxas particulares para substratos de tionamida.',
    elimination:
      'Os metabólitos polares inativos são eliminados predominantemente pela via urinária (>70% a 80%), com uma fração inferior a 10% sendo excretada inalterada. A meia-vida plasmática felina de eliminação varia de 3,4 a 6,6 horas após administração oral. Em cães, a meia-vida plasmática descrita em ensaios farmacocinéticos é mais prolongada (~8,8 horas) com Vd de ~0,59 L/kg. A disfunção renal crônica não prolonga a retenção do fármaco ativo nem exige redução matemática de dose por estágios IRIS.',
  },

  attentionData: {
    precautions: [
      {
        condition: 'Doença Renal Crônica (DRC) concomitante',
        alertLevel: 'warning',
        physiologicalExplanation:
          'A redução da taxa de filtração glomerular após restaurar o eutireoidismo é um desmascaramento fisiológico da perda de néfrons pré-existente. Contudo, induzir hipotireoidismo iatrogênico por superdosagem acarreta colapso hemodinâmico renal grave, duplicando a frequência de azotemia.',
        clinicalAction:
          'Não subtratar o hipertireoidismo. Titular a dose com meta de TT4 entre 1,0 e 2,5 µg/dL sem elevação do TSH. Se a creatinina subir excessivamente com TT4 baixa/normal e TSH elevado, descalonar a dose imediatamente.',
      },
      {
        condition: 'Prurido facial intenso e escoriações cervicais',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Reação idiossincrática imunotóxica induzida por tionamidas, deflagrando dermatite grave com prurido violento, alopecia e escoriações profundas na face, pina e pescoço.',
        clinicalAction:
          'Suspender o metimazol de forma imediata e definitiva. Não tentar manter o fármaco com suporte de anti-histamínicos ou glicocorticoides. Migrar para Iodo Radioativo (¹³¹I) ou cirurgia.',
      },
      {
        condition: 'Agranulocitose, neutropenia profunda e discrasias sanguíneas',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Citotoxicidade direta sobre progenitores mieloides da medula óssea ou fenômeno de destruição periférica imunomediada (prevalência de reações graves em ~3,8% dos pacientes).',
        clinicalAction:
          'Solicitar hemograma completo com contagem plaquetária se houver febre, infecção bacteriana intercorrente ou sangramento. Se neutrófilos totais < 1.000/µL ou plaquetas < 50.000/µL, suspender imediatamente.',
      },
      {
        condition: 'Hepatopatia primária severa ou hepatotoxicidade induzida',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'O fármaco pode desencadear necrose hepatocelular idiossincrática e colestase intra-hepática severa com icterícia clínica.',
        clinicalAction:
          'Diferenciar da elevação moderada de enzimas hepáticas induzida pela própria tireotoxicose. Caso surja icterícia, hiperbilirrubinemia ou elevação marcante de ALT acompanhada de anorexia e depressão, suspender o metimazol definitivamente.',
      },
      {
        condition: 'Gestação, lactação e manipulação por gestantes',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'O metimazol atravessa a barreira placentária, suprime a tireoide fetal gerando bócio intrauterino e manifesta atividade teratogênica comprovada (aplasia cutis, atresia de coanas e defeitos esofágicos).',
        clinicalAction:
          'Contraindicado na gestação e lactação felina. Mulheres grávidas ou tentando engravidar são proibidas de manipular os comprimidos partidos ou o gel transdérmico.',
      },
    ],
    adverseEffectsDetailed: [
      {
        effect: 'Distúrbios gastrintestinais (vômitos, inapetência, letargia e diarreia)',
        frequency: 'common',
        mechanism: 'Irritação direta da mucosa gástrica pelo fármaco e sabor amargo acentuado (incidência em ~10% a 20% dos felinos).',
        clinicalManagement:
          'Oferecer os comprimidos com uma pequena porção de comida saborosa. Se os vômitos e anorexia persistirem, migrar para a formulação transdérmica lipofílica na orelha (incidência de distúrbios digestivos cai para ~4%).',
      },
      {
        effect: 'Hipotireoidismo iatrogênico',
        frequency: 'common',
        mechanism: 'Supressão excessiva da síntese hormonal decorrente de superdosagem de metimazol (TT4 < 1,0 µg/dL com TSH elevado).',
        clinicalManagement:
          'Descalonar a dose diária imediatamente em 1,25 a 2,5 mg/dia. Não manter a dose alta adicionando levotiroxina ("block-and-replace" não é recomendado em felinos).',
      },
      {
        effect: 'Prurido facial e escoriações na cabeça/pescoço',
        frequency: 'uncommon',
        mechanism: 'Hipersensibilidade idiossincrática imunotóxica.',
        clinicalManagement: 'Suspensão imediata e permanente do metimazol. Fornecer colar elizabetano protetor e cuidados tópicos para as feridas.',
      },
      {
        effect: 'Neutropenia severa / agranulocitose / trombocitopenia',
        frequency: 'rare',
        mechanism: 'Mielossupressão ou destruição imunomediada na medula óssea.',
        clinicalManagement: 'Suspensão imediata da droga. Terapia intensiva com antimicrobianos bactericidas de amplo espectro se sepse/neutropenia febril.',
      },
      {
        effect: 'Miastenia Gravis imunomediada induzida por droga',
        frequency: 'very_rare',
        mechanism: 'Indução autoimune de anticorpos circulantes contra o receptor muscular de acetilcolina (AChR-Ab).',
        clinicalManagement: 'Suspensão imediata do metimazol; os sinais motores e de megaesôfago costumam regredir espontaneamente após a retirada.',
      },
    ],
    drugInteractionsDetailed: [
      {
        drugOrClass: 'Fenobarbital e indutores microssomais hepáticos',
        severity: 'moderate',
        clinicalEffect: 'Redução da eficácia clínica antitireoidiana do metimazol e necessidade de titulação de doses maiores.',
        pharmacologicalMechanism: 'Aceleração da biotransformação e depuração metabólica do metimazol mediada por enzimas oxidativas hepáticas induzidas.',
      },
      {
        drugOrClass: 'Anticoagulantes orais (varfarina e derivados cumarínicos)',
        severity: 'major',
        clinicalEffect: 'Aumento acentuado do risco de hemorragias espontâneas.',
        pharmacologicalMechanism: 'O metimazol possui atividade intrínseca antivitamina K e a restauração do eutireoidismo altera a taxa de turnover dos fatores de coagulação.',
      },
      {
        drugOrClass: 'Betabloqueadores (atenolol, propranolol)',
        severity: 'minor',
        clinicalEffect: 'Redução progressiva da necessidade de betabloqueio conforme o paciente atinge o eutireoidismo.',
        pharmacologicalMechanism: 'O controle da tireotoxicose normaliza a densidade e responsividade dos receptores beta-adrenérgicos cardíacos.',
      },
      {
        drugOrClass: 'Dieta terapêutica estrita com restrição de iodo (ex.: Hill’s y/d®)',
        severity: 'major',
        clinicalEffect: 'Supressão hormonal excessiva e risco elevado de hipotireoidismo iatrogênico profundo.',
        pharmacologicalMechanism: 'Mecanismos farmacológico e nutricional concorrentes de depleção da síntese de hormônios tireoidianos.',
      },
    ],
  },

  generalInfoData: {
    routesDetailed: [
      {
        route: 'Oral (comprimidos revestidos comerciais — Felimazole®)',
        technique: 'Administrar o comprimido inteiro, sem mastigar, partir ou esmagar.',
        nursingCare: 'Oferecer preferencialmente com uma pequena refeição para mascarar o gosto amargo e atenuar náusea.',
        limitations: 'Comprimidos não devem ser partidos pelo tutor pelo risco de dose irregular e absorção cutânea.',
      },
      {
        route: 'Transdérmica (gel lipofílico magistral)',
        technique: 'Aplicar na face interna do pavilhão auricular (pina) sobre a pele sem pelos.',
        nursingCare: 'Obrigatoriedade de luvas protetoras; alternar as orelhas e limpar suavemente os resíduos antigos com gaze úmida antes de reaplicar.',
        limitations: 'Requer base carreadora lipofílica validada; não utilizar gel PLO genérico de baixa penetração.',
      },
    ],
    pharmacologicalClassification: {
      chemicalClass: 'Tionamida / imidazol tioureileno',
      chemicalClassDescription: 'Derivado imidazólico sulfurado de baixo peso molecular contendo um anel tiona que compete com resíduos tirosil.',
      therapeuticClass: 'Antitireoidiano sistêmico',
      therapeuticClassDescription: 'Agente modulador que suprime a biosíntese de tiroxina (T4) e triiodotironina (T3) na glândula tireoide.',
      detailedTargets: [
        {
          target: 'Tireoperoxidase (TPO apical folicular)',
          action: 'Inibidor alternativo competitivo e inativador heme',
          clinicalSignificance: 'Bloqueia as reações de oxidação, organificação e acoplamento de MIT e DIT.',
        },
      ],
    },
    prescriptionType: {
      category: 'Medicamento Veterinário de Receita Simples',
      ordinanceOrLaw: 'MAPA — Não controlado pela Portaria SVS/MS 344/98',
      retentionRequired: false,
      guidelines: 'Prescrição em receituário simples com recomendações de segurança ocupacional em negrito.',
    },
  },

  contraindications: [
    'Hipersensibilidade individual conhecida ao metimazol, tiamazol ou a componentes da fórmula.',
    'Doença hepática primária descompensada ou insuficiência hepática prévia.',
    'Discrasias sanguíneas preexistentes, anemia grave, agranulocitose, leucopenia ou trombocitopenia.',
    'Doenças autoimunes sistêmicas conhecidas (lúpus eritematoso sistêmico, anemia hemolítica imunomediada).',
    'Gatas gestantes ou em fase de lactação (efeitos teratogênicos comprovados e passagem pelo leite).',
    'Prurido facial grave ou escoriações induzidas por exposição anterior ao metimazol.',
  ],

  cautions: [
    'Monitorar rigorosamente a função renal: a reversão do hipertireoidismo encerra a hiperfiltração e desmascara a DRC oculta.',
    'Prevenir ativamente o hipotireoidismo iatrogênico, o qual precipita azotemia severa e reduz a sobrevida média.',
    'Realizar hemograma completo de controle nas primeiras semanas de tratamento pelo risco de mielossupressão precoce.',
    'Orientar o tutor quanto ao uso de luvas descartáveis para a aplicação de formulações transdérmicas.',
  ],

  adverseEffects: [
    'Vômitos, inapetência, letargia e diarreia (efeitos digestivos comuns em ~10% a 20% sob via oral).',
    'Hipotireoidismo iatrogênico e desmascaramento de azotemia renal.',
    'Prurido facial intenso com automutilação e escoriações em cabeça e pescoço (exige suspensão imediata).',
    'Agranulocitose, neutropenia profunda e trombocitopenia imunomediada (~3,8% dos pacientes).',
    'Hepatotoxicidade idiossincrática e icterícia.',
    'Miastenia Gravis imunomediada induzida por fármaco (muito rara).',
  ],

  routes: ['VO', 'Transdérmica'],
  administration: [
    'Via Oral: administrar o comprimido revestido inteiro (sem partir) a cada 12 horas.',
    'Via Transdérmica: aplicar na face interna da orelha (pina) a cada 12 horas com luvas protetoras obrigatórias.',
  ],

  monitoringParameters: [
    'T4 Total Sérico (TT4): dosar a cada 2 a 3 semanas na fase inicial de regulação até atingir o alvo (1,0 a 2,5 µg/dL).',
    'TSH Felino: dosar sempre que TT4 estiver na metade inferior do intervalo ou subnormal para descartar hipotireoidismo iatrogênico.',
    'Função Renal Completa: ureia, creatinina, fósforo, SDMA e densidade urinária (USG) a cada 2 a 4 semanas na titulação.',
    'Hemograma Completo com Contagem de Plaquetas: monitorar nas semanas 3, 6, 10 e 20 e semestralmente na manutenção.',
    'Enzimas Hepáticas: ALT, FA e bilirrubinas totais.',
    'Pressão Arterial Sistólica (Doppler vascular) e Frequência Cardíaca.',
  ],

  clientInformation: [
    'O metimazol não cura o tumor na tireoide, mas controla a produção em excesso dos hormônios tireoidianos.',
    'Não interrompa o remédio sem falar com o médico-veterinário: a doença volta rapidamente se o medicamento for suspenso.',
    'Mulheres grávidas nunca devem manusear os comprimidos partidos ou o gel na orelha sem luvas (risco de malformações no feto).',
    'Leve o animal ao hospital imediatamente se notar febre, fraqueza severa, amarelão nos olhos ou feridas de coceira intensa na face.',
  ],
};
