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
    whatIsIt:
      'Entendendo a Síndrome Mielodisplásica (MDS):\n' +
      '- O que acontece no organismo do animal:\n' +
      '  - Doença rara da medula óssea (o tecido interno dos ossos que fabrica o sangue) na qual as células-tronco sofrem mutações e produzem células defeituosas.\n' +
      '- O paradoxo de medula cheia com sangue vazio:\n' +
      '  - A medula trabalha intensamente, mas como as células nascem anormais, morrem precocemente lá dentro antes de alcançar a circulação sanguínea.\n' +
      '- Consequências clínicas imediatas:\n' +
      '  - O animal desenvolve anemia profunda e persistente, carência de glóbulos brancos para defesa contra infecções e poucas plaquetas para estancar sangramentos.\n' +
      '- Particularidade na espécie felina:\n' +
      '  - Em gatos, a enfermidade possui importante ligação histórica com a infecção pelo vírus da leucemia felina (FeLV).',
    keyPoints: [
      "Medula cheia e sangue vazio: a medula opera em alta velocidade, mas quase todas as células morrem lá dentro por defeitos de fabricação.",
      "Anemia persistente: o animal fica apático, cansa rápido e suas gengivas tornam-se muito pálidas ou esbranquiçadas.",
      "Risco grave de infecções: a falta de glóbulos brancos de defesa (neutropenia) permite que bactérias comuns causem febre alta e infecções generalizadas.",
      "Sangramentos espontâneos: a falta ou mau funcionamento das plaquetas pode causar pontinhos vermelhos na pele ou gengiva (petéquias), hematomas e sangramento nasal.",
      "Diferenciação com outras doenças: nem toda alteração medular é câncer; inflamações graves, remédios e vírus podem imitar essa doença de forma temporária.",
      "Tratamento de suporte contínuo: não existe cura simples; o tratamento envolve transfusões de sangue planejadas, antibióticos para febre e acompanhamento rigoroso com especialista em oncologia e hematologia."
    ]
  },
  quickSummary:
    'Síntese clínica da síndrome mielodisplásica em pequenos animais:\n' +
    '- Definição e fisiopatologia central:\n' +
    '  - Neoplasia clonal de células-tronco hematopoéticas (HSC) caracterizada por hematopoiese ineficaz, apoptose intramedular acelerada e citopenias periféricas persistentes.\n' +
    '  - Paradoxo de medula cheia com sangue vazio: medula hipercelular contrastando com anemia não regenerativa profunda (frequentemente macrocítica com RDW elevado), neutropenia absoluta e trombocitopenia.\n' +
    '- Diagnóstico diferencial crítico:\n' +
    '  - Diferenciação entre MDS clonal primária e dismielopoiese secundária reativa (desencadeada por sepse, imunomediadas como IMHA/PIMA, fármacos mielotóxicos e FeLV em gatos), indistinguíveis apenas pela citomorfologia (Weiss & Aird, 2001).\n' +
    '- Fronteira taxonômica e estudo de Meredith et al. (2025):\n' +
    '  - O limiar de aproximadamente 20% de blastos medulares separa operacionalmente a MDS (<20%) da leucemia mieloide aguda (AML, >=20%; Withrow & MacEwen, 2020).\n' +
    '  - Cães com MDS apresentam evolução significativamente mais indolente do que na AML (sobrevida mediana de 384 dias versus 6 dias, P < 0,001; Meredith et al., 2025).\n' +
    '- Manejo clínico e suporte:\n' +
    '  - Exclusão de causas secundárias, suporte transfusional com concentrado de hemácias guiado por hipóxia tecidual, antibioticoterapia agressiva na neutropenia febril e quimioterapia citotóxica especializada (doxorrubicina combinada a citarabina contínua em cães, ou azacitidina em gatos) em centros oncológicos.',
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
    lead:
      'Fisiopatologia e desafio diagnóstico da síndrome mielodisplásica:\n' +
      '- Paradoxo de hematopoiese ineficaz:\n' +
      '  - A fábrica medular opera em capacidade máxima devido à expansão clonal desregulada, mas os precursores sofrem apoptose acelerada intramedular.\n' +
      '  - Resulta em bicitopenia ou pancitopenia profunda na circulação sistêmica.\n' +
      '- Diferenciação etiológica mandatória:\n' +
      '  - Distinguir a neoplasia primária da dismielopoiese secundária reativa, potencialmente reversível após remoção de toxinas, fármacos ou gatilhos imunomediados e infecciosos.',
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
        body:
          'Mecanismo de apoptose intramedular e estímulo ineficaz:\n' +
          '- Mutação clonal precoce:\n' +
          '  - Mutação clonal adquirida precocemente na célula-tronco hematopoética (CD34+) induz diferenciação anômala e morte celular programada nos cordões medulares.\n' +
          '- Reticulocitopenia refratária:\n' +
          '  - O estímulo fisiológico de eritropoietina (EPO) intensifica a hiperplasia eritroide medular, mas a reticulocitose periférica permanece gravemente inadequada.',
        highlights: [
          "mutação clonal adquirida",
          "célula-tronco hematopoética (CD34+)",
          "reticulocitose periférica permanece inadequada"
        ]
      },
      {
        title: "Dismielopoiese secundária vs MDS",
        body:
          'Diferenciação morfológica entre processo clonal e reativo:\n' +
          '- Limitação da citologia isolada:\n' +
          '  - A morfologia microscópica isolada não distingue a MDS clonal de alterações reativas (Weiss & Aird, 2001).\n' +
          '- Gatilhos secundários frequentes:\n' +
          '  - Inflamações severas, doenças imunomediadas (PIMA/IMHA), fármacos mielotóxicos e FeLV simulam perfeitamente a displasia citológica medular, exigindo exclusão exaustiva.',
        highlights: [
          "Weiss & Aird, 2001",
          "PIMA/IMHA",
          "fármacos mielotóxicos",
          "FeLV"
        ]
      },
      {
        title: "Fronteira prática de 20% de blasts",
        body:
          'Classificação taxonômica e impacto prognóstico:\n' +
          '- Limiar de 20% de blastos medulares:\n' +
          '  - Ponto de corte operacional de aproximadamente 20% de blasts na medula óssea adotado para separar a MDS (<20%) da leucemia mieloide aguda (AML, >=20%).\n' +
          '- Evidência de Meredith et al. (2025):\n' +
          '  - Essa distinção refletiu diferença brutal de sobrevida: 384 dias na MDS versus 6 dias na AML.',
        highlights: [
          "ponto de corte operacional de 20%",
          "MDS (<20%)",
          "AML (>=20%)",
          "384 dias versus 6 dias"
        ]
      },
      {
        title: "Suporte clínico e quimioterapia seletiva",
        body:
          'Manejo clínico escalonado e suporte hemoterápico:\n' +
          '- Ausência de diretriz curativa:\n' +
          '  - Não há diretriz curativa padronizada; o tratamento assenta-se em suporte transfusional para hipóxia anêmica e antibioticoterapia rápida na neutropenia febril.\n' +
          '- Terapias citorredutoras:\n' +
          '  - Indicação de quimioterapia citorredutora (doxorrubicina com citarabina ou azacitidina) em animais com excesso de blasts (MDS-EB).',
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
          detail:
            'Triagem hematológica inicial e esfregaço:\n' +
            '- Hemograma automatizado e reticulócitos:\n' +
            '  - Mensuração com contagem absoluta de reticulócitos para caracterizar anemia não regenerativa.\n' +
            '- Exame microscópico minucioso:\n' +
            '  - Investigar macrocitose não regenerativa, anisocitose proeminente (RDW elevado), metarrubrícitos circulantes e formas bizarras em leucócitos.\n' +
            '- Peculiaridade felina:\n' +
            '  - Em felinos, afastar pseudotrombocitopenia por agregados plaquetários na cauda da lâmina.',
          limitations: "Contadores hematológicos automáticos não detectam displasias citológicas nem diferenciam agregados plaquetários felinos de trombocitopenia real."
        },
        {
          label: "2. Avaliação de linhagens e exclusão de causas periféricas",
          timing: "Primeiras 12 a 24 horas",
          detail:
            'Avaliação de linhagens e exclusão de consumo periférico:\n' +
            '- Mapeamento de citopenias:\n' +
            '  - Determinar o envolvimento de uma, duas (bicitopenia) ou três linhagens (pancitopenia).\n' +
            '- Exclusão de perda, sequestro ou lise periférica:\n' +
            '  - Descartar hemorragias ocultas e hemólise extravascular ou intravascular (teste de Coombs, aglutinação em salina).\n' +
            '- Avaliação hemostática e imune:\n' +
            '  - Rastrear coagulação intravascular disseminada (PT, aPTT, fibrinogênio, D-dímero) e destruição imune periférica de plaquetas.',
          limitations: "Processos imunomediados podem coexistir com displasia medular reativa, exigindo acompanhamento longitudinal."
        },
        {
          label: "3. Rastreio clínico de causas secundárias e FeLV",
          timing: "Antes de qualquer procedimento medular invasivo",
          detail:
            'Rastreio de etiologias secundárias e retroviroses:\n' +
            '- Revisão farmacológica exaustiva:\n' +
            '  - Investigar exposição a estrógenos, quimioterápicos, cloranfenicol, griseofulvina, fenobarbital e sulfonamidas.\n' +
            '- Rastreio inflamatório e tumoral:\n' +
            '  - Investigar sepse, inflamação sistêmica e neoplasias ocultas por ultrassonografia abdominal e radiografia torácica.\n' +
            '- Triagem retroviral felina:\n' +
            '  - Em gatos, testagem sorológica (antígeno p27) e molecular (PCR proviral) para FeLV e FIV é obrigatória.',
          limitations: "Testes sorológicos rápidos de FeLV falso-negativos em infecção latente ou focal medular exigem confirmação por PCR."
        },
        {
          label: "4. Aspirado citológico associado a core biopsy de medula óssea",
          timing: "Procedimento confirmatório indispensável",
          detail:
            'Amostragem medular combinada (aspirado + biópsia):\n' +
            '- Aspirado citológico (agulha de Illinois ou Rosenthal):\n' +
            '  - Na fossa trocantérica femoral, crista ilíaca ou tuberosidade maior do úmero para avaliar morfologia individual de precursores.\n' +
            '- Core biopsy óssea (agulha de Jamshidi):\n' +
            '  - Determina celularidade real, arquitetura espacial M:E e diagnostica mielofibrose (causa frequente de punção seca) ou aplasia medular.',
          limitations: "Punções secas (dry tap) ocorrem em até 30% dos cães com MDS devido à mielofibrose secundária reticulínica, tornando a biópsia histológica mandatória."
        },
        {
          label: "5. Quantificação rigorosa de blasts e classificação clínica",
          timing: "Interpretação pelo patologista clínico",
          detail:
            'Quantificação de blastos e subtipos clínicos:\n' +
            '- Contagem diferencial estrita:\n' +
            '  - Contagem diferencial em pelo menos 300 a 500 células nucleadas medulares.\n' +
            '- Classificação clínica:\n' +
            '  - Classificar em MDS-RC (<5% blasts, citopenia refratária), MDS-RCMD (<5% blasts com displasia em múltiplas linhagens), MDS-EB (5% a 19% blasts, excesso de blasts com alto risco de progressão) ou MDS-Er (predomínio eritroide, M:E < 1).\n' +
            '- Limiar leucêmico:\n' +
            '  - Proporção >= 20% caracteriza Leucemia Mieloide Aguda (AML).',
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
          detail:
            'Suporte transfusional emergencial:\n' +
            '- Gatilhos clínicos:\n' +
            '  - Infusão de concentrado de hemácias (10 a 15 mL/kg IV) ou sangue total quando houver taquicardia em repouso, fraqueza severa, prostração intensa ou lactato sérico > 2,5 mmol/L.\n' +
            '- Testes de compatibilidade:\n' +
            '  - Tipagem sanguínea mandatória (DEA 1 em cães; sistema AB em gatos) e teste de compatibilidade cruzada (crossmatch) se transfusão prévia há mais de 4 dias.',
          dose: "Concentrado de hemácias: 10–15 mL/kg IV em 2–4 horas; velocidade inicial lenta em 15–30 min.",
          reassess: "Aferir hematócrito pós-transfusional 1 a 2 horas após a conclusão da infusão."
        },
        {
          label: "2. Abordagem agressiva da neutropenia febril",
          timing: "Se neutrófilos < 1.000/mcL com febre >= 39,3 °C",
          detail:
            'Manejo da neutropenia febril crítica:\n' +
            '- Coletas prévias estéreis:\n' +
            '  - Coleta prévia de hemocultura e urocultura por punção estéril.\n' +
            '- Cobertura antimicrobiana parenteral:\n' +
            '  - Início imediato de antibioticoterapia parenteral bactericida de amplo espectro com cobertura para gram-positivos, gram-negativos e anaeróbios para prevenir choque séptico por translocação da flora comensal.',
          dose: "Ampicilina-sulbactam (30–50 mg/kg IV q8h) associada a Enrofloxacino (5–10 mg/kg IV q24h em cães) ou Marbofloxacino (2 mg/kg IV q24h em gatos)."
        },
        {
          label: "3. Eliminação de gatilhos de dismielopoiese secundária",
          timing: "Primeiras 24 a 48 horas",
          detail:
            'Remoção de causas secundárias e prova terapêutica:\n' +
            '- Suspensão de fármacos:\n' +
            '  - Suspensão imediata de fármacos potencialmente mielotóxicos.\n' +
            '- Suplementação vitamínica:\n' +
            '  - Suplementação parenteral de cobalamina (vitamina B12 500 a 1.000 mcg SC semanal) e ácido fólico se houver suspeita de enteropatia ou má absorção.\n' +
            '- Prova imunossupressora:\n' +
            '  - Se houver suspeita de destruição imunomediada concorrente (PIMA/ITP), instituir prova terapêutica imunossupressora.',
          dose: "Prednisolona: 1 a 2 mg/kg/dia VO sob vigilância estrita da contagem neutrofílica."
        },
        {
          label: "4. Terapia antineoplásica especializada para MDS-EB",
          timing: "Casos com excesso de blasts ou citopenias refratárias",
          detail:
            'Terapia antineoplásica especializada (MDS-EB):\n' +
            '- Protocolo em cães (Matsuyama et al., 2023):\n' +
            '  - Discussão com especialista em oncologia veterinária sobre quimioterapia citotóxica ou agentes hipometilantes; protocolo de doxorrubicina combinada a citarabina contínua.\n' +
            '- Protocolo em gatos (Hisasue et al., 2022):\n' +
            '  - 5-azacitidina em felinos com excesso de blastos em ciclos mensais sob supervisão especializada.',
          dose: "Cães: Doxorrubicina 30 mg/m² IV em 20 min seguida de Citarabina 300 mg/m² IV CRI em 6 horas. Gatos: Azacitidina 35–70 mg/m² SC por 3–5 dias em ciclos mensais."
        }
      ]
    }
  },
  etiology: {
    definicaoNaturezaClonal:
      'Definição e natureza clonal da síndrome mielodisplásica primária:\n' +
      '- Origem clonal na célula-tronco hematopoética:\n' +
      '  - Desordem hematopoética clonal originada a partir de mutações somáticas e aberrações epigenéticas na célula-tronco multipotente (CD34+) ou em progenitores mieloides iniciais.\n' +
      '- Vantagem proliferativa e apoptose intramedular acelerada:\n' +
      '  - A linhagem celular mutada adquire vantagem proliferativa e de sobrevivência sobre a hematopoiese normal policlonal, ocupando progressivamente o parênquima medular.\n' +
      '  - Entretanto, os precursores neoplásicos exibem maturação disfuncional intrínseca e ativação excessiva de vias pró-apoptóticas mitocondriais e de receptores de morte (Fas/FasL, caspases).\n' +
      '  - Sofrem lise programada antes de atingir os sinusoides vasculares (hematopoiese ineficaz).\n' +
      '- Enquadramento nosológico internacional:\n' +
      '  - A enfermidade integra formalmente o espectro das neoplasias mieloides da Organização Mundial da Saúde adaptadas à medicina veterinária (Withrow & MacEwen, 6ª ed.).',
    dismielopoieseSecundariaReativa:
      'Dismielopoiese secundária reativa: a principal armadilha diagnóstica:\n' +
      '- Indistinguibilidade citomorfológica isolada (Weiss & Aird, 2001):\n' +
      '  - Em 267 exames medulares caninos, 34 cães apresentavam >10% de displasia citológica em pelo menos uma linhagem: apenas 13 correspondiam a MDS primária clonal verdadeira, enquanto 21 correspondiam a dismielopoiese secundária reativa.\n' +
      '  - A citomorfologia isolada é incapaz de diferenciar MDS clonal de alterações secundárias reativas.\n' +
      '- Causas secundárias fundamentais a descartar:\n' +
      '  - 1. Doenças imunomediadas (IMHA e PIMA): estímulo eritropoético compensatório desorganizado gerando precursores bizarros.\n' +
      '  - 2. Fármacos mielotóxicos: estrógenos exógenos ou endógenos (hiperestrogenismo por tumor testicular de células de Sertoli), cloranfenicol, agentes alquilantes, griseofulvina, fenobarbital e sulfonamidas.\n' +
      '  - 3. Toxinas ambientais e compostos químicos industriais.\n' +
      '  - 4. Sepse grave e choque endotóxico com consumo periférico e estresse medular.\n' +
      '  - 5. Deficiências de cobalamina (vitamina B12) ou folato: síntese defeituosa de timidina no DNA com alterações megaloblásticas.\n' +
      '  - 6. Invasão neoplásica não mieloide: mieloftise por linfoma, mieloma múltiplo ou carcinomas metastáticos.',
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
    etiologiaFelinaFeLV:
      'Etiologia felina e o papel do vírus da leucemia viral felina (FeLV):\n' +
      '- Patogênese retroviral medular:\n' +
      '  - O FeLV infecta diretamente os progenitores hematopoéticos medulares e o estroma fibroblástico.\n' +
      '  - A integração proviral e a expressão de proteínas virais interferem na sinalização de ciclinas e fatores de transcrição, desencadeando apoptose prematura e maturação desordenada.\n' +
      '- Evidência histórica de forte ligação:\n' +
      '  - Série de Hisasue et al. (2001): 15 de 16 gatos com MDS (93,8%) eram positivos para FeLV.\n' +
      '  - Nelson & Couto (6ª ed.): mais de 80% dos gatos em estudos clássicos apresentavam virêmia ativa.\n' +
      '- ARMADILHA DIAGNÓSTICA NO PACIENTE FELINO:\n' +
      '  - O FeLV também provoca afecções medulares não neoplásicas (aplasia pura de série vermelha e mielossupressão reativa).\n' +
      '  - A presença do retrovírus associada à displasia não fecha automaticamente o diagnóstico de MDS clonal sem acompanhamento longitudinal.',
    classificacaoPraticaVeterinaria:
      'Classificação prática da síndrome mielodisplásica em pequenos animais:\n' +
      '- Consensos FAB e adaptações veterinárias (Jain et al., 1991; Withrow & MacEwen, 2020; Weiss, 2006):\n' +
      '- 1. MDS-RC (Citopenia Refratária):\n' +
      '  - Citopenia em uma linhagem (anemia não regenerativa), menos de 5% de blastos medulares e curso clínico indolente.\n' +
      '- 2. MDS-RCMD (Citopenia Refratária com Displasia Multilinear):\n' +
      '  - Menos de 5% de blastos medulares com displasia acentuada em duas ou três linhagens hematopoéticas e citopenias múltiplas.\n' +
      '- 3. MDS-EB (MDS com Excesso de Blasts):\n' +
      '  - Proporção de blastos medulares entre 5% e 19%, caracterizando a forma biologicamente mais avançada, com sobrevida curta e elevado risco de transformação para leucemia mieloide aguda.\n' +
      '- 4. MDS-Er (MDS com Predomínio Eritroide):\n' +
      '  - Hiperplasia eritroide maciça displásica e relação mieloide:eritroide (M:E) inferior a 1,0.',
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
    populacaoCanina:
      'Epidemiologia e demografia na espécie canina:\n' +
      '- Enfermidade incomum a rara:\n' +
      '  - Neoplasias mieloides como um grupo ocorrem cerca de 10 vezes menos frequentemente do que neoplasias linfoproliferativas (linfomas e leucemias linfoides; Withrow & MacEwen, 6ª ed.).\n' +
      '- Faixa etária e distribuição:\n' +
      '  - Acomete cães adultos a idosos.\n' +
      '  - Estudo de Meredith et al. (2025) com 42 cães: idade média de 7,8 anos (amplitude de 3,4 a 15 anos).\n' +
      '- Distribuição sexual e racial:\n' +
      '  - Nenhuma predisposição sexual entre machos e fêmeas foi detectada, acometendo cães de raças puras e sem raça definida em proporções similares.',
    investigacaoRacialDachshund:
      'Investigação genômica na raça Dachshund miniatura:\n' +
      '- Concentração de casos em linhagens japonesas:\n' +
      '  - Pesquisadores japoneses descreveram aparente concentração de casos de síndrome mielodisplásica e disfunções hematopoéticas clonais em Dachshund miniatura.\n' +
      '- Variantes genômicas preliminares:\n' +
      '  - Mutações em genes reguladores de ciclo celular e reparo de DNA (UMODL1 e XRCC5).\n' +
      '- Nível de evidência atual (🔴 muito fraco):\n' +
      '  - As evidências disponíveis permanecem muito fracas, não autorizando considerar a afecção uma doença hereditária simples nem justificando testes comerciais para aconselhamento reprodutivo.',
    epidemiologiaFelinaContextoAtual:
      'Transição epidemiológica contemporânea na espécie felina:\n' +
      '- Mudança de perfil com controle do FeLV:\n' +
      '  - Nas décadas passadas, a maioria dos gatos acometidos era jovem a adulto de meia-idade e virêmico para FeLV.\n' +
      '- Cenário atual com triagem e vacinação ampla:\n' +
      '  - População crescente de gatos idosos, FeLV-negativos, desenvolvendo quadros esporádicos de MDS espontânea.\n' +
      '  - Aproximação do perfil epidemiológico felino contemporâneo daquele observado em cães e seres humanos.'
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
    transmissao:
      'Vias de transmissão e caráter nosológico:\n' +
      '- Neoplasia clonal não contagiosa:\n' +
      '  - A síndrome mielodisplásica primária é uma neoplasia somática clonal adquirida, não sendo transmissível por contato direto, fômites ou vias reprodutivas.\n' +
      '- Transmissão do FeLV como gatilho nos felinos:\n' +
      '  - Na espécie felina, a infecção retroviral pelo vírus FeLV é transmissível horizontalmente através de saliva, mordeduras, lambedura mútua e comedouros/bebedouros compartilhados, bem como verticalmente por via transplacentária e lactação.\n' +
      '  - A infecção pelo FeLV atua como gatilho indutor de instabilidade genômica e displasia na medula óssea do gato infectado.'
  },
  pathophysiology: {
    anemiaNaoRegenerativaEMacrocitose:
      'Fisiopatologia da anemia não regenerativa e macrocitose:\n' +
      '- Prevalência e marca hematológica definidora:\n' +
      '  - A anemia é o achado mais constante, documentada em 95% dos cães e na totalidade dos gatos afetados (Meredith et al., 2025; Hisasue et al., 2001).\n' +
      '  - Caracteriza-se por ser arregenerativa (reticulocitopenia severamente desproporcional à hipóxia tecidual).\n' +
      '- Macrocitose não regenerativa e dissincronia núcleo-citoplasma:\n' +
      '  - Enquanto a macrocitose fisiológica decorre do influxo de reticulócitos jovens de grande calibre, a macrocitose na MDS decorre de desregulação maturativa intrínseca.\n' +
      '  - Perda de sincronia entre a síntese de hemoglobina citoplasmática e a divisão cromatínica nuclear, originando precursores megaloblastoides que sofrem mitoses anômalas ou abortadas.\n' +
      '- Anormalidades periféricas adicionais:\n' +
      '  - RDW marcadamente elevado (anisocitose extrema por populações eritroides de tamanhos dispares).\n' +
      '  - Metarrubricitose inapropriada (liberação na circulação de hemácias nucleadas precoces sem policromasia acompanhante).',
    figuraEsfregacoDisplasia: {
      kind: "clinicalFigure",
      src: "/consulta-vet/sindrome-mielodisplasica/esfregaco-displasia-meredith2025.jpg",
      alt: "Esfregaço sanguíneo e aspirado medular demonstrando displasia celular em cão com MDS (Meredith et al., 2025)",
      caption:
        'Figura 1 — Displasia morfológica em cão com Síndrome Mielodisplásica (Meredith et al., 2025, CC BY 4.0):\n' +
        '- (a) Sangue periférico: neutrófilos displásicos com lobulação nuclear irregular e eritrócitos gigantes macrocíticos.\n' +
        '- (b) Aspirado medular: hipercelularidade e diseritropoiese com precursores megaloblastoides.',
      display: "wide"
    },
    disgranulopoieseERiscoDeSepse:
      'Disgranulopoiese clonal e colapso da barreira imunológica inata:\n' +
      '- Arresto maturativo e neutropenia quantitativa:\n' +
      '  - O comprometimento clonal da linhagem mielocítica resulta em arresto maturativo em estágios intermediários (promielócitos, mielócitos e metamielócitos) com apoptose intramedular.\n' +
      '  - Resulta em neutropenia absoluta progressiva e incapacidade de resposta leucocitária compensatória.\n' +
      '- Disfunção fagocítica qualitativa adquirida:\n' +
      '  - Os neutrófilos residuais que atingem a circulação exibem defeitos graves na quimiotaxia, adesão endotelial, diapedese e atividade do sistema mieloperoxidase (MPO).\n' +
      '- Risco crítico de sepse e choque distributivo:\n' +
      '  - A perda da integridade fagocítica primária predispõe a bacteremias espontâneas a partir da microbiota comensal do trato digestivo e respiratório.\n' +
      '  - Risco iminente de evolução catastrófica para choque séptico distributivo em poucas horas.',
    dismegacariopoieseEHemorragia:
      'Dismegacariopoiese e hemostasia primária defeituosa:\n' +
      '- Atipias morfológicas centrais na medula óssea:\n' +
      '  - Presença de micromegacariócitos mononucleados anômalos (formas anãs) e megacariócitos gigantes hipolobulados com dissociação de maturação núcleo-citoplasma.\n' +
      '- Trombocitopatia funcional associada à trombocitopenia:\n' +
      '  - Plaquetas periféricas gigantes (macroplaquetas com VPM elevado) e hipogranulares.\n' +
      '  - Disfunção dos receptores de membrana de hemostasia primária (glicoproteínas GPIIb/IIIa e GPIb-IX-V), prejudicando adesão e agregação plaquetária.\n' +
      '- Diátese hemorrágica desproporcional à contagem:\n' +
      '  - Devido à disfunção qualitativa adquirida, sangramentos espontâneos graves (petéquias, equimoses, epistaxe e melena) ocorrem mesmo em contagens plaquetárias moderadas (ex.: 40.000 a 60.000/mcL).',
    figuraMedulaBiopsiaReticulina: {
      kind: "clinicalFigure",
      src: "/consulta-vet/sindrome-mielodisplasica/medula-biopsia-reticulina-meredith2025.jpg",
      alt: "Biópsia de medula óssea com coloração de reticulina e micromegacariócitos na MDS canina (Meredith et al., 2025)",
      caption:
        'Figura 2 — Histopatologia e citologia medular na MDS (Meredith et al., 2025, CC BY 4.0):\n' +
        '- (a) Aspirado medular: micromegacariócitos hipolobulados anormais característicos de dismegacariopoiese.\n' +
        '- (b) Core biopsy (reticulina de Gomori): rede fibrótica reticulínica acentuada (mielofibrose secundária), explicando a alta frequência de punção seca.',
      display: "wide"
    },
    fronteiraTaxonomicaMdsVsAml:
      'Fronteira taxonômica e limiar de blastos entre MDS e AML:\n' +
      '- Evolução dos critérios de classificação diagnóstica:\n' +
      '  - Critério histórico FAB (Jain et al., 1991): estabelecia o patamar de 30% de blastos medulares para definir leucemia mieloide aguda (AML).\n' +
      '  - Consenso veterinário contemporâneo (Withrow & MacEwen, 2020; Meredith et al., 2025): adotou aproximadamente 20% de blastos como limite prático divisor.\n' +
      '- Estratificação diagnóstica baseada na blastemia medular:\n' +
      '  - Menos de 20% de blastos: classificado como síndrome mielodisplásica (MDS), dividida em baixo blasto (<5%) e excesso de blastos (MDS-EB, 5% a 19%).\n' +
      '  - 20% ou mais de blastos: diagnóstico definitivo de leucemia mieloide aguda (AML).\n' +
      '- Impacto prognóstico decisivo na sobrevida (Meredith et al., 2025):\n' +
      '  - Em coorte padronizada de 70 cães, a sobrevida mediana foi de 384 dias na MDS contra apenas 6 dias na AML (P < 0,001), validando a relevância biológica do limiar.',
    figuraSobrevidaMdsVsAml: {
      kind: "clinicalFigure",
      src: "/consulta-vet/sindrome-mielodisplasica/curva-sobrevida-mds-vs-aml-meredith2025.jpg",
      alt: "Curvas de sobrevida de Kaplan-Meier comparando MDS vs AML em 70 cães (Meredith et al., 2025)",
      caption:
        'Figura 3 — Curvas de sobrevida global de Kaplan-Meier em 70 cães com neoplasias mieloides (Meredith et al., 2025, CC BY 4.0):\n' +
        '- Síndrome mielodisplásica (MDS; n = 42, linha pontilhada): sobrevida mediana de 384 dias.\n' +
        '- Leucemia mieloide aguda (AML; n = 28, linha contínua): sobrevida mediana de 6 dias (P < 0,001).',
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
      description:
        'Execução técnica e triagem hematológica:\n' +
        '- Coleta em tubo EDTA:\n' +
        '  - Hemograma automatizado com contagem absoluta de reticulócitos para avaliação quantitativa da regeneração eritroide.\n' +
        '- Esfregaço sanguíneo imediato:\n' +
        '  - Confecção e coloração rápida por panótico ou Wright-Giemsa para revisão microscópica em objetiva de imersão (100x).\n' +
        '- Particularidade felina:\n' +
        '  - Inspeção minuciosa das bordas e cauda do esfregaço para pesquisar agregados plaquetários e afastar pseudotrombocitopenia mecânica.',
      interpretation:
        'Interpretação e padrões citológicos característicos:\n' +
        '- Anemia e índices eritrocitários:\n' +
        '  - Anemia não regenerativa grave em 95% dos cães (hematócrito mediano de 21%; Meredith et al., 2025) e em 100% dos gatos (Hisasue et al., 2001).\n' +
        '  - Macrocitose não regenerativa (VCM elevado) e anisocitose marcante (RDW elevado).\n' +
        '- Citopenias e atipias morfológicas:\n' +
        '  - Bicitopenia ou pancitopenia periférica.\n' +
        '  - No esfregaço: metamielócitos gigantes, hipossegmentação neutrofílica (pseudo-Pelger-Huët) e macroplaquetas hipogranulares.\n' +
        '- Blastemia periférica:\n' +
        '  - Ausência de blastos circulantes em 76% dos cães com MDS.',
      limitations: "A ausência de blastos circulantes NÃO descarta MDS nem AML. Contadores automáticos subestimam plaquetas felinas por agregação mecânica.",
      isGoldStandard: false
    },
    {
      stepNumber: 2,
      title: "Exclusão de causas periféricas de citopenia e coagulograma",
      purpose: "Diferenciação entre consumo/destruição periférica e insuficiência medular central.",
      description:
        'Triagem de hemólise, consumo periférico e hemostasia:\n' +
        '- Pesquisa imunomediada e integridade eritrocitária:\n' +
        '  - Pesquisa de autoaglutinação em salina e teste de Coombs direto para descartar IMHA; avaliação de esquizócitos no esfregaço.\n' +
        '- Avaliação da hemostasia secundária plasmática:\n' +
        '  - Coagulograma completo com tempo de protrombina (PT), tempo de tromboplastina parcial ativada (aPTT), fibrinogênio e D-dímero.',
      interpretation:
        'Interpretação hemostática e diagnósticos de exclusão:\n' +
        '- Painel de coagulação plasmática:\n' +
        '  - PT e aPTT tipicamente normais na MDS não complicada (a hemostasia secundária plasmática permanece preservada, a menos que ocorra sepse e CID secundária).\n' +
        '- Painel imunológico:\n' +
        '  - Teste de Coombs negativo na forma primária; positividade aponta para dismielopoiese secundária a afecções imunomediadas.',
      limitations: "Testes de coagulação plasmática normais não protegem o paciente contra hemorragias graves decorrentes de trombocitopenia e trombocitopatia primária.",
      isGoldStandard: false
    },
    {
      stepNumber: 3,
      title: "Rastreio de causas secundárias e sorologia/PCR FeLV e FIV em gatos",
      purpose: "Identificação de dismielopoiese secundária reversível e rastreio da principal associação etiológica felina.",
      description:
        'Triagem de gatilhos farmacológicos, metabólicos e retrovirais:\n' +
        '- Levantamento farmacológico exaustivo:\n' +
        '  - Investigar exposição a estrógenos, quimioterápicos, cloranfenicol, griseofulvina, fenobarbital e sulfonamidas.\n' +
        '- Perfil bioquímico sérico:\n' +
        '  - Mensuração de ureia, creatinina, ALT, fosfatase alcalina e albumina para investigar falência renal ou hepática secundária.\n' +
        '- Triagem retroviral felina:\n' +
        '  - Em felinos, teste imunocromatográfico/ELISA para antígeno p27 do FeLV e anticorpos FIV, seguido de PCR proviral para FeLV em sangue total.',
      interpretation:
        'Padrão laboratorial e correlação etiológica:\n' +
        '- Função renal e hepática:\n' +
        '  - Exames bioquímicos encontram-se frequentemente preservados na fase inicial da MDS; alterações refletem complicações orgânicas ou hepatopatias/nefropatias causadoras de anemia crônica.\n' +
        '- Retrovírus felino:\n' +
        '  - Positividade para FeLV presente na maioria das séries históricas felinas (Hisasue et al., 2001; Nelson & Couto, 6ª ed.).',
      limitations: "O gato FeLV-positivo com displasia medular não é automaticamente portador de clone neoplásico irreversível; pode tratar-se de dismielopoiese viral reversível ou aplasia pura.",
      isGoldStandard: false
    },
    {
      stepNumber: 4,
      title: "Aspirado citológico de medula óssea (Morfologia e blasts)",
      purpose: "Avaliação detalhada da morfologia celular de precursores hematopoéticos e contagem diferencial de blastos.",
      description:
        'Procedimento de amostragem e processamento citológico:\n' +
        '- Punção aspirativa medular:\n' +
        '  - Realizada sob sedação profunda e anestesia local, com agulha de Illinois ou Rosenthal na fossa trocantérica femoral ou tuberosidade maior do úmero.\n' +
        '- Confecção das lâminas:\n' +
        '  - Obtenção de espículas medulares íntegras e confecção por esmagamento suave (squash) para evitar lise celular.\n' +
        '- Coloração e diferencial:\n' +
        '  - Coloração por Giemsa ou Leishman com contagem diferencial estrita de 300 a 500 células nucleadas.',
      interpretation:
        'Achados citológicos medulares definidores:\n' +
        '- Celularidade global:\n' +
        '  - Celularidade normo a hipercelular com partículas ricas em precursores.\n' +
        '- Displasia citológica (>10% em linhagens):\n' +
        '  - Diseritropoiese (eritroblastos megaloblastoides, núcleos bizarros, pontes intercromáticas).\n' +
        '  - Disgranulopoiese (metamielócitos gigantes, segmentação irregular e assincronia maturativa).\n' +
        '  - Dismegacariopoiese (micromegacariócitos mononucleados anômalos).\n' +
        '- Quantificação de blastos:\n' +
        '  - Blastos quantificados em < 5% (MDS-RC/RCMD) ou 5% a 19% (MDS-EB).',
      limitations: "Punção seca (dry tap) ocorre em até 30% dos cães com MDS devido à mielofibrose secundária concomitante; hemodiluição acentuada pode mascarar a celularidade real.",
      isGoldStandard: false
    },
    {
      stepNumber: 5,
      title: "Biópsia de medula óssea (core biopsy por agulha de Jamshidi)",
      purpose: "Avaliação da celularidade real, arquitetura tecidual intertrabecular e diagnóstico diferencial de mielofibrose e aplasia.",
      description:
        'Procedimento de core biopsy e protocolo histopatológico:\n' +
        '- Amostragem óssea tecidual:\n' +
        '  - Obtenção de fragmento cortical e trabecular intacto de 1,5 a 2 cm com agulha de Jamshidi na crista ilíaca ou trocânter femoral sob anestesia geral.\n' +
        '- Processamento histotécnico:\n' +
        '  - Fixação em formol neutro tamponado a 10%, descalcificação ácida cuidadosa e colorações de HE e impregnação de prata para reticulina de Gomori.',
      interpretation:
        'Padrão ouro para determinação da celularidade real e arquitetura:\n' +
        '- Avaliação da arquitetura intertrabecular:\n' +
        '  - Demonstra espaços intertrabeculares normocelulares ou marcadamente hipercelulares (proporção hematopoiese:gordura > 50-70%), descartando categoricamente a substituição adiposa da anemia aplástica.\n' +
        '- Localização de precursores e fibrose:\n' +
        '  - Demonstra localização anormal de precursores imaturos (ALIP) e evidencia graus variáveis de mielofibrose reticulínica secundária.',
      limitations: "Exige anestesia geral com suporte hemodinâmico rigoroso e estabilização transfusional prévia se o hematócrito for muito baixo. Tempo de laudo de 3 a 7 dias.",
      isGoldStandard: true
    },
    {
      stepNumber: 6,
      title: "Citometria de fluxo, citoquímica e imunocitoquímica medular",
      purpose: "Confirmação da linhagem mieloide e exclusão definitiva de leucemias linfoides agudas (ALL).",
      description:
        'Protocolo de imunofenotipagem e citoquímica:\n' +
        '- Citometria de fluxo multiparamétrica:\n' +
        '  - Suspensão celular de aspirado medular testada com anticorpos monoclonais: MPO (mieloperoxidase), CD11b (linhagem mieloide), CD14 (linhagem monocítica), CD34 (célula-tronco/blasto), CD3 (linfócitos T) e CD79a (linfócitos B).\n' +
        '- Citoquímica enzimática:\n' +
        '  - Reações citoquímicas com Sudan Black B e mieloperoxidase para caracterização enzimática dos precursores.',
      interpretation:
        'Confirmação de linhagem e exclusão de leucemia linfoide:\n' +
        '- Positividade para marcadores mieloides (CD11b, MPO, CD14) e negatividade para marcadores linfoides confirma a linhagem mieloide dos precursores indiferenciados, excluindo linfoma estágio V e leucemia linfoide.',
      limitations: "Painéis genômicos moleculares (NGS, citogenética) padronizados na medicina humana ainda não estão validados comercialmente para uso rotineiro em cães e gatos (Meredith et al., 2025).",
      isGoldStandard: false
    },
    {
      stepNumber: 7,
      title: "Monitoramento longitudinal seriado (Integração clínico-patológica)",
      purpose: "Acompanhamento do comportamento temporal do clone e confirmação definitiva do diagnóstico.",
      description:
        'Protocolo de integração clínico-laboratorial seriada:\n' +
        '- Vigilância hematológica periódica:\n' +
        '  - Hemogramas seriados a cada 1 a 4 semanas associados a avaliações clínicas e físicas contínuas.\n' +
        '- Monitoramento de progressão clonal:\n' +
        '  - Acompanhamento da trajetória do hematócrito, contagem plaquetária e detecção precoce de blastos no sangue periférico.\n' +
        '- Reavaliação medular:\n' +
        '  - Repetição do aspirado e biópsia medular em caso de declínio clínico agudo ou suspeita de progressão.',
      interpretation:
        'Confirmação temporal e monitoramento biológico:\n' +
        '- Análise do filme evolutivo versus fotografia estática:\n' +
        '  - Como estabelece a hematologia veterinária, a evolução longitudinal é mais decisiva do que a fotografia estática inicial.\n' +
        '- Confirmação de MDS clonal e vigilância de AML:\n' +
        '  - A persistência de citopenias e displasias após a remoção de drogas e resolução de infecções confirma o diagnóstico de MDS e monitora a transição para AML.',
      limitations: "Demanda cooperação estrita do tutor e custos adicionais com repetição seriada de exames laboratoriais.",
      isGoldStandard: false
    }
  ],
  treatment: {
    metaPrimaria:
      'Objetivos terapêuticos e pilares de abordagem na MDS:\n' +
      '- Ausência de consenso curativo:\n' +
      '  - Não há atualmente diretriz consensual ACVIM ou protocolo medicamentoso curativo para a síndrome mielodisplásica em pequenos animais (ACVIM Endorsed Statements; Feline Emergency and Critical Care Medicine, 2ª ed.).\n' +
      '- Três pilares fundamentais do manejo:\n' +
      '  - 1. Identificação e suspensão imediata de fármacos mielotóxicos e tratamento de gatilhos de dismielopoiese secundária.\n' +
      '  - 2. Suporte hematológico para sustentação de oxigenação tecidual e prevenção de óbito por sepse neutropênica ou hemorragia.\n' +
      '  - 3. Em pacientes com MDS primária clonal de alto risco (especialmente MDS-EB com aumento progressivo de blastos), discussão multidisciplinar com oncologista veterinário sobre protocolos quimioterápicos citorredutores.',
    tratamentoCausasSecundarias:
      'Eliminação de causas secundárias e prova terapêutica:\n' +
      '- Suspensão mandatória de fármacos suspeitos:\n' +
      '  - Na vigência de suspeita de dismielopoiese secundária reativa, a intervenção imediata mais eficaz é suspender todos os medicamentos com potencial mielossupressor (estrogênios, cloranfenicol, quimioterápicos, sulfonamidas, fenobarbital).\n' +
      '- Suporte vitamínico coenzimático:\n' +
      '  - Pacientes com enteropatias crônicas ou suspeita de má absorção devem receber cobalamina (vitamina B12 500 a 1.000 mcg SC semanal) e ácido fólico.\n' +
      '- Prova terapêutica imunossupressora:\n' +
      '  - Se houver forte suspeita de componente imune associado (PIMA ou trombocitopenia imunomediada), realiza-se prova terapêutica com prednisolona (1 a 2 mg/kg/dia VO) com monitoramento frequente de neutrófilos e vigilância estrita contra infecções secundárias.',
    suporteTransfusionalHemacias:
      'Suporte transfusional com concentrado de hemácias:\n' +
      '- Critérios de indicação hemodinâmica e hipóxia tecidual:\n' +
      '  - A transfusão de concentrado de hemácias (pRBC) ou sangue total é a intervenção de resgate mais importante para o paciente com anemia sintomática grave.\n' +
      '  - A indicação transfusional não deve se basear apenas em um ponto de corte arbitrário de hematócrito, mas sim em sinais clínicos de hipóxia celular: taquicardia persistente em repouso, taquipneia, fraqueza severa, prostração profunda e lactato sérico elevado (> 2,5 mmol/L).\n' +
      '- Posologia e protocolo de administração:\n' +
      '  - Dose recomendada de concentrado de hemácias: 10 a 15 mL/kg IV lenta em 2 a 4 horas (sangue total: 15 a 20 mL/kg IV).\n' +
      '- Tipagem sanguínea e segurança imunológica:\n' +
      '  - Em gatos, a tipagem sanguínea para o sistema AB é mandatória antes de qualquer infusão para evitar reações hemolíticas agudas fatais.\n' +
      '  - O teste de compatibilidade cruzada (crossmatch) é obrigatório se o animal já recebeu transfusões há mais de 4 dias.\n' +
      '- Orientação prognóstica ao tutor:\n' +
      '  - O tutor deve ser esclarecido de que a transfusão não cura a doença medular, proporcionando apenas ganho temporário de transporte de oxigênio (meia-vida de 20 a 30 dias das hemácias transfundidas).',
    manejoNeutropeniaFebril:
      'Protocolo de emergência na neutropenia febril:\n' +
      '- Reconhecimento da emergência séptica:\n' +
      '  - Animais com contagem de neutrófilos segmentados inferior a 1.000/mcL associada a temperatura retal elevada (>= 39,3 °C) devem ser conduzidos como emergência médica sob suspeita de choque séptico por translocação da microbiota comensal.\n' +
      '  - Coletar imediatamente hemocultura e urocultura por punção estéril antes do início dos antibióticos.\n' +
      '- Antibioticoterapia parenteral de amplo espectro:\n' +
      '  - Ampicilina-sulbactam (30 a 50 mg/kg IV q8h) combinada a Enrofloxacino (5 a 10 mg/kg IV q24h em cães).\n' +
      '  - Particularidade felina crítica: em gatos, preconiza-se Marbofloxacino 2 mg/kg IV q24h para evitar retinopatia e cegueira induzida por enrofloxacino; alternativa: Cefepima (30 mg/kg IV q8h).\n' +
      '- Veto a procedimentos que lesionem mucosas:\n' +
      '  - Procedimentos que lesionem mucosas (enemas ou termometria retal forçada) são expressamente desaconselhados pelo risco de bacteremia imediata.',
    fatoresCrescimentoHematopoetico:
      'Fatores estimuladores de colônias e agentes eritropoéticos:\n' +
      '- Fatores de crescimento granulocítico (G-CSF):\n' +
      '  - Emprego de Filgrastim (G-CSF recombinante humano) na dose de 3 a 5 mcg/kg SC q24h por 3 a 5 dias para estímulo transitório em neutropenias críticas.\n' +
      '- Agentes estimuladores da eritropoiese (ESA):\n' +
      '  - Alfaepoetina recombinante humana (100 U/kg SC 3 vezes por semana) ou Darbepoetina alfa (0,5 a 1,0 mcg/kg SC semanal).\n' +
      '- Limitações biológicas e riscos imunogênicos graves:\n' +
      '  - Esses fármacos estimulam progenitores já existentes, mas não corrigem o defeito genético subjacente do clone neoplásico.\n' +
      '  - Risco de desenvolvimento de anticorpos neutralizantes cruzados contra a eritropoietina endógena do animal com o uso repetido de proteínas heterólogas humanas, podendo precipitar aplasia pura de série vermelha irreversível.',
    controversiaCorticosteroides:
      'Evidências e controvérsias do uso de corticosteroides:\n' +
      '- Ausência de eficácia clonal comprovada:\n' +
      '  - O uso empírico de corticosteroides (prednisolona 1 a 2 mg/kg/dia VO) não possui evidência científica de eficácia na eliminação do clone neoplásico da MDS verdadeira (Feline Emergency and Critical Care Medicine, 2ª ed.).\n' +
      '- Evidência na coorte canina (Meredith et al., 2025):\n' +
      '  - No estudo de Meredith et al. (2025), 31 de 42 cães com MDS receberam esquemas imunossupressores, porém a resposta foi inconsistente.\n' +
      '- Indicação restrita a componente imunomediado sobreposto:\n' +
      '  - A prova terapêutica com prednisolona é aceitável quando não se pode afastar um componente imunomediado sobreposto (PIMA/ITP concorrente), exigindo monitoramento rigoroso contra complicações infecciosas secundárias à neutropenia.',
    quimioterapiaMatsuyamaProtocoloCitarabinaDoxorrubicina:
      'Protocolo Matsuyama de Citarabina e Doxorrubicina na MDS-EB avançada:\n' +
      '- Evidência clínica contemporânea (Matsuyama et al., 2023):\n' +
      '  - Em cães com síndrome mielodisplásica com excesso de blasts (MDS-EB) ou neoplasia mieloide avançada, estudo avaliou o protocolo combinado em 11 cães (2 MDS, 4 MDS/AML e 5 AML).\n' +
      '- Esquema posológico rigoroso:\n' +
      '  - Doxorrubicina na dose de 30 mg/m² IV administrada em infusão de 20 minutos.\n' +
      '  - Citarabina na dose de 300 mg/m² IV administrada em infusão contínua (CRI) ao longo de 6 horas.\n' +
      '- Taxas de remissão e resposta hematológica:\n' +
      '  - Sete dos 11 cães (63,6%) obtiveram resolução completa das citopenias periféricas (incluindo 2/2 cães com MDS pura e 2/4 cães com MDS/AML), com mediana de remissão de 344 dias e sobrevida global de 369 dias.\n' +
      '- Perfil de toxicidade e monitoramento cardiológico:\n' +
      '  - Toxicidade predominante gastrointestinal e mielossupressiva; foram registrados eventos adversos graves de grau V, incluindo dois casos de insuficiência cardíaca congestiva induzida por doxorrubicina.\n' +
      '  - Exige acompanhamento por oncologista experiente e monitorização ecocardiográfica prévia e seriada.',
    azacitidinaEmFelinos:
      'Terapia epigenética hipometilante com 5-azacitidina na espécie felina:\n' +
      '- Mecanismo de ação epigenética:\n' +
      '  - A 5-azacitidina é um agente análogo de nucleosídeo pirimidínico que inibe a DNA-metiltransferase (DNMT), promovendo desmetilação do DNA e reexpressão de genes supressores tumorais silenciados.\n' +
      '- Prova de conceito felina (Hisasue, Tanaka & Neo, 2022):\n' +
      '  - Gata de 5 anos com MDS grave, anemia não regenerativa, trombocitopenia e 19% de blasts medulares tratada com azacitidina (35 a 70 mg/m² SC por 3 a 5 dias consecutivos em 3 ciclos mensais) associada a prednisolona.\n' +
      '- Resultado clínico e sobrevida excepcional:\n' +
      '  - A paciente apresentou redução expressiva da blastemia e da displasia, permanecendo clinicamente estável e viva por mais de 1.474 dias (mais de 4 anos).\n' +
      '- Nível de evidência atual:\n' +
      '  - Embora corresponda a relato de caso único (n=1, evidência fraca), constitui promissora prova de conceito para agentes hipometilantes em gatos com excesso de blastos.',
    citarabinaBaixaDoseHistorica:
      'Regime histórico de Citarabina em baixa dose (baixo blasto):\n' +
      '- Racional terapêutico clássico:\n' +
      '  - Emprego de citarabina (Ara-C) em regime de baixa dose (10 mg/m² SC a cada 12 horas por 7 a 14 dias em ciclos mensais; Nelson & Couto, 6ª ed.).\n' +
      '  - Objetivo teórico de induzir diferenciação de precursores displásicos sem acarretar mielossupressão ablativa.\n' +
      '- Resposta clínica limitada e riscos:\n' +
      '  - As respostas documentadas em pequenos animais são tipicamente modestas e transitórias (remissões parciais de poucas semanas).\n' +
      '  - Acumula risco de piora da neutropenia e trombocitopenia periférica em animais já citopênicos.',
    terapiasInadequadasEMitos:
      'Práticas desaconselhadas e mitos na condução da MDS:\n' +
      '- 1. Diagnóstico precipitado de malignidade irreversível:\n' +
      '  - Rotular qualquer displasia medular como neoplasia clonal sem antes investigar e tratar causas reativas e deficiências nutricionais.\n' +
      '- 2. Imunossupressão cega em paciente neutropênico febril:\n' +
      '  - Iniciar corticoides em doses imunossupressoras sem antes colher culturas e afastar bacteremia/sepse oculta.\n' +
      '- 3. Aderência ao limiar obsoleto de 30% de blastos:\n' +
      '  - Utilizar o ponto de corte histórico FAB em vez do consenso veterinário moderno de 20% para demarcação entre MDS e AML.\n' +
      '- 4. Premissa de incurabilidade imediata em gatos FeLV-positivos:\n' +
      '  - Considerar todo felino virêmico com citopenia como terminal, sem diferenciar mielossupressão reativa transitória de MDS clonal.\n' +
      '- 5. Manobras traumáticas em mucosas:\n' +
      '  - Realizar enemas ou termometria retal vigorosa em animais com neutropenia grave (<1.000/mcL), que precipitam translocação bacteriana e choque séptico.'
  },
  complications: {
    transformacaoEmLeucemiaMieloideAguda:
      'Transformação em Leucemia Mieloide Aguda (AML):\n' +
      '- Incidência de progressão clonal:\n' +
      '  - A transformação leucêmica aguda ocorre em 20% a 40% dos cães e gatos com MDS que sobrevivem às complicações iniciais de citopenia (Withrow & MacEwen, 6ª ed.; Nelson & Couto, 6ª ed.).\n' +
      '- Mecanismo genômico de escape:\n' +
      '  - Resulta do acúmulo de mutações oncogênicas adicionais que bloqueiam terminalmente a diferenciação celular e anulam os mecanismos de apoptose intramedular.\n' +
      '- Apresentação clínica e prognóstico fulminante:\n' +
      '  - Caracteriza-se por declínio clínico acelerado, invasão blastêmica no sangue periférico e sobrevida extremamente curta (mediana de 6 dias na AML; Meredith et al., 2025).',
    choqueSepticoNeutropenico:
      'Colapso séptico neutropênico e choque distributivo:\n' +
      '- Falência da imunidade inata primária:\n' +
      '  - A neutropenia severa associada a defeitos funcionais de quimiotaxia e fagocitose nos granulócitos sobreviventes anula a barreira contra a flora endógena.\n' +
      '- Translocação da microbiota comensal:\n' +
      '  - Bactérias do trato digestivo e orofaringe penetram a corrente sanguínea sem deflagrar reação inflamatória focal perceptível.\n' +
      '- Evolução hiperaguda:\n' +
      '  - Rápida transição de pirexia ou hipotermia para choque distributivo, disfunção de múltiplos órgãos e óbito em menos de 24 horas.',
    hemorragiaCatastrofica:
      'Hemorragia espontânea fulminante por trombocitopatia:\n' +
      '- Sinergia entre déficit quantitativo e qualitativo:\n' +
      '  - A sobreposição de contagem plaquetária reduzida com disfunção intrínseca de agregação e hipogranularidade expõe o paciente a sangramentos espontâneos imprevisíveis.\n' +
      '- Sítios anatômicos de risco fatal iminente:\n' +
      '  - Hemorragia alveolar pulmonar difusa, hemorragia gastrointestinal maciça e hematomas intracranianos constituem causas frequentes de óbito súbito ou indicação de eutanásia humanitária.',
    prognosticoCenarioCaninoContemporaneo:
      'Prognóstico canino contemporâneo (coorte Meredith et al., 2025):\n' +
      '- Redefinição da sobrevida e separação da AML:\n' +
      '  - Ao contrário do paradigma clássico de curso fulminante indiferenciado, o estudo padronizado em 70 cães demonstrou que a MDS apresenta sobrevida substancialmente mais longa que a AML.\n' +
      '  - A sobrevida mediana para cães com MDS foi de 384 dias, em marcante contraste com apenas 6 dias para cães com AML (P < 0,001).\n' +
      '- Redução substancial do risco de morte:\n' +
      '  - O risco instantâneo relativo de morte na coorte canina foi aproximadamente 5 vezes menor nos pacientes com MDS em comparação com aqueles acometidos por AML.',
    prognosticoFatoresPreditoresSobrevida:
      'Fatores prognósticos e preditores de sobrevida (Meredith et al., 2025):\n' +
      '- Variáveis clínicas e hematológicas significantes:\n' +
      '  - Porte corporal: cães de menor peso apresentaram tendência a maior tempo de sobrevida.\n' +
      '  - Contagens periféricas: contagens globais de leucócitos e plaquetas no momento do diagnóstico correlacionaram-se com a sobrevida.\n' +
      '- Impacto determinante da blastemia periférica:\n' +
      '  - A presença e a porcentagem de blastos circulantes no sangue periférico revelaram-se fatores prognósticos adversos independentes; cada ponto percentual a mais elevou o risco de morte.\n' +
      '- Contagem de blastos medulares:\n' +
      '  - A contagem de blastos na medula óssea não alcançou significância estatística univariável isolada na coorte, refletindo heterogeneidade clonal e reafirmando a importância da disseminação periférica.',
    prognosticoFelino:
      'Perfil prognóstico na espécie felina:\n' +
      '- Prognóstico geral historicamente reservado:\n' +
      '  - Em felinos, a sobrevida mediana descrita na literatura tradicional varia de poucas semanas a alguns meses (Feline Emergency and Critical Care Medicine, 2ª ed.).\n' +
      '- Correlação com carga de blastos medulares (Hisasue et al., 2001):\n' +
      '  - Em estudo com 16 gatos, 3 de 6 indivíduos com alta proporção de blastos evoluíram rapidamente para AML, contra 1 de 8 no grupo de baixo blasto.\n' +
      '- Fatores adicionais de gravidade:\n' +
      '  - Virêmia persistente para FeLV, anemia refratária profunda e alta dependência transfusional são os principais marcadores de pior prognóstico a curto prazo.'
  },
  prevention: {
    controleFeLVEProfilaxia:
      'Prevenção da dismielopoiese retroviral em felinos:\n' +
      '- Rastreio sorológico na rotina clínica:\n' +
      '  - Testagem sorológica para antígeno p27 do FeLV de todos os gatos no acolhimento, adoção ou antes de introdução em grupos de convívio (diretrizes AAFP/ISFM).\n' +
      '- Imunização e manejo ambiental:\n' +
      '  - Vacinação sistemática contra FeLV para indivíduos com acesso a áreas externas ou coabitantes de animais com status desconhecido.\n' +
      '  - Manutenção de gatos estritamente domiciliados (indoor) e isolamento preventivo de animais comprovadamente positivos.',
    farmacovigilanciaMielotoxica:
      'Farmacovigilância contra dismielopoiese tóxica secundária:\n' +
      '- Veto a terapias empíricas de alto risco:\n' +
      '  - Evitar estrógenos sintéticos exógenos (como cipionato de estradiol para interrupção de prenhez em cadelas), sabidamente tóxicos para células-tronco pluripotentes.\n' +
      '- Uso criterioso de agentes antimicrobianos e anticonvulsivantes:\n' +
      '  - Evitar cursos prolongados de cloranfenicol e fenobarbital sem controle hematológico; monitorar sulfonamidas em raças de risco (ex.: Doberman Pinscher).\n' +
      '- Monitoramento de protocolos oncológicos:\n' +
      '  - Avaliação hematológica seriada a cada 15 a 30 dias em pacientes em uso contínuo de agentes quimioterápicos citotóxicos ou imunossupressores.',
    vigilanciaCitopeniasCronicas:
      'Vigilância hematológica de citopenias subclínicas:\n' +
      '- Investigação precoce de alterações marginais:\n' +
      '  - Não ignorar reduções leves ou limítrofes na contagem plaquetária, neutrofílica ou eritrocitária em exames laboratoriais de rotina.\n' +
      '- Monitoramento seriado a cada 60 a 90 dias:\n' +
      '  - Pacientes com citopenias inexplicadas devem ser monitorados trimestralmente com esfregaço sanguíneo manual para detecção de macrocitose e atipias nucleares.\n' +
      '- Intervenção antes do colapso clínico:\n' +
      '  - O diagnóstico precoce na fase de baixo blasto viabiliza suporte transfusional programado e profilaxia antimicrobiana antes da instalação de sepse fulminante ou hemorragia grave.'
  },
  figures: [
    {
      kind: "clinicalFigure",
      src: "/consulta-vet/sindrome-mielodisplasica/esfregaco-displasia-meredith2025.jpg",
      alt: "Esfregaço sanguíneo e aspirado medular demonstrando displasia celular em cão com MDS (Meredith et al., 2025)",
      caption:
        'Figura 1 — Displasia morfológica em cão com Síndrome Mielodisplásica (Meredith et al., 2025, CC BY 4.0):\n' +
        '- (a) Sangue periférico: neutrófilos displásicos com lobulação nuclear irregular e eritrócitos gigantes macrocíticos.\n' +
        '- (b) Aspirado medular: hipercelularidade e diseritropoiese com precursores megaloblastoides.',
      display: "wide"
    },
    {
      kind: "clinicalFigure",
      src: "/consulta-vet/sindrome-mielodisplasica/medula-biopsia-reticulina-meredith2025.jpg",
      alt: "Biópsia de medula óssea com coloração de reticulina e micromegacariócitos na MDS canina (Meredith et al., 2025)",
      caption:
        'Figura 2 — Histopatologia e citologia medular na MDS (Meredith et al., 2025, CC BY 4.0):\n' +
        '- (a) Aspirado medular: micromegacariócitos hipolobulados anormais característicos de dismegacariopoiese.\n' +
        '- (b) Core biopsy (reticulina de Gomori): rede fibrótica reticulínica acentuada (mielofibrose secundária), explicando a alta frequência de punção seca.',
      display: "wide"
    },
    {
      kind: "clinicalFigure",
      src: "/consulta-vet/sindrome-mielodisplasica/leucemia-mieloide-comparacao-meredith2025.jpg",
      alt: "Citologia comparativa e imunofenotipagem de leucemia mieloide aguda em cão (Meredith et al., 2025)",
      caption:
        'Figura 3 — Diagnóstico diferencial de Leucemia Mieloide Aguda (AML; Meredith et al., 2025, CC BY 4.0):\n' +
        '- (a) Sangue periférico: blastos indiferenciados e mielomonócitos com lobulação nuclear irregular.\n' +
        '- (b) Citoquímica de mieloperoxidase (MPO): positividade enzimática em precursores da linhagem mieloide.',
      display: "default"
    },
    {
      kind: "clinicalFigure",
      src: "/consulta-vet/sindrome-mielodisplasica/biopsia-medular-leucemia-meredith2025.jpg",
      alt: "Core biopsy de medula óssea exibindo apagamento por blastos na transformação para AML (Meredith et al., 2025)",
      caption:
        'Figura 4 — Progressão histológica para Leucemia Mieloide Aguda (AML; Meredith et al., 2025, CC BY 4.0):\n' +
        '- Core biopsy de medula óssea demonstrando hipercelularidade extrema.\n' +
        '- Substituição difusa dos cordões hematopoéticos por população densa e monomórfica de blastos.',
      display: "default"
    },
    {
      kind: "clinicalFigure",
      src: "/consulta-vet/sindrome-mielodisplasica/curva-sobrevida-mds-vs-aml-meredith2025.jpg",
      alt: "Curvas de sobrevida de Kaplan-Meier comparando MDS vs AML em 70 cães (Meredith et al., 2025)",
      caption:
        'Figura 5 — Curvas de sobrevida global de Kaplan-Meier em 70 cães com neoplasias mieloides (Meredith et al., 2025, CC BY 4.0):\n' +
        '- Síndrome mielodisplásica (MDS; n = 42, linha pontilhada): sobrevida mediana de 384 dias.\n' +
        '- Leucemia mieloide aguda (AML; n = 28, linha contínua): sobrevida mediana de 6 dias (P < 0,001).',
      display: "default"
    },
    {
      kind: "clinicalFigure",
      src: "/consulta-vet/sindrome-mielodisplasica/locais-coleta-medula-ossea-vetius.jpg",
      alt: "Locais anatômicos de referência para punção aspirativa e core biopsy de medula óssea em cães e gatos",
      caption:
        'Figura 6 — Sítios anatômicos recomendados para aspiração e core biopsy de medula óssea (Guia de Procedimentos Vetius):\n' +
        '- Fossa trocantérica do fêmur proximal (preferencial em cães e gatos).\n' +
        '- Crista ilíaca e tuberosidade maior do úmero.',
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
