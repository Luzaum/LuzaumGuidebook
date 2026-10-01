import { MedicationRecord } from '../../types/medication';

export const sucralfatoMedicationRecord: MedicationRecord = {
  id: 'med-sucralfato',
  slug: 'sucralfato',
  title: 'Sucralfato (Sacarose Octassulfatada de Alumínio)',
  activeIngredient: 'Sucralfato (complexo básico de sacarose octassulfatada e hidróxido de alumínio policíclico hidratado)',
  isControlled: false,
  tradeNames: [
    'Sucrafilm® 1 g Comprimidos Mastigáveis (EMS — Frasco com 30 comprimidos)',
    'Sucrafilm® 200 mg/mL Suspensão Oral (EMS — Caixa com 20 flaconetes de 10 mL)',
    'Sucralfato 1 g Comprimidos Genéricos (EMS, Medley, Eurofarma)',
    'Sucralfato 200 mg/mL Suspensão Oral Manipulada Veterinária (Veículo Aquoso Isento de Açúcar)',
    'Carafate® 1 g Comprimidos e 100 mg/mL Suspensão Oral (Referência Internacional Americana)',
    'Sucralfato Pomada / Gel Mucoprotetor Oral Veterinário 10% a 20% (Manipulação Magistral)',
  ],
  officialSiteUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  leafletUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/sucralfate/PNG',
  pharmacologicClass:
    'Protetor da mucosa gastrointestinal de ação tópica intraluminal; complexo básico polianiônico de sacarose octassulfatada com hidróxido de alumínio; curativo químico citoprotetor e adsorvente de H+, pepsina e sais biliares',
  species: ['dog', 'cat'],
  category: 'gastroenterologia',
  tags: [
    'Sucralfato',
    'Sucralfate',
    'Sucrafilm',
    'Carafate',
    'Mucoprotetor',
    'Protetor Gástrico',
    'Curativo Químico',
    'Esofagite',
    'Úlcera Gástrica',
    'Refluxo Gastroesofágico',
    'Gastroenterologia',
    'ACVIM Gastroprotectants',
    'Slurry',
    'Receita Simples',
  ],

  mechanismOfAction:
    'O sucralfato é um complexo básico polianiônico sintético formado por sacarose octassulfatada ligada a resíduos policíclicos de hidróxido de alumínio hidratado. Ao contrário de antagonistas de receptores H2 e inibidores da bomba de prótons (IBPs), o sucralfato é destituído de ação inibitória direta sobre a secreção de ácido gástrico pelas células parietais. Seu mecanismo farmacodinâmico é eminentemente tópico e intraluminal. Em meio gástrico ácido (pH inferior a 4,0), o complexo sofre polimerização e dissociação parcial, formando uma pasta viscosa fortemente polianiônica carregada negativamente. Essa fração de sacarose sulfatada exibe afinidade eletrostática extraordinária por proteínas teciduais de carga positiva (como albumina, fibrinogênio e proteínas da matriz extracelular) expostas seletivamente no leito desepitelizado de erosões e úlceras esofágicas, gástricas e duodenais, com afinidade de ligação à mucosa ulcerada até 6 a 7 vezes superior em comparação à mucosa íntegra. Uma vez aderido ao tecido lesado, o polímero forma uma barreira física insolúvel e protetora (curativo químico ou band-aid mucoso) que persiste aderida por até 6 horas, impedindo mecanicamente a retrofusão de íons hidrogênio (H+) para o interior da lâmina própria. Adicionalmente, o sucralfato adsorve a pepsina luminal e bloqueia estericamente o acesso da enzima aos seus substratos proteicos teciduais, inibe a agressão citolítica promovida por ácidos biliares regurgitados e neutraliza pequenas frações ácidas locais através do componente de hidróxido de alumínio. No âmbito citoprotetor e trófico, estimula localmente a síntese endógena de prostaglandinas protetoras da mucosa (PGE2 e PGI2), potencializa a secreção epitelial de muco e íons bicarbonato, previne a hidrólise da camada de muco gástrico e liga-se a fatores de crescimento teciduais locais (como o fator de crescimento epidérmico / EGF e o fator de crescimento de fibroblastos / FGF), estabilizando-os no leito ulcerado para acelerar a reepitelização, a angiogênese e a restauração da resistência elétrica transepitelial.',

  plainLanguageSummary:
    'O sucralfato é um protetor gastrointestinal de ação predominantemente local e intraluminal utilizado em cães e gatos para promover a proteção e cicatrização da mucosa digestiva lesionada, atuando como um verdadeiro curativo químico que adere com alta afinidade às proteínas expostas no leito de úlceras e erosões no esôfago, estômago e duodeno inicial. Diferente de medicamentos inibidores de ácido como o omeprazol, o sucralfato praticamente não possui absorção sistêmica relevante e não desliga a produção de ácido gástrico pelas células parietais, exercendo seu benefício ao formar uma barreira física viscosa e protetora que impede o contato do tecido cru com o ácido clorídrico, a pepsina proteolítica e os sais biliares regurgitados, além de estabilizar fatores de crescimento teciduais locais. Seu emprego contemporâneo deve ser racional e focado em lesões mucosas comprovadas, destacando-se como terapia de primeira linha nas esofagites erosivas por refluxo administrado na forma de suspensão fluida para banhar o esôfago, ao mesmo tempo em que consensos internacionais desaconselham seu uso indiscriminado como protetor gástrico universal em gastrites inespecíficas, pancreatites ou na doença renal crônica, na qual não atua como quelante eficaz de fósforo e pode precipitar constipação e sobrecarga de alumínio, exigindo atenção rigorosa quanto aos horários de administração para manter um intervalo obrigatório de pelo menos duas horas antes ou depois de outros medicamentos orais para evitar que sua capacidade adsorvente anule a absorção de antibióticos como a doxiciclina e o ciprofloxacino.',

  pillars: [
    {
      title: 'Curativo Químico Seletivo por Carga Eletrostática',
      icon: 'Shield',
      desc: 'Forma uma pasta polianiônica insolúvel em pH ácido que se liga com afinidade 7 vezes maior a proteínas de leitos ulcerados expostos, criando uma barreira protetora física local.',
    },
    {
      title: 'Bloqueio de H+, Pepsina e Sais Biliares Regurgitados',
      icon: 'Zap',
      desc: 'Impede a retrofusão ácida para a lâmina própria, inativa a atividade proteolítica da pepsina sobre a mucosa e adsorve ácidos biliares citolíticos do refluxo duodenogástrico.',
    },
    {
      title: 'Preservação de Fatores Tróficos (EGF) & Reparo Tecidual',
      icon: 'Heart',
      desc: 'Retém e estabiliza fatores de crescimento epidérmico e de fibroblastos no leito da úlcera, estimulando angiogênese, secreção de bicarbonato e reepitelização.',
    },
    {
      title: 'Ação Intraluminal Estrita & Quelação de Outros Fármacos',
      icon: 'AlertTriangle',
      desc: 'Não exerce efeito sistêmico direto e adsorve outros fármacos orais no lúmen digestivo; exige intervalo obrigatório de pelo menos 2 horas antes de outros medicamentos orais.',
    },
  ],

  clinicalWarningItems: [
    {
      label: 'Interação Crítica com Antibióticos Orais: Regra Obrigatória das 2 Horas',
      text: 'O sucralfato atua como potente ligante intraluminal inespecífico, adsorvendo e quelando fármacos administrados concomitantemente. Em cães, a coadministração com doxiciclina derruba a absorção e a exposição do antibiótico em 80% (KuKanich & KuKanich 2015); com ciprofloxacino, a biodisponibilidade cai para 48%. É mandatório administrar antibióticos e outros fármacos orais pelo menos 2 horas ANTES do sucralfato (ou pelo menos 4 horas antes no caso da levotiroxina). Curiosamente, estudos em cães demonstraram que a enrofloxacina não sofreu redução significativa de biodisponibilidade, mostrando que nem todas as fluoroquinolonas reagem de forma idêntica.',
    },
    {
      label: 'Preferência Mandatória por Slurry ou Suspensão Líquida na Esofagite',
      text: 'Comprimidos inteiros de sucralfato administrados a cães frequentemente passam intactos pelo esôfago e já foram recuperados inteiros nas fezes de animais em estudos clínicos. Para o tratamento da esofagite erosiva e do refluxo gastroesofágico, é indispensável utilizar a suspensão oral pronta (200 mg/mL) ou dissolver previamente o comprimido em pequena quantidade de água dentro de uma seringa até formar uma pasta fluida homogênea (slurry), administrando lentamente por via oral para banhar e aderir à mucosa esofágica lesionada.',
    },
    {
      label: 'Contraindicação como Quelante de Fósforo em Felinos com DRC',
      text: 'O ensaio clínico veterinário de Quimby & Lappin (2016) avaliou o sucralfato como quelante entérico de fósforo em gatos saudáveis e com Doença Renal Crônica (500 mg q8h por 14 dias) e comprovou ausência de benefício sobre os níveis séricos ou urinários de fósforo. Além disso, gatos com DRC apresentaram taxa de 60% de descompensação clínica grave com vômitos frequentes, anorexia, constipação severa e piora da azotemia. O sucralfato NÃO deve ser prescrito como quelante de fósforo em felinos.',
    },
    {
      label: 'Uso Racional Conforme Consenso ACVIM: Não é Protetor Universal',
      text: 'O Consenso Internacional ACVIM de Protetores Gastrointestinais (Marks et al. 2018) estabelece que o sucralfato não deve ser administrado profilaticamente de forma rotineira em pacientes com gastrite não erosiva inespecífica, pancreatite sem sangramento, hepatopatias, nem simplesmente por uso isolado de corticosteroides ou presença de DRC. Para úlceras e erosões gastroduodenais (GUE), inibidores da bomba de prótons (como omeprazol) são comprovadamente superiores ao sucralfato, e não há evidência de que a associação rotineira de sucralfato com omeprazol traga benefício aditivo em relação ao omeprazol isolado.',
    },
    {
      label: 'Proibição Absoluta de Administração Parenteral (IV, IM ou SC)',
      text: 'O sucralfato é uma substância coloidal insolúvel desenhada exclusivamente para ação intraluminal sobre mucosas. A injeção parenteral acidental (intravenosa ou intramuscular) resulta em microembolização pulmonar e cerebral imediata com infarto tecidual, insuficiência respiratória aguda e óbito. Não existem vias parenterais, taxas de infusão contínua ou compatibilidades para o sucralfato.',
    },
  ],

  indications: [
    'Tratamento mucoprotetor tópico de esofagites erosivas, úlceras esofágicas e refluxo gastroesofágico agudo ou crônico em cães e gatos.',
    'Terapia tópica adjuvante na úlcera gástrica, úlcera duodenal e erosões gastroduodenais graves com sangramento (associado a IBPs).',
    'Tratamento curativo local de estomatite ulcerativa, queilites químicas e mucosite orofaríngea dolorosa por trauma ou cáusticos.',
    'Proteção da mucosa gastrointestinal lesionada decorrente de intoxicação por ingestão de agentes corrosivos, ácidos ou álcalis.',
    'Tratamento coadjuvante de erosões gastrointestinais induzidas por anti-inflamatórios não esteroidais (AINEs) após descontinuação do agente agressor.',
  ],

  quickIndications: [
    {
      condition: 'Esofagite Erosiva e Refluxo Gastroesofágico Canino (≤ 20 kg)',
      species: 'dog',
      doseSummary: '500 mg por cão VO a cada 6 a 8 horas (q6-8h), em suspensão fluida (slurry)',
      route: 'Oral (VO)',
      duration: '7 a 14 dias até remissão da odinofagia e do refluxo; associar a pró-cinéticos e IBPs se indicado',
      clinicalContext: 'Cães pequenos e médios com esofagite pós-anestésica, refluxo ácido ou vômitos recorrentes.',
    },
    {
      condition: 'Esofagite Erosiva e Refluxo Gastroesofágico Canino (> 20 kg)',
      species: 'dog',
      doseSummary: '1000 a 2000 mg (1 a 2 g) por cão VO a cada 6 a 8 horas (q6-8h), em slurry',
      route: 'Oral (VO)',
      duration: '7 a 14 dias; administrar lentamente para promover contato mucoso com o esôfago',
      clinicalContext: 'Cães de médio a grande porte com erosões esofágicas confirmadas ou altamente suspeitas.',
    },
    {
      condition: 'Esofagite e Mucoproteção Digestiva Felina (BSAVA 10ª ed.)',
      species: 'cat',
      doseSummary: '250 mg por gato VO a cada 8 a 12 horas (q8-12h), em suspensão líquida (1,25 mL de 200 mg/mL)',
      route: 'Oral (VO)',
      duration: '5 a 10 dias com reavaliação de tolerabilidade e apetite',
      clinicalContext: 'Gatos com esofagite pós-intubação, odinofagia ou vômitos cáusticos; não usar como quelante renal.',
    },
    {
      condition: 'Esofagite Grave e Refluxo Agudo em Felinos (Faixa Experimental Plumb\'s)',
      species: 'cat',
      doseSummary: '500 mg por gato VO a cada 8 horas (q8h), em suspensão oral fluida (2,5 mL de 200 mg/mL)',
      route: 'Oral (VO)',
      duration: '3 a 7 dias; monitorar defecação contra constipação induzida por alumínio',
      clinicalContext: 'Protocolo de resgate em esofagite severa com regurgitação persistente.',
    },
    {
      condition: 'Lesões Ulcerativas Orais, Estomatite e Mucosite Orofaríngea',
      species: 'both',
      doseSummary: '1 a 2,5 mL de suspensão 200 mg/mL banhando a cavidade oral a cada 8 a 12 horas (q8-12h)',
      route: 'Tópica oral',
      duration: 'Conforme cicatrização das lesões da mucosa bucal',
      clinicalContext: 'Cães e gatos com úlceras na língua, gengiva ou palato secundárias a toxinas ou cáusticos.',
    },
  ],

  contraindications: [
    'Suspeita ou confirmação de perfuração gastrintestinal ativa (emergência cirúrgica; risco de contaminação peritoneal com alumínio insolúvel).',
    'Administração parenteral por qualquer via (intravenosa, intramuscular ou subcutânea) — risco de embolização microvascular fatal.',
    'Obstrução intestinal mecânica completa ou hipomotilidade severa (íleo paralítico grave).',
    'Hipersensibilidade conhecida ao sucralfato ou a qualquer componente da formulação.',
    'Uso como quelante entérico de fósforo em felinos com Doença Renal Crônica (ineficaz e indutor de descompensação clínica).',
  ],

  cautions: [
    'Pacientes com Doença Renal Crônica avançada (estágios IRIS 3 e 4): embora a absorção de alumínio seja mínima (<1% a 2%), o uso crônico prolongado pode predispor a acúmulo de alumínio e osteomalacia ou neurotoxicidade.',
    'Constipação intestinal crônica, megacólon felino e estase gástrica: o componente de hidróxido de alumínio retarda o trânsito intestinal e agrava o ressecamento fecal.',
    'Formação de bezoares gástricos em pacientes de terapia intensiva sob estase gástrica e nutrição enteral contínua por sonda.',
    'Pacientes recebendo múltiplos medicamentos orais essenciais de janela estreita (doxiciclina, fluoroquinolonas, levotiroxina, digoxina): exige separação horária estrita.',
  ],

  adverseEffects: [
    'Constipação intestinal: o efeito colateral mais frequente, decorrente da ação adstringente e obstipante dos íons de alumínio sobre a motilidade cólica.',
    'Vômitos e náuseas pós-administração: relatados especialmente em gatos (cerca de 15% das administrações) por intolerância ao volume ou palatabilidade da pasta.',
    'Hipofosfatemia discreta transitória em tratamentos prolongados por ligação intestinal parcial ao fosfato dietético.',
    'Formação de fitobezoares ou complexos de agregação intraluminal em pacientes criticamente enfermos sob gastroparesia ou nutrição enteral.',
    'Reações alérgicas raras: prurido, erupções cutâneas ou hipersensibilidade individual a excipientes.',
  ],

  interactions: [
    'Doxiciclina e Tetraciclinas Orais: A coadministração simultânea com sucralfato reduz a absorção oral e a exposição sistêmica (AUC) da doxiciclina em aproximadamente 80% em cães (KuKanich & KuKanich 2015). É mandatório administrar a doxiciclina pelo menos 2 horas ANTES do sucralfato.',
    'Ciprofloxacino: A quelação intraluminal reduz a biodisponibilidade do ciprofloxacino para 48% quando administrados simultaneamente em cães; a separação de 2 horas restabelece a absorção para cerca de 87% (KuKanich et al. 2016). Administrar o ciprofloxacino 2 horas antes.',
    'Enrofloxacino: Estudo farmacocinético canino demonstrou ausência de redução significativa na absorção do enrofloxacino com sucralfato (biodisponibilidade relativa de ~104%). Por prudência clínica, recomenda-se manter intervalo preventivo de 2 horas entre as tomadas.',
    'Levotiroxina Sódica: O sucralfato adsorve fortemente os hormônios tireoidianos no lúmen gástrico, provocando falência do controle do hipotireoidismo. Manter intervalo obrigatório de pelo menos 4 horas entre a levotiroxina e o sucralfato.',
    'Digoxina, Fenitoína, Ketoconazol, Teofilina e Furosemida Oral: Adsorção inespecífica no trato digestivo com redução da biodisponibilidade e concentrações de pico dos fármacos associados. Administrar sempre esses medicamentos pelo menos 2 horas antes do sucralfato.',
    'Inibidores da Bomba de Prótons (Omeprazol, Pantoprazol) e Bloqueadores H2: Embora não haja contraindicação absoluta na associação, o sucralfato requer meio ácido para sofrer polimerização ótima. Administrar o sucralfato pelo menos 30 a 60 minutos após o IBP/antagonista H2. O Consenso ACVIM ressalta que a associação rotineira não oferece benefício comprovado em relação ao IBP isolado.',
    'Nutrição Enteral por Sonda: A administração simultânea de sucralfato com dietas enterais líquidas pode precipitar proteínas da dieta e formar bezoares obstrutivos dentro da sonda alimentar. Separar a administração da dieta por pelo menos 1 hora e lavar a sonda com água antes e após.',
  ],

  pharmacokineticsData: {
    absorption:
      'A absorção sistêmica após administração oral é praticamente negligenciável. O complexo de sacarose octassulfatada atua primariamente na luz do trato gastrointestinal. Menos de 1% a 2% da fração de alumínio e menos de 0,5% da sacarose sulfatada são absorvidos sistemicamente e excretados na urina em pacientes com função renal normal. Não possui biodisponibilidade sistêmica estabelecida nem necessária para sua eficácia clínica.',
    distribution:
      'Não se distribui significativamente para os tecidos corporais nem atravessa a barreira hematoencefálica. A distribuição limita-se à superfície da mucosa gastrointestinal, onde o fármaco adere preferencialmente ao leito das úlceras e erosões, formando uma camada física aderente que persiste por até 6 horas.',
    metabolism:
      'Não sofre metabolismo enzimático hepático nem interage com o complexo citocromo P450 (CYP450). No trato gastrointestinal, o complexo sofre dissociação e polimerização físico-química dependentes do pH.',
    elimination:
      'Mais de 95% a 98% da dose oral administrada é eliminada de forma inalterada diretamente nas fezes. A fração ínfima de alumínio absorvida sistemicamente é excretada por filtração glomerular renal.',
  },

  doses: [
    {
      id: 'dose-sucral-dog-under20-bsava',
      species: 'dog',
      indication: 'Esofagite erosiva, refluxo ou úlcera gastroduodenal — cães até 20 kg (BSAVA 10ª ed.)',
      doseMin: 500.0,
      doseMax: 500.0,
      doseUnit: 'mg',
      perWeightUnit: 'cão',
      route: 'VO',
      frequency: 'q6–8h',
      duration: '7 a 14 dias conforme avaliação clínica e endoscópica',
      notes:
        'Dose fixa padrão por animal (BSAVA 10ª ed., p. 388). Administrar preferencialmente na forma de suspensão fluida (slurry) preparada com água ou utilizando 2,5 mL de suspensão oral 200 mg/mL. Administrar com o estômago vazio, mantendo intervalo de pelo menos 2 horas antes de outros medicamentos orais.',
      calculatorEnabled: false,
      referenceIds: ['ref-bsava-10', 'ref-plumb-10', 'ref-acvim-2018'],
    },
    {
      id: 'dose-sucral-dog-over20-bsava',
      species: 'dog',
      indication: 'Esofagite erosiva, refluxo ou úlcera gastroduodenal — cães acima de 20 kg (BSAVA 10ª ed.)',
      doseMin: 1000.0,
      doseMax: 2000.0,
      doseUnit: 'mg',
      perWeightUnit: 'cão',
      route: 'VO',
      frequency: 'q6–8h',
      duration: '7 a 14 dias',
      notes:
        'Dose fixa por animal (BSAVA 10ª ed., p. 388): 1000 a 2000 mg (1 a 2 g por dose), equivalente a 5 a 10 mL de suspensão 200 mg/mL ou 1 a 2 comprimidos de 1 g dispersos em água (slurry). Para esofagite, administrar lentamente.',
      calculatorEnabled: false,
      referenceIds: ['ref-bsava-10', 'ref-plumb-10', 'ref-acvim-2018'],
    },
    {
      id: 'dose-sucral-cat-general-bsava',
      species: 'cat',
      indication: 'Esofagite, refluxo e mucoproteção digestiva felina (BSAVA 10ª ed.)',
      doseMin: 250.0,
      doseMax: 250.0,
      doseUnit: 'mg',
      perWeightUnit: 'gato',
      route: 'VO',
      frequency: 'q8–12h',
      duration: '5 a 10 dias com monitoramento do apetite e trânsito intestinal',
      notes:
        'Dose prática recomendada pelo BSAVA 10ª ed. (p. 388) para a espécie felina: 250 mg por gato (equivalente a 1,25 mL da suspensão oral 200 mg/mL). Não utilizar como quelante de fósforo na DRC felina devido à ineficácia e risco de descompensação e vômitos (Quimby & Lappin 2016).',
      calculatorEnabled: false,
      referenceIds: ['ref-bsava-10', 'ref-plumb-10', 'ref-quimby-2016'],
    },
    {
      id: 'dose-sucral-dog-esophagitis-slurry',
      species: 'dog',
      indication: 'Esofagite erosiva e refluxo gastroesofágico canino — protocolo slurry (VIN / Plumb\'s 10ª ed.)',
      doseMin: 500.0,
      doseMax: 1000.0,
      doseUnit: 'mg',
      perWeightUnit: 'cão',
      route: 'VO',
      frequency: 'q8h',
      duration: '7 a 14 dias',
      notes:
        'Protocolo clássico para esofagite: 500 a 1000 mg por cão a cada 8 horas na forma de suspensão aquosa densa (slurry), administrado lentamente na comissura labial para assegurar o banhamento e a aderência à mucosa esofágica lesionada.',
      calculatorEnabled: false,
      referenceIds: ['ref-plumb-10', 'ref-acvim-2018'],
    },
    {
      id: 'dose-sucral-cat-esophagitis-high',
      species: 'cat',
      indication: 'Esofagite ácida grave e refluxo agudo em felinos — protocolo de resgate (Katz et al. 1988 / Plumb\'s)',
      doseMin: 500.0,
      doseMax: 500.0,
      doseUnit: 'mg',
      perWeightUnit: 'gato',
      route: 'VO',
      frequency: 'q8h',
      duration: '3 a 7 dias; reavaliar tolerabilidade',
      notes:
        'Dose superior utilizada em modelos e protocolos de esofagite grave: 500 mg por gato a cada 8 horas (2,5 mL de suspensão 200 mg/mL). Monitorar presença de náuseas pós-dose e constipação intestinal.',
      calculatorEnabled: false,
      referenceIds: ['ref-katz-1988', 'ref-plumb-10'],
    },
    {
      id: 'dose-sucral-both-oral-lesions',
      species: 'both',
      indication: 'Estomatite ulcerativa, queimaduras orais químicas e mucosite orofaríngea (cães e gatos)',
      doseMin: 1.0,
      doseMax: 2.5,
      doseUnit: 'mL',
      perWeightUnit: 'paciente',
      route: 'Tópica oral',
      frequency: 'q8–12h',
      duration: 'Até reepitelização das úlceras orais',
      notes:
        'Aplicação tópica direta de 1 a 2,5 mL da suspensão oral 200 mg/mL espalhada sobre a língua, gengiva e palato ulcerados para formação de barreira química analgésica e aceleradora de reparação.',
      calculatorEnabled: false,
      referenceIds: ['ref-plumb-10', 'ref-bsava-10'],
    },
  ],

  monitoringParameters: [
    'Avaliação de sinais clínicos esofágicos e gástricos: monitoramento de odinofagia, regurgitação, disfagia, sialorreia, hematêmese e melena.',
    'Frequência e consistência da defecação: monitorar o trânsito intestinal para detecção precoce de constipação associada ao hidróxido de alumínio.',
    'Tolerabilidade gástrica e aceitação oral: observar ocorrência de náuseas ou êmese induzidas pela administração, especialmente em gatos.',
    'Avaliação da função renal e fósforo sérico em nefropatas: em tratamentos prolongados com DRC associada, monitorar creatinina, ureia, SDMA e fósforo.',
    'Checagem estrita da grade horária terapêutica: confirmar se os tutores estão respeitando o intervalo obrigatório de pelo menos 2 horas entre outros medicamentos orais e o sucralfato.',
  ],

  clientInformation: [
    'O sucralfato funciona como um curativo protetor que cobre a ferida do esôfago e do estômago. Ele não substitui o tratamento da causa que provocou a lesão.',
    'Regra dos horários: NUNCA administre outros comprimidos ou remédios líquidos junto com o sucralfato. O sucralfato gruda nos outros remédios e impede que eles façam efeito. Dê os outros medicamentos primeiro e espere pelo menos 2 horas antes de dar o sucralfato.',
    'Se o paciente tomar remédio para tireoide (levotiroxina), o intervalo deve ser de pelo menos 4 horas.',
    'Como administrar: Se usar comprimido, dissolva-o em uma seringa com um pouco de água até virar uma pasta líquida homogênea antes de dar na boca do animal. Se usar a suspensão líquida pronta, agite bem o flaconete antes de retirar a dose.',
    'Para problemas no esôfago, administre a suspensão de forma lenta e delicada na lateral da boca do animal para que o líquido desça devagar e cubra as paredes do esôfago.',
    'Observe as fezes do seu animal: avise o médico-veterinário caso o paciente fique mais de dois dias sem evacuar (prisão de ventre) ou apresente vômitos frequentes.',
  ],

  references: [
    {
      id: 'ref-acvim-2018',
      citationText:
        'Marks SL, Kook PH, Papich MG, Tolbert MK, Willard MD. ACVIM consensus statement: Support for rational administration of gastrointestinal protectants to dogs and cats. J Vet Intern Med. 2018;32(6):1823-1840. doi:10.1111/jvim.15337.',
      sourceType: 'Diretriz / Consenso Internacional',
      url: 'https://doi.org/10.1111/jvim.15337',
      notes: 'Consenso ACVIM definindo as diretrizes de uso racional de protetores gastrointestinais em pequenos animais.',
      evidenceLevel: 'Consenso de Especialistas ACVIM',
    },
    {
      id: 'ref-katz-1988',
      citationText:
        'Katz PO, Geisinger KR, Hassan M, Wu WC, Huang D, Castell DO. Acid-induced esophagitis in cats is prevented by sucralfate but not synthetic prostaglandin E. Dig Dis Sci. 1988;33(2):217-224. doi:10.1007/BF01535736.',
      sourceType: 'Estudo experimental controlado',
      url: 'https://doi.org/10.1007/BF01535736',
      notes: 'Estudo seminal demonstrando a proteção da mucosa esofágica felina por sucralfato líquido independente de prostaglandinas.',
      evidenceLevel: 'Nível II — Estudo experimental controlado',
    },
    {
      id: 'ref-kukanich-2015',
      citationText:
        'KuKanich K, KuKanich B. The effect of sucralfate tablets vs suspension on oral doxycycline absorption in dogs. J Vet Pharmacol Ther. 2015;38(2):169-173. doi:10.1111/jvp.12165.',
      sourceType: 'Ensaio clínico farmacocinético crossover',
      url: 'https://doi.org/10.1111/jvp.12165',
      notes: 'Comprova redução de 80% na absorção de doxiciclina por sucralfato simultâneo e valida a separação de 2 horas em cães.',
      evidenceLevel: 'Nível I — Ensaio cruzado prospectivo randomizado',
    },
    {
      id: 'ref-kukanich-2016',
      citationText:
        'KuKanich K, KuKanich B, Guess S, Heinrich E. Effect of Sucralfate on the Relative Bioavailability of Enrofloxacin and Ciprofloxacin in Healthy Fed Dogs. J Vet Intern Med. 2016;30(1):108-115. doi:10.1111/jvim.13796.',
      sourceType: 'Ensaio clínico farmacocinético',
      url: 'https://doi.org/10.1111/jvim.13796',
      notes: 'Demonstra redução de absorção com ciprofloxacino (48%), mas ausência de interação clinicamente relevante com enrofloxacino em cães.',
      evidenceLevel: 'Nível II — Ensaio farmacocinético cruzado',
    },
    {
      id: 'ref-quimby-2016',
      citationText:
        'Quimby JM, Lappin MR. Evaluating Sucralfate as a Phosphate Binder in Normal Cats and Cats with Chronic Kidney Disease. J Am Anim Hosp Assoc. 2016;52(1):8-12. doi:10.5326/JAAHA-MS-6213.',
      sourceType: 'Ensaio clínico prospectivo',
      url: 'https://doi.org/10.5326/JAAHA-MS-6213',
      notes: 'Comprova ineficácia do sucralfato como quelante de fósforo em gatos e alto índice de descompensação clínica em DRC.',
      evidenceLevel: 'Nível II — Ensaio clínico prospectivo controlado',
    },
    {
      id: 'ref-hill-2018',
      citationText:
        'Hill TL, Lascelles BDX, Blikslager AT. Effect of sucralfate on gastric permeability in an ex vivo model of stress-related mucosal disease in dogs. J Vet Intern Med. 2018;32(2):670-678. doi:10.1111/jvim.15076.',
      sourceType: 'Estudo experimental ex vivo',
      url: 'https://doi.org/10.1111/jvim.15076',
      notes: 'Demonstra aceleração da restauração da barreira mucosa e resistência elétrica gástrica canina sob sucralfato.',
      evidenceLevel: 'Nível II — Estudo experimental randomizado',
    },
    {
      id: 'ref-bazelle-2018',
      citationText:
        'Bazelle J, Threlfall A, Whitley N. Gastroprotectants in small animal veterinary practice - a review of the evidence. Part 1: cyto-protective drugs. J Small Anim Pract. 2018;59(10):587-602. doi:10.1111/jsap.12867.',
      sourceType: 'Revisão sistemática de evidências',
      url: 'https://doi.org/10.1111/jsap.12867',
      notes: 'Revisão sistemática BSAVA cobrindo 37 estudos sobre eficácia e interações de citoprotetores em pequenos animais.',
      evidenceLevel: 'Nível I — Revisão sistemática',
    },
    {
      id: 'ref-tolbert-2024',
      citationText:
        'Tolbert MK, Stubbs SL. Rational use of gastroprotectants in cats. J Feline Med Surg. 2024;26(8):1098612X241265890. doi:10.1177/1098612X241265890.',
      sourceType: 'Revisão Clínica Contemporânea',
      url: 'https://doi.org/10.1177/1098612X241265890',
      notes: 'Revisão especializada de 2024 sobre indicação criteriosa de protetores gástricos na espécie felina.',
      evidenceLevel: 'Revisão Narrativa Especializada',
    },
    {
      id: 'ref-plumb-10',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. VetMedux/Wiley-Blackwell; 2023. Monografia: Sucralfate, pp. 1189–1190.',
      sourceType: 'Compêndio de Farmacologia Veterinária',
      url: 'https://search.worldcat.org/isbn/9781394172207',
      notes: 'Monografia com dosagens práticas por espécie, orientações de administração em slurry e interações medicamentosas.',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-bsava-10',
      citationText:
        'British Small Animal Veterinary Association. BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. British Small Animal Veterinary Association; 2020. Monografia: Sucralfate, pp. 387–388.',
      sourceType: 'Formulário Veterinário Britânico',
      url: 'https://www.bsavalibrary.com/content/book/10.22233/9781910443729',
      notes: 'Posologia padronizada por faixas de peso corporal em cães (500 mg para ≤20 kg; 1 a 2 g para >20 kg) e gatos (250 mg).',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-ems-sucrafilm',
      citationText:
        'EMS S/A. Bula oficial do medicamento Sucrafilm® (Sucralfato 1 g comprimidos mastigáveis e 200 mg/mL suspensão oral). Registro ANVISA nº 1.0235.0315.',
      sourceType: 'Bula Técnica Oficial Registrada',
      url: 'https://www.ems.com.br/medicamentos/sucrafilm/',
      notes: 'Apresentação comercial humana de referência no Brasil utilizada na rotina veterinária extrabula.',
      evidenceLevel: 'Documento Técnico Regulatório ANVISA',
    },
  ],

  presentations: [
    {
      id: 'pres-sucrafilm-comp-1g',
      name: 'Sucrafilm® 1 g Comprimidos Mastigáveis',
      brand: 'EMS S/A (Referência Humana Extrabula)',
      form: 'Comprimido mastigável / dispersível',
      concentrationValue: 1000.0,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 30 comprimidos mastigáveis de 1 g',
      route: 'Oral (VO)',
      channel: 'human_pharmacy',
    },
    {
      id: 'pres-sucrafilm-susp-200',
      name: 'Sucrafilm® 200 mg/mL (1 g / 5 mL) Suspensão Oral',
      brand: 'EMS S/A (Referência Humana Extrabula)',
      form: 'Suspensão oral',
      concentrationValue: 200.0,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco com 100 mL ou 200 mL',
      route: 'Oral (VO)',
      channel: 'human_pharmacy',
    },
    {
      id: 'pres-sucralfato-mag-pasta',
      name: 'Sucralfato Pasta Oral Palatável / Suspensão Manipulada',
      brand: 'Formulação Magistral Veterinária Especializada',
      form: 'Pasta oral ou suspensão líquida',
      concentrationValue: 250.0,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco de 50 mL a 100 mL',
      route: 'Oral (VO)',
      channel: 'compounded',
    },
  ],

  relatedDiseaseSlugs: [
    'esofagite-caes-gatos',
    'gastrite-aguda-cronica-caes-gatos',
    'doenca-renal-cronica-caes',
    'doenca-renal-cronica-felina',
  ],
};
