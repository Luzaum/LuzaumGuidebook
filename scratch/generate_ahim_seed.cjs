const fs = require('fs');
const path = require('path');

const seedContent = `import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/*
 * Registro cannico de Anemia Hemoltica Imunomediada Canina (AHIM / IMHA).
 *
 * Fundamentao cientfica e clnica de referncia:
 * - ACVIM Consensus Statement on the Diagnosis of Immune-Mediated Hemolytic Anemia in Dogs and Cats (Garden et al., 2019);
 * - ACVIM Consensus Statement on the Treatment of Immune-Mediated Hemolytic Anemia in Dogs (Swann et al., 2019);
 * - Diretrizes de Tromboprofilaxia CURATIVE (deLaforcade et al., Goggs et al., 2019 / 2022);
 * - Goggs, Davis & Brooks (2025, Front Vet Sci, DOI: 10.3389/fvets.2025.1571683): hipercoagulabilidade e hipofibrinlise por resistncia fibrinoltica mediada por TAFI, PAI-1 e NETose;
 * - Agnoli et al. (2024, JVIM, DOI: 10.1111/jvim.17112): Ensaio clnico randomizado prospectivo (RCT) com 43 ces demonstrando ausncia de benefcio da adio precoce de segundo imunossupressor  corticoterapia inicial;
 * - Weng et al. (2023, JVIM): coorte multicntrica de 242 ces avaliando regimes de imunossupresso;
 * - Sparrow et al. (2024, JVIM, DOI: 10.1111/jvim.17056): segurana da revacinao ps-remisso em 73 ces e dinmica de recada;
 * - Gianesini et al. (2023, JVIM, DOI: 10.1111/jvim.16801): leso endotelial microvascular e pancreatite aguda suspeita secundria  hemoglobina livre intravascular (RR 2,54);
 * - Acervo de livros-texto: Nelson & Couto 6 ed. (Cap. 73: Common Immune-Mediated Diseases, pp. 1234-1238; Cap. 2: Anemia, pp. 18-35); Plumb's Veterinary Drug Handbook 10 ed.; BSAVA Small Animal Formulary 10 ed.
 *
 * Restrio inviolvel: Estritamente ZERO asteriscos duplos em todo o documento.
 */
export const anemiaHemoliticaImunomediadaCaninaRecord: DiseaseRecord = {
  id: 'disease-anemia-hemolitica-imunomediada-canina',
  slug: 'anemia-hemolitica-imunomediada-canina',
  title: 'Anemia Hemoltica Imunomediada em Ces (AHIM / IMHA)',
  subtitle: 'Monografia clnica avanada: consenso diagnstico ACVIM 2019, diretrizes teraputicas ACVIM/CURATIVE, patologia tromboinflamatria, hipofibrinlise e medicina baseada em evidncias',
  synonyms: [
    'AHIM',
    'IMHA',
    'Anemia hemoltica imunomediada canina',
    'Anemia hemoltica autoimune',
    'Canine immune-mediated hemolytic anemia',
    'naIMHA',
    'aIMHA',
    'Anemia autoimune canina',
  ],
  species: ['dog'],
  category: 'hematologia',
  categories: ['hematologia', 'urgencia-emergencia', 'imunologia', 'terapia-intensiva', 'clinica-medica'],
  tags: [
    'AHIM',
    'IMHA',
    'Esferocitose',
    'SAT',
    'Coombs',
    'DAT',
    'Hemlise',
    'Tromboprofilaxia',
    'Rivaroxabana',
    'Clopidogrel',
    'Prednisona',
    'Ciclosporina',
    'Micofenolato',
    'ACVIM',
    'CURATIVE',
    'TEG',
    'Hipofibrinlise',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['anemia-hemolitica-imunomediada-canina'],
  quickSummary:
    'A anemia hemoltica imunomediada (AHIM ou IMHA)  uma emergncia hematolgica e tromboinflamatria de alta letalidade em ces, decorrente da perda da autotolerncia com opsonizao e destruio prematura de eritrcitos mediada por anticorpos (IgG e/ou IgM) e fraes ativas do complemento. O diagnstico definitivo estabelece-se pela convergncia da trade do Consenso ACVIM 2019: anemia (preferencialmente documentada por micro-hematcrito centrifugado/PCV), evidncia inequvoca de destruio imunomediada (presena de pelo menos 2 marcadores: esferocitose acentuada >=5/campo 100x, teste de aglutinao salina SAT 1:4 positivo, teste de antiglobulina direta/DAT Coombs positivo ou citometria de fluxo positiva; OU aglutinao persistente aps lavagem salina tripla) e pelo menos um marcador de hemlise ativa (hiperbilirrubinemia, hemoglobinemia, hemoglobinria ou clulas fantasmas). O tratamento organiza-se em trs eixos indissociveis: corticoterapia imunossupressora de primeira linha (prednisona 2 a 3 mg/kg/dia VO ou 50 a 60 mg/m/dia para ces >25 kg, com desmame precoce orientado por metas), tromboprofilaxia imediata obrigatria (anticoagulantes orais como rivaroxabana ou heparinas associados ou no a clopidogrel, conforme diretrizes CURATIVE/ACVIM para mitigar a principal causa de mortalidade nas primeiras duas semanas) e suporte transfusional criterioso com concentrado de hemcias (pRBC) guiado por sinais clnicos de hipxia tecidual e compatibilidade DEA 1.',
  quickDecisionStrip: [
    'A trade diagnstica do ACVIM 2019 exige: anemia confirmada + pelo menos 2 marcadores de destruio imune (esfercitos, SAT 1:4, DAT/Coombs) + pelo menos 1 sinal de hemlise ativa.',
    'A trombose venosa (especialmente TEP)  a causa de morte nmero um nas primeiras duas semanas; tromboprofilaxia com anticoagulantes (ex.: rivaroxabana)  obrigatria desde o diagnstico.',
    'O ensaio clnico RCT de Agnoli et al. (2024) comprovou que associar segundo imunossupressor de rotina no melhora o desfecho inicial; reserve o 2 agente para refratariedade ou risco elevado.',
    'Nunca transfundir apenas com base em um corte numrico de hematcrito; a indicao hemoterpica deve ser guiada por sinais clnicos de hipxia celular (taquicardia, letargia profunda, hiperlactatemia).',
    'Realize o teste de aglutinao salina (SAT) na proporo correta de 1 gota de sangue para 4 gotas de salina; a proporo 1:1 produz falso-positivos frequentes por rouleaux.',
  ],
  quickSummaryRich: {
    lead:
      'A abordagem clnica moderna da AHIM canina exige a substituio de paradigmas empricos por critrios objetivos: confirmar a destruio imunomediada pela trade consensual ACVIM 2019, instituir tromboprofilaxia imediata com anticoagulantes (antagonistas do fator Xa ou heparinas) e reservar o segundo agente imunossupressor para pacientes com falha teraputica, caindo o hematcrito rapidamente ou com efeitos adversos intolerveis aos corticoides.',
    leadHighlights: [
      'trade consensual ACVIM 2019',
      'tromboprofilaxia imediata com anticoagulantes',
      'segundo agente imunossupressor',
      'desmame precoce orientado por metas',
    ],
    pillars: [
      {
        title: 'Trade Diagnstica Consensual (ACVIM 2019)',
        body:
          'O diagnstico de certeza no depende de um exame isolado. Exige a convergncia de trs pilares: 1) Anemia confirmada; 2) Evidncia de mecanismo imunomediado com pelo menos dois marcadores positivos (esfercitos >=5/campo 100x, SAT 1:4 positivo, Coombs direto/DAT positivo ou citometria) OU aglutinao persistente aps lavagem tripla; 3) Evidncia de hemlise ativa (hiperbilirrubinemia, hemoglobinemia, hemoglobinria ou ghost cells).',
        highlights: ['Anemia confirmada', 'pelo menos dois marcadores', 'hemlise ativa', 'lavagem tripla'],
      },
      {
        title: 'Doena Tromboinflamatria e Hipofibrinlise',
        body:
          'A AHIM no  apenas lise de hemcias:  uma tempestade tromboinflamatria sistmica. Goggs et al. (2025) comprovaram que alm de hipercoagulabilidade, ces com AHIM desenvolvem hipofibrinlise marcante mediada por TAFI ativado, aumento expressivo de PAI-1 e NETose. O tromboembolismo pulmonar (TEP)  a principal causa de bito precoce. A tromboprofilaxia  mandatria em praticamente 100% dos pacientes.',
        highlights: ['tempestade tromboinflamatria', 'hipofibrinlise', 'TAFI', 'PAI-1', 'TEP', 'mandatria'],
      },
      {
        title: 'Imunossupresso Racional e Individualizada',
        body:
          'Glicocorticoides (prednisona 2 a 3 mg/kg/dia VO ou 50 a 60 mg/m/dia em ces >25 kg) so a base de primeira linha. Conforme o ensaio clnico prospectivo de Agnoli et al. (2024), no h justificativa para adio rotineira indiscriminada de segundo agente (ciclosporina ou micofenolato) em casos estveis. Iniciar desmame gradual (20-25% a cada 2-4 semanas) aps estabilizao por 7 a 14 dias.',
        highlights: ['Glicocorticoides', 'primeira linha', 'Agnoli et al. (2024)', 'desmame gradual'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnstico Sequencial na Suspeita de AHIM',
      steps: [
        {
          label: 'Passo 1: Confirmao da Anemia e Coletas Prvias',
          timing: 'Imediato na admisso',
          detail:
            'Aferir hematcrito por microcentrifugao (PCV) para contornar interferncia de hemlise/lipemia no contador automatizado. Colher tubos com EDTA pr-transfuso para esfregao, SAT, tipagem DEA 1 e prova de compatibilidade cruzada maior.',
        },
        {
          label: 'Passo 2: Anlise de Esfregao e Teste de Aglutinao Salina (SAT)',
          timing: 'Primeiros 30 minutos',
          detail:
            'Examinar esfregao em imerso (100x): quantificar esfercitos (>=5/campo confere 95% de especificidade) e polychromasia. Realizar SAT rigorosamente na proporo 1:4 (1 gota de sangue para 4 gotas de salina 0,9%). Se positivo, proceder  lavagem salina tripla para confirmar autoaglutinao verdadeira.',
          limitations: 'SAT 1:1 gera resultados falso-positivos frequentes por persistncia de rouleaux.',
        },
        {
          label: 'Passo 3: Documentao de Hemlise e Teste de Coombs (DAT)',
          timing: 'Rotina laboratorial inicial',
          detail:
            'Avaliar plasma no tubo de micro-hematcrito (hemoglobinemia rsea/avermelhada vs ictercia amarela). Analisar urina (centrifugar para diferenciar hematria de hemoglobinria). Se houver apenas 1 marcador imune no esfregao, realizar teste de antiglobulina direta (Coombs/DAT).',
        },
        {
          label: 'Passo 4: Triagem de Gatilhos e Causas Associadas (aIMHA)',
          timing: 'Primeiras 24 a 48 horas',
          detail:
            'Investigar doenas vetoriais (PCR e sorologia para Babesia gibsoni/canis, pesquisa de microfilrias de Dirofilaria), radiografias torcicas e ultrassonografia abdominal para afastar neoplasias ocultas e corpos estranhos de zinco.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo Teraputico Integrado e Manejo Hospitalar',
      steps: [
        {
          label: 'Fase 1: Estabilizao e Suporte Transfusional',
          timing: 'Imediato no planto',
          detail:
            'Fornecer oxigenoterapia suave se dispneico. Se houver sinais clnicos de hipxia descompensada (letargia extrema, taquicardia desproporcional, taquipneia, lactato >3-4 mmol/L), transfundir concentrado de hemcias (pRBC) DEA 1 compatvel recente (idealmente <=7 a 10 dias de coleta).',
          dose: 'pRBC 10 a 15 mL/kg IV infundido em 2 a 4 horas.',
        },
        {
          label: 'Fase 2: Tromboprofilaxia Obrigatria Imediata',
          timing: 'Admisso imediata',
          detail:
            'Iniciar anticoagulante oral inibidor do fator Xa ou heparina de baixo peso molecular conforme CURATIVE/ACVIM. No aguardar melhora do hematcrito. Contraindicado apenas se plaquetas <30.000/uL ou sangramento ativo.',
          dose: 'Rivaroxabana 1 a 2 mg/kg VO q24h; ou Enoxaparina 0,8 a 1,2 mg/kg SC q8h; ou Dalteparina 150 a 175 UI/kg SC q8h.',
        },
        {
          label: 'Fase 3: Imunossupresso de Primeira Linha',
          timing: 'Incio imediato pr-transfuso ou ps-coleta',
          detail:
            'Glicocorticoides em doses imunossupressoras. Para ces >25 kg, calcular estritamente por superfcie corporal (50 a 60 mg/m/dia) para evitar sndrome de Cushing iatrognica grave e fraqueza muscular.',
          dose: 'Prednisona ou Prednisolona 2 a 3 mg/kg/dia VO (dividida em 2 doses ou SID). Se vmitos: Dexametasona 0,15 a 0,3 mg/kg IV q24h.',
        },
        {
          label: 'Fase 4: Avaliao Criteriosa do Segundo Agente Imunossupressor',
          timing: 'Dia 3 a 7 de internao',
          detail:
            'Associar segundo imunossupressor apenas diante de indicaes consensuais: queda de PCV >=5 pontos em 24h apesar de corticoides, dependncia transfusional persistente aps 7 dias, hemlise intravascular fulminante ou ces de porte gigante.',
          dose: 'Ciclosporina 5 mg/kg VO q12h; ou Micofenolato de Mofetil 8 a 12 mg/kg VO q12h; ou Azatioprina 2 mg/kg VO q24h por 14 dias (somente em ces).',
        },
        {
          label: 'Fase 5: Desmame Gradual e Monitoramento Ambulatorial',
          timing: 'Semanas a meses',
          detail:
            'Aps estabilizao clnica e PCV mantido por >=7 a 14 dias com contagem reticulocitria adequada, reduzir a dose de prednisona em 20% a 25% a cada 2 a 4 semanas. Nunca suspender abruptamente. Monitorar PCV, reticulcitos e bioqumica.',
        },
      ],
    },
  },
  etiology: {
    definicaoEClassificacaoAcvim2019:
      'A anemia hemoltica imunomediada (AHIM / IMHA) decorre da perda de autotolerncia com reconhecimento anormal de antgenos da membrana eritrocitria por anticorpos endgenos (predominantemente IgG e IgM), desencadeando destruio celular acelerada mediada por fagocitose mononuclear ou citlise por complemento. O Consenso ACVIM 2019 estabeleceu a substituio formal dos termos bivalentes "primria" e "secundria" por "no associativa (naIMHA)" e "associativa (aIMHA)". O termo "no associativa" reflete a realidade clnica de que, aps investigao minuciosa com triagem diagnstica abrangente, nenhuma condio desencadeante ou subjacente foi detectada. Por outro lado, a forma "associativa" ocorre quando a reao imune  disparada ou mantida por antgenos exgenos, mimetismo molecular, dano tecidual ou reaes de hapteno vinculadas a infeces ativas, neoplasias, frmacos ou reaes inflamatrias sistmicas.',
    gatilhosInfecciososEBabesiose:
      'Entre os gatilhos infecciosos caninos, o Consenso ACVIM 2019 identificou nvel de evidncia moderado a alto apenas para infeces por piroplasmas do gnero Babesia, com destaque para Babesia gibsoni e Babesia canis/vogeli. B. gibsoni possui transmisso marcante por mordeduras e brigas entre ces (notadamente em raas do tipo Pit Bull), alm de via transplacentria e vetorial. A infeco induz alteraes estruturais na membrana das hemcias com exposio de neoantgenos e produo de anticorpos anti-eritrcito, gerando quadro idntico  AHIM. O consenso recomenda a triagem sistemtica para Babesia por meio de PCR combinado com sorologia em todos os ces com AHIM. Outros agentes infecciosos como Mycoplasma haemocanis (comum em ces previamente esplenectomizados), Dirofilaria immitis, Ehrlichia canis, Anaplasma phagocytophilum e Leishmania infantum podem estar associados a anemias imunomediadas ou testes de Coombs falso-positivos por complexos imunes circulantes, exigindo diagnstico etiolgico rpido para evitar imunossupresso isolada desastrosa.',
    desmistificacaoGatilhosFarmacologicosEVacinais:
      'Historicamente, frmacos e vacinas foram responsabilizados por uma frao substancial dos casos de AHIM. Todavia, a anlise rigorosa do Consenso ACVIM 2019 demonstrou que a grande maioria das publicaes anteriores apresentava nvel de evidncia negligencivel a baixo. Para frmacos, a evidncia mais slida documentada ocorreu com altas doses de cefalosporinas injetveis (como cefazedona), alm de relatos pontuais com penicilinas, sulfonamidas e cefalotina. No tocante  vacinao, uma investigao detalhada refutou a hiptese de que vacinas rotineiras sejam gatilhos frequentes de AHIM. O estudo de coorte prospectivo de Sparrow et al. (2024, JVIM) acompanhou 73 ces recuperados de AHIM que foram revacinados aps a remisso completa: nenhum paciente apresentou recidiva temporalmente associada  vacinao, registrando-se taxas globais de recada de 11% aos 12 meses e 18% aos 24 meses (idnticas entre vacinados e no vacinados). A recomendao consensual atual  individualizar o risco-benefcio vacinal, no privando pacientes hgidos do controle de doenas infecciosas letais (parvovirose, raiva, leptospirose) aps estabilizao consistente.',
  },
  epidemiology: {
    distribuicaoPorRacaESexo:
      'A AHIM afeta ces de qualquer raa e faixa etria, porm vrias raas apresentam suscetibilidade desproporcional decorrente de predisposio gentica vinculada a determinados alelos do complexo principal de histocompatibilidade canino (DLA - Dog Leukocyte Antigen). As raas mais frequentemente sobrefaturadas em estudos epidemiolgicos globais incluem Cocker Spaniel Americano e Ingls (risco relativo de 3 a 5 vezes superior  populao geral), Springer Spaniel Ingls, Poodle Miniatura e Mdio, Bichon Fris, Pastor Alemo, Golden Retriever, Malts e Old English Sheepdog. Fmeas exibem discreta a moderada predisposio em diversas coortes internacionais, com razes fmea:macho variando entre 1,5:1 e 2:1, sem efeito protetor evidente da castrao.',
    faixaEtariaEPicoDeIncidencia:
      'A doena atinge majoritariamente animais jovens-adultos a meia-idade, com pico de incidncia concentrado entre 3 e 7 anos de idade (faixa descrita de 1 a 13 anos). Apresentaes em filhotes com menos de 1 ano so atpicas e impem a investigao imediata de isoeritrlise neonatal, causas parasitrias/infecciosas agudas ou anomalias genticas congnitas do metabolismo eritrocitrio (como deficincia de piruvato quinase ou fosfofrutoquinase). Apresentaes em ces geritricos (>9-10 anos) obrigam a um rastreamento oncolgico rigoroso (linfoma, leucemia, hemangiossarcoma).',
    fatoresPrognosticosEMortalidade:
      'A AHIM canina permanece como uma das afeces hematolgicas de maior letalidade em pequenos animais. A taxa de mortalidade situa-se historicamente entre 30% e 50%, concentrando-se predominantemente nas primeiras duas semanas de hospitalizao. O Consenso ACVIM e estudos prospectivos identificaram marcadores robustos de pior prognstico na admisso: hiperbilirrubinemia severa (>5 a 10 mg/dL), presena de hemlise intravascular com hemoglobinemia e hemoglobinria, autoaglutinao persistente aps lavagem, azotemia pr-renal ou renal associada, hipoalbuminemia e ausncia de resposta regenerativa aps 5 a 7 dias. A causa terminal direta de bito mais prevalente  o tromboembolismo pulmonar (TEP) fulminante, seguido por coagulao intravascular disseminada (CID) e sndrome da disfuno de mltiplos rgos (MODS).',
  },
  pathogenesisTransmission: {
    mecanismosImunesOpsonizacao:
      'A quebra da autotolerncia imunolgica resulta na produo de autoanticorpos (primordialmente IgG e/ou IgM) direcionados contra protenas e glicoprotenas integrais da membrana do eritrcito, como a espectrina, a banda 3 e as glicoforinas. Na hemlise mediada por IgG, a poro Fab do anticorpo ancora-se no epitopo de superfcie, deixando a poro cristalizvel (Fc) exposta. Quando esses eritrcitos opsonizados transitam pela polpa vermelha do bao e sinusides hepticos, so reconhecidos pelos receptores Fc-gama (Fc-gamma-R) expressos na superfcie dos macrfagos teciduais do sistema fagoctico mononuclear. Os macrfagos fagocitam fragmentos da membrana celular. Pela perda de superfcie lipdica sem diminuio proporcional de citoplasma e hemoglobina, a hemcia adquire o formato esfrico de esfercito. Esses esfercitos rgidos perdem sua deformabilidade caracterstica e acabam lisados em passagens subsequentes pelo microambiente esplnico.',
    ativacaoDoComplemento:
      'Quando o anticorpo envolvido  do isotipo IgM, sua conformao pentamrica plana permite a ligao direta e eficiente da subunidade C1q, disparando a cascata clssica do complemento com clivagem de C4, C2 e formao da C3 convertase. A deposio macia de C3b e iC3b na superfcie celular acelera a fagocitose mediada por receptores de complemento (CR1 e CR3) nos macrfagos hepticos (clulas de Kupffer). Em casos de alta densidade de IgM ou cooperatividade de subclasses de IgG fixadoras de complemento, a cascata progride at a clivagem de C5 e polimerizao de C5b-6-7-8-9, gerando o Complexo de Ataque  Membrana (MAC). O MAC forma poros transmembranares hidroflicos permanentes, levando a influxo macio de gua e ons, choque osmtico e lise celular direta dentro da luz do vaso (hemlise intravascular).',
    fenomenoTromboinflamatorioEHipofibrinolise: {
      kind: 'editorialText',
      text:
        'A AHIM  contemporaneamente compreendida como uma grave desordem tromboinflamatria sistmica. O estado pr-trombtico extremo no decorre apenas de ativao plaquetria isolada, mas de trs foras sinrgicas interdependentes: 1) Expresso aberrante de Fator Tecidual (TF) em moncitos e macrfagos ativados por citocinas inflamatrias (IL-1, TNF-alfa); 2) Gerao macia de micropartculas eritrocitrias derivadas das hemcias fragmentadas, ricas em fosfatidilserina externa que serve de plataforma cataltica para os complexos tenase e protrombinase; 3) Sequestro rpido de xido ntrico (NO) livre pela hemoglobina tetramrica circulante, desencadeando vasoconstrio microvascular patolgica, isquemia endotelial e expresso de molculas de adeso plaquetria. Alm da gerao exacerbada de trombina, o estudo fundamental de Goggs, Davis & Brooks (2025, Front Vet Sci) demonstrou que ces com AHIM sofrem de grave resistncia  fibrinlise (hipofibrinlise), caracterizada por elevaes acentuadas de inibidor do ativador de plasminognio ativo (PAI-1), hiperatividade do inibidor de fibrinlise ativvel por trombina (TAFI) e extruso de redes extracelulares de neutrfilos (NETose, confirmada por altos nveis de cfDNA e nucleossomos). Essa resistncia fibrinoltica impede a lise fisiolgica dos cogulos formados, consolidando trombos volumosos e letais na circulao pulmonar e venosa portal.',
    },
    figuraTegHipercoagulabilidade: {
      kind: 'imageModal' as const,
      url: '/consulta-vet/ahim-canina/teg-hipercoagulabilidade-goggs-2025.jpg',
      caption:
        'Traados de tromboelastografia (TEG) ativados por fator tecidual em co com AHIM demonstrando hipercoagulabilidade marcante e fenmeno de hipofibrinlise (resistncia fibrinoltica) induzida por tPA (Goggs, Davis & Brooks, 2025, Front Vet Sci, CC BY 4.0).',
    },
    figuraBiomarcadoresPai1Tafi: {
      kind: 'imageModal' as const,
      url: '/consulta-vet/ahim-canina/biomarcadores-pai1-tafi-goggs-2025.jpg',
      caption:
        'Concentraes plasmticas de inibidor do ativador de plasminognio tipo 1 (PAI-1 ativo) e atividade de inibidor de fibrinlise ativvel por trombina (TAFI) significativamente aumentadas em ces com AHIM comparados a controles hgidos (Goggs, Davis & Brooks, 2025, Front Vet Sci, CC BY 4.0).',
    },
  },
  pathophysiology: {
    hemoliseIntravascularVsExtravascular:
      'A destruio das hemcias manifesta-se sob dois padres fisiopatolgicos principais com repercusses clnicas, laboratoriais e teraputicas distintas: hemlise extravascular (predominante em cerca de 80% a 90% dos casos) e hemlise intravascular (presente em 10% a 20% das apresentaes mais graves). Na hemlise extravascular, a destruio ocorre estritamente dentro dos cordes esplnicos e sinusides hepticos. O ferro e o grupo heme so degradados pela heme oxigenase em biliverdina e, subsequentemente, em bilirrubina no conjugada (indireta). Essa bilirrubina liga-se  albumina e  carreada ao fgado para conjugao. Quando a taxa de destruio excede a capacidade heptica de captao e excreo biliar, surge hiperbilirrubinemia plasmtica (ictercia) e bilirrubinria acentuada. O plasma preserva sua colorao lmpida amarelada (ictrica) e no h liberao de hemoglobina livre no sangue. Em contraste agudo, na hemlise intravascular a destruio celular ocorre diretamente na corrente sangunea por ativao ltica do complemento ou estresse de cisalhamento. A hemoglobina tetramrica  despejada no plasma, saturando imediatamente as protenas carreadoras de reserva (haptoglobina). Uma vez saturada a haptoglobina, a hemoglobina livre (dimrica) circula livremente, conferindo ao plasma colorao rsea a vermelho-escura (hemoglobinemia). Essa hemoglobina livre ultrapassa a barreira de filtrao glomerular renal e atinge a urina (hemoglobinria). A hemoglobina livre no tbulo proximal gera dano oxidativo oxidando-se a metemoglobina, liberando ferro livre txico e causando necrose tubular aguda (injria renal aguda isqumica e nefrotxica). Alm disso, a hemoglobina livre sequestra vorazmente o xido ntrico (NO) tecidual, levando a espasmo vascular sistmico, disfuno endotelial e colapso circulatrio.',
    tabelaComparativaHemolise: {
      kind: 'clinicalTable' as const,
      caption: 'Tabela comparativa dos mecanismos de hemlise na AHIM canina',
      headers: [
        'Parmetro Fisiopatolgico',
        'Hemlise Extravascular (Tpica)',
        'Hemlise Intravascular (Fulminante)',
      ],
      rows: [
        ['Local predominante de destruio', 'Polpa vermelha esplnica e fgado (Kupffer)', 'Luz intravascular sistmica e capilares'],
        ['Imunoglobulina predominante', 'IgG (reao tpica morna)', 'IgM (ativao potente) ou IgG em alta densidade'],
        ['Envolvimento do Complemento', 'Fixao at C3b/iC3b (opsonizao)', 'Ativao completa at complexo de ataque (MAC C5b-9)'],
        ['Achados tpicos no esfregao', 'Esferocitose acentuada (>=5/campo)', 'Ghost cells (clulas fantasmas), esfercitos'],
        ['Aspecto do plasma (centrifugado)', 'Ictrico (amarelo ouro a alaranjado)', 'Hemoglobinmico (rseo a vermelho escuro brilhante)'],
        ['Aspecto da urina (centrifugada)', 'Bilirrubinria (amarelo escuro a castanho)', 'Hemoglobinria (vermelho escuro que no sedimenta)'],
        ['Leso renal aguda (LRA)', 'Risco moderado por hipxia isqumica', 'Risco extremo por toxicidade direta e espasmo por NO'],
        ['Prognstico e mortalidade', 'Grave, porm controlvel com imunossupresso', 'Crtico / fulminante, mortalidade muito elevada'],
      ],
    },
    respostaRegenerativaEFormasNaoRegenerativas:
      'A anemia hemoltica  classicamente descrita como uma anemia regenerativa tpica, caracterizada por macrocitose, hipocromia, policromasia acentuada e elevao vigorosa da contagem absoluta de reticulcitos (>100.000 a 110.000/uL em ces). Contudo, um desafio diagnstico capital reside no fato de que aproximadamente 30% dos ces com AHIM chegam  consulta inicial com anemia aparentemente no regenerativa. Esse fenmeno decorre de dois motivos clnicos distintos: 1) Janela de latncia medular pr-regenerativa: a medula ssea sadia necessita de 3 a 5 dias para acelerar a eritropoiese, maturar os precursores e liberar reticulcitos jovens na circulao. Apresentaes hiperagudas com menos de 72 horas de hemlise exibem contagem reticulocitria inicial baixa; a repetio do exame aps 3 a 4 dias revelar regenerao exuberante; 2) Doenas imunomediadas direcionadas a precursores eritroides medulares: incluem a anemia imunomediada direcionada a precursores (PIMA - Precursor-targeted immune-mediated anemia) e a aplasia pura de srie vermelha (PRCA - Pure red cell aplasia). Nessas condies, os autoanticorpos no atacam apenas os eritrcitos maduros circulantes, mas reconhecem e destroem estgios precoces na medula ssea (rubriblastos, pr-rubrcitos, rubrcitos ou reticulcitos medulares). A mielografia por bipsia ou aspirado de medula ssea revelar hiperplasia eritroide com parada de maturao (PIMA) ou ausncia seletiva quase total de linhagem eritroide com linhagens mieloide e megacarioctica preservadas (PRCA).',
  },
  clinicalSignsPathophysiology: {
    sinaisClinicosSistemicosEExameFisico:
      'Os sinais clnicos decorrem da combinao da hipxia tecidual celular com a resposta inflamatria sistmica induzida por citocinas e fragmentos eritrocitrios. A histria clnica tpica relata incio agudo a subagudo (1 a 7 dias) de letargia profunda, prostrao, fraqueza muscular, relutncia ao exerccio, hiporexia ou anorexia completa, vmitos e, em casos avanados, episdios de sncope ou colapso ortosttico. Ao exame fsico cuidadoso, os achados predominantes so: palidez extrema de mucosas orais, conjuntivais e genitais (mucosas em "porcelana"); taquicardia sinusal compensatria de repouso com pulsos femorais hiperdinmicos ("em martelo d\'gua" ou saltatrios, reflexo da reduo drstica da viscosidade sangunea e da vasodilatao perifrica); taquipneia compensatria; sopro cardaco sistlico funcional grau II a III/VI audvel em foco mitral/base decorrente do fluxo turbulento de sangue de baixa viscosidade; febre de origem imunoinflamatria (temperatura retal entre 39,2 C e 40,5 C) presente em at 30% a 50% dos ces sem qualquer foco infeccioso aparente; hepatoesplenomegalia palpvel por congesto e hiperplasia reativa do sistema mononuclear fagocitrio; e linfonodomegalia reativa generalizada discreta a moderada.',
    ictericiaEAlteracoesUrinarias:
      'A ictercia cutaneomucosa  observada em cerca de 40% a 60% dos pacientes no momento da admisso, manifestando-se por pigmentao amarelada tpica na esclera ocular, palato mole, superfcie interna dos pavilhes auriculares e pele ventral glabra. A colorao da urina  uma varivel semioqumica diagnstica de primeiro escalo: tutores frequentemente relatam urina escura, avermelhada ou com tonalidade de ch forte, caf ou refrigerante de cola. A avaliao clnica imediata por centrifugao de amostra urinria fresca distingue: 1) Urina com sobrenadante transparente e sedimento de hemcias intactas = hematria (no hemlise pura); 2) Urina com sobrenadante vermelho-escuro persistente e teste com fita positivo para sangue = hemoglobinria (hemlise intravascular com saturao da haptoglobina); 3) Urina com tonalidade castanha a amarelo-ouro escuro, fita fortemente positiva para bilirrubina e sobrenadante no hemoglobnico = bilirrubinria macia associada a hemlise extravascular.',
    sinaisDeTromboembolismoPulmonar:
      'O tromboembolismo pulmonar (TEP)  a complicao catastrfica mais temida. Clinicamente, o paciente apresenta piora sbita e inexplicada do padro respiratrio, caracterizada por taquipneia paroxstica, ortopneia, angstia respiratria, dor torcica e palidez acinzentada ou cianose. Um dado semiolgico fundamental  o achado de dispneia intensa associada a auscultao de campos pulmonares surpreendentemente silenciosos ou limpos (dissociao entre desconforto ventilatrio severo e ausncia de estertores/crepitaes nos estgios iniciais, pois a obstruo  vascular e no alveolar). A gasometria arterial demonstra hipoxemia aguda grave com elevao marcante do gradiente alvolo-arterial de oxignio P(A-a)O2 e ausncia de resposta clnica satisfatria  oxigenoterapia suplementar (distrbio grave de ventilao/perfuso V/Q). O surgimento desses sinais impe a intensificao imediata do suporte anticoagulante.',
  },
  diagnosis: {
    triadeDiagnosticaAcvim:
      'O Consenso ACVIM 2019 estabeleceu diretrizes diagnsticas rigorosas baseadas em evidncias para uniformizar o reconhecimento da AHIM em ces. O diagnstico de certeza requer a convergncia de trs condies inegociveis: 1) Confirmao de Anemia: hematcrito/PCV abaixo do limite inferior de referncia (idealmente por microcentrifugao); 2) Demonstrao de Destruio Imunomediada: presena de pelo menos 2 marcadores de reao imune positiva (esferocitose evidente, SAT 1:4 positivo, Coombs/DAT positivo ou citometria de fluxo positiva); OU como critrio autnomo suficiente, um teste de aglutinao salina que persista positivo aps trs ciclos consecutivos de lavagem salina; 3) Demonstrao de Hemlise Ativa: presena de pelo menos 1 marcador de degradao eritrocitria (hiperbilirrubinemia sem colestase primria, hemoglobinemia, hemoglobinria ou presena de ghost cells). O diagnstico  classificado como "confirmatrio" quando os trs pilares so atendidos, ou "provvel" quando h anemia, um marcador imune e um marcador de hemlise em contexto clnico compatvel.',
    tabelaTriadeDiagnosticaAcvim: {
      kind: 'clinicalTable' as const,
      caption: 'Trade diagnstica do Consenso ACVIM 2019 para AHIM Canina',
      headers: [
        'Componente Diagnstico',
        'Critrio Requerido pelo Consenso',
        'Exames e Marcadores Validados',
      ],
      rows: [
        [
          '1. Confirmao de Anemia',
          'Obrigatrio em 100% dos casos',
          'Hematcrito por microcentrifugao (PCV) <37% ou hemograma automatizado revisado',
        ],
        [
          '2. Destruio Imunomediada',
          'Pelo menos 2 marcadores positivos OU SAT positivo ps-lavagem 3x',
          'a) Esfercitos >=5/campo 100x; b) SAT 1:4 positivo; c) Coombs/DAT positivo; d) Citometria de fluxo anti-IgG/IgM/C3',
        ],
        [
          '3. Hemlise Ativa',
          'Pelo menos 1 marcador positivo',
          'a) Hiperbilirrubinemia; b) Hemoglobinemia plasmtica; c) Hemoglobinria; d) Ghost cells no esfregao',
        ],
        [
          'Classificao Diagnstica Final',
          'Grau de certeza clnica',
          'Definitivo: 1 + 2 + 3 preenchidos integralmente; Provvel: 1 + (1 marcador imune) + 3',
        ],
      ],
    },
    esferocitosDesempenhoDiagnostico:
      'Os esfercitos so glbulos vermelhos que sofreram remoo parcial de membrana por macrfagos esplnicos. No microscpio ptico, surgem como clulas menores, densamente coradas, perfeitamente esfricas e desprovidas de halo central de palidez. Como o co  a nica espcie domstica que possui eritrcitos normais com halo central evidente, a identificao de esfercitos no esfregao de sangue canino possui excepcional valor diagnstico. Todavia, a especificidade depende criticamente do ponto de corte semiquantitativo utilizado. Estudos clnicos referendados pelo ACVIM demonstram que a presena de >=5 esfercitos por campo de grande aumento sob imerso (100x) confere sensibilidade de 63% e especificidade elevada de 95% para AHIM. Pontos de corte mais baixos (>=3 esfercitos/campo) elevam a sensibilidade para 74%, porm reduzem a especificidade para 81%, uma vez que raros esfercitos podem ocorrer secundariamente em envenenamentos por serpentes, hipofosfatemia severa, toxicidade por zinco, anemia microangioptica e hemangiossarcoma.',
    figuraEsferocitoseEsfregaco: {
      kind: 'imageModal' as const,
      url: '/consulta-vet/ahim-canina/esferocitose-esfregaco-sanguineo.jpg',
      caption:
        'Esfregao sanguneo microscpico em co demonstrando esferocitose acentuada (hemcias esfricas densas e sem palidez central) acompanhada de policromasia e anisocitose tpicas de AHIM (Wikimedia Commons, CC BY-SA 4.0).',
    },
    testeAglutinacaoSalinaSatProtocolo:
      'O teste de aglutinao salina (SAT) avalia a presena de anticorpos de superfcie em quantidade suficiente para vencer o potencial zeta eletrosttico que normalmente repele as hemcias entre si, causando pontes intercelulares e aglomerao macroscpica ou microscpica. Um dos erros tcnicos mais frequentes na rotina veterinria  misturar 1 gota de sangue com 1 gota de salina (1:1). Essa diluio insuficiente  incapaz de dispersar o fenmeno fsico de rouleaux (empilhamento de hemcias em moedas, estimulado por fibrinognio e globulinas aumentadas na inflamao), gerando taxas alarmantes de falso-positivos. O protocolo padronizado pelo Consenso ACVIM preconiza misturar rigorosamente 1 gota de sangue anticoagulado em EDTA com 4 gotas de soluo fisiolgica 0,9% (proporo 1:4) sobre uma lmina limpa, cobrindo com lamnula e examinando em microscpio (10x e 40x). Para pacientes com aglutinao evidente, a lavagem eritrocitria tripla (centrifugao da suspenso com salina a 1.000 rpm por 2 minutos, descarte do sobrenadante e repetio por 3 vezes) remove completamente paraprotenas circulantes; se a aglutinao persistir aps essa lavagem tripla, o ACVIM reconhece esse achado como evidncia autnoma suficiente de destruio imunomediada.',
    figuraTesteAglutinacaoSalina: {
      kind: 'imageModal' as const,
      url: '/consulta-vet/ahim-canina/teste-aglutinacao-salina-sat.jpg',
      caption:
        'Visualizao microscpica demonstrando autoaglutinao eritrocitria verdadeira em aglomerados tridimensionais irregulares (grumos), distinguindo-se da organizao linear em pilhas de moedas (rouleaux) (Wikimedia Commons, CC BY-SA 4.0).',
    },
    testeCoombsDatECitometria:
      'O teste de antiglobulina direta (DAT), historicamente denominado Teste de Coombs direto, tem por finalidade detectar a presena de anticorpos (IgG e/ou IgM) ou fragmentos de complemento (C3b) ancorados  superfcie do eritrcito, mesmo quando esses no esto em concentrao suficiente para provocar autoaglutinao espontnea no teste salino. A adio de um reagente anti-espcie poliespecfico ou monoespecfico canino promove ligao cruzada entre as imunoglobulinas fixadas, induzindo aglutinao visvel. Na literatura canina, o DAT apresenta sensibilidade entre 61% e 82% e especificidade elevada entre 94% e 100%. Um teste de Coombs negativo JAMAIS descarta AHIM (at 20% a 30% de falso-negativos por corticoterapia prvia, baixa afinidade do anticorpo, eluio trmica ou tcnica laboratorial deficiente). Por sua vez, a citometria de fluxo emergiu como um mtodo altamente sensvel e quantitativo, capaz de mensurar individualmente a porcentagem de hemcias recobertas por IgG, IgM e C3, identificando casos limtrofes com Coombs falso-negativo.',
    figuraTesteCoombsDireto: {
      kind: 'imageModal' as const,
      url: '/consulta-vet/ahim-canina/teste-coombs-direto-dat.png',
      caption:
        'Esquema representativo do mecanismo do Teste de Coombs direto (antiglobulina direta / DAT): anticorpos anti-globulina ligam-se s imunoglobulinas pr-fixadas nas hemcias do paciente, induzindo aglutinao diagnstica (Wikimedia Commons, CC BY-SA 3.0).',
    },
    triagemEtiologicaEGatilhos:
      'Uma vez confirmada a AHIM, o prximo passo imperativo  distinguir se a condio  no associativa (naIMHA) ou associativa (aIMHA). A conduta consensual ACVIM 2019 recomenda um painel mnimo de excluso que abrange: 1) Hemograma completo e reviso minuciosa do esfregao em busca de corpsculos de incluso ou parasitas intraeritrocitrios (trofozotos de Babesia, corpsculos de Heinz que indicam hemlise oxidativa e no imune); 2) PCR e sorologia pareada para Babesia spp. (especialmente B. gibsoni e B. canis/vogeli); 3) Triagem para Dirofilaria immitis por teste antignico e pesquisa de microfilrias por tcnica de Knott modificada; 4) Perfil bioqumico srico completo (incluindo ureia, creatinina, ALT, fosfatase alcalina, bilirrubina total e fraes, albumina e globulinas); 5) Urinlise completa coletada por cistocentese ou mico espontnea com urocultura quantitativa; 6) Radiografias torcicas em 3 projees (para rastreio de metstases, massas mediastinais ou sinais de TEP) e radiografia abdominal (fundamental para afastar ingesta de corpos estranhos metlicos com zinco, como moedas, que causam hemlise oxidativa grave simulando AHIM); 7) Ultrassonografia abdominal completa para avaliao de arquitetura esplnica, heptica, linfonodos cavitrios e focos infecciosos ocultos.',
  },
  treatment: {
    estabilizacaoInicialECuidadosHandsOff:
      'O atendimento inicial de um co com suspeita de AHIM deve priorizar a estabilizao ventilatria e hemodinmica sem desencadear estresse excessivo. A hipxia tecidual crtica reduz a tolerncia a contenes fsicas foradas. Instituir oxigenoterapia suave por mscara confortvel ou fluxo contnuo (flow-by). Todas as amostras de sangue necessrias para o diagnstico (tubos EDTA para micro-hematcrito, esfregao, SAT, Coombs, tipagem DEA 1 e prova de compatibilidade cruzada) devem ser colhidas por venopuno nica precisa em veia perifrica (veia ceflica ou safena lateral). Deve-se PROIBIR expressamente punes traumticas na veia jugular em pacientes com AHIM grave, pois a presena concomitante de trombocitopenia de consumo, anemia extrema e posterior administrao de anticoagulantes pode ocasionar hematomas cervicais macios compressivos sobre a traqueia.',
    protocoloGlicocorticoidesPrimeiraLinha:
      'Os glicocorticoides constituem a base farmacolgica de primeira linha inegocivel no tratamento da AHIM canina. O mecanismo de ao engloba a rpida inibio da expresso e afinidade dos receptores Fc-gama nos macrfagos esplnicos (reduzindo a fagocitose de hemcias em 24 a 48 horas), supresso da sntese de citocinas inflamatrias e, mais tardiamente, inibio da produo de autoanticorpos pelos linfcitos B. A prednisona ou prednisolona deve ser prescrita na dose de 2 a 3 mg/kg/dia por via oral (administrada em dose nica matinal ou dividida a cada 12 horas). Para ces de mdio e grande porte (>25 kg de peso corporal), o clculo posolgico por peso linear acarreta superdosagem severa e sndrome de Cushing iatrognica fulminante; nesses animais, deve-se utilizar estritamente a superfcie corporal: 50 a 60 mg/m/dia (mximo absoluto de 60 a 80 mg por animal/dia). Se a via oral estiver inviabilizada por vmitos ou choque, a dexametasona deve ser administrada na dose de 0,15 a 0,3 mg/kg IV a cada 24 horas. Uma mudana paradigmtica estabelecida pelo Consenso ACVIM 2019  a contraindicao de manter essas doses imunossupressoras elevadas por vrias semanas a meses. Uma vez alcanada a estabilidade clnica e laboratorial (hematcrito estvel com PCV >=30% por 7 a 14 dias sem hemlise ativa), inicia-se o desmame gradual, reduzindo a dose em 20% a 25% a cada 2 a 4 semanas, monitorando o hematcrito antes de cada decrscimo.',
    segundoImunossupressorAnaliseCritica:
      'Uma das maiores controvrsias histricas dizia respeito  associao emprica imediata de um segundo imunossupressor no momento do diagnstico. O ensaio clnico prospectivo randomizado (RCT) conduzido por Agnoli et al. (2024, JVIM) avaliou 43 ces com AHIM alocados para receber prednisolona isolada versus prednisolona associada a ciclosporina ou micofenolato de mofetil desde a admisso. Os autores demonstraram que a adio precoce do segundo imunossupressor no aumentou a taxa de remisso hematolgica aguda, no reduziu o nmero de transfuses sanguneas e no diminuiu a mortalidade hospitalar nem a frequncia de recadas em comparao com a monoterapia com esteroides, trazendo apenas custos financeiros acrescidos e risco potencial de toxicidade medicamentosa. Dessa forma, as diretrizes modernas do ACVIM preconizam que a associao de um segundo agente no deve ser universal, ficando reservada a indicaes clnicas especficas: 1) Falha teraputica aos glicocorticoides isolados aps 5 a 7 dias de tratamento adequado; 2) Queda progressiva acelerada do PCV (>=5 pontos percentuais em 24h) com hemlise descontrolada; 3) Dependncia transfusional contnua aps a primeira semana; 4) Apresentaes hiperagudas com hemlise intravascular fulminante e autoaglutinao persistente ps-lavagem; 5) Ces de grande porte (>25 kg) nos quais o desmame mais acelerado do esteroide ser imperativo para evitar caquexia esteroidal.',
    tabelaImunossupressoresSegundaLinha: {
      kind: 'clinicalTable' as const,
      caption: 'Guia de Imunossupressores de Segunda Linha em Ces (ACVIM 2019 / Plumb\'s 10 ed.)',
      headers: [
        'Frmaco',
        'Dose e Via em Ces',
        'Mecanismo de Ao',
        'Latncia de Ao',
        'Monitorizao e Eventos Adversos',
      ],
      rows: [
        [
          'Ciclosporina (Microemulso)',
          '5 mg/kg VO a cada 12h (ou SID)',
          'Inibidor de calcineurina; bloqueia transcrio de IL-2 e ativao de clulas T',
          'Rpida a intermediria (48h a 7 dias)',
          'Vmitos, diarreia, hiperplasia gengival; dosagem srica (vale: 200-500 ng/mL)',
        ],
        [
          'Micofenolato de Mofetil (MMF)',
          '8 a 12 mg/kg VO a cada 12h',
          'Inibe inosina monofosfato desidrogenase (IMPDH); bloqueia sntese de purinas em linfcitos B e T',
          'Rpida (24 a 48 horas)',
          'Toxicidade gastrointestinal (diarreia hemorrgica autolimitada em at 20%), anorexia',
        ],
        [
          'Azatioprina',
          '2 mg/kg VO q24h por 14 dias; depois 2 mg/kg em dias alternados (q48h)',
          'Antimetablito anlogo de purina; incorpora-se ao DNA e inibe proliferao linfocitria',
          'Lenta (14 a 21 dias para efeito pleno)',
          'Mielossupresso (neutropenia, trombocitopenia), hepatite txica aguda, pancreatite; CONTRAINDICADA EM GATOS',
        ],
        [
          'Leflunomida',
          '2 a 4 mg/kg VO a cada 24h',
          'Inibe di-hidroorotato desidrogenase; bloqueia sntese de novo de pirimidinas',
          'Intermediria (3 a 5 dias)',
          'Anorexia, vmitos, anemia no regenerativa, dosar enzimas hepticas periodicamente',
        ],
        [
          'Ciclofosfamida',
          'CONTRAINDICADA DE ROTINA',
          'Agente alquilante citotxico potente',
          'Rpida',
          'ACVIM no recomenda: ensaios clnicos revelaram aumento de mortalidade sem benefcio',
        ],
      ],
    },
    tromboprofilaxiaObrigatoriaCurative:
      'O tromboembolismo pulmonar e a trombose venosa portal representam a principal causa de bito nas primeiras duas semanas de curso clnico da AHIM. O Consenso CURATIVE (2019/2022) e o Consenso ACVIM estabelecem que praticamente 100% dos ces com diagnstico confirmado ou fortemente provvel de AHIM devem receber terapia antitrombtica profiltica imediata, a menos que apresentem trombocitopenia grave concomitante (<30.000 plaquetas/uL) ou hemorragia ativa espontnea. A escolha da classe farmacolgica deve respeitar a fisiopatologia da trombose venosa de baixo cisalhamento, na qual os anticoagulantes so amplamente superiores aos antiplaquetrios isolados: 1) Inibidores orais diretos do Fator Xa: Rivaroxabana (1 a 2 mg/kg VO a cada 24 horas). Apresenta excelente biodisponibilidade oral em ces, farmacocintica previsvel, dispensando monitorizao laboratorial rotineira e com excelente perfil de segurana; 2) Heparinas de Baixo Peso Molecular (LMWH): Enoxaparina (0,8 a 1,2 mg/kg SC a cada 8 horas) ou Dalteparina (150 a 175 UI/kg SC a cada 8 horas), com monitoramento ideal por atividade anti-fator Xa srica (alvo teraputico de 0,5 a 1,0 UI/mL); 3) Heparina No Fracionada (UFH): reservada para terapia intensiva com infuso contnua guiada por tempo de tromboplastina parcial ativada (aPTT alvo: 1,5 a 2 vezes o valor basal); 4) Antiplaquetrios: Clopidogrel (1,1 a 4 mg/kg VO a cada 24 horas, podendo ser precedido por dose de ataque de at 10 mg/kg no primeiro dia). O clopidogrel pode ser associado a anticoagulantes em pacientes de altssimo risco tromboemblico. Ateno crtica: o uso isolado de aspirina em baixa dose (0,5 mg/kg/dia)  expressamente considerado subtimo e desaconselhado pelo ACVIM e CURATIVE devido  variabilidade farmacolgica e falha na preveno de trombos venosos.',
    tabelaProtocoloTromboprofilaxia: {
      kind: 'clinicalTable' as const,
      caption: 'Protocolo de Tromboprofilaxia na AHIM Canina (CURATIVE / ACVIM)',
      headers: [
        'Frmaco Antitrombtico',
        'Classe Farmacolgica',
        'Posologia Recomendada em Ces',
        'Alvo Teraputico / Monitorao',
        'Indicao e Recomendao',
      ],
      rows: [
        [
          'Rivaroxabana',
          'Inibidor oral direto do Fator Xa',
          '1 a 2 mg/kg VO a cada 24h',
          'Farmacocintica previsvel; no requer monitorao de rotina',
          'Primeira escolha prtica oral; alta eficcia e segurana comprovada',
        ],
        [
          'Enoxaparina',
          'Heparina de baixo peso molecular (LMWH)',
          '0,8 a 1,2 mg/kg SC a cada 8h (q8h)',
          'Atividade anti-Xa plasmtica entre 0,5 e 1,0 UI/mL',
          'Excelente opo injetvel hospitalar durante perodo de vmitos/jejum',
        ],
        [
          'Dalteparina',
          'Heparina de baixo peso molecular (LMWH)',
          '150 a 175 UI/kg SC a cada 8h (q8h)',
          'Atividade anti-Xa plasmtica entre 0,5 e 1,0 UI/mL',
          'Alternativa injetvel  enoxaparina com perfil similar',
        ],
        [
          'Clopidogrel',
          'Antagonista do receptor plaquetrio P2Y12',
          '1,1 a 4 mg/kg VO q24h (ataque inicial opcional: at 10 mg/kg)',
          'Inibio de agregao plaquetria por ADP',
          'Antiplaquetrio preferencial; pode ser combinado com rivaroxabana em alto risco',
        ],
        [
          'Aspirina (baixa dose)',
          'Inibidor irreversvel da COX-1 plaquetria',
          '0,5 mg/kg VO q24h (DESACONSELHADA isoladamente)',
          'Inibio de tromboxano A2 (TXA2)',
          'Subtima: ACVIM e CURATIVE contraindicam monoterapia com aspirina na AHIM',
        ],
      ],
    },
    estrategiaTransfusionalRacionalConcentrado:
      'A deciso de transfundir um co com AHIM no deve basear-se exclusivamente em um nmero isolado de hematcrito (como o antigo dogma arbitrrio de PCV <15%). A indicao de hemoterapia deve ser norteada pela presena de sinais clnicos e hemodinmicos de hipxia tecidual e oferta celular insuficiente de oxignio (DO2): taquicardia persistente desproporcional, taquipneia ou dispneia, letargia profunda, fraqueza incapaz de sustentar estao, hipotenso, extremidades frias e hiperlactatemia (>3 a 4 mmol/L) refratria  reposio hidroeletroltica. O hemocomponente de escolha  o concentrado de hemcias (pRBC - packed red blood cells), infundido na dose de 10 a 15 mL/kg ao longo de 2 a 4 horas. O sangue total est indicado apenas na coexistncia de perda volmica aguda ativa. O uso de pRBC recente (armazenado por <=7 a 10 dias)  recomendado pelo ACVIM, pois hemcias estocadas por tempo prolongado sofrem leses oxidativas de membrana, elevam a concentrao de hemoglobina livre no receptor e reduzem a sobrevida eritrocitria ps-transfusional. A tipagem sangunea para o antgeno eritrocitrio canino DEA 1  obrigatria antes da primeira transfuso (animais DEA 1 negativos devem receber sangue DEA 1 negativo para evitar aloimunizao). O teste de compatibilidade cruzada maior (major crossmatch)  mandatrio antes de transfuses repetidas aps 48 a 72 horas da primeira bolsa.',
    tabelaDecisaoTransfusional: {
      kind: 'clinicalTable' as const,
      caption: 'Critrios de Deciso Hemoterpica e Tipagem na AHIM Canina',
      headers: [
        'Item de Avaliao',
        'Conduta Recomendada pelo Consenso ACVIM',
        'Justificativa Fisiopatolgica',
      ],
      rows: [
        [
          'Gatilho Transfusional',
          'Sinais de hipxia tecidual celular (taquicardia, prostrao, lactato >3-4 mmol/L)',
          'Evita transfundir nmeros isolados em pacientes compensados por adaptao crnica',
        ],
        [
          'Hemocomponente de Escolha',
          'Concentrado de hemcias (pRBC) 10 a 15 mL/kg IV em 2 a 4 horas',
          'Repe massa eritrocitria sem sobrecarga volmica de plasma em coraes anmicos',
        ],
        [
          'Idade da Bolsa de Sangue',
          'Preferir pRBC recente estocado por <=7 a 10 dias',
          'Minimiza reaes transfusionais e hemlise de estocagem por leso oxidativa',
        ],
        [
          'Tipagem DEA 1',
          'Obrigatria antes da 1 transfuso (DEA 1 negativo para receptor negativo)',
          'Impede aloimunizao contra o antgeno mais imunognico da espcie canina',
        ],
        [
          'Crossmatch Maior',
          'Mandatrio se o paciente j recebeu sangue h mais de 48-72h',
          'Detecta aloanticorpos formados contra outros sistemas alognicos (DEA 4, 7, Dal, Kai)',
        ],
        [
          'Plasma Fresco Congelado (FFP)',
          'NO indicado rotineiramente como profilaxia de trombose',
          'FFP no repe antitrombina de forma eficaz e aumenta sobrecarga circulatria (TACO)',
        ],
      ],
    },
    terapiasDeResgateHIVIGePlasmaferese:
      'Em ces refratrios  terapia imunossupressora convencional que mantm hemlise intravascular fulminante, aglutinao persistente ou dependncia transfusional com consumo imediato de bolsas de concentrado de hemcias, terapias de resgate avanadas podem ser consideradas: 1) Imunoglobulina Humana Intravenosa (hIVIG): infundida na dose de 0,5 a 1,0 g/kg IV ao longo de 6 a 12 horas. A hIVIG atua por bloqueio competitivo rpido dos receptores Fc-gama nos macrfagos esplnicos e hepticos, impedindo a ligao e destruio das hemcias opsonizadas, alm de acelerar o clearance de autoanticorpos circulantes. Embora oferea estabilizao transitria em casos refratrios, o ACVIM no recomenda seu uso rotineiro inicial devido ao custo elevado, disponibilidade limitada e risco de reaes anafilactoides e leso renal aguda associada a imunoglobulinas; 2) Plasmaferese teraputica (Troca Plasmtica Teraputica - TPE): procedimento extracorpreo avanado que remove fisicamente imunoglobulinas, complexos imunes, fragmentos de complemento e citocinas inflamatrias do plasma do paciente, substituindo o volume por albumina canina ou plasma alognico. Disponvel em centros universitrios e hospitais de alta complexidade para casos super-refratrios.',
    errosComunsEArmadilhasClinicas: [
      'Erro 1: Atrasar o incio da tromboprofilaxia aguardando estabilizao do hematcrito. A trombose venosa ocorre nos primeiros dias; a anticoagulao deve iniciar no ato do diagnstico.',
      'Erro 2: Realizar o teste de aglutinao salina na proporo 1:1. Essa proporo insuficiente gera falso-positivos frequentes por rouleaux. A proporo obrigatria  de 1 gota de sangue para 4 de salina (1:4).',
      'Erro 3: Descartar AHIM porque o teste de Coombs (DAT) resultou negativo. O teste apresenta at 20% a 30% de falso-negativos; a presena de esfercitos e SAT positivo confirma a doena.',
      'Erro 4: Prescrever monoterapia com aspirina em baixa dose (0,5 mg/kg/dia) para tromboprofilaxia. ACVIM e CURATIVE desaconselham formalmente a aspirina isolada pela sua ineficcia em trombos venosos.',
      'Erro 5: Manter doses elevadas de prednisona (2 a 3 mg/kg/dia) por vrias semanas ou meses aps estabilizao, induzindo sepse secundria, atrofia muscular e pancreatite iatrognica.',
      'Erro 6: Utilizar clculo posolgico linear de corticoides em ces gigantes (>25 kg), prescrevendo doses macias txicas. Em ces grandes, calcular por superfcie corporal (50 a 60 mg/m/dia).',
      'Erro 7: Prescrever ciclofosfamida de rotina. Estudos prospectivos demonstraram que a ciclofosfamida no oferece benefcio e aumenta a mortalidade na AHIM canina.',
      'Erro 8: Puncionar veias jugulares traumaticamente em ces com anemia crtica e trombocitopenia associada, predispondo a hematomas cervicais e asfixia mecnica.',
      'Erro 9: Transfundir o paciente baseando-se em um nmero mgico de hematcrito em vez de sinais clnicos de hipxia celular descompensada.',
      'Erro 10: Suspender ou reduzir bruscamente a imunossupresso aps melhora rpida do hematcrito, deflagrando recadas severas de difcil controle.',
    ],
    protocoloPlantaoAhim10Passos: [
      'Passo 1: Oxigenoterapia suave e estrito manejo hands-off para evitar colapso hipxico por estresse.',
      'Passo 2: Venopuno perifrica nica (evitar jugular) e colheita de tubos EDTA para micro-hematcrito (PCV), esfregao, SAT 1:4, Coombs e tipagem DEA 1.',
      'Passo 3: Aferir PCV, protenas plasmticas totais e avaliar cor do plasma no capilar centrifugado (hemoglobinemia vs ictercia).',
      'Passo 4: Executar o teste de aglutinao salina rigorosamente na proporo 1 gota de sangue : 4 gotas de salina (1:4).',
      'Passo 5: Confeccionar e corar esfregao sanguneo para contagem de esfercitos em imerso (100x), pesquisa de Babesia e policromasia.',
      'Passo 6: Se houver sinais de hipxia clnica descompensada, solicitar concentrado de hemcias (pRBC) DEA 1 compatvel recente.',
      'Passo 7: Iniciar imediatamente prednisona ou prednisolona (2 a 3 mg/kg/dia VO ou 50 a 60 mg/m/dia para ces >25 kg; ou dexametasona 0,15-0,3 mg/kg IV).',
      'Passo 8: Prescrever tromboprofilaxia obrigatria imediata: rivaroxabana (1 a 2 mg/kg VO q24h) ou enoxaparina (0,8 a 1,2 mg/kg SC q8h).',
      'Passo 9: Solicitar exames para triagem de aIMHA: PCR/sorologia para Babesia gibsoni, pesquisa de Dirofilaria e radiografias toracoabdominais.',
      'Passo 10: Internar em monitorizao intensiva, aferindo PCV seriado a cada 12 a 24 horas, frequncia respiratria em repouso e lactato.',
    ],
  },
  complications: {
    tromboembolismoPulmonarEVenoso:
      'O tromboembolismo pulmonar (TEP), a trombose da veia porta e o infarto esplnico so complicaes diretas da hipercoagulabilidade combinada  hipofibrinlise descrita por Goggs et al. (2025). O TEP apresenta letalidade altssima e pode instalar-se subitamente mesmo durante a recuperao do hematcrito. A monitorizao da frequncia respiratria em repouso e a manuteno ininterrupta de antitrombticos so cruciais.',
    complicacaoPancreatiteAgudaHemoglobinaLivre:
      'A pancreatite aguda foi classicamente debatida como causa ou consequncia na AHIM. O estudo de Gianesini et al. (2023, JVIM) esclareceu que a pancreatite aguda suspeita ocorre com frequncia significativamente aumentada em ces com AHIM (RR 2,54) e correlaciona-se com concentraes elevadas de hemoglobina livre intravascular (>=0,08 g/dL). A hemoglobina tetramrica livre e o heme catalisam leso oxidativa endotelial e microtrombose na vascularizao pancretica terminal, configurando a pancreatite como uma consequncia direta da hemlise intravascular severa, e no como gatilho causal primrio.',
    lesaoRenalAgudaHemoglobinurica:
      'Na hemlise intravascular descompensada, a hemoglobina dimrica livre filtrada pelos glomrulos satura a capacidade de reabsoro do tbulo contorcido proximal. A precipitao intraluminal de cilindros de hemoglobina, a formao de metemoglobina citotxica, a peroxidao lipdica mediada por ferro livre e a isquemia renal provocada pelo consumo local de xido ntrico culminam em necrose tubular aguda (NTA) e leso renal aguda anrica ou oligrica grave.',
    sepseEInfeccoesOportunistas:
      'A administrao de doses imunossupressoras plenas de glicocorticoides, isoladamente ou combinadas com ciclosporina ou micofenolato, eleva exponencialmente a vulnerabilidade a infeces bacterianas oportunistas, com destaque para infeces bacterianas do trato urinrio (ITU) subclnicas ou ascendentes (pielonefrite), pneumonias e piodermites profundas. O Consenso ACVIM recomenda urocultura peridica e vigilncia clnica contnua.',
  },
  prevention: {
    segurancaVacinalPosRemissaoSparrow2024:
      'O manejo imunolgico a longo prazo aps a remisso completa da AHIM exigia cautela excessiva com vacinas. As evidncias contemporneas de Sparrow et al. (2024) em 73 ces demonstram que revacinar pacientes que completaram o desmame dos imunossupressores e mantm hematcrito estvel  seguro e no aumenta o risco de recadas da AHIM. A deciso vacinal deve ser tomada com base no risco epidemiolgico real de infeces fatais.',
    prevencaoDeGatilhosVetoriais:
      'A preveno primria mais eficaz de formas associativas infecciosas (aIMHA) baseia-se no controle ectoparasiticida rigoroso e ininterrupto com isoxazolinas orais (afoxolaner, fluralaner, sarolaner) e coleiras repelentes impregnadas com piretroides para bloquear a transmisso de carrapatos vetores de Babesia canis, Babesia vogeli e agentes da erliquiose.',
    monitoramentoContinuoEPrevecaoDeRecidivas:
      'O acompanhamento ps-alta envolve retornos peridicos semanais no primeiro ms, quinzenais at o terceiro ms e mensais at o trmino do desmame. Em cada reviso, deve-se aferir o hematcrito/PCV centrifugado, a contagem de reticulcitos e investigar proteinria ou alteraes hepticas induzidas por frmacos. Os tutores devem ser instrudos a monitorar diariamente a colorao da gengiva e da urina.',
  },
  relatedConsensusSlugs: [
    'acvim-ahim-diagnostico-caes-gatos-2019',
    'acvim-ahim-tratamento-canino-2019',
    'curative-risco-trombotico-2022',
  ],
  relatedDiseaseSlugs: ['babesiose-canina', 'micoplasmoses-hemotropicas', 'trombocitopenia-caes-gatos', 'anemia-caes-gatos'],
  relatedMedicationSlugs: ['prednisolona'],
  references: [
    {
      id: 'ref-acvim-diag-2019',
      citationText:
        'Garden OA, Kidd L, Mexas AM, et al. ACVIM consensus statement on the diagnosis of immune-mediated hemolytic anemia in dogs and cats. J Vet Intern Med. 2019;33(2):313-334.',
      sourceType: 'Consenso ACVIM',
      url: 'https://doi.org/10.1111/jvim.15441',
      notes: 'Diretrizes consensuais vigentes para diagnstico, trade confirmatria e investigao de causas associadas em ces e gatos.',
      evidenceLevel: 'Consenso de especialistas',
    },
    {
      id: 'ref-acvim-treat-2019',
      citationText:
        'Swann JW, Garden OA, Fellman CL, et al. ACVIM consensus statement on the treatment of immune-mediated hemolytic anemia in dogs. J Vet Intern Med. 2019;33(3):1141-1172.',
      sourceType: 'Consenso ACVIM',
      url: 'https://doi.org/10.1111/jvim.15463',
      notes: 'Diretrizes teraputicas contendo 46 recomendaes sobre glicocorticoides, segundo agente, tromboprofilaxia e transfuso em ces.',
      evidenceLevel: 'Consenso de especialistas',
    },
    {
      id: 'ref-curative-2019-2022',
      citationText:
        'deLaforcade A, Blais MC, Goggs R, et al. 2019 / 2022 CURATIVE consensus guidelines on the prevention and management of thrombosis in small animals. J Vet Emerg Crit Care. 2019;29(1):37-74.',
      sourceType: 'Consenso Internacional CURATIVE',
      url: 'https://doi.org/10.1111/vec.12795',
      notes: 'Diretrizes de estratificao de risco trombtico e protocolos de tromboprofilaxia com anticoagulantes e antiplaquetrios.',
      evidenceLevel: 'Consenso de especialistas',
    },
    {
      id: 'ref-goggs-2025',
      citationText:
        'Goggs R, Davis S, Brooks MB. Tissue plasminogen activator modified thromboelastography identifies fibrinolysis resistance in dogs with immune-mediated hemolytic anemia. Front Vet Sci. 2025;12:1571683.',
      sourceType: 'Estudo prospectivo controlado',
      url: 'https://doi.org/10.3389/fvets.2025.1571683',
      notes: 'Comprovao de resistncia  fibrinlise (hipofibrinlise), ativao de TAFI, aumento marcante de PAI-1 e NETose em ces com AHIM.',
      evidenceLevel: 'Evidncia laboratorial e clnica',
    },
    {
      id: 'ref-agnoli-2024',
      citationText:
        'Agnoli C, et al. Prospective randomized clinical trial evaluating the addition of cyclosporine or mycophenolate mofetil to prednisolone in canine immune-mediated hemolytic anemia. J Vet Intern Med. 2024;38(4):2112-2122.',
      sourceType: 'Ensaio clnico randomizado prospectivo (RCT)',
      url: 'https://doi.org/10.1111/jvim.17112',
      notes: 'Estudo com 43 ces demonstrando que a adio de segundo imunossupressor no melhora a resposta hematolgica aguda na corticoterapia inicial.',
      evidenceLevel: 'Ensaio clnico randomizado',
    },
    {
      id: 'ref-weng-2023',
      citationText:
        'Weng HY, et al. Multicenter retrospective evaluation of immunosuppressive regimens and clinical outcomes in 242 dogs with immune-mediated hemolytic anemia. J Vet Intern Med. 2023;37(5):1685-1695.',
      sourceType: 'Estudo multicntrico de coorte',
      url: 'https://doi.org/10.1111/jvim.16853',
      notes: 'Avaliao de monoterapia versus politerapia na sobrevida a curto e mdio prazo em 242 ces.',
      evidenceLevel: 'Estudo observacional multicntrico',
    },
    {
      id: 'ref-sparrow-2024',
      citationText:
        'Sparrow T, et al. Post-remission vaccination safety and long-term relapse rates in 73 dogs with immune-mediated hemolytic anemia. J Vet Intern Med. 2024;38(3):1450-1458.',
      sourceType: 'Estudo prospectivo de coorte',
      url: 'https://doi.org/10.1111/jvim.17056',
      notes: 'Demonstrao da segurana vacinal aps remisso da AHIM e anlise da dinmica temporal de recadas (11% em 1 ano, 18% em 2 anos).',
      evidenceLevel: 'Estudo observacional prospectivo',
    },
    {
      id: 'ref-gianesini-2023',
      citationText:
        'Gianesini G, et al. Suspected acute pancreatitis in dogs with immune-mediated hemolytic anemia: prevalence and association with intravascular hemolysis and free hemoglobin. J Vet Intern Med. 2023;37(4):1401-1409.',
      sourceType: 'Estudo clnico observacional',
      url: 'https://doi.org/10.1111/jvim.16801',
      notes: 'Leso endotelial microvascular e pancreatite como complicao secundria de hemoglobina livre (RR 2,54).',
      evidenceLevel: 'Estudo observacional',
    },
    {
      id: 'ref-nelson-couto-6e',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2020. Chapter 73: Common Immune-Mediated Diseases, pp. 1234-1238; Chapter 2: Anemia, pp. 18-35.',
      sourceType: 'Livro-texto do acervo',
      notes: 'Fundamentao clnica da etiopatogenia, esferocitose, autoaglutinao e protocolos imunossupressores.',
      evidenceLevel: 'Referncia clnica',
    },
    {
      id: 'ref-plumbs-10e',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. Wiley-Blackwell; 2023. Monografias: Prednisone/Prednisolone, Dexamethasone, Cyclosporine, Mycophenolate mofetil, Azathioprine, Leflunomide, Rivaroxaban, Clopidogrel, Enoxaparin, Dalteparin, Unfractionated Heparin.',
      sourceType: 'Manual farmacolgico do acervo',
      notes: 'Doses, mecanismos, parmetros de monitorizao e farmacocintica de imunossupressores e antitrombticos.',
      evidenceLevel: 'Referncia farmacolgica',
    },
    {
      id: 'ref-bsava-10e',
      citationText:
        'Ramsey I, ed. BSAVA Small Animal Formulary. 10th ed. Part A: Canine and Feline. British Small Animal Veterinary Association; 2020. Monografias de imunossupressores e heparinas em pequenos animais.',
      sourceType: 'Manual farmacolgico do acervo',
      notes: 'Posologia e segurana de agentes imunomoduladores e anticoagulantes.',
      evidenceLevel: 'Referncia farmacolgica',
    },
  ],
  isPublished: true,
  source: 'seed',
};
`;

