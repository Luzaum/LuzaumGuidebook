import type { DiseasePlainLanguage } from '../../types/disease';

/**
 * Blocos “O que é em palavras simples?” — linguagem acessível para tutores.
 * Cada doença nova deve ter entrada aqui E `plainLanguage` no seed (ou import via getPlainLanguageForSlug).
 */
export const DISEASE_PLAIN_LANGUAGE: Record<string, DiseasePlainLanguage> = {
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
      'No colapso traqueal, a parede do tubo que leva o ar aos pulmões perde firmeza e pode se achatar enquanto o cão respira ou tosse. Isso costuma causar tosse seca em crises e, nos casos mais graves, dificuldade para respirar.',
    keyPoints: [
      'É mais comum em cães pequenos, mas a tosse sozinha não confirma o diagnóstico.',
      'Peso adequado, peitoral e distância de fumaça, calor e excitação ajudam a reduzir as crises.',
      'Língua azulada, desmaio, exaustão ou dificuldade para respirar em repouso exigem atendimento imediato.',
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
};

export function getPlainLanguageForSlug(slug: string): DiseasePlainLanguage | undefined {
  return DISEASE_PLAIN_LANGUAGE[slug];
}
