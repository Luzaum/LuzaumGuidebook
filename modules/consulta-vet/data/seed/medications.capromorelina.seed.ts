import type { MedicationRecord } from '../../types/medication';

export const capromorelinaMedicationsSeed: MedicationRecord[] = [
  {
    id: 'med-capromorelina',
    slug: 'capromorelina',
    title: 'Capromorelina (Elura™ / Entyce™)',
    activeIngredient: 'Tartarato de Capromorelina',
    pharmacologicClass:
      'Agonista seletivo do receptor da grelina (GHSR1a); secretagogo do hormônio do crescimento (GH)',
    species: ['cat', 'dog'],
    category: 'endocrinologia',
    tags: [
      'Capromorelina',
      'Elura',
      'Entyce',
      'Grelina',
      'Estimulante de Apetite',
      'Orexigênico',
      'Doença Renal Crônica',
      'Perda de Peso Felina',
      'Recomendação IRIS 2026',
      'Uso Oral',
    ],
    tradeNames: [
      'Elura™ 20 mg/mL Solução Oral para Gatos (Elanco Saúde Animal — Uso Veterinário Oficial no Brasil)',
      'Entyce® 30 mg/mL Solução Oral para Cães (Elanco — Uso Veterinário nos EUA)',
    ],
    officialSiteUrl: 'https://vet.elanco.com/br/produtos/elura',
    leafletUrl: 'https://vet.elanco.com/br/produtos/elura',
    mechanismOfAction:
      'A capromorelina é uma pequena molécula sintética não peptídica que atua como agonista altamente potente e seletivo do receptor secretagogo do hormônio do crescimento tipo 1a (GHSR1a), o receptor biológico funcional da grelina (conhecida fisiologicamente como o hormônio da fome). O GHSR1a é acoplado à proteína Gq/11: sua ativação estimula a fosfolipase Cbeta, gerando inositol trifosfato (IP3) e diacilglicerol (DAG), mobilizando cálcio dos estoques intracelulares e ativando a proteína quinase C (PKC). No hipotálamo (especialmente no núcleo arqueado), a estimulação do GHSR1a ativa os neurônios orexigênicos que expressam o neuropeptídeo Y (NPY) e o peptídeo relacionado a agouti (AgRP), enquanto inibe funcionalmente a via anorexígena da pró-opiomelanocortina (POMC), disparando um forte impulso voluntário para ingestão de alimento. Simultaneamente, na adeno-hipófise, a capromorelina liga-se aos somatotrófos e desencadeia a exocitose pulsátil de hormônio do crescimento (GH). O GH atua no fígado estimulando a transcrição e liberação prolongada de fator de crescimento semelhante à insulina tipo 1 (IGF-1), promovendo anabolismo proteico, balanço nitrogenado positivo e ganho ponderal sustentado que perdura além da rápida depuração plasmática do fármaco.',
    plainLanguageSummary:
      'Estimulante oral inovador do apetite e do ganho de peso que imita a ação da grelina, o hormônio natural responsável pela sensação de fome no organismo. Ele age de duas formas coordenadas: primeiro, ativa a área do cérebro (hipotálamo) responsável pela busca por comida; segundo, estimula a liberação do hormônio do crescimento (GH) e do fator IGF-1, que favorecem o ganho de peso e o aumento da massa corporal. A recomendação internacional do IRIS 2026 incluiu a capromorelina entre as opções prioritárias para gatos com Doença Renal Crônica (DRC) que estejam perdendo peso, massa muscular ou apresentando hiporexia. No Brasil, o produto veterinário comercial é o Elura (solução oral de 20 mg/mL sabor baunilha para gatos). PONTO CRÍTICO: administrar sempre 30 minutos antes do alimento, pois comida no estômago reduz a absorção do medicamento pela metade.',

    indications: [
      'Manejo da perda ponderal e hiporexia em gatos portadores de Doença Renal Crônica (DRC estágios IRIS 1 a 4), conforme consenso e recomendação internacional IRIS 2026.',
      'Estimulação voluntária do apetite e reversão de perda de peso em cães apresentando inapetência aguda ou crônica secundária a enfermidades diversas.',
      'Suporte multimodal contra caquexia, sarcopenia e perda muscular progressiva em felinos idosos em internação hospitalar ou cuidados paliativos.',
      'Estimulação farmacológica do apetite em gatos com hiporexia por causas não renais (uso extra-rótulo condicionado ao diagnóstico da doença de base).',
    ],

    contraindications: [
      'Hipersensibilidade conhecida à capromorelina ou a qualquer componente do veículo da solução oral.',
      'Diagnóstico confirmado ou suspeita clínica de hipersomatotropismo felino (acromegalia): o estímulo do eixo GH/IGF-1 é expressamente contraindicado por agravar a proliferação tecidual patológica.',
      'Gatos com diabetes mellitus ativo descompensado ou histórico de diabetes: a capromorelina induz elevação da glicemia e resistência insulínica, com risco descrito de precipitação de cetoacidose diabética.',
      'Instabilidade hemodinâmica grave, choque hipovolêmico ou desidratação crítica não corrigida: o fármaco causa queda transitória da pressão arterial e da frequência cardíaca.',
    ],

    cautions: [
      'Administrar preferencialmente em jejum cerca de 30 minutos antes da refeição programada. Em gatos, a administração junto com alimento reduz a concentração sérica máxima (Cmax) em 55% e a exposição sistêmica (AUC) em 43%.',
      'Monitorar a pressão arterial sistêmica e a frequência cardíaca nas primeiras 1 a 4 horas após a administração, sobretudo em gatos nefropatas debilitados, cardiopatas ou que estejam recebendo vasodilatadores ou anti-hipertensivos (anlodipino, telmisartana, benazepril).',
      'A capromorelina trata as consequências clínicas da DRC (anorexia, perda de massa muscular e emagrecimento), e NÃO cura nem freia a progressão da nefropatia. O manejo da desidratação, uremia, náusea urêmica, hipocalemia, anemia e hipertensão deve prosseguir sem interrupção.',
      'Nunca utilizar sistemas de gotejamento por frasco conta-gotas. A dose deve ser rigorosamente medida em mililitros (mL) através da seringa dosadora graduada fornecida pelo fabricante na embalagem original (regra prática: 0,1 mL/kg uma vez ao dia).',
      'Em cães, a metabolização é realizada pelo citocromo P450 (isoenzimas CYP3A4 e CYP3A5), exigindo atenção se combinado a inibidores enzimáticos (cetoconazol, diltiazem) ou indutores (fenobarbital).',
      'Lavar as mãos com água e sabão imediatamente após manusear e administrar o produto, pois a capromorelina pode sofrer absorção transdérmica acidental.',
    ],

    adverseEffects: [
      'Hipersalivação reativa e ptialismo transitório nos primeiros minutos após a aplicação oral em gatos (reação gustativa ao veículo ou sabor da formulação).',
      'Êmese e regurgitação nas primeiras horas da tomada (se o gato vomitar em até 15 minutos, a bula autoriza readministrar a dose).',
      'Letargia, sonolência, sedação leve e fraqueza motora transitória que atinge pico em 1 a 2 horas e regride em até 4 horas.',
      'Queda transitória da pressão arterial sistêmica (hipotensão leve a moderada) associada a bradicardia sinusal reflexa.',
      'Hiperglicemia assintomática passageira e glicosúria transitória por efeito somatotrófico sobre a homeostase de glicose.',
      'Alterações comportamentais transitórias em felinos sensíveis (miados frequentes, agitação e movimentos rápidos de cabeça).',
      'Diarreia e fezes amolecidas em tratamentos prolongados.',
    ],

    // 1. Quatro Pilares Terapêuticos
    pillars: [
      {
        title: 'Drive Orexigênico Direto',
        icon: 'Brain',
        desc: 'Ativação seletiva do receptor GHSR1a estimulando os neurônios NPY e AgRP no núcleo arqueado hipotalâmico, disparando o desejo natural e a busca por alimento.',
      },
      {
        title: 'Eixo Somatotrófico GH-IGF-1',
        icon: 'Dna',
        desc: 'Exocitose hipofisária de GH com indução de síntese hepática contínua de IGF-1, mantendo efeito anabólico tecidual e ganho de peso mesmo com meia-vida curta.',
      },
      {
        title: 'Ação Farmacológica Específica',
        icon: 'Target',
        desc: 'Diferencia-se de outros estimulantes de apetite por atuar na via biológica fisiológica da fome, em vez de depender de efeitos colaterais de anti-histamínicos ou antidepressivos.',
      },
      {
        title: 'Trate a Causa de Base Sempre',
        icon: 'AlertTriangle',
        desc: 'Estimulante de apetite não substitui hidratação, controle de uremia, analgesia ou quelantes de fósforo. Tratar a hiporexia e a nefropatia em paralelo.',
      },
    ],

    // 2. Resumo Rápido / Indicações Resumidas
    quickIndications: [
      {
        condition: 'Perda de Peso e Hiporexia em Gatos com DRC (Recomendação IRIS 2026)',
        species: 'cat',
        doseSummary: '2,0 mg/kg por via oral uma vez ao dia (q24h) | Elura 20 mg/mL = 0,1 mL/kg q24h',
        route: 'Oral (VO com seringa dosadora graduada)',
        duration: 'Uso contínuo conforme necessidade clínica e monitoramento de peso e massa muscular',
        clinicalContext:
          'Aprovado especificamente para ganho de peso em gatos com doença renal crônica. Administrar preferencialmente 30 minutos antes da refeição programada.',
      },
      {
        condition: 'Hiporexia e Inapetência em Cães (Indicação Canina Oficial)',
        species: 'dog',
        doseSummary: '3,0 mg/kg por via oral uma vez ao dia (q24h) | Entyce 30 mg/mL = 0,1 mL/kg q24h',
        route: 'Oral (VO)',
        duration: 'Ciclos de 4 a 14 dias ou conforme evolução clínica da patologia primária',
        clinicalContext:
          'Ensaio clínico randomizado comprovou melhora do apetite em 68,6% dos cães tratados e ganho ponderal significativo em comparação com o placebo.',
      },
      {
        condition: 'Suporte Nutricional e Caquexia em Felinos Idosos Hospitalizados',
        species: 'cat',
        doseSummary: '2,0 mg/kg por via oral uma vez ao dia (q24h)',
        route: 'Oral (VO)',
        duration: 'Durante internação hospitalar ou sob cuidados paliativos monitorados',
        clinicalContext:
          'Estimula a ingestão voluntária de calorias e minimiza o balanço nitrogenado negativo em pacientes frágeis com perda muscular crônica (sarcopenia).',
      },
    ],

    // 3. Indicações Completas e Detalhadas
    detailedIndications: [
      {
        id: 'ind-capromorelin-cat-ckd',
        indication: 'Manejo da Perda de Peso e Hiporexia em Gatos com Doença Renal Crônica (Consenso IRIS 2026)',
        clinicalContext:
          'A perda ponderal involuntária e a perda de massa muscular (caquexia urêmica e sarcopenia) são marcadores prognósticos negativos independentes em gatos com Doença Renal Crônica. A recomendação terapêutica oficial da International Renal Interest Society (IRIS 2026) passou a incluir expressamente a capromorelina entre as opções consagradas para o manejo de vômito, redução de apetite, náusea urêmica e perda de peso ou massa muscular em gatos com DRC. O ensaio clínico multicêntrico pivotal controlado por placebo de Wofford et al. (2025, JFMS) demonstrou que gatos com DRC e perda ponderal tratados com 2 mg/kg de capromorelina oral diária durante 55 dias ganharam em média +5,18% do peso corporal, enquanto o grupo placebo perdeu -1,65% (diferença líquida de +6,81%, p menor que 0,0001), correspondendo a um ganho médio de aproximadamente 250 g em animais de 3 a 5 kg.',
        species: 'cat',
        dose: '2,0 mg/kg (equivalente a 0,1 mL/kg da solução oral Elura 20 mg/mL)',
        route: 'Oral (VO administrado 30 minutos antes do alimento)',
        frequency: 'A cada 24 horas (q24h)',
        duration: 'Tratamento de manutenção contínuo avaliado semanalmente no início e mensalmente na rotina',
        mechanismOfAction:
          'Agonismo sobre receptores GHSR1a hipotalâmicos estimulando os circuitos NPY/AgRP da fome e induzindo liberação de GH/IGF-1 para preservar o anabolismo celular.',
        clinicalRationale:
          'A ingestão calórica adequada é essencial para prevenir lipidose hepática secundária à anorexia e mitigar a desnutrição proteico-calórica no paciente nefropata.',
        monitoring: 'Peso corporal semanal, escore de condição corporal (BCS), escore de massa muscular (MCS), pressão arterial, frequência cardíaca, glicemia e estadiamento IRIS.',
        referenceIds: ['ref-iris-2026-treatment-cats', 'ref-wofford-2025-pivotal-jfms', 'ref-plumbs-10th-capromorelin'],
        evidenceLevel: 'Nível 1b (Ensaio Clínico Randomizado Mascarado Multicêntrico) e Diretriz Internacional IRIS 2026',
      },
      {
        id: 'ind-capromorelin-dog-inappetence',
        indication: 'Estimulação do Apetite e Inapetência Aguda ou Crônica em Cães',
        clinicalContext:
          'A inapetência e a hiporexia são causas frequentes de desidratação, perda de massa magra e deterioração clínica em cães acometidos por neoplasias, insuficiências orgânicas e pós-operatórios complexos. A solução oral Entyce® 30 mg/mL é aprovada pela FDA especificamente para estimulação do apetite em cães. No ensaio clínico randomizado duplo-cego de Zollers et al. (2016), cães com apetite reduzido receberam 3 mg/kg de capromorelina oral q24h por 4 dias: 68,6% dos cães tratados apresentaram melhora documentada do apetite versus 44,6% no grupo placebo (p = 0,008), acompanhado de ganho significativo de peso corporal (+1,8% vs +0,1%, p menor que 0,001).',
        species: 'dog',
        dose: '3,0 mg/kg (equivalente a 0,1 mL/kg da solução oral Entyce 30 mg/mL)',
        route: 'Oral (VO)',
        frequency: 'A cada 24 horas (q24h)',
        duration: 'Ciclos de 4 a 14 dias; reavaliar a causa subjacente da anorexia',
        mechanismOfAction:
          'Estimulação de circuitos orexigênicos hipotalâmicos com liberação reflexa de GH e IGF-1 no organismo canino.',
        clinicalRationale:
          'Restaura a ingestão voluntária de nutrientes de forma rápida e segura sem causar a sedação profunda frequentemente observada com a mirtazapina.',
        monitoring: 'Apetite voluntário, peso corporal, hidratação, êmese e função hepática.',
        referenceIds: ['ref-zollers-2016-dog-appetite-jvim', 'ref-zollers-2017-beagle-feed-bmc', 'ref-plumbs-10th-capromorelin'],
        evidenceLevel: 'Nível 1b (Ensaio Clínico Randomizado Controlado Mascarado)',
      },
      {
        id: 'ind-capromorelin-cat-general-anorexia',
        indication: 'Estimulação do Apetite Extra-Rótulo em Gatos com Hiporexia Não Renal',
        clinicalContext:
          'O Plumb cita o uso extra-bula da capromorelina em felinos na faixa de 1,0 a 3,0 mg/kg VO a cada 24 horas por até 21 dias para controle de anorexia por causas diversas. Entretanto, o clínico deve ter rigor extremo para não prescrever o estimulante como substituto da investigação etiológica: pancreatite felina, colangio-hepatite, constipação crônica, doença periodontal dolorosa e corpos estranhos gastrointestinais devem ser identificados e tratados.',
        species: 'cat',
        dose: '1,0 a 2,0 mg/kg (dose padrão 2,0 mg/kg q24h com Elura)',
        route: 'Oral (VO)',
        frequency: 'A cada 24 horas (q24h)',
        duration: 'Até 14 a 21 dias enquanto se elucida e resolve a enfermidade primária',
        mechanismOfAction:
          'Mimetização do hormônio grelina ativando centros hipotalâmicos e promovendo o comportamento de ingestão alimentar.',
        clinicalRationale:
          'Prevenção da temida lipidose hepática felina em gatos com períodos prolongados de jejum voluntário.',
        monitoring: 'Consumo calórico diário, temperatura corporal, analgesia e exames de triagem.',
        referenceIds: ['ref-plumbs-10th-capromorelin', 'ref-wofford-2018-safety-cats'],
        evidenceLevel: 'Consenso Clínico Especializado / Farmacologia Aplicada',
      },
    ],

    // 4. Farmacocinética Clínica Detalhada (Zero Asteriscos Literais)
    pharmacokineticsData: {
      absorption:
        'A absorção após administração oral é rápida em ambas as espécies. Em cães em jejum recebendo a dose terapêutica de 3 mg/kg, a biodisponibilidade oral absoluta é de aproximadamente 44%, com tempo para concentração máxima (Tmax) entre 0,83 mais ou menos 0,58 horas e pico sérico (Cmax) de 330 mais ou menos 143 ng/mL. Em gatos recebendo 2 mg/kg em jejum, a absorção é ultra-rápida, com Tmax mediano de apenas 0,25 hora (faixa de 15 minutos a 1 hora) e Cmax de 59 mais ou menos 42 ng/mL. EFEITO DRÁSTICO DO ALIMENTO EM FELINOS: a administração do produto em gatos alimentados reduz a Cmax em cerca de 55% (cai para 28 ng/mL) e reduz a exposição sistêmica total (AUC) em 43% (de 83 para 51 ng h/mL), além de retardar o Tmax para 0,75 a 4 horas. Por essa razão clínica crítica, o Elura deve ser administrado preferencialmente em jejum cerca de 30 minutos antes da oferta de alimento.',
      distribution:
        'Apresenta lipofilicidade moderada (XLogP da base livre de 1,1) e área polar topológica de 117 Å². Em cães, o volume aparente de distribuição (Vd) é de aproximadamente 2,0 L/kg, refletindo ampla distribuição tecidual intracelular e tecidos periféricos. Em felinos, o Vd quantitativo exato não foi determinado com precisão por ausência de formulação intravenosa para cruzamento cinético. A taxa de ligação às proteínas plasmáticas em cães é intermediária, de cerca de 49%; em gatos, esse parâmetro não se encontra plenamente documentado.',
      metabolism:
        'Em cães, a metabolização é predominantemente hepática, mediada por oxidases do citocromo P450, principalmente pelas isoenzimas CYP3A4 e CYP3A5, gerando diversos metabólitos oxidativos. Em gatos, o metabolismo hepático também é o principal responsável pela inativação do composto; no entanto, as isoenzimas microssomais felinas específicas e suas participações quantitativas exatas ainda não foram isoladas, não devendo ser extrapoladas diretamente da biologia canina. Não ocorre acúmulo plasmático significativo com administrações diárias repetidas.',
      elimination:
        'Em cães, a depuração plasmática total é rápida, de 18,9 mL/min/kg (equivalente a 1.134 mL/kg/h), com meia-vida plasmática de eliminação de 1,19 mais ou menos 0,17 hora. A excreção dos radiomarcadores caninos em 72 horas ocorre em cerca de 62% pelas fezes (secreção biliar) e 37% pela urina. Em gatos em jejum, a meia-vida plasmática é igualmente curta, de 1,12 mais ou menos 0,16 hora. Apesar da meia-vida sérica curta de cerca de 1 hora em cães e gatos, o efeito biológico sobre o ganho de peso e o aumento das concentrações séricas de IGF-1 permanece ativo ao longo de 24 horas.',
      cnsPenetration:
        'Atravessa a barreira hematoencefálica o suficiente para atingir os receptores GHSR1a nos núcleos hipotalâmicos (núcleo arqueado), responsáveis pela indução orexigênica central.',
      plasmaBinding:
        'Aproximadamente 49% ligada a proteínas plasmáticas em cães; fração livre clinicamente ativa de cerca de 51%. Parâmetro específico felino ainda não quantificado de forma independente.',
      halfLife:
        'Cães: meia-vida plasmática de 1,19 mais ou menos 0,17 hora | Gatos: meia-vida plasmática de 1,12 mais ou menos 0,16 hora em jejum. Nota clínica: a curta meia-vida do fármaco não limita sua eficácia diária única, pois o estímulo do IGF-1 persiste por mais de 24 horas.',
    },

    // 5. Informações Gerais e Práticas (Info Tab)
    generalInfoData: {
      routesDetailed: [
        {
          route: 'Oral Exclusiva (VO com seringa dosadora graduada)',
          technique:
            'Retirar o volume prescrito com a seringa dosadora que acompanha o produto. Inserir suavemente pela lateral da cavidade oral do animal e administrar o líquido lentamente para evitar aspiração traqueal acidental. Administrar cerca de 30 minutos antes do oferecimento de alimento em esquemas de refeições programadas. Caso o animal vomite em até 15 minutos ou cuspa parte relevante do conteúdo, a dose pode ser readministrada.',
          nursingCare:
            'Após o uso, desmontar a seringa, lavar com água corrente morna, deixar secar separada e armazenar limpa. Lavar as mãos com sabão imediatamente após a manipulação pelo risco de absorção transdérmica humana.',
          limitations:
            'Proibido para uso intravenoso ou intramuscular. Não existem formulações injetáveis veterinárias aprovadas.',
        },
      ],
      dilutionGuide: {
        compatibleFluids: [
          'Não aplicável - Formulação exclusivamente oral em solução pronta para uso',
        ],
        incompatibleFluids: [
          'NUNCA converter ou misturar a solução oral com fluidos parenterais ou administrá-la por vias injetáveis (IV, IM, SC)',
        ],
        infusionRateGuidance:
          'Não aplicável para infusão intravenosa. Por via oral, administrar lentamente na comissura labial.',
        preparationNotes:
          'Armazenar o frasco fechado em temperatura ambiente (entre 15°C e 30°C), protegido do calor excessivo e da luz solar direta. Após a primeira abertura, o frasco de Elura mantém validade pelo período estipulado pelo fabricante (normalmente até 6 meses com rolha e tampa limpas). Não refrigerar e não congelar.',
      },
      pharmacologicalClassification: {
        receptorsAndSites: [
          {
            name: 'Receptor GHSR1a Hipotalâmico (Núcleo Arqueado)',
            type: 'Receptor Acoplado à Proteína G (GPCR - Galpha q/11)',
            action:
              'A capromorelina liga-se ao sítio ortostérico do GHSR1a com alta afinidade (Ki de 7 nM), ativando a via PLC-IP3-DAG e promovendo despolarização neuronal que ativa neurônios NPY/AgRP e inibe circuitos POMC.',
            clinicalEffect:
              'Desperta sensação imediata de fome, procura voluntária de alimento e aumento acentuado do consumo calórico diário.',
          },
          {
            name: 'Receptor GHSR1a Hipofisário (Somatotrófos Adeno-hipofisários)',
            type: 'Receptor Secretagogo de Hormônio do Crescimento',
            action:
              'Entrada rápida de íons cálcio estimulando a exocitose das vesículas de GH para a circulação sistêmica, que induz no fígado a síntese e secreção de IGF-1.',
            clinicalEffect:
              'Efeito anabólico proteico celular sustentado, reversão da caquexia muscular e ganho ponderal cumulativo.',
          },
        ],
        autonomicAndEndocrineEffects: [
          {
            system: 'Sistema Cardiovascular e Autonômico',
            effect: 'Queda Transitória de Pressão Arterial e Frequência Cardíaca',
            description:
              'Efeito vasodilatador e parassimpático temporário associado aos receptores periféricos da grelina, com nadir de pressão arterial e FC em 1 a 2 horas após a tomada.',
          },
          {
            system: 'Sistema Pancreático e Controle Glicêmico',
            effect: 'Elevação Transitória de Glicemia e Redução de Sensibilidade à Insulina',
            description:
              'A estimulação do eixo somatotrófico contrapõe a ação da insulina. Pode induzir hiperglicemia em animais predispostos e é contraindicado em acromegalia e diabetes mellitus.',
          },
        ],
      },
      speciesPeculiarities: [
        {
          species: 'cat',
          title: 'Gatos: Indicação Principal em DRC e Impacto Forte da Alimentação',
          description:
            'Aprovado especificamente para ganho de peso em felinos com DRC (Elura 20 mg/mL, 2 mg/kg = 0,1 mL/kg q24h). O alimento no estômago reduz a Cmax em 55% e a exposição sistêmica em 43%, tornando o jejum prévio de 30 minutos determinante para a eficácia. Pode apresentar hipersalivação transitória gustativa.',
        },
        {
          species: 'dog',
          title: 'Cães: Indicação em Inapetência Aguda e Metabolismo CYP3A',
          description:
            'Aprovado nos EUA para estimulação de apetite em cães (Entyce 30 mg/mL, 3 mg/kg = 0,1 mL/kg q24h). O metabolismo hepático depende ativamente das enzimas CYP3A4 e CYP3A5, requerendo cautela com inibidores enzimáticos concomitantes.',
        },
      ],
      prescriptionType:
        'Receituário simples do médico-veterinário (medicamento de uso veterinário exclusivo, não enquadrado nas listas restritivas de controle especial da Portaria 344/98).',
    },

    // 6. Módulo de Atenção e Segurança (Attention Tab)
    attentionData: {
      precautions: [
        {
          condition: 'Administração com Alimento (Efeito do Alimento na Absorção)',
          alertLevel: 'warning',
          physiologicalExplanation:
            'Em gatos, a presença de comida reduz a concentração plasmática máxima em 55% e a exposição sistêmica em 43%, podendo resultar em falha na estimulação do apetite.',
          clinicalAction:
            'Administrar rigorosamente em jejum, cerca de 30 minutos antes do fornecimento da refeição programada ao felino.',
        },
        {
          condition: 'Gatos Cardiopatas, Desidratados ou com Instabilidade Hemodinâmica',
          alertLevel: 'warning',
          physiologicalExplanation:
            'A capromorelina induz queda transitória da pressão arterial sistólica e da frequência cardíaca, com efeito máximo entre 1 e 2 horas após a administração e duração de até 4 horas.',
          clinicalAction:
            'Corrigir desidratação e hipovolemia antes de iniciar o fármaco. Usar com cautela extrema em pacientes em uso concomitante de anlodipino ou bloqueadores do SRAA.',
        },
        {
          condition: 'Hipersomatotropismo Felino (Acromegalia)',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A capromorelina estimula os somatotrófos da hipófise a secretar GH e aumenta os níveis séricos de IGF-1, agravando diretamente a patogenia da acromegalia.',
          clinicalAction:
            'Contraindicação absoluta. Em gatos diabéticos de difícil controle ou com fenótipo acromegálico, dosar IGF-1 antes de considerar estimulantes de apetite.',
        },
        {
          condition: 'Diabetes Mellitus Felino Ativo ou Histórico de Diabetes',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'O fármaco pode causar hiperglicemia e antagonizar a insulina. Estudos de segurança relatam caso de cetoacidose diabética fatal em gatos sob doses supraterapêuticas.',
          clinicalAction:
            'Evitar o uso em gatos diabéticos. Se estritamente necessário em casos excepcionais, monitorar curvas glicêmicas diárias e ajustar a dose de insulina.',
        },
        {
          condition: 'Doença Renal Crônica em Estágio Terminal (IRIS Estágio 4)',
          alertLevel: 'caution',
          physiologicalExplanation:
            'Apenas 1,1% dos gatos avaliados no ensaio clínico pivotal encontravam-se no estágio 4 da DRC. A segurança em uremia terminal não está bem documentada.',
          clinicalAction:
            'Estabilizar primeiro o paciente em crise urêmica com fluidoterapia e terapia antiemética antes de iniciar estimulantes de apetite. Considerar sondagem enteral.',
        },
      ],
      adverseEffectsDetailed: [
        {
          effect: 'Hipersalivação Reativa (Ptialismo Intenso)',
          frequency: 'common',
          mechanism: 'Reação reflexa à estimulação gustativa na mucosa oral felina provocada pelo veículo aromatizado',
          clinicalManagement: 'Tranquilizar o tutor de que o sinal desaparece espontaneamente em poucos minutos; aplicar lentamente na lateral da boca.',
        },
        {
          effect: 'Êmese e Regurgitação Precoce',
          frequency: 'common',
          mechanism: 'Estímulo reflexo gástrico ou sensibilidade esofágica em animais previamente nauseados',
          clinicalManagement: 'Se a êmese ocorrer em até 15 minutos, a dose pode ser readministrada; controlar náusea de base com maropitant ou ondansetron.',
        },
        {
          effect: 'Letargia e Sedação Transitória',
          frequency: 'common',
          mechanism: 'Efeito neuroautonômico central com pico de ação em 1 a 2 horas após a administração',
          clinicalManagement: 'Manter o paciente em repouso térmico e ambiente calmo até recuperação espontânea.',
        },
        {
          effect: 'Hipotensão e Bradicardia Sinusal',
          frequency: 'uncommon',
          mechanism: 'Ação vasomotora periférica mediada por receptores de grelina na vasculatura sistêmica',
          clinicalManagement: 'Avaliar perfusão, tempo de preenchimento capilar e pressão arterial; suspender se hipotensão sintomática.',
        },
        {
          effect: 'Hiperglicemia Transitória',
          frequency: 'uncommon',
          mechanism: 'Aumento na liberação de GH contrarregulador da insulina associado à modulação pancreática',
          clinicalManagement: 'Monitorar glicemia em jejum em pacientes idosos e suspender se glicosúria ou glicemia persistentemente elevada.',
        },
      ],
      doseReductionGuidelines: [
        {
          clinicalCondition: 'Gatos com DRC nos Estágios IRIS 1, 2 e 3',
          recommendedAdjustment: 'Manter a dose padrão recomendada de 2 mg/kg VO a cada 24 horas (0,1 mL/kg)',
          physiologicalRationale: 'O produto foi formulado e aprovado especificamente para gatos com DRC, não existindo redução percentual de dose recomendada por evidências.',
        },
        {
          clinicalCondition: 'Gatos com DRC no Estágio IRIS 4 Descompensado',
          recommendedAdjustment: 'Não há redução de dose validada; recomenda-se estabilização hemodinâmica antes do início',
          physiologicalRationale: 'Pacientes em crise urêmica aguda respondem mal a orexigênicos isolados; a prioridade clínica é fluidoterapia e suporte nutricional por sonda.',
        },
        {
          clinicalCondition: 'Insuficiência Hepática',
          recommendedAdjustment: 'Empregar com cautela; não há redução percentual pré-estabelecida',
          physiologicalRationale: 'Como o metabolismo é hepático, a depuração pode ser mais lenta, mas faltam dados quantitativos para estipular cortes fixos de dose.',
        },
        {
          clinicalCondition: 'Interrupção / Término do Tratamento (Desmame)',
          recommendedAdjustment: 'Não requer desmame gradual; o fármaco pode ser suspenso diretamente',
          physiologicalRationale: 'Devido à meia-vida de apenas 1,1 hora, não ocorre dependência física ou síndrome de abstinência com a suspensão.',
        },
      ],
      drugInteractionsDetailed: [
        {
          drugOrClass: 'Inibidores do Citocromo CYP3A (Cetoconazol, Itraconazol, Diltiazem, Eritromicina)',
          severity: 'moderate',
          clinicalEffect: 'Aumento da concentração sérica e da exposição sistêmica da capromorelina (documentado em cães)',
          pharmacologicalMechanism: 'Bloqueio da depuração oxidativa microssomal hepática mediada por CYP3A4 e CYP3A5.',
        },
        {
          drugOrClass: 'Indutores do Citocromo CYP3A (Fenobarbital, Rifampicina)',
          severity: 'moderate',
          clinicalEffect: 'Redução potencial da eficácia e aceleração da depuração do secretagogo',
          pharmacologicalMechanism: 'Aumento da transcrição e atividade das enzimas de biotransformação microssomais.',
        },
        {
          drugOrClass: 'Anti-hipertensivos e Vasodilatadores (Anlodipino, Telmisartana, Benazepril)',
          severity: 'moderate',
          clinicalEffect: 'Risco de potencialização da hipotensão arterial sistêmica nas primeiras 4 horas após a dose',
          pharmacologicalMechanism: 'Efeitos hipotensores aditivos entre a vasodilatação dos anti-hipertensivos e a queda transitória de PA da capromorelina.',
        },
      ],
    },

    // 7. Apresentações Comerciais
    presentations: [
      {
        id: 'pres-elura-20mg-ml',
        name: 'Elura™ 20 mg/mL Solução Oral para Gatos (Frasco com 15 mL)',
        brand: 'Elanco Saúde Animal (Uso Veterinário Oficial no Brasil)',
        form: 'liquid',
        route: 'Oral',
        commercialType: 'veterinary',
        concentrationOptions: [
          {
            id: 'conc-elura-20mg-ml',
            label: '20 mg/mL (0,1 mL/kg = 2 mg/kg)',
            unitValue: 20,
            unitLabel: 'mg/mL',
            isDefault: true,
          },
        ],
        calculatedMlPerKgFormula: 'dose / 20',
        packageDescription:
          'Frasco contendo 15 mL de solução oral límpida e incolor sabor baunilha, acompanhado de tampa dosadora com adaptador e seringa graduada com divisões de 0,1 mL.',
      },
      {
        id: 'pres-entyce-30mg-ml',
        name: 'Entyce® 30 mg/mL Solução Oral para Cães (Frascos de 10, 15 ou 30 mL)',
        brand: 'Elanco Animal Health (EUA)',
        form: 'liquid',
        route: 'Oral',
        commercialType: 'veterinary',
        concentrationOptions: [
          {
            id: 'conc-entyce-30mg-ml',
            label: '30 mg/mL (0,1 mL/kg = 3 mg/kg)',
            unitValue: 30,
            unitLabel: 'mg/mL',
            isDefault: true,
          },
        ],
        calculatedMlPerKgFormula: 'dose / 30',
        packageDescription:
          'Frascos com 10 mL, 15 mL ou 30 mL de solução oral para uso exclusivo em cães com seringa graduada.',
      },
    ],

    // 8. Regimes Posológicos Clínicos (Calculadora)
    doses: [
      {
        id: 'dose-capromorelin-feline-ckd',
        species: 'cat',
        indication: 'Perda de Peso e Hiporexia em Gatos com DRC (Recomendação IRIS 2026)',
        doseMin: 2,
        doseMax: 2,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (VO)',
        frequency: 'A cada 24 horas (q24h)',
        duration: 'Uso contínuo conforme necessidade clínica e monitoramento periódico',
        clinicalContext:
          'Administrar 0,1 mL/kg de Elura 20 mg/mL uma vez ao dia, preferencialmente 30 minutos antes do oferecimento de alimento.',
        monitoring: 'Peso corporal semanal, escore de massa muscular (MCS), pressão arterial e creatinina.',
        calculatorEnabled: true,
        presentationId: 'pres-elura-20mg-ml',
        presentationConcentrationId: 'conc-elura-20mg-ml',
      },
      {
        id: 'dose-capromorelin-canine-appetite',
        species: 'dog',
        indication: 'Hiporexia e Estimulação do Apetite em Cães',
        doseMin: 3,
        doseMax: 3,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (VO)',
        frequency: 'A cada 24 horas (q24h)',
        duration: 'Ciclos de 4 a 14 dias conforme orientação veterinária',
        clinicalContext:
          'Administrar 0,1 mL/kg de Entyce 30 mg/mL uma vez ao dia diretamente na cavidade oral.',
        monitoring: 'Consumo voluntário diário de alimento e evolução de peso corporal.',
        calculatorEnabled: true,
        presentationId: 'pres-entyce-30mg-ml',
        presentationConcentrationId: 'conc-entyce-30mg-ml',
      },
      {
        id: 'dose-capromorelin-feline-extra-label',
        species: 'cat',
        indication: 'Anorexia e Perda de Apetite por Outras Causas em Felinos (Uso Extra-Rótulo)',
        doseMin: 1,
        doseMax: 2,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (VO)',
        frequency: 'A cada 24 horas (q24h)',
        duration: 'Até 14 a 21 dias condicionado à elucidação da doença de base',
        clinicalContext:
          'Utilizado para prevenir lipidose hepática secundária enquanto se trata a causa primária da anorexia.',
        monitoring: 'Consumo alimentar, analgesia e marcadores de inflamação sistêmica.',
        calculatorEnabled: true,
        presentationId: 'pres-elura-20mg-ml',
        presentationConcentrationId: 'conc-elura-20mg-ml',
      },
    ],

    // 9. Tabela Prática de Peso e Calibrador (Regra 0,1 mL/kg)
    practicalWeightTable: {
      standardDoseText:
        'Regra prática de ouro: para ambas as formulações veterinárias originais, o volume a prescrever equivale a exatamente 0,1 mL por kg de peso corporal uma vez ao dia (q24h), pois a concentração comercial reflete a dose exata da espécie (Elura 20 mg/mL a 2 mg/kg no gato; Entyce 30 mg/mL a 3 mg/kg no cão).',
      headers: [
        'Peso do Paciente (kg)',
        'Dose em Felinos (Elura 2 mg/kg)',
        'Volume Elura 20 mg/mL',
        'Dose em Caninos (Entyce 3 mg/kg)',
        'Volume Entyce 30 mg/mL',
      ],
      rows: [
        { weight: '2 kg', totalDose: '4 mg', col1: '0,20 mL', col2: '6 mg', col3: '0,20 mL' },
        { weight: '3 kg', totalDose: '6 mg', col1: '0,30 mL', col2: '9 mg', col3: '0,30 mL' },
        { weight: '4 kg', totalDose: '8 mg', col1: '0,40 mL', col2: '12 mg', col3: '0,40 mL' },
        { weight: '5 kg', totalDose: '10 mg', col1: '0,50 mL', col2: '15 mg', col3: '0,50 mL' },
        { weight: '6 kg', totalDose: '12 mg', col1: '0,60 mL', col2: '18 mg', col3: '0,60 mL' },
        { weight: '8 kg', totalDose: '16 mg', col1: '0,80 mL', col2: '24 mg', col3: '0,80 mL' },
        { weight: '10 kg', totalDose: '20 mg', col1: '1,00 mL', col2: '30 mg', col3: '1,00 mL' },
        { weight: '20 kg', totalDose: '—', col1: '—', col2: '60 mg', col3: '2,00 mL' },
        { weight: '30 kg', totalDose: '—', col1: '—', col2: '90 mg', col3: '3,00 mL' },
        { weight: '40 kg', totalDose: '—', col1: '—', col2: '120 mg', col3: '4,00 mL' },
      ],
      dropletCalibrator: {
        title: 'Calibrador de Dosagem Oral em Seringa dosadora',
        concentration: 'Elura 20 mg/mL (Gatos) | Entyce 30 mg/mL (Cães)',
        dropletRatio: 'NÃO utilizar gotas orais (apenas seringa dosadora graduada em mL)',
        practicalRule:
          'Volume diário (mL) = peso do paciente (kg) x 0,1 mL | Cada marcação de 0,01 mL na seringa de Elura contém 0,2 mg de capromorelina.',
        note:
          'Administrar lentamente na comissura labial cerca de 30 minutos antes do oferecimento do alimento. Se ocorrer êmese em até 15 minutos, pode-se readministrar.',
      },
    },

    // 10. Modelo de Prescrição Veterinária Pronto
    samplePrescriptionText:
      'USO ORAL\n1. Elura™ 20 mg/mL Solução Oral (Capromorelina) — Frasco com 15 mL (Uso Veterinário)\n   - Administrar [VOLUME] mL ([DOSE_MG] mg de capromorelina, na proporção de 0,1 mL para cada 1 kg de peso corporal), por via oral, uma vez ao dia (a cada 24 horas), preferencialmente cerca de 30 minutos antes da refeição programada, durante o período orientado na avaliação clínica.\n   - Instruções ao tutor:\n     a) Utilizar exclusivamente a seringa dosadora graduada que acompanha o frasco.\n     b) Administrar lentamente pelo canto da boca do gato.\n     c) Caso o gato vomite nos primeiros 15 minutos após a administração, a dose pode ser repetida.\n     d) Lavar a seringa com água corrente e sabão neutro e secar antes de guardar.\n     e) Lavar bem as mãos após a administração.\n   - Monitoramento: acompanhar o peso corporal semanalmente, consumo de alimento e sinais de desidratação, fraqueza ou salivação excessiva.',

    // 11. Fundamentos Clínicos & Evidências Publicadas Comentadas (Zero Asteriscos)
    clinicalFoundationsData: [
      {
        id: 'cf-wofford-2025-pivotal',
        title: 'Ensaio Clínico Pivotal Randomizado em Gatos com DRC e Perda de Peso',
        narrative:
          'A perda ponderal progressiva em felinos com DRC está fortemente associada à mortalidade prematura. O estudo clínico randomizado, multicêntrico, controlado por placebo e duplo-cego conduzido por Wofford et al. (2025) avaliou 176 gatos com DRC confirmada e perda ponderal de pelo menos 5%. Os animais receberam 2 mg/kg de capromorelina oral q24h ou placebo durante 55 dias. Na população de eficácia (n = 112), os gatos tratados com capromorelina apresentaram um ganho médio de peso de +5,18%, enquanto o grupo placebo apresentou perda contínua de peso de -1,65% (diferença líquida de +6,81%, intervalo de confiança de 95%: 4,21% a 9,42%, p menor que 0,0001). Esse ganho correspondeu em média a um acréscimo de cerca de 250 gramas em gatos de 3 a 5 kg, revertendo a trajetória de depleção corporal.',
        narrativeHighlights: ['ganho de +5,18% de peso', 'diferença líquida de +6,81%', 'p menor que 0,0001', '176 gatos com DRC'],
        studies: [
          {
            citation: 'Wofford JA, Milliken MacKinnon A, Heinen E. J Feline Med Surg. 2025;27(11). doi: 10.1177/1098612X251379924.',
            referenceId: 'ref-wofford-2025-pivotal-jfms',
            sourceType: 'Ensaio Clínico Randomizado Mascarado Multicêntrico',
            summaryText:
              'Estudo pivotal em 176 gatos com DRC e perda ponderal com acompanhamento por 55 dias. A capromorelina promoveu ganho de peso de +5,18% contra perda de -1,65% no grupo controle (p menor que 0,0001).',
            summaryHighlights: ['+5,18% de ganho de peso', 'p < 0,0001', '55 dias de tratamento'],
            metrics: ['n = 176 gatos com DRC', 'Diferença: +6,81% de peso', 'Acréscimo médio ~250 g'],
            clinicalConclusion:
              'Comprova a eficácia clínica robusta no aumento de peso corporal em gatos renais e fundamenta a inclusão da droga nas recomendações IRIS 2026.',
          },
        ],
      },
      {
        id: 'cf-wofford-2018-safety',
        title: 'Avaliação da Segurança de Doses Supraterapêuticas em Felinos',
        narrative:
          'A caracterização toxicológica e de margem de segurança da capromorelina em felinos foi investigada por Wofford et al. (2018) em dois protocolos laboratoriais com doses supraterapêuticas: um estudo de 14 dias com doses de 9, 15, 30 e 60 mg/kg q24h (até 30 vezes a dose terapêutica), e um estudo de segurança de 91 dias com 6 mg/kg q24h (3 vezes a dose terapêutica) versus placebo. Os efeitos adversos mais frequentes foram hipersalivação transitória, êmese e letargia transitória. O estudo comprovou que a dose terapêutica de 2 mg/kg apresenta ampla margem de tolerância clínica, embora doses extremas sustentadas por 6 meses tenham revelado o potencial de desencadear hiperglicemia e cetoacidose em animais vulneráveis.',
        narrativeHighlights: ['ampla margem de segurança', 'doses de até 60 mg/kg', 'hipersalivação transitória'],
        studies: [
          {
            citation: 'Wofford JA, Zollers B, Rhodes L, et al. J Vet Pharmacol Ther. 2018;41(2):324-333.',
            referenceId: 'ref-wofford-2018-safety-cats',
            sourceType: 'Estudo Experimental de Segurança e Toxicologia',
            summaryText:
              'Avaliação de segurança com doses de até 30 vezes a dose clínica durante 14 dias e 3 vezes a dose clínica por 91 dias em gatos. Hipersalivação e vômitos foram os sinais dose-dependentes mais frequentes.',
            summaryHighlights: ['até 30 vezes a dose clínica', 'boa tolerabilidade sistêmica', 'pico de letargia precoce'],
            metrics: ['Doses: 2 a 60 mg/kg', '91 dias de seguimento', 'Segurança confirmada a 2 mg/kg'],
            clinicalConclusion:
              'Confirma a segurança da dose diária de 2 mg/kg em felinos e alerta para a necessidade de atenção à glicemia em tratamentos prolongados.',
          },
        ],
      },
      {
        id: 'cf-zollers-2016-dog-rct',
        title: 'Ensaio Clínico Mascarado em Cães Apresentando Apetite Reduzido',
        narrative:
          'A eficácia canina do secretagogo foi estabelecida por Zollers et al. (2016) em um estudo clínico prospectivo, randomizado, multicêntrico e mascarado com 177 cães apresentando inapetência natural secundária a doenças diversas. Os animais receberam capromorelina 3 mg/kg VO q24h ou placebo por 4 dias. Na avaliação dos proprietários, 68,6% dos cães que receberam capromorelina apresentaram melhora evidente do apetite, comparado a 44,6% no grupo placebo (p = 0,008). Além disso, os cães tratados obtiveram ganho médio de peso corporal de +1,8% vs +0,1% no grupo controle (p menor que 0,001), validando o uso do Entyce na rotina clínica canina.',
        narrativeHighlights: ['melhora do apetite em 68,6%', 'p = 0,008', 'ganho de peso de +1,8%'],
        studies: [
          {
            citation: 'Zollers B, Wofford JA, Heinen E, et al. J Vet Intern Med. 2016;30(6):1851-1857.',
            referenceId: 'ref-zollers-2016-dog-appetite-jvim',
            sourceType: 'Ensaio Clínico Randomizado Controlado por Placebo',
            summaryText:
              'Ensaio clínico em 177 cães inapetentes. A capromorelina a 3 mg/kg q24h superou significativamente o placebo tanto no aumento de apetite quanto no ganho de peso corporal em 4 dias.',
            summaryHighlights: ['177 cães inapetentes', '68,6% de resposta positiva', 'p = 0,008'],
            metrics: ['n = 177 cães', '68,6% melhora vs 44,6% placebo', 'p = 0,008'],
            clinicalConclusion:
              'Fornece respaldo de nível 1b para a eficácia da capromorelina na estimulação voluntária rápida do apetite em cães.',
          },
        ],
      },
      {
        id: 'cf-zollers-2017-beagle-feed',
        title: 'Aumento do Consumo Energético Controlado e do Peso em Cães Saudáveis',
        narrative:
          'Em ensaio controlado de consumo alimentar conduzido por Zollers et al. (2017), 24 cães da raça Beagle receberam capromorelina 3 mg/kg q24h ou placebo durante 4 dias com oferta irrestrita de alimento monitorada em gramas. Os cães do grupo capromorelina aumentaram o consumo alimentar médio em +60,55 mais ou menos 39,87%, enquanto o grupo placebo apresentou oscilação de -11,15 mais ou menos 14,23% (p menor que 0,001). Consequentemente, o peso corporal dos cães tratados elevou-se em +5,96% em apenas 4 dias, comprovando o potente estímulo orexigênico direto do agonista.',
        narrativeHighlights: ['aumento de +60,5% no consumo alimentar', 'p menor que 0,001', 'elevação de +5,96% no peso'],
        studies: [
          {
            citation: 'Zollers B, Rhodes L, Heinen E. BMC Vet Res. 2017;13:10. doi: 10.1186/s12917-016-0925-z.',
            referenceId: 'ref-zollers-2017-beagle-feed-bmc',
            sourceType: 'Ensaio Experimental Controlado por Placebo',
            summaryText:
              'Estudo com 24 cães Beagle avaliando consumo voluntário de ração. O grupo tratado aumentou em 60,5% o volume ingerido em relação ao placebo em 4 dias.',
            summaryHighlights: ['+60,5% de consumo de ração', '+5,96% de ganho de peso', 'p < 0,001'],
            metrics: ['n = 24 Beagles', '+60,5% ingestão calórica', 'Duração: 4 dias'],
            clinicalConclusion:
              'Demonstra a potência do estímulo orexigênico hipotalâmico induzido pela ativação do GHSR1a na espécie canina.',
          },
        ],
      },
      {
        id: 'cf-zollers-2017-gh-igf1',
        title: 'Sustentação do Eixo GH-IGF-1 e Efeito Anabólico Prolongado',
        narrative:
          'Uma questão farmacológica central da capromorelina é explicar como uma droga com meia-vida sérica de apenas 1,1 hora é capaz de produzir ganho de peso sustentado com administração diária única. O estudo mecanístico de Zollers et al. (2017) em cães Beagles demonstrou que a capromorelina estimula um pico transitório de liberação de GH (que retorna à linha de base em cerca de 8 horas), mas induz uma elevação mantida e estatisticamente significativa das concentrações séricas de IGF-1 ao longo de todos os 7 dias de avaliação. Como o IGF-1 é o mediador chave do anabolismo celular e da retenção proteica, esse efeito biológico estendido explica o ganho de massa corporal duradouro.',
        narrativeHighlights: ['elevação sustentada de IGF-1 por 7 dias', 'pico transitório de GH', 'anabolismo proteico contínuo'],
        studies: [
          {
            citation: 'Zollers B, Rhodes L, Smith RG. J Vet Pharmacol Ther. 2017;40(2):140-147.',
            referenceId: 'ref-zollers-2017-gh-igf1-jvpt',
            sourceType: 'Estudo Farmacodinâmico do Eixo Endócrino',
            summaryText:
              'Demonstração da dinâmica temporal do GH e do IGF-1 após capromorelina em cães. O GH apresentou pulso rápido e o IGF-1 permaneceu elevado durante todo o tratamento.',
            summaryHighlights: ['IGF-1 mantido elevado', 'pico de GH rápido', 'explicação farmacodinâmica da dose q24h'],
            metrics: ['Pulso de GH em 1 a 2h', 'IGF-1 sustentado por 7 dias', 'Dose: 3 mg/kg q24h'],
            clinicalConclusion:
              'Elucida o mecanismo molecular pelo qual a posologia q24h é clinicamente efetiva apesar da rápida meia-vida plasmática da molécula.',
          },
        ],
      },
    ],

    // 12. Referências Bibliográficas Completas
    references: [
      {
        id: 'ref-iris-2026-treatment-cats',
        citationText:
          'International Renal Interest Society (IRIS). IRIS Treatment Recommendations for CKD in Cats (2026 Update). IRIS Kidney Guidelines, pp. 1-8; 2026.',
        sourceType: 'Consenso Internacional Especializado (IRIS)',
        url: 'https://www.iris-kidney.com/',
        evidenceLevel: 'Consenso Padrão Ouro Internacional IRIS',
      },
      {
        id: 'ref-wofford-2025-pivotal-jfms',
        citationText:
          'Wofford JA, Milliken MacKinnon A, Heinen E. Capromorelin promotes weight gain in cats with unintended weight loss: a randomized, masked, placebo-controlled clinical trial. J Feline Med Surg. 2025;27(11). doi: 10.1177/1098612X251379924.',
        sourceType: 'Ensaio Clínico Pivotal Randomizado Mascarado',
        url: 'https://pubmed.ncbi.nlm.nih.gov/41204815/',
        evidenceLevel: 'Nível 1b (Ensaio Clínico Randomizado Controlado)',
      },
      {
        id: 'ref-wofford-2018-safety-cats',
        citationText:
          'Wofford JA, Zollers B, Rhodes L, Bell M, Heinen E. Evaluation of the safety of daily administration of capromorelin in cats. J Vet Pharmacol Ther. 2018;41(2):324-333. doi: 10.1111/jvp.12459.',
        sourceType: 'Estudo Experimental de Segurança e Toxicologia Felina',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29057482/',
        evidenceLevel: 'Nível 1b (Estudo Laboratorial de Segurança)',
      },
      {
        id: 'ref-zollers-2016-dog-appetite-jvim',
        citationText:
          'Zollers B, Wofford JA, Heinen E, Huebner M, Rhodes L. A Prospective, Randomized, Masked, Placebo-Controlled Clinical Study of Capromorelin in Dogs with Reduced Appetite. J Vet Intern Med. 2016;30(6):1851-1857. doi: 10.1111/jvim.14607.',
        sourceType: 'Ensaio Clínico Randomizado Canino',
        url: 'https://pubmed.ncbi.nlm.nih.gov/27859746/',
        evidenceLevel: 'Nível 1b (Ensaio Clínico Randomizado Controlado)',
      },
      {
        id: 'ref-zollers-2017-beagle-feed-bmc',
        citationText:
          'Zollers B, Rhodes L, Heinen E. Capromorelin oral solution (ENTYCE®) increases food consumption and body weight when administered for 4 consecutive days to healthy adult Beagle dogs in a randomized, masked, placebo controlled study. BMC Vet Res. 2017;13:10. doi: 10.1186/s12917-016-0925-z.',
        sourceType: 'Ensaio Experimental de Consumo Alimentar Controlado',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28056951/',
        evidenceLevel: 'Nível 1b (Estudo Experimental Mascarado)',
      },
      {
        id: 'ref-zollers-2017-gh-igf1-jvpt',
        citationText:
          'Zollers B, Rhodes L, Smith RG. Capromorelin increases food consumption, body weight, growth hormone, and sustained insulin-like growth factor 1 concentrations when administered to healthy adult Beagle dogs. J Vet Pharmacol Ther. 2017;40(2):140-147. doi: 10.1111/jvp.12344.',
        sourceType: 'Estudo Farmacodinâmico do Eixo GH-IGF-1',
        url: 'https://pubmed.ncbi.nlm.nih.gov/27597271/',
        evidenceLevel: 'Nível 1b (Farmacodinâmica Translacional)',
      },
      {
        id: 'ref-plumbs-10th-capromorelin',
        citationText:
          'Plumb DC. Plumb\'s Veterinary Drug Handbook, 10th ed. Capromorelin monograph, pp. 182-184. Wiley-Blackwell; 2023.',
        sourceType: 'Formulário Farmacológico Padrão Ouro Internacional',
        url: 'https://www.wiley.com/en-us/Plumb%27s+Veterinary+Drug+Handbook-p-9781119846222',
        evidenceLevel: 'Padrão Ouro Internacional',
      },
      {
        id: 'ref-dailymed-elura-fda',
        citationText:
          'U.S. Food and Drug Administration (FDA) / DailyMed. Elura (capromorelin oral solution) - Full Prescribing Information and Pharmacokinetics. NADA 141-536; 2020.',
        sourceType: 'Bula Oficial de Aprovação Regulatória FDA',
        url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=be4beb9c-f39b-4b23-9c35-f72a049a3250',
        evidenceLevel: 'Documentação Regulatória Oficial',
      },
    ],

    genericBrandsNote:
      'A capromorelina é comercializada exclusivamente como especialidade farmacêutica veterinária. No Brasil, está disponível pela Elanco Saúde Animal sob a marca Elura™ 20 mg/mL solução oral para gatos (frasco de 15 mL com seringa dosadora). Nos Estados Unidos, a versão para cães é comercializada como Entyce® 30 mg/mL solução oral. Não existem marcas genéricas registradas ou apresentações comercializadas para medicina humana.',

    // 13. Avisos Clínicos Importantes Específicos
    clinicalWarningItems: [
      {
        label: 'Administrar em Jejum (30 min antes da refeição):',
        text: 'Em gatos, a presença de alimento no estômago reduz a Cmax em 55% e a exposição sistêmica (AUC) em 43%. Administrar sempre 30 minutos antes do oferecimento da refeição para garantir a eficácia do tratamento.',
      },
      {
        label: 'Monitorar Pressão Arterial e Frequência Cardíaca:',
        text: 'A capromorelina induz queda transitória da pressão arterial e bradicardia sinusal nas primeiras 1 a 4 horas após a dose. Usar de extrema cautela em animais desidratados, hipovolêmicos ou em tratamento concomitante com anti-hipertensivos.',
      },
      {
        label: 'Cuidado com Glicemia e Diabetes:',
        text: 'Por estimular o eixo somatotrófico, pode induzir hiperglicemia e resistência insulínica. É contraindicado em gatos com acromegalia (hipersomatotropismo) e em portadores de diabetes mellitus ativo ou histórico de cetoacidose.',
      },
    ],

    relatedDiseaseSlugs: [],
    isControlled: false,
    isPublished: true,
    source: 'seed',
  },
];

export const capromorelinaMedicationRecord = capromorelinaMedicationsSeed[0];
