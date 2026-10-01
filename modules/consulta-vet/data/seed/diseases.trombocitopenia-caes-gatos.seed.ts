import { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

export const trombocitopeniaCaesGatosSeed: DiseaseRecord = {
  id: 'disease-trombocitopenia-caes-gatos',
  slug: 'trombocitopenia-caes-gatos',
  title: 'Trombocitopenia em Cães e Gatos',
  subtitle: 'Abordagem diagnóstica e terapêutica das reduções plaquetárias por destruição imunomediada (ITP), falha de produção medular, consumo microvascular (CID/sepse) e sequestro esplênico',
  synonyms: [
    'trombocitopenia',
    'thrombocytopenia',
    'plaquetopenia',
    'trombocitopenia imunomediada',
    'ITP',
    'pITP',
    'baixa contagem de plaquetas'
  ],
  species: ['dog', 'cat'],
  category: 'hematologia',
  categories: ['hematologia', 'urgencia-emergencia', 'imunologia', 'oncologia'],
  tags: [
    'trombocitopenia',
    'plaquetas',
    'itp',
    'hemostasia-primaria',
    'petequias',
    'equimoses',
    'vincristina',
    'prednisolona',
    'pseudotrombocitopenia',
    'dogibat',
    'acvim',
    'romiplostim'
  ],
  isPublished: true,

  plainLanguage: DISEASE_PLAIN_LANGUAGE['trombocitopenia-caes-gatos'],

  quickSummary: 'A trombocitopenia é uma das síndromes hematológicas mais frequentes e desafiadoras na clínica médica e de terapia intensiva de cães e gatos. Definida como a contagem plaquetária inferior a 150.000 a 200.000/uL em cães e menor que 150.000 a 300.000/uL em gatos, o raciocínio fisiopatológico deve ser estruturado em cinco mecanismos fundamentais: destruição acelerada (primária ou secundária), produção medular diminuída, consumo microvascular, sequestro e perda/diluição. A pseudotrombocitopenia in vitro decorrente de agregação plaquetária induzida por EDTA é extremamente comum (afetando até 71% das amostras felinas), tornando a revisão microscópica do esfregaço de sangue periférico a regra de ouro inicial inviolável. Em animais com trombocitopenia grave (<20.000 a 30.000/uL), a trombocitopenia imunomediada (ITP) primária destaca-se como principal causa em cães, exigindo estabilização delicada com protocolo hands-off, corticoterapia contemporânea (prednisona 2 mg/kg/dia) e vincristina em dose única (0,02 mg/kg IV), que encurta a recuperação plaquetária de 5 para 2,5 a 3 dias (Balog et al., 2013). Em gatos, a pITP foi recentemente caracterizada em coorte contemporânea (Courtney et al., 2026), com sobrevida mediana superior a 1.000 dias, porém com taxa de recidiva de 59% e contraindicação formal e absoluta ao uso de azatioprina.',

  quickDecisionStrip: [
    'Regra número 1 inviolável: antes de qualquer conduta terapêutica agressiva, confirme a contagem real avaliando o esfregaço sanguíneo para descartar pseudotrombocitopenia por grumos em EDTA (presente em até 71% dos gatos).',
    'Não confunda macroplaquetopenia assintomática racial de Cavalier King Charles Spaniels (mutação no gene TUBB1) com doença: esses cães têm plaquetas gigantes funcionais, massa plaquetária total normal e nunca devem receber imunossupressão.',
    'Separe imediatamente trombocitopenia isolada de citopenias múltiplas: plaquetopenia isolada aponta fortemente para ITP ou consumo inicial; bicitopenia ou pancitopenia exige investigação prioritária de medula óssea.',
    'Diferenciação mandatória entre ITP e CID: na ITP isolada, os tempos de coagulação (PT e aPTT) e fibrinogênio são rigorosamente normais; tempos prolongados associados a D-dímeros elevados e esquizócitos indicam consumo microvascular por coagulopatia de consumo.',
    'Intensidade numérica orienta prioridade: contagens <20.000 a 30.000/uL elevam exponencialmente o risco de hemorragia espontânea primária; contagens entre 50.000 e 100.000/uL raramente sangram de forma espontânea sem trauma ou coagulopatia associada.',
    'Hemorragia gastrointestinal (melena) e elevação de nitrogênio ureico sanguíneo (BUN/ureia) desproporcional à creatinina são os marcadores clínicos mais fortes de mortalidade hospitalar em cães com ITP (O\'Marra et al., 2011).',
    'Protocolo contemporâneo ACVIM para ITP canina hemorrágica: iniciar prednisona a 2 mg/kg/dia VO associada a vincristina 0,02 mg/kg IV dose única lenta, acelerando a subida de plaquetas de 5 para 2,5 a 3 dias.',
    'Vincristina não é recomendada de rotina para ITP felina, e a azatioprina é FORMALMENTE CONTRAINDICADA EM GATOS pelo risco de aplasia medular fulminante fatal.',
    'Plasma fresco congelado (PFC) NÃO trata trombocitopenia isolada; transfusão de concentrado de plaquetas é estritamente indicada para hemorragia ativa com risco de morte (SNC, pulmão ou choque hemorrágico grave).',
    'Manejo de enfermagem hands-off rigoroso: proibir venopunção jugular, evitar injeções intramusculares e cistocentese, adotar repouso absoluto em gaiola estofada e realizar compressão prolongada (>5 minutos) em sítios venosos periféricos.'
  ],

  quickSummaryRich: {
    lead: 'Síndrome hematológica caracterizada pela queda crítica das plaquetas circulantes, comprometendo a formação do tampão hemostático primário e a integridade microvascular contínua, com risco iminente de hemorragias cutaneomucosas e viscerais fatais.',
    leadHighlights: [
      'Confirmação obrigatória por esfregaço periférico',
      'Classificação mecanística em 5 grupos',
      'Distinção crucial entre ITP primária e CID',
      'Glicocorticoide e vincristina em dose única no cão',
      'Contraindicação fatal de azatioprina em felinos'
    ],
    pillars: [
      {
        title: 'Fisiopatologia e Mecanismos Centrais',
        body: 'A hemostasia primária depende da contagem e da competência funcional das plaquetas. O declínio numérico resulta de cinco mecanismos: destruição acelerada imunomediada (opsonização por IgG e fagocitose esplênica), falência de produção na medula óssea (aplasia megacariocítica, mieloftise, toxinas), consumo microvascular contínuo (CID, sepse grave), sequestro esplênico e perda/diluição.',
        highlights: ['5 mecanismos clássicos', 'Opsonização por IgG', 'Fagocitose no baço e fígado']
      },
      {
        title: 'Reconhecimento Clínico e Escore DOGiBAT',
        body: 'A carência plaquetária manifesta-se tipicamente como hemorragia de hemostasia primária: petéquias puntiformes, equimoses, sufusões, epistaxe, hematúria e melena. O sistema padronizado DOGiBAT quantifica o sangramento em 9 sítios anatômicos, demonstrando que o risco hemorrágico clínico depende da integridade endotelial e não apenas da contagem numérica absoluta.',
        highlights: ['Petéquias e equimoses', 'Escore DOGiBAT', 'Melena como alerta crítico']
      },
      {
        title: 'Terapêutica Racional e Evidências ACVIM',
        body: 'O manejo da ITP primária fundamenta-se na supressão imune com prednisona (2 mg/kg/dia) e uso adjuvante de vincristina (0,02 mg/kg IV dose única), que estimula a liberação plaquetária e promove a depuração de macrófagos fagocitários. Agentes de segunda linha (micofenolato, ciclosporina) e modernos agonistas de TPO (romiplostim) resgatam casos refratários crônicos.',
        highlights: ['Prednisona 2 mg/kg/dia', 'Vincristina 0,02 mg/kg IV', 'Romiplostim em refratários']
      }
    ]
  },

  etiology: {
    definicaoEClassificacaoMecanistica: `A trombocitopenia é definida quantitativamente pela contagem de plaquetas abaixo do limite inferior de referência da espécie (<150.000 a 200.000/uL no cão e <150.000 a 300.000/uL no gato).

Cinco mecanismos fisiopatológicos fundamentais:
- Destruição aumentada acelerada: Imunomediada primária (pITP) ou secundária a infecções vetoriais, fármacos e neoplasias.
- Produção medular diminuída: Hipoplasia ou aplasia megacariocítica por toxicidade estrogênica (sertolioma), agentes quimioterápicos, retroviroses felinas (FeLV/FIV) ou invasão mielofítica neoplásica.
- Consumo microvascular contínuo: Coagulação intravascular disseminada (CID), sepse bacteriana grave, choque distributivo e vasculites generalizadas.
- Sequestro esplênico: Esplenomegalia congestiva por torção de pedículo, hipertensão portal grave ou vasodilatação farmacológica intensa.
- Perda hemorrágica e diluição: Hemorragia aguda maciça associada a ressuscitação volêmica agressiva com cristaloides isentos de plaquetas.`,

    hemostasiaPrimariaEFisiologiaPlaquetaria: `Fisiologia plaquetária e papel na hemostasia primária:
- Origem e sobrevida: Fragmentação citoplasmática de megacariócitos na medula óssea. Vida média de 5 a 7 dias no cão e apenas 2 a 4 dias no gato.
- Suporte trófico endotelial: Plaquetas liberam continuamente VEGF, bFGF e esfingosina-1-fosfato (S1P), nutrindo as células endoteliais e vedando microfissuras da lâmina basal capilar.
- Adesão subendotelial: Mediada pelo Fator de von Willebrand (vWF) ligando o colágeno subendotelial ao complexo glicoproteico plaquetário GPIb-IX.
- Ativação e secreção: Mudança conformacional, exteriorização de fosfatidilserina procoagulante e degranulação de grânulos densos (ADP, Ca²⁺, serotonina) e alfa (fibrinogênio, Fator V, vWF).
- Agregação plaqueta-plaqueta: Formação de pontes interplaquetárias de fibrinogênio através do receptor ativado GPIIb/IIIa.`,

    trombopoietinaERegulacaoMecanica: `Regulação da trombopoiese pelo eixo humoral da Trombopoietina (TPO):
- Síntese constitutiva: Produção hepática e tubular renal contínua de TPO liberada diretamente na circulação.
- Depuração mecânica por receptores: Plaquetas e megacariócitos expressam na membrana o receptor c-Mpl, que internaliza e degrada a TPO circulante por via lisossômica.
- Resposta a citopenias: Quando a massa plaquetária total cai (aplasia medular), a depuração diminui e a concentração sérica livre de TPO sobe, estimulando a poliploidização megacariocítica de resgate.
- Efeito inflamatório: Citocinas pró-inflamatórias sistêmicas (IL-6) deflagram aumento da transcrição hepática adicional de TPO em estados inflamatórios agudos.`,

    pseudotrombocitopeniaEDTADependente: `Artefato laboratorial in vitro por agregação plaquetária em EDTA:
- Mecanismo da aglutinação: O EDTA quela o cálcio plasmático e induz alteração conformacional na glicoproteína GPIIb/IIIa, expondo criptoantígenos a autoaglutininas pré-existentes (IgG/IgM).
- Erro no analisador hematológico: Contadores automáticos por impedância ou dispersão óptica não registram grumos como plaquetas isoladas, gerando laudos de trombocitopenia severa espúria.
- Prevalência na espécie felina: Riond et al. (2015) demonstraram que até 71% das amostras felinas colhidas em tubo de EDTA apresentam agregação plaquetária in vitro.

REGRA DE OURO: A avaliação microscópica imediata do esfregaço de sangue periférico é obrigatória antes de qualquer intervenção diagnóstica invasiva ou corticoterapia. Havendo grumos, repetir a coleta em tubo de citrato de sódio (fator de correção 1,1x).`,

    particularidadesRaciaisEGeneticas: `Peculiaridades benignas e macroplaquetopenias raciais:
- Cavalier King Charles Spaniel (CKCS): Mais de 50% dos animais são homozigotos para mutação autossômica recessiva no gene da beta-1 tubulina (TUBB1).
- Fenótipo hematológico: Menor número absoluto de plaquetas (30.000 a 100.000/uL), porém com plaquetas gigantes (macroplaquetas) funcionais e plaquetócrito normal.
- Outras raças com contagens basais fisiológicas menores: Galgos (Greyhounds: 120.000 a 200.000/uL), Norfolk Terriers, Cairn Terriers e Akita Inu.

CONTRAINDICAÇÃO FORMAL: Esses pacientes são perfeitamente saudáveis e assintomáticos; NUNCA devem receber corticoterapia, transfusões ou drogas imunossupressoras por contagens plaquetárias isoladas.`,

    fisiopatologiaDaItpPrimaria: `Imunopatogênese da Trombocitopenia Imunomediada Primária (pITP):
- Perda de autotolerância: Proliferação de clones auto-reativos de linfócitos B e produção de autoanticorpos IgG contra glicoproteínas de membrana (GPIIb/IIIa, GPIb-IX e GPIa/IIa).
- Opsonização e fagocitose esplênica: Macrófagos teciduais no baço e fígado reconhecem a fração Fc via receptores Fc-gama, promovendo fagocitose acelerada e reduzindo a sobrevida plaquetária para horas.
- Supressão intramedular concomitante: Autoanticorpos e linfócitos T CD8+ ativados ligam-se aos megacariócitos jovens, induzindo apoptose intramedular em 20% a 30% dos pacientes com ITP.`,

    trombocitopeniasInfecciosasEVetoriais: `Etiologias infecciosas e vetoriais em áreas endêmicas:
- Ehrlichia canis: Infecta monócitos e macrófagos, induzindo sequestro esplênico, destruição imune secundária e aplasia panmielofítica crônica.
- Anaplasma platys: Tropismo exclusivo por plaquetas, multiplicando-se no citoplasma e causando ciclos bacterêmicos de trombocitopenia infecciosa cíclica.
- Babesia spp. (B. vogeli, B. gibsoni): Estresse oxidativo eritrocitário, dano endotelial e consumo imunoinduzido simultâneo à hemólise (síndrome de Evans).
- Leishmania infantum: Vasculite sistêmica por imunocomplexos, hipergamaglobulinemia policlonal e mieloftise inflamatória crônica.
- Em Gatos: Deflagradores principais incluem retroviroses (FeLV e FIV), Mycoplasma haemofelis e Bartonella henselae.`,

    mielossupressaoETrombocitopeniaPorProducao: `Mielossupressão e falência de produção na medula óssea:
- Hiperestrogenismo canino: Tumores testiculares de células de Sertoli, tumores ovarianos de células da granulosa ou contato com estradiol tópico humano induzem aplasia medular grave bifásica com hipoplasia megacariocítica irreversível.
- Quimioterapia citotóxica: Doxorrubicina, carboplatina, ciclofosfamida e lomustina provocam nadir plaquetário entre o 7º e o 14º dia pós-administração.
- Fármacos indutores de discrasias e toxicidade medular: Sulfas potencializadas (sulfametoxazol-trimetoprima), cloranfenicol, fenobarbital, metimazol (em gatos) e azatioprina.`,

    consumoPorCIDESepsis: `Consumo microvascular acelerado:
- Coagulação Intravascular Disseminada (CID): Geração intravascular sistêmica desregulada de trombina e esgotamento de anticoagulantes endógenos geram microtrombos capilares ricos em fibrina que aprisionam as plaquetas.
- Sepse e Choque Séptico: Endotoxinas bacterianas (LPS), citocinas pró-inflamatórias (TNF-alfa, IL-1, IL-6) e armadilhas extracelulares de neutrófilos (NETs) ativam diretamente as plaquetas e lesam o glicocálice endotelial.`,

    sequestroEsplenicoEPerdaHemorragica: `Sequestro esplênico e perda hemorrágica com hemodiluição:
- Pool esplênico fisiológico: O baço armazena 30% a 40% da massa plaquetária corpórea em circulação contínua com o sangue periférico.
- Esplenomegalia congestiva massiva: Torção esplênica, trombose de veia porta/esplênica, hipertensão portal ou sedativos fenotiazínicos aprisionam até 60% a 80% do pool plaquetário no baço.
- Perda hemorrágica e diluição: Em sangramentos maciços com reposição agressiva por cristaloides sem plaquetas, a hemodiluição acentua drasticamente a plaquetopenia.`,

    tabelaMecanismosComparados: {
      headers: ['Mecanismo Fisiopatológico', 'Exemplos Clínicos Principais', 'Contagem Típica (uL)', 'Padrão no Hemograma', 'Achado de Medula Óssea'],
      rows: [
        ['Destruição Acelerada (ITP Primária)', 'Trombocitopenia imunomediada primária (pITP)', 'Muitas vezes <20.000 a 30.000', 'Plaquetopenia isolada; macroplaquetas frequentes', 'Hiperplasia megacariocítica (ou aplasia imune)'],
        ['Destruição Acelerada (Secundária)', 'Ehrlichiose, babesiose, neoplasias, reações a fármacos', 'Variável (10.000 a 80.000)', 'Plaquetopenia + anemia e/ou leucopenia/leucocitose', 'Megacariócitos normais ou aumentados'],
        ['Produção Diminuída (Medular)', 'Sertolioma (estrogênio), quimioterapia, FeLV, mieloftise', 'Frequentemente <30.000', 'Bicitopenia ou pancitopenia não regenerativa', 'Hipoplasia ou ausência de megacariócitos'],
        ['Consumo Microvascular', 'CID fulminante, choque séptico, pancreatite necrotizante', 'Habitualmente 30.000 a 100.000', 'Esquizócitos, tempos PT/aPTT prolongados', 'Celularidade variável dependente da causa'],
        ['Sequestro Esplênico / Perda', 'Torção esplênica, hemorragia maciça + fluidoterapia', 'Geralmente 50.000 a 120.000', 'Anemia hemorrágica associada, hipoproteinemia', 'Medula óssea normocelular a hipercelular'],
        ['Artefato (Pseudotrombocitopenia)', 'Aglutinação in vitro por EDTA (felinos 71%)', 'Geralmente espúria (<50.000)', 'Grumos na borda plumosa do esfregaço sanguíneo', 'Medula completamente normal']
      ]
    }
  },

  epidemiology: {
    epidemiologiaCaninaEPerfilRacial: `Epidemiologia canina e perfil racial na rotina clínica:
- Distribuição e faixa etária: Uma das afecções hemostáticas mais comuns; distribuição bimodal em cães de meia-idade a idosos (mediana de 4 a 8 anos).
- Predisposição sexual: Fêmeas caninas apresentam risco 1,5 a 2 vezes maior em comparação aos machos inteiros ou castrados.
- Raças predispostas a pITP: Cocker Spaniel (Americano e Inglês), Poodle (Miniatura e Standard), Bichon Frisé, Old English Sheepdog, Shih Tzu e Pastor Alemão.
- Contexto geográfico: Em regiões tropicais e subtropicais, as trombocitopenias infecciosas secundárias a hemoparasitoses (Ehrlichia canis, Babesia spp., Anaplasma spp.) superam numericamente a pITP em frequência hospitalar.`,

    particularidadesFelinasESerieCourtney2026: `Particularidades em felinos e evidências da série de Courtney et al. (2026):
- Desafio diagnóstico na espécie felina: Trombocitopenia verdadeira é menos comum que em cães, demandando distinção rigorosa de pseudotrombocitopenia por EDTA.
- Histórico e etiologias: Classicamente associada a retroviroses (FeLV/FIV), PIF ou neoplasias linfoproliferativas.
- Dados multicêntricos contemporâneos (Courtney et al. 2026, JAAHA; n = 17 gatos com pITP confirmada):
  - Sangramento ativo na apresentação: 88,2% dos felinos.
  - Mediana de contagem plaquetária: Apenas 10.000/uL.
  - Sobrevida global mediana: 1.067 dias com protocolos imunossupressores agressivos.
  - Padrão crônico de recidiva: 59% dos gatos apresentaram pelo menos um episódio de recidiva clínica.`,

    escoreDogibatAfericaoHemorragica: `Escore clínico hemorrágico DOGiBAT (Makielski et al. 2018):
- Validação clínica: Desenvolvido e validado em 61 cães com contagem plaquetária <50.000/uL.
- Dissociação clínica vs. numérica: A intensidade do sangramento não apresenta correlação linear direta estrita com a contagem absoluta; cães com 5.000 plaquetas/uL podem apresentar desde petéquias discretas até hemorragia alveolar maciça.
- Nove sítios anatômicos avaliados (pontuação de 0 a 2 em cada):
  - Pele e subcutâneo.
  - Cavidade oral e gengiva.
  - Trato gastrointestinal (hematêmese / melena).
  - Olhos e esclera (hifema / sufusões).
  - Cavidade nasal (epistaxe).
  - Trato urinário (hematúria).
  - Cavidades corpóreas (hemotórax / hemoabdome).
  - Sistema nervoso central.
  - Sítios de venopunção e instrumentação.

REGRA DE OURO: O escore DOGiBAT padronizado permite estratificar o risco de mortalidade na admissão e mensurar objetivamente a resposta diária à imunossupressão na UTI.`,

    fatoresPrognosticosIniciais: `Marcadores prognósticos de mortalidade hospitalar na ITP:
- Coorte seminal de O'Marra et al. (2011; n = 73 cães com ITP): Sobrevida global à alta hospitalar de 84%.
- Preditores independentes de óbito ou eutanásia: Melena macroscópica (hemorragia gastrointestinal alta) e elevação desproporcional de nitrogênio ureico (BUN/ureia) com creatinina preservada.
- Outros fatores de risco descritos:
  - Azotemia renal primária concomitante.
  - Necessidade de múltiplas transfusões de hemácias.
  - Hiperbilirrubinemia e hemólise ativa na síndrome de Evans (ITP + IMHA).
  - Hifema em câmara anterior e déficits neurológicos agudos por sangramento intracraniano.`
  },

  pathogenesisTransmission: {
    cascata: [
      '1. Quebra de autotolerância ou mimetismo molecular: deflagração de resposta autoimune com proliferação clonal de linfócitos B e secreção de autoanticorpos IgG contra glicoproteínas de membrana plaquetária (GPIIb/IIIa, GPIb-IX), seja de forma primária ou estimulada por antígenos infecciosos, farmacológicos ou neoplásicos.',
      '2. Opsonização plaquetária periférica: os anticorpos circulantes ligam-se avidamente aos receptores da superfície das plaquetas viáveis no leito vascular.',
      '3. Depuração esplênica e hepática acelerada: macrófagos do sistema mononuclear fagocitário reconhecem a fração Fc dos anticorpos via receptores Fc-gama, internalizando e destruindo as plaquetas por fagocitose e lise enzimática, reduzindo sua sobrevida de dias para poucas horas.',
      '4. Lesão endotelial microvascular contínua: a perda crítica do suporte trófico basal fornecido pelas plaquetas às junções endoteliais enfraquece a barreira vascular dos capilares e vênulas pós-capilares.',
      '5. Diapedese hemática e diátese de hemostasia primária: sob pressão hidrostática fisiológica, eritrócitos extravasam pelas fenestras endoteliais desnudas, originando petéquias, equimoses, sufusões e hemorragias em mucosas.',
      '6. Hemorragia em órgãos nobres e choque: progressão para sangramento gastrointestinal volumoso (melena), hemotórax, hemorragia pulmonar ou hemorragia intracraniana, culminando em hipovolemia, anemia aguda e óbito.'
    ],
    transmissao: 'A forma primária (pITP) é uma afecção imune endógena, não infecciosa e não contagiosa. As formas secundárias infecciosas dependem de vetores biológicos hematófagos (carrapatos Rhipicephalus sanguineus para Ehrlichia canis e Babesia vogeli; Ixodes spp. para Anaplasma phagocytophilum; flebotomíneos Lutzomyia/Phlebotomus para Leishmania infantum) ou transmissão horizontal/vertical de retrovírus em felinos (FeLV e FIV).'
  },

  pathophysiology: {
    dinamicaHemorragicaCutaneomucosa: `Diátese hemorrágica de hemostasia primária vs. secundária:
- Hemostasia primária defeituosa: Sangramento espontâneo superficial em mucosas e capilares cutâneos, diferente dos grandes hematomas intramusculares e hemartroses de coagulopatias secundárias (intoxicação por rodenticida, hemofilias).
- Petéquias puntiformes: Extravasamentos de hemácias (<2 a 3 mm) por brechas intercelulares endoteliais não seladas; diascopia negativa (não clareiam à digitopressão).
- Equimoses e sufusões: Confluência de múltiplos focos em áreas sujeitas a atrito e gravidade (virilha, axilas, abdome).
- Sangramento mucoso: Epistaxe e hemorragia gengival decorrentes da fragilidade contínua de mucosas expostas ao ambiente.`,

    permeabilidadeEndotelialERiscoSNC: `Estabilidade microvascular e risco de hemorragia no sistema nervoso central:
- Papel trófico plaquetário: Liberação contínua de fatores de crescimento (VEGF, bFGF, PDGF) e esfingosina-1-fosfato (S1P), que mantêm caderinas e ocludinas endoteliais coesas.
- Colapso da barreira em contagens extremas (<10.000/uL): Permeabilidade vascular patológica espontânea sem necessidade de trauma mecânico externo.
- Hemorragia no SNC: Micro-hemorragias encefálicas ou hematomas subdurais por quebra da barreira hematoencefálica, manifestando-se por ataxia vestibular súbita, anisocoria, convulsões e coma.`,

    hemorragiaGastrointestinalEMelena: `Mecanismo da hemorragia gastrointestinal e formação de melena:
- Microlesões mecânicas contínuas: Atrito fecal, peristaltismo e secreção cloridropéptica desgastam o epitélio gástrico e duodenal sem vedação plaquetária imediata.
- Formação de fezes em borra de café: Digestão da hemoglobina extravasada por proteases entéricas e conversão do heme em hematina escura pela microbiota cecocólica.
- Azotemia pré-renal hemorrágica: Digestão intraluminal maciça de sangue gera absorção hepática de aminoácidos e síntese excessiva de ureia, elevando o BUN/ureia com creatinina sérica inicial normal.`
  },

  clinicalSignsPathophysiology: [
    {
      system: 'Sinais Hemorrágicos Cutâneos e Mucosos (Hemostasia Primária)',
      findings: [
        {
          finding: 'Petéquias puntiformes em pele desprovida de pelos e mucosas',
          mechanism: 'Extravasamento de eritrócitos através de microbrechas endoteliais de capilares cutâneos e mucosos não seladas por tampões hemostáticos plaquetários ausentes.',
          clinicalMeaning: 'Achado clássico de carência plaquetária grave (quase invariavelmente associado a contagens <20.000 a 30.000/uL); investigar ITP primária imediatamente.',
          priority: 'emergency',
          context: ['Nelson & Couto 6a ed.', 'Garden et al. 2019']
        },
        {
          finding: 'Equimoses e sufusões coalescentes em abdome e virilhas',
          mechanism: 'Confluência de múltiplas hemorragias capilares e dissecção hemática na derme e tecido subcutâneo induzida por pequenos traumatismos locais ou gravidade.',
          clinicalMeaning: 'Indica diátese hemorrágica ativa e progressiva; requer repouso absoluto em gaiola estofada e manipulação mínima.',
          priority: 'emergency',
          context: ['Makielski et al. 2018 (DOGiBAT)']
        },
        {
          finding: 'Sangramento gengival espontâneo e petéquias em palato duro',
          mechanism: 'Lesão contínua da microvasculatura mucosa oral durante mastigação ou deglutição sem capacidade de hemostasia primária reparadora.',
          clinicalMeaning: 'Alerta crítico de risco hemorrágico sistêmico iminente; proibir dietas sólidas ou ossos duros.',
          priority: 'emergency',
          context: ['Plumb\'s 10a ed.']
        },
        {
          finding: 'Epistaxe unilateral ou bilateral espontânea',
          mechanism: 'Ruptura de capilares da mucosa dos cornetos nasais sob turbilhonamento de ar e pressão respiratória em animal trombocitopênico.',
          clinicalMeaning: 'Manifestação grave com risco de aspiração brônquica de sangue e pneumonia aspirativa associada.',
          priority: 'emergency',
          context: ['BSAVA Emergency 3a ed.']
        }
      ]
    },
    {
      system: 'Sinais Hemorrágicos Cavitários e Sistêmicos Graves',
      findings: [
        {
          finding: 'Melena profusa (fezes em borra de café) e hematêmese',
          mechanism: 'Extravasamento de sangue no lúmen gástrico e entérico superior, digerido por proteases e convertido em hematina escura no cólon.',
          clinicalMeaning: 'Marcador independente mais forte de mortalidade e pior prognóstico hospitalar na ITP canina (O\'Marra et al., 2011).',
          priority: 'emergency',
          context: ['O\'Marra et al. 2011']
        },
        {
          finding: 'Hematúria macroscópica em ausência de trauma ou cálculo',
          mechanism: 'Hemorragia dos capilares glomerulares e uroteliais vesicais desprovidos de estabilização plaquetária de barreira.',
          clinicalMeaning: 'Presente em proporção relevante de casos graves; contraindica formalmente cistocentese ou cateterismos agressivos.',
          priority: 'emergency',
          context: ['Lippi et al. 2019']
        },
        {
          finding: 'Hifema em câmara anterior do olho e hemorragia retiniana',
          mechanism: 'Extravasamento dos vasos uveais e coriorretinianos sob pressão intraocular fisiológica.',
          clinicalMeaning: 'Risco iminente de cegueira definitiva e forte preditor de micro-hemorragias simultâneas no sistema nervoso central.',
          priority: 'emergency',
          context: ['Ettinger 9a ed. 2024']
        },
        {
          finding: 'Déficits neurológicos súbitos, ataxia vestibular ou convulsões',
          mechanism: 'Micro-hemorragias intraparenquimatosas encefálicas ou hematomas subdurais decorrentes do colapso da barreira hematoencefálica.',
          clinicalMeaning: 'Complicação de extrema gravidade com risco iminente de herniação transtentorial e óbito rápido.',
          priority: 'emergency',
          context: ['Courtney et al. 2026']
        }
      ]
    },
    {
      system: 'Sinais Sistêmicos da Doença de Base e Hipovolemia',
      findings: [
        {
          finding: 'Palidez marcante de mucosas e taquicardia compensatória',
          mechanism: 'Anemia aguda decorrente de perda volêmica hemorrágica contínua ou hemólise extravascular concomitante (síndrome de Evans).',
          clinicalMeaning: 'Indica choque hipovolêmico ou hipóxia tecidual iminente; avaliar necessidade imediata de concentrado de hemácias.',
          priority: 'emergency',
          context: ['Feline ECC 2a ed.']
        },
        {
          finding: 'Febre ou hipotermia sistêmica',
          mechanism: 'Sepse grave de foco bacteriano com CID de consumo, ou liberação maciça de pirogênios endógenos em hemoparasitoses ativas.',
          clinicalMeaning: 'Afasta ITP primária isolada simples e exige triagem prioritária de patógenos vetoriais ou foco infeccioso oculto.',
          priority: 'emergency',
          context: ['Greene\'s Infectious Diseases 5a ed.']
        },
        {
          finding: 'Esplenomegalia ou linfadenomegalia generalizada palpável',
          mechanism: 'Hiperplasia reativa do sistema mononuclear fagocitário, infiltração neoplásica (linfoma, leucemia) ou infecção granulomatosa (Leishmania).',
          clinicalMeaning: 'Guia direcionamento imediato para imagem abdominal e biópsia/citologia de órgãos linfoides.',
          priority: 'common',
          context: ['Nelson & Couto 6a ed.']
        }
      ]
    }
  ],

  diagnosis: [
    {
      stepNumber: 1,
      title: 'Confirmação Visual no Esfregaço de Sangue Periférico e Exclusão de Pseudotrombocitopenia',
      purpose: 'Confirmar se a trombocitopenia é real e afastar artefato de agregação in vitro em EDTA',
      description: 'Coleta de sangue venoso periférico limpo com agulha de calibre adequado (21G a 23G) por venopunção rápida e atraumática (preferencialmente veia cefálica ou safena lateral/medial, NUNCA puncionar jugular em paciente com suspeita de trombocitopenia severa). Confeccionar imediatamente um esfregaço sanguíneo de alta qualidade na borda de uma lâmina antes de homogeneizar ou colocar no tubo. Realizar coloração panótica e examinar em microscopia óptica com objetiva de imersão (100x). Varrer minuciosamente a borda plumosa (feathered edge) e as margens laterais da lâmina procurando agregados ou grumos plaquetários. Se ausentes, estimar a contagem multiplicando a média de plaquetas por campo em 10 campos homogêneos da monocamada pelo fator de 15.000 a 20.000 (normal: 8 a 15 plaquetas por campo de imersão). Se houver grumos no tubo de EDTA, colher nova amostra em tubo de citrato de sódio (tubo de tampa azul com correção do fator de diluição líquida multiplicando a contagem automatizada por 1,1).',
      interpretation: 'Presença de agregados plaquetários confirma pseudotrombocitopenia (especialmente em gatos, com até 71% de ocorrência, e em cães com punções lentas). Ausência de plaquetas isoladas e de grumos confirma trombocitopenia verdadeira. Identificação de plaquetas gigantes isoladas (macroplaquetas) em Cavalier King Charles Spaniel sem sangramento confirma macroplaquetopenia hereditária benigna.',
      limitations: 'Plaquetas muito pequenas ou desgranuladas em analisadores antigos de impedância podem ser mal categorizadas; o olho clínico no esfregaço permanece soberano.',
      isGoldStandard: true
    },
    {
      stepNumber: 2,
      title: 'Triagem Laboratorial Integrada — Hemograma, Reticulócitos e Fração de Plaquetas Imaturas (IPF)',
      purpose: 'Diferenciar trombocitopenia isolada de citopenias múltiplas e mensurar atividade megacariocítica',
      description: 'Hemograma computadorizado com contagem automatizada por citometria de fluxo óptica fluorescente. Avaliar rigorosamente os índices eritrocitários (hematócrito, VCM, CHCM, RDW), contagem absoluta de reticulócitos e leucometria completa com contagem diferencial de leucócitos. Avaliar o volume plaquetário médio (MPV) e a fração de plaquetas imaturas (IPF / reticulated platelets).',
      interpretation: 'Trombocitopenia profunda (<20.000 a 30.000/uL) estritamente ISOLADA com série vermelha e branca normais aponta quase invariavelmente para ITP primária (ou fase ultraprecoce de hemoparasitose/fármaco). Bicitopenia (anemia + plaquetopenia) pode indicar perda hemorrágica, síndrome de Evans (esferócitos presentes e Coombs positivo) ou doença medular. Pancitopenia (anemia não regenerativa + leucopenia + plaquetopenia) aponta obrigatoriamente para falência medular central (aplasia por estrogênio, mieloftise, quimioterapia, FeLV). IPF elevado (>5% a 10%) demonstra trombopoiese medular acelerada e regenerativa periférica.',
      limitations: 'MPV pode estar falsamente normal em hipoplasia megacariocítica concomitante; IPF requer analisadores modernos dotados de canal de fluorescência óptica (Sysmex XN-V).',
      isGoldStandard: false
    },
    {
      stepNumber: 3,
      title: 'Painel de Coagulação (PT, aPTT, Fibrinogênio, D-Dímeros) — Diferenciação de CID e Consumo',
      purpose: 'Diferenciar imediatamente destruição imune de coagulopatia de consumo microvascular difusa',
      description: 'Colheita estéril e atraumática em tubo com citrato de sódio a 3,2% (proporção exata de 9 partes de sangue para 1 parte de anticoagulante). Determinação laboratorial do tempo de protrombina (PT / via extrínseca e comum), tempo de tromboplastina parcial ativada (aPTT / via intrínseca e comum), concentração plasmática de fibrinogênio por método de Clauss e dosagem quantitativa de D-dímeros. Avaliar esfregaço procurando esquizócitos (eritrócitos fragmentados por traves de fibrina).',
      interpretation: 'Na trombocitopenia imunomediada isolada (pITP), o PT, aPTT e fibrinogênio permanecem RIGOROSAMENTE NORMAIS, e D-dímeros estão basais ou discretamente reativos. Na CID de consumo, observa-se prolongamento expressivo de PT e/ou aPTT (>25% a 50% acima do controle), hipofibrinogenemia, elevação maciça de D-dímeros (>500 a 1000 ng/mL) e presença conspícua de esquizócitos.',
      limitations: 'Fases hipercoaguláveis iniciais de CID podem apresentar tempos de coagulação ainda normais ou paradoxalmente encurtados.',
      isGoldStandard: false
    },
    {
      stepNumber: 4,
      title: 'Investigação Infecciosa Vetorial e Sorologias/PCR Específicas',
      purpose: 'Identificar gatilhos infecciosos secundários que exigem terapia etiológica e contraindicam imunossupressão isolada',
      description: 'Painel diagnóstico de doenças transmitidas por vetores (Vector-Borne Diseases): teste sorológico rápido (SNAP 4Dx ou ELISA quantitativo) associado a PCR em tempo real (qPCR) em sangue total para Ehrlichia canis, Anaplasma phagocytophilum, Anaplasma platys, Babesia vogeli/gibsoni e Leishmania infantum (em cães). Em gatos, realizar teste ELISA/Imunocromatografia para antígeno p27 de FeLV e anticorpos anti-FIV, acompanhado de PCR para Mycoplasma haemofelis e Bartonella henselae.',
      interpretation: 'Positividade em PCR confirma infecção ativa e estabelece o diagnóstico de trombocitopenia infecciosa secundária (ou ITP secundária mediada por patógeno), exigindo antibioticoterapia direcionada imediata com doxiciclina ou antiprotozoários.',
      limitations: 'Fases hiperagudas podem ter sorologia negativa (janela imunológica); animais cronicamente infectados em áreas endêmicas podem ter títulos sorológicos residuais sem que o microrganismo seja o responsável atual pela diátese aguda.',
      isGoldStandard: false
    },
    {
      stepNumber: 5,
      title: 'Diagnóstico por Imagem (Ultrassonografia Abdominal e Radiografia Torácica)',
      purpose: 'Rastrear neoplasias ocultas, linfonodomegalias, massas esplênicas e hemorragias cavitárias',
      description: 'Ultrassonografia abdominal total detalhada para avaliar arquitetura esplênica (padrão em queijo suíço, nódulos ou massas de hemangiossarcoma/linfoma), parênquima hepático, linfonodos mesentéricos, adrenais e integridade do trato urogenital. Radiografias de tórax em três projeções ortogonais (lateral direita, lateral esquerda e ventrodorsal) para investigar metástases pulmonares, linfadenomegalia esternal ou traqueobrônquica e sinais de hemorragia alveolar ou efusão pleural.',
      interpretation: 'Detecção de esplenomegalia com nódulos cavitários suspeitos aponta para trombocitopenia secundária oncológica (hemangiossarcoma) ou sequestro. Esplenomegalia homogênea leve a moderada é achado reativo comum e inespecífico na pITP decorrente de hiperplasia macrofágica compensatória.',
      limitations: 'Presença de líquido livre abdominal pode exigir punção diagnóstica de resgate; em trombocitopênicos severos, centese deve ser executada com técnica delicada guiada por ultrassom.',
      isGoldStandard: false
    },
    {
      stepNumber: 6,
      title: 'Avaliação de Medula Óssea (Mielograma Citológico e Core Biopsy)',
      purpose: 'Diferenciar falha de produção central de destruição periférica em casos com citopenias múltiplas',
      description: 'Aspiração de medula óssea (crista ilíaca, trocânter maior do fêmur ou tuberosidade umeral) sob sedação apropriada e anestesia local, associada a biópsia por agulha de Jamshidi se houver suspeita de mielofibrose ou aplasia. Procedimento indicado estritamente quando houver bicitopenia/pancitopenia inexplicada, trombocitopenia profunda sem resposta a 7 a 14 dias de imunossupressão ou suspeita de hiperestrogenismo/neoplasia hematopoética.',
      interpretation: 'Na pITP clássica: hiperplasia megacariocítica marcante com predomínio de megacariócitos imunes ou maduros vacuolizados e relação mieloide:eritroide preservada. Na aplasia por estrogênio ou drogas: hipoplasia megacariocítica severa com substituição adiposa (>70% a 90% de gordura) e ausência de precursores. Na mieloftise: infiltração neoplásica por blastos leucêmicos, células linfomatosas ou mastócitos.',
      limitations: 'Procedimento invasivo que envolve pequeno risco de hemorragia no sítio de punção cortical; na trombocitopenia isolada com resposta terapêutica favorável, a punção de medula é desnecessária e dispensável.',
      isGoldStandard: false
    },
    {
      stepNumber: 7,
      title: 'Ensaios Imunológicos Específicos (Anticorpos Antiplaquetários e Citometria de Fluxo)',
      purpose: 'Documentar a presença de imunoglobulinas ligadas à superfície plaquetária',
      description: 'Ensaios especializados de citometria de fluxo para detecção de imunoglobulinas de membrana ligadas a plaquetas (Platelet-Surface-Bound Immunoglobulins - PSBIgG / PSBIgM). O ensaio quantifica a fluorescência de anticorpos secundários antiespécie conjugados a fluorocromos ligando-se às plaquetas do paciente.',
      interpretation: 'Sensibilidade descrita na literatura é moderada a alta (80% a 90%), porém a especificidade é limitada (60% a 80%), pois anticorpos antiplaquetários secundários e deposição inespecífica de imunocomplexos ocorrem frequentemente em neoplasias, infecções por vetores e inflamações sistêmicas.',
      limitations: 'Disponibilidade restrita a laboratórios de referência universitários e custo elevado; o resultado raramente altera a conduta emergencial imediata na admissão.',
      isGoldStandard: false
    }
  ],

  treatment: {
    metaPrimaria: 'Cessar a destruição acelerada imune de plaquetas, elevar rapidamente a contagem para níveis hemostáticos seguros (>40.000 a 50.000/uL), estabilizar a integridade endotelial microvascular e prevenir hemorragias fatais em sistema nervoso central, trato gastrointestinal ou parênquima pulmonar.',

    estabilizacaoEmergencialECuidadosHandsOff: `Protocolo de estabilização emergencial e cuidados de enfermagem (Hands-off):
- População crítica: Pacientes com trombocitopenia grave (<20.000 a 30.000/uL).
- Regra de ouro da venopunção: NUNCA puncionar a veia jugular (risco de hematoma expansivo cervical e asfixia por compressão traqueal); puncionar exclusivamente veias cefálicas ou safenas.
- Compressão pós-punção: Manter compressão manual firme e contínua no sítio por pelo menos 5 a 10 minutos com fita suave não garroteada.
- Proibições de procedimentos invasivos: Proibidas injeções intramusculares, cistocentese e cateterismos uretrais forçados.
- Ambiente e repouso estrito: Canil/gatil acolchoado com superfícies de espuma viscoelástica macia, sem grades pontiagudas ou pisos escorregadios.
- Manejo do estresse e agitação: Evitar latidos vigorosos e agitação; sedação suave se necessário.
- Dieta pastosa: Fornecer exclusivamente alimento úmido para evitar abrasão mecânica da orofaringe e esôfago.`,

    terapiaImunossupressoraPrimeiraLinhaGlicocorticoides: `Glicocorticoides como primeira linha de indução na pITP (Consenso ACVIM 2019):
- Mecanismo triplo integrado:
  - Inibição imediata da fagocitose de plaquetas opsonizadas por bloqueio dos receptores Fc-gama dos macrófagos esplênicos.
  - Estabilização da barreira microvascular endotelial em 24 a 48 horas (reduz sangramento mesmo antes da recuperação numérica).
  - Redução da síntese de novos autoanticorpos pelos linfócitos B a médio prazo.

Posologias recomendadas:
- Em Cães: Prednisona ou prednisolona na dose de 2 mg/kg/dia VO (dividida em 1 mg/kg a cada 12 horas ou dose única matinal). Doses antigas de 3 a 4 mg/kg estão proscritas por elevado risco de úlcera perfurada, pancreatite e sepse sem ganho terapêutico.
- Em Gatos: Prednisolona a 2 a 3 mg/kg/dia VO. Gatos não realizam conversão hepática adequada de prednisona, exigindo a molécula já ativada (prednisolona).
- Pacientes instáveis ou com vômitos: Dexametasona 0,1 a 0,2 mg/kg IV a cada 24 horas como substituto temporário.`,

    protocoloVincristinaDoseUnica: `Adjuvância com Vincristina em Dose Única (Evidência Padrão-Ouro):
- Eficácia clínica comprovada (ensaio clínico duplo-cego de Balog et al. 2013, JVIM): Reduz o tempo mediano para recuperação plaquetária segura (>40.000/uL) de 5 dias para apenas 2,5 a 3 dias, reduzindo custos e tempo de internação.
- Mecanismo de ação: Estimula a fragmentação e liberação acelerada de plaquetas por megacariócitos medulares; plaquetas que incorporam vincristina induzem apoptose e paralisia transitória nos macrófagos fagocitários esplênicos.
- Posologia no cão: 0,02 mg/kg IV (ou 0,5 mg/m²) em bolus lento de dose ÚNICA na admissão.

ALERTA FARMACOLÓGICO: A vincristina é vesicante tecidual extremamente potente. Administrar obrigatoriamente através de cateter intravenoso recém-colocado e testado com fluxo livre de salina antes e após a injeção. Não é indicada de rotina na espécie felina.`,

    imunoglobulinaHumanaIntravenosahIVIG: `Imunoglobulina Humana Intravenosa (hIVIG) de Resgate:
- Indicações estritas: Cães com pITP aguda grave refratária, hemorragias profusas ameaçadoras à vida ou contraindicação a doses plenas de glicocorticoides (úlceras ativas, sepse bacteriana concorrente).
- Mecanismo de ação: Bloqueio estequiométrico e competitivo imediato dos receptores Fc-gama dos macrófagos, interrompendo a depuração plaquetária em 12 a 24 horas.
- Posologia: 0,5 a 1,0 g/kg IV em infusão contínua lenta ao longo de 6 a 12 horas.
- Limitações e riscos: Custo financeiro elevado, disponibilidade variável e risco de anafilaxia; gera imunogenicidade com anticorpos anticobaia em 7 a 14 dias, inviabilizando repetições tardias.`,

    segundaLinhaImunossupressoraMMFCiclosporina: `Indicações e seleção de imunossupressores de segunda linha:
- Quando associar: Cães com ITP de alto risco hemorrágico (DOGiBAT elevado, melena), ou pacientes com resposta insuficiente aos glicocorticoides após 5 a 7 dias.

Opções farmacológicas:
- Micofenolato de Mofetila (MMF): Droga de escolha no cão; inibe a inosina monofosfato desidrogenase (IMPDH) e bloqueia a síntese de purinas em linfócitos. Dose: 10 a 15 mg/kg VO a cada 12 horas. Início de ação rápido (24 a 48 horas); monitorar diarreia gastrointestinal autolimitada.
- Ciclosporina microemulsionada: Inibidor da calcineurina que bloqueia IL-2. Dose: 5 mg/kg VO a cada 12 ou 24 horas. Início de ação pleno requer 1 a 2 semanas.
- Azatioprina: Opção clássica no cão (2 mg/kg VO q24h por 14 dias, depois q48h). Início de ação lento (2 a 4 semanas); exige monitoramento de ALT e hemograma.`,

    alertaMaximoAzatioprinaToxicidadeFelina: `CONTRAINDICAÇÃO FORMAL: A Azatioprina é terminantemente contraindicada e fatal na espécie felina:
- Deficiência enzimática congênita: Felinos apresentam atividade mínima da enzima tiopurina metiltransferase (TPMT), incapaz de inativar metabólitos citotóxicos da droga.
- Consequência clínica: Acúmulo de 6-tioguanina na medula óssea, deflagrando aplasia panmielofítica fulminante, neutropenia profunda irreversível, sepse e morte.
- Alternativas seguras em gatos: Caso seja necessário um segundo imunossupressor adjuvante à prednisolona no gato, utilizar Ciclosporina microemulsionada (5 a 7 mg/kg/dia VO) ou Clorambucil (0,1 a 0,2 mg/kg VO a cada 24 a 48 horas).`,

    antimicrobianosEmpiricosDoxiciclina: `Terapia antimicrobiana empírica em áreas endêmicas de vetores:
- Racional: Todo cão ou gato com trombocitopenia profunda deve receber Doxiciclina na admissão enquanto se aguardam resultados de PCR e sorologias vetoriais.
- Espectro de cobertura: Eficaz contra Ehrlichia canis, Anaplasma platys, Anaplasma phagocytophilum, Mycoplasma haemofelis e Bartonella spp.
- Posologia: 10 mg/kg VO a cada 24 horas (ou 5 mg/kg VO a cada 12 horas) por 28 dias consecutivos.

ALERTA FARMACOLÓGICO: Em felinos, a ingestão de comprimidos de doxiciclina sem água provoca esofagite necrotizante e estenose cicatricial grave. Administrar obrigatoriamente com 5 a 10 mL de água fresca ou em pasta líquida.`,

    estrategiaTransfusionalPlaquetasEConcentrado: `Racional fisiopatológico da hemoterapia na trombocitopenia:
- Concentrado de Plaquetas (fresco, criopreservado ou liofilizado): NÃO utilizar profilaticamente apenas para corrigir números na ITP, pois os autoanticorpos destroem as plaquetas transfundidas em horas. Indicação restrita a hemorragias ativas com risco de vida iminente (SNC, hemotórax maciço) ou cirurgias de emergência.
- Plasma Fresco Congelado (PFC): NÃO contém plaquetas funcionais e NÃO serve para tratar trombocitopenia isolada; indicado apenas se houver coagulopatia secundária (CID com prolongamento de PT/aPTT).
- Concentrado de Hemácias: Indicado na anemia aguda hipóxica descompensada por perda hemorrágica contínua (hematócrito <15% a 18%, taquicardia severa, hiperlactatemia >2,5 mmol/L).
- Sangue total fresco (<4 a 6 horas): Alternativa na ausência de componentes fracionados para suporte conjunto de eritrócitos e hemostasia.`,

    agonistasDoReceptorDeTPO: `Agonistas miméticos do receptor de trombopoietina (TPO-RAs):
- Inovação terapêutica: Romiplostim liga-se especificamente ao receptor c-Mpl em progenitores megacariocíticos, estimulando proliferação celular rápida e sobrevida plaquetária.
- Evidências contemporâneas (Logtenberg et al. 2026): Cães com pITP crônica refratária ou hipoplasia megacariocítica alcançaram remissão completa sustentada com doses de 3 a 5 mcg/kg SC a cada 7 dias.
- Vantagem clínica: Permite o desmame seguro e total de glicocorticoides em pacientes dependentes de esteroides sem efeitos adversos relevantes.`,

    desmameSeguroEProtocoloDeManutencao: `Protocolo escalonado de desmame e manutenção da imunossupressão (ACVIM):

1. Fase de consolidação inicial
- Manter a dose plena de indução de prednisona (2 mg/kg/dia) por pelo menos 2 a 4 semanas após normalização sustentada das plaquetas (>150.000 a 200.000/uL).

2. Reduções graduais programadas
- Reduzir a dose em aproximadamente 25% a cada 2 a 4 semanas, desde que o hemograma realizado 48 horas antes comprove estabilidade plaquetária normal.

3. Manejo de protocolo duplo
- Em animais recebendo corticoide + micofenolato/ciclosporina, desmamar completamente o corticoide primeiro, mantendo a segunda droga em monoterapia por 4 a 8 semanas antes de iniciar seu desmame.

4. Duração total do tratamento
- A duração total média da terapia imunossupressora na pITP varia de 4 a 6 meses para prevenir recidivas fulminantes.`,

    praticasInadequadasEArmadilhas: `Condutas contraindicadas e armadilhas na rotina clínica:
- CONTRAINDICAÇÃO FORMAL: NUNCA prescrever anti-inflamatórios não esteroidais (AINEs como meloxicam, carprofeno, firocoxib), pois bloqueiam a COX-1 e anulam o tromboxano A2 (TXA2), paralisando as poucas plaquetas funcionais e deflagrando hemorragia gastrointestinal maciça.
- CONTRAINDICAÇÃO FORMAL: NUNCA administrar azatioprina a felinos pelo risco de toxicidade medular letal irreversível por deficiência de TPMT.
- PROCEDIMENTO VETADO: NUNCA puncionar veia jugular ou realizar cistocentese em animais com trombocitopenia severa.
- EVITAR PRÁTICA EMPÍRICA: Não prescrever gastroprotetores (omeprazol) preventivos contínuos para todo cão recebendo prednisolona sem sangramento gastrointestinal ativo comprovado, evitando disbiose entérica.`,

    monitoramentoHematologicoSeriado: `Monitoramento laboratorial seriado e metas clínicas:
- Durante a internação na UTI:
  - Avaliação do escore hemorrágico DOGiBAT a cada 12 horas.
  - Contagem de plaquetas diária nos primeiros 3 a 5 dias até tendência evidente de recuperação (>40.000 a 50.000/uL).
  - Hematócrito e proteínas plasmáticas totais (PPT) a cada 12 a 24 horas para detecção de sangramento oculto.
  - Perfil bioquímico renal (ureia, creatinina) e eletrólitos a cada 48 horas.
- Acompanhamento ambulatorial pós-alta:
  - Hemograma completo semanal no primeiro mês de tratamento.
  - Hemograma a cada 2 a 3 semanas durante as etapas de redução medicamentosa.
  - Retorno imediato caso o tutor note novas petéquias ou letargia.`
  },

  complications: [
    {
      complication: 'Hemorragia gastrointestinal grave e choque hipovolêmico',
      frequency: 'Comum em casos graves (25% a 35%)',
      clinicalImplication: 'Extravasamento contínuo de sangue na mucosa digestiva manifestando-se por melena e azotemia pré-renal hemorrágica; constitui o principal fator preditor de óbito hospitalar (O\'Marra et al., 2011).'
    },
    {
      complication: 'Hemorragia no sistema nervoso central (intracraniana / subdural)',
      frequency: 'Rara a incomum (2% a 5%)',
      clinicalImplication: 'Micro-hemorragias intraparenquimatosas cerebrais ou troncoencefálicas que deflagram convulsões, coma e herniação cerebral com mortalidade superior a 80%.'
    },
    {
      complication: 'Hifema e descolamento hemorrágico de retina',
      frequency: 'Incomum (5% a 10%)',
      clinicalImplication: 'Sangramento intraocular em câmara anterior e posterior com risco de cegueira definitiva permanente por glaucoma secundário ou atrofia retiniana.'
    },
    {
      complication: 'Síndrome de Evans (IMHA associada a ITP)',
      frequency: 'Descrita em 10% a 15% dos casos caninos',
      clinicalImplication: 'Destruição autoimune concomitante de hemácias e plaquetas; sobrevida significativamente menor, demandando imunossupressão mais agressiva e suporte transfusional frequente.'
    },
    {
      complication: 'Tromboembolismo paradoxal e trombocitose rebote',
      frequency: 'Incomum pós-recuperação (3% a 7%)',
      clinicalImplication: 'Durante a fase de remissão com hiperplasia megacariocítica vigorosa e corticoterapia crônica em altas doses, a rápida liberação de plaquetas reticuladas hiper-reativas pode predispor a trombose pulmonar ou vascular paradoxal.'
    },
    {
      complication: 'Recidiva da trombocitopenia imunomediada',
      frequency: '30% a 40% em cães e 59% em gatos (Courtney et al., 2026)',
      clinicalImplication: 'Retorno da diátese hemorrágica semanas a meses após o início do desmame medicamentoso; exige reintrodução imediata de doses plenas de imunossupressores e avaliação de segunda linha ou TPO-RAs.'
    }
  ],

  prevention: [
    'Controle antiparasitário contínuo e rigoroso contra carrapatos durante todo o ano com isoxazolinas ou coleiras repelentes para prevenir hemoparasitoses deflagradoras de trombocitopenia.',
    'Testagem sorológica e virológica periódica de felinos para FeLV e FIV, mantendo gatos soronegativos estritamente domiciliados em ambiente indoor.',
    'Evitar o uso de medicamentos com potencial mielotóxico ou deflagrador de discrasias imunes (sulfas, fenobarbital, metimazol) em animais com histórico prévio de citopenias.',
    'Desmame extremamente cauteloso e lento de protocolos imunossupressores na ITP, respeitando reduções máximas de 25% a cada 2 a 4 semanas com contagens comprovadamente estáveis.',
    'Monitoramento hematológico preventivo em cães com macroplaquetopenia congênita (Cavalier King Charles) para estabelecer sua contagem basal individual e evitar tratamentos iatrogênicos incorretos.'
  ],

  figures: [
    {
      url: '/consulta-vet/trombocitopenia/esfregaco-agregacao-plaquetaria-pseudotrombocitopenia.jpg',
      caption: 'Esfregaço de sangue periférico corado por Wright demonstrando múltiplos agregados e grumos de plaquetas no corpo e borda da lâmina, caracterizando pseudotrombocitopenia in vitro induzida por EDTA.',
      source: 'Prof. Erhabor Osaro (Wikimedia Commons), CC BY-SA 4.0'
    },
    {
      url: '/consulta-vet/trombocitopenia/esfregaco-macroplaqueta-trombopoiese.jpg',
      caption: 'Microscopia de esfregaço sanguíneo evidenciando macroplaqueta gigante (com diâmetro comparável ou superior a um eritrócito), indicativa de trombopoiese regenerativa acelerada de resgate ou macroplaquetopenia genética racial (como na raça Cavalier King Charles Spaniel).',
      source: 'Ed Uthman, MD (Wikimedia Commons / Flickr), CC BY 2.0'
    },
    {
      url: '/consulta-vet/trombocitopenia/petequias-equimoses-dorso-cao-logtenberg2026.jpg',
      caption: 'Exame dermatológico do dorso de cão com trombocitopenia imunomediada refratária primária sob pelo afastado. Observam-se petéquias punctiformes e sufusões hemorrágicas coalescentes na epiderme decorrentes da falência de hemostasia primária.',
      source: 'Logtenberg, Teske & Buijtels (2026), Veterinary Record Case Reports, CC BY 4.0'
    },
    {
      url: '/consulta-vet/trombocitopenia/curva-plaquetas-romiplostim-logtenberg2026.jpg',
      caption: 'Curva longitudinal de resposta da contagem de trombócitos (plaquetas x 10^9/L) em cão com ITP refratária submetido a protocolo com prednisolona, micofenolato de mofetila e resgate com o agonista do receptor de trombopoietina romiplostim ao longo de 400 dias, resultando em remissão estável sustentada.',
      source: 'Logtenberg, Teske & Buijtels (2026), Veterinary Record Case Reports, CC BY 4.0'
    },
    {
      url: '/consulta-vet/trombocitopenia/medula-aplasia-megacariocitica-scielo2019.jpg',
      caption: 'Avaliação de medula óssea de cão com trombocitopenia profunda (5.000/uL) e pancitopenia por hiperestrogenismo secundário a tumor de células de Sertoli. (A) Citologia do aspirado exibindo escassas células hematopoéticas; (B) Biópsia histopatológica evidenciando bi-hipoplasia severa com substituição adiposa de 70% e ausência de linhagem megacariocítica.',
      source: 'Silva et al. (2019), Arquivo Brasileiro de Medicina Veterinária e Zootecnia (SciELO), CC BY 4.0'
    }
  ],

  references: [
    {
      id: 'ref-garden-2019',
      title: 'ACVIM consensus statement on the diagnosis of immune-mediated thrombocytopenia in dogs and cats',
      citationText: 'Garden OJ, Kidd L, Mexas AM, et al. ACVIM consensus statement on the diagnosis of immune-mediated thrombocytopenia in dogs and cats. J Vet Intern Med. 2019;33(4):1463-1483. DOI: 10.1111/jvim.15586.',
      sourceType: 'clinical_guideline',
      url: 'https://doi.org/10.1111/jvim.15586',
      evidenceLevel: 'high',
      notes: 'Consenso oficial do ACVIM estabelecendo os critérios diagnósticos rigorosos para ITP primária e secundária em cães e gatos, recomendando avaliação sistemática de esfregaço e investigação etiológica de exclusão.'
    },
    {
      id: 'ref-balog-2013',
      title: 'A randomized and double-blind clinical trial of the effects of vincristine on tolerance and efficacy in dogs with primary immune-mediated thrombocytopenia',
      citationText: 'Balog KE, Rozanski EA, Stockman CA, et al. A randomized and double-blind clinical trial of the effects of vincristine on tolerance and efficacy in dogs with primary immune-mediated thrombocytopenia. J Vet Intern Med. 2013;27(4):948-954. DOI: 10.1111/jvim.12066.',
      sourceType: 'clinical_trial',
      url: 'https://doi.org/10.1111/jvim.12066',
      evidenceLevel: 'high',
      notes: 'Ensaio clínico seminal randomizado demonstrando que vincristina 0,02 mg/kg IV associada a prednisona reduz o tempo mediano de recuperação para plaquetas >40.000/uL de 5 dias para apenas 2,5 a 3 dias.'
    },
    {
      id: 'ref-makielski-2018',
      title: 'Development and implementation of a novel immune thrombocytopenia bleeding score for dogs (DOGiBAT)',
      citationText: 'Makielski KM, Brooks MB, Wang C, et al. Development and implementation of a novel immune thrombocytopenia bleeding score for dogs. J Vet Intern Med. 2018;32(3):1041-1050. DOI: 10.1111/jvim.15089.',
      sourceType: 'peer_reviewed_journal',
      url: 'https://doi.org/10.1111/jvim.15089',
      evidenceLevel: 'high',
      notes: 'Desenvolvimento e validação do escore clínico padronizado DOGiBAT para quantificação objetiva de sangramento em 9 sítios anatômicos em cães com trombocitopenia <50.000/uL.'
    },
    {
      id: 'ref-omarra-2011',
      title: 'Treatment and predictors of outcome in dogs with primary immune-mediated thrombocytopenia',
      citationText: 'O\'Marra SK, Delaforcade AM, Shaw SP. Treatment and predictors of outcome in dogs with primary immune-mediated thrombocytopenia. J Am Vet Med Assoc. 2011;238(3):346-352. DOI: 10.2460/javma.238.3.346.',
      sourceType: 'cohort_study',
      url: 'https://pubmed.ncbi.nlm.nih.gov/21281218/',
      evidenceLevel: 'moderate',
      notes: 'Coorte de 73 cães com ITP demonstrando sobrevida hospitalar de 84% e identificando melena e ureia/BUN elevado como os preditores clínicos mais fortes de mortalidade.'
    },
    {
      id: 'ref-courtney-2026',
      title: 'Primary Immune-Mediated Thrombocytopenia in 17 Cats: A Multicenter Retrospective Study',
      citationText: 'Courtney L, Mackin A, Thomason J, et al. Primary Immune-Mediated Thrombocytopenia in 17 Cats: A Multicenter Retrospective Study. J Am Anim Hosp Assoc. 2026;62(1):e7525. DOI: 10.5326/JAAHA-MS-7525.',
      sourceType: 'cohort_study',
      url: 'https://pubmed.ncbi.nlm.nih.gov/42014091/',
      evidenceLevel: 'moderate',
      notes: 'Série retrospectiva contemporânea mais detalhada de pITP felina com 17 casos: sangramento em 88,2%, sobrevida mediana de 1.067 dias e alta taxa de recidiva clínica de 59%.'
    },
    {
      id: 'ref-logtenberg-2026',
      title: 'Long-term use of romiplostim in the treatment of refractory immune-mediated thrombocytopenia in a dog',
      citationText: 'Logtenberg TT, Teske E, Buijtels JJCWM. Long-term use of romiplostim in the treatment of refractory immune-mediated thrombocytopenia in a dog. Vet Rec Case Rep. 2026;14(1):e70320. DOI: 10.1002/vrc2.70320.',
      sourceType: 'peer_reviewed_journal',
      url: 'https://doi.org/10.1002/vrc2.70320',
      evidenceLevel: 'moderate',
      notes: 'Documentação clínica com seguimento de 52 semanas comprovando eficácia e segurança do agonista do receptor de TPO romiplostim em cão com ITP refratária crônica (CC BY 4.0).'
    },
    {
      id: 'ref-riond-2015',
      title: 'Effective prevention of pseudothrombocytopenia in feline blood samples with the prostaglandin I2 analogue iloprost',
      citationText: 'Riond B, Waßmuth AK, Hartnack S, Hofmann-Lehmann R, Lutz H. Effective prevention of pseudothrombocytopenia in feline blood samples with the prostaglandin I2 analogue iloprost. BMC Vet Res. 2015;11:183. DOI: 10.1186/s12917-015-0510-x.',
      sourceType: 'peer_reviewed_journal',
      url: 'https://doi.org/10.1186/s12917-015-0510-x',
      evidenceLevel: 'moderate',
      notes: 'Demonstrou prevalência de 71% de agregação plaquetária in vitro em amostras felinas colhidas em EDTA convencional e papel de análogos de PGI2.'
    },
    {
      id: 'ref-silva-2019',
      title: 'Bone marrow bi-hypoplasia in a dog with a Sertoli cell tumor',
      citationText: 'Silva RO, Brandão YM, Souza FA, et al. Bone marrow bi-hypoplasia in a dog with a Sertoli cell tumor. Arq Bras Med Vet Zootec. 2019;71(2):497-502. DOI: 10.1590/1678-4162-10515.',
      sourceType: 'peer_reviewed_journal',
      url: 'https://doi.org/10.1590/1678-4162-10515',
      evidenceLevel: 'moderate',
      notes: 'Documentação citológica e histopatológica de aplasia megacariocítica e granulocítica induzida por hiperestrogenismo neoplásico canino com substituição adiposa medular (CC BY 4.0).'
    },
    {
      id: 'ref-nelson-couto-6ed',
      title: 'Small Animal Internal Medicine',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020. Chapter 83: Disorders of Platelets and Primary Hemostasis, pp. 1290-1308.',
      sourceType: 'textbook',
      evidenceLevel: 'high',
      notes: 'Referência basilar para classificação mecanística das trombocitopenias, fisiologia megacariocítica, interpretação de medula óssea e farmacoterapia com vincristina e imunossupressores.'
    },
    {
      id: 'ref-ettinger-9ed',
      title: 'Textbook of Veterinary Internal Medicine',
      citationText: 'Ettinger SJ, Feldman EC, Côté E. Textbook of Veterinary Internal Medicine. 9th ed. Philadelphia: Elsevier; 2024. Chapter 274: Platelet Disorders and Immune Thrombocytopenia, pp. 2015-2032.',
      sourceType: 'textbook',
      evidenceLevel: 'high',
      notes: 'Tratado abrangente descrevendo a imunopatogenia celular T e B, receptor de trombopoietina e recomendações clínicas do ACVIM.'
    },
    {
      id: 'ref-feline-ecc-2ed',
      title: 'Feline Emergency and Critical Care Medicine',
      citationText: 'Drobatz KJ, Beal MW, Syring RS, eds. Feline Emergency and Critical Care Medicine. 2nd ed. Hoboken: Wiley-Blackwell; 2023. Chapter 32: Hematologic Emergencies in the Cat, pp. 385-398.',
      sourceType: 'textbook',
      evidenceLevel: 'high',
      notes: 'Abordagem intensiva das emergências hematológicas felinas, desafios da hemostasia primária em gatos e manejo de transfusões.'
    },
    {
      id: 'ref-plumbs-10ed',
      title: "Plumb's Veterinary Drug Handbook",
      citationText: "Budde JA, ed. Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023.",
      sourceType: 'textbook',
      evidenceLevel: 'high',
      notes: 'Monografias farmacológicas de prednisona, prednisolona, dexametasona, sulfato de vincristina, micofenolato de mofetila, ciclosporina, azatioprina (e contraindicação estrita em gatos) e doxiciclina.'
    }
  ]
};
