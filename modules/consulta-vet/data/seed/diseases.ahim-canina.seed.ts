import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/*
 * Registro canônico de Anemia Hemolítica Imunomediada Canina (AHIM / IMHA).
 *
 * Fundamentação científica e clínica de referência:
 * - ACVIM Consensus Statement on the Diagnosis of Immune-Mediated Hemolytic Anemia in Dogs and Cats (Garden et al., 2019);
 * - ACVIM Consensus Statement on the Treatment of Immune-Mediated Hemolytic Anemia in Dogs (Swann et al., 2019);
 * - Diretrizes de Tromboprofilaxia CURATIVE (deLaforcade et al., Goggs et al., 2019 / 2022);
 * - Goggs, Davis & Brooks (2025, Front Vet Sci, DOI: 10.3389/fvets.2025.1571683): hipercoagulabilidade e hipofibrinólise por resistência fibrinolítica mediada por TAFI, PAI-1 e NETose;
 * - Agnoli et al. (2024, JVIM, DOI: 10.1111/jvim.17112): Ensaio clínico randomizado prospectivo (RCT) com 43 cães demonstrando ausência de benefício da adição precoce de segundo imunossupressor à corticoterapia inicial;
 * - Weng et al. (2023, JVIM): coorte multicêntrica de 242 cães avaliando regimes de imunossupressão;
 * - Sparrow et al. (2024, JVIM, DOI: 10.1111/jvim.17056): segurança da revacinação pós-remissão em 73 cães e dinâmica de recaída;
 * - Gianesini et al. (2023, JVIM, DOI: 10.1111/jvim.16801): lesão endotelial microvascular e pancreatite aguda suspeita secundária à hemoglobina livre intravascular (RR 2,54);
 * - Acervo de livros-texto: Nelson & Couto 6ª ed. (Cap. 73: Common Immune-Mediated Diseases, pp. 1234-1238; Cap. 2: Anemia, pp. 18-35); Plumb’s Veterinary Drug Handbook 10ª ed.; BSAVA Small Animal Formulary 10ª ed.
 *
 * Restrição inviolável: Estritamente ZERO asteriscos duplos em todo o documento.
 */
