import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/*
 * Síndrome Mielodisplásica (MDS / Displasia Mieloide) em cães e gatos — síntese editorial Vetius.
 * Padrão editorial aprofundado com fisiopatologia molecular, distinção primária vs secundária,
 * limiar de blasts (MDS vs AML), estudos seminais (Meredith et al. 2025, Matsuyama et al. 2023,
 * Hisasue et al. 2001/2022, Weiss & Aird 2001), 6 figuras clínicas reais integradas (CC BY 4.0),
 * clinicalSignsPathophysiology em EditorialSystemGroup[] e diagnosis em EditorialDiagnosticStep[] (core biopsy padrão ouro).
 * Texto 100% limpo, sem marcadores asteriscos duplos, em conformidade estrita com o padrão ouro do app.
 */

export const sindromeMielodisplasicaRecord: DiseaseRecord = {
  id: "disease-sindrome-mielodisplasica-caes-gatos",
  slug: "sindrome-mielodisplasica-caes-gatos",
  title: "Síndrome mielodisplásica (MDS)",
  subtitle: "Neoplasia mieloide clonal, hematopoiese ineficaz com medula hipercelular e citopenias periféricas em cães e gatos",
  synonyms: [
    "MDS",
    "Myelodysplastic syndrome",
    "Displasia mieloide",
    "Pré-leucemia",
    "Síndrome pré-leucêmica",
    "Dismielopoiese clonal primária",
    "Neoplasia mieloide mielodisplásica"
  ],
  species: [
    "dog",
    "cat"
  ],
  category: "hematologia",
  categories: [
    "oncologia",
    "clinica-medica"
  ],
  tags: [
    "MDS",
    "Displasia mieloide",
    "Hematopoiese ineficaz",
    "Pancitopenia",
    "Bicitopenia",
    "Anemia não regenerativa",
    "Blasts medulares",
    "FeLV",
    "Medula óssea",
    "Hematologia",
    "Oncologia"
  ],
  isPublished: true,
  plainLanguage: {
    whatIsIt: "A síndrome mielodisplásica (MDS) é uma doença rara da medula óssea (o tecido dentro dos ossos que fabrica o sangue) em que as células-tronco sofrem mutações e passam a produzir células sanguíneas defeituosas. Ocorre uma situação paradoxal: a medula óssea fica completamente cheia e ativa tentando produzir células, mas como essas células nascem anormais, a maioria morre antes mesmo de conseguir sair para o sangue. Como resultado, o animal apresenta queda grave nas contagens sanguíneas (anemia que não melhora, poucos glóbulos brancos de defesa e poucas plaquetas para estancar sangramentos). Em gatos, a doença tem forte associação histórica com o vírus da leucemia felina (FeLV).",
    keyPoints: [
      "Medula cheia e sangue vazio: a medula opera em alta velocidade, mas quase todas as células morrem lá dentro por defeitos de fabricação.",
      "Anemia persistente: o animal fica apático, cansa rápido e suas gengivas tornam-se muito pálidas ou esbranquiçadas.",
      "Risco grave de infecções: a falta de glóbulos brancos de defesa (neutropenia) permite que bactérias comuns causem febre alta e infecções generalizadas.",
      "Sangramentos espontâneos: a falta ou mau funcionamento das plaquetas pode causar pontinhos vermelhos na pele ou gengiva (petéquias), hematomas e sangramento nasal.",
      "Diferenciação com outras doenças: nem toda alteração medular é câncer; inflamações graves, remédios e vírus podem imitar essa doença de forma temporária.",
      "Tratamento de suporte contínuo: não existe cura simples; o tratamento envolve transfusões de sangue planejadas, antibióticos para febre e acompanhamento rigoroso com especialista em oncologia e hematologia."
    ]
  },
  quickSummary: "A síndrome mielodisplásica (MDS) compreende um grupo heterogêneo de neoplasias clonais da célula-tronco hematopoética multipotente (HSC) caracterizadas por hematopoiese ineficaz, citopenias periféricas persistentes e alterações morfológicas displásicas em uma ou mais linhagens da medula óssea. A marca fisiopatológica fundamental é o paradoxo de medula cheia com sangue vazio: a celularidade medular encontra-se normal ou marcadamente aumentada pela proliferação clonal anormal, mas os precursores sofrem apoptose intramedular acelerada e falha na diferenciação terminal, resultando em anemia não regenerativa profunda (frequentemente macrocítica com RDW elevado), neutropenia absoluta e trombocitopenia na circulação periférica. O maior desafio clínico reside em diferenciar a MDS primária clonal da dismielopoiese secundária reativa (desencadeada por sepse, imunomediadas como IMHA/PIMA, fármacos mielotóxicos e FeLV em gatos), pois a citomorfologia isolada é incapaz de distingui-las (Weiss & Aird, 2001). Na taxonomia veterinária moderna, o limiar de aproximadamente 20% de blasts medulares separa operacionalmente a MDS (<20%) da leucemia mieloide aguda (AML, >=20%; Withrow & MacEwen, 2020; Meredith et al., 2025). O estudo seminal contemporâneo de Meredith et al. (2025) com 70 cães demonstrou que a MDS apresenta curso significativamente mais indolente do que a AML (sobrevida mediana de 384 dias versus 6 dias, P < 0,001). Não há consenso ou diretriz ACVIM padronizada; a conduta baseia-se na exclusão de causas secundárias, suporte transfusional com concentrado de hemácias guiado por hipóxia tecidual, antibioticoterapia parenteral agressiva na neutropenia febril e quimioterapia citotóxica especializada (doxorrubicina associada a citarabina contínua em cães, ou azacitidina em gatos) em centros oncológicos.",
  quickDecisionStrip: [
    "Paradoxo central da MDS: medula óssea normo a hipercelular contrastando com bicitopenia ou pancitopenia no sangue periférico.",
    "Ver displasia citológica NÃO confirma MDS: a dismielopoiese secundária a fármacos, sepse ou causas imunomediadas é duas vezes mais frequente.",
    "Ausência de blasts no hemograma NÃO exclui a doença: 76% dos cães com MDS comprovada não apresentam blastos circulantes no sangue.",
    "Fronteira taxonômica de 20%: a proporção de blastos medulares inferior a 20% separa a MDS da leucemia mieloide aguda (AML) na medicina moderna.",
    "Gatos citopênicos: testagem sorológica e por PCR para FeLV é mandatória (associação histórica em mais de 80% das séries felinas).",
    "Aspirado e core biopsy em conjunto: o aspirado detalha morfologia e contagem de blasts; a biópsia define celularidade real e descarta mielofibrose.",
    "Transfusão guiada por clínica: indicar concentrado de hemácias pela hipóxia celular, taquicardia e lactato (>2,5 mmol/L), não apenas pelo hematócrito.",
    "Neutropenia associada a febre é emergência crítica: barreira mucosa rompida exige antibioticoterapia bactericida intravenosa imediata.",
    "Prognóstico canino contemporâneo: cães com MDS têm sobrevida mediana de 384 dias (Meredith et al., 2025), contra meros 6 dias observados na AML."
  ],
  quickSummaryRich: {
    lead: "Na síndrome mielodisplásica, a fábrica medular opera em capacidade máxima mas produz peças defeituosas que são descartadas antes de sair pela porta: a medula óssea encontra-se densamente celular devido à expansão clonal desregulada, enquanto os precursores sofrem apoptose intramedular acelerada, resultando em bicitopenia ou pancitopenia profunda na circulação sistêmica. O maior desafio clínico consiste em diferenciar essa neoplasia primária da dismielopoiese secundária reativa, potencialmente reversível após remoção de toxinas, fármacos ou gatilhos imunomediados e infecciosos.",
    leadHighlights: [
      "fábrica medular opera em capacidade máxima",
      "apoptose intramedular acelerada",
      "bicitopenia ou pancitopenia profunda",
      "dismielopoiese secundária reativa",
      "potencialmente reversível"
    ],
    pillars: [
      {
        title: "Paradoxo de produção ineficaz",
        body: "Uma mutação clonal adquirida precocemente na célula-tronco hematopoética (CD34+) acarreta diferenciação anômala e morte celular programada nos cordões medulares. O estímulo fisiológico de eritropoietina (EPO) intensifica a hiperplasia eritroide medular, mas a reticulocitose periférica permanece gravemente inadequada.",
        highlights: [
          "mutação clonal adquirida",
          "célula-tronco hematopoética (CD34+)",
          "reticulocitose periférica permanece inadequada"
        ]
      },
      {
        title: "Dismielopoiese secundária vs MDS",
        body: "A morfologia microscópica isolada não distingue a MDS clonal de alterações reativas (Weiss & Aird, 2001). Inflamações severas, doenças imunomediadas (PIMA/IMHA), fármacos mielotóxicos e FeLV simulam perfeitamente a displasia citológica medular, exigindo exclusão exaustiva.",
        highlights: [
          "Weiss & Aird, 2001",
          "PIMA/IMHA",
          "fármacos mielotóxicos",
          "FeLV"
        ]
      },
      {
        title: "Fronteira prática de 20% de blasts",
        body: "A hematopatologia contemporânea adota o ponto de corte operacional de aproximadamente 20% de blasts na medula óssea para separar a MDS (<20%) da leucemia mieloide aguda (>=20%). No estudo de Meredith et al. (2025), essa distinção refletiu diferença brutal de sobrevida: 384 dias na MDS versus 6 dias na AML.",
        highlights: [
          "ponto de corte operacional de 20%",
          "MDS (<20%)",
          "AML (>=20%)",
          "384 dias versus 6 dias"
        ]
      },
      {
        title: "Suporte clínico e quimioterapia seletiva",
        body: "Não há diretriz curativa padronizada. O tratamento assenta-se em suporte transfusional para hipóxia anêmica, terapia antimicrobiana rápida na neutropenia febril e discussão de quimioterapia citorredutora (doxorrubicina com citarabina ou azacitidina) em animais com excesso de blasts (MDS-EB).",
        highlights: [
          "suporte transfusional",
          "neutropenia febril",
          "doxorrubicina com citarabina",
          "azacitidina"
        ]
      }
    ],
    diagnosticFlow: {
      title: "Algoritmo diagnóstico passo a passo da suspeita de MDS",
      steps: [
        {
          label: "1. Confirmação hematológica e esfregaço manual",
          timing: "Consulta inicial / Triagem imediata",
          detail: "Hemograma completo automatizado com contagem absoluta de reticulócitos e revisão microscópica manual minuciosa do esfregaço. Investigar macrocitose não regenerativa, anisocitose proeminente (RDW elevado), metarrubrícitos circulantes e formas bizarras em leucócitos. Em felinos, afastar pseudotrombocitopenia por agregados plaquetários na cauda da lâmina.",
          limitations: "Contadores hematológicos automáticos não detectam displasias citológicas nem diferenciam agregados plaquetários felinos de trombocitopenia real."
        },
        {
          label: "2. Avaliação de linhagens e exclusão de causas periféricas",
          timing: "Primeiras 12 a 24 horas",
          detail: "Determinar o envolvimento de uma, duas (bicitopenia) ou três linhagens (pancitopenia). Excluir mecanismos periféricos de perda, sequestro ou destruição: sangramentos ocultos, hemólise extravascular ou intravascular (teste de Coombs, aglutinação em salina), coagulação intravascular disseminada (PT, aPTT, fibrinogênio, D-dímero) e destruição imune periférica de plaquetas.",
          limitations: "Processos imunomediados podem coexistir com displasia medular reativa, exigindo acompanhamento longitudinal."
        },
        {
          label: "3. Rastreio clínico de causas secundárias e FeLV",
          timing: "Antes de qualquer procedimento medular invasivo",
          detail: "Levantamento farmacológico exaustivo (estrógenos, quimioterápicos, cloranfenicol, griseofulvina, fenobarbital, sulfonamidas). Rastrear inflamação sistêmica, sepse e neoplasias ocultas por ultrassonografia abdominal e radiografia torácica. Em gatos, testagem sorológica e molecular (PCR proviral) para FeLV e FIV é obrigatória.",
          limitations: "Testes sorológicos rápidos de FeLV falso-negativos em infecção latente ou focal medular exigem confirmação por PCR."
        },
        {
          label: "4. Aspirado citológico associado a core biopsy de medula óssea",
          timing: "Procedimento confirmatório indispensável",
          detail: "Coleta combinada de aspirado (agulha de Illinois ou Rosenthal) e biópsia em fragmento ósseo (agulha de Jamshidi) na fossa trocantérica femoral, crista ilíaca ou tuberosidade maior do úmero. O aspirado avalia a morfologia individual de precursores; o fragmento ósseo determina a celularidade real, relação M:E espacial e diagnostica mielofibrose (causa frequente de punção seca) ou aplasia medular.",
          limitations: "Punções secas (dry tap) ocorrem em até 30% dos cães com MDS devido à mielofibrose secundária reticulínica, tornando a biópsia histológica mandatória."
        },
        {
          label: "5. Quantificação rigorosa de blasts e classificação clínica",
          timing: "Interpretação pelo patologista clínico",
          detail: "Contagem diferencial rigorosa em pelo menos 300 a 500 células nucleadas medulares. Classificar em MDS-RC (<5% blasts, citopenia refratária), MDS-RCMD (<5% blasts com displasia em múltiplas linhagens), MDS-EB (5% a 19% blasts, excesso de blasts com alto risco de progressão) ou MDS-Er (predomínio eritroide, M:E < 1). Proporção >=20% caracteriza AML.",
          limitations: "A quantificação subjetiva pode gerar discordância interobservador de até 27% em amostras com celularidade marginal ou hemodiluição."
        }
      ]
    },
    treatmentFlow: {
      title: "Fluxograma de suporte hemodinâmico e manejo escalonado",
      steps: [
        {
          label: "1. Resgate hemodinâmico transfusional para anemia sintomática",
          timing: "Imediato conforme estabilidade clínica",
          detail: "Infusão de concentrado de hemácias (10 a 15 mL/kg IV) ou sangue total quando houver taquicardia em repouso, fraqueza severa, prostração intensa ou lactato sérico > 2,5 mmol/L. Tipagem sanguínea mandatória (DEA 1 em cães; sistema AB em gatos) e teste de compatibilidade cruzada (crossmatch) se transfusão prévia há mais de 4 dias.",
          dose: "Concentrado de hemácias: 10–15 mL/kg IV em 2–4 horas; velocidade inicial lenta em 15–30 min.",
          reassess: "Aferir hematócrito pós-transfusional 1 a 2 horas após a conclusão da infusão."
        },
        {
          label: "2. Abordagem agressiva da neutropenia febril",
          timing: "Se neutrófilos < 1.000/mcL com febre >= 39,3 °C",
          detail: "Coleta prévia de hemocultura e urocultura por punção estéril. Início imediato de antibioticoterapia parenteral bactericida de amplo espectro com cobertura para gram-positivos, gram-negativos e anaeróbios para prevenir choque séptico por translocação da flora comensal.",
          dose: "Ampicilina-sulbactam (30–50 mg/kg IV q8h) associada a Enrofloxacino (5–10 mg/kg IV q24h em cães) ou Marbofloxacino (2 mg/kg IV q24h em gatos)."
        },
        {
          label: "3. Eliminação de gatilhos de dismielopoiese secundária",
          timing: "Primeiras 24 a 48 horas",
          detail: "Suspensão imediata de fármacos potencialmente mielotóxicos. Suplementação parenteral de cobalamina (vitamina B12 500 a 1.000 mcg SC semanal) e ácido fólico se houver suspeita de enteropatia ou má absorção. Se houver suspeita de destruição imunomediada concorrente (PIMA/ITP), instituir prova terapêutica imunossupressora.",
          dose: "Prednisolona: 1 a 2 mg/kg/dia VO sob vigilância estrita da contagem neutrofílica."
        },
        {
          label: "4. Terapia antineoplásica especializada para MDS-EB",
          timing: "Casos com excesso de blasts ou citopenias refratárias",
          detail: "Discussão com especialista em oncologia veterinária sobre quimioterapia citotóxica ou agentes hipometilantes. Considerar o protocolo de doxorrubicina combinada a citarabina contínua (Matsuyama et al., 2023) em cães, ou 5-azacitidina (Hisasue et al., 2022) em felinos.",
          dose: "Cães: Doxorrubicina 30 mg/m² IV em 20 min seguida de Citarabina 300 mg/m² IV CRI em 6 horas. Gatos: Azacitidina 35–70 mg/m² SC por 3–5 dias em ciclos mensais."
        }
      ]
    }
  },
  etiology: {
    definicaoNaturezaClonal: "A síndrome mielodisplásica primária é uma desordem hematopoética clonal originada a partir de mutações somáticas genéticas e aberrações epigenéticas na célula-tronco hematopoética multipotente primitiva (CD34+) ou em seus progenitores mieloides iniciais. A linhagem celular mutada adquire uma vantagem proliferativa e de sobrevivência sobre a hematopoiese normal policlonal, ocupando progressivamente o parênquima medular. Entretanto, os precursores neoplásicos exibem maturação disfuncional intrínseca e ativação excessiva de vias pró-apoptóticas mitocondriais e de receptores de morte celular (Fas/FasL, caspases), sofrendo lise programada antes de atingir os sinusoides vasculares. A enfermidade integra formalmente o espectro das neoplasias mieloides da Organização Mundial da Saúde adaptadas à medicina veterinária (Withrow & MacEwen, 6ª ed.).",
    dismielopoieseSecundariaReativa: "A dismielopoiese secundária reativa constitui a principal armadilha diagnóstica em hematologia veterinária. Diversas afecções inflamatórias, tóxicas e imunomediadas provocam agressão à medula óssea, gerando atipias morfológicas idênticas à displasia neoplásica. No estudo seminal de Weiss & Aird (2001), avaliando 267 exames medulares caninos, 34 cães apresentavam mais de 10% de displasia citológica em pelo menos uma linhagem: apenas 13 correspondiam a MDS primária clonal verdadeira, enquanto 21 correspondiam a dismielopoiese secundária. Os autores demonstraram que a citomorfologia isolada é incapaz de diferenciar MDS clonal de afecções secundárias. As causas secundárias mais importantes compreendem: (1) Doenças imunomediadas (IMHA e PIMA), onde o estímulo eritropoético compensatório desorganizado gera precursores bizarras; (2) Fármacos mielotóxicos, incluindo estrógenos exógenos ou endógenos (hiperestrogenismo por tumor testicular de células de Sertoli), cloranfenicol, agentes alquilantes, griseofulvina, fenobarbital e sulfonamidas; (3) Toxinas e compostos químicos industriais; (4) Sepse grave e choque endotóxico; (5) Deficiências de cobalamina (vitamina B12) ou folato, ocasionando alterações megaloblásticas por síntese defeituosa de timidina no DNA; (6) Mielofibrose secundária e invasão neoplásica não mieloide (mieloftise por linfoma, mieloma múltiplo ou carcinomas metastáticos).",
    tabelaMdsVsDismielopoieseSecundaria: {
      kind: "clinicalTable",
      caption: "Tabela comparativa — Síndrome Mielodisplásica (MDS Clonal) versus Dismielopoiese Secundária Reativa",
      headers: [
        "Parâmetro Avaliado",
        "Síndrome Mielodisplásica (MDS Clonal)",
        "Dismielopoiese Secundária Reativa"
      ],
      rows: [
        [
          "Natureza biológica",
          "Neoplasia clonal de célula-tronco hematopoética (CD34+)",
          "Alteração morfológica reativa não neoplásica"
        ],
        [
          "Etiologia primária",
          "Mutações somáticas espontâneas, idade, instabilidade genômica",
          "Inflamação, sepse, imunomediadas (PIMA/IMHA), drogas, toxinas, FeLV"
        ],
        [
          "Celularidade medular",
          "Normal ou marcadamente hipercelular (medula cheia)",
          "Variável (normocelular, hiperplásica reativa ou hipoplásica)"
        ],
        [
          "Displasia citológica",
          "Geralmente multilinear (>10% em 1 a 3 linhagens)",
          "Pode ser idêntica à MDS (>10% displasia em 1 ou mais linhagens)"
        ],
        [
          "Proporção de blastos",
          "Variável (<5% em MDS-RC até 19% em MDS-EB)",
          "Tipicamente inferior a 5% (raramente blastemia transitória)"
        ],
        [
          "Reversibilidade clínica",
          "Irreversível sem quimioterapia citotóxica seletiva",
          "Potencialmente reversível após suspensão da causa subjacente"
        ],
        [
          "Conduta prioritária",
          "Suporte transfusional, antibióticos e oncologia especializada",
          "Identificar e tratar a causa primária; retirar fármacos suspeitos"
        ]
      ]
    },
    etiologiaFelinaFeLV: "Nos felinos, a síndrome mielodisplásica apresenta uma forte ligação histórica com o vírus da leucemia viral felina (FeLV). O retrovírus infecta diretamente os progenitores hematopoéticos medulares e o estroma fibroblástico. A integração proviral e a expressão de proteínas estruturais virais interferem na sinalização de ciclinas e fatores de transcrição, desencadeando apoptose prematura e maturação desordenada. Na série histórica de Hisasue et al. (2001), 15 de 16 gatos com MDS (93,8%) eram positivos para FeLV. Da mesma forma, Nelson & Couto (6ª ed.) relata que mais de 80% dos gatos em estudos clássicos eram virêmicos. No entanto, o FeLV também provoca diversas afecções medulares não neoplásicas (como aplasia pura de série vermelha e mielossupressão reativa), de forma que a presença do retrovírus associada à displasia não fecha automaticamente o diagnóstico de MDS clonal sem acompanhamento seriado da evolução clínica.",
    classificacaoPraticaVeterinaria: "A hematopatologia veterinária adota a classificação baseada nos consensos FAB adaptados pelo Animal Leukemia Study Group (Jain et al., 1991) e refinados por Withrow & MacEwen (2020) e Weiss (2006): (1) MDS-RC (Citopenia Refratária): citopenia em uma linhagem (anemia não regenerativa) com menos de 5% de blastos medulares e curso clínico indolente; (2) MDS-RCMD (Citopenia Refratária com Displasia Multilinear): menos de 5% de blastos medulares com displasia acentuada em duas ou três linhagens hematopoéticas e citopenias múltiplas; (3) MDS-EB (MDS com Excesso de Blasts): proporção de blasts medulares entre 5% e 19%, caracterizando a forma biologicamente mais avançada, com sobrevida curta e elevado risco de transformação para leucemia mieloide aguda; (4) MDS-Er (MDS com Predomínio Eritroide): caracterizada por hiperplasia eritroide maciça displásica e relação mieloide:eritroide (M:E) inferior a 1,0.",
    tabelaClassificacaoVeterinariaMds: {
      kind: "clinicalTable",
      caption: "Tabela — Classificação Prática da Síndrome Mielodisplásica em Cães e Gatos (Adaptada de Jain et al. e Withrow)",
      headers: [
        "Subtipo Editorial",
        "Blastos na Medula",
        "Linhagens com Displasia",
        "Relação M:E",
        "Perfil Clínico e Prognóstico"
      ],
      rows: [
        [
          "MDS-RC (Citopenia Refratária)",
          "< 5% de blastos",
          "Monolinear (predomínio eritroide)",
          "Geralmente normal",
          "Curso mais insidioso e indolente; sobrevida prolongada com suporte"
        ],
        [
          "MDS-RCMD (Displasia Multilinear)",
          "< 5% de blastos",
          "Bilinear ou trilinear (>= 2 linhagens)",
          "Variável",
          "Bicitopenia ou pancitopenia; requer monitoramento seriado rigoroso"
        ],
        [
          "MDS-EB (Excesso de Blasts)",
          "5% a 19% de blastos",
          "Displasia multilinear frequente",
          "Geralmente aumentada",
          "Forma biologicamente avançada (\"pré-leucêmica\"); alto risco de AML e sobrevida curta"
        ],
        [
          "MDS-Er (Predomínio Eritroide)",
          "Variável (< 20%)",
          "Predomínio eritroide maciço",
          "< 1,0 (predomínio eritroide)",
          "Diseritropoiese grave, macrocitose marcante e anemia profunda refratária"
        ]
      ]
    }
  },
  epidemiology: {
    populacaoCanina: "Na espécie canina, a síndrome mielodisplásica é classificada como uma enfermidade incomum a rara. Neoplasias mieloides como um grupo ocorrem cerca de 10 vezes menos frequentemente do que neoplasias linfoproliferativas (linfomas e leucemias linfoides) na clínica de pequenos animais (Withrow & MacEwen, 6ª ed.). A doença afeta cães adultos a idosos. No estudo contemporâneo de Meredith et al. (2025), que reuniu 42 cães com MDS avaliados por um painel de três patologistas clínicos, a idade média ao diagnóstico foi de 7,8 anos (amplitude de 3,4 a 15 anos). Nenhuma predisposição sexual entre machos e fêmeas foi detectada, acometendo cães de raças puras e sem raça definida em proporções similares.",
    investigacaoRacialDachshund: "Pesquisadores japoneses descreveram uma aparente concentração de casos de síndrome mielodisplásica e disfunções hematopoéticas clonais em cães da raça Dachshund miniatura. Investigações genômicas preliminares detectaram variantes em genes reguladores de ciclo celular e reparo de DNA, como UMODL1 e XRCC5. Contudo, as evidências científicas disponíveis permanecem no nível de força fraca a muito fraca (🔴), não autorizando considerar a afecção uma doença hereditária simples, nem justificando o uso desses marcadores em testes de triagem comerciais ou aconselhamento reprodutivo na rotina.",
    epidemiologiaFelinaContextoAtual: "Nos felinos, a epidemiologia da MDS sofreu alterações temporais expressivas associadas ao controle do FeLV. Nas décadas passadas, a maioria dos gatos acometidos era jovem a adulto de meia-idade e portador de infecção virêmica por FeLV. Com o advento e a disseminação de testes de triagem na rotina e vacinação ampla, verifica-se uma população crescente de gatos idosos, FeLV-negativos, desenvolvendo quadros esporádicos de MDS espontânea, aproximando o perfil epidemiológico felino contemporâneo daquele observado em cães e seres humanos."
  },
  pathogenesisTransmission: {
    cascata: [
      "1. Lesão genética somática inicial em célula-tronco hematopoética multipotente primitiva (CD34+) ou progenitor mieloide inicial.",
      "2. Expansão clonal da linhagem mutada, que adquire vantagem de proliferação e sobrevida sobre os clones policlonais normais da medula óssea.",
      "3. Desregulação da maquinaria transcricional e epigenética de diferenciação, resultando em arresto maturativo em estágios intermediários.",
      "4. Ativação exacerbada de vias pró-apoptóticas mitocondriais e de receptores de morte (Fas/FasL, caspases) nos cordões medulares.",
      "5. Morte prematura dos precursores dentro da medula (hematopoiese ineficaz), impedindo sua liberação para os sinusoides venosos.",
      "6. Instalação de medula óssea normo a hipercelular (\"cheia\") contrastando com bicitopenia ou pancitopenia grave no sangue periférico (\"vazio\").",
      "7. Sobrecarga compensatória renal com aumento de EPO, que estimula ainda mais a proliferação ineficaz do clone defeituoso.",
      "8. Instabilidade genômica com acúmulo de mutações somáticas secundárias ao longo do tempo, bloqueando totalmente a diferenciação e culminando em expansão descontrolada de mieloblastos (transformação em leucemia mieloide aguda - AML em 20% a 40% dos casos)."
    ],
    transmissao: "A síndrome mielodisplásica primária é uma neoplasia somática clonal adquirida, não sendo transmissível por contato direto, fômites ou vias reprodutivas. Na espécie felina, a infecção retroviral pelo vírus da leucemia felina (FeLV) é transmissível horizontalmente através de saliva, mordeduras, lambedura mútua e compartilhamento de comedouros/bebedouros, bem como verticalmente por via transplacentária e lactação; a infecção pelo FeLV atua como gatilho indutor de instabilidade genômica e displasia na medula óssea do gato infectado."
  },
  pathophysiology: {
    anemiaNaoRegenerativaEMacrocitose: "A anemia é a anormalidade hematológica mais constante da síndrome mielodisplásica, documentada em 95% dos cães e na totalidade dos gatos afetados (Meredith et al., 2025; Hisasue et al., 2001). Caracteriza-se por ser não regenerativa (reticulocitopenia inadequada para o grau de hipóxia). A presença de macrocitose não regenerativa (volume corpuscular médio - VCM elevado com contagem de reticulócitos baixa) constitui uma marca clínica clássica. Enquanto a macrocitose fisiológica reflete reticulócitos jovens de grande diâmetro, a macrocitose na MDS resulta da perda de sincronia na divisão celular e síntese de hemoglobina, gerando precursores megaloblastoides que sofrem mitoses incompletas. Observa-se ainda acentuada anisocitose (RDW elevado) e metarrubricitose inapropriada (liberação de hemácias nucleadas sem policromasia concomitante).",
    figuraEsfregacoDisplasia: {
      kind: "clinicalFigure",
      src: "/consulta-vet/sindrome-mielodisplasica/esfregaco-displasia-meredith2025.jpg",
      alt: "Esfregaço sanguíneo e aspirado medular demonstrando displasia celular em cão com MDS (Meredith et al., 2025)",
      caption: "Figura 1 — Displasia morfológica em cão com Síndrome Mielodisplásica: (a) Esfregaço de sangue periférico evidenciando neutrófilos displásicos com lobulação nuclear irregular e eritrócitos gigantes macrocíticos; (b) Aspirado de medula óssea exibindo hipercelularidade e diseritropoiese com precursores megaloblastoides (Meredith et al., 2025, CC BY 4.0).",
      display: "wide"
    },
    disgranulopoieseERiscoDeSepse: "O comprometimento clonal da linhagem granulocítica resulta em neutropenia absoluta combinada a severa disfunção fagocítica. Os precursores sofrem arresto em estágios de mielócitos e metamielócitos. Os poucos neutrófilos que atingem a circulação exibem defeitos funcionais acentuados na quimiotaxia, diapedese e atividade do sistema enzimático mieloperoxidase (MPO). O paciente perde a integridade da imunidade inata primária, tornando-se vulnerável a bacteremias espontâneas oriundas da flora comensal gastrointestinal e respiratória, com alto risco de evolução para sepse e choque séptico distributivo.",
    dismegacariopoieseEHemorragia: "A dismegacariopoiese afeta tanto a contagem quantitativa quanto a integridade funcional das plaquetas. Na medula óssea, encontram-se micromegacariócitos mononucleados (formas anãs anômalas) e megacariócitos gigantes hipolobulados. As plaquetas liberadas no sangue periférico exibem tamanho gigante (macroplaquetas com VPM aumentado), hipogranularidade citoplasmática e defeitos de ativação de receptores de membrana (glicoproteínas GPIIb/IIIa e GPIb-IX-V). Em consequência dessa trombocitopatia adquirida, o paciente pode apresentar sangramentos espontâneos graves (petéquias, equimoses, epistaxe, melena) mesmo com contagens plaquetárias que habitualmente não causariam hemorragia espontânea em outras condições (ex.: 40.000 a 60.000/mcL).",
    figuraMedulaBiopsiaReticulina: {
      kind: "clinicalFigure",
      src: "/consulta-vet/sindrome-mielodisplasica/medula-biopsia-reticulina-meredith2025.jpg",
      alt: "Biópsia de medula óssea com coloração de reticulina e micromegacariócitos na MDS canina (Meredith et al., 2025)",
      caption: "Figura 2 — Histopatologia e citologia medular na MDS: (a) Presença de micromegacariócitos hipolobulados anormais no aspirado; (b) Core biopsy de medula óssea corada por prata (reticulina de Gomori) demonstrando rede fibrótica reticulínica proeminente (mielofibrose secundária), explicando a ocorrência frequente de punção seca (Meredith et al., 2025, CC BY 4.0).",
      display: "wide"
    },
    fronteiraTaxonomicaMdsVsAml: "A separação entre MDS e AML é uma fronteira dinâmica em hematopatologia comparada. O critério histórico FAB (Jain et al., 1991) estabelecia o limiar de 30% de blasts na medula para classificar AML. A medicina veterinária moderna alinhou-se aos consensos internacionais da OMS, adotando aproximadamente 20% de blastos medulares como limite prático (Withrow & MacEwen, 2020; Meredith et al., 2025). Pacientes com menos de 20% de blasts são categorizados como MDS (sendo o subgrupo de 5% a 19% classificado como MDS com excesso de blasts - MDS-EB); espécimes com 20% ou mais de blasts são classificados como leucemia mieloide aguda (AML). No estudo de 70 cães de Meredith et al. (2025), essa distinção refletiu impacto prognóstico decisivo: a sobrevida mediana foi de 384 dias na MDS contra meros 6 dias na AML.",
    figuraSobrevidaMdsVsAml: {
      kind: "clinicalFigure",
      src: "/consulta-vet/sindrome-mielodisplasica/curva-sobrevida-mds-vs-aml-meredith2025.jpg",
      alt: "Curvas de sobrevida de Kaplan-Meier comparando MDS vs AML em 70 cães (Meredith et al., 2025)",
      caption: "Figura 3 — Curvas de sobrevida global de Kaplan-Meier para 70 cães com neoplasias mieloides: cães com síndrome mielodisplásica (MDS; n = 42, linha pontilhada) apresentaram mediana de sobrevida de 384 dias, em marcante contraste com a sobrevida mediana de 6 dias em cães com leucemia mieloide aguda (AML; n = 28, linha contínua; P < 0,001; Meredith et al., 2025, CC BY 4.0).",
      display: "default"
    },
    tabelaMdsVsAmlDiferenciais: {
      kind: "clinicalTable",
      caption: "Tabela comparativa — Síndrome Mielodisplásica (MDS) versus Leucemia Mieloide Aguda (AML)",
      headers: [
        "Característica Clínica",
        "Síndrome Mielodisplásica (MDS)",
        "Leucemia Mieloide Aguda (AML)"
      ],
      rows: [
        [
          "Curso clínico típico",
          "Insidioso, crônico a subagudo (semanas a meses)",
          "Fulminante, agudo e rapidamente progressivo (dias)"
        ],
        [
          "Proporção de blastos na medula",
          "< 20% de blasts medulares (< 5% em RC; 5–19% em EB)",
          ">= 20% de blastos na contagem diferencial medular"
        ],
        [
          "Blastos no sangue periférico",
          "Ausentes em 76% dos cães; quando presentes, em baixa proporção",
          "Frequentemente numerosos (embora formas aleucêmicas possam ocorrer)"
        ],
        [
          "Celularidade medular",
          "Normal ou aumentada (hematopoiese ineficaz e apoptose)",
          "Marcaradamente hipercelular com apagamento por lençóis de blasts"
        ],
        [
          "Displasia celular",
          "Marcada e multilinear (eritrócitos, neutrófilos e megacariócitos)",
          "Pode estar presente, mas sobrepujada pela proliferação de blastos"
        ],
        [
          "Sobrevida mediana (Meredith 2025)",
          "384 dias (risco relativo de morte 5 vezes menor)",
          "6 dias (letalidade precoce catastrófica por choque ou hemorragia)"
        ],
        [
          "Objetivo terapêutico inicial",
          "Suporte transfusional e manejo de infecção; quimioterapia seletiva",
          "Indução quimioterápica intensiva de emergência com alto risco de lise"
        ]
      ]
    },
    tabelaMdsVsAplasiaMedular: {
      kind: "clinicalTable",
      caption: "Tabela comparativa — Síndrome Mielodisplásica (MDS) versus Anemia Aplástica / Aplasia Medular",
      headers: [
        "Parâmetro de Diferenciação",
        "Síndrome Mielodisplásica (MDS)",
        "Anemia Aplástica (Aplasia Medular)"
      ],
      rows: [
        [
          "Quadro sanguíneo periférico",
          "Anemia não regenerativa, bicitopenia ou pancitopenia",
          "Pancitopenia invariavelmente profunda e não regenerativa"
        ],
        [
          "Celularidade na core biopsy",
          "Normocelular a marcadamente hipercelular (medula cheia)",
          "Gravemente hipocelular (espaços substituídos por tecido adiposo)"
        ],
        [
          "Gordura medular relativa",
          "Normal ou reduzida em relação à celularidade",
          "Marcaradamente aumentada (> 75% a 90% do volume intertrabecular)"
        ],
        [
          "Displasia citológica",
          "Proeminente em uma ou mais linhagens (> 10%)",
          "Ausente; raros precursores residuais com morfologia normal"
        ],
        [
          "Mecanismo fisiopatológico",
          "Hematopoiese ineficaz clonal com apoptose intramedular",
          "Destruição ou exaustão imunomediada/tóxica das células-tronco"
        ],
        [
          "Risco de progressão para AML",
          "Presente (20% a 40% sofrem transformação leucêmica)",
          "Inexistente (o risco é sepse bacteriana e hemorragia fatal)"
        ]
      ]
    }
  },
  clinicalSignsPathophysiology: [
    {
      system: "hematologic",
      findings: [
        {
          finding: "Palidez intensa de mucosas e anemia não regenerativa profunda",
          mechanism: "A hematopoiese ineficaz com apoptose intramedular de precursores eritroides reduz drasticamente a liberação de reticulócitos na circulação; a sobrevida de hemácias circulantes não compensa a carência de reposição central.",
          clinicalMeaning: "Manifestação clínica mais constante da doença; exige suporte transfusional com concentrado de hemácias quando há taquicardia e prostração.",
          priority: "emergency",
          context: [
            "Triagem clínica",
            "Indicação transfusional"
          ]
        },
        {
          finding: "Manifestações hemorrágicas espontâneas (petéquias, equimoses, epistaxe, melena)",
          mechanism: "Resulta da trombocitopenia quantitativa somada à trombocitopatia adquirida funcional por liberação de plaquetas anormais hipogranulares com falha em receptores GPIIb/IIIa.",
          clinicalMeaning: "Sinal de risco iminente de hemorragia grave no sistema nervoso central ou pulmões; o risco de sangramento não se correlaciona estritamente com o valor absoluto da contagem.",
          priority: "emergency",
          context: [
            "Hemostasia primária",
            "Risco hemorrágico"
          ]
        },
        {
          finding: "Neutropenia absoluta com esfregaço revelando neutrófilos hipossegmentados ou gigantes",
          mechanism: "Arresto na maturação de promielócitos e mielócitos com apoptose de precursores granulocíticos; anomalias nucleares (pseudo-Pelger-Huët) e metamielócitos gigantes refletem divisão celular anômala.",
          clinicalMeaning: "A contagem neutrofílica inferior a 1.000/mcL expõe o animal a bacteremias espontâneas e sepse, demandando isolamento e antibioticoterapia.",
          priority: "emergency",
          context: [
            "Imunidade inata",
            "Risco de sepse"
          ]
        }
      ]
    },
    {
      system: "cardiovascular",
      findings: [
        {
          finding: "Taquicardia compensatória em repouso e pulso hipercinético",
          mechanism: "A redução crítica na concentração de hemoglobina reduz a oferta tecidual de oxigênio (DO2); barorreceptores ativam tônus simpático para elevar a frequência cardíaca e sustentar o débito cardíaco.",
          clinicalMeaning: "Parâmetro objetivo de descompensação anêmica hemodinâmica que orienta a necessidade de transfusão imediata.",
          priority: "common",
          context: [
            "Exame físico",
            "Critério transfusional"
          ]
        },
        {
          finding: "Sopro cardíaco sistólico funcional de ejeção (grau II a III/VI)",
          mechanism: "A diminuição acentuada da massa celular de eritrócitos reduz a viscosidade sanguínea; associada ao estado hiperdinâmico, gera fluxo turbulento transvalvar nas vias de saída ventrículo-aórtica.",
          clinicalMeaning: "Sopro inofensivo secundário à anemia (sopro de fluxo), que costuma regredir após a correção do hematócrito.",
          priority: "common",
          context: [
            "Ausculta cardiovascular",
            "Diferencial de sopro"
          ]
        }
      ]
    },
    {
      system: "general",
      findings: [
        {
          finding: "Prostração severa, letargia e fraqueza muscular progressiva",
          mechanism: "Hipóxia tecidual generalizada por déficit de transporte de O2 aos tecidos periféricos e musculatura esquelética, agravada pela ação de citocinas inflamatórias (TNF-alfa, IL-1).",
          clinicalMeaning: "Principal motivo de consulta relatado pelos tutores; reflete evolução crônica de semanas a meses.",
          priority: "common",
          context: [
            "Anamnese",
            "Evolução crônica"
          ]
        },
        {
          finding: "Perda de peso progressiva e caquexia neoplásica",
          mechanism: "Aumento expressivo no gasto energético basal decorrente do turnover acelerado e apoptose maciça de precursores na medula óssea hipercelular.",
          clinicalMeaning: "Sarcopenia e escore corporal reduzido pioram o prognóstico geral e a tolerância a terapias antineoplásicas.",
          priority: "systemic",
          context: [
            "Escore corporal",
            "Prognóstico"
          ]
        }
      ]
    },
    {
      system: "immunologic",
      findings: [
        {
          finding: "Febre intermitente de origem indeterminada (pirexia)",
          mechanism: "Liberação de pirógenos endógenos (IL-1, IL-6, TNF-alfa) pelo microambiente clonal medular inflamado ou episódios de bacteremia oculta favorecidos por neutropenia.",
          clinicalMeaning: "Toda febre em paciente com MDS e neutropenia deve ser encarada como sepse bacteriana presumida até que se prove o contrário.",
          priority: "emergency",
          context: [
            "Termorregulação",
            "Neutropenia febril"
          ]
        },
        {
          finding: "Infecções bacterianas oportunistas recorrentes (estomatite, piodermatite profunda)",
          mechanism: "Quebra na integridade da barreira de fagócitos primários; bactérias comensais colonizam mucosas e pele sem resposta inflamatória neutrofílica eficiente.",
          clinicalMeaning: "Lesões ulcerativas orais indolentes e infecções dermatológicas de difícil cicatrização são pistas de disfunção mieloide.",
          priority: "common",
          context: [
            "Defesa de barreira",
            "Infecção oportunista"
          ]
        }
      ]
    },
    {
      system: "lymphatic",
      findings: [
        {
          finding: "Esplenomegalia e hepatomegalia difusas à palpação e ultrassom",
          mechanism: "Reativação de focos de hematopoiese extramedular no sistema mononuclear fagocitário abdominal em resposta à falência medular, associada à infiltração clonal de precursores.",
          clinicalMeaning: "Presente em mais de 50% dos cães e gatos com neoplasia mieloide; exige punção aspirativa para descartar linfoma concomitante.",
          priority: "common",
          context: [
            "Palpação abdominal",
            "Hematopoiese extramedular"
          ]
        },
        {
          finding: "Linfadenomegalia reativa discreta a moderada",
          mechanism: "Ativação imunológica por bacteremias subclínicas de repetição ou eventual infiltração leucêmica precoce.",
          clinicalMeaning: "Geralmente discreta; aumento linfonodal volumoso sugere linfoma como diagnóstico primário com infiltração medular.",
          priority: "common",
          context: [
            "Sistema linfático",
            "Diferencial de linfoma"
          ]
        }
      ]
    },
    {
      system: "gastrointestinal",
      findings: [
        {
          finding: "Melena, hematoquezia ou petéquias na mucosa oral",
          mechanism: "Microulcerações na mucosa gástrica e intestinal sangram devido à deficiência e disfunção de plaquetas, agravadas por isquemia de mucosa anêmica.",
          clinicalMeaning: "Perda sanguínea intraluminal crônica agrava a anemia não regenerativa e pode precipitar choque hipovolêmico.",
          priority: "emergency",
          context: [
            "Mucosa digestiva",
            "Sangramento oculto"
          ]
        }
      ]
    }
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: "Hemograma completo com contagem de reticulócitos e esfregaço manual",
      purpose: "Identificação inicial de citopenias periféricas, atipias morfológicas e quantificação de blastos circulantes.",
      description: "Coleta de sangue em EDTA. Realização de hemograma automatizado com contagem absoluta de reticulócitos. Confecção imediata de esfregaço sanguíneo corado por panótico rápido ou Wright-Giemsa para revisão microscópica por patologista clínico em objetiva de imersão (100x). Em gatos, inspeção rigorosa da cauda e bordas do esfregaço para descartar agregados plaquetários.",
      interpretation: "Anemia não regenerativa grave em 95% dos cães (hematócrito mediano 21%; Meredith et al., 2025) e 100% dos gatos (Hisasue et al., 2001). Macrocitose não regenerativa (VCM elevado) com anisocitose proeminente (RDW alto). Bicitopenia ou pancitopenia. No esfregaço: metamielócitos gigantes, hipossegmentação neutrofílica (pseudo-Pelger-Huët) e plaquetas gigantes hipogranulares. Ausência de blastos em 76% dos cães com MDS.",
      limitations: "A ausência de blastos circulantes NÃO descarta MDS nem AML. Contadores automáticos subestimam plaquetas felinas por agregação mecânica.",
      isGoldStandard: false
    },
    {
      stepNumber: 2,
      title: "Exclusão de causas periféricas de citopenia e coagulograma",
      purpose: "Diferenciação entre consumo/destruição periférica e insuficiência medular central.",
      description: "Pesquisa de autoaglutinação em salina e teste de Coombs direto (descartar IMHA). Avaliação de esquizócitos no esfregaço. Coagulograma com tempo de protrombina (PT), tempo de tromboplastina parcial ativada (aPTT), dosagem de fibrinogênio e D-dímero.",
      interpretation: "PT e aPTT tipicamente normais na MDS não complicada (a hemostasia secundária plasmática permanece preservada, a menos que ocorra sepse e CID secundária). Teste de Coombs negativo na forma primária; positividade pode sugerir dismielopoiese secundária a afecções imunomediadas.",
      limitations: "Testes de coagulação plasmática normais não protegem o paciente contra hemorragias graves decorrentes de trombocitopenia e trombocitopatia primária.",
      isGoldStandard: false
    },
    {
      stepNumber: 3,
      title: "Rastreio de causas secundárias e sorologia/PCR FeLV e FIV em gatos",
      purpose: "Identificação de dismielopoiese secundária reversível e rastreio da principal associação etiológica felina.",
      description: "Levantamento farmacológico exaustivo (estrógenos, quimioterápicos, cloranfenicol, griseofulvina, fenobarbital, sulfonamidas). Perfil bioquímico sérico (ureia, creatinina, enzimas hepáticas, albumina). Em felinos, teste imunocromatográfico/ELISA para antígeno p27 do FeLV e anticorpos FIV, seguido de PCR proviral para FeLV em sangue total.",
      interpretation: "Exames bioquímicos encontram-se frequentemente preservados na fase inicial da MDS; alterações refletem complicações orgânicas ou hepatopatias/nefropatias causadoras de anemia crônica. Positividade para FeLV presente na maioria das séries históricas felinas (Hisasue et al., 2001; Nelson & Couto, 6ª ed.).",
      limitations: "O gato FeLV-positivo com displasia medular não é automaticamente portador de clone neoplásico irreversível; pode tratar-se de dismielopoiese viral reversível ou aplasia pura.",
      isGoldStandard: false
    },
    {
      stepNumber: 4,
      title: "Aspirado citológico de medula óssea (Morfologia e blasts)",
      purpose: "Avaliação detalhada da morfologia celular de precursores hematopoéticos e contagem diferencial de blastos.",
      description: "Punção com agulha de Illinois ou Rosenthal sob sedação profunda e anestesia local, preferencialmente na fossa trocantérica femoral ou tuberosidade maior do úmero. Obtenção de espículas medulares, confecção de lâminas por técnica de esmagamento suave (squash) e coloração com Giemsa ou Leishman. Contagem diferencial estrita de 300 a 500 células nucleadas.",
      interpretation: "Celularidade normo a hipercelular com partículas ricas. Displasia citológica em >= 10% das células de pelo menos uma linhagem: diseritropoiese (eritroblastos megaloblastoides, núcleos bizarros, pontes intercromáticas), disgranulopoiese (metamielócitos gigantes, segmentação irregular) e dismegacariopoiese (micromegacariócitos mononucleados). Blastos quantificados em < 5% (MDS-RC/RCMD) ou 5% a 19% (MDS-EB).",
      limitations: "Punção seca (dry tap) ocorre em até 30% dos cães com MDS devido à mielofibrose secundária concomitante; hemodiluição acentuada pode mascarar a celularidade real.",
      isGoldStandard: false
    },
    {
      stepNumber: 5,
      title: "Biópsia de medula óssea (core biopsy por agulha de Jamshidi)",
      purpose: "Avaliação da celularidade real, arquitetura tecidual intertrabecular e diagnóstico diferencial de mielofibrose e aplasia.",
      description: "Obtenção de fragmento ósseo intacto de 1,5 a 2 cm com agulha de Jamshidi na crista ilíaca ou trocânter femoral sob anestesia geral. Fixação em formol neutro tamponado a 10%, descalcificação e processamento histotécnico com hematoxilina-eosina (HE) e coloração especial de prata para reticulina de Gomori.",
      interpretation: "Padrão ouro para determinação da celularidade real: demonstra espaços intertrabeculares normocelulares ou marcadamente hipercelulares (proporção hematopoiese:gordura > 50-70%), descartando categoricamente a substituição adiposa da anemia aplástica. Demonstra agregação anômala de precursores imaturos (ALIP) e evidencia graus variáveis de mielofibrose reticulínica secundária.",
      limitations: "Exige anestesia geral com suporte hemodinâmico rigoroso e estabilização transfusional prévia se o hematócrito for muito baixo. Tempo de laudo de 3 a 7 dias.",
      isGoldStandard: true
    },
    {
      stepNumber: 6,
      title: "Citometria de fluxo, citoquímica e imunocitoquímica medular",
      purpose: "Confirmação da linhagem mieloide e exclusão definitiva de leucemias linfoides agudas (ALL).",
      description: "Análise de suspensão celular de aspirado medular por citometria de fluxo multiparamétrica utilizando anticorpos monoclonais contra marcadores de superfície e intracelulares: MPO (mieloperoxidase), CD11b (linhagem mieloide), CD14 (linhagem monocítica), CD34 (célula-tronco/blasto), CD3 (linfócitos T) e CD79a (linfócitos B). Citoquímica com Sudan Black B e mieloperoxidase.",
      interpretation: "Positividade para marcadores mieloides (CD11b, MPO, CD14) e negatividade para marcadores linfoides confirma a linhagem mieloide dos precursores indiferenciados, excluindo linfoma estágio V e leucemia linfoide.",
      limitations: "Painéis genômicos moleculares (NGS, citogenética) padronizados na medicina humana ainda não estão validados comercialmente para uso rotineiro em cães e gatos (Meredith et al., 2025).",
      isGoldStandard: false
    },
    {
      stepNumber: 7,
      title: "Monitoramento longitudinal seriado (Integração clínico-patológica)",
      purpose: "Acompanhamento do comportamento temporal do clone e confirmação definitiva do diagnóstico.",
      description: "Hemogramas seriados a cada 1 a 4 semanas associados a avaliações clínicas e físicas contínuas. Acompanhamento da trajetória do hematócrito, contagem plaquetária e aparecimento de blastos periféricos. Repetição de punção medular em caso de declínio clínico agudo ou suspeita de progressão.",
      interpretation: "Como estabelece a hematologia veterinária, o filme evolutivo é mais decisivo do que a fotografia estática inicial. A persistência de citopenias e displasias após a remoção de drogas e resolução de infecções confirma o diagnóstico de MDS e monitora a transição para AML.",
      limitations: "Demanda cooperação estrita do tutor e custos adicionais com repetição seriada de exames laboratoriais.",
      isGoldStandard: false
    }
  ],
  treatment: {
    metaPrimaria: "Não há atualmente diretriz consensual ACVIM ou protocolo medicamentoso curativo para a síndrome mielodisplásica em pequenos animais (ACVIM Endorsed Statements; Feline Emergency and Critical Care Medicine, 2ª ed.). O manejo divide-se em três pilares fundamentais: (1) Identificação e suspensão imediata de fármacos mielotóxicos e tratamento de gatilhos de dismielopoiese secundária; (2) Suporte hematológico para sustentação de oxigenação tecidual e prevenção de óbito por sepse neutropênica ou hemorragia; (3) Em pacientes com MDS primária clonal de alto risco (especialmente MDS-EB com aumento progressivo de blastos), discussão multidisciplinar com oncologista veterinário sobre protocolos quimioterápicos citorredutores.",
    tratamentoCausasSecundarias: "Na vigência de suspeita de dismielopoiese secundária reativa, a intervenção imediata mais eficaz é suspender todos os medicamentos com potencial mielossupressor (estrogênios, cloranfenicol, quimioterápicos, sulfonamidas, fenobarbital). Pacientes com enteropatias crônicas ou suspeita de má absorção devem receber cobalamina (vitamina B12 500 a 1.000 mcg SC semanal) e ácido fólico. Se houver forte suspeita de componente imune associado (PIMA ou trombocitopenia imunomediada), realiza-se prova terapêutica com prednisolona (1 a 2 mg/kg/dia VO) com monitoramento frequente de neutrófilos e vigilância estrita contra infecções secundárias.",
    suporteTransfusionalHemacias: "A transfusão de concentrado de hemácias (pRBC) ou sangue total é a intervenção de resgate mais importante para o paciente com anemia sintomática grave. A indicação transfusional não deve se basear apenas em um ponto de corte arbitrário de hematócrito, mas sim em sinais clínicos de hipóxia celular: taquicardia persistente em repouso, taquipneia, fraqueza severa, prostração profunda e lactato sérico elevado (> 2,5 mmol/L). Dose recomendada de concentrado de hemácias: 10 a 15 mL/kg IV lenta em 2 a 4 horas (sangue total: 15 a 20 mL/kg IV). Em gatos, a tipagem sanguínea para o sistema AB é mandatória antes de qualquer infusão para evitar reações hemolíticas agudas fatais; o teste de compatibilidade cruzada (crossmatch) é obrigatório se o animal já recebeu transfusões há mais de 4 dias. O tutor deve ser esclarecido de que a transfusão não cura a doença medular, proporcionando apenas ganho temporário de transporte de oxigênio (meia-vida de 20 a 30 dias das hemácias transfundidas).",
    manejoNeutropeniaFebril: "Animais com contagem de neutrófilos segmentados inferior a 1.000/mcL associada a temperatura retal elevada (>= 39,3 °C) devem ser conduzidos como emergência médica sob suspeita de choque séptico por translocação da microbiota comensal. Coletar imediatamente hemocultura e urocultura por punção estéril. Iniciar antibioticoterapia parenteral bactericida empírica imediata de amplo espectro por via intravenosa: Ampicilina-sulbactam (30 a 50 mg/kg IV q8h) combinada a Enrofloxacino (5 a 10 mg/kg IV q24h em cães; em gatos, preconiza-se Marbofloxacino 2 mg/kg IV q24h para evitar retinopatia e cegueira induzida por enrofloxacino) ou Cefepima (30 mg/kg IV q8h). Procedimentos que lesionem mucosas (enemas ou termometria retal forçada) devem ser evitados.",
    fatoresCrescimentoHematopoetico: "O emprego de fatores estimuladores de colônias de granulócitos (G-CSF recombinante humano / Filgrastim na dose de 3 a 5 mcg/kg SC q24h por 3 a 5 dias) e agentes estimuladores da eritropoiese (Eritropoietina recombinante humana / Alfaepoetina 100 U/kg SC 3 vezes por semana ou Darbepoetina alfa 0,5 a 1,0 mcg/kg SC semanal) é relatado na literatura veterinária com resultados variáveis. É fundamental compreender que esses fármacos estimulam progenitores já existentes, mas não corrigem a mutação genética do clone neoplásico. Além disso, o uso repetido de proteínas recombinantes humanas acarreta risco de desenvolvimento de anticorpos neutralizantes cruzados contra a eritropoietina endógena do animal, precipitando aplasia pura de série vermelha irreversível.",
    controversiaCorticosteroides: "O uso empírico de corticosteroides (prednisolona 1 a 2 mg/kg/dia VO) não possui evidência científica de eficácia na eliminação do clone neoplásico da MDS verdadeira (Feline Emergency and Critical Care Medicine, 2ª ed.). No estudo de Meredith et al. (2025), 31 de 42 cães com MDS receberam esquemas imunossupressores, porém a resposta foi inconsistente. A prova terapêutica com prednisolona é aceitável quando não se pode afastar um componente imunomediado sobreposto (PIMA/ITP concorrente), exigindo monitoramento rigoroso contra complicações infecciosas secundárias à neutropenia.",
    quimioterapiaMatsuyamaProtocoloCitarabinaDoxorrubicina: "Em cães com síndrome mielodisplásica com excesso de blasts (MDS-EB) ou neoplasia mieloide avançada, o estudo contemporâneo de Matsuyama et al. (2023) avaliou o protocolo combinado de doxorrubicina e citarabina contínua em 11 cães (2 MDS, 4 MDS/AML e 5 AML). O regime administrado consistiu em Doxorrubicina na dose de 30 mg/m² IV administrada em infusão de 20 minutos, seguida por Citarabina na dose de 300 mg/m² IV em infusão contínua (CRI) ao longo de 6 horas. Sete dos 11 cães (63,6%) obtiveram resolução completa das citopenias periféricas (incluindo 2/2 cães com MDS pura e 2/4 cães com MDS/AML), com mediana de remissão de 344 dias e sobrevida global de 369 dias. A toxicidade clínica predominante foi gastrointestinal e mielossupressiva; no entanto, foram registrados eventos adversos graves de grau V, incluindo dois casos de insuficiência cardíaca congestiva induzida por doxorrubicina. O protocolo exige oncologista experiente e monitorização ecocardiográfica.",
    azacitidinaEmFelinos: "A 5-azacitidina é um agente quimioterápico análogo de nucleosídeo pirimidínico que atua como inibidor da DNA-metiltransferase (agente hipometilante), amplamente utilizado na MDS humana para desmetilar e reexpressar genes supressores de tumor silenciados epigeneticamente. Na medicina felina, Hisasue, Tanaka & Neo (2022) descreveram uma gata de 5 anos com MDS grave, anemia não regenerativa, trombocitopenia e 19% de blasts na medula tratada com azacitidina (35 a 70 mg/m² SC por 3 a 5 dias consecutivos em 3 ciclos) associada a prednisolona e suporte. A paciente apresentou redução expressiva da blastemia e da displasia, permanecendo clinicamente estável e viva por mais de 1.474 dias (mais de 4 anos). Embora corresponda a relato de caso único (n=1, evidência fraca), constitui uma importante prova de conceito para terapias epigenéticas na oncologia felina.",
    citarabinaBaixaDoseHistorica: "O emprego de citarabina (Ara-C) em regime de baixa dose (10 mg/m² SC a cada 12 horas por 7 a 14 dias em ciclos mensais) é citado em manuais tradicionais (Nelson & Couto, 6ª ed.) com o objetivo teórico de induzir diferenciação celular sem provocar ablação medular completa. A resposta terapêutica em cães e gatos é tipicamente modesta e de curta duração (remissões parciais de poucas semanas), agregando o risco de mielossupressão transitória em animais já anêmicos e leucopênicos.",
    terapiasInadequadasEMitos: "Condutas desaconselhadas e mitos frequentes na rotina: (1) Considerar qualquer displasia medular como câncer sem investigar causas secundárias reversíveis; (2) Prescrever imunossupressão pesada sem antes descartar sepse em animais febris e neutropênicos; (3) Utilizar o antigo ponto de corte de 30% de blastos para descartar AML, negligenciando a classificação moderna de 20%; (4) Acreditar que todo gato FeLV-positivo com anemia não regenerativa tem MDS clonal sem acompanhar a resposta clínica; (5) Administrar enemas ou realizar termometria retal vigorosa em animais com neutropenia grave, provocando translocação bacteriana e bacteremia fatal."
  },
  complications: {
    transformacaoEmLeucemiaMieloideAguda: "A progressão para leucemia mieloide aguda (AML) ocorre em 20% a 40% dos cães e gatos com síndrome mielodisplásica que não sucumbem precocemente às citopenias (Withrow & MacEwen, 6ª ed.; Nelson & Couto, 6ª ed.). A transformação leucêmica resulta do acúmulo de mutações adicionais que inibem a apoptose e bloqueiam de forma terminal a diferenciação dos mieloblastos. A evolução é acompanhada de declínio clínico agudo, blastemia periférica explosiva e sobrevida extremamente curta (mediana de 6 dias na AML; Meredith et al., 2025).",
    choqueSepticoNeutropenico: "A neutropenia acentuada combinada à incapacidade fagocítica dos granulócitos displásicos colapsa a barreira de defesa contra bactérias comensais do trato gastrointestinal e orofaringe. O paciente pode desenvolver subitamente febre alta, bacteremia sistêmica, choque distributivo e falência de múltiplos órgãos antes da identificação de um foco infeccioso evidente.",
    hemorragiaCatastrofica: "A sobreposição de trombocitopenia profunda com trombocitopatia adquirida expõe o paciente a sangramentos espontâneos com risco à vida. Hemorragia pulmonar difusa, hemorragia gastrointestinal profusa e hematomas intracranianos constituem causas comuns de óbito agudo ou indicação de eutanásia humanitária.",
    prognosticoCenarioCaninoContemporaneo: "O prognóstico da síndrome mielodisplásica canina foi significativamente redefinido com a coorte de 70 cães de Meredith et al. (2025). Contrariando a visão clássica de letalidade fulminante em poucas semanas, o estudo demonstrou que a MDS apresenta curso substancialmente mais longo do que a AML: a sobrevida mediana para cães com MDS foi de 384 dias, em marcante contraste com os 6 dias da AML (P < 0,001). O risco instantâneo de óbito de cães com MDS foi aproximadamente 5 vezes menor do que naqueles portadores de AML.",
    prognosticoFatoresPreditoresSobrevida: "No estudo contemporâneo de Meredith et al. (2025), os fatores associados de maneira estatisticamente significante à sobrevida dos cães foram o peso corporal (cães de menor porte tenderam a apresentar maior longevidade), a contagem global de leucócitos, a contagem de plaquetas e a proporção de blastos circulantes no sangue periférico. Cada aumento de um ponto percentual na blastemia periférica elevou proporcionalmente o risco de morte. A contagem percentual estática de blastos na medula óssea não atingiu significância univariável nesse estudo, refletindo heterogeneidade amostral e a importância prognóstica da disseminação periférica.",
    prognosticoFelino: "Na espécie felina, o prognóstico geral permanece reservado a desfavorável, com sobrevida média descrita historicamente variando de poucas semanas a alguns meses (Feline Emergency and Critical Care Medicine, 2ª ed.). No estudo de Hisasue et al. (2001), 3 de 6 gatos com alta contagem de blastos medulares evoluíram para AML, contra apenas 1 de 8 gatos com contagens baixas. Gatos FeLV-positivos com anemia severa e dependência transfusional frequente apresentam pior sobrevida."
  },
  prevention: {
    controleFeLVEProfilaxia: "Em felinos, a principal medida preventiva contra a forma associada a retrovírus consiste no controle da infecção pelo vírus da leucemia viral felina (FeLV). As diretrizes da AAFP e ISFM preconizam: testagem sorológica de todos os gatos no momento da adoção, vacinação de indivíduos com acesso a ambiente externo ou que convivam com gatos de status desconhecido, e isolamento estrito de gatos infectados.",
    farmacovigilanciaMielotoxica: "A prevenção de quadros graves de dismielopoiese secundária requer farmacovigilância veterinária ativa: evitar o uso empírico de medicamentos com potencial mielotóxico conhecido (estrógenos exógenos para interrupção de prenhez em cadelas, cloranfenicol contínuo, sulfonamidas prolongadas em raças sensíveis). Em animais submetidos a quimioterapia citotóxica crônica ou imunossupressão, realizar monitorização hematológica seriada a cada 15 a 30 dias.",
    vigilanciaCitopeniasCronicas: "Pacientes que exibam citopenias leves e inexplicadas no hemograma de rotina devem ser acompanhados com hematologia seriada a cada 2 a 3 meses. O diagnóstico precoce de desordens mieloides em fases de baixo blasto permite melhor planejamento transfusional, suporte profilático e manejo preventivo de infecções antes que o animal descompense em crise aplásica ou choque séptico."
  },
  figures: [
    {
      kind: "clinicalFigure",
      src: "/consulta-vet/sindrome-mielodisplasica/esfregaco-displasia-meredith2025.jpg",
      alt: "Esfregaço sanguíneo e aspirado medular demonstrando displasia celular em cão com MDS (Meredith et al., 2025)",
      caption: "Figura 1 — Displasia morfológica em cão com Síndrome Mielodisplásica: (a) Esfregaço de sangue periférico evidenciando neutrófilos displásicos com lobulação nuclear irregular e eritrócitos gigantes macrocíticos; (b) Aspirado de medula óssea exibindo hipercelularidade e diseritropoiese com precursores megaloblastoides (Meredith et al., 2025, CC BY 4.0).",
      display: "wide"
    },
    {
      kind: "clinicalFigure",
      src: "/consulta-vet/sindrome-mielodisplasica/medula-biopsia-reticulina-meredith2025.jpg",
      alt: "Biópsia de medula óssea com coloração de reticulina e micromegacariócitos na MDS canina (Meredith et al., 2025)",
      caption: "Figura 2 — Histopatologia e citologia medular na MDS: (a) Presença de micromegacariócitos hipolobulados anormais no aspirado; (b) Core biopsy de medula óssea corada por prata (reticulina de Gomori) demonstrando rede fibrótica reticulínica proeminente (mielofibrose secundária), explicando a ocorrência frequente de punção seca (Meredith et al., 2025, CC BY 4.0).",
      display: "wide"
    },
    {
      kind: "clinicalFigure",
      src: "/consulta-vet/sindrome-mielodisplasica/leucemia-mieloide-comparacao-meredith2025.jpg",
      alt: "Citologia comparativa e imunofenotipagem de leucemia mieloide aguda em cão (Meredith et al., 2025)",
      caption: "Figura 3 — Diagnóstico diferencial de Leucemia Mieloide Aguda (AML): (a) Esfregaço sanguíneo com blastos indiferenciados e mielomonócitos com lobulação nuclear irregular; (b) Demonstração citoquímica de mieloperoxidase (MPO) positiva em precursores mieloides (Meredith et al., 2025, CC BY 4.0).",
      display: "default"
    },
    {
      kind: "clinicalFigure",
      src: "/consulta-vet/sindrome-mielodisplasica/biopsia-medular-leucemia-meredith2025.jpg",
      alt: "Core biopsy de medula óssea exibindo apagamento por blastos na transformação para AML (Meredith et al., 2025)",
      caption: "Figura 4 — Progressão para Leucemia Mieloide Aguda (AML): core biopsy de medula óssea demonstrando hipercelularidade extrema e substituição dos cordões hematopoéticos por população densa e monomórfica de blastos (Meredith et al., 2025, CC BY 4.0).",
      display: "default"
    },
    {
      kind: "clinicalFigure",
      src: "/consulta-vet/sindrome-mielodisplasica/curva-sobrevida-mds-vs-aml-meredith2025.jpg",
      alt: "Curvas de sobrevida de Kaplan-Meier comparando MDS vs AML em 70 cães (Meredith et al., 2025)",
      caption: "Figura 5 — Curvas de sobrevida global de Kaplan-Meier para 70 cães com neoplasias mieloides: cães com síndrome mielodisplásica (MDS; n = 42, linha pontilhada) apresentaram mediana de sobrevida de 384 dias, em marcante contraste com a sobrevida mediana de 6 dias em cães com leucemia mieloide aguda (AML; n = 28, linha contínua; P < 0,001; Meredith et al., 2025, CC BY 4.0).",
      display: "default"
    },
    {
      kind: "clinicalFigure",
      src: "/consulta-vet/sindrome-mielodisplasica/locais-coleta-medula-ossea-vetius.jpg",
      alt: "Locais anatômicos de referência para punção aspirativa e core biopsy de medula óssea em cães e gatos",
      caption: "Figura 6 — Sítios anatômicos recomendados para aspiração e core biopsy de medula óssea por agulha de Jamshidi: fossa trocantérica do fêmur proximal, crista ilíaca e tuberosidade maior do úmero (Guia de Procedimentos Vetius).",
      display: "wide"
    }
  ],
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    "linfoma-felino",
    "coagulacao-intravascular-disseminada-cid"
  ],
  relatedMedicationSlugs: [
    "prednisolona"
  ],
  references: [
    {
      id: "ref-meredith-2025",
      citationText: "Meredith AM, Beeler-Marfisi J, Berke O, Mutsaers AJ, Bienzle D. Standardized bone marrow assessment, risk variables, and survival in dogs with myelodysplastic syndrome and acute myeloid leukemia. Veterinary Pathology. 2025;62(1):64-73.",
      url: "https://doi.org/10.1177/03009858241277982",
      evidenceLevel: "Estudo de coorte padronizado (n=70)"
    },
    {
      id: "ref-matsuyama-2023",
      citationText: "Matsuyama A, Beeler-Marfisi J, Richardson D, Woods JP, Mutsaers AJ. Treatment of myeloid neoplasia with doxorubicin and cytarabine in 11 dogs. Veterinary and Comparative Oncology. 2023;21(1):54-61.",
      url: "https://doi.org/10.1111/vco.12860",
      evidenceLevel: "Série clínica retrospectiva intervencional (n=11)"
    },
    {
      id: "ref-hisasue-2022",
      citationText: "Hisasue M, Tanaka M, Neo S. A cat with myelodysplastic syndrome by administration of the methylation inhibitor Azacytidine. Journal of Veterinary Medical Science. 2022;84(1):142-148.",
      url: "https://doi.org/10.1292/jvms.20-0352",
      evidenceLevel: "Relato de caso seminal com remissão prolongada"
    },
    {
      id: "ref-weiss-aird-2001",
      citationText: "Weiss DJ, Aird B. Cytologic evaluation of primary and secondary myelodysplastic syndromes in the dog. Veterinary Clinical Pathology. 2001;30(2):67-75.",
      url: "https://doi.org/10.1111/j.1939-165X.2001.tb00261.x",
      evidenceLevel: "Estudo citomorfológico comparativo de medula (n=267)"
    },
    {
      id: "ref-weiss-smith-2000",
      citationText: "Weiss DJ, Smith SA. Primary myelodysplastic syndromes of dogs: a report of 12 cases. Journal of Veterinary Internal Medicine. 2000;14(5):491-494.",
      url: "https://doi.org/10.1111/j.1939-1676.2000.tb02264.x",
      evidenceLevel: "Série de casos clínicos (n=12)"
    },
    {
      id: "ref-hisasue-2001",
      citationText: "Hisasue M, Nagashima N, Nishigaki K, Fukasawa M, Kano R, Watari T, et al. Hematologic abnormalities and outcome of 16 cats with myelodysplastic syndromes. Journal of Veterinary Internal Medicine. 2001;15(5):471-477.",
      url: "https://doi.org/10.1111/j.1939-1676.2001.tb00261.x",
      evidenceLevel: "Estudo retrospectivo felino (n=16)"
    },
    {
      id: "ref-weiss-2006",
      citationText: "Weiss DJ. Evaluation of dysmyelopoiesis in cats: 34 cases (1996-2005). Journal of the American Veterinary Medical Association. 2006;228(6):893-897.",
      url: "https://doi.org/10.2460/javma.228.6.893",
      evidenceLevel: "Série retrospectiva felina (n=34)"
    },
    {
      id: "ref-jain-1991",
      citationText: "Jain NC, Blue JT, Grindem CB, Harvey JW, Kociba GJ, Krehbiel JD, et al. Proposed criteria for classification of acute myeloid leukemia in dogs and cats. Veterinary Clinical Pathology. 1991;20(3):63-82.",
      url: "https://doi.org/10.1111/j.1939-165X.1991.tb00571.x",
      evidenceLevel: "Diretriz histórica consensual FAB veterinária"
    },
    {
      id: "ref-cha-2026",
      citationText: "Cha S, Kim H, Choi J, Lee K. Myelodysplastic/Myeloproliferative Neoplasm in a Dog: A Case Report. Veterinary Medicine and Science. 2026;12(1):e70722.",
      url: "https://doi.org/10.1002/vms3.70722",
      evidenceLevel: "Relato de caso de neoplasia sobreposta MDS/MPN"
    },
    {
      id: "ref-withrow-6th",
      citationText: "Vail DM, Thamm DH, Liptak JM. Withrow & MacEwen's Small Animal Clinical Oncology. 6th ed. St. Louis: Elsevier; 2020. Cap. 33 (Canine AML, MPN and Myelodysplasia), p. 731-739.",
      evidenceLevel: "Tratado de oncologia clínica veterinária de referência"
    },
    {
      id: "ref-nelson-couto-6th",
      citationText: "Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020. Cap. 86 (Combined Cytopenias and Leukoerythroblastosis), p. 1384-1386; Cap. 80 (Leukemias), p. 1312-1313.",
      evidenceLevel: "Tratado de medicina interna veterinária de referência"
    },
    {
      id: "ref-feline-ecc-2nd",
      citationText: "Drobatz KJ, Beal MW, Syring RS. Feline Emergency and Critical Care Medicine. 2nd ed. Hoboken: Wiley Blackwell; 2023. Cap. 29 (Hematologic Emergencies: Anemia), p. 347-348.",
      evidenceLevel: "Tratado de emergência e terapia intensiva felina"
    },
    {
      id: "ref-plumb-10th",
      citationText: "Plumb DC. Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023. Monografias: Doxorrubicina, Citarabina, Ampicilina-sulbactam, Prednisolona, Filgrastim.",
      evidenceLevel: "Guia de farmacologia veterinária e posologia clínica"
    }
  ]
};
