import { MedicationRecord } from '../../types/medication';

export const mirtazapinaMedicationRecord: MedicationRecord = {
  id: 'med-mirtazapina',
  slug: 'mirtazapina',
  title: 'Mirtazapina',
  activeIngredient: 'Mirtazapina',
  isControlled: true,
  controlNotice:
    'Medicamento sujeito a controle especial. No Brasil, as formulações de uso humano constam na Lista C1 da Portaria SVS/MS nº 344/1998, exigindo Receita de Controle Especial em 2 (duas) vias branca (validade de 30 dias, limite de até 60 dias de tratamento). As formulações com registro exclusivamente veterinário no MAPA (como o Mirtz 2 mg da Agener União) são regulamentadas pela Portaria MAPA nº 837/2025 e sujeitas a Notificação de Receita Veterinária (NRV) emitida via SIPEAGRO em 2 vias.',
  tradeNames: [
    'Mirtz 2 mg Comprimidos Palatáveis para Gatos (Agener União — Registro MAPA Veterinário no Brasil)',
    'Mirataz 20 mg/g (2%) Pomada Transdérmica Felina (Dechra / KindredBio — Referência Veterinária Internacional)',
    'Remeron SolTab 15 mg e 30 mg Comprimidos Orodispersíveis (Organon — Referência Humana no Brasil)',
    'Menelat 15 mg, 30 mg e 45 mg Comprimidos Orodispersíveis (Eurofarma — Humana)',
    'Razapina 15 mg, 30 mg e 45 mg Comprimidos (Merck — Humana)',
    'Mirtazapina Genérico 15 mg, 30 mg e 45 mg Comprimidos (EMS, Medley, Eurofarma, Torrent)',
    'Mirtazapina Suspensão Oral Manipulada Veterinária 5 mg/mL ou 10 mg/mL (Veículo Palatável)',
    'Mirtazapina Cápsulas Magistrais Veterinárias Fracionadas (0,5 mg a 15 mg sob medida)',
  ],
  officialSiteUrl: 'https://agener.com.br/produtos/pequenos-animais/especialidades-pt/mirtz/',
  leafletUrl: 'https://consultaremedios.com.br/mirtz-para-gatos-agener-uniao/bula',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/mirtazapine/PNG',
  pharmacologicClass:
    'Antidepressivo Tetracíclico Noradrenérgico e Serotoninérgico Específico (NaSSA); Antagonista Alfa-2 Pré-Sináptico Central; Antagonista 5-HT2, 5-HT3 e H1; Agente Orexígeno e Antiemético/Antináusea',
  species: ['dog', 'cat'],
  category: 'gastroenterologia',
  tags: [
    'Mirtazapina',
    'Mirtazapine',
    'Mirtz',
    'Mirataz',
    'Remeron',
    'Orexígeno',
    'Estimulante de Apetite',
    'Antiemético',
    'Antináusea',
    '5-HT3',
    'Alfa-2 Antagonista',
    'H1',
    'Doença Renal Crônica',
    'DRC Felina',
    'Lipidose Hepática',
    'Gastroenterologia',
    'Lista C1',
    'Portaria MAPA 837',
    'SIPEAGRO',
  ],

  plainLanguageSummary:
    'A mirtazapina é um medicamento consagrado na rotina veterinária de pequenos animais por sua dupla ação orexígena e antiemética, sendo amplamente indicada para resgatar o apetite e combater a náusea em cães e gatos debilitados por doenças crônicas, insuficiência renal, perda de peso involuntária ou pós-quimioterapia. Seu mecanismo combina o bloqueio de receptores que normalmente inibem neurotransmissores no cérebro, liberando sinais químicos que despertam o centro hipotalâmico da fome, ao mesmo tempo em que neutraliza os receptores de serotonina e histamina responsáveis pelo enjoo e pela recusa alimentar. Na espécie felina, doses menores e intervalos estendidos a cada 48 horas são fundamentais para alcançar o ganho de peso e o estímulo alimentar desejado sem deflagrar agitação excessiva, miados contínuos ou sonolência profunda, lembrando sempre que o medicamento funciona como uma ponte para a alimentação voluntária mas não substitui a hidratação, o controle da dor ou a passagem precoce de sonda alimentar em animais com risco iminente de lipidose hepática.',

  mechanismOfAction:
    'A mirtazapina é um antidepressivo tetracíclico atípico pertencente à classe dos NaSSA (Noradrenergic and Specific Serotonergic Antidepressant). Sua farmacodinâmica em cães e gatos opera através de quatro ações moleculares integradas e sinérgicas: 1. Desinibição monoaminérgica central por antagonismo alfa-2: Atua como antagonista potente dos autorreceptores e heterorreceptores alfa-2 adrenérgicos pré-sinápticos centrais. Esse bloqueio rompe a alça fisiológica de feedback inibitório negativo, deflagrando liberação sustentada de noradrenalina e serotonina na fenda sináptica. A noradrenalina liberada estimula receptores pós-sinápticos que ativam vias orexígenas no hipotálamo ventromedial e lateral. 2. Ação orexígena hipotalâmica direta via 5-HT2C e H1: A mirtazapina atua como antagonista de receptores 5-HT2A e 5-HT2C. A inibição de 5-HT2C suprime os sinais centrais de saciedade mediated por pró-opiomelanocortina (POMC), enquanto seu antagonismo potente sobre receptores histaminérgicos H1 centrais confere estímulo adicional potente da ingesta alimentar. 3. Antiemese e antináusea por bloqueio seletivo 5-HT3: O fármaco é um antagonista de alta afinidade dos receptores 5-HT3 na zona disparadora dos quimiorreceptores (CTZ) da área postrema no assoalho do quarto ventrículo e nas terminações sensitivas vagais periféricas do trato gastrointestinal, compartilhando o mesmo mecanismo antiemético consagrado da ondansetrona. Esse efeito é decisivo para pacientes urêmicos ou oncológicos cuja inapetência é perpetuada por náusea central e periférica contínua. 4. Poupança de efeitos autonômicos graves: Exibe fraco antagonismo sobre receptores muscarínicos colinérgicos e antagonismo periférico alfa-1 adrenérgico apenas moderado, resultando em baixíssima incidência de efeitos anticolinérgicos e risco apenas esporádico de hipotensão postural.',

  indications: [
    'Estimulação do apetite (efeito orexígeno) em cães e gatos acometidos por anorexia, hiporexia ou disrexia aguda ou crônica.',
    'Manejo da inapetência, náusea urêmica crônica e perda progressiva de massa corporal em gatos com Doença Renal Crônica (DRC estágios IRIS 2 a 4).',
    'Tratamento da perda involuntária de peso corporal associada a enteropatias crônicas inflamatórias (IBD), neoplasias e caquexia cardíaca ou tumoral.',
    'Coadjuvante antiemético e antináusea em protocolos de quimioterapia citotóxica e gastroenterites graves em cães e gatos.',
    'Aceleração do esvaziamento gástrico e do trânsito colônico em cães com hipomotilidade gastrintestinal.',
    'Controle coadjuvante de medos sociais e transtornos de ansiedade canina sob acompanhamento comportamental especializado (uso anedótico).',
  ],

  contraindications: [
    'Hipersensibilidade conhecida à mirtazapina ou a qualquer componente da fórmula.',
    'Uso concomitante ou recente (nos últimos 14 dias) de Inibidores da Monoamina Oxidase (IMAO), incluindo selegilina, amitraz, linezolida e azul de metileno, devido ao risco fatal de Síndrome Serotoninérgica.',
    'Administração de doses felinas elevadas históricas (3,75 mg/gato VO): contraindicada por provocar disforia, vocalização contínua e tremores sem elevar a eficácia orexígena.',
    'Administração da pomada transdérmica auricular por via oral ou ocular.',
    'Emprego como substituto exclusivo de suporte nutricional enteral ativo (sonda nasoesofágica ou esofágica) em gatos com anorexia persistente por mais de 48 a 72 horas em risco iminente de lipidose hepática.',
    'Uso de comprimidos orodispersíveis humanos que contenham xilitol na formulação em pacientes caninos (risco de hipoglicemia severa e necrose hepática aguda).',
  ],

  cautions: [
    'Medicamento sob Controle Especial no Brasil: formulações humanas enquadram-se na Lista C1 da Portaria 344/98 (Receita de Controle Especial em 2 vias branca); apresentações veterinárias registradas (Mirtz) seguem a Portaria MAPA 837/2025 via SIPEAGRO.',
    'Doença Renal Crônica Felina (DRC): o clearance oral diminui em mais de 50% e a meia-vida aumenta para ~15,2 horas (Quimby & Lunn 2013), exigindo espaçamento obrigatório da dose para cada 48 horas (q48h).',
    'Hepatopatias e disfunção hepática: a meia-vida plasmática felina pode se estender para 13,8 a 61,4 horas com retardo no Tmax (Fitzpatrick et al. 2018), demandando vigilância de sedação e eventual intervalo de 72 horas em pacientes ictéricos.',
    'Associação com outros fármacos que elevam serotonina (tramadol, trazodona, fluoxetina, amitriptilina, ondansetron): monitorar sinais precoces de toxicidade serotoninérgica.',
    'Potencial hipotensivo leve por antagonismo alfa-1 adrenérgico: cautela em pacientes hipovolêmicos, cardiopatas descompensados ou desidratados.',
    'Risco de sedação motora: o antagonismo H1 produz sonolência marcante, especialmente em cães sob doses superiores a 1 mg/kg; utilizar a menor dose eficaz.',
    'Segurança ocupacional: ao aplicar pomadas transdérmicas auriculares, o tutor e a equipe devem usar luvas descartáveis e evitar contato físico com as orelhas do animal por 2 horas pós-aplicação.',
  ],

  adverseEffects: [
    'Comportamentais e Neurológicos em Felinos: Vocalização excessiva e contínua (relatada em até 56% dos gatos com doses altas), agitação psicomotora e hiperatividade (31%), tremores musculares e fasciculações (14,3%), ataxia e alteração postural na marcha (16,7%), mioclonias e miastenia transitória.',
    'Sedação e Efeitos Centrais: Sonolência acentuada, letargia e depressão do sensório (mais prevalente em cães sob doses altas de formulário e atenuada em regimes conservadores de 0,5 a 0,6 mg/kg).',
    'Gastrointestinais: Vômitos transitórios paradoxais (26,2% em gatos no estudo de Ferguson et al. 2016), sialorreia/ptialismo reflexo (13%), aerofagia e aumento excessivo da velocidade de ingestão com polifagia.',
    'Cardiovasculares e Respiratórios: Taquicardia sinusal reflexa (10,7%), hipotensão arterial postural discreta, taquipneia ou respiração ofegante com boca aberta (11,9%).',
    'Dermatológicos Locais (Via Transdérmica Auricular): Eritema no pavilhão auricular, formação de crostas, descamação, prurido e acúmulo de resíduos graxos (observados em aproximadamente 10% dos gatos sob Mirataz).',
    'Laboratoriais / Sistêmicos: Elevação assintomática e transitória de enzimas hepáticas (ALT, fosfatase alcalina) em gatos tratados cronicamente; raríssimos relatos de hiponatremia e discrasias sanguíneas em medicina comparada.',
  ],

  interactions: [
    'Inibidores da Monoamina Oxidase / IMAO (Selegilina, Amitraz, Linezolida, Azul de Metileno): Contraindicação Absoluta de Alto Risco. A associação ou uso sem intervalo de clareamento (washout) de 14 dias deflagra Síndrome Serotoninérgica letal caracterizada por hipertermia grave, mioclonia, convulsões, rigidez muscular, choque autonômico e óbito.',
    'Tramadol: Aumento significativo do risco de toxicidade serotoninérgica decorrente do bloqueio concomitante da recaptação de serotonina e estimulação monoaminérgica central; monitorar agitação, hipertermia e tremores.',
    'Trazodona, Fluoxetina, Paroxetina, Amitriptilina e Clomipramina: Sinergismo serotoninérgico aditivo com potencialização do risco de síndrome serotoninérgica e sedação excessiva; monitorar estreitamente.',
    'Ciproeptadina: Antagonismo farmacodinâmico recíproco. Sendo um antagonista serotonérgico e anti-histamínico com potente afinidade 5-HT2, a ciproeptadina neutraliza os efeitos orexígenos da mirtazapina; em contrapartida, é o antídoto padrão-ouro de resgate para reverter intoxicações agudas e efeitos adversos comportamentais induzidos pela mirtazapina.',
    'Ondansetron e Antieméticos 5-HT3: Ação complementar benéfica no controle da êmese refratária, porém com somação teórica de tônus serotoninérgico; monitorar o paciente.',
    'Depressores do Sistema Nervoso Central (Gabapentina, Fenobarbital, Benzodiazepínicos, Acepromazina, Opioides): Potencialização aditiva de sonolência, ataxia e sedação profunda.',
    'Anti-hipertensivos e Diuréticos (Furosemida, Enalapril, Benazepril, Amlodipino): Podem potencializar episódios transitórios de hipotensão ortostática ou hiponatremia.',
    'Clonidina: A coadministração pode anular a eficácia anti-hipertensiva da clonidina e induzir elevações paradoxais da pressão arterial.',
    'Inibidores Enzimáticos do CYP450 (Cetoconazol, Eritromicina, Cimetidina): Podem reduzir o clearance hepático da mirtazapina, aumentando sua concentração plasmática e meia-vida.',
    'Varfarina: Relatos em humanos de discreto prolongamento do tempo de protrombina (TP); monitorar coagulograma em coterapia.',
  ],

  routes: ['por via oral', 'por via transdérmica'],

  pillars: [
    {
      title: 'Bloqueio Alfa-2 Pré-Sináptico e Desinibição Monoaminérgica',
      icon: 'Activity',
      desc: 'Bloqueia o mecanismo de feedback inibitório dos autorreceptores alfa-2 adrenérgicos pré-sinápticos centrais, aumentando a liberação de noradrenalina e serotonina que ativam os centros hipotalâmicos de busca alimentar.',
    },
    {
      title: 'Antagonismo 5-HT2C e H1 como Eixo Orexígeno Central',
      icon: 'Flame',
      desc: 'O bloqueio dos receptores 5-HT2C suprime a sinalização de saciedade e a potente inibição dos receptores histaminérgicos H1 estimula ativamente a fome, gerando efeito orexígeno robusto em cães e gatos.',
    },
    {
      title: 'Bloqueio 5-HT3 Antiemético e Antináusea',
      icon: 'ShieldCheck',
      desc: 'Antagoniza os receptores 5-HT3 na CTZ do assoalho do quarto ventrículo e no trato digestivo com eficácia similar à da ondansetrona, suprimindo o enjoo que perpetua a hiporexia urêmica e pós-quimioterápica.',
    },
    {
      title: 'Cinética Não Linear Felina e Princípio da Menor Dose Eficaz',
      icon: 'SlidersHorizontal',
      desc: 'Em gatos, 1,88 mg e 3,75 mg promovem estímulo alimentar idêntico, mas 3,75 mg dispara alterações comportamentais em mais de 50%; o clearance reduzido na DRC e hepatopatia felina valida o regime de q48h.',
    },
  ],

  quickSummaryHighlights: [
    'Orexígeno e antiemético de dupla ação indicado para resgate de apetite em cães e gatos com perda de peso, DRC e anorexia.',
    'Princípio da Menor Dose Eficaz em gatos: iniciar sempre com 1,88 a 2 mg/gato VO q48h; doses maiores (3,75 mg) disparam agitação e miados sem elevar o apetite.',
    'Mirtz 2 mg da Agener União é a apresentação veterinária nacional registrada no MAPA com controle sob Portaria 837/2025 via SIPEAGRO.',
    'Apresentações humanas constam na Lista C1 da Portaria 344/98 (Receita de Controle Especial em 2 vias branca).',
    'Ciproeptadina funciona como antídoto de resgate em caso de intoxicação aguda ou síndrome serotoninérgica.',
  ],

  pharmacokineticsData: {
    absorption:
      'Em cães, a mirtazapina é absorvida de forma rápida pelo trato gastrointestinal após administração oral, com concentração plasmática máxima (Tmax) ocorrendo em aproximadamente 0,88 a 1,5 horas e biodisponibilidade sistêmica intermediária. A presença de alimento na refeição não exerce impacto clinicamente significativo sobre a taxa ou a extensão de absorção da molécula em cães e gatos, permitindo a ingestão com ou sem refeições (sendo recomendado fornecer com alimentos se houver sensibilidade gástrica). Em gatos sadios, o Tmax oral situa-se entre 1 e 2 horas após a tomada. A via transdérmica auricular (Mirataz) apresenta biodisponibilidade sistêmica relativa de aproximadamente 65% em comparação à via oral em felinos; o Tmax transdérmico após uma aplicação única ocorre em torno de 16 horas, reduzindo-se para cerca de 2 a 6 horas após administrações repetidas em virtude do equilíbrio tecidual estrato-corneocutâneo.',
    distribution:
      'Apresenta caráter lipofílico com amplo volume aparente de distribuição nos tecidos periféricos (Vd de 7,14 L/kg no cão). A molécula transpõe com grande facilidade a barreira hematoencefálica, exercendo seus efeitos farmacodinâmicos predominantemente no sistema nervoso central. A taxa de ligação às proteínas plasmáticas é moderada a elevada, situando-se entre 70% e 72% em cães, roedores e modelos mamíferos (e cerca de 85% em humanos). Em razão de sua ampla margem terapêutica e afinidade não saturável por proteínas, não são descritas interações de deslocamento competitivo proteico clinicamente relevantes. Atravessa a placenta e difunde-se no leite materno.',
    metabolism:
      'Extensa biotransformação microssomal hepática mediada por isoenzimas do citocromo P450 (principalmente CYP2D6, CYP1A2 e CYP3A4) e reações de fase II de conjugação glicuronídica. As rotas metabólicas primárias incluem a 8-hidroxilação seguida de conjugação, desmetilação formando o metabólito N-desmetilmirtazapina e N-oxidação. Na espécie felina, a cinética de eliminação é notadamente não linear: o estudo seminal de Quimby et al. (2011) demonstrou que a duplicação da dose de 1,88 mg para 3,75 mg/gato elevou a meia-vida plasmática de 9,2 horas para 15,9 horas e alterou o clearance corporal aparente. Como os gatos apresentam deficiência constitucional na capacidade de glicuronidação hepática, a depuração global da mirtazapina é inerentemente mais vagarosa do que a de cães e seres humanos, tornando a espécie muito mais sensível ao acúmulo sistêmico com administrações diárias repetidas.',
    elimination:
      'A excreção dos metabólitos ocorre pelas vias renal (urina) e fecal/biliar. Em cães Beagles sadios, o clearance plasmático é elevado (~1193 mL/kg/hora) e a meia-vida de eliminação plasmática terminal (t1/2) é de aproximadamente 6,17 horas (faixa de 5 a 7 horas). Em gatos sadios, a t1/2 após 1,88 mg oral é de aproximadamente 9,2 horas. Em gatos com Doença Renal Crônica (DRC estágios 2 e 3), o estudo farmacocinético de Quimby & Lunn (2013) evidenciou que a depuração oral aparente despenca para 0,6 L/h/kg e a meia-vida terminal prolonga-se para 15,2 horas, justificando o intervalo de 48 horas (q48h). Em felinos com hepatopatia primária ou secundária, Fitzpatrick et al. (2018) demonstraram que a meia-vida plasmática atinge uma mediana de 13,8 horas e amplitude máxima de até 61,4 horas em animais com icterícia e fosfatase alcalina marcadamente elevada, demandando espaçamento das doses para 48 a 72 horas. Na via transdérmica em gatos, a meia-vida observada situa-se na faixa de 21 a 27 horas.',
  },

  doses: [
    {
      id: 'dose-mirt-cat-inappetence-br',
      species: 'cat',
      indication: 'Hiporexia e anorexia em gatos — Apresentação veterinária aprovada no Brasil (Mirtz 2 mg)',
      clinicalContext: 'Gatos hiporéxicos, anoréxicos ou com perda ponderal associada a afecções agudas ou crônicas estáveis.',
      doseMin: 2.0,
      doseMax: 2.0,
      doseUnit: 'mg',
      perWeightUnit: 'animal',
      route: 'VO',
      frequency: 'q48h',
      duration: 'Até 3 semanas consecutivas ou conforme reavaliação clínica veterinária',
      notes:
        'Posologia oficial da bula aprovada no MAPA para Mirtz 2 mg (Agener União): 1 comprimido palatável (2 mg) por via oral a cada 48 horas. Apresentação concebida para evitar a partição imprecisa de comprimidos humanos e o risco de toxicidade. Pode ser administrado com ou sem alimentos. Não ultrapassar a frequência recomendada.',
      monitoring: 'Consumo voluntário de alimento diário, evolução do peso corporal, hidratação e ausência de vocalização, inquietação ou tremores.',
      calculatorEnabled: true,
      presentationId: 'pres-mirtz-2mg',
      referenceIds: ['ref-mirtz-bula', 'ref-plumb-10', 'ref-bsava-10'],
      evidenceLevel: 'Bula Oficial Registrada MAPA e Compêndios Farmacológicos Veterinários',
    },
    {
      id: 'dose-mirt-cat-inappetence-plumb',
      species: 'cat',
      indication: 'Estimulação de apetite e antiemético em gatos saudáveis ou convalescentes (Plumb / BSAVA)',
      clinicalContext: 'Uso de formulação oral extra-bula fracionada ou magistral em felinos sem doença renal ou hepática avançada.',
      doseMin: 1.88,
      doseMax: 1.88,
      doseUnit: 'mg',
      perWeightUnit: 'animal',
      route: 'VO',
      frequency: 'q24h a q48h',
      duration: '3 a 14 dias; monitorar recuperação do apetite e investigar causa primária',
      notes:
        'Dose consensual de compêndios (Plumb 10ª ed., BSAVA 10ª ed.): 1,88 mg por gato (aproximadamente 1/4 de comprimido de 7,5 mg ou 1/8 de 15 mg, ou cápsula manipulada). Quimby et al. (2011) comprovaram que 1,88 mg estimula o consumo de alimento tão eficazmente quanto 3,75 mg, porém com incidência significativamente menor de efeitos adversos comportamentais.',
      monitoring: 'Ganho de peso, aceitação alimentar e nível de sedação ou miados excessivos.',
      calculatorEnabled: true,
      referenceIds: ['ref-plumb-10', 'ref-bsava-10', 'ref-quimby-pk-2011'],
      evidenceLevel: 'Nível I — Ensaio Clínico Cruzado Prospectivo e Farmacocinético',
    },
    {
      id: 'dose-mirt-cat-ckd-plumb',
      species: 'cat',
      indication: 'Hiporexia, perda de peso e náusea urêmica em gatos com Doença Renal Crônica (DRC estável)',
      clinicalContext: 'Gatos com DRC estável (estágios IRIS 2 a 4) apresentando inapetência crônica ou êmese urêmica.',
      doseMin: 1.88,
      doseMax: 2.0,
      doseUnit: 'mg',
      perWeightUnit: 'animal',
      route: 'VO',
      frequency: 'q48h',
      duration: 'Uso continuado ou por pulsos conforme escore de apetite e peso corporal',
      notes:
        'Protocolo validado pelo estudo pivotal de Quimby & Lunn (2013) e Plumb 10ª ed.: 1,88 mg a 2 mg por gato VO a cada 48 horas. A meia-vida de eliminação plasmática em gatos com DRC prolonga-se para 15,2 horas e o clearance oral cai para 0,6 L/h/kg, sustentando cientificamente o intervalo espaçado de 48 horas para evitar acúmulo sistêmico e toxicidade.',
      monitoring: 'Creatinina sérica, ureia, peso corporal periódico, pressão arterial sistólica e sinais de hiperestimulação.',
      calculatorEnabled: true,
      presentationId: 'pres-mirtz-2mg',
      referenceIds: ['ref-quimby-ckd-2013', 'ref-plumb-10', 'ref-bsava-10', 'ref-nelson-couto-6th', 'ref-ettinger-9th'],
      evidenceLevel: 'Nível I — Ensaio Clínico Randomizado Duplo-Cego Crossover Controlado',
    },
    {
      id: 'dose-mirt-cat-hepatic',
      species: 'cat',
      indication: 'Estimulação de apetite em gatos com afecção hepatobiliar (hepatopatia sob cautela)',
      clinicalContext: 'Gatos com doença hepática primária ou secundária que necessitam de suporte orexígeno.',
      doseMin: 1.88,
      doseMax: 2.0,
      doseUnit: 'mg',
      perWeightUnit: 'animal',
      route: 'VO',
      frequency: 'q48h a q72h',
      duration: 'Individualizada; monitorar enzimas hepáticas e bilirrubina',
      notes:
        'Dose adaptada com base no estudo farmacocinético de Fitzpatrick et al. (2018) e Plumb 10ª ed.: 1,88 mg a 2 mg por gato VO a cada 48 horas, podendo requerer espaçamento para 72 horas em pacientes com hiperbilirrubinemia severa, visto que a meia-vida se estende para uma mediana de 13,8 horas (com amplitude máxima observada de até 61,4 horas). Não adiar sonda enteral em risco iminente de lipidose hepática.',
      monitoring: 'ALT, FA, bilirrubina sérica, nível de sedação e aceitação alimentar.',
      calculatorEnabled: true,
      presentationId: 'pres-mirtz-2mg',
      referenceIds: ['ref-fitzpatrick-liver-2018', 'ref-plumb-10', 'ref-isfm-inappetence-2022'],
      evidenceLevel: 'Nível II — Ensaio Farmacocinético e Clínico Prospectivo',
    },
    {
      id: 'dose-mirt-cat-transdermal',
      species: 'cat',
      indication: 'Controle de perda de peso involuntária em gatos — Pomada Transdérmica (Mirataz)',
      clinicalContext: 'Gatos de difícil administração oral apresentando perda ponderal por enteropatia crônica, DRC ou neoplasia.',
      doseMin: 2.0,
      doseMax: 2.0,
      doseUnit: 'mg',
      perWeightUnit: 'animal',
      route: 'TD',
      frequency: 'q24h',
      duration: '14 dias consecutivos (dose de rótulo FDA)',
      notes:
        'Dose de rótulo aprovada pelo FDA e estudo pivotal de Poole et al. (2019): aplicar fita de 3,8 cm de pomada a 2% (equivalente a 2 mg/gato) na face interna do pavilhão auricular uma vez ao dia por 14 dias, alternando as orelhas diariamente. O aplicador deve usar luvas descartáveis obrigatoriamente e evitar contato humano/animal com a área tratada por pelo menos 2 horas pós-aplicação. Proporcionou ganho médio de peso de 3,9% em 14 dias.',
      monitoring: 'Eritema, crostas e descamação no pavilhão auricular (ocorre em ~10%), peso corporal e atitude geral.',
      calculatorEnabled: true,
      presentationId: 'pres-mirataz-td',
      referenceIds: ['ref-poole-mirataz-2019', 'ref-plumb-10', 'ref-ettinger-9th'],
      evidenceLevel: 'Nível I — Ensaio Clínico Pivotal Randomizado Duplo-Cego Multicêntrico FDA',
    },
    {
      id: 'dose-mirt-dog-appetite-formulatory',
      species: 'dog',
      indication: 'Estimulação de apetite e controle de náusea em cães — Diretriz de Formulário (Plumb / BSAVA)',
      clinicalContext: 'Cães inapetentes por afecções crônicas, insuficiência renal ou tratamento oncológico.',
      doseMin: 1.1,
      doseMax: 1.3,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q24h',
      duration: 'Conforme evolução do apetite e controle etiológico; reavaliar periodicamente',
      maximumDose: '30 mg/cão/dia (limite teto independente do peso corporal)',
      notes:
        'Dose preconizada pelo BSAVA 10ª ed. e Plumb 10ª ed.: 1,1 a 1,3 mg/kg VO a cada 24 horas. Plumb estabelece expressamente que a dose total jamais deve exceder 30 mg por cão uma vez ao dia, independentemente do peso corporal. Usar a menor dose eficaz para minimizar sonolência acentuada. Em cães Beagles sadios, a meia-vida média é de 6,17 horas e o clearance é de 1193 mL/kg/h.',
      monitoring: 'Grau de sedação motora, consumo alimentar espontâneo, pressão arterial e ausência de hipotensão.',
      calculatorEnabled: true,
      referenceIds: ['ref-bsava-10', 'ref-plumb-10', 'ref-nelson-couto-6th'],
      evidenceLevel: 'Compêndios Padrão-Ouro Internacionais (BSAVA 10 e Plumb 10)',
    },
    {
      id: 'dose-mirt-dog-appetite-conservative-2025',
      species: 'dog',
      indication: 'Hiporexia e perda de apetite em cães hospitalizados ou ambulatoriais — Ensaio Clínico 2025',
      clinicalContext: 'Cães com apetite reduzido nos quais se busca estímulo alimentar eficaz com mínima sonolência.',
      doseMin: 0.5,
      doseMax: 0.6,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q24h',
      duration: '3 a 7 dias ou durante o período de convalescença',
      notes:
        'Regime posológico respaldado pelo recente estudo clínico prospectivo e retrospectivo de Theodoro et al. (Animals 2025, PMID 40941333): 0,5 a 0,6 mg/kg VO a cada 24 horas (ou faixas práticas de 3,75 mg a 15 mg/cão por porte). No estudo prospectivo controlado duplo-cego, 100% dos cães tratados aceitaram o alimento no Dia 1 (com latência mediana de 120 minutos) versus 63,6% no placebo (P = 0,03). Essa dose conservadora confere excelente estímulo orexígeno com menor incidência de sedação profunda em comparação a doses superiores a 1 mg/kg.',
      monitoring: 'Tempo até o primeiro consumo de alimento, escore de ingesta diária e nível de atividade motora.',
      calculatorEnabled: true,
      referenceIds: ['ref-theodoro-dogs-2025', 'ref-plumb-10'],
      evidenceLevel: 'Nível I — Ensaio Clínico Prospectivo Randomizado Duplo-Cego Crossover (2025)',
    },
  ],

  monitoringParameters: [
    'Consumo Voluntário de Alimento Diário: registrar o tipo de alimento aceito, proporção da porção ingerida e tempo decorrido até o início da alimentação.',
    'Evolução do Peso Corporal e Escore de Condição Corporal (ECC): pesar o animal a cada 7 a 14 dias para confirmar ganho ou estabilização da massa muscular.',
    'Monitoramento Neurocomportamental: observar presença de inquietação, agitação motora, miados ou latidos anormais e tremores musculares (especialmente em gatos após a primeira tomada).',
    'Nível de Alerta e Sedação: avaliar o grau de sedação, principalmente em cães ou em animais sob coterapia com opioides ou anticonvulsivantes.',
    'Função Renal e Eletrólitos: dosar creatinina sérica, ureia, SDMA e eletrólitos a cada 1 a 3 meses em gatos portadores de DRC recebendo mirtazapina continuada.',
    'Perfil Hepático: monitorar ALT, fosfatase alcalina e bilirrubina em felinos hepatopatas sob terapia orexígena.',
    'Inspeção do Pavilhão Auricular (se em uso transdérmico): inspecionar a pele da orelha antes de cada aplicação para descartar eritema moderado a grave, dermatite ou crostas.',
    'Vigilância de Síndrome Serotoninérgica: checar temperatura corporal, tônus muscular e reflexos espinhais caso o paciente receba tramadol, trazodona, SSRIs ou TCAs.',
  ],

  clientInformation: [
    'Como Funciona o Remédio: A mirtazapina é um estimulante de apetite e remédio contra enjoo que ajuda seu animal a recuperar a vontade de comer quando ele está debilitado por doenças crônicas ou convalescença.',
    'Intervalo Especial em Gatos (a cada 48 horas): Em gatos, o medicamento é fornecido a cada dois dias (a cada 48 horas). Não dê o remédio todos os dias a menos que expressamente determinado pelo médico-veterinário, pois a eliminação felina é lenta e o acúmulo pode provocar alterações de comportamento.',
    'Efeitos Colaterais Comuns: Alguns gatos podem ficar mais dengosos, agitados ou miar com frequência excessiva após tomar o comprimido. Esses sinais costumam diminuir nas horas seguintes. Se o animal apresentar tremores intensos ou sonolência profunda, informe o médico-veterinário.',
    'Modo de Administrar: O comprimido pode ser oferecido diretamente na boca ou misturado a uma pequena porção de alimento apetitoso.',
    'Cuidados com a Pomada de Passar na Orelha: Se estiver usando a formulação transdérmica de aplicar na orelha, use luvas descartáveis para não absorver o medicamento na sua própria pele. Alterne a orelha tratada a cada aplicação e não permita que crianças ou outros animais tenham contato com a orelha tratada pelas próximas duas horas.',
    'Não Atrasar o Tratamento Nutricional: Estimulantes de apetite não substituem a necessidade de sonda alimentar em animais que não comem nada há mais de 48 horas. Se o animal persistir sem comer, contate a equipe veterinária imediatamente.',
  ],

  references: [
    {
      id: 'ref-plumb-10',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. VetMedux/Wiley-Blackwell; 2023. Monografia: Mirtazapine, pp. 893–896 (PDF pp. 920–923).',
      sourceType: 'Compêndio Farmacológico Veterinário Padrão-Ouro',
      url: 'https://search.worldcat.org/isbn/9781394172207',
      notes: 'Monografia canônica abrangendo dados de farmacodinâmica NaSSA, farmacocinética comparada canina e felina, doses de rótulo transdérmica, alertas de não linearidade felina e tabelas de interação com IMAO e serotoninérgicos.',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-bsava-10',
      citationText:
        'British Small Animal Veterinary Association. BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. British Small Animal Veterinary Association; 2020. Monografia: Mirtazapine, pp. 270–271 (PDF pp. 286–287).',
      sourceType: 'Formulário Veterinário Internacional',
      url: 'https://www.bsavalibrary.com/content/book/10.22233/9781910443729',
      notes: 'Diretrizes de posologia canina (1,1 a 1,3 mg/kg VO q24h) e felina (1,9 mg/gato VO q48h), eficácia documentada em DRC estável e alertas sobre discrasias e sedação profunda.',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-mirtz-bula',
      citationText:
        'Agener União Saúde Animal / União Química Farmacêutica Nacional S/A. Bula Oficial do Medicamento Veterinário Mirtz (Mirtazapina 2 mg para gatos). Registro MAPA sob nº SP 000045-8.000032.',
      sourceType: 'Bula Técnica Oficial Registrada MAPA',
      url: 'https://consultaremedios.com.br/mirtz-para-gatos-agener-uniao/bula',
      notes: 'Apresentação veterinária de referência no Brasil sob a Portaria MAPA 837/2025 (Notificação de Receita Veterinária via SIPEAGRO em 2 vias). Comprimidos palatáveis de 2 mg com posologia de 1 comp VO q48h por até 3 semanas.',
      evidenceLevel: 'Documento Técnico Regulatório MAPA',
    },
    {
      id: 'ref-quimby-ckd-2013',
      citationText:
        'Quimby JM, Lunn KF. Mirtazapine as an appetite stimulant and antiemetic in cats with chronic kidney disease: a masked placebo-controlled crossover clinical trial. Vet J. 2013;197(3):651-655. doi:10.1016/j.tvjl.2013.05.048.',
      sourceType: 'Ensaio clínico randomizado cego controlado cruzado (RCT Nível I)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/23810141/',
      notes: 'Estudo seminal demonstrando que a mirtazapina em gatos com DRC promoveu aumento estatisticamente significativo de peso, apetite e redução de episódios de vômito, validando o intervalo de 48 horas.',
      evidenceLevel: 'Nível I — Ensaio Clínico Randomizado Controlado',
    },
    {
      id: 'ref-poole-mirataz-2019',
      citationText:
        'Poole M, Quimby JM, Hu T, et al. A double-blind, placebo-controlled, randomized study to evaluate the weight gain efficacy of transdermal mirtazapine ointment in cats with unintended weight loss. J Vet Pharmacol Ther. 2019;42(2):179-188. doi:10.1111/jvp.12738.',
      sourceType: 'Ensaio clínico pivotal multicêntrico prospectivo controlado duplo-cego',
      url: 'https://pubmed.ncbi.nlm.nih.gov/30880313/',
      notes: 'Ensaio pivotal do Mirataz em 177 gatos com perda involuntária de peso demonstrando ganho ponderal médio de 3,9% em 14 dias com fita de 2 mg auricular q24h versus 0,4% no placebo (P < 0,0001).',
      evidenceLevel: 'Nível I — Ensaio Clínico Pivotal FDA',
    },
    {
      id: 'ref-quimby-pk-2011',
      citationText:
        'Quimby JM, Gustafson DL, Lunn KF. The pharmacokinetics of mirtazapine in healthy cats. J Feline Med Surg. 2011;13(10):738-743. doi:10.1016/j.jfms.2011.06.003.',
      sourceType: 'Ensaio farmacocinético e farmacodinâmico experimental cruzado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/21899696/',
      notes: 'Comprovou que 1,88 mg e 3,75 mg promovem consumo alimentar idêntico em gatos, mas a dose alta duplica a meia-vida (15,9 h vs 9,2 h) e dispara efeitos adversos comportamentais acentuados.',
      evidenceLevel: 'Nível I — Ensaio Farmacocinético e Farmacodinâmico',
    },
    {
      id: 'ref-fitzpatrick-liver-2018',
      citationText:
        'Fitzpatrick RL, Quimby JM, Wittenburg LA, et al. The pharmacokinetics of mirtazapine in cats with liver disease. J Feline Med Surg. 2018;20(10):959-964. doi:10.1177/1098612X17743564.',
      sourceType: 'Ensaio farmacocinético clínico prospectivo em gatos com hepatopatia',
      url: 'https://pubmed.ncbi.nlm.nih.gov/29315878/',
      notes: 'Evidenciou meia-vida mediana prolongada para 13,8 horas (e até 61,4 horas em animais ictéricos) e retardo no Tmax, correlacionando-se com ALT, FA e bilirrubina, demandando q48-72h.',
      evidenceLevel: 'Nível II — Ensaio Farmacocinético Clínico Prospectivo',
    },
    {
      id: 'ref-theodoro-dogs-2025',
      citationText:
        'Theodoro D, Quimby JM, et al. Evaluation of mirtazapine as an appetite stimulant in hospitalized and client-owned dogs: a prospective crossover clinical trial and retrospective cohort analysis. Animals (Basel). 2025;15(3):389. doi:10.3390/ani15030389.',
      sourceType: 'Ensaio clínico prospectivo randomizado duplo-cego cruzado e estudo retrospectivo pareado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/40941333/',
      notes: 'Estudo em cães: na coorte retrospectiva (n=107), taxa de resposta de 68,6% com dose mediana de ~0,6 mg/kg (OR 3,06); no ensaio prospectivo (n=25), 100% aceitaram alimento no D1 pós-mirtazapina vs 63,6% no placebo (P = 0,03).',
      evidenceLevel: 'Nível I — Ensaio Clínico Randomizado Duplo-Cego Crossover (2025)',
    },
    {
      id: 'ref-lim-motility-2014',
      citationText:
        'Lim HC, Delgado-Aros S, Busciglio I, et al. Effects of mirtazapine on gastrointestinal transit in dogs. Neurogastroenterol Motil. 2014;26(5):713-720. doi:10.1111/nmo.12322.',
      sourceType: 'Ensaio fisiológico e farmacodinâmico experimental em cães',
      url: 'https://pubmed.ncbi.nlm.nih.gov/24627566/',
      notes: 'Demonstrou que a mirtazapina acelera o esvaziamento gástrico e o trânsito colônico sem lentificar o intestino delgado em cães sadios.',
      evidenceLevel: 'Nível II — Estudo Experimental Farmacodinâmico',
    },
    {
      id: 'ref-ferguson-toxicity-2016',
      citationText:
        'Ferguson LE, McLean MK, Bates N, Quimby JM. Mirtazapine toxicity in cats: retrospective study of 84 cases (2006-2011). J Feline Med Surg. 2016;18(11):868-874. doi:10.1177/1098612X15599026.',
      sourceType: 'Estudo epidemiológico toxicológico retrospectivo multicêntrico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/26526189/',
      notes: 'Análise de 84 felinos com toxicidade por mirtazapina: os principais sinais foram vocalização (56%), agitação (31%), vômito (26%) e ataxia (17%), consolidando a ciproeptadina como antídoto de resgate.',
      evidenceLevel: 'Nível II — Estudo Epidemiológico e Farmacovigilância',
    },
    {
      id: 'ref-isfm-inappetence-2022',
      citationText:
        'Taylor S, Sparkes A, Briscoe K, et al. ISFM Consensus Guidelines on Management of the Inappetent Hospitalised Cat. J Feline Med Surg. 2022;24(7):614-640. doi:10.1177/1098612X221105436.',
      sourceType: 'Diretriz de Consenso Internacional ISFM',
      url: 'https://pubmed.ncbi.nlm.nih.gov/35762145/',
      notes: 'Consenso recomendando a mirtazapina na dose de 1,88 a 2 mg/gato VO q48h ou 2 mg transdérmico, enfatizando que estimulantes não devem adiar a passagem de sonda em jejum superior a 3 dias.',
      evidenceLevel: 'Consenso Internacional de Especialistas',
    },
    {
      id: 'ref-nelson-couto-6th',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2020. Cap. 27: Manifestations of Gastrointestinal Disease (Anorexia) & Cap. 42: Chronic Kidney Disease, pp. 438–442, 698–704.',
      sourceType: 'Livro-texto de Medicina Interna Veterinária',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-ettinger-9th',
      citationText:
        'Côté E, Ettinger SJ, Feldman EC. Ettinger’s Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2024. Cap. 40: Anorexia, Nausea, and Vomiting & Cap. 282: Chronic Kidney Disease in Dogs and Cats, pp. 215–222, 1720–1728.',
      sourceType: 'Tratado de Medicina Interna Veterinária',
      evidenceLevel: 'Referência terciária especializada',
    },
  ],

  presentations: [
    {
      id: 'pres-mirtz-2mg',
      name: 'Mirtz 2 mg Comprimidos Palatáveis para Gatos',
      brand: 'Agener União Saúde Animal (Uso Veterinário Aprovado no Brasil)',
      form: 'Comprimido palatável divisível',
      concentrationValue: 2.0,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 12 comprimidos palatáveis de 2 mg (Portaria MAPA 837/2025 via SIPEAGRO)',
      route: 'Oral (VO)',
      channel: 'veterinary',
    },
    {
      id: 'pres-mirataz-td',
      name: 'Mirataz 20 mg/g (2%) Pomada Transdérmica Felina',
      brand: 'Dechra Veterinary Products / KindredBio (Referência Internacional FDA)',
      form: 'Pomada transdérmica auricular',
      concentrationValue: 20.0,
      concentrationUnit: 'mg/g',
      packInfo: 'Bisnaga com 5 g (100 mg de mirtazapina total; fita de 3,8 cm = 2 mg)',
      route: 'Tópica / Transdérmica (TD no pavilhão auricular)',
      channel: 'veterinary',
    },
    {
      id: 'pres-remeron-soltab-15mg',
      name: 'Remeron SolTab 15 mg Comprimidos Orodispersíveis',
      brand: 'Organon Farmacêutica (Referência Humana no Brasil)',
      form: 'Comprimido orodispersível',
      concentrationValue: 15.0,
      concentrationUnit: 'mg',
      packInfo: 'Caixa com 30 comprimidos orodispersíveis de 15 mg (Portaria 344/98 Lista C1)',
      route: 'Oral (VO)',
      channel: 'human_pharmacy',
    },
    {
      id: 'pres-mirtazapine-gen-15mg',
      name: 'Mirtazapina 15 mg Comprimidos Revestidos (Genérico)',
      brand: 'EMS, Medley, Eurofarma, Teuto (Farmácia Humana)',
      form: 'Comprimido revestido divisível',
      concentrationValue: 15.0,
      concentrationUnit: 'mg',
      packInfo: 'Caixa com 30 comprimidos de 15 mg (Portaria 344/98 Lista C1)',
      route: 'Oral (VO)',
      channel: 'human_pharmacy',
    },
    {
      id: 'pres-mirtazapine-mag-susp-5mg',
      name: 'Mirtazapina Suspensão Oral Manipulada Veterinária 5 mg/mL (Veículo Palatável)',
      brand: 'Farmácia de Manipulação Veterinária Especializada',
      form: 'Suspensão oral líquida palatável',
      concentrationValue: 5.0,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco dosador de 30 mL a 60 mL acompanhado de seringa dosadora de 1 mL',
      route: 'Oral (VO)',
      channel: 'compounded',
    },
    {
      id: 'pres-mirtazapine-mag-caps',
      name: 'Mirtazapina Cápsulas Magistrais Veterinárias (0,5 mg a 15 mg)',
      brand: 'Farmácia de Manipulação Veterinária Especializada',
      form: 'Cápsula gelatinosa manipulada sob medida',
      concentrationValue: 1.88,
      concentrationUnit: 'mg',
      packInfo: 'Frasco com 30, 60 ou 90 cápsulas na dosagem exata prescrita',
      route: 'Oral (VO)',
      channel: 'compounded',
    },
  ],

  attentionSubtitle:
    'Dose felina inicial estrita (2 mg q48h), ajuste mandatório em DRC e hepatopatia, risco crítico de síndrome serotoninérgica e contraindicação com IMAO.',

  attentionData: {
    precautions: [
      {
        condition: 'Emprego de Doses Altas Históricas em Gatos (3,75 mg) vs Princípio da Menor Dose Eficaz',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A administração de 3,75 mg/gato VO satura as vias metabólicas de eliminação por não linearidade cinética, prolongando a meia-vida para ~16 horas e disparando hiperestimulação serotoninérgica/adrenérgica central sem gerar ganho adicional no consumo alimentar em comparação a 1,88 mg (Quimby et al. 2011). Causa miados ininterruptos (56%), agitação (31%), taquicardia e tremores.',
        clinicalAction:
          'Iniciar sempre com 1,88 a 2 mg por gato (ou 1 comprimido de Mirtz 2 mg) por via oral a cada 48 horas. Jamais iniciar terapia felina com doses de 3,75 mg.',
      },
      {
        condition: 'Associação Inadvertida com Inibidores da MAO (Selegilina, Amitraz)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Os IMAOs bloqueiam a degradação mitocondrial de monoaminas enquanto a mirtazapina desinibe a liberação pré-sináptica de serotonina e noradrenalina. Essa associação deflagra acúmulo suprafisiológico maciço de serotonina na fenda sináptica, culminando em crise serotoninérgica maligna com hipertermia severa, convulsões, instabilidade autonômica e morte.',
        clinicalAction:
          'Contraindicação absoluta de uso simultâneo. Respeitar período obrigatório de washout de no mínimo 14 dias após descontinuar selegilina ou amitraz antes de iniciar a mirtazapina.',
      },
      {
        condition: 'Doença Renal Crônica Felina Estágios 2 a 4 (Clearance Reduzido)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Na DRC felina, o clearance oral despenca para 0,6 L/h/kg e a meia-vida se estende para 15,2 horas (Quimby & Lunn 2013). Administrações diárias (q24h) levam a acúmulo sistêmico progressivo do fármaco e toxicidade neurocomportamental.',
        clinicalAction:
          'Administrar estritamente a cada 48 horas (q48h) na dose de 1,88 mg a 2 mg por gato. Monitorar escore de apetite, peso e creatinina sérica.',
      },
      {
        condition: 'Hepatopatia e Colestase com Hiperbilirrubinemia em Felinos',
        alertLevel: 'warning',
        physiologicalExplanation:
          'O metabolismo microssomal oxidativo e a conjugação hepática ficam severamente comprometidos na insuficiência hepática felina, prolongando a meia-vida para medianas de 13,8 horas e até 61,4 horas em gatos ictéricos (Fitzpatrick et al. 2018).',
        clinicalAction:
          'Utilizar com extrema cautela, iniciando com intervalo de 48 horas e espaçando para 72 horas em pacientes ictéricos se houver sonolência prolongada. Não postergar colocação de sonda alimentar em suspeita de lipidose.',
      },
      {
        condition: 'Coadministração com Fármacos Serotoninérgicos (Tramadol, Trazodona, Fluoxetina)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'A somação de mecanismos que elevam serotonina central aumenta o risco de toxicidade serotoninérgica aditiva, agitação paradoxal e hipertermia.',
        clinicalAction:
          'Avaliar a real necessidade da combinação. Monitorar reflexos, tremores musculares e frequência cardíaca; se surgirem mioclonias ou agitação, suspender a coterapia e instituir ciproeptadina.',
      },
      {
        condition: 'Exposição Ocupacional e Cuidados de Aplicação da Pomada Transdérmica',
        alertLevel: 'warning',
        physiologicalExplanation:
          'A mirtazapina transdérmica é formulada para permeação contínua no estrato córneo e é prontamente absorvida pela pele humana, podendo induzir sedação, tontura e reações medicamentosas em tutores e profissionais.',
        clinicalAction:
          'O aplicador deve utilizar luvas descartáveis obrigatoriamente a cada aplicação. Evitar contato direto de pessoas (especialmente crianças e gestantes) e outros animais domésticos com a orelha tratada por pelo menos 2 horas após a pomada.',
      },
    ],

    adverseEffectsDetailed: [
      {
        effect: 'Vocalização Excessiva, Miados Incessantes e Alterações Comportamentais',
        frequency: 'common',
        mechanism: 'Desinibição monoaminérgica central desregulada e hiperestimulação límbica/noradrenérgica, exacerbada por doses acima de 2 mg/gato.',
        clinicalManagement:
          'Observada em 56% dos gatos no estudo de toxicidade de Ferguson et al. (2016). Autolimitada na maioria das vezes. Reduzir a dose para 1,88 mg ou espaçar para q48h; se grave, administrar ciproeptadina.',
      },
      {
        effect: 'Agitação Psicomotora, Inquietação e Dificuldade para Relaxar',
        frequency: 'common',
        mechanism: 'Aumento da liberação sináptica de noradrenalina por antagonismo alfa-2 pré-sináptico.',
        clinicalManagement:
          'Manter o paciente em ambiente calmo e silencioso. Evitar doses repetidas precoces; os sinais costumam remitir espontaneamente em 12 a 24 horas.',
      },
      {
        effect: 'Sedação Motora, Letargia e Sonolência',
        frequency: 'common',
        mechanism: 'Antagonismo potente e de alta afinidade sobre os receptores histaminérgicos H1 centrais.',
        clinicalManagement:
          'Mais comum em cães sob doses > 1 mg/kg. Otimizar para a faixa conservadora de 0,5 a 0,6 mg/kg (Theodoro et al. 2025). Administrar preferencialmente no período noturno.',
      },
      {
        effect: 'Tremores Musculares, Fasciculações e Ataxia Motora',
        frequency: 'uncommon',
        mechanism: 'Elevação do tônus monoaminérgico central e periférico sobre vias motoras extrapiramidais.',
        clinicalManagement:
          'Suspender temporariamente a medicação. Diferenciar de crises convulsivas. Em caso de tremores severos de origem serotoninérgica, administrar ciproeptadina.',
      },
      {
        effect: 'Vômitos Transitórios Paradoxais e Sialorreia',
        frequency: 'common',
        mechanism: 'Irritação gástrica mecânica, aversão ao sabor ou aceleração motora antral gástrica aguda.',
        clinicalManagement:
          'Fornecer o medicamento junto com uma pequena porção de refeição palatável. Se vômitos persistirem, avaliar causa primária subjacente (pancreatite, uremia descompensada).',
      },
      {
        effect: 'Eritema, Crostas e Descamação Auricular (Uso Transdérmico)',
        frequency: 'common',
        mechanism: 'Reação inflamatória local e dermatite de contato induzida pelo veículo da pomada ou atrito mecânico contínuo.',
        clinicalManagement:
          'Ocorre em ~10% dos gatos sob Mirataz. Limpar suavemente resíduos acumulados com gaze embebida em solução salina morna e alternar obrigatoriamente a orelha tratada diariamente.',
      },
      {
        effect: 'Taquicardia Sinusal e Respiração Ofegante',
        frequency: 'uncommon',
        mechanism: 'Estimulação adrenérgica central reflexa decorrente do incremento noradrenérgico sistêmico.',
        clinicalManagement:
          'Monitorar frequência cardíaca e ausculta cardiopulmonar; verificar hidratação e afastar desidratação concomitante.',
      },
    ],
  },

  generalInfoData: {
    routesDetailed: [
      {
        route: 'Oral (VO)',
        technique:
          'Via de escolha primária e padrão na medicina de cães e gatos. Pode ser administrado com ou sem alimentos, visto que estudos comprovam que a presença de alimento não altera a biodisponibilidade sistêmica. Recomenda-se oferecer junto com uma pequena porção de refeição para minimizar náuseas.',
        nursingCare:
          'Garantir a deglutição completa do comprimido ou suspensão. Em gatos, utilizar comprimidos específicos palatáveis (Mirtz 2 mg) ou suspensões orais dosadas com seringas de precisão.',
        limitations:
          'Pode haver aversão gustativa em gatos ao manipular comprimidos humanos fracionados; o estresse da contenção oral forçada pode agravar a anorexia em felinos.',
      },
      {
        route: 'Transdérmica Auricular (TD)',
        technique:
          'Aplicação tópica na face interna do pavilhão auricular (orelha), na área glabra vascularizada entre o meato acústico e a margem cartilaginosa. Aplicar a extensão exata recomendada (fita de 3,8 cm da pomada Mirataz a 2% = 2 mg de mirtazapina).',
        nursingCare:
          'Obrigatório o uso de luvas descartáveis pelo aplicador. Alternar diariamente a orelha direita e esquerda. Limpar resíduos secos com pano suave antes da nova aplicação. Evitar contato por 2 horas pós-aplicação.',
        limitations:
          'Custo elevado e disponibilidade comercial restrita no Brasil (geralmente produto importado ou manipulado em veículos transdérmicos como Lipoderm, cuja variabilidade de potência exige cautela analítica).',
      },
    ],

    pharmacologicalClassification: {
      chemicalClass: 'Derivado Piperazinoazepina / Antidepressivo Tetracíclico Atípico (NaSSA)',
      chemicalClassDescription:
        'Composto orgânico heterocíclico policíclico (1,2,3,4,10,14b-hexa-hidro-2-metildipirido[2,3-c:3,2-t]azepina) com fórmula molecular C17H19N3 e massa molecular de 265,35 g/mol, estruturalmente classificado como antidepressivo noradrenérgico e serotoninérgico específico.',
      therapeuticClass: 'Estimulante do Apetite (Orexígeno Central) e Antiemético / Antináusea',
      therapeuticClassDescription:
        'Fármaco de dupla ação neuroquímica que atua desinibindo a liberação central de monoaminas enquanto antagoniza receptores específicos 5-HT2, 5-HT3 e H1, proporcionando potente efeito orexígeno associado a controle de náusea e êmese.',
      atcCode: 'N06AX11',
      receptorTargets: [
        'Autorreceptores e Heterorreceptores Alfa-2 Adrenérgicos Pré-Sinápticos Centrais',
        'Receptores Serotoninérgicos 5-HT2A e 5-HT2C Hipotalâmicos',
        'Receptores Serotoninérgicos 5-HT3 na CTZ e Fibras Aferentes Vagais',
        'Receptores Histaminérgicos H1 Centrais',
        'Receptores Alfa-1 Adrenérgicos Periféricos',
      ],
      receptorsAndSites: [
        {
          name: 'Autorreceptores Alfa-2 Adrenérgicos Pré-Sinápticos',
          type: 'Receptor acoplado a proteína Gi/o pré-sináptico central',
          action: 'Antagonismo competitivo com desinibição de feedback negativo',
          clinicalEffect:
            'Aumento substancial da liberação sináptica de noradrenalina e ativação de receptores pós-sinápticos que sinalizam apetite no hipotálamo.',
        },
        {
          name: 'Receptores Serotoninérgicos 5-HT2C Hipotalâmicos',
          type: 'Receptor acoplado a proteína Gq no centro hipotalâmico da saciedade',
          action: 'Antagonismo competitivo seletivo',
          clinicalEffect:
            'Bloqueio dos sinais inibitórios de saciedade mediados por neurônios POMC, promovendo estímulo robusto do consumo alimentar voluntário.',
        },
        {
          name: 'Receptores Serotoninérgicos 5-HT3 (CTZ e Assoalho do 4º Ventrículo)',
          type: 'Canal iônico regulado por ligante pentamérico (ionotrópico)',
          action: 'Antagonismo seletivo potente de alta afinidade',
          clinicalEffect:
            'Inibição direta da neurotransmissão emética na área postrema e vias vagais digestivas, suprimindo náuseas e vômitos associados a uremia e quimioterapia.',
        },
        {
          name: 'Receptores Histaminérgicos H1 Centrais',
          type: 'Receptor acoplado a proteína Gq cerebral',
          action: 'Antagonismo competitivo de altíssima afinidade',
          clinicalEffect:
            'Potente estímulo do apetite associado a efeito sedativo/calmante dose-dependente.',
        },
      ],
      detailedTargets: [
        {
          target: 'Centro Hipotalâmico de Controle do Apetite',
          action: 'Modulação combinada noradrenérgica, 5-HT2C e H1',
          clinicalSignificance:
            'Resgate rápido da ingesta alimentar voluntária e ganho de peso em cães e gatos desnutridos ou caquéticos.',
        },
        {
          target: 'Zona Disparadora dos Quimiorreceptores (CTZ) e Trato Solitário',
          action: 'Antagonismo 5-HT3 direto',
          clinicalSignificance:
            'Ação antiemética e alívio da náusea crônica, permitindo que animais urêmicos voltem a se alimentar sem aversão alimentar secundária.',
        },
      ],
    },

    prescriptionType: {
      category: 'Medicamento Sujeito a Controle Especial (Duplo Enquadramento Regulatório)',
      ordinanceOrLaw: 'Portaria SVS/MS nº 344/1998 (Lista C1) & Portaria MAPA nº 837/2025 (SIPEAGRO)',
      retentionRequired: true,
      guidelines:
        'No Brasil, a mirtazapina possui dois enquadramentos legais distintos: 1. Medicamentos de Uso Humano (comprimidos orais e orodispersíveis de farmácias comerciais): enquadram-se na Lista C1 da Portaria 344/98 da Anvisa, exigindo prescrição médico-veterinária em Receita de Controle Especial em duas vias branca (1ª via retida na farmácia, 2ª via devolvida ao tutor; validade de 30 dias contados da emissão, limite de até 60 dias de tratamento). 2. Medicamentos de Uso Exclusivamente Veterinário registrados no MAPA (Mirtz 2 mg da Agener União): regulamentados pela Portaria MAPA nº 837/2025, exigindo Notificação de Receita Veterinária (NRV) emitida obrigatoriamente através do Sistema SIPEAGRO em 2 vias, com controle de estoque e escrituração pelo estabelecimento veterinário.',
    },

    speciesPeculiarities: [
      {
        species: 'cat',
        title: 'Cinética Não Linear, Menor Capacidade de Glicuronidação e Sensibilidade Comportamental',
        description:
          'Os felinos apresentam deficiência evolutiva em vias de glicuronidação hepática, resultando em menor capacidade de depuração e depuração corporal lenta. O estudo farmacocinético seminal de Quimby et al. (2011) revelou que a mirtazapina exibe cinética não linear em gatos: dobrar a dose de 1,88 mg para 3,75 mg eleva a meia-vida de 9,2 para 15,9 horas e satura as vias de clearance. Clinicamente, 1,88 mg e 3,75 mg produzem o mesmo consumo de alimento, porém a dose de 3,75 mg desencadeia alterações comportamentais marcantes (vocalização em 56%, agitação em 31%, taquicardia e tremores). Na Doença Renal Crônica (Quimby & Lunn 2013), a depuração cai para 0,6 L/h/kg e a meia-vida sobe para 15,2 horas, exigindo intervalo estendido a cada 48 horas (q48h). Na hepatopatia (Fitzpatrick et al. 2018), a meia-vida pode atingir até 61,4 horas em gatos ictéricos.',
        clinicalImplications:
          'Iniciar sempre com 1,88 a 2 mg por gato (1 comprimido de Mirtz 2 mg) por via oral a cada 48 horas. Jamais utilizar doses iniciais de 3,75 mg. Ter a ciproeptadina disponível como antídoto em caso de vocalização e inquietação extrema.',
      },
      {
        species: 'dog',
        title: 'Cinética Linear com Meia-Vida Curta e Alta Responsividade a Doses Conservadoras',
        description:
          'Cães sadios apresentam meia-vida plasmática significativamente mais curta (média de 6,17 horas) e clearance plasmático muito mais rápido (~1193 mL/kg/hora) do que gatos, com eliminação mais homogênea. Embora os formulários tradicionais (Plumb e BSAVA) citem doses de 1,1 a 1,3 mg/kg q24h (com teto estrito de 30 mg/dia), o recente estudo de Theodoro et al. (2025) demonstrou que doses conservadoras de 0,5 a 0,6 mg/kg VO q24h (ou faixas fixas de 3,75 a 15 mg/cão) são altamente eficazes (100% de aceitação alimentar no Dia 1 versus 63,6% no placebo) e evitam a sedação profunda e a letargia induzidas por doses mais altas.',
        clinicalImplications:
          'Prescrever preferencialmente na faixa conservadora de 0,5 a 0,6 mg/kg VO a cada 24 horas para minimizar sedação. Respeitar o limite máximo absoluto de 30 mg por cão uma vez ao dia, independentemente do porte.',
      },
    ],

    curiositiesAndHistory: [
      'Sintetizada originalmente na década de 1980 pela empresa farmacêutica holandesa Organon (código Org 3770) como um antidepressivo inovador com menor incidência de náuseas em relação aos SSRIs devido ao seu bloqueio intrínseco de receptores 5-HT3.',
      'O ganho de peso e o aumento marcante do apetite observados em ensaios clínicos humanos levaram a pesquisadora norte-americana Dra. Jessica Quimby (Colorado State University) a investigar o fármaco como terapia orexígena pioneira para gatos com doença renal crônica a partir de 2011.',
      'Em 2018, a formulação transdérmica veterinária em pomada auricular (Mirataz, KindredBio/Dechra) foi aprovada pelo FDA dos Estados Unidos, tornando-se o primeiro medicamento formalmente aprovado e rotulado especificamente para o controle de perda involuntária de peso em felinos.',
      'No Brasil, o desenvolvimento do Mirtz 2 mg pela Agener União / União Química representou a primeira apresentação oral veterinária especificamente dosada para gatos (2 mg/comprimido palatável), solucionando o problema histórico da partição irregular e imprecisa de comprimidos humanos de 15 mg e 30 mg.',
      'A ciproeptadina, outro clássico estimulante de apetite veterinário, tem uma relação farmacológica paradoxal com a mirtazapina: como bloqueia receptores de serotonina, anula o efeito da mirtazapina se dados juntos, mas atua como salvadora no tratamento de resgate de intoxicação por mirtazapina.',
    ],
  },

  practicalWeightTable: {
    standardDoseText:
      'Posologia orientativa de Mirtazapina por faixa de peso corporal para cães (dose conservadora orexígena de 0,5 a 0,6 mg/kg q24h e dose de formulário de 1,1 a 1,3 mg/kg q24h com teto de 30 mg/dia). Em felinos adultos, a dose padrão preconizada é fixa por animal: 1 comprimido de Mirtz 2 mg VO a cada 48 horas (ou cápsula manipulada de 1,88 a 2 mg q48h), independentemente do peso adulto.',
    headers: [
      'Faixa de Peso Corporal / Porte',
      'Dose Canina Conservadora (0,5–0,6 mg/kg q24h)',
      'Dose Canina Formulário (1,1–1,3 mg/kg q24h)',
      'Apresentação e Esquema Sugerido',
    ],
    rows: [
      {
        weight: 'Gatos Adultos (2 a 6 kg)',
        totalDose: '2,0 mg fixo por gato q48h',
        col1: '1,88 mg a 2,0 mg fixo por gato q48h',
        col2: '1 comp. Mirtz 2 mg VO q48h (ou cápsula manipulada 2 mg)',
      },
      {
        weight: '2 kg (Cão Miniatura / Filhote)',
        totalDose: '1,0 a 1,2 mg q24h',
        col1: '2,2 a 2,6 mg q24h',
        col2: 'Cápsula manipulada 1 a 2 mg ou 0,2 a 0,4 mL suspensão 5 mg/mL',
      },
      {
        weight: '5 kg (Cão Pequeno Porte)',
        totalDose: '2,5 a 3,0 mg q24h',
        col1: '5,5 a 6,5 mg q24h',
        col2: 'Cápsula manipulada 3 mg ou 0,6 mL suspensão 5 mg/mL',
      },
      {
        weight: '10 kg (Cão Pequeno/Médio)',
        totalDose: '5,0 a 6,0 mg q24h',
        col1: '11,0 a 13,0 mg q24h',
        col2: 'Cápsula manipulada 5 mg ou 1 comp. humano 15 mg fracionado (dose alta)',
      },
      {
        weight: '15 kg (Cão Porte Médio)',
        totalDose: '7,5 a 9,0 mg q24h',
        col1: '16,5 a 19,5 mg q24h',
        col2: '1/2 comp. humano 15 mg (7,5 mg) ou cápsula manipulada 8–18 mg',
      },
      {
        weight: '20 kg (Cão Médio/Grande)',
        totalDose: '10,0 a 12,0 mg q24h',
        col1: '22,0 a 26,0 mg q24h',
        col2: 'Cápsula manipulada 10 mg ou comp. humano 15 mg (ou 1 comp 30 mg dose alta)',
      },
      {
        weight: '30 kg (Cão Grande Porte)',
        totalDose: '15,0 a 18,0 mg q24h',
        col1: '30,0 mg q24h (Dose Teto)',
        col2: '1 comp. humano 15 mg (dose conservadora) ou 1 comp. 30 mg (dose teto)',
      },
      {
        weight: '40 kg ou mais (Cão Gigante)',
        totalDose: '20,0 a 24,0 mg q24h',
        col1: '30,0 mg q24h (Limite Teto Absoluto)',
        col2: '1 comp. humano 30 mg q24h (Atenção: Plumb veda doses acima de 30 mg/dia)',
      },
    ],
  },

  samplePrescriptionText:
    'USO VETERINÁRIO — PRESCRIÇÃO CONTROLADA MAPA (SIPEAGRO) / LISTA C1 PORTARIA 344/98\\n\\n' +
    'MODELO 1 — GATO COM DOENÇA RENAL CRÔNICA E HIPOREXIA (MIRTZ 2 MG):\\n' +
    'NOTIFICAÇÃO DE RECEITA VETERINÁRIA (NRV — 2 VIAS)\\n' +
    'IDENTIFICAÇÃO DO EMITENTE: Dr(a). [Nome do Médico Veterinário], CRMV-[UF] nº [XXXXX]\\n' +
    'IDENTIFICAÇÃO DO TUTOR: [Nome do Tutor], CPF: [000.000.000-00], Endereço: [Endereço Completo]\\n' +
    'IDENTIFICAÇÃO DO PACIENTE: [Nome do Paciente], Espécie: Felina, Idade: 11 anos, Peso: 3,8 kg\\n\\n' +
    'USO ORAL\\n' +
    '1. Mirtz 2 mg Comprimidos Palatáveis para Gatos (Agener União) ------------ 1 frasco (12 comprimidos)\\n' +
    '   Posologia: Administrar 1 (um) comprimido palatável por via oral a cada 48 horas (dia sim, dia não), preferencialmente no mesmo horário, durante 3 semanas consecutivas.\\n\\n' +
    'ORIENTAÇÕES OBRIGATÓRIAS AO TUTOR:\\n' +
    '- Não administrar o comprimido todos os dias. O intervalo de 48 horas é estritamente necessário para que o organismo do gato elimine a medicação com segurança.\\n' +
    '- O medicamento visa resgatar o apetite voluntário e controlar o enjoo urêmico; ofereça o alimento úmido ou terapêutico preferido do gato 1 a 2 horas após a medicação.\\n' +
    '- Caso note miados excessivos, agitação motora ou tremores, comunique imediatamente a clínica veterinária.\\n' +
    '- Retorno programado em 21 dias para reavaliação de peso corporal, creatinina e estadiamento renal IRIS.\\n\\n' +
    '--------------------------------------------------------------------------------\\n\\n' +
    'MODELO 2 — CÃO HOSPITALIZADO EM CONVALESCENÇA COM INAPETÊNCIA (HUMANA LISTA C1):\\n' +
    'RECEITA DE CONTROLE ESPECIAL (2 VIAS BRANCA — PORTARIA SVS/MS Nº 344/1998 LISTA C1)\\n' +
    'IDENTIFICAÇÃO DO EMITENTE: Dr(a). [Nome Completo], Médico(a) Veterinário(a), CRMV-[UF] [Número]\\n' +
    'IDENTIFICAÇÃO DO TUTOR: [Nome do Tutor], CPF: [000.000.000-00], Endereço: [Endereço Completo]\\n' +
    'IDENTIFICAÇÃO DO PACIENTE: [Nome do Paciente], Espécie: Canina, Raça: Labrador, Peso: 30,0 kg\\n\\n' +
    'USO ORAL\\n' +
    '1. Mirtazapina 15 mg Comprimidos Revestidos (Genérico Humano) ------------ 1 caixa (30 comprimidos)\\n' +
    '   Posologia: Fornecer 1 (um) comprimido por via oral uma vez ao dia (a cada 24 horas), à noite após uma pequena porção de refeição, durante 7 a 10 dias consecutivos.\\n\\n' +
    'ORIENTAÇÕES AO TUTOR:\\n' +
    '- Medicamento sujeito a controle especial com retenção de receita na drogaria humana.\\n' +
    '- Fornecer à noite, pois o remédio pode induzir sonolência nas primeiras horas pós-dose.\\n' +
    '- Não ultrapassar a dose de 1 comprimido por dia.',

  clinicalStudiesCommented: [
    {
      title: 'Mirtazapine as an appetite stimulant and antiemetic in cats with chronic kidney disease: a masked placebo-controlled crossover clinical trial',
      authorsYear: 'Quimby JM, Lunn KF. (2013)',
      journal: 'The Veterinary Journal',
      studyDesign: 'Ensaio clínico prospectivo, randomizado, mascarado, duplo-cego e cruzado controlado por placebo (RCT Nível I)',
      sampleSize: 'Gatos com Doença Renal Crônica estável (estágios IRIS 2 e 3)',
      mainFindings: 'A administração de mirtazapina na dose de 1,88 mg por gato VO a cada 48 horas promoveu aumento estatisticamente significativo do consumo alimentar diário, ganho médio de peso corporal e redução expressiva na frequência de episódios de vômito e náusea em comparação ao placebo (P < 0,05). A meia-vida observada de 15,2 horas validou cientificamente o intervalo de administração a cada 48 horas em felinos nefropatas.',
      clinicalTakeaway: 'Estudo seminal que consagrou a mirtazapina como padrão-ouro para estimulação do apetite e controle de náusea urêmica em gatos com DRC, estabelecendo a posologia de q48h para evitar toxicidade cumulativa.',
      referenceId: 'ref-quimby-ckd-2013',
    },
    {
      title: 'A double-blind, placebo-controlled, randomized study to evaluate the weight gain efficacy of transdermal mirtazapine ointment in cats with unintended weight loss',
      authorsYear: 'Poole M, Quimby JM, Hu T, et al. (2019)',
      journal: 'Journal of Veterinary Pharmacology and Therapeutics (JVPT)',
      studyDesign: 'Ensaio clínico pivotal multicêntrico prospectivo, randomizado, duplo-cego e controlado por placebo',
      sampleSize: '177 gatos apresentando perda de peso corporal não intencional de causas variadas',
      mainFindings: 'Gatos tratados com pomada transdérmica de mirtazapina a 2% (fita de 3,8 cm = 2 mg/gato aplicada no pavilhão auricular q24h) exibiram ganho médio de peso corporal de +3,9% após 14 dias de tratamento, em comparação a apenas +0,4% no grupo placebo (P < 0,0001). Eventos adversos locais no pavilhão auricular (eritema e crostas) ocorreram em aproximadamente 10% dos animais e foram de intensidade leve.',
      clinicalTakeaway: 'Ensaio pivotal que fundamentou a aprovação do Mirataz pelo FDA, demonstrando que a via transdérmica auricular é altamente eficaz para reverter perda de peso em gatos de difícil medicação oral.',
      referenceId: 'ref-poole-mirataz-2019',
    },
    {
      title: 'The pharmacokinetics of mirtazapine in healthy cats',
      authorsYear: 'Quimby JM, Gustafson DL, Lunn KF. (2011)',
      journal: 'Journal of Feline Medicine and Surgery (JFMS)',
      studyDesign: 'Ensaio experimental prospectivo farmacocinético e farmacodinâmico cruzado',
      sampleSize: 'Gatos domésticos jovens adultos hígidos avaliados com doses de 1,88 mg e 3,75 mg',
      mainFindings: 'Comprovou que a farmacocinética da mirtazapina em gatos é não linear: a meia-vida quase dobrou de 9,2 horas na dose de 1,88 mg para 15,9 horas na dose de 3,75 mg. Farmacodinamicamente, ambas as doses estimularam o consumo alimentar de forma comparável, porém a dose de 3,75 mg provocou alterações comportamentais significativamente mais frequentes e intensas (vocalização contínua, inquietação e agitação).',
      clinicalTakeaway: 'Estabeleceu o princípio farmacológico de que mais mirtazapina não gera mais apetite em gatos, fundamentando a dose inicial conservadora de 1,88 a 2 mg por felino.',
      referenceId: 'ref-quimby-pk-2011',
    },
    {
      title: 'The pharmacokinetics of mirtazapine in cats with liver disease',
      authorsYear: 'Fitzpatrick RL, Quimby JM, Wittenburg LA, et al. (2018)',
      journal: 'Journal of Feline Medicine and Surgery (JFMS)',
      studyDesign: 'Ensaio clínico farmacocinético prospectivo em gatos com hepatopatia',
      sampleSize: 'Felinos portadores de doença hepatobiliar primária ou secundária confirmada laboratorialmente',
      mainFindings: 'Evidenciou que a disfunção hepática felina retarda expressivamente o tempo para concentração máxima (Tmax de 4 horas versus 1 hora em sadios) e prolonga a meia-vida de eliminação plasmática terminal para uma mediana de 13,8 horas, com casos graves de icterícia atingindo 61,4 horas. O prolongamento correlacionou-se significativamente com elevações de ALT, fosfatase alcalina e bilirrubina sérica.',
      clinicalTakeaway: 'Alerta que gatos hepatopatas ou ictéricos depuram a mirtazapina com lentidão extrema, recomendando intervalos estendidos de 48 a 72 horas para prevenir sedação e toxicidade medicamentosa.',
      referenceId: 'ref-fitzpatrick-liver-2018',
    },
    {
      title: 'Evaluation of mirtazapine as an appetite stimulant in hospitalized and client-owned dogs: a prospective crossover clinical trial and retrospective cohort analysis',
      authorsYear: 'Theodoro D, Quimby JM, et al. (2025)',
      journal: 'Animals (MDPI)',
      studyDesign: 'Estudo misto com ensaio clínico prospectivo randomizado duplo-cego cruzado (RCT) e estudo de coorte retrospectivo',
      sampleSize: '107 cães na coorte retrospectiva e 25 cães no ensaio clínico prospectivo controlado por placebo',
      mainFindings: 'Na coorte retrospectiva, cães sob mirtazapina (dose mediana de ~0,6 mg/kg) apresentaram taxa de resposta orexígena de 68,6% versus 37,5% nos controles (OR 3,06, P = 0,004). No ensaio prospectivo duplo-cego, 100% dos cães tratados com mirtazapina aceitaram alimento no primeiro dia com latência mediana de 120 minutos, em comparação a 63,6% no grupo placebo (P = 0,03), com excelente tolerabilidade e mínima sedação.',
      clinicalTakeaway: 'Validação clínica contemporânea de alto nível de evidência comprovando que doses conservadoras de 0,5 a 0,6 mg/kg uma vez ao dia em cães são altamente eficazes para estimular o apetite sem produzir sedação profunda.',
      referenceId: 'ref-theodoro-dogs-2025',
    },
  ],

  relatedDiseaseSlugs: [
    'doenca-renal-cronica-caes-gatos',
    'triade-felina',
    'leishmaniose-visceral-canina',
  ],
};
