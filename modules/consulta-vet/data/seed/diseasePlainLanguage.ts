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
      '  - O consumo de plaquetas e fatores da coagulação pode superar a reposição pelo organismo e favorecer sangramentos. Nem todo animal sangra: a doença também pode se manifestar principalmente por pequenos coágulos e lesão de órgãos.',
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
      'Prevenção: testar, vacinar gatos em risco, evitar contato com gatos infectantes e manter em ambiente domiciliar.',
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
  'babesiose-caes-gatos': {
    whatIsIt:
      'A babesiose é uma infecção sanguínea causada por protozoários do gênero Babesia que invadem e destroem os glóbulos vermelhos (hemácias), gerando anemia hemolítica, queda de plaquetas e resposta inflamatória sistêmica capaz de sobrecarregar rins, fígado e outros órgãos.',
    keyPoints: [
      'Cães: no Brasil predomina Babesia vogeli (tratada com dipropionato de imidocarb), mas B. gibsoni também circula e exige atovaquona + azitromicina.',
      'Gatos: B. felis pode causar anemia crônica silenciosa sem febre, enquanto detecções moleculares incidentais no Brasil exigem correlação clínica cautelosa.',
      'Esfregaço negativo não exclui a doença e positividade sem sinais não prova causalidade: associe hematologia, PCR com especiação e investigação de coinfecções.',
    ],
    whatIs:
      'Entendendo a babesiose em cães e gatos:\n\n' +
      '- Parasita intraeritrocitário: protozoário que se multiplica dentro das hemácias, reduzindo a oferta de oxigênio aos tecidos e deflagrando hemólise e tromboinflamação.\n' +
      '- Espécies distintas exigem condutas distintas: grandes Babesia (como B. vogeli) e pequenas Babesia (como B. gibsoni e B. felis) respondem a antiprotozoários completamente diferentes.',
    warningSigns:
      'Sinais de alerta para atendimento veterinário imediato:\n\n' +
      '- Mucosas pálidas, brancas ou amareladas (icterícia), fraqueza súbita, taquipneia ou taquicardia.\n' +
      '- Urina escura (vermelho-vinho ou cor de café), febre, inapetência ou petéquias.\n' +
      '- Prostração extrema, desorientação, convulsões ou redução acentuada do débito urinário.',
    diagnosis:
      'Como o médico-veterinário confirma a espécie e a gravidade:\n\n' +
      '- Triagem inicial: hemograma completo (anemia, regeneração reticulocitária, plaquetopenia), esfregaço sanguíneo (incluindo sangue capilar de ponta de orelha), bioquímica sérica e urinálise.\n' +
      '- Confirmação molecular: PCR em sangue EDTA com identificação de espécie e pesquisa simultânea de coinfecções (Ehrlichia canis, Anaplasma spp., Rangelia vitalii e hemoplasmas).',
    homeCare:
      'Cuidados essenciais do tutor durante o manejo e a prevenção:\n\n' +
      '- Seguir rigorosamente dose, via e associação com alimento gorduroso quando prescrita atovaquona, sem nunca substituir formulações de primaquina ou imidocarb por conta própria.\n' +
      '- Manter controle ectoparasitário contínuo adequado para cada espécie (jamais aplicar permetrina canina em gatos) e evitar brigas com mordeduras.\n' +
      '- Realizar os retornos hematológicos e a PCR de acompanhamento tardia para confirmar recuperação medular e controle parasitário.',
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
  'doenca-renal-cronica-canina': {
    whatIsIt:
      'A doença renal crônica em cães é o desgaste lento e permanente dos rins ao longo do tempo:\n\n' +
      '- Filtros que não se recuperam: os rins perdem a capacidade de filtrar impurezas e de concentrar a urina, acumulando toxinas no sangue e eliminando água em excesso.\n' +
      '- Beber e urinar sem parar: o cão passa a ter muita sede e urina em grande quantidade (dia e noite) como tentativa de compensar os filtros desgastados.\n' +
      '- A comida certa prolonga a vida: a ração renal terapêutica com controle de fósforo é comprovadamente o tratamento que mais prolonga os anos de vida do cão.',
    keyPoints: [
      'Beber muita água e urinar em excesso dia e noite são os primeiros sinais de alerta de desgaste dos rins.',
      'A ração renal exclusiva reduz o risco de crises em 75% e dobra o tempo de vida com bem-estar.',
      'Petiscos comuns, carnes e ossos contêm muito fósforo e sobrecarregam os rins, sendo terminantemente proibidos.',
      'Cães que perdem músculo podem ter creatinina falsamente normal; o exame de SDMA ajuda a enxergar a lesão real.',
      'Remédios modernos como a telmisartana protegem os rins e diminuem a perda prejudicial de proteínas na urina.',
      'A anemia do rim doente é tratada mais cedo atualmente, quando o hematócrito cai abaixo de 30%.',
    ],
    whatIs:
      'Entendendo o desgaste crônico dos rins caninos:\n\n' +
      '- Perda contínua de unidades de filtragem: com o passar dos anos ou por infecções antigas, os néfrons deixam de funcionar e não se regeneram.\n' +
      '- Falha no equilíbrio do sangue: substâncias importantes como o fósforo ficam presas no corpo, enquanto água e proteínas vitais escapam pela urina.',
    warningSigns:
      'Sinais clínicos de alerta que exigem avaliação do veterinário:\n\n' +
      '- Aumento nítido da ingestão de água e cão pedindo para urinar de madrugada ou urinando na cama.\n' +
      '- Emagrecimento progressivo, perda de massa muscular nas costas e na cabeça e pelos opacos e arrepiados.\n' +
      '- Hálito com cheiro forte (semelhante a urina ou amônia), vômitos matinais de espuma e feridas na boca ou na língua.',
    diagnosis:
      'Como o médico-veterinário avalia a gravidade e o estágio da doença:\n\n' +
      '- Exames de sangue completos: creatinina e SDMA avaliados juntos para medir a filtração, além de dosagem de fósforo, cálcio e hemograma.\n' +
      '- Urina colhida na clínica: medição da densidade (para ver se o rim concentra) e teste de perda de proteína (UPC).\n' +
      '- Medição da pressão arterial e ultrassom: para checar se a pressão está alta e verificar o tamanho e a textura dos rins.',
    homeCare:
      'Cuidados indispensáveis da família no dia a dia:\n\n' +
      '- Fornecer exclusivamente a ração renal prescrita, sem nenhuma exceção para pedaços de carne, queijo ou petiscos ricos em fósforo.\n' +
      '- Oferecer os medicamentos quelantes de fósforo misturados diretamente na comida, no momento exato em que o cão se alimenta.\n' +
      '- Garantir livre acesso a água fresca em múltiplos potes pela casa e pesar o cão a cada 15 dias para vigiar a perda de massa magra.',
  },
  'doenca-renal-cronica-felina': {
    whatIsIt:
      'A doença renal crônica felina é o desgaste lento, silencioso e progressivo dos rins do gato ao longo do tempo:\n\n' +
      '- Desgaste silencioso e irreversível: os filtros dos rins vão perdendo a capacidade de eliminar toxinas e de reter água, acumulando impurezas no sangue e provocando perda de líquido.\n' +
      '- O gato começa a emagrecer antes dos outros sintomas: a perda de peso sutil e a perda de músculo nas costas iniciam anos antes do gato manifestar vômitos ou sede excessiva.\n' +
      '- Ração renal é o tratamento mais poderoso: trocar o alimento para uma dieta renal de qualidade com controle de fósforo é a medida comprovada que mais aumenta o tempo e a qualidade de vida do gato.',
    keyPoints: [
      'Todo gato com 7 anos ou mais deve fazer check-up renal anual, mesmo parecendo completamente saudável.',
      'A perda de peso insidiosa e a coluna vertebral mais saliente são os primeiros sinais de alerta de desgaste dos rins.',
      'A dieta renal prescrita é o remédio mais eficaz contra a progressão da doença; nunca misture com carnes ou petiscos comuns.',
      'Gatos renais podem desenvolver excesso de cálcio no sangue com dietas renais, exigindo acompanhamento veterinário do cálcio ionizado.',
      'Remédios modernos como telmisartana protegem os rins contra a perda de proteínas e controlam a pressão alta com comodidade.',
      'Soro na pele (subcutâneo) não deve ser aplicado de rotina em todo gato; o excesso de líquido pode sobrecarregar o coração.',
    ],
    whatIs:
      'Entendendo o desgaste crônico dos rins nos felinos:\n\n' +
      '- Perda contínua de néfrons: por causas genéticas (como cistos em persas), infecções passadas ou pelo próprio envelhecimento, os filtros dos rins diminuem em número e não se regeneram.\n' +
      '- Retenção de toxinas e fósforo: com menos filtros trabalhando, o fósforo e as toxinas urêmicas acumulam-se no organismo, enquanto a urina sai clara e sem concentração adequada.',
    warningSigns:
      'Sinais de alerta no gato que exigem consulta veterinária sem demora:\n\n' +
      '- Caixa de areia com torrões de xixi muito maiores que o normal e potes de água esvaziando mais rápido.\n' +
      '- Espinha e ossos da bacia ficando salientes ao toque, perda de peso na balança e pelagem sem brilho com aspecto arrepiado.\n' +
      '- Vômitos frequentes de baba ou espuma branca (muitas vezes confundidos com bolas de pelo), perda de apetite e lambedura labial constante (náusea).\n' +
      '- Olhar vidrado ou pupilas dilatadas que podem indicar pressão alta afetando os olhos.',
    diagnosis:
      'Como o veterinário descobre e classifica a doença renal do gato:\n\n' +
      '- Exames de sangue completos: creatinina e SDMA avaliados em conjunto com a hidratação e a massa muscular, além de fósforo, cálcio ionizado e hemograma para checar anemia.\n' +
      '- Exame de urina com densidade e UPC: para avaliar a perda de proteínas e a capacidade de concentrar o xixi.\n' +
      '- Medição da pressão arterial e ultrassom abdominal: para checar se a pressão está elevada e avaliar o tamanho e as alterações dos rins.',
    homeCare:
      'Cuidados indispensáveis da família em casa para proteger o gato:\n\n' +
      '- Oferecer água fresca e corrente em fontes elétricas tipo cascata e espalhar recipientes de louça ou vidro pela casa longe da caixa de areia.\n' +
      '- Dar preferência a alimentos úmidos (sachês ou latas) de fórmula renal e nunca dar medicamentos por via forçada que causem aversão à comida.\n' +
      '- Proibir lírios e plantas tóxicas em casa e jamais administrar analgésicos humanos (como paracetamol ou anti-inflamatórios) que destroem os rins dos gatos.',
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
      'O hipoadrenocorticismo (doença de Addison) ocorre quando as glândulas adrenais de cães ou gatos deixam de produzir quantidades suficientes de cortisol e, na maioria dos casos, aldosterona — hormônios essenciais para responder ao estresse, manter a pressão arterial e equilibrar sódio e potássio.',
    keyPoints: [
      'Conhecido como “grande imitador” porque os sintomas vão e voltam e se confundem com gastroenterite ou doença renal.',
      'A forma sem alteração de sódio e potássio (eunatrêmica/eucalêmica) também existe e pode atrasar o diagnóstico.',
      'Crises agudas causam fraqueza extrema, tremores, bradicardia e choque, exigindo atendimento veterinário imediato.',
      'Após estabilização, a maioria dos cães e gatos leva vida normal com reposição hormonal contínua e acompanhamento periódico.',
    ],
    whatIs:
      'As glândulas adrenais produzem cortisol (que ajuda o organismo a lidar com estresse, inflamação e manter a glicose no sangue) e aldosterona (que controla a água corporal, o sódio e a eliminação de potássio pelos rins). Quando o córtex adrenal sofre lesão — mais comumente autoimune em cães, ou por processo inflamatório/infiltrativo como linfoma ou trauma em gatos — esses hormônios ficam deficientes. Em casos mais raros, a falha está na hipófise ou na suspensão abrupta de corticoides usados por tempo prolongado.',
    warningSigns:
      'Procure atendimento veterinário imediato se notar:\n\n' +
      '- Prostração acentuada, fraqueza muscular, tremores ou incapacidade de permanecer em pé.\n' +
      '- Vômitos, diarreia (às vezes com sangue escuro), perda de apetite e emagrecimento progressivo.\n' +
      '- Desidratação, gengivas pálidas ou frias e frequência cardíaca lenta apesar da fraqueza (alerta máximo de potássio alto).\n' +
      '- Sede e volume de urina aumentados em alguns pacientes, seguidos de colapso repentino após estresse (banho, viagem, cirurgia).',
    diagnosis:
      'Exames de sangue rotineiros frequentemente mostram sódio baixo, potássio elevado, aumento de ureia/creatinina, ausência de resposta de estresse nos glóbulos brancos ou glicose baixa, mas também podem vir normais nas formas sem alteração eletrolítica. A confirmação definitiva é feita com o teste de estimulação com ACTH (medindo o cortisol antes e após a aplicação do hormônio estimulante), associado à ultrassonografia das adrenais quando necessário.',
    homeCare:
      'Cuidados e prevenção de crises em casa:\n\n' +
      '- Nunca interromper ou reduzir por conta própria a prednisona/prednisolona ou a fludrocortisona prescritas.\n' +
      '- Cumprir rigorosamente os retornos para dosagem de eletrólitos e ajuste do intervalo das aplicações de DOCP.\n' +
      '- Avisar sempre o médico-veterinário antes de cirurgias, internações, viagens ou eventos muito estressantes, pois pode ser necessário aumentar temporariamente o corticoide.\n' +
      '- Procurar pronto atendimento imediato se o animal apresentar vômitos persistentes, recusa alimentar total ou prostração intensa.',
  },
  'hipertireoidismo-felino': {
    whatIsIt:
      'O hipertireoidismo felino acontece quando a tireoide produz hormônios em excesso, deixando o metabolismo acelerado:\n\n' +
      '- Causa principal: proliferação benigna dos tecidos da tireoide (adenoma ou hiperplasia), sem caráter infeccioso.\n' +
      '- Perfil típico: endocrinopatia extremamente comum em gatos idosos, provocando emagrecimento rápido e sobrecarga cardiovascular.',
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
      'A asma felina é uma inflamação crônica e alérgica das vias aéreas menores dos pulmões dos gatos:\n\n' +
      '- O que acontece nos pulmões: quando o gato respira poeira, fumaça, pólen ou outros estímulos, as paredes dos brônquios inflamam, produzem excesso de muco e a musculatura se contrai, dificultando principalmente a saída do ar (expiração).\n' +
      '- Por que exige cuidado contínuo: mesmo quando o gato para de tossir, a inflamação pode permanecer ativa; o controle combina anti-inflamatório adequado e melhora do ambiente.',
    keyPoints: [
      'A tosse do gato costuma ser confundida com tentativa de vomitar bola de pelo (ele se agacha, estica o pescoço e tosse sem expelir nada).',
      'Respiração de boca aberta, língua arroxeada ou cansaço intenso são sinais de emergência veterinária — evite conter o gato à força.',
      'O tratamento principal controla a inflamação (corticoides, preferencialmente por via inalatória com espaçador); a bombinha broncodilatadora de resgate alivia crises, mas não trata a doença sozinha.',
      'Antes de fechar o diagnóstico, o veterinário precisa descartar vermes pulmonares, dirofilariose e problemas cardíacos.',
    ],
  },
  'bronquite-cronica-caes-gatos': {
    whatIsIt:
      'A bronquite crônica em cães e gatos é uma inflamação persistente e desgastante dos brônquios (os canos que levam ar aos pulmões):\n\n' +
      '- Falha na esteira de limpeza: os pulmões possuem cílios microscópicos que funcionam como uma esteira rolante para expulsar poeira e muco; na bronquite crônica, essa esteira quebra, acumulando catarro grosso que o animal não consegue eliminar.\n' +
      '- Tosse que não passa: define-se pela presença de tosse quase diária por pelo menos dois meses consecutivos, após descartar problemas de coração, vermes de pulmão e infecções.\n' +
      '- Diferença entre cães e gatos: no cão, a doença causa tosse seca e engasgos com dano na cartilagem dos brônquios (broncomalácia); no gato, a tosse costuma ser confundida com tentativas de vomitar bolas de pelo, mas pode evoluir com crises perigosas de falta de ar.',
    keyPoints: [
      'Tosse por mais de 2 meses seguidos exige investigação completa dos pulmões e do coração antes de tomar qualquer remédio.',
      'Gato tossindo parece que vai vomitar bola de pelo: ele se agacha, estica o pescoço rente ao chão e tosse com força; isso é problema respiratório e não estomacal.',
      'A bombinha com espaçador (máscara facial) é o melhor tratamento de manutenção: o remédio vai direto para o pulmão sem causar os efeitos colaterais dos comprimidos no corpo.',
      'Antibiótico não cura bronquite crônica de rotina: a inflamação geralmente é estéril; antibióticos só devem ser usados quando exames confirmam bactérias ativas.',
      'Fumaça de cigarro, vape, incensos, velas perfumadas e poeira de areia sanitária pioram muito a doença e devem ser eliminados de casa.',
      'Cães com tosse crônica devem usar exclusivamente peitoral para passear: puxões na coleira de pescoço esmagam a traqueia e disparam crises violentas de tosse.',
    ],
    whatIs:
      'A bronquite crônica é uma inflamação contínua das vias aéreas dos pulmões com excesso de muco grosso e tosse frequente por mais de dois meses.',
    warningSigns:
      'Tosse diária que parece engasgo, esforço com a barriga para soltar o ar, chiado no peito, desmaio logo após tossir muito forte, e respiração com a boca aberta no gato (emergência grave).',
    diagnosis:
      'O diagnóstico é feito por exclusão com raio-X de tórax, ecocardiograma do coração, exames de fezes para vermes pulmonares e lavado broncoalveolar com anestesia para examinar as células do catarro ao microscópio.',
    homeCare:
      'Eliminar fumaça, perfumes e aerossóis de casa, trocar areia do gato por tipo sem pó e sem cheiro, usar peitoral em cães, manter o peso do animal magro e aplicar a bombinha inalatória com carinho e reforço positivo todos os dias.',
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
      'Entendendo o linfoma cutâneo em pequenos animais:\n\n' +
      '- O que é a neoplasia:\n' +
      '  - Câncer originado nos linfócitos (células de defesa) que acomete primariamente a pele de cães e gatos, compreendendo um grupo heterogêneo de tumores com comportamentos clínicos distintos.\n' +
      '- Forma mais frequente (linfoma epiteliotrópico):\n' +
      '  - No cão, as células neoplásicas têm atração pelas camadas superficiais da pele (micose fungoide), provocando descamação difusa, vermelhidão intensa e placas ulceradas.\n' +
      '- Sinais de alerta clássicos:\n' +
      '  - Perda da coloração escura (despigmentação) no focinho, lábios e coxins, feridas que não cicatrizam e coceira que mimetiza alergias graves ou sarnas por longos períodos.',
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
      'Entendendo a Leishmaniose em Cães e Gatos:\n' +
      '- O que é a doença: infecção crônica e zoonótica causada pelo protozoário Leishmania, transmitido pela picada do mosquito-palha (flebotomíneo).\n' +
      '- Agressão imunológica: o parasita multiplica-se dentro das células de defesa (macrófagos); o organismo produz grande quantidade de anticorpos que não eliminam o protozoário e formam grumos inflamatórios (imunocomplexos).\n' +
      '- Lesões orgânicas: a deposição desses grumos circulantes inflama rins, pele, articulações e olhos, gerando os sintomas e riscos característicos da doença.',
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
    whatIs:
      'A leishmaniose é uma doença parasitária grave transmitida pela picada do mosquito-palha. O protozoário ataca as células de defesa e o organismo reage produzindo anticorpos em excesso, que acabam inflamando os rins, pele, articulações e olhos.',
    warningSigns:
      'Principais sinais de alerta da leishmaniose:\n' +
      '- Lesões na pele e unhas: descamação seca prateada, perda de pelo periocular em óculos, feridas persistentes em orelhas e focinho, e crescimento exagerado das unhas (onicogrifose).\n' +
      '- Sinais sistêmicos: emagrecimento progressivo, fraqueza, sangramento nasal (epistaxe) e inflamação nos olhos (uveíte com vermelhidão ou sangue).',
    diagnosis:
      'Como o veterinário confirma o diagnóstico:\n' +
      '- Exame padrão ouro: análise microscópica direta (citologia) de linfonodos ou medula para identificar o parasita nas células.\n' +
      '- Exames complementares: dosagem de anticorpos no sangue (sorologia), PCR para detectar o DNA do parasita e exame de urina com UPC para monitorar os rins.',
    homeCare:
      'Cuidados essenciais no dia a dia em casa:\n' +
      '- Proteção repelente: uso permanente de coleira repelente específica trocada rigorosamente no prazo (flumetrina para gatos; deltametrina para cães).\n' +
      '- Medicamentos e acompanhamento: administração pontual dos remédios prescritos, alimentação com controle de purinas e exames de sangue e urina a cada 3 a 6 meses.',
  },

  'cistite-idiopatica-felina': {
    whatIsIt:
      'Entendendo a Cistite Idiopática Felina (CIF / FIC):\n' +
      '- Inflamação dolorosa estéril:\n' +
      '  - Doença inflamatória crônica e dolorosa da bexiga que afeta principalmente gatos jovens e de meia-idade, sem infecção bacteriana, cálculos obstrutivos primários ou neoplasias.\n' +
      '- Síndrome sistêmica e não apenas da bexiga:\n' +
      '  - Evidências científicas contemporâneas comprovam que a CIF integra a Síndrome de Pandora, sendo a manifestação de uma sensibilidade neurobiológica profunda do organismo do gato.\n' +
      '- Eixo cérebro-bexiga hiperexcitado:\n' +
      '  - O cérebro do felino suscetível reage de forma intensa a mudanças ambientais e estressores, disparando vias neurais que liberam neuropeptídeos inflamatórios na parede vesical, gerando dor, espasmos e queimação ao urinar.',
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
      'A platinosomose (ou platinossomíase felina) é uma doença parasitária grave provocada pelo verme Platynosomum illiciens:\n' +
      '- Localização no organismo: ao contrário de vermes comuns que habitam o intestino, ele instala-se nos canais da bile (ductos biliares) e na vesícula biliar do gato.\n' +
      '- Forma de contágio: ocorre quando o felino caça animais contaminados por larvas — principalmente tatuzinhos-de-jardim e lagartixas de parede.\n' +
      '- Danos causados: a presença dos vermes gera inflamação intensa e cicatrizes que entopem os canais, impedindo o fluxo normal da bile.\n' +
      '- Consequências clínicas: o refluxo de bile para o sangue causa icterícia (amarelamento de olhos, pele e gengivas), vômitos, perda de apetite e risco de dano hepático irreversível.',
    keyPoints: [
      'O gato não precisa comer lagartixas visivelmente: pesquisas brasileiras recentes demonstraram que tatuzinhos-de-jardim e pequenos artrópodes de quintal também transmitem o parasita. Gatos com acesso a quintais ou à rua estão sob risco mesmo que o tutor nunca os tenha visto caçar lagartos.',
      'O exame de fezes comum de rotina frequentemente dá falso-negativo: como os ovos do verme são pesados, saem em pequena quantidade e os canais biliares podem estar entupidos, o exame de fezes simples pode vir negativo mesmo em gatos doentes. É necessário solicitar um método especial de centrifugação em solução densa (solução de Sheather) ou coletar uma amostra direta de bile por agulha guiada por ultrassom (colecistocentese).',
      'Olhos, pele e gengivas amarelas (icterícia): o acúmulo de bile nos tecidos é o sinal clínico mais característico da doença, frequentemente acompanhado de vômitos, perda de peso, prostração e dor na barriga.',
      'A dose comum de vermífugo de rotina não cura a doença: a dose habitual de praziquantel usada para outros vermes (5 mg/kg) é insuficiente para eliminar o Platynosomum nos ductos biliares. O veterinário precisará prescrever doses muito mais altas e por vários dias seguidos conforme compêndios especializados.',
      'Mesmo após a morte dos vermes, o fígado pode demorar para sarar: as cicatrizes e o inchaço nos canais biliares podem persistir por semanas ou meses após o tratamento, exigindo remédios protetores hepáticos, dieta especial e ultrassons de controle periódico.',
      'Prevenção número um: manter o gato exclusivamente dentro de casa, bloqueando o acesso a quintais e janelas onde haja lagartixas e tatuzinhos-de-jardim.'
    ],
    whatIs:
      'A platinosomose felina é uma infecção dos canais biliares e da vesícula do gato provocada por um verme microscópico transmitido pela caça de tatuzinhos-de-jardim e lagartixas, causando inflamação da vesícula, icterícia e danos hepáticos.',
    warningSigns:
      'Amarelamento dos olhos, gengivas e pele (icterícia), urina escura como refrigerante de cola, fezes claras, vômitos frequentes, perda rápida de peso, desânimo severo e aumento do volume ou dor na barriga.',
    diagnosis:
      'Exames essenciais para o diagnóstico veterinário:\n' +
      '- Ultrassom abdominal: avalia dilatação, espessamento e tortuosidade dos ductos biliares e da vesícula.\n' +
      '- Exames de sangue: dosagem de enzimas do fígado, bilirrubinas e pesquisa de aumento acentuado de eosinófilos.\n' +
      '- Coproparasitológico especializado: técnica de centrifugação com solução densa de Sheather para achar ovos pesados.\n' +
      '- Análise direta da bile (colecistocentese): aspiração da bile por agulha guiada por ultrassom quando o exame de fezes for negativo.',
    homeCare:
      'Cuidados essenciais no domicílio durante o tratamento:\n' +
      '- Isolamento domiciliar estrito: manter o gato 100% confinado sem acesso a quintais, caça de lagartixas ou tatuzinhos.\n' +
      '- Rigor na medicação: administrar os remédios nas doses e horários prescritos sem interrupção precoce.\n' +
      '- Nutrição constante: oferecer alimento úmido atrativo para evitar jejum prolongado e risco de lipidose hepática.\n' +
      '- Acompanhamento clínico: retornar pontualmente às revisões para reavaliação por ultrassom e exames de sangue.',
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
      'A intermação (também conhecida como golpe de calor ou heatstroke) é uma emergência médica gravíssima em que o corpo do cão ou gato aquece a temperaturas extremas e perde a capacidade de se resfriar. Ao contrário dos humanos, que transpiram pela pele inteira, os animais só conseguem perder calor ofegando pela boca (respiração ofegante). Quando a temperatura do ambiente sobe muito, quando o ar está muito úmido, ou quando o animal se exercita em dias quentes, o calor acumula-se rapidamente e começa a cozinhar as células por dentro, causando destruição de tecidos, inflamação em todo o organismo e falência de órgãos vitais como rins, fígado, cérebro e intestino. Trata-se de uma emergência de risco iminente de morte que exige primeiros socorros imediatos pelo tutor e atendimento veterinário de urgência em UTI.',
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
      'A brucelose é uma infecção bacteriana crônica e zoonótica (transmissível aos seres humanos), causada principalmente pela *Brucella canis* nos cães:\n\n' +
      '- Por que é persistente: a bactéria entra pelas mucosas e consegue sobreviver escondida dentro das células de defesa, permanecendo por longos períodos sem causar febre ou alterações no hemograma.\n' +
      '- Quem pode adoecer: além de abortos e dor testicular em animais reprodutores, a brucelose também afeta cães castrados (causando dor crônica na coluna ou inflamação ocular). Em gatos, relatos de infecção são excepcionais.',
    keyPoints: [
      'Cães castrados e animais sem histórico reprodutivo também podem ter brucelose (especialmente em casos de dor vertebral crônica).',
      'Testes usados em bovinos não detectam Brucella canis — é obrigatório solicitar sorologia específica para a espécie canina.',
      'Nenhum exame negativo isolado (sorologia, PCR ou cultura) garante que a bactéria não esteja presente.',
      'Não há garantia de cura bacteriológica completa com antibióticos: o tratamento e a castração diminuem o risco de eliminação e melhoram sinais, mas o cão deve ser afastado definitivamente da reprodução.',
      'Secreções genitais, sêmen e material de abortamento têm alta carga bacteriana e exigem luvas e cuidados de higiene para proteger tutores e equipe veterinária.',
    ],
  },
  'megaesofago-caes-gatos': {
    whatIsIt:
      'O megaesôfago é uma síndrome em que o esôfago (o tubo muscular que leva comida, água e saliva da boca até o estômago) perde a força ou a coordenação dos movimentos e fica dilatado. Com isso, alimentos, água e saliva ficam parados no esôfago em vez de descerem normalmente e acabam retornando pela boca (regurgitação) ou escapando para os pulmões (pneumonia aspirativa).',
    keyPoints: [
      'Regurgitação não é vômito: no vômito o animal faz força na barriga, tem náusea e pode eliminar bile; na regurgitação o alimento inteiro ou água sai de repente, de forma passiva, sem esforço abdominal.',
      'Investigar a causa sempre que surgir em adulto: o megaesôfago frequentemente é sinal de outra doença tratável, como miastenia gravis (mesmo sem fraqueza nas pernas) ou alterações hormonais (hipoadrenocorticismo).',
      'A pneumonia aspirativa é a complicação mais grave: tosse úmida, respiração rápida, secreção nasal ou febre exigem avaliação veterinária imediata.',
      'Alimentação na posição vertical (cadeira de Bailey em cães ou apoio elevado em gatos): o tronco precisa ficar em pé durante a refeição e por 15 a 30 minutos após comer e beber para a gravidade levar o alimento ao estômago.',
      'Consistência sob medida: cada animal responde melhor a uma textura (almôndegas macias ou comida pastosa); água pura costuma regurgitar mais fácil e pode precisar de adaptação.',
      'Sonda de gastrostomia nutre, mas não resolve a saliva: mesmo com sonda no estômago, o animal continua produzindo saliva que pode ser aspirada se os cuidados de boca e postura forem negligenciados.',
    ],
    whatIs:
      'O megaesôfago é a dilatação e perda de movimento do esôfago, causando regurgitação passiva, risco de desnutrição e perigo de pneumonia aspirativa.',
    warningSigns:
      'Regurgitação passiva de alimento inteiro ou água após comer, tosse úmida, secreção nasal, respiração acelerada ou ofegante em repouso, febre, saliva em excesso, abaulamento no pescoço e perda de peso apesar de apetite normal.',
    diagnosis:
      'Começa diferenciando regurgitação de vômito e fazendo radiografias do pescoço e tórax. Depois o veterinário investiga causas tratáveis com exames de sangue (anticorpos para miastenia gravis, cortisol/ACTH) e, quando indicado, videofluoroscopia (um raio-x em movimento da deglutição).',
    homeCare:
      'Alimentar o animal rigorosamente na vertical (cadeira de Bailey em cães ou apoio vertical em gatos) mantendo a postura por 15 a 30 minutos após comer e beber, dividir em 3 a 6 pequenas refeições por dia na textura orientada pelo veterinário, vigiar a respiração em repouso e nunca forçar comprimidos ou líquidos com o pet deitado.',
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
  'enteropatia-perdedora-de-proteinas-caes-gatos': {
    whatIsIt:
      'A enteropatia perdedora de proteínas (PLE) é uma síndrome em que o intestino do cão ou gato perde a capacidade de reter as proteínas vitais do sangue:\n\n' +
      '- O intestino como filtro furado: as proteínas plasmáticas, sobretudo a albumina, vazam para o trato digestivo em taxa superior à capacidade de reposição do fígado.\n' +
      '- Consequências do extravasamento: a queda da albumina retira a força que segura a água nos vasos, provocando barriga d\'água (ascite), inchaço nas patas e efusão no peito.\n' +
      '- Ocorrência e gravidade: afecção frequente e grave no cão (Yorkshire, Pastor Alemão, Maltês), sendo rara no gato e frequentemente associada a linfoma.',
    keyPoints: [
      'Nem todo paciente tem diarreia: cerca de 30% dos cães com a síndrome nunca apresentam diarreia ou vômito evidentes; o primeiro sinal percebido pelo tutor pode ser a barriga inchada de líquido (ascite), perda de massa muscular rápida ou fraqueza.',
      'A gordura é o maior vilão da linfa: a gordura da alimentação precisa dos vasos linfáticos do intestino (lacteais) para ser absorvida. Quando esses vasos estão doentes ou entupidos (linfangiectasia), comer gordura aumenta a pressão nesses vasos até que eles arrebentem, vazando linfa e proteínas. Por isso, a dieta ultrabaixa em gordura é o tratamento mais potente para muitos cães.',
      'Perigo invisível de trombose: com a perda de proteínas anticoagulantes pelo intestino e o sangue inflamado, os pacientes têm alto risco de formar coágulos que entopem artérias e veias vitais (tromboembolismo), exigindo medicamentos anticoagulantes protetores.',
      'A albumina na veia não cura o problema: aplicar plasma ou albumina na veia traz um benefício muito curto (apenas horas a poucos dias), pois o intestino continuará vazando se a alimentação certa e os medicamentos não corrigirem a parede intestinal.',
      'A resposta à dieta pode ser milagrosa: muitos cães classificados erroneamente como intratáveis recuperam totalmente os níveis de proteína apenas mudando para rações com teor ultrabaixo de gordura ou dietas caseiras prescritas por nutrólogo veterinário.',
      'Em gatos exige investigação aprofundada: a síndrome é incomum nos felinos e frequentemente requer biópsias para distinguir entre enterite inflamatória crônica e linfoma intestinal de baixo grau.',
    ],
    whatIs:
      'Entendendo a síndrome de perda proteica intestinal:\n\n' +
      '- Perda contínua: escape de albumina e globulinas pela parede intestinal por inflamação ou dilatação de vasos linfáticos.\n' +
      '- Impacto clínico: retenção de líquidos na cavidade abdominal (ascite), perda de massa magra e risco de coagulação desregulada.',
    warningSigns:
      'Sinais clínicos de alerta que exigem avaliação veterinária imediata:\n\n' +
      '- Aumento rápido e flácido do abdômen por líquido (ascite) ou inchaço compressível em patas e barbela (edema).\n' +
      '- Emaciação muscular progressiva ao longo da coluna e ossos da cabeça, mesmo com apetite conservado.\n' +
      '- Cansaço fácil, respiração rápida ou superficial e episódios de fezes pastosas, amareladas ou esteatorreicas.',
    diagnosis:
      'Roteiro diagnóstico estruturado em três perguntas essenciais:\n\n' +
      '- Confirmação laboratorial: exames de sangue demonstrando hipoalbuminemia e urinálise com UPC para excluir perda renal.\n' +
      '- Ultrassonografia abdominal: busca de estriações brancas na parede intestinal (linfangiectasia) e líquido livre peritoneal.\n' +
      '- Investigação funcional: dosagem de cobalamina (vitamina B12), cálcio ionizado, magnésio e biópsias intestinais quando indicadas.',
    homeCare:
      'Instruções inegociáveis para o manejo domiciliar pelo tutor:\n\n' +
      '- Rigor absoluto na dieta: oferecer exclusivamente a ração ultrabaixa em gordura ou receita caseira prescrita por nutrólogo, sem nenhum petisco gorduroso.\n' +
      '- Medicação preventiva: administrar pontualmente a tromboprofilaxia prescrita (como clopidogrel) e reposições vitamínicas.\n' +
      '- Monitoramento constante: pesar semanalmente o pet, medir a circunferência abdominal e vigiar o ritmo respiratório em repouso.',
  },
  'enteropatia-inflamatoria-cronica-canina': {
    whatIsIt:
      'A enteropatia inflamatória crônica (CIE, antigamente chamada de IBD canina) é uma inflamação duradoura na parede do intestino do cão:\n\n' +
      '- Desequilíbrio entre defesas e digestão: o sistema imune do cão perde a tolerância natural e passa a reagir exageradamente contra ingredientes da comida ou bactérias normais do intestino.\n' +
      '- A comida é o remédio mais potente: pesquisas recentes mostram que até 89% dos cães melhoram completamente apenas trocando para uma dieta terapêutica exclusiva, sem precisar de remédios fortes.\n' +
      '- Fim dos antibióticos de rotina: remédios como o metronidazol não são mais indicados de forma empírica, pois desregulam a flora intestinal e criam bactérias resistentes.',
    keyPoints: [
      'A dieta certa é o tratamento de primeira escolha: a grande maioria dos cães alcança remissão total apenas com rações especiais (hidrolisadas ou com proteínas inéditas), sem necessidade de imunossupressores.',
      'Tolerância zero a qualquer petisco: durante o teste alimentar de 2 a 4 semanas, nenhuma migalha de pão, queijo, fruta, ossinho mastigável ou carne fora da dieta pode ser oferecida.',
      'Se a primeira ração não funcionar, tente a segunda: o consenso internacional recomenda tentar até três tipos de dietas terapêuticas diferentes antes de considerar que a alimentação falhou.',
      'Antibióticos não curam a inflamação intestinal: usar metronidazol ou tilosina sem critério altera a microbiota de forma permanente e mascara os sintomas sem resolver a causa.',
      'Vitamina B12 pode ser tomada por via oral: dar cianocobalamina em comprimido diário por 84 dias tem o mesmo efeito protetor e curativo que injeções semanais.',
      'Corticoides são reservados para casos resistentes: prednisona ou budesonida só devem ser iniciadas após documentar falha dietética ou se o cão tiver perda perigosa de peso e proteínas.',
    ],
    whatIs:
      'Entendendo a inflamação intestinal crônica do cão:\n\n' +
      '- Reação inflamatória persistente: irritação da mucosa do intestino delgado ou grosso provocando diarreia, vômitos e perda de nutrientes por mais de três semanas.\n' +
      '- Resposta à nutrição: um distúrbio multifatorial no qual a mudança correta de dieta é a principal ferramenta de cura e controle a longo prazo.',
    warningSigns:
      'Sinais clínicos de alerta que exigem avaliação do médico-veterinário:\n\n' +
      '- Fezes moles, pastosas ou com muco e sangue vivo de forma frequente ou intermitente.\n' +
      '- Vômitos frequentes de espuma amarelada ou restos alimentares, e barulhos altos na barriga (borborigmos).\n' +
      '- Emagrecimento progressivo, perda de músculo nas costas e na cabeça, ou inchaço súbito na barriga (barriga d\'água).',
    diagnosis:
      'Como o veterinário descobre a causa e o melhor tratamento:\n\n' +
      '- Exclusão de vermes e infecções: exames de fezes seriados para giárdia e parasitas, hemograma e bioquímica completa.\n' +
      '- Testes de sangue específicos: dosagem de cobalamina (B12), enzimas do pâncreas (TLI/cPL) e cortisol para descartar outras doenças.\n' +
      '- Ultrassom e ensaios dietéticos: ultrassonografia abdominal para avaliar a espessura do intestino e biópsias por endoscopia nos casos graves.',
    homeCare:
      'Cuidados indispensáveis da família para manter o pet saudável:\n\n' +
      '- Rigor absoluto na alimentação: fornecer exclusivamente a ração prescrita e evitar medicamentos mastigáveis com sabor de carne.\n' +
      '- Regularidade nos horários: administrar a reposição de vitamina B12 e medicamentos no mesmo horário todos os dias.\n' +
      '- Diário de sintomas: anotar consistência das fezes, frequência de evacuação e pesar o cão a cada 15 dias na mesma balança.',
  },
  'neoplasias-intracranianas-caes': {
    whatIsIt:
      'As neoplasias intracranianas em cães são tumores que crescem dentro da cabeça (no cérebro ou nas membranas que o cobrem):\n\n' +
      '- Espaço fechado e sem folga: o crânio do cão é um osso duro que não estica; qualquer massa que cresce ali espreme o tecido cerebral e gera pressão perigosa (hipertensão intracraniana).\n' +
      '- Atenção aos cães com mais de 5 a 6 anos: se um cão idoso tiver a primeira crise convulsiva da vida, a suspeita prioritária é de um problema físico no cérebro, como um tumor.\n' +
      '- Tratamento moderno dá sobrevida com qualidade: hoje a neurocirurgia e a radioterapia avançada conseguem controlar a doença por quase dois anos com excelente bem-estar.',
    keyPoints: [
      'Primeira convulsão após os 5 anos de idade exige ressonância da cabeça para investigar tumor ou outra alteração física.',
      'Mudanças de comportamento (andar sem rumo, ficar preso em quinas ou esquecer o local do xixi) são sinais de alerta no cérebro.',
      'Melhora rápida com corticoide não cura o tumor: o remédio apenas murcha o inchaço ao redor da massa, não destruindo a neoplasia.',
      'A ressonância magnética é o exame de escolha: ultrassom e raio-x não conseguem enxergar o cérebro dentro do crânio.',
      'Nunca realize coleta de líquido da espinha às cegas: se houver inchaço no cérebro, a punção na nuca pode ser fatal.',
      'Cirurgia e radioterapia de ponta oferecem sobrevida longa: cães operados ou irradiados chegam a viver cerca de dois anos sem crises.',
    ],
    whatIs:
      'Entendendo os tumores cerebrais em cães:\n\n' +
      '- Crescimento anormal no crânio: multiplicação descontrolada de células que formam nódulos comprimindo áreas vitais de movimento, visão e consciência.\n' +
      '- Impacto do inchaço: o tumor altera a circulação local e acumula líquido (edema), piorando os sintomas de fraqueza e convulsões.',
    warningSigns:
      'Sinais clínicos de alerta que exigem atendimento veterinário urgente:\n\n' +
      '- Crises convulsivas repentinas (tremores generalizados, perda de consciência, salivação e pedalagem com as patas).\n' +
      '- Andar em círculos contínuos para o mesmo lado, tropeçar em paredes ou apoiar a cabeça imóvel contra a parede.\n' +
      '- Sonolência excessiva, dificuldade para levantar, fraqueza em um dos lados do corpo ou perda súbita da visão.',
    diagnosis:
      'Como o médico-veterinário investiga e confirma o tumor:\n\n' +
      '- Exame neurológico detalhado: testes de reflexos e postura para identificar exatamente em qual parte do cérebro está a lesão.\n' +
      '- Exames de sangue completos e raio-x de tórax: para descartar outras causas de convulsão e verificar se não há tumores em outros órgãos.\n' +
      '- Ressonância magnética de alto campo: o exame definitivo para localizar o tamanho, o formato e o tipo provável da massa no encéfalo.',
    homeCare:
      'Cuidados indispensáveis da família no ambiente de casa:\n\n' +
      '- Segurança física contra quedas: bloquear o acesso a escadas, sacadas e piscinas para prevenir acidentes durante uma crise.\n' +
      '- Pontualidade rígida com os remédios: administrar o anticonvulsivante (como levetiracetam) nos horários exatos sem atrasos nem esquecimentos.\n' +
      '- Proteção durante as convulsões: nunca colocar a mão dentro da boca do cão e afastar móveis próximos para evitar batidas na cabeça.',
  },
  'prolapso-retal-caes-gatos': {
    whatIsIt:
      'O prolapso retal acontece quando parte da camada interna ou toda a parede do reto escorrega para fora pelo ânus, formando um cilindro avermelhado e úmido:\n\n' +
      '- É um sinal de alerta, não uma doença isolada: quase sempre aparece porque o cão ou gato está fazendo força repetida para evacuar ou urinar (tenesmo), ou porque os músculos que sustentam a região enfraqueceram.\n' +
      '- Tempo exposto faz diferença: quanto mais horas o tecido fica do lado de fora, mais inchado, ressecado e escuro ele pode ficar — aumentando o risco de feridas e necrose.',
    keyPoints: [
      'Nunca tente empurrar o tecido de volta em casa: uma alça do intestino pode ter invaginado (intussuscepção) e simular prolapso.',
      'Mantenha o local úmido com soro fisiológico limpo e impeça o pet de lamber até chegar ao atendimento.',
      'Tecido roxo-escuro, enegrecido ou com cheiro forte não pode ser apenas empurrado de volta e costuma exigir cirurgia.',
      'Em filhotes, vermes e infecções intestinais são causas muito comuns; em gatos machos, é indispensável checar se a bexiga não está trancada.',
      'Quando o veterinário dá pontos temporários ao redor do ânus, o pet ainda precisa conseguir fazer cocô pastoso normalmente.',
    ],
    whatIs:
      'Por que o reto sai pelo ânus em cães e gatos:\n\n' +
      '- Força repetida (ciclo do tenesmo): diarreia intensa, parasitas intestinais, fezes muito duras, próstata aumentada ou dor para urinar aumentam a pressão na barriga e empurram o reto para fora.\n' +
      '- Irritação que alimenta mais força: depois que sai, a mucosa resseca e inflama, dando ao pet a sensação contínua de precisar fazer mais força.',
    warningSigns:
      'Procure atendimento veterinário imediato se notar:\n\n' +
      '- Massa avermelhada, arroxeada ou escura saindo pelo ânus.\n' +
      '- Vômitos, barriga dolorida ou prostração intensa.\n' +
      '- Gato indo muitas vezes à caixa de areia sem conseguir fazer xixi (bexiga dura e cheia).\n' +
      '- Novo episódio logo após retirar os pontos ou dificuldade para evacuar com a sutura no lugar.',
    diagnosis:
      'Como o médico-veterinário avalia e diferencia o problema:\n\n' +
      '- Avaliação anatômica e ultrassom: confirmar se é prolapso retal verdadeiro ou intussuscepção (quando o intestino entra dentro dele mesmo) antes de reduzir.\n' +
      '- Busca da causa da força: exames de fezes seriados em filhotes, palpação e exame de urina/bexiga em gatos, além de toque retal e imagem pélvica em cães adultos ou idosos.',
    homeCare:
      'Cuidados em casa durante a recuperação:\n\n' +
      '- Use o colar elisabetano sem interrupção enquanto houver pontos ou sensibilidade anal.\n' +
      '- Observe todos os dias se o cão ou gato está evacuando fezes macias sem esforço excessivo e urinando em volume normal.\n' +
      '- Nunca use supositórios ou lavagens intestinais humanas (como enemas de fosfato de sódio), pois podem ser fatais principalmente em gatos.\n' +
      '- Retorne imediatamente se o tecido reaparecer, houver febre, vômitos ou ausência de fezes e urina.',
  },
  'cinomose-canina': {
    whatIsIt:
      'A cinomose canina é uma infecção viral grave e altamente contagiosa causada pelo vírus da cinomose canina (CDV):\n\n' +
      '- Como o vírus age: ele entra sobretudo pelas vias respiratórias, enfraquece as células de defesa e depois pode atingir pulmões, intestino, olhos, pele (almofadinhas das patas) e o sistema nervoso central.\n' +
      '- Por que exige atenção prolongada: mesmo após melhora da tosse, secreção e diarreia, alguns cães desenvolvem sinais neurológicos semanas depois.',
    keyPoints: [
      'A vacinação completa na fase de filhote (seguida dos reforços recomendados pelo médico-veterinário) é a forma mais eficaz de prevenção.',
      'Cães com suspeita precisam ficar isolados de outros cães imediatamente para evitar contágio pelo ar e por secreções.',
      'Não existe um remédio que elimine diretamente o vírus; o tratamento de suporte intenso (hidratação venosa, oxigênio, alimentação adequada, controle de infecções bacterianas e de convulsões) é o que permite a recuperação.',
      'Tremores musculares rítmicos (mioclonias) nem sempre são convulsões e podem permanecer como sequela mesmo após o cão ficar estável.',
      'Gatos domésticos não têm cinomose canina (doenças felinas graves como a panleucopenia têm outra causa viral).',
    ],
    whatIs:
      'Como a cinomose afeta o organismo do cão:\n\n' +
      '- Enfraquecimento da imunidade: o vírus reduz a defesa natural do corpo, abrindo caminho para infecções bacterianas secundárias, especialmente pneumonia.\n' +
      '- Comprometimento multissistêmico: pode provocar febre, secreção ocular e nasal, tosse, falta de ar, vômitos, diarreia, endurecimento e fissuras nas almofadinhas das patas e inflamação cerebral com convulsões ou dificuldade para andar.',
    warningSigns:
      'Procure atendimento veterinário imediato se notar:\n\n' +
      '- Respiração rápida, ofegante ou com esforço, língua arroxeada ou tosse persistente.\n' +
      '- Convulsões, desorientação, andar cambaleante, cegueira súbita ou contrações musculares rítmicas.\n' +
      '- Filhote muito prostrado, recusando alimento ou com vômitos e diarreia frequentes (risco rápido de desidratação e queda de glicose).',
    diagnosis:
      'Como o médico-veterinário investiga a cinomose:\n\n' +
      '- Histórico e exame físico completo: análise do cartão vacinal, contato com outros cães e busca de alterações oculares, respiratórias, cutâneas e neurológicas.\n' +
      '- Exames laboratoriais e PCR: hemograma, bioquímica, radiografia do tórax e pesquisa do vírus por RT-PCR em amostras de olho, nariz, sangue ou urina — sabendo que um teste negativo nem sempre descarta a doença na fase neurológica.',
    homeCare:
      'Cuidados e prevenção em casa:\n\n' +
      '- Mantenha o cão doente rigorosamente separado de outros cães, especialmente filhotes e animais sem vacina em dia, higienizando o ambiente com detergente seguido de desinfetante adequado.\n' +
      '- Nunca force comida ou água pela boca se o cão estiver engasgando ou muito sonolento, pelo risco de aspiração para os pulmões.\n' +
      '- Siga fielmente os horários das medicações prescritas e retorne imediatamente se surgirem convulsões, dificuldade para respirar ou piora da prostração.',
  },
  'colangite-parasitaria-caes-gatos': {
    whatIsIt:
      'A colangite parasitária acontece quando pequenos parasitos (trematódeos biliares, como o Platynosomum) se instalam nos ductos biliares e na vesícula de gatos — e mais raramente em cães — causando inflamação crônica e dificultando a passagem da bile.',
    keyPoints: [
      'No Brasil, gatos se infectam principalmente ao caçar lagartixas, sapos ou tatuzinhos-de-jardim (não passa diretamente de um gato para outro na caixa de areia).',
      'Um exame de fezes negativo não descarta o problema: os ovos são eliminados de forma irregular ou deixam de sair se houver obstrução biliar.',
      'Vermífugos comuns em dose única não eliminam esse parasito — é necessário protocolo específico prescrito pelo médico-veterinário.',
      'Manter gatos sem apetite sem suporte nutricional rápido pode provocar acúmulo grave de gordura no fígado (lipidose hepática).',
      'Impedir a caça de lagartixas e não oferecer peixes de água doce crus previne novas infecções após o tratamento.',
    ],
    whatIs:
      'Como o parasito afeta o fígado e a vesícula:\n\n' +
      '- Irritação e bloqueio da bile: os trematódeos vivem dentro dos canais biliares e geram espessamento, cicatrizes e dificuldade para a bile chegar ao intestino.\n' +
      '- Formas diferentes entre espécies: em gatos brasileiros o principal agente é Platynosomum spp. (associado a caça de lagartixas); em cães e gatos de outras regiões ou dietas específicas, outros parasitos podem vir pela ingestão de peixes de água doce crus.',
    warningSigns:
      'Procure atendimento veterinário imediato se notar:\n\n' +
      '- Pele, parte branca dos olhos ou gengivas amarelada (icterícia) e urina bem alaranjada ou escura.\n' +
      '- Perda de apetite por mais de 24 horas (urgente em gatos), vômitos repetidos, dor abdominal ou apatia intensa.\n' +
      '- Fezes muito claras/esbranquiçadas, barriga inchada ou sangramentos incomuns.',
    diagnosis:
      'Como o médico-veterinário investiga a doença:\n\n' +
      '- Exames de sangue e ultrassom: avaliam enzimas do fígado, bilirrubina, coagulação e dilatação dos canais biliares e vesícula.\n' +
      '- Pesquisa do parasito: exame de fezes por métodos específicos (sedimentação ou centrifugação especial), muitas vezes em amostras repetidas, além da coleta de bile guiada por ultrassom, biópsia ou teste molecular (PCR) quando necessário.',
    homeCare:
      'Cuidados em casa e prevenção de retorno:\n\n' +
      '- Cumpra exatamente todos os dias e doses do antiparasitário e das medicações de apoio prescritas, sem interromper por conta própria.\n' +
      '- Telas em janelas e ambiente interno enriquecido reduzem drasticamente o contato do gato com lagartixas e insetos/crustáceos de jardim.\n' +
      '- Nunca ofereça peixe de água doce cru e retorne nos exames de controle mesmo que o animal pareça bem, pois pode haver inflamação residual.',
  },
  'pancreatite-caes-gatos': {
    whatIsIt:
      'A pancreatite é uma inflamação do pâncreas, órgão responsável por produzir enzimas da digestão e insulina. Quando essas enzimas são ativadas cedo demais dentro do próprio pâncreas, causam dor, inflamação local e, nos casos mais graves, afetam outros órgãos.',
    keyPoints: [
      'Cães e gatos mostram a doença de formas bem diferentes: cães costumam vomitar e sentir dor abdominal, enquanto gatos frequentemente ficam apenas quietos e sem comer.',
      'Um único exame alterado ou ultrassom inicial normal não confirma nem descarta sozinho a pancreatite — o veterinário junta sintomas, exame de lipase pancreática e imagem.',
      'Ficar muitos dias em jejum não ajuda a recuperar o pâncreas e pode agravar o quadro, principalmente em gatos (risco de gordura no fígado).',
      'Controle da dor, controle de náuseas/vômitos, soro na medida certa e volta precoce à alimentação (pela boca ou por sonda) são a base da recuperação.',
      'Após a alta, cães com crises repetidas ou gordura alta no sangue geralmente precisam de ração com pouca gordura e zero restos de comida ou petiscos gordurosos.',
    ],
    whatIs:
      'Como a doença se manifesta e por que exige atenção rápida:\n\n' +
      '- Forma aguda ou crônica: pode surgir de repente com grande mal-estar ou evoluir em episódios repetidos mais discretos que, ao longo do tempo, reduzem a função digestiva e hormonal do pâncreas.\n' +
      '- Riscos associados: desidratação, queda importante de eletrólitos e cálcio, amarelão (icterícia) quando comprime o canal da bile e, nos gatos, associação frequente com inflamação no fígado e intestino.',
    warningSigns:
      'Procure atendimento veterinário imediato se notar:\n\n' +
      '- Gato sem comer há mais de 24 horas ou muito prostrado/escondido (mesmo sem vomitar).\n' +
      '- Cão com vômitos repetidos, barriga rígida ou dor (posição de prece, com patas da frente esticadas no chão e traseira erguida).\n' +
      '- Gengivas amareladas ou muito pálidas, febre, fraqueza extrema ou respiração ofegante.',
    diagnosis:
      'Como o médico-veterinário investiga a pancreatite:\n\n' +
      '- Exames de sangue e urina: avaliam hidratação, eletrólitos (potássio e cálcio), fígado, rins, triglicerídeos e dosam a lipase específica do pâncreas (cPLI em cães ou fPLI em gatos).\n' +
      '- Ultrassonografia e radiografia: ajudam a visualizar inflamação ao redor do pâncreas e do canal biliar e a descartar outras emergências abdominais, como corpos estranhos.',
    homeCare:
      'Cuidados e prevenção após o atendimento:\n\n' +
      '- Siga exatamente a dieta prescrita: em cães sensíveis ou com gordura alta no sangue, proíba restos de mesa, queijos, carnes e petiscos gordurosos.\n' +
      '- Nunca dê anti-inflamatórios humanos ou veterinários sem prescrição — eles podem causar úlceras graves e lesão renal durante uma crise.\n' +
      '- Observe apetite, hidratação e retorno de vômitos ou apatia nos dias seguintes; se o animal voltar a recusar alimento, retorne prontamente.',
  },
  'leptospirose-caes-gatos': {
    whatIsIt:
      'A leptospirose é uma infecção bacteriana grave e zoonótica (pode ser transmitida aos seres humanos) causada por bactérias em formato de espiral do gênero Leptospira. A contaminação acontece principalmente quando a boca, os olhos, o nariz ou feridinhas na pele entram em contato com urina de animais infectados (sobretudo roedores), água parada, lama ou solo úmido contaminados. Nos cães, a doença pode atacar rapidamente os rins, o fígado, os pulmões e a coagulação do sangue; nos gatos, a infecção existe e pode haver eliminação pela urina, mas a doença clínica é muito menos comum.',
    keyPoints: [
      'Cães urbanos e de pequeno porte também pegam leptospirose: não é preciso ter contato com enchentes, rios ou áreas rurais para se contaminar.',
      'Nem todo cão fica amarelo (icterícia) ou com febre: muitos chegam apenas apáticos, vomitando, bebendo muita água ou parando de urinar por lesão renal aguda.',
      'O tratamento com antibiótico e suporte hospitalar precisa começar imediatamente diante da suspeita, sem esperar os resultados finais dos exames.',
      'Mesmo nos casos graves com necessidade de hemodiálise, muitos cães conseguem recuperar a função renal quando atendidos e encaminhados cedo.',
      'Use luvas para limpar a urina do pet suspeito ou em tratamento, lave bem as mãos e evite contato de gestantes e pessoas imunossuprimidas com secreções.',
      'A vacinação anual contra leptospirose é recomendada para todos os cães e, somada ao controle de roedores, é a melhor forma de prevenir quadros graves.',
    ],
    whatIs:
      'Infecção bacteriana transmitida por urina, água ou solo contaminados que pode causar lesão renal aguda, icterícia, sangramentos e hemorragia pulmonar em cães, com risco de transmissão para pessoas.',
    warningSigns:
      'Apatia súbita, recusa alimentar, vômitos repetidos, dor muscular ou dificuldade para andar, aumento súbito ou parada da produção de urina, mucosas ou olhos amarelados (icterícia), manchas roxas/sangramentos e respiração acelerada ou cansada.',
    diagnosis:
      'Combina exames de sangue, urina, radiografia do tórax e ultrassom abdominal para avaliar rins, fígado e pulmões, junto a testes específicos (PCR no sangue e na urina e sorologia MAT repetida após 7 a 14 dias).',
    homeCare:
      'Cumprir todos os dias do antibiótico prescrito (em gatos, oferecer alimento ou água logo após a doxiciclina para proteger o esôfago), usar luvas e desinfetante ao limpar urina, evitar passeios em áreas com poças ou roedores, retornar na reavaliação pós-alta e manter a vacinação anual dos cães em dia.',
  },
  'sindrome-chiari-like-caes-gatos': {
    whatIsIt:
      'A síndrome de Chiari-like é uma alteração no formato da parte de trás do crânio, que fica pequena demais para acomodar confortavelmente o cerebelo e a transição com a medula do pescoço. Esse aperto perturba o movimento natural do líquido que protege o cérebro e a medula (líquor), podendo causar dor crônica no pescoço e, em parte dos animais, formar bolsas de líquido dentro da medula chamadas siringes (siringomielia). É muito estudada em raças pequenas, principalmente o Cavalier King Charles Spaniel, e ocorre raramente em gatos.',
    keyPoints: [
      'Malformação tipo Chiari e siringomielia não são a mesma coisa: o pet pode ter apenas o aperto craniano com dor (sem bolsa na medula) ou ter alteração na ressonância sem sentir nenhum sintoma.',
      'Coceira fantasma é um sinal clássico: o cão faz o movimento repetido de coçar o pescoço ou ombro no ar, sem encostar a pata na pele, muitas vezes durante o passeio com coleira ou agitação.',
      'O cão pode sentir dor forte mesmo andando normalmente: gritos repentinos ao pular, ao ser pego no colo ou ao tocar de leve na cabeça e pescoço podem ser dor neuropática.',
      'A ressonância magnética é o exame principal, mas precisa ser avaliada junto com exame de pele, orelhas e coluna — pois o mesmo cão pode ter otite média ou hérnia de disco.',
      'O tratamento clínico usa medicamentos específicos para dor de origem nervosa (como gabapentina ou pregabalina) e mudanças no dia a dia; a cirurgia fica reservada a casos graves ou que não melhoram.',
      'Trocar a coleira de pescoço por peitoral macio e elevar potes de comida e água ajuda a reduzir crises de desconforto.',
    ],
    whatIs:
      'Alteração estrutural da parte posterior do crânio que aperta o cerebelo e altera o fluxo do líquor, podendo causar dor neuropática no pescoço, coceira no ar (fantasma) e bolsas de líquido na medula (siringomielia).',
    warningSigns:
      'Gritos súbitos de dor sem trauma aparente, incômodo ao tocar suavemente o pescoço ou a cabeça, movimentos repetidos de coçar o ar perto do pescoço ou ombro, dificuldade para dormir por desconforto, pescoço torto, fraqueza ou desequilíbrio ao andar.',
    diagnosis:
      'Começa pelo exame neurológico completo e exclusão de alergias de pele, otites e doenças de disco cervical. A confirmação da malformação e da siringomielia exige ressonância magnética sob anestesia.',
    homeCare:
      'Substituir definitivamente coleiras de pescoço por peitoral ergonômico, elevar os potes de ração e água, controlar o peso, registrar vídeos curtos das crises de coceira ou dor para mostrar ao veterinário e nunca interromper ou alterar doses de gabapentina, pregabalina ou amitriptilina sem orientação.',
  },
  'insuficiencia-cardiaca-congestiva-caes-gatos': {
    whatIsIt:
      'A insuficiência cardíaca congestiva (ICC) não é uma doença isolada, mas o momento em que um problema prévio do coração faz a pressão dentro dos vasos subir demais e empurrar líquido para fora da circulação. Quando o lado esquerdo do coração falha, esse líquido se acumula nos pulmões (edema pulmonar) ou, muito frequentemente em gatos, ao redor dos pulmões (efusão pleural). Quando o lado direito falha, o líquido se acumula na barriga (ascite) e no fígado. O objetivo do tratamento é tirar o excesso de líquido com segurança, ajudar o coração a trabalhar melhor e dar boa qualidade de vida ao pet.',
    keyPoints: [
      'Coração grande ou sopro não significam automaticamente ICC: muitos cães e gatos têm doença cardíaca por anos antes de acumular líquido.',
      'Tosse em cão com sopro nem sempre é água no pulmão: pode ser irritação ou compressão dos brônquios — por isso o veterinário precisa confirmar se há congestão antes de aumentar diuréticos.',
      'Gatos em ICC raramente tossem e muitas vezes não têm sopro audível: respirar com a boca aberta, deitar com o pescoço esticado ou ficar ofegante em repouso são emergências imediatas.',
      'Quando há grande volume de líquido ao redor dos pulmões (efusão pleural), drenar o tórax com delicadeza traz alívio muito mais rápido do que esperar apenas o diurético agir.',
      'A melhor ferramenta em casa é contar a respiração enquanto o pet dorme profundamente: no controle adequado, costuma ficar abaixo de 30 respirações por minuto.',
      'Nunca suspenda os remédios quando o pet melhorar: a melhora significa que o tratamento está controlando o acúmulo de líquido, não que o coração foi curado.',
    ],
    whatIs:
      'Acúmulo anormal de líquido nos pulmões, ao redor dos pulmões ou no abdômen provocado por elevação das pressões dentro de um coração doente.',
    warningSigns:
      'Respiração acelerada durante o sono (acima de 30 a 35 respirações por minuto de forma persistente), esforço para puxar o ar, recusa em deitar de lado, respiração com a boca aberta em gatos, língua ou gengivas arroxeadas, desmaios, fraqueza súbita, barriga inchada ou paralisia repentina das patas traseiras em gatos.',
    diagnosis:
      'Na emergência, o veterinário estabiliza primeiro com oxigênio e ultrassom rápido à beira do leito antes de exames estressantes. Depois, radiografia torácica, ecocardiograma completo, eletrocardiograma, aferição de pressão arterial e exames de sangue (rins e eletrólitos) definem a causa exata e o melhor protocolo.',
    homeCare:
      'Contar e anotar a frequência respiratória com o pet dormindo profundamente, administrar todas as medicações exatamente nos horários prescritos, evitar petiscos salgados e exercícios intensos, manter água fresca sempre disponível, monitorar apetite e peso e cumprir os retornos para checar rins, pressão e eletrólitos.',
  },
};

export function getPlainLanguageForSlug(slug: string): DiseasePlainLanguage | undefined {
  return DISEASE_PLAIN_LANGUAGE[slug];
}
