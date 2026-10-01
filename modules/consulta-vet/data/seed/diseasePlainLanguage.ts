import type { DiseasePlainLanguage } from '../../types/disease';

/**
 * Blocos “O que é em palavras simples?” — linguagem acessível para tutores.
 * Cada doença nova deve ter entrada aqui E `plainLanguage` no seed (ou import via getPlainLanguageForSlug).
 */
export const DISEASE_PLAIN_LANGUAGE: Record<string, DiseasePlainLanguage> = {
  'coagulacao-intravascular-disseminada-caes-gatos': {
    whatIsIt:
      'Entendendo a Coagulação Intravascular Disseminada (CID):\n' +
      '- Pane generalizada na hemostasia:\n' +
      '  - Emergência crítica na qual o sistema de coagulação sanguínea entra em colapso decorrente de outra enfermidade grave de base.\n' +
      '- Microtrombose invisível e isquemia de órgãos:\n' +
      '  - Em vez de formar coágulos apenas em lesões, o organismo cria milhares de microtrombos dentro dos vasos, entupindo a circulação de rins, pulmões e fígado.\n' +
      '- Consumo descontrolado e sangramento paradoxal:\n' +
      '  - Todos os fatores e plaquetas são exauridos rapidamente, retirando a capacidade de conter sangramentos e gerando manchas roxas (petéquias) e hemorragias graves.',
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
  'sepse-canina': {
    whatIsIt:
      'A sepse em cães é uma condição de emergência gravíssima decorrente de uma resposta inflamatória desregulada e exagerada do organismo frente a uma infecção bacteriana, fúngica ou viral. Ao contrário do que se pensava no passado, sepse não é simplesmente uma "infecção muito forte", mas sim uma situação em que as defesas do próprio corpo, ao tentar combater os microrganismos invasores, acabam danificando os vasos sanguíneos, a coagulação e os tecidos sadios, levando à disfunção ou falência de órgãos vitais como rins, pulmões, coração, fígado e cérebro.',
    keyPoints: [
      'A grande mudança de 2026: o consenso veterinário atual estabelece que ter infecção e febre ou alteração nos leucócitos (SIRS) não é suficiente para chamar o quadro de sepse. É obrigatório haver comprovação de disfunção orgânica nova provocada pela resposta desregulada do corpo.',
      'Febre não é obrigatória: muitos cães em sepse grave, especialmente os que estão descompensando e entrando em choque, podem apresentar temperatura corporal normal ou até hipotermia perigosa (abaixo de 37,5 °C).',
      'Choque séptico é a forma mais perigosa: ocorre quando a pressão arterial despenca e a circulação não consegue entregar oxigênio e nutrientes suficientes para os órgãos, mesmo depois de o animal ter recebido soro na veia adequadamente.',
      'Mais soro nem sempre resolve: vasos sanguíneos machucados pela inflamação perdem a capacidade de segurar líquido. Colocar volume excessivo na veia pode acumular água nos pulmões e no intestino, piorando o quadro. Remédios que fecham os vasos dilatados (vasopressores como a norepinefrina) são necessários rapidamente.',
      'O controle físico do foco é indispensável (source control): se houver um intestino perfurado, um útero cheio de pus (piometra) ou um abscesso fechado, o melhor antibiótico do mundo não salvará o animal sem a cirurgia ou drenagem para interromper a fonte de bactérias.',
      'Alimentação precoce salva vidas: deixar o cão séptico em jejum prolongado enfraquece a barreira do intestino e piora as chances de recuperação. Assim que a circulação for estabilizada, alimentar o paciente (se necessário por sondazinha indolor) é fundamental.',
    ],
    whatIs:
      'A sepse é uma reação inflamatória descontrolada e potencialmente fatal do próprio organismo contra uma infecção, que danifica os vasos sanguíneos e causa falência aguda de órgãos vitais.',
    warningSigns:
      'Prostração profunda e fraqueza para levantar, gengivas excessivamente vermelhas como tijolo no início ou muito pálidas e acinzentadas na fase grave, respiração acelerada e ofegante, batimentos cardíacos muito rápidos, extremidades frias, vômitos, diarreia com sangue, urina muito escassa ou ausente e confusão mental.',
    diagnosis:
      'O diagnóstico exige a confirmação ou forte suspeita de infecção associada à detecção de disfunção orgânica nova através de exames de sangue (hemograma, lactato, função renal, enzimas do fígado, glicose, cálcio e coagulação), urinálise, ultrassom focado (POCUS AFAST/TFAST) e culturas microbiológicas de sangue, urina ou secreções cavitárias.',
    homeCare:
      'A sepse é uma emergência hospitalar de terapia intensiva absoluta; não existe tratamento caseiro. Após a alta hospitalar, o tutor deve fornecer os antibióticos prescritos rigorosamente no horário sem falhar nenhuma dose, oferecer alimentação nutritiva recomendada, monitorar a temperatura, quantidade de urina e atividade diária, e retornar de imediato se houver qualquer sinal de recaída ou apatia.',
  },
  'obstrucao-funcional-fluxo-urinario-caes': {
    whatIsIt:
      'A Obstrução Funcional do Fluxo Urinário (conhecida antigamente como dissinergia reflexa ou dissinergia detrusor-uretral) é um problema em que a bexiga do cão tenta empurrar a urina para fora, mas o canal da uretra não se abre de forma coordenada ou se fecha antes da hora. É como se a bexiga fosse uma bomba e a uretra uma porta automática: normalmente, quando a bexiga aperta, a porta se abre. Nesse distúrbio, o cão começa a urinar com um jato bom, mas logo o jato afina, vira pequenos jatinhos e é interrompido, enquanto o animal continua fazendo força. O resultado é que a bexiga nunca esvazia completamente, acumulando urina perigosa.',
    keyPoints: [
      'O sinal mais clássico é o cão começar urinando razoavelmente bem e rapidamente o jato afinar ou virar pingos e jatos interrompidos, continuando em postura de esforço.',
      'Acomete principalmente cães machos de porte grande ou gigante, na meia-idade (como Labradores, Golden Retrievers e Pastores Alemães).',
      'Não é causada por pedra física ou tumor entupindo o canal: a obstrução é funcional (espasmo muscular ou falta de relaxamento involuntário). No entanto, o veterinário precisa obrigatoriamente fazer exames para ter certeza absoluta de que não há cálculos ou tumores físicos.',
      'O escape de urina (incontinência) que às vezes acontece em casa não é fraqueza do esfíncter, mas sim transbordamento de uma bexiga que ficou cheia demais.',
      'O tratamento inicial é feito com remédios que relaxam a musculatura da uretra (como tamsulosina ou prazosina) e, se necessário, relaxantes musculares. Nunca se deve forçar contração da bexiga com remédios antes que o canal esteja relaxado.',
    ],
    whatIs:
      'A obstrução funcional do fluxo urinário (FOO) é uma falha na coordenação entre a contração da bexiga e o relaxamento do canal uretral, gerando dificuldade para urinar, jato fino/interrompido e retenção de urina sem obstrução física aparente.',
    warningSigns:
      'Procure o hospital veterinário imediatamente se o cão estiver fazendo força para urinar e não sair nada (anúria), se apresentar vômitos, fraqueza severa, prostração, respiração rápida ou dor abdominal intensa. A retenção urinária total pode provocar intoxicação por potássio e lesão nos rins em poucas horas.',
    diagnosis:
      'O veterinário confirma a doença avaliando o padrão de micção (muitas vezes com auxílio de vídeos gravados em casa pelo tutor), medindo a quantidade de urina que sobra na bexiga logo após o término do jato com ultrassom (PVRV) e realizando exames de imagem e sondagem para garantir que não haja cálculos, estenoses ou tumores bloqueando fisicamente o canal.',
    homeCare:
      'Administrar os medicamentos relaxantes urinários rigorosamente nos horários orientados, preferencialmente cerca de 30 minutos antes dos passeios para facilitar a micção. Observar a qualidade do jato de urina em cada passeio, registrar se há interrupções ou esforço prolongado e nunca pressionar com força a barriga do cão sem orientação do veterinário, pois isso pode machucar a bexiga.',
  },
  'sepse-felina': {
    whatIsIt:
      'A sepse em felinos é uma condição clínica crítica e com risco iminente de morte decorrente de uma resposta inflamatória desregulada e anormal do organismo contra uma infecção bacteriana, fúngica ou viral. Em vez de a reação imunológica atuar de maneira controlada contra os micróbios invasores, o corpo libera substâncias que lesam a parede dos vasos sanguíneos, desregulam a circulação e provocam o mau funcionamento (disfunção ou falência) de órgãos vitais como coração, rins, pulmões e fígado.',
    keyPoints: [
      'O gato séptico NÃO se comporta como o cão ou o ser humano: enquanto outras espécies costumam apresentar febre alta e coração batendo muito rápido (taquicardia), o gato com sepse frequentemente apresenta o fenótipo hipodinâmico ou frio (tríade do choque felino: temperatura do corpo perigosamente baixa, batimentos cardíacos lentos ou sem a aceleração esperada e pressão arterial muito baixa com orelhas e patinhas frias).',
      'A tríade clássica do choque felino: a combinação de hipotermia (abaixo de 37,5 °C), bradicardia relativa (frequência cardíaca abaixo de 140 a 160 bpm em um gato estressado e doente) e hipotensão é um sinal gravíssimo de sepse avançada e falência circulatória.',
      'Cuidado extremo com soro na veia: os gatos possuem volume de sangue proporcionalmente muito menor que o dos cães e seus vasos pulmonares são extremamente sensíveis. O excesso de fluidos (soro) na veia pode acumular água nos pulmões (edema pulmonar) com facilidade assustadora. A hidratação precisa ser cautelosa, em pequenos volumes medidos e com monitoramento contínuo.',
      'Aquecimento gradual e obrigatório: tentar dar remédios fortes para subir a pressão enquanto o gato estiver gelado (hipotérmico) é ineficaz e perigoso para o coração. O aquecimento externo gradual e cuidadoso com mantas térmicas adequadas é parte essencial da reanimação.',
      'Os dois grandes focos em gatos: as causas infecciosas mais frequentes em felinos são o acúmulo de pus no tórax ao redor dos pulmões (piotórax, muitas vezes por mordidas em brigas antigas) e a infecção dentro da barriga (peritonite séptica, por perfuração intestinal ou corpos estranhos lineares).',
      'Cirurgia e drenagem precoce (source control): antibióticos não conseguem penetrar eficientemente em coleções volumosas de pus fechado. Drenar o tórax ou operar cirurgicamente a barriga para interromper a fonte da infecção deve ser feito assim que o paciente tiver o mínimo de estabilidade circulatória.',
      'Alimentação precoce contra lipidose hepática: gatos em jejum prolongado desenvolvem acúmulo perigoso de gordura no fígado (lipidose). Iniciar suporte nutricional enteral suave o mais cedo possível é fundamental para a sobrevivência.',
    ],
    whatIs:
      'A sepse felina é uma síndrome crítica em que a resposta de defesa do organismo contra uma infecção se torna desregulada, gerando colapso da circulação e falência de órgãos vitais, frequentemente cursando com corpo frio, batimentos cardíacos lentos e pressão baixa.',
    warningSigns:
      'Procure a UTI veterinária imediatamente se o gato estiver profundamente prostrado, com patinhas e orelhas geladas, temperatura baixa ao toque, gengivas pálidas ou arroxeadas, respiração ofegante ou com a boca aberta, fraqueza severa incapaz de sustentar o peso, recusa total de comida e olhar distante ou desorientado.',
    diagnosis:
      'O diagnóstico baseia-se na identificação de uma infecção (frequentemente por ultrassom torácico e abdominal à beira do leito - POCUS, punção e análise microscópica de líquidos com bactérias) associada a exames de sangue que comprovem falência de órgãos (lactato, creatinina, bilirrubina, cálcio ionizado, glicemia e coagulação) e pontuação de gravidade (escores felinos como APPLE).',
    homeCare:
      'A sepse felina exige internação em UTI com monitorização constante; não há manejo em casa na fase crítica. Após a recuperação e alta hospitalar, o tutor deve fornecer rigorosamente todos os antibióticos prescritos nos horários exatos, manter o gato em ambiente aquecido e livre de estresse, oferecer alimentação hipercalórica e retornar imediatamente ao hospital se houver prostração, diminuição do apetite ou temperatura fria.',
  },
  'lesao-renal-aguda-felina': {
    whatIsIt:
      'A lesão renal aguda (conhecida clinicamente como LRA, IRA ou AKI) em gatos é uma queda súbita, drástica e potencialmente fatal na capacidade dos rins de filtrar o sangue, ocorrendo em questão de poucas horas a dias. Os rins funcionam como os grandes filtros e reguladores do corpo: eliminam substâncias tóxicas do metabolismo celular, controlam a hidratação, equilibram minerais vitais (como potássio, fósforo e sódio) e regulam a acidez do sangue. Quando os rins sofrem uma lesão abrupta — seja por venenos como lírios e anticongelante automotivo, por infecções graves (pielonefrite), por pedras entupindo o canal do rim (ureterolitíase) ou por falta severa de sangue e oxigênio (choque, desidratação extrema ou cirurgias) —, essas toxinas e minerais perigosos acumulam-se no sangue com extrema rapidez, gerando o quadro de uremia aguda.',
    keyPoints: [
      'O mito perigoso de "lavar o rim" com excesso de soro: ao contrário do que se acreditava no passado, encharcar o gato com soro na veia não ressuscita células renais que morreram. Gatos têm circulação delicada e o excesso de líquido (sobrecarga hídrica) acumula água nos pulmões (edema pulmonar), aumentando enormemente o risco de óbito. A fluidoterapia moderna deve ser restritiva e calculada gota a gota para manter o animal hidratado sem encharcar seus tecidos.',
      'Alerta máximo contra lírios: todas as partes de lírios verdadeiros (Lilium e Hemerocallis) — pétalas, folhas, pólen que cai no pelo e o gato lambe ao se limpar, e até a água do vaso — contêm uma toxina letal para os rins do gato. A ingestão exige internação de emergência imediata, pois a lesão se instala nas primeiras horas.',
      'A urina é o termômetro de sobrevivência do rim: a produção de urina deve ser medida rigorosamente pela equipe hospitalar. Se o gato parar totalmente de urinar (anúria) ou urinar volumes muito baixos (oligúria), os rins não estão conseguindo eliminar potássio. O potássio elevado no sangue (hipercalemia) desregula o ritmo do coração e pode causar parada cardíaca súbita.',
      'Pedras de oxalato no canal do rim (ureterolitíase): em gatos, é comum que pequenos cálculos se desloquem do rim para o ureter (o tubo que liga o rim à bexiga), entupindo a passagem da urina. O diagnóstico por ultrassom detalhado é urgente, pois muitos desses gatos necessitam de procedimentos de desobstrução, como a colocação de um dispositivo chamado SUB (derivação ureteral subcutânea).',
      'Remédios que nunca devem ser usados na crise aguda: anti-inflamatórios (mesmo veterinários) e certos antibióticos podem piorar irreversivelmente o rim machucado. Medicamentos para o coração e pressão da classe dos IECA e BRA também são estritamente suspensos na fase aguda.',
      'Alimentação na internação sem restrição de proteína: na fase aguda, o organismo do gato entra em estado de alto consumo muscular (hipercatabolismo). Diferente da doença renal crônica em que se controla a proteína, no paciente com LRA a nutrição deve fornecer calorias e proteínas suficientes para a cicatrização dos tecidos, se necessário por sonda alimentar colocada pelo veterinário.',
      'Hemodiálise veterinária e terapias avançadas: quando os medicamentos e o soro não conseguem controlar o excesso de água, o potássio perigoso ou a acidez do sangue, terapias de diálise extracorpórea (IHD ou CRRT) podem assumir o trabalho do rim por alguns dias para dar tempo de as células se regenerarem.',
      'Acompanhamento rigoroso após a alta hospitalar: gatos que sobrevivem a uma lesão renal aguda têm risco elevado de desenvolver doença renal crônica nos meses seguintes. Por isso, consultas e exames de urina e sangue periódicos a cada 3 meses no primeiro ano são indispensáveis.',
    ],
    whatIs:
      'A lesão renal aguda felina é uma falência abrupta e potencialmente reversível da filtragem dos rins, causada por toxinas (como lírios), infecções, entupimentos urinários ou falta de circulação, exigindo socorro intensivo imediato.',
    warningSigns:
      'Vômitos frequentes e repentinos, desânimo e apatia profunda, recusa total em comer e beber água, cheiro desagradável de urina na respiração (hálito urêmico), tentar usar a caixinha de areia sem conseguir urinar, miados de dor na barriga, tremores musculares ou convulsões.',
    diagnosis:
      'Exames de sangue urgentes para medir creatinina, ureia, potássio, fósforo e equilíbrio ácido-base (aumentos de apenas 0,3 mg/dL na creatinina já confirmam lesão aguda pelo consenso IRIS), medição horária do volume de urina com sonda, ultrassonografia abdominal completa para avaliar tamanho renal e obstruções ureterais, e urinálise com exame de sedimento.',
    homeCare:
      'A LRA exige UTI veterinária imediata; não existe tratamento em casa na fase crítica. Após a liberação do hospital, o tutor deve garantir água fresca e alimentos úmidos sempre disponíveis, administrar com pontualidade os protetores de estômago e remédios para náusea ou pressão arterial prescritos, pesar o gato com frequência, acompanhar a produção de urina na caixinha e nunca fornecer medicamentos sem autorização veterinária.',
  },
  'pielonefrite-caes-gatos': {
    whatIsIt:
      'A pielonefrite é uma infecção grave que atinge a parte alta do sistema urinário: a pelve renal (a câmara onde a urina recém-formada é recolhida) e a própria carne do rim (o parênquima renal). Diferente de uma infecção comum da bexiga (cistite), na qual as bactérias ficam restritas à bexiga, na pielonefrite os micróbios — que quase sempre sobem a partir do trato urinário inferior ou do intestino — invadem os tecidos profundos do rim. Isso causa intensa inflamação, pode provocar inchaço e dor, prejudicar a capacidade do rim de filtrar as impurezas do sangue (gerando lesão renal aguda) e, nos casos mais graves, as bactérias e suas toxinas podem passar para a corrente sanguínea, provocando uma infecção generalizada que coloca a vida em risco (urosepse).',
    keyPoints: [
      'Bactéria na bexiga não significa automaticamente infecção no rim: encontrar bactérias no exame de urina pode significar apenas cistite ou uma presença inofensiva de bactérias na bexiga (bacteriúria subclínica). Para ser considerada pielonefrite presumida pelos novos consensos, o animal precisa apresentar sinais de inflamação no corpo todo e evidências claras de que o rim está sendo afetado.',
      'A doença raramente se apresenta com a clássica febre e dor: ao contrário do que muitos tutores imaginam, a maioria dos cães e gatos com pielonefrite não tem febre alta nem geme de dor nas costas ao ser tocado. Os sinais costumam ser sutis e inespecíficos, como perda de apetite, vômitos, desânimo, beber e urinar mais do que o normal (polidipsia e poliúria) ou uma piora repentina em animais que já tinham doença renal crônica.',
      'Cuidado com exame de urina "falso-limpo" em gatos: se um gato tiver uma pedrinha (ureterólito) entupindo o canal que leva a urina do rim para a bexiga (o ureter), as bactérias presentes no rim infectado ficam presas lá em cima e não conseguem descer. Por isso, a urina colhida da bexiga pode dar negativa para bactérias mesmo com o rim gravemente infectado.',
      'O remédio precisa atingir a carne do rim, e não apenas a urina: na pielonefrite, o veterinário precisa escolher um antibiótico que penetre profundamente no tecido renal e no sangue. Remédios que concentram apenas na urina da bexiga (como a nitrofurantoína) não curam a infecção renal e não devem ser utilizados.',
      'Alerta de segurança com antibióticos em gatos: doses elevadas de certos antibióticos da família das fluoroquinolonas (especialmente enrofloxacina acima de 5 mg/kg) podem causar degeneração da retina e cegueira permanente em gatos. Por isso, o uso deve ser criterioso, respeitando doses estritas ou preferindo opções mais seguras.',
      'Pielonefrose e entupimentos exigem intervenção cirúrgica de urgência: quando há acúmulo de pus sob pressão na pelve do rim associado a um canal entupido, os antibióticos sozinhos não conseguem fazer efeito. Nesses casos, procedimentos para drenar o pus e desobstruir o rim — como a colocação de um desvio chamado SUB ou de um dreno ureteral — são indispensáveis para salvar o rim e a vida do paciente.',
      'Tempo de tratamento atualizado (10 a 14 dias): antigamente recomendavam-se 4 a 6 semanas de antibióticos. As diretrizes internacionais atuais recomendam tratamentos mais curtos, de 10 a 14 dias, com reavaliação clínica e exame de urina cerca de 1 a 2 semanas após o fim do tratamento para confirmar a melhora.',
    ],
    whatIs:
      'A pielonefrite é uma infecção bacteriana grave que atinge a pelve e o tecido dos rins em cães e gatos, geralmente subindo da bexiga, podendo causar perda súbita da função renal e infecção generalizada se não tratada tempestivamente.',
    warningSigns:
      'Falta de apetite persistente, vômitos frequentes, prostração e desânimo, aumento repentino na ingestão de água e no volume de urina, urina com odor forte ou sangue, febre, dor ao toque na região lombar ou abdômen, e emagrecimento progressivo.',
    diagnosis:
      'O diagnóstico moderno integra exame de sangue completo (com creatinina, ureia e marcadores inflamatórios: proteína C-reativa em cães e amiloide sérica A em gatos), exame de urina completo com urocultura por cistocentese e antibiograma, além de ultrassonografia detalhada dos rins e ureteres para verificar dilatação, pus ou cálculos obstrutivos.',
    homeCare:
      'Administrar rigorosamente os antibióticos prescritos nos horários corretos até o último dia, nunca interrompendo o tratamento antes mesmo se o animal parecer bem. Oferecer sempre água limpa e fresca e sachês úmidos para manter a hidratação, monitorar o apetite e a produção de urina, e retornar pontualmente para as consultas e exames de controle após o término dos medicamentos.',
  },
  'lesao-renal-aguda-canina': {
    whatIsIt:
      'A lesão renal aguda (LRA ou IRA) em cães é uma falha súbita e perigosa na capacidade dos rins de filtrar o sangue, eliminar toxinas e regular a água e os sais minerais do organismo. Ao contrário da doença renal crônica, que se desenvolve lentamente ao longo de meses ou anos, a lesão renal aguda acontece de forma abrupta — em questão de horas ou poucos dias. Ela pode ser causada por infecções graves transmitidas pela água ou urina de roedores (como a leptospirose), ingestão de substâncias altamente tóxicas para cães (como uvas frescas ou passas, anticongelante de carros e certos anti-inflamatórios de uso humano ou veterinário administrados sem hidratação adequada), desidratação severa ou bloqueios que impedem a saída da urina. Trata-se de uma verdadeira emergência médica que exige internação hospitalar imediata em UTI veterinária, onde cuidados intensivos podem salvar os rins antes que o dano se torne irreversível.',
    keyPoints: [
      'O mito de "lavar o rim" acabou: antigamente acreditava-se que colocar muito soro na veia "lavaria" as toxinas do rim. Os consensos internacionais mais modernos (como o IRIS e a AAHA) provaram que o excesso de soro é extremamente perigoso para o cão, acumulando água nos pulmões (edema pulmonar) e inchando os próprios rins, o que piora o quadro. O soro deve ser medido gota a gota, repondo apenas o que o animal realmente perde.',
      'Leptospirose é uma causa frequente e uma zoonose: cães que entram em contato com água parada, lama ou urina de ratos podem contrair a bactéria Leptospira. Ela ataca violentamente os rins e o fígado, podendo também causar hemorragia nos pulmões. Como a leptospirose pode passar para os seres humanos através do contato com a urina do cão, a equipe veterinária e a família devem adotar cuidados rigorosos de proteção (uso de luvas e desinfecção).',
      'Uvas e passas são venenos perigosos para cães: mesmo poucas uvas ou passas podem desencadear necrose tubular aguda fulminante e falência renal nos cães devido à toxicidade do ácido tartárico presente na fruta. Nunca ofereça uvas ao seu cão e busque atendimento emergencial caso haja ingestão acidental.',
      'Etilenoglicol (anticongelante) é letal se não tratado nas primeiras horas: presente em aditivos de radiadores automotivos, possui sabor adocicado atraente para cães. No corpo, transforma-se em cristais pontiagudos que entopem e destroem os rins. O socorro deve ser prestado nas primeiras 3 a 6 horas para que o antídoto faça efeito.',
      'Parar de urinar é sinal de perigo extremo: quando os rins entram em falência aguda, o cão pode parar completamente de produzir urina (anúria) ou urinar quantidades mínimas. Isso faz com que o potássio aumente muito no sangue, o que pode paralisar o coração a qualquer momento.',
      'A hemodiálise veterinária pode salvar vidas: em cães que pararam de urinar ou que acumularam muita água ou toxinas, as máquinas de hemodiálise ou diálise peritoneal assumem o papel dos rins temporariamente, mantendo o cão vivo enquanto os rins se recuperam da inflamação.',
      'A recuperação exige paciência e seguimento rigoroso: mesmo após sair do hospital e voltar para casa, os rins podem levar semanas ou meses para cicatrizar, e uma parcela dos cães pode manter algum grau de sequela renal que exigirá acompanhamento veterinário periódico.',
    ],
    whatIs:
      'A lesão renal aguda canina é a perda rápida e potencialmente reversível da função de filtragem dos rins, provocada por infecções (como leptospirose), toxinas (uvas, anticongelante, remédios) ou choque, exigindo internação em UTI com monitoramento rígido de fluidos.',
    warningSigns:
      'Vômitos repetidos e repentinos, desânimo e fraqueza intensa, recusa total de comida e água, hálito forte com cheiro de urina, redução drástica ou parada total na produção de urina, urina escura ou com sangue, febre, respiração ofegante, dor abdominal e convulsões ou tremores.',
    diagnosis:
      'Exames de sangue urgentes para medir creatinina, ureia, potássio, fósforo e gases sanguíneos (pequenos aumentos de 0,3 mg/dL na creatinina já confirmam lesão ativa), medição estrita da produção horária de urina com sonda, exames para leptospirose (PCR e sorologia MAT), urinálise detalhada e ultrassonografia dos rins.',
    homeCare:
      'A fase aguda exige internação obrigatória. Após a alta hospitalar, administrar pontualmente todos os medicamentos prescritos (antibióticos para leptospirose, protetores gástricos e remédios de pressão), fornecer água limpa e fresca à vontade, estimular a alimentação com dietas terapêuticas úmidas e saborosas, acompanhar o volume de urina e o peso do cão, e realizar todos os retornos agendados para exames de sangue e urina.',
  },
  'intermacao-caes-gatos': {
    whatIsIt:
      'A intermação (também conhecida como golpe de calor ou heatstroke) é uma emergência médica gravíssima em que o corpo do cão ou gato aquece a temperaturas extremas e perde a capacidade de se resfriar. Ao contrário dos humanos, que transpiram pela pele inteira, os animais só conseguem perder calor ofegando pela boca (panting). Quando a temperatura do ambiente sobe muito, quando o ar está muito úmido, ou quando o animal se exercita em dias quentes, o calor acumula-se rapidamente e começa a cozinhar as células por dentro, causando destruição de tecidos, inflamação em todo o organismo e falência de órgãos vitais como rins, fígado, cérebro e intestino. Trata-se de uma emergência de risco iminente de morte que exige primeiros socorros imediatos pelo tutor e atendimento veterinário de urgência em UTI.',
    keyPoints: [
      'Intermação NÃO é febre: nunca dê dipirona, paracetamol ou anti-inflamatórios. Na febre, o cérebro manda o corpo esquentar para combater infecções. Na intermação, o corpo esquentou porque não conseguiu eliminar o calor externo. Remédios de febre não funcionam e podem destruir os rins e o estômago do animal; paracetamol é fatal para gatos!',
      'Resfriamento imediato salva vidas (RECOVER 2026): se você suspeitar de intermação, não espere chegar ao veterinário para começar a resfriar. Molhe o corpo do animal com água fresca da torneira (especialmente barriga e virilhas) e use um ventilador ou o ar-condicionado do carro durante o transporte.',
      'Nunca use água com gelo nem toalhas molhadas: água gelada demais pode causar choque e tremores, que produzem ainda mais calor. Toalhas molhadas colocadas sobre o animal aquecem rapidamente e funcionam como um cobertor térmico que aprisiona o calor.',
      'Pare de molhar quando o animal melhorar um pouco (ao atingir cerca de 39,5 a 40°C): o animal continuará esfriando sozinho mesmo depois de secar. Se você continuar resfriando até a temperatura normal de 38°C, ele pode entrar em hipotermia perigosa.',
      'Braquicefálicos têm risco até 14 vezes maior: raças de focinho achatado (como Buldogue Francês, Buldogue Inglês e Pug) não conseguem respirar com eficiência. Ao tentar ofegar no calor, o esforço muscular gera ainda mais calor e a garganta incha, podendo fechar a passagem de ar em poucos minutos.',
      'Cuidado com secadoras de roupa e gatos: gatos costumam procurar locais quentes e podem entrar escondidos em secadoras de roupas com roupas mornas. Ligar o aparelho com o gato dentro é uma causa frequente e trágica de intermação felina grave e queimaduras.',
      'O perigo continua mesmo depois que o animal esfriou: quando a temperatura volta ao normal, a emergência ainda não acabou. Danos aos rins, problemas de coagulação sanguínea com hemorragias e falência do fígado podem surgir de 12 a 48 horas depois. A internação em UTI é obrigatória.',
    ],
    whatIs:
      'A intermação é uma emergência crítica causada pelo superaquecimento do corpo do cão ou gato, que destrói células e tecidos e provoca falência de múltiplos órgãos, exigindo resfriamento imediato com água fresca e suporte hospitalar intensivo.',
    warningSigns:
      'Respiração ofegante desesperada e muito ruidosa, respiração de boca aberta em gatos, salivação excessiva e viscosa, língua e gengivas muito vermelhas ou arroxeadas, fraqueza repentina, andar cambaleante, desorientação, vômitos e diarreia com sangue vivo, convulsões, desmaio e perda de consciência.',
    diagnosis:
      'O diagnóstico é essencialmente clínico e de urgência com base no histórico de calor ou exercício e nos sintomas. No hospital, realizam-se esfregaço de sangue para contagem de hemácias nucleadas (nRBCs), exames de coagulação para detectar CID, avaliação da função dos rins (creatinina e urinálise) e fígado, lactato e ultrassonografia POCUS.',
    homeCare:
      'A fase crítica exige internação incondicional em UTI. Após a alta médica, manter o animal em ambiente fresco, sombreado e ventilado, com água limpa e fresca sempre disponível. Nunca passear nos horários quentes do dia (passear somente antes das 7h ou após as 19h), não deixar animais em carros fechados nem por 1 minuto, e seguir todas as medicações e exames de retorno prescritos para monitorar os rins e o fígado.',
  },
  'polirradiculoneurite-caes-gatos': {
    whatIsIt:
      'A polirradiculoneurite aguda (conhecida popularmente como paralisia do cão de caça ou o equivalente canino da síndrome de Guillain-Barré humana) é uma doença neurológica inflamatória em que o sistema imunológico do próprio animal comete um erro e ataca as raízes nervosas e os nervos periféricos que conectam a medula espinhal aos músculos. Como os fios que transmitem a eletricidade para os músculos ficam desativados ou inflamados, o cão ou gato perde rapidamente a força e a sustentação nas patas traseiras e dianteiras, desenvolvendo uma paralisia flácida e frouxa em todo o corpo. Apesar de não conseguir se levantar ou andar, o animal permanece com a consciência perfeitamente lúcida, entende tudo o que acontece ao redor, tem sensibilidade nas patas e costuma abanar a cauda alegremente. Trata-se de uma condição grave que exige hospitalização intensiva, pois nos casos mais severos a paralisia pode atingir o diafragma e os músculos respiratórios do peito, provocando asfixia e risco de morte se não houver assistência ventilatória.',
    keyPoints: [
      'A mente e a consciência continuam normais: o paciente não tem derrame cerebral nem confusão mental. Ele reconhece a família, tem apetite se alimentado na boca e abana a cauda com vivacidade, mas o corpo não responde para ficar em pé.',
      'Perda de massa muscular acelerada: os músculos ficam moles (hipotônicos) e encolhem de tamanho em apenas 3 a 5 dias. Isso acontece porque a falta do estímulo do nervo faz as células musculares perderem nutrientes rapidamente (atrofia por desnervação).',
      'Perigo oculto na respiração: a complicação mais perigosa é a paralisia dos músculos do peito e do diafragma. O animal pode começar a acumular gás carbônico no sangue antes mesmo de a oxigenação cair no oxímetro. O acompanhamento em UTI com aparelhos respiratórios é vital.',
      'Não use corticoides (prednisona): embora seja uma doença do sistema imune, estudos científicos provaram que remédios à base de cortisona não aceleram a cura e causam perda catastrófica adicional de massa muscular, piorando a fraqueza.',
      'Frango cru e bactérias intestinais: a ingestão de carne ou carcaças de frango cru contaminadas pela bactéria Campylobacter é uma das causas mais bem comprovadas de disparo da doença. O cozimento adequado dos alimentos previne essa infecção.',
      'Cuidado redobrado com a pele e a bexiga: animais imóveis deitados por semanas podem desenvolver feridas dolorosas na pele (úlceras de decúbito) e infecções urinárias. Eles precisam de colchão macio especial e ser virados de lado a cada 4 horas.',
      'A maioria se recupera completamente: apesar de assustadora, a polirradiculoneurite tem recuperação favorável se o animal for mantido estável nas primeiras 3 semanas. Com fisioterapia e suporte intensivo, os nervos se regeneram e a maioria volta a andar em 2 a 4 meses.',
    ],
    whatIs:
      'A polirradiculoneurite é uma inflamação imunomediada das raízes nervosas que provoca paralisia flácida progressiva das quatro patas, mantendo a consciência alerta, mas exigindo suporte intensivo para evitar complicações respiratórias.',
    warningSigns:
      'Marcha curta e rígida nas patas traseiras que vira fraqueza rápida, incapacidade de ficar em pé, patas frouxas e moles, perda visível de massa muscular nas coxas e ombros em poucos dias, latido rouco, fraco ou mudo, engasgos ao engolir água e respiração curta, ofegante ou com esforço na barriga.',
    diagnosis:
      'O diagnóstico é essencialmente clínico e de exclusão, apoiado por exame neurológico detalhado, eletrodiagnóstico precoce (exame elétrico dos nervos e músculos que já revela alterações nos primeiros dias), análise do líquido da espinha (LCR com proteínas aumentadas sem inflamação de células) e exclusão de carrapatos, toxinas e botulismo.',
    homeCare:
      'Após a fase crítica hospitalar, acomodar o cão sobre colchão pneumático ou cama macia e seca, mudando sua posição a cada 4 horas para prevenir feridas. Auxiliar no momento de urinar e defecar, oferecer alimentação rica na boca com o peito elevado, realizar exercícios de movimentação passiva das pernas orientados pelo fisioterapeuta veterinário e nunca forçar hidroterapia sem liberação médica.',
  },
  'tetano-caes-gatos': {
    whatIsIt:
      'O tétano é uma intoxicação do sistema nervoso extremamente grave, dolorosa e potencialmente fatal causada pela toxina tetanospasmina, produzida pela bactéria Clostridium tetani. Essa bactéria vive no solo, poeira e fezes sob a forma de esporos altamente resistentes. Quando o animal sofre um machucado profundo, corte nas patas, mordedura, perfuração por espinho, ferida cirúrgica ou até infecção de umbigo em filhotes, os esporos encontram um ambiente sem oxigênio e começam a produzir a toxina. A toxina viaja pelos nervos até a medula e o cérebro, onde quebra e destrói o freio natural que relaxa os músculos. Sem esse freio, todos os músculos do corpo recebem ordens contínuas para se contraírem ao mesmo tempo, deixando o animal rígido como uma estátua de madeira (marcha em cavalete), com a mandíbula travada fechada (trismo) e a expressão facial repuxada (riso sardônico). O cão ou gato permanece 100% consciente e lúcido durante todo o sofrimento, sentindo dores intensas e entrando em espasmos desesperadores a qualquer barulho, luz ou toque. A complicação mais perigosa é o fechamento repentino da garganta (laringoespasmo) ou paralisia da respiração, exigindo internação imediata em UTI e proteção em quarto escuro.',
    keyPoints: [
      'A consciência continua 100% lúcida e a dor muscular é real: o paciente não perde a consciência nem tem convulsão epiléptica. Ele ouve, enxerga e sente dor intensa pelas contrações musculares ininterruptas, necessitando de analgesia potente e ambiente com zero ruído.',
      'Quarto escuro e isolamento acústico salvam vidas: barulhos de portas, conversas, toques na pele ou luzes acesas disparam espasmos violentos que podem travar a garganta e sufocar o animal. A equipe coloca algodão nos ouvidos e o mantém no escuro absoluto.',
      'A boca trava fechada e o engasgo é fatal: o trismo mandibular impede que o cão abra a boca para comer ou latir. Tentar forçar comida ou água líquida na boca causa pneumonia aspirativa gravíssima. A nutrição precisa ser feita por sonda estomacal colocada pela equipe médica.',
      'Gatos têm uma apresentação diferente: enquanto cães costumam ficar rígidos no corpo todo, 78% dos gatos têm tétano focal, ficando com apenas uma pata traseira ou dianteira esticada e dura perto do local da ferida, com recuperação excelente (92% voltam a andar).',
      'Nunca lave feridas com água oxigenada (peróxido): a água oxigenada destrói as células saudáveis e queima os tecidos viáveis. A limpeza correta da ferida deve ser feita exclusivamente com soro fisiológico abundante e limpeza cirúrgica dos tecidos mortos.',
      'Antibiótico correto: o metronidazol é o medicamento de escolha comprovado cientificamente. A penicilina, embora mate a bactéria, bloqueia ainda mais os freios cerebrais e pode piorar as convulsões e espasmos.',
      'Ter tétano não gera imunidade para o futuro: como a quantidade de toxina que causa a doença é incrivelmente pequena, o sistema imune não aprende a produzir anticorpos de memória. O paciente curado pode pegar tétano novamente se sofrer novos ferimentos profundos.',
    ],
    whatIs:
      'O tétano é uma intoxicação neuroparalítica espástica grave provocada pela toxina de Clostridium tetani, que bloqueia o relaxamento muscular, gerando rigidez generalizada, espasmos dolorosos, risco de sufocamento e necessidade de UTI com privação sensorial.',
    warningSigns:
      'Mandíbula travada que não abre nem para comer (trismo), pele da testa franzida com orelhas empinadas e olhos puxados para dentro (riso sardônico), terceira pálpebra cobrindo os olhos, corpo duro com patas esticadas como cavalete de madeira, cauda empinada e rígida, salivação excessiva por não conseguir engolir, respiração acelerada ou engasgos com estridor laríngeo e espasmos musculares descontrolados ao menor som ou toque.',
    diagnosis:
      'O diagnóstico é essencialmente clínico e de urgência, baseado no exame físico e histórico de ferida recente. Exames de sangue avaliam o dano muscular profundo (enzima CK muito alta) e oxigenação sanguínea por gasometria para detectar retenção perigosa de gás carbônico.',
    homeCare:
      'A fase aguda requer internação incondicional em UTI. Após a alta hospitalar, manter o animal em quarto calmo, silencioso e com luz suave. Administrar relaxantes musculares e analgésicos rigorosamente nos horários prescritos. Oferecer alimentação pastosa em altura elevada até que a mastigação normalize. Realizar fisioterapia passiva delicada nas articulações orientada pelo veterinário e jamais aplicar água oxigenada ou pomadas caseiras sobre as feridas cicatrizadas.',
  },
  'brucelose-caes-gatos': {
    whatIsIt:
      'A brucelose canina é uma doença infecciosa crônica, silenciosa e transmissível para os seres humanos (zoonose), causada pela bactéria Brucella canis. Essa bactéria tem a capacidade especial de invadir e se esconder dentro das células de defesa do próprio cão (macrófagos), permanecendo no organismo por anos sem ser destruída. Embora seja muito famosa por causar abortos no final da gestação em cadelas e inflamação com dor nos testículos dos machos, a brucelose não atinge apenas cães de criação: ela também infecta cães castrados, cães que nunca cruzaram e filhotes, sendo uma causa muito comum de dor crônica na coluna (discospondilite) em cães jovens. Além disso, a bactéria de Brucella canis possui uma cobertura externa diferente (chamada de rugosa ou rough) que engana a maioria dos testes de laboratório comuns de humanos e bovinos, exigindo exames veterinários especializados. O ponto mais importante que todo tutor precisa compreender é que a brucelose é considerada uma infecção sem cura definitiva garantida: os antibióticos e a castração aliviam os sintomas e a dor, mas a bactéria continua abrigada em órgãos internos como a próstata e o baço, exigindo cuidados contínuos para evitar a contaminação de outros animais e da família.',
    keyPoints: [
      'A doença não é exclusiva de canis nem de animais que cruzam: cães castrados e animais que nunca tiveram contato reprodutivo podem pegar a bactéria pelo contato com urina contaminada, lambedura, farejamento ou pela mãe no nascimento.',
      'Causa frequente de dor na coluna em cães jovens: a bactéria atinge a circulação e se aloja nos discos e ossos da coluna (discospondilite), provocando dor intensa para andar e levantar, muitas vezes sem causar febre nem alterações no exame de sangue comum.',
      'Perigo máximo nos abortos: os restos de placenta e os fetos abortados contêm bilhões de bactérias vivas. Nunca manipule fetos ou secreções de parto sem luvas e máscara, pois esse é o momento de maior risco de infecção para os tutores.',
      'Exames normais de humanos ou de gado não funcionam: testes laboratoriais comuns para brucelose bovina dão resultado falso negativo em cães. O veterinário precisa pedir sorologia específica para Brucella canis.',
      'Melhorar com o remédio não significa que a bactéria sumiu: o cão pode parar de sentir dor e os exames podem melhorar, mas a bactéria continua escondida dentro das células. O tratamento controla a doença, mas não garante eliminação total.',
      'Castrar ajuda muito, mas não cura sozinho: a cirurgia de castração é fundamental para cessar o ciclo reprodutivo e diminuir as secreções, mas a próstata do macho continua infectada e ele pode continuar eliminando bactérias na urina.',
      'Afastamento permanente da procriação: qualquer cão diagnosticado com brucelose deve ser definitivamente retirado da reprodução para sempre, mesmo que pareça saudável e forte.',
      'Atenção especial com pessoas vulneráveis: gestantes, crianças pequenas, idosos ou pessoas com imunidade baixa correm maior risco de adoecer se conviverem com cães infectados, necessitando de acompanhamento médico.',
    ],
    whatIs:
      'A brucelose canina é uma infecção crônica e zoonótica causada por Brucella canis que se esconde dentro das células de defesa, provocando abortos, infertilidade, dor na coluna e infecção persistente sem garantia de cura completa.',
    warningSigns:
      'Aborto de filhotes no final da gestação (após 45 dias) com secreção vaginal escura e prolongada, inchaço doloroso ou encolhimento duro dos testículos no macho, lambedura excessiva do saco escrotal, dor persistente nas costas ou no pescoço ao se levantar, relutância em pular ou subir escadas, claudicação e olhos vermelhos ou esbranquiçados por uveíte.',
    diagnosis:
      'O diagnóstico é desafiador e exige exames de sangue especializados para Brucella canis (como 2ME-RSAT, CBM e imunodifusão AGID II), além de radiografia da coluna e exames diretos de PCR e cultura de sangue, sêmen ou secreções sob estrito aviso de risco biológico ao laboratório.',
    homeCare:
      'Administrar os antibióticos combinados exatamente no horário e por todo o período prescrito (de 1 a 3 meses), realizar a castração cirúrgica recomendada, manter o cão separado de outros animais da casa, usar luvas ao limpar a urina com água sanitária (hipoclorito), proibir cruzas e realizar exames de retorno semestrais por toda a vida.',
  },
  'megaesofago-caes-gatos': {
    whatIsIt:
      'O megaesôfago é uma condição na qual o esôfago — o tubo muscular que transporta a comida e a água da boca até o estômago — perde sua capacidade de contração (fica "flácido" ou "paralisado") e se dilata como uma bexiga frouxa. Com isso, os alimentos, líquidos e até a própria saliva que o animal engole não conseguem descer naturalmente e ficam parados acumulados dentro do esôfago. Pouco tempo depois de comer ou beber (ou mesmo horas depois), esse material retorna de forma passiva pela boca, sem esforço na barriga nem enjoo — um fenômeno chamado de regurgitação. O perigo mais grave dessa condição é que pedaços de comida, água ou saliva acumulados podem escapar para a traqueia e descer até os pulmões, provocando uma infecção grave e potencialmente fatal conhecida como pneumonia aspirativa. O megaesôfago não é uma doença única, mas sim um sinal de que algo interrompeu o funcionamento dos nervos ou músculos do esôfago. Embora existam filhotes que nascem com essa alteração (forma congênita, comum em Pastores Alemães), em cães adultos ela quase sempre tem uma causa por trás, como a Miastenia Gravis (uma doença autoimune tratável), inflamações intensas, intoxicações ou alterações hormonais. Com paciência, cadeira especial de alimentação (Cadeira de Bailey), consistência correta do alimento e vigilância contra pneumonias, muitos cães e gatos conseguem viver com excelente qualidade de vida e carinho por muitos anos.',
    keyPoints: [
      'Regurgitação não é vômito: no vômito o animal faz força com a barriga, tem náusea, saliva e passa mal antes; na regurgitação o alimento ou a água saem da boca de repente, de forma passiva, sem que o animal faça esforço abdominal.',
      'A pneumonia por aspiração é o maior perigo: quando o esôfago fica cheio de comida parada, o líquido pode escorrer para os pulmões. Tosse seca, respiração ofegante, cansaço fácil e febre são sinais de emergência que exigem atendimento veterinário imediato.',
      'Alimentação obrigatoriamente na vertical (Cadeira de Bailey): não adianta apenas colocar o pote no chão em cima de uma caixa ou tijolo. O peito e a coluna do animal precisam ficar em pé (a 90 graus do chão) como se ele estivesse sentado em uma cadeira humana, para que a gravidade empurre o alimento direto ao estômago.',
      'Permanecer em pé após a refeição: após terminar de comer, o paciente deve ficar na posição vertical por pelo menos 10 a 20 minutos para dar tempo de todo o conteúdo esvaziar para o estômago antes de ele voltar a deitar.',
      'Não existe uma textura de comida que sirva para todos: alguns animais engolem melhor almôndegas de ração úmida que escorregam inteiras, outros precisam de papinha líquida (slurry) e outros preferem ração pastosa. O veterinário ajuda a testar qual textura funciona melhor para o seu animal.',
      'Cuidado redobrado com a água: a água pura e líquida é frequentemente o elemento mais perigoso para engasgos. Pode ser necessário oferecer água gelificada, caldos espessados ou permitir que ele beba apenas dentro da cadeira vertical.',
      'Investigar sempre a causa no animal adulto: o megaesôfago pode ser o primeiro sinal de Miastenia Gravis ou doenças hormonais que possuem tratamento com remédios específicos capazes de devolver a força ao esôfago.',
      'Sonda no estômago ajuda na nutrição, mas não impede tudo: uma sonda de gastrostomia permite alimentar animais muito debilitados, mas a saliva acumulada no esôfago ainda pode causar aspiração se os cuidados posturais forem esquecidos.',
    ],
    whatIs:
      'O megaesôfago é uma dilatação flácida do esôfago provocada pela perda das contrações que empurram o alimento, gerando regurgitação passiva, risco de desnutrição e perigo de pneumonia aspirativa nos pulmões.',
    warningSigns:
      'Regurgitação frequente de comida ou água não digerida logo após comer ou ao abaixar a cabeça, tosse constante, cansaço desproporcional ao passear, respiração acelerada ou com barulho de catarro no peito, perda de peso rápida, baba espessa acumulada na boca e febre.',
    diagnosis:
      'O diagnóstico inicial é feito com radiografias do tórax e do pescoço, mostrando o esôfago largo e cheio de ar ou alimento. A causa deve ser investigada com exame de sangue para Miastenia Gravis (teste de anticorpos AChR-Ab), eletrólitos, função hormonal e, quando disponível, videofluoroscopia (um raio-x em vídeo da deglutição).',
    homeCare:
      'Alimentar o pet rigorosamente em pé na Cadeira de Bailey ou no colo em posição ereta, mantendo-o nessa postura por 15 a 20 minutos após a última mordida. Fracionar a alimentação em 3 a 5 pequenas porções ao dia. Nunca deixar potes de água livres no chão se o animal costuma engasgar; hidratar somente na posição vertical. Manter vigilância diária na respiração e temperatura, e nunca deitar o animal logo após comer ou tomar remédios.',
  },
  'paralisia-laringea-caes-gatos': {
    whatIsIt:
      'A paralisia laríngea é uma doença na qual a laringe (a "caixa de voz" e entrada da respiração na garganta) perde a capacidade de abrir quando o animal respira fundo. Em condições normais, toda vez que o cão ou gato inspira, músculos especiais puxam as cartilagens da garganta para os lados, abrindo bem o canal para o ar passar facilmente até os pulmões. Na paralisia, o nervo que comanda esses músculos sofre uma falha, e as cartilagens ficam caídas e moles no meio do caminho. Com isso, o espaço para o ar entrar fica muito apertado, provocando um barulho alto e agudo de falta de ar (chamado de estridor), cansaço rápido e sensação constante de sufocamento. Em cães idosos (especialmente Labradores e Golden Retrievers com mais de 9 anos), isso raramente é um problema isolado na garganta: na grande maioria das vezes, faz parte de uma síndrome chamada GOLPP, que é um envelhecimento e desgaste progressivo dos nervos mais compridos do corpo, fazendo com que o cão também sinta fraqueza nas pernas traseiras e dificuldade para engolir alimentos com o passar dos meses. Em gatos a doença é bem mais rara e costuma provocar uma mudança marcante: o gato para de miar direito ou perde totalmente a capacidade de ronronar.',
    keyPoints: [
      'O barulho agudo ao respirar é o sinal de alerta: o som de "apito" ou chiado alto quando o animal puxa o ar (estridor) indica que a garganta está muito fechada e exige avaliação veterinária.',
      'Perigo extremo em dias quentes e com agitação: cães não suam pelo corpo e precisam ofegar com a boca aberta para perder calor. Com a laringe fechada, o cão não consegue se resfriar, entra em pânico e desenvolve intermação (febre altíssima por calor) que pode ser fatal em minutos.',
      'Não é apenas velhice ou artrite: muitos tutores acham que o cão está apenas "ficando velho e cansado", mas o desânimo e a fraqueza muitas vezes decorrem da falta de oxigênio crônica e da neuropatia GOLPP.',
      'Gatos perdem o ronronar: em gatos com paralisia laríngea, a perda do som característico de ronronar (purr) associada a miado rouco é um dos sinais mais clássicos da doença.',
      'Exame sob sedação leve para confirmar: o diagnóstico definitivo é feito olhando a garganta com uma câmera ou laringoscópio enquanto o animal respira sozinho sob uma anestesia bem leve.',
      'A cirurgia de Tie-Back salva vidas: a cirurgia de lateralização da aritenoide coloca um ponto cirúrgico para manter um dos lados da garganta sempre aberto, permitindo que o ar volte a entrar livremente.',
      'NUNCA mais deixe o animal nadar: após a cirurgia, como a garganta não se fecha totalmente, se o animal entrar em piscina, lago ou mar, a água entra direto nos pulmões e ele pode se afogar rapidamente.',
      'Cuidado com a pneumonia por aspiração: com a garganta aberta, pequenos pedaços de comida ou líquidos podem escapar para o pulmão. Se o pet começar a tossir após comer, ficar prostrado ou tiver febre, procure o veterinário imediatamente.',
    ],
    whatIs:
      'A paralisia laríngea é uma falha neuromuscular na qual as cartilagens da laringe não abrem durante a respiração, estreitando a entrada de ar e provocando estridor agudo, cansaço fácil, risco de asfixia no calor e predisposição a pneumonias.',
    warningSigns:
      'Respiração ruidosa com som de apito ou chiado alto ao puxar o ar, mudança no tom do latido (voz rouca) ou perda do ronronar no gato, cansaço desproporcional em passeios curtos, engasgos com água, língua azulada ou arroxeada (cianose) no calor e fraqueza para levantar as patas traseiras.',
    diagnosis:
      'A confirmação exige laringoscopia direta sob anestesia leve mantendo a respiração espontânea, sincronizando o olhar com o tórax para flagrar a ausência de abertura das cartilagens, associada a radiografias do pescoço e tórax para investigar pneumonia aspirativa e megaesôfago.',
    homeCare:
      'Evitar passeios em horários quentes e locais úmidos, manter o ambiente sempre fresco com ar-condicionado ou ventilador, trocar definitivamente a coleira de pescoço por peitoral ergonômico, oferecer ração em formato de almôndegas úmidas, proibir terminantemente o pet de nadar ou entrar em piscinas e vigiar qualquer sinal de tosse ou cansaço respiratório.',
  },
};

export function getPlainLanguageForSlug(slug: string): DiseasePlainLanguage | undefined {
  return DISEASE_PLAIN_LANGUAGE[slug];
}
