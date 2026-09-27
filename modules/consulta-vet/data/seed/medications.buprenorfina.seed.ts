import type { MedicationRecord } from '../../types/medication';

export const buprenorfinaMedicationsSeed: MedicationRecord[] = [
  {
    id: 'med-buprenorfina',
    slug: 'buprenorfina',
    title: 'Buprenorfina (Cloridrato de Buprenorfina)',
    activeIngredient: 'Cloridrato de Buprenorfina',
    pharmacologicClass:
      'Analgésico opioide de ação prolongada; agonista parcial do receptor µ-opioide e antagonista do receptor κ-opioide',
    species: ['dog', 'cat'],
    category: 'anestesia-dor',
    tags: [
      'Buprenorfina',
      'Cloridrato de Buprenorfina',
      'Opioide Agonista Parcial',
      'Vetergesic',
      'Simbadol',
      'Zorbium',
      'Restiva',
      'Via Transmucosa Oral (OTM)',
      'Analgesia Felina',
      'Controle Especial Lista A1',
      'Portaria MAPA 837/2025',
      'ISFM 2022',
      'AAHA 2022',
      'Dor Perioperatória',
    ],
    tradeNames: [
      'Vetergesic® Multidose Injetável 0,3 mg/mL (Ceva Saúde Animal — Uso Veterinário Oficial Internacional)',
      'Bupaq® / Buprecare® Injetável 0,3 mg/mL (Uso Veterinário Internacional)',
      'Simbadol® Injetável Concentrado 1,8 mg/mL para Gatos SC 24h (Zoetis — Uso Veterinário EUA)',
      'Zorbium® Solução Tópica Transdérmica 20 mg/mL para Gatos 96h (Elanco — Uso Veterinário EUA)',
      'Restiva® Adesivos Transdérmicos 5 µg/h, 10 µg/h e 20 µg/h (Mundipharma / Adium — Linha Humana)',
      'Transtec® Adesivos Transdérmicos 35 µg/h e 52,5 µg/h (Grünenthal — Linha Humana)',
      'Cloridrato de Buprenorfina Solução Injetável 0,3 mg/mL (Preparações Magistrais Veterinárias sob Notificação)',
    ],
    officialSiteUrl: 'https://www.gov.br/agricultura/pt-br',
    leafletUrl: 'https://www.noahcompendium.co.uk/?id=-448846',
    mechanismOfAction:
      'A buprenorfina é um fármaco analgésico opioide semissintético lipofílico derivado da tebaína e oripavina, estruturado com um substituinte volumoso N-ciclopropilmetil que confere propriedades físico-químicas e farmacodinâmicas singulares. Atua como agonista parcial de altíssima afinidade e dissociação extremamente lenta sobre os receptores µ-opioides (MOR) e como antagonista sobre os receptores κ-opioides (KOR) no sistema nervoso central e periférico. A ligação aos receptores µ ativa a cascata transmembrana de proteínas Gi/o inibitórias, bloqueando a adenilato ciclase intracelular e diminuindo os níveis de cAMP e a ativação da proteína quinase A (PKA). Simultaneamente, as subunidades beta-gama promovem a abertura de canais retificadores internos de potássio acoplados à proteína G (canais GIRK), provocando efluxo maciço de K+ e hiperpolarização da membrana pós-sináptica, o que reduz substancialmente a excitabilidade dos neurônios nociceptivos. No terminal pré-sináptico, a buprenorfina inibe canais de cálcio voltagem-dependentes (especialmente dos tipos N e P/Q), suprimindo o influxo de Ca2+ necessário para a exocitose de vesículas sinápticas contendo neurotransmissores excitatórios da dor (como glutamato, substância P e peptídeo relacionado ao gene da calcitonina - CGRP) no corno dorsal da medula espinhal, na substância cinzenta periaquedutal e nas vias ascendentes espinotalâmicas. Por ser um agonista parcial, sua eficácia intrínseca máxima é submáxima quando comparada a agonistas µ plenos (como metadona, morfina ou fentanil), estabelecendo um teto farmacodinâmico no qual doses progressivamente maiores produzem aumento na duração do efeito, mas não ampliam indefinidamente a intensidade da antinocicepção. Sua dissociação do receptor µ é notavelmente lenta, resultando em marcada histerese farmacocinética-farmacodinâmica, na qual o bloqueio antinociceptivo persiste ativo durante 6 a 8 horas (ou até 72-96 horas em formulações depot), mesmo após as concentrações plasmáticas declinarem abaixo dos limites basais de detecção.',
    plainLanguageSummary:
      'A buprenorfina é um analgésico opioide de ação prolongada e alta afinidade pelos receptores de dor, amplamente consagrado no controle da dor cirúrgica leve a moderada em cães e gatos, como em castrações, procedimentos odontológicos e cirurgias de tecidos moles. Nos felinos, destaca-se pela excelente absorção pela mucosa oral (bochecha ou sob a língua), permitindo analgesia domiciliar e hospitalar sem o estresse de injeções ou necessidade de engolir comprimidos. Apresenta excelente perfil de segurança com mínimo impacto respiratório; contudo, por ser um agonista parcial com efeito teto, não é indicada como analgésico único em dores extremas ou traumas graves, devendo-se evitar a via subcutânea com a solução convencional de 0,3 mg/mL em gatos devido à absorção irregular.',

    indications: [
      'Analgesia perioperatória e pós-operatória para dor cirúrgica aguda de intensidade leve a moderada em cães e gatos (ovariohisterectomia, orquiectomia, cirurgias cutâneas e reconstrutivas, pequenas ressecções de massas e cirurgias de tecidos moles).',
      'Analgesia pós-operatória ambulatorial e domiciliar em felinos através da via oral transmucosa (OTM), viabilizando analgesia consistente sem estresse de contenção ou injeções domiciliares.',
      'Analgesia multimodal para afecções e cirurgias odontológicas em cães e gatos (extrações dentárias simples e múltiplas, gengivoplastias, abscesso periapical), combinada a bloqueios locorregionais e AINEs.',
      'Premedicação anestésica (MPA) em pequenos animais associada a tranquilizantes e sedativos (como acepromazina ou agonistas alfa-2 adrenérgicos: dexmedetomidina/medetomidina), reduzindo o estresse e a concentração alveolar mínima (CAM) dos anestésicos inalatórios.',
      'Analgesia neuroaxial (epidural) e perineural combinada a anestésicos locais (bupivacaína ou lidocaína) para cirurgias articulares (ex.: joelho/artroplastia) ou bloqueios de nervos periféricos (ex.: infraorbitário), prolongando a duração da analgesia regional por até 24 a 48 horas.',
      'Infusão contínua intravenosa (CRI) em cães hospitalizados para analgesia intraoperatória e pós-operatória de cirurgias abdominais e tecidos moles de média agressividade.',
    ],

    contraindications: [
      'Hipersensibilidade conhecida ao cloridrato de buprenorfina ou a qualquer componente presente nas formulações comerciais.',
      'Monoterapia isolada em pacientes com dor aguda intensa, lancinante e severa (politraumatismo grave, cirurgias ortopédicas de grande porte, osteossínteses extensas, toracotomias abertas e amputações), nas quais agonistas mu plenos (metadona, morfina, fentanil) são mandatários.',
      'Depressão respiratória grave pré-existente, hipoventilação alveolar descompensada ou obstrução aguda de vias aéreas superiores (como em crises graves de síndrome braquicefálica descompensada).',
      'Traumatismo cranioencefálico com hipertensão intracraniana descompensada ou coma (a hipoventilação induz hipercapnia arterial, que desencadeia vasodilatação cerebral reflexa e elevação perigosa da pressão intracraniana).',
      'Administração pré-operatória imediata em fêmeas gestantes submetidas a cesariana de emergência (contraindicação explícita em bulas regulatórias internacionais devido ao risco grave de depressão respiratória neonatal nos filhotes recém-nascidos).',
      'Pacientes picados por escorpiões do gênero Centruroides (contraindicação toxicológica formal dos opioides pela potencialização da letalidade do veneno).',
    ],

    cautions: [
      'Desencorajamento formal da via subcutânea (SC) convencional: em cães e gatos hospitalizados, a solução convencional injetável de 0,3 mg/mL administrada por via subcutânea apresenta absorção errática, início imprevisível e alta taxa de necessidade de resgate analgésico precoce; o consenso internacional ISFM 2022 e o BSAVA recomendam utilizar preferencialmente as vias IV, IM ou OTM.',
      'Vigilância de hipertermia pós-operatória felina: os opioides podem causar desregulação transitória do centro termorregulador hipotalâmico em gatos, resultando em hipertermia pós-cirúrgica em até 28% dos felinos; monitorar a temperatura retal periodicamente e remover fontes ativas de calor se ultrapassar 39,5 °C.',
      'Resistência à reversão por naloxona: em virtude da dissociação extremamente lenta e da altíssima afinidade pelo receptor mu, doses usuais de naloxona (0,02 a 0,04 mg/kg) podem não reverter completamente a depressão da buprenorfina, necessitando de doses repetidas ou infusão contínua aliadas a ventilação mecânica assistida com oxigênio.',
      'Ineficiência da via oral transmucosa (OTM) em cães: a mucosa oral canina absorve a buprenorfina com eficiência muito inferior e mais errática que a dos felinos (biodisponibilidade bucal de cerca de 35% a 50%, comparada a 5% se engolida), exigindo doses significativamente maiores para resposta clínica satisfatória; não extrapolar a conduta OTM felina diretamente para a espécie canina.',
      'Cautela em hepatopatas graves: a buprenorfina sofre intensa depuração metabólica hepatointestinal e eliminação biliar; em pacientes com insuficiência hepática descompensada com ascite ou icterícia, o clearance é diminuído e a duração da sedação pode prolongar-se expressivamente.',
      'Segurança e conduta no resgate com agonistas plenos: caso o paciente receba buprenorfina e persista com escores de dor elevados nas escalas validadas (Glasgow ou Feline Grimace Scale), não se deve postergar a analgesia; um agonista mu pleno (como metadona ou fentanil) pode ser introduzido sem demora como resgate, sob titulação clínica individual.',
    ],

    adverseEffects: [
      'Sedação leve a moderada (efeito esperado e clinicamente desejável no período pós-operatório imediato).',
      'Midríase pupilar bilateral pronunciada em gatos (efeito central autonômico característico e autolimitado).',
      'Alterações comportamentais euforizantes em gatos (ronronar compulsivo, fricção excessiva da cabeça contra superfícies, hiperexcitabilidade exploratória, vocalização branda ou pacing).',
      'Hipertermia pós-operatória em felinos (geralmente surge algumas horas após o procedimento cirúrgico, regredindo com medidas físicas passivas de resfriamento).',
      'Hipotermia em cães (secundária à redução do tônus motor e alteração do limiar de termorregulação central durante o repouso).',
      'Bradicardia sinusal de origem vagal e hipotensão arterial discreta (geralmente responsivas a anticolinérgicos se acompanhadas de comprometimento hemodinâmico).',
      'Náusea, salivação transitória e êmese leve (significativamente menos frequentes que com morfina ou hidromorfona).',
      'Depressão respiratória com hipoventilação alveolar (rara nas faixas posológicas recomendadas, porém com potencial de gravidade em animais debilitados, sob anestesia geral ou com doença pulmonar obstrutiva).',
      'Retenção urinária transitória e discreta diminuição da motilidade gastrointestinal em cursos de administração contínua repetida.',
    ],

    routes: ['oral', 'iv', 'im'],

    doses: [
      {
        id: 'dose-buprenorfina-gato-pos-op',
        species: 'cat',
        indication:
          'Dor pós-operatória aguda leve a moderada em gatos (OHE, orquiectomia, tecidos moles e odontologia) - Consenso ISFM 2022',
        doseMin: 0.02,
        doseMax: 0.04,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral Transmucosa (OTM), Intravenosa (IV) ou Intramuscular (IM)',
        frequency: 'A cada 6 a 8 horas (q6-8h)',
        duration: '1 a 5 dias conforme avaliação diária da dor',
        notes:
          'Dose prática inicial recomendada pelo ISFM e compêndios: 0,02 mg/kg q6-8h. Em dores mais pronunciadas, titular até 0,03 a 0,04 mg/kg. Na via OTM, depositar o pequeno volume diretamente na bochecha ou sob a língua sem forçar deglutição e sem misturar no alimento. ATENÇÃO: a via subcutânea (SC) da apresentação convencional 0,3 mg/mL NÃO é recomendada pelo ISFM por apresentar absorção errática.',
        clinicalContext:
          'Opioide de eleição na rotina felina para dor leve a moderada; excelente tolerância e possibilidade de manutenção domiciliar sem estresse de injeções.',
        monitoring:
          'Escala de expressão facial felina (Feline Grimace Scale) ou escala composta de Glasgow (CMPS-Felines), temperatura corporal retal (vigilância de hipertermia felina), padrão respiratório e apetite.',
        calculatorEnabled: true,
        referenceIds: ['isfm-acute-pain-guidelines-2022', 'plumb-buprenorphine-10ed', 'giordano-2010-buprenorphine-routes'],
        evidenceLevel: 'Diretriz de Consenso Internacional Padrão-Ouro ISFM 2022 e Ensaio Clínico Randomizado Nível 1b',
      },
      {
        id: 'dose-buprenorfina-cao-pos-op',
        species: 'dog',
        indication:
          'Dor pós-operatória aguda leve a moderada e trauma tecidual menor em cães',
        doseMin: 0.01,
        doseMax: 0.02,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Intravenosa (IV) ou Intramuscular (IM)',
        frequency: 'A cada 6 a 8 horas (q6-8h)',
        duration: '1 a 3 dias pós-operatórios',
        notes:
          'Dose habitual de referência: 0,02 mg/kg IV ou IM a cada 6 a 8 horas (faixa de 0,01 a 0,02 mg/kg). As vias IV e IM são altamente previsíveis em cães. A via oral transmucosa (OTM) no cão tem biodisponibilidade inferior e requer doses consideravelmente maiores (0,03 a 0,12 mg/kg) com menor consistência analgésica.',
        clinicalContext:
          'Excelente para cirurgias eletivas não ortopédicas de grande porte, integrado a protocolos de analgesia multimodal preventiva (associado a AINEs e anestesia local).',
        monitoring:
          'Escala de dor composta de Glasgow modificada para cães (CMPS-SF), frequência cardíaca, frequência respiratória e temperatura corporal (vigilância de hipotermia).',
        calculatorEnabled: true,
        referenceIds: ['plumb-buprenorphine-10ed', 'bsava-buprenorphine-10ed', 'lumb-jones-anesthesia-6ed'],
        evidenceLevel: 'Compêndios Padrão-Ouro Farmacológico Plumb 10ª ed., BSAVA 10ª ed. e Lumb & Jones 6ª ed.',
      },
      {
        id: 'dose-buprenorfina-mpa-cao-gato',
        species: 'both',
        indication:
          'Premedicação anestésica (MPA) balanceada e redução da CAM de anestésicos inalatórios',
        doseMin: 0.01,
        doseMax: 0.02,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Intravenosa (IV) ou Intramuscular (IM)',
        frequency: 'Dose única na indução pré-cirúrgica (30 a 45 min antes do procedimento)',
        duration: 'Dose pré-anestésica única',
        notes:
          'Geralmente associada a fenotiazínicos (acepromazina 0,01 a 0,03 mg/kg) ou agonistas alfa-2 adrenérgicos (dexmedetomidina 1 a 3 mcg/kg). Promove sedação suave e reduz a dose requerida de anestésicos inalatórios (CAM do isoflurano) e de indutores venosos (propofol/alfaxalona). Administrar cerca de 30 a 45 minutos antes da indução devido ao tempo necessário para início do pico analgésico.',
        clinicalContext:
          'Recomendado quando a dor pós-operatória prevista for de intensidade leve a moderada. Se o procedimento cirúrgico envolver dor severa, optar preferencialmente por metadona.',
        monitoring:
          'Frequência respiratória, SpO2, pressão arterial invasiva ou oscilométrica e profundidade do plano anestésico.',
        calculatorEnabled: true,
        referenceIds: ['bsava-buprenorphine-10ed', 'lumb-jones-anesthesia-6ed'],
        evidenceLevel: 'Compêndios Internacionais de Anestesia Veterinária BSAVA e Lumb & Jones',
      },
      {
        id: 'dose-buprenorfina-cri-cao',
        species: 'dog',
        indication:
          'Infusão contínua intravenosa (CRI) intra e pós-operatória em cães para dor moderada',
        doseMin: 0.0025,
        doseMax: 0.0025,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Intravenosa Contínua (IV CRI)',
        frequency: 'Infusão contínua horária (mg/kg/h)',
        duration: '6 a 12 horas pós-operatórias',
        notes:
          'Protocolo baseado em estudos prospectivos (Lumb & Jones 6ª ed.): administrar bólus de ataque de 0,015 mg/kg IV lento, seguido imediatamente de taxa de infusão contínua de 0,0025 mg/kg/h IV (equivalente a 2,5 mcg/kg/h ou 0,0417 mcg/kg/min). Diluir em solução fisiológica 0,9% com bomba de infusão volumétrica de seringa.',
        clinicalContext:
          'Alternativa quando agonistas plenos como fentanil não estão disponíveis para CRI hospitalar em procedimentos de dor intermediária.',
        monitoring:
          'Parâmetros ventilatórios (FR, capnografia ETCO2), frequência cardíaca e pressão arterial média contínua.',
        calculatorEnabled: false,
        referenceIds: ['lumb-jones-anesthesia-6ed', 'plumb-buprenorphine-10ed'],
        evidenceLevel: 'Estudos Clínicos de Farmacocinética e Lumb & Jones 6ª ed.',
      },
      {
        id: 'dose-buprenorfina-simbadol-gatos',
        species: 'cat',
        indication:
          'Formulação concentrada de liberação estendida para felinos (Simbadol® 1,8 mg/mL) - Referência Internacional',
        doseMin: 0.24,
        doseMax: 0.24,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Subcutânea (SC)',
        frequency: 'A cada 24 horas (q24h)',
        duration: 'Até 3 dias consecutivos (1 dose diária por no máximo 72 horas de cobertura)',
        notes:
          'NOTA DE SEGURANÇA: Esta dose (0,24 mg/kg) é 12 vezes superior à dose convencional e aplica-se EXCLUSIVAMENTE à apresentação específica concentrada Simbadol® (1,8 mg/mL) aprovada pela FDA nos EUA. NUNCA aplicar a formulação comum de 0,3 mg/mL nessa dosagem. Administrar a primeira dose cerca de 1 hora antes da cirurgia.',
        clinicalContext:
          'Desenvolvida para proporcionar 24 a 72 horas de analgesia contínua sem necessidade de injeções repetidas ou manipulação estressante em gatos.',
        monitoring:
          'Temperatura corporal retal, pupilas, nível de sedação e comportamento.',
        calculatorEnabled: false,
        referenceIds: ['plumb-buprenorphine-10ed', 'watanabe-2020-simbadol-dental'],
        evidenceLevel: 'Aprovação Regulatória FDA e Ensaios Clínicos Randomizados Nível 1b',
      },
    ],

    presentations: [
      {
        id: 'pres-buprenorfina-inj-03mg-ml',
        label: 'Cloridrato de Buprenorfina Solução Injetável 0,3 mg/mL (Vetergesic / Preparações Magistrais)',
        form: 'Solução injetável estéril translúcida em frasco-ampola ou ampola de vidro',
        concentrationValue: 0.3,
        concentrationUnit: 'mg/mL',
        packInfo: 'Ampolas de 1 mL (sem conservante) ou frascos multidose de 10 mL (com conservante clorocresol)',
        route: 'Injetável (IV, IM) ou Oral Transmucosa (OTM em gatos)',
        scoringInfo: 'Líquido para aspiração em seringa de insulina ou tuberculina graduada (0,0667 mL/kg fornece 0,02 mg/kg)',
        channel: 'veterinary',
      },
      {
        id: 'pres-buprenorfina-simbadol-18mg-ml',
        label: 'Simbadol® 1,8 mg/mL Injetável para Gatos SC (Zoetis — Referência Internacional EUA)',
        form: 'Solução injetável concentrada estéril',
        concentrationValue: 1.8,
        concentrationUnit: 'mg/mL',
        packInfo: 'Frasco multidose de 10 mL',
        route: 'Subcutânea (SC)',
        scoringInfo: 'Uso exclusivo em gatos para analgesia de 24h a 72h (dose de 0,24 mg/kg = 0,133 mL/kg)',
        channel: 'veterinary',
      },
      {
        id: 'pres-buprenorfina-adesivo-restiva-5mcg-h',
        label: 'Restiva® Adesivo Transdérmico 5 µg/h (Mundipharma / Adium — Linha Humana)',
        form: 'Sistema transdérmico matricial polimérico de liberação controlada por 7 dias',
        concentrationValue: 5,
        concentrationUnit: 'mcg/h',
        packInfo: 'Caixa com 2 ou 4 envelopes com adesivos de 5 mg (taxa de liberação 5 mcg/h)',
        route: 'Transdérmica tópica (adesivo aplicado em pele tricotomizada)',
        scoringInfo: 'Dispensado em farmácias humanas mediante Receita de Controle Especial em 2 vias brancas',
        channel: 'human_pharmacy',
      },
      {
        id: 'pres-buprenorfina-adesivo-restiva-10mcg-h',
        label: 'Restiva® Adesivo Transdérmico 10 µg/h (Mundipharma / Adium — Linha Humana)',
        form: 'Sistema transdérmico matricial polimérico de liberação contínua por 7 dias',
        concentrationValue: 10,
        concentrationUnit: 'mcg/h',
        packInfo: 'Caixa com 2 ou 4 envelopes com adesivos de 10 mg (taxa de liberação 10 mcg/h)',
        route: 'Transdérmica tópica',
        scoringInfo: 'Dispensado em farmácias humanas mediante Receita de Controle Especial em 2 vias brancas',
        channel: 'human_pharmacy',
      },
      {
        id: 'pres-buprenorfina-adesivo-restiva-20mcg-h',
        label: 'Restiva® Adesivo Transdérmico 20 µg/h (Mundipharma / Adium — Linha Humana)',
        form: 'Sistema transdérmico matricial polimérico de liberação contínua por 7 dias',
        concentrationValue: 20,
        concentrationUnit: 'mcg/h',
        packInfo: 'Caixa com 2 ou 4 envelopes com adesivos de 20 mg (taxa de liberação 20 mcg/h)',
        route: 'Transdérmica tópica',
        scoringInfo: 'Dispensado em farmácias humanas mediante Receita de Controle Especial em 2 vias brancas',
        channel: 'human_pharmacy',
      },
    ],

    // 1. Pilares Terapêuticos Fundamentais
    pillars: [
      {
        title: 'Alta Afinidade Mu e Dissociação Lenta',
        icon: 'Lock',
        desc: 'Apresenta afinidade extraordinária pelo receptor µ-opioide com cinética de dissociação extremamente vagarosa, permitindo que a ocupação receptoral e a analgesia persistam ativas por 6 a 8 horas, mesmo com concentrações séricas baixas.',
      },
      {
        title: 'Agonismo Parcial com Teto Analgésico',
        icon: 'ShieldCheck',
        desc: 'Promove excelente eficácia antinociceptiva para dor leve a moderada com menor sedação e reduzida depressão respiratória. Contudo, exibe um teto analgésico intrínseco, não devendo ser utilizada como monoterapia para dores agudas intensas.',
      },
      {
        title: 'Alta Lipofilicidade e Absorção Transmucosa Oral (OTM)',
        icon: 'Sparkles',
        desc: 'A elevada lipossolubilidade e o pH oral discretamente alcalino dos felinos favorecem a absorção direta pela mucosa bucal e sublingual, conferindo uma rota de analgesia ambulatorial e domiciliar prática sem a necessidade de injeções repetidas.',
      },
      {
        title: 'Marcada Histerese Farmacodinâmica',
        icon: 'Clock',
        desc: 'A concentração plasmática do fármaco não se correlaciona linearmente com a intensidade da analgesia em tempo real. Por essa razão, ajustes posológicos devem ser guiados exclusivamente por escalas clínicas de dor, e nunca por dosagem sérica (TDM).',
      },
    ],

    quickSummaryHighlights: [
      'Opioide agonista parcial de receptor mu (MOR)',
      'Antagonista de receptores kappa (KOR)',
      'Duração clínica prolongada de 6 a 8 horas',
      'Via oral transmucosa (OTM) excelente em felinos',
      'Evitar via subcutânea da formulação comum 0,3 mg/mL',
      'Teto analgésico: não substitui metadona em dor severa',
      'Resgate com agonista mu pleno é permitido e seguro',
      'Risco de hipertermia pós-operatória em até 28% dos gatos',
      'Naloxona pode não reverter completamente em superdose',
      'Controle Especial Lista A1 (Portaria MAPA 837/2025)',
      'Adesivos Restiva dispensados em 2 vias brancas',
    ],

    // 2. Indicações Rápidas
    quickIndications: [
      {
        condition: 'Dor Pós-Operatória Leve a Moderada em Felinos (ISFM)',
        species: 'cat',
        doseSummary: '0,02 a 0,04 mg/kg IV, IM ou OTM a cada 6 a 8 horas',
        route: 'Oral Transmucosa (OTM), IV ou IM',
        duration: '1 a 5 dias',
        clinicalContext:
          'Protocolo de escolha para castrações, procedimentos de tecidos moles e odontologia felina, associado a AINEs.',
      },
      {
        condition: 'Dor Cirúrgica Leve a Moderada em Cães',
        species: 'dog',
        doseSummary: '0,01 a 0,02 mg/kg IV ou IM a cada 6 a 8 horas',
        route: 'Intravenosa (IV) ou Intramuscular (IM)',
        duration: '1 a 3 dias',
        clinicalContext:
          'Excelente analgesia perioperatória em cães com alta previsibilidade pelas vias parenterais.',
      },
      {
        condition: 'Premedicação Anestésica (MPA) Balanceada',
        species: 'both',
        doseSummary: '0,01 a 0,02 mg/kg IV ou IM com acepromazina ou dexmedetomidina',
        route: 'Injetável (IV ou IM)',
        duration: 'Dose pré-anestésica única',
        clinicalContext:
          'Promove sedação suave, estabilidade cardiovascular e redução importante da CAM dos anestésicos inalatórios.',
      },
      {
        condition: 'Analgesia Neuroaxial / Perineural Adjuvante',
        species: 'both',
        doseSummary: '0,003 a 0,005 mg/kg combinado a bupivacaína 0,5%',
        route: 'Epidural ou Bloqueio Perineural',
        duration: 'Dose única intraoperatória',
        clinicalContext:
          'Estende a analgesia cirúrgica regional por 24 a 48 horas em cirurgias ortopédicas de membros pélvicos e face.',
      },
    ],

    // 3. Indicações Detalhadas
    detailedIndications: [
      {
        id: 'ind-buprenorfina-felinos-posop',
        indication: 'Analgesia cirúrgica pós-operatória aguda em felinos (ISFM 2022)',
        clinicalContext:
          'A dor aguda pós-operatória decorrente de cirurgias eletivas (como ovariosalpingohisterectomia, orquiectomia) ou procedimentos odontológicos em felinos demanda agentes com alta segurança hemodinâmica, baixa emetogenia e possibilidade de manejo estendido sem estresse de contenção. A buprenorfina atua bloqueando a sensibilização central e a transmissão nociceptiva espinhal no corno dorsal medular, garantindo conforto excelente dentro de estratégias multimodais.',
        species: 'cat',
        dose: '0,02 a 0,04 mg/kg IV, IM ou OTM a cada 6 a 8 horas',
        route: 'Oral Transmucosa (OTM), Intravenosa (IV) ou Intramuscular (IM)',
        frequency: 'A cada 6 a 8 horas (q6-8h)',
        duration: '1 a 5 dias pós-cirúrgicos conforme escalas de dor',
        mechanismOfAction:
          'Ativação parcial potente dos receptores µ-opioides neuronais com inibição de adenilato ciclase, bloqueio pré-sináptico de canais de cálcio voltagem-dependentes (inibindo a liberação de glutamato e substância P) e hiperpolarização pós-sináptica por abertura de canais de potássio GIRK.',
        clinicalRationale:
          'O Consenso Internacional ISFM 2022 classifica a buprenorfina como fármaco de referência para dor aguda leve a moderada em felinos. A via OTM evita injeções domiciliares repetidas pelo tutor. Entretanto, a formulação convencional injetável 0,3 mg/mL NÃO deve ser administrada por via subcutânea (SC), pois estudos clínicos controlados (Giordano et al., 2010) demonstraram que a absorção SC é errática e resulta em taxa significativamente maior de falha analgésica precoce.',
        monitoring:
          'Avaliação regular da dor utilizando a Escala de Expressão Facial Felina (Feline Grimace Scale) ou escala composta de Glasgow (CMPS-Felines). Monitorar temperatura corporal retal a cada 4 horas no dia pós-cirúrgico para detecção de hipertermia induzida por opioides (observada em até 28% dos felinos).',
        referenceIds: ['isfm-acute-pain-guidelines-2022', 'giordano-2010-buprenorphine-routes', 'plumb-buprenorphine-10ed'],
        evidenceLevel: 'Diretriz de Consenso Internacional Padrão-Ouro ISFM 2022 e Ensaios Randomizados Nível 1b',
      },
      {
        id: 'ind-buprenorfina-caes-posop',
        indication: 'Analgesia pós-operatória e pré-anestesia em cães para procedimentos de dor leve a moderada',
        clinicalContext:
          'Em cães submetidos a cirurgias de tecidos moles, herniorrafias, mastectomias parciais e intervenções odontológicas, a buprenorfina proporciona analgesia confiável associada a sedação leve e mínima depressão cardiovascular ou respiratória quando comparada a agonistas plenos em altas doses. Não induz vômitos profusos na frequência vista com morfina.',
        species: 'dog',
        dose: '0,01 a 0,02 mg/kg IV ou IM a cada 6 a 8 horas',
        route: 'Intravenosa (IV) ou Intramuscular (IM)',
        frequency: 'A cada 6 a 8 horas',
        duration: '24 a 72 horas pós-operatórias',
        mechanismOfAction:
          'Ligação aos receptores µ no tronco encefálico e corno dorsal espinhal, suprimindo o processamento ascendente dos estímulos nociceptivos periféricos.',
        clinicalRationale:
          'As vias IV e IM oferecem biodisponibilidade e cinética previsíveis no cão. Ao contrário dos felinos, a via transmucosa bucal (OTM) no cão apresenta biodisponibilidade reduzida e irregular (~35-50% vs 5% engolida), exigindo doses muito maiores para resultados consistentes. Em casos de dor severa inesperada, um agonista µ pleno (metadona ou fentanil) pode ser introduzido sem demora como terapia de resgate sob monitoramento.',
        monitoring:
          'Escala de dor composta de Glasgow modificada para cães (CMPS-SF), frequência respiratória, frequência cardíaca e pressão arterial média. Monitorar temperatura corporal para prevenir hipotermia.',
        referenceIds: ['plumb-buprenorphine-10ed', 'bsava-buprenorphine-10ed', 'lumb-jones-anesthesia-6ed'],
        evidenceLevel: 'Compêndio Farmacológico Padrão-Ouro Plumb 10ª ed. e Consenso BSAVA',
      },
      {
        id: 'ind-buprenorfina-bloqueios-adjuvante',
        indication: 'Adjuvante neuroaxial (epidural) e perineural para analgesia cirúrgica estendida',
        clinicalContext:
          'A introdução de opioides lipofílicos no espaço epidural ou em bloqueios perineurais de nervos periféricos atua diretamente sobre receptores opioides pré e pós-sinápticos localizados no corno dorsal medular ou nas terminações nervosas aferentes primárias, bloqueando a transmissão nociceptiva espinhal com mínimos efeitos colaterais sistêmicos.',
        species: 'both',
        dose: '0,003 a 0,005 mg/kg associada a bupivacaína 0,5% (ou 0,25%)',
        route: 'Epidural lombossacra ou Bloqueio Perineural (ex.: infraorbitário, ciático-femoral)',
        frequency: 'Dose única na indução pré-cirúrgica',
        duration: 'Efeito analgésico estendido por 24 a 48 horas pós-operatórias',
        mechanismOfAction:
          'Difusão local através das bainhas meningoperineurais e ligação direta aos receptores µ opioides periféricos e centrais, inibindo a liberação de neuropeptídeos pró-nociceptivos.',
        clinicalRationale:
          'Estudos clínicos em cães submetidos a cirurgias articulares (artroplastia de joelho) comprovaram que a adição de buprenorfina à bupivacaína epidural produziu analgesia duradoura de até 24 horas. Em bloqueios infraorbitários para cirurgias bucomaxilofaciais, promoveu economia expressiva de anestésico inalatório e estendeu a analgesia pós-cirúrgica de 48 para até 96 horas.',
        monitoring:
          'Função motora dos membros pélvicos (se epidural), retenção urinária (esvaziamento vesical), escore de dor pós-operatório e reflexo palpebral/sensibilidade regional.',
        referenceIds: ['plumb-buprenorphine-10ed', 'lumb-jones-anesthesia-6ed'],
        evidenceLevel: 'Ensaios Clínicos Controlados em Pequenos Animais e Lumb & Jones 6ª ed.',
      },
    ],

    // 4. Farmacocinética Comparativa
    pharmacokineticsData: {
      absorption:
        'A buprenorfina exibe absorção condicionada criticamente pela via de administração e pela espécie animal. Em cães e gatos, a administração intravenosa (IV) confere 100% de biodisponibilidade sistêmica, com sedação perceptível em 15 minutos e analgesia consolidada em 30 minutos, atingindo pico clínico entre 1 e 1,5 horas. A absorção intramuscular (IM) é rápida e altamente previsível em ambas as espécies. Em felinos, a via oral transmucosa (OTM) é viável e clinicamente muito eficaz: o pH salivar discretamente alcalino do gato favorece a fração não ionizada da molécula que, aliada à sua altíssima lipofilicidade (LogP ~4,5 a 5,0), é absorvida de forma direta através da mucosa bucal e sublingual para os capilares sistêmicos, contornando a inativação pré-sistêmica de primeira passagem hepática (biodisponibilidade OTM média de 20% a 50%, podendo variar se o animal deglutir o volume). Em cães, a via OTM é substancialmente menos eficiente (biodisponibilidade bucal de aproximadamente 35% a 50% vs cerca de 5% se engolida), exigindo doses muito maiores para produzir concentrações analgésicas. ALERTA CRÍTICO DE ABSORÇÃO SUBCUTÂNEA: a formulação injetável convencional de 0,3 mg/mL por via SC possui absorção lenta, errática e imprevisível em cães e gatos, resultando em concentrações plasmáticas subterapêuticas e falha analgésica documentada por ensaios clínicos controlados. Formulações específicas concentradas de depósito (como Simbadol 1,8 mg/mL nos EUA) possuem matriz desenvolvida para liberação lenta e absorção sustentada por 24 horas quando aplicadas por via SC.',
      distribution:
        'Apresenta volume de distribuição aparente no estado de equilíbrio (Vdss) extremamente amplo (cerca de 3,5 a 4,7 L/kg em cães e de 3,0 a 8,0 L/kg em gatos), refletindo sua acentuada lipossolubilidade e extraordinária capacidade de penetração tecidual extravascular para além do compartimento plasmático. A taxa de ligação a proteínas plasmáticas é muito alta (estimada classicamente entre 95% e 98%), ligando-se predominantemente a globulinas e alfa-glicoproteínas ácidas, além da albumina. Atravessa prontamente a barreira hematoencefálica e a barreira placentária, concentrando-se no encéfalo, parênquima pulmonar, fígado e trato gastrointestinal. Apresenta lenta taxa de dissociação do receptor µ-opioide central, estabelecendo acentuada histerese concentração-efeito: a analgesia antinociceptiva persiste por 6 a 8 horas (ou mais) mesmo após o declínio das concentrações plasmáticas para níveis próximos ao limite de quantificação.',
      metabolism:
        'A biotransformação ocorre primariamente na parede intestinal e no fígado através de reações de fase I e fase II. A via de fase I compreende a N-desalquilação oxidativa mediada predominantemente pelo citocromo P450 (isoenzima CYP3A4/CYP3A), formando o metabólito farmacologicamente ativo norbuprenorfina (que exibe cerca de 10% a 25% da atividade agonista intrínseca da molécula-mãe). Subsequentemente, tanto a buprenorfina inalterada quanto a norbuprenorfina passam por reações de fase II de conjugação com ácido glicurônico (glucuronidação) por ação de enzimas UDP-glicuronosiltransferases (UGT). Embora a espécie felina possua deficiências genéticas bem descritas na glucuronidação de certos compostos fenólicos simples, a via de conjugação glicurônica da buprenorfina é perfeitamente funcional e constitui via metabólica eficaz em gatos.',
      elimination:
        'A depuração corporal total é relativamente elevada em ambas as espécies: clearance plasmático de aproximadamente 10 a 24 mL/kg/min (600 a 1440 mL/kg/h) em cães e de 8 a 23 mL/kg/min (480 a 1380 mL/kg/h) em gatos. A excreção ocorre predominantemente pela via biliar e fecal (cerca de 70% da dose administrada é recuperada nas fezes sob a forma de metabólitos conjugados e droga inalterada), enquanto a excreção renal responde por uma fração minoritária (aproximadamente 27% na urina). A meia-vida de eliminação plasmática terminal (t1/2) situa-se entre 4 e 9 horas no cão (média de 3,9 a 4,7 h para solução convencional e até 12,7 h para formulações de liberação lenta) e em torno de 6 a 7 horas no gato (cerca de 6,3 h após IM). A insuficiência renal isolada tem pouco impacto sobre a depuração do fármaco, enquanto hepatopatias descompensadas prolongam a meia-vida sistêmica.',
      cnsPenetration:
        'Excelente difusão através da barreira hematoencefálica em virtude de sua extrema lipofilia (LogP ~4,5-5,0), atingindo concentrações teciduais no sistema nervoso central suficientes para ocupação receptoral prolongada de receptores µ supraespinhais e espinhais.',
      plasmaBinding:
        'Muito alta taxa de ligação a proteínas plasmáticas (aproximadamente 95% a 98%), ligando-se a alfa-glicoproteínas, globulinas e albumina.',
      halfLife:
        'Meia-vida de eliminação plasmática terminal de 4 a 9 horas em cães (solução convencional) e de 6 a 7 horas em gatos.',
    },

    // 5. Informações Gerais
    generalInfoData: {
      routesDetailed: [
        {
          route: 'Oral Transmucosa - OTM (Exclusiva e Altamente Recomendada em Gatos)',
          technique:
            'A via oral transmucosa (OTM) consiste em depositar o pequeno volume da solução injetável de buprenorfina diretamente na mucosa jugal (entre a gengiva e a bochecha) ou sob a língua do felino, utilizando seringa sem agulha (seringa de 1 mL com graduação fina). O objetivo é promover contato com a mucosa oral para absorção direta; NÃO deve ser administrada na base da língua para forçar o animal a engolir e NUNCA deve ser misturada na ração ou em alimentos úmidos (a deglutição submete o fármaco ao trato gastrointestinal e à circulação portal com extenso metabolismo de primeira passagem hepática, colapsando a biodisponibilidade para menos de 5% a 10%).',
          nursingCare:
            'Orientar o tutor com demonstração prática na clínica sobre como ejetar suavemente a gota do fármaco no lábio lateral ou gengiva. Utilizar formulações sem conservantes fortes para evitar desconforto de palatabilidade. Monitorar salivação transitória e higienização.',
          limitations:
            'Em cães, a via OTM tem eficácia muito menor e errática (~35-50% vs 5% engolida), exigindo doses substancialmente mais altas; não deve ser extrapolada rotineiramente para a espécie canina.',
        },
        {
          route: 'Intravenosa Lenta (IV)',
          technique:
            'Administrar lentamente ao longo de 1 a 2 minutos através de acesso venoso periférico permeável. Promove 100% de biodisponibilidade e é a via de escolha no paciente hospitalizado no pós-operatório imediato ou na indução anestésica.',
          nursingCare:
            'Monitorar frequência respiratória, oximetria de pulso (SpO2) e frequência cardíaca. A injeção muito rápida em bólus pode desencadear náusea transitória ou hipotensão discreta.',
          limitations:
            'Requer acesso venoso patente e vigilância profissional em ambiente de internação.',
        },
        {
          route: 'Intramuscular Profunda (IM)',
          technique:
            'Injetar profundamente em musculatura volumosa (quadríceps femoral, músculos epaxiais lombares ou semitendíneo/semimembranáceo), aspirando previamente o êmbolo da seringa para certificar ausência de refluxo sanguíneo vascular. Absorção rápida, confiável e consistente em cães e gatos.',
          nursingCare:
            'Alternar os sítios de injeção em administrações repetidas. Em pacientes hipotérmicos, em choque circulatório ou gravemente desidratados, a absorção periférica muscular fica prejudicada, sendo mandatória a migração para a via IV.',
          limitations:
            'Pode causar dor transitória no sítio de injeção se utilizada a apresentação multidose contendo o conservante clorocresol.',
        },
        {
          route: 'Subcutânea Convencional (SC 0,3 mg/mL) - DESENCORAJADA',
          technique:
            'ALERTA FORMAL DO ISFM 2022 E BSAVA: A via subcutânea utilizando a solução convencional de buprenorfina 0,3 mg/mL NÃO é recomendada em gatos ou cães hospitalizados. Estudos clínicos randomizados (Giordano et al., 2010) comprovaram que a absorção subcutânea é extremamente errática, apresentando altas taxas de falha terapêutica precoce e necessidade maciça de resgate analgésico.',
          nursingCare:
            'Se a via IV ou IM for inviável em felinos, utilizar a via OTM em vez de SC. Reservar a via subcutânea apenas quando houver disponibilidade de formulações específicas de depósito de alta concentração licenciadas para uso SC (como Simbadol 1,8 mg/mL).',
          limitations:
            'Inadequada para analgesia pós-operatória aguda confiável.',
        },
      ],
      dilutionGuide: {
        diluentsCompatible: [
          'Cloreto de Sódio 0,9% (Solução Fisiológica)',
          'Glicose 5% em Água (SG 5%)',
          'Solução de Ringer com Lactato (compatível para infusão sob preparo asséptico imediato)',
        ],
        incompatibilities: [
          'O compêndio europeu (SPC) e o compêndio BSAVA alertam que, na ausência de estudos de compatibilidade específicos, a buprenorfina injetável comercial não deve ser misturada fisicamente na mesma seringa com outros medicamentos veterinários.',
          'Incompatível fisicamente com bicarbonato de sódio e soluções de pH alcalino (risco de precipitação da base livre insolúvel).',
        ],
        infusionRate:
          'Para infusão contínua intravenosa (CRI) em cães: administrar bólus de ataque de 0,015 mg/kg IV lento, seguido de taxa contínua de 0,0025 mg/kg/h (2,5 mcg/kg/h) em bomba de infusão volumétrica.',
        storageRequirements:
          'Conservar em temperatura ambiente entre 15 °C e 30 °C, na embalagem original fechada, em local seco e estritamente protegido da luz direta. Não congelar. Para frascos multidose (Vetergesic com clorocresol), após a primeira punção do septo de borracha com agulha estéril, o produto mantém estabilidade e esterilidade por até 28 dias sob condições assépticas. Diluições estéreis 1:10 em soro fisiológico acondicionadas em frascos de vidro mantêm estabilidade química por até 180 dias; o armazenamento em seringas plásticas resulta em perda significativa de fármaco por adsorção aos polímeros plásticos.',
      },
      speciesPeculiarities: [
        {
          species: 'cat',
          title: 'Via OTM Eficaz, Risco de Hipertermia Pós-Operatória e Glucuronidação Preservada',
          description:
            'A espécie felina possui afinidade farmacológica extraordinária com a buprenorfina. O pH salivar do gato favorece a forma não ionizada lipofílica, tornando a via oral transmucosa (OTM) altamente absorvível e uma das melhores ferramentas para analgesia domiciliar após cirurgias eletivas ou odontológicas. Além disso, a glucuronidação hepática da buprenorfina é perfeitamente funcional em gatos, garantindo biotransformação segura. Por outro lado, felinos tratados com opioides apresentam risco documentado de hipertermia pós-operatória não pirogênica em até 28% dos animais (induzida por alteração central de termorregulação hipotalâmica), manifestando-se por elevações térmicas transitórias de 39,5 a 40,5 °C nas primeiras 12 a 24 horas. Também podem exibir euforia leve (ronronar compulsivo, esfregar-se nas grades da baia, midríase pupilar fixa e busca por carinho), que não deve ser confundida com dor pós-cirúrgica.',
          clinicalImplications:
            'Prescrever 0,02 a 0,04 mg/kg q6-8h por via OTM para alta ambulatorial sem estresse. Monitorar a temperatura retal periodicamente no internamento; diante de hipertermia felina pós-opioide, desligar mantas térmicas, retirar cobertores e fornecer ventilação passiva fresca (geralmente não requer antipiréticos). Nunca prescrever via SC da formulação convencional 0,3 mg/mL.',
        },
        {
          species: 'dog',
          title: 'Vias IV e IM Altamente Previsíveis, Absorção OTM Fraca e Tendência à Hipotermia',
          description:
            'No cão, a buprenorfina exibe excelente previsibilidade analgésica quando administrada por via intravenosa ou intramuscular, integrando protocolos multimodais para cirurgias de tecidos moles. Contudo, a absorção bucal transmucosa (OTM) em cães é errática e incompleta (biodisponibilidade de ~35% a 50%, comparada a cerca de 5% se o produto for engolido), exigindo doses significativamente maiores para alcançar níveis antinociceptivos equivalentes. Adicionalmente, ao contrário dos felinos que tendem à hipertermia, os cães sob ação de opioides comumente sofrem redução do limiar termorregulador central, manifestando hipotermia no pós-operatório imediato, sobretudo se associada a anestésicos inalatórios e fenotiazínicos.',
          clinicalImplications:
            'Em cães, utilizar preferencialmente 0,01 a 0,02 mg/kg pelas vias IV ou IM a cada 6 a 8 horas. Evitar depender da via OTM canina para procedimentos cirúrgicos dolorosos. Manter aquecimento ativo perioperatório rigoroso (colchão térmico, ar aquecido forçado) para prevenir hipotermia canina.',
        },
      ],
      pharmacologicalClassification: {
        chemicalClass: 'Derivado opioide semissintético da tebaína/oripavina (alcaloide morfínico fenantrênico de alta lipofilia)',
        chemicalClassDescription:
          'Composto heterocíclico hexacíclico dotado de ponte epóxi/éter, amina terciária ciclopropilmetílica volumosa e anéis fenólicos, conferindo altíssima lipossolubilidade e formato zwitteriônico.',
        therapeuticClass: 'Analgésico opioide de ação prolongada (agonista parcial mu / antagonista kappa)',
        therapeuticClassDescription:
          'Analgésico parenteral e transmucoso oral de alta afinidade e dissociação lenta do receptor mu, indicado para dor leve a moderada e pré-anestesia balanceada.',
        detailedTargets: [
          {
            target: 'Receptor opioide mu (MOR - Mu Opioid Receptor)',
            action:
              'Agonismo parcial com altíssima afinidade de ligação e velocidade de dissociação extremamente lenta',
            clinicalSignificance:
              'Promove antinocicepção prolongada (6 a 8 horas) com efeito teto analgésico submáximo, reduzindo depressão cardiorrespiratória em doses clínicas.',
          },
          {
            target: 'Receptor opioide kappa (KOR - Kappa Opioid Receptor)',
            action:
              'Antagonismo competitivo puro sobre os receptores kappa',
            clinicalSignificance:
              'Elimina as reações disfóricas psicotomiméticas, alucinações e sedação excessiva frequentemente mediadas por agonistas kappa.',
          },
          {
            target: 'Canais iônicos neuronais (Canais de Ca2+ voltagem-dependentes N e P/Q e canais de K+ GIRK)',
            action:
              'Inibição de influxo de cálcio pré-sináptico e ativação de condutância de potássio pós-sináptica via subunidades beta-gama de proteínas Gi/o',
            clinicalSignificance:
              'Bloqueia a exocitose de neurotransmissores excitatórios (glutamato, substância P, CGRP) e hiperpolariza neurônios no corno dorsal espinhal.',
          },
        ],
      },
      prescriptionType: {
        category: 'Substância Entorpecente Sujeita a Controle Especial (Lista A1)',
        ordinanceOrLaw: 'Portaria MAPA nº 837/2025 (Regulamento Veterinário de Controle Especial) e Portaria SVS/MS nº 344/98',
        retentionRequired: true,
        guidelines:
          'ENQUADRAMENTO LEGAL ATUALIZADO (2026): A buprenorfina é classificada como Substância Entorpecente na Lista A1 da Portaria MAPA nº 837/2025. Quando prescrita sob a forma de produto veterinário registrado pelo MAPA, a dispensação é realizada mediante Notificação de Receita Veterinária emitida pelo sistema eletrônico oficial do MAPA, impressa em papel branco em 2 vias (1ª via tutor, 2ª via retida pelo estabelecimento comercial veterinário), com prazo de validade de 30 dias corridos e quantidade para até 30 dias de tratamento (ou até 180 dias para uso contínuo comprovado). Para preparações magistrais (farmácias de manipulação veterinárias), a prescrição deve ser emitida em formulário de notificação privativo em 3 vias (1ª via tutor, 2ª via estabelecimento manipulador, 3ª via médico-veterinário). MEDICAMENTO DE LINHA HUMANA: no caso de adesivos transdérmicos humanos (Restiva®), a legislação sanitária (Portaria 344/98 e RDC Anvisa nº 134/2017) confere excepcionalidade formal, permitindo a dispensação em drogarias comunitárias mediante Receita de Controle Especial em 2 vias brancas (com retenção da 2ª via na farmácia e validade de 30 dias).',
      },
    },

    // 6. Atenção, Precauções e Interações
    attentionData: {
      attentionSubtitle:
        'Stewardship de Opioides, Manejo do Teto Analgésico e Vigilância de Hipertermia Felina',
      precautions: [
        {
          condition: 'Dor aguda intensa, lancinante e severa (politrauma, fraturas graves, toracotomias)',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A buprenorfina é um agonista parcial do receptor mu e possui um teto farmacodinâmico intrínseco de ativação intracelular; aumentar a dose não proporciona a analgesia profunda conferida por agonistas plenos.',
          clinicalAction:
            'Contraindicada como monoterapia única para dor severa. Selecionar agonistas mu plenos (metadona, morfina, fentanil) integrados a bloqueios locorregionais e analgesia multimodal.',
        },
        {
          condition: 'Via subcutânea (SC) utilizando a solução convencional injetável de 0,3 mg/mL',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A absorção tecidual subcutânea da formulação padrão 0,3 mg/mL é lenta e altamente errática em pequenos animais, resultando em concentrações plasmáticas subterapêuticas e falha analgésica precoce.',
          clinicalAction:
            'Desencorajada formalmente pelo consenso ISFM 2022 e BSAVA. Utilizar estritamente as vias intravenosa (IV), intramuscular (IM) ou oral transmucosa (OTM em gatos).',
        },
        {
          condition: 'Traumatismo cranioencefálico, suspeita de hipertensão intracraniana ou coma',
          alertLevel: 'warning',
          physiologicalExplanation:
            'Qualquer grau de hipoventilação alveolar induz retenção de gás carbônico (hipercapnia / aumento da PaCO2), deflagrando vasodilatação reflexa das arteríolas cerebrais com aumento do volume sanguíneo intracraniano e elevação crítica da pressão intracraniana (PIC).',
          clinicalAction:
            'Usar com extrema cautela em pacientes neurocríticos; monitorar continuamente a frequência respiratória, capnografia (ETCO2) e gasometria arterial.',
        },
        {
          condition: 'Fêmeas gestantes no pré-operatório imediato de cesariana eletiva ou de emergência',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A buprenorfina ultrapassa livremente a barreira placentária; a imaturidade do sistema nervoso central e dos centros respiratórios neonatais predispõe a depressão respiratória prolongada e hipóxia grave nos fetos ao nascimento.',
          clinicalAction:
            'Contraindicação expressa em bulas regulatórias internacionais (Vetergesic). Priorizar anestesia peridural e agonistas plenos titulados após a retirada cirúrgica dos conceptos.',
        },
        {
          condition: 'Insuficiência hepática grave descompensada com ascite ou encefalopatia',
          alertLevel: 'warning',
          physiologicalExplanation:
            'A N-desalquilação e a glucuronidação hepáticas ficam lentificadas, reduzindo a taxa de depuração sistêmica (clearance) e prolongando a duração da sedação e ação opioide.',
          clinicalAction:
            'Reduzir a dose inicial em 25% a 50% ou ampliar o intervalo entre administrações (q12h); titular rigorosamente pela resposta analgésica clínica.',
        },
      ],

      adverseEffectsDetailed: [
        {
          effect: 'Hipertermia pós-operatória felina (temperatura retal > 39,5 °C a 40,5 °C)',
          frequency: 'common',
          mechanism:
            'Modulação autonômica hipotalâmica central induzida pela estimulação de receptores mu no centro termorregulador em gatos.',
          clinicalManagement:
            'Monitorar rotineiramente a temperatura retal nas primeiras 12 a 24 horas pós-cirúrgicas. Diante de hipertermia, cessar imediatamente fontes ativas de calor (mantas térmicas, aquecedores forçados), fornecer ambiente fresco e aplicar compressas úmidas nas patas. Geralmente regride espontaneamente sem necessidade de antipiréticos.',
        },
        {
          effect: 'Sedação excessiva, sonolência profunda e ataxia motora transitória',
          frequency: 'common',
          mechanism:
            'Depressão da formação reticular ascendente e inibição da transmissão sináptica talâmica e cortical central.',
          clinicalManagement:
            'Manter o paciente em leito acolchoado em ambiente silencioso e seguro. Reduzir a posologia de sedativos concomitantes se a sedação impedir a ingestão hídrica espontânea.',
        },
        {
          effect: 'Midríase pupilar bilateral persistente em felinos',
          frequency: 'common',
          mechanism:
            'Alteração do tônus autonômico do núcleo parassimpático de Edinger-Westphal no tronco encefálico felino.',
          clinicalManagement:
            'Efeito farmacológico benigno e esperado. Proteger o paciente de iluminação ambiente excessiva durante o período de recuperação.',
        },
        {
          effect: 'Bradicardia sinusal vagal e discreta redução pressórica',
          frequency: 'uncommon',
          mechanism:
            'Estimulação dos núcleos vagais centrais no bulbo, aumentando a atividade colinérgica no nó sinoatrial cardíaco.',
          clinicalManagement:
            'Monitorar frequência cardíaca e pressão arterial média. Se acompanhada de hipotensão (PAM < 60 mmHg) ou bradicardia severa, administrar atropina (0,02 a 0,04 mg/kg IM/IV) ou glicopirrolato.',
        },
        {
          effect: 'Depressão respiratória aguda com hipoventilação e hipercapnia',
          frequency: 'rare',
          mechanism:
            'Redução da sensibilidade dos quimiorreceptores do centro respiratório bulbar aos incrementos da pressão arterial de CO2.',
          clinicalManagement:
            'Garantir via aérea desobstruída e oxigênio a 100%. Se severa, administrar naloxona titulada (0,02 a 0,04 mg/kg IV). Lembrar que, pela dissociação lenta da buprenorfina, doses repetidas de naloxona ou infusão contínua podem ser necessárias.',
        },
      ],

      doseReductionGuidelines: [
        {
          clinicalCondition: 'Doença Renal Crônica em Cães e Gatos (Estágios IRIS 1 a 4)',
          recommendedAdjustment:
            'Não requer redução obrigatória de dose baseada apenas nos níveis séricos de creatinina ou SDMA. A excreção da buprenorfina é predominantemente biliar e fecal (~70%), com depuração renal minoritária.',
          physiologicalRationale:
            'Como a principal rota de eliminação é hepatobiliar, a azotemia isolada não provoca acúmulo tóxico expressivo do fármaco original. Monitorar hidratação e escore de sedação em nefropatas urêmicos.',
        },
        {
          clinicalCondition: 'Insuficiência Hepática Descompensada (Cirrose, Shunt Portossistêmico)',
          recommendedAdjustment:
            'Iniciar a terapia com redução de 25% a 50% da dose padrão (ex.: cão 0,01 mg/kg; gato 0,015 a 0,02 mg/kg) ou estender o intervalo posológico para q12h.',
          physiologicalRationale:
            'A redução da massa hepatocelular e do fluxo sanguíneo hepático compromete as vias de N-dealquilação e glucuronidação, prolongando a meia-vida plasmática.',
        },
        {
          clinicalCondition: 'Pacientes Geriátricos ou Criticamente Debilitados',
          recommendedAdjustment:
            'Titular a dose na extremidade inferior das faixas posológicas (cão: 0,01 mg/kg; gato: 0,02 mg/kg) com reavaliações frequentes da dor.',
          physiologicalRationale:
            'Redução fisiológica da taxa metabólica basal, menor volume muscular e suscetibilidade acentuada à sedação central.',
        },
        {
          clinicalCondition: 'Choque Hemodinâmico, Hipotensão ou Hipoperfusão Periférica',
          recommendedAdjustment:
            'Evitar estritamente as vias de absorção tecidual (IM e SC); administrar exclusivamente por via intravenosa lenta (IV) titulada após estabilização volêmica inicial.',
          physiologicalRationale:
            'A vasoconstrição periférica periférica do choque torna a absorção muscular ou subcutânea imprevisível, com risco de liberação errática quando a perfusão for restabelecida.',
        },
        {
          clinicalCondition: 'Finalização do Tratamento Analgésico Pós-Operatório (Desmame)',
          recommendedAdjustment:
            'Tratamentos agudos perioperatórios curtos de 1 a 5 dias NÃO necessitam de desmame gradual. Em terapias estendidas além de várias semanas para dor crônica, reduzir a dose total diária em degraus de 25% a cada 3 a 5 dias.',
          physiologicalRationale:
            'A exposição aguda curta não induz dependência física celular que justifique desmame; a retirada gradual em uso crônico previne hiperalgesia de rebote.',
        },
      ],

      drugInteractionsDetailed: [
        {
          drugOrClass: 'Agonistas Mu Plenos (Metadona, Morfina, Fentanil, Hidromorfona)',
          severity: 'major',
          clinicalEffect:
            'Competição e deslocamento competitivo no receptor mu; a altíssima afinidade da buprenorfina pode atenuar a resposta máxima de um agonista pleno subsequente.',
          pharmacologicalMechanism:
            'A buprenorfina liga-se firmemente ao receptor mu e dissocia-se lentamente. CONDUTA CLÍNICA DE OURO: apesar dessa interação, se um paciente que recebeu buprenorfina persistir com escores de dor elevados, o resgate com metadona ou fentanil NÃO deve ser postergado; administrar o agonista pleno sob titulação cuidadosa e monitoramento contínuo.',
        },
        {
          drugOrClass: 'Benzodiazepínicos (Midazolam, Diazepam) e Anestésicos Gerais',
          severity: 'major',
          clinicalEffect:
            'Sedação profunda aditiva e depressão cardiorrespiratória sinérgica com risco de hipoventilação e apneia.',
          pharmacologicalMechanism:
            'Potencialização alostérica da inibição GABAérgica central somada à diminuição do tônus simpático e da resposta quimiorreceptora bulbar ao CO2.',
        },
        {
          drugOrClass: 'Agonistas Alfa-2 Adrenérgicos (Dexmedetomidina, Medetomidina, Xilazina)',
          severity: 'moderate',
          clinicalEffect:
            'Excelente sinergismo analgésico e sedativo, porém com maior propensão a bradicardia sinusal vagal e náusea/vômito na indução.',
          pharmacologicalMechanism:
            'Coativação de vias analgésicas inibitórias descendentes noradrenérgicas e opioides no corno dorsal medular.',
        },
        {
          drugOrClass: 'Inibidores Potentes do Citocromo CYP3A (Cetoconazol, Itraconazol, Claritromicina)',
          severity: 'moderate',
          clinicalEffect:
            'Aumento das concentrações plasmáticas de buprenorfina e prolongamento do efeito analgésico e sedativo.',
          pharmacologicalMechanism:
            'Bloqueio enzimático da N-desalquilação hepática primária responsável pela conversão da buprenorfina em norbuprenorfina.',
        },
        {
          drugOrClass: 'Indutores Enzimáticos Hepáticos (Fenobarbital, Fenitoína)',
          severity: 'moderate',
          clinicalEffect:
            'Possível redução da concentração plasmática de buprenorfina e menor duração do efeito analgésico.',
          pharmacologicalMechanism:
            'Indução do citocromo microssomal acelerando a depuração metabólica de fase I.',
        },
        {
          drugOrClass: 'Naloxona (Antagonista Opioide)',
          severity: 'moderate',
          clinicalEffect:
            'Reversão incompleta ou dificultada da depressão respiratória induzida por buprenorfina.',
          pharmacologicalMechanism:
            'A taxa de dissociação da buprenorfina do receptor mu é mais lenta que a afinidade da naloxona; pode exigir doses repetidas ou infusão contínua de naloxona.',
        },
      ],
    },

    // 7. Estudos Clínicos e de Segurança Comentados
    clinicalStudiesCommented: [
      {
        title:
          'Postoperative analgesic effects of intravenous, intramuscular, subcutaneous or oral transmucosal buprenorphine administered to cats undergoing ovariohysterectomy',
        authorsYear: 'Giordano T, Steagall PVM, Ferreira TH, et al. 2010',
        journal: 'Vet Anaesth Analg. 37(4):357-366. doi: 10.1111/j.1467-2995.2010.00541.x. PMID: 20636568',
        studyDesign:
          'Ensaio clínico prospectivo, randomizado e cego em 100 gatas saudáveis submetidas a ovariohisterectomia eletiva, divididas em 4 grupos de 25 animais para avaliar buprenorfina convencional (0,01 mg/kg) administrada por via IV, IM, SC ou OTM, avaliando necessidade de resgate analgésico pós-operatório.',
        sampleSize: '100 gatas submetidas a OHE',
        mainFindings:
          'A necessidade de resgate analgésico com morfina pós-cirúrgica ocorreu em 6/25 (24%) no grupo IV, 4/25 (16%) no grupo IM, 13/25 (52%) no grupo SC e 17/25 (68%) no grupo OTM. As vias SC e OTM em baixa dose exibiram taxas de falha significativamente superiores às vias parenterais IV e IM.',
        clinicalTakeaway:
          'Estudo seminal que consolidou que, para dor cirúrgica aguda hospitalar, as vias IV e IM são farmacologicamente mais previsíveis. A via SC convencional tem absorção errática, e a via OTM necessita de doses contemporâneas mais elevadas (0,02 a 0,04 mg/kg conforme diretriz ISFM 2022) para assegurar analgesia consistente.',
        referenceId: 'giordano-2010-buprenorphine-routes',
      },
      {
        title:
          'Efficacy of oral transmucosal and intravenous administration of buprenorphine before surgery for postoperative analgesia in dogs undergoing ovariohysterectomy',
        authorsYear: 'Ko JC, Freeman LJ, Barletta M, et al. 2011',
        journal: 'J Am Vet Med Assoc. 238(3):318-328. doi: 10.2460/javma.238.3.318. PMID: 21281215',
        studyDesign:
          'Ensaio clínico prospectivo randomizado em 18 cadelas submetidas a OHE, comparando buprenorfina 0,02 mg/kg IV, 0,02 mg/kg OTM e 0,12 mg/kg OTM antes da incisão cirúrgica, monitorando escores de dor e necessidade de resgate pós-operatório.',
        sampleSize: '18 cadelas',
        mainFindings:
          'O grupo OTM de dose baixa (0,02 mg/kg) apresentou a maior taxa de necessidade de resgate analgésico precoce, enquanto a dose elevada OTM (0,12 mg/kg) forneceu analgesia similar à via IV de 0,02 mg/kg.',
        clinicalTakeaway:
          'Demonstra que a absorção transmucosa oral no cão é farmacocineticamente muito menos eficiente que no gato, exigindo doses 5 a 6 vezes maiores para alcançar equivalência analgésica. Desaconselha a extrapolação direta da via OTM felina para a rotina canina.',
        referenceId: 'ko-2011-otm-dogs',
      },
      {
        title:
          'The pharmacokinetics and analgesic effects of extended-release buprenorphine administered subcutaneously in healthy dogs',
        authorsYear: 'Barletta M, Ostenkamp SM, Taylor AC, et al. 2018',
        journal: 'J Vet Pharmacol Ther. 41(4):502-512. doi: 10.1111/jvp.12497. PMID: 29521421',
        studyDesign:
          'Estudo farmacocinético cruzado, randomizado e cego em cães sadios comparando buprenorfina de liberação estendida (ER 0,2 mg/kg SC) versus buprenorfina convencional (0,02 mg/kg IV), avaliando níveis plasmáticos e antinocicepção térmica por 72 horas.',
        sampleSize: '6 cães em delineamento crossover',
        mainFindings:
          'A formulação ER SC apresentou meia-vida de eliminação de 12,74 horas e promoveu efeito antinociceptivo sustentado por até 72 horas contínuas, em comparação a 12 horas no grupo IV convencional. Os eventos adversos foram leves (bradicardia discreta e hiporexia transitória).',
        clinicalTakeaway:
          'Evidencia que o veículo farmacêutico e a tecnologia de liberação modificam profundamente o perfil farmacodinâmico da buprenorfina, viabilizando protocolos analgésicos de longa ação.',
        referenceId: 'barletta-2018-buprenorphine-er',
      },
      {
        title:
          'The analgesic effects of buprenorphine (Vetergesic or Simbadol) in cats undergoing dental extractions: A randomized, blinded, clinical trial',
        authorsYear: 'Watanabe R, Marcoux J, Evangelista MC, et al. 2020',
        journal: 'PLoS One. 15(3):e0230079. doi: 10.1371/journal.pone.0230079. PMID: 32142538',
        studyDesign:
          'Ensaio clínico prospectivo, randomizado e cego em 23 gatos submetidos a extrações dentárias cirúrgicas sob analgesia multimodal (bloqueios locais e meloxicam), comparando buprenorfina convencional (Vetergesic 0,02 mg/kg IM q8h; n=12) versus buprenorfina concentrada (Simbadol 0,24 mg/kg SC q24h; n=11).',
        sampleSize: '23 gatos submetidos a extrações odontológicas',
        mainFindings:
          'As taxas de resgate analgésico foram similares entre os grupos (27,3% para Simbadol vs 33,3% para Vetergesic; p = 1,0), com excelente escore de conforto em ambos os protocolos. Aversão à administração foi menor no grupo Simbadol de dose única diária.',
        clinicalTakeaway:
          'Comprova a alta eficácia da buprenorfina no controle da dor estomatológica e odontológica em felinos dentro de protocolos multimodais, demonstrando que formulações de longa duração diminuem o estresse de manipulação em gatos.',
        referenceId: 'watanabe-2020-simbadol-dental',
      },
      {
        title:
          'The analgesic effects of buprenorphine (Vetergesic or Simbadol) in combination with carprofen in dogs undergoing ovariohysterectomy: a randomized, blinded, clinical trial',
        authorsYear: 'Watanabe R, Monteiro BP, Evangelista MC, et al. 2018',
        journal: 'BMC Vet Res. 14:304. doi: 10.1186/s12917-018-1628-4. PMID: 30290820',
        studyDesign:
          'Ensaio clínico prospectivo, randomizado e cego em 24 cadelas submetidas a OHE, tratadas com acepromazina, carprofeno (4,4 mg/kg SC) e buprenorfina (0,02 mg/kg IM) em duas formulações comerciais distintas.',
        sampleSize: '24 cadelas submetidas a OHE',
        mainFindings:
          'Ambos os regimes conferiram analgesia excelente quando associados ao AINE carprofeno, com taxas reduzidas de resgate pós-operatório (0% a 25%) e excelente estabilidade cardiopulmonar.',
        clinicalTakeaway:
          'Ratifica a premissa de que a buprenorfina atinge seu melhor desempenho clínico quando inserida em protocolos de analgesia multimodal preventiva combinada a anti-inflamatórios não esteroidais.',
        referenceId: 'watanabe-2018-buprenorphine-carprofen',
      },
    ],

    // 8. Tabela Prática de Peso e Conversão de Doses
    practicalWeightTable: {
      standardDoseText:
        'Cães e Gatos: Cálculo baseado na dose padrão de 0,02 mg/kg (faixa usual de 0,01 a 0,04 mg/kg) utilizando a solução convencional de 0,3 mg/mL (0,0667 mL/kg). Vias recomendadas: Gatos (IV, IM ou OTM); Cães (IV ou IM). ATENÇÃO: Nunca converter em gotas caseiras; medir exclusivamente em seringa de 1 mL graduada em centésimos.',
      headers: [
        'Peso do Paciente',
        'Dose Total (0,02 mg/kg)',
        'Volume Injetável 0,3 mg/mL (IV / IM / OTM)',
        'Tipo de Seringa Recomendada',
        'Observações Clínicas Específicas',
      ],
      rows: [
        {
          weight: '1,5 kg (Filhote / Gato Pequeno)',
          totalDose: '0,03 mg',
          col1: '0,10 mL',
          col2: 'Seringa de 1 mL (tuberculina)',
          col3: 'Ideal para via OTM felina ou IV lenta',
        },
        {
          weight: '2,0 kg (Gato Pequeno / Cão Mini)',
          totalDose: '0,04 mg',
          col1: '0,13 mL',
          col2: 'Seringa de 1 mL (tuberculina)',
          col3: 'Em gatos, aplicar suavemente na bochecha (OTM)',
        },
        {
          weight: '3,0 kg (Gato Adulto)',
          totalDose: '0,06 mg',
          col1: '0,20 mL',
          col2: 'Seringa de 1 mL (tuberculina)',
          col3: 'Volume ideal para absorção transmucosa jugal',
        },
        {
          weight: '4,0 kg (Gato Padrão)',
          totalDose: '0,08 mg',
          col1: '0,27 mL',
          col2: 'Seringa de 1 mL (tuberculina)',
          col3: 'Pico analgésico em 1h a 1,5h pós-aplicação',
        },
        {
          weight: '5,0 kg (Gato Grande / Cão Pequeno)',
          totalDose: '0,10 mg',
          col1: '0,33 mL',
          col2: 'Seringa de 1 mL (tuberculina)',
          col3: 'Dose a cada 6 a 8 horas conforme escore de dor',
        },
        {
          weight: '10 kg (Cão Pequeno)',
          totalDose: '0,20 mg',
          col1: '0,67 mL',
          col2: 'Seringa de 1 mL ou 3 mL',
          col3: 'Preferir vias IV lenta ou IM profunda',
        },
        {
          weight: '15 kg (Cão Médio)',
          totalDose: '0,30 mg',
          col1: '1,00 mL',
          col2: 'Seringa de 3 mL graduada',
          col3: 'Excelente analgesia perioperatória em tecidos moles',
        },
        {
          weight: '20 kg (Cão Médio)',
          totalDose: '0,40 mg',
          col1: '1,33 mL',
          col2: 'Seringa de 3 mL graduada',
          col3: 'Associar obrigatoriamente a AINE no pós-operatório',
        },
        {
          weight: '30 kg (Cão Grande)',
          totalDose: '0,60 mg',
          col1: '2,00 mL',
          col2: 'Seringa de 3 mL ou 5 mL',
          col3: 'Em cirurgias ortopédicas severas, preferir metadona',
        },
        {
          weight: '40 kg (Cão Grande / Gigante)',
          totalDose: '0,80 mg',
          col1: '2,67 mL',
          col2: 'Seringa de 5 mL',
          col3: 'Monitorar frequência respiratória e hipotermia',
        },
      ],
    },

    // 9. Modelo Pronto de Prescrição Veterinária
    samplePrescriptionText:
      'NOTIFICAÇÃO DE RECEITA VETERINÁRIA — CONTROLE ESPECIAL (LISTA A1 - PORTARIA MAPA Nº 837/2025)\n\nPaciente: Luna | Espécie: Felina | Raça: Siamês | Peso: 3,5 kg | Idade: 3 anos\nTutor: Roberto Camargo | Data: 16/09/2026\n\nPrescrição Oral Transmucosa:\n1. Cloridrato de Buprenorfina Solução 0,3 mg/mL (Frasco de 10 mL manipulado ou comercial) ---------- 1 frasco\n   - Posologia: Administrar 0,23 mL (equivalente a 0,07 mg de buprenorfina) por via oral transmucosa (OTM), a cada 8 horas, durante 4 dias consecutivos.\n\nOrientações e Cuidados ao Tutor:\n- FORMA CORRETA DE APLICAÇÃO: Utilizar exclusivamente a seringa de 1 mL (sem agulha) fornecida para medir exatamente 0,23 mL. Injetar o líquido suavemente na gengiva ou na parte interna da bochecha da gata. Não forçar a gata a engolir e NUNCA misturar o remédio com a comida ou leite (se for engolido, o medicamento perde o efeito analgésico).\n- Não utilizar a via subcutânea (por baixo da pele) com essa solução líquida, pois a absorção é falha.\n- Fique atento a sinais normais como pupilas dilatadas (midríase) e ronronar aumentado. Caso note febre alta (corpo excessivamente quente), sedação exagerada ou dificuldade para respirar, entre em contato imediatamente com a equipe veterinária.\n- Medicamento entorpecente de controle especial. Guardar em local seguro, trancado e fora do alcance de crianças e de outros animais.',

    // 10. Referências Científicas Completas
    references: [
      {
        id: 'plumb-buprenorphine-10ed',
        title: 'Buprenorphine: Veterinary Systemic Opioid Partial Agonist Monograph',
        authors: 'Budde JA, McCluskey DM, Plumb DC',
        year: 2023,
        journal: "Plumb's Veterinary Drug Handbook, 10th edition, pp. 150-154",
        citation:
          "Budde JA, McCluskey DM, Plumb DC. Buprenorphine. In: Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023. p. 150-154.",
        sourceType: 'Compêndio Farmacológico Veterinário Padrão-Ouro',
        evidenceLevel: 'Referência Mundial em Terapêutica Veterinária',
      },
      {
        id: 'bsava-buprenorphine-10ed',
        title: 'Buprenorphine: Canine and Feline Formulary Monograph',
        authors: 'Allerton F (ed.)',
        year: 2020,
        journal: 'BSAVA Small Animal Formulary, Part A: Canine and Feline, 10th edition, pp. 53-54',
        citation:
          'British Small Animal Veterinary Association. Buprenorphine. In: BSAVA Small Animal Formulary, Part A. 10th ed. Gloucester: BSAVA; 2020. p. 53-54.',
        sourceType: 'Formulário Britânico de Animais de Companhia',
        evidenceLevel: 'Consenso Britânico de Medicina Veterinária',
      },
      {
        id: 'lumb-jones-anesthesia-6ed',
        title: 'Opioids: Pharmacology and Clinical Use in Veterinary Anesthesia',
        authors: 'Simon BT, Lizarraga I',
        year: 2024,
        journal: 'Veterinary Anesthesia and Analgesia: The Sixth Edition of Lumb and Jones, Chapter 23, pp. 355-385',
        citation:
          'Simon BT, Lizarraga I. Opioids. In: Lamont LA, Grimm KA, Robertson S, Love L, Schroeder C, eds. Lumb and Jones Veterinary Anesthesia and Analgesia. 6th ed. Hoboken: Wiley-Blackwell; 2024. p. 355-385.',
        sourceType: 'Tratado de Anestesiologia Veterinária Padrão-Ouro',
        evidenceLevel: 'Tratado Internacional de Referência em Anestesiologia',
      },
      {
        id: 'isfm-acute-pain-guidelines-2022',
        title: '2022 ISFM Consensus Guidelines on the Management of Acute Pain in Cats',
        authors: 'Steagall PVM, Robertson S, Taylor P, et al.',
        year: 2022,
        journal: 'Journal of Feline Medicine and Surgery. 24(1):4-30',
        citation:
          'Steagall PVM, Robertson S, Taylor P, et al. 2022 ISFM Consensus Guidelines on the Management of Acute Pain in Cats. J Feline Med Surg. 2022;24(1):4-30. doi: 10.1177/1098612X211066268. PMID: 34964686.',
        sourceType: 'Diretriz de Consenso Internacional de Medicina Felina (ISFM)',
        url: 'https://journals.sagepub.com/doi/full/10.1177/1098612X211066268',
        evidenceLevel: 'Consenso Internacional Padrão-Ouro ISFM 2022',
      },
      {
        id: 'giordano-2010-buprenorphine-routes',
        title:
          'Postoperative analgesic effects of intravenous, intramuscular, subcutaneous or oral transmucosal buprenorphine administered to cats undergoing ovariohysterectomy',
        authors: 'Giordano T, Steagall PVM, Ferreira TH, Minto BW, Lorena SERS, Brondani J, Luna SPL',
        year: 2010,
        journal: 'Veterinary Anaesthesia and Analgesia. 37(4):357-366',
        citation:
          'Giordano T, Steagall PVM, Ferreira TH, et al. Postoperative analgesic effects of intravenous, intramuscular, subcutaneous or oral transmucosal buprenorphine administered to cats undergoing ovariohysterectomy. Vet Anaesth Analg. 2010;37(4):357-366. doi: 10.1111/j.1467-2995.2010.00541.x. PMID: 20636568.',
        sourceType: 'Ensaio Clínico Randomizado Cego em Felinos',
        url: 'https://pubmed.ncbi.nlm.nih.gov/20636568/',
        evidenceLevel: 'Ensaio Clínico Randomizado Controlado Nível 1b',
      },
      {
        id: 'ko-2011-otm-dogs',
        title:
          'Efficacy of oral transmucosal and intravenous administration of buprenorphine before surgery for postoperative analgesia in dogs undergoing ovariohysterectomy',
        authors: 'Ko JC, Freeman LJ, Barletta M, Weil AB, Payton ME, Johnson BM, Inoue T',
        year: 2011,
        journal: 'Journal of the American Veterinary Medical Association. 238(3):318-328',
        citation:
          'Ko JC, Freeman LJ, Barletta M, et al. Efficacy of oral transmucosal and intravenous administration of buprenorphine before surgery for postoperative analgesia in dogs undergoing ovariohysterectomy. J Am Vet Med Assoc. 2011;238(3):318-328. doi: 10.2460/javma.238.3.318. PMID: 21281215.',
        sourceType: 'Ensaio Clínico Randomizado em Cães',
        url: 'https://pubmed.ncbi.nlm.nih.gov/21281215/',
        evidenceLevel: 'Ensaio Clínico Randomizado Controlado Nível 1b',
      },
      {
        id: 'barletta-2018-buprenorphine-er',
        title:
          'The pharmacokinetics and analgesic effects of extended-release buprenorphine administered subcutaneously in healthy dogs',
        authors: 'Barletta M, Ostenkamp SM, Taylor AC, Quandt J, Lascelles BDX, Messenger KM',
        year: 2018,
        journal: 'Journal of Veterinary Pharmacology and Therapeutics. 41(4):502-512',
        citation:
          'Barletta M, Ostenkamp SM, Taylor AC, et al. The pharmacokinetics and analgesic effects of extended-release buprenorphine administered subcutaneously in healthy dogs. J Vet Pharmacol Ther. 2018;41(4):502-512. doi: 10.1111/jvp.12497. PMID: 29521421.',
        sourceType: 'Ensaio Farmacocinético e Farmacodinâmico Crossover em Cães',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29521421/',
        evidenceLevel: 'Estudo Farmacocinético / Farmacodinâmico Nível 1b',
      },
      {
        id: 'watanabe-2020-simbadol-dental',
        title:
          'The analgesic effects of buprenorphine (Vetergesic or Simbadol) in cats undergoing dental extractions: A randomized, blinded, clinical trial',
        authors: 'Watanabe R, Marcoux J, Evangelista MC, Dumais Y, Steagall PV',
        year: 2020,
        journal: 'PLoS ONE. 15(3):e0230079',
        citation:
          'Watanabe R, Marcoux J, Evangelista MC, Dumais Y, Steagall PV. The analgesic effects of buprenorphine (Vetergesic or Simbadol) in cats undergoing dental extractions: A randomized, blinded, clinical trial. PLoS ONE. 2020;15(3):e0230079. doi: 10.1371/journal.pone.0230079. PMID: 32142538.',
        sourceType: 'Ensaio Clínico Randomizado Duplo-Cego em Felinos',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32142538/',
        evidenceLevel: 'Ensaio Clínico Randomizado Controlado Nível 1b',
      },
      {
        id: 'watanabe-2018-buprenorphine-carprofen',
        title:
          'The analgesic effects of buprenorphine (Vetergesic or Simbadol) in combination with carprofen in dogs undergoing ovariohysterectomy: a randomized, blinded, clinical trial',
        authors: 'Watanabe R, Monteiro BP, Evangelista MC, et al.',
        year: 2018,
        journal: 'BMC Vet Res. 2018;14(1):304',
        citation:
          'Watanabe R, Monteiro BP, Evangelista MC, et al. The analgesic effects of buprenorphine (Vetergesic or Simbadol) in combination with carprofen in dogs undergoing ovariohysterectomy: a randomized, blinded, clinical trial. BMC Vet Res. 2018;14(1):304. doi: 10.1186/s12917-018-1628-4. PMID: 30290820.',
        sourceType: 'Ensaio Clínico Randomizado Duplo-Cego em Cadelas',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30290820/',
        evidenceLevel: 'Ensaio Clínico Randomizado Controlado Nível 1b',
      },
    ],

    genericBrandsNote:
      'No mercado veterinário internacional, o cloridrato de buprenorfina injetável 0,3 mg/mL é comercializado sob marcas de referência consagradas como Vetergesic® (Ceva) e Bupaq® / Buprecare®, além de formulações concentradas de longa duração aprovadas pela FDA nos Estados Unidos como Simbadol® (1,8 mg/mL para injeção SC diária) e Zorbium® (20 mg/mL para aplicação tópica transdérmica quadridiária). No Brasil, em 2026, a substância é controlada sob a Lista A1 da Portaria MAPA nº 837/2025. Na rotina nacional de pequenos animais, é frequentemente manipulada sob prescrição veterinária em farmácias magistrais autorizadas ou obtida na forma de adesivos transdérmicos humanos de matriz polimérica (Restiva® 5, 10 e 20 µg/h e Transtec®), dispensados sob Receita de Controle Especial em 2 vias brancas em drogarias.',

    clinicalWarningItems: [
      {
        label: 'Gatos e a Via Oral Transmucosa (OTM) vs Subcutânea:',
        text: 'Em felinos, a via OTM (bochecha/sublingual) é altamente eficaz para analgesia pós-operatória. NUNCA utilizar a via subcutânea com a solução convencional de 0,3 mg/mL, pois o consenso ISFM e ensaios clínicos comprovaram absorção errática e alta taxa de falha analgésica.',
      },
      {
        label: 'Teto Analgésico e Dor Severa:',
        text: 'Por ser um agonista parcial do receptor mu, a buprenorfina possui teto de eficácia. Em dores cirúrgicas severas, toracotomias ou traumas extensos, não insistir em buprenorfina isolada; utilizar agonistas plenos como metadona ou fentanil.',
      },
      {
        label: 'Resgate com Agonistas Plenos e Reversão com Naloxona:',
        text: 'Caso o paciente mantenha dor após receber buprenorfina, um agonista mu pleno (metadona) pode e deve ser administrado sem atraso como resgate. Em casos de superdose, doses habituais de naloxona podem ser insuficientes devido à dissociação lenta do receptor mu, exigindo doses repetidas e suporte ventilatório.',
      },
    ],

    relatedDiseaseSlugs: [
      'doencas-trato-urinario-inferior-felino-dtuif',
      'fistula-perianal-furunculose-anal',
    ],
    isControlled: true,
    isPublished: true,
    source: 'seed',
  },
];

export const buprenorfinaMedicationRecord = buprenorfinaMedicationsSeed[0];