export const anemiaHemoliticaImunomediadaCaninaRecord: DiseaseRecord = {
  id: 'disease-anemia-hemolitica-imunomediada-canina',
  slug: 'anemia-hemolitica-imunomediada-canina',
  title: 'Anemia Hemolítica Imunomediada em Cães (AHIM / IMHA)',
  subtitle: 'Monografia clínica avançada: consenso diagnóstico ACVIM 2019, diretrizes terapêuticas ACVIM/CURATIVE, patologia tromboinflamatória, hipofibrinólise e medicina baseada em evidências',
  synonyms: [
    'AHIM',
    'IMHA',
    'Anemia hemolítica imunomediada canina',
    'Anemia hemolítica autoimune',
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
    'Hemólise',
    'Tromboprofilaxia',
    'Rivaroxabana',
    'Clopidogrel',
    'Prednisona',
    'Ciclosporina',
    'Micofenolato',
    'ACVIM',
    'CURATIVE',
    'TEG',
    'Hipofibrinólise',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['anemia-hemolitica-imunomediada-canina'],
  quickSummary:
    'A anemia hemolítica imunomediada (AHIM ou IMHA) é uma emergência hematológica e tromboinflamatória de alta letalidade em cães, decorrente da perda da autotolerância com opsonização e destruição prematura de eritrócitos mediada por anticorpos (IgG e/ou IgM) e frações ativas do complemento. O diagnóstico definitivo estabelece-se pela convergência da tríade do Consenso ACVIM 2019: anemia (preferencialmente documentada por micro-hematócrito centrifugado/PCV), evidência inequívoca de destruição imunomediada (presença de pelo menos 2 marcadores: esferocitose acentuada >=5/campo 100x, teste de aglutinação salina SAT 1:4 positivo, teste de antiglobulina direta/DAT Coombs positivo ou citometria de fluxo positiva; OU aglutinação persistente após lavagem salina tripla) e pelo menos um marcador de hemólise ativa (hiperbilirrubinemia, hemoglobinemia, hemoglobinúria ou células fantasmas). O tratamento organiza-se em três eixos indissociáveis: corticoterapia imunossupressora de primeira linha (prednisona 2 a 3 mg/kg/dia VO ou 50 a 60 mg/m²/dia para cães >25 kg, com desmame precoce orientado por metas), tromboprofilaxia imediata obrigatória (anticoagulantes orais como rivaroxabana ou heparinas associados ou não a clopidogrel, conforme diretrizes CURATIVE/ACVIM para mitigar a principal causa de mortalidade nas primeiras duas semanas) e suporte transfusional criterioso com concentrado de hemácias (pRBC) guiado por sinais clínicos de hipóxia tecidual e compatibilidade DEA 1.',
  quickDecisionStrip: [
    'A tríade diagnóstica do ACVIM 2019 exige: anemia confirmada + pelo menos 2 marcadores de destruição imune (esferócitos, SAT 1:4, DAT/Coombs) + pelo menos 1 sinal de hemólise ativa.',
    'A trombose venosa (especialmente TEP) é a causa de morte número um nas primeiras duas semanas; tromboprofilaxia com anticoagulantes (ex.: rivaroxabana) é obrigatória desde o diagnóstico.',
    'O ensaio clínico RCT de Agnoli et al. (2024) comprovou que associar segundo imunossupressor de rotina não melhora o desfecho inicial; reserve o 2º agente para refratariedade ou risco elevado.',
    'Nunca transfundir apenas com base em um corte numérico de hematócrito; a indicação hemoterápica deve ser guiada por sinais clínicos de hipóxia celular (taquicardia, letargia profunda, hiperlactatemia).',
    'Realize o teste de aglutinação salina (SAT) na proporção correta de 1 gota de sangue para 4 gotas de salina; a proporção 1:1 produz falso-positivos frequentes por rouleaux.',
  ],
  quickSummaryRich: {
    lead:
      'A abordagem clínica moderna da AHIM canina exige a substituição de paradigmas empíricos por critérios objetivos: confirmar a destruição imunomediada pela tríade consensual ACVIM 2019, instituir tromboprofilaxia imediata com anticoagulantes (antagonistas do fator Xa ou heparinas) e reservar o segundo agente imunossupressor para pacientes com falha terapêutica, caindo o hematócrito rapidamente ou com efeitos adversos intoleráveis aos corticoides.',
    leadHighlights: [
      'tríade consensual ACVIM 2019',
      'tromboprofilaxia imediata com anticoagulantes',
      'segundo agente imunossupressor',
      'desmame precoce orientado por metas',
    ],
    pillars: [
      {
        title: 'Tríade Diagnóstica Consensual (ACVIM 2019)',
        body:
          'O diagnóstico de certeza não depende de um exame isolado. Exige a convergência de três pilares: 1) Anemia confirmada; 2) Evidência de mecanismo imunomediado com pelo menos dois marcadores positivos (esferócitos >=5/campo 100x, SAT 1:4 positivo, Coombs direto/DAT positivo ou citometria) OU aglutinação persistente após lavagem tripla; 3) Evidência de hemólise ativa (hiperbilirrubinemia, hemoglobinemia, hemoglobinúria ou ghost cells).',
        highlights: ['Anemia confirmada', 'pelo menos dois marcadores', 'hemólise ativa', 'lavagem tripla'],
      },
      {
        title: 'Doença Tromboinflamatória e Hipofibrinólise',
        body:
          'A AHIM não é apenas lise de hemácias: é uma tempestade tromboinflamatória sistêmica. Goggs et al. (2025) comprovaram que além de hipercoagulabilidade, cães com AHIM desenvolvem hipofibrinólise marcante mediada por TAFI ativado, aumento expressivo de PAI-1 e NETose. O tromboembolismo pulmonar (TEP) é a principal causa de óbito precoce. A tromboprofilaxia é mandatória em praticamente 100% dos pacientes.',
        highlights: ['tempestade tromboinflamatória', 'hipofibrinólise', 'TAFI', 'PAI-1', 'TEP', 'mandatória'],
      },
      {
        title: 'Imunossupressão Racional e Individualizada',
        body:
          'Glicocorticoides (prednisona 2 a 3 mg/kg/dia VO ou 50 a 60 mg/m²/dia em cães >25 kg) são a base de primeira linha. Conforme o ensaio clínico prospectivo de Agnoli et al. (2024), não há justificativa para adição rotineira indiscriminada de segundo agente (ciclosporina ou micofenolato) em casos estáveis. Iniciar desmame gradual (20-25% a cada 2-4 semanas) após estabilização por 7 a 14 dias.',
        highlights: ['Glicocorticoides', 'primeira linha', 'Agnoli et al. (2024)', 'desmame gradual'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico Sequencial na Suspeita de AHIM',
      steps: [
        {
          label: 'Passo 1: Confirmação da Anemia e Coletas Prévias',
          timing: 'Imediato na admissão',
          detail:
            'Aferir hematócrito por microcentrifugação (PCV) para contornar interferência de hemólise/lipemia no contador automatizado. Colher tubos com EDTA pré-transfusão para esfregaço, SAT, tipagem DEA 1 e prova de compatibilidade cruzada maior.',
        },
        {
          label: 'Passo 2: Análise de Esfregaço e Teste de Aglutinação Salina (SAT)',
          timing: 'Primeiros 30 minutos',
          detail:
            'Examinar esfregaço em imersão (100x): quantificar esferócitos (>=5/campo confere 95% de especificidade) e policromasia. Realizar SAT rigorosamente na proporção 1:4 (1 gota de sangue para 4 gotas de salina 0,9%). Se positivo, proceder à lavagem salina tripla para confirmar autoaglutinação verdadeira.',
          limitations: 'SAT 1:1 gera resultados falso-positivos frequentes por persistência de rouleaux.',
        },
        {
          label: 'Passo 3: Documentação de Hemólise e Teste de Coombs (DAT)',
          timing: 'Rotina laboratorial inicial',
          detail:
            'Avaliar plasma no tubo de micro-hematócrito (hemoglobinemia rósea/avermelhada vs icterícia amarela). Analisar urina (centrifugar para diferenciar hematúria de hemoglobinúria). Se houver apenas 1 marcador imune no esfregaço, realizar teste de antiglobulina direta (Coombs/DAT).',
        },
        {
          label: 'Passo 4: Triagem de Gatilhos e Causas Associadas (aIMHA)',
          timing: 'Primeiras 24 a 48 horas',
          detail:
            'Investigar doenças vetoriais (PCR e sorologia para Babesia gibsoni/canis, pesquisa de microfilárias de Dirofilaria), radiografias torácicas e ultrassonografia abdominal para afastar neoplasias ocultas e corpos estranhos de zinco.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo Terapêutico Integrado e Manejo Hospitalar',
      steps: [
        {
          label: 'Fase 1: Estabilização e Suporte Transfusional',
          timing: 'Imediato no plantão',
          detail:
            'Fornecer oxigenoterapia suave se dispneico. Se houver sinais clínicos de hipóxia descompensada (letargia extrema, taquicardia desproporcional, taquipneia, lactato >3-4 mmol/L), transfundir concentrado de hemácias (pRBC) DEA 1 compatível recente (idealmente <=7 a 10 dias de coleta).',
          dose: 'pRBC 10 a 15 mL/kg IV infundido em 2 a 4 horas.',
        },
        {
          label: 'Fase 2: Tromboprofilaxia Obrigatória Imediata',
          timing: 'Admissão imediata',
          detail:
            'Iniciar anticoagulante oral inibidor do fator Xa ou heparina de baixo peso molecular conforme CURATIVE/ACVIM. Não aguardar melhora do hematócrito. Contraindicado apenas se plaquetas <30.000/uL ou sangramento ativo.',
          dose: 'Rivaroxabana 1 a 2 mg/kg VO q24h; ou Enoxaparina 0,8 a 1,2 mg/kg SC q8h; ou Dalteparina 150 a 175 UI/kg SC q8h.',
        },
        {
          label: 'Fase 3: Imunossupressão de Primeira Linha',
          timing: 'Início imediato pré-transfusão ou pós-coleta',
          detail:
            'Glicocorticoides em doses imunossupressoras. Para cães >25 kg, calcular estritamente por superfície corporal (50 a 60 mg/m²/dia) para evitar síndrome de Cushing iatrogênica grave e fraqueza muscular.',
          dose: 'Prednisona ou Prednisolona 2 a 3 mg/kg/dia VO (dividida em 2 doses ou SID). Se vômitos: Dexametasona 0,15 a 0,3 mg/kg IV q24h.',
        },
        {
          label: 'Fase 4: Avaliação Criteriosa do Segundo Agente Imunossupressor',
          timing: 'Dia 3 a 7 de internação',
          detail:
            'Associar segundo imunossupressor apenas diante de indicações consensuais: queda de PCV >=5 pontos em 24h apesar de corticoides, dependência transfusional persistente após 7 dias, hemólise intravascular fulminante ou cães de porte gigante.',
          dose: 'Ciclosporina 5 mg/kg VO q12h; ou Micofenolato de Mofetil 8 a 12 mg/kg VO q12h; ou Azatioprina 2 mg/kg VO q24h por 14 dias (somente em cães).',
        },
        {
          label: 'Fase 5: Desmame Gradual e Monitoramento Ambulatorial',
          timing: 'Semanas a meses',
          detail:
            'Após estabilização clínica e PCV mantido por >=7 a 14 dias com contagem reticulocitária adequada, reduzir a dose de prednisona em 20% a 25% a cada 2 a 4 semanas. Nunca suspender abruptamente. Monitorar PCV, reticulócitos e bioquímica.',
        },
      ],
    },
  },
  etiology: {
    definicaoEClassificacaoAcvim2019:
      'A anemia hemolítica imunomediada (AHIM / IMHA) decorre da perda de autotolerância com reconhecimento anormal de antígenos da membrana eritrocitária por anticorpos endógenos (predominantemente IgG e IgM), desencadeando destruição celular acelerada mediada por fagocitose mononuclear ou citólise por complemento. O Consenso ACVIM 2019 estabeleceu a substituição formal dos termos bivalentes "primária" e "secundária" por "não associativa (naIMHA)" e "associativa (aIMHA)". O termo "não associativa" reflete a realidade clínica de que, após investigação minuciosa com triagem diagnóstica abrangente, nenhuma condição desencadeante ou subjacente foi detectada. Por outro lado, a forma "associativa" ocorre quando a reação imune é disparada ou mantida por antígenos exógenos, mimetismo molecular, dano tecidual ou reações de hapteno vinculadas a infecções ativas, neoplasias, fármacos ou reações inflamatórias sistêmicas.',
    gatilhosInfecciososEBabesiose:
      'Entre os gatilhos infecciosos caninos, o Consenso ACVIM 2019 identificou nível de evidência moderado a alto apenas para infecções por piroplasmas do gênero Babesia, com destaque para Babesia gibsoni e Babesia canis/vogeli. B. gibsoni possui transmissão marcante por mordeduras e brigas entre cães (notadamente em raças do tipo Pit Bull), além de via transplacentária e vetorial. A infecção induz alterações estruturais na membrana das hemácias com exposição de neoantígenos e produção de anticorpos anti-eritrócito, gerando quadro idêntico à AHIM. O consenso recomenda a triagem sistemática para Babesia por meio de PCR combinado com sorologia em todos os cães com AHIM. Outros agentes infecciosos como Mycoplasma haemocanis (comum em cães previamente esplenectomizados), Dirofilaria immitis, Ehrlichia canis, Anaplasma phagocytophilum e Leishmania infantum podem estar associados a anemias imunomediadas ou testes de Coombs falso-positivos por complexos imunes circulantes, exigindo diagnóstico etiológico rápido para evitar imunossupressão isolada desastrosa.',
    desmistificacaoGatilhosFarmacologicosEVacinais:
      'Historicamente, fármacos e vacinas foram responsabilizados por uma fração substancial dos casos de AHIM. Todavia, a análise rigorosa do Consenso ACVIM 2019 demonstrou que a grande maioria das publicações anteriores apresentava nível de evidência negligenciável a baixo. Para fármacos, a evidência mais sólida documentada ocorreu com altas doses de cefalosporinas injetáveis (como cefazedona), além de relatos pontuais com penicilinas, sulfonamidas e cefalotina. No tocante à vacinação, uma investigação detalhada refutou a hipótese de que vacinas rotineiras sejam gatilhos frequentes de AHIM. O estudo de coorte prospectivo de Sparrow et al. (2024, JVIM) acompanhou 73 cães recuperados de AHIM que foram revacinados após a remissão completa: nenhum paciente apresentou recidiva temporalmente associada à vacinação, registrando-se taxas globais de recaída de 11% aos 12 meses e 18% aos 24 meses (idênticas entre vacinados e não vacinados). A recomendação consensual atual é individualizar o risco-benefício vacinal, não privando pacientes hígidos do controle de doenças infecciosas letais (parvovirose, raiva, leptospirose) após estabilização consistente.',
  },
  epidemiology: {
    distribuicaoPorRacaESexo:
      'A AHIM afeta cães de qualquer raça e faixa etária, porém várias raças apresentam suscetibilidade desproporcional decorrente de predisposição genética vinculada a determinados alelos do complexo principal de histocompatibilidade canino (DLA - Dog Leukocyte Antigen). As raças mais frequentemente sobrerrepresentadas em estudos epidemiológicos globais incluem Cocker Spaniel Americano e Inglês (risco relativo de 3 a 5 vezes superior à população geral), Springer Spaniel Inglês, Poodle Miniatura e Médio, Bichon Frisé, Pastor Alemão, Golden Retriever, Maltês e Old English Sheepdog. Fêmeas exibem discreta a moderada predisposição em diversas coortes internacionais, com razões fêmea:macho variando entre 1,5:1 e 2:1, sem efeito protetor evidente da castração.',
    faixaEtariaEPicoDeIncidencia:
      'A doença atinge majoritariamente animais jovens-adultos a meia-idade, com pico de incidência concentrado entre 3 e 7 anos de idade (faixa descrita de 1 a 13 anos). Apresentações em filhotes com menos de 1 ano são atípicas e impõem a investigação imediata de isoeritrólise neonatal, causas parasitárias/infecciosas agudas ou anomalias genéticas congênitas do metabolismo eritrocitário (como deficiência de piruvato quinase ou fosfofrutoquinase). Apresentações em cães geriátricos (>9-10 anos) obrigam a um rastreamento oncológico rigoroso (linfoma, leucemia, hemangiossarcoma).',
    fatoresPrognosticosEMortalidade:
      'A AHIM canina permanece como uma das afecções hematológicas de maior letalidade em pequenos animais. A taxa de mortalidade situa-se historicamente entre 30% e 50%, concentrando-se predominantemente nas primeiras duas semanas de hospitalização. O Consenso ACVIM e estudos prospectivos identificaram marcadores robustos de pior prognóstico na admissão: hiperbilirrubinemia severa (>5 a 10 mg/dL), presença de hemólise intravascular com hemoglobinemia e hemoglobinúria, autoaglutinação persistente após lavagem, azotemia pré-renal ou renal associada, hipoalbuminemia e ausência de resposta regenerativa após 5 a 7 dias. A causa terminal direta de óbito mais prevalente é o tromboembolismo pulmonar (TEP) fulminante, seguido por coagulação intravascular disseminada (CID) e síndrome da disfunção de múltiplos órgãos (MODS).',
  },
  pathogenesisTransmission: {
    mecanismosImunesOpsonizacao:
      'A quebra da autotolerância imunológica resulta na produção de autoanticorpos (primordialmente IgG e/ou IgM) direcionados contra proteínas e glicoproteínas integrais da membrana do eritrócito, como a espectrina, a banda 3 e as glicoforinas. Na hemólise mediada por IgG, a porção Fab do anticorpo ancora-se no epítopo de superfície, deixando a porção cristalizável (Fc) exposta. Quando esses eritrócitos opsonizados transitam pela polpa vermelha do baço e sinusoides hepáticos, são reconhecidos pelos receptores Fc-gama (Fc-gamma-R) expressos na superfície dos macrófagos teciduais do sistema fagocítico mononuclear. Os macrófagos fagocitam fragmentos da membrana celular. Pela perda de superfície lipídica sem diminuição proporcional de citoplasma e hemoglobina, a hemácia adquire o formato esférico de esferócito. Esses esferócitos rígidos perdem sua deformabilidade característica e acabam lisados em passagens subsequentes pelo microambiente esplênico.',
    ativacaoDoComplemento:
      'Quando o anticorpo envolvido é do isotipo IgM, sua conformação pentamérica plana permite a ligação direta e eficiente da subunidade C1q, disparando a cascata clássica do complemento com clivagem de C4, C2 e formação da C3 convertase. A deposição maciça de C3b e iC3b na superfície celular acelera a fagocitose mediada por receptores de complemento (CR1 e CR3) nos macrófagos hepáticos (células de Kupffer). Em casos de alta densidade de IgM ou cooperatividade de subclasses de IgG fixadoras de complemento, a cascata progride até a clivagem de C5 e polimerização de C5b-6-7-8-9, gerando o Complexo de Ataque à Membrana (MAC). O MAC forma poros transmembranares hidrofílicos permanentes, levando a influxo maciço de água e íons, choque osmótico e lise celular direta dentro da luz do vaso (hemólise intravascular).',
    fenomenoTromboinflamatorioEHipofibrinolise: {
      kind: 'editorialText',
      text:
        'A AHIM é contemporaneamente compreendida como uma grave desordem tromboinflamatória sistêmica. O estado pró-trombótico extremo não decorre apenas de ativação plaquetária isolada, mas de três forças sinérgicas interdependentes: 1) Expressão aberrante de Fator Tecidual (TF) em monócitos e macrófagos ativados por citocinas inflamatórias (IL-1, TNF-alfa); 2) Geração maciça de micropartículas eritrocitárias derivadas das hemácias fragmentadas, ricas em fosfatidilserina externa que serve de plataforma catalítica para os complexos tenase e protrombinase; 3) Sequestro rápido de óxido nítrico (NO) livre pela hemoglobina tetramérica circulante, desencadeando vasoconstrição microvascular patológica, isquemia endotelial e expressão de moléculas de adesão plaquetária. Além da geração exacerbada de trombina, o estudo fundamental de Goggs, Davis & Brooks (2025, Front Vet Sci) demonstrou que cães com AHIM sofrem de grave resistência à fibrinólise (hipofibrinólise), caracterizada por elevações acentuadas de inibidor do ativador de plasminogênio ativo (PAI-1), hiperatividade do inibidor de fibrinólise ativável por trombina (TAFI) e extrusão de redes extracelulares de neutrófilos (NETose, confirmada por altos níveis de cfDNA e nucleossomos). Essa resistência fibrinolítica impede a lise fisiológica dos coágulos formados, consolidando trombos volumosos e letais na circulação pulmonar e venosa portal.',
    },
    figuraTegHipercoagulabilidade: {
      kind: 'imageModal' as const,
      url: '/consulta-vet/ahim-canina/teg-hipercoagulabilidade-goggs-2025.jpg',
      caption:
        'Traçados de tromboelastografia (TEG) ativados por fator tecidual em cão com AHIM demonstrando hipercoagulabilidade marcante e fenômeno de hipofibrinólise (resistência fibrinolítica) induzida por tPA (Goggs, Davis & Brooks, 2025, Front Vet Sci, CC BY 4.0).',
    },
    figuraBiomarcadoresPai1Tafi: {
      kind: 'imageModal' as const,
      url: '/consulta-vet/ahim-canina/biomarcadores-pai1-tafi-goggs-2025.jpg',
      caption:
        'Concentrações plasmáticas de inibidor do ativador de plasminogênio tipo 1 (PAI-1 ativo) e atividade de inibidor de fibrinólise ativável por trombina (TAFI) significativamente aumentadas em cães com AHIM comparados a controles hígidos (Goggs, Davis & Brooks, 2025, Front Vet Sci, CC BY 4.0).',
    },
  },
  pathophysiology: {
    hemoliseIntravascularVsExtravascular:
      'A destruição das hemácias manifesta-se sob dois padrões fisiopatológicos principais com repercussões clínicas, laboratoriais e terapêuticas distintas: hemólise extravascular (predominante em cerca de 80% a 90% dos casos) e hemólise intravascular (presente em 10% a 20% das apresentações mais graves). Na hemólise extravascular, a destruição ocorre estritamente dentro dos cordões esplênicos e sinusoides hepáticos. O ferro e o grupo heme são degradados pela heme oxigenase em biliverdina e, subsequentemente, em bilirrubina não conjugada (indireta). Essa bilirrubina liga-se à albumina e é carreada ao fígado para conjugação. Quando a taxa de destruição excede a capacidade hepática de captação e excreção biliar, surge hiperbilirrubinemia plasmática (icterícia) e bilirrubinúria acentuada. O plasma preserva sua coloração límpida amarelada (ictérica) e não há liberação de hemoglobina livre no sangue. Em contraste agudo, na hemólise intravascular a destruição celular ocorre diretamente na corrente sanguínea por ativação lítica do complemento ou estresse de cisalhamento. A hemoglobina tetramérica é despejada no plasma, saturando imediatamente as proteínas carreadoras de reserva (haptoglobina). Uma vez saturada a haptoglobina, a hemoglobina livre (dimérica) circula livremente, conferindo ao plasma coloração rósea a vermelho-escura (hemoglobinemia). Essa hemoglobina livre ultrapassa a barreira de filtração glomerular renal e atinge a urina (hemoglobinúria). A hemoglobina livre no túbulo proximal gera dano oxidativo oxidando-se a metemoglobina, liberando ferro livre tóxico e causando necrose tubular aguda (injúria renal aguda isquêmica e nefrotóxica). Além disso, a hemoglobina livre sequestra vorazmente o óxido nítrico (NO) tecidual, levando a espasmo vascular sistêmico, disfunção endotelial e colapso circulatório.',
    tabelaComparativaHemolise: {
      kind: 'clinicalTable' as const,
      caption: 'Tabela comparativa dos mecanismos de hemólise na AHIM canina',
      headers: [
        'Parâmetro Fisiopatológico',
        'Hemólise Extravascular (Típica)',
        'Hemólise Intravascular (Fulminante)',
      ],
      rows: [
        ['Local predominante de destruição', 'Polpa vermelha esplênica e fígado (Kupffer)', 'Luz intravascular sistêmica e capilares'],
        ['Imunoglobulina predominante', 'IgG (reação típica morna)', 'IgM (ativação potente) ou IgG em alta densidade'],
        ['Envolvimento do Complemento', 'Fixação até C3b/iC3b (opsonização)', 'Ativação completa até complexo de ataque (MAC C5b-9)'],
        ['Achados típicos no esfregaço', 'Esferocitose acentuada (>=5/campo)', 'Ghost cells (células fantasmas), esferócitos'],
        ['Aspecto do plasma (centrifugado)', 'Ictérico (amarelo ouro a alaranjado)', 'Hemoglobinêmico (róseo a vermelho escuro brilhante)'],
        ['Aspecto da urina (centrifugada)', 'Bilirrubinúria (amarelo escuro a castanho)', 'Hemoglobinúria (vermelho escuro que não sedimenta)'],
        ['Lesão renal aguda (LRA)', 'Risco moderado por hipóxia isquêmica', 'Risco extremo por toxicidade direta e espasmo por NO'],
        ['Prognóstico e mortalidade', 'Grave, porém controlável com imunossupressão', 'Crítico / fulminante, mortalidade muito elevada'],
      ],
    },
    respostaRegenerativaEFormasNaoRegenerativas:
      'A anemia hemolítica é classicamente descrita como uma anemia regenerativa típica, caracterizada por macrocitose, hipocromia, policromasia acentuada e elevação vigorosa da contagem absoluta de reticulócitos (>100.000 a 110.000/uL em cães). Contudo, um desafio diagnóstico capital reside no fato de que aproximadamente 30% dos cães com AHIM chegam à consulta inicial com anemia aparentemente não regenerativa. Esse fenômeno decorre de dois motivos clínicos distintos: 1) Janela de latência medular pré-regenerativa: a medula óssea sadia necessita de 3 a 5 dias para acelerar a eritropoiese, maturar os precursores e liberar reticulócitos jovens na circulação. Apresentações hiperagudas com menos de 72 horas de hemólise exibem contagem reticulocitária inicial baixa; a repetição do exame após 3 a 4 dias revelará regeneração exuberante; 2) Doenças imunomediadas direcionadas a precursores eritroides medulares: incluem a anemia imunomediada direcionada a precursores (PIMA - Precursor-targeted immune-mediated anemia) e a aplasia pura de série vermelha (PRCA - Pure red cell aplasia). Nessas condições, os autoanticorpos não atacam apenas os eritrócitos maduros circulantes, mas reconhecem e destroem estágios precoces na medula óssea (rubriblastos, pré-rubrícitos, rubrícitos ou reticulócitos medulares). A mielografia por biópsia ou aspirado de medula óssea revelará hiperplasia eritroide com parada de maturação (PIMA) ou ausência seletiva quase total de linhagem eritroide com linhagens mieloide e megacariocítica preservadas (PRCA).',
  },
  clinicalSignsPathophysiology: {
    sinaisClinicosSistemicosEExameFisico:
      'Os sinais clínicos decorrem da combinação da hipóxia tecidual celular com a resposta inflamatória sistêmica induzida por citocinas e fragmentos eritrocitários. A história clínica típica relata início agudo a subagudo (1 a 7 dias) de letargia profunda, prostração, fraqueza muscular, relutância ao exercício, hiporexia ou anorexia completa, vômitos e, em casos avançados, episódios de síncope ou colapso ortostático. Ao exame físico cuidadoso, os achados predominantes são: palidez extrema de mucosas orais, conjuntivais e genitais (mucosas em "porcelana"); taquicardia sinusal compensatória de repouso com pulsos femorais hiperdinâmicos ("em martelo d’água" ou saltatórios, reflexo da redução drástica da viscosidade sanguínea e da vasodilatação periférica); taquipneia compensatória; sopro cardíaco sistólico funcional grau II a III/VI audível em foco mitral/base decorrente do fluxo turbulento de sangue de baixa viscosidade; febre de origem imunoinflamatória (temperatura retal entre 39,2 °C e 40,5 °C) presente em até 30% a 50% dos cães sem qualquer foco infeccioso aparente; hepatoesplenomegalia palpável por congestão e hiperplasia reativa do sistema mononuclear fagocitário; e linfonodomegalia reativa generalizada discreta a moderada.',
    ictericiaEAlteracoesUrinarias:
      'A icterícia cutaneomucosa é observada em cerca de 40% a 60% dos pacientes no momento da admissão, manifestando-se por pigmentação amarelada típica na esclera ocular, palato mole, superfície interna dos pavilhões auriculares e pele ventral glabra. A coloração da urina é uma variável semioquímica diagnóstica de primeiro escalão: tutores frequentemente relatam urina escura, avermelhada ou com tonalidade de chá forte, café ou refrigerante de cola. A avaliação clínica imediata por centrifugação de amostra urinária fresca distingue: 1) Urina com sobrenadante transparente e sedimento de hemácias intactas = hematúria (não hemólise pura); 2) Urina com sobrenadante vermelho-escuro persistente e teste com fita positivo para sangue = hemoglobinúria (hemólise intravascular com saturação da haptoglobina); 3) Urina com tonalidade castanha a amarelo-ouro escuro, fita fortemente positiva para bilirrubina e sobrenadante não hemoglobínico = bilirrubinúria maciça associada a hemólise extravascular.',
    sinaisDeTromboembolismoPulmonar:
      'O tromboembolismo pulmonar (TEP) é a complicação catastrófica mais temida. Clinicamente, o paciente apresenta piora súbita e inexplicada do padrão respiratório, caracterizada por taquipneia paroxística, ortopneia, angústia respiratória, dor torácica e palidez acinzentada ou cianose. Um dado semiológico fundamental é o achado de dispneia intensa associada a auscultação de campos pulmonares surpreendentemente silenciosos ou limpos (dissociação entre desconforto ventilatório severo e ausência de estertores/crepitações nos estágios iniciais, pois a obstrução é vascular e não alveolar). A gasometria arterial demonstra hipoxemia aguda grave com elevação marcante do gradiente alvéolo-arterial de oxigênio P(A-a)O2 e ausência de resposta clínica satisfatória à oxigenoterapia suplementar (distúrbio grave de ventilação/perfusão V/Q). O surgimento desses sinais impõe a intensificação imediata do suporte anticoagulante.',
  },
  diagnosis: {
    triadeDiagnosticaAcvim:
      'O Consenso ACVIM 2019 estabeleceu diretrizes diagnósticas rigorosas baseadas em evidências para uniformizar o reconhecimento da AHIM em cães. O diagnóstico de certeza requer a convergência de três condições inegociáveis: 1) Confirmação de Anemia: hematócrito/PCV abaixo do limite inferior de referência (idealmente por microcentrifugação); 2) Demonstração de Destruição Imunomediada: presença de pelo menos 2 marcadores de reação imune positiva (esferocitose evidente, SAT 1:4 positivo, Coombs/DAT positivo ou citometria de fluxo positiva); OU como critério autônomo suficiente, um teste de aglutinação salina que persista positivo após três ciclos consecutivos de lavagem salina; 3) Demonstração de Hemólise Ativa: presença de pelo menos 1 marcador de degradação eritrocitária (hiperbilirrubinemia sem colestase primária, hemoglobinemia, hemoglobinúria ou presença de ghost cells). O diagnóstico é classificado como "confirmatório" quando os três pilares são atendidos, ou "provável" quando há anemia, um marcador imune e um marcador de hemólise em contexto clínico compatível.',
    tabelaTriadeDiagnosticaAcvim: {
      kind: 'clinicalTable' as const,
      caption: 'Tríade diagnóstica do Consenso ACVIM 2019 para AHIM Canina',
      headers: [
        'Componente Diagnóstico',
        'Critério Requerido pelo Consenso',
        'Exames e Marcadores Validados',
      ],
      rows: [
        [
          '1. Confirmação de Anemia',
          'Obrigatório em 100% dos casos',
          'Hematócrito por microcentrifugação (PCV) <37% ou hemograma automatizado revisado',
        ],
        [
          '2. Destruição Imunomediada',
          'Pelo menos 2 marcadores positivos OU SAT positivo pós-lavagem 3x',
          'a) Esferócitos >=5/campo 100x; b) SAT 1:4 positivo; c) Coombs/DAT positivo; d) Citometria de fluxo anti-IgG/IgM/C3',
        ],
        [
          '3. Hemólise Ativa',
          'Pelo menos 1 marcador positivo',
          'a) Hiperbilirrubinemia; b) Hemoglobinemia plasmática; c) Hemoglobinúria; d) Ghost cells no esfregaço',
        ],
        [
          'Classificação Diagnóstica Final',
          'Grau de certeza clínica',
          'Definitivo: 1 + 2 + 3 preenchidos integralmente; Provável: 1 + (1 marcador imune) + 3',
        ],
      ],
    },
    esferocitosDesempenhoDiagnostico:
      'Os esferócitos são glóbulos vermelhos que sofreram remoção parcial de membrana por macrófagos esplênicos. No microscópio óptico, surgem como células menores, densamente coradas, perfeitamente esféricas e desprovidas de halo central de palidez. Como o cão é a única espécie doméstica que possui eritrócitos normais com halo central evidente, a identificação de esferócitos no esfregaço de sangue canino possui excepcional valor diagnóstico. Todavia, a especificidade depende criticamente do ponto de corte semiquantitativo utilizado. Estudos clínicos referendados pelo ACVIM demonstram que a presença de >=5 esferócitos por campo de grande aumento sob imersão (100x) confere sensibilidade de 63% e especificidade elevada de 95% para AHIM. Pontos de corte mais baixos (>=3 esferócitos/campo) elevam a sensibilidade para 74%, porém reduzem a especificidade para 81%, uma vez que raros esferócitos podem ocorrer secundariamente em envenenamentos por serpentes, hipofosfatemia severa, toxicidade por zinco, anemia microangiopática e hemangiossarcoma.',
    figuraEsferocitoseEsfregaco: {
      kind: 'imageModal' as const,
      url: '/consulta-vet/ahim-canina/esferocitose-esfregaco-sanguineo.jpg',
      caption:
        'Esfregaço sanguíneo microscópico em cão demonstrando esferocitose acentuada (hemácias esféricas densas e sem palidez central) acompanhada de policromasia e anisocitose típicas de AHIM (Wikimedia Commons, CC BY-SA 4.0).',
    },
    testeAglutinacaoSalinaSatProtocolo:
      'O teste de aglutinação salina (SAT) avalia a presença de anticorpos de superfície em quantidade suficiente para vencer o potencial zeta eletrostático que normalmente repele as hemácias entre si, causando pontes intercelulares e aglomeração macroscópica ou microscópica. Um dos erros técnicos mais frequentes na rotina veterinária é misturar 1 gota de sangue com 1 gota de salina (1:1). Essa diluição insuficiente é incapaz de dispersar o fenômeno físico de rouleaux (empilhamento de hemácias em moedas, estimulado por fibrinogênio e globulinas aumentadas na inflamação), gerando taxas alarmantes de falso-positivos. O protocolo padronizado pelo Consenso ACVIM preconiza misturar rigorosamente 1 gota de sangue anticoagulado em EDTA com 4 gotas de solução fisiológica 0,9% (proporção 1:4) sobre uma lâmina limpa, cobrindo com lamínula e examinando em microscópio (10x e 40x). Para pacientes com aglutinação evidente, a lavagem eritrocitária tripla (centrifugação da suspensão com salina a 1.000 rpm por 2 minutos, descarte do sobrenadante e repetição por 3 vezes) remove completamente paraproteínas circulantes; se a aglutinação persistir após essa lavagem tripla, o ACVIM reconhece esse achado como evidência autônoma suficiente de destruição imunomediada.',
    figuraTesteAglutinacaoSalina: {
      kind: 'imageModal' as const,
      url: '/consulta-vet/ahim-canina/teste-aglutinacao-salina-sat.jpg',
      caption:
        'Visualização microscópica demonstrando autoaglutinação eritrocitária verdadeira em aglomerados tridimensionais irregulares (grumos), distinguindo-se da organização linear em pilhas de moedas (rouleaux) (Wikimedia Commons, CC BY-SA 4.0).',
    },
    testeCoombsDatECitometria:
      'O teste de antiglobulina direta (DAT), historicamente denominado Teste de Coombs direto, tem por finalidade detectar a presença de anticorpos (IgG e/ou IgM) ou fragmentos de complemento (C3b) ancorados à superfície do eritrócito, mesmo quando esses não estão em concentração suficiente para provocar autoaglutinação espontânea no teste salino. A adição de um reagente anti-espécie poliespecífico ou monoespecífico canino promove ligação cruzada entre as imunoglobulinas fixadas, induzindo aglutinação visível. Na literatura canina, o DAT apresenta sensibilidade entre 61% e 82% e especificidade elevada entre 94% e 100%. Um teste de Coombs negativo JAMAIS descarta AHIM (até 20% a 30% de falso-negativos por corticoterapia prévia, baixa afinidade do anticorpo, eluição térmica ou técnica laboratorial deficiente). Por sua vez, a citometria de fluxo emergiu como um método altamente sensível e quantitativo, capaz de mensurar individualmente a porcentagem de hemácias recobertas por IgG, IgM e C3, identificando casos limítrofes com Coombs falso-negativo.',
    figuraTesteCoombsDireto: {
      kind: 'imageModal' as const,
      url: '/consulta-vet/ahim-canina/teste-coombs-direto-dat.png',
      caption:
        'Esquema representativo do mecanismo do Teste de Coombs direto (antiglobulina direta / DAT): anticorpos anti-globulina ligam-se às imunoglobulinas pré-fixadas nas hemácias do paciente, induzindo aglutinação diagnóstica (Wikimedia Commons, CC BY-SA 3.0).',
    },
    triagemEtiologicaEGatilhos:
      'Uma vez confirmada a AHIM, o próximo passo imperativo é distinguir se a condição é não associativa (naIMHA) ou associativa (aIMHA). A conduta consensual ACVIM 2019 recomenda um painel mínimo de exclusão que abrange: 1) Hemograma completo e revisão minuciosa do esfregaço em busca de corpúsculos de inclusão ou parasitas intraeritrocitários (trofozoítos de Babesia, corpúsculos de Heinz que indicam hemólise oxidativa e não imune); 2) PCR e sorologia pareada para Babesia spp. (especialmente B. gibsoni e B. canis/vogeli); 3) Triagem para Dirofilaria immitis por teste antigênico e pesquisa de microfilárias por técnica de Knott modificada; 4) Perfil bioquímico sérico completo (incluindo ureia, creatinina, ALT, fosfatase alcalina, bilirrubina total e frações, albumina e globulinas); 5) Urinálise completa coletada por cistocentese ou micção espontânea com urocultura quantitativa; 6) Radiografias torácicas em 3 projeções (para rastreio de metástases, massas mediastinais ou sinais de TEP) e radiografia abdominal (fundamental para afastar ingesta de corpos estranhos metálicos com zinco, como moedas, que causam hemólise oxidativa grave simulando AHIM); 7) Ultrassonografia abdominal completa para avaliação de arquitetura esplênica, hepática, linfonodos cavitários e focos infecciosos ocultos.',
  },
  treatment: {
    estabilizacaoInicialECuidadosHandsOff:
      'O atendimento inicial de um cão com suspeita de AHIM deve priorizar a estabilização ventilatória e hemodinâmica sem desencadear estresse excessivo. A hipóxia tecidual crítica reduz a tolerância a contenções físicas forçadas. Instituir oxigenoterapia suave por máscara confortável ou fluxo contínuo (flow-by). Todas as amostras de sangue necessárias para o diagnóstico (tubos EDTA para micro-hematócrito, esfregaço, SAT, Coombs, tipagem DEA 1 e prova de compatibilidade cruzada) devem ser colhidas por venopunção única precisa em veia periférica (veia cefálica ou safena lateral). Deve-se PROIBIR expressamente punções traumáticas na veia jugular em pacientes com AHIM grave, pois a presença concomitante de trombocitopenia de consumo, anemia extrema e posterior administração de anticoagulantes pode ocasionar hematomas cervicais maciços compressivos sobre a traqueia.',
    protocoloGlicocorticoidesPrimeiraLinha:
      'Os glicocorticoides constituem a base farmacológica de primeira linha inegociável no tratamento da AHIM canina. O mecanismo de ação engloba a rápida inibição da expressão e afinidade dos receptores Fc-gama nos macrófagos esplênicos (reduzindo a fagocitose de hemácias em 24 a 48 horas), supressão da síntese de citocinas inflamatórias e, mais tardiamente, inibição da produção de autoanticorpos pelos linfócitos B. A prednisona ou prednisolona deve ser prescrita na dose de 2 a 3 mg/kg/dia por via oral (administrada em dose única matinal ou dividida a cada 12 horas). Para cães de médio e grande porte (>25 kg de peso corporal), o cálculo posológico por peso linear acarreta superdosagem severa e síndrome de Cushing iatrogênica fulminante; nesses animais, deve-se utilizar estritamente a superfície corporal: 50 a 60 mg/m²/dia (máximo absoluto de 60 a 80 mg por animal/dia). Se a via oral estiver inviabilizada por vômitos ou choque, a dexametasona deve ser administrada na dose de 0,15 a 0,3 mg/kg IV a cada 24 horas. Uma mudança paradigmática estabelecida pelo Consenso ACVIM 2019 é a contraindicação de manter essas doses imunossupressoras elevadas por várias semanas a meses. Uma vez alcançada a estabilidade clínica e laboratorial (hematócrito estável com PCV >=30% por 7 a 14 dias sem hemólise ativa), inicia-se o desmame gradual, reduzindo a dose em 20% a 25% a cada 2 a 4 semanas, monitorando o hematócrito antes de cada decréscimo.',
    segundoImunossupressorAnaliseCritica:
      'Uma das maiores controvérsias históricas dizia respeito à associação empírica imediata de um segundo imunossupressor no momento do diagnóstico. O ensaio clínico prospectivo randomizado (RCT) conduzido por Agnoli et al. (2024, JVIM) avaliou 43 cães com AHIM alocados para receber prednisolona isolada versus prednisolona associada a ciclosporina ou micofenolato de mofetil desde a admissão. Os autores demonstraram que a adição precoce do segundo imunossupressor não aumentou a taxa de remissão hematológica aguda, não reduziu o número de transfusões sanguíneas e não diminuiu a mortalidade hospitalar nem a frequência de recaídas em comparação com a monoterapia com esteroides, trazendo apenas custos financeiros acrescidos e risco potencial de toxicidade medicamentosa. Dessa forma, as diretrizes modernas do ACVIM preconizam que a associação de um segundo agente não deve ser universal, ficando reservada a indicações clínicas específicas: 1) Falha terapêutica aos glicocorticoides isolados após 5 a 7 dias de tratamento adequado; 2) Queda progressiva acelerada do PCV (>=5 pontos percentuais em 24h) com hemólise descontrolada; 3) Dependência transfusional contínua após a primeira semana; 4) Apresentações hiperagudas com hemólise intravascular fulminante e autoaglutinação persistente pós-lavagem; 5) Cães de grande porte (>25 kg) nos quais o desmame mais acelerado do esteroide será imperativo para evitar caquexia esteroidal.',
    tabelaImunossupressoresSegundaLinha: {
      kind: 'clinicalTable' as const,
      caption: 'Guia de Imunossupressores de Segunda Linha em Cães (ACVIM 2019 / Plumb’s 10ª ed.)',
      headers: [
        'Fármaco',
        'Dose e Via em Cães',
        'Mecanismo de Ação',
        'Latência de Ação',
        'Monitorização e Eventos Adversos',
      ],
      rows: [
        [
          'Ciclosporina (Microemulsão)',
          '5 mg/kg VO a cada 12h (ou SID)',
          'Inibidor de calcineurina; bloqueia transcrição de IL-2 e ativação de células T',
          'Rápida a intermediária (48h a 7 dias)',
          'Vômitos, diarreia, hiperplasia gengival; dosagem sérica (vale: 200-500 ng/mL)',
        ],
        [
          'Micofenolato de Mofetil (MMF)',
          '8 a 12 mg/kg VO a cada 12h',
          'Inibe inosina monofosfato desidrogenase (IMPDH); bloqueia síntese de purinas em linfócitos B e T',
          'Rápida (24 a 48 horas)',
          'Toxicidade gastrointestinal (diarreia hemorrágica autolimitada em até 20%), anorexia',
        ],
        [
          'Azatioprina',
          '2 mg/kg VO q24h por 14 dias; depois 2 mg/kg em dias alternados (q48h)',
          'Antimetabólito análogo de purina; incorpora-se ao DNA e inibe proliferação linfocitária',
          'Lenta (14 a 21 dias para efeito pleno)',
          'Mielossupressão (neutropenia, trombocitopenia), hepatite tóxica aguda, pancreatite; CONTRAINDICADA EM GATOS',
        ],
        [
          'Leflunomida',
          '2 a 4 mg/kg VO a cada 24h',
          'Inibe di-hidroorotato desidrogenase; bloqueia síntese de novo de pirimidinas',
          'Intermediária (3 a 5 dias)',
          'Anorexia, vômitos, anemia não regenerativa, dosar enzimas hepáticas periodicamente',
        ],
        [
          'Ciclofosfamida',
          'CONTRAINDICADA DE ROTINA',
          'Agente alquilante citotóxico potente',
          'Rápida',
          'ACVIM não recomenda: ensaios clínicos revelaram aumento de mortalidade sem benefício',
        ],
      ],
    },
    tromboprofilaxiaObrigatoriaCurative:
      'O tromboembolismo pulmonar e a trombose venosa portal representam a principal causa de óbito nas primeiras duas semanas de curso clínico da AHIM. O Consenso CURATIVE (2019/2022) e o Consenso ACVIM estabelecem que praticamente 100% dos cães com diagnóstico confirmado ou fortemente provável de AHIM devem receber terapia antitrombótica profilática imediata, a menos que apresentem trombocitopenia grave concomitante (<30.000 plaquetas/uL) ou hemorragia ativa espontânea. A escolha da classe farmacológica deve respeitar a fisiopatologia da trombose venosa de baixo cisalhamento, na qual os anticoagulantes são amplamente superiores aos antiplaquetários isolados: 1) Inibidores orais diretos do Fator Xa: Rivaroxabana (1 a 2 mg/kg VO a cada 24 horas). Apresenta excelente biodisponibilidade oral em cães, farmacocinética previsível, dispensando monitorização laboratorial rotineira e com excelente perfil de segurança; 2) Heparinas de Baixo Peso Molecular (LMWH): Enoxaparina (0,8 a 1,2 mg/kg SC a cada 8 horas) ou Dalteparina (150 a 175 UI/kg SC a cada 8 horas), com monitoramento ideal por atividade anti-fator Xa sérica (alvo terapêutico de 0,5 a 1,0 UI/mL); 3) Heparina Não Fracionada (UFH): reservada para terapia intensiva com infusão contínua guiada por tempo de tromboplastina parcial ativada (aPTT alvo: 1,5 a 2 vezes o valor basal); 4) Antiplaquetários: Clopidogrel (1,1 a 4 mg/kg VO a cada 24 horas, podendo ser precedido por dose de ataque de até 10 mg/kg no primeiro dia). O clopidogrel pode ser associado a anticoagulantes em pacientes de altíssimo risco tromboembólico. Atenção crítica: o uso isolado de aspirina em baixa dose (0,5 mg/kg/dia) é expressamente considerado subótimo e desaconselhado pelo ACVIM e CURATIVE devido à variabilidade farmacológica e falha na prevenção de trombos venosos.',
    tabelaProtocoloTromboprofilaxia: {
      kind: 'clinicalTable' as const,
      caption: 'Protocolo de Tromboprofilaxia na AHIM Canina (CURATIVE / ACVIM)',
      headers: [
        'Fármaco Antitrombótico',
        'Classe Farmacológica',
        'Posologia Recomendada em Cães',
        'Alvo Terapêutico / Monitoração',
        'Indicação e Recomendação',
      ],
      rows: [
        [
          'Rivaroxabana',
          'Inibidor oral direto do Fator Xa',
          '1 a 2 mg/kg VO a cada 24h',
          'Farmacocinética previsível; não requer monitoração de rotina',
          'Primeira escolha prática oral; alta eficácia e segurança comprovada',
        ],
        [
          'Enoxaparina',
          'Heparina de baixo peso molecular (LMWH)',
          '0,8 a 1,2 mg/kg SC a cada 8h (q8h)',
          'Atividade anti-Xa plasmática entre 0,5 e 1,0 UI/mL',
          'Excelente opção injetável hospitalar durante período de vômitos/jejum',
        ],
        [
          'Dalteparina',
          'Heparina de baixo peso molecular (LMWH)',
          '150 a 175 UI/kg SC a cada 8h (q8h)',
          'Atividade anti-Xa plasmática entre 0,5 e 1,0 UI/mL',
          'Alternativa injetável à enoxaparina com perfil similar',
        ],
        [
          'Clopidogrel',
          'Antagonista do receptor plaquetário P2Y12',
          '1,1 a 4 mg/kg VO q24h (ataque inicial opcional: até 10 mg/kg)',
          'Inibição de agregação plaquetária por ADP',
          'Antiplaquetário preferencial; pode ser combinado com rivaroxabana em alto risco',
        ],
        [
          'Aspirina (baixa dose)',
          'Inibidor irreversível da COX-1 plaquetária',
          '0,5 mg/kg VO q24h (DESACONSELHADA isoladamente)',
          'Inibição de tromboxano A2 (TXA2)',
          'Subótima: ACVIM e CURATIVE contraindicam monoterapia com aspirina na AHIM',
        ],
      ],
    },
    estrategiaTransfusionalRacionalConcentrado:
      'A decisão de transfundir um cão com AHIM não deve basear-se exclusivamente em um número isolado de hematócrito (como o antigo dogma arbitrário de PCV <15%). A indicação de hemoterapia deve ser norteada pela presença de sinais clínicos e hemodinâmicos de hipóxia tecidual e oferta celular insuficiente de oxigênio (DO2): taquicardia persistente desproporcional, taquipneia ou dispneia, letargia profunda, fraqueza incapaz de sustentar estação, hipotensão, extremidades frias e hiperlactatemia (>3 a 4 mmol/L) refratária à reposição hidroeletrolítica. O hemocomponente de escolha é o concentrado de hemácias (pRBC - packed red blood cells), infundido na dose de 10 a 15 mL/kg ao longo de 2 a 4 horas. O sangue total está indicado apenas na coexistência de perda volêmica aguda ativa. O uso de pRBC recente (armazenado por <=7 a 10 dias) é recomendado pelo ACVIM, pois hemácias estocadas por tempo prolongado sofrem lesões oxidativas de membrana, elevam a concentração de hemoglobina livre no receptor e reduzem a sobrevida eritrocitária pós-transfusional. A tipagem sanguínea para o antígeno eritrocitário canino DEA 1 é obrigatória antes da primeira transfusão (animais DEA 1 negativos devem receber sangue DEA 1 negativo para evitar aloimunização). O teste de compatibilidade cruzada maior (major crossmatch) é mandatrio antes de transfusões repetidas após 48 a 72 horas da primeira bolsa.',
    tabelaDecisaoTransfusional: {
      kind: 'clinicalTable' as const,
      caption: 'Critérios de Decisão Hemoterápica e Tipagem na AHIM Canina',
      headers: [
        'Item de Avaliação',
        'Conduta Recomendada pelo Consenso ACVIM',
        'Justificativa Fisiopatológica',
      ],
      rows: [
        [
          'Gatilho Transfusional',
          'Sinais de hipóxia tecidual celular (taquicardia, prostração, lactato >3-4 mmol/L)',
          'Evita transfundir números isolados em pacientes compensados por adaptação crônica',
        ],
        [
          'Hemocomponente de Escolha',
          'Concentrado de hemácias (pRBC) 10 a 15 mL/kg IV em 2 a 4 horas',
          'Repõe massa eritrocitária sem sobrecarga volêmica de plasma em corações anêmicos',
        ],
        [
          'Idade da Bolsa de Sangue',
          'Preferir pRBC recente estocado por <=7 a 10 dias',
          'Minimiza reações transfusionais e hemólise de estocagem por lesão oxidativa',
        ],
        [
          'Tipagem DEA 1',
          'Obrigatória antes da 1ª transfusão (DEA 1 negativo para receptor negativo)',
          'Impede aloimunização contra o antígeno mais imunogênico da espécie canina',
        ],
        [
          'Crossmatch Maior',
          'Mandatrio se o paciente já recebeu sangue há mais de 48-72h',
          'Detecta aloanticorpos formados contra outros sistemas alogênicos (DEA 4, 7, Dal, Kai)',
        ],
        [
          'Plasma Fresco Congelado (FFP)',
          'NÃO indicado rotineiramente como profilaxia de trombose',
          'FFP não repõe antitrombina de forma eficaz e aumenta sobrecarga circulatória (TACO)',
        ],
      ],
    },
    terapiasDeResgateHIVIGePlasmaferese:
      'Em cães refratários à terapia imunossupressora convencional que mantêm hemólise intravascular fulminante, aglutinação persistente ou dependência transfusional com consumo imediato de bolsas de concentrado de hemácias, terapias de resgate avançadas podem ser consideradas: 1) Imunoglobulina Humana Intravenosa (hIVIG): infundida na dose de 0,5 a 1,0 g/kg IV ao longo de 6 a 12 horas. A hIVIG atua por bloqueio competitivo rápido dos receptores Fc-gama nos macrófagos esplênicos e hepáticos, impedindo a ligação e destruição das hemácias opsonizadas, além de acelerar o clearance de autoanticorpos circulantes. Embora ofereça estabilização transitória em casos refratários, o ACVIM não recomenda seu uso rotineiro inicial devido ao custo elevado, disponibilidade limitada e risco de reações anafilactoides e lesão renal aguda associada a imunoglobulinas; 2) Plasmaferese terapêutica (Troca Plasmática Terapêutica - TPE): procedimento extracorpóreo avançado que remove fisicamente imunoglobulinas, complexos imunes, fragmentos de complemento e citocinas inflamatórias do plasma do paciente, substituindo o volume por albumina canina ou plasma alogênico. Disponível em centros universitários e hospitais de alta complexidade para casos super-refratários.',
    errosComunsEArmadilhasClinicas: [
      'Erro 1: Atrasar o início da tromboprofilaxia aguardando estabilização do hematócrito. A trombose venosa ocorre nos primeiros dias; a anticoagulação deve iniciar no ato do diagnóstico.',
      'Erro 2: Realizar o teste de aglutinação salina na proporção 1:1. Essa proporção insuficiente gera falso-positivos frequentes por rouleaux. A proporção obrigatória é de 1 gota de sangue para 4 de salina (1:4).',
      'Erro 3: Descartar AHIM porque o teste de Coombs (DAT) resultou negativo. O teste apresenta até 20% a 30% de falso-negativos; a presença de esferócitos e SAT positivo confirma a doença.',
      'Erro 4: Prescrever monoterapia com aspirina em baixa dose (0,5 mg/kg/dia) para tromboprofilaxia. ACVIM e CURATIVE desaconselham formalmente a aspirina isolada pela sua ineficácia em trombos venosos.',
      'Erro 5: Manter doses elevadas de prednisona (2 a 3 mg/kg/dia) por várias semanas ou meses após estabilização, induzindo sepse secundária, atrofia muscular e pancreatite iatrogênica.',
      'Erro 6: Utilizar cálculo posológico linear de corticoides em cães gigantes (>25 kg), prescrevendo doses maciças tóxicas. Em cães grandes, calcular por superfície corporal (50 a 60 mg/m²/dia).',
      'Erro 7: Prescrever ciclofosfamida de rotina. Estudos prospectivos demonstraram que a ciclofosfamida não oferece benefício e aumenta a mortalidade na AHIM canina.',
      'Erro 8: Puncionar veias jugulares traumaticamente em cães com anemia crítica e trombocitopenia associada, predispondo a hematomas cervicais e asfixia mecânica.',
      'Erro 9: Transfundir o paciente baseando-se em um número mágico de hematócrito em vez de sinais clínicos de hipóxia celular descompensada.',
      'Erro 10: Suspender ou reduzir bruscamente a imunossupressão após melhora rápida do hematócrito, deflagrando recaídas severas de difícil controle.',
    ],
    protocoloPlantaoAhim10Passos: [
      'Passo 1: Oxigenoterapia suave e estrito manejo hands-off para evitar colapso hipóxico por estresse.',
      'Passo 2: Venopunção periférica única (evitar jugular) e colheita de tubos EDTA para micro-hematócrito (PCV), esfregaço, SAT 1:4, Coombs e tipagem DEA 1.',
      'Passo 3: Aferir PCV, proteínas plasmáticas totais e avaliar cor do plasma no capilar centrifugado (hemoglobinemia vs icterícia).',
      'Passo 4: Executar o teste de aglutinação salina rigorosamente na proporção 1 gota de sangue : 4 gotas de salina (1:4).',
      'Passo 5: Confeccionar e corar esfregaço sanguíneo para contagem de esferócitos em imersão (100x), pesquisa de Babesia e policromasia.',
      'Passo 6: Se houver sinais de hipóxia clínica descompensada, solicitar concentrado de hemácias (pRBC) DEA 1 compatível recente.',
      'Passo 7: Iniciar imediatamente prednisona ou prednisolona (2 a 3 mg/kg/dia VO ou 50 a 60 mg/m²/dia para cães >25 kg; ou dexametasona 0,15-0,3 mg/kg IV).',
      'Passo 8: Prescrever tromboprofilaxia obrigatória imediata: rivaroxabana (1 a 2 mg/kg VO q24h) ou enoxaparina (0,8 a 1,2 mg/kg SC q8h).',
      'Passo 9: Solicitar exames para triagem de aIMHA: PCR/sorologia para Babesia gibsoni, pesquisa de Dirofilaria e radiografias toracoabdominais.',
      'Passo 10: Internar em monitorização intensiva, aferindo PCV seriado a cada 12 a 24 horas, frequência respiratória em repouso e lactato.',
    ],
  },
  complications: {
    tromboembolismoPulmonarEVenoso:
      'O tromboembolismo pulmonar (TEP), a trombose da veia porta e o infarto esplênico são complicações diretas da hipercoagulabilidade combinada à hipofibrinólise descrita por Goggs et al. (2025). O TEP apresenta letalidade altíssima e pode instalar-se subitamente mesmo durante a recuperação do hematócrito. A monitorização da frequência respiratória em repouso e a manutenção ininterrupta de antitrombóticos são cruciais.',
    complicacaoPancreatiteAgudaHemoglobinaLivre:
      'A pancreatite aguda foi classicamente debatida como causa ou consequência na AHIM. O estudo de Gianesini et al. (2023, JVIM) esclareceu que a pancreatite aguda suspeita ocorre com frequência significativamente aumentada em cães com AHIM (RR 2,54) e correlaciona-se com concentrações elevadas de hemoglobina livre intravascular (>=0,08 g/dL). A hemoglobina tetramérica livre e o heme catalisam lesão oxidativa endotelial e microtrombose na vascularização pancreática terminal, configurando a pancreatite como uma consequência direta da hemólise intravascular severa, e não como gatilho causal primário.',
    lesaoRenalAgudaHemoglobinurica:
      'Na hemólise intravascular descompensada, a hemoglobina dimérica livre filtrada pelos glomérulos satura a capacidade de reabsorção do túbulo contorcido proximal. A precipitação intraluminal de cilindros de hemoglobina, a formação de metemoglobina citotóxica, a peroxidação lipídica mediada por ferro livre e a isquemia renal provocada pelo consumo local de óxido nítrico culminam em necrose tubular aguda (NTA) e lesão renal aguda anúrica ou oligúrica grave.',
    sepseEInfeccoesOportunistas:
      'A administração de doses imunossupressoras plenas de glicocorticoides, isoladamente ou combinadas com ciclosporina ou micofenolato, eleva exponencialmente a vulnerabilidade a infecções bacterianas oportunistas, com destaque para infecções bacterianas do trato urinário (ITU) subclínicas ou ascendentes (pielonefrite), pneumonias e piodermites profundas. O Consenso ACVIM recomenda urocultura periódica e vigilância clínica contínua.',
  },
  prevention: {
    segurancaVacinalPosRemissaoSparrow2024:
      'O manejo imunológico a longo prazo após a remissão completa da AHIM exigia cautela excessiva com vacinas. As evidências contemporâneas de Sparrow et al. (2024) em 73 cães demonstram que revacinar pacientes que completaram o desmame dos imunossupressores e mantêm hematócrito estável é seguro e não aumenta o risco de recaídas da AHIM (taxas globais de recaída de 11% aos 12 meses e 18% aos 24 meses, idênticas entre vacinados e não vacinados). A decisão vacinal deve ser tomada com base no risco epidemiológico real de infecções fatais.',
    prevencaoDeGatilhosVetoriais:
      'A prevenção primária mais eficaz de formas associativas infecciosas (aIMHA) baseia-se no controle ectoparasiticida rigoroso e ininterrupto com isoxazolinas orais (afoxolaner, fluralaner, sarolaner) e coleiras repelentes impregnadas com piretroides para bloquear a transmissão de carrapatos vetores de Babesia canis, Babesia vogeli e agentes da erliquiose.',
    monitoramentoContinuoEPrevecaoDeRecidivas:
      'O acompanhamento pós-alta envolve retornos periódicos semanais no primeiro mês, quinzenais até o terceiro mês e mensais até o término do desmame. Em cada revisão, deve-se aferir o hematócrito/PCV centrifugado, a contagem de reticulócitos e investigar proteinúria ou alterações hepáticas induzidas por fármacos. Os tutores devem ser instruídos a monitorar diariamente a coloração da gengiva e da urina.',
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
      notes: 'Diretrizes consensuais vigentes para diagnóstico, tríade confirmatória e investigação de causas associadas em cães e gatos.',
      evidenceLevel: 'Consenso de especialistas',
    },
    {
      id: 'ref-acvim-treat-2019',
      citationText:
        'Swann JW, Garden OA, Fellman CL, et al. ACVIM consensus statement on the treatment of immune-mediated hemolytic anemia in dogs. J Vet Intern Med. 2019;33(3):1141-1172.',
      sourceType: 'Consenso ACVIM',
      url: 'https://doi.org/10.1111/jvim.15463',
      notes: 'Diretrizes terapêuticas contendo 46 recomendações sobre glicocorticoides, segundo agente, tromboprofilaxia e transfusão em cães.',
      evidenceLevel: 'Consenso de especialistas',
    },
    {
      id: 'ref-curative-2019-2022',
      citationText:
        'deLaforcade A, Blais MC, Goggs R, et al. 2019 / 2022 CURATIVE consensus guidelines on the prevention and management of thrombosis in small animals. J Vet Emerg Crit Care. 2019;29(1):37-74.',
      sourceType: 'Consenso Internacional CURATIVE',
      url: 'https://doi.org/10.1111/vec.12795',
      notes: 'Diretrizes de estratificação de risco trombótico e protocolos de tromboprofilaxia com anticoagulantes e antiplaquetários.',
      evidenceLevel: 'Consenso de especialistas',
    },
    {
      id: 'ref-goggs-2025',
      citationText:
        'Goggs R, Davis S, Brooks MB. Tissue plasminogen activator modified thromboelastography identifies fibrinolysis resistance in dogs with immune-mediated hemolytic anemia. Front Vet Sci. 2025;12:1571683.',
      sourceType: 'Estudo prospectivo controlado',
      url: 'https://doi.org/10.3389/fvets.2025.1571683',
      notes: 'Comprovação de resistência à fibrinólise (hipofibrinólise), ativação de TAFI, aumento marcante de PAI-1 e NETose em cães com AHIM.',
      evidenceLevel: 'Evidência laboratorial e clínica',
    },
    {
      id: 'ref-agnoli-2024',
      citationText:
        'Agnoli C, et al. Prospective randomized clinical trial evaluating the addition of cyclosporine or mycophenolate mofetil to prednisolone in canine immune-mediated hemolytic anemia. J Vet Intern Med. 2024;38(4):2112-2122.',
      sourceType: 'Ensaio clínico randomizado prospectivo (RCT)',
      url: 'https://doi.org/10.1111/jvim.17112',
      notes: 'Estudo com 43 cães demonstrando que a adição de segundo imunossupressor não melhora a resposta hematológica aguda na corticoterapia inicial.',
      evidenceLevel: 'Ensaio clínico randomizado',
    },
    {
      id: 'ref-weng-2023',
      citationText:
        'Weng HY, et al. Multicenter retrospective evaluation of immunosuppressive regimens and clinical outcomes in 242 dogs with immune-mediated hemolytic anemia. J Vet Intern Med. 2023;37(5):1685-1695.',
      sourceType: 'Estudo multicêntrico de coorte',
      url: 'https://doi.org/10.1111/jvim.16853',
      notes: 'Avaliação de monoterapia versus politerapia na sobrevida a curto e médio prazo em 242 cães.',
      evidenceLevel: 'Estudo observacional multicêntrico',
    },
    {
      id: 'ref-sparrow-2024',
      citationText:
        'Sparrow T, et al. Post-remission vaccination safety and long-term relapse rates in 73 dogs with immune-mediated hemolytic anemia. J Vet Intern Med. 2024;38(3):1450-1458.',
      sourceType: 'Estudo prospectivo de coorte',
      url: 'https://doi.org/10.1111/jvim.17056',
      notes: 'Demonstração da segurança vacinal após remissão da AHIM e análise da dinâmica temporal de recaídas (11% em 1 ano, 18% em 2 anos).',
      evidenceLevel: 'Estudo observacional prospectivo',
    },
    {
      id: 'ref-gianesini-2023',
      citationText:
        'Gianesini G, et al. Suspected acute pancreatitis in dogs with immune-mediated hemolytic anemia: prevalence and association with intravascular hemolysis and free hemoglobin. J Vet Intern Med. 2023;37(4):1401-1409.',
      sourceType: 'Estudo clínico observacional',
      url: 'https://doi.org/10.1111/jvim.16801',
      notes: 'Lesão endotelial microvascular e pancreatite como complicação secundária de hemoglobina livre (RR 2,54).',
      evidenceLevel: 'Estudo observacional',
    },
    {
      id: 'ref-nelson-couto-6e',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2020. Chapter 73: Common Immune-Mediated Diseases, pp. 1234-1238; Chapter 2: Anemia, pp. 18-35.',
      sourceType: 'Livro-texto do acervo',
      notes: 'Fundamentação clínica da etiopatogenia, esferocitose, autoaglutinação e protocolos imunossupressores.',
      evidenceLevel: 'Referência clínica',
    },
    {
      id: 'ref-plumbs-10e',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. Wiley-Blackwell; 2023. Monografias: Prednisone/Prednisolone, Dexamethasone, Cyclosporine, Mycophenolate mofetil, Azathioprine, Leflunomide, Rivaroxaban, Clopidogrel, Enoxaparin, Dalteparin, Unfractionated Heparin.',
      sourceType: 'Manual farmacológico do acervo',
      notes: 'Doses, mecanismos, parâmetros de monitorização e farmacocinética de imunossupressores e antitrombóticos.',
      evidenceLevel: 'Referência farmacológica',
    },
    {
      id: 'ref-bsava-10e',
      citationText:
        'Ramsey I, ed. BSAVA Small Animal Formulary. 10th ed. Part A: Canine and Feline. British Small Animal Veterinary Association; 2020. Monografias de imunossupressores e heparinas em pequenos animais.',
      sourceType: 'Manual farmacológico do acervo',
      notes: 'Posologia e segurança de agentes imunomoduladores e anticoagulantes.',
      evidenceLevel: 'Referência farmacológica',
    },
  ],
  isPublished: true,
  source: 'seed',
};
