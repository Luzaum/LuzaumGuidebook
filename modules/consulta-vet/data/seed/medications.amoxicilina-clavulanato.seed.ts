import type { MedicationRecord } from '../../types/medication';

export const amoxicilinaClavulanatoMedicationsSeed: MedicationRecord[] = [
  {
    id: 'med-amoxicilina-clavulanato',
    slug: 'amoxicilina-clavulanato',
    title: 'Amoxicilina + Clavulanato de Potássio',
    activeIngredient: 'Amoxicilina Tri-hidratada + Clavulanato de Potássio',
    pharmacologicClass:
      'Antibacteriano bactericida; aminopenicilina potencializada por inibidor suicida de beta-lactamases (proporção veterinária padrão 4:1)',
    species: ['dog', 'cat'],
    category: 'infectologia',
    tags: [
      'Amoxicilina',
      'Clavulanato',
      'Co-amoxiclav',
      'Synulox',
      'Agemoxi CL',
      'Clavulin',
      'Aminopenicilina Potencializada',
      'Piodermite Canina',
      'Infecção Urinária',
      'ISCAID 2025',
      'IN Anvisa 360/2025',
    ],
    tradeNames: [
      'Synulox® Comprimidos Palatáveis 50 mg e 250 mg (Zoetis — Uso Veterinário Oficial)',
      'Agemoxi CL® Comprimidos Palatáveis 50 mg e 250 mg (Agener União — Uso Veterinário Oficial)',
      'Amoxivet® CL / Clavuderme® / Outros Similares Veterinários 50 mg e 250 mg (Proporção 4:1)',
      'Clavulin® Comprimidos 500/125 mg (4:1) e 875/125 mg (7:1) e Suspensão Oral (GSK / Genéricos — Uso Humano)',
    ],
    officialSiteUrl: 'https://www.zoetis.com.br/especies/animais-de-companhia/synulox-comprimidos-palataveis.aspx',
    leafletUrl: 'https://www.zoetis.com.br/especies/animais-de-companhia/synulox-comprimidos-palataveis.aspx',
    mechanismOfAction:
      'A amoxicilina é uma aminopenicilina semissintética hidrofílica com núcleo penam e anel beta-lactâmico que age como análogo estrutural do dipeptídeo terminal D-Ala-D-Ala. Liga-se de forma covalente e acila as proteínas ligadoras de penicilina (PBPs, principalmente D,D-transpeptidases bacterianas), inibindo a reação de transpeptidação indispensável à síntese das ligações cruzadas da parede celular de peptidoglicano em bactérias em replicação ativa, disparando autolisinas e promovendo lise osmótica bactericida. O ácido clavulânico (administrado sob a forma de sal potássico) é uma molécula beta-lactâmica que atua como inibidor baseado em mecanismo (inibidor suicida): liga-se ao sítio catalítico das serina-beta-lactamases bacterianas de classe A de Ambler (incluindo beta-lactamases estafilocócicas, enzimas de Pasteurella e enzimas plasmidiais de enterobactérias e Bacteroides fragilis), sofrendo ataque pela serina catalítica e formando um intermediário acil-enzima que inativa irreversivelmente a enzima. Essa inibição impede a hidrólise enzimática do anel beta-lactâmico da amoxicilina, preservando sua concentração e restaurando sua capacidade bactericida contra cepas produtoras de beta-lactamase.',
    plainLanguageSummary:
      'Antibiótico oral de primeira linha amplamente prescrito na clínica de cães e gatos para infecções de pele, feridas por mordeduras, abscessos, doença periodontal e infecções urinárias. A combinação une a amoxicilina (que mata a bactéria destruindo sua parede externa) ao ácido clavulânico (que age como um escudo desativador de enzimas de resistência chamadas beta-lactamases). PONTOS CRÍTICOS DE PLANTÃO: 1) As formulações veterinárias (como Synulox e Agemoxi CL) vêm na proporção de 4 partes de amoxicilina para 1 de clavulanato (4:1), com dose padrão de 12,5 mg/kg da associação total (10 mg/kg de amoxicilina + 2,5 mg/kg de clavulanato). Produtos humanos de farmácia podem vir na proporção 7:1 (875/125 mg) e NÃO devem ser calculados de forma idêntica. 2) O consenso dermatológico mundial do ISCAID de 2025 orienta que piodermite superficial deve ser tratada preferencialmente com xampu tópico de clorexidina 4%, reservando o antibiótico oral para falhas tópicas ou infecções profundas, sem necessidade da antiga regra de tratar por 2 semanas além da cura clínica.',

    indications: [
      'Piodermite canina superficial com falha de terapia tópica ou piodermite profunda por Staphylococcus pseudintermedius sensível à meticilina (MSSP), conforme diretrizes internacionais ISCAID 2025.',
      'Feridas cutâneas traumáticas contaminadas, celulites e abscessos subcutâneos polimicrobianos (Pasteurella, Streptococcus, Staphylococcus e anaeróbios) em cães e gatos, associado a drenagem cirúrgica.',
      'Cistite bacteriana esporádica em cães e gatos com indicação por urocultura e antibiograma em cursos curtos de 3 a 5 dias.',
      'Infecções da cavidade oral, doença periodontal grave e abscessos periapicais (flora anaeróbia e mista), como adjuvante à intervenção odontológica.',
      'Infecções do trato respiratório superior felino e canino com componente bacteriano secundário confirmado (quando Mycoplasma não for a suspeita primária).',
      'Transição oral (step-down) ambulatorial após estabilização parenteral inicial com ampicilina-sulbactam hospitalar.',
    ],

    contraindications: [
      'Histórico confirmado de anafilaxia, urticária imune, choque ou broncoespasmo induzido por penicilinas, aminopenicilinas ou outros beta-lactâmicos.',
      'Infecções confirmadas por bactérias resistentes à meticilina (MRSP em cães ou MRSA em gatos e humanos), nas quais a resistência decorre de PBP2a alterada imune ao clavulanato.',
      'Infecções por bactérias intrinsecamente resistentes à amoxicilina-clavulanato, incluindo Pseudomonas aeruginosa e Mycoplasma spp. (ausência de parede de peptidoglicano).',
      'Monoterapia em choque séptico, hipotermia profunda ou peritonite aguda instável (onde a absorção gastrointestinal é errática e imprevisível, exigindo terapia parenteral intravenosa).',
    ],

    cautions: [
      'Sempre verificar a proporção da formulação prescrita: produtos veterinários consagrados (Synulox®, Agemoxi CL®) possuem proporção 4:1 (dose padrão de 12,5 mg/kg total = 10 mg/kg amox + 2,5 mg/kg clav). Apresentações humanas de 875/125 mg são 7:1 e fornecem dose desbalanceada de clavulanato se calculadas genericamente pelo peso total.',
      'Piodermite superficial canina: o consenso ISCAID 2025 define xampu de clorexidina a 4% como tratamento de escolha prioritário. O uso sistêmico deve ser restrito a casos refratários, extensos ou profundos, suspendendo o tratamento assim que houver remissão clínica e citológica (sem a regra antiga de prolongar por 14 dias após a cura).',
      'Cistite bacteriana: o breakpoint de suscetibilidade urinário de amoxicilina-clavulanato (menor que 8/4 mcg/mL) reflete as altas concentrações na bexiga e NÃO é aplicável para pielonefrite, que requer níveis teciduais sistêmicos adequados.',
      'Gatos com doença renal crônica (DRC) e azotemia apresentam aumento substancial da concentração sérica de amoxicilina com paradoxal redução da concentração urinária e maior índice de efeitos adversos gastrointestinais, exigindo acompanhamento estreito e individualização.',
      'O ácido clavulânico é extremamente suscetível à hidrólise por umidade ambiente: comprimidos devem ser mantidos no blister de alumínio original até o momento exato da administração, e suspensões orais reconstituídas devem ser refrigeradas e descartadas após 7 a 10 dias.',
      'Distúrbios gastrointestinais (vômito e diarreia) são comuns devido à irritação da mucosa e disbiose: administrar o comprimido imediatamente antes ou junto à refeição para melhorar a tolerabilidade sem prejudicar a absorção.',
    ],

    adverseEffects: [
      'Diarreia osmótica e fezes pastosas por disbiose da microbiota bacteriana intestinal benéfica (efeito comum decorrente do amplo espectro entérico).',
      'Náusea, sialorreia transitória e êmese precoce (frequente quando administrado em estômago completamente vazio).',
      'Hiporexia ou recusa voluntária de alimento durante os primeiros dias de tratamento oral.',
      'Reações cutâneas de hipersensibilidade imunomediada (eritema, prurido, placas urticariformes ou angioedema facial).',
      'Reações anafiláticas sistêmicas graves (muito raras, caracterizadas por colapso circulatório agudo, vômito em jato e dispneia).',
      'Elevação transitória e assintomática de enzimas hepáticas (ALT, fosfatase alcalina) ou colestase medicamentosa idiossincrática.',
      'Neurotoxicidade com espasmos musculares e convulsões descrita apenas em superdosagens extremas em pacientes com insuficiência renal anúrica.',
    ],

    // 1. Quatro Pilares Terapêuticos
    pillars: [
      {
        title: 'Ataque à Parede',
        icon: 'Shield',
        desc: 'A ampicilina/amoxicilina acila as PBPs transpeptidases, inibindo a síntese de peptidoglicano e provocando lise bacteriana osmótica bactericida em células em replicação.',
      },
      {
        title: 'Proteção Beta-Lactâmica',
        icon: 'Lock',
        desc: 'O clavulanato de potássio funciona como substrato suicida de serina-beta-lactamases, neutralizando a enzima de resistência e permitindo que a amoxicilina destrua a bactéria.',
      },
      {
        title: 'Tempo Acima da MIC (fT>MIC)',
        icon: 'Clock',
        desc: 'Como fármaco tempo-dependente, a eficácia clínica depende de manter a concentração livre da amoxicilina acima da MIC por pelo menos 40% a 50% do intervalo posológico (q12h).',
      },
      {
        title: 'Use Só Quando Acrescentar Valor',
        icon: 'Target',
        desc: 'Nem toda infecção requer o inibidor: cistites não complicadas podem responder à amoxicilina simples e piodermites superficiais respondem à terapia tópica com clorexidina.',
      },
    ],

    // 2. Resumo Rápido / Indicações Resumidas
    quickIndications: [
      {
        condition: 'Piodermite Canina com Indicação Sistêmica (ISCAID 2025)',
        species: 'dog',
        doseSummary: '12,5 mg/kg da associação total VO a cada 12 horas (10 mg/kg amox + 2,5 mg/kg clav)',
        route: 'Oral (VO junto ao alimento)',
        duration: 'Superficial: 2 semanas e reavaliar; Profunda: 3 semanas e reavaliar citologicamente',
        clinicalContext:
          'Primeira escolha sistêmica contra MSSP segundo o consenso ISCAID 2025 quando a terapia tópica isolada com xampu de clorexidina a 4% for inviável ou insuficiente. Não prolongar por 14 dias após a cura.',
      },
      {
        condition: 'Feridas Infectadas, Celulite e Abscessos Subcutâneos (Cães e Gatos)',
        species: 'both',
        doseSummary: '12,5 a 13,75 mg/kg da associação total VO a cada 12 horas',
        route: 'Oral (VO)',
        duration: '5 a 7 dias em lesões com drenagem ativa e desbridamento adequado',
        clinicalContext:
          'Excelente cobertura para mordeduras e flora mista oral (Pasteurella multocida, Streptococcus, Staphylococcus e anaeróbios estritos). A drenagem e lavagem são prioritárias.',
      },
      {
        condition: 'Cistite Bacteriana Esporádica por Patógeno Suscetível',
        species: 'both',
        doseSummary: '12,5 a 25 mg/kg da associação total VO a cada 8 a 12 horas',
        route: 'Oral (VO)',
        duration: 'Cursos curtos de 3 a 5 dias conforme consenso ISCAID UTI',
        clinicalContext:
          'Indicada quando o antibiograma demonstrar resistência à amoxicilina simples por produção de beta-lactamase. Altas concentrações urinárias garantem erradicação bacteriana rápida.',
      },
      {
        condition: 'Doença Periodontal e Infecções da Cavidade Oral',
        species: 'both',
        doseSummary: '12,5 mg/kg da associação total VO a cada 12 horas',
        route: 'Oral (VO)',
        duration: '5 a 7 dias perioperatórios como adjuvante ao tratamento odontológico',
        clinicalContext:
          'Cobertura para flora periodontal anaeróbia e cocos Gram-positivos. O tratamento odontológico mecânico (remoção de cálculo e extração de dentes inviáveis) é indispensável.',
      },
      {
        condition: 'Infecções Respiratórias Altas Selecionadas (CIRDC / URI Felina)',
        species: 'both',
        doseSummary: '11 a 12,5 mg/kg da associação total VO a cada 12 horas',
        route: 'Oral (VO)',
        duration: '7 a 10 dias com acompanhamento clínico',
        clinicalContext:
          'Indicada para rinite bacteriana secundária em cães e gatos. ATENÇÃO: ineficaz contra Mycoplasma spp. e Chlamydia felis; nesses casos, a doxiciclina é a primeira escolha.',
      },
    ],

    // 3. Indicações Clínicas Completas e Detalhadas
    detailedIndications: [
      {
        id: 'ind-amox-clav-pyoderma',
        indication: 'Piodermite Estafilocócica Canina com Indicação de Terapia Sistêmica (Consenso ISCAID 2025)',
        clinicalContext:
          'O Consenso Internacional da ISCAID de 2025 para diagnóstico e manejo de piodermite bacteriana em cães reformulou profundamente os protocolos clínicos. A terapia tópica antimicrobiana isolada (especialmente banhos semanais com xampu de clorexidina a 4%) é hoje consagrada como o tratamento de escolha para piodermite superficial, minimizando a pressão seletiva e a disbiose. O uso de antimicrobianos sistêmicos é reservado para casos com lesões profundas (furunculose, celulite), lesões extensas de difícil cobertura tópica ou tutores incapacitados de realizar os banhos. Quando o uso sistêmico for necessário e o risco de resistência for baixo, a amoxicilina-clavulanato na dose de 12,5 mg/kg total q12h é classificada como droga de primeira escolha contra Staphylococcus pseudintermedius sensível à meticilina (MSSP, Força de Recomendação A). O consenso aboliu a diretriz histórica de tratar por duas semanas além da remissão clínica: o antimicrobiano deve ser descontinuado assim que houver remissão das lesões e ausência de bactérias intracelulares na citologia de controle.',
        species: 'dog',
        dose: '12,5 mg/kg da associação total (10 mg/kg de amoxicilina + 2,5 mg/kg de ácido clavulânico)',
        route: 'Oral (VO administrado junto ao alimento)',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Superficial: 2 semanas e reavaliar; Profunda: 3 semanas iniciais com reavaliação citológica seriada',
        mechanismOfAction:
          'A amoxicilina inibe as PBPs do estafilococo enquanto o clavulanato bloqueia as beta-lactamases plasmidiais de serina secretadas pelo patógeno, destruindo a parede celular bacteriana.',
        clinicalRationale:
          'A formulação veterinária 4:1 fornece níveis séricos e cutâneos ideais para MSSP sem necessidade de doses mais elevadas que aumentam a toxicidade gastrointestinal.',
        monitoring: 'Citologia cutânea pré e pós-tratamento com contagem de neutrófilos e bactérias intracelulares, regressão de pústulas e colaretes epidérmicos.',
        referenceIds: ['ref-iscaid-pyoderma-2025', 'ref-plumbs-10th-amox-clav', 'ref-borio-2015-chlorhexidine-rct'],
        evidenceLevel: 'Consenso Internacional ISCAID 2025 (Força de Recomendação A) / Nível 1b',
      },
      {
        id: 'ind-amox-clav-abscess-wounds',
        indication: 'Abscessos Cutâneos, Celulites e Feridas Contaminadas por Mordedura',
        clinicalContext:
          'Feridas penetrantes por mordedura em cães e gatos inoculam flora polimicrobiana virulenta carreada na saliva, incluindo Pasteurella multocida, Streptococcus canis, Staphylococcus pseudintermedius e anaeróbios estritos (Bacteroides, Fusobacterium, Prevotella e Peptostreptococcus). Em felinos, abscessos subcutâneos decorrentes de brigas territoriais são frequentes e requerem drenagem mecânica ampla, curetagem de debris e irrigação com SF 0,9%. A amoxicilina-clavulanato oral fornece cobertura bactericida rápida contra praticamente todos os anaeróbios orais e Pasteurella produtores de beta-lactamase, acelerando a cicatrização por segunda intenção.',
        species: 'both',
        dose: '12,5 a 13,75 mg/kg da associação total VO',
        route: 'Oral (VO)',
        frequency: 'A cada 12 horas (q12h)',
        duration: '5 a 7 dias em lesões com foco drenado e tecido vascularizado',
        mechanismOfAction:
          'Atividade bactericida combinada de amplo espectro erradicando a flora facultativa e os anaeróbios estritos produtores de beta-lactamase na ferida.',
        clinicalRationale:
          'Controle de bacteremia e disseminação tecidual em feridas contaminadas. O antibiótico atua em sinergia com a drenagem cirúrgica e desbridamento.',
        monitoring: 'Fechamento da ferida, redução de secreção purulenta, ausência de febre e tolerância gastrointestinal.',
        referenceIds: ['ref-plumbs-10th-amox-clav', 'ref-bsava-10th-formulary'],
        evidenceLevel: 'Prática Clínica Consagrada / Diretrizes Farmacológicas Internacionais',
      },
      {
        id: 'ind-amox-clav-uti',
        indication: 'Cistite Bacteriana Esporádica Canina e Felina',
        clinicalContext:
          'A infecção do trato urinário inferior (cistite esporádica) é comum em cadelas e em gatos idosos com comorbidades (DRC, diabetes, hipertireoidismo). O consenso ISCAID UTI de 2019 orienta que a amoxicilina simples é a droga empírica preferencial inicial devido às altíssimas concentrações atingidas na urina pela filtração e secreção tubular ativa. A associação amoxicilina-clavulanato deve ser reservada para casos em que o antibiograma confirma um isolado bacteriano (como certas cepas de E. coli, Klebsiella ou Proteus mirabilis) resistente à amoxicilina simples mas suscetível à associação potencializada. O breakpoint urinário (<8/4 mcg/mL) é válido exclusivamente para cistite na bexiga: nunca utilizar esse breakpoint para pielonefrite renal.',
        species: 'both',
        dose: '12,5 a 25 mg/kg da associação total (habitualmente 12,5 mg/kg q12h)',
        route: 'Oral (VO)',
        frequency: 'A cada 12 horas (ou q8h em infecções mais rebeldes)',
        duration: 'Cursos curtos de 3 a 5 dias (conforme consenso ISCAID UTI)',
        mechanismOfAction:
          'Concentrações urinárias ativas maciças da aminopenicilina destruindo os patógenos uropatogênicos na mucosa vesical.',
        clinicalRationale:
          'Cursos curtos de 3 a 5 dias alcançam cura clínica idêntica a tratamentos antigos de 14 dias com significativamente menos disbiose e menor indução de resistência.',
        monitoring: 'Resolução de disúria, polaciúria e hematúria; sedimento urinário e urocultura de controle após o término se recidiva.',
        referenceIds: ['ref-iscaid-uti-2019', 'ref-benson-2020-ckd-amox-jfms', 'ref-plumbs-10th-amox-clav'],
        evidenceLevel: 'Consenso Internacional ISCAID UTI / Diretrizes de Uso Prudente',
      },
      {
        id: 'ind-amox-clav-periodontal',
        indication: 'Doença Periodontal Grave, Abscessos Dentários e Cirurgia Oral',
        clinicalContext:
          'A cavidade oral é colonizada por ecossistema polimicrobiano complexo com predominância de anaeróbios produtores de biofilme, espiroquetas e estreptococos. A amoxicilina-clavulanato é amplamente aprovada para doença periodontal em cães e gatos. Contudo, nenhum antibiótico cura a doença periodontal isoladamente: o biofilme e o cálculo dental protegem as colônias bacterianas da ação dos antimicrobianos sistêmicos. O antibiótico atua como adjuvante para prevenir bacteremia e conter osteomielite local nos períodos pré e pós-operatório imediato de tartarectomia com ultrassom e extrações dentárias cirúrgicas.',
        species: 'both',
        dose: '12,5 a 13,75 mg/kg da associação total VO',
        route: 'Oral (VO junto ao alimento)',
        frequency: 'A cada 12 horas (q12h)',
        duration: '5 a 7 dias ao redor do procedimento odontológico',
        mechanismOfAction:
          'Ação bactericida sobre anaeróbios orais produtores de enzimas hidrolíticas e cocos Gram-positivos presentes nos tecidos periodontais inflamados.',
        clinicalRationale:
          'Reduz a translocação bacteriana para a corrente sanguínea durante a instrumentação periodontal invasiva e protege enxertos e alvéolos cirúrgicos.',
        monitoring: 'Cicatrização da mucosa gengival, halitose, dor à palpação maxilar/mandibular e apetite.',
        referenceIds: ['ref-plumbs-10th-amox-clav', 'ref-bsava-10th-formulary'],
        evidenceLevel: 'Padrão Ouro Odontológico Veterinário',
      },
      {
        id: 'ind-amox-clav-respiratory',
        indication: 'Infecções Respiratórias Altas Bacterianas Secundárias',
        clinicalContext:
          'Em cães com tosse dos canis (CIRDC) e gatos com complexo respiratório felino (URI), os vírus primários (herpesvírus, calicivírus, adenovírus) causam necrose do epitélio ciliar, favorecendo proliferação bacteriana oportunista com descarga mucopurulenta. A amoxicilina-clavulanato é uma excelente opção secundária para esses quadros. Contudo, em casos respiratórios agudos com suspeita de Mycoplasma cynos, Mycoplasma felis ou Chlamydia felis, a amoxicilina-clavulanato é ineficaz por ausência de alvo celular nesses patógenos, sendo a doxiciclina a droga de primeira escolha indicada pelo ISCAID.',
        species: 'both',
        dose: '11 a 12,5 mg/kg da associação total VO',
        route: 'Oral (VO)',
        frequency: 'A cada 12 horas (q12h)',
        duration: '7 a 10 dias com reavaliação clínica frequente',
        mechanismOfAction:
          'Erradicação da flora bacteriana oportunista secundária presente na mucosa nasal e traqueal.',
        clinicalRationale:
          'Controla secreções nasais mucopurulentas graves e previne a progressão descendente para broncopneumonia bacteriana.',
        monitoring: 'Descarga nasal, tosse, espirros, apetite, ausculta pulmonar e temperatura corporal.',
        referenceIds: ['ref-iscaid-respiratory-2017', 'ref-nelson-couto-6th-emergency'],
        evidenceLevel: 'Consenso Internacional ISCAID / Literatura Especializada',
      },
    ],

    // 4. Farmacocinética Clínica Comparada (Zero Asteriscos)
    pharmacokineticsData: {
      absorption:
        'A amoxicilina apresenta excelente absorção gastrintestinal em carnívoros por via oral, superando amplamente a ampicilina. Em cães, a biodisponibilidade oral da amoxicilina situa-se entre 64% e 77%, com tempo para concentração máxima (Tmax) de 1,38 a 2,0 horas e pico plasmático (Cmax) de 11 a 21 mcg/mL após doses usuais. O ácido clavulânico atinge Tmax em 0,95 a 1,05 hora e Cmax de 2,0 a 2,3 mcg/mL no cão. Em felinos, estudos farmacocinéticos comprovam biodisponibilidade oral de 75,57% para a amoxicilina e impressionantes 98,15% para o clavulanato de potássio, com Tmax de 1,69 h e 1,03 h, respectivamente. A ingestão concomitante de alimento pode retardar levemente a taxa de absorção, mas não reduz de maneira clinicamente relevante a exposição sistêmica total (AUC) da amoxicilina. Administrar junto com a refeição é altamente recomendado na prática para atenuar o desconforto e as náuseas gastrointestinais.',
      distribution:
        'Apresenta alta hidrofilicidade (XLogP negativo) e baixa lipossolubilidade, confinando sua distribuição primária ao compartimento hídrico extracelular e tecidos ricamente perfundidos. O volume aparente de distribuição (Vd) da amoxicilina no cão varia de 0,28 a 0,71 L/kg e no gato é de cerca de 0,86 L/kg; para o clavulanato, o Vd é de 0,32 L/kg no cão e 0,93 L/kg no gato. A taxa de ligação às proteínas plasmáticas é muito baixa em pequenos animais (cerca de 13% para amoxicilina e 13% para o clavulanato no cão), garantindo ampla fração livre biologicamente ativa. Ambos os componentes distribuem-se bem para pulmões, líquido pleural, ascite peritoneal, fígado, bile e tecidos moles. A penetração através da barreira hematoencefálica íntegra é muito baixa, subindo para 10% a 60% dos níveis séricos na presença de meningite grave; contudo, a passagem do clavulanato para o líquor permanece inconsistente.',
      metabolism:
        'A amoxicilina sofre biotransformação mínima pelo organismo, dependendo quase de forma nula das enzimas do citocromo P450 (CYP450). Uma fração pequena é convertida por hidrólise simples em ácidos peniciloicos inativos. Não sofre autoindução microssomal e independe de vias de glucuronidação, não sendo afetada pela deficiência funcional felina de UGT1A6. O ácido clavulânico sofre biotransformação mais expressiva: no cão, é metabolizado hepaticamente gerando produtos de degradação como 1-amino-4-hidroxibutan-2-ona, sem atividade inibitória de beta-lactamase relevante.',
      elimination:
        'A eliminação da amoxicilina ocorre quase que exclusivamente por via renal, através de filtração glomerular e potente secreção tubular ativa por transportadores aniônicos, gerando concentrações urinárias que superam de 50 a 100 vezes os níveis plasmáticos. Em cães e gatos saudáveis, a meia-vida de eliminação (t1/2) da amoxicilina oscila entre 0,91 e 1,52 hora, enquanto a do clavulanato situa-se entre 0,71 e 0,83 hora. Na doença renal crônica com azotemia, a excreção plasmática da amoxicilina diminui e a meia-vida se prolonga; paradoxalmente, em gatos azotêmicos, a concentração de amoxicilina na urina sofre queda significativa devido ao declínio na filtração e secreção funcional dos néfrons remanescentes.',
      cnsPenetration:
        'Muito baixa com meninges intactas; atinge níveis parciais (10% a 60% da concentração sérica) durante inflamação meníngea ativa, mas a penetração do clavulanato é pouco previsível, não sendo a droga de primeira linha em infecções bacterianas do sistema nervoso central.',
      plasmaBinding:
        'Muito baixa, em torno de 13% para a amoxicilina e 13% para o ácido clavulânico em cães, assegurando alta fração livre ativa disponível nos tecidos periféricos.',
      halfLife:
        'Cães: meia-vida de 0,91 a 1,52 h para amoxicilina e 0,71 a 0,83 h para clavulanato | Gatos: meia-vida de aproximadamente 1,25 h para amoxicilina e 0,71 h para clavulanato. Curta duração sérica que reforça a obrigatoriedade do intervalo a cada 12 horas.',
    },

    // 5. Informações Gerais e Práticas (Info Tab)
    generalInfoData: {
      routesDetailed: [
        {
          route: 'Oral (VO - Comprimidos Palatáveis ou Suspensão)',
          technique:
            'Via de eleição para o manejo ambulatorial de pequenos animais. Administrar o comprimido palatável ou a suspensão oral dosada em seringa diretamente na boca ou misturado a uma pequena porção de alimento úmido no início da refeição. Em animais com histórico de vômito ou fezes amolecidas, a oferta junto com o alimento reduz drasticamente os eventos adversos gastrointestinais.',
          nursingCare:
            'Orientar o tutor a manter os comprimidos intactos dentro do blister de alumínio até o momento do uso, pois o clavulanato absorve umidade e degrada rapidamente. Suspensões orais reconstituídas devem ser rigorosamente homogeneizadas antes de cada tomada e conservadas sob refrigeração.',
          limitations:
            'Não utilizar como terapia inicial em animais chocados, hipotérmicos, em sepse fulminante ou com vômitos incoercíveis, nos quais a via parenteral (ampicilina-sulbactam IV) é obrigatória.',
        },
      ],
      dilutionGuide: {
        compatibleFluids: [
          'Suspensão oral veterinária: reconstituir rigorosamente com o volume de água purificada ou filtrada indicado pelo fabricante no frasco original',
          'Formulação hospitalar intravenosa humana específica (1.000/200 mg 5:1): reconstituir em água para injeção e diluir em Solução Fisiológica 0,9% (SF 0,9%) ou Solução de Ringer Simples para infusão em 30 a 40 minutos',
        ],
        incompatibleFluids: [
          'NUNCA misturar com aminoglicosídeos (amicacina, gentamicina) na mesma seringa ou frasco',
          'Incompatível com Solução de Glicose a 5% (SG 5%) por rápida degradação do clavulanato',
          'Incompatível com soluções alcalinas contendo bicarbonato de sódio, dextrano ou emulsões lipídicas',
        ],
        infusionRateGuidance:
          'Apresentações orais não se aplicam a infusões. Para a formulação humana injetável 5:1 hospitalar excepcional, infundir lentamente ao longo de 30 a 40 minutos diluído em 100 mL de SF 0,9%.',
        preparationNotes:
          'Conservar comprimidos em local seco e fresco (temperatura abaixo de 25°C). Suspensões orais líquidas reconstituídas devem ser guardadas na geladeira (entre 2°C e 8°C) e descartadas impreterivelmente após 7 a 10 dias.',
      },
      pharmacologicalClassification: {
        receptorsAndSites: [
          {
            name: 'PBPs (Proteínas Ligadoras de Penicilinas) / Transpeptidases',
            type: 'Enzima Alvo Primária da Amoxicilina',
            action:
              'Acilação irreversível da serina do sítio catalítico das PBPs bacterianas, impedindo a síntese de peptidoglicano na parede celular.',
            clinicalEffect:
              'Ação bactericida rápida com lise osmótica de bactérias Gram-positivas e Gram-negativas em replicação.',
          },
          {
            name: 'Beta-Lactamases de Serina (Classe A de Ambler)',
            type: 'Enzima de Resistência Inativada pelo Clavulanato',
            action:
              'O clavulanato de potássio funciona como inibidor suicida baseado em mecanismo, aprisionando a enzima em um complexo covalente inativo.',
            clinicalEffect:
              'Restaura a suscetibilidade da amoxicilina contra Staphylococcus produtores de beta-lactamase, E. coli, Klebsiella e Bacteroides.',
          },
        ],
        autonomicAndEndocrineEffects: [
          {
            system: 'Microbiota Gastrointestinal',
            effect: 'Disbiose Entérica e Alteração da Fermentação Colônica',
            description:
              'A ação bactericida de amplo espectro no lúmen intestinal pode suprimir a flora comensal produtora de ácidos graxos voláteis, causando diarreia e fezes pastosas.',
          },
          {
            system: 'Aparelho Renal / Excreção Tubular',
            effect: 'Secreção Tubular Ativa e Concentração Urinária Maciça',
            description:
              'Ampla eliminação renal garantindo níveis vesicais centenas de vezes superiores aos plasmáticos, favorecendo a cura rápida de cistites bacterianas.',
          },
        ],
      },
      speciesPeculiarities: [
        {
          species: 'dog',
          title: 'Cães: Foco na Piodermite (ISCAID 2025) e Importância das Proporções',
          description:
            'Primeira escolha oral para piodermites estafilocócicas quando a terapia tópica falhar. Não utilizar a proporção humana de 7:1 (875/125 mg) como se fosse idêntica ao comprimido veterinário 4:1 (Synulox 12,5 mg/kg = 10 mg amox + 2,5 mg clav). Se usar produto humano, calcular a dose de clavulanato separadamente.',
        },
        {
          species: 'cat',
          title: 'Gatos: Excelente Absorção Oral e Dinâmica na Doença Renal Crônica',
          description:
            'Gatos apresentam excelente biodisponibilidade oral (75% amoxicilina e 98% clavulanato). Em gatos com DRC e azotemia, a concentração plasmática aumenta enquanto a concentração urinária declina, aumentando o risco de efeitos gastrointestinais e exigindo monitoramento rigoroso.',
        },
      ],
      prescriptionType:
        'Medicamento veterinário sob prescrição do médico-veterinário (receita comum veterinária). Quando for prescrita apresentação comercial de uso humano (como Clavulin), aplica-se a IN Anvisa nº 360/2025 e RDC 471/2021: receituário em 2 vias com retenção de uma via pela farmácia humana, validade de 10 dias e identificação completa do tutor e do animal.',
    },

    // 6. Módulo de Atenção e Segurança (Attention Tab)
    attentionData: {
      precautions: [
        {
          condition: 'Divergência Crítica de Proporções (Veterinário 4:1 vs. Humano 7:1)',
          alertLevel: 'warning',
          physiologicalExplanation:
            'Comprimidos veterinários (Synulox, Agemoxi CL) são formulados na proporção 4:1 (10 mg amox + 2,5 mg clav = 12,5 mg/kg total). Formulações humanas adultas como Clavulin 875/125 mg possuem proporção 7:1. Se prescrito por comprimido ou mg total sem ajuste, o paciente receberá dose subterapêutica de clavulanato.',
          clinicalAction:
            'Preferir sempre produtos veterinários na proporção 4:1. Se utilizar apresentações humanas, calcular as miligramas de amoxicilina e de ácido clavulânico de forma estritamente separada.',
        },
        {
          condition: 'Piodermite Superficial: Prioridade para Terapia Tópica (ISCAID 2025)',
          alertLevel: 'warning',
          physiologicalExplanation:
            'O consenso dermatológico mundial de 2025 comprovou que xampu de clorexidina a 4% isolado cura piodermite superficial sem expor o paciente à disbiose e à seleção de patógenos resistentes no microbioma intestinal.',
          clinicalAction:
            'Instituir terapia tópica isolada em piodermite superficial. Reservar a amoxicilina-clavulanato oral apenas para casos de piodermite profunda, lesões extensas ou falha tópica documentada.',
        },
        {
          condition: 'Falso Sentimento de Segurança contra Bactérias Resistentes',
          alertLevel: 'warning',
          physiologicalExplanation:
            'O ácido clavulânico neutraliza apenas determinadas beta-lactamases de serina. Não possui qualquer atividade contra Staphylococcus resistente à meticilina (MRSP/MRSA), Pseudomonas aeruginosa ou bactérias produtoras de AmpC.',
          clinicalAction:
            'Nunca prescrever amoxicilina-clavulanato quando houver confirmação de MRSP/MRSA em cultura ou suspeita de infecção por Pseudomonas; o clavulanato não recupera a eficácia da amoxicilina nesses casos.',
        },
        {
          condition: 'Breakpoint Urinário vs. Sistêmico (Cistite vs. Pielonefrite)',
          alertLevel: 'caution',
          physiologicalExplanation:
            'O breakpoint de sensibilidade urinário em cães e gatos (<8/4 mcg/mL) considera as altas concentrações vesicais. Na pielonefrite renal, a bactéria invade o parênquima tecidual, exigindo concentrações séricas sistêmicas.',
          clinicalAction:
            'Não utilizar a classificação de sensibilidade urinária do laudo para guiar tratamento de pielonefrite renal ou sepse; aplicar breakpoints de suscetibilidade plasmática sistêmica.',
        },
        {
          condition: 'Gatos com Azotemia e Doença Renal Crônica (DRC)',
          alertLevel: 'caution',
          physiologicalExplanation:
            'Estudos clínicos em gatos com DRC (Benson et al., 2020) demonstraram que a azotemia eleva os níveis séricos do antibiótico e reduz a excreção urinária, aumentando a taxa de efeitos adversos de 12% para 55%.',
          clinicalAction:
            'Em gatos azotêmicos, monitorar atentamente náusea, vômito e apatia. Não reduzir a dose automaticamente em cistite sem avaliar o risco de subconcentração na urina.',
        },
      ],
      adverseEffectsDetailed: [
        {
          effect: 'Diarreia e Desconforto Entérico',
          frequency: 'common',
          mechanism: 'Disbiose da microbiota intestinal aeróbia e anaeróbia induzida pelo amplo espectro do antimicrobiano',
          clinicalManagement: 'Administrar junto ao alimento; se diarreia persistir, associar probiótico específico (separado por 2h do antibiótico) ou reavaliar conduta.',
        },
        {
          effect: 'Náusea e Vômitos Precoces',
          frequency: 'common',
          mechanism: 'Irritação direta da mucosa gástrica e estímulo colinérgico/serotoninérgico em estômago vazio',
          clinicalManagement: 'Fornecer o comprimido envolvido em alimento úmido no momento da alimentação. Se vômitos persistirem, descontinuar.',
        },
        {
          effect: 'Hipersensibilidade Alérgica Cutânea',
          frequency: 'rare',
          mechanism: 'Resposta mediada por IgE ou imunocomplexos haptenizados a componentes penicilínicos',
          clinicalManagement: 'Suspender a medicação imediatamente; prescrever anti-histamínicos ou corticoide de suporte em reações moderadas a severas.',
        },
        {
          effect: 'Colestase e Hepatotoxicidade Medicamentosa',
          frequency: 'rare',
          mechanism: 'Reação idiossincrática imunomediada ligada ao componente clavulanato de potássio',
          clinicalManagement: 'Suspender a medicação e realizar perfil de enzimas hepáticas e bilirrubina.',
        },
      ],
      doseReductionGuidelines: [
        {
          clinicalCondition: 'Paciente Canino com Piodermite Superficial Estável',
          recommendedAdjustment: 'Manter rigorosamente 12,5 mg/kg total q12h; não dobrar a dose para 25 mg/kg',
          physiologicalRationale: 'O consenso ISCAID 2025 afirma categoricamente que não há benefício clínico demonstrado em aumentar a dose para MSSP, elevando apenas os distúrbios gastrintestinais.',
        },
        {
          clinicalCondition: 'Cão ou Gato com Insuficiência Renal Crônica Estágios IRIS 1 e 2',
          recommendedAdjustment: 'Manter a posologia de 12,5 mg/kg total q12h com monitoramento clínico da hidratação',
          physiologicalRationale: 'Nesses estágios a filtração glomerular remanescente assegura depuração adequada sem acúmulo tóxico.',
        },
        {
          clinicalCondition: 'Gatos com Azotemia Avançada (IRIS Estágios 3 e 4)',
          recommendedAdjustment: 'Individualizar a dose com base no local da infecção e creatinina; evitar elevação empírica',
          physiologicalRationale: 'Em gatos nefropatas a amoxicilina sérica sobe e a concentração urinária cai; cortes cegos de dose podem causar falha terapêutica na bexiga.',
        },
        {
          clinicalCondition: 'Interrupção do Tratamento em Piodermite (Desmame)',
          recommendedAdjustment: 'Suspender diretamente ao atingir cura clínica e citológica; NÃO aplicar desmame gradual',
          physiologicalRationale: 'A regra histórica de tratar por duas semanas adicionais após a remissão foi abandonada pelo ISCAID 2025 para evitar seleção de resistência desnecessária.',
        },
      ],
      drugInteractionsDetailed: [
        {
          drugOrClass: 'Aminoglicosídeos (Amicacina, Gentamicina)',
          severity: 'major',
          clinicalEffect: 'Inativação química direta de ambos os antimicrobianos se misturados na mesma seringa ou infusão',
          pharmacologicalMechanism: 'Reação cruzada do anel beta-lactâmico com os grupos amino dos aminoglicosídeos.',
        },
        {
          drugOrClass: 'Metotrexato',
          severity: 'major',
          clinicalEffect: 'Redução da depuração renal de metotrexato com aumento severo de toxicidade e mielossupressão',
          pharmacologicalMechanism: 'Competição pelos transportadores de ânions orgânicos nos túbulos proximais renais.',
        },
        {
          drugOrClass: 'Probenecida',
          severity: 'moderate',
          clinicalEffect: 'Prolongamento da meia-vida plasmática e aumento da concentração sérica de amoxicilina',
          pharmacologicalMechanism: 'Inibição competitiva da secreção tubular ativa de penicilinas no néfron.',
        },
        {
          drugOrClass: 'Antibacterianos Bacteriostáticos (Doxiciclina, Eritromicina, Cloranfenicol)',
          severity: 'moderate',
          clinicalEffect: 'Potencial redução do efeito bactericida da amoxicilina',
          pharmacologicalMechanism: 'A amoxicilina exige bactérias em multiplicação ativa para exercer lise; bacteriostáticos inibem a divisão celular.',
        },
      ],
    },

    // 7. Apresentações Comerciais
    presentations: [
      {
        id: 'pres-synulox-50mg',
        name: 'Synulox® 50 mg Comprimidos Palatáveis (Zoetis)',
        brand: 'Zoetis Saúde Animal',
        form: 'tablet',
        route: 'Oral',
        commercialType: 'veterinary',
        concentrationOptions: [
          {
            id: 'conc-synulox-50mg',
            label: '50 mg total (40 mg Amoxicilina + 10 mg Clavulanato - Proporção 4:1)',
            unitValue: 50,
            unitLabel: 'mg/comp',
            isDefault: true,
          },
        ],
        packageDescription: 'Cartucho contendo 10 comprimidos palatáveis sulcados em blister de alumínio (40 mg amoxicilina + 10 mg clavulanato).',
      },
      {
        id: 'pres-synulox-250mg',
        name: 'Synulox® 250 mg Comprimidos Palatáveis (Zoetis)',
        brand: 'Zoetis Saúde Animal',
        form: 'tablet',
        route: 'Oral',
        commercialType: 'veterinary',
        concentrationOptions: [
          {
            id: 'conc-synulox-250mg',
            label: '250 mg total (200 mg Amoxicilina + 50 mg Clavulanato - Proporção 4:1)',
            unitValue: 250,
            unitLabel: 'mg/comp',
            isDefault: true,
          },
        ],
        packageDescription: 'Cartucho contendo 10 comprimidos palatáveis sulcados em blister de alumínio (200 mg amoxicilina + 50 mg clavulanato).',
      },
      {
        id: 'pres-agemoxi-cl-50mg',
        name: 'Agemoxi CL® 50 mg Comprimidos Palatáveis (Agener União)',
        brand: 'Agener União Saúde Animal',
        form: 'tablet',
        route: 'Oral',
        commercialType: 'veterinary',
        concentrationOptions: [
          {
            id: 'conc-agemoxi-50mg',
            label: '50 mg total (40 mg Amoxicilina + 10 mg Clavulanato - 4:1)',
            unitValue: 50,
            unitLabel: 'mg/comp',
            isDefault: true,
          },
        ],
        packageDescription: 'Blister de comprimidos palatáveis com 50 mg da associação total.',
      },
      {
        id: 'pres-agemoxi-cl-250mg',
        name: 'Agemoxi CL® 250 mg Comprimidos Palatáveis (Agener União)',
        brand: 'Agener União Saúde Animal',
        form: 'tablet',
        route: 'Oral',
        commercialType: 'veterinary',
        concentrationOptions: [
          {
            id: 'conc-agemoxi-250mg',
            label: '250 mg total (200 mg Amoxicilina + 50 mg Clavulanato - 4:1)',
            unitValue: 250,
            unitLabel: 'mg/comp',
            isDefault: true,
          },
        ],
        packageDescription: 'Blister de comprimidos palatáveis com 250 mg da associação total.',
      },
      {
        id: 'pres-susp-oral-625mg-ml',
        name: 'Amoxicilina + Clavulanato 62,5 mg/mL Suspensão Oral (4:1)',
        brand: 'Linha Veterinária / Manipulação Padrão',
        form: 'liquid',
        route: 'Oral',
        commercialType: 'veterinary',
        concentrationOptions: [
          {
            id: 'conc-susp-625mg',
            label: '62,5 mg/mL total (50 mg Amoxicilina + 12,5 mg Clavulanato por mL)',
            unitValue: 62.5,
            unitLabel: 'mg/mL',
            isDefault: true,
          },
        ],
        calculatedMlPerKgFormula: 'dose / 62.5',
        packageDescription: 'Frasco para reconstituição oral. Na dose de 12,5 mg/kg total, corresponde a exatamente 0,2 mL por kg.',
      },
    ],

    // 8. Regimes Posológicos Clínicos (Calculadora)
    doses: [
      {
        id: 'dose-amox-clav-standard-4-1',
        species: 'both',
        indication: 'Dose Veterinária Padrão 4:1 (Piodermite, Abscessos, Feridas, Tecidos Moles)',
        doseMin: 12.5,
        doseMax: 12.5,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (VO junto ao alimento)',
        frequency: 'A cada 12 horas (q12h)',
        duration: '7 a 14 dias conforme o quadro clínico (reavaliação precoce)',
        clinicalContext: 'Dose consagrada internacionalmente para produtos 4:1 (12,5 mg/kg total = 10 mg/kg de amoxicilina + 2,5 mg/kg de ácido clavulânico).',
        monitoring: 'Resolução das lesões, tolerância gastrintestinal (ausência de vômito/diarreia) e citologia.',
        calculatorEnabled: true,
        presentationId: 'pres-synulox-50mg',
        presentationConcentrationId: 'conc-synulox-50mg',
      },
      {
        id: 'dose-amox-clav-pyoderma-deep',
        species: 'dog',
        indication: 'Piodermite Profunda Canina / Furunculose (ISCAID 2025)',
        doseMin: 12.5,
        doseMax: 13.75,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (VO com alimento)',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Início com 3 semanas e reavaliação citológica seriada até remissão completa',
        clinicalContext: 'Diretriz ISCAID 2025: primeira escolha oral para MSSP. Não requer 2 semanas adicionais pós-cura se citologia estiver limpa.',
        monitoring: 'Citologia profunda de exsudato, regressão de trajetos fistulosos e crostas hemorrágicas.',
        calculatorEnabled: true,
        presentationId: 'pres-synulox-250mg',
        presentationConcentrationId: 'conc-synulox-250mg',
      },
      {
        id: 'dose-amox-clav-uti-short',
        species: 'both',
        indication: 'Cistite Bacteriana Esporádica por Patógeno Suscetível (Curso Curto)',
        doseMin: 12.5,
        doseMax: 25,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (VO)',
        frequency: 'A cada 12 horas (ou q8h na faixa de 25 mg/kg)',
        duration: '3 a 5 dias (conforme consenso ISCAID UTI)',
        clinicalContext: 'Uso direcionado por cultura e antibiograma comprovando necessidade do inibidor de beta-lactamase.',
        monitoring: 'Resolução de hematúria e polaciúria; reavaliação se persistência de sinais.',
        calculatorEnabled: true,
        presentationId: 'pres-synulox-50mg',
        presentationConcentrationId: 'conc-synulox-50mg',
      },
      {
        id: 'dose-amox-clav-feline-abscess',
        species: 'cat',
        indication: 'Abscesso por Mordedura e Celulite Subcutânea Felina',
        doseMin: 12.5,
        doseMax: 12.5,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (VO)',
        frequency: 'A cada 12 horas (q12h)',
        duration: '5 a 7 dias associado a drenagem ampla e limpeza local',
        clinicalContext: 'Excelente atividade contra Pasteurella multocida e anaeróbios estritos da cavidade oral felina.',
        monitoring: 'Cessação de secreção purulenta, cicatrização do tecido e apetite.',
        calculatorEnabled: true,
        presentationId: 'pres-synulox-50mg',
        presentationConcentrationId: 'conc-synulox-50mg',
      },
    ],

    // 9. Tabela Prática de Peso e Calibrador (Dose 12,5 mg/kg total 4:1)
    practicalWeightTable: {
      standardDoseText:
        'Cálculo padrão baseado na proporção veterinária clássica 4:1 na dose de 12,5 mg/kg da associação total (10 mg/kg de amoxicilina + 2,5 mg/kg de ácido clavulânico), a cada 12 horas por via oral junto ao alimento.',
      headers: [
        'Peso do Paciente (kg)',
        'Dose Total (12,5 mg/kg)',
        'Suspensão 62,5 mg/mL',
        'Comprimidos de 50 mg',
        'Comprimidos de 250 mg',
      ],
      rows: [
        { weight: '2 kg', totalDose: '25 mg total', col1: '0,4 mL', col2: '1/2 comprimido', col3: '—' },
        { weight: '4 kg', totalDose: '50 mg total', col1: '0,8 mL', col2: '1 comprimido', col3: '—' },
        { weight: '5 kg', totalDose: '62,5 mg total', col1: '1,0 mL', col2: '1 e 1/4 comprimido', col3: '—' },
        { weight: '10 kg', totalDose: '125 mg total', col1: '2,0 mL', col2: '2 e 1/2 comprimidos', col3: '1/2 comprimido' },
        { weight: '15 kg', totalDose: '187,5 mg total', col1: '3,0 mL', col2: '—', col3: '3/4 comprimido' },
        { weight: '20 kg', totalDose: '250 mg total', col1: '4,0 mL', col2: '—', col3: '1 comprimido' },
        { weight: '30 kg', totalDose: '375 mg total', col1: '6,0 mL', col2: '—', col3: '1 e 1/2 comprimido' },
        { weight: '40 kg', totalDose: '500 mg total', col1: '8,0 mL', col2: '—', col3: '2 comprimidos' },
      ],
      dropletCalibrator: {
        title: 'Calibrador de Dosagem Oral e Suspensão Líquida',
        concentration: 'Suspensão 62,5 mg/mL (50 mg amoxicilina + 12,5 mg clavulanato por mL)',
        dropletRatio: 'Não converter para gotas orais; dosar exclusivamente em seringa graduada em mL',
        practicalRule:
          'Volume por dose (mL) = peso do paciente (kg) x 0,2 mL a cada 12 horas | Comprimidos: 1 comp de 50 mg para cada 4 kg; 1 comp de 250 mg para cada 20 kg.',
        note:
          'Administrar imediatamente antes ou misturado com uma pequena porção de comida para mitigar náuseas e vômitos sem afetar a absorção.',
      },
    },

    // 10. Texto Modelo de Prescrição Veterinária Pronto
    samplePrescriptionText:
      'USO ORAL\n1. Amoxicilina + Clavulanato de Potássio 250 mg — Comprimidos Palatáveis Veterinários (Proporção 4:1 - 200 mg de amoxicilina + 50 mg de clavulanato)\n   - Administrar [FRACAO_COMPRIMIDO] ([DOSE_MG] mg da associação total, na proporção de 12,5 mg/kg total = 10 mg/kg amoxicilina + 2,5 mg/kg clavulanato), por via oral, a cada 12 horas, junto ao alimento, durante [NUMERO_DIAS] dias consecutivos.\n   - Instruções ao tutor:\n     a) Manter os comprimidos guardados dentro do blister de alumínio fechado até o instante da tomada (o clavulanato estraga rapidamente em contato com o ar e a umidade).\n     b) Oferecer preferencialmente junto com a refeição para proteger o estômago e evitar náuseas.\n     c) Não interromper precocemente nem prolongar a medicação sem retorno clínico.\n   - Monitoramento: acompanhar regressão dos sinais clínicos, aspecto das fezes e ausência de vômitos.',

    // 11. Fundamentos Clínicos & Evidências Publicadas Comentadas (Zero Asteriscos)
    clinicalFoundationsData: [
      {
        id: 'cf-yang-2019-feline-pk',
        title: 'A Dose Felina de 12,5 mg/kg 4:1 Tem Fundamento Farmacocinético e Farmacodinâmico',
        narrative:
          'A validação científica da dose clássica felina de 12,5 mg/kg total a cada 12 horas foi detalhada por Yang et al. (2019) em estudo experimental cruzado em gatos saudáveis, comparando a farmacocinética intravenosa e oral da proporção 4:1 (10 mg/kg de amoxicilina + 2,5 mg/kg de clavulanato). A biodisponibilidade oral no gato alcançou 75,57% para a amoxicilina e excelentes 98,15% para o clavulanato de potássio. O estudo demonstrou que o ácido clavulânico é depurado significativamente mais rápido pelo organismo felino que a amoxicilina (clearance de 0,921 L/kg/h vs. 0,453 L/kg/h, p menor que 0,01). A modelagem farmacodinâmica revelou que a dose de 12,5 mg/kg q12h sustenta tempo acima da MIC (T>MIC) de 40% a 50% para bactérias patogênicas felinas com MIC de até 0,25 mcg/mL, validando a eficácia do regime posológico com duas administrações diárias.',
        narrativeHighlights: ['biodisponibilidade oral felina de 75% e 98%', 'clavulanato depurado 2x mais rápido', 'T>MIC de 40% em q12h'],
        studies: [
          {
            citation: 'Yang F, Yang F, Wang G, et al. J Vet Pharmacol Ther. 2019;42(5):511-517. doi: 10.1111/jvp.12765.',
            referenceId: 'ref-yang-2019-feline-pk',
            sourceType: 'Estudo Farmacocinético Experimental Cruzado em Gatos',
            summaryText:
              'Avaliação farmacocinética IV e oral da associação 4:1 em gatos saudáveis. A biodisponibilidade foi de 75,57% (amoxicilina) e 98,15% (clavulanato). O modelo confirmou que 12,5 mg/kg total q12h mantém o alvo farmacodinâmico de 40% fT>MIC para MIC de 0,25 mcg/mL.',
            summaryHighlights: ['biodisponibilidade 75,6% e 98,2%', 'clearance 0,45 vs 0,92 L/kg/h', 'alvo PK/PD atingido em q12h'],
            metrics: ['Biodisponibilidade: 75,6% / 98,2%', 't1/2: ~1,25 h', 'fT>MIC > 40% para MIC 0,25 mcg/mL'],
            clinicalConclusion:
              'Fornece a sustentação farmacocinética padrão ouro que respalda a posologia de 12,5 mg/kg total a cada 12 horas em felinos.',
          },
        ],
      },
      {
        id: 'cf-benson-2020-azotemic-cats',
        title: 'Gatos com Azotemia Sofrem Mais Efeitos Adversos com Queda de Concentração Urinária',
        narrative:
          'O comportamento da amoxicilina-clavulanato na doença renal crônica felina foi investigado por Benson et al. (2020) em estudo prospectivo avaliando 61 gatos (11 azotêmicos e 50 não azotêmicos). Os gatos azotêmicos apresentaram incidência significativamente maior de múltiplos efeitos adversos gastrointestinais e sistêmicos (p = 0,02), resultando na necessidade de modificação da terapia em 55% dos pacientes com DRC vs apenas 12% nos controles (p = 0,008). A análise farmacocinética revelou uma dinâmica surpreendente: enquanto a concentração plasmática de amoxicilina correlacionou-se positivamente com a creatinina sérica (maior retenção na circulação, r = 0,62), a concentração do antibiótico na urina caiu expressivamente (r = -0,65, p = 0,01). Isso destrói a visão ingênua de que na DRC basta cortar a dose para tratar uma infecção urinária, pois a entrega do fármaco na bexiga já se encontra comprometida pelo declínio funcional dos néfrons.',
        narrativeHighlights: ['efeitos adversos em 55% dos azotêmicos', 'amoxicilina sérica sobe e urinária cai', 'cuidado ao reduzir dose em ITU'],
        studies: [
          {
            citation: 'Benson KK, Quimby JM, Dowers KL, et al. J Feline Med Surg. 2020;22(8):729-735. doi: 10.1177/1098612X19881537.',
            referenceId: 'ref-benson-2020-ckd-amox-jfms',
            sourceType: 'Estudo Farmacocinético e Clínico em Gatos Azotêmicos',
            summaryText:
              'Investigação de efeitos colaterais e níveis séricos e urinários em gatos com DRC. Azotêmicos apresentaram 55% de alteração na conduta por eventos adversos e menor concentração urinária de amoxicilina a despeito de maiores níveis séricos.',
            summaryHighlights: ['55% eventos adversos em azotêmicos', 'concentração urinária diminuída', 'risco de falha em ITU'],
            metrics: ['n = 61 felinos', 'Eventos adversos: 55% vs 12% (p = 0,008)', 'Correlação urinária negativa (p = 0,01)'],
            clinicalConclusion:
              'Alerta para não reduzir a dose cegamente em gatos com DRC e cistite, exigindo monitoramento próximo de tolerabilidade gastrointestinal.',
          },
        ],
      },
      {
        id: 'cf-borio-2015-chlorhexidine-vs-amox',
        title: 'Piodermite Superficial: Terapia Tópica com Clorexidina Iguala o Antibiótico Sistêmico',
        narrative:
          'O paradigma de prescrever amoxicilina-clavulanato sistêmica para todo cão com piodermite superficial foi desafiado no ensaio clínico randomizado e cego conduzido por Borio et al. (2015). Cinquenta e um cães com piodermite superficial foram divididos para receber xampu e solução de digliconato de clorexidina a 4% (n = 31) ou amoxicilina-clavulanato oral a 25 mg/kg total BID (n = 20) durante 4 semanas. Todas as lesões clínicas e citológicas resolveram em ambos os grupos de forma idêntica. Além disso, no grupo da clorexidina, a cura foi alcançada com igual sucesso mesmo em cães infectados por cepas resistentes de Staphylococcus pseudintermedius (MRSP), nas quais os beta-lactâmicos falham. Esse estudo serviu de alicerce para o Consenso Internacional ISCAID 2025 consagrar a terapia tópica como o tratamento de primeira escolha em piodermite superficial canina.',
        narrativeHighlights: ['clorexidina a 4% iguala amox-clav oral', 'eficaz inclusive contra MRSP', 'base do consenso ISCAID 2025'],
        studies: [
          {
            citation: 'Borio S, Colombo S, La Rosa G, et al. Vet Dermatol. 2015;26(5):339-344. doi: 10.1111/vde.12233.',
            referenceId: 'ref-borio-2015-chlorhexidine-rct',
            sourceType: 'Ensaio Clínico Randomizado Mascarado Controlado',
            summaryText:
              'Comparação direta entre clorexidina tópica a 4% e amoxicilina-clavulanato oral 25 mg/kg BID em piodermite superficial canina. A remissão clínica foi de 100% em ambos os grupos, demonstrando a dispensabilidade do antibiótico oral.',
            summaryHighlights: ['remissão idêntica nos dois grupos', 'curou cães com MRSP', 'evita seleção de resistência entérica'],
            metrics: ['n = 51 cães', 'Clorexidina 4% vs Amox-Clav oral', '100% cura de lesões em 4 semanas'],
            clinicalConclusion:
              'Fundamenta a diretriz moderna de evitar o uso empírico imediato de amoxicilina-clavulanato oral em piodermites superficiais não complicadas.',
          },
        ],
      },
      {
        id: 'cf-mueller-2007-deep-pyoderma',
        title: 'Piodermite Profunda Canina: Resposta Clínica e Descontinuação da Regra Antiga',
        narrative:
          'A eficácia da amoxicilina-clavulanato em infecções bacterianas graves e profundas da pele (furunculose e celulite) foi demonstrada no ensaio multicêntrico prospectivo e randomizado de Mueller & Stephan (2007) em 107 cães, comparando pradofloxacina oral (3 mg/kg SID) com amoxicilina-clavulanato (10 mg/kg amoxicilina + 2,5 mg/kg clavulanato BID). A taxa de remissão clínica no grupo da amoxicilina-clavulanato foi de 73% (37 de 51 cães), confirmando seu papel como opção sistêmica de primeira escolha contra MSSP. Na época, os cães foram tratados por até 9 semanas sob o dogma histórico de "tratar por duas semanas após a cura clínica". O novo consenso ISCAID 2025 revisou esses dados e descartou formalmente a necessidade de tratar por 14 dias pós-cura, recomendando a suspensão da medicação assim que a citologia comprovar ausência de infecção ativa.',
        narrativeHighlights: ['remissão de 73% em piodermite profunda', 'amox-clav 10 + 2,5 mg/kg BID', 'descarte da regra de 14 dias pós-cura'],
        studies: [
          {
            citation: 'Mueller RS, Stephan B. Vet Dermatol. 2007;18(3):144-151. doi: 10.1111/j.1365-3164.2007.00584.x.',
            referenceId: 'ref-mueller-2007-deep-pyoderma-rct',
            sourceType: 'Ensaio Clínico Multicêntrico Randomizado Mascarado',
            summaryText:
              'Estudo em 107 cães com piodermite profunda. A amoxicilina-clavulanato promoveu remissão completa em 73% dos cães com infecções estafilocócicas profundas, comprovando sua potência clínica sistêmica.',
            summaryHighlights: ['73% de remissão clínica', '107 cães avaliados', 'amox 10 mg/kg + clav 2,5 mg/kg BID'],
            metrics: ['n = 107 cães com piodermite profunda', 'Remissão: 73% amox-clav vs 86% pradofloxacina', 'MSSP documentado'],
            clinicalConclusion:
              'Comprova a alta eficácia da amoxicilina-clavulanato em infecções dérmicas profundas na dose clássica de 12,5 mg/kg q12h.',
          },
        ],
      },
      {
        id: 'cf-vasuntrarak-2025-bioequivalence',
        title: 'Nem Todas as Formulações Orais Comerciais São Farmacocineticamente Bioequivalentes',
        narrative:
          'Um dos maiores desafios da prática clínica veterinária é a intercambialidade entre diferentes marcas e genéricos. O estudo farmacocinético cruzado de Vasuntrarak et al. (2025, BMC Veterinary Research) avaliou a biodisponibilidade comparativa de duas formulações orais comerciais de comprimidos de amoxicilina-clavulanato 250 mg administradas a cães Beagles saudáveis na dose média de 20,5 mg/kg com intervalo de washout de 7 dias. Em relação à formulação de referência A, a formulação B apresentou biodisponibilidade relativa de apenas 76,5% para amoxicilina e 72,7% para o ácido clavulânico, com intervalos de confiança de 90% para AUC e Cmax fora dos limites regulatórios clássicos de bioequivalência (80% a 125%). Os autores concluíram que os produtos não eram bioequivalentes, alertando os clínicos de que trocas inadvertidas de marcas ou de formulações humanas para veterinárias sem controle farmacotécnico podem gerar subexposição terapêutica.',
        narrativeHighlights: ['biodisponibilidade relativa de 76,5% e 72,7%', 'produtos não bioequivalentes', 'alerta para troca de marcas'],
        studies: [
          {
            citation: 'Vasuntrarak K, Patthanachai K, Charoenlertkul P, et al. BMC Vet Res. 2025;21:173. doi: 10.1186/s12917-025-04649-4.',
            referenceId: 'ref-vasuntrarak-2025-bioequivalence-bmc',
            sourceType: 'Estudo Farmacocinético de Bioequivalência Crossover em Cães',
            summaryText:
              'Ensaio crossover em Beagles comparando dois comprimidos de 250 mg comerciais. A formulação B atingiu apenas 76,5% e 72,7% da biodisponibilidade da referência, reprovando nos testes formais de bioequivalência.',
            summaryHighlights: ['não bioequivalentes', 'AUC de amoxicilina 24% menor', 'impacto na troca de marcas'],
            metrics: ['n = 6 Beagles crossover', 'Biodisponibilidade relativa: 76,5% / 72,7%', 'IC 90% fora da faixa 80-125%'],
            clinicalConclusion:
              'Valida a recomendação de priorizar medicamentos veterinários registrados com controle de estabilidade e reforça o perigo de trocas aleatórias de proporções.',
          },
        ],
      },
    ],

    // 12. Referências Bibliográficas Completas
    references: [
      {
        id: 'ref-plumbs-10th-amox-clav',
        citationText:
          'Plumb DC. Plumb\'s Veterinary Drug Handbook, 10th ed. Amoxicillin / Clavulanate Potassium monograph, pp. 71-74. Wiley-Blackwell; 2023.',
        sourceType: 'Formulário Farmacológico Padrão Ouro Internacional',
        url: 'https://www.wiley.com/en-us/Plumb%27s+Veterinary+Drug+Handbook-p-9781119846222',
        evidenceLevel: 'Padrão Ouro Internacional',
      },
      {
        id: 'ref-bsava-10th-formulary',
        citationText:
          'BSAVA Small Animal Formulary, 10th ed. Part A: Canine and Feline. Co-amoxiclav monograph, pp. 98-99. British Small Animal Veterinary Association; 2020.',
        sourceType: 'Formulário Clínico Internacional BSAVA',
        url: 'https://www.bsavalibrary.com/content/book/10.22233/9781910443743',
        evidenceLevel: 'Consenso Internacional de Especialistas',
      },
      {
        id: 'ref-iscaid-pyoderma-2025',
        citationText:
          'Morris DO, Loeffler A, Davis GM, et al. Guidelines for the diagnosis and antimicrobial therapy of canine superficial bacterial folliculitis (Antimicrobial Guidelines Working Group of the International Society for Companion Animal Infectious Diseases - ISCAID 2025 Update). Vet Dermatol. 2025;36(1):vde.13342. doi: 10.1111/vde.13342.',
        sourceType: 'Diretrizes Clínicas Internacionais ISCAID Dermatologia',
        url: 'https://onlinelibrary.wiley.com/doi/10.1111/vde.13342',
        evidenceLevel: 'Consenso Internacional Padrão Ouro ISCAID 2025',
      },
      {
        id: 'ref-iscaid-uti-2019',
        citationText:
          'Weese JS, Blondeau J, Boothe D, et al. International Society for Companion Animal Infectious Diseases (ISCAID) guidelines for the diagnosis and management of bacterial urinary tract infections in dogs and cats. Vet J. 2019;247:8-25. doi: 10.1016/j.tvjl.2019.02.008.',
        sourceType: 'Diretrizes Clínicas Internacionais ISCAID Urologia',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30971357/',
        evidenceLevel: 'Consenso Internacional Especializado (ISCAID UTI)',
      },
      {
        id: 'ref-iscaid-respiratory-2017',
        citationText:
          'Lappin MR, Blondeau J, Boothe D, et al. Antimicrobial use Guidelines for Treatment of Respiratory Tract Disease in Dogs and Cats: Antimicrobial Guidelines Working Group of the International Society for Companion Animal Infectious Diseases (ISCAID). J Vet Intern Med. 2017;31(2):279-294. doi: 10.1111/jvim.14627.',
        sourceType: 'Diretrizes Clínicas Internacionais ISCAID Respiratório',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28185306/',
        evidenceLevel: 'Consenso Internacional Especializado (ISCAID)',
      },
      {
        id: 'ref-yang-2019-feline-pk',
        citationText:
          'Yang F, Yang F, Wang G, Xi W, Zhang C, Wang H. Pharmacokinetics of the amoxicillin-clavulanic acid combination after intravenous and oral administration in cats. J Vet Pharmacol Ther. 2019;42(5):511-517. doi: 10.1111/jvp.12765.',
        sourceType: 'Estudo Farmacocinético Felino de Referência',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31162674/',
        evidenceLevel: 'Nível 1b (Farmacocinética Experimental)',
      },
      {
        id: 'ref-benson-2020-ckd-amox-jfms',
        citationText:
          'Benson KK, Quimby JM, Dowers KL, et al. Pilot study of side effects and serum and urine concentrations of amoxicillin-clavulanic acid in azotemic and non-azotemic cats. J Feline Med Surg. 2020;22(8):729-735. doi: 10.1177/1098612X19881537.',
        sourceType: 'Estudo Clínico Farmacocinético em Gatos com DRC',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31660773/',
        evidenceLevel: 'Nível 1b (Ensaio Clínico em Felinos com Doença Renal)',
      },
      {
        id: 'ref-borio-2015-chlorhexidine-rct',
        citationText:
          'Borio S, Colombo S, La Rosa G, De Lucia M, Damborg P, Guardabassi L. Effectiveness of a combined 4% chlorhexidine digluconate shampoo and solution protocol in MRS and non-MRS canine superficial pyoderma: a randomized, blinded, antibiotic-controlled study. Vet Dermatol. 2015;26(5):339-344. doi: 10.1111/vde.12233.',
        sourceType: 'Ensaio Clínico Randomizado Dermatológico',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26140535/',
        evidenceLevel: 'Nível 1b (Ensaio Clínico Randomizado Mascarado)',
      },
      {
        id: 'ref-mueller-2007-deep-pyoderma-rct',
        citationText:
          'Mueller RS, Stephan B. Pradofloxacin in the treatment of canine deep pyoderma: a multicentred, blinded, randomized parallel trial. Vet Dermatol. 2007;18(3):144-151. doi: 10.1111/j.1365-3164.2007.00584.x.',
        sourceType: 'Ensaio Clínico Multicêntrico em Piodermite Profunda',
        url: 'https://pubmed.ncbi.nlm.nih.gov/17470228/',
        evidenceLevel: 'Nível 1b (Ensaio Clínico Paralelo Randomizado)',
      },
      {
        id: 'ref-vasuntrarak-2025-bioequivalence-bmc',
        citationText:
          'Vasuntrarak K, Patthanachai K, Charoenlertkul P, Nuanualsuwan S, Cheng H, Suanpairintr N. Comparative bioavailability study of two oral formulations of amoxicillin-clavulanic acid in healthy dogs. BMC Vet Res. 2025;21:173. doi: 10.1186/s12917-025-04649-4.',
        sourceType: 'Estudo de Bioequivalência Farmacocinética Canina',
        url: 'https://pubmed.ncbi.nlm.nih.gov/40091009/',
        evidenceLevel: 'Nível 1b (Estudo Crossover em Beagles)',
      },
      {
        id: 'ref-nelson-couto-6th-emergency',
        citationText:
          'Nelson RW, Couto CG. Medicina Interna de Pequenos Animais, 6ª ed. Cap. 18 (Emergency Respiratory) e Cap. 42 (Urinary Tract Disorders). Elsevier Brasil; 2021.',
        sourceType: 'Tratado de Medicina Interna Veterinária',
        evidenceLevel: 'Tratado Padrão Ouro Internacional',
      },
      {
        id: 'ref-zoetis-synulox-bula',
        citationText:
          'Zoetis Brasil. Synulox® Comprimidos Palatáveis (Amoxicilina 40/200 mg + Clavulanato de Potássio 10/50 mg) — Bula técnica e registro MAPA nº 3.968.',
        sourceType: 'Bula Oficial MAPA / Fabricante',
        url: 'https://www.zoetis.com.br/especies/animais-de-companhia/synulox-comprimidos-palataveis.aspx',
        evidenceLevel: 'Registro Oficial MAPA',
      },
    ],

    genericBrandsNote:
      'As formulações veterinárias consagradas no Brasil são compostas rigorosamente na proporção 4:1 (4 partes de amoxicilina tri-hidratada para 1 parte de clavulanato de potássio), incluindo o Synulox® (Zoetis) e o Agemoxi CL® (Agener União) nas apresentações de 50 mg (40 mg + 10 mg) e 250 mg (200 mg + 50 mg), além de apresentações de 500 mg. Formulações de uso humano de farmácia convencional, como o Clavulin®, são comercializadas em proporções diferentes: 4:1 (500/125 mg) e 7:1 (875/125 mg). Quando for utilizada apresentação humana com proporção 7:1, as doses dos dois princípios ativos devem ser calculadas separadamente para não incorrer em subdosagem de clavulanato.',

    // 13. Avisos Clínicos Importantes Específicos
    clinicalWarningItems: [
      {
        label: 'Proporção 4:1 (Veterinária) vs. 7:1 (Humana):',
        text: 'Produtos veterinários clássicos (Synulox, Agemoxi CL) são 4:1 com dose de 12,5 mg/kg total q12h (10 mg/kg amoxicilina + 2,5 mg/kg clavulanato). Formulações humanas de 875/125 mg são 7:1 e NÃO devem ser calculadas genericamente pelo peso total, pois fornecem quantidade desproporcionalmente baixa de clavulanato.',
      },
      {
        label: 'Piodermite Superficial e Diretriz ISCAID 2025:',
        text: 'A terapia tópica isolada (xampu de clorexidina a 4% duas a três vezes por semana) é atualmente a primeira escolha para piodermite superficial. O antibiótico sistêmico oral deve ser restrito a falhas tópicas ou piodermites profundas, suspendendo a medicação assim que houver remissão clínica e citológica (sem a regra antiga de manter por 2 semanas além da cura).',
      },
      {
        label: 'Breakpoint Urinário vs. Pielonefrite e Gatos com DRC:',
        text: 'O breakpoint urinário de suscetibilidade (<8/4 mcg/mL) vale exclusivamente para cistite vesical e não deve ser usado em pielonefrite. Em gatos com DRC e azotemia, a amoxicilina sérica aumenta enquanto a concentração urinária cai significativamente, com taxa de efeitos adversos de até 55%.',
      },
    ],

    relatedDiseaseSlugs: [],
    isControlled: false,
    isPublished: true,
    source: 'seed',
  },
];

export const amoxicilinaClavulanatoMedicationRecord = amoxicilinaClavulanatoMedicationsSeed[0];
