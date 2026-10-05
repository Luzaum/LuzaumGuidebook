import { MedicationRecord } from '../../types/medication';

export const trazodonaMedicationRecord: MedicationRecord = {
  id: 'med-trazodona',
  slug: 'trazodona',
  title: 'Trazodona (Cloridrato de Trazodona)',
  activeIngredient: 'Cloridrato de trazodona (derivado triazolopiridínico / fenilpiperazínico)',
  isControlled: true,
  controlNotice:
    'Medicamento sob controle especial. No Brasil, o cloridrato de trazodona integra a Lista C1 (Outras substâncias sujeitas a controle especial) da Portaria SVS/MS nº 344/1998 e atualizações da Anvisa (RDC nº 1.023/2026). Sua prescrição e dispensação médico-veterinária exigem obrigatoriamente Receita de Controle Especial em duas (2) vias brancas (1ª via retida pelo estabelecimento farmacêutico e 2ª via devolvida ao tutor carimbada para comprovação de atendimento), com prazo de validade de 30 dias contados a partir da data de emissão em todo o território nacional. A quantidade total prescrita é limitada ao tratamento de até 60 dias para formas farmacêuticas orais não injetáveis. Em conformidade com as exigências sanitárias federais vigentes desde 18/05/2026, novas impressões físicas devem seguir o modelo Versão 2 da Receita de Controle Especial, com integração gradual à etapa de emissão eletrônica vinculada ao Sistema Nacional de Controle de Receituários (SNCR) iniciada em 30/09/2026.',
  tradeNames: [
    'Donaren® 50 mg Comprimidos Revestidos Sulcados (Apsen Farmacêutica — Blister com 60 comprimidos; com sulco funcional para bipartição uniforme em metades de 25 mg; uso humano)',
    'Donaren® 100 mg Comprimidos Revestidos (Apsen Farmacêutica — Blister com 30 comprimidos; NÃO deve ser partido segundo o fabricante; uso humano)',
    'Donaren® Retard 150 mg / Donaren® LP 150 mg Comprimidos de Liberação Prolongada (Apsen Farmacêutica — Matriz modificada; NÃO intercambiável com liberação imediata; PROIBIDO triturar)',
    'Cloridrato de Trazodona Cápsulas Magistrais Veterinárias (10 mg, 20 mg, 25 mg, 50 mg e 100 mg manipuladas sob medida com excipiente inerte em farmácias veterinárias qualificadas)',
    'Cloridrato de Trazodona Suspensão Oral Veterinária 10 mg/mL (Veículo aquoso semissintético palatável sem açúcar, sem álcool e estritamente ISENTO DE XILITOL; dosador em mL)',
    'Desyrel® 50 mg e 100 mg Tablets (Referência Internacional — Prasco Laboratories / Bristol-Myers Squibb / Angelini Pharma)',
  ],
  officialSiteUrl: 'https://produtos.apsen.com.br/donaren',
  leafletUrl: 'https://consultaremedios.com.br/donaren/bula',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/trazodone/PNG',
  pharmacologicClass:
    'Antidepressivo Atípico; Antagonista Serotoninérgico 5-HT2A e 5-HT2C e Inibidor da Recaptação de Serotonina (SARI); Antagonista Alfa-1 Adrenérgico; Sedativo e Ansiolítico Situacional Fear Free',
  species: ['dog', 'cat'],
  category: 'neurologia',
  tags: [
    'Trazodona',
    'Trazodone',
    'Donaren',
    'Desyrel',
    'SARI',
    'Ansiedade Situacional',
    'Pré-visita',
    'Fear Free',
    'Transporte Felino',
    'Hospitalização',
    'Fobias Sonoras',
    'Confinamento Pós-operatório',
    '5-HT2A',
    '5-HT2C',
    'SERT',
    'Alfa-1 Adrenérgico',
    'mCPP',
    'Controle Especial C1',
    'Receita 2 Vias',
    'Síndrome Serotoninérgica',
    'Agregação Plaquetária',
    'Exame Neurológico',
    'Teste de Estimulação ACTH',
  ],

  attentionSubtitle:
    'SARI: antagonista 5-HT2A e inibidor da recaptação de serotonina com bloqueio alfa-1 adrenérgico (risco de vasodilatação e hipotensão). Alertas críticos para síndrome serotoninérgica em polifarmácia, contraindicação com IMAOs (washout ≥14 dias), inibição da agregação plaquetária in vitro, depressão temporária de respostas no exame neurológico e atenuação diagnóstica de cortisol no teste de estimulação com ACTH.',

  plainLanguageSummary:
    'A trazodona é um dos medicamentos mais modernos e utilizados na medicina comportamental e nos protocolos "Fear Free" (atendimento livre de medo e estresse) para cães e gatos. Ao contrário de calmantes e sedativos clássicos mais antigos que muitas vezes apenas paralisam ou dopam o corpo do animal mantendo o pavor psicológico intacto ("efeito estátua"), a trazodona pertence à classe dos SARIs: ela modula a serotonina cerebral, reduzindo de forma real a sensação de medo, hipervigilância e pânico em situações pontuais como idas ao veterinário, exames, viagens na caixa de transporte, tempestades, fogos de artifício e repouso forçado após cirurgias ortopédicas. O efeito costuma ter início entre 45 minutos e 2 horas após a tomada oral e dura de 6 a 12 horas. No entanto, sedação não é o mesmo que ausência de medo, e a absorção e resposta ao medicamento são extremamente variáveis entre cães e gatos: enquanto alguns pacientes ficam suavemente calmos e outros sonolentos com andar cambaleante (ataxia), uma minoria pode apresentar desinibição ou agitação paradoxal decorrente do metabólito mCPP. Por essa razão, é altamente recomendável realizar uma "dose-teste" prévia em casa num dia calmo antes do evento importante e bloquear o acesso a escadas e sofás para prevenir quedas. Por ser um fármaco sob controle especial federal (Lista C1), exige Receita de Controle Especial em 2 vias e nunca deve ser associado por conta própria a outros medicamentos serotoninérgicos (como tramadol, fluoxetina ou mirtazapina) sob risco de intoxicação grave conhecida como Síndrome Serotoninérgica.',

  pillars: [
    {
      title: 'Modulação Serotoninérgica SARI (5-HT2A + SERT)',
      icon: 'Brain',
      desc: 'Bloqueia potentemente os receptores excitatórios pós-sinápticos 5-HT2A acoplados à via Gq-PLC-IP3/DAG no córtex pré-frontal e sistema límbico, extinguindo circuitos de pânico e hipervigilância. Em paralelo, inibe o transportador SERT, canalizando a serotonina livre sináptica para receptores 5-HT1A mediadores de tranquilidade.',
    },
    {
      title: 'Atenuação do Arousal Adrenérgico e Bloqueio Alfa-1',
      icon: 'HeartPulse',
      desc: 'O antagonismo competitivo sobre receptores alfa-1 adrenérgicos centrais reduz a reatividade ao estresse e complementa a tranquilização, mas provoca vasodilatação periférica e suscetibilidade à hipotensão arterial sistêmica, especialmente em felinos ou sob associação com anti-hipertensivos.',
    },
    {
      title: 'O Paradoxo Farmacológico do Metabólito mCPP',
      icon: 'Zap',
      desc: 'A biotransformação microssomal hepática gera m-clorofenilpiperazina (mCPP), metabólito ativo que exerce agonismo sobre receptores serotoninérgicos (com ênfase em 5-HT2C). Esse mecanismo elucida por que alguns pacientes desenvolvem desinibição comportamental, vocalização ou excitação paradoxal.',
    },
    {
      title: 'Sedação ≠ Ansiólise & Variabilidade Farmacocinética',
      icon: 'ShieldAlert',
      desc: 'O bloqueio anti-histamínico H1 e alfa-1 pode induzir decúbito e sonolência sem necessariamente extinguir todo o medo subjetivo. Aliado à extrema dispersão do Tmax canino (média de 7,4 ± 4,5h) e biodisponibilidade felina errática (7-96%), torna indispensável a realização de dose-teste domiciliar prévia.',
    },
  ],

  quickSummaryHighlights: [
    'Modulador serotoninérgico e inibidor da recaptação (SARI); combina antagonismo 5-HT2A/5-HT2C, inibição de SERT, bloqueio alfa-1 adrenérgico e anti-H1 moderado.',
    'Padrão-ouro em medicina comportamental Fear Free para ansiedade situacional pré-visita, transporte felino em caixas, hospitalização e eventos fóbicos previsíveis.',
    'Dose canina pré-visita usual: 5 a 7,5 mg/kg VO administrada 1,5 a 2 horas antes do evento ansiogênico (máximo prático usual de 300 mg/dose em cães gigantes); ensaios clínicos demonstraram que doses de até 9 a 12 mg/kg VO ~90 min antes são eficazes em cães com fobia severa de consultório.',
    'Dose felina pré-visita consolidada por ensaio clínico duplo-cego: 50 mg/gato VO em dose única administrada 60 a 120 minutos antes do transporte; gatos pequenos (<2,5 kg) podem receber 25 mg (meio comprimido de Donaren 50 mg); doses de 100 mg causam sedação intensa e queda transitória na pressão arterial sistólica (~22 mmHg).',
    'Confinamento pós-operatório ortopédico: embora consagrada clinicamente após estudos abertos em cães, ensaios clínicos duplo-cegos placebo-controlados subsequentes evidenciaram resposta variável sem superioridade inequívoca ao placebo.',
    'Via intravenosa (IV) estritamente contraindicada na rotina: estudo farmacocinético canino (Jay 2013) demonstrou taquicardia imediata em 100% dos animais e desinibição agressiva paradoxal em 50%.',
    'Quatro alertas de segurança mandatórios: 1) Síndrome Serotoninérgica com IMAOs (washout ≥14 dias) e tramadol; 2) Redução da agregação plaquetária in vitro (estudo Benjamin 2023: 95% → 62%); 3) Depressão de propriocepção e reações posturais no exame neurológico; 4) Atenuação diagnóstica de cortisol no teste de estimulação com ACTH (Brown 2024).',
    'Medicamento sob controle especial no Brasil: Lista C1 da Portaria SVS/MS nº 344/1998, exigindo Receita de Controle Especial em 2 vias branca (validade de 30 dias em território nacional; Versão 2 física obrigatória desde 18/05/2026).',
  ],

  quickIndications: [
    {
      condition: 'Ansiedade Situacional e Fobia Pré-Visita Veterinária (Cães)',
      species: 'dog',
      doseSummary: '5 a 7,5 mg/kg VO em dose única 90 a 120 min antes (máx 300 mg); até 9 a 12 mg/kg em fobia severa',
      route: 'Via Oral (VO) com pequeno agrado alimentar',
      duration: 'Dose única pontual administrada 1,5 a 2 horas antes do evento ansiogênico',
      clinicalContext: 'Manejo Fear Free em cães reativos, viagens de carro, exames e fobia a tempestades/fogos',
    },
    {
      condition: 'Estresse de Transporte em Caixa e Pré-Visita Veterinária (Gatos)',
      species: 'cat',
      doseSummary: '50 mg/gato VO em dose única (gatos <2,5 kg: 25 mg); monitorar hipotensão transitória',
      route: 'Via Oral (VO) direto na boca ou misturado a porção úmida',
      duration: 'Dose única pontual 60 a 120 minutos antes de colocar na caixa de transporte',
      clinicalContext: 'Ensaio clínico duplo-cego consolidado; melhora significativa de tolerância ao exame e transporte',
    },
    {
      condition: 'Estresse de Hospitalização em Enfermarias e UTI (Cães)',
      species: 'dog',
      doseSummary: 'Inicial: 2 a 4 mg/kg VO q12h; titular até 7 a 10 mg/kg q8h se necessário (máx 600 mg/dia)',
      route: 'Via Oral (VO)',
      duration: 'Durante o período de internação hospitalar sob monitoramento',
      clinicalContext: 'Atenuação de vocalização, reatividade a grades e hipervigilância em ambiente clínico',
    },
    {
      condition: 'Facilitação de Confinamento Pós-Operatório Ortopédico (Cães)',
      species: 'dog',
      doseSummary: '3,5 a 7 mg/kg VO a cada 8 a 12 horas (máximo 300 mg/dose)',
      route: 'Via Oral (VO)',
      duration: 'Semanas de repouso restrito pós-TPLO ou osteossíntese conforme avaliação',
      clinicalContext: 'Auxílio ao repouso forçado em gaiola; resposta variável segundo ensaios placebo-controlados',
    },
    {
      condition: 'Adjuvante em Transtornos de Ansiedade Crônica e Fobias (Cães)',
      species: 'dog',
      doseSummary: '2,5 a 5 mg/kg VO q12–24h inicial, titulada gradualmente até média de 7,5 mg/kg/dia',
      route: 'Via Oral (VO)',
      duration: 'Uso prolongado associado obrigatoriamente a terapia comportamental multimodal',
      clinicalContext: 'Fobia a ruídos intensos e ansiedade de separação refratária sob acompanhamento etológico',
    },
  ],

  detailedIndications: [
    {
      id: 'ind-trazo-dog-previsit',
      indication: 'Ansiedade situacional, transporte e manejo pré-visita veterinária Fear Free em cães',
      clinicalContext: 'Consultas ambulatoriais em cães reativos, viagens de carro e eventos estressores previsíveis',
      species: 'dog',
      dose: '5 a 7,5 mg/kg (casos graves: 9 a 12 mg/kg; teto 300 mg)',
      route: 'VO',
      frequency: 'dose única 90 a 120 minutos antes do evento',
      duration: 'Dose pontual sob demanda',
      mechanismOfAction: 'Antagonismo competitivo dos receptores 5-HT2A límbicos e inibição da recaptação de serotonina com redirecionamento para receptores 5-HT1A ansiolíticos.',
      clinicalRationale: 'Promove ansiólise e relaxamento sem bloquear o controle voluntário; realização de dose-teste prévia mandatória.',
      monitoring: 'Sedação excessiva, ataxia, quedas de mobília e agitação paradoxal (mCPP).',
      referenceIds: ['ref-trazo-kim-2022', 'ref-trazo-gruen-2014', 'ref-trazo-plumbs-10ed'],
      evidenceLevel: 'Nível 1b — Ensaio clínico duplo-cego randomizado e placebo-controlado (Kim et al. 2022)',
    },
    {
      id: 'ind-trazo-cat-previsit',
      indication: 'Estresse agudo de transporte na caixa e visita clínica em felinos',
      clinicalContext: 'Exames clínicos, coleta de sangue e viagens em gatos estressados ou agressivos',
      species: 'cat',
      dose: '50 mg/gato (gatos pequenos <2,5 kg: 25 mg; gatos >5 kg fóbicos: até 100 mg sob cautela)',
      route: 'VO',
      frequency: 'dose única 60 a 120 minutos antes do evento',
      duration: 'Dose pontual sob demanda',
      mechanismOfAction: 'Modulação serotoninérgica SARI com atenuação adrenérgica central alfa-1 em circuitos límbicos felinos.',
      clinicalRationale: 'Reduz significativamente os escores de estresse na caixa de transporte e viabiliza exame físico cuidadoso sem trauma.',
      monitoring: 'Pressão arterial sistólica (redução transitória de ~22 mmHg em 100 mg), ataxia e letargia.',
      referenceIds: ['ref-trazo-orlando-2016', 'ref-trazo-bsava-10ed', 'ref-trazo-plumbs-10ed'],
      evidenceLevel: 'Nível 1b — Ensaio clínico cruzado cego e placebo-controlado (Orlando et al. 2016)',
    },
    {
      id: 'ind-trazo-dog-hospitalization',
      indication: 'Controle de ansiedade e vocalização durante internação hospitalar canina',
      clinicalContext: 'Cães hospitalizados em regime de estresse de separação e reatividade a canis',
      species: 'dog',
      dose: '2 a 4 mg/kg inicial, titulada até 7 a 10 mg/kg (máx 300 mg/dose, 600 mg/dia)',
      route: 'VO',
      frequency: 'a cada 8 a 12 horas',
      duration: 'Durante a permanência hospitalar',
      mechanismOfAction: 'Sedação suave e atenuação da reatividade autonômica simpática via bloqueio alfa-1 e 5-HT2A.',
      clinicalRationale: 'Diminui o gasto energético, o estresse oxidativo e o estresse da equipe clínica sem depressão respiratória.',
      monitoring: 'Pressão arterial, ingestão voluntária e interação com a equipe.',
      referenceIds: ['ref-trazo-gilbert-gregory-2016', 'ref-trazo-plumbs-10ed'],
      evidenceLevel: 'Nível 2b — Ensaio clínico aberto de coorte hospitalar (Gilbert-Gregory et al. 2016)',
    },
    {
      id: 'ind-trazo-dog-postop',
      indication: 'Facilitação de restrição de movimentos pós-operatória ortopédica (TPLO)',
      clinicalContext: 'Confinamento em canil/gaiola após osteossínteses e artroplastias',
      species: 'dog',
      dose: '3,5 a 7 mg/kg',
      route: 'VO',
      frequency: 'a cada 8 a 12 horas',
      duration: 'Semanas de repouso restrito pós-cirúrgico',
      mechanismOfAction: 'Ação sedativa e estabilizadora do humor para prevenção de deambulação excessiva.',
      clinicalRationale: 'Evita colapso do implante ou falha de osteointegração por atividade precoce exuberante.',
      monitoring: 'Grau de ataxia, risco de quedas e resposta comportamental.',
      referenceIds: ['ref-trazo-gruen-2014', 'ref-trazo-plumbs-10ed'],
      evidenceLevel: 'Nível 2b — Estudo clínico prospectivo (Gruen et al. 2014)',
    },
  ],

  clinicalWarningItems: [
    {
      label: 'Síndrome Serotoninérgica Potencialmente Fatal e Interações Críticas de Washout',
      text: 'A coadministração de trazodona com inibidores da monoamina oxidase (IMAOs, como selegilina e amitraz) é estritamente contraindicada e exige intervalo prévio de washout de pelo menos 14 dias (duas semanas). A combinação com tramadol, antidepressivos tricíclicos (amitriptilina, clomipramina), inibidores seletivos da recaptação (fluoxetina) ou mirtazapina eleva substancialmente o risco de Síndrome Serotoninérgica, caracterizada pela tríade clínica de hiperexcitabilidade neuromuscular (tremores, mioclonias, rigidez extensora), instabilidade autonômica (hipertermia >39,5°C, taquicardia, taquipneia) e alteração do estado mental (agitação intensa, vocalização, delírio).',
    },
    {
      label: 'Inibição da Agregação Plaquetária In Vitro e Risco Hemorrágico Oculto',
      text: 'As plaquetas sanguíneas não sintetizam serotonina de forma autônoma, captando-a da circulação através do transportador SERT para armazenamento em grânulos densos. A inibição continuada de SERT pela trazodona depleta os estoques plaquetários e reduz a amplificação da agregação. Ensaio clínico canino prospectivo controlado (Benjamin et al., 2023) comprovou redução estatisticamente significativa na agregação plaquetária pelo Plateletworks de 95% para 62% (P = 0,002). Embora não altere a contagem plaquetária total nem o tempo de sangramento de mucosa bucal (BMBT) em animais hígidos, exige extrema prudência em pacientes com trombocitopenia imune, doença de von Willebrand, coagulopatias de consumo (CIVD) ou em uso concomitante de AINEs, aspirina e anticoagulantes.',
    },
    {
      label: 'Interferência Diagnóstica no Exame Físico Neurológico de Rotina',
      text: 'A administração prévia de trazodona para viabilizar consultas em pacientes reativos altera componentes essenciais do exame físico neurológico em cães saudáveis, causando sedação, ataxia locomotora e depressão transitória das respostas proprioceptivas e reações posturais de posicionamento (estudo prospectivo de 2022). Em pacientes encaminhados para investigação de suspeita de mielopatia, compressão discal intervertebral ou lesão de neurônio motor superior, a equipe deve sempre inquirir se o paciente recebeu trazodona nas últimas 12 horas para não superestimar falsamente a gravidade de déficits neurológicos.',
    },
    {
      label: 'Atenuação Diagnóstica no Teste de Estimulação com ACTH (Investigação Adrenal)',
      text: 'Investigação prospectiva recente (Brown et al., 2024) em cães sadios demonstrou que uma dose oral de trazodona (8 a 10 mg/kg) administrada 1 hora antes de provas hormonais não afetou o ACTH endógeno basal nem o cortisol sérico basal, mas causou supressão estatisticamente significativa no cortisol pós-estimulação e no delta de cortisol pós-ACTH. Em pacientes sob triagem diagnóstica para hipoadrenocorticismo (Doença de Addison), síndrome de Cushing ou monitoramento de trilostano, a trazodona prévia pode distorcer a interpretação do eixo hipotálamo-hipófise-adrenal, devendo ser estritamente evitada nas horas que antecedem o teste.',
    },
    {
      label: 'Hipotensão Arterial Sistêmica por Bloqueio Alfa-1 Adrenérgico',
      text: 'O antagonismo alfa-1 adrenérgico vascular reduz a resistência vascular periférica e a pressão arterial sistólica. Ensaios em felinos saudáveis recebendo 50 mg VO comprovaram queda na PAS (embora sem repercussões ecocardiográficas estruturais adversas); a dose de 100 mg/gato gerou redução média transitória de cerca de 22 ± 7 mmHg na pressão sistólica. Exige extrema cautela em pacientes hipovolêmicos, desidratados, em choque circulatório, cardiopatas avançados ou sob terapia anti-hipertensiva concomitante com amlodipina, telmisartana ou inibidores da ECA.',
    },
    {
      label: 'Não Intercambialidade de Formulações de Liberação Prolongada (Donaren Retard / LP)',
      text: 'Existem no mercado farmacêutico humano brasileiro apresentações de liberação prolongada (Donaren® Retard 150 mg e Donaren® LP 150 mg/24h). Essas formulações possuem matriz hidrofílica modificada que altera radicalmente a velocidade de dissolução, pico sérico (Cmax), tempo para pico (Tmax) e biodisponibilidade. Elas NÃO devem ser prescritas como substitutas dos comprimidos convencionais de 50 mg de liberação imediata avaliados na literatura veterinária, sendo terminantemente proibido triturar, mastigar ou macerar formas de liberação modificada.',
    },
  ],

  mechanismOfAction:
    'O cloridrato de trazodona é um derivado sintético triazolopiridínico estruturalmente classificado como fenilpiperazina que atua na neuroquímica central como SARI (Serotonin Antagonist and Reuptake Inhibitor). Seu efeito ansiolítico primário decorre do antagonismo potente e competitivo de alta afinidade nanomolar sobre os receptores serotoninérgicos pós-sinápticos 5-HT2A e, em menor intensidade, 5-HT2C. Em condições normais de estresse agudo e pânico, a ligação da serotonina endógena a esses receptores ativa a proteína heterotrimérica Gq acoplada, estimulando a fosfolipase C (PLC) a hidrolisar o fosfatidilinositol 4,5-bifosfato (PIP2) em inositol 1,4,5-trifosfato (IP3) e diacilglicerol (DAG). Essa cascata induz liberação massiva de cálcio intracelular a partir do retículo endoplasmático e recrutamento de proteína quinase C (PKC), amplificando a excitabilidade neuronal no córtex pré-frontal e sistema límbico, traduzindo-se clinicamente em hipervigilância, medo condicionado e reatividade fóbica. Ao bloquear competitivamente os receptores 5-HT2A, a trazodona neutraliza essa cascata excitatória intracelular. Concomitantemente, inibe o transportador pré-sináptico de recaptação de serotonina (SERT), prolongando o tempo de permanência do neurotransmissor na fenda sináptica; como os receptores 5-HT2 pró-ansiedade estão farmacologicamente silenciados pela própria droga, essa serotonina excedente é funcionalmente redirecionada para receptores pós-sinápticos neuroprotetores como o 5-HT1A, mediadores de sensação de calma, redução de pânico e tranquilização. Em paralelo, o bloqueio de receptores alfa-1 adrenérgicos centrais e vasculares atenua o tônus simpático e a resposta ao alerta autonômico, gerando sedação complementar, porém introduzindo suscetibilidade a vasodilatação arteriolar e hipotensão arterial sistêmica. A afinidade moderada por receptores histaminérgicos H1 centrais corrobora o perfil indutor de sonolência e relaxamento. A biotransformação microssomal gera m-clorofenilpiperazina (mCPP), metabólito farmacologicamente ativo que exibe ação agonista direta sobre subtipos serotoninérgicos (especialmente 5-HT2C), fundamentando as respostas idiossincráticas de inquietação, vocalização, desinibição comportamental e agitação paradoxal descritas em cães e gatos. Ao contrário dos antidepressivos tricíclicos clássicos (amitriptilina, clomipramina), a trazodona apresenta afinidade antimuscarínica desprezível, minimizando efeitos anticolinérgicos indesejáveis como boca seca intensa, taquicardia sinusal autonômica e retenção urinária.',

  indications: [
    'Ansiedade situacional e fóbica canina: prevenção e alívio do estresse relacionado a consultas veterinárias, exames diagnósticos, procedimentos ambulatoriais Fear Free, banho, tosa, viagens, mudanças de ambiente e fobias sonoras (trovões, fogos de artifício).',
    'Manejo pré-visita e transporte na espécie felina: redução comprovada de vocalização, reatividade, agressividade defensiva e estresse durante o transporte em caixas e na manipulação clínica ambulatorial.',
    'Estresse e ansiedade durante a hospitalização: controle de agitação, vocalização persistente, lambedura excessiva de focinho e taquipneia em cães internados em unidades de terapia intensiva e enfermarias.',
    'Confinamento e restrição de atividade física pós-operatória: adjuvante na facilitação do repouso forçado em caixas ou ambientes restritos após cirurgias ortopédicas e reconstrutivas (com ressalva de que ensaios placebo-controlados revelam evidência clínica conflitante frente a ensaios abertos).',
    'Transtornos de ansiedade crônica generalizada e ansiedade de separação em cães: medicação adjuvante coadjuvante a programas estruturados de modificação comportamental ambiental e terapias basais de longo prazo com SSRIs ou TCAs.',
    'Adjuvante pré-anestésico institucional: medicação oral pré-hospitalar em cães para diminuição da ansiedade perioperatória, economia de dose indutora de propofol e redução da Concentração Alveolar Mínima (MAC) de anestésicos inalatórios como o isoflurano.',
  ],

  contraindications: [
    'Hipersensibilidade conhecida ou confirmada ao cloridrato de trazodona ou a qualquer componente do excipiente.',
    'Uso concomitante com inibidores da monoamina oxidase (IMAOs, como selegilina e amitraz) ou dentro de um intervalo mínimo de 14 dias (duas semanas de período de washout) após a interrupção de um IMAO, devido ao risco iminente de crise serotoninérgica fatal e instabilidade autonômica.',
    'Glaucoma de ângulo fechado pré-existente ou predisposição anatômica a fechamento angular, em razão do potencial de midríase induzida precipitar hipertensão ocular aguda.',
    'Insuficiência hepática severa descompensada com encefalopatia hepática em curso, visto que a depuração da droga depende primariamente da biotransformação microssomal.',
    'Estados de choque cardiogênico, hipovolêmico ou séptico descompensado, hipotensão arterial grave não corrigida e trauma cranioencefálico com instabilidade hemodinâmica, devido ao risco de colapso circulatório por bloqueio alfa-1.',
  ],

  cautions: [
    'Cautela estrita em pacientes cardiopatas com insuficiência cardíaca congestiva, arritmias ventriculares ou histórico de síncope, monitorando a pressão arterial e o traçado eletrocardiográfico quando associada a outras medicações cardiovasculares.',
    'Comprometimento da hemostasia primária: a inibição da recaptação pelo SERT reduz o reservatório de serotonina nas plaquetas circulantes e diminui a agregação plaquetária in vitro; monitorar rigorosamente pacientes com trombocitopenia, trombocitopatias, doença de von Willebrand ou em uso de antiagregantes plaquetários, anticoagulantes e AINEs.',
    'Interferência no exame físico neurológico: o fármaco deprime as respostas proprioceptivas e reações posturais em cães saudáveis, podendo induzir achados falso-positivos de déficits neurológicos quando administrado precocemente à consulta com neurologista.',
    'Interferência diagnóstica endócrina adrenal: a trazodona administrada previamente reduz de forma expressiva as concentrações de cortisol sérico pós-ACTH e o delta de cortisol, devendo ser estritamente evitada nas horas que antecedem o teste de estimulação com ACTH.',
    'Pacientes nefropatas crônicos ou com insuficiência renal avançada: embora a maior parte dos metabólitos seja excretada pela urina, a resposta sedativa pode ser exacerbada pela uremia; recomenda-se iniciar com o limite posológico inferior e estender intervalos se necessário.',
    'Epilepsia pré-existente e distúrbios convulsivos: embora apresente menor potencial pró-convulsivante que antidepressivos tricíclicos, exige avaliação individual criteriosa e estabilização prévia do controle convulsivo.',
    'Gestação e lactação (Categoria C): estudos pré-clínicos demonstraram aumento de reabsorções fetais e discretas alterações esqueléticas em doses tóxicas maternas; metabólitos passam para o colostro e leite. Uso contraindicado na rotina, reservado exclusivamente para situações emergenciais maternas.',
  ],

  adverseEffects: [
    'Sedação excessiva, sonolência profunda, letargia prolongada e decúbito estendido, representando os efeitos farmacodinâmicos secundários mais frequentes.',
    'Ataxia locomotora, incoordenação motora, paresia de membros pélvicos e fraqueza transitória, aumentando a suscetibilidade a quedas em pisos lisos e escadas.',
    'Desinibição comportamental e excitação paradoxal: inquietação psicomotora, vocalização incessante, agitação, agressividade defensiva por redução do limiar inibitório e pacing contínuo.',
    'Distúrbios gastrintestinais agudos: náusea, sialorreia, êmese reflexa, regurgitação (gagging), fezes amolecidas e episódios transitórios de colite autolimitada.',
    'Hipotensão arterial sistêmica e vasodilatação periférica mediadas pelo antagonismo alfa-1, manifestando-se principalmente em felinos sob doses elevadas ou coadministrações sedativas.',
    'Protrusão transitória bilateral da terceira pálpebra em felinos, decorrente de relaxamento muscular simpático pós-ganglionar.',
    'Taquicardia reflexa secundária a vasodilatação ou elevação de tônus simpático central pelo metabólito mCPP.',
    'Relatos esporádicos raros de priapismo persistente em machos caninos e episódios de hepatotoxicidade medicamentosa com transaminases elevadas, reversíveis após a suspensão da medicação.',
  ],

  administration: [
    'Administração oral: fornecer o comprimido preferencialmente acompanhado de uma pequena porção de alimento ou petisco para reduzir náusea gástrica, êmese e sialorreia reflexa.',
    'Avaliação minuciosa da escala de sedação, grau de ataxia e qualidade do relaxamento comportamental antes, durante e após a exposição aos eventos ansiogênicos.',
    'Monitoramento contínuo ou intermitente da pressão arterial sistólica (PAS) e frequência cardíaca em pacientes internados, geriátricos, nefropatas ou sob medicações vasodilatadoras.',
    'Vigilância ativa para reconhecimento precoce da tríade clínica de Síndrome Serotoninérgica: alterações neuromusculares (tremores finos, espasmos, mioclonias, rigidez extensora e hiperreflexia), hiperatividade autonômica (hipertermia acima de 39,5 °C, taquipneia, taquicardia) e alterações do estado mental (agitação intensa, desorientação e delírio).',
    'Acompanhamento do perfil hepático (ALT, FA, GGT e bilirrubinas totais) e função renal (ureia, creatinina e eletrólitos) em pacientes submetidos a protocolos de uso contínuo crônico superiores a 30 dias.',
    'Investigação de sangramentos superficiais, petéquias ou sufusões em pacientes com distúrbios da coagulação primária ou submetidos a cirurgias de grande porte.',
  ],

  doses: [
    {
      id: 'dose-trazo-dog-previsit',
      species: 'dog',
      indication: 'Ansiedade situacional, pré-visita veterinária e transporte — dose inicial usual canina',
      doseMin: 5,
      doseMax: 7.5,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'dose única 90 a 120 minutos antes do evento ansiogênico',
      notes:
        'Dose de partida recomendada pela literatura especializada e consenso Fear Free. Administrar preferencialmente 1,5 a 2 horas antes da manipulação ou saída de casa. Realizar uma dose-teste em ambiente calmo previamente. Teto máximo prático usual de 300 mg por dose em cães gigantes.',
      calculatorEnabled: true,
      presentationId: 'pres-trazo-donaren-50',
    },
    {
      id: 'dose-trazo-dog-previsit-intense',
      species: 'dog',
      indication: 'Ansiedade pré-visita grave e fobia extrema canina — protocolo Kim et al. 2022',
      doseMin: 9,
      doseMax: 12,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'dose única 90 minutos antes do transporte',
      notes:
        'Protocolo validado em ensaio clínico duplo-cego randomizado e placebo-controlado (Kim et al. 2022) em cães com histórico refratário de estresse e agressão em consultório. Não ultrapassar o limite máximo absoluto de 300 mg por tomada. Exige triagem prévia de tolerância para descartar ataxia severa.',
      calculatorEnabled: true,
      presentationId: 'pres-trazo-donaren-50',
    },
    {
      id: 'dose-trazo-dog-hospitalization',
      species: 'dog',
      indication: 'Ansiedade e estresse agudo durante a hospitalização canina — protocolo Gilbert-Gregory / Plumb',
      doseMin: 2,
      doseMax: 4,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q12h inicialmente',
      notes:
        'Iniciar com 2 a 4 mg/kg a cada 12 horas para minimizar náusea e sedação profunda em enfermarias. Se a contenção de estresse for insuficiente, pode ser titulada gradualmente até 10 a 12 mg/kg q8h em cães reativos. Limites formais de segurança: 300 mg por tomada e 600 mg por 24 horas no cão adulto.',
      calculatorEnabled: true,
      presentationId: 'pres-trazo-donaren-50',
    },
    {
      id: 'dose-trazo-dog-chronic-anxiety',
      species: 'dog',
      indication: 'Transtornos de ansiedade crônica e fobias caninas — adjuvante comportamental',
      doseMin: 2.5,
      doseMax: 5,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q12–24h nos primeiros 3 dias',
      notes:
        'Dose de indução inicial para permitir adaptação do trato digestivo e neuroreceptores. Após 3 dias, titular conforme a resposta clínica e tolerância até uma média de 7,5 mg/kg/dia (faixa global descrita de 2 a 19,5 mg/kg/dia fracionada em 2 a 3 tomadas). Teto de 300 mg/dose. O tratamento farmacológico deve ser obrigatoriamente associado a terapia comportamental e dessensibilização sistemática.',
      calculatorEnabled: true,
      presentationId: 'pres-trazo-donaren-50',
    },
    {
      id: 'dose-trazo-dog-postop-confinement',
      species: 'dog',
      indication: 'Facilitação de confinamento pós-operatório ortopédico canino — protocolo Gruen / Plumb',
      doseMin: 3.5,
      doseMax: 7,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q12h, podendo atingir q8h conforme necessidade',
      notes:
        'Utilizada para auxiliar o repouso estrito em gaiola após correções ortopédicas complexas (TPLO, osteossínteses). Titular de 3,5 mg/kg q12h até 7 a 10 mg/kg q8h se necessário (máx 300 mg/dose). Alerta de evidência: estudos abertos demonstraram alta satisfação dos tutores, mas ensaios placebo-controlados subsequentes evidenciaram resposta variável sem superioridade inequívoca ao placebo.',
      calculatorEnabled: true,
      presentationId: 'pres-trazo-donaren-50',
    },
    {
      id: 'dose-trazo-dog-preanesthetic',
      species: 'dog',
      indication: 'Adjuvante pré-anestésico e redução da CAM de inalatórios — protocolo perioperatório canino',
      doseMin: 3,
      doseMax: 8,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'dose única 90 a 120 minutos antes da indução anestésica',
      notes:
        'Promove tranquilização pré-hospitalar Fear Free, diminui os requerimentos de propofol na indução e reduz em cerca de 17% a Concentração Alveolar Mínima (CAM) do isoflurano (estudos de Jay 2013 e Plumb 10ª ed.). Monitorar atentamente a pressão arterial durante a indução devido à somação de vasodilatação por bloqueio alfa-1.',
      calculatorEnabled: true,
      presentationId: 'pres-trazo-donaren-50',
    },
    {
      id: 'dose-trazo-cat-previsit',
      species: 'cat',
      indication: 'Ansiedade de transporte e consulta veterinária felina — protocolo ensaio Stevens et al. 2016',
      doseMin: 50,
      doseMax: 50,
      doseUnit: 'mg',
      perWeightUnit: 'por gato',
      route: 'VO',
      frequency: 'dose única 60 a 120 minutos antes do transporte',
      notes:
        'Dose fixa padrão por felino adulto validada em ensaio clínico duplo-cego, randomizado, placebo-controlado e cruzado (Stevens et al. 2016). Reduz sensivelmente a resistência à caixa de transporte e facilita o exame físico. O efeito adverso mais comum é sonolência transitória (durando cerca de 4 a 6 horas). Em gatos jovens muito leves (<2,5 kg), pode-se fracionar o comprimido para 25 mg.',
      calculatorEnabled: false,
      presentationId: 'pres-trazo-donaren-50',
    },
    {
      id: 'dose-trazo-cat-oral-sedation',
      species: 'cat',
      indication: 'Sedação oral para procedimentos clínicos e ecocardiograma felino — faixa Plumb / estudos 2025',
      doseMin: 50,
      doseMax: 100,
      doseUnit: 'mg',
      perWeightUnit: 'por gato',
      route: 'VO',
      frequency: 'dose única antes do procedimento',
      notes:
        'Doses de 50 mg a 100 mg por gato foram avaliadas para sedação de exames. A dose de 100 mg/gato induz sedação mais profunda e rápida, porém causa uma redução transitória média na pressão arterial sistólica de cerca de 22 mmHg (estudo de 2025). Recomenda-se iniciar estritamente com 50 mg/gato em animais com suspeita de cardiopatia ou geriátricos.',
      calculatorEnabled: false,
      presentationId: 'pres-trazo-donaren-50',
    },
  ],

  presentations: [
    {
      id: 'pres-trazo-donaren-50',
      name: 'Donaren 50 mg Comprimidos Revestidos Sulcados (Apsen)',
      form: 'comprimido',
      concentrationValue: 50,
      concentrationUnit: 'mg',
      scoringInfo: 'Comprimido revestido sulcado com divisão uniforme em 2 partes de 25 mg',
      route: 'VO',
      packageDescription:
        'Comprimido revestido com sulco central que permite divisão precisa em duas metades simétricas de 25 mg. Não triturar nem macerar em água se possível, administrando inteiro ou dividido envolto em pequena quantidade de alimento úmido.',
    },
    {
      id: 'pres-trazo-donaren-100',
      name: 'Donaren 100 mg Comprimidos Revestidos (Apsen)',
      form: 'comprimido',
      concentrationValue: 100,
      concentrationUnit: 'mg',
      scoringInfo: 'Não deve ser partido',
      route: 'VO',
      packageDescription:
        'Comprimido revestido sem sulco funcional. Segundo o fabricante Apsen, não deve ser partido ou esmagado para não comprometer a biodisponibilidade e integridade do núcleo.',
    },
    {
      id: 'pres-trazo-caps-magistral',
      name: 'Cloridrato de Trazodona Cápsulas Magistrais Veterinárias (10 mg a 100 mg)',
      form: 'cápsula',
      concentrationValue: 10,
      concentrationUnit: 'mg',
      packInfo: 'Cápsulas manipuladas sob medida de 10 mg, 20 mg, 25 mg ou 50 mg',
      route: 'VO',
      packageDescription:
        'Manipulação personalizada para cães miniatura e gatos (<3 kg) que demandam doses de 10 mg, 15 mg, 20 mg ou 25 mg, evitando o risco de quebra imperfeita de comprimidos. Utilizar excipiente inerte seco e cápsulas de tamanho veterinário compatível.',
    },
    {
      id: 'pres-trazo-susp-magistral',
      name: 'Cloridrato de Trazodona Suspensão Oral Veterinária 10 mg/mL',
      form: 'suspensão',
      concentrationValue: 10,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco com seringa dosadora graduada em mL (nunca gotas)',
      route: 'VO',
      packageDescription:
        'Veículo aquoso semissintético palatável sem açúcar, sem álcool e estritamente isento de xilitol (risco fatal de hipoglicemia e necrose hepática aguda em cães). Frasco âmbar com seringa dosadora graduada em mililitros. Agitar vigorosamente antes da administração.',
    },
  ],

  pharmacokineticsData: {
    absorption:
      'Cães: biodisponibilidade oral absoluta elevada de 84,6 ± 13,2% (Jay et al., 2013). Tempo para atingir a concentração sérica máxima (Tmax) extremamente disperso e variável entre indivíduos (média de 445 ± 271 minutos, oscilando entre 1 e mais de 11 horas). Em cães, a ingestão alimentar pode atrasar o Tmax e aumentar a exposição global em humanos, porém o impacto cinotécnico exato não está quantificado em carnívoros. Gatos: biodisponibilidade oral média de 54,9% com variação interindividual brutal (faixa de 7% a 96% em Tucker et al., 2023); quando coadministrada com gabapentina, a biodisponibilidade oral no felino sofreu redução expressiva para 17,2%.',
    distribution:
      'Composto lipofílico com penetração ampla no SNC através da barreira hematoencefálica (BHE). Volume de distribuição canino (Vd) após administração intravenosa de 2,53 ± 0,47 L/kg. As concentrações teciduais encefálicas excedem os níveis séricos precocemente. A taxa de ligação a proteínas plasmáticas é de aproximadamente 90% a 95% em humanos.',
    metabolism:
      'Extensa metabolização microssomal hepática via clivagem oxidativa, gerando o metabólito farmacologicamente ativo m-clorofenilpiperazina (mCPP), responsável por efeitos serotoninérgicos secundários e eventual agitação paradoxal. Outras vias oxidativas e hidroxilações formam metabólitos inativos polares adicionais.',
    elimination:
      'Meia-vida plasmática de eliminação canina (t1/2) de aproximadamente 2,8 horas (166 ± 47 minutos); clearance sistêmico de 11,15 ± 3,56 mL/kg/min (669 ± 214 mL/kg/h). Meia-vida felina mais longa, em torno de 5,1 ± 2,6 horas. Excreção de metabólitos inativos majoritariamente renal (70% a 75%) e biliar/fecal (aproximadamente 21%). Menos de 1% é excretado inalterado pela urina.',
    cnsPenetration:
      'Elevada passagem pela barreira hematoencefálica com concentrações cerebrais precoces excedendo os níveis séricos circulantes.',
    halfLife: 'Cães: ~2,8 horas (166 ± 47 min); Gatos: ~5,1 horas (5,1 ± 2,6 h).',
    plasmaBinding: '~90% a 95% (referência em dados humanos; ampla distribuição tecidual).',
  },

  practicalWeightTable: {
    standardDoseText:
      'Referência prática de dose canina inicial usual de 5,0 mg/kg VO para ansiedade situacional e pré-visita (comprimidos imediatos de Donaren 50 mg sulcado ou solução manipulada 10 mg/mL).',
    headers: ['Peso do Cão', 'Dose Alvo (5 mg/kg)', 'Donaren 50 mg (Comprimido Sulcado)', 'Suspensão Manipulada 10 mg/mL (mL)'],
    rows: [
      {
        weight: '2 kg',
        totalDose: '10 mg',
        col1: 'Fracionamento imperfeito — preferir manipulação',
        col2: '1,0 mL (seringa dosadora)',
      },
      {
        weight: '4 kg',
        totalDose: '20 mg',
        col1: 'Fracionamento imperfeito — preferir manipulação',
        col2: '2,0 mL (seringa dosadora)',
      },
      {
        weight: '5 kg',
        totalDose: '25 mg',
        col1: '½ (meio) comprimido de 50 mg',
        col2: '2,5 mL',
      },
      {
        weight: '10 kg',
        totalDose: '50 mg',
        col1: '1 comprimido inteiro de 50 mg',
        col2: '5,0 mL',
      },
      {
        weight: '15 kg',
        totalDose: '75 mg',
        col1: '1 e ½ comprimido de 50 mg',
        col2: '7,5 mL',
      },
      {
        weight: '20 kg',
        totalDose: '100 mg',
        col1: '2 comprimidos de 50 mg (ou 1 comp de 100 mg)',
        col2: '10,0 mL',
      },
      {
        weight: '30 kg',
        totalDose: '150 mg',
        col1: '3 comprimidos de 50 mg',
        col2: '15,0 mL',
      },
      {
        weight: '40 kg',
        totalDose: '200 mg',
        col1: '4 comprimidos de 50 mg (ou 2 comp de 100 mg)',
        col2: '20,0 mL',
      },
    ],
    dropletCalibrator: {
      title: 'Regra de Segurança de Formulações Líquidas Magistrais',
      concentration: 'Cloridrato de trazodona suspensão oral 10 mg/mL',
      dropletRatio: 'NÃO UTILIZAR CONTAGEM DE GOTAS',
      practicalRule:
        'A viscosidade de suspensões magistrais varia conforme o polímero suspensor e o tipo de frasco gotejador. Prescrever e dosar estritamente em MILILITROS (mL) utilizando seringas dosadoras orais graduadas de 1 mL, 3 mL ou 5 mL.',
      note: 'Veículo oral estritamente sem açúcar, sem álcool e isento de xilitol (risco fatal de hipoglicemia e necrose hepática em cães).',
    },
  },

  samplePrescriptionText:
    'MODELO 1 — ANSIEDADE SITUACIONAL PRÉ-VISITA E TRANSPORTE FEAR FREE (CÃO 10 KG):\n' +
    'RECEITA DE CONTROLE ESPECIAL — 2 VIAS (LISTA C1 DA PORTARIA SVS/MS Nº 344/1998)\n\n' +
    'USO ORAL\n' +
    '1. Donaren (cloridrato de trazodona) 50 mg comprimidos revestidos sulcados ------------------ 1 caixa (60 comprimidos)\n' +
    '   Posologia: Administrar 1 (um) comprimido (50 mg, equivalente a 5 mg/kg) por via oral, envolto em pequena porção de alimento palatável ou petisco pastoso, rigorosamente 1 hora e meia a 2 horas antes da saída de casa para a clínica veterinária ou do início de eventos de estresse sonoro (fogos de artifício, tempestades).\n' +
    '   Orientações Mandatórias ao Tutor:\n' +
    '   - Realizar preferencialmente uma dose-teste prévia em domicílio num dia calmo, sem visitas ou estímulos estressantes, para averiguar a resposta individual e descartar sedação excessiva, ataxia ou eventual excitação paradoxal.\n' +
    '   - Durante o período de ação do medicamento (que perdura por 6 a 12 horas), mantenha o animal em piso antiderrapante e com acesso estritamente bloqueado a escadas, lajes, sacadas, piscinas e sofás altos.\n' +
    '   - Não associar por conta própria a outros medicamentos sedativos, tramadol, antidepressivos ou analgésicos fortes sem prévia autorização veterinária.\n' +
    '   - Caso observe tremores musculares finos, febre, rigidez, salivação contínua ou agitação extrema, suspenda o uso e procure imediatamente atendimento hospitalar veterinário.\n' +
    '   - Receita de Controle Especial em 2 vias com validade de 30 dias a partir da data de emissão.\n\n' +
    'MODELO 2 — MANEJO CAT FRIENDLY, TRANSPORTE E CONSULTA (GATO ADULTO 4 KG):\n' +
    'RECEITA DE CONTROLE ESPECIAL — 2 VIAS (LISTA C1 DA PORTARIA SVS/MS Nº 344/1998)\n\n' +
    'USO ORAL\n' +
    '1. Donaren (cloridrato de trazodona) 50 mg comprimidos revestidos sulcados ------------------ 1 caixa (60 comprimidos)\n' +
    '   Posologia: Administrar 1 (um) comprimido inteiro de 50 mg (ou 1/2 comprimido de 25 mg para gatos abaixo de 2,5 kg) por via oral, envolvido em petisco altamente palatável (churu) ou administrado com aplicador oral de comprimidos, aproximadamente 1 a 2 horas antes de colocar o felino na caixa de transporte para ida à consulta.\n' +
    '   Orientações ao Tutor:\n' +
    '   - Mantenha o gato em cômodo silencioso e com luz suave antes da colocação na caixa de transporte.\n' +
    '   - O felino pode apresentar andar cambaleante leve e protusão visível da terceira pálpebra (pele esbranquiçada no canto interno dos olhos), o que representa um efeito farmacológico esperado e reversível.\n' +
    '   - Nunca force a ingestão com água na boca de felinos para evitar aspiração traqueal acidental.\n' +
    '   - Receita válida por 30 dias a partir da data de emissão em território nacional.\n\n' +
    'MODELO 3 — SUSPENSÃO ORAL MAGISTRAL ISENTA DE XILITOL PARA CÃES MINIATURA (3 KG):\n' +
    'RECEITA DE CONTROLE ESPECIAL — 2 VIAS (LISTA C1 DA PORTARIA SVS/MS Nº 344/1998)\n\n' +
    'USO ORAL — FORMULAÇÃO MAGISTRAL VETERINÁRIA\n' +
    '1. Cloridrato de trazodona suspensão oral 10 mg/mL (em veículo aquoso aromatizado sem açúcar, sem álcool e estritamente ISENTO DE XILITOL) ------------------ 1 frasco de 30 mL com seringa dosadora de 1 mL\n' +
    '   Posologia: Administrar 1,5 mL (15 mg da droga, dose de 5 mg/kg) por via oral 90 a 120 minutos antes do evento de estresse (ou a cada 12 horas conforme prescrição médica).\n' +
    '   ATENÇÃO FARMÁCIA MAGISTRAL: Formulação estritamente isenta de xilitol (adoçante tóxico letal para a espécie canina). Agitar bem antes de dosar.',

  attentionData: {
    attentionSubtitle:
      'SARI modulador serotoninérgico e bloqueador alfa-1 adrenérgico; risco de síndrome serotoninérgica com outros serotoninérgicos e IMAOs; vasodilatação e hipotensão; inibição plaquetária in vitro; interferência diagnóstica no exame neurológico e no teste com ACTH.',
    precautions: [
      {
        condition: 'Associação com IMAOs e Síndrome Serotoninérgica',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A inibição da MAO combinada à inibição da recaptação pelo SERT e modulação serotoninérgica provoca acúmulo descontrolado de serotonina nos receptores centrais e periféricos.',
        clinicalAction:
          'Contraindicação absoluta. Respeitar washout estrito de no mínimo 14 dias entre a suspensão de selegilina/amitraz e o início da trazodona. Se houver hipertermia, tremores e rigidez, suspender imediatamente e instituir suporte hospitalar e ciproeptadina.',
      },
      {
        condition: 'Coagulopatias, Trombocitopenias e Cirurgias de Risco',
        alertLevel: 'warning',
        physiologicalExplanation:
          'O bloqueio continuado de SERT reduz o reservatório de serotonina nas plaquetas circulantes e deprime a agregação plaquetária in vitro (queda de 95% para 62% comprovada por Benjamin et al., 2023).',
        clinicalAction:
          'Avaliar com cautela redobrada em pacientes com trombocitopenia imune, doença de von Willebrand ou sob uso de AINEs/aspirina. Evitar iniciar imediatamente antes de cirurgias com alto risco hemorrágico.',
      },
      {
        condition: 'Investigação do Eixo Adrenal (Teste de Estimulação com ACTH)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'A trazodona atenua de forma comprovada as concentrações de cortisol pós-estímulo e o delta de cortisol sérico no cão hígido (Brown et al., 2024), simulando hiporresponsividade adrenal.',
        clinicalAction:
          'Suspender a administração da trazodona antes da realização de testes de estimulação com ACTH para triagem de hipoadrenocorticismo, hiperadrenocorticismo ou monitoramento de trilostano.',
      },
      {
        condition: 'Consulta e Exame Físico Neurológico de Rotina',
        alertLevel: 'caution',
        physiologicalExplanation:
          'O fármaco deprime as reações posturais proprioceptivas e induz ataxia em animais normais, podendo mimetizar déficits neurológicos estruturais.',
        clinicalAction:
          'Registrar sempre no prontuário se o cão ou gato recebeu trazodona prévia e orientar o especialista para evitar diagnósticos equivocados de mielopatia ou neuropatia.',
      },
      {
        condition: 'Hipotensão Arterial, Cardiopatias e Choque',
        alertLevel: 'caution',
        physiologicalExplanation:
          'O antagonismo competitivo sobre receptores alfa-1 adrenérgicos promove vasodilatação sistêmica arteriolar e redução da pressão arterial sistólica.',
        clinicalAction:
          'Contraindicada em choque descompensado e hipovolemia. Em gatos e cardiopatas sob IECA, amlodipina ou telmisartana, monitorar a PAS seriadamente e iniciar com doses conservadoras.',
      },
      {
        condition: 'Glaucoma de Ângulo Fechado',
        alertLevel: 'caution',
        physiologicalExplanation:
          'A ação antimuscarínica fraca e a modulação autonômica podem causar dilatação pupilar discreta (midríase), ocluindo o ângulo iridocorneano.',
        clinicalAction:
          'Evitar em pacientes com predisposição anatômica a fechamento angular ou glaucoma agudo pré-existente.',
      },
    ],
    adverseEffectsDetailed: [
      {
        effect: 'Sedação Excessiva, Letargia e Decúbito Prolongado',
        frequency: 'common',
        mechanism: 'Bloqueio de receptores 5-HT2A, antagonismo alfa-1 adrenérgico e anti-histamínico H1 central.',
        clinicalManagement: 'Esperado na maioria dos pacientes. Orientar repouso em ambiente calmo e reduzir a dose subsequente se excessiva.',
      },
      {
        effect: 'Ataxia Locomotora e Incoordenação Motora',
        frequency: 'common',
        mechanism: 'Redução do tônus muscular simpático e depressão central de vias proprioceptivas.',
        clinicalManagement: 'Manter em pisos antiderrapantes; bloquear acesso a escadas e superfícies elevadas para prevenir traumas.',
      },
      {
        effect: 'Desinibição Comportamental e Excitação Paradoxal (Vocalização, Pacing, Inquietação)',
        frequency: 'uncommon',
        mechanism: 'Ação agonista do metabólito ativo m-clorofenilpiperazina (mCPP) sobre receptores 5-HT2C e redução de inibição cortical.',
        clinicalManagement: 'NÃO aumentar a dose sob suposição de que o animal "precisa de mais calmante". Suspender o uso e optar por outra classe farmacológica.',
      },
      {
        effect: 'Distúrbios Gastrointestinais (Salivação, Vômitos, Gagging e Diarreia Transitória)',
        frequency: 'uncommon',
        mechanism: 'Estimulação local de receptores serotoninérgicos entéricos e reflexos centrais na área postrema.',
        clinicalManagement: 'Administrar acompanhada de pequena porção de alimento ou petisco pastoso. Quadro costuma ser autolimitado.',
      },
      {
        effect: 'Hipotensão Arterial Sistêmica',
        frequency: 'uncommon',
        mechanism: 'Bloqueio competitivo de receptores alfa-1 adrenérgicos no leito vascular periférico.',
        clinicalManagement: 'Aferir a PAS. Se sintomática, instituir fluidoterapia de suporte; em felinos, priorizar doses de 50 mg/gato.',
      },
      {
        effect: 'Protrusão Bilateral de Terceira Pálpebra em Felinos',
        frequency: 'common',
        mechanism: 'Relaxamento simpático pós-ganglionar no músculo orbital liso de Müller.',
        clinicalManagement: 'Tranquilizar o tutor de que se trata de efeito farmacológico temporário e completamente reversível em algumas horas.',
      },
      {
        effect: 'Priapismo em Machos e Hepatotoxicidade Rara',
        frequency: 'rare',
        mechanism: 'Priapismo mediado por bloqueio alfa-1 peniano; hepatotoxicose idiossincrática por metabólitos reativos.',
        clinicalManagement: 'Priapismo persistente exige descompressão cirúrgica de emergência. Em hepatotoxicidade com ALT elevada, suspender imediatamente.',
      },
      {
        effect: 'Síndrome Serotoninérgica Grave (Hipertermia, Mioclonias, Rigidez, Coma)',
        frequency: 'overdose',
        mechanism: 'Hiperestimulação maciça de receptores 5-HT1A e 5-HT2 centrais por sobredosagem ou polifarmácia com tramadol/IMAO/SSRIs.',
        clinicalManagement: 'Emergência médica: suspender todos os serotoninérgicos, resfriamento ativo, sedação com benzodiazepínicos e administração de ciproeptadina.',
      },
    ],
    doseReductionGuidelines: [
      {
        clinicalCondition: 'Doença Renal Crônica Estágios IRIS 1 e 2',
        recommendedAdjustment: 'IRIS 1: dose usual; IRIS 2: iniciar na extremidade inferior da faixa (2 a 4 mg/kg no cão).',
        physiologicalRationale: 'Não há excreção significativa de trazodona inalterada pelos rins, mas metabólitos polares podem se acumular.',
      },
      {
        clinicalCondition: 'Doença Renal Crônica Avançada (IRIS 3 e 4)',
        recommendedAdjustment: 'Reduzir a dose inicial para 2 a 3 mg/kg no cão; em gatos, considerar 25 mg/gato e espaçar o intervalo.',
        physiologicalRationale: 'A uremia altera a barreira hematoencefálica e a ligação a proteínas, aumentando a sensibilidade sedativa e o risco hipotensivo.',
      },
      {
        clinicalCondition: 'Insuficiência Hepática Crônica Compensada',
        recommendedAdjustment: 'Reduzir a dose em 30% a 50% e estender os intervalos entre doses.',
        physiologicalRationale: 'A metabolização da trazodona e a formação de metabólitos dependem estritamente da biotransformação microssomal hepática.',
      },
      {
        clinicalCondition: 'Insuficiência Hepática Severa Descompensada',
        recommendedAdjustment: 'Evitar o uso de trazodona; preferir manejo comportamental ambiental não medicamentoso.',
        physiologicalRationale: 'A perda de função hepatocelular compromete gravemente a depuração, com risco de sedação prolongada e descompensação encefalopática.',
      },
      {
        clinicalCondition: 'Pacientes Geriátricos Debilitados com Sarcopenia',
        recommendedAdjustment: 'Iniciar com dose-teste reduzida (2,5 mg/kg no cão; 25 mg no gato) antes de qualquer evento.',
        physiologicalRationale: 'Idosos possuem maior vulnerabilidade a hipotensão, ataxia e quedas acidentais com fraturas decorrentes da perda de tônus postural.',
      },
      {
        clinicalCondition: 'Obesidade Severa (Escore Corporal 8/9 ou 9/9)',
        recommendedAdjustment: 'Calcular a dose com base no peso magro estimado (peso corporal ideal) do animal.',
        physiologicalRationale: 'A dosagem baseada estritamente no peso balança excessivo pode resultar em superdosagem e sedação profunda indesejada.',
      },
    ],
    drugInteractionsDetailed: [
      {
        drugOrClass: 'Inibidores da MAO (Selegilina, Amitraz, Linezolida)',
        severity: 'contraindicated',
        clinicalEffect: 'Risco iminente de crise serotoninérgica potencialmente fatal, hipertermia extrema e colapso circulatório.',
        pharmacologicalMechanism: 'Inibição combinada da degradação e da recaptação de serotonina com hiperativação de receptores centrais.',
      },
      {
        drugOrClass: 'Tramadol',
        severity: 'major',
        clinicalEffect: 'Aumento expressivo do risco de Síndrome Serotoninérgica (tremores, mioclonias, rigidez, hipertermia).',
        pharmacologicalMechanism: 'Duplo aumento da atividade serotoninérgica sináptica (tramadol inibe a recaptação de 5-HT e NA).',
      },
      {
        drugOrClass: 'Antidepressivos SSRIs e TCAs (Fluoxetina, Sertralina, Clomipramina, Amitriptilina)',
        severity: 'major',
        clinicalEffect: 'Elevação da suscetibilidade a toxicidade serotoninérgica e sedação profunda aditiva.',
        pharmacologicalMechanism: 'Inibição concomitante de SERT por múltiplas vias; associação utilizada por especialistas mas que exige monitoramento contínuo.',
      },
      {
        drugOrClass: 'Mirtazapina',
        severity: 'major',
        clinicalEffect: 'Depressão pronunciada do SNC, potencialização serotoninérgica e prolongamento teórico do intervalo QT.',
        pharmacologicalMechanism: 'Somação de antagonismos serotoninérgicos e sedação por receptores H1 centrais.',
      },
      {
        drugOrClass: 'Gabapentina e Pregabalina',
        severity: 'moderate',
        clinicalEffect: 'Sedação e ataxia aditivas benéficas ou excessivas; no felino, redução comprovada da biodisponibilidade da trazodona de 54,9% para 17,2%.',
        pharmacologicalMechanism: 'Depressão central sinérgica associada a alteração farmacocinética de absorção intestinal comprovada por Tucker et al. (2023).',
      },
      {
        drugOrClass: 'Opioides (Metadona, Morfina, Buprenorfina) e Benzodiazepínicos',
        severity: 'moderate',
        clinicalEffect: 'Sedação profunda aditiva, relaxamento muscular excessivo e potencial depressão respiratória.',
        pharmacologicalMechanism: 'Somação de efeitos inibitórios em vias neurais centrais e formação reticular ativadora.',
      },
      {
        drugOrClass: 'AINEs (Meloxicam, Carprofeno), Aspirina e Anticoagulantes',
        severity: 'moderate',
        clinicalEffect: 'Potencial aumento no risco de sangramentos gastrointestinais e hemostasia comprometida.',
        pharmacologicalMechanism: 'A inibição de SERT reduz o conteúdo de serotonina das plaquetas, deprimindo a agregação hemostática primária.',
      },
      {
        drugOrClass: 'Antifúngicos Azóis (Cetoconazol, Itraconazol) e Macrolídeos',
        severity: 'moderate',
        clinicalEffect: 'Aumento da concentração plasmática de trazodona com sedação e hipotensão prolongadas.',
        pharmacologicalMechanism: 'Inibição enzimática microssomal hepática do citocromo P450 responsável pela depuração da trazodona.',
      },
      {
        drugOrClass: 'Anti-hipertensivos e Vasodilatadores (Amlodipina, Telmisartana, Enalapril)',
        severity: 'moderate',
        clinicalEffect: 'Potencialização do efeito vasodilatador com risco de hipotensão arterial sintomática.',
        pharmacologicalMechanism: 'Somação do bloqueio alfa-1 adrenérgico periférico da trazodona com a redução da resistência vascular sistêmica.',
      },
      {
        drugOrClass: 'Fármacos que Prolongam o Intervalo QT (Ondansetrona, Cisaprida, Fluoroquinolonas)',
        severity: 'moderate',
        clinicalEffect: 'Risco teórico aumentado de alterações eletrocardiográficas em pacientes cardiopatas suscetíveis.',
        pharmacologicalMechanism: 'Embora o estudo de Benjamin (2023) não tenha demonstrado aumento do QTc em cães hígidos, a somação eletrofisiológica exige cautela.',
      },
      {
        drugOrClass: 'Carbamazepina e Fenobarbital',
        severity: 'moderate',
        clinicalEffect: 'Queda substancial na concentração plasmática de trazodona e possível perda de eficácia ansiolítica.',
        pharmacologicalMechanism: 'Indução de enzimas microssomais hepáticas acelerando a depuração e clivagem da droga parental.',
      },
    ],
    dilutionGuide: {
      compatibleFluids: [
        'Formulação exclusivamente oral; não aplicável infusão parenteral rotineira.',
      ],
      incompatibleFluids: [
        'A via intravenosa (IV) direta é estritamente contraindicada na rotina clínica.',
      ],
      infusionRateGuidance:
        'VIA INTRAVENOSA NÃO RECOMENDADA CLINICAMENTE: estudo experimental canino (Jay et al., 2013) sob infusão de 8 mg/kg IV resultou em taquicardia sinusal em 100% dos animais e desinibição agressiva/ataque paradoxal em 50% dos cães. A existência de ensaio farmacocinético IV não valida protocolo clínico intravenoso.',
      preparationNotes:
        'Para cães de pequeno porte e gatos que demandam doses não contempladas pelos comprimidos de 50 mg (partíveis em 25 mg), prescrever formulação magistral veterinária líquida a 10 mg/mL ou cápsulas sob medida, sempre com veículo isento de álcool e sem xilitol.',
      storageRequirements:
        'Conservar os comprimidos e formulações manipuladas em temperatura ambiente entre 15°C e 30°C, protegidos da luz, calor e umidade excessiva.',
    },
  },

  generalInfoData: {
    routesDetailed: [
      {
        route: 'Oral (VO) — Via Padrão de Escolha Clínica',
        technique:
          'Administrar os comprimidos revestidos ou cápsulas manipuladas diretamente na boca ou misturados a pequena porção de alimento úmido ou petisco palatável. Manter consistência na administração com ou sem alimento.',
        nursingCare:
          'Orientar o tutor a administrar a dose com 1,5 a 2 horas de antecedência ao evento ansiogênico no cão e 1 a 2 horas no gato. Manter o paciente em ambiente tranquilo e seguro.',
        limitations:
          'Em gatos de difícil manipulação oral, a administração pode exigir aplicadores de comprimidos ou manipulação em suspensão oral aromatizada sem açúcar.',
      },
      {
        route: 'Intravenosa (IV) — ❌ CONTRAINDICADA NA ROTINA CLÍNICA',
        technique:
          'Não deve ser utilizada na rotina médica de cães e gatos.',
        nursingCare:
          'Estudo de Jay et al. (2013) com 8 mg/kg IV provocou taquicardia sinusal imediata em 6/6 cães e comportamento agressivo de desinibição com tentativas de mordedura em 3/6 cães.',
        limitations:
          'Ausência completa de formulação parenteral veterinária aprovada e perfil de reações adversas inaceitável.',
      },
      {
        route: 'Retal — Via Experimental Não Rotineira',
        technique:
          'Avaliada em ensaios experimentais sob dose de 8 mg/kg em cães sadios.',
        nursingCare:
          'Observar possíveis fezes amolecidas ou expulsão da forma farmacêutica.',
        limitations:
          'Apresenta biodisponibilidade muito inferior à via oral (~30%), com absorção errática que não justifica seu uso na rotina clínica.',
      },
      {
        route: 'Intramuscular (IM) e Subcutânea (SC)',
        technique: 'Não recomendadas.',
        nursingCare: 'Não há formulação aprovada ou dados de absorção tecidual confiáveis.',
        limitations: 'Potencial de dor à injeção, precipitação do princípio ativo e ausência de protocolos validados.',
      },
    ],

    pharmacologicalClassification: {
      chemicalClass: 'Derivado Triazolopiridínico / Fenilpiperazínico',
      chemicalClassDescription:
        'Composto orgânico heterocíclico sintético de fórmula molecular C19H22ClN5O (trazodona base, 371,9 g/mol) e C19H23Cl2N5O (cloridrato de trazodona, 408,3 g/mol). Exibe lipofilicidade moderada a elevada (XLogP ~2,8) facilitando rápida transposição da barreira hematoencefálica, com pKa aquoso de base fraca próximo a 6,7–6,8.',
      therapeuticClass: 'SARI — Modulador Serotoninérgico e Ansiolítico Fear Free',
      therapeuticClassDescription:
        'Antidepressivo atípico pertencente à classe SARI (Serotonin Antagonist and Reuptake Inhibitor) com potente ação antagonista sobre receptores 5-HT2A e 5-HT2C, inibição seletiva do transportador SERT e bloqueio alfa-1 adrenérgico.',
      atcCode: 'N06AX05',
      receptorTargets: [
        'Receptores Serotoninérgicos 5-HT2A Pós-sinápticos',
        'Receptores Serotoninérgicos 5-HT2C Pós-sinápticos',
        'Transportador de Recaptação de Serotonina (SERT)',
        'Receptores Alfa-1 Adrenérgicos Vasculares e Centrais',
        'Receptores Histaminérgicos H1 Centrais',
      ],
      receptorsAndSites: [
        {
          name: 'Receptor Serotoninérgico 5-HT2A',
          type: 'Receptor acoplado à proteína Gq',
          action: 'Antagonismo competitivo potente de alta afinidade nanomolar',
          clinicalEffect:
            'Bloqueio da via intracelular PLC-IP3/DAG com redução do influxo de cálcio e PKC, extinguindo circuitos corticais e límbicos de hipervigilância, medo e ansiedade.',
        },
        {
          name: 'Transportador de Recaptação de Serotonina (SERT)',
          type: 'Transportador transmembrana de recaptação de monoaminas',
          action: 'Inibição moderada da recaptação de serotonina',
          clinicalEffect:
            'Aumento da permanência da serotonina na fenda sináptica, a qual é direcionada para receptores neuroprotetores 5-HT1A mediadores de tranquilização.',
        },
        {
          name: 'Receptor Alfa-1 Adrenérgico',
          type: 'Receptor adrenérgico vascular e central',
          action: 'Antagonismo competitivo moderado',
          clinicalEffect:
            'Redução do tônus simpático e tranquilização comportamental; promove vasodilatação periférica com potencial redutor de pressão arterial sistólica.',
        },
        {
          name: 'Receptor Histaminérgico H1 Central',
          type: 'Receptor acoplado à via de vigília cerebral',
          action: 'Antagonismo moderado',
          clinicalEffect:
            'Indução de sonolência e facilitação de sedação comportamental.',
        },
        {
          name: 'Receptor 5-HT2C via Metabólito mCPP',
          type: 'Receptor serotoninérgico acoplado à proteína Gq',
          action: 'Agonismo serotoninérgico exercido pelo metabólito mCPP',
          clinicalEffect:
            'Explica respostas paradoxais ocasionais de inquietação, vocalização e desinibição comportamental em animais suscetíveis.',
        },
      ],
      detailedTargets: [
        {
          target: 'Receptor 5-HT2A Cortical e Límbico',
          action: 'Bloqueio do sinal Gq excitatório',
          clinicalSignificance: 'Ansiólise situacional primária e controle de fobia de consultório e transporte.',
        },
        {
          target: 'Transportador SERT Pré-sináptico',
          action: 'Inibição de recaptação de 5-HT',
          clinicalSignificance: 'Aumento de serotonina sináptica com redirecionamento funcional para receptores 5-HT1A.',
        },
        {
          target: 'Receptor Alfa-1 Vascular',
          action: 'Vasodilatação periférica',
          clinicalSignificance: 'Potencial hipotensor sistêmico, especialmente relevante em felinos e cardiopatas.',
        },
        {
          target: 'Transportador SERT Plaquetário',
          action: 'Depleção de serotonina intraplaquetária',
          clinicalSignificance: 'Redução da agregação plaquetária in vitro (95% para 62% no cão hígido).',
        },
      ],
    },

    prescriptionType: {
      category: 'Receita de Controle Especial em 2 Vias (Lista C1 - Outras substâncias sujeitas a controle especial)',
      ordinanceOrLaw: 'Portaria SVS/MS nº 344/1998 e RDC ANVISA nº 1.023/2026',
      retentionRequired: true,
      guidelines:
        'A trazodona é uma substância controlada classificada na Lista C1 da Portaria 344/98 da Anvisa. Sua prescrição veterinária exige Receita de Controle Especial em duas (2) vias brancas. A primeira via é retida pela drogaria ou farmácia de manipulação no momento da dispensação, e a segunda via é carimbada e devolvida ao tutor para acompanhamento da administração. A receita possui prazo de validade legal de 30 dias contados a partir da data de emissão em território nacional, com limite de fornecimento de até 60 dias de tratamento para apresentações orais. A Anvisa estabeleceu a obrigatoriedade da Versão 2 física para novas impressões a partir de 18/05/2026, com disponibilização da etapa eletrônica integrada ao SNCR em 30/09/2026.',
    },

    speciesPeculiarities: [
      {
        species: 'dog',
        title: 'Dispersão Extrema do Tmax Canino (~7,4 ± 4,5 h) e Meia-Vida Curta (~2,8 h)',
        description:
          'Em cães saudáveis (Jay et al., 2013), a biodisponibilidade oral é excelente (~85%), mas o tempo para concentração plasmática de pico (Tmax) varia de 1 a mais de 11 horas (média de 445 ± 271 minutos). Embora o relaxamento clínico comece frequentemente em 45 a 90 minutos, essa enorme dispersão individual explica por que alguns cães respondem rapidamente enquanto outros demandam 2 horas ou mais. Realizar uma dose-teste domiciliar prévia é conduta mandatória.',
        clinicalImplications:
          'Nunca prescrever pela primeira vez no dia de um procedimento crítico sem teste de sensibilidade prévio.',
      },
      {
        species: 'cat',
        title: 'Variabilidade Brutal de Absorção (7–96%), t½ de ~5 h e Efeito Hipotensor a 100 mg',
        description:
          'Gatos exibem biodisponibilidade oral média de 54,9%, mas com oscilação extrema entre 7% e 96% entre indivíduos (Tucker et al., 2023). A meia-vida felina é mais longa (~5,1 horas). Quando associada à gabapentina, a absorção oral da trazodona cai expressivamente para 17,2%. Além disso, estudo de 2025 demonstrou que doses de 100 mg/gato provocam queda média transitória de cerca de 22 mmHg na pressão arterial sistólica. A dose fixa de 50 mg/gato possui respaldo direto por ensaio clínico randomizado duplo-cego (Stevens et al., 2016).',
        clinicalImplications:
          'Iniciar conservadoramente com 50 mg/gato (ou 25 mg se <2,5 kg); monitorar pressão arterial em gatos idosos ou cardiopatas.',
      },
    ],

    curiositiesAndHistory: [
      'Desenvolvida na Itália na década de 1960 pelos Laboratórios de Pesquisa Angelini como um antidepressivo de segunda geração estruturado para contornar os graves efeitos anticolinérgicos e cardiotóxicos dos tricíclicos clássicos.',
      'Na medicina humana, consolidou-se como um dos hipnóticos e moduladores do sono mais prescritos mundialmente devido ao efeito sedativo mediado pelo bloqueio 5-HT2A e alfa-1.',
      'Sua consagração na medicina veterinária ocorreu na década de 2010 como um dos principais pilares do movimento Fear Free e do bem-estar animal, transformando o manejo de visitas veterinárias, viagens e repouso pós-cirúrgico de cães e gatos.',
    ],
  },

  clinicalStudiesCommented: [
    {
      title: 'Farmacocinética, biodisponibilidade e efeitos hemodinâmicos da trazodona IV e VO em cães',
      authorsYear: 'Jay AR, Krotscheck U, Parsley E, et al. (2013)',
      journal: 'American Journal of Veterinary Research (AJVR. 2013;74(11):1450–1456)',
      studyDesign: 'Ensaio farmacocinético experimental randomizado cruzado (crossover)',
      sampleSize: '6 cães Beagles hígidos',
      mainFindings:
        'A administração de 8 mg/kg VO demonstrou biodisponibilidade absoluta de 84,6 ± 13,2%, Cmax de 1,3 ± 0,5 µg/mL e meia-vida de 166 ± 47 minutos (~2,8 h). O Tmax foi extremamente disperso (445 ± 271 min, oscilando entre 1 e 11 horas). A administração IV de 8 mg/kg induziu taquicardia sinusal em 6/6 cães e agressão/desinibição em 3/6 animais.',
      clinicalTakeaway:
        'A absorção oral é ampla mas exibe latência altamente imprevisível entre cães. A via intravenosa não deve ser utilizada clinicamente pelo risco inaceitável de taquicardia e desinibição agressiva.',
      referenceId: 'ref-jay-2013-trazodone-pk',
    },
    {
      title: 'Efeitos da trazodona nos sinais comportamentais e fisiológicos de estresse em cães durante consultas veterinárias',
      authorsYear: 'Kim SA, Borchardt MR, Lee K, Stelow EA, Bain MJ (2022)',
      journal: 'Journal of the American Veterinary Medical Association (JAVMA. 2022;260(8):876–883)',
      studyDesign: 'Ensaio clínico duplo-cego, randomizado, placebo-controlado e cruzado',
      sampleSize: '20 cães de clientes com histórico de fobia e estresse em consultas',
      mainFindings:
        'Administração de 9 a 12 mg/kg VO 90 minutos antes do transporte gerou redução estatisticamente significativa nos escores de estresse durante o exame físico (3,5 ± 1,0 vs 4,2 ± 0,8; P = 0,005). 90% dos tutores identificaram corretamente a visita sob trazodona devido ao relaxamento evidente.',
      clinicalTakeaway:
        'Evidência robusta (Nível 1b) que valida o uso de trazodona pré-visita em cães reativos, respaldando doses de até 9 a 12 mg/kg em animais previamente testados.',
      referenceId: 'ref-kim-2022-trazodone-previsit',
    },
    {
      title: 'Eficácia de dose única de trazodona antes de consultas para redução da ansiedade de transporte e exame em gatos',
      authorsYear: 'Stevens BJ, Frantz EM, Orlando JM, et al. (2016)',
      journal: 'Journal of the American Veterinary Medical Association (JAVMA. 2016;249(2):202–207)',
      studyDesign: 'Ensaio clínico duplo-cego, randomizado, placebo-controlado e cruzado',
      sampleSize: '10 gatos de clientes com ansiedade de transporte/consulta',
      mainFindings:
        'Dose fixa de 50 mg/gato VO administrada 60 a 120 minutos antes do transporte reduziu expressivamente os escores de estresse na viagem, facilitou a manipulação clínica e aumentou a cooperação no exame físico. Sonolência foi o efeito colateral mais frequente.',
      clinicalTakeaway:
        'Fundamento científico primordial para a prescrição de 50 mg/gato VO como padrão-ouro no manejo Cat Friendly de pré-consulta e viagens.',
      referenceId: 'ref-stevens-2016-trazodone-cat',
    },
    {
      title: 'Efeitos farmacocinéticos, sedativos e fisiológicos da trazodona isolada ou associada à gabapentina em felinos',
      authorsYear: 'Tucker LE, Sanchez A, Valverde A, et al. (2023)',
      journal: 'Journal of Veterinary Pharmacology and Therapeutics (JVPT. 2023;46(5):300–310)',
      studyDesign: 'Ensaio farmacocinético e farmacodinâmico experimental cruzado',
      sampleSize: '6 gatos machos hígidos',
      mainFindings:
        'A trazodona isolada (5 mg/kg VO) apresentou biodisponibilidade média de 54,9% com grande variabilidade (7% a 96%) e t1/2 de 5,1 ± 2,6 h. Quando coadministrada com gabapentina (10 mg/kg VO), a biodisponibilidade oral da trazodona caiu acentuadamente para 17,2%.',
      clinicalTakeaway:
        'Demonstra extrema variação interindividual de absorção no gato e adverte que a combinação empírica com gabapentina altera a cinética da trazodona, contraindicando a presunção de somação linear simples.',
      referenceId: 'ref-tucker-2023-trazodone-cat-pk',
    },
    {
      title: 'Efeitos adversos da trazodona na hemostasia primária e eletrocardiograma em cães',
      authorsYear: 'Benjamin EJ, Nelson OL, Baumwart R, et al. (2023)',
      journal: 'Journal of Veterinary Internal Medicine (JVIM. 2023;37(6):2131–2136)',
      studyDesign: 'Ensaio prospectivo cego, cruzado e controlado por placebo',
      sampleSize: '15 cães saudáveis sob 5 a 7,5 mg/kg VO q12h',
      mainFindings:
        'A trazodona provocou queda estatisticamente significativa na agregação plaquetária in vitro avaliada pelo Plateletworks (de 95% para 62%; P = 0,002). Não houve alteração significativa na contagem plaquetária total, BMBT, PFA-100 ou intervalo QTc no ECG.',
      clinicalTakeaway:
        'Comprova inibição funcional de agregação plaquetária via bloqueio de SERT no cão. Exige cautela em pacientes coagulopatas, trombocitopênicos ou em uso de AINEs, embora não prolongue o intervalo QTc em cães hígidos.',
      referenceId: 'ref-benjamin-2023-trazodone-platelets',
    },
    {
      title: 'Impacto da dose única de trazodona nas concentrações de ACTH endógeno e cortisol sérico em cães hígidos',
      authorsYear: 'Brown M, Lee-Fowler T, Behrend EN, Grobman M (2024)',
      journal: 'Journal of Veterinary Internal Medicine (JVIM. 2024;38(1):130–134)',
      studyDesign: 'Ensaio clínico prospectivo pareado',
      sampleSize: '14 cães hígidos recebendo 8 a 10 mg/kg VO',
      mainFindings:
        'A trazodona administrada 1 hora antes de dosagens endócrinas não afetou o ACTH endógeno basal nem o cortisol sérico basal, mas causou supressão estatisticamente significativa no cortisol pós-ACTH e no delta de cortisol pós-estimulação.',
      clinicalTakeaway:
        'A trazodona prévia interfere diretamente no diagnóstico adrenal, devendo ser estritamente suspensa antes da realização de testes de estimulação com ACTH para triagem de Addison ou Cushing.',
      referenceId: 'ref-brown-2024-trazodone-acth',
    },
    {
      title: 'O uso de trazodona para facilitar o confinamento pós-cirúrgico em cães',
      authorsYear: 'Gruen ME, Roe SC, Griffith E, et al. (2014)',
      journal: 'JAVMA (2014;245(3):296–301)',
      studyDesign: 'Estudo prospectivo aberto em cães submetidos a cirurgia ortopédica',
      sampleSize: '36 cães ortopédicos',
      mainFindings:
        '89% (32/36) dos tutores relataram melhora moderada ou extrema na tolerância ao confinamento e calma quando medicados com 3,5 a 7 mg/kg VO q12h.',
      clinicalTakeaway:
        'Consagrou o uso da trazodona no pós-operatório ortopédico; contudo, a ausência de grupo placebo nesse estudo gerou viés por expectativa, sendo contestada por ensaios placebo-controlados subsequentes que revelaram evidência conflitante.',
      referenceId: 'ref-gruen-2014-trazodone-confinement',
    },
    {
      title: 'Efeitos da trazodona sobre sinais comportamentais de estresse em cães hospitalizados',
      authorsYear: 'Gilbert-Gregory SE, Stull JW, Rice MR, Herron ME (2016)',
      journal: 'Journal of Veterinary Emergency and Critical Care (JVECC. 2016;26(6):769–778)',
      studyDesign: 'Estudo prospectivo pareado controlado',
      sampleSize: '120 cães hospitalizados (60 tratados vs 60 controles)',
      mainFindings:
        'Cães tratados com trazodona apresentaram redução expressiva de comportamentos frenéticos, vocalização, lambedura de focinho, taquipneia e episódios de congelamento por estresse em gaiolas.',
      clinicalTakeaway:
        'Sustenta clinicamente o protocolo de 2 a 4 mg/kg VO q12h para alívio do estresse hospitalar em cães internados em enfermarias e UTIs.',
      referenceId: 'ref-gilbert-gregory-2016-hospitalization',
    },
  ],

  monitoringParameters: [
    'Avaliação do nível de sedação e escala de ataxia postural antes de permitir deambulação.',
    'Aferição seriada da pressão arterial sistólica (PAS) e frequência cardíaca em felinos, pacientes internados e cardiopatas.',
    'Monitoramento contínuo para identificação precoce da Síndrome Serotoninérgica (tremores, rigidez extensora, mioclonias, hipertermia >39,5°C, vocalização e agitação).',
    'Investigação de sangramentos de mucosas, petéquias ou sufusões em pacientes trombocitopênicos ou submetidos a cirurgias de grande porte.',
    'Acompanhamento de enzimas hepáticas (ALT, FA, GGT) e função renal (ureia, creatinina) em terapias crônicas contínuas superiores a 30 dias.',
  ],

  clientInformation: [
    'A trazodona é um medicamento calmante e ansiolítico que alivia o sofrimento e o medo do animal em situações que causam grande estresse, como viagens, barulhos fortes e consultas ao veterinário.',
    'Dose-teste em casa: teste o remédio num dia calmo em casa antes da viagem ou consulta importante, para ver como o seu animal reage e quanto tempo ele demora para relaxar.',
    'Prevenção de quedas: enquanto o efeito durar (6 a 12 horas), o animal pode ficar com passos lentos ou cambaleantes; bloqueie o acesso a escadas, lajes, sofás altos e sacadas sem rede de proteção.',
    'Alimentação: pode ser administrada junto com uma pequena porção de petisco úmido para facilitar a ingestão e evitar náuseas.',
    'Agitação paradoxal: muito raramente, alguns animais podem ficar agitados, andar sem parar ou miar/latir excessivamente após tomar o remédio; se isso ocorrer, NÃO dê mais remédio e avise o veterinário.',
    'Interações perigosas: nunca combine a trazodona com tramadol ou outros calmantes e antidepressivos sem a autorização expressa do médico-veterinário.',
    'Medicamento sob controle especial federal: exige receita em duas vias brancas e deve ser mantido estritamente fora do alcance de crianças e de outros animais.',
  ],

  relatedDiseaseSlugs: [
    'cistite-idiopatica-felina',
    'doenca-do-disco-intervertebral-caes',
    'colapso-traqueal-canino',
  ],

  references: [
    {
      id: 'ref-plumbs-10-trazodone',
      title: 'Plumb’s Veterinary Drug Handbook, 10th Edition — Trazodone Hydrochloride Monograph',
      authors: 'Budde JA, McCluskey DM',
      year: 2023,
      citation: 'Plumb’s Veterinary Drug Handbook. 10th ed. Wiley-Blackwell; 2023: pp. 1266–1269 (PDF pp. 1293–1296).',
      url: 'https://www.wiley.com/en-us/Plumb%27s+Veterinary+Drug+Handbook%2C+10th+Edition-p-9781394172207',
    },
    {
      id: 'ref-bsava-10-trazodone',
      title: 'BSAVA Small Animal Formulary, Part A: Canine and Feline, 10th Edition — Trazodone Monograph',
      authors: 'Ramsey I (Ed)',
      year: 2020,
      citation: 'BSAVA Small Animal Formulary, Part A. 10th ed. British Small Animal Veterinary Association; 2020: pp. 413–414.',
      url: 'https://www.bsavalibrary.com/content/book/10.22233/9781910443729',
    },
    {
      id: 'ref-nelson-couto-6-trazodone',
      title: 'Medicina Interna de Pequenos Animais, 6ª Edição — Manejo Comportamental e Hospitalização',
      authors: 'Nelson RW, Couto CG',
      year: 2020,
      citation: 'Medicina Interna de Pequenos Animais. 6ª ed. Guanabara Koogan / Elsevier; 2020: Cap. 60 (pp. 985–994) e Cap. 4 (pp. 62–68).',
    },
    {
      id: 'ref-ettinger-9-2024-trazodone',
      title: 'Textbook of Veterinary Internal Medicine, 9th Edition — Behavioral Medicine & Drug Toxicities',
      authors: 'Ettinger SJ, Feldman EC, Côté É',
      year: 2024,
      citation: 'Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2024: Cap. 41 (pp. 228–236) e Cap. 129 (pp. 590–596).',
    },
    {
      id: 'ref-vin-2025-trazodone',
      title: 'VIN Veterinary Drug Handbook — Trazodone Monograph',
      authors: 'Veterinary Information Network (VIN)',
      year: 2025,
      citation: 'VIN Veterinary Drug Handbook. Revisão clínica de 04/04/2025. Veterinary Information Network, Davis, CA.',
      url: 'https://www.vin.com',
    },
    {
      id: 'ref-jay-2013-trazodone-pk',
      title: 'Pharmacokinetics, bioavailability, and hemodynamic effects of trazodone in dogs',
      authors: 'Jay AR, Krotscheck U, Parsley E, et al.',
      year: 2013,
      citation: 'Am J Vet Res. 2013;74(11):1450–1456.',
      doi: '10.2460/ajvr.74.11.1450',
      url: 'https://doi.org/10.2460/ajvr.74.11.1450',
    },
    {
      id: 'ref-kim-2022-trazodone-previsit',
      title: 'Effects of trazodone on behavioral and physiological signs of stress in dogs during veterinary visits',
      authors: 'Kim SA, Borchardt MR, Lee K, Stelow EA, Bain MJ',
      year: 2022,
      citation: 'JAVMA. 2022;260(8):876–883.',
      doi: '10.2460/javma.20.10.0547',
      url: 'https://doi.org/10.2460/javma.20.10.0547',
    },
    {
      id: 'ref-stevens-2016-trazodone-cat',
      title: 'Efficacy of a single dose of trazodone hydrochloride given to cats prior to veterinary visits',
      authors: 'Stevens BJ, Frantz EM, Orlando JM, et al.',
      year: 2016,
      citation: 'JAVMA. 2016;249(2):202–207.',
      doi: '10.2460/javma.249.2.202',
      url: 'https://doi.org/10.2460/javma.249.2.202',
    },
    {
      id: 'ref-tucker-2023-trazodone-cat-pk',
      title: 'Pharmacokinetic, sedative, and physiological effects of oral trazodone alone or with gabapentin in cats',
      authors: 'Tucker LE, Sanchez A, Valverde A, et al.',
      year: 2023,
      citation: 'J Vet Pharmacol Ther. 2023;46(5):300–310.',
      doi: '10.1111/jvp.13384',
      url: 'https://doi.org/10.1111/jvp.13384',
    },
    {
      id: 'ref-benjamin-2023-trazodone-platelets',
      title: 'Adverse effects of trazodone in dogs on primary hemostasis and electrocardiogram',
      authors: 'Benjamin EJ, Nelson OL, Baumwart R, et al.',
      year: 2023,
      citation: 'J Vet Intern Med. 2023;37(6):2131–2136.',
      doi: '10.1111/jvim.16841',
      url: 'https://doi.org/10.1111/jvim.16841',
    },
    {
      id: 'ref-brown-2024-trazodone-acth',
      title: 'The impact of single-dose trazodone administration on plasma ACTH and serum cortisol in healthy dogs',
      authors: 'Brown M, Lee-Fowler T, Behrend EN, Grobman M',
      year: 2024,
      citation: 'J Vet Intern Med. 2024;38(1):130–134.',
      doi: '10.1111/jvim.16935',
      url: 'https://doi.org/10.1111/jvim.16935',
    },
    {
      id: 'ref-gruen-2014-trazodone-confinement',
      title: 'The use of trazodone to facilitate post-surgical confinement in dogs',
      authors: 'Gruen ME, Roe SC, Griffith E, et al.',
      year: 2014,
      citation: 'JAVMA. 2014;245(3):296–301.',
      doi: '10.2460/javma.245.3.296',
      url: 'https://doi.org/10.2460/javma.245.3.296',
    },
    {
      id: 'ref-gilbert-gregory-2016-hospitalization',
      title: 'Effects of trazodone on behavioral signs of stress in hospitalized dogs',
      authors: 'Gilbert-Gregory SE, Stull JW, Rice MR, Herron ME',
      year: 2016,
      citation: 'J Vet Emerg Crit Care. 2016;26(6):769–778.',
      doi: '10.1111/vec.12534',
      url: 'https://doi.org/10.1111/vec.12534',
    },
    {
      id: 'ref-anvisa-portaria-344-1998',
      title: 'Portaria SVS/MS nº 344/1998 e Regulamentação de Substâncias da Lista C1',
      authors: 'Agência Nacional de Vigilância Sanitária (Anvisa)',
      year: 2026,
      citation: 'Ministério da Saúde / Anvisa. Regulamento Técnico sobre substâncias e medicamentos sujeitos a controle especial (Lista C1 e RDC nº 1.023/2026).',
      url: 'https://www.gov.br/anvisa/pt-br/assuntos/medicamentos/controlados',
    },
  ],
};
