import { MedicationRecord } from '../../types/medication';

export const alopurinolMedicationRecord: MedicationRecord = {
  id: 'med-alopurinol',
  slug: 'alopurinol',
  title: 'Alopurinol',
  activeIngredient: 'Alopurinol (Alopurinol sódico)',
  isControlled: false,
  controlNotice:
    'Medicamento de venda sob prescrição médico-veterinária em receituário simples. Não consta nas listas de controle especial da Portaria SVS/MS nº 344/1998. Na Leishmaniose Visceral Canina no Brasil, a prescrição deve observar rigorosamente as normativas técnicas e regulamentares específicas do MAPA e Ministério da Saúde.',
  tradeNames: [
    'Zyloric 100 mg e 300 mg Comprimidos (Aspen Pharma — Referência Humana)',
    'Alopurinol Genérico 100 mg e 300 mg Comprimidos (EMS, Medley, Eurofarma, Teuto)',
    'Alopurinol Cápsulas Magistrais Veterinárias (dosagens flexíveis de 20 mg a 300 mg)',
    'Alopurinol Suspensão Oral Manipulada Veterinária (20 mg/mL ou 50 mg/mL)',
  ],
  officialSiteUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  leafletUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/allopurinol/PNG',
  pharmacologicClass:
    'Inibidor da Xantina-Oxidase; Análogo Estrutural da Hipoxantina; Agente Antiurêmico/Antiurolítico e Leishmaniostático',
  species: ['dog', 'cat'],
  category: 'nefrologia',
  tags: [
    'Alopurinol',
    'Allopurinol',
    'Zyloric',
    'Inibidor da Xantina-Oxidase',
    'Urolitíase por Urato',
    'Hiperuricosúria',
    'Dálmata',
    'SLC2A9',
    'Leishmaniose Canina',
    'LeishVet',
    'Xantina',
    'Xantinúria',
    'Urologia',
    'Nefrologia',
  ],

  plainLanguageSummary:
    'O alopurinol é um medicamento oral amplamente empregado na clínica veterinária para duas finalidades inteiramente distintas: dissolver e prevenir cálculos urinários de urato em cães com predisposição genética e controlar a multiplicação do parasito causador da leishmaniose visceral canina. Ele atua bloqueando a enzima xantina-oxidase, responsável por transformar a xantina em ácido úrico, reduzindo expressivamente os níveis de urato na urina e no sangue; contudo, esse bloqueio gera o acúmulo da própria xantina, uma substância ainda menos solúvel que pode se precipitar e formar novos cristais e cálculos renais e vesicais se o paciente não receber uma dieta estritamente restrita em purinas e hidratação abundante com urina bem diluída. Na leishmaniose, o medicamento é captado pelo parasito como um falso tijolo de purina e incorporado ao seu RNA, inibindo a sua replicação de forma sustentada mas sem proporcionar cura esterilizante definitiva, exigindo acompanhamento veterinário prolongado com urinálises e ultrassonografias abdominais periódicas para prevenir complicações urinárias.',

  mechanismOfAction:
    'O alopurinol possui dois mecanismos farmacodinâmicos fundamentais e distintos dependendo do contexto patológico: 1. Inibição da Xantina-Oxidase no hospedeiro: Sendo um análogo estrutural da hipoxantina (núcleo pirazolopirimidina), o alopurinol atua como falso substrato e inibidor mecanismo-dependente da xantina-oxidase/xantina-oxidoredutase (XO/XOR). A própria enzima catalisa a oxidação do alopurinol em oxipurinol (aloxantina), metabólito ativo dotado de meia-vida mais longa (~4 horas no cão) que permanece fortemente ligado ao sítio catalítico com inibição duradoura. Isso bloqueia tanto a conversão de hipoxantina em xantina quanto a oxidação de xantina em ácido úrico, promovendo queda acentuada das concentrações de urato plasmático e urinário. Em contrapartida, os substratos a montante (hipoxantina e especialmente xantina) acumulam-se no organismo e na urina. Como a xantina possui produto de solubilidade inferior ao do urato, o excesso de substrato pode precipitar na forma de cristais e urólitos de xantina quando a ingestão de purinas dietéticas permanece elevada. 2. Ação leishmaniostática no parasito: Diferentemente dos mamíferos, protozoários do gênero Leishmania são incapazes de realizar a síntese de novo do anel purínico, dependendo exclusivamente da via de salvamento (purine salvage pathway) para adquirir purinas do hospedeiro. O parasito capta ativamente o alopurinol através de transportadores de nucleosídeos/nucleobases e o metaboliza por fosforribosiltransferases (HGPRT/XPRT) em ribonucleotídeos anormais de pirazolopirimidina (como o monofosfato de alopurinol-ribosídeo). Esses metabólitos anormais inibem a IMP-desidrogenase e a GMP-redutase, bloqueiam a síntese funcional de nucleotídeos de adenina e guanina e são incorporados na cadeia de RNA parasitário, deflagrando parada da síntese de proteínas e inibição da replicação celular amastigota de maneira seletiva.',

  indications: [
    'Dissolução médica de urólitos de urato (urato de amônio / ácido úrico) em cães com hiperuricosúria genética comprovada (ex.: mutações no gene SLC2A9 em Dálmatas e Bulldogs Ingleses), em associação obrigatória a dieta restrita em purinas, alcalinização e hidratação.',
    'Prevenção secundária de recorrência de urolitíase por urato em cães geneticamente hiperuricosúricos quando as intervenções dietéticas e hídricas isoladas forem comprovadamente insuficientes.',
    'Terapia de manutenção e controle leishmaniostático prolongado (6 a 12 meses) na Leishmaniose Visceral Canina (CanL) em protocolos combinados (LeishVet) com miltefosina ou antimoniato de meglumina.',
    'Manejo leishmaniostático na Leishmaniose Felina (FeL) sob evidência descritiva e monitoramento estrito.',
    'Adjuvante no controle de gota úrica e hiperuricemia em aves e répteis sob protocolos especializados.',
  ],

  contraindications: [
    'Urolitíase secundária a anomalias vasculares portossistêmicas (Shunt Portossistêmico intra ou extra-hepático / displasia microvascular) sem correção da causa de base: o alopurinol não corrige a hipoplasia hepática nem a hiperamonemia e seu papel profilático é incerto, devendo o foco residir no reparo vascular ou manejo médico da hepatopatia.',
    'Cães sob dieta habitual rica em purinas sem transição dietética restritiva: risco severo de xantinúria massiva e urolitíase obstrutiva por xantina.',
    'Uso concomitante com azatioprina ou 6-mercaptopurina em doses convencionais sem redução drástica prévia: risco crítico de mielossupressão fatal e pancitopenia.',
    'Hipersensibilidade conhecida ao alopurinol ou aos componentes da fórmula.',
    'Crise obstrutiva urinária aguda que demande intervenção física emergencial (uro-hidropropulsão, cistotomia ou desobstrução).',
    'Aves de rapina da espécie Buteo jamaicensis (gavião-de-cauda-vermelha) e outros rapinantes predispostos a toxicidade renal aguda fatal.',
  ],

  cautions: [
    'Pacientes com doença renal crônica (estágios IRIS 2 a 4): o oxipurinol é depurado predominantemente por excreção renal; o declínio da taxa de filtração glomerular prolonga a meia-vida do metabólito e potencializa tanto a toxicidade sistêmica quanto o risco de nefrolitíase por xantina, exigindo redução posológica inicial (5 mg/kg q12h em CanL segundo o Plumb 10ª ed.).',
    'Evitar a manutenção crônica da dose alta de dissolução (15 mg/kg q12h) após a resolução dos urólitos; para prevenção a longo prazo, reduzir para 5 a 7 mg/kg q12-24h para minimizar a supersaturação de xantina.',
    'Em felinos, dados do Consenso ACVIM indicam que a eficácia da dissolução médica de urato com alopurinol não foi comprovada clinicamente; priorizar exclusão de shunt e manejo dietético/hídrico.',
    'Gatos com leishmaniose apresentam maior suscetibilidade a reações adversas medicamentosas idiossincráticas, incluindo dermatite esfoliativa facial grave e lesão renal aguda.',
    'Não utilizar acidificantes urinários (cloreto de amônio, metionina) durante a terapia antiurato, pois a acidúria reduz drasticamente a solubilidade do ácido úrico.',
    'A Leishmania pode desenvolver resistência fenotípica e molecular ao alopurinol em tratamentos prolongados repetidos (aumento da IC50 documentado por Yasur-Landau et al. 2016).',
  ],

  adverseEffects: [
    'Frequentes / Mecanismo-dependentes: Xantinúria (formação de cristais urinários de xantina de coloração amarelo-acastanhada), urolitíase por xantina (cálculos radiolucentes na vesícula urinária ou uretra) e nefrocalcinose/mineralização do parênquima renal (documentada em até 13% dos cães tratados cronicamente no estudo de Torres et al. 2016).',
    'Gastrointestinais: Vômitos transitórios, náusea matinal, fezes amolecidas, diarreia e hiporexia leve (atenuados pela administração com alimento).',
    'Dermatológicos / Hipersensibilidade: Prurido generalizado, eritema cutâneo, alopecia, descamação e reações cutâneas alérgicas (em felinos, relatos de dermatite esfoliativa crostosa intensa em cabeça e pescoço reversível após suspensão).',
    'Hepáticos: Elevação transitória e assintomática de ALT, AST e fosfatase alcalina; hepatite medicamentosa idiossincrática é rara.',
    'Hematológicos: Neutropenia transitória, leucopenia e supressão medular reversível após a descontinuação (monitoramento hematológico semestral recomendado).',
    'Renais: Lesão renal aguda ou progressão de disfunção renal crônica decorrente de deposição intratubular de microcristais de xantina e nefrite intersticial secundária.',
  ],

  interactions: [
    'Azatioprina e Mercaptopurina (Interação Crítica de Alto Risco): A xantina-oxidase é uma das principais enzimas responsáveis pela degradação e inativação metabólica da 6-mercaptopurina. A inibição da XO pelo alopurinol desvia a via para produção desmedida de tioguanina ativa, deflagrando mielossupressão fulminante, neutropenia extrema e trombocitopenia com risco de morte. A associação exige redução da dose de azatioprina para 25% a 33% da dose original e monitoramento hematológico semanal rigoroso.',
    'Ciclofosfamida: Pode aumentar o risco e a severidade da supressão da medula óssea; acompanhar leucograma quinzenal.',
    'Ciclosporina: Relatos em humanos e mamíferos indicam aumento das concentrações séricas mínimas de ciclosporina, elevando o risco de nefrotoxicidade.',
    'Teofilina e Aminofilina: O alopurinol inibe o metabolismo oxidativo das metilxantinas, podendo elevar os níveis plasmáticos de teofilina e desencadear tremores, taquicardia sinusal e arritmias.',
    'Aminopenicilinas (Amoxicilina e Ampicilina): Em medicina humana, associa-se a maior incidência de exantema cutâneo e rash medicamentoso; monitorar a pele de cães e gatos em coterapia.',
    'Diuréticos Tiazídicos e de Alça (Furosemida): Podem reduzir a excreção renal de oxipurinol, elevando sua meia-vida e facilitando eventos tóxicos.',
    'Acidificantes Urinários (Metionina, Cloreto de Amônio): Contraindicados formalmente; a acidose tubular urinária reduz bruscamente a solubilidade do urato e precipita cálculos.',
    'Hidróxido de Alumínio e Antiácidos: Podem quelar e diminuir a absorção entérica do alopurinol; respeitar intervalo de 2 horas entre as tomadas.',
  ],

  routes: ['por via oral'],

  pillars: [
    {
      title: 'Bloqueio Enzimático da Xantina-Oxidase',
      icon: 'Scissors',
      desc: 'O alopurinol e seu metabólito ativo oxipurinol inibem a conversão de hipoxantina em xantina e de xantina em ácido úrico, reduzindo drasticamente o urato urinário e plasmático.',
    },
    {
      title: 'O Paradoxo Farmacológico da Xantina',
      icon: 'AlertTriangle',
      desc: 'Ao fechar a torneira do urato, a xantina acumula a montante. Por ser menos solúvel que o urato, o alopurinol sem dieta com baixa purina pode trocar cálculo de urato por cálculo de xantina.',
    },
    {
      title: 'Mecanismo Antiparasitário por Falso Substrato',
      icon: 'ShieldAlert',
      desc: 'Na Leishmania, que depende da via de salvamento de purinas, o alopurinol é metabolizado em nucleotídeos anormais e incorporado ao RNA, bloqueando a síntese proteica e a replicação amastigota.',
    },
    {
      title: 'Dieta e Hidratação Como Pilares Inseparáveis',
      icon: 'Droplets',
      desc: 'A restrição de purinas na dieta e a promoção de urina abundante e diluída (USG cão <= 1,020) são mandatórias para prevenir a supersaturação e precipitação de xantina durante o tratamento.',
    },
  ],

  quickSummaryHighlights: [
    'Inibidor seletivo da xantina-oxidase indicado para dissolução e prevenção de urato canino e controle leishmaniostático prolongado.',
    'Risco de troca de urato por urólito de xantina: mandatório associar dieta com restrição de purinas e estímulo à diurese.',
    'Na Leishmaniose Canina (LeishVet): dose padrão de 10 mg/kg VO q12h por 6 a 12 meses associada a miltefosina ou antimonial.',
    'Interação de altíssimo risco com azatioprina: exige redução de 66% a 75% da azatioprina sob risco de mielotoxicidade grave.',
  ],

  pharmacokineticsData: {
    absorption:
      'Absorção oral rápida e consistente a partir do trato gastrointestinal canino. O estudo farmacocinético seminal de Bartges et al. (1997) em cães Beagles sadios demonstrou que a presença de alimento não altera significativamente a taxa de absorção nem a área sob a curva (AUC) do alopurinol ou oxipurinol, permitindo a administração com ou sem refeições (sendo recomendado fornecer com alimentos para amenizar náuseas e vômitos). O pico de concentração plasmática (Tmax) ocorre entre 1 e 2 horas (faixa de 1 a 3 horas com variabilidade interindividual descrita em Dálmatas). A biodisponibilidade oral canina é boa, situada na faixa de 70% a 90% (Plumb 10ª ed. relata ~90%, enquanto compêndios mais antigos relatam 68% a 70%). Em felinos, faltam ensaios farmacocinéticos quantitativos robustos equivalentes.',
    distribution:
      'Molécula de caráter hidrofílico (XLogP3 computado ≈ -0,7) que apresenta volume de distribuição aparente moderado no cão, em torno de 0,88 a 0,90 L/kg. Diferentemente de outros fármacos, tanto o alopurinol quanto o oxipurinol praticamente não exibem ligação a proteínas plasmáticas (fração livre próxima de 100%), eliminando riscos de deslocamento competitivo proteico. A travessia da barreira hematoencefálica é limitada. Ambos os compostos atravessam a barreira placentária e são excretados no leite materno em fêmeas lactantes.',
    metabolism:
      'Extensa biotransformação hepática e tecidual mediada pela própria enzima alvo (xantina-oxidase) e pela aldeído-oxidase, caracterizando um inibidor mecanismo-dependente. A oxidação primária converte o alopurinol em oxipurinol (aloxantina), um metabólito ativo e persistente que é o principal responsável pela inibição sustentada da xantina-oxidase ao longo do intervalo posológico. Frações menores sofrem conjugação com ribosídeos formando alopurinol-ribosídeo. A cinética de eliminação é não linear: Bartges et al. (1997) evidenciaram a existência de um limiar farmacodinâmico no cão acima do qual doses crescentes não produzem supressão adicional proporcional da síntese de urato.',
    elimination:
      'A eliminação do alopurinol e de seu metabólito ativo oxipurinol dá-se predominantemente pela via renal. O alopurinol parental é eliminado com meia-vida curta (t1/2 de 1,5 a 2,5 horas em cães; clearance plasmático de 3,5 a 4,3 mL/kg/min). O oxipurinol, por sua vez, exibe meia-vida de eliminação mais prolongada, em torno de 4 a 6 horas em cães hígidos (podendo ultrapassar 10 a 24 horas em pacientes nefropatas devido à filtração glomerular reduzida e reabsorção tubular). Pacientes com insuficiência renal crônica retêm oxipurinol, aumentando o risco de intoxicação e nefrolitíase por xantina.',
  },

  doses: [
    {
      id: 'dose-allo-dog-urate-dissolution',
      species: 'dog',
      indication: 'Dissolução médica de urólitos de urato em cães (hiperuricosúria genética / SLC2A9 comprovada)',
      doseMin: 15.0,
      doseMax: 15.0,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q12h',
      duration: 'Até 4 semanas; avaliar resposta clínica e radiográfica/ultrassonográfica ao final do período',
      notes:
        'Protocolo de consenso ACVIM (Lulich et al., 2016) e Plumb 10ª ed.: 15 mg/kg VO a cada 12 horas. Obrigatório associar a dieta veterinária terapêutica restrita em purinas, alcalinizante urinário (citrato de potássio se necessário para pH >= 7,0) e estímulo vigoroso à hidratação para manter densidade urinária <= 1,020. Dissolução completa ocorre em aproximadamente 40% e parcial em 30% dos cães. Jamais manter esta dose elevada indefinidamente devido ao risco de xantinúria.',
      calculatorEnabled: true,
      referenceIds: ['ref-acvim-uroliths-2016', 'ref-plumb-10', 'ref-bsava-10'],
    },
    {
      id: 'dose-allo-dog-urate-prevention',
      species: 'dog',
      indication: 'Prevenção secundária de recorrência de cálculos de urato em cães hiperuricosúricos',
      doseMin: 5.0,
      doseMax: 7.0,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q12–24h',
      duration: 'Uso contínuo sob acompanhamento periódico de sedimento urinário e ultrassonografia',
      notes:
        'Dose preventiva consensual ACVIM (2016): 5 a 7 mg/kg VO a cada 12 a 24 horas. Iniciar somente se as medidas dietéticas com baixa purina e hidratação forem insuficientes para prevenir a cristalúria. O objetivo é utilizar a menor dose eficaz para suprimir o urato sem atingir concentrações críticas de supersaturação de xantina.',
      calculatorEnabled: true,
      referenceIds: ['ref-acvim-uroliths-2016', 'ref-plumb-10', 'ref-bsava-10'],
    },
    {
      id: 'dose-allo-dog-leishmania-combo',
      species: 'dog',
      indication: 'Leishmaniose Visceral Canina (CanL) — Terapia de manutenção leishmaniostática combinada',
      doseMin: 10.0,
      doseMax: 10.0,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q12h',
      duration: '6 a 12 meses (reavaliar estadiamento clínico, sorologia quantitativa, UPC e imagem)',
      notes:
        'Diretrizes internacionais consensuais LeishVet (2025) e Plumb 10ª ed.: 10 mg/kg VO a cada 12 horas. Administrado em combinação com leishmanicida de ataque: miltefosina (2 mg/kg VO q24h por 28 dias) OU antimoniato de meglumina (100 mg/kg SC q24h por 4 a 6 semanas). No Brasil, utilizar produtos com registro veterinário regularizado no MAPA para LVC (Milteforan). Monitorar sedimento urinário e ultrassonografia abdominal a cada 2 a 3 meses pelo risco de xantinúria (incidência de ~13% a 50% dos animais tratados).',
      calculatorEnabled: true,
      referenceIds: [
        'ref-leishvet-canine-2025',
        'ref-miro-miltefosine-2009',
        'ref-koutinas-allopurinol-2001',
        'ref-plumb-10',
      ],
    },
    {
      id: 'dose-allo-dog-leishmania-renal',
      species: 'dog',
      indication: 'Leishmaniose Visceral Canina em cães com disfunção renal crônica / proteinúria',
      doseMin: 5.0,
      doseMax: 5.0,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q12h',
      duration: '6 a 12 meses sob monitoramento quinzenal de creatinina, SDMA e sedimento',
      notes:
        'Ajuste posológico preconizado pelo Plumb 10ª ed.: iniciar com 5 mg/kg VO a cada 12 horas (redução de 50% em relação à dose padrão) em cães com doença renal crônica ou disfunção tubular para compensar o menor clearance de oxipurinol e minimizar a deposição de cristais de xantina no parênquima renal.',
      calculatorEnabled: true,
      referenceIds: ['ref-plumb-10', 'ref-leishvet-canine-2025'],
    },
    {
      id: 'dose-allo-cat-leishmania',
      species: 'cat',
      indication: 'Leishmaniose Felina (FeL) — Manejo terapêutico adjuvante sob evidência descritiva',
      doseMin: 10.0,
      doseMax: 20.0,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q12–24h',
      duration: 'Pelo menos 6 a 12 meses sob monitorização clínica estrita',
      notes:
        'Diretrizes LeishVet Felina (2024) e BSAVA 10ª ed.: 10 mg/kg VO a cada 12 horas OU 20 mg/kg VO a cada 24 horas. Evidência clínica derivada exclusivamente de estudos descritivos e séries de casos não controlados. Monitorar função renal, bioquímica hepática e pele (risco documentado de dermatite esfoliativa crostosa grave de hipersensibilidade e injúria renal aguda em gatos).',
      calculatorEnabled: true,
      referenceIds: ['ref-leishvet-feline-2024', 'ref-bsava-10', 'ref-plumb-10'],
    },
    {
      id: 'dose-allo-cat-urate-historical',
      species: 'cat',
      indication: 'Urolitíase por urato em felinos — Alerta de evidência insuficiente e dose histórica',
      doseMin: 10.0,
      doseMax: 15.0,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q12h',
      duration: 'Dose histórica de literatura; uso deve ser criteriosamente individualizado',
      notes:
        'Dose histórica descrita em compêndios antigos (10 a 15 mg/kg q12h por 4 semanas). O Consenso Internacional ACVIM (2016) destaca formalmente que não existem evidências clínicas publicadas que respaldem a eficácia de inibidores da xantina-oxidase para dissolução de urato em gatos. Priorizar investigação exaustiva de shunt portossistêmico, manejo dietético específico e estímulo hídrico vigoroso.',
      calculatorEnabled: true,
      referenceIds: ['ref-acvim-uroliths-2016', 'ref-bsava-10'],
    },
  ],

  monitoringParameters: [
    'Urinálise seriada e exame microscópico do sedimento urinário: realizar a cada 30 a 60 dias no início e trimestralmente no tratamento prolongado para rastrear precocemente cristalúria por xantina (cristais esféricos marrom-amarelados) ou recidiva de urato.',
    'Mensuração da densidade urinária específica (USG) e pH urinário: conferir hidratação adequada buscando USG <= 1,020 em cães e < 1,030 em gatos, além de pH neutro a levemente alcalino (>= 7,0) para favorecer a solubilidade de uratos.',
    'Ultrassonografia do trato urinário e radiografia abdominal periódica: monitorar a formação de cálculos radiolucentes de xantina na bexiga e uretra, bem como áreas de mineralização renal ou nefrolitíase (estudo de Oliveira et al. 2025 identificou tempo mediano de 150 dias para o surgimento de xantinúria em cães sob alopurinol).',
    'Avaliação da função renal seriada: dosar ureia sérica, creatinina plasmática e SDMA a cada 2 a 3 meses; em pacientes com leishmaniose, monitorar a relação proteína:creatinina urinária (UPC) para acompanhar a glomerulopatia por imunocomplexos.',
    'Enzimas hepáticas (ALT, AST e Fosfatase Alcalina): monitorar periodicamente a cada 3 a 6 meses para descartar hepatite medicamentosa associada ao alopurinol.',
    'Hemograma completo periódico: checar contagem de neutrófilos e plaquetas semestralmente (ou semanalmente se houver coadministração com azatioprina).',
    'Monitoramento específico na Leishmaniose Canina (LeishVet): acompanhar resposta clínica, proteinograma sérico (eletroforese com normalização de gamaglobulinas e albumina), título de anticorpos por IFI/ELISA quantitativo e proteínas de fase aguda (PCR, haptoglobina).',
  ],

  clientInformation: [
    'Medicamento de Uso Contínuo: O alopurinol precisa ser administrado todos os dias rigorosamente nos horários prescritos. Não interrompa o tratamento sem autorização expressa do médico-veterinário.',
    'Dieta Específica Obrigatória: Não forneça carnes vermelhas, miúdos (fígado, coração, rim), peixes ricos em purinas ou petiscos caseiros sem autorização. O alopurinol associado a alimentos ricos em purinas pode produzir cálculos urinários graves de xantina.',
    'Água Abundante e Fresca: Estimule o animal a beber muita água todos os dias. Forneça fontes com água corrente, tigelas distribuídas pela casa e alimentos úmidos para garantir que a urina permaneça diluída e clara.',
    'Como Administrar: Os comprimidos podem ser administrados junto com uma refeição caso o animal apresente sensibilidade digestiva, náusea ou vômitos.',
    'Sinais de Alerta Urinário: Observe diariamente a micção do animal. Se notar dificuldade para urinar, esforço repetido sem sair urina, urina com sangue ou dor na barriga, suspenda o medicamento e leve o paciente imediatamente à clínica veterinária.',
    'Acompanhamento Veterinário Periódico: Realize as urinálises e os exames de ultrassom solicitados pelo profissional nas datas programadas. Cálculos de xantina podem se formar silenciosamente durante o tratamento prolongado.',
  ],

  references: [
    {
      id: 'ref-plumb-10',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. VetMedux/Wiley-Blackwell; 2023. Monografia: Allopurinol, pp. 37–39 (PDF pp. 64–66).',
      sourceType: 'Compêndio Farmacológico Veterinário Padrão-Ouro',
      url: 'https://search.worldcat.org/isbn/9781394172207',
      notes: 'Monografia canônica com dados de boa absorção oral, formação de oxipurinol, ausência de ligação proteica, ajuste posológico na nefropatia e tabelas de interação medicamentosa.',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-bsava-10',
      citationText:
        'British Small Animal Veterinary Association. BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. British Small Animal Veterinary Association; 2020. Monografia: Allopurinol, pp. 11–12.',
      sourceType: 'Formulário Veterinário Internacional',
      url: 'https://www.bsavalibrary.com/content/book/10.22233/9781910443729',
      notes: 'Diretrizes de dissolução canina (10 mg/kg q8h ou 15 mg/kg q12h), leishmaniose canina (10 mg/kg q12h) e alertas de experiência felina limitada.',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-acvim-uroliths-2016',
      citationText:
        'Lulich JP, Berent AC, Adams LG, Westropp JL, Bartges JW, Osborne CA. ACVIM Small Animal Consensus Recommendations on the Treatment and Prevention of Uroliths in Dogs and Cats. J Vet Intern Med. 2016;30(5):1564-1574. doi:10.1111/jvim.14559.',
      sourceType: 'Diretriz de Consenso Internacional ACVIM',
      url: 'https://doi.org/10.1111/jvim.14559',
      notes: 'Consenso que preconiza 15 mg/kg q12h para dissolução de urato em cães e 5 a 7 mg/kg q12-24h para prevenção genética; adverte formalmente contra o uso de alopurinol sem dieta restrita em purinas e destaca ausência de dados em gatos.',
      evidenceLevel: 'Consenso Internacional de Especialistas',
    },
    {
      id: 'ref-leishvet-canine-2025',
      citationText:
        'LeishVet Group. Practical Management of Canine Leishmaniosis. Guidelines Updated 2025. LeishVet; 2025. Disponível em: https://www.leishvet.org/wp-content/uploads/2025/09/FS-LeishVetC.pdf.',
      sourceType: 'Diretriz Internacional Especializada em Leishmaniose',
      url: 'https://www.leishvet.org/wp-content/uploads/2025/09/FS-LeishVetC.pdf',
      notes: 'Protocolo padrão-ouro recomendando alopurinol 10 mg/kg VO q12h por 6 a 12 meses em combinação com miltefosina ou antimoniato de meglumina, com vigilância obrigatória de xantinúria.',
      evidenceLevel: 'Consenso Internacional de Especialistas',
    },
    {
      id: 'ref-leishvet-feline-2024',
      citationText:
        'LeishVet Group. Practical Management of Feline Leishmaniosis. Guidelines Updated 2024. LeishVet; 2024. Disponível em: https://www.leishvet.org/wp-content/uploads/2024/04/FS-ALIVE24-feline.pdf.',
      sourceType: 'Diretriz Internacional Especializada em Leishmaniose Felina',
      url: 'https://www.leishvet.org/wp-content/uploads/2024/04/FS-ALIVE24-feline.pdf',
      notes: 'Orientações para gatos: alopurinol 10 mg/kg q12h ou 20 mg/kg q24h por 6 a 12 meses sob alerta de evidência descritiva e risco de reações cutâneas graves.',
      evidenceLevel: 'Consenso Internacional de Especialistas',
    },
    {
      id: 'ref-bartges-pk-1997',
      citationText:
        'Bartges JW, Osborne CA, Felice LJ, Koehler LA, Ulrich LK, Bird KA, Chen M, Sawchuk RJ. Bioavailability and pharmacokinetics of intravenously and orally administered allopurinol in healthy beagles. Am J Vet Res. 1997;58(5):504-510.',
      sourceType: 'Ensaio farmacocinético cruzado experimental',
      url: 'https://pubmed.ncbi.nlm.nih.gov/9140559/',
      notes: 'Estudo seminal em cães Beagles demonstrando absorção oral rápida, ausência de impacto do alimento na biodisponibilidade e cinética não linear com teto de inibição de urato.',
      evidenceLevel: 'Nível I — Ensaio farmacocinético experimental',
    },
    {
      id: 'ref-koutinas-allopurinol-2001',
      citationText:
        'Koutinas AF, Saridomichelakis MN, Mylonakis ME, Leontides LS, Polizopoulou Z, Billinis C, Argyroudis S, Diakou N. A randomised, blinded, placebo-controlled clinical trial with allopurinol in canine leishmaniosis. Vet Parasitol. 2001;98(4):247-261. doi:10.1016/s0304-4017(01)00399-5.',
      sourceType: 'Ensaio clínico randomizado cego controlado por placebo (RCT)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/11423183/',
      notes: 'Ensaio em 45 cães demonstrando que alopurinol 10 mg/kg q12h melhora substancialmente os sinais clínicos e a carga parasitária, mas não produz cura esterilizante (PCR medular persistiu positiva).',
      evidenceLevel: 'Nível I — Ensaio clínico randomizado e controlado',
    },
    {
      id: 'ref-miro-miltefosine-2009',
      citationText:
        'Miró G, Oliva G, Cruz I, Cañavate C, Mortarino M, San Andrés M, Masucci M, Mercurio V, Pereira L, Fosdick L, Carrió J. Multicentric, controlled clinical study to evaluate effectiveness and safety of miltefosine and allopurinol for canine leishmaniosis. Vet Dermatol. 2009;20(5-6):397-404. doi:10.1111/j.1365-3164.2009.00824.x.',
      sourceType: 'Ensaio clínico multicêntrico prospectivo controlado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/20178476/',
      notes: 'Estudo comparando miltefosina + alopurinol versus antimonial + alopurinol, demonstrando eficácia e segurança clínica comparáveis no tratamento da leishmaniose canina.',
      evidenceLevel: 'Nível I — Ensaio multicêntrico controlado',
    },
    {
      id: 'ref-torres-xanthinuria-2016',
      citationText:
        'Torres M, Pastor J, Roura X, Tabar MD, Espada Y, Font A, Balasch J, Planellas M. Adverse urinary effects of allopurinol in dogs with leishmaniasis. J Small Anim Pract. 2016;57(6):299-304. doi:10.1111/jsap.12484.',
      sourceType: 'Estudo de coorte clínico prospectivo e retrospectivo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/27112522/',
      notes: 'Avaliou 320 cães tratados com alopurinol: 13% (42 cães) desenvolveram complicações urinárias com xantinúria, urolitíase por xantina e mineralização renal.',
      evidenceLevel: 'Nível II — Estudo de coorte clínico observacional',
    },
    {
      id: 'ref-oliveira-xanthinuria-2025',
      citationText:
        'Oliveira BC, Silva AC, Fontes MM, et al. Characterisation and evaluation of predisposing factors for the development of xanthinuria in dogs with leishmaniosis under allopurinol therapy. Parasit Vectors. 2025;18(1):98. doi:10.1186/s13071-025-06731-0.',
      sourceType: 'Estudo multicêntrico retrospectivo pareado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/40065388/',
      notes: 'Estudo recente em 90 cães sob alopurinol identificando tempo mediano para desenvolvimento de xantinúria de 150 dias (IQR 31 a 455 dias), ressaltando a urgência de urinálise seriada precoce.',
      evidenceLevel: 'Nível II — Estudo multicêntrico controlado',
    },
    {
      id: 'ref-yasur-landau-resistance-2016',
      citationText:
        'Yasur-Landau D, Jaffe CL, David L, Baneth G. Allopurinol Resistance in Leishmania infantum from Dogs with Disease Relapse. PLoS Negl Trop Dis. 2016;10(1):e0004341. doi:10.1371/journal.pntd.0004341.',
      sourceType: 'Estudo parasitológico e farmacológico experimental',
      url: 'https://pubmed.ncbi.nlm.nih.gov/26735519/',
      notes: 'Demonstrou que cepas de L. infantum isoladas de cães com recaída clínica apresentaram IC50 significativamente maior (~996 mcg/mL vs ~200 mcg/mL), provando resistência adquirida ao alopurinol.',
      evidenceLevel: 'Estudo Translacional / Experimental',
    },
    {
      id: 'ref-nelson-couto-6th',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2020. Cap. 40: Disorders of Micturition and Urolithiasis, pp. 650–658 & Cap. 89: Protozoal Infections (Leishmaniasis), pp. 1380–1386.',
      sourceType: 'Livro-texto de Medicina Interna Veterinária',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-ettinger-9th',
      citationText:
        'Côté E, Ettinger SJ, Feldman EC. Ettinger’s Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2024. Cap. 286: Canine Urolithiasis, pp. 1765–1772 & Cap. 195: Leishmaniosis, pp. 1088–1096.',
      sourceType: 'Tratado de Medicina Interna Veterinária',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-zyloric-bula',
      citationText:
        'Aspen Pharma Indústria Farmacêutica Ltda. Bula oficial do medicamento Zyloric (Alopurinol 100 mg e 300 mg comprimidos). Registro ANVISA MS nº 1.2883.0035.',
      sourceType: 'Bula Técnica Oficial Registrada ANVISA',
      url: 'https://consultas.anvisa.gov.br/#/medicamentos/',
      notes: 'Apresentação humana de referência no Brasil sob prescrição simples.',
      evidenceLevel: 'Documento Técnico Regulatório ANVISA',
    },
  ],

  presentations: [
    {
      id: 'pres-zyloric-100mg',
      name: 'Zyloric 100 mg Comprimidos',
      brand: 'Aspen Pharma (Referência Humana)',
      form: 'Comprimido simples',
      concentrationValue: 100.0,
      concentrationUnit: 'mg',
      packInfo: 'Caixa com 30 comprimidos de 100 mg',
      route: 'Oral (VO)',
      channel: 'human_pharmacy',
    },
    {
      id: 'pres-zyloric-300mg',
      name: 'Zyloric 300 mg Comprimidos',
      brand: 'Aspen Pharma (Referência Humana)',
      form: 'Comprimido simples',
      concentrationValue: 300.0,
      concentrationUnit: 'mg',
      packInfo: 'Caixa com 30 comprimidos de 300 mg',
      route: 'Oral (VO)',
      channel: 'human_pharmacy',
    },
    {
      id: 'pres-allopurinol-mag-caps',
      name: 'Alopurinol Cápsulas Magistrais Veterinárias',
      brand: 'Farmácia de Manipulação Veterinária Especializada',
      form: 'Cápsula gelatinosa manipulada',
      concentrationValue: 50.0,
      concentrationUnit: 'mg',
      packInfo: 'Frasco com 30, 60 ou 90 cápsulas (dosagens sob medida: 20 mg, 50 mg, 150 mg, 200 mg)',
      route: 'Oral (VO)',
      channel: 'compounded',
    },
    {
      id: 'pres-allopurinol-mag-susp',
      name: 'Alopurinol Suspensão Oral Veterinária 20 mg/mL ou 50 mg/mL (Veículo Palatável)',
      brand: 'Farmácia de Manipulação Veterinária Especializada',
      form: 'Suspensão oral palatável',
      concentrationValue: 50.0,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco dosador de 30 mL a 120 mL (estabilidade de 60 dias em Ora-Plus/Ora-Sweet)',
      route: 'Oral (VO)',
      channel: 'compounded',
    },
  ],

  attentionSubtitle:
    'Risco de troca de urato por cálculo de xantina, nefrocalcinose em uso crônico, interação fatal com azatioprina e exigência de dieta com restrição de purinas.',

  attentionData: {
    precautions: [
      {
        condition: 'Administração sem Dieta Restrita em Purinas (Risco de Xantinúria Crítica)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'O alopurinol inibe a oxidação de xantina a urato, provocando elevação massiva da excreção urinária de xantina. Como a solubilidade aquosa da xantina é consideravelmente menor do que a do urato, manter uma dieta rica em purinas durante o bloqueio enzimático sobrecarrega a via metabólica e precipita cristalúria maciça, nefrocalcinose e formação rápida de urólitos obstrutivos de xantina.',
        clinicalAction:
          'Contraindicação formal de uso. O alopurinol jamais deve ser instituído sem a transição obrigatória e concomitante para uma dieta com estrita restrição de purinas e estímulo hídrico vigoroso.',
      },
      {
        condition: 'Associação Inadvertida com Azatioprina ou 6-Mercaptopurina',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A xantina-oxidase é a principal rota catabólica de inativação da 6-mercaptopurina. Ao inibir a enzima, o alopurinol desvia a metabolização para a geração de nucleotídeos tioguanínicos citotóxicos em níveis suprafisiológicos, deflagrando pancitopenia fulminante, aplasia medular e choque séptico.',
        clinicalAction:
          'Contraindicação absoluta em doses usuais. Se a coterapia for indispensável, reduzir a dose de azatioprina para 25% a 33% da dose original e realizar monitoramento semanal de hemograma completo.',
      },
      {
        condition: 'Cálculos de Urato Secundários a Shunt Portossistêmico (PSS) não Corrigido',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'No shunt vascular portossistêmico, a hiperuricosúria decorre do desvio do fluxo sanguíneo esplâncnico e da falha de captação hepática pela uricase íntegra, associada a hiperamonemia profunda. O alopurinol não repara a anatomia vascular nem a disfunção hepática, apresentando eficácia incerta e agregando risco de xantinúria.',
        clinicalAction:
          'Não utilizar alopurinol como monoterapia em animais com PSS não corrigido. A conduta prioritária é a atenuação cirúrgica do vaso anômalo ou terapia médica conservadora com lactulose, dieta para hepatopatia e controle de encefalopatia.',
      },
      {
        condition: 'Doença Renal Crônica Avançada (Estágios IRIS 3 e 4)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'O oxipurinol depende primordialmente da depuração renal para ser eliminado. O declínio severo da taxa de filtração glomerular resulta em acúmulo sistêmico do metabólito, acentuando a inibição enzimática e promovendo mineralização parenquimatosa e nefrotoxicidade tubular por microcristais de xantina.',
        clinicalAction:
          'Utilizar com extrema precaução. Na leishmaniose canina com DRC, reduzir a dose inicial para 5 mg/kg VO q12h (Plumb 10ª ed.) e monitorar creatinina, SDMA, UPC e sedimento urinário quinzenalmente.',
      },
      {
        condition: 'Uso de Acidificantes Urinários Concomitantes (Metionina, Cloreto de Amônio)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A acidificação urinária reduz drasticamente a solubilidade do ácido úrico (que precipita preferencialmente em pH < 6,5) sem beneficiar a dissolução de xantina, acelerando a litogênese e lesão tubular.',
        clinicalAction:
          'Proibido associar acidificantes urinários. Manter o pH urinário neutro a levemente alcalino (alvo >= 7,0) através de dieta apropriada ou suplementação com citrato de potássio.',
      },
      {
        condition: 'Hipersensibilidade Severa e Reações Cutâneas Idiossincráticas em Felinos',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Gatos tratados para leishmaniose apresentam relatos na literatura de reações idiossincráticas com erupções crostosas, prurido intenso na cabeça e pescoço e lesão renal aguda associada a hipersensibilidade.',
        clinicalAction:
          'Suspender o alopurinol imediatamente se surgirem lesões dermatológicas esfoliativas ou piora renal inexplicada em felinos.',
      },
    ],

    adverseEffectsDetailed: [
      {
        effect: 'Xantinúria e Urolitíase Obstrutiva por Xantina',
        frequency: 'common',
        mechanism: 'Bloqueio da xantina-oxidase gerando acúmulo a montante de xantina, a qual possui baixíssima solubilidade na urina e precipita em cristais e urólitos radiolucentes.',
        clinicalManagement:
          'Documentada em 13% a 50% dos cães em tratamento crônico. Realizar urinálise seriada e ultrassom trimestral. Ao detectar xantinúria, reforçar a restrição dietética de purinas, elevar a ingestão de água e considerar redução ou pausa da dose de alopurinol.',
      },
      {
        effect: 'Nefrocalcinose e Mineralização Renal Parenquimatosa',
        frequency: 'uncommon',
        mechanism: 'Precipitação intratubular e intersticial crônica de microcristais de xantina associada a nefrite intersticial secundária.',
        clinicalManagement:
          'Monitorar ultrassom renal com atenção a hiperecogenicidade medular ou cortical. Avaliar função renal (creatinina, SDMA) e proteinúria.',
      },
      {
        effect: 'Desconforto Gastrointestinal (Náusea, Vômito e Diarreia)',
        frequency: 'common',
        mechanism: 'Irritação direta da mucosa gástrica e modulação transitória da motilidade digestiva pelo princípio ativo.',
        clinicalManagement:
          'Fornecer o medicamento misturado a uma pequena porção de refeição ou logo após a alimentação para amenizar náuseas e vômitos.',
      },
      {
        effect: 'Elevação Assintomática de Enzimas Hepáticas (ALT, AST, FA)',
        frequency: 'uncommon',
        mechanism: 'Biotransformação hepática oxidativa intensa e reação hepatocelular transitória leve.',
        clinicalManagement:
          'Monitorar painel hepático semestralmente. Na vasta maioria dos casos é autolimitada e não exige suspensão a menos que acompanhada de hiperbilirrubinemia ou sinais clínicos de hepatopatia.',
      },
      {
        effect: 'Dermatite Esfoliativa, Eritema e Prurido (Especialmente Felinos)',
        frequency: 'rare',
        mechanism: 'Hipersensibilidade imunomediada induzida por metabólitos reativos do alopurinol.',
        clinicalManagement:
          'Suspender o fármaco imediatamente. Administrar anti-histamínicos ou suporte tópico conforme a gravidade das lesões.',
      },
      {
        effect: 'Neutropenia e Mielossupressão Transitória',
        frequency: 'rare',
        mechanism: 'Toxicidade medular idiossincrática reversível sobre linhagens granulocíticas.',
        clinicalManagement:
          'Monitorar hemograma completo semestralmente. Em caso de neutropenia confirmada, interromper a medicação e aguardar recuperação medular.',
      },
    ],
  },

  generalInfoData: {
    routesDetailed: [
      {
        route: 'Oral (VO)',
        technique:
          'Via padrão e exclusiva na clínica de pequenos animais. Pode ser administrado com ou sem alimentos, visto que estudos farmacocinéticos comprovam que a presença de alimento não altera a biodisponibilidade sistêmica. Recomenda-se oferecer junto com a refeição para minimizar êmese.',
        nursingCare:
          'Garantir a ingestão completa da cápsula ou comprimido. Confirmar que o paciente possui acesso permanente e ilimitado a água fresca e limpa.',
        limitations:
          'Inexistência de formulações industriais veterinárias aprovadas no Brasil, exigindo o emprego de apresentações humanas (100 mg e 300 mg) ou manipulação magistral personalizada.',
      },
    ],

    pharmacologicalClassification: {
      chemicalClass: 'Análogo de Purina / Derivado Pirazolopirimidina',
      chemicalClassDescription:
        'Composto heterocíclico bicíclico do tipo pirazolo[3,4-d]pirimidin-4-ona com fórmula molecular C5H4N4O e massa molecular de 136,11 g/mol, análogo estrutural isomérico da hipoxantina.',
      therapeuticClass: 'Inibidor da Xantina-Oxidase, Agente Antiurolítico e Leishmaniostático',
      therapeuticClassDescription:
        'Fármaco que inibe reversivelmente a síntese de ácido úrico no hospedeiro e atua como falso substrato de purina no parasito Leishmania, desregulando seu RNA e síntese proteica.',
      atcCode: 'M04AA01',
      receptorTargets: [
        'Xantina-Oxidoredutase / Xantina-Oxidase (XO/XOR do hospedeiro)',
        'Hipoxantina-Guanina Fosforribosiltransferase parasitária (HGPRT da Leishmania)',
        'Xantina Fosforribosiltransferase parasitária (XPRT)',
        'IMP-Desidrogenase e GMP-Redutase parasitárias',
      ],
      receptorsAndSites: [
        {
          name: 'Xantina-Oxidoredutase / Xantina-Oxidase (Hospedeiro)',
          type: 'Metaloenzima molibdênio-flavoenzima citosólica e endotelial',
          action: 'Inibição catalítica por mecanismo-dependente via alopurinol e oxipurinol',
          clinicalEffect:
            'Queda acentuada da biossíntese de urato no sangue e na urina com acúmulo concomitante de xantina e hipoxantina.',
        },
        {
          name: 'Via de Salvamento de Purinas (Leishmania spp.)',
          type: 'Complexo enzimático de incorporação de purinas parasitárias',
          action: 'Incorporação do falso análogo e geração de ribonucleotídeos atípicos de pirazolopirimidina',
          clinicalEffect:
            'Bloqueio da produção de nucleotídeos de adenina/guanina e síntese de RNA parasitário anormal, interrompendo a replicação amastigota.',
        },
      ],
      detailedTargets: [
        {
          target: 'Xantina-Oxidase Hepática e Endotelial',
          action: 'Inibição direta competitiva duradoura',
          clinicalSignificance:
            'Dissolução médica e prevenção secundária de urólitos de urato em cães hiperuricosúricos.',
        },
        {
          target: 'RNA Parasitário de Leishmania infantum',
          action: 'Incorporação de metabólitos ribosilados anormais',
          clinicalSignificance:
            'Efeito leishmaniostático com redução prolongada da carga parasitária tecidual e das lesões clínicas.',
        },
      ],
    },

    prescriptionType: {
      category: 'Receituário Simples (Uso Veterinário / Humano Extra-bula)',
      ordinanceOrLaw: 'Portaria SVS/MS nº 344/1998 (Não consta nas listas de controle especial A, B ou C1)',
      retentionRequired: false,
      guidelines:
        'Medicamento de venda sob prescrição médico-veterinária em receituário simples em uma via. Não requer Notificação de Receita nem Receita de Controle Especial pela Portaria 344/98 da Anvisa. No caso específico da Leishmaniose Visceral Canina no Brasil, a conduta clínica e prescritiva deve respeitar as normativas regulamentares conjuntas do MAPA e Ministério da Saúde relativas ao manejo terapêutico da LVC.',
    },

    speciesPeculiarities: [
      {
        species: 'dog',
        title: 'Presença de Uricase, Mutação SLC2A9 e Alta Suscetibilidade à Xantinúria',
        description:
          'Diferentemente dos seres humanos que não possuem uricase funcional, os cães normais convertem eficientemente o urato em alantoína solúvel. No entanto, cães homozigotos para a mutação autossômica recessiva do transportador SLC2A9 (como Dálmatas e Bulldogs Ingleses) não conseguem transportar o urato para dentro do hepatócito, desenvolvendo hiperuricosúria severa e propensão a urólitos de urato. O alopurinol fecha a produção de urato, mas gera grande acúmulo de xantina. Estudos em cães demonstram que a xantinúria surge com tempo mediano de 150 dias de terapia (Oliveira et al. 2025) e acomete até 13% a 50% dos animais sob tratamento crônico para leishmaniose, podendo causar cálculos de xantina e nefrocalcinose.',
        clinicalImplications:
          'Obrigatoriedade absoluta de instituir dieta restrita em purinas e estímulo à diurese (densidade urinária <= 1,020). Urinálises seriadas e ultrassonografia do trato urinário a cada 2 a 3 meses são indispensáveis para segurança.',
      },
      {
        species: 'cat',
        title: 'Ausência de Evidências em Urato e Maior Suscetibilidade a Hipersensibilidade na Leishmaniose',
        description:
          'Em gatos, o Consenso Internacional ACVIM (2016) adverte formalmente que não existem evidências clínicas de eficácia da dissolução de urato com alopurinol; a presença de urato em felinos deve levantar imediata suspeita de shunt portossistêmico. Na leishmaniose felina (FeL), os dados de eficácia são limitados a séries de casos descritivos (LeishVet 2024), observando-se maior predisposição a reações cutâneas graves (dermatite crostosa em cabeça e pescoço) e nefrite intersticial por hipersensibilidade com injúria renal aguda.',
        clinicalImplications:
          'Não utilizar alopurinol como terapia padrão para urato felino. Na leishmaniose felina, monitorar quinzenalmente o perfil renal e dermatológico.',
      },
    ],

    curiositiesAndHistory: [
      'Sintetizado originalmente em 1956 por George Hitchings e Gertrude Elion no laboratório Burroughs Wellcome como uma tentativa de desenvolver um fármaco antineoplásico para potencializar a 6-mercaptopurina no tratamento de leucemias.',
      'A observação de que o alopurinol inibia a degradação de purinas e reduzia drasticamente o ácido úrico levou ao seu redirecionamento histórico como o tratamento padrão-ouro mundial para a gota humana.',
      'O mecanismo antileishmania foi descoberto na década de 1970 quando pesquisadores demonstraram que hemoflagelados dependem obrigatoriamente de purinas exógenas e incorporam o alopurinol em seu próprio RNA.',
      'A constatação de que o alopurinol pode transformar urato em xantina representou um marco na urologia comparada: a xantina é um dos urólitos mais difíceis de dissolver clinicamente, exigindo prevenção rigorosa.',
      'Gertrude Elion e George Hitchings receberam o Prêmio Nobel de Fisiologia ou Medicina em 1988 pelas descobertas de princípios fundamentais da farmacoterapia que incluíram o alopurinol, a azatioprina e o aciclovir.',
    ],
  },

  practicalWeightTable: {
    standardDoseText:
      'Posologia orientativa de Alopurinol por faixa de peso e espécie para Leishmaniose Canina (dose LeishVet de 10 mg/kg q12h) e Dissolução de Urato Canino (dose ACVIM de 15 mg/kg q12h). Formulações magistrais veterinárias de 20 mg a 300 mg permitem precisão exata para portes pequenos e médios.',
    headers: [
      'Faixa de Peso Corporal',
      'Leishmaniose (10 mg/kg q12h)',
      'Dissolução Urato (15 mg/kg q12h)',
      'Apresentação Sugerida',
    ],
    rows: [
      {
        weight: '2 kg (Miniatura)',
        totalDose: '20 mg q12h',
        col1: '30 mg q12h',
        col2: 'Cápsula manipulada 20–30 mg ou 0,4–0,6 mL suspensão 50 mg/mL',
      },
      {
        weight: '5 kg (Pequeno)',
        totalDose: '50 mg q12h',
        col1: '75 mg q12h',
        col2: 'Cápsula manipulada 50–75 mg ou 1/2 comp. humano de 100 mg (leish)',
      },
      {
        weight: '10 kg (Pequeno/Médio)',
        totalDose: '100 mg q12h',
        col1: '150 mg q12h',
        col2: '1 comp. humano 100 mg (leish) ou cápsula manipulada 150 mg (urato)',
      },
      {
        weight: '15 kg (Médio)',
        totalDose: '150 mg q12h',
        col1: '225 mg q12h',
        col2: '1 e 1/2 comp. humano 100 mg ou cápsula manipulada 150–225 mg',
      },
      {
        weight: '20 kg (Médio/Grande)',
        totalDose: '200 mg q12h',
        col1: '300 mg q12h',
        col2: '2 comp. humanos 100 mg ou 1 comp. 300 mg (dissolução urato)',
      },
      {
        weight: '30 kg (Grande)',
        totalDose: '300 mg q12h',
        col1: '450 mg q12h',
        col2: '1 comp. humano 300 mg (leish) ou cápsula manipulada 450 mg (urato)',
      },
      {
        weight: '40 kg (Gigante)',
        totalDose: '400 mg q12h',
        col1: '600 mg q12h',
        col2: '4 comp. 100 mg ou 2 comp. humanos 300 mg (dissolução urato)',
      },
    ],
  },

  samplePrescriptionText:
    'USO VETERINÁRIO — RECEITUÁRIO SIMPLES (1 VIA)\\n\\n' +
    'IDENTIFICAÇÃO DO EMITENTE: Dr(a). [Nome Completo], Médico(a) Veterinário(a), CRMV-[UF] [Número]\\n' +
    'IDENTIFICAÇÃO DO TUTOR: [Nome do Tutor], CPF: [000.000.000-00], Endereço: [Endereço Completo]\\n' +
    'IDENTIFICAÇÃO DO PACIENTE: [Nome do Animal], Espécie: Canina, Raça: Dálmata, Peso: 20,0 kg\\n\\n' +
    'USO ORAL\\n' +
    '1. Alopurinol 300 mg ------------------------------------------------ 60 comprimidos\\n' +
    '   (Apresentação comercial humana ou manipulação veterinária palatável)\\n' +
    '   Posologia: Administrar 1 (um) comprimido por via oral a cada 12 horas, junto com a refeição, durante 4 semanas consecutivas, para dissolução médica de urólitos de urato.\\n\\n' +
    'ORIENTAÇÕES OBRIGATÓRIAS AO TUTOR:\\n' +
    '- O medicamento deve ser fornecido estritamente em conjunto com a dieta terapêutica de restrição de purinas prescrita para o paciente.\\n' +
    '- Jamais ofereça carnes vermelhas, miúdos, vísceras ou petiscos ricos em células, pois o uso de alopurinol sem dieta com baixa purina pode provocar cálculos de xantina.\\n' +
    '- Mantenha fontes de água limpa e fresca permanentemente disponíveis e estimule a ingestão hídrica abundante.\\n' +
    '- Caso o animal apresente esforço para urinar sem saída de urina, dor na barriga ou sangue na urina, suspenda a medicação e procure o hospital veterinário imediatamente.\\n' +
    '- Retorno obrigatório em 4 semanas para reavaliação de urinálise completa e ultrassonografia abdominal.',

  clinicalStudiesCommented: [
    {
      title: 'Bioavailability and pharmacokinetics of intravenously and orally administered allopurinol in healthy beagles',
      authorsYear: 'Bartges JW, Osborne CA, Felice LJ, et al. (1997)',
      journal: 'American Journal of Veterinary Research (AJVR)',
      studyDesign: 'Estudo farmacocinético experimental cruzado prospectivo',
      sampleSize: '6 cães Beagles adultos sadios avaliados com doses IV e orais',
      mainFindings: 'Demonstrou boa absorção oral do alopurinol, ausência de interferência clinicamente relevante do alimento sobre a AUC e eliminação não linear com existência de um platô/limiar farmacodinâmico acima do qual aumentos de dose não geram redução adicional na formação de urato.',
      clinicalTakeaway: 'Fundamenta a administração com alimentos para diminuir êmese e comprova que doses suprafisiológicas de alopurinol não trazem benefício clínico proporcional, aumentando apenas a toxicidade.',
      referenceId: 'ref-bartges-pk-1997',
    },
    {
      title: 'A randomised, blinded, placebo-controlled clinical trial with allopurinol in canine leishmaniosis',
      authorsYear: 'Koutinas AF, Saridomichelakis MN, Mylonakis ME, et al. (2001)',
      journal: 'Veterinary Parasitology',
      studyDesign: 'Ensaio clínico prospectivo, randomizado, duplo-cego e controlado por placebo (RCT Nível I)',
      sampleSize: '45 cães com leishmaniose clínica (37 tratados com alopurinol 10 mg/kg q12h e 8 com placebo)',
      mainFindings: 'O alopurinol em monoterapia por 4 meses promoveu melhora clínica expressiva, redução significativa dos escores de doença e queda da carga de amastigotas teciduais; contudo, a totalidade dos cães tratados permaneceu com PCR positiva em aspirado de medula óssea ao final do ensaio.',
      clinicalTakeaway: 'Evidência inequívoca de Nível I de que o alopurinol é um fármaco leishmaniostático com potente ação clínica e laboratorial, mas incapaz de atingir cura parasitológica estéril isoladamente.',
      referenceId: 'ref-koutinas-allopurinol-2001',
    },
    {
      title: 'Multicentric, controlled clinical study to evaluate effectiveness and safety of miltefosine and allopurinol for canine leishmaniosis',
      authorsYear: 'Miró G, Oliva G, Cruz I, et al. (2009)',
      journal: 'Veterinary Dermatology',
      studyDesign: 'Ensaio clínico prospectivo multicêntrico controlado',
      sampleSize: 'Cães com leishmaniose natural em múltiplos centros europeus',
      mainFindings: 'Comprovou que a combinação de miltefosina oral (2 mg/kg q24h por 28 dias) associada a alopurinol (10 mg/kg q12h por 7 meses) proporcionou redução marcante dos escores clínicos e da carga parasitária, exibindo eficácia e tolerabilidade estatisticamente comparáveis ao protocolo de antimoniato de meglumina + alopurinol.',
      clinicalTakeaway: 'Fornece validação científica para o protocolo combinado miltefosina + alopurinol consagrado nas diretrizes internacionais do LeishVet.',
      referenceId: 'ref-miro-miltefosine-2009',
    },
    {
      title: 'Adverse urinary effects of allopurinol in dogs with leishmaniasis',
      authorsYear: 'Torres M, Pastor J, Roura X, et al. (2016)',
      journal: 'Journal of Small Animal Practice (JSAP)',
      studyDesign: 'Estudo de coorte clínico observacional',
      sampleSize: '320 cães portadores de leishmaniose visceral sob terapia crônica com alopurinol',
      mainFindings: 'Identificou eventos adversos urinários em 13% dos cães (42 animais), todos apresentando cristalúria por xantina, dos quais 31% exibiam urolitíase concomitante a nefrocalcinose/mineralização renal, 26,2% mineralização renal e 21,4% urólitos de xantina puros.',
      clinicalTakeaway: 'Estudo seminal de farmacovigilância que comprova a alta relevância clínica da xantinúria como efeito adverso frequente do alopurinol, demandando monitoramento ultrassonográfico e urinário preventivo.',
      referenceId: 'ref-torres-xanthinuria-2016',
    },
    {
      title: 'Characterisation and evaluation of predisposing factors for the development of xanthinuria in dogs with leishmaniosis under allopurinol therapy',
      authorsYear: 'Oliveira BC, Silva AC, Fontes MM, et al. (2025)',
      journal: 'Parasites & Vectors',
      studyDesign: 'Estudo multicêntrico retrospectivo controlado pareado 1:1',
      sampleSize: '90 cães com leishmaniose sob alopurinol (45 com xantinúria e 45 controles pareados sem xantinúria)',
      mainFindings: 'O tempo mediano para o surgimento de xantinúria foi de 150 dias de terapia (amplitude interquartil de 31 a 455 dias). Os cães que desenvolveram xantinúria eram significativamente mais jovens (mediana de 4 anos versus 6 anos nos controles; P = 0,002).',
      clinicalTakeaway: 'Demonstra que a precipitação de xantina pode ocorrer precocemente nos primeiros meses de tratamento, reforçando que a urinálise seriada deve ser realizada precocemente e repetida de forma contínua.',
      referenceId: 'ref-oliveira-xanthinuria-2025',
    },
    {
      title: 'Allopurinol Resistance in Leishmania infantum from Dogs with Disease Relapse',
      authorsYear: 'Yasur-Landau D, Jaffe CL, David L, Baneth G. (2016)',
      journal: 'PLoS Neglected Tropical Diseases',
      studyDesign: 'Estudo parasitológico e fenotípico experimental in vitro e ex vivo',
      sampleSize: 'Isolados clínicos de Leishmania infantum obtidos de cães antes do tratamento e após recaída clínica',
      mainFindings: 'Isolados de cães que apresentaram recidiva clínica durante a terapia crônica exibiram sensibilidade significativamente reduzida ao alopurinol, com concentração inibitória média (IC50) de 996 mcg/mL em comparação a 200 mcg/mL antes do tratamento e 268 mcg/mL em animais responsivos (P = 0,01).',
      clinicalTakeaway: 'Comprova a seleção de resistência parasitária adquirida ao alopurinol em cães submetidos a ciclos prolongados repetidos, alertando contra a manutenção indefinida sem critérios de descontinuação.',
      referenceId: 'ref-yasur-landau-resistance-2016',
    },
  ],

  relatedDiseaseSlugs: [
    'leishmaniose-visceral-canina',
    'doenca-renal-cronica-caes-gatos',
    'doencas-trato-urinario-inferior-felino-dtuif',
  ],
};
