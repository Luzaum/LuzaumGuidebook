import type { DiseasePlainLanguage } from '../../types/disease';

/**
 * Blocos “O que é em palavras simples?” — linguagem acessível para tutores.
 * Cada doença nova deve ter entrada aqui E `plainLanguage` no seed (ou import via getPlainLanguageForSlug).
 */
export const DISEASE_PLAIN_LANGUAGE: Record<string, DiseasePlainLanguage> = {
  'coagulacao-intravascular-disseminada-caes-gatos': {
    whatIsIt:
      'A coagulação intravascular disseminada (CID) é uma emergência crítica em que o sistema que faz o sangue coagular entra em pane generalizada devido a outra doença grave. Em vez de formar coágulos apenas em cortes ou machucados, o corpo passa a criar milhares de microcoágulos invisíveis dentro dos vasos sanguíneos, entupindo a circulação de órgãos vitais como rins, pulmões e fígado. Ao mesmo tempo, como todos os componentes de coagulação são gastos rapidamente nessa tempestade, o sangue perde a capacidade de estancar hemorragias, fazendo com que o animal possa ter manchas roxas na pele, sangramentos e falência de órgãos.',
    keyPoints: [
      'A CID nunca surge sozinha: ela é sempre consequência de uma condição muito grave, como infecções generalizadas (sepse), tumores avançados, inflamação severa no pâncreas ou traumas graves.',
      'O animal pode estar sofrendo danos graves em órgãos internos mesmo sem sangrar por fora — a falta de sangramento visível não significa que ele esteja fora de perigo.',
      'O tratamento foca em combater com urgência a doença de base que disparou o problema, manter a hidratação e perfusão na UTI e repor componentes do sangue quando necessário.',
    ],
  },
  'miastenia-gravis-caes-gatos': {
    whatIsIt:
      'A miastenia gravis adquirida é uma doença em que o sistema imune do animal ataca a “ponte” entre o nervo e o músculo. Com isso, o cão ou gato fica fraco de forma progressiva — principalmente depois de caminhar, brincar ou comer — e pode ter dificuldade para engolir ou respirar.',
    keyPoints: [
      'A fraqueza piora com o esforço e melhora após descanso.',
      'Pode causar megaesôfago, regurgitação, engasgos e pneumonia por aspiração.',
      'Em gatos, é importante investigar massa no peito (timoma); o tratamento inicial inclui medicamento que melhora a transmissão nervo-músculo.',
    ],
  },
  'sindromes-miastenicas-congenitas-caes-gatos': {
    whatIsIt:
      'As síndromes miastênicas congênitas são doenças genéticas presentes desde filhote, nas quais a comunicação entre nervo e músculo nasce defeituosa. Não são causadas por autoimunidade — por isso o tratamento e o prognóstico diferem da miastenia gravis adquirida.',
    keyPoints: [
      'Surge cedo, muitas vezes perto do desmame, com fraqueza ao brincar ou caminhar.',
      'O teste de anticorpos anti-receptor de acetilcolina (AChR-Ab) costuma ser negativo; pode ser necessário teste genético.',
      'Não usar imunossupressão como tratamento principal; aconselhamento reprodutivo é essencial.',
    ],
  },
  'leucemia-viral-felina': {
    whatIsIt:
      'A leucemia viral felina (FeLV) é um vírus que infecta gatos e pode enfraquecer a defesa do organismo, causar anemia, linfoma e outras doenças. Nem todo gato positivo fica doente de imediato — o veterinário precisa entender que tipo de infecção é (progressiva, regressiva ou abortiva).',
    keyPoints: [
      'Um teste rápido positivo sozinho não confirma infecção grave — é preciso confirmar e repetir o exame.',
      'Gatos positivos podem viver bem por anos com acompanhamento; eutanásia só pelo teste não é indicada.',
      'Prevenção: testar, vacinar gatos em risco, evitar contato com gatos infectantes e manter indoor.',
    ],
  },
  'erliquiose-monocitica-canina': {
    whatIsIt:
      'A erliquiose é uma doença infecciosa grave transmitida pela picada do carrapato. A bactéria infecta os glóbulos brancos e afeta a produção de plaquetas, comprometendo a coagulação do sangue e a imunidade do cão.',
    keyPoints: [
      'Pode causar febre, perda de apetite, sangramento nasal e manchas avermelhadas na pele.',
      'Possui fases aguda, subclínica (silenciosa) e crônica.',
      'O diagnóstico precoce e o tratamento com doxiciclina por 28 dias oferecem boa chance de cura.',
    ],
  },
  'babesiose-canina': {
    whatIsIt:
      'A babesiose é uma doença parasitária do sangue transmitida principalmente por carrapatos. O parasita destrói glóbulos vermelhos, causando anemia, fraqueza e, nos casos graves, falência de órgãos.',
    keyPoints: [
      'Febre, apatia, urina escura e mucosas pálidas são sinais frequentes.',
      'Carrapatos são o principal vetor — controle ectoparasitário contínuo é fundamental.',
      'O tratamento depende da espécie de Babesia identificada; casos graves podem exigir hospitalização.',
    ],
  },
  'colapso-traqueal-canino': {
    whatIsIt:
      'No colapso traqueal, a parede do tubo que conduz o ar aos pulmões perde a firmeza e pode sofrer achatamento enquanto o animal respira ou tosse. É muito frequente em cães de pequeno porte e raro em gatos, manifestando-se tipicamente com tosse seca em crises ou dificuldade para respirar.',
    keyPoints: [
      'Em cães a causa clássica é enfraquecimento da cartilagem; em gatos, o estreitamento quase sempre exige investigar outras causas, como massas ou traumas.',
      'Manter o peso ideal, substituir a coleira tradicional por peitoral e afastar fumaça, calor e excitação ajudam a reduzir as crises.',
      'Língua azulada, desmaio, exaustão ou dificuldade para respirar em repouso são sinais graves que exigem atendimento imediato.',
    ],
  },
  'fistula-perianal-furunculose-anal': {
    whatIsIt:
      'A fístula perianal é uma ferida crônica, dolorosa e inflamada ao redor do ânus. É uma doença imunomediada — o sistema de defesa do cão ataca os tecidos locais, formando tratos drenantes.',
    keyPoints: [
      'Muito comum em Pastor Alemão, mas ocorre em outras raças.',
      'Causa dor intensa ao evacuar, lambedura constante e sangramento.',
      'O tratamento base moderno usa imunomoduladores (como ciclosporina), não cirurgia de primeira linha.',
    ],
  },
  'leishmaniose-visceral-canina': {
    whatIsIt:
      'A leishmaniose é uma doença parasitária crônica transmitida pela picada do mosquito-palha. O parasita espalha-se pelo organismo e pode afetar pele, rins, fígado e baço.',
    keyPoints: [
      'Lesões de pele, unhas longas e perda de peso são sinais clássicos.',
      'É zoonose — o mosquito transmite entre cães e pode envolver humanos na cadeia.',
      'Exige tratamento e monitoramento prolongados; controle de vetores é parte essencial.',
    ],
  },
  'micoplasmoses-hemotropicas': {
    whatIsIt:
      'Micoplasmas hemotrópicos (hemoplasmas) são bactérias que grudam na superfície dos glóbulos vermelhos. O corpo destrói essas células, gerando anemia — muito conhecida em gatos como “anemia infecciosa felina”.',
    keyPoints: [
      'Comum em gatos; pulgas são vetor importante.',
      'Palidez, fraqueza, febre e apatia são os sinais mais visíveis.',
      'Gatos com FIV/FeLV têm maior risco de doença grave.',
    ],
  },
  'doenca-renal-cronica-caes-gatos': {
    whatIsIt:
      'A doença renal crônica (DRC) é a perda lenta e progressiva da função dos rins. Eles deixam de filtrar toxinas e de concentrar a urina, acumulando resíduos no sangue.',
    keyPoints: [
      'Muito comum em cães e gatos idosos.',
      'Beber e urinar mais, vômitos e perda de peso são sinais típicos.',
      'Dieta renal, hidratação e controle de pressão fazem parte do manejo de longo prazo.',
    ],
  },
  'hipertensao-arterial-sistemica-caes-gatos': {
    whatIsIt:
      'A hipertensão arterial é a pressão sanguínea persistentemente alta. Muitas vezes é consequência de outras doenças (DRC, Cushing, hipertireoidismo) e ataca olhos, rins, coração e cérebro em silêncio.',
    keyPoints: [
      'Chamada de “inimiga silenciosa” — pode não dar sintomas até haver dano.',
      'Cegueira súbita por lesão ocular é uma emergência clássica em gatos.',
      'Medir pressão arterial em pacientes geriátricos e nefropatas é essencial.',
    ],
  },
  'doenca-valvar-mitral-degenerativa-caes': {
    whatIsIt:
      'A doença valvar mitral degenerativa é o desgaste da válvula que separa o átrio do ventrículo esquerdo. O sangue volta para trás (sopro) e o coração trabalha extra. Muitos cães convivem anos só com o sopro; o sinal de alerta em casa é a respiração acelerada durante o sono, que pode indicar líquido no pulmão.',
    keyPoints: [
      'Mais comum em cães pequenos e idosos — sopro não significa insuficiência cardíaca.',
      'O ecocardiograma define o estágio e se já é hora de pimobendan.',
      'Tosse isolada nem sempre é “água no pulmão”; diurético só com congestão.',
    ],
  },
  'cardiomiopatia-dilatada-caes-gatos': {
    whatIsIt:
      'A cardiomiopatia dilatada é quando o coração dilata e perde força para bombear sangue. O músculo cardíaco enfraquece e o animal pode desenvolver tosse, cansaço e, em casos graves, colapso.',
    keyPoints: [
      'Comum em cães grandes (Dobermann, Dogue Alemão); rara em gatos com dieta adequada.',
      'Pode existir fase “silenciosa” detectável só com ecocardiograma ou Holter.',
      'Medicamentos como pimobendan e diuréticos melhoram qualidade de vida e sobrevida.',
    ],
  },
  'arritmias-cardiacas-caes-gatos': {
    whatIsIt:
      'Arritmias são alterações no ritmo ou na velocidade dos batimentos cardíacos. Podem ser inofensivas ou causar fraqueza, desmaio, falta de ar e, nos casos graves, parada cardíaca.',
    keyPoints: [
      'Um ECG curto normal não garante que não exista arritmia intermitente — o Holter pode ser necessário.',
      'Nem todo “batimento extra” precisa de remédio; o veterinário avalia se o animal está estável.',
      'Em emergência, VF e taquicardia ventricular sem pulso exigem reanimação — não apenas medicamento oral.',
    ],
  },
  'giardiase-caes-gatos': {
    whatIsIt:
      'Giardíase é uma infecção intestinal por um protozoário (*Giardia*) que pode causar diarreia, fezes moles ou pastosas e perda de peso — mas muitos cães e gatos ficam assintomáticos.',
    keyPoints: [
      'Teste positivo para Giardia não prova sozinho que ela seja a causa da diarreia.',
      'O veterinário costuma pedir várias amostras de fezes em dias diferentes, porque o parasita nem sempre aparece em um único exame.',
      'O tratamento inclui remédio (geralmente fenbendazol) e limpeza rigorosa do ambiente, pelagem e fezes para evitar reinfecção.',
    ],
  },
  'coccidiose-caes-gatos': {
    whatIsIt:
      'Cistoisosporose (coccidiose intestinal) é infecção por protozoários *Cystoisospora* em cães e gatos, muito comum em filhotes. Não tem relação com coccidioidomicose, que é uma doença fúngica sistêmica diferente.',
    keyPoints: [
      'Oocistos positivos nas fezes confirmam infecção, mas nem sempre explicam sozinhos a diarreia — coinfecções são frequentes.',
      'Filhotes de abrigos, canis e gatil são os mais afetados; adultos saudáveis podem eliminar o parasita sem sinais.',
      'O tratamento combina medicamento (geralmente ponazuril ou toltrazuril) com limpeza rigorosa do ambiente para evitar reinfecção.',
    ],
  },
  'hiperparatireoidismo-caes-gatos': {
    whatIsIt:
      'Hiperparatireoidismo é o aumento persistente do hormônio paratireoidiano (PTH), que regula o cálcio no sangue. O significado depende da causa: tumor da paratireoide, doença renal crônica ou dieta desequilibrada em filhotes.',
    keyPoints: [
      'O PTH deve ser interpretado junto com o cálcio ionizado — um valor “normal” pode ainda indicar doença em animal hipercalcêmico.',
      'Hipercalcemia com PTH não suprimido sugere hiperparatireoidismo primário, que em geral exige cirurgia.',
      'Em doença renal, o PTH alto faz parte do distúrbio mineral-ósseo da DRC; o tratamento foca fósforo e dieta renal, não cirurgia de paratireoide.',
    ],
  },
  'insulinoma-caes-gatos': {
    whatIsIt:
      'Insulinoma é um tumor do pâncreas que produz insulina em excesso, fazendo a glicose no sangue cair de forma perigosa. O animal pode tremer, ficar fraco, desorientado, convulsionar ou desmaiar — muitas vezes de forma intermitente, como se tivesse “epilepsia” ou “problema cardíaco”.',
    keyPoints: [
      'Hipoglicemia com insulina que não deveria estar alta durante a queda de glicose é o padrão clássico — insulina “normal” no exame ainda pode ser anormal nesse contexto.',
      'Crise com convulsão ou desmaio exige correção imediata da glicose; depois investigar com exames e, quando possível, cirurgia.',
      'Em gatos a doença é rara — muitas recomendações vêm de experiência canina e devem ser interpretadas com cautela.',
    ],
  },
  'cetoacidose-diabetica-caes-gatos': {
    whatIsIt:
      'A cetoacidose diabética (CAD) é uma emergência do diabetes em que o corpo produz excesso de cetonas e fica com acidose no sangue, além de desidratação e alterações de potássio e outros eletrólitos. O animal costuma vomitar, ficar muito fraco, respirar fundo e pode desmaiar.',
    keyPoints: [
      'Não basta baixar a glicose: primeiro restaurar perfusão e corrigir potássio; a insulina serve principalmente para parar a produção de cetonas.',
      'Em gatos usando remédios SGLT2, a CAD pode ocorrer mesmo com glicemia aparentemente normal — isso se chama CAD euglicêmica (eDKA).',
      'Quando a glicemia cai para cerca de 200–250 mg/dL, muitas vezes é preciso adicionar glicose ao soro para continuar a insulina até a cetose resolver.',
    ],
  },
  'cardiomiopatia-hipertrofica-caes-gatos': {
    whatIsIt:
      'A cardiomiopatia hipertrófica (CMH) é o espessamento do músculo do coração, especialmente do ventrículo esquerdo. O coração fica rígido, enche mal e pode formar coágulos perigosos.',
    keyPoints: [
      'Doença cardíaca felina mais comum; Maine Coon e raças orientais têm predisposição.',
      'Muitos gatos são assintomáticos até insuficiência cardíaca ou paralisia por trombo.',
      'Ecocardiograma confirma; controle de congestão e prevenção de tromboembolismo são centrais.',
    ],
  },
  'cardiomiopatia-restritiva-felina': {
    whatIsIt:
      'A cardiomiopatia restritiva felina (CMR) é quando o coração perde flexibilidade — as câmaras não enchem bem. É uma forma de doença cardíaca estrutural comum em gatos idosos.',
    keyPoints: [
      'Causa cansaço, dificuldade respiratória e, às vezes, acúmulo de líquido no tórax ou abdome.',
      'Ecocardiograma diferencia de outras cardiomiopatias.',
      'Tratamento foca em aliviar congestão e melhorar conforto — não há cura estrutural.',
    ],
  },
  'sindrome-cushing-caes': {
    whatIsIt:
      'A síndrome de Cushing no cão é o excesso crônico de cortisol — hormônio do estresse — no sangue. Na maioria dos casos, um tumor benigno na hipófise estimula demais as glândulas adrenais; em outros, a própria adrenal produz cortisol em excesso.',
    keyPoints: [
      'Beber e urinar muito, fome aumentada, barriga pendente e queda de pelo simétrica são sinais clássicos.',
      'O diagnóstico exige sinais clínicos compatíveis e exames específicos — enzima hepática alta sozinha não confirma.',
      'Trilostano é o tratamento medicamentoso mais usado; o veterinário ajusta a dose conforme a melhora dos sintomas.',
    ],
  },
  'sindrome-cushing-gatos': {
    whatIsIt:
      'A síndrome de Cushing no gato é rara: o organismo produz cortisol em excesso, quase sempre por tumor na hipófise. Muitos gatos afetados também têm diabetes difícil de controlar e pele extremamente frágil — que se rasga com facilidade.',
    keyPoints: [
      'Doença incomum no gato — suspeitar quando o diabético não responde bem à insulina e a pele fica fina como papel.',
      'Diferente do cão, calcificação da pele é rara e o exame de enzima hepática pode ser normal.',
      'Trilostano pode ajudar, mas exige monitoramento rigoroso da glicemia para evitar hipoglicemia.',
    ],
  },
  'hipoadrenocorticismo-addison': {
    whatIsIt:
      'A doença de Addison é a falta de produção de cortisol e aldosterona pelas adrenais. Sem esses hormônios, o corpo não tolera estresse e perde o controle de hidratação e eletrólitos.',
    keyPoints: [
      'Conhecida como “grande imitadora” — sintomas vagos confundem com gastroenterite.',
      'Pode causar colapso súbito, vômitos, fraqueza e tremores.',
      'Reposição hormonal diária e monitoramento de sódio/potássio controlam a doença.',
    ],
  },
  'hipertireoidismo-felino': {
    whatIsIt:
      'O hipertireoidismo felino acontece quando a tireoide produz hormônios em excesso, deixando o metabolismo do gato acelerado o tempo todo. Na maioria dos casos é causado por um crescimento benigno da tireoide, não por infecção. É muito comum em gatos idosos.',
    keyPoints: [
      'Perde peso mesmo comendo muito, fica agitado e taquicárdico — mas alguns gatos ficam apáticos e com pouco apetite.',
      'O exame de sangue T4 (tiroxina total) é o primeiro passo; resultado normal não descarta a doença em todos os casos.',
      'Tratar é importante mesmo se o rim parecer “bom” nos exames — a doença pode estar mascarando problemas renais. Radioiodo (^131I) costuma curar; remédio ou dieta y/d controlam, mas não eliminam o nódulo.',
    ],
  },
  'hipotireoidismo-adquirido-caes-gatos': {
    whatIsIt:
      'O hipotireoidismo adquirido é quando a tireoide deixa de produzir hormônios suficientes ao longo da vida. Em cães, isso costuma ser destruição gradual da glândula; em gatos, frequentemente ocorre após tratamento de hipertireoidismo.',
    keyPoints: [
      'Exame T4 baixo sozinho não confirma — doenças sistêmicas também reduzem o T4.',
      'Cão: remédio diário (levotiroxina) ajustado por peso e exames de controle.',
      'Gato: dose por gato (não por kg); monitorar rim após radioiodo se aplicável.',
    ],
  },
  'hipotireoidismo-congenito-caes-gatos': {
    whatIsIt:
      'O hipotireoidismo congênito é a falta de hormônios tireoidianos desde o nascimento, por glândula ausente, malformada ou incapaz de produzir hormônio. O filhote não cresce e amadurece normalmente.',
    keyPoints: [
      'Filhote pequeno, ossos atrasados, cabeça grande, orelhas caídas ou surdez — investigar cedo.',
      'Tratamento precoce (idealmente antes de 12 semanas) protege o desenvolvimento neurológico.',
      'Reposição hormonal é geralmente vitalícia; exames acompanham crescimento e hormônios.',
    ],
  },
  'doencas-trato-urinario-inferior-felino-dtuif': {
    whatIsIt:
      'A DTUIF (doença do trato urinário inferior felino) agrupa problemas de bexiga e uretra em gatos — dor ao urinar, sangue na urina ou, no macho, obstrução uretral que impede urinar.',
    keyPoints: [
      'Urinar fora da caixa muitas vezes é dor, não “vingança”.',
      'Obstrução uretral em machos é emergência — pode matar em horas.',
      'Manejo inclui analgesia, hidratação, dieta úmida e redução de estresse ambiental.',
    ],
  },
  'asma-felina': {
    whatIsIt:
      'A asma felina é uma alergia das vias aéreas pequenas dos pulmões. O gato desenvolve inflamação, broncoconstrição e tosse ou crise respiratória com sibilos.',
    keyPoints: [
      'Comum em gatos jovens/adultos, especialmente Siamês e orientais.',
      'Crise com dificuldade para respirar é emergência — minimizar estresse.',
      'Corticoide (inalatório na manutenção) trata a inflamação; broncodilatador é resgate.',
    ],
  },
  'bronquite-cronica-caes-gatos': {
    whatIsIt:
      'A bronquite crônica é tosse quase diária por pelo menos dois meses, sem outra causa identificada. É inflamação persistente das vias aéreas pequenas, diferente da asma felina.',
    keyPoints: [
      'Diagnóstico de exclusão — descartar coração, parasitas e infecção antes de rotular.',
      'Comum em cães pequenos de meia-idade a idosos.',
      'Corticoide inalatório e controle ambiental são base; antibiótico só se infecção comprovada.',
    ],
  },
  'granuloma-eosinofilico-felino': {
    whatIsIt:
      'O complexo de granuloma eosinofílico felino (EGC) são lesões de pele ou boca causadas por reação alérgica exagerada — úlceras no lábio, placas ou linhas de granuloma.',
    keyPoints: [
      'Muito ligado a alergia a pulgas, alimento ou ambiente.',
      'Controle rigoroso de pulgas em todos os animais da casa é obrigatório.',
      'Corticoide ou ciclosporina tratam a inflamação; investigar causa evita recidiva.',
    ],
  },
  'tumores-mamarios-caes-gatos': {
    whatIsIt:
      'Tumores mamários são crescimentos nas glândulas mamárias. Em cães podem ser benignos ou malignos; em gatos a maioria dos carcinomas é agressiva e exige cirurgia ampla.',
    keyPoints: [
      'Qualquer nódulo mamário deve ser examinado — não esperar crescer.',
      'Castragem precoce reduz risco em cadelas; histopatologia define prognóstico.',
      'Estadiamento (TNM, linfonodo) orienta se quimioterapia é necessária.',
    ],
  },
  'mastite-caes-gatos': {
    whatIsIt:
      'A mastite é infecção e inflamação da glândula mamária no pós-parto. A mama fica quente, dolorida e o leite pode sair alterado; a cadela/gata pode ficar febril e prostrada.',
    keyPoints: [
      'Comum no puerpério; filhotes podem adoecer se mamarem leite contaminado.',
      'Emergência se febre alta, mama necrosada ou choque.',
      'Antibiótico adequado, analgesia, ordenha/drenagem e cuidado da ninhada são essenciais.',
    ],
  },
  'peritonite-infecciosa-felina': {
    whatIsIt:
      'A PIF (peritonite infecciosa felina) é uma doença grave que surge em uma pequena parte dos gatos infectados pelo coronavírus felino comum. O vírus passa a se multiplicar nos macrófagos e causa inflamação em vários órgãos — com ou sem acúmulo de líquido na barriga ou no peito.',
    keyPoints: [
      'Teste positivo para coronavírus nas fezes ou no sangue não significa PIF — a doença exige outros achados juntos.',
      'Se houver líquido na barriga ou no peito, coletá-lo costuma ser o exame mais útil.',
      'Com antiviral GS-441524 oral, muitos gatos se recuperam — não é mais sentença automática de morte.',
    ],
  },
  'imunodeficiencia-felina-fiv': {
    whatIsIt:
      'O FIV (vírus da imunodeficiência felina) é um lentivirus que enfraquece gradualmente a defesa imune do gato, semelhante ao HIV em humanos — mas só infecta felinos. A transmissão principal ocorre por mordida profunda durante brigas; convivência pacífica raramente transmite.',
    keyPoints: [
      'O teste rápido detecta anticorpos, não o vírus — resultado positivo não significa doença grave imediata.',
      'Gato FIV positivo não deve ser eutanasiado só pelo teste; muitos vivem bem por anos com acompanhamento.',
      'Prevenção: castrar, evitar brigas, testar gatos novos e repetir o teste ≥60 dias após exposição a mordida.',
    ],
  },
  'insuficiencia-pancreatica-exocrina-caes-gatos': {
    whatIsIt:
      'A insuficiência pancreática exócrina (IPE) acontece quando o pâncreas deixa de produzir enzimas digestivas suficientes. Com isso, o animal não digere bem os alimentos — emagrece, tem fezes volumosas ou diarreia, e cães muitas vezes comem muito mais que o normal.',
    keyPoints: [
      'O diagnóstico é feito com exame de sangue (TLI) após jejum — corte atual em cães: ≤5,5 µg/L.',
      'O tratamento é para a vida toda: enzimas pancreáticas em toda refeição + vitamina B12 quando necessário.',
      'Com tratamento correto, a maioria dos cães e gatos responde bem e pode ter vida normal.',
    ],
  },
  'prostatite-caes-gatos': {
    whatIsIt:
      'A prostatite é a inflamação da próstata, quase sempre por infecção bacteriana. É comum em cães machos não castrados e muito rara em gatos. Pode causar febre e dor intensa (forma aguda) ou passar despercebida e aparecer só como infecção urinária que sempre volta (forma crônica).',
    keyPoints: [
      'Cão macho inteiro com infecção urinária merece avaliação da próstata — especialmente se a infecção recorre.',
      'O tratamento exige antibiótico adequado por várias semanas e, na maioria dos casos, controle da próstata aumentada (castração ou medicamento hormonal).',
      'Em gatos, doença da próstata é incomum — próstata aumentada exige investigação cuidadosa, incluindo possibilidade de tumor.',
    ],
  },
  'gengivoestomatite-cronica-felina': {
    whatIsIt:
      'A gengivoestomatite crônica felina (FCGS) é uma doença inflamatória grave da boca do gato, muito dolorosa, em que a inflamação vai além da gengiva e atinge a mucosa oral. Não é “gengivite forte” nem infecção bacteriana simples — envolve resposta imune desregulada contra estímulos na boca (dentes, biofilme, vírus).',
    keyPoints: [
      'Sinais comuns: dor ao comer, salivação, mau hálito, perda de peso e recusa alimentar mesmo com interesse pela comida.',
      'O tratamento de primeira linha é odontológico: exame completo sob anestesia, radiografias de todos os dentes e extrações dentárias (parciais ou totais) com analgesia adequada.',
      'Antibióticos e corticoides sozinhos não curam — podem dar melhora temporária. Cerca de dois terços dos gatos melhoram muito após extrações; os refratários precisam de terapias especializadas.',
    ],
  },
  'doenca-periodontal-caes': {
    whatIsIt:
      'A doença periodontal em cães é uma inflamação crônica provocada pelo acúmulo de biofilme (placa bacteriana) e pela resposta de defesa do próprio cão. Começa com gengivite (gengiva vermelha e inflamada, que pode voltar ao normal) e, se não tratada, vira periodontite, destruindo o osso e os tecidos que seguram os dentes.',
    keyPoints: [
      'Tártaro visível não mede a gravidade: dentes limpos por fora podem ter perda óssea escondida por dentro.',
      'O diagnóstico completo exige anestesia geral com tubo de respiração, radiografias de toda a boca e sondagem milimétrica de cada dente.',
      'Antibióticos não tratam nem curam a doença periodontal sozinhos; o tratamento principal é a limpeza profissional, raspagem subgengival, extração dos dentes condenados e escovação diária em casa.',
    ],
  },
  'doenca-periodontal-gatos': {
    whatIsIt:
      'A doença periodontal em gatos é uma inflamação dos tecidos de sustentação dos dentes causada pela placa bacteriana. Os gatos costumam esconder a dor e continuar comendo normalmente mesmo com infecção ou dentes abalados.',
    keyPoints: [
      'No gato, o sulco normal ao redor do dente é muito raso (até 1 mm). Qualquer profundidade maior aponta doença.',
      'Não confundir periodontite com reabsorção dentária (Tooth Resorption) nem com estomatite (FCGS) — cada uma exige cirurgia ou tratamento específico.',
      'Radiografias de boca inteira sob anestesia são indispensáveis para identificar raízes escondidas, dentes quebrados e reabsorções internas.',
    ],
  },
  'diabetes-mellitus-canina': {
    whatIsIt:
      'O diabetes mellitus em cães é uma doença hormonal metabólica causada pela perda de produção de insulina pelo pâncreas. Sem insulina, a glicose (açúcar) se acumula no sangue e o cão perde a capacidade de usar a energia dos alimentos, perdendo peso rapidamente apesar de comer mais.',
    keyPoints: [
      'Sinais clássicos: o cão bebe muita água (polidipsia), faz muita urina (poliúria), sente muita fome (polifagia) e emagrece.',
      'O cão diabético necessita de aplicações diárias de insulina exógena por toda a vida e horários fixos de alimentação.',
      'Catarata nos dois olhos é uma complicação muito comum e rápida; a castração de cadelas fêmeas é fundamental para controlar os hormônios.',
    ],
  },
  'diabetes-mellitus-felina': {
    whatIsIt:
      'O diabetes mellitus em gatos ocorre quando o corpo do gato desenvolve resistência à insulina e o pâncreas perde a capacidade de liberar o hormônio adequadamente, frequentemente associado ao excesso de peso e sedentarismo.',
    keyPoints: [
      'Sinais clássicos: urina em excesso, sede aumentada, perda de peso com perda de músculos e fraqueza nas patas traseiras (postura plantígrada).',
      'Gatos possuem chance de remissão diabética quando diagnosticados e tratados precocemente com dieta low-carb e controle de peso.',
      'Além das insulinas (Glargina/ProZinc), alguns gatos selecionados e estáveis podem usar comprimidos modernos (SGLT2), que exigem acompanhamento atento.',
    ],
  },
  'dermatite-atopica-canina': {
    whatIsIt:
      'A dermatite atópica canina é uma alergia de pele crônica e hereditária em cães. Uma falha na proteção natural da pele permite que poeira, ácaros e pólen penetrem e causem coceira intenda e vermelhidão.',
    keyPoints: [
      'Locais afetados: patinhas (lamber os pés), redor dos olhos, focinho, orelhas (otite que vai e volta), axilas e virilhas.',
      'Não existe exame de sangue para "dar o diagnóstico de atopia" — os exames alérgicos servem apenas para criar a vacina de alergia (imunoterapia).',
      'Pioras repentinas acontecem principalmente por infecções por bactérias ou fungos da própria pele, exigindo banhos medicinais e acompanhamento constante.',
    ],
  },
  'sindrome-cutanea-atopica-felina': {
    whatIsIt:
      'A síndrome cutânea atópica felina (FASS) é uma reação alérgica da pele do gato a alérgenos do ambiente. No gato, a alergia se manifesta por coceira e feridas típicas, frequentemente causadas pelo hábito de se lamber em excesso.',
    keyPoints: [
      'Padrões comuns: perda de pelos nas coxas e barriga, carocinhos com casquinha no pescoço (dermatite miliar) ou feridas de coceira no pescoço e rosto.',
      'O gato costuma se lamber escondido ou à noite. A ausência de coceira vista pelo tutor não significa que o gato não tenha dor alérgica.',
      'Exige descartar pulgas, ácaros de pele e alergia alimentar antes do diagnóstico definitivo. A ciclosporina e os corticoides são o tratamento principal.',
    ],
  },
  'doenca-do-disco-intervertebral-caes': {
    whatIsIt:
      'A doença do disco intervertebral (popularmente chamada de hérnia de disco) em cães acontece quando os discos amortecedores da coluna se desgastam e se deslocam para dentro do canal por onde passa a medula espinhal, causando dor ou paralisia nas patas.',
    keyPoints: [
      'Raças de pernas curtas (como Dachshund, Bulldog Francês e Beagle) têm predisposição genética forte para apresentar hérnia grave em idade jovem.',
      'Sinais de alerta: dor intensa nas costas ou pescoço, andar cambaleante, perda de movimento nas patas traseiras e perda do controle da urina.',
      'A avaliação médica imediata e exames como a Ressonância Magnética determinam se o cão precisa de cirurgia de descompressão urgente ou de repouso absoluto em gaiola.',
    ],
  },
  'doenca-do-disco-intervertebral-gatos': {
    whatIsIt:
      'A doença do disco intervertebral em gatos é uma condição menos frequente do que em cães, que ocorre principalmente em gatos mais velhos devido ao desgaste natural da coluna ou esforço ao saltar.',
    keyPoints: [
      'Sinais no gato: relutância em saltar em locais altos, dor nas costas ou na cauda, andar fraco nas patas traseiras ou dificuldade para urinar.',
      'Outras doenças graves felinas (como tumores ou a PIF neurológica) causam sintomas parecidos, exigindo Ressonância Magnética para confirmação.',
      'O tratamento inclui remédios específicos para dor neuropática e repouso, ou cirurgia de descompressão em casos de paralisia grave.',
    ],
  },
  'sindrome-mielodisplasica-caes-gatos': {
    whatIsIt:
      'A síndrome mielodisplásica (MDS) é uma doença rara da medula óssea (a "fábrica de sangue" localizada dentro dos ossos). Nela, a medula trabalha ativamente e produz muitas células, mas essas células nascem com defeitos graves e morrem antes de conseguirem sair para a circulação sanguínea. Ocorre então uma situação paradoxal: a medula fica completamente cheia e acelerada, mas o sangue periférico fica vazio. Como consequência, o animal desenvolve falta de glóbulos vermelhos (anemia profunda que não melhora), falta de glóbulos brancos de defesa (baixa imunidade com risco de infecções graves) ou falta de plaquetas (risco de sangramentos espontâneos). Em gatos, a enfermidade possui forte ligação histórica com o vírus da leucemia felina (FeLV).',
    keyPoints: [
      'Paradoxo da medula cheia e sangue vazio: a fábrica opera em alta velocidade, mas quase todas as células morrem lá dentro antes de chegar às ruas.',
      'Anemia persistente e palidez: o animal fica apático, cansa muito rápido e suas gengivas tornam-se muito pálidas ou esbranquiçadas.',
      'Risco crítico de infecções: a falta de neutrófilos maduros permite que bactérias simples causem febre alta e infecções generalizadas graves (sepse).',
      'Sangramentos espontâneos: o mau funcionamento ou a queda das plaquetas provoca pontinhos vermelhos na gengiva e pele (petéquias), hematomas e sangramentos.',
      'Diferenciar de causas reversíveis: nem toda displasia é câncer; remédios tóxicos, infecções e doenças autoimunes podem imitar a doença temporariamente e têm cura.',
      'Tratamento de suporte contínuo: não existe cura simples; o manejo exige transfusões de sangue planejadas, antibióticos para febre e acompanhamento especializado com oncologista veterinário.',
    ],
  },
  'linfoma-cutaneo-caes-gatos': {
    whatIsIt:
      'O linfoma cutâneo é um câncer dos linfócitos (células de defesa) que se instala primariamente na pele do cão ou gato. Ele não é uma doença única, mas sim um grupo de tumores com comportamentos muito diferentes. A forma mais comum no cão é o linfoma epiteliotrópico (ou micose fungoide), em que as células neoplásicas têm atração pelas camadas superficiais da pele, causando descamação, vermelhidão intensa, perda de cor (despigmentação) no focinho e nos lábios, feridas e nódulos que frequentemente são confundidos com alergias ou infecções por meses.',
    keyPoints: [
      'Pode imitar com perfeição alergias crônicas, sarnas ou doenças autoimunes — coceira e melhora temporária com corticoides NÃO descartam câncer de pele.',
      'A biópsia precoce de pele em pacientes idosos com feridas, descamações que não saram ou perda de cor nos lábios e nariz é o único exame capaz de dar o diagnóstico correto.',
      'Animais com apenas uma lesão localizada têm prognóstico muito mais favorável (podendo fazer cirurgia ou radioterapia), enquanto quadros generalizados costumam ser tratados com quimioterapia oral (como a lomustina) ou retinoides para controlar a doença e preservar o bem-estar.',
    ],
  },
  'megacolon-caes-gatos': {
    whatIsIt:
      'O megacólon é uma condição em que a porção final do intestino (o cólon) perde a força para empurrar o cocô para fora, dilatando-se e acumulando fezes duras e ressecadas (fecalomas). Com o tempo, as paredes do intestino ficam esticadas demais e perdem o movimento, tornando o animal incapaz de evacuar sozinho. Nos gatos, na maioria das vezes isso ocorre por uma fraqueza própria do músculo do intestino (forma idiopática) ou por desidratação crônica ligada aos rins e dores na coluna; nos cães, quase sempre acontece por algum obstáculo físico no caminho, como próstata aumentada, fraturas antigas da bacia ou ingestão de ossos.',
    keyPoints: [
      'Dificuldade de evacuar não é sempre intestino: gatos machos fazendo força excessiva na caixa de areia precisam ter a bexiga examinada com urgência para afastar obstrução urinária, que é uma emergência fatal.',
      'Nunca use enemas humanos contendo fosfato (como Fleet Enema) em gatos, pois são altamente tóxicos e podem causar colapso circulatório rápido e fatal por desequilíbrio de minerais.',
      'O tratamento inicial exige hidratação na veia antes de tentar tirar as fezes, além de laxantes específicos seguros (como o PEG 3350) e remédios para estimular o intestino (como a cisaprida, somente após retirar as fezes duras).',
      'Dar muita fibra pode piorar: se o intestino já perdeu a capacidade de contrair, mais fibra só vai criar um bolo fecal ainda maior; nesses casos graves, dietas muito fáceis de digerir e com pouco resíduo funcionam muito melhor.',
      'Quando os remédios e a dieta deixam de funcionar e o gato volta a travar com frequência, a cirurgia de retirada da porção doente do intestino (colectomia subtotal) devolve a qualidade de vida ao paciente.',
    ],
  },
  'linfoma-mediastinal-caes-gatos': {
    whatIsIt:
      'O linfoma mediastinal é um tipo de câncer que afeta os glóbulos brancos de defesa (chamados linfócitos) e se desenvolve na região frontal do peito do cão ou gato, chamada mediastino (onde ficam o timo e os gânglios linfáticos do tórax). Essa massa de células tumorais cresce dentro do peito e esmaga os pulmões e os vasos sanguíneos principais, dificultando muito a respiração e acumulando líquido ao redor dos pulmões (derrame pleural). Em cães, esse tumor quase sempre vem acompanhado de uma alteração grave no sangue: o aumento excessivo de cálcio (hipercalcemia), que faz o animal urinar e beber muita água. Em gatos, ele costuma se manifestar de repente como uma falta de ar grave e emergencial, com a respiração rápida e superficial.',
    keyPoints: [
      'Emergência de falta de ar: quando o animal está com dificuldade grave para respirar, a prioridade absoluta na clínica é colocá-lo no oxigênio e drenar o líquido do peito (toracocentese) para ele respirar melhor antes de qualquer raio-X estressante.',
      'Não é um tumor para cirurgia de peito: o linfoma é uma doença do sistema imunológico que responde muito rápido e muito bem aos remédios de quimioterapia na veia; abrir o peito para operar a massa não cura e traz riscos imensos desnecessários.',
      'Cuidado com corticoide antes da hora: dar remédios à base de cortisona (como prednisona ou dexametasona) antes de colher a amostra com a agulha pode esconder o tumor nos exames e fazer com que o câncer fique resistente à quimioterapia.',
      'Cães com muita sede e xixi: o aumento do cálcio provocado pelo tumor ataca os rins; por isso, cães com linfoma mediastinal muitas vezes começam bebendo baldes de água antes de terem qualquer sintoma de tosse ou cansaço.',
      'Gatos jovens e o vírus da FeLV: o linfoma do peito é clássico em gatos jovens que têm o vírus da leucemia felina, mas muitos gatos sem o vírus (especialmente siameses) também desenvolvem a doença e têm excelentes chances de controle quando tratados com os medicamentos corretos.',
      'O tratamento padrão envolve ciclos planejados de quimioterapia combinada (como os protocolos CHOP ou COP), protegendo os rins e monitorando a contagem de células sanguíneas em cada visita para garantir total segurança e qualidade de vida.',
    ],
  },
  'piotorax-caes-gatos': {
    whatIsIt:
      'O piotórax (ou empiema pleural) é uma infecção bacteriana grave com acúmulo de pus dentro do peito (no espaço pleural, que envolve os pulmões). Em condições normais, existe apenas uma fina película líquida para lubrificar os pulmões durante a respiração. No piotórax, bactérias entram nesse espaço fechado e provocam uma inflamação intensa, formando grande volume de pus e fibrina que esmaga os pulmões e impede a entrada de ar. Em gatos, a causa mais comum são mordidas e arranhões de outros gatos em brigas, cujos dentes inoculam bactérias da saliva para dentro do peito; a pele fecha rapidamente por fora, mas a infecção cresce por dentro. Em cães, a causa mais frequente é a inalação de espiguetas de gramíneas e corpos estranhos vegetais que perfuram o pulmão e levam bactérias para o tórax.',
    keyPoints: [
      'Emergência respiratória crítica: se o animal estiver com respiração rápida, superficial, barriga se movimentando muito para respirar ou boca aberta (em gatos), ele precisa de oxigênio e de alívio urgente com drenagem de líquido do peito antes de qualquer exame demorado ou estressante.',
      'Remédio sozinho não resolve: por ser uma infecção em um espaço fechado com pus espesso e teias de fibrina, os antibióticos na veia não conseguem penetrar e limpar tudo sozinhos; colocar um dreno no peito para aspirar o pus e lavar com soro morno é tão importante quanto o remédio.',
      'Dreno fino em gatos: estudos veterinários comprovam que tubos pequenos e delicados (fio-guiados de 6 F) funcionam muito bem e são muito seguros em gatos, permitindo esvaziar o peito e fazer lavagens sem cirurgias traumáticas.',
      'Cuidado com antibióticos específicos: em gatos, o antibiótico enrofloxacina jamais pode ser usado em doses altas pelo risco real de causar cegueira permanente; existem opções seguras e eficazes indicadas pelo veterinário.',
      'Cães e espiguetas vegetais: em cães que passeiam em campos com capim seco, pedacinhos pontiagudos de plantas podem migrar e ficar presos no peito; se o dreno não resolver em 2 a 3 dias, pode ser necessária uma tomografia e cirurgia para remover o vegetal e o tecido danificado.',
      'Tratamento longo em casa: após a melhora no hospital e a retirada do dreno, o paciente ainda precisará tomar antibióticos em comprimido por 3 a 6 semanas para garantir que a infecção não volte.',
    ],
  },
  'quilotorax-caes-gatos': {
    whatIsIt:
      'O quilotórax é uma doença grave em que ocorre o acúmulo de quilo dentro do peito (no espaço pleural, que envolve os pulmões). O quilo é um líquido leitoso especial da circulação linfática, rico em gorduras que foram absorvidas no intestino, além de proteínas e células de defesa (linfócitos). Em condições normais, esse líquido viaja por um canal chamado ducto torácico e desemboca no sangue. Quando esse caminho é bloqueado ou quando a pressão nas veias aumenta muito (especialmente por doenças do coração em gatos), o líquido não consegue escoar, vaza pelos vasos linfáticos e se acumula no peito. Esse líquido aperta os pulmões, impedindo que eles se encham de ar e fazendo com que o paciente fique sem fôlego.',
    keyPoints: [
      'Falta de ar é uma emergência absoluta: se o gato ou cão estiver respirando rápido, com a barriga se mexendo com força, deitado esticado ou respirando de boca aberta (em gatos), leve-o imediatamente ao hospital; ele precisa de oxigênio e de alívio rápido retirando o líquido com agulha fina antes de qualquer raio-X.',
      'Coração é a principal causa em gatos: pesquisas recentes comprovam que mais da metade dos gatos com quilotórax têm um problema cardíaco por trás (como cardiomiopatias); por isso, fazer um ecocardiograma do coração é fundamental.',
      'Não se engane pela cor leitosa: embora o quilo costume parecer leite, outras doenças (como infecções ou tumores) também podem deixar o líquido esbranquiçado; o laboratório precisa medir as gorduras (triglicerídeos) no líquido e no sangue para confirmar.',
      'Perda de nutrientes e fraqueza: como o quilo é rico em gordura, proteínas e células imunológicas, drenar o peito muitas vezes faz o animal perder peso e defesas; a alimentação precisa ser saborosa e rica para ele não ficar fraco.',
      'Atenção à complicação chamada pleurite fibrosante: se o quilo ficar muito tempo irritando os pulmões, forma-se uma casca dura de cicatriz que não deixa o pulmão abrir de novo mesmo depois de tirar todo o líquido; por isso não se deve esperar meses antes de decidir operar.',
      'Cirurgia e acompanhamento em casa: quando os remédios ou a dieta não resolvem em poucas semanas, a cirurgia para amarrar o canal linfático (ducto torácico) pode ser necessária. Em casa, o tutor deve contar a respiração do animal dormindo todos os dias (deve ser menor que 30 movimentos por minuto).',
    ],
  },
  'cistite-enfisematosa-caes-gatos': {
    whatIsIt:
      'A cistite enfisematosa é uma forma rara e perigosa de infecção da bexiga em que bactérias produtoras de gás colonizam o órgão e fermentam açúcares ou proteínas, fazendo com que bolhas de gás se formem dentro da bexiga e fiquem presas no meio das camadas musculares da sua parede. Isso causa inflamação profunda, dor intensa e risco de que as bactérias e o gás subam pelos canais urinários até os rins.',
    keyPoints: [
      'Gás na bexiga é a marca registrada: o exame de ultrassom ou raio-X revela um reflexo brilhante característico com sombra suja e pequenas bolhas de ar na parede da bexiga.',
      'Não acontece apenas em animais diabéticos: embora o excesso de açúcar na urina do diabetes ajude as bactérias a fermentar, cães e gatos não diabéticos que têm retenção de urina, problemas na coluna ou pedras na bexiga também podem ter a doença.',
      'Sintomas de alerta: urina avermelhada com sangue, dor ao urinar, tentativas frequentes de fazer xixi com saída de poucas gotas, dor na barriga e, em casos raros, saída de bolhas de gás pelo xixi (pneumatúria).',
      'Cultura de urina é obrigatória: para curar a doença e não criar bactérias super-resistentes, o veterinário precisa colher a urina e fazer o teste de antibiograma para descobrir o remédio exato.',
      'Cuidado com a dose em gatos: o antibiótico enrofloxacina jamais pode ser usado em doses altas em gatos pelo perigo de causar cegueira permanente irreversível.',
      'Tratamento completo e controle da causa: o tratamento com antibióticos costuma ser prolongado e a ultrassonografia deve ser repetida para ter certeza de que todo o gás desapareceu da bexiga.',
    ],
    whatIs: 'A cistite enfisematosa é uma inflamação grave e incomum da bexiga causada por bactérias que produzem gás dentro do órgão ou na sua própria parede muscular. Isso faz com que se formem pequenas bolhas de ar na parede ou na urina.',
    warningSigns: 'Urina avermelhada ou com sangue vivo, esforço doloroso para urinar, urinar várias vezes em pequenas quantidades, dor na barriga, urina com aspecto espumoso ou com saída de gás (muito raro), febre, fraqueza e vômitos.',
    diagnosis: 'O diagnóstico é confirmado por exames de imagem, principalmente o ultrassom da bexiga (que mostra um reflexo brilhante típico causado pelo gás) e radiografias ou tomografia. A cultura da urina é indispensável para identificar a bactéria exata e o antibiótico correto.',
    homeCare: 'Administrar os antibióticos rigorosamente até o fim prescrito sem interrupções, controlar o diabetes ou problemas de retenção urinária com o veterinário, garantir água fresca em abundância e retornar para exames de imagem de controle.',
  },
  'trombocitopenia-caes-gatos': {
    whatIsIt:
      'A trombocitopenia é uma alteração grave no sangue caracterizada pela diminuição acentuada do número de plaquetas. As plaquetas são pequenos corpúsculos celulares que funcionam como os primeiros bombeiros do corpo humano e animal: sempre que um pequeno vaso sanguíneo se rompe ou sofre atrito, as plaquetas chegam rapidamente e se colam umas nas outras para formar um tampão protetor que estanca o sangramento. Quando a quantidade de plaquetas cai para níveis perigosamente baixos, o animal perde essa proteção natural e pode apresentar hemorragias espontâneas pela pele, boca, nariz, olhos e órgãos internos.',
    keyPoints: [
      'Confirmar antes de tratar: em cães e principalmente em gatos, as plaquetas frequentemente se juntam em pequenos gruminhos dentro do tubinho de coleta de sangue com EDTA, fazendo com que a máquina automática conte um número falsamente muito baixo (chamado pseudotrombocitopenia). O veterinário deve sempre olhar uma gota de sangue no microscópio para ter certeza absoluta de que a contagem é real antes de iniciar remédios pesados.',
      'Sinais clássicos de alerta em casa: pequenos pontinhos vermelhos na barriga, virilha ou gengiva (petéquias), manchas roxas espalhadas que parecem hematomas (equimoses), sangramento pelas narinas (epistaxe), sangue vivo na urina ou fezes pastosas pretas como borra de café (melena).',
      'Fezes em borra de café exigem socorro urgente: a melena indica que há sangramento importante no estômago ou intestino; estudos comprovam que esse é um dos sinais de maior perigo e exige internação imediata.',
      'Peculiaridade da raça Cavalier King Charles: muitos cães dessa raça nascem com uma característica genética inofensiva de ter plaquetas gigantes em menor número. Eles não têm doença alguma, não sangram e jamais devem receber remédios imunossupressores.',
      'Repouso absoluto e cuidados delicados: durante a fase crítica com plaquetas baixas, o animal deve ficar em repouso em ambiente acolchoado, sem pular ou correr, e não deve mastigar brinquedos duros ou ossos para não machucar a boca.',
      'Nunca usar remédios por conta própria: anti-inflamatórios comuns humanos ou veterinários pioram drasticamente o sangramento e são terminantemente proibidos; em gatos, o remédio azatioprina é estritamente proibido por ser fatal.',
      'Tratamento e desmame paciente: o tratamento da forma imunomediada é feito com corticoides e outros imunossupressores, e a redução da dose deve ser muito lenta ao longo de meses para evitar que a doença volte de repente.',
    ],
    whatIs: 'A trombocitopenia é a redução do número de plaquetas no sangue. As plaquetas são pequenos fragmentos de células responsáveis por estancar sangramentos formando o tampão inicial nos vasos sanguíneos. Quando estão muito baixas, o corpo perde essa primeira linha de defesa, facilitando hemorragias espontâneas.',
    warningSigns: 'Pequenos pontinhos vermelhos ou arroxeados na pele ou gengiva (petéquias), manchas roxas parecidas com hematomas (equimoses), sangramento pelo nariz (epistaxe), sangue vivo na urina ou fezes muito escuras com aspecto de borra de café (melena), sangramento espontâneo na boca, apatia intensa e fraqueza.',
    diagnosis: 'O primeiro passo obrigatório é examinar uma gota de sangue no microscópio (esfregaço) para confirmar se as plaquetas estão realmente baixas ou se apenas se juntaram em grumos no tubo de coleta (especialmente comum em gatos). Confirmada a queda real, são realizados exames de sangue gerais, testes de coagulação, testes para doenças transmitidas por carrapatos, ultrassom abdominal e, em casos selecionados, exame da medula óssea.',
    homeCare: 'Manter o animal em repouso absoluto em ambiente acolchoado e sem pisos escorregadios para evitar batidas ou traumas. Nunca administrar medicamentos anti-inflamatórios humanos (como aspirina ou ibuprofeno) ou dipirona sem ordem expressa do veterinário. Administrar os imunossupressores nos horários exatos prescritos e retornar pontualmente para as dosagens de controle de plaquetas.',
  },
  'anemia-caes-gatos': {
    whatIsIt:
      'A anemia é uma síndrome clínica séria caracterizada pela redução do número de glóbulos vermelhos (hemácias) ou da quantidade de hemoglobina circulando no sangue do animal. As hemácias funcionam como verdadeiros veículos de entrega biológicos: cada uma delas é carregada de hemoglobina, uma molécula especializada em capturar o oxigênio nos pulmões e transportá-lo até todos os órgãos e tecidos do corpo. Quando a quantidade de hemácias cai, os tecidos passam a sofrer por falta de oxigênio (hipóxia), fazendo com que o coração precise bater muito mais rápido para tentar compensar e o animal fique fraco, cansado e sem ar.',
    keyPoints: [
      'Anemia não é uma doença única: ela é sempre um sinal de que algo está errado no organismo. O veterinário precisa descobrir se o animal está perdendo sangue (hemorragia), se o corpo está destruindo as hemácias por engano (hemólise imunomediada ou toxinas) ou se a medula óssea parou de fabricar sangue novo (doença renal, inflamação crônica ou problemas na própria medula).',
      'O exame de reticulócitos é fundamental: os reticulócitos são as hemácias bebês recém-saídas da medula. Contar essas células no sangue é a única forma de saber se a fábrica da medula está trabalhando para repor o sangue ou se está parada.',
      'Atenção especial com os gatos: os gatos possuem dois tipos de reticulócitos (agregados e pontilhados); apenas os agregados mostram se o gato está reagindo no momento da crise. Além disso, os gatos são extremamente sensíveis a intoxicações por remédios humanos como o paracetamol, que destroem os glóbulos vermelhos.',
      'Sinais de alerta em casa: gengivas e língua muito pálidas ou amareladas, cansaço extremo e fraqueza ao caminhar, respiração muito rápida mesmo em repouso, coração disparado, urina avermelhada escura ou fezes pretas parecendo borra de café (que indicam sangramento no estômago ou intestino).',
      'Nem toda anemia precisa de transfusão imediata: animais que foram perdendo sangue lentamente ao longo de semanas se adaptam surpreendentemente bem e podem estar alertas com taxas baixíssimas; já perdas repentinas causam choque grave. A transfusão é decidida pelo estado clínico e sintomas do animal, não apenas pelo número da máquina.',
      'Ferro não cura qualquer anemia: dar suplemento de ferro sem indicação é inútil e perigoso; o ferro só deve ser usado quando há perda crônica comprovada de ferro por sangramentos.',
      'Gatos exigem tipagem sanguínea obrigatória: os felinos possuem tipos de sangue rigorosamente incompatíveis; receber sangue incompatível causa reação fulminante imediata fatal. A tipagem antes da transfusão é uma regra inviolável.',
    ],
    whatIs: 'A anemia é a diminuição dos glóbulos vermelhos (eritrócitos) e da hemoglobina no sangue. Essas células são responsáveis por levar oxigênio dos pulmões para o cérebro, coração, músculos e todos os órgãos. Quando estão em falta, o animal sofre com falta de energia e oxigênio tecidual.',
    warningSigns: 'Gengivas e mucosas muito brancas ou amareladas (icterícia), fraqueza para levantar ou andar, respiração ofegante rápida mesmo sem calor, coração muito acelerado, desmaios, perda de apetite, urina muito escura ou fezes pretas pastosas como borra de café.',
    diagnosis: 'O primeiro exame é o hemograma completo com contagem de reticulócitos e análise detalhada da lâmina no microscópio para avaliar a forma das células. Em seguida, exames de ultrassom e raio-X procuram sangramentos internos ou tumores, e testes de sangue avaliam os rins, fígado e possíveis doenças transmitidas por carrapatos ou pulgas.',
    homeCare: 'Manter o animal em repouso absoluto em local confortável e ventilado, evitando qualquer estresse, pulos ou brincadeiras pesadas. Seguir rigorosamente os horários dos medicamentos prescritos (como imunossupressores ou protetores renais), jamais dar medicamentos humanos por conta própria e comparecer pontualmente para os retornos com exames de sangue.',
  },
  'leishmaniose-caes-gatos': {
    whatIsIt:
      'A leishmaniose é uma doença infecciosa crônica e zoonótica transmitida pela picada do mosquito-palha (flebotomíneo). Ao picar o animal, o inseto introduz um protozoário microscópico chamado Leishmania, que invade e se multiplica dentro das células de defesa do organismo (macrófagos). Em muitos cães e gatos, o sistema de defesa reage de forma desregulada: produz uma quantidade colossal de anticorpos que não conseguem matar o parasita e acabam formando pequenos grumos inflamatórios (imunocomplexos). Esses grumos circulam no sangue e se depositam nos rins, na pele, nas articulações e nos olhos, causando as principais complicações da doença.',
    keyPoints: [
      'Ter o parasita não é o mesmo que estar doente: o consenso veterinário atual (CLWG 2026) separa com rigor a infecção da doença ativa. Animais que foram expostos e têm anticorpos, mas não têm sintomas nem lesões no corpo, NÃO devem receber remédios pesados anti-Leishmania.',
      'O rim é o órgão mais importante: a complicação mais perigosa da leishmaniose é a inflamação dos rins por deposição de imunocomplexos. Isso faz com que o rim perca proteína na urina muito antes de a creatinina subir. O exame de urina com relação proteína/creatinina (UPC) é obrigatório e salva vidas.',
      'Sinais de alerta em cães: descamação seca parecendo caspa prateada, feridas no focinho e orelhas que não saram, queda de pelos ao redor dos olhos dando aspecto de óculos, unhas crescendo em velocidade espantosa e com formato torto (onicogrifose), sangramento no nariz e emagrecimento.',
      'Atenção máxima com os gatos: os gatos também pegam leishmaniose, mas costumam apresentar nódulos na pele, crostas no focinho e inflamação nos olhos com sangue (uveíte e hifema). Neles, a doença quase sempre aparece quando há outra imunidade baixa associada, como a FIV (aids felina) ou FeLV (leucemia felina).',
      'ALERTA FATAL DE VENENO PARA GATOS: remédios ou coleiras com permetrina formulados para cães são MORTAIS para gatos. Nunca coloque coleiras de cães em gatos.',
      'Legislação no Brasil: no Brasil, o tratamento de cães é rigorosamente fiscalizado pelo Ministério da Agricultura (MAPA). É proibido por lei usar remédios humanos; o único medicamento leishmanicida aprovado para cães no país é a miltefosina (Milteforan), associada ao alopurinol.',
      'Cálculos urinários pelo alopurinol: o alopurinol é indispensável para travar a multiplicação do protozoário, mas pode fazer com que se formem pedras de xantina na bexiga. O animal deve fazer exames de urina e ultrassom periódicos e comer ração com baixo teor de purinas se orientado pelo veterinário.',
      'Não há cura estéril total: o tratamento controla os sintomas, fecha as feridas e reduz drasticamente a carga do parasita, devolvendo ótima qualidade de vida, mas o protozoário permanece no corpo. O uso da coleira repelente deve continuar por toda a vida para proteger o animal e as pessoas ao redor.',
    ],
    whatIs: 'A leishmaniose é uma doença parasitária grave transmitida pela picada do mosquito-palha. O protozoário ataca as células de defesa e o organismo reage produzindo anticorpos em excesso, que acabam inflamando os rins, pele, articulações e olhos.',
    warningSigns: 'Descamação seca na pele com aspecto de caspa, perda de pelo ao redor dos olhos parecendo óculos, crescimento anormal e rápido das unhas (onicogrifose), emagrecimento mesmo comendo bem, feridas que não cicatrizam nas pontas das orelhas e focinho, sangramento nasal e olhos inflamados com secreção ou sangue.',
    diagnosis: 'O padrão ouro é a análise microscópica direta (citologia) de amostras de linfonodos ou medula óssea para enxergar o parasita dentro das células. Exames de sangue avaliam a quantidade de anticorpos (sorologia quantitativa) e a presença de DNA do parasita (PCR), além de urinálise com UPC para checar a saúde dos rins.',
    homeCare: 'Uso ininterrupto de coleira repelente com troca na data certa, administração diária rigorosa dos medicamentos prescritos sem falhas nos horários, alimentação com ração de qualidade com controle de purinas se prescrito e retornos a cada 3 a 6 meses para exames de sangue e urina.',
  },

  'cistite-idiopatica-felina': {
    whatIsIt:
      'A cistite idiopática felina (CIF ou FIC) é uma doença inflamatória crônica dolorosa da bexiga que afeta principalmente gatos jovens e de meia-idade. A palavra "idiopática" significa que a inflamação na parede da bexiga acontece sem que haja infecção bacteriana, pedras grandes ou tumores. As pesquisas veterinárias mais recentes comprovam que a CIF não é um problema isolado da bexiga: ela é a manifestação de uma sensibilidade profunda de todo o organismo do gato (Síndrome de Pandora). O cérebro do felino com CIF reage de forma hiperexcitada a mudanças na rotina e estresses ambientais, disparando sinais pelo sistema nervoso que liberam substâncias inflamatórias nos nervos da bexiga, causando dor intensa, espasmos e queimação para urinar.',
    keyPoints: [
      'Não é infecção urinária por bactérias: menos de 1% a 3% dos gatos jovens com sintomas urinários têm bactérias na bexiga. Portanto, antibióticos quase nunca são necessários e não devem ser usados sem cultura e antibiograma comprovando infecção.',
      'Urgência médica fatal em machos (obstrução uretral): se o gato macho tentar urinar várias vezes na caixinha, soltar apenas gotas ou nada, chorar de dor ou lamber o pênis com frequência, trata-se de uma emergência de risco à vida. A uretra pode estar entupida por espasmo muscular, muco ou microcristais, levando ao acúmulo de potássio no sangue e parada cardíaca em poucas horas se não desobstruído imediatamente.',
      'O estresse ambiental é o grande gatilho: conflitos com outros gatos da casa, falta de esconderijos, reformas, mudanças de móveis, caixas sanitárias sujas ou mal localizadas ativam o sistema nervoso simpático, que inflama a bexiga diretamente.',
      'Regras de ouro para caixas sanitárias: a fórmula essencial é o número de gatos + 1 caixa (ex: 2 gatos = 3 caixas), espalhadas em locais calmos e diferentes, com areia fina sem cheiro e higienização diária.',
      'Aumentar o consumo de água é o melhor remédio: urina muito concentrada agride a parede machucada da bexiga. O uso de sachês e patês úmidos diários, fontes de água corrente e potes largos de cerâmica ou vidro ajuda a diluir a urina e previne novas crises.',
      'Manejo da dor na crise aguda: a dor da CIF é excruciante e exige analgésicos adequados prescritos pelo veterinário (como buprenorfina e gabapentina). Anti-inflamatórios devem ser usados com extrema cautela e nunca combinados com corticoides.',
      'A maioria dos remédios mágicos não tem eficácia comprovada: grandes revisões científicas (Macleod 2025, iCatCare 2025) demonstraram que suplementos de glicosaminoglicanos (GAGs), corticoide e antidepressivos na crise não curam a doença. A transformação do ambiente do gato (MEMO) é a base de todo o sucesso terapêutico.'
    ],
    whatIs: 'A cistite idiopática felina é uma inflamação estéril e dolorosa da bexiga causada por hipersensibilidade do sistema nervoso do gato ao estresse ambiental, integrando a Síndrome de Pandora.',
    warningSigns: 'Idas frequentes à caixinha com emissão de poucas gotas, sangue na urina (hematúria), dor ou miados ao urinar, lamber excessivamente a região genital e urinar fora da caixa em locais frios ou macios. Se não sair urina nenhuma, é emergência máxima.',
    diagnosis: 'Diagnóstico de exclusão: é essencial realizar ultrassonografia abdominal e urinálise completa para afastar cálculos (urólitos), infecção bacteriana ou neoplasias. A urocultura só é realizada se indicada e deve ser coletada por cistocentese.',
    homeCare: 'Enriquecimento ambiental multimodal (MEMO), múltiplas fontes de água fresca, transição para alimentação úmida (sachês), respeito rigoroso ao número de caixas sanitárias (nº de gatos + 1) e administração pontual dos analgésicos prescritos.'
  },

  'discinesia-paroxistica-caes-gatos': {
    whatIsIt:
      'A discinesia paroxística é um distúrbio neurológico episódico do movimento, no qual o cão ou gato apresenta crises temporárias de contrações musculares involuntárias anormais, rigidez extrema ou movimentos estranhos com membros travados ou "dançantes". A palavra "paroxística" significa que o evento ocorre em crises com início e término súbitos. O detalhe mais importante para os tutores compreenderem é que a discinesia paroxística NÃO é epilepsia nem convulsão comum: durante todo o episódio, o cérebro consciente do animal continua acordado, ele segue você com o olhar, pisca e reconhece o ambiente, não sente dor aguda direta e não fica desorientado ou sonolento após o término da crise. O problema decorre de uma falha temporária nos "circuitos de filtro" do cérebro (núcleos da base), que deixam escapar comandos musculares excessivos durante brincadeiras, esforço físico, estresse ou consumo de certos alimentos (como o glúten).',
    keyPoints: [
      'O animal permanece consciente o tempo todo: ao contrário de uma convulsão generalizada, o cão ou gato não perde a consciência, não desmaia e não fica em coma. Ele pode olhar para você aflito tentando se movimentar, porque seus músculos estão recebendo ordens contraditórias.',
      'Não há fase de confusão pós-crise: assim que os espasmos musculares cessam, o animal levanta-se imediatamente, abana o rabo ou caminha normalmente, sem a sonolência, cegueira transitória ou desorientação típicas do pós-ictal de uma convulsão.',
      'O vídeo caseiro é o exame mais importante: filmar o episódio do começo ao fim com o celular bem iluminado, chamando o animal pelo nome para testar se ele responde, é a ferramenta padrão ouro para o veterinário neurologista diferenciar discinesia de epilepsia.',
      'Não tente segurar ou conter o animal à força: puxar membros estendidos ou tentar abrir a boca do animal pode machucá-lo ou gerar estresse extra. Apenas afaste móveis pontiagudos, escadas e piscinas para evitar quedas e ferimentos.',
      'Border Terriers e a sensibilidade ao glúten: nesta raça, muitos cães têm uma forma de discinesia provocada por intolerância ao glúten da ração ou petiscos. Uma dieta 100% livre de glúten (sem trigo, cevada ou centeio) pode curar completamente as crises.',
      'Gatos mais velhos e a tireoide: em felinos adultos e idosos, o hipertireoidismo (doença da tireoide) pode desregular os circuitos cerebrais e causar discinesia; tratar a tireoide cura os episódios motores em 100% dos casos.',
      'Remédios para convulsão nem sempre funcionam: como a causa é nos núcleos da base e não uma descarga elétrica no córtex cerebral, remédios clássicos para epilepsia (como fenobarbital) frequentemente não trazem benefício e têm efeitos colaterais desnecessários.'
    ],
    whatIs:
      'A discinesia paroxística é uma falha temporária de filtragem dos movimentos no cérebro, causando crises de rigidez, postura travada ou membros anormais em animais plenamente acordados e conscientes.',
    warningSigns:
      'Crises repentinas de membros duros esticados para a frente, postura de "espreita" com coluna curvada, pernas traseiras que parecem dançar ou tremer, quedas laterais mantendo os olhos abertos e vigilantes, ou gato que caminha rastejando em câmera lenta.',
    diagnosis:
      'Análise detalhada de vídeos caseiros da crise pelo neurologista veterinário, exame neurológico entre os episódios (que é totalmente normal), exames de sangue para checar cálcio e tireoide (T4 em gatos), testes genéticos de raça e ressonância magnética quando necessária.',
    homeCare:
      'Manter ambiente seguro sem riscos de queda durante as crises, gravar novos episódios em vídeo com anotação da data e duração em diário, evitar exercícios extenuantes ou calor excessivo se forem gatilhos, e seguir com rigor absoluto a dieta sem glúten se prescrita.'
  },

  'platinosomose-felina': {
    whatIsIt:
      'A platinosomose (ou platinossomíase felina) é uma doença parasitária provocada por um verme plano minúsculo chamado Platynosomum illiciens (também conhecido como Platynosomum fastosum). Ao contrário dos vermes comuns que vivem dentro do intestino, este parasita instala-se especificamente dentro dos canais da bile (ductos biliares) e da vesícula biliar do gato. A infecção ocorre quando o felino caça e come pequenos animais contaminados com as larvas do verme — principalmente tatuzinhos-de-jardim e lagartixas de parede. Uma vez alojado nos canais biliares, o verme causa irritação constante, inflamação intensa e cicatrizes (fibrose) que engrossam e entopem a passagem da bile. Com a passagem bloqueada, a bile não consegue descer para o intestino e vaza para o sangue, fazendo com que o gato fique com os olhos, gengivas e pele amarelados (icterícia), perca o apetite, vomite e possa desenvolver danos graves no fígado se não diagnosticado a tempo.',
    keyPoints: [
      'O gato não precisa comer lagartixas visivelmente: pesquisas brasileiras recentes demonstraram que tatuzinhos-de-jardim e pequenos artrópodes de quintal também transmitem o parasita. Gatos com acesso a quintais ou à rua estão sob risco mesmo que o tutor nunca os tenha visto caçar lagartos.',
      'O exame de fezes comum de rotina frequentemente dá falso-negativo: como os ovos do verme são pesados, saem em pequena quantidade e os canais biliares podem estar entupidos, o exame de fezes simples pode vir negativo mesmo em gatos doentes. É necessário solicitar um método especial de centrifugação em solução densa (solução de Sheather) ou coletar uma amostra direta de bile por agulha guiada por ultrassom (colecistocentese).',
      'Olhos, pele e gengivas amarelas (icterícia): o acúmulo de bile nos tecidos é o sinal clínico mais característico da doença, frequentemente acompanhado de vômitos, perda de peso, prostração e dor na barriga.',
      'A dose comum de vermífugo de rotina não cura a doença: a dose habitual de praziquantel usada para outros vermes (5 mg/kg) é insuficiente para eliminar o Platynosomum nos ductos biliares. O veterinário precisará prescrever doses muito mais altas e por vários dias seguidos conforme compêndios especializados.',
      'Mesmo após a morte dos vermes, o fígado pode demorar para sarar: as cicatrizes e o inchaço nos canais biliares podem persistir por semanas ou meses após o tratamento, exigindo remédios protetores hepáticos, dieta especial e ultrassons de controle periódico.',
      'Prevenção número um: manter o gato exclusivamente dentro de casa (indoor), bloqueando o acesso a quintais e janelas onde haja lagartixas e tatuzinhos-de-jardim.'
    ],
    whatIs:
      'A platinosomose felina é uma infecção dos canais biliares e da vesícula do gato provocada por um verme microscópico transmitido pela caça de tatuzinhos-de-jardim e lagartixas, causando inflamação da vesícula, icterícia e danos hepáticos.',
    warningSigns:
      'Amarelamento dos olhos, gengivas e pele (icterícia), urina escura como refrigerante de cola, fezes claras, vômitos frequentes, perda rápida de peso, desânimo severo e aumento do volume ou dor na barriga.',
    diagnosis:
      'Ultrassonografia do fígado e vesícula biliar (para avaliar canais dilatados e espessados), exames de sangue completos (para avaliar fígado e contagem de eosinófilos), exame de fezes por técnica de dupla centrifugação com solução pesada de Sheather e, nos casos suspeitos com fezes negativas, coleta de bile por agulha guiada por ultrassom (colecistocentese) para achar os ovos.',
    homeCare:
      'Manter o gato estritamente dentro de casa sem acesso a caça, administrar rigorosamente os medicamentos prescritos nas doses e horários exatos, oferecer alimentação úmida e apetitosa para prevenir jejum prolongado (que pode causar lipidose hepática fatal) e retornar para reavaliações com exames de sangue e ultrassom.'
  },
  'triade-felina': {
    whatIsIt:
      'A tríade felina (ou triadite felina) é uma síndrome inflamatória complexa e simultânea que afeta três órgãos digestivos vitais do gato: o pâncreas (pancreatite), as vias biliares e fígado (colangite ou colangioepatite) e o intestino delgado (enteropatia crônica inflamatória). Ao contrário dos cães e dos seres humanos, os felinos possuem uma peculiaridade anatômica marcante: em cerca de 80% dos gatos, o canal que drena o pâncreas e o canal que drena a bile se unem em um ducto comum antes de desembocar no intestino delgado. Essa "rua comum", combinada com uma quantidade natural muito elevada de bactérias no intestino do gato e a tendência a refluxos durante episódios de náusea ou vômito, faz com que a inflamação ou infecção em um desses órgãos se espalhe facilmente para os outros dois.',
    keyPoints: [
      'Não é uma doença única isolada: a tríade é um complexo inflamatório compartilhado. O paciente felino não tem apenas um pâncreas atacado ou uma infecção no fígado, mas sim um desequilíbrio integrado de todo o sistema digestivo superior.',
      'O perigo mortal do jejum prolongado: a ideia antiga de "deixar o pâncreas descansar sem comida" é extremamente perigosa para gatos. Felinos que ficam mais de 24 a 48 horas sem comer correm altíssimo risco de desenvolver lipidose hepática (acúmulo fatal de gordura no fígado). A alimentação precoce, se necessário por sondazinha alimentar indolor, é um dos pilares mais importantes para salvar o paciente.',
      'Cuidado com a falsa regra de que "tríade se trata sempre com corticoide": se o gato estiver com uma infecção bacteriana ativa nas vias biliares (colangite neutrofílica), usar corticoide antes da hora pode espalhar as bactérias e causar choque séptico gravíssimo. O veterinário precisa identificar se há infecção antes de iniciar anti-inflamatórios pesados.',
      'A carência de Vitamina B12 (cobalamina) é quase unânime: nos gatos, a substância essencial para absorver a vitamina B12 (fator intrínseco) é fabricada unicamente pelo pâncreas. Como o pâncreas e o intestino estão inflamados, quase todos os gatos com tríade ficam anêmicos e sem energia por falta severa de vitamina B12, exigindo suplementação contínua por via oral ou injeções.',
      'Sinais silenciosos e discretos: os gatos costumam esconder sintomas graves. Em vez de dor evidente, eles apenas ficam quietos, escondidos, param de se lamber, comem menos e perdem peso devagar. Vômitos frequentes ou bolas de pelo constantes NÃO são normais.',
      'Investigação em etapas: exames de sangue gerais, dosagem de lipase pancreática felina específica (Spec fPL), ultrassonografia especializada e medição de vitamina B12 são fundamentais para traçar o mapa exato da inflamação em cada um dos três órgãos.'
    ],
    whatIs:
      'A tríade felina é a inflamação simultânea e interligada do pâncreas, das vias biliares e do intestino delgado em gatos, favorecida pela junção anatômica única dos canais digestivos felinos.',
    warningSigns:
      'Falta de apetite ou recusa completa de alimentos por mais de 24 horas, vômitos frequentes (com comida, líquido amarelado ou espuma), prostração e isolamento, perda de peso progressiva, olhos, gengivas ou orelhas amareladas (icterícia), fezes pastosas e dor ao toque na barriga.',
    diagnosis:
      'O diagnóstico combina histórico clínico completo, exames de sangue laboratoriais (hemograma, enzimas hepáticas e bilirrubina), teste de lipase pancreática felina específica (Spec fPL), dosagem sérica de vitamina B12 (cobalamina) e ultrassonografia abdominal especializada para avaliar o pâncreas, a vesícula e o espessamento das camadas intestinais.',
    homeCare:
      'Nunca permitir jejum prolongado: oferecer alimentos úmidos mornos e palatáveis ou seguir rigorosamente o plano de alimentação por sonda se prescrito. Administrar antieméticos, analgésicos e antibióticos nos horários exatos prescritos pelo veterinário. Manter a reposição de vitamina B12 sem interrupções e monitorar diariamente a aceitação de água, comida e coloração das mucosas.'
  },
  'anemia-hemolitica-imunomediada-canina': {
    whatIsIt:
      'A Anemia Hemolítica Imunomediada (AHIM ou IMHA) é uma emergência crítica na qual o sistema imunológico do cão perde a tolerância e passa a fabricar anticorpos que destroem os próprios glóbulos vermelhos (as células responsáveis por levar oxigênio para todos os tecidos do corpo). Sem essas hemácias, o paciente sofre de hipóxia grave (falta de oxigênio nos órgãos). Além disso, os restos dos glóbulos rompidos e a inflamação sistêmica descontrolada ativam intensamente a coagulação, criando um perigo iminente de trombos (coágulos) nos pulmões e no abdômen, exigindo hospitalização imediata, imunossupressão e prevenção antitrombótica rigorosa.',
    keyPoints: [
      'Gengivas muito brancas ou amareladas (icterícia), urina com tonalidade escura (cor de refrigerante de cola ou vinho), fraqueza extrema e respiração ofegante em repouso são sinais de alarme máximo.',
      'A AHIM é uma afecção tromboinflamatória: o maior risco de óbito nas primeiras duas semanas não é apenas a baixa do hematócrito, mas sim a formação de coágulos venosos; por isso, remédios anticoagulantes são obrigatórios desde o primeiro dia.',
      'O tratamento inicial apoia-se em corticoides em doses imunossupressoras para frear a destruição das hemácias, transfusão de concentrado de hemácias compatível quando há sinais de falta de oxigênio e suporte hospitalar intensivo.',
      'O processo de recuperação exige perseverança: a redução das medicações deve ser extremamente gradual ao longo de meses para evitar recidivas que podem ser fatais.',
    ],
    whatIs:
      'A anemia hemolítica imunomediada é a destruição patológica precoce das hemácias provocada pelo próprio sistema imune do cão, resultando em anemia grave e risco elevado de complicações tromboembólicas.',
    warningSigns:
      'Palidez acentuada ou amarelamento das gengivas e olhos, urina escura acastanhada ou avermelhada, apatia profunda, respiração rápida ou com esforço, taquicardia, febre, desmaios e falta de ar súbita.',
    diagnosis:
      'A confirmação diagnóstica baseia-se na tríade do Consenso ACVIM: confirmação da anemia (hematócrito/PCV), comprovação de destruição imunomediada (presença de esferócitos no microscópio, teste de aglutinação salina positivo ou teste de Coombs positivo) e evidência de hemólise ativa (bilirrubina elevada, hemoglobinúria ou hemoglobinemia). Exames complementares excluem causas associadas como hemoparasitoses e tumores.',
    homeCare:
      'Administrar todas as medicações (imunossupressores e anticoagulantes) rigorosamente nos mesmos horários prescritos. Proporcionar repouso absoluto sem estresse ou exercícios físicos pesados. Monitorar a coloração da gengiva, a frequência respiratória em repouso e a cor da urina todos os dias. Jamais suspender ou diminuir a dose dos remédios por conta própria sem expressa autorização do médico-veterinário.',
  },
};

export function getPlainLanguageForSlug(slug: string): DiseasePlainLanguage | undefined {
  return DISEASE_PLAIN_LANGUAGE[slug];
}
