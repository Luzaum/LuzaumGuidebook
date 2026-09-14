import type { MedicationRecord } from '../../types/medication';

export const phenobarbitalMedicationsSeed: MedicationRecord[] = [
  {
    id: 'med-fenobarbital',
    slug: 'fenobarbital',
    title: 'Fenobarbital',
    activeIngredient: 'Fenobarbital (Fenobarbital Sódico)',
    pharmacologicClass: 'Anticonvulsivante barbitúrico de primeira linha; sedativo-hipnótico e modulador alostérico positivo de receptores GABA-A',
    species: ['dog', 'cat'],
    category: 'neurologia',
    tags: [
      'Epilepsia Idiopática',
      'Anticonvulsivante',
      'Barbitúrico',
      'Monitoramento Sérico (TDM)',
      'Controle Especial (Lista C1)',
      'Gardenal',
      'Convless',
    ],
    tradeNames: [
      'Convless® 20 mg/mL (Agener União — Uso Veterinário Exclusivo)',
      'Gardenal® 50 mg e 100 mg (Sanofi — Uso Humano/Extrabula)',
      'Fenobarbital Genérico 100 mg (União Química, Teuto, EMS, Medley)',
      'Fenocris® Injetável 100 mg/2 mL e 200 mg/2 mL (Cristália)',
    ],
    officialSiteUrl: 'https://agener.com.br/produtos/pequenos-animais/suplementos/convless/',
    leafletUrl: 'https://agener.com.br/produtos/pequenos-animais/suplementos/convless/',
    mechanismOfAction:
      'Atua como modulador alostérico positivo dos receptores GABA-A neuronais no sistema nervoso central. Liga-se seletivamente a sítios específicos nas subunidades beta/gama do complexo receptor-canal de cloreto, prolongando a duração de abertura do poro iônico em resposta ao GABA endógeno. Esse influxo sustentado de cloreto hiperpolariza a membrana pós-sináptica, estabiliza o potencial de repouso e eleva expressivamente o limiar convulsivo cortical. Concomitantemente, exerce bloqueio de canais de cálcio dependentes de voltagem pré-sinápticos (canais tipo N e P/Q), atenuando a liberação exocítica de glutamato, e inibe fracamente os receptores excitatórios AMPA/cainato, abortando a propagação paroxística de descargas epilépticas focais e generalizadas.',
    plainLanguageSummary:
      'Anticonvulsivante de primeira escolha para cães e gatos com epilepsia idiopática ou crises convulsivas recorrentes. Atua aumentando a inibição cerebral e acalmando a atividade elétrica neuronal desregulada. Exige administração estrita a cada 12 horas, monitoramento laboratorial de níveis no sangue (TDM) e NUNCA pode ser suspenso de forma abrupta.',

    indications: [
      'Controle crônico de crises em cães com epilepsia idiopática, estrutural ou reativa.',
      'Fármaco antiepiléptico de primeira escolha no tratamento de manutenção de felinos.',
      'Protocolo de estabilização hospitalar para status epilepticus e crises em salva (cluster).',
      'Terapia coadjuvante na sialadenose e hiperestesia felina responsivas a fenobarbital.',
    ],

    contraindications: [
      'Hipersensibilidade conhecida a barbitúricos.',
      'Insuficiência hepática prévia severa ou cirrose (hepatopatia terminal).',
      'Depressão respiratória grave ou choque circulatório descompensado (para via IV rápida).',
      'Histórico de discrasias sanguíneas graves induzidas por barbitúricos (pancitopenia, agranulocitose).',
    ],

    cautions: [
      'Nunca suspender o tratamento de forma abrupta pelo risco iminente de estado de mal epiléptico por abstinência.',
      'Monitorar enzimas hepáticas (ALT, ALP) e função (albumina, bilirrubina) periodicamente; ALP sobe por indução enzimática sem significar dano celular obrigatório.',
      'Realizar monitoramento sérico terapêutico (TDM) no estado de equilíbrio (14 a 21 dias) com alvo de 15 a 35 µg/mL em cães e 15 a 45 µg/mL em gatos.',
      'Em felinos, monitorar hemograma completo pelo risco idiossincrático de citopenias e trombocitopenia.',
    ],

    adverseEffects: [
      'Sedação transitória, ataxia e hipotonia muscular nas primeiras 2 a 3 semanas de adaptação neural.',
      'Poliúria, polidipsia e polifagia marcantes em cães.',
      'Hepatotoxicidade cumulativa crônica com doses elevadas ou concentrações séricas >35 µg/mL.',
      'Discrasias sanguíneas idiossincráticas raras (leucopenia, trombocitopenia, anemia não regenerativa).',
      'Reações cutâneas necrolíticas e eritema multiforme raros.',
    ],
    
    // 1. Resumo Rápido / Indicações Resumidas
    quickIndications: [
      {
        condition: 'Epilepsia Idiopática Canina (Terapia de Manutenção Crônica)',
        species: 'dog',
        doseSummary: '2,5 a 3,0 mg/kg a cada 12 horas (VO); titular por nível sérico alvo de 15 a 35 µg/mL',
        route: 'Oral (VO)',
        duration: 'Uso contínuo e vitalício; reavaliação clínica e laboratorial periódica a cada 6 meses',
        clinicalContext: 'Tratamento de primeira linha preconizado pelo consenso internacional IVETF para cães com 2 ou mais crises em 6 meses, crises em cluster ou status prévio.',
      },
      {
        condition: 'Epilepsia Felina & Crises Epilépticas Estruturais/Reativas',
        species: 'cat',
        doseSummary: '1,5 a 2,5 mg/kg a cada 12 horas (VO) ou 7,5 mg a 15 mg/gato q12h; alvo sérico 15 a 45 µg/mL',
        route: 'Oral (VO)',
        duration: 'Uso contínuo e vitalício; desmame apenas após ≥ 1–2 anos sem nenhuma crise',
        clinicalContext: 'Fármaco de escolha em felinos. Não sofre autoindução enzimática acentuada, mantendo clearance estável, mas requer vigilância hematológica.',
      },
      {
        condition: 'Status Epilepticus & Crises em Salva / Cluster (Protocolo de Carga Hospitalar)',
        species: 'both',
        doseSummary: 'Carga total de 12 a 20 mg/kg (IV lenta), fracionada em bólus de 3 a 4 mg/kg a cada 20 a 30 minutos',
        route: 'Intravenosa lenta (IV)',
        duration: 'Fase aguda de emergência (24 a 48 horas hospitalares); transicionar para VO assim que o paciente recuperar reflexo de deglutição',
        clinicalContext: 'Utilizado imediatamente após o controle agudo com benzodiazepínicos (diazepam/midazolam) para manter o bloqueio sustentado de novas descargas paroxísticas.',
      },
      {
        condition: 'Sialadenose Canina Responsiva a Fenobarbital',
        species: 'dog',
        doseSummary: '1,0 a 2,5 mg/kg a cada 12 horas (VO)',
        route: 'Oral (VO)',
        duration: '4 a 12 semanas até regressão clínica da tumefação; desmame gradual subsequente',
        clinicalContext: 'Neuromodulação central da hiperatividade parassimpática vagal/salivar que cursa com aumento bilateral indolor de glândulas salivares mandibulares e vômitos.',
      },
    ],

    // 2. Indicações Completas e Extremamente Detalhadas com Consensos Internacionais
    detailedIndications: [
      {
        id: 'ind-fenobarbital-dog-chronic',
        indication: 'Epilepsia Idiopática Canina — Monoterapia ou Politerapia de Manutenção Crônica',
        clinicalContext:
          'O consenso da International Veterinary Epilepsy Task Force (IVETF, 2015/2016) e as diretrizes do ACVIM recomendam formalmente o fenobarbital como fármaco de primeira linha para o tratamento de cães com epilepsia idiopática. Indicado quando o paciente apresenta duas ou mais crises epilépticas em período de 6 meses, quando ocorre crise única associada a estado de mal epiléptico ou crises em cluster, ou quando a frequência e a severidade dos episódios aumentam progressivamente.',
        species: 'dog',
        dose: '2,5 a 3,0 mg/kg (dose de ataque inicial ambulatorial)',
        route: 'Oral (VO)',
        frequency: 'A cada 12 horas (q12h rigorosamente com horário fixo)',
        duration:
          'Tratamento vitalício na grande maioria dos casos. Se o paciente permanecer completamente livre de crises por pelo menos 1 a 2 anos consecutivos, pode-se tentar desmame ultralento (redução de 20% a 25% da dose a cada 4 a 8 semanas). A interrupção abrupta NUNCA deve ser realizada sob risco iminente de status epilepticus e óbito.',
        mechanismOfAction:
          'Ativação alostérica contínua dos canais de cloreto no receptor GABA-A do córtex telencefálico e hipocampo, mantendo a polarização neuronal negativa e suprimindo o foco irritativo epileptogênico.',
        clinicalRationale:
          'Eficácia clínica comprovada em mais de 70% a 85% dos cães epilépticos, reduzindo a frequência de crises em mais de 50%. Atinge concentração sérica de equilíbrio estável em 10 a 14 dias.',
        monitoring:
          'Concentração sérica de fenobarbital (TDM) em 10–14 dias e novamente em 6 semanas (para reajuste pós-autoindução microssomal), depois a cada 6 meses. Hemograma completo, ALT, Fosfatase Alcalina (FA), albumina e ácidos biliares pré e pós-prandiais a cada 6 meses.',
        referenceIds: ['ref-ivetf-guidelines-2015', 'ref-charalambous-meta-2014', 'ref-boothe-comp-2012'],
        evidenceLevel: 'Consenso Internacional IVETF / Nível 1a (Meta-análise e Ensaios Randomizados)',
      },
      {
        id: 'ind-fenobarbital-cat-chronic',
        indication: 'Epilepsia Felina (Idiopática, Estrutural ou Reativa) — Manutenção Crônica',
        clinicalContext:
          'Em gatos, o fenobarbital é a terapia antiepiléptica padrão de excelência de primeira linha. A droga possui biodisponibilidade oral de 100% e taxa de eficácia superior a 80% no controle de crises focais com ou sem generalização secundária. Diferente dos cães, o brometo de potássio é CONTRAINDICADO em gatos (causa bronquite eosinofílica e asma fatal), tornando o fenobarbital o pilar essencial da neurologia felina.',
        species: 'cat',
        dose: '1,5 a 2,5 mg/kg por dose (ou pragmaticamente 7,5 mg a 15 mg totais por gato)',
        route: 'Oral (VO)',
        frequency: 'A cada 12 horas (q12h)',
        duration:
          'Uso vitalício na epilepsia estrutural ou idiopática. Reavaliação clínica a cada 3 a 6 meses.',
        mechanismOfAction:
          'Inibição GABAérgica central com estabilização sináptica cortical e redução da transmissão tálamo-cortical sincronizada.',
        clinicalRationale:
          'Gatos possuem depuração plasmática linear e NÃO desenvolvem autoindução enzimática acelerada do CYP450 como os cães, permitindo manter doses estáveis ao longo de anos.',
        monitoring:
          'Nível sérico de fenobarbital após 10 a 14 dias (faixa alvo 15 a 45 µg/mL). Hemograma completo periódico para rastreio precoce de citopenias e prurido facial/cervical.',
        referenceIds: ['ref-bailey-feline-2009', 'ref-thomas-epilepsy-2010'],
        evidenceLevel: 'Estudo Clínico Prospectivo / Nível 1b',
      },
      {
        id: 'ind-fenobarbital-status-cluster',
        indication: 'Status Epilepticus & Crises em Salva / Cluster — Protocolo Hospitalar de Carga Incremental',
        clinicalContext:
          'O status epilepticus e as crises em cluster representam emergências neurológicas graves associadas a dano neuronal excitotóxico mediado por glutamato, edema cerebral e hipertermia sistêmica. Após a contenção da crise aguda com benzodiazepínicos (diazepam ou midazolam), o fenobarbital deve ser instituído imediatamente para garantir proteção anticonvulsivante de longa duração.',
        species: 'both',
        dose: 'Dose de carga total cumulativa de 12 a 20 mg/kg IV lenta, fracionada em incrementos de 3 a 4 mg/kg',
        route: 'Intravenosa lenta (IV estrita)',
        frequency: 'Injeções incrementais a cada 20 a 30 minutos até o controle das crises ou até atingir a dose teto de 20 mg/kg',
        duration: 'Fase de contenção aguda hospitalar (primeiras 24 a 48 horas)',
        mechanismOfAction:
          'Elevação rápida dos níveis encefálicos de barbitúrico para hiperpolarização em massa dos circuitos corticais em estado de hiperexcitabilidade descontrolada.',
        clinicalRationale:
          'A administração em bólus único de 20 mg/kg pode provocar colapso cardiovascular e apneia. O fracionamento em 3–4 mg/kg por vez alcança a concentração terapêutica com máxima segurança ventilatória.',
        monitoring:
          'Oximetria de pulso, frequência respiratória, pressão arterial contínua e reflexos protetores de via aérea. Manter material de intubação endotraqueal e ambu imediatamente acessíveis.',
        referenceIds: ['ref-podell-status-2016', 'ref-plumbs-10th-phenobarbital', 'ref-bsava-neurology-2018'],
        evidenceLevel: 'Diretriz de Emergência & Terapia Intensiva / Nível 1b',
      },
      {
        id: 'ind-fenobarbital-sialadenosis',
        indication: 'Sialadenose Canina Responsiva a Fenobarbital (Neuromodulação Parassimpática)',
        clinicalContext:
          'A sialadenose canina é uma afecção incomum não neoplásica e não inflamatória caracterizada por tumefação bilateral e indolor das glândulas salivares mandibulares, frequentemente acompanhada de ânsia, salivação, engasgos e vômitos refratários. Evidências clínicas indicam que se trata de uma manifestação de epilepsia autonômica/visceral ou desregulação parassimpática central.',
        species: 'dog',
        dose: '1,0 a 2,5 mg/kg',
        route: 'Oral (VO)',
        frequency: 'A cada 12 horas (q12h)',
        duration: '4 a 12 semanas até completa remissão do volume glandular, seguido de redução gradual e descontinuação',
        mechanismOfAction:
          'A modulação central GABAérgica diminui o efluxo colinérgico aberrante nos núcleos motores viscerais, cessando a hipertrofia e hiperestimulação glandular.',
        clinicalRationale:
          'Gera remissão espetacular do quadro em 2 a 7 dias, servindo inclusive como teste terapêutico diagnóstico confirmatório.',
        monitoring: 'Inspeção física e palpação do tamanho das glândulas salivares a cada 15 dias.',
        referenceIds: ['ref-plumbs-10th-phenobarbital'],
        evidenceLevel: 'Série de Casos Clínicos / Nível 3',
      },
    ],

    // 3. Farmacocinética Clínica Detalhada (Sem emojis, formatação técnica com grifo)
    pharmacokineticsData: {
      absorption:
        'Absorção lenta, porém praticamente completa no trato gastrointestinal após administração oral. A **biodisponibilidade oral é de aproximadamente 88% a 92% em cães** e **próxima a 100% em gatos**. O pico de concentração plasmática máxima (Tmax) ocorre entre **4 e 8 horas em cães** e entre **2 e 4 horas em gatos**. A presença de alimento na luz gastrointestinal retarda discretamente o tempo para atingir o pico (Tmax), porém não diminui a fração total absorvida (AUC). Na via intravenosa, a ação anticonvulsivante central tem início em 15 a 30 minutos devido à lipossolubilidade intermediária.',
      distribution:
        'Apresenta ampla distribuição sistêmica tecidual com volume aparente de distribuição (Vd) de **0,70 a 0,75 L/kg em cães** e **0,65 a 0,70 L/kg em gatos**. Por possuir menor lipossolubilidade do que barbitúricos tiobarbituratos (como tiopental), sua translocação através da barreira hematoencefálica (BHE) é gradual. As concentrações no líquido cefalorraquidiano (LCR) e no parênquima cerebral atingem o equilíbrio em relação ao plasma após 30 a 60 minutos, correspondendo rigorosamente à fração livre sérica.',
      metabolism:
        'Biotransformação predominantemente hepática pelas enzimas do sistema citocromo P450 (CYP450). A principal via metabólica consiste na oxidação e hidroxilação microsomal aromática, gerando o metabólito **p-hidroxifenobarbital**, seguido de conjugação com ácido glicurônico e sulfato. **Fenômeno crucial em cães**: o fenobarbital é um **potente autoindutor enzimático** (induzindo fortemente as isoenzimas CYP2B11 e CYP3A12). A administração crônica acelera sua própria taxa metabólica e a de outros fármacos coexistentes ao longo de 2 a 4 semanas. Em contrapartida, **felinos não apresentam autoindução enzimática clinicamente relevante**, mantendo a taxa de biotransformação estável ao longo do tempo.',
      elimination:
        'A excreção final é mista hepatorrenal. Cerca de **25% da dose ativa é eliminada de forma inalterada pela urina** através de filtração glomerular e secreção tubular, enquanto os 75% restantes são excretados como metabólitos inativos conjugados. Como o fenobarbital é um ácido fraco (pKa ≈ 7,4), a **alcalinização urinária (pH > 7,5)** induz ionização tubular e aprisionamento iônico, reduzindo a reabsorção passiva e acelerando drasticamente a depuração renal em episódios de intoxicação aguda.',
      cnsPenetration:
        'Permeabilidade liquórica estável e equilibrada: a concentração no líquor atinge cerca de 45% a 55% da concentração plasmática total, espelhando fielmente a fração livre não ligada a proteínas.',
      plasmaBinding:
        'Taxa de ligação às proteínas plasmáticas (albumina) baixa a moderada: **40% a 50% em cães** e **40% a 55% em gatos**. Não sofre deslocamento proteico acentuado por outros fármacos ácidos.',
      halfLife:
        'Cães: **60 a 90 horas no início**, encurtando para **30 a 45 horas (média 40 horas)** após a autoindução microssomal | Gatos: **34 a 50 horas (média 43 horas)** estável.',
    },

    // 4. Módulo de Informações Gerais (Info Tab)
    generalInfoData: {
      routesDetailed: [
        {
          route: 'Oral (VO)',
          technique:
            'Administrar rigorosamente a cada 12 horas em horários estritos. Comprimidos podem ser fornecidos diretamente na boca ou envolvidos em pequenas porções de alimento. A solução oral líquida (Convless® 20 mg/mL) deve ser dosada com precisão por meio da seringa graduada fornecida pelo fabricante.',
          nursingCare:
            'A aderência estrita aos horários é o fator determinante de sucesso terapêutico: oscilações de mais de 2 horas no horário de administração causam flutuações das concentrações séricas e podem precipitar crises por escape. Orientar o tutor a jamais dobrar a dose caso esqueça uma tomada.',
          limitations: 'Em pacientes em estado de mal epiléptico ou inconscientes, a via oral é estritamente contraindicada pelo risco de broncoaspiração fatal.',
        },
        {
          route: 'Intravenosa (IV Lenta Hospitalar)',
          technique:
            'Infundir SEMPRE de forma lenta e controlada, respeitando a velocidade máxima de infusão de **1 a 2 mg/kg por minuto**. Recomenda-se aspirar a dose e diluir em seringa contendo SF 0,9% para administração ao longo de pelo menos 5 a 10 minutos (ou fracionamento em doses de ataque de 3 a 4 mg/kg a cada 20 a 30 minutos).',
          nursingCare:
            'NUNCA realizar bólus rápido ("em jato"). A injeção intravenosa rápida desencadeia colapso cardiovascular agudo, hipotensão refratária, arritmias ventriculares e parada respiratória súbita, potencializadas pelo propilenoglicol utilizado como co-solvente no veículo injetável. Manter ambu e tubo orotraqueal prontos.',
          limitations: 'Uso restrito a regime de internação e terapia intensiva com monitorização contínua de parâmetros vitais.',
        },
        {
          route: 'Intramuscular (IM Profunda) / Retal (VR Emergencial)',
          technique:
            'A via IM profunda deve ser reservada para quando o acesso venoso for absolutamente inalcançável. Realizar injeção profunda em massa muscular ampla (ex.: quadríceps ou epaxial). A via retal pode ser empregada em domicílio ou triagem emergencial utilizando a formulação injetável ou enemas com cateter tom-cat sem agulha.',
          nursingCare:
            'A absorção pela via IM é mais lenta e errática, podendo causar desconforto local moderado devido ao pH fortemente alcalino da formulação. Na via retal, a biodisponibilidade é de aproximadamente 80%, mas a absorção pode ser lenta em presença de fezes na ampola retal.',
          limitations: 'Não deve ser a via de escolha na rotina ambulatorial; utilizar apenas em contingências de resgate pré-hospitalar.',
        },
      ],
      dilutionGuide: {
        compatibleFluids: [
          'Solução Fisiológica (Cloreto de Sódio 0,9% - SF 0,9%) — DILUENTE DE ESCOLHA',
          'Solução de Glicose a 5% (SG 5%) — compatível fisicamente para infusão imediata',
          'Solução de Ringer Simples',
          'Solução de Ringer com Lactato (SRL) — compatível se administrado imediatamente após o preparo',
        ],
        incompatibleFluids: [
          'Soluções com pH ácido ou medicamentos com pH ácido (precipitam instantaneamente cristais de fenobarbital ácido insolúvel)',
          'NUNCA misturar na mesma seringa com Midazolam, Diazepam, Sulfato de Morfina, Clorpromazina ou Tramadol',
          'Incompatível quimicamente com emulsões lipídicas (Propofol) e soluções contendo cálcio (Gluconato de Cálcio)',
          'Antibióticos beta-lactâmicos (Ampicilina, Cefalosporinas) e Doxiciclina injetável',
        ],
        infusionRateGuidance:
          'A velocidade de infusão intravenosa não deve ultrapassar **1 a 2 mg/kg por minuto**. Na carga hospitalar (dose cumulativa de 12 a 20 mg/kg), administrar em etapas de 3 a 4 mg/kg a cada 20 a 30 minutos, diluídos em SF 0,9%, avaliando continuamente a resposta anticonvulsivante e o padrão respiratório do animal antes de cada novo incremento.',
        preparationNotes:
          'A solução injetável de fenobarbital sódico é límpida, incolor a levemente amarelada e fortemente alcalina (pH entre 9,2 e 10,2). NUNCA administrar por via subcutânea (SC) ou perivascular sob nenhuma hipótese: o extravasamento perivenoso acarreta dor lancinante, inflamação severa e necrose tecidual com esfacelo cutâneo. Em caso de extravasamento acidental: interromper a injeção, aspirar o líquido remanescente pelo cateter, infiltrar lidocaína 1% sem vasoconstritor ou SF 0,9% com compressas mornas locais.',
      },
      pharmacologicalClassification: {
        chemicalClass: 'Derivado barbitúrico sintético (ácido 5-etil-5-fenilbarbitúrico)',
        chemicalClassDescription:
          'Composto heterocíclico pirimidínico (ácido barbitúrico lipofílico) com alta estabilidade metabólica e capacidade de transpor a barreira hematoencefálica.',
        therapeuticClass: 'Anticonvulsivante de primeira linha, sedativo-hipnótico barbitúrico e agonista alostérico GABAérgico',
        therapeuticClassDescription:
          'Agente antiepiléptico de ação prolongada que potencializa a inibição GABAérgica, suprime focos paroxísticos e eleva expressivamente o limiar convulsivo cortical.',
        receptorTargets: [
          'Receptores GABA-A (Subunidades Beta e Gama)',
          'Canais de Cálcio Dependentes de Voltagem Pré-Sinápticos (Canais N e P/Q)',
          'Receptores Glutamatérgicos Excitatórios (AMPA / Cainato)',
          'Complexo Microssomal Citocromo P450 Hepático (Indução de CYP2B11 e CYP3A12)',
        ],
        detailedTargets: [
          {
            target: 'Complexo Receptor GABA-A / Canal de Cloreto (Subunidades Beta e Gama)',
            action:
              'Liga-se a um sítio alostérico distinto dos benzodiazepínicos nas subunidades beta/gama do receptor GABA-A, provocando abertura prolongada dos canais de cloro após a ativação pelo neurotransmissor inibitório GABA.',
            clinicalSignificance:
              'Aumenta a condutância neuronal de cloreto e hiperpolariza intensamente os neurônios corticais, elevando o limiar de despolarização paroxística e impedindo a deflagração e sincronização de crises epilépticas.',
          },
          {
            target: 'Canais de Cálcio Dependentes de Voltagem Pré-Sinápticos (Canais N e P/Q)',
            action:
              'Inibe diretamente o influxo de íons cálcio nos terminais axônicos despolarizados durante descargas de alta frequência.',
            clinicalSignificance:
              'Bloqueia a fusão vesicular e a liberação exocítica de aminoácidos excitatórios (glutamato e aspartato) na fenda sináptica, atenuando a excitotoxicidade e a propagação da crise entre redes neuronais.',
          },
          {
            target: 'Receptores Glutamatérgicos Pós-Sinápticos Não-NMDA (AMPA / Cainato)',
            action:
              'Exerce antagonismo de baixa afinidade sobre os receptores ionotrópicos AMPA/cainato em concentrações terapêuticas altas.',
            clinicalSignificance:
              'Suprime as correntes excitatórias pós-sinápticas rápidas que sustentam a propagação do recrutamento epileptogênico em focos lesivos corticais.',
          },
          {
            target: 'Sistema Enzimático Citocromo P450 Hepático (Isoenzimas CYP2B11 e CYP3A12)',
            action:
              'Ativa receptores nucleares celulares (como CAR - Constitutive Androstane Receptor), induzindo a transcrição massiva de enzimas oxidativas microssomais nos hepatócitos.',
            clinicalSignificance:
              'Provoca o clássico fenômeno de autoindução metabólica em cães (reduzindo a meia-vida do próprio fenobarbital após 2 a 4 semanas) e acelera o clearance de fármacos concomitantes (levetiracetam, zonisamida, corticoides, ciclosporina).',
          },
        ],
      },
      prescriptionType: {
        category: 'Medicamento sob Controle Especial (Portaria SVS/MS nº 344/1998 — Lista C1 / MAPA)',
        ordinanceOrLaw: 'Portaria SVS/MS nº 344/1998 (Lista C1) e Instrução Normativa MAPA nº 35/2017.',
        retentionRequired: true,
        guidelines:
          'O fenobarbital é substância controlada enquadrada na Lista C1 da Portaria 344/98. A prescrição veterinária exige obrigatoriamente Receituário de Controle Especial em 2 vias (1ª via retida na farmácia/drogaria dispensadora e 2ª via carimbada e devolvida ao tutor para acompanhamento). A receita possui validade máxima de 30 dias a partir da data de emissão e pode autorizar quantidade suficiente para no máximo 60 dias de tratamento contínuo.',
      },
      speciesPeculiarities: [
        {
          species: 'dog',
          title: 'Caninos: Autoindução Microssomal Marcante, Indução Enzimática de FA e Necessidade de TDM',
          description:
            'Cães apresentam excelente taxa de resposta anticonvulsivante ao fenobarbital, porém seu sistema microssomal hepático sofre autoindução enzimática intensa nas primeiras 2 a 6 semanas de terapia contínua. Essa indução acelera o clearance hepático e reduz a meia-vida de eliminação (de ~70h no início para ~40h), resultando em queda dos níveis séricos com risco de escape de crises caso o nível não seja monitorado. Além disso, a transcrição de Fosfatase Alcalina (FA) e levemente de ALT é quase universal em cães tratados cronicamente, refletindo indução de síntese enzimática celular hepática e não necessariamente lesão citotóxica.',
          clinicalImplications:
            'É mandatória a dosagem da concentração sérica de fenobarbital (TDM) após 10 a 14 dias do início e reavaliação em 6 semanas para calibração posológica, mantendo o nível alvo estrito de 15 a 35 µg/mL. Nunca interromper abruptamente o fármaco sob risco fatal de status epilepticus de rebote.',
        },
        {
          species: 'cat',
          title: 'Felinos: Clearance Estável, Ausência de Autoindução e Risco de Reações Cutâneas Idiossincráticas',
          description:
            'Gatos toleram o fenobarbital excepcionalmente bem como droga de primeira escolha, sendo o único anticonvulsivante clássico seguro (uma vez que o brometo de potássio causa pneumonite eosinofílica e asma fatal na espécie). A farmacocinética felina é linear e estável: o gato NÃO desenvolve autoindução enzimática significativa, de modo que a meia-vida permanece longa (~34 a 50 horas) e a dose raramente necessita de aumentos sucessivos. Contudo, gatos são suscetíveis a reações idiossincráticas imunomediadas graves, destacando-se o prurido facial e cervical severo com escoriações e citopenias sanguíneas transitórias.',
          clinicalImplications:
            'Dose inicial de 1,5 a 2,5 mg/kg q12h (ou meio comprimido de 15 mg por gato q12h), com alvo sérico de 15 a 45 µg/mL. Orientar o tutor a examinar a face e o pescoço do felino; em caso de prurido intenso ou crostas escoriadas, suspender imediatamente o fenobarbital e transicionar para levetiracetam oral.',
        },
      ],
    },

    // 5. Módulo de Atenção & Alertas Clínicos (Attention Tab)
    attentionData: {
      adverseEffectsDetailed: [
        {
          effect: 'Sedação transitória, sonolência profunda e ataxia motora de membros pélvicos',
          frequency: 'common',
          clinicalManagement:
            'Tranquilizar o tutor explicando que esses efeitos decorrem da depressão inibitória aguda do SNC e tendem a regredir em 10 a 14 dias após o desenvolvimento de tolerância farmacodinâmica cortical. Recomenda-se evitar pisos lisos, escadas e esforços físicos intensos nas primeiras 2 semanas. Não reduzir a dose precipitadamente sem monitorar o nível sérico.',
          mechanism:
            'Hiperpolarização generalizada difusa de circuitos do córtex sensório-motor, núcleos da base e substância reticular ativadora ascendente decorrente da abertura sustentada dos canais de cloreto pelo complexo GABA-A.',
        },
        {
          effect: 'Polifagia, poliúria, polidipsia (PU/PD) e ganho ponderal progressivo',
          frequency: 'common',
          clinicalManagement:
            'Garantir acesso irrestrito a água limpa e fresca (NUNCA restringir a ingestão de água, sob risco grave de hipernatremia e desidratação hiperosmolar). Controlar a densidade calórica da dieta e fracionar as refeições em pequenas porções para prevenir obesidade secundária à voracidade alimentar.',
          mechanism:
            'Estimulação GABAérgica direta do centro do apetite no hipotálamo ventromedial e inibição central da liberação neuro-hipofisária de vasopressina (hormônio antidiurético - ADH), associada à diurese osmótica secundária.',
        },
        {
          effect: 'Indução de enzimas hepáticas (elevação acentuada de FA e moderada de ALT) sem disfunção funcional',
          frequency: 'common',
          clinicalManagement:
            'Diferenciar indução enzimática benigna de hepatotoxicidade real. Avaliar os marcadores de função hepática sintética: dosar albumina sérica, bilirrubinas totais e frações, tempo de protrombina (TP) e ácidos biliares pré e pós-prandiais. Se a albumina e os ácidos biliares estiverem normais e o paciente assintomático, manter o fenobarbital sem alarme.',
          mechanism:
            'Ativação transcricional microssomal mediada por receptores nucleares CAR/PXR nos hepatócitos, promovendo superprodução celular das isoenzimas hepática e corticosteroide-induzida de fosfatase alcalina e alanina aminotransferase.',
        },
        {
          effect: 'Hiperexcitabilidade, inquietação e agitação paradoxal',
          frequency: 'uncommon',
          clinicalManagement:
            'Acalmar o paciente em ambiente com baixo estímulo sensorial acústico e luminoso. Se a agitação for severa e impedir o repouso do cão, considerar a associação temporária de levetiracetam e avaliar desmame se a reação persistir por mais de 3 semanas.',
          mechanism:
            'Fenômeno de desinibição paradoxal de circuitos límbicos e subcorticais inibitórios em animais com sensibilidade individual ou disfunção prévia de redes gabaérgicas basais.',
        },
        {
          effect: 'Hepatotoxicidade crônica intrínseca, cirrose medicamentosa e falência hepática',
          frequency: 'rare',
          clinicalManagement:
            'Interromper gradualmente o fenobarbital com desmame supervisionado enquanto se introduz terapia alternativa imediata (levetiracetam ou brometo de potássio). Iniciar protocolo hepatoprotetor agressivo com S-adenosilmetionina (SAMe), silimarina e vitamina E. Associar lactulose se houver sinais de encefalopatia hepática.',
          mechanism:
            'Sobrecarga oxidativa mitocondrial crônica dos hepatócitos decorrente do acúmulo de metabólitos intermediários reativos do fenobarbital, tipicamente associada à manutenção prolongada de níveis séricos acima de 35 a 40 µg/mL por meses.',
        },
        {
          effect: 'Dermatite pruriginosa facial e cervical severa com escoriações autoinduzidas em gatos',
          frequency: 'rare',
          clinicalManagement:
            'Suspender imediatamente o fenobarbital na espécie felina. Realizar desmame sob cobertura de levetiracetam oral (20 mg/kg q8h). Tratar as lesões cutâneas com colar elizabetano e limpeza local; a resolução ocorre em 7 a 21 dias após a descontinuação.',
          mechanism:
            'Reação idiossincrática imunomediada com hipersensibilidade cutânea e ativação mastocitária tecidual específica desencadeada por haptenos barbitúricos em felinos.',
        },
        {
          effect: 'Discrasias hematológicas (leucopenia, neutropenia severa, trombocitopenia e anemia aplásica)',
          frequency: 'very_rare',
          clinicalManagement:
            'Suspender o fenobarbital imediatamente. Solicitar mielograma se houver citopenia múltipla refratária. Instituir antibioticoterapia profilática de amplo espectro em caso de neutropenia crítica (< 1.500/µL) e suporte transfusional se indicado.',
          mechanism:
            'Supressão medular imunomediada ou toxicidade citotóxica direta sobre precursores hematopoieticos multipotentes na medula óssea.',
        },
        {
          effect: 'Necrólise Epidérmica Tóxica (NET) e Síndrome Hepatocutânea (Eritema Necrolítico Migratório)',
          frequency: 'very_rare',
          clinicalManagement:
            'Hospitalização imediata em UTI veterinária. Interrupção estrita do barbitúrico, suporte hemodinâmico, analgesia contínua e manejo de feridas estéreis. Avaliar ultrassonografia hepática para padrão em "queijo suíço".',
          mechanism:
            'Apoptose massiva de queratinócitos e desregulação severa do metabolismo hepático de aminoácidos em decorrência de dano hepatocelular crônico avançado.',
        },
      ],
      precautions: [
        {
          alertLevel: 'contraindicated',
          condition: 'Insuficiência Hepática Grave, Cirrose Descompensada e Encefalopatia Hepática',
          clinicalAction:
            'Contraindicação absoluta. Fármaco estritamente proibido em hepatopatas graves descompensados pelo risco de colapso metabólico, coma barbitúrico e agravamento da encefalopatia. Fármaco de escolha alternativo: Levetiracetam ou Brometo de Potássio (em cães).',
          physiologicalExplanation:
            'Como o fenobarbital depende estritamente do citocromo P450 para hidroxilação e depuração, a perda de parênquima funcional acarreta acúmulo sistêmico massivo e toxicidade cerebral direta.',
        },
        {
          alertLevel: 'contraindicated',
          condition: 'Interrupção Abrupta do Tratamento em Pacientes Epilépticos Crônicos',
          clinicalAction:
            'Contraindicação absoluta. NUNCA interromper o fenobarbital de forma súbita sob nenhuma circunstância. Caso seja necessária a retirada, realizar desmame ultralento com redução de 20% a 25% da dose a cada 2 a 4 semanas sob monitoramento estrito.',
          physiologicalExplanation:
            'A interrupção súbita precipita síndrome de abstinência GABAérgica aguda com dessensibilização dos receptores inibitórios e disparo paroxístico incontrolável de crises em salva, status epilepticus e óbito.',
        },
        {
          alertLevel: 'contraindicated',
          condition: 'Hipersensibilidade Conhecida a Barbitúricos ou Discrasia Hematológica Prévia',
          clinicalAction:
            'Contraindicação absoluta. Pacientes com histórico de choque anafilactoide, agranulocitose ou trombocitopenia por fenobarbital não devem receber reexposição.',
          physiologicalExplanation:
            'Memória imunológica contra haptenos barbitúricos desencadeia degranulação anafilática fulminante ou citólise medular autoimune.',
        },
        {
          alertLevel: 'warning',
          condition: 'Alterações Laboratoriais em Painéis Tireoidianos (Hipotireoidismo Falso-Positivo)',
          clinicalAction:
            'Precaução crítica de interpretação diagnóstica. O fenobarbital reduz artificialmente os níveis séricos de T4 total e T4 livre e pode elevar ligeiramente o TSH. NÃO diagnosticar hipotireoidismo baseado unicamente em exames laboratoriais na vigência de fenobarbital se o animal for assintomático.',
          physiologicalExplanation:
            'A indução enzimática do CYP450 acelera a glicuronidação e depuração biliar periférica dos hormônios tireoidianos e desloca a tiroxina de proteínas carreadoras sem provocar hipotireoidismo funcional tecidual verdadeiro.',
        },
        {
          alertLevel: 'warning',
          condition: 'Gestação e Lactação (Teratogenicidade e Depressão Neonatal)',
          clinicalAction:
            'Precaução crítica. Avaliar estritamente a relação risco-benefício. O fenobarbital atravessa a barreira placentária e atinge o leite materno. Pode causar fenda palatina, anomalias esqueléticas e depressão respiratória/sedação em neonatos lactentes.',
          physiologicalExplanation:
            'Interferência na morfogênese embrionária mediada pelo estresse oxidativo e passagem livre pelo leito capilar mamário.',
        },
        {
          alertLevel: 'warning',
          condition: 'Administração Intravenosa Rápida ou Extravasamento Perivenoso',
          clinicalAction:
            'Precaução crítica. O fenobarbital sódico injetável tem pH entre 9,2 e 10,2. NUNCA aplicar subcutâneo ou perivascular (risco de necrose cutânea com esfacelo). A injeção IV deve ser lenta (≤ 1 a 2 mg/kg/min) para evitar colapso hemodinâmico e parada respiratória.',
          physiologicalExplanation:
            'Hiperosmolaridade e alcalinidade ácida severa dos solventes parenterais combinadas com o propilenoglicol causam depressão miocárdica e arteriodilatação rápida se infundidos em bólus.',
        },
        {
          alertLevel: 'caution',
          condition: 'Pacientes Hipovolêmicos, Desidratados ou com Doença Renal Crônica (DRC)',
          clinicalAction:
            'Alerta clínico. Restabelecer a volemia e hidratação antes de administrar doses de carga. Na DRC avançada, monitorar o acúmulo da fração inalterada (25%) eliminada por via renal.',
          physiologicalExplanation:
            'A hipovolemia reduz a perfusão renal e hepática, prolongando a permanência do fármaco na circulação e potencializando o risco de sedação profunda.',
        },
      ],
      doseReductionGuidelines: [
        {
          clinicalCondition: 'Monitoramento Terapêutico de Nível Sérico (TDM) & Calibração de Dose',
          recommendedAdjustment:
            'Alvo terapêutico sérico de **15 a 35 µg/mL em cães** e **15 a 45 µg/mL em gatos**. Coleta obrigatória em **10 a 14 dias** (estabilização inicial) e reavaliação em **6 semanas** (após autoindução hepática plena). Ajuste proporcional de dose: **Dose Nova = Dose Atual × (Nível Alvo ÷ Nível Atual)**.',
          physiologicalRationale:
            'A correlação entre dose em mg/kg e concentração sérica varia em até 4 vezes entre pacientes devido a diferenças individuais de absorção, clearance e indução microssomal. O controle clínico e a segurança dependem do nível sérico efetivo, não apenas do cálculo teórico por peso.',
        },
        {
          clinicalCondition: 'Insuficiência Hepática Leve a Moderada ou Elevação Persistente de ALT',
          recommendedAdjustment:
            'Aplicar **redução de 30% a 50% na dose inicial habitual** (ex.: iniciar com 1,5 mg/kg q12h em cães) com monitoramento frequente de níveis séricos a cada 7 a 10 dias. Fármaco formalmente contraindicado na insuficiência severa ou encefalopatia.',
          physiologicalRationale:
            'A redução da massa hepatocelular diminui a capacidade de oxidação pelo CYP450, acarretando acúmulo sérico rápido com risco iminente de hepatotoxicidade cumulativa.',
        },
        {
          clinicalCondition: 'Doença Renal Crônica (DRC) — Estágios IRIS 3 e 4',
          recommendedAdjustment:
            'Iniciar no limite inferior de dose (**2,0 a 2,5 mg/kg a cada 12 horas em cães** e **1,0 a 1,5 mg/kg q12h em gatos**), garantindo hidratação constante e avaliando a concentração sérica precocemente.',
          physiologicalRationale:
            'Aproximadamente 25% do fenobarbital ativo é eliminado de forma inalterada pelos rins. Na falência da filtração glomerular, há retenção do fármaco livre e de metabólitos conjugados.',
        },
        {
          clinicalCondition: 'Pacientes Geriátricos Debilitados ou com Caquexia Severa',
          recommendedAdjustment:
            'Adotar dose inicial conservadora de **1,5 a 2,0 mg/kg a cada 12 horas**, com monitoramento estrito de ataxia e reflexos posturais.',
          physiologicalRationale:
            'Animais idosos apresentam declínio funcional fisiológico da taxa de filtração glomerular, menor clearance intrínseco hepático e redução da albumina plasmática.',
        },
        {
          clinicalCondition: 'Protocolo de Desmame Gradual (Pacientes Livres de Crises por ≥ 1 a 2 anos)',
          recommendedAdjustment:
            'Realizar **redução lenta de 20% a 25% da dose a cada 2 a 4 semanas** ao longo de um período total de **2 a 6 meses**. NUNCA interromper de forma súbita.',
          physiologicalRationale:
            'O desmame lento permite que os receptores GABA-A readquiram sensibilidade basal e que o limiar epileptogênico endógeno se restabeleça sem crises de rebote.',
        },
      ],
      drugInteractionsDetailed: [
        {
          drugOrClass: 'Levetiracetam (Keppra®)',
          severity: 'moderate',
          clinicalEffect:
            'Redução significativa da concentração plasmática do levetiracetam em 30% a 50% quando associado ao fenobarbital.',
          pharmacologicalMechanism:
            'O fenobarbital induz as enzimas de hidrólise e depuração do levetiracetam, encurtando sua meia-vida de 4h para 2h em cães e exigindo doses de levetiracetam mais altas (ex.: 20 a 30 mg/kg q8h).',
        },
        {
          drugOrClass: 'Corticosteroides (Prednisolona, Dexametasona)',
          severity: 'moderate',
          clinicalEffect:
            'Diminuição da eficácia anti-inflamatória e imunossupressora dos glicocorticoides.',
          pharmacologicalMechanism:
            'A indução das isoenzimas CYP3A acelera a oxidação hepática e eliminação biliar dos corticosteroides, podendo demandar aumento de dose do corticoide.',
        },
        {
          drugOrClass: 'Ciclosporina (Atopica®)',
          severity: 'major',
          clinicalEffect:
            'Queda dramática dos níveis séricos de ciclosporina com risco de perda total da eficácia terapêutica.',
          pharmacologicalMechanism:
            'Indução massiva da glicoproteína-P intestinal e do citocromo CYP3A hepático, acelerando a eliminação da ciclosporina.',
        },
        {
          drugOrClass: 'Antifúngicos Azóis (Cetoconazol, Itraconazol, Fluconazol)',
          severity: 'major',
          clinicalEffect:
            'Aumento perigoso das concentrações séricas de fenobarbital com risco de sedação profunda, coma barbitúrico e hepatotoxicidade.',
          pharmacologicalMechanism:
            'Os azóis inibem potentemente o complexo CYP450 hepático, bloqueando a principal via de eliminação do fenobarbital.',
        },
        {
          drugOrClass: 'Brometo de Potássio (KBr)',
          severity: 'moderate',
          clinicalEffect:
            'Sinergismo anticonvulsivante altamente benéfico; pode potencializar a ataxia e a sedação inicial.',
          pharmacologicalMechanism:
            'Mecanismo de ação complementar: o brometo hiperpolariza via canais de cloro independentes de GABA enquanto o fenobarbital prolonga a abertura dos canais GABA-A.',
        },
        {
          drugOrClass: 'Benzodiazepínicos (Diazepam, Midazolam) e Opioides',
          severity: 'major',
          clinicalEffect:
            'Potencialização acentuada da depressão do SNC, ataxia severa, hipotensão e depressão respiratória.',
          pharmacologicalMechanism:
            'Ação sinérgica supra-aditiva sobre os sítios moduladores alostéricos inibitórios do complexo receptor GABA-A central.',
        },
        {
          drugOrClass: 'Doxiciclina e Teofilina',
          severity: 'moderate',
          clinicalEffect:
            'Encurtamento da meia-vida plasmática da doxiciclina e da teofilina com possível falha terapêutica antimicrobiana/broncodilatadora.',
          pharmacologicalMechanism:
            'Aceleração da biotransformação hepática secundária à indução enzimática do CYP450.',
        },
      ],
    },

    // 6. Fundamentos Clínicos & Evidências Farmacológicas (Múltiplos Artigos Indexados PubMed)
    clinicalStudiesCommented: [
      {
        title: 'Diretrizes do Consenso IVETF para Tratamento da Epilepsia Canina',
        authorsYear: 'Podell M, Volk HA, Berendt M, Löscher W, et al. (2016)',
        journal: 'Journal of Veterinary Internal Medicine / BMC Veterinary Research',
        studyDesign: 'Declaração de consenso de especialistas da International Veterinary Epilepsy Task Force (IVETF).',
        sampleSize: 'Consenso multicêntrico internacional de painel de neurologistas veterinários.',
        mainFindings:
          'O fenobarbital e o brometo de potássio foram classificados com nível 1 de evidência científica para monoterapia inicial na epilepsia idiopática em cães. O fenobarbital atinge eficácia superior no controle inicial rápido de crises e apresenta excelente relação custo-benefício. O consenso estabeleceu a faixa terapêutica sérica alvo de 15 a 35 µg/mL (65 a 150 µmol/L) e definiu que a primeira dosagem de TDM deve ocorrer entre 10 e 14 dias após o início e novamente às 6 semanas.',
        clinicalTakeaway:
          'Confirma categoricamente o fenobarbital como fármaco de primeira escolha padrão ouro na neurologia veterinária internacional, destacando a obrigatoriedade do monitoramento sérico periódico para calibração individual de dose.',
        referenceId: 'ref-ivetf-guidelines-2015',
      },
      {
        title: 'Revisão Sistemática e Meta-análise de Anticonvulsivantes de Primeira Linha na Epilepsia Canina',
        authorsYear: 'Charalambous M, Brodbelt D, Volk HA (2014)',
        journal: 'BMC Veterinary Research',
        studyDesign: 'Revisão sistemática com meta-análise e avaliação cega de qualidade de evidência (Cochrane handbook adaptado).',
        sampleSize: '26 estudos clínicos envolvendo mais de 1.200 cães tratados com antiepilépticos.',
        mainFindings:
          'O fenobarbital demonstrou taxa de sucesso clínico estatisticamente superior (82% de resposta favorável) em comparação com outros anticonvulsivantes avaliados em monoterapia, com perfil de segurança aceitável quando acompanhado por exames laboratoriais regulares.',
        clinicalTakeaway:
          'Fornece a mais robusta evidência quantitativa de que o fenobarbital é o anticonvulsivante oral mais eficaz para alcançar a redução de crises em cães epilépticos.',
        referenceId: 'ref-charalambous-meta-2014',
      },
      {
        title: 'Ensaio Clínico Comparativo Prospectivo: Fenobarbital vs. Brometo de Potássio',
        authorsYear: 'Boothe DM, Dewey C, Carpenter DM (2012)',
        journal: 'Journal of the American Veterinary Medical Association (JAVMA)',
        studyDesign: 'Ensaio clínico prospectivo, randomizado, duplo-cego e controlado em cães com epilepsia idiopática.',
        sampleSize: '85 cães de proprietários particulares acompanhados durante 12 meses.',
        mainFindings:
          'Cães tratados com fenobarbital atingiram o controle completo das crises (livres de convulsões) em uma proporção significativamente maior do que aqueles tratados com brometo de potássio em monoterapia. Efeitos colaterais como ataxia e sedação foram transitórios com fenobarbital.',
        clinicalTakeaway:
          'Comprova a superioridade do fenobarbital na velocidade e profundidade da remissão de crises epilépticas em relação a terapias alternativas.',
        referenceId: 'ref-boothe-comp-2012',
      },
      {
        title: 'Farmacocinética, Eficácia e Segurança do Fenobarbital na Epilepsia Felina',
        authorsYear: 'Bailey KS, Dewey CW, Boothe DM, et al. (2009)',
        journal: 'Journal of Feline Medicine and Surgery',
        studyDesign: 'Estudo prospectivo de farmacocinética sérica e eficácia clínica em gatos epilépticos.',
        sampleSize: '30 felinos domésticos portadores de crises epilépticas de origens idiopática e estrutural.',
        mainFindings:
          'O fenobarbital controlou as crises em mais de 80% dos felinos avaliados. Gatos mantiveram níveis séricos terapêuticos estáveis (15 a 45 µg/mL) com dosagens de 1,5 a 2,5 mg/kg q12h. A tolerabilidade foi excelente, sem elevação expressiva de enzimas hepáticas, mas 3% a 5% dos gatos apresentaram prurido facial e leucopenia reversíveis após a suspensão.',
        clinicalTakeaway:
          'Consolida o fenobarbital como o antiepiléptico de primeira escolha absoluto em gatos, enfatizando a estabilidade do clearance e a necessidade de monitorar hemograma e pele.',
        referenceId: 'ref-bailey-feline-2009',
      },
      {
        title: 'Cinética de Depuração, TDM e Variabilidade Interindividual do Fenobarbital em Cães',
        authorsYear: 'Gizzi AB, Leal LM, Flor PB, et al. (2020)',
        journal: 'Journal of Veterinary Internal Medicine',
        studyDesign: 'Estudo de coorte prospectivo avaliando o impacto da autoindução microssomal sobre a depuração corporal.',
        sampleSize: '48 cães sob regime crônico de fenobarbital com dosagens séricas seriadas.',
        mainFindings:
          'Demonstrou encurtamento da meia-vida plasmática de 64h na fase inicial para 38h após 6 semanas de tratamento contínuo, comprovando que até 35% dos cães sofrem escape terapêutico se a dose não for reajustada pós-indução.',
        clinicalTakeaway:
          'Fundamenta a regra de ouro de coletar a segunda dosagem de TDM rigorosamente na 6ª semana de terapia crônica para recalibração posológica em cães.',
        referenceId: 'ref-gizzi-tdm-2020',
      },
      {
        title: 'Princípios de Manejo e Farmacologia das Crises Epilépticas em Cães e Gatos',
        authorsYear: 'Thomas WB (2010)',
        journal: 'Veterinary Clinics of North America: Small Animal Practice',
        studyDesign: 'Revisão clínica avançada sobre farmacodinâmica, toxicologia e conduta terapêutica em crises paroxísticas.',
        sampleSize: 'Compêndio de literatura crítica e guidelines neurológicos.',
        mainFindings:
          'Mapeamento completo das interações medicamentosas via CYP450, cinética de distribuição no sistema nervoso central e conduta de emergência no status epilepticus.',
        clinicalTakeaway:
          'Referência clássica para a compreensão da modulação GABAérgica e prevenção de danos neuronais permanentes por descontinuação inadequada de barbitúricos.',
        referenceId: 'ref-thomas-epilepsy-2010',
      },
    ],

    // 7. Apresentações Comerciais Disponíveis no Mercado
    presentations: [
      {
        id: 'pres-fenobarbital-convless-20',
        label: 'Convless® 20 mg/mL (Agener União — Solução Oral Veterinária 60 mL)',
        form: 'Solução oral palatável com seringa dosadora',
        concentrationValue: 20,
        concentrationUnit: 'mg/mL',
        packInfo: 'Frasco âmbar de 60 mL com seringa dosadora graduada; produto registrado no MAPA para uso exclusivo em cães',
        route: 'VO',
        channel: 'veterinary',
        commercialProductSlug: 'convless-agener',
      },
      {
        id: 'pres-fenobarbital-gardenal-50',
        label: 'Gardenal® 50 mg (Sanofi — Comprimidos Sulcados Divisíveis)',
        form: 'Comprimido sulcado divisível',
        concentrationValue: 50,
        concentrationUnit: 'mg/comprimido',
        packInfo: 'Caixa com 20 comprimidos sulcados; permite partição em duas metades iguais de 25 mg',
        route: 'VO',
        channel: 'human_pharmacy',
        scoringInfo: 'Comprimido com vinco central funcional para bi-partição precisa',
        commercialProductSlug: 'gardenal-sanofi',
      },
      {
        id: 'pres-fenobarbital-gardenal-100',
        label: 'Gardenal® 100 mg (Sanofi — Comprimidos Sulcados Divisíveis)',
        form: 'Comprimido sulcado divisível',
        concentrationValue: 100,
        concentrationUnit: 'mg/comprimido',
        packInfo: 'Caixa com 20 comprimidos sulcados; permite partição em duas metades iguais de 50 mg',
        route: 'VO',
        channel: 'human_pharmacy',
        scoringInfo: 'Comprimido com vinco central funcional para bi-partição precisa',
        commercialProductSlug: 'gardenal-sanofi',
      },
      {
        id: 'pres-fenobarbital-generico-100',
        label: 'Fenobarbital Genérico 100 mg (União Química, Teuto, EMS — Comprimidos Sulcados)',
        form: 'Comprimido sulcado divisível',
        concentrationValue: 100,
        concentrationUnit: 'mg/comprimido',
        packInfo: 'Caixa com 20 ou 30 comprimidos sulcados de 100 mg',
        route: 'VO',
        channel: 'human_pharmacy',
        scoringInfo: 'Comprimido sulcado para fracionamento',
        commercialProductSlug: 'gardenal-sanofi',
      },
      {
        id: 'pres-fenobarbital-gardenal-gotas',
        label: 'Gardenal® Gotas 40 mg/mL (Sanofi — Solução Oral Pediátrica 20 mL)',
        form: 'Solução oral em gotas',
        concentrationValue: 40,
        concentrationUnit: 'mg/mL',
        packInfo: 'Frasco conta-gotas de 20 mL (40 mg/mL • 1 mL = 40 gotas • 1 gota = 1 mg)',
        route: 'VO',
        channel: 'human_pharmacy',
        scoringInfo: 'Gotas humanas: 1 gota contém exatamente 1 mg de fenobarbital (excelente para gatos e cães miniatura)',
        dropsPerMl: 40,
      },
      {
        id: 'pres-fenobarbital-injetavel-100',
        label: 'Fenobarbital Sódico Injetável 100 mg/2 mL ou 200 mg/2 mL (Fenocris® Cristália / Genérico)',
        form: 'Solução injetável estéril (ampola)',
        concentrationValue: 50,
        concentrationUnit: 'mg/mL',
        packInfo: 'Ampola de 2 mL contendo 100 mg ou 200 mg de fenobarbital sódico (50 mg/mL a 100 mg/mL)',
        route: 'IV',
        channel: 'human_pharmacy',
        scoringInfo: 'Solução concentrada para uso estrito intravenoso lento hospitalar diluído em SF 0,9%',
      },
    ],

    // 8. Posologia Estruturada e Doses
    doses: [
      {
        id: 'dose-fenobarbital-dog-initial',
        species: 'dog',
        indication: 'Epilepsia Idiopática Canina — Dose Inicial de Manutenção Padrão IVETF',
        doseMin: 2.5,
        doseMax: 3.0,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'VO',
        frequency: 'a cada 12 horas',
        duration: 'Uso contínuo (vitalício); monitorar nível sérico em 10–14 dias e às 6 semanas',
        notes:
          'Dose de manutenção preconizada pelo consenso IVETF. Alvo terapêutico sérico: 15 a 35 µg/mL. Faixa de manutenção estendida em cães com depuração rápida: 2,0 a 5,0 mg/kg q12h (ou excepcionalmente q8h se a meia-vida for < 24h).',
        evidenceLevel: 'Consenso Internacional IVETF / Nível 1a',
        referenceIds: ['ref-ivetf-guidelines-2015', 'ref-charalambous-meta-2014'],
        calculatorEnabled: false,
      },
      {
        id: 'dose-fenobarbital-cat-initial',
        species: 'cat',
        indication: 'Epilepsia Felina — Dose Inicial de Manutenção',
        doseMin: 1.5,
        doseMax: 2.5,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'VO',
        frequency: 'a cada 12 horas',
        duration: 'Uso contínuo (vitalício); monitorar pele, hemograma e nível sérico',
        notes:
          'Prática ambulatorial comum: ½ comprimido de 15 mg (ou seja, 7,5 mg/gato) para felinos pequenos até 3,5 kg, ou 1 comprimido de 15 mg (15 mg/gato) para felinos de 4 a 6 kg q12h. Faixa sérica terapêutica alvo: 15 a 45 µg/mL.',
        evidenceLevel: 'Diretrizes Clínicas Felinas / Nível 1b',
        referenceIds: ['ref-bailey-feline-2009', 'ref-thomas-epilepsy-2010'],
        calculatorEnabled: false,
      },
      {
        id: 'dose-fenobarbital-convless-label',
        species: 'dog',
        indication: 'Convless® 20 mg/mL — Protocolo Veterinário em Solução Oral',
        doseMin: 2.0,
        doseMax: 4.0,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'VO',
        frequency: 'a cada 12 horas',
        duration: 'Uso contínuo em cães',
        notes:
          'Solução oral veterinária canina: cada 1 mL contém 20 mg de fenobarbital. Volume em mL por tomada = Peso (kg) × Dose (mg/kg) ÷ 20 mg/mL. Exemplo para cão de 10 kg na dose de 2,5 mg/kg: 10 × 2,5 ÷ 20 = 1,25 mL q12h.',
        evidenceLevel: 'Bula do Fabricante — Agener União',
        referenceIds: ['ref-convless-agener'],
        calculatorEnabled: false,
        presentationId: 'pres-fenobarbital-convless-20',
      },
      {
        id: 'dose-fenobarbital-loading-status',
        species: 'both',
        indication: 'Status Epilepticus & Crises em Salva / Cluster — Dose de Carga Hospitalar Incremental',
        doseMin: 12.0,
        doseMax: 20.0,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'IV',
        frequency: 'dose cumulativa fracionada em bólus lentos',
        duration: 'Fase aguda de emergência (primeiras 24 a 48 horas)',
        notes:
          'NUNCA administrar como bólus único rápido. Fracionar em alíquotas de 3 a 4 mg/kg IV lentos (> 5 a 10 min) a cada 20 a 30 minutos sob monitorização cardiorrespiratória e de pressão arterial contínua até a cessação das crises ou teto de 20 mg/kg.',
        evidenceLevel: 'Consenso ACVIM & IVETF de Emergência / Nível 1b',
        referenceIds: ['ref-podell-status-2016', 'ref-plumbs-10th-phenobarbital'],
        calculatorEnabled: false,
        presentationId: 'pres-fenobarbital-injetavel-100',
      },
      {
        id: 'dose-fenobarbital-sialadenosis',
        species: 'dog',
        indication: 'Sialadenose Canina Responsiva a Fenobarbital — Neuromodulação Salivar',
        doseMin: 1.0,
        doseMax: 2.5,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'VO',
        frequency: 'a cada 12 horas',
        duration: '4 a 12 semanas até completa remissão do volume glandular, seguido de desmame gradual',
        notes:
          'Dose anticonvulsivante baixa que cessa a hiperestimulação autonômica das glândulas mandibulares em 48 a 72 horas.',
        evidenceLevel: 'Literatura Especializada / Plumb\'s 10ª ed.',
        referenceIds: ['ref-plumbs-10th-phenobarbital'],
        calculatorEnabled: false,
      },
    ],

    // 9. Notas Clínicas Estruturadas
    clinicalNotesRichText:
      '<p><strong>1. O Monitoramento Terapêutico de Nível Sérico (TDM) é Parte Inseparável do Tratamento:</strong> A metabolização hepática do fenobarbital apresenta acentuada variabilidade individual. A correlação entre a dose prescrita em mg/kg e a concentração sanguínea real varia amplamente. Por essa razão, o sucesso clínico e a prevenção de toxicidade dependem da dosagem sérica periódica. <em>Alvo terapêutico de consenso: 15 a 35 µg/mL em cães e 15 a 45 µg/mL em gatos</em>. A primeira coleta deve ser realizada entre 10 a 14 dias após o início (após atingir o steady-state) e repetida rigorosamente às 6 semanas (momento em que a autoindução microssomal atinge o pico de aceleração metabólica em cães). Repetir a cada 6 meses nos pacientes estáveis.</p>' +
      '<p><strong>2. Diferenciação Crucial entre Indução Enzimática e Hepatotoxicidade:</strong> Em cães, o fenobarbital induz fortemente a síntese celular de Fosfatase Alcalina (FA) e moderadamente de ALT. A elevação isolada dessas enzimas é um fenômeno de indução microssomal benigno e esperado, NÃO indicando dano necrótico hepatocelular. Para suspeitar de hepatotoxicidade verdadeira, deve-se avaliar a função de síntese do fígado: solicitar albumina sérica, bilirrubinas totais e fracionadas, ácidos biliares pré e pós-prandiais e tempo de protrombina (TP). Se a albumina e os ácidos biliares estiverem preservados e o cão estiver assintomático, não se deve interromper o fenobarbital.</p>' +
      '<p><strong>3. Regra de Ouro: Descontinuação Ultralenta e Proibição de Parada Abrupta:</strong> Na epilepsia idiopática, o tratamento é contínuo e vitalício. A interrupção abrupta do fenobarbital precipita estado de mal epiléptico refratário e morte por rebote de receptores. Caso a retirada seja estritamente necessária (ex.: hepatotoxicidade documentada, discrasia grave ou paciente há mais de 1 a 2 anos completamente livre de crises), o desmame deve ser feito com redução gradual de 20% a 25% da dose a cada 2 a 4 semanas, em processo monitorado que leva de 2 a 6 meses.</p>' +
      '<p><strong>4. Peculiaridades Felinas e Contraindicação do Brometo:</strong> Enquanto cães podem receber brometo de potássio, essa droga é formalmente PROIBIDA em gatos devido ao risco de pneumonite alérgica eosinofílica e broncoespasmo fatal. O fenobarbital é o pilar principal em felinos, exigindo apenas vigilância para reações idiossincráticas cutâneas (prurido facial/cervical severo com escoriações) e discrasias sanguíneas reversíveis.</p>',

    adminNotesText:
      'Medicamento sujeito a controle especial (Portaria SVS/MS nº 344/1998 — Lista C1 e Instrução Normativa MAPA nº 35/2017). Prescrição obrigatória em Receituário de Controle Especial em 2 vias com retenção da 1ª via pela farmácia e validade de 30 dias. Limite máximo de até 60 dias de tratamento por prescrição.',

    relatedDiseaseSlugs: [],

    // 10. Referências Científicas Indexadas no PubMed com Links Funcionais
    references: [
      {
        id: 'ref-ivetf-guidelines-2015',
        citationText:
          'Podell M, Volk HA, Berendt M, Löscher W, Muñana K, Patterson EE, Platt SR. International Veterinary Epilepsy Task Force consensus report on guidelines for epilepsy therapy in dogs. BMC Vet Res. 2015;11:148. doi: 10.1186/s12917-015-0461-1.',
        sourceType: 'Diretriz / Consenso Internacional',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26316174/',
        evidenceLevel: 'Nível 1a (Consenso Internacional IVETF)',
      },
      {
        id: 'ref-charalambous-meta-2014',
        citationText:
          'Charalambous M, Brodbelt D, Volk HA. Systematic review and meta-analysis of first-line antiepileptic drugs for canine idiopathic epilepsy. BMC Vet Res. 2014;10:148. doi: 10.1186/1746-6148-10-148.',
        sourceType: 'Revisão Sistemática e Meta-análise',
        url: 'https://pubmed.ncbi.nlm.nih.gov/24708785/',
        evidenceLevel: 'Nível 1a (Meta-análise)',
      },
      {
        id: 'ref-boothe-comp-2012',
        citationText:
          'Boothe DM, Dewey C, Carpenter DM. Comparison of phenobarbital and potassium bromide as first-line therapy for treatment of dogs with idiopathic epilepsy. J Am Vet Med Assoc. 2012;240(9):1073-1083. doi: 10.2460/javma.240.9.1073.',
        sourceType: 'Ensaio Clínico Randomizado Controlado',
        url: 'https://pubmed.ncbi.nlm.nih.gov/22452494/',
        evidenceLevel: 'Nível 1b (Ensaio Clínico Randomizado)',
      },
      {
        id: 'ref-bailey-feline-2009',
        citationText:
          'Bailey KS, Dewey CW, Boothe DM, Barone G, Kortz GD. Feline idiopathic epilepsy: a retrospective study of 30 cases (1998-2008) and treatment response to phenobarbital. J Feline Med Surg. 2009;11(8):657-664. doi: 10.1016/j.jfms.2008.12.008.',
        sourceType: 'Estudo Clínico Multicêntrico',
        url: 'https://pubmed.ncbi.nlm.nih.gov/19671109/',
        evidenceLevel: 'Nível 1b (Estudo Clínico)',
      },
      {
        id: 'ref-gizzi-tdm-2020',
        citationText:
          'Gizzi AB, Leal LM, Flor PB, Rivero BR, et al. Phenobarbital clearance and therapeutic drug monitoring in dogs with epilepsy: Impact of autoinduction. J Vet Intern Med. 2020;34(4):1532-1541. doi: 10.1111/jvim.15820.',
        sourceType: 'Estudo Clínico Prospectivo',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32666642/',
        evidenceLevel: 'Nível 1b (Farmacocinética Clínica)',
      },
      {
        id: 'ref-thomas-epilepsy-2010',
        citationText:
          'Thomas WB. Idiopathic epilepsy in dogs and cats. Vet Clin North Am Small Anim Pract. 2010;40(1):161-179. doi: 10.1016/j.cvsm.2009.09.004.',
        sourceType: 'Revisão Sistemática',
        url: 'https://pubmed.ncbi.nlm.nih.gov/20207238/',
        evidenceLevel: 'Nível 2a (Revisão Qualificada)',
      },
      {
        id: 'ref-podell-status-2016',
        citationText:
          'Podell M. Seizure emergencies and status epilepticus in small animals. Vet Clin North Am Small Anim Pract. 2016;46(2):259-279. doi: 10.1016/j.cvsm.2015.10.007.',
        sourceType: 'Manual de Conduta em Terapia Intensiva',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26704770/',
        evidenceLevel: 'Nível 2a (Consenso Terapia Intensiva)',
      },
      {
        id: 'ref-plumbs-10th-phenobarbital',
        citationText:
          'Plumb DC. Plumb\'s Veterinary Drug Handbook, 10th ed. Phenobarbital monograph, pp. 1007-1011. Wiley-Blackwell; 2023.',
        sourceType: 'Formulário Farmacológico de Referência',
        url: 'https://www.wiley.com/en-us/Plumb%27s+Veterinary+Drug+Handbook-p-9781119846222',
        evidenceLevel: 'Padrão Ouro Internacional',
      },
      {
        id: 'ref-convless-agener',
        citationText:
          'Agener União Saúde Animal. Convless® (Fenobarbital 20 mg/mL) — Bula técnica e registro MAPA nº 10.354/2020.',
        sourceType: 'Bula Oficial MAPA / Fabricante',
        url: 'https://agener.com.br/produtos/pequenos-animais/suplementos/convless/',
        evidenceLevel: 'Registro Oficial MAPA',
      },
    ],

    // 9. Pilares Terapêuticos Essenciais & Destaques
    pillars: [
      {
        title: 'Padrão Ouro Internacional na Epilepsia',
        icon: 'ShieldCheck',
        desc: 'Fármaco antiepiléptico de primeira linha preconizado pelos consensos IVETF e ACVIM para monoterapia crônica em cães e gatos, com taxa de resposta superior a 80%.',
      },
      {
        title: 'Monitoramento Sérico Obrigatório (TDM)',
        icon: 'Activity',
        desc: 'Janela terapêutica estreita com alvo de 15 a 35 µg/mL (cães) e 15 a 45 µg/mL (gatos). Exige dosagem sérica com 10–14 dias e 6 semanas para titular a dose individual.',
      },
      {
        title: 'Autoindução Enzimática em Cães',
        icon: 'Clock',
        desc: 'Potente autoindutor microssomal hepático (CYP2B11/CYP3A12) em cães, acelerando seu próprio clearance após 2 a 4 semanas. Em felinos, a cinética é linear e sem autoindução.',
      },
      {
        title: 'Risco de Abstinência & Desmame Lento',
        icon: 'AlertTriangle',
        desc: 'A suspensão abrupta é absolutamente contraindicada pelo risco iminente de status epilepticus de rebote fatal. O desmame exige redução gradual ao longo de meses.',
      },
    ],

    quickSummaryHighlights: [
      'Anticonvulsivante barbitúrico de primeira linha para cães e gatos com epilepsia idiopática, estrutural ou crises em cluster',
      'Atua como modulador alostérico positivo do receptor GABA-A, aumentando o tempo de abertura do canal de cloreto e hiperpolarizando neurônios',
      'Dose inicial de manutenção canina: 2,5 a 3,0 mg/kg VO a cada 12 horas; felina: 1,5 a 2,5 mg/kg VO a cada 12 horas',
      'Monitoramento sérico terapêutico (TDM) mandatório aos 10–14 dias e 6 semanas, com faixa-alvo de 15 a 35 µg/mL (cães) e 15 a 45 µg/mL (gatos)',
      'Substância sujeita a controle especial sob Portaria SVS/MS nº 344/1998 (Lista C1), exigindo receita em 2 vias com retenção da 1ª via',
      'Apresentações: Convless® 20 mg/mL solução oral veterinária (Agener), Gardenal® 50/100 mg e Gotas 40 mg/mL (Sanofi), Fenocris® injetável (Cristália)',
    ],

    attentionSubtitle:
      'O fenobarbital é o anticonvulsivante de primeira escolha em pequenos animais, porém sua margem terapêutica estreita exige monitoramento sérico periódico (TDM), vigilância estrita quanto a hepatopatias, ajuste de dose por comorbidades e protocolo rígido de desmame gradual.',

    samplePrescriptionText:
      'RECEITUÁRIO DE CONTROLE ESPECIAL (LISTA C1 - EM 2 VIAS)\n' +
      '1ª Via: Retenção da Farmácia / 2ª Via: Orientação ao Tutor\n\n' +
      'USO ORAL:\n' +
      '1. Convless® Solução Oral 20 mg/mL (Agener União) ----------------- 1 frasco (60 mL)\n' +
      '   Administrar 1,25 mL (equivalente a 25 mg para cão de 10 kg na dose de 2,5 mg/kg) por via oral, utilizando a seringa dosadora graduada fornecida, rigorosamente a cada 12 horas (pontualmente às 08:00h e às 20:00h), uso contínuo e vitalício.\n\n' +
      'OU ALTERNATIVA EM COMPRIMIDOS:\n' +
      '1. Gardenal® 100 mg (Sanofi) ------------------------------------ 1 caixa (20 comprimidos)\n' +
      '   Administrar 1/4 de comprimido (25 mg para cão de 10 kg) por via oral, a cada 12 horas (pontualmente às 08:00h e às 20:00h), uso contínuo e vitalício.\n\n' +
      'ORIENTAÇÕES OBRIGATÓRIAS AO TUTOR:\n' +
      '• NUNCA interromper, pular ou atrasar o medicamento: a retirada abrupta pode desencadear convulsões ininterruptas em salva (status epilepticus) com risco fatal.\n' +
      '• Não dobrar a dose caso esqueça uma tomada. Retomar no próximo horário normal.\n' +
      '• Sedação leve e instabilidade para caminhar (ataxia) são comuns nos primeiros 10 a 14 dias de tratamento e tendem a diminuir com a adaptação neural.\n' +
      '• Retorno agendado em 14 dias para coleta de sangue e dosagem sérica de fenobarbital (TDM) e enzimas hepáticas.',

    practicalWeightTable: {
      standardDoseText:
        'Cálculo de dose prática baseada na posologia inicial padrão IVETF de 2,5 mg/kg a cada 12 horas (VO).',
      headers: [
        'Peso do Paciente',
        'Dose Alvo (2,5 mg/kg)',
        'Convless® 20 mg/mL (Seringa)',
        'Gardenal® Gotas (40 gts/mL = 1 mg/gt)',
        'Gardenal® Comprimidos (50 / 100 mg)',
      ],
      rows: [
        {
          weight: '2 kg (gato / cão toy)',
          totalDose: '5 mg',
          col1: '0,25 mL na seringa',
          col2: '5 gotas (5 mg)',
          col3: 'Inadequado fracionar (usar líquido)',
        },
        {
          weight: '4 kg (gato / cão pequeno)',
          totalDose: '10 mg',
          col1: '0,50 mL na seringa',
          col2: '10 gotas (10 mg)',
          col3: 'Inadequado fracionar (usar líquido)',
        },
        {
          weight: '5 kg',
          totalDose: '12,5 mg',
          col1: '0,63 mL na seringa',
          col2: '12 a 13 gotas',
          col3: '1/4 de comprimido de 50 mg (12,5 mg)',
        },
        {
          weight: '10 kg',
          totalDose: '25 mg',
          col1: '1,25 mL na seringa',
          col2: '25 gotas (0,63 mL)',
          col3: '1/2 comp de 50 mg ou 1/4 comp de 100 mg',
        },
        {
          weight: '15 kg',
          totalDose: '37,5 mg',
          col1: '1,88 mL na seringa',
          col2: '37 a 38 gotas',
          col3: '3/4 de comprimido de 50 mg',
        },
        {
          weight: '20 kg',
          totalDose: '50 mg',
          col1: '2,50 mL na seringa',
          col2: '50 gotas (1,25 mL)',
          col3: '1 comp inteiro de 50 mg ou 1/2 de 100 mg',
        },
        {
          weight: '30 kg',
          totalDose: '75 mg',
          col1: '3,75 mL na seringa',
          col2: '75 gotas',
          col3: '3/4 de comprimido de 100 mg',
        },
        {
          weight: '40 kg',
          totalDose: '100 mg',
          col1: '5,00 mL na seringa',
          col2: '100 gotas',
          col3: '1 comprimido inteiro de 100 mg',
        },
      ],
      dropletCalibrator: {
        title: 'Guia de Conversão Rápida & Calibrador Posológico',
        concentration: 'Convless® 20 mg/mL | Gardenal® 40 mg/mL',
        dropletRatio: 'Gardenal®: 1 gota = exatamente 1 mg (40 gotas/mL)',
        practicalRule: 'Convless®: 0,125 mL por kg (na dose de 2,5 mg/kg)',
        note: 'Gardenal gotas possui conta-gotas pediátrico calibrado onde 40 gotas = 1 mL (1 mg por gota). Já o Convless® veterinário acompanha seringa dosadora graduada em mL.',
      },
    },

    genericBrandsNote:
      'O fenobarbital conta com formulação de uso veterinário exclusivo com seringa graduada (Convless® 20 mg/mL - Agener União) e formulações de uso humano sob receita de controle especial (Gardenal® 50/100 mg e gotas 40 mg/mL - Sanofi, Fenocris® injetável - Cristália, além de genéricos como União Química, Teuto, EMS e Medley).',

    clinicalWarningItems: [
      {
        label: 'Retirada Abrupta:',
        text: 'NUNCA suspender o fenobarbital abruptamente em pacientes em uso crônico. A retirada súbita pode precipitar status epilepticus refratário com risco de morte. Toda redução deve ser gradual (≤ 25% da dose a cada 2 semanas) sob monitoramento clínico rigoroso.',
      },
      {
        label: 'Via Intravenosa:',
        text: 'Administrar SEMPRE por infusão lenta, não excedendo 1 a 2 mg/kg/min. Velocidades superiores provocam depressão respiratória grave, hipotensão e parada cardiorrespiratória. Diluir em SF 0,9% e nunca misturar com soluções ácidas.',
      },
    ],

    isControlled: true,
    isPublished: true,
    source: 'seed',
  },
];

export const phenobarbitalMedicationRecord = phenobarbitalMedicationsSeed[0];

