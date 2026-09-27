import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/** 
 * Hipertireoidismo Felino — Conteúdo Editorial Clínico de Padrão Ouro.
 * Embasamento: AAHA 2023 Guidelines > AAFP 2016 Feline Guidelines > Geddes & Aguiar 2022 (Renal Interplay) >
 * Stammeleer et al. 2024 (Hypertension) > Peterson & Rishniw 2021 (I-131 Individualized) > Ettinger 9ª ed. 2024 >
 * Nelson & Couto 6ª ed. > BSAVA Manual of Feline Endocrinology 5ª ed.
 */
export const hipertireoidismoFelinoRecord: DiseaseRecord = {
  id: 'disease-hipertireoidismo-felino',
  slug: 'hipertireoidismo-felino',
  title: 'Hipertireoidismo felino',
  subtitle: 'Guia clínico integral: diagnóstico de alta sensibilidade, tireotoxicose cardiovascular, desmascaramento da DRC, radioiodoterapia personalizada e controle farmacológico',
  synonyms: [
    'Hipertireoidismo em gatos',
    'Tireotoxicose felina',
    'Bócio tóxico nodular felino',
    'Feline hyperthyroidism',
    'Adenoma tireoidiano funcional felino'
  ],
  species: ['cat'],
  category: 'endocrinologia',
  categories: ['endocrinologia', 'clinica-medica', 'cardiologia', 'nefrologia', 'medicina-felina'],
  tags: [
    'Tireoide',
    'T4 total',
    'T4 livre',
    'TSH felino',
    'Metimazol',
    'Tiamazol',
    'I-131',
    'Cintilografia tireoidiana',
    'DRC mascarada',
    'Hipertensao arterial sistemica',
    'Cardiomiopatia tireotoxica',
    'AAHA 2023',
    'AAFP'
  ],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['hipertireoidismo-felino'],

  quickSummary:
    'O hipertireoidismo é a endocrinopatia mais comum em gatos geriátricos (>8 anos), causada em mais de 98% dos casos por hiperplasia adenomatosa multinodular ou adenoma benigno autônomo (carcinomas correspondem a apenas 1-2%). O excesso sustentado de tiroxina (T4) e tri-iodotironina (T3) acelera o metabolismo basal, induzindo perda de peso progressiva apesar de polifagia voraz, taquicardia sinusal, hiperatividade, vômitos e bócio palpável. Acomete o sistema cardiovascular gerando cardiomiopatia tireotóxica e hipertensão arterial sistêmica em até 25-30% dos pacientes. Um dos maiores desafios clínicos reside na inter-relação tireoide-rim: a tireotoxicose aumenta a taxa de filtração glomerular (hiperfiltração) e a sarcopenia reduz a massa muscular, mascarando uma Doença Renal Crônica (DRC) preexistente em até 40% dos animais. O diagnóstico confirma-se por T4 total elevado, exigindo T4 livre por diálise e TSH suprimido nos casos limítrofes. A cintilografia com tecnécio-99m é o padrão-ouro anatômico-funcional. A radioiodoterapia (I-131) é a modalidade curativa de primeira linha de escolha; o metimazol oral/transdérmico e a dieta com estrita restrição de iodo controlam a secreção hormonal, mas não destroem o nódulo progressivo.',

  quickDecisionStrip: [
    'Gato idoso emagrecendo com apetite voraz + taquicardia (>220 bpm) + nódulo tireoidiano palpável = suspeita máxima; palpação cuidadosa em "pinça" do sulco jugular identifica o nódulo em >80-85% dos casos.',
    'T4 total sérico elevado em laboratório de referência confirma o diagnóstico na grande maioria dos pacientes com sinais clínicos compatíveis.',
    'T4 total normal NÃO exclui hipertireoidismo: ~5-10% têm doença inicial, flutuações hormonais ou supressão transitória por doença não tireoidiana grave (síndrome do eutireoideo doente).',
    'T4 livre elevada (fT4 elevada) isolada NÃO confirma a doença: apresenta falso-positivo em até 12% dos gatos eutetireoideos doentes; deve SEMPRE ser interpretada em conjunto com T4 total e TSH (Brassard et al., 2026).',
    'TSH felino suprimido (<0,03 ng/mL) reforça hipertireoidismo; TSH normal ou alto exclui quase categoricamente a doença não tratada.',
    'O hipertireoidismo mascara a Doença Renal Crônica: a hiperfiltração glomerular e a perda de massa muscular reduzem a creatinina; nunca tolerar ou manter gato hipertireoideo com medo de elevar creatinina, o objetivo primordial é sempre restaurar o eutireoidismo (Geddes & Aguiar, 2022).',
    'NUNCA deixe o gato intencionalmente hipertireoideo com medo de elevar a creatinina: o hipertireoidismo não tratado perpetua lesão glomerular, proteinúria, hipertensão e necrose miocárdica.',
    'Aferir a Pressão Arterial Sistólica (PAS) por Doppler antes e 2 a 4 semanas após atingir o eutireoidismo: 25-30% são hipertensos no diagnóstico e outros desenvolvem hipertensão de novo pós-tratamento.',
    'Metimazol NÃO cura e NÃO impede o crescimento do tumor tireoidiano: a dose inicial deve ser calculada por gato (1,25 a 2,5 mg/gato q12-24h), NUNCA por mg/kg.',
    'Radioiodoterapia (I-131) é a terapia curativa definitiva de eleição (>95% de sucesso); o cálculo da dose deve ser individualizado com base no tamanho nodular e captação cintilográfica, e não em dose fixa universal.',
    'Dieta y/d exige exclusividade nutricional absoluta (100% dos alimentos e petiscos); não destrói o tumor e é contraindicada em animais com DRC azotêmica avançada IRIS 3-4.',
    'Em caso de apatia extrema, anorexia e prostração ("hipertireoidismo apático", 5-10%), investigar imediatamente insuficiência cardíaca congestiva descompensada ou sepse/DRC avançada associada.'
  ],

  quickSummaryRich: {
    lead: 'O hipertireoidismo felino é uma condição multissistêmica hipermetabólica hiperadrenérgica. Apresenta repercussões hemodinâmicas profundas no miocárdio e na circulação renal, exigindo abordagem metódica para restaurar o eutireoidismo sem precipitar colapso da filtração glomerular ou hipotireoidismo iatrogênico.',
    leadHighlights: [
      'Hiperplasia adenomatosa autônoma (>98%)',
      'Desmascaramento da DRC pós-eutireoidismo',
      'Cardiomiopatia tireotóxica e hipertensão arterial',
      'T4 total inicial + T4 livre/TSH para limítrofes',
      'Cintilografia 99mTc como padrão-ouro de imagem',
      'I-131 curativo definitivo vs Metimazol de manutenção'
    ],
    pillars: [
      {
        title: 'Pilar 1: Diagnóstico Laboratorial Estruturado e Armadilhas',
        body: 'O T4 total sérico é o teste de triagem primordial. Em pacientes geriátricos com nódulo palpável e clínica sugestiva, valores acima do intervalo de referência consolidam o diagnóstico. Em gatos limítrofes ou com comorbidades não tireoidianas (eutireoideo doente), a repetição em 2 a 4 semanas associada à dosagem de T4 livre por diálise em equilíbrio e TSH endógeno felino suprimido confirma o diagnóstico com alta precisão.',
        highlights: ['T4 total como triagem obrigatória', 'T4 livre por diálise para casos limítrofes', 'TSH indetectável/suprimido']
      },
      {
        title: 'Pilar 2: Inter-relação Nefrorrenal (DRC Mascarada)',
        body: 'O excesso de T3 e T4 provoca vasodilatação renal e elevação acentuada da taxa de filtração glomerular (hiperfiltração), além de sarcopenia por catabolismo muscular, resultando em creatinina sérica artificialmente baixa. A resolução do hipertireoidismo desmascara a DRC em até 40% dos casos. O objetivo terapêutico é o eutireoidismo estável; nunca se deve permitir tireotoxicose residual para "proteger" a creatinina.',
        highlights: ['Hiperfiltração e creatinina falsamente reduzida', 'Desmascaramento em 15-40% pós-tratamento', 'Manter eutireoidismo sem hipotireoidismo']
      },
      {
        title: 'Pilar 3: Cardiomiopatia Tireotóxica e Risco Vascular',
        body: 'A estimulação beta-adrenérgica direta e indireta causa taquicardia severa, aumento da contratilidade, hipertensão arterial sistêmica e sobrecarga diastólica/sistólica, culminando em hipertrofia ventricular concêntrica secundária. O controle álgico-cardiovascular inicial com betabloqueadores (atenolol) reduz a demanda miocárdica de oxigênio enquanto as terapias antitireoidianas diminuem os hormônios circulantes.',
        highlights: ['Hipertrofia concêntrica reversível', 'Risco de edema pulmonar agudo e efusão pleural', 'Atenolol e controle da PAS por Doppler']
      },
      {
        title: 'Pilar 4: Escolha Terapêutica Racional (Curativa vs Manutenção)',
        body: 'A radioiodoterapia com I-131 é a conduta curativa de eleição com mais de 95% de eficácia em dose única, poupando paratireoides e tecido normal. O metimazol/tiamazol oral ou transdérmico e a dieta restrita em iodo atuam como estabilizadores reversíveis de longo prazo quando o I-131 não está disponível ou antes de procedimentos cirúrgicos de tireoidectomia.',
        highlights: ['I-131 padrão-ouro curativo', 'Metimazol com titulação por gato', 'Cuidado com hipotireoidismo pós-terapia']
      }
    ],
    diagnosticFlow: {
      title: 'Algoritmo Diagnóstico Sequencial do Hipertireoidismo Felino (AAHA 2023 / AAFP)',
      steps: [
        {
          label: 'Passo 1: Reconhecimento Clínico e Palpação Cervical em Pinça',
          detail: 'Gatos >8 anos com perda de peso progressiva apesar de polifagia, hiperatividade, taquicardia sinusal (>220 bpm), arritmias, vômitos intermitentes e pelagem opaca. Realizar palpação cervical cuidadosa posicionando o polegar e o indicador no sulco jugular da laringe até a entrada torácica com extensão do pescoço; o "thyroid slip" é palpável em 80-85% dos pacientes.'
        },
        {
          label: 'Passo 2: Dosagem de T4 Total Sérico em Laboratório de Referência',
          detail: 'Triagem mandatória. Se TT4 > 4,0 mcg/dL (ou acima do intervalo de referência) em gato com sinais clínicos e/ou nódulo palpável: diagnóstico de hipertireoidismo CONFIRMADO. Prosseguir para avaliação de comorbidades.'
        },
        {
          label: 'Passo 3: Investigação de Casos Limítrofes ou Eutireoideo Doente',
          detail: 'Se TT4 estiver na metade superior da faixa normal (2,5 a 4,0 mcg/dL) com forte suspeita clínica ou doença não tireoidiana concomitante: aguardar 2 a 4 semanas para estabilizar a comorbidade e solicitar painel tireoidiano combinado: TT4 + T4 livre por diálise em equilíbrio (fT4ed) + TSH felino. Confirma-se hipertireoidismo se TT4 limítrofe + fT4ed elevado + TSH suprimido (<0,03 ng/mL).'
        },
        {
          label: 'Passo 4: Avaliação Nefrorrenal, Pressórica e Sistêmica Basal',
          detail: 'Urinálise completa por cistocentese (densidade urinária USG antes de fluidos), creatinina, ureia, SDMA, eletrólitos, ALT, FA, hemograma completo e mensuração da Pressão Arterial Sistólica (PAS) por Doppler. Estadiar o paciente conforme critérios IRIS e monitorar alterações basais pré-tratamento.'
        },
        {
          label: 'Passo 5: Cintilografia Tireoidiana com Tecnécio-99m (Padrão-Ouro de Imagem)',
          detail: 'Exame de imagem padrão-ouro para mapear a captação e localização do tecido tireoidiano funcionante. Diferencia doença unilateral de bilateral (presente em 70%), detecta tecido ectópico torácico/subesternal (3-5%) e identifica carcinomas tireoidianos (áreas volumosas, invasivas, heterogêneas e hipocaptantes ou com captação torácica ectópica metastática).'
        }
      ]
    },
    treatmentFlow: {
      title: 'Protocolo Terapêutico e Titulação Escalonada',
      steps: [
        {
          label: 'Fase 1: Estabilização Inicial e Teste Terapêutico de Função Renal',
          detail: 'Em gatos com comorbidades ou suspeita de DRC subjacente, recomenda-se iniciar terapia médica reversível com Metimazol (1,25 a 2,5 mg/gato VO q12h ou q24h) por 4 semanas. O objetivo é restaurar o eutireoidismo e observar o comportamento da creatinina sérica e da densidade urinária sem produzir hipotireoidismo iatrogênico.'
        },
        {
          label: 'Fase 2: Escolha da Modalidade Terapêutica Definitiva',
          detail: 'Se a função renal permanecer estável (creatinina < 2,0-2,5 mg/dL e sem azotemia descompensada): indicar Radioiodoterapia (I-131) como primeira escolha curativa. Se inviável financeiramente ou logisticamente: manter Metimazol contínuo, avaliar Tireoidectomia cirúrgica intracapsular modificada ou instituir Dieta com restrição estrita de iodo (Hill\'s y/d).'
        },
        {
          label: 'Fase 3: Titulação Hormonal e Metas Terapêuticas',
          detail: 'Reavaliar T4 total, creatinina, ureia, hemograma e eletrólitos a cada 2 a 4 semanas após cada alteração posológica de metimazol. Meta terapêutica: T4 total no terço inferior do intervalo de referência (1,0 a 2,5 mcg/dL), mantendo TSH mensurável normal e creatinina estável.'
        },
        {
          label: 'Fase 4: Manejo da Tireotoxicose Cardiovascular e Hipertensão',
          detail: 'Se houver taquicardia severa sustentada (>220 bpm) ou arritmias ventriculares: associar Atenolol 6,25 a 12,5 mg/gato VO q12-24h até o controle tireoidiano. Se PAS >= 160 mmHg persistente: associar Anlodipino 0,625 a 1,25 mg/gato VO q24h.'
        },
        {
          label: 'Fase 5: Monitoramento Crônico Longitudinal',
          detail: 'Em gatos curados por I-131: monitorar T4 total, TSH e função renal aos 30, 90 e 180 dias, e semestralmente após (vigiar hipotireoidismo tardio). Em gatos mantidos com metimazol ou dieta y/d: reavaliações clínicas, laboratoriais e aferição de PAS a cada 3 a 6 meses continuamente por toda a vida.'
        }
      ]
    }
  },

  etiology: {
    definicao:
      'O hipertireoidismo felino é uma síndrome clínica e metabólica multissistêmica resultante da secreção autônoma e desregulada dos hormônios tireoidianos — tiroxina (T4) e tri-iodotironina (T3) — por células foliculares tireoidianas funcionalmente autônomas e independentes do controle pelo hormônio tireoestimulante hipofisário (TSH).',
    lesaoPredominante:
      'A patologia tireoidiana primária em aproximadamente 98% dos casos consiste em hiperplasia adenomatosa multinodular benigna ou adenoma folicular funcional bem delimitado. O carcinoma tireoidiano funcional (adenocarcinoma) é raro no momento do diagnóstico inicial, respondendo por apenas 1% a 2% das apresentações, mas pode ocorrer em gatos submetidos a manejo médico de longa duração (>4-5 anos com metimazol) pela proliferação celular sustentada.',
    distribuicaoAnatomica:
      'Acometimento bilateral está presente em aproximadamente 65% a 75% dos gatos afetados, frequentemente com assimetria volumétrica acentuada entre os lobos. Acometimento unilateral ocorre em 25% a 30%. Tecido tireoidiano ectópico funcional — derivado da descida embriológica da glândula ao longo do ducto tireoglosso desde o forâmen cego na base da língua até o mediastino anterior e pericárdio cranial — é identificado em 3% a 5% dos pacientes na cintilografia tireoidiana.',
    fatoresDeRisco:
      'Embora a causa primária seja uma proliferação clonal neoplásica ou hiperplásica, múltiplos estudos epidemiológicos correlacionam o hipertireoidismo a fatores nutricionais e ambientais: dietas comerciais úmidas enlatadas (associação com bisfenol A e compostos epóxi do revestimento interno das latas), variabilidade acentuada nos teores de iodo na dieta (ciclos de deficiência e excesso estimulando autonomia folicular), fitoestrógenos da soja, exposição crônica a retardantes de chama bromados (éteres difenílicos polibromados - PBDEs presentes em poeiras domésticas e móveis), uso de areias sanitárias comerciais aromatizadas e estilo de vida estritamente domiciliado.',
    baseGenetica:
      'Mutações somáticas com perda de regulação nos genes que codificam a subunidade alfa da proteína G estimulatória (Gs alpha) e o receptor de TSH (TSHR) geram ativação intrínseca constitutiva da cascata de sinalização adenilil-ciclase/AMPc, mantendo as células foliculares em divisão e produção hormonal contínuas, independentes de estímulo trófico hipofisário.'
  },

  epidemiology: {
    prevalenciaEIdade:
      'Trata-se da endocrinopatia mais frequente na espécie felina em todo o mundo. Acomete quase que exclusivamente felinos de meia-idade a idosos, com idade mediana ao diagnóstico de 12 a 13 anos. Mais de 95% dos pacientes diagnosticados possuem mais de 8 anos; o desenvolvimento antes dos 5 anos de idade é excepcional (<0,5%). A prevalência em gatos geriátricos (>10 anos) atendidos em clínicas de rotina varia de 6% a 10%.',
    predisposicaoRacial:
      'Não há predisposição sexual (machos e fêmeas são afetados igualmente). No entanto, raças puras como Siamês, Himalaio, Birmanês e Tonquinês apresentam uma incidência significativamente MENOR e risco relativo reduzido de desenvolver a doença em comparação com gatos domésticos de pelo curto e pelo longo (sem raça definida - SRD), sugerindo fortes fatores genéticos protetores nessas linhagens.',
    comparacaoCanina:
      'No cão, o hipertireoidismo primário por adenoma benigno espontâneo é uma entidade extremamente rara (<1% das endocrinopatias caninas). Em cães, a presença de hipertireoidismo deve imediatamente suscitar suspeita de carcinoma tireoidiano tireotóxico invasivo de grandes dimensões ou hipertireoidismo exógeno decorrente de dietas cruas comerciais à base de carne de pescoço contendo tecido tireoidiano bovino/suíno (tireotoxicose alimentar).'
  },

  pathogenesisTransmission: {
    autonomiaFolicular:
      'A proliferação clonal de células foliculares funcionais resulta em síntese e liberação maciça e descontrolada de tiroxina (T4) e tri-iodotironina (T3) na circulação sistêmica. A T3 é o hormônio biologicamente ativo mais potente, exercendo ligação direta com receptores nucleares de hormônio tireoidiano (TR-alpha e TR-beta) em praticamente todos os tecidos do organismo.',
    eixoHPT:
      'A elevação plasmática crônica de T4 e T3 livres exerce potente retroalimentação negativa (feedback negativo) sobre os neurônios secretores de TRH no hipotálamo e sobre os tireotrofos da hipófise anterior. Como resultado, a secreção de TSH hipofisário é profundamente inibida, atingindo concentrações séricas indetectáveis ou inferiores ao limite inferior de sensibilidade dos ensaios felinos validados (<0,03 ng/mL). Isso suprime a captação e função do tecido tireoidiano normal remanescente, que se torna funcionalmente atrófico.',
    progressaoTecidual:
      'A doença é intrinsecamente progressiva. O bloqueio farmacológico da síntese hormonal periférica (ex.: por metimazol) ou a privação nutricional de substrato (dieta pobre em iodo) não impedem a replicação celular nem a expansão da massa neoplásica benigna. Estudos longitudinais demonstram que nódulos mantidos sob controle médico por vários anos sofrem crescimento contínuo, aumento do número de lobos acometidos e, em casos raros, desdiferenciação para carcinoma invasivo.'
  },

  pathophysiology: {
    tabelaComparacaoTratamentos: {
      kind: 'clinicalTable',
      caption: 'Comparação de Modalidades Terapêuticas no Hipertireoidismo Felino',
      headers: ['Modalidade', 'Eficácia Curativa', 'Vantagens Primordiais', 'Desvantagens / Riscos', 'Custo Relativo'],
      rows: [
        ['Iodo-131 (Radioiodoterapia)', 'Curativa (>95% em dose única)', 'Não invasiva, sem anestesia geral, atua em tecido ectópico e carcinomas', 'Disponibilidade restrita a centros especializados, isolamento', 'Investimento inicial alto, baixo custo cumulativo'],
        ['Metimazol / Tiamazol', 'Controle médico reversível (não curativo)', 'Universalmente disponível, titulação precisa, permite avaliar DRC', 'Administração contínua vitalícia, efeitos colaterais idiossincráticos, tumor continua crescendo', 'Baixo custo inicial, alto a longo prazo'],
        ['Tireoidectomia Cirúrgica', 'Potencialmente curativa', 'Excisão tecidual imediata', 'Risco cirúrgico/anestésico geriátrico, risco de hipocalcemia grave, não remove ectópico', 'Moderado'],
        ['Dieta com Restrição de Iodo (y/d)', 'Controle clínico reversível', 'Manejo exclusivamente nutricional', 'Exclusividade estrita absoluta (0% petiscos), não impede expansão tumoral, contraindicada em DRC IRIS 3-4', 'Custo contínuo de dieta terapêutica']
      ]
    },
    cardiopatiaTireotoxica:
      'Os hormônios tireoidianos afetam o miocárdio por mecanismos genômicos diretos e não genômicos. A T3 up-regula a expressão gênica das cadeias pesadas de alfa-miosina (de contração rápida) e da bomba de cálcio do retículo sarcoplasmático (SERCA2), aumentando a taxa de relaxamento diastólico e a força de contração miocárdica. Concomitantemente, há up-regulation na densidade de receptores beta-1 adrenérgicos na membrana miocárdica, gerando hipersensibilidade extrema às catecolaminas circulantes. Perifericamente, ocorre vasodilatação sistêmica com queda acentuada da resistência vascular periférica (RVP), estimulando o sistema renina-angiotensina-aldosterona (SRAA) e retenção hídrica, o que eleva a volemia e o retorno venoso. Esse estado hemodinâmico hiperdinâmico permanente provoca hipertrofia concêntrica do ventrículo esquerdo (fenótipo similar à cardiomiopatia hipertrófica), disfunção diastólica, aumento do átrio esquerdo, taquicardia sinusal, arritmias atriais e ventriculares, e risco de insuficiência cardíaca congestiva (ICC) de alto ou baixo débito com efusão pleural e edema pulmonar.',
    eixoRenalHiperfiltracao:
      'O excesso hormonal induz vasodilatação das arteríolas aferentes renais e elevação substancial do débito cardíaco, resultando em hiperperfusão renal e aumento acentuado da Taxa de Filtração Glomerular (TFG) em 30% a 50% (hiperfiltração glomerular). Somado a isso, o estado catabólico acelerado promove severa sarcopenia (perda de massa muscular esquelética), diminuindo a produção endógena diária de creatinina a partir da fosfocreatina. A conjunção de hiperfiltração glomerular + baixa produção muscular de creatinina resulta em concentrações séricas de creatinina e ureia artificialmente baixas. Por conseguinte, uma Doença Renal Crônica (DRC) estrutural prévia e subjacente (presente em 30% a 40% dos felinos geriátricos) fica totalmente mascarada no momento do diagnóstico inicial. A instituição do tratamento do hipertireoidismo normaliza a TFG e desacelera o fluxo renal, "desmascarando" a azotemia em 15% a 40% dos gatos após a restauração do eutireoidismo.',
    metabolismoECatabolismo:
      'A estimulação generalizada da enzima Na+/K+ ATPase nas membranas celulares consome grandes quantidades de ATP, elevando o consumo celular de oxigênio e a produção de calor corpóreo (termogênese acelerada). Ocorre estimulação maciça da glicogenólise hepática, da gliconeogênese, da lipólise periférica e da proteólise muscular. O paciente consome suas próprias reservas lipídicas e musculares, apresentando perda de peso contínua e emaciação progressiva apesar de manter uma ingestão alimentar voraz (polifagia compensatória). O turnover ósseo também é acelerado por estimulação osteoclástica direta pela T3, elevando a excreção urinária de cálcio e fósforo.',
    comprometimentoGastrointestinalEHepatico:
      'A hipermotilidade gástrica e intestinal encurta o tempo de trânsito digestivo, resultando em má digestão, má absorção de nutrientes, aumento da frequência evacuatória e fezes volumosas ou esteatorreicas. Episódios frequentes de vômitos ocorrem devido à distensão gástrica aguda por polifagia voraz (ingestão rápida de grandes volumes) e por estimulação direta da zona deflagradora dos quimiorreceptores no bulbo. Alterações nas enzimas hepáticas (elevações leves a moderadas de ALT, FA e AST) são detectadas em até 75% a 90% dos pacientes, causadas por hipóxia centrolobular relativa hepática, desnutrição e toxicidade celular direta dos hormônios tireoidianos.',
    hipertensaoArterialSistemica:
      'A hipertensão arterial sistêmica (PAS >= 160 mmHg) é comum no hipertireoidismo felino, decorrente do tônus simpático aumentado, rigidez da parede vascular e ativação do SRAA. Pode causar lesões graves em órgãos-alvo (LOA), como retinopatia hipertensiva (hemorragia de fundo de olho, descolamento de retina e cegueira súbita bilateral), encefalopatia e progressão do dano renal proteinúrico.',
    formaApatica:
      'Em 5% a 10% dos felinos, o hipertireoidismo manifesta-se de forma atípica como "hipertireoidismo apático". Esses gatos não apresentam polifagia nem hiperatividade; em vez disso, exibem anorexia profunda, adipsia, letargia intensa, fraqueza muscular com ventroflexão cervical e perda de peso acentuada, frequentemente associados a comorbidades sistêmicas graves (ICC descompensada, neoplasia oculta ou DRC terminal).'
  },

  clinicalSignsPathophysiology: {
    sinaisClassicos: [
      'Perda de peso progressiva (presente em 85-92% dos casos) associada a polifagia intensa e ingestão voraz de alimento decorrente do estado hipermetabólico acelerado.',
      'Nódulo tireoidiano palpável ("thyroid slip") no exame físico da região ventral do pescoço, identificável em mais de 80% a 85% dos pacientes mediante técnica de palpação cuidadosa.',
      'Taquicardia sinusal persistente com frequência cardíaca superior a 220-240 bpm, sopro sistólico carotídeo/mitral (graus I a III/VI) e ritmo de galope (S3 ou S4 audíveis).',
      'Hiperatividade, inquietude, agressividade, comportamento arisco, deambulação contínua e vocalização noturna excessiva por superestimulação do sistema nervoso central.',
      'Poliúria e polidipsia (PU/PD) em 40-60% dos pacientes, provocadas por hiperfluxo renal medular com lavagem do interstício medular renal, psicogênica primária ou DRC associada.',
      'Pelagem opaca, eriçada, desidratada, com tufos de pelos emaranhados e áreas de alopecia por autolimpeza excessiva (overgrooming) gerada pelo estresse hiperadrenérgico.',
      'Vômitos intermitentes (por comer rápido demais ou estímulo central) e fezes volumosas/diarreia frequente decorrente de hipermotilidade intestinal.',
      'Intolerância ao calor e busca ativa por pisos frios ou banheiros decorrente da termogênese desacoplada excessiva.'
    ],
    sinaisApatiaEOutros: [
      'Forma Apática (5-10%): depressão profunda, recusa alimentar (anorexia), caquexia extrema e fraqueza muscular grave.',
      'Ventroflexão de pescoço: incapacidade de sustentar a cabeça em decorrência de fraqueza miopática ou hipocalemia secundária.',
      'Cegueira súbita bilateral e midríase arreativa com hifema decorrente de descolamento de retina por crise hipertensiva sistêmica (PAS >= 180 mmHg).',
      'Dispneia, taquipneia e ortopneia decorrentes de efusão pleural e edema pulmonar cardiogênico induzidos pela cardiomiopatia tireotóxica descompensada.'
    ]
  },

  diagnosis: {
    tabelaGruposAAHA: {
      kind: 'clinicalTable',
      caption: 'Categorização Diagnóstica do Hipertireoidismo Felino (Diretrizes AAHA / AAFP)',
      headers: ['Grupo', 'Quadro Clínico', 'T4 Total', 'fT4 por Diálise', 'TSH Felino', 'Conduta Médica'],
      rows: [
        ['Grupo 1 (Clássico)', 'Sinais clínicos típicos e nódulo tireoidiano palpável', 'Elevado (>4,0 mcg/dL)', 'Elevado', 'Suprimido (<0,03 ng/mL)', 'Hipertireoidismo confirmado; iniciar tratamento imediato'],
        ['Grupo 2 (Subclínico / Precoce)', 'Perda de peso sutil ou assintomático', 'Metade superior do normal (2,5 a 4,0)', 'Normal a limítrofe', 'Baixo ou normal', 'Monitorar clinicamente e retestar em 30 a 60 dias'],
        ['Grupo 3 (Doença Não Tireoidiana)', 'Sinais de hipertireoidismo mascarados por comorbidade (DRC, IBD)', 'Normal a limítrofe (eutireoideo doente)', 'Elevado (falso-positivo)', 'Normal a detectável', 'Tratar a comorbidade primária e reavaliar T4 total após estabilização'],
        ['Grupo 4 (Excluído / Eutireoideo)', 'Sinais inespecíficos', 'Normal baixo (<2,0 mcg/dL)', 'Normal', 'Normal', 'Hipertireoidismo altamente improvável; investigar diferenciais']
      ]
    },
    raciocinioClinico:
      'A abordagem diagnóstica exige a confirmação inequívoca da secreção autônoma tireoidiana através de dosagens hormonais séricas em laboratório veterinário de referência e a avaliação simultânea da repercussão nos órgãos-alvo (rim, coração e circulação retiniana). O diagnóstico jamais deve se limitar a um teste isolado quando há comorbidades associadas.',
    passosDiagnosticos: [
      {
        stepNumber: 1,
        title: 'Dosagem de Tiroxina Total Sérica (T4 Total / TT4)',
        description:
          'Primeira linha diagnóstica e teste de triagem padrão. Mede a fração livre e a fração ligada a proteínas plasmáticas.',
        purpose: 'Triagem e confirmação da maioria dos casos clínicos.',
        interpretation:
          'Valores de TT4 acima do intervalo de referência em gatos com sinais compatíveis confirmam o diagnóstico. No entanto, em 5% a 10% dos gatos com hipertireoidismo confirmado, o TT4 pode situar-se na metade superior da faixa normal (2,5 a 4,0 mcg/dL) em razão de doença inicial leve, flutuações hormonais circadianas ou supressão transitória por doença não tireoidiana concomitante grave (efeito euthyroid sick).',
        limitations:
          'Não exclui a doença se o resultado estiver normal em gato com forte suspeita clínica ou comorbidade grave.',
        isGoldStandard: false
      },
      {
        stepNumber: 2,
        title: 'Dosagem de T4 Livre por Diálise em Equilíbrio (fT4ed)',
        description:
          'Mede exclusivamente a fração livre metabolicamente ativa do hormônio não ligada a proteínas, utilizando método de diálise em equilíbrio.',
        purpose: 'Esclarecimento de casos duvidosos ou com TT4 normal-alto.',
        interpretation:
          'Extremamente sensível (>98%). Quase todos os gatos hipertireoideos possuem fT4ed elevado. Todavia, sua especificidade é inferior à do TT4, pois até 10% a 12% dos gatos eutetireoideos idosos portadores de doenças não tireoidianas apresentam fT4 falso-positivo.',
        limitations:
          'NUNCA deve ser interpretado isoladamente sem a dosagem de TT4. Um fT4 alto com TT4 no terço inferior da normalidade aponta para doença não tireoidiana, e NÃO hipertireoidismo.',
        isGoldStandard: false
      },
      {
        stepNumber: 3,
        title: 'Dosagem de TSH Felino Endógeno',
        description:
          'Mensuração do hormônio tireoestimulante por imunoensaio validado específico para a espécie felina.',
        purpose: 'Diferenciação hormonal refinada de casos borderline e monitoramento.',
        interpretation:
          'No hipertireoidismo ativo não tratado, o TSH está profundamente suprimido (<0,03 ng/mL) devido ao feedback negativo hipofisário. A combinação de TT4 na metade superior da normalidade + fT4ed elevado + TSH indetectável confirma com extrema segurança o diagnóstico de hipertireoidismo subclínico/inicial. Por outro lado, um TSH normal ou mensurável (>0,05 ng/mL) afasta o hipertireoidismo com quase 100% de probabilidade em animais virgens de tratamento.',
        limitations:
          'Alguns ensaios comerciais caninos não possuem sensibilidade analítica suficiente no limite inferior para distinguir concentrações muito baixas em felinos.',
        isGoldStandard: false
      },
      {
        stepNumber: 4,
        title: 'Cintilografia Tireoidiana com Pertecnetato de Tecnécio (99mTcO4-)',
        description:
          'Exame de imagem nuclear de alta resolução que avalia o parênquima funcional da tireoide em comparação com a captação das glândulas salivares zigomáticas e mandibulares.',
        purpose: 'Mapeamento anatômico, quantificação funcional e identificação de tecido ectópico ou malignidade.',
        interpretation:
          'Padrão-ouro (*isGoldStandard: true*). Razão de captação tireoide:glândula salivar >1,0 indica tecido hiperfuncional patológico. Mapeia com exatidão acometimento unilateral vs bilateral (revela que 70% são bilaterais mesmo quando apenas um lobo é palpável), identifica tecido ectópico funcional no mediastino anterior (3-5%) e diagnostica carcinomas invasivos (áreas volumosas assimétricas com captação heterogênea e metástases torácicas).',
        limitations:
          'Disponibilidade restrita a centros universitários e hospitais veterinários terciários autorizados para medicina nuclear.',
        isGoldStandard: true
      },
      {
        stepNumber: 5,
        title: 'Avaliação da Função Renal e Estadiamento IRIS Basal',
        description:
          'Urinálise completa por cistocentese com mensuração da densidade urinária (USG) por refratometria, associada a dosagens séricas de creatinina, ureia, SDMA e fósforo.',
        purpose: 'Identificação de lesão renal preexistente e estabelecimento do baseline antes da intervenção.',
        interpretation:
          'Fundamental para documentar o ponto de partida do paciente. Uma densidade urinária isostenúrica ou fracamente concentrada (<1,035) com creatinina "normal" (ex.: 1,2 mg/dL) frequentemente oculta uma DRC estagio IRIS 2 a 3 que será desmascarada após a reversão da hiperfiltração induzida pela tireotoxicose.',
        limitations:
          'A creatinina sérica isolada subestima severamente o déficit funcional em razão da hiperfiltração e da sarcopenia.',
        isGoldStandard: false
      },
      {
        stepNumber: 6,
        title: 'Mensuração da Pressão Arterial Sistólica (PAS) por Doppler Vascular',
        description:
          'Aferição metódica da pressão arterial sistólica utilizando técnica Doppler periférica (artéria radial ou coccígea) em ambiente calmo após aclimatação.',
        purpose: 'Detecção precoce de hipertensão arterial sistêmica secundária.',
        interpretation:
          'PAS >= 160 mmHg configura risco moderado de lesão em órgãos-alvo; PAS >= 180 mmHg configura risco severo de dano iminente (emergência hipertensiva com risco de cegueira por descolamento de retina e hemorragias encefálicas). Deve ser repetida rotineiramente antes e após o tratamento.',
        limitations:
          'Estresse de contenção (efeito do avental branco) pode inflar a PAS; realizar 5 a 7 aferições consecutivas descartando a primeira.',
        isGoldStandard: false
      }
    ]
  },

  treatment: {
    tabelaMetimazol: {
      kind: 'clinicalTable',
      caption: 'Protocolo de Titulação e Metas Terapêuticas com Metimazol',
      headers: ['Fase do Manejo', 'Dose Inicial por Gato', 'Intervalo de Reavaliação', 'Parâmetros Laboratoriais', 'Meta Terapêutica'],
      rows: [
        ['Iniciação Terapêutica', '1,25 a 2,5 mg/gato VO q12h (ou 2,5 mg q24h)', 'A cada 2 a 3 semanas', 'T4 total sérico, creatinina, ureia, hemograma, PAS Doppler', 'T4 total no terço inferior (1,0 a 2,5 mcg/dL) com creatinina estável'],
        ['Titulação Escalonada', 'Incrementos de 1,25 mg/gato/dia conforme resposta', 'A cada 3 a 4 semanas', 'T4 total, TSH felino, SDMA, urinálise', 'Evitar hipotireoidismo iatrogênico e monitorar função renal'],
        ['Manutenção Longitudinal', 'Dose individualizada mínima eficaz', 'A cada 3 a 6 meses', 'T4 total, creatinina, enzimas hepáticas, PAS', 'Eutireoidismo estável e bem-estar clínico duradouro']
      ]
    },
    drcConcomitante:
      'Nunca manter hipertireoidismo intencionalmente em gatos com Doença Renal Crônica concomitante sob alegação de manter hiperfiltração glomerular. A tireotoxicose mantida induz glomeruloesclerose contínua, proteinúria patológica, hipertensão arterial e necrose miocárdica que aceleram a perda irreversível de néfrons funcionais (Geddes & Aguiar, 2022). O objetivo é restaurar o eutireoidismo de forma gradual, sem provocar hipotireoidismo iatrogênico.',
    iodoRadioativo:
      'Radioiodoterapia com Iodo-131 (I-131): padrão-ouro e terapia curativa definitiva de eleição. O protocolo moderno exige dose de I-131 calculada de forma individualizada com base na gravidade clínica, volume nodular e captação cintilográfica (Peterson & Rishniw, 2021: dose mediana ~1,90 mCi; faixa 0,95 a 10,6 mCi) e NÃO fixa ou empírica universal, alcançando taxas de sucesso >95% com risco mínimo de hipotireoidismo iatrogênico tardio.',
    objetivosTerapeuticos: [
      'Restaurar o estado de eutireoidismo sustentado de forma segura e progressiva.',
      'Evitar a indução de hipotireoidismo iatrogênico permanente, o qual reduz abruptamente a TFG e acelera a progressão da azotemia renal.',
      'Controlar a cardiomiopatia tireotóxica e a hipertensão arterial sistêmica, prevenindo danos vasculares e insuficiência cardíaca congestiva.',
      'Monitorar longitudinalmente e tratar a Doença Renal Crônica desmascarada após o controle da tireotoxicose.'
    ],
    modalidadesPrincipais: [
      {
        drug: 'Radioiodoterapia com Iodo-131 (I-131)',
        indication: 'Terapia curativa definitiva de primeira escolha para hipertireoidismo felino benigno e maligno.',
        dose: 'Individualizada com base na cintilografia e tamanho nodular (Peterson & Rishniw 2021: mediana ~1,90 mCi; faixa 0,95 a 10,6 mCi SC em dose única); doses de 10 a 30 mCi para carcinomas.',
        mechanism: 'O radioisótopo I-131 é concentrado ativamente pelos transportadores de simporte sódio-iodeto (NIS) das células foliculares hiperativas. Emite radiação beta de curto alcance (2 mm) que induz necrose e morte das células neoplásicas autônomas, poupando as paratireoides e o tecido tireoidiano normal adjacente atrófico.',
        notes: 'Taxa de cura >95% com dose única. Não requer anestesia geral. Exige isolamento radiológico hospitalar regulamentado por 3 a 7 dias até decaimento da radiação ambiental. Trata tecido tireoidiano ectópico e intratorácico inacessível à cirurgia.',
        contraindications: 'Gatos com DRC descompensada estágio IRIS 4 ou azotemia grave não controlada, onde a queda irreversível da TFG pós-cura possa desencadear uremia terminal refratária.'
      },
      {
        drug: 'Metimazol / Tiamazol (Terapia Médica Reversível)',
        indication: 'Controle médico crônico contínuo ou estabilização prévia ("ensaio terapêutico renal") antes de I-131 ou tireoidectomia cirúrgica.',
        dose: 'Dose por gato: iniciar com 1,25 a 2,5 mg/gato VO a cada 12 horas ou 2,5 mg/gato VO a cada 24 horas (esquema conservador AAHA 2023). Formulação transdérmica em gel lipossomal (Pluronic Lecithin Organogel - PLO) na face interna da pina auricular na mesma dose com luvas de procedimento.',
        frequency: 'q12h ou q24h',
        duration: 'Vitalício (ou até intervenção curativa)',
        mechanism: 'Inibe competitivamente a enzima tireoperoxidase (TPO), bloqueando a oxidação do iodeto e o acoplamento das iodotirosinas para formação de T4 e T3. Não causa morte celular nem remove o adenoma, que permanece crescendo.',
        reassess: 'Reavaliar TT4, creatinina, ureia, hemograma completo e enzimas hepáticas a cada 2 a 4 semanas até estabilização da dose e meta terapêutica (T4 total entre 1,0 e 2,5 mcg/dL); após, monitorar a cada 3 a 6 meses.',
        cautions: 'Efeitos adversos leves e transitórios (vômitos, hiporexia, letargia em 10-15% dos gatos) melhoram com administração junto ao alimento ou conversão para transdérmico.',
        contraindications: 'Suspender imediatamente e NUNCA mais reintroduzir se ocorrer: prurido e escoriações faciais graves necrosantes, hepatopatia tóxica aguda grave com icterícia, ou discrasias sanguíneas graves (agranulocitose, neutropenia severa, trombocitopenia ou anemia hemolítica imunomediada induzida por fármaco).'
      },
      {
        drug: 'Carbimazol',
        indication: 'Alternativa ao metimazol oral com menor taxa de intolerância gastrointestinal em países onde está registrado.',
        dose: '5 mg/gato VO q12h a q24h.',
        mechanism: 'Pró-fármaco absorvido no trato digestivo e enzimaticamente convertido in vivo em metimazol ativo na circulação.',
        contraindications: 'Pacientes com histórico de hipersensibilidade prévia grave ao metimazol (reação cruzada total).'
      },
      {
        drug: 'Alimento Terapêutico com Restrição Estrita de Iodo (Hill\'s Prescription Diet y/d)',
        indication: 'Opção conservadora não medicamentosa para gatos de difícil manipulação onde o I-131 e a cirurgia são inviáveis.',
        dose: 'Alimentação exclusiva ad libitum ou calculada para a necessidade energética basal.',
        mechanism: 'Contém teores de iodo ultra-baixos (<0,2 ppm ou mg/kg na matéria seca). Priva as células foliculares tireoidianas do substrato indispensável para a síntese molecular de T4 e T3, reduzindo os níveis circulantes em 4 a 12 semanas.',
        cautions: 'Exige adesão e exclusividade alimentar ABSOLUTA de 100%. Qualquer ingestão acidental de petiscos, leite, restos de comida, água com cloro/iodo ou presas caçadas no ambiente anula a eficácia do tratamento.',
        contraindications: 'Contraindicado em gatos com Doença Renal Crônica azotêmica evidente (estágios IRIS 3 e 4), pois a dieta y/d não possui a restrição proteica e de fósforo nem a densidade calórica adequadas para nefropatas avançados.'
      },
      {
        drug: 'Tireoidectomia Cirúrgica (Técnica Intracapsular Modificada)',
        indication: 'Remoção cirúrgica do(s) lobo(s) acometido(s) quando há disponibilidade de cirurgião experiente e o I-131 não está disponível.',
        mechanism: 'Excisão física do adenoma preservando a glândula paratireoide externa/caudal e sua vascularização carotídea.',
        cautions: 'Requer estabilização clínica e controle da tireotoxicose cardiovascular com metimazol por pelo menos 3 a 4 semanas antes da anestesia geral. Monitorar cálcio ionizado sérico a cada 12 horas nas primeiras 72 horas pós-operatórias devido ao risco iminente de hipoparatireoidismo e hipocalcemia tetânica aguda se o procedimento for bilateral.'
      }
    ],
    terapiaSintomaticaCardiovascular: [
      {
        drug: 'Atenolol',
        dose: '6,25 a 12,5 mg/gato VO a cada 12 a 24 horas.',
        indication: 'Controle de taquicardia sinusal severa (>220 bpm), arritmias ventriculares hiperadrenérgicas, hipertensão e sintomas de tireotoxicose miocárdica até que o antitireoidiano reduza os níveis hormonais.',
        cautions: 'Betabloqueador seletivo beta-1. Reduz a frequência cardíaca, o inotropismo e o consumo miocárdico de oxigênio. Contraindicado em pacientes com insuficiência cardíaca congestiva descompensada ativa com edema pulmonar/derrame pleural grave ou bradiarritmias.'
      },
      {
        drug: 'Besilato de Anlodipino',
        dose: '0,625 a 1,25 mg/gato VO a cada 24 horas.',
        indication: 'Hipertensão arterial sistêmica secundária (PAS persistente >= 160 mmHg) para proteção contra lesões vasculares e descolamento retiniano.'
      }
    ],
    manejoDaDRCConcomitante:
      'A conduta padrão perante o desmascaramento da DRC pós-eutireoidismo consiste em reestadiar o paciente pelos critérios IRIS (creatinina, SDMA, razão proteína:creatinina urinária [UPC] e PAS). Se a azotemia for leve (IRIS Estágio 2: creatinina 1,6 a 2,8 mg/dL) com paciente clinicamente estável e ativo, mantém-se o eutireoidismo associando terapia nefroprotetora (dieta renal, quelantes de fósforo entéricos e hidratação). Caso surja azotemia moderada a severa (IRIS Estágio 3 a 4 ou aumento abrupto de creatinina >1,0 mg/dL associado a apatia e perda de peso), deve-se reduzir suavemente a dose do antitireoidiano para permitir que o T4 total flutue no terço superior do intervalo de referência (2,5 a 4,0 mcg/dL), restabelecendo um grau controlado de hiperfiltração renal para salvar a sobrevida do paciente.'
  },

  complications: {
    iatrogenicasETerapeuticas: [
      'Hipotireoidismo Iatrogênico: complicação frequente pós-I-131, pós-tireoidectomia bilateral ou por superdosagem de metimazol. Caracteriza-se por T4 total subnormal com TSH sérico elevado. O hipotireoidismo iatrogênico é nefrodestrutivo: reduz a TFG de maneira acentuada e correlaciona-se diretamente com o desenvolvimento acelerado de azotemia grave e menor tempo de sobrevida. Gatos com hipotireoidismo iatrogênico e azotemia exigem reposição imediata com Levotiroxina sódica oral (10 a 20 mcg/kg VO q24h ou 50 mcg/gato q24h) com alvo de restaurar o eutireoidismo laboratorial.',
      'Desmascaramento de Azotemia Renal (Masked CKD): redução da TFG com aumento de creatinina e ureia 2 a 8 semanas após a normalização do T4. Ocorre em 15% a 40% dos pacientes.',
      'Hipocalcemia Aguda Grave pós-Tireoidectomia: necrose isquêmica ou remoção inadvertida das quatro glândulas paratireoides provoca queda do cálcio ionizado, tetania muscular, tremores de cabeça, fasciculações e convulsões nas primeiras 24 a 72 horas pós-cirurgia.',
      'Reações adversas graves idiossincráticas ao Metimazol: escoriações cutâneas graves por prurido facial automutilante (2-3%), hepatopatia tóxica aguda colestática com necrose hepática (1-2%), e agranulocitose/trombocitopenia imunomediada (1%). Exigem suspensão permanente do fármaco.'
    ],
    sistemicasECardiovasculares: [
      'Tempestade Tireotóxica (Thyroid Storm): crise endócrina aguda com risco iminente de óbito, desencadeada por estresse agudo, cirurgia, palpação tireoidiana vigorosa, infecções intercorrentes ou abandono abrupto de tratamento. Caracterizada por hipertermia severa (>41°C), taquicardia extrema (>260 bpm), colapso cardiovascular hiperdinâmico, hipotensão terminal, arritmias ventriculares fatais e convulsões.',
      'Emergência Hipertensiva e Cegueira Aguda: lesão retiniana aguda com hemorragia de câmara anterior (hifema), edema retiniano, hemorragias em chama de vela e descolamento seroso total da retina por picos de PAS > 180-200 mmHg, resultando em cegueira bilateral irreversível se não tratada em poucas horas.',
      'Insuficiência Cardíaca Congestiva (ICC) e Tromboembolismo Aórtico (FATE): efusão pleural bilateral e edema pulmonar agudo gerados pela cardiomiopatia tireotóxica grave; estase sanguínea e dilatação atrial aumentam o risco de formação de trombos no átrio esquerdo com embolização para o canal aórtico trifurcado (paraplegia aguda dos membros pélvicos dolorosa, ausência de pulso femoral e coxins cianóticos).'
    ],
    prognostico:
      'O prognóstico para gatos com hipertireoidismo benigno tratados com Radioiodoterapia (I-131) ou manejados com metimazol em dosagem adequada é excelente a muito bom, com tempo mediano de sobrevida variando de 2 a 4 anos após o diagnóstico inicial. Os principais determinantes prognósticos negativos que reduzem drasticamente a sobrevida são: a gravidade da Doença Renal Crônica preexistente ou desmascarada pós-tratamento (sobrevida significativamente menor em pacientes IRIS estágio 3 ou 4), o desenvolvimento de hipotireoidismo iatrogênico persistente associado à azotemia, a presença de carcinoma tireoidiano indiferenciado metastático e a ocorrência de insuficiência cardíaca descompensada prévia à estabilização.'
  },

  prevention: {
    rastreamentoGeriátrico:
      'A prevenção primária do hipertireoidismo felino é limitada pelo desconhecimento da totalidade de seus gatilhos ambientais. A estratégia médica primordial fundamenta-se no diagnóstico e rastreamento precoce: palpação cervical cuidadosa do sulco jugular em toda consulta de rotina em gatos com idade >= 7 anos; dosagem periódica de T4 total sérico em exames laboratoriais geriátricos preventivos semestrais ou anuais em felinos acima de 8-9 anos; pesagens corporais seriadas rigorosas (perda de peso sutil é frequentemente o primeiro sinal clínico detectável antes de alterações evidentes de apetite).',
    planoDomiciliarEMonitoramento: [
      'Monitoramento semanal do peso corporal do felino em balança digital pediátrica ou veterinária.',
      'Mensuração rotineira da Frequência Respiratória em Repouso (FRR) durante o sono profundo do gato: valores persistentemente superiores a 30 movimentos por minuto sinalizam descompensação cardiovascular iminente (edema pulmonar ou efusão pleural) e demandam avaliação clínica de urgência.',
      'Aferição seriada da Pressão Arterial Sistólica a cada 3 a 6 meses para prevenir descolamentos silenciosos de retina.',
      'Caso o tutor utilize metimazol em gel transdérmico, exigir expressamente o uso de luvas descartáveis durante a aplicação na orelha, com revezamento diário da pina auricular e higienização prévia para remover resíduos, evitando toxicidade tireoidiana no próprio tutor e farmacodermia no paciente.',
      'Se o tratamento for realizado exclusivamente com dieta restrita em iodo (y/d), reforçar ao tutor a impossibilidade de oferecer qualquer outro petisco, alimento caseiro, sachê convencional ou suplemento vitamínico.'
    ],
    errosComuns: [
      'Acreditar que um T4 total dentro da faixa de referência normal descarta categoricamente o hipertireoidismo em um felino com clínica evidente.',
      'Interpretar uma dosagem isolada de T4 livre por diálise elevada como confirmação diagnóstica sem considerar a presença de doenças não tireoidianas concomitantes.',
      'Suspender ou manter deliberadamente o gato hipertireoideo com objetivo de preservar uma creatinina artificialmente baixa, negligenciando a destruição de néfrons e o estresse cardiovascular da tireotoxicose.',
      'Prescrever metimazol em doses calculadas por quilograma de peso corporal (mg/kg), o que resulta em sobredosagem tóxica grave em gatos caquéticos; a dose é padronizada POR GATO.',
      'Assumir que a melhora clínica e laboratorial com metimazol significa cura biológica; a suspensão do fármaco gera recaída clínica em poucos dias e o tumor folicular permanece em crescimento.',
      'Deixar de monitorar cálcio ionizado sérico nas primeiras 72 horas pós-tireoidectomia bilateral.'
    ],
    redFlags: [
      'Surgimento súbito de cegueira bilateral com midríase e hifema (urgência hipertensiva absoluta).',
      'Taquipneia, padrão respiratório restritivo abdominal e ortopneia (insuficiência cardíaca descompensada / efusão pleural).',
      'Febre extrema (>40,5°C), desidratação severa e colapso circulatório (tempestade tireotóxica emergencial).',
      'Prurido facial excruciante com lacerações e escoriações crostosas em cabeça e pescoço (reação adversa grave ao metimazol exigindo suspensão imediata).'
    ]
  },

  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'doenca-renal-cronica-caes-gatos',
    'hipertensao-arterial-sistemica-caes-gatos',
    'diabetes-mellitus-felina',
    'cardiomiopatia-hipertrofica-caes-gatos',
    'hipotireoidismo-adquirido-caes-gatos'
  ],
  relatedMedicationSlugs: ['metimazol', 'atenolol', 'anlodipino', 'benazepril', 'levotiroxina'],
  references: [
    {
      id: 'ref-ht-aaha-2023',
      title: '2023 AAHA Selected Endocrinopathies of Dogs and Cats Guidelines',
      citationText: 'Bugbee A, et al. 2023 AAHA Selected Endocrinopathies of Dogs and Cats Guidelines. J Am Anim Hosp Assoc. 2023;59(3):113-135.',
      authors: 'Bugbee A, et al.',
      year: 2023,
      journal: 'Journal of the American Animal Hospital Association',
      volume: '59',
      pages: '113-135',
      sourceType: 'Diretriz de Consenso AAHA',
      url: 'https://doi.org/10.5326/JAAHA-MS-7297',
      doi: '10.5326/JAAHA-MS-7297',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-ht-aafp-2016',
      title: '2016 AAFP Guidelines for the Management of Feline Hyperthyroidism',
      citationText: 'Carney HC, Ward CR, Bailey SJ, et al. 2016 AAFP Guidelines for the Management of Feline Hyperthyroidism. J Feline Med Surg. 2016;18(5):400-416.',
      authors: 'Carney HC, Ward CR, Bailey SJ, et al.',
      year: 2016,
      journal: 'Journal of Feline Medicine and Surgery',
      volume: '18',
      pages: '400-416',
      sourceType: 'Diretriz de Consenso AAFP',
      url: 'https://doi.org/10.1177/1098612X15627226',
      doi: '10.1177/1098612X15627226',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-ht-geddes-2022',
      title: 'Interactions between feline hyperthyroidism and chronic kidney disease',
      citationText: 'Geddes RF, Aguiar J. Interactions between feline hyperthyroidism and chronic kidney disease: A review. J Feline Med Surg. 2022;24(7):641-650.',
      authors: 'Geddes RF, Aguiar J.',
      year: 2022,
      journal: 'Journal of Feline Medicine and Surgery',
      volume: '24',
      pages: '641-650',
      sourceType: 'Revisão Sistemática',
      url: 'https://doi.org/10.1177/1098612X221090390',
      doi: '10.1177/1098612X221090390',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-ht-stammeleer-2024',
      title: 'Blood pressure and prevalence of systemic hypertension in cats with hyperthyroidism before and after radioiodine therapy',
      citationText: 'Stammeleer L, et al. Blood pressure and prevalence of systemic hypertension in cats with hyperthyroidism before and after radioiodine therapy. J Vet Intern Med. 2024;38(3):1359-1369.',
      authors: 'Stammeleer L, et al.',
      year: 2024,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '38',
      pages: '1359-1369',
      sourceType: 'Estudo Prospectivo',
      url: 'https://doi.org/10.1111/jvim.17032',
      doi: '10.1111/jvim.17032',
      evidenceLevel: 'B'
    },
    {
      id: 'ref-ht-peterson-i131-2021',
      title: 'Individualized radioiodine treatment of cats with hyperthyroidism',
      citationText: 'Peterson ME, Rishniw M. Individualized radioiodine treatment of cats with hyperthyroidism: Evaluation of an algorithm based on thyroid volume and scintigraphic uptake. J Vet Intern Med. 2021;35(5):2140-2151.',
      authors: 'Peterson ME, Rishniw M.',
      year: 2021,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '35',
      pages: '2140-2151',
      sourceType: 'Estudo Clínico',
      url: 'https://doi.org/10.1111/jvim.16228',
      doi: '10.1111/jvim.16228',
      evidenceLevel: 'B'
    },
    {
      id: 'ref-ht-ettinger-2024',
      title: 'Disorders of the Thyroid Gland: Feline Hyperthyroidism',
      citationText: "Ettinger SJ, Feldman EC, Cote E. Textbook of Veterinary Internal Medicine: Diseases of the Dog and Cat. 9th ed. St. Louis: Elsevier; 2024:1820-1845.",
      authors: 'Ettinger SJ, Feldman EC, Cote E.',
      year: 2024,
      journal: "Ettinger's Textbook of Veterinary Internal Medicine",
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-ht-nelson-couto-2020',
      title: 'Endocrine Disorders: Feline Hyperthyroidism',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020:785-804.',
      authors: 'Nelson RW, Couto CG.',
      year: 2020,
      journal: 'Small Animal Internal Medicine (6th ed)',
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-ht-bsava-endo-2020',
      title: 'BSAVA Manual of Canine and Feline Endocrinology',
      citationText: 'Mooney CT, Peterson ME. BSAVA Manual of Canine and Feline Endocrinology. 5th ed. Gloucester: British Small Animal Veterinary Association; 2020.',
      authors: 'Mooney CT, Peterson ME.',
      year: 2020,
      journal: 'BSAVA Manual of Canine and Feline Endocrinology (5th ed)',
      sourceType: 'Manual Especializado',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-ht-plumb-2023',
      title: "Plumb's Veterinary Drug Handbook (10th ed)",
      citationText: "Budde J. Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023:692-696 (Methimazole).",
      authors: 'Budde J.',
      year: 2023,
      journal: "Plumb's Veterinary Drug Handbook",
      sourceType: 'Formulário Terapêutico de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-ht-brassard-2026',
      title: 'Evaluation of canine and feline thyroid-stimulating hormone assays in hyperthyroid cats',
      citationText: 'Brassard C, et al. Evaluation of canine and feline thyroid-stimulating hormone assays in hyperthyroid cats. J Feline Med Surg. 2026;28(1):1098612X251398915.',
      authors: 'Brassard C, et al.',
      year: 2026,
      journal: 'Journal of Feline Medicine and Surgery',
      volume: '28',
      pages: 'e251398915',
      sourceType: 'Estudo Clínico',
      url: 'https://doi.org/10.1177/1098612X251398915',
      doi: '10.1177/1098612X251398915',
      evidenceLevel: 'B'
    }
  ]
};
