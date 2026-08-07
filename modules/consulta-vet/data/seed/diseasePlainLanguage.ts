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
      'O colapso traqueal é o amolecimento dos anéis da traqueia (canal da respiração). A traqueia achata durante a inspiração ou expiração, provocando tosse seca e alta, parecida com o som de um ganso.',
    keyPoints: [
      'Afeta sobretudo cães pequenos e miniaturas (Yorkshire, Poodle, Chihuahua).',
      'Tosse piora com excitação, calor, exercício ou tração na coleira.',
      'Controle de peso, peitoral (nunca coleira no pescoço) e medicamentos broncodilatadores ajudam no dia a dia.',
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
      'A doença valvar mitral degenerativa (DMVD) é o desgaste da válvula mitral do coração. O sangue reflui para o átrio (sopro cardíaco) e o coração precisa trabalhar mais — podendo evoluir para acúmulo de líquido nos pulmões.',
    keyPoints: [
      'Doença cardíaca mais comum em cães pequenos e idosos.',
      'Tosse, cansaço e dificuldade respiratória indicam insuficiência cardíaca.',
      'Ecocardiograma e medicamentos cardioprotetores orientam o tratamento.',
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
  'hiperadrenocorticismo-sindrome-cushing': {
    whatIsIt:
      'O Cushing (hiperadrenocorticismo) é o excesso crônico de cortisol no sangue, geralmente por tumor benigno na hipófise ou nas adrenais. O metabolismo fica acelerado de forma desregulada.',
    keyPoints: [
      'Beber e urinar muito, fome excessiva e barriga pendente são sinais clássicos.',
      'Queda de pelo simétrica e pele fina também são frequentes.',
      'Tratamento medicamentoso controla a produção de cortisol a longo prazo.',
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
      'O hipertireoidismo felino é a produção excessiva de hormônios tireoidianos, deixando o metabolismo do gato em “alta rotação” constante.',
    keyPoints: [
      'Perde peso mesmo comendo muito; fica agitado e pode miar à noite.',
      'Pelagem opaca e vômitos são comuns.',
      'Tratamento (medicamento, dieta yodo-restrita, radioiodo ou cirurgia) exige acompanhamento renal.',
    ],
  },
  'hipotireoidismo-canino': {
    whatIsIt:
      'O hipotireoidismo canino é a produção insuficiente de hormônios pela tireoide. O metabolismo desacelera, deixando o cão lento, ganhando peso e com alterações de pele e pelo.',
    keyPoints: [
      'Desânimo, ganho de peso sem comer mais e intolerância ao frio.',
      'Pele seca, infecções recorrentes e “expressão facial triste”.',
      'Reposição oral diária de hormônio tireoidiano costuma resolver completamente os sinais.',
    ],
  },
  'diabetes-mellitus-canina': {
    whatIsIt:
      'A diabetes mellitus canina é a falta de insulina eficaz para controlar a glicose no sangue. Sem insulina, a glicose acumula-se e o corpo usa gordura e proteína como combustível alternativo.',
    keyPoints: [
      'Beber e urinar muito, perda de peso apesar de boa ou aumentada apetência.',
      'Catarata pode aparecer em cães diabéticos.',
      'Insulina injetável, dieta e monitoramento domiciliar são pilares do tratamento.',
    ],
  },
  'diabetes-mellitus-felina': {
    whatIsIt:
      'A diabetes felina é o descontrole crônico da glicose por falta de insulina ou resistência a ela — semelhante ao diabetes tipo 2 humano. Muitos gatos podem entrar em remissão com tratamento precoce.',
    keyPoints: [
      'Perda de peso, poliúria/polidipsia e postura plantigrada (andando “no calcanhar”) em casos avançados.',
      'Obesidade e hipertireoidismo não tratado aumentam o risco.',
      'Insulina, dieta rica em proteína e monitoramento buscam remissão quando possível.',
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
};

export function getPlainLanguageForSlug(slug: string): DiseasePlainLanguage | undefined {
  return DISEASE_PLAIN_LANGUAGE[slug];
}
