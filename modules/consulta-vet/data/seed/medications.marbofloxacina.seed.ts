import type { MedicationRecord } from '../../types/medication';

export const marbofloxacinaMedicationsSeed: MedicationRecord[] = [
  {
    id: 'med-marbofloxacina',
    slug: 'marbofloxacina',
    title: 'Marbofloxacina',
    activeIngredient: 'Marbofloxacina / Marbofloxacino',
    pharmacologicClass:
      'Antibacteriano bactericida da classe das fluoroquinolonas (inibidor da DNA-girase e topoisomerase IV); ação concentração-dependente com efeito pós-antibiótico',
    species: ['dog', 'cat'],
    category: 'infectologia',
    tags: [
      'Marbofloxacina',
      'Marbofloxacino',
      'Fluoroquinolonas',
      'Marbopet',
      'Marbocyl P',
      'Marbox-Leish',
      'Bactericida Concentração-Dependente',
      'Pielonefrite',
      'Prostatite Canina',
      'Mycoplasma haemofelis',
      'Leishmaniose Canina',
      'ISCAID 2025',
      'Antimicrobial Stewardship',
    ],
    tradeNames: [
      'Marbopet® Comprimidos Palatáveis 27,5 mg e 82,5 mg (Ceva Saúde Animal — MAPA nº 9.507)',
      'Marbocyl® P Comprimidos Palatáveis Sulcados 5 mg, 20 mg e 80 mg (Vetoquinol Brasil — MAPA SP 000376-0.000001)',
      'Marbox-Leish® Comprimidos Palatáveis 20 mg e 60 mg (Ceva Saúde Animal — MAPA MG 000022-0.000020)',
      'Marbocyl® Solução Injetável 10% ou 2% (Uso Parenteral — Referência Internacional / BSAVA)',
    ],
    officialSiteUrl: 'https://www.ceva.com.br/Produtos/Lista-de-Produtos/MARBOPET',
    leafletUrl: 'https://www.ceva.com.br/content/download/5480/file/Bula%20-%20MARBOPET.pdf',
    mechanismOfAction:
      'A marbofloxacina é uma fluoroquinolona sintética bactericida de uso exclusivamente veterinário desenvolvida especificamente para pequenos animais (fórmula molecular C₁₇H₁₉FN₄O₄; peso molecular 362,36 g/mol). Sua estrutura química anfotérica possui grupos funcionais carboxila em C-3 e carbonila/cetona em C-4 essenciais para a coordenação ao complexo enzimático bacteriano, com pKa de aproximadamente 5,38 e 6,16 e logP experimental de ~0,26, conferindo excelente penetração tecidual e celular. Atua estabilizando os complexos de clivagem DNA–topoisomerase após a quebra transitória fisiológica das fitas duplas do DNA bacteriano, impedindo sua religação catalítica. Em bactérias Gram-negativas, seu alvo primário predominante é a subunidade GyrA da DNA-girase (topoisomerase II bacteriana), responsável por aliviar a tensão de torção durante a replicação e transcrição; a topoisomerase IV atua como alvo secundário. Em bactérias Gram-positivas, a inibição da topoisomerase IV (subunidades ParC/ParE) assume relevância concorrente ou prioritária na decatenação cromossômica. A persistência do complexo clivado gera quebras cromossômicas irreversíveis em fita dupla, colapso imediato da replicação e parada da transcrição de RNA, desencadeando despolarização e morte bactericida rápida em 20 a 30 minutos de exposição celular. Apresenta perfil farmacodinâmico estritamente concentração-dependente, sendo os índices Cmax/MIC (alvo ideal entre 8 e 10 a 12) e AUC24/MIC (ou fAUC24/MIC > 72 a 125) os determinantes clínicos primários de eficácia e de prevenção da seleção de mutantes resistentes, sustentando regimes posológicos de dose diária única (q24h). Possui expressivo efeito pós-antibiótico (PAE), mantendo a supressão do crescimento microbiano residual mesmo após a concentração sérica declinar temporariamente.',
    plainLanguageSummary:
      'A marbofloxacina é um antibiótico bactericida veterinário moderno de alta potência pertencente à classe das fluoroquinolonas. É considerada uma opção de segunda ou terceira linha, reservada para infecções graves onde exames de cultura e antibiograma comprovam sua necessidade (como infecções renais profundas/pielonefrites, infecções prostáticas, pneumonias graves, piodermites complicadas e na micoplasmose felina resistente à doxiciclina). No Brasil, possui também apresentação registrada para o controle clínico da leishmaniose visceral canina. Possui excelente absorção por via oral (quase 100%) e atua de forma concentração-dependente, devendo ser administrada em dose total uma única vez ao dia (a cada 24 horas). Não deve ser empregada em cães filhotes durante o crescimento esquelético pelo risco de danos às cartilagens articulares, e exige separação de pelo menos 2 horas em relação a protetores gástricos (sucralfato) ou suplementos minerais (ferro, cálcio, zinco).',

    indications: [
      'Pielonefrite bacteriana aguda e crônica em cães e gatos, considerada opção racional de primeira linha empírica imediata pelo consenso ISCAID devido à potente atividade contra Enterobacterales e alta concentração ativa no parênquima renal e urina.',
      'Prostatite bacteriana canina aguda e crônica e abscessos prostáticos por bacilos Gram-negativos suscetíveis, devido à baixa ligação proteica, elevada lipofilia e excelente penetração e aprisionamento através da barreira hemato-prostática.',
      'Pneumonias bacterianas graves e infecções respiratórias inferiores em cães por patógenos suscetíveis (Bordetella bronchiseptica, Mycoplasma spp., Pasteurella multocida e enterobactérias Gram-negativas).',
      'Piodermite bacteriana profunda canina por Staphylococcus pseudintermedius comprovadamente suscetível em cultura e antibiograma após falha ou contraindicação a fármacos de primeira linha, devendo ser utilizada na dose de 5,5 mg/kg q24h (ISCAID 2025).',
      'Cistite bacteriana esporádica em cães quando orientada por antibiograma demonstrando resistência às classes de primeira escolha (amoxicilina ou sulfas), empregando cursos contemporâneos curtos de 3 a 5 dias (ISCAID 2019).',
      'Micoplasmose hemotrópica felina (Mycoplasma haemofelis) recorrente ou persistente com carga bacterêmica positiva em PCR após protocolo de doxiciclina, como terapia de resgate para clearance do microrganismo (consenso ABCD 2026).',
      'Remissão da sintomatologia clínica de cães acometidos por Leishmaniose Visceral Canina (LVC) leve a moderada, conforme produto registrado no MAPA (Marbox-Leish®) e Diretrizes Brasileish 2025 (2 mg/kg q24h por 28 dias).',
    ],

    contraindications: [
      'Hipersensibilidade conhecida à marbofloxacina ou a outros antimicrobianos da classe das fluoroquinolonas.',
      'Cães jovens durante a fase de crescimento rápido do esqueleto: contraindicado em raças pequenas e médias até 8 meses de idade; portes grandes até 12 meses; raças gigantes até 18 meses (risco de condrotoxicidade, vesículas articulares e artropatia erosiva permanente nas cartilagens de sustentação de carga).',
      'Gatos jovens com menos de 16 semanas de idade (ausência de dados de segurança articular e esquelética nessa faixa).',
      'Fêmeas gestantes e lactantes (atravessa barreira placentária e é excretada no leite, com risco potencial de toxicidade condral para fetos e neonatos).',
      'Monoterapia empírica em infecções bacterianas causadas primariamente por anaeróbios obrigatórios (como Bacteroides spp. e Clostridium spp.) ou Enterococcus spp., contra as quais a marbofloxacina possui atividade microbiológica inadequada/imprevisível (o ISCAID desaconselha formalmente para enterococos urinários).',
      'Uso empírico indiscriminado em piodermites superficiais não complicadas (onde a terapia tópica é a primeira escolha mandatória pelo ISCAID 2025) ou em cistites esporádicas simples sem cultura prévia.',
      'Pacientes com histórico de tendinopatias prévias ou em terapia simultânea com corticosteroides em doses imunossupressoras pelo risco elevado de tendinite ou ruptura tendínea.',
    ],

    cautions: [
      'Princípios de Antimicrobial Stewardship: a marbofloxacina é um antimicrobiano veterinário de importância crítica e seu uso deve ser rigorosamente respaldado por cultura e teste de sensibilidade aos antimicrobianos (AST). Não deve ser prescrita com base em raciocínio empírico de "antibiótico mais forte".',
      'Regra estrita das 2 horas contra quelação intraluminal: nunca administrar concomitantemente com sucralfato, antiácidos contendo hidróxido de alumínio ou magnésio, carbonato de cálcio, sulfato ferroso ou sais de zinco; os cátions metálicos bivalentes e trivalentes quelam a molécula de marbofloxacina formando precipitados insolúveis e anulando a absorção intestinal.',
      'Pacientes epilépticos ou com disfunções do SNC: fluoroquinolonas atuam como antagonistas inibitórios sobre os receptores GABA no sistema nervoso central, reduzindo o limiar convulsivo; utilizar com cautela redobrada em epilépticos e evitar associação simultânea com AINEs.',
      'Diferenciação de segurança retiniana felina: diferentemente da enrofloxacina, a marbofloxacina não possui toxicidade retiniana ou cegueira comprovada em doses habituais em felinos; contudo, a precaução de classe recomenda respeitar as faixas posológicas recomendadas e monitorar reflexo pupilar em gatos debilitados.',
      'Manejo na doença renal crônica: embora possua cerca de 40% de eliminação renal na forma inalterada ativa, estudos controlados em cães com comprometimento renal leve a moderado (IRIS 1 e 2) demonstraram ausência de acúmulo tóxico clinicamente significativo, não justificando subdosagem automática empírica; em estágios graves (IRIS 3-4, oligúria/anúria), monitorar creatinina e considerar espaçamento de intervalo em vez de redução da dose de pico.',
      'Interação farmacocinética com teofilina: em cães, a marbofloxacina reduz o clearance da teofilina em aproximadamente 26%, podendo elevar seus níveis séricos e desencadear taquicardia, agitação ou convulsões; monitorar clinicamente.',
      'Alerta na Leishmaniose Canina: a marbofloxacina promove remissão clínica e queda da carga parasitária, mas não produz esterilização biológica nem cura microbiológica da Leishmania infantum; recaídas clínicas são frequentes (mediana de 5,5 meses após o término) e o curso prolongado de 28 dias impõe pressão de seleção sobre a microbiota bacteriana do paciente.',
    ],

    adverseEffects: [
      'Distúrbios gastrintestinais comuns (hiporexia transitória, vômito, náusea, fezes amolecidas e diarreia), decorrentes de irritação direta da mucosa ou perturbação do microbioma entérico comensal.',
      'Artropatia articular em cães jovens em fase de crescimento acelerado (manifestada por claudicação, dor articular, efusão sinovial e erosões cartilaginosas bolhosas).',
      'Tendinopatias e tendinites (efeito de classe das fluoroquinolonas, com risco aumentado sob uso concomitante de glicocorticoides).',
      'Efeitos neuroexcitatórios paroxísticos raros (tremores, agitação psicomotora, despolarizações epileptiformes em animais predispostos).',
      'Elevações discretas e transitórias de enzimas hepáticas (ALT, fosfatase alcalina) em tratamentos prolongados.',
      'Reações de hipersensibilidade cutânea ou angioedema em animais hiper-reativos.',
      'Sinais de superdosagem maciça em cães (> 55 mg/kg/dia): hipersalivação, hiperemia cutânea, edema facial, tremores e apatia severa (tratamento sintomático e suporte hidroeletrolítico; não há antídoto).',
    ],

    routes: ['oral', 'iv', 'sc'],

    doses: [
      {
        id: 'dose-marbo-dog-piodermite-iscaid',
        species: 'dog',
        indication:
          'Piodermite bacteriana profunda canina por Staphylococcus spp. (com AST favorável e indicação de FQ)',
        doseMin: 5.5,
        doseMax: 5.5,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral',
        frequency: 'A cada 24 horas (q24h)',
        duration: 'Superficial: avaliar em 2 semanas | Profunda: avaliar em 3 semanas',
        notes:
          'ISCAID 2025: dose mínima mandatória de 5,5 mg/kg q24h para atingir AUC/MIC bactericida contra Staphylococcus pseudintermedius (a dose baixa de 2 mg/kg pode ser subinibitória e selecionar mutantes resistentes). Piodermite superficial deve receber terapia tópica como 1ª linha.',
        clinicalContext:
          'Diretrizes Internacionais ISCAID 2025. Reservar exclusivamente para infecções cutâneas com cultura demonstrando suscetibilidade e refratariedade a beta-lactâmicos.',
        monitoring:
          'Citologia cutânea seriada, inspeção clínica das lesões e tolerância digestiva. Reavaliar antes de estender o tratamento.',
        calculatorEnabled: true,
        referenceIds: ['iscaid-pyoderma-guidelines-2025', 'plumb-marbofloxacin-10ed'],
        evidenceLevel: 'Diretriz de Consenso Internacional ISCAID 2025 / Nível 1',
      },
      {
        id: 'dose-marbo-dog-cistite-resistente',
        species: 'dog',
        indication:
          'Cistite bacteriana esporádica em cães orientada por cultura (isolados multirresistentes a 1ª linha)',
        doseMin: 2.75,
        doseMax: 5.5,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral',
        frequency: 'A cada 24 horas (q24h)',
        duration: '3 a 5 dias consecutivos',
        notes:
          'DURAÇÃO CONTEMPORÂNEA: 3 a 5 dias conforme consenso ISCAID 2019 e Plumb 10ª ed. Bulas históricas recomendavam 10 a 30 dias, diretriz abandonada no stewardship moderno. Não utilizar de forma empírica em cistite simples.',
        clinicalContext:
          'Infecção bacteriana do trato urinário inferior esporádica com perfil microbiológico resistente comprovado em urocultura.',
        monitoring:
          'Resolução dos sinais de disúria, hematúria e polaciúria; urocultura de controle se houver persistência.',
        calculatorEnabled: true,
        referenceIds: ['iscaid-uti-guidelines-2019', 'plumb-marbofloxacin-10ed'],
        evidenceLevel: 'Diretriz de Consenso Internacional ISCAID 2019 e Plumb 10ª ed.',
      },
      {
        id: 'dose-marbo-dog-cat-pielonefrite',
        species: 'both',
        indication:
          'Pielonefrite bacteriana aguda e crônica em cães e gatos (Enterobacterales e bacilos Gram-negativos)',
        doseMin: 2.7,
        doseMax: 5.5,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral',
        frequency: 'A cada 24 horas (q24h)',
        duration: '10 a 14 dias',
        notes:
          'A marbofloxacina é considerada pelo ISCAID opção racional de primeira linha empírica enquanto se aguarda antibiograma por sua potente ação contra Enterobacterales, alta penetração tecidual no parênquima renal e expressiva excreção ativa urinária (~40%). Duração clássica de 4-6 semanas foi substituída por cursos de 10-14 dias.',
        clinicalContext:
          'Infecção do parênquima renal com azotemia inflamatória, febre ou piúria ativa.',
        monitoring:
          'Ureia, creatinina, SDMA, urinálise seriada, urocultura confirmatória em 72h e nova cultura 1 a 2 semanas após o término da terapia.',
        calculatorEnabled: true,
        referenceIds: ['iscaid-uti-guidelines-2019', 'plumb-marbofloxacin-10ed'],
        evidenceLevel: 'Consenso Internacional ISCAID 2019 e Plumb’s Veterinary Drug Handbook 10ª ed.',
      },
      {
        id: 'dose-marbo-dog-prostatite',
        species: 'dog',
        indication:
          'Prostatite bacteriana canina aguda e crônica e abscessos prostáticos por patógenos suscetíveis',
        doseMin: 2.7,
        doseMax: 5.5,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral',
        frequency: 'A cada 24 horas (q24h)',
        duration: 'Prostatite aguda: ~4 semanas | Prostatite crônica: 4 a 6 semanas',
        notes:
          'Apresenta alta lipofilia e fração livre elevada que permitem ampla transposição da barreira hemato-prostática e concentrações ativas no parênquima e fluido prostático. Em machos intactos, associar orquiectomia eletiva para erradicação completa do foco.',
        clinicalContext:
          'Infecções prostáticas por bacilos Gram-negativos orientadas por cultura do líquido prostático ou urina pós-massagem.',
        monitoring:
          'Ultrassonografia prostática periódica, exame retal digital e citologia/cultura de controle.',
        calculatorEnabled: true,
        referenceIds: ['iscaid-uti-guidelines-2019', 'bsava-marbofloxacin-10ed'],
        evidenceLevel: 'Diretrizes ISCAID e BSAVA Small Animal Formulary 10ª ed.',
      },
      {
        id: 'dose-marbo-dog-respiratorio',
        species: 'dog',
        indication:
          'Infecções respiratórias inferiores e broncopneumonias bacterianas graves em cães',
        doseMin: 2.7,
        doseMax: 5.5,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral',
        frequency: 'A cada 24 horas (q24h)',
        duration: '7 a 14 dias',
        notes:
          'Excelente atividade contra Bordetella bronchiseptica, Mycoplasma spp. e bacilos Gram-negativos aeróbios com boa penetração em secreções e macrófagos alveolares. Em casos sépticos graves com risco de aspiração ou polimicrobianos, associar antimicrobiano com cobertura para anaeróbios (ex.: aminopenicilina potencializada ou clindamicina).',
        clinicalContext:
          'Pneumonias complicadas com identificação etiológica ou sepse respiratória hospitalar.',
        monitoring:
          'Frequência e padrão respiratório, oximetria de pulso, radiografia torácica seriada e hemograma.',
        calculatorEnabled: true,
        referenceIds: ['plumb-marbofloxacin-10ed', 'bsava-marbofloxacin-10ed'],
        evidenceLevel: 'Compêndios Plumb 10ª ed. e BSAVA Formulary 10ª ed.',
      },
      {
        id: 'dose-marbo-dog-lvc-brasil',
        species: 'dog',
        indication:
          'Leishmaniose visceral canina (LVC) leve a moderada — produto registrado no Brasil (Marbox-Leish®)',
        doseMin: 2,
        doseMax: 2,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral',
        frequency: 'A cada 24 horas (q24h)',
        duration: '28 dias consecutivos',
        notes:
          'Regime oficial registrado no MAPA (Marbox-Leish®) e incluído nas Diretrizes Brasileish 2025. Proporciona remissão dos sinais clínicos e redução expressiva da carga parasitária (~72%), inclusive com segurança demonstrada em cães nefropatas (Pineda et al., 2017). ATENÇÃO: não esteriliza a infecção (recaídas ocorrem em ~52% dos cães respondedores em média 5,5 meses após o curso). Considerar impacto de stewardship pelo uso prolongado de fluoroquinolona.',
        clinicalContext:
          'Tratamento para remissão clínica em cães com diagnóstico confirmado de LVC em estadiamentos leve a moderado.',
        monitoring:
          'Escore clínico seriada aos 30, 60 e 90 dias, hemograma, proteinograma sérico (relação A/G), creatinina, urinálise (UPC) e vigilância estrita de recidiva parasitária.',
        calculatorEnabled: true,
        referenceIds: ['diretrizes-brasileish-2025', 'rougier-2012-leishmania', 'pineda-2017-marbo-ckd'],
        evidenceLevel: 'Diretrizes Brasileish 2025 / Registro MAPA / Ensaios Clínicos Nível 2',
      },
      {
        id: 'dose-marbo-cat-infeccoes-gerais',
        species: 'cat',
        indication:
          'Infecções bacterianas suscetíveis em felinos (pele, tecidos moles, abscessos e trato urinário superior)',
        doseMin: 2,
        doseMax: 5.5,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral',
        frequency: 'A cada 24 horas (q24h)',
        duration: '5 a 14 dias',
        notes:
          'DIVERGÊNCIA INTERNACIONAL DE FONTES: O formulário britânico BSAVA e a bula brasileira Marbocyl P preconizam 2 mg/kg VO q24h; o compêndio Plumb e rotulagem norte-americana indicam 2,75 a 5,5 mg/kg q24h. Estudos PK/PD recentes (Papich et al., 2025/2026) demonstraram que a dose de 2 mg/kg pode ser limítrofe para cepas com MIC moderada, justificando doses mais elevadas guiadas por AST e fAUC/MIC > 72.',
        clinicalContext:
          'Infecções de pele, feridas por mordedura ou ITU superior felina orientadas por cultura.',
        monitoring:
          'Avaliação clínica da ferida/foco, tolerância alimentar e monitoramento preventivo da acuidade visual.',
        calculatorEnabled: true,
        referenceIds: ['plumb-marbofloxacin-10ed', 'bsava-marbofloxacin-10ed', 'albarellos-2005-cat-pk'],
        evidenceLevel: 'Bula Oficial MAPA / BSAVA 10ª ed. / Plumb 10ª ed.',
      },
      {
        id: 'dose-marbo-cat-mycoplasma-haemofelis',
        species: 'cat',
        indication:
          'Micoplasmose hemotrópica felina (Mycoplasma haemofelis) recorrente ou persistente pós-doxiciclina',
        doseMin: 2,
        doseMax: 2,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral',
        frequency: 'A cada 24 horas (q24h)',
        duration: '14 dias consecutivos',
        notes:
          'TERAPIA DE SEGUNDA LINHA / RESGATE: A doxiciclina (5 mg/kg q12h ou 10 mg/kg q24h por 28 dias) continua sendo a 1ª escolha padrão ouro. A marbofloxacina é indicada quando a PCR quantitativa permanece positiva ou reativa após o ciclo de doxiciclina. Estudo de Novacco et al. (2018) e consenso ABCD 2026 demonstraram PCR-negativação completa e ausência de reativação mesmo após imunossupressão. Não tratar portadores subclínicos saudáveis assintomáticos.',
        clinicalContext:
          'Gatos sintomáticos ou anêmicos com bacteremia persistente ou recidivante documentada por PCR.',
        monitoring:
          'Hematócrito, esfregaço sanguíneo seriado, reticulócitos e PCR quantitativo pré e pós-tratamento.',
        calculatorEnabled: true,
        referenceIds: ['novacco-2018-m-haemofelis', 'guideline-abcd-haemoplasmosis-2026'],
        evidenceLevel: 'Ensaio Clínico Microbiológico Novacco et al. (2018) e Diretriz ABCD 2026',
      },
      {
        id: 'dose-marbo-injetavel-hospitalar',
        species: 'both',
        indication:
          'Terapia antimicrobiana injetável de início hospitalar em sepse bacteriana por patógenos sensíveis',
        doseMin: 2,
        doseMax: 2,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Intravenosa Lenta ou Subcutânea',
        frequency: 'A cada 24 horas (q24h)',
        duration: 'Fase inicial de internação até estabilização do paciente para via oral',
        notes:
          'Referência BSAVA 10ª ed.: 2 mg/kg IV lenta ou SC q24h. Estudos hemodinâmicos caninos comprovaram estabilidade cardiovascular na dose de 2 mg/kg IV lenta. Diluir apenas em carreadores compatíveis autorizados pelo fabricante e infundir lentamente. Não misturar com outras drogas na seringa ou equipo.',
        clinicalContext:
          'Início rápido de terapia antimicrobiana em internação/emergência antes da migração para via oral.',
        monitoring:
          'Frequência cardíaca, pressão arterial sistêmica e inspeção do sítio de aplicação parenteral.',
        calculatorEnabled: true,
        referenceIds: ['bsava-marbofloxacin-10ed', 'plumb-marbofloxacin-10ed'],
        evidenceLevel: 'Formulário BSAVA 10ª ed. e Estudos Farmacocinéticos Parenterais',
      },
    ],

    presentations: [
      {
        id: 'pres-marbo-marbopet-27-5mg',
        label: 'Marbopet® Comprimidos 27,5 mg (Ceva Saúde Animal)',
        form: 'Comprimidos palatáveis sulcados',
        concentrationValue: 27.5,
        concentrationUnit: 'mg',
        packInfo: 'Blister com 10 comprimidos palatáveis',
        route: 'Oral',
        scoringInfo: '1 comprimido para cada 10 kg de peso na dose de bula (2,75 mg/kg) ou 1 comp para 5 kg a 5,5 mg/kg',
        channel: 'veterinary',
      },
      {
        id: 'pres-marbo-marbopet-82-5mg',
        label: 'Marbopet® Comprimidos 82,5 mg (Ceva Saúde Animal)',
        form: 'Comprimidos palatáveis sulcados',
        concentrationValue: 82.5,
        concentrationUnit: 'mg',
        packInfo: 'Blister com 10 comprimidos palatáveis',
        route: 'Oral',
        scoringInfo: '1 comprimido para cada 30 kg de peso na dose de bula (2,75 mg/kg) ou 1 comp para 15 kg a 5,5 mg/kg',
        channel: 'veterinary',
      },
      {
        id: 'pres-marbo-marbocyl-p-5mg',
        label: 'Marbocyl® P Comprimidos 5 mg (Vetoquinol Brasil)',
        form: 'Comprimidos palatáveis divisíveis',
        concentrationValue: 5,
        concentrationUnit: 'mg',
        packInfo: 'Cartucho com 10 comprimidos divisíveis',
        route: 'Oral',
        scoringInfo: '1 comprimido para cada 2,5 kg de peso na dose de 2 mg/kg; ideal para gatos e cães miniatura',
        channel: 'veterinary',
      },
      {
        id: 'pres-marbo-marbocyl-p-20mg',
        label: 'Marbocyl® P Comprimidos 20 mg (Vetoquinol Brasil)',
        form: 'Comprimidos palatáveis sulcados',
        concentrationValue: 20,
        concentrationUnit: 'mg',
        packInfo: 'Cartucho com 10 comprimidos sulcados',
        route: 'Oral',
        scoringInfo: '1 comprimido para cada 10 kg de peso vivo na dose de 2 mg/kg',
        channel: 'veterinary',
      },
      {
        id: 'pres-marbo-marbocyl-p-80mg',
        label: 'Marbocyl® P Comprimidos 80 mg (Vetoquinol Brasil)',
        form: 'Comprimidos palatáveis sulcados',
        concentrationValue: 80,
        concentrationUnit: 'mg',
        packInfo: 'Cartucho com 12 comprimidos sulcados para cães grandes',
        route: 'Oral',
        scoringInfo: '1 comprimido para cada 40 kg de peso vivo na dose de 2 mg/kg',
        channel: 'veterinary',
      },
      {
        id: 'pres-marbo-marbox-leish-20mg',
        label: 'Marbox-Leish® Comprimidos 20 mg (Ceva Saúde Animal)',
        form: 'Comprimidos palatáveis específicos para leishmaniose canina',
        concentrationValue: 20,
        concentrationUnit: 'mg',
        packInfo: 'Frasco/cartucho com 30 comprimidos palatáveis',
        route: 'Oral',
        scoringInfo: '1 comprimido para cada 10 kg de peso vivo q24h por 28 dias',
        channel: 'veterinary',
      },
      {
        id: 'pres-marbo-marbox-leish-60mg',
        label: 'Marbox-Leish® Comprimidos 60 mg (Ceva Saúde Animal)',
        form: 'Comprimidos palatáveis específicos para leishmaniose canina',
        concentrationValue: 60,
        concentrationUnit: 'mg',
        packInfo: 'Frasco/cartucho com 30 comprimidos palatáveis',
        route: 'Oral',
        scoringInfo: '1 comprimido para cada 30 kg de peso vivo q24h por 28 dias',
        channel: 'veterinary',
      },
    ],

    // 1. Pilares Terapêuticos Fundamentais
    pillars: [
      {
        title: 'Ação Concentração-Dependente (q24h)',
        icon: 'Zap',
        desc: 'A eficácia bactericida e a prevenção de seleção de cepas resistentes dependem da magnitude dos índices Cmax/MIC (alvo 8 a 10) e AUC24/MIC, justificando a administração da dose total em tomada única diária.',
      },
      {
        title: 'Biodisponibilidade Completa e Ampla Penetração',
        icon: 'Layers',
        desc: 'Absorção oral quase total (~94–100%) em cães e gatos, com baixa ligação proteica (~7–22%) e extensa difusão para parênquima renal, próstata, pulmões, pele e células de defesa.',
      },
      {
        title: 'Antimicrobial Stewardship Rigoroso',
        icon: 'ShieldAlert',
        desc: 'Fluoroquinolona veterinária de segunda/terceira linha. Deve ser respaldada por cultura e antibiograma; nunca indicada como antibiótico empírico de primeira escolha em cistites simples ou piodermites superficiais.',
      },
      {
        title: 'Segurança Ocular Diferenciada em Felinos',
        icon: 'CheckCircle2',
        desc: 'Ao contrário da enrofloxacina, a marbofloxacina não possui relação causal estabelecida com degeneração retiniana aguda felina nas doses terapêuticas habituais, embora a cautela de classe continue recomendada.',
      },
    ],

    quickSummaryHighlights: [
      'Fluoroquinolona bactericida de uso veterinário exclusivo',
      'Perfil PK/PD concentração-dependente (Cmax/MIC ideal 8–10)',
      'Administração conveniente em dose diária única (q24h)',
      'Absorção oral quase completa (~94–100% no cão e gato)',
      'ISCAID 2025: dose mínima de 5,5 mg/kg para Staphylococcus spp.',
      'Cistite bacteriana esporádica: curso curto de 3 a 5 dias (ISCAID)',
      'Excelente penetração prostática e renal ativa (~40% na urina)',
      'Segunda linha de resgate em Mycoplasma haemofelis resistente à doxiciclina',
      'Aprovada no Brasil para leishmaniose visceral canina (2 mg/kg q24h x 28 dias)',
      'Separar pelo menos 2 horas de antiácidos, sucralfato e minerais',
      'Contraindicada em filhotes em crescimento rápido (risco condral)',
    ],

    // 2. Indicações Rápidas
    quickIndications: [
      {
        condition: 'Pielonefrite Bacteriana Canina e Felina (ISCAID)',
        species: 'both',
        doseSummary: '2,7 a 5,5 mg/kg VO a cada 24 horas (q24h)',
        route: 'Oral',
        duration: '10 a 14 dias',
        clinicalContext:
          'Opção racional imediata pelo ISCAID enquanto se aguarda urocultura devido à alta penetração no parênquima renal e atividade contra Enterobacterales.',
      },
      {
        condition: 'Prostatite Bacteriana Canina Aguda e Crônica',
        species: 'dog',
        doseSummary: '2,7 a 5,5 mg/kg VO a cada 24 horas (q24h)',
        route: 'Oral',
        duration: 'Aguda: ~4 semanas | Crônica: 4 a 6 semanas',
        clinicalContext:
          'Transpõe com alta eficácia a barreira hemato-prostática em machos com infecção por bacilos Gram-negativos suscetíveis.',
      },
      {
        condition: 'Piodermite Profunda Canina por Staphylococcus (ISCAID 2025)',
        species: 'dog',
        doseSummary: '5,5 mg/kg VO a cada 24 horas (q24h)',
        route: 'Oral',
        duration: 'Avaliar em 3 semanas',
        clinicalContext:
          'Indicada quando houver laudo de cultura favorável e falha de 1ª linha; a dose de 5,5 mg/kg é mandatória para atingir AUC/MIC bactericida.',
      },
      {
        condition: 'Micoplasmose Hemotrópica Felina (M. haemofelis pós-doxi)',
        species: 'cat',
        doseSummary: '2 mg/kg VO a cada 24 horas (q24h)',
        route: 'Oral',
        duration: '14 dias consecutivos',
        clinicalContext:
          'Terapia de resgate para clearance bacterêmico e negativação do PCR após falha ou persistência pós-doxiciclina (ABCD 2026).',
      },
      {
        condition: 'Leishmaniose Visceral Canina Leve a Moderada (Brasil)',
        species: 'dog',
        doseSummary: '2 mg/kg VO a cada 24 horas (q24h)',
        route: 'Oral',
        duration: '28 dias consecutivos',
        clinicalContext:
          'Produto registrado no MAPA (Marbox-Leish®) e Diretrizes Brasileish 2025 para remissão de sinais clínicos e redução de carga parasitária.',
      },
    ],

    // 3. Indicações Detalhadas
    detailedIndications: [
      {
        id: 'ind-marbo-pielonefrite',
        indication: 'Pielonefrite bacteriana aguda e crônica em cães e gatos',
        clinicalContext:
          'A infecção do parênquima renal exige fármacos que alcancem altas concentrações não apenas na luz urinária tubular, mas no tecido cortical e medular renal. A quase totalidade dos casos decorre de infecção ascendente por bacilos Gram-negativos (Escherichia coli, Klebsiella spp., Proteus mirabilis). A marbofloxacina é uma opção de primeira linha enquanto se aguarda o resultado da urocultura por cistocentese.',
        species: 'both',
        dose: '2,7 a 5,5 mg/kg VO q24h',
        route: 'Oral',
        frequency: 'A cada 24 horas',
        duration: '10 a 14 dias',
        mechanismOfAction:
          'Inibição da DNA-girase e topoisomerase IV bacterianas, provocando quebras em fita dupla no cromossomo bacteriano e morte celular bactericida rápida.',
        clinicalRationale:
          'Apresenta alta penetração no parênquima renal e aproximadamente 40% da dose é eliminada na urina como fármaco ativo inalterado, promovendo esterilização rápida do tecido renal e do trato urinário coletor.',
        monitoring:
          'Ureia, creatinina, SDMA, urinálise seriada e urocultura de controle em 72h e após 1-2 semanas do término.',
        referenceIds: ['iscaid-uti-guidelines-2019', 'plumb-marbofloxacin-10ed'],
        evidenceLevel: 'Diretriz de Consenso Internacional ISCAID 2019 e Plumb 10ª ed.',
      },
      {
        id: 'ind-marbo-prostatite',
        indication: 'Prostatite bacteriana canina aguda e crônica e abscessos prostáticos',
        clinicalContext:
          'A próstata canina madura é protegida pela barreira hemato-prostática. Antibióticos hidrofílicos ou com alta ligação proteica não penetram no lúmen ácinar na prostatite crônica. A marbofloxacina, sendo altamente lipofílica e com ligação proteica inferior a 20%, atravessa facilmente a barreira e atinge concentrações terapêuticas elevadas no parênquima e fluido prostático.',
        species: 'dog',
        dose: '2,7 a 5,5 mg/kg VO q24h',
        route: 'Oral',
        frequency: 'A cada 24 horas',
        duration: 'Aguda: ~4 semanas | Crônica: 4 a 6 semanas',
        mechanismOfAction:
          'Bloqueio catalítico das topoisomerases tipo II no interstício e no parênquima glandular prostático.',
        clinicalRationale:
          'Excelente penetração tecidual e persistência bactericida em pH fisiológico prostático. A castração eletiva adjuvante é recomendada para controle definitivo e redução de recidiva.',
        monitoring:
          'Ultrassonografia prostática periódica, urinálise e citologia/cultura do lavado ou fluido prostático.',
        referenceIds: ['iscaid-uti-guidelines-2019', 'bsava-marbofloxacin-10ed'],
        evidenceLevel: 'Consenso Internacional ISCAID 2019 e BSAVA Formulary 10ª ed.',
      },
      {
        id: 'ind-marbo-piodermite',
        indication: 'Piodermite bacteriana profunda canina por Staphylococcus pseudintermedius',
        clinicalContext:
          'O consenso dermatológico contemporâneo da ISCAID (2025) estabelece que piodermites superficiais devem receber prioritariamente terapia tópica (clorexidina). Quando houver envolvimento profundo ou falha comprovada e o antibiograma direcionar para marbofloxacina, a dose deve ser fixada em 5,5 mg/kg q24h para atingir os índices farmacodinâmicos de erradicação.',
        species: 'dog',
        dose: '5,5 mg/kg VO q24h',
        route: 'Oral',
        frequency: 'A cada 24 horas',
        duration: 'Curso inicial de 3 semanas com reavaliação clínica mandatória',
        mechanismOfAction:
          'Inibição de DNA-girase e topoisomerase IV bacteriana com acúmulo em fagócitos e neutrófilos na derme profunda.',
        clinicalRationale:
          'Estudos demonstraram que 2 mg/kg pode ser subinibitório para certas cepas de S. pseudintermedius, favorecendo a seleção de mutantes resistentes; a dose de 5,5 mg/kg q24h assegura AUC/MIC superior ao limiar bactericida.',
        monitoring:
          'Citologia cutânea semanal, regressão de pústulas, fístulas e crostas, e acompanhamento da tolerância gástrica.',
        referenceIds: ['iscaid-pyoderma-guidelines-2025', 'plumb-marbofloxacin-10ed'],
        evidenceLevel: 'Diretriz de Consenso Internacional ISCAID 2025',
      },
      {
        id: 'ind-marbo-hemoplasmose',
        indication: 'Micoplasmose hemotrópica felina (Mycoplasma haemofelis) recorrente ou persistente pós-doxiciclina',
        clinicalContext:
          'A doxiciclina oral é o tratamento padrão-ouro de 1ª linha na hemoplasmose felina aguda. No entanto, uma parcela dos felinos tratados permanece como portadora subclínica bacterêmica crônica ou apresenta recaída clínica com PCR quantitativa positiva. Nesses pacientes, a marbofloxacina atua como terapia de resgate de alta eficácia.',
        species: 'cat',
        dose: '2 mg/kg VO q24h',
        route: 'Oral',
        frequency: 'A cada 24 horas',
        duration: '14 dias consecutivos',
        mechanismOfAction:
          'Penetração na membrana celular e inibição da replicação do DNA do micoplasma aderido à superfície eritrocitária.',
        clinicalRationale:
          'Ensaio clínico prospectivo de Novacco et al. (2018) comprovou que gatos persistentemente infectados após 28 dias de doxiciclina negativaram o PCR sanguíneo após 14 dias de marbofloxacina, sem reativação da bacteremia mesmo sob imunossupressão experimental subsequente.',
        monitoring:
          'Volume globular (VG), esfregaço de sangue periférico para corpúsculos de inclusão e PCR confirmatório pré e pós-terapia.',
        referenceIds: ['novacco-2018-m-haemofelis', 'guideline-abcd-haemoplasmosis-2026'],
        evidenceLevel: 'Ensaio Clínico Microbiológico Controlado e Diretrizes ABCD 2026',
      },
      {
        id: 'ind-marbo-lvc-brasil',
        indication: 'Leishmaniose visceral canina (LVC) leve a moderada — protocolo oficial brasileiro',
        clinicalContext:
          'No Brasil, a marbofloxacina possui produto comercial especificamente registrado no Ministério da Agricultura e Pecuária (Marbox-Leish®, Ceva) para a remissão de manifestações clínicas da LVC, sendo incluída nas Diretrizes Brasileish 2025.',
        species: 'dog',
        dose: '2 mg/kg VO q24h',
        route: 'Oral',
        frequency: 'A cada 24 horas',
        duration: '28 dias consecutivos',
        mechanismOfAction:
          'Inibição de topoisomerases parasitárias e imunomodulação celular com aumento de síntese de TNF-alfa e óxido nítrico por macrófagos infectados.',
        clinicalRationale:
          'Promove queda expressiva no escore clínico e redução de carga parasitária linfonodal em ~72%. Não deve ser apresentada como cura parasitológica, já que recidivas clínicas ocorrem em aproximadamente 52% dos animais após 5,5 meses. É segura em pacientes nefropatas (LVC com DRC estável).',
        monitoring:
          'Escore clínico semestral, urinálise com relação proteína/creatinina (UPC), hemograma, proteinograma e creatinina.',
        referenceIds: ['diretrizes-brasileish-2025', 'rougier-2012-leishmania', 'pineda-2017-marbo-ckd'],
        evidenceLevel: 'Diretrizes Brasileish 2025, Bula MAPA e Ensaios Clínicos Prospectivos',
      },
    ],

    // 4. Farmacocinética Comparativa
    pharmacokineticsData: {
      absorption:
        'Excelente absorção entérica após administração oral tanto em cães (biodisponibilidade de ~94% a 100%) quanto em gatos (~99%). Em cães recebendo 2 mg/kg VO, o Cmax sérico atinge cerca de 1,4 mcg/mL com Tmax em torno de 1,5 a 2,5 horas; doses de 2,75 mg/kg e 5,5 mg/kg geram picos séricos médios de aproximadamente 2,0 mcg/mL e 4,2 mcg/mL, respectivamente. Em gatos recebendo 2 mg/kg VO repetidos, o Cmax em steady-state alcança cerca de 1,97 mcg/mL e doses de 5,5 mg/kg produzem Cmax de ~4,8 mcg/mL. A ingestão de alimentos comuns não reduz de modo clinicamente importante a extensão total da absorção (AUC inalterada). Contudo, a presença intraluminal de cátions bivalentes ou trivalentes (cálcio, magnésio, alumínio, ferro, zinco) provoca quelação química estequiométrica com perda drástica da absorção.',
      distribution:
        'Volume de distribuição aparente elevado (Vd de 1,2 a 2,25 L/kg no cão, média de 1,9 L/kg; e Vss de aproximadamente 1,01 L/kg no gato), refletindo ampla dispersão tecidual e acúmulo intracelular. Baixa taxa de ligação a proteínas plasmáticas (cerca de 9% a 22% em cães e apenas 7% em gatos), resultando em grande fração livre biologicamente ativa disponível para penetração tecidual. Concentra-se extensamente na pele, tecido subcutâneo, pulmões, secreções respiratórias brônquicas, parênquima renal, próstata e fluido prostático, além de alcançar concentrações elevadas no interior de fagócitos (macrófagos e neutrófilos). Atravessa moderadamente a barreira hematoencefálica, sem valor percentual fixo de LCR padronizado.',
      metabolism:
        'Metabolização hepática muito baixa em pequenos animais: apenas aproximadamente 10% a 15% da dose é biotransformada no fígado em metabólitos inativos ou menores em cães, sendo ainda menor em felinos. Diferentemente da enrofloxacina, a marbofloxacina não depende de conversão hepática em ciprofloxacina para sua atividade clínica primária, mantendo a molécula-mãe como agente farmacológico bactericida.',
      elimination:
        'Eliminação mista com importante excreção renal na forma inalterada ativa (~40% da dose é recuperada íntegra na urina de cães), complementada por eliminação fecal e biliar. A meia-vida de eliminação plasmática terminal (t1/2) é de aproximadamente 9 a 12 horas no cão (12,4 h após administração IV em estudo de Schneider et al.) e cerca de 8 a 13 horas no gato (7,98 h após IV e ~12,7 h sob doses elevadas). O clearance plasmático médio é de aproximadamente 0,10 L/kg/h em cães e 0,09 L/kg/h em gatos. A combinação de meia-vida prolongada, ação bactericida concentração-dependente e expressivo efeito pós-antibiótico (PAE) sustenta o sucesso terapêutico em regime posológico de tomada única a cada 24 horas (q24h).',
      cnsPenetration:
        'Penetração tecidual descrita pela classe das fluoroquinolonas; a literatura primária não estabelece um percentual de penetração no líquido cefalorraquidiano fixo cão/gato para ser adotado como referência numérica universal.',
      plasmaBinding:
        'Baixa taxa de ligação proteica: cerca de 9% a 22% em cães e aproximadamente 7% em gatos, mantendo alta fração livre ativa.',
      halfLife:
        'Meia-vida de eliminação de 9 a 12 horas em cães (12,4 h IV) e de 8 a 13 horas em gatos (7,98 h IV com 2 mg/kg; ~12,7 h com 5,5 mg/kg).',
    },

    // 5. Informações Gerais
    generalInfoData: {
      routesDetailed: [
        {
          route: 'Oral (comprimidos palatáveis sulcados ou divisíveis)',
          technique:
            'Administrar preferencialmente em jejum para maximizar a velocidade de absorção, ou junto a uma pequena porção de alimento não mineral/não lácteo caso surja desconforto gástrico. Separar por pelo menos 2 horas de suplementos com cátions polivalentes ou protetores gástricos quelantes.',
          nursingCare:
            'Confirmar a deglutição espontânea ou completa do comprimido. Em gatos, administrar 2 a 3 mL de água filtrada imediatamente após o comprimido para garantir trânsito esofágico completo e evitar esofagite mecânica.',
          limitations:
            'Evitar fracionamento inadequado em animais com peso muito baixo; optar por apresentações de 5 mg ou manipulação em formulação líquida com veículo idôneo.',
        },
        {
          route: 'Intravenosa Lenta (IV)',
          technique:
            'Administrar exclusivamente preparações injetáveis compatíveis devidamente diluídas em solução carreadora compatível (ex.: Cloreto de Sódio 0,9%), em infusão venosa lenta ao longo de 20 a 30 minutos em linha exclusiva. Nunca administrar em bólus rápido.',
          nursingCare:
            'Monitorar pressão arterial sistêmica, frequência cardíaca e ausência de extravasamento perivascular durante toda a infusão.',
          limitations:
            'Não misturar no mesmo equipo ou frasco com medicamentos sem teste formal de compatibilidade química.',
        },
        {
          route: 'Subcutânea (SC)',
          technique:
            'Aplicar na região dorsal da escápula ou flanco, alternando criteriosamente os sítios de aplicação anatômica a cada injeção.',
          nursingCare:
            'Verificar ausência de dor local intensa, edema ou formação de nódulos inflamatórios no local da punção.',
          limitations:
            'Migrar para a via oral assim que o paciente estiver estável e com apetite restaurado.',
        },
      ],
      pharmacologicalClassification: {
        chemicalClass: 'Fluoroquinolona sintética fluorada de 3ª geração veterinária',
        chemicalClassDescription:
          'Derivado fluorado heterocíclico com grupos funcionais carboxila em C-3 e carbonila em C-4, anfotérica (pKa 5,38 e 6,16; logP 0,26), zwitteriônica em pH fisiológico.',
        therapeuticClass: 'Antibacteriano bactericida sistêmico concentração-dependente',
        therapeuticClassDescription:
          'Agente quimioterápico bactericida de amplo espectro direcionado primariamente a bacilos Gram-negativos aeróbios (Enterobacterales), Pasteurella, Mycoplasma e estafilococos.',
        detailedTargets: [
          {
            target: 'DNA-girase bacteriana (Topoisomerase II - GyrA/GyrB)',
            action: 'Estabilização do complexo intermediário clivado DNA-topoisomerase impedindo a religação das fitas duplas de DNA',
            clinicalSignificance:
              'Alvo primário e determinante em bactérias Gram-negativas aeróbias; produz quebras duplas cromossômicas letais.',
          },
          {
            target: 'Topoisomerase IV bacteriana (ParC/ParE)',
            action: 'Interferência na decatenação e segregação dos cromossomos bacterianos recém-replicados',
            clinicalSignificance:
              'Alvo concorrente ou prioritário em determinados cocos Gram-positivos (Staphylococcus spp.), impedindo a divisão celular.',
          },
          {
            target: 'Topoisomerase de Leishmania infantum e modulação de macrófagos',
            action: 'Inibição de topoisomerases parasitárias e indução da produção de óxido nítrico e TNF-alfa por macrófagos hospedeiros',
            clinicalSignificance:
              'Mecanismo antiparasitário na Leishmaniose Visceral Canina promovendo queda na carga parasitária e remissão clínica.',
          },
        ],
      },
      prescriptionType: {
        category: 'Receituário Veterinário Simples (Medicamento sob Prescrição Veterinária)',
        ordinanceOrLaw: 'Normativa MAPA para Produtos Veterinários Antimicrobianos',
        retentionRequired: false,
        guidelines:
          'Produtos veterinários registrados no MAPA contendo marbofloxacina (Marbopet®, Marbocyl® P, Marbox-Leish®) são comercializados sob Receituário Veterinário Simples em uma via entregue ao tutor. Não estão sujeitos a controle especial pela Portaria 344/98 nem à retenção de receita de farmácia humana (RDC Anvisa 471/2021).',
      },
      speciesPeculiarities: [
        {
          species: 'dog',
          title: 'Condrotoxicidade e Artropatia em Cães em Crescimento',
          description:
            'Assim como outras fluoroquinolonas, a marbofloxacina forma complexos quelantes de magnésio na matriz cartilaginosa epifisária de articulações em rápida proliferação submetidas a carga. Em cães de 3 a 4 meses expostos a 5,6 mg/kg/dia por 14 dias, observou-se desenvolvimento de lesões vesiculares condrais e claudicação clínica.',
          clinicalImplications:
            'Contraindicada em cães de raças pequenas e médias até 8 meses; grandes até 12 meses; gigantes até 18 meses de vida. Em adultos, a posologia varia de 2 a 5,5 mg/kg q24h conforme indicação e MIC.',
        },
        {
          species: 'cat',
          title: 'Segurança Retiniana Felina e Reavaliação de Breakpoints',
          description:
            'A marbofloxacina não possui relação causal estabelecida com degeneração aguda de fotorreceptores da retina em felinos, apresentando perfil toxicológico ocular sensivelmente mais seguro do que a enrofloxacina em doses terapêuticas e experimentais. Contudo, em 2025/2026, Papich et al. propuseram a redução de breakpoints felinos comparativamente ao CLSI VET01S com adição de categoria SDD (susceptible dose-dependent), destacando que a dose de 2 mg/kg pode ser insuficiente para microrganismos com MICs moderadas.',
          clinicalImplications:
            'Interpretar o antibiograma segundo as diretrizes CLSI mais recentes. Em gatos, não ultrapassar doses recomendadas sem fundamentação PK/PD e realizar vigilância visual preventiva.',
        },
      ],
      dilutionGuide: {
        compatibleFluids: [
          'Solução Fisiológica de Cloreto de Sódio 0,9% (SF 0,9%) - diluente de escolha',
          'Água estéril para injeção - para diluição extemporânea direta',
        ],
        incompatibleFluids: [
          'Soluções contendo cátions polivalentes (como Solução de Ringer com Lactato ou fluidos enriquecidos com Cálcio ou Magnésio)',
          'Não misturar na mesma seringa ou bolsa com outros antibacterianos, heparina ou complexos multivitamínicos sem dados formais de compatibilidade',
        ],
        infusionRateGuidance:
          'Administrar por via intravenosa lenta ao longo de 20 a 30 minutos em linha exclusiva. A velocidade deve ser controlada; não administrar em bólus IV rápido para evitar hipotensão transitória e desgranulação mastocitária.',
        preparationNotes:
          'Utilizar apenas diluentes e instruções específicas do produto injetável adotado. Assegurar cateterização venosa periférica pérvia antes da infusão.',
      },
    },

    // 6. Atenção, Precauções e Interações
    attentionData: {
      attentionSubtitle:
        'Vigilância de Cartilagem em Animais Jovens, Interações por Quelação e Princípios de Stewardship',
      precautions: [
        {
          condition: 'Cães jovens em fase de crescimento esquelético rápido',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A quelação de magnésio na matriz cartilaginosa epifisária articular induz necrose de condrócitos e formação de vesículas e erosões articulares irreversíveis em superfícies de carga.',
          clinicalAction:
            'Contraindicação absoluta em cães < 8 meses (pequeno/médio porte), < 12 meses (porte grande) e < 18 meses (raças gigantes). Selecionar classes antibacterianas alternativas seguras.',
        },
        {
          condition: 'Administração simultânea a quelantes minerais ou sucralfato',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A presença de cátions bivalentes/trivalentes (Al³⁺, Mg²⁺, Ca²⁺, Fe²⁺/Fe³⁺, Zn²⁺) ou sucralfato produz quelação estequiométrica intraluminal insolúvel, colapsando a absorção oral da marbofloxacina.',
          clinicalAction:
            'Manter intervalo obrigatório mínimo de pelo menos 2 horas entre a marbofloxacina e qualquer protetor gástrico, antiácido ou suplemento mineral.',
        },
        {
          condition: 'Epilepsia e distúrbios neurológicos convulsivos',
          alertLevel: 'warning',
          physiologicalExplanation:
            'As fluoroquinolonas exercem antagonismo sobre os receptores inibitórios GABA-A no córtex cerebral, diminuindo o limiar convulsivo.',
          clinicalAction:
            'Usar com cautela em epilépticos conhecidos; evitar associação com anti-inflamatórios não esteroidais (AINEs), que potencializam sinergicamente o bloqueio GABAérgico.',
        },
        {
          condition: 'Insuficiência renal grave (IRIS 3-4 ou anúria/oligúria)',
          alertLevel: 'caution',
          physiologicalExplanation:
            'Cerca de 40% do fármaco é excretado ativo pelos rins. Embora casos leves/moderados mantenham clearance estável, em falência renal terminal o acúmulo pode ocorrer.',
          clinicalAction:
            'Não reduzir a dose unitária de pico de forma arbitrária para não quebrar a relação Cmax/MIC bactericida; avaliar ampliação do intervalo posológico para 36 ou 48 horas sob monitorização laboratorial.',
        },
      ],

      adverseEffectsDetailed: [
        {
          effect: 'Desconforto gastrintestinal (náusea, vômito e fezes amolecidas)',
          frequency: 'common',
          mechanism:
            'Irritação química direta da mucosa digestiva e perturbação transitória da microbiota intestinal comensal.',
          clinicalManagement:
            'Administrar junto com uma pequena quantidade de alimento não lácteo. Se persistente, considerar antiemético (maropitant ou ondansetrona).',
        },
        {
          effect: 'Artropatia e lesão de cartilagem articular em filhotes',
          frequency: 'rare',
          mechanism:
            'Formação de quelatos com magnésio na matriz cartilaginosa em crescimento, levando a cavitações condrais bolhosas e claudicação.',
          clinicalManagement:
            'Prevenção rigorosa respeitando as idades limites de contraindicação. Descontinuar imediatamente caso surja claudicação em cães em fase final de crescimento.',
        },
        {
          effect: 'Neurotoxicidade e rebaixamento do limiar convulsivo',
          frequency: 'rare',
          mechanism:
            'Bloqueio dos receptores inibitórios GABA centrais facilitando despolarizações neuronais sincrônicas.',
          clinicalManagement:
            'Suspender a fluoroquinolona, estabilizar crises com benzodiazepínicos e migrar para outra classe terapêutica.',
        },
        {
          effect: 'Tendinopatias e tendinites',
          frequency: 'rare',
          mechanism:
            'Degeneração do colágeno tendíneo associada ao estresse oxidativo condral/tendíneo, intensificada por corticosteroides.',
          clinicalManagement:
            'Repouso motor e suspensão imediata do antimicrobiano.',
        },
      ],

      doseReductionGuidelines: [
        {
          clinicalCondition: 'Insuficiência Renal Crônica em Cães (Estágios IRIS 1 e 2)',
          recommendedAdjustment:
            'Nenhum ajuste empírico prévio é necessário. Manter a dose terapêutica recomendada para a indicação e MIC.',
          physiologicalRationale:
            'Estudos controlados em cães com comprometimento renal experimental moderado demonstraram apenas redução modesta no clearance sem acúmulo biológico relevante.',
        },
        {
          clinicalCondition: 'Insuficiência Renal Grave com Oligúria ou Anúria (Estágios IRIS 3 e 4)',
          recommendedAdjustment:
            'Individualizar a conduta e monitorar clinicamente; preferir estender o intervalo posológico (q36h a q48h) em vez de diminuir a dose unitária de pico.',
          physiologicalRationale:
            'A eficácia da marbofloxacina é concentração-dependente. Reduzir a dose unitária compromete a relação Cmax/MIC e seleciona cepas resistentes.',
        },
        {
          clinicalCondition: 'Hepatopatia Crônica Leve a Moderada',
          recommendedAdjustment:
            'Nenhum ajuste de dose é padronizado.',
          physiologicalRationale:
            'Apenas cerca de 10% a 15% da dose depende de biotransformação hepática em cães, sendo a eliminação primariamente renal e fecal.',
        },
      ],

      drugInteractionsDetailed: [
        {
          drugOrClass: 'Sucralfato',
          severity: 'major',
          clinicalEffect:
            'Redução severa da absorção e biodisponibilidade oral da marbofloxacina, resultando em falha terapêutica antimicrobiana.',
          pharmacologicalMechanism:
            'Formação de complexos insolúveis no lúmen gastrointestinal. Manter intervalo obrigatório de pelo menos 2 horas.',
        },
        {
          drugOrClass: 'Antiácidos e Suplementos Minerais (Al, Mg, Ca, Fe, Zn)',
          severity: 'major',
          clinicalEffect:
            'Quelação intraluminal com perda drástica da absorção sistêmica da marbofloxacina.',
          pharmacologicalMechanism:
            'Os cátions bivalentes e trivalentes quelam a molécula de fluoroquinolona. Administrar com separação mínima de 2 horas.',
        },
        {
          drugOrClass: 'Teofilina e Aminofilina',
          severity: 'moderate',
          clinicalEffect:
            'Elevação das concentrações séricas de teofilina com risco de taquiarritmias, náuseas e hiperexcitabilidade central.',
          pharmacologicalMechanism:
            'Redução do clearance hepático da teofilina em aproximadamente 26% em cães induzida pela marbofloxacina.',
        },
        {
          drugOrClass: 'Ciclosporina Sistêmica',
          severity: 'moderate',
          clinicalEffect:
            'Potencial elevação das concentrações séricas de ciclosporina e risco somado de nefrotoxicidade.',
          pharmacologicalMechanism:
            'Possível interferência em transportadores de efluxo e vias enzimáticas microssomais.',
        },
        {
          drugOrClass: 'Corticosteroides Sistêmicos',
          severity: 'moderate',
          clinicalEffect:
            'Potencial aumento do risco de degeneração e ruptura tendínea (tendinopatia associada a fluoroquinolonas).',
          pharmacologicalMechanism:
            'Efeitos citotóxicos somados sobre os tenócitos e síntese de matriz de colágeno.',
        },
        {
          drugOrClass: 'Nitrofurantoína',
          severity: 'moderate',
          clinicalEffect:
            'Possível antagonismo do efeito antibacteriano in vitro e in vivo no trato urinário.',
          pharmacologicalMechanism:
            'Interferência recíproca nos mecanismos catalíticos de ação antibacteriana.',
        },
      ],
    },

    // 7. Estudos Clínicos e de Segurança Comentados
    clinicalStudiesCommented: [
      {
        title:
          'Pharmacokinetics of marbofloxacin in dogs after oral and parenteral administration',
        authorsYear: 'Schneider M, Thomas V, Boisrame B, Deleforge J. 1996',
        journal: 'J Vet Pharmacol Ther. 19(1):56-61. doi: 10.1111/j.1365-2885.1996.tb00009.x. PMID: 8992027',
        studyDesign:
          'Estudo farmacocinético controlado cruzado (crossover) em 6 cães recebendo 2 mg/kg IV, SC e VO, além de estudo de doses repetidas em 8 cães.',
        sampleSize: '6 a 8 cães hígidos',
        mainFindings:
          'Demonstrou biodisponibilidade oral praticamente completa (~100%), meia-vida plasmática terminal de 12,4 horas, clearance de 0,10 L/kg/h e recuperação urinária de ~40% da dose na forma inalterada ativa. Não houve acúmulo adverso na administração repetida q24h.',
        clinicalTakeaway:
          'Consolidou a justificativa farmacocinética para a administração de marbofloxacina em tomada única a cada 24 horas (q24h) e sua elevada eficácia em infecções urinárias e parenquimatosas.',
        referenceId: 'schneider-1996-dog-pk',
      },
      {
        title:
          'Pharmacokinetics of marbofloxacin after single intravenous and repeat oral administration to cats',
        authorsYear: 'Albarellos GA, Montoya L, Landoni MF. 2005',
        journal: 'Vet J. 170(2):222-229. doi: 10.1016/j.tvjl.2004.05.011. PMID: 16129342',
        studyDesign:
          'Estudo farmacocinético felino controlado com 6 gatos recebendo 2 mg/kg IV em dose única e doses orais diárias repetidas por 10 dias consecutivos.',
        sampleSize: '6 gatos adultos hígidos',
        mainFindings:
          'A biodisponibilidade oral em gatos foi de 99 ± 29%, com volume de distribuição de 1,01 ± 0,15 L/kg, clearance de 0,09 ± 0,02 L/kg/h e meia-vida de 7,98 ± 0,57 h. O Cmax em steady-state atingiu 1,97 ± 0,61 mcg/mL.',
        clinicalTakeaway:
          'Comprovou excelente absorção e perfil farmacocinético linear em felinos sob regime q24h sem evidência de acúmulo tóxico ou alterações clínicas.',
        referenceId: 'albarellos-2005-cat-pk',
      },
      {
        title:
          'Consecutive antibiotic treatment with doxycycline and marbofloxacin clears bacteremia in Mycoplasma haemofelis-infected cats',
        authorsYear: 'Novacco M, Sugiarto S, Willi B, et al. 2018',
        journal: 'Vet Microbiol. 217:112-120. doi: 10.1016/j.vetmic.2018.03.006. PMID: 29615243',
        studyDesign:
          'Ensaio clínico prospectivo e experimental em gatos infectados por Mycoplasma haemofelis tratados consecutivamente com doxiciclina (28 dias) e, nos animais que permaneceram ou reverteram PCR positivos, marbofloxacina (2 mg/kg q24h por 14 dias), com imunossupressão subsequente.',
        sampleSize: '9 gatos experimentalmente infectados (5 tratados e 4 controles)',
        mainFindings:
          'Todos os 5 gatos tratados com marbofloxacina após persistência pós-doxiciclina negativaram o PCR sanguíneo. A imunossupressão posterior com metilprednisolona não reativou a bacteremia, ao contrário dos controles.',
        clinicalTakeaway:
          'Fundamenta cientificamente a marbofloxacina como a principal terapia de resgate para clearance e negativação de bacteremia na hemoplasmose felina resistente à doxiciclina.',
        referenceId: 'novacco-2018-m-haemofelis',
      },
      {
        title:
          'One-year clinical and parasitological follow-up of dogs treated with marbofloxacin for canine leishmaniosis',
        authorsYear: 'Rougier S, Hasseine L, Delaunay P, et al. 2012',
        journal: 'Vet Parasitol. 186(3-4):245-253. doi: 10.1016/j.vetpar.2011.11.016. PMID: 22130335',
        studyDesign:
          'Estudo clínico multicêntrico prospectivo com acompanhamento de 1 ano em 61 cães com leishmaniose visceral tratados com marbofloxacina (2 mg/kg VO q24h por 28 dias).',
        sampleSize: '61 cães naturalmente infectados avaliáveis',
        mainFindings:
          '42 dos 61 cães (68,9%) atingiram os critérios de sucesso clínico e a pontuação clínica caiu 61% em 3 meses. Contudo, 20 dos 38 cães (52,6%) apresentaram recaída clínica em média 5,5 meses após o tratamento e a persistência em linfonodos foi frequente.',
        clinicalTakeaway:
          'Evidencia que a marbofloxacina induz excelente remissão clínica na LVC, mas não esteriliza a infecção; o acompanhamento clínico periódico e a vigilância de recaídas são mandatórios.',
        referenceId: 'rougier-2012-leishmania',
      },
      {
        title:
          'Treatment of canine leishmaniasis with marbofloxacin in dogs with renal disease',
        authorsYear: 'Pineda C, Aguilera-Tejero E, Martínez-Moreno FJ, et al. 2017',
        journal: 'PLoS One. 12(10):e0185981. doi: 10.1371/journal.pone.0185981. PMID: 28982165',
        studyDesign:
          'Estudo clínico prospectivo avaliando eficácia e segurança da marbofloxacina (2 mg/kg VO q24h por 28 dias) em 28 cães acometidos concomitantemente por leishmaniose visceral e doença renal crônica.',
        sampleSize: '28 cães com LVC e nefropatia',
        mainFindings:
          'Houve melhora clínica significativa (escore caiu de 6,2 para 4,7; p=0,0001) e redução da carga parasitária em 72%, sem elevação de creatinina, alteração de densidade urinária ou agravamento de biomarcadores renais.',
        clinicalTakeaway:
          'Demonstrou que o protocolo de marbofloxacina para LVC é bem tolerado e viável mesmo em cães com nefropatia de base estável.',
        referenceId: 'pineda-2017-marbo-ckd',
      },
      {
        title:
          'Antimicrobial use guidelines for canine pyoderma by the International Society for Companion Animal Infectious Diseases (ISCAID)',
        authorsYear: 'Loeffler A, Beco L, Bond R, et al. 2025',
        journal: 'Vet Dermatol. 36(2):234-282. doi: 10.1111/vde.13342. PMID: 40338805',
        studyDesign:
          'Diretriz internacional de consenso baseada em evidências clínicas para diagnóstico e manejo da piodermite canina elaborada pelo painel de especialistas da ISCAID.',
        sampleSize: 'Consenso Internacional de Painel de Especialistas',
        mainFindings:
          'Recomenda terapia tópica exclusiva como primeira escolha para piodermite superficial. Quando agentes de segunda linha sistêmicos forem requeridos e a marbofloxacina for selecionada com base em antibiograma para Staphylococcus spp., a dose mínima preconizada é de 5,5 mg/kg q24h.',
        clinicalTakeaway:
          'Referência norteadora contemporânea que proíbe o uso de marbofloxacina em doses baixas (2 mg/kg) para estafilococos caninos, prevenindo falha terapêutica e seleção de resistência.',
        referenceId: 'iscaid-pyoderma-guidelines-2025',
      },
    ],

    // 8. Tabela Prática de Peso e Conversão de Doses
    practicalWeightTable: {
      standardDoseText:
        'Cães e Gatos: Doses usuais conforme diagnóstico — 2 mg/kg q24h (bula Marbocyl P, BSAVA e Leishmaniose Canina Marbox-Leish®) | 2,75 mg/kg q24h (bula Marbopet®) | 5,5 mg/kg q24h (ISCAID 2025 para Staphylococcus spp. e infecções profundas). Administrar a cada 24 horas por via oral.',
      headers: [
        'Peso do Paciente',
        'Dose 2 mg/kg (ex.: LVC / Marbocyl P)',
        'Dose 2,75 mg/kg (Bula Marbopet®)',
        'Dose 5,5 mg/kg (ISCAID Staphylococcus)',
        'Apresentação Comercial Prática',
      ],
      rows: [
        {
          weight: '2 kg (Gato ou Cão Mini)',
          totalDose: '4 mg q24h',
          col1: '5,5 mg q24h',
          col2: '11 mg q24h',
          col3: '1 comp. Marbocyl P 5 mg (a ~2 mg/kg) ou fracionamento',
        },
        {
          weight: '4 kg (Gato Adulto / Cão Mini)',
          totalDose: '8 mg q24h',
          col1: '11 mg q24h',
          col2: '22 mg q24h',
          col3: '1 e 1/2 comp. Marbocyl P 5 mg ou 1/4 comp. Marbopet 27,5 mg',
        },
        {
          weight: '5 kg (Gato Grande / Cão Pequeno)',
          totalDose: '10 mg q24h (1/2 comp. 20 mg)',
          col1: '13,75 mg q24h (1/2 comp. 27,5 mg)',
          col2: '27,5 mg q24h (1 comp. Marbopet 27,5 mg)',
          col3: 'Marbocyl P 20 mg (1/2 comp.) ou Marbopet 27,5 mg (1 comp. a 5,5 mg/kg)',
        },
        {
          weight: '10 kg (Cão Pequeno / Médio)',
          totalDose: '20 mg q24h (1 comp. 20 mg)',
          col1: '27,5 mg q24h (1 comp. 27,5 mg)',
          col2: '55 mg q24h (2 comp. 27,5 mg)',
          col3: '1 comp. Marbocyl P / Marbox-Leish 20 mg ou 1 comp. Marbopet 27,5 mg',
        },
        {
          weight: '15 kg (Cão Médio)',
          totalDose: '30 mg q24h (1,5 comp. 20 mg)',
          col1: '41,25 mg q24h (1,5 comp. 27,5 mg)',
          col2: '82,5 mg q24h (1 comp. 82,5 mg)',
          col3: '1 e 1/2 comp. 20 mg ou 1 comp. Marbopet 82,5 mg (a 5,5 mg/kg)',
        },
        {
          weight: '20 kg (Cão Médio)',
          totalDose: '40 mg q24h (2 comp. 20 mg)',
          col1: '55 mg q24h (2 comp. 27,5 mg)',
          col2: '110 mg q24h',
          col3: '2 comp. Marbocyl P / Marbox-Leish 20 mg ou 1/2 comp. Marbocyl P 80 mg',
        },
        {
          weight: '30 kg (Cão Grande)',
          totalDose: '60 mg q24h (1 comp. 60 mg)',
          col1: '82,5 mg q24h (1 comp. 82,5 mg)',
          col2: '165 mg q24h (2 comp. 82,5 mg)',
          col3: '1 comp. Marbox-Leish 60 mg ou 1 comp. Marbopet 82,5 mg',
        },
        {
          weight: '40 kg (Cão Gigante)',
          totalDose: '80 mg q24h (1 comp. 80 mg)',
          col1: '110 mg q24h',
          col2: '220 mg q24h',
          col3: '1 comp. Marbocyl P 80 mg ou 1 comp. Marbox-Leish 60 mg + 1 de 20 mg',
        },
      ],
    },

    // 9. Modelo Pronto de Prescrição Veterinária
    samplePrescriptionText:
      'RECEITUÁRIO SIMPLES — USO VETERINÁRIO\\n\\n1. Marbox-Leish® (Marbofloxacina 20 mg ou 60 mg) Comprimidos Palatáveis\\n   - Posologia: Administrar [inserir quantidade exata de comprimidos] por via oral, a cada 24 horas, durante 28 dias consecutivos.\\n\\nou para infecções bacterianas graves suscetíveis:\\n\\n1. Marbopet® (Marbofloxacina 27,5 mg ou 82,5 mg) Comprimidos Palatáveis\\n   - Posologia: Administrar [inserir quantidade de comprimidos] por via oral, a cada 24 horas, durante [inserir número de dias: 3-5 dias em cistite resistente; 10-14 dias em pielonefrite; 3 semanas em piodermite profunda].\\n\\nOrientações e Recomendações ao Tutor:\\n- Administrar o medicamento preferencialmente no mesmo horário todos os dias, de preferência em jejum ou junto a uma pequena porção de alimento não lácteo se houver náusea.\\n- INTERVALO OBRIGATÓRIO DE 2 HORAS: Não fornecer simultaneamente protetores gástricos (sucralfato), antiácidos ou suplementos minerais de cálcio, ferro, zinco ou magnésio, pois eles inativam a absorção do antibiótico.\\n- Fornecer água fresca e limpa à vontade durante todo o curso do tratamento.\\n- Não interromper a medicação antes do prazo estabelecido pelo médico-veterinário para evitar retorno da infecção e seleção de bactérias multirresistentes.\\n- Em cães em tratamento de Leishmaniose Visceral: este medicamento promove a remissão clínica e queda da carga de parasitas, mas não elimina completamente a infecção; retornos semestrais para exames clínicos e laboratoriais são indispensáveis para detectar recaídas.',

    // 10. Referências Científicas Completas
    references: [
      {
        id: 'plumb-marbofloxacin-10ed',
        title: 'Marbofloxacin: Veterinary Systemic Fluoroquinolone Monograph',
        authors: 'Plumb DC, Budde J',
        year: 2023,
        journal: "Plumb's Veterinary Drug Handbook, 10th edition, pp. 796-798",
        citation:
          "Plumb DC. Marbofloxacin. In: Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023. p. 796-798.",
        sourceType: 'Compêndio Farmacológico Veterinário Padrão-Ouro',
        evidenceLevel: 'Referência Mundial em Terapêutica Veterinária',
      },
      {
        id: 'bsava-marbofloxacin-10ed',
        title: 'Marbofloxacin: Canine and Feline Formulary Monograph',
        authors: 'Ramsey I, ed.',
        year: 2020,
        journal: 'BSAVA Small Animal Formulary, Part A: Canine and Feline, 10th edition, pp. 242-244',
        citation:
          'British Small Animal Veterinary Association. Marbofloxacin. In: BSAVA Small Animal Formulary, Part A. 10th ed. Gloucester: BSAVA; 2020. p. 242-244.',
        sourceType: 'Formulário Britânico de Animais de Companhia',
        evidenceLevel: 'Consenso Britânico de Medicina Veterinária',
      },
      {
        id: 'iscaid-pyoderma-guidelines-2025',
        title:
          'Antimicrobial use guidelines for canine pyoderma by the International Society for Companion Animal Infectious Diseases (ISCAID)',
        authors: 'Loeffler A, Beco L, Bond R, et al.',
        year: 2025,
        journal: 'Veterinary Dermatology. 36(2):234-282',
        citation:
          'Loeffler A, Beco L, Bond R, et al. Antimicrobial use guidelines for canine pyoderma by the International Society for Companion Animal Infectious Diseases (ISCAID). Vet Dermatol. 2025;36(2):234-282. doi: 10.1111/vde.13342. PMID: 40338805.',
        sourceType: 'Diretriz Internacional de Consenso de Especialistas (ISCAID)',
        url: 'https://doi.org/10.1111/vde.13342',
        evidenceLevel: 'Diretriz de Consenso Internacional Padrão-Ouro Nível 1',
      },
      {
        id: 'iscaid-uti-guidelines-2019',
        title:
          'International Society for Companion Animal Infectious Diseases (ISCAID) guidelines for the diagnosis and management of bacterial urinary tract infections in dogs and cats',
        authors: 'Weese JS, Blondeau J, Boothe D, et al.',
        year: 2019,
        journal: 'The Veterinary Journal. 247:8-25',
        citation:
          'Weese JS, Blondeau J, Boothe D, et al. International Society for Companion Animal Infectious Diseases (ISCAID) guidelines for the diagnosis and management of bacterial urinary tract infections in dogs and cats. Vet J. 2019;247:8-25. doi: 10.1016/j.tvjl.2019.02.008. PMID: 30971357.',
        sourceType: 'Diretriz Internacional de Consenso de Especialistas (ISCAID)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30971357/',
        evidenceLevel: 'Consenso Internacional Padrão-Ouro ISCAID 2019',
      },
      {
        id: 'schneider-1996-dog-pk',
        title:
          'Pharmacokinetics of marbofloxacin in dogs after oral and parenteral administration',
        authors: 'Schneider M, Thomas V, Boisrame B, Deleforge J',
        year: 1996,
        journal: 'Journal of Veterinary Pharmacology and Therapeutics. 19(1):56-61',
        citation:
          'Schneider M, Thomas V, Boisrame B, Deleforge J. Pharmacokinetics of marbofloxacin in dogs after oral and parenteral administration. J Vet Pharmacol Ther. 1996;19(1):56-61. doi: 10.1111/j.1365-2885.1996.tb00009.x. PMID: 8992027.',
        sourceType: 'Estudo Farmacocinético Canino Crossover e Doses Múltiplas',
        url: 'https://pubmed.ncbi.nlm.nih.gov/8992027/',
        evidenceLevel: 'Ensaio Farmacocinético Primário Controlado',
      },
      {
        id: 'albarellos-2005-cat-pk',
        title:
          'Pharmacokinetics of marbofloxacin after single intravenous and repeat oral administration to cats',
        authors: 'Albarellos GA, Montoya L, Landoni MF',
        year: 2005,
        journal: 'The Veterinary Journal. 170(2):222-229',
        citation:
          'Albarellos GA, Montoya L, Landoni MF. Pharmacokinetics of marbofloxacin after single intravenous and repeat oral administration to cats. Vet J. 2005;170(2):222-229. doi: 10.1016/j.tvjl.2004.05.011. PMID: 16129342.',
        sourceType: 'Estudo Farmacocinético Felino Controlado',
        url: 'https://pubmed.ncbi.nlm.nih.gov/16129342/',
        evidenceLevel: 'Ensaio Farmacocinético Felino Controlado',
      },
      {
        id: 'novacco-2018-m-haemofelis',
        title:
          'Consecutive antibiotic treatment with doxycycline and marbofloxacin clears bacteremia in Mycoplasma haemofelis-infected cats',
        authors: 'Novacco M, Sugiarto S, Willi B, et al.',
        year: 2018,
        journal: 'Veterinary Microbiology. 217:112-120',
        citation:
          'Novacco M, Sugiarto S, Willi B, et al. Consecutive antibiotic treatment with doxycycline and marbofloxacin clears bacteremia in Mycoplasma haemofelis-infected cats. Vet Microbiol. 2018;217:112-120. doi: 10.1016/j.vetmic.2018.03.006. PMID: 29615243.',
        sourceType: 'Ensaio Clínico e Microbiológico Felino com PCR Quantitativo',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29615243/',
        evidenceLevel: 'Ensaio Clínico Microbiológico Nível 2',
      },
      {
        id: 'rougier-2012-leishmania',
        title:
          'One-year clinical and parasitological follow-up of dogs treated with marbofloxacin for canine leishmaniosis',
        authors: 'Rougier S, Hasseine L, Delaunay P, et al.',
        year: 2012,
        journal: 'Veterinary Parasitology. 186(3-4):245-253',
        citation:
          'Rougier S, Hasseine L, Delaunay P, et al. One-year clinical and parasitological follow-up of dogs treated with marbofloxacin for canine leishmaniosis. Vet Parasitol. 2012;186(3-4):245-253. doi: 10.1016/j.vetpar.2011.11.016. PMID: 22130335.',
        sourceType: 'Estudo Clínico Multicêntrico Prospectivo de 1 Ano',
        url: 'https://pubmed.ncbi.nlm.nih.gov/22130335/',
        evidenceLevel: 'Ensaio Clínico Multicêntrico Prospectivo Nível 2',
      },
      {
        id: 'pineda-2017-marbo-ckd',
        title:
          'Treatment of canine leishmaniasis with marbofloxacin in dogs with renal disease',
        authors: 'Pineda C, Aguilera-Tejero E, Martínez-Moreno FJ, et al.',
        year: 2017,
        journal: 'PLoS One. 12(10):e0185981',
        citation:
          'Pineda C, Aguilera-Tejero E, Martínez-Moreno FJ, et al. Treatment of canine leishmaniasis with marbofloxacin in dogs with renal disease. PLoS One. 2017;12(10):e0185981. doi: 10.1371/journal.pone.0185981. PMID: 28982165.',
        sourceType: 'Estudo Clínico Controlado em Cães Nefropatas',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5641981/',
        evidenceLevel: 'Ensaio Clínico Prospectivo em Cães Nefropatas',
      },
      {
        id: 'guideline-abcd-haemoplasmosis-2026',
        title:
          'European Advisory Board on Cat Diseases (ABCD) Guideline for Haemoplasmosis in Cats',
        authors: 'European Advisory Board on Cat Diseases (ABCD)',
        year: 2026,
        journal: 'ABCD Guidelines 2026 update',
        citation:
          'European Advisory Board on Cat Diseases. Guideline for Haemoplasmosis in Cats. ABCDcatsvets.org; 2026.',
        sourceType: 'Diretriz Internacional de Consenso em Medicina Felina',
        url: 'https://www.abcdcatsvets.org/guideline-for-haemoplasmosis-in-cats/',
        evidenceLevel: 'Diretriz de Consenso de Especialistas Felinos Europeus (ABCD)',
      },
      {
        id: 'diretrizes-brasileish-2025',
        title:
          'Diretrizes Brasileish para o Diagnóstico, Tratamento e Prevenção da Leishmaniose Visceral Canina',
        authors: 'Grupo Brasileish',
        year: 2025,
        journal: 'Revista Clínica Veterinária, Suplemento Especial Brasileish 2025',
        citation:
          'Brasileish. Diretrizes Brasileish 2025: Diagnóstico, Estadiamento e Tratamento da LVC no Brasil. Rev Clin Vet. 2025.',
        sourceType: 'Consenso Brasileiro de Especialistas em Leishmaniose Visceral Canina',
        url: 'https://www.revistaclinicaveterinaria.com.br/wp-content/uploads/2025/11/Diretrizes-Brasileish-2025.pdf',
        evidenceLevel: 'Diretriz de Consenso Nacional Brasileiro',
      },
      {
        id: 'papich-2025-feline-fq-pkpd',
        title:
          'Pharmacokinetic-pharmacodynamic modeling and proposed clinical breakpoints for fluoroquinolones in cats',
        authors: 'Papich MG, et al.',
        year: 2025,
        journal: 'Journal of Veterinary Pharmacology and Therapeutics. 2025;48(1):doi:10.1111/jvp.70028',
        citation:
          'Papich MG, et al. Pharmacokinetic-pharmacodynamic modeling and proposed clinical breakpoints for fluoroquinolones in cats. J Vet Pharmacol Ther. 2025. doi: 10.1111/jvp.70028.',
        sourceType: 'Estudo de Modelagem PK/PD e Reavaliação de Breakpoints Clínicos Felinos',
        url: 'https://onlinelibrary.wiley.com/doi/10.1111/jvp.70028',
        evidenceLevel: 'Estudo Farmacocinético/Farmacodinâmico Translacional Avançado',
      },
      {
        id: 'eva-bula-marbopet-brasil',
        title: 'Bula Oficial Marbopet Comprimidos (Marbofloxacina) — MAPA nº 9.507',
        authors: 'Ceva Saúde Animal Ltda',
        year: 2024,
        journal: 'Bula Técnica Registrada no Ministério da Agricultura e Pecuária',
        citation:
          'Ceva Saúde Animal. Bula Técnica do Produto Marbopet Comprimidos 27,5 mg e 82,5 mg. Paulínia: Ceva; 2024.',
        sourceType: 'Bula Registrada Oficial MAPA',
        url: 'https://www.ceva.com.br/content/download/5480/file/Bula%20-%20MARBOPET.pdf',
        evidenceLevel: 'Documento Regulatório Oficial MAPA',
      },
    ],

    genericBrandsNote:
      'A marbofloxacina é comercializada no Brasil por laboratórios farmacêuticos veterinários em apresentações oficiais registradas no MAPA: Marbopet® (Ceva Saúde Animal — comprimidos de 27,5 mg e 82,5 mg; MAPA 9.507), Marbocyl® P (Vetoquinol Brasil — comprimidos de 5 mg, 20 mg e 80 mg; MAPA SP 000376-0.000001) e Marbox-Leish® (Ceva Saúde Animal — comprimidos de 20 mg e 60 mg específicos para leishmaniose canina; MAPA MG 000022-0.000020). Todos são medicamentos veterinários comercializados sob Receituário Veterinário Simples de uma via entregue ao tutor. Não há formulação humana regular comercializada no Brasil.',

    clinicalWarningItems: [
      {
        label: 'Critério de Stewardship e Escolha de Linha:',
        text: 'A marbofloxacina é um antimicrobiano de 2ª/3ª linha. Nunca deve ser empregada empiricamente em cistite simples ou piodermite superficial. Exige cultura e antibiograma para justificar sua indicação clínica.',
      },
      {
        label: 'Contraindicação Condral em Filhotes:',
        text: 'Contraindicada em cães jovens em fase de crescimento esquelético rápido (até 8 meses em pequeno/médio porte, até 12 meses em grandes e até 18 meses em raças gigantes) pelo risco de lesões vesiculares e erosões articulares irreversíveis.',
      },
      {
        label: 'Inativação por Quelação Mineral e Sucralfato:',
        text: 'Cátions metálicos (cálcio, ferro, zinco, magnésio, alumínio) e sucralfato inativam a absorção intestinal da marbofloxacina por quelação estequiométrica. Separar as administrações em pelo menos 2 horas.',
      },
    ],

    relatedDiseaseSlugs: [
      'doencas-trato-urinario-inferior-felino-dtuif',
      'prostatite-caes-gatos',
      'doenca-renal-cronica-caes-gatos',
      'leishmaniose-visceral-canina',
      'micoplasmoses-hemotropicas',
    ],
    isControlled: false,
    isPublished: true,
    source: 'seed',
  },
];

export const marbofloxacinaMedicationRecord = marbofloxacinaMedicationsSeed[0];
