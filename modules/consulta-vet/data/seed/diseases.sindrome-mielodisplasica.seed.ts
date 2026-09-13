import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Síndrome Mielodisplásica (MDS / Displasia Mieloide) em cães e gatos — síntese editorial Vetius.
 * Padrão editorial aprofundado com fisiopatologia molecular, distinção primária vs secundária,
 * limiar de blasts (MDS vs AML), estudos seminais (Meredith et al. 2025, Matsuyama et al. 2023,
 * Hisasue et al. 2001/2022, Weiss & Aird 2001) e referências ABNT com DOI.
 * Texto 100% limpo, sem marcadores asteriscos (**), em conformidade estrita com o padrão do app.
 */

export const sindromeMielodisplasicaRecord: DiseaseRecord = {
  id: 'disease-sindrome-mielodisplasica-caes-gatos',
  slug: 'sindrome-mielodisplasica-caes-gatos',
  title: 'Síndrome mielodisplásica (MDS)',
  subtitle: 'Neoplasia mieloide clonal, hematopoiese ineficaz com medula hipercelular e citopenias periféricas em cães e gatos',
  synonyms: [
    'MDS',
    'Myelodysplastic syndrome',
    'Displasia mieloide',
    'Pré-leucemia',
    'Síndrome pré-leucêmica',
    'Dismielopoiese clonal primária',
    'Neoplasia mieloide mielodisplásica',
  ],
  species: ['dog', 'cat'],
  category: 'hematologia',
  categories: ['oncologia'],
  tags: [
    'MDS',
    'Displasia mieloide',
    'Hematopoiese ineficaz',
    'Pancitopenia',
    'Bicitopenia',
    'Anemia não regenerativa',
    'Blasts medulares',
    'FeLV',
    'Medula óssea',
    'Hematologia',
    'Oncologia',
  ],
  isPublished: true,
  plainLanguage: DISEASE_PLAIN_LANGUAGE['sindrome-mielodisplasica-caes-gatos'],
  quickSummary:
    'A síndrome mielodisplásica (MDS) compreende um grupo heterogêneo de neoplasias clonais da célula-tronco hematopoética (HSC) caracterizadas por hematopoiese ineficaz, citopenias periféricas persistentes e alterações morfológicas displásicas em uma ou mais linhagens da medula óssea. A marca registrada da doença é o paradoxo fisiopatológico de medula cheia com sangue vazio: enquanto a medula óssea apresenta celularidade normal ou marcadamente aumentada devido à proliferação do clone defeituoso, os precursores sofrem apoptose intramedular acelerada e falha na diferenciação terminal, gerando anemia não regenerativa grave (frequentemente macrocítica), neutropenia e trombocitopenia na circulação sistêmica. A MDS primária deve ser rigorosamente diferenciada da dismielopoiese secundária reativa, desencadeada por processos imunomediados (PIMA, IMHA), sepse, fármacos mielotóxicos, toxinas ou infecção viral (em gatos, o FeLV é a principal associação histórica). No limiar taxonômico moderno entre MDS e leucemia mieloide aguda (AML), a proporção de blasts medulares inferior a 20% estabelece a fronteira operacional prática (Withrow & MacEwen, 6ª ed.; Meredith et al., 2025). O estudo seminal contemporâneo de Meredith et al. (2025), avaliando 70 cães, demonstrou que a MDS apresenta comportamento significativamente mais indolente que a AML (mediana de sobrevida de 384 dias versus 6 dias), sendo a blastemia periférica e as citopenias os principais preditores de risco. Não existe diretriz ou protocolo ACVIM curativo padronizado; a conduta baseia-se na exclusão e controle de causas secundárias, suporte transfusional com concentrado de hemácias guiado por hipóxia clínica, antibioticoterapia agressiva na neutropenia febril e, em casos selecionados de alto risco (MDS-EB), quimioterapia citorredutora com doxorrubicina associada a citarabina ou azacitidina.',
  quickDecisionStrip: [
    'Paradoxo central da MDS: medula óssea cheia (hipercelular) contrastando com sangue periférico vazio (bicitopenia ou pancitopenia).',
    'Ver displasia citológica NÃO confirma MDS: a dismielopoiese secundária a fármacos, sepse ou imunomediadas é duas vezes mais frequente.',
    'Ausência de blasts no sangue NÃO exclui a doença: 76% dos cães com MDS comprovada não apresentam blastos circulantes no hemograma.',
    'Fronteira com AML: a proporção de blasts medulares inferior a 20% separa a MDS da leucemia mieloide aguda na classificação moderna.',
    'Gatos com citopenias inexplicadas: testagem sorológica e molecular para FeLV é mandatória (associação clássica em mais de 80% das séries).',
    'Aspirado e biópsia em conjunto: o aspirado avalia morfologia e blasts; a core biopsy define celularidade real e descarta mielofibrose.',
    'Transfusão por sintomas clínicos: guiar a reposição de concentrado de hemácias pela hipóxia e taquicardia, e não apenas pelo hematócrito.',
    'Neutropenia associada a febre é emergência crítica: barreira mucosa comprometida exige antibióticos bactericidas intravenosos imediatos.',
    'Prognóstico canino contemporâneo: cães com MDS têm sobrevida mediana de 384 dias (Meredith et al., 2025), muito superior aos 6 dias da AML.',
  ],
  quickSummaryRich: {
    lead:
      'Na síndrome mielodisplásica, a fábrica medular opera em capacidade máxima mas produz peças defeituosas que são destruídas antes de ganhar as ruas: a medula óssea encontra-se abarrotada de células clonais que entram em apoptose intramedular desregulada, resultando em bicitopenia ou pancitopenia profunda no sangue periférico. O maior desafio do clínico é não confundir essa neoplasia hematopoética com a dismielopoiese secundária reativa, reversível após a remoção de toxinas, fármacos ou gatilhos inflamatórios. Diagnosticar MDS exige integrar citologia quantitativa, core biopsy de medula e rastreio exaustivo de causas secundárias.',
    leadHighlights: [
      'fábrica medular opera em capacidade máxima',
      'apoptose intramedular desregulada',
      'bicitopenia ou pancitopenia profunda',
      'dismielopoiese secundária reativa',
      'core biopsy de medula',
    ],
    pillars: [
      {
        title: 'Paradoxo de produção ineficaz',
        body:
          'Uma mutação clonal precoce na célula-tronco hematopoética acarreta maturação assíncrona e morte prematura dos precursores na medula. A resposta renal de eritropoietina (EPO) estimula ainda mais a proliferação do clone defeituoso, mas a reticulocitose sanguínea permanece gravemente inadequada.',
        highlights: ['mutação clonal precoce', 'morte prematura dos precursores', 'reticulocitose permanece inadequada'],
      },
      {
        title: 'Dismielopoiese secundária vs MDS',
        body:
          'A morfologia celular isolada é incapaz de distinguir MDS primária de alterações reativas (Weiss & Aird, 2001). Inflamações severas, doenças imunomediadas (PIMA/IMHA), fármacos mielotóxicos e FeLV simulam perfeitamente a displasia citológica medular.',
        highlights: ['Weiss & Aird, 2001', 'PIMA/IMHA', 'fármacos mielotóxicos', 'FeLV'],
      },
      {
        title: 'Fronteira taxonômica de 20% de blasts',
        body:
          'Diferente do antigo consenso FAB veterinário (que adotava 30%), a medicina veterinária contemporânea estabelece o limiar de aproximadamente 20% de blasts medulares para separar a síndrome mielodisplásica (<20%) da leucemia mieloide aguda (>=20%).',
        highlights: ['limiar de aproximadamente 20%', 'MDS (<20%)', 'AML (>=20%)'],
      },
      {
        title: 'Manejo de suporte e risco infeccioso',
        body:
          'Não há cura medicamentosa validada. O objetivo primordial é sustentar o transporte de oxigênio com concentrado de hemácias, vigiar sepse bacterêmica na vigência de neutropenia grave e discutir citotoxicidade seletiva em centros oncológicos para pacientes com excesso de blasts.',
        highlights: ['transporte de oxigênio', 'concentrado de hemácias', 'vigiar sepse bacterêmica'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico sistemático da suspeita de MDS',
      steps: [
        {
          label: '1. Confirmação laboratorial e esfregaço sanguíneo manual',
          timing: 'Primeira hora / Consulta inicial',
          detail:
            'Repetir hemograma completo com contagem de reticulócitos absolutos e revisão microscópica manual de lâmina. Em gatos, descartar pseudotrombocitopenia por agregados plaquetários na borda do esfregaço. Avaliar presença de macrocitose não regenerativa, metarrubrícitos circulantes e atipias morfológicas em neutrófilos.',
          limitations: 'Analisadores hematológicos automáticos não detectam displasia citológica nem diferenciam agregados plaquetários felinos de trombocitopenia real.',
        },
        {
          label: '2. Avaliação de linhagens e exclusão de causas periféricas',
          timing: 'Fase de investigação inicial',
          detail:
            'Definir se há monocitopenia, bicitopenia ou pancitopenia. Descartar causas periféricas de consumo e destruição: sangramentos agudos ocultos, hemólise extravascular ou intravascular (coombs/aglutinação em salina), coagulação intravascular disseminada (PT/aPTT, fibrinogênio, D-dímero) e destruição imune de plaquetas.',
          limitations: 'A destruição imunomediada pode coexistir com displasia reativa na medula, dificultando a interpretação estática inicial.',
        },
        {
          label: '3. Rastreio clínico de dismielopoiese secundária e FeLV',
          timing: 'Antes de qualquer punção medular',
          detail:
            'Levantar histórico farmacológico minucioso (estrógenos, cloranfenicol, quimioterápicos, griseofulvina, fenobarbital, sulfonamidas). Rastrear sepse, inflamação crônica e neoplasias sólidas ocultas por imagem (ultrassonografia abdominal e radiografia torácica). Em felinos, realizar teste sorológico (ELISA/imunocromatografia) e PCR para FeLV e FIV obrigatoriamente.',
          limitations: 'O status de FeLV negativo em teste rápido pode exigir confirmação por PCR proviral em casos de infecção latente ou focal medular.',
        },
        {
          label: '4. Punção aspirativa associada a core biopsy de medula óssea',
          timing: 'Procedimento confirmatório essencial',
          detail:
            'Amostragem combinada de aspirado citológico e biópsia óssea por agulha de Jamshidi (tuberosidade ilíaca, crista ilíaca ou trocânter femoral). O aspirado detalha a morfologia individual e contagem diferencial de precursores; o fragmento ósseo avalia celularidade global, relação M:E verdadeira e descarta mielofibrose (frequente causa de dry tap) ou aplasia medular.',
          limitations: 'Punções secas (dry tap) ocorrem em até 30% dos cães com MDS devido à mielofibrose concomitante, tornando a biópsia com agulha histológica indispensável.',
        },
        {
          label: '5. Quantificação rigorosa de blasts e classificação',
          timing: 'Interpretação pelo patologista clínico',
          detail:
            'Contagem diferencial em pelo menos 300 a 500 células nucleadas por patologista experiente. Subtipificar em MDS-RC (<5% blasts, citopenia refratária), MDS-RCMD (<5% blasts com displasia em múltiplas linhagens), MDS-EB (5% a 19% blasts, excesso de blasts com alto risco de progressão) ou MDS-Er (predomínio eritroide com M:E < 1). Limiar de >=20% define leucemia mieloide aguda.',
          limitations: 'A quantificação subjetiva pode gerar discordância interobservador de até 25% a 30% em espécimes hemodiluídos ou hipocelulares.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo de estabilização clínica e manejo terapêutico',
      steps: [
        {
          label: '1. Suporte transfusional seletivo para anemia sintomática',
          timing: 'Imediato conforme estabilidade hemodinâmica',
          detail:
            'Administrar concentrado de hemácias (10 a 15 mL/kg IV) ou sangue total quando houver taquicardia persistente, prostração, letargia intensa ou lactato elevado decorrente de hipóxia anêmica. Realizar tipagem sanguínea obrigatória (DEA 1 em cães; sistema AB em felinos) e teste de compatibilidade cruzada (crossmatch).',
          dose: 'Concentrado de hemácias: 10–15 mL/kg IV lento em 2–4 horas; infusão inicial em 15–30 min.',
          reassess: 'Avaliar hematócrito pós-transfusional 1 a 2 horas após o término da infusão.',
        },
        {
          label: '2. Abordagem agressiva da neutropenia febril',
          timing: 'Se neutrófilos segmentados < 1.000/mcL com febre >= 39,3 °C',
          detail:
            'Coletar hemocultura e urocultura por cistocentese atraumática (se contagem plaquetária permitir). Iniciar antibioticoterapia parenteral bactericida de amplo espectro com cobertura para gram-positivos, gram-negativos e anaeróbios, minimizando risco de choque séptico decorrente de translocação bacteriana.',
          dose: 'Ampicilina-sulbactam (30 mg/kg IV q8h) associada a enrofloxacino (5–10 mg/kg IV q24h em cães) ou amicacina (se hidratação e função renal preservadas).',
        },
        {
          label: '3. Eliminação de causas de dismielopoiese secundária',
          timing: 'Primeiras 24–48 horas',
          detail:
            'Suspender imediatamente quaisquer drogas suspeitas de mielotoxicidade. Tratar hemoparasitoses identificadas e instituir suporte para enteropatias ou desordens inflamatórias sistêmicas. Se houver forte suspeita de componente imune (PIMA/ITP concorrente), instituir prova terapêutica com glicocorticoide.',
          dose: 'Prednisolona: 1 a 2 mg/kg/dia VO, com monitorização estrita da contagem de neutrófilos e vigilância para infecções secundárias.',
        },
        {
          label: '4. Avaliação oncológica e quimioterapia para MDS-EB',
          timing: 'Planejamento após confirmação histopatológica',
          detail:
            'Nos casos com contagem de blasts entre 5% e 19% (MDS com excesso de blasts) ou citopenias progressivas sem resposta ao suporte, discutir quimioterapia citotóxica especializada. Considerar o protocolo de doxorrubicina associada a citarabina contínua (Matsuyama et al., 2023) sob vigilância oncológica e ecocardiográfica estrita.',
          dose: 'Regime investigacional: Doxorrubicina 30 mg/m² IV seguido de Citarabina 300 mg/m² IV em infusão contínua de 6 horas.',
          limitations: 'Risco severo de cardiotoxicidade induzida por doxorrubicina e mielossupressão profunda em animais já pancitopênicos.',
        },
      ],
    },
  },
  etiology: {
    definicaoNaturezaClonal:
      'A síndrome mielodisplásica primária é uma desordem neoplásica clonal originada em uma célula-tronco hematopoética multipotente (HSC) ou progenitor mieloide inicial que sofre mutações somáticas genéticas e alterações epigenéticas. A progênie neoplásica adquire vantagem proliferativa e de sobrevivência sobre os clones normais da medula óssea, ocupando o nicho hematopoético medular. No entanto, esses precursores sofrem maturação disfuncional intrínseca e ativação exacerbada de vias pró-apoptóticas intramedulares, impedindo que os elementos celulares concluam seu ciclo de desenvolvimento e sejam liberados na circulação sistêmica. A doença é estritamente clonal em sua forma primária, integrando o espectro das neoplasias mieloides da Organização Mundial da Saúde adaptado à medicina veterinária (Withrow & MacEwen, 6ª ed.).',
    dismielopoieseSecundariaReativa:
      'A maior armadilha diagnóstica em hematologia veterinária reside na confusão entre MDS primária clonal e dismielopoiese secundária não neoplásica. Diversas agressões sistêmicas provocam alterações morfológicas idênticas à displasia neoplásica na medula óssea. No estudo clássico de Weiss & Aird (2001), foram avaliados 267 exames medulares caninos: entre os 34 cães que apresentavam mais de 10% de displasia citológica em pelo menos uma linhagem, apenas 13 eram portadores de MDS primária verdadeira, enquanto 21 correspondiam a dismielopoiese secundária reativa. Os autores concluíram taxativamente que a citomorfologia isolada é incapaz de diferenciar MDS de alterações secundárias. As causas secundárias mais frequentes abrangem: (1) Doenças imunomediadas, como anemia hemolítica imunomediada (IMHA) e anemia imunomediada não regenerativa/precursora (PIMA), nas quais o estímulo eritropoético intenso e desordenado gera precursores bizarras; (2) Fármacos mielotóxicos, notadamente estrógenos exógenos ou endógenos (hiperestrogenismo por tumor de células de Sertoli), cloranfenicol, agentes alquilantes, griseofulvina, fenobarbital e azatioprina; (3) Toxinas e produtos químicos ambientais; (4) Sepse grave e endotoxemia, que alteram a diferenciação mieloide; (5) Deficiências nutricionais graves de cobalamina (vitamina B12) ou folato, ocasionando alterações megaloblásticas por síntese defeituosa de DNA; (6) Mielofibrose secundária, mielite necrosante e infiltração neoplásica não mieloide (mieloftise por linfoma, mieloma múltiplo ou carcinomas metastáticos).',
    etiologiaFelinaFeLV:
      'Nos felinos, a epidemiologia etiológica da síndrome mielodisplásica apresenta uma ligação histórica singular com o vírus da leucemia viral felina (FeLV). O retrovírus possui tropismo acentuado por células progenitoras hematopoéticas e estromais da medula óssea. A inserção do genoma viral e a expressão de proteínas estruturais do FeLV desregulam os pontos de checagem do ciclo celular e a maturação dos progenitores, induzindo displasia em múltiplas linhagens. No estudo retrospectivo clássico de Hisasue et al. (2001), 15 de 16 gatos com MDS (93,8%) eram positivos para FeLV. Da mesma forma, o Nelson & Couto (6ª ed.) relata que mais de 80% dos gatos acometidos em séries históricas eram virêmicos para FeLV. No entanto, é fundamental pontuar que o FeLV induz uma vasta gama de distúrbios hematopoéticos não neoplásicos (como aplasia pura de série vermelha e mielossupressão transitória), de modo que a positividade sorológica aliada à displasia não fecha automaticamente o diagnóstico de clone neoplásico irreversível sem o acompanhamento longitudinal da evolução medular.',
    classificacaoPraticaVeterinaria:
      'A medicina veterinária contemporânea utiliza uma classificação baseada nas diretrizes FAB adaptadas pelo Animal Leukemia Study Group (Jain et al., 1991) e refinadas por Withrow & MacEwen (2020) e Weiss (2006): (1) MDS-RC (Citopenia Refratária): caracterizada por bicitopenia ou pancitopenia sanguínea, celularidade medular normo a hipercelular com displasia evidente e menos de 5% de mieloblastos na contagem diferencial medular; apresenta curso clínico insidioso e mais prolongado; (2) MDS-RCMD (Citopenia Refratária com Displasia Multilinear): preenche os critérios de menos de 5% de blastos, exibindo displasia acentuada em duas ou três linhagens hematopoéticas; (3) MDS-EB (MDS com Excesso de Blasts): proporção de blasts medulares entre 5% e 19%; representa a forma biologicamente mais avançada e agressiva, com displasia multilinear profunda, citopenias acentuadas, sobrevida reduzida e alto risco de progressão leucêmica; (4) MDS-Er (MDS com Predomínio Eritroide): caracterizada por hiperplasia eritroide maciça displásica e relação mieloide:eritroide (M:E) inferior a 1,0, refletindo a diseritropoiese grave com falha de maturação terminal.',
  },
  epidemiology: {
    populacaoCanina:
      'Em cães, a síndrome mielodisplásica é considerada uma afecção rara. Neoplasias mieloides como um todo ocorrem aproximadamente 10 vezes menos frequentemente que neoplasias linfoproliferativas (linfomas e leucemias linfoides) na rotina veterinária (Withrow & MacEwen, 6ª ed.). A doença acomete predominantemente animais adultos a idosos. No estudo contemporâneo de Meredith et al. (2025), envolvendo 42 cães com MDS classificados rigorosamente por um painel de três patologistas clínicos, a idade média observada foi de 7,8 anos (amplitude de 3,4 a 15 anos). Nenhuma predisposição sexual significativa foi identificada entre machos e fêmeas. Acomete cães de raças puras e mestiços de todos os portes.',
    investigacaoRacialDachshund:
      'Pesquisadores japoneses documentaram uma aparente concentração de casos de síndrome mielodisplásica e disfunções hematopoéticas clonais em cães da raça Dachshund miniatura. Estudos genômicos exploratórios identificaram variantes genéticas específicas em genes envolvidos na regulação do ciclo celular e reparo de DNA, tais como UMODL1 e XRCC5, em linhagens de Dachshunds afetados. Contudo, as evidências científicas atuais ainda são preliminares (evidência de força fraca a muito fraca), não autorizando classificar a MDS como uma condição hereditária mendeliana simples, nem justificando o uso desses marcadores em testes diagnósticos comerciais ou decisões de seleção reprodutiva rotineira.',
    epidemiologiaFelinaContextoAtual:
      'Nos gatos, a incidência real da MDS é difícil de precisar em virtude das mudanças históricas na prevalência do FeLV. Nas décadas de 1980 e 1990, a vasta maioria dos casos descritos na literatura científica internacional ocorria em gatos jovens a adultos de meia-idade virêmicos para FeLV. Com a ampla disseminação de testes de triagem e programas de vacinação contra o FeLV nas últimas décadas, tem sido observada uma proporção crescente de gatos mais idosos, FeLV-negativos, desenvolvendo MDS esporádica não associada a retrovírus, aproximando a epidemiologia felina contemporânea daquela observada em cães e humanos.',
  },
  pathogenesisTransmission: {
    biologiaClonalHSC:
      'O evento primário na patogênese da MDS é a ocorrência de uma lesão genética somática (mutações pontuais, translocações cromossômicas, quebras de DNA ou aberrações epigenéticas na metilação de promotores gênicos) em uma célula-tronco hematopoética primitiva (CD34+). Essa mutação inicial confere vantagem clonal, permitindo que a linhagem mutada supere as células hematopoéticas policlonais normais. À medida que o clone se expande, os genes reguladores da diferenciação terminal e da transcrição hematopoética (fatores de transcrição mieloides) sofrem silenciamento ou desregulação, resultando em arresto parcial da maturação celular em estágios intermediários.',
    paradoxoMedulaCheiaSangueVazio:
      'A consequência central dessa biologia anormal é o fenômeno da hematopoiese ineficaz. Sob condições fisiológicas de hipóxia anêmica, os rins elevam a secreção de eritropoietina (EPO), que atinge a medula e estimula intensamente a proliferação dos progenitores eritroides (BFU-E e CFU-E). Na MDS, esses progenitores respondem à EPO proliferando em grande número, o que preenche os espaços medulares e gera uma medula densamente celular (normocelular ou marcadamente hipercelular). No entanto, em vez de completarem a maturação e a extrusão nuclear para formação de reticulócitos funcionais, esses precursores neoplásicos exibem expressão anômala de receptores de morte celular (Fas/FasL, vias intrínsecas mitocondriais de caspases), sofrendo apoptose intramedular acelerada. Essa lise programada dentro dos cordões medulares impede que as células atinjam os sinusoides venosos, provocando a escassez crítica de elementos celulares no sangue periférico (bicitopenia ou pancitopenia com reticulocitopenia profunda).',
    evolucaoClonalProgressoAML:
      'A instabilidade genética inerente ao clone mielodisplásico predispõe à aquisição de mutações adicionais secundárias ao longo do tempo. Quando uma subpopulação clonal adquire mutações que inibem completamente a apoptose e bloqueiam de forma definitiva a diferenciação, ocorre o acúmulo descontrolado de células precursoras indiferenciadas (mieloblastos). A proporção de blasts na medula óssea aumenta progressivamente, transitando de MDS com excesso de blasts (MDS-EB) para a transformação leucêmica franca em Leucemia Mieloide Aguda (AML). Esse processo de progressão clonal em múltiplos passos consolidou a designação histórica de síndrome pré-leucêmica para a MDS.',
  },
  pathophysiology: {
    anemiaNaoRegenerativaEMacrocitose:
      'A anemia é a manifestação laboratorial mais precoce, constante e debilitante da síndrome mielodisplásica, sendo documentada em até 95% dos cães e praticamente 100% dos gatos acometidos (Meredith et al., 2025; Hisasue et al., 2001). A anemia é tipicamente não regenerativa (ausência de reticulocitose compatível com a gravidade da hipóxia). Uma característica fisiopatológica clássica e altamente suspeita na lâmina é a presença de macrocitose não regenerativa (volume corpuscular médio - VCM elevado com contagem absoluta de reticulócitos normal ou deprimida). Em condições habituais, a macrocitose reflete a presença de reticulócitos jovens (que são maiores que hemácias maduras). Na MDS, por outro lado, a macrocitose decorre de um defeito intrínseco na sincronia de divisão e síntese de hemoglobina, gerando eritroblastos megaloblastoides e eritrócitos maduros com tamanho aumentado decorrentes de mitoses incompletas. Adicionalmente, verifica-se anisocitose proeminente (RDW acentuadamente elevado) e metarrubricitose inapropriada (liberação de precursores nucleados na circulação sem a contrapartida de reticulócitos policromáticos).',
    disgranulopoieseERiscoDeSepse:
      'O acometimento da linhagem granulocítica-monocítica resulta em neutropenia periférica e disfunção neutrofílica severa. Precursores mieloides sofrem arresto maturativo em estágios de promielócitos e mielócitos. Os poucos neutrófilos segmentados que logram atingir a circulação frequentemente exibem defeitos funcionais qualitativos marcantes, com redução na capacidade de quimiotaxia, fagocitose e geração de espécies reativas de oxigênio pelo sistema enzimático da mieloperoxidase (MPO). O paciente apresenta deficiência crítica na imunidade inata primária, tornando-se suscetível a bacteremias espontâneas oriundas da flora comensal gastrointestinal, estomatites ulcerativas graves, pneumonias necrosantes e evolução fulminante para sepse e choque séptico.',
    dismegacariopoieseEHemorragia:
      'A dismegacariopoiese compromete tanto o número quanto a integridade funcional das plaquetas. Na medula óssea, os megacariócitos podem encontrar-se diminuídos, normais ou aumentados em número, porém exibem atipias nucleares grosseiras, com predomínio de micromegacariócitos (formas anãs) e megacariócitos hipolobulados ou mononucleados gigantes com citoplasma vacuolizado. As plaquetas liberadas na circulação revelam macroplaquetas (plaquetas gigantes com volume plaquetário médio - VPM elevado), hipogranularidade citoplasmática e defeitos de ativação de receptores de glicoproteínas de membrana (GPIIb/IIIa e GPIb-IX-V). Em decorrência dessa disfunção qualitativa (trombocitopatia adquirida), o paciente com MDS pode apresentar manifestações hemorrágicas graves (petéquias, equimoses, epistaxe, melena) mesmo quando a contagem plaquetária absoluta permanece em faixas moderadas (ex.: 40.000 a 60.000/mcL), que habitualmente não causariam sangramento espontâneo em outras doenças.',
    fronteiraTaxonomicaMdsVsAml:
      'A diferenciação entre MDS e AML é uma fronteira dinâmica e crucial em hematopatologia comparada. O critério histórico FAB adaptado por Jain et al. (1991) estabelecia o ponto de corte em 30% de blasts na medula óssea para caracterizar a leucemia mieloide aguda. A medicina veterinária moderna alinhou-se aos consensos humanos da Organização Mundial da Saúde, adotando aproximadamente 20% de blasts como limite divisório prático (Withrow, 2020; Meredith et al., 2025). Pacientes com menos de 20% de blasts são classificados como MDS (sendo o subgrupo de 5% a 19% denominado MDS com excesso de blasts - MDS-EB); espécimes com 20% ou mais de blasts são catalogados como AML. Essa diferenciação tem impacto prognóstico abissal: Meredith et al. (2025) demonstraram que a sobrevida mediana cai de 384 dias na MDS para meros 6 dias na AML.',
  },
  clinicalSignsPathophysiology: [
    {
      sign: 'Prostração, letargia profunda e intolerância ao exercício',
      mechanism:
        'Decorrente da hipóxia tecidual generalizada por queda crítica no hematócrito e transporte de oxigênio (DO2), agravada pela liberação sistêmica de citocinas inflamatórias pelo microambiente medular neoplásico.',
      clinicalRelevance: 'Presente em mais de 90% dos casos; o tutor relata piora progressiva e insidiosa ao longo de semanas ou meses.',
      evidenceLevel: 'Bem estabelecido',
    },
    {
      sign: 'Palidez intensa de mucosas e taquicardia com sopro sistólico de fluxo',
      mechanism:
        'A anemia severa desencadeia vasoconstrição periférica compensatória para redistribuir débito cardíaco aos órgãos nobres; a redução da viscosidade sanguínea (diminuição da massa de eritrócitos) e o estado hiperdinâmico geram fluxo sanguíneo turbulento transvalvar e sopro de ejeção sistólico funcional (grau II a III/VI).',
      clinicalRelevance: 'Achado físico cardeal na triagem clínica; exige diferenciação com cardiopatias estruturais prévias.',
      evidenceLevel: 'Bem estabelecido',
    },
    {
      sign: 'Febre intermitente e infecções bacterianas oportunistas recorrentes',
      mechanism:
        'Consequência direta da neutropenia absoluta (contagem de neutrófilos segmentados frequentemente inferior a 1.000/mcL) associada à incapacidade funcional de diapedese e fagocitose dos granulócitos displásicos.',
      clinicalRelevance: 'Manifesta-se por pirexia sem foco evidente, abscessos cutâneos indolentes, estomatite e piodermatites profundas de difícil resolução.',
      evidenceLevel: 'Bem estabelecido',
    },
    {
      sign: 'Manifestações hemorrágicas espontâneas (petéquias, equimoses, epistaxe, melena)',
      mechanism:
        'Resulta da trombocitopenia quantitativa por megacariopoiese ineficaz associada à trombocitopatia funcional (defeitos de adesão e agregação plaquetária por liberação de plaquetas anormais na circulação).',
      clinicalRelevance: 'Sinal de alarme para trombocitopenia grave (<30.000/mcL) ou disfunção plaquetária severa; risco de hemorragia no sistema nervoso central.',
      evidenceLevel: 'Bem estabelecido',
    },
    {
      sign: 'Hepatoesplenomegalia e linfadenomegalia discreta a moderada',
      mechanism:
        'A falência da hematopoiese na medula óssea desencadeia reativação de focos de hematopoiese extramedular no parênquima esplênico e hepático; concomitantemente, pode ocorrer infiltração tecidual direta pelo clone mieloide neoplásico.',
      clinicalRelevance: 'Observada em mais de 50% dos gatos e cães acometidos (Nelson & Couto, 6ª ed.; Withrow & MacEwen, 6ª ed.).',
      evidenceLevel: 'Evidência moderada',
    },
    {
      sign: 'Perda de peso progressiva e caquexia neoplásica',
      mechanism:
        'Aumento substancial no gasto energético de repouso provocado pelo turnover celular acelerado e apoptose maciça de precursores na medula óssea, mediado por fator de necrose tumoral alfa (TNF-alfa) e interleucinas pró-inflamatórias.',
      clinicalRelevance: 'Contratempos metabólicos crônicos agravam a sarcopenia e pioram a qualidade de vida e sobrevida geral.',
      evidenceLevel: 'Evidência moderada',
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Hemograma completo com esfregaço sanguíneo manual microscópico',
      subtitle: 'Identificação de citopenias e atipias morfológicas circulantes',
      timing: 'Avaliação inicial imediata',
      findings:
        'Anemia não regenerativa grave em 95% dos cães (hematócrito mediano de 21% em cães; Meredith et al., 2025) e na totalidade dos gatos (Hisasue et al., 2001). Macrocitose não regenerativa (VCM elevado sem reticulocitose adequada), RDW aumentado por anisocitose e metarrubricitose inapropriada. Leucopenia/neutropenia em 25% a 35% e trombocitopenia em 60% a 80%. No esfregaço: metamielócitos e bastonetes gigantes, neutrófilos hipossegmentados (anomalia pseudo-Pelger-Huët), hipersegmentação e plaquetas gigantes hipogranulares. Blasts circulantes ausentes em 76% dos cães com MDS (Meredith et al., 2025).',
      pathophysiologicalBasis:
        'A proliferação clonal combinada à apoptose intramedular reduz a liberação periférica de células maduras. A maturação nuclear e citoplasmática assíncrona gera macrocitose e formas gigantes na corrente sanguínea.',
      goldStandard: false,
      practicalLimitations:
        'A ausência de blastos no sangue NÃO afasta MDS. A contagem automatizada de plaquetas em gatos é sujeita a pseudotrombocitopenia por agregação, exigindo validação manual na cauda da lâmina.',
      studyCitation: 'Meredith et al. (2025); Hisasue et al. (2001); Weiss & Aird (2001)',
    },
    {
      stepNumber: 2,
      title: 'Perfil bioquímico sérico e urinálise completa',
      subtitle: 'Rastreio de disfunções orgânicas e exclusão de causas secundárias',
      timing: 'Simultâneo ao hemograma',
      findings:
        'Não existe perfil bioquímico específico para MDS. Analitos séricos (ureia, creatinina, ALT, fosfatase alcalina, albumina, bilirrubina) encontram-se habitualmente preservados nos estágios iniciais. Alterações quando presentes refletem complicações: azotemia por hipoperfusão ou necrose tubular isquêmica, elevação de enzimas hepáticas por hematopoiese extramedular/infiltração ou hipóxia centrolobular. Urinálise auxilia na detecção precoce de hematúria microscópica (trombocitopenia) ou bacteriúria oculta (neutropenia).',
      pathophysiologicalBasis:
        'A MDS é primariamente uma neoplasia confinada ao tecido hematopoético; o comprometimento de outros órgãos é secundário às citopenias ou decorre de doença pré-existente desencadeadora de dismielopoiese.',
      goldStandard: false,
      practicalLimitations:
        'Exames bioquímicos normais não reduzem a suspeita de MDS; servem primariamente para guiar o suporte e excluir nefropatias crônicas ou hepatopatias primárias como causa da anemia.',
      studyCitation: 'Withrow & MacEwen (6ª ed.); Nelson & Couto (6ª ed.)',
    },
    {
      stepNumber: 3,
      title: 'Coagulograma plasmático (PT, aPTT e Fibrinogênio)',
      subtitle: 'Diferenciação com distúrbios da hemostasia secundária e CID',
      timing: 'Triagem hemostática pré-invasiva',
      findings:
        'Tempo de protrombina (PT) e tempo de tromboplastina parcial ativada (aPTT) tipicamente normais na síndrome mielodisplásica não complicada. Fibrinogênio normal ou discretamente elevado como reagente de fase aguda.',
      pathophysiologicalBasis:
        'A MDS acomete a hemostasia primária (plaquetas e megacariócitos). A hemostasia secundária plasmática permanece íntegra, a menos que ocorra coagulação intravascular disseminada (CID) secundária a sepse ou falência hepática concomitante.',
      goldStandard: false,
      practicalLimitations:
        'Testes de coagulação normais não excluem sangramentos graves causados por trombocitopenia e trombocitopatia.',
      studyCitation: 'Feline Emergency and Critical Care Medicine (2ª ed.)',
    },
    {
      stepNumber: 4,
      title: 'Sorologia e PCR para FeLV e FIV em felinos',
      subtitle: 'Investigação obrigatória da principal associação etiológica em gatos',
      timing: 'Obrigatório em todo paciente felino citopênico',
      findings:
        'Pesquisa de antígeno p27 do FeLV por ELISA/imunocromatografia e confirmação por PCR proviral em sangue total. Pesquisa de anticorpos anti-FIV. Positividade para FeLV em proporção significativa dos casos felinos com mielodisplasia (Hisasue et al., 2001; Nelson & Couto, 6ª ed.).',
      pathophysiologicalBasis:
        'O vírus da leucemia viral felina invade as células progenitoras hematopoéticas e insere cópias provirais no genoma do hospedeiro, provocando disrupção no controle transcricional e displasia medular.',
      goldStandard: false,
      practicalLimitations:
        'Gato FeLV-positivo com displasia medular não é automaticamente portador de clone neoplásico irreversível; pode tratar-se de dismielopoiese reativa ao vírus com potencial reversão ou evolução para aplasia pura.',
      studyCitation: 'Hisasue et al. (2001); Feline Emergency and Critical Care Medicine (2ª ed.)',
    },
    {
      stepNumber: 5,
      title: 'Exames de imagem torácica e abdominal (Radiografia e Ultrassonografia)',
      subtitle: 'Estadiamento de hematopoiese extramedular e exclusão de mieloftise',
      timing: 'Investigação sistemática complementar',
      findings:
        'Radiografias torácicas geralmente sem alterações de parênquima pulmonar (a menos que haja pneumonia oportunista); ausência de linfadenopatia mediastinal típica de linfoma. Ultrassonografia abdominal pode revelar esplenomegalia e hepatomegalia difusas e homogêneas decorrentes de hematopoiese extramedular compensatória. Pesquisa negativa para massas sólidas neoplásicas primárias.',
      pathophysiologicalBasis:
        'A insuficiência medular transfere a tentativa de hematopoiese para órgãos do sistema mononuclear fagocitário abdominal (baço e fígado).',
      goldStandard: false,
      practicalLimitations:
        'A imagem não diferencia infiltração por MDS de infiltração linfomatosa ou hematopoiese extramedular benigna; serve para excluir tumores sólidos responsáveis por dismielopoiese secundária.',
      studyCitation: 'Withrow & MacEwen (6ª ed.)',
    },
    {
      stepNumber: 6,
      title: 'Aspirado citológico de medula óssea',
      subtitle: 'Avaliação detalhada da morfologia de precursores e contagem diferencial de blasts',
      timing: 'Procedimento diagnóstico chave',
      findings:
        'Espécime com celularidade aumentada ou normal, com partículas ricas em espículas medulares. Displasia evidente em >=10% das células de uma ou mais linhagens: (1) Série eritroide: precursores megaloblastoides, núcleos bizarros, binucleação, pontes intercromáticas, assincronia núcleo-citoplasmática; (2) Série granulocítica: metamielócitos e bastonetes gigantes, lobulação nuclear anormal, hipossegmentação; (3) Série megacariocítica: micromegacariócitos mononucleados, núcleos hipolobulados e dispersos. Proporção de blasts quantificada: <5% (MDS-RC / MDS-RCMD) ou 5% a 19% (MDS-EB).',
      pathophysiologicalBasis:
        'Reflete a expansão do clone neoplásico mielodisplásico com falha na maquinaria de montagem nuclear e transcricional durante a diferenciação celular.',
      goldStandard: false,
      practicalLimitations:
        'Pode ocorrer punção seca (dry tap) em decorrência de mielofibrose secundária extensa; a contagem de blastos requer contagem de pelo menos 300 a 500 células nucleadas.',
      studyCitation: 'Meredith et al. (2025); Weiss & Aird (2001); Jain et al. (1991)',
    },
    {
      stepNumber: 7,
      title: 'Core biopsy de medula óssea (Histopatologia)',
      subtitle: 'Avaliação de celularidade real, arquitetura tecidual e mielofibrose',
      timing: 'Simultâneo ao aspirado citológico — Padrão de Ouro de Avaliação Arquitetural',
      findings:
        'Fragmento ósseo intacto obtido com agulha de Jamshidi exibindo espaços intertrabeculares com celularidade hematopoética real preservada ou marcadamente aumentada (proporção hematopoiese:tecido adiposo > 50-70%). Ausência da substituição adiposa difusa característica da anemia aplástica. Demonstração de localização anormal de precursores imaturos (ALIP) e presença variável de mielofibrose intersticial confirmada por coloração especial de reticulina (Gomori ou impregnação argêntea). Exclusão categórica de substituição por metástases epiteliais, linfoma ou granulomas.',
      pathophysiologicalBasis:
        'A biópsia em fragmento preserva a arquitetura histológica espacial intacta, superando os artefatos de hemodiluição do aspirado e identificando a rede fibrótica reticulínica que aprisiona as células.',
      goldStandard: true,
      practicalLimitations:
        'Exige anestesia geral com monitorização rigorosa e preparo pré-transfusional se houver anemia severa ou trombocitopenia grave. Tempo de processamento histotécnico de 3 a 7 dias.',
      studyCitation: 'Meredith et al. (2025); Nelson & Couto (6ª ed.); Withrow & MacEwen (6ª ed.)',
    },
    {
      stepNumber: 8,
      title: 'Citometria de fluxo, imunofenotipagem e citoquímica medular',
      subtitle: 'Confirmação de linhagem mieloide e exclusão de neoplasias linfoides',
      timing: 'Quando houver elevação relevante de blastos medulares',
      findings:
        'Caracterização imunofenotípica da população de blastos medulares: positividade para marcadores mieloides como CD11b, CD14 (monocítico), MPO (mieloperoxidase) e CD34 (precursor/célula-tronco). Negatividade para marcadores linfoides clássicos como CD3 (linfócitos T) e CD79a/CD21 (linfócitos B). Citoquímica com mieloperoxidase e Sudan Black B positiva em linhagem mieloide.',
      pathophysiologicalBasis:
        'Define a origem fenotípica mieloide das células neoplásicas indiferenciadas, eliminando o diagnóstico diferencial de leucemia linfoide aguda (ALL) ou linfoma medular em estágio V.',
      goldStandard: false,
      practicalLimitations:
        'A citometria de fluxo não fecha o diagnóstico de MDS isoladamente (ajuda a caracterizar a linhagem dos blastos). Painéis moleculares complexos (citogenética/NGS) ainda não estão comercialmente padronizados para cães e gatos.',
      studyCitation: 'Meredith et al. (2025); ACVP Comparative Review',
    },
    {
      stepNumber: 9,
      title: 'Avaliação longitudinal seriada (Integração clínico-patológica)',
      subtitle: 'Monitorização da trajetória clonal e exclusão definitiva de causas reversíveis',
      timing: 'Reavaliações seriadas a cada 1 a 4 semanas',
      findings:
        'Acompanhamento do comportamento cinético das citopenias e da blastemia sanguínea e medular. Persistência de citopenias e atipias morfológicas mesmo após a suspensão de quaisquer fármacos e tratamento de afecções secundárias. Detecção de estabilidade clínica prolongada (MDS de baixo grau) ou progressão rápida com acúmulo de blastos (transformação em AML).',
      pathophysiologicalBasis:
        'O diagnóstico de MDS é essencialmente de integração clínico-patológica ao longo do tempo. Como ensina a clássica máxima hematológica, o filme da evolução biológica é muito mais decisivo do que a fotografia estática de uma única punção.',
      goldStandard: false,
      practicalLimitations:
        'Requer adesão rigorosa do tutor a coletas seriadas de sangue e aceitação de repetição de punção medular quando houver descompensação aguda.',
      studyCitation: 'Weiss & Aird (2001); Meredith et al. (2025)',
    },
  ],
  treatment: {
    principiosGeraisSemProtocoloPadrao:
      'Não existe atualmente diretriz consensual ACVIM ou protocolo terapêutico curativo validado para a síndrome mielodisplásica em cães e gatos (ACVIM Endorsed Statements; Feline Emergency and Critical Care Medicine, 2ª ed.). O manejo divide-se em três eixos pragmáticos: (1) Identificação e erradicação imediata de qualquer gatilho deflagrador de dismielopoiese secundária; (2) Terapia de suporte hematológico rigorosa voltada a manter a oxigenação tecidual e controlar infecções e sangramentos; (3) Em pacientes com MDS primária clonal de alto risco (especialmente MDS-EB com aumento progressivo de blastos), discussão multidisciplinar com oncologista veterinário sobre protocolos quimioterápicos citotóxicos e diferenciadores investigacionais.',
    tratamentoCausasSecundarias:
      'Se houver a mínima suspeita de dismielopoiese secundária reativa, a intervenção prioritária consiste em suspender imediatamente qualquer medicação em uso potencialmente mielotóxica (estrogênios, cloranfenicol, quimioterápicos, sulfonamidas, fenobarbital). Pacientes com suspeita de enteropatia perdedora ou deficiência nutricional devem receber suplementação de cobalamina (vitamina B12) parenteral (500 a 1.000 mcg SC semanal) e ácido fólico. Doenças infecciosas ou inflamatórias subjacentes devem ser tratadas de forma direcionada. Se houver componente imune comprovado ou suspeita de PIMA associada, institui-se corticoterapia imunomoduladora.',
    suporteTransfusionalHemacias:
      'A transfusão de concentrado de hemácias (pRBC) ou sangue total é a intervenção mais eficaz para resgate hemodinâmico do paciente anêmico sintomático. A indicação não deve ser pautada exclusivamente em um valor estático de hematócrito, mas sim em sinais clínicos de hipóxia celular: taquicardia em repouso, taquipneia, síncope, letargia profunda e lactato sérico elevado (>2,5 mmol/L). A dose recomendada de concentrado de hemácias é de 10 a 15 mL/kg IV (ou sangue total a 15 a 20 mL/kg IV), administrada lentamente em 2 a 4 horas com filtro de transfusão padrão (170 a 260 micra). Em felinos, a tipagem sanguínea para o sistema AB é obrigatória antes de qualquer infusão para evitar reações hemolíticas transfusionais agudas fatais mediadas por aloanticorpos naturais; o teste de compatibilidade cruzada (crossmatch) é mandatório se o animal já recebeu transfusões há mais de 4 dias. Deve-se conscientizar o tutor de que a transfusão não cura o clone mutado, atuando apenas como terapia de suporte biológico transitória (as hemácias transfundidas têm meia-vida de aproximadamente 20 a 30 dias em cães e 30 a 40 dias em gatos).',
    manejoNeutropeniaFebril:
      'Pacientes que apresentam neutropenia severa (contagem de neutrófilos segmentados < 1.000/mcL) associada a temperatura retal elevada (>= 39,3 °C) devem ser tratados como emergência médica sob suspeita de bacteremia/sepse decorrente de quebra na barreira de defesa mucosa. Devem ser coletadas hemocultura (duas amostras de sítios anatômicos distintos com intervalo de 30 min) e urocultura. Iniciar imediatamente antibioticoterapia parenteral bactericida empírica de amplo espectro por via intravenosa: Ampicilina-sulbactam (30 mg/kg IV q8h) associada a Enrofloxacino (5 a 10 mg/kg IV q24h em cães; em gatos, considerar Marbofloxacino 2 mg/kg IV q24h para evitar retinopatia induzida por fluoroquinolonas) ou Cefepima (30 a 40 mg/kg IV q8h). Procedimentos estressantes ou que provoquem lesões de mucosa (como termometria retal vigorosa ou enemas) devem ser terminantemente evitados.',
    fatoresCrescimentoHematopoetico:
      'O uso de fatores estimuladores de colônias de granulócitos (G-CSF recombinante humano / Filgrastim na dose de 3 a 5 mcg/kg SC q24h por 3 a 5 dias) e agentes estimuladores da eritropoiese (Eritropoietina recombinante humana / Alfaepoetina 100 U/kg SC 3 vezes por semana ou Darbepoetina alfa 0,5 a 1,0 mcg/kg SC semanal) tem sido relatado em literatura com sucesso variável. É imperativo compreender que esses fármacos são fatores de transcrição e crescimento que estimulam precursores existentes, mas não eliminam o defeito genético clonal da célula-tronco mutada. Além disso, o uso prolongado de proteínas recombinantes humanas em cães e gatos acarreta elevado risco de desenvolvimento de anticorpos neutralizantes cruzados anti-eritropoietina endógena, resultando em aplasia pura de série vermelha irreversível.',
    controversiaCorticosteroides:
      'O uso empírico de corticosteroides (prednisona ou prednisolona na dose imunossupressora de 1 a 2 mg/kg/dia VO) é controverso em MDS clonal pura, sem evidência científica demonstrando capacidade de eliminar o clone displásico (Feline Emergency and Critical Care Medicine, 2ª ed.). No estudo retrospectivo de Meredith et al. (2025), 31 de 42 cães (73,8%) receberam algum regime imunossupressor, frequentemente glicocorticoides, mas a resposta terapêutica foi heterogênea. A indicação de prova com prednisolona justifica-se quando não é possível descartar categoricamente dismielopoiese secundária imunomediada (IMHA/PIMA) ou citopenia imunomediada concorrente. O paciente deve ser monitorado com rigor quanto ao risco de infecções graves secundárias.',
    quimioterapiaMatsuyamaProtocoloCitarabinaDoxorrubicina:
      'Em cães portadores de síndrome mielodisplásica com excesso de blasts (MDS-EB) ou neoplasia mieloide avançada, o trabalho contemporâneo de Matsuyama et al. (2023) avaliou o protocolo combinado de doxorrubicina e citarabina em 11 cães (2 MDS, 4 MDS/AML e 5 AML). O protocolo administrado consistiu em Doxorrubicina na dose de 30 mg/m² IV administrada em infusão de 20 minutos, seguida por Citarabina na dose de 300 mg/m² IV em infusão contínua (CRI) durante 6 horas. Sete dos 11 cães (63,6%) alcançaram resolução completa das citopenias periféricas (incluindo 2/2 cães com MDS pura e 2/4 cães com MDS/AML), com mediana de duração de remissão de 344 dias e sobrevida global de 369 dias. A toxicidade clínica predominante foi de ordem gastrointestinal e mielossupressiva; contudo, ocorreram três eventos adversos graves de grau V, incluindo dois episódios de falência cardíaca induzida por doxorrubicina. Esse protocolo é de alta complexidade, restrito a centros oncológicos especializados com monitorização intensiva e ecocardiográfica.',
    azacitidinaEmFelinos:
      'A 5-azacitidina é um agente quimioterápico análogo de pirimidina que atua como inibidor da DNA-metiltransferase (agente hipometilante), amplamente utilizado no tratamento da MDS humana para reverter o silenciamento epigenético de genes supressores de tumor. Na medicina felina, Hisasue, Tanaka & Neo (2022) publicaram um relato seminal documentando uma gata de 5 anos com MDS, anemia não regenerativa profunda, trombocitopenia, bicitopenia e 19% de blasts na medula óssea tratada com azacitidina (doses escalonadas de 35 a 70 mg/m² por 3 a 5 dias consecutivos em 3 ciclos), combinada a prednisolona, vitamina K2 e transfusões. A paciente apresentou redução significativa da blastemia e da displasia medular, alcançando sobrevida prolongada superior a 1.474 dias (mais de 4 anos). Embora represente evidência de nível fraco por se tratar de caso único (n=1), constitui uma relevante prova de conceito para investigação futura na oncologia felina.',
    citarabinaBaixaDoseHistorica:
      'O uso de citarabina (citosina arabinosídeo / Ara-C) em regime de baixa dose contínua (10 mg/m² SC a cada 12 horas por 7 a 14 dias em ciclos mensais) é descrito em textos clássicos (Nelson & Couto, 6ª ed.) com o objetivo teórico de induzir diferenciação terminal dos clones mieloides neoplásicos. A resposta hematológica em cães e gatos costuma ser apenas transitória e modesta (remissões parciais com duração de poucas semanas), agregando o risco de mielossupressão aditiva.',
  },
  complications: {
    transformacaoEmLeucemiaMieloideAguda:
      'A progressão para Leucemia Mieloide Aguda (AML) ocorre em uma proporção substancial dos animais acometidos pela síndrome mielodisplásica, sendo estimada entre 20% e 40% em cães e gatos que não sucumbem precocemente às citopenias (Withrow & MacEwen, 6ª ed.; Nelson & Couto, 6ª ed.). O processo de transformação decorre da aquisição cumulativa de mutações que inibem a apoptose e bloqueiam de forma terminal a diferenciação dos mieloblastos. A transformação leucêmica é acompanhada de piora hiperaguda das citopenias, blastemia periférica explosiva, choque hemodinâmico e sobrevida extremamente curta (mediana de 6 dias na AML; Meredith et al., 2025).',
    choqueSepticoNeutropenico:
      'A neutropenia grave e a disfunção fagocítica dos granulócitos rompem as defesas do hospedeiro contra a flora bacteriana habitual do trato gastrointestinal e respiratório. O paciente pode evoluir subitamente com febre alta, bacteremia, choque endotóxico distributivo e falência de múltiplos órgãos antes que o foco infeccioso primário seja clinicamente detectável.',
    hemorragiaCatastrofica:
      'A combinação de trombocitopenia profunda com trombocitopatia adquirida expõe o paciente a sangramentos espontâneos fatais. Episódios de hemorragia pulmonar difusa, sangramento gastrointestinal maciço e hematomas intracranianos constituem causas comuns de óbito ou eutanásia humanitária de emergência.',
    prognosticoCenarioCaninoContemporaneo:
      'O prognóstico da síndrome mielodisplásica canina passou por uma importante reavaliação científica com a publicação do estudo de coorte de Meredith et al. (2025). Diferente dos livros clássicos antigos que retratavam a MDS como uniformemente devastadora com sobrevida de poucas semanas, o estudo padronizado com 70 cães demonstrou que a MDS apresenta curso substancialmente mais prolongado e favorável quando comparada à AML: a mediana de sobrevida para cães com MDS foi de 384 dias, em marcante contraste com os meros 6 dias observados na leucemia mieloide aguda (P < 0,001). O risco relativo instantâneo de morte em cães com MDS foi cerca de 5 vezes menor do que naqueles portadores de AML.',
    prognosticoFatoresPreditoresSobrevida:
      'No estudo de Meredith et al. (2025), os fatores associados de forma estatisticamente significante à sobrevida dos cães foram o peso corporal (cães de menor porte tenderam a apresentar cursos mais estáveis), a contagem total de leucócitos, a contagem de plaquetas e a porcentagem de blasts circulantes no sangue periférico. Cada acréscimo de um ponto percentual na blastemia periférica elevou proporcionalmente o risco de mortalidade. Curiosamente, a contagem percentual estática de blastos na medula óssea não atingiu significância estatística univariável nesse estudo, provavelmente refletindo variações de amostragem e heterogeneidade intrínseca da doença.',
    prognosticoFelino:
      'Nos felinos, a literatura científica permanece mais fragmentada. O prognóstico geral é reservado a desfavorável, com sobrevida média descrita historicamente variando de poucas semanas a alguns meses (Feline Emergency and Critical Care Medicine, 2ª ed.). No estudo clássico de Hisasue et al. (2001), 3 de 6 gatos com contagem elevada de blasts medulares evoluíram para AML, contra apenas 1 de 8 gatos com contagens baixas de blastos. Gatos FeLV-positivos com anemia grave e dependência transfusional frequente apresentam pior sobrevida.',
  },
  prevention: {
    controleFeLVEProfilaxia:
      'Em gatos, a prevenção primária da MDS associada a retrovírus baseia-se no controle estrito da infecção pelo vírus da leucemia viral felina (FeLV). As medidas preconizadas pelas diretrizes AAFP incluem: testagem sorológica de todos os felinos no momento da adoção, vacinação de todos os gatos com acesso a ambiente externo ou que convivam com indivíduos de status desconhecido, e isolamento rigoroso de gatos infectados.',
    farmacovigilanciaMielotoxica:
      'Prevenção de quadros de dismielopoiese secundária exige farmacovigilância veterinária ativa: evitar o uso indiscriminado de medicamentos com potencial mielotóxico conhecido (estrógenos em fêmeas para interrupção de gestação, cloranfenicol prolongado, sulfonamidas potencializadas em raças predispostas como Doberman). Em pacientes sob quimioterapia citotóxica ou imunossupressão crônica, realizar monitorização hematológica quinzenal a mensal.',
    vigilanciaCitopeniasCronicas:
      'Pacientes que apresentam citopenias leves e inexplicadas no hemograma de rotina devem ser acompanhados com hematologia seriada a cada 3 a 6 meses. O diagnóstico precoce de desordens mieloides em fases de baixo blasto permite melhor planejamento de suporte hemodinâmico e manejo preventivo de infecções antes que o animal descompense em crise aplásica ou séptica.',
  },
  relatedConsensusSlugs: [],
  relatedMedicationSlugs: ['prednisolona'],
  references: [
    {
      id: 'ref-meredith-2025',
      citationText:
        'Meredith AM, Beeler-Marfisi J, Berke O, Mutsaers AJ, Bienzle D. Standardized bone marrow assessment, risk variables, and survival in dogs with myelodysplastic syndrome and acute myeloid leukemia. Veterinary Pathology. 2025;62(1):64-73.',
      url: 'https://doi.org/10.1177/03009858241277982',
      evidenceLevel: 'Estudo de coorte padronizado (n=70)',
    },
    {
      id: 'ref-matsuyama-2023',
      citationText:
        'Matsuyama A, Beeler-Marfisi J, Richardson D, Woods JP, Mutsaers AJ. Treatment of myeloid neoplasia with doxorubicin and cytarabine in 11 dogs. Veterinary and Comparative Oncology. 2023;21(1):54-61.',
      url: 'https://doi.org/10.1111/vco.12860',
      evidenceLevel: 'Série clínica retrospectiva intervencional (n=11)',
    },
    {
      id: 'ref-hisasue-2022',
      citationText:
        'Hisasue M, Tanaka M, Neo S. A cat with myelodysplastic syndrome by administration of the methylation inhibitor Azacytidine. Journal of Veterinary Medical Science. 2022;84(1):142-148.',
      url: 'https://doi.org/10.1292/jvms.20-0352',
      evidenceLevel: 'Relato de caso clínico seminal com remissão prolongada',
    },
    {
      id: 'ref-weiss-aird-2001',
      citationText:
        'Weiss DJ, Aird B. Cytologic evaluation of primary and secondary myelodysplastic syndromes in the dog. Veterinary Clinical Pathology. 2001;30(2):67-75.',
      url: 'https://doi.org/10.1111/j.1939-165X.2001.tb00261.x',
      evidenceLevel: 'Estudo citomorfológico comparativo de medula (n=267)',
    },
    {
      id: 'ref-weiss-smith-2000',
      citationText:
        'Weiss DJ, Smith SA. Primary myelodysplastic syndromes of dogs: a report of 12 cases. Journal of Veterinary Internal Medicine. 2000;14(5):491-494.',
      url: 'https://doi.org/10.1111/j.1939-1676.2000.tb02264.x',
      evidenceLevel: 'Série de casos clínicos (n=12)',
    },
    {
      id: 'ref-hisasue-2001',
      citationText:
        'Hisasue M, Nagashima N, Nishigaki K, Fukasawa M, Kano R, Watari T, et al. Hematologic abnormalities and outcome of 16 cats with myelodysplastic syndromes. Journal of Veterinary Internal Medicine. 2001;15(5):471-477.',
      url: 'https://doi.org/10.1111/j.1939-1676.2001.tb01577.x',
      evidenceLevel: 'Estudo retrospectivo felino (n=16)',
    },
    {
      id: 'ref-weiss-2006',
      citationText:
        'Weiss DJ. Evaluation of dysmyelopoiesis in cats: 34 cases (1996-2005). Journal of the American Veterinary Medical Association. 2006;228(6):893-897.',
      url: 'https://doi.org/10.2460/javma.228.6.893',
      evidenceLevel: 'Série retrospectiva felina (n=34)',
    },
    {
      id: 'ref-jain-1991',
      citationText:
        'Jain NC, Blue JT, Grindem CB, Harvey JW, Kociba GJ, Krehbiel JD, et al. Proposed criteria for classification of acute myeloid leukemia in dogs and cats. Veterinary Clinical Pathology. 1991;20(3):63-82.',
      url: 'https://doi.org/10.1111/j.1939-165X.1991.tb00571.x',
      evidenceLevel: 'Diretriz histórica consensual FAB veterinária',
    },
    {
      id: 'ref-cha-2026',
      citationText:
        'Cha S, Kim H, Choi J, Lee K. Myelodysplastic/Myeloproliferative Neoplasm in a Dog: A Case Report. Veterinary Medicine and Science. 2026;12(1):e70722.',
      url: 'https://doi.org/10.1002/vms3.70722',
      evidenceLevel: 'Relato de caso de neoplasia sobreposta MDS/MPN',
    },
    {
      id: 'ref-withrow-6th',
      citationText:
        "Vail DM, Thamm DH, Liptak JM. Withrow & MacEwen's Small Animal Clinical Oncology. 6th ed. St. Louis: Elsevier; 2020. Cap. 33 (Canine AML, MPN and Myelodysplasia), p. 731-739.",
      evidenceLevel: 'Tratado de oncologia clínica veterinária de referência',
    },
    {
      id: 'ref-nelson-couto-6th',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020. Cap. 86 (Combined Cytopenias and Leukoerythroblastosis), p. 1384-1386; Cap. 80 (Leukemias), p. 1312-1313.',
      evidenceLevel: 'Tratado de medicina interna veterinária de referência',
    },
    {
      id: 'ref-feline-ecc-2nd',
      citationText:
        'Drobatz KJ, Beal MW, Syring RS. Feline Emergency and Critical Care Medicine. 2nd ed. Hoboken: Wiley Blackwell; 2023. Cap. 29 (Hematologic Emergencies: Anemia), p. 347-348.',
      evidenceLevel: 'Tratado de emergência e terapia intensiva felina',
    },
  ],
};