// Replace accented characters with proper Portuguese UTF-8 characters
const fixedContent = seedContent
  .replace(/cannico/g, 'canônico')
  .replace(/cientfica/g, 'científica')
  .replace(/clnica/g, 'clínica')
  .replace(/clnico/g, 'clínico')
  .replace(/clnicos/g, 'clínicos')
  .replace(/clnicas/g, 'clínicas')
  .replace(/referncia/g, 'referência')
  .replace(/hipofibrinlise/g, 'hipofibrinólise')
  .replace(/resistncia/g, 'resistência')
  .replace(/fibrinoltica/g, 'fibrinolítica')
  .replace(/Ensaio clnico/g, 'Ensaio clínico')
  .replace(/ausncia/g, 'ausência')
  .replace(/benefcio/g, 'benefício')
  .replace(/adio/g, 'adição')
  .replace(/corticoterapia/g, 'corticoterapia')
  .replace(/coorte multicntrica/g, 'coorte multicêntrica')
  .replace(/segurana/g, 'segurança')
  .replace(/ps-remisso/g, 'pós-remissão')
  .replace(/dinmica/g, 'dinâmica')
  .replace(/recada/g, 'recaída')
  .replace(/recadas/g, 'recaídas')
  .replace(/leso/g, 'lesão')
  .replace(/secundria/g, 'secundária')
  .replace(/secundrio/g, 'secundário')
  .replace(/secundrias/g, 'secundárias')
  .replace(/secundrios/g, 'secundários')
  .replace(/Restrio/g, 'Restrição')
  .replace(/inviolvel/g, 'inviolável')
  .replace(/Hemoltica/g, 'Hemolítica')
  .replace(/hemoltica/g, 'hemolítica')
  .replace(/hemoltico/g, 'hemolítico')
  .replace(/hemolticos/g, 'hemolíticos')
  .replace(/hemolticas/g, 'hemolíticas')
  .replace(/Imunomediada/g, 'Imunomediada')
  .replace(/imunomediada/g, 'imunomediada')
  .replace(/imunomediadas/g, 'imunomediadas')
  .replace(/imunomediado/g, 'imunomediado')
  .replace(/Ces/g, 'Cães')
  .replace(/ces/g, 'cães')
  .replace(/co/g, 'cão')
  .replace(/avanada/g, 'avançada')
  .replace(/avanadas/g, 'avançadas')
  .replace(/avanados/g, 'avançados')
  .replace(/diagnstico/g, 'diagnóstico')
  .replace(/diagnsticos/g, 'diagnósticos')
  .replace(/diagnstica/g, 'diagnóstica')
  .replace(/diagnsticas/g, 'diagnósticas')
  .replace(/teraputicas/g, 'terapêuticas')
  .replace(/teraputica/g, 'terapêutica')
  .replace(/teraputico/g, 'terapêutico')
  .replace(/teraputicos/g, 'terapêuticos')
  .replace(/tromboinflamatria/g, 'tromboinflamatória')
  .replace(/tromboinflamatrio/g, 'tromboinflamatório')
  .replace(/evidncias/g, 'evidências')
  .replace(/evidncia/g, 'evidência')
  .replace(/autotolerncia/g, 'autotolerância')
  .replace(/destruio/g, 'destruição')
  .replace(/eritrcitos/g, 'eritrócitos')
  .replace(/eritrcito/g, 'eritrócito')
  .replace(/fraes/g, 'frações')
  .replace(/frao/g, 'fração')
  .replace(/trade/g, 'tríade')
  .replace(/micro-hematcrito/g, 'micro-hematócrito')
  .replace(/inequvoca/g, 'inequívoca')
  .replace(/esfercitos/g, 'esferócitos')
  .replace(/esfercito/g, 'esferócito')
  .replace(/aglutinao/g, 'aglutinação')
  .replace(/clulas/g, 'células')
  .replace(/clula/g, 'célula')
  .replace(/hemlise/g, 'hemólise')
  .replace(/hemoglobinria/g, 'hemoglobinúria')
  .replace(/hemoglobinmico/g, 'hemoglobinêmico')
  .replace(/hemoglobinmica/g, 'hemoglobinêmica')
  .replace(/indissociveis/g, 'indissociáveis')
  .replace(/orientado por metas/g, 'orientado por metas')
  .replace(/obrigatria/g, 'obrigatória')
  .replace(/obrigatrio/g, 'obrigatório')
  .replace(/mortalidade/g, 'mortalidade')
  .replace(/hemoterpica/g, 'hemoterápica')
  .replace(/hemoterpico/g, 'hemoterápico')
  .replace(/hipxia/g, 'hipóxia')
  .replace(/compatibilidade/g, 'compatibilidade')
  .replace(/empricos/g, 'empíricos')
  .replace(/emprico/g, 'empírico')
  .replace(/estveis/g, 'estáveis')
  .replace(/decrscimo/g, 'decréscimo')
  .replace(/indiscriminada/g, 'indiscriminada')
  .replace(/indicao/g, 'indicação')
  .replace(/indicaes/g, 'indicações')
  .replace(/contraindicao/g, 'contraindicação')
  .replace(/contraindicaes/g, 'contraindicações')
  .replace(/reao/g, 'reação')
  .replace(/reaes/g, 'reações')
  .replace(/exgenos/g, 'exógenos')
  .replace(/frmacos/g, 'fármacos')
  .replace(/frmaco/g, 'fármaco')
  .replace(/sistmicas/g, 'sistêmicas')
  .replace(/sistmica/g, 'sistêmica')
  .replace(/sistmico/g, 'sistêmico')
  .replace(/sistmicos/g, 'sistêmicos')
  .replace(/gnero/g, 'gênero')
  .replace(/mordeduras/g, 'mordeduras')
  .replace(/transplacentria/g, 'transplacentária')
  .replace(/alteraes/g, 'alterações')
  .replace(/alterao/g, 'alteração')
  .replace(/infeco/g, 'infecção')
  .replace(/infeces/g, 'infecções')
  .replace(/neoplasia/g, 'neoplasia')
  .replace(/neoplasias/g, 'neoplasias')
  .replace(/raa/g, 'raça')
  .replace(/raas/g, 'raças')
  .replace(/gentica/g, 'genética')
  .replace(/genticas/g, 'genéticas')
  .replace(/gentico/g, 'genético')
  .replace(/genticos/g, 'genéticos')
  .replace(/Dachshund/g, 'Dachshund')
  .replace(/epidemiolgicos/g, 'epidemiol决策gicos')
  .replace(/epidemiolgicos/g, 'epidemiológicos')
  .replace(/epidemiolgico/g, 'epidemiológico')
  .replace(/epidemiolgica/g, 'epidemiológica')
  .replace(/epidemiolgicas/g, 'epidemiológicas')
  .replace(/Ingls/g, 'Inglês')
  .replace(/ingls/g, 'inglês')
  .replace(/Francs/g, 'Francês')
  .replace(/francs/g, 'francês')
  .replace(/Fris/g, 'Frisé')
  .replace(/Alemo/g, 'Alemão')
  .replace(/alemo/g, 'alemão')
  .replace(/Malts/g, 'Maltês')
  .replace(/malts/g, 'maltês')
  .replace(/Fmeas/g, 'Fêmeas')
  .replace(/fmeas/g, 'fêmeas')
  .replace(/predisposio/g, 'predisposição')
  .replace(/razes/g, 'razões')
  .replace(/razo/g, 'razão')
  .replace(/castrao/g, 'castração')
  .replace(/faixa etria/g, 'faixa etária')
  .replace(/faixas etrias/g, 'faixas etárias')
  .replace(/incidncia/g, 'incidência')
  .replace(/Apresentaes/g, 'Apresentações')
  .replace(/apresentaes/g, 'apresentações')
  .replace(/apresentao/g, 'apresentação')
  .replace(/atpicas/g, 'atípicas')
  .replace(/atpica/g, 'atípica')
  .replace(/atpico/g, 'atípico')
  .replace(/atpicos/g, 'atípicos')
  .replace(/anomalias/g, 'anomalias')
  .replace(/deficincia/g, 'deficiência')
  .replace(/geritricos/g, 'geriátricos')
  .replace(/geritrico/g, 'geriátrico')
  .replace(/prognsticos/g, 'prognósticos')
  .replace(/prognstico/g, 'prognóstico')
  .replace(/hospitalizao/g, 'hospitalização')
  .replace(/produo/g, 'produção')
  .replace(/poro/g, 'porção')
  .replace(/superfcie/g, 'superfície')
  .replace(/sinusides/g, 'sinusoides')
  .replace(/esplnico/g, 'esplênico')
  .replace(/esplnicos/g, 'esplênicos')
  .replace(/esplnica/g, 'esplênica')
  .replace(/esplnicas/g, 'esplênicas')
  .replace(/heptico/g, 'hepático')
  .replace(/hepticos/g, 'hepáticos')
  .replace(/heptica/g, 'hepática')
  .replace(/hepticas/g, 'hepáticas')
  .replace(/macrfagos/g, 'macrófagos')
  .replace(/macrfago/g, 'macrófago')
  .replace(/esfrico/g, 'esférico')
  .replace(/esfrica/g, 'esférica')
  .replace(/esfricos/g, 'esféricos')
  .replace(/esfricas/g, 'esféricas')
  .replace(/rgido/g, 'rígido')
  .replace(/rgida/g, 'rígida')
  .replace(/rgidos/g, 'rígidos')
  .replace(/rgidas/g, 'rígidas')
  .replace(/conformao/g, 'conformação')
  .replace(/pentamrica/g, 'pentamérica')
  .replace(/ligao/g, 'ligação')
  .replace(/clssica/g, 'clássica')
  .replace(/deposio/g, 'deposição')
  .replace(/macia/g, 'maciça')
  .replace(/macio/g, 'maciço')
  .replace(/macias/g, 'maciças')
  .replace(/macios/g, 'maciços')
  .replace(/opsonizao/g, 'opsonização')
  .replace(/hidroflicos/g, 'hidrofílicos')
  .replace(/sangunea/g, 'sanguínea')
  .replace(/sanguneo/g, 'sanguíneo')
  .replace(/sanguneas/g, 'sanguíneas')
  .replace(/sanguneos/g, 'sanguíneos')
  .replace(/interdependentes/g, 'interdependentes')
  .replace(/Expresso/g, 'Expressão')
  .replace(/expresso/g, 'expressão')
  .replace(/Gerao/g, 'Geração')
  .replace(/gerao/g, 'geração')
  .replace(/eritrocitrias/g, 'eritrocitárias')
  .replace(/eritrocitria/g, 'eritrocitária')
  .replace(/eritrocitrio/g, 'eritrocitário')
  .replace(/eritrocitrios/g, 'eritrocitários')
  .replace(/Sequestro/g, 'Sequestro')
  .replace(/xido ntrico/g, 'óxido nítrico')
  .replace(/vasoconstrio/g, 'vasoconstrição')
  .replace(/patolgica/g, 'patológica')
  .replace(/molculas/g, 'moléculas')
  .replace(/adeso/g, 'adesão')
  .replace(/plaquetria/g, 'plaquetária')
  .replace(/plaquetrio/g, 'plaquetário')
  .replace(/plaquetrias/g, 'plaquetárias')
  .replace(/plaquetrios/g, 'plaquetários')
  .replace(/exacerbao/g, 'exacerbação')
  .replace(/trombtica/g, 'trombótica')
  .replace(/trombtico/g, 'trombótico')
  .replace(/trombticos/g, 'trombóticos')
  .replace(/trombticas/g, 'trombóticas')
  .replace(/elevao/g, 'elevação')
  .replace(/elevaes/g, 'elevações')
  .replace(/plasmtica/g, 'plasmática')
  .replace(/plasmtico/g, 'plasmático')
  .replace(/plasmticos/g, 'plasmáticos')
  .replace(/plasmticas/g, 'plasmáticas')
  .replace(/inibio/g, 'inibição')
  .replace(/plasminognio/g, 'plasminogênio')
  .replace(/ativvel/g, 'ativável')
  .replace(/neutrfilos/g, 'neutrófilos')
  .replace(/fisiolgica/g, 'fisiológica')
  .replace(/fisiolgico/g, 'fisiológico')
  .replace(/fisiolgicos/g, 'fisiológicos')
  .replace(/fisiolgicas/g, 'fisiológicas')
  .replace(/Traados/g, 'Traçados')
  .replace(/traados/g, 'traçados')
  .replace(/traado/g, 'traçado')
  .replace(/Concentraes/g, 'Concentrações')
  .replace(/concentraes/g, 'concentrações')
  .replace(/concentrao/g, 'concentração')
  .replace(/hgidos/g, 'hígidos')
  .replace(/hgidas/g, 'hígidas')
  .replace(/hgido/g, 'hígido')
  .replace(/hgida/g, 'hígida')
  .replace(/padro/g, 'padrão')
  .replace(/padres/g, 'padrões')
  .replace(/repercusses/g, 'repercussões')
  .replace(/biliar/g, 'biliar')
  .replace(/biliares/g, 'biliares')
  .replace(/lmpida/g, 'límpida')
  .replace(/rsea/g, 'rósea')
  .replace(/rseo/g, 'róseo')
  .replace(/dimrica/g, 'dimérica')
  .replace(/dimrico/g, 'dimérico')
  .replace(/filtrao/g, 'filtração')
  .replace(/tbulo/g, 'túbulo')
  .replace(/tbulos/g, 'túbulos')
  .replace(/isqumica/g, 'isquêmica')
  .replace(/isqumico/g, 'isquêmico')
  .replace(/nefrotxica/g, 'nefrotóxica')
  .replace(/nefrotxico/g, 'nefrotóxico')
  .replace(/colapso circulatrio/g, 'colapso circulatório')
  .replace(/Parmetro/g, 'Parâmetro')
  .replace(/parmetro/g, 'parâmetro')
  .replace(/parmetros/g, 'parâmetros')
  .replace(/Tpica/g, 'Típica')
  .replace(/tpica/g, 'típica')
  .replace(/tpico/g, 'típico')
  .replace(/tpicos/g, 'típicos')
  .replace(/tpicas/g, 'típicas')
  .replace(/Crtico/g, 'Crítico')
  .replace(/crtico/g, 'crítico')
  .replace(/crtica/g, 'crítica')
  .replace(/crticos/g, 'críticos')
  .replace(/crticas/g, 'críticas')
  .replace(/regenerativa/g, 'regenerativa')
  .replace(/reticulcitos/g, 'reticulócitos')
  .replace(/reticulcito/g, 'reticulócito')
  .replace(/srie/g, 'série')
  .replace(/morfologia/g, 'morfologia')
  .replace(/aspirado/g, 'aspirado')
  .replace(/bipsia/g, 'biópsia')
  .replace(/histria/g, 'história')
  .replace(/exerccio/g, 'exercício')
  .replace(/exerccios/g, 'exercícios')
  .replace(/vmitos/g, 'vômitos')
  .replace(/vmito/g, 'vômito')
  .replace(/sncope/g, 'síncope')
  .replace(/sncopes/g, 'síncopes')
  .replace(/fsico/g, 'físico')
  .replace(/fsica/g, 'física')
  .replace(/fsicos/g, 'físicos')
  .replace(/fsicas/g, 'físicas')
  .replace(/compensatria/g, 'compensatória')
  .replace(/compensatrio/g, 'compensatório')
  .replace(/hiperdinmicos/g, 'hiperdinâmicos')
  .replace(/saltatrios/g, 'saltatórios')
  .replace(/reduo/g, 'redução')
  .replace(/drstica/g, 'drástica')
  .replace(/vasodilatao/g, 'vasodilatao')
  .replace(/vasodilatao/g, 'vasodilatação')
  .replace(/cardaco/g, 'cardíaco')
  .replace(/cardacos/g, 'cardíacos')
  .replace(/cardaca/g, 'cardíaca')
  .replace(/cardacas/g, 'cardíacas')
  .replace(/sistlico/g, 'sistólico')
  .replace(/sistlica/g, 'sistólica')
  .replace(/audvel/g, 'audível')
  .replace(/audveis/g, 'audíveis')
  .replace(/pirognicas/g, 'pirogênicas')
  .replace(/palpvel/g, 'palpável')
  .replace(/palpveis/g, 'palpáveis')
  .replace(/congesto/g, 'congestão')
  .replace(/pavilhes/g, 'pavilhões')
  .replace(/colorao/g, 'coloração')
  .replace(/varivel/g, 'variável')
  .replace(/variveis/g, 'variáveis')
  .replace(/centrifugao/g, 'centrifugação')
  .replace(/amostra/g, 'amostra')
  .replace(/hematria/g, 'hematúria')
  .replace(/mico/g, 'micção')
  .replace(/catastrfica/g, 'catastrófica')
  .replace(/angstia/g, 'angústia')
  .replace(/dor torcica/g, 'dor torácica')
  .replace(/semiolgico/g, 'semiológico')
  .replace(/auscultao/g, 'auscultação')
  .replace(/surpreendentemente/g, 'surpreendentemente')
  .replace(/silenciosos/g, 'silenciosos')
  .replace(/dissociao/g, 'dissociação')
  .replace(/estertores/g, 'estertores')
  .replace(/crepitaes/g, 'crepitações')
  .replace(/crepitao/g, 'crepitação')
  .replace(/estgios/g, 'estágios')
  .replace(/estgio/g, 'estágio')
  .replace(/obstruo/g, 'obstrução')
  .replace(/alvolo-arterial/g, 'alvéolo-arterial')
  .replace(/oxigenao/g, 'oxigenação')
  .replace(/oxigenoterapia/g, 'oxigenoterapia')
  .replace(/distrbio/g, 'distúrbio')
  .replace(/distrbios/g, 'distúrbios')
  .replace(/ventilao/g, 'ventilação')
  .replace(/perfuso/g, 'perfusão')
  .replace(/intensificao/g, 'intensificação')
  .replace(/antotrombticos/g, 'antitrombóticos')
  .replace(/antitrombticos/g, 'antitrombóticos')
  .replace(/antitrombtico/g, 'antitrombótico')
  .replace(/antitrombtica/g, 'antitrombótica')
  .replace(/antitrombticas/g, 'antitrombóticas')
  .replace(/uniformizar/g, 'uniformizar')
  .replace(/inegociveis/g, 'inegociáveis')
  .replace(/inegocivel/g, 'inegociável')
  .replace(/Confirmao/g, 'Confirmação')
  .replace(/confirmao/g, 'confirmação')
  .replace(/Demonstrao/g, 'Demonstração')
  .replace(/demonstrao/g, 'demonstração')
  .replace(/Classificao/g, 'Classificação')
  .replace(/classificao/g, 'classificação')
  .replace(/confirmatrio/g, 'confirmatório')
  .replace(/confirmatria/g, 'confirmatória')
  .replace(/provvel/g, 'provável')
  .replace(/provveis/g, 'prováveis')
  .replace(/Requerido/g, 'Requerido')
  .replace(/Validados/g, 'Validados')
  .replace(/remoo/g, 'remoção')
  .replace(/microscpio/g, 'microscópio')
  .replace(/ptico/g, 'óptico')
  .replace(/domstica/g, 'doméstica')
  .replace(/domstico/g, 'doméstico')
  .replace(/halo central/g, 'halo central')
  .replace(/semiquantitativo/g, 'semiquantitativo')
  .replace(/referendados/g, 'referendados')
  .replace(/Visualizao/g, 'Visualização')
  .replace(/visualizao/g, 'visualização')
  .replace(/aglomerados/g, 'aglomerados')
  .replace(/organizao/g, 'organização')
  .replace(/ancorados/g, 'ancorados')
  .replace(/adio/g, 'adição')
  .replace(/poliespecfico/g, 'poliespecífico')
  .replace(/monoespecfico/g, 'monoespecífico')
  .replace(/quantitativo/g, 'quantitativo')
  .replace(/limtrofes/g, 'limítrofes')
  .replace(/mnimo/g, 'mínimo')
  .replace(/mnima/g, 'mínima')
  .replace(/corpsculos/g, 'corpúsculos')
  .replace(/corpsculo/g, 'corpúsculo')
  .replace(/trofozotos/g, 'trofozoítos')
  .replace(/trofozoto/g, 'trofozoíto')
  .replace(/antignico/g, 'antigênico')
  .replace(/antignica/g, 'antigênica')
  .replace(/antignicos/g, 'antigênicos')
  .replace(/antignicas/g, 'antigênicas')
  .replace(/modificada/g, 'modificada')
  .replace(/bioqumico/g, 'bioquímico')
  .replace(/bioqumica/g, 'bioquímica')
  .replace(/bioqumicos/g, 'bioquímicos')
  .replace(/bioqumicas/g, 'bioquímicas')
  .replace(/Urinlise/g, 'Urinálise')
  .replace(/urinlise/g, 'urinálise')
  .replace(/cistocentese/g, 'cistocentese')
  .replace(/quantitativa/g, 'quantitativa')
  .replace(/radiografia/g, 'radiografia')
  .replace(/radiografias/g, 'radiografias')
  .replace(/projees/g, 'projeções')
  .replace(/projeo/g, 'projeção')
  .replace(/metstases/g, 'metástases')
  .replace(/metstase/g, 'metástase')
  .replace(/metlicos/g, 'metálicos')
  .replace(/metlico/g, 'metálico')
  .replace(/simulando/g, 'simulando')
  .replace(/linfonodos/g, 'linfonodos')
  .replace(/linfonodo/g, 'linfonodo')
  .replace(/arquitetura/g, 'arquitetura')
  .replace(/Contenes/g, 'Contenções')
  .replace(/contenes/g, 'contenções')
  .replace(/conteno/g, 'contenção')
  .replace(/perifrica/g, 'periférica')
  .replace(/perifrico/g, 'periférico')
  .replace(/perifricas/g, 'periféricas')
  .replace(/perifricos/g, 'periféricos')
  .replace(/safena/g, 'safena')
  .replace(/ceflica/g, 'cefálica')
  .replace(/punes/g, 'punções')
  .replace(/puno/g, 'punção')
  .replace(/traumticas/g, 'traumáticas')
  .replace(/traumtica/g, 'traumática')
  .replace(/traumtico/g, 'traumático')
  .replace(/traumticos/g, 'traumáticos')
  .replace(/veia jugular/g, 'veia jugular')
  .replace(/veias jugulares/g, 'veias jugulares')
  .replace(/compressivos/g, 'compressivos')
  .replace(/compressivo/g, 'compressivo')
  .replace(/farmacolgica/g, 'farmacológica')
  .replace(/farmacolgico/g, 'farmacológico')
  .replace(/farmacolgicos/g, 'farmacológicos')
  .replace(/farmacolgicas/g, 'farmacológicas')
  .replace(/sntese/g, 'síntese')
  .replace(/prescrita/g, 'prescrita')
  .replace(/prescrito/g, 'prescrito')
  .replace(/posolgico/g, 'posológico')
  .replace(/posolgica/g, 'posológica')
  .replace(/posologia/g, 'posologia')
  .replace(/superdosagem/g, 'superdosagem')
  .replace(/iatrognica/g, 'iatrogênica')
  .replace(/iatrognico/g, 'iatrogênico')
  .replace(/mximo/g, 'máximo')
  .replace(/mxima/g, 'máxima')
  .replace(/invabilizada/g, 'inviabilizada')
  .replace(/paradigmtica/g, 'paradigmática')
  .replace(/paradigmtico/g, 'paradigmático')
  .replace(/alcanada/g, 'alcançada')
  .replace(/alcanado/g, 'alcançado')
  .replace(/controvrsias/g, 'controvérsias')
  .replace(/controvrsia/g, 'controvérsia')
  .replace(/frequncia/g, 'frequência')
  .replace(/acrescidos/g, 'acrescidos')
  .replace(/acrescido/g, 'acrescido')
  .replace(/medicamentosa/g, 'medicamentosa')
  .replace(/pontos percentuais/g, 'pontos percentuais')
  .replace(/descontrolada/g, 'descontrolada')
  .replace(/contnua/g, 'contínua')
  .replace(/contnuo/g, 'contínuo')
  .replace(/contnuos/g, 'contínuos')
  .replace(/contnuas/g, 'contínuas')
  .replace(/caquexia/g, 'caquexia')
  .replace(/Guia de Imunossupressores/g, 'Guia de Imunossupressores')
  .replace(/Plumb\'s 10 ed\./g, "Plumb's 10ª ed.")
  .replace(/Inibidor/g, 'Inibidor')
  .replace(/transcrio/g, 'transcrição')
  .replace(/ativao/g, 'ativação')
  .replace(/dosagem srica/g, 'dosagem sérica')
  .replace(/Antimetablito/g, 'Antimetabólito')
  .replace(/antimetablito/g, 'antimetabólito')
  .replace(/anlogo/g, 'análogo')
  .replace(/proliferao/g, 'proliferação')
  .replace(/CONTRAINDICADA EM GATOS/g, 'CONTRAINDICADA EM GATOS')
  .replace(/perodo/g, 'período')
  .replace(/perodos/g, 'períodos')
  .replace(/revelaram/g, 'revelaram')
  .replace(/anticoagulao/g, 'anticoagulação')
  .replace(/previsvel/g, 'previsível')
  .replace(/previsveis/g, 'previsíveis')
  .replace(/dispensando/g, 'dispensando')
  .replace(/injetvel/g, 'injetável')
  .replace(/injetveis/g, 'injetáveis')
  .replace(/infuso contnua/g, 'infusão contínua')
  .replace(/variabilidade/g, 'variabilidade')
  .replace(/desaconselhada/g, 'desaconselhada')
  .replace(/desaconselhado/g, 'desaconselhado')
  .replace(/DESACONSELHADA/g, 'DESACONSELHADA')
  .replace(/Primeira escolha prtica/g, 'Primeira escolha prática')
  .replace(/segurana comprovada/g, 'segurança comprovada')
  .replace(/Excelente opo/g, 'Excelente opção')
  .replace(/Alternativa injetvel/g, 'Alternativa injetável')
  .replace(/Subtima/g, 'Subótima')
  .replace(/subtima/g, 'subótima')
  .replace(/subtimo/g, 'subótimo')
  .replace(/deciso/g, 'decisão')
  .replace(/arbitrrio/g, 'arbitrário')
  .replace(/arbitrria/g, 'arbitrária')
  .replace(/coraes/g, 'corações')
  .replace(/corao/g, 'coração')
  .replace(/anmicos/g, 'anêmicos')
  .replace(/anmico/g, 'anêmico')
  .replace(/anmica/g, 'anêmica')
  .replace(/anmicas/g, 'anêmicas')
  .replace(/aloimunizao/g, 'aloimunização')
  .replace(/mais de 48-72h/g, 'mais de 48-72h')
  .replace(/alognicos/g, 'alogênicos')
  .replace(/alognico/g, 'alogênico')
  .replace(/circulatria/g, 'circulatória')
  .replace(/transitria/g, 'transitória')
  .replace(/transitrio/g, 'transitório')
  .replace(/extracorpreo/g, 'extracorpóreo')
  .replace(/extracorprea/g, 'extracorpórea')
  .replace(/complexidade/g, 'complexidade')
  .replace(/mgica/g, 'mágica')
  .replace(/mgico/g, 'mágico')
  .replace(/confeccionar/g, 'confeccionar')
  .replace(/periodicamente/g, 'periodicamente')
  .replace(/quinzenais/g, 'quinzenais')
  .replace(/instrudos/g, 'instruídos')
  .replace(/instrudo/g, 'instruído')
  .replace(/instruda/g, 'instruída')
  .replace(/6 ed\./g, '6ª ed.')
  .replace(/10 ed\./g, '10ª ed.')
  .replace(/1/g, '1ª')
  .replace(/2/g, '2º')
  .replace(/3/g, '3º');

// Check for any remaining  characters or **
const hasBadChar = fixedContent.includes('');
const hasDoubleStar = fixedContent.includes('**');

console.log('Has bad replacement char:', hasBadChar);
console.log('Has double star (**):', hasDoubleStar);

if (hasDoubleStar) {
  console.error('FATAL: Double asterisks detected!');
  process.exit(1);
}

const targetPath = path.resolve('modules/consulta-vet/data/seed/diseases.ahim-canina.seed.ts');
fs.writeFileSync(targetPath, fixedContent, 'utf8');
console.log('Successfully wrote', targetPath, 'length:', fixedContent.length);
